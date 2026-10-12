import { useCallback, useEffect, useState } from 'react';

import {
  disableNotifications,
  enableNotifications,
  loadPrefs,
  NOTIFICATIONS_UNAVAILABLE,
  setNotificationTime,
  type NotificationPrefs,
} from '../lib/notifications';

/**
 * Settings-side handle of the smart reminders (see `lib/notifications.ts`): on/off and the preferred time.
 * The notifications themselves are (re)scheduled from Home, which knows today's progress.
 */
export function useDailyReminder(_displayName?: string) {
  const [prefs, setPrefs] = useState<NotificationPrefs | null>(null);

  useEffect(() => {
    if (NOTIFICATIONS_UNAVAILABLE) return;
    void loadPrefs().then(setPrefs);
  }, []);

  const toggle = useCallback(async () => {
    if (NOTIFICATIONS_UNAVAILABLE || !prefs) return;
    if (prefs.enabled) {
      await disableNotifications();
    } else {
      await enableNotifications();
    }
    setPrefs(await loadPrefs());
  }, [prefs]);

  const setTime = useCallback(async (hour: number, minute: number) => {
    await setNotificationTime(hour, minute);
    setPrefs(await loadPrefs());
  }, []);

  return {
    enabled: prefs?.enabled ?? false,
    hour: prefs?.hour ?? 19,
    minute: prefs?.minute ?? 30,
    loading: !NOTIFICATIONS_UNAVAILABLE && prefs === null,
    toggle,
    setTime,
    unavailable: NOTIFICATIONS_UNAVAILABLE,
  };
}
