# DalifaBooks – Project Context Log

## 1. Tổng quan dự án

Dự án DalifaBooks là một monorepo Next.js đa package, gồm:
- frontend: storefront / website người dùng
- cms: admin CMS quản trị nội dung
- backend: API NestJS
- db: Prisma + PostgreSQL
- shared: model, constants, types dùng chung
- worker: nền tảng background jobs
- infra: docker compose và cấu hình môi trường

Mục tiêu hiện tại: hoàn thiện giao diện CMS/admin và chuẩn hóa độ nhất quán về layout, menu, route và slug URL.

---

## 2. Trạng thái hiện tại đã làm xong

### 2.1. Hệ thống CMS admin chung
- Đã dựng shell admin chung cho toàn bộ màn hình:
  - `frontend/src/components/admin/AdminPageShell.tsx`
  - `frontend/src/components/admin/AdminSidebar.tsx`
  - `frontend/src/components/admin/AdminTopbar.tsx`
- Mục tiêu: mọi màn hình admin dùng chung một layout, menu trái, topbar, khoảng cách, màu sắc và kiểu active item.
- Đã loại bỏ tình trạng drift layout khi điều hướng giữa các màn.

### 2.2. Route /admin và dashboard
- Đã tạo route admin chính và dashboard:
  - `frontend/src/app/admin/page.tsx`
  - `frontend/src/app/admin/dashboard/page.tsx`
- Đã có flow điều hướng từ màn login CMS đến dashboard.

### 2.3. Các màn admin đã dựng
- Audit log:
  - `frontend/src/app/admin/audit/page.tsx`
- Danh sách sách:
  - `frontend/src/app/admin/books/page.tsx`
- Thêm sách mới:
  - `frontend/src/app/admin/books/new/page.tsx`
- Tác giả & dịch giả:
  - `frontend/src/app/admin/authors/page.tsx`
- Thêm tác giả / dịch giả mới:
  - `frontend/src/app/admin/authors/new/page.tsx`
- Danh mục:
  - `frontend/src/app/admin/categories/page.tsx`
- Thêm danh mục:
  - `frontend/src/app/admin/categories/new/page.tsx`
- Nhà xuất bản:
  - `frontend/src/app/admin/publishers/page.tsx`
- Thêm nhà xuất bản mới:
  - `frontend/src/app/admin/publishers/new/page.tsx`

### 2.4. Chuẩn hóa UI / layout / menu
- Sidebar đã được đồng bộ tên menu, icon, thứ tự và trạng thái active.
- Header và shell admin đã dùng chung để tránh các màn khác nhau về kiểu khung.
- Đã đồng bộ kích thước logo, hình thức menu trái, màu sắc, padding và card.

### 2.5. Chuẩn hóa slug URL / đường dẫn tiếng Anh
- Đã sửa các prefix route theo chuẩn tiếng Anh, không dùng tiếng Việt:
  - `/category` thay cho `/danh-muc`
  - `/book` thay cho `/sach`
  - `/author` thay cho `/tac-gia`
  - `/publisher` thay cho `/nha-xuat-ban`
- Cần đảm bảo mọi route mới và mock đều theo chuẩn này.

### 2.6. Trình soạn thảo nội dung HTML
- Màn thêm tác giả mới đã hỗ trợ soạn thảo HTML rich text thay vì textarea thuần.
- Có chế độ chuyển đổi giữa view soạn thảo văn bản và view HTML source.
- Dành cho field “Nội dung tiểu sử tóm tắt”.

---

## 3. Kiến trúc và quy ước đang dùng

### 3.1. Admin shell
Tất cả màn hình admin nên dùng `AdminPageShell` để đảm bảo hiển thị đúng layout chuẩn.

Ví dụ:
- `AdminPageShell activePath="/admin/books"`
- `AdminPageShell activePath="/admin/categories"`
- `AdminPageShell activePath="/admin/publishers"`

### 3.2. Sidebar menu
Menu trái được định nghĩa trong:
- `frontend/src/components/admin/AdminSidebar.tsx`

Thứ tự và tên menu nên được giữ cố định để tránh chồng lấn visual giữa các page.

### 3.3. Route chuẩn admin
Các route đang ưu tiên theo định dạng:
- `/admin/dashboard`
- `/admin/audit`
- `/admin/books`
- `/admin/books/new`
- `/admin/categories`
- `/admin/categories/new`
- `/admin/authors`
- `/admin/authors/new`
- `/admin/publishers`
- `/admin/publishers/new`

### 3.4. Slug chuẩn storefront
- `dalifabooks.vn/category/`
- `dalifabooks.vn/book`
- `dalifabooks.vn/author/`
- `dalifabooks.vn/publisher/`

Lưu ý: route này cần được thống nhất trong cả UI, mock data và bất kỳ logic generate slug nào.

---

## 4. Một số điểm cần lưu ý cho người phát triển tiếp

### 4.1. Chưa kết nối dữ liệu thật
- Hầu hết các màn admin hiện tại là mock UI, chưa gắn API thực.
- Các form mới đang ở trạng thái UI demo / mock state, chưa có số liệu từ backend.

### 4.2. Backend chưa triển khai đầy đủ
- Dự án monorepo có backend NestJS và Prisma, nhưng phần phát triển UI admin đang ưu tiên frontend mock trước.
- Cần có bước tiếp theo: connect API layer và validation schema cho từng module.

### 4.3. Không dùng tiếng Việt trong slug / đường dẫn
- Các URL tĩnh và slug nên luôn viết bằng tiếng Anh, ASCII, lowercase, gạch nối.
- Tránh để lại path như `danh-muc`, `sach`, `tac-gia`, `nha-xuat-ban`.

### 4.4. Admin shell là chuẩn bắt buộc
- Khi làm màn mới, nên luôn dùng `AdminPageShell` và không tự tạo layout riêng lặp lại.
- Không thêm sidebar / topbar riêng trong page.

---

## 5. Các file quan trọng cần đọc tiếp

- `frontend/src/components/admin/AdminPageShell.tsx`
- `frontend/src/components/admin/AdminSidebar.tsx`
- `frontend/src/components/admin/AdminTopbar.tsx`
- `frontend/src/app/admin/dashboard/page.tsx`
- `frontend/src/app/admin/books/new/page.tsx`
- `frontend/src/app/admin/categories/new/page.tsx`
- `frontend/src/app/admin/authors/new/page.tsx`
- `frontend/src/app/admin/publishers/new/page.tsx`

---

## 6. Verification / kiểm tra đã chạy

Đã chạy lệnh typecheck sau khi sửa nhiều phần UI:

```bash
cd /Users/manhcuong/Documents/Work/dalifabooks && npm --prefix frontend run typecheck -- --pretty false
```

Kết quả: exit code 0, không có lỗi TypeScript.

---

## 7. Mục tiêu tiếp theo gợi ý

- Kết nối dữ liệu thật từ backend vào các module: books, authors, categories, publishers
- Thêm validation form và API payload chuẩn
- Tạo flow edit/update cho từng entity
- Tạo danh sách và detail page cho từng module theo cùng pattern admin shell
- Tiếp tục đồng bộ các màn còn lại nếu cần chốt bảng role / permissions / staff / settings

---

## 8. Tóm tắt ngắn gọn

Dự án đang ở trạng thái UI admin mock và layout chuẩn hóa đã hoàn thành cơ bản. Các màn chính phục vụ CMS đã được dựng theo cùng shell admin, route các module đã được đồng bộ, và slug URL đã được chuyển về tiếng Anh chuẩn. Điều quan trọng tiếp theo là kết nối backend và chuyển các mock state thành dữ liệu thật.
