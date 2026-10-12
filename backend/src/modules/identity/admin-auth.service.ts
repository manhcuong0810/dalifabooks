import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { prisma, UserStatus } from "@dalifabooks/db";
import * as bcrypt from "bcrypt";

@Injectable()
export class AdminAuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(email: string, password: string) {
    const normalizedEmail = email?.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      throw new BadRequestException({
        code: "INVALID_INPUT",
        message: "Email và mật khẩu là bắt buộc.",
      });
    }

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
      include: {
        credential: true,
        user_roles: {
          include: { role: true },
        },
      },
    });

    if (!user || !user.credential) {
      throw new UnauthorizedException({
        code: "INVALID_CREDENTIALS",
        message: "Email hoặc mật khẩu không đúng.",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.credential.password_hash);
    if (!isPasswordValid) {
      throw new UnauthorizedException({
        code: "INVALID_CREDENTIALS",
        message: "Email hoặc mật khẩu không đúng.",
      });
    }

    if (user.status !== UserStatus.active) {
      throw new UnauthorizedException({
        code: "ACCOUNT_BLOCKED",
        message: "Tài khoản đang bị khóa.",
      });
    }

    const roleCodes = user.user_roles.map((item) => item.role.code);
    const isCmsAdmin = roleCodes.some((code) => ["owner", "admin", "cms_admin"].includes(code));

    if (!isCmsAdmin) {
      throw new UnauthorizedException({
        code: "FORBIDDEN",
        message: "Tài khoản này không có quyền truy cập CMS.",
      });
    }

    const payload = {
      sub: user.id,
      email: user.email,
      full_name: user.full_name,
      roles: roleCodes,
      audience: "admin",
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: "8h",
      issuer: "dalifabooks",
      audience: "admin",
    });

    return {
      access_token: accessToken,
      token_type: "Bearer",
      expires_in: 60 * 60 * 8,
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        status: user.status,
        roles: roleCodes,
      },
    };
  }

  async verifyMfa(_challengeToken: string, _code: string) {
    // TODO: verify TOTP với chống replay (last_used_step)
    // Không bỏ qua MFA bằng gọi API trực tiếp
    throw new Error("Not implemented");
  }

  async setupMfa() {
    // TODO: tạo secret, trả QR và recovery codes (hiển thị một lần)
    throw new Error("Not implemented");
  }

  async confirmMfaSetup(_code: string) {
    throw new Error("Not implemented");
  }

  async logout() {
    // TODO: thu hồi session CMS
    throw new Error("Not implemented");
  }
}
