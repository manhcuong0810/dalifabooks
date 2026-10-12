import type { ReactNode } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopbar } from "@/components/admin/AdminTopbar";

export function AdminPageShell({
  activePath,
  children,
}: {
  activePath?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-surface-canvas font-body-md text-on-surface antialiased">
      <AdminSidebar activePath={activePath} />
      <AdminTopbar />

      <main className="min-h-screen bg-surface-canvas pl-64 pt-16">
        <div className="mx-auto w-full max-w-[1600px] px-6 py-6">{children}</div>
      </main>
    </div>
  );
}
