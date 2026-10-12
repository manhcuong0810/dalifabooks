"use client";

import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { adminFetch } from "@/lib/api";
import Link from "next/link";
import { useEffect, useState } from "react";

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
  logo_url?: string;
  description?: string;
};

export default function AdminPublishersPage() {
  const [publishers, setPublishers] = useState<PublisherRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPublishers = async () => {
    try {
      const data = (await adminFetch<PublisherRecord[]>("/publishers")) ?? [];
      setPublishers(data);
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Không thể tải dữ liệu nhà xuất bản.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPublishers();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa nhà xuất bản này?")) {
      return;
    }

    try {
      await adminFetch(`/publishers/${id}`, { method: "DELETE" });
      setPublishers((current) => current.filter((publisher) => publisher.id !== id));
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Không thể xóa nhà xuất bản.");
    }
  };

  const activeCount = publishers.filter((publisher) => publisher.status !== "archived").length;

  return (
    <AdminPageShell activePath="/admin/publishers">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <nav className="mb-1 flex items-center gap-2 text-sm text-text-muted">
              <span>Quản lý Sách</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="font-medium text-text-primary">Nhà xuất bản</span>
            </nav>

            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-headline-lg font-headline-lg tracking-tight text-text-primary">Quản lý Nhà xuất bản</h1>
              <span className="rounded-full bg-status-emerald-bg px-2.5 py-1 text-label-sm font-label-sm font-semibold text-status-emerald-text">
                {publishers.length} đối tác
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link href="/admin/publishers/new" className="rounded-lg bg-primary px-4 py-2 text-label-md font-label-md text-on-primary shadow-sm hover:bg-primary-container">
              + Thêm Nhà xuất bản
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "Tổng đối tác", value: String(publishers.length), note: "Trong hệ thống", tone: "bg-surface-subtle" },
            { label: "Đang liên kết", value: String(activeCount), note: "Hiệu lực hiện tại", tone: "bg-status-emerald-bg" },
            { label: "Tạm ngưng", value: String(publishers.filter((item) => item.status === "archived").length), note: "Cần rà soát", tone: "bg-status-amber-bg" },
            { label: "Đầu sách liên quan", value: "0", note: "Chưa gán dữ liệu", tone: "bg-status-sky-bg" },
          ].map((stat) => (
            <div key={stat.label} className={`rounded-xl p-4 shadow-sm ${stat.tone}`}>
              <div className="text-label-sm font-label-sm text-text-secondary">{stat.label}</div>
              <div className="mt-2 text-headline-md font-headline-md font-bold text-text-primary">{stat.value}</div>
              <div className="mt-1 text-body-sm font-body-sm text-text-muted">{stat.note}</div>
            </div>
          ))}
        </div>

        <div className="overflow-hidden rounded-xl bg-surface-card shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface-subtle text-label-sm font-label-sm uppercase text-text-muted">
                <tr>
                  <th className="px-4 py-3">Nhà xuất bản</th>
                  <th className="px-4 py-3">Mã đối tác</th>
                  <th className="px-4 py-3">Liên hệ</th>
                  <th className="px-4 py-3">Trụ sở</th>
                  <th className="px-4 py-3">Trạng thái</th>
                  <th className="px-4 py-3 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border text-text-primary">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-text-muted">Đang tải danh sách nhà xuất bản...</td>
                  </tr>
                ) : publishers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-text-muted">Chưa có nhà xuất bản nào.</td>
                  </tr>
                ) : (
                  publishers.map((publisher) => (
                    <tr key={publisher.id} className="hover:bg-surface-subtle/60">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={publisher.logo_url || "https://placehold.co/64x64/f3f4f6/64748b?text=NXB"}
                            alt={publisher.name}
                            className="h-12 w-12 rounded-lg object-cover"
                          />
                          <div>
                            <div className="font-semibold text-text-primary">{publisher.name}</div>
                            <div className="text-body-sm text-text-muted">/publisher/{publisher.slug}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="rounded bg-surface-subtle px-2 py-1 font-mono text-label-sm font-label-sm text-text-primary">
                          {publisher.code || "—"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-text-secondary">
                        <div>{publisher.rep_name || "—"}</div>
                        <div>{publisher.email || "—"}</div>
                      </td>
                      <td className="px-4 py-3 text-text-secondary">{publisher.region || "—"}</td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2.5 py-1 text-label-sm font-label-sm ${publisher.status === "archived" ? "bg-status-amber-bg text-status-amber-text" : "bg-status-emerald-bg text-status-emerald-text"}`}>
                          {publisher.status === "archived" ? "Tạm ngưng" : "Đang liên kết"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/admin/publishers/new?id=${publisher.id}`} className="rounded-lg bg-surface-subtle px-3 py-2 text-label-md font-label-md text-text-primary hover:bg-surface-container-low">
                            Sửa
                          </Link>
                          <button type="button" onClick={() => handleDelete(publisher.id)} className="rounded-lg bg-error/10 px-3 py-2 text-label-md font-label-md text-error hover:bg-error/15">
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
    </AdminPageShell>
  );
}
