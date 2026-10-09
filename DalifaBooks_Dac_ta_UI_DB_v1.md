# DalifaBooks Đặc tả UI và database theo module

Phiên bản 1.0 · Ngày 09 tháng 10 năm 2026

Tài liệu dành cho người thiết kế UI và lập trình DalifaBooks. Mỗi màn hình có mã để liên kết thiết kế, API, database và nghiệm thu. Kiến trúc đã thống nhất: monorepo, Next.js cho storefront và CMS, NestJS cho API, PostgreSQL, Prisma và worker nền. Tài liệu này là đặc tả thiết kế và hợp đồng dữ liệu; chưa phải migration SQL hoặc mã nguồn triển khai.

## 1 Phạm vi và cách sử dụng

### 1.1 Phạm vi phiên bản đầu

Bán sách giấy, một kho ban đầu, hỗ trợ mua không cần đăng nhập, COD và chuyển khoản xác nhận thủ công. Có tài khoản khách hàng, CMS sách và phiên bản bán, danh mục, tác giả, nhà xuất bản, ảnh, kho, đơn, thanh toán, vận chuyển, coupon, bài viết, banner và phân quyền. Schema cho phép nhiều kho nhưng UI phiên bản đầu dùng một kho mặc định.

Cổng thanh toán tự động, tích điểm, đánh giá, AI gợi ý, marketplace, sách điện tử và quản lý mua hàng từ nhà cung cấp nằm ngoài phiên bản đầu. Không hiển thị chức năng chưa được triển khai như thể đã hoạt động.

### 1.2 Cách triển khai từng màn hình

1. Tạo frame Figma theo mã màn hình, ví dụ `ADM-BOOK-02`.
2. Design trạng thái mặc định, loading, empty, error và các trạng thái riêng được nêu.
3. Chốt dữ liệu và hành vi theo module trước khi viết migration.
4. Tạo DB và API cho một luồng hoàn chỉnh, sau đó nối UI.
5. Nghiệm thu bằng tiêu chí của màn hình và quy tắc nghiệp vụ chung.

Mỗi yêu cầu code tiếp theo nên nêu mã màn hình, link/ảnh design, module phụ thuộc đã xong và phạm vi cần thực hiện. Ví dụ: “Code ADM-BOOK-02 theo design này, gồm API và DB của module Catalog”.

### 1.3 Các giả định sản phẩm cần cấu hình

Phí ship dùng bảng phí theo vùng hoặc báo giá đã cấu hình; không mặc định miễn phí. Thời hạn giữ đơn chuyển khoản đề xuất 30 phút, cần chốt khi vận hành. Đơn COD chờ xác nhận có thời hạn riêng do Owner cấu hình. Điều kiện hủy, trả hàng, phí ship và nội dung chính sách phải được nhập trước khi mở bán. Tên miền, địa chỉ cửa hàng, số điện thoại, tài khoản ngân hàng và màu thương hiệu chưa chốt; dùng placeholder trong design, không tự tạo thông tin thật.

## 2 Quy chuẩn UI dùng chung

### 2.1 Design system

Storefront ưu tiên sách, bìa sách, tìm kiếm và nút mua. Đề xuất nền sáng, chữ tối, một màu nhấn thương hiệu. Chưa chốt logo hoặc bảng màu. CMS ưu tiên khả năng đọc bảng, form và trạng thái xử lý.

| Thành phần | Quy cách thiết kế |
|---|---|
| Frame storefront | Desktop 1440 px, mobile 390 px; kiểm tra từ 320 px |
| Frame CMS | Desktop 1440 px; tablet 1024 px; mobile dùng drawer và danh sách thu gọn |
| Layout storefront | Header, search, navigation, main, footer; container tối đa khoảng 1200 px |
| Layout CMS | Sidebar, topbar, breadcrumb, title, primary action, content |
| Spacing | Token 4, 8, 12, 16, 24, 32, 48 px |
| Typography | Font hỗ trợ tiếng Việt; body 16 px storefront, 14–16 px CMS |
| Button | Primary, secondary, danger, disabled, loading; vùng chạm tối thiểu 44 px |
| Form | Label thường trực, dấu bắt buộc, helper text, lỗi ngay dưới trường |
| Table | Filter, sort, pagination, trạng thái loading/empty/error, row action |
| Dialog | Tiêu đề, tác động, xác nhận/hủy; yêu cầu lý do cho thao tác nhạy cảm |
| Status | Có chữ và màu; không chỉ dùng màu để truyền đạt |
| Tiền và ngày | UI hiển thị 89.000 ₫; ngày theo Asia/Ho_Chi_Minh; DB lưu UTC |

Component cần design trước: BookCard, EditionSelector, PriceBlock, QuantityInput, SearchBox, FilterDrawer, CartItem, AddressForm, OrderSummary, StatusBadge, DataTable, MediaPicker, RichTextEditor, ConfirmDialog, Toast, Skeleton, Pagination và ErrorPanel.

BookCard có bìa, tên, tác giả, giá từ, giá gạch nếu có giảm, tình trạng bán. Không tự gắn “bán chạy”, “còn 2 sản phẩm” hoặc đánh giá sao khi không có dữ liệu.

### 2.2 Trạng thái và hành vi chung

Mọi màn hình dữ liệu phải có loading, empty, lỗi mạng, retry và thành công. Form giữ dữ liệu khi lỗi API; lỗi trường phải liên kết với input. Nút submit có loading nhưng backend vẫn chống gửi trùng. CMS cảnh báo khi rời form có thay đổi chưa lưu. Xung đột phiên bản trả 409 và cho tải dữ liệu mới, không ghi đè im lặng.

Mọi hành động bị thiếu quyền phải bị API từ chối, kể cả khi UI đã ẩn nút. Điều hướng bằng bàn phím, focus rõ, label đúng, modal trả focus về nút mở, thông báo lỗi đọc được bởi công nghệ hỗ trợ. Bảng mobile chuyển thành card hoặc có cuộn ngang có chủ đích.

## 3 Danh mục màn hình và thứ tự thực hiện

| Module | Mã màn hình | Màn hình |
|---|---|---|
| Foundation | SYS-01 | Design system, shell storefront và CMS |
| Identity | AUTH-01 đến AUTH-04 | Đăng nhập, đăng ký, quên/reset mật khẩu, CMS login và MFA |
| Catalog CMS | ADM-BOOK-01/02 | Danh sách sách, tạo/sửa sách và phiên bản |
| Catalog metadata | ADM-META-01/02/03 | Danh mục, tác giả, nhà xuất bản |
| Media | ADM-MEDIA-01 | Thư viện ảnh và upload |
| Storefront catalog | SHOP-01/02/03 | Trang chủ, danh sách/tìm kiếm, chi tiết sách |
| Inventory | ADM-STOCK-01/02 | Tồn kho, lịch sử và điều chỉnh |
| Cart | CART-01 | Giỏ hàng |
| Checkout | CHECKOUT-01/02 | Checkout, kết quả đặt hàng |
| Customer orders | ACCOUNT-01/02/03 | Hồ sơ/địa chỉ, danh sách đơn, chi tiết đơn và tra cứu khách vãng lai |
| CMS orders | ADM-ORDER-01/02 | Danh sách và chi tiết xử lý đơn |
| Payments | ADM-PAY-01/02 | Đối soát chuyển khoản, chi tiết thanh toán/hoàn tiền |
| Shipping | ADM-SHIP-01 | Tạo và cập nhật vận đơn trong chi tiết đơn |
| Promotions | ADM-COUPON-01/02 | Danh sách, tạo/sửa mã giảm giá |
| Content | ADM-CONTENT-01/02/03 | Bài viết, trình sửa bài, banner |
| Public content | CONTENT-01/02 | Danh sách/chi tiết bài, giới thiệu và chính sách |
| Admin access | ADM-USER-01/02 | Nhân sự, vai trò/quyền |
| Settings | ADM-SET-01 | Cấu hình bán hàng, giao hàng, ngân hàng, nội dung chung |
| Operations | ADM-DASH-01, ADM-AUDIT-01 | Dashboard và audit log |

