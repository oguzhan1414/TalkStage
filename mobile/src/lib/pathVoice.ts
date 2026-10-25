import { createAudioPlayer, type AudioPlayer } from 'expo-audio';
import { useCallback, useEffect, useRef } from 'react';

import { PATH_AUDIO } from '../assets/pathAudio';
import { usePronunciation } from '../hooks/usePronunciation';
import { pathAudioKey } from './pathAudioKey';

/**
 * Pre-made voice clip of a learning-path text: today from the app bundle (assets/audio/path, made by
 * backend/scripts/generate_path_audio.py). A level kept on Supabase Storage later only needs this lookup to return
 * a cached download for the same key.
 */
export function pathClip(text: string): number | undefined {
  return PATH_AUDIO[pathAudioKey(text)];
}

const pause = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Plays path texts with the pre-made character voices, and falls back to the server voice (usePronunciation) for
 * texts that have no clip. `sayAll` reads several lines one after another (a piece of the story).
 */
export function usePathVoice() {
  const { pronounce, stop: stopServerVoice } = usePronunciation();
  const playerRef = useRef<AudioPlayer | null>(null);
  const runRef = useRef(0);

  const stop = useCallback(() => {
    runRef.current += 1;
    const player = playerRef.current;
    playerRef.current = null;
    if (player) {
      try {
        player.pause();
      } catch {
        // already stopped
      }
      player.remove();
    }
    stopServerVoice();
  }, [stopServerVoice]);

  // Leaving the screen silences the voice.
  useEffect(() => stop, [stop]);

  const playOne = useCallback(
    (text: string, rate: number): Promise<void> =>
      new Promise((resolve) => {
        const clip = pathClip(text);
        if (!clip) {
          // No clip: the server voice; wait about as long as the line takes so a sequence does not overlap.
          pronounce(text, { rate })
            .catch(() => {})
            .finally(() => setTimeout(resolve, Math.max(900, text.split(/\s+/).length * 420) / rate));
          return;
        }
        const player = createAudioPlayer(clip);
        playerRef.current = player;
        let done = false;
        const finish = () => {
          if (done) return;
          done = true;
          sub.remove();
          if (playerRef.current === player) playerRef.current = null;
          player.remove();
          resolve();
        };
        const sub = player.addListener('playbackStatusUpdate', (status) => {
          if (status.didJustFinish) finish();
        });
        player.shouldCorrectPitch = true;
        player.setPlaybackRate(rate, 'high');
        player.play();
        setTimeout(finish, 20000);
      }),
    [pronounce]
  );

  /** Say one text (stops whatever is playing). */
  const say = useCallback(
    async (text: string, options?: { rate?: number }) => {
      stop();
      await playOne(text, options?.rate ?? 1);
    },
    [stop, playOne]
  );

  /** Say several texts in a row, with a short breath between them. */
  const sayAll = useCallback(
    async (texts: string[], options?: { rate?: number }) => {
      stop();
      const run = runRef.current;
      for (const text of texts) {
        if (runRef.current !== run) return;
        await playOne(text, options?.rate ?? 1);
        if (runRef.current !== run) return;
        await pause(250);
      }
    },
    [stop, playOne]
  );

  return { say, sayAll, stop };
}
