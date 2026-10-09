import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";

export const PERMISSIONS_KEY = "permissions";

/**
 * Permission guard — kiểm tra user có permission cần thiết.
 * Theo đặc tả: mọi hành động bị thiếu quyền phải bị API từ chối,
 * kể cả khi UI đã ẩn nút.
 */
@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()]
    );

    if (!required || required.length === 0) return true;

    const { user } = context.switchToHttp().getRequest();

    if (!user?.permissions) {
      throw new ForbiddenException({ code: "FORBIDDEN", message: "Không có quyền thực hiện thao tác này." });
    }

    const hasAll = required.every((p) =>
      (user.permissions as string[]).includes(p)
    );

    if (!hasAll) {
      throw new ForbiddenException({ code: "FORBIDDEN", message: "Không có quyền thực hiện thao tác này." });
    }

    return true;
  }
}
