import AsyncStorage from '@react-native-async-storage/async-storage';

import { api, ApiError } from './api';
import { supabase } from './supabase';

/**
 * Tiny persistent outbox for fire-and-forget writes that must not be lost when the network drops
 * (today: `POST /progress/log-practice`, which feeds streak + XP). A write is queued only when it failed
 * because of the network (status 0) or the server (5xx); client errors (4xx) are dropped. Each entry is tied
 * to the account that created it, so it can never be replayed into another account.
 */
const KEY = 'api_outbox_v1';
const MAX_ITEMS = 50;

type Item = { id: string; userId: string; path: string; body?: unknown };

let flushing = false;

async function read(): Promise<Item[]> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function write(items: Item[]): Promise<void> {
  try {
    if (items.length === 0) await AsyncStorage.removeItem(KEY);
    else await AsyncStorage.setItem(KEY, JSON.stringify(items.slice(-MAX_ITEMS)));
  } catch {
    // best effort
  }
}

async function currentUserId(): Promise<string | null> {
  const { data } = await supabase.auth.getSession();
  return data.session?.user.id ?? null;
}

function isRetryable(error: unknown): boolean {
  return error instanceof ApiError && (error.status === 0 || error.status >= 500);
}

/** `api.post`, but a network/server failure parks the request and re-sends it later. The original error is still thrown. */
export async function postQueued<T>(path: string, body?: unknown): Promise<T> {
  try {
    return await api.post<T>(path, body);
  } catch (error) {
    if (isRetryable(error)) {
      const userId = await currentUserId();
      if (userId) {
        const items = await read();
        items.push({ id: `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`, userId, path, body });
        await write(items);
      }
    }
    throw error;
  }
}

/** Re-sends parked writes in order. Stops at the first one that still can't go through. */
export async function flushOutbox(): Promise<void> {
  if (flushing) return;
  flushing = true;
  try {
    const userId = await currentUserId();
    if (!userId) return;
    let items = await read();
    if (items.length === 0) return;
    // Other accounts' entries are never replayed under this account.
    items = items.filter((item) => item.userId === userId);
    const rest = [...items];
    for (const item of items) {
      try {
        await api.post(item.path, item.body);
        rest.shift();
      } catch (error) {
        if (isRetryable(error)) break; // still offline: keep this and the rest
        rest.shift(); // 4xx: it will never succeed, drop it
      }
    }
    await write(rest);
  } finally {
    flushing = false;
  }
}
