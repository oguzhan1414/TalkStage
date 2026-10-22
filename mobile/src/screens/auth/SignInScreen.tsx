import Ionicons from '@expo/vector-icons/Ionicons';
import { useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppleSignInButton } from '../../components/AppleSignInButton';
import { AuthField } from '../../components/auth/AuthField';
import { AuthShell } from '../../components/auth/AuthShell';
import { BouncyPressable } from '../../components/BouncyPressable';
import { Button } from '../../components/Button';
import { GoogleSignInButton } from '../../components/GoogleSignInButton';
import { LegalConsentNote } from '../../components/LegalConsentNote';
import { friendlyAuthError, looksLikeEmail } from '../../lib/authErrors';
import { supabase } from '../../lib/supabase';
import type { AuthStackScreenProps } from '../../navigation/types';
import { colors, fonts } from '../../theme/tokens';
import { t } from '../../i18n';

export function SignInScreen({ navigation }: AuthStackScreenProps<'SignIn'>) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const submitting = useRef(false);

  const canSubmit = looksLikeEmail(email) && password.length > 0;

  const handleSignIn = async () => {
    if (!canSubmit || submitting.current) return;
    submitting.current = true;
    setError(null);
    setLoading(true);
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (signInError) setError(friendlyAuthError(signInError.message));
    } catch {
      setError(t("Giriş yapılamadı. İnternet bağlantını kontrol edip tekrar dene."));
    } finally {
      submitting.current = false;
      setLoading(false);
    }
  };

  const onChange = (set: (value: string) => void) => (value: string) => {
    set(value);
    if (error) setError(null);
  };

  return (
    <AuthShell title={t("Tekrar hoş geldin")} subtitle={t("Kaldığın yerden akıcı pratiğe devam et")}>
      <View style={styles.social}>
        <AppleSignInButton onError={setError} />
        <GoogleSignInButton onError={(message) => setError(friendlyAuthError(message))} />
      </View>

      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>{t("veya e-posta ile")}</Text>
        <View style={styles.dividerLine} />
      </View>

      <AuthField
        icon="mail-outline"
        value={email}
        onChangeText={onChange(setEmail)}
        placeholder={t("E-posta adresin")}
        keyboardType="email-address"
        autoComplete="email"
        returnKeyType="next"
      />
      <AuthField
        icon="lock-closed-outline"
        value={password}
        onChangeText={onChange(setPassword)}
        placeholder={t("Şifren")}
        secure
        autoComplete="password"
        returnKeyType="go"
        onSubmitEditing={handleSignIn}
      />

      {error ? (
        <View style={styles.errorBox} accessibilityLiveRegion="polite">
          <Ionicons name="alert-circle" size={18} color="#EF4444" />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      <Button label={t("Giriş Yap")} variant="chunky" loading={loading} disabled={!canSubmit} onPress={handleSignIn} />

      <LegalConsentNote />

      <BouncyPressable onPress={() => navigation.navigate('SignUp')} style={styles.switchRow} hapticType="light" scaleTo={0.96}>
        <Text style={styles.switchText}>{t("Hesabın yok mu?")}{" "}</Text>
        <Text style={styles.switchLink}>{t("Hemen Kayıt Ol ➔")}</Text>
      </BouncyPressable>
    </AuthShell>
  );
}

const styles = StyleSheet.create({
  social: { gap: 10 },
  divider: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#E2E8F0' },
  dividerText: { fontFamily: fonts.bodyMedium, fontSize: 12.5, color: '#94A3B8' },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  errorText: { flex: 1, fontFamily: fonts.bodyMedium, fontSize: 13, lineHeight: 18, color: '#DC2626' },
  switchRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 4 },
  switchText: { fontFamily: fonts.bodyRegular, fontSize: 14, color: '#64748B' },
  switchLink: { fontFamily: fonts.headingBold, fontSize: 14, color: colors.brand },
});
