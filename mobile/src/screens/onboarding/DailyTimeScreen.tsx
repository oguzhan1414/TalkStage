import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, StyleSheet, Text, Pressable, View } from 'react-native';

import { Button } from '../../components/Button';
import { OnboardingProgressHeader } from '../../components/OnboardingProgressHeader';
import { DAILY_GOAL_OPTIONS } from '../../constants/onboarding';
import { useOnboarding } from '../../context/OnboardingContext';
import { colors, fonts, radii, shadow, spacing } from '../../theme/tokens';
import type { OnboardingStackScreenProps } from '../../navigation/types';
import { useTrackScreenView } from '../../lib/analytics';

export function DailyTimeScreen({ navigation }: OnboardingStackScreenProps<'DailyTime'>) {
  useTrackScreenView('onboarding_step_viewed', { step: 'daily_time' });
  const { draft, updateDraft } = useOnboarding();
  const selectedId = DAILY_GOAL_OPTIONS.find((d) => d.minutes === draft.dailyTargetMinutes)?.id ?? 'regular';

  return (
    <SafeAreaView style={styles.container}>
      <OnboardingProgressHeader step={6} onBack={() => navigation.goBack()} />

      <View style={styles.content}>
        <Text style={styles.title}>Günde ne kadar vakit ayırabilirsin? ⏱️</Text>
        <Text style={styles.subtitle}>
          Sırrımız saatlerce çalışmak değil; her gün küçük bir seansla süreklilik kazanmak.
        </Text>

        <View style={styles.list}>
          {DAILY_GOAL_OPTIONS.map((dg) => {
            const isSelected = selectedId === dg.id;
            return (
              <Pressable
                key={dg.id}
                onPress={() => updateDraft({ dailyTargetMinutes: dg.minutes })}
                style={[styles.card, shadow.card, isSelected && { borderColor: colors.brand }]}
              >
                <View style={styles.cardTopRow}>
                  <View style={styles.cardTitleRow}>
                    {dg.iconImage ? (
                      <Image source={dg.iconImage} style={styles.cardIconImage} resizeMode="contain" />
                    ) : (
                      <Text style={styles.cardIcon}>{dg.flameEmoji}</Text>
                    )}
                    <Text style={styles.cardTitle}>
                      {dg.minutes} Dakika / Gün ({dg.title})
                    </Text>
                  </View>
                  <View style={[styles.badgePill, isSelected && { backgroundColor: colors.brand }]}>
                    <Text style={[styles.badgeText, isSelected && styles.badgeTextSelected]}>
                      {dg.badge}
                    </Text>
                  </View>
                </View>
                <Text style={styles.cardDesc}>{dg.desc}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={styles.footer}>
        <Button
          label="Kişisel Konuşma Planımı Oluştur ✨"
          variant="chunky"
          onPress={() => navigation.navigate('Preparing')}
        />
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
    padding: spacing.lg,
  },
  title: {
    fontFamily: fonts.headingBold,
    fontSize: 17,
    color: colors.textHeading,
    lineHeight: 22,
  },
  subtitle: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 4,
    marginBottom: spacing.md,
  },
  list: {
    gap: spacing.sm,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.lg,
    borderWidth: 2,
    borderColor: colors.border,
    padding: spacing.md,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.xs,
    marginBottom: 4,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexShrink: 1,
  },
  cardIcon: {
    fontSize: 16,
  },
  cardIconImage: {
    width: 28,
    height: 28,
  },
  cardTitle: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 12.5,
    color: colors.textHeading,
    flexShrink: 1,
  },
  badgePill: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.pill,
  },
  badgeText: {
    fontFamily: fonts.mono,
    fontSize: 8.5,
    fontWeight: 'bold',
    color: colors.textMuted,
  },
  badgeTextSelected: {
    color: '#FFFFFF',
  },
  cardDesc: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11.5,
    color: colors.textMuted,
    lineHeight: 16,
    paddingLeft: 24,
  },
  footer: {
    padding: spacing.lg,
    paddingTop: spacing.sm,
  },
});
