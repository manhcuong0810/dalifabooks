import { Injectable } from "@nestjs/common";

@Injectable()
export class ShipmentsService {
  async create(_orderId: string, _body: unknown) {
    // TODO: tạo vận đơn chưa trừ tồn
    throw new Error("Not implemented");
  }
  async dispatch(_id: string, _body: unknown) {
    // TODO: dispatch giảm on_hand và reserved, ghi movement một lần
    // Chỉ dispatch khi confirmed, có reservation hợp lệ, payment paid hoặc COD
    // Tracking URL theo allowlist carrier
    throw new Error("Not implemented");
  }
  async addEvent(_id: string, _body: unknown) {
    // TODO: nếu nhập tay, ghi "Cập nhật thủ công" và audit
    throw new Error("Not implemented");
  }
}
