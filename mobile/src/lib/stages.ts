import { CEFR_CURRICULUM, type LevelCurriculum } from '@talkstage/shared-data/curriculumData';
import { CEFR_LEVELS } from '../constants/cefr';
import { t } from '../i18n';
import {
  buildTaskQueueForLevel,
  isLevelCoreDone,
  type CurriculumTask,
  type CurriculumTaskSignals,
  type ReadingPassageSignal,
} from './curriculumTasks';
import { scenesForLevel, writingSignalsForLevel } from './planSignals';

/**
 * Üç aşama: Başlangıç (A1–A2), Orta (B1–B2), İleri (C1–C2). Kullanıcı aşamayı görür, CEFR küçük bir etikettir;
 * aşama içinde seviye geçişi sessizdir (A1 konuları bitince `cefr_level` kendiliğinden A2 olur).
 * Okuma, kelime ve sahne verileri CEFR etiketli kalır; yalnızca yol (Bugün) ve profil aşama gösterir.
 */
export type StageId = 'baslangic' | 'orta' | 'ileri';

export const STAGE_IDS: readonly StageId[] = ['baslangic', 'orta', 'ileri'];

export const STAGE_LEVELS: Record<StageId, readonly string[]> = {
  baslangic: ['A1', 'A2'],
  orta: ['B1', 'B2'],
  ileri: ['C1', 'C2'],
};

export const STAGE_COLOR: Record<StageId, string> = {
  baslangic: '#10B981',
  orta: '#6366F1',
  ileri: '#EC4899',
};

export function stageOfLevel(level: string | null | undefined): StageId {
  const lvl = (level ?? 'A1').toUpperCase();
  return STAGE_IDS.find((id) => STAGE_LEVELS[id].includes(lvl)) ?? 'baslangic';
}

export function stageTitle(id: StageId): string {
  return id === 'baslangic' ? t("Başlangıç") : id === 'orta' ? t("Orta") : t("İleri");
}

/** "A1–A2": the small CEFR tag shown next to a stage name. */
export function stageRange(id: StageId): string {
  const levels = STAGE_LEVELS[id];
  return `${levels[0]}–${levels[levels.length - 1]}`;
}

export function nextStage(id: StageId): StageId | null {
  return STAGE_IDS[STAGE_IDS.indexOf(id) + 1] ?? null;
}

/** First CEFR level of a stage: where a learner lands when they move on to it. */
export function firstLevelOf(id: StageId): string {
  return STAGE_LEVELS[id][0];
}

const curriculumCache: Partial<Record<StageId, LevelCurriculum>> = {};

/** A stage as one continuous road: its levels' topics, units and (from the last level) the closing challenge. */
export function stageCurriculum(id: StageId): LevelCurriculum {
  const cached = curriculumCache[id];
  if (cached) return cached;
  const parts = STAGE_LEVELS[id].map((lvl) => CEFR_CURRICULUM[lvl]).filter(Boolean);
  const last = parts[parts.length - 1];
  const merged: LevelCurriculum = {
    level: stageRange(id),
    title: stageTitle(id),
    cefrDesc: parts[0]?.cefrDesc ?? '',
    objective: parts[0]?.objective ?? '',
    targetDays: parts.reduce((sum, p) => sum + p.targetDays, 0),
    topics: parts.flatMap((p) => p.topics),
    units: parts.flatMap((p) => p.units),
    bossChallenge: last.bossChallenge,
  };
  curriculumCache[id] = merged;
  return merged;
}

export type StageSignals = Omit<
  CurriculumTaskSignals,
  'readingPassagesForLevel' | 'scenesForLevel' | 'writingTasksForLevel'
>;

/**
 * The day-by-day path of a whole stage: every level's own queue, one after the other.
 * Inside the learner's own stage the levels below their current level count as done
 * (they were finished on the way, or skipped by the starting level they picked).
 */
export function buildStageQueue(
  stage: StageId,
  userLevel: string,
  signals: StageSignals,
  readingsFor: (level: string) => ReadingPassageSignal[]
): CurriculumTask[] {
  const userIdx = Math.max(0, CEFR_LEVELS.indexOf(userLevel));
  const ownStage = stageOfLevel(userLevel) === stage;
  const queue: CurriculumTask[] = [];
  for (const lvl of STAGE_LEVELS[stage]) {
    const curriculum = CEFR_CURRICULUM[lvl];
    if (!curriculum) continue;
    const levelQueue = buildTaskQueueForLevel(
      curriculum.topics,
      {
        ...signals,
        readingPassagesForLevel: readingsFor(lvl),
        scenesForLevel: scenesForLevel(lvl),
        writingTasksForLevel: writingSignalsForLevel(lvl),
      },
      lvl
    );
    if (ownStage && CEFR_LEVELS.indexOf(lvl) < userIdx) {
      for (const task of levelQueue) task.done = true;
    }
    queue.push(...levelQueue);
  }
  return queue;
}

/**
 * Silent level step inside a stage: the first level (from the current one) whose core tasks are not all
 * done. Returns the current level when nothing changes. Never crosses into the next stage.
 */
export function earnedLevel(currentLevel: string, stageQueue: CurriculumTask[]): string {
  const levels = STAGE_LEVELS[stageOfLevel(currentLevel)];
  const start = Math.max(0, levels.indexOf(currentLevel));
  let earned = levels[start];
  for (let i = start; i < levels.length; i += 1) {
    const levelQueue = stageQueue.filter((tk) => tk.topic.code.startsWith(`${levels[i]}_`));
    if (levelQueue.length === 0 || !isLevelCoreDone(levelQueue)) return levels[i];
    earned = levels[Math.min(i + 1, levels.length - 1)];
  }
  return earned;
}
