import { createAudioPlayer, type AudioPlayer } from 'expo-audio';
import * as Speech from 'expo-speech';
import { useCallback, useEffect, useRef } from 'react';

import { PATH_AUDIO } from '../assets/pathAudio';
import { WORD_AUDIO } from '../assets/wordAudio';
import { pathAudioKey } from '../lib/pathAudioKey';

/**
 * Word Rooms speak in Mivo's voice from clips shipped in the app (Cartesia, made once by
 * backend/scripts/generate_word_audio.py): free and offline. A text without a clip (e.g. a room added later and not
 * generated yet) falls back to the phone's own English voice, so the room is never silent.
 */

let cachedVoice: string | null | undefined;

/** The best installed US/UK English voice, or null to let the system pick its default. */
async function pickVoice(): Promise<string | null> {
  if (cachedVoice !== undefined) return cachedVoice;
  try {
    const voices = await Speech.getAvailableVoicesAsync();
    const english = voices.filter((v) => /^en[-_](US|GB)$/i.test(v.language));
    const best = english.find((v) => v.quality === Speech.VoiceQuality.Enhanced) ?? english.find((v) => /US/i.test(v.language)) ?? english[0];
    cachedVoice = best?.identifier ?? null;
  } catch {
    cachedVoice = null;
  }
  return cachedVoice;
}

export function useRoomSpeech() {
  const playerRef = useRef<AudioPlayer | null>(null);

  const stop = useCallback(() => {
    Speech.stop().catch(() => {});
    if (playerRef.current) {
      try {
        playerRef.current.remove();
      } catch {
        // already released
      }
      playerRef.current = null;
    }
  }, []);

  // Leaving the screen silences the voice.
  useEffect(() => stop, [stop]);

  const pronounce = useCallback(
    async (text: string, options?: { rate?: number }) => {
      const clean = text.trim();
      if (!clean) return;
      stop();
      // A single word is read a little slower than a sentence so it is easy to catch.
      const rate = options?.rate ?? (clean.split(/\s+/).length <= 2 ? 0.9 : 1);
      const key = pathAudioKey(clean);
      const clip = WORD_AUDIO[key] ?? PATH_AUDIO[key];
      if (clip !== undefined) {
        const player = createAudioPlayer(clip);
        playerRef.current = player;
        player.shouldCorrectPitch = true;
        player.setPlaybackRate(rate, 'high');
        player.play();
        return;
      }
      const voice = await pickVoice();
      Speech.speak(clean, { language: 'en-US', rate: rate * 0.9, pitch: 1, ...(voice ? { voice } : {}) });
    },
    [stop]
  );

  return { pronounce, stop };
}
