import NetInfo, { useNetInfo } from '@react-native-community/netinfo';
import { focusManager, onlineManager } from '@tanstack/react-query';
import { AppState, Platform } from 'react-native';

import { flushOutbox } from './outbox';

let started = false;

/**
 * Tells React Query when the device is online/focused (React Native has no browser events for it):
 *  - offline  -> queries pause instead of failing, and run again by themselves when the network is back
 *  - app foregrounded -> stale queries refetch
 * Also re-sends queued writes (see outbox.ts) as soon as the connection or the app comes back.
 * Only `isConnected === false` counts as offline here; `isInternetReachable` is flaky on some networks and
 * would wrongly freeze every query, so it is used just for the banner.
 */
export function startNetworkSync(): void {
  if (started) return;
  started = true;

  onlineManager.setEventListener((setOnline) =>
    NetInfo.addEventListener((state) => {
      const online = state.isConnected !== false;
      setOnline(online);
      if (online) void flushOutbox();
    })
  );

  AppState.addEventListener('change', (state) => {
    if (Platform.OS !== 'web') focusManager.setFocused(state === 'active');
    if (state === 'active') void flushOutbox();
  });
}

/** True when the phone has no connection (or a connection with no internet) — drives the offline banner. */
export function useIsOffline(): boolean {
  const state = useNetInfo();
  return state.isConnected === false || state.isInternetReachable === false;
}
