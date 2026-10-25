import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';

import { flatSteps, type FlatStep, type PathLevel } from '../data/path';

/**
 * Progress on the new learning path, kept on the device for now: stars per finished step, the parts finished of a
 * reading lesson that is still open, and the scene steps the learner chose to skip. (Moves to the server once the path leaves the preview branch.)
 */
const KEY = 'spekvia.path.v1';

export type PathProgress = {
  /** 1–3 for a finished reading/vocab step; scenes count as done with 3. */
  stars: Record<string, number>;
  /** Scene steps skipped for later: they never block the road. */
  skipped: Record<string, true>;
  /**
   * Reading lessons are three parts (words, grammar, story), one star each: the parts finished so far. The step
   * counts as done (3 stars) only after the third part.
   */
  parts: Record<string, number>;
};

const EMPTY: PathProgress = { stars: {}, skipped: {}, parts: {} };

export async function loadPathProgress(): Promise<PathProgress> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? { ...EMPTY, ...(JSON.parse(raw) as PathProgress) } : EMPTY;
  } catch {
    return EMPTY;
  }
}

async function save(p: PathProgress) {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    // best effort
  }
}

/** Keeps the best result of a step. */
export async function recordStep(stepId: string, stars: number): Promise<void> {
  const p = await loadPathProgress();
  p.stars = { ...p.stars, [stepId]: Math.max(stars, p.stars[stepId] ?? 0) };
  const { [stepId]: _, ...rest } = p.skipped;
  p.skipped = rest;
  await save(p);
}

/** One part of a reading lesson finished (1–3, in order); the third one finishes the step. */
export async function recordPart(stepId: string, part: number): Promise<void> {
  const p = await loadPathProgress();
  p.parts = { ...p.parts, [stepId]: Math.max(part, p.parts[stepId] ?? 0) };
  if (part >= 3) p.stars = { ...p.stars, [stepId]: 3 };
  await save(p);
}

/** Stars to show on a step: its result, or the parts of an unfinished reading lesson. */
export function starsOf(p: PathProgress, stepId: string) {
  return Math.max(p.stars[stepId] ?? 0, p.parts[stepId] ?? 0);
}

export async function skipStep(stepId: string): Promise<void> {
  const p = await loadPathProgress();
  p.skipped = { ...p.skipped, [stepId]: true };
  await save(p);
}

export function isDone(p: PathProgress, stepId: string) {
  return (p.stars[stepId] ?? 0) > 0;
}

/** Done or skipped: the road moves past it. */
export function isPassed(p: PathProgress, stepId: string) {
  return isDone(p, stepId) || !!p.skipped[stepId];
}

/** The first step the learner has not passed yet (the "next" card), or the last written one when all are done. */
export function currentStep(level: PathLevel, p: PathProgress): FlatStep {
  const steps = flatSteps(level);
  const next = steps.find((f) => !isPassed(p, f.step.id));
  return next ?? steps[steps.length - 1];
}

/** Reloads every time the screen comes back into focus (after finishing a lesson). */
export function usePathProgress() {
  const [progress, setProgress] = useState<PathProgress | null>(null);
  const reload = useCallback(() => {
    loadPathProgress().then(setProgress);
  }, []);
  useFocusEffect(
    useCallback(() => {
      let alive = true;
      loadPathProgress().then((p) => alive && setProgress(p));
      return () => {
        alive = false;
      };
    }, [])
  );
  return { progress, reload };
}
