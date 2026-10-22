import AsyncStorage from '@react-native-async-storage/async-storage';

const ASKED_KEY = 'spekvia.storeReview.asked.v1';

/**
 * Asks for a store rating ONCE, at a happy moment: right after the learner finishes their first topic.
 * The OS decides whether the dialog really shows (and rate-limits it), so this never nags. The native module
 * is loaded lazily: an older dev build without it just skips the request.
 */
export async function requestReviewAfterFirstTopic(): Promise<void> {
  try {
    if ((await AsyncStorage.getItem(ASKED_KEY)) === '1') return;
    const StoreReview = await import('expo-store-review');
    if (!(await StoreReview.isAvailableAsync()) || !(await StoreReview.hasAction())) return;
    await AsyncStorage.setItem(ASKED_KEY, '1');
    await StoreReview.requestReview();
  } catch {
    // Best effort: a missing native module or an unsupported platform never breaks the app.
  }
}
