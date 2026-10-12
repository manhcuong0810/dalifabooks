import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const books = [
  {
    title: "Rừng Na Uy (Tái bản 2025)",
    author: "Haruki Murakami",
    price: "128.000 đ",
    oldPrice: "160.000 đ",
    badge: "-20%",
    cover:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCclBWd9ptqW5Mr6LkkWT0IhRN8SEtJtsy7DvGMEZuHX3zYcIGOsz0MM5xQY7QrQzrxuc9P5CVrC_UL0a4PXWSzEJPwIg3O-VLB3OhoXZTw0DQDopUsoHMg_orDtJp2Bmk92E4lK6j23muStEllozobae9ivI884HMAdrmH9vo7QvV0hjBRULXy53o_p2AK-IBHlgYAOIx1y6o_u2OUYPGaaDVDg7yPLdk9r_pK69pOLUdmbo-jLZZX",
    format: "Bìa mềm",
  },
  {
    title: "Trăm Năm Cô Đơn (Bản đặc biệt)",
    author: "Gabriel García Márquez",
    price: "212.500 đ",
    oldPrice: "250.000 đ",
    badge: "-15%",
    cover:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAOJOOPKQJ19s6h0aHhwhxJRhV1XC5qyNf_5tc3x8aJjrfEqrzPnyqqsJg4oMSuDXa4wp9TnyNVXYHhivLUY8RF6s_sVTGdpL_KsWy32A9OqNVcS_1rPEW1lHx7AWZIvmqo5WRPOMNybw7BZxkAWXT9VgJRVuCRmo73HP-VIm-aZ5OO4yEh8njrA3KW1dzH2Y6VMa-DfuqIiPb1WC86xWB298V3sztiMhzxJD7JP9YkNdD2Hjv97kax",
    format: "Bìa cứng",
  },
  {
    title: "Bắt Trẻ Đồng Xanh",
    author: "J.D. Salinger",
    price: "105.000 đ",
    oldPrice: "",
    badge: "",
    cover:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB8UX2GBubolAOIajMhJmj9bzmgBUjiEJPPh2Wytbx81OD2Y6dwjrHRNcvk2T3KGk97nRIlYvt6-7G_o2yxmtTOdl4RsDNOQRDgGIVsfYA8ZZ0SwS1KYsb0KsBJTbyjCvOkDibRAerpOtcp6W3lcOSOEhk0cPBWW9ZjmW2CfRYbnpVkgGRmcSwZFk23C82gimE-xyfsa81TX-j2CgJsbAXpbatK68RtMxf393wVQWaT3rWDYTS-ydVY",
    format: "Bìa mềm",
  },
  {
    title: "Chuông Nguyện Hồn Ai",
    author: "Ernest Hemingway",
    price: "171.000 đ",
    oldPrice: "190.000 đ",
    badge: "-10%",
    cover:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDNScuZuBkpxzNP6KyfCG7cLHxBbmWQAZt_Qaot07MEp_MzrnR5czRWY7dXa9CltMD_MGjqBidzPv0-cxakZ4a3y15Cg2xEv9KIdehJTAA_ztOmtP5MGpWfwl161myh1o15n69aVAHKKhZb7Mwqb-v3JUnJeyCq6nJFok1MSoXuRFNjjFRb-Jj4JKracya2M2XJVQe10PQOIrqqAKk3et_advDDva-R8ryRi-AvmeFx61W6AOrPiRdP",
    format: "Bìa mềm",
  },
  {
    title: "Tội Ác Và Hình Phạt (Trọn bộ 2 tập)",
    author: "Fyodor Dostoevsky",
    price: "270.000 đ",
    oldPrice: "330.000 đ",
    badge: "-18%",
    cover:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCfk9vg2UtgJlm6QhKWm_bAKGjKsmrl6FDvfqC3oHIG3QX3FqOPt5nu2mGtKRHFiAmr7uMkWuQEYjbCqb5DWIvaLgGGI6e7q1eIy-RxUHdX7wa9EyocY3Ndzihfs3jNvKiQqNemPSTtwvEnWCJUcIWwf_Q3XYdAa1KYWbjU-iJc4aM3YiqhD2UzIQWdzaPdXgUgOENNsf49GY07D80S2QNZvM46UL-A3G-IgJT1Nrdqka4WcyUsj-nk",
    format: "Bìa cứng",
  },
  {
    title: "Hoàng Tử Bé (Tái bản minh họa màu)",
    author: "Antoine de Saint-Exupéry",
    price: "85.000 đ",
    oldPrice: "",
    badge: "",
    cover:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBj8sm1mpaLM4aMPLH1jo67xFRMp8NYeVxEylcwWVzx0bViGA9ypQdEH9WYg4uxR1M4Q5eGLOOoeWd2MWrBZsz0PyCqX-C3to3kUCj793760alitNrmNfBFymc0aGw09ZnxpGiYJFMHnZ-JLfII6BcygOtI-DteR0fp3iGDc7ALyHVGQ2bysR2UajqwX_YH6MVRK_LDHvyx6PVaFO669DVbWW3FehRl86dQ9Hr9sVrPBPEAwqtGExnX",
    format: "Bìa mềm",
  },
  {
    title: "Tiếng Chim Hót Trong Bụi Mận Gai",
    author: "Colleen McCullough",
    price: "195.500 đ",
    oldPrice: "230.000 đ",
    badge: "-15%",
    cover:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuADSr0zRLzT1XTgRvYd0CxSFESjJWP_0d4FYqBCdYt5o-jocwSWJbKlr4Tf3LX2qzwK-BGUlIbh_OGDFD14QZS-fdh6spXU7IRWwf_zMyMIB2-IVFsrSx_L4ofzRKz6u-y3yCr09RHMGe_yS0jS1JjNkFy9YzEBd38f9dEp6t9B0Y_WPBxfpCOWKO172pMkn5jH_sOSaLA4D0azrWSQzoW46DDEktr7ItLtHJ70nMI8fcC9Sp4_Hxxa",
    format: "Bìa mềm",
  },
  {
    title: "Không Gia Đình (Bản hiệu đính đầy đủ)",
    author: "Hector Malot",
    price: "142.500 đ",
    oldPrice: "190.000 đ",
    badge: "-25%",
    cover:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCrN-cq6KG1uA73dcPuLNvzmLBGRhgVHA3TikJy7rYCGmYEF30SEhAzAhaM-HCQbmoLjRTtnZFSHmwz14uJyUuIR7oXH2PiVnXc6MRMjpoUYpmp0mJmjakCqt4SQxOqMqBwlqmyb7gspwjFLa7MQKCRJVZl3S-Uh_fB5xTo8Qbgh148eV-T8u7syImC_1QdqufzMa9lVa0kA_6C82jO5rb7UQS00cpvmimF1_9hvy3Kim3LO1m2zPFg",
    format: "Bìa cứng",
  },
];

