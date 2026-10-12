"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const categories = [
  { label: "Tất cả bài viết (128)", value: "all", active: true },
  { label: "Điểm sách & Phê bình (Book Review)", value: "review", active: false },
  { label: "Đối thoại Tác giả & Dịch giả", value: "dialogue", active: false },
  { label: "Tủ sách Di sản & Tri thức", value: "heritage", active: false },
  { label: "Không gian Văn hóa Đọc", value: "culture", active: false },
];

const blogMenuItems = [
  { label: "Văn hóa đọc & thảo luận", slug: "van-hoa-doc", count: "42 bài" },
  { label: "Điểm sách & phê bình", slug: "diem-sach", count: "29 bài" },
  { label: "Đối thoại tác giả & dịch giả", slug: "doi-thoai", count: "18 bài" },
  { label: "Tri thức & di sản", slug: "tri-thuc", count: "21 bài" },
  { label: "Nuôi dạy con & gia đình", slug: "nuoi-day-con", count: "12 bài" },
];

const articleCards = [
  {
    category: "Điểm sách kinh tế",
    readTime: "6 phút đọc",
    title: "5 Tác phẩm giúp bạn tái định hình tư duy tài chính và tự do cá nhân trước tuổi 30",
    summary:
      "Không dừng lại ở những con số khô khan, đây là lăng kính triết học về thời gian, năng lực tự chủ và cách đồng tiền phục vụ cho một cuộc đời tự do đích thực.",
    author: "Nguyễn Quân",
    date: "08 Th10, 2026",
    avatar: "NQ",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD9UCqke-w_MXdgrgoWP5JmFF4jynbpRiPtsEPv3C1ok-bYH1n-EZnxnqPJF5jW-YeBZ4idPejsQCjbdsOZSgUcc9546GzCKRGi22lgVc1zuvIvMQqHMEOd2Yc7-YLTktHAd34pgNG2pConjL_IxkQdUZeSy6xdmzDL44Ee-nOlJ7n55YXLVw6Feg9Y9Y1HAs-aGl5yU6phtx6He3VIL0FRPdHy_ikZMp0vEXeoUj6VeJUeYaR3zIGG",
  },
  {
    category: "Đối thoại tác giả",
    readTime: "10 phút đọc",
    title: "Gặp gỡ dịch giả Lê Quang: Mỗi bản dịch là một lần tái sinh của ngôn từ",
    summary:
      "Cuộc trò chuyện cởi mở về sự cô đơn trên bàn làm việc, trách nhiệm với hồn văn nguyên tác và bí quyết giữ nhịp điệu uyển chuyển khi đưa văn học Đức về Việt Nam.",
    author: "Mai Hương",
    date: "05 Th10, 2026",
    avatar: "MH",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAC34t7qAQPR_8EnowvYhYVRkAU9ZenfNcBWo3KRy6FBfWCEsEFJyi8-OYaweo46LlXyHwjY15PcX4Ndpg-qaLFSsNXE21xppsmfCa4fIhHA68XnQjDBazSlCCoTPSVKxnE9a2s6g-sSDnxmtErq7-bPux8FzAuXG8N16-NnkxBMxshj3PPhGJRdCMF33NhK2hNk04fPlsnpI5SSARN5ZNfuZKq_8U1ZG4sraVVgQrI-X1B6OkKJGaW",
  },
  {
    category: "Nuôi dạy con & Gia đình",
    readTime: "5 phút đọc",
    title: "Nghệ thuật nuôi dưỡng tình yêu sách cho con trẻ trong kỷ nguyên số hóa",
    summary:
      "Làm thế nào để tiếng lật sách hấp dẫn hơn những màn hình cảm ứng? Chia sẻ phương pháp tương tác nhẹ nhàng giúp khơi gợi trí tưởng tượng tự nhiên của trẻ.",
    author: "Thùy Linh",
    date: "02 Th10, 2026",
    avatar: "TL",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCakHY24BlS5c0CYlrXbGLTsuoVaVqhZHlIctICxxcEBdf3IREaEXjE4qIyNzx9sBZtGAdlG3CXx77_XeNuS2_NBCBF01nPCW651BtnMjMuXZAbMQ2V-SV4gwk8XHwbTYdQ4BHAEIn6cvBlHWAZrt7X_wVAW3vJpdyhy5YNyXlOvR0-fORihtydYaElVsg3Of8EzqcBj8A_X08a3lSCStuvXGhoCEZIRhS8pNti2fe9U4_1Day4-5r4",
  },
  {
    category: "Phê bình văn học",
    readTime: "9 phút đọc",
    title: "Haruki Murakami và thế giới hiện thực huyền ảo: Nỗi cô đơn của con người đương đại",
    summary:
      "Giải mã motif chiếc giếng cạn, mèo hoang và những khúc giao hưởng trong văn nghiệp đồ sộ của nhà văn xứ sở Phù Tang đã mê hoặc hàng triệu độc giả toàn cầu.",
    author: "Đặng Anh Tuấn",
    date: "28 Th09, 2026",
    avatar: "ĐA",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDtcDQWldMAXvKE9ijiyPmaCywBhArmmzzuYJRooka9DDFvDbr8mVoEH6dxog9RX2aC8fDBCGGfECQOZg9ixlIQD_pwkr5sEuiFAP6AMl5EqkcCGugyb4PI9tP9o5iZF3gVharvuHQmgNM7x4EnwVzIT9YnT7ZOAqBewS-mS0JIfLOADEKrkV85rpdoYhAvKVr_rTAzh1NPY2HM2lHO9oAkH8JVJYoytZRLgX9yLEjYsOpFInhSS9Ek",
  },
  {
    category: "Văn hóa đọc",
    readTime: "7 phút đọc",
    title: "Tại sao sách giấy vẫn giữ vị thế bất biến giữa làn sóng sách điện tử và AI?",
    summary:
      "Trải nghiệm xúc giác, mùi mực in và sự ngưng đọng thời gian: Phân tích khoa học thần kinh về lý do bộ não con người luôn ghi nhớ sâu sắc hơn khi đọc trang sách vật lý.",
    author: "Hà Phương",
    date: "24 Th09, 2026",
    avatar: "HP",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB_iYYBvpJKXhfZGVEJbWwuQJcu-3aPlaVTtsEQ0dpm42mDye2k2A1k_nTgJ9dw_ORbdft40SAvoaj_GvE-sLDNBljLqPNtocZPOJiTTMA1YrDZRW4lMgK8TQeutW0uan9qJ9WTo5-UYVWbBjYd5o9WDZKFIhHB2rN9aONCE6IJYocI5UuU-7a_h3ROTNdSemQIPbIk6PlN8SW15BRLJYA-lIdNNCeKCO38l4InrSXf7BlrRYRjqnxW",
  },
  {
    category: "Chuyện hậu trường sách",
    readTime: "4 phút đọc",
    title: "Khám phá quy trình in ấn bìa cứng gáy may cổ điển tại xưởng in Dalifa",
    summary:
      "Chiêm ngưỡng từng công đoạn thủ công tỉ mỉ: từ may chỉ dù, bọc vải linen Hà Lan tới dập nhũ vàng 24K để tạo ra những ấn phẩm vượt thời gian cho người sưu tầm.",
    author: "Văn Khoa",
    date: "19 Th09, 2026",
    avatar: "VK",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBfD6jRaYh8iDFk5pKn6w1TmEkr_HlcW-wP2YBbuot9ZklXnU1WBBbf_K3PZfttPhLFm2xU9AwpTQnVAgnrGa2fdTtXuHhFO15SHyToUTpagVsjLBNxlNdNRZCkhN-5RHFJQn36Q_Xg6a2uYJj_HfRZcSnTqiLbCIOU-arHUt1U8QIHsJifDj9AHXXJfLlq4M6UzfzNgB2fROMq46u7p7EaOxxKJn4tIAHWfFLsA_zx2UNHvqIx8UD5",
  },
];

