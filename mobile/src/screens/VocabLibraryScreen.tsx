import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Image, FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { Toast } from '../components/Toast';
import { vocabArt } from '../assets/images';
import { VP } from '../theme/vocabPalette';
import { ScreenHeader } from '../components/ScreenHeader';
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
} from '@talkstage/shared-data/vocabLibrary';
import { usePronunciation } from '../hooks/usePronunciation';
import { api, ApiError } from '../lib/api';
import type { VocabLibraryScreenProps } from '../navigation/types';
import { colors, fonts, radii, shadow, spacing } from '../theme/tokens';
import type { VocabCardCreate, VocabCardOut, VocabLibraryProgressCreate } from '../types/api';
import { MivoLoader } from '../components/MivoLoader';
import { t, nativeFlag } from '../i18n';

type LibraryCategory = 'nouns' | 'verbs' | 'adjectives';

const PACKS: Record<
  LibraryCategory,
  {
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
    color: string;
    soft: string;
    /** The category's illustrated cover. */
    cover: number;
    sets: { id: string; range: string; words: LibraryWordEntry[] }[];
  }
> = {
  nouns: {
    label: t("İsimler"),
    icon: 'cube-outline',
    color: VP.mintDeep,
    soft: VP.mintSoft,
    cover: vocabArt.coverNouns,
    sets: [
      { id: 'nouns_1', range: '1–100', words: NOUNS_100 },
      { id: 'nouns_2', range: '101–200', words: NOUNS_200 },
      { id: 'nouns_3', range: '201–300', words: NOUNS_300 },
    ],
  },
  verbs: {
    label: t("Fiiller"),
    icon: 'walk-outline',
    color: VP.coralDeep,
    soft: VP.coralSoft,
    cover: vocabArt.coverVerbs,
    sets: [
      { id: 'verbs_1', range: '1–100', words: VERBS_100 },
      { id: 'verbs_2', range: '101–200', words: VERBS_200 },
      { id: 'verbs_3', range: '201–300', words: VERBS_300 },
    ],
  },
  adjectives: {
    label: t("Sıfatlar"),
    icon: 'color-palette-outline',
    color: VP.sunDeep,
    soft: VP.sunSoft,
    cover: vocabArt.coverAdjectives,
    sets: [
      { id: 'adjectives_1', range: '1–100', words: ADJECTIVES_100 },
      { id: 'adjectives_2', range: '101–200', words: ADJECTIVES_200 },
      { id: 'adjectives_3', range: '201–300', words: ADJECTIVES_300 },
    ],
  },
};

const CATEGORIES = Object.keys(PACKS) as LibraryCategory[];
const SEARCH_LIMIT = 60;

/** Every library word with its place in the library (for global search and the "source" label of saved cards). */
const ALL_WORDS: { entry: LibraryWordEntry; category: LibraryCategory; packIndex: number }[] = CATEGORIES.flatMap((category) =>
  PACKS[category].sets.flatMap((set, packIndex) => set.words.map((entry) => ({ entry, category, packIndex })))
);
const TOTAL_WORDS = ALL_WORDS.length;
const META_BY_ID = new Map(ALL_WORDS.map((w) => [w.entry.id, w]));

const POS_LABEL: Record<LibraryWordEntry['partOfSpeech'], string> = {
  noun: t("İsim"),
  verb: t("Fiil"),
  adjective: t("Sıfat"),
  adverb: t("Zarf"),
};

type FormRowData = { label: string; form: string; sub?: string };

/** The grammar forms worth showing for a word, in reading order. */
function detailRows(item: LibraryWordEntry): FormRowData[] {
  const rows: FormRowData[] = [];
  const add = (label: string, d?: { form: string; translation?: string }) => {
    if (d?.form) rows.push({ label, form: d.form, sub: d.translation });
  };
  if (item.partOfSpeech === 'adjective') {
    add(t("Karşılaştırma:"), item.comparative);
    add(t("Üstünlük:"), item.superlative);
    if (item.antonym) rows.push({ label: t("Zıt Anlam:"), form: item.antonym.word, sub: item.antonym.translation });
  } else if (item.partOfSpeech === 'noun') {
    add(t("Tekil:"), item.singular);
    add(t("Çoğul:"), item.plural ?? item.partitiveUnit);
    add(t("İyelik / Tamlama:"), item.possessivePhrase);
  } else if (item.partOfSpeech === 'verb') {
    add(t("Geniş Zaman:"), item.presentSimple);
    add(t("Şimdiki Zaman:"), item.presentContinuous);
    add(t("Gelecek Zaman:"), item.future);
    add(t("Geçmiş Zaman:"), item.pastSimple);
  }
  return rows;
}

type WordCardProps = {
  item: LibraryWordEntry;
  tag?: string;
  accent: string;
  saved: boolean;
  /** When the saved word comes up in the review ("in 3 days"), or null when it is already due today. */
  dueLabel: string | null;
  known: boolean;
  expanded: boolean;
  onToggle: (id: string) => void;
  onSpeak: (word: string) => void;
  onAdd: (item: LibraryWordEntry) => void;
  onKnown: (item: LibraryWordEntry) => void;
  onUndo: (item: LibraryWordEntry) => void;
  onReviewNow: (item: LibraryWordEntry) => void;
};

