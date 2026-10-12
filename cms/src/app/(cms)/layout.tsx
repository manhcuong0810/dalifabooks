"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCmsToken } from "@/lib/api";

export default function CmsLayout({
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
        </nav>
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="h-14 shrink-0 border-b border-gray-200 bg-white px-6 flex items-center">
          <span className="text-sm text-gray-500">Topbar</span>
        </header>

        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
