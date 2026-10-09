const CATEGORIES = [
  { icon: "menu_book",       label: "Văn học kinh điển",      count: "1.240 tựa" },
  { icon: "trending_up",     label: "Kinh tế & Khởi nghiệp",  count: "860 tựa"   },
  { icon: "self_improvement",label: "Phát triển bản thân",    count: "620 tựa"   },
  { icon: "psychology",      label: "Tâm lý học hành vi",     count: "450 tựa"   },
  { icon: "biotech",         label: "Khoa học - Đổi mới",     count: "380 tựa"   },
  { icon: "child_care",      label: "Thiếu nhi & Nuôi dạy",   count: "540 tựa"   },
  { icon: "account_balance", label: "Lịch sử - Triết học",    count: "490 tựa"   },
];

export default function CategoryGrid() {
  return (
    <section className="flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg gap-2">
        <div>
          <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-semibold block mb-1">
            Khám phá theo lĩnh vực
          </span>
          <h2 className="font-headline-lg text-headline-lg text-text-primary">Danh mục sách tuyển chọn</h2>
        </div>
        <a
          href="/books"
          className="font-label-md text-label-md text-primary hover:text-secondary flex items-center gap-1 font-semibold group"
        >
          <span>Xem tất cả danh mục</span>
          <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
        </a>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-space-md">
        {CATEGORIES.map((cat) => (
          <a
            key={cat.label}
            href="/books"
            className="bg-surface-card rounded-xl p-space-md shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex flex-col items-center text-center group"
          >
            <div className="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors mb-space-sm">
              <span className="material-symbols-outlined text-[28px]">{cat.icon}</span>
            </div>
            <span className="font-label-md text-label-md font-semibold text-text-primary group-hover:text-primary transition-colors">
              {cat.label}
            </span>
            <span className="font-body-sm text-body-sm text-text-muted mt-1">{cat.count}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
