"use client";
// SHOP-02 — Danh mục sách theo slug
// JSX convert 1:1 từ HTML design gốc

import { useEffect, useRef, useState } from "react";

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastTitle, setToastTitle] = useState("Đã thêm vào giỏ hàng");
  const [toastDesc, setToastDesc] = useState("Tác phẩm đã nằm trong giỏ đọc của bạn.");
  const [addedIdx, setAddedIdx] = useState<number | null>(null);
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function showToast(title: string, desc: string) {
    setToastTitle(title);
    setToastDesc(desc);
    setToastVisible(true);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastVisible(false), 3000);
  }

  function handleAddToCart(idx: number, title: string) {
    setAddedIdx(idx);
    showToast("Đã thêm vào giỏ sách", title);
    setTimeout(() => setAddedIdx(null), 1800);
  }

  function toggleWishlist(idx: number) {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) { next.delete(idx); }
      else {
        next.add(idx);
        showToast("Đã lưu sách yêu thích", "Sách đã được thêm vào danh sách quan tâm.");
      }
      return next;
    });
  }

  const BOOKS = [
    { author: "Haruki Murakami", title: "Rừng Na Uy (Tái bản 2025)", price: "128.000 đ", original: "160.000 đ", discount: "-20%", format: "Bìa mềm", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCclBWd9ptqW5Mr6LkkWT0IhRN8SEtJtsy7DvGMEZuHX3zYcIGOsz0MM5xQY7QrQzrxuc9P5CVrC_UL0a4PXWSzEJPwIg3O-VLB3OhoXZTw0DQDopUsoHMg_orDtJp2Bmk92E4lK6j23muStEllozobae9ivI884HMAdrmH9vo7QvV0hjBRULXy53o_p2AK-IBHlgYAOIx1y6o_u2OUYPGaaDVDg7yPLdk9r_pK69pOLUdmbo-jLZZX" },
    { author: "Gabriel García Márquez", title: "Trăm Năm Cô Đơn (Bản đặc biệt)", price: "212.500 đ", original: "250.000 đ", discount: "-15%", format: "Bìa cứng", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAOJOOPKQJ19s6h0aHhwhxJRhV1XC5qyNf_5tc3x8aJjrfEqrzPnyqqsJg4oMSuDXa4wp9TnyNVXYHhivLUY8RF6s_sVTGdpL_KsWy32A9OqNVcS_1rPEW1lHx7AWZIvmqo5WRPOMNybw7BZxkAWXT9VgJRVuCRmo73HP-VIm-aZ5OO4yEh8njrA3KW1dzH2Y6VMa-DfuqIiPb1WC86xWB298V3sztiMhzxJD7JP9YkNdD2Hjv97kax" },
    { author: "J.D. Salinger", title: "Bắt Trẻ Đồng Xanh", price: "105.000 đ", original: null, discount: null, format: "Bìa mềm", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8UX2GBubolAOIajMhJmj9bzmgBUjiEJPPh2Wytbx81OD2Y6dwjrHRNcvk2T3KGk97nRIlYvt6-7G_o2yxmtTOdl4RsDNOQRDgGIVsfYA8ZZ0SwS1KYsb0KsBJTbyjCvOkDibRAerpOtcp6W3lcOSOEhk0cPBWW9ZjmW2CfRYbnpVkgGRmcSwZFk23C82gimE-xyfsa81TX-j2CgJsbAXpbatK68RtMxf393wVQWaT3rWDYTS-ydVY" },
    { author: "Ernest Hemingway", title: "Chuông Nguyện Hồn Ai", price: "171.000 đ", original: "190.000 đ", discount: "-10%", format: "Bìa mềm", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDNScuZuBkpxzNP6KyfCG7cLHxBbmWQAZt_Qaot07MEp_MzrnR5czRWY7dXa9CltMD_MGjqBidzPv0-cxakZ4a3y15Cg2xEv9KIdehJTAA_ztOmtP5MGpWfwl161myh1o15n69aVAHKKhZb7Mwqb-v3JUnJeyCq6nJFok1MSoXuRFNjjFRb-Jj4JKracya2M2XJVQe10PQOIrqqAKk3et_advDDva-R8ryRi-AvmeFx61W6AOrPiRdP" },
    { author: "Fyodor Dostoevsky", title: "Tội Ác Và Hình Phạt (Trọn bộ 2 tập)", price: "270.000 đ", original: "330.000 đ", discount: "-18%", format: "Bìa cứng", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCfk9vg2UtgJlm6QhKWm_bAKGjKsmrl6FDvfqC3oHIG3QX3FqOPt5nu2mGtKRHFiAmr7uMkWuQEYjbCqb5DWIvaLgGGI6e7q1eIy-RxUHdX7wa9EyocY3Ndzihfs3jNvKiQqNemPSTtwvEnWCJUcIWwf_Q3XYdAa1KYWbjU-iJc4aM3YiqhD2UzIQWdzaPdXgUgOENNsf49GY07D80S2QNZvM46UL-A3G-IgJT1Nrdqka4WcyUsj-nk" },
    { author: "Antoine de Saint-Exupéry", title: "Hoàng Tử Bé (Tái bản minh họa màu)", price: "85.000 đ", original: null, discount: null, format: "Bìa mềm", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBj8sm1mpaLM4aMPLH1jo67xFRMp8NYeVxEylcwWVzx0bViGA9ypQdEH9WYg4uxR1M4Q5eGLOOoeWd2MWrBZsz0PyCqX-C3to3kUCj793760alitNrmNfBFymc0aGw09ZnxpGiYJFMHnZ-JLfII6BcygOtI-DteR0fp3iGDc7ALyHVGQ2bysR2UajqwX_YH6MVRK_LDHvyx6PVaFO669DVbWW3FehRl86dQ9Hr9sVrPBPEAwqtGExnX" },
    { author: "Colleen McCullough", title: "Tiếng Chim Hót Trong Bụi Mận Gai", price: "195.500 đ", original: "230.000 đ", discount: "-15%", format: "Bìa mềm", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuADSr0zRLzT1XTgRvYd0CxSFESjJWP_0d4FYqBCdYt5o-jocwSWJbKlr4Tf3LX2qzwK-BGUlIbh_OGDFD14QZS-fdh6spXU7IRWwf_zMyMIB2-IVFsrSx_L4ofzRKz6u-y3yCr09RHMGe_yS0jS1JjNkFy9YzEBd38f9dEp6t9B0Y_WPBxfpCOWKO172pMkn5jH_sOSaLA4D0azrWSQzoW46DDEktr7ItLtHJ70nMI8fcC9Sp4_Hxxa" },
    { author: "Hector Malot", title: "Không Gia Đình (Bản hiệu đính đầy đủ)", price: "142.500 đ", original: "190.000 đ", discount: "-25%", format: "Bìa cứng", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCrN-cq6KG1uA73dcPuLNvzmLBGRhgVHA3TikJy7rYCGmYEF30SEhAzAhaM-HCQbmoLjRTtnZFSHmwz14uJyUuIR7oXH2PiVnXc6MRMjpoUYpmp0mJmjakCqt4SQxOqMqBwlqmyb7gspwjFLa7MQKCRJVZl3S-Uh_fB5xTo8Qbgh148eV-T8u7syImC_1QdqufzMa9lVa0kA_6C82jO5rb7UQS00cpvmimF1_9hvy3Kim3LO1m2zPFg" },
  ];

  return (
    <>
      {/* HEADER — giống trang chủ, "Danh mục sách" active */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="w-full flex flex-col">
          <div className="bg-primary text-on-primary py-space-xs px-margin-desktop">
            <div className="max-w-[1240px] mx-auto flex items-center justify-between text-body-sm font-body-sm">
              <div className="flex items-center gap-space-lg">
                <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]">call</span><span>Hotline: <strong>1900 6868</strong> (8h00 - 21h00)</span></span>
                <span className="hidden md:flex items-center gap-1.5 opacity-90"><span className="material-symbols-outlined text-[16px]">local_shipping</span><span>Giao sách toàn quốc • Đóng gói cẩn trọng</span></span>
              </div>
              <div className="flex items-center gap-space-md">
                <a className="hover:underline flex items-center gap-1" href="#"><span className="material-symbols-outlined text-[15px]">search_check</span><span>Tra cứu đơn hàng</span></a>
                <span className="opacity-40">|</span>
                <a className="hover:underline flex items-center gap-1" href="#"><span className="material-symbols-outlined text-[15px]">help_center</span><span>Hỗ trợ bạn đọc</span></a>
              </div>
            </div>
          </div>
          <div className="px-margin-desktop py-space-sm">
            <div className="max-w-[1240px] mx-auto flex items-center justify-between gap-space-lg">
              <div className="flex items-center gap-space-md shrink-0">
                <img alt="DalifaBooks logo" className="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1Wva0GO_ElHGhfotmX2mb7-4MLiu0uPlpblNn7_ZXu32gjbYc5VbcK6uNyvnf_ymtcRFltaFmWlLgZAAn-QC7XFlmuyTrFIRXkgk4Cyzid4CNyvtQz2bioiDnqHzrdQP4czZveDGhm-GiYWhTVXyUoimGE1rg3aNZ2sUp7t2K3OJSg2143_fkUSs4vQ4z1ewqypmuzTQrE9l3xuBg8m-DJbZAm1qLfp-_K2pu-VfCcgmUr4u-bFPrVCFx5HuroezN6EnqaaE2ze1A" />
                <a className="flex flex-col" href="/"><span className="font-headline-sm text-headline-sm font-bold tracking-tight text-primary leading-none">DalifaBooks</span><span className="font-label-sm text-label-sm text-text-muted uppercase tracking-wider font-semibold">Tinh hoa văn hóa</span></a>
              </div>
              <div className="flex-1 max-w-2xl hidden sm:block">
                <div className="relative flex items-center">
                  <div className="absolute left-3.5 flex items-center pointer-events-none text-text-muted"><span className="material-symbols-outlined text-[20px]">search</span></div>
                  <input className="w-full pl-10 pr-24 py-2 bg-surface-card rounded-lg text-body-md font-body-md text-text-primary placeholder:text-text-muted shadow-[0_1px_4px_rgba(0,0,0,0.04)] focus:outline-none focus:ring-2 focus:ring-primary-container transition-all" placeholder="Tìm kiếm theo tên sách, tác giả, nhà xuất bản, mã ISBN..." type="text" />
                  <button className="absolute right-1 px-4 py-1.5 bg-primary-container text-on-primary rounded-md font-label-md text-label-md hover:bg-primary transition-colors" type="button">Tìm kiếm</button>
                </div>
                <div className="flex items-center gap-2 mt-1.5 font-label-sm text-label-sm text-text-secondary">
                  <span className="text-text-muted">Từ khóa:</span>
                  <a className="hover:text-primary hover:underline" href="#">Sách bán chạy</a><span>•</span>
                  <a className="hover:text-primary hover:underline" href="#">Nguyễn Nhật Ánh</a><span>•</span>
                  <a className="hover:text-primary hover:underline" href="#">Combo văn học</a><span>•</span>
                  <a className="hover:text-primary hover:underline" href="#">Ấn bản giới hạn</a>
                </div>
              </div>
              <div className="flex items-center gap-space-md shrink-0">
                <a className="relative flex items-center gap-2 px-3.5 py-2 rounded-lg bg-surface-card hover:bg-surface-subtle transition-colors shadow-[0_1px_4px_rgba(0,0,0,0.03)] text-on-surface" href="/cart">
                  <span className="material-symbols-outlined text-[24px] text-primary">shopping_bag</span>
                  <div className="hidden lg:flex flex-col text-left"><span className="font-label-sm text-label-sm text-text-muted leading-tight">Giỏ hàng</span><span className="font-label-md text-label-md font-semibold text-text-primary leading-tight">0 đ</span></div>
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-secondary text-on-secondary font-label-sm text-label-sm font-bold flex items-center justify-center">0</span>
                </a>
                <a className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-card hover:bg-surface-subtle transition-colors shadow-[0_1px_4px_rgba(0,0,0,0.03)]" href="/login">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div>
                  <div className="hidden xl:flex flex-col text-left"><span className="font-label-sm text-label-sm text-text-muted leading-tight">Tài khoản</span><span className="font-label-md text-label-md font-semibold text-text-primary leading-tight">Đăng nhập</span></div>
                </a>
              </div>
            </div>
          </div>
          <div className="bg-surface-card px-margin-desktop shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
            <div className="max-w-[1240px] mx-auto flex items-center justify-between">
              <nav className="flex items-center gap-1 py-1 overflow-x-auto">
                <a className="px-3.5 py-2 rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-subtle hover:text-on-surface transition-all whitespace-nowrap" href="/">Trang chủ</a>
                <a aria-current="page" className="px-3.5 py-2 transition-all whitespace-nowrap bg-primary-container text-on-primary font-semibold rounded-lg" href="#">Danh mục sách</a>
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

      {/* MAIN */}
      <main className="w-full pt-40 bg-surface min-h-[calc(100vh-160px)]">
        <div className="max-w-[1240px] mx-auto px-margin-desktop py-space-lg">
          <div className="flex flex-col w-full">

            {/* BREADCRUMB */}
            <div className="flex flex-wrap items-center justify-between gap-space-sm mb-space-md">
              <nav className="flex items-center gap-2 font-label-md text-label-md text-text-secondary">
                <a className="hover:text-primary transition-colors flex items-center gap-1" href="/"><span className="material-symbols-outlined text-[18px]">home</span><span>Trang chủ</span></a>
                <span className="text-text-muted">/</span>
                <a className="hover:text-primary transition-colors" href="#">Danh mục sách</a>
                <span className="text-text-muted">/</span>
                <span className="text-text-primary font-semibold">Văn học Kinh điển &amp; Hiện đại</span>
              </nav>
              <div className="hidden sm:flex items-center gap-2 font-label-sm text-label-sm text-status-emerald-text bg-status-emerald-bg px-3 py-1 rounded-full">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                <span>Tuyển chọn chính ngạch • 100% sách chuẩn bản quyền</span>
              </div>
            </div>

            {/* EDITORIAL BANNER */}
            <div className="relative overflow-hidden rounded-xl bg-primary text-on-primary p-space-lg sm:p-space-xl mb-space-xl shadow-md">
              <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-primary-container/40 blur-3xl pointer-events-none"></div>
              <div className="relative z-10 max-w-2xl">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-secondary/80 text-on-secondary font-label-sm text-label-sm mb-3">
                  <span>TỦ SÁCH KHUYÊN ĐỌC DALIFABOOKS</span>
                </div>
                <h1 className="font-headline-lg text-headline-lg font-bold tracking-tight mb-2">Văn học Kinh điển &amp; Hiện đại</h1>
                <p className="font-body-md text-body-md text-primary-fixed-dim leading-relaxed">
                  Không gian hội tụ những kiệt tác văn chương vượt không thời gian. Khám phá chiều sâu tâm thức, vẻ đẹp thẩm mỹ ngôn từ và những câu chuyện kiến tạo tầm vóc tư tưởng nhân loại từ các tác gia lừng danh.
                </p>
              </div>
            </div>

            {/* TOOLBAR */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md pb-space-md mb-space-lg shadow-sm bg-surface-card p-space-md rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-surface-subtle flex items-center justify-center text-primary"><span className="material-symbols-outlined text-[22px]">auto_stories</span></div>
                <div>
                  <p className="font-headline-sm text-headline-sm font-semibold text-text-primary leading-tight">Danh mục tác phẩm tuyển chọn</p>
                  <p className="font-body-sm text-body-sm text-text-secondary mt-0.5">Tìm thấy <strong className="text-primary font-semibold">128</strong> tác phẩm đạt tiêu chuẩn chất lượng Dalifa</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-space-sm sm:gap-space-md">
                <div className="hidden xl:flex items-center gap-1.5 mr-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-subtle font-label-sm text-label-sm text-text-secondary">
                    <span>Còn hàng</span>
                    <button className="hover:text-error flex items-center" type="button"><span className="material-symbols-outlined text-[14px]">close</span></button>
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-subtle font-label-sm text-label-sm text-text-secondary">
                    <span>Văn học</span>
                    <button className="hover:text-error flex items-center" type="button"><span className="material-symbols-outlined text-[14px]">close</span></button>
                  </span>
                </div>
                <div className="relative flex items-center">
                  <label className="font-label-sm text-label-sm text-text-secondary mr-2 shrink-0" htmlFor="catalog-sort">Sắp xếp:</label>
                  <div className="relative">
                    <select className="appearance-none bg-surface-subtle hover:bg-surface-container-high transition-colors text-text-primary font-label-md text-label-md rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-primary-container cursor-pointer" id="catalog-sort">
                      <option value="featured">Tác phẩm nổi bật nhất</option>
                      <option value="bestseller">Bán chạy nhất tháng</option>
                      <option value="newest">Mới phát hành gần đây</option>
                      <option value="price-asc">Giá từ thấp đến cao</option>
                      <option value="price-desc">Giá từ cao đến thấp</option>
                      <option value="discount">Tỷ lệ ưu đãi cao nhất</option>
                    </select>
                    <span className="material-symbols-outlined pointer-events-none absolute right-2 top-2.5 text-[18px] text-text-secondary">expand_more</span>
                  </div>
                </div>
                <div className="flex items-center bg-surface-subtle p-1 rounded-lg">
                  <button className="w-8 h-8 rounded-md bg-surface-card text-primary shadow-sm flex items-center justify-center transition-all" type="button" title="Chế độ xem lưới"><span className="material-symbols-outlined text-[19px]">grid_view</span></button>
                  <button className="w-8 h-8 rounded-md text-text-muted hover:text-text-primary flex items-center justify-center transition-all" type="button" title="Chế độ xem danh sách"><span className="material-symbols-outlined text-[19px]">view_list</span></button>
                </div>
              </div>
            </div>

            {/* SIDEBAR + GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">

              {/* SIDEBAR */}
              <aside className="lg:col-span-3 space-y-space-lg">
                <div className="bg-surface-card rounded-xl p-space-lg shadow-sm">
                  <div className="flex items-center justify-between pb-space-md mb-space-md">
                    <div className="flex items-center gap-2 text-text-primary font-headline-sm text-headline-sm">
                      <span className="material-symbols-outlined text-[20px] text-primary">tune</span>
                      <span>Bộ lọc tinh tuyển</span>
                    </div>
                    <button className="font-label-sm text-label-sm text-secondary hover:underline cursor-pointer" type="button">Thiết lập lại</button>
                  </div>

                  {/* Sub-categories */}
                  <div className="mb-space-lg">
                    <h2 className="font-label-md text-label-md font-semibold text-text-primary mb-3 uppercase tracking-wide text-xs">Thể loại chuyên biệt</h2>
                    <div className="flex flex-col gap-1 font-body-sm text-body-sm">
                      <a className="flex items-center justify-between py-1.5 px-2 rounded-lg bg-surface-subtle text-primary font-medium" href="#">
                        <span>Văn học Nước ngoài</span><span className="font-label-sm text-label-sm bg-surface-card px-2 py-0.5 rounded text-text-secondary">64</span>
                      </a>
                      {[["Văn học Việt Nam", "38"], ["Tiểu thuyết Hiện sinh & Tâm lý", "16"], ["Thơ ca & Tùy bút kinh điển", "9"], ["Kịch bản & Phê bình văn học", "5"]].map(([label, count]) => (
                        <a key={label} className="flex items-center justify-between py-1.5 px-2 rounded-lg text-text-secondary hover:bg-surface-subtle hover:text-text-primary transition-colors" href="#">
                          <span>{label}</span><span className="font-label-sm text-label-sm text-text-muted">{count}</span>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Authors */}
                  <div className="mb-space-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="font-label-md text-label-md font-semibold text-text-primary uppercase tracking-wide text-xs">Tác giả đại thụ</h2>
                      <span className="font-label-sm text-label-sm text-text-muted">6 chọn</span>
                    </div>
                    <div className="space-y-2.5 font-body-sm text-body-sm text-text-secondary max-h-48 overflow-y-auto pr-1">
                      {[["Haruki Murakami", "18", true], ["Hermann Hesse", "12", true], ["Victor Hugo", "8", false], ["George Orwell", "7", false], ["Nam Cao", "9", false], ["Nguyễn Du", "5", false], ["Fyodor Dostoevsky", "11", false]].map(([name, count, checked]) => (
                        <label key={name as string} className="flex items-center gap-2.5 cursor-pointer hover:text-text-primary">
                          <input defaultChecked={checked as boolean} className="w-4 h-4 rounded text-primary-container focus:ring-0 cursor-pointer accent-primary" type="checkbox" />
                          <span className="flex-1">{name as string}</span>
                          <span className="font-label-sm text-label-sm text-text-muted">({count as string})</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Publishers */}
                  <div className="mb-space-lg">
                    <h2 className="font-label-md text-label-md font-semibold text-text-primary mb-3 uppercase tracking-wide text-xs">Nhà xuất bản &amp; Đối tác</h2>
                    <div className="space-y-2.5 font-body-sm text-body-sm text-text-secondary">
                      {[["NXB Hội Nhà Văn", "42", true], ["NXB Văn Học", "37", false], ["NXB Trẻ", "29", false], ["NXB Kim Đồng", "15", false]].map(([name, count, checked]) => (
                        <label key={name as string} className="flex items-center gap-2.5 cursor-pointer hover:text-text-primary">
                          <input defaultChecked={checked as boolean} className="w-4 h-4 rounded text-primary-container cursor-pointer accent-primary" type="checkbox" />
                          <span className="flex-1">{name as string}</span>
                          <span className="font-label-sm text-label-sm text-text-muted">({count as string})</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-space-lg">
                    <h2 className="font-label-md text-label-md font-semibold text-text-primary mb-3 uppercase tracking-wide text-xs">Khoảng ngân sách (VNĐ)</h2>
                    <div className="space-y-2 font-body-sm text-body-sm text-text-secondary mb-3">
                      {[["Dưới 100.000 đ", false], ["100.000 đ - 200.000 đ", true], ["200.000 đ - 500.000 đ", false], ["Trên 500.000 đ (Ấn bản sưu tầm)", false]].map(([label, checked]) => (
                        <label key={label as string} className="flex items-center gap-2 cursor-pointer hover:text-text-primary">
                          <input defaultChecked={checked as boolean} className="accent-primary cursor-pointer" name="price-bracket" type="radio" />
                          <span className={(checked as boolean) ? "font-medium text-text-primary" : ""}>{label as string}</span>
                        </label>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 pt-2">
                      <input className="w-full px-2.5 py-1.5 text-body-sm font-body-sm rounded bg-surface-subtle text-text-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="100.000" type="text" />
                      <span className="text-text-muted">-</span>
                      <input className="w-full px-2.5 py-1.5 text-body-sm font-body-sm rounded bg-surface-subtle text-text-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="250.000" type="text" />
                    </div>
                  </div>

                  {/* Format */}
                  <div className="mb-space-xl">
                    <h2 className="font-label-md text-label-md font-semibold text-text-primary mb-3 uppercase tracking-wide text-xs">Định dạng bìa &amp; Tình trạng</h2>
                    <div className="space-y-2 font-body-sm text-body-sm text-text-secondary">
                      <label className="flex items-center gap-2.5 cursor-pointer hover:text-text-primary"><input defaultChecked className="w-4 h-4 rounded accent-primary cursor-pointer" type="checkbox" /><span>Bìa mềm trang nhã</span></label>
                      <label className="flex items-center gap-2.5 cursor-pointer hover:text-text-primary"><input className="w-4 h-4 rounded accent-primary cursor-pointer" type="checkbox" /><span>Bìa cứng gáy may cao cấp</span></label>
                      <div className="h-px bg-surface-subtle my-2"></div>
                      <label className="flex items-center gap-2.5 cursor-pointer hover:text-text-primary font-medium text-text-primary"><input defaultChecked className="w-4 h-4 rounded accent-primary cursor-pointer" type="checkbox" /><span>Chỉ hiện sách còn hàng sẵn kho</span></label>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button className="w-full py-2.5 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold hover:bg-primary transition-colors flex items-center justify-center gap-2 shadow-sm" type="button">
                      <span className="material-symbols-outlined text-[18px]">filter_alt</span>
                      <span>Áp dụng bộ lọc</span>
                    </button>
                  </div>
                </div>

                <div className="bg-surface-container-low p-space-md rounded-xl space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-secondary text-[24px]">workspace_premium</span>
                    <div>
                      <h3 className="font-label-md text-label-md font-semibold text-text-primary">Đóng gói chuẩn sách quý</h3>
                      <p className="font-body-sm text-body-sm text-text-secondary leading-snug">Chống sốc 3 lớp, chèn góc chống móp gáy toàn trình.</p>
                    </div>
                  </div>
                </div>
              </aside>

              {/* PRODUCT GRID */}
              <div className="lg:col-span-9 flex flex-col">
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-space-md sm:gap-space-lg mb-space-2xl">
                  {BOOKS.map((book, idx) => (
                    <article key={idx} className="group bg-surface-card rounded-xl p-3 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-200">
                      <div className="relative w-full aspect-[2/3] bg-surface-subtle rounded-lg overflow-hidden flex items-center justify-center mb-3">
                        <img alt={book.title} className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300" src={book.img} />
                        {book.discount && (
                          <span className="absolute top-2 left-2 bg-error text-on-error font-label-sm text-label-sm font-bold px-1.5 py-0.5 rounded shadow-sm">{book.discount}</span>
                        )}
                        <button
                          aria-label="Lưu vào yêu thích"
                          onClick={() => toggleWishlist(idx)}
                          className={`absolute top-2 right-2 w-8 h-8 rounded-full bg-surface-card/90 flex items-center justify-center transition-colors shadow-sm ${wishlist.has(idx) ? "text-error" : "text-text-secondary hover:text-error hover:bg-surface-card"}`}
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[18px]" style={wishlist.has(idx) ? { fontVariationSettings: "'FILL' 1" } : {}}>favorite</span>
                        </button>
                        <span className="absolute bottom-2 left-2 bg-primary/80 backdrop-blur text-on-primary font-label-sm text-label-sm px-2 py-0.5 rounded text-[11px]">{book.format}</span>
                      </div>
                      <div className="flex-1 flex flex-col">
                        <p className="font-body-sm text-body-sm text-text-secondary mb-1">{book.author}</p>
                        <h3 className="font-headline-sm text-headline-sm font-semibold text-text-primary line-clamp-2 leading-tight group-hover:text-secondary transition-colors mb-2">{book.title}</h3>
                        <div className="mt-auto pt-2">
                          <div className="flex items-baseline gap-2 mb-3">
                            <span className="font-price-md text-price-md text-secondary font-bold">{book.price}</span>
                            {book.original ? (
                              <span className="font-body-sm text-body-sm text-text-muted line-through">{book.original}</span>
                            ) : (
                              <span className="font-body-sm text-body-sm text-text-muted">Nguyên giá</span>
                            )}
                          </div>
                          <button
                            onClick={() => handleAddToCart(idx, book.title)}
                            className={`w-full py-2 px-3 rounded-lg font-label-md text-label-md font-semibold transition-all flex items-center justify-center gap-1.5 active:scale-95 ${addedIdx === idx ? "bg-status-emerald-bg text-status-emerald-text" : "bg-surface-subtle hover:bg-primary-container hover:text-on-primary text-text-primary"}`}
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[18px]">{addedIdx === idx ? "done" : "add_shopping_cart"}</span>
                            <span>{addedIdx === idx ? "Đã thêm" : "Thêm vào giỏ"}</span>
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                {/* PAGINATION */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-space-md bg-surface-card p-space-md rounded-xl shadow-sm mb-space-2xl">
                  <div className="flex items-center gap-2 font-label-sm text-label-sm text-text-secondary">
                    <span>Hiển thị:</span>
                    <select className="bg-surface-subtle text-text-primary font-semibold rounded px-2.5 py-1.5 focus:outline-none cursor-pointer">
                      <option value="24">24 cuốn / trang</option>
                      <option value="48">48 cuốn / trang</option>
                      <option value="96">96 cuốn / trang</option>
                    </select>
                    <span className="text-text-muted">| Trang 1 trong 6</span>
                  </div>
                  <nav className="flex items-center gap-1 font-label-md text-label-md">
                    <button disabled className="w-9 h-9 rounded-lg flex items-center justify-center text-text-muted cursor-not-allowed opacity-50" type="button"><span className="material-symbols-outlined text-[18px]">chevron_left</span></button>
                    <button className="w-9 h-9 rounded-lg bg-primary-container text-on-primary font-semibold shadow-sm flex items-center justify-center" type="button">1</button>
                    {[2, 3, 4].map(n => <button key={n} className="w-9 h-9 rounded-lg hover:bg-surface-subtle text-text-primary flex items-center justify-center transition-colors" type="button">{n}</button>)}
                    <span className="w-7 text-center text-text-muted">...</span>
                    <button className="w-9 h-9 rounded-lg hover:bg-surface-subtle text-text-primary flex items-center justify-center transition-colors" type="button">12</button>
                    <button className="w-9 h-9 rounded-lg hover:bg-surface-subtle text-text-primary flex items-center justify-center transition-colors" type="button"><span className="material-symbols-outlined text-[18px]">chevron_right</span></button>
                  </nav>
                </div>

                {/* RELATED CHIPS */}
                <section className="bg-surface-card p-space-lg rounded-xl shadow-sm">
                  <div className="flex items-center gap-2 mb-space-sm text-text-primary font-headline-sm text-headline-sm">
                    <span className="material-symbols-outlined text-[20px] text-secondary">travel_explore</span>
                    <span>Khám phá thêm theo chủ đề liên quan</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-text-secondary mb-space-md">Các bạn đọc yêu thích danh mục này thường tìm kiếm và khám phá thêm các bộ sưu tập:</p>
                  <div className="flex flex-wrap gap-2.5 font-label-md text-label-md">
                    {["sách đạt giải nobel", "văn học nhật bản hiện đại", "tiểu thuyết lãng mạn châu âu", "ấn bản minh họa giới hạn", "trường phái hiện sinh"].map(tag => (
                      <a key={tag} className="px-3.5 py-1.5 rounded-lg bg-surface-subtle hover:bg-surface-container-high text-text-primary transition-colors flex items-center gap-1.5" href="#">
                        <span className="material-symbols-outlined text-[16px] text-text-muted">search</span>
                        <span>{tag}</span>
                      </a>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="w-full bg-surface-card shadow-[0_-2px_12px_rgba(0,0,0,0.03)] mt-space-2xl">
        <div className="bg-surface-subtle py-space-md px-margin-desktop">
          <div className="max-w-[1240px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-text-muted font-body-sm text-body-sm">
            <span>© 2026 DalifaBooks. Bản quyền thuộc về Công ty Cổ phần Văn hóa &amp; Phát hành sách Dalifa.</span>
            <div className="flex items-center gap-space-md">
              <a className="hover:text-text-primary" href="#">Bảo mật</a><span>•</span>
              <a className="hover:text-text-primary" href="#">Điều khoản</a><span>•</span>
              <a className="hover:text-text-primary" href="#">Sơ đồ trang</a>
            </div>
          </div>
        </div>
      </footer>

      {/* TOAST */}
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 flex items-center gap-3 bg-primary text-on-primary px-4 py-3 rounded-xl shadow-xl ${toastVisible ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0 pointer-events-none"}`}>
        <span className="material-symbols-outlined text-secondary text-[22px]">check_circle</span>
        <div>
          <p className="font-label-md text-label-md font-semibold">{toastTitle}</p>
          <p className="font-body-sm text-body-sm text-primary-fixed-dim">{toastDesc}</p>
        </div>
      </div>
    </>
  );
}
