"use client";

import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { adminFetch } from "@/lib/api";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type WarehouseStatus = "active" | "maintenance" | "paused";

type Warehouse = {
  id: string;
  name: string;
  code: string;
  city: string;
  address: string;
  manager: string;
  phone: string;
  capacity: number;
  used: number;
  status: WarehouseStatus;
  active: boolean;
};

export default function AdminInventoryPage() {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  const loadWarehouses = async () => {
    try {
      setLoading(true);
      const data = await adminFetch<Warehouse[]>("/inventory");
      setWarehouses(data ?? []);
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Không thể tải danh sách kho.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWarehouses();
  }, []);

  const filteredWarehouses = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return warehouses;

    return warehouses.filter((item) => {
      return [item.name, item.code, item.city, item.address, item.manager].some((value) => value.toLowerCase().includes(term));
    });
  }, [query, warehouses]);

  const totalCapacity = warehouses.reduce((sum, item) => sum + item.capacity, 0);
  const totalUsed = warehouses.reduce((sum, item) => sum + item.used, 0);
  const activeCount = warehouses.filter((item) => item.status === "active").length;

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Bạn có chắc muốn xóa kho "${name}"?`)) return;

    try {
      await adminFetch(`/inventory/${id}`, { method: "DELETE" });
      await loadWarehouses();
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Không thể xóa kho.");
    }
  };

  return (
    <AdminPageShell activePath="/admin/inventory">
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <nav className="mb-1 flex items-center gap-1.5 text-xs font-medium text-text-muted">
              <Link href="/admin/books" className="flex items-center gap-1 transition-colors hover:text-primary">
                <span className="material-symbols-outlined text-[14px]">menu_book</span>
                <span>Quản lý Sách</span>
              </Link>
              <span className="material-symbols-outlined text-[12px]">chevron_right</span>
              <span className="font-semibold text-text-primary">Kho chi nhánh</span>
            </nav>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-text-primary">Quản lý Kho chi nhánh</h1>
              <span className="inline-flex items-center gap-1 rounded-full bg-status-emerald-bg px-2.5 py-0.5 text-xs font-semibold text-status-emerald-text">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-status-emerald-text" />
                {activeCount} kho đang hoạt động
              </span>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2.5">
            <Link href="/admin/inventory/new" className="flex h-9 items-center gap-1.5 rounded-lg bg-primary px-4 text-xs font-semibold text-on-primary shadow-sm transition-all hover:bg-primary-container">
              <span className="material-symbols-outlined text-[18px]">add</span>
              <span>Thêm kho mới</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-surface-card p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-muted">Tổng công suất</span>
              <span className="material-symbols-outlined text-[18px] text-primary">warehouse</span>
            </div>
            <div className="mt-3 text-2xl font-bold text-text-primary">{totalCapacity.toLocaleString("vi-VN")}</div>
            <div className="mt-1 text-xs text-text-secondary">Số lượng tối đa sau khi cộng tất cả kho</div>
          </div>

          <div className="rounded-xl bg-surface-card p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-muted">Đang sử dụng</span>
              <span className="material-symbols-outlined text-[18px] text-primary">inventory_2</span>
            </div>
            <div className="mt-3 text-2xl font-bold text-text-primary">{totalUsed.toLocaleString("vi-VN")}</div>
            <div className="mt-1 text-xs text-text-secondary">Tổng tồn kho hiện tại theo thực tế</div>
          </div>

          <div className="rounded-xl bg-surface-card p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-muted">Tỷ lệ sử dụng</span>
              <span className="material-symbols-outlined text-[18px] text-primary">trending_up</span>
            </div>
            <div className="mt-3 text-2xl font-bold text-text-primary">
              {totalCapacity > 0 ? Math.round((totalUsed / totalCapacity) * 100) : 0}%
            </div>
            <div className="mt-1 text-xs text-text-secondary">Dựa trên tổng công suất hiện có</div>
          </div>
        </div>

        <div className="rounded-xl bg-surface-card p-4 shadow-sm">
          <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex min-w-0 flex-1 items-center rounded-lg border border-surface-border bg-surface-subtle px-3 py-2">
              <span className="material-symbols-outlined mr-2 text-[18px] text-text-muted">search</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="w-full bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
                placeholder="Tìm theo tên kho, mã kho, địa điểm, quản lý..."
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-surface-border bg-surface-subtle/70 text-[11px] font-bold uppercase tracking-wider text-text-muted">
                  <th className="min-w-[220px] px-4 py-3">Kho hàng</th>
                  <th className="min-w-[120px] px-3 py-3">Mã kho</th>
                  <th className="min-w-[140px] px-3 py-3">Vị trí</th>
                  <th className="min-w-[140px] px-3 py-3">Quản lý</th>
                  <th className="min-w-[130px] px-3 py-3 text-center">Tổng số lượng</th>
                  <th className="min-w-[110px] px-3 py-3 text-center">Trạng thái</th>
                  <th className="min-w-[120px] px-4 py-3 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border text-xs">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-text-muted">
                      Đang tải kho hàng...
                    </td>
                  </tr>
                ) : filteredWarehouses.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-text-muted">
                      Không tìm thấy kho nào phù hợp.
                    </td>
                  </tr>
                ) : (
                  filteredWarehouses.map((warehouse) => {
                    const percent = warehouse.capacity > 0 ? Math.round((warehouse.used / warehouse.capacity) * 100) : 0;
                    const statusLabel =
                      warehouse.status === "active"
                        ? "Đang hoạt động"
                        : warehouse.status === "maintenance"
                          ? "Bảo trì"
                          : "Tạm dừng";

                    return (
                      <tr key={warehouse.id} className="transition-colors hover:bg-surface-subtle/50">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-container text-primary">
                              <span className="material-symbols-outlined text-[18px]">local_shipping</span>
                            </div>
                            <div>
                              <div className="font-semibold text-text-primary">{warehouse.name}</div>
                              <div className="mt-0.5 text-[11px] text-text-muted">{warehouse.address}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-3">
                          <span className="rounded border border-surface-border bg-surface-subtle px-2 py-0.5 font-mono text-[11px] text-text-secondary">{warehouse.code}</span>
                        </td>
                        <td className="px-3 py-3">
                          <div className="font-medium text-text-primary">{warehouse.city}</div>
                          <div className="mt-0.5 text-[11px] text-text-muted">{warehouse.address}</div>
                        </td>
                        <td className="px-3 py-3">
                          <div className="font-medium text-text-primary">{warehouse.manager}</div>
                          <div className="mt-0.5 text-[11px] text-text-muted">{warehouse.phone}</div>
                        </td>
                        <td className="px-3 py-3 text-center">
                          <div className="font-semibold text-text-primary">{warehouse.used.toLocaleString("vi-VN")} / {warehouse.capacity.toLocaleString("vi-VN")}</div>
                          <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-surface-subtle">
                            <div className="h-full rounded-full bg-primary" style={{ width: `${Math.min(percent, 100)}%` }} />
                          </div>
                        </td>
                        <td className="px-3 py-3 text-center">
                          <span
                            className={`inline-flex rounded-full px-2 py-1 text-[11px] font-semibold ${
                              warehouse.status === "active"
                                ? "bg-status-emerald-bg text-status-emerald-text"
                                : warehouse.status === "maintenance"
                                  ? "bg-status-amber-bg text-status-amber-text"
                                  : "bg-status-rose-bg text-status-rose-text"
                            }`}
                          >
                            {statusLabel}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Link href={`/admin/inventory/new?id=${warehouse.id}`} className="flex h-7 w-7 items-center justify-center rounded-md text-text-muted transition-colors hover:bg-surface-subtle hover:text-text-primary" title="Chỉnh sửa kho">
                              <span className="material-symbols-outlined text-[17px]">edit</span>
                            </Link>
                            <button type="button" onClick={() => handleDelete(warehouse.id, warehouse.name)} className="flex h-7 w-7 items-center justify-center rounded-md text-text-muted transition-colors hover:bg-red-50 hover:text-red-600" title="Xóa kho">
                              <span className="material-symbols-outlined text-[17px]">delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminPageShell>
  );
}
