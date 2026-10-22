import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useRef, useState } from 'react';
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

const MIN_PASSWORD = 6;
const RESEND_SECONDS = 45;

export function SignUpScreen({ navigation }: AuthStackScreenProps<'SignUp'>) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmationSent, setConfirmationSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [resent, setResent] = useState(false);
  const submitting = useRef(false);

  const passwordOk = password.length >= MIN_PASSWORD;
  const canSubmit = looksLikeEmail(email) && passwordOk;

  // Counts down after a confirmation mail was sent, so "send again" cannot be spammed.
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleSignUp = async () => {
    if (!canSubmit || submitting.current) return;
    submitting.current = true;
    setError(null);
    setLoading(true);
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({ email: email.trim(), password });
      if (signUpError) {
        setError(friendlyAuthError(signUpError.message));
        return;
      }
      // No session yet + no error means Supabase is waiting on email confirmation.
      if (!data.session) {
        setConfirmationSent(true);
        setCooldown(RESEND_SECONDS);
      }
    } catch {
      setError(t("Hesap oluşturulamadı. İnternet bağlantını kontrol edip tekrar dene."));
    } finally {
      submitting.current = false;
      setLoading(false);
    }
  };

  const resend = async () => {
    if (cooldown > 0) return;
    setCooldown(RESEND_SECONDS);
    setResent(false);
    try {
      const { error: resendError } = await supabase.auth.resend({ type: 'signup', email: email.trim() });
      if (resendError) setError(friendlyAuthError(resendError.message));
      else setResent(true);
    } catch {
      setError(t("İnternet bağlantını kontrol edip tekrar dene."));
    }
  };

  const onChange = (set: (value: string) => void) => (value: string) => {
    set(value);
    if (error) setError(null);
  };

  if (confirmationSent) {
    return (
      <AuthShell title={t("E-Postanı Kontrol Et ✉️")}>
        <Text style={styles.confirmText}>
          {t("{{email}} adresine bir onay bağlantısı gönderdik. Bağlantıya tıklayarak Mivo ile sahneye adım atabilirsin.", { email: email.trim() })}
        </Text>
        <Text style={styles.confirmHint}>{t("Gelmediyse gereksiz (spam) klasörüne de bak.")}</Text>
        {error ? (
          <View style={styles.errorBox}>
            <Ionicons name="alert-circle" size={18} color="#EF4444" />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}
        <Button label={t("Giriş Ekranına Dön")} variant="chunky" onPress={() => navigation.navigate('SignIn')} />
        <BouncyPressable onPress={resend} disabled={cooldown > 0} style={styles.resendRow} hapticType="light" scaleTo={0.96}>
          <Text style={[styles.resendText, cooldown > 0 && styles.resendDisabled]}>
            {resent && cooldown > 0
              ? t("Tekrar gönderildi ✓")
              : cooldown > 0
                ? t("Tekrar gönder ({{s}} sn)", { s: cooldown })
                : t("E-posta gelmedi mi? Tekrar gönder")}
          </Text>
        </BouncyPressable>
      </AuthShell>
    );
  }

  return (
    <AuthShell title={t("Sahneni Oluştur")} subtitle={t("Birkaç saniyede ücretsiz hesabını aç")}>
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
      <View style={styles.passwordBlock}>
        <AuthField
          icon="lock-closed-outline"
          value={password}
          onChangeText={onChange(setPassword)}
          placeholder={t("Şifren")}
          secure
          autoComplete="new-password"
          returnKeyType="go"
          onSubmitEditing={handleSignUp}
        />
        <View style={styles.ruleRow}>
          <Ionicons name={passwordOk ? 'checkmark-circle' : 'ellipse-outline'} size={15} color={passwordOk ? '#059669' : '#94A3B8'} />
          <Text style={[styles.ruleText, passwordOk && styles.ruleOk]}>{t("En az 6 karakter")}</Text>
        </View>
      </View>

      {error ? (
        <View style={styles.errorBox} accessibilityLiveRegion="polite">
          <Ionicons name="alert-circle" size={18} color="#EF4444" />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      <Button label={t("Hesabımı Oluştur")} variant="chunky" loading={loading} disabled={!canSubmit} onPress={handleSignUp} />

      <LegalConsentNote />

      <BouncyPressable onPress={() => navigation.navigate('SignIn')} style={styles.switchRow} hapticType="light" scaleTo={0.96}>
        <Text style={styles.switchText}>{t("Zaten bir hesabın var mı?")}{" "}</Text>
        <Text style={styles.switchLink}>{t("Giriş Yap ➔")}</Text>
      </BouncyPressable>
    </AuthShell>
  );
}

const styles = StyleSheet.create({
  social: { gap: 10 },
  divider: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#E2E8F0' },
  dividerText: { fontFamily: fonts.bodyMedium, fontSize: 12.5, color: '#94A3B8' },
  passwordBlock: { gap: 8 },
  ruleRow: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingLeft: 4 },
  ruleText: { fontFamily: fonts.bodyRegular, fontSize: 12.5, color: '#94A3B8' },
  ruleOk: { color: '#059669' },
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
  confirmText: { fontFamily: fonts.bodyRegular, fontSize: 15, lineHeight: 22, color: '#334155' },
  confirmHint: { fontFamily: fonts.bodyRegular, fontSize: 13, lineHeight: 18, color: '#64748B' },
  resendRow: { alignItems: 'center', paddingVertical: 6 },
  resendText: { fontFamily: fonts.headingSemiBold, fontSize: 14, color: colors.brand },
  resendDisabled: { color: '#94A3B8' },
  switchRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 4 },
  switchText: { fontFamily: fonts.bodyRegular, fontSize: 14, color: '#64748B' },
  switchLink: { fontFamily: fonts.headingBold, fontSize: 14, color: colors.brand },
});
