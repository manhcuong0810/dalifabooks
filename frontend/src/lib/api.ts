/**
 * API client cho Storefront
 * Base URL đọc từ env NEXT_PUBLIC_API_URL
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
const ADMIN_TOKEN_KEY = "dalifabooks_admin_token";

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

export function getAdminToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ADMIN_TOKEN_KEY);
}

export function setAdminToken(token: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(ADMIN_TOKEN_KEY, token);
}

export function clearAdminToken() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ADMIN_TOKEN_KEY);
}

export async function apiFetch<T>(
  path: string,
  init?: RequestInit
): Promise<ApiResponse<T>> {
  const res = await fetch(`${API_BASE}/api/v1${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!res.ok) {
    const err: ApiError = await res.json();
    throw err;
  }

  return res.json() as Promise<ApiResponse<T>>;
}

export async function adminFetch<T>(
  path: string,
  init?: RequestInit
): Promise<T | undefined> {
  const token = getAdminToken();
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

  if (res.status === 204 || res.headers.get("content-length") === "0") {
    return undefined;
  }

  return res.json() as Promise<T>;
}
