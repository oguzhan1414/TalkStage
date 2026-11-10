import { createAudioPlayer, type AudioPlayer } from 'expo-audio';
import { useCallback, useEffect, useRef } from 'react';

import { PATH_AUDIO } from '../assets/pathAudio';
import { usePronunciation } from '../hooks/usePronunciation';
import { ensurePlaybackMode } from './audioMode';
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
        let attempt = 0;
        let done = false;
        let player: AudioPlayer;
        const timers: ReturnType<typeof setTimeout>[] = [];
        let sub: { remove: () => void } | null = null;
        const release = () => {
          sub?.remove();
          sub = null;
          if (playerRef.current === player) playerRef.current = null;
          try {
            player.remove();
          } catch {
            // stop() released it already
          }
        };
        const finish = () => {
          if (done) return;
          done = true;
          timers.forEach(clearTimeout);
          release();
          resolve();
        };
        const start = () => {
          let started = false;
          let ending = false;
          player = createAudioPlayer(clip);
          playerRef.current = player;
          player.shouldCorrectPitch = true;
          sub = player.addListener('playbackStatusUpdate', (status) => {
            if (status.playing) started = true;
            if (status.didJustFinish) finish();
            // The "finished" event is sometimes missed: also end by the clip's own length.
            if (status.isLoaded && status.duration > 0 && !ending) {
              ending = true;
              timers.push(setTimeout(finish, (status.duration * 1000) / rate + 700));
            }
          });
          player.setPlaybackRate(rate, 'high');
          player.play();
          // Not playing after a moment (a player that never got going): try once more with a fresh one.
          timers.push(
            setTimeout(() => {
              if (done || started || playerRef.current !== player) return;
              if (attempt++ === 0) {
                release();
                start();
              } else finish();
            }, 1200)
          );
        };
        start();
        timers.push(setTimeout(finish, 20000));
      }),
    [pronounce]
  );

  /** Say one text (stops whatever is playing). */
  const say = useCallback(
    async (text: string, options?: { rate?: number }) => {
      stop();
      ensurePlaybackMode();
      await playOne(text, options?.rate ?? 1);
    },
    [stop, playOne]
  );

  /** Say several texts in a row, with a short breath between them. */
  const sayAll = useCallback(
    /** `onLine`: the index of the line being read, then null when the reading ends or is stopped. */
    async (texts: string[], options?: { rate?: number; onLine?: (index: number | null) => void }) => {
      stop();
      const run = runRef.current;
      ensurePlaybackMode();
      try {
        for (let i = 0; i < texts.length; i += 1) {
          if (runRef.current !== run) return;
          options?.onLine?.(i);
          await playOne(texts[i], options?.rate ?? 1);
          if (runRef.current !== run) return;
          await pause(250);
        }
      } finally {
        options?.onLine?.(null);
      }
    },
    [stop, playOne]
  );

  return { say, sayAll, stop };
}
