import AsyncStorage from '@react-native-async-storage/async-storage';
import { isRunningInExpoGo } from 'expo';
import { Alert, Platform } from 'react-native';

import { t } from '../i18n';

/**
 * Smart local reminders (no push server): every time the app learns something new (Home opens, a task is
 * done) the pending notifications are thrown away and a fresh small set is scheduled for the user's chosen time:
 *   - today not practiced yet  -> "today's step is waiting" (next slot: today if it is still ahead, else tomorrow)
 *   - today already practiced  -> today's slot is skipped, tomorrow gets "your plan is ready"
 *   - then one gentle nudge a day later and one "we miss you" three days later (only fire if the app stays closed)
 *   - Sunday: the week's summary ("this week: 4 days, 12 activities, 32 new words") takes that day's slot
 * At most ONE notification a day. Texts are in Mivo's voice, name the actual next step (story title, scene,
 * topic) and rotate by date, so the learner rarely sees the same line twice.
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
  /** "Topic · step kind", the fallback line. */
  nextSummary: string;
  /** The next step's kind and title (story title, scene title…) and its topic, for step-specific texts. */
  nextKind?: 'lesson' | 'reading' | 'scene' | 'writing' | 'review' | 'listening' | 'vocab';
  nextTitle?: string;
  topicTitle?: string;
  /** Vocabulary cards due for review. */
  wordsDue?: number;
  /** This week (Monday-Sunday) so far, for the Sunday summary. */
  week?: { days: number; activities: number; words: number };
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

type Content = { title: string; body: string };

/** Day number, so a text pool rotates by date but stays the same when the same day is rescheduled. */
function dayNo(date: Date): number {
  return Math.floor(new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() / 86_400_000);
}

function pick<T>(pool: T[], date: Date, salt = 0): T {
  return pool[(dayNo(date) + salt) % pool.length];
}

/** One line about the actual next step, in Mivo's voice. */
function stepLine(ctx: NotificationContext): string {
  const vars = { name: ctx.name, title: ctx.nextTitle ?? '', topic: ctx.topicTitle ?? '' };
  switch (ctx.nextKind) {
    case 'lesson':
      return t("{{name}}, sıradaki konu: {{topic}}. Mivo tahtayı çoktan sildi.", vars);
    case 'reading':
      return t("{{name}}, yeni hikaye seni bekliyor: “{{title}}”. Birkaç dakikalık bir okuma.", vars);
    case 'scene':
      return t("{{name}}, sahne hazır: {{title}}. Mivo rolüne girdi bile 🎭", vars);
    case 'writing':
      return t("{{name}}, gerçek bir mesaj yazma zamanı: {{title}} ✍️", vars);
    case 'review':
      return t("{{name}}, Mivo {{topic}} konusunu seninle bir tur daha konuşmak istiyor 💬", vars);
    default:
      return t("{{name}}, sıradaki adım: {{summary}}. Sadece birkaç dakika!", { name: ctx.name, summary: ctx.nextSummary });
  }
}

function pendingText(ctx: NotificationContext, date: Date): Content {
  const title =
    ctx.streak >= 2
      ? t("🔥 {{streak}} günlük serin bugün de devam etsin mi?", { streak: ctx.streak })
      : pick([t("Mivo seni bekliyor 👀"), t("Bugünkü 10 dakikan hazır ⏱️"), t("Küçük bir İngilizce molası? ☕")], date);
  return { title, body: stepLine(ctx) };
}

function planText(ctx: NotificationContext, date: Date): Content {
  return {
    title: pick([t("Yarın için planın hazır ✨"), t("Dün harikaydın, devam? 🌟"), t("Yeni gün, yeni cümleler ☀️")], date),
    body: stepLine(ctx),
  };
}

function gentleText(ctx: NotificationContext, date: Date): Content {
  // Words waiting for review make a lighter, very concrete ask.
  if ((ctx.wordsDue ?? 0) >= 5) {
    return {
      title: t("🃏 {{count}} kelime seni özledi", { count: ctx.wordsDue }),
      body: t("Tekrar zamanı geldi. 2 dakikada biter, söz."),
    };
  }
  return {
    title: pick([t("Küçük bir adım yeter 🌱"), t("Sadece 5 dakika? 🌱")], date),
    body: t("{{name}}, bugün sadece 5 dakika: {{summary}}", { name: ctx.name, summary: ctx.nextSummary }),
  };
}

function missText(ctx: NotificationContext, date: Date): Content {
  return pick(
    [
      { title: t("Mivo seni özledi 💜"), body: t("{{name}}, kaldığın yerden devam edelim: {{summary}}.", { name: ctx.name, summary: ctx.nextSummary }) },
      { title: t("Mivo kulaklarını dikti 👂"), body: t("{{name}}, İngilizcen paslanmasın! Kaldığın yer: {{summary}}.", { name: ctx.name, summary: ctx.nextSummary }) },
    ],
    date
  );
}

function weeklyText(ctx: NotificationContext): Content | null {
  const week = ctx.week;
  if (!week || week.days === 0) return null;
  return {
    title: t("Haftanın özeti 🏆"),
    body:
      week.words > 0
        ? t("{{name}}, bu hafta {{days}} gün çalıştın: {{activities}} etkinlik, {{words}} yeni kelime. Haftayı bir adımla kapat?", {
            name: ctx.name,
            days: week.days,
            activities: week.activities,
            words: week.words,
          })
        : t("{{name}}, bu hafta {{days}} gün çalıştın ve {{activities}} etkinlik bitirdin. Harika gidiyorsun!", {
            name: ctx.name,
            days: week.days,
            activities: week.activities,
          }),
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

    // [dayOffset, its text] — never more than one a day.
    const plan: { offset: number; content: Content }[] = [];
    if (!ctx.todayDone) {
      const offset = todaySlotAhead ? 0 : 1;
      plan.push({ offset, content: pendingText(ctx, slot(offset)) });
      plan.push({ offset: offset + 1, content: gentleText(ctx, slot(offset + 1)) });
      plan.push({ offset: offset + 3, content: missText(ctx, slot(offset + 3)) });
    } else {
      plan.push({ offset: 1, content: planText(ctx, slot(1)) });
      plan.push({ offset: 2, content: gentleText(ctx, slot(2)) });
      plan.push({ offset: 4, content: missText(ctx, slot(4)) });
    }

    // Sunday's slot carries the week's summary (this week's Sunday only, never a stale week).
    const weekly = weeklyText(ctx);
    const daysToSunday = (7 - now.getDay()) % 7;
    if (weekly && (daysToSunday > 0 || todaySlotAhead)) {
      const sameDay = plan.find((item) => item.offset === daysToSunday);
      if (sameDay) sameDay.content = weekly;
      else plan.push({ offset: daysToSunday, content: weekly });
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

/** True when the system already allows notifications (no permission dialog would appear). */
export async function notificationsAlreadyAllowed(): Promise<boolean> {
  if (NOTIFICATIONS_UNAVAILABLE) return false;
  try {
    const Notifications = await loadNotifications();
    return (await Notifications.getPermissionsAsync()).granted;
  } catch {
    return false;
  }
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
