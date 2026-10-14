import AsyncStorage from '@react-native-async-storage/async-storage';
import { dehydrate, hydrate, type DehydratedState, type QueryClient } from '@tanstack/react-query';

/**
 * Keeps the last successful answers of the start-up queries on the device, so a cold start paints the
 * home screen from disk at once and refreshes in the background (hydrated data is stale by definition).
 * The snapshot belongs to one account: another user's snapshot is thrown away, never shown.
 */
const STORE_KEY = 'ts:query-cache:v1';
const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
const SAVE_DELAY_MS = 1500;

/** First element of the query keys worth restoring. Entitlements, chat memory and session lists always come fresh. */
const PERSISTED = new Set(['me', 'progress', 'vocab-cards', 'reading', 'scenarios', 'vocab-library-progress', 'badges', 'grammar-mistakes']);

type Snapshot = { userId: string; savedAt: number; state: DehydratedState };

export async function restoreQueryCache(client: QueryClient, userId: string): Promise<void> {
  try {
    const raw = await AsyncStorage.getItem(STORE_KEY);
    if (!raw) return;
    const snapshot = JSON.parse(raw) as Snapshot;
    if (snapshot.userId !== userId || Date.now() - snapshot.savedAt > MAX_AGE_MS) {
      await AsyncStorage.removeItem(STORE_KEY);
      return;
    }
    hydrate(client, snapshot.state);
  } catch {
    // A corrupt snapshot only costs the instant start; the network answer still arrives.
    AsyncStorage.removeItem(STORE_KEY).catch(() => {});
  }
}

/** Saves a snapshot shortly after the cache changes. Returns the unsubscribe function. */
export function startQueryCachePersistence(client: QueryClient, getUserId: () => string | null): () => void {
  let timer: ReturnType<typeof setTimeout> | null = null;

  const save = () => {
    timer = null;
    const userId = getUserId();
    if (!userId) return;
    const state = dehydrate(client, {
      shouldDehydrateQuery: (query) => query.state.status === 'success' && PERSISTED.has(String(query.queryKey[0])),
    });
    const snapshot: Snapshot = { userId, savedAt: Date.now(), state };
    AsyncStorage.setItem(STORE_KEY, JSON.stringify(snapshot)).catch(() => {});
  };

  const unsubscribe = client.getQueryCache().subscribe((event) => {
    if (event.type !== 'updated' || event.action.type !== 'success') return;
    if (!PERSISTED.has(String(event.query.queryKey[0]))) return;
    if (!timer) timer = setTimeout(save, SAVE_DELAY_MS);
  });

  return () => {
    unsubscribe();
    if (timer) clearTimeout(timer);
  };
}

export async function clearQueryCacheStore(): Promise<void> {
  await AsyncStorage.removeItem(STORE_KEY).catch(() => {});
}
