import { BaseJob } from "./base-job";

/**
 * CouponExpiry — giải phóng coupon reservation hết hạn.
 *
 * Theo đặc tả section 12:
 *   - Giữ quota khi tạo đơn; hủy đơn trước dispatch giải phóng hold
 *   - Test hai checkout tranh lượt coupon cuối
 */
export class CouponExpiry extends BaseJob {
  readonly name = "CouponExpiry";

  async run(): Promise<void> {
    const now = new Date();

    const expired = await this.prisma.couponReservation.findMany({
      where: {
        status: "held",
        expires_at: { lte: now },
      },
      take: 100,
    });

    if (expired.length === 0) return;

    this.log(`Releasing ${expired.length} expired coupon reservations`);

    const ids = expired.map((r) => r.id);
    await this.prisma.couponReservation.updateMany({
      where: { id: { in: ids } },
      data: { status: "released" },
    });
  }
}
