import { Injectable } from "@nestjs/common";

@Injectable()
export class CartService {
  async getCart() {
    // TODO: scope theo session user hoặc guest token hash
    throw new Error("Not implemented");
  }
  async upsertItem(_editionId: string, _quantity: number) {
    // TODO: giỏ không giữ hàng, không bảo đảm giá
    // PUT đặt số lượng tuyệt đối để retry an toàn
    throw new Error("Not implemented");
  }
  async removeItem(_editionId: string) {
    throw new Error("Not implemented");
  }
}
