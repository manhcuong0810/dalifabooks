export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-40 w-full flex flex-col justify-between">

        {/* Top bar */}
        <div className="bg-primary text-on-primary py-space-xs px-margin-desktop">
          <div className="max-w-[1240px] mx-auto flex items-center justify-between text-body-sm font-body-sm">
            <div className="flex items-center gap-space-lg">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">call</span>
                <span>Hotline: <strong>1900 6868</strong> (8h00 - 21h00)</span>
              </span>
              <span className="hidden md:flex items-center gap-1.5 opacity-90">
                <span className="material-symbols-outlined text-[16px]">local_shipping</span>
                <span>Giao sách toàn quốc • Đóng gói cẩn trọng</span>
              </span>
            </div>
            <div className="flex items-center gap-space-md">
              <a href="#" className="hover:underline flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px]">search_check</span>
                <span>Tra cứu đơn hàng</span>
              </a>
              <span className="opacity-40">|</span>
              <a href="#" className="hover:underline flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px]">help_center</span>
                <span>Hỗ trợ bạn đọc</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main nav bar */}
        <div className="px-margin-desktop py-space-sm">
          <div className="max-w-[1240px] mx-auto flex items-center justify-between gap-space-lg">
            {/* Logo */}
            <div className="flex items-center gap-space-md shrink-0">
              <span className="material-symbols-outlined text-[32px] text-primary">menu_book</span>
              <a href="/" className="flex flex-col">
                <span className="font-headline-sm text-headline-sm font-bold tracking-tight text-primary leading-none">DalifaBooks</span>
                <span className="font-label-sm text-label-sm text-text-muted uppercase tracking-wider font-semibold">Tinh hoa văn hóa</span>
              </a>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-2xl hidden sm:block">
              <div className="relative flex items-center">
                <div className="absolute left-3.5 flex items-center pointer-events-none text-text-muted">
                  <span className="material-symbols-outlined text-[20px]">search</span>
                </div>
                <input
                  type="text"
                  placeholder="Tìm kiếm theo tên sách, tác giả, nhà xuất bản, mã ISBN..."
                  className="w-full pl-10 pr-24 py-2 bg-surface-card rounded-lg text-body-md font-body-md text-text-primary placeholder:text-text-muted shadow-[0_1px_4px_rgba(0,0,0,0.04)] focus:outline-none focus:ring-2 focus:ring-primary-container transition-all"
                />
                <button
                  type="button"
                  className="absolute right-1 px-4 py-1.5 bg-primary-container text-on-primary rounded-md font-label-md text-label-md hover:bg-primary transition-colors"
                >
                  Tìm kiếm
                </button>
              </div>
              <div className="flex items-center gap-2 mt-1.5 font-label-sm text-label-sm text-text-secondary">
                <span className="text-text-muted">Từ khóa:</span>
                <a href="#" className="hover:text-primary hover:underline">Sách bán chạy</a>
                <span>•</span>
                <a href="#" className="hover:text-primary hover:underline">Nguyễn Nhật Ánh</a>
                <span>•</span>
                <a href="#" className="hover:text-primary hover:underline">Combo văn học</a>
                <span>•</span>
                <a href="#" className="hover:text-primary hover:underline">Ấn bản giới hạn</a>
              </div>
            </div>

            {/* Cart + Account */}
            <div className="flex items-center gap-space-md shrink-0">
              <a
                href="/cart"
                className="relative flex items-center gap-2 px-3.5 py-2 rounded-lg bg-surface-card hover:bg-surface-subtle transition-colors shadow-[0_1px_4px_rgba(0,0,0,0.03)] text-on-surface"
              >
                <span className="material-symbols-outlined text-[24px] text-primary">shopping_bag</span>
                <div className="hidden lg:flex flex-col text-left">
                  <span className="font-label-sm text-label-sm text-text-muted leading-tight">Giỏ hàng</span>
                  <span className="font-label-md text-label-md font-semibold text-text-primary leading-tight">0 đ</span>
                </div>
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-secondary text-on-secondary font-label-sm text-label-sm font-bold flex items-center justify-center">0</span>
              </a>
              <a
                href="/login"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-card hover:bg-surface-subtle transition-colors shadow-[0_1px_4px_rgba(0,0,0,0.03)]"
              >
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
                </div>
                <div className="hidden xl:flex flex-col text-left">
                  <span className="font-label-sm text-label-sm text-text-muted leading-tight">Tài khoản</span>
                  <span className="font-label-md text-label-md font-semibold text-text-primary leading-tight">Đăng nhập</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Category nav */}
        <div className="bg-surface-card px-margin-desktop shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
          <div className="max-w-[1240px] mx-auto flex items-center justify-between">
            <nav className="flex items-center gap-1 py-1 flex-wrap">
              <a href="/" className="px-3.5 py-2 transition-all whitespace-nowrap bg-primary-container text-on-primary font-semibold rounded-lg text-label-md font-label-md">
                Trang chủ
              </a>
              {[
                { label: "Danh mục sách", href: "/books" },
                { label: "Tác phẩm mới", href: "/books?sort=new" },
                { label: "Bán chạy nhất", href: "/books?sort=best-seller" },
                { label: "Khuyến mãi & Combo", href: "/books?filter=promo" },
                { label: "Tin tức & Blog", href: "/blog" },
                { label: "Giới thiệu DalifaBooks", href: "/about" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="px-3.5 py-2 rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-subtle hover:text-on-surface transition-all whitespace-nowrap"
                >
                  {item.label}
                </a>
              ))}
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
