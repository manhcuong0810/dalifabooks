import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";

export const IS_PUBLIC_KEY = "isPublic";

/**
 * JWT auth guard — kiểm tra session/token hợp lệ.
 * Dùng decorator @Public() để bỏ qua cho route không cần auth.
 * Theo đặc tả: session CMS không được chấp nhận như session storefront.
 */
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();

    // TODO: verify JWT / session token từ cookie
    // const token = request.cookies['session']
    // const payload = this.jwtService.verify(token)
    // request.user = payload

    if (!request.user) {
      throw new UnauthorizedException({ code: "UNAUTHORIZED", message: "Vui lòng đăng nhập." });
    }

    return true;
  }
}