Thứ tự code: Foundation → Identity/RBAC → Media/metadata/Catalog CMS → Storefront catalog → Inventory → Cart/quote/Checkout → CMS orders → Payments/Shipping → Customer orders → Promotions → Content/Settings → Dashboard/Audit và hardening. Settings tối thiểu cho checkout và audit nền phải có trước khi checkout mở bán, dù UI đầy đủ làm ở giai đoạn sau.

## 4 Module Identity và phân quyền

### AUTH-01 Đăng nhập khách hàng

Route `/dang-nhap`. Layout một form tập trung gồm email, mật khẩu, hiện/ẩn mật khẩu, nút đăng nhập, quên mật khẩu, link đăng ký. Cho quay về trang trước bằng return URL nội bộ được whitelist.

Email bắt buộc, chuẩn hóa trim và lowercase; mật khẩu không trim. Thông báo sai thông tin dùng nội dung chung. Không tiết lộ tài khoản tồn tại. API `POST /auth/login`, `POST /auth/logout`, `GET /me`. DB `users`, `credentials`, `sessions`. Đăng nhập thành công gộp giỏ khách vào giỏ tài khoản, kiểm tra lại số lượng và giới hạn mua; không giữ hàng khi gộp giỏ.

Nghiệm thu: phiên khách không truy cập được dữ liệu tài khoản; session CMS không được chấp nhận như session storefront; logout thu hồi session hiện tại.

### AUTH-02 Đăng ký

Route `/dang-ky`. Họ tên, email, mật khẩu, xác nhận mật khẩu, đồng ý điều khoản bắt buộc, nhận marketing tùy chọn và không tích sẵn. Mật khẩu đề xuất 12–128 ký tự; hiển thị hướng dẫn trước submit. Sau tạo tài khoản có màn xác minh email và gửi lại có giới hạn.

API `POST /auth/register`, `/auth/email-verification/confirm`, `/auth/email-verification/resend`. DB `users`, `credentials`, `auth_tokens`, `user_consents`. Không tự cấp vai trò nhân viên từ request đăng ký.

### AUTH-03 Quên và đặt lại mật khẩu

Routes `/quen-mat-khau`, `/dat-lai-mat-khau`. Form yêu cầu email; phản hồi chung dù email có tồn tại hay không. Form reset gồm mật khẩu mới và xác nhận; token lỗi/hết hạn hiển thị CTA yêu cầu link mới. API `/auth/password-reset/request`, `/auth/password-reset/confirm`. Token lưu hash, dùng một lần; reset thành công thu hồi session theo chính sách bảo mật.

### AUTH-04 Đăng nhập CMS và MFA

Routes CMS `/login`, `/mfa`, `/mfa/setup`. Email/mật khẩu → bước MFA → CMS. Setup MFA có QR, nhập mã xác minh và hiển thị recovery codes một lần. API `/admin/auth/login`, `/admin/auth/mfa/verify`, `/admin/auth/mfa/setup`, `/admin/auth/mfa/confirm`, `/admin/auth/logout`. Pre-auth challenge ngắn hạn không có quyền gọi CMS API. DB thêm `mfa_credentials`, `mfa_recovery_codes`, `auth_challenges`; secret MFA mã hóa, recovery code lưu hash.

Nghiệm thu: không bỏ qua MFA bằng gọi API trực tiếp; challenge hết hạn hoặc đã dùng bị từ chối; khóa tài khoản làm mất hiệu lực quyền hiện tại.

### ADM-USER-01 và ADM-USER-02 Nhân sự và quyền

Danh sách nhân sự: họ tên, email, trạng thái, vai trò, MFA, lần đăng nhập gần nhất; mời nhân sự bằng email, khóa/mở, thu hồi session. Vai trò: tên, mô tả, permission matrix theo module. Quyền `staff.manage`, `roles.manage`; thao tác cần xác thực lại và audit.

API `/admin/staff`, `/admin/staff/invitations`, `/admin/roles`, `/admin/permissions`. Không cho xóa/khóa/hạ quyền Owner cuối cùng. Không cho người quản trị cấp quyền vượt quá phạm vi được phép. DB `roles`, `permissions`, `user_roles`, `role_permissions`, `staff_invitations`.

## 5 Module Catalog và Media

### ADM-BOOK-01 Danh sách sách

Route CMS `/books`. Thanh tìm kiếm tên/SKU/ISBN, filter trạng thái/danh mục/tác giả/nhà xuất bản, nút thêm sách. Bảng: bìa, tên, tác giả, số phiên bản, khoảng giá, lượng có thể bán tổng hợp, trạng thái, cập nhật cuối. Row action xem, sửa, lưu trữ. Không xóa sách đã có giao dịch.

API `GET /admin/books?q=&status=&categoryId=&cursor=`, `POST /admin/books/{id}/archive`. DB `books`, `book_editions` và các bảng liên kết. Quyền `catalog.read`, `catalog.write`. Empty có CTA thêm sách; không tìm thấy giữ filter và cho xóa filter.

### ADM-BOOK-02 Tạo và sửa sách

Route CMS `/books/new`, `/books/{id}`. Các tab: thông tin chung, phiên bản bán, ảnh, SEO. Header có trạng thái, xem trước, lưu nháp, xuất bản/lưu trữ.

| Trường UI | DB | Bắt buộc và validation |
|---|---|---|
| Tên sách | books.title | Có, 1–300 ký tự |
| Slug | books.slug | Có khi xuất bản, unique, chữ thường và dấu gạch nối |
| Mô tả | books.description | Rich text được sanitize; giới hạn 100.000 ký tự |
| Tác giả | book_authors | Chọn nhiều, sắp thứ tự hiển thị |
| Danh mục | book_categories | Ít nhất một khi xuất bản; một danh mục chính |
| Trạng thái | books.status | draft, published, archived |
| SEO title/description | books.seo_title/seo_description | Tùy chọn; có bộ đếm và preview |
| SKU phiên bản | book_editions.sku | Có, 1–64 ký tự, unique |
| ISBN | book_editions.isbn | Tùy chọn, ISBN-10/13 hợp lệ sau chuẩn hóa |
| Định dạng | book_editions.format | paperback hoặc hardcover |
| Ngôn ngữ/NXB | language, publisher_id | Có khi xuất bản phiên bản |
| Ngày xuất bản, số trang | publication_date, page_count | Tùy chọn; số trang > 0 |
| Giá niêm yết | list_price_vnd | Số nguyên VND > 0 khi mở bán |
| Giá bán | sale_price_vnd | Số nguyên > 0 và không vượt giá niêm yết |
| Trạng thái phiên bản | book_editions.status | draft, active, archived |

