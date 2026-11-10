import AsyncStorage from '@react-native-async-storage/async-storage';

import { api } from './api';
import { postQueued } from './outbox';

/**
 * Keeps the learning path's progress and level on the server too (backend /path-progress, migration 0034), so a new
 * phone or a reinstall brings them back. The device copy stays the one screens read; this file only moves it.
 *   - after every change: the whole copy is sent (debounced); offline it waits in the outbox
 *   - when a session starts: the server copy is merged in (best result per step) and screens reload
 */
const PROGRESS_KEY = 'spekvia.path.v2';
const LEVEL_KEY = 'spekvia.path.level';

type Progress = { stars: Record<string, number>; parts: Record<string, number>; skipped: Record<string, true> };
type Remote = { stars: Record<string, number>; parts: Record<string, number>; skipped: Record<string, boolean>; level: string | null };

const listeners = new Set<() => void>();
/** Screens holding path state reload when a merge from the server changed it. */
export function onPathSynced(fn: () => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

async function readLocal(): Promise<{ progress: Progress; level: string | null }> {
  try {
    const [raw, level] = await Promise.all([AsyncStorage.getItem(PROGRESS_KEY), AsyncStorage.getItem(LEVEL_KEY)]);
    const p = raw ? (JSON.parse(raw) as Partial<Progress>) : {};
    return { progress: { stars: p.stars ?? {}, parts: p.parts ?? {}, skipped: p.skipped ?? {} }, level };
  } catch {
    return { progress: { stars: {}, parts: {}, skipped: {} }, level: null };
  }
}

function merge(a: Progress, b: Remote | Progress): Progress {
  const stars = { ...a.stars };
  for (const [k, v] of Object.entries(b.stars ?? {})) stars[k] = Math.max(v, stars[k] ?? 0);
  const parts = { ...a.parts };
  for (const [k, v] of Object.entries(b.parts ?? {})) parts[k] = Math.max(v, parts[k] ?? 0);
  const skipped: Record<string, true> = {};
  for (const k of [...Object.keys(a.skipped), ...Object.keys(b.skipped ?? {})]) if (!stars[k]) skipped[k] = true;
  return { stars, parts, skipped };
}

const same = (a: Progress, b: Progress) => JSON.stringify(a) === JSON.stringify(b);

let timer: ReturnType<typeof setTimeout> | null = null;

/** Called after the device copy changed: sends it a moment later (several quick changes go as one). */
export function schedulePathPush() {
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    timer = null;
    void (async () => {
      const { progress, level } = await readLocal();
      postQueued('/path-progress', { ...progress, level }).catch(() => {});
    })();
  }, 1500);
}

let syncing: Promise<void> | null = null;

/** When a session starts: brings the server copy in, then sends back anything only this phone had. */
export function syncPathProgress(): Promise<void> {
  if (syncing) return syncing;
  syncing = (async () => {
    try {
      const remote = await api.get<Remote>('/path-progress');
      const local = await readLocal();
      const merged = merge(local.progress, remote);
      const changed = !same(merged, local.progress);
      if (changed) await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(merged));
      // A fresh install has no level of its own yet: take the server's.
      const levelChanged = !local.level && !!remote.level;
      if (levelChanged) await AsyncStorage.setItem(LEVEL_KEY, remote.level as string);
      if (changed || levelChanged) listeners.forEach((fn) => fn());
      // This phone knew more than the server (progress from before the sync existed, or made offline).
      if (!same(merged, merge({ stars: {}, parts: {}, skipped: {} }, remote)) || (local.level && local.level !== remote.level)) {
        schedulePathPush();
      }
    } catch {
      // Offline or the server is not updated yet: the device copy keeps working, the next start tries again.
    } finally {
      syncing = null;
    }
  })();
  return syncing;
}
