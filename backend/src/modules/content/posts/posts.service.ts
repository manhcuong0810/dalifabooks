import { Injectable } from "@nestjs/common";

@Injectable()
export class PostsService {
  async listPublic(_q: Record<string, string>) { throw new Error("Not implemented"); }
  async getPublic(_slug: string) { throw new Error("Not implemented"); }
  async adminList(_q: Record<string, string>) { throw new Error("Not implemented"); }
  async create(_body: unknown) { throw new Error("Not implemented"); }
  async update(_id: string, _body: unknown) { throw new Error("Not implemented"); }
  async publish(_id: string, _body: unknown) {
    // TODO: worker xuất bản lịch hẹn; không lộ scheduled trước thời điểm
    throw new Error("Not implemented");
  }
  async revisions(_id: string) { throw new Error("Not implemented"); }
}
