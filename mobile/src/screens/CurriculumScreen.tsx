import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  cefrLevelImages,
  stateImages,
  verticalIslandPathBg,
} from '../assets/images';
import { BouncyPressable } from '../components/BouncyPressable';
import { Toast } from '../components/Toast';
import { CEFR_LEVELS } from '../constants/cefr';
import {
  ALL_SPEAKING_TOPIC_CODES,
  ALL_TOPIC_CODES,
  CEFR_CURRICULUM,
  computeFullCompletion,
  type CurriculumTopic,
} from '@talkstage/shared-data/curriculumData';
import { ALL_GRAMMAR_LESSONS, findGrammarLesson } from '@talkstage/shared-data/grammarLessons';
import {
  CURRICULUM_VOCABULARY,
  findCurriculumWord,
  poolWordCount,
  type CefrVocabPool,
  type CurriculumVocabWord,
} from '../data/curriculumVocabulary';
import { api, ApiError } from '../lib/api';
import { pullLearningFlags } from '../lib/learningFlags';
import type { MainTabScreenProps } from '../navigation/types';
import { cefrAura, cefrThemes, colors, fonts, radii, shadow, spacing } from '../theme/tokens';
import type {
  ProfileOut,
  ReadingPassageOut,
  VocabCardCreate,
  VocabCardOut,
} from '../types/api';

type PosKey = keyof CefrVocabPool;

const POS_LABELS: Record<PosKey, string> = {
  nouns: 'İsimler',
  verbs: 'Fiiller',
  adjectives: 'Sıfatlar',
  adverbs: 'Zarflar',
  phrases: 'Kalıp İfadeler',
};

