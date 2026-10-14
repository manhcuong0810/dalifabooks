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

const normalizeWarehouseStatus = (value: unknown, fallbackActive: boolean): WarehouseStatus => {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (normalized === "active" || normalized === "maintenance" || normalized === "paused") {
    return normalized as WarehouseStatus;
  }

  return fallbackActive ? "active" : "paused";
};

@Injectable()
export class InventoryService {
  private mapWarehouse(
    record: {
      id: string;
      code: string;
      name: string;
      city: string | null;
      address: string | null;
      manager: string | null;
      phone: string | null;
      capacity: number;
      status: string | null;
      active: boolean;
    },
    used = 0,
    index = 0
  ): WarehouseListItem {
    const status: WarehouseStatus = normalizeWarehouseStatus(record.status ?? (record.active === false ? "paused" : "active"), record.active !== false);
    const fallbackCity = ["Hà Nội", "TP. Hồ Chí Minh", "Đà Nẵng", "Cần Thơ"][index % 4];

    return {
      id: record.id,
      code: record.code,
      name: record.name,
      active: record.active,
      status,
      city: record.city ?? fallbackCity,
      address: record.address ?? "Khu trung chuyển, thành phố lớn",
      manager: record.manager ?? `Quản lý kho ${index + 1}`,
      phone: record.phone ?? "0908 000 000",
      capacity: record.capacity ?? 5000,
      used,
    };
  }

  async list(_query: Record<string, string>) {
    const [records, balanceRows] = await Promise.all([
      prisma.warehouse.findMany({
        orderBy: { name: "asc" },
      }),
      prisma.inventoryBalance.groupBy({
        by: ["warehouse_id"],
        _sum: { on_hand: true },
      }),
    ]);

    const usedByWarehouse = new Map<string, number>();
    for (const row of balanceRows) {
      usedByWarehouse.set(row.warehouse_id, Number(row._sum.on_hand ?? 0));
    }

    return records.map((record, index) => this.mapWarehouse(record, usedByWarehouse.get(record.id) ?? 0, index));
  }

  async getById(id: string) {
    const [record, used] = await Promise.all([
      prisma.warehouse.findUnique({ where: { id } }),
      prisma.inventoryBalance
        .aggregate({
          where: { warehouse_id: id },
          _sum: { on_hand: true },
        })
        .then((result) => Number(result._sum.on_hand ?? 0)),
    ]);

    if (!record) {
      throw new NotFoundException("Warehouse not found");
    }

    return this.mapWarehouse(record, used, 0);
  }

  async create(body: Record<string, unknown>) {
    const status = normalizeWarehouseStatus(body.status ?? body.active, body.active !== false);
    const name = String(body.name ?? "Kho mới").trim();
    const code = String(body.code ?? "WH-" + Date.now().toString().slice(-4)).trim();
    const active = status !== "paused";

    const record = await prisma.warehouse.create({
      data: {
        id: randomUUID(),
        name,
        code,
        city: String(body.city ?? "").trim() || "Hà Nội",
        address: String(body.address ?? "").trim() || "Khu trung chuyển, thành phố lớn",
        manager: String(body.manager ?? "").trim() || "Quản lý kho",
        phone: String(body.phone ?? "").trim() || "0908 000 000",
        capacity: Number(body.capacity) || 0,
        status,
        active,
      },
    });

    return this.mapWarehouse(record, 0, 0);
  }

  async update(id: string, body: Record<string, unknown>) {
    const existing = await prisma.warehouse.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException("Warehouse not found");
    }

    const status = normalizeWarehouseStatus(body.status ?? existing.status ?? (existing.active ? "active" : "paused"), existing.active !== false);
    const payload = {
      name: body.name !== undefined ? String(body.name).trim() || existing.name : existing.name,
      code: body.code !== undefined ? String(body.code).trim() || existing.code : existing.code,
      city: body.city !== undefined ? String(body.city).trim() || existing.city || "Hà Nội" : existing.city || "Hà Nội",
      address: body.address !== undefined ? String(body.address).trim() || existing.address || "Khu trung chuyển, thành phố lớn" : existing.address || "Khu trung chuyển, thành phố lớn",
      manager: body.manager !== undefined ? String(body.manager).trim() || existing.manager || "Quản lý kho" : existing.manager || "Quản lý kho",
      phone: body.phone !== undefined ? String(body.phone).trim() || existing.phone || "0908 000 000" : existing.phone || "0908 000 000",
      capacity: body.capacity !== undefined ? Number(body.capacity) || 0 : existing.capacity,
      status,
      active: status !== "paused",
    };

    const record = await prisma.warehouse.update({
      where: { id },
      data: payload,
    });

    const used = await prisma.inventoryBalance
      .aggregate({
        where: { warehouse_id: id },
        _sum: { on_hand: true },
      })
      .then((result) => Number(result._sum.on_hand ?? 0));

    return this.mapWarehouse(record, used, 0);
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
