import { BaseJob } from "./base-job";

/**
 * ScheduledPosts — xuất bản bài viết theo lịch hẹn.
 *
 * Theo đặc tả ADM-CONTENT-02:
 *   - Worker xuất bản lịch hẹn; không lộ scheduled trước thời điểm
 */
export class ScheduledPosts extends BaseJob {
  readonly name = "ScheduledPosts";

  async run(): Promise<void> {
    const now = new Date();

    const due = await this.prisma.post.findMany({
      where: {
        status: "scheduled",
        publish_at: { lte: now },
      },
    });

    if (due.length === 0) return;

    this.log(`Publishing ${due.length} scheduled posts`);

    for (const post of due) {
      try {
        await this.prisma.post.update({
          where: { id: post.id },
          data: {
            status: "published",
            published_at: post.publish_at ?? now,
          },
        });
        this.log(`Published post: ${post.slug}`);
      } catch (err) {
        this.logError(`Failed to publish post ${post.id}`, err);
      }
    }
  }
}
