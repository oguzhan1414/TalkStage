import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQuery } from '@tanstack/react-query';
import { Image, StyleSheet, Text, View } from 'react-native';

import { avatarImages, stateImages } from '../assets/images';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';
import type { RootStackParamList } from '../navigation/types';
import { colors, fonts, radii, spacing } from '../theme/tokens';
import type { ProfileOut } from '../types/api';
import { BouncyPressable } from './BouncyPressable';
import { t } from '../i18n';

const AVATAR_MAP: Record<string, ReturnType<typeof require>> = {
  dev: avatarImages.maleDev,
  lead: avatarImages.femaleLead,
  traveler: avatarImages.travelerExplorer,
  designer: avatarImages.femaleDesigner,
  engineer: avatarImages.maleEngineer,
  entrepreneur: avatarImages.femaleEntrepreneur,
  student: avatarImages.studentYouth,
  corporate: avatarImages.proDeveloper,
  tech: avatarImages.maleDev,
  adult_hobby: avatarImages.matureSenior,
  service: avatarImages.femaleEntrepreneur,
};

function getTimeGreeting(): string {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return t("GÜNAYDIN");
  if (hour >= 12 && hour < 17) return t("TÜNAYDIN");
  if (hour >= 17 && hour < 22) return t("İYİ AKŞAMLAR");
  return t("İYİ GECELER");
}

/**
 * Shared top identity bar — avatar/greeting/streak/XP — reused at the top of
 * every main tab (Home, Scenarios, Vocab, Profile/"Özellikler") so the user's
 * identity and quick stats stay visible everywhere, not just Home. Tapping
 * the avatar opens `AccountSettingsScreen` (the actual account/settings
 * screen) — this bar itself carries no settings UI, just identity + a way in.
 * Self-contained: fetches `['me']` itself (same query key every screen
 * already uses, so React Query just shares the cache — no extra network
 * traffic from adding this in four places) and resolves its own navigation
 * object (rather than taking one as a prop) — each host screen's nav prop is
 * a different `CompositeNavigationProp` (tab + stack) that TypeScript can't
 * structurally unify into one reusable prop type across all of them.
 */
export function AppHeader() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { session } = useAuth();
  const { data: profile } = useQuery({
    queryKey: ['me'],
    queryFn: () => api.get<ProfileOut>('/me'),
  });

  const displayName =
    profile?.display_name ??
    (session?.user.user_metadata?.full_name as string | undefined)?.split(' ')[0] ??
    session?.user.email?.split('@')[0] ??
    t("Konuşmacı");

  const userAvatar =
    (profile?.avatar_id && AVATAR_MAP[profile.avatar_id]) ||
    (profile?.persona_id && AVATAR_MAP[profile.persona_id]) ||
    avatarImages.studentYouth;

  const currentLevel = profile?.cefr_level ?? 'A1';
  const streak = profile?.streak_count ?? 1;

  return (
    <View style={styles.header}>
      <View style={styles.headerLeftCol}>
        <BouncyPressable
          onPress={() => navigation.navigate('AccountSettings')}
          style={styles.avatarWrapper}
          hitSlop={8}
          hapticType="light"
          scaleTo={0.93}
          accessibilityRole="button"
          accessibilityLabel={t("Profil ve ayarlar")}
        >
          <Image source={userAvatar} style={styles.avatarImage} resizeMode="cover" />
          <View style={styles.avatarLevelBadge}>
            <Text style={styles.avatarLevelText}>{currentLevel}</Text>
          </View>
        </BouncyPressable>

        <View style={styles.greetingContainer}>
          <Text style={styles.greetingSub}>{getTimeGreeting()}</Text>
          <Text style={styles.greetingName} numberOfLines={1}>
            {displayName}
          </Text>
        </View>
      </View>

      <View style={styles.headerStatsRow}>
        <View style={[styles.headerStatPill, styles.headerStreakPill]}>
          <Ionicons name="flame" size={13} color="#C2410C" />
          <Text style={styles.headerStreakText}>{streak}</Text>
        </View>

        <BouncyPressable
          onPress={() => navigation.navigate('Badges')}
          style={[styles.headerStatPill, styles.headerXpPill]}
          hitSlop={6}
          hapticType="light"
          scaleTo={0.93}
        >
          <Image source={stateImages.xpBolt} style={styles.headerXpBoltIcon} resizeMode="contain" />
          <Text style={styles.headerXpText}>{profile?.xp ?? 0}{" "}{t("XP")}</Text>
        </BouncyPressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
  },
  headerLeftCol: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  headerStatsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerStatPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: radii.pill,
    borderWidth: 1.5,
  },
  headerStreakPill: {
    backgroundColor: '#FFF7ED',
    borderColor: '#FED7AA',
    gap: 4,
  },
  headerStreakText: {
    fontFamily: fonts.mono,
    fontSize: 11,
    fontWeight: '700',
    color: '#C2410C',
  },
  headerXpPill: {
    backgroundColor: '#FFFBEB',
    borderColor: '#FDE68A',
    gap: 4,
  },
  headerXpBoltIcon: {
    width: 14,
    height: 14,
  },
  headerXpText: {
    fontFamily: fonts.mono,
    fontSize: 11,
    fontWeight: '700',
    color: '#B45309',
  },
  avatarWrapper: {
    width: 50,
    height: 50,
    position: 'relative',
    marginRight: 12,
  },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#4F46E5',
  },
  avatarLevelBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#4F46E5',
    paddingHorizontal: 5,
    paddingVertical: 1.5,
    borderRadius: radii.pill,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  avatarLevelText: {
    fontFamily: fonts.mono,
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  greetingContainer: {
    flex: 1,
  },
  greetingSub: {
    fontFamily: fonts.headingBold,
    fontSize: 10.5,
    color: colors.textMuted,
    letterSpacing: 0.8,
  },
  greetingName: {
    fontFamily: fonts.headingBold,
    fontSize: 18,
    color: colors.textHeading,
    marginTop: 1,
  },
});
