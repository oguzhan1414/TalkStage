import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import {
  avatarImages,
  cefrLevelImages,
  companionImage,
  homeImages,
  levelsRoadmapIslandBg,
  podcastHubIcon,
  scenarioCategoryImages,
  stateImages,
  yankiMagicImage,
} from '../assets/images';
import { BouncyPressable } from '../components/BouncyPressable';
import { useAuth } from '../context/AuthContext';
import { PERSONA_OPTIONS } from '../constants/onboarding';
import { api } from '../lib/api';
import type { MainTabScreenProps } from '../navigation/types';
import { colors, fonts, radii, shadow, spacing } from '../theme/tokens';
import type {
  GrammarMistakeOut,
  ProfileOut,
  ProgressOut,
  ScenarioOut,
  VocabCardOut,
} from '../types/api';

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

const CEFR_LEVEL_META = [
  { level: 'A1', title: 'Başlangıç', icon: cefrLevelImages.A1, color: '#10B981' },
  { level: 'A2', title: 'Temel Pratik', icon: cefrLevelImages.A2, color: '#0EA5E9' },
  { level: 'B1', title: 'İş & Standup', icon: cefrLevelImages.B1, color: '#6366F1' },
  { level: 'B2', title: 'Akıcı Sohbet', icon: cefrLevelImages.B2, color: '#8B5CF6' },
  { level: 'C1', title: 'Mülakat & Sunum', icon: cefrLevelImages.C1, color: '#EC4899' },
  { level: 'C2', title: 'Usta Sahne', icon: cefrLevelImages.C2, color: '#F59E0B' },
];

function toDateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function getTimeGreeting(): { greeting: string; subtitle: string } {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) {
    return {
      greeting: 'GÜNAYDIN ☀️',
      subtitle: 'Sabah kahvesiyle 5 dk Standup provası yapalım mı?',
    };
  } else if (hour >= 12 && hour < 17) {
    return {
      greeting: 'TÜNAYDIN ☕',
      subtitle: 'Öğle molasında hızlı bir mülakat simülasyonu yapalım!',
    };
  } else if (hour >= 17 && hour < 22) {
    return {
      greeting: 'İYİ AKŞAMLAR 🌆',
      subtitle: 'Günü kapatmadan önce akıcı bir diyalogla serini koru!',
    };
  } else {
    return {
      greeting: 'İYİ GECELER 🌙',
      subtitle: 'Uyumadan önce 3 dakikalık hızlı telaffuz pratiği yapalım.',
    };
  }
}

