import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { useEffect } from 'react';
import { Alert } from 'react-native';

import { supabase } from '../lib/supabase';
import { Button } from './Button';

WebBrowser.maybeCompleteAuthSession();

type Props = {
  onError: (message: string) => void;
};

/**
 * Google Sign-In via Supabase's `signInWithIdToken`. Needs
 * `EXPO_PUBLIC_GOOGLE_*_CLIENT_ID` (see `.env.example`) plus the Google
 * provider enabled in the Supabase project — until both exist this renders
 * as a disabled button rather than crashing.
 */
export function GoogleSignInButton({ onError }: Props) {
  const iosClientId = process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID;
  const androidClientId = process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID;
  const webClientId = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID;
  const configured = Boolean(iosClientId || androidClientId || webClientId);

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId,
    androidClientId,
    webClientId,
  });

  useEffect(() => {
    if (response?.type !== 'success') return;

    const idToken = response.authentication?.idToken ?? response.params?.id_token;
    if (!idToken) {
      onError('Google oturum açma bir kimlik jetonu döndürmedi.');
      return;
    }

    supabase.auth.signInWithIdToken({ provider: 'google', token: idToken }).then(({ error }) => {
      if (error) onError(error.message);
    });
  }, [response, onError]);

  return (
    <Button
      label="Google ile devam et"
      variant="secondary"
      disabled={!request}
      onPress={() => {
        if (!configured) {
          Alert.alert('Google girişi henüz yapılandırılmadı', 'EXPO_PUBLIC_GOOGLE_*_CLIENT_ID .env değerleri eksik.');
          return;
        }
        promptAsync();
      }}
    />
  );
}
