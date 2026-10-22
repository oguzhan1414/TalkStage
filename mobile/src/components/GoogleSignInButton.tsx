import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { useState } from 'react';
import { Platform } from 'react-native';

import { clearNativeGoogleAccount } from '../lib/googleSession';
import { supabase } from '../lib/supabase';
import { GoogleGlyph } from './auth/GoogleGlyph';
import { Button } from './Button';
import { t } from '../i18n';

WebBrowser.maybeCompleteAuthSession();

type Props = {
  onError: (message: string) => void;
};

type NativeGoogle = typeof import('@react-native-google-signin/google-signin');

/**
 * Google Sign-In with two paths, same Supabase project and Google *Web* client either way:
 *
 * 1. Native (in-app account sheet): `@react-native-google-signin` -> `signInWithIdToken`. Only exists in a
 *    development/production build (never in Expo Go or on web) and needs `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID`
 *    plus an Android OAuth client (package name + SHA-1) in Google Cloud. If the native module is missing or the
 *    native call fails for any reason other than the user cancelling, we fall through to path 2 so sign-in
 *    never dead-ends on a configuration gap.
 * 2. Browser (Supabase OAuth + PKCE): `signInWithOAuth` -> system browser sheet -> `?code=` ->
 *    `exchangeCodeForSession`. Works everywhere (Expo Go, web) with only the Google provider enabled in Supabase;
 *    `redirectTo` (`spekvia://auth/callback`, or `exp://…/--/auth/callback` in Expo Go) must be listed under
 *    Supabase -> Auth -> URL Configuration.
 */
const webClientId = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID;

function loadNativeGoogle(): NativeGoogle | null {
  if (Platform.OS === 'web' || !webClientId) return null;
  try {
    // Throws when the native module is not part of the running binary (Expo Go).
    const mod = require('@react-native-google-signin/google-signin') as NativeGoogle;
    mod.GoogleSignin.configure({ webClientId });
    return mod;
  } catch {
    return null;
  }
}

const nativeGoogle = loadNativeGoogle();

async function signInWithBrowser(onError: (message: string) => void) {
  const redirectTo = Linking.createURL('auth/callback');
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo, skipBrowserRedirect: true },
  });
  if (error || !data?.url) {
    onError(error?.message ?? t("Google giriş ekranı açılamadı. Lütfen tekrar dene."));
    return;
  }

  const result = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);
  // User closed the sheet: not an error.
  if (result.type !== 'success') return;

  const params = Linking.parse(result.url).queryParams ?? {};
  const code = typeof params.code === 'string' ? params.code : null;
  if (!code) {
    const reason = typeof params.error_description === 'string' ? params.error_description : null;
    onError(reason ?? t("Google ile giriş yapılamadı. Bağlantını kontrol edip tekrar dene."));
    return;
  }

  const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
  if (exchangeError) onError(exchangeError.message);
}

/** Returns true when the attempt is finished (signed in, cancelled, or a Supabase error already reported). */
async function signInNatively(google: NativeGoogle, onError: (message: string) => void): Promise<boolean> {
  try {
    // Always show the account chooser: drop the account a previous sign-in left cached on the device.
    await clearNativeGoogleAccount();
    const response = await google.GoogleSignin.signIn();
    if (response.type !== 'success') return true; // cancelled
    const idToken = response.data.idToken;
    if (!idToken) throw new Error('Google returned no id token');

    const { error } = await supabase.auth.signInWithIdToken({ provider: 'google', token: idToken });
    if (error) onError(error.message);
    return true;
  } catch (e) {
    if (google.isErrorWithCode(e) && e.code === google.statusCodes.SIGN_IN_CANCELLED) return true;
    // Most likely a configuration gap (missing SHA-1 / client id): use the browser flow instead.
    console.warn('Native Google sign-in failed, falling back to the browser flow', e);
    return false;
  }
}

export function GoogleSignInButton({ onError }: Props) {
  const [loading, setLoading] = useState(false);

  const handlePress = async () => {
    if (loading) return;
    setLoading(true);
    try {
      if (nativeGoogle && (await signInNatively(nativeGoogle, onError))) return;
      await signInWithBrowser(onError);
    } catch {
      onError(t("Google ile giriş yapılamadı. Bağlantını kontrol edip tekrar dene."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      label={t("Google ile devam et")}
      variant="secondary"
      loading={loading}
      onPress={handlePress}
      icon={<GoogleGlyph size={20} />}
    />
  );
}
