import AsyncStorage from '@react-native-async-storage/async-storage';
import { isRunningInExpoGo } from 'expo';
import { Alert, Platform } from 'react-native';

import { t } from '../i18n';

/**
 * Smart local reminders (no push server): every time the app learns something new (Home opens, a task is
 * done) the pending notifications are thrown away and a fresh small set is scheduled for the user's chosen time:
 *   - today not practiced yet  -> "today's step is waiting" (next slot: today if it is still ahead, else tomorrow)
 *   - today already practiced  -> today's slot is skipped, tomorrow gets "your plan is ready: Gün N …"
 *   - then one gentle nudge a day later and one "we miss you" three days later (only fire if the app stays closed)
 *
 * `expo-notifications` throws on Android the instant it is imported inside Expo Go, so it is loaded lazily and
 * everything here quietly does nothing in that environment (works in development / production builds).
 */
export const NOTIFICATIONS_UNAVAILABLE = Platform.OS === 'android' && isRunningInExpoGo();

const PREFS_KEY = 'spekvia.notifications.v2';
const CTX_KEY = 'spekvia.notifications.ctx.v2';
const OLD_KEY = 'talkstage.daily_reminder.v1';
const CHANNEL_ID = 'reminders';

export type NotificationPrefs = { enabled: boolean; hour: number; minute: number; asked: boolean };
export type NotificationContext = {
  name: string;
  streak: number;
  todayDone: boolean;
  nextDayNo: number;
  nextSummary: string;
};

const DEFAULT_PREFS: NotificationPrefs = { enabled: false, hour: 19, minute: 30, asked: false };

/** Never schedule inside quiet hours (22:00–08:00): the presets below all sit outside them. */
export const TIME_PRESETS: { hour: number; minute: number; label: string }[] = [
  { hour: 8, minute: 30, label: t("Sabah") },
  { hour: 12, minute: 30, label: t("Öğle") },
  { hour: 19, minute: 30, label: t("Akşam") },
  { hour: 21, minute: 0, label: t("Gece") },
];

let handlerConfigured = false;
let channelReady = false;
async function loadNotifications() {
  const Notifications = await import('expo-notifications');
  if (!handlerConfigured) {
    handlerConfigured = true;
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
      }),
    });
  }
  if (Platform.OS === 'android' && !channelReady) {
    channelReady = true;
    await Notifications.setNotificationChannelAsync(CHANNEL_ID, {
      name: t("Hatırlatıcılar"),
      importance: Notifications.AndroidImportance.DEFAULT,
    }).catch(() => {});
  }
  return Notifications;
}

export async function loadPrefs(): Promise<NotificationPrefs> {
  try {
    const raw = await AsyncStorage.getItem(PREFS_KEY);
    if (raw) return { ...DEFAULT_PREFS, ...JSON.parse(raw) };
    // Migrate the old on/off flag from the single fixed 19:00 reminder.
    const old = await AsyncStorage.getItem(OLD_KEY);
    if (old === 'true') return { ...DEFAULT_PREFS, enabled: true, asked: true };
  } catch {
    // fall through
  }
  return DEFAULT_PREFS;
}

async function savePrefs(prefs: NotificationPrefs): Promise<void> {
  try {
    await AsyncStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
  } catch {
    // best effort
  }
}

async function loadContext(): Promise<NotificationContext | null> {
  try {
    const raw = await AsyncStorage.getItem(CTX_KEY);
    return raw ? (JSON.parse(raw) as NotificationContext) : null;
  } catch {
    return null;
  }
}

function pendingText(ctx: NotificationContext) {
  return {
    title: t("Bugünün görevi seni bekliyor 🎯"),
    body:
      ctx.streak > 0
        ? t("{{name}}, Gün {{n}}: {{summary}}. {{streak}} günlük serini koru 🔥", { name: ctx.name, n: ctx.nextDayNo, summary: ctx.nextSummary, streak: ctx.streak })
        : t("{{name}}, Gün {{n}}: {{summary}}. Sadece birkaç dakika!", { name: ctx.name, n: ctx.nextDayNo, summary: ctx.nextSummary }),
  };
}

function planText(ctx: NotificationContext) {
  return {
    title: t("Yarın için planın hazır ✨"),
    body: t("Gün {{n}}: {{summary}}. Mivo seni bekliyor!", { n: ctx.nextDayNo, summary: ctx.nextSummary }),
  };
}

function gentleText(ctx: NotificationContext) {
  return {
    title: t("Küçük bir adım yeter 🌱"),
    body: t("{{name}}, bugün sadece 5 dakika: Gün {{n}} · {{summary}}", { name: ctx.name, n: ctx.nextDayNo, summary: ctx.nextSummary }),
  };
}

