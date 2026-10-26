import { clearAllPreloadedSources, preload } from 'expo-audio';
import { Image } from 'react-native';

import { wordImage } from '../assets/wordImages';
import { findStep, flatSteps, PATH_LEVELS, type FlatStep } from '../data/path';
import { mivoSentence } from '../data/path/drills';
import { stepArt } from './pathArt';
import { pathClip } from './pathVoice';

/** At most this many voice clips are held ready (they stay in memory until the next step is preloaded). */
const MAX_CLIPS = 16;
let last: string | null = null;

/**
 * Gets a step ready before the learner opens it: its pictures (cover, word pictures) and the first voice clips
 * (the words, the start of the story, Mivo's sentence). The home calls it for the step in view, a finished
 * lesson for the next one, so nothing waits to load when a lesson starts.
 */
export function preloadStep(f: FlatStep | undefined) {
  if (!f || f.step.id === last) return;
  last = f.step.id;
  const s = f.step;
  const pictures: (number | undefined)[] = [stepArt(f)];
  const texts: string[] = [];
  if (s.kind === 'reading') {
    s.episode.words.forEach((w) => {
      pictures.push(wordImage(w.en));
      texts.push(w.en);
    });
    texts.push(...s.episode.sentences.slice(0, 6).map((x) => x.en), mivoSentence(s.episode));
  } else if (s.kind === 'vocab') {
    s.words.slice(0, 10).forEach((w) => {
      pictures.push(wordImage(w.en));
      texts.push(w.en);
    });
  }
  for (const pic of pictures) {
    if (!pic) continue;
    const uri = Image.resolveAssetSource(pic)?.uri;
    if (uri) Image.prefetch(uri).catch(() => {});
  }
  clearAllPreloadedSources()
    .catch(() => {})
    .finally(() => {
      texts
        .map(pathClip)
        .filter((c): c is number => c !== undefined)
        .slice(0, MAX_CLIPS)
        .forEach((clip) => {
          preload(clip, { preferredForwardBufferDuration: 3 }).catch(() => {});
        });
    });
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
