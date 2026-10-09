import { BaseJob } from "./base-job";

/**
 * OutboxProcessor — xử lý outbox_events theo transactional outbox pattern.
 *
 * Theo đặc tả section 15.8:
 *   - Worker đọc outbox theo lease, retry exponential backoff
 *   - Gửi email và dịch vụ ngoài có thể lặp nếu crash ở ranh giới
 *   - Cần dedup provider hoặc operation key phù hợp
 *   - Không tuyên bố exactly-once cho dịch vụ ngoài
 *
 * Batch: tối đa 20 events/lần, lock bằng locked_until.
 */
export class OutboxProcessor extends BaseJob {
  readonly name = "OutboxProcessor";
  private readonly BATCH_SIZE = 20;
  private readonly LOCK_DURATION_MS = 60_000; // 60s

  async run(): Promise<void> {
    const now = new Date();
    const lockUntil = new Date(now.getTime() + this.LOCK_DURATION_MS);

    // Lấy và lock các event sẵn sàng xử lý
    const events = await this.prisma.$transaction(async (tx) => {
      const pending = await tx.outboxEvent.findMany({
        where: {
          status: { in: ["pending", "processing"] },
          next_attempt_at: { lte: now },
          OR: [{ locked_until: null }, { locked_until: { lte: now } }],
        },
        orderBy: { next_attempt_at: "asc" },
        take: this.BATCH_SIZE,
      });

      if (pending.length === 0) return [];

      const ids = pending.map((e) => e.id);
      await tx.outboxEvent.updateMany({
        where: { id: { in: ids } },
        data: { status: "processing", locked_until: lockUntil },
      });

      return pending;
    });

    if (events.length === 0) return;

    this.log(`Processing ${events.length} outbox events`);

    for (const event of events) {
      const attemptStart = new Date();
      try {
        await this.processEvent(event);

        await this.prisma.$transaction([
          this.prisma.outboxEvent.update({
            where: { id: event.id },
            data: { status: "completed", locked_until: null, updated_at: new Date() },
          }),
          this.prisma.jobAttempt.create({
            data: {
              outbox_event_id: event.id,
              attempt_no: event.attempts + 1,
              started_at: attemptStart,
              finished_at: new Date(),
            },
          }),
        ]);
      } catch (err) {
        this.logError(`Failed to process event ${event.id} (${event.event_type})`, err);

        const newAttempts = event.attempts + 1;
        // Exponential backoff: 30s, 2m, 8m, 32m, ...
        const backoffMs = Math.min(30_000 * Math.pow(4, newAttempts - 1), 30 * 60_000);
        const nextAttempt = new Date(Date.now() + backoffMs);
        const failed = newAttempts >= 5;

        await this.prisma.$transaction([
          this.prisma.outboxEvent.update({
            where: { id: event.id },
            data: {
              status: failed ? "failed" : "pending",
              attempts: newAttempts,
              next_attempt_at: nextAttempt,
              locked_until: null,
              updated_at: new Date(),
            },
          }),
          this.prisma.jobAttempt.create({
            data: {
              outbox_event_id: event.id,
              attempt_no: newAttempts,
              started_at: attemptStart,
              finished_at: new Date(),
              error_code: err instanceof Error ? err.name : "UNKNOWN",
            },
          }),
        ]);
      }
    }
  }

  private async processEvent(event: { id: string; event_type: string; payload: unknown }) {
    // TODO: dispatch theo event_type
    // Ví dụ: "user.email_verification" → gửi email qua provider
    // Ví dụ: "order.confirmed" → gửi confirmation email
    // Ví dụ: "shipment.dispatched" → gửi tracking email
    this.log(`Processing event: ${event.event_type} (${event.id})`);
    throw new Error(`Handler for "${event.event_type}" not implemented`);
  }
}
