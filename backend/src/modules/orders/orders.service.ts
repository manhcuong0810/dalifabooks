import { Injectable } from "@nestjs/common";

@Injectable()
export class OrdersService {
  async myOrders(_q: Record<string, string>) {
    // TODO: server tự scope theo session, không tin userId từ UI
    throw new Error("Not implemented");
  }
  async myOrderDetail(_id: string) { throw new Error("Not implemented"); }
  async cancel(_id: string, _reason: string) {
    // TODO: chỉ trước xuất hàng, đơn đã trả tiền tạo yêu cầu hoàn tiền riêng
    throw new Error("Not implemented");
  }
  async guestAccessRequest(_body: unknown) { throw new Error("Not implemented"); }
  async guestAccessConfirm(_body: unknown) { throw new Error("Not implemented"); }
  async adminList(_q: Record<string, string>) { throw new Error("Not implemented"); }
  async adminDetail(_id: string) { throw new Error("Not implemented"); }
  async transition(_id: string, _body: unknown) {
    // TODO: action + reason + expectedVersion + Idempotency-Key
    throw new Error("Not implemented");
  }
  async addNote(_id: string, _note: string) {
    // TODO: ghi chú nội bộ không trả về API khách
    throw new Error("Not implemented");
  }
  async exportOrders(_body: unknown) {
    // TODO: export nền, URL tải hết hạn, có audit, giới hạn PII
    throw new Error("Not implemented");
  }
}