Một đầu sách có nhiều phiên bản. Form phiên bản dùng drawer hoặc section riêng; không trộn SKU, ISBN và tồn kho vào trường chung của đầu sách. Tồn kho chỉ đọc tại đây, điều chỉnh qua module Inventory. Xuất bản cần ít nhất một phiên bản active hợp lệ và ảnh bìa; tồn kho bằng 0 vẫn được xuất bản để hiển thị hết hàng.

API `POST/PATCH /admin/books`, `POST/PATCH /admin/books/{id}/editions`, `POST /admin/books/{id}/publish`. Update gửi `version`. Nghiệm thu: sửa giá không đổi đơn cũ; trùng SKU/ISBN có lỗi cụ thể; sách archived không tạo đơn mới; bản xem trước phải có quyền và không index.

### ADM-META-01 Danh mục

Route `/categories`. Cây danh mục, tạo/sửa bằng drawer: tên, slug, danh mục cha, mô tả, ảnh tùy chọn, vị trí, active. Không cho tạo vòng lặp hoặc chọn chính nó làm cha. Archive danh mục không cascade xóa sách. API `/admin/categories`. DB `categories`, `book_categories`. Unique slug toàn site; giới hạn độ sâu đề xuất 3 cấp cho navigation.

### ADM-META-02 Tác giả và ADM-META-03 Nhà xuất bản

Routes `/authors`, `/publishers`. Danh sách tìm kiếm; form tên, slug, mô tả, ảnh tùy chọn, trạng thái. API `/admin/authors`, `/admin/publishers`. Không bắt tên unique vì có thể trùng người/tổ chức; slug unique. Không xóa record đang được tham chiếu, dùng archive.

### ADM-MEDIA-01 Thư viện ảnh

Route `/media`, đồng thời là picker trong form sách/bài/banner. Grid thumbnail; filter loại/trạng thái; upload nhiều; chi tiết gồm tên file, alt, kích thước, dung lượng, nơi đang dùng. Trạng thái uploading, processing, ready, rejected. Nút retry từng file; không cho chọn ảnh chưa ready.

API `POST /admin/media/upload-intents`, `POST /admin/media/{id}/finalize`, `GET /admin/media`. Chỉ nhận JPEG/PNG/WebP, đề xuất tối đa 10 MB và 20 megapixel; backend kiểm tra bytes, giải mã và tái tạo ảnh. Không cho SVG ở MVP. Bìa render trong khung 2:3 bằng object-fit contain; không cắt mất nội dung. Banner có preview desktop/mobile, nên cho ảnh riêng từng breakpoint.

DB `media_assets`, `book_images`. Object key ngẫu nhiên, URL public chỉ sinh cho bản xử lý xong. Xóa ảnh đang được dùng bị chặn; ảnh mồ côi có retention trước khi dọn.

## 6 Module Storefront Catalog

### SHOP-01 Trang chủ

Route `/`. Header logo, tìm kiếm, danh mục, tài khoản và giỏ. Main: hero/banner, danh mục nổi bật, sách được chọn, bài viết mới; footer liên hệ/chính sách. Cấu hình section và thứ tự trong CMS Content/Settings. Bộ sách nổi bật dùng chọn thủ công; nếu có “bán chạy” phải dùng số đơn đã hoàn tất trong khoảng thời gian xác định.

API `GET /home` trả banner đang hiệu lực, collection, danh mục và bài đã xuất bản. DB `banners`, `book_collections`, `collection_books`, `books`, `posts`. Banner hết hiệu lực tự ẩn. Chỉ hiển thị đầu sách published. Thiếu một section không làm hỏng cả trang.

### SHOP-02 Danh sách và tìm kiếm

Routes `/sach`, `/danh-muc/{slug}`, `/tim-kiem?q=`. Breadcrumb, tiêu đề, tổng kết quả, filter danh mục/tác giả/NXB/khoảng giá/còn hàng; sort phù hợp, mới nhất, giá tăng/giảm; grid sách và pagination. Mobile dùng filter drawer và thanh sort.

API `GET /books?q=&category=&author=&publisher=&minPrice=&maxPrice=&inStock=&sort=&cursor=`. MVP tìm kiếm tiếng Việt bằng trường search_text đã chuẩn hóa dấu và pg_trgm; kiểm thử tên có/không dấu. Search index chỉ chứa dữ liệu published. Mỗi card đại diện một đầu sách, hiển thị giá từ phiên bản active; range filter áp dụng phiên bản đủ điều kiện. URL giữ filter để chia sẻ và quay lại.

Nghiệm thu: min > max báo lỗi; không có kết quả có gợi ý bỏ filter; không lộ draft; canonical/noindex cho tổ hợp filter được chốt trong SEO.

### SHOP-03 Chi tiết sách

Route `/sach/{slug}`. Gallery bên trái; bên phải tên, tác giả, chọn phiên bản, SKU/ISBN, giá, trạng thái, số lượng, thêm giỏ/mua ngay. Bên dưới mô tả, thông tin xuất bản, vận chuyển/chính sách và sách liên quan theo danh mục.

API `GET /books/{slug}`. Khi đổi phiên bản, cập nhật ảnh nếu có, giá, ISBN, định dạng và tồn khả dụng. Hết hàng disable mua và cho xem phiên bản khác. Không hiển thị số tồn chính xác nếu chưa có quyết định sản phẩm. Mua ngay thêm/đặt số lượng vào giỏ rồi chuyển checkout, không tự tạo đơn. API giỏ vẫn kiểm tra lại trạng thái và số lượng. Slug không có trả 404; sản phẩm archived không tiếp tục mua.

## 7 Module Inventory

### ADM-STOCK-01 Tồn kho

Route `/inventory`. Search SKU/ISBN/tên; filter kho, hết hàng, tồn thấp. Bảng phiên bản: SKU, tên, kho, tồn vật lý, đã giữ, có thể bán, ngưỡng cảnh báo, cập nhật. Có thể bán = on_hand − reserved; giá trị này không nhập trực tiếp.

API `GET /admin/inventory`, `PATCH /admin/inventory/{editionId}/threshold`. Quyền `inventory.read`, `inventory.adjust`. Bản active mới có balance = 0; thiếu balance không được xem là có hàng.

### ADM-STOCK-02 Lịch sử và điều chỉnh

Drawer/trang `/inventory/{editionId}`: balance, lịch sử movement, reservation còn hiệu lực. Form nhập/xuất điều chỉnh: kho, delta số lượng, reason nhập ban đầu/nhập thêm/hư hỏng/kiểm kê, ghi chú, tham chiếu. Preview số tồn sau thay đổi; submit có xác nhận và lý do bắt buộc.

