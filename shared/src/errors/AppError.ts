import type { ErrorCode } from "../constants/errors";

/**
 * AppError — lỗi nghiệp vụ có thể serialize ra API response.
 * Backend throw AppError; HttpExceptionFilter bắt và format đúng shape.
 */
export class AppError extends Error {
  readonly code: ErrorCode | string;
  readonly statusCode: number;
  readonly fieldErrors?: Record<string, string[]>;

  constructor(
    code: ErrorCode | string,
    message: string,
    statusCode = 400,
    fieldErrors?: Record<string, string[]>
  ) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.statusCode = statusCode;
    this.fieldErrors = fieldErrors;
  }

  toResponse() {
    return {
      error: {
        code: this.code,
        message: this.message,
        ...(this.fieldErrors ? { field_errors: this.fieldErrors } : {}),
      },
    };
  }
}

// Convenience factories
export const Errors = {
  notFound: (entity: string) =>
    new AppError("NOT_FOUND", `${entity} không tồn tại.`, 404),

  forbidden: () =>
    new AppError("FORBIDDEN", "Không có quyền thực hiện thao tác này.", 403),

  unauthorized: () =>
    new AppError("UNAUTHORIZED", "Vui lòng đăng nhập.", 401),

  versionConflict: () =>
    new AppError("VERSION_CONFLICT", "Dữ liệu đã thay đổi, vui lòng tải lại.", 409),

  outOfStock: (skus: string[]) =>
    new AppError(
      "OUT_OF_STOCK",
      `Sản phẩm hết hàng: ${skus.join(", ")}`,
      422,
      { editions: skus }
    ),

  quoteChanged: () =>
    new AppError("QUOTE_CHANGED", "Giá hoặc tình trạng hàng đã thay đổi, vui lòng xem lại đơn hàng.", 422),
};
