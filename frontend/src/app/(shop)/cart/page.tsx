"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const cartItems = [
  {
    category: "Văn học hiện đại",
    title: "Chiến Binh Cầu Vồng",
    author: "Andrea Hirata",
    price: 108000,
    originalPrice: 135000,
    discount: "-20%",
    badge: "Bìa mềm cao cấp",
    gift: "Tặng kèm bookmark",
    stock: "Còn hàng (Sẵn sàng xuất kho)",
    quantity: 1,
    cover:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAUNtwTIfGyrDzy59uaHMUFpqfj3DRgqxnGv5XpFgRDU2d94DNbZAulClCXjtIzX14EPYI4arxcZd-roQqcVeRbQD7mHK3gxlQiLvt695PvcySAe0wA95Dgw8oVQRRHPf2f790JJ-D1LU1Rtlrwu8RI5Y1rvK52EXsquZks5bMdxT6vOBycooZGD1mKG8KownvPBJUgkBeu4a-ub0YasMEX3vmkTEAR2vPNI8u-o0CTtcc_8OT-8WBI",
  },
  {
    category: "Tác phẩm kinh điển",
    title: "Cây Cam Ngọt Của Tôi",
    author: "José Mauro de Vasconcelos",
    price: 120000,
    originalPrice: 0,
    discount: "Ấn bản đặc biệt",
    badge: "Bìa cứng dập nổi",
    gift: "Kèm bookmark kim loại",
    stock: "Còn hàng (Kho Hà Nội & TP.HCM)",
    quantity: 2,
    cover:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCTbQl4Yz_gMrI82zHZMCEmfT0pHxQeo3Ekq-iJa6g7HA9lCfUBvEDi_uxVj8DDyurAFK4c4oM-eqUM2meQ_GqWEHxdxKiMGW17cYgZ0Cm_7HJfTNboWJYJNJLMIfWPy8pIPBlPDhPzIKkQOskUL5PNr8Bkw41YMxYHKGMygWN8eA7CQIrk18bqX6ADID5SNltKCyg9fn6V8FOGZ90rlYhOnWhULX1_B0lhlejg9rQB5_Vb6hgmVOtu",
  },
  {
    category: "Tủ sách triết học khắc kỷ",
    title: "Marcus Aurelius: Suy Tưởng",
    author: "Marcus Aurelius (Bản dịch tuyển chọn)",
    price: 185000,
    originalPrice: 220000,
    discount: "-16%",
    badge: "Bìa da cao cấp",
    gift: "Giấy xốp bảo vệ",
    stock: "Còn 7 cuốn trong kho",
    quantity: 1,
    cover:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAjbmiZxItD8xeyCZhjAzCniRz3SIjhZUqj-buEH-xCDNwb1fgOIXwwO-15l-ca5ZVif4MANcoOjSxfbvgSDkMJGkAuS462hytCOnJmMiyu3141bM_kezYgn7XdJtBbQ1EZxq7oCOmzvPvjS6vG2uoDPwoQM82B9K4-3tsrlLpZBL1gGHBHgDAgd2ewfS0lNDm7LnoaAGH0A1R-i7CIGnnfM542i3TfaBhvLqIXpTBcNaSc5Nsp547v",
  },
];

