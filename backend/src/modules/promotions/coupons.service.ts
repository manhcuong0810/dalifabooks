import { Injectable } from "@nestjs/common";

@Injectable()
export class CouponsService {
  async list(_q: Record<string, string>) { throw new Error("Not implemented"); }
  async create(_body: unknown) {
    // TODO: code chuẩn hóa uppercase ASCII; validate percent 1-100, fixed > 0
    throw new Error("Not implemented");
  }
  async update(_id: string, _body: unknown) {
    // TODO: không thay đổi chính sách hồi tố
    throw new Error("Not implemented");
  }
  async validateForCheckout(_code: string, _context: unknown) {
    // TODO: kiểm tra quota + thời gian dưới transaction
    throw new Error("Not implemented");
  }
}
