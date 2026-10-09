export default function ThemeCollection() {
  return (
    <section className="rounded-xl overflow-hidden bg-primary-container text-on-primary shadow-sm relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 items-center">

        {/* Text Side */}
        <div className="lg:col-span-7 p-space-xl lg:p-space-2xl flex flex-col z-10">
          <div className="inline-flex items-center gap-2 text-secondary-fixed text-label-sm font-label-sm uppercase tracking-widest font-semibold mb-space-sm">
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span>Chuyên đề DalifaBooks Số 04</span>
          </div>

          <h2 className="font-headline-lg text-headline-lg text-on-primary mb-space-md">
            Tuyển Tập Tác Gia Văn Học Thế Kỷ 20
          </h2>

          <blockquote className="bg-primary/40 backdrop-blur-sm rounded-lg p-space-md mb-space-lg text-on-primary/95 italic font-body-lg text-body-lg leading-relaxed">
            "Một cuốn sách thực sự không chỉ mở ra thế giới, mà còn mở ra những căn phòng đóng kín trong tâm hồn người đọc mà chính họ cũng chưa từng biết tới."
            <footer className="not-italic font-label-md text-label-md text-secondary-fixed mt-2 font-medium">
              — Lời tựa Tuyển tập Văn chương Cổ điển
            </footer>
          </blockquote>

          <p className="font-body-md text-body-md text-on-primary-container mb-space-lg max-w-xl">
            Khám phá 12 kiệt tác văn chương định hình thế kỷ: từ ngòi bút hiện thực sắc lạnh của Franz Kafka, Albert Camus đến thế giới mộng ảo bất tận của Gabriel García Márquez. Bộ ấn bản song ngữ được bọc bìa vải lanh kèm chữ ký lưu niệm.
          </p>

          <div className="flex flex-wrap items-center gap-space-md">
            <a
              href="/books"
              className="px-6 py-3 rounded-lg bg-secondary text-on-secondary font-label-md text-label-md font-semibold hover:opacity-90 transition-colors shadow-md flex items-center gap-2"
            >
              <span>Chiêm ngưỡng trọn bộ</span>
              <span className="material-symbols-outlined text-[18px]">menu_book</span>
            </a>
            <span className="font-body-sm text-body-sm text-on-primary-container">
              Ưu đãi đặc biệt: Tặng hộp quà sơn mài cho 100 đơn hàng đầu tiên
            </span>
          </div>
        </div>

        {/* Image Side */}
        <div className="lg:col-span-5 relative h-full min-h-[360px] p-space-lg flex items-center justify-center">
          <div
            className="w-full h-80 rounded-xl overflow-hidden bg-cover bg-center shadow-2xl"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAED7iGY2F8AF-_wLM2_Ju4gj88gkk4vrk9QTT8fv1OKFtNCfWn1Htj58Nry88tH-nHpyUaHlLi1vPnw-OnBU6r3bCFuv137zFu6mTKzbVoPKZf49Ch8W5e_1eO5R4dj19SCJHFHfbteFwLc0Sjdv8PgjGNOhiZbJtak3Zq_fJag7XA6NIkeldoRH-G1o6jrLVqOTJw_ueaUuVBzH9g4JrfvxbofMf_ODSiGRkzRbF2DfGLwzg2lGUs')",
            }}
          />
        </div>

      </div>
    </section>
  );
}
