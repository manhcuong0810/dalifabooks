export default function HeroBanner() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-stretch">

      {/* Main Billboard */}
      <div className="lg:col-span-8 relative rounded-xl overflow-hidden shadow-sm bg-primary text-on-primary min-h-[440px] flex flex-col justify-end p-space-xl">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD-nYljsu7BirNF3ORppqJ71ug3l5LYc0-rkaaM1oMfddHrGnBUt2FwBkbDsGHWn2Qe63foVwqE_DMq-6gK1gaip7LKbgeInu7ZjQJJvwVCElMkwc-jRRtw21118p9abIc032bBxdDHOprH_8dle6zImC0dqOtakmirNxbUX5INjddkRS__Tv1lfQQPiBu0nyEkFNUDIxBVYLSSktaIQam5hx9dJiiq7f1P_miiVWjHn9l_wyD8Hjdo')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/75 to-transparent" />

        {/* Content */}
        <div className="relative z-10 flex flex-col max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/90 text-on-secondary-container text-label-sm font-label-sm w-fit mb-space-md shadow-sm">
            <span className="material-symbols-outlined text-[16px]">auto_stories</span>
            <span>Tuần Lễ Tôn Vinh Văn Hóa Đọc Việt Nam</span>
          </div>

          <h1 className="font-display-hero text-display-hero text-on-primary mb-space-sm leading-tight tracking-tight">
            Khơi nguồn tri thức — Chạm tới ước mơ
          </h1>

          <p className="font-body-lg text-body-lg text-on-primary/90 mb-space-lg leading-relaxed">
            Đắm mình trong không gian chữ nghĩa tinh tuyển. Hơn 500 tựa sách văn học, tư tưởng và phát triển bản thân với ưu đãi đặc quyền lên tới 40%.
          </p>

          <div className="flex flex-wrap items-center gap-space-md">
            <a
              href="/books"
              className="px-6 py-3 rounded-lg bg-secondary-container text-on-primary font-label-md text-label-md font-semibold hover:bg-secondary transition-all shadow-md flex items-center gap-2"
            >
              <span>Khám phá ngay</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </a>
            <a
              href="/books?sort=new"
              className="px-6 py-3 rounded-lg bg-surface-card/15 backdrop-blur-md text-on-primary font-label-md text-label-md font-medium hover:bg-surface-card/25 transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">collections_bookmark</span>
              <span>Xem tuyển tập mới</span>
            </a>
          </div>
        </div>

        {/* Dots */}
        <div className="absolute bottom-5 right-6 z-10 flex items-center gap-1.5">
          <span className="w-7 h-2 rounded-full bg-secondary-container" />
          <span className="w-2 h-2 rounded-full bg-on-primary/40" />
          <span className="w-2 h-2 rounded-full bg-on-primary/40" />
        </div>
      </div>

      {/* Privilege Cards */}
      <div className="lg:col-span-4 flex flex-col justify-between gap-space-md">
        {[
          {
            icon: "local_shipping",
            iconBg: "bg-surface-container-high text-primary",
            title: "Miễn phí vận chuyển",
            desc: "Đơn hàng từ 250.000đ khắp mọi miền tổ quốc. Đóng gói hộp carton 3 lớp bảo vệ mép sách.",
          },
          {
            icon: "bookmark_heart",
            iconBg: "bg-status-amber-bg text-status-amber-text",
            title: "Bookmark mỹ thuật",
            desc: "Tặng kèm thẻ đánh dấu sách vẽ màu nước độc bản của các hoạ sĩ DalifaBooks cho mỗi đơn hàng.",
          },
          {
            icon: "published_with_changes",
            iconBg: "bg-status-emerald-bg text-status-emerald-text",
            title: "Đổi trả 7 ngày linh hoạt",
            desc: "Cam kết 100% sách chính hãng bản quyền. Đổi mới ngay lập tức nếu lỗi in ấn, nhăn gáy hoặc dập góc.",
          },
        ].map((card) => (
          <div
            key={card.title}
            className="flex-1 bg-surface-card rounded-xl p-space-lg shadow-sm flex items-start gap-space-md hover:shadow-md transition-shadow"
          >
            <div className={`w-12 h-12 rounded-lg ${card.iconBg} flex items-center justify-center shrink-0`}>
              <span className="material-symbols-outlined text-[26px]">{card.icon}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-text-primary leading-tight">{card.title}</span>
              <p className="font-body-sm text-body-sm text-text-secondary mt-1">{card.desc}</p>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
