const ARTICLES = [
  {
    id: 1,
    category: "Điểm sách kinh tế",
    date: "22 Tháng 3, 2026",
    readTime: "6 phút đọc",
    title: "5 Cuốn sách thay đổi tư duy tài chính và tự do cá nhân bạn cần đọc trước tuổi 30",
    excerpt: "Tiền bạc không chỉ là bài toán cộng trừ số học mà là một tấm gương phản chiếu sâu sắc về tâm lý, nỗi sợ và kỷ luật bền bỉ của con người qua thời gian...",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6VYxT6pH0ctnqLltGDecyM4nt1-EdPnneHVfhHC819KiMM36_5ubicZ3RZIYytvZqhKqp-LcbeW6fMGgtXFVp1dXoc82RTQ3DvNYWSeN6Nt9XUFVIQFaTwHjwIrmWk2n6PBv8OvVdkw6bApwgKtGmVwDDgfql1c_nfo9r8rOHprgHISrtdP8891zvo_IrYtQnyHSWauLk98IpgCbxgvuC04RlZZwTWiZK19HwuSMv_4_YNMnCuCA6",
  },
  {
    id: 2,
    category: "Đối thoại tác giả",
    date: "18 Tháng 3, 2026",
    readTime: "9 phút đọc",
    title: "Gặp gỡ dịch giả tác phẩm kinh điển: \"Mỗi bản dịch là một lần tái sinh của ngôn từ\"",
    excerpt: "Cuộc trò chuyện độc quyền cùng dịch giả Lê Quang về hành trình ròng rã 3 năm chuyển ngữ nguyên tác tiếng Đức và niềm say mê giữ gìn phong vị văn học cổ điển...",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAkoGkdpymrxoC9d0lVs6ji71S-bnBfHLHzafhAh7eXiGbye9DPGUL5vtPVSRUh_GP-2M0mQYn8zNsiwgdyNtIvQ-P7_relWJErtEJNojmfJTf_xMMxwWENTAw0wE5QaS-8UbDeqE9KsNVVMElIxm1JKhy9xPHJXUrvkbtZNMpVCXrSQCdTypFeQp0B2_av3hDRAOC0ojC3PuoKd2FU7pCVogUHB8EArM7QGTzid6_hLJueurrWuQOx",
  },
  {
    id: 3,
    category: "Nuôi dạy con",
    date: "15 Tháng 3, 2026",
    readTime: "5 phút đọc",
    title: "Nghệ thuật nuôi dưỡng tình yêu sách cho con trẻ trong kỷ nguyên màn hình cảm ứng",
    excerpt: "Làm sao để biến 15 phút trước giờ đi ngủ thành khoảnh khắc kỳ diệu nhất trong ngày mà không cần áp lực hay ép buộc? Lắng nghe chuyên gia tâm lý chia sẻ...",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAR-J9vgbmoA61gWPPG7OBnTkVPr0Gnp9cG6oGL8gkWOHSPGoL3jEJYl8mYGT1KAMzJgKlDwbuB3B5nAnelbZrDzf4T1uj1mMaTWlaHd-tWpdpU1V44zboXSeTMw5gZ0EbTBnKC3WyFonmeE15FapOYuJ2XtHs880az_d-UQIgyvub1ABaOgg0goBw5CVWJ-hidwmV1L_QDEYNDb3BVK_c1XM6vRv42tuJl5PbwUuDZMwk3bc8vG7Yk",
  },
];

export default function BlogSection() {
  return (
    <section className="flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg gap-2">
        <div>
          <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-semibold block mb-1">
            Góc văn hóa & bài viết
          </span>
          <h2 className="font-headline-lg text-headline-lg text-text-primary">Góc Bạn Đọc & Điểm Sách</h2>
        </div>
        <a
          href="/blog"
          className="font-label-md text-label-md text-primary hover:text-secondary flex items-center gap-1 font-semibold group"
        >
          <span>Xem tất cả bài viết</span>
          <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
        </a>
      </div>

      {/* Articles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
        {ARTICLES.map((article) => (
          <article
            key={article.id}
            className="bg-surface-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col group"
          >
            <div className="w-full h-48 overflow-hidden bg-surface-subtle relative">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded bg-surface-card/90 backdrop-blur-sm text-text-primary font-label-sm text-label-sm font-semibold">
                {article.category}
              </span>
            </div>
            <div className="p-space-lg flex flex-col flex-1">
              <div className="flex items-center gap-2 text-text-muted font-body-sm text-body-sm mb-2">
                <span>{article.date}</span>
                <span>•</span>
                <span>{article.readTime}</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-text-primary group-hover:text-primary transition-colors leading-snug font-semibold mb-2">
                {article.title}
              </h3>
              <p className="font-body-sm text-body-sm text-text-secondary line-clamp-3 mb-space-md">
                {article.excerpt}
              </p>
              <div className="mt-auto pt-space-sm flex items-center gap-2 text-primary font-label-sm text-label-sm font-semibold">
                <span>Đọc tiếp bài phân tích</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
