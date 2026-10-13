"use client";

import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { adminFetch, getAdminToken } from "@/lib/api";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type BookStatus = "published" | "draft" | "archived";

type BookRow = {
  id: string;
  title: string;
  slug: string;
  status: BookStatus;
  updated_at?: string;
  authors?: Array<{ id: string; name: string; slug: string }>;
  categories?: Array<{ id: string; name: string; slug: string }>;
  edition?: {
    sku?: string;
    isbn?: string | null;
    page_count?: number | null;
    list_price_vnd?: number | string | bigint | null;
    sale_price_vnd?: number | string | bigint | null;
    available_quantity?: number | null;
  } | null;
};

type SummaryRow = {
  total: number;
  published: number;
  draft: number;
  archived: number;
  low_stock_warnings: number;
};

const statusConfig: Record<string, { label: string; className: string }> = {
  published: {
    label: "Đang phát hành",
    className: "bg-status-emerald-bg text-status-emerald-text",
  },
  draft: {
    label: "Bản nháp",
    className: "bg-status-neutral-bg text-status-neutral-text",
  },
  archived: {
    label: "Đã lưu trữ",
    className: "bg-surface-subtle text-text-muted",
  },
};

const stockConfig: Record<string, { className: string; indicator: string }> = {
  green: {
    className: "bg-status-emerald-bg text-status-emerald-text",
    indicator: "bg-status-emerald-text",
  },
  amber: {
    className: "bg-status-amber-bg text-status-amber-text",
    indicator: "bg-status-amber-text",
  },
  neutral: {
    className: "bg-status-neutral-bg text-status-neutral-text",
    indicator: "bg-text-muted",
  },
};

const money = (value?: number | string | bigint | null) => {
  if (value === null || value === undefined || value === "") return "—";
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return "—";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(numeric);
};

const formatDate = (value?: string) => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("vi-VN", { dateStyle: "short", timeStyle: "short" });
};

const getAvailableQuantity = (book: BookRow) => Number(book.edition?.available_quantity ?? 0);

const getStockStatus = (availableQuantity: number) => {
  if (availableQuantity <= 0) return "out_of_stock";
  if (availableQuantity <= 10) return "low_stock";
  return "in_stock";
};

