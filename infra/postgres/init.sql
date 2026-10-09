-- Init script chạy một lần khi container postgres khởi tạo lần đầu.
-- Bật extension cần thiết theo đặc tả section 15.9.

-- pg_trgm cho full-text search tiếng Việt (search_text dùng GIN trigram)
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- uuid-ossp (dự phòng nếu dùng gen_random_uuid() trong trigger)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
