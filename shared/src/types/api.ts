/**
 * Kiểu dữ liệu API dùng chung — frontend, cms và backend đều import từ đây.
 * Theo đặc tả section 16:
 *   - Response: { data, meta? }
 *   - Error: { error: { code, message, field_errors?, request_id } }
 *   - Pagination: { next_cursor, has_more }
 *   - Tiền: string (số nguyên VND) để tránh giới hạn số JavaScript
 *   - Thời gian: ISO 8601 UTC
 */

export type ApiResponse<T> = {
  data: T;
  meta?: Record<string, unknown>;
};

export type ApiError = {
  error: {
    code: string;
    message: string;
    field_errors?: Record<string, string[]>;
    request_id: string;
  };
};

export type PaginationMeta = {
  next_cursor: string | null;
  has_more: boolean;
  total?: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  meta: PaginationMeta;
};

// Tiền VND luôn là string khi truyền qua API
export type VndAmount = string;

// ISO 8601 UTC string
export type IsoDateTime = string;
export type IsoDate = string;