API `POST /admin/inventory/adjustments`, `GET /admin/inventory/{editionId}/movements`. Không cho tồn vật lý sau điều chỉnh nhỏ hơn reserved. Kiểm kê dựa vào version để phát hiện dữ liệu đã đổi. Không sửa/xóa movement; sai thì tạo movement bù. Nghiệm thu điều chỉnh ghi balance, movement và audit cùng transaction.

## 8 Module Cart và Checkout

### CART-01 Giỏ hàng

Route `/gio-hang`. Mỗi dòng: bìa, tên, phiên bản, giá hiện tại, quantity, thành tiền, xóa. Summary: subtotal dự kiến, CTA checkout; ship và coupon cuối cùng xác định ở checkout. Empty có link mua sách. Hiển thị cảnh báo sách hết hàng, đã ngừng bán hoặc giá vừa thay đổi.

API `GET /cart`, `PUT /cart/items/{editionId}`, `DELETE /cart/items/{editionId}`. PUT đặt số lượng tuyệt đối để retry an toàn. Quantity đề xuất 1–99, còn tùy tồn và giới hạn sản phẩm. DB `carts`, `cart_items`. Guest token cookie bí mật, DB lưu hash. Một tài khoản có một giỏ active. Giỏ không giữ hàng và không bảo đảm giá.

### CHECKOUT-01 Đặt hàng

Route `/thanh-toan`. Desktop hai cột form và summary; mobile một cột. Cho guest mua ngay; tài khoản có chọn địa chỉ đã lưu. Các section: liên hệ, địa chỉ, giao hàng, thanh toán, coupon, ghi chú, xác nhận điều khoản.

| Trường | Validation và nguồn |
|---|---|
| Người nhận | Bắt buộc, 2–120 ký tự |
| Điện thoại | Bắt buộc, chuẩn hóa về định dạng quốc tế và kiểm tra số Việt Nam hợp lệ |
| Email | Tùy chọn cho guest; dùng gửi xác nhận nếu có |
| Địa chỉ | Bắt buộc; mã vùng từ danh mục địa chỉ có phiên bản, không hardcode cơ cấu hành chính |
| Địa chỉ cụ thể | Bắt buộc, 5–300 ký tự |
| Phương thức giao hàng | Chỉ nhận lựa chọn được server trả cho địa chỉ |
| Thanh toán | COD hoặc bank_transfer nếu đang bật |
| Coupon | Trim, chuẩn hóa; server kiểm tra điều kiện và quota |
| Ghi chú | Tùy chọn, tối đa 1.000 ký tự |
| Giá, giảm, ship, tổng | Read-only từ quote của server |

API `POST /checkout/quote` nhận editionId/quantity hoặc cartId, địa chỉ, shippingMethod, paymentMethod và coupon; trả `quote_id`, hạn hiệu lực, giá từng dòng, giảm, ship, tổng, cảnh báo. Quote không giữ hàng. `POST /orders` nhận quoteId, thông tin khách và Idempotency-Key; server tính/kiểm tra lại mọi điều kiện và giữ kho trong transaction.

Nếu quote thay đổi trả `QUOTE_CHANGED` cùng báo giá mới, UI cho khách xác nhận lại. Nếu thiếu hàng trả `OUT_OF_STOCK`, chỉ rõ dòng cần sửa. Timeout sau submit cho thử lại với cùng key để lấy đơn đã tạo. Không tự tạo key mới khi chưa biết kết quả.

### CHECKOUT-02 Kết quả đặt hàng

Route `/dat-hang/{orderId}` được bảo vệ bằng quyền sở hữu hoặc guest access token. COD hiển thị “Đã tiếp nhận đơn, chờ xác nhận”. Chuyển khoản hiển thị số tiền, ngân hàng, chủ tài khoản, nội dung chuyển khoản riêng cho đơn, QR, copy và thời điểm hết hạn. “Tôi đã chuyển khoản” chỉ ghi yêu cầu đối soát, không đổi thành paid.

API `GET /orders/{id}/confirmation`, `POST /orders/{id}/payment-review-requests`. QR và ngân hàng dựa trên cấu hình snapshot của payment attempt. Không dùng order number làm mật khẩu tra cứu. Không cho khách khác xem địa chỉ/ngân hàng riêng của đơn qua đoán URL.

Nghiệm thu module: hai khách mua bản cuối chỉ một khách giữ được; bấm nhiều lần tạo một đơn; ghi order, items, reservation, coupon hold và outbox nguyên tử.

## 9 Module Customer và đơn hàng khách

### ACCOUNT-01 Hồ sơ và địa chỉ

Routes `/tai-khoan`, `/tai-khoan/dia-chi`. Họ tên, email và tình trạng xác minh, số điện thoại; danh sách địa chỉ, thêm/sửa/xóa/chọn mặc định. Đổi email cần xác minh mới, không ghi đè trạng thái verified của email cũ. API `/me`, `/me/email-change`, `/me/addresses`. DB `users`, `addresses`, `auth_tokens`. Một địa chỉ mặc định mỗi tài khoản; xóa địa chỉ không sửa snapshot đơn cũ.

### ACCOUNT-02 Danh sách đơn

Route `/tai-khoan/don-hang`. Card/bảng: mã đơn, ngày, ảnh/tên đại diện, tổng tiền, ba trạng thái, xem chi tiết. Filter trạng thái và pagination. API `GET /me/orders`; server tự scope theo session, không tin userId gửi từ UI.

### ACCOUNT-03 Chi tiết và tra cứu guest

Route `/tai-khoan/don-hang/{id}` hoặc `/tra-cuu-don`. Chi tiết gồm timeline, sách/số lượng/giá đã mua, địa chỉ snapshot, tổng tiền, phương thức thanh toán, tracking, hỗ trợ và hủy nếu đủ điều kiện. Guest nhập mã đơn và nhận OTP qua kênh liên hệ đã lưu; gửi phản hồi chung để tránh dò tài khoản. Trường hợp không có kênh gửi OTP, dùng access token đã cấp khi đặt hàng; mất token cần hỗ trợ xác minh thủ công.

API `GET /me/orders/{id}`, `POST /orders/{id}/cancel`, `POST /guest/order-access/request`, `/guest/order-access/confirm`. Request/confirm rate-limit, token ngắn hạn scope theo một order. Hủy chỉ trước xuất hàng và theo policy; đơn đã trả tiền tạo yêu cầu hoàn tiền riêng, không tự đặt refunded.

## 10 Module Orders và Shipping trong CMS

### ADM-ORDER-01 Danh sách đơn

Route `/orders`. Search mã đơn/điện thoại, filter ngày, trạng thái đơn, thanh toán, vận chuyển và phương thức trả tiền. Bảng: mã, giờ tạo, người nhận, tổng, payment/order/fulfillment status, tuổi đơn, action. Export chỉ với `orders.export`, có audit và giới hạn dữ liệu cá nhân. MVP tránh bulk chuyển trạng thái để dễ kiểm soát.

API `GET /admin/orders`, `POST /admin/orders/exports`. Export nền, URL tải hết hạn; không cache public. DB `orders`, `order_items`, `payment_attempts`, `payment_receipts`, `shipments`.

### ADM-ORDER-02 Chi tiết xử lý đơn

