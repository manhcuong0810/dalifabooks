/**
 * API client cho CMS (gọi admin endpoints)
 * Base URL đọc từ env NEXT_PUBLIC_API_URL
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
const CMS_TOKEN_KEY = "dalifabooks_cms_token";

type ApiResponse<T> = {
  data: T;
  meta?: Record<string, unknown>;
};

type ApiError = {
  error: {
    code: string;
    message: string;
    field_errors?: Record<string, string[]>;
    request_id: string;
  };
};

export function getCmsToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(CMS_TOKEN_KEY);
}

export function setCmsToken(token: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CMS_TOKEN_KEY, token);
}

export function clearCmsToken() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CMS_TOKEN_KEY);
}

export async function adminFetch<T>(
  path: string,
  init?: RequestInit
): Promise<ApiResponse<T> | T> {
  const token = getCmsToken();
  const res = await fetch(`${API_BASE}/api/v1/admin${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers ?? {}),
    },
    credentials: "include",
  });

  if (!res.ok) {
    const err: ApiError = await res.json().catch(() => ({
      error: { code: "UNKNOWN_ERROR", message: "Có lỗi xảy ra." },
    }));
    throw err;
  }

  const data = await res.json();
  return data && typeof data === "object" && "data" in data ? (data as ApiResponse<T>) : (data as T);
}
