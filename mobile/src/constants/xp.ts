import { t } from '../i18n';

/**
 * XP shown in the UI for ONE completed activity (lesson quiz aced, podcast lesson, topic chat, scene, 3D scenario).
 * Mirrors `ACTIVITY_XP` in `backend/app/services/scorecard.py` — the server is what actually grants it
 * (`POST /progress/log-practice`), so change both together. Never print an XP number the server does not grant.
 */
export const ACTIVITY_XP = 10;

/**
 * "Friendship with Mivo" levels. Purely a function of total XP (no extra table, no server state):
 * level N starts at LEVEL_STARTS[N - 1]. At ~15–50 XP a day, level 2 comes in the first week and level 5 in about a month.
 */
const LEVEL_STARTS = [0, 100, 300, 600, 1000, 1600, 2400, 3500] as const;

function levelNames(): string[] {
  return [
    t("Yeni Tanışma"),
    t("Merhabalaşma"),
    t("Sohbet Arkadaşı"),
    t("Yol Arkadaşı"),
    t("Sahne Dostu"),
    t("Sahne Yıldızı"),
    t("Akıcı Konuşmacı"),
    t("Mivo'nun Ortağı"),
  ];
}

export type XpLevelInfo = {
  /** 1-based level number. */
  level: number;
  name: string;
  xp: number;
  /** XP at which the next level starts, or null at the top level. */
  nextAt: number | null;
  /** 0..1 progress inside the current level (1 at the top level). */
  progress: number;
};

export function xpLevelInfo(xp: number | null | undefined): XpLevelInfo {
  const safe = Math.max(0, Math.floor(xp ?? 0));
  let index = 0;
  for (let i = 0; i < LEVEL_STARTS.length; i++) {
    if (safe >= LEVEL_STARTS[i]) index = i;
  }
  const start = LEVEL_STARTS[index];
  const nextAt = index < LEVEL_STARTS.length - 1 ? LEVEL_STARTS[index + 1] : null;
  return {
    level: index + 1,
    name: levelNames()[index],
    xp: safe,
    nextAt,
    progress: nextAt ? (safe - start) / (nextAt - start) : 1,
  };
}
