"use client";

import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function OrderLookupPage() {
  return (
    <div className="min-h-screen bg-surface text-on-surface antialiased">
      <Header />

      <main className="w-full min-h-[calc(100vh-160px)] bg-surface pt-[160px]">
        <div className="flex w-full flex-col">
          <div className="relative w-full overflow-hidden bg-surface-canvas py-space-xl">
            <div className="pointer-events-none absolute -top-24 right-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
            <div className="pointer-events-none absolute left-[-5rem] top-1/2 h-80 w-80 rounded-full bg-secondary-container/10 blur-3xl" />

            <div className="relative z-10 mx-auto max-w-[1200px] px-margin-desktop">
              <nav aria-label="Breadcrumb" className="mb-space-lg flex items-center gap-2 text-body-sm font-body-sm text-text-muted">
                <Link href="/" className="flex items-center gap-1 transition-colors hover:text-primary">
                  <span className="material-symbols-outlined text-[16px]">home</span>
                  <span>Trang chủ</span>
                </Link>
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                <span className="font-medium text-text-primary">Tra cứu hành trình đơn hàng</span>
              </nav>

              <div className="mb-space-2xl rounded-xl bg-surface-card p-space-xl shadow-sm">
                <div className="flex flex-col justify-between gap-space-lg pb-space-lg lg:flex-row lg:items-center">
                  <div className="max-w-xl">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-on-primary">
                        <span className="material-symbols-outlined text-[16px]">local_shipping</span>
                      </span>
                      <span className="font-label-sm text-label-sm font-semibold uppercase tracking-wider text-secondary">
                        Hệ Thống Kiểm Soát Vận Đơn Thời Gian Thực
                      </span>
                    </div>
                    <h1 className="font-headline-lg text-headline-lg tracking-tight text-primary">
                      Tra Cứu Đơn Hàng &amp; Vận Đơn DalifaBooks
                    </h1>
                    <p className="mt-1 text-body-md font-body-md text-text-secondary">
                      Dành cho quý bạn đọc vãng lai hoặc thành viên Dalifa. Nhập mã đơn hàng kết hợp thông tin liên lạc để xem tiến độ đóng gói và lộ trình giao hàng trực tiếp.
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-space-md rounded-lg bg-surface-subtle p-space-md">
                    <img
                      alt="Logo chuẩn DalifaBooks"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuB68Rde4zy0oNlvXZgrsXK41K00L65lTwa9EKE-s3Lvw-lzLiEbvpA96bx5J9aLMCgdz800WV1tkGYn6WsLH9Rxq6mFBGmhpSP1e-NQHxPlTG2CkKdagJ8nabrR0vORpp0Og_DErStJdYPX58MrxosdqKPLG8wnxjwSAaDPfpzKLgoJXv1Y8thLb94y7HXkWdaNyDVWSi_6fwQS2PupiNgTWo_xN_L7CCplAvheKovCopNJLPXjvvquI2z2m1caDI6SCA"
                      className="h-10 w-auto object-contain"
                    />
                    <div className="flex flex-col">
                      <span className="font-label-sm text-label-sm font-semibold text-text-primary">Dalifa Fulfillment Hub</span>
                      <span className="font-body-sm text-body-sm text-text-muted">Đóng gói chuẩn sách sưu tầm</span>
                    </div>
                  </div>
                </div>

                <form className="grid grid-cols-1 items-end gap-space-md pt-space-md md:grid-cols-12" onSubmit={(e) => e.preventDefault()}>
                  <div className="flex flex-col gap-1.5 md:col-span-5">
                    <label htmlFor="order-id-input" className="flex items-center gap-1.5 text-label-md font-label-md font-semibold text-text-primary">
                      <span className="material-symbols-outlined text-[18px] text-text-secondary">tag</span>
                      <span>Mã đơn hàng</span>
                    </label>
                    <div className="relative">
                      <input
                        id="order-id-input"
                        defaultValue="DLF-894210"
                        type="text"
                        className="w-full rounded-lg bg-surface-subtle px-4 py-3 text-body-md font-body-md font-medium text-text-primary placeholder:text-text-muted shadow-sm transition-all focus:bg-surface-card focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Ví dụ: DLF-894210"
                      />
                      <span className="absolute right-3.5 top-3 text-label-sm font-label-sm text-text-muted">#MÃ_HỆ_THỐNG</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 md:col-span-5">
                    <label htmlFor="customer-contact-input" className="flex items-center gap-1.5 text-label-md font-label-md font-semibold text-text-primary">
                      <span className="material-symbols-outlined text-[18px] text-text-secondary">contact_phone</span>
                      <span>Số điện thoại hoặc Email đặt hàng</span>
                    </label>
                    <div className="relative">
                      <input
                        id="customer-contact-input"
                        defaultValue="0918••••89 (nguyen.anh••••@gmail.com)"
                        type="text"
                        className="w-full rounded-lg bg-surface-subtle px-4 py-3 text-body-md font-body-md text-text-primary placeholder:text-text-muted shadow-sm transition-all focus:bg-surface-card focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Nhập số điện thoại hoặc email nhận sách"
                      />
                      <span className="absolute right-3.5 top-3.5 text-status-emerald-text">
                        <span className="material-symbols-outlined text-[18px]">verified</span>
                      </span>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      className="group flex w-full min-h-[44px] items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-label-md font-label-md font-semibold text-on-primary shadow-sm transition-all hover:bg-primary-container"
                    >
                      <span>Tra cứu ngay</span>
                      <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-0.5">search</span>
                    </button>
                  </div>
                </form>

                <div className="mt-space-md flex flex-wrap items-center gap-4 text-body-sm font-body-sm text-text-muted">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-text-secondary">lock</span>
                    <span>Bảo mật dữ liệu cá nhân theo tiêu chuẩn ISO/IEC 27001</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-text-secondary">schedule</span>
                    <span>Cập nhật đồng bộ trực tiếp với tổng đài bưu điện Viettel Post</span>
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-space-xl lg:grid-cols-12">
                <div className="flex flex-col gap-space-xl lg:col-span-8">
                  <div className="rounded-xl bg-surface-card p-space-lg shadow-sm">
                    <div className="flex flex-col justify-between gap-4 pb-space-md sm:flex-row sm:items-center">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-label-sm text-label-sm font-semibold uppercase tracking-wider text-text-muted">Mã tra cứu vận đơn:</span>
                          <span className="font-headline-sm text-headline-sm font-bold text-primary">#DLF-894210</span>
                        </div>
                        <div className="mt-0.5 text-body-sm font-body-sm text-text-secondary">
                          Thời gian đặt hàng: <strong className="text-text-primary">10:15 - Thứ Hai, 12/10/2026</strong> • Kênh đặt: <span className="font-medium text-text-primary">Trực tuyến (Web Storefront)</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-start rounded-full bg-surface-subtle px-3 py-1.5 sm:self-auto">
                        <span className="h-2.5 w-2.5 rounded-full bg-secondary-container animate-ping" />
                        <span className="font-label-sm text-label-sm font-semibold text-text-primary">Kho đang xử lý chuyên biệt</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-space-sm pt-space-md sm:grid-cols-3">
                      <div className="flex items-start gap-3 rounded-lg bg-status-emerald-bg p-3.5">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-status-emerald-text text-on-primary">
                          <span className="material-symbols-outlined text-[18px]">check_circle</span>
                        </div>
                        <div>
                          <span className="block font-label-sm text-label-sm font-semibold uppercase text-status-emerald-text">Trạng thái đơn</span>
                          <span className="block font-label-md text-label-md font-bold text-status-emerald-text">Đã xác nhận (Confirmed)</span>
                          <span className="block text-body-sm font-body-sm text-status-emerald-text/80">Bộ phận xử lý đã duyệt đơn</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 rounded-lg bg-status-sky-bg p-3.5">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-status-sky-text text-on-primary">
                          <span className="material-symbols-outlined text-[18px]">payments</span>
                        </div>
                        <div>
                          <span className="block font-label-sm text-label-sm font-semibold uppercase text-status-sky-text">Trạng thái thanh toán</span>
                          <span className="block font-label-md text-label-md font-bold text-status-sky-text">Đã thanh toán (Paid)</span>
                          <span className="block text-body-sm font-body-sm text-status-sky-text/80">VietQR 24/7 tức thì</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 rounded-lg bg-status-amber-bg p-3.5">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-status-amber-text text-on-primary">
                          <span className="material-symbols-outlined text-[18px]">inventory_2</span>
                        </div>
                        <div>
                          <span className="block font-label-sm text-label-sm font-semibold uppercase text-status-amber-text">Trạng thái vận chuyển</span>
                          <span className="block font-label-md text-label-md font-bold text-status-amber-text">Đang đóng gói xuất kho</span>
                          <span className="block text-body-sm font-body-sm text-status-amber-text/80">Dán seal bảo vệ màng khí</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl bg-surface-card p-space-lg shadow-sm">
                    <div className="mb-space-lg flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[22px] text-primary">route</span>
                        <h2 className="font-headline-sm text-headline-sm font-bold text-text-primary">Tiến trình vận đơn &amp; Xuất kho</h2>
                      </div>
                      <span className="flex items-center gap-1 text-label-sm font-label-sm text-text-muted">
                        <span className="material-symbols-outlined text-[16px]">sync</span>
                        <span>Đồng bộ 2 phút trước</span>
                      </span>
                    </div>

                    <div className="relative space-y-space-xl pl-6 before:absolute before:bottom-3 before:left-3 before:top-3 before:w-0.5 before:bg-surface-border sm:pl-8 sm:before:left-4">
                      <div className="relative flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                        <div className="absolute -left-6 top-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-status-emerald-bg sm:-left-8">
                          <span className="h-3 w-3 rounded-full bg-status-emerald-text" />
                        </div>
                        <div className="pr-4">
                          <h3 className="flex items-center gap-2 text-label-md font-label-md font-bold text-text-primary">
                            <span>Đặt hàng thành công</span>
                            <span className="rounded bg-surface-subtle px-2 py-0.5 text-label-sm font-label-sm text-text-secondary">Tự động</span>
                          </h3>
                          <p className="mt-0.5 text-body-sm font-body-sm text-text-secondary">
                            Hệ thống DalifaBooks ghi nhận thông tin và tạo phiếu xuất kho điện tử DLF-894210.
                          </p>
                        </div>
                        <div className="shrink-0 text-left text-body-sm font-body-sm text-text-muted sm:text-right">
                          <span className="block font-semibold text-text-primary">10:15</span>
                          <span>12/10/2026</span>
                        </div>
                      </div>

                      <div className="relative flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                        <div className="absolute -left-6 top-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-status-emerald-bg sm:-left-8">
                          <span className="h-3 w-3 rounded-full bg-status-emerald-text" />
                        </div>
                        <div className="pr-4">
                          <h3 className="flex items-center gap-2 text-label-md font-label-md font-bold text-text-primary">
                            <span>Đã xác nhận thanh toán qua VietQR</span>
                            <span className="material-symbols-outlined text-[16px] text-status-emerald-text">verified</span>
                          </h3>
                          <p className="mt-0.5 text-body-sm font-body-sm text-text-secondary">
                            Ngân hàng đối tác thông báo khớp lệnh chuyển tiền 513.000 đ thành công. Biên lai điện tử đã kích hoạt.
                          </p>
                        </div>
                        <div className="shrink-0 text-left text-body-sm font-body-sm text-text-muted sm:text-right">
                          <span className="block font-semibold text-text-primary">10:22</span>
                          <span>12/10/2026</span>
                        </div>
                      </div>

                      <div className="relative flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                        <div className="absolute -left-6 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-secondary-container/20 sm:-left-8">
                          <span className="h-3.5 w-3.5 rounded-full bg-secondary-container ring-4 ring-secondary-container/30" />
                        </div>
                        <div className="pr-4">
                          <div className="flex items-center gap-2">
                            <h3 className="text-label-md font-label-md font-bold text-secondary">
                              Trung tâm hoàn tất đơn hàng Dalifa đang đóng gói
                            </h3>
                            <span className="rounded-full bg-secondary-container px-2 py-0.5 text-label-sm font-label-sm font-semibold text-on-secondary">
                              Hiện tại
                            </span>
                          </div>
                          <p className="mt-1 text-body-sm font-body-sm leading-relaxed text-text-primary">
                            Đội ngũ chuyên trách đang bọc 2 lớp màng xốp khí chống va đập góc sách, đặt thẻ đánh dấu trang độc quyền và dán niêm phong chống rách Dalifa Seal.
                          </p>
                          <div className="mt-2 flex items-center gap-3 rounded-lg bg-surface-subtle p-3">
                            <span className="material-symbols-outlined text-[20px] text-text-secondary">package_2</span>
                            <span className="text-body-sm font-body-sm text-text-secondary">
                              Vị trí kiện: <strong className="text-text-primary">Kho Tổng Đinh Lễ, Hoàn Kiếm, Hà Nội</strong> (Khay kiểm phẩm #B-42)
                            </span>
                          </div>
                        </div>
                        <div className="shrink-0 text-left text-body-sm font-body-sm text-secondary sm:text-right">
                          <span className="block font-bold">14:00</span>
                          <span>12/10/2026</span>
                        </div>
                      </div>

                      <div className="relative flex flex-col justify-between gap-1 opacity-70 sm:flex-row sm:items-baseline">
                        <div className="absolute -left-6 top-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-surface-subtle sm:-left-8">
                          <span className="h-2.5 w-2.5 rounded-full bg-text-muted" />
                        </div>
                        <div className="pr-4">
                          <h3 className="text-label-md font-label-md font-semibold text-text-primary">Bàn giao bưu phẩm cho Viettel Post</h3>
                          <p className="mt-0.5 text-body-sm font-body-sm text-text-secondary">
                            Mã vận đơn bưu tá liên kết: <strong className="text-text-primary">VTP-849204918VN</strong> (Xe tải thu gom chuyến sáng).
                          </p>
                        </div>
                        <div className="shrink-0 text-left text-body-sm font-body-sm text-text-muted sm:text-right">
                          <span className="block font-semibold">Dự kiến 09:00</span>
                          <span>13/10/2026</span>
                        </div>
                      </div>

                      <div className="relative flex flex-col justify-between gap-1 opacity-70 sm:flex-row sm:items-baseline">
                        <div className="absolute -left-6 top-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-surface-subtle sm:-left-8">
                          <span className="h-2.5 w-2.5 rounded-full bg-text-muted" />
                        </div>
                        <div className="pr-4">
                          <h3 className="text-label-md font-label-md font-semibold text-text-primary">Giao sách tận tay quý bạn đọc</h3>
                          <p className="mt-0.5 text-body-sm font-body-sm text-text-secondary">
                            Nhân viên giao vận sẽ liên hệ trước khi phát kiện 15 - 30 phút. Quý khách được đồng kiểm niêm phong ngoài bưu kiện.
                          </p>
                        </div>
                        <div className="shrink-0 text-left text-body-sm font-body-sm text-text-muted sm:text-right">
                          <span className="block font-semibold text-status-emerald-text">Dự kiến 14:00 - 17:00</span>
                          <span>14/10/2026</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-space-xl lg:col-span-4">
                  <div className="rounded-xl bg-surface-card p-space-lg shadow-sm">
                    <div className="flex items-center justify-between pb-space-sm">
                      <h3 className="flex items-center gap-2 font-headline-sm text-headline-sm font-bold text-text-primary">
                        <span className="material-symbols-outlined text-[20px] text-primary">pin_drop</span>
                        <span>Thông tin người nhận</span>
                      </h3>
                      <span className="rounded bg-surface-subtle px-2 py-0.5 text-label-sm font-label-sm font-medium text-text-secondary">Nhà riêng</span>
                    </div>

                    <div className="space-y-2 pt-space-xs text-body-sm font-body-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-body-md text-body-md font-semibold text-text-primary">Nguyễn Hoàng Anh</span>
                        <span className="text-text-muted">•</span>
                        <span className="font-medium text-text-secondary">0918 421 989</span>
                      </div>

                      <div className="flex items-start gap-2 leading-relaxed text-text-secondary">
                        <span className="material-symbols-outlined mt-0.5 shrink-0 text-[18px] text-text-muted">home_pin</span>
                        <span>Căn hộ 1406, Tháp Sapphire, 128 Nguyễn Trãi, Phường Thượng Đình, Quận Thanh Xuân, Hà Nội</span>
                      </div>

                      <div className="mt-2 flex items-start gap-2 rounded-lg bg-surface-subtle p-3 text-text-secondary">
                        <span className="material-symbols-outlined mt-0.5 shrink-0 text-[18px] text-secondary">info</span>
                        <span>Ghi chú bưu tá: "Sách có giá trị sưu tầm, vui lòng giao giờ hành chính, bọc kỹ khi trời mưa".</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl bg-surface-card p-space-lg shadow-sm">
                    <h3 className="flex items-center gap-2 pb-space-sm font-headline-sm text-headline-sm font-bold text-text-primary">
                      <span className="material-symbols-outlined text-[20px] text-primary">receipt_long</span>
                      <span>Tổng thanh toán</span>
                    </h3>

                    <div className="space-y-2.5 pt-space-xs text-body-sm font-body-sm text-text-secondary">
                      <div className="flex items-center justify-between">
                        <span>Tiền sách (2 ấn phẩm)</span>
                        <span className="font-semibold text-text-primary">513.000 đ</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Phí đóng gói chuyên biệt (Màng xốp &amp; Seal)</span>
                        <span className="font-medium text-status-emerald-text">Miễn phí (Tài trợ)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Cước vận chuyển tiêu chuẩn</span>
                        <span className="text-text-primary">30.000 đ</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Ưu đãi bạn đọc thân thiết (Voucher BOOKWORM)</span>
                        <span className="font-medium text-status-rose-text">-30.000 đ</span>
                      </div>

                      <div className="mt-space-sm rounded-lg bg-surface-canvas p-3 pt-space-sm">
                        <div className="flex items-baseline justify-between">
                          <span className="font-headline-sm text-headline-sm font-bold text-text-primary">Tổng thanh toán:</span>
                          <span className="font-price-lg text-price-lg font-bold text-primary">513.000 đ</span>
                        </div>
                        <div className="mt-1 flex items-center justify-between text-body-sm font-body-sm">
                          <span className="text-text-muted">Hình thức:</span>
                          <span className="flex items-center gap-1 font-medium text-status-sky-text">
                            <span className="material-symbols-outlined text-[16px]">qr_code_2</span>
                            <span>VietQR Napas 247</span>
                          </span>
                        </div>
                        <div className="mt-0.5 flex items-center justify-between text-body-sm font-body-sm">
                          <span className="text-text-muted">Mã tham chiếu ngân hàng:</span>
                          <span className="font-mono text-text-primary">FT261012984102</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl bg-surface-card p-space-lg shadow-sm">
                    <h3 className="mb-1 font-label-md text-label-md font-semibold uppercase tracking-wider text-text-muted">Tiện ích hỗ trợ đơn hàng</h3>

                    <button type="button" className="group mt-2 flex w-full min-h-[44px] items-center justify-between rounded-lg bg-surface-subtle px-4 py-2.5 text-label-md font-label-md font-semibold text-text-primary shadow-sm transition-all hover:bg-surface-container">
                      <span className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[20px] text-text-secondary transition-colors group-hover:text-primary">receipt</span>
                        <span>In hóa đơn điện tử / Biên lai</span>
                      </span>
                      <span className="material-symbols-outlined text-[18px] text-text-muted">download</span>
                    </button>

                    <button type="button" className="group mt-3 flex w-full min-h-[44px] items-center justify-between rounded-lg bg-surface-subtle px-4 py-2.5 text-label-md font-label-md font-semibold text-text-primary shadow-sm transition-all hover:bg-surface-container">
                      <span className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[20px] text-secondary">edit_location_alt</span>
                        <span>Yêu cầu thay đổi địa chỉ</span>
                      </span>
                      <span className="rounded bg-status-emerald-bg px-2 py-0.5 text-label-sm font-label-sm font-medium text-status-emerald-text">Khả dụng</span>
                    </button>

                    <a href="tel:19006868" className="group mt-3 flex w-full min-h-[44px] items-center justify-between rounded-lg bg-primary px-4 py-2.5 text-label-md font-label-md font-semibold text-on-primary shadow-sm transition-all hover:bg-primary-container">
                      <span className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[20px]">support_agent</span>
                        <span>Liên hệ CSKH DalifaBooks</span>
                      </span>
                      <span className="text-body-sm font-body-sm text-on-primary/80 group-hover:text-on-primary">1900 6868</span>
                    </a>

                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <a href="#" className="flex items-center justify-center gap-1.5 rounded-lg bg-surface-subtle p-2.5 text-label-sm font-label-sm font-medium text-text-primary transition-colors hover:bg-surface-container">
                        <span className="material-symbols-outlined text-[18px] text-[#0068FF]">chat</span>
                        <span>Chat Zalo OA</span>
                      </a>
                      <a href="#" className="flex items-center justify-center gap-1.5 rounded-lg bg-surface-subtle p-2.5 text-label-sm font-label-sm font-medium text-text-primary transition-colors hover:bg-surface-container">
                        <span className="material-symbols-outlined text-[18px] text-secondary">mail</span>
                        <span>Gửi phiếu hỗ trợ</span>
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-xl bg-surface-container-low p-space-md">
                    <span className="material-symbols-outlined shrink-0 text-[24px] text-primary">verified_user</span>
                    <div className="text-body-sm font-body-sm text-text-secondary">
                      <strong className="block font-medium text-text-primary">Đảm bảo từ DalifaBooks:</strong>
                      100% sách có nguồn gốc minh bạch, đổi mới 1-1 miễn phí trong 15 ngày nếu phát hiện lỗi đóng gáy hay hư hỏng do vận chuyển.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="fixed inset-0 z-50 hidden items-center justify-center bg-primary/40 p-4 backdrop-blur-sm" id="address-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div className="w-full max-w-lg rounded-xl bg-surface-card p-space-xl shadow-xl">
            <div className="flex items-center justify-between pb-space-md">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary-container/20 text-secondary">
                  <span className="material-symbols-outlined text-[20px]">home_pin</span>
                </div>
                <h3 id="modal-title" className="font-headline-sm text-headline-sm font-bold text-text-primary">Cập nhật địa chỉ nhận sách</h3>
              </div>
              <button type="button" className="flex h-8 w-8 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-surface-subtle hover:text-text-primary">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <p className="mb-space-md text-body-sm font-body-sm leading-relaxed text-text-secondary">
              Đơn hàng <strong>#DLF-894210</strong> đang ở giai đoạn đóng gói nên bạn có thể điều chỉnh địa chỉ nhận miễn phí trước khi bàn giao cho bưu tá Viettel Post.
            </p>

            <div className="space-y-space-md">
              <div>
                <label className="mb-1 block text-label-md font-label-md font-semibold text-text-primary">Họ tên người nhận mới</label>
                <input type="text" defaultValue="Nguyễn Hoàng Anh" className="w-full rounded-lg bg-surface-subtle px-3.5 py-2.5 text-body-md font-body-md text-text-primary focus:bg-surface-card focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="mb-1 block text-label-md font-label-md font-semibold text-text-primary">Số điện thoại liên hệ</label>
                <input type="text" defaultValue="0918 421 989" className="w-full rounded-lg bg-surface-subtle px-3.5 py-2.5 text-body-md font-body-md text-text-primary focus:bg-surface-card focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="mb-1 block text-label-md font-label-md font-semibold text-text-primary">Địa chỉ chi tiết mới</label>
                <textarea rows={3} defaultValue="Căn hộ 1406, Tháp Sapphire, 128 Nguyễn Trãi, Phường Thượng Đình, Quận Thanh Xuân, Hà Nội" className="w-full rounded-lg bg-surface-subtle px-3.5 py-2.5 text-body-md font-body-md text-text-primary focus:bg-surface-card focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
            </div>

            <div className="mt-space-lg flex items-center justify-end gap-space-sm pt-space-sm">
              <button type="button" className="rounded-lg px-4 py-2.5 text-label-md font-label-md text-text-secondary transition-colors hover:bg-surface-subtle">
                Hủy bỏ
              </button>
              <button type="button" className="rounded-lg bg-primary px-5 py-2.5 text-label-md font-label-md font-semibold text-on-primary shadow-sm transition-all hover:bg-primary-container">
                Lưu địa chỉ mới
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
