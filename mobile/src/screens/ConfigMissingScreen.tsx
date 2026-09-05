import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing, typography } from '../theme/tokens';

/** Shown instead of the app while `mobile/.env` has no real Supabase project values. */
export function ConfigMissingScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Supabase yapılandırması eksik</Text>
        <Text style={styles.body}>
          `mobile/.env` dosyası yok veya EXPO_PUBLIC_SUPABASE_URL / EXPO_PUBLIC_SUPABASE_ANON_KEY
          değerleri boş. `mobile/.env.example`'ı kopyalayıp gerçek Supabase proje değerleriyle
          doldur, sonra Expo'yu yeniden başlat.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  card: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: radii.lg,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  title: { ...typography.h3, color: colors.error },
  body: { ...typography.body },
});
