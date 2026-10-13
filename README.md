# DalifaBooks

Nền tảng bán sách trực tuyến — monorepo Next.js + NestJS + PostgreSQL + Prisma.

---

## Cấu trúc dự án

```
dalifabooks/
├── frontend/      # Storefront (Next.js, port 3002) — khách hàng mua sách
├── cms/           # CMS (Next.js, port 3001) — nhân viên quản lý
├── backend/       # API (NestJS, port 4000) — /api/v1/...
├── db/            # Prisma schema + migrations + seed
├── shared/        # Types, constants, utils dùng chung
├── worker/        # Background jobs (outbox, reservation expiry, ...)
├── infra/         # Docker Compose, DB init scripts
└── .github/       # CI workflows
```

---

## Yêu cầu

- Node.js >= 20
- Yarn >= 1.22
- Docker + Docker Compose

---

## Khởi động development

### 1. Clone và cài dependencies

```bash
git clone <repo-url> dalifabooks
cd dalifabooks
cp .env.example .env          # điền các giá trị cần thiết
yarn install
```

### 2. Khởi động services (PostgreSQL, MinIO, Mailpit)

```bash
docker compose -f infra/docker-compose.yml up -d
```

| Service  | URL                         | Mục đích                  |
|----------|-----------------------------|---------------------------|
| Postgres | localhost:5432              | Database chính            |
| MinIO    | http://localhost:9000       | Object storage (ảnh/media)|
| MinIO UI | http://localhost:9001       | Quản lý bucket            |
| Mailpit  | http://localhost:8025       | Xem email dev             |

### 3. Migrate database và seed

```bash
yarn db:migrate          # chạy migrations
yarn db:generate         # generate Prisma client
yarn workspace @dalifabooks/db seed   # seed dữ liệu mẫu
```

### 4. Chạy các service

Mở 3 terminal riêng:

```bash
# Terminal 1 — Backend API
yarn dev:backend

# Terminal 2 — Storefront
yarn dev:frontend

# Terminal 3 — CMS
yarn dev:cms
```

Worker chạy riêng khi cần:

```bash
yarn dev:worker
```

---

## Ports

| Service   | Port |
|-----------|------|
| Storefront | 3002 |
| CMS        | 3001 |
| Backend    | 4000 |

---

## Các lệnh hay dùng

```bash
yarn db:studio          # Prisma Studio — xem/sửa DB trực quan
yarn db:migrate         # Tạo và chạy migration mới
yarn typecheck          # Kiểm tra TypeScript toàn monorepo
yarn lint               # Lint toàn monorepo
yarn build              # Build tất cả packages
```

---

## Kiến trúc tổng quan

```
Storefront (3002)  CMS (3001)
       │                │
       └────────┬───────┘
                ▼
         Backend API (4000)
          /api/v1/...
                │
         ┌──────┴──────┐
         ▼             ▼
     PostgreSQL     MinIO / S3
     (Prisma)       (media)
         │
         ▼
      Worker
   (background jobs)
```

**Backend** là single source of truth cho mọi nghiệp vụ. Frontend và CMS chỉ render và gọi API, không tự tính giá/tồn kho/permission.

---

## Packages

| Package | Mô tả |
|---------|-------|
| `@dalifabooks/frontend` | Storefront Next.js — SHOP-01/02/03, CART, CHECKOUT, ACCOUNT, AUTH |
| `@dalifabooks/cms` | CMS Next.js — toàn bộ màn hình ADM-* |
| `@dalifabooks/backend` | NestJS API — tất cả business logic và endpoints |
| `@dalifabooks/db` | Prisma schema, migrations, seed, PrismaClient singleton |
| `@dalifabooks/shared` | Types, DTOs, constants, utils, error classes dùng chung |
| `@dalifabooks/worker` | Background jobs: outbox, reservation/coupon expiry, scheduled posts |

---

## Modules Backend

