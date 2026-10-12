"use client";

import { AdminPageShell } from "@/components/admin/AdminPageShell";
import Link from "next/link";
import { useMemo, useState } from "react";

type BookRow = {
  id: string;
  title: string;
  author: string;
  translator: string;
  category: string;
  tag: string;
  subtag?: string;
  sku: string;
  isbn: string;
  editionLabel: string;
  priceRange: string;
  listPrice: string;
  stock: string;
  stockTone: "green" | "amber" | "neutral";
  status: "published" | "draft";
  updatedAt: string;
  updatedBy: string;
  cover: string;
  price: string;
};

const sampleBooks: BookRow[] = [
  {
    id: "1",
    title: "Lịch sử Văn minh Phương Tây (Trọn bộ 2 tập)",
    author: "Will Durant",
    translator: "Huỳnh Phan Kim",
    category: "Lịch sử Thế giới",
    tag: "Kinh điển",
    sku: "DLF-HST-001",
    isbn: "978-604-58-9214-1",
    editionLabel: "2 Phiên bản (Bìa cứng / Bìa da)",
    priceRange: "680.000 ₫ - 1.250.000 ₫",
    listPrice: "Giá bìa: 1.400.000 ₫",
    stock: "248 cuốn",
    stockTone: "green",
    status: "published",
    updatedAt: "18/04/2025 09:30",
    updatedBy: "Lê Quỳnh Nga",
    cover: "https://lh3.googleusercontent.com/aida-public/AB6AXuDmTnYqsLdAvPe3wl4wTIxnWdi0l3bb58QgfG4D9MK_pf0KNIqv1eVjJ72hR2WC2SdPWbQ-_caV0MQP-O4isAwmOUWqHpogM99uKJSUpDWfaBk2GCmg92Mlzn5QHC661_4dczJhIgOzCP1j0NUAvFehF8kbJtzgwn6y6tha2HbzJ9863Ls1I4jVxCtT3LVdG5BsAGoCn9jvGAq9IMoSdOq1nAo_rLJ4IwIHMGUX15vdagjQEfrGgRVb",
    price: "680.000 ₫ - 1.250.000 ₫",
  },
  {
    id: "2",
    title: "Chiến lược Đại dương Xanh (Tái bản có sửa đổi)",
    author: "W. Chan Kim, Renée Mauborgne",
    translator: "Phương Thảo",
    category: "Kinh tế & Quản trị",
    tag: "Best Seller",
    sku: "DLF-ECO-014",
    isbn: "978-604-77-8321-0",
    editionLabel: "1 Phiên bản (Bìa mềm tay gập)",
    priceRange: "235.000 ₫",
    listPrice: "Giá bìa: 260.000 ₫",
    stock: "512 cuốn",
    stockTone: "green",
    status: "published",
    updatedAt: "17/04/2025 15:10",
    updatedBy: "Hoàng Hải Nam",
    cover: "https://lh3.googleusercontent.com/aida-public/AB6AXuACUsvEdp_LRke_-IqY-J7TLyeWIOalklfiFFk_UejAwOn6tlkRnYYhlsmDuV3sJ1iw2eIl15vAGyYNG8XgaqD0LJPco80VaRR0v3LY0J2AdBy3qsxJbGLJTIatQ87i7Z_w0orC7r1Olqz8UkAMBIyh12U2ttLv13aKGn2UQ93mQuJPnh4X3Wo2vp3ZulXPTwzBTfm6TI-oMK9zFM95oNWu3awhdvA6kZona8ddE2uUkHGUkxA6VcK9",
    price: "235.000 ₫",
  },
  {
    id: "3",
    title: "Đại dương trên đỉnh mây (Ấn bản đặc biệt Giới hạn)",
    author: "Trần Uyên Bách",
    translator: "Tác phẩm Việt Nam",
    category: "Văn học đương đại",
    tag: "Giới hạn 500 bản",
    subtag: "Giới hạn 500 bản",
    sku: "DLF-LIT-SP03",
    isbn: "978-604-33-1002-8",
    editionLabel: "1 Phiên bản (Bìa vải nhũ vàng)",
    priceRange: "450.000 ₫",
    listPrice: "Đồng giá niêm yết",
    stock: "6 cuốn còn lại",
    stockTone: "amber",
    status: "published",
    updatedAt: "17/04/2025 11:20",
    updatedBy: "Admin Master",
    cover: "https://lh3.googleusercontent.com/aida-public/AB6AXuAcT3bgPsto_B47u6y6LQwHZzSFU87YvAcoyPd3wfsc7hQ4gki-oqtr6u0P92vdVl5uX1nJh0TRKDXXiG_Py48XDmW6B1fiUXWr7u8c8KbZwuk_H1va3hoBC139DyqiO404ESQGbN7gp2-Zc2Mj7m28fXDeZaRS7kbqrrXfe23NTR2W7pDyYCETICxxBaXZMupLxcmdv3hA4GIqo-22ga-sK_c1dP3oRijWI8PDTKVfILwdPVDToGKM",
    price: "450.000 ₫",
  },
  {
    id: "4",
    title: "Thế giới Đã Thay Đổi Như Thế Nào",
    author: "Vaclav Smil",
    translator: "Đặng Tuấn Nghĩa",
    category: "Khoa học Xã hội",
    tag: "Năng lượng & Môi trường",
    sku: "DLF-SCI-082",
    isbn: "978-604-89-4412-5",
    editionLabel: "2 Phiên bản (Bìa mềm / Bìa cứng)",
    priceRange: "195.000 ₫ - 290.000 ₫",
    listPrice: "Giá bìa: 320.000 ₫",
    stock: "94 cuốn",
    stockTone: "green",
    status: "published",
    updatedAt: "15/04/2025 16:45",
    updatedBy: "Lê Quỳnh Nga",
    cover: "https://lh3.googleusercontent.com/aida-public/AB6AXuCDW1qHlLgQ5f6qgDPUiburkBYJHhnBQRiLAvkyiQ1HkJoZhm9dHcEwUa5x_CGhaZ7SRVRf-B6al9Uapz1xJTgV2sYJBqcWXk1tbMAiwAA4e-KmtsKWRkkcyawMR-6-sZQ7YFvtBYE0b8AP8pt1YnmenhouJ0pe8g2al6ozZqc98ndejzjlNvh8SVeioPhlt_R0_hwiushZHlxOBFUzjOJOA2xJy11rvC-cnca9-zNQEkN-9G7SEdnv",
    price: "195.000 ₫ - 290.000 ₫",
  },
  {
    id: "5",
    title: "Tâm lý học Về Tiền & Nghệ thuật Hạnh phúc",
    author: "Morgan Housel",
    translator: "Vũ Hoàng Giang",
    category: "Tài chính cá nhân",
    tag: "Tâm lý ứng dụng",
    sku: "DLF-FIN-DFT09",
    isbn: "Chờ cấp mã",
    editionLabel: "1 Phiên bản (Đang biên tập)",
    priceRange: "Chưa định giá",
    listPrice: "Dự kiến: 189.000 ₫",
    stock: "0 cuốn (Tiền kỳ)",
    stockTone: "neutral",
    status: "draft",
    updatedAt: "14/04/2025 18:02",
    updatedBy: "Hoàng Hải Nam",
    cover: "https://lh3.googleusercontent.com/aida-public/AB6AXuCcpsqV1WWFNYDmHTbUntNOcR6001Aclx8oP8ONxtJTg7psStDKJPPlqhYYUMW2djLnh_i875be2Zi-g7LnRn3fGKJVyUOq__uvBc1mSMV--hXn6rMNejI4SkfrL6K5dQ-TyPYVLIpZL2t6qDSE7E1SOqKBB49JgwG_RsX6ft98gHre9W4RiaFZcfzdpn2q4K06Hom2SrLt51Du_FkdUNLTpo0sxSlBG7-0yFNm9c3kdZk29l2sNfqB",
    price: "Chưa định giá",
  },
  {
    id: "6",
    title: "Cội Nguồn Văn Minh & Tư Tưởng Phương Đông",
    author: "Nhiều tác giả",
    translator: "GS. Đỗ Văn Hưng",
    category: "Triết học Phương Đông",
    tag: "Nghiên cứu học thuật",
    sku: "DLF-PHI-034",
    isbn: "978-604-55-9011-3",
    editionLabel: "1 Phiên bản (Bìa cứng gáy tròn)",
    priceRange: "340.000 ₫",
    listPrice: "Giá bìa: 380.000 ₫",
    stock: "185 cuốn",
    stockTone: "green",
    status: "published",
    updatedAt: "12/04/2025 08:15",
    updatedBy: "Lê Quỳnh Nga",
    cover: "https://lh3.googleusercontent.com/aida-public/AB6AXuA3F5F5ySuDNTSV9kWI-h6At9UDWqpBoEhLsqpXA0aE_t9F4qtnXPQ2Xw2_91y98bor-zSLqKWMKRkz8huri-7f5RT2dCOCO3GmbVaKyfANhlV-IGeUmasm-xGt-BHRieQmvBb-RAxw-BZk3oa-bb2Bgh0rbMydkDHEW5crukUyJpWSzvtl9txpQnAVI8ZvGsvdxEYaVqUU4cAk3j3TjsZcnU28-aNbnuxnWxXNZYQ2od9iG8FYwXuy",
    price: "340.000 ₫",
  },
  {
    id: "7",
    title: "Chủ nghĩa Khắc Kỷ: Từ Zeno đến Marcus Aurelius",
    author: "Ryan Holiday",
    translator: "Minh Đức",
    category: "Triết học Ứng dụng",
    tag: "Phát triển bản thân",
    sku: "DLF-STO-008",
    isbn: "978-604-99-2311-7",
    editionLabel: "2 Phiên bản (Bìa mềm / Bìa cứng)",
    priceRange: "210.000 ₫ - 315.000 ₫",
    listPrice: "Giá bìa: 350.000 ₫",
    stock: "420 cuốn",
    stockTone: "green",
    status: "published",
    updatedAt: "10/04/2025 14:10",
    updatedBy: "Hoàng Hải Nam",
    cover: "https://lh3.googleusercontent.com/aida-public/AB6AXuDHhmBDP9zUdkTM8WTVGHKB4GnlTX9mNmJno1cuDIGB14j090QeNBadoyxHum0LvSpOzNDM6lr56q0nycUL3Ir3Yv0C6TDe4WD8QVGQKYkZxH-xq_zF5Po2YkTeQTP2dfr2SWxbPUpmKvLdn8XS7elZ8wK62E4wIzyGJIyHkLboPy_9zDBEy6darIeHyWpWqY4MLm4xxEmZJmM-8pk2w_9BP0qTYKuylzR7FGqQRmVSFf0YcKkG8A_3",
    price: "210.000 ₫ - 315.000 ₫",
  },
];

