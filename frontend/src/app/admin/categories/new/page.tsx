"use client";

import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { adminFetch } from "@/lib/api";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

type CategoryNode = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  parent_id?: string | null;
  position: number;
  active: boolean;
  children?: CategoryNode[];
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, " ")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function AdminAddCategoryPage() {
  return (
    <Suspense
      fallback={
        <AdminPageShell activePath="/admin/categories">
          <div className="rounded-xl bg-surface-card p-8 text-center text-text-muted shadow-sm">Đang tải form danh mục...</div>
        </AdminPageShell>
      }
    >
      <AdminAddCategoryPageContent />
    </Suspense>
  );
}

function AdminAddCategoryPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("id");
  const parentIdParam = searchParams.get("parentId");

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [parentId, setParentId] = useState("");
  const [position, setPosition] = useState(0);
  const [active, setActive] = useState(true);
  const [parentOptions, setParentOptions] = useState<CategoryNode[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      const data = await adminFetch<CategoryNode[]>("/categories");
      const filtered = (data ?? []).filter((item) => item.id !== categoryId);
      setParentOptions(filtered);

      if (parentIdParam && !categoryId) {
        setParentId(parentIdParam);
      }
    };

    loadCategories();
  }, [categoryId, parentIdParam]);

  useEffect(() => {
    if (!categoryId) return;

    const loadCurrentCategory = async () => {
      const categories = await adminFetch<CategoryNode[]>("/categories");
      const flat = (categories ?? []).flatMap((item) => [item, ...(item.children ?? [])]);
      const match = flat.find((item) => item.id === categoryId);

      if (!match) return;

      setName(match.name);
      setSlug(match.slug);
      setDescription(match.description ?? "");
      setParentId(match.parent_id ?? "");
      setPosition(match.position ?? 0);
      setActive(match.active ?? true);
    };

    loadCurrentCategory();
  }, [categoryId]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const payload = {
        name,
        slug: slug || slugify(name),
        description,
        parent_id: parentId || null,
        position,
        active,
      };

      if (categoryId) {
        await adminFetch(`/categories/${categoryId}`, {
          method: "PATCH",
          body: JSON.stringify(payload),
        });
      } else {
        await adminFetch("/categories", {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }

      router.push("/admin/categories");
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Có lỗi xảy ra khi lưu danh mục.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminPageShell activePath="/admin/categories">
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 rounded-xl bg-surface-card p-6 shadow-sm md:flex-row md:items-center">
          <div className="space-y-1.5">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-body-sm text-text-muted">
              <Link href="/admin/books" className="transition-colors hover:text-primary">
                Quản lý Sách
              </Link>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <Link href="/admin/categories" className="transition-colors hover:text-primary">
                Danh mục Sách
              </Link>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="font-medium text-text-primary">{categoryId ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}</span>
            </nav>

            <div className="flex items-center gap-3">
              <h1 className="text-headline-lg font-headline-lg tracking-tight text-text-primary">
                {categoryId ? "Chỉnh sửa Danh mục" : "Thêm Danh mục Sách Mới"}
              </h1>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <Link href="/admin/categories" className="flex items-center gap-1.5 rounded-lg bg-surface-subtle px-4 py-2 text-label-md font-label-md text-text-secondary shadow-sm transition-colors hover:bg-surface-container hover:text-text-primary">
              <span className="material-symbols-outlined text-[18px]">close</span>
              <span>Hủy bỏ</span>
            </Link>
            <button type="submit" form="category-form" className="flex items-center gap-2 rounded-lg bg-primary-container px-5 py-2.5 text-label-md font-label-md text-on-primary shadow-md transition-all hover:bg-primary">
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              <span>{isLoading ? "Đang lưu..." : categoryId ? "Lưu thay đổi" : "Tạo danh mục"}</span>
            </button>
          </div>
        </div>

        <form id="category-form" onSubmit={handleSubmit} className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-8">
            <section className="space-y-6 rounded-xl bg-surface-card p-6 shadow-sm">
              <div className="flex items-center justify-between pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[22px] text-primary">category</span>
                  <h2 className="text-headline-sm font-headline-sm text-text-primary">Thông tin cơ bản</h2>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5">
                <div className="space-y-1.5">
                  <label htmlFor="category-name" className="block text-label-md font-label-md text-text-primary">
                    Tên danh mục <span className="font-bold text-error">*</span>
                  </label>
                  <input
                    id="category-name"
                    value={name}
                    onChange={(event) => {
                      const next = event.target.value;
                      const generated = slugify(next);

                      setName(next);
                      setSlug((current) => {
                        const shouldAutoSync = current === "" || current === slugify(name);
                        return shouldAutoSync ? generated : current;
                      });
                    }}
                    className="h-11 w-full rounded-lg bg-surface-subtle px-4 text-body-md text-text-primary placeholder:text-text-muted transition-all focus:bg-surface-card focus:outline-none"
                    placeholder="Ví dụ: Triết học & Tư tưởng phương Đông"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label htmlFor="category-slug" className="text-label-md font-label-md text-text-primary">
                      Đường dẫn tĩnh (Slug URL) <span className="font-bold text-error">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setSlug(slugify(name))}
                      className="flex items-center gap-1 text-label-sm font-label-sm text-status-sky-text transition-colors hover:underline"
                    >
                      <span className="material-symbols-outlined text-[14px]">sync</span>
                      <span>Tạo lại từ tên</span>
                    </button>
                  </div>

                  <div className="flex overflow-hidden rounded-lg bg-surface-subtle shadow-sm transition-all focus-within:bg-surface-card">
                    <span className="inline-flex shrink-0 items-center bg-surface-container-low px-3.5 text-body-sm text-text-muted">
                      dalifabooks.vn/category/
                    </span>
                    <input
                      id="category-slug"
                      value={slug}
                      onChange={(event) => setSlug(event.target.value)}
                      className="h-11 flex-1 bg-transparent px-3 text-body-md text-text-primary focus:outline-none"
                      placeholder="triet-hoc-va-tu-tuong"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <label htmlFor="parent-category" className="block text-label-md font-label-md text-text-primary">
                      Danh mục cấp cha
                    </label>
                    <select
                      id="parent-category"
                      value={parentId}
                      onChange={(event) => setParentId(event.target.value)}
                      className="h-11 w-full cursor-pointer rounded-lg bg-surface-subtle px-4 text-body-md text-text-primary focus:bg-surface-card focus:outline-none"
                    >
                      <option value="">-- Là danh mục gốc --</option>
                      {parentOptions.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="sort-order" className="block text-label-md font-label-md text-text-primary">
                      Thứ tự sắp xếp
                    </label>
                    <input
                      id="sort-order"
                      type="number"
                      min="0"
                      value={position}
                      onChange={(event) => setPosition(Number(event.target.value || 0))}
                      className="h-11 w-full rounded-lg bg-surface-subtle px-4 text-body-md text-text-primary focus:bg-surface-card focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="category-desc" className="text-label-md font-label-md text-text-primary">
                    Mô tả
                  </label>
                  <textarea
                    id="category-desc"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    rows={4}
                    className="w-full rounded-lg bg-surface-subtle px-4 py-3 text-body-md text-text-primary placeholder:text-text-muted transition-all focus:bg-surface-card focus:outline-none"
                    placeholder="Mô tả ngắn về danh mục..."
                  />
                </div>
              </div>
            </section>
          </div>

          <div className="flex flex-col gap-6 lg:col-span-4">
            <section className="space-y-5 rounded-xl bg-surface-card p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-headline-sm font-headline-sm text-text-primary">Trạng thái</h2>
              </div>

              <label className="flex cursor-pointer items-center justify-between gap-3 rounded-lg bg-surface-subtle p-3">
                <div>
                  <div className="font-semibold text-text-primary">Hiển thị trên storefront</div>
                  <div className="text-xs text-text-secondary">Bật để danh mục xuất hiện trên website.</div>
                </div>
                <input checked={active} onChange={(event) => setActive(event.target.checked)} type="checkbox" className="h-4 w-4 rounded text-primary accent-primary" />
              </label>
            </section>
          </div>
        </form>
      </div>
    </AdminPageShell>
  );
}

