"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { adminFetch, getCmsToken, setCmsToken } from "@/lib/api";

export default function CmsLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@dalifabooks.local");
  const [password, setPassword] = useState("Admin@123");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (getCmsToken()) {
      router.replace("/admin/dashboard");
    }
  }, [router]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
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
        body: JSON.stringify({ email, password }),
      });

      const payload = response && typeof response === "object" && "access_token" in response
        ? response
        : null;

      if (!payload || !payload.access_token) {
        throw new Error("Phản hồi đăng nhập không hợp lệ.");
      }

      setCmsToken(payload.access_token);
      router.replace("/admin/dashboard");
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Email hoặc mật khẩu không đúng.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex h-screen items-center justify-center overflow-hidden bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-slate-900 text-xl font-bold text-white">
            D
          </div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
            DalifaBooks CMS
          </p>
          <h1 className="mt-3 text-2xl font-bold text-slate-900">Đăng nhập</h1>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-3 text-sm outline-none transition focus:border-slate-500 focus:bg-white"
              placeholder="admin@dalifabooks.local"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">
              Mật khẩu
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-3 text-sm outline-none transition focus:border-slate-500 focus:bg-white"
              placeholder="••••••••"
              required
            />
          </div>

          {error ? (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập CMS"}
          </button>
        </form>
      </div>
    </main>
  );
}
