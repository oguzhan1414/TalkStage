import { Ionicons } from '@expo/vector-icons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  cefrLevelImages,
  companionImage,
  scenarioCategoryImages,
  stateImages,
} from '../assets/images';
import { Toast } from '../components/Toast';
import { SCENARIO_CATEGORIES, type ScenarioCategory } from '../constants/categories';
import { CEFR_LEVELS } from '../constants/cefr';
import { CEFR_CURRICULUM, type CurriculumTopic } from '../data/curriculumData';
import { ALL_GRAMMAR_LESSONS, findGrammarLesson } from '../data/grammarLessons';
import {
  CURRICULUM_VOCABULARY,
  findCurriculumWord,
  poolWordCount,
  type CefrVocabPool,
  type CurriculumVocabWord,
} from '../data/curriculumVocabulary';
import { api, ApiError } from '../lib/api';
import type { MainTabScreenProps } from '../navigation/types';
import { colors, fonts, radii, shadow, spacing } from '../theme/tokens';
import type { ProfileOut, ScenarioOut, VocabCardCreate, VocabCardOut } from '../types/api';

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
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>(null);
  const [showVocabPool, setShowVocabPool] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

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

  // Real signal for "did the user actually engage with this topic's
  // vocabulary" — reuses the same dedup-aware POST /vocab-cards endpoint
  // every other screen already uses, no new backend surface needed.
  const { data: allVocabCards } = useQuery({
    queryKey: ['vocab-cards', 'all'],
    queryFn: () => api.get<VocabCardOut[]>('/vocab-cards?all=true'),
  });

  const savedWordsSet = new Set((allVocabCards ?? []).map((c) => c.term.trim().toLowerCase()));
  const countSavedWords = (words: string[]) =>
    words.filter((w) => savedWordsSet.has(w.trim().toLowerCase())).length;

  const currentCurriculum = CEFR_CURRICULUM[selectedLevel] ?? CEFR_CURRICULUM.A1;
  const currentVocabPool = CURRICULUM_VOCABULARY[selectedLevel] ?? CURRICULUM_VOCABULARY.A1;
  const levelBadge = cefrLevelImages[selectedLevel] ?? cefrLevelImages.A1;
  const practicedTopicsCount = currentCurriculum.topics.filter(
    (t) => countSavedWords(t.targetWords) === t.targetWords.length
  ).length;

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
          {/* 1. CEFR Level Selector Tabs (A1, A2, B1, B2, C1, C2) */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.levelTabsRow}
          >
            {CEFR_LEVELS.map((lvl) => {
              const isSelected = selectedLevel === lvl;
              const isUserCurrent = (profile?.cefr_level ?? 'A1') === lvl;

              return (
                <Pressable
                  key={lvl}
                  onPress={() => setSelectedLevel(lvl)}
                  style={[styles.levelTabChip, isSelected && styles.levelTabChipActive]}
                >
                  <Image
                    source={cefrLevelImages[lvl] ?? cefrLevelImages.A1}
                    style={styles.levelTabIcon}
                    resizeMode="contain"
                  />
                  <View>
                    <Text
                      style={[
                        styles.levelTabTitle,
                        isSelected && styles.levelTabTitleActive,
                      ]}
                    >
                      {lvl} Seviyesi
                    </Text>
                    {isUserCurrent && <Text style={styles.userCurrentBadge}>Mevcut</Text>}
                  </View>
                </Pressable>
              );
            })}
          </ScrollView>

          {/* 2. Hero Level Overview Card */}
          <View style={[styles.heroLevelCard, shadow.card]}>
            <View style={styles.heroLevelHeaderRow}>
              <Image source={levelBadge} style={styles.heroBadgeImage} resizeMode="contain" />
              <View style={styles.heroLevelTextCol}>
                <Text style={styles.heroLevelPretitle}>
                  {selectedLevel} • {currentCurriculum.title}
                </Text>
                <Text style={styles.heroLevelObjective}>{currentCurriculum.objective}</Text>
              </View>
            </View>

            {/* Meta Stats Chips — all derived from real arrays, never hand-typed numbers */}
            <View style={styles.heroStatsRow}>
              <View style={styles.heroStatChip}>
                <Text style={styles.heroStatChipText}>
                  ⏱️ {currentCurriculum.targetDays} Günlük Plan
                </Text>
              </View>
              <View style={styles.heroStatChip}>
                <Text style={styles.heroStatChipText}>
                  📚 {currentCurriculum.topics.length} Konu
                </Text>
              </View>
              <View style={styles.heroStatChip}>
                <Text style={styles.heroStatChipText}>
                  📦 {poolWordCount(currentVocabPool)} Kelime
                </Text>
              </View>
              <View style={[styles.heroStatChip, styles.heroStatChipSuccess]}>
                <Text style={[styles.heroStatChipText, styles.heroStatChipTextSuccess]}>
                  ✅ {practicedTopicsCount}/{currentCurriculum.topics.length} Pratiği Yapıldı
                </Text>
              </View>
            </View>
          </View>

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
              📌 {selectedLevel} Konuları ve Uygulama İstasyonları:
            </Text>
          </View>

          {/* 5. Timeline Nodes Flow */}
          <View style={styles.timelineContainer}>
            <View style={styles.timelineVerticalLine} />

            {currentCurriculum.topics.map((topic, idx) => {
              const isExpanded = expandedTopicId === topic.id;
              const savedCount = countSavedWords(topic.targetWords);
              const isPracticed = savedCount === topic.targetWords.length;

              return (
                <View key={topic.id} style={styles.timelineNodeRow}>
                  {/* Left Step Circle */}
                  <View
                    style={[
                      styles.timelineCircle,
                      isPracticed && styles.timelineCircleCompleted,
                    ]}
                  >
                    <Text
                      style={[
                        styles.timelineCircleNumber,
                        isPracticed && styles.timelineCircleNumberCompleted,
                      ]}
                    >
                      {isPracticed ? '✓' : idx + 1}
                    </Text>
                  </View>

                  {/* Right Topic Content Card */}
                  <View style={[styles.topicCard, shadow.card]}>
                    {/* Top Tag & Code */}
                    <View style={styles.topicCardTopRow}>
                      <View style={styles.topicCodePill}>
                        <Text style={styles.topicCodeText}>{topic.code}</Text>
                      </View>

                      <View
                        style={[
                          styles.moduleTypeBadge,
                          topic.moduleType === 'speaking' && styles.moduleTypeSpeaking,
                          topic.moduleType === 'reading' && styles.moduleTypeReading,
                          topic.moduleType === 'vocab' && styles.moduleTypeVocab,
                        ]}
                      >
                        <Text style={styles.moduleTypeText}>
                          {topic.moduleType === 'speaking'
                            ? '💬 Sohbet Pratiği'
                            : topic.moduleType === 'reading'
                              ? '📖 Smart Reading'
                              : '📦 Kelime Paketi'}
                        </Text>
                      </View>
                    </View>

                    {/* Topic Title */}
                    <Text style={styles.topicTitleText}>{topic.title}</Text>

                    {/* Grammar Formula Box */}
                    <View style={styles.formulaBox}>
                      <Text style={styles.formulaLabel}>FORMÜL / KURAL:</Text>
                      <Text style={styles.formulaText}>{topic.formula}</Text>
                    </View>

                    {/* Description */}
                    <Text style={styles.topicDescriptionText}>{topic.description}</Text>

                    {/* Target Vocabulary Chips */}
                    <View style={styles.targetWordsRow}>
                      {topic.targetWords.slice(0, 4).map((w) => (
                        <View key={w} style={styles.targetWordChip}>
                          <Text style={styles.targetWordText}>{w}</Text>
                        </View>
                      ))}
                    </View>

                    {/* Primary Action Button */}
                    <Pressable
                      onPress={() => handleStartTopicAction(topic)}
                      style={[
                        styles.actionButton,
                        topic.moduleType === 'reading' && styles.actionButtonReading,
                        topic.moduleType === 'vocab' && styles.actionButtonVocab,
                      ]}
                    >
                      <Text style={styles.actionButtonText}>
                        {topic.moduleType === 'speaking'
                          ? '💬 Sohbette Pratik Yap ➔'
                          : topic.moduleType === 'reading'
                            ? '📖 Okuma Listesine Git ➔'
                            : '📦 Kelime Kartlarına Git ➔'}
                      </Text>
                    </Pressable>

                    {/* Secondary: bulk-add this topic's vocabulary */}
                    <Pressable
                      onPress={() => handleAddTopicWords(topic)}
                      disabled={isPracticed}
                      style={styles.addWordsLink}
                      hitSlop={8}
                    >
                      <Text style={[styles.addWordsLinkText, isPracticed && styles.addWordsLinkTextDone]}>
                        {isPracticed
                          ? '✓ Kelimeler Sandıkta'
                          : `📚 Kelimeleri Sandığa Ekle (${savedCount}/${topic.targetWords.length})`}
                      </Text>
                    </Pressable>

                    {/* Full grammar lesson entry point — only shown for topics with real hand-authored content (currently A1) */}
                    {findGrammarLesson(topic.code) ? (
                      <Pressable
                        onPress={() => navigation.navigate('GrammarLesson', { code: topic.code })}
                        style={styles.grammarLessonLink}
                        hitSlop={8}
                      >
                        <Text style={styles.grammarLessonLinkText}>📘 Konu Anlatımını Oku ➔</Text>
                      </Pressable>
                    ) : null}

                    {/* Expand/Collapse Examples Link */}
                    <Pressable
                      onPress={() => setExpandedTopicId(isExpanded ? null : topic.id)}
                      style={styles.expandLink}
                      hitSlop={8}
                    >
                      <Text style={styles.expandLinkText}>
                        {isExpanded ? 'Örnekleri Gizle ▲' : 'Örnek Cümleleri Göster ▼'}
                      </Text>
                    </Pressable>

                    {/* Expanded Examples View */}
                    {isExpanded && (
                      <View style={styles.expandedExamplesBox}>
                        {topic.examples.map((ex, exIdx) => (
                          <View key={exIdx} style={styles.exampleItem}>
                            <Text style={styles.exampleEn}>🇬🇧 {ex.en}</Text>
                            <Text style={styles.exampleTr}>🇹🇷 {ex.tr}</Text>
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
                </View>
              );
            })}
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
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filterList}
            contentContainerStyle={styles.filterListContent}
            data={[{ id: 'all' as const, label: 'Tümü' }, ...SCENARIO_CATEGORIES]}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => setCategoryFilter(item.id)}
                style={[
                  styles.filterChip,
                  categoryFilter === item.id && styles.filterChipActive,
                ]}
              >
                <Text
                  style={[
                    styles.filterLabel,
                    categoryFilter === item.id && styles.filterLabelActive,
                  ]}
                >
                  {item.label}
                </Text>
              </Pressable>
            )}
          />

          {scenariosLoading ? (
            <ActivityIndicator style={styles.stateBlock} color={colors.brand} />
          ) : !allScenarios?.length ? (
            <View style={styles.stateBlock}>
              <Text style={styles.stateText}>Bu kategoride henüz sahne yok.</Text>
            </View>
          ) : (
            <FlatList
              data={allScenarios}
              keyExtractor={(item) => item.slug}
              contentContainerStyle={styles.scenarioListContent}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() =>
                    navigation.navigate('LiveConversationRoom', {
                      scenarioId: item.id,
                      scenarioSlug: item.slug,
                      scenarioTitle: item.title,
                    })
                  }
                  style={[styles.scenarioCard, shadow.card]}
                >
                  <Image
                    source={scenarioCategoryImages[item.category] ?? companionImage}
                    style={styles.scenarioImage}
                    resizeMode="cover"
                  />
                  <View style={styles.scenarioContent}>
                    <View style={styles.scenarioBadgeRow}>
                      <Text style={styles.scenarioLevelBadge}>
                        {item.cefr_level ?? 'A2'} Seviye
                      </Text>
                      <Text style={styles.scenarioTime}>
                        ⏱️ {item.estimated_minutes} Dk
                      </Text>
                    </View>
                    <Text style={styles.scenarioTitle}>{item.title}</Text>
                    <Text style={styles.scenarioDesc} numberOfLines={2}>
                      {item.description}
                    </Text>
                  </View>
                </Pressable>
              )}
            />
          )}
        </View>
      )}

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
  levelTabChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: radii.pill,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1.5,
    borderColor: 'rgba(226, 232, 240, 0.9)',
    gap: 6,
  },
  levelTabChipActive: {
    borderColor: colors.brand,
    backgroundColor: 'rgba(79, 70, 229, 0.08)',
  },
  levelTabIcon: {
    width: 22,
    height: 22,
  },
  levelTabTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 12,
    color: colors.textMuted,
  },
  levelTabTitleActive: {
    color: colors.brand,
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

  /* Timeline Nodes */
  timelineContainer: {
    position: 'relative',
    paddingLeft: 4,
    marginBottom: 16,
  },
  timelineVerticalLine: {
    position: 'absolute',
    left: 17,
    top: 20,
    bottom: 20,
    width: 2,
    backgroundColor: 'rgba(79, 70, 229, 0.15)',
  },
  timelineNodeRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  timelineCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 10,
    zIndex: 1,
  },
  timelineCircleCompleted: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  timelineCircleNumber: {
    fontFamily: fonts.headingBold,
    fontSize: 11,
    color: colors.brand,
  },
  timelineCircleNumberCompleted: {
    color: '#FFFFFF',
  },

  /* Topic Card */
  topicCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: radii.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.9)',
  },
  topicCardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  topicCodePill: {
    backgroundColor: 'rgba(15, 23, 42, 0.06)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  topicCodeText: {
    fontFamily: fonts.mono,
    fontSize: 9,
    fontWeight: 'bold',
    color: colors.textHeading,
  },
  moduleTypeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radii.pill,
    backgroundColor: 'rgba(79, 70, 229, 0.08)',
  },
  moduleTypeSpeaking: {
    backgroundColor: 'rgba(79, 70, 229, 0.1)',
  },
  moduleTypeReading: {
    backgroundColor: 'rgba(2, 132, 199, 0.1)',
  },
  moduleTypeVocab: {
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
  },
  moduleTypeText: {
    fontFamily: fonts.headingBold,
    fontSize: 9,
    color: colors.textHeading,
  },
  topicTitleText: {
    fontFamily: fonts.headingBold,
    fontSize: 14,
    color: colors.textHeading,
    marginBottom: 6,
  },
  formulaBox: {
    backgroundColor: '#F8FAFC',
    padding: 8,
    borderRadius: radii.md,
    borderLeftWidth: 3,
    borderLeftColor: colors.brand,
    marginBottom: 6,
  },
  formulaLabel: {
    fontFamily: fonts.mono,
    fontSize: 8,
    fontWeight: 'bold',
    color: colors.textMuted,
    marginBottom: 2,
  },
  formulaText: {
    fontFamily: fonts.mono,
    fontSize: 10,
    color: colors.brand,
    fontWeight: 'bold',
  },
  topicDescriptionText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textBody,
    marginBottom: 8,
    lineHeight: 15,
  },
  targetWordsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginBottom: 10,
  },
  targetWordChip: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  targetWordText: {
    fontFamily: fonts.mono,
    fontSize: 9,
    color: colors.textMuted,
  },
  actionButton: {
    backgroundColor: colors.brand,
    paddingVertical: 8,
    borderRadius: radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonReading: {
    backgroundColor: '#0284C7',
  },
  actionButtonVocab: {
    backgroundColor: '#D97706',
  },
  actionButtonText: {
    fontFamily: fonts.headingBold,
    fontSize: 11,
    color: '#FFFFFF',
  },
  addWordsLink: {
    alignItems: 'center',
    marginTop: 8,
  },
  addWordsLinkText: {
    fontFamily: fonts.headingBold,
    fontSize: 10,
    color: colors.brand,
  },
  addWordsLinkTextDone: {
    color: colors.success,
  },
  grammarLessonLink: {
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: 'rgba(79, 70, 229, 0.06)',
    paddingVertical: 6,
    borderRadius: radii.pill,
  },
  grammarLessonLinkText: {
    fontFamily: fonts.headingBold,
    fontSize: 10,
    color: colors.brand,
  },
  expandLink: {
    alignItems: 'center',
    marginTop: 8,
  },
  expandLinkText: {
    fontFamily: fonts.headingBold,
    fontSize: 10,
    color: colors.textMuted,
  },
  expandedExamplesBox: {
    backgroundColor: '#F8FAFC',
    padding: 8,
    borderRadius: radii.md,
    marginTop: 8,
    gap: 6,
  },
  exampleItem: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(226, 232, 240, 0.6)',
    paddingBottom: 4,
  },
  exampleEn: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textHeading,
    fontWeight: '600',
  },
  exampleTr: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10,
    color: colors.textMuted,
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
  filterList: {
    maxHeight: 52,
  },
  filterListContent: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radii.pill,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.9)',
  },
  filterChipActive: {
    backgroundColor: colors.brand,
    borderColor: colors.brand,
  },
  filterLabel: {
    fontFamily: fonts.headingBold,
    fontSize: 11,
    color: colors.textMuted,
  },
  filterLabelActive: {
    color: '#FFFFFF',
  },
  scenarioListContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: 110,
    gap: 12,
  },
  scenarioCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.8)',
    flexDirection: 'row',
  },
  scenarioImage: {
    width: 90,
    height: 90,
  },
  scenarioContent: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  scenarioBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  scenarioLevelBadge: {
    fontFamily: fonts.mono,
    fontSize: 9,
    fontWeight: 'bold',
    color: colors.brand,
  },
  scenarioTime: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10,
    color: colors.textMuted,
  },
  scenarioTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 13,
    color: colors.textHeading,
    marginBottom: 2,
  },
  scenarioDesc: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10,
    color: colors.textMuted,
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
