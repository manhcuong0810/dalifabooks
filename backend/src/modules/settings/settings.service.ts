import { Injectable } from "@nestjs/common";

@Injectable()
export class SettingsService {
  async get() {
    // TODO: public API chỉ trả whitelist trường công khai
    throw new Error("Not implemented");
  }
  async update(_body: unknown) {
    // TODO: cấu hình ngân hàng yêu cầu xác thực lại và audit
    // Secret provider không lưu trong bảng public settings
    // Thay ngân hàng không thay snapshot của attempt đang chờ
    throw new Error("Not implemented");
  }
}
