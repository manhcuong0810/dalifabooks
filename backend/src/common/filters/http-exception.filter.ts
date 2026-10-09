import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import { FastifyReply, FastifyRequest } from "fastify";
import { randomUUID } from "crypto";

/**
 * Global exception filter
 * Response shape: { error: { code, message, field_errors?, request_id } }
 * theo đặc tả section 16
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const reply = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();
    const requestId = (request.headers["x-request-id"] as string) ?? randomUUID();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let code = "INTERNAL_ERROR";
    let message = "Đã xảy ra lỗi, vui lòng thử lại.";
    let fieldErrors: Record<string, string[]> | undefined;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const body = exception.getResponse();

      if (typeof body === "object" && body !== null) {
        const b = body as Record<string, unknown>;
        code = (b["code"] as string) ?? exception.name;
        message = (b["message"] as string) ?? message;
        fieldErrors = b["field_errors"] as Record<string, string[]> | undefined;
      } else {
        code = exception.name;
        message = String(body);
      }
    } else {
      this.logger.error(exception);
    }

    reply.status(status).send({
      error: { code, message, ...(fieldErrors ? { field_errors: fieldErrors } : {}), request_id: requestId },
    });
  }
}
