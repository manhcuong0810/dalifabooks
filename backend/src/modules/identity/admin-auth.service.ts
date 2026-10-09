import { Injectable } from "@nestjs/common";

@Injectable()
export class AdminAuthService {
  async login(_email: string, _password: string) {
    // TODO: verify creds → tạo pre-auth challenge ngắn hạn
    // Pre-auth challenge không có quyền gọi CMS API
    throw new Error("Not implemented");
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
