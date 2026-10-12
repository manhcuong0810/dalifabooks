import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";

export const IS_PUBLIC_KEY = "isPublic";

/**
 * JWT auth guard — kiểm tra session/token hợp lệ.
 * Dùng decorator @Public() để bỏ qua cho route không cần auth.
 * Theo đặc tả: session CMS không được chấp nhận như session storefront.
 */
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers?.authorization;
    const token = typeof authHeader === "string" && authHeader.startsWith("Bearer ")
      ? authHeader.slice(7)
      : request.cookies?.session ?? request.headers?.["x-access-token"];

    if (!token) {
      throw new UnauthorizedException({ code: "UNAUTHORIZED", message: "Vui lòng đăng nhập." });
    }

    try {
      const payload = this.jwtService.verify(token, {
        audience: "admin",
      });
      request.user = payload;
      return true;
    } catch {
      throw new UnauthorizedException({
        code: "INVALID_TOKEN",
        message: "Token không hợp lệ hoặc đã hết hạn.",
      });
    }
  }
}
