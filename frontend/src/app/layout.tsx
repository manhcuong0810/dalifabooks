import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DalifaBooks - Nhà sách trực tuyến văn hóa & tri thức",
  description: "DalifaBooks — nền tảng phân phối sách văn hóa, tư tưởng, khoa học và văn học cao cấp tại Việt Nam.",
};

const TAILWIND_CONFIG = `
tailwind.config = { darkMode: "class", theme: { extend: { "colors": { "tertiary": "#00170d", "primary": "#001428", "surface-border": "#E2E8F0", "on-tertiary-fixed": "#002114", "surface-bright": "#f8f9ff", "on-primary": "#ffffff", "secondary-fixed-dim": "#ffb77d", "primary-fixed": "#d1e4ff", "on-secondary-fixed-variant": "#6e3900", "status-rose-bg": "#FFE4E6", "tertiary-container": "#002e1d", "text-primary": "#0F172A", "surface-subtle": "#F1F5F9", "surface": "#f8f9ff", "on-surface": "#0b1c30", "surface-dim": "#cbdbf5", "on-tertiary": "#ffffff", "status-sky-bg": "#E0F2FE", "surface-container-highest": "#d3e4fe", "on-secondary-container": "#663500", "text-muted": "#94A3B8", "surface-container-low": "#eff4ff", "tertiary-fixed": "#85f8c4", "surface-container": "#e5eeff", "surface-border-strong": "#CBD5E1", "status-amber-bg": "#FEF3C7", "on-tertiary-container": "#21a173", "inverse-primary": "#b0c9e8", "on-secondary": "#ffffff", "error-container": "#ffdad6", "outline-variant": "#c3c6ce", "status-emerald-bg": "#D1FAE5", "on-surface-variant": "#43474d", "primary-container": "#0f2942", "on-secondary-fixed": "#2f1500", "status-emerald-text": "#065F46", "status-neutral-bg": "#F1F5F9", "status-neutral-text": "#334155", "background": "#f8f9ff", "status-sky-text": "#075985", "tertiary-fixed-dim": "#68dba9", "on-primary-fixed-variant": "#314863", "on-error": "#ffffff", "on-tertiary-fixed-variant": "#005137", "surface-container-high": "#dce9ff", "primary-fixed-dim": "#b0c9e8", "surface-card": "#FFFFFF", "surface-container-lowest": "#ffffff", "on-error-container": "#93000a", "secondary-fixed": "#ffdcc3", "secondary-container": "#fe932c", "surface-canvas": "#F8FAFC", "inverse-on-surface": "#eaf1ff", "error": "#ba1a1a", "on-primary-container": "#7991af", "surface-tint": "#49607c", "surface-variant": "#d3e4fe", "on-primary-fixed": "#011d35", "on-background": "#0b1c30", "inverse-surface": "#213145", "text-secondary": "#475569", "status-amber-text": "#92400E", "secondary": "#904d00", "status-rose-text": "#9F1239", "outline": "#74777e" }, "borderRadius": { "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px" }, "spacing": { "space-sm": "0.5rem", "space-2xl": "3rem", "space-md": "1rem", "gutter-desktop": "1.5rem", "margin-desktop": "2rem", "space-xs": "0.25rem", "space-lg": "1.5rem", "margin": "1rem", "gutter": "1rem", "space-xl": "2rem" }, "fontFamily": { "headline-lg-mobile": [ "Be Vietnam Pro" ], "label-sm": [ "Be Vietnam Pro" ], "body-lg": [ "Be Vietnam Pro" ], "display-hero-mobile": [ "Be Vietnam Pro" ], "body-md": [ "Be Vietnam Pro" ], "headline-sm": [ "Be Vietnam Pro" ], "headline-md": [ "Be Vietnam Pro" ], "table-cell": [ "Be Vietnam Pro" ], "price-md": [ "Be Vietnam Pro" ], "display-hero": [ "Be Vietnam Pro" ], "body-sm": [ "Be Vietnam Pro" ], "label-md": [ "Be Vietnam Pro" ], "price-lg": [ "Be Vietnam Pro" ], "headline-lg": [ "Be Vietnam Pro" ] }, "fontSize": { "headline-lg-mobile": [ "24px", { "lineHeight": "32px", "letterSpacing": "-0.01em", "fontWeight": "600" } ], "label-sm": [ "12px", { "lineHeight": "16px", "letterSpacing": "0.02em", "fontWeight": "600" } ], "body-lg": [ "16px", { "lineHeight": "24px", "fontWeight": "400" } ], "display-hero-mobile": [ "28px", { "lineHeight": "36px", "letterSpacing": "-0.01em", "fontWeight": "700" } ], "body-md": [ "14px", { "lineHeight": "20px", "fontWeight": "400" } ], "headline-sm": [ "18px", { "lineHeight": "24px", "fontWeight": "600" } ], "headline-md": [ "22px", { "lineHeight": "28px", "letterSpacing": "-0.01em", "fontWeight": "600" } ], "table-cell": [ "14px", { "lineHeight": "20px", "fontWeight": "400" } ], "price-md": [ "16px", { "lineHeight": "22px", "fontWeight": "700" } ], "display-hero": [ "40px", { "lineHeight": "48px", "letterSpacing": "-0.02em", "fontWeight": "700" } ], "body-sm": [ "13px", { "lineHeight": "18px", "fontWeight": "400" } ], "label-md": [ "14px", { "lineHeight": "20px", "fontWeight": "500" } ], "price-lg": [ "20px", { "lineHeight": "26px", "fontWeight": "700" } ], "headline-lg": [ "30px", { "lineHeight": "38px", "letterSpacing": "-0.015em", "fontWeight": "700" } ] } } } };
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        {/* Tailwind CDN — giống hệt file HTML gốc để màu sắc đúng */}
        <script src="https://cdn.tailwindcss.com" />
        <script
          id="tailwind-config"
          dangerouslySetInnerHTML={{ __html: TAILWIND_CONFIG }}
        />
      </head>
      <body className="bg-surface font-body-md text-on-surface antialiased">
        {children}
      </body>
    </html>
  );
}
