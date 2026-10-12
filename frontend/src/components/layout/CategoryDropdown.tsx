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

// Design tokens khớp với tailwind config gốc
const C = {
  primary:          "#001428",
  primaryContainer: "#0f2942",
  onPrimary:        "#ffffff",
  secondary:        "#904d00",
  secondaryContainer: "#fe932c",
  surface:          "#f8f9ff",
  surfaceCard:      "#FFFFFF",
  surfaceSubtle:    "#F1F5F9",
  surfaceContainer: "#e5eeff",
  textPrimary:      "#0F172A",
  textSecondary:    "#475569",
  textMuted:        "#94A3B8",
  border:           "#E2E8F0",
};

export default function CategoryDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{ position: "relative", zIndex: 1100 }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {/* Trigger */}
      <button
        type="button"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          padding: "8px 14px",
          borderRadius: "8px",
          fontSize: "14px",
          fontWeight: 500,
          lineHeight: "20px",
          color: open ? C.primary : C.textSecondary,
          background: open ? C.surfaceSubtle : "transparent",
          border: "none",
          cursor: "pointer",
          whiteSpace: "nowrap",
          fontFamily: "Be Vietnam Pro, sans-serif",
          transition: "background 0.15s, color 0.15s",
        }}
      >
        <span>Danh mục sách</span>
        <span
          className="material-symbols-outlined"
          style={{
            fontSize: "16px",
            display: "inline-flex",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
          }}
        >
          expand_more
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            zIndex: 1200,
            minWidth: "300px",
            overflow: "visible",
          }}
        >
          <div
            style={{
              background: C.surfaceCard,
              borderRadius: "12px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.14)",
              border: `1px solid ${C.border}`,
              overflow: "visible",
            }}
          >
            {/* Header label */}
            <div style={{ padding: "12px 16px 8px" }}>
              <span style={{
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: C.textMuted,
                fontFamily: "Be Vietnam Pro, sans-serif",
              }}>
                Khám phá theo lĩnh vực
              </span>
            </div>

            {/* Items */}
            {CATEGORIES.map((cat) => (
              <CategoryItem key={cat.slug} cat={cat} />
            ))}

            {/* Footer link */}
            <div style={{ borderTop: `1px solid ${C.border}`, padding: "10px 16px" }}>
              <a
                href="/books"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: C.primary,
                  textDecoration: "none",
                  fontFamily: "Be Vietnam Pro, sans-serif",
                }}
              >
                <span>Xem toàn bộ danh mục</span>
                <span className="material-symbols-outlined" style={{ fontSize: "16px", display: "inline-flex" }}>arrow_forward</span>
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
      href={`/books?category=${encodeURIComponent(cat.slug)}`}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "10px 16px",
        textDecoration: "none",
        background: hovered ? C.surfaceSubtle : "transparent",
        transition: "background 0.12s",
        cursor: "pointer",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Icon box */}
      <div style={{
        width: "32px",
        height: "32px",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        background: hovered ? C.primary : C.surfaceContainer,
        color: hovered ? C.onPrimary : C.primary,
        transition: "background 0.12s, color 0.12s",
      }}>
        <span className="material-symbols-outlined" style={{ fontSize: "18px", display: "inline-flex" }}>{cat.icon}</span>
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <span style={{
          display: "block",
          fontSize: "14px",
          fontWeight: 500,
          color: hovered ? C.primary : C.textPrimary,
          fontFamily: "Be Vietnam Pro, sans-serif",
          transition: "color 0.12s",
        }}>
          {cat.label}
        </span>
        <span style={{
          fontSize: "12px",
          color: C.textMuted,
          fontFamily: "Be Vietnam Pro, sans-serif",
        }}>
          {cat.count}
        </span>
      </div>

      {/* Arrow */}
      <span
        className="material-symbols-outlined"
        style={{
          fontSize: "16px",
          display: "inline-flex",
          color: C.textMuted,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.12s",
        }}
      >
        chevron_right
      </span>
    </a>
  );
}
