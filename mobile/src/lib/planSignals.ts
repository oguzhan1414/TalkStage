import AsyncStorage from '@react-native-async-storage/async-storage';

import { SCENARIOS } from '@talkstage/shared-data/scenariosData';

import { WRITING_DONE_PREFIX, writingTasks, writingTasksForLevel } from '../data/writingTasks';
import type { SceneStars } from './sceneProgress';

/**
 * The extra inputs the plan-aware Bugün path needs (see `buildTaskQueueForLevel`):
 * the level's ready voice scenes, which of them were played live, and the writing tasks.
 */

/** Scenes with a ready video, in library order — same list the Scenes tab and "Günün Sahnesi" use. */
export const READY_SCENES = SCENARIOS.filter((sc) => sc.videoSteps && sc.videoSteps.length > 0 && sc.videoReady);

export function scenesForLevel(level: string): { id: string; title: string }[] {
  return READY_SCENES.filter((sc) => sc.level === level).map((sc) => ({ id: sc.id, title: sc.titleTr }));
}

/** A scene counts as done on the path once the live Mivo scene was played (2+ stars), not just the video. */
export function playedSceneIds(stars: SceneStars): Set<string> {
  return new Set(Object.entries(stars).filter(([, v]) => v >= 2).map(([id]) => id));
}

/** The level's writing tasks with their topic, slot 1 before slot 2 (the path takes a topic's tasks in that order). */
export function writingSignalsForLevel(level: string): { id: string; title: string; topicCode: string }[] {
  return writingTasksForLevel(level)
    .sort((a, b) => a.slot - b.slot)
    .map((w) => ({ id: w.id, title: w.title, topicCode: w.topicCode }));
}

export async function loadCompletedWritingIds(): Promise<Set<string>> {
  try {
    const pairs = await AsyncStorage.multiGet(writingTasks().map((w) => `${WRITING_DONE_PREFIX}${w.id}`));
    return new Set(pairs.filter(([, v]) => v === '1').map(([k]) => k.replace(WRITING_DONE_PREFIX, '')));
  } catch {
    return new Set();
  }
}
