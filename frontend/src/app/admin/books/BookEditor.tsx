"use client";

import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { adminFetch } from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type BookStatus = "draft" | "published" | "archived";
type EditionFormat = "paperback" | "hardcover";

type WarehouseOption = {
  id: string;
  name: string;
  code?: string;
  city?: string;
  location?: string;
};

type WarehouseStock = {
  warehouseId: string;
  quantity: number;
};

type BookAttribute = {
  key: string;
  value: string;
};

type CategoryItem = { id: string; name: string; slug: string };
type AuthorItem = { id: string; name: string; slug: string };
type PublisherItem = { id: string; name: string; slug: string };

type BookRecord = {
  id: string;
  title: string;
  slug: string;
  description?: string;
  status: BookStatus;
  authors: AuthorItem[];
  categories: CategoryItem[];
  edition?: {
    id: string;
    sku?: string;
    isbn?: string | null;
    publisher?: PublisherItem | null;
    language?: string;
    format?: EditionFormat;
    page_count?: number | null;
    list_price_vnd?: number;
    sale_price_vnd?: number;
    status?: string;
  } | null;
};

const normalizeSlug = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "book";

const moneyInput = (value?: number | string) => {
  if (typeof value === "number") return Number.isFinite(value) ? String(value) : "";
  if (typeof value === "string") return value;
  return "";
};

