"use client";

import { adminFetch } from "@/lib/api";
import Link from "next/link";
import { useEffect, useState } from "react";

type WarehouseOption = {
  id: string;
  name: string;
  code?: string;
  city?: string;
};

export function AdminTopbar() {
  const [warehouses, setWarehouses] = useState<WarehouseOption[]>([]);
  const [selectedWarehouseId, setSelectedWarehouseId] = useState("all");

  useEffect(() => {
    let isMounted = true;

    adminFetch<WarehouseOption[]>("/inventory")
      .then((data) => {
        if (!isMounted) return;
        const list = data ?? [];
        setWarehouses(list);
      })
      .catch((error) => {
        if (!isMounted) return;
        console.error("Failed to load warehouses for topbar", error);
        setWarehouses([]);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <header className="fixed left-64 right-0 top-0 z-40 flex h-16 items-center justify-between bg-surface-card/95 px-6 shadow-[0_1px_4px_rgba(0,0,0,0.04)] backdrop-blur-md">
      <div className="flex max-w-2xl flex-1 items-center gap-4">
        <div className="flex max-w-md flex-1 items-center rounded-lg bg-surface-subtle px-3 py-2">
          <span className="material-symbols-outlined mr-2.5 shrink-0 text-[18px] text-text-muted">search</span>
          <input
            type="text"
            className="w-full bg-transparent font-body-sm text-body-sm text-text-primary placeholder:text-text-muted focus:outline-none"
            placeholder="Tìm đơn hàng, mã SKU, sách, khách hàng..."
          />
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <select
            value={selectedWarehouseId}
            onChange={(event) => setSelectedWarehouseId(event.target.value)}
            className="rounded-lg border-none bg-surface-subtle px-3 py-1.5 text-label-sm font-label-sm text-text-secondary focus:outline-none"
          >
            <option value="all">Toàn bộ chi nhánh</option>
            {warehouses.map((warehouse) => (
              <option key={warehouse.id} value={warehouse.id}>
                {warehouse.name}
              </option>
            ))}
          </select>
          <select className="rounded-lg border-none bg-surface-subtle px-3 py-1.5 text-label-sm font-label-sm text-text-secondary focus:outline-none">
            <option>Hôm nay (24h)</option>
            <option>7 ngày qua</option>
            <option>Tháng này</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-3.5">
        <Link href="/" target="_blank" className="hidden items-center gap-1.5 rounded-lg bg-surface-subtle px-3 py-1.5 text-label-sm font-label-sm text-primary transition-colors hover:bg-surface-container-high sm:inline-flex">
          <span className="material-symbols-outlined text-[16px]">storefront</span>
          <span>Xem Storefront</span>
        </Link>

        <button type="button" aria-label="Cảnh báo đơn hàng và tồn kho" className="relative rounded-lg p-2 text-text-secondary transition-colors hover:bg-surface-subtle">
          <span className="material-symbols-outlined text-[20px]">notifications</span>
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-error" />
        </button>

        <div className="flex items-center gap-2.5 pl-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary">
            <span className="material-symbols-outlined text-[18px]">shield_person</span>
          </div>
          <div className="hidden flex-col text-left lg:flex">
            <div className="flex items-center gap-1.5">
              <span className="text-label-md font-label-md font-medium leading-none text-text-primary">Admin Master</span>
              <span className="rounded bg-status-emerald-bg px-1.5 py-0.5 text-[10px] font-bold text-status-emerald-text">SUPERADMIN</span>
            </div>
            <span className="mt-0.5 text-[11px] leading-tight text-text-muted">dalifa.admin@books.vn</span>
          </div>
        </div>
      </div>
    </header>
  );
}
