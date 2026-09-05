import {
  RecordingPresets,
  requestRecordingPermissionsAsync,
  setAudioModeAsync,
  useAudioRecorder,
  useAudioRecorderState,
} from 'expo-audio';
import { useCallback, useState } from 'react';

const RECORDING_OPTIONS = { ...RecordingPresets.HIGH_QUALITY, isMeteringEnabled: true };

/**
 * File-based mic recording with live level metering (for waveform UI).
 * Used by `ReadingPassageScreen`'s shadowing step and available to any future
 * record-then-upload flow (the old onboarding voice calibration screen that
 * originally used this was retired when onboarding moved to a self-report
 * level picker — see `mobile/CLAUDE.md`). For real-time PCM streaming to the backend's
 * WebSocket (Görev 8's live conversation room), use `useVoiceStream` instead
 * — that's a different capture mode (chunked raw PCM vs. a finished file).
 */
export function useVoiceRecorder() {
  const recorder = useAudioRecorder(RECORDING_OPTIONS);
  const state = useAudioRecorderState(recorder, 100);
  const [permissionDenied, setPermissionDenied] = useState(false);

  const start = useCallback(async () => {
    const { granted } = await requestRecordingPermissionsAsync();
    if (!granted) {
      setPermissionDenied(true);
      return false;
    }
    setPermissionDenied(false);
    await setAudioModeAsync({ allowsRecording: true, playsInSilentMode: true });
    await recorder.prepareToRecordAsync();
    recorder.record();
    return true;
  }, [recorder]);

  const stop = useCallback(async () => {
    await recorder.stop();
    return recorder.uri;
  }, [recorder]);

  return {
    isRecording: state.isRecording,
    durationMillis: state.durationMillis ?? 0,
    /** dBFS, roughly -160 (silence) to 0 (loudest) — drives the waveform. */
    meteringDb: state.metering ?? -160,
    permissionDenied,
    start,
    stop,
  };
}