export function CurriculumScreen({ navigation }: MainTabScreenProps<'Roadmap'>) {
  const queryClient = useQueryClient();
  const [selectedLevel, setSelectedLevel] = useState<string>('A1');
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>(null);
  const [showVocabPool, setShowVocabPool] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [chatCompletedCodes, setChatCompletedCodes] = useState<Set<string>>(new Set());
  const [lessonQuizDoneCodes, setLessonQuizDoneCodes] = useState<Set<string>>(new Set());
  const [selectedTopicModal, setSelectedTopicModal] = useState<CurriculumTopic | null>(null);
  const [chestModalVisible, setChestModalVisible] = useState(false);

  // Auto-scroll to the "current" stepping stone so a level with many topics
  // doesn't force the user to hunt for where they left off every time they
  // open the tab. `measureLayout` against the ScrollView's own node is the
  // standard, stable core-RN pattern for this (not an Expo API, so it isn't
  // affected by the "Expo HAS CHANGED" version-drift warning in AGENTS.md).
  const scrollViewRef = useRef<ScrollView>(null);
  const currentStoneRef = useRef<View>(null);
  const hasAutoScrolledRef = useRef(false);

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
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

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1600);
  };

  const { data: profile } = useQuery({
    queryKey: ['me'],
    queryFn: () => api.get<ProfileOut>('/me'),
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

  const fullCompletion = computeFullCompletion(
    currentCurriculum.topics,
    savedWordsSet,
    chatCompletedCodes,
    completedReadingCountForLevel,
    lessonQuizDoneCodes
  );
  const practicedTopicsCount = currentCurriculum.topics.filter((t) => fullCompletion[t.code]).length;

  // Reset the auto-scroll guard whenever the level changes so switching to a
  // different level's path scrolls to ITS current stone, not wherever the
  // previous level had scrolled to.
  useEffect(() => {
    hasAutoScrolledRef.current = false;
  }, [selectedLevel]);

  useEffect(() => {
    if (hasAutoScrolledRef.current) return;
    // Wait for real profile/vocab data — scrolling based on a transient
    // "nothing fetched yet" completion state would land on the wrong stone.
    if (!profile || !allVocabCards) return;

    const timer = setTimeout(() => {
      const stone = currentStoneRef.current;
      const scroll = scrollViewRef.current;
      if (!stone || !scroll) return;

      const targetNative =
        (scroll as any).getNativeScrollRef?.() ||
        (scroll as any).getInnerViewRef?.();

      if (targetNative && typeof stone.measureLayout === 'function') {
        try {
          stone.measureLayout(
            targetNative,
            (_x, y) => {
              scroll.scrollTo({ y: Math.max(0, y - 160), animated: true });
              hasAutoScrolledRef.current = true;
            },
            () => {}
          );
          return;
        } catch {
          // Fall through to measureInWindow
        }
      }

      // Safe fallback using measureInWindow
      const scrollAny = scroll as any;
      if (typeof stone.measureInWindow === 'function' && typeof scrollAny.measureInWindow === 'function') {
        stone.measureInWindow((_sx: number, sy: number) => {
          scrollAny.measureInWindow((_rx: number, ry: number) => {
            const relY = sy - ry;
            if (relY > 0) {
              scroll.scrollTo({ y: Math.max(0, relY - 160), animated: true });
              hasAutoScrolledRef.current = true;
            }
          });
        });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [selectedLevel, practicedTopicsCount, profile, allVocabCards]);

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
      handleAddTopicWords(topic);
    }
  };

  /** Real label per module type — the old flat "Canlı Pratiğe Başla (+15 XP)"
   * was wrong for all three: vocab topics never navigate anywhere (they just
   * add words in the background) and none of the three actually grant a
   * flat +15 XP the moment this button is tapped. */
  const getPrimaryActionMeta = (topic: CurriculumTopic): { icon: keyof typeof Ionicons.glyphMap; label: string } => {
    if (topic.moduleType === 'speaking') return { icon: 'mic', label: 'Canlı Pratiğe Başla' };
    if (topic.moduleType === 'reading') return { icon: 'book', label: 'Okuma Parçasına Git' };
    return { icon: 'bookmark', label: 'Kelimeleri Sandığa Ekle' };
  };

  const handleStartBossChallenge = () => {
    navigation.navigate('TextChat', {
      focusTopic: { title: currentCurriculum.bossChallenge.title },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <View style={styles.headerTitleRow}>
          <View>
            <Text style={styles.title}>Seviye Haritası 🗺️</Text>
            <Text style={styles.subtitle}>CEFR Müfredatı ve Aday Adası Öğrenme Yolculuğu</Text>
          </View>
          <View style={styles.headerLevelTag}>
            <Text style={styles.headerLevelTagText}>{selectedLevel} Seviyesi</Text>
          </View>
        </View>
      </View>

      {/* Main Roadmap Scroll Content */}
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.curriculumScrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. CEFR Level Selector 3x2 Grid */}
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

        {/* 3. Vocabulary Pool Browser */}
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
                        <Text style={[styles.vocabWordText, saved && styles.vocabWordTextSaved]}>
                          {w.word}
                        </Text>
                        <Text style={styles.vocabWordTrText}>{w.tr}</Text>
                        {saved && <Text style={styles.savedWordCheck}>✓</Text>}
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            ) : null
          )}

        {/* 4. Milestone Chest Progress */}
        <View style={[styles.chestRewardCard, shadow.card]}>
          <Pressable onPress={() => setChestModalVisible(true)} style={styles.chestRow}>
            <Image source={stateImages.goalCelebration} style={styles.chestIcon} resizeMode="contain" />
            <View style={styles.chestTextCol}>
              <Text style={styles.chestPretitle}>AŞAMA ÖDÜLÜ 🎁</Text>
              <Text style={styles.chestTitle}>
                {selectedLevel} İlerleme Sandığı ({practicedTopicsCount}/{currentCurriculum.topics.length})
              </Text>
              <Text style={styles.chestDescription}>
                Her tamamlanan durak bu sandığı biraz daha doldurur — ilerlemeni görmek için dokun.
              </Text>
            </View>
            <View style={styles.chestOpenBtn}>
              <Text style={styles.chestOpenBtnText}>İncele ➔</Text>
            </View>
          </Pressable>
        </View>

        {/* 5. Aday Adası — kıvrımlı stepping-stone yol haritası (3D dolgu +
            koyu alt kenarlık taşlar, tamamlanana ⭐⭐⭐, aktif durağa maskot
            balonu, kilitli duraklara kilit ikonu, her 4 durakta bir hediye
            sandığı) — bu ekran ScenariosScreen'in eski Tab 1'inden ayrı bir
            sekme olarak çıkarılırken bu zengin görünüm yanlışlıkla düz bir
            zigzag listeye (ve sıralı kilit mantığı hiç olmadan) indirgenmişti;
            orijinal tasarım ve kilitleme mantığı birebir geri getirildi. */}
        <View style={[styles.duoIslandWrapper, shadow.card]}>
          <ImageBackground
            source={verticalIslandPathBg}
            style={styles.duoIslandBg}
            imageStyle={styles.duoIslandImg}
            resizeMode="cover"
          >
            <View style={styles.duoIslandOverlay}>
              <View style={styles.islandTimelineHeader}>
                <Text style={styles.islandHeaderTitle}>🌴 {selectedLevel} ADAY ADASI GÖREVLERİ</Text>
                <Text style={styles.islandHeaderSubtitle}>
                  Her durağa tıkla, kuralını gör ve doğrudan pratiğe başla
                </Text>
              </View>

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
                    <View
                      key={topic.id}
                      ref={isCurrent ? currentStoneRef : undefined}
                      style={styles.duoStepWrapper}
                    >
                      {/* Periodic Milestone Treasure Chest on Path */}
                      {idx > 0 && idx % 4 === 0 && (
                        <BouncyPressable
                          onPress={() => setChestModalVisible(true)}
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
                          scaleTo={0.9}
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

        {/* 5b. Bonus Konu Anlatımları */}
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

      {/* DUOLINGO LESSON ACTION MODAL SHEET */}
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
                    <Text style={styles.duoFormulaLabel}>FORMÜL / KURAL</Text>
                  </View>
                  <Text style={styles.duoFormulaText}>{selectedTopicModal.formula}</Text>
                </View>

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

                <View style={styles.duoModalActions}>
                  {(() => {
                    const { icon, label } = getPrimaryActionMeta(selectedTopicModal);
                    return (
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
                        <Ionicons name={icon} size={18} color="#FFFFFF" />
                        <Text style={styles.duoPrimaryBtnText}>{label}</Text>
                      </BouncyPressable>
                    );
                  })()}

                  {/* Konuşma/okuma konularında hedef kelimeler otomatik
                      eklenmiyor — ama bir konunun "tamamlandı" sayılması için
                      (bkz. computeFullCompletion) kelimelerin sandıkta olması
                      da şart. Bu buton olmadan kullanıcı sohbeti/okumayı
                      bitirse bile durak neden hâlâ kilitli/bitmemiş
                      göründüğünü anlayamıyordu. */}
                  {selectedTopicModal.moduleType !== 'vocab' &&
                    (() => {
                      const wordsAllSaved = selectedTopicModal.targetWords.every((w) =>
                        savedWordsSet.has(w.trim().toLowerCase())
                      );
                      return (
                        <BouncyPressable
                          onPress={() => handleAddTopicWords(selectedTopicModal)}
                          disabled={wordsAllSaved}
                          style={[styles.duoSecondaryBtn, wordsAllSaved && styles.duoSecondaryBtnDisabled]}
                          hapticType="light"
                          scaleTo={0.96}
                        >
                          <Ionicons
                            name={wordsAllSaved ? 'checkmark-circle' : 'bookmark-outline'}
                            size={16}
                            color={wordsAllSaved ? '#059669' : colors.brand}
                          />
                          <Text
                            style={[
                              styles.duoSecondaryBtnText,
                              wordsAllSaved && styles.duoSecondaryBtnTextDisabled,
                            ]}
                          >
                            {wordsAllSaved ? 'Kelimeler Sandığında ✓' : 'Bu Konunun Kelimelerini Sandığa Ekle'}
                          </Text>
                        </BouncyPressable>
                      );
                    })()}

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

      {/* Milestone Chest Modal */}
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
            <Text style={styles.chestModalTitle}>{selectedLevel} İlerleme Sandığı</Text>
            <Text style={styles.chestModalDesc}>
              {practicedTopicsCount === 0
                ? `${currentCurriculum.topics.length} duraklık bu yolculuğa henüz başlamadın — ilk durağa dokunup başla!`
                : practicedTopicsCount >= currentCurriculum.topics.length
                  ? `${selectedLevel} seviyesindeki tüm ${currentCurriculum.topics.length} durağı tamamladın! Bir üst seviyeye veya Değerlendirme Sohbeti'ne geçebilirsin.`
                  : `Şu ana kadar ${practicedTopicsCount}/${currentCurriculum.topics.length} durağı tamamladın. Kalan ${currentCurriculum.topics.length - practicedTopicsCount} durak seni bekliyor!`}
            </Text>
            <BouncyPressable
              onPress={() => setChestModalVisible(false)}
              style={styles.chestClaimBtn}
              hapticType="success"
              scaleTo={0.94}
            >
              <Text style={styles.chestClaimBtnText}>Devam Et 🚀</Text>
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
    paddingTop: spacing.xs,
    paddingBottom: spacing.sm,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(226, 232, 240, 0.8)',
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: fonts.headingBold,
    fontSize: 20,
    color: colors.textHeading,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
  },
  headerLevelTag: {
    backgroundColor: 'rgba(79, 70, 229, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(79, 70, 229, 0.25)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.pill,
  },
  headerLevelTagText: {
    fontFamily: fonts.headingBold,
    fontSize: 10.5,
    color: colors.brand,
  },

  /* Curriculum Scroll Content */
  curriculumScrollContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: 110,
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
    fontFamily: fonts.headingBold,
    fontSize: 8.5,
    color: colors.brand,
    marginTop: 1,
  },

  /* Hero Level Card */
  heroLevelCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.xl,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1.5,
    borderColor: 'rgba(226, 232, 240, 0.9)',
  },
  heroLevelHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: spacing.sm,
  },
  heroBadgeImage: {
    width: 48,
    height: 48,
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
    letterSpacing: 0.5,
  },
  heroLevelPretitle: {
    fontFamily: fonts.headingBold,
    fontSize: 15,
    color: colors.textHeading,
  },
  heroLevelObjective: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11.5,
    color: colors.textMuted,
    marginTop: 1,
  },

  /* Progress Bar */
  levelProgressContainer: {
    marginBottom: 10,
  },
  levelProgressTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  levelProgressLabel: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
  },
  levelProgressPercent: {
    fontFamily: fonts.headingBold,
    fontSize: 11,
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

  /* Hero Stats */
  heroStatsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  heroStatChip: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.sm,
  },
  heroStatChipText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10.5,
    color: colors.textMuted,
  },
  heroStatChipSuccess: {
    backgroundColor: '#ECFDF5',
    borderColor: '#A7F3D0',
  },
  heroStatChipTextSuccess: {
    color: '#059669',
    fontFamily: fonts.headingBold,
  },

  /* Vocab Pool Card */
  vocabPoolCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.lg,
    padding: 12,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  vocabPoolHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  vocabPoolHeaderText: {
    fontFamily: fonts.headingBold,
    fontSize: 12.5,
    color: colors.textHeading,
  },
  vocabPoolHint: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10.5,
    color: colors.textMuted,
    marginTop: 4,
  },
  posSection: {
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  posLabel: {
    fontFamily: fonts.headingBold,
    fontSize: 11,
    color: colors.textHeading,
    marginBottom: 6,
  },
  wordGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  vocabWordChip: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: radii.sm,
    paddingHorizontal: 7,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  vocabWordChipSaved: {
    backgroundColor: '#ECFDF5',
    borderColor: '#A7F3D0',
  },
  vocabWordText: {
    fontFamily: fonts.headingBold,
    fontSize: 11,
    color: colors.textHeading,
  },
  vocabWordTextSaved: {
    color: '#059669',
  },
  vocabWordTrText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 9.5,
    color: colors.textMuted,
  },
  savedWordCheck: {
    fontSize: 9.5,
    color: '#10B981',
    fontWeight: 'bold',
  },

  /* Chest Card */
  chestRewardCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.lg,
    padding: 12,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  chestRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  chestIcon: {
    width: 36,
    height: 36,
  },
  chestTextCol: {
    flex: 1,
  },
  chestPretitle: {
    fontFamily: fonts.headingBold,
    fontSize: 9.5,
    color: '#D97706',
    letterSpacing: 0.5,
  },
  chestTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 12.5,
    color: colors.textHeading,
  },
  chestDescription: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10.5,
    color: colors.textMuted,
    marginTop: 1,
  },
  chestOpenBtn: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: radii.pill,
  },
  chestOpenBtnText: {
    fontFamily: fonts.headingBold,
    fontSize: 10.5,
    color: '#B45309',
  },

  /* Roadmap Island Section */
  /* Aday Adası — restored 3D winding stepping-stone path (see JSX comment
     above for why this was reintroduced verbatim from the original
     ScenariosScreen Tab 1 rather than kept as the flatter zigzag list). */
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
  islandTimelineHeader: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  islandHeaderTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 13,
    color: colors.textHeading,
    letterSpacing: 0.3,
  },
  islandHeaderSubtitle: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10.5,
    color: colors.textMuted,
    marginTop: 2,
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

  /* Bonus Lessons */
  bonusLessonsSection: {
    marginBottom: spacing.md,
  },
  timelineSectionTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 13,
    color: colors.textHeading,
    marginBottom: 8,
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
    borderRadius: radii.xl,
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
  bossTrophyImage: {
    width: 36,
    height: 36,
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
  // Same "chunky 3D" depth language as Ana Ekran/Seviyeler — solid fill +
  // darker bottom border + colored glow.
  bossStartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.brand,
    paddingVertical: 13,
    borderRadius: radii.lg,
    gap: 6,
    borderBottomWidth: 4,
    borderBottomColor: '#3730A3',
    shadowColor: colors.brand,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  bossStartButtonText: {
    fontFamily: fonts.headingBold,
    fontSize: 12.5,
    color: '#FFFFFF',
  },

  /* Modals */
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
  duoModalActions: {
    gap: 8,
  },
  duoPrimaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.brand,
    paddingVertical: 12,
    borderRadius: radii.lg,
    gap: 6,
  },
  duoPrimaryBtnText: {
    fontFamily: fonts.headingBold,
    fontSize: 13,
    color: '#FFFFFF',
  },
  duoSecondaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEF2FF',
    paddingVertical: 10,
    borderRadius: radii.lg,
    gap: 6,
  },
  duoSecondaryBtnText: {
    fontFamily: fonts.headingBold,
    fontSize: 12,
    color: colors.brand,
  },
  duoSecondaryBtnDisabled: {
    backgroundColor: '#ECFDF5',
  },
  duoSecondaryBtnTextDisabled: {
    color: '#059669',
  },

  /* Chest Modal Card */
  chestModalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.xl,
    padding: spacing.lg,
    marginHorizontal: spacing.lg,
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 'auto',
  },
  chestModalEmoji: {
    fontSize: 48,
    marginBottom: 10,
  },
  chestModalTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 16,
    color: colors.textHeading,
    textAlign: 'center',
    marginBottom: 6,
  },
  chestModalDesc: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 17,
    marginBottom: 16,
  },
  chestClaimBtn: {
    backgroundColor: colors.brand,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: radii.lg,
    borderBottomWidth: 4,
    borderBottomColor: '#3730A3',
    shadowColor: colors.brand,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  chestClaimBtnText: {
    fontFamily: fonts.headingBold,
    fontSize: 13,
    color: '#FFFFFF',
  },
});
