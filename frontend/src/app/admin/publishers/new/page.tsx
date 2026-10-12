"use client";

import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { adminFetch } from "@/lib/api";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, FormEvent, Suspense, useEffect, useState } from "react";

type PublisherRecord = {
  id: string;
  name: string;
  slug: string;
  status?: "active" | "archived";
  short_name?: string;
  code?: string;
  rep_name?: string;
  email?: string;
  phone?: string;
  address?: string;
  region?: string;
  description?: string;
  logo_url?: string;
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, " ")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "") || "publisher";

const initialForm = {
  name: "",
  shortName: "",
  code: "",
  slug: "",
  repName: "",
  email: "",
  phone: "",
  address: "",
  region: "Hà Nội",
  description: "",
  logoUrl: "",
  status: "active",
};

export default function AdminPublisherCreatePage() {
  return (
    <Suspense
      fallback={
        <AdminPageShell activePath="/admin/publishers">
          <div className="rounded-xl bg-surface-card p-8 text-center text-text-muted shadow-sm">Đang tải form nhà xuất bản...</div>
        </AdminPageShell>
      }
    >
      <AdminPublisherCreatePageContent />
    </Suspense>
  );
}

function AdminPublisherCreatePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const publisherId = searchParams.get("id");
  const [form, setForm] = useState(initialForm);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!publisherId) return;

    const loadPublisher = async () => {
      try {
        const data = (await adminFetch<PublisherRecord[]>("/publishers")) ?? [];
        const match = data.find((item) => item.id === publisherId);
        if (!match) return;

        setForm({
          name: match.name ?? "",
          shortName: match.short_name ?? "",
          code: match.code ?? "",
          slug: match.slug ?? "",
          repName: match.rep_name ?? "",
          email: match.email ?? "",
          phone: match.phone ?? "",
          address: match.address ?? "",
          region: match.region ?? "Hà Nội",
          description: match.description ?? "",
          logoUrl: match.logo_url ?? "",
          status: match.status ?? "active",
        });
      } catch (error) {
        console.error(error);
      }
    };

    loadPublisher();
  }, [publisherId]);

  const updateField = <K extends keyof typeof initialForm>(field: K, value: (typeof initialForm)[K]) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleLogoUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Vui lòng chọn file ảnh hợp lệ.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        updateField("logoUrl", reader.result);
      }
      event.target.value = "";
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    const payload = {
      name: form.name.trim(),
      slug: form.slug.trim() || slugify(form.name),
      short_name: form.shortName.trim(),
      code: form.code.trim(),
      rep_name: form.repName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
      region: form.region.trim(),
      description: form.description.trim(),
      logo_url: form.logoUrl.trim(),
      status: form.status,
    };

    try {
      if (publisherId) {
        await adminFetch(`/publishers/${publisherId}`, {
          method: "PATCH",
          body: JSON.stringify(payload),
        });
      } else {
        await adminFetch("/publishers", {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }

      router.push("/admin/publishers");
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Có lỗi xảy ra khi lưu nhà xuất bản.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminPageShell activePath="/admin/publishers">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col justify-between gap-4 pb-2 md:flex-row md:items-center">
          <div className="space-y-1.5 min-w-0">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-text-muted">
              <Link href="/admin/books" className="transition-colors hover:text-primary">Quản lý Sách</Link>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <Link href="/admin/publishers" className="transition-colors hover:text-primary">Nhà xuất bản</Link>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="font-semibold text-primary">{publisherId ? "Chỉnh sửa" : "Thêm mới"}</span>
            </nav>

            <h1 className="text-headline-lg font-headline-lg tracking-tight text-text-primary">
              {publisherId ? "Chỉnh sửa nhà xuất bản" : "Thêm nhà xuất bản mới"}
            </h1>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <Link href="/admin/publishers" className="rounded-lg bg-surface-card px-4 py-2 text-label-md font-label-md text-text-secondary shadow-sm transition-colors hover:bg-surface-subtle">Hủy bỏ</Link>
            <button type="submit" className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-label-md font-label-md text-on-primary shadow-md transition-all hover:bg-primary-container">
              <span className="material-symbols-outlined text-[18px]">publish</span>
              <span>{isLoading ? "Đang lưu..." : publisherId ? "Lưu thay đổi" : "Lưu nhà xuất bản"}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-8">
            <section className="space-y-6 rounded-xl bg-surface-card p-6 shadow-sm">
              <div className="flex items-center gap-2.5 border-b border-surface-subtle pb-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-container text-primary"><span className="material-symbols-outlined text-[18px]">domain</span></span>
                <h2 className="text-headline-sm font-headline-sm text-text-primary">Thông tin cơ bản</h2>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="space-y-1.5 md:col-span-2">
                  <label className="block text-label-md font-label-md font-semibold text-text-primary">Tên nhà xuất bản <span className="text-error">*</span></label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(event) => {
                      const nextValue = event.target.value;
                      setForm((current) => ({
                        ...current,
                        name: nextValue,
                        slug: current.slug === "" || current.slug === slugify(current.name) ? slugify(nextValue) : current.slug,
                      }));
                    }}
                    className="h-11 w-full rounded-lg bg-surface-card px-3.5 text-body-md text-text-primary shadow-sm outline-none placeholder:text-text-muted focus:ring-2 focus:ring-primary"
                    placeholder="Ví dụ: Nhà xuất bản Tri Thức"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-label-md font-label-md font-semibold text-text-primary">Viết tắt</label>
                  <input type="text" value={form.shortName} onChange={(event) => updateField("shortName", event.target.value)} className="h-11 w-full rounded-lg bg-surface-card px-3.5 text-body-md text-text-primary shadow-sm outline-none placeholder:text-text-muted focus:ring-2 focus:ring-primary" placeholder="NXB Tri Thức" />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-label-md font-label-md font-semibold text-text-primary">Mã đối tác</label>
                  <input type="text" value={form.code} onChange={(event) => updateField("code", event.target.value)} className="h-11 w-full rounded-lg bg-surface-card px-3.5 text-body-md text-text-primary shadow-sm outline-none placeholder:text-text-muted focus:ring-2 focus:ring-primary" placeholder="PUB-TRITHUC" />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-label-md font-label-md font-semibold text-text-primary">Đường dẫn tĩnh (Slug URL) <span className="text-error">*</span></label>
                  <button type="button" onClick={() => updateField("slug", slugify(form.name))} className="text-label-sm font-label-sm text-status-sky-text hover:underline">Tạo lại từ tên</button>
                </div>
                <div className="flex overflow-hidden rounded-lg bg-surface-subtle shadow-sm focus-within:ring-2 focus-within:ring-primary">
                  <span className="inline-flex shrink-0 items-center bg-surface-container px-3.5 text-label-sm font-label-sm text-text-muted">dalifabooks.vn/publisher/</span>
                  <input type="text" value={form.slug} onChange={(event) => updateField("slug", event.target.value)} className="h-11 w-full bg-transparent px-3 text-body-md text-text-primary outline-none" placeholder="nxb-tri-thuc" required />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="block text-label-md font-label-md font-semibold text-text-primary">Đại diện</label>
                  <input type="text" value={form.repName} onChange={(event) => updateField("repName", event.target.value)} className="h-11 w-full rounded-lg bg-surface-card px-3.5 text-body-md text-text-primary shadow-sm outline-none placeholder:text-text-muted focus:ring-2 focus:ring-primary" placeholder="TS. Chu Hảo" />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-label-md font-label-md font-semibold text-text-primary">Email</label>
                  <input type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} className="h-11 w-full rounded-lg bg-surface-card px-3.5 text-body-md text-text-primary shadow-sm outline-none placeholder:text-text-muted focus:ring-2 focus:ring-primary" placeholder="lienhe@nxb.com.vn" />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-label-md font-label-md font-semibold text-text-primary">Điện thoại</label>
                  <input type="tel" value={form.phone} onChange={(event) => updateField("phone", event.target.value)} className="h-11 w-full rounded-lg bg-surface-card px-3.5 text-body-md text-text-primary shadow-sm outline-none placeholder:text-text-muted focus:ring-2 focus:ring-primary" placeholder="024 3944 7239" />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-label-md font-label-md font-semibold text-text-primary">Khu vực</label>
                  <input type="text" value={form.region} onChange={(event) => updateField("region", event.target.value)} className="h-11 w-full rounded-lg bg-surface-card px-3.5 text-body-md text-text-primary shadow-sm outline-none placeholder:text-text-muted focus:ring-2 focus:ring-primary" placeholder="Hà Nội" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-label-md font-label-md font-semibold text-text-primary">Địa chỉ</label>
                <input type="text" value={form.address} onChange={(event) => updateField("address", event.target.value)} className="h-11 w-full rounded-lg bg-surface-card px-3.5 text-body-md text-text-primary shadow-sm outline-none placeholder:text-text-muted focus:ring-2 focus:ring-primary" placeholder="53 Nguyễn Du, Hai Bà Trưng, Hà Nội" />
              </div>

              <div className="space-y-1.5">
                <label className="block text-label-md font-label-md font-semibold text-text-primary">Mô tả</label>
                <textarea rows={5} value={form.description} onChange={(event) => updateField("description", event.target.value)} className="w-full rounded-lg bg-surface-card px-3.5 py-3 text-body-md text-text-primary shadow-sm outline-none placeholder:text-text-muted focus:ring-2 focus:ring-primary" placeholder="Giới thiệu ngắn về nhà xuất bản" />
              </div>
            </section>
          </div>

          <div className="lg:col-span-4">
            <section className="space-y-5 rounded-xl bg-surface-card p-6 shadow-sm">
              <div className="flex items-center gap-2.5 border-b border-surface-subtle pb-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-container text-primary"><span className="material-symbols-outlined text-[18px]">photo_camera</span></span>
                <h3 className="text-headline-sm font-headline-sm text-text-primary">Logo</h3>
              </div>

              <div className="space-y-3">
                <div className="flex h-36 w-36 items-center justify-center overflow-hidden rounded-2xl bg-surface-subtle shadow-md">
                  <img src={form.logoUrl || "https://placehold.co/160x160/f3f4f6/64748b?text=Logo"} alt={form.name || "Publisher logo"} className="h-full w-full object-cover" />
                </div>

                <div className="space-y-2">
                  <label className="block text-label-md font-label-md font-semibold text-text-primary">Ảnh logo</label>
                  <input id="publisher-logo-upload" type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                  <div className="flex gap-2">
                    <label htmlFor="publisher-logo-upload" className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-primary px-3.5 py-2 text-label-md font-label-md text-on-primary shadow-sm hover:bg-primary-container">Tải ảnh lên</label>
                    {form.logoUrl && <button type="button" onClick={() => updateField("logoUrl", "")} className="rounded-lg bg-surface-subtle px-3.5 py-2 text-label-md font-label-md text-text-secondary hover:bg-surface-container">Xóa ảnh</button>}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-label-md font-label-md font-semibold text-text-primary">Hoặc nhập URL logo</label>
                  <input type="url" value={form.logoUrl} onChange={(event) => updateField("logoUrl", event.target.value)} className="h-11 w-full rounded-lg bg-surface-card px-3.5 text-body-md text-text-primary shadow-sm outline-none placeholder:text-text-muted focus:ring-2 focus:ring-primary" placeholder="https://..." />
                </div>
              </div>
            </section>
          </div>
        </div>
      </form>
    </AdminPageShell>
  );
}