const upsellItems = [
  {
    title: "Tuổi Trẻ Đáng Giá Bao Nhiêu?",
    author: "Rosie Nguyễn",
    price: 76000,
    cover:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCdJQD1dgmKhMCZMKsPKIM7eZHgRsAbz2sMONvNXUReuhRp2KwKPq6EVMDOT5EvC6Hg44x0YLvVsUYkqjsCl02eUw8gJaO3XTEbZ2R3GU6bMdC7yHKY6uuwocTvobPxnvLz7pAd-G1XcTBJ7SScDoNnaGCOwadSm7EwTwSBNmncprOUvjaXWmtxOsySwiPM2MMdKRyIQqhJaPS5HEVENoggo71q0XhijPbl--BGsEncBnTVtHQs-C1I",
  },
  {
    title: "Tôi Thấy Hoa Vàng Trên Cỏ Xanh",
    author: "Nguyễn Nhật Ánh",
    price: 105000,
    cover:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBW8T148E_PXbO1Pq2WzWOWrAvbOwymjv6JTd-863TUesBdkBJxkOz1wLiadBFmG5eSQvhd8_wawrQ-DK0ImuMVfptVy4qjBTqw7GHJD21GJDvHAWpqwVo8DMhPh8Wq7PQ9Yodx97-Z9VE6CdwixBWWQRF5m6wnd2maFdjv7rKIos6koUd_Bkj8HhMogEbSfRZ5TE6AqgTdi-1CUjkeCCvEpjpAW_Zh3BVY2RGkX51mO-FYYMbCLeqO",
  },
  {
    title: "Nhà Giả Kim (Tái Bản Đặc Biệt)",
    author: "Paulo Coelho",
    price: 69000,
    cover:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDsPXENCtXQrRg4IwaMtao1D9ARnlchJ3JkoTvEOcfiZjkQaSjR8rBFBt2dCopXvkrtPs_TBm7wCSvhbYikyBRMKC76V6i8R1A5TM4kLUB7y41qaxtUrUY71oC1IVUC_fY3UMGQWtpnC6dHz1_6UOw6lX8Aw8Xywxc1HWR6NazXsY2GythxMdnB6EvbU7K6UEhKVwXWqsB6LYU__x8OAvdOZEnJ-8VxB5GQui1EvFjoVqim7nefK2bi",
  },
  {
    title: "Muôn Kiếp Nhân Sinh - Tập 1",
    author: "Nguyên Phong",
    price: 158000,
    cover:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCq6i3Ystyi-cqRPw7wora9cW--dx0UcSzYlIxtBUoe2ehJKSFS3Kxh2FdZHGNA8wWVj2t0Y2zQf0edO8Tej2T4P8t48FJ6TGl-ot54oMsEWiicL6VX2xUFqXFO2snEtQR4NtO05oNGMLhMkhL7QaNMuYKWNmLxbzmclMLiGOM7m6L00-JU6IUy2lcQyO1HxDX75100Fj5xlVHH2skfmqhT9_vTT3Fs2aRTEdiJVw3CTuQcE-1iAga7",
  },
];

const formatCurrency = (value: number) => `${value.toLocaleString("vi-VN")} đ`;

