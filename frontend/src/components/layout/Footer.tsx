"use client";

import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="w-full bg-surface-card shadow-[0_-2px_12px_rgba(0,0,0,0.03)] mt-space-2xl">

      {/* Newsletter strip */}
      <div className="bg-surface-container-low py-space-xl px-margin-desktop">
        <div className="max-w-[1240px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-xl items-center">
          <div>
            <h4 className="font-headline-sm text-headline-sm text-text-primary mb-1">Bản tin bạn đọc Dalifa</h4>
            <p className="font-body-sm text-body-sm text-text-secondary">
              Nhận giới thiệu sách tuyển chọn, sự kiện ký tặng và ưu đãi độc quyền hàng tuần.
            </p>
          </div>
          <div className="lg:col-span-2">
            <form
              onSubmit={(e) => { e.preventDefault(); setEmail(""); }}
              className="flex flex-col sm:flex-row gap-2"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập địa chỉ email của bạn..."
                className="flex-1 px-4 py-2.5 rounded-lg bg-surface-card text-body-md font-body-md text-text-primary placeholder:text-text-muted shadow-[0_1px_4px_rgba(0,0,0,0.04)] focus:outline-none focus:ring-2 focus:ring-primary-container"
              />
              <button
                type="submit"
                className="px-6 py-2.5 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-semibold hover:bg-primary-container transition-colors shrink-0"
              >
                Đăng ký nhận tin
              </button>
            </form>
          </div>
          <div className="flex items-center gap-space-sm font-label-sm text-label-sm text-text-secondary">
            <span className="material-symbols-outlined text-secondary text-[22px]">verified_user</span>
            <span>Cam kết 100% sách có bản quyền xuất bản chính hãng</span>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-[1240px] mx-auto px-margin-desktop py-space-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-space-xl">

          {/* Brand */}
          <div className="lg:col-span-2 pr-0 lg:pr-space-lg">
            <div className="flex items-center gap-space-sm mb-space-md">
              <img
                src="https://lh3.googleusercontent.com/aida/AEtjO1Wva0GO_ElHGhfotmX2mb7-4MLiu0uPlpblNn7_ZXu32gjbYc5VbcK6uNyvnf_ymtcRFltaFmWlLgZAAn-QC7XFlmuyTrFIRXkgk4Cyzid4CNyvtQz2bioiDnqHzrdQP4czZveDGhm-GiYWhTVXyUoimGE1rg3aNZ2sUp7t2K3OJSg2143_fkUSs4vQ4z1ewqypmuzTQrE9l3xuBg8m-DJbZAm1qLfp-_K2pu-VfCcgmUr4u-bFPrVCFx5HuroezN6EnqaaE2ze1A"
                alt="DalifaBooks"
                className="h-8 w-auto object-contain"
              />
              <span className="font-headline-sm text-headline-sm font-bold tracking-tight text-primary">DalifaBooks</span>
            </div>
            <p className="font-body-sm text-body-sm text-text-secondary leading-relaxed mb-space-md">
              DalifaBooks là nền tảng phân phối và phát hành sách văn hóa, tư tưởng, khoa học và văn học cao cấp tại Việt Nam. Chúng tôi tin vào sức mạnh bền bỉ của tri thức và sự thấu cảm từ từng trang sách được ấn hành chỉn chu.
            </p>
            <div className="flex flex-col gap-2 font-body-sm text-body-sm text-text-secondary">
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[18px] text-primary shrink-0 mt-0.5">location_on</span>
                <span>Trụ sở chính: Tầng 6, Toà nhà Văn hoá Tri thức, Phố Đinh Lễ, Hoàn Kiếm, Hà Nội</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[18px] text-primary shrink-0 mt-0.5">store</span>
                <span>Chi nhánh TP.HCM: 142 Nguyễn Thị Minh Khai, Phường Võ Thị Sáu, Quận 3, TP.HCM</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-primary shrink-0">mail</span>
                <span>contact@dalifabooks.vn • bbt@dalifabooks.vn</span>
              </div>
            </div>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-headline-sm text-headline-sm text-text-primary mb-space-md font-semibold">Hỗ trợ khách hàng</h4>
            <ul className="flex flex-col gap-2.5 font-body-sm text-body-sm text-text-secondary">
              {[
                "Chính sách đổi trả & hoàn tiền",
                "Chính sách giao hàng toàn quốc",
                "Chính sách bảo mật dữ liệu",
                "Điều khoản dịch vụ sử dụng",
                "Hướng dẫn tra cứu đơn hàng",
                "Câu hỏi thường gặp (FAQ)",
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-primary transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Catalog */}
          <div>
            <h4 className="font-headline-sm text-headline-sm text-text-primary mb-space-md font-semibold">Danh mục tuyển chọn</h4>
            <ul className="flex flex-col gap-2.5 font-body-sm text-body-sm text-text-secondary">
              {[
                "Văn học kinh điển & đương đại",
                "Triết học, Lịch sử & Xã hội",
                "Tâm lý học ứng dụng & Nhận thức",
                "Kinh tế, Quản trị & Đổi mới",
                "Sách song ngữ & Ngoại văn",
                "Ấn bản sưu tầm bọc bìa da",
              ].map((item) => (
                <li key={item}>
                  <a href="/books" className="hover:text-primary transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social + Payment */}
          <div>
            <h4 className="font-headline-sm text-headline-sm text-text-primary mb-space-md font-semibold">Kết nối & Thanh toán</h4>
            <div className="flex flex-col gap-space-md">
              {/* Social */}
              <div className="flex items-center gap-2">
                {["public", "feed", "play_circle", "chat"].map((icon) => (
                  <a
                    key={icon}
                    href="#"
                    className="w-9 h-9 rounded-lg bg-surface-subtle flex items-center justify-center text-text-primary hover:bg-primary-container hover:text-on-primary transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">{icon}</span>
                  </a>
                ))}
              </div>

              {/* Payment */}
              <div>
                <span className="font-label-sm text-label-sm text-text-muted block mb-2 font-semibold uppercase">Phương thức thanh toán</span>
                <div className="flex flex-wrap gap-2">
                  {["COD", "VietQR 24/7", "VNPAY-QR", "Thẻ ATM / Visa / Master"].map((method) => (
                    <span key={method} className="px-2.5 py-1 rounded bg-surface-subtle text-text-primary font-label-sm text-label-sm font-semibold">
                      {method}
                    </span>
                  ))}
                </div>
              </div>

              {/* Cert */}
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

      {/* Bottom bar */}
      <div className="bg-surface-subtle py-space-md px-margin-desktop">
        <div className="max-w-[1240px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-text-muted font-body-sm text-body-sm">
          <span>© 2026 DalifaBooks. Bản quyền thuộc về Công ty Cổ phần Văn hóa & Phát hành sách Dalifa.</span>
          <div className="flex items-center gap-space-md">
            <a href="#" className="hover:text-text-primary">Bảo mật</a>
            <span>•</span>
            <a href="#" className="hover:text-text-primary">Điều khoản</a>
            <span>•</span>
            <a href="#" className="hover:text-text-primary">Sơ đồ trang</a>
          </div>
        </div>
      </div>

    </footer>
  );
}
