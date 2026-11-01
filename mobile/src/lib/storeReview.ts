import AsyncStorage from '@react-native-async-storage/async-storage';

const ASKED_KEY = 'spekvia.storeReview.asked.v1';
const LESSONS_KEY = 'spekvia.storeReview.lessons.v1';
/** Ask after this many finished lessons: the learner has seen what the app does and just had a win. */
const LESSONS_BEFORE_ASKING = 2;

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

/** Called when a path lesson is finished (all three parts); asks for the rating once, at the second one. */
export async function noteLessonFinished(): Promise<void> {
  try {
    if ((await AsyncStorage.getItem(ASKED_KEY)) === '1') return;
    const count = Number((await AsyncStorage.getItem(LESSONS_KEY)) ?? '0') + 1;
    await AsyncStorage.setItem(LESSONS_KEY, String(count));
    if (count >= LESSONS_BEFORE_ASKING) await requestReviewAfterFirstTopic();
  } catch {
    // best effort
  }
}
