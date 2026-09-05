import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Toast } from '../components/Toast';
import {
  ADJECTIVES_100,
  ADJECTIVES_200,
  ADJECTIVES_300,
  NOUNS_100,
  NOUNS_200,
  NOUNS_300,
  VERBS_100,
  VERBS_200,
  VERBS_300,
  type LibraryWordEntry,
} from '../data/vocabLibrary';
import { usePronunciation } from '../hooks/usePronunciation';
import { api, ApiError } from '../lib/api';
import type { VocabLibraryScreenProps } from '../navigation/types';
import { colors, fonts, radii, shadow, spacing } from '../theme/tokens';
import type { VocabCardCreate, VocabCardOut, VocabLibraryProgressCreate } from '../types/api';

type LibraryCategory = 'nouns' | 'verbs' | 'adjectives';

const PACKS: Record<
  LibraryCategory,
  {
    id: string;
    label: string;
    icon: string;
    sets: { id: string; name: string; range: string; words: LibraryWordEntry[] }[];
  }
> = {
  nouns: {
    id: 'nouns',
    label: 'İsimler',
    icon: '📦',
    sets: [
      { id: 'nouns_1', name: '1. Paket', range: '1 – 100', words: NOUNS_100 },
      { id: 'nouns_2', name: '2. Paket', range: '101 – 200', words: NOUNS_200 },
      { id: 'nouns_3', name: '3. Paket', range: '201 – 300', words: NOUNS_300 },
    ],
  },
  verbs: {
    id: 'verbs',
    label: 'Fiiller',
    icon: '🏃',
    sets: [
      { id: 'verbs_1', name: '1. Paket', range: '1 – 100', words: VERBS_100 },
      { id: 'verbs_2', name: '2. Paket', range: '101 – 200', words: VERBS_200 },
      { id: 'verbs_3', name: '3. Paket', range: '201 – 300', words: VERBS_300 },
    ],
  },
  adjectives: {
    id: 'adjectives',
    label: 'Sıfatlar',
    icon: '🎯',
    sets: [
      { id: 'adjectives_1', name: '1. Paket', range: '1 – 100', words: ADJECTIVES_100 },
      { id: 'adjectives_2', name: '2. Paket', range: '101 – 200', words: ADJECTIVES_200 },
      { id: 'adjectives_3', name: '3. Paket', range: '201 – 300', words: ADJECTIVES_300 },
    ],
  },
};