const trendingItems = [
  {
    rank: "01",
    title: "Đi tìm căn tính Việt qua những trang khảo cứu của học giả Đào Duy Anh",
    meta: "14.2k lượt đọc • Di sản văn hóa",
  },
  {
    rank: "02",
    title: "Marcus Aurelius và 'Suy tưởng': Cẩm nang bình thản giữa thời hỗn loạn",
    meta: "11.8k lượt đọc • Chủ nghĩa Khắc kỷ",
  },
  {
    rank: "03",
    title: "Bản hòa ca của văn học Mỹ Latinh: 100 năm cô đơn và di sản Gabo",
    meta: "9.4k lượt đọc • Hiện thực huyền ảo",
  },
];

const featuredBooks = [
  {
    title: "Tâm Lý Học Về Tiền",
    author: "Morgan Housel • Dịch giả Tâm An",
    price: "158.000 đ",
    original: "198.000 đ",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBiVrSrJzXcy3mNLLDSwJwHG2vbiFJ5ActeOArip3kodCERwWl08mjnkFI1CLnAb7sFhWENXZEnRdY_GqFhowicx7-ykFNOTtjOvCysQpMvNAGuvkzLqHTVT7C-CQxpk8znpcrUhqF10-HpCXBAXWXafkKHETmfMMlqH4iZnTlA2TxvGT_nvH3YazE0L-VItE-0DcD6VlImOyPg_ZzdXYbaBnC9zNcLUS8blmFZiRyTjjiGt17xxVX4",
  },
  {
    title: "Rừng Na Uy (Bản Bìa Cứng Giới Hạn)",
    author: "Haruki Murakami",
    price: "245.000 đ",
    original: "290.000 đ",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuABuRhS1VV_52JraAElHj0M7G_qZjMzWwryB8h_krNux0ImLWKBjO2wgWMFfzB8UMlhKrHAe2K1_XBANdNckMg6AoCJRDciUTFwVMDh2erx2t_csuuLxRt-ps6-HFpFM2EsVd6c4q93sUBy87245XknNRHGSZFXp37iYnhpd3se6H809MxAxZn9vtZlNc1yeqRFnUAl3blKvvi5FWk-s7dhxh4fE1WgNufa4smnZ62TU6W7rp2ZL6uZ",
  },
];

