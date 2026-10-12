"use client";

import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { adminFetch } from "@/lib/api";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type BookRecord = {
  id: string;
  title: string;
  slug: string;
  description?: string;
  status: "draft" | "published" | "archived";
  authors: Array<{ id: string; name: string; slug: string }>;
  categories: Array<{ id: string; name: string; slug: string }>;
  edition?: {
    id: string;
    sku?: string;
    isbn?: string | null;
    language?: string;
    format?: string;
    page_count?: number | null;
    list_price_vnd?: number;
    sale_price_vnd?: number;
    publisher?: { id: string; name: string; slug: string } | null;
  } | null;
};

const money = (value?: number) => {
  if (typeof value !== "number" || Number.isNaN(value)) return "—";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);
};

export default function AdminBookDetailPage() {
  const params = useParams<{ id: string }>();
  const [book, setBook] = useState<BookRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBook = async () => {
      if (!params?.id) return;

      try {
        const rows = (await adminFetch<BookRecord[]>("/books")) ?? [];
        setBook(rows.find((item) => item.id === params.id) ?? null);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadBook();
  }, [params?.id]);

  return (
    <AdminPageShell activePath="/admin/books">
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 rounded-xl bg-surface-card p-6 shadow-sm md:flex-row md:items-center">
          <div className="space-y-1.5">
            <nav className="flex items-center gap-2 text-label-sm font-label-sm text-text-muted">
              <Link href="/admin/books" className="transition-colors hover:text-primary">Quản lý Sách</Link>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="font-medium text-text-primary">Chi tiết sách</span>
            </nav>
            <h1 className="text-headline-lg font-headline-lg text-text-primary">{loading ? "Đang tải..." : book?.title ?? "Không tìm thấy sách"}</h1>
          </div>

          <div className="flex items-center gap-2.5">
            <Link href="/admin/books" className="rounded-lg bg-surface-subtle px-4 py-2 text-label-md font-label-md text-text-secondary hover:bg-surface-container">Quay lại</Link>
            {book && (
              <Link href={`/admin/books/${book.id}/edit`} className="rounded-lg bg-primary px-4 py-2 text-label-md font-label-md text-on-primary hover:bg-primary-container">
                Chỉnh sửa
              </Link>
            )}
          </div>
        </div>

        {loading ? (
          <div className="rounded-xl bg-surface-card p-10 text-center text-text-muted shadow-sm">Đang tải thông tin sách...</div>
        ) : !book ? (
          <div className="rounded-xl bg-surface-card p-10 text-center text-text-muted shadow-sm">Không tìm thấy sách.</div>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-8">
              <div className="rounded-xl bg-surface-card p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-headline-sm font-headline-sm font-bold text-text-primary">Thông tin cơ bản</h2>
                  <span className="rounded-full bg-status-emerald-bg px-2.5 py-1 text-label-sm font-label-sm font-semibold text-status-emerald-text">{book.status}</span>
                </div>

                <div className="space-y-4 text-body-md text-text-primary">
                  <div>
                    <label className="mb-1 block text-label-sm font-label-sm uppercase text-text-muted">Tên sách</label>
                    <div className="rounded-lg bg-surface-subtle px-3 py-2">{book.title}</div>
                  </div>

                  <div>
                    <label className="mb-1 block text-label-sm font-label-sm uppercase text-text-muted">Slug</label>
                    <div className="rounded-lg bg-surface-subtle px-3 py-2">{book.slug}</div>
                  </div>

                  <div>
                    <label className="mb-1 block text-label-sm font-label-sm uppercase text-text-muted">Mô tả</label>
                    <div className="rounded-lg bg-surface-subtle px-3 py-3 leading-relaxed">{book.description || "Không có mô tả."}</div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-surface-card p-6 shadow-sm">
                <h2 className="mb-4 text-headline-sm font-headline-sm font-bold text-text-primary">Phân loại</h2>
                <div className="flex flex-wrap gap-2">
                  {book.categories.length > 0 ? (
                    book.categories.map((category) => (
                      <span key={category.id} className="rounded-full bg-surface-subtle px-2.5 py-1 text-label-sm font-label-sm text-text-secondary">{category.name}</span>
                    ))
                  ) : (
                    <span className="text-text-muted">Chưa có danh mục</span>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6 lg:col-span-4">
              <div className="rounded-xl bg-surface-card p-6 shadow-sm">
                <h2 className="mb-4 text-headline-sm font-headline-sm font-bold text-text-primary">Thông tin xuất bản</h2>
                <div className="space-y-3 text-body-sm text-text-muted">
                  <div className="flex items-center justify-between"><span>Nhà xuất bản</span><span className="text-text-primary">{book.edition?.publisher?.name ?? "—"}</span></div>
                  <div className="flex items-center justify-between"><span>ISBN</span><span className="text-text-primary">{book.edition?.isbn ?? "—"}</span></div>
                  <div className="flex items-center justify-between"><span>SKU</span><span className="text-text-primary">{book.edition?.sku ?? "—"}</span></div>
                  <div className="flex items-center justify-between"><span>Ngôn ngữ</span><span className="text-text-primary">{book.edition?.language ?? "vi"}</span></div>
                  <div className="flex items-center justify-between"><span>Format</span><span className="text-text-primary">{book.edition?.format ?? "paperback"}</span></div>
                  <div className="flex items-center justify-between"><span>Trang</span><span className="text-text-primary">{book.edition?.page_count ?? "—"}</span></div>
                  <div className="flex items-center justify-between"><span>Giá niêm yết</span><span className="text-text-primary">{money(book.edition?.list_price_vnd)}</span></div>
                  <div className="flex items-center justify-between"><span>Giá bán</span><span className="text-primary">{money(book.edition?.sale_price_vnd)}</span></div>
                </div>
              </div>

              <div className="rounded-xl bg-surface-card p-6 shadow-sm">
                <h2 className="mb-4 text-headline-sm font-headline-sm font-bold text-text-primary">Tác giả</h2>
                <div className="flex flex-wrap gap-2">
                  {book.authors.length > 0 ? (
                    book.authors.map((author) => (
                      <span key={author.id} className="rounded-full bg-surface-subtle px-2.5 py-1 text-label-sm font-label-sm text-text-secondary">{author.name}</span>
                    ))
                  ) : (
                    <span className="text-text-muted">Chưa có tác giả</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminPageShell>
  );
}
