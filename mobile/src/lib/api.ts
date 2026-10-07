import { getLocale, t } from '../i18n';
import { supabase } from './supabase';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function authHeaders(): Promise<Record<string, string>> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  if (!token) throw new ApiError(401, t("Oturum bulunamadı"));
  // Backend overlays translated content (scenarios, reading) by this header.
  return { Authorization: `Bearer ${token}`, 'X-App-Locale': getLocale() };
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  if (!API_BASE_URL) {
    throw new ApiError(0, 'EXPO_PUBLIC_API_BASE_URL tanımlı değil (.env eksik)');
  }

  const isFormData = init.body instanceof FormData;
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      ...(await authHeaders()),
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...init.headers,
    },
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    throw new ApiError(response.status, detail || response.statusText);
  }
  if (response.status === 204) {
    return undefined as T;
  }
  return response.json() as Promise<T>;
}

/** Thin authenticated fetch wrapper for `backend`'s REST API — see `src/types/api.ts` for response shapes. */
export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: 'POST', body: body !== undefined ? JSON.stringify(body) : undefined }),
  patch: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: 'PATCH', body: body !== undefined ? JSON.stringify(body) : undefined }),
  delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
  postForm: <T>(path: string, form: FormData) => request<T>(path, { method: 'POST', body: form }),
  /** For endpoints that return raw bytes instead of JSON (e.g. `POST /tts/pronounce` → `audio/wav`). */
  postArrayBuffer: async (path: string, body?: unknown): Promise<ArrayBuffer> => {
    if (!API_BASE_URL) {
      throw new ApiError(0, 'EXPO_PUBLIC_API_BASE_URL tanımlı değil (.env eksik)');
    }
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'POST',
      headers: { ...(await authHeaders()), 'Content-Type': 'application/json' },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
    if (!response.ok) {
      const detail = await response.text().catch(() => '');
      throw new ApiError(response.status, detail || response.statusText);
    }
    return response.arrayBuffer();
  },
};
