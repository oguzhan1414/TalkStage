import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAudioPlayer, type AudioPlayer } from 'expo-audio';
import { useEffect, useState } from 'react';

/**
 * Short lesson sound effects (our own synthesised sounds in assets/sounds): a right answer,
 * a wrong one, a matched pair, a key tap and a finished part. One player per sound is kept and rewound, so a sound
 * starts at once. The learner can mute them (the speaker button in a lesson); the choice is remembered.
 */
const SOUNDS = {
  correct: require('../../assets/sounds/correct.mp3'),
  wrong: require('../../assets/sounds/wrong.mp3'),
  match: require('../../assets/sounds/match.mp3'),
  tap: require('../../assets/sounds/tap.mp3'),
  complete: require('../../assets/sounds/complete.mp3'),
} as const;

export type Sfx = keyof typeof SOUNDS;

const VOLUME: Record<Sfx, number> = { correct: 0.8, wrong: 1, match: 0.7, tap: 0.5, complete: 0.85 };
const KEY = 'spekvia.sfx.muted';
const players: Partial<Record<Sfx, AudioPlayer>> = {};
let muted = false;
const listeners = new Set<(m: boolean) => void>();

AsyncStorage.getItem(KEY)
  .then((v) => {
    muted = v === '1';
    listeners.forEach((l) => l(muted));
  })
  .catch(() => {});

function player(name: Sfx): AudioPlayer {
  let p = players[name];
  if (!p) {
    p = createAudioPlayer(SOUNDS[name]);
    p.volume = VOLUME[name];
    players[name] = p;
  }
  return p;
}

/** Load every sound up front (call when a lesson opens) so the first one is not late. */
export function preloadSfx() {
  (Object.keys(SOUNDS) as Sfx[]).forEach(player);
}

export function playSfx(name: Sfx) {
  if (muted) return;
  try {
    const p = player(name);
    p.seekTo(0).catch(() => {});
    p.play();
  } catch {
    // a missed sound effect never matters
  }
}

export function setSfxMuted(next: boolean) {
  muted = next;
  listeners.forEach((l) => l(next));
  AsyncStorage.setItem(KEY, next ? '1' : '0').catch(() => {});
}

/** The mute state for a toggle button. */
export function useSfxMuted(): [boolean, (m: boolean) => void] {
  const [m, setM] = useState(muted);
  useEffect(() => {
    listeners.add(setM);
    return () => {
      listeners.delete(setM);
    };
  }, []);
  return [m, setSfxMuted];
}
