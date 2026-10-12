"use client";

import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { adminFetch } from "@/lib/api";
import Link from "next/link";
import { useEffect, useState } from "react";

type AuthorRecord = {
  id: string;
  name: string;
  slug: string;
  role?: string;
  country?: string;
  years?: string;
  pen_name?: string;
  featured_title?: string;
  featured_subtitle?: string;
  avatar_url?: string;
  biography?: string;
  is_verified?: boolean;
  status?: "active" | "archived";
};

const emptyProfile = {
  id: "",
  name: "",
  slug: "",
  role: "author",
  country: "",
  years: "",
  pen_name: "",
  featured_title: "",
  featured_subtitle: "",
  avatar_url: "",
  biography: "",
  is_verified: false,
};

function roleLabel(value?: string) {
  switch (value) {
    case "translator":
      return "Dịch giả";
    case "editor":
      return "Chủ biên";
    case "reviewer":
      return "Hiệu đính";
    case "co-author":
      return "Đồng tác giả";
    default:
      return "Tác giả";
  }
}

export default function AdminAuthorsPage() {
  const [authors, setAuthors] = useState<AuthorRecord[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profile, setProfile] = useState(emptyProfile);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAuthors = async () => {
      try {
        const data = (await adminFetch<AuthorRecord[]>("/authors")) ?? [];
        setAuthors(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadAuthors();
  }, []);

  const openAuthorDetails = (author: AuthorRecord) => {
    setProfile({
      id: author.id,
      name: author.name,
      slug: author.slug,
      role: author.role ?? "author",
      country: author.country ?? "",
      years: author.years ?? "",
      pen_name: author.pen_name ?? author.name,
      featured_title: author.featured_title ?? "",
      featured_subtitle: author.featured_subtitle ?? "",
      avatar_url: author.avatar_url ?? "",
      biography: author.biography ?? "",
      is_verified: Boolean(author.is_verified),
    });
    setDrawerOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa hồ sơ này?")) {
      return;
    }

    try {
      await adminFetch(`/authors/${id}`, { method: "DELETE" });
      setAuthors((prev) => prev.filter((author) => author.id !== id));
      if (profile.id === id) {
        setDrawerOpen(false);
      }
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Không thể xóa hồ sơ.");
    }
  };

  const totalAuthors = authors.length;
  const authorCount = authors.filter((author) => author.role !== "translator" && author.role !== "reviewer").length;
  const translatorCount = authors.filter((author) => author.role === "translator" || author.role === "reviewer").length;

  return (
    <AdminPageShell activePath="/admin/authors">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <nav className="mb-1 flex items-center gap-2 text-sm text-text-muted">
              <span>Quản lý Sách</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="font-medium text-text-primary">Tác giả &amp; Dịch giả</span>
            </nav>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-headline-lg font-headline-lg tracking-tight text-text-primary">Quản lý Tác giả &amp; Dịch giả</h1>
              <span className="rounded-full bg-surface-container-highest px-2.5 py-1 text-label-sm font-label-sm font-semibold text-primary">
                {totalAuthors} hồ sơ
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link href="/admin/authors/new" className="rounded-lg bg-primary px-4 py-2 text-label-md font-label-md text-on-primary shadow-sm hover:bg-primary-container">
              + Thêm tác giả / Dịch giả
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "Tổng tác giả & dịch giả", value: String(totalAuthors), note: "Hồ sơ đang quản lý", icon: "groups" },
            { label: "Tác giả & Chủ biên", value: String(authorCount), note: "Nhóm tác phẩm chính", icon: "history_edu" },
            { label: "Dịch giả & Hiệu đính", value: String(translatorCount), note: "Nhóm dịch thuật & hiệu đính", icon: "translate" },
            { label: "Đầu sách liên kết", value: "0", note: "Chưa có dữ liệu gán", icon: "auto_stories" },
          ].map((item) => (
            <div key={item.label} className="rounded-xl bg-surface-card p-4 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-label-sm font-label-sm text-text-secondary">{item.label}</span>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-subtle text-primary">
                  <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
                </div>
              </div>
              <div className="text-headline-md font-headline-md font-bold text-text-primary">{item.value}</div>
              <div className="mt-1 text-body-sm font-body-sm text-text-muted">{item.note}</div>
            </div>
          ))}
        </div>

        <div className="overflow-hidden rounded-xl bg-surface-card shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface-subtle text-label-sm font-label-sm uppercase text-text-muted">
                <tr>
                  <th className="px-4 py-3">Tên</th>
                  <th className="px-4 py-3">Vai trò</th>
                  <th className="px-4 py-3">Quốc tịch</th>
                  <th className="px-4 py-3">Tác phẩm tiêu biểu</th>
                  <th className="px-4 py-3 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border text-text-primary">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-text-muted">Đang tải danh sách tác giả...</td>
                  </tr>
                ) : authors.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-text-muted">Chưa có hồ sơ nào.</td>
                  </tr>
                ) : (
                  authors.map((author) => (
                    <tr key={author.id} className="hover:bg-surface-subtle/60">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={author.avatar_url || "https://placehold.co/80x80/f3f4f6/64748b?text=Author"}
                            alt={author.name}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                          <div>
                            <div className="font-semibold text-text-primary">{author.name}</div>
                            <div className="text-body-sm text-text-muted">slug: {author.slug}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="rounded-full bg-primary-fixed px-2 py-1 text-label-sm font-label-sm text-on-primary-fixed">
                          {roleLabel(author.role)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-text-secondary">{author.country || "—"}</td>
                      <td className="px-4 py-3 text-text-secondary">{author.featured_title || author.featured_subtitle || "—"}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-2">
                          <button type="button" onClick={() => openAuthorDetails(author)} className="rounded-lg bg-surface-subtle px-3 py-2 text-label-md font-label-md text-text-primary hover:bg-surface-container-low">
                            Chi tiết
                          </button>
                          <button type="button" onClick={() => handleDelete(author.id)} className="rounded-lg bg-error/10 px-3 py-2 text-label-md font-label-md text-error hover:bg-error/15">
                            Xóa
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {drawerOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-[2px]" onClick={() => setDrawerOpen(false)} />
          <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-xl flex-col bg-surface-card shadow-2xl">
            <div className="flex h-16 items-center justify-between bg-surface-subtle px-5">
              <h2 className="font-headline-sm text-headline-sm font-semibold text-text-primary">Hồ sơ Tác giả &amp; Dịch giả</h2>
              <button type="button" onClick={() => setDrawerOpen(false)} className="flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary hover:bg-surface-card hover:text-text-primary">
                <span className="material-symbols-outlined text-[22px]">close</span>
              </button>
            </div>

            <div className="flex-1 space-y-5 overflow-y-auto p-5">
              <div className="flex items-center gap-4 rounded-xl bg-surface-subtle p-4">
                <img src={profile.avatar_url || "https://placehold.co/80x80/f3f4f6/64748b?text=Author"} alt={profile.name} className="h-20 w-20 rounded-full object-cover" />
                <div>
                  <h3 className="font-headline-sm text-headline-sm font-bold text-text-primary">{profile.name}</h3>
                  <p className="text-body-sm text-text-secondary">{roleLabel(profile.role)}</p>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-label-md font-label-md font-semibold text-text-primary">Họ và tên đầy đủ</label>
                <input type="text" value={profile.name} readOnly className="h-11 w-full rounded-lg bg-surface-card px-3.5 text-body-md text-text-primary shadow-sm focus:outline-none" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block text-label-md font-label-md font-semibold text-text-primary">Quốc tịch</label>
                  <input type="text" value={profile.country || "—"} readOnly className="h-11 w-full rounded-lg bg-surface-card px-3.5 text-body-md text-text-primary shadow-sm focus:outline-none" />
                </div>
                <div>
                  <label className="mb-1.5 block text-label-md font-label-md font-semibold text-text-primary">Slug</label>
                  <input type="text" value={profile.slug} readOnly className="h-11 w-full rounded-lg bg-surface-card px-3.5 font-mono text-body-sm text-text-primary shadow-sm focus:outline-none" />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-label-md font-label-md font-semibold text-text-primary">Tiểu sử</label>
                <textarea rows={4} value={profile.biography || profile.featured_subtitle || "—"} readOnly className="w-full rounded-lg bg-surface-card p-3.5 text-body-sm text-text-primary shadow-sm focus:outline-none" />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 bg-surface-subtle p-4">
              <Link href={`/admin/authors/new?id=${profile.id}`} className="rounded-lg bg-primary px-5 py-2 text-label-md font-label-md text-on-primary">Sửa hồ sơ</Link>
              <button type="button" onClick={() => setDrawerOpen(false)} className="rounded-lg bg-surface-card px-4 py-2 text-label-md font-label-md text-text-primary">Đóng</button>
            </div>
          </div>
        </>
      )}
    </AdminPageShell>
  );
}
