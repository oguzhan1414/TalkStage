import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Image, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { stateImages } from '../assets/images';
import { BouncyPressable } from '../components/BouncyPressable';
import { Button } from '../components/Button';
import { CreateDeckModal } from '../components/CreateDeckModal';
import { DeckStudyModal } from '../components/DeckStudyModal';
import { SwipeableVocabCard } from '../components/SwipeableVocabCard';
import { Toast } from '../components/Toast';
import { CEFR_LEVELS } from '../constants/cefr';
import {
  DEFAULT_VOCAB_DECKS,
  addWordToAnyDeck,
  deleteCustomDeck,
  getDeckMasteredWordIds,
  loadAllDecks,
  type VocabDeck,
  type VocabDeckWord,
} from '../data/vocabDecks';
import { usePronunciation } from '../hooks/usePronunciation';
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
    label: 'Tekrar',
    iconName: 'refresh-outline',
    color: '#DC2626',
    bgColor: '#FEF2F2',
    borderColor: '#FECACA',
  },
  {
    grade: 'good',
    label: 'İyi',
    iconName: 'thumbs-up-outline',
    color: '#4F46E5',
    bgColor: '#EEF2FF',
    borderColor: '#C7D2FE',
  },
  {
    grade: 'easy',
    label: 'Kolay',
    iconName: 'flash-outline',
    color: '#059669',
    bgColor: '#ECFDF5',
    borderColor: '#A7F3D0',
  },
];

const CHEST_MILESTONES = [10, 25, 50, 100, 200, 500];

// Custom klasör sayısına makul bir tavan — sınırsız klasör açılabilmesi
// "Klasörler" ızgarasını hızla anlamsız bir yığına çeviriyordu (bkz. mobile
// CLAUDE.md). 6 hazır tema + 12 özel klasör hâlâ tek ekranda taranabilir.
const MAX_CUSTOM_DECKS = 12;

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

type TabViewMode = 'decks' | 'flashcards' | 'dictionary';

