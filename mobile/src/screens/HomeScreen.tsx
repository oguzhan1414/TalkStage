import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Dimensions, Image, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import {
  ALL_SPEAKING_TOPIC_CODES,
  ALL_TOPIC_CODES,
  CEFR_CURRICULUM,
  type CurriculumTopic,
} from '@talkstage/shared-data/curriculumData';
import { ALL_GRAMMAR_LESSONS } from '@talkstage/shared-data/grammarLessons';
import { SCENARIOS } from '@talkstage/shared-data/scenariosData';
import { mivoHomeImages, resolveScenarioCoverSource, roadmapTaskImages, stateImages } from '../assets/images';
import { AppHeader } from '../components/AppHeader';
import { BouncyPressable } from '../components/BouncyPressable';
import { MivoAvatar } from '../components/MivoAvatar';
import { useMivoTransition } from '../components/MivoTransitionOverlay';
import { Toast } from '../components/Toast';
import { CEFR_LEVELS } from '../constants/cefr';
import { findCurriculumWord } from '../data/curriculumVocabulary';
import { PODCAST_EPISODES } from '../data/podcastData';
import { api, ApiError } from '../lib/api';
import {
  buildTaskQueueForLevel,
  isTopicFullyDone,
  isTopicLocked,
  type CurriculumTask,
} from '../lib/curriculumTasks';
import { requestBadgeSync } from '../lib/badges';
import { pullLearningFlags } from '../lib/learningFlags';
import { loadSceneStars, pickSceneOfTheDay, type SceneStars } from '../lib/sceneProgress';
import type { MainTabScreenProps } from '../navigation/types';
import { cefrThemes, colors, fonts, gradients, radii, shadow, spacing } from '../theme/tokens';
import type { ProfileOut, ProgressOut, ReadingPassageOut, VocabCardOut } from '../types/api';
import { MivoLoader } from '../components/MivoLoader';
import { t } from '../i18n';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BANNER_WIDTH = SCREEN_WIDTH - spacing.md * 2;

const NODE = 68;
const ROW_H = 112;
const PATH_W = SCREEN_WIDTH - spacing.md * 2;
// Düğümlerin yatay sapması (px) — yol sağa-sola kıvrılarak ilerler.
const X_OFFSETS = [0, 62, 88, 62, 0, -62, -88, -62];

const UNIT_GRADIENTS: readonly (readonly [string, string])[] = [
  ['#4F46E5', '#7C3AED'],
  ['#0EA5E9', '#2563EB'],
  ['#10B981', '#0D9488'],
  ['#F59E0B', '#EA580C'],
  ['#EC4899', '#E11D48'],
];

const TASK_COLORS: Record<
  CurriculumTask['type'],
  { main: string; dark: string; soft: string; label: string }
> = {
  lesson: { main: '#6366F1', dark: '#4338CA', soft: '#EEF2FF', label: t("Konu Anlatımı") },
  vocab: { main: '#F59E0B', dark: '#B45309', soft: '#FEF3C7', label: t("Kelime") },
  listening: { main: '#0EA5E9', dark: '#0369A1', soft: '#E0F2FE', label: t("Dinleme") },
  reading: { main: '#10B981', dark: '#047857', soft: '#D1FAE5', label: t("Okuma") },
  practice: { main: '#F43F5E', dark: '#BE123C', soft: '#FFE4E6', label: t("Konuşma") },
};

type PathNodeProps = {
  left: number;
  top: number;
  palette: { main: string; dark: string; soft: string };
  image: ImageSourcePropType;
  label: string;
  done: boolean;
  current: boolean;
  locked: boolean;
  onPress: () => void;
};

/** Yoldaki tek bir ders düğümü — "chunky 3D" yuvarlak buton; sıradaki ders
 * nabız atan bir halka ve "BAŞLA" balonuyla öne çıkar. */
const PathNode = forwardRef<View, PathNodeProps>(function PathNode(
  { left, top, palette, image, label, done, current, locked, onPress },
  ref
) {
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!current) return;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 900, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 900, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [current, pulse]);

  const haloScale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.28] });
  const haloOpacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.35, 0] });

  const bg = locked ? '#F1F5F9' : done ? '#ECFDF5' : current ? palette.soft : '#FFFFFF';
  const edge = locked ? '#E2E8F0' : done ? '#A7F3D0' : current ? palette.main : palette.soft;

  return (
    <View ref={ref} collapsable={false} style={{ position: 'absolute', left, top, width: NODE, height: NODE }}>
      {current && (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.nodeHalo,
            { backgroundColor: palette.main, opacity: haloOpacity, transform: [{ scale: haloScale }] },
          ]}
        />
      )}
      {current && (
        <View style={styles.startBubble} pointerEvents="none">
          <Text style={styles.startBubbleText}>{t("BAŞLA")}</Text>
          <View style={styles.startBubbleArrow} />
        </View>
      )}
      <BouncyPressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityState={{ disabled: locked, selected: current }}
        hapticType={locked ? 'light' : 'medium'}
        scaleTo={0.92}
        style={[
          styles.node,
          {
            backgroundColor: bg,
            borderColor: edge,
            borderWidth: 2,
            borderBottomWidth: 4,
          },
        ]}
      >
        <Image
          source={image}
          style={[styles.nodeImage, locked && styles.nodeImageLocked]}
          resizeMode="contain"
          accessible={false}
        />
        {(locked || done) && (
          <View
            pointerEvents="none"
            style={[styles.nodeStatusBadge, { backgroundColor: locked ? '#E2E8F0' : '#10B981' }]}
          >
            <Ionicons
              name={locked ? 'lock-closed' : 'checkmark'}
              size={locked ? 11 : 14}
              color={locked ? '#64748B' : '#FFFFFF'}
            />
          </View>
        )}
      </BouncyPressable>
    </View>
  );
});

function toDateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function getTimeGreeting(): { greeting: string; subtitle: string } {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) {
    return { greeting: t("GÜNAYDIN"), subtitle: t("Sabah kahvesiyle hızlı bir ders yapalım mı?") };
  } else if (hour >= 12 && hour < 17) {
    return { greeting: t("TÜNAYDIN"), subtitle: t("Öğle molasında hızlı bir pratik yapalım!") };
  } else if (hour >= 17 && hour < 22) {
    return { greeting: t("İYİ AKŞAMLAR"), subtitle: t("Günü kapatmadan önce serini koru!") };
  }
  return { greeting: t("İYİ GECELER"), subtitle: t("Uyumadan önce hızlı bir ders yapalım.") };
}