export function VocabLibraryScreen({ navigation }: VocabLibraryScreenProps) {
  const queryClient = useQueryClient();
  const { pronounce } = usePronunciation();
  const listRef = useRef<FlatList<LibraryWordEntry>>(null);
  // Only auto-jump once per pack (on first load) — not on every add/skip
  // action within that pack, which would yank the list out from under the
  // user mid-browse.
  const autoScrolledPackKey = useRef<string | null>(null);

  const [category, setCategory] = useState<LibraryCategory>('nouns');
  const [packIndex, setPackIndex] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  // Fetch all saved cards from Supabase to compute real dedup + pack progress
  const { data: allCards, isLoading } = useQuery({
    queryKey: ['vocab-cards', 'all'],
    queryFn: () => api.get<VocabCardOut[]>('/vocab-cards?all=true'),
  });

  // Words explicitly marked "Biliyorum, Atla" — reviewed but never saved to
  // the chest, so they still need their own persisted signal (see backend
  // Ek: vocab_library_progress) or every pack would look 0% done forever.
  const { data: dismissedWordIds, isLoading: progressLoading } = useQuery({
    queryKey: ['vocab-library-progress'],
    queryFn: () => api.get<string[]>('/vocab-library/progress'),
  });

  const savedTermsLower = useMemo(
    () => new Set((allCards ?? []).map((c) => c.term.trim().toLowerCase())),
    [allCards]
  );
  const dismissedIds = useMemo(() => new Set(dismissedWordIds ?? []), [dismissedWordIds]);

  const activeCategoryObj = PACKS[category];
  const activeSet = activeCategoryObj.sets[packIndex] ?? activeCategoryObj.sets[0];

  const isWordReviewed = (w: LibraryWordEntry) =>
    savedTermsLower.has(w.word.trim().toLowerCase()) || dismissedIds.has(w.id);

  // Filtered by search query
  const filteredWords = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return activeSet.words;
    return activeSet.words.filter(
      (w) =>
        w.word.toLowerCase().includes(q) ||
        w.translation.toLowerCase().includes(q) ||
        w.exampleEn.toLowerCase().includes(q) ||
        w.exampleTr.toLowerCase().includes(q)
    );
  }, [activeSet, searchQuery]);

  // Pack completion stats — "reviewed" now covers both saved AND explicitly
  // skipped words, so the percentage (and the resume-scroll below) reflect
  // real exposure to the pack, not just how many ended up in the chest.
  const reviewedInActiveSetCount = useMemo(() => {
    return activeSet.words.filter(isWordReviewed).length;
  }, [activeSet, savedTermsLower, dismissedIds]);

  const packProgressPercent = Math.round((reviewedInActiveSetCount / activeSet.words.length) * 100);

  // Resume where the user left off: once both data sources are ready, jump
  // straight to the first not-yet-reviewed word in the pack instead of
  // always restarting at #1 — otherwise a returning user only ever re-sees
  // the same first 10-20 words and the 100th word is never reached.
  useEffect(() => {
    if (searchQuery.trim()) return;
    if (isLoading || progressLoading) return;
    const packKey = `${category}_${packIndex}`;
    if (autoScrolledPackKey.current === packKey) return;
    autoScrolledPackKey.current = packKey;

    const firstUnreviewedIndex = activeSet.words.findIndex((w) => !isWordReviewed(w));
    if (firstUnreviewedIndex > 0) {
      const timer = setTimeout(() => {
        listRef.current?.scrollToIndex({
          index: firstUnreviewedIndex,
          animated: false,
          viewPosition: 0,
        });
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [category, packIndex, isLoading, progressLoading, activeSet, savedTermsLower, dismissedIds, searchQuery]);

  const handleAddWord = async (entry: LibraryWordEntry) => {
    if (savedTermsLower.has(entry.word.trim().toLowerCase())) return;
    try {
      await api.post<VocabCardOut>('/vocab-cards', {
        term: entry.word,
        translation: entry.translation,
        example_sentence: entry.exampleEn,
        part_of_speech: entry.partOfSpeech,
        source_label: `${activeCategoryObj.label} (${activeSet.range})`,
      } satisfies VocabCardCreate);

      await queryClient.invalidateQueries({ queryKey: ['vocab-cards'] });
      await queryClient.invalidateQueries({ queryKey: ['vocab-cards', 'all'] });
      showToast(`“${entry.word}” Kelime Sandığına eklendi 📚`);
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : 'Kelime eklenemedi');
    }
  };

  const handleMarkKnown = async (entry: LibraryWordEntry) => {
    if (dismissedIds.has(entry.id)) return;
    try {
      await api.post('/vocab-library/progress', {
        word_id: entry.id,
      } satisfies VocabLibraryProgressCreate);
      await queryClient.invalidateQueries({ queryKey: ['vocab-library-progress'] });
      showToast(`“${entry.word}” biliniyor olarak işaretlendi ✓`);
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : 'İşaretlenemedi');
    }
  };

  const handleUndoKnown = async (entry: LibraryWordEntry) => {
    try {
      await api.delete(`/vocab-library/progress/${entry.id}`);
      await queryClient.invalidateQueries({ queryKey: ['vocab-library-progress'] });
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : 'Geri alınamadı');
    }
  };

  const handleCategoryChange = (newCat: LibraryCategory) => {
    setCategory(newCat);
    setPackIndex(0);
    setSearchQuery('');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top App Bar */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={20} color={colors.textHeading} />
        </Pressable>
        <View style={styles.headerTitleCol}>
          <Text style={styles.headerTitle}>Kelime Kütüphanesi</Text>
          <Text style={styles.headerSub}>En Sık Kullanılan 900 Çekirdek Kelime</Text>
        </View>
        <Pressable
          onPress={() => navigation.navigate('Main', { screen: 'Vocab' })}
          style={styles.goToChestBtn}
        >
          <Ionicons name="archive" size={15} color={colors.brand} />
          <Text style={styles.goToChestBtnText}>Sandığım</Text>
        </Pressable>
      </View>

      <FlatList
        ref={listRef}
        data={filteredWords}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        maxToRenderPerBatch={15}
        windowSize={5}
        onScrollToIndexFailed={(info) => {
          setTimeout(() => {
            listRef.current?.scrollToOffset({
              offset: info.averageItemLength * info.index,
              animated: false,
            });
          }, 100);
        }}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            {/* 1. Main Category Tabs (İsimler / Fiiller / Sıfatlar) */}
            <View style={styles.categoryTabsRow}>
              {(Object.keys(PACKS) as LibraryCategory[]).map((catKey) => {
                const cat = PACKS[catKey];
                const isActive = category === catKey;
                return (
                  <Pressable
                    key={catKey}
                    onPress={() => handleCategoryChange(catKey)}
                    style={[styles.categoryTab, isActive && styles.categoryTabActive]}
                  >
                    <Text style={styles.categoryTabIcon}>{cat.icon}</Text>
                    <Text style={[styles.categoryTabText, isActive && styles.categoryTabTextActive]}>
                      {cat.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            {/* 2. Responsive 3-SubPack Selector */}
            <View style={styles.subPackContainer}>
              {activeCategoryObj.sets.map((s, idx) => {
                const isSelected = packIndex === idx;
                return (
                  <Pressable
                    key={s.id}
                    onPress={() => {
                      setPackIndex(idx);
                      setSearchQuery('');
                    }}
                    style={[styles.subPackButton, isSelected && styles.subPackButtonActive]}
                  >
                    <Text
                      style={[styles.subPackButtonTitle, isSelected && styles.subPackButtonTitleActive]}
                    >
                      {s.name}
                    </Text>
                    <Text
                      style={[styles.subPackButtonRange, isSelected && styles.subPackButtonRangeActive]}
                    >
                      ({s.range})
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            {/* 3. Progress Card (Paket İlerleme Çubuğu) */}
            <View style={styles.progressCard}>
              <View style={styles.progressHeaderRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.progressTitle}>
                    {activeCategoryObj.icon} {activeCategoryObj.label} • {activeSet.name} İlerlemesi
                  </Text>
                  <Text style={styles.progressSub}>
                    100 kelimeden {reviewedInActiveSetCount} tanesi incelendi (sandıkta veya atlanmış)
                  </Text>
                </View>
                <View style={styles.progressPercentBadge}>
                  <Text style={styles.progressPercentText}>%{packProgressPercent}</Text>
                </View>
              </View>

              <View style={styles.progressBarTrack}>
                <View style={[styles.progressBarFill, { width: `${Math.max(4, packProgressPercent)}%` }]} />
              </View>
            </View>

            {/* 4. Search Bar */}
            <View style={styles.searchBarBox}>
              <Ionicons name="search" size={17} color={colors.textMuted} />
              <TextInput
                style={styles.searchBarInput}
                placeholder={`${activeSet.name} (${activeSet.range}) içinde ara...`}
                placeholderTextColor={colors.textMuted}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              {searchQuery ? (
                <Pressable onPress={() => setSearchQuery('')} hitSlop={10}>
                  <Ionicons name="close-circle" size={17} color={colors.textMuted} />
                </Pressable>
              ) : null}
            </View>
          </View>
        }
        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator style={{ paddingVertical: 40 }} color={colors.brand} />
          ) : (
            <View style={styles.emptyBox}>
              <Ionicons name="search-outline" size={32} color={colors.textMuted} />
              <Text style={styles.emptyTitle}>Aradığın kelime bulunamadı</Text>
              <Text style={styles.emptySub}>Farklı bir arama terimi yazmayı dene.</Text>
            </View>
          )
        }
        renderItem={({ item }) => {
          const isSaved = savedTermsLower.has(item.word.trim().toLowerCase());
          const isDismissed = dismissedIds.has(item.id);

          return (
            <View style={[styles.wordCard, shadow.card]}>
              {/* Top Row: Rank Badge, Word + Phonetic, Sound Button */}
              <View style={styles.cardHeaderRow}>
                <View style={styles.headerLeftGroup}>
                  <View style={styles.rankBadge}>
                    <Text style={styles.rankBadgeText}>#{item.rank}</Text>
                  </View>

                  <Text style={styles.wordTerm}>{item.word}</Text>
                  {item.phonetic ? (
                    <Text style={styles.wordPhonetic}>{item.phonetic}</Text>
                  ) : null}
                </View>

                <Pressable
                  onPress={() => pronounce(item.word)}
                  hitSlop={10}
                  style={styles.soundBtn}
                >
                  <Ionicons name="volume-high" size={17} color={colors.brand} />
                </Pressable>
              </View>

              {/* Turkish Meaning */}
              <View style={styles.meaningRow}>
                <Text style={styles.meaningText}>🇹🇷 {item.translation}</Text>
              </View>

              {/* Compact Grammar Forms Breakdown */}
              {/* 1. ADJECTIVE FORMS */}
              {item.partOfSpeech === 'adjective' && (item.comparative || item.superlative || item.antonym) ? (
                <View style={styles.formsContainer}>
                  <View style={styles.formItemRow}>
                    {item.comparative ? (
                      <View style={styles.compactFormPill}>
                        <Text style={styles.formLabelText}>Karşılaştırma:</Text>
                        <Text style={styles.formValueText}>
                          {item.comparative.form}{' '}
                          <Text style={styles.formSubText}>({item.comparative.translation})</Text>
                        </Text>
                      </View>
                    ) : null}

                    {item.superlative ? (
                      <View style={styles.compactFormPill}>
                        <Text style={styles.formLabelText}>Üstünlük:</Text>
                        <Text style={styles.formValueText}>
                          {item.superlative.form}{' '}
                          <Text style={styles.formSubText}>({item.superlative.translation})</Text>
                        </Text>
                      </View>
                    ) : null}
                  </View>

                  {item.antonym ? (
                    <View style={styles.antonymPill}>
                      <Ionicons name="swap-horizontal" size={13} color="#7C3AED" />
                      <Text style={styles.antonymText}>
                        Zıt Anlam: <Text style={styles.antonymBold}>{item.antonym.word}</Text>{' '}
                        <Text style={styles.antonymTr}>({item.antonym.translation})</Text>
                      </Text>
                    </View>
                  ) : null}
                </View>
              ) : null}

              {/* 2. NOUN FORMS */}
              {item.partOfSpeech === 'noun' && (item.singular || item.plural || item.partitiveUnit || item.possessivePhrase) ? (
                <View style={styles.formsContainer}>
                  <View style={styles.formItemRow}>
                    {item.singular ? (
                      <View style={styles.compactFormPill}>
                        <Text style={styles.formLabelText}>Tekil:</Text>
                        <Text style={styles.formValueText}>
                          {item.singular.form}{' '}
                          <Text style={styles.formSubText}>({item.singular.translation})</Text>
                        </Text>
                      </View>
                    ) : null}

                    {item.plural ? (
                      <View style={styles.compactFormPill}>
                        <Text style={styles.formLabelText}>Çoğul:</Text>
                        <Text style={styles.formValueText}>
                          {item.plural.form}{' '}
                          <Text style={styles.formSubText}>({item.plural.translation})</Text>
                        </Text>
                      </View>
                    ) : item.partitiveUnit ? (
                      <View style={styles.compactFormPill}>
                        <Text style={styles.formLabelText}>Miktar / Birim:</Text>
                        <Text style={styles.formValueText}>
                          {item.partitiveUnit.form}{' '}
                          <Text style={styles.formSubText}>({item.partitiveUnit.translation})</Text>
                        </Text>
                      </View>
                    ) : null}
                  </View>

                  {item.possessivePhrase ? (
                    <View style={styles.compactSinglePill}>
                      <Text style={styles.formLabelText}>İyelik / Tamlama:</Text>
                      <Text style={styles.formValueText}>
                        {item.possessivePhrase.form}{' '}
                        <Text style={styles.formSubText}>({item.possessivePhrase.translation})</Text>
                      </Text>
                    </View>
                  ) : null}
                </View>
              ) : null}

              {/* 3. VERB FORMS (Tenses Grid) */}
              {item.partOfSpeech === 'verb' && (item.presentSimple || item.presentContinuous || item.future || item.pastSimple) ? (
                <View style={styles.formsContainer}>
                  <View style={styles.tensesGrid}>
                    {item.presentSimple ? (
                      <View style={styles.tenseCell}>
                        <Text style={styles.tenseLabel}>Geniş Zaman:</Text>
                        <Text style={styles.tenseValue}>{item.presentSimple.form}</Text>
                        <Text style={styles.tenseTr}>{item.presentSimple.translation}</Text>
                      </View>
                    ) : null}

                    {item.presentContinuous ? (
                      <View style={styles.tenseCell}>
                        <Text style={styles.tenseLabel}>Şimdiki Zaman:</Text>
                        <Text style={styles.tenseValue}>{item.presentContinuous.form}</Text>
                        <Text style={styles.tenseTr}>{item.presentContinuous.translation}</Text>
                      </View>
                    ) : null}

                    {item.future ? (
                      <View style={styles.tenseCell}>
                        <Text style={styles.tenseLabel}>Gelecek Zaman:</Text>
                        <Text style={styles.tenseValue}>{item.future.form}</Text>
                        <Text style={styles.tenseTr}>{item.future.translation}</Text>
                      </View>
                    ) : null}

                    {item.pastSimple ? (
                      <View style={styles.tenseCell}>
                        <Text style={styles.tenseLabel}>Geçmiş Zaman:</Text>
                        <Text style={styles.tenseValue}>
                          {item.pastSimple.form}
                          {item.pastSimple.phonetic ? (
                            <Text style={styles.tensePhonetic}> {item.pastSimple.phonetic}</Text>
                          ) : null}
                        </Text>
                        <Text style={styles.tenseTr}>{item.pastSimple.translation}</Text>
                      </View>
                    ) : null}
                  </View>
                </View>
              ) : null}

              {/* Example Sentence Box */}
              {item.exampleEn ? (
                <View style={styles.exampleBox}>
                  {item.grammarNote ? (
                    <View style={styles.grammarNoteRow}>
                      <Ionicons name="sparkles" size={10} color={colors.brand} />
                      <Text style={styles.grammarNoteText}>{item.grammarNote}</Text>
                    </View>
                  ) : null}
                  <Text style={styles.exampleEn}>&ldquo;{item.exampleEn}&rdquo;</Text>
                  {item.exampleTr ? <Text style={styles.exampleTr}>{item.exampleTr}</Text> : null}
                </View>
              ) : null}

              {/* Bottom Action: Add to Chest / Mark Known / Status Badges */}
              <View style={styles.cardBottomRow}>
                {isSaved ? (
                  <View style={styles.savedStatusBadge}>
                    <Ionicons name="checkmark-circle" size={14} color={colors.success} />
                    <Text style={styles.savedStatusText}>Sandığında Kayıtlı ✓</Text>
                  </View>
                ) : isDismissed ? (
                  <View style={styles.knownStatusRow}>
                    <View style={styles.knownStatusBadge}>
                      <Ionicons name="eye-off-outline" size={13} color={colors.textMuted} />
                      <Text style={styles.knownStatusText}>Biliniyor, Atlandı</Text>
                    </View>
                    <Pressable onPress={() => handleUndoKnown(item)} hitSlop={8}>
                      <Text style={styles.undoKnownText}>Geri Al</Text>
                    </Pressable>
                  </View>
                ) : (
                  <View style={styles.cardActionsRow}>
                    <Pressable
                      onPress={() => handleMarkKnown(item)}
                      style={({ pressed }) => [
                        styles.knownBtn,
                        pressed && { opacity: 0.85, transform: [{ scale: 0.98 }] },
                      ]}
                    >
                      <Ionicons name="checkmark-outline" size={15} color={colors.textMuted} />
                      <Text style={styles.knownBtnText}>Biliyorum, Atla</Text>
                    </Pressable>
                    <Pressable
                      onPress={() => handleAddWord(item)}
                      style={({ pressed }) => [
                        styles.addBtn,
                        pressed && { opacity: 0.85, transform: [{ scale: 0.98 }] },
                      ]}
                    >
                      <Ionicons name="add-circle" size={15} color="#FFFFFF" />
                      <Text style={styles.addBtnText}>Sandığıma Ekle</Text>
                    </Pressable>
                  </View>
                )}
              </View>
            </View>
          );
        }}
      />

      {toast ? <Toast message={toast} /> : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC', // Porcelain Base
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: radii.pill,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleCol: {
    flex: 1,
    marginLeft: 12,
  },
  headerTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 16.5,
    color: colors.textHeading,
  },
  headerSub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 1,
  },
  goToChestBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  goToChestBtnText: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 11,
    color: colors.brand,
  },
  listContent: {
    padding: spacing.md,
    gap: 12,
    paddingBottom: 60,
  },
  headerContainer: {
    gap: 10,
    paddingBottom: 4,
  },

  /* 1. Category Tabs */
  categoryTabsRow: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: radii.xl,
    padding: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 4,
  },
  categoryTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 9,
    borderRadius: radii.lg,
  },
  categoryTabActive: {
    backgroundColor: colors.brand,
    shadowColor: colors.brand,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 2,
  },
  categoryTabIcon: {
    fontSize: 14,
  },
  categoryTabText: {
    fontFamily: fonts.headingBold,
    fontSize: 12.5,
    color: colors.textBody,
  },
  categoryTabTextActive: {
    color: '#FFFFFF',
  },

  /* 2. Responsive 3-SubPack Selector */
  subPackContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 4,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    gap: 4,
  },
  subPackButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 7,
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  subPackButtonActive: {
    backgroundColor: '#EEF2FF',
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  subPackButtonTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 12,
    color: colors.textMuted,
  },
  subPackButtonTitleActive: {
    color: colors.brand,
  },
  subPackButtonRange: {
    fontFamily: fonts.mono,
    fontSize: 10,
    color: colors.textMuted,
    marginTop: 1,
  },
  subPackButtonRangeActive: {
    color: colors.brand,
    fontWeight: 'bold',
  },

  /* 3. Progress Card */
  progressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.xl,
    padding: 12,
    borderWidth: 1.5,
    borderColor: '#E0E7FF',
    gap: 8,
  },
  progressHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 12.5,
    color: colors.textHeading,
  },
  progressSub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10.5,
    color: colors.textMuted,
    marginTop: 1,
  },
  progressPercentBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    marginLeft: 8,
  },
  progressPercentText: {
    fontFamily: fonts.mono,
    fontSize: 11,
    fontWeight: 'bold',
    color: colors.success,
  },
  progressBarTrack: {
    height: 6,
    backgroundColor: '#F1F5F9',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.success,
    borderRadius: 3,
  },

  /* 4. Search Bar */
  searchBarBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: radii.lg,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 8,
  },
  searchBarInput: {
    flex: 1,
    fontFamily: fonts.bodyRegular,
    fontSize: 12.5,
    color: colors.textHeading,
  },

  /* Word Card */
  wordCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    gap: 8,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeftGroup: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    flexWrap: 'wrap',
  },
  rankBadge: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  rankBadgeText: {
    fontFamily: fonts.mono,
    fontSize: 10.5,
    fontWeight: 'bold',
    color: colors.brand,
  },
  wordTerm: {
    fontFamily: fonts.headingBold,
    fontSize: 16.5,
    color: colors.textHeading,
  },
  wordPhonetic: {
    fontFamily: fonts.mono,
    fontSize: 12,
    color: '#0EA5E9',
  },
  soundBtn: {
    width: 32,
    height: 32,
    borderRadius: radii.pill,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
  },

  /* Meaning */
  meaningRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  meaningText: {
    fontFamily: fonts.headingBold,
    fontSize: 13.5,
    color: colors.textHeading,
  },

  /* Forms Section */
  formsContainer: {
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 6,
  },
  formItemRow: {
    flexDirection: 'row',
    gap: 6,
  },
  compactFormPill: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  compactSinglePill: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  formLabelText: {
    fontFamily: fonts.mono,
    fontSize: 9,
    fontWeight: 'bold',
    color: colors.textMuted,
    textTransform: 'uppercase',
  },
  formValueText: {
    fontFamily: fonts.headingBold,
    fontSize: 11,
    color: colors.textHeading,
    marginTop: 1,
  },
  formSubText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10.5,
    color: colors.textMuted,
    fontWeight: 'normal',
  },
  antonymPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#F5F3FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#DDD6FE',
  },
  antonymText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10.5,
    color: '#6D28D9',
  },
  antonymBold: {
    fontFamily: fonts.headingBold,
    color: '#6D28D9',
  },
  antonymTr: {
    color: colors.textMuted,
  },

  /* Tenses Grid for Verbs */
  tensesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tenseCell: {
    width: '48.8%',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  tenseLabel: {
    fontFamily: fonts.mono,
    fontSize: 8.5,
    fontWeight: 'bold',
    color: colors.brand,
    textTransform: 'uppercase',
  },
  tenseValue: {
    fontFamily: fonts.headingBold,
    fontSize: 11,
    color: colors.textHeading,
    marginTop: 1,
  },
  tensePhonetic: {
    fontFamily: fonts.mono,
    fontSize: 9.5,
    color: '#0EA5E9',
    fontWeight: 'normal',
  },
  tenseTr: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10,
    color: colors.textMuted,
    marginTop: 1,
  },

  /* Example Box */
  exampleBox: {
    backgroundColor: '#F5F7FF',
    borderRadius: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: '#E0E7FF',
    gap: 2,
  },
  grammarNoteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  grammarNoteText: {
    fontFamily: fonts.mono,
    fontSize: 9,
    color: colors.brand,
    fontWeight: 'bold',
  },
  exampleEn: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    color: colors.textHeading,
    lineHeight: 16,
  },
  exampleTr: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
    lineHeight: 15,
  },

  /* Bottom Actions */
  cardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: 2,
  },
  savedStatusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  savedStatusText: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 10.5,
    color: colors.success,
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.brand,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radii.pill,
  },
  addBtnText: {
    fontFamily: fonts.headingBold,
    fontSize: 11,
    color: '#FFFFFF',
  },
  cardActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  knownBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  knownBtnText: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 11,
    color: colors.textMuted,
  },
  knownStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  knownStatusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  knownStatusText: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 10.5,
    color: colors.textMuted,
  },
  undoKnownText: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 10.5,
    color: colors.brand,
  },

  /* Empty state */
  emptyBox: {
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 14,
    color: colors.textHeading,
    marginTop: 8,
  },
  emptySub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11.5,
    color: colors.textMuted,
    marginTop: 3,
  },
});
