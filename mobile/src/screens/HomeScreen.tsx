import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { useCallback, useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import { SCENARIOS, type ScenarioEntry } from '@talkstage/shared-data/scenariosData';
import {
  ALL_SPEAKING_TOPIC_CODES,
  ALL_TOPIC_CODES,
  CEFR_CURRICULUM,
  computeFullCompletion,
  isTopicCompleted,
  type CurriculumTopic,
} from '@talkstage/shared-data/curriculumData';
import {
  avatarImages,
  companionImage,
  dynamicCompanion,
  homeImages,
  quickIcons,
  resolveScenarioCategoryFallback,
  scenarioCategoryImages,
  stateImages,
} from '../assets/images';
import { BouncyPressable } from '../components/BouncyPressable';
import { InteractiveVideoScenarioModal } from '../components/InteractiveVideoScenarioModal';
import { Toast } from '../components/Toast';
import { TopicTaskSteps } from '../components/TopicTaskSteps';
import { useAuth } from '../context/AuthContext';
import { PERSONA_OPTIONS } from '../constants/onboarding';
import { findCurriculumWord } from '../data/curriculumVocabulary';
import { api } from '../lib/api';
import { haptics } from '../lib/haptics';
import { pullLearningFlags } from '../lib/learningFlags';
import { resolveMediaUrl } from '../lib/media';
import type { MainTabScreenProps } from '../navigation/types';
import { colors, fonts, gradients, radii, shadow, spacing } from '../theme/tokens';
import type {
  GrammarMistakeOut,
  ProfileOut,
  ProgressOut,
  ReadingPassageOut,
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

/** Quick-link chip themes with pastel gradients and tactile borders */
const QUICK_LINK_THEME = {
  indigo: { gradient: ['#EEF2FF', '#E0E7FF'] as const, border: '#C7D2FE', text: '#4338CA' },
  emerald: { gradient: ['#ECFDF5', '#D1FAE5'] as const, border: '#A7F3D0', text: '#047857' },
  violet: { gradient: ['#F5F3FF', '#EDE9FE'] as const, border: '#DDD6FE', text: '#6D28D9' },
  amber: { gradient: ['#FFFBEB', '#FEF3C7'] as const, border: '#FDE68A', text: '#B45309' },
  rose: { gradient: ['#FDF2F8', '#FCE7F3'] as const, border: '#FBCFE8', text: '#BE185D' },
};

function toDateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function getTimeGreeting(): {
  greeting: string;
  subtitle: string;
  timeOfDay: 'morning' | 'afternoon' | 'evening';
} {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) {
    return {
      greeting: 'GÜNAYDIN ☀️',
      subtitle: 'Sabah kahvesiyle 5 dk Standup provası yapalım mı?',
      timeOfDay: 'morning',
    };
  } else if (hour >= 12 && hour < 17) {
    return {
      greeting: 'TÜNAYDIN ☕',
      subtitle: 'Öğle molasında hızlı bir mülakat simülasyonu yapalım!',
      timeOfDay: 'afternoon',
    };
  } else if (hour >= 17 && hour < 22) {
    return {
      greeting: 'İYİ AKŞAMLAR 🌆',
      subtitle: 'Günü kapatmadan önce akıcı bir diyalogla serini koru!',
      timeOfDay: 'evening',
    };
  } else {
    return {
      greeting: 'İYİ GECELER 🌙',
      subtitle: 'Uyumadan önce 3 dakikalık hızlı telaffuz pratiği yapalım.',
      timeOfDay: 'evening',
    };
  }
}

/** Just enough per-day signal for the 7 mini streak dots — no labels/numbers
 * (those live in the full Calendar screen this card links to). */
function getWeekCompletionDots(progressList: ProgressOut[], currentStreak: number) {
  const now = new Date();
  const currentDayOfWeek = (now.getDay() + 6) % 7; // Monday = 0, Sunday = 6
  const monday = new Date(now);
  monday.setDate(now.getDate() - currentDayOfWeek);

  const days = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const dateKey = toDateKey(d);
    const isPast = i < currentDayOfWeek;
    const prog = (progressList ?? []).find((p) => p.practice_date === dateKey);
    const hasPracticed = (prog?.minutes_practiced ?? 0) > 0;
    days.push({
      isToday: i === currentDayOfWeek,
      isCompleted: hasPracticed || (isPast && currentDayOfWeek - i < currentStreak),
    });
  }
  return days;
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
  const queryClient = useQueryClient();

  const { data: recommended } = useQuery({
    queryKey: ['scenarios', 'recommended'],
    queryFn: () => api.get<ScenarioOut>('/scenarios/recommended'),
  });
  const { data: dueVocabCards } = useQuery({
    queryKey: ['vocab-cards'],
    queryFn: () => api.get<VocabCardOut[]>('/vocab-cards'),
  });
  const { data: allVocabCards } = useQuery({
    queryKey: ['vocab-cards', 'all'],
    queryFn: () => api.get<VocabCardOut[]>('/vocab-cards?all=true'),
  });
  const { data: readingPassages } = useQuery({
    queryKey: ['reading'],
    queryFn: () => api.get<ReadingPassageOut[]>('/reading'),
  });
  const { data: completedReadingSlugs } = useQuery({
    queryKey: ['reading', 'completed'],
    queryFn: () => api.get<string[]>('/reading/completed-slugs'),
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

  const personaObj = PERSONA_OPTIONS.find((p) => p.id === profile?.persona_id);
  const mistakesCount = mistakes?.length ?? 0;
  const dueVocabCount = dueVocabCards?.length ?? 0;

  // Daily practice calculation
  const todayKey = toDateKey(new Date());
  const todayProgress = (progress ?? []).find((p) => p.practice_date === todayKey);
  const todayMinutes = todayProgress?.minutes_practiced ?? 0;
  const dailyTargetMinutes = profile?.daily_target_minutes ?? 15;
  const dailyProgressPct = Math.min(
    100,
    Math.round((todayMinutes / Math.max(1, dailyTargetMinutes)) * 100)
  );

  const [selectedVideoScenario, setSelectedVideoScenario] = useState<ScenarioEntry | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [videoCoverErrorIds, setVideoCoverErrorIds] = useState<Set<string>>(new Set());

  // Systematic learning roadmap flags
  const [chatCompletedCodes, setChatCompletedCodes] = useState<Set<string>>(new Set());
  const [lessonQuizDoneCodes, setLessonQuizDoneCodes] = useState<Set<string>>(new Set());

  const reloadStationFlags = useCallback(() => {
    pullLearningFlags().then(() => {
      AsyncStorage.multiGet(ALL_SPEAKING_TOPIC_CODES.map((c) => `topic_chat_completed_${c}`)).then(
        (pairs) => {
          setChatCompletedCodes(
            new Set(
              pairs
                .filter(([, v]) => v === '1')
                .map(([k]) => k.replace('topic_chat_completed_', ''))
            )
          );
        }
      );
      AsyncStorage.multiGet(ALL_TOPIC_CODES.map((c) => `lesson_quiz_done_${c}`)).then((pairs) => {
        setLessonQuizDoneCodes(
          new Set(pairs.filter(([, v]) => v === '1').map(([k]) => k.replace('lesson_quiz_done_', '')))
        );
      });
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      reloadStationFlags();
    }, [reloadStationFlags])
  );

  const savedWordsSet = useMemo(
    () => new Set((allVocabCards ?? []).map((c) => c.term.trim().toLowerCase())),
    [allVocabCards]
  );
  const completedReadingSlugSet = useMemo(
    () => new Set(completedReadingSlugs ?? []),
    [completedReadingSlugs]
  );
  const completedReadingCountForLevel = useMemo(
    () =>
      (readingPassages ?? []).filter(
        (p) => (p.cefr_level ?? 'A1') === currentLevel && completedReadingSlugSet.has(p.slug)
      ).length,
    [readingPassages, currentLevel, completedReadingSlugSet]
  );

  const currentCurriculum = CEFR_CURRICULUM[currentLevel] ?? CEFR_CURRICULUM.A1;
  const fullCompletion = useMemo(
    () =>
      computeFullCompletion(
        currentCurriculum.topics,
        savedWordsSet,
        chatCompletedCodes,
        completedReadingCountForLevel,
        lessonQuizDoneCodes
      ),
    [
      currentCurriculum.topics,
      savedWordsSet,
      chatCompletedCodes,
      completedReadingCountForLevel,
      lessonQuizDoneCodes,
    ]
  );

  // Active current topic on roadmap
  const currentTopic = useMemo(
    () => currentCurriculum.topics.find((t) => !fullCompletion[t.code]) ?? currentCurriculum.topics[0],
    [currentCurriculum.topics, fullCompletion]
  );

  const isQuizDone = currentTopic ? lessonQuizDoneCodes.has(currentTopic.code) : false;
  const isVocabDone = currentTopic ? isTopicCompleted(currentTopic, savedWordsSet) : false;
  const isPracticeDone = !currentTopic
    ? false
    : currentTopic.moduleType === 'vocab'
      ? true
      : currentTopic.moduleType === 'speaking'
        ? chatCompletedCodes.has(currentTopic.code)
        : completedReadingCountForLevel > 0;

  const completedStepsCount = (isQuizDone ? 1 : 0) + (isVocabDone ? 1 : 0) + (isPracticeDone ? 1 : 0);
  const isStationMastered = currentTopic ? (fullCompletion[currentTopic.code] ?? false) : false;

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1800);
  };

  const handleAddTopicWords = async (topic: CurriculumTopic) => {
    const missing = topic.targetWords.filter((w) => !savedWordsSet.has(w.trim().toLowerCase()));
    if (missing.length === 0) {
      showToast('Kelimeler zaten sandığında ✓');
      return;
    }
    try {
      await Promise.all(
        missing.map((word) => {
          const found = findCurriculumWord(word);
          return api.post('/vocab-cards', {
            term: word,
            translation: found?.tr,
            example_sentence: found?.exampleEn,
            source_label: `${topic.code} · ${currentLevel} Müfredatı`,
          });
        })
      );
      queryClient.invalidateQueries({ queryKey: ['vocab-cards'] });
      queryClient.invalidateQueries({ queryKey: ['vocab-cards', 'all'] });
      showToast(`${missing.length} kelime sandığına eklendi! 📚`);
    } catch {
      showToast('Kelimeler eklenirken hata oluştu.');
    }
  };

  const readyVideoScenarios = useMemo(
    () => SCENARIOS.filter((s) => s.videoSteps && s.videoSteps.length > 0 && s.videoReady),
    []
  );

  const timeGreeting = useMemo(() => getTimeGreeting(), []);
  const yankiMascot = dynamicCompanion[timeGreeting.timeOfDay] || companionImage;
  const weekDots = useMemo(() => getWeekCompletionDots(progress ?? [], streak), [progress, streak]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ======================================================== */}
        {/* 1. TOP APP BAR (Avatar, Greeting + XP & CEFR Pill)      */}
        {/* ======================================================== */}
        <View style={styles.header}>
          <View style={styles.headerLeftCol}>
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
          </View>

          <View style={styles.headerStatsRow}>
            <BouncyPressable
              onPress={() => navigation.navigate('Badges')}
              style={[styles.headerStatPill, styles.headerXpPill]}
              hitSlop={6}
              hapticType="light"
              scaleTo={0.93}
            >
              <Image
                source={stateImages.xpBolt}
                style={styles.headerXpBoltIcon}
                resizeMode="contain"
              />
              <Text style={styles.headerXpText}>{profile?.xp ?? 140} XP</Text>
            </BouncyPressable>

            <BouncyPressable
              onPress={() => navigation.navigate('Roadmap')}
              style={[styles.headerStatPill, styles.headerLevelPill]}
              hitSlop={6}
              hapticType="light"
              scaleTo={0.93}
            >
              <Text style={styles.headerLevelEmoji}>🏆</Text>
              <Text style={styles.headerLevelText}>{currentLevel}</Text>
            </BouncyPressable>
          </View>
        </View>

        {/* ======================================================== */}
        {/* 2. BUGÜN HERO — seri rozeti ve dinamik maskot             */}
        {/* ======================================================== */}
        <View style={[styles.heroCard, shadow.porcelain]}>
          <View style={styles.heroGlowBlob} />

          <View style={styles.heroTopRow}>
            <View style={styles.streakPill}>
              <Ionicons name="checkmark-done-circle" size={18} color={colors.brand} />
              <Text style={styles.streakPillText}>{streak} Gün</Text>
            </View>

            <View style={styles.weekDotsRow}>
              {weekDots.map((day, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.weekDot,
                    day.isCompleted && styles.weekDotCompleted,
                    day.isToday && !day.isCompleted && styles.weekDotToday,
                  ]}
                >
                  {day.isCompleted && <View style={styles.weekDotInnerGlow} />}
                </View>
              ))}
            </View>
          </View>

          {/* Daily Goal Progress Bar */}
          <BouncyPressable
            onPress={() => navigation.navigate('Profile')}
            style={styles.dailyGoalBarWrap}
            hitSlop={4}
            hapticType="light"
            scaleTo={0.98}
          >
            <View style={styles.dailyGoalBarTop}>
              <View style={styles.dailyGoalLabelRow}>
                <Ionicons name="flag" size={12} color={colors.brand} />
                <Text style={styles.dailyGoalBarLabel}>
                  Günün Hedefi:{' '}
                  <Text style={styles.dailyGoalBarPercent}>%{dailyProgressPct}</Text>
                </Text>
              </View>
              <Text style={styles.dailyGoalBarMinutes}>
                {todayMinutes}/{dailyTargetMinutes} dk →
              </Text>
            </View>
            <View style={styles.dailyGoalTrack}>
              <View
                style={[
                  styles.dailyGoalFill,
                  { width: `${Math.max(5, dailyProgressPct)}%` },
                  dailyProgressPct >= 100 && styles.dailyGoalFillComplete,
                ]}
              />
            </View>
          </BouncyPressable>

          {/* ======================================================== */}
          {/* SİSTEMATİK İSTASYON GÖREVLERİ (TUR ATLAMA ŞARTLARI)      */}
          {/* ======================================================== */}
          {currentTopic && (
            <View style={styles.stationMissionCard}>
              <View style={styles.heroMissionRow}>
                <View style={styles.heroMissionTextCol}>
                  <View style={styles.dailyPlanBadge}>
                    <Ionicons name="sparkles" size={12} color={colors.brand} />
                    <Text style={styles.dailyPlanBadgeText}>
                      {currentLevel} · {currentTopic.code} İSTASYONU
                    </Text>
                  </View>
                  <Text style={styles.heroMissionTitle} numberOfLines={2}>
                    {currentTopic.title}
                  </Text>
                </View>
                <View style={styles.mascotWithAuraWrapper}>
                  <View style={styles.mascotAuraGlow} />
                  <Image source={yankiMascot} style={styles.heroMascotImg} resizeMode="contain" />
                </View>
              </View>

              {/* Progress counter badge */}
              <View style={styles.stationProgressRow}>
                <Text style={styles.stationProgressLabel}>Tur Atlama Görevleri:</Text>
                <View style={[styles.stationProgressPill, isStationMastered && styles.stationProgressPillMastered]}>
                  <Text style={[styles.stationProgressPillText, isStationMastered && styles.stationProgressPillTextMastered]}>
                    {completedStepsCount}/3 Görev {isStationMastered ? '⭐⭐⭐' : ''}
                  </Text>
                </View>
              </View>

              {/* Same 3-task list CurriculumScreen's topic modal shows — see
                  TopicTaskSteps.tsx for why this used to be two separate,
                  drifting copies of the same logic. */}
              <TopicTaskSteps
                topic={currentTopic}
                isQuizDone={isQuizDone}
                isVocabDone={isVocabDone}
                isPracticeDone={isPracticeDone}
                onOpenLesson={() => navigation.navigate('GrammarLesson', { code: currentTopic.code })}
                onAddWords={() => handleAddTopicWords(currentTopic)}
                onStartPractice={() => {
                  // vocab-type topics have no separate "practice" destination
                  // (isPracticeDone is always true for them) — matches
                  // CurriculumScreen's handleStartTopicAction, which this used
                  // to NOT match: this button would have tried to open
                  // TextChat for a vocab topic too before this fix.
                  if (currentTopic.moduleType === 'vocab') {
                    handleAddTopicWords(currentTopic);
                  } else if (currentTopic.moduleType === 'reading') {
                    navigation.navigate('ReadingList');
                  } else {
                    navigation.navigate('TextChat', {
                      focusTopic: {
                        title: currentTopic.title,
                        formula: currentTopic.formula,
                        targetWords: currentTopic.targetWords,
                        topicCode: currentTopic.code,
                      },
                    });
                  }
                }}
              />

              {/* Optional reinforcement chat — speaking topics already have
                  this as their required practice step above; for reading/
                  vocab topics (which have no chat-based practice at all) this
                  is a bonus, not a requirement, so it only appears once the
                  lesson is actually done ("öğrendikten sonra pekiştirme",
                  not before). Reuses the exact same focusTopic chat speaking
                  topics use — no new backend/per-topic work needed, every
                  topic already carries its own formula/targetWords. */}
              {currentTopic.moduleType !== 'speaking' && isQuizDone && (
                <Pressable
                  onPress={() =>
                    navigation.navigate('TextChat', {
                      focusTopic: {
                        title: currentTopic.title,
                        formula: currentTopic.formula,
                        targetWords: currentTopic.targetWords,
                        topicCode: currentTopic.code,
                      },
                    })
                  }
                  style={styles.reinforceChatLink}
                  hitSlop={6}
                >
                  <Ionicons name="chatbubbles-outline" size={13} color={colors.brand} />
                  <Text style={styles.reinforceChatLinkText}>
                    Konuyu Sohbetle Pekiştir (opsiyonel)
                  </Text>
                </Pressable>
              )}

              {/* Station completion or roadmap link */}
              {isStationMastered ? (
                <View style={styles.masteredBanner}>
                  <Text style={styles.masteredBannerText}>
                    🎉 Tebrikler! {currentTopic.code} durağını tamamladın. Sıradaki durak açıldı!
                  </Text>
                  <BouncyPressable
                    onPress={() => navigation.navigate('Roadmap')}
                    style={styles.masteredBtn}
                    hapticType="success"
                  >
                    <Text style={styles.masteredBtnText}>Öğrenme Yolunu Gör 🗺️</Text>
                  </BouncyPressable>
                </View>
              ) : (
                <BouncyPressable
                  onPress={() => navigation.navigate('Roadmap')}
                  style={styles.roadmapInlineLink}
                  hitSlop={6}
                >
                  <Text style={styles.roadmapInlineLinkText}>
                    Tüm Aday Adası Yol Haritasını Gör ➔
                  </Text>
                </BouncyPressable>
              )}
            </View>
          )}
        </View>

        {/* ======================================================== */}
        {/* İSTEĞE BAĞLI SERBEST PRATİK & KEŞFET                      */}
        {/* ======================================================== */}
        <View style={styles.sandboxSection}>
          <View style={styles.sandboxHeader}>
            <Text style={styles.sandboxTitle}>İsteğe Bağlı Serbest Pratik 🎯</Text>
            <Text style={styles.sandboxSub}>Ana ilerlemeni bozmadan istediğin zaman girip pratik yap</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.sandboxScroll}>
            {/* 1. Maya's Burgers */}
            <BouncyPressable
              onPress={() => (navigation as any).navigate('BurgerOrderLive')}
              style={styles.sandboxCard}
              hapticType="medium"
            >
              <LinearGradient colors={['#FFF7ED', '#FFEDD5']} style={styles.sandboxCardGradient}>
                <Text style={styles.sandboxCardEmoji}>🍔</Text>
                <Text style={styles.sandboxCardTitle}>Maya's Burgers</Text>
                <Text style={styles.sandboxCardDesc}>Canlı Sipariş & Gramer</Text>
              </LinearGradient>
            </BouncyPressable>

            {/* 2. 3D Sahne Pratiği */}
            <BouncyPressable
              onPress={() => navigation.navigate('Scenarios')}
              style={styles.sandboxCard}
              hapticType="medium"
            >
              <LinearGradient colors={['#EEF2FF', '#E0E7FF']} style={styles.sandboxCardGradient}>
                <Text style={styles.sandboxCardEmoji}>🎬</Text>
                <Text style={styles.sandboxCardTitle}>3D Sahneler</Text>
                <Text style={styles.sandboxCardDesc}>Kafede & Havalimanında</Text>
              </LinearGradient>
            </BouncyPressable>

            {/* 3. Serbest Yazma */}
            <BouncyPressable
              onPress={() => navigation.navigate('TextChat')}
              style={styles.sandboxCard}
              hapticType="medium"
            >
              <LinearGradient colors={['#F0FDF4', '#DCFCE7']} style={styles.sandboxCardGradient}>
                <Text style={styles.sandboxCardEmoji}>✍️</Text>
                <Text style={styles.sandboxCardTitle}>Serbest Yazma</Text>
                <Text style={styles.sandboxCardDesc}>Maya ile Chat</Text>
              </LinearGradient>
            </BouncyPressable>

            {/* 4. Podcast Kulübü */}
            <BouncyPressable
              onPress={() => navigation.navigate('PodcastList')}
              style={styles.sandboxCard}
              hapticType="medium"
            >
              <LinearGradient colors={['#FAF5FF', '#F3E8FF']} style={styles.sandboxCardGradient}>
                <Text style={styles.sandboxCardEmoji}>🎧</Text>
                <Text style={styles.sandboxCardTitle}>Podcastler</Text>
                <Text style={styles.sandboxCardDesc}>Dinleme & Telaffuz</Text>
              </LinearGradient>
            </BouncyPressable>
          </ScrollView>
        </View>

        {/* ======================================================== */}
        {/* 3. HIZLI ERİŞİM ŞERİDİ — 3D Micro-Art İkonlarla           */}
        {/* ======================================================== */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.quickLinksScroll}
        >
          {/* 1. Yol Haritası */}
          <BouncyPressable
            onPress={() => navigation.navigate('Roadmap')}
            hapticType="light"
            scaleTo={0.95}
          >
            <LinearGradient
              colors={QUICK_LINK_THEME.indigo.gradient}
              style={[styles.quickLinkChip, { borderBottomColor: QUICK_LINK_THEME.indigo.border }]}
            >
              <View style={styles.quickLinkIconWrap}>
                <Image
                  source={quickIcons.roadmap}
                  style={styles.quickLinkIconImage}
                  resizeMode="contain"
                />
              </View>
              <Text style={[styles.quickLinkLabel, { color: QUICK_LINK_THEME.indigo.text }]} numberOfLines={1}>
                Yol Haritası
              </Text>
            </LinearGradient>
          </BouncyPressable>

          {/* 2. Kelimeler & Sandık */}
          <BouncyPressable onPress={() => navigation.navigate('Vocab')} hapticType="light" scaleTo={0.95}>
            <LinearGradient
              colors={QUICK_LINK_THEME.emerald.gradient}
              style={[styles.quickLinkChip, { borderBottomColor: QUICK_LINK_THEME.emerald.border }]}
            >
              {dueVocabCount > 0 && (
                <View style={styles.quickLinkBadge}>
                  <Text style={styles.quickLinkBadgeText}>{dueVocabCount}</Text>
                </View>
              )}
              <View style={styles.quickLinkIconWrap}>
                <Image
                  source={quickIcons.vocab}
                  style={styles.quickLinkIconImage}
                  resizeMode="contain"
                />
              </View>
              <Text style={[styles.quickLinkLabel, { color: QUICK_LINK_THEME.emerald.text }]} numberOfLines={1}>
                Kelimeler
              </Text>
            </LinearGradient>
          </BouncyPressable>

          {/* 3. 900 Kelime Sözlüğü */}
          <BouncyPressable onPress={() => navigation.navigate('VocabLibrary')} hapticType="light" scaleTo={0.95}>
            <LinearGradient
              colors={QUICK_LINK_THEME.violet.gradient}
              style={[styles.quickLinkChip, { borderBottomColor: QUICK_LINK_THEME.violet.border }]}
            >
              <View style={styles.quickLinkIconWrap}>
                <Image
                  source={quickIcons.dictionary}
                  style={styles.quickLinkIconImage}
                  resizeMode="contain"
                />
              </View>
              <Text style={[styles.quickLinkLabel, { color: QUICK_LINK_THEME.violet.text }]} numberOfLines={1}>
                900 Kelime
              </Text>
            </LinearGradient>
          </BouncyPressable>

          {/* 4. Podcast Stüdyosu */}
          <BouncyPressable onPress={() => navigation.navigate('PodcastList')} hapticType="light" scaleTo={0.95}>
            <LinearGradient
              colors={QUICK_LINK_THEME.amber.gradient}
              style={[styles.quickLinkChip, { borderBottomColor: QUICK_LINK_THEME.amber.border }]}
            >
              <View style={styles.quickLinkIconWrap}>
                <Image
                  source={quickIcons.podcast}
                  style={styles.quickLinkIconImage}
                  resizeMode="contain"
                />
              </View>
              <Text style={[styles.quickLinkLabel, { color: QUICK_LINK_THEME.amber.text }]} numberOfLines={1}>
                Podcasts
              </Text>
            </LinearGradient>
          </BouncyPressable>

          {/* 5. Hata Defteri */}
          <BouncyPressable onPress={() => navigation.navigate('MistakesNotebook')} hapticType="light" scaleTo={0.95}>
            <LinearGradient
              colors={QUICK_LINK_THEME.rose.gradient}
              style={[styles.quickLinkChip, { borderBottomColor: QUICK_LINK_THEME.rose.border }]}
            >
              {mistakesCount > 0 && (
                <View style={styles.quickLinkBadge}>
                  <Text style={styles.quickLinkBadgeText}>{mistakesCount}</Text>
                </View>
              )}
              <View style={styles.quickLinkIconWrap}>
                <Image
                  source={quickIcons.mistakes}
                  style={styles.quickLinkIconImage}
                  resizeMode="contain"
                />
              </View>
              <Text style={[styles.quickLinkLabel, { color: QUICK_LINK_THEME.rose.text }]} numberOfLines={1}>
                Hata Defteri
              </Text>
            </LinearGradient>
          </BouncyPressable>
        </ScrollView>

        {/* ======================================================== */}
        {/* 4. 3D CANLI SİNEMA SPOTLIGHT — Pixar Kalitesinde Sahneler*/}
        {/* ======================================================== */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <View>
              <View style={styles.cinemaLiveBadgeRow}>
                <View style={styles.livePulseDot} />
                <Text style={styles.sectionSubTitle}>3D CANLI SİNEMA STÜDYOSU</Text>
              </View>
              <Text style={styles.sectionMainTitle}>Karakterlerle Yüz Yüze Konuş</Text>
            </View>
            <Pressable onPress={() => navigation.navigate('Scenarios')}>
              <Text style={styles.seeAllText}>Tümünü Gör →</Text>
            </Pressable>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.cinemaSpotlightScroll}
          >
            {readyVideoScenarios.map((sc) => {
              const coverUrl = sc.coverImage ? resolveMediaUrl(sc.coverImage) : null;
              const coverFailed = videoCoverErrorIds.has(sc.id);
              const stepCount = sc.videoSteps?.length ?? 6;

              return (
                <BouncyPressable
                  key={sc.id}
                  onPress={() => {
                    haptics.success();
                    setSelectedVideoScenario(sc);
                  }}
                  style={[styles.cinemaSpotlightCard, shadow.card]}
                  hapticType="medium"
                  scaleTo={0.96}
                >
                  <View style={styles.cinemaSpotlightCoverBox}>
                    <Image
                      source={
                        coverUrl && !coverFailed
                          ? { uri: coverUrl }
                          : resolveScenarioCategoryFallback(sc.category)
                      }
                      onError={() =>
                        setVideoCoverErrorIds((prev) => new Set(prev).add(sc.id))
                      }
                      style={styles.cinemaSpotlightCoverImage}
                      resizeMode="cover"
                    />
                    <LinearGradient
                      colors={['rgba(15,23,42,0.1)', 'rgba(15,23,42,0.85)']}
                      style={styles.cinemaSpotlightCoverOverlay}
                    />

                    {/* Top badges */}
                    <View style={styles.cinemaSpotlightTopBadges}>
                      <View style={styles.cinemaSpotlightLivePill}>
                        <View style={styles.cinemaSpotlightLiveDot} />
                        <Text style={styles.cinemaSpotlightLiveText}>3D VİDEO</Text>
                      </View>
                      <View style={styles.cinemaSpotlightLevelPill}>
                        <Text style={styles.cinemaSpotlightLevelText}>{sc.level}</Text>
                      </View>
                    </View>

                    {/* Bottom info on cover */}
                    <View style={styles.cinemaSpotlightBottomInfo}>
                      <View style={styles.cinemaSpotlightCharRow}>
                        <Text style={styles.cinemaSpotlightCharEmoji}>{sc.emoji}</Text>
                        <Text style={styles.cinemaSpotlightCharName}>
                          {sc.aiName} • {sc.aiRole}
                        </Text>
                      </View>
                      <Text style={styles.cinemaSpotlightTitle} numberOfLines={1}>
                        {sc.title}
                      </Text>
                    </View>
                  </View>

                  {/* Bottom Action Row */}
                  <View style={styles.cinemaSpotlightCtaRow}>
                    <View style={styles.cinemaSpotlightStepChip}>
                      <Ionicons name="film-outline" size={13} color={colors.textMuted} />
                      <Text style={styles.cinemaSpotlightStepText}>{stepCount} Sahne</Text>
                    </View>

                    <View style={styles.cinemaSpotlightStartBtn}>
                      <Text style={styles.cinemaSpotlightStartBtnText}>Sahneye Gir</Text>
                      <Ionicons name="arrow-forward" size={12} color="#FFFFFF" />
                    </View>
                  </View>
                </BouncyPressable>
              );
            })}
          </ScrollView>
        </View>

        {/* 5. GÜNÜN SESLİ ROL ÖNERİSİ (Recommended AI Voice Roleplay) */}
        {recommended && (
          <View style={[styles.section, { marginTop: spacing.md }]}>
            <View style={styles.sectionHeaderRow}>
              <View>
                <Text style={styles.sectionSubTitle}>SESLİ DİYALOG KOÇU</Text>
                <Text style={styles.sectionMainTitle}>
                  {personaObj ? `${personaObj.title} İçin Önerilen` : 'Sesli Pratik Önerisi'}
                </Text>
              </View>
            </View>

            <View style={[styles.recommendedCard, shadow.card]}>
              <View style={styles.recommendedCoverWrapper}>
                <Image
                  source={scenarioCategoryImages[recommended.category] ?? companionImage}
                  style={styles.recommendedCoverImage}
                  resizeMode="cover"
                />
                <LinearGradient
                  colors={['rgba(15,23,42,0)', 'rgba(15,23,42,0.65)']}
                  style={styles.recommendedCoverOverlay}
                />
                <View style={styles.recommendedTopBadgeRow}>
                  <View style={styles.cefrLevelTag}>
                    <Text style={styles.cefrLevelTagText}>{recommended.cefr_level ?? 'A2'}</Text>
                  </View>
                  <View style={styles.durationTag}>
                    <Ionicons name="time-outline" size={11} color="#FFFFFF" />
                    <Text style={styles.durationTagText}>{recommended.estimated_minutes} Dk</Text>
                  </View>
                </View>
                <Text style={styles.recommendedCoverTitle} numberOfLines={1}>
                  {recommended.title}
                </Text>
              </View>

              <View style={styles.recommendedBody}>
                <Text style={styles.recommendedDesc} numberOfLines={2}>
                  {recommended.description}
                </Text>

                <BouncyPressable
                  onPress={() =>
                    navigation.navigate('LiveConversationRoom', {
                      scenarioId: recommended.id,
                      scenarioSlug: recommended.slug,
                      scenarioTitle: recommended.title,
                    })
                  }
                  style={styles.chunkyBtnWrapper}
                  hapticType="medium"
                  scaleTo={0.96}
                >
                  <LinearGradient
                    colors={gradients.airyIndigo}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.recommendedCtaBtn}
                  >
                    <Ionicons name="mic" size={15} color="#FFFFFF" />
                    <Text style={styles.recommendedCtaBtnText}>Sesli Başlat</Text>
                  </LinearGradient>
                </BouncyPressable>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {toast ? <Toast message={toast} /> : null}

      {/* 3D Interactive Video Scenario Modal */}
      <InteractiveVideoScenarioModal
        visible={!!selectedVideoScenario}
        scenario={selectedVideoScenario}
        onClose={() => setSelectedVideoScenario(null)}
        onComplete={(earnedXp) => {
          showToast(`🏆 Harika! 3D senaryoyu tamamladın (+${earnedXp} XP)`);
          setSelectedVideoScenario(null);
        }}
      />

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
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
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
  headerLevelPill: {
    backgroundColor: '#EEF2FF',
    borderColor: '#C7D2FE',
    gap: 4,
  },
  headerLevelEmoji: {
    fontSize: 11,
  },
  headerLevelText: {
    fontFamily: fonts.mono,
    fontSize: 11,
    fontWeight: '700',
    color: '#4338CA',
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

  /* 2. Bugün Hero */
  heroCard: {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    borderRadius: 26,
    padding: 20,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    marginBottom: spacing.lg,
  },
  heroGlowBlob: {
    position: 'absolute',
    top: -60,
    right: -60,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(79, 70, 229, 0.10)',
  },
  heroTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  streakPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radii.pill,
    borderWidth: 1.5,
    borderColor: '#C7D2FE',
    gap: 6,
    shadowColor: colors.brand,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2,
  },
  streakPillText: {
    fontFamily: fonts.headingBold,
    fontSize: 12.5,
    color: colors.brand,
  },
  weekDotsRow: {
    flexDirection: 'row',
    gap: 5,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  weekDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekDotCompleted: {
    backgroundColor: colors.brand,
    borderWidth: 1,
    borderColor: '#C7D2FE',
    shadowColor: colors.brand,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 2,
    elevation: 1,
  },
  weekDotToday: {
    backgroundColor: colors.brand,
    transform: [{ scale: 1.25 }],
    borderWidth: 1.5,
    borderColor: '#C7D2FE',
  },
  weekDotInnerGlow: {
    width: 2.5,
    height: 2.5,
    borderRadius: 1.25,
    backgroundColor: '#EEF2FF',
  },
  /* Daily Goal Progress inside Hero */
  dailyGoalBarWrap: {
    backgroundColor: '#EEF2FF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#C7D2FE',
    paddingHorizontal: 12,
    paddingVertical: 9,
    marginBottom: 16,
  },
  dailyGoalBarTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  dailyGoalLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  dailyGoalBarLabel: {
    fontFamily: fonts.headingBold,
    fontSize: 11,
    color: '#3730A3',
  },
  dailyGoalBarPercent: {
    fontFamily: fonts.mono,
    fontSize: 11,
    fontWeight: '800',
    color: colors.brand,
  },
  dailyGoalBarMinutes: {
    fontFamily: fonts.mono,
    fontSize: 10.5,
    fontWeight: '700',
    color: '#4338CA',
  },
  dailyGoalTrack: {
    height: 7,
    borderRadius: radii.pill,
    backgroundColor: '#E0E7FF',
    overflow: 'hidden',
  },
  dailyGoalFill: {
    height: '100%',
    borderRadius: radii.pill,
    backgroundColor: colors.brand,
  },
  dailyGoalFillComplete: {
    backgroundColor: '#10B981',
  },

  mascotWithAuraWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mascotAuraGlow: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(99, 102, 241, 0.18)',
    bottom: -4,
  },
  heroMissionRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 18,
  },
  heroMissionTextCol: {
    flex: 1,
    paddingRight: 8,
  },
  heroMissionTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 16,
    color: colors.textHeading,
    lineHeight: 21,
    marginBottom: 5,
  },
  heroMascotImg: {
    width: 106,
    height: 124,
    marginBottom: -6,
  },

  /* Shared "chunky 3D" CTA language — gradient fill + darker bottom border +
     colored glow, same depth recipe as Scenarios' stepping-stone path. */
  chunkyBtnWrapper: {
    borderRadius: radii.lg,
    shadowColor: colors.brand,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  chunkyPrimaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 4,
    borderBottomColor: '#3730A3',
    borderRadius: radii.lg,
    paddingVertical: 15,
    gap: 8,
  },
  chunkyPrimaryBtnText: {
    fontFamily: fonts.headingBold,
    fontSize: 15,
    color: '#FFFFFF',
  },
  dailyPlanBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.pill,
    alignSelf: 'flex-start',
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  dailyPlanBadgeText: {
    fontFamily: fonts.headingBold,
    fontSize: 10.5,
    color: colors.brand,
    letterSpacing: 0.4,
  },
  stationMissionCard: {
    marginTop: 4,
  },
  stationProgressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 2,
  },
  stationProgressLabel: {
    fontFamily: fonts.headingBold,
    fontSize: 12,
    color: colors.textHeading,
  },
  stationProgressPill: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  stationProgressPillMastered: {
    backgroundColor: '#ECFDF5',
    borderColor: '#A7F3D0',
  },
  stationProgressPillText: {
    fontFamily: fonts.mono,
    fontSize: 11,
    fontWeight: '700',
    color: colors.textMuted,
  },
  stationProgressPillTextMastered: {
    color: '#059669',
  },
  masteredBanner: {
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    gap: 8,
  },
  masteredBannerText: {
    fontFamily: fonts.headingBold,
    fontSize: 12.5,
    color: '#065F46',
    textAlign: 'center',
  },
  masteredBtn: {
    backgroundColor: '#059669',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
  masteredBtnText: {
    fontFamily: fonts.headingBold,
    fontSize: 12,
    color: '#FFFFFF',
  },
  reinforceChatLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingVertical: 8,
    marginBottom: 4,
  },
  reinforceChatLinkText: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 12,
    color: colors.brand,
  },
  roadmapInlineLink: {
    alignItems: 'center',
    paddingVertical: 6,
  },
  roadmapInlineLinkText: {
    fontFamily: fonts.headingBold,
    fontSize: 12,
    color: colors.brand,
  },
  sandboxSection: {
    marginBottom: spacing.lg,
  },
  sandboxHeader: {
    marginBottom: 10,
  },
  sandboxTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 15,
    color: colors.textHeading,
  },
  sandboxSub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 1,
  },
  sandboxScroll: {
    gap: 10,
    paddingVertical: 4,
  },
  sandboxCard: {
    width: 140,
    borderRadius: radii.lg,
    overflow: 'hidden',
    ...shadow.sm,
  },
  sandboxCardGradient: {
    padding: spacing.md,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.8)',
    alignItems: 'flex-start',
    gap: 4,
  },
  sandboxCardEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  sandboxCardTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 13,
    color: colors.textHeading,
  },
  sandboxCardDesc: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10.5,
    color: colors.textMuted,
  },

  /* 3. Quick Links Strip */
  quickLinksScroll: {
    gap: 12,
    paddingVertical: 2,
    marginBottom: spacing.lg,
  },
  quickLinkChip: {
    position: 'relative',
    width: 94,
    alignItems: 'center',
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderBottomWidth: 3,
    gap: 8,
  },
  quickLinkIconWrap: {
    width: 54,
    height: 54,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.95)',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  quickLinkIconImage: {
    width: 44,
    height: 44,
  },
  quickLinkLabel: {
    fontFamily: fonts.headingBold,
    fontSize: 10.5,
    textAlign: 'center',
  },
  quickLinkBadge: {
    position: 'absolute',
    top: 6,
    right: 8,
    zIndex: 2,
    backgroundColor: '#EF4444',
    borderRadius: radii.pill,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  quickLinkBadgeText: {
    fontFamily: fonts.mono,
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  /* 4. 3D Canlı Sinema Spotlight & Sahneler */
  cinemaLiveBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  livePulseDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#EF4444',
  },
  cinemaSpotlightScroll: {
    gap: 14,
    paddingVertical: 4,
    paddingRight: 10,
    marginBottom: spacing.md,
  },
  cinemaSpotlightCard: {
    width: 270,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
  },
  cinemaSpotlightCoverBox: {
    position: 'relative',
    height: 155,
    width: '100%',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#0F172A',
  },
  cinemaSpotlightCoverImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  cinemaSpotlightCoverOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  cinemaSpotlightTopBadges: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 2,
  },
  cinemaSpotlightLivePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(239, 68, 68, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 3.5,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  cinemaSpotlightLiveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
  },
  cinemaSpotlightLiveText: {
    fontFamily: fonts.headingBold,
    fontSize: 9.5,
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  cinemaSpotlightLevelPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.pill,
  },
  cinemaSpotlightLevelText: {
    fontFamily: fonts.mono,
    fontSize: 9.5,
    fontWeight: '800',
    color: '#4338CA',
  },
  cinemaSpotlightBottomInfo: {
    zIndex: 2,
  },
  cinemaSpotlightCharRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  cinemaSpotlightCharEmoji: {
    fontSize: 12,
  },
  cinemaSpotlightCharName: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 11,
    color: '#E2E8F0',
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  cinemaSpotlightTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 15,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  cinemaSpotlightCtaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
  },
  cinemaSpotlightStepChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  cinemaSpotlightStepText: {
    fontFamily: fonts.mono,
    fontSize: 10.5,
    color: colors.textMuted,
    fontWeight: '600',
  },
  cinemaSpotlightStartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#4F46E5',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radii.sm,
    borderBottomWidth: 2,
    borderBottomColor: '#3730A3',
  },
  cinemaSpotlightStartBtnText: {
    fontFamily: fonts.headingBold,
    fontSize: 11,
    color: '#FFFFFF',
  },
  section: {
    marginBottom: 0,
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
    color: colors.textMuted,
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
  recommendedCard: {
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },
  recommendedCoverWrapper: {
    position: 'relative',
    height: 150,
    justifyContent: 'flex-end',
    padding: 14,
  },
  recommendedCoverImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  recommendedCoverOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  recommendedTopBadgeRow: {
    position: 'absolute',
    top: 14,
    left: 14,
    right: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cefrLevelTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: radii.pill,
  },
  cefrLevelTagText: {
    fontFamily: fonts.mono,
    fontSize: 10.5,
    fontWeight: 'bold',
    color: colors.brand,
  },
  durationTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: radii.pill,
    gap: 3,
  },
  durationTagText: {
    fontFamily: fonts.mono,
    fontSize: 10.5,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  recommendedCoverTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 19,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  recommendedBody: {
    padding: 16,
  },
  recommendedDesc: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12.5,
    color: colors.textMuted,
    lineHeight: 18,
    marginBottom: 14,
  },
  recommendedCtaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 3,
    borderBottomColor: '#3730A3',
    borderRadius: radii.md,
    paddingVertical: 12,
    gap: 6,
  },
  recommendedCtaBtnText: {
    fontFamily: fonts.headingBold,
    fontSize: 13.5,
    color: '#FFFFFF',
  },
  recommendedEmptyCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
    padding: 18,
  },
  recommendedEmptyText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12.5,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 18,
  },
  burgerPromoCard: {
    marginHorizontal: spacing.md,
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
    borderRadius: radii.xl,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: '#FED7AA',
    ...shadow.card,
  },
  burgerPromoGradient: {
    flexDirection: 'row',
    padding: spacing.md,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  burgerPromoLeft: {
    flex: 1,
    marginRight: spacing.sm,
  },
  burgerPromoBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFEDD5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: '#FDBA74',
    marginBottom: 6,
  },
  burgerPromoBadgeText: {
    fontSize: 10,
    fontFamily: fonts.headingBold,
    color: '#C2410C',
  },
  burgerPromoTitle: {
    fontSize: 15,
    fontFamily: fonts.headingBold,
    color: '#7C2D12',
    marginBottom: 2,
  },
  burgerPromoSub: {
    fontSize: 12,
    fontFamily: fonts.bodyMedium,
    color: '#9A3412',
    lineHeight: 16,
    marginBottom: 10,
  },
  burgerPromoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: '#FED7AA',
  },
  burgerPromoBtnText: {
    fontSize: 12,
    fontFamily: fonts.headingBold,
    color: '#C2410C',
  },
  burgerPromoRight: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 6,
  },
  burgerPromoEmoji: {
    fontSize: 48,
  },
});