export function HomeScreen({ navigation }: MainTabScreenProps<'Home'>) {
  const { transitionTo } = useMivoTransition();

  const { data: profile, isLoading: isProfileLoading } = useQuery({
    queryKey: ['me'],
    queryFn: () => api.get<ProfileOut>('/me'),
  });
  const { data: progress } = useQuery({
    queryKey: ['progress'],
    queryFn: () => api.get<ProgressOut[]>('/progress'),
  });
  const queryClient = useQueryClient();

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

  const currentLevel = profile?.cefr_level ?? 'A1';
  const streak = profile?.streak_count ?? 1;

  // Daily practice calculation
  const todayKey = toDateKey(new Date());
  const todayProgress = (progress ?? []).find((p) => p.practice_date === todayKey);
  const todayMinutes = todayProgress?.minutes_practiced ?? 0;
  const dailyTargetMinutes = profile?.daily_target_minutes ?? 15;
  const dailyProgressPct = Math.min(
    100,
    Math.round((todayMinutes / Math.max(1, dailyTargetMinutes)) * 100)
  );

  const [toast, setToast] = useState<string | null>(null);
  const [activeBanner, setActiveBanner] = useState(0);

  // Systematic learning roadmap flags — same signals Profil reads, see
  // curriculumTasks.ts for why this is the single shared calculation.
  const [chatCompletedCodes, setChatCompletedCodes] = useState<Set<string>>(new Set());
  const [lessonQuizDoneCodes, setLessonQuizDoneCodes] = useState<Set<string>>(new Set());
  const [completedPodcastEpisodeIds, setCompletedPodcastEpisodeIds] = useState<Set<string>>(new Set());
  const [sceneStars, setSceneStars] = useState<SceneStars>({});
  const readySceneList = useMemo(
    () => SCENARIOS.filter((sc) => sc.videoSteps && sc.videoSteps.length > 0 && sc.videoReady),
    []
  );
  // "Günün Sahnesi": Sahneler sekmesindeki "Senin için sıradaki" ile aynı seçim.
  const sceneOfTheDay = useMemo(
    () => pickSceneOfTheDay(readySceneList, currentLevel, sceneStars),
    [readySceneList, currentLevel, sceneStars]
  );

  // Which level's chapters the full path below is showing — independent from
  // `currentLevel` (the user's real placement, used for the "next task"
  // banner above) so the user can browse/review other levels without that
  // changing what the banner spotlights. Defaults to the real placement once
  // the profile loads (see the effect below), same pattern the old separate
  // Roadmap screen used before its content moved onto this page.
  const [selectedLevel, setSelectedLevel] = useState<string>('A1');
  const [selectedTopicModal, setSelectedTopicModal] = useState<CurriculumTopic | null>(null);

  // Auto-scroll to the current stepping stone so a level with many topics
  // doesn't force the user to hunt for where they left off every time they
  // open the app — ported from the old Roadmap screen's own version.
  const scrollViewRef = useRef<ScrollView>(null);
  const currentStoneRef = useRef<View>(null);
  const pathSectionRef = useRef<View>(null);
  const hasAutoScrolledRef = useRef(false);

  const didInitLevelRef = useRef(false);
  useEffect(() => {
    if (didInitLevelRef.current || !profile) return;
    didInitLevelRef.current = true;
    setSelectedLevel(profile.cefr_level ?? 'A1');
  }, [profile]);

  const reloadStationFlags = useCallback(() => {
    requestBadgeSync();
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
      loadSceneStars(readySceneList.map((sc) => sc.id)).then(setSceneStars);
      AsyncStorage.multiGet(PODCAST_EPISODES.map((ep) => `podcast_completed_${ep.id}`)).then((pairs) => {
        setCompletedPodcastEpisodeIds(
          new Set(pairs.filter(([, v]) => v === '1').map(([k]) => k.replace('podcast_completed_', '')))
        );
      });
    });
  }, [readySceneList]);

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
  // Function form (not a single memoized array) because the chapter path
  // below needs this for whichever level is selected, and the lock helpers
  // need it for arbitrary other levels too — same shape the old Roadmap
  // screen used.
  const readingPassagesForLevel = useCallback(
    (lvl: string) =>
      (readingPassages ?? [])
        .filter((p) => (p.cefr_level ?? 'A1') === lvl)
        .sort((a, b) => a.sort_order - b.sort_order)
        .map((p) => ({ slug: p.slug, title: p.title })),
    [readingPassages]
  );

  const currentCurriculum = CEFR_CURRICULUM[currentLevel] ?? CEFR_CURRICULUM.A1;

  // The one shared task-queue calculation Profil also uses — Home's banner
  // spotlights the next actionable task regardless of which level the chapter
  // path below happens to be browsing (see curriculumTasks.ts).
  const taskQueue = useMemo(
    () =>
      buildTaskQueueForLevel(currentCurriculum.topics, {
        savedWordsLower: savedWordsSet,
        lessonQuizDoneCodes,
        chatCompletedTopicCodes: chatCompletedCodes,
        completedPodcastEpisodeIds,
        readingPassagesForLevel: readingPassagesForLevel(currentLevel),
        completedReadingSlugs: completedReadingSlugSet,
      }),
    [
      currentCurriculum.topics,
      currentLevel,
      savedWordsSet,
      chatCompletedCodes,
      readingPassagesForLevel,
      completedReadingSlugSet,
      lessonQuizDoneCodes,
      completedPodcastEpisodeIds,
    ]
  );
  const firstIncompleteIdx = useMemo(() => taskQueue.findIndex((t) => !t.done), [taskQueue]);
  const nextTask: CurriculumTask | undefined =
    firstIncompleteIdx === -1 ? undefined : taskQueue[firstIncompleteIdx];
  const isLevelFullyDone = taskQueue.length > 0 && !nextTask;

  // ---- Full chapter path (browsable, independent of currentLevel above) ----
  const selectedCurriculum = CEFR_CURRICULUM[selectedLevel] ?? CEFR_CURRICULUM.A1;

  const selectedTaskQueue = useMemo(
    () =>
      buildTaskQueueForLevel(selectedCurriculum.topics, {
        savedWordsLower: savedWordsSet,
        lessonQuizDoneCodes,
        chatCompletedTopicCodes: chatCompletedCodes,
        completedPodcastEpisodeIds,
        readingPassagesForLevel: readingPassagesForLevel(selectedLevel),
        completedReadingSlugs: completedReadingSlugSet,
      }),
    [
      selectedCurriculum.topics,
      selectedLevel,
      savedWordsSet,
      chatCompletedCodes,
      readingPassagesForLevel,
      completedReadingSlugSet,
      lessonQuizDoneCodes,
      completedPodcastEpisodeIds,
    ]
  );
  const practicedTopicsCount = useMemo(
    () => selectedCurriculum.topics.filter((t) => isTopicFullyDone(selectedTaskQueue, t.code)).length,
    [selectedCurriculum.topics, selectedTaskQueue]
  );

  const isLevelFullyComplete = useCallback(
    (lvl: string): boolean => {
      const topics = CEFR_CURRICULUM[lvl]?.topics ?? [];
      if (topics.length === 0) return false;
      const queue = buildTaskQueueForLevel(topics, {
        savedWordsLower: savedWordsSet,
        lessonQuizDoneCodes,
        chatCompletedTopicCodes: chatCompletedCodes,
        completedPodcastEpisodeIds,
        readingPassagesForLevel: readingPassagesForLevel(lvl),
        completedReadingSlugs: completedReadingSlugSet,
      });
      return queue.every((t) => t.done);
    },
    [
      savedWordsSet,
      lessonQuizDoneCodes,
      chatCompletedCodes,
      completedPodcastEpisodeIds,
      readingPassagesForLevel,
      completedReadingSlugSet,
    ]
  );

  const userLevelIdx = Math.max(0, CEFR_LEVELS.indexOf(currentLevel));
  const isLevelLocked = useCallback(
    (lvl: string): boolean => {
      const idx = CEFR_LEVELS.indexOf(lvl);
      if (idx <= userLevelIdx) return false;
      return !isLevelFullyComplete(CEFR_LEVELS[idx - 1]);
    },
    [userLevelIdx, isLevelFullyComplete]
  );

  const bonusLessons = useMemo(
    () =>
      ALL_GRAMMAR_LESSONS.filter(
        (l) => l.code.startsWith(`${selectedLevel}_`) && !selectedCurriculum.topics.some((t) => t.code === l.code)
      ),
    [selectedLevel, selectedCurriculum.topics]
  );

  // Shared scroll-to-node helper, used both for the one-time auto-scroll to
  // the current stone on load and for the "level complete" banner's tap.
  const scrollToNode = useCallback((node: View | null) => {
    const scroll = scrollViewRef.current;
    if (!node || !scroll) return;
    const targetNative = (scroll as any).getNativeScrollRef?.() || (scroll as any).getInnerViewRef?.();
    if (targetNative && typeof node.measureLayout === 'function') {
      try {
        node.measureLayout(
          targetNative,
          (_x: number, y: number) => {
            scroll.scrollTo({ y: Math.max(0, y - 140), animated: true });
          },
          () => {}
        );
        return;
      } catch {
        // Fall through to measureInWindow
      }
    }
    const scrollAny = scroll as any;
    if (typeof node.measureInWindow === 'function' && typeof scrollAny.measureInWindow === 'function') {
      node.measureInWindow((_sx: number, sy: number) => {
        scrollAny.measureInWindow((_rx: number, ry: number) => {
          const relY = sy - ry;
          if (relY > 0) scroll.scrollTo({ y: Math.max(0, relY - 140), animated: true });
        });
      });
    }
  }, []);

  // Reset the auto-scroll guard whenever the browsed level changes so
  // switching levels scrolls to THAT level's current stone next time.
  useEffect(() => {
    hasAutoScrolledRef.current = false;
  }, [selectedLevel]);

  useEffect(() => {
    if (hasAutoScrolledRef.current) return;
    if (!profile || !allVocabCards) return;
    const timer = setTimeout(() => {
      if (currentStoneRef.current) {
        scrollToNode(currentStoneRef.current);
        hasAutoScrolledRef.current = true;
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [selectedLevel, practicedTopicsCount, profile, allVocabCards, scrollToNode]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1800);
  };

  const handleAddTopicWords = async (topic: CurriculumTopic, levelLabel: string) => {
    const missing = topic.targetWords.filter((w) => !savedWordsSet.has(w.trim().toLowerCase()));
    if (missing.length === 0) {
      showToast(t("Kelimeler zaten sandığında ✓"));
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
            source_label: t("{{code}} · {{levelLabel}} Müfredatı", { code: topic.code, levelLabel }),
          });
        })
      );
      queryClient.invalidateQueries({ queryKey: ['vocab-cards'] });
      queryClient.invalidateQueries({ queryKey: ['vocab-cards', 'all'] });
      showToast(t("{{length}} kelime sandığına eklendi! 📚", { length: missing.length }));
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : t("Kelimeler eklenirken hata oluştu."));
    }
  };

  /** `levelLabel` defaults to `currentLevel` for the banner's "next task"
   * call site; the chapter path below (which can browse any level) passes
   * `selectedLevel` explicitly so a vocab task's source label always matches
   * the level it actually belongs to. */
  const handleStartTask = (task: CurriculumTask, levelLabel: string = currentLevel) => {
    const doNav = () => {
      if (task.type === 'lesson') {
        navigation.navigate('GrammarLesson', { code: task.topic.code });
      } else if (task.type === 'vocab') {
        handleAddTopicWords(task.topic, levelLabel);
      } else if (task.type === 'listening' && task.podcastEpisode) {
        navigation.navigate('PodcastPlayer', { episodeId: task.podcastEpisode.id });
      } else if (task.type === 'reading') {
        if (task.readingSlug) navigation.navigate('ReadingPassage', { slug: task.readingSlug });
        else navigation.navigate('ReadingList');
      } else {
        navigation.navigate('TextChat', {
          focusTopic: {
            title: task.topic.title,
            formula: task.topic.formula,
            targetWords: task.topic.targetWords,
            topicCode: task.topic.code,
          },
        });
      }
    };

    if (task.type === 'vocab') {
      doNav();
    } else {
      const msg =
        task.type === 'lesson'
          ? t("Gramer Dersi Hazırlanıyor…")
          : task.type === 'listening'
          ? t("Podcast Sahnesi Açılıyor…")
          : task.type === 'reading'
          ? t("Okuma Parçaları Açılıyor…")
          : t("Mivo ile Konuşma Başlıyor…");
      transitionTo(doNav, msg);
    }
  };

  const handleStartBossChallenge = () => {
    transitionTo(() => {
      navigation.navigate('TextChat', {
        focusTopic: { title: selectedCurriculum.bossChallenge.title },
      });
    }, t("Bölüm Sonu Değerlendirmesi Başlıyor…"));
  };

  const timeGreeting = useMemo(() => getTimeGreeting(), []);

  const onBannerScrollEnd = (e: { nativeEvent: { contentOffset: { x: number } } }) => {
    setActiveBanner(Math.round(e.nativeEvent.contentOffset.x / BANNER_WIDTH));
  };

  // Matches MainTabNavigator's own floating tab bar math (bottomMargin +
  // height 68) so the FAB sits just above it, never overlapping.
  const insets = useSafeAreaInsets();
  const fabBottom = Math.max(insets.bottom, 16) + 68 + 14;

  if (isProfileLoading && !profile) {
    return (
      <SafeAreaView style={[styles.container, styles.appLoadingContainer]}>
        <MivoLoader size={160} />
        <Text style={styles.appLoadingTitle}>{t("Spekvia Açılıyor ✨")}</Text>
        <Text style={styles.appLoadingSub}>{t("Mivo senin için öğrenme yolunu hazırlıyor…")}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />

      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ======================================================== */}
        {/* 2. BANNER CAROUSEL — Bugünün görevi + günlük hedef       */}
        {/* ======================================================== */}
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={onBannerScrollEnd}
          style={styles.bannerScroll}
          contentContainerStyle={{ width: BANNER_WIDTH * 2 }}
        >
          <View style={{ width: BANNER_WIDTH }}>
            {isLevelFullyDone ? (
              <BouncyPressable
                onPress={() => {
                  const nextLvl = CEFR_LEVELS[CEFR_LEVELS.indexOf(currentLevel) + 1];
                  if (nextLvl) setSelectedLevel(nextLvl);
                  scrollToNode(pathSectionRef.current);
                }}
                style={styles.bannerTouchable}
                hapticType="success"
              >
                <LinearGradient colors={['#059669', '#10B981']} style={styles.bannerCard}>
                  <Image source={stateImages.goalCelebration} style={styles.bannerMascot} resizeMode="contain" />
                  <View style={styles.bannerTextCol}>
                    <Text style={styles.bannerEyebrow}>{t("{{currentLevel}} TAMAMLANDI 🏆", { currentLevel })}</Text>
                    <Text style={styles.bannerTitle}>{t("Seviyeni Bitirdin!")}</Text>
                    <Text style={styles.bannerSub}>{t("Öğrenme yolunu görmek için dokun")}</Text>
                  </View>
                </LinearGradient>
              </BouncyPressable>
            ) : nextTask ? (
              <BouncyPressable
                onPress={() => handleStartTask(nextTask)}
                style={styles.bannerTouchable}
                hapticType="medium"
              >
                <LinearGradient
                  colors={gradients.airyIndigo}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.bannerCard}
                >
                  <View style={styles.bannerDecoA} />
                  <View style={styles.bannerDecoB} />
                  <MivoAvatar state="idle" size={92} showGlow={false} style={{ marginRight: 4 }} />
                  <View style={styles.bannerTextCol}>
                    <Text style={styles.bannerEyebrow}>
                      {currentLevel} · {nextTask.topic.code}
                    </Text>
                    <Text style={styles.bannerTitle} numberOfLines={2}>
                      {nextTask.title}
                    </Text>
                    <Text style={styles.bannerSub} numberOfLines={1}>
                      {timeGreeting.subtitle}
                    </Text>
                    <View style={styles.bannerCtaRow}>
                      <View style={styles.bannerCta}>
                        <Text style={styles.bannerCtaText}>{t("HEMEN BAŞLA")}</Text>
                        <Ionicons name="arrow-forward" size={13} color={colors.brand} />
                      </View>
                      <View style={styles.bannerGoalChip}>
                        <Ionicons name="time-outline" size={12} color="#FFFFFF" />
                        <Text style={styles.bannerGoalChipText}>%{dailyProgressPct}</Text>
                      </View>
                    </View>
                  </View>
                </LinearGradient>
              </BouncyPressable>
            ) : null}
          </View>

          <View style={{ width: BANNER_WIDTH }}>
            <BouncyPressable
              onPress={() => navigation.navigate('Profile')}
              style={styles.bannerTouchable}
              hapticType="light"
            >
              <LinearGradient colors={['#D97706', '#F59E0B']} style={styles.bannerCard}>
                <View style={styles.bannerGoalRing}>
                  <Text style={styles.bannerGoalRingText}>%{dailyProgressPct}</Text>
                </View>
                <View style={styles.bannerTextCol}>
                  <Text style={styles.bannerEyebrow}>{t("GÜNÜN HEDEFİ")}</Text>
                  <Text style={styles.bannerTitle}>{t("{{todayMinutes}}/{{dailyTargetMinutes}} dakika", { todayMinutes, dailyTargetMinutes })}</Text>
                  <Text style={styles.bannerSub}>{t("İlerlemeni görmek için dokun")}</Text>
                </View>
              </LinearGradient>
            </BouncyPressable>
          </View>
        </ScrollView>

        <View style={styles.bannerDotsRow}>
          {[0, 1].map((i) => (
            <View key={i} style={[styles.bannerDot, activeBanner === i && styles.bannerDotActive]} />
          ))}
        </View>

        {/* Günün Sahnesi — Bugün'ün omurgası: sahne tamamlamak günlük hedefe sayılır */}
        {sceneOfTheDay ? (
          <BouncyPressable
            onPress={() => navigation.navigate('Scenarios', { openSceneId: sceneOfTheDay.id })}
            style={[styles.sceneDayCard, shadow.card]}
            hapticType="light"
          >
            <Image source={resolveScenarioCoverSource(sceneOfTheDay)} style={styles.sceneDayCover} resizeMode="cover" />
            <View style={styles.sceneDayBody}>
              <Text style={styles.sceneDayEyebrow}>{t("GÜNÜN SAHNESİ")}</Text>
              <Text style={styles.sceneDayTitle} numberOfLines={1}>
                {sceneOfTheDay.titleTr}
              </Text>
              <Text style={styles.sceneDayMeta} numberOfLines={1}>
                {sceneOfTheDay.level} · {sceneOfTheDay.aiName} · {t("{{durationMin}} dk", { durationMin: sceneOfTheDay.durationMin })}
              </Text>
            </View>
            <View style={styles.sceneDayPlay}>
              <Ionicons name="play" size={16} color="#FFFFFF" style={{ marginLeft: 2 }} />
            </View>
          </BouncyPressable>
        ) : null}

        {/* ======================================================== */}
        {/* 3. ÖĞRENME YOLUN — tüm bölümler, kaydırarak keşfedilir   */}
        {/* ======================================================== */}
        <View style={styles.pathSection} ref={pathSectionRef}>
          <Text style={styles.pathSectionTitle}>{t("Ders Yolun")}</Text>

          {/* Compact level pill row — switch which level's chapters show
              below without leaving the page. */}
          <View style={styles.levelPillRow}>
            {CEFR_LEVELS.map((lvl) => {
              const isSelected = selectedLevel === lvl;
              const isUserCurrent = currentLevel === lvl;
              const locked = isLevelLocked(lvl);

              return (
                <Pressable
                  key={lvl}
                  onPress={() => {
                    if (locked) {
                      const prevLvl = CEFR_LEVELS[CEFR_LEVELS.indexOf(lvl) - 1];
                      showToast(t("🔒 {{lvl}}, {{prevLvl}} seviyesini tamamlayınca açılır", { lvl, prevLvl }));
                      return;
                    }
                    setSelectedLevel(lvl);
                  }}
                  style={[
                    styles.levelPill,
                    isSelected && styles.levelPillActive,
                    locked && styles.levelPillLocked,
                  ]}
                >
                  {locked && (
                    <Ionicons name="lock-closed" size={9} color="#94A3B8" style={styles.levelPillLockIcon} />
                  )}
                  <Text
                    style={[
                      styles.levelPillText,
                      isSelected && styles.levelPillTextActive,
                      locked && styles.levelPillTextLocked,
                    ]}
                  >
                    {lvl}
                  </Text>
                  {isUserCurrent && <View style={styles.levelPillCurrentDot} />}
                </Pressable>
              );
            })}
          </View>

          {/* Slim level header — title + one-line objective + progress bar. */}
          {(() => {
            const currentTheme = cefrThemes[selectedLevel] ?? cefrThemes.A1;
            const progressPct = Math.round(
              (practicedTopicsCount / Math.max(1, selectedCurriculum.topics.length)) * 100
            );

            return (
              <View style={styles.levelHeaderCard}>
                <View style={styles.levelHeaderTopRow}>
                  <Text style={styles.levelHeaderTitle} numberOfLines={1}>
                    {selectedLevel} · {selectedCurriculum.title}
                  </Text>
                  <Text style={[styles.levelHeaderPercent, { color: currentTheme.accentColor }]}>
                    %{progressPct}
                  </Text>
                </View>
                <Text style={styles.levelHeaderDesc} numberOfLines={1}>
                  {currentTheme.subtitle}
                </Text>
                <View style={styles.progressBarTrack}>
                  <View
                    style={[
                      styles.progressBarFill,
                      { width: `${progressPct}%`, backgroundColor: currentTheme.accentColor },
                    ]}
                  />
                </View>
              </View>
            );
          })()}

          {/* Bölümler — her bölüm renkli bir başlık + kıvrımlı bir ders yolu.
              Tüm seviye tek seferde render edilir, aşağı kaydırdıkça sıradaki
              dersler görünür. */}
          {(() => {
            const isReviewLevel = CEFR_LEVELS.indexOf(selectedLevel) < userLevelIdx;
            const firstIncompleteSelectedIdx = selectedTaskQueue.findIndex((t) => !t.done);

            return selectedCurriculum.units.map((unit, unitIdx) => {
              const unitTaskEntries = selectedTaskQueue
                .map((task, idx) => ({ task, idx }))
                .filter(({ task }) => unit.topicCodes.includes(task.topic.code));
              const unitDoneCount = unitTaskEntries.filter(({ task }) => task.done).length;
              const unitPct = Math.round((unitDoneCount / Math.max(1, unitTaskEntries.length)) * 100);
              const unitComplete = unitTaskEntries.length > 0 && unitDoneCount === unitTaskEntries.length;
              const unitGradient = UNIT_GRADIENTS[unitIdx % UNIT_GRADIENTS.length];
              const pathHeight = (unitTaskEntries.length + 1) * ROW_H;

              return (
                <View key={unit.title} style={styles.unitBlock}>
                  <LinearGradient
                    colors={unitGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={[styles.unitBanner, shadow.card]}
                  >
                    <View style={styles.unitBannerDecoA} />
                    <View style={styles.unitBannerDecoB} />
                    <View style={styles.unitBannerTopRow}>
                      <Text style={styles.unitBannerPretitle}>{t("BÖLÜM")}{" "}{unitIdx + 1}</Text>
                      <View style={styles.unitBannerCountPill}>
                        <Text style={styles.unitBannerCountText}>
                          {unitDoneCount}/{unitTaskEntries.length}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.unitBannerTitle} numberOfLines={2}>
                      {unit.title}
                    </Text>
                    <View style={styles.unitBannerTrack}>
                      <View style={[styles.unitBannerFill, { width: `${unitPct}%` }]} />
                    </View>
                  </LinearGradient>

                  <View style={{ height: pathHeight, width: PATH_W }}>
                    {unitTaskEntries.map(({ task, idx }, i) => {
                      const isLocked = isTopicLocked(
                        selectedTaskQueue,
                        selectedCurriculum.topics,
                        task.topic.code,
                        isReviewLevel
                      );
                      const isCurrent = idx === firstIncompleteSelectedIdx && !isLocked;
                      const isFirstOfTopic = i === 0 || unitTaskEntries[i - 1].task.topic.code !== task.topic.code;
                      const offset = X_OFFSETS[i % X_OFFSETS.length];
                      const nextOffset = X_OFFSETS[(i + 1) % X_OFFSETS.length];
                      const centerX = PATH_W / 2 + offset;
                      const centerY = i * ROW_H + ROW_H / 2;
                      const palette = TASK_COLORS[task.type];
                      const labelOnLeft = offset > 20;
                      const nodeLeft = centerX - NODE / 2;
                      const labelStyle = labelOnLeft
                        ? { left: 0, width: Math.max(80, nodeLeft - 12), alignItems: 'flex-end' as const }
                        : {
                            left: nodeLeft + NODE + 12,
                            width: Math.max(80, PATH_W - (nodeLeft + NODE + 12)),
                            alignItems: 'flex-start' as const,
                          };
                      const onPressTask = () => {
                        if (isLocked) {
                          showToast(t("🔒 Önceki konuyu tamamlayınca açılır"));
                          return;
                        }
                        handleStartTask(task, selectedLevel);
                      };

                      return (
                        <View key={task.id} style={StyleSheet.absoluteFill} pointerEvents="box-none">
                          {/* Bir sonraki ders düğümüne giden noktalı bağlantı */}
                          {[0.34, 0.5, 0.66].map((t) => (
                            <View
                              key={t}
                              style={[
                                styles.pathDot,
                                {
                                  left: centerX + (PATH_W / 2 + nextOffset - centerX) * t - 4,
                                  top: centerY + ROW_H * t - 4,
                                  backgroundColor: task.done ? '#34D399' : '#CBD5E1',
                                },
                              ]}
                            />
                          ))}

                          <PathNode
                            ref={isCurrent ? currentStoneRef : undefined}
                            left={nodeLeft}
                            top={centerY - NODE / 2}
                            palette={palette}
                            image={roadmapTaskImages[task.type]}
                            label={`${palette.label}: ${task.title}`}
                            done={task.done}
                            current={isCurrent}
                            locked={isLocked}
                            onPress={onPressTask}
                          />

                          <Pressable
                            onPress={onPressTask}
                            style={[styles.pathLabel, { top: centerY - 30 }, labelStyle]}
                          >
                            {isFirstOfTopic && (
                              <Pressable
                                onPress={() => setSelectedTopicModal(task.topic)}
                                hitSlop={8}
                                style={[styles.pathTopicTag, { backgroundColor: palette.soft }]}
                              >
                                <Text style={[styles.pathTopicTagText, { color: palette.dark }]} numberOfLines={1}>
                                  {task.topic.code}
                                </Text>
                                <Ionicons name="information-circle" size={12} color={palette.dark} />
                              </Pressable>
                            )}
                            <Text
                              style={[
                                styles.pathLabelKind,
                                { color: isLocked ? '#94A3B8' : palette.dark },
                              ]}
                            >
                              {palette.label.toUpperCase()}
                            </Text>
                            <Text
                              style={[styles.pathLabelTitle, isLocked && styles.pathLabelTitleLocked]}
                              numberOfLines={2}
                            >
                              {task.title}
                            </Text>
                          </Pressable>
                        </View>
                      );
                    })}

                    {/* Bölüm sonu kupası */}
                    {(() => {
                      const i = unitTaskEntries.length;
                      const centerX = PATH_W / 2 + X_OFFSETS[i % X_OFFSETS.length];
                      const centerY = i * ROW_H + ROW_H / 2;
                      return (
                        <View
                          style={[
                            styles.pathTrophy,
                            unitComplete && styles.pathTrophyDone,
                            { left: centerX - 30, top: centerY - 30 },
                          ]}
                        >
                          <Ionicons
                            name={unitComplete ? 'trophy' : 'trophy-outline'}
                            size={28}
                            color={unitComplete ? '#FFFFFF' : '#CBD5E1'}
                          />
                        </View>
                      );
                    })()}
                  </View>
                </View>
              );
            });
          })()}

          {/* Ek konu anlatımları */}
          {bonusLessons.length > 0 && (
            <View style={styles.bonusLessonsSection}>
              <View style={styles.sectionTitleRow}>
                <Ionicons name="library-outline" size={17} color={colors.brand} />
                <Text style={styles.bonusSectionTitle}>{t("Ek konu anlatımları")}</Text>
              </View>
              <View style={styles.bonusLessonsRow}>
                {bonusLessons.map((lesson) => (
                  <Pressable
                    key={lesson.code}
                    onPress={() => navigation.navigate('GrammarLesson', { code: lesson.code })}
                    style={[styles.bonusLessonCard, shadow.card]}
                  >
                    <Text style={styles.bonusLessonCode}>{lesson.code}</Text>
                    <Text style={styles.bonusLessonTitle} numberOfLines={2}>
                      {lesson.title}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          )}

          {/* 👑 BOSS CHALLENGE: Seviye Atlama Sohbeti */}
          <View style={[styles.bossChallengeCard, shadow.card]}>
            <View style={styles.bossCardHeaderRow}>
              <View style={styles.assessmentIcon}>
                <Ionicons name="ribbon-outline" size={20} color={colors.brand} />
              </View>
              <View style={styles.bossCardHeaderCol}>
                <Text style={styles.bossCardPretitle}>{t("SEVİYE DEĞERLENDİRMESİ")}</Text>
                <Text style={styles.bossCardTitle}>{selectedCurriculum.bossChallenge.title}</Text>
              </View>
            </View>

            <Text style={styles.bossCardDescription}>{selectedCurriculum.bossChallenge.description}</Text>

            <Pressable onPress={handleStartBossChallenge} style={styles.bossStartButton}>
              <Ionicons name="trophy" size={18} color="#FFFFFF" />
              <Text style={styles.bossStartButtonText}>{t("Değerlendirme sohbetine başla")}</Text>
              <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
            </Pressable>
          </View>
        </View>
      </ScrollView>

      {/* Serbest Sohbet FAB — herhangi bir konuda canlı (WS/Cartesia) sesli
          sohbet, bkz. FreeChatRoomScreen.tsx + backend's /ws/free-chat. */}
      <BouncyPressable
        onPress={() => {
          transitionTo(() => navigation.navigate('FreeChatRoom'), t("Mivo ile Sohbet Başlıyor…"));
        }}
        style={[styles.chatFab, { bottom: fabBottom }]}
        hitSlop={12}
        hapticType="medium"
        scaleTo={0.92}
      >
        <MivoAvatar state="idle" size={54} showGlow={false} interactive={false} />
      </BouncyPressable>

      {/* Konu detay modalı — "Öğrenme Yolun" içindeki bilgi ikonundan açılır. */}
      <Modal
        visible={!!selectedTopicModal}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedTopicModal(null)}
      >
        <Pressable style={styles.duoModalOverlay} onPress={() => setSelectedTopicModal(null)}>
          <Pressable style={styles.duoModalCard} onPress={(e) => e.stopPropagation()}>
            {selectedTopicModal && (
              <>
                <View style={styles.duoModalHandle} />

                <View style={styles.duoModalHeader}>
                  <View style={styles.duoModalLevelTag}>
                    <Text style={styles.duoModalLevelText}>
                      {selectedLevel} • {selectedTopicModal.code}
                    </Text>
                  </View>
                  <Pressable
                    onPress={() => setSelectedTopicModal(null)}
                    hitSlop={12}
                    style={styles.duoModalCloseBtn}
                  >
                    <Ionicons name="close" size={18} color={colors.textHeading} />
                  </Pressable>
                </View>

                <Text style={styles.duoModalTitle}>{selectedTopicModal.title}</Text>
                <Text style={styles.duoModalDesc}>{selectedTopicModal.description}</Text>

                <View style={styles.duoFormulaBox}>
                  <View style={styles.duoFormulaHeader}>
                    <Ionicons name="sparkles" size={13} color={colors.brand} />
                    <Text style={styles.duoFormulaLabel}>{t("FORMÜL / KURAL")}</Text>
                  </View>
                  <Text style={styles.duoFormulaText}>{selectedTopicModal.formula}</Text>
                </View>

                <View style={styles.duoVocabBox}>
                  <Text style={styles.duoVocabLabel}>{t("KULLANILACAK KELİMELER:")}</Text>
                  <View style={styles.duoVocabRow}>
                    {selectedTopicModal.targetWords.map((w) => (
                      <View key={w} style={styles.duoVocabChip}>
                        <Text style={styles.duoVocabChipText}>+ {w}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                <Text style={styles.duoModalFooterHint}>{t("Bu konunun görevlerini yukarıdaki yol üzerinden tek tek başlatabilirsin.")}</Text>
              </>
            )}
          </Pressable>
        </Pressable>
      </Modal>

      {toast ? <Toast message={toast} /> : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sceneDayCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: radii.lg,
    borderWidth: 1.5,
    borderColor: '#C7D2FE',
    padding: 10,
    marginBottom: spacing.lg,
  },
  sceneDayCover: { width: 56, height: 56, borderRadius: 14 },
  sceneDayBody: { flex: 1 },
  sceneDayEyebrow: {
    fontFamily: fonts.headingBold,
    fontSize: 10,
    letterSpacing: 0.6,
    color: colors.brand,
    marginBottom: 2,
  },
  sceneDayTitle: { fontFamily: fonts.headingBold, fontSize: 15, color: colors.textHeading },
  sceneDayMeta: { fontFamily: fonts.bodyRegular, fontSize: 11.5, color: colors.textMuted, marginTop: 2 },
  sceneDayPlay: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
    marginBottom: spacing.md,
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

  /* 2. Banner Carousel */
  bannerScroll: {
    marginHorizontal: -spacing.md,
  },
  bannerTouchable: {
    marginHorizontal: spacing.md,
    borderRadius: 22,
    shadowColor: colors.brand,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  bannerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 22,
    padding: 16,
    minHeight: 150,
    gap: 14,
    overflow: 'hidden',
  },
  bannerDecoA: {
    position: 'absolute',
    right: -30,
    top: -40,
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  bannerDecoB: {
    position: 'absolute',
    left: -24,
    bottom: -48,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.09)',
  },
  bannerCtaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
  },
  bannerCta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radii.pill,
    borderBottomWidth: 3,
    borderBottomColor: '#C7D2FE',
  },
  bannerCtaText: {
    fontFamily: fonts.headingBold,
    fontSize: 11,
    letterSpacing: 0.6,
    color: colors.brand,
  },
  bannerGoalChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.22)',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: radii.pill,
  },
  bannerGoalChipText: {
    fontFamily: fonts.mono,
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  bannerMascot: {
    width: 64,
    height: 64,
  },
  bannerGoalRing: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerGoalRingText: {
    fontFamily: fonts.headingBold,
    fontSize: 15,
    color: '#FFFFFF',
  },
  bannerTextCol: {
    flex: 1,
  },
  bannerEyebrow: {
    fontFamily: fonts.headingBold,
    fontSize: 10,
    color: 'rgba(255,255,255,0.85)',
    letterSpacing: 0.6,
    marginBottom: 2,
  },
  bannerTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 20,
  },
  bannerSub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11.5,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 3,
  },
  bannerDotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginTop: 10,
    marginBottom: spacing.lg,
  },
  bannerDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E2E8F0',
  },
  bannerDotActive: {
    backgroundColor: colors.brand,
    width: 16,
  },

  /* 3. Öğrenme Yolun (full chapter path, ported from the old Roadmap screen) */
  pathSection: {
    marginBottom: spacing.lg,
  },
  pathSectionTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 22,
    color: colors.textHeading,
    marginBottom: spacing.sm,
  },

  /* Level pill row — compact, text-only selector. */
  levelPillRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  levelPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexBasis: '15%',
    paddingVertical: 8,
    borderRadius: radii.pill,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: 'rgba(226, 232, 240, 0.9)',
    gap: 3,
  },
  levelPillActive: {
    borderColor: colors.brand,
    backgroundColor: colors.brand,
  },
  levelPillLocked: {
    backgroundColor: '#F8FAFC',
  },
  levelPillLockIcon: {
    marginRight: 1,
  },
  levelPillText: {
    fontFamily: fonts.headingBold,
    fontSize: 12.5,
    color: colors.textHeading,
  },
  levelPillTextActive: {
    color: '#FFFFFF',
  },
  levelPillTextLocked: {
    color: '#94A3B8',
  },
  levelPillCurrentDot: {
    position: 'absolute',
    bottom: 2,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.brand,
  },

  /* Slim level header — title + objective + progress bar. */
  levelHeaderCard: {
    marginBottom: spacing.sm,
  },
  levelHeaderTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  levelHeaderTitle: {
    flex: 1,
    fontFamily: fonts.headingBold,
    fontSize: 14,
    color: colors.textHeading,
  },
  levelHeaderPercent: {
    fontFamily: fonts.headingBold,
    fontSize: 12.5,
  },
  levelHeaderDesc: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 1,
    marginBottom: 6,
  },
  progressBarTrack: {
    height: 6,
    backgroundColor: '#F1F5F9',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },

  /* Bölüm başlığı + kıvrımlı ders yolu */
  unitBlock: {
    marginBottom: spacing.lg,
  },
  unitBanner: {
    borderRadius: 22,
    padding: spacing.md,
    overflow: 'hidden',
    marginBottom: spacing.sm,
  },
  unitBannerDecoA: {
    position: 'absolute',
    right: -28,
    top: -34,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.14)',
  },
  unitBannerDecoB: {
    position: 'absolute',
    right: 54,
    bottom: -44,
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: 'rgba(255,255,255,0.10)',
  },
  unitBannerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  unitBannerPretitle: {
    fontFamily: fonts.headingBold,
    fontSize: 11,
    letterSpacing: 1,
    color: 'rgba(255,255,255,0.85)',
  },
  unitBannerCountPill: {
    backgroundColor: 'rgba(255,255,255,0.22)',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: radii.pill,
  },
  unitBannerCountText: {
    fontFamily: fonts.mono,
    fontSize: 11.5,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  unitBannerTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 19,
    lineHeight: 24,
    color: '#FFFFFF',
    marginTop: 4,
    marginBottom: 12,
    maxWidth: '85%',
  },
  unitBannerTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.28)',
    overflow: 'hidden',
  },
  unitBannerFill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  pathDot: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  node: {
    width: NODE,
    height: NODE,
    borderRadius: NODE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  nodeHalo: {
    position: 'absolute',
    left: -2,
    top: -2,
    width: NODE + 4,
    height: NODE + 4,
    borderRadius: (NODE + 4) / 2,
  },
  nodeImage: {
    width: 58,
    height: 58,
  },
  nodeImageLocked: {
    opacity: 0.35,
  },
  nodeStatusBadge: {
    position: 'absolute',
    right: -3,
    bottom: -3,
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startBubble: {
    position: 'absolute',
    top: -34,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 5,
  },
  startBubbleText: {
    fontFamily: fonts.headingBold,
    fontSize: 11,
    letterSpacing: 0.8,
    color: colors.brand,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: radii.pill,
    borderWidth: 2,
    borderColor: '#E0E7FF',
    overflow: 'hidden',
  },
  startBubbleArrow: {
    width: 10,
    height: 10,
    backgroundColor: '#FFFFFF',
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#E0E7FF',
    transform: [{ rotate: '45deg' }],
    marginTop: -6,
  },
  pathLabel: {
    position: 'absolute',
    justifyContent: 'center',
  },
  pathTopicTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radii.pill,
    marginBottom: 4,
  },
  pathTopicTagText: {
    fontFamily: fonts.headingBold,
    fontSize: 10,
    letterSpacing: 0.3,
  },
  pathLabelKind: {
    fontFamily: fonts.headingBold,
    fontSize: 10,
    letterSpacing: 0.8,
  },
  pathLabelTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 14.5,
    lineHeight: 19,
    color: colors.textHeading,
    marginTop: 1,
  },
  pathLabelTitleLocked: {
    color: '#94A3B8',
  },
  pathTrophy: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F5F9',
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
  },
  pathTrophyDone: {
    backgroundColor: '#F59E0B',
    borderColor: '#B45309',
    borderStyle: 'solid',
  },

  /* Ek konu anlatımları */
  bonusLessonsSection: {
    marginBottom: spacing.md,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginBottom: 8,
  },
  bonusSectionTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 13,
    color: colors.textHeading,
  },
  bonusLessonsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  bonusLessonCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.md,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    width: '48%',
  },
  bonusLessonCode: {
    fontFamily: fonts.headingBold,
    fontSize: 10,
    color: colors.brand,
    marginBottom: 2,
  },
  bonusLessonTitle: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textHeading,
  },

  /* Boss Challenge */
  bossChallengeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  bossCardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 6,
  },
  assessmentIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEF2FF',
    borderWidth: 1,
    borderColor: '#E0E7FF',
  },
  bossCardHeaderCol: {
    flex: 1,
  },
  bossCardPretitle: {
    fontFamily: fonts.headingBold,
    fontSize: 10,
    color: '#D97706',
    letterSpacing: 0.5,
  },
  bossCardTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 14,
    color: colors.textHeading,
  },
  bossCardDescription: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11.5,
    color: colors.textMuted,
    lineHeight: 16,
    marginBottom: 12,
  },
  bossStartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.brand,
    paddingVertical: 13,
    borderRadius: 14,
    gap: 6,
  },
  bossStartButtonText: {
    fontFamily: fonts.headingBold,
    fontSize: 12.5,
    color: '#FFFFFF',
  },

  /* Konu detay modalı */
  duoModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    justifyContent: 'flex-end',
  },
  duoModalCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: spacing.md,
    paddingBottom: 36,
  },
  duoModalHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#CBD5E1',
    alignSelf: 'center',
    marginBottom: spacing.sm,
  },
  duoModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  duoModalLevelTag: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.pill,
  },
  duoModalLevelText: {
    fontFamily: fonts.headingBold,
    fontSize: 10.5,
    color: colors.brand,
  },
  duoModalCloseBtn: {
    padding: 4,
  },
  duoModalTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 17,
    color: colors.textHeading,
    marginBottom: 4,
  },
  duoModalDesc: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: colors.textMuted,
    lineHeight: 17,
    marginBottom: 12,
  },
  duoFormulaBox: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: radii.md,
    padding: 10,
    marginBottom: 10,
  },
  duoFormulaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 3,
  },
  duoFormulaLabel: {
    fontFamily: fonts.headingBold,
    fontSize: 9.5,
    color: colors.brand,
    letterSpacing: 0.5,
  },
  duoFormulaText: {
    fontFamily: fonts.headingBold,
    fontSize: 12,
    color: colors.textHeading,
  },
  duoVocabBox: {
    marginBottom: 14,
  },
  duoVocabLabel: {
    fontFamily: fonts.headingBold,
    fontSize: 10,
    color: colors.textMuted,
    marginBottom: 6,
  },
  duoVocabRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  duoVocabChip: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.sm,
  },
  duoVocabChipText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textHeading,
  },
  duoModalFooterHint: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 4,
  },

  /* Serbest Sohbet FAB */
  chatFab: {
    position: 'absolute',
    right: spacing.md,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#EEF2FF',
    shadowColor: colors.brand,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 12,
    zIndex: 99,
  },
  chatFabImage: {
    width: 42,
    height: 42,
  },
  appLoadingContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  appLoadingTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 20,
    color: colors.textHeading,
    marginTop: 20,
    textAlign: 'center',
  },
  appLoadingSub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 6,
    textAlign: 'center',
  },
});
