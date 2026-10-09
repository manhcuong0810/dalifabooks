/**
 * Formatter dùng chung cho storefront
 * Tiền theo đặc tả: hiển thị 89.000 ₫
 * Ngày theo Asia/Ho_Chi_Minh
 */

const VND_FORMATTER = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 0,
});

/** Nhận bigint string từ API, trả chuỗi hiển thị: "89.000 ₫" */
export function formatVnd(amountStr: string | number): string {
  return VND_FORMATTER.format(Number(amountStr));
}

const DATE_FORMATTER = new Intl.DateTimeFormat("vi-VN", {
  timeZone: "Asia/Ho_Chi_Minh",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const DATETIME_FORMATTER = new Intl.DateTimeFormat("vi-VN", {
  timeZone: "Asia/Ho_Chi_Minh",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
});

export function formatDate(iso: string): string {
  return DATE_FORMATTER.format(new Date(iso));
}

export function formatDateTime(iso: string): string {
  return DATETIME_FORMATTER.format(new Date(iso));
}