export default function CartPage() {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = 62000;
  const shipping = 0;
  const total = subtotal - discount + shipping;

  return (
    <div className="min-h-screen bg-surface text-on-surface antialiased">
      <Header active="books" />

      <main className="w-full min-h-[calc(100vh-160px)] bg-surface pt-[160px]">
        <div className="w-full bg-surface-container-low px-margin-desktop py-space-md shadow-sm">
          <div className="mx-auto flex max-w-[1200px] flex-col justify-between gap-space-sm md:flex-row md:items-center">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-body-sm font-body-sm text-text-muted">
              <a href="/" className="flex items-center gap-1 transition-colors hover:text-primary">
                <span className="material-symbols-outlined text-[16px]">home</span>
                <span>Trang chủ</span>
              </a>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="font-semibold text-text-primary">Giỏ hàng của bạn</span>
            </nav>

            <div className="flex items-center gap-space-md text-label-sm font-label-sm">
              {[
                { step: 1, label: "Giỏ hàng", active: true },
                { step: 2, label: "Thanh toán", active: false },
                { step: 3, label: "Xác nhận", active: false },
              ].map((item, index) => (
                <div key={item.label} className="flex items-center gap-1.5">
                  <span
                    className={
                      item.active
                        ? "flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-on-primary"
                        : "flex h-5 w-5 items-center justify-center rounded-full bg-surface-subtle text-[11px] font-semibold text-text-secondary"
                    }
                  >
                    {item.step}
                  </span>
                  <span className={item.active ? "font-bold text-primary" : "text-text-muted"}>{item.label}</span>
                  {index < 2 && <span className="h-[2px] w-8 bg-surface-border-strong" />}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-[1200px] w-full px-margin-desktop py-space-xl">
          <div className="mb-space-lg flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline">
            <div className="flex items-baseline gap-3">
              <h1 className="font-headline-lg text-headline-lg tracking-tight text-text-primary">Giỏ hàng của bạn</h1>
              <span className="text-body-lg font-body-lg font-medium text-text-secondary">({cartItems.length} tác phẩm / {cartItems.reduce((sum, item) => sum + item.quantity, 0)} cuốn)</span>
            </div>
            <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-status-emerald-bg px-3 py-1 text-label-sm font-label-sm text-status-emerald-text sm:self-auto">
              <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                local_shipping
              </span>
              Đã kích hoạt Miễn phí giao hàng toàn quốc
            </span>
          </div>

          <div className="mb-space-lg flex flex-col items-center justify-between gap-space-md rounded-xl bg-status-emerald-bg p-space-md text-status-emerald-text shadow-sm md:flex-row">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-card shadow-sm">
                <span className="material-symbols-outlined text-[22px]">redeem</span>
              </div>
              <div className="flex flex-col">
                <span className="text-label-md font-label-md font-bold">Đơn hàng đạt chuẩn Miễn phí giao hàng</span>
                <span className="text-body-sm font-body-sm opacity-95">
                  Đơn hàng hiện tại: <strong>{formatCurrency(subtotal)}</strong> (Đạt mốc tối thiểu 350.000 đ để nhận gói vận chuyển tiêu chuẩn 0 đ).
                </span>
              </div>
            </div>

            <div className="w-full md:w-64">
              <div className="mb-1.5 flex items-center justify-between text-label-sm font-label-sm font-semibold">
                <span>Tiến độ Freeship</span>
                <span>100% Hoàn tất</span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-surface-card/60">
                <div className="h-full w-full rounded-full bg-on-tertiary-container" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 items-start gap-space-xl lg:grid-cols-12">
            <div className="flex flex-col gap-space-md lg:col-span-8">
              <div className="flex items-center justify-between rounded-xl bg-surface-card p-space-md font-label-md text-label-md text-text-secondary shadow-sm">
                <label className="flex cursor-pointer items-center gap-3 select-none">
                  <input type="checkbox" defaultChecked className="h-4 w-4 cursor-pointer accent-primary" />
                  <span className="font-semibold text-text-primary">Chọn tất cả ({cartItems.length} tác phẩm)</span>
                </label>
                <div className="hidden items-center gap-space-xl text-text-muted sm:flex">
                  <span className="w-24 text-right">Đơn giá</span>
                  <span className="w-28 text-center">Số lượng</span>
                  <span className="w-28 text-right">Thành tiền</span>
                  <span className="w-10 text-center">Thao tác</span>
                </div>
              </div>

              {cartItems.map((item) => (
                <div key={item.title} className="flex flex-col items-start justify-between gap-space-md rounded-xl bg-surface-card p-space-md shadow-sm transition-all hover:shadow-md sm:flex-row sm:items-center">
                  <div className="flex min-w-0 flex-1 items-start gap-3">
                    <div className="pt-2">
                      <input type="checkbox" defaultChecked className="book-item-checkbox h-4 w-4 cursor-pointer accent-primary" />
                    </div>

                    <div className="relative aspect-[2/3] w-20 shrink-0 overflow-hidden rounded-lg bg-surface-subtle shadow-inner sm:w-24">
                      <img src={item.cover} alt={item.title} className="h-full w-full object-contain p-1" />
                      {item.discount.startsWith("-") ? (
                        <span className="absolute left-1 top-1 rounded bg-secondary px-1.5 py-0.5 text-[10px] font-bold text-on-secondary">
                          {item.discount}
                        </span>
                      ) : (
                        <span className="absolute left-1 top-1 rounded bg-primary-container px-1.5 py-0.5 text-[10px] font-bold text-on-primary">
                          {item.discount}
                        </span>
                      )}
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col justify-between pr-2">
                      <div className="flex flex-col">
                        <span className="text-label-sm font-label-sm font-semibold uppercase tracking-wider text-text-muted">{item.category}</span>
                        <a href="#" className="line-clamp-2 text-headline-sm font-headline-sm font-semibold text-text-primary transition-colors hover:text-primary">
                          {item.title}
                        </a>
                        <span className="mt-0.5 text-body-sm font-body-sm text-text-secondary">
                          Tác giả: <strong className="text-text-primary">{item.author}</strong>
                        </span>
                        <div className="mt-2 inline-flex flex-wrap items-center gap-1.5">
                          <span className="rounded-full bg-surface-subtle px-2 py-0.5 text-label-sm font-label-sm text-text-secondary">{item.badge}</span>
                          <span className="rounded-full bg-status-sky-bg px-2 py-0.5 text-label-sm font-label-sm text-status-sky-text">{item.gift}</span>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center gap-1 text-label-sm font-label-sm text-status-emerald-text">
                        <span className="material-symbols-outlined text-[15px]">check_circle</span>
                        <span>{item.stock}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex w-full items-center justify-between gap-space-lg pt-3 sm:w-auto sm:justify-end sm:pt-0">
                    <div className="flex w-24 flex-col sm:items-end">
                      <span className="text-price-md font-price-md text-text-primary">{formatCurrency(item.price)}</span>
                      {item.originalPrice > 0 && <span className="text-body-sm font-body-sm text-text-muted line-through">{formatCurrency(item.originalPrice)}</span>}
                    </div>

                    <div className="flex w-28 items-center justify-center">
                      <div className="flex items-center rounded-lg bg-surface-subtle p-0.5 shadow-inner">
                        <button type="button" className="flex h-8 w-8 items-center justify-center rounded-md bg-surface-card text-text-primary shadow-sm transition-colors hover:bg-surface-container" aria-label="Giảm số lượng">
                          <span className="material-symbols-outlined text-[16px]">remove</span>
                        </button>
                        <input type="number" min={1} max={99} value={item.quantity} className="w-10 bg-transparent text-center text-label-md font-label-md font-semibold text-text-primary focus:outline-none" />
                        <button type="button" className="flex h-8 w-8 items-center justify-center rounded-md bg-surface-card text-text-primary shadow-sm transition-colors hover:bg-surface-container" aria-label="Tăng số lượng">
                          <span className="material-symbols-outlined text-[16px]">add</span>
                        </button>
                      </div>
                    </div>

                    <div className="hidden w-28 text-right sm:block">
                      <span className="text-price-md font-price-md font-bold text-primary">{formatCurrency(item.price * item.quantity)}</span>
                    </div>

                    <div className="flex w-10 items-center justify-center">
                      <button type="button" aria-label="Xóa tác phẩm khỏi giỏ" className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-subtle text-text-muted transition-all hover:bg-status-rose-bg hover:text-status-rose-text">
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex flex-col items-center justify-between gap-space-md pt-space-sm sm:flex-row">
                <a href="/books" className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-surface-card px-5 py-3 text-label-md font-label-md font-semibold text-text-primary shadow-sm transition-colors hover:bg-surface-subtle sm:w-auto">
                  <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                  <span>Tiếp tục tìm sách hay</span>
                </a>
                <button type="button" className="inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 text-body-sm font-body-sm text-text-secondary transition-colors hover:text-primary sm:w-auto">
                  <span className="material-symbols-outlined text-[18px]">delete_sweep</span>
                  <span>Xóa tất cả mục đã chọn</span>
                </button>
              </div>

              <div className="rounded-xl bg-surface-card p-space-lg shadow-sm">
                <div className="flex items-start gap-space-md">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary-fixed text-on-secondary-fixed">
                    <span className="material-symbols-outlined text-[22px]">card_giftcard</span>
                  </div>
                  <div className="flex flex-1 flex-col gap-2">
                    <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                      <h4 className="text-headline-sm font-headline-sm font-semibold text-text-primary">Dịch vụ đóng gói quà tặng tuyển chọn Dalifa</h4>
                      <span className="text-label-sm font-label-sm font-bold text-secondary">+ 35.000 đ / kiện quà</span>
                    </div>
                    <p className="text-body-sm font-body-sm text-text-secondary">
                      Hộp quà kraft ép kim định lượng cao, ruy băng vải dệt cao cấp, lót rơm gỗ bảo vệ gáy sách, kèm thiệp chúc mừng ghi bút máy viết tay theo thông điệp của bạn.
                    </p>

                    <div className="mt-space-sm flex flex-col gap-3">
                      <label className="flex cursor-pointer items-center gap-2.5 select-none">
                        <input type="checkbox" className="h-4 w-4 cursor-pointer accent-secondary" />
                        <span className="text-label-md font-label-md font-medium text-text-primary">Tôi muốn gói quà tặng chỉn chu cho đơn hàng này</span>
                      </label>
                      <div className="flex w-full flex-col gap-1.5">
                        <label htmlFor="giftMessageInput" className="text-label-sm font-label-sm text-text-muted">Lời chúc bạn đọc muốn ghi gửi tặng (tối đa 150 ký tự):</label>
                        <textarea
                          id="giftMessageInput"
                          rows={2}
                          placeholder="Ví dụ: Chúc bạn luôn tìm thấy sự an tĩnh trong từng trang sách. Từ Nam..."
                          className="w-full rounded-lg bg-surface-subtle p-3 text-body-md font-body-md text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-space-md rounded-xl bg-surface-container-low p-space-lg sm:flex-row">
                <img
                  alt="DalifaBooks Logo Đảm Bảo"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB68Rde4zy0oNlvXZgrsXK41K00L65lTwa9EKE-s3Lvw-lzLiEbvpA96bx5J9aLMCgdz800WV1tkGYn6WsLH9Rxq6mFBGmhpSP1e-NQHxPlTG2CkKdagJ8nabrR0vORpp0Og_DErStJdYPX58MrxosdqKPLG8wnxjwSAaDPfpzKLgoJXv1Y8thLb94y7HXkWdaNyDVWSi_6fwQS2PupiNgTWo_xN_L7CCplAvheKovCopNJLPXjvvquI2z2m1caDI6SCA"
                  className="h-10 w-auto object-contain"
                />
                <div className="flex flex-col text-center sm:text-left">
                  <span className="text-label-md font-label-md font-bold text-text-primary">Tiêu chuẩn phát hành DalifaBooks</span>
                  <span className="text-body-sm font-body-sm text-text-secondary">
                    Tất cả ấn phẩm đều được kiểm tra góc bìa, trang ruột và bọc màng co nhiệt bảo vệ trước khi bàn giao cho đơn vị vận chuyển chuyên tuyến.
                  </span>
                </div>
              </div>
            </div>

            <aside className="top-44 flex flex-col gap-space-lg lg:sticky lg:col-span-4">
              <div className="rounded-xl bg-surface-card p-space-xl shadow-md">
                <h2 className="mb-space-md border-b border-surface-border pb-space-sm text-headline-sm font-headline-sm font-bold text-text-primary">
                  Tóm tắt đơn hàng
                </h2>

                <div className="flex flex-col gap-3 border-b border-surface-border pb-space-md text-body-md font-body-md text-text-secondary">
                  <div className="flex items-center justify-between">
                    <span>Tạm tính hàng ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} cuốn)</span>
                    <span className="font-semibold text-text-primary">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between text-secondary">
                    <span className="flex items-center gap-1">
                      <span>Tiết kiệm xuất bản</span>
                      <span className="material-symbols-outlined text-[15px]">info</span>
                    </span>
                    <span className="font-bold">-{formatCurrency(discount)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <span>Phí vận chuyển</span>
                      <span className="rounded bg-status-emerald-bg px-1.5 py-0.5 text-[11px] font-bold text-status-emerald-text">Freeship</span>
                    </span>
                    <span className="font-bold text-status-emerald-text">Miễn phí (0 đ)</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5 py-space-md">
                  <label className="flex items-center justify-between text-label-sm font-label-sm font-semibold text-text-muted">
                    <span>MÃ ƯU ĐÃI / KHUYẾN MÃI</span>
                    <span className="cursor-pointer text-primary hover:underline">Xem ví voucher (2)</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <span className="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-text-muted">confirmation_number</span>
                      <input
                        type="text"
                        placeholder="Nhập mã giảm giá..."
                        className="w-full rounded-lg bg-surface-subtle py-2 pl-9 pr-3 text-body-md font-body-md uppercase tracking-wider text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <button type="button" className="shrink-0 rounded-lg bg-primary-container px-4 py-2 text-label-md font-label-md font-semibold text-on-primary transition-colors hover:bg-primary">
                      Áp dụng
                    </button>
                  </div>

                  <div className="mt-1 flex items-center justify-between gap-2 rounded-lg bg-surface-container-low p-2">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] text-secondary">verified</span>
                      <div className="flex flex-col">
                        <span className="text-label-sm font-label-sm font-bold text-text-primary">DALIFA2026</span>
                        <span className="text-[11px] leading-tight text-text-secondary">Giảm thêm 20k cho đơn từ 500k</span>
                      </div>
                    </div>
                    <button type="button" className="rounded bg-secondary px-2.5 py-1 text-label-sm font-label-sm font-semibold text-on-secondary transition-opacity hover:opacity-90">
                      Dùng ngay
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-1 py-space-md">
                  <div className="flex items-baseline justify-between">
                    <span className="text-headline-sm font-headline-sm font-bold text-text-primary">Tổng tiền thanh toán</span>
                    <span className="text-price-lg font-price-lg font-bold text-primary">{formatCurrency(total)}</span>
                  </div>
                  <span className="text-right text-body-sm font-body-sm text-text-muted">(Đã bao gồm thuế giá trị gia tăng VAT 5%)</span>
                </div>

                <div className="flex flex-col gap-3 pt-space-sm">
                  <a href="/checkout" className="group flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-center text-label-md font-label-md font-bold text-on-primary shadow-md transition-all hover:bg-primary-container">
                    <span>Tiến hành đặt hàng</span>
                    <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">arrow_forward</span>
                  </a>
                  <button type="button" className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-secondary-fixed px-4 py-2.5 text-label-md font-label-md font-semibold text-on-secondary-fixed transition-colors hover:bg-secondary-fixed-dim">
                    <span className="material-symbols-outlined text-[18px]">flash_on</span>
                    <span>Mua nhanh qua VietQR 24/7</span>
                  </button>
                </div>
              </div>

              <div className="rounded-xl bg-surface-card p-space-lg shadow-sm">
                <span className="text-label-sm font-label-sm font-bold uppercase tracking-wider text-text-muted">Cam kết dịch vụ từ Dalifa</span>
                <div className="mt-3 flex flex-col gap-3">
                  {[
                    { icon: "verified_user", bg: "bg-status-emerald-bg text-status-emerald-text", title: "100% Sách bản quyền chính hãng", text: "Tuyệt đối không lưu hành sách lậu, sách scan sao chép bất hợp pháp." },
                    { icon: "layers", bg: "bg-status-sky-bg text-status-sky-text", title: "Đóng gói 3 lớp chống va đập", text: "Chống cấn góc bìa, bảo quản hoàn hảo trong mọi điều kiện thời tiết." },
                    { icon: "published_with_changes", bg: "bg-status-amber-bg text-status-amber-text", title: "Đổi trả miễn phí 7 ngày", text: "Đổi mới ngay lập tức nếu có khiếm khuyết in ấn, rách trang hoặc lỗi đóng gáy." },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-3">
                      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${item.bg}`}>
                        <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-label-md font-label-md font-semibold text-text-primary">{item.title}</span>
                        <span className="text-body-sm font-body-sm leading-snug text-text-secondary">{item.text}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>

          <div className="mt-space-2xl border-t border-surface-border pt-space-xl">
            <div className="mb-space-lg flex items-center justify-between">
              <div>
                <span className="block text-label-sm font-label-sm font-bold uppercase tracking-wider text-secondary">Gợi ý dành riêng cho bạn</span>
                <h3 className="text-headline-md font-headline-md font-bold text-text-primary">Thường được đặt mua cùng</h3>
              </div>
              <a href="/books" className="flex items-center gap-1 text-label-md font-label-md font-semibold text-primary hover:underline">
                <span>Khám phá thêm</span>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </a>
            </div>

            <div className="grid grid-cols-2 gap-space-lg md:grid-cols-4">
              {upsellItems.map((item) => (
                <div key={item.title} className="group flex flex-col justify-between rounded-xl bg-surface-card p-space-md shadow-sm transition-shadow hover:shadow-md">
                  <div className="flex flex-col">
                    <div className="relative mb-3 flex aspect-[2/3] w-full items-center justify-center overflow-hidden rounded-lg bg-surface-subtle">
                      <img src={item.cover} alt={item.title} className="h-full w-full object-contain p-1 transition-transform duration-300 group-hover:scale-105" />
                    </div>
                    <span className="text-[11px] font-label-sm uppercase text-text-muted">{item.title.includes("Hoa") ? "Văn học Việt Nam" : item.title.includes("Tuổi") ? "Tâm lý - Kỹ năng" : item.title.includes("Nhà") ? "Văn học thế giới" : "Tâm linh - Triết học"}</span>
                    <h4 className="mt-1 line-clamp-2 text-label-md font-label-md font-semibold text-text-primary transition-colors group-hover:text-primary">{item.title}</h4>
                    <span className="text-body-sm font-body-sm text-text-secondary">{item.author}</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-surface-border pt-2">
                    <span className="text-price-md font-price-md text-text-primary">{formatCurrency(item.price)}</span>
                    <button type="button" aria-label="Thêm vào giỏ" className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-subtle text-primary transition-colors hover:bg-primary hover:text-on-primary">
                      <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
