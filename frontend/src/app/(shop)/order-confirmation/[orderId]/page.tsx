import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const orderItems = [
  {
    name: "Chiến Binh Cầu Vồng",
    author: "Andrea Hirata • Bìa mềm",
    quantity: 1,
    price: 109000,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCyRW6qjRwtHws8xmS4N0OctLXQKSg_yP2vRqcFxVU76H1bnpMeEfXh91vH7hwXMxUzQPytPdxWIGkT56bERRdjDi6xcy4Dd2QPYLtyKt-QbGMKQuv0kgvgqv8gEQnUJ_c_sED2Ujp4m114SjZ9kFLsXFdR4hc9KhrTI1qHaKiM7Ep9hbC8TicYsjoktghJ9iQEjRDr4okynAhK2oy61ecpcvOM2b3yRkxgyi7s9UFeoQyAFf8gec11",
  },
  {
    name: "Cây Cam Ngọt Của Tôi",
    author: "José Mauro de Vasconcelos • Tái bản 2026",
    quantity: 1,
    price: 108000,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAgOpCiv1BIMdrATxlpD8c0L-71_-gf01Lcl57WKtqq_B0mDFcFB4xV3c-pVYXC02kF85m0w5BnUMmvNemDlzc9hmqL0QS-FzBT2gMewg02q51s5HU-8qXDFi9IFG9SZeCnUMQ78qUkjbplYNj0y0EujmVNOsMiAju7SASFTBe2TyfARiZIEST7aQD01QrENv38ED4un6X4RFSfQCUW2Gn3F21Oaf7XtoLM2tWPh6tQLM7ARDBZwYDg",
  },
  {
    name: "Marcus Aurelius: Suy Tưởng (Meditations)",
    author: "Marcus Aurelius • Ấn bản bìa cứng cao cấp",
    quantity: 1,
    price: 296000,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAExSOPWlj7i5lzVHskxlc6xFXTOnV8BondvjZAFExYDqSG6nNG-BQhjDkDmdNpRS-tDcCmW280sSXu_KcD7hy0VN0oEr0pTmqnQ5knOWCpv26y4ThBCOHFDxacV3hjNQeaGfAXn_5VQNEpSawLlgIAwPnZY4JggwR3uc8Q0WYws-2abAtLCPdlK31gRwMbjVoYSs_QounBEj9F53GcvUl2QxDpDVvutM2_YZOpW7GRYs1znuRXQIcP",
  },
];

const formatCurrency = (value: number) => `${value.toLocaleString("vi-VN")} đ`;

