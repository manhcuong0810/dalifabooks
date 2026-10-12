"use client";
// SHOP-03 — Chi tiết sách
import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const COVER_IMAGES = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCPtjTQ9XAbD_Spiu9pgKTLuIJyVv7NA6B5dMbLkdMpLRqpUlxWK2p8J-D2ArQ7zx89eVuqavB6id0KQMvhSAOtvoFTr-5uNqraNdOir3XgewmPMKYjXpUxW65Fv8UGzIp84ClucwsnOKFQ17OCt-JktpSAyFw5HvzWKIdC8b1uAbuPyNyMdlabsHRmB3r8DgHXC72r3eiWKe7L63gg9gj-hLmtqmR1UL0tr7UfodN4on_IE5tGXQu9",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBdu_5rdePSzMB2mTQXN-xL95STjGWL_yHhMglmUbr8IcyzPOg6ipPMz0Agc2uv8gbKJCRRpYcs1zcAmPFcweTathl7Yb4fzKr22kKLb1RJOnorCgtrWx_JneK_PSXguJPz2Z36Z-576F5zTFcziR0nqzHlhBlu3vGl8ysrE8SUqMJbc59kO7qMKjD6rczcRGASKyRD6WIhzbHz59HPeMwBXVGJU089F8F-4uMkf17P7EggBTw90HIy",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDEhIUKLbsj7Q6ujrGPFCiQ3MJ-7qAglpUlvpJIXetTT_P_PxVSHSPP3_aEahAz-9AZdqovOR3-HWkLtdRQFiC4sprp3KUTbmymN0O1m7GkNHYAhwjiFNgYuXKPwCFJLXK5pdq799KuyglGPJu9BgDIkJyyYw7Rwt0KKJ5z8oZkq5ist5joiH2TwfUux0Xq6g2eXQgz5lzQ1hbMwgmrS5BRQjnyc48CwiyZIKOeoF8brlfkLvLCkuHZ",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBAIGpIcdMiwv5ytqqEPB8QiJuNmKjlvztgchs3MhsdpctzRLyt15kVpgdLf9AruTVRozhmmwek-2DUa0WXt3LtsyGB_J8L4SxkwU-1VPf-_-ATv_GVnTWvf8zkpN2lN08jBkXyEPE_qhGoqqFwHgDOG-8vtZ3xvC2jlcfDnv4mFQ-uuKeW0-_2qxswJXsFXinXi4jpPbEWYATRmDZdw4X9ztbXAr--E7x67RB3C7EkMJF0HMXwpPri",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBydhfm1z5z-9qffI5bQxs-Ifmml7NsrPOKDOtCN21xg64eHmjN33kmPpQCV_tzH63NPI7dijgmKFedZ3EyxJ-U3tintz8pm5hteDecgKu6iuuBlDPYYYTUAYpOX4qLaWXZYOK3ClUgcGwVwQbzUdyeNZKb-8d7lMdS69I-ynClx4H54DjyJHnO0Ku4IeODJwMY1BvpXzfe-tAIZ5u2OPyu6Y5xpiIpKJbfDcffe58sVysZY__-Jyrq",
];

