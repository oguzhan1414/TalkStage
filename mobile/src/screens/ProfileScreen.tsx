import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useQuery } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, type ImageSourcePropType, ScrollView, StyleSheet, Text, View } from 'react-native';

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
import { XpLevelCard } from '../components/XpLevelCard';
import { t } from '../i18n';

/**
 * "Özellikler" tab: the dashboard of practice tools. Two sections ("Pratik Yap", "Gelişimim"), each a small bento:
 * two colourful tiles side by side and one wide card below. Account info (name, avatar, CEFR level report,
 * reminders, privacy, sign out, delete account) lives in `AccountSettingsScreen`, reached by tapping the avatar
 * in the shared `AppHeader` above.
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
  const mistakeCount = mistakes?.length ?? 0;
  const badgePct = BADGES.length > 0 ? Math.round((earnedBadgeIds.size / BADGES.length) * 100) : 0;

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.topHeader}>
          <Text style={styles.topHeaderTitle}>{t("Özellikler")}</Text>
          <Text style={styles.topHeaderSub}>{t("Pratik araçların tek bir yerde")}</Text>
        </View>

        {/* Mivo ile dostluk: toplam XP'den türetilen seviye (constants/xp.ts). */}
        <XpLevelCard xp={profile?.xp} />

        {/* Pratik Geçmişi: GitHub tarzı contribution heatmap. */}
        <View style={[styles.heatCard, shadow.card]}>
          <Text style={styles.heatTitle}>{t("Pratik Geçmişi")}</Text>
          <ContributionHeatmap progress={progress ?? []} dailyTargetMinutes={dailyTargetMinutes} />
        </View>

        {/* ---------------- Pratik Yap ---------------- */}
        <SectionHead title={t("Pratik Yap")} caption={t("Okumadan telaffuza, günlük araçların")} />
        <View style={styles.tileRow}>
          <FeatureTile
            title={t("Hikayeler")}
            desc={t("Dinle, cümleleri kur, sonra Mivo'ya sesli anlat")}
            icon={minimalFeatureIcons.reading}
            tint="#DBEAFE"
            onPress={() => navigation.navigate('ReadingList')}
          />
          <FeatureTile
            title={t("Podcastler")}
            desc={t("Gerçek diyalogları dinle, takip et, mini testle pekiştir")}
            icon={minimalFeatureIcons.podcasts}
            tint="#E0E7FF"
            onPress={() => navigation.navigate('PodcastList')}
          />
        </View>
        <FeatureWide
          title={t("Telaffuz")}
          desc={t("Sık yanlış söylenen kelimeleri düzelt")}
          icon={minimalFeatureIcons.pronunciation}
          tint="#FFE4E6"
          onPress={() => navigation.navigate('MispronouncedWords')}
        />

        {/* ---------------- Gelişimim ---------------- */}
        <SectionHead title={t("Gelişimim")} caption={t("Nasıl gittiğine bak")} />
        <View style={styles.tileRow}>
          <FeatureTile
            title={t("Hata Defterim")}
            desc={t("{{p0}} kayıt · Gramer kurallarını tekrar et", { p0: mistakeCount })}
            icon={minimalFeatureIcons.mistakesNotebook}
            tint="#E0F2FE"
            badge={mistakeCount > 0 ? String(mistakeCount) : undefined}
            onPress={() => transitionTo(() => navigation.navigate('MistakesNotebook'), t("Hata Defterin Açılıyor…"))}
          />
          <FeatureTile
            title={t("Rozetlerim")}
            desc={t("{{size}}/{{total}} kazanıldı · Başarılarını gör", { size: earnedBadgeIds.size, total: BADGES.length })}
            icon={minimalFeatureIcons.badges}
            tint="#FEF3C7"
            progress={badgePct}
            onPress={() => transitionTo(() => navigation.navigate('Badges'), t("3D Rozetlerin Yükleniyor…"))}
          />
        </View>
        <FeatureWide
          title={t("Mivo'nun Hatırladıkları")}
          desc={t("Sohbetlerden öğrendiği şeyleri gör, düzenle veya sil")}
          icon={minimalFeatureIcons.mivoMemory}
          tint="#EDE9FE"
          onPress={() => navigation.navigate('MivoMemory')}
        />

        {/* VIP Spekvia Pro: kasıtlı olarak farklı, promosyon stili. */}
        <BouncyPressable onPress={() => navigation.navigate('Paywall')} style={[styles.vipWrap, shadow.card]} hapticType="medium" scaleTo={0.97}>
          <LinearGradient colors={['#0F172A', '#312E81']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.vipBanner}>
            <View style={styles.vipGlow} />
            <Image source={stateImages.vipPass} style={styles.vipPassImage} resizeMode="contain" />
            <View style={styles.vipContent}>
              <Text style={styles.vipBadge}>{isPro ? t("PRO ÜYELİĞİN AKTİF 🌟") : t("SPEKVIA PRO")}</Text>
              <Text style={styles.vipTitle}>{isPro ? t("Sınırsız Ayrıcalıklar") : t("Sınırsız Sahneye Çık")}</Text>
              <Text style={styles.vipDesc}>
                {isPro
                  ? t("Sınırsız sesli senaryo, 30 dakikaya kadar oturumlar ve tüm gramer dersleri hesabında açık.")
                  : t("Günlük sesli senaryo limitini kaldır ve tüm gramer derslerinin kilidini aç.")}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={isPro ? '#34D399' : '#FBBF24'} />
          </LinearGradient>
        </BouncyPressable>
      </ScrollView>
    </SafeAreaView>
  );
}

