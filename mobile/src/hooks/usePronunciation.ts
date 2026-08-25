import { createAudioPlayer, type AudioPlayer } from 'expo-audio';
import { useCallback, useRef, useState } from 'react';
import { Platform } from 'react-native';

import { api } from '../lib/api';
import { arrayBufferToBase64 } from '../lib/base64';

/**
 * Robust Text-to-Speech pronunciation player with genuine Pause / Resume / Speed Rate support.
 */
export function usePronunciation() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const playerRef = useRef<AudioPlayer | null>(null);
  const utteranceRef = useRef<any | null>(null);
  const requestIdRef = useRef(0);
  const safetyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearSafetyTimeout = () => {
    if (safetyTimeoutRef.current) {
      clearTimeout(safetyTimeoutRef.current);
      safetyTimeoutRef.current = null;
    }
  };

  const stop = useCallback(() => {
    requestIdRef.current += 1;
    clearSafetyTimeout();
    if (Platform.OS === 'web' && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (playerRef.current) {
      const player = playerRef.current;
      playerRef.current = null;
      try {
        player.pause();
      } catch {
        // Safe catch
      }
      player.remove();
    }
    utteranceRef.current = null;
    setIsPlaying(false);
    setIsPaused(false);
  }, []);

  const pause = useCallback(() => {
    if (Platform.OS === 'web' && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
        window.speechSynthesis.pause();
        setIsPaused(true);
        return;
      }
    }
    if (playerRef.current) {
      try {
        playerRef.current.pause();
        setIsPaused(true);
      } catch {
        // Safe catch
      }
    }
  }, []);

  const resume = useCallback(() => {
    if (Platform.OS === 'web' && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        setIsPaused(false);
        setIsPlaying(true);
        return;
      }
    }
    if (playerRef.current) {
      try {
        playerRef.current.play();
        setIsPaused(false);
        setIsPlaying(true);
      } catch {
        // Safe catch
      }
    }
  }, []);

  const pronounce = useCallback(
    async (text: string, options?: { rate?: number }) => {
      if (!text || !text.trim()) return;
      stop(); // Cut off previous audio before starting new
      const requestId = requestIdRef.current;
      setIsPlaying(true);
      setIsPaused(false);

      const cleanText = text.trim();
      // Noticeable playback rate: 0.70 for slow, 0.95 for normal
      const rate = options?.rate !== undefined ? options.rate : 0.95;
      const stillCurrent = () => requestIdRef.current === requestId;

      // 1. Web Speech Synthesis
      if (Platform.OS === 'web' && typeof window !== 'undefined' && 'speechSynthesis' in window) {
        const finish = () => {
          clearSafetyTimeout();
          if (stillCurrent()) {
            setIsPlaying(false);
            setIsPaused(false);
          }
        };

        setTimeout(() => {
          if (!stillCurrent()) return;
          const synth = window.speechSynthesis;
          const utterance = new SpeechSynthesisUtterance(cleanText);
          utterance.lang = 'en-US';
          utterance.rate = rate;
          utterance.pitch = 1.0;
          utterance.onend = finish;
          utterance.onerror = finish;
          utteranceRef.current = utterance;

          synth.speak(utterance);

          const estimatedMs = Math.max(1200, cleanText.split(/\s+/).length * (rate < 0.85 ? 650 : 420));
          safetyTimeoutRef.current = setTimeout(finish, estimatedMs + 3000);
        }, 30);
        return;
      }

      const attachFinishHandler = (player: AudioPlayer) => {
        const subscription = player.addListener('playbackStatusUpdate', (status) => {
          if (status.didJustFinish) {
            subscription.remove();
            player.remove();
            if (playerRef.current === player) {
              playerRef.current = null;
              if (stillCurrent()) {
                setIsPlaying(false);
                setIsPaused(false);
              }
            }
          }
        });
      };

      // 2. Audio Stream via expo-audio
      try {
        const encoded = encodeURIComponent(cleanText.slice(0, 200));
        const streamUrl = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=en&q=${encoded}`;
        const player = createAudioPlayer({ uri: streamUrl });
        if (!stillCurrent()) {
          player.remove();
          return;
        }
        playerRef.current = player;
        attachFinishHandler(player);
        // The Google Translate TTS URL has no speed parameter of its own, and
        // this whole branch only runs on native (web returns early via
        // speechSynthesis above) — the ONLY way to actually slow the audio
        // down here is the player's own playback rate. This was the real
        // "0.75x does nothing on my phone" bug: `rate` was computed above but
        // never once applied to this player.
        player.shouldCorrectPitch = true;
        player.setPlaybackRate(rate, 'high');
        player.play();

        const estimatedMs = Math.max(1500, cleanText.split(/\s+/).length * 500);
        safetyTimeoutRef.current = setTimeout(() => {
          if (stillCurrent()) {
            setIsPlaying(false);
            setIsPaused(false);
          }
        }, estimatedMs + 4000);
      } catch {
        // 3. Fallback to backend API
        try {
          const buffer = await api.postArrayBuffer('/tts/pronounce', { text: cleanText });
          if (!stillCurrent()) return;
          const uri = `data:audio/wav;base64,${arrayBufferToBase64(buffer)}`;
          const player = createAudioPlayer({ uri });
          playerRef.current = player;
          attachFinishHandler(player);
          player.shouldCorrectPitch = true;
          player.setPlaybackRate(rate, 'high');
          player.play();
        } catch {
          if (stillCurrent()) {
            setIsPlaying(false);
            setIsPaused(false);
          }
        }
      }
    },
    [stop]
  );

  /** Intelligent Play / Pause / Resume toggle */
  const toggle = useCallback(
    (text: string, options?: { rate?: number }) => {
      if (isPlaying && !isPaused) {
        pause();
      } else if (isPaused) {
        resume();
      } else {
        pronounce(text, options).catch(() => {});
      }
    },
    [isPlaying, isPaused, pause, resume, pronounce]
  );

  return { pronounce, stop, pause, resume, toggle, isPlaying, isPaused };
}
