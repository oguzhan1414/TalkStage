import { Ionicons } from '@expo/vector-icons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { stateImages } from '../assets/images';
import { Button } from '../components/Button';
import { SwipeableVocabCard } from '../components/SwipeableVocabCard';
import { Toast } from '../components/Toast';
import { CEFR_LEVELS } from '../constants/cefr';
import { usePronunciation } from '../hooks/usePronunciation';
import { api, ApiError } from '../lib/api';
import type { MainTabScreenProps } from '../navigation/types';
import { colors, fonts, radii, shadow, spacing } from '../theme/tokens';
import type {
  VocabCardCreate,
  VocabCardOut,
  VocabCardUpdate,
  VocabGrade,
} from '../types/api';

const GRADE_BUTTONS: {
  grade: VocabGrade;
  label: string;
  sub: string;
  color: string;
  bgColor: string;
}[] = [
  {
    grade: 'again',
    label: 'Tekrar',
    sub: '1 gün sonra',
    color: '#EF4444',
    bgColor: 'rgba(239, 68, 68, 0.08)',
  },
  {
    grade: 'good',
    label: 'İyi',
    sub: '3 gün sonra',
    color: '#4F46E5',
    bgColor: 'rgba(79, 70, 229, 0.08)',
  },
  {
    grade: 'easy',
    label: 'Kolay',
    sub: '7+ gün sonra',
    color: '#10B981',
    bgColor: 'rgba(16, 185, 129, 0.08)',
  },
];

const CHEST_MILESTONES = [10, 25, 50, 100, 200, 500];

const POS_OPTIONS = [
  { id: 'noun', label: 'İsim', color: '#2563EB' },
  { id: 'verb', label: 'Fiil', color: '#059669' },
  { id: 'adjective', label: 'Sıfat', color: '#D97706' },
  { id: 'adverb', label: 'Zarf', color: '#7C3AED' },
  { id: 'phrase', label: 'Deyim', color: '#DB2777' },
];

function getChestProgress(total: number) {
  const nextMilestone =
    CHEST_MILESTONES.find((m) => m > total) ??
    CHEST_MILESTONES[CHEST_MILESTONES.length - 1];
  const prevMilestone =
    [0, ...CHEST_MILESTONES].filter((m) => m <= total).pop() ?? 0;
  const span = nextMilestone - prevMilestone;
  const progressInTier = span > 0 ? (total - prevMilestone) / span : 1;
  return { nextMilestone, progressInTier: Math.min(1, Math.max(0, progressInTier)) };
}

type TabViewMode = 'flashcards' | 'dictionary';

