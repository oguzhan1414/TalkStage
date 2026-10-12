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

/** Normal calls give up after 20 s, uploads (audio forms) after 60 s — a dead connection must not hang a screen forever. */
const REQUEST_TIMEOUT_MS = 20_000;
const UPLOAD_TIMEOUT_MS = 60_000;

/** fetch with a timeout. Network failures and timeouts become `ApiError(0, …)` with a friendly message
 * (status 0 = "never reached the server"; React Query retries it once and the outbox can park it). */
async function fetchWithTimeout(url: string, init: RequestInit, timeoutMs: number): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } catch (error) {
    const aborted = error instanceof Error && error.name === 'AbortError';
    throw new ApiError(
      0,
      aborted
        ? t("Sunucu zamanında yanıt vermedi. Bağlantını kontrol edip tekrar dene.")
        : t("Sunucuya ulaşılamıyor. İnternet bağlantını kontrol et.")
    );
  } finally {
    clearTimeout(timer);
  }
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  if (!API_BASE_URL) {
    throw new ApiError(0, 'EXPO_PUBLIC_API_BASE_URL tanımlı değil (.env eksik)');
  }

  const isFormData = init.body instanceof FormData;
  const response = await fetchWithTimeout(
    `${API_BASE_URL}${path}`,
    {
      ...init,
      headers: {
        ...(await authHeaders()),
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        ...init.headers,
      },
    },
    isFormData ? UPLOAD_TIMEOUT_MS : REQUEST_TIMEOUT_MS
  );

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
    const response = await fetchWithTimeout(
      `${API_BASE_URL}${path}`,
      {
        method: 'POST',
        headers: { ...(await authHeaders()), 'Content-Type': 'application/json' },
        body: body !== undefined ? JSON.stringify(body) : undefined,
      },
      REQUEST_TIMEOUT_MS
    );
    if (!response.ok) {
      const detail = await response.text().catch(() => '');
      throw new ApiError(response.status, detail || response.statusText);
    }
    return response.arrayBuffer();
  },
};
