import AsyncStorage from '@react-native-async-storage/async-storage';

import { api } from './api';
import { requestBadgeSync } from './badges';

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
  'writing_done_',
  'learning_plan_local',
  'progress_v2_migrated',
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
    .then(() => {
      void removeFromOutbox(key);
      // A finished scene / podcast / lesson / pronunciation set may have earned a badge.
      requestBadgeSync({ afterActivity: true });
    })
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

/**
 * Old curriculum -> new curriculum (docs/yeni-mufredat.md): a learner who had finished an old topic gets the new
 * topic that teaches the same structure marked as finished too. Only within the same CEFR level (an old A2 topic
 * never completes a B1 topic). Old topics without a counterpart (phrasal verbs, will/going to split across levels)
 * are skipped.
 */
const OLD_TO_NEW_TOPIC: Record<string, number> = {
  A1_G01: 1, A1_G02: 2, A1_G03: 3, A1_G04: 5, A1_G05: 6, A1_G06: 9, A1_G07: 11, A1_G08: 7, A1_G09: 10, A1_G10: 12, A1_G11: 13,
  A2_G01: 16, A2_G02: 19, A2_G03: 19, A2_G04: 17, A2_G05: 20, A2_G07: 22, A2_G08: 18, A2_G10: 23,
  B1_G01: 25, B1_G02: 27, B1_G03: 28, B1_G04: 30, B1_G05: 31, B1_G06: 29, B1_G07: 26, B1_G08: 32, B1_G09: 34,
  B2_G01: 35, B2_G02: 37, B2_G03: 36, B2_G04: 42, B2_G05: 40, B2_G06: 38, B2_G07: 39,
  C1_G01: 43, C1_G02: 45, C1_G03: 47, C1_G04: 46, C2_G01: 43,
};

function levelOfNewTopic(no: number): string {
  if (no <= 13) return 'A1';
  if (no <= 23) return 'A2';
  if (no <= 34) return 'B1';
  if (no <= 42) return 'B2';
  if (no <= 46) return 'C1';
  return 'C2';
}

function newTopicCode(oldCode: string): string | null {
  const no = OLD_TO_NEW_TOPIC[oldCode];
  if (no === undefined || levelOfNewTopic(no) !== oldCode.slice(0, 2)) return null;
  return `${oldCode.slice(0, 2)}_N${String(no).padStart(2, '0')}`;
}

/**
 * One-time, local-only carry-over of finished old topics to their new counterparts. It does not upload anything
 * (the old flags are still on the server, so another device repeats the carry-over) and does not touch the
 * badge counters.
 */
export async function migrateOldProgressToV2(): Promise<void> {
  try {
    if ((await AsyncStorage.getItem('progress_v2_migrated')) === '1') return;
    const keys = await AsyncStorage.getAllKeys();
    const have = new Set(keys);
    const add: [string, string][] = [];
    for (const key of keys) {
      const m = /^(lesson_quiz_done_|topic_chat_completed_)([A-C]\d_G\d+)(_review)?$/.exec(key);
      if (!m) continue;
      const isReview = m[1] === 'topic_chat_completed_';
      if (isReview !== Boolean(m[3])) continue;
      const code = newTopicCode(m[2]);
      if (!code) continue;
      const next = `${m[1]}${code}${m[3] ?? ''}`;
      if (!have.has(next)) {
        have.add(next);
        add.push([next, '1']);
      }
    }
    if (add.length > 0) await AsyncStorage.multiSet(add);
    await AsyncStorage.setItem('progress_v2_migrated', '1');
  } catch {
    // best effort: tries again on the next pull
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
  await migrateOldProgressToV2();
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
