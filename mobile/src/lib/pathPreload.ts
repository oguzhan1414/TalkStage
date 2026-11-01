import { Image } from 'react-native';

import { wordImage } from '../assets/wordImages';
import { findStep, flatSteps, PATH_LEVELS, type FlatStep } from '../data/path';
import { stepArt } from './pathArt';

let last: string | null = null;

/**
 * Gets a step ready before the learner opens it: its pictures (cover, word pictures). The home calls it for the step
 * in view, a finished lesson for the next one, so no picture pops in late. Voice clips are not preloaded: they are in
 * the app and start at once, and expo-audio's preload cache only added a way for a clip to stay silent.
 */
export function preloadStep(f: FlatStep | undefined) {
  if (!f || f.step.id === last) return;
  last = f.step.id;
  const s = f.step;
  const pictures: (number | undefined)[] = [stepArt(f)];
  if (s.kind === 'reading') {
    s.episode.words.forEach((w) => pictures.push(wordImage(w.en)));
  } else if (s.kind === 'vocab') {
    s.words.slice(0, 10).forEach((w) => pictures.push(wordImage(w.en)));
  }
  for (const pic of pictures) {
    if (!pic) continue;
    const uri = Image.resolveAssetSource(pic)?.uri;
    if (uri) Image.prefetch(uri).catch(() => {});
  }
}

/** The step after this one in its level (for getting the next lesson ready at the end of this one). */
export function nextStepOf(stepId: string): FlatStep | undefined {
  const here = findStep(stepId);
  if (!here) return undefined;
  for (const level of PATH_LEVELS) {
    const steps = flatSteps(level);
    if (steps[here.index]?.step.id === stepId) return steps[here.index + 1];
  }
  return undefined;
}
