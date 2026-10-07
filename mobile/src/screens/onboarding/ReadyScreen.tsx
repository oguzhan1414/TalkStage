import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, StyleSheet, Text, View } from 'react-native';

import { yankiCelebrateImage } from '../../assets/images';
import { Button } from '../../components/Button';
import { useOnboarding } from '../../context/OnboardingContext';
import { DAILY_GOAL_OPTIONS, GOAL_OPTIONS, ONBOARDING_LEVEL_OPTIONS, PERSONA_OPTIONS } from '../../constants/onboarding';
import { colors, fonts, radii, spacing } from '../../theme/tokens';
import type { OnboardingStackScreenProps } from '../../navigation/types';
import { useTrackScreenView } from '../../lib/analytics';
import { t } from '../../i18n';

export function ReadyScreen({ navigation: _navigation }: OnboardingStackScreenProps<'Ready'>) {
  useTrackScreenView('onboarding_step_viewed', { step: 'ready' });
  const { draft, completedProfile, finishOnboarding } = useOnboarding();

  // `completedProfile` is set the instant `Preparing` succeeds — normal flow
  // always has it by the time this screen mounts. Falling back to the local
  // draft just avoids ever crashing this celebratory screen on an edge case.
  const displayName = completedProfile?.display_name ?? draft.displayName.trim() ?? t("Konuşmacı");
  const level = completedProfile?.cefr_level ?? draft.cefrLevel ?? 'A1';
  const dailyMinutes = completedProfile?.daily_target_minutes ?? draft.dailyTargetMinutes;

  const personaObj = PERSONA_OPTIONS.find((p) => p.id === (completedProfile?.persona_id ?? draft.personaId));
  const goalObj = GOAL_OPTIONS.find((g) => g.id === (completedProfile?.learning_goal ?? draft.learningGoal));
  const levelObj = ONBOARDING_LEVEL_OPTIONS.find((l) => l.code === level);
  const dailyObj = DAILY_GOAL_OPTIONS.find((d) => d.minutes === dailyMinutes);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image source={yankiCelebrateImage} style={styles.avatar} resizeMode="contain" />

        <View style={styles.doneBadge}>
          <Text style={styles.doneBadgeText}>{t("🎉 KİŞİSEL PLANIN TAMAMLANDI")}</Text>
        </View>

        <Text style={styles.title}>{t("Sahne Senin, {{displayName}}!", { displayName })}</Text>
        <Text style={styles.subtitle}>{t("{{title}} hedeflerin için {{level}} seviyesinde özel sahne kuruldu.", { title: personaObj?.title, level })}</Text>

        <View style={styles.passCard}>
          <View style={styles.passRow}>
            <Text style={styles.passLabel}>{t("Başlangıç Seviyen")}</Text>
            <Text style={styles.passValueBrand}>
              {level} • {levelObj?.title}
            </Text>
          </View>
          <View style={styles.passRow}>
            <Text style={styles.passLabel}>{t("Öncelikli Odak")}</Text>
            <Text style={styles.passValue} numberOfLines={1}>
              {goalObj?.title}
            </Text>
          </View>
          <View style={styles.passRow}>
            <Text style={styles.passLabel}>{t("Günlük Pratik")}</Text>
            <Text style={styles.passValueSuccess}>{dailyObj?.minutes ?? dailyMinutes}{" "}{t("Dakika / Gün")}</Text>
          </View>
          <View style={styles.passRow}>
            <Text style={styles.passLabel}>{t("AI Koç Desteği")}</Text>
            <Text style={styles.passValueAccent}>{t("Canlı Türkçe Fısıltı Aktif 🎙️")}</Text>
          </View>
          <View style={[styles.passRow, styles.passRowLast]}>
            <Text style={styles.passLabel}>{t("İlk Sahnen")}</Text>
            <Text style={styles.passValue} numberOfLines={1}>
              {personaObj?.category ?? t("Senin İçin Seçildi")}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Button label={t("Sahneye Çık & Başla 🚀")} variant="chunky" onPress={finishOnboarding} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  avatar: {
    width: 72,
    height: 72,
    marginBottom: spacing.sm,
  },
  doneBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.25)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: radii.pill,
    marginBottom: spacing.sm,
  },
  doneBadgeText: {
    fontFamily: fonts.mono,
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.success,
  },
  title: {
    fontFamily: fonts.headingBold,
    fontSize: 21,
    color: colors.textHeading,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12.5,
    color: colors.textBody,
    textAlign: 'center',
    marginTop: 4,
    maxWidth: 300,
    lineHeight: 18,
  },
  passCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E0E7FF',
    borderRadius: radii.lg,
    padding: spacing.md,
    marginTop: spacing.lg,
    gap: spacing.xs,
    shadowColor: colors.brand,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
  },
  passRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  passRowLast: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  passLabel: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11.5,
    color: colors.textMuted,
  },
  passValue: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 12,
    color: colors.textHeading,
    maxWidth: 180,
    textAlign: 'right',
  },
  passValueBrand: {
    fontFamily: fonts.headingBold,
    fontSize: 12,
    color: colors.brand,
  },
  passValueSuccess: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 12,
    color: colors.success,
  },
  passValueAccent: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 12,
    color: colors.accent,
  },
  footer: {
    padding: spacing.lg,
    paddingTop: spacing.sm,
  },
});
