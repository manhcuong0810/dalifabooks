import { Injectable } from "@nestjs/common";

@Injectable()
export class InventoryService {
  async list(_query: Record<string, string>) { throw new Error("Not implemented"); }
  async movements(_editionId: string) { throw new Error("Not implemented"); }
  async updateThreshold(_editionId: string, _threshold: number) { throw new Error("Not implemented"); }
  async adjust(_body: unknown) {
    // TODO: không cho tồn vật lý sau điều chỉnh < reserved
    // Ghi balance + movement + audit cùng transaction
    // Không sửa/xóa movement; sai thì tạo movement bù
    throw new Error("Not implemented");
  }
}