function SectionHead({ title, caption }: { title: string; caption: string }) {
  return (
    <View style={styles.sectionHead}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionCaption}>{caption}</Text>
    </View>
  );
}

type FeatureProps = {
  title: string;
  desc: string;
  icon: ImageSourcePropType;
  /** Soft background colour that matches the 3D icon. */
  tint: string;
  onPress: () => void;
};

/** Half-width tile: big 3D icon at the top right, title and short description at the bottom. */
function FeatureTile({ title, desc, icon, tint, onPress, badge, progress }: FeatureProps & { badge?: string; progress?: number }) {
  return (
    <BouncyPressable onPress={onPress} style={[styles.tileWrap, shadow.card]} hapticType="light" scaleTo={0.96}>
      <LinearGradient colors={[tint, '#FFFFFF']} start={{ x: 0, y: 0 }} end={{ x: 0.7, y: 1 }} style={styles.tile}>
        <View style={styles.tileTop}>
          {badge ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{badge}</Text>
            </View>
          ) : (
            <View />
          )}
          <Image source={icon} style={styles.tileArt} resizeMode="contain" />
        </View>
        <View style={{ flex: 1 }} />
        <Text style={styles.tileTitle} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.tileDesc} numberOfLines={3}>
          {desc}
        </Text>
        {progress !== undefined ? (
          <View style={styles.tileTrack}>
            <View style={[styles.tileFill, { width: `${Math.max(4, progress)}%` }]} />
          </View>
        ) : null}
      </LinearGradient>
    </BouncyPressable>
  );
}

/** Full-width card: 3D icon on the left, title and description in the middle, chevron on the right. */
function FeatureWide({ title, desc, icon, tint, onPress }: FeatureProps) {
  return (
    <BouncyPressable onPress={onPress} style={[styles.wideWrap, shadow.card]} hapticType="light" scaleTo={0.97}>
      <LinearGradient colors={[tint, '#FFFFFF']} start={{ x: 0, y: 0 }} end={{ x: 0.8, y: 1 }} style={styles.wide}>
        <Image source={icon} style={styles.wideArt} resizeMode="contain" />
        <View style={{ flex: 1 }}>
          <Text style={styles.wideTitle}>{title}</Text>
          <Text style={styles.wideDesc} numberOfLines={2}>
            {desc}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
      </LinearGradient>
    </BouncyPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: 130,
    gap: 12,
  },
  topHeader: {
    paddingTop: 2,
    paddingBottom: 2,
  },
  topHeaderTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 28,
    lineHeight: 34,
    color: colors.textHeading,
  },
  topHeaderSub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 1,
  },

  heatCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    gap: 10,
  },
  heatTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 15,
    color: colors.textHeading,
  },

  sectionHead: {
    marginTop: 10,
    marginBottom: -2,
  },
  sectionTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 20,
    color: colors.textHeading,
  },
  sectionCaption: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12.5,
    color: colors.textMuted,
    marginTop: 1,
  },

  /* Half-width tiles */
  tileRow: {
    flexDirection: 'row',
    gap: 12,
  },
  tileWrap: {
    flex: 1,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
  },
  tile: {
    minHeight: 186,
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EEF2FF',
  },
  tileTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  tileArt: {
    width: 84,
    height: 84,
    marginRight: -6,
    marginTop: -6,
  },
  badge: {
    minWidth: 26,
    height: 26,
    borderRadius: 13,
    paddingHorizontal: 8,
    backgroundColor: '#F43F5E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontFamily: fonts.headingBold,
    fontSize: 12,
    color: '#FFFFFF',
  },
  tileTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 16,
    lineHeight: 20,
    color: colors.textHeading,
  },
  tileDesc: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    lineHeight: 17,
    color: colors.textMuted,
    marginTop: 3,
  },
  tileTrack: {
    height: 7,
    borderRadius: 4,
    backgroundColor: '#FDE68A',
    overflow: 'hidden',
    marginTop: 10,
  },
  tileFill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: '#F59E0B',
  },

  /* Wide cards */
  wideWrap: {
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
  },
  wide: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderRadius: 24,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#EEF2FF',
  },
  wideArt: {
    width: 64,
    height: 64,
  },
  wideTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 16,
    color: colors.textHeading,
  },
  wideDesc: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12.5,
    lineHeight: 17,
    color: colors.textMuted,
    marginTop: 2,
  },

  /* VIP Spekvia Pro banner */
  vipWrap: {
    borderRadius: 24,
    marginTop: 4,
  },
  vipBanner: {
    borderRadius: 24,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.14)',
  },
  vipGlow: {
    position: 'absolute',
    right: -40,
    top: -50,
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: 'rgba(251, 191, 36, 0.14)',
  },
  vipPassImage: {
    width: 60,
    height: 60,
    marginRight: 12,
  },
  vipContent: {
    flex: 1,
    paddingRight: 8,
  },
  vipBadge: {
    fontFamily: fonts.headingBold,
    fontSize: 10,
    letterSpacing: 0.8,
    color: '#FBBF24',
    marginBottom: 3,
  },
  vipTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 16,
    color: '#FFFFFF',
  },
  vipDesc: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    lineHeight: 17,
    color: '#A5B4FC',
    marginTop: 2,
  },
});

