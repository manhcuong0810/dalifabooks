import { BaseJob } from "./base-job";

/**
 * CartExpiry — đánh dấu giỏ hàng hết hạn.
 * Giỏ không giữ hàng nên không cần release reservation khi expire.
 */
export class CartExpiry extends BaseJob {
  readonly name = "CartExpiry";

  async run(): Promise<void> {
    const now = new Date();

    const result = await this.prisma.cart.updateMany({
      where: {
        status: "active",
        expires_at: { lte: now },
      },
      data: { status: "expired" },
    });

    if (result.count > 0) {
      this.log(`Expired ${result.count} carts`);
    }
  }
}
