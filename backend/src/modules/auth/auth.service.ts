import { Injectable } from "@nestjs/common";

/** TODO: inject PrismaService, JwtService khi sẵn sàng */
@Injectable()
export class AuthService {
  async login(_email: string, _password: string) {
    // TODO: verify credentials, merge guest cart, kiểm tra số lượng
    throw new Error("Not implemented");
  }

  async logout() {
    // TODO: revoke session hiện tại
    throw new Error("Not implemented");
  }

  async getMe() {
    // TODO: trả user từ session
    throw new Error("Not implemented");
  }

  async register(_body: unknown) {
    // TODO: tạo user, gửi email xác minh
    // Không tự cấp vai trò nhân viên từ request đăng ký
    throw new Error("Not implemented");
  }

  async confirmEmail(_token: string) {
    throw new Error("Not implemented");
  }

  async resendVerification() {
    throw new Error("Not implemented");
  }

  async requestPasswordReset(_email: string) {
    // Phản hồi chung dù email có tồn tại hay không
    throw new Error("Not implemented");
  }

  async confirmPasswordReset(_token: string, _password: string) {
    // Token lưu hash, dùng một lần; reset thành công thu hồi session
    throw new Error("Not implemented");
  }
}
