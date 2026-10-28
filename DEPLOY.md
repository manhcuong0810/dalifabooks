# Hướng dẫn Deploy DalifaBooks (Server Oracle Cloud)

Tài liệu này tổng hợp toàn bộ thông tin máy chủ, khóa SSH, cấu trúc Docker và quy trình deploy **chỉ phần code (giữ nguyên Database & ảnh upload trên server)** để bất kỳ máy nào clone repo về đều có thể deploy được ngay.

---

## 1. Thông tin Máy chủ (Production Server)

| Hạng mục | Giá trị |
| :--- | :--- |
| **Nhà cung cấp** | Oracle Cloud |
| **IP Server** | `149.118.33.176` |
| **SSH User** | `ubuntu` |
| **SSH Port** | `22` |
| **Thư mục dự án trên Server** | `/home/ubuntu/dalifabooks` |
| **Thư mục mã nguồn Laravel** | `/home/ubuntu/dalifabooks/DalifaBooks` (mount vào `/var/www/html` trong container) |
| **Docker Container Web/PHP** | `dalifabooks_app` (PHP 8.2 + Apache, chạy dưới quyền `www-data`) |
| **Docker Container Database** | `dalifabooks_db` (MariaDB 10.11, volume `dalifabooks_mariadb_data`) |
| **Database Name / User / Pass** | `dalifabooks` / `dalifabooks` / `dalifabooks_password` (Root pass: `dalifabooks_root_password`) |

---

## 2. Thiết lập SSH Key trên máy mới

Trước khi deploy từ một máy tính mới, tạo file khóa SSH `~/.ssh/dalifabooks_oracle.key` với nội dung bên dưới:

```bash
cat << 'EOF' > ~/.ssh/dalifabooks_oracle.key
-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEA0UeJVFMDyL1QQ9Q5a0SvJeFrGYxbIEueo4um6YKgPFMquh3G
1nVeGQR8x5qUdxej25KDOBLC3WVavIr1R0OFrxS6pVuS7ed3B+z/wm4+0GfpMiTR
TqVKMsufQmK9Cg/Wm8XfR9tXwA63OwjjVJIg3oLewo5wJWz4t7SuRiD/PttND3pv
OAUVQsTQ4A31wtBYDedXdLcMPbfIwZncD4NqjosTStMTxq35PWflmhu377Ms5IHK
xoxkPIWQmQvs1vXDyY1yMsFYdX/CWb9pahQril4G4Xn5JZpSl5Svh4ioV0CPUZkA
+sFI1Ut3VryH0Ltng0TSDiA9BMa6HfLRae6/ZQIDAQABAoIBAAcaxMSPkuZ62CGN
WqupEmxt9CBTEvmMMk+pWy+8hwBf7xM6v+LM64uxis44kbIJ+T6S1pCN69PvRRQh
1YTR+9T/QPzXGIGqD3Dom0rNn6VHOclBgGIz8J+705AXNlqul0xaJyPTLu3usfVi
Q7FodTmIkNO4WSyev+zLSJ/0g9BtkBL1caZDYpL4HPfGko5YqH5aV+07rIy5JZ4G
Sq4LUMn2gcNL4jIC+SQyiD9JryQNCUQLxRLP1lxHHqF2XL90P9IBozTMk44XNnXJ
odqchktfNP1K3xS9KoKcpEjNaQWYHV4uIr6yS3eZBH6qm9OvItVqf6y3AlLoe03e
xkUUJdECgYEA7o7Bkv/pTNHn18gMS+AQC7+RfwqqgIe2QySLxHer+yKgDFnW1xPQ
1ZkI32HK08Ao7FNoOLStvCXGMrwYsHW5reue9HnEK0OJuYhf2NT0vNrME6xeT4Bo
8OyB4BRmQKup8GMU/npJRtkhv49HBrf/4nqO+t1rT6kMEab56jqrWR0CgYEA4JTC
r5HCW6UK7fH9+1KWs45jPMfB+Guwl5n1cdx1g978uJrXqqe4tB/pYH1mr2bFHBnZ
rTwgwrt3Dxd/75heyMNlFErNE7o5ecrSunUNiAzjM6TQSmW0y5KV5ngZH8X/y17M
n9CRiIb9iqIlnJoM6CMeJ9N7rZB9UsItYCxH9OkCgYBqxu8R8wXj4phZVytZ0uKb
v5VKPeXvPc9w4izFNaN+9xKYNKYbAr2YvbTg946nlP08OmEN8KFK88Vw9AxA/5Cq
riop107c5pAAwW/VSAx7c5uguqhEAX/3RoUjXT4feDbKaC7/cJDX61xVt7Xc5gLc
xmq1EuJzd4D1bb2y/6uuaQKBgHOyz9WpbwrNrSLGr8UhWDgq2989PiXgPPrtOzCs
lfIZF/N2+jKV86cAZbfrAtLMTDHc83K27l3EPGMPBT8HLZWabGGW464NG30uS3/5
u73ifc5mU1Rwr0LNQuKX7sGavNwl+5890SwX91jLjjrudkXFicyUvDu/m4DePog0
Z+G5AoGBANwk33/kc4yubgj6QxBzY8D3Wd2CUWfiR3MyGsbFWZFSe17ac6zf7WWH
e+yfCLnP+HsIxcBTbUqh7VcGM4gbIBbmGawGQjb+aL8kZSkK5MWvAatr7bZk0/Wl
LApuAfjDZzhpkKKaeW46NokAUSzBPamAXaoEh+0FwoLHTiqQAHGC
-----END RSA PRIVATE KEY-----
EOF

chmod 600 ~/.ssh/dalifabooks_oracle.key
```

