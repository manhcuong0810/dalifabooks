"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const sidebarSections = [
  {
    title: "Vận hành",
    items: [
      { label: "Dashboard tổng quan", href: "/admin/dashboard", icon: "space_dashboard" },
      { label: "Nhật ký Audit Log", href: "/admin/audit", icon: "history_edu" },
    ],
  },
  {
    title: "Quản lý Sách",
    items: [
      { label: "Cây Danh mục", href: "/admin/categories", icon: "account_tree" },
      { label: "Tác giả & Dịch giả", href: "/admin/authors", icon: "edit_note" },
      { label: "Nhà xuất bản", href: "/admin/publishers", icon: "domain" },
      { label: "Danh sách Sách", href: "/admin/books", icon: "menu_book" },
    ],
  },
  {
    title: "Kho hàng",
    items: [{ label: "Quản lý Tồn kho", href: "/admin/inventory", icon: "inventory_2" }],
  },
  {
    title: "Đơn hàng & Vận chuyển",
    items: [
      { label: "Đơn hàng", href: "/admin/orders", icon: "shopping_bag" },
      { label: "Vận đơn & Giao hàng", href: "/admin/shipping", icon: "local_shipping" },
    ],
  },
  {
    title: "Tài chính",
    items: [
      { label: "Đối soát thanh toán", href: "/admin/payments", icon: "receipt_long" },
      { label: "Hoàn tiền & Giao dịch", href: "/admin/transactions", icon: "currency_exchange" },
    ],
  },
  {
    title: "Khuyến mãi & Nội dung",
    items: [
      { label: "Mã giảm giá", href: "/admin/promotions", icon: "sell" },
      { label: "Bài viết", href: "/admin/posts", icon: "article" },
      { label: "Banner & Bộ sưu tập", href: "/admin/banners", icon: "view_carousel" },
      { label: "Thư viện Media", href: "/admin/media", icon: "perm_media" },
    ],
  },
  {
    title: "Hệ thống",
    items: [
      { label: "Cấu hình hệ thống", href: "/admin/settings", icon: "settings" },
      { label: "Quản lý nhân sự & Phân quyền", href: "/admin/staff", icon: "admin_panel_settings" },
    ],
  },
];

export function AdminSidebar({ activePath }: { activePath?: string }) {
  const pathname = usePathname();
  const currentPath = activePath ?? pathname;

  return (
    <aside className="fixed bottom-0 left-0 top-0 z-50 flex w-64 flex-col overflow-y-auto bg-surface-card shadow-[0_1px_12px_rgba(0,0,0,0.06)]">
      <div className="flex h-16 shrink-0 items-center justify-between bg-surface-subtle px-4">
        <div className="flex items-center gap-2.5">
          <img
            alt="DalifaBooks Logo"
            className="h-8 w-auto object-contain"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZlfZGRF9yqwFBt4zY-nPOHAo6Rg7CUZOyn_aYEPOEJYFIA8c_cj8o6eHoKxGHx43YhyD8Z3EGXDDha0vTBxlB7-dUvQDhDZJ2-C9L1lrRnl0y-NmE-reJUBBnhV1-y2PKFR7dgdpIY57xOB_8RudYiMYhaYg9JoeU3ALEhll0QAR9VR5QYlSurOxAPkoddin9gyC2L1xCdXedYQbdksJRRB6Np9w_ddJIUVVUdfwgEGoe3X4tdBTwMvD83We6WqhUfA"
          />
          <div className="flex flex-col leading-none">
            <span className="text-[13px] font-bold tracking-tight text-primary">CMS HUB</span>
            <span className="mt-0.5 text-[10px] text-text-muted">DalifaBooks</span>
          </div>
        </div>
        <span className="rounded bg-primary px-2 py-0.5 text-[11px] font-semibold tracking-wide text-on-primary">MASTER</span>
      </div>

      <div className="space-y-4 px-3 py-3">
        {sidebarSections.map((section) => (
          <div key={section.title} className="space-y-1">
            <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-text-muted">{section.title}</div>
            <nav className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = item.href === currentPath;

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-label-md font-label-md transition-colors ${
                      isActive
                        ? "bg-primary font-semibold text-on-primary shadow-sm"
                        : "text-text-secondary hover:bg-surface-subtle hover:text-on-surface"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                    <span className="truncate">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      <div className="mt-auto shrink-0 bg-surface-subtle/70 p-4">
        <div className="flex items-center justify-between text-[11px] font-body-sm text-text-muted">
          <span>Phiên bản CMS v2.4</span>
          <span className="flex items-center font-semibold text-status-emerald-text">
            <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-status-emerald-text" />
            Trực tuyến
          </span>
        </div>
      </div>
    </aside>
  );
}
