import AsyncStorage from '@react-native-async-storage/async-storage';

import { isProUser, isRevenueCatConfigured } from './revenuecat';

const SHOWN_KEY = 'spekvia.proOffer.afterFirstLesson.v1';

/**
 * The Pro offer moved out of onboarding: it shows ONCE, right after the learner finishes their first step on the
 * path (value first, then the offer). Skipped for Pro users and when payments are not set up (except in
 * development, so the screen can be reviewed).
 */
export async function offerProAfterFirstLesson(open: () => void): Promise<void> {
  try {
    if ((await AsyncStorage.getItem(SHOWN_KEY)) === '1') return;
    if (!isRevenueCatConfigured && !__DEV__) return;
    if (await isProUser()) return;
    await AsyncStorage.setItem(SHOWN_KEY, '1');
    setTimeout(open, 800);
  } catch {
    // best effort
  }
}
