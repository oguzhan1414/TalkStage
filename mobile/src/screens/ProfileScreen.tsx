import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import {
  minimalFeatureIcons,
  stateImages,
} from '../assets/images';
import { AppHeader } from '../components/AppHeader';
import { BouncyPressable } from '../components/BouncyPressable';
import { ContributionHeatmap } from '../components/ContributionHeatmap';
import { useMivoTransition } from '../components/MivoTransitionOverlay';
import { BADGES } from '../constants/badges';
import { useEarnedBadges } from '../hooks/useEarnedBadges';
import { api } from '../lib/api';
import { isProUser } from '../lib/revenuecat';
import type { MainTabScreenProps } from '../navigation/types';
import { colors, fonts, shadow, spacing } from '../theme/tokens';
import type { GrammarMistakeOut, ProfileOut, ProgressOut } from '../types/api';
import { t } from '../i18n';

/**
 * "Özellikler" tab — one flat list of practice-tool cards (no section
 * headers, no horizontal-scroll rows) matching the reference layout the user
 * supplied: title + short description on the left, icon on the right.
 * Account info (name, avatar, CEFR level report, reminders, privacy, sign
 * out, delete account) lives in `AccountSettingsScreen`, reached by tapping
 * the avatar in the shared `AppHeader` above.
 */
export function ProfileScreen({ navigation }: MainTabScreenProps<'Profile'>) {
  const { transitionTo } = useMivoTransition();

  const { data: profile } = useQuery({
    queryKey: ['me'],
    queryFn: () => api.get<ProfileOut>('/me'),
  });
  const { data: progress } = useQuery({
    queryKey: ['progress'],
    queryFn: () => api.get<ProgressOut[]>('/progress'),
  });
  const { data: mistakes } = useQuery({
    queryKey: ['grammar-mistakes'],
    queryFn: () => api.get<GrammarMistakeOut[]>('/progress/mistakes'),
  });
  const { data: isPro } = useQuery({
    queryKey: ['isProUser'],
    queryFn: isProUser,
    staleTime: 60_000,
  });
  const { earnedBadgeIds } = useEarnedBadges();

  const dailyTargetMinutes = profile?.daily_target_minutes ?? 15;

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />

      <View style={styles.topHeader}>
        <View style={styles.topHeaderCol}>
          <Text style={styles.topHeaderTitle}>{t("Özellikler")}</Text>
          <Text style={styles.topHeaderSub}>{t("Pratik araçların tek bir yerde")}</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Pratik Geçmişi — GitHub tarzı contribution heatmap, hep en üstte. */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t("Pratik Geçmişi")}</Text>
          <ContributionHeatmap progress={progress ?? []} dailyTargetMinutes={dailyTargetMinutes} />
        </View>

        {/* Tüm özellikler — tek, düz liste (gruplara ayrılmıyor). */}
        <View style={styles.featureList}>
          <FeatureCard
            title={t("Hata Defterim")}
            desc={t("{{p0}} kayıt · Gramer kurallarını tekrar et", { p0: mistakes?.length ?? 0 })}
            icon={minimalFeatureIcons.mistakesNotebook}
            onPress={() => transitionTo(() => navigation.navigate('MistakesNotebook'), t("Hata Defterin Açılıyor…"))}
          />
          <FeatureCard
            title={t("Mivo'nun Hatırladıkları")}
            desc={t("Sohbetlerden öğrendiği şeyleri gör, düzenle veya sil")}
            icon={minimalFeatureIcons.mivoMemory}
            onPress={() => navigation.navigate('MivoMemory')}
          />
          <FeatureCard
            title={t("Kelime Kütüphanesi")}
            desc={t("900 çekirdek kelime · İncele, sandığına ekle")}
            icon={minimalFeatureIcons.vocabLibrary}
            onPress={() => navigation.navigate('VocabLibrary')}
          />
          <FeatureCard
            title={t("Kelime Klasörlerim")}
            desc={t("Kendi başlıklarınla kelime grupla ve çalış")}
            icon={minimalFeatureIcons.vocabFolders}
            onPress={() => navigation.navigate('VocabDecks')}
          />
          <FeatureCard
            title={t("Rozetlerim")}
            desc={t("{{size}}/{{total}} kazanıldı · Başarılarını gör", { size: earnedBadgeIds.size, total: BADGES.length })}
            icon={minimalFeatureIcons.badges}
            onPress={() => transitionTo(() => navigation.navigate('Badges'), t("3D Rozetlerin Yükleniyor…"))}
          />
          <FeatureCard
            title={t("Okuma & Hikayeler")}
            desc={t("A1'den C2'ye tüm hikayeleri gör, oku ve dinle")}
            icon={minimalFeatureIcons.reading}
            onPress={() => navigation.navigate('ReadingList')}
          />
          <FeatureCard
            title={t("Podcastler")}
            desc={t("Dinleme ve telaffuz pratiği yap")}
            icon={minimalFeatureIcons.podcasts}
            onPress={() => navigation.navigate('PodcastList')}
          />
          <FeatureCard
            title={t("Telaffuz")}
            desc={t("Sık yanlış söylenen kelimeleri düzelt")}
            icon={minimalFeatureIcons.pronunciation}
            onPress={() => navigation.navigate('MispronouncedWords')}
          />
        </View>

        {/* VIP Stage Pass — kasıtlı olarak farklı, promosyon stili korunuyor. */}
        <BouncyPressable
          onPress={() => navigation.navigate('Paywall')}
          style={[styles.vipBanner, shadow.card]}
          hapticType="medium"
          scaleTo={0.97}
        >
          <Image
            source={stateImages.vipPass}
            style={styles.vipPassImage}
            resizeMode="contain"
          />
          <View style={styles.vipContent}>
            <Text style={styles.vipBadge}>{isPro ? t("PRO ÜYELİĞİN AKTİF 🌟") : t("STAGE PASS VIP")}</Text>
            <Text style={styles.vipTitle}>{isPro ? t("Sınırsız Ayrıcalıklar") : t("Sınırsız Sahneye Çık")}</Text>
            <Text style={styles.vipDesc}>
              {isPro
                ? t("Tüm mülakatlar, podcastler ve derin AI analizleri sınırsız kullanımında.")
                : t("Günlük limitleri kaldır, 40 podcast ve tüm mülakatların kilidini aç.")}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={isPro ? '#10B981' : '#F59E0B'} />
        </BouncyPressable>
      </ScrollView>
    </SafeAreaView>
  );
}