const WordCard = memo(function WordCard({
  item,
  tag,
  accent,
  saved,
  dueLabel,
  known,
  expanded,
  onToggle,
  onSpeak,
  onAdd,
  onKnown,
  onUndo,
  onReviewNow,
}: WordCardProps) {
  const rows = useMemo(() => detailRows(item), [item]);
  const hasDetails = rows.length > 0 || !!item.grammarNote || (!!item.exampleTr && item.exampleTr !== item.exampleEn);

  return (
    <View style={[styles.wordCard, shadow.card, (saved || known) && styles.wordCardDone]}>
      <View style={[styles.cardAccent, { backgroundColor: accent }]} />
      <View style={styles.cardBody}>
        <View style={styles.cardTop}>
          <View style={{ flex: 1 }}>
            <View style={styles.wordLine}>
              <Text style={styles.wordTerm}>{item.word}</Text>
              {item.respelling ? <Text style={styles.wordRespelling}>{item.respelling}</Text> : null}
            </View>
            <Text style={styles.meaningText}>
              {nativeFlag()} {item.translation}
            </Text>
          </View>
          <Pressable
            onPress={() => onSpeak(item.word)}
            hitSlop={10}
            style={styles.soundBtn}
            accessibilityRole="button"
            accessibilityLabel={t("Telaffuzu dinle")}
          >
            <Ionicons name="volume-high" size={18} color={VP.ink} />
          </Pressable>
        </View>

        <View style={styles.tagRow}>
          <View style={[styles.tag, { backgroundColor: `${accent}1A` }]}>
            <Text style={[styles.tagText, { color: accent }]}>{POS_LABEL[item.partOfSpeech]}</Text>
          </View>
          <View style={styles.tagNeutral}>
            <Text style={styles.tagNeutralText}>#{item.rank}</Text>
          </View>
          {tag ? (
            <View style={styles.tagNeutral}>
              <Text style={styles.tagNeutralText}>{tag}</Text>
            </View>
          ) : null}
        </View>

        {item.exampleEn ? (
          <Text style={styles.exampleEn} numberOfLines={expanded ? undefined : 2}>
            &ldquo;{item.exampleEn}&rdquo;
          </Text>
        ) : null}

        {expanded && hasDetails ? (
          <View style={styles.details}>
            {item.exampleTr && item.exampleTr !== item.exampleEn ? <Text style={styles.exampleTr}>{item.exampleTr}</Text> : null}
            {item.grammarNote ? (
              <View style={styles.noteRow}>
                <Ionicons name="sparkles" size={12} color={VP.ink} />
                <Text style={styles.noteText}>{item.grammarNote}</Text>
              </View>
            ) : null}
            {rows.length > 0 ? (
              <View style={styles.formGrid}>
                {rows.map((r) => (
                  <View key={r.label} style={styles.formCell}>
                    <Text style={styles.formLabel}>{r.label}</Text>
                    <Text style={styles.formValue}>{r.form}</Text>
                    {r.sub ? <Text style={styles.formSub}>{r.sub}</Text> : null}
                  </View>
                ))}
              </View>
            ) : null}
          </View>
        ) : null}

        {hasDetails ? (
          <Pressable onPress={() => onToggle(item.id)} hitSlop={8} style={styles.moreBtn} accessibilityRole="button">
            <Text style={styles.moreBtnText}>{expanded ? t("Daha az") : t("Detaylar")}</Text>
            <Ionicons name={expanded ? 'chevron-up' : 'chevron-down'} size={14} color={VP.ink} />
          </Pressable>
        ) : null}

        <View style={styles.actionsRow}>
          {saved ? (
            <View style={styles.knownRow}>
              <View style={styles.statusPill}>
                <Ionicons name="checkmark-circle" size={16} color={colors.success} />
                <Text style={styles.statusPillText}>{dueLabel ? t("Sandığında · {{when}}", { when: dueLabel }) : t("Sandığında · bugün sorulacak")}</Text>
              </View>
              {dueLabel ? (
                <Pressable onPress={() => onReviewNow(item)} hitSlop={8} accessibilityRole="button">
                  <Text style={styles.undoText}>{t("Bugün çalış")}</Text>
                </Pressable>
              ) : null}
            </View>
          ) : known ? (
            <View style={styles.knownRow}>
              <View style={styles.statusPillMuted}>
                <Ionicons name="eye-off-outline" size={15} color={colors.textMuted} />
                <Text style={styles.statusPillMutedText}>{t("Biliniyor, Atlandı")}</Text>
              </View>
              <Pressable onPress={() => onUndo(item)} hitSlop={8}>
                <Text style={styles.undoText}>{t("Geri Al")}</Text>
              </Pressable>
            </View>
          ) : (
            <>
              <Pressable
                onPress={() => onKnown(item)}
                style={({ pressed }) => [styles.knownBtn, pressed && styles.pressed]}
                accessibilityRole="button"
              >
                <Ionicons name="checkmark-outline" size={16} color={colors.textMuted} />
                <Text style={styles.knownBtnText}>{t("Biliyorum, Atla")}</Text>
              </Pressable>
              <Pressable
                onPress={() => onAdd(item)}
                style={({ pressed }) => [styles.addBtn, pressed && styles.pressed]}
                accessibilityRole="button"
              >
                <Ionicons name="add-circle" size={16} color="#FFFFFF" />
                <Text style={styles.addBtnText}>{t("Sandığıma Ekle")}</Text>
              </Pressable>
            </>
          )}
        </View>
      </View>
    </View>
  );
});

/** Words per small pack: a sitting's worth, so the library is a row of short steps instead of one long list. */
const CHUNK = 20;

type SmallPack = { id: string; category: LibraryCategory; index: number; range: string; words: LibraryWordEntry[] };

/** Each category's 300 words as packs of 20, in frequency order. */
const SMALL_PACKS: Record<LibraryCategory, SmallPack[]> = Object.fromEntries(
  CATEGORIES.map((cat) => {
    const words = PACKS[cat].sets.flatMap((s) => s.words);
    const packs: SmallPack[] = [];
    for (let i = 0; i < words.length; i += CHUNK) {
      packs.push({ id: `${cat}_${i / CHUNK}`, category: cat, index: i / CHUNK, range: `${i + 1}–${Math.min(i + CHUNK, words.length)}`, words: words.slice(i, i + CHUNK) });
    }
    return [cat, packs];
  })
) as Record<LibraryCategory, SmallPack[]>;
const PACK_BY_ID = new Map(CATEGORIES.flatMap((cat) => SMALL_PACKS[cat].map((p) => [p.id, p] as const)));
const TEAL = '#0D9488';

/**
 * "Kütüphane": the 900 core words as packs of 20 per word type. The top offers the next unfinished pack; a pack opens
 * the study room, where the words come one at a time (picture-free card: word, sound, meaning, example, forms) and
 * each is either known or saved to the chest, with tags if wanted. A pack can also be seen as a list (to undo or
 * revisit), and the search looks through the whole library.
 */
