import AsyncStorage from '@react-native-async-storage/async-storage';

/** Name of the home-screen widget (must match the `react-native-android-widget` entry in app.json). */
export const WIDGET_NAME = 'SpekviaToday';

/** Opened by a tap on the widget: Home starts the learner's next step (see useDeepLinking / HomeScreen). */
export const WIDGET_NEXT_STEP_URI = 'spekvia://next';

const KEY = 'spekvia.widget.snapshot.v1';

/**
 * What the widget shows. Written by the app (Home) and read by the headless widget task, which has no i18n and no
 * network: every label is stored already translated.
 */
export type WidgetSnapshot = {
  streak: number;
  todayDone: boolean;
  /** Local day (YYYY-MM-DD) the snapshot describes. */
  savedOn: string;
  /** Line under the number while the streak is alive and today is open: "gün serisi". */
  streakLabel: string;
  /** Line when the streak is 0: "Seriyi başlat". */
  startLabel: string;
  /** Line when today is done: "Bugün ✓". */
  doneLabel: string;
};

export function localDay(date = new Date()): string {
  return date.toLocaleDateString('en-CA');
}

export async function loadWidgetSnapshot(): Promise<WidgetSnapshot | null> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as WidgetSnapshot) : null;
  } catch {
    return null;
  }
}

export async function saveWidgetSnapshot(snapshot: WidgetSnapshot): Promise<void> {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(snapshot));
  } catch {
    // best effort
  }
}

/**
 * The widget refreshes on its own every 30 minutes, often without the app being opened. A snapshot from an earlier
 * day is aged here: a new day is not "done" yet, and a day without practice in between means the streak is gone.
 */
export function agedSnapshot(snapshot: WidgetSnapshot, today = localDay()): WidgetSnapshot {
  if (snapshot.savedOn === today) return snapshot;
  const days = Math.round((Date.parse(today) - Date.parse(snapshot.savedOn)) / 86_400_000);
  const streakAlive = days === 1 && snapshot.todayDone;
  return { ...snapshot, todayDone: false, streak: streakAlive ? snapshot.streak : 0 };
}
