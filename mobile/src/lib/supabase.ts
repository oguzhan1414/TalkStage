import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient, type Session } from '@supabase/supabase-js';
import { AppState, Platform } from 'react-native';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

/**
 * False until `mobile/.env` has real Supabase project values — see
 * `EXPO_PUBLIC_SUPABASE_URL`/`EXPO_PUBLIC_SUPABASE_ANON_KEY` in `.env.example`.
 * `App.tsx` renders a config-missing screen instead of the app while this is false,
 * so the rest of the auth code can assume `supabase` is a real, working client.
 */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = createClient(
  supabaseUrl ?? 'https://placeholder.supabase.co',
  supabaseAnonKey ?? 'placeholder-anon-key',
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
      // Google sign-in returns `?code=` and is finished with exchangeCodeForSession (GoogleSignInButton).
      flowType: 'pkce',
    },
  }
);

// Supabase's React Native guidance recommends refreshing only while the app is
// active. This avoids background refresh work and still emits TOKEN_REFRESHED
// / SIGNED_OUT events when the app returns to the foreground.
if (Platform.OS !== 'web') {
  if (AppState.currentState === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }

  AppState.addEventListener('change', (state) => {
    if (state === 'active') {
      supabase.auth.startAutoRefresh();
    } else {
      supabase.auth.stopAutoRefresh();
    }
  });
}

/**
 * The session exactly as Supabase saved it on the device, read without any network call.
 * `getSession()` first refreshes an expired access token (one round trip to Supabase), which
 * would hold the whole start-up; the stored copy is enough to know who is signed in. Every API
 * call still goes through `getSession()`, so requests always carry a valid token.
 */
export async function readStoredSession(): Promise<Session | null> {
  if (!supabaseUrl) return null;
  try {
    const key = `sb-${new URL(supabaseUrl).hostname.split('.')[0]}-auth-token`;
    const raw = await AsyncStorage.getItem(key);
    if (!raw) return null;
    const stored = JSON.parse(raw) as Partial<Session> | null;
    if (!stored?.access_token || !stored.refresh_token || !stored.user?.id) return null;
    return stored as Session;
  } catch {
    return null;
  }
}
