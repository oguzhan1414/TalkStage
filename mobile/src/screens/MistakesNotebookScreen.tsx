import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { findGrammarV2Lesson } from '@talkstage/shared-data/grammarV2';
import { minimalFeatureIcons, stateImages } from '../assets/images';
import { BouncyPressable } from '../components/BouncyPressable';
import { MivoLoader } from '../components/MivoLoader';
import { useMivoTransition } from '../components/MivoTransitionOverlay';
import { ScreenHeader } from '../components/ScreenHeader';
import { api } from '../lib/api';
import { resolveLessonCode } from '../lib/legacyGrammarCodes';
import { usePronunciation } from '../hooks/usePronunciation';
import type { MistakesNotebookScreenProps } from '../navigation/types';
import { colors, fonts, radii, shadow, spacing } from '../theme/tokens';
import type { GrammarMistakeOut } from '../types/api';
import { getLocale, t } from '../i18n';

type SourceGroup = 'speaking' | 'quiz' | 'reading' | 'writing';
/** Hatanın türü: gramer (bir konuya bağlı ya da gramer olarak işaretli), kelime, ya da diğer (üslup, yazım, telaffuz…). */
type Kind = 'grammar' | 'vocabulary' | 'other';
type KindFilter = 'all' | Kind;
type ViewMode = 'topic' | 'all';

const QUIZ_LENGTH = 5;
const UNDO_MS = 4500;
const DAY_MS = 86_400_000;
const OTHER_KEY = 'other';

function groupOf(source: string | null | undefined): SourceGroup {
  if (source === 'voice_session' || source === 'voice_free_chat' || source === 'text_chat') return 'speaking';
  if (source === 'sentence_order') return 'reading';
  if (source === 'writing') return 'writing';
  return 'quiz';
}

const SOURCE_META: Record<SourceGroup, { label: string; icon: keyof typeof Ionicons.glyphMap; color: string }> = {
  speaking: { label: t("Konuşma"), icon: 'mic', color: '#E11D48' },
  quiz: { label: t("Quiz"), icon: 'create', color: '#4F46E5' },
  reading: { label: t("Okuma"), icon: 'book', color: '#059669' },
  writing: { label: t("Yazma"), icon: 'create-outline', color: '#0F766E' },
};

function kindOf(item: GrammarMistakeOut): Kind {
  if (item.category === 'vocabulary') return 'vocabulary';
  if (item.category === 'grammar' || resolveLessonCode(item.topic_code)) return 'grammar';
  return 'other';
}

/** The grammar structure itself ("present simple, 3. tekil -s…"), never a raw code like A1_N05. */
function grammarName(code: string): string {
  const lesson = findGrammarV2Lesson(code);
  return lesson?.target || lesson?.title || code;
}

/** The lesson's own title ("Günlük rutinin"): shown small, as context for where the rule is taught. */
function lessonTitle(code: string): string | null {
  return findGrammarV2Lesson(code)?.title ?? null;
}

function timeLabel(iso?: string | null): string {
  if (!iso) return '';
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return '';
  const days = Math.floor((Date.now() - then) / DAY_MS);
  if (days <= 0) return t("Bugün");
  if (days === 1) return t("Dün");
  if (days < 30) return t("{{n}} gün önce", { n: days });
  return new Date(iso).toLocaleDateString(getLocale());
}

function shuffled<T>(items: T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ---- word-level diff: the words that differ between the wrong and the corrected sentence are highlighted ----------
type Token = { text: string; changed: boolean };

const normalizeWord = (w: string) => w.toLowerCase().replace(/[^A-Za-z0-9'’À-ɏ]/g, '');

function diffSentences(wrong: string, right: string): { wrong: Token[]; right: Token[] } {
  const A = wrong.trim().split(/\s+/).filter(Boolean);
  const B = right.trim().split(/\s+/).filter(Boolean);
  const n = A.length;
  const m = B.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i][j] = normalizeWord(A[i]) === normalizeWord(B[j]) ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }
  const changedA = new Array(n).fill(true);
  const changedB = new Array(m).fill(true);
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (normalizeWord(A[i]) === normalizeWord(B[j])) {
      changedA[i] = false;
      changedB[j] = false;
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) i++;
    else j++;
  }
  // When almost everything differs, highlighting every word only adds noise: show the sentences plain.
  const ratio = (changedA.filter(Boolean).length + changedB.filter(Boolean).length) / Math.max(1, n + m);
  const plain = ratio > 0.7;
  return {
    wrong: A.map((text, k) => ({ text, changed: !plain && changedA[k] })),
    right: B.map((text, k) => ({ text, changed: !plain && changedB[k] })),
  };
}

