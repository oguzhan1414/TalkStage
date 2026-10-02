import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';
import { Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { avatarImages, studyStudioLounge } from '../assets/images';
import { Toast } from '../components/Toast';
import { useAuth } from '../context/AuthContext';
import {
  ALL_SPEAKING_TOPIC_CODES,
  ALL_TOPIC_CODES,
  CEFR_CURRICULUM,
  computeFullCompletion,
} from '@talkstage/shared-data/curriculumData';
import { buildMissionsForLevel } from '../data/writingCurriculum';
import { api } from '../lib/api';
import { pullLearningFlags } from '../lib/learningFlags';
import type { CalendarScreenProps } from '../navigation/types';
import { colors, fonts, radii, shadow, spacing } from '../theme/tokens';
import type { ProfileOut, ProgressOut, ReadingPassageOut, VocabCardOut } from '../types/api';

type CalendarViewMode = 'daily' | 'monthly';
type DailyMood = 'fire' | 'happy' | 'neutral' | 'tired';

const MOOD_CONFIG: Record<DailyMood, { emoji: string; label: string; bg: string }> = {
  fire: { emoji: '🔥', label: 'Harika Geçti!', bg: 'rgba(249, 115, 22, 0.2)' },
  happy: { emoji: '😊', label: 'Güzel & Akıcı', bg: 'rgba(16, 185, 129, 0.2)' },
  neutral: { emoji: '😐', label: 'Orta / İdare Eder', bg: 'rgba(245, 158, 11, 0.2)' },
  tired: { emoji: '🥱', label: 'Zor / Yorucu', bg: 'rgba(148, 163, 184, 0.2)' },
};

const WEEKDAY_LABELS = ['Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct', 'Pz'];
const MOODS_STORAGE_KEY = 'talkstage_daily_moods';

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function toDateKey(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function toIsoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function missionCompletedKey(id: string): string {
  return `mission_completed_${id}`;
}

type DaySchedule = {
  dayLabel: string;
  subtitle: string;
  readingTitle: string;
  readingDesc: string;
  readingSlug: string | null;
  readingMinutes: number;
  readingDone: boolean;
  chatTitle: string;
  chatDesc: string;
  chatMissionId: string | null;
  chatMinutes: number;
  chatDone: boolean;
  vocabTitle: string;
  vocabDesc: string;
  vocabMinutes: number;
  vocabDone: boolean;
  grammarCode: string;
  grammarTitle: string;
  grammarFormula: string;
  grammarMinutes: number;
  grammarDone: boolean;
};

export function CalendarScreen({ navigation }: CalendarScreenProps) {
  const { session } = useAuth();
  const queryClient = useQueryClient();
  const [viewMode, setViewMode] = useState<CalendarViewMode>('daily');
  const [selectedDayOffset, setSelectedDayOffset] = useState<number>(0); // 0 = Today, 1 = Tomorrow
  const [cursor, setCursor] = useState(() => new Date());
  const [savedMoods, setSavedMoods] = useState<Record<string, DailyMood>>({});
  const [missionCompletedIds, setMissionCompletedIds] = useState<Set<string>>(new Set());
  const [chatCompletedCodes, setChatCompletedCodes] = useState<Set<string>>(new Set());
  const [lessonQuizDoneCodes, setLessonQuizDoneCodes] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState<string | null>(null);

  const todayIso = toIsoDate(new Date());
  const year = cursor.getFullYear();
  const month = cursor.getMonth();

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  // Load persisted daily moods — no fake seed data. A fresh install/account
  // genuinely has no history yet, and should look like it.
  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      AsyncStorage.getItem(MOODS_STORAGE_KEY).then((raw) => {
        if (cancelled || !raw) return;
        try {
          setSavedMoods(JSON.parse(raw));
        } catch {
          // ignore corrupt local data
        }
      });
      return () => {
        cancelled = true;
      };
    }, [])
  );

  const handleSelectMood = async (mood: DailyMood) => {
    const updated = { ...savedMoods, [todayIso]: mood };
    setSavedMoods(updated);
    await AsyncStorage.setItem(MOODS_STORAGE_KEY, JSON.stringify(updated));
  };

  // Editable weekly study plan (0=Pt..6=Pz, matches WEEKDAY_LABELS order) —
  // purely an intention the user sets, never a stored practice record, so it
  // can never render a future day as "completed" that hasn't happened yet.
  const toggleStudyDay = async (dayIdx: number) => {
    const current = new Set(profile?.study_days ?? []);
    if (current.has(dayIdx)) {
      current.delete(dayIdx);
    } else {
      current.add(dayIdx);
    }
    const updated = Array.from(current).sort((a, b) => a - b);
    try {
      await api.patch('/me', { study_days: updated });
      queryClient.invalidateQueries({ queryKey: ['me'] });
    } catch {
      showToast('Plan güncellenemedi, tekrar dene');
    }
  };

  const { data: profile } = useQuery({
    queryKey: ['me'],
    queryFn: () => api.get<ProfileOut>('/me'),
  });

  const { data: progress } = useQuery({
    queryKey: ['progress'],
    queryFn: () => api.get<ProgressOut[]>('/progress'),
  });

  const { data: readingPassages } = useQuery({
    queryKey: ['reading'],
    queryFn: () => api.get<ReadingPassageOut[]>('/reading'),
  });

  const { data: completedReadingSlugs } = useQuery({
    queryKey: ['reading', 'completed'],
    queryFn: () => api.get<string[]>('/reading/completed-slugs'),
  });

  const { data: vocabCards } = useQuery({
    queryKey: ['vocab-cards', 'all'],
    queryFn: () => api.get<VocabCardOut[]>('/vocab-cards?all=true'),
  });

  const level = profile?.cefr_level ?? 'A1';
  const curriculum = CEFR_CURRICULUM[level] ?? CEFR_CURRICULUM.A1;
  const missions = useMemo(() => buildMissionsForLevel(level), [level]);

  const savedWordsLower = useMemo(
    () => new Set((vocabCards ?? []).map((c) => c.term.trim().toLowerCase())),
    [vocabCards]
  );

  // Same real lock sequence as ReadingListScreen (`GET /reading` +
  // `GET /reading/completed-slugs`, first not-completed = current).
  const passages = readingPassages ?? [];
  const completedSlugSet = useMemo(
    () => new Set(completedReadingSlugs ?? []),
    [completedReadingSlugs]
  );
  const completedReadingCountForLevel = passages.filter(
    (p) => (p.cefr_level ?? 'A1') === level && completedSlugSet.has(p.slug)
  ).length;

  // Single source of truth for "is this topic REALLY done" — same rule the
  // Sahneler roadmap and Profile's level report use (see `computeFullCompletion`
  // in curriculumData.ts): vocab presence alone isn't enough for
  // speaking/reading topics anymore, they also need a real finished chat or
  // reading passage.
  const fullCompletion = useMemo(
    () =>
      computeFullCompletion(
        curriculum.topics,
        savedWordsLower,
        chatCompletedCodes,
        completedReadingCountForLevel,
        lessonQuizDoneCodes
      ),
    [curriculum.topics, savedWordsLower, chatCompletedCodes, completedReadingCountForLevel, lessonQuizDoneCodes]
  );
  const firstIncompleteTopicIdx = curriculum.topics.findIndex((t) => !fullCompletion[t.code]);
  const todayTopicIdx = firstIncompleteTopicIdx === -1 ? curriculum.topics.length - 1 : firstIncompleteTopicIdx;
  const todayTopic = curriculum.topics[todayTopicIdx];
  const tomorrowTopic = curriculum.topics[todayTopicIdx + 1] ?? todayTopic;

  const firstIncompleteReadingIdx = passages.findIndex((p) => !completedSlugSet.has(p.slug));
  const todayReadingIdx =
    firstIncompleteReadingIdx === -1 ? Math.max(0, passages.length - 1) : firstIncompleteReadingIdx;
  const todayReading = passages[todayReadingIdx];
  const tomorrowReading = passages[todayReadingIdx + 1] ?? todayReading;

  // Reload which missions/topic-chats are already completed every time this
  // screen regains focus (e.g. returning from a finished TextChat session) —
  // same AsyncStorage signals TextChatScreen writes to.
  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      const ids = [...new Set(missions.map((m) => m.id))];
      // Recover server-backed flags first (survives reinstalls/second devices),
      // then read the merged AsyncStorage state — see lib/learningFlags.ts.
      pullLearningFlags().then(() => {
        if (cancelled) return;
        AsyncStorage.multiGet(ids.map(missionCompletedKey)).then((pairs) => {
          if (cancelled) return;
          setMissionCompletedIds(new Set(pairs.filter(([, v]) => v === '1').map(([k]) => k)));
        });
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
      });
      return () => {
        cancelled = true;
      };
    }, [missions])
  );

  const buildSchedule = (dayLabel: string, topic: typeof todayTopic, reading: ReadingPassageOut | undefined): DaySchedule => {
    const mission = missions.find((m) => m.grammarCode === topic?.code);
    const vocabPreview = topic?.targetWords.slice(0, 5).join(', ') ?? '';
    return {
      dayLabel,
      subtitle: topic?.title ?? '',
      readingTitle: reading?.title ?? 'Yeni içerik yakında',
      readingDesc: reading ? `${reading.cefr_level ?? level} • ~${reading.estimated_minutes} dk okuma` : '',
      readingSlug: reading?.slug ?? null,
      readingMinutes: reading?.estimated_minutes ?? 0,
      readingDone: reading ? completedSlugSet.has(reading.slug) : false,
      chatTitle: mission?.title ?? topic?.title ?? '',
      chatDesc: mission ? `${mission.roleName} ile ${mission.goals.length} hedefli sohbet` : '',
      chatMissionId: mission?.id ?? null,
      chatMinutes: 3,
      chatDone: mission ? missionCompletedIds.has(missionCompletedKey(mission.id)) : false,
      vocabTitle: topic ? `${topic.targetWords.length} Hedef Kelime` : '',
      vocabDesc: vocabPreview,
      vocabMinutes: 3,
      vocabDone: topic ? (fullCompletion[topic.code] ?? false) : false,
      grammarCode: topic?.code ?? '',
      grammarTitle: topic?.title ?? '',
      grammarFormula: topic?.formula ?? '',
      grammarMinutes: 5,
      grammarDone: topic ? (fullCompletion[topic.code] ?? false) : false,
    };
  };

  const todaySchedule = buildSchedule('Bugün', todayTopic, todayReading);
  const tomorrowSchedule = buildSchedule('Yarın', tomorrowTopic, tomorrowReading);
  const activeSchedule = selectedDayOffset === 0 ? todaySchedule : tomorrowSchedule;

  const displayName =
    profile?.display_name ??
    (session?.user.user_metadata?.full_name as string | undefined)?.split(' ')[0] ??
    'Öğrenci';

  const practicedDates = new Set((progress ?? []).map((p) => p.practice_date));
  // Success criterion for a calendar day: hitting the user's own daily
  // target (already collected at onboarding, previously unused by the
  // calendar) rather than just "some activity happened" — see
  // handleDayPress/grid rendering below for the goalMet/partial split.
  const goalMinutes = profile?.daily_target_minutes ?? 15;
  const studyDays = profile?.study_days ?? null;
  const totalDays = daysInMonth(year, month);
  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7; // Monday = 0
  const cells: (number | null)[] = [
    ...Array(firstWeekday).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ];
  const monthLabel = cursor.toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' });

  // Completed tasks count for the selected day — all 4 derived from real
  // signals above, no hardcoded true/false.
  const completedTasksCount = [
    activeSchedule.readingDone,
    activeSchedule.chatDone,
    activeSchedule.vocabDone,
    activeSchedule.grammarDone,
  ].filter(Boolean).length;
  const completionPercent = Math.round((completedTasksCount / 4) * 100);

  const currentTodayMood = savedMoods[todayIso];

  const moodCounts = Object.values(savedMoods).reduce(
    (acc, m) => {
      acc[m] = (acc[m] || 0) + 1;
      return acc;
    },
    {} as Record<DailyMood, number>
  );
  const hasAnyMoodHistory = Object.keys(savedMoods).length > 0;

  const handleLaunchChat = (missionId: string | null) => {
    const matched = missionId ? missions.find((m) => m.id === missionId) : undefined;
    if (matched) {
      navigation.navigate('TextChat', {
        dailyTask: {
          id: matched.id,
          title: matched.title,
          roleName: matched.roleName,
          roleBio: matched.roleBio,
          scenario: matched.scenario,
          goals: matched.goals,
          openingEn: matched.openingEn,
          openingTr: matched.openingTr,
        },
      });
    } else {
      navigation.navigate('TextChat');
    }
  };

  const handleDayPress = (day: number) => {
    const isoKey = toDateKey(year, month, day);
    if (isoKey === todayIso) {
      setSelectedDayOffset(0);
      setViewMode('daily');
      return;
    }
    // Past/future days don't have a per-day breakdown (the daily plan only
    // ever covers today/tomorrow) — show what's actually known about that
    // day instead of silently jumping to today's unrelated plan.
    const dayProgress = (progress ?? []).find((p) => p.practice_date === isoKey);
    const minutesThatDay = dayProgress?.minutes_practiced ?? 0;
    const practiced = practicedDates.has(isoKey);
    const goalMet = practiced && minutesThatDay >= goalMinutes;
    const mood = savedMoods[isoKey];
    const isFuture = isoKey > todayIso;
    if (mood) {
      showToast(`${day} ${monthLabel}: ${MOOD_CONFIG[mood].emoji} ${MOOD_CONFIG[mood].label}`);
    } else if (isFuture) {
      const weekdayIdx = (new Date(year, month, day).getDay() + 6) % 7;
      const planned = studyDays?.includes(weekdayIdx) ?? false;
      showToast(
        planned
          ? `${day} ${monthLabel}: planladığın bir çalışma günü 📅`
          : `${day} ${monthLabel}: henüz gelmedi`
      );
    } else if (goalMet) {
      showToast(`${day} ${monthLabel}: hedefine ulaştın ✓ (${minutesThatDay} dk)`);
    } else if (practiced) {
      showToast(`${day} ${monthLabel}: biraz pratik yaptın (${minutesThatDay}/${goalMinutes} dk)`);
    } else {
      showToast(`${day} ${monthLabel}: pratik yapılmadı`);
    }
  };

  return (
    <View style={styles.container}>
      {/* 1. Cozy Study Lounge Studio Background */}
      <ImageBackground source={studyStudioLounge} style={styles.backgroundImage} resizeMode="cover">
        <View style={styles.backdropOverlay} />

        <SafeAreaView style={styles.safeArea}>
          {/* Top Header Navigation */}
          <View style={styles.topHeader}>
            <Pressable
              onPress={() => navigation.goBack()}
              hitSlop={12}
              style={[styles.circularBackBtn, shadow.card]}
            >
              <Ionicons name="chevron-back" size={20} color="#FFFFFF" />
            </Pressable>

            <View style={styles.headerTitleContainer}>
              <Text style={styles.headerTitle}>Çalışma Stüdyosu & Plan</Text>
              <Text style={styles.headerSub}>CEFR {level} • Kişisel Günlük Program</Text>
            </View>

            <View style={styles.streakCapsule}>
              <Text style={styles.streakFire}>🔥</Text>
              <Text style={styles.streakNum}>{profile?.streak_count ?? 0}</Text>
            </View>
          </View>

          {/* Segmented View Switcher: Günlük Plan vs Aylık Takvim */}
          <View style={styles.tabSwitchWrapper}>
            <View style={styles.tabSwitchGlass}>
              <Pressable
                onPress={() => setViewMode('daily')}
                style={[styles.tabSwitchBtn, viewMode === 'daily' && styles.tabSwitchBtnActive]}
              >
                <Text
                  style={[
                    styles.tabSwitchText,
                    viewMode === 'daily' && styles.tabSwitchTextActive,
                  ]}
                >
                  📋 Günlük Ders Planı
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setViewMode('monthly')}
                style={[styles.tabSwitchBtn, viewMode === 'monthly' && styles.tabSwitchBtnActive]}
              >
                <Text
                  style={[
                    styles.tabSwitchText,
                    viewMode === 'monthly' && styles.tabSwitchTextActive,
                  ]}
                >
                  📅 Aylık Takvim & Emojiler
                </Text>
              </Pressable>
            </View>
          </View>

          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            {/* ======================================================== */}
            {/* VIEW 1: DAILY LESSON STUDIO & 4 PILLARS (ODAK MODU)     */}
            {/* ======================================================== */}
            {viewMode === 'daily' ? (
              <View>
                {/* 1. Personalized Hero Studio Card */}
                <View style={[styles.personalizedHeroCard, shadow.card]}>
                  <View style={styles.heroTopRow}>
                    <View style={styles.heroAvatarWrap}>
                      <Image source={avatarImages.maleDev} style={styles.heroAvatar} resizeMode="contain" />
                      <View style={styles.activePillDot} />
                    </View>

                    <View style={styles.heroTextCol}>
                      <Text style={styles.heroGreeting}>Selam {displayName} 👋</Text>
                      <Text style={styles.heroTargetDesc} numberOfLines={1}>
                        {activeSchedule.dayLabel} • {activeSchedule.subtitle}
                      </Text>
                    </View>

                    <View style={styles.levelBadgeMini}>
                      <Text style={styles.levelBadgeText}>🌱 {level}</Text>
                    </View>
                  </View>

                  {/* Progress Row */}
                  <View style={styles.heroProgressRow}>
                    <View style={styles.progressLabelCol}>
                      <Text style={styles.progressScoreText}>
                        %{completionPercent} Tamamlandı
                      </Text>
                      <Text style={styles.progressTasksCount}>
                        {completedTasksCount}/4 Ders İstasyonu Bitti
                      </Text>
                    </View>

                    <View style={styles.xpRewardTag}>
                      <Text style={styles.xpRewardText}>Gerçek XP kazandırır ⚡</Text>
                    </View>
                  </View>

                  <View style={styles.progressBarTrack}>
                    <View style={[styles.progressBarGlow, { width: `${completionPercent}%` }]} />
                  </View>
                </View>

                {/* 2. Today's Mood Reflection Selector (Günün Emojisini Seç!) */}
                {selectedDayOffset === 0 && (
                  <View style={[styles.moodPickerCard, shadow.card]}>
                    <View style={styles.moodPickerHeaderRow}>
                      <Text style={styles.moodPickerTitle}>
                        {currentTodayMood ? 'Bugünkü Hissiyatın:' : 'Günün Değerlendirmesi 🎯'}
                      </Text>
                      <Text style={styles.moodPickerSub}>
                        {currentTodayMood
                          ? `${MOOD_CONFIG[currentTodayMood].emoji} ${MOOD_CONFIG[currentTodayMood].label}`
                          : 'Pratiğin nasıl geçti? Emojini seç!'}
                      </Text>
                    </View>

                    <View style={styles.moodButtonsRow}>
                      {(['fire', 'happy', 'neutral', 'tired'] as DailyMood[]).map((m) => {
                        const isSelected = currentTodayMood === m;
                        const config = MOOD_CONFIG[m];

                        return (
                          <Pressable
                            key={m}
                            onPress={() => handleSelectMood(m)}
                            style={[
                              styles.moodBtn,
                              isSelected && {
                                backgroundColor: config.bg,
                                borderColor: '#F59E0B',
                                borderWidth: 2,
                              },
                            ]}
                          >
                            <Text style={styles.moodEmoji}>{config.emoji}</Text>
                            <Text style={[styles.moodBtnText, isSelected && styles.moodBtnTextActive]}>
                              {config.label.split('/')[0].trim()}
                            </Text>
                          </Pressable>
                        );
                      })}
                    </View>
                  </View>
                )}

                {/* 3. Day Selector Strip (ONLY TODAY & TOMORROW) */}
                <View style={styles.dateSelectorRow}>
                  {[
                    { offset: 0, label: 'Bugün 🎯' },
                    { offset: 1, label: 'Yarın 🔮' },
                  ].map((item) => (
                    <Pressable
                      key={item.offset}
                      onPress={() => setSelectedDayOffset(item.offset)}
                      style={[
                        styles.dateSelectorChip,
                        selectedDayOffset === item.offset && styles.dateSelectorChipActive,
                      ]}
                    >
                      <Text
                        style={[
                          styles.dateSelectorText,
                          selectedDayOffset === item.offset && styles.dateSelectorTextActive,
                        ]}
                      >
                        {item.label}
                      </Text>
                    </Pressable>
                  ))}
                </View>

                {/* 4. The 4 Modern Glassmorphic Lesson Stations */}
                <View style={styles.stationsContainer}>
                  {/* STATION 1: SMART READING */}
                  <View style={[styles.stationGlassCard, shadow.card]}>
                    <View style={styles.stationTopRow}>
                      <View style={[styles.stationTypeBadge, { backgroundColor: 'rgba(6, 182, 212, 0.15)' }]}>
                        <Text style={[styles.stationTypeBadgeText, { color: '#06B6D4' }]}>
                          📖 1. SMART READING
                        </Text>
                      </View>

                      <View
                        style={[
                          styles.stationStatusPill,
                          activeSchedule.readingDone ? styles.statusDone : styles.statusPending,
                        ]}
                      >
                        <Text style={styles.stationStatusText}>
                          {activeSchedule.readingDone ? '✓ Tamamlandı' : `⏱️ ~${activeSchedule.readingMinutes} Dk`}
                        </Text>
                      </View>
                    </View>

                    <Text style={styles.stationTitle}>{activeSchedule.readingTitle}</Text>
                    <Text style={styles.stationDesc}>{activeSchedule.readingDesc}</Text>

                    <Pressable
                      onPress={() =>
                        activeSchedule.readingSlug
                          ? navigation.navigate('ReadingPassage', { slug: activeSchedule.readingSlug })
                          : navigation.navigate('ReadingList')
                      }
                      style={[styles.stationActionBtn, { backgroundColor: '#0284C7' }]}
                    >
                      <Ionicons name="book" size={16} color="#FFFFFF" />
                      <Text style={styles.stationActionText}>
                        {activeSchedule.readingDone ? 'Hikayeyi Tekrar Oku ➔' : 'Okuma Dersi Başlat ➔'}
                      </Text>
                    </Pressable>
                  </View>

                  {/* STATION 2: AI WRITING & CHAT */}
                  <View style={[styles.stationGlassCard, shadow.card]}>
                    <View style={styles.stationTopRow}>
                      <View style={[styles.stationTypeBadge, { backgroundColor: 'rgba(245, 158, 11, 0.15)' }]}>
                        <Text style={[styles.stationTypeBadgeText, { color: '#F59E0B' }]}>
                          💬 2. AI YAZMA & SOHBET
                        </Text>
                      </View>

                      <View
                        style={[
                          styles.stationStatusPill,
                          activeSchedule.chatDone ? styles.statusDone : styles.statusPending,
                        ]}
                      >
                        <Text style={styles.stationStatusText}>
                          {activeSchedule.chatDone ? '✓ Tamamlandı' : `${activeSchedule.chatMinutes} Tur`}
                        </Text>
                      </View>
                    </View>

                    <Text style={styles.stationTitle}>{activeSchedule.chatTitle}</Text>
                    <Text style={styles.stationDesc}>{activeSchedule.chatDesc}</Text>

                    <Pressable
                      onPress={() => handleLaunchChat(activeSchedule.chatMissionId)}
                      style={[styles.stationActionBtn, { backgroundColor: '#D97706' }]}
                    >
                      <Ionicons name="chatbubbles" size={16} color="#FFFFFF" />
                      <Text style={styles.stationActionText}>
                        {activeSchedule.chatDone ? 'Görevi Tekrar Yap ➔' : 'Yazma Görevine Başla ➔'}
                      </Text>
                    </Pressable>
                  </View>

                  {/* STATION 3: VOCABULARY CHEST */}
                  <View style={[styles.stationGlassCard, shadow.card]}>
                    <View style={styles.stationTopRow}>
                      <View style={[styles.stationTypeBadge, { backgroundColor: 'rgba(147, 51, 234, 0.15)' }]}>
                        <Text style={[styles.stationTypeBadgeText, { color: '#A855F7' }]}>
                          📦 3. KELİME SANDIĞI
                        </Text>
                      </View>

                      <View
                        style={[
                          styles.stationStatusPill,
                          activeSchedule.vocabDone ? styles.statusDone : styles.statusPending,
                        ]}
                      >
                        <Text style={styles.stationStatusText}>
                          {activeSchedule.vocabDone ? '✓ Sandıkta' : 'Sandığa Ekle'}
                        </Text>
                      </View>
                    </View>

                    <Text style={styles.stationTitle}>{activeSchedule.vocabTitle}</Text>
                    <Text style={styles.stationDesc}>{activeSchedule.vocabDesc}</Text>

                    <Pressable
                      onPress={() => navigation.navigate('Main', { screen: 'Vocab' })}
                      style={[styles.stationActionBtn, { backgroundColor: '#7C3AED' }]}
                    >
                      <Ionicons name="layers" size={16} color="#FFFFFF" />
                      <Text style={styles.stationActionText}>Kelimeleri Sandıkta Çalış ➔</Text>
                    </Pressable>
                  </View>

                  {/* STATION 4: GRAMMAR LESSON */}
                  <View style={[styles.stationGlassCard, shadow.card]}>
                    <View style={styles.stationTopRow}>
                      <View style={[styles.stationTypeBadge, { backgroundColor: 'rgba(16, 185, 129, 0.15)' }]}>
                        <Text style={[styles.stationTypeBadgeText, { color: '#10B981' }]}>
                          🎓 4. GRAMER ({activeSchedule.grammarCode})
                        </Text>
                      </View>

                      <View
                        style={[
                          styles.stationStatusPill,
                          activeSchedule.grammarDone ? styles.statusDone : styles.statusPending,
                        ]}
                      >
                        <Text style={styles.stationStatusText}>
                          {activeSchedule.grammarDone ? '✓ Tamamlandı' : 'Özet Notlar'}
                        </Text>
                      </View>
                    </View>

                    <Text style={styles.stationTitle}>{activeSchedule.grammarTitle}</Text>
                    <View style={styles.formulaGlassBox}>
                      <Text style={styles.formulaGlassText}>{activeSchedule.grammarFormula}</Text>
                    </View>

                    <Pressable
                      onPress={() => navigation.navigate('Main', { screen: 'Scenarios' })}
                      style={[styles.stationActionBtn, { backgroundColor: '#059669' }]}
                    >
                      <Ionicons name="school" size={16} color="#FFFFFF" />
                      <Text style={styles.stationActionText}>Seviye Haritasında Gör ➔</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            ) : (
              /* ======================================================== */
              /* VIEW 2: MONTHLY CALENDAR OVERVIEW WITH DAILY EMOJIS      */
              /* ======================================================== */
              <View style={styles.monthlyViewContainer}>
                {/* Journey Start & Summary Card */}
                <View style={[styles.journeySummaryCard, shadow.card]}>
                  <View style={styles.journeyHeaderRow}>
                    <Text style={styles.journeyTitle}>🌱 Öğrenme Yolculuğun</Text>
                    <Text style={styles.journeyDaysTotal}>
                      {profile?.streak_count ? `${profile.streak_count} Gün Aktif` : 'Yeni Başladın'}
                    </Text>
                  </View>

                  {hasAnyMoodHistory ? (
                    <View style={styles.moodStatsRow}>
                      <View style={styles.moodStatPill}>
                        <Text style={styles.moodStatEmoji}>🔥</Text>
                        <Text style={styles.moodStatText}>{moodCounts.fire ?? 0} Gün Harika</Text>
                      </View>
                      <View style={styles.moodStatPill}>
                        <Text style={styles.moodStatEmoji}>😊</Text>
                        <Text style={styles.moodStatText}>{moodCounts.happy ?? 0} Gün Güzel</Text>
                      </View>
                      <View style={styles.moodStatPill}>
                        <Text style={styles.moodStatEmoji}>😐</Text>
                        <Text style={styles.moodStatText}>{moodCounts.neutral ?? 0} Gün Orta</Text>
                      </View>
                    </View>
                  ) : (
                    <Text style={styles.calendarFooterNote}>
                      Henüz bir gün değerlendirmesi yapmadın — Günlük Ders Planı'ndan başlayabilirsin.
                    </Text>
                  )}
                </View>

                {/* Editable Weekly Study Plan — an intention the user sets,
                    never a stored practice record (see toggleStudyDay above) */}
                <View style={[styles.planCard, shadow.card]}>
                  <Text style={styles.planTitle}>📅 Haftalık Çalışma Planın</Text>
                  <Text style={styles.planSub}>
                    Hangi günler çalışmayı planlıyorsun? Takvimde o günler işaretlenir — dokunarak değiştir.
                  </Text>
                  <View style={styles.planDaysRow}>
                    {WEEKDAY_LABELS.map((label, idx) => {
                      const isPlanned = studyDays?.includes(idx) ?? false;
                      return (
                        <Pressable
                          key={idx}
                          onPress={() => toggleStudyDay(idx)}
                          style={[styles.planDayChip, isPlanned && styles.planDayChipActive]}
                        >
                          <Text
                            style={[styles.planDayChipText, isPlanned && styles.planDayChipTextActive]}
                          >
                            {label}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>
                  {!studyDays || studyDays.length === 0 ? (
                    <Text style={styles.planHint}>
                      Henüz bir plan seçmedin — gelecek günler için hiçbir şey varsayılmaz.
                    </Text>
                  ) : null}
                </View>

                {/* Month Navigator Header */}
                <View style={styles.monthNavRow}>
                  <Pressable onPress={() => setCursor(new Date(year, month - 1, 1))} hitSlop={8}>
                    <Ionicons name="chevron-back" size={22} color="#FFFFFF" />
                  </Pressable>
                  <Text style={styles.monthLabelText}>{monthLabel}</Text>
                  <Pressable onPress={() => setCursor(new Date(year, month + 1, 1))} hitSlop={8}>
                    <Ionicons name="chevron-forward" size={22} color="#FFFFFF" />
                  </Pressable>
                </View>

                {/* Weekday Row */}
                <View style={styles.weekdayGlassRow}>
                  {WEEKDAY_LABELS.map((d) => (
                    <Text key={d} style={styles.weekdayGlassText}>
                      {d}
                    </Text>
                  ))}
                </View>

                {/* Calendar Grid Cells with User Emojis */}
                <View style={styles.gridGlassContainer}>
                  {cells.map((day, i) => {
                    if (day === null) return <View key={`empty-${i}`} style={styles.gridCell} />;
                    const isoKey = toDateKey(year, month, day);
                    const dayProgress = (progress ?? []).find((p) => p.practice_date === isoKey);
                    const minutesThatDay = dayProgress?.minutes_practiced ?? 0;
                    const practiced = practicedDates.has(isoKey);
                    const goalMet = practiced && minutesThatDay >= goalMinutes;
                    const partialPractice = practiced && !goalMet;
                    const dayMood = savedMoods[isoKey];
                    const isToday =
                      new Date().getDate() === day &&
                      new Date().getMonth() === month &&
                      new Date().getFullYear() === year;
                    const isFuture = isoKey > todayIso;
                    const weekdayIdx = (new Date(year, month, day).getDay() + 6) % 7;
                    // Purely a visual echo of the user's own plan — never
                    // backed by a progress row, so it can't misrepresent a
                    // future day as something that already happened.
                    const isPlannedDay =
                      isFuture && !dayMood && !practiced && (studyDays?.includes(weekdayIdx) ?? false);

                    return (
                      <View key={day} style={styles.gridCell}>
                        <Pressable
                          onPress={() => handleDayPress(day)}
                          style={[
                            styles.dayGlassCircle,
                            isFuture && !isToday && styles.dayGlassFuture,
                            isPlannedDay && !isToday && styles.dayGlassPlanned,
                            partialPractice && !dayMood && styles.dayGlassPartial,
                            goalMet && !dayMood && styles.dayGlassPracticed,
                            isToday && !practiced && !dayMood && styles.dayGlassToday,
                            dayMood && { backgroundColor: MOOD_CONFIG[dayMood].bg, borderColor: '#F59E0B' },
                          ]}
                        >
                          {dayMood ? (
                            <Text style={styles.gridEmojiText}>{MOOD_CONFIG[dayMood].emoji}</Text>
                          ) : (
                            <Text
                              style={[
                                styles.dayGlassText,
                                isFuture && !isToday && styles.dayGlassTextFuture,
                                partialPractice && styles.dayGlassTextPartial,
                                goalMet && styles.dayGlassTextPracticed,
                                isToday && !practiced && styles.dayGlassTextToday,
                              ]}
                            >
                              {day}
                            </Text>
                          )}
                        </Pressable>
                      </View>
                    );
                  })}
                </View>

                <Text style={styles.calendarFooterNote}>
                  💡 Dolu yeşil: günlük hedefine ulaştın. Kenarlıklı yeşil: biraz pratik yaptın ama hedefin altında.
                  Kesikli çerçeve: planladığın ama henüz gelmemiş gün. Boş günler pratik yapılmayan günleri gösterir.
                </Text>
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>

      {toast ? <Toast message={toast} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  backdropOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.72)',
  },
  safeArea: {
    flex: 1,
  },

  /* 1. Top Header Navigation */
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xs,
    paddingBottom: spacing.xs,
  },
  circularBackBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleContainer: {
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 16,
    color: '#FFFFFF',
  },
  headerSub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 1,
  },
  streakCapsule: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(249, 115, 22, 0.2)',
    borderWidth: 1,
    borderColor: '#F97316',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radii.pill,
    gap: 4,
  },
  streakFire: {
    fontSize: 12,
  },
  streakNum: {
    fontFamily: fonts.headingBold,
    fontSize: 12,
    color: '#F97316',
  },

  /* Segmented Glass Switcher */
  tabSwitchWrapper: {
    paddingHorizontal: spacing.md,
    marginVertical: spacing.xs,
  },
  tabSwitchGlass: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: radii.pill,
    padding: 3,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  tabSwitchBtn: {
    flex: 1,
    paddingVertical: 7,
    alignItems: 'center',
    borderRadius: radii.pill,
  },
  tabSwitchBtnActive: {
    backgroundColor: '#FFFFFF',
    ...shadow.card,
  },
  tabSwitchText: {
    fontFamily: fonts.headingBold,
    fontSize: 11,
    color: '#94A3B8',
  },
  tabSwitchTextActive: {
    color: '#0F172A',
  },

  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xs,
    paddingBottom: 80,
  },

  /* Personalized Hero Studio Card */
  personalizedHeroCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.85)',
    borderRadius: 20,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    marginBottom: spacing.sm,
  },
  heroTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  heroAvatarWrap: {
    position: 'relative',
  },
  heroAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  activePillDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#1E293B',
  },
  heroTextCol: {
    flex: 1,
  },
  heroGreeting: {
    fontFamily: fonts.headingBold,
    fontSize: 15,
    color: '#FFFFFF',
  },
  heroTargetDesc: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 1,
  },
  levelBadgeMini: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: '#10B981',
  },
  levelBadgeText: {
    fontFamily: fonts.mono,
    fontSize: 10,
    fontWeight: 'bold',
    color: '#10B981',
  },

  heroProgressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabelCol: {},
  progressScoreText: {
    fontFamily: fonts.headingBold,
    fontSize: 13,
    color: '#10B981',
  },
  progressTasksCount: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10,
    color: '#94A3B8',
  },
  xpRewardTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radii.pill,
  },
  xpRewardText: {
    fontFamily: fonts.mono,
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FBBF24',
  },
  progressBarTrack: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarGlow: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 3,
  },

  /* Mood Reflection Card */
  moodPickerCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.85)',
    borderRadius: radii.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  moodPickerHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  moodPickerTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 12,
    color: '#FFFFFF',
  },
  moodPickerSub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: '#FBBF24',
  },
  moodButtonsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  moodBtn: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: radii.md,
    paddingVertical: 8,
    gap: 3,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  moodEmoji: {
    fontSize: 22,
  },
  moodBtnText: {
    fontFamily: fonts.mono,
    fontSize: 9,
    color: '#94A3B8',
  },
  moodBtnTextActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  /* Date Selector Strip (2 buttons) */
  dateSelectorRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  dateSelectorChip: {
    flex: 1,
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  dateSelectorChipActive: {
    borderColor: colors.brand,
    backgroundColor: colors.brand,
  },
  dateSelectorText: {
    fontFamily: fonts.headingBold,
    fontSize: 12,
    color: '#CBD5E1',
  },
  dateSelectorTextActive: {
    color: '#FFFFFF',
  },

  /* Modern Glassmorphic Stations */
  stationsContainer: {
    gap: 12,
  },
  stationGlassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 18,
    padding: spacing.md,
  },
  stationTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  stationTypeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.pill,
  },
  stationTypeBadgeText: {
    fontFamily: fonts.mono,
    fontSize: 9,
    fontWeight: 'bold',
  },
  stationStatusPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.pill,
  },
  statusDone: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
  },
  statusPending: {
    backgroundColor: '#F1F5F9',
  },
  stationStatusText: {
    fontFamily: fonts.mono,
    fontSize: 9,
    fontWeight: 'bold',
    color: '#059669',
  },
  stationTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 14,
    color: colors.textHeading,
    marginBottom: 2,
  },
  stationDesc: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
    marginBottom: 10,
    lineHeight: 15,
  },
  formulaGlassBox: {
    backgroundColor: '#F8FAFC',
    padding: 6,
    borderRadius: radii.sm,
    borderLeftWidth: 3,
    borderLeftColor: '#059669',
    marginBottom: 10,
  },
  formulaGlassText: {
    fontFamily: fonts.mono,
    fontSize: 10,
    color: '#059669',
    fontWeight: 'bold',
  },
  stationActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    borderRadius: radii.pill,
    gap: 6,
  },
  stationActionText: {
    fontFamily: fonts.headingBold,
    fontSize: 12,
    color: '#FFFFFF',
  },

  /* Monthly Overview Styles */
  monthlyViewContainer: {
    paddingTop: 4,
  },
  journeySummaryCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.85)',
    borderRadius: radii.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    marginBottom: 14,
  },
  journeyHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  journeyTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 14,
    color: '#FFFFFF',
  },
  journeyDaysTotal: {
    fontFamily: fonts.mono,
    fontSize: 11,
    fontWeight: 'bold',
    color: '#10B981',
  },
  moodStatsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  moodStatPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radii.pill,
    gap: 4,
  },
  moodStatEmoji: {
    fontSize: 13,
  },
  moodStatText: {
    fontFamily: fonts.mono,
    fontSize: 9,
    color: '#E2E8F0',
  },

  /* Editable Weekly Study Plan */
  planCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.85)',
    borderRadius: radii.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    marginBottom: 14,
  },
  planTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  planSub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10,
    color: '#94A3B8',
    marginBottom: 10,
    lineHeight: 14,
  },
  planDaysRow: {
    flexDirection: 'row',
    gap: 6,
  },
  planDayChip: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: radii.md,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  planDayChipActive: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    borderColor: '#10B981',
  },
  planDayChipText: {
    fontFamily: fonts.headingBold,
    fontSize: 11,
    color: '#94A3B8',
  },
  planDayChipTextActive: {
    color: '#10B981',
  },
  planHint: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10,
    color: '#64748B',
    marginTop: 8,
  },

  monthNavRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    marginBottom: 10,
  },
  monthLabelText: {
    fontFamily: fonts.headingBold,
    fontSize: 16,
    color: '#FFFFFF',
    textTransform: 'capitalize',
  },
  weekdayGlassRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  weekdayGlassText: {
    fontFamily: fonts.mono,
    fontSize: 10,
    color: '#94A3B8',
    width: `${100 / 7}%`,
    textAlign: 'center',
  },
  gridGlassContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'rgba(30, 41, 59, 0.85)',
    borderRadius: radii.lg,
    padding: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  gridCell: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayGlassCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  gridEmojiText: {
    fontSize: 18,
  },
  dayGlassPracticed: {
    backgroundColor: '#10B981',
  },
  dayGlassPartial: {
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    borderWidth: 1.5,
    borderColor: '#10B981',
  },
  dayGlassFuture: {
    opacity: 0.45,
  },
  dayGlassPlanned: {
    borderWidth: 1.5,
    borderColor: 'rgba(148, 163, 184, 0.6)',
    borderStyle: 'dashed',
    opacity: 1,
  },
  dayGlassToday: {
    borderWidth: 2,
    borderColor: '#38BDF8',
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
  },
  dayGlassText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: '#E2E8F0',
  },
  dayGlassTextPracticed: {
    color: '#FFFFFF',
    fontFamily: fonts.headingBold,
  },
  dayGlassTextPartial: {
    color: '#10B981',
    fontFamily: fonts.headingBold,
  },
  dayGlassTextFuture: {
    color: '#64748B',
  },
  dayGlassTextToday: {
    color: '#38BDF8',
    fontWeight: 'bold',
  },
  calendarFooterNote: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 14,
    lineHeight: 16,
  },
});
