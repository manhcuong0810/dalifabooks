"use client";

import Link from "next/link";
import { AdminPageShell } from "@/components/admin/AdminPageShell";

export default function AdminDashboardPage() {
  return (
    <AdminPageShell activePath="/admin/dashboard">
      <div className="space-y-6">
            <div className="flex flex-col justify-between gap-4 rounded-xl bg-surface-card p-6 shadow-sm xl:flex-row xl:items-center">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-full bg-primary px-2.5 py-0.5 text-label-sm font-label-sm text-on-primary">
                    HỆ THỐNG TRỰC TUYẾN
                  </span>
                  <span className="flex items-center gap-1 text-body-sm font-body-sm text-text-muted">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-status-emerald-text" />
                    Đồng bộ dữ liệu thời gian thực
                  </span>
                </div>
                <h1 className="text-headline-md font-headline-md tracking-tight text-text-primary">
                  Tổng quan Vận hành DalifaBooks
                </h1>
                <p className="text-body-sm font-body-sm text-text-secondary">
                  Chào mừng quay trở lại, Ban Điều hành &amp; Thủ kho. Dữ liệu tổng hợp kho vận và dòng tiền toàn hệ thống.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center rounded-lg bg-surface-subtle p-1">
                  {[
                    "Hôm nay",
                    "7 ngày qua",
                    "30 ngày qua",
                    "Tháng này",
                  ].map((label, index) => (
                    <button
                      key={label}
                      type="button"
                      className={`rounded-md px-3 py-1.5 text-label-sm font-label-sm transition-colors ${
                        index === 2
                          ? "bg-surface-card text-primary shadow-sm"
                          : "text-text-secondary hover:text-text-primary"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                <button type="button" className="inline-flex items-center gap-2 rounded-lg bg-surface-card px-3.5 py-2 text-label-sm font-label-sm text-text-primary shadow-sm transition-colors hover:bg-surface-subtle">
                  <span className="material-symbols-outlined text-[18px] text-text-muted">calendar_today</span>
                  <span>01/10/2026 - 09/10/2026</span>
                  <span className="material-symbols-outlined text-[16px] text-text-muted">expand_more</span>
                </button>

                <button id="refreshDataBtn" type="button" className="group inline-flex items-center gap-2 rounded-lg bg-surface-card px-3.5 py-2 text-label-sm font-label-sm text-text-primary shadow-sm transition-all hover:bg-surface-subtle" title="Bấm để đồng bộ dữ liệu mới nhất">
                  <span className="material-symbols-outlined text-[18px] text-text-muted transition-transform duration-500 group-hover:rotate-180">sync</span>
                  <span className="hidden sm:inline">Cập nhật: <strong className="font-medium text-text-primary">09:30:15</strong></span>
                </button>

                <button type="button" className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-label-sm font-label-sm text-on-primary shadow-sm transition-colors hover:bg-primary-container">
                  <span className="material-symbols-outlined text-[18px]">download</span>
                  <span>Xuất báo cáo</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_drop_down</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              {[
                {
                  label: "Doanh số hoàn tất",
                  icon: "payments",
                  value: "328.650.000",
                  trend: "+14.2%",
                  sub: "vs tháng trước",
                  tone: "text-status-emerald-text",
                },
                {
                  label: "Thực thu ròng",
                  icon: "account_balance_wallet",
                  value: "315.420.000",
                  trend: "Đã khớp COD",
                  sub: "Trừ hoàn tiền",
                  tone: "text-text-secondary",
                },
                {
                  label: "Chờ xác nhận",
                  icon: "schedule",
                  value: "24",
                  trend: "CẦN XỬ LÝ",
                  sub: "Hạn duyệt xuất trong ngày",
                  tone: "text-status-amber-text",
                  badge: "status-amber-bg",
                  emphasis: true,
                },
                {
                  label: "Chờ đóng gói",
                  icon: "inventory_2",
                  value: "48",
                  trend: "Kho Tổng Hà Nội (41)",
                  sub: "TP.HCM (7)",
                  tone: "text-text-secondary",
                },
                {
                  label: "Cần đối soát",
                  icon: "receipt_long",
                  value: "12",
                  trend: "NGÂN HÀNG",
                  sub: "Chờ kiểm tra ủy nhiệm chi",
                  tone: "text-status-sky-text",
                  badge: "status-sky-bg",
                },
                {
                  label: "Tồn kho thấp",
                  icon: "warning",
                  value: "9",
                  trend: "CẢNH BÁO",
                  sub: "Khả dụng < 10 cuốn / tựa",
                  tone: "text-status-rose-text",
                  badge: "status-rose-bg",
                  emphasis: true,
                },
              ].map((item, index) => (
                <div key={item.label} className={`flex flex-col justify-between rounded-xl bg-surface-card p-4 shadow-sm transition-shadow hover:shadow-md ${index === 2 || index === 5 ? "relative overflow-hidden" : ""}`}>
                  {index === 2 || index === 5 ? <div className={`absolute right-0 top-0 h-full w-1.5 ${index === 2 ? "bg-status-amber-text" : "bg-status-rose-text"}`} /> : null}
                  <div>
                    <div className="mb-2 flex items-center justify-between text-text-muted">
                      <span className="text-label-sm font-label-sm uppercase tracking-wider text-text-secondary">{item.label}</span>
                      {item.trend === "CẦN XỬ LÝ" || item.trend === "CẢNH BÁO" ? (
                        <span className={`rounded-full px-2 py-0.5 text-label-sm font-label-sm font-bold ${index === 2 ? "bg-status-amber-bg text-status-amber-text" : "bg-status-rose-bg text-status-rose-text"}`}>
                          {item.trend}
                        </span>
                      ) : (
                        <span className="rounded-lg bg-surface-subtle p-1.5 text-primary">
                          <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                        </span>
                      )}
                    </div>

                    {item.label === "Doanh số hoàn tất" || item.label === "Thực thu ròng" ? (
                      <div className="text-price-lg font-price-lg tracking-tight text-text-primary">
                        {item.value} <span className="text-body-sm font-body-sm font-normal text-text-muted">₫</span>
                      </div>
                    ) : (
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-display-hero-mobile font-display-hero-mobile text-text-primary">{item.value}</span>
                        <span className="text-body-sm font-body-sm text-text-secondary">{item.label === "Chờ xác nhận" ? "đơn hàng" : item.label === "Chờ đóng gói" ? "kiện sách" : item.label === "Cần đối soát" ? "giao dịch" : "tựa sách"}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-3 pt-3">
                    {item.label === "Doanh số hoàn tất" ? (
                      <div className="flex items-center justify-between rounded-md bg-surface-subtle/50 px-2 py-1.5">
                        <span className="inline-flex items-center text-status-emerald-text text-label-sm font-label-sm">
                          <span className="material-symbols-outlined mr-0.5 text-[16px]">trending_up</span>
                          +14.2%
                        </span>
                        <span className="text-[11px] text-text-muted">vs tháng trước</span>
                      </div>
                    ) : item.label === "Thực thu ròng" ? (
                      <div className="flex items-center justify-between rounded-md bg-surface-subtle/50 px-2 py-1.5">
                        <span className="inline-flex items-center text-text-secondary text-label-sm font-label-sm">
                          <span className="material-symbols-outlined mr-1 text-[14px] text-status-emerald-text">verified</span>
                          Đã khớp COD
                        </span>
                        <span className="text-[11px] text-text-muted">Trừ hoàn tiền</span>
                      </div>
                    ) : item.label === "Chờ xác nhận" ? (
                      <div className="flex items-center text-[11px] font-medium text-status-amber-text">
                        <span className="material-symbols-outlined mr-1 text-[14px]">schedule</span>
                        Hạn duyệt xuất trong ngày
                      </div>
                    ) : item.label === "Chờ đóng gói" ? (
                      <div className="flex items-center justify-between text-[11px] text-text-muted">
                        <span className="truncate">Kho Tổng Hà Nội (41)</span>
                        <span className="font-medium text-text-secondary">TP.HCM (7)</span>
                      </div>
                    ) : item.label === "Cần đối soát" ? (
                      <div className="flex items-center text-[11px] text-status-sky-text">
                        <span className="material-symbols-outlined mr-1 text-[14px]">receipt_long</span>
                        Chờ kiểm tra ủy nhiệm chi
                      </div>
                    ) : (
                      <div className="flex items-center text-[11px] font-medium text-status-rose-text">
                        <span className="material-symbols-outlined mr-1 text-[14px]">warning</span>
                        Khả dụng &lt; 10 cuốn / tựa
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              <div className="rounded-xl bg-surface-card p-6 shadow-sm lg:col-span-8">
                <div className="flex flex-col justify-between gap-2 pb-4 sm:flex-row sm:items-center">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-headline-sm font-headline-sm text-text-primary">Diễn biến Doanh thu &amp; Dòng tiền</span>
                      <span className="rounded bg-surface-subtle px-2 py-0.5 text-label-sm font-label-sm text-text-secondary">30 ngày qua</span>
                    </div>
                    <p className="mt-0.5 text-body-sm font-body-sm text-text-muted">So sánh đối chiếu Doanh số đã giao và Dòng tiền thực nhận về tài khoản</p>
                  </div>

                  <div className="flex items-center gap-4 text-label-sm font-label-sm">
                    <div className="flex items-center gap-1.5">
                      <span className="h-3 w-3 rounded-sm bg-primary" />
                      <span className="text-text-secondary">Doanh số hoàn tất</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="h-1 w-3 rounded-full bg-secondary" />
                      <span className="text-text-secondary">Dòng tiền thực thu</span>
                    </div>
                  </div>
                </div>

                <div className="relative h-72 w-full pt-4">
                  <svg viewBox="0 0 800 240" preserveAspectRatio="none" className="h-full w-full overflow-visible">
                    <defs>
                      <linearGradient id="barGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#001428" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#0f2942" stopOpacity="0.7" />
                      </linearGradient>
                      <linearGradient id="lineGlow" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#904d00" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#904d00" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <line x1="0" x2="800" y1="40" y2="40" stroke="#E2E8F0" strokeDasharray="4 4" strokeWidth="1" />
                    <line x1="0" x2="800" y1="100" y2="100" stroke="#E2E8F0" strokeDasharray="4 4" strokeWidth="1" />
                    <line x1="0" x2="800" y1="160" y2="160" stroke="#E2E8F0" strokeDasharray="4 4" strokeWidth="1" />
                    <line x1="0" x2="800" y1="220" y2="220" stroke="#CBD5E1" strokeWidth="1.5" />

                    <rect x="30" y="90" width="22" height="130" rx="3" fill="url(#barGradient)" />
                    <rect x="110" y="65" width="22" height="155" rx="3" fill="url(#barGradient)" />
                    <rect x="190" y="80" width="22" height="140" rx="3" fill="url(#barGradient)" />
                    <rect x="270" y="50" width="22" height="170" rx="3" fill="url(#barGradient)" />
                    <rect x="350" y="110" width="22" height="110" rx="3" fill="url(#barGradient)" />
                    <rect x="430" y="45" width="22" height="175" rx="3" fill="url(#barGradient)" />
                    <rect x="510" y="70" width="22" height="150" rx="3" fill="url(#barGradient)" />
                    <rect x="590" y="35" width="22" height="185" rx="3" fill="url(#barGradient)" />
                    <rect x="670" y="60" width="22" height="160" rx="3" fill="url(#barGradient)" />
                    <rect x="750" y="30" width="22" height="190" rx="3" fill="url(#barGradient)" />

                    <path d="M 41 105 L 121 78 L 201 92 L 281 65 L 361 125 L 441 58 L 521 82 L 601 48 L 681 72 L 761 42 L 761 220 L 41 220 Z" fill="url(#lineGlow)" />
                    <path d="M 41 105 L 121 78 L 201 92 L 281 65 L 361 125 L 441 58 L 521 82 L 601 48 L 681 72 L 761 42" fill="none" stroke="#904d00" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                    <circle cx="281" cy="65" r="4" fill="#ffffff" stroke="#904d00" strokeWidth="2.5" />
                    <circle cx="601" cy="48" r="4" fill="#ffffff" stroke="#904d00" strokeWidth="2.5" />
                    <circle cx="761" cy="42" r="5" fill="#ffffff" stroke="#904d00" strokeWidth="3" />
                  </svg>
                </div>

                <div className="flex items-center justify-between pt-2 text-[11px] font-label-sm text-text-muted">
                  {['01/10', '04/10', '07/10', '10/10', '13/10', '16/10', '19/10', '22/10', '25/10', '28/10 (Hiện tại)'].map((label) => (
                    <span key={label}>{label}</span>
                  ))}
                </div>
              </div>

              <div className="rounded-xl bg-surface-card p-6 shadow-sm lg:col-span-4">
                <div className="pb-3">
                  <h3 className="text-headline-sm font-headline-sm text-text-primary">Tỷ trọng Vận hành Đơn</h3>
                  <p className="mt-0.5 text-body-sm font-body-sm text-text-muted">Phân bổ tiến độ 1.428 đơn hàng trong chu kỳ</p>
                </div>

                <div className="relative flex items-center justify-center py-4">
                  <svg className="h-48 w-48 -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#F1F5F9" strokeWidth="14" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#001428" strokeDasharray="195.9 251.2" strokeDashoffset="0" strokeWidth="14" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#075985" strokeDasharray="35.1 251.2" strokeDashoffset="-195.9" strokeWidth="14" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#904d00" strokeDasharray="12.5 251.2" strokeDashoffset="-231" strokeWidth="14" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#ba1a1a" strokeDasharray="7.5 251.2" strokeDashoffset="-243.5" strokeWidth="14" />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center text-center">
                    <span className="text-headline-lg font-headline-lg leading-none text-text-primary">78%</span>
                    <span className="mt-1 text-label-sm font-label-sm uppercase tracking-wider text-text-muted">Đã giao</span>
                  </div>
                </div>

                <div className="mt-2 space-y-2.5">
                  {[
                    { label: "Đã giao hoàn tất", value: "1.114 đơn", percent: "78%", color: "bg-primary", textColor: "text-text-primary" },
                    { label: "Đang trên đường giao", value: "200 đơn", percent: "14%", color: "bg-status-sky-text", textColor: "text-status-sky-text" },
                    { label: "Đang soạn & đóng gói", value: "71 đơn", percent: "5%", color: "bg-secondary", textColor: "text-secondary" },
                    { label: "Chờ thanh toán / Duyệt", value: "43 đơn", percent: "3%", color: "bg-error", textColor: "text-error" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between rounded-lg p-1.5 text-body-sm font-body-sm transition-colors hover:bg-surface-subtle">
                      <div className="flex items-center gap-2">
                        <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                        <span className="font-medium text-text-primary">{item.label}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-text-muted">{item.value}</span>
                        <span className={`text-label-sm font-label-sm font-semibold ${item.textColor}`}>{item.percent}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-surface-border pt-3 text-label-sm font-label-sm text-text-muted">
                  <span>Thời gian giao trung bình: <strong className="text-text-primary">1.4 ngày</strong></span>
                  <a href="#" className="font-semibold text-primary hover:underline">Xem chi tiết giao vận →</a>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              <div className="rounded-xl bg-surface-card p-6 shadow-sm lg:col-span-7">
                <div className="flex items-center justify-between pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-headline-sm font-headline-sm text-text-primary">Đơn hàng mới cần xử lý gấp</h3>
                      <span className="rounded-full bg-status-amber-bg px-2 py-0.5 text-label-sm font-label-sm font-bold text-status-amber-text">5 đơn chờ</span>
                    </div>
                    <p className="mt-0.5 text-body-sm font-body-sm text-text-muted">Ưu tiên xác nhận để kịp chuyển tiếp qua đơn vị vận chuyển chiều nay</p>
                  </div>
                  <a href="#" className="flex items-center text-label-sm font-label-sm font-semibold text-primary transition-colors hover:text-primary-container">
                    Xem toàn bộ (24) <span className="material-symbols-outlined ml-0.5 text-[16px]">arrow_forward</span>
                  </a>
                </div>

                <div className="-mx-6 overflow-x-auto px-6">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-surface-subtle text-label-sm font-label-sm uppercase text-text-secondary">
                        <th className="rounded-l-lg px-3 py-3 font-semibold">Mã đơn</th>
                        <th className="px-3 py-3 font-semibold">Khách hàng &amp; Liên hệ</th>
                        <th className="px-3 py-3 font-semibold">Hình thức</th>
                        <th className="px-3 py-3 text-right font-semibold">Tổng tiền</th>
                        <th className="rounded-r-lg px-3 py-3 text-center font-semibold">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-border text-body-sm font-body-sm text-text-primary">
                      {[
                        { code: "#DLF-84920", time: "Vừa xong (3 phút)", customer: "Vũ Minh Hoàng", contact: "0912.845.*** • Cầu Giấy, HN", type: "Chuyển khoản (Đã nhận)", typeClass: "bg-status-emerald-bg text-status-emerald-text", price: "485.000 ₫", subtitle: "3 cuốn sách", action: "Duyệt xuất" },
                        { code: "#DLF-84919", time: "12 phút trước", customer: "Nguyễn Thị Thảo", contact: "0983.112.*** • Quận 1, HCM", type: "Thu hộ COD", typeClass: "bg-surface-subtle text-text-secondary", price: "230.000 ₫", subtitle: "1 cuốn sách", action: "Duyệt xuất" },
                        { code: "#DLF-84918", time: "25 phút trước", customer: "Lê Gia Huy", contact: "0904.779.*** • Sơn Trà, ĐN", type: "Chờ xác nhận CK", typeClass: "bg-status-amber-bg text-status-amber-text", price: "1.250.000 ₫", subtitle: "Bộ Trọn Tập (6 cuốn)", action: "Kiểm tra tiền" },
                        { code: "#DLF-84917", time: "40 phút trước", customer: "Công ty TNHH EduAlpha", contact: "024.3829.*** • Hoàn Kiếm, HN", type: "Hóa đơn Doanh nghiệp", typeClass: "bg-status-emerald-bg text-status-emerald-text", price: "4.620.000 ₫", subtitle: "Đơn hợp đồng (25 cuốn)", action: "Duyệt xuất" },
                        { code: "#DLF-84916", time: "1 giờ trước", customer: "Đỗ Trọng Hiếu", contact: "0977.341.*** • Ninh Kiều, Cần Thơ", type: "Thu hộ COD", typeClass: "bg-surface-subtle text-text-secondary", price: "310.000 ₫", subtitle: "2 cuốn sách", action: "Duyệt xuất" },
                      ].map((row) => (
                        <tr key={row.code} className="transition-colors hover:bg-surface-subtle/70">
                          <td className="px-3 py-3.5">
                            <div className="text-label-md font-label-md font-semibold text-primary">{row.code}</div>
                            <div className="text-[11px] text-text-muted">{row.time}</div>
                          </td>
                          <td className="px-3 py-3.5">
                            <div className="font-medium text-text-primary">{row.customer}</div>
                            <div className="text-[11px] text-text-secondary">{row.contact}</div>
                          </td>
                          <td className="px-3 py-3.5">
                            <span className={`inline-flex items-center rounded px-2 py-0.5 text-[11px] font-label-sm font-semibold ${row.typeClass}`}>
                              {row.type}
                            </span>
                          </td>
                          <td className="px-3 py-3.5 text-right">
                            <div className="text-price-md font-price-md text-text-primary">{row.price}</div>
                            <div className="text-[11px] text-text-muted">{row.subtitle}</div>
                          </td>
                          <td className="px-3 py-3.5 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              <button type="button" className={`rounded-md px-2.5 py-1.5 text-label-sm font-label-sm transition-colors shadow-sm ${row.action === "Kiểm tra tiền" ? "bg-surface-subtle text-primary hover:bg-surface-container-high" : "bg-primary text-on-primary hover:bg-primary-container"}`}>
                                {row.action}
                              </button>
                              <button type="button" className="rounded-md p-1.5 text-text-muted transition-colors hover:bg-surface-subtle hover:text-text-primary" title="Xem chi tiết đơn">
                                <span className="material-symbols-outlined text-[18px]">visibility</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 flex items-center justify-between pt-3 text-body-sm font-body-sm text-text-muted">
                  <span>* Các đơn đặt trước 11:30 sẽ được bàn giao Viettel Post trong ca sáng.</span>
                  <button type="button" className="text-label-sm font-label-sm font-semibold text-primary hover:underline">Phê duyệt hàng loạt →</button>
                </div>
              </div>

              <div className="space-y-6 lg:col-span-5">
                <div className="rounded-xl bg-surface-card p-6 shadow-sm">
                  <div className="flex items-center justify-between pb-3">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-status-rose-text text-[20px]">notification_important</span>
                      <h3 className="text-headline-sm font-headline-sm text-text-primary">Sách sắp hết hàng</h3>
                    </div>
                    <span className="rounded-full bg-status-rose-bg px-2 py-0.5 text-label-sm font-label-sm font-bold text-status-rose-text">Khả dụng &lt; 10</span>
                  </div>
                  <p className="mb-4 text-body-sm font-body-sm text-text-muted">Cần duyệt kế hoạch tái bản hoặc luân chuyển giữa các chi nhánh</p>

                  <div className="space-y-3">
                    {[
                      { title: "Đại dương trên đỉnh mây", sku: "SKU-DAL-092 • NXB Tri Thức", stock: "Còn 3 cuốn", count: "(Đã đặt: 12)" },
                      { title: "Chủ nghĩa Khắc kỷ trong thực hành", sku: "SKU-DAL-144 • Tái bản lần 3", stock: "Còn 5 cuốn", count: "(Đã đặt: 8)" },
                      { title: "Tâm lý học Về tiền", sku: "SKU-DAL-018 • Bìa cứng cao cấp", stock: "Còn 6 cuốn", count: "(Đã đặt: 19)" },
                    ].map((item) => (
                      <div key={item.title} className="flex items-center justify-between rounded-lg bg-surface-subtle/80 p-3 transition-colors hover:bg-surface-subtle">
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex h-14 w-10 shrink-0 items-center justify-center rounded bg-surface-container text-text-muted shadow-sm">
                            <span className="material-symbols-outlined text-[20px]">book</span>
                          </div>
                          <div className="min-w-0">
                            <h4 className="truncate text-label-md font-label-md font-semibold text-text-primary">{item.title}</h4>
                            <div className="text-[11px] text-text-muted">Mã: {item.sku}</div>
                            <div className="mt-1 flex items-center gap-2">
                              <span className="text-label-sm font-label-sm font-bold text-status-rose-text">{item.stock}</span>
                              <span className="text-[11px] text-text-muted">{item.count}</span>
                            </div>
                          </div>
                        </div>
                        <button type="button" className="ml-3 shrink-0 rounded-md bg-surface-card px-3 py-1.5 text-label-sm font-label-sm font-semibold text-primary shadow-sm transition-colors hover:bg-surface-container-high">
                          Điều chỉnh kho
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl bg-surface-card p-6 shadow-sm">
                  <div className="flex items-center justify-between pb-3">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-secondary text-[20px]">local_fire_department</span>
                      <h3 className="text-headline-sm font-headline-sm text-text-primary">Ấn phẩm dẫn đầu doanh thu</h3>
                    </div>
                    <a href="#" className="text-label-sm font-label-sm font-medium text-text-secondary hover:text-text-primary">Báo cáo sách →</a>
                  </div>

                  <div className="space-y-3 pt-1">
                    {[
                      { rank: 1, title: "Lịch sử Văn minh Phương Tây", meta: "Will Durant • Bộ 2 tập", sales: "824 cuốn", growth: "+18.4% tăng trưởng" },
                      { rank: 2, title: "Chiến lược Đại dương Xanh", meta: "W. Chan Kim • Bản mở rộng", sales: "612 cuốn", growth: "+9.1% tăng trưởng" },
                      { rank: 3, title: "Thế giới Đã Thay Đổi Như Thế Nào", meta: "Vaclav Smil • Khoa học & Xã hội", sales: "489 cuốn", growth: "+12.0% tăng trưởng" },
                    ].map((item) => (
                      <div key={item.rank} className="flex items-center justify-between">
                        <div className="flex min-w-0 items-center gap-3">
                          <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface-subtle text-label-sm font-label-sm font-bold ${item.rank === 1 ? "text-primary" : "text-text-secondary"}`}>
                            {String(item.rank).padStart(2, "0")}
                          </div>
                          <div className="min-w-0">
                            <div className="truncate text-label-md font-label-md font-semibold text-text-primary">{item.title}</div>
                            <div className="text-[11px] text-text-muted">{item.meta}</div>
                          </div>
                        </div>
                        <div className="shrink-0 pl-2 text-right">
                          <div className="text-price-md font-price-md text-text-primary">{item.sales}</div>
                          <div className="text-[11px] font-medium text-status-emerald-text">{item.growth}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-4 rounded-xl bg-surface-card p-4 shadow-sm md:flex-row md:items-center">
              <div className="flex flex-wrap items-center gap-6 text-body-sm font-body-sm text-text-secondary">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-status-emerald-text" />
                  <span>Kho Tổng Hà Nội: <strong className="font-medium text-text-primary">92.4% sẵn sàng</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-status-emerald-text" />
                  <span>Kho Tân Bình (TP.HCM): <strong className="font-medium text-text-primary">96.8% sẵn sàng</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-status-sky-text" />
                  <span>Cổng thanh toán OnePay / VietQR: <strong className="font-medium text-text-primary">Hoạt động bình thường</strong></span>
                </div>
              </div>

              <div className="text-[12px] text-text-muted">Phiên bản điều hành v2.4.8 • Máy chủ xử lý dữ liệu: Bắc Ninh Cluster #02</div>
            </div>
          </div>
    </AdminPageShell>
  );
}
