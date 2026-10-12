"use client";

import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { adminFetch } from "@/lib/api";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";

type CategoryNode = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  parent_id?: string | null;
  position: number;
  active: boolean;
  children?: CategoryNode[];
  _count?: {
    book_categories: number;
  };
};

function ToggleSwitch({ checked }: { checked: boolean }) {
  return (
    <label className="relative inline-flex cursor-pointer items-center" title={checked ? "Đang hiển thị" : "Đang tạm ẩn"}>
      <input checked={checked} className="peer sr-only" type="checkbox" readOnly />
      <div className="h-4 w-8 rounded-full bg-surface-border-strong peer-checked:bg-primary after:absolute after:left-[2px] after:top-[2px] after:h-3 after:w-3 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full" />
    </label>
  );
}

function renderTree(node: CategoryNode, depth = 0, onDelete: (id: string, name: string) => void) {
  return (
    <Fragment key={node.id}>
      <tr className={`group transition-colors hover:bg-surface-subtle/50 ${node.active ? "" : "opacity-75"}`}>
        <td className="px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center text-text-muted" style={{ marginLeft: `${depth * 18}px` }}>
              <span className="material-symbols-outlined text-[12px]">{node.children && node.children.length > 0 ? "keyboard_arrow_down" : "remove"}</span>
            </span>
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-surface-container text-primary">
              <span className="material-symbols-outlined text-[16px]">category</span>
            </div>
            <span className={`font-bold ${node.active ? "text-text-primary" : "text-text-secondary"}`}>{node.name}</span>
          </div>
        </td>
        <td className="px-3 py-3">
          <span className="rounded border border-surface-border bg-surface-subtle px-2 py-0.5 font-mono text-[11px] text-text-secondary">/{node.slug}</span>
        </td>
        <td className="px-3 py-3 text-center">
          <span className="rounded-full border border-surface-border bg-surface-subtle px-2 py-0.5 font-semibold text-text-secondary">
            {node._count?.book_categories ?? 0} cuốn
          </span>
        </td>
        <td className="px-3 py-3 text-center font-semibold text-text-primary">{node.position}</td>
        <td className="px-3 py-3">
          <ToggleSwitch checked={node.active} />
        </td>
        <td className="px-4 py-3 text-right">
          <div className="flex items-center justify-end gap-1">
            {!node.parent_id && (
              <Link href={`/admin/categories/new?parentId=${node.id}`} className="flex h-7 w-7 items-center justify-center rounded-md text-text-muted transition-colors hover:bg-surface-subtle hover:text-text-primary" title="Thêm danh mục con">
                <span className="material-symbols-outlined text-[17px]">add_circle</span>
              </Link>
            )}
            <Link href={`/admin/categories/new?id=${node.id}`} className="flex h-7 w-7 items-center justify-center rounded-md text-text-muted transition-colors hover:bg-surface-subtle hover:text-text-primary" title="Chỉnh sửa">
              <span className="material-symbols-outlined text-[17px]">edit</span>
            </Link>
            <button type="button" onClick={() => onDelete(node.id, node.name)} className="flex h-7 w-7 items-center justify-center rounded-md text-text-muted transition-colors hover:bg-red-50 hover:text-red-600" title="Xóa danh mục">
              <span className="material-symbols-outlined text-[17px]">delete</span>
            </button>
          </div>
        </td>
      </tr>
      {node.children?.map((child) => renderTree(child, depth + 1, onDelete))}
    </Fragment>
  );
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<CategoryNode[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await adminFetch<CategoryNode[]>("/categories");
      setCategories(data ?? []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Bạn có chắc muốn xóa danh mục "${name}"?`)) return;

    try {
      await adminFetch(`/categories/${id}`, { method: "DELETE" });
      await loadCategories();
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Không thể xóa danh mục.");
    }
  };

  return (
    <AdminPageShell activePath="/admin/categories">
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <nav className="mb-1 flex items-center gap-1.5 text-xs font-medium text-text-muted">
              <Link href="/admin/books" className="flex items-center gap-1 transition-colors hover:text-primary">
                <span className="material-symbols-outlined text-[14px]">menu_book</span>
                <span>Quản lý Sách</span>
              </Link>
              <span className="material-symbols-outlined text-[12px]">chevron_right</span>
              <span className="font-semibold text-text-primary">Danh mục Sách</span>
            </nav>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-text-primary">Quản lý Danh mục Sách</h1>
              <span className="inline-flex items-center gap-1 rounded-full bg-status-emerald-bg px-2.5 py-0.5 text-xs font-semibold text-status-emerald-text">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-status-emerald-text" />
                {categories.length} Danh mục hoạt động
              </span>
            </div>
            <p className="mt-0.5 text-sm text-text-secondary">
              Tổ chức danh mục phân tầng giúp người đọc dễ dàng tìm kiếm và khám phá tác phẩm trên website Storefront.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2.5">
            <Link href="/admin/categories/new" className="flex h-9 items-center gap-1.5 rounded-lg bg-primary px-4 text-xs font-semibold text-on-primary shadow-sm transition-all hover:bg-primary-container">
              <span className="material-symbols-outlined text-[18px]">add</span>
              <span>Thêm danh mục mới</span>
            </Link>
          </div>
        </div>

        <div className="grid items-start gap-6">
          <div className="flex w-full flex-col overflow-hidden rounded-xl border border-surface-border bg-surface-card shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-surface-border bg-surface-subtle/70 text-[11px] font-bold uppercase tracking-wider text-text-muted">
                    <th className="min-w-[260px] px-4 py-3">Tên danh mục</th>
                    <th className="min-w-[150px] px-3 py-3">Đường dẫn (Slug)</th>
                    <th className="min-w-[90px] px-3 py-3 text-center">Số sách</th>
                    <th className="min-w-[80px] px-3 py-3 text-center">Thứ tự</th>
                    <th className="min-w-[130px] px-3 py-3">Trạng thái</th>
                    <th className="min-w-[120px] px-4 py-3 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-border text-xs">
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-text-muted">
                        Đang tải danh mục...
                      </td>
                    </tr>
                  ) : categories.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-text-muted">
                        Chưa có danh mục nào.
                      </td>
                    </tr>
                  ) : (
                    categories.map((category) => renderTree(category, 0, handleDelete))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminPageShell>
  );
}

