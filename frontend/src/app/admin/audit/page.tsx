"use client";

import Link from "next/link";
import { AdminPageShell } from "@/components/admin/AdminPageShell";

export default function AdminAuditPage() {
  return (
    <AdminPageShell activePath="/admin/audit">
      <div className="flex w-full flex-col">
            <div className="border-b border-surface-border bg-surface-card px-6 py-5">
              <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                <div>
                  <div className="mb-1.5 flex items-center gap-2">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-primary text-on-primary">
                      <span className="material-symbols-outlined text-[16px]">history_toggle_off</span>
                    </span>
                    <span className="font-label-sm uppercase tracking-wider text-text-muted">Hệ thống bảo mật &amp; Truy vết dữ liệu</span>
                    <span className="h-1 w-1 rounded-full bg-surface-border-strong" />
                    <span className="flex items-center gap-1 rounded bg-status-emerald-bg px-2 py-0.5 font-label-sm font-semibold text-status-emerald-text">
                      <span className="h-1.5 w-1.5 rounded-full bg-status-emerald-text" />
                      Ghi nhận liên tục
                    </span>
                  </div>
                  <h1 className="font-headline-lg text-text-primary">Nhật ký Kiểm toán Hệ thống (Audit Log)</h1>
                  <p className="mt-1 max-w-3xl text-body-sm font-body-sm text-text-secondary">
                    Theo dõi và ghi nhận toàn bộ biến động dữ liệu về Kho hàng, Đơn đặt hàng, Đối soát thanh toán và Phân quyền nhân sự phục vụ kiểm tra, an toàn thông tin.
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-2.5 self-start lg:self-center">
                  <button type="button" className="inline-flex items-center gap-2 rounded-lg bg-surface-subtle px-3.5 py-2.5 font-label-md text-text-primary shadow-sm transition-colors hover:bg-surface-container">
                    <span className="material-symbols-outlined text-[18px] text-text-secondary">file_download</span>
                    <span>Xuất báo cáo (CSV/Excel)</span>
                  </button>
                  <button type="button" className="inline-flex items-center gap-2 rounded-lg bg-primary px-3.5 py-2.5 font-label-md text-on-primary shadow-sm transition-colors hover:bg-primary-container">
                    <span className="material-symbols-outlined text-[18px]">lock_reset</span>
                    <span>Chính sách lưu vết</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="border-b border-surface-border bg-surface-canvas px-6 py-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: "Tổng sự kiện (30 ngày)", value: "14.820", accent: "text-status-emerald-text", icon: "database" },
                  { label: "Biến động Tồn kho", value: "3.245", accent: "text-text-muted", icon: "inventory_2" },
                  { label: "Đơn hàng & Giao dịch", value: "8.914", accent: "text-text-muted", icon: "shopping_cart_checkout" },
                  { label: "Truy cập & Phân quyền", value: "42", accent: "text-status-rose-text", icon: "admin_panel_settings" },
                ].map((item, idx) => (
                  <div key={item.label} className="flex items-center justify-between rounded-lg bg-surface-card p-3.5 shadow-sm">
                    <div className="space-y-0.5">
                      <span className="font-label-sm text-text-muted">{item.label}</span>
                      <div className="font-headline-sm font-bold text-text-primary">
                        {item.value}
                        {idx === 0 && <span className="text-xs font-normal text-status-emerald-text"> (+12.4%)</span>}
                        {idx === 3 && <span className="text-xs font-normal text-status-rose-text"> (nhạy cảm)</span>}
                      </div>
                    </div>
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${idx === 0 ? "bg-surface-subtle" : idx === 1 ? "bg-status-amber-bg" : idx === 2 ? "bg-status-sky-bg" : "bg-status-rose-bg"}`}>
                      <span className={`material-symbols-outlined text-[20px] ${idx === 0 ? "text-primary" : idx === 1 ? "text-status-amber-text" : idx === 2 ? "text-status-sky-text" : "text-status-rose-text"}`}>{item.icon}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-5 p-6">
              <div className="space-y-4 rounded-xl bg-surface-card p-4 shadow-sm">
                <div className="grid grid-cols-1 items-end gap-3.5 md:grid-cols-2 lg:grid-cols-12">
                  <div className="space-y-1 lg:col-span-4">
                    <label className="flex items-center gap-1.5 font-label-sm text-text-secondary">Tìm kiếm truy vết nhanh</label>
                    <div className="flex items-center rounded-lg bg-surface-canvas px-3 py-2">
                      <span className="material-symbols-outlined mr-2 shrink-0 text-[18px] text-text-muted">search</span>
                      <input defaultValue="#DLF-BK-009" className="w-full bg-transparent font-body-sm text-text-primary placeholder:text-text-muted focus:outline-none" placeholder="Người thao tác, Mã đơn #DLF-..., SKU, Email, IP..." type="text" />
                      <button type="button" className="text-text-muted transition-colors hover:text-text-primary">
                        <span className="material-symbols-outlined text-[16px]">close</span>
                      </button>
                    </div>
                  </div>

                  {[
                    { label: "Loại hành động", value: "Cập nhật tồn kho", options: ["Tất cả hành động", "Cập nhật tồn kho", "Xác nhận đơn hàng", "Đối soát giao dịch", "Xuất kho giao vận", "Thay đổi quyền nhân sự", "Áp dụng coupon"] },
                    { label: "Phân hệ (Entity)", value: "Kho & SKU Sách", options: ["Tất cả đối tượng", "Đơn đặt hàng", "Kho & SKU Sách", "Tài chính & Thanh toán", "Tác giả & Xuất bản", "Nhân sự & Tài khoản"] },
                    { label: "Người thực hiện", value: "Trần Thị Thủ kho (Staff)", options: ["Tất cả nhân sự & bot", "Nguyễn Văn Quản trị (Owner)", "Trần Thị Thủ kho (Staff)", "Lê Văn Kế toán (Finance)", "Hệ thống tự động (Worker)"] },
                    { label: "Khoảng thời gian", value: "01/10/2026 - 09/10/2026", options: [] },
                  ].map((field, index) => (
                    <div key={field.label} className={`${index === 0 || index === 1 || index === 2 ? "space-y-1 lg:col-span-2" : "space-y-1 lg:col-span-2"}`}>
                      <label className="font-label-sm text-text-secondary">{field.label}</label>
                      {field.options.length > 0 ? (
                        <select defaultValue={field.value} className="w-full rounded-lg bg-surface-canvas px-3 py-2 font-body-sm text-text-primary focus:outline-none focus:bg-surface-subtle">
                          {field.options.map((option) => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      ) : (
                        <div className="flex items-center rounded-lg bg-surface-canvas px-3 py-2">
                          <span className="material-symbols-outlined mr-2 text-[16px] text-text-muted">calendar_today</span>
                          <input type="text" defaultValue={field.value} className="w-full bg-transparent text-xs font-body-sm text-text-primary focus:outline-none" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between border-t border-surface-border pt-3">
                  <div className="flex items-center gap-2">
                    <span className="font-label-sm text-text-muted">Đang lọc theo:</span>
                    <span className="inline-flex items-center gap-1 rounded bg-surface-subtle px-2.5 py-1 font-label-sm text-text-secondary">
                      <span>Hành động: Điều chỉnh tồn kho</span>
                      <span className="material-symbols-outlined text-[14px] cursor-pointer hover:text-text-primary">close</span>
                    </span>
                    <span className="inline-flex items-center gap-1 rounded bg-surface-subtle px-2.5 py-1 font-label-sm text-text-secondary">
                      <span>Phân hệ: Kho &amp; SKU Sách</span>
                      <span className="material-symbols-outlined text-[14px] cursor-pointer hover:text-text-primary">close</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button type="button" className="rounded-lg bg-surface-subtle px-3.5 py-1.5 font-label-md text-text-secondary transition-colors hover:bg-surface-container">
                      Đặt lại bộ lọc
                    </button>
                    <button type="button" className="rounded-lg bg-primary px-4 py-1.5 font-label-md text-on-primary transition-colors hover:bg-primary-container">
                      Áp dụng lọc (1.482 kết quả)
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-12">
                <div className="flex flex-col overflow-hidden rounded-xl bg-surface-card shadow-sm lg:col-span-8">
                  <div className="flex items-center justify-between border-b border-surface-border bg-surface-subtle px-5 py-3.5">
                    <div className="flex items-center gap-2 font-label-md font-semibold text-text-primary">
                      <span className="material-symbols-outlined text-[18px] text-text-secondary">table_rows</span>
                      <span>Danh sách Sự kiện Nhật ký (Audit Trail)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-body-sm text-text-muted">Tự động đồng bộ mỗi 30s</span>
                      <button type="button" aria-label="Tải lại dữ liệu" className="rounded p-1 text-text-secondary hover:bg-surface-container">
                        <span className="material-symbols-outlined text-[16px]">sync</span>
                      </button>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left font-body-md text-table-cell">
                      <thead>
                        <tr className="border-b border-surface-border bg-surface-canvas text-text-secondary">
                          <th className="w-[165px] px-4 py-3 font-label-sm">Thời gian ghi nhận</th>
                          <th className="w-[190px] px-4 py-3 font-label-sm">Người thực hiện</th>
                          <th className="w-[150px] px-4 py-3 font-label-sm">Hành động</th>
                          <th className="w-[160px] px-4 py-3 font-label-sm">Đối tượng tác động</th>
                          <th className="px-4 py-3 font-label-sm">Tóm tắt biến động</th>
                          <th className="w-[150px] px-4 py-3 font-label-sm">IP &amp; Thiết bị</th>
                          <th className="w-[90px] px-4 py-3 text-right font-label-sm">Chi tiết</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-surface-border">
                        {[
                          {
                            time: "09/10/2026\n14:32:10 (ICT)",
                            actor: "Trần Thị Thủ kho",
                            role: "Thủ kho chi nhánh HN",
                            badge: "Điều chỉnh tồn kho",
                            badgeClass: "bg-status-amber-bg text-status-amber-text",
                            object: "SKU: DLF-BK-009-PB",
                            objectSub: "Sách: Cội Nguồn Văn Minh",
                            summary: "Tồn kho: 45 ➔ 50 +5 cuốn",
                            note: "Lý do: Kiểm kê nhập bù do rách bìa",
                            ip: "14.241.12.88",
                            device: "Chrome · Mac OS",
                            active: true,
                            tag: "status-emerald-text",
                          },
                          {
                            time: "09/10/2026\n14:18:45 (ICT)",
                            actor: "Lê Văn Kế toán",
                            role: "Kế toán thanh toán",
                            badge: "Duyệt thanh toán",
                            badgeClass: "bg-status-emerald-bg text-status-emerald-text",
                            object: "Đơn #DLF-88421",
                            objectSub: "Khách: Trần Mai Lan",
                            summary: "Khớp đối soát chuyển khoản VCB: 285.000 ₫",
                            note: "Trạng thái: Chưa thanh toán ➔ Đã TT",
                            ip: "118.70.198.42",
                            device: "Edge · Windows 11",
                            active: false,
                          },
                          {
                            time: "09/10/2026\n13:50:02 (ICT)",
                            actor: "Nguyễn Quản Trị",
                            role: "Superadmin / Owner",
                            badge: "Thay đổi phân quyền",
                            badgeClass: "bg-status-rose-bg text-status-rose-text",
                            object: "hoang.nv@dalifabooks.vn",
                            objectSub: "Nhân sự: Nguyễn Vũ Hoàng",
                            summary: "Thêm quyền: finance.reconcile, finance.export",
                            note: "Lý do: Phân công bàn giao ca kiểm toán quý 4",
                            ip: "171.244.18.90",
                            device: "Safari · Mac OS",
                            active: false,
                          },
                          {
                            time: "09/10/2026\n13:12:11 (ICT)",
                            actor: "Worker: Auto-Sync",
                            role: "Daemon Vận Chuyển",
                            badge: "Xuất kho giao hàng",
                            badgeClass: "bg-status-sky-bg text-status-sky-text",
                            object: "Đơn #DLF-88390",
                            objectSub: "Mã vận đơn: GHN-9982412",
                            summary: "Bàn giao 1 kiện hàng cho đơn vị GHN Express",
                            note: "Trạng thái: Đang đóng gói ➔ Đang giao",
                            ip: "10.0.4.12 (Internal)",
                            device: "Golang Daemon v2.1",
                            active: false,
                          },
                          {
                            time: "09/10/2026\n11:05:40 (ICT)",
                            actor: "Trần Thị Thủ kho",
                            role: "Thủ kho chi nhánh HN",
                            badge: "Điều chỉnh tồn kho",
                            badgeClass: "bg-status-amber-bg text-status-amber-text",
                            object: "SKU: DLF-BK-003-HC",
                            objectSub: "Sách: Lịch Sử Vạn Vật",
                            summary: "Tồn kho: 120 ➔ 100 -20 cuốn",
                            note: "Lý do: Xuất chuyển kho chi nhánh TP.HCM",
                            ip: "14.241.12.88",
                            device: "Chrome · Mac OS",
                            active: false,
                          },
                        ].map((row) => (
                          <tr key={row.time} className={row.active ? "bg-surface-subtle/80 hover:bg-surface-container-low" : "transition-colors hover:bg-surface-canvas"}>
                            <td className="align-top px-4 py-3.5">
                              <div className="font-label-md text-text-primary">{row.time.split("\n")[0]}</div>
                              <div className="text-xs font-body-sm text-text-muted">{row.time.split("\n")[1]}</div>
                            </td>
                            <td className="align-top px-4 py-3.5">
                              <div className="flex items-center gap-2.5">
                                <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${row.actor.includes("Trần Thị") ? "bg-status-amber-bg text-status-amber-text" : row.actor.includes("Lê Văn") ? "bg-status-sky-bg text-status-sky-text" : row.actor.includes("Nguyễn") ? "bg-primary text-on-primary" : row.actor.includes("Worker") ? "bg-status-neutral-bg text-status-neutral-text" : "bg-surface-subtle text-text-primary"}`}>
                                  {row.actor.slice(0, 2).toUpperCase()}
                                </div>
                                <div className="min-w-0">
                                  <div className="truncate font-label-md text-text-primary">{row.actor}</div>
                                  <div className="truncate text-xs font-body-sm text-text-muted">{row.role}</div>
                                </div>
                              </div>
                            </td>
                            <td className="align-top px-4 py-3.5">
                              <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-label-sm font-semibold ${row.badgeClass}`}>
                                <span className={`mr-1 h-1.5 w-1.5 rounded-full ${row.badgeClass.includes("amber") ? "bg-status-amber-text" : row.badgeClass.includes("emerald") ? "bg-status-emerald-text" : row.badgeClass.includes("rose") ? "bg-status-rose-text" : "bg-status-sky-text"}`} />
                                {row.badge}
                              </span>
                            </td>
                            <td className="align-top px-4 py-3.5">
                              <div className="font-label-md text-text-primary">{row.object}</div>
                              <div className="truncate text-xs font-body-sm text-text-muted">{row.objectSub}</div>
                            </td>
                            <td className="align-top px-4 py-3.5">
                              <div className="font-body-sm text-text-primary">{row.summary}</div>
                              <div className="mt-0.5 text-xs font-body-sm text-text-muted">{row.note}</div>
                            </td>
                            <td className="align-top px-4 py-3.5">
                              <div className="font-mono text-xs font-body-sm text-text-primary">{row.ip}</div>
                              <div className="truncate text-xs font-body-sm text-text-muted">{row.device}</div>
                            </td>
                            <td className="px-4 py-3.5 text-right align-top">
                              <button type="button" className={`inline-flex items-center justify-center rounded-lg p-1.5 ${row.active ? "bg-primary text-on-primary shadow-sm hover:bg-primary-container" : "bg-surface-subtle text-text-secondary hover:bg-surface-container"}`} title="Xem đối chiếu chi tiết">
                                <span className="material-symbols-outlined text-[16px]">visibility</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex flex-col items-center justify-between gap-3 border-t border-surface-border bg-surface-card px-5 py-3.5 sm:flex-row">
                    <div className="font-body-sm text-text-muted">
                      Hiển thị <span className="font-semibold text-text-primary">1 - 20</span> trong tổng số <span className="font-semibold text-text-primary">1.482</span> bản ghi kiểm toán
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button type="button" disabled className="cursor-not-allowed rounded border border-surface-border px-2.5 py-1.5 font-label-sm text-text-muted opacity-50">Trang trước</button>
                      <button type="button" className="flex h-8 w-8 items-center justify-center rounded bg-primary font-label-sm font-semibold text-on-primary">1</button>
                      <button type="button" className="flex h-8 w-8 items-center justify-center rounded font-label-sm text-text-secondary hover:bg-surface-subtle">2</button>
                      <button type="button" className="flex h-8 w-8 items-center justify-center rounded font-label-sm text-text-secondary hover:bg-surface-subtle">3</button>
                      <span className="px-1 text-text-muted">...</span>
                      <button type="button" className="flex h-8 w-8 items-center justify-center rounded font-label-sm text-text-secondary hover:bg-surface-subtle">75</button>
                      <button type="button" className="rounded border border-surface-border px-2.5 py-1.5 font-label-sm text-text-secondary hover:bg-surface-subtle">Trang sau</button>
                    </div>
                  </div>
                </div>

                <div className="sticky top-20 overflow-hidden rounded-xl border border-surface-border bg-surface-card lg:col-span-4">
                  <div className="flex items-center justify-between bg-primary px-5 py-4 text-on-primary">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-label-sm uppercase tracking-wider text-primary-fixed">Chi tiết Kiểm toán</span>
                        <span className="rounded bg-surface-card/20 px-1.5 py-0.2 font-mono text-[10px] text-on-primary">HASH: e89b7f1</span>
                      </div>
                      <h2 className="font-headline-sm text-on-primary">#AUD-2026-9941</h2>
                    </div>
                    <div className="flex items-center gap-1">
                      <button type="button" title="Sao chép mã kiểm toán" className="rounded p-1.5 text-on-primary hover:bg-primary-container">
                        <span className="material-symbols-outlined text-[18px]">content_copy</span>
                      </button>
                      <button type="button" title="Đóng bảng chi tiết" className="rounded p-1.5 text-on-primary hover:bg-primary-container">
                        <span className="material-symbols-outlined text-[18px]">close</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4 p-5">
                    <div className="space-y-2 rounded-lg bg-surface-canvas p-3 text-xs">
                      <div className="flex justify-between">
                        <span className="text-text-muted">Thời điểm ghi nhận:</span>
                        <span className="font-medium text-text-primary">09/10/2026 14:32:10 (ICT)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-muted">Nhân viên thao tác:</span>
                        <span className="font-medium text-text-primary">Trần Thị Thủ kho (ID: STF-042)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-muted">Địa chỉ mạng IP:</span>
                        <span className="font-mono text-text-primary">14.241.12.88 (VNPT Hanoi)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-muted">Mã Request ID:</span>
                        <span className="max-w-[180px] truncate font-mono text-text-primary">req_99df7182ba012</span>
                      </div>
                      <div className="flex flex-col gap-1 border-t border-surface-border pt-1.5">
                        <span className="text-text-muted">Lý do điều chỉnh (Audit Note):</span>
                        <span className="rounded border border-surface-border bg-surface-card p-2 font-body-sm text-text-primary italic">
                          “Kiểm kê cuối ca và bù 5 cuốn sách hư hỏng do vận chuyển nội bộ kho Hà Nội.”
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-label-sm uppercase tracking-wide text-text-primary">So sánh dữ liệu biến động (Audit Diff)</span>
                        <span className="rounded bg-status-emerald-bg px-2 py-0.5 text-[10px] font-bold text-status-emerald-text">1 TRƯỜNG THAY ĐỔI</span>
                      </div>

                      <div className="overflow-hidden rounded-lg border border-surface-border text-xs">
                        <div className="space-y-2 border-b border-surface-border bg-surface-card p-3">
                          <div className="flex items-center justify-between">
                            <span className="font-mono font-bold text-text-primary">inventory.on_hand (Số tồn kho thực tế)</span>
                            <span className="rounded bg-status-emerald-bg px-1.5 py-0.5 font-semibold text-status-emerald-text">+5</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="rounded border border-status-rose-bg bg-status-rose-bg/40 p-2 text-status-rose-text">
                              <span className="block text-[10px] uppercase text-text-muted">Trước thao tác</span>
                              <span className="font-mono text-sm font-bold">45</span>
                            </div>
                            <div className="rounded border border-status-emerald-bg bg-status-emerald-bg/40 p-2 text-status-emerald-text">
                              <span className="block text-[10px] uppercase text-text-muted">Sau thao tác</span>
                              <span className="font-mono text-sm font-bold">50</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-1 border-b border-surface-border bg-surface-card p-3">
                          <div className="font-mono font-bold text-text-primary">inventory.adjustment_reason</div>
                          <div className="rounded bg-surface-subtle p-2 font-body-sm text-text-secondary">Kiểm kê bù số lượng nhập kho</div>
                        </div>

                        <div className="flex items-center justify-between bg-surface-card p-3 text-text-muted">
                          <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[15px]">verified_user</span>
                            <span className="font-mono text-[11px]">session_token &amp; credentials</span>
                          </div>
                          <span className="rounded bg-surface-subtle px-2 py-0.5 font-mono text-[11px]">[REDACTED - BẢO MẬT]</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <button type="button" className="flex-1 rounded-lg bg-surface-subtle px-3 py-2 font-label-md text-text-secondary transition-colors hover:bg-surface-container">
                        Tải bản ghi JSON
                      </button>
                      <button type="button" className="flex-1 rounded-lg bg-primary px-3 py-2 font-label-md text-on-primary transition-colors hover:bg-primary-container">
                        Khóa vết kiểm toán
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </AdminPageShell>
  );
}