Kiểm tra kết nối SSH:
```bash
ssh -i ~/.ssh/dalifabooks_oracle.key ubuntu@149.118.33.176
```

---

## 3. Quy trình Deploy Code chuẩn (Không ghi đè Database)

### Cách 1: Dùng script tự động `deploy-code.sh` (Khuyên dùng)

Trong thư mục gốc của repo đã có sẵn file `deploy-code.sh`. Chỉ cần chạy:

```bash
chmod +x deploy-code.sh
./deploy-code.sh
```

Script này sẽ:
1. Đồng bộ toàn bộ code trong thư mục `DalifaBooks/` lên `/home/ubuntu/dalifabooks/DalifaBooks/` trên server.
2. **Tự động loại trừ (không ghi đè)**:
   - File `.env` trên server
   - Thư mục `storage/` và `public/storage/` (chứa ảnh sản phẩm/banner đã upload trên server)
   - `node_modules/`
   - Database (`dalifabooks_db`)
3. Xoá cache giao diện & ứng dụng dưới quyền `www-data` và đảm bảo quyền thư mục `storage`.

---

### Cách 2: Chạy lệnh `rsync` thủ công

Nếu muốn chạy trực tiếp từ terminal tại thư mục gốc của dự án:

```bash
# 1. Đồng bộ code lên server (giữ nguyên .env và storage trên server)
rsync -avz --exclude='.env' \
           --exclude='storage/' \
           --exclude='public/storage/' \
           --exclude='node_modules/' \
           --exclude='.git/' \
           -e "ssh -i ~/.ssh/dalifabooks_oracle.key -o StrictHostKeyChecking=no" \
           ./DalifaBooks/ ubuntu@149.118.33.176:/home/ubuntu/dalifabooks/DalifaBooks/

# 2. Xoá cache Laravel với quyền www-data và đảm bảo phân quyền storage
ssh -i ~/.ssh/dalifabooks_oracle.key ubuntu@149.118.33.176 "
  docker exec -u www-data dalifabooks_app php artisan view:clear &&
  docker exec -u www-data dalifabooks_app php artisan cache:clear &&
  docker exec dalifabooks_app chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache /var/www/html/public/storage
"
```

