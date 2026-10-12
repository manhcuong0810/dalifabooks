"use client";

import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const quickStats = [
  {
    title: "Tổng đài bạn đọc",
    value: "1900 6868",
    meta: "08h00 - 21h00 mỗi ngày",
    icon: "headset_mic",
    accent: "bg-surface-container-low text-primary-container",
  },
  {
    title: "Hộp thư hỗ trợ",
    value: "contact@dalifabooks.vn",
    meta: "Phản hồi trong 24 giờ",
    icon: "mark_email_read",
    accent: "bg-surface-container-low text-primary-container",
  },
  {
    title: "Bản quyền & Tác giả",
    value: "bbt@dalifabooks.vn",
    meta: "Tiếp nhận đề cương",
    icon: "menu_book",
    accent: "bg-surface-container-low text-primary-container",
  },
  {
    title: "Tra cứu vận chuyển",
    value: "Kiểm tra kiện hàng",
    meta: "Cập nhật theo mã vận đơn",
    icon: "local_shipping",
    accent: "bg-surface-container-low text-secondary",
  },
];

const branches = [
  {
    label: "Trụ sở chính & Ban Biên tập (Hà Nội)",
    text: "Tầng 6, Toà nhà Văn hoá Tri thức, Phố Đinh Lễ, Phường Tràng Tiền, Quận Hoàn Kiếm, Hà Nội",
    hours: "08:00 - 21:00 (Thứ 2 - Chủ nhật)",
    icon: "location_on",
    tone: "text-secondary",
  },
  {
    label: "Chi nhánh & Không gian trải nghiệm (TP.HCM)",
    text: "142 Nguyễn Thị Minh Khai, Phường Võ Thị Sáu, Quận 3, TP. Hồ Chí Minh",
    hours: "08:30 - 21:30 (Thứ 2 - Chủ nhật)",
    icon: "store",
    tone: "text-secondary",
  },
];

