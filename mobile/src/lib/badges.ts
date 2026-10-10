import type { BadgeState } from '../types/api';
import { api } from './api';

type Listener = (states: BadgeState[]) => void;
const listeners = new Set<Listener>();
let timer: ReturnType<typeof setTimeout> | null = null;
let pendingAfterActivity = false;

export function onBadgeStates(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** One server round-trip: evaluates every badge from the DB and returns all states. */
export async function syncBadgesNow(afterActivity = false): Promise<BadgeState[]> {
  const states = await api.post<BadgeState[]>('/badges/sync', {
    after_activity: afterActivity,
    local_hour: new Date().getHours(),
  });
  listeners.forEach((l) => l(states));
  return states;
}

/**
 * Asks the server to (re)check badges soon. Calls within ~1.5 s collapse into one request, so it is safe to
 * call after every activity. `afterActivity` lets the server award time-of-day badges (Erken Kuş / Gece Kuşu).
 */
export function requestBadgeSync(options: { afterActivity?: boolean } = {}) {
  if (options.afterActivity) pendingAfterActivity = true;
  if (timer) return;
  timer = setTimeout(() => {
    timer = null;
    const afterActivity = pendingAfterActivity;
    pendingAfterActivity = false;
    syncBadgesNow(afterActivity).catch(() => {
      // offline / signed out — the next trigger retries
    });
  }, 1500);
}

export function markBadgesSeen(ids: string[]) {
  if (ids.length === 0) return;
  api.post('/badges/seen', { ids }).catch(() => {});
}
