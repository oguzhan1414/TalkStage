import AsyncStorage from '@react-native-async-storage/async-storage';

import { api } from './api';

/**
 * Sahneler roadmap completion flags (lesson_quiz_done_*, topic_chat_completed_*,
 * mission_completed_*) were pure AsyncStorage before this — real on device, but
 * lost on reinstall or invisible on a second device, unlike vocab/reading
 * progress which already lives on the backend. This makes AsyncStorage the
 * fast local cache and `/learning-flags` the durable backup, without changing
 * any of the read sites (they still just read the AsyncStorage keys below).
 */
export async function setLearningFlag(key: string): Promise<void> {
  await AsyncStorage.setItem(key, '1').catch(() => {});
  api.post('/learning-flags', { flag_key: key }).catch(() => {});
}

/** Merges server-known flags into AsyncStorage — call before reading the
 * local flags on screens that gate content on them, so a fresh install or a
 * second device recovers previously-unlocked topics instead of re-locking
 * them. */
export async function pullLearningFlags(): Promise<void> {
  try {
    const keys = await api.get<string[]>('/learning-flags');
    if (keys.length > 0) {
      await AsyncStorage.multiSet(keys.map((k) => [k, '1']));
    }
  } catch {
    // Offline or unauthenticated — keep whatever's already local.
  }
}
