import { Injectable } from "@nestjs/common";

@Injectable()
export class MediaService {
  async list(_query: Record<string, string>) { throw new Error("Not implemented"); }
  async createUploadIntent(_body: unknown) {
    // TODO: chỉ nhận JPEG/PNG/WebP, max 10MB/20MP; object key ngẫu nhiên
    throw new Error("Not implemented");
  }
  async finalize(_id: string) {
    // TODO: backend giải mã và tái tạo ảnh trước khi set status = ready
    throw new Error("Not implemented");
  }
}
