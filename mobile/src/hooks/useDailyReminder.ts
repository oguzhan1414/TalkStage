import AsyncStorage from '@react-native-async-storage/async-storage';
import { isRunningInExpoGo } from 'expo';
import { useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';

const STORAGE_KEY = 'talkstage.daily_reminder.v1';
const REMINDER_HOUR = 19;
const REMINDER_MINUTE = 0;

/**
 * `expo-notifications` unconditionally `throw`s on Android the instant it's
 * *imported* inside Expo Go (SDK 53 removed remote-push support there, and
 * the package's own auto device-token-registration side effect doesn't
 * distinguish local-only usage from push usage — see
 * `expo-notifications/src/warnOfExpoGoPushUsage.ts`). A top-level static
 * import would crash every screen that pulls this hook in, so the module is
 * loaded lazily and only outside this exact environment.
 * https://docs.expo.dev/develop/development-builds/introduction/
 */
const NOTIFICATIONS_UNAVAILABLE = Platform.OS === 'android' && isRunningInExpoGo();

let handlerConfigured = false;
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
  return Notifications;
}

/**
 * Local daily practice reminder (Görev 16) — "personalized" here means the
 * message uses the user's name, not that it's server-pushed per-day content
 * (that would need backend push infra, out of scope). Preference persists in
 * AsyncStorage; toggling re-requests permission and (re)schedules or cancels.
 */
export function useDailyReminder(displayName: string) {
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (NOTIFICATIONS_UNAVAILABLE) {
      setLoading(false);
      return;
    }
    AsyncStorage.getItem(STORAGE_KEY).then((value) => {
      setEnabled(value === 'true');
      setLoading(false);
    });
  }, []);

  const toggle = useCallback(async () => {
    if (NOTIFICATIONS_UNAVAILABLE) return;
    try {
      const Notifications = await loadNotifications();

      if (enabled) {
        await Notifications.cancelAllScheduledNotificationsAsync();
        await AsyncStorage.setItem(STORAGE_KEY, 'false');
        setEnabled(false);
        return;
      }

      const { granted } = await Notifications.requestPermissionsAsync();
      if (!granted) return;

      await Notifications.cancelAllScheduledNotificationsAsync();
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Sahneye çıkma vaktin geldi 🎭',
          body: `${displayName}, bugün henüz pratik yapmadın — 5 dakikan var mı?`,
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DAILY,
          hour: REMINDER_HOUR,
          minute: REMINDER_MINUTE,
        },
      });
      await AsyncStorage.setItem(STORAGE_KEY, 'true');
      setEnabled(true);
    } catch {
      // expo-notifications scheduling isn't fully supported on web — fail quietly there.
    }
  }, [enabled, displayName]);

  return { enabled, loading, toggle, unavailable: NOTIFICATIONS_UNAVAILABLE };
}
