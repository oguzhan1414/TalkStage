import { useAudioStream, type AudioStreamBuffer } from 'expo-audio';
import { useMemo } from 'react';

/**
 * Real-time PCM microphone capture, pre-configured to match backend's
 * `WS /ws/session/{scenario_slug}` contract: mono PCM16 @ 16kHz, delivered
 * as raw `ArrayBuffer` chunks via `onBuffer` — send each buffer's `.data`
 * straight over the socket as a binary frame. Not wired to anything yet;
 * Görev 8 (Canlı Konuşma Odası) is what will call `stream.start()`/`stop()`
 * and pipe `onBuffer` into the WebSocket connection.
 *
 * Native-only — `expo-audio`'s web implementation is a no-op stub
 * (`isStreaming` stays `false`, `start()`/`stop()` do nothing), so this
 * can't be exercised in the web preview used for local testing.
 */
export function useVoiceStream(onBuffer: (buffer: AudioStreamBuffer) => void) {
  // Memoized so `useAudioStream` gets a referentially stable config object —
  // an inline object literal here is a brand new reference every render of
  // the caller (which itself re-renders often, e.g. on every mic level
  // update), and if expo-audio keys any internal effect off this whole
  // options object rather than its individual fields, a fresh reference each
  // render can retrigger that effect every render, which is exactly the
  // shape of bug that produces "Maximum update depth exceeded".
  const options = useMemo(
    () => ({
      sampleRate: 16000 as const,
      channels: 1 as const,
      encoding: 'int16' as const,
      onBuffer,
    }),
    [onBuffer]
  );
  return useAudioStream(options);
}