Route `/orders/{id}`. Header mã và ba badge; panel khách/địa chỉ, dòng sách/giá snapshot, breakdown tiền, payment attempts, shipments, timeline, ghi chú nội bộ. Hành động theo trạng thái và permission: xác nhận, bắt đầu xử lý, xuất kho, hủy, yêu cầu hoàn tiền.

API `GET /admin/orders/{id}`, `POST /admin/orders/{id}/transitions`, `POST /admin/orders/{id}/notes`. Transition gửi action, reason, expectedVersion, Idempotency-Key. Ghi chú nội bộ không trả về API khách.

MVP không sửa sản phẩm, giá hoặc địa chỉ đơn đã xác nhận. Đơn pending có thể sửa liên hệ/địa chỉ bằng endpoint riêng và tính lại ship; nếu làm thay đổi tổng tiền phải được khách xác nhận và không sửa payment attempt đã thành công. Phương án đơn giản cho phiên bản đầu là hủy và tạo đơn thay thế có liên kết.

### ADM-SHIP-01 Vận đơn

Panel trong chi tiết đơn: carrier, tracking code, dịch vụ, các dòng/số lượng gửi, thời điểm gửi, URL tracking, trạng thái. MVP một shipment cho toàn đơn; schema cho phép nhiều shipment sau này. Nếu nhập tay, ghi “Cập nhật thủ công” và audit; không tự tạo tracking giả.

API `POST /admin/orders/{id}/shipments`, `POST /admin/shipments/{id}/dispatch`, `POST /admin/shipments/{id}/events`. Tạo vận đơn chưa trừ tồn; dispatch mới giảm on_hand và reserved, ghi movement một lần. Chỉ dispatch khi confirmed, có reservation hợp lệ, và payment đã paid hoặc phương thức COD được phép. Delivered COD không tự paid. Tracking URL theo allowlist carrier, không nhận URL tùy ý.

## 11 Module Payments và Refunds

### ADM-PAY-01 Đối soát chuyển khoản

Route `/payments`. Filter pending review, số tiền, nội dung chuyển khoản, ngày; bảng đơn, số cần thu, đã nhận, tham chiếu, hạn giữ hàng. Drawer nhập mã giao dịch ngân hàng, số tiền thực nhận, thời điểm, bằng chứng tùy chọn và ghi chú. Quyền `payments.reconcile`, cần xác thực lại.

API `POST /admin/payment-attempts/{id}/reconcile`. Unique tham chiếu theo ngân hàng/provider để ngăn ghi nhận trùng. Đúng số tiền/đơn mới xác nhận paid; thiếu/thừa/sai nội dung đưa vào cần xử lý, không tự sửa total của order. Chuyển khoản đến sau reservation hết hạn cần giữ lại kho hoặc xử lý hoàn tiền, không xác nhận có hàng mặc định.

### ADM-PAY-02 Chi tiết thanh toán và hoàn tiền

Route `/payments/{id}` hoặc tab đơn. Hiển thị attempts, settlement, số đã thu, đã hoàn, hoàn đang xử lý và số còn có thể hoàn. Form lý do, số tiền, phương thức, xác nhận. API `POST /admin/payment-attempts/{id}/refunds`, `POST /admin/refunds/{id}/confirm-manual` cho chuyển khoản thủ công. Quyền `payments.refund`; kiểm tra tổng refund pending + succeeded không vượt tiền đã nhận dưới khóa transaction.

Refund có requested, processing, succeeded, failed, cancelled. Chỉ ghi succeeded khi có bằng chứng hoặc xác nhận provider. Hoàn tiền không tự nhập lại kho; trả hàng phải được kho nhận và kiểm tra riêng. Bằng chứng thanh toán là media private, không dùng bucket/URL public của ảnh bìa.

## 12 Module Promotions

### ADM-COUPON-01 và ADM-COUPON-02

Routes `/coupons`, `/coupons/new`, `/coupons/{id}`. Danh sách: code, loại, giá trị, thời gian, quota, đã giữ/đã dùng, active. Form code, percent/fixed, giá trị, cap cho percent, minimum subtotal, bắt đầu/kết thúc, tổng lượt, lượt/tài khoản, phạm vi danh mục/phiên bản.

API `/admin/coupons`, `/checkout/quote` kiểm tra coupon. MVP mỗi đơn một mã, giảm trên tiền hàng trước ship, không cộng dồn. Percent 1–100; fixed > 0; discount không vượt subtotal đủ điều kiện. Coupon giới hạn theo tài khoản chỉ cho khách đăng nhập đã xác minh; không dựa vào email guest tự khai để chống dùng lại.

Giữ quota khi tạo đơn; chuyển hold thành redemption khi đơn được xác nhận; hủy đơn trước dispatch giải phóng hoặc đảo redemption theo policy phiên bản đầu. Không thay đổi chính sách hồi tố; lưu snapshot coupon và số giảm trên đơn. Test hai checkout tranh lượt coupon cuối.

## 13 Module Content và Settings

### ADM-CONTENT-01 và ADM-CONTENT-02 Bài viết

Routes `/posts`, `/posts/new`, `/posts/{id}`. Danh sách title, slug, tác giả nội bộ, trạng thái, thời gian đăng. Editor: title, slug, excerpt, cover, rich text, SEO, status, thời điểm đăng, preview và revision history. Draft, scheduled, published, archived. API `/admin/posts`, `/admin/posts/{id}/revisions`, `/admin/posts/{id}/publish`. Worker xuất bản lịch hẹn; không lộ scheduled trước thời điểm.

### ADM-CONTENT-03 Banner và bộ sách

Route `/banners`, `/collections`. Banner: tên nội bộ, ảnh desktop/mobile, alt, link nội bộ hoặc HTTPS allowlist, vị trí, thứ tự, thời gian hiệu lực, active. Collection: tên, slug, sách được chọn và thứ tự. API `/admin/banners`, `/admin/collections`. Banner thiếu ảnh mobile có fallback rõ trong preview. Link không được nhận javascript/data URL.

### CONTENT-01 và CONTENT-02 Nội dung công khai

Routes `/bai-viet`, `/bai-viet/{slug}`, `/gioi-thieu`, `/chinh-sach/{slug}`. List bài có thumbnail, title, excerpt, ngày; detail có breadcrumb, title, ngày, cover, body. Chính sách dùng `content_pages`, có revision và published_at. API `/posts`, `/posts/{slug}`, `/pages/{slug}`. Chỉ published; bản cũ của điều khoản lưu để tham chiếu user consent và checkout.

### ADM-SET-01 Cấu hình

Route `/settings`. Tabs thương hiệu/liên hệ, checkout, giao hàng, ngân hàng, SEO chung, chính sách. Fields nhãn cửa hàng, logo, hotline, email, địa chỉ, links; bật/tắt COD/chuyển khoản; thời hạn giữ hàng; bảng ship; tài khoản ngân hàng; tham chiếu chính sách đã xuất bản.

API `GET/PATCH /admin/settings`; permission `settings.manage`. Cấu hình ngân hàng yêu cầu xác thực lại và audit. Secret provider không lưu trong bảng public settings, chỉ ở secret manager; UI chỉ cho trạng thái đã cấu hình. Public API chỉ trả whitelist trường công khai. Thay ngân hàng không thay snapshot của attempt đang chờ thanh toán.

