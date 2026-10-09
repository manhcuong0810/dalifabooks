// SHOP-01 — Trang chủ
"use client";
// SHOP-01 — Trang chủ. JSX convert 1:1 từ HTML design gốc
import CategoryDropdown from "@/components/layout/CategoryDropdown";

export default function HomePage() {
  return (
    <>
      {/* ═══════════════════════════════════════════ HEADER ═══════════════════════════════════════════ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="w-full flex flex-col">

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
                <a className="hover:underline flex items-center gap-1" href="#">
                  <span className="material-symbols-outlined text-[15px]">search_check</span>
                  <span>Tra cứu đơn hàng</span>
                </a>
                <span className="opacity-40">|</span>
                <a className="hover:underline flex items-center gap-1" href="#">
                  <span className="material-symbols-outlined text-[15px]">help_center</span>
                  <span>Hỗ trợ bạn đọc</span>
                </a>
              </div>
            </div>
          </div>

          {/* Logo + Search + Cart/Account */}
          <div className="px-margin-desktop py-space-sm">
            <div className="max-w-[1240px] mx-auto flex items-center justify-between gap-space-lg">
              <div className="flex items-center gap-space-md shrink-0">
                <img alt="DalifaBooks logo" className="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1Wva0GO_ElHGhfotmX2mb7-4MLiu0uPlpblNn7_ZXu32gjbYc5VbcK6uNyvnf_ymtcRFltaFmWlLgZAAn-QC7XFlmuyTrFIRXkgk4Cyzid4CNyvtQz2bioiDnqHzrdQP4czZveDGhm-GiYWhTVXyUoimGE1rg3aNZ2sUp7t2K3OJSg2143_fkUSs4vQ4z1ewqypmuzTQrE9l3xuBg8m-DJbZAm1qLfp-_K2pu-VfCcgmUr4u-bFPrVCFx5HuroezN6EnqaaE2ze1A" />
                <a className="flex flex-col" href="#">
                  <span className="font-headline-sm text-headline-sm font-bold tracking-tight text-primary leading-none">DalifaBooks</span>
                  <span className="font-label-sm text-label-sm text-text-muted uppercase tracking-wider font-semibold">Tinh hoa văn hóa</span>
                </a>
              </div>
              <div className="flex-1 max-w-2xl hidden sm:block">
                <div className="relative flex items-center">
                  <div className="absolute left-3.5 flex items-center pointer-events-none text-text-muted">
                    <span className="material-symbols-outlined text-[20px]">search</span>
                  </div>
                  <input className="w-full pl-10 pr-24 py-2 bg-surface-card rounded-lg text-body-md font-body-md text-text-primary placeholder:text-text-muted shadow-[0_1px_4px_rgba(0,0,0,0.04)] focus:outline-none focus:ring-2 focus:ring-primary-container transition-all" placeholder="Tìm kiếm theo tên sách, tác giả, nhà xuất bản, mã ISBN..." type="text" />
                  <button className="absolute right-1 px-4 py-1.5 bg-primary-container text-on-primary rounded-md font-label-md text-label-md hover:bg-primary transition-colors" type="button">Tìm kiếm</button>
                </div>
                <div className="flex items-center gap-2 mt-1.5 font-label-sm text-label-sm text-text-secondary">
                  <span className="text-text-muted">Từ khóa:</span>
                  <a className="hover:text-primary hover:underline" href="#">Sách bán chạy</a>
                  <span>•</span>
                  <a className="hover:text-primary hover:underline" href="#">Nguyễn Nhật Ánh</a>
                  <span>•</span>
                  <a className="hover:text-primary hover:underline" href="#">Combo văn học</a>
                  <span>•</span>
                  <a className="hover:text-primary hover:underline" href="#">Ấn bản giới hạn</a>
                </div>
              </div>
              <div className="flex items-center gap-space-md shrink-0">
                <a className="relative flex items-center gap-2 px-3.5 py-2 rounded-lg bg-surface-card hover:bg-surface-subtle transition-colors shadow-[0_1px_4px_rgba(0,0,0,0.03)] text-on-surface" href="#">
                  <span className="material-symbols-outlined text-[24px] text-primary">shopping_bag</span>
                  <div className="hidden lg:flex flex-col text-left">
                    <span className="font-label-sm text-label-sm text-text-muted leading-tight">Giỏ hàng</span>
                    <span className="font-label-md text-label-md font-semibold text-text-primary leading-tight">0 đ</span>
                  </div>
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-secondary text-on-secondary font-label-sm text-label-sm font-bold flex items-center justify-center">0</span>
                </a>
                <a className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-card hover:bg-surface-subtle transition-colors shadow-[0_1px_4px_rgba(0,0,0,0.03)]" href="#">
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
              <nav className="flex items-center gap-1 py-1 overflow-x-auto">
                <a aria-current="page" className="px-3.5 py-2 transition-all whitespace-nowrap bg-primary-container text-on-primary font-semibold rounded-lg" href="/">Trang chủ</a>

                {/* Danh mục sách — dropdown */}
                <CategoryDropdown />

                <a className="px-3.5 py-2 rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-subtle hover:text-on-surface transition-all whitespace-nowrap" href="#">Tác phẩm mới</a>
                <a className="px-3.5 py-2 rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-subtle hover:text-on-surface transition-all whitespace-nowrap" href="#">Bán chạy nhất</a>
                <a className="px-3.5 py-2 rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-subtle hover:text-on-surface transition-all whitespace-nowrap" href="#">Khuyến mãi &amp; Combo</a>
                <a className="px-3.5 py-2 rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-subtle hover:text-on-surface transition-all whitespace-nowrap" href="#">Tin tức &amp; Blog</a>
                <a className="px-3.5 py-2 rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-subtle hover:text-on-surface transition-all whitespace-nowrap" href="#">Giới thiệu DalifaBooks</a>
              </nav>
              <div className="hidden md:flex items-center gap-2 font-label-sm text-label-sm text-secondary font-semibold">
                <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse"></span>
                <span>Tuần lễ Sách Văn học Giảm tới 40%</span>
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* ═══════════════════════════════════════════ MAIN ═══════════════════════════════════════════ */}
      <main className="w-full bg-surface min-h-screen" style={{ paddingTop: "128px" }}>
        <div className="max-w-[1240px] mx-auto px-margin-desktop py-space-lg">
          <div className="flex flex-col w-full gap-space-2xl">

            {/* ── 1. HERO BANNER ── */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-stretch">
              <div className="lg:col-span-8 relative rounded-xl overflow-hidden shadow-sm bg-primary text-on-primary min-h-[440px] flex flex-col justify-end p-space-xl">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD-nYljsu7BirNF3ORppqJ71ug3l5LYc0-rkaaM1oMfddHrGnBUt2FwBkbDsGHWn2Qe63foVwqE_DMq-6gK1gaip7LKbgeInu7ZjQJJvwVCElMkwc-jRRtw21118p9abIc032bBxdDHOprH_8dle6zImC0dqOtakmirNxbUX5INjddkRS__Tv1lfQQPiBu0nyEkFNUDIxBVYLSSktaIQam5hx9dJiiq7f1P_miiVWjHn9l_wyD8Hjdo')" }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/75 to-transparent"></div>
                <div className="relative z-10 flex flex-col max-w-xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/90 text-on-secondary-container text-label-sm font-label-sm w-fit mb-space-md shadow-sm">
                    <span className="material-symbols-outlined text-[16px]">auto_stories</span>
                    <span>Tuần Lễ Tôn Vinh Văn Hóa Đọc Việt Nam</span>
                  </div>
                  <h1 className="font-display-hero text-display-hero text-on-primary mb-space-sm leading-tight tracking-tight">Khơi nguồn tri thức — Chạm tới ước mơ</h1>
                  <p className="font-body-lg text-body-lg text-on-primary/90 mb-space-lg leading-relaxed">Đắm mình trong không gian chữ nghĩa tinh tuyển. Hơn 500 tựa sách văn học, tư tưởng và phát triển bản thân với ưu đãi đặc quyền lên tới 40%.</p>
                  <div className="flex flex-wrap items-center gap-space-md">
                    <a className="px-6 py-3 rounded-lg bg-secondary-container text-on-primary font-label-md text-label-md font-semibold hover:bg-secondary transition-all shadow-md flex items-center gap-2" href="#">
                      <span>Khám phá ngay</span>
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </a>
                    <a className="px-6 py-3 rounded-lg bg-surface-card/15 backdrop-blur-md text-on-primary font-label-md text-label-md font-medium hover:bg-surface-card/25 transition-all flex items-center gap-2" href="#">
                      <span className="material-symbols-outlined text-[18px]">collections_bookmark</span>
                      <span>Xem tuyển tập mới</span>
                    </a>
                  </div>
                </div>
                <div className="absolute bottom-5 right-6 z-10 flex items-center gap-1.5">
                  <span className="w-7 h-2 rounded-full bg-secondary-container"></span>
                  <span className="w-2 h-2 rounded-full bg-on-primary/40"></span>
                  <span className="w-2 h-2 rounded-full bg-on-primary/40"></span>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col justify-between gap-space-md">
                <div className="flex-1 bg-surface-card rounded-xl p-space-lg shadow-sm flex items-start gap-space-md hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-lg bg-surface-container-high text-primary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[26px]">local_shipping</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-headline-sm text-text-primary leading-tight">Miễn phí vận chuyển</span>
                    <p className="font-body-sm text-body-sm text-text-secondary mt-1">Đơn hàng từ 250.000đ khắp mọi miền tổ quốc. Đóng gói hộp carton 3 lớp bảo vệ mép sách.</p>
                  </div>
                </div>
                <div className="flex-1 bg-surface-card rounded-xl p-space-lg shadow-sm flex items-start gap-space-md hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-lg bg-status-amber-bg text-status-amber-text flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[26px]">bookmark_heart</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-headline-sm text-text-primary leading-tight">Bookmark mỹ thuật</span>
                    <p className="font-body-sm text-body-sm text-text-secondary mt-1">Tặng kèm thẻ đánh dấu sách vẽ màu nước độc bản của các hoạ sĩ DalifaBooks cho mỗi đơn hàng.</p>
                  </div>
                </div>
                <div className="flex-1 bg-surface-card rounded-xl p-space-lg shadow-sm flex items-start gap-space-md hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-lg bg-status-emerald-bg text-status-emerald-text flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[26px]">published_with_changes</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-headline-sm text-text-primary leading-tight">Đổi trả 7 ngày linh hoạt</span>
                    <p className="font-body-sm text-body-sm text-text-secondary mt-1">Cam kết 100% sách chính hãng bản quyền. Đổi mới ngay lập tức nếu lỗi in ấn, nhăn gáy hoặc dập góc.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* ── 2. CATEGORY GRID ── */}
            <section className="flex flex-col">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg gap-2">
                <div>
                  <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-semibold block mb-1">Khám phá theo lĩnh vực</span>
                  <h2 className="font-headline-lg text-headline-lg text-text-primary">Danh mục sách tuyển chọn</h2>
                </div>
                <a className="font-label-md text-label-md text-primary hover:text-secondary flex items-center gap-1 font-semibold group" href="#">
                  <span>Xem tất cả danh mục</span>
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </a>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-space-md">
                {[
                  { icon: "menu_book", label: "Văn học kinh điển", count: "1.240 tựa" },
                  { icon: "trending_up", label: "Kinh tế & Khởi nghiệp", count: "860 tựa" },
                  { icon: "self_improvement", label: "Phát triển bản thân", count: "620 tựa" },
                  { icon: "psychology", label: "Tâm lý học hành vi", count: "450 tựa" },
                  { icon: "biotech", label: "Khoa học - Đổi mới", count: "380 tựa" },
                  { icon: "child_care", label: "Thiếu nhi & Nuôi dạy", count: "540 tựa" },
                  { icon: "account_balance", label: "Lịch sử - Triết học", count: "490 tựa" },
                ].map((cat) => (
                  <a key={cat.label} className="bg-surface-card rounded-xl p-space-md shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex flex-col items-center text-center group" href="#">
                    <div className="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors mb-space-sm">
                      <span className="material-symbols-outlined text-[28px]">{cat.icon}</span>
                    </div>
                    <span className="font-label-md text-label-md font-semibold text-text-primary group-hover:text-primary transition-colors">{cat.label}</span>
                    <span className="font-body-sm text-body-sm text-text-muted mt-1">{cat.count}</span>
                  </a>
                ))}
              </div>
            </section>

            {/* ── 3. NEW RELEASES ── */}
            <section className="flex flex-col">
              <div className="flex items-center justify-between mb-space-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-8 bg-secondary-container rounded-full"></div>
                  <div>
                    <h2 className="font-headline-lg text-headline-lg text-text-primary">Tác phẩm mới tuyển chọn</h2>
                    <span className="font-body-sm text-body-sm text-text-secondary">Những ấn phẩm vừa cập bến kho sách DalifaBooks trong tuần</span>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <button aria-label="Lùi lại" className="w-10 h-10 rounded-lg bg-surface-card hover:bg-surface-container text-text-primary shadow-sm flex items-center justify-center transition-colors" type="button">
                    <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                  </button>
                  <button aria-label="Tiếp theo" className="w-10 h-10 rounded-lg bg-surface-card hover:bg-surface-container text-text-primary shadow-sm flex items-center justify-center transition-colors" type="button">
                    <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-lg">
                {[
                  { author: "Nguyên Phong", title: "Muôn Kiếp Nhân Sinh (Tập 3)", price: "214.000 đ", original: "268.000 đ", discount: "-20%", format: "Bìa cứng", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDGVkeJdKEX162T40SJwi2-dX6hKBYChVpIKvd5G_CY9-xH_o1a89I4WtcwSACDIdGctn72AZeXdL4aKe_wSb4ePhR7dMtEfd9pte4FWP4NJMBTlfbzk47pZ93YtURSMm8Lsy6zxCNjGf0llzuCBDAr5a9-ZLol9ft2FhF9Gg_g1T693dxGlYSZMtAoxlQnVnGX9cljnlzlPByV_kzZpOUXmWEUHlQ01AtiZISr126SEI6hJJD63z89" },
                  { author: "Morgan Housel", title: "Tâm Lý Học Về Tiền", price: "142.000 đ", original: "190.000 đ", discount: "-25%", format: "Bìa mềm", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5eMoHBIJZweQu_Eu9D_aG1_ObUEuprLLfbPxw0WEtoagiyYSYk_KJXIqv_FngpNY5RsAWyxm4QA_iv0RgpSBzF0oHwNIRDIWmIaiQurybePF3rPvP181-d-Z4rjblkiaHVdPoj1BlH_-IhJItOqF-RjLdZB0gii2eV4l1qDIVpSUmES90yxM-MpbbE8NWuIINZh2RMWKW1-8gC6fdn-oINlJwyj8aFiHcGD2cyKHWHnCqb5GM4vfz" },
                  { author: "Andrea Hirata", title: "Chiến Binh Cầu Vồng (Tái bản 2026)", price: "93.500 đ", original: "110.000 đ", discount: "-15%", format: "Bìa mềm", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBdEo8YCfwCQFkADKU-k6p9lxnSCdTc2QIPtLI9bWzZkxjfKmP9z4sGW1eGlg93uT-KJlEwjZLr0FJ-K0CoyGYerzEBTnLYcRBc6Aa0YNLdoXMwErwdoGaCPQpu6VI5x6icYNfCVKg9v3skXjlmCeMEUOtb_Cq0LfkDAtq4d3HmfsIGQMyrTVGo3pOo8ETOEVFJVaSlYjYQc8j6sfLsb76znLvbPFVDzI1JMX9pS_gxfotz3adPq-g2" },
                  { author: "Paulo Coelho", title: "Nhà Giả Kim (Ấn Bản Giới Hạn)", price: "162.000 đ", original: "198.000 đ", discount: "-18%", format: "Ấn bản đặc biệt", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD7QOfFbe60EBzZ6zHB5PlVeITQsT6aWscXW1oqUweaoqH31vHGM7XYhmzfjMg5-4EDG5cQETT_WDqUYRb3hImreHmdgdAeHck0_v55QRuiQDcz0i3dH5-IDPAvi111GMOhBbrCbVau22kXFR_aYFNmlpKDMUsLK499rpBCY9p-o3C6_ndWPLUVQIKSmule5nB1ivY8YxoLnHSntdJrUzlOKgkA4khe6CAa5ZMzNbHdUMZ5SCz9qelq" },
                ].map((book) => (
                  <div key={book.title} className="bg-surface-card rounded-xl p-space-md shadow-sm hover:shadow-md transition-all flex flex-col group">
                    <div className="relative w-full aspect-[2/3] bg-surface-subtle rounded-lg overflow-hidden flex items-center justify-center mb-space-md">
                      <img className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105" src={book.img} alt={book.title} />
                      <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-status-rose-bg text-status-rose-text font-label-sm text-label-sm font-semibold">{book.discount}</span>
                      <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-surface-card/90 backdrop-blur-sm text-text-primary font-label-sm text-label-sm font-medium">{book.format}</span>
                    </div>
                    <div className="flex flex-col flex-1">
                      <span className="font-body-sm text-body-sm text-text-secondary line-clamp-1 mb-1">{book.author}</span>
                      <a className="font-headline-sm text-headline-sm text-text-primary group-hover:text-primary transition-colors line-clamp-2 leading-tight font-semibold mb-2" href="#">{book.title}</a>
                      <div className="mt-auto pt-2 flex items-baseline gap-2 mb-space-md">
                        <span className="font-price-lg text-price-lg text-secondary">{book.price}</span>
                        <span className="font-body-sm text-body-sm text-text-muted line-through">{book.original}</span>
                      </div>
                      <button className="w-full py-2.5 px-3 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold hover:bg-primary transition-colors flex items-center justify-center gap-2" type="button">
                        <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
                        <span>Thêm vào giỏ</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── 4. BEST SELLERS ── */}
            <section className="bg-surface-card rounded-xl p-space-xl shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-space-lg gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="material-symbols-outlined text-secondary text-[22px]">military_tech</span>
                    <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold">Bảng xếp hạng tháng</span>
                  </div>
                  <h2 className="font-headline-lg text-headline-lg text-text-primary">Tác phẩm được yêu thích nhất</h2>
                </div>
                <div className="flex items-center gap-2 bg-surface-subtle p-1 rounded-lg">
                  <button className="px-3.5 py-1.5 rounded-md bg-surface-card text-text-primary font-label-sm text-label-sm font-semibold shadow-sm" type="button">Tháng này</button>
                  <button className="px-3.5 py-1.5 rounded-md text-text-muted hover:text-text-primary font-label-sm text-label-sm font-medium transition-colors" type="button">Quý 1/2026</button>
                  <button className="px-3.5 py-1.5 rounded-md text-text-muted hover:text-text-primary font-label-sm text-label-sm font-medium transition-colors" type="button">Cả năm</button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-space-md">
                {[
                  { rank: 1, rankCls: "bg-secondary text-on-secondary", author: "Yuval Noah Harari", title: "Sapiens: Lược Sử Loài Người", price: "235.000 đ", sold: "1.8k", rating: "4.9", stars: 5, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCatCQC3o8BylhNRjg2RiiPNzaDoIm9VQ1yVOY-7GytI15qq51SObFQN5nYIQkkLfXXdOB3lJvgNP_OVWq_-H2PuJEJdWxU28j6-VwHsV4Y6aSX7VZgJHlH5D4Iw5ypBfhbVdNvAV6skisR-rz1vs4zNlEWiZ-Ty_Gou-wWdX0BSmwyPEyeJp0rV3D1Mtmd0bbcdDd0-vI_KvJ7G90ypesCHwO1-5ldrct5p-0qSfN_iMqb2l9pdYb8" },
                  { rank: 2, rankCls: "bg-primary text-on-primary", author: "José Mauro de Vasconcelos", title: "Cây Cam Ngọt Của Tôi", price: "86.000 đ", sold: "1.4k", rating: "4.8", stars: 4, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCeQxPhY3gjQwxRIIlEHNt9e1lp33UDuFAO0DVlGAnmw2PIc4rtwLBD978SuaKqynzq2ZDMWCGfrwKJt0TIFJ8mtTtz8o7LShJpHEQtUeWcp_-E-mRRql-XkLsP1MPIiyF0XX9aA6BD8DIWEFi0Ue8St3UYTRdCsFuGYw8GYGxBAWb_0fMrQ5A9H7Jz3mAPpi9sVxlT9pG4hnnyrV8HkeE5qa3u660KbwsHVn87cBRQpyHV05qhY7h" },
                  { rank: 3, rankCls: "bg-text-secondary text-on-primary", author: "Rosie Nguyễn", title: "Tuổi Trẻ Đáng Giá Bao Nhiêu?", price: "79.000 đ", sold: "1.1k", rating: "4.7", stars: 4, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgdLIftmH9lv4eSio7f8w6k5AodGyJies1xq4Tb0EO9dX_v2MNSPcRkT7sO6_CXlOmPX7xZEuMIRbym9xSfneqMXW7UD6Xwh4Lyy9J948SUUPP9D91-9dpJLJOLiS45HARH-6m3vya5cvi4djdtG-W91FCH02BvUgPq6f-nqYMdVPlbbVG0dMy1oeP6B94Z6fDLJweGlqJdSU03RaTbN7Q3g3KCCMChh4qsULfCbnBLaWLSiZNMt40" },
                  { rank: 4, rankCls: "bg-surface-border-strong text-text-primary", author: "Haruki Murakami", title: "Rừng Na Uy (Ấn Bản Kỷ Niệm)", price: "136.000 đ", sold: "980", rating: "4.8", stars: 4, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDknVqYYukCQTe8cnPAuj22YY1xmWfG6YhCnOfNIaWv7s2-Jv7E93XvW1HX1gCZ9u-DhfuYOGhGw_ji_sw0qp4iJbCzKmpPJbKZd6sj0eQ-GDX50yIjPSd1NeaGwxeJ-YSdso2mA3cASUZCqy3HF1zCho7jwjv4fJ8ausht9teii55IcrLY5vwjR6MJnySLlZaMB2GSocd17-Y4opQrWUU7gko2i19C820booN16cnAYB0TffPEbd-E" },
                  { rank: 5, rankCls: "bg-surface-border-strong text-text-primary", author: "Daniel Kahneman", title: "Tư Duy Nhanh Và Chậm", price: "198.000 đ", sold: "850", rating: "4.9", stars: 5, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAjydd7jIQHuTKWZvYqYVfqT_zRhdGYvKC1-ZBFq9nhp1My1qqWe37jnjs-Z5MaSP0SkbKJnWsdGh4Ms38dghtWoUzrPw5NfKsTfkn63Nd6NdHGBaxyenLeQGBMUDG5E6Iwjkidaq5sZQdeEm8NUVe0iudL9D587LwHjZS04WX17E_maFwT0v6GnaQ2AFfjyvKSslXaj4BSHfXTV5zIRLYKL9KfAQ867_-ymr538LtNN9ep8qWpK_Zn" },
                ].map((book) => (
                  <div key={book.rank} className="bg-surface-container-low rounded-lg p-space-md flex flex-col relative group hover:shadow-md transition-all">
                    <div className={`absolute -top-3 left-4 w-7 h-7 rounded-full ${book.rankCls} font-headline-sm text-headline-sm font-bold flex items-center justify-center shadow-md`}>{book.rank}</div>
                    <div className="w-full aspect-[2/3] rounded-md overflow-hidden bg-surface-subtle mb-space-sm mt-2 flex items-center justify-center">
                      <img className="w-full h-full object-contain group-hover:scale-105 transition-transform" src={book.img} alt={book.title} />
                    </div>
                    <span className="font-body-sm text-body-sm text-text-secondary line-clamp-1">{book.author}</span>
                    <h3 className="font-headline-sm text-headline-sm text-text-primary line-clamp-2 leading-tight font-semibold mt-1 mb-2">{book.title}</h3>
                    <div className="flex items-center gap-1 text-secondary mb-2">
                      {Array.from({ length: book.stars }).map((_, i) => (
                        <span key={i} className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      ))}
                      {book.stars < 5 && <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star_half</span>}
                      <span className="font-label-sm text-label-sm text-text-secondary ml-1">({book.rating})</span>
                    </div>
                    <div className="mt-auto pt-1 flex items-baseline justify-between">
                      <span className="font-price-md text-price-md text-secondary">{book.price}</span>
                      <span className="font-body-sm text-body-sm text-text-muted">Đã bán {book.sold}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── 5. THEME COLLECTION ── */}
            <section className="rounded-xl overflow-hidden bg-primary-container text-on-primary shadow-sm relative">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                <div className="lg:col-span-7 p-space-xl lg:p-space-2xl flex flex-col z-10">
                  <div className="inline-flex items-center gap-2 text-secondary-fixed text-label-sm font-label-sm uppercase tracking-widest font-semibold mb-space-sm">
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                    <span>Chuyên đề DalifaBooks Số 04</span>
                  </div>
                  <h2 className="font-headline-lg text-headline-lg text-on-primary mb-space-md">Tuyển Tập Tác Gia Văn Học Thế Kỷ 20</h2>
                  <blockquote className="bg-primary/40 backdrop-blur-sm rounded-lg p-space-md mb-space-lg text-on-primary/95 italic font-body-lg text-body-lg leading-relaxed">
                    "Một cuốn sách thực sự không chỉ mở ra thế giới, mà còn mở ra những căn phòng đóng kín trong tâm hồn người đọc mà chính họ cũng chưa từng biết tới."
                    <footer className="not-italic font-label-md text-label-md text-secondary-fixed mt-2 font-medium">— Lời tựa Tuyển tập Văn chương Cổ điển</footer>
                  </blockquote>
                  <p className="font-body-md text-body-md text-on-primary-container mb-space-lg max-w-xl">Khám phá 12 kiệt tác văn chương định hình thế kỷ: từ ngòi bút hiện thực sắc lạnh của Franz Kafka, Albert Camus đến thế giới mộng ảo bất tận của Gabriel García Márquez. Bộ ấn bản song ngữ được bọc bìa vải lanh kèm chữ ký lưu niệm.</p>
                  <div className="flex flex-wrap items-center gap-space-md">
                    <a className="px-6 py-3 rounded-lg bg-secondary text-on-secondary font-label-md text-label-md font-semibold hover:bg-on-secondary-fixed-variant transition-colors shadow-md flex items-center gap-2" href="#">
                      <span>Chiêm ngưỡng trọn bộ</span>
                      <span className="material-symbols-outlined text-[18px]">menu_book</span>
                    </a>
                    <span className="font-body-sm text-body-sm text-on-primary-container">Ưu đãi đặc biệt: Tặng hộp quà sơn mài cho 100 đơn hàng đầu tiên</span>
                  </div>
                </div>
                <div className="lg:col-span-5 relative h-full min-h-[360px] p-space-lg flex items-center justify-center">
                  <div className="w-full h-80 rounded-xl overflow-hidden bg-cover bg-center shadow-2xl" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAED7iGY2F8AF-_wLM2_Ju4gj88gkk4vrk9QTT8fv1OKFtNCfWn1Htj58Nry88tH-nHpyUaHlLi1vPnw-OnBU6r3bCFuv137zFu6mTKzbVoPKZf49Ch8W5e_1eO5R4dj19SCJHFHfbteFwLc0Sjdv8PgjGNOhiZbJtak3Zq_fJag7XA6NIkeldoRH-G1o6jrLVqOTJw_ueaUuVBzH9g4JrfvxbofMf_ODSiGRkzRbF2DfGLwzg2lGUs')" }}></div>
                </div>
              </div>
            </section>

            {/* ── 6. BLOG ── */}
            <section className="flex flex-col">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg gap-2">
                <div>
                  <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-semibold block mb-1">Góc văn hóa &amp; bài viết</span>
                  <h2 className="font-headline-lg text-headline-lg text-text-primary">Góc Bạn Đọc &amp; Điểm Sách</h2>
                </div>
                <a className="font-label-md text-label-md text-primary hover:text-secondary flex items-center gap-1 font-semibold group" href="#">
                  <span>Xem tất cả bài viết</span>
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
                {[
                  { cat: "Điểm sách kinh tế", date: "22 Tháng 3, 2026", time: "6 phút đọc", title: "5 Cuốn sách thay đổi tư duy tài chính và tự do cá nhân bạn cần đọc trước tuổi 30", excerpt: "Tiền bạc không chỉ là bài toán cộng trừ số học mà là một tấm gương phản chiếu sâu sắc về tâm lý, nỗi sợ và kỷ luật bền bỉ của con người qua thời gian...", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6VYxT6pH0ctnqLltGDecyM4nt1-EdPnneHVfhHC819KiMM36_5ubicZ3RZIYytvZqhKqp-LcbeW6fMGgtXFVp1dXoc82RTQ3DvNYWSeN6Nt9XUFVIQFaTwHjwIrmWk2n6PBv8OvVdkw6bApwgKtGmVwDDgfql1c_nfo9r8rOHprgHISrtdP8891zvo_IrYtQnyHSWauLk98IpgCbxgvuC04RlZZwTWiZK19HwuSMv_4_YNMnCuCA6" },
                  { cat: "Đối thoại tác giả", date: "18 Tháng 3, 2026", time: "9 phút đọc", title: "Gặp gỡ dịch giả tác phẩm kinh điển: \"Mỗi bản dịch là một lần tái sinh của ngôn từ\"", excerpt: "Cuộc trò chuyện độc quyền cùng dịch giả Lê Quang về hành trình ròng rã 3 năm chuyển ngữ nguyên tác tiếng Đức và niềm say mê giữ gìn phong vị văn học cổ điển...", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAkoGkdpymrxoC9d0lVs6ji71S-bnBfHLHzafhAh7eXiGbye9DPGUL5vtPVSRUh_GP-2M0mQYn8zNsiwgdyNtIvQ-P7_relWJErtEJNojmfJTf_xMMxwWENTAw0wE5QaS-8UbDeqE9KsNVVMElIxm1JKhy9xPHJXUrvkbtZNMpVCXrSQCdTypFeQp0B2_av3hDRAOC0ojC3PuoKd2FU7pCVogUHB8EArM7QGTzid6_hLJueurrWuQOx" },
                  { cat: "Nuôi dạy con", date: "15 Tháng 3, 2026", time: "5 phút đọc", title: "Nghệ thuật nuôi dưỡng tình yêu sách cho con trẻ trong kỷ nguyên màn hình cảm ứng", excerpt: "Làm sao để biến 15 phút trước giờ đi ngủ thành khoảnh khắc kỳ diệu nhất trong ngày mà không cần áp lực hay ép buộc? Lắng nghe chuyên gia tâm lý chia sẻ...", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAR-J9vgbmoA61gWPPG7OBnTkVPr0Gnp9cG6oGL8gkWOHSPGoL3jEJYl8mYGT1KAMzJgKlDwbuB3B5nAnelbZrDzf4T1uj1mMaTWlaHd-tWpdpU1V44zboXSeTMw5gZ0EbTBnKC3WyFonmeE15FapOYuJ2XtHs880az_d-UQIgyvub1ABaOgg0goBw5CVWJ-hidwmV1L_QDEYNDb3BVK_c1XM6vRv42tuJl5PbwUuDZMwk3bc8vG7Yk" },
                ].map((a) => (
                  <article key={a.cat} className="bg-surface-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col group">
                    <div className="w-full h-48 overflow-hidden bg-surface-subtle relative">
                      <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={a.img} alt={a.title} />
                      <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded bg-surface-card/90 backdrop-blur-sm text-text-primary font-label-sm text-label-sm font-semibold">{a.cat}</span>
                    </div>
                    <div className="p-space-lg flex flex-col flex-1">
                      <div className="flex items-center gap-2 text-text-muted font-body-sm text-body-sm mb-2">
                        <span>{a.date}</span><span>•</span><span>{a.time}</span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-text-primary group-hover:text-primary transition-colors leading-snug font-semibold mb-2">{a.title}</h3>
                      <p className="font-body-sm text-body-sm text-text-secondary line-clamp-3 mb-space-md">{a.excerpt}</p>
                      <div className="mt-auto pt-space-sm flex items-center gap-2 text-primary font-label-sm text-label-sm font-semibold">
                        <span>Đọc tiếp bài phân tích</span>
                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* ── 7. NEWSLETTER ── */}
            <section className="bg-surface-container rounded-xl p-space-xl md:p-space-2xl shadow-sm relative overflow-hidden">
              <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-primary/5 pointer-events-none"></div>
              <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-secondary-container text-on-primary flex items-center justify-center mb-space-md shadow-md">
                  <span className="material-symbols-outlined text-[30px]">card_giftcard</span>
                </div>
                <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-semibold mb-1">Đặc quyền bạn đọc thân thiết</span>
                <h2 className="font-headline-lg text-headline-lg text-text-primary mb-space-sm">Gia nhập Câu Lạc Bộ Độc Giả DalifaBooks</h2>
                <p className="font-body-md text-body-md text-text-secondary leading-relaxed mb-space-lg">
                  Đăng ký nhận bản tin tuyển chọn hôm nay để nhận ngay <strong className="text-secondary font-semibold">Voucher giảm 20.000đ</strong> cho đơn hàng đầu tiên cùng đặc quyền tham gia buổi trò chuyện trực tuyến với các dịch giả hàng đầu.
                </p>
                <form className="w-full max-w-md flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted flex items-center pointer-events-none">
                      <span className="material-symbols-outlined text-[20px]">mail</span>
                    </div>
                    <input className="w-full pl-10 pr-4 py-3 rounded-lg bg-surface-card text-text-primary placeholder:text-text-muted font-body-md text-body-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Nhập địa chỉ email của bạn..." required type="email" />
                  </div>
                  <button className="px-6 py-3 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-semibold hover:bg-primary-container transition-colors shadow-sm shrink-0 flex items-center justify-center gap-1.5" type="submit">
                    <span>Nhận mã ưu đãi</span>
                    <span className="material-symbols-outlined text-[18px]">send</span>
                  </button>
                </form>
                <div className="flex items-center gap-4 mt-space-md text-text-muted font-body-sm text-body-sm">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-status-emerald-text">check_circle</span>
                    <span>Không gửi thư rác</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-status-emerald-text">check_circle</span>
                    <span>Hủy đăng ký bất kỳ lúc nào</span>
                  </span>
                </div>
              </div>
            </section>

          </div>
        </div>
      </main>

      {/* ═══════════════════════════════════════════ FOOTER ═══════════════════════════════════════════ */}
      <footer className="w-full bg-surface-card shadow-[0_-2px_12px_rgba(0,0,0,0.03)] mt-space-2xl">
        <div className="bg-surface-container-low py-space-xl px-margin-desktop">
          <div className="max-w-[1240px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-xl items-center">
            <div>
              <h4 className="font-headline-sm text-headline-sm text-text-primary mb-1">Bản tin bạn đọc Dalifa</h4>
              <p className="font-body-sm text-body-sm text-text-secondary">Nhận giới thiệu sách tuyển chọn, sự kiện ký tặng và ưu đãi độc quyền hàng tuần.</p>
            </div>
            <div className="lg:col-span-2">
              <form className="flex flex-col sm:flex-row gap-2">
                <input className="flex-1 px-4 py-2.5 rounded-lg bg-surface-card text-body-md font-body-md text-text-primary placeholder:text-text-muted shadow-[0_1px_4px_rgba(0,0,0,0.04)] focus:outline-none focus:ring-2 focus:ring-primary-container" placeholder="Nhập địa chỉ email của bạn..." type="email" />
                <button className="px-6 py-2.5 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-semibold hover:bg-primary-container transition-colors shrink-0" type="button">Đăng ký nhận tin</button>
              </form>
            </div>
            <div className="flex items-center gap-space-sm font-label-sm text-label-sm text-text-secondary">
              <span className="material-symbols-outlined text-secondary text-[22px]">verified_user</span>
              <span>Cam kết 100% sách có bản quyền xuất bản chính hãng</span>
            </div>
          </div>
        </div>
        <div className="max-w-[1240px] mx-auto px-margin-desktop py-space-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-space-xl">
            <div className="lg:col-span-2 pr-0 lg:pr-space-lg">
              <div className="flex items-center gap-space-sm mb-space-md">
                <img alt="DalifaBooks" className="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1Wva0GO_ElHGhfotmX2mb7-4MLiu0uPlpblNn7_ZXu32gjbYc5VbcK6uNyvnf_ymtcRFltaFmWlLgZAAn-QC7XFlmuyTrFIRXkgk4Cyzid4CNyvtQz2bioiDnqHzrdQP4czZveDGhm-GiYWhTVXyUoimGE1rg3aNZ2sUp7t2K3OJSg2143_fkUSs4vQ4z1ewqypmuzTQrE9l3xuBg8m-DJbZAm1qLfp-_K2pu-VfCcgmUr4u-bFPrVCFx5HuroezN6EnqaaE2ze1A" />
                <span className="font-headline-sm text-headline-sm font-bold tracking-tight text-primary">DalifaBooks</span>
              </div>
              <p className="font-body-sm text-body-sm text-text-secondary leading-relaxed mb-space-md">DalifaBooks là nền tảng phân phối và phát hành sách văn hóa, tư tưởng, khoa học và văn học cao cấp tại Việt Nam. Chúng tôi tin vào sức mạnh bền bỉ của tri thức và sự thấu cảm từ từng trang sách được ấn hành chỉn chu.</p>
              <div className="flex flex-col gap-2 font-body-sm text-body-sm text-text-secondary">
                <div className="flex items-start gap-2"><span className="material-symbols-outlined text-[18px] text-primary shrink-0 mt-0.5">location_on</span><span>Trụ sở chính: Tầng 6, Toà nhà Văn hoá Tri thức, Phố Đinh Lễ, Hoàn Kiếm, Hà Nội</span></div>
                <div className="flex items-start gap-2"><span className="material-symbols-outlined text-[18px] text-primary shrink-0 mt-0.5">store</span><span>Chi nhánh TP.HCM: 142 Nguyễn Thị Minh Khai, Phường Võ Thị Sáu, Quận 3, TP.HCM</span></div>
                <div className="flex items-center gap-2"><span className="material-symbols-outlined text-[18px] text-primary shrink-0">mail</span><span>contact@dalifabooks.vn • bbt@dalifabooks.vn</span></div>
              </div>
            </div>
            <div>
              <h4 className="font-headline-sm text-headline-sm text-text-primary mb-space-md font-semibold">Hỗ trợ khách hàng</h4>
              <ul className="flex flex-col gap-2.5 font-body-sm text-body-sm text-text-secondary">
                {["Chính sách đổi trả & hoàn tiền", "Chính sách giao hàng toàn quốc", "Chính sách bảo mật dữ liệu", "Điều khoản dịch vụ sử dụng", "Hướng dẫn tra cứu đơn hàng", "Câu hỏi thường gặp (FAQ)"].map(i => (
                  <li key={i}><a className="hover:text-primary transition-colors" href="#">{i}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-headline-sm text-headline-sm text-text-primary mb-space-md font-semibold">Danh mục tuyển chọn</h4>
              <ul className="flex flex-col gap-2.5 font-body-sm text-body-sm text-text-secondary">
                {["Văn học kinh điển & đương đại", "Triết học, Lịch sử & Xã hội", "Tâm lý học ứng dụng & Nhận thức", "Kinh tế, Quản trị & Đổi mới", "Sách song ngữ & Ngoại văn", "Ấn bản sưu tầm bọc bìa da"].map(i => (
                  <li key={i}><a className="hover:text-primary transition-colors" href="#">{i}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-headline-sm text-headline-sm text-text-primary mb-space-md font-semibold">Kết nối &amp; Thanh toán</h4>
              <div className="flex flex-col gap-space-md">
                <div className="flex items-center gap-2">
                  {["public", "feed", "play_circle", "chat"].map(icon => (
                    <a key={icon} className="w-9 h-9 rounded-lg bg-surface-subtle flex items-center justify-center text-text-primary hover:bg-primary-container hover:text-on-primary transition-colors" href="#">
                      <span className="material-symbols-outlined text-[18px]">{icon}</span>
                    </a>
                  ))}
                </div>
                <div>
                  <span className="font-label-sm text-label-sm text-text-muted block mb-2 font-semibold uppercase">Phương thức thanh toán</span>
                  <div className="flex flex-wrap gap-2">
                    {["COD", "VietQR 24/7", "VNPAY-QR", "Thẻ ATM / Visa / Master"].map(m => (
                      <span key={m} className="px-2.5 py-1 rounded bg-surface-subtle text-text-primary font-label-sm text-label-sm font-semibold">{m}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="font-label-sm text-label-sm text-text-muted block mb-1 font-semibold uppercase">Chứng nhận an toàn</span>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-status-emerald-bg text-status-emerald-text font-label-sm text-label-sm font-medium">
                    <span className="material-symbols-outlined text-[15px]">verified</span>
                    <span>Bộ Công Thương xác thực</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-surface-subtle py-space-md px-margin-desktop">
          <div className="max-w-[1240px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-text-muted font-body-sm text-body-sm">
            <span>© 2026 DalifaBooks. Bản quyền thuộc về Công ty Cổ phần Văn hóa &amp; Phát hành sách Dalifa.</span>
            <div className="flex items-center gap-space-md">
              <a className="hover:text-text-primary" href="#">Bảo mật</a>
              <span>•</span>
              <a className="hover:text-text-primary" href="#">Điều khoản</a>
              <span>•</span>
              <a className="hover:text-text-primary" href="#">Sơ đồ trang</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
