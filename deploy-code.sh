#!/usr/bin/env bash
set -e

SERVER_USER="ubuntu"
SERVER_IP="149.118.33.176"
SSH_KEY="${SSH_KEY:-$HOME/.ssh/dalifabooks_oracle.key}"
REMOTE_DIR="/home/ubuntu/dalifabooks/DalifaBooks"

if [ ! -f "$SSH_KEY" ]; then
    echo "Lỗi: Không tìm thấy file SSH key tại $SSH_KEY"
    echo "Vui lòng xem hướng dẫn tạo file key trong DEPLOY.md mục 2."
    exit 1
fi

chmod 600 "$SSH_KEY"

echo "==> 1. Đang đồng bộ code lên server $SERVER_USER@$SERVER_IP (Giữ nguyên Database, .env và storage)..."
rsync -avz \
    --exclude='.env' \
    --exclude='storage/' \
    --exclude='public/storage/' \
    --exclude='node_modules/' \
    --exclude='.git/' \
    --exclude='.DS_Store' \
    -e "ssh -i $SSH_KEY -o StrictHostKeyChecking=no" \
    ./DalifaBooks/ "$SERVER_USER@$SERVER_IP:$REMOTE_DIR/"

echo "==> 2. Đang xoá cache Laravel và phân quyền thư mục storage..."
ssh -i "$SSH_KEY" -o StrictHostKeyChecking=no "$SERVER_USER@$SERVER_IP" "
    docker exec -u www-data dalifabooks_app php artisan view:clear &&
    docker exec -u www-data dalifabooks_app php artisan cache:clear &&
    docker exec dalifabooks_app chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache /var/www/html/public/storage &&
    docker exec dalifabooks_app chmod -R 777 /var/www/html/storage /var/www/html/bootstrap/cache /var/www/html/public/storage
"

echo "==> 3. Kiểm tra trạng thái HTTP của website..."
HTTP_CODE=$(ssh -i "$SSH_KEY" -o StrictHostKeyChecking=no "$SERVER_USER@$SERVER_IP" "curl -s -o /dev/null -w '%{http_code}' http://localhost/vi")
echo "HTTP Status: $HTTP_CODE"
echo "==> Deploy hoàn tất thành công!"
