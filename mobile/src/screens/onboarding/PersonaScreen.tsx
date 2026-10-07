import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Button } from '../../components/Button';
import { OnboardingProgressHeader } from '../../components/OnboardingProgressHeader';
import { PERSONA_OPTIONS } from '../../constants/onboarding';
import { useOnboarding } from '../../context/OnboardingContext';
import { colors, fonts, radii, shadow, spacing } from '../../theme/tokens';
import type { OnboardingStackScreenProps } from '../../navigation/types';
import { useTrackScreenView } from '../../lib/analytics';
import { t } from '../../i18n';

export function PersonaScreen({ navigation }: OnboardingStackScreenProps<'Persona'>) {
  useTrackScreenView('onboarding_step_viewed', { step: 'persona' });
  const { draft, updateDraft } = useOnboarding();

  return (
    <SafeAreaView style={styles.container}>
      <OnboardingProgressHeader step={2} onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{t("Şu anki durumunu en iyi hangisi anlatıyor? 🌟")}</Text>
        <Text style={styles.subtitle}>{t("Konuşacağımız konular ve kelimeler bu seçimine göre özelleşecek.")}</Text>

        <View style={styles.list}>
          {PERSONA_OPTIONS.map((p) => {
            const isSelected = draft.personaId === p.id;
            return (
              <Pressable
                key={p.id}
                onPress={() => updateDraft({ personaId: p.id })}
                style={[styles.card, shadow.card, isSelected && { borderColor: colors.brand }]}
              >
                <Image source={p.avatarSource} style={styles.avatar} resizeMode="cover" />
                <View style={styles.cardContent}>
                  <View style={styles.cardTopRow}>
                    <View style={styles.cardTitleRow}>
                      <Text style={styles.cardIcon}>{p.icon}</Text>
                      <Text style={styles.cardTitle} numberOfLines={1}>
                        {p.title}
                      </Text>
                    </View>
                    <View style={styles.badgePill}>
                      <Text style={styles.badgeText}>{p.badge}</Text>
                    </View>
                  </View>
                  <Text style={styles.cardSub} numberOfLines={2}>
                    {p.sub}
                  </Text>
                </View>
                {isSelected ? (
                  <Ionicons name="checkmark-circle" size={20} color={colors.brand} />
                ) : null}
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button label={t("Devam Et ➔")} variant="chunky" onPress={() => navigation.navigate('Goal')} />
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: '#FFFFFF',
    borderRadius: radii.lg,
    borderWidth: 2,
    borderColor: colors.border,
    padding: spacing.sm,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
  },
  cardContent: {
    flex: 1,
    minWidth: 0,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.xs,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    flexShrink: 1,
  },
  cardIcon: {
    fontSize: 13,
  },
  cardTitle: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 12.5,
    color: colors.textHeading,
    flexShrink: 1,
  },
  badgePill: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: {
    fontFamily: fonts.mono,
    fontSize: 8.5,
    fontWeight: 'bold',
    color: colors.textMuted,
  },
  cardSub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10.5,
    color: colors.textMuted,
    marginTop: 2,
  },
  footer: {
    padding: spacing.lg,
    paddingTop: spacing.sm,
  },
});
