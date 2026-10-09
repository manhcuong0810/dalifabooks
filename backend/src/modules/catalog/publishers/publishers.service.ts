import { Injectable } from "@nestjs/common";

@Injectable()
export class PublishersService {
  async listPublic() { throw new Error("Not implemented"); }
  async adminList() { throw new Error("Not implemented"); }
  async create(_body: unknown) { throw new Error("Not implemented"); }
  async update(_id: string, _body: unknown) { throw new Error("Not implemented"); }
}
