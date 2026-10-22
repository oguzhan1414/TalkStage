import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { BackHandler, FlatList, Image, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { MivoTip } from '../components/MivoTip';
import { LinearGradient } from 'expo-linear-gradient';

import { minimalFeatureIcons, stateImages } from '../assets/images';
import { AppHeader } from '../components/AppHeader';
import { BouncyPressable } from '../components/BouncyPressable';
import { Button } from '../components/Button';

import { useMivoTransition } from '../components/MivoTransitionOverlay';
import { SwipeableVocabCard } from '../components/SwipeableVocabCard';
import { ScreenHeader } from '../components/ScreenHeader';
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

/** home = panel, practice = full-screen flashcard session, collection = "Sandığım" (saved words). */
type VocabMode = 'home' | 'practice' | 'collection';

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

  // The tab is a small dashboard; the flashcard session and the saved-words list open full screen (tab bar hidden).
  const [mode, setMode] = useState<VocabMode>('home');
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
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

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
    prefetchPronunciation(queue[0]?.term);
    prefetchPronunciation(queue[1]?.term);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextTermsKey]);

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

  // ---- Mode plumbing: hide the floating tab bar outside the dashboard, Android back returns to it ----
  useLayoutEffect(() => {
    navigation.setOptions({ tabBarStyle: mode === 'home' ? undefined : { display: 'none' } });
  }, [mode, navigation]);

  useFocusEffect(
    useCallback(() => {
      const sub = BackHandler.addEventListener('hardwareBackPress', () => {
        if (mode !== 'home') {
          setMode('home');
          return true;
        }
        return false;
      });
      return () => {
        sub.remove();
      };
    }, [mode])
  );

  // Leaving the tab always puts it back on the dashboard.
  useFocusEffect(
    useCallback(() => {
      return () => setMode('home');
    }, [])
  );

  const startPractice = () => {
    setReviewedCount(0);
    setReviewError(null);
    setMode('practice');
  };

  const startFreePractice = () => {
    handleRestartPractice();
    setMode('practice');
  };

  const chestPct = Math.max(6, chestProgress.progressInTier * 100);

  // ---------------------------------------------------------------- Dashboard
  const homeView = (
    <ScrollView contentContainerStyle={styles.homeScroll} showsVerticalScrollIndicator={false}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{t("Kelimeler")}</Text>
        <Pressable onPress={openCreateModal} style={styles.addPill} accessibilityRole="button">
          <Ionicons name="add" size={18} color={colors.brand} />
          <Text style={styles.addPillText}>{t("Kelime Ekle")}</Text>
        </Pressable>
      </View>

      <MivoTip
        tipKey="vocab_home"
        text={t("Derslerde ve sohbetlerde dokunduğun kelimeler buraya gelir, ben de unutmadan tekrar ettiririm 🃏")}
        style={{ marginBottom: 14 }}
      />

      <LinearGradient colors={['#4F46E5', '#7C3AED']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[styles.hero, shadow.card]}>
        <View style={styles.heroBlobA} />
        <View style={styles.heroBlobB} />
        <Image source={stateImages.xpBolt} style={styles.heroArt} resizeMode="contain" />

        {dueLoading && !dueCards ? (
          <View style={{ alignItems: 'center', paddingVertical: 24 }}>
            <MivoLoader size={90} />
          </View>
        ) : (
          <View style={styles.heroText}>
            <View style={styles.heroChip}>
              <Ionicons name="flash" size={12} color="#FDE68A" />
              <Text style={styles.heroChipText}>{t("BUGÜNKÜ TEKRAR")}</Text>
            </View>
            {dueCount > 0 ? (
              <>
                <Text style={styles.heroTitle}>{t("{{count}} kelime seni bekliyor", { count: dueCount })}</Text>
                <Pressable onPress={startPractice} style={({ pressed }) => [styles.heroBtn, pressed && styles.heroBtnPressed]} accessibilityRole="button">
                  <Text style={styles.heroBtnText}>{t("TEKRARA BAŞLA")}</Text>
                  <Ionicons name="arrow-forward" size={16} color={colors.brand} />
                </Pressable>
              </>
            ) : totalCardsInChest > 0 ? (
              <>
                <Text style={styles.heroTitle}>{t("Bugünlük bitti 🎉")}</Text>
                <Text style={styles.heroSub}>{t("Yeni kelimeler keşfetmek için Kütüphane'ye göz at.")}</Text>
                <Pressable onPress={() => navigation.navigate('VocabLibrary')} style={({ pressed }) => [styles.heroBtn, pressed && styles.heroBtnPressed]} accessibilityRole="button">
                  <Text style={styles.heroBtnText}>{t("Kütüphaneyi aç")}</Text>
                  <Ionicons name="arrow-forward" size={16} color={colors.brand} />
                </Pressable>
                <Pressable onPress={startFreePractice} hitSlop={8} style={styles.heroLink} accessibilityRole="button">
                  <Text style={styles.heroLinkText}>{t("Serbest pratik")}</Text>
                </Pressable>
              </>
            ) : (
              <>
                <Text style={styles.heroTitle}>{t("Sandığın henüz boş")}</Text>
                <Text style={styles.heroSub}>{t("Kütüphaneden kelime ekle ya da kendi kelimeni yaz.")}</Text>
                <Pressable onPress={() => navigation.navigate('VocabLibrary')} style={({ pressed }) => [styles.heroBtn, pressed && styles.heroBtnPressed]} accessibilityRole="button">
                  <Text style={styles.heroBtnText}>{t("Kütüphaneyi aç")}</Text>
                  <Ionicons name="arrow-forward" size={16} color={colors.brand} />
                </Pressable>
              </>
            )}
          </View>
        )}
      </LinearGradient>

      <Pressable onPress={() => setMode('collection')} style={({ pressed }) => [styles.chestCard, shadow.card, pressed && { opacity: 0.94 }]} accessibilityRole="button">
        <Image source={stateImages.emptyChest} style={styles.chestArt} resizeMode="contain" />
        <View style={{ flex: 1 }}>
          <Text style={styles.chestTitle}>{t("Sandığım")}</Text>
          <Text style={styles.chestCount}>{t("{{count}} kelime", { count: totalCardsInChest })}</Text>
          <View style={styles.chestTrack}>
            <View style={[styles.chestFill, { width: `${chestPct}%` }]} />
          </View>
          <Text style={styles.chestNext}>{t("Sonraki hedef: {{count}} kelime", { count: chestProgress.nextMilestone })}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#CBD5E1" />
      </Pressable>

      <View style={styles.tileRow}>
        <Pressable onPress={() => navigation.navigate('VocabLibrary')} style={({ pressed }) => [styles.tileWrap, shadow.card, pressed && { opacity: 0.94 }]} accessibilityRole="button">
          <LinearGradient colors={['#E0E7FF', '#FFFFFF']} start={{ x: 0, y: 0 }} end={{ x: 0.6, y: 1 }} style={styles.tile}>
            <Image source={minimalFeatureIcons.vocabLibrary} style={styles.tileArt} resizeMode="contain" />
            <View style={{ flex: 1 }} />
            <Text style={styles.tileTitle}>{t("Kütüphane")}</Text>
            <Text style={styles.tileSub} numberOfLines={2}>{t("Seviyene göre hazır listeler")}</Text>
          </LinearGradient>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('VocabDecks')} style={({ pressed }) => [styles.tileWrap, shadow.card, pressed && { opacity: 0.94 }]} accessibilityRole="button">
          <LinearGradient colors={['#DBEAFE', '#FFFFFF']} start={{ x: 0, y: 0 }} end={{ x: 0.6, y: 1 }} style={styles.tile}>
            <Image source={minimalFeatureIcons.vocabFolders} style={styles.tileArt} resizeMode="contain" />
            <View style={{ flex: 1 }} />
            <Text style={styles.tileTitle}>{t("Klasörler")}</Text>
            <Text style={styles.tileSub} numberOfLines={2}>
              {customDecks.length > 0 ? t("{{count}} liste", { count: customDecks.length }) : t("Kendi listeni kur")}
            </Text>
          </LinearGradient>
        </Pressable>
      </View>
    </ScrollView>
  );

  // ---------------------------------------------------------------- Flashcard session (full screen)
  const practiceView = (
    <View style={styles.practiceRoot}>
      <View style={styles.practiceTop}>
        <Pressable onPress={() => setMode('home')} style={styles.practiceClose} hitSlop={10} accessibilityRole="button" accessibilityLabel={t("Kapat")}>
          <Ionicons name="close" size={22} color={colors.textHeading} />
        </Pressable>
        <View style={{ flex: 1 }}>
          <View style={styles.sessionTrack}>
            <View style={[styles.sessionFill, { width: `${Math.max(5, sessionPct)}%` }]} />
          </View>
        </View>
        <Text style={styles.practiceCount}>
          {reviewedCount}/{sessionTotal}
        </Text>
        {currentCard ? (
          <Pressable onPress={() => setActionCard(currentCard)} hitSlop={10} style={styles.cardMenuDotsButton} accessibilityRole="button">
            <Ionicons name="ellipsis-horizontal" size={20} color={colors.textMuted} />
          </Pressable>
        ) : null}
      </View>

      {currentCard ? (
        <ScrollView contentContainerStyle={styles.practiceScrollContent} showsVerticalScrollIndicator={false}>
          {isRelearning ? (
            <View style={styles.relearnPill}>
              <Ionicons name="repeat" size={13} color="#B45309" />
              <Text style={styles.relearnPillText}>{t("Tekrar turu")}</Text>
            </View>
          ) : null}

          <View style={styles.cardArea}>
            <SwipeableVocabCard key={currentCard.id} card={currentCard} onGrade={handleGrade} onPronounce={handlePronounce} pronouncing={isPlaying} />
          </View>

          {reviewError ? <Text style={styles.errorText}>{reviewError}</Text> : null}

          <View style={styles.gradeContainer}>
            <View style={styles.gradeRow}>
              {GRADE_BUTTONS.map(({ grade, label, iconName, color, bgColor, borderColor }) => {
                const sub =
                  grade === 'again'
                    ? t("Birazdan")
                    : isRelearning
                      ? formatIntervalLabel(1)
                      : gradeForecastDays
                        ? formatIntervalLabel(gradeForecastDays[grade])
                        : '';
                return (
                  <Pressable
                    key={grade}
                    style={({ pressed }) => [styles.gradeButton, { borderColor, backgroundColor: bgColor }, pressed && styles.gradeButtonPressed]}
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
        </ScrollView>
      ) : (
        <View style={styles.practiceDone}>
          <Image source={stateImages.goalCelebration} style={styles.emptyImage} resizeMode="contain" />
          <Text style={styles.emptyTitle}>
            {reviewedCount === 1
              ? t("1 Kelime Gözden Geçirildi ✨")
              : reviewedCount > 1
                ? t("Günlük Tekrar Tamamlandı 🎉")
                : t("Bugün İçin Planlı Kart Yok ✅")}
          </Text>
          {reviewedCount > 0 ? (
            <Text style={styles.emptySub}>
              {t("{{reviewedCount}} kelimeyi başarıyla hafızana aldın. SM-2 aralıklı tekrar algoritmasıyla kalıcı hafızan güçleniyor!", { reviewedCount })}
            </Text>
          ) : null}
          <Button label={t("Bitir")} onPress={() => setMode('home')} style={styles.emptyButton} />
        </View>
      )}
    </View>
  );

  // ---------------------------------------------------------------- "Sandığım" (saved words, full screen)
  const collectionView = (
    <View style={styles.collectionRoot}>
      <ScreenHeader
        title={t("Sandığım")}
        subtitle={t("{{count}} kelime", { count: totalCardsInChest })}
        icon={stateImages.emptyChest}
        onBack={() => setMode('home')}
        right={
          <Pressable onPress={openCreateModal} style={styles.addCircle} accessibilityRole="button" accessibilityLabel={t("Kelime Ekle")}>
            <Ionicons name="add" size={22} color="#FFFFFF" />
          </Pressable>
        }
      />
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
                      <View style={[styles.dictStrip, { backgroundColor: posItem ? posItem.color : colors.brand }]} />
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
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {mode === 'home' ? <AppHeader /> : null}
      {mode === 'home' ? homeView : mode === 'practice' ? practiceView : collectionView}

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
            <View style={styles.modalGrab} />
            <View style={styles.modalHeaderRow}>
              <Image source={editingCardId ? stateImages.editPencil : minimalFeatureIcons.vocabLibrary} style={styles.modalIcon} resizeMode="contain" />
              <View style={{ flex: 1 }}>
                <Text style={styles.modalTitle}>{editingCardId ? t("Kelimeyi Düzenle") : t("Yeni Kelime Ekle")}</Text>
                <Text style={styles.modalSub}>
                  {editingCardId
                    ? t("Kelimenin seviye, tür ve anlamını güncelle")
                    : t("Tür ve seviye belirleyerek sandığına kaydet")}
                </Text>
              </View>
              <Pressable onPress={() => setModalVisible(false)} hitSlop={12} style={styles.closeModalButton}>
                <Ionicons name="close" size={20} color={colors.textMuted} />
              </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
              <View style={[styles.previewWord, { borderLeftColor: POS_OPTIONS.find((p) => p.id === formPos)?.color ?? colors.brand }]}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.previewWordTerm} numberOfLines={1}>{formTerm.trim() || t("Kelime…")}</Text>
                  <Text style={styles.previewWordTr} numberOfLines={1}>{formTranslation.trim() || t("Anlam…")}</Text>
                </View>
                <View style={styles.previewWordLevel}>
                  <Text style={styles.previewWordLevelText}>{formLevel}</Text>
                </View>
              </View>

              {/* 1. English Word */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>{t("İNGİLİZCE KELİME VEYA DEYİM *")}</Text>
                <TextInput
                  style={[styles.textInput, focusedInput === 'term' && styles.textInputFocused]}
                  onFocus={() => setFocusedInput('term')}
                  onBlur={() => setFocusedInput(null)}
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
                  style={[styles.textInput, focusedInput === 'meaning' && styles.textInputFocused]}
                  onFocus={() => setFocusedInput('meaning')}
                  onBlur={() => setFocusedInput(null)}
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
                  style={[styles.textInput, styles.textArea, focusedInput === 'example' && styles.textInputFocused]}
                  onFocus={() => setFocusedInput('example')}
                  onBlur={() => setFocusedInput(null)}
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
                <Pressable
                  onPress={handleSaveWord}
                  disabled={isSaving}
                  style={({ pressed }) => [styles.saveBtn, isSaving && { opacity: 0.6 }, pressed && styles.saveBtnPressed]}
                  accessibilityRole="button"
                >
                  <Ionicons name={editingCardId ? 'checkmark-circle' : 'archive'} size={19} color="#FFFFFF" />
                  <Text style={styles.saveBtnText}>
                    {isSaving ? t("Kaydediliyor...") : editingCardId ? t("Güncelle") : t("Sandığıma Kaydet")}
                  </Text>
                </Pressable>
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
  saveBtnText: { fontFamily: fonts.headingBold, fontSize: 15, color: '#FFFFFF', letterSpacing: 0.3 },
  saveBtnPressed: { transform: [{ translateY: 2 }], borderBottomWidth: 2 },
  saveBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: colors.brand, borderRadius: radii.pill, paddingVertical: 15, borderBottomWidth: 4, borderBottomColor: '#3730A3' },
  textInputFocused: { borderColor: colors.brand, backgroundColor: '#FFFFFF' },
  previewWordLevelText: { fontFamily: fonts.mono, fontSize: 11, fontWeight: 'bold', color: '#FFFFFF' },
  previewWordLevel: { backgroundColor: colors.brand, paddingHorizontal: 9, paddingVertical: 4, borderRadius: 9 },
  previewWordTr: { fontFamily: fonts.bodyMedium, fontSize: 13.5, color: colors.textMuted, marginTop: 1 },
  previewWordTerm: { fontFamily: fonts.headingBold, fontSize: 18, color: colors.textHeading },
  previewWord: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#F8FAFC', borderRadius: 18, borderLeftWidth: 6, paddingVertical: 12, paddingHorizontal: 14, marginBottom: 16, borderWidth: 1, borderColor: '#EEF2FF' },
  modalIcon: { width: 52, height: 52 },
  modalGrab: { alignSelf: 'center', width: 44, height: 5, borderRadius: 3, backgroundColor: '#E2E8F0', marginBottom: 12 },
  dictStrip: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 6 },
  relearnPillText: { fontFamily: fonts.headingBold, fontSize: 11.5, color: '#B45309' },
  relearnPill: { alignSelf: 'center', flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: '#FEF3C7', borderRadius: radii.pill, paddingHorizontal: 12, paddingVertical: 5, marginBottom: 8 },
  practiceCount: { fontFamily: fonts.headingBold, fontSize: 13, color: colors.textMuted, minWidth: 40, textAlign: 'right' },
  tileArt: { width: 92, height: 92, alignSelf: 'flex-end', marginRight: -4, marginTop: -4 },
  tileWrap: { flex: 1, borderRadius: 24, backgroundColor: '#FFFFFF' },
  chestNext: { fontFamily: fonts.bodyRegular, fontSize: 11.5, color: colors.textMuted, marginTop: 5 },
  chestFill: { height: '100%', borderRadius: 4, backgroundColor: '#F59E0B' },
  chestTrack: { height: 8, borderRadius: 4, backgroundColor: '#FEF3C7', overflow: 'hidden', marginTop: 10 },
  chestCount: { fontFamily: fonts.headingSemiBold, fontSize: 13, color: colors.textMuted, marginTop: 1 },
  chestTitle: { fontFamily: fonts.headingBold, fontSize: 17, color: colors.textHeading },
  chestArt: { width: 84, height: 84 },
  chestCard: { flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: '#FFFFFF', borderRadius: 24, padding: 14, borderWidth: 1, borderColor: '#F1F5F9' },
  heroBtnPressed: { transform: [{ translateY: 2 }], borderBottomWidth: 2 },
  heroChipText: { fontFamily: fonts.headingBold, fontSize: 10.5, letterSpacing: 0.8, color: '#E0E7FF' },
  heroChip: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: 'rgba(255,255,255,0.16)', borderRadius: radii.pill, paddingHorizontal: 10, paddingVertical: 5 },
  heroText: { paddingRight: 70, gap: 10 },
  heroArt: { position: 'absolute', right: -6, top: 6, width: 118, height: 118 },
  heroBlobB: { position: 'absolute', width: 120, height: 120, borderRadius: 60, backgroundColor: 'rgba(255,255,255,0.06)', left: -30, bottom: -40 },
  heroBlobA: { position: 'absolute', width: 190, height: 190, borderRadius: 95, backgroundColor: 'rgba(255,255,255,0.08)', right: -50, top: -60 },
  addPillText: { fontFamily: fonts.headingBold, fontSize: 13, color: colors.brand },
  addPill: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#EEF2FF', borderRadius: radii.pill, paddingLeft: 10, paddingRight: 14, paddingVertical: 8 },
  homeScroll: { paddingHorizontal: spacing.md, paddingTop: 4, paddingBottom: 130, gap: 14 },
  addCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.brand, alignItems: 'center', justifyContent: 'center' },
  hero: { borderRadius: 28, padding: 20, overflow: 'hidden', minHeight: 176, justifyContent: 'center' },
  heroTitle: { fontFamily: fonts.headingBold, fontSize: 26, lineHeight: 32, color: '#FFFFFF' },
  heroSub: { fontFamily: fonts.bodyRegular, fontSize: 13.5, lineHeight: 20, color: '#E0E7FF' },
  heroBtn: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#FFFFFF', borderRadius: radii.pill, paddingVertical: 13, paddingHorizontal: 22, borderBottomWidth: 4, borderBottomColor: '#C7D2FE', marginTop: 2 },
  heroBtnText: { fontFamily: fonts.headingBold, fontSize: 14.5, letterSpacing: 0.4, color: colors.brand },
  heroLink: { alignSelf: 'flex-start', paddingVertical: 2 },
  heroLinkText: { fontFamily: fonts.headingSemiBold, fontSize: 13, color: '#E0E7FF', textDecorationLine: 'underline' },
  tileRow: { flexDirection: 'row', gap: 12 },
  tile: { minHeight: 168, borderRadius: 24, padding: 16, borderWidth: 1, borderColor: '#EEF2FF' },
  tileTitle: { fontFamily: fonts.headingBold, fontSize: 16.5, color: colors.textHeading },
  tileSub: { fontFamily: fonts.bodyRegular, fontSize: 12, lineHeight: 17, color: colors.textMuted, marginTop: 2 },
  practiceRoot: { flex: 1, backgroundColor: '#F8FAFC' },
  practiceTop: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: spacing.md, paddingTop: 8, paddingBottom: 10 },
  practiceClose: { width: 38, height: 38, borderRadius: 19, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#E2E8F0' },
  practiceDone: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: spacing.lg, gap: 10 },
  collectionRoot: { flex: 1 },
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
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
  cardMenuDotsButton: {
    padding: 4,
  },
  cardArea: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 6, minHeight: 340 },
  gradeContainer: { marginTop: 14 },
  gradeRow: { flexDirection: 'row', gap: 10 },
  gradeButton: { flex: 1, borderRadius: 20, paddingVertical: 12, paddingHorizontal: 4, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderBottomWidth: 5, minHeight: 70 },
  gradeButtonHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  gradeButtonLabel: { fontFamily: fonts.headingBold, fontSize: 15 },
  gradeButtonSub: { fontFamily: fonts.bodyMedium, fontSize: 11, marginTop: 3, opacity: 0.9 },
  errorText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.error,
    textAlign: 'center',
    marginTop: 4,
  },
  emptyImage: { width: 160, height: 160, marginBottom: 6 },
  emptyTitle: { fontFamily: fonts.headingBold, fontSize: 21, lineHeight: 27, color: colors.textHeading, textAlign: 'center' },
  emptySub: { fontFamily: fonts.bodyRegular, fontSize: 13.5, color: colors.textBody, textAlign: 'center', lineHeight: 20, marginBottom: spacing.md },
  emptyButton: {
    width: '100%',
  },
  dictionaryContainer: { flex: 1, paddingHorizontal: spacing.md },
  searchBarBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 18, paddingHorizontal: 14, paddingVertical: 11, borderWidth: 1, borderColor: '#E2E8F0', gap: 8 },
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
  dictionaryList: { gap: 10, paddingBottom: 30, marginTop: 4 },
  dictWordCard: { backgroundColor: '#FFFFFF', borderRadius: 20, paddingVertical: 14, paddingRight: 14, paddingLeft: 20, gap: 8, borderWidth: 1, borderColor: '#F1F5F9', overflow: 'hidden' },
  dictBadgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dictLevelPill: { backgroundColor: colors.brand, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  dictLevelPillText: {
    fontFamily: fonts.mono,
    fontSize: 9,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  dictPosPill: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  dictPosPillText: {
    fontFamily: fonts.headingBold,
    fontSize: 9,
    textTransform: 'uppercase',
  },
  dictSoundButton: { backgroundColor: '#EEF2FF', width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  dictTerm: { fontFamily: fonts.headingBold, fontSize: 18, color: colors.textHeading },
  dictTranslation: { fontFamily: fonts.bodyMedium, fontSize: 13.5, color: colors.textBody, marginTop: 1 },
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'flex-end',
  },
  modalCard: { backgroundColor: '#FFFFFF', borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingHorizontal: spacing.lg, paddingTop: 10, maxHeight: '92%' },
  modalHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 14 },
  modalTitle: { fontFamily: fonts.headingBold, fontSize: 20, color: colors.textHeading },
  modalSub: { fontFamily: fonts.bodyRegular, fontSize: 12.5, color: colors.textMuted, marginTop: 1 },
  closeModalButton: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#F1F5F9', alignItems: 'center', justifyContent: 'center' },
  inputGroup: {
    marginBottom: spacing.md,
  },
  inputLabel: { fontFamily: fonts.headingBold, fontSize: 11, color: '#475569', marginBottom: 7, letterSpacing: 0.6 },
  levelSelectorRow: {
    flexDirection: 'row',
    gap: 6,
  },
  levelSelectPill: { flex: 1, paddingVertical: 10, alignItems: 'center', backgroundColor: '#F8FAFC', borderRadius: 14, borderWidth: 2, borderColor: '#E2E8F0' },
  levelSelectPillActive: {
    backgroundColor: colors.brand,
    borderColor: colors.brand,
  },
  levelSelectText: { fontFamily: fonts.headingBold, fontSize: 12.5, color: colors.textHeading },
  levelSelectTextActive: {
    color: '#FFFFFF',
  },
  posSelectorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  posSelectPill: { paddingHorizontal: 14, paddingVertical: 9, backgroundColor: '#F8FAFC', borderRadius: radii.pill, borderWidth: 2, borderColor: '#E2E8F0' },
  posSelectText: { fontFamily: fonts.headingBold, fontSize: 12, color: colors.textHeading },
  posSelectTextActive: {
    color: '#FFFFFF',
  },
  textInput: { backgroundColor: '#F8FAFC', borderWidth: 2, borderColor: '#E2E8F0', borderRadius: 16, paddingHorizontal: 14, paddingVertical: 12, fontFamily: fonts.bodyRegular, fontSize: 14.5, color: colors.textHeading },
  textArea: { height: 78, textAlignVertical: 'top' },
  modalActionsRow: { marginTop: spacing.xs, marginBottom: spacing.lg },
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
  deckSelectScroll: {
    paddingVertical: 4,
    gap: 8,
  },
  deckSelectChip: { paddingHorizontal: 14, paddingVertical: 9, borderRadius: radii.pill, backgroundColor: '#F8FAFC', borderWidth: 2, borderColor: '#E2E8F0' },
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
  practiceScrollContent: { flexGrow: 1, paddingHorizontal: spacing.md, paddingBottom: 16 },
  sessionTrack: { height: 14, borderRadius: 7, backgroundColor: '#E2E8F0', overflow: 'hidden' },
  sessionFill: { height: '100%', borderRadius: 7, backgroundColor: '#10B981' },
  gradeButtonPressed: {
    transform: [{ translateY: 2 }],
    borderBottomWidth: 2,
  },
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
