import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, Image, ImageBackground, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import {
  cefrLevelImages,
  companionImage,
  scenarioCategoryImages,
  stateImages,
  verticalIslandPathBg,
} from '../assets/images';
import { BouncyPressable } from '../components/BouncyPressable';
import { Toast } from '../components/Toast';
import { SCENARIO_CATEGORIES, type ScenarioCategory } from '../constants/categories';
import { CEFR_LEVELS } from '../constants/cefr';
import {
  ALL_SPEAKING_TOPIC_CODES,
  ALL_TOPIC_CODES,
  CEFR_CURRICULUM,
  computeFullCompletion,
  type CurriculumTopic,
} from '../data/curriculumData';
import { SCENARIOS } from '../data/scenariosData';
import { ALL_GRAMMAR_LESSONS, findGrammarLesson } from '../data/grammarLessons';
import {
  CURRICULUM_VOCABULARY,
  findCurriculumWord,
  poolWordCount,
  type CefrVocabPool,
  type CurriculumVocabWord,
} from '../data/curriculumVocabulary';
import { api, ApiError } from '../lib/api';
import { haptics } from '../lib/haptics';
import { pullLearningFlags } from '../lib/learningFlags';
import type { MainTabScreenProps } from '../navigation/types';
import { cefrAura, cefrThemes, colors, fonts, radii, shadow, spacing } from '../theme/tokens';
import type {
  ProfileOut,
  ReadingPassageOut,
  ScenarioOut,
  SessionOut,
  VocabCardCreate,
  VocabCardOut,
} from '../types/api';


type TabView = 'curriculum' | 'categories';
type FilterId = ScenarioCategory | 'all';
type PosKey = keyof CefrVocabPool;

const POS_LABELS: Record<PosKey, string> = {
  nouns: 'İsimler',
  verbs: 'Fiiller',
  adjectives: 'Sıfatlar',
  adverbs: 'Zarflar',
  phrases: 'Kalıp İfadeler',
};

