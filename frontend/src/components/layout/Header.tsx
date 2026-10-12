import Link from "next/link";
import CategoryDropdown from "@/components/layout/CategoryDropdown";

function BlogDropdown() {
  const blogMenuItems = [
    { label: "Văn hóa đọc & thảo luận", slug: "van-hoa-doc", count: "42 bài" },
    { label: "Điểm sách & phê bình", slug: "diem-sach", count: "29 bài" },
    { label: "Đối thoại tác giả & dịch giả", slug: "doi-thoai", count: "18 bài" },
    { label: "Tri thức & di sản", slug: "tri-thuc", count: "21 bài" },
    { label: "Nuôi dạy con & gia đình", slug: "nuoi-day-con", count: "12 bài" },
  ];

  return (
    <div className="group relative z-[1100]">
      <button
        type="button"
        className="flex items-center gap-1 whitespace-nowrap rounded-lg px-3.5 py-2 font-label-md text-label-md text-on-surface-variant transition-all group-hover:bg-surface-subtle group-hover:text-on-surface"
        aria-expanded="false"
      >
        <span>Tin tức &amp; Blog</span>
        <span className="material-symbols-outlined text-[16px]">expand_more</span>
      </button>

      <div className="absolute left-0 top-full z-[1200] hidden pt-1 group-hover:block group-focus-within:block">
        <div className="min-w-[320px] overflow-visible rounded-xl border border-surface-border bg-white shadow-[0_12px_30px_rgba(15,41,66,0.12)]">
          <div className="px-4 pb-2 pt-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-text-muted">
              Khám phá chuyên mục
            </span>
          </div>

          {blogMenuItems.map((item) => (
            <Link
              key={item.slug}
              href={`/blog?category=${item.slug}`}
              className="flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-surface-subtle"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-container text-primary">
                <span className="material-symbols-outlined text-[18px]">article</span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="block truncate font-medium text-text-primary">{item.label}</div>
                <div className="text-[12px] text-text-muted">{item.count}</div>
              </div>
              <span className="material-symbols-outlined text-[16px] text-text-muted">chevron_right</span>
            </Link>
          ))}

          <div className="border-t border-surface-border px-4 py-3">
            <Link href="/blog" className="flex items-center gap-2 font-semibold text-primary">
              <span>Xem toàn bộ nội dung</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Header({ active }: { active?: "home" | "books" | "blog" | "about" | "contact" }) {
  return (
    <header className="fixed left-0 right-0 top-0 z-[1000] overflow-visible bg-surface/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="w-full flex flex-col overflow-visible">
        <div className="bg-primary px-margin-desktop py-space-xs text-on-primary">
          <div className="mx-auto flex max-w-[1240px] items-center justify-between text-body-sm font-body-sm">
            <div className="flex items-center gap-space-lg">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">call</span>
                <span>
                  Hotline: <strong>1900 6868</strong> (8h00 - 21h00)
                </span>
              </span>
              <span className="hidden items-center gap-1.5 opacity-90 md:flex">
                <span className="material-symbols-outlined text-[16px]">local_shipping</span>
                <span>Giao sách toàn quốc • Đóng gói cẩn trọng</span>
              </span>
            </div>
            <div className="flex items-center gap-space-md">
              <Link href="/order-lookup" className="flex items-center gap-1 hover:underline">
                <span className="material-symbols-outlined text-[15px]">search_check</span>
                <span>Tra cứu đơn hàng</span>
              </Link>
              <span className="opacity-40">|</span>
              <Link href="/contact" className="flex items-center gap-1 hover:underline">
                <span className="material-symbols-outlined text-[15px]">help_center</span>
                <span>Hỗ trợ bạn đọc</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="px-margin-desktop py-space-sm">
          <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-space-lg">
            <div className="flex shrink-0 items-center gap-space-md">
              <span className="material-symbols-outlined text-[32px] text-primary">menu_book</span>
              <Link href="/" className="flex flex-col">
                <span className="font-headline-sm text-headline-sm font-bold tracking-tight text-primary leading-none">DalifaBooks</span>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-text-muted font-semibold">Tinh hoa văn hóa</span>
              </Link>
            </div>

            <div className="hidden max-w-2xl flex-1 sm:block">
              <div className="relative flex items-center">
                <div className="pointer-events-none absolute left-3.5 flex items-center text-text-muted">
                  <span className="material-symbols-outlined text-[20px]">search</span>
                </div>
                <input
                  className="w-full rounded-lg bg-surface-card py-2 pl-10 pr-24 text-body-md font-body-md text-text-primary shadow-[0_1px_4px_rgba(0,0,0,0.04)] placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary-container"
                  placeholder="Tìm kiếm theo tên sách, tác giả, nhà xuất bản, mã ISBN..."
                  type="text"
                />
                <button
                  type="button"
                  className="absolute right-1 rounded-md bg-primary-container px-4 py-1.5 text-label-md font-label-md text-on-primary transition-colors hover:bg-primary"
                >
                  Tìm kiếm
                </button>
              </div>
              <div className="mt-1.5 flex items-center gap-2 font-label-sm text-label-sm text-text-secondary">
                <span className="text-text-muted">Từ khóa:</span>
                <Link href="#" className="hover:text-primary hover:underline">Sách bán chạy</Link>
                <span>•</span>
                <Link href="#" className="hover:text-primary hover:underline">Nguyễn Nhật Ánh</Link>
                <span>•</span>
                <Link href="#" className="hover:text-primary hover:underline">Combo văn học</Link>
                <span>•</span>
                <Link href="#" className="hover:text-primary hover:underline">Ấn bản giới hạn</Link>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-space-md">
              <Link
                href="/cart"
                className="relative flex items-center gap-2 rounded-lg bg-surface-card px-3.5 py-2 text-on-surface shadow-[0_1px_4px_rgba(0,0,0,0.03)] transition-colors hover:bg-surface-subtle"
              >
                <span className="material-symbols-outlined text-[24px] text-primary">shopping_bag</span>
                <div className="hidden flex-col text-left lg:flex">
                  <span className="font-label-sm text-label-sm leading-tight text-text-muted">Giỏ hàng</span>
                  <span className="font-label-md text-label-md font-semibold leading-tight text-text-primary">0 đ</span>
                </div>
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-label-sm font-label-sm font-bold text-on-secondary">
                  0
                </span>
              </Link>
              <Link
                href="/login"
                className="flex items-center gap-2 rounded-lg bg-surface-card px-3 py-1.5 shadow-[0_1px_4px_rgba(0,0,0,0.03)] transition-colors hover:bg-surface-subtle"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                  <span className="material-symbols-outlined text-[18px] text-on-primary">person</span>
                </div>
                <div className="hidden flex-col text-left xl:flex">
                  <span className="font-label-sm text-label-sm leading-tight text-text-muted">Tài khoản</span>
                  <span className="font-label-md text-label-md font-semibold leading-tight text-text-primary">Đăng nhập</span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-surface-card px-margin-desktop shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
          <div className="mx-auto flex max-w-[1240px] items-center justify-between">
            <nav className="relative z-[1100] flex min-w-0 items-center gap-1 overflow-visible whitespace-nowrap py-1">
              <Link
                href="/"
                className={`whitespace-nowrap rounded-lg px-3.5 py-2 font-label-md text-label-md transition-all ${
                  active === "home"
                    ? "bg-primary-container text-on-primary font-semibold"
                    : "text-on-surface-variant hover:bg-surface-subtle hover:text-on-surface"
                }`}
              >
                Trang chủ
              </Link>

              <CategoryDropdown />

              <BlogDropdown />

              <Link
                href="/about"
                className={`whitespace-nowrap rounded-lg px-3.5 py-2 font-label-md text-label-md transition-all ${
                  active === "about"
                    ? "bg-primary-container text-on-primary font-semibold"
                    : "text-on-surface-variant hover:bg-surface-subtle hover:text-on-surface"
                }`}
              >
                Giới thiệu DalifaBooks
              </Link>

              <Link
                href="/contact"
                className={`whitespace-nowrap rounded-lg px-3.5 py-2 font-label-md text-label-md transition-all ${
                  active === "contact"
                    ? "bg-primary-container text-on-primary font-semibold"
                    : "text-on-surface-variant hover:bg-surface-subtle hover:text-on-surface"
                }`}
              >
                Liên Hệ
              </Link>
            </nav>

            <div className="hidden md:flex items-center gap-2 font-label-sm text-label-sm text-secondary font-semibold">
              <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse"></span>
              <span>Tuần lễ Sách Văn học Giảm tới 40%</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
