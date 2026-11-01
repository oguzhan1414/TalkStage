import { PATH_IMAGES } from '../assets/pathImages';
import type { FlatStep } from '../data/path';
import { findWordRoom } from '../data/wordRooms';

/** The picture of a path step: the episode or word-set illustration, or the Word Room photo; undefined for Mivo. */
export function stepArt(f: FlatStep): number | undefined {
  const level = f.unit.id.split('-')[0];
  const s = f.step;
  if (s.kind === 'reading') return PATH_IMAGES[`${level}_e${String(s.episode.number).padStart(2, '0')}`];
  if (s.kind === 'vocab') return PATH_IMAGES[`${level}_w${f.unit.number}`];
  if (s.kind === 'room') return findWordRoom(s.roomId)?.thumb;
  return undefined;
}