function buildCefrSteps(currentLevel: string | null | undefined) {
  const currentIdx = Math.max(
    0,
    CEFR_LEVEL_META.findIndex((m) => m.level === (currentLevel ?? 'A1'))
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
  const { data: progress } = useQuery({
    queryKey: ['progress'],
    queryFn: () => api.get<ProgressOut[]>('/progress'),
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
  const { data: mistakes } = useQuery({
    queryKey: ['grammar-mistakes'],
    queryFn: () => api.get<GrammarMistakeOut[]>('/progress/mistakes'),
  });

  const displayName =
    profile?.display_name ??
    (session?.user.user_metadata?.full_name as string | undefined)?.split(' ')[0] ??
    session?.user.email?.split('@')[0] ??
    'Konuşmacı';

  const userAvatar =
    (profile?.avatar_id && AVATAR_MAP[profile.avatar_id]) ||
    (profile?.persona_id && AVATAR_MAP[profile.persona_id]) ||
    avatarImages.studentYouth;

  const currentLevel = profile?.cefr_level ?? 'A1';
  const streak = profile?.streak_count ?? 1;
  const xp = profile?.xp ?? 0;
  const userGems = Math.max(50, Math.floor(xp / 3) + streak * 15);
  const cefrSteps = buildCefrSteps(currentLevel);

  // Real persona-driven recommendations — `profile.interests` is derived
  // server-side from `persona_id`+`learning_goal` at onboarding (see
  // `POST /onboarding/complete`), so this is a genuine match against the
  // user's actual answers, not a guess. Only rendered when there's a real
  // match — no generic filler pretending to be "for you".
  const personaObj = PERSONA_OPTIONS.find((p) => p.id === profile?.persona_id);
  const forYouScenarios = (allScenarios ?? []).filter((s) =>
    (profile?.interests ?? []).includes(s.category)
  );
  const popularScenarios = (allScenarios ?? []).slice(0, 3);
  const mistakesCount = mistakes?.length ?? 0;
  const dueVocabCount = dueVocabCards?.length ?? 0;

  // Daily practice calculation
  const todayKey = toDateKey(new Date());
  const todayProgress = (progress ?? []).find((p) => p.practice_date === todayKey);
  const todayMinutes = todayProgress?.minutes_practiced ?? 0;
  const dailyTargetMinutes = profile?.daily_target_minutes ?? 15;
  const todayGoalPercent = Math.min(100, Math.round((todayMinutes / dailyTargetMinutes) * 100));

  const timeGreeting = useMemo(() => getTimeGreeting(), []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ======================================================== */}
        {/* 1. TOP GAMIFIED APP BAR (Avatar, Greeting, Trio Pills)  */}
        {/* ======================================================== */}
        <View style={styles.header}>
          <BouncyPressable
            onPress={() => navigation.navigate('Profile')}
            style={styles.avatarWrapper}
            hitSlop={8}
            hapticType="light"
            scaleTo={0.93}
          >
            <Image source={userAvatar} style={styles.avatarImage} resizeMode="cover" />
            <View style={styles.avatarLevelBadge}>
              <Text style={styles.avatarLevelText}>{currentLevel}</Text>
            </View>
          </BouncyPressable>

          <View style={styles.greetingContainer}>
            <Text style={styles.greetingSub}>{timeGreeting.greeting}</Text>
            <Text style={styles.greetingName} numberOfLines={1}>
              {displayName}
            </Text>
          </View>

          {/* Trio Gamification Badges */}
          <View style={styles.statsPillRow}>
            {/* Streak Flame -> StudyPath (Konuşma Rotası) */}
            <BouncyPressable
              onPress={() => navigation.navigate('StudyPath')}
              style={[styles.statPill, shadow.card]}
              hapticType="medium"
              scaleTo={0.92}
            >
              <Text style={styles.statEmoji}>🔥</Text>
              <Text style={[styles.statNumber, { color: '#EA580C' }]}>{streak}</Text>
            </BouncyPressable>

            {/* Gems Diamond -> Profile */}
            <BouncyPressable
              onPress={() => navigation.navigate('Profile')}
              style={[styles.statPill, shadow.card]}
              hapticType="light"
              scaleTo={0.92}
            >
              <Text style={styles.statEmoji}>💎</Text>
              <Text style={[styles.statNumber, { color: '#0284C7' }]}>{userGems}</Text>
            </BouncyPressable>

            {/* Mistakes Vault -> MistakesNotebook */}
            <BouncyPressable
              onPress={() => navigation.navigate('MistakesNotebook')}
              style={[
                styles.statPill,
                shadow.card,
                mistakesCount > 0 && { borderColor: '#C7D2FE', backgroundColor: '#EEF2FF' },
              ]}
              hapticType="light"
              scaleTo={0.92}
            >
              <Text style={styles.statEmoji}>📓</Text>
              <Text style={[styles.statNumber, { color: '#4338CA' }]}>{mistakesCount}</Text>
            </BouncyPressable>
          </View>
        </View>

        {/* ======================================================== */}
        {/* 2. YANKI 3D LIVING COMPANION SPOTLIGHT BANNER           */}
        {/* ======================================================== */}
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
              &ldquo;{timeGreeting.subtitle}&rdquo;
            </Text>
            <Text style={styles.yankiSub}>
              Takıldığın anda alttan Türkçe fısıldarım, donmadan akıcı konuşursun.
            </Text>

            {/* Action CTA Buttons */}
            <View style={styles.yankiActionsRow}>
              <BouncyPressable
                onPress={() =>
                  recommended
                    ? navigation.navigate('LiveConversationRoom', {
                        scenarioId: recommended.id,
                        scenarioSlug: recommended.slug,
                        scenarioTitle: recommended.title,
                      })
                    : navigation.navigate('Scenarios')
                }
                style={[styles.yankiButton, shadow.card]}
                hapticType="medium"
                scaleTo={0.95}
              >
                <Ionicons name="mic" size={15} color="#FFFFFF" />
                <Text style={styles.yankiButtonText}>Hemen Canlı Konuş</Text>
                <Ionicons name="arrow-forward" size={13} color="#FFFFFF" />
              </BouncyPressable>

              <BouncyPressable
                onPress={() => navigation.navigate('TextChat')}
                style={styles.yankiSecondaryBtn}
                hapticType="light"
                scaleTo={0.95}
              >
                <Ionicons name="chatbubble-ellipses-outline" size={15} color="#4F46E5" />
                <Text style={styles.yankiSecondaryText}>Yazılı Chat</Text>
              </BouncyPressable>
            </View>
          </View>

          {/* 3D Floating Original Yankı Character (İlk Göz Ağrımız) */}
          <View style={styles.yankiImageContainer}>
            <Image
              source={companionImage}
              style={styles.yankiImage}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* ======================================================== */}
        {/* 3. TODAY'S DAILY PRACTICE GOAL WIDGET                   */}
        {/* ======================================================== */}
        <BouncyPressable
          onPress={() => {
            navigation.navigate('StudyPath');
          }}
          style={[styles.dailyGoalCard, shadow.card]}
          hapticType="medium"
          scaleTo={0.97}
        >
          <View style={styles.dailyGoalHeaderRow}>
            <View style={styles.dailyGoalTitleCol}>
              <View style={styles.dailyGoalTag}>
                <Ionicons name="flame" size={13} color="#EA580C" />
                <Text style={styles.dailyGoalTagText}>GÜNLÜK KONUŞMA ROTASI (STUDY PATH)</Text>
              </View>
              <Text style={styles.dailyGoalTitle}>
                {todayMinutes >= dailyTargetMinutes
                  ? 'Günün Pratik Hedefi Tamamlandı! 🎉'
                  : `${todayMinutes} / ${dailyTargetMinutes} Dk • Konuşma Rotasına Git ➔`}
              </Text>
            </View>
            <View style={styles.goalPercentBadge}>
              <Text style={styles.goalPercentText}>%{todayGoalPercent}</Text>
            </View>
          </View>

          {/* Progress Bar Track */}
          <View style={styles.goalProgressBarTrack}>
            <View style={[styles.goalProgressBarFill, { width: `${todayGoalPercent}%` }]} />
          </View>
        </BouncyPressable>

        {/* ======================================================== */}
        {/* 4. STEP-BY-STEP LEVEL LEARNING PATH (A1 -> C2 Roadmap)  */}
        {/* ======================================================== */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <View>
              <Text style={styles.sectionSubTitle}>SEVİYE YOLCULUĞU</Text>
              <Text style={styles.sectionMainTitle}>A1 &rarr; C2 Adım Adım İlerle</Text>
            </View>
            <BouncyPressable
              onPress={() => navigation.navigate('StudyPath')}
              hapticType="light"
              scaleTo={0.95}
            >
              <Text style={styles.seeAllText}>Yol Haritası (Study Path) &rarr;</Text>
            </BouncyPressable>
          </View>

          {/* 4a. 3D Panoramic Floating Island Showcase Window */}
          <BouncyPressable
            onPress={() => navigation.navigate('StudyPath')}
            style={[styles.islandPanoramicCard, shadow.card]}
            hapticType="medium"
            scaleTo={0.97}
          >
            <ImageBackground
              source={levelsRoadmapIslandBg}
              style={styles.islandPanoramicBg}
              imageStyle={styles.islandPanoramicImg}
              resizeMode="cover"
            >
              <View style={styles.islandPanoramicOverlay}>
                <View style={styles.islandTagBadge}>
                  <Text style={styles.islandTagEmoji}>🏝️</Text>
                  <Text style={styles.islandTagBadgeText}>6 BASAMAKLI ADA MÜFREDATI</Text>
                </View>
                <View style={styles.islandCtaRow}>
                  <Text style={styles.islandCtaTitle}>Haritada İlerlemeyi Gör</Text>
                  <View style={styles.islandCtaArrow}>
                    <Ionicons name="arrow-forward" size={14} color="#FFFFFF" />
                  </View>
                </View>
              </View>
            </ImageBackground>
          </BouncyPressable>

          {/* 4b. Unobstructed Horizontal CEFR Level Shields */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.levelsScroll}
          >
            {cefrSteps.map((step) => {
              const isCurrent = step.status === 'current';
              const isCompleted = step.status === 'completed';

              return (
                <BouncyPressable
                  key={step.level}
                  onPress={() => navigation.navigate('StudyPath')}
                  style={[
                    styles.levelCard,
                    shadow.card,
                    isCurrent && { borderColor: step.color, borderWidth: 2 },
                    isCompleted && styles.levelCardCompleted,
                  ]}
                  hapticType="light"
                  scaleTo={0.94}
                >
                  <View style={styles.levelBadgeRow}>
                    <Text
                      style={[
                        styles.levelCode,
                        isCurrent && { color: step.color },
                      ]}
                    >
                      {step.level}
                    </Text>
                    {isCompleted && (
                      <Ionicons name="checkmark-circle" size={14} color="#10B981" />
                    )}
                    {isCurrent && <View style={[styles.currentDot, { backgroundColor: step.color }]} />}
                  </View>

                  <Image
                    source={step.icon}
                    style={styles.levelShieldImage}
                    resizeMode="contain"
                  />

                  <Text
                    style={[
                      styles.levelTitle,
                      isCurrent && { color: step.color },
                    ]}
                    numberOfLines={1}
                  >
                    {step.title}
                  </Text>

                  <Text style={styles.levelStatusText}>
                    {isCompleted
                      ? 'Tamamlandı'
                      : isCurrent
                        ? 'Şu Anki Seviye'
                        : 'Kilitli'}
                  </Text>
                </BouncyPressable>
              );
            })}
          </ScrollView>
        </View>

        {/* ======================================================== */}
        {/* 5. 4'LÜ HIZLI GELİŞİM MODÜLLERİ (BENTO POWER HUBS)      */}
        {/* ======================================================== */}
        <View style={styles.section}>
          <Text style={styles.sectionSubTitle}>GÜNLÜK HIZLI PRATİK</Text>
          <Text style={styles.sectionMainTitle}>Gelişim Modülleri & Kasalar</Text>

          <View style={styles.bentoGrid}>
            {/* 1. Podcasts Hub */}
            <BouncyPressable
              onPress={() => navigation.navigate('PodcastList')}
              style={[styles.bentoCard, shadow.card]}
              hapticType="light"
              scaleTo={0.95}
            >
              <Image
                source={podcastHubIcon}
                style={styles.bentoCardImage}
                resizeMode="cover"
              />
              <Text style={styles.bentoCardTitle}>Podcasts 🎧</Text>
              <Text style={styles.bentoCardSub} numberOfLines={2}>
                40 Bölüm • A1-B2 Doğal Diyaloglar
              </Text>
              <View style={[styles.bentoPill, { backgroundColor: '#FEF3C7' }]}>
                <Text style={[styles.bentoPillText, { color: '#B45309' }]}>Dinle &rarr;</Text>
              </View>
            </BouncyPressable>

            {/* 2. Smart Reading & Stories */}
            <BouncyPressable
              onPress={() => navigation.navigate('ReadingList')}
              style={[styles.bentoCard, shadow.card]}
              hapticType="light"
              scaleTo={0.95}
            >
              <Image
                source={homeImages.readingModule}
                style={styles.bentoCardImage}
                resizeMode="contain"
              />
              <Text style={styles.bentoCardTitle}>Smart Reading 📖</Text>
              <Text style={styles.bentoCardSub} numberOfLines={2}>
                3 Adımlı Video & Cümle Sıralama
              </Text>
              <View style={[styles.bentoPill, { backgroundColor: '#EEF2FF' }]}>
                <Text style={[styles.bentoPillText, { color: '#4338CA' }]}>Oku &rarr;</Text>
              </View>
            </BouncyPressable>

            {/* 3. Kelime Sandığı */}
            <BouncyPressable
              onPress={() => navigation.navigate('Vocab')}
              style={[styles.bentoCard, shadow.card]}
              hapticType="light"
              scaleTo={0.95}
            >
              <Image
                source={homeImages.vocabDeck}
                style={styles.bentoCardImage}
                resizeMode="contain"
              />
              <Text style={styles.bentoCardTitle}>Kelime Sandığı 📦</Text>
              <Text style={styles.bentoCardSub} numberOfLines={2}>
                {dueVocabCount > 0
                  ? `${dueVocabCount} kelime tekrar bekliyor`
                  : 'Tüm kelimeler tekrarlandı'}
              </Text>
              <View style={[styles.bentoPill, { backgroundColor: '#ECFDF5' }]}>
                <Text style={[styles.bentoPillText, { color: '#047857' }]}>Çalış &rarr;</Text>
              </View>
            </BouncyPressable>

            {/* 4. Hata Defterim */}
            <BouncyPressable
              onPress={() => navigation.navigate('MistakesNotebook')}
              style={[styles.bentoCard, shadow.card]}
              hapticType="light"
              scaleTo={0.95}
            >
              <Image
                source={stateImages.mistakesNotebook}
                style={styles.bentoCardImage}
                resizeMode="contain"
              />
              <Text style={styles.bentoCardTitle}>Hata Defterim 📓</Text>
              <Text style={styles.bentoCardSub} numberOfLines={2}>
                {mistakesCount > 0
                  ? `${mistakesCount} kayıtlı zayıf nokta`
                  : 'Tertemiz bir sayfa'}
              </Text>
              <View style={[styles.bentoPill, { backgroundColor: '#FDF2F8' }]}>
                <Text style={[styles.bentoPillText, { color: '#BE185D' }]}>İncele &rarr;</Text>
              </View>
            </BouncyPressable>
          </View>

          {/* 5. 600 Core Words Library Feature Banner */}
          <BouncyPressable
            onPress={() => navigation.navigate('VocabLibrary')}
            style={[styles.libraryBannerCard, shadow.card]}
            hapticType="medium"
            scaleTo={0.97}
          >
            <View style={styles.libraryBannerLeft}>
              <View style={styles.libraryBannerBadge}>
                <Ionicons name="sparkles" size={11} color="#0EA5E9" />
                <Text style={styles.libraryBannerBadgeText}>YENİ ÖZELLİK • 900 KELİME</Text>
              </View>
              <Text style={styles.libraryBannerTitle}>Çekirdek Kelime Kütüphanesi 📚</Text>
              <Text style={styles.libraryBannerSub}>
                En sık kullanılan İsim, Fiil ve Sıfatları tüm gramer çekimleriyle incele &amp; sandığına ekle!
              </Text>
            </View>
            <View style={styles.libraryBannerArrow}>
              <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
            </View>
          </BouncyPressable>
        </View>

        {/* ======================================================== */}
        {/* 5.5 SANA ÖZEL — PERSONA/HEDEF EŞLEŞMELİ SAHNELER        */}
        {/* ======================================================== */}
        {forYouScenarios.length > 0 ? (
          <View style={styles.section}>
            <View style={styles.sectionHeaderRow}>
              <View>
                <Text style={styles.sectionSubTitle}>SANA ÖZEL</Text>
                <Text style={styles.sectionMainTitle}>
                  {personaObj ? `${personaObj.title} İçin Önerilenler` : 'Sana Uygun Sahneler'}
                </Text>
              </View>
              <Pressable onPress={() => navigation.navigate('Scenarios')}>
                <Text style={styles.seeAllText}>Tümünü Gör &rarr;</Text>
              </Pressable>
            </View>

            <View style={styles.scenarioList}>
              {forYouScenarios.slice(0, 3).map((sc) => (
                <Pressable
                  key={sc.id}
                  onPress={() =>
                    navigation.navigate('LiveConversationRoom', {
                      scenarioId: sc.id,
                      scenarioSlug: sc.slug,
                      scenarioTitle: sc.title,
                    })
                  }
                  style={[styles.scenarioCardItem, styles.forYouCardItem, shadow.card]}
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
                    <Ionicons name="mic" size={16} color="#4F46E5" />
                  </View>
                </Pressable>
              ))}
            </View>
          </View>
        ) : null}

        {/* ======================================================== */}
        {/* 6. POPULAR SCENARIOS 3D CAROUSEL                        */}
        {/* ======================================================== */}
        <View style={[styles.section, styles.lastSection]}>
          <View style={styles.sectionHeaderRow}>
            <View>
              <Text style={styles.sectionSubTitle}>POPÜLER SAHNELER</Text>
              <Text style={styles.sectionMainTitle}>Gerçek Hayat Simülasyonları</Text>
            </View>
            <Pressable onPress={() => navigation.navigate('Scenarios')}>
              <Text style={styles.seeAllText}>Tümünü Gör &rarr;</Text>
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
                    <Ionicons name="mic" size={16} color="#4F46E5" />
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
    paddingBottom: 110,
  },

  /* 1. Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  avatarWrapper: {
    width: 48,
    height: 48,
    position: 'relative',
    marginRight: 10,
  },
  avatarImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#4F46E5',
  },
  avatarLevelBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#4F46E5',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: radii.pill,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  avatarLevelText: {
    fontFamily: fonts.mono,
    fontSize: 8,
    fontWeight: 'bold',
    color: '#FFFFFF',
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
    fontSize: 17,
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
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  statEmoji: {
    fontSize: 12,
    marginRight: 3,
  },
  statNumber: {
    fontFamily: fonts.headingBold,
    fontSize: 11.5,
  },

  /* 2. Yankı Spotlight Banner */
  yankiBanner: {
    position: 'relative',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 16,
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    marginBottom: spacing.md,
  },
  yankiGlowBackdrop: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(79, 70, 229, 0.08)',
  },
  yankiContent: {
    flex: 1,
    paddingRight: 6,
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
    fontSize: 9.5,
    color: colors.brand,
    fontWeight: 'bold',
  },
  yankiTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 13.5,
    color: colors.textHeading,
    lineHeight: 18,
    marginBottom: 4,
  },
  yankiSub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textBody,
    lineHeight: 15,
    marginBottom: 10,
  },
  yankiActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  yankiButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4F46E5',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radii.pill,
    gap: 5,
  },
  yankiButtonText: {
    fontFamily: fonts.headingBold,
    fontSize: 11.5,
    color: '#FFFFFF',
  },
  yankiSecondaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: radii.pill,
    gap: 4,
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  yankiSecondaryText: {
    fontFamily: fonts.headingBold,
    fontSize: 11,
    color: '#4F46E5',
  },
  yankiImageContainer: {
    width: 95,
    alignItems: 'center',
    justifyContent: 'center',
  },
  yankiImage: {
    width: 100,
    height: 100,
  },

  /* 3. Daily Practice Goal Widget */
  dailyGoalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: spacing.md,
    borderWidth: 1.5,
    borderColor: '#E0F2FE',
  },
  dailyGoalHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  dailyGoalTitleCol: {
    flex: 1,
  },
  dailyGoalTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  dailyGoalTagText: {
    fontFamily: fonts.mono,
    fontSize: 9,
    fontWeight: 'bold',
    color: '#EA580C',
  },
  dailyGoalTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 12.5,
    color: colors.textHeading,
  },
  goalPercentBadge: {
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.pill,
  },
  goalPercentText: {
    fontFamily: fonts.mono,
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#0369A1',
  },
  goalProgressBarTrack: {
    height: 6,
    backgroundColor: '#F1F5F9',
    borderRadius: radii.pill,
    overflow: 'hidden',
  },
  goalProgressBarFill: {
    height: '100%',
    backgroundColor: '#0EA5E9',
    borderRadius: radii.pill,
  },

  /* Section Common */
  section: {
    marginBottom: spacing.md,
  },
  lastSection: {
    marginBottom: spacing.sm,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  sectionSubTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 10,
    color: colors.brand,
    letterSpacing: 0.8,
  },
  sectionMainTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 15,
    color: colors.textHeading,
    marginTop: 1,
  },
  seeAllText: {
    fontFamily: fonts.headingBold,
    fontSize: 11.5,
    color: colors.brand,
  },

  /* 4a. 3D Panoramic Floating Island Showcase Window */
  islandPanoramicCard: {
    borderRadius: 22,
    overflow: 'hidden',
    marginBottom: spacing.sm,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },
  islandPanoramicBg: {
    width: '100%',
    height: 124,
    justifyContent: 'space-between',
  },
  islandPanoramicImg: {
    borderRadius: 22,
  },
  islandPanoramicOverlay: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
  },
  islandTagBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.pill,
  },
  islandTagEmoji: {
    fontSize: 11,
  },
  islandTagBadgeText: {
    fontFamily: fonts.mono,
    fontSize: 9,
    fontWeight: 'bold',
    color: colors.brand,
    letterSpacing: 0.5,
  },
  islandCtaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radii.pill,
  },
  islandCtaTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 12,
    color: '#FFFFFF',
  },
  islandCtaArrow: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* Levels Scroll */
  levelsScroll: {
    flexDirection: 'row',
    paddingVertical: 4,
    gap: 10,
  },
  levelCard: {
    width: 108,
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    borderRadius: 18,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  levelCardCompleted: {
    backgroundColor: '#F0FDF4',
    borderColor: '#BBF7D0',
  },
  levelBadgeRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  levelCode: {
    fontFamily: fonts.mono,
    fontSize: 11.5,
    fontWeight: 'bold',
    color: colors.textMuted,
  },
  currentDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  levelShieldImage: {
    width: 48,
    height: 48,
    marginVertical: 4,
  },
  levelTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 11,
    color: colors.textHeading,
    textAlign: 'center',
    marginTop: 2,
  },
  levelStatusText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 9,
    color: colors.textMuted,
    marginTop: 2,
  },

  /* Bento Grid */
  bentoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 10,
    marginTop: 4,
  },
  bentoCard: {
    width: '48.5%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#EEF2FF',
  },
  bentoCardImage: {
    width: 42,
    height: 42,
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
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radii.pill,
  },
  bentoPillText: {
    fontFamily: fonts.headingBold,
    fontSize: 10.5,
  },
  libraryBannerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 14,
    marginTop: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1.5,
    borderColor: '#E0E7FF',
  },
  libraryBannerLeft: {
    flex: 1,
    paddingRight: 10,
  },
  libraryBannerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F0F9FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.pill,
    alignSelf: 'flex-start',
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#BAE6FD',
  },
  libraryBannerBadgeText: {
    fontFamily: fonts.mono,
    fontSize: 9,
    fontWeight: 'bold',
    color: '#0284C7',
    letterSpacing: 0.4,
  },
  libraryBannerTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 14,
    color: colors.textHeading,
  },
  libraryBannerSub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textBody,
    marginTop: 3,
    lineHeight: 15,
  },
  libraryBannerArrow: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* Scenario List */
  emptyScenariosText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: colors.textMuted,
    marginTop: spacing.sm,
  },
  scenarioList: {
    gap: 8,
    marginTop: 4,
  },
  scenarioCardItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  forYouCardItem: {
    borderColor: '#C7D2FE',
    backgroundColor: '#F5F7FF',
  },
  scenarioCardItemImage: {
    width: 50,
    height: 50,
    borderRadius: 12,
    marginRight: 12,
  },
  scenarioCardItemContent: {
    flex: 1,
  },
  scenarioMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  scenarioMetaBadge: {
    fontFamily: fonts.headingBold,
    fontSize: 9,
    color: colors.brand,
    backgroundColor: '#EEF2FF',
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
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
});
