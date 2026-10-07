import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useEffect } from 'react';

import { premiumModuleIcons } from '../assets/images';
import { useMivoTransition } from '../components/MivoTransitionOverlay';
import { BADGES } from '../constants/badges';
import { useEarnedBadges } from '../hooks/useEarnedBadges';
import { colors, fonts, radii, shadow, spacing, typography } from '../theme/tokens';
import type { BadgesScreenProps } from '../navigation/types';
import { MivoLoader } from '../components/MivoLoader';
import { t } from '../i18n';

export function BadgesScreen({ navigation }: BadgesScreenProps) {
  const { finishTransition } = useMivoTransition();
  const { earnedBadgeIds, isLoading } = useEarnedBadges();

  useEffect(() => {
    if (!isLoading) finishTransition();
  }, [finishTransition, isLoading]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
          <Ionicons name="chevron-back" size={24} color={colors.textHeading} />
        </Pressable>
        <Text style={styles.title}>{t("Başarılar")}</Text>
        <View style={{ width: 24 }} />
      </View>

      {isLoading ? (
        <MivoLoader size={110} label={t("Rozetlerin yükleniyor…")} style={styles.loading} />
      ) : (
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.progressHero}>
            <Image source={premiumModuleIcons.achievements} style={styles.heroImage} resizeMode="contain" />
            <View style={styles.heroCopy}>
              <Text style={styles.heroEyebrow}>{t("GELİŞİM PORTFÖYÜ")}</Text>
              <Text style={styles.heroTitle}>{t("{{size}} başarı tamamlandı", { size: earnedBadgeIds.size })}</Text>
              <Text style={styles.heroSubtitle}>{t("Konuşma, süreklilik ve kelime gelişimin tek yerde.")}</Text>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: `${(earnedBadgeIds.size / BADGES.length) * 100}%` }]} />
              </View>
            </View>
          </View>
          <Text style={styles.sectionTitle}>{t("Tüm başarılar")}</Text>
          <View style={styles.grid}>
            {BADGES.map((badge) => {
              const earned = earnedBadgeIds.has(badge.id);
              return (
                <View key={badge.id} style={[styles.card, shadow.card]}>
                  <View style={[styles.badgeMedallion, earned && styles.badgeMedallionEarned]}>
                    <Image
                      source={badge.image}
                      style={[styles.badgeImage, !earned && styles.badgeImageLocked]}
                      resizeMode="contain"
                    />
                    {!earned && <View style={styles.lockDot}><Ionicons name="lock-closed" size={9} color="#64748B" /></View>}
                  </View>
                  <Text style={[styles.badgeTitle, !earned && styles.badgeTitleLocked]}>{badge.title}</Text>
                  <Text style={styles.badgeCriteria}>{badge.criteriaText}</Text>
                </View>
              );
            })}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  title: { ...typography.h2 },
  loading: {
    marginTop: spacing.xl,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  progressHero: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    borderRadius: 20,
    padding: 16,
    overflow: 'hidden',
  },
  heroImage: { width: 92, height: 92, marginRight: 12 },
  heroCopy: { flex: 1 },
  heroEyebrow: { fontFamily: fonts.headingBold, fontSize: 9, letterSpacing: 1.1, color: '#67E8F9' },
  heroTitle: { fontFamily: fonts.headingBold, fontSize: 17, color: '#FFFFFF', marginTop: 4 },
  heroSubtitle: { fontFamily: fonts.bodyRegular, fontSize: 10.5, lineHeight: 15, color: '#CBD5E1', marginTop: 3 },
  progressTrack: { height: 4, borderRadius: 2, backgroundColor: '#334155', overflow: 'hidden', marginTop: 10 },
  progressFill: { height: '100%', borderRadius: 2, backgroundColor: '#22D3EE' },
  sectionTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 15,
    color: colors.textHeading,
    marginTop: spacing.xs,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  card: {
    width: '47%',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.md,
    alignItems: 'center',
    gap: 2,
  },
  badgeMedallion: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  badgeMedallionEarned: {
    backgroundColor: '#EEF2FF',
    borderColor: '#C7D2FE',
  },
  badgeImage: {
    width: 56,
    height: 56,
  },
  badgeImageLocked: {
    opacity: 0.42,
  },
  lockDot: {
    position: 'absolute',
    right: -4,
    bottom: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeTitle: {
    ...typography.bodyMedium,
    fontFamily: fonts.headingSemiBold,
    textAlign: 'center',
  },
  badgeTitleLocked: {
    color: colors.textMuted,
  },
  badgeCriteria: {
    ...typography.caption,
    textAlign: 'center',
  },
});
