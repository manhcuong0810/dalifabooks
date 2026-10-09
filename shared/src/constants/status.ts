/**
 * Status labels và màu — dùng cho StatusBadge component (section 2.1 đặc tả)
 * "Có chữ và màu; không chỉ dùng màu để truyền đạt"
 */

export type StatusVariant = "default" | "info" | "warning" | "success" | "danger" | "neutral";

export type StatusConfig = { label: string; variant: StatusVariant };

// Book
export const BOOK_STATUS: Record<string, StatusConfig> = {
  draft:     { label: "Nháp",       variant: "neutral" },
  published: { label: "Đã xuất bản", variant: "success" },
  archived:  { label: "Lưu trữ",    variant: "neutral" },
};

// Edition
export const EDITION_STATUS: Record<string, StatusConfig> = {
  draft:    { label: "Nháp",     variant: "neutral" },
  active:   { label: "Đang bán", variant: "success" },
  archived: { label: "Ngừng bán", variant: "neutral" },
};

// Order
export const ORDER_STATUS: Record<string, StatusConfig> = {
  pending:   { label: "Chờ xác nhận", variant: "warning" },
  confirmed: { label: "Đã xác nhận",  variant: "info"    },
  completed: { label: "Hoàn thành",   variant: "success" },
  cancelled: { label: "Đã hủy",       variant: "danger"  },
};

// Payment
export const PAYMENT_STATUS: Record<string, StatusConfig> = {
  unpaid:              { label: "Chưa thanh toán",   variant: "warning" },
  paid:                { label: "Đã thanh toán",     variant: "success" },
  partially_refunded:  { label: "Hoàn một phần",     variant: "info"    },
  refunded:            { label: "Đã hoàn tiền",      variant: "neutral" },
};

// Fulfillment
export const FULFILLMENT_STATUS: Record<string, StatusConfig> = {
  unfulfilled: { label: "Chưa giao",      variant: "neutral" },
  processing:  { label: "Đang xử lý",     variant: "info"    },
  shipped:     { label: "Đang giao hàng", variant: "info"    },
  delivered:   { label: "Đã giao",        variant: "success" },
  returned:    { label: "Đã trả hàng",    variant: "warning" },
};

// Payment attempt
export const PAYMENT_ATTEMPT_STATUS: Record<string, StatusConfig> = {
  pending:  { label: "Chờ xử lý",   variant: "warning" },
  review:   { label: "Cần đối soát", variant: "warning" },
  paid:     { label: "Đã nhận",      variant: "success" },
  failed:   { label: "Thất bại",     variant: "danger"  },
  expired:  { label: "Hết hạn",      variant: "neutral" },
};

// Refund
export const REFUND_STATUS: Record<string, StatusConfig> = {
  requested:  { label: "Yêu cầu hoàn",   variant: "info"    },
  processing: { label: "Đang xử lý",     variant: "warning" },
  succeeded:  { label: "Đã hoàn",        variant: "success" },
  failed:     { label: "Thất bại",       variant: "danger"  },
  cancelled:  { label: "Đã hủy",         variant: "neutral" },
};

// Shipment
export const SHIPMENT_STATUS: Record<string, StatusConfig> = {
  draft:     { label: "Chờ gửi",  variant: "neutral" },
  shipped:   { label: "Đã gửi",   variant: "info"    },
  delivered: { label: "Đã giao",  variant: "success" },
  returned:  { label: "Trả hàng", variant: "warning" },
  cancelled: { label: "Đã hủy",   variant: "danger"  },
};

// Asset upload
export const ASSET_STATUS: Record<string, StatusConfig> = {
  uploading:  { label: "Đang tải",    variant: "info"    },
  processing: { label: "Đang xử lý", variant: "warning" },
  ready:      { label: "Sẵn sàng",   variant: "success" },
  rejected:   { label: "Lỗi",        variant: "danger"  },
};
