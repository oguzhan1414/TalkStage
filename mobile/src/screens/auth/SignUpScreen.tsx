import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';

import { Button } from '../../components/Button';
import { TextField } from '../../components/TextField';
import { supabase } from '../../lib/supabase';
import { colors, spacing, typography } from '../../theme/tokens';
import type { AuthStackScreenProps } from '../../navigation/types';

export function SignUpScreen({ navigation }: AuthStackScreenProps<'SignUp'>) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmationSent, setConfirmationSent] = useState(false);

  const handleSignUp = async () => {
    setError(null);
    setLoading(true);
    const { data, error: signUpError } = await supabase.auth.signUp({ email, password });
    setLoading(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }
    // No session yet + no error means Supabase is waiting on email confirmation.
    if (!data.session) {
      setConfirmationSent(true);
    }
  };

  if (confirmationSent) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>E-postanı kontrol et</Text>
        <Text style={styles.subtitle}>{email} adresine bir onay bağlantısı gönderdik.</Text>
        <Button label="Girişe dön" variant="ghost" onPress={() => navigation.navigate('SignIn')} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.header}>
        <Text style={styles.title}>Sahneni oluştur</Text>
        <Text style={styles.subtitle}>Birkaç saniyede hesabını aç.</Text>
      </View>

      <View style={styles.form}>
        <TextField
          label="E-posta"
          autoCapitalize="none"
          keyboardType="email-address"
          autoComplete="email"
          value={email}
          onChangeText={setEmail}
        />
        <TextField
          label="Şifre"
          secureTextEntry
          autoCapitalize="none"
          autoComplete="new-password"
          value={password}
          onChangeText={setPassword}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <Button
          label="Kayıt Ol"
          onPress={handleSignUp}
          loading={loading}
          disabled={!email || password.length < 6}
        />
      </View>

      <Button label="Zaten hesabın var mı? Giriş yap" variant="ghost" onPress={() => navigation.navigate('SignIn')} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
    justifyContent: 'center',
    gap: spacing.lg,
  },
  header: {
    gap: spacing.xs,
  },
  title: { ...typography.h1 },
  subtitle: { ...typography.body },
  form: {
    gap: spacing.md,
  },
  error: {
    ...typography.caption,
    color: colors.error,
  },
});
