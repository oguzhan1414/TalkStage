import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Image, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { stateImages } from '../assets/images';
import { AppHeader } from '../components/AppHeader';
import { BouncyPressable } from '../components/BouncyPressable';
import { Button } from '../components/Button';
import { MivoAvatar } from '../components/MivoAvatar';
import { useMivoTransition } from '../components/MivoTransitionOverlay';
import { SwipeableVocabCard } from '../components/SwipeableVocabCard';
import { Toast } from '../components/Toast';
import { CEFR_LEVELS } from '../constants/cefr';
import {
  addWordToAnyDeck,
  loadAllDecks,
  type VocabDeck,
  type VocabDeckWord,
} from '../data/vocabDecks';
import { prefetchPronunciation, usePronunciation } from '../hooks/usePronunciation';
import { api, ApiError } from '../lib/api';
import { useAnalytics } from '../lib/analytics';
import { formatIntervalLabel, predictNextIntervalDays } from '../lib/sm2Preview';
import type { MainTabScreenProps } from '../navigation/types';
import { colors, fonts, radii, shadow, spacing } from '../theme/tokens';
import type {
  VocabCardCreate,
  VocabCardOut,
  VocabCardUpdate,
  VocabGrade,
} from '../types/api';
import { MivoLoader } from '../components/MivoLoader';
import { t } from '../i18n';

const GRADE_BUTTONS: {
  grade: VocabGrade;
  label: string;
  iconName: 'refresh-outline' | 'thumbs-up-outline' | 'flash-outline';
  color: string;
  bgColor: string;
  borderColor: string;
}[] = [
  {
    grade: 'again',
    label: t("Tekrar"),
    iconName: 'refresh-outline',
    color: '#DC2626',
    bgColor: '#FEF2F2',
    borderColor: '#FECACA',
  },
  {
    grade: 'good',
    label: t("İyi"),
    iconName: 'thumbs-up-outline',
    color: '#4F46E5',
    bgColor: '#EEF2FF',
    borderColor: '#C7D2FE',
  },
  {
    grade: 'easy',
    label: t("Kolay"),
    iconName: 'flash-outline',
    color: '#059669',
    bgColor: '#ECFDF5',
    borderColor: '#A7F3D0',
  },
];

const CHEST_MILESTONES = [10, 25, 50, 100, 200, 500];

const POS_OPTIONS = [
  { id: 'noun', label: t("İsim"), color: '#2563EB' },
  { id: 'verb', label: t("Fiil"), color: '#059669' },
  { id: 'adjective', label: t("Sıfat"), color: '#D97706' },
  { id: 'adverb', label: t("Zarf"), color: '#7C3AED' },
  { id: 'phrase', label: t("Deyim"), color: '#DB2777' },
];

