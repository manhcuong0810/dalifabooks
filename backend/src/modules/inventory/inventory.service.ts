import { Injectable, NotFoundException } from "@nestjs/common";
import { prisma } from "@dalifabooks/db";
import { randomUUID } from "crypto";

type WarehouseStatus = "active" | "maintenance" | "paused";

type WarehouseListItem = {
  id: string;
  code: string;
  name: string;
  city: string;
  address: string;
  manager: string;
  phone: string;
  capacity: number;
  used: number;
  status: WarehouseStatus;
  active: boolean;
};

const DEFAULT_WAREHOUSE_MAP: Record<string, Partial<WarehouseListItem>> = {
  "HN-001": {
    city: "Hà Nội",
    address: "Long Biên, Hà Nội",
    manager: "Nguyễn Minh Hạnh",
    phone: "0908 111 222",
    capacity: 20000,
  },
  "HCM-001": {
    city: "TP. Hồ Chí Minh",
    address: "Quận 7, TP. Hồ Chí Minh",
    manager: "Phạm Quốc Anh",
    phone: "0908 333 444",
    capacity: 18000,
  },
  "DN-001": {
    city: "Đà Nẵng",
    address: "Hải Châu, Đà Nẵng",
    manager: "Lê Thị Tuyết",
    phone: "0908 555 666",
    capacity: 8000,
  },
};

@Injectable()
export class InventoryService {
  private mapWarehouse(record: { id: string; code: string; name: string; active: boolean }, index = 0): WarehouseListItem {
    const fallback = DEFAULT_WAREHOUSE_MAP[record.code] ?? {
      city: ["Hà Nội", "Hồ Chí Minh", "Đà Nẵng", "Cần Thơ"][index % 4],
      address: "Khu trung chuyển, thành phố lớn",
      manager: `Quản lý kho ${index + 1}`,
      phone: "0908 000 000",
      capacity: 5000 + index * 1500,
    };

    const status: WarehouseStatus = record.active === false ? "paused" : index % 3 === 1 ? "maintenance" : "active";
    const used = Math.max(0, Math.round((fallback.capacity ?? 5000) * (0.45 + (index % 4) * 0.12)));

    return {
      id: record.id,
      code: record.code,
      name: record.name,
      active: record.active,
      status,
      city: fallback.city ?? "Hà Nội",
      address: fallback.address ?? "Khu trung chuyển",
      manager: fallback.manager ?? "Quản lý kho",
      phone: fallback.phone ?? "0908 000 000",
      capacity: fallback.capacity ?? 5000,
      used,
    };
  }

  async list(_query: Record<string, string>) {
    const records = await prisma.warehouse.findMany({
      orderBy: { name: "asc" },
    });

    return records.map((record, index) => this.mapWarehouse(record, index));
  }

  async getById(id: string) {
    const record = await prisma.warehouse.findUnique({ where: { id } });
    if (!record) {
      throw new NotFoundException("Warehouse not found");
    }

    return this.mapWarehouse(record, 0);
  }

  async create(body: Record<string, unknown>) {
    const name = String(body.name ?? "Kho mới").trim();
    const code = String(body.code ?? "WH-" + Date.now().toString().slice(-4)).trim();
    const active = body.active !== undefined ? Boolean(body.active) : String(body.status ?? "active") !== "paused";

    const record = await prisma.warehouse.create({
      data: {
        id: randomUUID(),
        name,
        code,
        active,
      },
    });

    return this.mapWarehouse(record, 0);
  }

  async update(id: string, body: Record<string, unknown>) {
    const existing = await prisma.warehouse.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException("Warehouse not found");
    }

    const payload = {
      name: body.name !== undefined ? String(body.name).trim() || existing.name : existing.name,
      code: body.code !== undefined ? String(body.code).trim() || existing.code : existing.code,
      active:
        body.active !== undefined
          ? Boolean(body.active)
          : body.status !== undefined
            ? String(body.status) !== "paused"
            : existing.active,
    };

    const record = await prisma.warehouse.update({
      where: { id },
      data: payload,
    });

    return this.mapWarehouse(record, 0);
  }

  async remove(id: string) {
    const existing = await prisma.warehouse.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException("Warehouse not found");
    }

    await prisma.warehouse.delete({ where: { id } });
    return { success: true, id };
  }

  async movements(_editionId: string) {
    return [];
  }

  async updateThreshold(_editionId: string, _threshold: number) {
    return { edition_id: _editionId, threshold: _threshold };
  }

  async adjust(_body: unknown) {
    // TODO: không cho tồn vật lý sau điều chỉnh < reserved
    // Ghi balance + movement + audit cùng transaction
    // Không sửa/xóa movement; sai thì tạo movement bù
    return { success: true, body: _body };
  }
}
