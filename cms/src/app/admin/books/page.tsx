"use client";

import { useEffect, useState } from "react";
import { adminFetch, getCmsToken } from "@/lib/api";

type BookItem = {
  id: string;
  title: string;
  slug: string;
  status: "draft" | "published" | "archived";
  authors?: Array<{ id: string; name: string; slug: string }>;
  categories?: Array<{ id: string; name: string; slug: string }>;
  price?: number;
  edition?: {
    sku?: string;
    publisher?: { name?: string } | null;
    status?: string;
  } | null;
  isbn?: string | null;
  updated_at?: string;
};

const statusStyles: Record<string, string> = {
  draft: "bg-amber-100 text-amber-700",
  published: "bg-emerald-100 text-emerald-700",
  archived: "bg-slate-200 text-slate-700",
};

const formatCurrency = (value?: number) => {
  if (!value && value !== 0) return "—";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);
};

const formatDate = (value?: string) => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
};

export default function AdminBooksPage() {
  const [books, setBooks] = useState<BookItem[]>([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadBooks = async (searchValue = query, statusValue = status) => {
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams();
      if (searchValue.trim()) params.set("search", searchValue.trim());
      if (statusValue !== "all") params.set("status", statusValue);

      const res = await adminFetch(`/books${params.toString() ? `?${params.toString()}` : ""}`);
      const list = Array.isArray(res) ? res : Array.isArray((res as { data?: BookItem[] })?.data) ? (res as { data: BookItem[] }).data : [];
      setBooks(list);
    } catch (err: any) {
      const message =
        err?.error?.message ||
        (getCmsToken() ? "Không thể tải danh sách sách." : "Bạn cần đăng nhập CMS để xem danh sách sách.");
      setError(message);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    loadBooks(query, status);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.12em] text-slate-500">Catalog</p>
          <h1 className="mt-1 text-2xl font-semibold text-slate-900">Danh sách sách</h1>
        </div>
        <button type="button" className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-700">
          + Thêm sách
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <form onSubmit={handleSearchSubmit} className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="flex-1">
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Tìm theo tên, slug, mô tả..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-slate-400 focus:bg-white"
            />
          </div>
          <div className="w-full md:w-56">
            <select
              value={status}
              onChange={(event) => {
                const next = event.target.value;
                setStatus(next);
                loadBooks(query, next);
              }}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-slate-400 focus:bg-white"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="draft">Nháp</option>
              <option value="published">Xuất bản</option>
              <option value="archived">Lưu trữ</option>
            </select>
          </div>
          <button type="submit" className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:border-slate-300 hover:bg-slate-50">
            Tìm kiếm
          </button>
        </form>
      </div>

      {error ? <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div> : null}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center gap-3 p-10 text-sm text-slate-500">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-slate-700" />
            Đang tải dữ liệu...
          </div>
        ) : books.length === 0 ? (
          <div className="p-10 text-center text-sm text-slate-500">
            <p className="text-base font-medium text-slate-700">Không có sách nào phù hợp.</p>
            <p className="mt-2">Hãy thử thay đổi từ khóa hoặc bộ lọc.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-3 font-medium">Sách</th>
                  <th className="px-4 py-3 font-medium">Tác giả</th>
                  <th className="px-4 py-3 font-medium">Danh mục</th>
                  <th className="px-4 py-3 font-medium">Giá</th>
                  <th className="px-4 py-3 font-medium">Trạng thái</th>
                  <th className="px-4 py-3 font-medium">Cập nhật</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book.id} className="border-t border-slate-200 align-top hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-10 items-center justify-center rounded-lg bg-slate-100 text-xs font-semibold text-slate-500">
                          {book.title?.slice(0, 1)?.toUpperCase() || "B"}
                        </div>
                        <div>
                          <div className="font-medium text-slate-900">{book.title}</div>
                          <div className="mt-1 text-xs text-slate-500">/{book.slug}</div>
                          <div className="mt-1 text-[11px] text-slate-500">
                            {book.edition?.sku ? `SKU: ${book.edition.sku}` : "Chưa có SKU"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {book.authors && book.authors.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {book.authors.map((author) => (
                            <span key={author.id} className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-700">
                              {author.name}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-slate-400">Chưa gắn tác giả</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {book.categories && book.categories.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {book.categories.slice(0, 2).map((category) => (
                            <span key={category.id} className="rounded-full bg-violet-50 px-2 py-1 text-xs text-violet-700">
                              {category.name}
                            </span>
                          ))}
                          {book.categories.length > 2 ? (
                            <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-500">+{book.categories.length - 2}</span>
                          ) : null}
                        </div>
                      ) : (
                        <span className="text-slate-400">Chưa gắn danh mục</span>
                      )}
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-800">{formatCurrency(book.price)}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[book.status] ?? "bg-slate-100 text-slate-700"}`}>
                        {book.status === "draft" ? "Nháp" : book.status === "published" ? "Xuất bản" : "Lưu trữ"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-500">{formatDate(book.updated_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