## 14 Module Operations

### ADM-DASH-01 Dashboard

Route `/`. Date range, số đơn chờ xác nhận, đơn chờ xuất, thanh toán cần xử lý, tồn thấp và biểu đồ thu tiền/doanh số. Phân biệt doanh số đơn hoàn tất và tiền thực thu trừ hoàn tiền; không gọi tổng mọi đơn là doanh thu. Mỗi metric có tooltip định nghĩa, múi giờ và link danh sách đã filter. API `/admin/dashboard`, chỉ trả metric có permission tương ứng. Có thể refresh theo chu kỳ, ghi rõ thời điểm dữ liệu.

### ADM-AUDIT-01 Audit log

Route `/audit`. Filter actor, action, entity, ngày; table thời gian, người, hành động, đối tượng; drawer before/after đã redact, lý do, requestId. API `GET /admin/audit-logs`; permission `audit.read`. UI read-only; không có nút sửa/xóa. Các thay đổi kho, đơn, thanh toán và quyền ghi audit cùng transaction dữ liệu. MFA/password/token không xuất hiện trong before/after.

## 15 Data dictionary dùng để dựng DB

### 15.1 Quy ước chung

`id` UUID PK; `created_at`, `updated_at` timestamptz khi phù hợp. Bảng sự kiện append-only chỉ cần created_at. `version` integer mặc định 1 trên aggregate sửa đồng thời. Tên trường snake_case. FK dùng RESTRICT cho dữ liệu giao dịch; CASCADE chỉ cho liên kết không có lịch sử độc lập. Dữ liệu cá nhân tuân theo thời hạn lưu và quy trình ẩn danh được chốt trước vận hành.

Tiền dùng bigint VND, API trả chuỗi số nguyên để tránh giới hạn số JavaScript; frontend dùng formatter có kiểm soát. Quantity integer > 0. `currency` char(3) mặc định VND. Status dùng enum hoặc text + CHECK có migration quản lý. JSONB chỉ dùng snapshot/payload/config có validation, không thay quan hệ catalog bằng JSON.

Trong các bảng dưới, FK là khóa ngoại, U là unique, dấu ? là nullable. Các trường common ở trên được hiểu ngầm. Đây là schema logic chi tiết để tạo Prisma/SQL ở bước code.

### 15.2 Identity

| Bảng | Cột đặc thù và kiểu |
|---|---|
| users | email varchar(254)? U chuẩn hóa; phone varchar(20)?; full_name varchar(120); status active/blocked; email_verified_at timestamptz? |
| credentials | user_id UUID PK FK users; password_hash text |
| sessions | token_hash text U; user_id FK; audience storefront/admin; expires_at; revoked_at?; last_seen_at? |
| auth_tokens | user_id FK; purpose verify_email/reset_password/change_email; token_hash U; expires_at; used_at?; pending_email? |
| auth_challenges | user_id FK; token_hash U; purpose; expires_at; used_at?; attempts integer |
| mfa_credentials | user_id FK U; encrypted_secret text; enabled_at?; last_used_step bigint? chống replay TOTP |
| mfa_recovery_codes | user_id FK; code_hash text; used_at? |
| roles / permissions | roles.code U, name; permissions.code U, description |
| user_roles | user_id FK; role_id FK; PK(user_id, role_id) |
| role_permissions | role_id FK; permission_id FK; PK(role_id, permission_id) |
| staff_invitations | email; invited_by FK users; token_hash U; expires_at; accepted_at? |
| invitation_roles | invitation_id FK; role_id FK; PK(invitation_id, role_id) |
| user_consents | user_id FK?; order_id FK?; policy_revision_id FK; purpose; accepted boolean; accepted_at |
| addresses | user_id FK; recipient; phone; address_line; locality_codes JSONB; locality_names JSONB; address_catalog_version; is_default boolean |

Unique partial index chỉ một địa chỉ mặc định/user. User email có thể null cho dữ liệu khách hỗ trợ nhập tay nhưng đăng ký bắt buộc email; guest checkout không tự tạo tài khoản. Consent phải có user hoặc order và tham chiếu đúng revision.

### 15.3 Catalog và nội dung

| Bảng | Cột đặc thù và kiểu |
|---|---|
| books | title varchar(300); slug varchar(200) U; description text; status; seo_title varchar(200)?; seo_description varchar(500)?; search_text text; version |
| book_editions | book_id FK; sku varchar(64) U; isbn varchar(13)? U; publisher_id FK; language varchar(20); format; publication_date date?; page_count integer?; list_price_vnd bigint; sale_price_vnd bigint; status; version |
| authors / publishers | name varchar(200); slug varchar(200) U; description text?; asset_id FK?; status |
| categories | parent_id FK categories?; name; slug U; description?; asset_id FK?; position integer; active boolean |
| book_authors | book_id FK; author_id FK; position; PK(book_id, author_id) |
| book_categories | book_id FK; category_id FK; is_primary; PK(book_id, category_id) |
| media_assets | object_key text U; original_name; mime_type; size_bytes bigint; width/height integer?; alt_text; visibility public/private; status; uploaded_by FK users |
| book_images | book_id FK; edition_id FK?; asset_id FK; position integer |
| book_collections | name; slug U; active; position |
| collection_books | collection_id FK; book_id FK; position; PK(collection_id, book_id) |
| posts | title; slug U; excerpt; cover_asset_id FK?; body text; author_user_id FK; status; publish_at?; published_at?; seo_title?; seo_description?; version |
| post_revisions | post_id FK; revision_number; content JSONB; actor_id FK; U(post_id, revision_number) |
| content_pages | title; slug U; body text; status; published_at?; version |
| page_revisions | page_id FK; revision_number; content JSONB; actor_id FK; U(page_id, revision_number) |
| banners | name; desktop_asset_id FK; mobile_asset_id FK?; alt; target_url; placement; position; active; starts_at?; ends_at? |
| site_settings | key text PK; value JSONB; version; updated_by FK |
| shipping_rules | region_key; method_code; fee_vnd bigint; free_shipping_threshold_vnd?; active; version |

Một danh mục chính/book bằng partial unique index. Khi book_images.edition_id có giá trị, edition phải thuộc cùng book; dùng composite FK hoặc constraint phù hợp, không chỉ kiểm tra UI. Giá bán không vượt giá niêm yết; trang > 0 nếu có. Các phạm vi banner có ends_at > starts_at. Policy consent tham chiếu page_revisions, không trỏ vào nội dung có thể sửa.

### 15.4 Giỏ và báo giá

| Bảng | Cột đặc thù và kiểu |
|---|---|
| carts | user_id FK?; guest_token_hash U?; status active/converted/expired; expires_at?; version |
| cart_items | cart_id FK; edition_id FK; quantity integer; U(cart_id, edition_id) |
| checkout_quotes | cart_id FK; owner_user_id FK?; guest_scope_hash?; request_snapshot JSONB; result_snapshot JSONB; expires_at; consumed_at? |

Cart phải có đúng một chủ sở hữu user hoặc guest. Unique partial một cart active/user. Quote lưu fingerprint của nội dung giỏ và chủ thể; không chấp nhận quote của khách khác. Quote đã dùng trả lại đơn cũ qua idempotency; không dùng tạo đơn thứ hai.

