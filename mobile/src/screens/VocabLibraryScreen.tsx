import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Image, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Toast } from '../components/Toast';
import { minimalFeatureIcons, stateImages } from '../assets/images';
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
type StatusFilter = 'new' | 'all' | 'saved' | 'known';

const PACKS: Record<
  LibraryCategory,
  {
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
    color: string;
    soft: string;
    sets: { id: string; range: string; words: LibraryWordEntry[] }[];
  }
> = {
  nouns: {
    label: t("İsimler"),
    icon: 'cube-outline',
    color: '#6366F1',
    soft: '#EEF2FF',
    sets: [
      { id: 'nouns_1', range: '1–100', words: NOUNS_100 },
      { id: 'nouns_2', range: '101–200', words: NOUNS_200 },
      { id: 'nouns_3', range: '201–300', words: NOUNS_300 },
    ],
  },
  verbs: {
    label: t("Fiiller"),
    icon: 'walk-outline',
    color: '#0EA5E9',
    soft: '#E0F2FE',
    sets: [
      { id: 'verbs_1', range: '1–100', words: VERBS_100 },
      { id: 'verbs_2', range: '101–200', words: VERBS_200 },
      { id: 'verbs_3', range: '201–300', words: VERBS_300 },
    ],
  },
  adjectives: {
    label: t("Sıfatlar"),
    icon: 'color-palette-outline',
    color: '#F59E0B',
    soft: '#FEF3C7',
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
  known: boolean;
  expanded: boolean;
  onToggle: (id: string) => void;
  onSpeak: (word: string) => void;
  onAdd: (item: LibraryWordEntry) => void;
  onKnown: (item: LibraryWordEntry) => void;
  onUndo: (item: LibraryWordEntry) => void;
};

const WordCard = memo(function WordCard({ item, tag, accent, saved, known, expanded, onToggle, onSpeak, onAdd, onKnown, onUndo }: WordCardProps) {
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
            <Ionicons name="volume-high" size={18} color={colors.brand} />
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
                <Ionicons name="sparkles" size={12} color={colors.brand} />
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
            <Ionicons name={expanded ? 'chevron-up' : 'chevron-down'} size={14} color={colors.brand} />
          </Pressable>
        ) : null}

        <View style={styles.actionsRow}>
          {saved ? (
            <View style={styles.statusPill}>
              <Ionicons name="checkmark-circle" size={16} color={colors.success} />
              <Text style={styles.statusPillText}>{t("Sandığında Kayıtlı ✓")}</Text>
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

export function VocabLibraryScreen({ navigation }: VocabLibraryScreenProps) {
  const queryClient = useQueryClient();
  const { pronounce } = usePronunciation();

  const [category, setCategory] = useState<LibraryCategory>('nouns');
  const [packIndex, setPackIndex] = useState(0);
  const [status, setStatus] = useState<StatusFilter>('new');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const statusInitialized = useRef(false);

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

  // All saved cards (dedup + progress) and the words explicitly marked "Biliyorum, Atla".
  const { data: allCards, isLoading } = useQuery({
    queryKey: ['vocab-cards', 'all'],
    queryFn: () => api.get<VocabCardOut[]>('/vocab-cards?all=true'),
  });
  const { data: dismissedWordIds, isLoading: progressLoading } = useQuery({
    queryKey: ['vocab-library-progress'],
    queryFn: () => api.get<string[]>('/vocab-library/progress'),
  });

  const savedTermsLower = useMemo(() => new Set((allCards ?? []).map((c) => c.term.trim().toLowerCase())), [allCards]);
  const dismissedIds = useMemo(() => new Set(dismissedWordIds ?? []), [dismissedWordIds]);
  const loading = isLoading || progressLoading;

  const isSaved = useCallback((w: LibraryWordEntry) => savedTermsLower.has(w.word.trim().toLowerCase()), [savedTermsLower]);
  const isKnown = useCallback((w: LibraryWordEntry) => dismissedIds.has(w.id), [dismissedIds]);
  const isReviewed = useCallback((w: LibraryWordEntry) => isSaved(w) || isKnown(w), [isSaved, isKnown]);

  // Progress per pack / category / overall.
  const stats = useMemo(() => {
    const perCategory = {} as Record<LibraryCategory, { done: number; total: number; packs: { done: number; total: number }[] }>;
    let overall = 0;
    for (const cat of CATEGORIES) {
      const packs = PACKS[cat].sets.map((s) => ({ done: s.words.filter(isReviewed).length, total: s.words.length }));
      const done = packs.reduce((a, p) => a + p.done, 0);
      perCategory[cat] = { done, total: packs.reduce((a, p) => a + p.total, 0), packs };
      overall += done;
    }
    return { perCategory, overall };
  }, [isReviewed]);

  const activeCat = PACKS[category];
  const activeSet = activeCat.sets[packIndex] ?? activeCat.sets[0];
  const query = searchQuery.trim().toLowerCase();
  const searching = query.length > 0;

  // Once the data is in: start on "Yeni" (where the user left off), or "Tümü" if this pack has nothing new.
  useEffect(() => {
    if (loading || statusInitialized.current) return;
    statusInitialized.current = true;
    if (activeSet.words.every(isReviewed)) setStatus('all');
  }, [loading, activeSet, isReviewed]);

  const counts = useMemo(() => {
    const words = activeSet.words;
    return {
      new: words.filter((w) => !isReviewed(w)).length,
      all: words.length,
      saved: words.filter(isSaved).length,
      known: words.filter((w) => isKnown(w) && !isSaved(w)).length,
    };
  }, [activeSet, isReviewed, isSaved, isKnown]);

  const data = useMemo(() => {
    if (searching) {
      const out: { entry: LibraryWordEntry; category: LibraryCategory; packIndex: number }[] = [];
      for (const w of ALL_WORDS) {
        const e = w.entry;
        if (
          e.word.toLowerCase().includes(query) ||
          e.translation.toLowerCase().includes(query) ||
          e.exampleEn.toLowerCase().includes(query)
        ) {
          out.push(w);
          if (out.length >= SEARCH_LIMIT) break;
        }
      }
      return out;
    }
    return activeSet.words
      .filter((w) => {
        if (status === 'new') return !isReviewed(w);
        if (status === 'saved') return isSaved(w);
        if (status === 'known') return isKnown(w) && !isSaved(w);
        return true;
      })
      .map((entry) => ({ entry, category, packIndex }));
  }, [searching, query, activeSet, status, category, packIndex, isReviewed, isSaved, isKnown]);

  const handleAdd = useCallback(
    async (entry: LibraryWordEntry) => {
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
        } satisfies VocabCardCreate);
        await queryClient.invalidateQueries({ queryKey: ['vocab-cards'] });
        showToast(t("“{{word}}” Kelime Sandığına eklendi 📚", { word: entry.word }));
      } catch (err) {
        showToast(err instanceof ApiError ? err.message : t("Kelime eklenemedi"));
      }
    },
    [queryClient, savedTermsLower, showToast]
  );

  const handleKnown = useCallback(
    async (entry: LibraryWordEntry) => {
      try {
        await api.post('/vocab-library/progress', { word_id: entry.id } satisfies VocabLibraryProgressCreate);
        await queryClient.invalidateQueries({ queryKey: ['vocab-library-progress'] });
        showToast(t("“{{word}}” biliniyor olarak işaretlendi ✓", { word: entry.word }));
      } catch (err) {
        showToast(err instanceof ApiError ? err.message : t("İşaretlenemedi"));
      }
    },
    [queryClient, showToast]
  );

  const handleUndo = useCallback(
    async (entry: LibraryWordEntry) => {
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

  const pickCategory = (cat: LibraryCategory) => {
    setCategory(cat);
    setPackIndex(0);
    setExpandedId(null);
  };

  const pickPack = (idx: number) => {
    setPackIndex(idx);
    setExpandedId(null);
  };

  const overallPct = Math.round((stats.overall / TOTAL_WORDS) * 100);
  const FILTERS: { id: StatusFilter; label: string; count: number }[] = [
    { id: 'new', label: t("Yeni"), count: counts.new },
    { id: 'all', label: t("Tümü"), count: counts.all },
    { id: 'saved', label: t("Sandıkta"), count: counts.saved },
    { id: 'known', label: t("Biliyorum"), count: counts.known },
  ];

  const header = (
    <View style={styles.listHeader}>
      <LinearGradient colors={['#4F46E5', '#7C3AED']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.summaryCard}>
        <View style={styles.summaryTop}>
          <View style={{ flex: 1 }}>
            <Text style={styles.summaryLabel}>{t("Genel ilerleme")}</Text>
            <Text style={styles.summaryValue}>
              {stats.overall}
              <Text style={styles.summaryTotal}> / {TOTAL_WORDS}</Text>
            </Text>
            <Text style={styles.summarySub}>{t("kelime incelendi (sandıkta veya biliniyor)")}</Text>
          </View>
          <View style={styles.summaryBadge}>
            <Text style={styles.summaryBadgeText}>%{overallPct}</Text>
          </View>
        </View>
        <View style={styles.summaryTrack}>
          <View style={[styles.summaryFill, { width: `${Math.max(3, overallPct)}%` }]} />
        </View>
      </LinearGradient>

      <View style={styles.catRow}>
        {CATEGORIES.map((cat) => {
          const c = PACKS[cat];
          const st = stats.perCategory[cat];
          const active = cat === category;
          return (
            <Pressable
              key={cat}
              onPress={() => pickCategory(cat)}
              style={[styles.catCard, active && { borderColor: c.color, backgroundColor: c.soft }]}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
            >
              <Ionicons name={c.icon} size={20} color={active ? c.color : colors.textMuted} />
              <Text style={[styles.catLabel, active && { color: c.color }]}>{c.label}</Text>
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

      <View style={styles.packRow}>
        {activeCat.sets.map((s, idx) => {
          const p = stats.perCategory[category].packs[idx];
          const pct = Math.round((p.done / p.total) * 100);
          const active = idx === packIndex;
          return (
            <Pressable
              key={s.id}
              onPress={() => pickPack(idx)}
              style={[styles.packChip, active && { backgroundColor: activeCat.color, borderColor: activeCat.color }]}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
            >
              <Text style={[styles.packRange, active && styles.packRangeActive]}>{s.range}</Text>
              <Text style={[styles.packPct, active && styles.packPctActive]}>{pct === 100 ? '✓' : `%${pct}`}</Text>
            </Pressable>
          );
        })}
      </View>

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

      {searching ? (
        <Text style={styles.hint}>{t("Tüm {{total}} kelimede aranıyor", { total: TOTAL_WORDS })}</Text>
      ) : (
        <View style={styles.filterRow}>
          {FILTERS.map((f) => {
            const active = status === f.id;
            return (
              <Pressable
                key={f.id}
                onPress={() => {
                  setStatus(f.id);
                  setExpandedId(null);
                }}
                style={[styles.filterChip, active && styles.filterChipActive]}
                accessibilityRole="button"
                accessibilityState={{ selected: active }}
              >
                <Text style={[styles.filterText, active && styles.filterTextActive]}>
                  {f.label} <Text style={[styles.filterCount, active && styles.filterTextActive]}>{f.count}</Text>
                </Text>
              </Pressable>
            );
          })}
        </View>
      )}
    </View>
  );

  const empty = loading ? (
    <MivoLoader size={90} label={t("Kelimeler yükleniyor…")} style={{ paddingVertical: 32 }} />
  ) : searching ? (
    <View style={styles.emptyBox}>
      <Ionicons name="search-outline" size={32} color={colors.textMuted} />
      <Text style={styles.emptyTitle}>{t("Aradığın kelime bulunamadı")}</Text>
      <Text style={styles.emptySub}>{t("Farklı bir arama terimi yazmayı dene.")}</Text>
    </View>
  ) : (
    <View style={styles.emptyBox}>
      <Text style={styles.emptyEmoji}>🎉</Text>
      <Text style={styles.emptyTitle}>
        {status === 'new' ? t("Bu pakette yeni kelime kalmadı 🎉") : t("Burada henüz kelime yok")}
      </Text>
      <Pressable onPress={() => setStatus('all')} style={styles.emptyBtn}>
        <Text style={styles.emptyBtnText}>{t("Hepsini göster")}</Text>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title={t("Kütüphane")}
        subtitle={t("En Sık Kullanılan 900 Çekirdek Kelime")}
        icon={minimalFeatureIcons.vocabLibrary}
        onBack={() => navigation.goBack()}
        right={
          <Pressable onPress={() => navigation.navigate('Main', { screen: 'Vocab' })} style={styles.chestBtn} accessibilityRole="button">
            <Image source={stateImages.emptyChest} style={styles.chestBtnIcon} resizeMode="contain" />
            <Text style={styles.chestBtnText}>{t("Sandığım")}</Text>
          </Pressable>
        }
      />

      <FlatList
        data={data}
        keyExtractor={(row) => row.entry.id}
        ListHeaderComponent={header}
        ListEmptyComponent={empty}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        initialNumToRender={8}
        maxToRenderPerBatch={10}
        windowSize={7}
        extraData={`${expandedId}|${savedTermsLower.size}|${dismissedIds.size}`}
        renderItem={({ item: row }) => (
          <WordCard
            item={row.entry}
            accent={PACKS[row.category].color}
            tag={searching ? `${PACKS[row.category].label} · ${PACKS[row.category].sets[row.packIndex].range}` : undefined}
            saved={isSaved(row.entry)}
            known={isKnown(row.entry) && !isSaved(row.entry)}
            expanded={expandedId === row.entry.id}
            onToggle={toggleExpanded}
            onSpeak={pronounce}
            onAdd={handleAdd}
            onKnown={handleKnown}
            onUndo={handleUndo}
          />
        )}
      />

      {toast ? <Toast message={toast} /> : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  chestBtnIcon: { width: 26, height: 26 },
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  chestBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingLeft: 6, paddingRight: 12, paddingVertical: 5, borderRadius: radii.pill, backgroundColor: '#FFF7E0', borderWidth: 1, borderColor: '#FDE68A' },
  chestBtnText: { fontFamily: fonts.headingBold, fontSize: 12.5, color: '#B45309' },
  listContent: { paddingBottom: 120 },
  listHeader: { paddingHorizontal: spacing.md, paddingTop: spacing.md, gap: 12 },
  summaryCard: { borderRadius: 26, padding: 20 },
  summaryTop: { flexDirection: 'row', alignItems: 'center' },
  summaryLabel: { fontFamily: fonts.headingSemiBold, fontSize: 12, color: 'rgba(255,255,255,0.8)', letterSpacing: 0.4 },
  summaryValue: { fontFamily: fonts.headingBold, fontSize: 34, color: '#FFFFFF', marginTop: 2 },
  summaryTotal: { fontFamily: fonts.headingSemiBold, fontSize: 18, color: 'rgba(255,255,255,0.75)' },
  summarySub: { fontFamily: fonts.bodyRegular, fontSize: 12, color: 'rgba(255,255,255,0.85)', marginTop: 2 },
  summaryBadge: { backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: radii.pill, paddingHorizontal: 14, paddingVertical: 8 },
  summaryBadgeText: { fontFamily: fonts.headingBold, fontSize: 16, color: '#FFFFFF' },
  summaryTrack: { height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.25)', marginTop: 14, overflow: 'hidden' },
  summaryFill: { height: '100%', borderRadius: 4, backgroundColor: '#FFFFFF' },
  catRow: { flexDirection: 'row', gap: 10 },
  catCard: { flex: 1, alignItems: 'center', gap: 3, paddingVertical: 14, paddingHorizontal: 6, borderRadius: 20, borderWidth: 2, borderColor: '#E2E8F0', backgroundColor: '#FFFFFF' },
  catLabel: { fontFamily: fonts.headingSemiBold, fontSize: 13, color: colors.textHeading },
  catCount: { fontFamily: fonts.bodyMedium, fontSize: 11, color: colors.textMuted },
  catTrack: { height: 4, alignSelf: 'stretch', marginTop: 4, borderRadius: 2, backgroundColor: '#E2E8F0', overflow: 'hidden' },
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
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
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
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
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
  moreBtnText: { fontFamily: fonts.headingSemiBold, fontSize: 12.5, color: colors.brand },
  actionsRow: { flexDirection: 'row', gap: 10, marginTop: 2 },
  knownBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, paddingVertical: 11, borderRadius: radii.pill, backgroundColor: '#F1F5F9', borderBottomWidth: 3, borderBottomColor: '#E2E8F0' },
  knownBtnText: { fontFamily: fonts.headingSemiBold, fontSize: 12.5, color: colors.textBody },
  addBtn: { flex: 1.2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, paddingVertical: 11, borderRadius: radii.pill, backgroundColor: colors.brand, borderBottomWidth: 3, borderBottomColor: '#3730A3' },
  addBtnText: { fontFamily: fonts.headingSemiBold, fontSize: 12.5, color: '#FFFFFF' },
  pressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  statusPill: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 4 },
  statusPillText: { fontFamily: fonts.headingSemiBold, fontSize: 13, color: '#059669' },
  knownRow: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  statusPillMuted: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  statusPillMutedText: { fontFamily: fonts.bodyMedium, fontSize: 13, color: colors.textMuted },
  undoText: { fontFamily: fonts.headingSemiBold, fontSize: 13, color: colors.brand },
  emptyBox: { alignItems: 'center', gap: 8, paddingVertical: 40, paddingHorizontal: spacing.lg },
  emptyEmoji: { fontSize: 34 },
  emptyTitle: { fontFamily: fonts.headingBold, fontSize: 15.5, color: colors.textHeading, textAlign: 'center' },
  emptySub: { fontFamily: fonts.bodyRegular, fontSize: 13, color: colors.textMuted, textAlign: 'center' },
  emptyBtn: { marginTop: 6, paddingHorizontal: 18, paddingVertical: 10, borderRadius: radii.pill, backgroundColor: colors.brand },
  emptyBtnText: { fontFamily: fonts.headingSemiBold, fontSize: 13, color: '#FFFFFF' },
});
