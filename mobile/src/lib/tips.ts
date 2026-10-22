import AsyncStorage from '@react-native-async-storage/async-storage';

/** One-time Mivo tips (see components/MivoTip.tsx). Each key is shown once per device, ever. */
export type TipKey = 'home_road' | 'home_fab' | 'vocab_home' | 'settings';

const PREFIX = 'spekvia.tip.seen.';
const cache = new Map<TipKey, boolean>();

export async function isTipSeen(key: TipKey): Promise<boolean> {
  const cached = cache.get(key);
  if (cached !== undefined) return cached;
  try {
    const seen = (await AsyncStorage.getItem(PREFIX + key)) === '1';
    cache.set(key, seen);
    return seen;
  } catch {
    return true; // storage trouble: better no tip than a tip that keeps coming back
  }
}

export async function markTipSeen(key: TipKey): Promise<void> {
  cache.set(key, true);
  try {
    await AsyncStorage.setItem(PREFIX + key, '1');
  } catch {
    // best effort
  }
}