---

## 4. Các lưu ý kỹ thuật quan trọng (Bắt buộc đọc khi sửa code)

1. **Không bao giờ ghi đè Database khi deploy tính năng mới:**
   - Mọi dữ liệu sản phẩm, đơn hàng, banner, cài đặt đang nằm trong container `dalifabooks_db` trên server. Chỉ deploy code PHP/Blade/JS/CSS.
2. **Luôn chạy `php artisan` với `-u www-data` (hoặc `chown` lại sau khi chạy):**
   - Nếu chạy `docker exec dalifabooks_app php artisan ...` bằng quyền `root` (mặc định của `docker exec`), các file cache mới tạo trong `storage/framework/cache` sẽ thuộc quyền `root`, gây lỗi `League\Flysystem\UnableToSetVisibility: Unable to set visibility for file cache`.
   - Cách đúng: luôn dùng `docker exec -u www-data dalifabooks_app php artisan ...` hoặc chạy kèm `docker exec dalifabooks_app chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache`.
3. **Không chạy `php artisan route:cache`:**
   - Hệ thống sử dụng `mcamara/laravel-localization` để định tuyến đa ngôn ngữ (`/vi`, `/en`), nên không dùng `route:cache`.
4. **Cấu hình Tỉnh/Thành phố & Phường/Xã Việt Nam:**
   - Danh sách 34 Tỉnh/Thành phố: `DalifaBooks/modules/Support/Resources/states/VN.php`
   - Danh sách 3.321 Phường/Xã/Đặc khu: `DalifaBooks/modules/Support/Resources/wards/VN.php`
   - Cấu hình trên Admin CMS: **Admin $\rightarrow$ Settings $\rightarrow$ General** (*Các quốc gia hỗ trợ*, *Quốc gia mặc định*, *Các Tỉnh/Thành phố hỗ trợ*) và **Admin $\rightarrow$ Storefront $\rightarrow$ General** (*Bật/tắt Mã bưu chính / ZIP*).
5. **Khi sửa file JavaScript / SCSS trong `modules/Storefront/Resources/assets/public/`:**
   - Hệ thống đọc đường dẫn file bundle từ `DalifaBooks/public/build/manifest.json`.
   - Sau khi sửa file nguồn (ví dụ `modules/Storefront/Resources/assets/public/js/pages/checkout/create/main.js`), cần build lại bằng Vite hoặc cập nhật file tương ứng trong `DalifaBooks/public/build/assets/` và đổi hậu tố phiên bản trong `DalifaBooks/public/build/manifest.json` để trình duyệt khách hàng tải bản JS mới nhất.

---

## 5. Các lệnh quản trị nhanh trên Server

- **Xem trạng thái các container Docker:**
  ```bash
  ssh -i ~/.ssh/dalifabooks_oracle.key ubuntu@149.118.33.176 "docker ps"
  ```
- **Xem log lỗi Laravel trên Server:**
  ```bash
  ssh -i ~/.ssh/dalifabooks_oracle.key ubuntu@149.118.33.176 "tail -n 100 /home/ubuntu/dalifabooks/DalifaBooks/storage/logs/laravel-*.log"
  ```
- **Backup Database từ Server về máy cá nhân:**
  ```bash
  ssh -i ~/.ssh/dalifabooks_oracle.key ubuntu@149.118.33.176 \
    "docker exec dalifabooks_db mariadb-dump -u root -pdalifabooks_root_password dalifabooks" > backup_dalifabooks_$(date +%F).sql
  ```
- **Khởi động lại Docker containers trên Server:**
  ```bash
  ssh -i ~/.ssh/dalifabooks_oracle.key ubuntu@149.118.33.176 "docker restart dalifabooks_db dalifabooks_app"
  ```
