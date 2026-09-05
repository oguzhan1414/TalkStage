import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, ScrollView, StyleSheet, Text, Pressable, View } from 'react-native';

import { Button } from '../../components/Button';
import { OnboardingProgressHeader } from '../../components/OnboardingProgressHeader';
import { ONBOARDING_LEVEL_OPTIONS } from '../../constants/onboarding';
import { useOnboarding } from '../../context/OnboardingContext';
import { colors, fonts, radii, shadow, spacing } from '../../theme/tokens';
import type { OnboardingStackScreenProps } from '../../navigation/types';

export function LevelScreen({ navigation }: OnboardingStackScreenProps<'Level'>) {
  const { draft, updateDraft } = useOnboarding();

  return (
    <SafeAreaView style={styles.container}>
      <OnboardingProgressHeader step={4} onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Şu anki İngilizce seviyeni seç 🎓</Text>
        <Text style={styles.subtitle}>
          Yapay zeka konuşma hızını ve kelime zorluğunu buna göre ayarlayacak.
        </Text>

        <View style={styles.grid}>
          {ONBOARDING_LEVEL_OPTIONS.map((lvl) => {
            const isSelected = draft.cefrLevel === lvl.code;
            return (
              <Pressable
                key={lvl.code}
                onPress={() => updateDraft({ cefrLevel: lvl.code })}
                style={[styles.card, shadow.card, isSelected && { borderColor: colors.brand }]}
              >
                <View style={styles.cardTopRow}>
                  <Image source={lvl.image} style={styles.shield} resizeMode="contain" />
                  <View style={[styles.codeBadge, { backgroundColor: lvl.color }]}>
                    <Text style={styles.codeBadgeText}>{lvl.code}</Text>
                  </View>
                </View>
                <Text style={styles.cardTitle}>{lvl.title}</Text>
                <Text style={styles.cardEnTitle}>{lvl.enTitle}</Text>
                <View style={styles.realLifeBox}>
                  <Text style={styles.realLifeLabel}>GERÇEK HAYATTA:</Text>
                  <Text style={styles.realLifeText} numberOfLines={3}>
                    {lvl.realLife}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button label="Devam Et ➔" onPress={() => navigation.navigate('DailyTime')} />
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  card: {
    width: '47.5%',
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
    marginBottom: 6,
  },
  shield: {
    width: 32,
    height: 32,
  },
  codeBadge: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  codeBadgeText: {
    fontFamily: fonts.headingBold,
    fontSize: 10.5,
    color: '#FFFFFF',
  },
  cardTitle: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 12,
    color: colors.textHeading,
  },
  cardEnTitle: {
    fontFamily: fonts.mono,
    fontSize: 9,
    color: colors.textMuted,
  },
  realLifeBox: {
    marginTop: 6,
    backgroundColor: '#F8FAFC',
    borderRadius: radii.sm,
    padding: 6,
  },
  realLifeLabel: {
    fontFamily: fonts.mono,
    fontSize: 7.5,
    fontWeight: 'bold',
    color: colors.textMuted,
    marginBottom: 2,
  },
  realLifeText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 9.5,
    color: colors.textBody,
    lineHeight: 13,
  },
  footer: {
    padding: spacing.lg,
    paddingTop: spacing.sm,
  },
});