const RELATED = [
  { title: "Hoàng Tử Bé (Bản Màu)", author: "Antoine de Saint-Exupéry", price: "72.000 ₫", original: "90.000 ₫", badge: "Tái bản 2024", badgeClass: "bg-surface-card/90 text-text-primary", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCRxc4twj3RppFXKwun0aH4ErFCyk8V_ZkqbUVrpcWiyR1JtQM1PR0ve96Z7LdStNnNDF3GrbIqPuxDhO0Ym4UmEJ9AYnToZZdFMST7v-zf2chW1l5SAB_DeU0_BiZk3oodx5qVejMqccTyC8bztShA7zjpBZ2mbm7w-WoTlUzU4S01r97RNgfm-cq5O__q1HJ0SihoLhhQe46o5T02WQ7vHyr7SLjHrZiCbY3P8fa_ACeK4XLjjEis" },
  { title: "Chuyện Con Mèo Dạy Hải Âu Bay", author: "Luis Sepúlveda", price: "59.000 ₫", original: "75.000 ₫", badge: "Bán chạy", badgeClass: "bg-status-emerald-bg text-status-emerald-text", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBEniHZNQ0u7zTsQ7qdcBmNK-RLAXFiCViW6HMQ32lqJubjLeVmv2Vajo9Ig8A9yCsdUOY7hTMoLNWQw5BUdJopXqKGjUo3QOcE2Vn6qlopnPXEFT8yLZXUAMHpgidZlF0KEh-sgRgiNU1hAVvlvGq9Fd7ANZqfTchFQAHxOOBIJ1Qb4jRZf6IY3FVgocZB16KyCFZtihcAU3g36OUfW_okohkbrNJ6Y5EmiUNG3Teczy6BcphGj8t3" },
  { title: "Chiến Binh Cầu Vồng", author: "Andrea Hirata", price: "96.000 ₫", original: "128.000 ₫", badge: "-25%", badgeClass: "bg-surface-card/90 text-text-primary", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBmFSUVoCS4VOWxfXq7HCmpHpVQcZ3v8Ht1Q5mLe0Mse0WeQOOeUMgCddxfZON4zIcl69Tx9n_Ee5VlZTxHcoNUcFlMga5jzenYzPCcJN-x4gbaiAXb21GPe_lKBHKr6lBSZw_aLkZnAdaihNjSbCK7iiwxK99o3TeU-JtWxsfS56A_0eCgc2FdXzBJilSp4dLGICujlBlwUlZdToHg8G3JCv1MNYjzftgmYWejPOksOs6nEHIxQOsy" },
  { title: "Khi Lỗi Thuộc Về Những Vì Sao", author: "John Green", price: "102.000 ₫", original: "120.000 ₫", badge: "Kèm bookmark", badgeClass: "bg-surface-card/90 text-text-primary", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAMFD62BE0W1Llr33nMIWMRIJA9M98G7h4HjjeMrIml7t6e15Zf3zyEil6xDbKthrIvqaEXYuB3IywA1nlD5KlxbxEQpeJapRJVMR1ynBOEDPjA2a4-W3-qGzK54GH-6cGBDjj4-OG4fJJ2q_7HLqK9JDf0CZgb-THGldY2lYKuHZQVsJjJBEpF3F2PbkSgRZi-faM6v8E-iKSWHzJR9ogBO4mCsDqTPrzwiprppj-PlllkQnEDLqwz" },
];

export default function BookDetailPage() {
  const [qty, setQty] = useState(1);
  const [edition, setEdition] = useState<"paperback" | "hardcover">("paperback");
  const [coverIndex, setCoverIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"synopsis" | "author" | "policies">("synopsis");
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const adjustQty = (amount: number) => setQty((prev) => Math.min(99, Math.max(1, prev + amount)));

  const handleAddToCart = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setTimeout(() => { window.location.href = "/cart"; }, 400);
  };

  const price = edition === "paperback" ? "108.000 ₫" : "168.000 ₫";
  const originalPrice = edition === "paperback" ? "135.000 ₫" : "210.000 ₫";
  const saved = edition === "paperback" ? "27.000 ₫" : "42.000 ₫";

  return (
    <>
      <Header active="books" />

      {/* MAIN */}
      <main className="w-full pt-[160px] bg-surface min-h-[calc(100vh-160px)]">
        <div className="max-w-[1240px] mx-auto px-margin-desktop py-space-lg">
          <div className="flex flex-col w-full">

            {/* Breadcrumb */}
            <div className="flex flex-wrap items-center justify-between gap-y-2 mb-space-lg text-body-sm font-body-sm text-text-secondary">
              <nav className="flex items-center gap-2 flex-wrap">
                <a className="hover:text-primary transition-colors flex items-center gap-1" href="/"><span className="material-symbols-outlined text-[16px]">home</span><span>Trang chủ</span></a>
                <span className="text-text-muted">/</span>
                <a className="hover:text-primary transition-colors" href="#">Danh mục</a>
                <span className="text-text-muted">/</span>
                <a className="hover:text-primary transition-colors" href="#">Văn học nước ngoài</a>
                <span className="text-text-muted">/</span>
                <span className="text-text-primary font-semibold truncate max-w-xs sm:max-w-md">Cây Cam Ngọt Của Tôi</span>
              </nav>
              <div className="flex items-center gap-2 text-label-sm font-label-sm">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-status-emerald-bg text-status-emerald-text font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Kho hàng sẵn có • Xuất kho trong 2 giờ</span>
                </span>
                <span className="text-text-muted hidden sm:inline">|</span>
                <span className="text-text-muted hidden sm:inline">Mã sản phẩm: DLF-LIT-8935</span>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">

              {/* Left: Gallery */}
              <div className="lg:col-span-5 flex flex-col gap-space-md">
                <div className="bg-surface-card rounded-xl shadow-sm p-space-md overflow-hidden relative group">
                  <div className="relative w-full aspect-[2/3] bg-surface-subtle rounded-lg overflow-hidden flex items-center justify-center">
                    <img alt="Bìa sách Cây Cam Ngọt Của Tôi" className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105" src={COVER_IMAGES[coverIndex]} />
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      <span className="px-2.5 py-1 rounded bg-primary text-on-primary font-label-sm text-label-sm uppercase tracking-wider font-semibold shadow-sm">Bản quyền chính thức</span>
                      <span className="px-2.5 py-1 rounded bg-secondary text-on-secondary font-label-sm text-label-sm font-semibold shadow-sm">Ấn bản kỷ niệm</span>
                    </div>
                    <button className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-surface-card/90 backdrop-blur text-primary shadow-md flex items-center justify-center hover:bg-surface-card transition-all" type="button">
                      <span className="material-symbols-outlined text-[20px]">zoom_in</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-5 gap-2 mt-space-md">
                    {COVER_IMAGES.map((src, i) => (
                      <button key={i} className={`rounded-md overflow-hidden aspect-[2/3] bg-surface-subtle transition-all ${coverIndex === i ? "ring-2 ring-primary" : "ring-0 hover:ring-2 hover:ring-primary-container"}`} onClick={() => setCoverIndex(i)} type="button">
                        <img alt={"Ảnh " + (i + 1)} className="w-full h-full object-cover" src={src} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-surface-container-low rounded-xl p-space-md flex items-center justify-between gap-space-md shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-primary-container text-on-primary flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[24px]">menu_book</span>
                    </div>
                    <div>
                      <div className="font-headline-sm text-headline-sm text-text-primary leading-tight">Đọc thử 20 trang đầu</div>
                      <div className="font-body-sm text-body-sm text-text-secondary">Khám phá văn phong trong sáng của Zeze</div>
                    </div>
                  </div>
                  <button className="px-4 py-2 rounded-lg bg-surface-card hover:bg-surface-subtle text-text-primary font-label-md text-label-md font-semibold transition-all shadow-sm shrink-0 flex items-center gap-1.5" onClick={() => setShowModal(true)} type="button">
                    <span>Đọc thử ngay</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 text-body-sm font-body-sm text-text-secondary">
                  <div className="bg-surface-card rounded-lg p-3 flex items-center gap-2.5 shadow-sm">
                    <span className="material-symbols-outlined text-secondary text-[22px]">auto_stories</span>
                    <div><div className="text-text-primary font-semibold leading-tight">Giấy Bãi Bằng 80gsm</div><div className="text-label-sm font-label-sm text-text-muted leading-tight">Chống lóa mỏi mắt</div></div>
                  </div>
                  <div className="bg-surface-card rounded-lg p-3 flex items-center gap-2.5 shadow-sm">
                    <span className="material-symbols-outlined text-status-emerald-text text-[22px]">package_2</span>
                    <div><div className="text-text-primary font-semibold leading-tight">Gói bọc 3 lớp khí</div><div className="text-label-sm font-label-sm text-text-muted leading-tight">Gáy sách an toàn 100%</div></div>
                  </div>
                </div>
              </div>

              {/* Right: Purchase Console */}
              <div className="lg:col-span-7 flex flex-col gap-space-lg">
                <div className="bg-surface-card rounded-xl p-space-lg shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-status-sky-bg text-status-sky-text font-label-sm text-label-sm font-semibold">Văn học kinh điển thế giới</span>
                    <span className="text-text-muted">•</span>
                    <div className="flex items-center text-secondary">
                      {[1,2,3,4,5].map(s => <span key={s} className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>)}
                      <span className="font-headline-sm text-headline-sm text-text-primary ml-1.5 leading-none">4.9</span>
                      <span className="font-body-sm text-body-sm text-text-muted ml-1 leading-none">(1.248 nhận xét)</span>
                    </div>
                  </div>
                  <h1 className="font-headline-lg text-headline-lg text-text-primary tracking-tight mb-2">Cây Cam Ngọt Của Tôi</h1>
                  <p className="font-body-md text-body-md text-text-secondary italic mb-space-md">Ấn bản tiếng Việt chính thức, chuyển ngữ trọn vẹn từ nguyên tác Bồ Đào Nha "O Meu Pé de Laranja Lima"</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-space-sm bg-surface-subtle/50 rounded-lg p-3">
                    <div><span className="font-label-sm text-label-sm text-text-muted block">Tác giả</span><span className="font-body-md text-body-md text-text-primary font-semibold">José Mauro de Vasconcelos</span></div>
                    <div><span className="font-label-sm text-label-sm text-text-muted block">Dịch giả</span><span className="font-body-md text-body-md text-text-primary font-semibold">Tô Triều Hà</span></div>
                    <div><span className="font-label-sm text-label-sm text-text-muted block">Nhà xuất bản</span><span className="font-body-md text-body-md text-text-primary font-semibold">NXB Hội Nhà Văn</span></div>
                  </div>

                  {/* Edition Selector */}
                  <div className="mt-space-lg">
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="font-headline-sm text-headline-sm text-text-primary font-semibold">Chọn phiên bản xuất bản:</span>
                      <span className="font-label-sm text-label-sm text-secondary font-medium">Bản bìa cứng có quà tặng đính kèm</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className={"cursor-pointer rounded-xl p-3.5 transition-all relative flex flex-col justify-between " + (edition === "paperback" ? "bg-surface-container-low ring-2 ring-primary" : "bg-surface-card hover:bg-surface-subtle")} onClick={() => setEdition("paperback")}>
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="font-headline-sm text-headline-sm text-text-primary font-semibold">Bản Bìa Mềm (Tiêu chuẩn)</div>
                            <div className="font-body-sm text-body-sm text-text-secondary mt-0.5">Bìa gấp mép cán mờ, ruột giấy vàng xốp</div>
                          </div>
                          <div className={"w-5 h-5 rounded-full flex items-center justify-center shrink-0 " + (edition === "paperback" ? "bg-primary text-on-primary" : "bg-surface-subtle text-transparent")}>
                            <span className="material-symbols-outlined text-[14px]">check</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 flex items-baseline gap-2">
                          <span className="font-price-md text-price-md text-primary">108.000 ₫</span>
                          <span className="font-body-sm text-body-sm text-text-muted line-through">135.000 ₫</span>
                        </div>
                      </div>
                      <div className={"cursor-pointer rounded-xl p-3.5 transition-all relative flex flex-col justify-between " + (edition === "hardcover" ? "bg-surface-container-low ring-2 ring-primary" : "bg-surface-card hover:bg-surface-subtle")} onClick={() => setEdition("hardcover")}>
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-headline-sm text-headline-sm text-text-primary font-semibold">Bản Bìa Cứng (Đặc biệt)</span>
                              <span className="px-1.5 py-0.5 rounded bg-secondary-container/20 text-secondary font-label-sm text-label-sm font-bold">Limited</span>
                            </div>
                            <div className="font-body-sm text-body-sm text-text-secondary mt-0.5">Áo ôm ép nhũ + 4 tranh màu + Bookmark kim loại</div>
                          </div>
                          <div className={"w-5 h-5 rounded-full flex items-center justify-center shrink-0 " + (edition === "hardcover" ? "bg-primary text-on-primary" : "bg-surface-subtle text-transparent")}>
                            <span className="material-symbols-outlined text-[14px]">check</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 flex items-baseline gap-2">
                          <span className="font-price-md text-price-md text-primary">168.000 ₫</span>
                          <span className="font-body-sm text-body-sm text-text-muted line-through">210.000 ₫</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mt-space-lg bg-surface-container-low rounded-xl p-space-md flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-col">
                      <span className="font-label-sm text-label-sm text-text-muted uppercase tracking-wider font-semibold">Giá phát hành DalifaBooks</span>
                      <div className="flex items-baseline gap-3 mt-1">
                        <span className="font-display-hero text-display-hero text-primary font-bold leading-none">{price}</span>
                        <span className="font-price-md text-price-md text-text-muted line-through leading-none">{originalPrice}</span>
                        <span className="px-2 py-0.5 rounded bg-status-rose-bg text-status-rose-text font-label-sm text-label-sm font-bold leading-none">-20% (Tiết kiệm {saved})</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 font-label-sm text-label-sm text-status-emerald-text font-semibold">
                      <span className="material-symbols-outlined text-[18px]">verified</span>
                      <span>Tích lũy 1.080 điểm bạn đọc thân thiết</span>
                    </div>
                  </div>

                  {/* Quantity & CTA */}
                  <div className="mt-space-lg flex flex-col sm:flex-row items-stretch sm:items-center gap-space-md">
                    <div className="flex items-center rounded-lg bg-surface-subtle p-1 self-start sm:self-auto shrink-0 shadow-sm">
                      <button aria-label="Giảm số lượng" className="w-10 h-10 rounded-md bg-surface-card flex items-center justify-center text-text-primary hover:bg-surface-subtle transition-all" onClick={() => adjustQty(-1)} type="button"><span className="material-symbols-outlined text-[18px]">remove</span></button>
                      <input aria-label="Số lượng sách" className="w-14 text-center bg-transparent font-headline-sm text-headline-sm font-semibold text-text-primary focus:outline-none" max={99} min={1} readOnly type="number" value={qty} />
                      <button aria-label="Tăng số lượng" className="w-10 h-10 rounded-md bg-surface-card flex items-center justify-center text-text-primary hover:bg-surface-subtle transition-all" onClick={() => adjustQty(1)} type="button"><span className="material-symbols-outlined text-[18px]">add</span></button>
                    </div>
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                      <button className="px-6 py-3 rounded-lg bg-surface-subtle text-primary hover:bg-surface-container font-label-md text-label-md font-semibold transition-all flex items-center justify-center gap-2 shadow-sm" onClick={handleAddToCart} type="button"><span className="material-symbols-outlined text-[20px]">add_shopping_cart</span><span>Thêm vào giỏ</span></button>
                      <button className="px-6 py-3 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-semibold transition-all flex items-center justify-center gap-2 shadow-sm" onClick={handleBuyNow} type="button"><span className="material-symbols-outlined text-[20px]">bolt</span><span>Mua ngay</span></button>
                    </div>
                  </div>

                  {showToast && (
                    <div className="mt-3 p-3 rounded-lg bg-status-emerald-bg text-status-emerald-text font-body-sm text-body-sm flex items-center justify-between transition-all">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">check_circle</span>
                        <span>Đã thêm <strong>Cây Cam Ngọt Của Tôi</strong> vào giỏ hàng của bạn.</span>
                      </div>
                      <a className="underline font-semibold hover:opacity-80" href="/cart">Xem giỏ hàng</a>
                    </div>
                  )}
                </div>

                {/* Guarantees */}
                <div className="bg-surface-card rounded-xl p-space-md shadow-sm">
                  <h2 className="font-label-sm text-label-sm text-text-muted uppercase tracking-wider font-semibold mb-3">Cam kết bản quyền &amp; dịch vụ từ DalifaBooks</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3.5 gap-x-space-lg text-body-sm font-body-sm">
                    {[
                      { icon: "workspace_premium", bg: "bg-status-emerald-bg text-status-emerald-text", title: "100% Sách bản quyền chính hãng", desc: "Hợp tác trực tiếp cùng NXB và Công ty Sách Nhã Nam." },
                      { icon: "inventory", bg: "bg-status-sky-bg text-status-sky-text", title: "Đóng gói chuẩn chống sốc 3 lớp", desc: "Túi bóng khí bọc mép gáy và thùng carton dập logo." },
                      { icon: "local_shipping", bg: "bg-status-amber-bg text-status-amber-text", title: "Miễn phí giao hàng từ 250.000 ₫", desc: "Đồng kiểm hàng trước khi nhận, hỗ trợ COD toàn quốc." },
                      { icon: "published_with_changes", bg: "bg-status-rose-bg text-status-rose-text", title: "Đổi mới 7 ngày miễn phí", desc: "Đổi trả ngay nếu phát hiện lỗi in ấn, nhăn gáy do vận chuyển." },
                    ].map((g) => (
                      <div key={g.icon} className="flex items-start gap-3">
                        <div className={"w-8 h-8 rounded-lg flex items-center justify-center shrink-0 " + g.bg}><span className="material-symbols-outlined text-[18px]">{g.icon}</span></div>
                        <div><div className="font-semibold text-text-primary">{g.title}</div><div className="text-text-secondary text-body-sm">{g.desc}</div></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Book Specs */}
            <div className="mt-space-2xl bg-surface-card rounded-xl p-space-lg shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-space-md mb-space-md">
                <div>
                  <h2 className="font-headline-md text-headline-md text-text-primary font-semibold">Thông số ấn phẩm &amp; Dữ liệu thư mục</h2>
                  <p className="font-body-sm text-body-sm text-text-secondary">Chi tiết quy cách in ấn và phân loại quốc tế chuẩn hóa bởi Thư viện Quốc gia</p>
                </div>
                <span className="mt-2 sm:mt-0 px-2.5 py-1 rounded bg-surface-subtle text-text-secondary font-label-sm text-label-sm font-medium">Ấn phẩm tái bản lần thứ 24</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4 gap-x-6 text-body-md font-body-md">
                {[
                  ["Mã sản phẩm (SKU)", "8935235226159"],
                  ["Mã tiêu chuẩn ISBN", "978-604-990-281-9"],
                  ["Số trang", "244 trang"],
                  ["Kích thước khổ sách", "14 x 20.5 cm"],
                  ["Trọng lượng cuốn", "320 gram"],
                  ["Hình thức trình bày", "Bìa mềm tay gập / Bìa cứng"],
                  ["Đơn vị phát hành liên kết", "Nhã Nam • NXB Hội Nhà Văn"],
                  ["Năm tái bản mới nhất", "2024 (Bổ sung phụ bản)"],
                ].map(([label, val]) => (
                  <div key={label} className="p-3 rounded-lg bg-surface-subtle/60">
                    <span className="font-label-sm text-label-sm text-text-muted block">{label}</span>
                    <span className="text-text-primary font-semibold">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Detail Tabs */}
            <div className="mt-space-2xl bg-surface-card rounded-xl p-space-lg shadow-sm">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-space-lg">
                {([ { key: "synopsis" as const, label: "Giới thiệu tác phẩm & Trích đoạn" }, { key: "author" as const, label: "Về Tác giả & Dịch giả" }, { key: "policies" as const, label: "Chính sách vận chuyển & Đổi trả" } ]).map((t) => (
                  <button key={t.key} className={"px-5 py-2.5 rounded-lg font-headline-sm text-headline-sm whitespace-nowrap transition-all " + (activeTab === t.key ? "font-semibold bg-primary text-on-primary shadow-sm" : "font-medium text-text-secondary hover:bg-surface-subtle")} onClick={() => setActiveTab(t.key)} type="button">{t.label}</button>
                ))}
              </div>

              {activeTab === "synopsis" && (
                <div className="flex flex-col gap-space-lg">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
                    <div className="lg:col-span-8 flex flex-col gap-space-md font-body-lg text-body-lg text-text-secondary leading-relaxed">
                      <p className="text-text-primary font-medium">
                        "Mở đầu bằng những ước mơ trong veo và kết thúc bằng tiếng nấc nghẹn ngào của sự trưởng thành", <strong>Cây Cam Ngọt Của Tôi</strong> là một trong những áng văn kinh điển lay động trái tim hàng triệu bạn đọc trên toàn thế giới suốt hơn nửa thế kỷ qua.
                      </p>
                      <p>Nhân vật chính là cậu bé Zezé năm tuổi sinh ra trong một gia đình nghèo đông con tại vùng ngoại ô Brazil. Cậu bé thông minh sớm biết đọc mà không cần ai dạy, giàu trí tưởng tượng vô bờ nhưng lại luôn bị người lớn gán cho cái mác "đứa trẻ ngỗ nghịch".</p>
                      <p>Trong thế giới cô đơn ấy, Zezé tìm thấy một người bạn tâm tình đặc biệt: một cây cam ngọt nhỏ ở góc vườn sau nhà mà cậu âu yếm đặt tên là <em>Pinkie</em>.</p>
                      <div className="my-space-md p-space-lg rounded-xl bg-surface-container-low relative">
                        <span className="material-symbols-outlined text-[40px] text-primary/20 absolute top-4 left-4">format_quote</span>
                        <div className="relative pl-8 italic font-body-lg text-text-primary">"Tại sao người ta lại phải nói cho bọn trẻ biết nhiều chuyện như vậy cơ chứ khi mà chúng còn quá nhỏ?... Mẹ ơi, con không nên được sinh ra trên đời này."</div>
                        <div className="mt-3 text-right font-label-md text-label-md text-text-secondary font-semibold">— Trích đoạn tâm sự của bé Zezé với Cây cam ngọt</div>
                      </div>
                      <p>Cho đến ngày Zezé gặp bác Bồ — quý ông Bồ Đào Nha Manuel Valadares tốt bụng. Bác đã mang đến cho cậu bé tình yêu thương chân thành, sự ấm áp của tình cha con mà cậu hằng khao khát.</p>
                    </div>
                    <div className="lg:col-span-4 flex flex-col gap-space-md">
                      <div className="p-space-md rounded-xl bg-surface-subtle">
                        <div className="font-headline-sm text-headline-sm text-text-primary font-semibold mb-2 flex items-center gap-2">
                          <span className="material-symbols-outlined text-secondary">rate_review</span>
                          <span>Lời bình của DalifaBooks</span>
                        </div>
                        <p className="font-body-sm text-body-sm text-text-secondary leading-normal mb-3">Một cuốn sách mỏng nhưng dung chứa bài học lớn lao về lòng trắc ẩn. Không chỉ dành cho thiếu nhi, tác phẩm là tấm gương soi chiếu cho mọi bậc làm cha mẹ về cách lắng nghe và nâng niu thế giới nội tâm mỏng manh của con trẻ.</p>
                        <div className="flex items-center gap-2 text-label-sm font-label-sm text-text-muted">
                          <span>Biên tập viên tuyển chọn:</span>
                          <strong className="text-text-primary">Hà Mai Anh</strong>
                        </div>
                      </div>
                      <div className="rounded-xl overflow-hidden shadow-sm aspect-[4/3] relative">
                        <img alt="Không gian đọc Cây Cam Ngọt Của Tôi" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrM1WbR1bNvP5bF9B-JE7YdPcmtQFsqVn55_3xz4S2eDTrUx52dWNThLBMRTMFGGgN12yK_RPKOeFLyNnfCKvkcdDkvZ74dAIt_gEL_Z1oQnMNZ2_6egWuNtqcf6om1NbufuYKFgKZ8WMIjydOpctU6ZO51OXSKZD0JJAf8b28rqRbiM4TjSMZ2SG-TB9R0wGPZijbOcy8_mFNQ5h1N3kyU9VDxoYkXyZZf7Cf8gV0mu1oOZjuzwCC" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "author" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-xl">
                  <div className="flex flex-col gap-space-md p-space-md rounded-xl bg-surface-subtle">
                    <div className="flex items-center gap-space-md">
                      <div className="w-20 h-20 rounded-full bg-surface-container overflow-hidden shrink-0 shadow-sm">
                        <img alt="Tác giả José Mauro de Vasconcelos" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCycq9MeWbbvnfpaO6yZn5awa1wn4E78Qq9TW1TuvZJHnRHLmwCCpA-Hx943YCrp7yfTRGhTwC5fQYV1Y9HJCR4IiRGpwmMgJ55GB8GaHwGkgwyDVzaFqUOJJ6zm4rFxX0lxcZOW4Pa9qy_rgTUI77BdvcthUC7jU2aCNOLzsL7d3qZJ9TpnRnXNLkloESGC0vRW95zSOKzC_ivmvkONCX6j18dh9VFBYUTXZF2TXfdHFDLHTKlcfp1" />
                      </div>
                      <div>
                        <div className="font-headline-sm text-headline-sm text-text-primary font-bold">José Mauro de Vasconcelos</div>
                        <div className="font-body-sm text-body-sm text-text-muted">1920 – 1984 • Brazil</div>
                        <div className="font-label-sm text-label-sm text-secondary font-semibold mt-1">Nhà văn xuất sắc của văn học Mỹ Latinh</div>
                      </div>
                    </div>
                    <p className="font-body-md text-body-md text-text-secondary leading-relaxed">Sinh ra tại Bangu, Rio de Janeiro trong hoàn cảnh nghèo khó, ông từng phải làm đủ mọi nghề để mưu sinh trước khi đến với văn chương. <em>Cây Cam Ngọt Của Tôi</em> ra mắt năm 1968, chỉ được ông viết trong vòng 12 ngày sau khi đã ấp ủ cốt truyện suốt 42 năm trong tâm tưởng. Cuốn sách lập kỷ lục phát hành vô tiền khoáng hậu tại Brazil và được dịch sang hơn 30 thứ tiếng.</p>
                  </div>
                  <div className="flex flex-col gap-space-md p-space-md rounded-xl bg-surface-subtle">
                    <div className="flex items-center gap-space-md">
                      <div className="w-20 h-20 rounded-full bg-surface-container overflow-hidden shrink-0 shadow-sm">
                        <img alt="Dịch giả Tô Triều Hà" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdyDyiagWE_lGP3tEId7lKBScH1gwuANWPU1rHot2xqiuXtrw1xFQ3evOjpnqzEP_at3mRK_HZg2JmVhRWDpw5Go7XUFQbCodi5mOYutcb4BXmhCqM9-wutcCf57OmHqjhHY31TAm7uzOz0TZHk9VjFL-PygOuXYKQtTtXNy79vcRk4F7k5A_gdPF0rPHXRnS7pNoWAnMEP-YLLAfwUCZhh3t0JWuM48wxo5ueADugypOOYLn5DepO" />
                      </div>
                      <div>
                        <div className="font-headline-sm text-headline-sm text-text-primary font-bold">Tô Triều Hà</div>
                        <div className="font-body-sm text-body-sm text-text-muted">Dịch giả Văn học &amp; Nghệ thuật</div>
                        <div className="font-label-sm text-label-sm text-secondary font-semibold mt-1">Cố vấn dịch thuật độc quyền</div>
                      </div>
                    </div>
                    <p className="font-body-md text-body-md text-text-secondary leading-relaxed">Là một trong những dịch giả giàu tâm huyết với dòng văn học thiếu nhi và chữa lành tâm hồn, Tô Triều Hà đã truyền tải trọn vẹn sự tinh tế, nhạc tính và chất thơ mộc mạc của nguyên tác sang tiếng Việt. Bản dịch nhận được sự mến mộ sâu sắc của nhiều thế hệ bạn đọc Việt Nam nhờ khả năng lưu giữ nét trong sáng nguyên sơ của giọng kể trẻ thơ.</p>
                  </div>
                </div>
              )}

              {activeTab === "policies" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
                  {[
                    { icon: "schedule", title: "Thời gian giao hàng", items: ["Nội thành Hà Nội & TP.HCM: Giao siêu tốc 2-4 giờ hoặc giao tiêu chuẩn trong ngày.", "Các tỉnh thành khác: Giao tận tay từ 2-3 ngày làm việc qua bưu tá Vietnam Post / Viettel Post."] },
                    { icon: "payments", title: "Cước phí & Khuyến mại", items: ["Đồng giá 20.000 ₫: Đơn hàng dưới 250.000 ₫ toàn quốc.", "Miễn phí vận chuyển: Tự động áp dụng cho mọi đơn từ 250.000 ₫.", "Được kiểm tra tình trạng sách nguyên vẹn trước khi thanh toán."] },
                    { icon: "assignment_return", title: "Đổi trả tại nhà", items: ["Đổi mới 100% trong vòng 7 ngày nếu lỗi trang in mờ, rách gáy, bung chỉ.", "Bưu tá DalifaBooks hỗ trợ thu hồi sách đổi trả ngay tại địa chỉ của bạn mà không phát sinh thêm chi phí."] },
                  ].map((p) => (
                    <div key={p.icon} className="p-space-md rounded-xl bg-surface-subtle flex flex-col gap-2">
                      <span className="material-symbols-outlined text-primary text-[28px]">{p.icon}</span>
                      <h3 className="font-headline-sm text-headline-sm text-text-primary font-semibold">{p.title}</h3>
                      <ul className="font-body-sm text-body-sm text-text-secondary flex flex-col gap-1.5 list-disc pl-4">
                        {p.items.map((item, i) => <li key={i}>{item}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Related Books */}
            <div className="mt-space-2xl">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-space-lg gap-2">
                <div>
                  <div className="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold mb-1">Gợi ý dành riêng cho bạn</div>
                  <h2 className="font-headline-lg text-headline-lg text-text-primary font-bold">Tác phẩm cùng chủ đề xoa dịu tâm hồn</h2>
                </div>
                <a className="font-label-md text-label-md text-primary font-semibold hover:underline flex items-center gap-1 self-start sm:self-auto" href="#"><span>Xem toàn bộ tuyển tập</span><span className="material-symbols-outlined text-[16px]">arrow_forward</span></a>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-space-md">
                {RELATED.map((book) => (
                  <div key={book.title} className="bg-surface-card rounded-xl p-space-sm shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group">
                    <div>
                      <div className="w-full aspect-[2/3] bg-surface-subtle rounded-lg overflow-hidden relative mb-2.5">
                        <img alt={"Bìa sách " + book.title} className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300" src={book.img} />
                        <span className={"absolute top-2 left-2 px-2 py-0.5 rounded font-label-sm text-label-sm font-bold " + book.badgeClass}>{book.badge}</span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-text-primary font-semibold line-clamp-2 leading-snug group-hover:text-primary transition-colors">{book.title}</h3>
                      <p className="font-body-sm text-body-sm text-text-secondary mt-1">{book.author}</p>
                    </div>
                    <div className="mt-3 pt-2">
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="font-price-md text-price-md text-primary">{book.price}</span>
                        <span className="font-body-sm text-body-sm text-text-muted line-through">{book.original}</span>
                      </div>
                      <button className="w-full py-2 rounded-lg bg-surface-subtle hover:bg-surface-container font-label-sm text-label-sm text-text-primary font-semibold transition-colors flex items-center justify-center gap-1.5" type="button">
                        <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
                        <span>Thêm vào giỏ</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />

      {/* Excerpt Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-primary/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-card rounded-2xl max-w-2xl w-full max-h-[87vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-4 bg-surface-subtle flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">auto_stories</span>
                <span className="font-headline-sm text-headline-sm text-text-primary font-bold">Đọc thử: Cây Cam Ngọt Của Tôi</span>
              </div>
              <button aria-label="Đóng đọc thử" className="w-8 h-8 rounded-full bg-surface-card text-text-primary flex items-center justify-center hover:bg-surface-container" onClick={() => setShowModal(false)} type="button">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-4 font-body-lg text-body-lg text-text-secondary leading-relaxed">
              <h4 className="font-headline-sm text-headline-sm text-text-primary font-semibold">Chương 1: Kẻ phát hiện những điều bất ngờ</h4>
              <p>Chúng tôi nắm tay nhau thả bộ xuôi theo con đường. Totoca dạy tôi về cuộc đời. Tôi thì mừng ra mặt vì có người anh lớn dắt tay dạo mát và chỉ bảo cho đủ thứ. Nhưng Totoca cũng chỉ dẫn một cách dè dặt vì tôi lúc nào cũng hỏi quá nhiều.</p>
              <p>— Totoca này, tuổi như em đã phải đi làm chưa?</p>
              <p>— Chưa đâu, Zeze. Nhưng mày phải học ngoan ngoãn đã. Bố không vui đâu nếu mày cứ mãi quậy phá như thế.</p>
              <p className="italic bg-surface-subtle p-4 rounded-lg text-text-primary">"Ngôi nhà mới có một khoảnh vườn nhỏ phía sau. Ở đó, tôi thấy một cây cam con bé tẹo. Nó khẳng khiu, đứng một mình cô độc nơi bờ rào, dường như cũng buồn bã và bị bỏ rơi giống như tôi vậy..."</p>
              <p>... (Còn tiếp trong ấn phẩm xuất bản chính thức)</p>
            </div>
            <div className="p-4 bg-surface-subtle flex justify-end gap-3">
              <button className="px-5 py-2 rounded-lg bg-surface-card hover:bg-surface-container text-text-primary font-label-md text-label-md font-semibold" onClick={() => setShowModal(false)} type="button">Đóng lại</button>
              <button className="px-5 py-2 rounded-lg bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md font-semibold flex items-center gap-1.5" onClick={() => { setShowModal(false); handleAddToCart(); }} type="button">
                <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                <span>Đặt mua toàn bộ cuốn sách</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