const footerLinks = {
  support: [
    "Chính sách đổi trả & hoàn tiền",
    "Chính sách giao hàng toàn quốc",
    "Chính sách bảo mật dữ liệu",
    "Điều khoản dịch vụ sử dụng",
    "Hướng dẫn tra cứu đơn hàng",
    "Câu hỏi thường gặp (FAQ)",
  ],
  catalog: [
    "Văn học kinh điển & đương đại",
    "Triết học, Lịch sử & Xã hội",
    "Tâm lý học ứng dụng & Nhận thức",
    "Kinh tế, Quản trị & Đổi mới",
    "Sách song ngữ & Ngoại văn",
    "Ấn bản sưu tầm bọc bìa da",
  ],
};

export default function BlogPage() {
  const [blogMenuOpen, setBlogMenuOpen] = useState(false);

  useEffect(() => {
    document.querySelectorAll(".category-chip").forEach((button) => {
      button.addEventListener("click", () => {
        document.querySelectorAll(".category-chip").forEach((btn) => {
          btn.classList.remove("active-chip", "bg-primary", "text-on-primary");
          btn.classList.add("bg-surface-subtle", "text-text-secondary");
        });
        button.classList.remove("bg-surface-subtle", "text-text-secondary");
        button.classList.add("active-chip", "bg-primary", "text-on-primary");
      });
    });

    const newsletterForm = document.getElementById("newsletter-form");
    if (newsletterForm) {
      newsletterForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const emailInput = document.getElementById("newsletter-email") as HTMLInputElement | null;
        if (emailInput && emailInput.value) {
          const button = newsletterForm.querySelector("button[type='submit']");
          if (button) {
            const originalText = button.innerHTML;
            button.innerHTML =
              '<span class="material-symbols-outlined text-[18px] animate-spin">progress_activity</span><span>Đang xử lý...</span>';
            button.setAttribute("disabled", "true");
            setTimeout(() => {
              button.innerHTML =
                '<span class="material-symbols-outlined text-[18px]">check_circle</span><span>Đã đăng ký thành công!</span>';
              button.classList.remove("bg-secondary");
              button.classList.add("bg-status-emerald-bg", "text-status-emerald-text");
              emailInput.value = "";
              button.removeAttribute("disabled");
              button.setAttribute("data-original-text", originalText);
            }, 800);
          }
        }
      });
    }
  }, []);

  return (
    <div className="bg-surface min-h-screen text-on-surface antialiased">
      <Header active="blog" />

      <main className="w-full min-h-[calc(100vh-160px)] bg-surface pt-[160px]">
        <div className="flex w-full flex-col">
          <div className="relative w-full overflow-hidden">
            <div className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-96 w-[900px] -translate-x-1/2 bg-gradient-to-b from-primary-fixed/30 via-surface-container/20 to-transparent blur-3xl" />
            <div className="mx-auto max-w-[1240px] px-margin-desktop py-space-lg">
              <nav aria-label="Đường dẫn trang" className="mb-space-lg flex items-center gap-2 font-label-sm text-label-sm text-text-muted">
                <a className="flex items-center gap-1 transition-colors hover:text-primary" href="#">
                  <span className="material-symbols-outlined text-[16px]">home</span>
                  <span>Trang chủ</span>
                </a>
                <span className="material-symbols-outlined text-[14px] text-text-muted">chevron_right</span>
                <a className="transition-colors hover:text-primary" href="#">
                  Tin tức &amp; Bài viết
                </a>
                <span className="material-symbols-outlined text-[14px] text-text-muted">chevron_right</span>
                <span className="font-semibold text-primary">Góc Bạn Đọc &amp; Điểm Sách</span>
              </nav>

              <header className="relative mb-space-2xl overflow-hidden rounded-2xl bg-surface-card p-space-xl shadow-[0_4px_24px_rgba(15,41,66,0.04)] lg:p-space-2xl">
                <div className="pointer-events-none absolute right-0 top-0 flex h-full w-80 items-center justify-center opacity-[0.03]">
                  <span className="material-symbols-outlined select-none text-[320px] text-primary">auto_stories</span>
                </div>
                <div className="relative z-10 max-w-3xl">
                  <div className="mb-space-md inline-flex items-center gap-2 rounded-full bg-surface-container-low px-3 py-1 text-label-sm font-label-sm font-semibold text-primary">
                    <span className="material-symbols-outlined text-[16px] text-secondary">menu_book</span>
                    <span className="tracking-wider uppercase">Chuyên trang Vựng khảo &amp; Văn hóa Đọc</span>
                  </div>
                  <h1 className="mb-space-md font-headline-lg text-headline-lg leading-tight tracking-tight text-primary">
                    Góc Bạn Đọc &amp; Văn Hóa Đọc DalifaBooks
                  </h1>
                  <p className="mb-space-xl max-w-2xl font-body-lg text-body-lg leading-relaxed text-text-secondary">
                    Nơi sẻ chia chiều sâu trang sách, tản văn tác giả, nghệ thuật thưởng thức và những cuộc đối thoại văn chương vượt thời gian cùng giới dịch giả và cộng đồng bạn đọc tinh hoa.
                  </p>

                  <div className="mb-space-lg flex flex-col gap-space-sm sm:flex-row">
                    <div className="relative flex-1">
                      <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[20px] text-text-muted">search</span>
                      <input
                        id="article-search"
                        className="w-full rounded-lg bg-surface-subtle py-2.5 pl-10 pr-4 text-body-md font-body-md text-text-primary shadow-sm placeholder:text-text-muted focus:outline-none focus:bg-surface-card"
                        placeholder="Tìm kiếm bài điểm sách, tác giả, bài phê bình hoặc dịch giả..."
                        type="text"
                      />
                    </div>
                    <button
                      className="flex shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-label-md font-label-md font-semibold text-on-primary transition-all hover:bg-primary-container"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">manage_search</span>
                      <span>Khám phá bài viết</span>
                    </button>
                  </div>

                  <div id="category-chips" className="flex items-center gap-2 overflow-x-auto pb-1">
                    {categories.map((category) => (
                      <button
                        key={category.value}
                        className={`category-chip rounded-full px-3.5 py-1.5 text-label-sm font-label-sm whitespace-nowrap transition-all ${
                          category.active
                            ? "bg-primary text-on-primary shadow-sm"
                            : "bg-surface-subtle text-text-secondary hover:bg-surface-container hover:text-primary"
                        }`}
                        data-category={category.value}
                        type="button"
                      >
                        {category.label}
                      </button>
                    ))}
                  </div>
                </div>
              </header>

              <section aria-label="Bài viết tiêu điểm" className="mb-space-2xl">
                <article className="group relative overflow-hidden rounded-2xl bg-surface-card shadow-[0_8px_30px_rgba(15,41,66,0.06)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(15,41,66,0.1)]">
                  <div className="grid items-stretch gap-0 lg:grid-cols-12">
                    <div className="relative min-h-[360px] overflow-hidden bg-surface-container lg:col-span-7">
                      <img
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwU1Tud0LSVR7A3T7sO9pt4z4WQcTR60xy2seb5gupZLOzUsoFhhen7owmcBgxzxFmuz1I5uOGrnulrGgZhHFnQAYo8zsgyWfKixlbvWvb7uNWwMirSPExfeoD64eYz9yJQX2jB80jHpThADLP0yb3Oy7SJSOw5hrYDS63I0op29MYBI0XMgLdKsEiHsmS67x_deE8oA3ohJr2fSaCfaBRW75XcUhbLAm29nlCqJca-jJnJ6lNHExi"
                        alt="Featured article"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent lg:hidden" />
                      <div className="absolute left-4 top-4 flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-label-sm font-label-sm font-semibold text-on-secondary shadow-md">
                          <span className="material-symbols-outlined text-[15px]">stars</span>
                          <span>Tiêu điểm tuần</span>
                        </span>
                        <span className="inline-flex items-center rounded-full bg-primary/80 px-3 py-1 text-label-sm font-label-sm font-medium text-on-primary backdrop-blur-md">
                          Chuyên khảo
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col justify-between bg-surface-card p-space-xl lg:col-span-5 lg:p-space-2xl">
                      <div>
                        <div className="mb-space-sm flex items-center gap-3 font-label-sm text-label-sm text-text-muted">
                          <span className="flex items-center gap-1 font-semibold text-secondary">
                            <span className="material-symbols-outlined text-[16px]">import_contacts</span>
                            <span>Đối thoại Văn chương</span>
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[15px]">schedule</span>
                            <span>8 phút đọc</span>
                          </span>
                        </div>
                        <h2 className="mb-space-md font-headline-md text-headline-md leading-snug tracking-tight text-primary transition-colors group-hover:text-primary-container">
                          <Link href="/blog/gap-go-dich-gia-le-quang">
                            Hành trình 3 năm chuyển ngữ kiệt tác văn học kinh điển: Khi dịch giả là người đồng sáng tạo
                          </Link>
                        </h2>
                        <p className="mb-space-lg font-body-md text-body-md leading-relaxed text-text-secondary">
                          Lật mở từng bản thảo chưa công bố và những trăn trở của dịch giả trước những ngữ nghĩa cổ kính ngàn năm. Một câu chuyện sâu lắng về tinh thần phụng sự vẻ đẹp ngôn ngữ tiếng Việt trong từng dòng thơ ca và đoản thiên văn chương thế giới.
                        </p>
                      </div>

                      <div className="flex flex-col justify-between gap-space-md border-t-0 pt-space-md sm:flex-row sm:items-center">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-surface-container">
                            <img
                              className="h-full w-full object-cover"
                              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBj31IvgQ8FDvWmq3KWlgDQ3ALqDVyyEDXNWDQl3YHZSUj4J_e17frc1FjqQCDEA2wSAwEOvWqEBTuA7mpJAWszTbMA00iz6Q91wTD2BgM-c4luV2nLnDt6QDY9xLWYOrrlnViLa41dYRupVb7qiLFNWUEPTUilNp_SISeMZ1M950c7Q6xwBVdpdxpFzAuMWFiGkHNEfydJnvOKQtMqpVxqWL6UOCBvYjXo1ZTCDGZKkedJdZ9V1A4b"
                              alt="Trần Hoàng Nam"
                            />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-label-md text-label-md font-semibold text-text-primary">Trần Hoàng Nam</span>
                            <span className="font-body-sm text-body-sm text-text-muted">Chủ nhiệm ban biên soạn • 12 Tháng 10, 2026</span>
                          </div>
                        </div>
                        <Link
                          className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg bg-primary-container px-4 py-2.5 text-label-md font-label-md font-semibold text-on-primary shadow-sm transition-colors hover:bg-primary"
                          href="/blog/gap-go-dich-gia-le-quang"
                        >
                          <span>Đọc toàn bộ bài viết</span>
                          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </section>

              <div className="grid grid-cols-1 items-start gap-space-xl lg:grid-cols-12">
                <main className="flex flex-col gap-space-xl lg:col-span-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-6 w-2.5 rounded-full bg-primary" />
                      <h3 className="font-headline-sm text-headline-sm font-bold text-primary">Bài viết mới nhất trên Dalifa</h3>
                    </div>
                    <span className="font-label-sm text-label-sm text-text-muted">Hiển thị 6 trên 128 bài viết</span>
                  </div>

                  <div className="grid grid-cols-1 gap-space-lg md:grid-cols-2">
                    {articleCards.map((article) => (
                      <article
                        key={article.title}
                        className="group flex flex-col justify-between overflow-hidden rounded-xl bg-surface-card shadow-[0_2px_12px_rgba(15,41,66,0.04)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(15,41,66,0.08)]"
                      >
                        <div>
                          <div className="relative h-48 w-full overflow-hidden bg-surface-subtle">
                            <img
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                              src={article.image}
                              alt={article.title}
                            />
                            <span className="absolute left-3 top-3 rounded bg-surface-card/90 px-2.5 py-1 text-label-sm font-label-sm font-semibold text-primary shadow-sm backdrop-blur">
                              {article.category}
                            </span>
                            <span className="absolute bottom-3 right-3 rounded bg-primary/70 px-2 py-0.5 text-label-sm font-label-sm text-on-primary backdrop-blur">
                              {article.readTime}
                            </span>
                          </div>
                          <div className="p-space-lg">
                            <h4 className="mb-space-sm line-clamp-2 font-headline-sm text-headline-sm leading-snug text-text-primary transition-colors group-hover:text-primary">
                              <Link href={article.title.includes("Gặp gỡ dịch giả") ? "/blog/gap-go-dich-gia-le-quang" : "/blog"}>{article.title}</Link>
                            </h4>
                            <p className="mb-space-md line-clamp-3 font-body-md text-body-md leading-relaxed text-text-secondary">
                              {article.summary}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between px-space-lg pb-space-lg pt-0">
                          <div className="flex items-center gap-2">
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-surface-container text-label-sm font-label-sm font-bold text-primary">
                              {article.avatar}
                            </div>
                            <span className="font-label-sm text-label-sm font-medium text-text-primary">{article.author}</span>
                          </div>
                          <span className="font-body-sm text-body-sm text-text-muted">{article.date}</span>
                        </div>
                      </article>
                    ))}
                  </div>

                  <nav aria-label="Phân trang danh sách bài viết" className="mt-space-md flex items-center justify-between rounded-xl bg-surface-card p-space-md shadow-sm">
                    <button className="flex cursor-not-allowed items-center gap-1 rounded-lg bg-surface-subtle px-4 py-2 text-label-md font-label-md text-text-muted" disabled type="button">
                      <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                      <span className="hidden sm:inline">Trang trước</span>
                    </button>
                    <div className="flex items-center gap-1">
                      <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-label-md font-label-md font-semibold text-on-primary shadow-sm" type="button">
                        1
                      </button>
                      <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-card text-label-md font-label-md text-text-primary transition-colors hover:bg-surface-subtle" type="button">
                        2
                      </button>
                      <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-card text-label-md font-label-md text-text-primary transition-colors hover:bg-surface-subtle" type="button">
                        3
                      </button>
                      <span className="px-2 text-text-muted">...</span>
                      <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-card text-label-md font-label-md text-text-primary transition-colors hover:bg-surface-subtle" type="button">
                        8
                      </button>
                    </div>
                    <button className="flex items-center gap-1 rounded-lg bg-surface-subtle px-4 py-2 text-label-md font-label-md font-semibold text-primary transition-colors hover:bg-surface-container" type="button">
                      <span className="hidden sm:inline">Tiếp theo</span>
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </button>
                  </nav>
                </main>

                <aside className="flex flex-col gap-space-xl lg:col-span-4">
                  <div className="rounded-xl bg-surface-card p-space-lg shadow-[0_2px_12px_rgba(15,41,66,0.04)]">
                    <div className="mb-space-md flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[22px] text-secondary">trending_up</span>
                        <h4 className="font-headline-sm text-headline-sm font-bold text-primary">Đọc nhiều nhất tuần</h4>
                      </div>
                      <span className="h-2 w-2 animate-pulse rounded-full bg-secondary-container" />
                    </div>

                    <div className="flex flex-col gap-space-md">
                      {trendingItems.map((item) => (
                        <a key={item.rank} className="group flex items-start gap-space-md rounded-lg p-2 transition-colors hover:bg-surface-subtle" href="#">
                          <span className="w-8 shrink-0 font-headline-md text-headline-md font-bold text-surface-tint opacity-40 transition-all group-hover:text-primary group-hover:opacity-100">
                            {item.rank}
                          </span>
                          <div className="min-w-0 flex-1">
                            <h5 className="line-clamp-2 font-label-md text-label-md font-semibold leading-snug text-text-primary transition-colors group-hover:text-primary">
                              {item.title}
                            </h5>
                            <div className="mt-1 flex items-center gap-2 font-body-sm text-body-sm text-text-muted">
                              <span>{item.meta}</span>
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl bg-surface-card p-space-lg shadow-[0_2px_12px_rgba(15,41,66,0.04)]">
                    <div className="mb-space-md flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[22px] text-primary">book_2</span>
                        <h4 className="font-headline-sm text-headline-sm font-bold text-primary">Sách nhắc đến trong bài</h4>
                      </div>
                      <span className="font-label-sm text-label-sm font-semibold text-secondary">Tuyển chọn</span>
                    </div>

                    <div className="flex flex-col gap-space-md">
                      {featuredBooks.map((book) => (
                        <div key={book.title} className="flex items-center gap-3 rounded-lg bg-surface-subtle p-2.5 transition-colors hover:bg-surface-container-low">
                          <div className="h-24 w-16 shrink-0 overflow-hidden rounded bg-surface-card p-1 shadow-sm">
                            <img className="h-full w-full object-contain" src={book.image} alt={book.title} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h6 className="truncate font-label-md text-label-md font-semibold text-text-primary">{book.title}</h6>
                            <p className="truncate font-body-sm text-body-sm text-text-secondary">{book.author}</p>
                            <div className="mt-1 flex items-baseline gap-2">
                              <span className="font-price-md text-price-md text-secondary">{book.price}</span>
                              <span className="font-body-sm text-body-sm text-text-muted line-through">{book.original}</span>
                            </div>
                            <button className="mt-2 flex w-full items-center justify-center gap-1 rounded bg-primary px-3 py-1.5 text-label-sm font-label-sm font-semibold text-on-primary transition-all hover:bg-primary-container" type="button">
                              <span className="material-symbols-outlined text-[15px]">add_shopping_cart</span>
                              <span>Mua nhanh</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary via-primary-container to-primary p-space-xl text-on-primary shadow-[0_8px_24px_rgba(0,20,40,0.15)]">
                    <div className="pointer-events-none absolute -bottom-8 -right-8 opacity-10">
                      <span className="material-symbols-outlined text-[180px]">mark_email_unread</span>
                    </div>
                    <div className="relative z-10">
                      <div className="mb-space-md flex h-10 w-10 items-center justify-center rounded-full bg-surface-card/10 backdrop-blur-sm">
                        <span className="material-symbols-outlined text-[24px] text-secondary-fixed">coffee</span>
                      </div>
                      <h4 className="mb-space-xs font-headline-sm text-headline-sm font-bold leading-tight">Tuyển tập Dalifa Sáng Chủ Nhật</h4>
                      <p className="mb-space-lg font-body-sm text-body-sm leading-relaxed text-surface-dim">
                        Mỗi 7h00 sáng cuối tuần, nhận 01 bài điểm sách đắt giá, 03 trích dẫn tinh hoa và danh mục tác phẩm mới được tuyển chọn bởi ban biên tập.
                      </p>
                      <form className="flex flex-col gap-2.5" id="newsletter-form">
                        <input
                          id="newsletter-email"
                          className="w-full rounded-lg bg-surface-card px-3.5 py-2.5 text-body-md font-body-md text-text-primary placeholder:text-text-muted shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary-fixed"
                          placeholder="Nhập email cá nhân của bạn..."
                          required
                          type="email"
                        />
                        <button
                          className="flex w-full items-center justify-center gap-2 rounded-lg bg-secondary px-2.5 py-2.5 text-label-md font-label-md font-semibold text-on-secondary shadow-md transition-all hover:bg-on-secondary-container"
                          type="submit"
                        >
                          <span className="material-symbols-outlined text-[18px]">outgoing_mail</span>
                          <span>Đăng ký nhận thư tuyển</span>
                        </button>
                      </form>
                      <span className="mt-3 inline-block w-full text-center font-label-sm text-label-sm text-surface-container-high/70">
                        Không spam • Hủy đăng ký bất kỳ lúc nào chỉ bằng 1 nhấp
                      </span>
                    </div>
                  </div>

                  <div className="rounded-xl bg-surface-container-low p-space-lg text-center font-body-sm text-body-sm italic text-text-secondary">
                    <span className="material-symbols-outlined mb-1 block text-[28px] text-primary/30">format_quote</span>
                    "Một cuốn sách hay là một người bạn không bao giờ đổi thay, một người thầy không bao giờ quở trách, và một thế giới không bao giờ giới hạn."
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}