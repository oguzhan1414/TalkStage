import { createAudioPlayer, type AudioPlayer } from 'expo-audio';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';

import { api } from '../lib/api';
import { arrayBufferToBase64 } from '../lib/base64';

// Aynı kelimeyi tekrar dinlemek her seferinde ağa gitmesin (flashcard'larda
// sürekli tekrar ediliyor) — son 60 sentezlenmiş ses data-URI olarak tutulur.
const AUDIO_CACHE = new Map<string, string>();
const AUDIO_CACHE_MAX = 60;

const looksTurkish = (t: string) =>
  /[çğıöşüÇĞİÖŞÜ]/i.test(t) || /^(merhaba|selam|bugün|hangi|nasılsın)/i.test(t);

const IN_FLIGHT = new Map<string, Promise<string>>();

/** Sentezlenmiş sesi (data-URI) önbellekten ya da backend'den getirir; aynı
 * anda gelen istekler tek bir ağ çağrısında birleşir. */
function fetchAudioUri(cleanText: string): Promise<string> {
  const lang = looksTurkish(cleanText) ? 'tr' : 'en';
  const key = `${lang}|${cleanText}`;
  const cached = AUDIO_CACHE.get(key);
  if (cached) return Promise.resolve(cached);
  const pending = IN_FLIGHT.get(key);
  if (pending) return pending;
  const job = api
    .postArrayBuffer('/tts/pronounce', { text: cleanText, language: lang })
    .then((buffer) => {
      const uri = `data:audio/wav;base64,${arrayBufferToBase64(buffer)}`;
      if (AUDIO_CACHE.size >= AUDIO_CACHE_MAX) {
        const oldest = AUDIO_CACHE.keys().next().value;
        if (oldest !== undefined) AUDIO_CACHE.delete(oldest);
      }
      AUDIO_CACHE.set(key, uri);
      return uri;
    })
    .finally(() => IN_FLIGHT.delete(key));
  IN_FLIGHT.set(key, job);
  return job;
}

/** Kelime ekrana gelmeden sesini önceden indirir — ilk dinlemede bekleme olmasın.
 * Web'de tarayıcı sentezi anında çalıştığı için gerek yok; hatalar sessizce yutulur. */
export function prefetchPronunciation(text: string | null | undefined) {
  if (!text || Platform.OS === 'web') return;
  const clean = text.trim();
  if (!clean) return;
  fetchAudioUri(clean).catch(() => {});
}

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

  // Leaving the screen must silence the voice: without this a word that was
  // still playing (or a TTS request still in flight) kept talking after exit.
  useEffect(() => stop, [stop]);

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

      // Strip emojis and non-speech symbols that break TTS models
      const cleanText = text
        .replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}]/gu, '')
        .trim();
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

      // 2. High-fidelity Cartesia TTS via backend /tts/pronounce (Primary)
      try {
        const uri = await fetchAudioUri(cleanText);
        if (!stillCurrent()) return;
        const player = createAudioPlayer({ uri });
        playerRef.current = player;
        attachFinishHandler(player);
        player.shouldCorrectPitch = true;
        player.setPlaybackRate(rate, 'high');
        player.play();

        const estimatedMs = Math.max(1200, cleanText.split(/\s+/).length * 450);
        safetyTimeoutRef.current = setTimeout(() => {
          if (stillCurrent()) {
            setIsPlaying(false);
            setIsPaused(false);
          }
        }, estimatedMs + 3000);
      } catch (err) {
        console.warn('Backend Cartesia TTS failed, using fallback:', err);
        // 3. Graceful fallback to Google Translate TTS if Cartesia backend is offline
        try {
          const isTurkish = /[çğıöşüÇĞİÖŞÜ]/i.test(cleanText) || /^(merhaba|selam|bugün|hangi|nasılsın)/i.test(cleanText);
          const encoded = encodeURIComponent(cleanText.slice(0, 200));
          const streamUrl = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${isTurkish ? 'tr' : 'en'}&q=${encoded}`;
          const player = createAudioPlayer({ uri: streamUrl });
          if (!stillCurrent()) {
            player.remove();
            return;
          }
          playerRef.current = player;
          attachFinishHandler(player);
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
