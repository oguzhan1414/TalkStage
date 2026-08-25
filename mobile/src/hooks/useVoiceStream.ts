import { useAudioStream, type AudioStreamBuffer } from 'expo-audio';

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
  return useAudioStream({
    sampleRate: 16000,
    channels: 1,
    encoding: 'int16',
    onBuffer,
  });
}
