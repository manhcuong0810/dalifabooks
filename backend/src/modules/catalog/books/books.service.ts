import { Injectable } from "@nestjs/common";

@Injectable()
export class BooksService {
  async listPublic(_query: Record<string, string>) {
    // TODO: chỉ trả published/active, search_text pg_trgm, filter, cursor pagination
    throw new Error("Not implemented");
  }

  async getPublic(_slug: string) {
    // TODO: 404 nếu không tồn tại; archived không tiếp tục mua
    throw new Error("Not implemented");
  }

  async adminList(_query: Record<string, string>) {
    throw new Error("Not implemented");
  }

  async create(_body: unknown) {
    throw new Error("Not implemented");
  }

  async update(_id: string, _body: unknown) {
    // TODO: gửi expectedVersion, mismatch → 409
    throw new Error("Not implemented");
  }

  async publish(_id: string, _version: number) {
    // TODO: cần ít nhất một phiên bản active + ảnh bìa
    throw new Error("Not implemented");
  }

  async archive(_id: string, _version: number) {
    // TODO: không xóa nếu đã có giao dịch
    throw new Error("Not implemented");
  }

  async createEdition(_bookId: string, _body: unknown) {
    // TODO: unique SKU/ISBN
    throw new Error("Not implemented");
  }

  async updateEdition(_bookId: string, _editionId: string, _body: unknown) {
    // TODO: sửa giá không đổi đơn cũ
    throw new Error("Not implemented");
  }
}
