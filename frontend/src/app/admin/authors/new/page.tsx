"use client";

import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { adminFetch } from "@/lib/api";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";

type AuthorRecord = {
  id: string;
  name: string;
  slug: string;
  role?: string;
  country?: string;
  years?: string;
  pen_name?: string;
  biography?: string;
  featured_title?: string;
  featured_subtitle?: string;
  avatar_url?: string;
  is_verified?: boolean;
  status?: "active" | "archived";
};

const roleOptions = [
  { value: "author", label: "Tác giả / Sử gia", icon: "history_edu" },
  { value: "translator", label: "Dịch giả học thuật", icon: "translate" },
  { value: "editor", label: "Chủ biên", icon: "auto_stories" },
  { value: "reviewer", label: "Hiệu đính / Cố vấn", icon: "verified" },
  { value: "co-author", label: "Đồng tác giả", icon: "groups" },
];

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

export default function AdminAuthorCreatePage() {
  return (
    <Suspense
      fallback={
        <AdminPageShell activePath="/admin/authors">
          <div className="rounded-xl bg-surface-card p-8 text-center text-text-muted shadow-sm">Đang tải form hồ sơ...</div>
        </AdminPageShell>
      }
    >
      <AdminAuthorCreatePageContent />
    </Suspense>
  );
}

function AdminAuthorCreatePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const authorId = searchParams.get("id");

  const [form, setForm] = useState({
    fullName: "",
    penName: "",
    slug: "",
    role: "author",
    country: "",
    years: "",
    biography: "",
    featuredTitle: "",
    featuredSubtitle: "",
    avatarUrl: "",
    isVerified: true,
    position: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!authorId) return;

    const loadAuthor = async () => {
      try {
        const data = (await adminFetch<AuthorRecord[]>("/authors")) ?? [];
        const match = data.find((item) => item.id === authorId);
        if (!match) return;

        setForm({
          fullName: match.name ?? "",
          penName: match.pen_name ?? match.name ?? "",
          slug: match.slug ?? "",
          role: match.role ?? "author",
          country: match.country ?? "",
          years: match.years ?? "",
          biography: match.biography ?? "",
          featuredTitle: match.featured_title ?? "",
          featuredSubtitle: match.featured_subtitle ?? "",
          avatarUrl: match.avatar_url ?? "",
          isVerified: Boolean(match.is_verified),
          position: 0,
        });
      } catch (error) {
        console.error(error);
      }
    };

    loadAuthor();
  }, [authorId]);

  const wordCount = useMemo(() => {
    const plainText = (form.biography || "")
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    return plainText ? plainText.split(/\s+/).length : 0;
  }, [form.biography]);

  const updateField = <K extends keyof typeof form>(field: K, value: (typeof form)[K]) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleAvatarFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Vui lòng chọn một file ảnh hợp lệ.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        updateField("avatarUrl", reader.result);
      }
      event.target.value = "";
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    const payload = {
      name: form.fullName.trim(),
      pen_name: form.penName.trim() || form.fullName.trim(),
      slug: form.slug.trim() || slugify(form.fullName),
      role: form.role,
      country: form.country.trim(),
      years: form.years.trim(),
      biography: form.biography.trim(),
      featured_title: form.featuredTitle.trim(),
      featured_subtitle: form.featuredSubtitle.trim(),
      avatar_url: form.avatarUrl.trim(),
      is_verified: form.isVerified,
      position: Number(form.position || 0),
      status: "active",
    };

    try {
      if (authorId) {
        await adminFetch(`/authors/${authorId}`, {
          method: "PATCH",
          body: JSON.stringify(payload),
        });
      } else {
        await adminFetch("/authors", {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }

      router.push("/admin/authors");
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Có lỗi xảy ra khi lưu hồ sơ.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminPageShell activePath="/admin/authors">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col justify-between gap-4 pb-2 md:flex-row md:items-center">
          <div className="space-y-1.5 min-w-0">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-text-muted">
              <Link href="/admin/books" className="transition-colors hover:text-primary">Quản lý Sách</Link>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <Link href="/admin/authors" className="transition-colors hover:text-primary">Tác giả &amp; Dịch giả</Link>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="font-semibold text-primary">{authorId ? "Chỉnh sửa hồ sơ" : "Thêm hồ sơ mới"}</span>
            </nav>

            <h1 className="text-headline-lg font-headline-lg tracking-tight text-text-primary">
              {authorId ? "Chỉnh sửa hồ sơ" : "Thêm Tác giả & Dịch giả Mới"}
            </h1>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <Link href="/admin/authors" className="rounded-lg bg-surface-card px-4 py-2 text-label-md font-label-md text-text-secondary shadow-sm transition-colors hover:bg-surface-subtle">
              Hủy bỏ
            </Link>
            <button type="submit" className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-label-md font-label-md text-on-primary shadow-md transition-all hover:bg-primary-container">
              <span className="material-symbols-outlined text-[18px]">person_add</span>
              <span>{isLoading ? "Đang lưu..." : authorId ? "Lưu hồ sơ" : "Lưu hồ sơ nhân sự"}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-8">
            <section className="space-y-6 rounded-xl bg-surface-card p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-surface-subtle pb-2">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-container text-primary">
                    <span className="material-symbols-outlined text-[18px]">badge</span>
                  </span>
                  <div>
                    <h2 className="text-headline-sm font-headline-sm text-text-primary">Định danh &amp; Vai trò Học thuật</h2>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="block text-label-md font-label-md font-semibold text-text-primary">Họ và tên đầy đủ <span className="text-error">*</span></label>
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={(event) => {
                      const nextValue = event.target.value;
                      const generated = slugify(nextValue);
                      setForm((current) => ({
                        ...current,
                        fullName: nextValue,
                        slug: current.slug === "" || current.slug === slugify(current.fullName) ? generated : current.slug,
                      }));
                    }}
                    placeholder="Ví dụ: William James Durant"
                    className="h-11 w-full rounded-lg bg-surface-card px-3.5 text-body-md text-text-primary shadow-sm outline-none placeholder:text-text-muted focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-label-md font-label-md font-semibold text-text-primary">Bút danh / Tên thường gọi</label>
                  <input
                    type="text"
                    value={form.penName}
                    onChange={(event) => updateField("penName", event.target.value)}
                    placeholder="Ví dụ: Will Durant"
                    className="h-11 w-full rounded-lg bg-surface-card px-3.5 text-body-md text-text-primary shadow-sm outline-none placeholder:text-text-muted focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-label-md font-label-md font-semibold text-text-primary">Đường dẫn tĩnh (Slug URL) <span className="text-error">*</span></label>
                  <button
                    type="button"
                    onClick={() => updateField("slug", slugify(form.fullName))}
                    className="text-label-sm font-label-sm text-status-sky-text hover:underline"
                  >
                    Tạo lại từ tên
                  </button>
                </div>
                <div className="flex overflow-hidden rounded-lg bg-surface-subtle shadow-sm focus-within:ring-2 focus-within:ring-primary">
                  <span className="inline-flex shrink-0 items-center bg-surface-container px-3.5 text-label-sm font-label-sm text-text-muted">dalifabooks.vn/author/</span>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(event) => updateField("slug", event.target.value)}
                    className="h-11 w-full bg-transparent px-3 text-body-md text-text-primary outline-none"
                    placeholder="will-durant"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-label-md font-label-md font-semibold text-text-primary">Vai trò học thuật chính <span className="text-error">*</span></label>
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-5">
                  {roleOptions.map((option) => {
                    const isActive = option.value === form.role;
                    return (
                      <label key={option.value} className={`flex cursor-pointer flex-col items-center justify-center rounded-lg p-3 text-center transition-all ${isActive ? "bg-primary text-on-primary shadow-sm" : "bg-surface-subtle text-text-secondary hover:bg-surface-container"}`}>
                        <input type="radio" name="role" value={option.value} checked={isActive} onChange={() => updateField("role", option.value)} className="sr-only" />
                        <span className="material-symbols-outlined mb-1 text-[20px]">{option.icon}</span>
                        <span className="text-label-sm font-label-sm font-semibold">{option.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="block text-label-md font-label-md font-semibold text-text-primary">Quốc tịch / Xuất thân</label>
                  <input
                    type="text"
                    value={form.country}
                    onChange={(event) => updateField("country", event.target.value)}
                    className="h-11 w-full rounded-lg bg-surface-card px-3.5 text-body-md text-text-primary shadow-sm outline-none placeholder:text-text-muted focus:ring-2 focus:ring-primary"
                    placeholder="Ví dụ: Hoa Kỳ"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-label-md font-label-md font-semibold text-text-primary">Niên đại / Năm sinh - năm mất</label>
                  <input
                    type="text"
                    value={form.years}
                    onChange={(event) => updateField("years", event.target.value)}
                    className="h-11 w-full rounded-lg bg-surface-card px-3.5 text-body-md text-text-primary shadow-sm outline-none placeholder:text-text-muted focus:ring-2 focus:ring-primary"
                    placeholder="Ví dụ: 1885 – 1981"
                  />
                </div>
              </div>
            </section>

            <section className="space-y-6 rounded-xl bg-surface-card p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-surface-subtle pb-2">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-container text-primary"><span className="material-symbols-outlined text-[18px]">description</span></span>
                  <div>
                    <h2 className="text-headline-sm font-headline-sm text-text-primary">Tiểu sử tóm tắt</h2>
                  </div>
                </div>
                <span className="text-label-sm font-label-sm text-text-muted">Số từ: {wordCount}</span>
              </div>

              <div className="space-y-1.5">
                <label className="block text-label-md font-label-md font-semibold text-text-primary">Nội dung tiểu sử</label>
                <textarea
                  rows={6}
                  value={form.biography}
                  onChange={(event) => updateField("biography", event.target.value)}
                  placeholder="Nhập tiểu sử ngắn, thông tin nổi bật, vai trò và dấu ấn..."
                  className="w-full rounded-lg bg-surface-card px-3.5 py-3 text-body-md text-text-primary shadow-sm outline-none placeholder:text-text-muted focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="block text-label-md font-label-md font-semibold text-text-primary">Tác phẩm tiêu biểu</label>
                  <input
                    type="text"
                    value={form.featuredTitle}
                    onChange={(event) => updateField("featuredTitle", event.target.value)}
                    className="h-11 w-full rounded-lg bg-surface-card px-3.5 text-body-md text-text-primary shadow-sm outline-none placeholder:text-text-muted focus:ring-2 focus:ring-primary"
                    placeholder="Ví dụ: Lịch sử văn minh"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-label-md font-label-md font-semibold text-text-primary">Mô tả ngắn</label>
                  <input
                    type="text"
                    value={form.featuredSubtitle}
                    onChange={(event) => updateField("featuredSubtitle", event.target.value)}
                    className="h-11 w-full rounded-lg bg-surface-card px-3.5 text-body-md text-text-primary shadow-sm outline-none placeholder:text-text-muted focus:ring-2 focus:ring-primary"
                    placeholder="Ví dụ: Bộ sách nền tảng triết học"
                  />
                </div>
              </div>
            </section>
          </div>

          <div className="flex flex-col gap-6 lg:col-span-4">
            <section className="space-y-5 rounded-xl bg-surface-card p-6 shadow-sm">
              <div className="flex items-center gap-2 border-b border-surface-subtle pb-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-container text-primary"><span className="material-symbols-outlined text-[18px]">face</span></span>
                <div>
                  <h3 className="text-headline-sm font-headline-sm text-text-primary">Ảnh chân dung</h3>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex h-36 w-36 items-center justify-center overflow-hidden rounded-2xl bg-surface-subtle shadow-md">
                  <img
                    src={form.avatarUrl || "https://placehold.co/160x160/f3f4f6/64748b?text=Avatar"}
                    alt={form.fullName || "Avatar"}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-label-md font-label-md font-semibold text-text-primary">Ảnh chân dung</label>
                  <input
                    id="author-avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarFileChange}
                    className="hidden"
                  />
                  <div className="flex gap-2">
                    <label
                      htmlFor="author-avatar-upload"
                      className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-primary px-3.5 py-2 text-label-md font-label-md text-on-primary shadow-sm transition-colors hover:bg-primary-container"
                    >
                      Tải ảnh lên
                    </label>
                    {form.avatarUrl && (
                      <button
                        type="button"
                        onClick={() => updateField("avatarUrl", "")}
                        className="rounded-lg bg-surface-subtle px-3.5 py-2 text-label-md font-label-md text-text-secondary transition-colors hover:bg-surface-container"
                      >
                        Xóa ảnh
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-label-md font-label-md font-semibold text-text-primary">Hoặc nhập URL ảnh</label>
                  <input
                    type="url"
                    value={form.avatarUrl}
                    onChange={(event) => updateField("avatarUrl", event.target.value)}
                    className="h-11 w-full rounded-lg bg-surface-card px-3.5 text-body-md text-text-primary shadow-sm outline-none placeholder:text-text-muted focus:ring-2 focus:ring-primary"
                    placeholder="https://..."
                  />
                </div>
              </div>
            </section>

            <section className="space-y-4 rounded-xl bg-surface-card p-6 shadow-sm">
              <div className="flex items-center gap-2 border-b border-surface-subtle pb-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-container text-primary"><span className="material-symbols-outlined text-[18px]">settings</span></span>
                <div>
                  <h3 className="text-headline-sm font-headline-sm text-text-primary">Trạng thái hiển thị</h3>
                </div>
              </div>

              <label className="flex items-center justify-between gap-3 rounded-lg bg-surface-subtle p-3">
                <div>
                  <p className="text-label-md font-label-md font-semibold text-text-primary">Xác thực hồ sơ</p>
                  <p className="text-body-sm text-text-muted">Hiển thị trạng thái xác thực trên storefront.</p>
                </div>
                <input type="checkbox" checked={form.isVerified} onChange={(event) => updateField("isVerified", event.target.checked)} className="h-5 w-5" />
              </label>

              <div className="space-y-1.5">
                <label className="block text-label-md font-label-md font-semibold text-text-primary">Thứ tự ưu tiên</label>
                <input
                  type="number"
                  value={form.position}
                  onChange={(event) => updateField("position", Number(event.target.value || 0))}
                  className="h-11 w-full rounded-lg bg-surface-card px-3.5 text-body-md text-text-primary shadow-sm outline-none focus:ring-2 focus:ring-primary"
                  min={0}
                />
              </div>
            </section>
          </div>
        </div>
      </form>
    </AdminPageShell>
  );
}
