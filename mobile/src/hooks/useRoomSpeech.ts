import * as Speech from 'expo-speech';
import { useCallback, useEffect } from 'react';

/**
 * Word Rooms speak with the phone's own English voice: free, offline and no audio files to ship, unlike
 * `usePronunciation` (backend TTS, paid per request). Same call shape as `pronounce` so screens can swap.
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
  const stop = useCallback(() => {
    Speech.stop().catch(() => {});
  }, []);

  // Leaving the screen silences the voice.
  useEffect(() => stop, [stop]);

  const pronounce = useCallback(async (text: string, options?: { rate?: number }) => {
    const clean = text.trim();
    if (!clean) return;
    // A single word is read a little slower than a sentence so it is easy to catch.
    const rate = options?.rate ?? (clean.split(/\s+/).length <= 2 ? 0.8 : 0.9);
    const voice = await pickVoice();
    Speech.stop().catch(() => {});
    Speech.speak(clean, { language: 'en-US', rate, pitch: 1, ...(voice ? { voice } : {}) });
  }, []);

  return { pronounce, stop };
}