| Module | Routes | Màn hình đặc tả |
|--------|--------|-----------------|
| Auth | `/auth/*` | AUTH-01/02/03 |
| Identity (CMS auth) | `/admin/auth/*` | AUTH-04 |
| Catalog | `/books`, `/admin/books`, `/categories`, ... | ADM-BOOK-01/02, ADM-META-01/02/03, SHOP-02/03 |
| Media | `/admin/media/*` | ADM-MEDIA-01 |
| Inventory | `/admin/inventory/*` | ADM-STOCK-01/02 |
| Cart | `/cart/*` | CART-01 |
| Checkout | `/checkout/quote`, `/orders` | CHECKOUT-01/02 |
| Orders | `/me/orders`, `/admin/orders/*` | ACCOUNT-02/03, ADM-ORDER-01/02 |
| Shipments | `/admin/shipments/*` | ADM-SHIP-01 |
| Payments | `/admin/payment-attempts/*` | ADM-PAY-01/02 |
| Promotions | `/admin/coupons/*` | ADM-COUPON-01/02 |
| Content | `/posts`, `/pages`, `/admin/posts`, `/admin/banners` | ADM-CONTENT-01/02/03, CONTENT-01/02 |
| Staff | `/admin/staff`, `/admin/roles` | ADM-USER-01/02 |
| Settings | `/admin/settings` | ADM-SET-01 |
| Audit | `/admin/audit-logs`, `/admin/dashboard` | ADM-AUDIT-01, ADM-DASH-01 |

---

## Database

Schema đầy đủ tại `db/prisma/schema.prisma`. Gồm các nhóm bảng:

- **Identity** — users, credentials, sessions, auth_tokens, MFA, RBAC
- **Catalog** — books, book_editions, authors, publishers, categories, media_assets
- **Cart & Quote** — carts, cart_items, checkout_quotes
- **Inventory** — warehouses, inventory_balances, inventory_reservations, stock_movements
- **Orders** — orders, order_items, order_events, shipments, shipment_items
- **Payments** — payment_attempts, payment_receipts, refunds, webhook_events
- **Promotions** — coupons, coupon_reservations, coupon_redemptions
- **Content** — posts, content_pages, banners, site_settings
- **Infrastructure** — idempotency_keys, outbox_events, audit_logs

---

## Worker Jobs

| Job | Mô tả | Interval |
|-----|-------|----------|
| `OutboxProcessor` | Xử lý outbox events (gửi email, webhook) theo lease + exponential backoff | 5s |
| `ReservationExpiry` | Giải phóng inventory reservation hết hạn | 5s |
| `CouponExpiry` | Giải phóng coupon hold hết hạn | 5s |
| `ScheduledPosts` | Xuất bản bài viết theo lịch hẹn | 5s |
| `CartExpiry` | Đánh dấu giỏ hàng hết hạn | 5s |

---

## Thứ tự implement (theo đặc tả section 18)

```
01 Foundation  →  02 Identity/RBAC  →  03 Catalog/Media
→  04 Storefront  →  05 Inventory  →  06 Checkout
→  07 Fulfillment  →  08 Customer  →  09 Content/Coupons
→  10 Operations
```

Mỗi module implement theo checklist:
1. Design Figma theo mã màn hình
2. Migration DB (FK, CHECK, unique, index)
3. Backend API + permission + validation
4. Frontend/CMS UI nối API
5. Nghiệm thu theo tiêu chí màn hình

---

## Biến môi trường

Xem `.env.example` — copy thành `.env` và điền trước khi chạy.

**Bắt buộc đổi trước production:**
- `JWT_SECRET`
- `SESSION_SECRET`
- `MFA_ENCRYPTION_KEY`
- `DATABASE_URL` (production database)
- `STORAGE_*` (S3/R2 production)

---

## Lưu ý bảo mật

- Không commit `.env` vào git
- Secret provider không lưu trong bảng `site_settings`, chỉ dùng secret manager
- MFA secret mã hóa AES-256-GCM trong DB
- Session CMS và storefront scope riêng biệt, không dùng lẫn nhau
- Mọi permission check phải ở API layer, không chỉ ẩn nút UI