const contactCards = [
  {
    label: "Hotline tư vấn",
    value: "1900 6868",
    href: "tel:19006868",
    icon: "call",
    tone: "bg-primary-container text-on-primary",
  },
  {
    label: "CSKH Đơn hàng",
    value: "cskh@dalifabooks.vn",
    href: "mailto:cskh@dalifabooks.vn",
    icon: "support_agent",
    tone: "bg-secondary text-on-secondary",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-surface text-on-surface antialiased">
      <Header active="contact" />

      <main className="w-full min-h-[calc(100vh-160px)] bg-surface pt-[160px]">
        <section className="relative overflow-hidden bg-primary py-space-2xl text-on-primary md:py-16">
          <div className="pointer-events-none absolute inset-0 opacity-10">
            <svg viewBox="0 0 1200 400" preserveAspectRatio="none" className="h-full w-full object-cover" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,200 C300,120 500,260 800,180 C1000,120 1100,240 1200,200 L1200,400 L0,400 Z" fill="currentColor" />
              <circle cx="150" cy="90" r="140" fill="currentColor" opacity="0.3" />
              <circle cx="950" cy="280" r="210" fill="currentColor" opacity="0.2" />
              <path d="M40,40 Q90,120 180,80 T300,140" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
              <path d="M720,60 Q820,160 920,80 T1120,120" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
            </svg>
          </div>

          <div className="relative mx-auto max-w-[1200px] px-margin-desktop">
            <nav aria-label="Breadcrumb" className="mb-space-md flex items-center gap-2 text-label-sm font-label-sm text-primary-fixed-dim">
              <Link href="/" className="flex items-center gap-1 transition-colors hover:text-on-primary">
                <span className="material-symbols-outlined text-[16px]">home</span>
                <span>Trang chủ</span>
              </Link>
              <span className="opacity-50">/</span>
              <span className="font-semibold text-on-primary">Liên hệ</span>
            </nav>

            <div className="max-w-3xl">
              <div className="mb-space-sm inline-flex items-center gap-2 rounded-full bg-primary-container px-3 py-1 text-label-sm font-label-sm font-semibold uppercase tracking-widest text-secondary-fixed shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-secondary-container" />
                LẮNG NGHE &amp; ĐỒNG HÀNH CÙNG BẠN ĐỌC
              </div>
              <h1 className="mb-space-sm font-display-hero text-display-hero leading-tight tracking-tight text-on-primary">
                Liên hệ &amp; Kết nối DalifaBooks
              </h1>
              <p className="max-w-2xl text-body-lg font-body-lg leading-relaxed text-primary-fixed-dim">
                DalifaBooks luôn sẵn sàng lắng nghe mọi đóng góp, câu hỏi về ấn bản, bản quyền, hợp tác phát hành hay yêu cầu hỗ trợ đơn hàng của quý bạn đọc với sự chân thành và chu đáo nhất.
              </p>
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto -mt-6 max-w-[1200px] overflow-hidden rounded-xl border-b-2 border-secondary-container/30 bg-surface-card px-6 py-6 shadow-sm">
          <div className="grid grid-cols-1 gap-6 divide-y divide-surface-container md:grid-cols-4 md:divide-x md:divide-y-0">
            {quickStats.map((item) => (
              <div key={item.title} className="flex items-center gap-4 pt-4 md:pt-0">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${item.accent}`}>
                  <span className="material-symbols-outlined text-[26px]">{item.icon}</span>
                </div>
                <div className="min-w-0">
                  <span className="block text-label-sm font-label-sm text-text-muted">{item.title}</span>
                  <span className="block font-headline-sm text-headline-sm font-bold text-text-primary">{item.value}</span>
                  <span className="block text-body-sm font-body-sm text-text-secondary">{item.meta}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="mx-auto max-w-[1200px] px-margin-desktop py-space-2xl">
          <div className="grid grid-cols-1 items-start gap-space-xl lg:grid-cols-12">
            <div className="rounded-2xl bg-surface-card p-6 shadow-sm lg:col-span-7 md:p-8">
              <div className="mb-space-lg flex items-center justify-between rounded-t-2xl bg-surface-subtle p-6 md:-mx-8 md:-mt-8 md:p-8">
                <div>
                  <span className="mb-1 block text-label-sm font-label-sm font-bold uppercase tracking-wider text-secondary">
                    TIẾP NHẬN Ý KIẾN &amp; HỢP TÁC
                  </span>
                  <h2 className="font-headline-md text-headline-md font-bold text-text-primary">
                    Gửi thông điệp tới Ban biên tập &amp; Chăm sóc Bạn đọc
                  </h2>
                </div>
                <span className="material-symbols-outlined hidden text-[32px] text-text-muted sm:block">edit_note</span>
              </div>

              <form className="flex flex-col gap-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="fullName" className="flex items-center gap-1 text-label-md font-label-md font-semibold text-text-primary">
                      Họ và tên bạn đọc <span className="text-error">*</span>
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      required
                      placeholder="Ví dụ: Nguyễn Văn An"
                      className="w-full rounded-lg bg-surface px-4 py-2.5 text-body-md font-body-md text-text-primary placeholder:text-text-muted shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary-container"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone" className="text-label-md font-label-md font-semibold text-text-primary">
                      Số điện thoại liên hệ
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="09xx xxx xxx"
                      className="w-full rounded-lg bg-surface px-4 py-2.5 text-body-md font-body-md text-text-primary placeholder:text-text-muted shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary-container"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="flex items-center gap-1 text-label-md font-label-md font-semibold text-text-primary">
                    Địa chỉ Email <span className="text-error">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="bandocthanky@example.com"
                    className="w-full rounded-lg bg-surface px-4 py-2.5 text-body-md font-body-md text-text-primary placeholder:text-text-muted shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary-container"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="topic" className="flex items-center gap-1 text-label-md font-label-md font-semibold text-text-primary">
                      Chủ đề quan tâm <span className="text-error">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="topic"
                        required
                        defaultValue=""
                        className="w-full appearance-none rounded-lg bg-surface px-4 py-2.5 pr-10 text-body-md font-body-md text-text-primary shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary-container"
                      >
                        <option value="" disabled>Chọn chủ đề liên hệ...</option>
                        <option value="order">Hỗ trợ đơn hàng &amp; Giao vận</option>
                        <option value="feedback">Đóng góp ý kiến về ấn bản</option>
                        <option value="publishing">Hợp tác xuất bản &amp; Tác quyền</option>
                        <option value="bulk">Đặt sách số lượng lớn / Doanh nghiệp</option>
                        <option value="other">Ý kiến đóng góp khác</option>
                      </select>
                      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-muted">
                        <span className="material-symbols-outlined text-[20px]">expand_more</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="orderCode" className="flex items-center justify-between text-label-md font-label-md font-semibold text-text-primary">
                      <span>Mã đơn hàng</span>
                      <span className="text-label-sm font-label-sm font-normal text-text-muted">(nếu có liên quan)</span>
                    </label>
                    <input
                      id="orderCode"
                      type="text"
                      placeholder="Ví dụ: #DLF-84920"
                      className="w-full rounded-lg bg-surface px-4 py-2.5 text-body-md font-body-md text-text-primary placeholder:text-text-muted shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary-container"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="flex items-center gap-1 text-label-md font-label-md font-semibold text-text-primary">
                    Nội dung thông điệp / Lời nhắn <span className="text-error">*</span>
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    placeholder="Xin vui lòng mô tả chi tiết câu hỏi, thắc mắc về đơn hàng, góp ý bản dịch hoặc đề xuất hợp tác của bạn để DalifaBooks phục vụ tốt nhất..."
                    className="min-h-[120px] w-full resize-y rounded-lg bg-surface px-4 py-3 text-body-md font-body-md text-text-primary placeholder:text-text-muted shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary-container"
                  />
                </div>

                <label className="flex cursor-pointer select-none items-start gap-3 pt-1">
                  <input type="checkbox" defaultChecked className="mt-1 h-4 w-4 rounded text-primary focus:ring-primary-container" />
                  <span className="text-body-sm font-body-sm text-text-secondary">
                    Tôi muốn nhận bản tin tuyển chọn ấn bản mới, chuyên đề học thuật và ưu đãi độc quyền từ DalifaBooks.
                  </span>
                </label>

                <div className="flex flex-col items-center justify-between gap-4 pt-2 sm:flex-row">
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-container px-8 py-3.5 text-label-md font-label-md font-semibold text-on-primary shadow-md transition-all hover:bg-primary active:scale-[0.99] sm:w-auto"
                  >
                    <span className="material-symbols-outlined text-[20px]">send</span>
                    <span>Gửi thông điệp ngay</span>
                  </button>

                  <div className="flex items-center gap-2 rounded-full bg-status-emerald-bg px-3.5 py-1.5 text-label-sm font-label-sm text-status-emerald-text">
                    <span className="material-symbols-outlined text-[16px]">verified</span>
                    <span>Cam kết phản hồi trong vòng 24 giờ làm việc</span>
                  </div>
                </div>
              </form>
            </div>

            <div className="flex flex-col gap-space-lg lg:col-span-5">
              <div className="rounded-2xl bg-surface-card p-6 shadow-sm md:p-7">
                <h3 className="mb-space-md flex items-center gap-2 font-headline-sm text-headline-sm font-bold text-text-primary">
                  <span className="material-symbols-outlined text-[22px] text-primary">apartment</span>
                  <span>Hệ thống Trụ sở &amp; Chi nhánh</span>
                </h3>

                <div className="flex flex-col gap-5">
                  {branches.map((branch) => (
                    <div key={branch.label} className="rounded-xl bg-surface-subtle p-4 transition-colors hover:bg-surface-container-low">
                      <div className="flex items-start gap-3">
                        <span className={`material-symbols-outlined mt-0.5 shrink-0 text-[22px] ${branch.tone}`}>{branch.icon}</span>
                        <div>
                          <h4 className="text-label-md font-label-md font-bold text-text-primary">{branch.label}</h4>
                          <p className="mt-1 text-body-sm font-body-sm text-text-secondary">{branch.text}</p>
                          <div className="mt-2 flex items-center gap-2 text-label-sm font-label-sm text-text-muted">
                            <span className="material-symbols-outlined text-[15px]">schedule</span>
                            <span>{branch.hours}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-surface-card p-6 shadow-sm md:p-7">
                <h3 className="mb-4 flex items-center gap-2 font-headline-sm text-headline-sm font-bold text-text-primary">
                  <span className="material-symbols-outlined text-[22px] text-primary">contact_phone</span>
                  <span>Kênh hỗ trợ trực tiếp</span>
                </h3>

                <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {contactCards.map((card) => (
                    <a key={card.label} href={card.href} className="flex items-center gap-3 rounded-lg bg-surface p-3.5 transition-colors hover:bg-surface-subtle">
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${card.tone}`}>
                        <span className="material-symbols-outlined text-[20px]">{card.icon}</span>
                      </div>
                      <div className="min-w-0">
                        <span className="block text-label-sm font-label-sm text-text-muted">{card.label}</span>
                        <span className="block text-label-md font-label-md font-bold text-text-primary">{card.value}</span>
                      </div>
                    </a>
                  ))}
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <a href="#" className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-surface-subtle px-3 py-2 text-label-sm font-label-sm font-medium text-text-primary transition-colors hover:bg-primary-container hover:text-on-primary">
                    <span className="material-symbols-outlined text-[18px]">chat</span>
                    <span>Zalo Official</span>
                  </a>
                  <a href="#" className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-surface-subtle px-3 py-2 text-label-sm font-label-sm font-medium text-text-primary transition-colors hover:bg-primary-container hover:text-on-primary">
                    <span className="material-symbols-outlined text-[18px]">public</span>
                    <span>Fanpage Dalifa</span>
                  </a>
                </div>
              </div>

              <div className="rounded-2xl bg-surface-card p-6 shadow-sm">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[20px] text-secondary">pin_drop</span>
                    <span className="text-label-md font-label-md font-bold text-text-primary">Vị trí Không gian Đinh Lễ, Hoàn Kiếm</span>
                  </div>
                  <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="flex items-center gap-0.5 text-label-sm font-label-sm text-secondary hover:underline">
                    <span>Chỉ đường</span>
                    <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                  </a>
                </div>

                <div
                  className="relative flex h-48 w-full items-end overflow-hidden rounded-xl bg-cover bg-center p-3 shadow-inner"
                  style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDWgIsuvDikFLiO-22MLAYtIiy5ZHEPDZ-MZzASzt9BTDnIjCjdh04X1QZyq11SI9R6EQ2Q-t2G7KiMgUkC1jfXz55-_qVxQzkVuRtIh5RptwQrZl2jv8tnc3HOjkwDnc6V37eC1cxuCRZumlR5EgvfF_VWkxHbN2A8y3eayIY8VAC4YGx1MD4OQXtB9AKaflpo-js39Z4jbKnmq-rPEOCUSaPYnaONndHrd4bg8vlfJ3lek9jv2snV')" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
                  <div className="relative z-10 flex items-center gap-2 rounded-lg bg-primary/70 px-3 py-1.5 text-label-sm font-label-sm text-on-primary backdrop-blur-md">
                    <span className="material-symbols-outlined text-[16px] text-secondary-fixed">storefront</span>
                    <span>Điểm hẹn văn hóa đọc gần Hồ Gươm</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 rounded-2xl bg-surface-container-low p-6 shadow-sm">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary-container/20 text-secondary">
                    <span className="material-symbols-outlined text-[22px]">find_in_page</span>
                  </div>
                  <div>
                    <h4 className="text-label-md font-label-md font-bold text-text-primary">Tra cứu lộ trình đơn hàng nhanh?</h4>
                    <p className="text-body-sm font-body-sm text-text-secondary">Chỉ cần mã đơn hoặc số điện thoại người nhận.</p>
                  </div>
                </div>
                <a href="#" className="shrink-0 rounded-lg bg-primary px-4 py-2 text-center text-label-sm font-label-sm font-semibold text-on-primary transition-colors hover:bg-primary-container">
                  Tra cứu ngay
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
