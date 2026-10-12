import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const pillars = [
  {
    title: "Sách tuyển chọn",
    text: "Khuyến khích độc giả tiếp cận những áng văn, triết lý và tư duy có chiều sâu, đi cùng thời đại nhưng không bị gục xuống trong biến động.",
    icon: "menu_book",
  },
  {
    title: "Tôn trọng nguyên tác",
    text: "Mỗi ấn phẩm đều trải qua quy trình biên tập, dịch thuật và kiểm định chất lượng nghiêm ngặt để bảo toàn tinh thần của nguyên bản.",
    icon: "verified",
  },
  {
    title: "Cộng đồng đọc",
    text: "DalifaBooks tạo ra không gian để bạn đọc cùng nhau suy ngẫm, tìm kiếm và nuôi dưỡng thói quen đọc sách bền vững.",
    icon: "groups",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-surface min-h-screen text-on-surface antialiased">
      <Header active="about" />

      <main className="w-full min-h-[calc(100vh-160px)] bg-surface pt-[160px]">
        <section className="relative overflow-hidden border-b border-surface-border bg-gradient-to-r from-primary via-primary-container to-primary px-margin-desktop py-space-2xl text-on-primary">
          <div className="pointer-events-none absolute -right-1 top-0 hidden opacity-10 md:block">
            <span className="material-symbols-outlined text-[320px] leading-none text-on-primary">menu_book</span>
          </div>
          <div className="relative z-10 mx-auto flex max-w-[1200px] flex-col items-center justify-center text-center">
            <div className="mb-space-md inline-flex items-center gap-2 rounded-full border border-surface-border/20 bg-surface-card/10 px-3.5 py-1 text-body-sm font-body-sm text-surface-container-high backdrop-blur-xl">
              <Link className="hover:text-secondary-fixed transition-colors" href="/">
                Trang chủ
              </Link>
              <span className="opacity-40">/</span>
              <span className="font-medium text-on-primary">Giới thiệu</span>
            </div>
            <h1 className="mb-2 font-headline-lg text-[32px] font-bold tracking-tight text-on-primary md:text-[36px]">
              Hành Trình Tri Thức &amp; Văn Hóa Đọc
            </h1>
            <div className="mb-space-md flex items-center gap-2 text-headline-sm font-headline-sm font-semibold uppercase tracking-wider text-secondary-fixed">
              <span className="hidden h-[1px] w-5 bg-secondary-fixed/60 sm:block" />
              <span>Inspire · Ignite · Impact</span>
              <span className="hidden h-[1px] w-5 bg-secondary-fixed/60 sm:block" />
            </div>
            <p className="max-w-2xl text-body-md font-body-md leading-relaxed italic text-surface-container-high opacity-90">
              “Mỗi cuốn sách hay là một cánh cửa tâm hồn, kết nối tinh hoa nhân loại và thắp sáng khát vọng kiến tạo tương lai.”
            </p>
          </div>
        </section>

        <section className="w-full bg-surface-card px-margin-desktop py-space-2xl">
          <div className="mx-auto max-w-[1000px]">
            <h2 className="mb-space-xl font-headline-lg text-[28px] font-bold uppercase tracking-tight text-primary md:text-[32px]">
              VỀ DALIFA BOOKS
            </h2>

            <div className="mb-space-xl text-center">
              <p className="mb-1 font-headline-sm text-headline-sm font-bold uppercase tracking-wider text-secondary">
                DALIFA BOOKS - HÀNH TRÌNH KHƠI NGUỒN TRI THỨC
              </p>
              <p className="font-body-md text-body-md italic text-text-secondary">Inspire · Ignite · Impact</p>
            </div>

            <div className="space-y-space-md text-justify font-body-lg text-body-lg leading-relaxed text-text-primary">
              <p>
                Dalifa Books được biết đến là một trong những thương hiệu xuất bản và phát hành sách tuyển chọn
                hàng đầu về các dòng sách văn học kinh điển, triết học, tư tưởng, nghệ thuật và phát triển tư duy
                tại Việt Nam. Đồng hành cùng độc giả nhiều thế hệ, Dalifa Books từng bước khẳng định uy tín với
                những người yêu chuộng sách đẹp, sách chuẩn mực và khao khát tiếp cận tri thức nhân loại.
              </p>
              <p>
                Khởi nguồn từ niềm đam mê gìn giữ cốt cách văn hóa đọc, Dalifa Books đã kết nối và hợp tác chặt
                chẽ cùng các dịch giả uy tín, nhà nghiên cứu văn hóa và các tổ chức xuất bản danh tiếng trên thế
                giới. Mỗi ấn phẩm ra đời là kết tinh của quy trình tam duyệt khắt khe từ bản dịch nguyên tác, biên
                tập cẩn trọng đến kỹ thuật chế bản và đóng gáy thủ công tinh tế.
              </p>
              <p>
                Bên cạnh việc sở hữu hàng trăm đầu sách giá trị, Dalifa Books tự hào mang lại cho độc giả trải
                nghiệm đọc sách nguyên bản và thăng hoa qua các tựa sách kinh điển như: <em>Triết Luận Tri Thức</em>, <em>Lịch Sử Văn Minh Thế Giới</em>, <em>Nghệ Thuật Sống Bình Thản</em>, <em>Tâm Lý Học Nhận Thức</em>, cùng các bộ danh tác văn chương vượt thời gian.
              </p>
            </div>

            <div className="mt-space-2xl grid gap-space-lg md:grid-cols-3">
              {pillars.map((pillar) => (
                <div key={pillar.title} className="rounded-2xl border border-surface-border bg-surface-subtle p-space-lg shadow-sm">
                  <div className="mb-space-md flex h-12 w-12 items-center justify-center rounded-xl bg-primary-container text-on-primary">
                    <span className="material-symbols-outlined text-[22px]">{pillar.icon}</span>
                  </div>
                  <h3 className="mb-space-sm font-headline-sm text-headline-sm font-bold text-primary">{pillar.title}</h3>
                  <p className="font-body-md text-body-md leading-relaxed text-text-secondary">{pillar.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
