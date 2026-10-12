import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { mivoImages } from '../../assets/images';
import { Button } from '../../components/Button';
import { OnboardingProgressHeader } from '../../components/OnboardingProgressHeader';
import { enableNotifications, NOTIFICATIONS_UNAVAILABLE, TIME_PRESETS } from '../../lib/notifications';
import { isRevenueCatConfigured } from '../../lib/revenuecat';
import { colors, fonts, radii, spacing } from '../../theme/tokens';
import type { OnboardingStackScreenProps } from '../../navigation/types';
import { useTrackScreenView } from '../../lib/analytics';
import { t } from '../../i18n';

const ICONS: Record<number, string> = { 8: '🌅', 12: '☀️', 19: '🌙', 21: '✨' };

/**
 * Soft ask before the system permission dialog: pick the time first, then "Hatırlat" opens the system prompt.
 * "Şimdi değil" never touches the permission, so it can be asked again after the first practice.
 */
export function ReminderScreen({ navigation }: OnboardingStackScreenProps<'Reminder'>) {
  useTrackScreenView('onboarding_step_viewed', { step: 'reminder' });
  const [selected, setSelected] = useState(2); // Akşam 19:30
  const [busy, setBusy] = useState(false);

  // Offer Pro only when payments are set up (always visible in development so the screen can be reviewed;
  // the buy button then says "Yakında"). The microphone is always the very last step.
  const next = () => navigation.navigate(isRevenueCatConfigured || __DEV__ ? 'Premium' : 'Microphone');

  const remind = async () => {
    if (NOTIFICATIONS_UNAVAILABLE) return next();
    setBusy(true);
    try {
      const preset = TIME_PRESETS[selected];
      await enableNotifications(preset.hour, preset.minute);
    } finally {
      setBusy(false);
    }
    next();
  };

  return (
    <SafeAreaView style={styles.container}>
      <OnboardingProgressHeader step={5} onBack={() => navigation.goBack()} />

      <View style={styles.content}>
        <View style={styles.speechRow}>
          <Image source={mivoImages.idle} style={styles.mivo} resizeMode="contain" />
          <View style={styles.bubble}>
            <Text style={styles.bubbleText}>{t("Ne zaman hatırlatayım?")}</Text>
          </View>
        </View>
        <Text style={styles.sub}>{t("Bugünkü görevini ve yarınki planını doğru saatte hatırlatırım. İstediğin zaman Ayarlar'dan değiştirebilirsin.")}</Text>

        <View style={styles.list}>
          {TIME_PRESETS.map((p, i) => {
            const active = i === selected;
            return (
              <Pressable
                key={`${p.hour}:${p.minute}`}
                onPress={() => setSelected(i)}
                style={[styles.card, active && styles.cardActive]}
                accessibilityRole="button"
                accessibilityState={{ selected: active }}
              >
                <Text style={styles.cardIcon}>{ICONS[p.hour] ?? '⏰'}</Text>
                <Text style={[styles.cardLabel, active && styles.cardLabelActive]}>{p.label}</Text>
                <Text style={styles.cardTime}>
                  {String(p.hour).padStart(2, '0')}:{String(p.minute).padStart(2, '0')}
                </Text>
              </Pressable>
            );
          })}
        </View>

      </View>

      <View style={styles.footer}>
        <Button label={NOTIFICATIONS_UNAVAILABLE ? t("Devam Et ➔") : t("Hatırlat ➔")} variant="chunky" onPress={remind} loading={busy} />
        {!NOTIFICATIONS_UNAVAILABLE ? (
          <Pressable onPress={next} hitSlop={10} style={styles.skip} accessibilityRole="button">
            <Text style={styles.skipText}>{t("Şimdi değil")}</Text>
          </Pressable>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.backgroundSecondary },
  content: { flex: 1, padding: spacing.lg, gap: spacing.md },
  speechRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  mivo: { width: 92, height: 110 },
  bubble: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E0E7FF',
    borderRadius: radii.xl,
    borderTopLeftRadius: 6,
    padding: spacing.md,
  },
  bubbleText: { fontFamily: fonts.headingSemiBold, fontSize: 17, lineHeight: 23, color: colors.textHeading },
  sub: { fontFamily: fonts.bodyRegular, fontSize: 13.5, lineHeight: 19, color: colors.textBody },
  list: { gap: 10, marginTop: spacing.xs },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radii.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
  },
  cardActive: { borderColor: colors.brand, backgroundColor: '#F5F3FF' },
  cardIcon: { fontSize: 22 },
  cardLabel: { flex: 1, fontFamily: fonts.headingSemiBold, fontSize: 16, color: colors.textHeading },
  cardLabelActive: { color: colors.brand },
  cardTime: { fontFamily: fonts.headingBold, fontSize: 15, color: colors.textMuted },
  note: { fontFamily: fonts.bodyRegular, fontSize: 12, color: colors.textMuted, textAlign: 'center' },
  footer: { padding: spacing.lg, paddingTop: spacing.sm, gap: 6 },
  skip: { alignItems: 'center', paddingVertical: 10 },
  skipText: { fontFamily: fonts.headingSemiBold, fontSize: 14, color: colors.textMuted },
});
