"use client";

import Link from "next/link";
import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function BlogArticlePage({ params }: { params: { slug: string } }) {
  useEffect(() => {
    const article = document.getElementById("articleContent");
    const progressBar = document.getElementById("readingProgress");

    const updateProgress = () => {
      if (!article || !progressBar) return;
      const rect = article.getBoundingClientRect();
      const totalHeight = article.offsetHeight;
      const visibleScrolled = Math.max(0, -rect.top);
      const percent = Math.min(100, Math.max(0, Math.round((visibleScrolled / totalHeight) * 100)));
      progressBar.style.width = percent + "%";
    };

    const bookmarkBtn = document.getElementById("btnBookmark");
    if (bookmarkBtn) {
      let bookmarked = false;
      bookmarkBtn.addEventListener("click", () => {
        bookmarked = !bookmarked;
        const icon = bookmarkBtn.querySelector(".material-symbols-outlined") as HTMLElement | null;
        const text = bookmarkBtn.querySelector("span:last-child");
        if (icon && text) {
          if (bookmarked) {
            icon.textContent = "bookmark";
            icon.style.fontVariationSettings = "'FILL' 1";
            text.textContent = "Đã lưu";
            bookmarkBtn.classList.add("bg-primary-container", "text-on-primary");
          } else {
            icon.textContent = "bookmark_border";
            icon.style.fontVariationSettings = "'FILL' 0";
            text.textContent = "Lưu bài";
            bookmarkBtn.classList.remove("bg-primary-container", "text-on-primary");
          }
        }
      });
    }

    const likeBtn = document.getElementById("likeButton");
    const likeCountSpan = document.getElementById("likeCount");
    if (likeBtn && likeCountSpan) {
      let liked = false;
      likeBtn.addEventListener("click", () => {
        liked = !liked;
        let count = Number.parseInt(likeCountSpan.textContent || "142", 10);
        if (liked) {
          count += 1;
          likeBtn.classList.add("bg-status-rose-bg", "text-status-rose-text");
        } else {
          count -= 1;
          likeBtn.classList.remove("bg-status-rose-bg", "text-status-rose-text");
        }
        likeCountSpan.textContent = String(count);
      });
    }

    const copyLinkBtn = document.getElementById("btnCopyLink");
    if (copyLinkBtn) {
      copyLinkBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(window.location.href);
        alert("Đã sao chép liên kết bài viết vào bộ nhớ tạm!");
      });
    }

    const textZoomBtn = document.getElementById("btnTextZoom");
    const articleBody = document.getElementById("articleContent");
    if (textZoomBtn && articleBody) {
      let isZoomed = false;
      textZoomBtn.addEventListener("click", () => {
        isZoomed = !isZoomed;
        const paragraphs = articleBody.querySelectorAll("p");
        paragraphs.forEach((p) => {
          if (isZoomed) {
            p.classList.add("text-[18px]", "leading-[30px]");
          } else {
            p.classList.remove("text-[18px]", "leading-[30px]");
          }
        });
        textZoomBtn.classList.toggle("bg-primary", isZoomed);
        textZoomBtn.classList.toggle("text-on-primary", isZoomed);
      });
    }

    updateProgress();
    window.addEventListener("scroll", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
    };
  }, []);

  return (
    <div className="bg-surface font-body-md text-on-surface antialiased">
      <Header active="blog" />

      <main className="w-full bg-surface pt-[160px]">
        <div className="flex w-full flex-col">
          <div className="sticky top-40 z-40 h-1 w-full overflow-hidden bg-surface-subtle">
            <div id="readingProgress" className="h-full w-[24%] bg-secondary-container transition-all duration-150" />
          </div>

          <div className="w-full bg-surface-canvas px-margin-desktop py-space-sm">
            <div className="mx-auto flex max-w-[1200px] items-center justify-between text-body-sm font-body-sm text-text-muted">
              <nav aria-label="Breadcrumb" className="flex items-center gap-2 overflow-x-auto whitespace-nowrap py-1">
                <Link className="flex items-center gap-1 transition-colors hover:text-primary" href="/">
                  <span className="material-symbols-outlined text-[16px]">home</span>
                  <span>Trang chủ</span>
                </Link>
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                <Link className="transition-colors hover:text-primary" href="/blog">
                  Tin tức &amp; Bài viết
                </Link>
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                <Link className="transition-colors hover:text-primary" href="/blog?category=doi-thoai">
                  Đối thoại Tác giả &amp; Dịch giả
                </Link>
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                <span className="max-w-xs truncate text-text-primary font-medium md:max-w-md">
                  Gặp gỡ dịch giả Lê Quang
                </span>
              </nav>

              <div className="hidden items-center gap-3 md:flex">
                <button
                  id="btnTextZoom"
                  className="flex items-center gap-1 rounded bg-surface-card px-2.5 py-1 text-text-secondary shadow-sm transition-colors hover:bg-surface-subtle"
                  title="Chế độ đọc dễ nhìn"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">text_fields</span>
                  <span className="font-label-sm text-label-sm">Cỡ chữ đọc</span>
                </button>
                <span className="text-xs text-text-muted">•</span>
                <span className="flex items-center gap-1 text-text-secondary">
                  <span className="material-symbols-outlined text-[16px] text-secondary">verified</span>
                  <span>Chuyên mục Tuyển chọn Dalifa</span>
                </span>
              </div>
            </div>
          </div>

          <div className="w-full px-margin-desktop py-space-xl">
            <div className="mx-auto flex max-w-[1200px] flex-col gap-space-2xl">
              <header className="flex max-w-4xl flex-col gap-space-md">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="rounded-full bg-primary-container px-3 py-1 text-label-sm font-label-sm uppercase tracking-wide text-on-primary">
                    Đối thoại Tác giả &amp; Dịch giả
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-status-amber-bg px-3 py-1 text-label-sm font-label-sm text-status-amber-text">
                    <span className="material-symbols-outlined text-[15px]">auto_awesome</span>
                    <span>Bài viết tuyển chọn</span>
                  </span>
                  <span className="ml-auto inline-flex items-center gap-1 text-body-sm font-body-sm text-text-muted">
                    <span className="material-symbols-outlined text-[16px]">schedule</span>
                    <span>9 phút đọc sâu</span>
                  </span>
                </div>

                <h1 className="font-headline-lg text-headline-lg leading-snug tracking-tight text-text-primary">
                  Gặp gỡ dịch giả Lê Quang: “Mỗi bản dịch là một lần tái sinh của ngôn từ”
                </h1>
                <p className="font-body-lg text-body-lg leading-relaxed text-text-secondary">
                  Cuộc trò chuyện sâu sắc về hành trình chuyển ngữ các tác phẩm kinh điển, những giằng xé giữa lòng trung thành nguyên tác và sự phóng khoáng bay bổng trong tiếng Việt văn chương đương đại.
                </p>

                <div className="flex flex-col justify-between gap-space-md border-t border-surface-border/60 pt-space-sm sm:flex-row sm:items-center">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full bg-surface-subtle shadow-sm">
                      <img
                        className="h-full w-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6htFuNVomfEJIyU3_6SGxf33p4LRKkirvkbMczCXUg0t-vsxnT9arwuoknLyABULXjWTzKC-SeaCirG06WwNqYVgLuzMQG6K1me6OtbGEoiYav36zFyHXiO1_qgalX4hBmDLzp09lkCORQCx1LaVN7H7YZi-p1shU80lnL9j7zB1c0JZcRirUhT8KJwLEdkz2Z3fzYip2tRkOdHYJhSzfxAclPAh12eh_Cqk7PLLhdiG9pb7O4MHH"
                        alt="Hà Mai Anh"
                      />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-label-md text-label-md font-semibold text-text-primary">Hà Mai Anh</span>
                        <span className="rounded bg-surface-subtle px-2 py-0.5 text-[11px] font-semibold text-text-secondary">Ban Biên tập Văn học</span>
                      </div>
                      <div className="flex items-center gap-2 font-body-sm text-body-sm text-text-muted">
                        <time dateTime="2026-10-10">10 Tháng 10, 2026</time>
                        <span>•</span>
                        <span>Cập nhật: 11 Tháng 10, 2026</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      id="btnBookmark"
                      className="flex items-center gap-1.5 rounded-lg bg-surface-card px-3.5 py-2 text-text-secondary shadow-sm transition-all hover:bg-surface-subtle"
                      title="Lưu bài viết vào bộ sưu tập"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[20px] text-primary">bookmark_border</span>
                      <span className="font-label-sm text-label-sm">Lưu bài</span>
                    </button>
                    <div className="h-6 w-px bg-surface-border" />
                    <div className="flex items-center gap-1.5">
                      <a className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-card text-text-secondary shadow-sm transition-colors hover:bg-surface-subtle hover:text-primary" href="#" title="Chia sẻ qua Facebook">
                        <span className="material-symbols-outlined text-[19px]">share</span>
                      </a>
                      <a className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-card text-text-secondary shadow-sm transition-colors hover:bg-surface-subtle hover:text-primary" href="#" title="Đăng lên X / Twitter">
                        <span className="material-symbols-outlined text-[19px]">alternate_email</span>
                      </a>
                      <button
                        id="btnCopyLink"
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-card text-text-secondary shadow-sm transition-colors hover:bg-surface-subtle hover:text-primary"
                        title="Sao chép liên kết"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[19px]">link</span>
                      </button>
                    </div>
                  </div>
                </div>
              </header>

              <div className="grid grid-cols-1 items-start gap-space-2xl lg:grid-cols-12">
                <article id="articleContent" className="flex flex-col gap-space-xl lg:col-span-8">
                  <figure className="flex flex-col gap-2 overflow-hidden rounded-xl bg-surface-card shadow-sm">
                    <div className="relative h-[420px] overflow-hidden bg-surface-subtle">
                      <img
                        className="h-full w-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJKmTFJPUbAhaqCnJkds_w3kUjGdlvQ--NvA9TXPIuEflChiRG198JSgEl44Exjkkgt0El8QEDM6P4LbQDqZgw5bIT40CYrFQ8aVEGdRvNDIT5LUwOdLheHVlJ3o9Epo2wDzBJOYmhOdUiLq-ZWFn6vTnQ104-mRteBk5IYjsY3M33Ytwo-j1hSkFB-_9kUDalAB-MV-kK8SJGpwdlJFY75lHz0IHl_Bmg_N1RF27qAwtFYPygiZtQ"
                        alt="Dịch giả Lê Quang"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
                      <span className="absolute bottom-3 left-4 rounded bg-primary/80 px-3 py-1 text-label-sm font-label-sm text-on-primary backdrop-blur">
                        Ảnh: Dalifa Studio / Hoàn Kiếm, Hà Nội
                      </span>
                    </div>
                    <figcaption className="px-4 py-2 font-body-sm text-body-sm italic text-text-secondary">
                      Dịch giả Lê Quang tại thư phòng riêng: “Càng đi sâu vào thế giới của nguyên tác, người dịch càng thấm thía sự khiêm nhường trước ngôn từ.”
                    </figcaption>
                  </figure>

                  <nav aria-label="Mục lục bài viết" className="rounded-xl bg-surface-container-low p-space-lg shadow-sm">
                    <div className="mb-space-sm flex items-center gap-2 text-primary">
                      <span className="material-symbols-outlined text-[20px]">format_list_numbered</span>
                      <span className="font-headline-sm text-headline-sm font-semibold">Nội dung chính trong bài đối thoại</span>
                    </div>
                    <ul className="flex flex-col gap-2.5 font-label-md text-label-md">
                      <li>
                        <a className="group flex items-center justify-between py-1 text-text-primary transition-colors hover:text-secondary" href="#section-1">
                          <span className="flex items-center gap-2">
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-surface-card text-xs font-semibold text-primary shadow-sm">1</span>
                            <span className="group-hover:underline">Tiếng vọng nguyên tác giữa lòng tiếng Việt</span>
                          </span>
                          <span className="material-symbols-outlined text-[16px] text-text-muted transition-transform group-hover:translate-x-1">arrow_forward</span>
                        </a>
                      </li>
                      <li>
                        <a className="group flex items-center justify-between py-1 text-text-primary transition-colors hover:text-secondary" href="#section-2">
                          <span className="flex items-center gap-2">
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-surface-card text-xs font-semibold text-primary shadow-sm">2</span>
                            <span className="group-hover:underline">Những rào cản vô hình khi dịch văn phong thế kỷ 20</span>
                          </span>
                          <span className="material-symbols-outlined text-[16px] text-text-muted transition-transform group-hover:translate-x-1">arrow_forward</span>
                        </a>
                      </li>
                      <li>
                        <a className="group flex items-center justify-between py-1 text-text-primary transition-colors hover:text-secondary" href="#section-3">
                          <span className="flex items-center gap-2">
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-surface-card text-xs font-semibold text-primary shadow-sm">3</span>
                            <span className="group-hover:underline">Lời khuyên dành cho bạn đọc trẻ khi tiếp cận sách dịch</span>
                          </span>
                          <span className="material-symbols-outlined text-[16px] text-text-muted transition-transform group-hover:translate-x-1">arrow_forward</span>
                        </a>
                      </li>
                    </ul>
                  </nav>

                  <section id="section-1" className="flex scroll-mt-48 flex-col gap-space-md">
                    <h2 className="font-headline-md text-headline-md text-text-primary">1. Tiếng vọng nguyên tác giữa lòng tiếng Việt</h2>
                    <p className="font-body-lg text-body-lg leading-relaxed text-text-secondary">
                      Trong không gian ấm cúng ngập tràn hương gỗ sồi và mùi giấy cũ tại phố Đinh Lễ, dịch giả Lê Quang mở đầu câu chuyện bằng một tách trà ấm. Với ông, dịch thuật chưa bao giờ đơn thuần là công việc cơ học của một cỗ máy đối chiếu từ vựng. Đó là hành trình lắng nghe những rung cảm tinh vi nhất mà tác giả nguyên tác đã gửi gắm qua từng dấu chấm phẩy.
                    </p>
                    <p className="font-body-lg text-body-lg leading-relaxed text-text-secondary">
                      “Nhiều người thường lầm tưởng rằng chỉ cần nắm vững ngữ pháp và từ vựng ngoại ngữ là có thể bắt tay vào dịch văn chương. Nhưng thực ra, cửa ải hiểm hóc nhất lại nằm ở chính vốn tiếng mẹ đẻ của người dịch. Tiếng Việt của chúng ta giàu nhạc tính, giàu hình ảnh và đa tầng sắc thái biểu cảm. Để một câu văn tiếng Đức hay tiếng Pháp khi bước sang tiếng Việt không bị khựng lại như một cơ thể ngoại lai, người dịch phải gạn đục khơi trong từng nhịp điệu,” dịch giả chia sẻ.
                    </p>
                  </section>

                  <figure className="relative my-space-md overflow-hidden rounded-xl bg-primary p-space-xl text-on-primary shadow-md">
                    <div className="pointer-events-none absolute -bottom-6 -right-6 text-on-primary/10 select-none">
                      <span className="material-symbols-outlined text-[160px] leading-none">format_quote</span>
                    </div>
                    <div className="relative z-10 flex flex-col gap-space-md">
                      <div className="h-1 w-12 rounded-full bg-secondary" />
                      <blockquote className="font-headline-md text-headline-md italic leading-snug">
                        “Dịch văn học không phải là bài toán giải mã từ điển, mà là cuộc hòa nhạc mà ở đó dịch giả phải lắng nghe nhịp thở của tác giả rồi chơi lại bản nhạc ấy bằng nhạc cụ tiếng Việt.”
                      </blockquote>
                      <figcaption className="flex items-center gap-2 font-label-md text-label-md text-on-primary-container">
                        <span className="font-semibold text-on-primary">Dịch giả Lê Quang</span>
                        <span>— Trò chuyện cùng DalifaBooks</span>
                      </figcaption>
                    </div>
                  </figure>

                  <section id="section-2" className="flex scroll-mt-48 flex-col gap-space-md">
                    <h2 className="font-headline-md text-headline-md text-text-primary">2. Những rào cản vô hình khi dịch văn phong thế kỷ 20</h2>
                    <p className="font-body-lg text-body-lg leading-relaxed text-text-secondary">
                      Khi bước vào những trước tác văn học giữa thế kỷ 20, người dịch liên tục phải đối mặt với các cấu trúc câu phức tạp phản ánh sự hoài nghi hiện sinh của thời đại. Làm thế nào để giữ trọn vẹn sự u hoài hay châm biếm sâu cay mà không biến bản dịch thành một mớ văn tự rườm rà?
                    </p>

                    <div className="my-space-sm grid grid-cols-1 gap-space-md md:grid-cols-2">
                      <div className="flex flex-col gap-2 overflow-hidden rounded-xl bg-surface-card shadow-sm">
                        <div className="h-60 overflow-hidden bg-surface-subtle">
                          <img
                            className="h-full w-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDs3fwaVzEbIpN1rkEedGSww3tIWgkpe88XBLnb0LocoZCPeCMt2GmuFg_Dy2rfS6KI9CeV0f83SgD44TaYTzYH9xD2UqoLPesyilRsH_Dhccmud1BfPzVDxgAnnD0-Ot8qHyRdVYb_PX0U95eMgYGtcScv2RjnTz-EOXdqEIp7Lk9to_Tin8ueEwueug_88hib7hxyH_PNmN1E_giIU-7jvZULxYxDgePgt8TYSf4vVDtQakJ7jlF6"
                            alt="Bản thảo dịch"
                          />
                        </div>
                        <span className="p-3 font-body-sm text-body-sm italic text-text-secondary">
                          Các bản thảo nháp viết tay với nhiều lần cân nhắc lựa chọn từ vựng tương đương.
                        </span>
                      </div>

                      <div className="flex flex-col gap-2 overflow-hidden rounded-xl bg-surface-card shadow-sm">
                        <div className="h-60 overflow-hidden bg-surface-subtle">
                          <img
                            className="h-full w-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9F9Gc1s-0-34tlSVBsKfeMg1mEoZyQYeJhTqg0lqGSxFhylvHgf6hYuMOxJ0Qhw-9REaStcP8_HLqhHxmhcns1eYrMAhhXAjii95wEbK827Vo_tDcD8ezs8QWZOhkiJ-s3zxT_AJrpFULBTswU9XSY59RSfObchOPJCTMl-xXtwVD-PJtLnOW4LsNMmU3BrfFBi5N_iFp9kYtYy5KaDvMAkajMb2Jfk8cnRIzHWaWNnKiXut8rG7h"
                            alt="Ấn bản hoàn thiện"
                          />
                        </div>
                        <span className="p-3 font-body-sm text-body-sm italic text-text-secondary">
                          Ấn bản hoàn thiện do DalifaBooks ấn hành với sự trau chuốt từng trang in.
                        </span>
                      </div>
                    </div>

                    <p className="font-body-lg text-body-lg leading-relaxed text-text-secondary">
                      Theo ông, một bản dịch xuất sắc là bản dịch làm cho độc giả quên đi cảm giác mình đang đọc một tác phẩm chuyển ngữ. Người đọc như được đối thoại trực diện với tâm hồn nhà văn, đồng cảm với nỗi đau và niềm hân hoan của nhân vật mà không bị ngắt quãng bởi những vết gập ngôn ngữ thiếu tự nhiên.
                    </p>
                  </section>

                  <section id="section-3" className="flex scroll-mt-48 flex-col gap-space-md">
                    <h2 className="font-headline-md text-headline-md text-text-primary">3. Lời khuyên dành cho bạn đọc trẻ khi tiếp cận sách dịch</h2>
                    <p className="font-body-lg text-body-lg leading-relaxed text-text-secondary">
                      Kết thúc buổi trò chuyện, dịch giả Lê Quang gửi gắm đôi điều tới những độc giả trẻ đang bắt đầu hành trình khám phá thế giới qua những trang sách dịch. Ông khuyến khích bạn đọc hãy kiên nhẫn hơn, cho phép mình chìm đắm trong nhịp điệu chậm rãi của văn chương cổ điển thay vì vội vã lướt qua.
                    </p>

                    <div className="flex flex-col gap-space-sm rounded-xl bg-surface-canvas p-space-lg shadow-sm">
                      <div className="flex items-center gap-2 font-semibold text-primary">
                        <span className="material-symbols-outlined text-[20px] text-secondary">lightbulb</span>
                        <span className="font-headline-sm text-headline-sm">Ba thói quen nuôi dưỡng cảm thụ văn học từ Dịch giả:</span>
                      </div>
                      <ul className="flex flex-col gap-2.5 font-body-md text-body-md text-text-secondary">
                        <li className="flex items-start gap-2">
                          <span className="material-symbols-outlined mt-0.5 shrink-0 text-[18px] text-secondary">check_circle</span>
                          <span><strong>Đọc chậm và đọc to thành tiếng:</strong> Giúp cảm nhận được nhịp điệu thanh trắc và tính nhạc trong câu văn tiếng Việt.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="material-symbols-outlined mt-0.5 shrink-0 text-[18px] text-secondary">check_circle</span>
                          <span><strong>Tìm hiểu bối cảnh văn hóa - lịch sử:</strong> Mỗi cuốn sách đều ra đời trong một thời khắc lịch sử cụ thể với những ám ảnh riêng.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="material-symbols-outlined mt-0.5 shrink-0 text-[18px] text-secondary">check_circle</span>
                          <span><strong>So sánh các bản dịch khác nhau:</strong> Đây là cách tốt nhất để thấy sự phong phú kỳ diệu của ngôn ngữ và góc nhìn người dịch.</span>
                        </li>
                      </ul>
                    </div>
                  </section>

                  <section className="flex flex-col gap-space-md rounded-xl bg-surface-container-low p-space-lg shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[24px] text-primary">menu_book</span>
                        <h3 className="font-headline-sm text-headline-sm font-semibold text-text-primary">Tác phẩm được nhắc đến trong bài đối thoại</h3>
                      </div>
                      <span className="font-label-sm text-label-sm font-semibold text-secondary">Ưu đãi độc quyền bạn đọc</span>
                    </div>

                    <div className="grid grid-cols-1 gap-space-md sm:grid-cols-2">
                      <div className="flex items-stretch gap-3.5 rounded-lg bg-surface-card p-3.5 shadow-sm transition-shadow hover:shadow-md">
                        <div className="aspect-[2/3] w-24 shrink-0 overflow-hidden rounded bg-surface-subtle">
                          <img
                            className="h-full w-full object-contain"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCphdEsyIDGux-L_-ydwFJLLq0hy92t_QedQ6zCKjAGBRdgG-GhhftZ_MyChV8MYvvIB5bJrZuNNOu45Ri5vCmNUHWdHyfvfS-nXyR3RuFf9er0ZDhMuWqOHvPnpclA3lMNTfbTb2IeXbBIjx3WRDL0ZET4H3dh4JL47ibfHox6FVWCv5l-dmvXJ_WvwzEiUHkB9tjsYTtlPxWcnC2Hw6ALW4md0z8FP9PjbQX6DinsvfdnIuq5GxKp"
                            alt="Chiến Binh Cầu Vồng"
                          />
                        </div>
                        <div className="flex min-w-0 flex-1 flex-col justify-between">
                          <div className="flex flex-col">
                            <span className="truncate font-label-sm text-label-sm text-text-muted">Nhã Nam &amp; Dalifa phát hành</span>
                            <h4 className="line-clamp-2 font-label-md text-label-md font-bold text-text-primary transition-colors hover:text-primary">
                              Chiến Binh Cầu Vồng
                            </h4>
                            <span className="mt-0.5 font-body-sm text-body-sm text-text-secondary">Andrea Hirata</span>
                          </div>
                          <div className="flex flex-col gap-1.5 pt-2">
                            <div className="flex items-baseline gap-2">
                              <span className="font-price-md text-price-md text-primary">108.000 đ</span>
                              <span className="font-body-sm text-body-sm text-text-muted line-through">135.000 đ</span>
                            </div>
                            <button
                              className="flex w-full items-center justify-center gap-1 rounded bg-primary px-3 py-1.5 text-label-sm font-label-sm font-semibold text-on-primary transition-colors hover:bg-primary-container"
                              onClick={() => alert("Đã thêm Chiến Binh Cầu Vồng vào giỏ hàng!")}
                              type="button"
                            >
                              <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                              <span>Thêm vào giỏ</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-stretch gap-3.5 rounded-lg bg-surface-card p-3.5 shadow-sm transition-shadow hover:shadow-md">
                        <div className="aspect-[2/3] w-24 shrink-0 overflow-hidden rounded bg-surface-subtle">
                          <img
                            className="h-full w-full object-contain"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPqIFc_vHFThThaBGlZ42gqtXid_reMG4jenzgOdrLjoWLCRss2KgSsb9HaXQd72f5RNq7_ywK2GnvZAOsZttF6h94-ddASjjO3dl8TC2MnErtj-JiF6b4uUKkSSuxEjcXbkmFU4TrLMzLmUcN-cgZbd-GKGFJ_N2Cf5Ulnm8tW-AjLMJKSbfLCCpHWCKjaifP2uU9_Oa3SV3laAZC53lC3BtdeheJ-7phI4Tm7cUAJoFxpqaYiI8l"
                            alt="Cây Cam Ngọt Của Tôi"
                          />
                        </div>
                        <div className="flex min-w-0 flex-1 flex-col justify-between">
                          <div className="flex flex-col">
                            <span className="truncate font-label-sm text-label-sm text-text-muted">Tác phẩm kinh điển cảm động</span>
                            <h4 className="line-clamp-2 font-label-md text-label-md font-bold text-text-primary transition-colors hover:text-primary">
                              Cây Cam Ngọt Của Tôi
                            </h4>
                            <span className="mt-0.5 font-body-sm text-body-sm text-text-secondary">José Mauro de Vasconcelos</span>
                          </div>
                          <div className="flex flex-col gap-1.5 pt-2">
                            <div className="flex items-baseline gap-2">
                              <span className="font-price-md text-price-md text-primary">108.000 đ</span>
                              <span className="font-body-sm text-body-sm text-text-muted line-through">120.000 đ</span>
                            </div>
                            <button
                              className="flex w-full items-center justify-center gap-1 rounded bg-primary px-3 py-1.5 text-label-sm font-label-sm font-semibold text-on-primary transition-colors hover:bg-primary-container"
                              onClick={() => alert("Đã thêm Cây Cam Ngọt Của Tôi vào giỏ hàng!")}
                              type="button"
                            >
                              <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                              <span>Thêm vào giỏ</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  <div className="flex flex-col gap-2 rounded-xl bg-surface-card p-space-lg shadow-sm">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold text-text-muted">Lời kết từ Ban Biên tập DalifaBooks</span>
                    <p className="font-body-md text-body-md leading-relaxed text-text-secondary">
                      Những cuộc trò chuyện như thế này nhắc nhở chúng ta rằng, phía sau mỗi bìa sách được in ấn trang trọng là hàng nghìn giờ lao động tĩnh lặng, nhẫn nại và đầy trách nhiệm của những người bắc cầu văn hóa. DalifaBooks xin gửi lời tri ân chân thành đến dịch giả Lê Quang và toàn thể các dịch giả đã cống hiến cho bạn đọc Việt Nam những tác phẩm vô giá.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    <span className="mr-1 flex items-center gap-1 font-label-sm text-label-sm text-text-muted">
                      <span className="material-symbols-outlined text-[16px]">local_offer</span>
                      <span>Chủ đề:</span>
                    </span>
                    <a className="rounded-full bg-surface-card px-3 py-1 text-label-sm font-label-sm text-text-secondary shadow-sm transition-colors hover:bg-surface-subtle" href="#">#DịchThuậtVănHọc</a>
                    <a className="rounded-full bg-surface-card px-3 py-1 text-label-sm font-label-sm text-text-secondary shadow-sm transition-colors hover:bg-surface-subtle" href="#">#LêQuang</a>
                    <a className="rounded-full bg-surface-card px-3 py-1 text-label-sm font-label-sm text-text-secondary shadow-sm transition-colors hover:bg-surface-subtle" href="#">#VănHọcKinhĐiển</a>
                    <a className="rounded-full bg-surface-card px-3 py-1 text-label-sm font-label-sm text-text-secondary shadow-sm transition-colors hover:bg-surface-subtle" href="#">#BànTrònSách</a>
                  </div>

                  <div className="flex flex-col gap-space-lg rounded-xl bg-surface-card p-space-lg shadow-sm">
                    <div className="flex flex-col justify-between gap-space-md sm:flex-row sm:items-center">
                      <div className="flex items-center gap-3">
                        <button id="likeButton" className="flex items-center gap-2 rounded-lg bg-surface-subtle px-4 py-2 text-label-md font-label-md text-text-primary transition-colors hover:bg-surface-container" type="button">
                          <span className="material-symbols-outlined text-[20px] text-secondary">favorite</span>
                          <span>Thích bài viết</span>
                          <span id="likeCount" className="rounded-full bg-surface-card px-2 py-0.5 text-xs font-bold text-primary shadow-sm">142</span>
                        </button>
                        <button className="flex items-center gap-2 rounded-lg bg-surface-subtle px-4 py-2 text-label-md font-label-md text-text-primary transition-colors hover:bg-surface-container" onClick={() => navigator.clipboard.writeText(window.location.href)} type="button">
                          <span className="material-symbols-outlined text-[20px]">share</span>
                          <span>Lan tỏa bài viết</span>
                        </button>
                      </div>
                      <span className="font-body-sm text-body-sm text-text-muted">Đã có 1.840 lượt đọc bài viết này</span>
                    </div>

                    <form className="flex flex-col gap-space-md pt-space-sm" onSubmit={(event) => {
                      event.preventDefault();
                      const success = document.getElementById("commentSuccess");
                      if (success) {
                        success.classList.remove("hidden");
                      }
                      event.currentTarget.reset();
                    }}>
                      <div className="flex items-center gap-2 font-semibold text-text-primary">
                        <span className="material-symbols-outlined text-[20px]">chat_bubble_outline</span>
                        <span className="font-headline-sm text-headline-sm">Gửi cảm nhận của bạn về bài viết này</span>
                      </div>

                      <div className="grid grid-cols-1 gap-space-md sm:grid-cols-2">
                        <div className="flex flex-col gap-1">
                          <label className="font-label-sm text-label-sm font-medium text-text-secondary">Họ và tên của bạn *</label>
                          <input className="w-full rounded-lg bg-surface-canvas px-3.5 py-2.5 text-body-md font-body-md text-text-primary placeholder:text-text-muted shadow-sm transition-all focus:bg-surface-card focus:outline-none" placeholder="Ví dụ: Trần Minh Tuệ" required type="text" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="font-label-sm text-label-sm font-medium text-text-secondary">Email liên hệ (được bảo mật)</label>
                          <input className="w-full rounded-lg bg-surface-canvas px-3.5 py-2.5 text-body-md font-body-md text-text-primary placeholder:text-text-muted shadow-sm transition-all focus:bg-surface-card focus:outline-none" placeholder="name@example.com" type="email" />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="font-label-sm text-label-sm font-medium text-text-secondary">Cảm nghĩ hoặc câu hỏi dành cho dịch giả *</label>
                        <textarea className="w-full rounded-lg bg-surface-canvas px-3.5 py-2.5 text-body-md font-body-md text-text-primary placeholder:text-text-muted shadow-sm transition-all focus:bg-surface-card focus:outline-none" placeholder="Chia sẻ suy nghĩ của bạn về bản dịch hoặc câu chuyện phía trên..." required rows={4} />
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="font-body-sm text-body-sm text-text-muted">Bình luận tuân thủ tiêu chuẩn cộng đồng văn minh Dalifa.</span>
                        <button className="rounded-lg bg-primary px-6 py-2.5 text-label-md font-label-md font-semibold text-on-primary shadow-sm transition-colors hover:bg-primary-container" type="submit">
                          Gửi bình luận
                        </button>
                      </div>

                      <div id="commentSuccess" className="hidden flex items-center gap-2 rounded-lg bg-status-emerald-bg p-3 text-body-sm font-body-sm text-status-emerald-text">
                        <span className="material-symbols-outlined text-[18px]">check_circle</span>
                        <span>Cảm ơn bạn! Cảm nhận của bạn đã được ghi nhận và gửi đến Ban Biên tập xét duyệt.</span>
                      </div>
                    </form>
                  </div>
                </article>

                <aside className="flex flex-col gap-space-xl lg:sticky lg:top-48 lg:col-span-4">
                  <div className="flex flex-col gap-space-md rounded-xl bg-surface-card p-space-lg shadow-sm">
                    <span className="font-label-sm text-label-sm font-semibold uppercase tracking-wider text-text-muted">Tác giả bài viết</span>
                    <div className="flex items-center gap-3">
                      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full bg-surface-subtle shadow-sm">
                        <img
                          className="h-full w-full object-cover"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgGAOp0S2OsLfFT_qdFI1Ybf7jnjY8l7BvIdd5JDt02X97AKDSXCKMBkaWLbcXZYjriHjNgTV0oUGbSi1N7QFNaJ5pisfwNLODcFvkhI4avNu75F9-TfBhRQ5npSlmvKRMGA-VC7nusEZ_x_vgz51RGk9ei0lJjbQgOrxd-8ukko_XLVf-MmpTT_pWVUYTrGMCPXx8R1e-2a4cvfwbDhEaA9rQC2AGpyVnY92ylj3iG3qlZyzK_jnO"
                          alt="Hà Mai Anh"
                        />
                      </div>
                      <div className="flex flex-col">
                        <h3 className="font-headline-sm text-headline-sm font-bold text-text-primary">Hà Mai Anh</h3>
                        <span className="font-body-sm text-body-sm text-text-secondary">Trưởng ban Biên tập Văn học dịch</span>
                      </div>
                    </div>
                    <p className="font-body-sm text-body-sm leading-relaxed text-text-secondary">
                      Hơn 8 năm nghiên cứu văn học so sánh và đồng hành cùng các tủ sách kinh điển thế giới. Đam mê khai phóng vẻ đẹp tiềm ẩn của tiếng Việt qua các bản dịch tinh tế.
                    </p>
                    <div className="flex flex-col gap-2 pt-2">
                      <span className="font-label-sm text-label-sm font-medium text-text-muted">Bài viết khác cùng tác giả:</span>
                      <a className="line-clamp-1 font-body-sm text-body-sm text-text-primary transition-colors hover:text-primary hover:underline" href="#">
                        • 10 tác phẩm đoạt giải Nobel đáng đọc trong mùa đông
                      </a>
                      <a className="line-clamp-1 font-body-sm text-body-sm text-text-primary transition-colors hover:text-primary hover:underline" href="#">
                        • Hành trình đưa văn học Mỹ Latin đến độc giả Việt
                      </a>
                    </div>
                  </div>

                  <div className="flex flex-col gap-space-md rounded-xl bg-surface-container-low p-space-lg shadow-sm">
                    <div className="flex items-center gap-2 font-semibold text-primary">
                      <span className="material-symbols-outlined text-[20px] text-secondary">verified_user</span>
                      <h3 className="font-headline-sm text-headline-sm">Chính sách &amp; Cam kết Dalifa</h3>
                    </div>
                    <p className="font-body-sm text-body-sm text-text-secondary">
                      Mỗi cuốn sách bạn nhận được đều là kết tinh của sự tôn trọng bản quyền và quy trình bảo quản tiêu chuẩn bảo tàng.
                    </p>
                    <nav className="flex flex-col gap-2 pt-1 font-label-md text-label-md">
                      <a className="group flex items-center justify-between rounded-lg bg-surface-card p-2.5 text-text-primary shadow-sm transition-colors hover:bg-surface-subtle" href="#">
                        <span className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[18px] text-primary">security</span>
                          <span>Chính sách bảo mật bạn đọc</span>
                        </span>
                        <span className="material-symbols-outlined text-[16px] text-text-muted transition-transform group-hover:translate-x-1">chevron_right</span>
                      </a>
                      <a className="group flex items-center justify-between rounded-lg bg-surface-card p-2.5 text-text-primary shadow-sm transition-colors hover:bg-surface-subtle" href="#">
                        <span className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[18px] text-primary">inventory_2</span>
                          <span>Đóng gói chống sốc &amp; bọc bìa da</span>
                        </span>
                        <span className="material-symbols-outlined text-[16px] text-text-muted transition-transform group-hover:translate-x-1">chevron_right</span>
                      </a>
                      <a className="group flex items-center justify-between rounded-lg bg-surface-card p-2.5 text-text-primary shadow-sm transition-colors hover:bg-surface-subtle" href="#">
                        <span className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[18px] text-primary">description</span>
                          <span>Điều khoản phát hành chính hãng</span>
                        </span>
                        <span className="material-symbols-outlined text-[16px] text-text-muted transition-transform group-hover:translate-x-1">chevron_right</span>
                      </a>
                    </nav>
                  </div>

                  <div className="flex flex-col gap-space-md rounded-xl bg-surface-card p-space-lg shadow-sm">
                    <div className="flex items-center justify-between">
                      <h3 className="font-headline-sm text-headline-sm font-semibold text-text-primary">Cùng chuyên mục</h3>
                      <Link className="font-label-sm text-label-sm text-primary hover:underline" href="/blog">
                        Xem tất cả
                      </Link>
                    </div>

                    <div className="flex flex-col gap-space-md">
                      <Link className="group flex items-center gap-3" href="/blog">
                        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-surface-subtle shadow-sm">
                          <img className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCFYCmToYgiPGRoBg2sz6rvaNCQb5Soq2dJzk9TKuV_A_-txT6mgW8l3uOWht98UL-4cR0DDTBj9KLDX57BBgAyLi-N7It3YL3o1sceW6gnY5uc-QWUqJy6Oa4nlAzpglQL3rhlk4HAVrFhH_U3wf0_iXAS41fdGbcqeJGhdYUa0I5xexcJ_MOdQ9_lXvZ3huO0DmIQnp6ods0n20hu9DQttR4V_b5TG33S9zIXvoAj8wOq4mhHClb" alt="Nhà văn Nguyễn Ngọc Tư" />
                        </div>
                        <div className="flex min-w-0 flex-col">
                          <span className="font-label-sm text-label-sm text-text-muted">Đối thoại • 12 Thg 10</span>
                          <h4 className="line-clamp-2 font-label-md text-label-md font-semibold text-text-primary transition-colors group-hover:text-primary">
                            Nhà văn Nguyễn Ngọc Tư: Nỗi buồn đồng bằng chưa bao giờ cạn
                          </h4>
                        </div>
                      </Link>

                      <Link className="group flex items-center gap-3" href="/blog">
                        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-surface-subtle shadow-sm">
                          <img className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9NoaGJUfKA6J6O_VPGMsWHNkebxCLIR6v1FP-QhVzALYvZc6X-MS1pO2yAfAlTsIZ7epAR5pQiLNGuT8xTyTG-gyYAFpQoTQgTYHp-P5d22DCg4FZ8m4EOwHq0s4-xndG-rGnhGA2XdRPkYHjrHF9Mn6TCphc1MG8Dh14Iiktx5tQRZON6vaaOrT3VaSUhemb3yu2iflG_vKekNTuehJI6v1oySivqdqU5BD1pjFy9mvB52z9NiNb" alt="Murakami" />
                        </div>
                        <div className="flex min-w-0 flex-col">
                          <span className="font-label-sm text-label-sm text-text-muted">Góc nhìn • 08 Thg 10</span>
                          <h4 className="line-clamp-2 font-label-md text-label-md font-semibold text-text-primary transition-colors group-hover:text-primary">
                            Vì sao Murakami luôn chia rẽ độc giả thành hai thế giới?
                          </h4>
                        </div>
                      </Link>

                      <Link className="group flex items-center gap-3" href="/blog">
                        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-surface-subtle shadow-sm">
                          <img className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvoqS12enOv6_WH-ZVBkCBSZNLCJlYfodaaVOXxJtAJxvRV7SVmF1JHRF3qiTWzQ7v_X1RBKxw2no2wWW_g3m8ehYVTbYELAdf4lGX3zv0yctKYpVcxiQsawB_cNXCVeP8in4D6RrSFNaaEaMQ1NM2KgPkDJwlVtg6qlDCVT12uIuiuZQFfU7nC9SSTV20xBDkXzZRIzIOmbUJ754FTbCFlxk2j3D4a3zlM97mpQr_vnTjEyuCkSYo" alt="Sách bìa da" />
                        </div>
                        <div className="flex min-w-0 flex-col">
                          <span className="font-label-sm text-label-sm text-text-muted">Ấn phẩm • 05 Thg 10</span>
                          <h4 className="line-clamp-2 font-label-md text-label-md font-semibold text-text-primary transition-colors group-hover:text-primary">
                            Nghệ thuật đóng sách bìa da thủ công tại Việt Nam
                          </h4>
                        </div>
                      </Link>
                    </div>
                  </div>

                  <div className="relative flex flex-col gap-space-sm overflow-hidden rounded-xl bg-primary p-space-lg text-on-primary shadow-sm">
                    <div className="mb-1 flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                      <span className="material-symbols-outlined text-[20px]">mail</span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm font-bold text-on-primary">Bản tin bạn đọc Dalifa</h3>
                    <p className="font-body-sm text-body-sm leading-relaxed text-on-primary-container">
                      Mỗi sáng thứ Bảy, nhận một bài đối thoại văn học chọn lọc và thư mục sách mới phát hành vào hộp thư.
                    </p>
                    <form className="mt-2 flex flex-col gap-2" onSubmit={(event) => {
                      event.preventDefault();
                      alert("Cảm ơn bạn đã đăng ký Bản tin văn học DalifaBooks!");
                      event.currentTarget.reset();
                    }}>
                      <input className="w-full rounded-lg bg-surface-card px-3.5 py-2 text-body-md font-body-md text-text-primary placeholder:text-text-muted focus:outline-none" placeholder="Địa chỉ email của bạn..." required type="email" />
                      <button className="w-full rounded-lg bg-secondary px-3.5 py-2.5 text-label-md font-label-md font-semibold text-on-primary transition-colors hover:bg-secondary-container" type="submit">
                        Nhận bài viết mới
                      </button>
                    </form>
                    <span className="text-center text-[11px] text-on-primary-container/80">Cam kết không thư rác • Hủy đăng ký bất kỳ lúc nào</span>
                  </div>
                </aside>
              </div>

              <nav aria-label="Điều hướng bài viết trước và sau" className="w-full pt-space-xl">
                <div className="grid grid-cols-1 gap-space-lg rounded-xl bg-surface-card p-space-lg shadow-sm md:grid-cols-2">
                  <Link className="group flex items-center gap-space-md rounded-lg p-space-sm text-left transition-colors hover:bg-surface-canvas" href="/blog">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-subtle text-primary shadow-sm transition-colors group-hover:bg-primary group-hover:text-on-primary">
                      <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                    </div>
                    <div className="flex min-w-0 flex-col">
                      <span className="font-label-sm text-label-sm uppercase text-text-muted">Bài viết trước đó</span>
                      <h4 className="line-clamp-1 font-label-md text-label-md font-semibold text-text-primary transition-colors group-hover:text-primary">
                        Kỷ niệm 100 năm ngày sinh Italo Calvino: Vũ trụ của trí tưởng tượng
                      </h4>
                    </div>
                  </Link>

                  <Link className="group flex items-center justify-end gap-space-md rounded-lg p-space-sm text-right transition-colors hover:bg-surface-canvas" href="/blog">
                    <div className="flex min-w-0 flex-col">
                      <span className="font-label-sm text-label-sm uppercase text-text-muted">Bài viết tiếp theo</span>
                      <h4 className="line-clamp-1 font-label-md text-label-md font-semibold text-text-primary transition-colors group-hover:text-primary">
                        Góc nhìn: Có gì bên trong những bản thảo dịch chưa bao giờ in?
                      </h4>
                    </div>
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-subtle text-primary shadow-sm transition-colors group-hover:bg-primary group-hover:text-on-primary">
                      <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                    </div>
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}