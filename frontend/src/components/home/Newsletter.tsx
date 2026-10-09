"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: gọi API đăng ký newsletter
    alert(`Đã đăng ký: ${email}`);
    setEmail("");
  };

  return (
    <section className="bg-surface-container rounded-xl p-space-xl md:p-space-2xl shadow-sm relative overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-primary/5 pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center">
        <div className="w-14 h-14 rounded-full bg-secondary-container text-on-primary flex items-center justify-center mb-space-md shadow-md">
          <span className="material-symbols-outlined text-[30px]">card_giftcard</span>
        </div>

        <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-semibold mb-1">
          Đặc quyền bạn đọc thân thiết
        </span>

        <h2 className="font-headline-lg text-headline-lg text-text-primary mb-space-sm">
          Gia nhập Câu Lạc Bộ Độc Giả DalifaBooks
        </h2>

        <p className="font-body-md text-body-md text-text-secondary leading-relaxed mb-space-lg">
          Đăng ký nhận bản tin tuyển chọn hôm nay để nhận ngay{" "}
          <strong className="text-secondary font-semibold">Voucher giảm 20.000đ</strong>{" "}
          cho đơn hàng đầu tiên cùng đặc quyền tham gia buổi trò chuyện trực tuyến với các dịch giả hàng đầu.
        </p>

        <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-[20px]">mail</span>
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập địa chỉ email của bạn..."
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-surface-card text-text-primary placeholder:text-text-muted font-body-md text-body-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-semibold hover:bg-primary-container transition-colors shadow-sm shrink-0 flex items-center justify-center gap-1.5"
          >
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
  );
}
