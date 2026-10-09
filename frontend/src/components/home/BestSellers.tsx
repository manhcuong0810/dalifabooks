const STARS_FULL = ["star", "star", "star", "star", "star"];

function StarRating({ rating, count }: { rating: string; count: number }) {
  return (
    <div className="flex items-center gap-1 text-secondary mb-2">
      {STARS_FULL.slice(0, count).map((_, i) => (
        <span key={i} className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
          star
        </span>
      ))}
      {count < 5 && (
        <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
          star_half
        </span>
      )}
      <span className="font-label-sm text-label-sm text-text-secondary ml-1">({rating})</span>
    </div>
  );
}

const RANK_COLORS = [
  "bg-secondary text-on-secondary",
  "bg-primary text-on-primary",
  "bg-text-secondary text-on-primary",
  "bg-surface-border-strong text-text-primary",
  "bg-surface-border-strong text-text-primary",
];

const TOP_BOOKS = [
  {
    rank: 1,
    author: "Yuval Noah Harari",
    title: "Sapiens: Lược Sử Loài Người",
    price: "235.000 đ",
    sold: "1.8k",
    rating: "4.9",
    fullStars: 5,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCatCQC3o8BylhNRjg2RiiPNzaDoIm9VQ1yVOY-7GytI15qq51SObFQN5nYIQkkLfXXdOB3lJvgNP_OVWq_-H2PuJEJdWxU28j6-VwHsV4Y6aSX7VZgJHlH5D4Iw5ypBfhbVdNvAV6skisR-rz1vs4zNlEWiZ-Ty_Gou-wWdX0BSmwyPEyeJp0rV3D1Mtmd0bbcdDd0-vI_KvJ7G90ypesCHwO1-5ldrct5p-0qSfN_iMqb2l9pdYb8",
  },
  {
    rank: 2,
    author: "José Mauro de Vasconcelos",
    title: "Cây Cam Ngọt Của Tôi",
    price: "86.000 đ",
    sold: "1.4k",
    rating: "4.8",
    fullStars: 4,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCeQxPhY3gjQwxRIIlEHNt9e1lp33UDuFAO0DVlGAnmw2PIc4rtwLBD978SuaKqynzq2ZDMWCGfrwKJt0TIFJ8mtTtz8o7LShJpHEQtUeWcp_-E-mRRql-XkLsP1MPIiyF0XX9aA6BD8DIWEFi0Ue8St3UYTRdCsFuGYw8GYGxBAWb_0fMrQ5A9H7Jz3mAPpi9sVxlT9pG4hnnyrV8HkeE5qa3u660KbwsHVn87cBRQpyHV05qhY7h",
  },
  {
    rank: 3,
    author: "Rosie Nguyễn",
    title: "Tuổi Trẻ Đáng Giá Bao Nhiêu?",
    price: "79.000 đ",
    sold: "1.1k",
    rating: "4.7",
    fullStars: 4,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgdLIftmH9lv4eSio7f8w6k5AodGyJies1xq4Tb0EO9dX_v2MNSPcRkT7sO6_CXlOmPX7xZEuMIRbym9xSfneqMXW7UD6Xwh4Lyy9J948SUUPP9D91-9dpJLJOLiS45HARH-6m3vya5cvi4djdtG-W91FCH02BvUgPq6f-nqYMdVPlbbVG0dMy1oeP6B94Z6fDLJweGlqJdSU03RaTbN7Q3g3KCCMChh4qsULfCbnBLaWLSiZNMt40",
  },
  {
    rank: 4,
    author: "Haruki Murakami",
    title: "Rừng Na Uy (Ấn Bản Kỷ Niệm)",
    price: "136.000 đ",
    sold: "980",
    rating: "4.8",
    fullStars: 4,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDknVqYYukCQTe8cnPAuj22YY1xmWfG6YhCnOfNIaWv7s2-Jv7E93XvW1HX1gCZ9u-DhfuYOGhGw_ji_sw0qp4iJbCzKmpPJbKZd6sj0eQ-GDX50yIjPSd1NeaGwxeJ-YSdso2mA3cASUZCqy3HF1zCho7jwjv4fJ8ausht9teii55IcrLY5vwjR6MJnySLlZaMB2GSocd17-Y4opQrWUU7gko2i19C820booN16cnAYB0TffPEbd-E",
  },
  {
    rank: 5,
    author: "Daniel Kahneman",
    title: "Tư Duy Nhanh Và Chậm",
    price: "198.000 đ",
    sold: "850",
    rating: "4.9",
    fullStars: 5,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAjydd7jIQHuTKWZvYqYVfqT_zRhdGYvKC1-ZBFq9nhp1My1qqWe37jnjs-Z5MaSP0SkbKJnWsdGh4Ms38dghtWoUzrPw5NfKsTfkn63Nd6NdHGBaxyenLeQGBMUDG5E6Iwjkidaq5sZQdeEm8NUVe0iudL9D587LwHjZS04WX17E_maFwT0v6GnaQ2AFfjyvKSslXaj4BSHfXTV5zIRLYKL9KfAQ867_-ymr538LtNN9ep8qWpK_Zn",
  },
];

export default function BestSellers() {
  return (
    <section className="bg-surface-card rounded-xl p-space-xl shadow-sm">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-space-lg gap-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-secondary text-[22px]">military_tech</span>
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold">
              Bảng xếp hạng tháng
            </span>
          </div>
          <h2 className="font-headline-lg text-headline-lg text-text-primary">Tác phẩm được yêu thích nhất</h2>
        </div>
        <div className="flex items-center gap-2 bg-surface-subtle p-1 rounded-lg">
          <button className="px-3.5 py-1.5 rounded-md bg-surface-card text-text-primary font-label-sm text-label-sm font-semibold shadow-sm" type="button">
            Tháng này
          </button>
          <button className="px-3.5 py-1.5 rounded-md text-text-muted hover:text-text-primary font-label-sm text-label-sm font-medium transition-colors" type="button">
            Quý 1/2026
          </button>
          <button className="px-3.5 py-1.5 rounded-md text-text-muted hover:text-text-primary font-label-sm text-label-sm font-medium transition-colors" type="button">
            Cả năm
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-space-md">
        {TOP_BOOKS.map((book) => (
          <div
            key={book.rank}
            className="bg-surface-container-low rounded-lg p-space-md flex flex-col relative group hover:shadow-md transition-all"
          >
            {/* Rank badge */}
            <div
              className={`absolute -top-3 left-4 w-7 h-7 rounded-full ${RANK_COLORS[book.rank - 1]} font-headline-sm text-headline-sm font-bold flex items-center justify-center shadow-md`}
            >
              {book.rank}
            </div>

            <div className="w-full aspect-[2/3] rounded-md overflow-hidden bg-surface-subtle mb-space-sm mt-2 flex items-center justify-center">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform"
              />
            </div>

            <span className="font-body-sm text-body-sm text-text-secondary line-clamp-1">{book.author}</span>
            <h3 className="font-headline-sm text-headline-sm text-text-primary line-clamp-2 leading-tight font-semibold mt-1 mb-2">
              {book.title}
            </h3>
            <StarRating rating={book.rating} count={book.fullStars} />
            <div className="mt-auto pt-1 flex items-baseline justify-between">
              <span className="font-price-md text-price-md text-secondary">{book.price}</span>
              <span className="font-body-sm text-body-sm text-text-muted">Đã bán {book.sold}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