### 15.5 Kho

| Bảng | Cột đặc thù và kiểu |
|---|---|
| warehouses | code U; name; active |
| inventory_balances | edition_id FK; warehouse_id FK; on_hand integer; reserved integer; low_stock_threshold integer; version; PK(edition_id, warehouse_id) |
| inventory_reservations | order_item_id FK; edition_id FK; warehouse_id FK; quantity; status active/consumed/released; expires_at?; released_at?; U(order_item_id, warehouse_id) |
| stock_movements | edition_id FK; warehouse_id FK; delta_on_hand integer; delta_reserved integer; reason; source_type; source_id UUID; operation_key text U; actor_id FK?; note? |

CHECK on_hand >= 0, reserved >= 0, reserved <= on_hand, threshold >= 0. Movement lưu cả biến động vật lý và giữ hàng để đối chiếu. Worker expiry chỉ release active; transaction bảo đảm đúng một lần. SUM reservation active phải bằng reserved; đây là invariant giao dịch và job kiểm tra định kỳ, không phải CHECK đơn giản trên một dòng.

### 15.6 Orders và shipping

| Bảng | Cột đặc thù và kiểu |
|---|---|
| orders | order_number varchar(32) U; user_id FK?; cart_id FK?; quote_id FK U; contact_snapshot JSONB; address_snapshot JSONB; order_status; payment_status; fulfillment_status; payment_method; currency; subtotal_vnd; discount_vnd; shipping_vnd; total_vnd; coupon_snapshot JSONB?; note?; expires_at?; confirmed_at?; completed_at?; replacement_of_id FK orders?; version |
| order_items | order_id FK; edition_id FK; sku_snapshot; title_snapshot; edition_snapshot JSONB; unit_price_vnd; discount_vnd; quantity |
| order_events | order_id FK; event_type; visibility internal/customer; actor_id FK?; payload JSONB; request_id? |
| order_notes | order_id FK; actor_id FK; note text |
| order_access_tokens | order_id FK; token_hash U; expires_at; revoked_at? |
| guest_access_challenges | order_id FK; challenge_hash U; otp_hash; attempts; expires_at; used_at? |
| shipments | order_id FK; carrier; tracking_code?; status draft/shipped/delivered/returned/cancelled; source manual/provider; shipped_at?; delivered_at?; version |
| shipment_items | shipment_id FK; order_item_id FK; quantity; PK(shipment_id, order_item_id) |
| shipment_events | shipment_id FK; event_type; occurred_at; source; external_event_id?; payload JSONB |

Order total = subtotal − discount + shipping; mọi amount không âm và discount <= subtotal. Item discount là tổng giảm của dòng, không phải giảm mỗi cuốn; tổng discount dòng = discount order. Phân bổ giảm theo tỷ lệ giá trị dòng, làm tròn đồng và phân bổ phần dư theo thứ tự ổn định. Subtotal = SUM(unit_price × quantity). Nghiệp vụ kiểm tra dưới transaction.

Shipment item phải thuộc cùng order với shipment. Tổng quantity đã xuất không vượt order item quantity. Đơn guest lưu contact/address snapshot và token riêng; không cần tạo user. Hủy/ẩn danh khách không cascade xóa lịch sử tài chính.

### 15.7 Payment và coupon

| Bảng | Cột đặc thù và kiểu |
|---|---|
| payment_attempts | order_id FK; provider cod/manual_bank/gateway; merchant_reference U; provider_transaction_id?; amount_vnd; status pending/review/paid/failed/expired; payment_instructions_snapshot JSONB?; version |
| payment_receipts | payment_attempt_id FK; provider; external_reference; amount_vnd; received_at; evidence_asset_id FK?; actor_id FK?; U(provider, external_reference) |
| payment_review_requests | payment_attempt_id FK; note?; status pending/processed; requested_by FK users? |
| refunds | payment_attempt_id FK; merchant_reference U; amount_vnd; status; reason; provider_reference?; evidence_asset_id FK?; actor_id FK; completed_at? |
| webhook_events | provider; event_id; payload JSONB; processing_status; received_at; processed_at?; U(provider, event_id) |
| coupons | code varchar(40) U; type percent/fixed; value integer; max_discount_vnd?; min_subtotal_vnd; starts_at; ends_at; max_uses integer?; per_user_limit integer?; active; version |
| coupon_categories / coupon_editions | coupon_id FK; target_id FK; composite PK |
| coupon_reservations | coupon_id FK; order_id FK U; user_id FK?; status held/converted/released; expires_at? |
| coupon_redemptions | coupon_id FK; order_id FK U; user_id FK?; discount_vnd; status active/reversed |

Chỉ một payment attempt có thể chờ xử lý tại một thời điểm/order trong MVP. Tiền nhận có thể có nhiều receipt nhưng không ghi nhận trùng; UI thiếu/thừa tiền chuyển review. Refund pending và succeeded phải được tính khi kiểm tra số còn hoàn. Coupon code chuẩn hóa uppercase ASCII, quota và thời gian kiểm tra trên server dưới transaction. Percent 1–100; max_uses và per_user_limit > 0 nếu có.

### 15.8 Hạ tầng nghiệp vụ

| Bảng | Cột đặc thù và kiểu |
|---|---|
| idempotency_keys | principal_scope; endpoint; key; request_hash; status processing/completed; response_code?; response_body JSONB?; expires_at; U(principal_scope, endpoint, key) |
| outbox_events | aggregate_type; aggregate_id; event_type; payload JSONB; status pending/processing/completed/failed; attempts; next_attempt_at; locked_until? |
| job_attempts | outbox_event_id FK; attempt_no; started_at; finished_at?; error_code? |
| audit_logs | actor_id FK?; action; entity_type; entity_id; before_data JSONB?; after_data JSONB?; reason?; request_id; created_at |

Worker đọc outbox theo lease, retry exponential backoff, có màn/công cụ vận hành để requeue event failed. Gửi email và dịch vụ ngoài có thể lặp nếu crash ở ranh giới; cần dedup provider hoặc operation key phù hợp. Không tuyên bố exactly-once cho dịch vụ ngoài.

### 15.9 Index và quan hệ cần ưu tiên

Index mọi FK dùng truy vấn/join. Composite index orders(user_id, created_at DESC), orders(order_status, created_at DESC), orders(payment_status, created_at DESC), reservations(status, expires_at), payment_attempts(order_id, created_at DESC), outbox(status, next_attempt_at), audit(entity_type, entity_id, created_at DESC). Catalog có index status và published_at khi cần; search_text dùng GIN trigram; migration extension phải được môi trường hỗ trợ.

Quan hệ chính: book 1–N edition; book N–N author/category; edition N–N warehouse qua balance; order 1–N item/payment attempt/shipment; order item 1–N reservation; payment attempt 1–N receipt/refund; user N–N role; role N–N permission. Inventory, payment và order là dữ liệu nghiệp vụ, không cho CMS chỉnh như CRUD thông thường.

## 16 Hợp đồng API và quyền chung

