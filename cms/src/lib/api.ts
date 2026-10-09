/**
 * API client cho CMS (gọi admin endpoints)
 * Base URL đọc từ env NEXT_PUBLIC_API_URL
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

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

export async function adminFetch<T>(
  path: string,
  init?: RequestInit
): Promise<ApiResponse<T>> {
  const res = await fetch(`${API_BASE}/api/v1/admin${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    credentials: "include", // gửi cookie session admin
  });

  if (!res.ok) {
    const err: ApiError = await res.json();
    throw err;
  }

  return res.json() as Promise<ApiResponse<T>>;
}
