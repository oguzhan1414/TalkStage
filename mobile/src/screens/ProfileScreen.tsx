import { Ionicons } from '@expo/vector-icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import {
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';

import {
  avatarImages,
  cefrLevelImages,
  stateImages,
} from '../assets/images';
import { Button } from '../components/Button';
import { BADGES } from '../constants/badges';
import { useAuth } from '../context/AuthContext';
import { useDailyReminder } from '../hooks/useDailyReminder';
import { useEarnedBadges } from '../hooks/useEarnedBadges';
import { api } from '../lib/api';
import { isProUser } from '../lib/revenuecat';
import type { MainTabScreenProps } from '../navigation/types';
import { colors, fonts, radii, shadow, spacing } from '../theme/tokens';
import type { ProfileOut, ProfileUpdate, ProgressOut, SessionOut } from '../types/api';

/** Preview shows the first 4 of the canonical 10-badge list; "Tümünü Gör" opens the full grid. */
const PROFILE_BADGE_PREVIEW = BADGES.slice(0, 4);

const AVATAR_LIST = [
  { id: 'dev', name: 'Yazılımcı', source: avatarImages.maleDev },
  { id: 'lead', name: 'Tech Lead', source: avatarImages.femaleLead },
  { id: 'traveler', name: 'Gezgin', source: avatarImages.maleTraveler },
  { id: 'designer', name: 'Tasarımcı', source: avatarImages.femaleDesigner },
  { id: 'engineer', name: 'Mühendis', source: avatarImages.maleEngineer },
  { id: 'entrepreneur', name: 'Girişimci', source: avatarImages.femaleEntrepreneur },
];

function toDateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function ProfileScreen({ navigation }: MainTabScreenProps<'Profile'>) {
  const { session, signOut } = useAuth();
  const queryClient = useQueryClient();

  const { data: profile } = useQuery({
    queryKey: ['me'],
    queryFn: () => api.get<ProfileOut>('/me'),
  });
  const { data: progress } = useQuery({
    queryKey: ['progress'],
    queryFn: () => api.get<ProgressOut[]>('/progress'),
  });
  const { data: allSessions } = useQuery({
    queryKey: ['sessions', 'all'],
    queryFn: () => api.get<SessionOut[]>('/sessions?limit=500'),
  });
  const { data: isPro } = useQuery({
    queryKey: ['isProUser'],
    queryFn: isProUser,
    staleTime: 60_000,
  });
  const { earnedBadgeIds } = useEarnedBadges();

  const [guideModalVisible, setGuideModalVisible] = useState(false);

  const avatarMutation = useMutation({
    mutationFn: (avatarId: string) =>
      api.patch<ProfileOut>('/me', { avatar_id: avatarId } satisfies ProfileUpdate),
    onSuccess: (updated) => queryClient.setQueryData(['me'], updated),
  });
  const selectedAvatarId = profile?.avatar_id ?? AVATAR_LIST[0].id;
  const selectedAvatarIdx = Math.max(
    0,
    AVATAR_LIST.findIndex((a) => a.id === selectedAvatarId)
  );

  const displayName =
    profile?.display_name ??
    (session?.user.user_metadata?.full_name as string | undefined)?.split(' ')[0] ??
    session?.user.email?.split('@')[0] ??
    'Konuşmacı';

  const {
    enabled: remindersEnabled,
    toggle: toggleReminders,
    unavailable: remindersUnavailable,
  } = useDailyReminder(displayName);

  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 6);
  const weekAgoKey = toDateKey(weekAgo);
  const weekRows = (progress ?? []).filter((p) => p.practice_date >= weekAgoKey);
  const weeklyMinutes = weekRows.reduce((sum, p) => sum + p.minutes_practiced, 0);
  const weeklyScenarios = weekRows.reduce((sum, p) => sum + p.scenarios_completed, 0);

  const weeklyFluencyScores = (allSessions ?? [])
    .filter((s) => s.started_at.slice(0, 10) >= weekAgoKey)
    .map((s) => s.fluency_score)
    .filter((f): f is number => f != null);
  const weeklyAvgFluency = weeklyFluencyScores.length
    ? Math.round(weeklyFluencyScores.reduce((a, b) => a + b, 0) / weeklyFluencyScores.length)
    : null;

  const currentLevel = profile?.cefr_level ?? 'A1';
  const levelShield =
    cefrLevelImages[currentLevel as keyof typeof cefrLevelImages] ?? cefrLevelImages.A1;

  const userXp = profile?.xp ?? 0;
  const userGems = Math.max(50, Math.floor(userXp / 3) + (profile?.streak_count ?? 1) * 15);
  const userStreak = profile?.streak_count ?? 1;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. PROFILE HEADER WITH 3D AVATAR & STATS */}
        <View style={[styles.profileHeaderCard, shadow.card]}>
          <View style={styles.avatarLargeWrapper}>
            <Image
              source={AVATAR_LIST[selectedAvatarIdx].source}
              style={styles.avatarLargeImage}
              resizeMode="cover"
            />
            {isPro ? (
              <View style={styles.onlineBadge}>
                <Text style={styles.onlineBadgeText}>PRO</Text>
              </View>
            ) : null}
          </View>

          <Text style={styles.displayName}>{displayName}</Text>
          <Text style={styles.emailText}>{session?.user.email}</Text>

          {/* CEFR Level 3D Shield Badge */}
          <View style={styles.levelCard}>
            <Image source={levelShield} style={styles.levelShield} resizeMode="contain" />
            <View>
              <Text style={styles.levelLabel}>MEVCUT SEVİYE</Text>
              <Text style={styles.levelName}>{currentLevel} Temel Pratik</Text>
            </View>
          </View>

          {/* 3D Core Economy Stats Row (XP, Elmas, Seri) */}
          <View style={styles.economyStatsRow}>
            {/* XP Card */}
            <Pressable
              style={styles.economyStatBox}
              onPress={() => setGuideModalVisible(true)}
            >
              <Image
                source={stateImages.xpBolt}
                style={styles.economyStatIcon}
                resizeMode="contain"
              />
              <Text style={styles.economyStatNumber}>{userXp}</Text>
              <Text style={styles.economyStatLabel}>⚡ Toplam XP</Text>
            </Pressable>

            {/* Elmas Card */}
            <Pressable
              style={styles.economyStatBox}
              onPress={() => setGuideModalVisible(true)}
            >
              <Image
                source={stateImages.gemDiamond}
                style={styles.economyStatIcon}
                resizeMode="contain"
              />
              <Text style={[styles.economyStatNumber, { color: '#0284C7' }]}>
                {userGems}
              </Text>
              <Text style={styles.economyStatLabel}>💎 Elmas</Text>
            </Pressable>

            {/* Streak Card */}
            <Pressable
              style={styles.economyStatBox}
              onPress={() => setGuideModalVisible(true)}
            >
              <Text style={styles.economyStatFlame}>🔥</Text>
              <Text style={[styles.economyStatNumber, { color: '#EA580C' }]}>
                {userStreak} Gün
              </Text>
              <Text style={styles.economyStatLabel}>Seri</Text>
            </Pressable>
          </View>
        </View>

        {/* 2. 💡 XP & ELMAS REHBERİ (BENTO PROMO CARD) */}
        <Pressable
          onPress={() => setGuideModalVisible(true)}
          style={[styles.guideBentoCard, shadow.card]}
        >
          <View style={styles.guideBentoLeft}>
            <View style={styles.guideBadge}>
              <Text style={styles.guideBadgeText}>💡 ÖDÜL & EKONOMİ REHBERİ</Text>
            </View>
            <Text style={styles.guideBentoTitle}>XP ve Elmas Ne İşe Yarar?</Text>
            <Text style={styles.guideBentoDesc}>
              Kazanma yolları, seviye atlama ve Elmas harcama alanlarını öğren.
            </Text>
          </View>
          <View style={styles.guideBentoIcons}>
            <Image
              source={stateImages.gemDiamond}
              style={styles.guideFloatGem}
              resizeMode="contain"
            />
            <Image
              source={stateImages.xpBolt}
              style={styles.guideFloatXp}
              resizeMode="contain"
            />
          </View>
        </Pressable>

        {/* 3. 3D AVATAR SELECTION GALLERY */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3D Persona Avatarını Seç</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.avatarScroll}
          >
            {AVATAR_LIST.map((av, idx) => (
              <Pressable
                key={av.id}
                onPress={() => avatarMutation.mutate(av.id)}
                style={[
                  styles.avatarOption,
                  selectedAvatarIdx === idx && styles.avatarOptionSelected,
                ]}
              >
                <Image source={av.source} style={styles.avatarThumb} resizeMode="cover" />
                <Text
                  style={[
                    styles.avatarName,
                    selectedAvatarIdx === idx && styles.avatarNameSelected,
                  ]}
                >
                  {av.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* 4. VIP STAGE PASS BANNER */}
        <Pressable
          onPress={() => navigation.navigate('Paywall')}
          style={[styles.vipBanner, shadow.card]}
        >
          <Image
            source={stateImages.vipPass}
            style={styles.vipPassImage}
            resizeMode="contain"
          />
          <View style={styles.vipContent}>
            <Text style={styles.vipBadge}>STAGE PASS VIP</Text>
            <Text style={styles.vipTitle}>Sınırsız Sahneye Çık</Text>
            <Text style={styles.vipDesc}>Günlük limitleri kaldır, tüm mülakatları aç.</Text>
          </View>
          <Text style={styles.vipArrow}>&rarr;</Text>
        </Pressable>

        {/* 5. GAMIFICATION BADGES SHOWCASE (3D Rozetler) */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Kazanılan 3D Rozetler</Text>
            <Pressable onPress={() => navigation.navigate('Badges')}>
              <Text style={styles.seeAllText}>Tümünü Gör &rarr;</Text>
            </Pressable>
          </View>

          <View style={styles.badgesGrid}>
            {PROFILE_BADGE_PREVIEW.map((b) => {
              const unlocked = earnedBadgeIds.has(b.id);
              return (
                <View key={b.id} style={[styles.badgeCard, !unlocked && styles.badgeCardLocked]}>
                  <Image source={b.image} style={styles.badgeImage} resizeMode="contain" />
                  <Text style={styles.badgeTitle} numberOfLines={1}>
                    {b.title}
                  </Text>
                  <Text style={styles.badgeStatus}>{unlocked ? '✓ Açıldı' : '🔒 Kilitli'}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* 6. WEEKLY STATS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Haftalık İlerleme</Text>
          <View style={styles.statsRow}>
            <View style={[styles.statBox, shadow.card]}>
              <Text style={styles.statBigNumber}>{weeklyMinutes}</Text>
              <Text style={styles.statBoxLabel}>Dakika Pratik</Text>
            </View>
            <View style={[styles.statBox, shadow.card]}>
              <Text style={styles.statBigNumber}>{weeklyScenarios}</Text>
              <Text style={styles.statBoxLabel}>Tamamlanan Sahne</Text>
            </View>
            <View style={[styles.statBox, shadow.card]}>
              <Text style={styles.statBigNumber}>
                {weeklyAvgFluency !== null ? `%${weeklyAvgFluency}` : '—'}
              </Text>
              <Text style={styles.statBoxLabel}>Ortalama Akıcılık</Text>
            </View>
          </View>
        </View>

        {/* 7. SETTINGS & LOGOUT */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ayarlar</Text>

          <View style={[styles.settingsCard, shadow.card]}>
            <View style={styles.settingRow}>
              <Ionicons name="notifications-outline" size={20} color={colors.brand} />
              <View style={styles.settingTextCol}>
                <Text style={styles.settingLabel}>Günlük Hatırlatıcı</Text>
                <Text style={styles.settingDesc}>Sabah kahvesinde 5 dk bildirim gönder</Text>
              </View>
              <Switch
                value={remindersEnabled}
                onValueChange={toggleReminders}
                disabled={remindersUnavailable}
                trackColor={{ false: '#CBD5E1', true: colors.brand }}
              />
            </View>

            <View style={styles.settingDivider} />

            <Pressable
              onPress={() => navigation.navigate('Calendar')}
              style={styles.settingRow}
            >
              <Ionicons name="calendar-outline" size={20} color={colors.brand} />
              <View style={styles.settingTextCol}>
                <Text style={styles.settingLabel}>Çalışma Takvimi</Text>
                <Text style={styles.settingDesc}>Geçmiş seansları ve skorları incele</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </Pressable>
          </View>

          <Button
            label="Çıkış Yap"
            variant="ghost"
            onPress={() => signOut()}
            style={styles.logoutButton}
          />
        </View>
      </ScrollView>

      {/* ======================================================== */}
      {/* 📖 MODAL: TALKSTAGE XP & ELMAS REHBERİ                    */}
      {/* ======================================================== */}
      <Modal
        visible={guideModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setGuideModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.guideModalCard}>
            {/* Modal Header */}
            <View style={styles.guideModalHeader}>
              <View>
                <Text style={styles.guideModalTitle}>TalkStage Ödül Sistemi 💎⚡</Text>
                <Text style={styles.guideModalSub}>XP, Elmas ve Seri mekaniklerinin rehberi</Text>
              </View>
              <Pressable
                onPress={() => setGuideModalVisible(false)}
                hitSlop={12}
                style={styles.closeGuideBtn}
              >
                <Ionicons name="close" size={22} color={colors.textMuted} />
              </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.guideScroll}>
              {/* 1. SECTION: XP (DENEYİM) */}
              <View style={styles.guideBlock}>
                <View style={styles.guideBlockHeader}>
                  <Image source={stateImages.xpBolt} style={styles.guideBlockIcon} resizeMode="contain" />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.guideBlockTitle}>⚡ XP (Deneyim Puanı) Nedir?</Text>
                    <Text style={styles.guideBlockTag}>Kalıcı Seviye & Lig İlerlemesi</Text>
                  </View>
                </View>
                <Text style={styles.guideBlockBody}>
                  XP, TalkStage'e verdiğin emeğin ve İngilizce seviyenin kalıcı kanıtıdır. Asla silinmez veya harcanamaz.
                </Text>
                <View style={styles.guideBulletBox}>
                  <Text style={styles.guideBullet}>• <Text style={{ fontWeight: 'bold' }}>Nasıl Kazanılır?</Text> Canlı AI konuşmaları (+50 XP), hikaye okumaları (+30 XP) ve kelime tekrarlarından (+5 XP).</Text>
                  <Text style={styles.guideBullet}>• <Text style={{ fontWeight: 'bold' }}>Ne İşe Yarar?</Text> A1'den C2'ye seviye atlamanı sağlar ve haftalık Liderlik Liglerinde zirveye taşır.</Text>
                </View>
              </View>

              {/* 2. SECTION: ELMAS (GEMS) */}
              <View style={styles.guideBlock}>
                <View style={styles.guideBlockHeader}>
                  <Image source={stateImages.gemDiamond} style={styles.guideBlockIcon} resizeMode="contain" />
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.guideBlockTitle, { color: '#0284C7' }]}>💎 Elmas (Gems) Nedir?</Text>
                    <Text style={styles.guideBlockTag}>Harcanabilir Ödül Para Birimi</Text>
                  </View>
                </View>
                <Text style={styles.guideBlockBody}>
                  Elmas, özel görevleri tamamladığında ve serilerini koruduğunda kazandığın değerli uygulama içi para birimidir.
                </Text>
                <View style={styles.guideBulletBox}>
                  <Text style={styles.guideBullet}>• <Text style={{ fontWeight: 'bold' }}>🛡️ Seri Kalkanı:</Text> Giremediğin gün serinin (Streak) bozulmasını engeller.</Text>
                  <Text style={styles.guideBullet}>• <Text style={{ fontWeight: 'bold' }}>🎭 VIP Özel Mülakatlar:</Text> İleri düzey mülakat ve iş senaryolarının kilitlerini açar.</Text>
                  <Text style={styles.guideBullet}>• <Text style={{ fontWeight: 'bold' }}>🎙️ Ekstra AI Süresi:</Text> Günlük sınır dolduğunda seansı uzatmanı sağlar.</Text>
                  <Text style={styles.guideBullet}>• <Text style={{ fontWeight: 'bold' }}>📊 Yankı Derin Raporu:</Text> Detaylı fonetik telaffuz analizini açar.</Text>
                </View>
              </View>

              {/* 3. SECTION: GÜNLÜK SERİ (STREAK) */}
              <View style={styles.guideBlock}>
                <View style={styles.guideBlockHeader}>
                  <Text style={{ fontSize: 26, marginRight: 10 }}>🔥</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.guideBlockTitle, { color: '#EA580C' }]}>🔥 Günlük Seri (Streak)</Text>
                    <Text style={styles.guideBlockTag}>Kesintisiz Alışkanlık Zinciri</Text>
                  </View>
                </View>
                <Text style={styles.guideBlockBody}>
                  Her gün en az 1 seans yaparak oluşturduğun kesintisiz pratik zinciridir. 7, 14 ve 30 günlük serilere ulaştığında dev Elmas sandıkları kazanırsın!
                </Text>
              </View>

              {/* Close CTA */}
              <Button
                label="Anladım, Harika! 🚀"
                onPress={() => setGuideModalVisible(false)}
                style={{ marginTop: spacing.md }}
              />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: 120,
  },

  /* 1. Header */
  profileHeaderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.lg,
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.8)',
  },
  avatarLargeWrapper: {
    position: 'relative',
    marginBottom: spacing.sm,
  },
  avatarLargeImage: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 3,
    borderColor: colors.brand,
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.brand,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radii.pill,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  onlineBadgeText: {
    fontFamily: fonts.mono,
    fontSize: 9,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  displayName: {
    fontFamily: fonts.headingBold,
    fontSize: 20,
    color: colors.textHeading,
  },
  emailText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
    marginBottom: spacing.sm,
  },
  levelCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: radii.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.8)',
    marginBottom: spacing.sm,
  },
  levelShield: {
    width: 36,
    height: 36,
  },
  levelLabel: {
    fontFamily: fonts.mono,
    fontSize: 9,
    fontWeight: 'bold',
    color: colors.brand,
    letterSpacing: 0.5,
  },
  levelName: {
    fontFamily: fonts.headingBold,
    fontSize: 13,
    color: colors.textHeading,
  },

  /* 3D Economy Stats Row */
  economyStatsRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 8,
    marginTop: 6,
  },
  economyStatBox: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: radii.md,
    paddingVertical: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.8)',
  },
  economyStatIcon: {
    width: 26,
    height: 26,
    marginBottom: 2,
  },
  economyStatFlame: {
    fontSize: 20,
    marginBottom: 2,
  },
  economyStatNumber: {
    fontFamily: fonts.headingBold,
    fontSize: 15,
    color: colors.brand,
  },
  economyStatLabel: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10,
    color: colors.textMuted,
    marginTop: 1,
  },

  /* 2. Guide Bento Promo Card */
  guideBentoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.lg,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.8)',
  },
  guideBentoLeft: {
    flex: 1,
    paddingRight: 10,
  },
  guideBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(79, 70, 229, 0.08)',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: radii.pill,
    marginBottom: 4,
  },
  guideBadgeText: {
    fontFamily: fonts.mono,
    fontSize: 9,
    fontWeight: 'bold',
    color: colors.brand,
  },
  guideBentoTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 14,
    color: colors.textHeading,
  },
  guideBentoDesc: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
    lineHeight: 15,
  },
  guideBentoIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: -12,
  },
  guideFloatGem: {
    width: 44,
    height: 44,
    transform: [{ rotate: '-10deg' }],
  },
  guideFloatXp: {
    width: 44,
    height: 44,
    transform: [{ rotate: '10deg' }],
  },

  /* Sections */
  section: {
    marginBottom: spacing.md,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 16,
    color: colors.textHeading,
    marginBottom: spacing.xs,
  },
  seeAllText: {
    fontFamily: fonts.headingBold,
    fontSize: 12,
    color: colors.brand,
  },

  /* Avatars */
  avatarScroll: {
    gap: spacing.sm,
    paddingVertical: spacing.xs,
  },
  avatarOption: {
    alignItems: 'center',
    padding: 6,
    borderRadius: radii.lg,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  avatarOptionSelected: {
    borderColor: colors.brand,
    backgroundColor: 'rgba(79, 70, 229, 0.06)',
  },
  avatarThumb: {
    width: 54,
    height: 54,
    borderRadius: 27,
    marginBottom: 4,
  },
  avatarName: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
  },
  avatarNameSelected: {
    fontFamily: fonts.headingBold,
    color: colors.brand,
  },

  /* VIP Banner */
  vipBanner: {
    backgroundColor: '#0F172A',
    borderRadius: radii.lg,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  vipPassImage: {
    width: 44,
    height: 44,
    marginRight: spacing.sm,
  },
  vipContent: {
    flex: 1,
  },
  vipBadge: {
    fontFamily: fonts.mono,
    fontSize: 9,
    fontWeight: 'bold',
    color: '#F59E0B',
    letterSpacing: 0.5,
  },
  vipTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 15,
    color: '#FFFFFF',
  },
  vipDesc: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: '#94A3B8',
  },
  vipArrow: {
    fontSize: 18,
    color: '#FFFFFF',
    marginLeft: 6,
  },

  /* Badges */
  badgesGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  badgeCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: radii.md,
    padding: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.8)',
  },
  badgeCardLocked: {
    opacity: 0.45,
  },
  badgeImage: {
    width: 38,
    height: 38,
    marginBottom: 4,
  },
  badgeTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 10,
    color: colors.textHeading,
    textAlign: 'center',
  },
  badgeStatus: {
    fontFamily: fonts.bodyRegular,
    fontSize: 9,
    color: colors.textMuted,
    marginTop: 2,
  },

  /* Weekly Stats */
  statsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: radii.md,
    padding: spacing.sm,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.8)',
  },
  statBigNumber: {
    fontFamily: fonts.headingBold,
    fontSize: 18,
    color: colors.brand,
  },
  statBoxLabel: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10,
    color: colors.textMuted,
    marginTop: 2,
    textAlign: 'center',
  },

  /* Settings */
  settingsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.lg,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.8)',
    marginBottom: spacing.md,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  settingTextCol: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  settingLabel: {
    fontFamily: fonts.headingBold,
    fontSize: 13,
    color: colors.textHeading,
  },
  settingDesc: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
  },
  settingDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginHorizontal: 8,
  },
  logoutButton: {
    marginTop: spacing.xs,
  },

  /* Guide Modal */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'flex-end',
  },
  guideModalCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: radii.lg,
    borderTopRightRadius: radii.lg,
    padding: spacing.lg,
    maxHeight: '88%',
  },
  guideModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: spacing.sm,
  },
  guideModalTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 18,
    color: colors.textHeading,
  },
  guideModalSub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: colors.textMuted,
  },
  closeGuideBtn: {
    padding: 4,
  },
  guideScroll: {
    paddingBottom: spacing.xl,
  },
  guideBlock: {
    backgroundColor: '#F8FAFC',
    borderRadius: radii.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.9)',
  },
  guideBlockHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  guideBlockIcon: {
    width: 32,
    height: 32,
    marginRight: 10,
  },
  guideBlockTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 14,
    color: colors.brand,
  },
  guideBlockTag: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
  },
  guideBlockBody: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: colors.textBody,
    lineHeight: 17,
    marginBottom: 6,
  },
  guideBulletBox: {
    gap: 4,
    marginTop: 4,
  },
  guideBullet: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textBody,
    lineHeight: 16,
  },
});
