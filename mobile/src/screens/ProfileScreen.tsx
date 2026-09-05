import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { Image, Modal, Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';

import {
  avatarImages,
  cefrLevelImages,
  homeImages,
  stateImages,
} from '../assets/images';
import { BouncyPressable } from '../components/BouncyPressable';
import { Button } from '../components/Button';
import { SkillsRadarChart, type RadarMetrics } from '../components/SkillsRadarChart';
import { BADGES } from '../constants/badges';
import { useAuth } from '../context/AuthContext';
import {
  ALL_SPEAKING_TOPIC_CODES,
  ALL_TOPIC_CODES,
  CEFR_CURRICULUM,
  computeFullCompletion,
  isTopicCompleted,
} from '../data/curriculumData';
import { useDailyReminder } from '../hooks/useDailyReminder';
import { useEarnedBadges } from '../hooks/useEarnedBadges';
import { api } from '../lib/api';
import { isProUser } from '../lib/revenuecat';
import type { MainTabScreenProps } from '../navigation/types';
import { colors, fonts, radii, shadow, spacing } from '../theme/tokens';
import type {
  GrammarMistakeOut,
  ProfileOut,
  ProfileUpdate,
  ProgressOut,
  ReadingPassageOut,
  SessionOut,
  VocabCardOut,
} from '../types/api';

/** Preview shows the first 4 of the canonical 10-badge list; "Tümünü Gör" opens the full grid. */
const PROFILE_BADGE_PREVIEW = BADGES.slice(0, 4);

const AVATAR_LIST = [
  { id: 'student', name: 'Öğrenci', source: avatarImages.studentYouth },
  { id: 'corporate', name: 'Kurumsal / Çalışan', source: avatarImages.proDeveloper },
  { id: 'traveler', name: 'Gezgin', source: avatarImages.travelerExplorer },
  { id: 'adult_hobby', name: 'Hobi / Yetişkin', source: avatarImages.matureSenior },
  { id: 'dev', name: 'Yazılımcı', source: avatarImages.maleDev },
  { id: 'lead', name: 'Tech Lead', source: avatarImages.femaleLead },
  { id: 'designer', name: 'Tasarımcı', source: avatarImages.femaleDesigner },
  { id: 'engineer', name: 'Mühendis', source: avatarImages.maleEngineer },
  { id: 'entrepreneur', name: 'Girişimci', source: avatarImages.femaleEntrepreneur },
];

const CEFR_LEVELS = [
  { code: 'A1', title: 'Başlangıç', enTitle: 'Beginner', desc: 'Temel hayatta kalma, tanışma & acil durumlar', color: '#10B981', targetDays: 30 },
  { code: 'A2', title: 'Temel', enTitle: 'Elementary', desc: 'Günlük rutinler, seyahat, restoran & alışveriş', color: '#0EA5E9', targetDays: 45 },
  { code: 'B1', title: 'Orta Düzey', enTitle: 'Intermediate', desc: 'İş toplantıları, teknik standuplar & mülakatlar', color: '#6366F1', targetDays: 60 },
  { code: 'B2', title: 'İyi Düzey', enTitle: 'Upper-Intermediate', desc: 'Akıcı tartışma, mimari tartışmalar & teknik sunum', color: '#8B5CF6', targetDays: 75 },
  { code: 'C1', title: 'İleri Düzey', enTitle: 'Advanced', desc: 'Liderlik, strateji, B2B müzakere & ikna', color: '#EC4899', targetDays: 90 },
  { code: 'C2', title: 'Ustalık', enTitle: 'Mastery', desc: 'Ana dili akıcılığı, derin nüanslar & deyimler', color: '#F59E0B', targetDays: 120 },
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
  const { data: mistakes } = useQuery({
    queryKey: ['grammar-mistakes'],
    queryFn: () => api.get<GrammarMistakeOut[]>('/progress/mistakes'),
  });
  const { data: allSessions } = useQuery({
    queryKey: ['sessions', 'all'],
    queryFn: () => api.get<SessionOut[]>('/sessions?limit=500'),
  });
  const { data: vocabAll } = useQuery({
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
  const { data: isPro } = useQuery({
    queryKey: ['isProUser'],
    queryFn: isProUser,
    staleTime: 60_000,
  });
  const { earnedBadgeIds } = useEarnedBadges();

  const [guideModalVisible, setGuideModalVisible] = useState(false);
  const [nameModalVisible, setNameModalVisible] = useState(false);
  const [levelModalVisible, setLevelModalVisible] = useState(false);
  const [levelModalTab, setLevelModalTab] = useState<'PROGRESS' | 'ALL_LEVELS'>('PROGRESS');
  const [nameInput, setNameInput] = useState('');
  const [chatCompletedCodes, setChatCompletedCodes] = useState<Set<string>>(new Set());
  const [lessonQuizDoneCodes, setLessonQuizDoneCodes] = useState<Set<string>>(new Set());

  // Refreshed on focus (e.g. returning from a finished TextChat topic
  // practice or a finished lesson quiz) — same AsyncStorage signals
  // TextChatScreen/GrammarLessonScreen write to.
  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      AsyncStorage.multiGet(ALL_SPEAKING_TOPIC_CODES.map((c) => `topic_chat_completed_${c}`)).then(
        (pairs) => {
          if (cancelled) return;
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
        if (cancelled) return;
        setLessonQuizDoneCodes(
          new Set(pairs.filter(([, v]) => v === '1').map(([k]) => k.replace('lesson_quiz_done_', '')))
        );
      });
      return () => {
        cancelled = true;
      };
    }, [])
  );

  const avatarMutation = useMutation({
    mutationFn: (avatarId: string) =>
      api.patch<ProfileOut>('/me', { avatar_id: avatarId } satisfies ProfileUpdate),
    onSuccess: (updated) => queryClient.setQueryData(['me'], updated),
  });

  const nameMutation = useMutation({
    mutationFn: (displayName: string) =>
      api.patch<ProfileOut>('/me', { display_name: displayName } satisfies ProfileUpdate),
    onSuccess: (updated) => {
      queryClient.setQueryData(['me'], updated);
      setNameModalVisible(false);
    },
  });

  const levelMutation = useMutation({
    mutationFn: (newLevel: string) =>
      api.patch<ProfileOut>('/me', { cefr_level: newLevel } satisfies ProfileUpdate),
    onSuccess: (updated) => {
      queryClient.setQueryData(['me'], updated);
      setLevelModalVisible(false);
    },
  });

  const selectedAvatarId = profile?.avatar_id ?? profile?.persona_id ?? AVATAR_LIST[0].id;
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

  // Weekly Stats Calculation
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

  // All-time Totals
  const allTimeMinutes = (progress ?? []).reduce((sum, p) => sum + p.minutes_practiced, 0);
  const allTimeSessions = (allSessions ?? []).length;
  const allTimeVocab = (vocabAll ?? []).length;

  const currentLevel = profile?.cefr_level ?? 'A1';
  const levelShield =
    cefrLevelImages[currentLevel as keyof typeof cefrLevelImages] ?? cefrLevelImages.A1;
  const currentLevelObj =
    CEFR_LEVELS.find((l) => l.code === currentLevel) ?? CEFR_LEVELS[0];

  // Real level-progression report: a topic counts as done using the exact
  // same rule as the Sahneler roadmap / Calendar (see `computeFullCompletion`
  // in curriculumData.ts) — no separate/fake progress number, one source of
  // truth across the whole app. Vocab alone no longer finishes a
  // speaking/reading topic; a real chat or reading completion is required too.
  const savedWordsLower = new Set((vocabAll ?? []).map((c) => c.term.trim().toLowerCase()));
  const activeCurriculum = CEFR_CURRICULUM[currentLevel] ?? CEFR_CURRICULUM.A1;
  const completedReadingSlugSetForLevel = new Set(completedReadingSlugs ?? []);
  const completedReadingCountForLevel = (readingPassages ?? []).filter(
    (p) => (p.cefr_level ?? 'A1') === currentLevel && completedReadingSlugSetForLevel.has(p.slug)
  ).length;
  const fullCompletionMap = computeFullCompletion(
    activeCurriculum.topics,
    savedWordsLower,
    chatCompletedCodes,
    completedReadingCountForLevel,
    lessonQuizDoneCodes
  );
  const remainingTopics = activeCurriculum.topics.filter((t) => !fullCompletionMap[t.code]);
  const completedTopicsCount = activeCurriculum.topics.length - remainingTopics.length;
  const levelCompletionPercent = activeCurriculum.topics.length
    ? Math.round((completedTopicsCount / activeCurriculum.topics.length) * 100)
    : 0;
  const isLevelComplete = remainingTopics.length === 0;
  const currentLevelIdx = CEFR_LEVELS.findIndex((l) => l.code === currentLevel);
  const nextLevelObj = CEFR_LEVELS[currentLevelIdx + 1] ?? null;
  // Estimated remaining time: curriculum.targetDays is the level's own
  // designed pace (see curriculumData.ts) scaled by what's left to do — an
  // honest estimate tied to real design data, not an invented countdown.
  const estimatedDaysRemaining = Math.max(
    0,
    Math.round(activeCurriculum.targetDays * (remainingTopics.length / activeCurriculum.topics.length))
  );

  const userXp = profile?.xp ?? 0;
  const userGems = Math.max(50, Math.floor(userXp / 3) + (profile?.streak_count ?? 1) * 15);
  const userStreak = profile?.streak_count ?? 1;

  // Today Practice Check
  const todayKey = toDateKey(new Date());
  const todayProgress = (progress ?? []).find((p) => p.practice_date === todayKey);
  const todayMinutes = todayProgress?.minutes_practiced ?? 0;
  const dailyTargetMinutes = 15;
  const todayGoalPercent = Math.min(100, Math.round((todayMinutes / dailyTargetMinutes) * 100));

  const avgFluency =
    allSessions && allSessions.length > 0
      ? Math.round(
          allSessions.reduce((acc, s) => acc + (s.fluency_score ?? 75), 0) / allSessions.length
        )
      : 82;

  const userRadarMetrics: RadarMetrics = {
    fluency: avgFluency,
    pronunciation: Math.min(100, Math.max(60, Math.round(avgFluency * 1.04))),
    grammar: Math.min(100, Math.max(50, 100 - (mistakes?.length ?? 0) * 4)),
    vocabulary: Math.min(100, Math.max(50, Math.round((vocabAll?.length ?? 10) * 1.8))),
    speed: Math.min(100, Math.max(55, 75 + (profile?.streak_count ?? 1) * 2)),
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header Bar */}
      <View style={styles.topHeader}>
        <View style={styles.topHeaderCol}>
          <Text style={styles.topHeaderTitle}>Profilim</Text>
          <Text style={styles.topHeaderSub}>İlerleme, Kasalar & Ayarlar</Text>
        </View>
        <Pressable
          onPress={() => setGuideModalVisible(true)}
          style={[styles.guideIconBtn, shadow.card]}
          hitSlop={8}
        >
          <Ionicons name="help-circle-outline" size={20} color={colors.brand} />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ======================================================== */}
        {/* 1. HERO PROFILE CARD (Identity + CEFR + Economy Trio)   */}
        {/* ======================================================== */}
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
            <Pressable
              onPress={() => {
                setNameInput(displayName);
                setNameModalVisible(true);
              }}
              style={styles.avatarEditPill}
              hitSlop={8}
            >
              <Ionicons name="pencil" size={11} color="#FFFFFF" />
            </Pressable>
          </View>

          {/* Name & Edit Row */}
          <Pressable
            onPress={() => {
              setNameInput(displayName);
              setNameModalVisible(true);
            }}
            style={styles.nameRow}
          >
            <Text style={styles.displayName}>{displayName}</Text>
            <Ionicons name="create-outline" size={16} color={colors.brand} style={{ marginLeft: 4 }} />
          </Pressable>
          <Text style={styles.emailText}>{session?.user.email}</Text>

          {/* Clickable CEFR Level 3D Prestige Showcase */}
          <Pressable
            onPress={() => setLevelModalVisible(true)}
            style={[styles.levelCard, shadow.card, { borderColor: currentLevelObj.color + '40' }]}
          >
            {/* Top Full-Width Header Row (Zero Overflow) */}
            <View style={styles.levelCardHeaderRow}>
              <View style={styles.levelCardHeaderLeft}>
                <Ionicons name="school-outline" size={13} color={currentLevelObj.color} />
                <Text style={[styles.levelLabel, { color: currentLevelObj.color }]}>CEFR ÖĞRENME SEVİYESİ</Text>
              </View>
              <View style={[styles.levelChangeBadge, { backgroundColor: currentLevelObj.color + '18' }]}>
                <Text style={[styles.levelChangeText, { color: currentLevelObj.color }]}>
                  Rapor & Detay ➔
                </Text>
              </View>
            </View>

            {/* Level Main Info Row */}
            <View style={styles.levelCardTopRow}>
              <View style={styles.levelShieldWrapper}>
                <Image source={levelShield} style={styles.levelShield} resizeMode="contain" />
                <View style={[styles.levelMiniBadge, { backgroundColor: currentLevelObj.color }]}>
                  <Text style={styles.levelMiniBadgeText}>{currentLevel}</Text>
                </View>
              </View>

              <View style={styles.levelCardContent}>
                <Text style={styles.levelName}>
                  {currentLevel} • {currentLevelObj.title} ({currentLevelObj.enTitle})
                </Text>
                <Text style={styles.levelDesc} numberOfLines={2}>
                  {currentLevelObj.desc}
                </Text>
              </View>
            </View>

            {/* Embedded Progress Bar */}
            <View style={styles.levelCardProgressSection}>
              <View style={styles.levelCardProgressTrack}>
                <View
                  style={[
                    styles.levelCardProgressFill,
                    { width: `${levelCompletionPercent}%`, backgroundColor: currentLevelObj.color },
                  ]}
                />
              </View>
              <View style={styles.levelCardProgressMeta}>
                <Text style={styles.levelCardProgressText}>
                  {completedTopicsCount} / {activeCurriculum.topics.length} Konu Tamamlandı
                </Text>
                <Text style={[styles.levelCardPercentText, { color: currentLevelObj.color }]}>
                  %{levelCompletionPercent}
                </Text>
              </View>
            </View>
          </Pressable>

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
              onPress={() => navigation.navigate('Calendar')}
            >
              <Text style={styles.economyStatFlame}>🔥</Text>
              <Text style={[styles.economyStatNumber, { color: '#EA580C' }]}>
                {userStreak} Gün
              </Text>
              <Text style={styles.economyStatLabel}>Seri</Text>
              {profile?.longest_streak ? (
                <Text style={styles.economyStatSubLabel}>En: {profile.longest_streak} gün</Text>
              ) : null}
            </Pressable>
          </View>
        </View>

        {/* ======================================================== */}
        {/* 2. TODAY'S DAILY PRACTICE GOAL WIDGET                   */}
        {/* ======================================================== */}
        <View style={[styles.dailyGoalCard, shadow.card]}>
          <View style={styles.dailyGoalHeaderRow}>
            <View style={styles.dailyGoalTitleCol}>
              <View style={styles.dailyGoalTag}>
                <Ionicons name="time-outline" size={12} color="#0EA5E9" />
                <Text style={styles.dailyGoalTagText}>GÜNLÜK HEDEF</Text>
              </View>
              <Text style={styles.dailyGoalTitle}>
                {todayMinutes >= dailyTargetMinutes
                  ? 'Günün Hedefi Tamamlandı! 🎉'
                  : `${todayMinutes} / ${dailyTargetMinutes} Dakika Pratik`}
              </Text>
            </View>
            <View style={styles.goalPercentBadge}>
              <Text style={styles.goalPercentText}>%{todayGoalPercent}</Text>
            </View>
          </View>

          {/* Progress Bar */}
          <View style={styles.goalProgressBarTrack}>
            <View style={[styles.goalProgressBarFill, { width: `${todayGoalPercent}%` }]} />
          </View>

          <Text style={styles.dailyGoalHint}>
            {todayMinutes >= dailyTargetMinutes
              ? 'Harika! Bugünün pratik kotasını doldurdun ve seriyi korudun.'
              : `Serini (${userStreak} gün) devam ettirmek için en az 1 seans konuşma veya okuma yap.`}
          </Text>
        </View>

        {/* ======================================================== */}
        {/* 2b. 360° CEFR SKILLS RADAR                             */}
        {/* ======================================================== */}
        <View style={[styles.radarCard, shadow.card]}>
          <View style={styles.radarHeaderRow}>
            <View style={styles.radarTag}>
              <Ionicons name="sparkles" size={12} color={colors.brand} />
              <Text style={styles.radarTagText}>360° GELİŞİM RADARI</Text>
            </View>
            <Text style={styles.radarLevelBadge}>{currentLevel} Seviye Analizi</Text>
          </View>
          <Text style={styles.radarTitle}>Kişiselleştirilmiş Yetkinlik Çarkı</Text>
          <Text style={styles.radarSub}>Akıcılık, Telaffuz, Gramer, Kelime ve Hız Dengesi</Text>
          <View style={styles.radarChartWrapper}>
            <SkillsRadarChart metrics={userRadarMetrics} size={250} />
          </View>
        </View>

        {/* ======================================================== */}
        {/* 3. 4'LÜ TEMEL GELİŞİM KASASI (FULL-WIDTH BENTO STACK)   */}
        {/* ======================================================== */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Gelişim Kasaları &amp; Merkezler</Text>
          <View style={styles.hubStack}>
            {/* 1. Hata Defterim */}
            <BouncyPressable
              onPress={() => navigation.navigate('MistakesNotebook')}
              style={[styles.hubCard, shadow.card]}
              hapticType="light"
              scaleTo={0.97}
            >
              <View style={[styles.hubIconBg, { backgroundColor: '#EEF2FF', borderColor: '#C7D2FE' }]}>
                <Image
                  source={stateImages.mistakesNotebook}
                  style={styles.hubThumbImage}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.hubContent}>
                <Text style={styles.hubTitle}>Hata Defterim</Text>
                <Text style={styles.hubDesc}>Düzeltilen gramer kuralları &amp; zayıf noktalar</Text>
              </View>
              <View style={styles.hubRightCol}>
                <View style={[styles.hubCountPill, { backgroundColor: '#EEF2FF', borderColor: '#C7D2FE' }]}>
                  <Text style={[styles.hubCountText, { color: '#4338CA' }]}>
                    {mistakes?.length ?? 0} Kayıt
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
              </View>
            </BouncyPressable>

            {/* 2. Kelime Sandığı */}
            <BouncyPressable
              onPress={() => navigation.navigate('Main', { screen: 'Vocab' })}
              style={[styles.hubCard, shadow.card]}
              hapticType="light"
              scaleTo={0.97}
            >
              <View style={[styles.hubIconBg, { backgroundColor: '#FEF3C7', borderColor: '#FDE68A' }]}>
                <Image
                  source={homeImages.vocabDeck}
                  style={styles.hubThumbImage}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.hubContent}>
                <Text style={styles.hubTitle}>Kelime Sandığım</Text>
                <Text style={styles.hubDesc}>Flashcard &amp; Aralıklı Tekrar (Spaced Repetition)</Text>
              </View>
              <View style={styles.hubRightCol}>
                <View style={[styles.hubCountPill, { backgroundColor: '#FEF3C7', borderColor: '#FDE68A' }]}>
                  <Text style={[styles.hubCountText, { color: '#B45309' }]}>
                    {allTimeVocab} Kelime
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
              </View>
            </BouncyPressable>

            {/* 3. 3D Rozetler */}
            <BouncyPressable
              onPress={() => navigation.navigate('Badges')}
              style={[styles.hubCard, shadow.card]}
              hapticType="light"
              scaleTo={0.97}
            >
              <View style={[styles.hubIconBg, { backgroundColor: '#ECFDF5', borderColor: '#A7F3D0' }]}>
                <Ionicons name="trophy" size={24} color="#10B981" />
              </View>
              <View style={styles.hubContent}>
                <Text style={styles.hubTitle}>3D Rozetler &amp; Başarılar</Text>
                <Text style={styles.hubDesc}>Kazanılan seviye ve akıcılık kalkanları</Text>
              </View>
              <View style={styles.hubRightCol}>
                <View style={[styles.hubCountPill, { backgroundColor: '#ECFDF5', borderColor: '#A7F3D0' }]}>
                  <Text style={[styles.hubCountText, { color: '#047857' }]}>
                    {earnedBadgeIds.size} / 10
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
              </View>
            </BouncyPressable>

            {/* 4. Çalışma Takvimi */}
            <BouncyPressable
              onPress={() => navigation.navigate('Calendar')}
              style={[styles.hubCard, shadow.card]}
              hapticType="light"
              scaleTo={0.97}
            >
              <View style={[styles.hubIconBg, { backgroundColor: '#FFF7ED', borderColor: '#FFEDD5' }]}>
                <Image
                  source={homeImages.streakCalendar}
                  style={styles.hubThumbImage}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.hubContent}>
                <Text style={styles.hubTitle}>Çalışma Takvimi &amp; Seri</Text>
                <Text style={styles.hubDesc}>Aylık pratik geçmişi ve seri koruma</Text>
              </View>
              <View style={styles.hubRightCol}>
                <View style={[styles.hubCountPill, { backgroundColor: '#FFF7ED', borderColor: '#FFEDD5' }]}>
                  <Text style={[styles.hubCountText, { color: '#C2410C' }]}>
                    {userStreak} Gün Seri
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
              </View>
            </BouncyPressable>
          </View>
        </View>

        {/* ======================================================== */}
        {/* 4. VIP STAGE PASS PRO PROMO BANNER                      */}
        {/* ======================================================== */}
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
            <Text style={styles.vipBadge}>{isPro ? 'PRO ÜYELİĞİN AKTİF 🌟' : 'STAGE PASS VIP'}</Text>
            <Text style={styles.vipTitle}>{isPro ? 'Sınırsız Ayrıcalıklar' : 'Sınırsız Sahneye Çık'}</Text>
            <Text style={styles.vipDesc}>
              {isPro
                ? 'Tüm mülakatlar, podcastler ve derin AI analizleri sınırsız kullanımında.'
                : 'Günlük limitleri kaldır, 40 podcast ve tüm mülakatların kilidini aç.'}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={isPro ? '#10B981' : '#F59E0B'} />
        </BouncyPressable>

        {/* ======================================================== */}
        {/* 5. 3D PERSONA AVATAR GALLERY                            */}
        {/* ======================================================== */}
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
                {selectedAvatarIdx === idx ? (
                  <View style={styles.avatarCheckBadge}>
                    <Ionicons name="checkmark" size={10} color="#FFFFFF" />
                  </View>
                ) : null}
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* ======================================================== */}
        {/* 6. WEEKLY & ALL-TIME PROGRESS STATS                     */}
        {/* ======================================================== */}
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

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tüm Zamanlar</Text>
          <View style={styles.statsRow}>
            <View style={[styles.statBox, shadow.card]}>
              <Text style={styles.statBigNumber}>{allTimeMinutes}</Text>
              <Text style={styles.statBoxLabel}>Toplam Dakika</Text>
            </View>
            <View style={[styles.statBox, shadow.card]}>
              <Text style={styles.statBigNumber}>{allTimeSessions}</Text>
              <Text style={styles.statBoxLabel}>Toplam Seans</Text>
            </View>
            <View style={[styles.statBox, shadow.card]}>
              <Text style={styles.statBigNumber}>{allTimeVocab}</Text>
              <Text style={styles.statBoxLabel}>Kelime Sandığı</Text>
            </View>
          </View>
        </View>

        {/* ======================================================== */}
        {/* 7. SETTINGS & PREFERENCES GROUP                         */}
        {/* ======================================================== */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ayarlar & Tercihler</Text>

          <View style={[styles.settingsCard, shadow.card]}>
            {/* Görünen Ad */}
            <Pressable
              onPress={() => {
                setNameInput(displayName);
                setNameModalVisible(true);
              }}
              style={styles.settingRow}
            >
              <Ionicons name="person-outline" size={20} color={colors.brand} />
              <View style={styles.settingTextCol}>
                <Text style={styles.settingLabel}>Görünen Ad</Text>
                <Text style={styles.settingDesc}>{displayName}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </Pressable>

            <View style={styles.settingDivider} />

            {/* CEFR Seviyesi Raporu */}
            <Pressable
              onPress={() => setLevelModalVisible(true)}
              style={styles.settingRow}
            >
              <Ionicons name="school-outline" size={20} color={colors.brand} />
              <View style={styles.settingTextCol}>
                <Text style={styles.settingLabel}>Öğrenme Seviyesi (CEFR)</Text>
                <Text style={styles.settingDesc}>
                  {currentLevel} • {completedTopicsCount}/{activeCurriculum.topics.length} konu (%{levelCompletionPercent})
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </Pressable>

            <View style={styles.settingDivider} />

            {/* Günlük Hatırlatıcı */}
            <View style={styles.settingRow}>
              <Ionicons name="notifications-outline" size={20} color={colors.brand} />
              <View style={styles.settingTextCol}>
                <Text style={styles.settingLabel}>Günlük Hatırlatıcı</Text>
                <Text style={styles.settingDesc}>Sabah kahvesinde 5 dk pratik bildirimi</Text>
              </View>
              <Switch
                value={remindersEnabled}
                onValueChange={toggleReminders}
                disabled={remindersUnavailable}
                trackColor={{ false: '#CBD5E1', true: colors.brand }}
              />
            </View>

            <View style={styles.settingDivider} />

            {/* XP & Elmas Rehberi */}
            <Pressable
              onPress={() => setGuideModalVisible(true)}
              style={styles.settingRow}
            >
              <Ionicons name="information-circle-outline" size={20} color={colors.brand} />
              <View style={styles.settingTextCol}>
                <Text style={styles.settingLabel}>XP ve Elmas Sistemi Rehberi</Text>
                <Text style={styles.settingDesc}>Ödül kazanma yolları & mağaza mekanikleri</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </Pressable>
          </View>

          {/* Çıkış Yap Butonu */}
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
              {/* XP */}
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
                  <Text style={styles.guideBullet}>• <Text style={{ fontWeight: 'bold' }}>Nasıl Kazanılır?</Text> Canlı AI konuşmaları (+50 XP), okuma parçaları (+30 XP) ve testlerden (+20 XP).</Text>
                  <Text style={styles.guideBullet}>• <Text style={{ fontWeight: 'bold' }}>Ne İşe Yarar?</Text> A1'den C2'ye seviye atlamanı sağlar ve Liderlik Liglerinde seni öne taşır.</Text>
                </View>
              </View>

              {/* GEMS */}
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
                  <Text style={styles.guideBullet}>• <Text style={{ fontWeight: 'bold' }}>🎭 VIP Özel Mülakatlar:</Text> İleri düzey mülakat ve iş senaryolarını açar.</Text>
                  <Text style={styles.guideBullet}>• <Text style={{ fontWeight: 'bold' }}>🎙️ Ekstra AI Süresi:</Text> Günlük sınır dolduğunda seansı uzatmanı sağlar.</Text>
                </View>
              </View>

              <Button
                label="Anladım, Harika! 🚀"
                onPress={() => setGuideModalVisible(false)}
                style={{ marginTop: spacing.md }}
              />
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* ======================================================== */}
      {/* ✏️ MODAL: GÖRÜNEN ADI DÜZENLE                             */}
      {/* ======================================================== */}
      <Modal
        visible={nameModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setNameModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.nameModalCard}>
            <Text style={styles.nameModalTitle}>Görünen Adını Düzenle</Text>
            <Text style={styles.nameModalSub}>
              Bu isim uygulama genelinde (Ana Sayfa, sesli hitaplar) kullanılır.
            </Text>
            <TextInput
              value={nameInput}
              onChangeText={setNameInput}
              placeholder="Adın"
              placeholderTextColor={colors.textMuted}
              style={styles.nameInput}
              maxLength={40}
              autoFocus
            />
            <View style={styles.nameModalActions}>
              <Pressable
                onPress={() => setNameModalVisible(false)}
                style={styles.nameModalCancelBtn}
              >
                <Text style={styles.nameModalCancelText}>Vazgeç</Text>
              </Pressable>
              <Button
                label="Kaydet"
                loading={nameMutation.isPending}
                onPress={() => {
                  const trimmed = nameInput.trim();
                  if (trimmed) nameMutation.mutate(trimmed);
                }}
                disabled={!nameInput.trim()}
                style={styles.nameModalSaveBtn}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* ======================================================== */}
      {/* 📊 MODAL: CEFR SEVİYE & YOL HARİTASI (PRESTIGE MODAL)    */}
      {/* ======================================================== */}
      <Modal
        visible={levelModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setLevelModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.levelModalCard}>
            {/* Modal Top Header */}
            <View style={styles.guideModalHeader}>
              <View>
                <Text style={styles.guideModalTitle}>CEFR Seviye & Yol Haritası 🎓</Text>
                <Text style={styles.guideModalSub}>
                  Uluslararası standartlarda İngilizce yetkinlik haritan
                </Text>
              </View>
              <Pressable
                onPress={() => setLevelModalVisible(false)}
                hitSlop={12}
                style={styles.closeGuideBtn}
              >
                <Ionicons name="close" size={22} color={colors.textMuted} />
              </Pressable>
            </View>

            {/* Segmented Tab Switcher */}
            <View style={styles.levelModalTabRow}>
              <Pressable
                onPress={() => setLevelModalTab('PROGRESS')}
                style={[
                  styles.levelModalTabBtn,
                  levelModalTab === 'PROGRESS' && styles.levelModalTabBtnActive,
                ]}
              >
                <Text
                  style={[
                    styles.levelModalTabText,
                    levelModalTab === 'PROGRESS' && styles.levelModalTabTextActive,
                  ]}
                  numberOfLines={1}
                >
                  📊 {currentLevel} İlerlemem (%{levelCompletionPercent})
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setLevelModalTab('ALL_LEVELS')}
                style={[
                  styles.levelModalTabBtn,
                  levelModalTab === 'ALL_LEVELS' && styles.levelModalTabBtnActive,
                ]}
              >
                <Text
                  style={[
                    styles.levelModalTabText,
                    levelModalTab === 'ALL_LEVELS' && styles.levelModalTabTextActive,
                  ]}
                  numberOfLines={1}
                >
                  🗺️ Tüm Seviyeler
                </Text>
              </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.levelOptionsScroll}>
              {levelModalTab === 'PROGRESS' ? (
                <>
                  {/* Current level summary card */}
                  <View style={[styles.levelReportHero, { borderColor: currentLevelObj.color + '40' }]}>
                    <View style={styles.levelReportHeroLeft}>
                      <Image source={levelShield} style={styles.levelReportHeroShield} resizeMode="contain" />
                      <View style={[styles.levelMiniBadge, { backgroundColor: currentLevelObj.color }]}>
                        <Text style={styles.levelMiniBadgeText}>{currentLevel}</Text>
                      </View>
                    </View>
                    <View style={styles.levelReportHeroContent}>
                      <View style={styles.levelOptionBadgeRow}>
                        <Text style={[styles.levelOptionCode, { color: currentLevelObj.color }]}>
                          {currentLevelObj.code}
                        </Text>
                        <Text style={styles.levelOptionTitle}>• {currentLevelObj.title} ({currentLevelObj.enTitle})</Text>
                      </View>
                      <Text style={styles.levelOptionDesc}>{currentLevelObj.desc}</Text>
                      <Text style={styles.levelTargetDays}>🎯 Müfredat: ~{currentLevelObj.targetDays} Günlük Plan</Text>
                    </View>
                  </View>

                  {/* Progress bar */}
                  <View style={styles.levelProgressBlock}>
                    <View style={styles.levelProgressLabelRow}>
                      <Text style={styles.levelProgressLabel}>
                        {completedTopicsCount}/{activeCurriculum.topics.length} konu tamamlandı
                      </Text>
                      <Text style={[styles.levelProgressPercent, { color: currentLevelObj.color }]}>
                        %{levelCompletionPercent}
                      </Text>
                    </View>
                    <View style={styles.levelProgressTrack}>
                      <View
                        style={[
                          styles.levelProgressFill,
                          { width: `${levelCompletionPercent}%`, backgroundColor: currentLevelObj.color },
                        ]}
                      />
                    </View>
                    {!isLevelComplete ? (
                      <Text style={styles.levelEstimateText}>
                        ⏳ Hedef tempoda tahmini kalan süre: ~{estimatedDaysRemaining} gün
                      </Text>
                    ) : null}
                  </View>

                  {isLevelComplete && nextLevelObj ? (
                    <View style={styles.levelUpBox}>
                      <Text style={styles.levelUpTitle}>🎉 {currentLevel} seviyesini tamamladın!</Text>
                      <Text style={styles.levelUpDesc}>
                        Tüm konuları bitirdin. Artık {nextLevelObj.code} seviyesine geçebilirsin.
                      </Text>
                      <Button
                        label={
                          levelMutation.isPending
                            ? 'Geçiliyor...'
                            : `${nextLevelObj.code} Seviyesine Geç ➔`
                        }
                        loading={levelMutation.isPending}
                        onPress={() => levelMutation.mutate(nextLevelObj.code)}
                        style={{ marginTop: spacing.sm }}
                      />
                    </View>
                  ) : isLevelComplete ? (
                    <View style={styles.levelUpBox}>
                      <Text style={styles.levelUpTitle}>🏆 Zirvedesin!</Text>
                      <Text style={styles.levelUpDesc}>
                        C2 müfredatının tamamını bitirdin — TalkStage'in sunduğu en üst seviyedesin.
                      </Text>
                    </View>
                  ) : (
                    <>
                      <Text style={styles.remainingSectionTitle}>
                        📚 Seviyedeki Konular & Durumun ({activeCurriculum.topics.length})
                      </Text>
                      {activeCurriculum.topics.map((topic) => {
                        const isDone = fullCompletionMap[topic.code] ?? false;
                        const vocabDone = isTopicCompleted(topic, savedWordsLower);
                        const lessonDone = lessonQuizDoneCodes.has(topic.code);
                        const missingHint = isDone
                          ? null
                          : !vocabDone
                            ? null
                            : !lessonDone
                              ? 'Konu anlatımını okuman gerekiyor'
                              : topic.moduleType === 'speaking'
                                ? 'Sohbeti bitirmen gerekiyor'
                                : topic.moduleType === 'reading'
                                  ? 'Bu seviyede bir okuma daha bitirmen gerekiyor'
                                  : null;
                        return (
                          <Pressable
                            key={topic.code}
                            onPress={() => {
                              setLevelModalVisible(false);
                              navigation.navigate('GrammarLesson', { code: topic.code });
                            }}
                            style={[styles.remainingTopicRow, isDone && styles.remainingTopicRowDone]}
                          >
                            <Ionicons
                              name={isDone ? 'checkmark-circle' : 'ellipse-outline'}
                              size={18}
                              color={isDone ? '#10B981' : '#94A3B8'}
                            />
                            <View style={styles.remainingTopicTextCol}>
                              <Text style={[styles.remainingTopicCode, isDone && { color: '#059669' }]}>
                                {topic.code}
                              </Text>
                              <Text style={styles.remainingTopicTitle} numberOfLines={1}>
                                {topic.title}
                              </Text>
                              {missingHint ? (
                                <Text style={styles.remainingTopicHint}>○ {missingHint}</Text>
                              ) : null}
                            </View>
                            <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
                          </Pressable>
                        );
                      })}
                    </>
                  )}
                </>
              ) : (
                /* ALL 6 CEFR LEVELS — read-only reference, not a picker.
                   Levels only advance by really finishing the current one
                   (see the PROGRESS tab's "seviyeye geç" button when 100%
                   done) — no free jump here on purpose. */
                <View style={styles.allLevelsContainer}>
                  <Text style={styles.allLevelsIntro}>
                    Yolculuğun boyunca göreceğin tüm seviyeler — her biri bir öncekini gerçekten
                    tamamlayınca açılır.
                  </Text>
                  {CEFR_LEVELS.map((lvl) => {
                    const isCurrent = currentLevel === lvl.code;
                    const lvlIdx = CEFR_LEVELS.findIndex((l) => l.code === lvl.code);
                    const isLocked = lvlIdx > currentLevelIdx;
                    const shield = cefrLevelImages[lvl.code as keyof typeof cefrLevelImages];
                    return (
                      <View
                        key={lvl.code}
                        style={[
                          styles.levelGalleryCard,
                          shadow.card,
                          isCurrent && { borderColor: lvl.color, backgroundColor: '#F8FAFC' },
                          isLocked && styles.levelGalleryCardLocked,
                        ]}
                      >
                        <View style={styles.levelGalleryLeft}>
                          <Image source={shield} style={styles.levelGalleryShield} resizeMode="contain" />
                          <View style={[styles.levelGalleryBadge, { backgroundColor: lvl.color }]}>
                            <Text style={styles.levelGalleryBadgeText}>{lvl.code}</Text>
                          </View>
                        </View>

                        <View style={styles.levelGalleryContent}>
                          <View style={styles.levelGalleryHeaderRow}>
                            <Text style={styles.levelGalleryTitle}>
                              {lvl.code} • {lvl.title}
                            </Text>
                            {isCurrent ? (
                              <View style={styles.levelGalleryActivePill}>
                                <Text style={styles.levelGalleryActiveText}>Aktif</Text>
                              </View>
                            ) : isLocked ? (
                              <Ionicons name="lock-closed" size={14} color="#94A3B8" />
                            ) : null}
                          </View>
                          <Text style={styles.levelGalleryEnTitle}>{lvl.enTitle}</Text>
                          <Text style={styles.levelGalleryDesc}>{lvl.desc}</Text>
                          <View style={styles.levelGalleryMetaRow}>
                            <Text style={styles.levelGalleryDays}>⏳ Plan: ~{lvl.targetDays} Gün</Text>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </View>
              )}
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
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(226, 232, 240, 0.8)',
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
  guideIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: 80,
  },

  /* 1. Profile Header Card */
  profileHeaderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: spacing.md,
    alignItems: 'center',
    marginBottom: spacing.md,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  avatarLargeWrapper: {
    position: 'relative',
    marginBottom: 8,
  },
  avatarLargeImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#4F46E5',
  },
  onlineBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#10B981',
    borderRadius: radii.pill,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  onlineBadgeText: {
    fontFamily: fonts.mono,
    fontSize: 9,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  avatarEditPill: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#4F46E5',
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  displayName: {
    fontFamily: fonts.headingBold,
    fontSize: 18,
    color: colors.textHeading,
  },
  emailText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },

  /* Level Banner (Prestige Showcase) */
  levelCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 14,
    width: '100%',
    marginTop: 12,
    marginBottom: 14,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  levelCardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(226, 232, 240, 0.6)',
  },
  levelCardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  levelCardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
  },
  levelShieldWrapper: {
    position: 'relative',
    width: 52,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelShield: {
    width: 50,
    height: 50,
  },
  levelMiniBadge: {
    position: 'absolute',
    bottom: -2,
    backgroundColor: '#4F46E5',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: radii.pill,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  levelMiniBadgeText: {
    fontFamily: fonts.mono,
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  levelCardContent: {
    flex: 1,
  },
  levelLabel: {
    fontFamily: fonts.mono,
    fontSize: 9.5,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  levelChangeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.pill,
  },
  levelChangeText: {
    fontFamily: fonts.headingBold,
    fontSize: 10.5,
  },
  levelName: {
    fontFamily: fonts.headingBold,
    fontSize: 13.5,
    color: colors.textHeading,
    marginTop: 1,
  },
  levelDesc: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 1,
    lineHeight: 15,
  },
  levelCardProgressSection: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 8,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  levelCardProgressTrack: {
    height: 6,
    borderRadius: radii.pill,
    backgroundColor: '#E2E8F0',
    overflow: 'hidden',
    marginBottom: 4,
  },
  levelCardProgressFill: {
    height: '100%',
    borderRadius: radii.pill,
  },
  levelCardProgressMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  levelCardProgressText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10,
    color: colors.textMuted,
  },
  levelCardPercentText: {
    fontFamily: fonts.mono,
    fontSize: 10.5,
    fontWeight: 'bold',
  },

  /* Economy Trio Stats */
  economyStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 8,
  },
  economyStatBox: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: radii.md,
    paddingVertical: 10,
    paddingHorizontal: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  economyStatIcon: {
    width: 24,
    height: 24,
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
  economyStatSubLabel: {
    fontFamily: fonts.mono,
    fontSize: 8.5,
    color: '#94A3B8',
    marginTop: 1,
  },

  /* 2. Today Daily Goal Widget */
  dailyGoalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: spacing.md,
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
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#0284C7',
  },
  dailyGoalTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 13.5,
    color: colors.textHeading,
  },
  goalPercentBadge: {
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radii.pill,
  },
  goalPercentText: {
    fontFamily: fonts.mono,
    fontSize: 11,
    fontWeight: 'bold',
    color: '#0369A1',
  },
  goalProgressBarTrack: {
    height: 7,
    backgroundColor: '#F1F5F9',
    borderRadius: radii.pill,
    overflow: 'hidden',
    marginBottom: 6,
  },
  goalProgressBarFill: {
    height: '100%',
    backgroundColor: '#0EA5E9',
    borderRadius: radii.pill,
  },
  dailyGoalHint: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10.5,
    color: colors.textMuted,
    lineHeight: 15,
  },

  /* 2b. 360° CEFR Skills Radar */
  radarCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1.5,
    borderColor: '#EEF2FF',
    gap: 4,
  },
  radarHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  radarTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  radarTagText: {
    fontFamily: fonts.mono,
    fontSize: 9.5,
    fontWeight: 'bold',
    color: colors.brand,
  },
  radarLevelBadge: {
    fontFamily: fonts.headingBold,
    fontSize: 10,
    color: colors.brand,
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.pill,
  },
  radarTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 14,
    color: colors.textHeading,
    marginTop: 2,
  },
  radarSub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
    marginBottom: 4,
  },
  radarChartWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },

  /* 3. 4'lü Temel Gelişim Kasası (Full-Width Bento Stack) */
  hubStack: {
    gap: 10,
  },
  hubCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    gap: 12,
  },
  hubIconBg: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  hubThumbImage: {
    width: 30,
    height: 30,
  },
  hubContent: {
    flex: 1,
  },
  hubTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 14,
    color: colors.textHeading,
  },
  hubDesc: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
  },
  hubRightCol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  hubCountPill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radii.pill,
    borderWidth: 1,
  },
  hubCountText: {
    fontFamily: fonts.mono,
    fontSize: 10,
    fontWeight: 'bold',
  },

  /* 4. VIP Stage Pass Banner */
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

  /* Sections */
  section: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 15,
    color: colors.textHeading,
    marginBottom: spacing.xs,
  },

  /* Avatars */
  avatarScroll: {
    gap: 10,
    paddingVertical: 4,
  },
  avatarOption: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 8,
    width: 76,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    position: 'relative',
  },
  avatarOptionSelected: {
    borderColor: colors.brand,
    backgroundColor: '#EEF2FF',
  },
  avatarThumb: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginBottom: 4,
  },
  avatarName: {
    fontFamily: fonts.headingBold,
    fontSize: 10,
    color: colors.textMuted,
    textAlign: 'center',
  },
  avatarNameSelected: {
    color: colors.brand,
  },
  avatarCheckBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* Stats Rows */
  statsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: radii.md,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  statBigNumber: {
    fontFamily: fonts.headingBold,
    fontSize: 18,
    color: colors.textHeading,
  },
  statBoxLabel: {
    fontFamily: fonts.bodyRegular,
    fontSize: 9.5,
    color: colors.textMuted,
    marginTop: 2,
    textAlign: 'center',
  },

  /* Settings Card */
  settingsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 12,
  },
  settingTextCol: {
    flex: 1,
  },
  settingLabel: {
    fontFamily: fonts.headingBold,
    fontSize: 13,
    color: colors.textHeading,
  },
  settingDesc: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10.5,
    color: colors.textMuted,
    marginTop: 1,
  },
  settingDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginLeft: 46,
  },
  logoutButton: {
    marginTop: 4,
  },

  /* Modal Base */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'flex-end',
  },
  guideModalCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
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
    fontSize: 17,
    color: colors.textHeading,
  },
  guideModalSub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 1,
  },
  closeGuideBtn: {
    padding: 6,
    borderRadius: radii.pill,
    backgroundColor: '#F1F5F9',
  },
  guideScroll: {
    gap: 12,
    paddingBottom: 20,
  },
  guideBlock: {
    backgroundColor: '#F8FAFC',
    borderRadius: radii.lg,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  guideBlockHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  guideBlockIcon: {
    width: 28,
    height: 28,
    marginRight: 8,
  },
  guideBlockTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 13.5,
    color: colors.textHeading,
  },
  guideBlockTag: {
    fontFamily: fonts.mono,
    fontSize: 9.5,
    color: colors.textMuted,
  },
  guideBlockBody: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11.5,
    color: colors.textBody,
    lineHeight: 16,
    marginBottom: 6,
  },
  guideBulletBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.md,
    padding: 8,
    gap: 4,
  },
  guideBullet: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10.5,
    color: colors.textBody,
    lineHeight: 15,
  },

  /* Name Modal */
  nameModalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    marginHorizontal: spacing.md,
    marginBottom: 'auto',
    marginTop: 'auto',
    padding: spacing.lg,
  },
  nameModalTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 16,
    color: colors.textHeading,
    marginBottom: 4,
  },
  nameModalSub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  nameInput: {
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: radii.md,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontFamily: fonts.headingBold,
    fontSize: 14,
    color: colors.textHeading,
    marginBottom: spacing.md,
  },
  nameModalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 10,
  },
  nameModalCancelBtn: {
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  nameModalCancelText: {
    fontFamily: fonts.headingBold,
    fontSize: 13,
    color: colors.textMuted,
  },
  nameModalSaveBtn: {
    paddingHorizontal: 18,
  },

  /* Level Modal Base */
  levelModalCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    padding: spacing.lg,
    maxHeight: '88%',
  },
  levelModalTabRow: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: radii.pill,
    padding: 3,
    marginBottom: spacing.md,
    gap: 4,
  },
  levelModalTabBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelModalTabBtnActive: {
    backgroundColor: '#FFFFFF',
    ...shadow.card,
  },
  levelModalTabText: {
    fontFamily: fonts.headingBold,
    fontSize: 11.5,
    color: colors.textMuted,
  },
  levelModalTabTextActive: {
    color: colors.brand,
  },
  levelOptionsScroll: {
    gap: 10,
    paddingBottom: 24,
  },

  /* Level Progress Report Tab */
  levelReportHero: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(226, 232, 240, 0.9)',
    marginBottom: spacing.sm,
  },
  levelReportHeroLeft: {
    position: 'relative',
    width: 54,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelReportHeroShield: {
    width: 50,
    height: 50,
  },
  levelReportHeroContent: {
    flex: 1,
  },
  levelOptionBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  levelOptionCode: {
    fontFamily: fonts.mono,
    fontSize: 12,
    fontWeight: 'bold',
  },
  levelOptionTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 13,
    color: colors.textHeading,
  },
  levelOptionDesc: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
  },
  levelTargetDays: {
    fontFamily: fonts.mono,
    fontSize: 10,
    color: colors.brand,
    marginTop: 4,
    fontWeight: 'bold',
  },
  levelProgressBlock: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: spacing.md,
  },
  levelProgressLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  levelProgressLabel: {
    fontFamily: fonts.headingBold,
    fontSize: 12.5,
    color: colors.textHeading,
  },
  levelProgressPercent: {
    fontFamily: fonts.mono,
    fontSize: 13,
    fontWeight: 'bold',
  },
  levelProgressTrack: {
    height: 8,
    borderRadius: radii.pill,
    backgroundColor: '#E2E8F0',
    overflow: 'hidden',
  },
  levelProgressFill: {
    height: '100%',
    borderRadius: radii.pill,
  },
  levelEstimateText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 6,
  },
  levelUpBox: {
    backgroundColor: '#ECFDF5',
    borderRadius: 16,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    marginBottom: spacing.md,
  },
  levelUpTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 15,
    color: '#065F46',
  },
  levelUpDesc: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: '#047857',
    marginTop: 4,
    lineHeight: 17,
  },
  remainingSectionTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 13,
    color: colors.textHeading,
    marginBottom: 8,
  },
  remainingTopicRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 6,
  },
  remainingTopicRowDone: {
    backgroundColor: '#F0FDF4',
    borderColor: '#BBF7D0',
  },
  remainingTopicTextCol: {
    flex: 1,
  },
  remainingTopicCode: {
    fontFamily: fonts.mono,
    fontSize: 9.5,
    fontWeight: 'bold',
    color: colors.brand,
  },
  remainingTopicTitle: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12.5,
    color: colors.textHeading,
    marginTop: 1,
  },
  remainingTopicHint: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10,
    color: '#D97706',
    marginTop: 2,
  },

  /* ALL CEFR LEVELS GALLERY */
  allLevelsContainer: {
    gap: 10,
  },
  allLevelsIntro: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 4,
  },
  levelGalleryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    gap: 12,
  },
  levelGalleryCardLocked: {
    opacity: 0.55,
  },
  levelGalleryLeft: {
    position: 'relative',
    width: 52,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelGalleryShield: {
    width: 48,
    height: 48,
  },
  levelGalleryBadge: {
    position: 'absolute',
    bottom: -2,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: radii.pill,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  levelGalleryBadgeText: {
    fontFamily: fonts.mono,
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  levelGalleryContent: {
    flex: 1,
  },
  levelGalleryHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  levelGalleryTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 13.5,
    color: colors.textHeading,
  },
  levelGalleryActivePill: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  levelGalleryActiveText: {
    fontFamily: fonts.mono,
    fontSize: 9,
    fontWeight: 'bold',
    color: '#047857',
  },
  levelGalleryEnTitle: {
    fontFamily: fonts.mono,
    fontSize: 10,
    color: colors.textMuted,
    marginTop: 1,
  },
  levelGalleryDesc: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
    lineHeight: 15,
  },
  levelGalleryMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  levelGalleryDays: {
    fontFamily: fonts.mono,
    fontSize: 9.5,
    color: '#64748B',
  },
  levelGallerySwitchBtn: {
    fontFamily: fonts.headingBold,
    fontSize: 11,
  },
});
