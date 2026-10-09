import { BaseJob } from "./base-job";

/**
 * ReservationExpiry — giải phóng inventory reservation hết hạn.
 *
 * Theo đặc tả section 15.5:
 *   - Worker expiry chỉ release active
 *   - Transaction bảo đảm đúng một lần
 *   - Ghi stock_movements khi release
 *
 * Đây là invariant: SUM reservation active = reserved trên inventory_balances.
 */
export class ReservationExpiry extends BaseJob {
  readonly name = "ReservationExpiry";

  async run(): Promise<void> {
    const now = new Date();

    const expired = await this.prisma.inventoryReservation.findMany({
      where: {
        status: "active",
        expires_at: { lte: now },
      },
      take: 50,
    });

    if (expired.length === 0) return;

    this.log(`Releasing ${expired.length} expired reservations`);

    for (const reservation of expired) {
      try {
        await this.prisma.$transaction(async (tx) => {
          // 1. Đổi trạng thái reservation
          await tx.inventoryReservation.update({
            where: { id: reservation.id },
            data: { status: "released", released_at: now },
          });

          // 2. Giảm reserved trên inventory_balance
          await tx.inventoryBalance.update({
            where: {
              edition_id_warehouse_id: {
                edition_id: reservation.edition_id,
                warehouse_id: reservation.warehouse_id,
              },
            },
            data: { reserved: { decrement: reservation.quantity } },
          });

          // 3. Ghi stock_movement
          await tx.stockMovement.create({
            data: {
              edition_id: reservation.edition_id,
              warehouse_id: reservation.warehouse_id,
              delta_on_hand: 0,
              delta_reserved: -reservation.quantity,
              reason: "reservation_expired",
              source_type: "inventory_reservation",
              source_id: reservation.id,
              operation_key: `reservation_expired:${reservation.id}`,
              note: "Tự động giải phóng do hết hạn",
            },
          });
        });
      } catch (err) {
        this.logError(`Failed to release reservation ${reservation.id}`, err);
      }
    }
  }
}