type QuizSession = {
  items: GrammarMistakeOut[];
  index: number;
  /** order of the two options for each question (true = correct sentence first) */
  correctFirst: boolean[];
  picked: ('right' | 'wrong' | null)[];
};

type Group = { key: string; code: string | null; items: GrammarMistakeOut[] };
type Row = { type: 'group'; group: Group; open: boolean } | { type: 'card'; item: GrammarMistakeOut };

// ---- one mistake ------------------------------------------------------------------------------------------------
type CardProps = {
  item: GrammarMistakeOut;
  /** In the flat "Hepsi" list there is no topic header, so the card itself offers the lesson. */
  showLesson: boolean;
  onQuiz: (item: GrammarMistakeOut) => void;
  onLesson: (code: string) => void;
  onLearned: (item: GrammarMistakeOut) => void;
  onListen: (text: string) => void;
};

const MistakeCard = memo(function MistakeCard({ item, showLesson, onQuiz, onLesson, onLearned, onListen }: CardProps) {
  const [open, setOpen] = useState(false);
  const source = SOURCE_META[groupOf(item.source)];
  const code = resolveLessonCode(item.topic_code);
  const time = timeLabel(item.created_at);
  const diff = useMemo(() => diffSentences(item.wrong_text, item.corrected_text), [item.wrong_text, item.corrected_text]);

  return (
    <Pressable onPress={() => setOpen((v) => !v)} style={[styles.card, shadow.card]} accessibilityRole="button">
      <View style={styles.cardRow}>
        <View style={{ flex: 1, gap: 7 }}>
          <View style={styles.lineRow}>
            <Ionicons name="close-circle" size={17} color="#E11D48" />
            <Text style={styles.lineText}>
              {diff.wrong.map((tok, i) => (
                <Text key={`w${i}`} style={tok.changed ? styles.chgWrong : undefined}>
                  {tok.text}
                  {' '}
                </Text>
              ))}
            </Text>
          </View>
          <View style={styles.lineRow}>
            <Ionicons name="checkmark-circle" size={17} color="#059669" />
            <Text style={styles.lineText}>
              {diff.right.map((tok, i) => (
                <Text key={`r${i}`} style={tok.changed ? styles.chgRight : undefined}>
                  {tok.text}
                  {' '}
                </Text>
              ))}
            </Text>
          </View>
        </View>
        <View style={styles.cardSide}>
          <Pressable onPress={() => onListen(item.corrected_text)} hitSlop={6} style={styles.sideBtn} accessibilityRole="button" accessibilityLabel={t("Doğru cümleyi dinle")}>
            <Ionicons name="volume-high-outline" size={18} color="#059669" />
          </Pressable>
          <Pressable onPress={() => onLearned(item)} hitSlop={6} style={[styles.sideBtn, styles.sideBtnOk]} accessibilityRole="button" accessibilityLabel={t("Öğrendim")}>
            <Ionicons name="checkmark" size={18} color="#FFFFFF" />
          </Pressable>
        </View>
      </View>

      <View style={styles.metaRow}>
        <Ionicons name={source.icon} size={12} color={source.color} />
        <Text style={styles.metaText}>
          {source.label}
          {time ? ` · ${time}` : ''}
        </Text>
        <View style={{ flex: 1 }} />
        <Ionicons name={open ? 'chevron-up' : 'chevron-down'} size={16} color="#94A3B8" />
      </View>

      {open ? (
        <View style={styles.detail}>
          {item.explanation_tr ? (
            <View style={styles.explBox}>
              <Ionicons name="bulb-outline" size={15} color="#B45309" style={{ marginTop: 2 }} />
              <Text style={styles.explText}>{item.explanation_tr}</Text>
            </View>
          ) : null}

          {showLesson && code ? (
            <Pressable onPress={() => onLesson(code)} style={({ pressed }) => [styles.suggestBox, pressed && { opacity: 0.92 }]} accessibilityRole="link">
              <View style={styles.suggestIcon}>
                <Ionicons name="school" size={18} color={colors.brand} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.suggestLabel}>{t("Önerilen ders")}</Text>
                <Text style={styles.suggestTitle} numberOfLines={2}>
                  {grammarName(code)}
                </Text>
              </View>
              <Ionicons name="arrow-forward" size={16} color={colors.brand} />
            </Pressable>
          ) : null}

          <Pressable onPress={() => onQuiz(item)} style={styles.quizBtn} accessibilityRole="button">
            <Ionicons name="flash-outline" size={15} color={colors.brand} />
            <Text style={styles.quizBtnText}>{t("Kendini sına")}</Text>
          </Pressable>
        </View>
      ) : null}
    </Pressable>
  );
});

