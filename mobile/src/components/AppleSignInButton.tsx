import * as AppleAuthentication from 'expo-apple-authentication';
import { useEffect, useState } from 'react';
import { Platform, StyleSheet } from 'react-native';

import { supabase } from '../lib/supabase';

type Props = {
  onError: (message: string) => void;
};

/** iOS-only Apple Sign-In, wired to Supabase's `signInWithIdToken`. Renders nothing off-iOS. */
export function AppleSignInButton({ onError }: Props) {
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    if (Platform.OS !== 'ios') return;
    AppleAuthentication.isAvailableAsync().then(setAvailable).catch(() => setAvailable(false));
  }, []);

  if (Platform.OS !== 'ios' || !available) {
    return null;
  }

  return (
    <AppleAuthentication.AppleAuthenticationButton
      buttonType={AppleAuthentication.AppleAuthenticationButtonType.CONTINUE}
      buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.WHITE_OUTLINE}
      cornerRadius={9999}
      style={styles.button}
      onPress={async () => {
        try {
          const credential = await AppleAuthentication.signInAsync({
            requestedScopes: [
              AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
              AppleAuthentication.AppleAuthenticationScope.EMAIL,
            ],
          });

          if (!credential.identityToken) {
            onError('Apple oturum açma bir kimlik jetonu döndürmedi.');
            return;
          }

          const { error } = await supabase.auth.signInWithIdToken({
            provider: 'apple',
            token: credential.identityToken,
          });

          if (error) onError(error.message);
        } catch (err) {
          const code = (err as { code?: string }).code;
          if (code === 'ERR_REQUEST_CANCELED') return;
          onError('Apple ile giriş yapılamadı. Lütfen tekrar dene.');
        }
      }}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    height: 52,
    width: '100%',
  },
});
