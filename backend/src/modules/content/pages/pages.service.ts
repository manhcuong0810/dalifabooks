import { Injectable } from "@nestjs/common";

@Injectable()
export class PagesService {
  async getPage(_slug: string) {
    // TODO: chỉ published; bản cũ lưu để tham chiếu user consent
    throw new Error("Not implemented");
  }
}
