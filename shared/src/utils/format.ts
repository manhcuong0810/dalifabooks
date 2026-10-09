/**
 * Formatter dùng chung — có thể import ở cả frontend và cms.
 * Không phụ thuộc React.
 *
 * Theo đặc tả:
 *   - Tiền hiển thị: 89.000 ₫
 *   - Ngày theo Asia/Ho_Chi_Minh
 *   - DB lưu UTC; UI parse và hiển thị theo múi giờ VN
 */

// ── Tiền VND ─────────────────────────────────────────────────────

const VND_FORMATTER = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 0,
});

/**
 * Nhận string hoặc number từ API, trả chuỗi hiển thị "89.000 ₫"
 * Dùng string để tránh giới hạn số JavaScript theo đặc tả.
 */
export function formatVnd(amount: string | number | bigint): string {
  return VND_FORMATTER.format(Number(amount));
}

// ── Ngày / giờ ───────────────────────────────────────────────────

const TZ = "Asia/Ho_Chi_Minh";

const DATE_FORMATTER = new Intl.DateTimeFormat("vi-VN", {
  timeZone: TZ,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const DATETIME_FORMATTER = new Intl.DateTimeFormat("vi-VN", {
  timeZone: TZ,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
});

const TIME_FORMATTER = new Intl.DateTimeFormat("vi-VN", {
  timeZone: TZ,
  hour: "2-digit",
  minute: "2-digit",
});

export function formatDate(iso: string): string {
  return DATE_FORMATTER.format(new Date(iso));
}

export function formatDateTime(iso: string): string {
  return DATETIME_FORMATTER.format(new Date(iso));
}

export function formatTime(iso: string): string {
  return TIME_FORMATTER.format(new Date(iso));
}

// ── Số lượng / số khác ────────────────────────────────────────────

export function formatQuantity(n: number): string {
  return new Intl.NumberFormat("vi-VN").format(n);
}
