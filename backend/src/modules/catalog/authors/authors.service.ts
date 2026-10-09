import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthorsService {
  async listPublic() { throw new Error("Not implemented"); }
  async adminList() { throw new Error("Not implemented"); }
  async create(_body: unknown) { throw new Error("Not implemented"); }
  async update(_id: string, _body: unknown) {
    // TODO: không xóa record đang được tham chiếu, dùng archive
    throw new Error("Not implemented");
  }
}
