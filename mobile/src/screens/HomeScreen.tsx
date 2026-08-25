import { useQuery } from '@tanstack/react-query';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  avatarImages,
  cefrLevelImages,
  companionImage,
  homeImages,
  podcastHubIcon,
  scenarioCategoryImages,
} from '../assets/images';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';
import type { MainTabScreenProps } from '../navigation/types';
import { colors, fonts, radii, shadow, spacing } from '../theme/tokens';
import type { ProfileOut, ScenarioOut, VocabCardOut } from '../types/api';

const CEFR_LEVEL_META = [
  { level: 'A1', title: 'Başlangıç', icon: cefrLevelImages.A1 },
  { level: 'A2', title: 'Temel Pratik', icon: cefrLevelImages.A2 },
  { level: 'B1', title: 'İş & Standup', icon: cefrLevelImages.B1 },
  { level: 'B2', title: 'Akıcı Sohbet', icon: cefrLevelImages.B2 },
  { level: 'C1', title: 'Mülakat & Sunum', icon: cefrLevelImages.C1 },
  { level: 'C2', title: 'Usta Sahne', icon: cefrLevelImages.C2 },
];

/** Derives each level's completed/current/locked status from the user's real `cefr_level` (defaults to A1 if not yet assessed). */
function buildCefrSteps(currentLevel: string | null | undefined) {
  const currentIdx = Math.max(
    0,
    CEFR_LEVEL_META.findIndex((m) => m.level === currentLevel)
  );
  return CEFR_LEVEL_META.map((meta, idx) => ({
    ...meta,
    status: idx < currentIdx ? 'completed' : idx === currentIdx ? 'current' : 'locked',
  }));
}