const statusConfig: Record<string, { label: string; className: string }> = {
  published: {
    label: "Đang phát hành",
    className: "bg-status-emerald-bg text-status-emerald-text",
  },
  draft: {
    label: "Bản nháp",
    className: "bg-status-neutral-bg text-status-neutral-text",
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

export default function AdminBooksPage() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filteredBooks = useMemo(() => {
    return sampleBooks.filter((book) => {
      const matchQuery = !query || [book.title, book.author, book.sku, book.isbn, book.category].some((value) => value.toLowerCase().includes(query.toLowerCase()));
      const matchStatus = !statusFilter || (statusFilter === book.status);
      return matchQuery && matchStatus;
    });
  }, [query, statusFilter]);

  const toggleSelect = (bookId: string) => {
    setSelectedIds((current) => {
      if (current.includes(bookId)) {
        return current.filter((id) => id !== bookId);
      }
      return [...current, bookId];
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredBooks.length) {
      setSelectedIds([]);
      return;
    }
    setSelectedIds(filteredBooks.map((book) => book.id));
  };

  const selectedCount = selectedIds.length;

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
                <span className="px-2.5 py-0.5 rounded-full bg-surface-container font-label-sm text-label-sm text-primary font-semibold">1.248 tựa sách</span>
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
                <p className="font-headline-md text-headline-md text-text-primary font-bold">1.248</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[22px]">auto_stories</span>
              </div>
            </div>

            <div className="bg-surface-card rounded-xl p-4 shadow-sm flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-label-sm text-label-sm text-text-muted">Đang phát hành</p>
                <p className="font-headline-md text-headline-md text-status-emerald-text font-bold">1.180</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-status-emerald-bg flex items-center justify-center text-status-emerald-text">
                <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              </div>
            </div>

            <div className="bg-surface-card rounded-xl p-4 shadow-sm flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-label-sm text-label-sm text-text-muted">Bản nháp</p>
                <p className="font-headline-md text-headline-md text-text-secondary font-bold">42</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-surface-subtle flex items-center justify-center text-text-secondary">
                <span className="material-symbols-outlined text-[22px]">edit_note</span>
              </div>
            </div>

            <div className="bg-surface-card rounded-xl p-4 shadow-sm flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-label-sm text-label-sm text-text-muted">Đã lưu trữ</p>
                <p className="font-headline-md text-headline-md text-text-muted font-bold">26</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-surface-subtle flex items-center justify-center text-text-muted">
                <span className="material-symbols-outlined text-[22px]">inventory_2</span>
              </div>
            </div>

            <div className="col-span-2 md:col-span-1 bg-surface-card rounded-xl p-4 shadow-sm flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-label-sm text-label-sm text-status-amber-text">Cảnh báo tồn kho</p>
                <p className="font-headline-md text-headline-md text-status-amber-text font-bold">14 <span className="font-body-sm text-body-sm font-normal text-text-muted">tựa</span></p>
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
                </select>
              </div>

              <div className="md:col-span-2">
                <select className="w-full bg-surface-subtle text-text-secondary font-label-md text-label-md px-3 py-2.5 rounded-lg border-none focus:outline-none cursor-pointer">
                  <option value="">Danh mục: Tất cả</option>
                  <option value="classic">Văn học kinh điển</option>
                  <option value="philosophy">Triết học &amp; Tư tưởng</option>
                  <option value="economics">Kinh tế &amp; Quản trị</option>
                  <option value="history">Lịch sử Thế giới</option>
                  <option value="science">Khoa học Xã hội</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <select className="w-full bg-surface-subtle text-text-secondary font-label-md text-label-md px-3 py-2.5 rounded-lg border-none focus:outline-none cursor-pointer">
                  <option value="">Tồn kho: Tất cả</option>
                  <option value="in_stock">Còn hàng (&gt; 10)</option>
                  <option value="low_stock">Sắp hết hàng (≤ 10)</option>
                  <option value="out_of_stock">Hết hàng (0)</option>
                </select>
              </div>

              <div className="md:col-span-1 flex justify-end">
                <button type="button" className="w-full h-10 flex items-center justify-center rounded-lg bg-surface-subtle hover:bg-surface-container text-text-secondary hover:text-text-primary transition-colors" title="Đặt lại bộ lọc" onClick={() => { setQuery(""); setStatusFilter(""); }}>
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
                <select className="bg-transparent text-text-primary font-label-sm text-label-sm font-semibold focus:outline-none cursor-pointer">
                  <option>Mới cập nhật gần nhất</option>
                  <option>Tồn kho nhiều nhất</option>
                  <option>Tồn kho ít nhất</option>
                  <option>Giá bán tăng dần</option>
                  <option>Giá bán giảm dần</option>
                </select>
              </div>
            </div>
          </div>

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
                  {filteredBooks.map((book) => {
                    const status = statusConfig[book.status] ?? statusConfig.published;
                    const stock = stockConfig[book.stockTone] ?? stockConfig.green;

                    return (
                      <tr key={book.id} className="hover:bg-surface-subtle/50 transition-colors group">
                        <td className="py-3.5 px-4 text-center">
                          <input className="row-checkbox w-4 h-4 rounded text-primary focus:ring-primary focus:ring-2 cursor-pointer" type="checkbox" checked={selectedIds.includes(book.id)} onChange={() => toggleSelect(book.id)} />
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-start gap-3.5">
                            <div className="w-12 h-18 shrink-0 bg-surface-subtle rounded overflow-hidden shadow-sm flex items-center justify-center">
                              <img className="w-full h-full object-contain" src={book.cover} alt={book.title} />
                            </div>
                            <div className="space-y-1 min-w-0">
                              <Link href={`/admin/books/${book.id}`} className="font-headline-sm text-[15px] font-bold text-text-primary hover:text-primary leading-tight line-clamp-1">
                                {book.title}
                              </Link>
                              <div className="flex items-center gap-1.5 text-text-secondary font-body-sm text-body-sm">
                                <span className="font-medium text-text-primary">{book.author}</span>
                                <span className="text-text-muted">•</span>
                                <span>{book.translator}</span>
                              </div>
                              <div className="flex flex-wrap items-center gap-1 mt-1">
                                <span className="px-2 py-0.5 rounded bg-surface-subtle text-text-secondary font-label-sm text-[11px]">{book.category}</span>
                                <span className="px-2 py-0.5 rounded bg-surface-subtle text-text-secondary font-label-sm text-[11px]">{book.tag}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="space-y-1">
                            <div className="font-label-sm text-label-sm font-semibold text-text-primary">{book.editionLabel}</div>
                            <div className="text-text-muted font-body-sm text-body-sm">SKU: <span className="font-mono text-text-secondary">{book.sku}</span></div>
                            <div className="text-text-muted font-body-sm text-[11px]">ISBN: <span className="font-mono">{book.isbn}</span></div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="space-y-0.5">
                            <div className="font-price-md text-price-md text-text-primary">{book.priceRange}</div>
                            <div className="font-body-sm text-[11px] text-text-muted">{book.listPrice}</div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${stock.className} font-label-sm text-label-sm font-semibold`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${stock.indicator}`} />
                            {book.stock}
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
                            <div className="text-text-primary font-body-sm text-body-sm">{book.updatedAt}</div>
                            <div className="text-text-muted font-body-sm text-[11px]">bởi {book.updatedBy}</div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="inline-flex items-center gap-1">
                            <a className="p-1.5 text-text-muted hover:text-text-primary rounded hover:bg-surface-subtle transition-colors" href="#" target="_blank" title="Xem trên website">
                              <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                            </a>
                            <Link href={`/admin/books/${book.id}/edit`} className="p-1.5 text-text-muted hover:text-primary rounded hover:bg-surface-subtle transition-colors" title="Chỉnh sửa chi tiết">
                              <span className="material-symbols-outlined text-[18px]">edit</span>
                            </Link>
                            <button type="button" className="p-1.5 text-text-muted hover:text-text-primary rounded hover:bg-surface-subtle transition-colors" title="Tác vụ khác">
                              <span className="material-symbols-outlined text-[18px]">more_vert</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {selectedCount > 0 ? (
              <div className="px-6 py-3 bg-primary text-on-primary flex items-center justify-between transition-all" id="bulkActionBar">
                <div className="flex items-center gap-3">
                  <span className="font-label-md text-label-md font-semibold"><span>{selectedCount}</span> đầu sách đã chọn</span>
                  <span className="text-on-primary/40">•</span>
                  <button type="button" className="text-on-primary/80 hover:text-on-primary font-body-sm text-body-sm underline">Chọn tất cả 1.248 sách</button>
                </div>
                <div className="flex items-center gap-2">
                  <button type="button" className="px-3 py-1.5 rounded bg-surface-card/10 hover:bg-surface-card/20 text-on-primary font-label-sm text-label-sm transition-colors">Cập nhật danh mục</button>
                  <button type="button" className="px-3 py-1.5 rounded bg-surface-card/10 hover:bg-surface-card/20 text-on-primary font-label-sm text-label-sm transition-colors">Điều chỉnh giá nhanh</button>
                  <button type="button" className="px-3 py-1.5 rounded bg-surface-card/10 hover:bg-surface-card/20 text-on-primary font-label-sm text-label-sm transition-colors">Lưu trữ tựa sách</button>
                  <button type="button" className="px-3 py-1.5 rounded bg-error hover:bg-error-container text-on-primary font-label-sm text-label-sm transition-colors">Xóa khỏi hệ thống</button>
                </div>
              </div>
            ) : null}

            <div className="px-6 py-4 bg-surface-card flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-surface-border">
              <div className="flex items-center gap-3 text-text-muted font-body-sm text-body-sm">
                <span>Hiển thị <span className="font-medium text-text-primary">1 - {Math.min(filteredBooks.length, 7)}</span> trên <span className="font-medium text-text-primary">{filteredBooks.length}</span> đầu sách</span>
                <span className="text-text-muted">•</span>
                <div className="flex items-center gap-1.5">
                  <span>Hiển thị</span>
                  <select className="bg-surface-subtle text-text-secondary font-label-sm text-label-sm px-2.5 py-1 rounded border-none focus:outline-none cursor-pointer">
                    <option selected>10 dòng</option>
                    <option>20 dòng</option>
                    <option>50 dòng</option>
                    <option>100 dòng</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button type="button" className="p-2 rounded-lg text-text-muted hover:bg-surface-subtle disabled:opacity-40 disabled:hover:bg-transparent cursor-not-allowed transition-colors" disabled title="Trang trước">
                  <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                </button>
                <button type="button" className="w-8 h-8 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm font-semibold flex items-center justify-center">1</button>
                <button type="button" className="w-8 h-8 rounded-lg text-text-secondary hover:bg-surface-subtle font-label-sm text-label-sm flex items-center justify-center transition-colors">2</button>
                <button type="button" className="w-8 h-8 rounded-lg text-text-secondary hover:bg-surface-subtle font-label-sm text-label-sm flex items-center justify-center transition-colors">3</button>
                <span className="px-1.5 text-text-muted">...</span>
                <button type="button" className="w-8 h-8 rounded-lg text-text-secondary hover:bg-surface-subtle font-label-sm text-label-sm flex items-center justify-center transition-colors">125</button>
                <button type="button" className="p-2 rounded-lg text-text-secondary hover:bg-surface-subtle transition-colors" title="Trang tiếp theo">
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