function missText(ctx: NotificationContext) {
  return {
    title: t("Mivo seni özledi 💜"),
    body: t("{{name}}, kaldığın yerden devam edelim: Gün {{n}}.", { name: ctx.name, n: ctx.nextDayNo }),
  };
}

// Runs are serialized: two overlapping "cancel everything, then schedule" passes would leave duplicates behind.
let scheduleChain: Promise<void> = Promise.resolve();

/** Throws away everything pending and schedules the fresh set for the given context (and remembers the context). */
export function scheduleSmartNotifications(ctx: NotificationContext): Promise<void> {
  scheduleChain = scheduleChain.then(() => runSchedule(ctx)).catch(() => {});
  return scheduleChain;
}

async function runSchedule(ctx: NotificationContext): Promise<void> {
  if (NOTIFICATIONS_UNAVAILABLE) return;
  try {
    await AsyncStorage.setItem(CTX_KEY, JSON.stringify(ctx));
    const prefs = await loadPrefs();
    if (!prefs.enabled) return;
    const Notifications = await loadNotifications();
    if (!(await Notifications.getPermissionsAsync()).granted) return;

    await Notifications.cancelAllScheduledNotificationsAsync();

    const now = new Date();
    const slot = (dayOffset: number) => {
      const d = new Date(now);
      d.setDate(d.getDate() + dayOffset);
      d.setHours(prefs.hour, prefs.minute, 0, 0);
      return d;
    };
    const todaySlotAhead = slot(0).getTime() > now.getTime() + 60_000;

    // [dayOffset of the first notification, its text]
    const plan: { offset: number; content: { title: string; body: string } }[] = [];
    if (!ctx.todayDone) {
      const offset = todaySlotAhead ? 0 : 1;
      plan.push({ offset, content: pendingText(ctx) });
      plan.push({ offset: offset + 1, content: gentleText(ctx) });
      plan.push({ offset: offset + 3, content: missText(ctx) });
    } else {
      plan.push({ offset: 1, content: planText(ctx) });
      plan.push({ offset: 2, content: gentleText(ctx) });
      plan.push({ offset: 4, content: missText(ctx) });
    }

    for (const item of plan) {
      await Notifications.scheduleNotificationAsync({
        content: item.content,
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DATE,
          date: slot(item.offset),
          ...(Platform.OS === 'android' ? { channelId: CHANNEL_ID } : {}),
        },
      });
    }
  } catch {
    // Scheduling is best effort (e.g. unsupported on web) — never break the app because of a reminder.
  }
}

async function rescheduleFromSavedContext(): Promise<void> {
  const ctx = await loadContext();
  if (ctx) await scheduleSmartNotifications(ctx);
}

/** Asks for permission and turns reminders on. Returns false when the user refused. */
export async function enableNotifications(hour?: number, minute?: number): Promise<boolean> {
  if (NOTIFICATIONS_UNAVAILABLE) return false;
  try {
    const Notifications = await loadNotifications();
    const { granted } = await Notifications.requestPermissionsAsync();
    const prefs = await loadPrefs();
    await savePrefs({ ...prefs, enabled: granted, asked: true, hour: hour ?? prefs.hour, minute: minute ?? prefs.minute });
    if (granted) await rescheduleFromSavedContext();
    return granted;
  } catch {
    return false;
  }
}

export async function disableNotifications(): Promise<void> {
  if (NOTIFICATIONS_UNAVAILABLE) return;
  try {
    const Notifications = await loadNotifications();
    await Notifications.cancelAllScheduledNotificationsAsync();
  } catch {
    // ignore
  }
  await savePrefs({ ...(await loadPrefs()), enabled: false, asked: true });
}

export async function setNotificationTime(hour: number, minute: number): Promise<void> {
  const prefs = await loadPrefs();
  await savePrefs({ ...prefs, hour, minute });
  if (prefs.enabled) await rescheduleFromSavedContext();
}

/** One-time friendly question right after the user's first practice, instead of a cold permission prompt at launch. */
export async function askForNotificationsOnce(): Promise<void> {
  if (NOTIFICATIONS_UNAVAILABLE) return;
  const prefs = await loadPrefs();
  if (prefs.enabled || prefs.asked) return;
  await savePrefs({ ...prefs, asked: true });
  Alert.alert(
    t("Yarın için hatırlatalım mı?"),
    t("Bugünkü pratiğin için tebrikler! İstersen yarınki planını doğru saatte hatırlatayım. İstediğin zaman Ayarlar'dan değiştirebilirsin."),
    [
      { text: t("Şimdi değil"), style: 'cancel' },
      { text: t("Hatırlat"), onPress: () => void enableNotifications() },
    ]
  );
}
