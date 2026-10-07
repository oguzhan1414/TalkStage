import AsyncStorage from '@react-native-async-storage/async-storage';

import type { ScenarioEntry } from '@talkstage/shared-data/scenariosData';

import { CEFR_LEVELS } from '../constants/cefr';

/**
 * Sahneler sekmesi: serbest sahne kütüphanesi + yumuşak seviye kilidi.
 *  - seviye ≤ kullanıcı seviyesi  → 'open'
 *  - bir üst seviye               → 'hard' (açık, "zor" etiketli)
 *  - iki+ üst seviye              → 'locked' (dokununca "X'i bitirince açılır")
 * Tamamlanan sahneler `scene_completed_<id>` bayrağıyla tutulur (AsyncStorage +
 * `/learning-flags` senkronu, bkz. learningFlags.ts).
 */
export type SceneAccess = 'open' | 'hard' | 'locked';

export const SCENE_FLAG_PREFIX = 'scene_completed_';
export const SCENE_STAR2_PREFIX = 'scene_star2_';
export const SCENE_STAR3_PREFIX = 'scene_star3_';

/** Yıldızlar: 1 = videoyu bitirdi, 2 = canlı Mivo sahnesini oynadı, 3 = canlı sahnede hedefleri hatasız denecek kadar temiz tamamladı. */
export type SceneStars = Record<string, 0 | 1 | 2 | 3>;

function levelIndex(level: string | null | undefined): number {
  const i = CEFR_LEVELS.indexOf((level ?? 'A1').toUpperCase());
  return i < 0 ? 0 : i;
}

export function sceneAccess(sceneLevel: string | null | undefined, userLevel: string | null | undefined): SceneAccess {
  const diff = levelIndex(sceneLevel) - levelIndex(userLevel);
  if (diff <= 0) return 'open';
  if (diff === 1) return 'hard';
  return 'locked';
}

/** Kilitli bir sahnenin açılması için bitirilmesi gereken seviye (sahne seviyesinin bir altı). */
export function levelToFinishFor(sceneLevel: string | null | undefined): string {
  return CEFR_LEVELS[Math.max(0, levelIndex(sceneLevel) - 1)];
}

export async function loadSceneStars(ids: readonly string[]): Promise<SceneStars> {
  const out: SceneStars = {};
  if (ids.length === 0) return out;
  try {
    const keys = ids.flatMap((id) => [
      `${SCENE_FLAG_PREFIX}${id}`,
      `${SCENE_STAR2_PREFIX}${id}`,
      `${SCENE_STAR3_PREFIX}${id}`,
    ]);
    const map = new Map(await AsyncStorage.multiGet(keys));
    for (const id of ids) {
      const has = (prefix: string) => map.get(`${prefix}${id}`) === '1';
      out[id] = has(SCENE_STAR3_PREFIX) ? 3 : has(SCENE_STAR2_PREFIX) ? 2 : has(SCENE_FLAG_PREFIX) ? 1 : 0;
    }
  } catch {
    // keep empty -> everything shows as not played
  }
  return out;
}

/**
 * "Senin için sıradaki" / "Günün sahnesi": kullanıcının seviyesindeki ilk
 * hiç oynanmamış sahne; yoksa alt seviyelerdeki, yoksa bir üst (zor) seviye.
 * Hepsi oynandıysa en az yıldızlı sahne (yıldız tamamlamak için tekrar).
 */
export function pickSceneOfTheDay(
  scenes: readonly ScenarioEntry[],
  userLevel: string | null | undefined,
  stars: SceneStars
): ScenarioEntry | undefined {
  const userIdx = levelIndex(userLevel);
  const starsOf = (s: ScenarioEntry) => stars[s.id] ?? 0;
  const open = scenes.filter((s) => sceneAccess(s.level, userLevel) !== 'locked');
  const rank = (s: ScenarioEntry) => {
    const diff = levelIndex(s.level) - userIdx;
    // Kendi seviyesi önce, sonra yakın alt seviyeler, en son "zor" üst seviye.
    return diff === 0 ? 0 : diff < 0 ? 1 + Math.abs(diff) : 10;
  };
  const unplayed = open.filter((s) => starsOf(s) === 0).sort((a, b) => rank(a) - rank(b));
  if (unplayed.length > 0) return unplayed[0];
  const improvable = open.filter((s) => starsOf(s) < 3).sort((a, b) => starsOf(a) - starsOf(b) || rank(a) - rank(b));
  return improvable[0] ?? open[0] ?? scenes[0];
}
