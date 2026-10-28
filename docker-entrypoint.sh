#!/bin/bash
set -e

# Forward 127.0.0.1:3306 and localhost:3306 inside container to mariadb:3306
if command -v socat >/dev/null 2>&1; then
    socat TCP-LISTEN:3306,fork,reuseaddr TCP:mariadb:3306 &
fi

# Ensure storage, bootstrap/cache, and .env permissions
mkdir -p /var/www/html/storage/framework/cache/data \
         /var/www/html/storage/framework/sessions \
         /var/www/html/storage/framework/views \
         /var/www/html/storage/logs \
         /var/www/html/bootstrap/cache

chmod -R 777 /var/www/html/storage /var/www/html/public/storage /var/www/html/bootstrap/cache 2>/dev/null || true
chown -R www-data:www-data /var/www/html/storage /var/www/html/public/storage /var/www/html/bootstrap/cache 2>/dev/null || true
if [ -f /var/www/html/.env ]; then
    chmod 666 /var/www/html/.env 2>/dev/null || true
fi

exec "$@"
