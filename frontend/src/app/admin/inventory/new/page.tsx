"use client";

import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { adminFetch } from "@/lib/api";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

type WarehouseStatus = "active" | "maintenance" | "paused";

type WarehouseForm = {
  name: string;
  code: string;
  city: string;
  address: string;
  manager: string;
  phone: string;
  capacity: string;
  status: WarehouseStatus;
};

const emptyForm: WarehouseForm = {
  name: "",
  code: "",
  city: "Hà Nội",
  address: "",
  manager: "",
  phone: "",
  capacity: "1000",
  status: "active",
};

function AdminInventoryForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const warehouseId = searchParams.get("id");
  const [form, setForm] = useState<WarehouseForm>(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(Boolean(warehouseId));

  useEffect(() => {
    const loadWarehouse = async () => {
      if (!warehouseId) {
        setForm(emptyForm);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const warehouse = await adminFetch<{ id: string; name: string; code: string; city: string; address: string; manager: string; phone: string; capacity: number; status: WarehouseStatus; active: boolean }>(`/inventory/${warehouseId}`);
        if (!warehouse) return;

        setForm({
          name: warehouse.name ?? "",
          code: warehouse.code ?? "",
          city: warehouse.city ?? "Hà Nội",
          address: warehouse.address ?? "",
          manager: warehouse.manager ?? "",
          phone: warehouse.phone ?? "",
          capacity: String(warehouse.capacity ?? 1000),
          status: warehouse.status ?? (warehouse.active === false ? "paused" : "active"),
        });
      } catch (error) {
        console.error(error);
        alert("Không thể tải chi tiết kho.");
      } finally {
        setLoading(false);
      }
    };

    loadWarehouse();
  }, [warehouseId]);

  const updateField = <K extends keyof WarehouseForm>(field: K, value: WarehouseForm[K]) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.name.trim()) {
      alert("Tên kho là bắt buộc.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        ...form,
        capacity: Number(form.capacity) || 0,
        active: form.status !== "paused",
      };

      if (warehouseId) {
        await adminFetch(`/inventory/${warehouseId}`, {
          method: "PATCH",
          body: JSON.stringify(payload),
        });
      } else {
        await adminFetch("/inventory", {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }

      router.push("/admin/inventory");
    } catch (err) {
      console.error(err);
      alert("Không thể lưu thông tin kho.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminPageShell activePath="/admin/inventory">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col justify-between gap-4 rounded-xl bg-surface-card p-6 shadow-sm md:flex-row md:items-center">
          <div className="space-y-1.5">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-body-sm text-text-muted">
              <Link href="/admin/books" className="transition-colors hover:text-primary">Quản lý Sách</Link>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <Link href="/admin/inventory" className="transition-colors hover:text-primary">Kho chi nhánh</Link>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="font-medium text-text-primary">{warehouseId ? "Chỉnh sửa kho" : "Thêm kho mới"}</span>
            </nav>
            <h1 className="text-headline-lg font-headline-lg tracking-tight text-text-primary">
              {loading ? "Đang tải kho..." : warehouseId ? "Chỉnh sửa kho chi nhánh" : "Tạo kho mới"}
            </h1>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <Link href="/admin/inventory" className="rounded-lg bg-surface-subtle px-4 py-2 text-label-md font-label-md text-text-secondary hover:bg-surface-container">
              Hủy bỏ
            </Link>
            <button type="submit" disabled={loading} className="rounded-lg bg-primary px-5 py-2.5 text-label-md font-label-md text-on-primary shadow-md transition-all hover:bg-primary-container disabled:cursor-not-allowed disabled:opacity-60">
              {isSubmitting ? "Đang lưu..." : warehouseId ? "Lưu thay đổi" : "Lưu kho"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-8">
            <section className="rounded-xl bg-surface-card p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[22px] text-primary">warehouse</span>
                <h2 className="text-headline-sm font-headline-sm text-text-primary">Thông tin kho</h2>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="space-y-1.5 md:col-span-2">
                  <label className="block text-label-md font-label-md font-semibold text-text-primary">Tên kho <span className="text-error">*</span></label>
                  <input
                    value={form.name}
                    onChange={(event) => updateField("name", event.target.value)}
                    className="h-11 w-full rounded-lg bg-surface-card px-3.5 text-body-md text-text-primary shadow-sm outline-none placeholder:text-text-muted focus:ring-2 focus:ring-primary"
                    placeholder="Ví dụ: Kho Tổng Hà Nội"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-label-md font-label-md font-semibold text-text-primary">Mã kho</label>
                  <input
                    value={form.code}
                    onChange={(event) => updateField("code", event.target.value)}
                    className="h-11 w-full rounded-lg bg-surface-card px-3.5 text-body-md text-text-primary shadow-sm outline-none placeholder:text-text-muted focus:ring-2 focus:ring-primary"
                    placeholder="WH-HN-001"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-label-md font-label-md font-semibold text-text-primary">Tỉnh / Thành phố</label>
                  <input
                    value={form.city}
                    onChange={(event) => updateField("city", event.target.value)}
                    className="h-11 w-full rounded-lg bg-surface-card px-3.5 text-body-md text-text-primary shadow-sm outline-none placeholder:text-text-muted focus:ring-2 focus:ring-primary"
                    placeholder="Hà Nội"
                  />
                </div>

                <div className="space-y-1.5 md:col-span-2">
                  <label className="block text-label-md font-label-md font-semibold text-text-primary">Địa chỉ chi tiết</label>
                  <textarea
                    value={form.address}
                    onChange={(event) => updateField("address", event.target.value)}
                    rows={3}
                    className="w-full rounded-lg bg-surface-card px-3.5 py-2.5 text-body-md text-text-primary shadow-sm outline-none placeholder:text-text-muted focus:ring-2 focus:ring-primary"
                    placeholder="Số nhà, đường, phường, quận, tỉnh..."
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-label-md font-label-md font-semibold text-text-primary">Quản lý kho</label>
                  <input
                    value={form.manager}
                    onChange={(event) => updateField("manager", event.target.value)}
                    className="h-11 w-full rounded-lg bg-surface-card px-3.5 text-body-md text-text-primary shadow-sm outline-none placeholder:text-text-muted focus:ring-2 focus:ring-primary"
                    placeholder="Tên người phụ trách"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-label-md font-label-md font-semibold text-text-primary">Điện thoại</label>
                  <input
                    value={form.phone}
                    onChange={(event) => updateField("phone", event.target.value)}
                    className="h-11 w-full rounded-lg bg-surface-card px-3.5 text-body-md text-text-primary shadow-sm outline-none placeholder:text-text-muted focus:ring-2 focus:ring-primary"
                    placeholder="0908 123 456"
                  />
                </div>
              </div>
            </section>
          </div>

          <aside className="space-y-6 lg:col-span-4">
            <div className="rounded-xl bg-surface-card p-5 shadow-sm">
              <h3 className="text-headline-sm font-headline-sm font-bold text-text-primary">Cấu hình kho</h3>
              <div className="mt-4 space-y-4 text-body-sm text-text-muted">
                <div className="space-y-1.5">
                  <label className="text-label-md font-label-md font-semibold text-text-primary">Công suất tối đa</label>
                  <input
                    type="number"
                    min={0}
                    value={form.capacity}
                    onChange={(event) => updateField("capacity", event.target.value)}
                    className="w-full rounded-lg bg-surface-card px-3 py-2 text-text-primary shadow-sm outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-label-md font-label-md font-semibold text-text-primary">Trạng thái</label>
                  <select
                    value={form.status}
                    onChange={(event) => updateField("status", event.target.value as WarehouseStatus)}
                    className="w-full rounded-lg bg-surface-card px-3 py-2 text-text-primary shadow-sm outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="active">Đang hoạt động</option>
                    <option value="maintenance">Bảo trì</option>
                    <option value="paused">Tạm dừng</option>
                  </select>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </form>
    </AdminPageShell>
  );
}

export default function AdminInventoryNewPage() {
  return (
    <Suspense fallback={<div className="p-6 text-sm text-text-muted">Đang tải form kho...</div>}>
      <AdminInventoryForm />
    </Suspense>
  );
}