export function HomeScreen({ navigation }: MainTabScreenProps<'Home'>) {
  const { session } = useAuth();

  const { data: profile } = useQuery({
    queryKey: ['me'],
    queryFn: () => api.get<ProfileOut>('/me'),
  });
  const { data: recommended } = useQuery({
    queryKey: ['scenarios', 'recommended'],
    queryFn: () => api.get<ScenarioOut>('/scenarios/recommended'),
  });
  const { data: allScenarios } = useQuery({
    queryKey: ['scenarios'],
    queryFn: () => api.get<ScenarioOut[]>('/scenarios'),
  });
  const { data: dueVocabCards } = useQuery({
    queryKey: ['vocab-cards'],
    queryFn: () => api.get<VocabCardOut[]>('/vocab-cards'),
  });

  const displayName =
    profile?.display_name ??
    (session?.user.user_metadata?.full_name as string | undefined)?.split(' ')[0] ??
    session?.user.email?.split('@')[0] ??
    'Konuşmacı';
  const streak = profile?.streak_count ?? 0;
  const xp = profile?.xp ?? 0;
  const cefrSteps = buildCefrSteps(profile?.cefr_level);
  const popularScenarios = (allScenarios ?? []).slice(0, 3);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. TOP GAMIFIED HEADER (Avatar, Greeting, Streak & XP) */}
        <View style={styles.header}>
          <Pressable
            onPress={() => navigation.navigate('Profile')}
            style={styles.avatarWrapper}
          >
            <Image
              source={avatarImages.maleDev}
              style={styles.avatarImage}
              resizeMode="cover"
            />
            <View style={styles.avatarOnlineDot} />
          </Pressable>

          <View style={styles.greetingContainer}>
            <Text style={styles.greetingSub}>GÜNAYDIN 👋</Text>
            <Text style={styles.greetingName} numberOfLines={1}>
              {displayName}
            </Text>
          </View>

          <View style={styles.statsPillRow}>
            {/* Streak Flame -> Study Path (daily climbing calendar) */}
            <Pressable onPress={() => navigation.navigate('StudyPath')} style={styles.statPill}>
              <Text style={styles.statEmoji}>🔥</Text>
              <Text style={styles.statNumber}>{streak}</Text>
            </Pressable>

            {/* XP Diamond */}
            <View style={styles.statPill}>
              <Text style={styles.statEmoji}>💎</Text>
              <Text style={styles.statNumber}>{xp}</Text>
            </View>
          </View>
        </View>

        {/* 2. YANKI 3D LIVING COMPANION SPOTLIGHT BANNER */}
        <View style={[styles.yankiBanner, shadow.card]}>
          <View style={styles.yankiGlowBackdrop} />

          <View style={styles.yankiContent}>
            {/* Mascot Status Badge */}
            <View style={styles.yankiBadge}>
              <View style={styles.pulseDot} />
              <Text style={styles.yankiBadgeText}>Yankı Canlı • &lt;1.2s Voice AI</Text>
            </View>

            {/* Speaking Dialogue */}
            <Text style={styles.yankiTitle}>
              &ldquo;Sabah kahveni aldıysan 5 dk Standup provası yapalım mı?&rdquo;
            </Text>
            <Text style={styles.yankiSub}>
              Takıldığın anda alttan Türkçe fısıldarım, donmadan akıcı konuşursun.
            </Text>

            {/* Action CTA Button */}
            <Pressable
              onPress={() =>
                recommended
                  ? navigation.navigate('LiveConversationRoom', {
                      scenarioId: recommended.id,
                      scenarioSlug: recommended.slug,
                      scenarioTitle: recommended.title,
                    })
                  : navigation.navigate('Scenarios')
              }
              style={styles.yankiButton}
            >
              <Text style={styles.yankiButtonIcon}>🎙️</Text>
              <Text style={styles.yankiButtonText}>Hemen Canlı Konuş</Text>
              <Text style={styles.yankiButtonArrow}>→</Text>
            </Pressable>
          </View>

          {/* 3D Floating Yankı Coffee Cup Character */}
          <View style={styles.yankiImageContainer}>
            <Image
              source={companionImage}
              style={styles.yankiImage}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* 3. STEP-BY-STEP LEVEL LEARNING PATH PREVIEW (A1 -> C2 Roadmap) */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <View>
              <Text style={styles.sectionSubTitle}>SEVİYE YOLCULUĞU</Text>
              <Text style={styles.sectionMainTitle}>A1 &rarr; C2 Adım Adım İlerle</Text>
            </View>
            <Pressable onPress={() => navigation.navigate('Scenarios')}>
              <Text style={styles.seeAllText}>Tüm Sahneler &rarr;</Text>
            </Pressable>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.levelsScroll}
          >
            {cefrSteps.map((step, idx) => {
              const isCurrent = step.status === 'current';
              const isCompleted = step.status === 'completed';

              return (
                <Pressable
                  key={step.level}
                  onPress={() => navigation.navigate('Scenarios')}
                  style={[
                    styles.levelCard,
                    isCurrent && styles.levelCardCurrent,
                    isCompleted && styles.levelCardCompleted,
                  ]}
                >
                  <View style={styles.levelBadgeRow}>
                    <Text
                      style={[
                        styles.levelCode,
                        isCurrent && styles.levelCodeCurrent,
                      ]}
                    >
                      {step.level}
                    </Text>
                    {isCompleted && <Text style={styles.checkIcon}>✓</Text>}
                    {isCurrent && <View style={styles.currentDot} />}
                  </View>

                  <Image
                    source={step.icon}
                    style={styles.levelShieldImage}
                    resizeMode="contain"
                  />

                  <Text
                    style={[
                      styles.levelTitle,
                      isCurrent && styles.levelTitleCurrent,
                    ]}
                    numberOfLines={1}
                  >
                    {step.title}
                  </Text>

                  <Text style={styles.levelStatusText}>
                    {isCompleted
                      ? 'Tamamlandı'
                      : isCurrent
                        ? 'Şu Anki Hedef'
                        : 'Kilitli'}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* 4. DAILY BENTO QUICK ACCESS CARDS (Vocab Chest & Smart Reading) */}
        <View style={styles.section}>
          <Text style={styles.sectionSubTitle}>GÜNLÜK HIZLI PRATİK</Text>
          <Text style={styles.sectionMainTitle}>Kelime ve Okuma Modülleri</Text>

          <View style={styles.bentoGrid}>
            {/* Vocab Deck Card */}
            <Pressable
              onPress={() => navigation.navigate('Vocab')}
              style={[styles.bentoCard, shadow.card]}
            >
              <Image
                source={homeImages.vocabDeck}
                style={styles.bentoCardImage}
                resizeMode="contain"
              />
              <Text style={styles.bentoCardTitle}>Kelime Sandığı</Text>
              <Text style={styles.bentoCardSub} numberOfLines={2}>
                {dueVocabCards?.length
                  ? `${dueVocabCards.length} kelime tekrar bekliyor`
                  : 'Bugün için kelime yok'}
              </Text>
              <View style={styles.bentoPill}>
                <Text style={styles.bentoPillText}>Aç &rarr;</Text>
              </View>
            </Pressable>

            {/* Smart Reading Card */}
            <Pressable
              onPress={() => navigation.navigate('ReadingList')}
              style={[styles.bentoCard, shadow.card]}
            >
              <Image
                source={homeImages.readingModule}
                style={styles.bentoCardImage}
                resizeMode="contain"
              />
              <Text style={styles.bentoCardTitle}>Smart Reading</Text>
              <Text style={styles.bentoCardSub} numberOfLines={2}>3 adımlı video & okuma</Text>
              <View style={styles.bentoPill}>
                <Text style={styles.bentoPillText}>Çalış &rarr;</Text>
              </View>
            </Pressable>

            {/* TalkStage Podcasts Card */}
            <Pressable
              onPress={() => navigation.navigate('PodcastList')}
              style={[styles.bentoCard, shadow.card, { borderColor: 'rgba(245, 158, 11, 0.35)' }]}
            >
              <Image
                source={podcastHubIcon}
                style={styles.bentoCardImage}
                resizeMode="cover"
              />
              <Text style={styles.bentoCardTitle}>Podcasts 🎧</Text>
              <Text style={styles.bentoCardSub} numberOfLines={2}>A1-B2 Doğal Diyaloglar</Text>
              <View style={[styles.bentoPill, { backgroundColor: '#FEF3C7' }]}>
                <Text style={[styles.bentoPillText, { color: '#B45309' }]}>Dinle &rarr;</Text>
              </View>
            </Pressable>

            {/* Text Chat Card */}
            <Pressable
              onPress={() => navigation.navigate('TextChat')}
              style={[styles.bentoCard, shadow.card]}
            >
              <Image source={companionImage} style={styles.bentoCardImage} resizeMode="contain" />
              <Text style={styles.bentoCardTitle}>Günlük Sohbet</Text>
              <Text style={styles.bentoCardSub} numberOfLines={2}>Yazarak pratik yap ✍️</Text>
              <View style={styles.bentoPill}>
                <Text style={styles.bentoPillText}>Yaz &rarr;</Text>
              </View>
            </Pressable>
          </View>
        </View>

        {/* 5. POPULAR SCENARIOS 3D CAROUSEL */}
        <View style={[styles.section, styles.lastSection]}>
          <View style={styles.sectionHeaderRow}>
            <View>
              <Text style={styles.sectionSubTitle}>POPÜLER SAHNELER</Text>
              <Text style={styles.sectionMainTitle}>Gerçek Hayat Simülasyonları</Text>
            </View>
            <Pressable onPress={() => navigation.navigate('Scenarios')}>
              <Text style={styles.seeAllText}>Keşfet &rarr;</Text>
            </Pressable>
          </View>

          {popularScenarios.length === 0 ? (
            <Text style={styles.emptyScenariosText}>
              Henüz sahne eklenmedi, çok yakında burada olacak.
            </Text>
          ) : (
            <View style={styles.scenarioList}>
              {popularScenarios.map((sc) => (
                <Pressable
                  key={sc.id}
                  onPress={() =>
                    navigation.navigate('LiveConversationRoom', {
                      scenarioId: sc.id,
                      scenarioSlug: sc.slug,
                      scenarioTitle: sc.title,
                    })
                  }
                  style={[styles.scenarioCardItem, shadow.card]}
                >
                  <Image
                    source={scenarioCategoryImages[sc.category]}
                    style={styles.scenarioCardItemImage}
                    resizeMode="cover"
                  />
                  <View style={styles.scenarioCardItemContent}>
                    <View style={styles.scenarioMetaRow}>
                      <Text style={styles.scenarioMetaBadge}>{sc.cefr_level ?? 'A2'} Seviye</Text>
                      <Text style={styles.scenarioMetaTime}>⏱️ {sc.estimated_minutes} Dk</Text>
                    </View>
                    <Text style={styles.scenarioCardItemTitle} numberOfLines={1}>
                      {sc.title}
                    </Text>
                  </View>
                  <View style={styles.scenarioCardItemArrow}>
                    <Text style={styles.arrowText}>🎙️</Text>
                  </View>
                </Pressable>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
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
    paddingBottom: 110, // Space for floating bottom bar
  },

  /* 1. Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  avatarWrapper: {
    position: 'relative',
    marginRight: 12,
  },
  avatarImage: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  avatarOnlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 13,
    height: 13,
    borderRadius: 6.5,
    backgroundColor: colors.success,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  greetingContainer: {
    flex: 1,
  },
  greetingSub: {
    fontFamily: fonts.headingBold,
    fontSize: 10,
    color: colors.textMuted,
    letterSpacing: 0.8,
  },
  greetingName: {
    fontFamily: fonts.headingBold,
    fontSize: 18,
    color: colors.textHeading,
  },
  statsPillRow: {
    flexDirection: 'row',
    gap: 6,
  },
  statPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.8)',
  },
  statEmoji: {
    fontSize: 13,
    marginRight: 4,
  },
  statNumber: {
    fontFamily: fonts.headingBold,
    fontSize: 12,
    color: colors.textHeading,
  },

  /* 2. Yankı Spotlight Banner */
  yankiBanner: {
    position: 'relative',
    backgroundColor: '#FFFFFF',
    borderRadius: radii.lg,
    padding: spacing.md,
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.9)',
    marginBottom: spacing.lg,
  },
  yankiGlowBackdrop: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(79, 70, 229, 0.1)',
  },
  yankiContent: {
    flex: 1,
    paddingRight: 8,
    justifyContent: 'center',
  },
  yankiBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(79, 70, 229, 0.08)',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.pill,
    marginBottom: 6,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.success,
    marginRight: 6,
  },
  yankiBadgeText: {
    fontFamily: fonts.mono,
    fontSize: 10,
    color: colors.brand,
    fontWeight: 'bold',
  },
  yankiTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 14,
    color: colors.textHeading,
    lineHeight: 19,
    marginBottom: 4,
  },
  yankiSub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textBody,
    lineHeight: 15,
    marginBottom: 10,
  },
  yankiButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.brand,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: radii.pill,
    gap: 4,
  },
  yankiButtonIcon: {
    fontSize: 12,
  },
  yankiButtonText: {
    fontFamily: fonts.headingBold,
    fontSize: 12,
    color: '#FFFFFF',
  },
  yankiButtonArrow: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  yankiImageContainer: {
    width: 105,
    alignItems: 'center',
    justifyContent: 'center',
  },
  yankiImage: {
    width: 115,
    height: 115,
  },

  /* 3. Section Common */
  section: {
    marginBottom: spacing.lg,
  },
  lastSection: {
    marginBottom: spacing.sm,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  sectionSubTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 10,
    color: colors.brand,
    letterSpacing: 0.8,
  },
  sectionMainTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 16,
    color: colors.textHeading,
    marginTop: 1,
  },
  seeAllText: {
    fontFamily: fonts.headingBold,
    fontSize: 12,
    color: colors.brand,
  },

  /* Levels Scroll */
  levelsScroll: {
    paddingVertical: 4,
    gap: 10,
  },
  levelCard: {
    width: 110,
    backgroundColor: '#FFFFFF',
    borderRadius: radii.md,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.8)',
  },
  levelCardCurrent: {
    borderColor: colors.brand,
    borderWidth: 2,
    backgroundColor: '#FFFFFF',
  },
  levelCardCompleted: {
    backgroundColor: 'rgba(16, 185, 129, 0.04)',
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  levelBadgeRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  levelCode: {
    fontFamily: fonts.headingBold,
    fontSize: 12,
    color: colors.textMuted,
  },
  levelCodeCurrent: {
    color: colors.brand,
  },
  checkIcon: {
    fontSize: 11,
    color: colors.success,
    fontWeight: 'bold',
  },
  currentDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.brand,
  },
  levelShieldImage: {
    width: 52,
    height: 52,
    marginVertical: 4,
  },
  levelTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 11,
    color: colors.textHeading,
    textAlign: 'center',
    marginTop: 2,
  },
  levelTitleCurrent: {
    color: colors.brand,
  },
  levelStatusText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 9,
    color: colors.textMuted,
    marginTop: 2,
  },

  /* 4. Bento Grid */
  bentoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 10,
    marginTop: spacing.sm,
  },
  bentoCard: {
    width: '48.5%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.85)',
  },
  bentoCardImage: {
    width: 48,
    height: 48,
    borderRadius: 12,
    marginBottom: 6,
  },
  bentoCardTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 13,
    color: colors.textHeading,
    textAlign: 'center',
  },
  bentoCardSub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 2,
    marginBottom: 8,
    lineHeight: 14,
    height: 28,
  },
  bentoPill: {
    backgroundColor: 'rgba(79, 70, 229, 0.08)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: radii.pill,
  },
  bentoPillText: {
    fontFamily: fonts.headingBold,
    fontSize: 11,
    color: colors.brand,
  },

  /* 5. Scenario List */
  emptyScenariosText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: colors.textMuted,
    marginTop: spacing.sm,
  },
  scenarioList: {
    gap: 8,
    marginTop: spacing.sm,
  },
  scenarioCardItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.md,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.8)',
  },
  scenarioCardItemImage: {
    width: 52,
    height: 52,
    borderRadius: radii.sm,
    marginRight: 12,
  },
  scenarioCardItemContent: {
    flex: 1,
  },
  scenarioMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 2,
  },
  scenarioMetaBadge: {
    fontFamily: fonts.headingBold,
    fontSize: 9,
    color: colors.brand,
    backgroundColor: 'rgba(79, 70, 229, 0.08)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  scenarioMetaTime: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10,
    color: colors.textMuted,
  },
  scenarioCardItemTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 13,
    color: colors.textHeading,
  },
  scenarioCardItemArrow: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(79, 70, 229, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  arrowText: {
    fontSize: 14,
  },
});
