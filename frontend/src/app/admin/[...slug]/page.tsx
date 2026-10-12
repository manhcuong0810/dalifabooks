import Link from "next/link";

export default function AdminFallbackPage({ params }: { params: { slug?: string[] } }) {
  const path = params?.slug ? `/${params.slug.join("/")}` : "";

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#001428] px-6 py-10 text-white">
      <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-sm">
        <div className="mb-4 inline-flex items-center rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground">
          CMS module
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-white">Mục đang được phát triển</h1>
        <p className="mt-3 text-sm text-slate-300">
          Route hiện tại: <span className="font-medium text-white">/admin{path}</span>
        </p>

        <p className="mt-5 text-sm leading-6 text-slate-300">
          Đây là màn hình fallback để các tính năng CMS chưa có mô hình riêng vẫn điều hướng đúng và không bị treo ở trang dashboard.
        </p>

        <div className="mt-8 flex gap-3">
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
          >
            Quay về Dashboard
          </Link>
          <Link
            href="/admin/audit"
            className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Xem Audit Log
          </Link>
        </div>
      </div>
    </main>
  );
}
