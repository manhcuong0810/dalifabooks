import { Injectable } from "@nestjs/common";

@Injectable()
export class BannersService {
  async list() { throw new Error("Not implemented"); }
  async create(_body: unknown) {
    // TODO: link không nhận javascript/data URL; chỉ HTTPS allowlist
    throw new Error("Not implemented");
  }
  async update(_id: string, _body: unknown) { throw new Error("Not implemented"); }
  async listCollections() { throw new Error("Not implemented"); }
  async createCollection(_body: unknown) { throw new Error("Not implemented"); }
  async updateCollection(_id: string, _body: unknown) { throw new Error("Not implemented"); }
}