export function VocabScreen({ navigation }: MainTabScreenProps<'Vocab'>) {
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

  const [activeTab, setActiveTab] = useState<TabViewMode>('decks');
  const [queue, setQueue] = useState<VocabCardOut[]>([]);
  const [reviewedCount, setReviewedCount] = useState(0);
  const [reviewError, setReviewError] = useState<string | null>(null);
  const { pronounce, toggle, isPlaying } = usePronunciation();

  // Decks & Folders State
  const [customDecks, setCustomDecks] = useState<VocabDeck[]>([]);
  const [deckFilter, setDeckFilter] = useState<string>('all');
  const [selectedStudyDeck, setSelectedStudyDeck] = useState<VocabDeck | null>(null);
  const [createDeckVisible, setCreateDeckVisible] = useState(false);
  const [deckMasteryMap, setDeckMasteryMap] = useState<Record<string, number>>({});
  const [formSelectedDeckId, setFormSelectedDeckId] = useState<string | null>(null);
  const [assignDeckModalVisible, setAssignDeckModalVisible] = useState(false);

  const loadDecksAndMastery = async () => {
    const allDecks = await loadAllDecks();
    const customOnly = allDecks.filter((d) => d.isCustom);
    setCustomDecks(customOnly);

    const map: Record<string, number> = {};
    for (const d of allDecks) {
      const masteredIds = await getDeckMasteredWordIds(d.id);
      map[d.id] = masteredIds.length;
    }
    setDeckMasteryMap(map);
  };

  useEffect(() => {
    loadDecksAndMastery();
  }, []);

  const allCombinedDecks = useMemo(() => {
    return [...DEFAULT_VOCAB_DECKS, ...customDecks];
  }, [customDecks]);

  // Custom decks now always render in their own "Kendi Klasörlerim" section
  // (see decks-tab JSX below), so this filter only ever narrows the fixed
  // "Hazır Temalar" set — it can't grow, so it stays a simple flat list.
  const filteredDefaultDecks = useMemo(() => {
    if (deckFilter === 'all') return DEFAULT_VOCAB_DECKS;
    if (deckFilter === 'thematic') {
      return DEFAULT_VOCAB_DECKS.filter((d) =>
        ['deck_colors_shapes', 'deck_numbers_time', 'deck_food_dining', 'deck_travel_airport', 'deck_business_tech'].includes(d.id)
      );
    }
    return DEFAULT_VOCAB_DECKS.filter((d) => d.level === deckFilter);
  }, [deckFilter]);

  const isCustomDeckCapReached = customDecks.length >= MAX_CUSTOM_DECKS;

  const handleOpenCreateDeck = () => {
    if (isCustomDeckCapReached) {
      showToast(`En fazla ${MAX_CUSTOM_DECKS} özel klasör oluşturabilirsin — önce birini silip yer aç 📁`);
      return;
    }
    setCreateDeckVisible(true);
  };

  const handleDeleteCustomDeck = (deckId: string) => {
    Alert.alert('Klasörü Sil', 'Bu özel klasörü silmek istediğine emin misin?', [
      { text: 'İptal', style: 'cancel' },
      {
        text: 'Sil',
        style: 'destructive',
        onPress: async () => {
          const updated = await deleteCustomDeck(deckId);
          setCustomDecks(updated);
          showToast('Klasör silindi 🗑️');
        },
      },
    ]);
  };

  const renderDeckCard = (deck: VocabDeck) => {
    const total = deck.words.length;
    const mastered = deckMasteryMap[deck.id] || 0;
    const percent = total > 0 ? Math.min(100, Math.round((mastered / total) * 100)) : 0;

    return (
      <View key={deck.id} style={[styles.deckBentoCard, shadow.card, { borderColor: deck.color }]}>
        <View style={styles.deckCardTop}>
          <View style={[styles.deckEmojiBadge, { backgroundColor: `${deck.color}18` }]}>
            <Text style={styles.deckEmojiBig}>{deck.emoji}</Text>
          </View>
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.deckCardTitle} numberOfLines={1}>{deck.title}</Text>
            <Text style={styles.deckCardSub} numberOfLines={1}>{deck.subtitle}</Text>
          </View>
          <View style={[styles.deckPillLevel, { backgroundColor: deck.color }]}>
            <Text style={styles.deckPillLevelText}>{deck.level}</Text>
          </View>
          {deck.isCustom && (
            <BouncyPressable
              onPress={() => handleDeleteCustomDeck(deck.id)}
              style={styles.deckDeleteBtn}
              hapticType="warning"
              scaleTo={0.88}
            >
              <Ionicons name="trash-outline" size={15} color="#EF4444" />
            </BouncyPressable>
          )}
        </View>

        {/* Progress Bar & Word Count */}
        <View style={styles.deckCardProgressArea}>
          <View style={styles.deckProgressLabelRow}>
            <Text style={styles.deckWordCountText}>{total} Kelime</Text>
            <Text style={styles.deckPercentText}>
              {mastered}/{total} Öğrenildi • %{percent}
            </Text>
          </View>
          <View style={styles.deckBarTrack}>
            <View
              style={[
                styles.deckBarFill,
                { width: `${Math.max(6, percent)}%`, backgroundColor: deck.color },
              ]}
            />
          </View>
        </View>

        {/* Action CTA */}
        <BouncyPressable
          onPress={() => setSelectedStudyDeck(deck)}
          style={[styles.deckStartBtn, { backgroundColor: deck.color }, shadow.card]}
          hapticType="medium"
          scaleTo={0.96}
        >
          <Text style={styles.deckStartBtnText}>Pratiğe Başla ➔</Text>
        </BouncyPressable>
      </View>
    );
  };

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
        if (result.data) setQueue(result.data);
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

  const handleGrade = async (grade: VocabGrade) => {
    if (!currentCard) return;
    setReviewError(null);
    setQueue((prev) => prev.slice(1));
    setReviewedCount((c) => c + 1);

    try {
      await api.post(`/vocab-cards/${currentCard.id}/review`, { grade });
      track('vocab_card_reviewed', { grade });
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

  // Restart / Continuous Practice (SM-2 Free Practice)
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

        // If a specific folder/deck was chosen, save it to the deck as well
        if (formSelectedDeckId) {
          const deckWordObj: VocabDeckWord = {
            id: created.id || `w_${Date.now()}`,
            term: termClean,
            phonetic: '',
            translation: transClean,
            pos: formPos as any,
            exampleEn: exampleClean,
            exampleTr: '',
            level: formLevel as any,
          };
          await addWordToAnyDeck(formSelectedDeckId, deckWordObj);
          await loadDecksAndMastery();
        }

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

  // Assign an existing dictionary word to a deck
  const handleAssignCardToDeck = async (deck: VocabDeck) => {
    if (!actionCard) return;
    const deckWordObj: VocabDeckWord = {
      id: actionCard.id,
      term: actionCard.term,
      phonetic: '',
      translation: actionCard.translation || 'Özel kelime',
      pos: (actionCard.part_of_speech || 'noun').toLowerCase() as any,
      exampleEn: actionCard.example_sentence || '',
      exampleTr: '',
      level: (actionCard.cefr_level || 'A2').toUpperCase() as any,
    };
    await addWordToAnyDeck(deck.id, deckWordObj);
    await loadDecksAndMastery();
    setAssignDeckModalVisible(false);
    const wordName = actionCard.term;
    setActionCard(null);
    showToast(`"${wordName}" kelimesi "${deck.title}" klasörüne eklendi! 📁✨`);
  };

  // The reverse bridge: Klasörler'deki bir kelimeyi gerçek SM-2 kuyruğuna
  // (Sandık) taşır. Klasör pratiği ile Akıllı Pratik/Sözlüğüm bugüne kadar
  // tamamen ayrı iki sistemdi (deste kelimeleri hiç Sandığa girmiyordu) —
  // kullanıcı seçtiği kelimeleri bilinçli olarak buraya taşıyabiliyor artık.
  const handleAddDeckWordToChest = async (word: VocabDeckWord): Promise<boolean> => {
    try {
      const createPayload: VocabCardCreate = {
        term: word.term,
        translation: word.translation,
        example_sentence: word.exampleEn || undefined,
        part_of_speech: word.pos,
        cefr_level: word.level,
        source_label: 'Klasör Pratiği 📁',
      };
      const created = await api.post<VocabCardOut>('/vocab-cards', createPayload);
      setQueue((prev) => (prev.some((c) => c.id === created.id) ? prev : [created, ...prev]));
      await queryClient.invalidateQueries({ queryKey: ['vocab-cards', 'all'] });
      showToast(`"${word.term}" Sandığına eklendi! 📦✨`);
      return true;
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : 'Kelime eklenemedi.');
      return false;
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

        {/* Segmented Switcher: 3 Tabs (Klasörler / Akıllı Pratik / Tüm Sözlüğüm) */}
        <View style={styles.segmentedContainer}>
          <Pressable
            onPress={() => setActiveTab('decks')}
            style={[
              styles.segmentedTab,
              activeTab === 'decks' && styles.segmentedTabActive,
            ]}
          >
            <Ionicons
              name="folder-open-outline"
              size={15}
              color={activeTab === 'decks' ? colors.brand : colors.textMuted}
            />
            <Text
              style={[
                styles.segmentedTabText,
                activeTab === 'decks' && styles.segmentedTabTextActive,
              ]}
            >
              Klasörler ({allCombinedDecks.length})
            </Text>
          </Pressable>

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
              Sözlüğüm ({totalCardsInChest})
            </Text>
          </Pressable>
        </View>

        {/* Bu 3 bölüm aynı işi farklı şekillerde yapıyormuş gibi hissettirebiliyordu
            (aynı ekranda klasör pratiği, SM-2 pratiği ve sözlük ayrı ayrı var) —
            her sekmenin ne işe yaradığını tek satırda netleştiriyoruz. */}
        <Text style={styles.tabExplainerText}>
          {activeTab === 'decks'
            ? '📁 Tematik desteler — hızlı gözden geçirme, hafıza takvimine dahil değil'
            : activeTab === 'flashcards'
              ? '🧠 Sandığındaki kartlardan bugün tekrarı gelenlerin SM-2 kuyruğu'
              : '📖 Sandığına kaydettiğin TÜM kelimelerin aranabilir kataloğu'}
        </Text>

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
        {/* SEKMELER: 0. KLASÖRLER & DESTELER (SMART DECKS HUB)     */}
        {/* ======================================================== */}
        {activeTab === 'decks' && (
          <ScrollView contentContainerStyle={styles.decksContainer} showsVerticalScrollIndicator={false}>
            {/* SECTION 1: Kendi Klasörlerim — her zaman kendi bölümünde, tavanlı
                (bkz. MAX_CUSTOM_DECKS) böylece "Hazır Temalar"ın arasına
                karışıp anlamsız bir yığın oluşturamıyor. */}
            <View style={styles.decksHeaderRow}>
              <View style={{ flex: 1, marginRight: 8 }}>
                <Text style={styles.decksSectionTitle}>
                  📁 Kendi Klasörlerim ({customDecks.length}/{MAX_CUSTOM_DECKS})
                </Text>
                <Text style={styles.decksSectionSub}>
                  Kendi başlıklarınla grupladığın kelimeler.
                </Text>
              </View>
              <BouncyPressable
                onPress={handleOpenCreateDeck}
                style={[
                  styles.createDeckHeaderBtn,
                  shadow.card,
                  isCustomDeckCapReached && styles.createDeckHeaderBtnDisabled,
                ]}
                hapticType="medium"
                scaleTo={0.94}
              >
                <Ionicons name="add" size={15} color="#FFFFFF" style={{ marginRight: 4 }} />
                <Text style={styles.createDeckHeaderBtnText}>Yeni Klasör</Text>
              </BouncyPressable>
            </View>

            {customDecks.length > 0 ? (
              <View style={[styles.decksGrid, { marginBottom: 24 }]}>
                {customDecks.map((deck) => renderDeckCard(deck))}
              </View>
            ) : (
              <View style={styles.emptyCustomDecksBox}>
                <Text style={styles.emptyCustomDecksText}>
                  Henüz özel klasörün yok. Ör. "Mülakat Terimlerim" gibi kendi temanı oluşturup istediğin kelimeleri içine topla.
                </Text>
              </View>
            )}

            {/* SECTION 2: Hazır Temalar — sabit 6 deste, sadece bunlar seviye/tema
                filtresine giriyor (custom klasörler zaten yukarıda tam liste). */}
            <Text style={styles.decksSectionTitle}>🎴 Hazır Temalar</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.deckFiltersScroll}>
              {[
                { id: 'all', label: '🌟 Tümü' },
                { id: 'A1', label: '🟢 A1 Seviye' },
                { id: 'A2', label: '🔵 A2 Seviye' },
                { id: 'B1', label: '🟣 B1 Seviye' },
                { id: 'thematic', label: '🎨 Tematik' },
              ].map((f) => (
                <BouncyPressable
                  key={f.id}
                  onPress={() => setDeckFilter(f.id)}
                  style={[
                    styles.deckFilterChip,
                    deckFilter === f.id && styles.deckFilterChipActive,
                  ]}
                  hapticType="light"
                  scaleTo={0.92}
                >
                  <Text
                    style={[
                      styles.deckFilterChipText,
                      deckFilter === f.id && styles.deckFilterChipTextActive,
                    ]}
                  >
                    {f.label}
                  </Text>
                </BouncyPressable>
              ))}
            </ScrollView>

            <View style={styles.decksGrid}>
              {filteredDefaultDecks.map((deck) => renderDeckCard(deck))}
            </View>
          </ScrollView>
        )}

        {/* ======================================================== */}
        {/* SEKMELER: 1. AKILLI FLASHCARD PRATİĞİ (SM-2)             */}
        {/* ======================================================== */}
        {activeTab === 'flashcards' && (
          <ScrollView
            contentContainerStyle={styles.practiceScrollContent}
            showsVerticalScrollIndicator={false}
          >
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
                    {GRADE_BUTTONS.map(({ grade, label, iconName, color, bgColor, borderColor }) => (
                      <Pressable
                        key={grade}
                        style={[
                          styles.gradeButton,
                          { borderColor, backgroundColor: bgColor },
                        ]}
                        onPress={() => handleGrade(grade)}
                      >
                        <View style={styles.gradeButtonHeaderRow}>
                          <Ionicons name={iconName} size={15} color={color} />
                          <Text style={[styles.gradeButtonLabel, { color }]}>{label}</Text>
                        </View>
                        <Text style={[styles.gradeButtonSub, { color }]}>
                          {gradeForecastDays ? formatIntervalLabel(gradeForecastDays[grade]) : ''}
                        </Text>
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
                  {reviewedCount === 1
                    ? '1 Kelime Gözden Geçirildi ✨'
                    : reviewedCount > 1
                      ? 'Günlük Tekrar Tamamlandı 🎉'
                      : totalCardsInChest > 0
                        ? 'Bugün İçin Planlı Kart Yok ✅'
                        : 'Kelime Sandığın Henüz Boş 📦'}
                </Text>
                <Text style={styles.emptySub}>
                  {reviewedCount > 0
                    ? `${reviewedCount} kelimeyi başarıyla hafızana aldın. SM-2 aralıklı tekrar algoritmasıyla kalıcı hafızan güçleniyor!`
                    : totalCardsInChest > 0
                      ? 'SM-2 algoritmasına göre bugün tekrarı gelen kart yok — harika gidiyorsun! Dilersen tüm kelimelerinle serbest pratik yapabilir veya klasörlerinden pratik seçebilirsin.'
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
                    label="🎴 Kelime Klasörlerinden Pratik Yap"
                    variant="ghost"
                    onPress={() => setActiveTab('decks')}
                    style={styles.emptyButtonGhost}
                  />
                </View>

                {/* 900 Words Library Discovery Banner */}
                <Pressable
                  onPress={() => navigation.navigate('VocabLibrary')}
                  style={[styles.libraryQuickLinkBanner, shadow.card, { marginTop: 14, width: '100%' }]}
                >
                  <View style={styles.libraryQuickLinkLeft}>
                    <View style={styles.libraryQuickLinkIconBox}>
                      <Ionicons name="sparkles" size={14} color={colors.brand} />
                    </View>
                    <View style={styles.libraryQuickLinkTextCol}>
                      <Text style={styles.libraryQuickLinkTitle}>900 Çekirdek Kelime Kütüphanesi 📚</Text>
                      <Text style={styles.libraryQuickLinkSub}>
                        İsim, Fiil ve Sıfat paketlerini incele &amp; sandığına ekle
                      </Text>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color={colors.brand} />
                </Pressable>
              </View>
            )}
          </ScrollView>
        )}

        {/* ======================================================== */}
        {/* SEKMELER: 2. TÜM KELİMELERİM SÖZLÜĞÜ (Katalog & Filtre) */}
        {/* ======================================================== */}
        {activeTab === 'dictionary' && (
          <View style={styles.dictionaryContainer}>
            {/* 900 Words Library Discovery Banner */}
            <Pressable
              onPress={() => navigation.navigate('VocabLibrary')}
              style={[styles.libraryQuickLinkBanner, shadow.card]}
            >
              <View style={styles.libraryQuickLinkLeft}>
                <View style={styles.libraryQuickLinkIconBox}>
                  <Ionicons name="sparkles" size={14} color={colors.brand} />
                </View>
                <View style={styles.libraryQuickLinkTextCol}>
                  <Text style={styles.libraryQuickLinkTitle}>900 Çekirdek Kelime Kütüphanesi 📚</Text>
                  <Text style={styles.libraryQuickLinkSub}>
                    İsim, Fiil ve Sıfat paketlerini incele &amp; sandığına ekle
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.brand} />
            </Pressable>

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

              {/* 6. Target Folder / Deck Selection (Optional) */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>📁 EKLENECEK KLASÖR / DESTE (İSTEĞE BAĞLI)</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.deckSelectScroll}>
                  <Pressable
                    onPress={() => setFormSelectedDeckId(null)}
                    style={[
                      styles.deckSelectChip,
                      formSelectedDeckId === null && styles.deckSelectChipActive,
                    ]}
                  >
                    <Text style={[styles.deckSelectChipText, formSelectedDeckId === null && styles.deckSelectChipTextActive]}>
                      🌟 Genel Sandık
                    </Text>
                  </Pressable>
                  {allCombinedDecks.map((deck) => (
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

            {/* Assign to Deck Option */}
            <Pressable
              style={styles.actionSheetRow}
              onPress={() => setAssignDeckModalVisible(true)}
            >
              <View style={[styles.actionIconBox3D, { backgroundColor: '#EEF2FF' }]}>
                <Ionicons name="folder-open" size={22} color="#4F46E5" />
              </View>
              <View style={styles.actionTextCol}>
                <Text style={styles.actionRowTitle}>Bir Klasöre / Desteye Ekle</Text>
                <Text style={styles.actionRowSub}>Renkler, Sayılar veya özel destelerine dahil et</Text>
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
              <Text style={styles.assignModalTitle}>📁 Klasöre / Desteye Ekle</Text>
              <Text style={styles.assignModalSub}>
                "{actionCard?.term}" kelimesini eklemek istediğin klasörü seç:
              </Text>
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
            {allCombinedDecks.map((deck) => (
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
                  <Text style={styles.deckPillLevelText}>{deck.words.length} Kelime</Text>
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

      {/* 🎴 DECK STUDY MODAL */}
      <DeckStudyModal
        visible={!!selectedStudyDeck}
        deck={selectedStudyDeck}
        onClose={() => {
          setSelectedStudyDeck(null);
          loadDecksAndMastery();
        }}
        onDeckCompleted={() => {
          loadDecksAndMastery();
          showToast('🎉 Deste tamamlandı! +25 XP');
        }}
        savedTermsLower={savedTermsLower}
        onAddToChest={handleAddDeckWordToChest}
      />

      {/* ➕ CREATE DECK MODAL */}
      <CreateDeckModal
        visible={createDeckVisible}
        onClose={() => setCreateDeckVisible(false)}
        onDeckCreated={(d) => {
          loadDecksAndMastery();
          showToast(`"${d.title}" klasörü oluşturuldu! 📁`);
        }}
      />

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

  /* 🎴 Decks Hub Styles */
  decksContainer: {
    paddingBottom: 40,
  },
  decksHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 10,
  },
  decksSectionTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 15,
    color: '#0F172A',
  },
  decksSectionSub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11.5,
    color: '#64748B',
    marginTop: 1,
  },
  createDeckHeaderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.brand,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radii.pill,
  },
  createDeckHeaderBtnText: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 11,
    color: '#FFFFFF',
  },
  createDeckHeaderBtnDisabled: {
    backgroundColor: '#CBD5E1',
  },
  emptyCustomDecksBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
    padding: 16,
    marginBottom: 24,
  },
  emptyCustomDecksText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12.5,
    color: '#64748B',
    lineHeight: 18,
    textAlign: 'center',
  },
  deckFiltersScroll: {
    paddingVertical: 4,
    gap: 6,
    marginBottom: 12,
  },
  deckFilterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radii.pill,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  deckFilterChipActive: {
    backgroundColor: '#EEF2FF',
    borderColor: colors.brand,
  },
  deckFilterChipText: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 11.5,
    color: '#64748B',
  },
  deckFilterChipTextActive: {
    color: colors.brand,
    fontWeight: 'bold',
  },
  decksGrid: {
    gap: 12,
  },
  deckBentoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1.5,
  },
  deckCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  deckEmojiBadge: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deckEmojiBig: {
    fontSize: 24,
  },
  deckCardTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 15,
    color: '#0F172A',
  },
  deckCardSub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11.5,
    color: '#64748B',
    marginTop: 2,
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
  deckDeleteBtn: {
    padding: 6,
    marginLeft: 6,
  },
  deckCardProgressArea: {
    marginVertical: 12,
  },
  deckProgressLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  deckWordCountText: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 11,
    color: '#475569',
  },
  deckPercentText: {
    fontFamily: fonts.mono,
    fontSize: 10.5,
    color: '#64748B',
  },
  deckBarTrack: {
    height: 6,
    backgroundColor: '#F1F5F9',
    borderRadius: 3,
    overflow: 'hidden',
  },
  deckBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  deckStartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 12,
  },
  deckStartBtnText: {
    fontFamily: fonts.headingBold,
    fontSize: 13,
    color: '#FFFFFF',
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
  tabExplainerText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11.5,
    color: '#64748B',
    marginBottom: spacing.sm,
    textAlign: 'center',
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
    borderRadius: radii.xl,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1.5,
    borderColor: '#E0E7FF',
  },
  chestIcon: {
    width: 44,
    height: 44,
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
    paddingVertical: 2,
    minHeight: 280,
  },
  gradeContainer: {
    marginTop: 6,
    paddingTop: 2,
  },
  gradeRow: {
    flexDirection: 'row',
    gap: 8,
  },
  gradeButton: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
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

  /* Library Quick Link Banner */
  libraryQuickLinkBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: radii.lg,
    padding: 12,
    marginBottom: spacing.sm,
    borderWidth: 1.5,
    borderColor: '#E0E7FF',
  },
  libraryQuickLinkLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  libraryQuickLinkIconBox: {
    width: 32,
    height: 32,
    borderRadius: radii.pill,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  libraryQuickLinkTextCol: {
    flex: 1,
  },
  libraryQuickLinkTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 13,
    color: colors.textHeading,
  },
  libraryQuickLinkSub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10.5,
    color: colors.textMuted,
    marginTop: 1,
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
    paddingBottom: 40,
  },
});
