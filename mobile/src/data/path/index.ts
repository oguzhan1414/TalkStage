import { A1 } from './a1';
import { A2 } from './a2';
import { B1 } from './b1';
import type { PathLevel, PathStep, PathUnit } from './types';

export * from './types';

/** Levels written so far (A2–C2 follow the same shape). */
export const PATH_LEVELS: PathLevel[] = [A1, A2, B1];

export function pathLevel(id: string | null | undefined): PathLevel {
  return PATH_LEVELS.find((l) => l.id === id) ?? A1;
}

export type FlatStep = { step: PathStep; unit: PathUnit; index: number; indexInUnit: number };

/** Every step of a level in order, with its unit. */
export function flatSteps(level: PathLevel): FlatStep[] {
  const out: FlatStep[] = [];
  for (const unit of level.units) {
    unit.steps.forEach((step, indexInUnit) => out.push({ step, unit, index: out.length, indexInUnit }));
  }
  return out;
}

export function findStep(id: string): FlatStep | undefined {
  for (const level of PATH_LEVELS) {
    const hit = flatSteps(level).find((f) => f.step.id === id);
    if (hit) return hit;
  }
  return undefined;
}