export default function AdminBooksPage() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [stockFilter, setStockFilter] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [books, setBooks] = useState<BookRow[]>([]);
  const [summary, setSummary] = useState<SummaryRow>({
    total: 0,
    published: 0,
    draft: 0,
    archived: 0,
    low_stock_warnings: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [bookList, summaryData] = await Promise.all([
          adminFetch<BookRow[]>("/books"),
          adminFetch<SummaryRow>("/books/summary").catch(() => null),
        ]);

        const nextBooks = Array.isArray(bookList) ? bookList : [];
        setBooks(nextBooks);
        setSummary(
          summaryData ?? {
            total: nextBooks.length,
            published: nextBooks.filter((book) => book.status === "published").length,
            draft: nextBooks.filter((book) => book.status === "draft").length,
            archived: nextBooks.filter((book) => book.status === "archived").length,
            low_stock_warnings: 0,
          }
        );
      } catch (err: any) {
        const message = err?.error?.message || (getAdminToken() ? "Không thể tải danh sách sách." : "Bạn cần đăng nhập để xem danh sách sách.");
        setError(message);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const categoryOptions = useMemo(() => {
    const map = new Map<string, string>();
    books.forEach((book) => {
      book.categories?.forEach((category) => {
        map.set(category.id, category.name);
      });
    });
    return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
  }, [books]);

  const filteredBooks = useMemo(() => {
    const next = books.filter((book) => {
      const haystack = [
        book.title,
        book.slug,
        book.edition?.sku,
        book.edition?.isbn,
        book.authors?.map((author) => author.name).join(" "),
        book.categories?.map((category) => category.name).join(" "),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchQuery = !query || haystack.includes(query.toLowerCase());
      const matchStatus = !statusFilter || statusFilter === book.status;
      const matchCategory = !categoryFilter || book.categories?.some((category) => category.id === categoryFilter);
      const stockStatus = getStockStatus(getAvailableQuantity(book));
      const matchStock =
        !stockFilter ||
        (stockFilter === "in_stock" && stockStatus === "in_stock") ||
        (stockFilter === "low_stock" && stockStatus === "low_stock") ||
        (stockFilter === "out_of_stock" && stockStatus === "out_of_stock");

      return matchQuery && matchStatus && matchCategory && matchStock;
    });

    const sorted = [...next];
    switch (sortBy) {
      case "price_asc":
        sorted.sort((a, b) => Number(a.edition?.sale_price_vnd ?? 0) - Number(b.edition?.sale_price_vnd ?? 0));
        break;
      case "price_desc":
        sorted.sort((a, b) => Number(b.edition?.sale_price_vnd ?? 0) - Number(a.edition?.sale_price_vnd ?? 0));
        break;
      case "stock_desc":
        sorted.sort((a, b) => getAvailableQuantity(b) - getAvailableQuantity(a));
        break;
      case "title_asc":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "newest":
      default:
        sorted.sort((a, b) => new Date(b.updated_at ?? 0).getTime() - new Date(a.updated_at ?? 0).getTime());
        break;
    }

    return sorted;
  }, [books, query, statusFilter, categoryFilter, stockFilter, sortBy]);

  useEffect(() => {
    setPage(1);
  }, [query, statusFilter, categoryFilter, stockFilter, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredBooks.length / pageSize));
  const startIndex = (page - 1) * pageSize;
  const pageBooks = filteredBooks.slice(startIndex, startIndex + pageSize);

  const toggleSelect = (bookId: string) => {
    setSelectedIds((current) => (current.includes(bookId) ? current.filter((id) => id !== bookId) : [...current, bookId]));
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredBooks.length) {
      setSelectedIds([]);
      return;
    }
    setSelectedIds(filteredBooks.map((book) => book.id));
  };

  const selectedCount = selectedIds.length;
  const stats = {
    total: summary.total || books.length,
    published: summary.published || books.filter((book) => book.status === "published").length,
    draft: summary.draft || books.filter((book) => book.status === "draft").length,
    archived: summary.archived || books.filter((book) => book.status === "archived").length,
    low_stock_warnings: summary.low_stock_warnings || 0,
  };

  return (
    <AdminPageShell activePath="/admin/books">
      <div className="flex flex-col w-full">
        <div className="px-6 py-6 space-y-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-1.5">
              <nav className="flex items-center gap-2 text-text-muted font-body-sm text-body-sm">
                <span>Quản lý Sách</span>
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                <span className="text-text-primary font-medium">Danh sách Sách</span>
              </nav>
              <div className="flex items-center gap-3">
                <h1 className="font-headline-lg text-headline-lg text-text-primary tracking-tight">Danh sách Sách phát hành</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-surface-container font-label-sm text-label-sm text-primary font-semibold">{stats.total.toLocaleString("vi-VN")} tựa sách</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button type="button" className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-surface-card hover:bg-surface-subtle text-text-secondary font-label-md text-label-md shadow-sm transition-all">
                <span className="material-symbols-outlined text-[18px]">file_download</span>
                <span>Xuất Excel</span>
              </button>
              <button type="button" className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-surface-card hover:bg-surface-subtle text-text-secondary font-label-md text-label-md shadow-sm transition-all">
                <span className="material-symbols-outlined text-[18px]">upload_file</span>
                <span>Nhập dữ liệu</span>
              </button>
              <Link href="/admin/books/new" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md shadow-sm transition-all">
                <span className="material-symbols-outlined text-[20px]">add_circle</span>
                <span>Thêm sách mới</span>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5">
            <div className="bg-surface-card rounded-xl p-4 shadow-sm flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-label-sm text-label-sm text-text-muted">Tổng đầu sách</p>
                <p className="font-headline-md text-headline-md text-text-primary font-bold">{stats.total.toLocaleString("vi-VN")}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[22px]">auto_stories</span>
              </div>
            </div>

            <div className="bg-surface-card rounded-xl p-4 shadow-sm flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-label-sm text-label-sm text-text-muted">Đang phát hành</p>
                <p className="font-headline-md text-headline-md text-status-emerald-text font-bold">{stats.published.toLocaleString("vi-VN")}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-status-emerald-bg flex items-center justify-center text-status-emerald-text">
                <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              </div>
            </div>

            <div className="bg-surface-card rounded-xl p-4 shadow-sm flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-label-sm text-label-sm text-text-muted">Bản nháp</p>
                <p className="font-headline-md text-headline-md text-text-secondary font-bold">{stats.draft.toLocaleString("vi-VN")}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-surface-subtle flex items-center justify-center text-text-secondary">
                <span className="material-symbols-outlined text-[22px]">edit_note</span>
              </div>
            </div>

            <div className="bg-surface-card rounded-xl p-4 shadow-sm flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-label-sm text-label-sm text-text-muted">Đã lưu trữ</p>
                <p className="font-headline-md text-headline-md text-text-muted font-bold">{stats.archived.toLocaleString("vi-VN")}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-surface-subtle flex items-center justify-center text-text-muted">
                <span className="material-symbols-outlined text-[22px]">inventory_2</span>
              </div>
            </div>

            <div className="col-span-2 md:col-span-1 bg-surface-card rounded-xl p-4 shadow-sm flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-label-sm text-label-sm text-status-amber-text">Cảnh báo tồn kho</p>
                <p className="font-headline-md text-headline-md text-status-amber-text font-bold">{stats.low_stock_warnings.toLocaleString("vi-VN")} <span className="font-body-sm text-body-sm font-normal text-text-muted">tựa</span></p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-status-amber-bg flex items-center justify-center text-status-amber-text">
                <span className="material-symbols-outlined text-[22px]">warning</span>
              </div>
            </div>
          </div>

          <div className="bg-surface-card rounded-xl p-4 shadow-sm space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              <div className="md:col-span-5 flex items-center bg-surface-subtle rounded-lg px-3.5 py-2.5">
                <span className="material-symbols-outlined text-text-muted text-[20px] mr-2 shrink-0">search</span>
                <input
                  className="w-full bg-transparent font-body-md text-body-md text-text-primary placeholder:text-text-muted focus:outline-none"
                  placeholder="Tìm theo tên sách, SKU, mã ISBN, tác giả..."
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
                {query ? (
                  <button type="button" className="text-text-muted hover:text-text-primary transition-colors ml-2" title="Xóa tìm kiếm" onClick={() => setQuery("")}>
                    <span className="material-symbols-outlined text-[18px]">close</span>
                  </button>
                ) : null}
              </div>

              <div className="md:col-span-2">
                <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="w-full bg-surface-subtle text-text-secondary font-label-md text-label-md px-3 py-2.5 rounded-lg border-none focus:outline-none cursor-pointer">
                  <option value="">Trạng thái: Tất cả</option>
                  <option value="published">Đang phát hành</option>
                  <option value="draft">Bản nháp</option>
                  <option value="archived">Đã lưu trữ</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)} className="w-full bg-surface-subtle text-text-secondary font-label-md text-label-md px-3 py-2.5 rounded-lg border-none focus:outline-none cursor-pointer">
                  <option value="">Danh mục: Tất cả</option>
                  {categoryOptions.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <select value={stockFilter} onChange={(event) => setStockFilter(event.target.value)} className="w-full bg-surface-subtle text-text-secondary font-label-md text-label-md px-3 py-2.5 rounded-lg border-none focus:outline-none cursor-pointer">
                  <option value="">Tồn kho: Tất cả</option>
                  <option value="in_stock">Còn hàng (&gt; 10)</option>
                  <option value="low_stock">Sắp hết hàng (≤ 10)</option>
                  <option value="out_of_stock">Hết hàng (0)</option>
                </select>
              </div>

              <div className="md:col-span-1 flex justify-end">
                <button type="button" className="w-full h-10 flex items-center justify-center rounded-lg bg-surface-subtle hover:bg-surface-container text-text-secondary hover:text-text-primary transition-colors" title="Đặt lại bộ lọc" onClick={() => { setQuery(""); setStatusFilter(""); setCategoryFilter(""); setStockFilter(""); }}>
                  <span className="material-symbols-outlined text-[20px]">filter_alt_off</span>
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-text-muted font-body-sm text-body-sm">
              <div className="flex items-center gap-2">
                <span className="text-text-secondary font-medium">Tìm thấy <span className="text-text-primary font-bold">{filteredBooks.length}</span> tựa sách</span>
                <span className="text-text-muted">•</span>
                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded bg-surface-subtle text-text-secondary font-label-sm text-label-sm">Toàn bộ kho lưu ký</span>
                  <span className="px-2 py-0.5 rounded bg-surface-subtle text-text-secondary font-label-sm text-label-sm">Hiển thị Tiếng Việt</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-label-sm text-label-sm text-text-muted">Sắp xếp:</span>
                <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} className="bg-transparent text-text-primary font-label-sm text-label-sm font-semibold focus:outline-none cursor-pointer">
                  <option value="newest">Mới cập nhật gần nhất</option>
                  <option value="stock_desc">Tồn kho nhiều nhất</option>
                  <option value="stock_asc">Tồn kho ít nhất</option>
                  <option value="price_asc">Giá bán tăng dần</option>
                  <option value="price_desc">Giá bán giảm dần</option>
                  <option value="title_asc">Tên A–Z</option>
                </select>
              </div>
            </div>
          </div>

          {error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>
          ) : null}

          <div className="bg-surface-card rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-subtle text-text-muted font-label-sm text-label-sm uppercase tracking-wider">
                    <th className="py-3.5 px-4 w-12 text-center" scope="col">
                      <input className="w-4 h-4 rounded text-primary focus:ring-primary focus:ring-2 cursor-pointer" type="checkbox" checked={filteredBooks.length > 0 && selectedIds.length === filteredBooks.length} onChange={toggleSelectAll} />
                    </th>
                    <th className="py-3.5 px-4 min-w-[280px]" scope="col">Sách &amp; Tác giả</th>
                    <th className="py-3.5 px-4 min-w-[200px]" scope="col">Định danh &amp; Phiên bản</th>
                    <th className="py-3.5 px-4 min-w-[170px]" scope="col">Khoảng giá bán</th>
                    <th className="py-3.5 px-4 min-w-[130px]" scope="col">Tồn khả dụng</th>
                    <th className="py-3.5 px-4 min-w-[140px]" scope="col">Trạng thái</th>
                    <th className="py-3.5 px-4 min-w-[150px]" scope="col">Cập nhật</th>
                    <th className="py-3.5 px-4 w-28 text-right" scope="col">Thao tác</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-surface-border text-table-cell font-table-cell">
                  {loading ? (
                    <tr>
                      <td colSpan={8} className="py-10 text-center text-text-muted">Đang tải dữ liệu...</td>
                    </tr>
                  ) : pageBooks.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-10 text-center text-text-muted">Không có sách nào phù hợp.</td>
                    </tr>
                  ) : (
                    pageBooks.map((book) => {
                      const status = statusConfig[book.status] ?? statusConfig.published;
                      const availableQuantity = getAvailableQuantity(book);
                      const stockStatus = getStockStatus(availableQuantity);
                      const stock = stockConfig[stockStatus] ?? stockConfig.green;

                      return (
                        <tr key={book.id} className="hover:bg-surface-subtle/50 transition-colors group">
                          <td className="py-3.5 px-4 text-center">
                            <input className="row-checkbox w-4 h-4 rounded text-primary focus:ring-primary focus:ring-2 cursor-pointer" type="checkbox" checked={selectedIds.includes(book.id)} onChange={() => toggleSelect(book.id)} />
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-start gap-3.5">
                              <div className="w-12 h-18 shrink-0 bg-surface-subtle rounded overflow-hidden shadow-sm flex items-center justify-center">
                                <span className="text-xs font-semibold text-text-muted">{book.title?.slice(0, 1)?.toUpperCase() || "B"}</span>
                              </div>
                              <div className="space-y-1 min-w-0">
                                <Link href={`/admin/books/${book.id}`} className="font-headline-sm text-[15px] font-bold text-text-primary hover:text-primary leading-tight line-clamp-1">
                                  {book.title}
                                </Link>
                                <div className="flex items-center gap-1.5 text-text-secondary font-body-sm text-body-sm">
                                  <span className="font-medium text-text-primary">{book.authors?.[0]?.name || "Chưa có tác giả"}</span>
                                </div>
                                <div className="flex flex-wrap items-center gap-1 mt-1">
                                  {book.categories?.slice(0, 2).map((category) => (
                                    <span key={category.id} className="px-2 py-0.5 rounded bg-surface-subtle text-text-secondary font-label-sm text-[11px]">{category.name}</span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="space-y-1">
                              <div className="font-label-sm text-label-sm font-semibold text-text-primary">{book.edition?.sku ? `SKU: ${book.edition.sku}` : "Chưa có SKU"}</div>
                              <div className="text-text-muted font-body-sm text-body-sm">ISBN: <span className="font-mono text-text-secondary">{book.edition?.isbn || "Chưa có ISBN"}</span></div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="space-y-0.5">
                              <div className="font-price-md text-price-md text-text-primary">{money(book.edition?.sale_price_vnd)}</div>
                              <div className="font-body-sm text-[11px] text-text-muted">{book.edition?.list_price_vnd ? `Giá gốc: ${money(book.edition.list_price_vnd)}` : "Chưa có giá"}</div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${stock.className} font-label-sm text-label-sm font-semibold`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${stock.indicator}`} />
                              {availableQuantity <= 0 ? "Hết hàng" : availableQuantity <= 10 ? `Sắp hết (${availableQuantity})` : `Còn ${availableQuantity}`}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${status.className} font-label-sm text-label-sm font-semibold`}>
                              <span className="w-1.5 h-1.5 rounded-full bg-current/70" />
                              {status.label}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="space-y-0.5">
                              <div className="text-text-primary font-body-sm text-body-sm">{formatDate(book.updated_at)}</div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="inline-flex items-center gap-1">
                              <Link href={`/admin/books/${book.id}/edit`} className="p-1.5 text-text-muted hover:text-primary rounded hover:bg-surface-subtle transition-colors" title="Chỉnh sửa chi tiết">
                                <span className="material-symbols-outlined text-[18px]">edit</span>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {selectedCount > 0 ? (
              <div className="px-6 py-3 bg-primary text-on-primary flex items-center justify-between transition-all" id="bulkActionBar">
                <div className="flex items-center gap-3">
                  <span className="font-label-md text-label-md font-semibold"><span>{selectedCount}</span> đầu sách đã chọn</span>
                </div>
                <div className="flex items-center gap-2">
                  <button type="button" className="px-3 py-1.5 rounded bg-surface-card/10 hover:bg-surface-card/20 text-on-primary font-label-sm text-label-sm transition-colors">Lưu trữ tựa sách</button>
                </div>
              </div>
            ) : null}

            <div className="px-6 py-4 bg-surface-card flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-surface-border">
              <div className="flex items-center gap-3 text-text-muted font-body-sm text-body-sm">
                <span>Hiển thị <span className="font-medium text-text-primary">{filteredBooks.length === 0 ? 0 : startIndex + 1} - {Math.min(startIndex + pageSize, filteredBooks.length)}</span> trên <span className="font-medium text-text-primary">{filteredBooks.length}</span> đầu sách</span>
              </div>

              <div className="flex items-center gap-1">
                <button type="button" disabled={page === 1} onClick={() => setPage((current) => Math.max(1, current - 1))} className="p-2 rounded-lg text-text-muted hover:bg-surface-subtle disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer transition-colors" title="Trang trước">
                  <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                </button>
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                  <button
                    key={pageNumber}
                    type="button"
                    onClick={() => setPage(pageNumber)}
                    className={`w-8 h-8 rounded-lg font-label-sm text-label-sm flex items-center justify-center transition-colors ${page === pageNumber ? "bg-primary text-on-primary" : "text-text-secondary hover:bg-surface-subtle"}`}
                  >
                    {pageNumber}
                  </button>
                ))}
                <button type="button" disabled={page >= totalPages} onClick={() => setPage((current) => Math.min(totalPages, current + 1))} className="p-2 rounded-lg text-text-secondary hover:bg-surface-subtle disabled:opacity-40 disabled:hover:bg-transparent transition-colors" title="Trang tiếp theo">
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminPageShell>
  );
}