/** next_review_date (YYYY-MM-DD) -> "Bugün tekrar" / "Yarın" / "5 gün sonra". */
function formatDueLabel(nextReviewDate: string): string {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(`${nextReviewDate.slice(0, 10)}T00:00:00`);
  const diff = Math.round((due.getTime() - today.getTime()) / 86_400_000);
  if (Number.isNaN(diff) || diff <= 0) return t("⏰ Bugün tekrar");
  if (diff === 1) return t("🗓 Yarın");
  return t("🗓 {{diff}} gün sonra", { diff });
}

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
  const { finishTransition } = useMivoTransition();
  const queryClient = useQueryClient();
  const { track } = useAnalytics();

  // 1. Due Cards from Supabase (for SM-2 Review)
  const {
    data: dueCards,
    isLoading: dueLoading,
    refetch: refetchDueCards,
  } = useQuery({
    queryKey: ['vocab-cards'],
    queryFn: () => api.get<VocabCardOut[]>('/vocab-cards'),
  });

  // 2. All Saved Cards from Supabase (for Dictionary & Lifetime count)
  const { data: allCards, isLoading: allLoading } = useQuery({
    queryKey: ['vocab-cards', 'all'],
    queryFn: () => api.get<VocabCardOut[]>('/vocab-cards?all=true'),
  });

  useFocusEffect(
    useCallback(() => {
      if (!dueLoading && !allLoading) finishTransition();
    }, [allLoading, dueLoading, finishTransition])
  );

  // Defaults to the SM-2 review queue (Akıllı Pratik) — "what should I
  // actually do today" is the one job most visits to this tab have, so it's
  // the implicit home view now instead of one of 3 equal-weight tabs (see
  // the 2026-10 "Kelimeler sekmesi karışık" simplification pass).
  const [activeTab, setActiveTab] = useState<TabViewMode>('flashcards');
  const [queue, setQueue] = useState<VocabCardOut[]>([]);
  const [reviewedCount, setReviewedCount] = useState(0);
  const [reviewError, setReviewError] = useState<string | null>(null);
  // 'Tekrar' denen kartlar oturum sonuna geri eklenir (aynı gün yeniden görülür);
  // bu kartların ikinci gösterimi backend'e tekrar yazılmaz (XP/aralık şişmesin).
  const relearnIdsRef = useRef<Set<string>>(new Set());
  const [filtersOpen, setFiltersOpen] = useState(false);
  const { pronounce, isPlaying } = usePronunciation();

  // Klasörler artık Özellikler > "Kelime Klasörlerim" ekranında (VocabDecksScreen).
  // Burada sadece kelimeyi bir klasöre atamak için klasör listesi gerekiyor;
  // ekran her fokus aldığında (klasör başka ekranda oluşturulmuş/silinmiş
  // olabilir) yeniden okunuyor.
  const [customDecks, setCustomDecks] = useState<VocabDeck[]>([]);
  const [formSelectedDeckId, setFormSelectedDeckId] = useState<string | null>(null);
  const [assignDeckModalVisible, setAssignDeckModalVisible] = useState(false);

  const loadDecks = useCallback(async () => {
    setCustomDecks(await loadAllDecks());
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadDecks();
    }, [loadDecks])
  );

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

  // Sync today's actually-due SM-2 cards into the review queue — only at a
  // safe boundary (screen focus), never on every background refetch. Grading
  // a card fires `invalidateQueries(['vocab-cards'])`, which used to re-run a
  // `useEffect` keyed on `dueCards` and blindly overwrite the local queue —
  // if that background refetch resolved late (e.g. two cards graded in quick
  // succession, responses arriving out of order), it could reintroduce a
  // card the user had just graded. Local removal (see handleGrade) is now
  // the sole source of truth mid-session; this only re-syncs when the tab
  // (re)gains focus, when no grading is in flight.
  useFocusEffect(
    useCallback(() => {
      refetchDueCards().then((result) => {
        if (result.data) {
          relearnIdsRef.current.clear();
          setQueue(result.data);
        }
      });
    }, [refetchDueCards])
  );

  const cardsList = allCards ?? [];
  const totalCardsInChest = cardsList.length;
  const chestProgress = getChestProgress(totalCardsInChest);

  const savedTermsLower = useMemo(
    () => new Set(cardsList.map((c) => c.term.trim().toLowerCase())),
    [cardsList]
  );

  const currentCard = queue[0];

  // Sıradaki iki kartın sesini önceden indir — "Dinle"ye basınca bekleme olmasın.
  const nextTermsKey = `${queue[0]?.term ?? ''}|${queue[1]?.term ?? ''}`;
  useEffect(() => {
    if (activeTab !== 'flashcards') return;
    prefetchPronunciation(queue[0]?.term);
    prefetchPronunciation(queue[1]?.term);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextTermsKey, activeTab]);

  // Real forecast per grade for the card on top of the queue — classic SM-2
  // only tells "good" and "easy" apart from the 3rd successful review
  // onward, so a fixed "7+ gün sonra" label under "Kolay" was flat-out wrong
  // for a card's 1st or 2nd review (both land on the same interval as
  // "İyi" in that case). Mirrors backend/app/services/sm2.py exactly.
  const gradeForecastDays = useMemo(() => {
    if (!currentCard) return null;
    const { sm2_repetitions, sm2_ease_factor, sm2_interval_days } = currentCard;
    return {
      again: predictNextIntervalDays('again', sm2_repetitions, sm2_ease_factor, sm2_interval_days),
      good: predictNextIntervalDays('good', sm2_repetitions, sm2_ease_factor, sm2_interval_days),
      easy: predictNextIntervalDays('easy', sm2_repetitions, sm2_ease_factor, sm2_interval_days),
    };
  }, [currentCard]);

  const isRelearning = currentCard ? relearnIdsRef.current.has(currentCard.id) : false;
  const sessionTotal = reviewedCount + queue.length;
  const sessionPct = sessionTotal > 0 ? Math.round((reviewedCount / sessionTotal) * 100) : 0;
  const dueCount = dueCards?.length ?? 0;

  const handleGrade = async (grade: VocabGrade) => {
    if (!currentCard) return;
    const card = currentCard;
    const wasRelearn = relearnIdsRef.current.has(card.id);
    setReviewError(null);

    if (grade === 'again') {
      // Unutulan kart bu oturumda sona eklenir — aynı gün tekrar görülsün.
      relearnIdsRef.current.add(card.id);
      setQueue((prev) => [...prev.slice(1), card]);
    } else {
      relearnIdsRef.current.delete(card.id);
      setQueue((prev) => prev.slice(1));
      setReviewedCount((c) => c + 1);
    }

    if (wasRelearn) return; // ikinci tur sadece oturum içi, backend'e yazılmaz

    try {
      await api.post(`/vocab-cards/${card.id}/review`, { grade });
      track('vocab_card_reviewed', { grade });
      queryClient.invalidateQueries({ queryKey: ['vocab-cards'] });
      queryClient.invalidateQueries({ queryKey: ['vocab-cards', 'all'] });
    } catch (err) {
      setReviewError(err instanceof ApiError ? err.message : t("Kart güncellenemedi"));
    }
  };

  const handlePronounce = () => {
    if (!currentCard) return;
    pronounce(currentCard.term);
  };

  // Restart / Continuous Practice (SM-2 Free Practice)
  const handleRestartPractice = () => {
    if (cardsList.length > 0) {
      setQueue(cardsList);
      setReviewedCount(0);
      showToast(t("Tüm kelimelerle serbest pratik başlatıldı! 🔄"));
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
    setFormSelectedDeckId(null);
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
    setFormSelectedDeckId(null);
    setModalVisible(true);
  };

  // Save (Create or Update) Word in Supabase & Selected Deck
  const handleSaveWord = async () => {
    if (!formTerm.trim()) {
      showToast(t("Lütfen bir İngilizce kelime girin!"));
      return;
    }

    setIsSaving(true);
    const termClean = formTerm.trim();
    // Boş bırakılan alanlar uydurma metinle doldurulmuyor.
    const transClean = formTranslation.trim() || undefined;
    const exampleClean = formExample.trim() || undefined;

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
        showToast(t("“{{termClean}}” başarıyla güncellendi! ✏️✨", { termClean }));
      } else {
        // CREATE (POST)
        const createPayload: VocabCardCreate = {
          term: termClean,
          translation: transClean,
          example_sentence: exampleClean,
          part_of_speech: formPos,
          cefr_level: formLevel,
          source_label: t("Özel Giriş ✍️"),
        };
        const created = await api.post<VocabCardOut>('/vocab-cards', createPayload);
        setQueue((prev) => [created, ...prev]);

        // If a specific folder/deck was chosen, save it to the deck as well
        if (formSelectedDeckId) {
          const deckWordObj: VocabDeckWord = {
            id: created.id || `w_${Date.now()}`,
            term: termClean,
            phonetic: '',
            translation: transClean ?? '',
            pos: formPos as any,
            exampleEn: exampleClean ?? '',
            exampleTr: '',
            level: formLevel as any,
          };
          await addWordToAnyDeck(formSelectedDeckId, deckWordObj);
          await loadDecks();
        }

        showToast(t("“{{termClean}}” ({{formLevel}} • {{formPos}}) kaydedildi! 📦✨", { termClean, formLevel, formPos }));
      }

      await queryClient.invalidateQueries({ queryKey: ['vocab-cards'] });
      await queryClient.invalidateQueries({ queryKey: ['vocab-cards', 'all'] });
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : t("İşlem gerçekleştirilemedi."));
    } finally {
      setIsSaving(false);
      setModalVisible(false);
      setEditingCardId(null);
    }
  };

  // Assign an existing dictionary word to a deck
  const handleAssignCardToDeck = async (deck: VocabDeck) => {
    if (!actionCard) return;
    const deckWordObj: VocabDeckWord = {
      id: actionCard.id,
      term: actionCard.term,
      phonetic: '',
      translation: actionCard.translation || t("Özel kelime"),
      pos: (actionCard.part_of_speech || 'noun').toLowerCase() as any,
      exampleEn: actionCard.example_sentence || '',
      exampleTr: '',
      level: (actionCard.cefr_level || 'A2').toUpperCase() as any,
    };
    await addWordToAnyDeck(deck.id, deckWordObj);
    await loadDecks();
    setAssignDeckModalVisible(false);
    const wordName = actionCard.term;
    setActionCard(null);
    showToast(t("\"{{wordName}}\" kelimesi \"{{title}}\" klasörüne eklendi! 📁✨", { wordName, title: deck.title }));
  };

  // Delete Word from Supabase
  const handleDeleteWord = async (cardId: string, term: string) => {
    try {
      await api.delete(`/vocab-cards/${cardId}`);
      await queryClient.invalidateQueries({ queryKey: ['vocab-cards'] });
      await queryClient.invalidateQueries({ queryKey: ['vocab-cards', 'all'] });
      setQueue((prev) => prev.filter((c) => c.id !== cardId));
      showToast(t("“{{term}}” sandığından silindi. 🗑️", { term }));
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : t("Kelime silinemedi."));
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
      <AppHeader />
      <View style={styles.innerContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>{t("Kelime Sandığı")}</Text>
          <Pressable onPress={openCreateModal} style={styles.addWordHeaderButton}>
            <Ionicons name="add" size={18} color="#FFFFFF" />
            <Text style={styles.addWordHeaderButtonText}>{t("Kelime Ekle")}</Text>
          </Pressable>
        </View>

        {/* Sandık ilerlemesi + bugünün tekrar sayısı */}
        <View style={[styles.chestHeader, shadow.card]}>
          <Image source={stateImages.emptyChest} style={styles.chestIcon} resizeMode="contain" />
          <View style={styles.chestTextCol}>
            <View style={styles.chestLabelRow}>
              <Text style={styles.chestLabel}>{t("Sandık Hedefi")}</Text>
              <Text style={styles.chestCountText}>
                {totalCardsInChest} / {chestProgress.nextMilestone}
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
          <View style={[styles.duePill, dueCount === 0 && styles.duePillDone]}>
            <Text style={[styles.duePillNum, dueCount === 0 && styles.duePillNumDone]}>
              {dueCount}
            </Text>
            <Text style={[styles.duePillLabel, dueCount === 0 && styles.duePillNumDone]}>{t("bugün")}</Text>
          </View>
        </View>

        {/* İki görünüm: bugün ne tekrar edeceğim / tüm kelimelerim */}
        <View style={styles.segmentWrap}>
          {(
            [
              { id: 'flashcards', label: t("Akıllı Pratik"), on: 'flash', off: 'flash-outline' },
              { id: 'dictionary', label: t("Sözlüğüm"), on: 'book', off: 'book-outline' },
            ] as const
          ).map((seg) => {
            const active = activeTab === seg.id;
            return (
              <Pressable
                key={seg.id}
                onPress={() => setActiveTab(seg.id)}
                style={[styles.segment, active && styles.segmentActive]}
              >
                <Ionicons
                  name={active ? seg.on : seg.off}
                  size={15}
                  color={active ? '#FFFFFF' : colors.textMuted}
                />
                <Text style={[styles.segmentText, active && styles.segmentTextActive]}>
                  {seg.label}
                </Text>
                {seg.id === 'flashcards' && dueCount > 0 && !active ? (
                  <View style={styles.segmentBadge}>
                    <Text style={styles.segmentBadgeText}>{dueCount}</Text>
                  </View>
                ) : null}
              </Pressable>
            );
          })}
        </View>

        {/* ======================================================== */}
        {/* SEKMELER: 1. AKILLI FLASHCARD PRATİĞİ (SM-2)             */}
        {/* ======================================================== */}
        {activeTab === 'flashcards' && (
          <ScrollView
            contentContainerStyle={styles.practiceScrollContent}
            showsVerticalScrollIndicator={false}
          >
            {dueLoading && !dueCards ? (
              <View style={[styles.emptyBox, shadow.card, { paddingVertical: 36, alignItems: 'center' }]}>
                <MivoLoader size={130} />
                <Text style={{ fontFamily: fonts.headingBold, fontSize: 14, color: colors.textHeading, marginTop: 14 }}>{t("Kelimelerin Hazırlanıyor…")}</Text>
              </View>
            ) : currentCard ? (
              <View style={styles.contentWrap}>
                <View style={styles.sessionRow}>
                  <View style={{ flex: 1 }}>
                    <View style={styles.sessionTrack}>
                      <View style={[styles.sessionFill, { width: `${Math.max(4, sessionPct)}%` }]} />
                    </View>
                    <Text style={styles.progressText}>{t("{{reviewedCount}} / {{sessionTotal}} kart", { reviewedCount, sessionTotal })}{isRelearning ? t("  ·  🔁 tekrar turu") : ''}
                    </Text>
                  </View>
                  <Pressable
                    onPress={() => setActionCard(currentCard)}
                    hitSlop={10}
                    style={styles.cardMenuDotsButton}
                  >
                    <Ionicons name="ellipsis-horizontal" size={20} color={colors.textMuted} />
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

                {reviewError ? <Text style={styles.errorText}>{reviewError}</Text> : null}

                <View style={styles.gradeContainer}>
                  <View style={styles.gradeRow}>
                    {GRADE_BUTTONS.map(({ grade, label, iconName, color, bgColor, borderColor }) => {
                      const sub =
                        grade === 'again'
                          ? 'Birazdan'
                          : isRelearning
                            ? formatIntervalLabel(1)
                            : gradeForecastDays
                              ? formatIntervalLabel(gradeForecastDays[grade])
                              : '';
                      return (
                        <Pressable
                          key={grade}
                          style={({ pressed }) => [
                            styles.gradeButton,
                            { borderColor, backgroundColor: bgColor },
                            pressed && styles.gradeButtonPressed,
                          ]}
                          onPress={() => handleGrade(grade)}
                        >
                          <View style={styles.gradeButtonHeaderRow}>
                            <Ionicons name={iconName} size={16} color={color} />
                            <Text style={[styles.gradeButtonLabel, { color }]}>{label}</Text>
                          </View>
                          <Text style={[styles.gradeButtonSub, { color }]}>{sub}</Text>
                        </Pressable>
                      );
                    })}
                  </View>
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
                  {reviewedCount === 1
                    ? t("1 Kelime Gözden Geçirildi ✨")
                    : reviewedCount > 1
                      ? t("Günlük Tekrar Tamamlandı 🎉")
                      : totalCardsInChest > 0
                        ? t("Bugün İçin Planlı Kart Yok ✅")
                        : t("Kelime Sandığın Henüz Boş 📦")}
                </Text>
                <Text style={styles.emptySub}>
                  {reviewedCount > 0
                    ? t("{{reviewedCount}} kelimeyi başarıyla hafızana aldın. SM-2 aralıklı tekrar algoritmasıyla kalıcı hafızan güçleniyor!", { reviewedCount })
                    : totalCardsInChest > 0
                      ? t("SM-2 algoritmasına göre bugün tekrarı gelen kart yok — harika gidiyorsun! Dilersen tüm kelimelerinle serbest pratik yapabilirsin.")
                      : t("Dilediğin kelimeyi manuel ekleyebilir veya canlı sahnelerde kelimelere dokunarak sandığını doldurabilirsin.")}
                </Text>

                <View style={styles.emptyActionRow}>
                  {totalCardsInChest > 0 ? (
                    <Button
                      label={t("🔄 Tüm Kelimelerle Serbest Pratik Yap")}
                      onPress={handleRestartPractice}
                      style={styles.emptyButton}
                    />
                  ) : (
                    <Button
                      label={t("✍️ Hemen Yeni Kelime Ekle")}
                      onPress={openCreateModal}
                      style={styles.emptyButton}
                    />
                  )}
                </View>

              </View>
            )}
          </ScrollView>
        )}

        {/* ======================================================== */}
        {/* SEKMELER: 2. TÜM KELİMELERİM SÖZLÜĞÜ (Katalog & Filtre) */}
        {/* ======================================================== */}
        {activeTab === 'dictionary' && (
          <View style={styles.dictionaryContainer}>
            <View style={styles.searchRow}>
              <View style={[styles.searchBarBox, { flex: 1, marginBottom: 0 }]}>
                <Ionicons name="search" size={18} color={colors.textMuted} />
                <TextInput
                  style={styles.searchBarInput}
                  placeholder={t("Kelime, anlam veya cümle ara...")}
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
              <Pressable
                onPress={() => setFiltersOpen((o) => !o)}
                style={[
                  styles.filterToggleBtn,
                  (filtersOpen || Boolean(levelFilter || posFilter)) && styles.filterToggleBtnActive,
                ]}
              >
                <Ionicons
                  name="options-outline"
                  size={20}
                  color={filtersOpen || levelFilter || posFilter ? '#FFFFFF' : colors.textMuted}
                />
                {levelFilter || posFilter ? (
                  <View style={styles.filterToggleDot} />
                ) : null}
              </Pressable>
            </View>

            {filtersOpen && (
              <View style={styles.filterPanel}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.filterRow}
                >
                  {CEFR_LEVELS.map((lvl) => {
                    const count = cardsList.filter(
                      (w) => (w.cefr_level || 'A1').toUpperCase() === lvl
                    ).length;
                    const active = levelFilter === lvl;
                    return (
                      <Pressable
                        key={lvl}
                        onPress={() => setLevelFilter(active ? null : lvl)}
                        style={[styles.levelFilterChip, active && styles.levelFilterChipActive]}
                      >
                        <Text style={[styles.filterChipText, active && styles.filterChipTextActive]}>
                          {lvl}
                          {count > 0 ? ` (${count})` : ''}
                        </Text>
                      </Pressable>
                    );
                  })}
                </ScrollView>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.filterRow}
                >
                  {POS_OPTIONS.map((pos) => {
                    const count = cardsList.filter(
                      (w) => (w.part_of_speech || 'noun').toLowerCase() === pos.id
                    ).length;
                    const active = posFilter === pos.id;
                    return (
                      <Pressable
                        key={pos.id}
                        onPress={() => setPosFilter(active ? null : pos.id)}
                        style={[
                          styles.posFilterChip,
                          active && { backgroundColor: pos.color, borderColor: pos.color },
                        ]}
                      >
                        <Text style={[styles.filterChipText, active && styles.filterChipTextActive]}>
                          {pos.label}
                          {count > 0 ? ` (${count})` : ''}
                        </Text>
                      </Pressable>
                    );
                  })}
                </ScrollView>
              </View>
            )}

            <View style={styles.activeFilterSummaryBar}>
              <Text style={styles.activeFilterSummaryText}>
                {hasActiveFilters
                  ? t("{{length}} / {{length2}} kelime gösteriliyor", { length: filteredWords.length, length2: cardsList.length })
                  : t("{{length}} kelime · dokun: düzenle, sil, klasöre ekle", { length: cardsList.length })}
              </Text>
              {hasActiveFilters && (
                <Pressable onPress={clearAllFilters}>
                  <Text style={styles.clearAllFiltersLink}>{t("Temizle ✕")}</Text>
                </Pressable>
              )}
            </View>

            {/* Words List with Long Press & Option Menu */}
            {allLoading && !allCards ? (
              <MivoLoader size={90} label={t("Kelimelerin yükleniyor…")} style={styles.dictEmptyBlock} />
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
                      onPress={() => setActionCard(item)}
                      style={({ pressed }) => [
                        styles.dictWordCard,
                        shadow.card,
                        pressed && { opacity: 0.9, transform: [{ scale: 0.99 }] },
                      ]}
                    >
                      <View style={styles.dictTopRow}>
                        <View style={{ flex: 1 }}>
                          <Text style={styles.dictTerm} numberOfLines={1}>
                            {item.term}
                          </Text>
                          <Text style={styles.dictTranslation} numberOfLines={1}>
                            {item.translation || t("Anlam eklenmemiş")}
                          </Text>
                        </View>
                        <Pressable
                          onPress={() => pronounce(item.term)}
                          hitSlop={8}
                          style={styles.dictSoundButton}
                        >
                          <Ionicons name="volume-high" size={18} color={colors.brand} />
                        </Pressable>
                      </View>

                      {item.example_sentence ? (
                        <Text style={styles.dictExample} numberOfLines={2}>
                          &ldquo;{item.example_sentence}&rdquo;
                        </Text>
                      ) : null}

                      <View style={styles.dictBadgesRow}>
                        <View style={styles.dictLevelPill}>
                          <Text style={styles.dictLevelPillText}>{item.cefr_level || 'A1'}</Text>
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
                            {posItem ? posItem.label : t("İsim")}
                          </Text>
                        </View>
                        <Text style={styles.dictDueText}>{formatDueLabel(item.next_review_date)}</Text>
                      </View>
                    </Pressable>
                  );
                }}
              />
            ) : (
              <View style={styles.dictEmptyBlock}>
                <Ionicons name="search-outline" size={32} color={colors.textMuted} />
                <Text style={styles.dictEmptyText}>
                  {hasActiveFilters
                    ? t("Seçtiğin filtrelere uygun kelime bulunamadı.")
                    : t("Henüz kelime eklemedin.")}
                </Text>
                {hasActiveFilters && (
                  <Button
                    label={t("Tüm Filtreleri Temizle")}
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
                  {editingCardId ? t("Kelimeyi Düzenle ✏️") : t("Yeni Kelime Ekle ✍️")}
                </Text>
                <Text style={styles.modalSub}>
                  {editingCardId
                    ? t("Kelimenin seviye, tür ve anlamını güncelle")
                    : t("Tür ve seviye belirleyerek sandığına kaydet")}
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
                <Text style={styles.inputLabel}>{t("İNGİLİZCE KELİME VEYA DEYİM *")}</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder={t("Örn: resilient, nail down, breakthrough")}
                  placeholderTextColor={colors.textMuted}
                  value={formTerm}
                  onChangeText={setFormTerm}
                  autoCapitalize="none"
                  autoFocus={!editingCardId}
                />
              </View>

              {/* 2. CEFR Level Selector (A1 - C2) */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>{t("CEFR SEVİYESİ")}</Text>
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
                <Text style={styles.inputLabel}>{t("GRAMER TÜRÜ (PART OF SPEECH)")}</Text>
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
                <Text style={styles.inputLabel}>{t("TÜRKÇE ANLAMI")}</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder={t("Örn: Dayanıklı, toparlanabilen")}
                  placeholderTextColor={colors.textMuted}
                  value={formTranslation}
                  onChangeText={setFormTranslation}
                />
              </View>

              {/* 5. Example Sentence */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>{t("CÜMLE İÇİNDE KULLANIMI")}</Text>
                <TextInput
                  style={[styles.textInput, styles.textArea]}
                  placeholder={t("Örn: The engineering team built a highly resilient backend.")}
                  placeholderTextColor={colors.textMuted}
                  value={formExample}
                  onChangeText={setFormExample}
                  multiline
                  numberOfLines={3}
                />
              </View>

              {/* 6. Target Folder / Deck Selection (Optional) */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>{t("📁 EKLENECEK KLASÖR / DESTE (İSTEĞE BAĞLI)")}</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.deckSelectScroll}>
                  <Pressable
                    onPress={() => setFormSelectedDeckId(null)}
                    style={[
                      styles.deckSelectChip,
                      formSelectedDeckId === null && styles.deckSelectChipActive,
                    ]}
                  >
                    <Text style={[styles.deckSelectChipText, formSelectedDeckId === null && styles.deckSelectChipTextActive]}>{t("🌟 Genel Sandık")}</Text>
                  </Pressable>
                  {customDecks.map((deck) => (
                    <Pressable
                      key={deck.id}
                      onPress={() => setFormSelectedDeckId(deck.id)}
                      style={[
                        styles.deckSelectChip,
                        formSelectedDeckId === deck.id && {
                          backgroundColor: `${deck.color}20`,
                          borderColor: deck.color,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.deckSelectChipText,
                          formSelectedDeckId === deck.id && { color: deck.color, fontWeight: 'bold' },
                        ]}
                      >
                        {deck.emoji} {deck.title}
                      </Text>
                    </Pressable>
                  ))}
                </ScrollView>
              </View>

              {/* Action Buttons */}
              <View style={styles.modalActionsRow}>
                <Button
                  label={
                    isSaving
                      ? t("Kaydediliyor...")
                      : editingCardId
                        ? t("💾 Değişiklikleri Güncelle")
                        : t("💾 Sandığıma Kaydet")
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
        visible={Boolean(actionCard && !deleteConfirmVisible && !assignDeckModalVisible)}
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
                {actionCard?.cefr_level || 'A2'} • {actionCard?.part_of_speech || t("İsim")} • {actionCard?.translation}
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
                <Text style={styles.actionRowTitle}>{t("Kelimeyi Düzenle")}</Text>
                <Text style={styles.actionRowSub}>{t("Seviye, tür, anlam veya cümleyi değiştir")}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </Pressable>

            <View style={styles.actionDivider} />

            {/* Assign to Deck Option */}
            <Pressable
              style={styles.actionSheetRow}
              onPress={() => setAssignDeckModalVisible(true)}
            >
              <View style={[styles.actionIconBox3D, { backgroundColor: '#EEF2FF' }]}>
                <Ionicons name="folder-open" size={22} color="#4F46E5" />
              </View>
              <View style={styles.actionTextCol}>
                <Text style={styles.actionRowTitle}>{t("Bir Klasöre / Desteye Ekle")}</Text>
                <Text style={styles.actionRowSub}>{t("Renkler, Sayılar veya özel destelerine dahil et")}</Text>
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
                <Text style={[styles.actionRowTitle, { color: '#EF4444' }]}>{t("Kelimeyi Sil")}</Text>
                <Text style={styles.actionRowSub}>{t("Bu kelimeyi sandığından tamamen kaldır")}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </Pressable>

            {/* Cancel Button */}
            <Pressable
              style={styles.actionCancelButton}
              onPress={() => setActionCard(null)}
            >
              <Text style={styles.actionCancelButtonText}>{t("Vazgeç")}</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>

      {/* ======================================================== */}
      {/* 📁 ASSIGN WORD TO DECK MODAL                             */}
      {/* ======================================================== */}
      <Modal
        visible={assignDeckModalVisible}
        animationType="slide"
        presentationStyle="formSheet"
        onRequestClose={() => setAssignDeckModalVisible(false)}
      >
        <SafeAreaView style={styles.assignModalContainer}>
          <View style={styles.assignModalHeader}>
            <View style={{ flex: 1 }}>
              <Text style={styles.assignModalTitle}>{t("📁 Klasöre / Desteye Ekle")}</Text>
              <Text style={styles.assignModalSub}>{t("\"{{term}}\" kelimesini eklemek istediğin klasörü seç:", { term: actionCard?.term })}</Text>
            </View>
            <BouncyPressable
              onPress={() => setAssignDeckModalVisible(false)}
              style={styles.closeModalButton}
              hapticType="light"
              scaleTo={0.9}
            >
              <Ionicons name="close" size={22} color={colors.textMuted} />
            </BouncyPressable>
          </View>

          <ScrollView contentContainerStyle={{ padding: 16 }} showsVerticalScrollIndicator={false}>
            {customDecks.map((deck) => (
              <BouncyPressable
                key={deck.id}
                onPress={() => handleAssignCardToDeck(deck)}
                style={[styles.assignDeckItem, { borderColor: `${deck.color}50` }]}
                hapticType="medium"
                scaleTo={0.97}
              >
                <View style={[styles.assignDeckEmojiBox, { backgroundColor: `${deck.color}18` }]}>
                  <Text style={styles.assignDeckEmoji}>{deck.emoji}</Text>
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.assignDeckTitle}>{deck.title}</Text>
                  <Text style={styles.assignDeckSub}>{deck.subtitle}</Text>
                </View>
                <View style={[styles.deckPillLevel, { backgroundColor: deck.color }]}>
                  <Text style={styles.deckPillLevelText}>{t("{{length}} Kelime", { length: deck.words.length })}</Text>
                </View>
              </BouncyPressable>
            ))}
          </ScrollView>
        </SafeAreaView>
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

            <Text style={styles.confirmTitle}>{t("Kelimeyi Sil?")}</Text>
            <Text style={styles.confirmDesc}>
              {t("“{{term}}” kelimesini kelime sandığından silmek istediğine emin misin? Bu işlem geri alınamaz.", { term: actionCard?.term ?? '' })}</Text>

            <View style={styles.confirmActionsRow}>
              <Pressable
                style={styles.confirmCancelBtn}
                onPress={() => setDeleteConfirmVisible(false)}
              >
                <Text style={styles.confirmCancelText}>{t("Vazgeç")}</Text>
              </Pressable>

              <Pressable
                style={styles.confirmDeleteBtn}
                onPress={() =>
                  actionCard && handleDeleteWord(actionCard.id, actionCard.term)
                }
              >
                <Text style={styles.confirmDeleteText}>{t("Evet, Sil")}</Text>
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
    paddingTop: 0,
    paddingBottom: 96,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: {
    fontFamily: fonts.headingBold,
    fontSize: 22,
    color: colors.textHeading,
  },
  subtitle: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11.5,
    color: colors.textMuted,
    marginTop: 1,
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

  deckPillLevel: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  deckPillLevelText: {
    fontFamily: fonts.mono,
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  addWordHeaderButtonText: {
    fontFamily: fonts.headingBold,
    fontSize: 12,
    color: '#FFFFFF',
  },

  /* Secondary quick-links row — small, auto-width pills (not equal-weight
     boxed tabs) so the 3 alternate views + the library read as "optional
     side destinations", not as 4 equally important systems. */

  /* Chest Header */
  chestHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: radii.lg,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
    borderWidth: 1.5,
    borderColor: '#E0E7FF',
  },
  chestIcon: {
    width: 32,
    height: 32,
    marginRight: 10,
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
    paddingVertical: 2,
    minHeight: 250,
  },
  gradeContainer: {
    marginTop: 8,
  },
  gradeRow: {
    flexDirection: 'row',
    gap: 8,
  },
  gradeButton: {
    flex: 1,
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderBottomWidth: 4,
    minHeight: 54,
  },
  gradeButtonHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  gradeButtonLabel: {
    fontFamily: fonts.headingBold,
    fontSize: 13,
  },
  gradeButtonSub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 9.5,
    marginTop: 2,
    opacity: 0.9,
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
    paddingHorizontal: 4,
    paddingVertical: 4,
    marginBottom: 6,
  },
  activeFilterSummaryText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
  },
  clearAllFiltersLink: {
    fontFamily: fonts.headingBold,
    fontSize: 10,
    color: colors.error,
  },
  dictionaryList: {
    gap: 8,
    paddingBottom: 20,
    marginTop: 2,
  },
  dictWordCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.md,
    padding: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.8)',
  },
  dictBadgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
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
  dictSoundButton: {
    backgroundColor: 'rgba(79, 70, 229, 0.08)',
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dictTerm: {
    fontFamily: fonts.headingBold,
    fontSize: 16,
    color: colors.textHeading,
  },
  dictTranslation: {
    fontFamily: fonts.bodyRegular,
    fontSize: 13,
    color: colors.textBody,
    marginTop: 1,
  },
  dictExample: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11.5,
    color: colors.textMuted,
    fontStyle: 'italic',
    lineHeight: 16,
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

  /* Library Quick Link Banner */

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

  /* 📁 Target Deck Picker Chips (In Create Modal) */
  deckSelectScroll: {
    paddingVertical: 4,
    gap: 8,
  },
  deckSelectChip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: radii.pill,
    backgroundColor: '#F8FAFC',
    borderWidth: 1.2,
    borderColor: '#CBD5E1',
  },
  deckSelectChipActive: {
    backgroundColor: '#EEF2FF',
    borderColor: colors.brand,
  },
  deckSelectChipText: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 11.5,
    color: '#475569',
  },
  deckSelectChipTextActive: {
    color: colors.brand,
    fontWeight: 'bold',
  },

  /* 📁 Assign Deck Modal Styles */
  assignModalContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  assignModalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  assignModalTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 16,
    color: '#0F172A',
  },
  assignModalSub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  assignDeckItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1.2,
  },
  assignDeckEmojiBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  assignDeckEmoji: {
    fontSize: 22,
  },
  assignDeckTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 14,
    color: '#0F172A',
  },
  assignDeckSub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11.5,
    color: '#64748B',
    marginTop: 2,
  },

  /* Active Practice Scroll Content */
  practiceScrollContent: {
    flexGrow: 1,
    paddingBottom: 8,
  },

  /* Sandık özeti */
  duePill: {
    marginLeft: 10,
    minWidth: 46,
    alignItems: 'center',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 12,
    backgroundColor: '#FFF1F2',
    borderWidth: 1.5,
    borderColor: '#FECDD3',
  },
  duePillDone: {
    backgroundColor: '#ECFDF5',
    borderColor: '#A7F3D0',
  },
  duePillNum: {
    fontFamily: fonts.headingBold,
    fontSize: 15,
    lineHeight: 17,
    color: '#E11D48',
  },
  duePillNumDone: {
    color: '#059669',
  },
  duePillLabel: {
    fontFamily: fonts.headingBold,
    fontSize: 9.5,
    color: '#E11D48',
  },

  /* Segmentli sekme */
  segmentWrap: {
    flexDirection: 'row',
    backgroundColor: '#EEF2F7',
    borderRadius: radii.pill,
    padding: 3,
    marginBottom: 8,
  },
  segment: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 7,
    borderRadius: radii.pill,
  },
  segmentActive: {
    backgroundColor: colors.brand,
  },
  segmentText: {
    fontFamily: fonts.headingBold,
    fontSize: 12.5,
    color: colors.textMuted,
  },
  segmentTextActive: {
    color: '#FFFFFF',
  },
  segmentBadge: {
    minWidth: 18,
    paddingHorizontal: 5,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F43F5E',
  },
  segmentBadgeText: {
    fontFamily: fonts.headingBold,
    fontSize: 10,
    color: '#FFFFFF',
  },

  /* Pratik oturumu */
  sessionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  sessionTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E2E8F0',
    overflow: 'hidden',
    marginBottom: 4,
  },
  sessionFill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: '#10B981',
  },
  gradeButtonPressed: {
    transform: [{ translateY: 2 }],
    borderBottomWidth: 2,
  },

  /* Sözlük */
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  filterToggleBtn: {
    width: 44,
    height: 44,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.8)',
  },
  filterToggleBtnActive: {
    backgroundColor: colors.brand,
    borderColor: colors.brand,
  },
  filterToggleDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F43F5E',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  filterPanel: {
    gap: 6,
    marginBottom: 8,
  },
  dictTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  dictDueText: {
    marginLeft: 'auto',
    fontFamily: fonts.bodyRegular,
    fontSize: 10,
    color: colors.textMuted,
  },
});
