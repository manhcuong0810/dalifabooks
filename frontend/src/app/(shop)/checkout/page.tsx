import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const orderItems = [
  {
    name: "Truyện Kiều (Ấn bản kỷ niệm bìa vải thủ công)",
    author: "Nguyễn Du • Khảo đính",
    quantity: 1,
    price: 245000,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCPfFA7knpxlPN0b2Of1mETW1qBm90GI9yW-CpoHSsHrAdk0d8X3OOhHlJEsTeYtvX8PiQukrsOgyQ4BfhDsIdl9S9ER4d2Gr0WGUannbvquuJ_dyMerzYe4E8HGWd_ZMBr4bw93ttw_qOutqU75xq8x0PjW_XGThIqkVrkdG4wr0ZsHbm8JsRYWsFlDWg0rBMZLk_J8ib55mp2MnO_sjfsG-iesUrft0Ec_dXfxj4HBypxrcSZFI66",
  },
  {
    name: "Triết Học Hiện Sinh & Trải Nghiệm Con Người",
    author: "GS. Trần Thái Đỉnh",
    quantity: 1,
    price: 148000,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD5CyTCUmAfZ-BKSOhABCcSDl2xtwA2pgrG3xoe3aEMqRfATXJ3VWCc94jxSfFp7hwCsxOqQxLWPiVEjH8EbvuliZAyCiJJUjV8TGJVU4uXH7-RCZXLhUwwcAgTWNmobjg71mJzJk5FmTDqvFNma2ptFcETA2QZy0_0sosMb6aW9xrOo_cX3lDnhYE5co8VGOdkayzIL5xvW7tE-gOzFjY4ESfgxPIVdO0Xl8CCWY-X6ew1SxKgBVlR",
  },
  {
    name: "Lược Sử Văn Hóa Đông Á (Song bản đặc biệt)",
    author: "Biên khảo Viện Nghiên Cứu",
    quantity: 2,
    price: 140000,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDHPBWPs4nB_ebYQoHBg-cNL2YqPLLgGZuS78bVYZlyCe9o1fv_nwgEgQpkMKBcp8iMUPn60oh53TTHph_rEDjk4IqWlWWGHkQ_ve_KVcHpn_ImSIU50KgiYfbtJ2V1f4aPWQkWMYk5Tx3wiFhp1pxzRfn_P0R5sfxJBAA_1Wutwt28lg52Xu7LiNM9hyK9i15Nlwb7BHqgBtIJLasgnkuNrJFgEWLOffFNbmjl0sMeXu0fET8XbNu0",
  },
];

const formatCurrency = (value: number) => `${value.toLocaleString("vi-VN")} đ`;

