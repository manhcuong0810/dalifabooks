import { Injectable } from "@nestjs/common";

@Injectable()
export class CategoriesService {
  async listPublic() { throw new Error("Not implemented"); }
  async adminList() { throw new Error("Not implemented"); }
  async create(_body: unknown) {
    // TODO: không tạo vòng lặp, không chọn chính nó làm cha, giới hạn 3 cấp
    throw new Error("Not implemented");
  }
  async update(_id: string, _body: unknown) { throw new Error("Not implemented"); }
}