Base `/api/v1`; routes trong module bỏ prefix này cho dễ đọc. Response `{data, meta}`; lỗi `{error: {code, message, field_errors, request_id}}`. Thời gian ISO 8601 UTC; amount chuỗi số nguyên VND. Pagination `{next_cursor, has_more}`. API danh sách giới hạn 100 records/request; sort whitelist; q có giới hạn độ dài. OpenAPI sinh client cho hai frontend.

Catalog public chỉ trả published/active và DTO được whitelist. Endpoint admin kiểm tra permission và session audience. Server không nhận subtotal/total/status từ khách như dữ liệu có thẩm quyền. PATCH admin nhận expectedVersion; mismatch trả 409. Mutation tài chính/kho/đơn dùng Idempotency-Key và transaction. Cùng key khác payload trả 409; key của người khác không dùng chung.

| Nhóm quyền | Permission ví dụ |
|---|---|
| Catalog | catalog.read, catalog.write, catalog.publish |
| Media | media.read, media.upload, media.delete |
| Inventory | inventory.read, inventory.adjust |
| Orders | orders.read, orders.confirm, orders.cancel, orders.export |
| Shipping | shipping.create, shipping.dispatch, shipping.update |
| Finance | payments.read, payments.reconcile, payments.refund |
| Content | content.read, content.write, content.publish |
| Promotions | coupons.read, coupons.write |
| Administration | staff.manage, roles.manage, settings.manage, audit.read |

Owner có toàn bộ quyền quản trị nhưng vẫn chịu các invariant như không tồn âm, không hoàn quá số tiền, không xóa lịch sử. Rate limit áp dụng login/reset/OTP/checkout và upload. CSRF/Origin validation cho cookie mutation; private pages/API không cache public.

## 17 State machine và tình huống cần design

| Aggregate | Chuyển trạng thái hợp lệ ở MVP |
|---|---|
| Book | draft → published → archived; chỉnh sách đã published vẫn phải validate |
| Order | pending → confirmed → completed; pending/confirmed → cancelled khi chưa dispatch |
| Fulfillment | unfulfilled → processing → shipped → delivered; shipped/delivered → returned theo quy trình nhận lại |
| Payment | unpaid → paid → partially_refunded → refunded; partial payment giữ review và chưa paid |
| Reservation | active → consumed khi dispatch; active → released khi hủy/hết hạn |
| Refund | requested → processing → succeeded/failed; requested → cancelled |

Completed khi giao hàng thành công và nghĩa vụ thu tiền đã được đối soát. Hàng trả hoặc refund cập nhật trạng thái riêng và timeline; không xóa sự kiện completed đã xảy ra. Cancelled order có thể còn payment_status paid trong thời gian chờ hoàn tiền. Order pending có thể payment_status paid trước khi nhân viên xác nhận. UI luôn thể hiện ba trạng thái độc lập.

Các màn bắt buộc design edge case: sách hết hàng; phiên bản ngừng bán; giá thay đổi; coupon hết quota; phí ship đổi; đơn timeout nhưng đã tạo; chuyển khoản sau hết hạn; thiếu/thừa tiền; COD đã giao chưa thu; cancel chờ refund; thiếu quyền; token guest hết hạn; form conflict; upload lỗi; danh sách rỗng.

## 18 Kế hoạch từng gói code và nghiệm thu

| Gói | Màn hình và dữ liệu | Điều kiện hoàn thành |
|---|---|---|
| 01 Foundation | SYS-01, repo, runtime, CI, DB connection | Build/typecheck; shell responsive; .env.example; không commit secret |
| 02 Identity | AUTH, ADM-USER; user/session/RBAC/MFA | Login và quyền server; MFA không bypass; khóa/thu hồi session |
| 03 Catalog | ADM-META/MEDIA/BOOK; catalog tables | Tạo sách nhiều phiên bản, upload an toàn, publish và archive |
| 04 Storefront | SHOP; catalog read APIs | Tìm có/không dấu, filter, SEO, chọn edition, hết hàng |
| 05 Inventory | ADM-STOCK; balance/reservation/movement | Không tồn âm; adjustment nguyên tử; audit và concurrency test |
| 06 Checkout | CART/CHECKOUT; quotes/orders/outbox | COD và chuyển khoản; idempotency; tranh hàng cuối/coupon quota |
| 07 Fulfillment | ADM-ORDER/SHIP/PAY | Xác nhận, xuất kho một lần, nhận tiền, hủy, hoàn tiền |
| 08 Customer | ACCOUNT và guest access | Scope đơn đúng; OTP/token; address snapshot; không lộ PII |
| 09 Content | CONTENT/COUPON/SET | Publish/schedule; cấu hình validated; coupon và policy revisions |
| 10 Operations | DASH/AUDIT, monitoring, deploy | Metric đúng; E2E; load test; backup restore; rollback |

Audit infrastructure bắt đầu ở gói 02; UI audit ở gói 10. Coupon tối thiểu nếu bật ở checkout phải làm cùng gói 06; nếu chưa làm thì ẩn trường coupon và triển khai đầy đủ ở gói 09. Không để stub API trả thành công giả cho nghiệp vụ chưa có.

### Checklist bàn giao mỗi màn hình

- Design desktop/mobile và các trạng thái cần thiết.
- Mã màn hình khớp tài liệu; field/UI khớp API và data dictionary.
- Migration có FK, CHECK, unique, index và review tác động dữ liệu.
- Permission, ownership, validation và error codes được kiểm thử.
- Luồng chính chạy với DB thật; dữ liệu mẫu được ghi rõ là seed.
- Kiểm tra thao tác lặp, lỗi mạng, trạng thái lỗi và keyboard access.
- Chứng minh không ghi đè dữ liệu giao dịch cũ hoặc lộ dữ liệu người khác.
- Chạy checks phù hợp và ghi cách nghiệm thu trong PR.

### Checklist trước mở bán

Chốt phí ship, giữ hàng, ngân hàng, policy và địa chỉ liên hệ. Thiết lập staging/production tách dữ liệu và secret. Kiểm thử đặt hàng đồng thời, webhook/reconcile trùng, hết hạn đua với thanh toán, dispatch lặp và hoàn tiền song song. Cấu hình backup/PITR, thử restore, cảnh báo job/payment lỗi và quy trình hỗ trợ. Chỉ phát hành khi luồng mua đến xử lý đơn hoàn chỉnh hoạt động với dữ liệu thật được kiểm soát.

## 19 Điểm bắt đầu design

Design SYS-01 trước để chốt component, sau đó ADM-BOOK-01 và ADM-BOOK-02 để chốt cấu trúc catalog. Tiếp theo SHOP-02 và SHOP-03 để kiểm tra dữ liệu CMS có đủ phục vụ bán hàng. Khi bốn màn này ổn, làm ADM-STOCK-01, CART-01 và CHECKOUT-01 để hoàn thiện luồng mua. Trang chủ có thể design song song nhưng không phải điều kiện để chốt DB nghiệp vụ.

Tài liệu này là nguồn thống nhất cho design và code. Mọi thay đổi về field, trạng thái, giá/kho/quyền cần cập nhật cùng mã màn hình và schema trước khi triển khai, để UI và DB không phát triển lệch nhau.