export function ScenariosScreen({ navigation }: MainTabScreenProps<'Scenarios'>) {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<TabView>('curriculum');
  const [selectedLevel, setSelectedLevel] = useState<string>('A1');
  const [categoryFilter, setCategoryFilter] = useState<FilterId>('all');
  const [catalogLevelFilter, setCatalogLevelFilter] = useState<string | 'all'>('all');
  const [catalogSearch, setCatalogSearch] = useState('');
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>(null);
  const [showVocabPool, setShowVocabPool] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [chatCompletedCodes, setChatCompletedCodes] = useState<Set<string>>(new Set());
  const [lessonQuizDoneCodes, setLessonQuizDoneCodes] = useState<Set<string>>(new Set());

  // Refreshed every time this screen regains focus (e.g. coming back from a
  // finished TextChat topic practice or a finished lesson quiz) — same
  // AsyncStorage signals TextChatScreen/GrammarLessonScreen write to.
  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      // Recover server-backed flags first (survives reinstalls/second devices),
      // then read the merged AsyncStorage state — see lib/learningFlags.ts.
      pullLearningFlags().then(() => {
        if (cancelled) return;
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
    }, [])
  );

  const [selectedTopicModal, setSelectedTopicModal] = useState<CurriculumTopic | null>(null);
  const [chestModalVisible, setChestModalVisible] = useState(false);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1600);
  };

  const { data: profile } = useQuery({
    queryKey: ['me'],
    queryFn: () => api.get<ProfileOut>('/me'),
  });

  const { data: allScenarios, isLoading: scenariosLoading } = useQuery({
    queryKey: ['scenarios', categoryFilter],
    queryFn: () =>
      api.get<ScenarioOut[]>(
        categoryFilter === 'all' ? '/scenarios' : `/scenarios?category=${categoryFilter}`
      ),
  });

  // Kept separate from the (possibly category-filtered) query above so
  // switching the Tab 2 category filter can never affect Tab 1's boss
  // challenge scenario lookup below.
  const { data: allScenariosUnfiltered } = useQuery({
    queryKey: ['scenarios', 'all'],
    queryFn: () => api.get<ScenarioOut[]>('/scenarios'),
  });

  // Real "already tried this one" signal for Tab 2's catalog cards — reuses
  // the session history that already backs the scorecard, no new endpoint.
  const { data: sessions } = useQuery({
    queryKey: ['sessions'],
    queryFn: () => api.get<SessionOut[]>('/sessions'),
  });
  const attemptedScenarioIds = new Set((sessions ?? []).map((s) => s.scenario_id));

  // Tab 2 catalog: category filter is already applied server-side (query key
  // above), level + free-text search narrow further client-side — cheap with
  // a catalog this size, no extra network round-trip per keystroke.
  const fallbackScenarios: ScenarioOut[] = SCENARIOS.map((s, idx) => ({
    id: s.id,
    slug: s.id,
    title: s.title,
    category: (s.category === 'interview' ? 'career' : s.category === 'business' ? 'b2b' : s.category) as any,
    description: s.description,
    cefr_level: s.level,
    estimated_minutes: s.durationMin,
    is_premium: false,
    cover_image_url: null,
    sort_order: idx + 1,
    ai_name: s.aiName,
    ai_role: s.aiRole,
    situation: s.situation,
    objectives: s.objectives.map((o) => ({ text: o.text, text_tr: o.textTr })),
    key_phrases: s.keyPhrases.map((k) => ({ en: k.en, tr: k.tr })),
    suggested_vocab: s.suggestedVocab.map((v) => ({ term: v.term, tr: v.tr })),
  }));

  const sourceScenarios = (allScenarios && allScenarios.length > 0) ? allScenarios : fallbackScenarios;
  const sourceAllUnfiltered = (allScenariosUnfiltered && allScenariosUnfiltered.length > 0) ? allScenariosUnfiltered : fallbackScenarios;

  const catalogSearchLower = catalogSearch.trim().toLowerCase();
  const filteredCatalogScenarios = sourceScenarios.filter((s) => {
    if (categoryFilter !== 'all' && s.category !== categoryFilter) return false;
    if (catalogLevelFilter !== 'all' && (s.cefr_level ?? 'A1') !== catalogLevelFilter) return false;
    if (!catalogSearchLower) return true;
    return (
      s.title.toLowerCase().includes(catalogSearchLower) ||
      (s.description ?? '').toLowerCase().includes(catalogSearchLower)
    );
  });
  const categoryCounts: Record<string, number> = {};
  for (const s of sourceAllUnfiltered) {
    categoryCounts[s.category] = (categoryCounts[s.category] ?? 0) + 1;
  }

  // Real signal for "did the user actually engage with this topic's
  // vocabulary" — reuses the same dedup-aware POST /vocab-cards endpoint
  // every other screen already uses, no new backend surface needed.
  const { data: allVocabCards } = useQuery({
    queryKey: ['vocab-cards', 'all'],
    queryFn: () => api.get<VocabCardOut[]>('/vocab-cards?all=true'),
  });

  // Real signal for "did the user actually finish a reading passage at this
  // level" — same queries/cache keys CalendarScreen already uses.
  const { data: readingPassages } = useQuery({
    queryKey: ['reading'],
    queryFn: () => api.get<ReadingPassageOut[]>('/reading'),
  });
  const { data: completedReadingSlugs } = useQuery({
    queryKey: ['reading', 'completed'],
    queryFn: () => api.get<string[]>('/reading/completed-slugs'),
  });

  const savedWordsSet = new Set((allVocabCards ?? []).map((c) => c.term.trim().toLowerCase()));
  const countSavedWords = (words: string[]) =>
    words.filter((w) => savedWordsSet.has(w.trim().toLowerCase())).length;

  const currentCurriculum = CEFR_CURRICULUM[selectedLevel] ?? CEFR_CURRICULUM.A1;
  const currentVocabPool = CURRICULUM_VOCABULARY[selectedLevel] ?? CURRICULUM_VOCABULARY.A1;
  const levelBadge = cefrLevelImages[selectedLevel] ?? cefrLevelImages.A1;

  const completedReadingSlugSet = new Set(completedReadingSlugs ?? []);
  const completedReadingCountForLevel = (readingPassages ?? []).filter(
    (p) => (p.cefr_level ?? 'A1') === selectedLevel && completedReadingSlugSet.has(p.slug)
  ).length;

  // Cross-level gate: a level ahead of the one the user started at (their
  // calibrated/current profile.cefr_level) only opens once the immediately
  // preceding level's topics are ALL genuinely done — the same "no skipping
  // ahead" rule topics already use within a single level (see isLocked
  // below), just applied one level up. Levels at or below the user's current
  // level always stay open for review.
  const isLevelFullyComplete = (lvl: string): boolean => {
    const topics = CEFR_CURRICULUM[lvl]?.topics ?? [];
    if (topics.length === 0) return false;
    const readingCount = (readingPassages ?? []).filter(
      (p) => (p.cefr_level ?? 'A1') === lvl && completedReadingSlugSet.has(p.slug)
    ).length;
    const completion = computeFullCompletion(
      topics,
      savedWordsSet,
      chatCompletedCodes,
      readingCount,
      lessonQuizDoneCodes
    );
    return topics.every((t) => completion[t.code]);
  };
  const userLevelIdx = Math.max(0, CEFR_LEVELS.indexOf(profile?.cefr_level ?? 'A1'));
  const isLevelLocked = (lvl: string): boolean => {
    const idx = CEFR_LEVELS.indexOf(lvl);
    if (idx <= userLevelIdx) return false;
    return !isLevelFullyComplete(CEFR_LEVELS[idx - 1]);
  };

  // Single source of truth for "is this topic REALLY done" — see
  // `computeFullCompletion` in curriculumData.ts for why vocab presence alone
  // isn't enough for speaking/reading topics anymore.
  const fullCompletion = computeFullCompletion(
    currentCurriculum.topics,
    savedWordsSet,
    chatCompletedCodes,
    completedReadingCountForLevel,
    lessonQuizDoneCodes
  );
  const practicedTopicsCount = currentCurriculum.topics.filter((t) => fullCompletion[t.code]).length;

  // Some hand-authored lesson docs (e.g. A2, B1) include a couple of extra
  // CEFR-relevant topics beyond the official curriculum's per-level topic
  // count (see `curriculumData.ts`'s "12+10+10+8+4+2 = 46" comment) — these
  // have no matching timeline card/mission, so they're surfaced here instead
  // of being silently unreachable in the app.
  const bonusLessons = ALL_GRAMMAR_LESSONS.filter(
    (l) =>
      l.code.startsWith(`${selectedLevel}_`) &&
      !currentCurriculum.topics.some((t) => t.code === l.code)
  );

  const addVocabCard = async (payload: VocabCardCreate) => {
    await api.post('/vocab-cards', payload);
    queryClient.invalidateQueries({ queryKey: ['vocab-cards'] });
    queryClient.invalidateQueries({ queryKey: ['vocab-cards', 'all'] });
  };

  const handleAddSingleWord = async (word: CurriculumVocabWord) => {
    if (savedWordsSet.has(word.word.toLowerCase())) return;
    try {
      await addVocabCard({
        term: word.word,
        translation: word.tr,
        example_sentence: word.exampleEn,
        source_label: `${selectedLevel} Müfredatı`,
      });
      showToast(`"${word.word}" sandığa eklendi 📚`);
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : 'Kelime eklenemedi');
    }
  };

  const handleAddTopicWords = async (topic: CurriculumTopic) => {
    const missing = topic.targetWords.filter((w) => !savedWordsSet.has(w.trim().toLowerCase()));
    if (missing.length === 0) {
      showToast('Bu konunun kelimeleri zaten sandığında ✓');
      return;
    }
    try {
      await Promise.all(
        missing.map((word) => {
          const found = findCurriculumWord(word);
          return addVocabCard({
            term: word,
            translation: found?.tr,
            example_sentence: found?.exampleEn,
            source_label: `${topic.code} · ${selectedLevel} Müfredatı`,
          });
        })
      );
      showToast(`${missing.length} kelime sandığa eklendi 📚`);
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : 'Kelimeler eklenemedi');
    }
  };

  // Every destination below is guaranteed to exist regardless of catalog
  // content (no guessed scenario/reading slug) — TextChat always works
  // (stateless Groq chat), ReadingList/Vocab render their own real
  // empty/loading states if content isn't seeded yet.
  const handleStartTopicAction = (topic: CurriculumTopic) => {
    if (topic.moduleType === 'speaking') {
      navigation.navigate('TextChat', {
        focusTopic: {
          title: topic.title,
          formula: topic.formula,
          targetWords: topic.targetWords,
          topicCode: topic.code,
        },
      });
    } else if (topic.moduleType === 'reading') {
      navigation.navigate('ReadingList');
    } else {
      navigation.navigate('Vocab');
    }
  };

  const handleStartBossChallenge = () => {
    const matched = (allScenariosUnfiltered ?? []).find((s) => s.cefr_level === selectedLevel);
    if (matched) {
      navigation.navigate('LiveConversationRoom', {
        scenarioId: matched.id,
        scenarioSlug: matched.slug,
        scenarioTitle: currentCurriculum.bossChallenge.title,
      });
    } else {
      navigation.navigate('TextChat', {
        focusTopic: { title: currentCurriculum.bossChallenge.title },
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Sahneler & Seviyeler</Text>
        <Text style={styles.subtitle}>CEFR Müfredatı ve Konuşma Yolculuğu</Text>

        {/* Segmented Switch: Müfredat Yol Haritası vs Tüm Sahneler */}
        <View style={styles.tabSwitchContainer}>
          <Pressable
            onPress={() => setActiveTab('curriculum')}
            style={[
              styles.tabSwitchButton,
              activeTab === 'curriculum' && styles.tabSwitchButtonActive,
            ]}
          >
            <Text
              style={[
                styles.tabSwitchText,
                activeTab === 'curriculum' && styles.tabSwitchTextActive,
              ]}
            >
              🗺️ Seviye Yol Haritası
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setActiveTab('categories')}
            style={[
              styles.tabSwitchButton,
              activeTab === 'categories' && styles.tabSwitchButtonActive,
            ]}
          >
            <Text
              style={[
                styles.tabSwitchText,
                activeTab === 'categories' && styles.tabSwitchTextActive,
              ]}
            >
              📁 Tüm Sahneler Kataloğu
            </Text>
          </Pressable>
        </View>
      </View>

      {/* ======================================================== */}
      {/* TAB 1: CEFR TOPIC-BASED LEARNING ROADMAP (A1 - C2)       */}
      {/* ======================================================== */}
      {activeTab === 'curriculum' ? (
        <ScrollView
          contentContainerStyle={styles.curriculumScrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* 1. CEFR Level Selector 3x2 Grid (100% visible on screen) */}
          <View style={styles.levelGridContainer}>
            {CEFR_LEVELS.map((lvl) => {
              const isSelected = selectedLevel === lvl;
              const isUserCurrent = (profile?.cefr_level ?? 'A1') === lvl;
              const locked = isLevelLocked(lvl);

              return (
                <Pressable
                  key={lvl}
                  onPress={() => {
                    if (locked) {
                      const prevLvl = CEFR_LEVELS[CEFR_LEVELS.indexOf(lvl) - 1];
                      showToast(`🔒 ${lvl}, ${prevLvl} seviyesini tamamlayınca açılır`);
                      return;
                    }
                    setSelectedLevel(lvl);
                  }}
                  style={[
                    styles.levelGridCard,
                    isSelected && styles.levelGridCardActive,
                    locked && styles.levelGridCardLocked,
                  ]}
                >
                  <Image
                    source={cefrLevelImages[lvl] ?? cefrLevelImages.A1}
                    style={[styles.levelGridIcon, locked && styles.levelGridIconLocked]}
                    resizeMode="contain"
                  />
                  <View style={styles.levelGridTextCol}>
                    <Text
                      style={[
                        styles.levelGridTitle,
                        isSelected && styles.levelGridTitleActive,
                        locked && styles.levelGridTitleLocked,
                      ]}
                    >
                      {locked ? '🔒 ' : ''}
                      {lvl} Seviye
                    </Text>
                    {isUserCurrent && <Text style={styles.userCurrentBadge}>Mevcut</Text>}
                  </View>
                </Pressable>
              );
            })}
          </View>

          {/* 2. Hero Level Overview Card */}
          {(() => {
            const currentTheme = cefrThemes[selectedLevel] ?? cefrThemes.A1;
            const progressPct = Math.round((practicedTopicsCount / Math.max(1, currentCurriculum.topics.length)) * 100);

            return (
              <View style={[styles.heroLevelCard, shadow.porcelain]}>
                <View style={styles.heroLevelHeaderRow}>
                  <Image source={levelBadge} style={styles.heroBadgeImage} resizeMode="contain" />
                  <View style={styles.heroLevelTextCol}>
                    <View style={styles.islandTagRow}>
                      <Text style={styles.islandTagEmoji}>{currentTheme.icon}</Text>
                      <Text style={[styles.islandTagText, { color: currentTheme.accentColor }]}>
                        {currentTheme.islandName}
                      </Text>
                    </View>
                    <Text style={styles.heroLevelPretitle}>
                      {selectedLevel} • {currentCurriculum.title}
                    </Text>
                    <Text style={styles.heroLevelObjective}>{currentTheme.subtitle}</Text>
                  </View>
                </View>

                {/* Level Completion Progress Bar */}
                <View style={styles.levelProgressContainer}>
                  <View style={styles.levelProgressTopRow}>
                    <Text style={styles.levelProgressLabel}>Seviye İlerlemesi</Text>
                    <Text style={[styles.levelProgressPercent, { color: currentTheme.accentColor }]}>
                      %{progressPct}
                    </Text>
                  </View>
                  <View style={styles.progressBarTrack}>
                    <View
                      style={[
                        styles.progressBarFill,
                        {
                          width: `${progressPct}%`,
                          backgroundColor: currentTheme.accentColor,
                        },
                      ]}
                    />
                  </View>
                </View>

                {/* Meta Stats Chips */}
                <View style={styles.heroStatsRow}>
                  <View style={styles.heroStatChip}>
                    <Text style={styles.heroStatChipText}>⏱️ {currentCurriculum.targetDays} Günlük Plan</Text>
                  </View>
                  <View style={styles.heroStatChip}>
                    <Text style={styles.heroStatChipText}>📚 {currentCurriculum.topics.length} Konu</Text>
                  </View>
                  <View style={styles.heroStatChip}>
                    <Text style={styles.heroStatChipText}>📦 {poolWordCount(currentVocabPool)} Kelime</Text>
                  </View>
                  <View style={[styles.heroStatChip, styles.heroStatChipSuccess]}>
                    <Text style={[styles.heroStatChipText, styles.heroStatChipTextSuccess]}>
                      ✅ {practicedTopicsCount}/{currentCurriculum.topics.length} Bitti
                    </Text>
                  </View>
                </View>
              </View>
            );
          })()}

          {/* 3. Vocabulary Pool Browser (previously unused guide content) */}
          <Pressable
            onPress={() => setShowVocabPool((v) => !v)}
            style={[styles.vocabPoolCard, shadow.card]}
          >
            <View style={styles.vocabPoolHeaderRow}>
              <Text style={styles.vocabPoolHeaderText}>
                📦 {selectedLevel} Kelime Havuzunu Keşfet
              </Text>
              <Ionicons
                name={showVocabPool ? 'chevron-up' : 'chevron-down'}
                size={16}
                color={colors.textMuted}
              />
            </View>
            {!showVocabPool && (
              <Text style={styles.vocabPoolHint}>
                Dokunarak kelimenin telaffuzunu ve anlamını gör, sandığa ekle.
              </Text>
            )}
          </Pressable>

          {showVocabPool &&
            (Object.keys(currentVocabPool) as PosKey[]).map((pos) =>
              currentVocabPool[pos].length > 0 ? (
                <View key={pos} style={styles.posSection}>
                  <Text style={styles.posLabel}>
                    {POS_LABELS[pos]} ({currentVocabPool[pos].length})
                  </Text>
                  <View style={styles.wordGrid}>
                    {currentVocabPool[pos].map((w) => {
                      const saved = savedWordsSet.has(w.word.toLowerCase());
                      return (
                        <Pressable
                          key={w.word}
                          onPress={() => handleAddSingleWord(w)}
                          disabled={saved}
                          style={[styles.vocabWordChip, saved && styles.vocabWordChipSaved]}
                        >
                          <View style={styles.vocabWordTopRow}>
                            <Text style={styles.vocabWordText}>{w.word}</Text>
                            {saved && (
                              <Ionicons name="checkmark-circle" size={12} color={colors.success} />
                            )}
                          </View>
                          <Text style={styles.vocabWordPhonetic}>{w.phonetic}</Text>
                          <Text style={styles.vocabWordTr}>{w.tr}</Text>
                        </Pressable>
                      );
                    })}
                  </View>
                </View>
              ) : null
            )}

          {/* 4. Section Title */}
          <View style={styles.timelineHeaderRow}>
            <Text style={styles.timelineSectionTitle}>
              🏝️ {selectedLevel} Macera Rota Haritası (İstasyonlar):
            </Text>
          </View>

          {/* 5. Duolingo-Style Winding Island Stepping Stones Map with 3D Fantasy Background */}
          <View style={[styles.duoIslandWrapper, shadow.card]}>
            <ImageBackground
              source={verticalIslandPathBg}
              style={styles.duoIslandBg}
              imageStyle={styles.duoIslandImg}
              resizeMode="cover"
            >
              <View style={styles.duoIslandOverlay}>
                <View style={styles.duoPathContainer}>
                  {/* Center Vertical Winding Track Line */}
                  <View style={styles.duoTrackLine} />

                  {currentCurriculum.topics.map((topic, idx) => {
                    const topicFullyDone = fullCompletion[topic.code] ?? false;
                    const previousTopic = idx > 0 ? currentCurriculum.topics[idx - 1] : null;
                    const isLocked = previousTopic ? !(fullCompletion[previousTopic.code] ?? false) : false;
                    const isCurrent = !isLocked && !topicFullyDone;

                    // Alternating S-Curve horizontal offset (center -> left -> center -> right)
                    const curveAlign =
                      idx % 4 === 0
                        ? styles.duoNodeCenter
                        : idx % 4 === 1
                          ? styles.duoNodeLeft
                          : idx % 4 === 2
                            ? styles.duoNodeCenter
                            : styles.duoNodeRight;

                    return (
                      <View key={topic.id} style={styles.duoStepWrapper}>
                        {/* Periodic Milestone Treasure Chest on Path */}
                        {idx > 0 && idx % 4 === 0 && (
                          <BouncyPressable
                            onPress={() => {
                              setChestModalVisible(true);
                            }}
                            style={[styles.duoChestBtn, shadow.porcelain]}
                            hapticType="success"
                            scaleTo={0.92}
                          >
                            <Text style={styles.duoChestEmoji}>🎁</Text>
                            <View style={styles.duoChestTag}>
                              <Text style={styles.duoChestTagText}>HEDİYE SANDIĞI</Text>
                            </View>
                          </BouncyPressable>
                        )}

                        {/* Winding Stepping Stone Node */}
                        <View style={[styles.duoNodeRow, curveAlign]}>
                          {/* Active Mascot Pointer Bubble */}
                          {isCurrent && (
                            <View style={[styles.duoMascotBubble, shadow.card]}>
                              <Text style={styles.duoMascotBubbleText}>☕ Yankı: Sıradaki Adım!</Text>
                              <View style={styles.duoMascotBubbleTail} />
                            </View>
                          )}

                          {/* 3D Stepping Stone Button */}
                          <BouncyPressable
                            onPress={() => {
                              if (isLocked) {
                                showToast('🔒 Önceki istasyonu tamamlayınca açılır');
                                return;
                              }
                              setSelectedTopicModal(topic);
                            }}
                            hapticType={isLocked ? 'warning' : 'medium'}
                            scaleTo={0.90}
                            style={[
                              styles.duoStoneBtn,
                              topicFullyDone && styles.duoStoneDone,
                              isCurrent && styles.duoStoneCurrent,
                              isLocked && styles.duoStoneLocked,
                            ]}
                          >
                            {/* Top Stars for Completed Topic */}
                            {topicFullyDone && (
                              <View style={styles.duoStoneStars}>
                                <Text style={styles.duoStarsText}>⭐⭐⭐</Text>
                              </View>
                            )}

                            <View style={styles.duoStoneInner}>
                              {isLocked ? (
                                <Ionicons name="lock-closed" size={24} color="#94A3B8" />
                              ) : topicFullyDone ? (
                                <Ionicons name="checkmark" size={28} color="#FFFFFF" />
                              ) : (
                                <Ionicons
                                  name={topic.moduleType === 'speaking' ? 'mic' : 'book'}
                                  size={26}
                                  color="#FFFFFF"
                                />
                              )}
                            </View>
                          </BouncyPressable>

                          {/* Topic Code & Title Sub-Pill */}
                          <BouncyPressable
                            onPress={() => {
                              if (!isLocked) {
                                setSelectedTopicModal(topic);
                              }
                            }}
                            hapticType="light"
                            scaleTo={0.95}
                            style={[
                              styles.duoTopicPill,
                              isCurrent && styles.duoTopicPillCurrent,
                              topicFullyDone && styles.duoTopicPillDone,
                            ]}
                          >
                            <Text
                              style={[
                                styles.duoTopicPillText,
                                isCurrent && styles.duoTopicPillTextCurrent,
                                topicFullyDone && styles.duoTopicPillTextDone,
                              ]}
                              numberOfLines={1}
                            >
                              {topic.code} • {topic.title}
                            </Text>
                          </BouncyPressable>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
            </ImageBackground>
          </View>

          {/* 5b. Bonus Konu Anlatımları (müfredat kartlarının kapsamadığı ek gramer dersleri) */}
          {bonusLessons.length > 0 && (
            <View style={styles.bonusLessonsSection}>
              <Text style={styles.timelineSectionTitle}>📘 Ek Konu Anlatımları</Text>
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

          {/* 6. 👑 BOSS CHALLENGE: Seviye Atlama Sohbeti */}
          <View style={[styles.bossChallengeCard, shadow.card]}>
            <View style={styles.bossCardHeaderRow}>
              <Image
                source={stateImages.goalCelebration}
                style={styles.bossTrophyImage}
                resizeMode="contain"
              />
              <View style={styles.bossCardHeaderCol}>
                <Text style={styles.bossCardPretitle}>SEVİYE DEĞERLENDİRMESİ 👑</Text>
                <Text style={styles.bossCardTitle}>
                  {currentCurriculum.bossChallenge.title}
                </Text>
              </View>
            </View>

            <Text style={styles.bossCardDescription}>
              {currentCurriculum.bossChallenge.description}
            </Text>

            <Pressable onPress={handleStartBossChallenge} style={styles.bossStartButton}>
              <Ionicons name="trophy" size={18} color="#FFFFFF" />
              <Text style={styles.bossStartButtonText}>Değerlendirme Sohbetine Başla ➔</Text>
            </Pressable>
          </View>
        </ScrollView>
      ) : (
        /* ======================================================== */
        /* TAB 2: CATEGORY BENTO SCENARIOS CATALOG                  */
        /* ======================================================== */
        <View style={styles.categoryViewContainer}>
          {/* Free-text search — catalog is real content now, worth being
              able to jump straight to "kahve" or "mülakat" etc. */}
          <View style={styles.searchWrapper}>
            <Ionicons name="search" size={16} color={colors.textMuted} />
            <TextInput
              value={catalogSearch}
              onChangeText={setCatalogSearch}
              placeholder="Sahne ara (ör. mülakat, kahve, vize...)"
              placeholderTextColor={colors.textMuted}
              style={styles.searchInput}
            />
            {catalogSearch.length > 0 && (
              <Pressable onPress={() => setCatalogSearch('')} hitSlop={8}>
                <Ionicons name="close-circle" size={16} color={colors.textMuted} />
              </Pressable>
            )}
          </View>

          {/* 1. Category Pills Wrap Grid (All on screen, zero cutoff) */}
          <View style={styles.categoriesWrapContainer}>
            {([
              { id: 'all' as const, label: '✨ Tümü' },
              { id: 'tech' as const, label: '👨‍💻 Tech' },
              { id: 'career' as const, label: '💼 Kariyer' },
              { id: 'visa' as const, label: '🛂 Vize' },
              { id: 'b2b' as const, label: '📊 B2B' },
              { id: 'travel' as const, label: '✈️ Seyahat' },
              { id: 'daily' as const, label: '☕ Günlük' },
            ] as const).map((item) => {
              const count =
                item.id === 'all'
                  ? sourceAllUnfiltered.length
                  : categoryCounts[item.id] ?? 0;
              const isActive = categoryFilter === item.id;
              return (
                <Pressable
                  key={item.id}
                  onPress={() => setCategoryFilter(item.id)}
                  style={[
                    styles.categoryWrapChip,
                    isActive && styles.categoryWrapChipActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.categoryWrapLabel,
                      isActive && styles.categoryWrapLabelActive,
                    ]}
                  >
                    {item.label} ({count})
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* 2. Level Filter Full-Width Segment Bar (100% On Screen, No Cutoff) */}
          <View style={styles.levelSegmentBar}>
            {['all', ...CEFR_LEVELS].map((lvl) => {
              const isActive = catalogLevelFilter === lvl;
              return (
                <Pressable
                  key={lvl}
                  onPress={() => setCatalogLevelFilter(lvl)}
                  style={[
                    styles.levelSegmentBtn,
                    isActive && styles.levelSegmentBtnActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.levelSegmentText,
                      isActive && styles.levelSegmentTextActive,
                    ]}
                  >
                    {lvl === 'all' ? 'Tümü' : lvl}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {scenariosLoading ? (
            <ActivityIndicator style={styles.stateBlock} color={colors.brand} />
          ) : !filteredCatalogScenarios.length ? (
            <View style={styles.stateBlock}>
              <Text style={styles.stateText}>
                {catalogSearch || catalogLevelFilter !== 'all'
                  ? 'Bu filtrelere uyan bir sahne yok — filtreleri temizlemeyi dene.'
                  : 'Bu kategoride henüz sahne yok.'}
              </Text>
            </View>
          ) : (
            <FlatList
              data={filteredCatalogScenarios}
              keyExtractor={(item) => item.slug}
              contentContainerStyle={styles.scenarioListContent}
              renderItem={({ item }) => {
                // Real, per-scenario data straight off ScenarioOut — no local
                // lookup needed (see backend Ek 31/33: a `SCENARIOS.find(id
                // === item.slug)`-style match against the old hardcoded
                // `scenariosData.ts` list never found a real scenario, since
                // that list's 5 ids don't overlap with any real backend slug).
                const attempted = attemptedScenarioIds.has(item.id);
                const aiName = item.ai_name ?? 'Yankı';
                const aiRole = item.ai_role ?? 'AI Partner';
                const objectives = item.objectives;
                const vocab = item.suggested_vocab;

                return (
                  <View style={[styles.richScenarioCard, shadow.card]}>
                    {/* Top Banner with Image & Overlays */}
                    <View style={styles.cardCoverWrapper}>
                      <Image
                        source={scenarioCategoryImages[item.category] ?? companionImage}
                        style={styles.cardCoverImage}
                        resizeMode="cover"
                      />
                      <View style={styles.cardCoverOverlay} />

                      {/* Top Badges */}
                      <View style={styles.cardTopBadgeRow}>
                        <View style={styles.cefrLevelTag}>
                          <Text style={styles.cefrLevelTagText}>{item.cefr_level ?? 'A2'}</Text>
                        </View>
                        <View style={styles.durationTag}>
                          <Ionicons name="time-outline" size={11} color="#FFFFFF" />
                          <Text style={styles.durationTagText}>{item.estimated_minutes} Dk</Text>
                        </View>
                        {attempted && (
                          <View style={styles.completedPill}>
                            <Ionicons name="checkmark-circle" size={12} color="#10B981" />
                            <Text style={styles.completedPillText}>Tamamlandı</Text>
                          </View>
                        )}
                      </View>

                      {/* Persona Pill */}
                      <View style={styles.personaPill}>
                        <Text style={styles.personaPillEmoji}>🤖</Text>
                        <Text style={styles.personaPillText}>
                          {aiName} • {aiRole}
                        </Text>
                      </View>
                    </View>

                    {/* Body Content */}
                    <View style={styles.richCardBody}>
                      <Text style={styles.richCardTitle}>{item.title}</Text>
                      <Text style={styles.richCardDesc}>{item.description}</Text>

                      {/* Learning Objectives Box */}
                      {objectives.length > 0 && (
                        <View style={styles.objectivesBox}>
                          <Text style={styles.objectivesHeader}>🎯 Kazanılacak Beceriler:</Text>
                          {objectives.slice(0, 2).map((obj, i) => (
                            <View key={i} style={styles.objectiveRow}>
                              <Ionicons name="checkmark-circle" size={13} color={colors.brand} />
                              <Text style={styles.objectiveText} numberOfLines={1}>
                                {obj.text_tr}
                              </Text>
                            </View>
                          ))}
                        </View>
                      )}

                      {/* Vocab Pills */}
                      {vocab.length > 0 && (
                        <View style={styles.vocabChipsRow}>
                          {vocab.slice(0, 3).map((v, i) => (
                            <Pressable
                              key={i}
                              onPress={() =>
                                handleAddSingleWord({
                                  word: v.term,
                                  tr: v.tr,
                                  phonetic: '',
                                  exampleEn: '',
                                  exampleTr: '',
                                })
                              }
                              style={styles.scenarioVocabChip}
                            >
                              <Text style={styles.scenarioVocabText}>+ {v.term}</Text>
                            </Pressable>
                          ))}
                        </View>
                      )}

                      {/* Dual Action Buttons */}
                      <View style={styles.actionButtonsRow}>
                        <Pressable
                          onPress={() =>
                            navigation.navigate('LiveConversationRoom', {
                              scenarioId: item.id,
                              scenarioSlug: item.slug,
                              scenarioTitle: item.title,
                            })
                          }
                          style={styles.voiceStartBtn}
                        >
                          <Ionicons name="mic" size={15} color="#FFFFFF" />
                          <Text style={styles.voiceStartBtnText}>Sesli Başlat (Deepgram)</Text>
                        </Pressable>

                        <Pressable
                          onPress={() =>
                            navigation.navigate('TextChat', {
                              focusTopic: { title: item.title },
                            })
                          }
                          style={styles.chatStartBtn}
                        >
                          <Ionicons name="chatbubble-ellipses-outline" size={15} color={colors.brand} />
                          <Text style={styles.chatStartBtnText}>Yazılı</Text>
                        </Pressable>
                      </View>
                    </View>
                  </View>
                );
              }}
            />
          )}
        </View>
      )}

      {/* ======================================================== */}
      {/* DUOLINGO LESSON ACTION MODAL SHEET                      */}
      {/* ======================================================== */}
      <Modal
        visible={!!selectedTopicModal}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedTopicModal(null)}
      >
        <Pressable
          style={styles.duoModalOverlay}
          onPress={() => setSelectedTopicModal(null)}
        >
          <Pressable style={styles.duoModalCard} onPress={(e) => e.stopPropagation()}>
            {selectedTopicModal && (
              <>
                <View style={styles.duoModalHandle} />

                {/* Header Row */}
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

                {/* Grammar Rule Formula Box */}
                <View style={styles.duoFormulaBox}>
                  <View style={styles.duoFormulaHeader}>
                    <Ionicons name="sparkles" size={13} color={colors.brand} />
                    <Text style={styles.duoFormulaLabel}>FORMÜL / KURAL</Text>
                  </View>
                  <Text style={styles.duoFormulaText}>{selectedTopicModal.formula}</Text>
                </View>

                {/* Target Vocab Chips */}
                <View style={styles.duoVocabBox}>
                  <Text style={styles.duoVocabLabel}>KULLANILACAK KELİMELER:</Text>
                  <View style={styles.duoVocabRow}>
                    {selectedTopicModal.targetWords.map((w) => (
                      <View key={w} style={styles.duoVocabChip}>
                        <Text style={styles.duoVocabChipText}>+ {w}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                {/* Action Buttons */}
                <View style={styles.duoModalActions}>
                  <BouncyPressable
                    onPress={() => {
                      const topic = selectedTopicModal;
                      setSelectedTopicModal(null);
                      if (topic) handleStartTopicAction(topic);
                    }}
                    style={[styles.duoPrimaryBtn, shadow.porcelain]}
                    hapticType="medium"
                    scaleTo={0.96}
                  >
                    <Ionicons name="mic" size={18} color="#FFFFFF" />
                    <Text style={styles.duoPrimaryBtnText}>Canlı Pratiğe Başla (+15 XP)</Text>
                  </BouncyPressable>

                  {findGrammarLesson(selectedTopicModal.code) && (
                    <BouncyPressable
                      onPress={() => {
                        const code = selectedTopicModal.code;
                        setSelectedTopicModal(null);
                        navigation.navigate('GrammarLesson', { code });
                      }}
                      style={styles.duoSecondaryBtn}
                      hapticType="light"
                      scaleTo={0.96}
                    >
                      <Ionicons name="book-outline" size={16} color={colors.brand} />
                      <Text style={styles.duoSecondaryBtnText}>Konu Anlatımını Oku ➔</Text>
                    </BouncyPressable>
                  )}
                </View>
              </>
            )}
          </Pressable>
        </Pressable>
      </Modal>

      {/* Milestone Chest Celebration Modal */}
      <Modal
        visible={chestModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setChestModalVisible(false)}
      >
        <Pressable
          style={styles.duoModalOverlay}
          onPress={() => setChestModalVisible(false)}
        >
          <Pressable style={styles.chestModalCard} onPress={(e) => e.stopPropagation()}>
            <Text style={styles.chestModalEmoji}>🎁</Text>
            <Text style={styles.chestModalTitle}>Ada İlerleme Sandığı Açıldı!</Text>
            <Text style={styles.chestModalDesc}>
              Tebrikler! Müfredatta istikrarlı ilerlediğin için +15 XP ve 5 yeni kelime sandığına eklendi.
            </Text>
            <BouncyPressable
              onPress={() => setChestModalVisible(false)}
              style={styles.chestClaimBtn}
              hapticType="success"
              scaleTo={0.94}
            >
              <Text style={styles.chestClaimBtnText}>Ödülü Al 🚀</Text>
            </BouncyPressable>
          </Pressable>
        </Pressable>
      </Modal>

      {toast ? <Toast message={toast} /> : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(226, 232, 240, 0.8)',
  },
  title: {
    fontFamily: fonts.headingBold,
    fontSize: 20,
    color: colors.textHeading,
  },
  subtitle: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
    marginBottom: spacing.sm,
  },
  tabSwitchContainer: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: radii.pill,
    padding: 3,
  },
  tabSwitchButton: {
    flex: 1,
    paddingVertical: 7,
    alignItems: 'center',
    borderRadius: radii.pill,
  },
  tabSwitchButtonActive: {
    backgroundColor: '#FFFFFF',
    ...shadow.card,
  },
  tabSwitchText: {
    fontFamily: fonts.headingBold,
    fontSize: 11,
    color: colors.textMuted,
  },
  tabSwitchTextActive: {
    color: colors.textHeading,
  },

  /* TAB 1: Curriculum Scroll Content */
  curriculumScrollContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: 110,
  },
  levelTabsRow: {
    flexDirection: 'row',
    gap: 8,
    paddingBottom: 12,
  },
  levelGridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 8,
    marginBottom: spacing.sm,
    justifyContent: 'space-between',
  },
  levelGridCard: {
    width: '31.5%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: radii.md,
    paddingHorizontal: 6,
    paddingVertical: 8,
    borderWidth: 1.5,
    borderColor: 'rgba(226, 232, 240, 0.9)',
    gap: 5,
  },
  levelGridCardActive: {
    borderColor: colors.brand,
    backgroundColor: 'rgba(79, 70, 229, 0.08)',
  },
  levelGridCardLocked: {
    backgroundColor: '#F8FAFC',
    borderColor: 'rgba(226, 232, 240, 0.9)',
  },
  levelGridIcon: {
    width: 20,
    height: 20,
  },
  levelGridIconLocked: {
    opacity: 0.4,
  },
  levelGridTextCol: {
    flex: 1,
  },
  levelGridTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 11,
    color: colors.textMuted,
  },
  levelGridTitleActive: {
    color: colors.brand,
  },
  levelGridTitleLocked: {
    color: '#94A3B8',
  },
  userCurrentBadge: {
    fontFamily: fonts.mono,
    fontSize: 8,
    color: colors.brand,
    fontWeight: 'bold',
  },

  /* Hero Level Overview Card */
  heroLevelCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.9)',
    marginBottom: spacing.sm,
  },
  heroLevelHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
  },
  heroBadgeImage: {
    width: 52,
    height: 52,
  },
  heroLevelTextCol: {
    flex: 1,
  },
  islandTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  islandTagEmoji: {
    fontSize: 12,
  },
  islandTagText: {
    fontFamily: fonts.headingBold,
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  heroLevelPretitle: {
    fontFamily: fonts.headingBold,
    fontSize: 15,
    color: colors.textHeading,
  },
  heroLevelObjective: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
    lineHeight: 15,
  },
  levelProgressContainer: {
    backgroundColor: '#F8FAFC',
    borderRadius: radii.md,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 10,
    gap: 6,
  },
  levelProgressTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  levelProgressLabel: {
    fontFamily: fonts.headingBold,
    fontSize: 10,
    color: colors.textBody,
  },
  levelProgressPercent: {
    fontFamily: fonts.mono,
    fontSize: 11,
    fontWeight: 'bold',
  },
  progressBarTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E2E8F0',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  heroStatsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  heroStatChip: {
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.8)',
  },
  heroStatChipSuccess: {
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  heroStatChipText: {
    fontFamily: fonts.mono,
    fontSize: 10,
    color: colors.textBody,
    fontWeight: '600',
  },
  heroStatChipTextSuccess: {
    color: colors.success,
  },

  /* Vocabulary Pool Browser */
  vocabPoolCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.9)',
    marginBottom: spacing.sm,
  },
  vocabPoolHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  vocabPoolHeaderText: {
    fontFamily: fonts.headingBold,
    fontSize: 13,
    color: colors.textHeading,
  },
  vocabPoolHint: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10,
    color: colors.textMuted,
    marginTop: 4,
  },
  posSection: {
    marginBottom: 10,
  },
  posLabel: {
    fontFamily: fonts.headingBold,
    fontSize: 11,
    color: colors.brand,
    marginBottom: 6,
    marginLeft: 2,
  },
  wordGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  vocabWordChip: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 6,
    minWidth: 92,
  },
  vocabWordChipSaved: {
    backgroundColor: 'rgba(16, 185, 129, 0.06)',
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  vocabWordTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 4,
  },
  vocabWordText: {
    fontFamily: fonts.headingBold,
    fontSize: 11,
    color: colors.textHeading,
  },
  vocabWordPhonetic: {
    fontFamily: fonts.mono,
    fontSize: 8,
    color: colors.textMuted,
    marginTop: 2,
  },
  vocabWordTr: {
    fontFamily: fonts.bodyRegular,
    fontSize: 9,
    color: colors.textBody,
    marginTop: 1,
  },

  timelineHeaderRow: {
    marginBottom: 10,
  },
  timelineSectionTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 13,
    color: colors.textHeading,
  },

  /* 5. 3D Fantasy Stepping Stone Duolingo Adventure Path */
  duoIslandWrapper: {
    borderRadius: 28,
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },
  duoIslandBg: {
    width: '100%',
  },
  duoIslandImg: {
    borderRadius: 28,
  },
  duoIslandOverlay: {
    paddingVertical: 18,
    paddingHorizontal: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  duoPathContainer: {
    position: 'relative',
    alignItems: 'center',
    paddingVertical: 12,
  },
  duoTrackLine: {
    position: 'absolute',
    top: 30,
    bottom: 30,
    width: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    borderRadius: 2,
    alignSelf: 'center',
  },
  duoStepWrapper: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 12,
  },
  duoNodeRow: {
    alignItems: 'center',
    zIndex: 2,
  },
  duoNodeCenter: {
    alignSelf: 'center',
  },
  duoNodeLeft: {
    alignSelf: 'flex-start',
    marginLeft: 36,
  },
  duoNodeRight: {
    alignSelf: 'flex-end',
    marginRight: 36,
  },
  duoMascotBubble: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radii.pill,
    borderWidth: 1.5,
    borderColor: colors.brand,
    marginBottom: 6,
    alignItems: 'center',
    shadowColor: colors.brand,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  duoMascotBubbleText: {
    fontFamily: fonts.headingBold,
    fontSize: 10,
    color: colors.brand,
  },
  duoMascotBubbleTail: {
    width: 8,
    height: 8,
    backgroundColor: '#FFFFFF',
    borderRightWidth: 1.5,
    borderBottomWidth: 1.5,
    borderColor: colors.brand,
    transform: [{ rotate: '45deg' }],
    position: 'absolute',
    bottom: -5,
  },
  duoStoneBtn: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#4F46E5',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 6,
    borderBottomColor: '#3730A3',
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 8,
  },
  duoStoneDone: {
    backgroundColor: '#10B981',
    borderBottomColor: '#059669',
    shadowColor: '#10B981',
  },
  duoStoneCurrent: {
    backgroundColor: '#6366F1',
    borderBottomColor: '#4338CA',
    borderWidth: 3,
    borderColor: '#A5B4FC',
  },
  duoStoneLocked: {
    backgroundColor: '#E2E8F0',
    borderBottomColor: '#CBD5E1',
    shadowOpacity: 0.05,
  },
  duoStoneInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  duoStoneStars: {
    position: 'absolute',
    top: -14,
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: '#F59E0B',
  },
  duoStarsText: {
    fontSize: 8,
  },
  duoTopicPill: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginTop: 8,
    maxWidth: 160,
  },
  duoTopicPillCurrent: {
    borderColor: colors.brand,
    backgroundColor: '#EEF2FF',
  },
  duoTopicPillDone: {
    borderColor: '#A7F3D0',
    backgroundColor: '#ECFDF5',
  },
  duoTopicPillText: {
    fontFamily: fonts.mono,
    fontSize: 9.5,
    color: colors.textMuted,
    textAlign: 'center',
  },
  duoTopicPillTextCurrent: {
    color: colors.brand,
    fontWeight: 'bold',
  },
  duoTopicPillTextDone: {
    color: '#047857',
    fontWeight: 'bold',
  },
  duoChestBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radii.pill,
    borderWidth: 1.5,
    borderColor: '#F59E0B',
    marginVertical: 12,
  },
  duoChestEmoji: {
    fontSize: 18,
  },
  duoChestTag: {
    backgroundColor: '#F59E0B',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radii.pill,
  },
  duoChestTagText: {
    fontFamily: fonts.mono,
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  /* Duolingo Modal Sheet Styles */
  duoModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'flex-end',
  },
  duoModalCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: spacing.lg,
    paddingBottom: 40,
    maxHeight: '85%',
  },
  duoModalHandle: {
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#E2E8F0',
    alignSelf: 'center',
    marginBottom: 14,
  },
  duoModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  duoModalLevelTag: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radii.pill,
  },
  duoModalLevelText: {
    fontFamily: fonts.mono,
    fontSize: 10.5,
    fontWeight: 'bold',
    color: colors.brand,
  },
  duoModalCloseBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  duoModalTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 18,
    color: colors.textHeading,
    marginBottom: 4,
  },
  duoModalDesc: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 12,
    lineHeight: 17,
  },
  duoFormulaBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: radii.md,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 12,
  },
  duoFormulaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  duoFormulaLabel: {
    fontFamily: fonts.mono,
    fontSize: 8.5,
    fontWeight: 'bold',
    color: colors.brand,
  },
  duoFormulaText: {
    fontFamily: fonts.mono,
    fontSize: 11,
    fontWeight: 'bold',
    color: colors.textHeading,
  },
  duoVocabBox: {
    marginBottom: 16,
  },
  duoVocabLabel: {
    fontFamily: fonts.mono,
    fontSize: 9,
    fontWeight: 'bold',
    color: colors.textMuted,
    marginBottom: 6,
  },
  duoVocabRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  duoVocabChip: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radii.pill,
  },
  duoVocabChipText: {
    fontFamily: fonts.mono,
    fontSize: 10,
    color: colors.textHeading,
  },
  duoModalActions: {
    gap: 10,
  },
  duoPrimaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#10B981',
    paddingVertical: 14,
    borderRadius: radii.pill,
    borderBottomWidth: 4,
    borderBottomColor: '#059669',
  },
  duoPrimaryBtnText: {
    fontFamily: fonts.headingBold,
    fontSize: 14,
    color: '#FFFFFF',
  },
  duoSecondaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#EEF2FF',
    paddingVertical: 12,
    borderRadius: radii.pill,
  },
  duoSecondaryBtnText: {
    fontFamily: fonts.headingBold,
    fontSize: 12.5,
    color: colors.brand,
  },

  /* Chest Reward Modal */
  chestModalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: spacing.xl,
    marginHorizontal: 24,
    alignItems: 'center',
  },
  chestModalEmoji: {
    fontSize: 54,
    marginBottom: 8,
  },
  chestModalTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 18,
    color: colors.textHeading,
    textAlign: 'center',
    marginBottom: 6,
  },
  chestModalDesc: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 16,
  },
  chestClaimBtn: {
    backgroundColor: '#F59E0B',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: radii.pill,
  },
  chestClaimBtnText: {
    fontFamily: fonts.headingBold,
    fontSize: 13,
    color: '#FFFFFF',
  },

  /* Bonus Lessons */
  bonusLessonsSection: {
    marginBottom: 16,
  },
  bonusLessonsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  bonusLessonCard: {
    flexBasis: '47%',
    backgroundColor: '#FFFFFF',
    borderRadius: radii.md,
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.9)',
  },
  bonusLessonCode: {
    fontFamily: fonts.mono,
    fontSize: 9,
    fontWeight: 'bold',
    color: colors.brand,
    marginBottom: 2,
  },
  bonusLessonTitle: {
    fontFamily: fonts.bodyMedium,
    fontSize: 11,
    color: colors.textHeading,
  },

  /* Boss Challenge Card */
  bossChallengeCard: {
    backgroundColor: '#0F172A',
    borderRadius: radii.lg,
    padding: spacing.md,
    marginTop: 8,
  },
  bossCardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  bossTrophyImage: {
    width: 48,
    height: 48,
  },
  bossCardHeaderCol: {
    flex: 1,
  },
  bossCardPretitle: {
    fontFamily: fonts.mono,
    fontSize: 10,
    fontWeight: 'bold',
    color: '#F59E0B',
  },
  bossCardTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 15,
    color: '#FFFFFF',
    marginTop: 2,
  },
  bossCardDescription: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: '#94A3B8',
    marginBottom: 12,
    lineHeight: 15,
  },
  bossStartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F59E0B',
    paddingVertical: 10,
    borderRadius: radii.pill,
    gap: 6,
  },
  bossStartButtonText: {
    fontFamily: fonts.headingBold,
    fontSize: 12,
    color: '#0F172A',
  },

  /* TAB 2: Categories Grid */
  categoryViewContainer: {
    flex: 1,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginHorizontal: spacing.md,
    marginTop: spacing.sm,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radii.pill,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.9)',
  },
  searchInput: {
    flex: 1,
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: colors.textHeading,
    padding: 0,
  },
  categoriesWrapContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginHorizontal: spacing.md,
    marginTop: spacing.sm,
    marginBottom: 4,
  },
  categoryWrapChip: {
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: radii.pill,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryWrapChipActive: {
    backgroundColor: colors.brand,
    borderColor: colors.brand,
  },
  categoryWrapLabel: {
    fontFamily: fonts.headingBold,
    fontSize: 11,
    color: colors.textBody,
  },
  categoryWrapLabelActive: {
    color: '#FFFFFF',
  },
  levelSegmentBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: radii.pill,
    padding: 3,
    marginHorizontal: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'space-between',
  },
  levelSegmentBtn: {
    flex: 1,
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.pill,
  },
  levelSegmentBtnActive: {
    backgroundColor: colors.brand,
  },
  levelSegmentText: {
    fontFamily: fonts.mono,
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.textMuted,
  },
  levelSegmentTextActive: {
    color: '#FFFFFF',
  },
  scenarioListContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: 110,
    gap: 16,
  },
  richScenarioCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardCoverWrapper: {
    height: 120,
    width: '100%',
    position: 'relative',
    justifyContent: 'space-between',
    padding: 10,
  },
  cardCoverImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  cardCoverOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
  },
  cardTopBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cefrLevelTag: {
    backgroundColor: colors.brand,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.pill,
  },
  cefrLevelTagText: {
    fontFamily: fonts.mono,
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  durationTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.pill,
  },
  durationTagText: {
    fontFamily: fonts.mono,
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  completedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: '#10B981',
  },
  completedPillText: {
    fontFamily: fonts.mono,
    fontSize: 9,
    fontWeight: 'bold',
    color: '#10B981',
  },
  personaPill: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.pill,
  },
  personaPillEmoji: {
    fontSize: 11,
  },
  personaPillText: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 10,
    color: colors.textHeading,
  },
  richCardBody: {
    padding: spacing.md,
    gap: 8,
  },
  richCardTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 15,
    color: colors.textHeading,
    lineHeight: 20,
  },
  richCardDesc: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textBody,
    lineHeight: 16,
  },
  objectivesBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: radii.md,
    padding: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 4,
  },
  objectivesHeader: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 10,
    color: colors.brand,
  },
  objectiveRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  objectiveText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10,
    color: colors.textHeading,
    flex: 1,
  },
  vocabChipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginTop: 2,
  },
  scenarioVocabChip: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  scenarioVocabText: {
    fontFamily: fonts.mono,
    fontSize: 9,
    fontWeight: 'bold',
    color: colors.brand,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  voiceStartBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.brand,
    paddingVertical: 10,
    borderRadius: radii.pill,
    gap: 6,
    shadowColor: colors.brand,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  voiceStartBtnText: {
    fontFamily: fonts.headingBold,
    fontSize: 11,
    color: '#FFFFFF',
  },
  chatStartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    gap: 4,
  },
  chatStartBtnText: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 11,
    color: colors.textHeading,
  },
  stateBlock: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  stateText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: colors.textMuted,
  },
});
