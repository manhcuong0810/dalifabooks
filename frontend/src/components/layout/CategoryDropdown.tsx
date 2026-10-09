"use client";

import { useState } from "react";

const CATEGORIES = [
  { icon: "menu_book",        label: "Văn học Kinh điển & Hiện đại", count: "1.240 tựa", slug: "van-hoc" },
  { icon: "trending_up",      label: "Kinh tế & Khởi nghiệp",        count: "860 tựa",   slug: "kinh-te" },
  { icon: "self_improvement", label: "Phát triển bản thân",          count: "620 tựa",   slug: "phat-trien-ban-than" },
  { icon: "psychology",       label: "Tâm lý học hành vi",           count: "450 tựa",   slug: "tam-ly-hoc" },
  { icon: "biotech",          label: "Khoa học - Đổi mới",           count: "380 tựa",   slug: "khoa-hoc" },
  { icon: "child_care",       label: "Thiếu nhi & Nuôi dạy",         count: "540 tựa",   slug: "thieu-nhi" },
  { icon: "account_balance",  label: "Lịch sử - Triết học",          count: "490 tựa",   slug: "lich-su-triet-hoc" },
];

export default function CategoryDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Trigger button */}
      <button
        className="px-3.5 py-2 rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-subtle hover:text-on-surface transition-all whitespace-nowrap flex items-center gap-1"
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <span>Danh mục sách</span>
        <span
          className="material-symbols-outlined text-[16px] transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          expand_more
        </span>
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute top-full left-0 pt-1 z-50 min-w-[280px]">
          <div className="bg-surface-card rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.14)] border border-surface-border overflow-hidden">

            <div className="px-4 pt-3 pb-2">
              <span className="font-label-sm text-label-sm text-text-muted uppercase tracking-widest">Khám phá theo lĩnh vực</span>
            </div>

            {CATEGORIES.map((cat) => (
              <CategoryItem key={cat.slug} cat={cat} />
            ))}

            <div className="border-t border-surface-border px-4 py-2.5">
              <a
                href="/books"
                className="flex items-center gap-2 font-label-md text-label-md text-primary hover:text-secondary font-semibold transition-colors"
              >
                <span>Xem toàn bộ danh mục</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CategoryItem({ cat }: { cat: typeof CATEGORIES[number] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={`/books/${cat.slug}`}
      className="flex items-center gap-3 px-4 py-2.5 transition-colors"
      style={{ backgroundColor: hovered ? "var(--surface-subtle, #F1F5F9)" : "transparent" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors shrink-0"
        style={{
          backgroundColor: hovered ? "#001428" : "#e5eeff",
          color: hovered ? "#ffffff" : "#001428",
        }}
      >
        <span className="material-symbols-outlined text-[18px]">{cat.icon}</span>
      </div>
      <div className="flex-1 min-w-0">
        <span
          className="font-label-md text-label-md block transition-colors"
          style={{ color: hovered ? "#001428" : "#0F172A" }}
        >
          {cat.label}
        </span>
        <span className="font-body-sm text-body-sm text-text-muted">{cat.count}</span>
      </div>
      <span
        className="material-symbols-outlined text-[16px] text-text-muted transition-opacity"
        style={{ opacity: hovered ? 1 : 0 }}
      >
        chevron_right
      </span>
    </a>
  );
}
