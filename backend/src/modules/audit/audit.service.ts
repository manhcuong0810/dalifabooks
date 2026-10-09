import { Injectable } from "@nestjs/common";

@Injectable()
export class AuditService {
  async list(_q: Record<string, string>) {
    // TODO: UI read-only, không có nút sửa/xóa
    // MFA/password/token không xuất hiện trong before/after
    throw new Error("Not implemented");
  }

  async dashboard(_q: Record<string, string>) {
    // TODO: metric có tooltip định nghĩa, múi giờ và link danh sách
    // Phân biệt doanh số đơn hoàn tất và tiền thực thu
    throw new Error("Not implemented");
  }

  async log(entry: {
    actorId?: string;
    action: string;
    entityType: string;
    entityId: string;
    beforeData?: unknown;
    afterData?: unknown;
    reason?: string;
    requestId: string;
  }) {
    // TODO: ghi audit log — gọi từ các service khác trong cùng transaction
    console.log("[AUDIT]", entry);
  }
}