export default function OrderConfirmationPage({
  params,
}: {
  params: { orderId: string };
}) {
  const orderCode = params.orderId || "DLF-894210";
  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-surface text-on-surface antialiased">
      <Header active="books" />

      <main className="w-full min-h-[calc(100vh-160px)] bg-surface pt-[160px]">
        <section className="relative w-full overflow-hidden bg-surface-canvas py-space-xl">
          <div className="pointer-events-none absolute -top-32 left-1/2 h-[320px] w-[720px] -translate-x-1/2 rounded-full bg-gradient-to-b from-primary-fixed/20 via-tertiary-fixed/10 to-transparent blur-3xl" />

          <div className="relative z-10 mx-auto max-w-[1200px] px-margin-desktop">
            <nav aria-label="Breadcrumb" className="mb-space-lg flex items-center gap-2 text-label-sm font-label-sm text-text-secondary">
              <a href="/" className="flex items-center gap-1 transition-colors hover:text-primary">
                <span className="material-symbols-outlined text-[16px]">home</span>
                <span>Trang chủ</span>
              </a>
              <span className="text-text-muted">/</span>
              <span className="text-text-muted">Giỏ hàng &amp; Thanh toán</span>
              <span className="text-text-muted">/</span>
              <span className="font-semibold text-text-primary">Xác nhận đơn hàng</span>
            </nav>

            <div className="mb-space-xl overflow-hidden rounded-xl bg-surface-card p-space-xl shadow-sm">
              <div className="flex flex-col items-center gap-space-lg md:flex-row md:items-start">
                <div className="relative flex shrink-0 items-center justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-status-emerald-bg text-status-emerald-text shadow-sm ring-8 ring-status-emerald-bg/30">
                    <span className="material-symbols-outlined text-[36px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      check_circle
                    </span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-secondary-container text-on-secondary shadow-xs">
                    <span className="material-symbols-outlined text-[14px]">auto_stories</span>
                  </div>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-status-emerald-bg px-3 py-1 text-label-sm font-label-sm font-semibold text-status-emerald-text">
                    <span className="h-2 w-2 rounded-full bg-on-tertiary-container animate-pulse" />
                    <span>Đơn hàng ghi nhận thành công</span>
                  </div>
                  <h1 className="mb-2 text-headline-lg font-headline-lg tracking-tight text-text-primary">
                    Đặt hàng thành công! Cảm ơn bạn đã đồng hành cùng DalifaBooks
                  </h1>
                  <p className="mb-space-md max-w-2xl text-body-md font-body-md text-text-secondary">
                    Hệ thống đã gửi thư xác nhận kèm bản tóm tắt hóa đơn và đường dẫn theo dõi đơn hàng đến hòm thư
                    <strong className="font-semibold text-text-primary"> nguyenvanan.reading@gmail.com</strong>.
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
                    <div className="flex items-center gap-2 rounded-lg bg-surface-subtle px-3.5 py-1.5">
                      <span className="text-label-sm font-label-sm uppercase text-text-muted">Mã đơn hàng:</span>
                      <span className="text-headline-sm font-headline-sm font-bold tracking-wider text-primary">#{orderCode}</span>
                      <button
                        type="button"
                        aria-label="Sao chép mã đơn hàng"
                        className="rounded p-1 text-text-secondary transition-colors hover:bg-surface-border hover:text-primary"
                        title="Sao chép mã đơn hàng"
                        onClick={() => navigator.clipboard.writeText(orderCode)}
                      >
                        <span className="material-symbols-outlined text-[18px]">content_copy</span>
                      </button>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-status-amber-bg px-3 py-1.5 text-label-sm font-label-sm font-medium text-status-amber-text">
                      <span className="material-symbols-outlined text-[16px]">schedule</span>
                      <span>Chờ chuyển khoản thanh toán (30 phút)</span>
                    </span>
                  </div>
                </div>

                <div className="hidden shrink-0 items-end xl:flex">
                  <div className="flex flex-col items-center rounded-lg bg-surface-subtle p-3 shadow-xs">
                    <img
                      alt="DalifaBooks Logo"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuB68Rde4zy0oNlvXZgrsXK41K00L65lTwa9EKE-s3Lvw-lzLiEbvpA96bx5J9aLMCgdz800WV1tkGYn6WsLH9Rxq6mFBGmhpSP1e-NQHxPlTG2CkKdagJ8nabrR0vORpp0Og_DErStJdYPX58MrxosdqKPLG8wnxjwSAaDPfpzKLgoJXv1Y8thLb94y7HXkWdaNyDVWSi_6fwQS2PupiNgTWo_xN_L7CCplAvheKovCopNJLPXjvvquI2z2m1caDI6SCA"
                      className="h-10 w-auto object-contain"
                    />
                    <span className="mt-1 text-label-sm font-label-sm uppercase tracking-wider text-text-muted">Ấn bản tri thức</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 items-start gap-space-xl lg:grid-cols-12">
              <div className="flex flex-col gap-space-lg lg:col-span-7">
                <div className="overflow-hidden rounded-xl bg-surface-card p-space-xl shadow-sm">
                  <div className="mb-space-md flex flex-wrap items-center justify-between gap-2 pb-space-md">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-container text-on-primary">
                        <span className="material-symbols-outlined text-[24px]">qr_code_scanner</span>
                      </div>
                      <div>
                        <h2 className="text-headline-md font-headline-md font-bold text-text-primary">Thanh toán tự động qua VietQR</h2>
                        <p className="text-body-sm font-body-sm text-text-secondary">Quét mã QR bằng ứng dụng ngân hàng hoặc ví điện tử bất kỳ</p>
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-status-sky-bg px-3 py-1 text-label-sm font-label-sm font-semibold text-status-sky-text">
                      <span className="material-symbols-outlined text-[16px]">bolt</span>
                      <span>Xác nhận tự động trong 60 giây</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 items-center gap-space-lg sm:grid-cols-12">
                    <div className="sm:col-span-5">
                      <div className="mx-auto flex w-full max-w-[240px] flex-col items-center justify-center rounded-xl bg-surface-card p-3 shadow-md">
                        <div className="mb-1 flex w-full items-center justify-between px-1">
                          <span className="text-label-sm font-label-sm font-bold tracking-widest text-primary">VietQR</span>
                          <span className="text-label-sm font-label-sm font-bold tracking-widest text-secondary">Napas247</span>
                        </div>

                        <div className="flex w-full flex-1 items-center justify-center rounded-lg bg-surface-subtle p-2.5">
                          <svg className="h-full w-full text-text-primary" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="10" y="10" width="40" height="40" rx="4" fill="currentColor" fillOpacity="0.1" />
                            <rect x="16" y="16" width="28" height="28" rx="2" fill="currentColor" />
                            <rect x="22" y="22" width="16" height="16" fill="white" />
                            <rect x="26" y="26" width="8" height="8" rx="1" fill="currentColor" />
                            <rect x="110" y="10" width="40" height="40" rx="4" fill="currentColor" fillOpacity="0.1" />
                            <rect x="116" y="16" width="28" height="28" rx="2" fill="currentColor" />
                            <rect x="122" y="22" width="16" height="16" fill="white" />
                            <rect x="126" y="26" width="8" height="8" rx="1" fill="currentColor" />
                            <rect x="10" y="110" width="40" height="40" rx="4" fill="currentColor" fillOpacity="0.1" />
                            <rect x="16" y="116" width="28" height="28" rx="2" fill="currentColor" />
                            <rect x="22" y="122" width="16" height="16" fill="white" />
                            <rect x="26" y="126" width="8" height="8" rx="1" fill="currentColor" />
                            <circle cx="60" cy="20" r="4" fill="currentColor" />
                            <circle cx="75" cy="20" r="4" fill="currentColor" />
                            <circle cx="90" cy="20" r="4" fill="currentColor" />
                            <circle cx="60" cy="35" r="4" fill="currentColor" />
                            <circle cx="90" cy="35" r="4" fill="currentColor" />
                            <circle cx="75" cy="50" r="4" fill="currentColor" />
                            <circle cx="20" cy="65" r="4" fill="currentColor" />
                            <circle cx="35" cy="65" r="4" fill="currentColor" />
                            <circle cx="50" cy="65" r="4" fill="currentColor" />
                            <circle cx="65" cy="65" r="4" fill="currentColor" />
                            <circle cx="80" cy="65" r="4" fill="currentColor" />
                            <circle cx="95" cy="65" r="4" fill="currentColor" />
                            <circle cx="110" cy="65" r="4" fill="currentColor" />
                            <circle cx="140" cy="65" r="4" fill="currentColor" />
                            <circle cx="20" cy="80" r="4" fill="currentColor" />
                            <circle cx="50" cy="80" r="4" fill="currentColor" />
                            <circle cx="110" cy="80" r="4" fill="currentColor" />
                            <circle cx="125" cy="80" r="4" fill="currentColor" />
                            <circle cx="140" cy="80" r="4" fill="currentColor" />
                            <circle cx="20" cy="95" r="4" fill="currentColor" />
                            <circle cx="35" cy="95" r="4" fill="currentColor" />
                            <circle cx="65" cy="95" r="4" fill="currentColor" />
                            <circle cx="95" cy="95" r="4" fill="currentColor" />
                            <circle cx="125" cy="95" r="4" fill="currentColor" />
                            <circle cx="60" cy="110" r="4" fill="currentColor" />
                            <circle cx="75" cy="110" r="4" fill="currentColor" />
                            <circle cx="90" cy="110" r="4" fill="currentColor" />
                            <circle cx="120" cy="110" r="4" fill="currentColor" />
                            <circle cx="135" cy="110" r="4" fill="currentColor" />
                            <circle cx="60" cy="125" r="4" fill="currentColor" />
                            <circle cx="75" cy="140" r="4" fill="currentColor" />
                            <circle cx="90" cy="125" r="4" fill="currentColor" />
                            <circle cx="105" cy="140" r="4" fill="currentColor" />
                            <circle cx="120" cy="125" r="4" fill="currentColor" />
                            <circle cx="135" cy="140" r="4" fill="currentColor" />
                            <circle cx="80" cy="80" r="14" fill="white" stroke="#001428" strokeWidth="2" />
                            <path d="M74 80L78 84L86 76" stroke="#001428" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>

                        <span className="mt-1.5 flex items-center gap-1 text-label-sm font-label-sm text-text-muted">
                          <span className="material-symbols-outlined text-[14px] text-on-tertiary-container">verified</span>
                          <span>Tự động điền số tiền &amp; nội dung</span>
                        </span>
                      </div>

                      <button
                        type="button"
                        className="mt-space-sm flex items-center justify-center gap-2 rounded-lg bg-surface-subtle px-4 py-2 text-label-md font-label-md font-semibold text-text-primary transition-all hover:bg-surface-container"
                      >
                        <span className="material-symbols-outlined text-[18px]">download</span>
                        <span>Tải ảnh mã QR</span>
                      </button>
                    </div>

                    <div className="space-y-space-sm sm:col-span-7">
                      <div className="flex items-start justify-between rounded-lg bg-surface-subtle p-3">
                        <div>
                          <span className="block text-label-sm font-label-sm text-text-muted">Ngân hàng thụ hưởng</span>
                          <span className="text-headline-sm font-headline-sm font-bold text-text-primary">MB Bank (Ngân hàng Quân đội)</span>
                          <span className="mt-0.5 block text-body-sm font-body-sm text-text-secondary">Chi nhánh Hoàn Kiếm, Hà Nội</span>
                        </div>
                        <span className="rounded bg-surface-card px-2 py-0.5 text-label-sm font-label-sm font-semibold text-primary shadow-xs">24/7</span>
                      </div>

                      <div className="flex items-center justify-between rounded-lg bg-surface-subtle p-3">
                        <div className="min-w-0 pr-2">
                          <span className="block text-label-sm font-label-sm text-text-muted">Số tài khoản thụ hưởng</span>
                          <span className="text-price-lg font-price-lg font-bold tracking-wider text-primary">0868 2026 8888</span>
                        </div>
                        <button type="button" className="flex shrink-0 items-center gap-1 rounded-lg bg-surface-card px-3 py-1.5 text-label-md font-label-md font-medium text-text-primary shadow-xs transition-all hover:bg-primary hover:text-on-primary">
                          <span className="material-symbols-outlined text-[16px]">content_copy</span>
                          <span>Sao chép</span>
                        </button>
                      </div>

                      <div className="rounded-lg bg-surface-subtle p-3">
                        <span className="block text-label-sm font-label-sm text-text-muted">Chủ tài khoản thụ hưởng</span>
                        <span className="text-headline-sm font-headline-sm font-semibold uppercase tracking-wide text-text-primary">
                          CONG TY CO PHAN VAN HOA VA PHAT HANH SACH DALIFA
                        </span>
                      </div>

                      <div className="flex items-center justify-between rounded-lg bg-surface-container-low p-3">
                        <div>
                          <span className="block text-label-sm font-label-sm text-text-muted">Số tiền cần thanh toán</span>
                          <span className="text-headline-lg font-headline-lg font-bold text-secondary">{formatCurrency(total)}</span>
                        </div>
                        <button type="button" className="flex shrink-0 items-center gap-1 rounded-lg bg-surface-card px-3 py-1.5 text-label-md font-label-md font-medium text-text-primary shadow-xs transition-all hover:bg-primary hover:text-on-primary">
                          <span className="material-symbols-outlined text-[16px]">content_copy</span>
                          <span>Sao chép</span>
                        </button>
                      </div>

                      <div className="flex items-center justify-between rounded-lg bg-surface-subtle p-3">
                        <div className="min-w-0 pr-2">
                          <span className="block text-label-sm font-label-sm text-text-muted">Nội dung chuyển khoản (bắt buộc)</span>
                          <span className="text-price-lg font-price-lg font-bold tracking-widest text-primary">DLF {orderCode.replace("#", "")}</span>
                        </div>
                        <button type="button" className="flex shrink-0 items-center gap-1 rounded-lg bg-surface-card px-3 py-1.5 text-label-md font-label-md font-medium text-text-primary shadow-xs transition-all hover:bg-primary hover:text-on-primary">
                          <span className="material-symbols-outlined text-[16px]">content_copy</span>
                          <span>Sao chép</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-space-lg rounded-xl bg-status-amber-bg p-space-md text-status-amber-text">
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined mt-0.5 shrink-0 text-[24px]">warning</span>
                      <div className="text-body-sm font-body-sm">
                        <p className="mb-1 font-bold">Lưu ý quan trọng khi thanh toán:</p>
                        <ul className="list-inside list-disc space-y-1">
                          <li>Thời hạn giữ giỏ sách và khuyến mại ưu đãi là <strong className="font-bold underline">30 phút</strong> kể từ khi đặt hàng.</li>
                          <li>Vui lòng giữ nguyên nội dung chuyển khoản <strong className="font-bold">DLF {orderCode.replace("#", "")}</strong> để cổng đối soát ngân hàng tự động cập nhật trạng thái đơn ngay lập tức.</li>
                          <li>Nếu bạn chuyển khoản khác ngân hàng vào cuối tuần, vui lòng chọn hình thức <em>Chuyển tiền nhanh 24/7 (Napas)</em>.</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="mt-space-lg flex flex-col items-center gap-space-md pt-space-md sm:flex-row">
                    <button type="button" className="flex h-12 w-full flex-1 items-center justify-center gap-2 rounded-lg bg-primary-container px-6 text-label-md font-label-md font-semibold text-on-primary shadow-sm transition-all hover:bg-primary">
                      <span className="material-symbols-outlined text-[20px]">task_alt</span>
                      <span>Tôi đã hoàn tất chuyển khoản</span>
                    </button>
                    <a href="#" className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-surface-subtle px-5 text-label-md font-label-md font-medium text-text-primary transition-all hover:bg-surface-border sm:w-auto">
                      <span className="material-symbols-outlined text-[20px]">support_agent</span>
                      <span>Cần hỗ trợ thanh toán?</span>
                    </a>
                  </div>
                </div>

                <div className="rounded-xl bg-surface-card p-space-lg shadow-sm">
                  <h3 className="mb-space-md flex items-center gap-2 text-headline-sm font-headline-sm font-semibold text-text-primary">
                    <span className="material-symbols-outlined text-[22px] text-primary">route</span>
                    <span>Quy trình hoàn tất &amp; Giao nhận ấn phẩm</span>
                  </h3>

                  <div className="grid grid-cols-1 gap-space-md md:grid-cols-3">
                    {[
                      { step: 1, title: "Xác nhận chuyển khoản", text: "Hệ thống ghi nhận sao kê tự động và gửi tin xác nhận trong 1-5 phút." },
                      { step: 2, title: "Đóng gói cẩn trọng", text: "Sách được bọc màng co và chèn đệm bảo vệ góc bìa chống va đập tiêu chuẩn." },
                      { step: 3, title: "Giao tận tay bạn đọc", text: "Bưu tá bàn giao tận nơi, bạn đọc được kiểm tra nguyên vẹn kiện hàng trước khi nhận." },
                    ].map((item) => (
                      <div key={item.step} className="rounded-lg bg-surface-canvas p-3">
                        <div className="mb-1.5 flex items-center gap-2">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-container text-label-sm font-label-sm font-bold text-on-primary">
                            {item.step}
                          </span>
                          <span className="text-label-md font-label-md font-bold text-text-primary">{item.title}</span>
                        </div>
                        <p className="text-body-sm font-body-sm text-text-secondary">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-space-lg lg:col-span-5">
                <div className="rounded-xl bg-surface-card p-space-lg shadow-sm">
                  <div className="mb-space-md flex items-center justify-between">
                    <h3 className="flex items-center gap-2 text-headline-sm font-headline-sm font-semibold text-text-primary">
                      <span className="material-symbols-outlined text-[22px] text-primary">pin_drop</span>
                      <span>Địa chỉ nhận sách</span>
                    </h3>
                    <span className="rounded bg-status-emerald-bg px-2.5 py-1 text-label-sm font-label-sm font-medium text-status-emerald-text">Đã xác minh</span>
                  </div>

                  <div className="space-y-3 text-body-sm font-body-sm text-text-secondary">
                    <div className="flex items-start gap-2.5">
                      <span className="material-symbols-outlined mt-0.5 text-[18px] text-text-muted">person</span>
                      <div>
                        <span className="block text-label-md font-label-md font-bold text-text-primary">Nguyễn Văn An</span>
                        <span>Người nhận chính</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <span className="material-symbols-outlined mt-0.5 text-[18px] text-text-muted">call</span>
                      <span className="text-label-md font-label-md font-medium text-text-primary">0987 654 321</span>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <span className="material-symbols-outlined mt-0.5 text-[18px] text-text-muted">location_on</span>
                      <span className="text-text-primary">Số 45 Phố Tràng Tiền, Phường Tràng Tiền, Quận Hoàn Kiếm, TP. Hà Nội</span>
                    </div>

                    <div className="bg-surface-card pt-3">
                      <div className="flex items-start gap-3 rounded-lg bg-surface-subtle p-3">
                        <span className="material-symbols-outlined mt-0.5 text-[20px] text-primary">local_shipping</span>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-label-md font-label-md font-semibold text-text-primary">Giao hàng tiêu chuẩn</span>
                            <span className="text-label-sm font-label-sm font-bold text-status-emerald-text">Miễn phí vận chuyển</span>
                          </div>
                          <p className="mt-0.5 text-body-sm font-body-sm text-text-muted">
                            Dự kiến nhận sách: <strong className="font-semibold text-text-primary">14 - 15 Tháng 10, 2026</strong>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-surface-card p-space-lg shadow-sm">
                  <div className="mb-space-md flex items-center justify-between">
                    <h3 className="flex items-center gap-2 text-headline-sm font-headline-sm font-semibold text-text-primary">
                      <span className="material-symbols-outlined text-[22px] text-primary">menu_book</span>
                      <span>Kiện hàng gồm 3 tác phẩm</span>
                    </h3>
                    <span className="text-label-sm font-label-sm text-text-muted">3 sản phẩm</span>
                  </div>

                  <div className="flex flex-col gap-space-md">
                    {orderItems.map((item) => (
                      <div key={item.name} className="flex items-start gap-3 pb-3">
                        <div className="flex h-24 w-16 shrink-0 items-center justify-center overflow-hidden rounded-md bg-surface-subtle shadow-xs">
                          <img src={item.image} alt={item.name} className="h-full w-full object-contain" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="line-clamp-1 text-label-md font-label-md font-bold text-text-primary transition-colors hover:text-primary">
                            {item.name}
                          </h4>
                          <p className="text-body-sm font-body-sm text-text-secondary">{item.author}</p>
                          <div className="mt-1 flex items-center justify-between">
                            <span className="text-label-sm font-label-sm text-text-muted">SL: {item.quantity}</span>
                            <span className="text-price-md font-price-md text-text-primary">{formatCurrency(item.price)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-space-md space-y-2 pt-space-md">
                    <div className="flex items-center justify-between text-body-sm font-body-sm text-text-secondary">
                      <span>Tạm tính (3 tác phẩm)</span>
                      <span className="font-medium text-text-primary">{formatCurrency(subtotal)}</span>
                    </div>
                    <div className="flex items-center justify-between text-body-sm font-body-sm text-text-secondary">
                      <span>Phí vận chuyển bưu chính</span>
                      <span className="font-medium text-status-emerald-text">0 đ (Miễn phí)</span>
                    </div>
                    <div className="flex items-center justify-between text-body-sm font-body-sm text-text-secondary">
                      <span>Mã giảm giá bạn đọc (DALIFA-READ)</span>
                      <span className="font-medium text-secondary">-0 đ</span>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <span className="block text-label-md font-label-md font-bold text-text-primary">Tổng thanh toán</span>
                        <span className="block text-label-sm font-label-sm text-text-muted">Đã bao gồm thuế GTGT</span>
                      </div>
                      <span className="text-price-lg font-price-lg font-bold text-primary">{formatCurrency(total)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5">
                  <a href="#" className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-surface-card text-label-md font-label-md font-semibold text-primary shadow-xs transition-all hover:bg-surface-subtle">
                    <span className="material-symbols-outlined text-[18px]">manage_search</span>
                    <span>Theo dõi trạng thái đơn hàng (#{orderCode})</span>
                  </a>
                  <a href="/" className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-surface-subtle text-label-md font-label-md font-medium text-text-secondary transition-all hover:bg-surface-border hover:text-text-primary">
                    <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                    <span>Tiếp tục khám phá sách hay</span>
                  </a>
                </div>

                <div className="flex items-center gap-3 rounded-lg bg-surface-canvas p-3">
                  <span className="material-symbols-outlined shrink-0 text-[20px] text-text-muted">verified</span>
                  <p className="text-body-sm font-body-sm text-text-secondary">
                    Mỗi cuốn sách tại DalifaBooks đều được bảo hiểm 100% khi vận chuyển: Đổi trả mới trong 7 ngày nếu lỗi in ấn hay móp méo góc bìa.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
