"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { adminFetch, getAdminToken, setAdminToken } from "@/lib/api";

export default function AdminLoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [identity, setIdentity] = useState("admin@dalifabooks.local");
  const [password, setPassword] = useState("Admin@123");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (getAdminToken()) {
      router.replace("/admin/dashboard");
    }
  }, [router]);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await adminFetch<{
        access_token: string;
        user: {
          id: string;
          email: string;
          full_name: string;
          roles: string[];
        };
      }>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email: identity, password }),
      });

      if (!response?.access_token) {
        throw new Error("Không nhận được token đăng nhập.");
      }

      setAdminToken(response.access_token);
      router.push("/admin/dashboard");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Đăng nhập thất bại.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#001428] px-4 py-4">
      <div className="pointer-events-none absolute -left-20 -top-32 h-96 w-96 rounded-full bg-primary-container/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-secondary-container/10 blur-3xl" />

      <div className="relative z-10 flex w-full max-w-lg flex-col justify-center">
        <div className="mb-3 flex flex-col items-center text-center">
          <div className="mb-2 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
              <svg viewBox="0 0 64 64" className="h-7 w-7" aria-hidden="true">
                <defs>
                  <linearGradient id="db-logo-gradient" x1="0%" x2="100%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#1F6FEB" />
                    <stop offset="100%" stopColor="#7C3AED" />
                  </linearGradient>
                </defs>
                <rect x="8" y="8" width="48" height="48" rx="14" fill="url(#db-logo-gradient)" opacity="0.9" />
                <path d="M22 18h9.5c8.7 0 15.5 6.8 15.5 15.2S40.2 48.4 31.5 48.4H22V18Zm8.5 8.5v13.4h1.2c4.1 0 7.2-3.1 7.2-6.7s-3.1-6.7-7.2-6.7h-1.2Z" fill="white" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-white">DalifaBooks</span>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 backdrop-blur-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/90">
              Hệ thống vận hành &amp; quản trị CMS
            </span>
          </div>
        </div>

        <div className="flex flex-col rounded-xl bg-surface-card p-4 shadow-xl md:p-5">
          <div className="mb-4 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-text-primary">
              Đăng nhập Quản trị viên
            </h1>
            <p className="mt-1 font-body-md text-body-md text-text-secondary">
              Dành cho Ban biên tập, Thủ kho và Quản trị viên hệ thống
            </p>
          </div>

          <form className="space-y-3" onSubmit={handleLogin}>
            <div className="space-y-1">
              <label htmlFor="cms-identity" className="block font-label-md text-label-md font-semibold text-text-primary">
                Tên đăng nhập / Email quản trị <span className="text-error">*</span>
              </label>
              <div className="relative flex items-center">
                <span className="pointer-events-none absolute left-space-md text-[20px] text-text-muted material-symbols-outlined">mail</span>
                <input
                  id="cms-identity"
                  name="identity"
                  type="email"
                  required
                  value={identity}
                  onChange={(e) => setIdentity(e.target.value)}
                  placeholder="admin@dalifabooks.local"
                  className="w-full rounded-lg bg-surface-subtle py-3 pl-11 pr-space-md font-body-md text-body-md text-text-primary transition-all placeholder:text-text-muted focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-container"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label htmlFor="cms-password" className="block font-label-md text-label-md font-semibold text-text-primary">
                  Mật khẩu quản trị <span className="text-error">*</span>
                </label>
                <span className="text-xs text-text-muted">Tối thiểu 8 ký tự</span>
              </div>

              <div className="relative flex items-center">
                <span className="pointer-events-none absolute left-space-md text-[20px] text-text-muted material-symbols-outlined">lock</span>
                <input
                  id="cms-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-lg bg-surface-subtle py-2.5 pl-11 pr-12 text-sm text-text-primary transition-all placeholder:text-text-muted focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-container"
                />
                <button
                  type="button"
                  aria-label="Ẩn hoặc hiện mật khẩu"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-space-sm flex min-h-[44px] min-w-[44px] items-center justify-center p-space-xs text-text-muted transition-colors hover:text-primary"
                >
                  <span className="material-symbols-outlined text-[20px]">{showPassword ? "visibility_off" : "visibility"}</span>
                </button>
              </div>
            </div>

            {error ? (
              <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </div>
            ) : null}

            <div className="pt-1">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary text-on-primary text-sm font-semibold shadow-sm transition-all hover:bg-[#1E3A8A] hover:shadow-md active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="material-symbols-outlined text-[20px]">login</span>
                <span>{isSubmitting ? "Đang đăng nhập..." : "Đăng nhập vào Hệ thống CMS"}</span>
              </button>
            </div>
          </form>

          <div className="mt-3 flex items-start gap-2 rounded-lg bg-surface-subtle p-3">
            <span className="material-symbols-outlined mt-0.5 shrink-0 text-[18px] text-secondary">policy</span>
            <p className="text-xs leading-relaxed text-text-secondary">
              <strong>Lưu ý bảo mật:</strong> Khu vực giới hạn. Mọi hoạt động được lưu lại kèm IP &amp; mã thiết bị phục vụ kiểm toán.
            </p>
          </div>

          <div className="mt-4 flex items-center justify-between gap-2 border-t border-slate-100 pt-3 text-xs text-text-secondary">
            <a href="#" className="flex items-center gap-1 text-text-secondary transition-colors hover:text-primary">
              <span className="material-symbols-outlined text-[16px]">support_agent</span>
              <span>Hỗ trợ kỹ thuật</span>
            </a>

            <Link href="/" className="flex items-center gap-1 font-medium text-primary transition-colors hover:text-primary/90">
              <span className="material-symbols-outlined text-[16px]">storefront</span>
              <span>Về storefront</span>
            </Link>
          </div>
        </div>

        <div className="mt-4 text-center text-[11px] text-text-muted">
          <p>© 2025 DalifaBooks Vietnam. Hệ thống Quản trị &amp; Phát hành ấn bản điện tử.</p>
        </div>
      </div>
    </main>
  );
}
