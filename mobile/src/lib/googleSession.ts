import { Platform } from 'react-native';

/**
 * Forgets the Google account the native sign-in sheet remembers on this device.
 * Without this, signing out of Spekvia and tapping "Continue with Google" again reuses the previous
 * account silently instead of showing the account chooser. A no-op where the native module does not
 * exist (Expo Go, web).
 */
export async function clearNativeGoogleAccount(): Promise<void> {
  if (Platform.OS === 'web') return;
  try {
    const { GoogleSignin } = require('@react-native-google-signin/google-signin') as typeof import('@react-native-google-signin/google-signin');
    await GoogleSignin.signOut();
  } catch {
    // Module missing or nothing to clear: the next sign-in simply shows the chooser as usual.
  }
}