export function VocabScreen({ navigation }: MainTabScreenProps<'Vocab'>) {
  const queryClient = useQueryClient();

  // 1. Due Cards from Supabase (for SM-2 Review)
  const { data: dueCards, isLoading: dueLoading } = useQuery({
    queryKey: ['vocab-cards'],
    queryFn: () => api.get<VocabCardOut[]>('/vocab-cards'),
  });

  // 2. All Saved Cards from Supabase (for Dictionary & Lifetime count)
  const { data: allCards, isLoading: allLoading } = useQuery({
    queryKey: ['vocab-cards', 'all'],
    queryFn: () => api.get<VocabCardOut[]>('/vocab-cards?all=true'),
  });

  const [activeTab, setActiveTab] = useState<TabViewMode>('flashcards');
  const [queue, setQueue] = useState<VocabCardOut[]>([]);
  const [reviewedCount, setReviewedCount] = useState(0);
  const [reviewError, setReviewError] = useState<string | null>(null);
  const { pronounce, toggle, isPlaying } = usePronunciation();

  // Search & Filters in Dictionary
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState<string | null>(null);
  const [posFilter, setPosFilter] = useState<string | null>(null);

  // Add/Edit Modal State
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [formTerm, setFormTerm] = useState('');
  const [formTranslation, setFormTranslation] = useState('');
  const [formExample, setFormExample] = useState('');
  const [formPos, setFormPos] = useState<string>('noun');
  const [formLevel, setFormLevel] = useState<string>('A2');
  const [isSaving, setIsSaving] = useState(false);

  // Action Menu Bottom Sheet State (Long Press)
  const [actionCard, setActionCard] = useState<VocabCardOut | null>(null);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);

  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  // Sync today's actually-due SM-2 cards into the review queue. Deliberately
  // does NOT fall back to "all cards" when nothing is due — that would make
  // the "Akıllı Pratik" (SM-2) tab silently review words that aren't
  // scheduled yet, contradicting its own "reminds you right before you'd
  // forget" explainer. Reviewing everything on demand is the explicit
  // "🔄 Tüm Kelimelerle Serbest Pratik Yap" button's job (see empty state below).
  useEffect(() => {
    if (dueCards) {
      setQueue(dueCards);
    }
  }, [dueCards]);

  const cardsList = allCards ?? [];
  const totalCardsInChest = cardsList.length;
  const chestProgress = getChestProgress(totalCardsInChest);

  const currentCard = queue[0];

  const handleGrade = async (grade: VocabGrade) => {
    if (!currentCard) return;
    setReviewError(null);
    setQueue((prev) => prev.slice(1));
    setReviewedCount((c) => c + 1);

    try {
      await api.post(`/vocab-cards/${currentCard.id}/review`, { grade });
      queryClient.invalidateQueries({ queryKey: ['vocab-cards'] });
      queryClient.invalidateQueries({ queryKey: ['vocab-cards', 'all'] });
    } catch (err) {
      setReviewError(err instanceof ApiError ? err.message : 'Kart güncellenemedi');
    }
  };

  const handlePronounce = () => {
    if (!currentCard) return;
    toggle(currentCard.term);
  };

  // Restart / Continuous Practice
  const handleRestartPractice = () => {
    if (cardsList.length > 0) {
      setQueue(cardsList);
      setReviewedCount(0);
      showToast('Tüm kelimelerle serbest pratik başlatıldı! 🔄');
    }
  };

  // Open Create Modal
  const openCreateModal = () => {
    setEditingCardId(null);
    setFormTerm('');
    setFormTranslation('');
    setFormExample('');
    setFormPos('noun');
    setFormLevel('A2');
    setModalVisible(true);
  };

  // Open Edit Modal
  const openEditModal = (card: VocabCardOut) => {
    setActionCard(null);
    setEditingCardId(card.id);
    setFormTerm(card.term);
    setFormTranslation(card.translation || '');
    setFormExample(card.example_sentence || '');
    setFormPos(card.part_of_speech ? card.part_of_speech.toLowerCase() : 'noun');
    setFormLevel(card.cefr_level ? card.cefr_level.toUpperCase() : 'A2');
    setModalVisible(true);
  };

  // Save (Create or Update) Word in Supabase
  const handleSaveWord = async () => {
    if (!formTerm.trim()) {
      showToast('Lütfen bir İngilizce kelime girin!');
      return;
    }

    setIsSaving(true);
    const termClean = formTerm.trim();
    const transClean = formTranslation.trim() || 'Özel kelime karşılığı';
    const exampleClean =
      formExample.trim() || `I am practicing using "${termClean}" in my conversation.`;

    try {
      if (editingCardId) {
        // UPDATE (PATCH)
        const updatePayload: VocabCardUpdate = {
          term: termClean,
          translation: transClean,
          example_sentence: exampleClean,
          part_of_speech: formPos,
          cefr_level: formLevel,
        };
        await api.patch(`/vocab-cards/${editingCardId}`, updatePayload);
        showToast(`“${termClean}” başarıyla güncellendi! ✏️✨`);
      } else {
        // CREATE (POST)
        const createPayload: VocabCardCreate = {
          term: termClean,
          translation: transClean,
          example_sentence: exampleClean,
          part_of_speech: formPos,
          cefr_level: formLevel,
          source_label: 'Özel Giriş ✍️',
        };
        const created = await api.post<VocabCardOut>('/vocab-cards', createPayload);
        setQueue((prev) => [created, ...prev]);
        showToast(`“${termClean}” (${formLevel} • ${formPos}) kaydedildi! 📦✨`);
      }

      await queryClient.invalidateQueries({ queryKey: ['vocab-cards'] });
      await queryClient.invalidateQueries({ queryKey: ['vocab-cards', 'all'] });
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : 'İşlem gerçekleştirilemedi.');
    } finally {
      setIsSaving(false);
      setModalVisible(false);
      setEditingCardId(null);
    }
  };

  // Delete Word from Supabase
  const handleDeleteWord = async (cardId: string, term: string) => {
    try {
      await api.delete(`/vocab-cards/${cardId}`);
      await queryClient.invalidateQueries({ queryKey: ['vocab-cards'] });
      await queryClient.invalidateQueries({ queryKey: ['vocab-cards', 'all'] });
      setQueue((prev) => prev.filter((c) => c.id !== cardId));
      showToast(`“${term}” sandığından silindi. 🗑️`);
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : 'Kelime silinemedi.');
    } finally {
      setActionCard(null);
      setDeleteConfirmVisible(false);
    }
  };

  // Filtered Dictionary List from Supabase
  const filteredWords = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return cardsList.filter((w) => {
      const matchSearch =
        !q ||
        w.term.toLowerCase().includes(q) ||
        (w.translation && w.translation.toLowerCase().includes(q)) ||
        (w.example_sentence && w.example_sentence.toLowerCase().includes(q));

      const cardLevel = (w.cefr_level || 'A1').trim().toUpperCase();
      const matchLevel = !levelFilter || cardLevel === levelFilter.trim().toUpperCase();

      const cardPos = (w.part_of_speech || 'noun').trim().toLowerCase();
      const matchPos = !posFilter || cardPos === posFilter.trim().toLowerCase();

      return matchSearch && matchLevel && matchPos;
    });
  }, [cardsList, searchQuery, levelFilter, posFilter]);

  const hasActiveFilters = Boolean(searchQuery || levelFilter || posFilter);

  const clearAllFilters = () => {
    setSearchQuery('');
    setLevelFilter(null);
    setPosFilter(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        {/* Header Row with "+ Yeni Kelime" Button */}
        <View style={styles.headerRow}>
          <Text style={styles.title}>Kelime Sandığı</Text>
          <Pressable onPress={openCreateModal} style={styles.addWordHeaderButton}>
            <Ionicons name="add" size={18} color="#FFFFFF" />
            <Text style={styles.addWordHeaderButtonText}>Kelime Ekle</Text>
          </Pressable>
        </View>

        {/* Segmented Switcher: Akıllı Kartlar vs. Tüm Kelimelerim Sözlüğü */}
        <View style={styles.segmentedContainer}>
          <Pressable
            onPress={() => setActiveTab('flashcards')}
            style={[
              styles.segmentedTab,
              activeTab === 'flashcards' && styles.segmentedTabActive,
            ]}
          >
            <Ionicons
              name="card-outline"
              size={15}
              color={activeTab === 'flashcards' ? colors.brand : colors.textMuted}
            />
            <Text
              style={[
                styles.segmentedTabText,
                activeTab === 'flashcards' && styles.segmentedTabTextActive,
              ]}
            >
              Akıllı Pratik ({queue.length})
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setActiveTab('dictionary')}
            style={[
              styles.segmentedTab,
              activeTab === 'dictionary' && styles.segmentedTabActive,
            ]}
          >
            <Ionicons
              name="book-outline"
              size={15}
              color={activeTab === 'dictionary' ? colors.brand : colors.textMuted}
            />
            <Text
              style={[
                styles.segmentedTabText,
                activeTab === 'dictionary' && styles.segmentedTabTextActive,
              ]}
            >
              Tüm Kelimelerim ({totalCardsInChest})
            </Text>
          </Pressable>
        </View>

        {/* 3D Chest Milestone Progress */}
        <View style={[styles.chestHeader, shadow.card]}>
          <Image
            source={stateImages.emptyChest}
            style={styles.chestIcon}
            resizeMode="contain"
          />
          <View style={styles.chestTextCol}>
            <View style={styles.chestLabelRow}>
              <Text style={styles.chestLabel}>Kişisel Kelime Sandığı</Text>
              <Text style={styles.chestCountText}>
                {totalCardsInChest} / {chestProgress.nextMilestone} Kelime
              </Text>
            </View>
            <View style={styles.chestBarTrack}>
              <View
                style={[
                  styles.chestBarFill,
                  { width: `${Math.max(6, chestProgress.progressInTier * 100)}%` },
                ]}
              />
            </View>
          </View>
        </View>

        {/* ======================================================== */}
        {/* SEKMELER: 1. AKILLI FLASHCARD PRATİĞİ                   */}
        {/* ======================================================== */}
        {activeTab === 'flashcards' && (
          <>
            {dueLoading && !dueCards ? (
              <View style={[styles.emptyBox, shadow.card]}>
                <ActivityIndicator color={colors.brand} />
              </View>
            ) : currentCard ? (
              <View style={styles.contentWrap}>
                <View style={styles.cardHeaderInfoRow}>
                  <Text style={styles.progressText}>
                    Kalan Kart: {queue.length} • Tamamlanan: {reviewedCount}
                  </Text>
                  <Pressable
                    onPress={() => setActionCard(currentCard)}
                    hitSlop={10}
                    style={styles.cardMenuDotsButton}
                  >
                    <Ionicons
                      name="ellipsis-horizontal"
                      size={18}
                      color={colors.textMuted}
                    />
                  </Pressable>
                </View>

                <View style={styles.cardArea}>
                  <SwipeableVocabCard
                    key={currentCard.id}
                    card={currentCard}
                    onGrade={handleGrade}
                    onPronounce={handlePronounce}
                    pronouncing={isPlaying}
                  />
                </View>

                {reviewError ? (
                  <Text style={styles.errorText}>{reviewError}</Text>
                ) : null}

                {/* Bottom 3 Grade Action Buttons */}
                <View style={styles.gradeContainer}>
                  <View style={styles.gradeRow}>
                    {GRADE_BUTTONS.map(({ grade, label, sub, color, bgColor }) => (
                      <Pressable
                        key={grade}
                        style={[
                          styles.gradeButton,
                          { borderColor: color, backgroundColor: bgColor },
                        ]}
                        onPress={() => handleGrade(grade)}
                      >
                        <Text style={[styles.gradeButtonLabel, { color }]}>{label}</Text>
                        <Text style={[styles.gradeButtonSub, { color }]}>{sub}</Text>
                      </Pressable>
                    ))}
                  </View>
                  <Text style={styles.sm2ExplainerText}>
                    💡 SM-2 Algoritması: Kelimeleri unutmaya yaklaştığın an hatırlatır.
                  </Text>
                </View>
              </View>
            ) : (
              /* Empty State / Completed Review State */
              <View style={[styles.emptyBox, shadow.card]}>
                <Image
                  source={stateImages.emptyChest}
                  style={styles.emptyImage}
                  resizeMode="contain"
                />
                <Text style={styles.emptyTitle}>
                  {reviewedCount > 0
                    ? 'Tebrikler! Günlük Tekrar Bitti 🎉'
                    : totalCardsInChest > 0
                      ? 'Bugün İçin Planlı Kelime Yok ✅'
                      : 'Kelime Sandığın Henüz Boş 📦'}
                </Text>
                <Text style={styles.emptySub}>
                  {reviewedCount > 0
                    ? `${reviewedCount} kelimeyi başarıyla hafızana aldın. İstediğin an tüm kelimelerle serbest tekrar yapabilirsin!`
                    : totalCardsInChest > 0
                      ? 'SM-2 algoritmasına göre hiçbir kelimenin tekrar zamanı gelmedi — iyi gidiyorsun! İstersen yine de tüm kelimelerle serbest pratik yapabilirsin.'
                      : 'Dilediğin kelimeyi manuel ekleyebilir veya canlı sahnelerde kelimelere dokunarak sandığını doldurabilirsin.'}
                </Text>

                <View style={styles.emptyActionRow}>
                  {totalCardsInChest > 0 ? (
                    <Button
                      label="🔄 Tüm Kelimelerle Serbest Pratik Yap"
                      onPress={handleRestartPractice}
                      style={styles.emptyButton}
                    />
                  ) : (
                    <Button
                      label="✍️ Hemen Yeni Kelime Ekle"
                      onPress={openCreateModal}
                      style={styles.emptyButton}
                    />
                  )}
                  <Button
                    label="📖 Hikaye Oku & Kelime Topla"
                    variant="ghost"
                    onPress={() => navigation.navigate('ReadingList')}
                    style={styles.emptyButtonGhost}
                  />
                </View>
              </View>
            )}
          </>
        )}

        {/* ======================================================== */}
        {/* SEKMELER: 2. TÜM KELİMELERİM SÖZLÜĞÜ (Katalog & Filtre) */}
        {/* ======================================================== */}
        {activeTab === 'dictionary' && (
          <View style={styles.dictionaryContainer}>
            {/* Search Input */}
            <View style={styles.searchBarBox}>
              <Ionicons name="search" size={18} color={colors.textMuted} />
              <TextInput
                style={styles.searchBarInput}
                placeholder="Kelime, anlam veya cümle ara..."
                placeholderTextColor={colors.textMuted}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              {searchQuery ? (
                <Pressable onPress={() => setSearchQuery('')} hitSlop={10}>
                  <Ionicons name="close-circle" size={18} color={colors.textMuted} />
                </Pressable>
              ) : null}
            </View>

            {/* Filter Section 1: CEFR Level Pills */}
            <View style={styles.filterSection}>
              <View style={styles.filterTitleRow}>
                <Text style={styles.filterSectionTitle}>📊 SEVİYE FİLTRESİ</Text>
                {levelFilter && (
                  <Pressable onPress={() => setLevelFilter(null)}>
                    <Text style={styles.filterResetText}>Sıfırla ✕</Text>
                  </Pressable>
                )}
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.filterRow}
              >
                <Pressable
                  onPress={() => setLevelFilter(null)}
                  style={[
                    styles.levelFilterChip,
                    levelFilter === null && styles.levelFilterChipActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      levelFilter === null && styles.filterChipTextActive,
                    ]}
                  >
                    Tümü
                  </Text>
                </Pressable>

                {CEFR_LEVELS.map((lvl) => {
                  const count = cardsList.filter(
                    (w) => (w.cefr_level || 'A1').toUpperCase() === lvl
                  ).length;
                  return (
                    <Pressable
                      key={lvl}
                      onPress={() =>
                        setLevelFilter(levelFilter === lvl ? null : lvl)
                      }
                      style={[
                        styles.levelFilterChip,
                        levelFilter === lvl && styles.levelFilterChipActive,
                      ]}
                    >
                      <Text
                        style={[
                          styles.filterChipText,
                          levelFilter === lvl && styles.filterChipTextActive,
                        ]}
                      >
                        {lvl} {count > 0 ? `(${count})` : ''}
                      </Text>
                    </Pressable>
                  );
                })}
              </ScrollView>
            </View>

            {/* Filter Section 2: Part of Speech Pills */}
            <View style={styles.filterSection}>
              <View style={styles.filterTitleRow}>
                <Text style={styles.filterSectionTitle}>🏷️ GRAMER TÜRÜ</Text>
                {posFilter && (
                  <Pressable onPress={() => setPosFilter(null)}>
                    <Text style={styles.filterResetText}>Sıfırla ✕</Text>
                  </Pressable>
                )}
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.filterRow}
              >
                <Pressable
                  onPress={() => setPosFilter(null)}
                  style={[
                    styles.posFilterChip,
                    posFilter === null && styles.posFilterChipActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      posFilter === null && styles.filterChipTextActive,
                    ]}
                  >
                    Tüm Türler
                  </Text>
                </Pressable>

                {POS_OPTIONS.map((pos) => {
                  const count = cardsList.filter(
                    (w) => (w.part_of_speech || 'noun').toLowerCase() === pos.id
                  ).length;
                  return (
                    <Pressable
                      key={pos.id}
                      onPress={() =>
                        setPosFilter(posFilter === pos.id ? null : pos.id)
                      }
                      style={[
                        styles.posFilterChip,
                        posFilter === pos.id && {
                          backgroundColor: pos.color,
                          borderColor: pos.color,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.filterChipText,
                          posFilter === pos.id && styles.filterChipTextActive,
                        ]}
                      >
                        {pos.label} {count > 0 ? `(${count})` : ''}
                      </Text>
                    </Pressable>
                  );
                })}
              </ScrollView>
            </View>

            {/* Active Filter Clear Bar if filtered */}
            {hasActiveFilters && (
              <View style={styles.activeFilterSummaryBar}>
                <Text style={styles.activeFilterSummaryText}>
                  Filtrelenen Sonuç: {filteredWords.length} / {cardsList.length} Kelime
                </Text>
                <Pressable onPress={clearAllFilters}>
                  <Text style={styles.clearAllFiltersLink}>Filtreleri Temizle ✕</Text>
                </Pressable>
              </View>
            )}

            {/* Words List with Long Press & Option Menu */}
            {allLoading && !allCards ? (
              <ActivityIndicator style={styles.dictEmptyBlock} color={colors.brand} />
            ) : filteredWords.length > 0 ? (
              <FlatList
                data={filteredWords}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.dictionaryList}
                renderItem={({ item }) => {
                  const posItem = item.part_of_speech
                    ? POS_OPTIONS.find((p) => p.id === item.part_of_speech?.toLowerCase())
                    : POS_OPTIONS[0];

                  return (
                    <Pressable
                      onLongPress={() => setActionCard(item)}
                      delayLongPress={280}
                      style={({ pressed }) => [
                        styles.dictWordCard,
                        shadow.card,
                        pressed && { opacity: 0.9, transform: [{ scale: 0.99 }] },
                      ]}
                    >
                      <View style={styles.dictCardHeader}>
                        <View style={styles.dictBadgesRow}>
                          <View style={styles.dictLevelPill}>
                            <Text style={styles.dictLevelPillText}>
                              {item.cefr_level || 'A1'}
                            </Text>
                          </View>

                          <View
                            style={[
                              styles.dictPosPill,
                              {
                                backgroundColor: posItem
                                  ? `${posItem.color}15`
                                  : 'rgba(79, 70, 229, 0.08)',
                              },
                            ]}
                          >
                            <Text
                              style={[
                                styles.dictPosPillText,
                                { color: posItem ? posItem.color : colors.brand },
                              ]}
                            >
                              {posItem ? posItem.label : 'İsim'}
                            </Text>
                          </View>
                        </View>

                        <View style={styles.dictActionsRow}>
                          <Pressable
                            onPress={() => pronounce(item.term)}
                            hitSlop={8}
                            style={styles.dictSoundButton}
                          >
                            <Ionicons
                              name="volume-high"
                              size={18}
                              color={colors.brand}
                            />
                          </Pressable>

                          <Pressable
                            onPress={() => setActionCard(item)}
                            hitSlop={8}
                            style={styles.dictOptionsButton}
                          >
                            <Ionicons
                              name="ellipsis-vertical"
                              size={16}
                              color={colors.textMuted}
                            />
                          </Pressable>
                        </View>
                      </View>

                      <Text style={styles.dictTerm}>{item.term}</Text>
                      <Text style={styles.dictTranslation}>
                        🇹🇷 {item.translation || 'Özel kelime'}
                      </Text>

                      {item.example_sentence ? (
                        <View style={styles.dictExampleBox}>
                          <Text style={styles.dictExample}>
                            &ldquo;{item.example_sentence}&rdquo;
                          </Text>
                        </View>
                      ) : null}

                      <Text style={styles.dictLongPressHint}>
                        💡 Düzenlemek veya silmek için üzerine uzun bas
                      </Text>
                    </Pressable>
                  );
                }}
              />
            ) : (
              <View style={styles.dictEmptyBlock}>
                <Ionicons name="search-outline" size={32} color={colors.textMuted} />
                <Text style={styles.dictEmptyText}>
                  {hasActiveFilters
                    ? 'Seçtiğin filtrelere uygun kelime bulunamadı.'
                    : 'Henüz kelime eklemedin.'}
                </Text>
                {hasActiveFilters && (
                  <Button
                    label="Tüm Filtreleri Temizle"
                    variant="ghost"
                    onPress={clearAllFilters}
                    style={{ marginTop: 8 }}
                  />
                )}
              </View>
            )}
          </View>
        )}
      </View>

      {/* ======================================================== */}
      {/* ✍️ MODAL: KELİME EKLE & DÜZENLE                         */}
      {/* ======================================================== */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            {/* Modal Header */}
            <View style={styles.modalHeaderRow}>
              <View>
                <Text style={styles.modalTitle}>
                  {editingCardId ? 'Kelimeyi Düzenle ✏️' : 'Yeni Kelime Ekle ✍️'}
                </Text>
                <Text style={styles.modalSub}>
                  {editingCardId
                    ? 'Kelimenin seviye, tür ve anlamını güncelle'
                    : 'Tür ve seviye belirleyerek sandığına kaydet'}
                </Text>
              </View>
              <Pressable
                onPress={() => setModalVisible(false)}
                hitSlop={12}
                style={styles.closeModalButton}
              >
                <Ionicons name="close" size={22} color={colors.textMuted} />
              </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* 1. English Word */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>İNGİLİZCE KELİME VEYA DEYİM *</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Örn: resilient, nail down, breakthrough"
                  placeholderTextColor={colors.textMuted}
                  value={formTerm}
                  onChangeText={setFormTerm}
                  autoCapitalize="none"
                  autoFocus={!editingCardId}
                />
              </View>

              {/* 2. CEFR Level Selector (A1 - C2) */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>CEFR SEVİYESİ</Text>
                <View style={styles.levelSelectorRow}>
                  {CEFR_LEVELS.map((lvl) => (
                    <Pressable
                      key={lvl}
                      onPress={() => setFormLevel(lvl)}
                      style={[
                        styles.levelSelectPill,
                        formLevel === lvl && styles.levelSelectPillActive,
                      ]}
                    >
                      <Text
                        style={[
                          styles.levelSelectText,
                          formLevel === lvl && styles.levelSelectTextActive,
                        ]}
                      >
                        {lvl}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              {/* 3. Part of Speech Selector (İsim, Fiil, Sıfat, Zarf, Deyim) */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>GRAMER TÜRÜ (PART OF SPEECH)</Text>
                <View style={styles.posSelectorGrid}>
                  {POS_OPTIONS.map((pos) => (
                    <Pressable
                      key={pos.id}
                      onPress={() => setFormPos(pos.id)}
                      style={[
                        styles.posSelectPill,
                        formPos === pos.id && {
                          backgroundColor: pos.color,
                          borderColor: pos.color,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.posSelectText,
                          formPos === pos.id && styles.posSelectTextActive,
                        ]}
                      >
                        {pos.label}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              {/* 4. Turkish Meaning */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>TÜRKÇE ANLAMI</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Örn: Dayanıklı, toparlanabilen"
                  placeholderTextColor={colors.textMuted}
                  value={formTranslation}
                  onChangeText={setFormTranslation}
                />
              </View>

              {/* 5. Example Sentence */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>CÜMLE İÇİNDE KULLANIMI</Text>
                <TextInput
                  style={[styles.textInput, styles.textArea]}
                  placeholder="Örn: The engineering team built a highly resilient backend."
                  placeholderTextColor={colors.textMuted}
                  value={formExample}
                  onChangeText={setFormExample}
                  multiline
                  numberOfLines={3}
                />
              </View>

              {/* Action Buttons */}
              <View style={styles.modalActionsRow}>
                <Button
                  label={
                    isSaving
                      ? 'Kaydediliyor...'
                      : editingCardId
                        ? '💾 Değişiklikleri Güncelle'
                        : '💾 Sandığıma Kaydet'
                  }
                  onPress={handleSaveWord}
                  disabled={isSaving}
                  style={{ flex: 1 }}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* ======================================================== */}
      {/* 📌 ACTION SHEET MODAL: UZUN BASINCA AÇILAN MENÜ         */}
      {/* ======================================================== */}
      <Modal
        visible={Boolean(actionCard && !deleteConfirmVisible)}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setActionCard(null)}
      >
        <Pressable
          style={styles.actionSheetOverlay}
          onPress={() => setActionCard(null)}
        >
          <View style={styles.actionSheetCard}>
            {/* Header info */}
            <View style={styles.actionSheetHeader}>
              <Text style={styles.actionSheetWordTitle}>
                {actionCard?.term}
              </Text>
              <Text style={styles.actionSheetWordSub}>
                {actionCard?.cefr_level || 'A2'} • {actionCard?.part_of_speech || 'İsim'} • {actionCard?.translation}
              </Text>
            </View>

            {/* Edit Option */}
            <Pressable
              style={styles.actionSheetRow}
              onPress={() => actionCard && openEditModal(actionCard)}
            >
              <View style={styles.actionIconBox3D}>
                <Image
                  source={stateImages.editPencil}
                  style={styles.actionIconImage3D}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.actionTextCol}>
                <Text style={styles.actionRowTitle}>Kelimeyi Düzenle</Text>
                <Text style={styles.actionRowSub}>Seviye, tür, anlam veya cümleyi değiştir</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </Pressable>

            <View style={styles.actionDivider} />

            {/* Delete Option */}
            <Pressable
              style={styles.actionSheetRow}
              onPress={() => setDeleteConfirmVisible(true)}
            >
              <View style={styles.actionIconBox3D}>
                <Image
                  source={stateImages.trashDelete}
                  style={styles.actionIconImage3D}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.actionTextCol}>
                <Text style={[styles.actionRowTitle, { color: '#EF4444' }]}>
                  Kelimeyi Sil
                </Text>
                <Text style={styles.actionRowSub}>Bu kelimeyi sandığından tamamen kaldır</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </Pressable>

            {/* Cancel Button */}
            <Pressable
              style={styles.actionCancelButton}
              onPress={() => setActionCard(null)}
            >
              <Text style={styles.actionCancelButtonText}>Vazgeç</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>

      {/* ======================================================== */}
      {/* ⚠️ DELETE CONFIRMATION MODAL                            */}
      {/* ======================================================== */}
      <Modal
        visible={deleteConfirmVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setDeleteConfirmVisible(false)}
      >
        <View style={styles.confirmOverlay}>
          <View style={styles.confirmCard}>
            <View style={styles.confirmIconWrap3D}>
              <Image
                source={stateImages.trashDelete}
                style={styles.confirmImage3D}
                resizeMode="contain"
              />
            </View>

            <Text style={styles.confirmTitle}>Kelimeyi Sil?</Text>
            <Text style={styles.confirmDesc}>
              &ldquo;<Text style={{ fontWeight: 'bold' }}>{actionCard?.term}</Text>&rdquo; kelimesini kelime sandığından silmek istediğine emin misin? Bu işlem geri alınamaz.
            </Text>

            <View style={styles.confirmActionsRow}>
              <Pressable
                style={styles.confirmCancelBtn}
                onPress={() => setDeleteConfirmVisible(false)}
              >
                <Text style={styles.confirmCancelText}>Vazgeç</Text>
              </Pressable>

              <Pressable
                style={styles.confirmDeleteBtn}
                onPress={() =>
                  actionCard && handleDeleteWord(actionCard.id, actionCard.term)
                }
              >
                <Text style={styles.confirmDeleteText}>Evet, Sil</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {toast && <Toast message={toast} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: 110,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  title: {
    fontFamily: fonts.headingBold,
    fontSize: 22,
    color: colors.textHeading,
  },
  addWordHeaderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.brand,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radii.pill,
    gap: 4,
  },
  addWordHeaderButtonText: {
    fontFamily: fonts.headingBold,
    fontSize: 12,
    color: '#FFFFFF',
  },

  /* Segmented Top Switcher */
  segmentedContainer: {
    flexDirection: 'row',
    backgroundColor: '#E2E8F0',
    borderRadius: radii.pill,
    padding: 3,
    marginBottom: spacing.sm,
  },
  segmentedTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 7,
    borderRadius: radii.pill,
    gap: 6,
  },
  segmentedTabActive: {
    backgroundColor: '#FFFFFF',
  },
  segmentedTabText: {
    fontFamily: fonts.headingBold,
    fontSize: 11,
    color: colors.textMuted,
  },
  segmentedTabTextActive: {
    color: colors.brand,
  },

  /* Chest Header */
  chestHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: radii.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.8)',
  },
  chestIcon: {
    width: 38,
    height: 38,
    marginRight: 12,
  },
  chestTextCol: {
    flex: 1,
  },
  chestLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  chestLabel: {
    fontFamily: fonts.headingBold,
    fontSize: 12,
    color: colors.textHeading,
  },
  chestCountText: {
    fontFamily: fonts.mono,
    fontSize: 11,
    fontWeight: 'bold',
    color: colors.brand,
  },
  chestBarTrack: {
    height: 7,
    backgroundColor: '#F1F5F9',
    borderRadius: 4,
    overflow: 'hidden',
  },
  chestBarFill: {
    height: '100%',
    backgroundColor: colors.brand,
    borderRadius: 4,
  },
  contentWrap: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cardHeaderInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  progressText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
  },
  cardMenuDotsButton: {
    padding: 4,
  },
  cardArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 4,
  },
  gradeContainer: {
    marginTop: spacing.xs,
  },
  gradeRow: {
    flexDirection: 'row',
    gap: 8,
  },
  gradeButton: {
    flex: 1,
    borderRadius: radii.md,
    paddingVertical: 8,
    alignItems: 'center',
    borderWidth: 1.5,
  },
  gradeButtonLabel: {
    fontFamily: fonts.headingBold,
    fontSize: 13,
  },
  gradeButtonSub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 9,
    marginTop: 1,
    opacity: 0.85,
  },
  sm2ExplainerText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 6,
  },
  errorText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.error,
    textAlign: 'center',
    marginTop: 4,
  },
  emptyBox: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: radii.lg,
    padding: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.8)',
    marginTop: 4,
  },
  emptyImage: {
    width: 90,
    height: 90,
    marginBottom: 10,
  },
  emptyTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 16,
    color: colors.textHeading,
    textAlign: 'center',
    marginBottom: 4,
  },
  emptySub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: colors.textBody,
    textAlign: 'center',
    lineHeight: 16,
    marginBottom: spacing.md,
  },
  emptyActionRow: {
    width: '100%',
    gap: 8,
  },
  emptyButton: {
    width: '100%',
  },
  emptyButtonGhost: {
    width: '100%',
  },

  /* Dictionary Tab */
  dictionaryContainer: {
    flex: 1,
  },
  searchBarBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: radii.md,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.8)',
    gap: 8,
    marginBottom: 6,
  },
  searchBarInput: {
    flex: 1,
    fontFamily: fonts.bodyRegular,
    fontSize: 13,
    color: colors.textHeading,
  },
  filterSection: {
    marginBottom: 5,
  },
  filterTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 3,
  },
  filterSectionTitle: {
    fontFamily: fonts.mono,
    fontSize: 9,
    fontWeight: 'bold',
    color: colors.textMuted,
    letterSpacing: 0.5,
  },
  filterResetText: {
    fontFamily: fonts.headingBold,
    fontSize: 10,
    color: colors.brand,
  },
  filterRow: {
    gap: 5,
  },
  levelFilterChip: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.8)',
  },
  levelFilterChipActive: {
    backgroundColor: colors.brand,
    borderColor: colors.brand,
  },
  posFilterChip: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.8)',
  },
  posFilterChipActive: {
    backgroundColor: colors.brand,
    borderColor: colors.brand,
  },
  filterChipText: {
    fontFamily: fonts.headingBold,
    fontSize: 10,
    color: colors.textMuted,
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  activeFilterSummaryBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(79, 70, 229, 0.05)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 4,
  },
  activeFilterSummaryText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10,
    color: colors.brand,
  },
  clearAllFiltersLink: {
    fontFamily: fonts.headingBold,
    fontSize: 10,
    color: colors.error,
  },
  dictionaryList: {
    gap: 6,
    paddingBottom: 20,
    marginTop: 2,
  },
  dictWordCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.md,
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.8)',
  },
  dictCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  dictBadgesRow: {
    flexDirection: 'row',
    gap: 5,
  },
  dictLevelPill: {
    backgroundColor: colors.brand,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  dictLevelPillText: {
    fontFamily: fonts.mono,
    fontSize: 9,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  dictPosPill: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  dictPosPillText: {
    fontFamily: fonts.headingBold,
    fontSize: 9,
    textTransform: 'uppercase',
  },
  dictActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dictSoundButton: {
    backgroundColor: 'rgba(79, 70, 229, 0.06)',
    padding: 5,
    borderRadius: radii.pill,
  },
  dictOptionsButton: {
    padding: 4,
  },
  dictTerm: {
    fontFamily: fonts.headingBold,
    fontSize: 15,
    color: colors.textHeading,
  },
  dictTranslation: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: colors.textBody,
    marginTop: 1,
  },
  dictExampleBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 6,
    padding: 6,
    marginTop: 4,
    borderLeftWidth: 2,
    borderLeftColor: colors.brand,
  },
  dictExample: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
    fontStyle: 'italic',
    lineHeight: 14,
  },
  dictLongPressHint: {
    fontFamily: fonts.bodyRegular,
    fontSize: 9,
    color: colors.textMuted,
    marginTop: 6,
  },
  dictEmptyBlock: {
    padding: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  dictEmptyText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: colors.textMuted,
    textAlign: 'center',
  },

  /* Modal */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: radii.lg,
    borderTopRightRadius: radii.lg,
    padding: spacing.lg,
    maxHeight: '90%',
  },
  modalHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: spacing.sm,
  },
  modalTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 18,
    color: colors.textHeading,
  },
  modalSub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: colors.textMuted,
  },
  closeModalButton: {
    padding: 4,
  },
  inputGroup: {
    marginBottom: spacing.md,
  },
  inputLabel: {
    fontFamily: fonts.mono,
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.brand,
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  levelSelectorRow: {
    flexDirection: 'row',
    gap: 6,
  },
  levelSelectPill: {
    flex: 1,
    paddingVertical: 7,
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.9)',
  },
  levelSelectPillActive: {
    backgroundColor: colors.brand,
    borderColor: colors.brand,
  },
  levelSelectText: {
    fontFamily: fonts.headingBold,
    fontSize: 12,
    color: colors.textHeading,
  },
  levelSelectTextActive: {
    color: '#FFFFFF',
  },
  posSelectorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  posSelectPill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#F8FAFC',
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.9)',
  },
  posSelectPillActive: {
    backgroundColor: colors.brand,
    borderColor: colors.brand,
  },
  posSelectText: {
    fontFamily: fonts.headingBold,
    fontSize: 11,
    color: colors.textHeading,
  },
  posSelectTextActive: {
    color: '#FFFFFF',
  },
  textInput: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: 'rgba(226, 232, 240, 0.9)',
    borderRadius: radii.md,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontFamily: fonts.bodyRegular,
    fontSize: 14,
    color: colors.textHeading,
  },
  textArea: {
    height: 60,
    textAlignVertical: 'top',
  },
  modalActionsRow: {
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
  },

  /* Action Sheet Modal */
  actionSheetOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    justifyContent: 'flex-end',
  },
  actionSheetCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: radii.lg,
    borderTopRightRadius: radii.lg,
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  actionSheetHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: spacing.sm,
    marginBottom: spacing.sm,
  },
  actionSheetWordTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 20,
    color: colors.textHeading,
  },
  actionSheetWordSub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  actionSheetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  actionIconBox: {
    width: 38,
    height: 38,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  actionTextCol: {
    flex: 1,
  },
  actionRowTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 14,
    color: colors.textHeading,
  },
  actionRowSub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 1,
  },
  actionDivider: {
    height: 1,
    backgroundColor: '#F8FAFC',
  },
  actionCancelButton: {
    backgroundColor: '#F1F5F9',
    borderRadius: radii.pill,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: spacing.md,
  },
  actionCancelButtonText: {
    fontFamily: fonts.headingBold,
    fontSize: 14,
    color: colors.textHeading,
  },

  /* Delete Confirmation Modal */
  confirmOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  confirmCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.lg,
    padding: spacing.lg,
    alignItems: 'center',
    width: '100%',
    maxWidth: 340,
  },
  confirmIconWrap: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#FEF2F2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  confirmTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 18,
    color: colors.textHeading,
    marginBottom: 6,
  },
  confirmDesc: {
    fontFamily: fonts.bodyRegular,
    fontSize: 13,
    color: colors.textBody,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: spacing.lg,
  },
  confirmActionsRow: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  actionIconBox3D: {
    width: 44,
    height: 44,
    borderRadius: radii.md,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.8)',
  },
  actionIconImage3D: {
    width: 32,
    height: 32,
  },
  confirmIconWrap3D: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(239, 68, 68, 0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  confirmImage3D: {
    width: 58,
    height: 58,
  },
  confirmCancelBtn: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    borderRadius: radii.pill,
    paddingVertical: 12,
    alignItems: 'center',
  },
  confirmCancelText: {
    fontFamily: fonts.headingBold,
    fontSize: 13,
    color: colors.textHeading,
  },
  confirmDeleteBtn: {
    flex: 1,
    backgroundColor: '#EF4444',
    borderRadius: radii.pill,
    paddingVertical: 12,
    alignItems: 'center',
  },
  confirmDeleteText: {
    fontFamily: fonts.headingBold,
    fontSize: 13,
    color: '#FFFFFF',
  },
});
