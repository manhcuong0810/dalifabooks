/**
 * DalifaBooks Worker
 * Xử lý các tác vụ nền theo outbox pattern (section 15.8 đặc tả):
 *   - outbox_events: gửi email, webhook, thông báo
 *   - reservation expiry: giải phóng reservation hết hạn
 *   - coupon reservation expiry: giải phóng coupon hold hết hạn
 *   - scheduled posts: xuất bản bài viết theo lịch hẹn
 *   - cart expiry: đánh dấu giỏ hàng hết hạn
 *
 * Thiết kế: polling loop với interval, mỗi job có lease để tránh
 * nhiều worker cùng xử lý một event. Exponential backoff cho retry.
 */

import { OutboxProcessor } from "./jobs/outbox-processor";
import { ReservationExpiry } from "./jobs/reservation-expiry";
import { CouponExpiry } from "./jobs/coupon-expiry";
import { ScheduledPosts } from "./jobs/scheduled-posts";
import { CartExpiry } from "./jobs/cart-expiry";

async function main() {
  console.log("[Worker] Starting DalifaBooks background worker...");

  const jobs = [
    new OutboxProcessor(),
    new ReservationExpiry(),
    new CouponExpiry(),
    new ScheduledPosts(),
    new CartExpiry(),
  ];

  // Graceful shutdown
  let running = true;
  const shutdown = async () => {
    console.log("[Worker] Shutting down...");
    running = false;
  };
  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);

  // Main loop — chạy tuần tự để tránh connection pool pressure
  while (running) {
    for (const job of jobs) {
      if (!running) break;
      try {
        await job.run();
      } catch (err) {
        console.error(`[Worker] Job ${job.name} error:`, err);
      }
    }
    // Poll interval 5s
    await sleep(5_000);
  }

  console.log("[Worker] Stopped.");
  process.exit(0);
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

main();
