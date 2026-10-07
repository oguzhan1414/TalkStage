import AsyncStorage from '@react-native-async-storage/async-storage';

import { api } from './api';

/**
 * Sahneler roadmap completion flags (lesson_quiz_done_*, topic_chat_completed_*,
 * mission_completed_*, scene stars …) were pure AsyncStorage before this — real
 * on device, but lost on reinstall or invisible on a second device, unlike
 * vocab/reading progress which already lives on the backend. This makes
 * AsyncStorage the fast local cache and `/learning-flags` the durable backup,
 * without changing any of the read sites (they still just read the AsyncStorage
 * keys below).
 *
 * Two guarantees on top of that (release audit B02/B05):
 *  - **Per-account:** the local keys carry no user id, so the cache is tagged
 *    with its owner (`learning_flags_owner`); when a different account signs in
 *    (or the user signs out/deletes the account) every local learning key is
 *    wiped, so account B never sees account A's progress.
 *  - **Retry:** a flag whose upload failed (offline, 401, 5xx) stays in a small
 *    outbox and is re-sent on the next `pullLearningFlags()`.
 */
const OWNER_KEY = 'learning_flags_owner';
const OUTBOX_KEY = 'learning_flags_outbox';

/** Every local, per-user learning key written through `setLearningFlag` or next to it. */
const LEARNING_KEY_PREFIXES = [
  'lesson_quiz_done_',
  'topic_chat_completed_',
  'mission_completed_',
  'podcast_completed_',
  'unified_lesson_done_',
  'pron_practiced_',
  'scene_completed_',
  'scene_star2_',
  'scene_star3_',
  'scene_last_twist_',
  '@talkstage_custom_vocab_decks',
  '@talkstage_vocab_deck_progress',
];

async function readOutbox(): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(OUTBOX_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((k): k is string => typeof k === 'string') : [];
  } catch {
    return [];
  }
}

async function writeOutbox(keys: string[]): Promise<void> {
  try {
    if (keys.length === 0) await AsyncStorage.removeItem(OUTBOX_KEY);
    else await AsyncStorage.setItem(OUTBOX_KEY, JSON.stringify(keys));
  } catch {
    // best effort
  }
}

async function removeFromOutbox(key: string): Promise<void> {
  await writeOutbox((await readOutbox()).filter((k) => k !== key));
}

export async function setLearningFlag(key: string): Promise<void> {
  await AsyncStorage.setItem(key, '1').catch(() => {});
  const outbox = await readOutbox();
  if (!outbox.includes(key)) await writeOutbox([...outbox, key]);
  api
    .post('/learning-flags', { flag_key: key })
    .then(() => removeFromOutbox(key))
    .catch(() => {
      // stays in the outbox; retried by flushLearningFlagOutbox()
    });
}

/** Re-sends flags whose upload failed earlier. Safe to call often. */
export async function flushLearningFlagOutbox(): Promise<void> {
  const outbox = await readOutbox();
  for (const key of outbox) {
    try {
      await api.post('/learning-flags', { flag_key: key });
      await removeFromOutbox(key);
    } catch {
      return; // offline/unauthenticated — try again next time
    }
  }
}

/** Merges server-known flags into AsyncStorage — call before reading the
 * local flags on screens that gate content on them, so a fresh install or a
 * second device recovers previously-unlocked topics instead of re-locking
 * them. */
export async function pullLearningFlags(): Promise<void> {
  await flushLearningFlagOutbox();
  try {
    const keys = await api.get<string[]>('/learning-flags');
    if (keys.length > 0) {
      await AsyncStorage.multiSet(keys.map((k) => [k, '1']));
    }
  } catch {
    // Offline or unauthenticated — keep whatever's already local.
  }
}

/** Removes every local learning key + the outbox/owner tag (logout, account deletion, account switch). */
export async function clearLocalLearningData(): Promise<void> {
  try {
    const all = await AsyncStorage.getAllKeys();
    const doomed = all.filter(
      (k) => k === OWNER_KEY || k === OUTBOX_KEY || LEARNING_KEY_PREFIXES.some((p) => k.startsWith(p))
    );
    if (doomed.length > 0) await AsyncStorage.multiRemove(doomed);
  } catch {
    // best effort
  }
}

/**
 * Called whenever a session resolves. If the cached learning data belongs to a
 * different account, it is wiped before any screen reads it. A cache with no
 * owner tag (installs from before this fix) is adopted by the current account.
 */
export async function reconcileLearningFlagOwner(userId: string | null | undefined): Promise<void> {
  if (!userId) return;
  try {
    const owner = await AsyncStorage.getItem(OWNER_KEY);
    if (owner && owner !== userId) await clearLocalLearningData();
    if (owner !== userId) await AsyncStorage.setItem(OWNER_KEY, userId);
  } catch {
    // best effort
  }
}