export function BookEditor({ mode, bookId }: { mode: "create" | "edit"; bookId?: string }) {
  const router = useRouter();
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [authors, setAuthors] = useState<AuthorItem[]>([]);
  const [publishers, setPublishers] = useState<PublisherItem[]>([]);
  const [warehouseOptions, setWarehouseOptions] = useState<WarehouseOption[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<BookStatus>("draft");
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [publisherId, setPublisherId] = useState("");
  const [sku, setSku] = useState("");
  const [isbn, setIsbn] = useState("");
  const [language, setLanguage] = useState("vi");
  const [format, setFormat] = useState<EditionFormat>("paperback");
  const [pageCount, setPageCount] = useState("320");
  const [listPrice, setListPrice] = useState("0");
  const [salePrice, setSalePrice] = useState("0");
  const [warehouseStocks, setWarehouseStocks] = useState<WarehouseStock[]>([]);
  const [attributes, setAttributes] = useState<BookAttribute[]>([
    { key: "Hình thức đóng gói", value: "Bộ 2 tập kèm hộp cứng (Boxset)" },
    { key: "Kích thước", value: "16 x 24 x 6 cm" },
  ]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [categoryResult, authorResult, publisherResult, warehouseResult] = await Promise.all([
          adminFetch<CategoryItem[]>("/categories"),
          adminFetch<AuthorItem[]>("/authors"),
          adminFetch<PublisherItem[]>("/publishers"),
          adminFetch<WarehouseOption[]>("/inventory"),
        ]);

        const nextWarehouses = warehouseResult ?? [];
        setCategories(categoryResult ?? []);
        setAuthors(authorResult ?? []);
        setPublishers(publisherResult ?? []);
        setWarehouseOptions(nextWarehouses);

        if (nextWarehouses.length > 0) {
          setWarehouseStocks((current) => {
            if (current.length > 0) return current;
            return [{ warehouseId: nextWarehouses[0].id, quantity: 0 }];
          });
        }

        if (mode === "edit" && bookId) {
          const books = (await adminFetch<BookRecord[]>("/books")) ?? [];
          const match = books.find((item) => item.id === bookId);
          if (!match) return;

          setTitle(match.title ?? "");
          setSlug(match.slug ?? "");
          setDescription(match.description ?? "");
          setStatus(match.status ?? "draft");
          setSelectedAuthors(match.authors?.map((author) => author.id) ?? []);
          setSelectedCategories(match.categories?.map((category) => category.id) ?? []);
          setPublisherId(match.edition?.publisher?.id ?? "");
          setSku(match.edition?.sku ?? "");
          setIsbn(match.edition?.isbn ?? "");
          setLanguage(match.edition?.language ?? "vi");
          setFormat((match.edition?.format as EditionFormat) ?? "paperback");
          setPageCount(String(match.edition?.page_count ?? 320));
          setListPrice(moneyInput(match.edition?.list_price_vnd ?? 0));
          setSalePrice(moneyInput(match.edition?.sale_price_vnd ?? match.edition?.list_price_vnd ?? 0));
        }
      } catch (error) {
        console.error(error);
        alert("Không thể tải dữ liệu danh mục / tác giả / nhà xuất bản.");
      } finally {
        setLoadingData(false);
      }
    };

    loadData();
  }, [bookId, mode]);

  useEffect(() => {
    if (!title.trim()) {
      if (mode === "create") {
        setSlug("");
      }
      return;
    }

    if (mode === "create") {
      setSlug((current) => current && current !== normalizeSlug(title) ? current : normalizeSlug(title));
    }
  }, [title, mode]);

  useEffect(() => {
    if (warehouseOptions.length === 0 || warehouseStocks.length > 0) return;
    setWarehouseStocks([{ warehouseId: warehouseOptions[0].id, quantity: 0 }]);
  }, [warehouseOptions, warehouseStocks.length]);

  const toggleAuthor = (id: string) => {
    setSelectedAuthors((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  };

  const toggleCategory = (id: string) => {
    setSelectedCategories((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  };

  const addWarehouseRow = () => {
    if (warehouseOptions.length === 0) return;

    setWarehouseStocks((current) => [
      ...current,
      {
        warehouseId: warehouseOptions.find((option) => !current.some((item) => item.warehouseId === option.id))?.id ?? warehouseOptions[0].id,
        quantity: 0,
      },
    ]);
  };

  const updateWarehouseRow = (index: number, field: keyof WarehouseStock, value: string | number) => {
    setWarehouseStocks((current) =>
      current.map((item, currentIndex) => (currentIndex === index ? { ...item, [field]: value } : item))
    );
  };

  const removeWarehouseRow = (index: number) => {
    setWarehouseStocks((current) => (current.length <= 1 ? current : current.filter((_, currentIndex) => currentIndex !== index)));
  };

  const addAttribute = () => {
    setAttributes((current) => [...current, { key: "", value: "" }]);
  };

  const updateAttribute = (index: number, field: keyof BookAttribute, value: string) => {
    setAttributes((current) => current.map((item, currentIndex) => (currentIndex === index ? { ...item, [field]: value } : item)));
  };

  const removeAttribute = (index: number) => {
    setAttributes((current) => (current.length <= 1 ? current : current.filter((_, currentIndex) => currentIndex !== index)));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      alert("Tên sách là bắt buộc.");
      return;
    }

    const payload = {
      title: title.trim(),
      slug: slug.trim() || normalizeSlug(title),
      description: description.trim(),
      status,
      author_ids: selectedAuthors,
      category_ids: selectedCategories,
      seo_title: title.trim(),
      seo_description: description.trim().slice(0, 500),
      warehouse_stocks: warehouseStocks
        .filter((item) => item.warehouseId)
        .map((item) => ({
          warehouse_id: item.warehouseId,
          quantity: Number(item.quantity) || 0,
        })),
      attributes: attributes.filter((item) => item.key.trim() || item.value.trim()),
      edition: {
        sku: sku.trim() || `${normalizeSlug(title).toUpperCase().replace(/[^A-Z0-9]+/g, "-")}-01`,
        isbn: isbn.trim(),
        publisher_id: publisherId || null,
        language,
        format,
        publication_date: new Date().toISOString(),
        page_count: Number(pageCount) || 0,
        list_price_vnd: Number(listPrice) || 0,
        sale_price_vnd: Number(salePrice) || Number(listPrice) || 0,
        status: "active",
      },
    };

    try {
      setSaving(true);
      if (mode === "edit" && bookId) {
        await adminFetch(`/books/${bookId}`, {
          method: "PATCH",
          body: JSON.stringify(payload),
        });
      } else {
        await adminFetch("/books", {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }
      router.push("/admin/books");
    } catch (error) {
      console.error(error);
      alert(mode === "edit" ? "Không thể lưu thay đổi sách." : "Không thể lưu sách mới.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminPageShell activePath="/admin/books">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="sticky top-16 z-30 mb-6 bg-surface-card/95 px-6 py-3.5 shadow-sm backdrop-blur-md">
          <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4">
            <div className="min-w-0">
              <nav className="mb-1 flex items-center gap-1.5 text-label-sm font-label-sm text-text-muted">
                <Link href="/admin/books" className="transition-colors hover:text-primary">Quản lý Sách</Link>
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                <span className="font-medium text-text-primary">{mode === "edit" ? "Chỉnh sửa Tác phẩm Sách" : "Thêm sách mới"}</span>
              </nav>
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-headline-sm font-headline-sm font-bold text-text-primary">
                  {mode === "edit" ? "Chỉnh sửa Tác phẩm Sách" : "Tạo mới đầu sách"}
                </h1>
                {mode === "edit" && (
                  <span className="rounded bg-surface-subtle px-2 py-0.5 text-label-sm font-label-sm font-semibold text-primary">#{bookId?.slice(0, 8).toUpperCase()}</span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Link href="/admin/books" className="rounded-lg bg-surface-subtle px-3 py-2 text-label-md font-label-md text-text-secondary transition-colors hover:bg-surface-container-high">
                Hủy bỏ
              </Link>
              <button type="button" className="rounded-lg bg-surface-subtle px-4 py-2 text-label-md font-label-md font-semibold text-text-primary transition-colors hover:bg-surface-container">
                Lưu nháp
              </button>
              <button type="submit" disabled={saving || loadingData} className="rounded-lg bg-primary px-5 py-2 text-label-md font-label-md font-semibold text-on-primary shadow-sm transition-colors hover:bg-primary-container disabled:cursor-not-allowed disabled:opacity-60">
                {saving ? "Đang lưu..." : mode === "edit" ? "Lưu & Xuất bản" : "Lưu sách"}
              </button>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-7xl px-0 pb-16">
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-8">
              <section className="rounded-xl bg-surface-card p-6 shadow-sm">
                <div className="mb-5 flex items-center justify-between pb-2">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[22px] text-primary">auto_stories</span>
                    <h2 className="text-headline-sm font-headline-sm font-bold text-text-primary">Thông tin Cơ bản Tác phẩm</h2>
                  </div>
                  <span className="text-label-sm font-label-sm text-text-muted">Bắt buộc nhập chính xác</span>
                </div>

                <div className="space-y-5">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-label-md font-label-md font-semibold text-text-primary">Tên tác phẩm / Tựa sách <span className="text-status-rose-text">*</span></label>
                      <span className="text-label-sm font-label-sm text-text-muted">{title.trim().length}/300 ký tự</span>
                    </div>
                    <input
                      value={title}
                      onChange={(event) => {
                        const nextTitle = event.target.value.slice(0, 300);
                        setTitle(nextTitle);
                        const nextSlug = normalizeSlug(nextTitle);
                        setSlug((current) => (current && current !== normalizeSlug(title) ? current : nextSlug));
                      }}
                      className="w-full rounded-lg bg-surface-card px-3.5 py-2.5 text-body-lg text-text-primary shadow-sm outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Ví dụ: Lịch sử Văn minh Phương Tây"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-label-md font-label-md font-semibold text-text-primary">Đường dẫn tĩnh (Slug URL)</label>
                    <div className="flex items-center rounded-lg bg-surface-subtle px-3 py-2 shadow-sm">
                      <span className="select-none text-body-sm text-text-muted">dalifabooks.vn/book/</span>
                      <input
                        value={slug}
                        onChange={(event) => setSlug(event.target.value.trim().toLowerCase())}
                        className="w-full bg-transparent px-1 text-body-sm text-text-primary focus:outline-none"
                        placeholder="lich-su-van-minh-phuong-tay"
                      />
                      <button type="button" onClick={() => setSlug(normalizeSlug(title))} className="rounded bg-surface-card px-2.5 py-1 text-label-sm font-label-sm font-semibold text-primary hover:bg-surface-container">
                        Tự tạo lại
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="text-label-md font-label-md font-semibold text-text-primary">Danh mục Chính &amp; Phụ</label>
                      <div className="space-y-2 rounded-lg bg-surface-card p-2.5 shadow-sm">
                        <div className="flex min-h-[42px] flex-wrap gap-1.5">
                          {selectedCategories.length === 0 ? (
                            <span className="text-body-sm text-text-muted">Chưa có danh mục nào được chọn</span>
                          ) : (
                            categories.filter((category) => selectedCategories.includes(category.id)).map((category) => (
                              <span key={category.id} className="inline-flex items-center gap-1 rounded-full bg-surface-subtle px-2.5 py-1 text-label-sm font-label-sm text-text-secondary">
                                <span>{category.name}</span>
                                <button type="button" onClick={() => toggleCategory(category.id)} className="flex items-center text-text-muted hover:text-status-rose-text" aria-label={`Bỏ chọn ${category.name}`}>
                                  <span className="material-symbols-outlined text-[14px]">close</span>
                                </button>
                              </span>
                            ))
                          )}
                        </div>
                        <div className="space-y-2 pt-1">
                          {categories.length > 0 ? (
                            categories.map((category) => (
                              <label key={category.id} className="flex items-center gap-2 text-body-sm text-text-primary">
                                <input type="checkbox" checked={selectedCategories.includes(category.id)} onChange={() => toggleCategory(category.id)} className="h-4 w-4 rounded border-surface-border-strong text-primary focus:ring-primary" />
                                <span>{category.name}</span>
                              </label>
                            ))
                          ) : (
                            <span className="text-body-sm text-text-muted">Đang tải danh mục...</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-label-md font-label-md font-semibold text-text-primary">Tác giả biên soạn</label>
                      <div className="space-y-2 rounded-lg bg-surface-card p-2.5 shadow-sm">
                        <div className="flex min-h-[42px] flex-wrap gap-1.5">
                          {selectedAuthors.length === 0 ? (
                            <span className="text-body-sm text-text-muted">Chưa chọn tác giả</span>
                          ) : (
                            authors.filter((author) => selectedAuthors.includes(author.id)).map((author) => (
                              <span key={author.id} className="inline-flex items-center gap-1 rounded-full bg-surface-container px-2.5 py-1 text-label-sm font-label-sm text-text-primary">
                                <span className="material-symbols-outlined text-[14px] text-text-muted">person</span>
                                <span>{author.name}</span>
                                <button type="button" onClick={() => toggleAuthor(author.id)} className="flex items-center text-text-muted hover:text-status-rose-text" aria-label={`Bỏ chọn ${author.name}`}>
                                  <span className="material-symbols-outlined text-[14px]">close</span>
                                </button>
                              </span>
                            ))
                          )}
                        </div>
                        <div className="space-y-2 pt-1">
                          {authors.length > 0 ? (
                            authors.map((author) => (
                              <label key={author.id} className="flex items-center gap-2 text-body-sm text-text-primary">
                                <input type="checkbox" checked={selectedAuthors.includes(author.id)} onChange={() => toggleAuthor(author.id)} className="h-4 w-4 rounded border-surface-border-strong text-primary focus:ring-primary" />
                                <span>{author.name}</span>
                              </label>
                            ))
                          ) : (
                            <span className="text-body-sm text-text-muted">Đang tải tác giả...</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="text-label-md font-label-md font-semibold text-text-primary">Nhà xuất bản đối tác</label>
                      <select value={publisherId} onChange={(event) => setPublisherId(event.target.value)} className="w-full rounded-lg bg-surface-card px-3.5 py-2.5 text-body-md text-text-primary shadow-sm outline-none focus:ring-2 focus:ring-primary">
                        <option value="">-- Chọn nhà xuất bản --</option>
                        {publishers.map((publisher) => (
                          <option key={publisher.id} value={publisher.id}>{publisher.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-label-md font-label-md font-semibold text-text-primary">Dịch giả / Hiệu đính</label>
                      <input value={""} onChange={() => {}} className="w-full rounded-lg bg-surface-card px-3.5 py-2.5 text-body-md text-text-primary shadow-sm outline-none focus:ring-2 focus:ring-primary" placeholder="Nhập tên dịch giả hoặc hiệu đính" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-label-md font-label-md font-semibold text-text-primary">Lời giới thiệu &amp; Nội dung tác phẩm</label>
                    <textarea
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                      rows={10}
                      className="w-full rounded-lg bg-surface-card px-3.5 py-2.5 text-body-md text-text-primary shadow-sm outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Nhập mô tả, giới thiệu, điểm nổi bật của tác phẩm..."
                    />
                  </div>
                </div>
              </section>

              <section className="rounded-xl bg-surface-card p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[22px] text-primary">library_books</span>
                    <div>
                      <h2 className="text-headline-sm font-headline-sm font-bold text-text-primary">Các Phiên bản Phát hành (Editions)</h2>
                      <p className="text-body-sm text-text-muted">Quản lý các ấn bản đóng gáy, bìa cứng và bìa mềm.</p>
                    </div>
                  </div>
                  <button type="button" className="rounded-lg bg-surface-subtle px-3 py-2 text-label-md font-label-md font-semibold text-primary hover:bg-surface-container">
                    Thêm ấn bản mới
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="space-y-3 rounded-xl bg-surface-canvas p-4 shadow-sm">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="space-y-1.5">
                        <label className="text-label-md font-label-md font-semibold text-text-primary">SKU</label>
                        <input value={sku} onChange={(event) => setSku(event.target.value)} className="w-full rounded-lg bg-surface-card px-3 py-2 text-body-md text-text-primary shadow-sm outline-none focus:ring-2 focus:ring-primary" placeholder="DLF-BK-001" />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-label-md font-label-md font-semibold text-text-primary">ISBN</label>
                        <input value={isbn} onChange={(event) => setIsbn(event.target.value)} className="w-full rounded-lg bg-surface-card px-3 py-2 text-body-md text-text-primary shadow-sm outline-none focus:ring-2 focus:ring-primary" placeholder="978-604-..." />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <div className="space-y-1.5">
                        <label className="text-label-md font-label-md font-semibold text-text-primary">Ngôn ngữ</label>
                        <select value={language} onChange={(event) => setLanguage(event.target.value)} className="w-full rounded-lg bg-surface-card px-3 py-2 text-body-md text-text-primary shadow-sm outline-none focus:ring-2 focus:ring-primary">
                          <option value="vi">Tiếng Việt</option>
                          <option value="en">Tiếng Anh</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-label-md font-label-md font-semibold text-text-primary">Format</label>
                        <select value={format} onChange={(event) => setFormat(event.target.value as EditionFormat)} className="w-full rounded-lg bg-surface-card px-3 py-2 text-body-md text-text-primary shadow-sm outline-none focus:ring-2 focus:ring-primary">
                          <option value="paperback">Paperback</option>
                          <option value="hardcover">Hardcover</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-label-md font-label-md font-semibold text-text-primary">Số trang</label>
                        <input value={pageCount} onChange={(event) => setPageCount(event.target.value)} className="w-full rounded-lg bg-surface-card px-3 py-2 text-body-md text-text-primary shadow-sm outline-none focus:ring-2 focus:ring-primary" placeholder="320" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="space-y-1.5">
                        <label className="text-label-md font-label-md font-semibold text-text-primary">Giá niêm yết</label>
                        <input value={listPrice} onChange={(event) => setListPrice(event.target.value)} className="w-full rounded-lg bg-surface-card px-3 py-2 text-body-md text-text-primary shadow-sm outline-none focus:ring-2 focus:ring-primary" placeholder="350000" />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-label-md font-label-md font-semibold text-text-primary">Giá bán</label>
                        <input value={salePrice} onChange={(event) => setSalePrice(event.target.value)} className="w-full rounded-lg bg-surface-card px-3 py-2 text-body-md text-text-primary shadow-sm outline-none focus:ring-2 focus:ring-primary" placeholder="295000" />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <aside className="space-y-6 lg:col-span-4">
              <div className="rounded-xl bg-surface-card p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-headline-sm font-headline-sm font-bold text-text-primary">Trạng thái Xuất bản</h3>
                  <span className="h-2.5 w-2.5 rounded-full bg-status-emerald-text" />
                </div>
                <div className="space-y-3 text-body-sm text-text-muted">
                  <div className="flex items-center justify-between rounded-lg bg-surface-subtle px-3 py-2">
                    <span>Tình trạng:</span>
                    <select value={status} onChange={(event) => setStatus(event.target.value as BookStatus)} className="rounded bg-surface-card px-2 py-1 text-label-sm font-label-sm text-text-primary outline-none focus:ring-2 focus:ring-primary">
                      <option value="draft">Bản nháp</option>
                      <option value="published">Đang phát hành</option>
                      <option value="archived">Đã lưu trữ</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between px-1"><span>Ngày phát hành đầu:</span><span className="text-text-primary">15/10/2025</span></div>
                  <div className="flex items-center justify-between px-1"><span>Lần sửa cuối:</span><span className="text-text-primary">Hôm nay</span></div>
                  <div className="flex items-center justify-between px-1"><span>Người cập nhật:</span><span className="text-primary">Admin Master</span></div>
                </div>
              </div>

              <div className="rounded-xl bg-surface-card p-5 shadow-sm">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h3 className="text-headline-sm font-headline-sm font-bold text-text-primary">Quy cách &amp; Thuộc tính</h3>
                  <button type="button" onClick={addAttribute} className="rounded-lg bg-surface-subtle px-2.5 py-1.5 text-label-sm font-label-sm font-semibold text-primary hover:bg-surface-container">
                    + Thêm
                  </button>
                </div>
                <div className="mt-4 space-y-3 text-body-sm text-text-muted">
                  {attributes.map((attribute, index) => (
                    <div key={`${attribute.key}-${index}`} className="grid grid-cols-[1fr_1fr_auto] gap-2 rounded-lg bg-surface-canvas p-2.5 shadow-sm">
                      <input
                        value={attribute.key}
                        onChange={(event) => updateAttribute(index, "key", event.target.value)}
                        className="rounded-md border border-surface-border bg-surface-card px-2.5 py-2 text-text-primary outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Tên thuộc tính"
                      />
                      <input
                        value={attribute.value}
                        onChange={(event) => updateAttribute(index, "value", event.target.value)}
                        className="rounded-md border border-surface-border bg-surface-card px-2.5 py-2 text-text-primary outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Giá trị"
                      />
                      <button
                        type="button"
                        onClick={() => removeAttribute(index)}
                        className="rounded-md bg-surface-subtle p-2 text-text-muted hover:text-status-rose-text"
                        aria-label="Xóa thuộc tính"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl bg-surface-card p-5 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-headline-sm font-headline-sm font-bold text-text-primary">Tồn kho theo chi nhánh</h3>
                  <button type="button" onClick={addWarehouseRow} className="rounded-lg bg-surface-subtle px-2.5 py-1.5 text-label-sm font-label-sm font-semibold text-primary hover:bg-surface-container">
                    + Kho
                  </button>
                </div>
                <p className="mt-2 text-[11px] leading-relaxed text-text-muted">Danh sách chi nhánh nên quản lý ở mục Kho hàng riêng. Trong form thêm sách, chỉ cần chọn kho và nhập số lượng theo từng địa điểm.</p>
                <div className="mt-4 space-y-2.5">
                  {warehouseStocks.map((stock, index) => {
                    const warehouse = warehouseOptions.find((option) => option.id === stock.warehouseId) ?? warehouseOptions[0];

                    return (
                      <div key={`${stock.warehouseId}-${index}`} className="rounded-lg bg-surface-canvas p-2.5 shadow-sm">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[18px] text-text-muted">location_on</span>
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                              <select
                                value={stock.warehouseId}
                                onChange={(event) => updateWarehouseRow(index, "warehouseId", event.target.value)}
                                className="w-full rounded-md border border-surface-border bg-surface-card px-2.5 py-2 text-text-primary outline-none focus:ring-2 focus:ring-primary"
                              >
                                {warehouseOptions.map((option) => (
                                  <option key={option.id} value={option.id}>{option.name}</option>
                                ))}
                              </select>
                              <input
                                type="number"
                                min={0}
                                value={stock.quantity}
                                onChange={(event) => updateWarehouseRow(index, "quantity", Number(event.target.value) || 0)}
                                className="w-28 rounded-md border border-surface-border bg-surface-card px-2.5 py-2 text-text-primary outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Số lượng"
                              />
                              <button
                                type="button"
                                onClick={() => removeWarehouseRow(index)}
                                className="rounded-md bg-surface-subtle p-2 text-text-muted hover:text-status-rose-text"
                                aria-label="Xóa kho"
                              >
                                <span className="material-symbols-outlined text-[18px]">delete</span>
                              </button>
                            </div>
                            <span className="mt-2 block text-[11px] text-text-muted">
                              {warehouse.city ?? warehouse.code ?? "Chi nhánh"}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </form>
    </AdminPageShell>
  );
}