/** One uniform practice-tool card — title + description on the left, an
 * icon (illustration if one exists, otherwise an Ionicons glyph) on the
 * right. Used for every entry in the flat "Özellikler" list below. */
function FeatureCard({
  title,
  desc,
  onPress,
  icon,
  iconName,
}: {
  title: string;
  desc: string;
  onPress: () => void;
  icon?: ReturnType<typeof require>;
  iconName?: keyof typeof Ionicons.glyphMap;
}) {
  return (
    <BouncyPressable
      onPress={onPress}
      style={[styles.featureCard, shadow.card]}
      hapticType="light"
      scaleTo={0.97}
    >
      <View style={styles.featureCardTextCol}>
        <Text style={styles.featureCardTitle}>{title}</Text>
        <Text style={styles.featureCardDesc}>{desc}</Text>
      </View>
      <View style={styles.featureCardIconBox}>
        {icon ? (
          <Image source={icon} style={styles.featureCardIconImage} resizeMode="contain" />
        ) : (
          <Ionicons name={iconName ?? 'sparkles-outline'} size={28} color={colors.brand} />
        )}
      </View>
    </BouncyPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
  },
  topHeaderCol: {
    flex: 1,
  },
  topHeaderTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 18,
    color: colors.textHeading,
  },
  topHeaderSub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 1,
  },
  scrollContent: {
    padding: spacing.md,
    paddingTop: 0,
    paddingBottom: 80,
  },

  section: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 15,
    color: colors.textHeading,
    marginBottom: spacing.xs,
  },

  /* Flat feature card list */
  featureList: {
    gap: 12,
    marginBottom: spacing.md,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#DDD6FE',
    paddingVertical: 16,
    paddingHorizontal: 18,
    gap: 14,
  },
  featureCardTextCol: {
    flex: 1,
    gap: 4,
  },
  featureCardTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 16,
    color: colors.textHeading,
  },
  featureCardDesc: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12.5,
    color: colors.textMuted,
    lineHeight: 17,
  },
  featureCardIconBox: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureCardIconImage: {
    width: 52,
    height: 52,
  },

  /* VIP Stage Pass Banner */
  vipBanner: {
    backgroundColor: '#0F172A',
    borderRadius: 18,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  vipPassImage: {
    width: 44,
    height: 44,
    marginRight: 10,
  },
  vipContent: {
    flex: 1,
    paddingRight: 6,
  },
  vipBadge: {
    fontFamily: fonts.mono,
    fontSize: 9,
    fontWeight: 'bold',
    color: '#F59E0B',
    marginBottom: 2,
  },
  vipTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 14,
    color: '#FFFFFF',
  },
  vipDesc: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10.5,
    color: '#94A3B8',
    marginTop: 1,
  },
});