// ---- screen --------------------------------------------------------------------------------------------------------
export function MistakesNotebookScreen({ navigation }: MistakesNotebookScreenProps) {
  const { finishTransition } = useMivoTransition();
  const queryClient = useQueryClient();
  const [viewMode, setViewMode] = useState<ViewMode>('topic');
  const [kindFilter, setKindFilter] = useState<KindFilter>('all');
  /** null = default (only the biggest topic is open); once the user opens or closes a topic it is an explicit set. */
  const [openGroups, setOpenGroups] = useState<Set<string> | null>(null);
  const { pronounce } = usePronunciation();
  const listen = useCallback(
    (text: string) => {
      void pronounce(text);
    },
    [pronounce]
  );
  const [session, setSession] = useState<QuizSession | null>(null);
  // "Öğrendim" hides the card at once and deletes after a short undo window.
  const [hiddenIds, setHiddenIds] = useState<Set<string>>(new Set());
  const [undo, setUndo] = useState<{ id: string } | null>(null);
  const pendingTimers = useRef(new Map<string, ReturnType<typeof setTimeout>>());

  const { data: mistakes, isLoading } = useQuery({
    queryKey: ['grammar-mistakes'],
    queryFn: () => api.get<GrammarMistakeOut[]>('/progress/mistakes'),
  });

  useEffect(() => {
    if (!isLoading) finishTransition();
  }, [finishTransition, isLoading]);

  const commitDelete = useCallback(
    (id: string) => {
      pendingTimers.current.delete(id);
      api
        .delete(`/progress/mistakes/${id}`)
        .then(() => {
          queryClient.setQueryData<GrammarMistakeOut[]>(['grammar-mistakes'], (prev) => (prev ?? []).filter((m) => m.id !== id));
        })
        .catch(() => {
          // Could not delete: bring the card back instead of silently losing track.
          setHiddenIds((prev) => {
            const next = new Set(prev);
            next.delete(id);
            return next;
          });
        })
        .finally(() => setUndo((u) => (u?.id === id ? null : u)));
    },
    [queryClient]
  );

  // Leaving the screen: finish any deletes still waiting in the undo window.
  useEffect(() => {
    const timers = pendingTimers.current;
    return () => {
      for (const [id, timer] of timers) {
        clearTimeout(timer);
        api.delete(`/progress/mistakes/${id}`).catch(() => {});
      }
      timers.clear();
    };
  }, []);

  const markLearned = useCallback(
    (item: GrammarMistakeOut) => {
      setHiddenIds((prev) => new Set(prev).add(item.id));
      setUndo({ id: item.id });
      const old = pendingTimers.current.get(item.id);
      if (old) clearTimeout(old);
      pendingTimers.current.set(item.id, setTimeout(() => commitDelete(item.id), UNDO_MS));
    },
    [commitDelete]
  );

  const undoLearned = useCallback(() => {
    if (!undo) return;
    const timer = pendingTimers.current.get(undo.id);
    if (timer) clearTimeout(timer);
    pendingTimers.current.delete(undo.id);
    setHiddenIds((prev) => {
      const next = new Set(prev);
      next.delete(undo.id);
      return next;
    });
    setUndo(null);
  }, [undo]);

  const all = useMemo(() => (mistakes ?? []).filter((m) => !hiddenIds.has(m.id)), [mistakes, hiddenIds]);
  const visible = useMemo(() => all.filter((m) => kindFilter === 'all' || kindOf(m) === kindFilter), [all, kindFilter]);

  const kindCounts = useMemo(() => {
    const c = { all: all.length, grammar: 0, vocabulary: 0, other: 0 };
    for (const m of all) c[kindOf(m)] += 1;
    return c;
  }, [all]);

  const newThisWeek = useMemo(
    () => all.filter((m) => m.created_at && Date.now() - new Date(m.created_at).getTime() < 7 * DAY_MS).length,
    [all]
  );

  // Topic groups: the topic with the most mistakes first; mistakes with no lesson behind them go last.
  const groups = useMemo<Group[]>(() => {
    const map = new Map<string, Group>();
    for (const m of visible) {
      const code = resolveLessonCode(m.topic_code);
      const key = code ?? OTHER_KEY;
      const g = map.get(key) ?? { key, code, items: [] };
      g.items.push(m);
      map.set(key, g);
    }
    return Array.from(map.values()).sort((a, b) => Number(a.key === OTHER_KEY) - Number(b.key === OTHER_KEY) || b.items.length - a.items.length);
  }, [visible]);

  const isOpen = useCallback((key: string) => (openGroups ? openGroups.has(key) : key === groups[0]?.key), [openGroups, groups]);

  const toggleGroup = (key: string) => {
    const base = openGroups ?? new Set(groups[0] ? [groups[0].key] : []);
    const next = new Set(base);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    setOpenGroups(next);
  };

  const rows = useMemo<Row[]>(() => {
    if (viewMode === 'all') return visible.map((item) => ({ type: 'card', item }));
    return groups.flatMap<Row>((g) => {
      const open = isOpen(g.key);
      return [{ type: 'group', group: g, open }, ...(open ? g.items.map((item) => ({ type: 'card' as const, item })) : [])];
    });
  }, [viewMode, visible, groups, isOpen]);

  // ---- quiz -------------------------------------------------------------
  const startQuiz = (items: GrammarMistakeOut[]) => {
    if (items.length === 0) return;
    setSession({
      items,
      index: 0,
      correctFirst: items.map(() => Math.random() < 0.5),
      picked: items.map(() => null),
    });
  };
  const startSessionQuiz = () => startQuiz(shuffled(visible).slice(0, QUIZ_LENGTH));
  const startSingleQuiz = useCallback((item: GrammarMistakeOut) => startQuiz([item]), []); // eslint-disable-line react-hooks/exhaustive-deps

  const pick = (choice: 'right' | 'wrong') => {
    setSession((s) => {
      if (!s || s.picked[s.index]) return s;
      const picked = [...s.picked];
      picked[s.index] = choice;
      return { ...s, picked };
    });
  };
  const next = () => setSession((s) => (s ? { ...s, index: s.index + 1 } : s));
  const finished = session ? session.index >= session.items.length : false;
  const correctItems = session ? session.items.filter((_, i) => session.picked[i] === 'right') : [];
  const current = session && !finished ? session.items[session.index] : null;
  const currentPick = session && !finished ? session.picked[session.index] : null;

  const clearMastered = () => {
    correctItems.forEach(markLearned);
    setSession(null);
  };

  const openLesson = useCallback((code: string) => navigation.navigate('GrammarLesson', { code }), [navigation]);

  const header = (
    <View style={styles.listHeader}>
      {/* Tek eylem: hızlı sınav */}
      <LinearGradient colors={['#4F46E5', '#7C3AED']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[styles.hero, shadow.card]}>
        <View style={styles.heroBlob} />
        <Image source={minimalFeatureIcons.mistakesNotebook} style={styles.heroArt} resizeMode="contain" />
        <View style={styles.heroText}>
          <Text style={styles.heroTitle}>{all.length > 0 ? t("{{count}} hata seni bekliyor", { count: all.length }) : t("Tertemiz Bir Sayfa! 🎯")}</Text>
          {all.length > 0 ? (
            <Text style={styles.heroSub}>{newThisWeek > 0 ? t("Bu hafta {{n}} yeni", { n: newThisWeek }) : t("Bu hafta yeni hata yok 👏")}</Text>
          ) : null}
          {all.length > 0 ? (
            <BouncyPressable onPress={startSessionQuiz} hapticType="medium" scaleTo={0.96} style={styles.heroBtn}>
              <Ionicons name="flash" size={17} color={colors.brand} />
              <Text style={styles.heroBtnText}>
                {t("Hızlı Sınav")} · {t("{{n}} soru", { n: Math.min(QUIZ_LENGTH, visible.length) })}
              </Text>
            </BouncyPressable>
          ) : null}
        </View>
      </LinearGradient>

      {all.length > 0 ? (
        <>
          <View style={styles.segment}>
            {(['topic', 'all'] as ViewMode[]).map((mode) => {
              const active = viewMode === mode;
              return (
                <Pressable key={mode} onPress={() => setViewMode(mode)} style={[styles.segmentBtn, active && styles.segmentBtnActive]} accessibilityRole="button" accessibilityState={{ selected: active }}>
                  <Text style={[styles.segmentText, active && styles.segmentTextActive]}>{mode === 'topic' ? t("Konulara göre") : t("Hepsi")}</Text>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.chipRow}>
            {(['all', 'grammar', 'vocabulary', 'other'] as KindFilter[])
              .filter((k) => k === 'all' || kindCounts[k] > 0)
              .map((k) => {
                const active = kindFilter === k;
                const label = k === 'all' ? t("Tümü") : k === 'grammar' ? t("Gramer") : k === 'vocabulary' ? t("Kelime") : t("Diğer");
                return (
                  <Pressable key={k} onPress={() => setKindFilter(k)} style={[styles.chip, active && styles.chipActive]} accessibilityRole="button" accessibilityState={{ selected: active }}>
                    <Text style={[styles.chipText, active && styles.chipTextActive]}>
                      {label} <Text style={[styles.chipCount, active && styles.chipTextActive]}>{kindCounts[k]}</Text>
                    </Text>
                  </Pressable>
                );
              })}
          </View>
        </>
      ) : null}
    </View>
  );

  const empty = isLoading ? (
    <View style={styles.centerLoading}>
      <MivoLoader size={100} label={t("Hata defterin açılıyor…")} />
    </View>
  ) : (
    <View style={styles.emptyCard}>
      <Image source={stateImages.mistakesNotebook} style={styles.emptyImage} resizeMode="contain" />
      <Text style={styles.emptyTitle}>{t("Tertemiz Bir Sayfa! 🎯")}</Text>
      <Text style={styles.emptyText}>
        {kindFilter === 'all'
          ? t("Konuşmalarda ve testlerde takıldığın cümleler otomatik olarak buraya düşer. Konuştukça burası senin kişisel tekrar listen olur.")
          : t("Bu kategoride kayıtlı bir hatan bulunmuyor. Harika gidiyorsun!")}
      </Text>
      <BouncyPressable
        onPress={() => navigation.navigate('Main', { screen: 'Scenarios' })}
        style={styles.emptyBtn}
        hapticType="light"
        scaleTo={0.96}
      >
        <Ionicons name="mic" size={15} color="#FFFFFF" />
        <Text style={styles.emptyBtnText}>{t("Yeni Bir Sahneye Başla ➔")}</Text>
      </BouncyPressable>
    </View>
  );

  const quizChoices = (item: GrammarMistakeOut, correctFirst: boolean): { key: 'right' | 'wrong'; text: string }[] => {
    const right = { key: 'right' as const, text: item.corrected_text };
    const wrong = { key: 'wrong' as const, text: item.wrong_text };
    return correctFirst ? [right, wrong] : [wrong, right];
  };

  const renderRow = ({ item: row }: { item: Row }) => {
    if (row.type === 'card') {
      return <MistakeCard item={row.item} showLesson={viewMode === 'all'} onQuiz={startSingleQuiz} onLesson={openLesson} onLearned={markLearned} onListen={listen} />;
    }
    const { group, open } = row;
    const title = group.code ? grammarName(group.code) : t("Kelime ve üslup");
    const sub = group.code ? lessonTitle(group.code) : null;
    return (
      <Pressable onPress={() => toggleGroup(group.key)} style={[styles.groupHead, open && styles.groupHeadOpen]} accessibilityRole="button" accessibilityState={{ expanded: open }}>
        <Ionicons name={open ? 'chevron-down' : 'chevron-forward'} size={18} color={colors.textMuted} />
        <View style={{ flex: 1 }}>
          <Text style={styles.groupTitle} numberOfLines={2}>
            {title}
          </Text>
          {sub ? (
            <Text style={styles.groupSub} numberOfLines={1}>
              {t("Ders: {{title}}", { title: sub })}
            </Text>
          ) : null}
        </View>
        <View style={styles.groupCount}>
          <Text style={styles.groupCountText}>{group.items.length}</Text>
        </View>
        {group.code ? (
          <Pressable onPress={() => openLesson(group.code as string)} hitSlop={6} style={styles.groupLesson} accessibilityRole="link">
            <Text style={styles.groupLessonText}>{t("Dersi aç")}</Text>
          </Pressable>
        ) : null}
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title={t("Hata Defterim")}
        subtitle={t("Kişisel Zayıf Noktalar & Düzeltmeler")}
        icon={minimalFeatureIcons.mistakesNotebook}
        onBack={() => navigation.goBack()}
      />

      <FlatList
        data={rows}
        keyExtractor={(row) => (row.type === 'group' ? `g-${row.group.key}` : `c-${row.item.id}`)}
        ListHeaderComponent={header}
        ListEmptyComponent={empty}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        initialNumToRender={8}
        windowSize={7}
        renderItem={renderRow}
      />

      {undo ? (
        <View style={styles.undoBar}>
          <Text style={styles.undoText}>{t("Defterden temizlendi")}</Text>
          <Pressable onPress={undoLearned} hitSlop={10} accessibilityRole="button">
            <Text style={styles.undoAction}>{t("Geri al")}</Text>
          </Pressable>
        </View>
      ) : null}

      <Modal visible={session !== null} transparent animationType="fade" onRequestClose={() => setSession(null)}>
        <View style={styles.backdrop}>
          <View style={[styles.modalCard, shadow.card]}>
            <View style={styles.modalHeader}>
              <View style={styles.modalTitleRow}>
                <Ionicons name="flash" size={16} color={colors.brand} />
                <Text style={styles.modalTitle}>
                  {session && !finished && session.items.length > 1
                    ? t("Soru {{i}} / {{n}}", { i: session.index + 1, n: session.items.length })
                    : t("Hızlı Sınav")}
                </Text>
              </View>
              <Pressable onPress={() => setSession(null)} hitSlop={10} accessibilityRole="button" accessibilityLabel={t("Kapat")}>
                <Ionicons name="close" size={22} color={colors.textMuted} />
              </Pressable>
            </View>

            {session && current ? (
              <>
                <Text style={styles.modalPrompt}>{t("Hangisi doğru?")}</Text>
                <View style={{ gap: 10 }}>
                  {quizChoices(current, session.correctFirst[session.index]).map((c) => {
                    const answered = currentPick !== null;
                    const isRight = c.key === 'right';
                    const chosen = currentPick === c.key;
                    return (
                      <Pressable
                        key={c.key}
                        onPress={() => pick(c.key)}
                        disabled={answered}
                        style={[styles.choice, answered && isRight && styles.choiceRight, answered && chosen && !isRight && styles.choiceWrong]}
                        accessibilityRole="button"
                      >
                        <Text style={styles.choiceText}>{c.text}</Text>
                        {answered && isRight ? <Ionicons name="checkmark-circle" size={20} color="#059669" /> : null}
                        {answered && chosen && !isRight ? <Ionicons name="close-circle" size={20} color="#E11D48" /> : null}
                      </Pressable>
                    );
                  })}
                </View>

                {currentPick ? (
                  <View style={[styles.feedback, currentPick === 'right' ? styles.feedbackRight : styles.feedbackWrong]}>
                    <Text style={[styles.feedbackTitle, { color: currentPick === 'right' ? '#047857' : '#BE123C' }]}>
                      {currentPick === 'right' ? t("Doğru! 🎉") : t("Yanlış cevap")}
                    </Text>
                    {current.explanation_tr ? <Text style={styles.feedbackText}>{current.explanation_tr}</Text> : null}
                  </View>
                ) : null}

                {currentPick ? (
                  <Pressable onPress={next} style={styles.primaryBtn} accessibilityRole="button">
                    <Text style={styles.primaryBtnText}>{session.index + 1 < session.items.length ? t("Sonraki") : t("Bitir")}</Text>
                    <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
                  </Pressable>
                ) : null}
              </>
            ) : null}

            {session && finished ? (
              <>
                <Text style={styles.resultTitle}>{t("{{c}} / {{n}} doğru", { c: correctItems.length, n: session.items.length })}</Text>
                <Text style={styles.resultSub}>
                  {correctItems.length === session.items.length
                    ? t("Harika! Hepsini doğru bildin.")
                    : t("Yanlış bildiklerin defterde kalır, tekrar deneyebilirsin.")}
                </Text>
                {correctItems.length > 0 ? (
                  <Pressable onPress={clearMastered} style={styles.primaryBtn} accessibilityRole="button">
                    <Ionicons name="checkmark-circle" size={16} color="#FFFFFF" />
                    <Text style={styles.primaryBtnText}>{t("Doğru bildiklerimi temizle ({{n}})", { n: correctItems.length })}</Text>
                  </Pressable>
                ) : null}
                <Pressable onPress={() => setSession(null)} style={styles.secondaryBtn} accessibilityRole="button">
                  <Text style={styles.secondaryBtnText}>{t("Kapat")}</Text>
                </Pressable>
              </>
            ) : null}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    backdrop: { flex: 1, backgroundColor: 'rgba(15,23,42,0.5)', justifyContent: 'center', padding: spacing.md },
  centerLoading: { paddingVertical: 60, alignItems: 'center' },
  choice: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 14, borderRadius: radii.md, borderWidth: 1.5, borderColor: '#E2E8F0', backgroundColor: '#FFFFFF' },
  choiceRight: { borderColor: '#34D399', backgroundColor: '#ECFDF5' },
  choiceText: { flex: 1, fontFamily: fonts.bodyMedium, fontSize: 15, lineHeight: 21, color: colors.textHeading },
  choiceWrong: { borderColor: '#FB7185', backgroundColor: '#FFF1F2' },
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  emptyBtn: { flexDirection: 'row', alignItems: 'center', gap: 7, marginTop: 8, paddingHorizontal: 20, paddingVertical: 12, borderRadius: radii.pill, backgroundColor: colors.brand },
  emptyBtnText: { fontFamily: fonts.headingSemiBold, fontSize: 13.5, color: '#FFFFFF' },
  emptyCard: { alignItems: 'center', gap: 8, paddingVertical: 36, paddingHorizontal: spacing.lg },
  emptyImage: { width: 140, height: 140 },
  emptyText: { fontFamily: fonts.bodyRegular, fontSize: 13.5, lineHeight: 20, color: colors.textMuted, textAlign: 'center' },
  emptyTitle: { fontFamily: fonts.headingBold, fontSize: 17, color: colors.textHeading, textAlign: 'center' },
  feedback: { padding: 12, borderRadius: radii.sm, gap: 4 },
  feedbackRight: { backgroundColor: '#ECFDF5' },
  feedbackText: { fontFamily: fonts.bodyRegular, fontSize: 13, lineHeight: 19, color: colors.textBody },
  feedbackTitle: { fontFamily: fonts.headingBold, fontSize: 14 },
  feedbackWrong: { backgroundColor: '#FFF1F2' },
  listContent: { paddingBottom: 140 },
  modalCard: { padding: 18, borderRadius: radii.lg, backgroundColor: '#FFFFFF', gap: 14 },
  modalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  modalPrompt: { fontFamily: fonts.headingSemiBold, fontSize: 14.5, color: colors.textBody },
  modalTitle: { fontFamily: fonts.headingBold, fontSize: 15, color: colors.textHeading },
  modalTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  primaryBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7, paddingVertical: 13, borderRadius: radii.pill, backgroundColor: colors.brand },
  primaryBtnText: { fontFamily: fonts.headingSemiBold, fontSize: 14, color: '#FFFFFF' },
  resultSub: { fontFamily: fonts.bodyRegular, fontSize: 13.5, color: colors.textMuted, textAlign: 'center' },
  resultTitle: { fontFamily: fonts.headingBold, fontSize: 26, color: colors.textHeading, textAlign: 'center', marginTop: 4 },
  secondaryBtn: { alignItems: 'center', paddingVertical: 12, borderRadius: radii.pill, backgroundColor: '#F1F5F9' },
  secondaryBtnText: { fontFamily: fonts.headingSemiBold, fontSize: 14, color: colors.textBody },
  undoAction: { fontFamily: fonts.headingBold, fontSize: 13.5, color: '#A5B4FC' },
  undoBar: {
    position: 'absolute',
    left: spacing.md,
    right: spacing.md,
    bottom: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: radii.md,
    backgroundColor: colors.textHeading,
  },
  undoText: { fontFamily: fonts.bodyMedium, fontSize: 13.5, color: '#FFFFFF' },
  listHeader: { paddingHorizontal: spacing.md, paddingTop: 4, paddingBottom: 6, gap: 12 },

  hero: { borderRadius: 28, padding: 20, overflow: 'hidden', minHeight: 150, justifyContent: 'center' },
  heroBlob: { position: 'absolute', width: 180, height: 180, borderRadius: 90, backgroundColor: 'rgba(255,255,255,0.08)', right: -50, top: -60 },
  heroArt: { position: 'absolute', right: -4, top: 8, width: 104, height: 104 },
  heroText: { paddingRight: 80, gap: 8 },
  heroTitle: { fontFamily: fonts.headingBold, fontSize: 24, lineHeight: 30, color: '#FFFFFF' },
  heroSub: { fontFamily: fonts.bodyMedium, fontSize: 13, color: '#E0E7FF' },
  heroBtn: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#FFFFFF', borderRadius: radii.pill, paddingVertical: 12, paddingHorizontal: 18, borderBottomWidth: 4, borderBottomColor: '#C7D2FE', marginTop: 4 },
  heroBtnText: { fontFamily: fonts.headingBold, fontSize: 14, color: colors.brand },

  segment: { flexDirection: 'row', backgroundColor: '#EEF2F7', borderRadius: radii.pill, padding: 4 },
  segmentBtn: { flex: 1, alignItems: 'center', paddingVertical: 9, borderRadius: radii.pill },
  segmentBtnActive: { backgroundColor: '#FFFFFF', ...shadow.card },
  segmentText: { fontFamily: fonts.headingBold, fontSize: 13, color: colors.textMuted },
  segmentTextActive: { color: colors.brand },

  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: radii.pill, backgroundColor: '#FFFFFF', borderWidth: 2, borderColor: '#E2E8F0' },
  chipActive: { backgroundColor: colors.brand, borderColor: colors.brand },
  chipText: { fontFamily: fonts.headingBold, fontSize: 12.5, color: colors.textBody },
  chipCount: { color: colors.textMuted },
  chipTextActive: { color: '#FFFFFF' },

  groupHead: { flexDirection: 'row', alignItems: 'center', gap: 10, marginHorizontal: spacing.md, marginTop: 10, backgroundColor: '#FFFFFF', borderRadius: 18, padding: 14, borderWidth: 1, borderColor: '#EEF2FF' },
  groupHeadOpen: { borderColor: '#C7D2FE', backgroundColor: '#F5F7FF' },
  groupTitle: { fontFamily: fonts.headingBold, fontSize: 14.5, lineHeight: 19, color: colors.textHeading },
  groupSub: { fontFamily: fonts.bodyRegular, fontSize: 11.5, color: colors.textMuted, marginTop: 1 },
  groupCount: { minWidth: 26, height: 26, borderRadius: 13, paddingHorizontal: 8, backgroundColor: '#FEE2E2', alignItems: 'center', justifyContent: 'center' },
  groupCountText: { fontFamily: fonts.headingBold, fontSize: 12, color: '#BE123C' },
  groupLesson: { backgroundColor: '#EEF2FF', borderRadius: radii.pill, paddingHorizontal: 11, paddingVertical: 6 },
  groupLessonText: { fontFamily: fonts.headingBold, fontSize: 11.5, color: colors.brand },

  card: { marginHorizontal: spacing.md, marginTop: 8, backgroundColor: '#FFFFFF', borderRadius: 20, padding: 14, gap: 10, borderWidth: 1, borderColor: '#F1F5F9' },
  cardRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  lineRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  lineText: { flex: 1, fontFamily: fonts.bodyMedium, fontSize: 15, lineHeight: 21, color: colors.textHeading },
  chgWrong: { color: '#BE123C', backgroundColor: '#FFE4E6', fontFamily: fonts.headingBold },
  chgRight: { color: '#047857', backgroundColor: '#D1FAE5', fontFamily: fonts.headingBold },
  cardSide: { gap: 8 },
  sideBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#ECFDF5', alignItems: 'center', justifyContent: 'center' },
  sideBtnOk: { backgroundColor: '#10B981' },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  metaText: { fontFamily: fonts.bodyMedium, fontSize: 11.5, color: colors.textMuted },
  detail: { gap: 10 },
  explBox: { flexDirection: 'row', gap: 8, backgroundColor: '#FFFBEB', borderRadius: 14, padding: 12 },
  explText: { flex: 1, fontFamily: fonts.bodyRegular, fontSize: 13.5, lineHeight: 20, color: '#92400E' },
  quizBtn: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#EEF2FF', borderRadius: radii.pill, paddingHorizontal: 14, paddingVertical: 9 },
  quizBtnText: { fontFamily: fonts.headingBold, fontSize: 12.5, color: colors.brand },
  suggestBox: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#EEF2FF', borderRadius: 16, borderWidth: 1.5, borderColor: '#C7D2FE', padding: 12 },
  suggestIcon: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' },
  suggestLabel: { fontFamily: fonts.headingBold, fontSize: 10.5, letterSpacing: 0.6, color: colors.brand },
  suggestTitle: { fontFamily: fonts.headingBold, fontSize: 13.5, lineHeight: 18, color: colors.textHeading, marginTop: 1 },
});