export default function CheckoutPage() {
  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = 20000;
  const shipping = 0;
  const total = subtotal - discount + shipping;

  return (
    <div className="min-h-screen bg-surface text-on-surface antialiased">
      <Header active="books" />

      <main className="w-full min-h-[calc(100vh-160px)] bg-surface pt-[160px]">
        <div className="flex w-full flex-col">
          <div className="w-full bg-surface-canvas py-space-xl">
            <div className="mx-auto max-w-[1200px] px-margin md:px-margin-desktop">
              <div className="mb-space-lg flex flex-wrap items-center justify-between gap-4">
                <nav aria-label="Đường dẫn trang" className="flex items-center gap-2 text-body-sm font-body-sm text-text-muted">
                  <a href="/" className="flex items-center gap-1 text-text-secondary transition-colors hover:text-primary">
                    <span className="material-symbols-outlined text-[16px]">home</span>
                    <span>Trang chủ</span>
                  </a>
                  <span className="text-[12px] text-text-muted">•</span>
                  <a href="/cart" className="text-text-secondary transition-colors hover:text-primary">
                    Giỏ hàng
                  </a>
                  <span className="text-[12px] text-text-muted">•</span>
                  <span className="font-medium text-text-primary">Đặt hàng &amp; Thanh toán</span>
                </nav>

                <div className="inline-flex items-center gap-2 rounded-full bg-status-emerald-bg px-3 py-1.5 text-label-sm font-label-sm text-status-emerald-text shadow-sm">
                  <span className="material-symbols-outlined text-[16px]">encrypted</span>
                  <span>Thanh toán mã hóa 256-bit SSL tiêu chuẩn ngân hàng</span>
                </div>
              </div>

              <section aria-label="Tiến trình đặt hàng" className="mb-space-xl rounded-xl bg-surface-card p-space-lg shadow-sm">
                <div className="grid grid-cols-1 gap-space-md md:grid-cols-3">
                  <div className="relative flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-status-emerald-bg font-bold text-status-emerald-text shadow-sm">
                      <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        check_circle
                      </span>
                    </div>
                    <div className="min-w-0">
                      <span className="block text-label-sm font-label-sm uppercase tracking-wider text-status-emerald-text">Bước 1</span>
                      <span className="block truncate text-headline-sm font-headline-sm text-text-primary">Giỏ sách</span>
                    </div>
                  </div>

                  <div className="relative flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-container font-bold text-on-primary shadow-md">
                      <span className="material-symbols-outlined text-[20px]">local_shipping</span>
                    </div>
                    <div className="min-w-0">
                      <span className="block text-label-sm font-label-sm uppercase tracking-wider font-semibold text-secondary">Bước 2 (Hiện tại)</span>
                      <span className="block truncate text-headline-sm font-headline-sm font-bold text-primary">Giao nhận &amp; Thanh toán</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 opacity-60">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-subtle font-bold text-text-muted">
                      <span className="material-symbols-outlined text-[20px]">check</span>
                    </div>
                    <div className="min-w-0">
                      <span className="block text-label-sm font-label-sm uppercase tracking-wider text-text-muted">Bước 3</span>
                      <span className="block truncate text-headline-sm font-headline-sm text-text-muted">Hoàn tất đơn</span>
                    </div>
                  </div>
                </div>
              </section>

              <div className="grid grid-cols-1 items-start gap-space-xl lg:grid-cols-12">
                <div className="flex flex-col gap-space-lg lg:col-span-7">
                  <section className="rounded-xl bg-surface-card p-space-xl shadow-sm">
                    <div className="mb-space-md flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-container text-primary">
                          <span className="material-symbols-outlined text-[20px]">person</span>
                        </span>
                        <h2 className="text-headline-sm font-headline-sm font-bold text-text-primary">1. Thông tin người nhận &amp; Liên hệ</h2>
                      </div>
                      <span className="hidden text-label-sm font-label-sm text-text-muted sm:inline-block">Dữ liệu bảo mật</span>
                    </div>

                    <div className="mb-space-lg grid grid-cols-2 rounded-lg bg-surface-subtle p-1">
                      <button type="button" className="rounded-md bg-surface-card px-4 py-2.5 text-center text-label-md font-label-md font-semibold text-primary shadow-sm transition-all">
                        Mua ngay (Khách vãng lai)
                      </button>
                      <button type="button" className="rounded-md px-4 py-2.5 text-center text-label-md font-label-md font-medium text-text-secondary transition-all hover:text-primary">
                        Đăng nhập nhận ưu đãi
                      </button>
                    </div>

                    <div className="space-y-space-md">
                      <div>
                        <label htmlFor="fullName" className="mb-1.5 block text-label-md font-label-md font-medium text-text-primary">
                          Họ và tên người nhận <span className="text-error">*</span>
                        </label>
                        <div className="relative">
                          <input
                            id="fullName"
                            type="text"
                            defaultValue="Trần Hoàng Quân"
                            required
                            className="w-full rounded-lg bg-surface-card px-3.5 py-2.5 text-body-md font-body-md text-text-primary shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
                          />
                          <span className="material-symbols-outlined absolute right-3.5 top-3 text-[18px] text-text-muted">badge</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-space-md sm:grid-cols-2">
                        <div>
                          <label htmlFor="phone" className="mb-1.5 block text-label-md font-label-md font-medium text-text-primary">
                            Số điện thoại liên hệ <span className="text-error">*</span>
                          </label>
                          <div className="relative">
                            <input
                              id="phone"
                              type="tel"
                              defaultValue="0918 345 678"
                              required
                              className="w-full rounded-lg bg-surface-card px-3.5 py-2.5 text-body-md font-body-md text-text-primary shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
                            />
                            <span className="material-symbols-outlined absolute right-3.5 top-3 text-[18px] text-text-muted">call</span>
                          </div>
                          <span className="mt-1 block text-label-sm font-label-sm text-text-muted">Nhân viên bưu tá sẽ gọi trước khi phát hàng</span>
                        </div>

                        <div>
                          <label htmlFor="email" className="mb-1.5 block text-label-md font-label-md font-medium text-text-primary">
                            Email nhận đơn &amp; hóa đơn VAT
                          </label>
                          <div className="relative">
                            <input
                              id="email"
                              type="email"
                              defaultValue="hoangquan.tran@gmail.com"
                              className="w-full rounded-lg bg-surface-card px-3.5 py-2.5 text-body-md font-body-md text-text-primary shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
                            />
                            <span className="material-symbols-outlined absolute right-3.5 top-3 text-[18px] text-text-muted">mail</span>
                          </div>
                          <span className="mt-1 block text-label-sm font-label-sm text-text-muted">Gửi biên nhận điện tử và mã vận đơn theo dõi</span>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section className="rounded-xl bg-surface-card p-space-xl shadow-sm">
                    <div className="mb-space-md flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-container text-primary">
                        <span className="material-symbols-outlined text-[20px]">pin_drop</span>
                      </span>
                      <h2 className="text-headline-sm font-headline-sm font-bold text-text-primary">2. Địa chỉ giao nhận sách</h2>
                    </div>

                    <div className="space-y-space-md">
                      <div className="grid grid-cols-1 gap-space-md sm:grid-cols-3">
                        <div>
                          <label htmlFor="city" className="mb-1.5 block text-label-md font-label-md font-medium text-text-primary">
                            Tỉnh / Thành phố <span className="text-error">*</span>
                          </label>
                          <select id="city" className="w-full cursor-pointer rounded-lg bg-surface-card px-3.5 py-2.5 text-body-md font-body-md text-text-primary shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-container">
                            <option defaultValue="hanoi">Hà Nội</option>
                            <option value="hcm">TP. Hồ Chí Minh</option>
                            <option value="danang">Đà Nẵng</option>
                            <option value="haiphong">Hải Phòng</option>
                            <option value="cantho">Cần Thơ</option>
                            <option value="hue">Thừa Thiên Huế</option>
                          </select>
                        </div>

                        <div>
                          <label htmlFor="district" className="mb-1.5 block text-label-md font-label-md font-medium text-text-primary">
                            Quận / Huyện <span className="text-error">*</span>
                          </label>
                          <select id="district" className="w-full cursor-pointer rounded-lg bg-surface-card px-3.5 py-2.5 text-body-md font-body-md text-text-primary shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-container">
                            <option defaultValue="hoankiem">Quận Hoàn Kiếm</option>
                            <option value="badinh">Quận Ba Đình</option>
                            <option value="dongda">Quận Đống Đa</option>
                            <option value="caugiay">Quận Cầu Giấy</option>
                            <option value="haibatrung">Quận Hai Bà Trưng</option>
                          </select>
                        </div>

                        <div>
                          <label htmlFor="ward" className="mb-1.5 block text-label-md font-label-md font-medium text-text-primary">
                            Phường / Xã <span className="text-error">*</span>
                          </label>
                          <select id="ward" className="w-full cursor-pointer rounded-lg bg-surface-card px-3.5 py-2.5 text-body-md font-body-md text-text-primary shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-container">
                            <option defaultValue="trangtien">Phường Tràng Tiền</option>
                            <option value="hangbai">Phường Hàng Bài</option>
                            <option value="lythaiton">Phường Lý Thái Tổ</option>
                            <option value="phan-chu-trinh">Phường Phan Chu Trinh</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="addressDetail" className="mb-1.5 block text-label-md font-label-md font-medium text-text-primary">
                          Địa chỉ chi tiết (Số nhà, ngõ/ngách, tên đường, tòa nhà) <span className="text-error">*</span>
                        </label>
                        <div className="relative">
                          <input
                            id="addressDetail"
                            type="text"
                            defaultValue="Số 18 Phố Tràng Tiền, Căn hộ 402, Tòa nhà Văn Nghệ"
                            required
                            className="w-full rounded-lg bg-surface-card px-3.5 py-2.5 text-body-md font-body-md text-text-primary shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
                          />
                          <span className="material-symbols-outlined absolute right-3.5 top-3 text-[18px] text-text-muted">apartment</span>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="orderNotes" className="mb-1.5 block text-label-md font-label-md font-medium text-text-primary">
                          Ghi chú cho đội ngũ giao nhận &amp; đóng gói
                        </label>
                        <textarea
                          id="orderNotes"
                          rows={2}
                          defaultValue={"Sách bọc bìa sưu tầm xin bọc thêm 2 lớp màng xốp chống va đập góc sách. Giao giờ hành chính."}
                          className="w-full resize-none rounded-lg bg-surface-card px-3.5 py-2.5 text-body-md font-body-md text-text-primary shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
                        />
                      </div>
                    </div>
                  </section>

                  <section className="rounded-xl bg-surface-card p-space-xl shadow-sm">
                    <div className="mb-space-md flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-container text-primary">
                        <span className="material-symbols-outlined text-[20px]">local_shipping</span>
                      </span>
                      <h2 className="text-headline-sm font-headline-sm font-bold text-text-primary">3. Phương thức vận chuyển</h2>
                    </div>

                    <div className="grid grid-cols-1 gap-space-md sm:grid-cols-2">
                      <label className="relative flex cursor-pointer flex-col rounded-xl bg-surface-subtle p-space-md shadow-sm">
                        <div className="mb-2 flex items-start justify-between">
                          <div className="flex items-center gap-2.5">
                            <input type="radio" name="shippingMethod" defaultChecked className="h-4 w-4 text-primary focus:ring-primary" value="standard" />
                            <span className="text-headline-sm font-headline-sm font-semibold text-text-primary">Giao hàng tiêu chuẩn</span>
                          </div>
                          <span className="rounded bg-status-emerald-bg px-2 py-0.5 text-label-sm font-label-sm font-bold text-status-emerald-text">Miễn phí</span>
                        </div>
                        <p className="pl-6 text-body-sm font-body-sm leading-relaxed text-text-secondary">
                          Dự kiến nhận sách sau 2 - 3 ngày làm việc. Đóng gói hộp carton 3 lớp bảo hộ góc sách an toàn.
                        </p>
                        <div className="mt-3 flex items-center gap-1.5 pl-6 text-label-sm font-label-sm text-text-muted">
                          <span className="material-symbols-outlined text-[16px]">schedule</span>
                          <span>Nhận hàng: Thứ Năm - Thứ Sáu tuần này</span>
                        </div>
                      </label>

                      <label className="relative flex cursor-pointer flex-col rounded-xl bg-surface-card p-space-md shadow-sm transition-all hover:bg-surface-subtle">
                        <div className="mb-2 flex items-start justify-between">
                          <div className="flex items-center gap-2.5">
                            <input type="radio" name="shippingMethod" className="h-4 w-4 text-primary focus:ring-primary" value="express" />
                            <span className="text-headline-sm font-headline-sm font-semibold text-text-primary">Hỏa tốc nội thành</span>
                          </div>
                          <span className="text-price-md font-price-md font-bold text-primary">+ 35.000 đ</span>
                        </div>
                        <p className="pl-6 text-body-sm font-body-sm leading-relaxed text-text-secondary">
                          Giao trong ngày cho đơn nội thành Hà Nội &amp; TP.HCM (Áp dụng đơn trước 15h30).
                        </p>
                        <div className="mt-3 flex items-center gap-1.5 pl-6 text-label-sm font-label-sm font-medium text-secondary">
                          <span className="material-symbols-outlined text-[16px]">bolt</span>
                          <span>Ưu tiên xuất kho trong 2 giờ</span>
                        </div>
                      </label>
                    </div>
                  </section>

                  <section className="rounded-xl bg-surface-card p-space-xl shadow-sm">
                    <div className="mb-space-md flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-container text-primary">
                          <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
                        </span>
                        <h2 className="text-headline-sm font-headline-sm font-bold text-text-primary">4. Phương thức thanh toán</h2>
                      </div>
                      <span className="inline-flex items-center gap-1 text-label-sm font-label-sm text-status-emerald-text">
                        <span className="material-symbols-outlined text-[15px]">verified_user</span>
                        <span>An toàn tuyệt đối</span>
                      </span>
                    </div>

                    <div className="space-y-space-md">
                      <label className="block cursor-pointer rounded-xl bg-surface-subtle p-space-md shadow-sm">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <input type="radio" name="paymentMethod" defaultChecked className="mt-1 h-4 w-4 text-primary focus:ring-primary" value="vietqr" />
                            <div>
                              <div className="mb-1 flex flex-wrap items-center gap-2">
                                <span className="text-headline-sm font-headline-sm font-bold text-text-primary">Chuyển khoản VietQR 24/7 qua Napas</span>
                                <span className="rounded-full bg-status-amber-bg px-2 py-0.5 text-label-sm font-label-sm font-semibold text-status-amber-text">Khuyên dùng</span>
                                <span className="rounded-full bg-status-emerald-bg px-2 py-0.5 text-label-sm font-label-sm font-semibold text-status-emerald-text">Ưu tiên xuất kho</span>
                              </div>
                              <p className="text-body-sm font-body-sm text-text-secondary">
                                Quét mã QR bằng mọi app ngân hàng (Vietcombank, MBBank, Techcombank, BIDV...) hoặc ví điện tử. Tự động xác thực giao dịch sau 3 giây.
                              </p>
                            </div>
                          </div>
                          <span className="material-symbols-outlined shrink-0 text-[24px] text-primary">qr_code_scanner</span>
                        </div>

                        <div className="mt-space-md flex flex-col items-center gap-space-md rounded-lg bg-surface-card p-space-md shadow-sm sm:flex-row">
                          <div className="flex h-28 w-28 shrink-0 flex-col items-center justify-center rounded-lg bg-surface-subtle p-2">
                            <span className="material-symbols-outlined text-[48px] text-primary">qr_code_2</span>
                            <span className="mt-0.5 text-label-sm font-label-sm text-text-muted">Mã tạo tức thì</span>
                          </div>
                          <div className="flex-1 space-y-1.5 text-center sm:text-left">
                            <div className="text-label-md font-label-md font-semibold text-text-primary">
                              Đơn vị thụ hưởng: CÔNG TY CỔ PHẦN VĂN HÓA DALIFA
                            </div>
                            <div className="text-body-sm font-body-sm text-text-secondary">
                              Ngân hàng: TMCP Ngoại thương Việt Nam (Vietcombank) • CN Thăng Long
                            </div>
                            <div className="text-body-sm font-body-sm text-text-muted">
                              Hệ thống tự động điền số tài khoản, số tiền và nội dung đơn hàng ngay sau khi ấn "Xác nhận đặt hàng".
                            </div>
                          </div>
                        </div>
                      </label>

                      <label className="block cursor-pointer rounded-xl bg-surface-card p-space-md shadow-sm transition-all hover:bg-surface-subtle">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <input type="radio" name="paymentMethod" className="mt-1 h-4 w-4 text-primary focus:ring-primary" value="cod" />
                            <div>
                              <div className="mb-1 flex items-center gap-2">
                                <span className="text-headline-sm font-headline-sm font-bold text-text-primary">Thanh toán khi nhận hàng (COD)</span>
                              </div>
                              <p className="text-body-sm font-body-sm text-text-secondary">
                                Kiểm tra sách nguyên vẹn tem niêm phong và thanh toán tiền mặt cho nhân viên giao hàng khi nhận kiện.
                              </p>
                            </div>
                          </div>
                          <span className="material-symbols-outlined shrink-0 text-[24px] text-secondary">payments</span>
                        </div>
                      </label>
                    </div>
                  </section>

                  <div className="rounded-xl bg-surface-card p-space-md shadow-sm">
                    <label className="flex cursor-pointer items-start gap-3">
                      <input type="checkbox" defaultChecked className="mt-1 h-4 w-4 rounded text-primary focus:ring-primary" />
                      <span className="text-body-sm font-body-sm leading-relaxed text-text-secondary">
                        Tôi đã đọc và hoàn toàn đồng ý với
                        <a href="#" className="font-semibold text-primary hover:underline"> Điều khoản dịch vụ</a>,
                        <a href="#" className="font-semibold text-primary hover:underline"> Chính sách bảo mật</a> và
                        <a href="#" className="font-semibold text-primary hover:underline"> Quy định đổi trả trong 7 ngày</a> của Nhà sách DalifaBooks.
                      </span>
                    </label>
                  </div>
                </div>

                <aside className="flex flex-col gap-space-lg lg:sticky lg:top-44 lg:col-span-5">
                  <div className="rounded-xl bg-surface-card p-space-xl shadow-md">
                    <div className="-mx-space-xl -mt-space-xl mb-space-md flex items-center justify-between rounded-t-xl bg-surface-subtle px-space-xl pb-space-md pt-space-md">
                      <div>
                        <span className="block text-label-sm font-label-sm font-semibold uppercase tracking-wider text-secondary">Kiểm tra kiện hàng</span>
                        <h3 className="text-headline-sm font-headline-sm font-bold text-primary">Kiện hàng của bạn (3 đầu sách - 4 ấn bản)</h3>
                      </div>
                      <a href="/cart" className="flex items-center gap-1 text-label-md font-label-md font-medium text-primary transition-colors hover:underline">
                        <span>Sửa giỏ</span>
                        <span className="material-symbols-outlined text-[16px]">edit</span>
                      </a>
                    </div>

                    <div className="mb-space-lg space-y-space-md">
                      {orderItems.map((item) => (
                        <div key={item.name} className="flex items-start gap-3 rounded-lg bg-surface-canvas p-2.5">
                          <div className="flex aspect-[2/3] h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded bg-surface-subtle shadow-sm">
                            <img src={item.image} alt={item.name} className="h-full w-full object-contain" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="line-clamp-2 text-[15px] font-semibold leading-tight text-text-primary">{item.name}</h4>
                            <div className="mt-0.5 text-body-sm font-body-sm text-text-muted">Tác giả: {item.author}</div>
                            <div className="mt-2 flex items-center justify-between">
                              <span className="rounded bg-surface-container px-2 py-0.5 text-label-sm font-label-sm font-medium text-primary">SL: {item.quantity}</span>
                              <span className="text-price-md font-price-md font-bold text-text-primary">{formatCurrency(item.price)}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mb-space-lg">
                      <label className="mb-1.5 block text-label-sm font-label-sm font-semibold uppercase tracking-wider text-text-secondary">
                        Mã giảm giá / Thẻ quà tặng bạn đọc
                      </label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <input
                            type="text"
                            defaultValue="DALIFA2026"
                            className="w-full rounded-lg bg-surface-card py-2 pl-9 pr-3 text-body-md font-body-md font-semibold uppercase tracking-wider text-text-primary shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
                          />
                          <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-[18px] text-secondary">sell</span>
                        </div>
                        <button type="button" className="rounded-lg bg-surface-subtle px-4 py-2 text-label-md font-label-md font-semibold text-primary transition-colors hover:bg-surface-container">
                          Áp dụng
                        </button>
                      </div>
                      <div className="mt-2 flex items-center gap-1.5 text-label-sm font-label-sm text-status-emerald-text">
                        <span className="material-symbols-outlined text-[15px]">check_circle</span>
                        <span>Đã áp dụng mã DALIFA2026: Giảm 20.000 đ cho ấn phẩm văn hóa</span>
                      </div>
                    </div>

                    <div className="mb-space-md space-y-2.5 rounded-lg bg-surface-subtle p-space-md">
                      <div className="flex items-center justify-between text-body-md font-body-md text-text-secondary">
                        <span>Tạm tính giá trị sách:</span>
                        <span className="text-price-md font-price-md font-bold text-text-primary">{formatCurrency(subtotal)}</span>
                      </div>
                      <div className="flex items-center justify-between text-body-md font-body-md text-text-secondary">
                        <span className="flex items-center gap-1">
                          <span>Phí vận chuyển bưu tá:</span>
                          <span className="material-symbols-outlined text-[15px] text-text-muted" title="Giao hàng tiêu chuẩn toàn quốc">info</span>
                        </span>
                        <span className="text-label-md font-label-md font-semibold text-status-emerald-text">0 đ (Freeship)</span>
                      </div>
                      <div className="flex items-center justify-between text-body-md font-body-md text-text-secondary">
                        <span>Ưu đãi mã DALIFA2026:</span>
                        <span className="text-price-md font-price-md font-bold text-secondary">- {formatCurrency(discount)}</span>
                      </div>
                      <div className="mt-1 flex items-baseline justify-between pt-2">
                        <div>
                          <span className="block text-headline-sm font-headline-sm font-bold text-text-primary">Tổng thanh toán:</span>
                          <span className="block text-label-sm font-label-sm text-text-muted">Đã bao gồm thuế GTGT (VAT)</span>
                        </div>
                        <span className="text-headline-lg font-headline-lg font-bold text-primary">{formatCurrency(total)}</span>
                      </div>
                    </div>

                    <button type="button" className="group flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-headline-sm font-headline-sm font-bold text-on-primary shadow-md transition-all hover:bg-primary-container">
                      <span>Xác nhận đặt hàng</span>
                      <span className="font-medium opacity-90">({formatCurrency(total)})</span>
                      <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">arrow_forward</span>
                    </button>

                    <div className="mt-space-md space-y-2.5 pt-space-md">
                      <div className="flex items-center gap-2 text-body-sm font-body-sm text-text-secondary">
                        <span className="material-symbols-outlined shrink-0 text-[18px] text-secondary">inventory_2</span>
                        <span>Đóng gói 3 lớp bảo hộ carton, chống móp méo góc sách</span>
                      </div>
                      <div className="flex items-center gap-2 text-body-sm font-body-sm text-text-secondary">
                        <span className="material-symbols-outlined shrink-0 text-[18px] text-secondary">published_with_changes</span>
                        <span>Đổi trả sách miễn phí trong 07 ngày nếu có lỗi in ấn</span>
                      </div>
                      <div className="flex items-center gap-2 text-body-sm font-body-sm text-text-secondary">
                        <span className="material-symbols-outlined shrink-0 text-[18px] text-secondary">verified</span>
                        <span>100% sách chính ngạch, có tem xuất bản hợp pháp</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl bg-surface-card p-space-md shadow-sm">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-container text-primary">
                        <span className="material-symbols-outlined text-[22px]">support_agent</span>
                      </div>
                      <div className="space-y-1">
                        <div className="text-[16px] font-bold leading-tight text-text-primary">Cần trợ giúp trong quá trình đặt hàng?</div>
                        <p className="text-body-sm font-body-sm text-text-secondary">
                          Bộ phận CSKH DalifaBooks trực tuyến từ 8:00 đến 21:30 hàng ngày để giải đáp mọi thắc mắc của bạn đọc.
                        </p>
                        <div className="flex flex-wrap items-center gap-4 pt-1">
                          <a href="tel:19006868" className="flex items-center gap-1 text-headline-sm font-headline-sm font-bold text-secondary hover:underline">
                            <span className="material-symbols-outlined text-[18px]">call</span>
                            <span>1900 6868</span>
                          </a>
                          <span className="text-text-muted">•</span>
                          <a href="mailto:hotro@dalifabooks.vn" className="text-body-sm font-body-sm font-medium text-primary hover:underline">
                            hotro@dalifabooks.vn
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
