import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import { ALL_TOPIC_CODES, CEFR_CURRICULUM, type CurriculumTopic } from '@talkstage/shared-data/curriculumData';
import { SCENARIOS } from '@talkstage/shared-data/scenariosData';
import { VOICE_SCENES, voiceSceneById } from '@talkstage/shared-data/voiceScenes';
import { mivoHomeImages, stateImages } from '../assets/images';
import { topicImageFor } from '../assets/topicImages';
import { AppHeader } from '../components/AppHeader';
import { BouncyPressable } from '../components/BouncyPressable';
import { ProgressStrip, type WeekDay } from '../components/today/ProgressStrip';
import { MivoTip } from '../components/MivoTip';
import { StageRoad } from '../components/today/StageRoad';
import { taskKindLabel } from '../components/today/taskMeta';
import { TopicCompleteModal } from '../components/today/TopicCompleteModal';
import { useMivoTransition } from '../components/MivoTransitionOverlay';
import { Toast } from '../components/Toast';
import { findCurriculumWord } from '../data/curriculumVocabulary';
import { api, ApiError } from '../lib/api';
import {
  isTopicCoreDone,
  nextSuggestedTask,
  reviewIdsForTopics,
  shortTopicTitle,
  type CurriculumTask,
} from '../lib/curriculumTasks';
import { requestBadgeSync } from '../lib/badges';
import { resolveLessonCode } from '../lib/legacyGrammarCodes';
import { requestReviewAfterFirstTopic } from '../lib/storeReview';
import { isTipSeen } from '../lib/tips';
import { offerProAfterFirstLesson } from '../lib/proOffer';
import { onOpenNextStepRequest, takeOpenNextStepRequest, updateHomeWidget } from '../widget/homeWidget';
import { pullLearningFlags } from '../lib/learningFlags';
import { askForNotificationsOnce, scheduleSmartNotifications } from '../lib/notifications';
import { loadSceneStars, type SceneStars } from '../lib/sceneProgress';
import { voiceSceneRoomParams } from '../lib/voiceSceneLaunch';
import { loadCompletedWritingIds, playedSceneIds } from '../lib/planSignals';
import {
  buildStageQueue,
  earnedLevel,
  firstLevelOf,
  nextStage,
  STAGE_COLOR,
  STAGE_IDS,
  stageCurriculum,
  stageOfLevel,
  stageTitle,
  type StageId,
} from '../lib/stages';
import { useLearningPlan } from '../lib/learningPlanStore';
import { WordGoalCard } from '../components/today/WordGoalCard';
import { hasSkill } from '../lib/learningPlan';
import { haptics } from '../lib/haptics';
import { useAnalytics } from '../lib/analytics';
import type { MainTabScreenProps } from '../navigation/types';
import { colors, fonts, radii, spacing } from '../theme/tokens';
import type { GrammarMistakeOut, ProfileOut, ProgressOut, ReadingPassageOut, VocabCardOut } from '../types/api';
import { MivoLoader } from '../components/MivoLoader';
import { t } from '../i18n';

/** Her konunun "Mivo ile Konu Tekrarı" düğümünün kimliği (A1_G01_review …) — tamamlanma bayrakları için. */
const ALL_REVIEW_IDS = Object.values(CEFR_CURRICULUM).flatMap((c) => reviewIdsForTopics(c.topics));

function toDateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function HomeScreen({ navigation }: MainTabScreenProps<'Home'>) {
  const { transitionTo } = useMivoTransition();
  const analytics = useAnalytics();

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
  const currentStage = stageOfLevel(currentLevel);
  const streak = profile?.streak_count ?? 1;

  const dailyTargetMinutes = profile?.daily_target_minutes ?? 15;

  const [toast, setToast] = useState<string | null>(null);
  const [flagsReady, setFlagsReady] = useState(false);

  // Systematic learning roadmap flags — same signals Profil reads, see
  // curriculumTasks.ts for why this is the single shared calculation.
  const [chatCompletedCodes, setChatCompletedCodes] = useState<Set<string>>(new Set());
  const [lessonQuizDoneCodes, setLessonQuizDoneCodes] = useState<Set<string>>(new Set());
  const [sceneStars, setSceneStars] = useState<SceneStars>({});
  const [completedWritingIds, setCompletedWritingIds] = useState<Set<string>>(new Set());
  const { plan: learningPlan, effective: activePlan } = useLearningPlan(profile);
  const playedScenes = useMemo(() => playedSceneIds(sceneStars), [sceneStars]);
  const readySceneList = useMemo(
    () => SCENARIOS.filter((sc) => sc.videoSteps && sc.videoSteps.length > 0 && sc.videoReady),
    []
  );

  // Which level's chapters the full path below is showing — independent from
  // `currentLevel` (the user's real placement, used for the "next task"
  // banner above) so the user can browse/review other levels without that
  // changing what the banner spotlights. Defaults to the real placement once
  // the profile loads (see the effect below), same pattern the old separate
  // Roadmap screen used before its content moved onto this page.
  const [selectedStage, setSelectedStage] = useState<StageId>('baslangic');
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
    setSelectedStage(stageOfLevel(profile.cefr_level));
  }, [profile]);

  const reloadStationFlags = useCallback(() => {
    requestBadgeSync();
    pullLearningFlags().then(async () => {
      const [chatPairs, quizPairs, stars, writingIds] = await Promise.all([
        AsyncStorage.multiGet(ALL_REVIEW_IDS.map((c) => `topic_chat_completed_${c}`)),
        AsyncStorage.multiGet(ALL_TOPIC_CODES.map((c) => `lesson_quiz_done_${c}`)),
        loadSceneStars([...readySceneList.map((sc) => sc.id), ...VOICE_SCENES.map((sc) => sc.id)]),
        loadCompletedWritingIds(),
      ]);
      setChatCompletedCodes(
        new Set(chatPairs.filter(([, v]) => v === '1').map(([k]) => k.replace('topic_chat_completed_', '')))
      );
      setLessonQuizDoneCodes(
        new Set(quizPairs.filter(([, v]) => v === '1').map(([k]) => k.replace('lesson_quiz_done_', '')))
      );
      setSceneStars(stars);
      setCompletedWritingIds(writingIds);
      setFlagsReady(true);
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

  const currentCurriculum = stageCurriculum(currentStage);

  // The one shared task-queue calculation Profil also uses — Home's banner
  // spotlights the next actionable task regardless of which level the chapter
  // path below happens to be browsing (see curriculumTasks.ts).
  const taskQueue = useMemo(
    () =>
      buildStageQueue(
        currentStage,
        currentLevel,
        {
          savedWordsLower: savedWordsSet,
          lessonQuizDoneCodes,
          chatCompletedTopicCodes: chatCompletedCodes,
          completedReadingSlugs: completedReadingSlugSet,
          plan: learningPlan,
          playedSceneIds: playedScenes,
          completedWritingIds,
        },
        readingPassagesForLevel
      ),
    [
      learningPlan,
      playedScenes,
      completedWritingIds,
      currentStage,
      currentLevel,
      savedWordsSet,
      chatCompletedCodes,
      readingPassagesForLevel,
      completedReadingSlugSet,
      lessonQuizDoneCodes,
    ]
  );
  // The banner follows the core path (listening, lesson, words) and the light Mivo review; reading never holds it back.
  const nextTask: CurriculumTask | undefined = useMemo(() => nextSuggestedTask(taskQueue), [taskQueue]);
  const isLevelFullyDone = taskQueue.length > 0 && !nextTask;

  // ---- Günün kelime hedefi ----
  const localToday = new Date().toLocaleDateString('en-CA');
  const wordsAddedToday = useMemo(
    () => (allVocabCards ?? []).filter((c) => new Date(c.created_at).toLocaleDateString('en-CA') === localToday).length,
    [allVocabCards, localToday]
  );
  const wordsDue = useMemo(
    () => (allVocabCards ?? []).filter((c) => c.next_review_date && c.next_review_date <= localToday).length,
    [allVocabCards, localToday]
  );

  // Smart reminders: tell the scheduler what the user has done today and what comes next (see lib/notifications.ts).
  // Re-runs whenever the profile (streak / last practice day) or the path changes.
  useEffect(() => {
    if (!profile || !nextTask) return;
    const localToday = new Date().toLocaleDateString('en-CA');
    const todayDone = profile.last_practice_date === localToday;
    // This week so far (Monday-Sunday), for the Sunday summary.
    const now = new Date();
    const monday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - ((now.getDay() + 6) % 7));
    const mondayKey = monday.toLocaleDateString('en-CA');
    const weekRows = (progress ?? []).filter((p) => p.practice_date >= mondayKey && p.practice_date <= localToday);
    const weekMinutes = weekRows.reduce((sum, p) => sum + (p.minutes_practiced ?? 0), 0);
    const weekWords = (allVocabCards ?? []).filter((c) => {
      const day = new Date(c.created_at).toLocaleDateString('en-CA');
      return day >= mondayKey && day <= localToday;
    }).length;
    void scheduleSmartNotifications({
      name: profile.display_name?.split(' ')[0] || t("Konuşmacı"),
      streak: profile.streak_count ?? 0,
      todayDone,
      nextSummary: `${shortTopicTitle(nextTask.topic)} · ${taskKindLabel(nextTask.type)}`,
      nextKind: nextTask.type,
      nextTitle: nextTask.title,
      topicTitle: shortTopicTitle(nextTask.topic),
      wordsDue,
      // Every finished activity logs 5 practice minutes (backend DAILY_TASK_MINUTES).
      week: { days: weekRows.filter((p) => (p.minutes_practiced ?? 0) > 0).length, activities: Math.round(weekMinutes / 5), words: weekWords },
    });
    if (todayDone) void askForNotificationsOnce();
    // Android home-screen widget: the streak counter and today's state.
    void updateHomeWidget({
      streak: profile.streak_count ?? 0,
      todayDone,
      savedOn: localToday,
      streakLabel: t("gün serisi"),
      startLabel: t("Seriyi başlat"),
      doneLabel: t("Bugün ✓"),
    });
  }, [profile, nextTask, taskQueue, progress, allVocabCards, wordsDue]);

  // ---- Full chapter path (browsable, independent of currentLevel above) ----
  const selectedCurriculum = stageCurriculum(selectedStage);

  const selectedTaskQueue = useMemo(
    () =>
      buildStageQueue(
        selectedStage,
        currentLevel,
        {
          savedWordsLower: savedWordsSet,
          lessonQuizDoneCodes,
          chatCompletedTopicCodes: chatCompletedCodes,
          completedReadingSlugs: completedReadingSlugSet,
          plan: learningPlan,
          playedSceneIds: playedScenes,
          completedWritingIds,
        },
        readingPassagesForLevel
      ),
    [
      learningPlan,
      playedScenes,
      completedWritingIds,
      selectedStage,
      currentLevel,
      savedWordsSet,
      chatCompletedCodes,
      readingPassagesForLevel,
      completedReadingSlugSet,
      lessonQuizDoneCodes,
    ]
  );
  const practicedTopicsCount = useMemo(
    () => selectedCurriculum.topics.filter((t) => isTopicCoreDone(selectedTaskQueue, t.code)).length,
    [selectedCurriculum.topics, selectedTaskQueue]
  );

  const userStageIdx = STAGE_IDS.indexOf(currentStage);

  // Silent step inside a stage: when the current level's topics are done, the profile moves to the next
  // level of the same stage without any prompt. Waits until the readings are loaded, otherwise a level
  // without its readings would look finished. Moving to the next stage stays the learner's choice.
  const levelStepSentRef = useRef<string | null>(null);
  useEffect(() => {
    if (!profile || !readingPassages || !completedReadingSlugs || taskQueue.length === 0) return;
    const earned = earnedLevel(currentLevel, taskQueue);
    if (earned === currentLevel || levelStepSentRef.current === earned) return;
    levelStepSentRef.current = earned;
    api
      .patch<ProfileOut>('/me', { cefr_level: earned })
      .then((updated) => queryClient.setQueryData(['me'], updated))
      .catch(() => {
        levelStepSentRef.current = null;
      });
  }, [profile, readingPassages, completedReadingSlugs, taskQueue, currentLevel, queryClient]);

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
  }, [selectedStage]);

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
  }, [selectedStage, practicedTopicsCount, profile, allVocabCards, scrollToNode]);

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

  /** `levelLabel` defaults to the task's own CEFR level (the topic code prefix), so a vocab task's
   * source label always matches the level it belongs to. */
  const handleStartTask = (task: CurriculumTask, levelLabel: string = task.topic.code.split('_')[0]) => {
    analytics.track('path_task_started', {
      type: task.type,
      plan_preset: learningPlan?.preset ?? 'none',
      level: levelLabel,
    });
    const doNav = () => {
      if (task.type === 'lesson') {
        navigation.navigate('GrammarLesson', { code: task.topic.code });
      } else if (task.type === 'vocab') {
        handleAddTopicWords(task.topic, levelLabel);
      } else if (task.type === 'reading') {
        if (task.readingSlug) navigation.navigate('ReadingPassage', { slug: task.readingSlug });
        else navigation.navigate('ReadingList');
      } else if (task.type === 'scene' && task.sceneId) {
        const voiceScene = voiceSceneById(task.sceneId);
        if (voiceScene) {
          void voiceSceneRoomParams(voiceScene).then((params) => navigation.navigate('FreeChatRoom', params));
        } else {
          navigation.navigate('Scenarios', { openSceneId: task.sceneId });
        }
      } else if (task.type === 'writing' && task.writingTaskId) {
        navigation.navigate('WritingTask', { taskId: task.writingTaskId });
      } else if (task.type === 'review') {
        navigation.navigate('FreeChatRoom', {
          reviewId: task.id,
          reviewTopics: (task.reviewTopics ?? []).map((tp) => ({
            code: tp.code,
            title: tp.title,
            formula: tp.formula,
            targetWords: tp.targetWords,
          })),
        });
      }
    };

    if (task.type === 'vocab') {
      doNav();
    } else {
      const msg =
        task.type === 'lesson'
          ? t("Gramer Dersi Hazırlanıyor…")
          : task.type === 'reading'
          ? t("Okuma Parçaları Açılıyor…")
          : task.type === 'scene'
          ? t("Sahne Hazırlanıyor…")
          : task.type === 'writing'
          ? t("Yazma Görevi Açılıyor…")
          : t("Mivo ile Konu Tekrarı Başlıyor…");
      transitionTo(doNav, msg);
    }
  };

  // Pro offer once, after the first finished step (it used to sit inside onboarding, before any value was seen).
  // Counted only once the readings are in, so a late-loading path never looks like a fresh completion.
  const doneCountRef = useRef<number | null>(null);
  useEffect(() => {
    if (!flagsReady || !readingPassages || !completedReadingSlugs) return;
    const done = taskQueue.filter((tk) => tk.done).length;
    const prev = doneCountRef.current;
    doneCountRef.current = done;
    if (prev === 0 && done >= 1) void offerProAfterFirstLesson(() => navigation.navigate('Paywall'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flagsReady, readingPassages, completedReadingSlugs, taskQueue]);

  // One-time Mivo tips: the road after the first finished step; the chat button on a later visit (never both at once).
  const hasFinishedStep = flagsReady && taskQueue.some((tk) => tk.done);
  const [roadTipSeenAtMount, setRoadTipSeenAtMount] = useState<boolean | null>(null);
  useEffect(() => {
    void isTipSeen('home_road').then(setRoadTipSeenAtMount);
  }, []);

  // A tap on the home-screen widget (spekvia://next) starts the next step once the path data is in.
  const [nextStepRequested, setNextStepRequested] = useState(() => takeOpenNextStepRequest());
  useEffect(() => onOpenNextStepRequest(() => setNextStepRequested(takeOpenNextStepRequest())), []);
  useEffect(() => {
    if (!nextStepRequested || !flagsReady || !readingPassages || !completedReadingSlugs) return;
    setNextStepRequested(false);
    if (nextTask) handleStartTask(nextTask);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextStepRequested, flagsReady, readingPassages, completedReadingSlugs, nextTask]);

  const handleStartBossChallenge = () => {
    transitionTo(() => {
      navigation.navigate('FreeChatRoom', {
        focusTopic: { title: selectedCurriculum.bossChallenge.title },
      });
    }, t("Bölüm Sonu Değerlendirmesi Başlıyor…"));
  };

  // Hafta şeridi: bu haftanın günleri.
  const week: WeekDay[] = useMemo(() => {
    const now = new Date();
    const dow = (now.getDay() + 6) % 7; // Pazartesi = 0
    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(now);
      day.setDate(now.getDate() - dow + i);
      const key = toDateKey(day);
      const rec = (progress ?? []).find((p) => p.practice_date === key);
      return { key, minutes: rec?.minutes_practiced ?? 0, isToday: i === dow, isFuture: i > dow };
    });
  }, [progress]);

  // Konu görselleri: her konunun kendi 3D nesnesi (yoksa numara rozeti).
  const covers = useMemo(() => {
    const map: Record<string, ReturnType<typeof topicImageFor>> = {};
    for (const tp of selectedCurriculum.topics) map[tp.code] = topicImageFor(tp.code);
    return map;
  }, [selectedCurriculum.topics]);

  const stageChips = STAGE_IDS.map((id) => ({ id, locked: false, current: id === currentStage }));

  // Konu bittiğinde tek seferlik kapanış kartı (bayraklar yüklendikten sonra, yeni biten konu için).
  const doneTopicsRef = useRef<{ stage: StageId; codes: Set<string> } | null>(null);
  const [completedTopic, setCompletedTopic] = useState<CurriculumTopic | null>(null);
  useEffect(() => {
    if (!flagsReady) return;
    const codes = new Set(
      selectedCurriculum.topics.filter((tp) => isTopicCoreDone(selectedTaskQueue, tp.code)).map((tp) => tp.code)
    );
    const prev = doneTopicsRef.current;
    doneTopicsRef.current = { stage: selectedStage, codes };
    if (prev && prev.stage === selectedStage && selectedStage === currentStage) {
      const fresh = selectedCurriculum.topics.find((tp) => codes.has(tp.code) && !prev.codes.has(tp.code));
      if (fresh) {
        haptics.success();
        setCompletedTopic(fresh);
      }
    }
  }, [flagsReady, selectedStage, currentStage, selectedCurriculum.topics, selectedTaskQueue]);
  const { data: topicMistakes } = useQuery({
    queryKey: ['grammar-mistakes'],
    queryFn: () => api.get<GrammarMistakeOut[]>('/progress/mistakes'),
    enabled: !!completedTopic,
  });
  const completedTopicMistakes = useMemo(
    () => (completedTopic ? (topicMistakes ?? []).filter((m) => resolveLessonCode(m.topic_code) === completedTopic.code).length : 0),
    [completedTopic, topicMistakes]
  );

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
        {/* 0. İnce hafta şeridi */}
        <ProgressStrip accent={STAGE_COLOR[currentStage]} streak={streak} week={week} />

        {/* 1. Aşama bittiyse sıradaki aşamaya geçiş daveti */}
        {isLevelFullyDone ? (
          <BouncyPressable
            onPress={() => {
              // Moving to the next stage is the learner's choice: tapping the card starts it.
              const next = nextStage(currentStage);
              if (next) {
                setSelectedStage(next);
                api
                  .patch<ProfileOut>('/me', { cefr_level: firstLevelOf(next) })
                  .then((updated) => queryClient.setQueryData(['me'], updated))
                  .catch(() => {});
              }
              scrollToNode(pathSectionRef.current);
            }}
            style={styles.stageDoneTouchable}
            hapticType="success"
          >
            <LinearGradient colors={['#059669', '#10B981']} style={styles.stageDoneCard}>
              <Image source={stateImages.goalCelebration} style={styles.stageDoneMascot} resizeMode="contain" />
              <View style={styles.stageDoneText}>
                <Text style={styles.stageDoneEyebrow}>
                  {t("{{stage}} AŞAMASI TAMAMLANDI 🏆", { stage: stageTitle(currentStage).toLocaleUpperCase() })}
                </Text>
                <Text style={styles.stageDoneTitle}>
                  {nextStage(currentStage) ? t("Sıradaki aşamaya hazırsın!") : t("Aşamayı Bitirdin!")}
                </Text>
                <Text style={styles.stageDoneSub}>
                  {nextStage(currentStage)
                    ? t("{{stage}} aşamasını başlatmak için dokun", { stage: stageTitle(nextStage(currentStage) as StageId) })
                    : t("Öğrenme yolunu görmek için dokun")}
                </Text>
              </View>
            </LinearGradient>
          </BouncyPressable>
        ) : null}

        {/* 2. Günün kelime hedefi */}
        {hasSkill(activePlan, 'vocab') && allVocabCards ? (
          <WordGoalCard
            added={wordsAddedToday}
            due={wordsDue}
            onAdd={() => navigation.navigate('VocabLibrary')}
            onReview={() => navigation.navigate('Vocab')}
          />
        ) : null}

        {/* 3. Aşama başlığı ve yol haritası */}
        <View style={styles.pathSection} ref={pathSectionRef}>
          <MivoTip
            tipKey="home_road"
            enabled={hasFinishedStep && roadTipSeenAtMount === false}
            text={t("Burası senin yolun. Bir konuya dokun, içindeki adımları gör 👇")}
            tail="down"
            tailAlign="center"
            style={styles.roadTip}
          />
          <StageRoad
            stages={stageChips}
            selectedStage={selectedStage}
            onSelectStage={setSelectedStage}
            accent={STAGE_COLOR[selectedStage]}
            topics={selectedCurriculum.topics}
            units={selectedCurriculum.units}
            queue={selectedTaskQueue}
            isReview={STAGE_IDS.indexOf(selectedStage) < userStageIdx}
            isAhead={STAGE_IDS.indexOf(selectedStage) > userStageIdx}
            covers={covers}
            onPressTask={(task) => handleStartTask(task)}
            onInfo={setSelectedTopicModal}
            currentRowRef={currentStoneRef}
            boss={selectedCurriculum.bossChallenge}
            onBoss={handleStartBossChallenge}
          />
        </View>
      </ScrollView>

      <MivoTip
        tipKey="home_fab"
        enabled={hasFinishedStep && roadTipSeenAtMount === true}
        text={t("Canın istediğinde bana buradan dokun, istediğin konuda sesli sohbet ederiz 🎙️")}
        tail="down"
        tailAlign="right"
        style={[styles.fabTip, { bottom: fabBottom + 68 + 12 }]}
      />

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
        {/* Durağan portre (video yok): degrade çerçeve, yuvarlağa tam oturan Mivo, sesli sohbet rozeti. */}
        <LinearGradient colors={['#818CF8', '#A855F7']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.chatFabRing}>
          <View style={styles.chatFabInner}>
            <Image source={mivoHomeImages.fab} style={styles.chatFabImage} resizeMode="cover" />
          </View>
        </LinearGradient>
        <View style={styles.chatFabBadge}>
          <Ionicons name="mic" size={12} color="#FFFFFF" />
        </View>
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
                      {selectedTopicModal.code.split('_')[0]} • {selectedTopicModal.code}
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

                <Pressable
                  onPress={() => {
                    const topic = selectedTopicModal;
                    setSelectedTopicModal(null);
                    handleAddTopicWords(topic, topic.code.split('_')[0]);
                  }}
                  style={styles.duoAddWordsBtn}
                  accessibilityRole="button"
                >
                  <Ionicons name="add-circle-outline" size={16} color={colors.brand} />
                  <Text style={styles.duoAddWordsText}>{t("Kelimeleri sandığıma ekle")}</Text>
                </Pressable>
              </>
            )}
          </Pressable>
        </Pressable>
      </Modal>

      <TopicCompleteModal
        topic={completedTopic}
        tasks={completedTopic ? selectedTaskQueue.filter((tk) => tk.topic.code === completedTopic.code) : []}
        accent={STAGE_COLOR[selectedStage]}
        mistakeCount={completedTopicMistakes}
        onClose={() => {
          setCompletedTopic(null);
          // First finished topic = a happy moment: the one-time store rating request (the OS decides if it shows).
          setTimeout(() => void requestReviewAfterFirstTopic(), 700);
        }}
        onOpenMistakes={() => navigation.navigate('MistakesNotebook')}
        onAddWords={(tp) => {
          setCompletedTopic(null);
          void handleAddTopicWords(tp, tp.code.split('_')[0]);
        }}
      />

      {toast ? <Toast message={toast} /> : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appLoadingContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  appLoadingSub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 6,
    textAlign: 'center',
  },
  appLoadingTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 20,
    color: colors.textHeading,
    marginTop: 20,
    textAlign: 'center',
  },
  roadTip: { marginBottom: 14 },
  fabTip: { position: 'absolute', right: spacing.md, left: spacing.xl, zIndex: 120 },
  chatFab: {
    position: 'absolute',
    right: spacing.md,
    width: 68,
    height: 68,
    borderRadius: 34,
    shadowColor: colors.brand,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 12,
    zIndex: 99,
  },
  chatFabRing: { width: 68, height: 68, borderRadius: 34, padding: 3 },
  chatFabInner: { flex: 1, borderRadius: 31, overflow: 'hidden', backgroundColor: '#EEF2FF', borderWidth: 2, borderColor: '#FFFFFF' },
  chatFabImage: { width: '100%', height: '100%' },
  chatFabBadge: {
    position: 'absolute',
    right: -1,
    bottom: -1,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#10B981',
    borderWidth: 2.5,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  duoAddWordsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    marginTop: 12,
    paddingVertical: 11,
    borderRadius: radii.pill,
    backgroundColor: '#EEF2FF',
  },
  duoAddWordsText: { fontFamily: fonts.headingSemiBold, fontSize: 13, color: colors.brand },
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
  duoModalCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: spacing.md,
    paddingBottom: 36,
  },
  duoModalCloseBtn: {
    padding: 4,
  },
  duoModalDesc: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: colors.textMuted,
    lineHeight: 17,
    marginBottom: 12,
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
  duoModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    justifyContent: 'flex-end',
  },
  duoModalTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 17,
    color: colors.textHeading,
    marginBottom: 4,
  },
  duoVocabBox: {
    marginBottom: 14,
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
  pathSection: {
    marginBottom: spacing.lg,
  },
  pathSectionTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 22,
    color: colors.textHeading,
    marginBottom: spacing.sm,
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: 110,
  },
  stageDoneCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: radii.xl,
    padding: spacing.md,
    overflow: 'hidden',
  },
  stageDoneEyebrow: { fontFamily: fonts.headingBold, fontSize: 11, letterSpacing: 0.6, color: 'rgba(255,255,255,0.85)' },
  stageDoneMascot: { width: 86, height: 86 },
  stageDoneSub: { fontFamily: fonts.bodyRegular, fontSize: 12.5, lineHeight: 17, color: 'rgba(255,255,255,0.9)' },
  stageDoneText: { flex: 1, gap: 3 },
  stageDoneTitle: { fontFamily: fonts.headingBold, fontSize: 19, lineHeight: 24, color: '#FFFFFF' },
  stageDoneTouchable: { marginBottom: spacing.md },
});
