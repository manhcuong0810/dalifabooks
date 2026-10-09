const BOOKS = [
  {
    id: 1,
    author: "Nguyên Phong",
    title: "Muôn Kiếp Nhân Sinh (Tập 3)",
    price: "214.000 đ",
    originalPrice: "268.000 đ",
    discount: "-20%",
    format: "Bìa cứng",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDGVkeJdKEX162T40SJwi2-dX6hKBYChVpIKvd5G_CY9-xH_o1a89I4WtcwSACDIdGctn72AZeXdL4aKe_wSb4ePhR7dMtEfd9pte4FWP4NJMBTlfbzk47pZ93YtURSMm8Lsy6zxCNjGf0llzuCBDAr5a9-ZLol9ft2FhF9Gg_g1T693dxGlYSZMtAoxlQnVnGX9cljnlzlPByV_kzZpOUXmWEUHlQ01AtiZISr126SEI6hJJD63z89",
  },
  {
    id: 2,
    author: "Morgan Housel",
    title: "Tâm Lý Học Về Tiền",
    price: "142.000 đ",
    originalPrice: "190.000 đ",
    discount: "-25%",
    format: "Bìa mềm",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5eMoHBIJZweQu_Eu9D_aG1_ObUEuprLLfbPxw0WEtoagiyYSYk_KJXIqv_FngpNY5RsAWyxm4QA_iv0RgpSBzF0oHwNIRDIWmIaiQurybePF3rPvP181-d-Z4rjblkiaHVdPoj1BlH_-IhJItOqF-RjLdZB0gii2eV4l1qDIVpSUmES90yxM-MpbbE8NWuIINZh2RMWKW1-8gC6fdn-oINlJwyj8aFiHcGD2cyKHWHnCqb5GM4vfz",
  },
  {
    id: 3,
    author: "Andrea Hirata",
    title: "Chiến Binh Cầu Vồng (Tái bản 2026)",
    price: "93.500 đ",
    originalPrice: "110.000 đ",
    discount: "-15%",
    format: "Bìa mềm",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBdEo8YCfwCQFkADKU-k6p9lxnSCdTc2QIPtLI9bWzZkxjfKmP9z4sGW1eGlg93uT-KJlEwjZLr0FJ-K0CoyGYerzEBTnLYcRBc6Aa0YNLdoXMwErwdoGaCPQpu6VI5x6icYNfCVKg9v3skXjlmCeMEUOtb_Cq0LfkDAtq4d3HmfsIGQMyrTVGo3pOo8ETOEVFJVaSlYjYQc8j6sfLsb76znLvbPFVDzI1JMX9pS_gxfotz3adPq-g2",
  },
  {
    id: 4,
    author: "Paulo Coelho",
    title: "Nhà Giả Kim (Ấn Bản Giới Hạn)",
    price: "162.000 đ",
    originalPrice: "198.000 đ",
    discount: "-18%",
    format: "Ấn bản đặc biệt",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD7QOfFbe60EBzZ6zHB5PlVeITQsT6aWscXW1oqUweaoqH31vHGM7XYhmzfjMg5-4EDG5cQETT_WDqUYRb3hImreHmdgdAeHck0_v55QRuiQDcz0i3dH5-IDPAvi111GMOhBbrCbVau22kXFR_aYFNmlpKDMUsLK499rpBCY9p-o3C6_ndWPLUVQIKSmule5nB1ivY8YxoLnHSntdJrUzlOKgkA4khe6CAa5ZMzNbHdUMZ5SCz9qelq",
  },
];

export default function NewReleases() {
  return (
    <section className="flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-space-lg">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-8 bg-secondary-container rounded-full" />
          <div>
            <h2 className="font-headline-lg text-headline-lg text-text-primary">Tác phẩm mới tuyển chọn</h2>
            <span className="font-body-sm text-body-sm text-text-secondary">
              Những ấn phẩm vừa cập bến kho sách DalifaBooks trong tuần
            </span>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <button
            type="button"
            aria-label="Lùi lại"
            className="w-10 h-10 rounded-lg bg-surface-card hover:bg-surface-container text-text-primary shadow-sm flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">chevron_left</span>
          </button>
          <button
            type="button"
            aria-label="Tiếp theo"
            className="w-10 h-10 rounded-lg bg-surface-card hover:bg-surface-container text-text-primary shadow-sm flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">chevron_right</span>
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-lg">
        {BOOKS.map((book) => (
          <div
            key={book.id}
            className="bg-surface-card rounded-xl p-space-md shadow-sm hover:shadow-md transition-all flex flex-col group"
          >
            {/* Cover */}
            <div className="relative w-full aspect-[2/3] bg-surface-subtle rounded-lg overflow-hidden flex items-center justify-center mb-space-md">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-status-rose-bg text-status-rose-text font-label-sm text-label-sm font-semibold">
                {book.discount}
              </span>
              <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-surface-card/90 backdrop-blur-sm text-text-primary font-label-sm text-label-sm font-medium">
                {book.format}
              </span>
            </div>

            {/* Info */}
            <div className="flex flex-col flex-1">
              <span className="font-body-sm text-body-sm text-text-secondary line-clamp-1 mb-1">{book.author}</span>
              <a
                href="/books/detail"
                className="font-headline-sm text-headline-sm text-text-primary group-hover:text-primary transition-colors line-clamp-2 leading-tight font-semibold mb-2"
              >
                {book.title}
              </a>
              <div className="mt-auto pt-2 flex items-baseline gap-2 mb-space-md">
                <span className="font-price-lg text-price-lg text-secondary">{book.price}</span>
                <span className="font-body-sm text-body-sm text-text-muted line-through">{book.originalPrice}</span>
              </div>
              <button
                type="button"
                className="w-full py-2.5 px-3 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold hover:bg-primary transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
                <span>Thêm vào giỏ</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
