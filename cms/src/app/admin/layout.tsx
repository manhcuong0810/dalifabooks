"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCmsToken } from "@/lib/api";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    if (!getCmsToken()) {
      router.replace("/login");
    }
  }, [router]);

  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="w-60 shrink-0 border-r border-gray-200 bg-white">
        <nav aria-label="CMS navigation">
          <p className="p-4 font-semibold text-gray-900">DalifaBooks CMS</p>
          <div className="space-y-1 px-3 pb-4 text-sm text-slate-600">
            <a href="/admin/dashboard" className="block rounded-lg px-3 py-2 hover:bg-slate-100">Dashboard</a>
            <a href="/admin/books" className="block rounded-lg px-3 py-2 hover:bg-slate-100">Sách</a>
            <a href="/admin/categories" className="block rounded-lg px-3 py-2 hover:bg-slate-100">Danh mục</a>
            <a href="/admin/authors" className="block rounded-lg px-3 py-2 hover:bg-slate-100">Tác giả</a>
            <a href="/admin/publishers" className="block rounded-lg px-3 py-2 hover:bg-slate-100">NXB</a>
          </div>
        </nav>
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="h-14 shrink-0 border-b border-gray-200 bg-white px-6 flex items-center justify-between">
          <span className="text-sm text-gray-500">CMS Admin</span>
          <a href="/login" className="text-sm font-medium text-slate-700 hover:text-slate-900">Đăng xuất</a>
        </header>

        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
