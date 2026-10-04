import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, ScrollView, StyleSheet, Text, Pressable, View } from 'react-native';

import { Button } from '../../components/Button';
import { OnboardingProgressHeader } from '../../components/OnboardingProgressHeader';
import { GOAL_OPTIONS } from '../../constants/onboarding';
import { useOnboarding } from '../../context/OnboardingContext';
import { colors, fonts, radii, shadow, spacing } from '../../theme/tokens';
import type { OnboardingStackScreenProps } from '../../navigation/types';
import { useTrackScreenView } from '../../lib/analytics';

export function GoalScreen({ navigation }: OnboardingStackScreenProps<'Goal'>) {
  useTrackScreenView('onboarding_step_viewed', { step: 'goal' });
  const { draft, updateDraft } = useOnboarding();

  return (
    <SafeAreaView style={styles.container}>
      <OnboardingProgressHeader step={3} onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>İngilizce konuşurken en büyük hedefin ne? 🎯</Text>
        <Text style={styles.subtitle}>
          Sana ilk önereceğimiz pratik modüllerini bu ihtiyaca göre seçeceğiz.
        </Text>

        <View style={styles.list}>
          {GOAL_OPTIONS.map((g) => {
            const isSelected = draft.learningGoal === g.id;
            return (
              <Pressable
                key={g.id}
                onPress={() => updateDraft({ learningGoal: g.id })}
                style={[styles.card, shadow.card, isSelected && { borderColor: colors.brand }]}
              >
                <View style={styles.cardTopRow}>
                  <View style={styles.cardTitleRow}>
                    {g.iconImage ? (
                      <Image source={g.iconImage} style={styles.cardIconImage} resizeMode="contain" />
                    ) : (
                      <Text style={styles.cardIcon}>{g.icon}</Text>
                    )}
                    <Text style={styles.cardTitle}>{g.title}</Text>
                  </View>
                  <View
                    style={[
                      styles.badgePill,
                      isSelected && { backgroundColor: colors.brand },
                    ]}
                  >
                    <Text style={[styles.badgeText, isSelected && styles.badgeTextSelected]}>
                      {g.badge}
                    </Text>
                  </View>
                </View>
                <Text style={styles.cardDesc}>{g.desc}</Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button label="Devam Et ➔" variant="chunky" onPress={() => navigation.navigate('MicPermission')} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  scroll: {
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
    padding: spacing.sm,
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
    gap: 6,
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
    fontSize: 11,
    color: colors.textMuted,
    lineHeight: 16,
    paddingLeft: 22,
  },
  footer: {
    padding: spacing.lg,
    paddingTop: spacing.sm,
  },
});
