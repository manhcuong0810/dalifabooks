import { Injectable } from "@nestjs/common";

@Injectable()
export class PaymentsService {
  async list(_q: Record<string, string>) { throw new Error("Not implemented"); }
  async reconcile(_id: string, _body: unknown) {
    // TODO: unique tham chiếu ngân hàng/provider chống ghi trùng
    // Đúng số tiền/đơn mới xác nhận paid
    throw new Error("Not implemented");
  }
  async createRefund(_id: string, _body: unknown) {
    // TODO: kiểm tra tổng refund pending+succeeded không vượt tiền đã nhận
    // Hoàn tiền không tự nhập lại kho
    throw new Error("Not implemented");
  }
  async confirmManualRefund(_id: string, _body: unknown) {
    // TODO: chỉ ghi succeeded khi có bằng chứng
    throw new Error("Not implemented");
  }
}
