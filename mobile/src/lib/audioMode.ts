import { setAudioModeAsync } from 'expo-audio';

/**
 * Playback mode for every sound of the app: heard with the phone on silent / vibrate too, and not in recording mode.
 * On Android expo-audio silently skips play() while the ringer is off unless playsInSilentMode is set, and a recorder
 * or voice room can leave the session in recording mode; so this runs at start-up and again before each voice clip.
 * Never awaited by callers: it must not delay a sound.
 */
export function ensurePlaybackMode() {
  setAudioModeAsync({ allowsRecording: false, playsInSilentMode: true }).catch(() => {});
}

// As soon as the first sound module is imported, long before the first word is read.
ensurePlaybackMode();