export function VocabLibraryScreen({ navigation }: VocabLibraryScreenProps) {
  const queryClient = useQueryClient();
  const { pronounce } = usePronunciation();

  const [category, setCategory] = useState<LibraryCategory>('nouns');
  const [openPackId, setOpenPackId] = useState<string | null>(null);
  const [packMode, setPackMode] = useState<'study' | 'list'>('study');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  /** Words handled in the study room right now, before the server data catches up (no double taps). */
  const [handled, setHandled] = useState<Record<string, 'known' | 'saved'>>({});
  const [lastKnown, setLastKnown] = useState<LibraryWordEntry | null>(null);
  const [studyTags, setStudyTags] = useState<string[]>([]);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(
    () => () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    },
    []
  );

  const showToast = useCallback((msg: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast(msg);
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  }, []);

  // All saved cards (dedup + progress) and the words explicitly marked "Biliyorum".
  const { data: allCards, isLoading } = useQuery({
    queryKey: ['vocab-cards', 'all'],
    queryFn: () => api.get<VocabCardOut[]>('/vocab-cards?all=true'),
  });
  const { data: dismissedWordIds, isLoading: progressLoading } = useQuery({
    queryKey: ['vocab-library-progress'],
    queryFn: () => api.get<string[]>('/vocab-library/progress'),
  });

  const savedTermsLower = useMemo(() => new Set((allCards ?? []).map((c) => c.term.trim().toLowerCase())), [allCards]);
  /** Saved word → its next review day (YYYY-MM-DD). */
  const dueByTerm = useMemo(() => new Map((allCards ?? []).map((c) => [c.term.trim().toLowerCase(), c.next_review_date.slice(0, 10)])), [allCards]);
  const dueLabelOf = useCallback(
    (w: LibraryWordEntry): string | null => {
      const due = dueByTerm.get(w.word.trim().toLowerCase());
      if (!due) return null;
      const today = new Date();
      const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
      if (due <= todayKey) return null;
      const days = Math.round((new Date(`${due}T00:00:00`).getTime() - new Date(`${todayKey}T00:00:00`).getTime()) / 86400000);
      return days === 1 ? t("yarın sorulacak") : t("{{n}} gün sonra sorulacak", { n: days });
    },
    [dueByTerm]
  );
  const dismissedIds = useMemo(() => new Set(dismissedWordIds ?? []), [dismissedWordIds]);
  const loading = isLoading || progressLoading;
  /** The learner's own tags, offered in the study room (most used first). */
  const userTags = useMemo(() => {
    const count = new Map<string, number>();
    (allCards ?? []).forEach((c) => (c.tags ?? []).forEach((tag) => count.set(tag, (count.get(tag) ?? 0) + 1)));
    return [...count.entries()].sort((a, b) => b[1] - a[1]).map(([tag]) => tag).slice(0, 6);
  }, [allCards]);

  const isSaved = useCallback((w: LibraryWordEntry) => savedTermsLower.has(w.word.trim().toLowerCase()), [savedTermsLower]);
  const isKnown = useCallback((w: LibraryWordEntry) => dismissedIds.has(w.id), [dismissedIds]);
  const isReviewed = useCallback((w: LibraryWordEntry) => isSaved(w) || isKnown(w) || !!handled[w.id], [isSaved, isKnown, handled]);

  // Progress per small pack, per category and overall.
  const stats = useMemo(() => {
    const perPack = new Map<string, number>();
    const perCategory = {} as Record<LibraryCategory, { done: number; total: number }>;
    let overall = 0;
    for (const cat of CATEGORIES) {
      let done = 0;
      let total = 0;
      for (const p of SMALL_PACKS[cat]) {
        const d = p.words.filter(isReviewed).length;
        perPack.set(p.id, d);
        done += d;
        total += p.words.length;
      }
      perCategory[cat] = { done, total };
      overall += done;
    }
    return { perPack, perCategory, overall };
  }, [isReviewed]);

  /** The first pack of a category with words still new. */
  const nextPackOf = useCallback(
    (cat: LibraryCategory) => SMALL_PACKS[cat].find((p) => (stats.perPack.get(p.id) ?? 0) < p.words.length) ?? null,
    [stats]
  );
  const nextPack = nextPackOf(category);

  const query = searchQuery.trim().toLowerCase();
  const searching = query.length > 0;
  const searchResults = useMemo(() => {
    if (!searching) return [];
    const out: { entry: LibraryWordEntry; category: LibraryCategory; packIndex: number }[] = [];
    for (const w of ALL_WORDS) {
      const e = w.entry;
      if (e.word.toLowerCase().includes(query) || e.translation.toLowerCase().includes(query) || e.exampleEn.toLowerCase().includes(query)) {
        out.push(w);
        if (out.length >= SEARCH_LIMIT) break;
      }
    }
    return out;
  }, [searching, query]);

  // Already saved but not due yet: bring it into today's review (the word keeps its SM-2 history).
  const handleReviewNow = useCallback(
    async (entry: LibraryWordEntry) => {
      try {
        await api.post<VocabCardOut>('/vocab-cards', { term: entry.word, review_now: true } satisfies VocabCardCreate);
        await queryClient.invalidateQueries({ queryKey: ['vocab-cards'] });
        showToast(t("“{{word}}” bugünkü tekrara eklendi", { word: entry.word }));
      } catch (err) {
        showToast(err instanceof ApiError ? err.message : t("Kelime eklenemedi"));
      }
    },
    [queryClient, showToast]
  );

  const addWord = useCallback(
    async (entry: LibraryWordEntry, tags: string[], quiet: boolean) => {
      if (savedTermsLower.has(entry.word.trim().toLowerCase())) return;
      const meta = META_BY_ID.get(entry.id);
      const source = meta ? `${PACKS[meta.category].label} (${PACKS[meta.category].sets[meta.packIndex].range})` : undefined;
      try {
        await api.post<VocabCardOut>('/vocab-cards', {
          term: entry.word,
          translation: entry.translation,
          example_sentence: entry.exampleEn,
          part_of_speech: entry.partOfSpeech,
          source_label: source,
          ...(tags.length ? { tags } : {}),
        } satisfies VocabCardCreate);
        await queryClient.invalidateQueries({ queryKey: ['vocab-cards'] });
        if (!quiet) showToast(t("“{{word}}” Kelime Sandığına eklendi 📚", { word: entry.word }));
      } catch (err) {
        setHandled(({ [entry.id]: _, ...rest }) => rest);
        showToast(err instanceof ApiError ? err.message : t("Kelime eklenemedi"));
      }
    },
    [queryClient, savedTermsLower, showToast]
  );
  const handleAdd = useCallback((entry: LibraryWordEntry) => addWord(entry, [], false), [addWord]);

  const markKnown = useCallback(
    async (entry: LibraryWordEntry, quiet: boolean) => {
      try {
        await api.post('/vocab-library/progress', { word_id: entry.id } satisfies VocabLibraryProgressCreate);
        await queryClient.invalidateQueries({ queryKey: ['vocab-library-progress'] });
        if (!quiet) showToast(t("“{{word}}” biliniyor olarak işaretlendi ✓", { word: entry.word }));
      } catch (err) {
        setHandled(({ [entry.id]: _, ...rest }) => rest);
        showToast(err instanceof ApiError ? err.message : t("İşaretlenemedi"));
      }
    },
    [queryClient, showToast]
  );
  const handleKnown = useCallback((entry: LibraryWordEntry) => markKnown(entry, false), [markKnown]);

  const handleUndo = useCallback(
    async (entry: LibraryWordEntry) => {
      setHandled(({ [entry.id]: _, ...rest }) => rest);
      try {
        await api.delete(`/vocab-library/progress/${entry.id}`);
        await queryClient.invalidateQueries({ queryKey: ['vocab-library-progress'] });
      } catch (err) {
        showToast(err instanceof ApiError ? err.message : t("Geri alınamadı"));
      }
    },
    [queryClient, showToast]
  );

  const toggleExpanded = useCallback((id: string) => setExpandedId((prev) => (prev === id ? null : id)), []);

  const openPack = (pack: SmallPack, mode: 'study' | 'list' = 'study') => {
    setOpenPackId(pack.id);
    setPackMode(mode);
    setLastKnown(null);
    setShowDetails(false);
    setExpandedId(null);
  };

  const openPackData = openPackId ? PACK_BY_ID.get(openPackId) ?? null : null;
  const studyQueue = openPackData ? openPackData.words.filter((w) => !isReviewed(w)) : [];
  const current = studyQueue[0] ?? null;

  // A new word in the study room: say it once and fold its details.
  useEffect(() => {
    if (!current || packMode !== 'study') return;
    setShowDetails(false);
    const id = setTimeout(() => void pronounce(current.word), 250);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current?.id, packMode]);

  const studyKnown = () => {
    if (!current) return;
    setHandled((h) => ({ ...h, [current.id]: 'known' }));
    setLastKnown(current);
    void markKnown(current, true);
  };
  const studySave = () => {
    if (!current) return;
    setHandled((h) => ({ ...h, [current.id]: 'saved' }));
    setLastKnown(null);
    void addWord(current, studyTags, true);
  };

  const overallPct = Math.round((stats.overall / TOTAL_WORDS) * 100);
  const sessionSaved = openPackData ? openPackData.words.filter((w) => handled[w.id] === 'saved').length : 0;
  const sessionKnown = openPackData ? openPackData.words.filter((w) => handled[w.id] === 'known').length : 0;

  // ---------------------------------------------------------------- A pack: the study room or its list
  if (openPackData) {
    const c = PACKS[openPackData.category];
    const done = stats.perPack.get(openPackData.id) ?? 0;
    const total = openPackData.words.length;
    const following = SMALL_PACKS[openPackData.category][openPackData.index + 1] ?? null;
    const rows = current ? detailRows(current) : [];
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.roomBar}>
          <Pressable onPress={() => setOpenPackId(null)} hitSlop={10} style={styles.roomBack} accessibilityRole="button" accessibilityLabel={t("Paketler")}>
            <Ionicons name="chevron-back" size={22} color={VP.ink} />
          </Pressable>
          <View style={{ flex: 1 }}>
            <Text style={styles.roomTitle} numberOfLines={1}>
              {c.label} · {openPackData.range}
            </Text>
            <View style={styles.roomTrack}>
              <View style={[styles.roomFill, { width: `${Math.max(3, (done / total) * 100)}%` }]} />
            </View>
          </View>
          <Pressable
            onPress={() => setPackMode((m) => (m === 'study' ? 'list' : 'study'))}
            style={styles.roomToggle}
            accessibilityRole="button"
          >
            <Ionicons name={packMode === 'study' ? 'list' : 'albums'} size={16} color={VP.ink} />
            <Text style={styles.roomToggleText}>{packMode === 'study' ? t("Liste") : t("Çalış")}</Text>
          </Pressable>
        </View>

        {packMode === 'list' ? (
          <FlatList
            data={openPackData.words}
            keyExtractor={(w) => w.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            extraData={`${expandedId}|${savedTermsLower.size}|${dismissedIds.size}|${Object.keys(handled).length}`}
            renderItem={({ item }) => (
              <WordCard
                item={item}
                accent={c.color}
                saved={isSaved(item)}
                known={(isKnown(item) || handled[item.id] === 'known') && !isSaved(item)}
                expanded={expandedId === item.id}
                onToggle={toggleExpanded}
                onSpeak={pronounce}
                onAdd={handleAdd}
                onKnown={handleKnown}
                onUndo={handleUndo}
                onReviewNow={handleReviewNow}
                dueLabel={dueLabelOf(item)}
              />
            )}
          />
        ) : loading ? (
          <MivoLoader size={90} label={t("Kelimeler yükleniyor…")} style={{ paddingVertical: 32 }} />
        ) : current ? (
          <ScrollView contentContainerStyle={styles.roomScroll} showsVerticalScrollIndicator={false}>
            <Text style={styles.roomCount}>{t("{{n}} kelime kaldı", { n: studyQueue.length })}</Text>
            <View style={[styles.studyCard, shadow.card]}>
              <View style={[styles.studyPos, { backgroundColor: `${c.color}1A` }]}>
                <Text style={[styles.studyPosText, { color: c.color }]}>{POS_LABEL[current.partOfSpeech]}</Text>
              </View>
              <Text style={styles.studyWord}>{current.word}</Text>
              {current.respelling ? <Text style={styles.studyRespelling}>{current.respelling}</Text> : null}
              <Pressable onPress={() => void pronounce(current.word)} style={styles.studySound} accessibilityRole="button" accessibilityLabel={t("Telaffuzu dinle")}>
                <Ionicons name="volume-high" size={22} color="#FFFFFF" />
              </Pressable>
              <Text style={styles.studyMeaning}>
                {nativeFlag()} {current.translation}
              </Text>
              {current.exampleEn ? (
                // The example is for reading; only the word itself is spoken (its clip ships in the app)
                <View style={styles.studyExample}>
                  <Text style={styles.studyExampleEn}>&ldquo;{current.exampleEn}&rdquo;</Text>
                  {current.exampleTr && current.exampleTr !== current.exampleEn ? <Text style={styles.studyExampleTr}>{current.exampleTr}</Text> : null}
                </View>
              ) : null}
              {rows.length || current.grammarNote ? (
                showDetails ? (
                  <View style={styles.details}>
                    {current.grammarNote ? (
                      <View style={styles.noteRow}>
                        <Ionicons name="sparkles" size={12} color={VP.ink} />
                        <Text style={styles.noteText}>{current.grammarNote}</Text>
                      </View>
                    ) : null}
                    {rows.length ? (
                      <View style={styles.formGrid}>
                        {rows.map((r) => (
                          <View key={r.label} style={styles.formCell}>
                            <Text style={styles.formLabel}>{r.label}</Text>
                            <Text style={styles.formValue}>{r.form}</Text>
                            {r.sub ? <Text style={styles.formSub}>{r.sub}</Text> : null}
                          </View>
                        ))}
                      </View>
                    ) : null}
                  </View>
                ) : (
                  <Pressable onPress={() => setShowDetails(true)} hitSlop={8} style={styles.moreBtn} accessibilityRole="button">
                    <Text style={styles.moreBtnText}>{t("Detaylar")}</Text>
                    <Ionicons name="chevron-down" size={14} color={VP.ink} />
                  </Pressable>
                )
              ) : null}
            </View>

            {/* Tags to put on the word when it goes into the chest */}
            <View style={styles.tagPicker}>
              <Text style={styles.tagPickerLabel}>{t("Etiket")}</Text>
              {[c.label, ...userTags.filter((tag) => tag !== c.label)].slice(0, 6).map((tag) => {
                const on = studyTags.includes(tag);
                return (
                  <Pressable
                    key={tag}
                    onPress={() => setStudyTags((list) => (on ? list.filter((x) => x !== tag) : [...list, tag]))}
                    style={[styles.tagChip, on && styles.tagChipOn]}
                    accessibilityRole="button"
                    accessibilityState={{ selected: on }}
                  >
                    <Text style={[styles.tagChipText, on && { color: '#FFFFFF' }]}>{tag}</Text>
                  </Pressable>
                );
              })}
            </View>

            <View style={styles.studyActions}>
              <Pressable onPress={studyKnown} style={({ pressed }) => [styles.studyKnown, pressed && styles.studyPressed]} accessibilityRole="button">
                <Ionicons name="checkmark" size={18} color={VP.ink} />
                <Text style={styles.studyKnownText}>{t("Biliyorum")}</Text>
              </Pressable>
              <Pressable onPress={studySave} style={({ pressed }) => [styles.studySave, pressed && styles.studyPressed]} accessibilityRole="button">
                <Ionicons name="add-circle" size={18} color="#FFFFFF" />
                <Text style={styles.studySaveText}>{t("Sandığıma ekle")}</Text>
              </Pressable>
            </View>
            {lastKnown ? (
              <Pressable
                onPress={() => {
                  void handleUndo(lastKnown);
                  setLastKnown(null);
                }}
                hitSlop={8}
                style={styles.undoLink}
                accessibilityRole="button"
              >
                <Ionicons name="arrow-undo" size={14} color={VP.inkSoft} />
                <Text style={styles.undoLinkText}>{t("“{{word}}” geri al", { word: lastKnown.word })}</Text>
              </Pressable>
            ) : null}
          </ScrollView>
        ) : (
          <View style={styles.packDone}>
            <Text style={styles.emptyEmoji}>🎉</Text>
            <Text style={styles.emptyTitle}>{t("Paket bitti!")}</Text>
            <Text style={styles.emptySub}>
              {sessionSaved || sessionKnown
                ? t("{{a}} kelime sandığına girdi, {{b}} kelimeyi zaten biliyorsun.", { a: sessionSaved, b: sessionKnown })
                : t("Bu paketteki bütün kelimelere baktın.")}
            </Text>
            {following ? (
              <Pressable onPress={() => openPack(following)} style={({ pressed }) => [styles.studySave, styles.packDoneBtn, pressed && styles.studyPressed]} accessibilityRole="button">
                <Text style={styles.studySaveText}>{t("Sıradaki paket: {{range}}", { range: following.range })}</Text>
              </Pressable>
            ) : null}
            <Pressable onPress={() => setOpenPackId(null)} hitSlop={8} style={styles.undoLink} accessibilityRole="button">
              <Text style={styles.moreBtnText}>{t("Paketlere dön")}</Text>
            </Pressable>
          </View>
        )}

        {toast ? <Toast message={toast} /> : null}
      </SafeAreaView>
    );
  }

  // ---------------------------------------------------------------- The library: next pack, word types, packs
  const searchBox = (
    <View style={styles.searchBox}>
      <Ionicons name="search" size={18} color={colors.textMuted} />
      <TextInput
        style={styles.searchInput}
        placeholder={t("Tüm kütüphanede ara…")}
        placeholderTextColor={colors.textMuted}
        value={searchQuery}
        onChangeText={setSearchQuery}
        autoCorrect={false}
        autoCapitalize="none"
        returnKeyType="search"
        accessibilityLabel={t("Tüm kütüphanede ara…")}
      />
      {searchQuery ? (
        <Pressable onPress={() => setSearchQuery('')} hitSlop={10} accessibilityLabel={t("Aramayı temizle")}>
          <Ionicons name="close-circle" size={18} color={colors.textMuted} />
        </Pressable>
      ) : null}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title={t("Kütüphane")}
        subtitle={t("En Sık Kullanılan 900 Çekirdek Kelime")}
        icon={vocabArt.iconLibrary}
        onBack={() => navigation.goBack()}
        right={
          <Pressable onPress={() => navigation.navigate('Main', { screen: 'Vocab' })} style={styles.chestBtn} accessibilityRole="button">
            <Image source={vocabArt.emptyChest} style={styles.chestBtnIcon} resizeMode="contain" />
            <Text style={styles.chestBtnText}>{t("Sandığım")}</Text>
          </Pressable>
        }
      />
      <View style={styles.searchWrap}>{searchBox}</View>

      {searching ? (
        <FlatList
          data={searchResults}
          keyExtractor={(row) => row.entry.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          ListHeaderComponent={<Text style={[styles.hint, { marginHorizontal: spacing.md }]}>{t("Tüm {{total}} kelimede aranıyor", { total: TOTAL_WORDS })}</Text>}
          ListEmptyComponent={
            <View style={styles.emptyBox}>
              <Ionicons name="search-outline" size={32} color={colors.textMuted} />
              <Text style={styles.emptyTitle}>{t("Aradığın kelime bulunamadı")}</Text>
              <Text style={styles.emptySub}>{t("Farklı bir arama terimi yazmayı dene.")}</Text>
            </View>
          }
          extraData={`${expandedId}|${savedTermsLower.size}|${dismissedIds.size}`}
          renderItem={({ item: row }) => (
            <WordCard
              item={row.entry}
              accent={PACKS[row.category].color}
              tag={`${PACKS[row.category].label} · ${PACKS[row.category].sets[row.packIndex].range}`}
              saved={isSaved(row.entry)}
              known={isKnown(row.entry) && !isSaved(row.entry)}
              expanded={expandedId === row.entry.id}
              onToggle={toggleExpanded}
              onSpeak={pronounce}
              onAdd={handleAdd}
              onKnown={handleKnown}
              onUndo={handleUndo}
              onReviewNow={handleReviewNow}
              dueLabel={dueLabelOf(row.entry)}
            />
          )}
        />
      ) : loading ? (
        <MivoLoader size={90} label={t("Kelimeler yükleniyor…")} style={{ paddingVertical: 32 }} />
      ) : (
        <ScrollView contentContainerStyle={styles.browse} showsVerticalScrollIndicator={false}>
          {/* Overall progress, one quiet line */}
          <View style={styles.overallRow}>
            <Text style={styles.overallText}>
              {t("Genel ilerleme")} <Text style={styles.overallNum}>{stats.overall}</Text> / {TOTAL_WORDS}
            </Text>
            <View style={styles.overallTrack}>
              <View style={[styles.overallFill, { width: `${Math.max(3, overallPct)}%` }]} />
            </View>
            <Text style={styles.overallPct}>%{overallPct}</Text>
          </View>

          {/* The three word types as illustrated covers */}
          <View style={styles.catRow}>
            {CATEGORIES.map((cat) => {
              const c = PACKS[cat];
              const st = stats.perCategory[cat];
              const active = cat === category;
              return (
                <Pressable
                  key={cat}
                  onPress={() => setCategory(cat)}
                  style={({ pressed }) => [styles.catCard, active && { borderColor: c.color }, pressed && { transform: [{ scale: 0.97 }] }]}
                  accessibilityRole="button"
                  accessibilityState={{ selected: active }}
                >
                  <View style={[styles.catCoverBox, { backgroundColor: c.soft }]}>
                    <Image source={c.cover} style={styles.catCover} resizeMode="contain" />
                  </View>
                  <Text style={[styles.catLabel, active && { color: c.color }]} numberOfLines={1}>
                    {c.label}
                  </Text>
                  <Text style={styles.catCount}>
                    {st.done}/{st.total}
                  </Text>
                  <View style={styles.catTrack}>
                    <View style={[styles.catFill, { backgroundColor: c.color, width: `${Math.max(4, (st.done / st.total) * 100)}%` }]} />
                  </View>
                </Pressable>
              );
            })}
          </View>

          {/* Where to go on: the first pack of this word type with new words */}
          {nextPack ? (
            <Pressable onPress={() => openPack(nextPack)} accessibilityRole="button">
              {({ pressed }) => (
                <View style={[styles.nextCard, pressed && styles.studyPressed]}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.nextKicker}>{t("SIRADAKİ PAKET")}</Text>
                    <Text style={styles.nextTitle}>
                      {PACKS[category].label} · {nextPack.range}
                    </Text>
                    <Text style={styles.nextSub}>{t("{{n}} yeni kelime", { n: nextPack.words.length - (stats.perPack.get(nextPack.id) ?? 0) })}</Text>
                  </View>
                  <View style={styles.nextBtn}>
                    <Text style={styles.nextBtnText}>{t("Çalış")}</Text>
                    <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
                  </View>
                </View>
              )}
            </Pressable>
          ) : (
            <View style={styles.nextCard}>
              <Text style={styles.nextTitle}>{t("Bu türün bütün paketlerini bitirdin 🎉")}</Text>
            </View>
          )}

          {/* The word type's packs of 20 */}
          <Text style={styles.packsTitle}>{t("Paketler")}</Text>
          <View style={styles.packGrid}>
            {SMALL_PACKS[category].map((p) => {
              const d = stats.perPack.get(p.id) ?? 0;
              const full = d >= p.words.length;
              const isNext = nextPack?.id === p.id;
              return (
                <Pressable
                  key={p.id}
                  onPress={() => openPack(p, full ? 'list' : 'study')}
                  style={({ pressed }) => [styles.packTile, isNext && { borderColor: PACKS[category].color }, full && styles.packTileDone, pressed && styles.studyPressed]}
                  accessibilityRole="button"
                >
                  <View style={styles.packTileTop}>
                    <Text style={styles.packTileRange}>{p.range}</Text>
                    {full ? <Ionicons name="checkmark-circle" size={16} color={TEAL} /> : null}
                  </View>
                  <View style={styles.packTileTrack}>
                    <View style={[styles.packTileFill, { width: `${Math.max(d ? 8 : 0, (d / p.words.length) * 100)}%`, backgroundColor: full ? TEAL : PACKS[category].color }]} />
                  </View>
                  <Text style={styles.packTileCount}>
                    {d}/{p.words.length}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>
      )}

      {toast ? <Toast message={toast} /> : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchWrap: { paddingHorizontal: spacing.md, paddingTop: 8, paddingBottom: 4 },
  browse: { paddingHorizontal: spacing.md, paddingTop: 10, paddingBottom: 120, gap: 14 },
  nextCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#CCFBF1',
    borderBottomWidth: 4,
    borderBottomColor: '#99F6E4',
  },
  nextKicker: { fontFamily: fonts.headingBold, fontSize: 11, letterSpacing: 1, color: '#0D9488' },
  nextTitle: { fontFamily: fonts.headingBold, fontSize: 17, color: VP.ink, marginTop: 2 },
  nextSub: { fontFamily: fonts.bodyMedium, fontSize: 13, color: VP.inkSoft, marginTop: 2 },
  nextBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 999, backgroundColor: '#0D9488' },
  nextBtnText: { fontFamily: fonts.headingBold, fontSize: 14, color: '#FFFFFF' },
  packsTitle: { fontFamily: fonts.headingBold, fontSize: 16, color: VP.ink, marginTop: 4 },
  packGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 10 },
  packTile: { width: '31.5%', gap: 6, padding: 10, borderRadius: 16, backgroundColor: '#FFFFFF', borderWidth: 1.5, borderColor: VP.line, borderBottomWidth: 3 },
  packTileDone: { backgroundColor: '#F0FDFA', borderColor: '#CCFBF1' },
  packTileTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  packTileRange: { fontFamily: fonts.headingBold, fontSize: 13.5, color: VP.ink },
  packTileTrack: { height: 5, borderRadius: 3, backgroundColor: '#EFE8DD', overflow: 'hidden' },
  packTileFill: { height: '100%', borderRadius: 3 },
  packTileCount: { fontFamily: fonts.bodyMedium, fontSize: 11.5, color: VP.inkSoft },

  roomBar: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: spacing.md, paddingVertical: 10 },
  roomBack: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center', backgroundColor: VP.card, borderWidth: 1, borderColor: VP.line },
  roomTitle: { fontFamily: fonts.headingBold, fontSize: 15.5, color: VP.ink },
  roomTrack: { height: 6, borderRadius: 3, backgroundColor: '#EFE8DD', overflow: 'hidden', marginTop: 6 },
  roomFill: { height: '100%', borderRadius: 3, backgroundColor: '#14B8A6' },
  roomToggle: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999, backgroundColor: VP.card, borderWidth: 1, borderColor: VP.line },
  roomToggleText: { fontFamily: fonts.headingSemiBold, fontSize: 12.5, color: VP.ink },
  roomScroll: { paddingHorizontal: spacing.md, paddingTop: 6, paddingBottom: 60, gap: 14 },
  roomCount: { fontFamily: fonts.headingSemiBold, fontSize: 12.5, color: VP.inkSoft, textAlign: 'center' },
  studyCard: { alignItems: 'center', gap: 8, padding: 22, borderRadius: 26, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: VP.line },
  studyPos: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 999 },
  studyPosText: { fontFamily: fonts.headingBold, fontSize: 11.5 },
  studyWord: { fontFamily: fonts.headingBold, fontSize: 34, color: VP.ink, textAlign: 'center', marginTop: 4 },
  studyRespelling: { fontSize: 15, color: VP.inkSoft },
  studySound: { width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0EA5E9', marginVertical: 4 },
  studyMeaning: { fontFamily: fonts.headingSemiBold, fontSize: 18, color: colors.textHeading, textAlign: 'center' },
  studyExample: { alignSelf: 'stretch', gap: 3, marginTop: 6, padding: 12, borderRadius: 14, backgroundColor: '#F8FAFC' },
  studyExampleEn: { fontFamily: fonts.bodyMedium, fontSize: 14.5, lineHeight: 20, color: colors.textHeading, fontStyle: 'italic', textAlign: 'center' },
  studyExampleTr: { fontFamily: fonts.bodyRegular, fontSize: 13, lineHeight: 18, color: colors.textMuted, textAlign: 'center' },
  tagPicker: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 6 },
  tagPickerLabel: { fontFamily: fonts.headingSemiBold, fontSize: 12.5, color: VP.inkSoft, marginRight: 2 },
  tagChip: { paddingHorizontal: 11, paddingVertical: 6, borderRadius: 999, backgroundColor: '#FFFFFF', borderWidth: 1.5, borderColor: VP.line },
  tagChipOn: { backgroundColor: '#0D9488', borderColor: '#0D9488' },
  tagChipText: { fontFamily: fonts.headingSemiBold, fontSize: 12.5, color: VP.ink },
  studyActions: { flexDirection: 'row', gap: 10 },
  studyKnown: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 15, borderRadius: 999, backgroundColor: '#FFFFFF', borderWidth: 1.5, borderColor: VP.line, borderBottomWidth: 4 },
  studyKnownText: { fontFamily: fonts.headingBold, fontSize: 15, color: VP.ink },
  studySave: { flex: 1.3, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 15, borderRadius: 999, backgroundColor: '#14B8A6', borderBottomWidth: 4, borderBottomColor: '#0B7C70' },
  studySaveText: { fontFamily: fonts.headingBold, fontSize: 15, color: '#FFFFFF' },
  studyPressed: { transform: [{ translateY: 2 }], borderBottomWidth: 2 },
  undoLink: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, alignSelf: 'center', paddingVertical: 4 },
  undoLinkText: { fontFamily: fonts.bodyMedium, fontSize: 13, color: VP.inkSoft },
  packDone: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 10, paddingHorizontal: spacing.lg, paddingBottom: 60 },
  packDoneBtn: { flex: 0, alignSelf: 'stretch', marginTop: 8 },
  chestBtnIcon: { width: 26, height: 26 },
  container: { flex: 1, backgroundColor: VP.floor },
  chestBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingLeft: 6, paddingRight: 12, paddingVertical: 5, borderRadius: radii.pill, backgroundColor: VP.card, borderWidth: 1, borderColor: VP.line },
  chestBtnText: { fontFamily: fonts.headingBold, fontSize: 12.5, color: VP.ink },
  listContent: { paddingBottom: 120 },
  listHeader: { paddingHorizontal: spacing.md, paddingTop: spacing.md, gap: 12 },
  overallRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  overallText: { fontFamily: fonts.headingSemiBold, fontSize: 12.5, color: VP.inkSoft },
  overallNum: { fontFamily: fonts.headingBold, color: VP.ink },
  overallTrack: { flex: 1, height: 6, borderRadius: 3, backgroundColor: '#EFE8DD', overflow: 'hidden' },
  overallFill: { height: '100%', borderRadius: 3, backgroundColor: VP.ink },
  overallPct: { fontFamily: fonts.headingBold, fontSize: 12.5, color: VP.ink },
  catRow: { flexDirection: 'row', gap: 10 },
  catCard: { flex: 1, gap: 3, padding: 6, paddingBottom: 10, borderRadius: 20, borderWidth: 2, borderColor: VP.line, backgroundColor: VP.card },
  catCoverBox: { borderRadius: 14, aspectRatio: 1.25, alignItems: 'center', justifyContent: 'center', overflow: 'hidden', marginBottom: 4 },
  catCover: { width: '100%', height: '100%' },
  catLabel: { fontFamily: fonts.headingBold, fontSize: 13.5, color: VP.ink, paddingHorizontal: 4 },
  catCount: { fontFamily: fonts.bodyMedium, fontSize: 11.5, color: VP.inkSoft, paddingHorizontal: 4 },
  catTrack: { height: 4, marginHorizontal: 4, marginTop: 4, borderRadius: 2, backgroundColor: '#EFE8DD', overflow: 'hidden' },
  catFill: { height: '100%', borderRadius: 2 },
  packRow: { flexDirection: 'row', gap: 8 },
  packChip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: radii.pill,
    borderWidth: 1.5,
    borderColor: VP.line,
    backgroundColor: VP.card,
  },
  packRange: { fontFamily: fonts.headingSemiBold, fontSize: 13, color: colors.textHeading },
  packRangeActive: { color: '#FFFFFF' },
  packPct: { fontFamily: fonts.bodyMedium, fontSize: 11.5, color: colors.textMuted },
  packPctActive: { color: 'rgba(255,255,255,0.85)' },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    height: 46,
    borderRadius: radii.pill,
    backgroundColor: VP.card,
    borderWidth: 1.5,
    borderColor: VP.line,
  },
  searchInput: { flex: 1, fontFamily: fonts.bodyRegular, fontSize: 14.5, color: colors.textHeading, paddingVertical: 0 },
  hint: { fontFamily: fonts.bodyRegular, fontSize: 12, color: colors.textMuted, marginLeft: 4, marginBottom: 4 },
  filterRow: { flexDirection: 'row', gap: 8, marginBottom: 4 },
  filterChip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: radii.pill, backgroundColor: '#EEF2F7' },
  filterChipActive: { backgroundColor: colors.textHeading },
  filterText: { fontFamily: fonts.headingSemiBold, fontSize: 12.5, color: colors.textBody },
  filterTextActive: { color: '#FFFFFF' },
  filterCount: { fontFamily: fonts.bodyMedium, color: colors.textMuted },
  wordCard: { flexDirection: 'row', marginHorizontal: spacing.md, marginTop: 12, borderRadius: 22, backgroundColor: '#FFFFFF', overflow: 'hidden', borderWidth: 1, borderColor: '#F1F5F9' },
  wordCardDone: { backgroundColor: '#FAFFFC' },
  cardAccent: { width: 6 },
  cardBody: { flex: 1, padding: 16, gap: 8 },
  cardTop: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  wordLine: { flexDirection: 'row', alignItems: 'baseline', flexWrap: 'wrap', gap: 8 },
  wordTerm: { fontFamily: fonts.headingBold, fontSize: 20, color: colors.textHeading },
  wordRespelling: { fontFamily: fonts.bodyMedium, fontSize: 13, color: colors.textMuted },
  meaningText: { fontFamily: fonts.bodyMedium, fontSize: 14.5, color: colors.textBody, marginTop: 3 },
  soundBtn: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#EEF2FF', alignItems: 'center', justifyContent: 'center' },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  tag: { paddingHorizontal: 9, paddingVertical: 3, borderRadius: radii.pill },
  tagText: { fontFamily: fonts.headingSemiBold, fontSize: 11 },
  tagNeutral: { paddingHorizontal: 9, paddingVertical: 3, borderRadius: radii.pill, backgroundColor: '#F1F5F9' },
  tagNeutralText: { fontFamily: fonts.bodyMedium, fontSize: 11, color: colors.textMuted },
  exampleEn: { fontFamily: fonts.bodyRegular, fontSize: 13.5, lineHeight: 19, color: colors.textBody, fontStyle: 'italic' },
  details: { gap: 8, paddingTop: 2 },
  exampleTr: { fontFamily: fonts.bodyRegular, fontSize: 13, lineHeight: 18, color: colors.textMuted },
  noteRow: { flexDirection: 'row', gap: 6, alignItems: 'flex-start', backgroundColor: '#EEF2FF', borderRadius: radii.sm, padding: 9 },
  noteText: { flex: 1, fontFamily: fonts.bodyRegular, fontSize: 12.5, lineHeight: 17, color: '#3730A3' },
  formGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  formCell: { minWidth: '46%', flexGrow: 1, backgroundColor: '#F8FAFC', borderRadius: radii.sm, padding: 9, gap: 1 },
  formLabel: { fontFamily: fonts.bodyMedium, fontSize: 10.5, color: colors.textMuted },
  formValue: { fontFamily: fonts.headingSemiBold, fontSize: 13.5, color: colors.textHeading },
  formSub: { fontFamily: fonts.bodyRegular, fontSize: 11.5, color: colors.textMuted },
  moreBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, alignSelf: 'flex-start' },
  moreBtnText: { fontFamily: fonts.headingSemiBold, fontSize: 12.5, color: VP.ink },
  actionsRow: { flexDirection: 'row', gap: 10, marginTop: 2 },
  knownBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, paddingVertical: 11, borderRadius: radii.pill, backgroundColor: '#F1F5F9', borderBottomWidth: 3, borderBottomColor: '#E2E8F0' },
  knownBtnText: { fontFamily: fonts.headingSemiBold, fontSize: 12.5, color: colors.textBody },
  addBtn: { flex: 1.2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, paddingVertical: 11, borderRadius: radii.pill, backgroundColor: VP.ink, borderBottomWidth: 3, borderBottomColor: '#0B1220' },
  addBtnText: { fontFamily: fonts.headingSemiBold, fontSize: 12.5, color: '#FFFFFF' },
  pressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  statusPill: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 4 },
  statusPillText: { fontFamily: fonts.headingSemiBold, fontSize: 13, color: '#059669' },
  knownRow: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  statusPillMuted: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  statusPillMutedText: { fontFamily: fonts.bodyMedium, fontSize: 13, color: colors.textMuted },
  undoText: { fontFamily: fonts.headingSemiBold, fontSize: 13, color: VP.ink },
  emptyBox: { alignItems: 'center', gap: 8, paddingVertical: 40, paddingHorizontal: spacing.lg },
  emptyEmoji: { fontSize: 34 },
  emptyTitle: { fontFamily: fonts.headingBold, fontSize: 15.5, color: colors.textHeading, textAlign: 'center' },
  emptySub: { fontFamily: fonts.bodyRegular, fontSize: 13, color: colors.textMuted, textAlign: 'center' },
  emptyBtn: { marginTop: 6, paddingHorizontal: 18, paddingVertical: 10, borderRadius: radii.pill, backgroundColor: VP.ink },
  emptyBtnText: { fontFamily: fonts.headingSemiBold, fontSize: 13, color: '#FFFFFF' },
});
