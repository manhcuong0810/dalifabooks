import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  ConflictException,
} from "@nestjs/common";
import { Observable, tap } from "rxjs";

/**
 * Idempotency interceptor
 * Đọc header Idempotency-Key, kiểm tra trong idempotency_keys table.
 * Nếu key đã completed → trả response cũ.
 * Nếu key đang processing → 409.
 * Theo đặc tả section 16: mutation tài chính/kho/đơn dùng Idempotency-Key.
 *
 * TODO: inject PrismaService khi db package sẵn sàng.
 */
@Injectable()
export class IdempotencyInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest();
    const key = request.headers["idempotency-key"] as string | undefined;

    if (!key) {
      return next.handle();
    }

    // TODO: lookup key trong DB
    // const existing = await this.prisma.idempotencyKey.findUnique(...)
    // if (existing?.status === 'completed') return of(existing.responseBody)
    // if (existing?.status === 'processing') throw new ConflictException(...)

    return next.handle().pipe(
      tap(() => {
        // TODO: lưu response vào DB sau khi xử lý xong
      })
    );
  }
}
