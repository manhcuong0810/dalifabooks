import { Injectable } from "@nestjs/common";

@Injectable()
export class StaffService {
  async list() { throw new Error("Not implemented"); }
  async invite(_body: unknown) { throw new Error("Not implemented"); }
  async update(_id: string, _body: unknown) {
    // TODO: không cho xóa/khóa/hạ quyền Owner cuối cùng
    // Không cho người quản trị cấp quyền vượt phạm vi được phép
    throw new Error("Not implemented");
  }
  async listRoles() { throw new Error("Not implemented"); }
  async createRole(_body: unknown) { throw new Error("Not implemented"); }
  async updateRole(_id: string, _body: unknown) { throw new Error("Not implemented"); }
  async listPermissions() { throw new Error("Not implemented"); }
}