export default function ShopCatalogPage() {
  return (
    <div className="bg-surface min-h-screen text-on-surface antialiased">
      <Header active="books" />

      <main className="w-full bg-surface pt-[160px] min-h-[calc(100vh-160px)]">
        <div className="mx-auto max-w-[1240px] px-margin-desktop py-space-lg">
          <div className="flex w-full flex-col">
            <div className="mb-space-md flex flex-wrap items-center justify-between gap-space-sm">
              <nav className="flex items-center gap-2 font-label-md text-label-md text-text-secondary">
                <a className="flex items-center gap-1 transition-colors hover:text-primary" href="#">
                  <span className="material-symbols-outlined text-[18px]">home</span>
                  <span>Trang chủ</span>
                </a>
                <span className="text-text-muted">/</span>
                <a className="transition-colors hover:text-primary" href="#">
                  Danh mục sách
                </a>
                <span className="text-text-muted">/</span>
                <span className="font-semibold text-text-primary">Văn học Kinh điển &amp; Hiện đại</span>
              </nav>
              <div className="hidden items-center gap-2 rounded-full bg-status-emerald-bg px-3 py-1 text-label-sm font-label-sm text-status-emerald-text sm:flex">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                <span>Tuyển chọn chính ngạch • 100% sách chuẩn bản quyền</span>
              </div>
            </div>

            <div className="relative mb-space-xl overflow-hidden rounded-xl bg-primary p-space-lg text-on-primary shadow-md sm:p-space-xl">
              <div className="pointer-events-none absolute -right-12 -top-12 h-64 w-64 rounded-full bg-primary-container/40 blur-3xl"></div>
              <div className="pointer-events-none absolute bottom-0 right-12 hidden h-full w-80 opacity-20 lg:block">
                <svg className="h-full w-full text-primary-fixed" fill="currentColor" viewBox="0 0 200 200">
                  <path d="M43.3,-71.8C55.4,-64.1,64.2,-52.1,70.9,-39.2C77.6,-26.3,82.2,-12.5,80.4,0.7C78.6,13.9,70.4,26.5,61.7,37.8C53,49.1,43.8,59.1,32.3,66.8C20.8,74.5,7,79.9,-6.2,80.2C-19.4,80.5,-32,75.7,-43.3,67.7C-54.6,59.7,-64.6,48.5,-71.9,35.6C-79.2,22.7,-83.8,8.1,-81.9,-5.8C-80,-19.7,-71.6,-32.9,-61.4,-43.2C-51.2,-53.5,-39.2,-60.9,-26.8,-68.2C-14.4,-75.5,-1.6,-82.7,12.2,-83C26,-83.3,31.2,-79.5,43.3,-71.8Z" transform="translate(100 100)" />
                </svg>
              </div>
              <div className="relative z-10 max-w-2xl">
                <div className="mb-3 inline-flex items-center gap-1.5 rounded bg-secondary/80 px-2.5 py-0.5 font-label-sm text-label-sm text-on-secondary">
                  <span>TỦ SÁCH KHUYÊN ĐỌC DALIFABOOKS</span>
                </div>
                <h1 className="mb-2 font-headline-lg text-headline-lg font-bold tracking-tight">
                  Văn học Kinh điển &amp; Hiện đại
                </h1>
                <p className="font-body-md text-body-md leading-relaxed text-primary-fixed-dim">
                  Không gian hội tụ những kiệt tác văn chương vượt không thời gian. Khám phá chiều sâu tâm thức, vẻ đẹp thẩm mỹ ngôn từ và những câu chuyện kiến tạo tầm vóc tư tưởng nhân loại từ các tác gia lừng danh.
                </p>
              </div>
            </div>

            <div className="mb-space-lg flex flex-col justify-between gap-space-md rounded-xl bg-surface-card p-space-md pb-space-md shadow-sm md:flex-row md:items-center">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-subtle text-primary">
                  <span className="material-symbols-outlined text-[22px]">auto_stories</span>
                </div>
                <div>
                  <p className="font-headline-sm text-headline-sm font-semibold leading-tight text-text-primary">
                    Danh mục tác phẩm tuyển chọn
                  </p>
                  <p className="mt-0.5 font-body-sm text-body-sm text-text-secondary">
                    Tìm thấy <strong className="font-semibold text-primary">128</strong> tác phẩm đạt tiêu chuẩn chất lượng Dalifa
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-space-sm sm:gap-space-md">
                <div className="mr-2 hidden items-center gap-1.5 xl:flex">
                  <span className="inline-flex items-center gap-1 rounded-full bg-surface-subtle px-2.5 py-1 font-label-sm text-label-sm text-text-secondary">
                    <span>Còn hàng</span>
                    <button className="flex items-center hover:text-error" type="button">
                      <span className="material-symbols-outlined text-[14px]">close</span>
                    </button>
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-surface-subtle px-2.5 py-1 font-label-sm text-label-sm text-text-secondary">
                    <span>Văn học</span>
                    <button className="flex items-center hover:text-error" type="button">
                      <span className="material-symbols-outlined text-[14px]">close</span>
                    </button>
                  </span>
                </div>

                <div className="relative flex items-center">
                  <label className="mr-2 shrink-0 font-label-sm text-label-sm text-text-secondary" htmlFor="catalog-sort">
                    Sắp xếp:
                  </label>
                  <div className="relative">
                    <select
                      className="appearance-none cursor-pointer rounded-lg bg-surface-subtle py-2 pl-3 pr-8 text-label-md font-label-md text-text-primary transition-colors hover:bg-surface-container-high focus:outline-none focus:ring-2 focus:ring-primary-container"
                      id="catalog-sort"
                    >
                      <option value="featured" selected>Tác phẩm nổi bật nhất</option>
                      <option value="bestseller">Bán chạy nhất tháng</option>
                      <option value="newest">Mới phát hành gần đây</option>
                      <option value="price-asc">Giá từ thấp đến cao</option>
                      <option value="price-desc">Giá từ cao đến thấp</option>
                      <option value="discount">Tỷ lệ ưu đãi cao nhất</option>
                    </select>
                    <span className="material-symbols-outlined pointer-events-none absolute right-2 top-2.5 text-[18px] text-text-secondary">
                      expand_more
                    </span>
                  </div>
                </div>

                <div className="flex items-center rounded-lg bg-surface-subtle p-1">
                  <button className="flex h-8 w-8 items-center justify-center rounded-md bg-surface-card text-primary shadow-sm" title="Chế độ xem lưới" type="button">
                    <span className="material-symbols-outlined text-[19px]">grid_view</span>
                  </button>
                  <button className="flex h-8 w-8 items-center justify-center rounded-md text-text-muted transition-all hover:text-text-primary" title="Chế độ xem danh sách" type="button">
                    <span className="material-symbols-outlined text-[19px]">view_list</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 items-start gap-space-xl lg:grid-cols-12">
              <aside className="space-y-space-lg lg:col-span-3">
                <div className="rounded-xl bg-surface-card p-space-lg shadow-sm">
                  <div className="mb-space-md flex items-center justify-between pb-space-md">
                    <div className="flex items-center gap-2 font-headline-sm text-headline-sm text-text-primary">
                      <span className="material-symbols-outlined text-[20px] text-primary">tune</span>
                      <span>Bộ lọc tinh tuyển</span>
                    </div>
                    <button className="cursor-pointer font-label-sm text-label-sm text-secondary hover:underline" type="button">
                      Thiết lập lại
                    </button>
                  </div>

                  <div className="mb-space-lg">
                    <h2 className="mb-3 text-xs font-label-md font-semibold uppercase tracking-wide text-text-primary">
                      Thể loại chuyên biệt
                    </h2>
                    <div className="flex flex-col gap-1 font-body-sm text-body-sm">
                      <a className="flex items-center justify-between rounded-lg bg-surface-subtle px-2 py-1.5 font-medium text-primary" href="#">
                        <span>Văn học Nước ngoài</span>
                        <span className="rounded bg-surface-card px-2 py-0.5 text-label-sm font-label-sm text-text-secondary">64</span>
                      </a>
                      <a className="flex items-center justify-between rounded-lg px-2 py-1.5 text-text-secondary transition-colors hover:bg-surface-subtle hover:text-text-primary" href="#">
                        <span>Văn học Việt Nam</span>
                        <span className="text-label-sm font-label-sm text-text-muted">38</span>
                      </a>
                      <a className="flex items-center justify-between rounded-lg px-2 py-1.5 text-text-secondary transition-colors hover:bg-surface-subtle hover:text-text-primary" href="#">
                        <span>Tiểu thuyết Hiện sinh &amp; Tâm lý</span>
                        <span className="text-label-sm font-label-sm text-text-muted">16</span>
                      </a>
                      <a className="flex items-center justify-between rounded-lg px-2 py-1.5 text-text-secondary transition-colors hover:bg-surface-subtle hover:text-text-primary" href="#">
                        <span>Thơ ca &amp; Tùy bút kinh điển</span>
                        <span className="text-label-sm font-label-sm text-text-muted">9</span>
                      </a>
                      <a className="flex items-center justify-between rounded-lg px-2 py-1.5 text-text-secondary transition-colors hover:bg-surface-subtle hover:text-text-primary" href="#">
                        <span>Kịch bản &amp; Phê bình văn học</span>
                        <span className="text-label-sm font-label-sm text-text-muted">5</span>
                      </a>
                    </div>
                  </div>

                  <div className="mb-space-lg">
                    <div className="mb-3 flex items-center justify-between">
                      <h2 className="text-xs font-label-md font-semibold uppercase tracking-wide text-text-primary">Tác giả đại thụ</h2>
                      <span className="font-label-sm text-label-sm text-text-muted">6 chọn</span>
                    </div>
                    <div className="max-h-48 space-y-2.5 overflow-y-auto pr-1 font-body-sm text-body-sm text-text-secondary">
                      {[
                        ["Haruki Murakami", "18"],
                        ["Hermann Hesse", "12"],
                        ["Victor Hugo", "8"],
                        ["George Orwell", "7"],
                        ["Nam Cao", "9"],
                        ["Nguyễn Du", "5"],
                        ["Fyodor Dostoevsky", "11"],
                      ].map(([name, total]) => (
                        <label key={name} className="flex cursor-pointer items-center gap-2.5 text-text-secondary hover:text-text-primary">
                          <input checked={name === "Haruki Murakami" || name === "Hermann Hesse"} className="h-4 w-4 cursor-pointer rounded accent-primary" type="checkbox" />
                          <span className="flex-1">{name}</span>
                          <span className="font-label-sm text-label-sm text-text-muted">({total})</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="mb-space-lg">
                    <h2 className="mb-3 text-xs font-label-md font-semibold uppercase tracking-wide text-text-primary">
                      Nhà xuất bản &amp; Đối tác
                    </h2>
                    <div className="space-y-2.5 font-body-sm text-body-sm text-text-secondary">
                      {[
                        ["NXB Hội Nhà Văn", "42"],
                        ["NXB Văn Học", "37"],
                        ["NXB Trẻ", "29"],
                        ["NXB Kim Đồng", "15"],
                      ].map(([name, total]) => (
                        <label key={name} className="flex cursor-pointer items-center gap-2.5 text-text-secondary hover:text-text-primary">
                          <input checked={name === "NXB Hội Nhà Văn"} className="h-4 w-4 cursor-pointer rounded accent-primary" type="checkbox" />
                          <span className="flex-1">{name}</span>
                          <span className="font-label-sm text-label-sm text-text-muted">({total})</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="mb-space-lg">
                    <h2 className="mb-3 text-xs font-label-md font-semibold uppercase tracking-wide text-text-primary">
                      Khoảng ngân sách (VNĐ)
                    </h2>
                    <div className="mb-3 space-y-2 font-body-sm text-body-sm text-text-secondary">
                      {[
                        "Dưới 100.000 đ",
                        "100.000 đ - 200.000 đ",
                        "200.000 đ - 500.000 đ",
                        "Trên 500.000 đ (Ấn bản sưu tầm)",
                      ].map((v, idx) => (
                        <label key={v} className="flex cursor-pointer items-center gap-2 text-text-secondary hover:text-text-primary">
                          <input checked={idx === 1} className="cursor-pointer accent-primary" name="price-bracket" type="radio" />
                          <span className={idx === 1 ? "font-medium text-text-primary" : ""}>{v}</span>
                        </label>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 pt-2">
                      <input className="w-full rounded bg-surface-subtle px-2.5 py-1.5 text-body-sm font-body-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="100.000" type="text" />
                      <span className="text-text-muted">-</span>
                      <input className="w-full rounded bg-surface-subtle px-2.5 py-1.5 text-body-sm font-body-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="250.000" type="text" />
                    </div>
                  </div>

                  <div className="mb-space-xl">
                    <h2 className="mb-3 text-xs font-label-md font-semibold uppercase tracking-wide text-text-primary">
                      Định dạng bìa &amp; Tình trạng
                    </h2>
                    <div className="space-y-2 font-body-sm text-body-sm text-text-secondary">
                      <label className="flex cursor-pointer items-center gap-2.5 text-text-secondary hover:text-text-primary">
                        <input checked className="h-4 w-4 cursor-pointer rounded accent-primary" type="checkbox" />
                        <span>Bìa mềm trang nhã</span>
                      </label>
                      <label className="flex cursor-pointer items-center gap-2.5 text-text-secondary hover:text-text-primary">
                        <input className="h-4 w-4 cursor-pointer rounded accent-primary" type="checkbox" />
                        <span>Bìa cứng gáy may cao cấp</span>
                      </label>
                      <div className="my-2 h-px bg-surface-subtle" />
                      <label className="flex cursor-pointer items-center gap-2.5 font-medium text-text-primary">
                        <input checked className="h-4 w-4 cursor-pointer rounded accent-primary" type="checkbox" />
                        <span>Chỉ hiện sách còn hàng sẵn kho</span>
                      </label>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-container px-3 py-2.5 font-label-md text-label-md font-semibold text-on-primary transition-colors hover:bg-primary" type="button">
                      <span className="material-symbols-outlined text-[18px]">filter_alt</span>
                      <span>Áp dụng bộ lọc</span>
                    </button>
                  </div>
                </div>

                <div className="rounded-xl bg-surface-container-low p-space-md">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[24px] text-secondary">workspace_premium</span>
                    <div>
                      <h3 className="font-label-md text-label-md font-semibold text-text-primary">Đóng gói chuẩn sách quý</h3>
                      <p className="font-body-sm text-body-sm leading-snug text-text-secondary">
                        Chống sốc 3 lớp, chèn góc chống móp gáy toàn trình.
                      </p>
                    </div>
                  </div>
                </div>
              </aside>

              <main className="lg:col-span-9">
                <div className="mb-space-2xl grid grid-cols-2 gap-space-md sm:gap-space-lg md:grid-cols-3 xl:grid-cols-4" id="catalog-products-container">
                  {books.map((book) => (
                    <article key={book.title} className="group flex flex-col justify-between rounded-xl bg-surface-card p-3 shadow-sm transition-all duration-200 hover:shadow-md">
                      <div className="relative mb-3 flex aspect-[2/3] w-full items-center justify-center overflow-hidden rounded-lg bg-surface-subtle">
                        <img alt={book.title} className="h-full w-full object-contain p-2 transition-transform duration-300 group-hover:scale-105" src={book.cover} />
                        {book.badge ? (
                          <span className="absolute left-2 top-2 rounded bg-error px-1.5 py-0.5 font-label-sm text-label-sm font-bold text-on-error shadow-sm">
                            {book.badge}
                          </span>
                        ) : null}
                        <button aria-label="Lưu vào yêu thích" className="wishlist-btn absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-surface-card/90 text-text-secondary shadow-sm transition-colors hover:bg-surface-card hover:text-error" type="button">
                          <span className="material-symbols-outlined text-[18px]">favorite</span>
                        </button>
                        <span className="absolute bottom-2 left-2 rounded bg-primary/80 px-2 py-0.5 text-[11px] font-label-sm text-label-sm text-on-primary backdrop-blur">
                          {book.format}
                        </span>
                      </div>

                      <div className="flex flex-1 flex-col">
                        <p className="mb-1 font-body-sm text-body-sm text-text-secondary">{book.author}</p>
                        <h3 className="mb-2 line-clamp-2 font-headline-sm text-headline-sm font-semibold leading-tight text-text-primary transition-colors group-hover:text-secondary">
                          {book.title}
                        </h3>
                        <div className="mt-auto pt-2">
                          <div className="mb-3 flex items-baseline gap-2">
                            <span className="font-price-md text-price-md font-bold text-secondary">{book.price}</span>
                            {book.oldPrice ? <span className="font-body-sm text-body-sm text-text-muted line-through">{book.oldPrice}</span> : null}
                          </div>
                          <button className="add-to-cart-btn flex w-full items-center justify-center gap-1.5 rounded-lg bg-surface-subtle px-3 py-2 text-label-md font-label-md font-semibold text-text-primary transition-all hover:bg-primary-container hover:text-on-primary active:scale-95" type="button">
                            <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                            <span>Thêm vào giỏ</span>
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="mb-space-2xl flex flex-col items-center justify-between gap-space-md rounded-xl bg-surface-card p-space-md shadow-sm sm:flex-row">
                  <div className="flex items-center gap-2 font-label-sm text-label-sm text-text-secondary">
                    <span>Hiển thị:</span>
                    <select className="cursor-pointer rounded bg-surface-subtle px-2.5 py-1.5 font-semibold text-text-primary focus:outline-none">
                      <option value="24" selected>24 cuốn / trang</option>
                      <option value="48">48 cuốn / trang</option>
                      <option value="96">96 cuốn / trang</option>
                    </select>
                    <span className="text-text-muted">| Trang 1 trong 6</span>
                  </div>

                  <nav className="flex items-center gap-1 font-label-md text-label-md">
                    <button className="flex h-9 w-9 cursor-not-allowed items-center justify-center rounded-lg text-text-muted opacity-50" disabled type="button">
                      <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                    </button>
                    <button className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-container font-semibold text-on-primary shadow-sm" type="button">
                      1
                    </button>
                    <button className="flex h-9 w-9 items-center justify-center rounded-lg text-text-primary transition-colors hover:bg-surface-subtle" type="button">
                      2
                    </button>
                    <button className="flex h-9 w-9 items-center justify-center rounded-lg text-text-primary transition-colors hover:bg-surface-subtle" type="button">
                      3
                    </button>
                    <button className="flex h-9 w-9 items-center justify-center rounded-lg text-text-primary transition-colors hover:bg-surface-subtle" type="button">
                      4
                    </button>
                    <span className="w-7 text-center text-text-muted">...</span>
                    <button className="flex h-9 w-9 items-center justify-center rounded-lg text-text-primary transition-colors hover:bg-surface-subtle" type="button">
                      12
                    </button>
                    <button className="flex h-9 w-9 items-center justify-center rounded-lg text-text-primary transition-colors hover:bg-surface-subtle" type="button">
                      <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                    </button>
                  </nav>
                </div>

                <section className="rounded-xl bg-surface-card p-space-lg shadow-sm">
                  <div className="mb-space-sm flex items-center gap-2 text-headline-sm font-headline-sm text-text-primary">
                    <span className="material-symbols-outlined text-[20px] text-secondary">travel_explore</span>
                    <span>Khám phá thêm theo chủ đề liên quan</span>
                  </div>
                  <p className="mb-space-md font-body-sm text-body-sm text-text-secondary">
                    Các bạn đọc yêu thích danh mục này thường tìm kiếm và khám phá thêm các bộ sưu tập:
                  </p>
                  <div className="flex flex-wrap gap-2.5 text-label-md font-label-md">
                    {[
                      "sách đạt giải nobel",
                      "văn học nhật bản hiện đại",
                      "tiểu thuyết lãng mạn châu âu",
                      "ấn bản minh họa giới hạn",
                      "trường phái hiện sinh",
                    ].map((tag) => (
                      <a key={tag} className="flex items-center gap-1.5 rounded-lg bg-surface-subtle px-3.5 py-1.5 text-text-primary transition-colors hover:bg-surface-container-high" href="#">
                        <span className="material-symbols-outlined text-[16px] text-text-muted">search</span>
                        <span>{tag}</span>
                      </a>
                    ))}
                  </div>
                </section>
              </main>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}