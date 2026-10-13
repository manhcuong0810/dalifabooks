-- Xóa các danh mục trùng theo cây cha + slug, giữ bản ghi đầu tiên.
WITH ranked AS (
  SELECT
    id,
    ROW_NUMBER() OVER (
      PARTITION BY "parent_id", "slug"
      ORDER BY "created_at" ASC, "id" ASC
    ) AS row_num
  FROM "categories"
)
DELETE FROM "categories"
WHERE id IN (
  SELECT id FROM ranked WHERE row_num > 1
);

-- Bỏ index duy nhất cũ theo slug toàn site.
DROP INDEX IF EXISTS "categories_slug_key";

-- Đảm bảo slug chỉ duy nhất trong cùng một nhánh danh mục.
CREATE UNIQUE INDEX "categories_parent_id_slug_key"
ON "categories"("parent_id", "slug");
