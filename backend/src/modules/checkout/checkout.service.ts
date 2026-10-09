import { Injectable } from "@nestjs/common";

@Injectable()
export class CheckoutService {
  async createQuote(_body: unknown) {
    // TODO: tính giá, ship, coupon → trả quote_id + hạn hiệu lực
    // Quote không giữ hàng
    throw new Error("Not implemented");
  }

  async createOrder(_body: unknown) {
    // TODO: nhận quoteId + Idempotency-Key
    // Server tính/kiểm tra lại mọi điều kiện
    // Giữ kho trong transaction
    // QUOTE_CHANGED → 422 cùng báo giá mới
    // OUT_OF_STOCK → 422 chỉ rõ dòng cần sửa
    throw new Error("Not implemented");
  }

  async getConfirmation(_id: string) {
    // TODO: bảo vệ bằng quyền sở hữu hoặc guest access token
    throw new Error("Not implemented");
  }

  async requestPaymentReview(_orderId: string, _body: unknown) {
    // TODO: chỉ ghi yêu cầu đối soát, không đổi thành paid
    throw new Error("Not implemented");
  }
}
