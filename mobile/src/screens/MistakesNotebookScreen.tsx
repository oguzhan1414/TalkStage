import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, Image, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { findGrammarLesson } from '@talkstage/shared-data/grammarLessons';
import { stateImages } from '../assets/images';
import { BouncyPressable } from '../components/BouncyPressable';
import { MivoLoader } from '../components/MivoLoader';
import { useMivoTransition } from '../components/MivoTransitionOverlay';
import { api } from '../lib/api';
import type { MistakesNotebookScreenProps } from '../navigation/types';
import { colors, fonts, radii, shadow, spacing } from '../theme/tokens';
import type { GrammarMistakeOut } from '../types/api';
import { getLocale, t } from '../i18n';

type Filter = 'all' | 'speaking' | 'quiz' | 'reading';

const QUIZ_LENGTH = 5;
const UNDO_MS = 4500;
const DAY_MS = 86_400_000;

function groupOf(source: string | null | undefined): Exclude<Filter, 'all'> {
  if (source === 'voice_session' || source === 'voice_free_chat' || source === 'text_chat') return 'speaking';
  if (source === 'sentence_order') return 'reading';
  return 'quiz';
}

const GROUP_META: Record<Exclude<Filter, 'all'>, { label: string; icon: keyof typeof Ionicons.glyphMap; color: string; soft: string }> = {
  speaking: { label: t("Konuşma"), icon: 'mic', color: '#E11D48', soft: '#FFF1F2' },
  quiz: { label: t("Quiz"), icon: 'create', color: '#4F46E5', soft: '#EEF2FF' },
  reading: { label: t("Okuma"), icon: 'book', color: '#059669', soft: '#ECFDF5' },
};

function isGrammarLessonCode(code: string): boolean {
  return /^[ABC][12]_G\d+$/i.test(code);
}

/** Rule label shown to the user: the lesson title when we know it, never a raw code like A1_G01. */
function ruleTitle(code: string): string {
  return findGrammarLesson(code)?.title ?? code;
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

type QuizSession = {
  items: GrammarMistakeOut[];
  index: number;
  /** order of the two options for each question (true = correct sentence first) */
  correctFirst: boolean[];
  picked: ('right' | 'wrong' | null)[];
};

type CardProps = {
  item: GrammarMistakeOut;
  onQuiz: (item: GrammarMistakeOut) => void;
  onLesson: (code: string) => void;
  onLearned: (item: GrammarMistakeOut) => void;
};

const MistakeCard = memo(function MistakeCard({ item, onQuiz, onLesson, onLearned }: CardProps) {
  const [open, setOpen] = useState(false);
  const group = GROUP_META[groupOf(item.source)];
  const code = item.topic_code && isGrammarLessonCode(item.topic_code) ? item.topic_code : null;
  const time = timeLabel(item.created_at);
  const longExplanation = (item.explanation_tr?.length ?? 0) > 110;

  return (
    <View style={[styles.card, shadow.card]}>
      <View style={styles.cardMeta}>
        <View style={[styles.sourceChip, { backgroundColor: group.soft }]}>
          <Ionicons name={group.icon} size={12} color={group.color} />
          <Text style={[styles.sourceChipText, { color: group.color }]}>{group.label}</Text>
        </View>
        {time ? <Text style={styles.timeText}>{time}</Text> : null}
        <View style={{ flex: 1 }} />
        {code ? (
          <Pressable onPress={() => onLesson(code)} style={styles.ruleChip} hitSlop={6} accessibilityRole="link">
            <Ionicons name="book-outline" size={12} color={colors.brand} />
            <Text style={styles.ruleChipText} numberOfLines={1}>
              {ruleTitle(code)}
            </Text>
          </Pressable>
        ) : null}
      </View>

      <View style={styles.diffWrong}>
        <Ionicons name="close-circle" size={18} color="#E11D48" />
        <Text style={styles.wrongText}>{item.wrong_text}</Text>
      </View>
      <View style={styles.diffRight}>
        <Ionicons name="checkmark-circle" size={18} color="#059669" />
        <Text style={styles.rightText}>{item.corrected_text}</Text>
      </View>

      {item.explanation_tr ? (
        <View style={styles.explBox}>
          <Ionicons name="bulb-outline" size={15} color="#B45309" style={{ marginTop: 2 }} />
          <View style={{ flex: 1 }}>
            <Text style={styles.explText} numberOfLines={open || !longExplanation ? undefined : 2}>
              {item.explanation_tr}
            </Text>
            {longExplanation ? (
              <Pressable onPress={() => setOpen((v) => !v)} hitSlop={8}>
                <Text style={styles.moreText}>{open ? t("Gizle") : t("Devamını göster")}</Text>
              </Pressable>
            ) : null}
          </View>
        </View>
      ) : null}

      <View style={styles.actions}>
        <Pressable onPress={() => onQuiz(item)} style={styles.quizBtn} accessibilityRole="button">
          <Ionicons name="flash-outline" size={15} color={colors.brand} />
          <Text style={styles.quizBtnText}>{t("Kendini sına")}</Text>
        </Pressable>
        <View style={{ flex: 1 }} />
        <Pressable onPress={() => onLearned(item)} style={styles.learnedBtn} hitSlop={6} accessibilityRole="button">
          <Ionicons name="checkmark-circle" size={16} color={colors.success} />
          <Text style={styles.learnedBtnText}>{t("Öğrendim")}</Text>
        </Pressable>
      </View>
    </View>
  );
});

export function MistakesNotebookScreen({ navigation }: MistakesNotebookScreenProps) {
  const { finishTransition } = useMivoTransition();
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<Filter>('all');
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
  const visible = useMemo(() => (filter === 'all' ? all : all.filter((m) => groupOf(m.source) === filter)), [all, filter]);

  const counts = useMemo(() => {
    const c = { all: all.length, speaking: 0, quiz: 0, reading: 0 };
    for (const m of all) c[groupOf(m.source)] += 1;
    return c;
  }, [all]);

  const newThisWeek = useMemo(
    () => all.filter((m) => m.created_at && Date.now() - new Date(m.created_at).getTime() < 7 * DAY_MS).length,
    [all]
  );

  const topRules = useMemo(() => {
    const map = new Map<string, number>();
    for (const m of all) {
      if (m.topic_code && isGrammarLessonCode(m.topic_code)) map.set(m.topic_code, (map.get(m.topic_code) ?? 0) + 1);
    }
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]).slice(0, 6);
  }, [all]);

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
      <View style={[styles.summary, shadow.card]}>
        <View style={{ flex: 1 }}>
          <Text style={styles.summaryNumber}>{all.length}</Text>
          <Text style={styles.summaryLabel}>{t("tekrar edilecek hata")}</Text>
          {all.length > 0 ? (
            <Text style={styles.summarySub}>{newThisWeek > 0 ? t("Bu hafta {{n}} yeni", { n: newThisWeek }) : t("Bu hafta yeni hata yok 👏")}</Text>
          ) : null}
        </View>
        {all.length > 0 ? (
          <BouncyPressable onPress={startSessionQuiz} hapticType="medium" scaleTo={0.96} style={styles.quizCtaWrap}>
            <LinearGradient colors={['#4F46E5', '#7C3AED']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.quizCta}>
              <Ionicons name="flash" size={18} color="#FFFFFF" />
              <Text style={styles.quizCtaText}>{t("Hızlı Sınav")}</Text>
              <Text style={styles.quizCtaSub}>{t("{{n}} soru", { n: Math.min(QUIZ_LENGTH, visible.length) })}</Text>
            </LinearGradient>
          </BouncyPressable>
        ) : null}
      </View>

      {topRules.length > 0 ? (
        <View>
          <Text style={styles.sectionTitle}>{t("En çok tekrarlanan kurallar")}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.ruleScroll}>
            {topRules.map(([code, count]) => (
              <Pressable key={code} onPress={() => openLesson(code)} style={styles.ruleCard} accessibilityRole="link">
                <Text style={styles.ruleCardTitle} numberOfLines={2}>
                  {ruleTitle(code)}
                </Text>
                <View style={styles.ruleCardFoot}>
                  <Text style={styles.ruleCardCount}>{t("{{count}} hata", { count })}</Text>
                  <Ionicons name="arrow-forward" size={13} color={colors.brand} />
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      ) : null}

      {all.length > 0 ? (
        <View style={styles.filterRow}>
          {(['all', 'speaking', 'quiz', 'reading'] as Filter[]).map((f) => {
            const active = filter === f;
            const label = f === 'all' ? t("Tümü") : GROUP_META[f].label;
            return (
              <Pressable
                key={f}
                onPress={() => setFilter(f)}
                style={[styles.filterChip, active && styles.filterChipActive]}
                accessibilityRole="button"
                accessibilityState={{ selected: active }}
              >
                <Text style={[styles.filterText, active && styles.filterTextActive]}>
                  {label} <Text style={[styles.filterCount, active && styles.filterTextActive]}>{counts[f]}</Text>
                </Text>
              </Pressable>
            );
          })}
        </View>
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
        {filter === 'all'
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12} style={styles.backBtn} accessibilityRole="button" accessibilityLabel={t("Geri")}>
          <Ionicons name="arrow-back" size={20} color={colors.textHeading} />
        </Pressable>
        <View style={styles.headerTitleCol}>
          <Text style={styles.headerTitle}>{t("Hata Defterim")}</Text>
          <Text style={styles.headerSub}>{t("Kişisel Zayıf Noktalar & Düzeltmeler")}</Text>
        </View>
      </View>

      <FlatList
        data={visible}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={header}
        ListEmptyComponent={empty}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        initialNumToRender={6}
        windowSize={7}
        renderItem={({ item }) => <MistakeCard item={item} onQuiz={startSingleQuiz} onLesson={openLesson} onLearned={markLearned} />}
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
                        style={[
                          styles.choice,
                          answered && isRight && styles.choiceRight,
                          answered && chosen && !isRight && styles.choiceWrong,
                        ]}
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
                    <Text style={styles.primaryBtnText}>
                      {session.index + 1 < session.items.length ? t("Sonraki") : t("Bitir")}
                    </Text>
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
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backBtn: { width: 36, height: 36, borderRadius: radii.pill, backgroundColor: '#F1F5F9', alignItems: 'center', justifyContent: 'center' },
  headerTitleCol: { flex: 1, marginLeft: 12 },
  headerTitle: { fontFamily: fonts.headingBold, fontSize: 16.5, color: colors.textHeading },
  headerSub: { fontFamily: fonts.bodyRegular, fontSize: 11.5, color: colors.textMuted, marginTop: 1 },

  listContent: { paddingBottom: 140 },
  listHeader: { paddingHorizontal: spacing.md, paddingTop: spacing.md, gap: 16, paddingBottom: 4 },

  summary: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 18, borderRadius: radii.lg, backgroundColor: '#FFFFFF' },
  summaryNumber: { fontFamily: fonts.headingBold, fontSize: 38, lineHeight: 42, color: colors.textHeading },
  summaryLabel: { fontFamily: fonts.headingSemiBold, fontSize: 13.5, color: colors.textBody },
  summarySub: { fontFamily: fonts.bodyRegular, fontSize: 12, color: colors.textMuted, marginTop: 3 },
  quizCtaWrap: { alignSelf: 'center' },
  quizCta: { alignItems: 'center', gap: 2, paddingHorizontal: 20, paddingVertical: 14, borderRadius: radii.md },
  quizCtaText: { fontFamily: fonts.headingBold, fontSize: 14.5, color: '#FFFFFF' },
  quizCtaSub: { fontFamily: fonts.bodyMedium, fontSize: 11, color: 'rgba(255,255,255,0.85)' },

  sectionTitle: { fontFamily: fonts.headingBold, fontSize: 14, color: colors.textHeading, marginBottom: 8 },
  ruleScroll: { gap: 10, paddingRight: spacing.md },
  ruleCard: { width: 168, padding: 12, borderRadius: radii.md, backgroundColor: '#FFFFFF', borderWidth: 1.5, borderColor: '#E0E7FF', gap: 10 },
  ruleCardTitle: { fontFamily: fonts.headingSemiBold, fontSize: 13, lineHeight: 17, color: colors.textHeading, minHeight: 34 },
  ruleCardFoot: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  ruleCardCount: { fontFamily: fonts.bodyMedium, fontSize: 11.5, color: colors.textMuted },

  filterRow: { flexDirection: 'row', gap: 8 },
  filterChip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: radii.pill, backgroundColor: '#EEF2F7' },
  filterChipActive: { backgroundColor: colors.textHeading },
  filterText: { fontFamily: fonts.headingSemiBold, fontSize: 12.5, color: colors.textBody },
  filterTextActive: { color: '#FFFFFF' },
  filterCount: { fontFamily: fonts.bodyMedium, color: colors.textMuted },

  card: { marginHorizontal: spacing.md, marginTop: 12, padding: 14, borderRadius: radii.md, backgroundColor: '#FFFFFF', gap: 10 },
  cardMeta: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  sourceChip: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 9, paddingVertical: 4, borderRadius: radii.pill },
  sourceChipText: { fontFamily: fonts.headingSemiBold, fontSize: 11 },
  timeText: { fontFamily: fonts.bodyRegular, fontSize: 11.5, color: colors.textMuted },
  ruleChip: { flexDirection: 'row', alignItems: 'center', gap: 4, maxWidth: 170, paddingHorizontal: 9, paddingVertical: 4, borderRadius: radii.pill, backgroundColor: '#EEF2FF' },
  ruleChipText: { flexShrink: 1, fontFamily: fonts.headingSemiBold, fontSize: 11, color: colors.brand },

  diffWrong: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, padding: 11, borderRadius: radii.sm, backgroundColor: '#FFF1F2' },
  wrongText: { flex: 1, fontFamily: fonts.bodyMedium, fontSize: 15, lineHeight: 21, color: '#9F1239', textDecorationLine: 'line-through', textDecorationColor: '#FDA4AF' },
  diffRight: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, padding: 11, borderRadius: radii.sm, backgroundColor: '#ECFDF5' },
  rightText: { flex: 1, fontFamily: fonts.headingSemiBold, fontSize: 15, lineHeight: 21, color: '#065F46' },

  explBox: { flexDirection: 'row', gap: 8, padding: 11, borderRadius: radii.sm, backgroundColor: '#FFFBEB' },
  explText: { fontFamily: fonts.bodyRegular, fontSize: 13, lineHeight: 19, color: '#78350F' },
  moreText: { fontFamily: fonts.headingSemiBold, fontSize: 12, color: '#B45309', marginTop: 4 },

  actions: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  quizBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 14, paddingVertical: 9, borderRadius: radii.pill, backgroundColor: '#EEF2FF' },
  quizBtnText: { fontFamily: fonts.headingSemiBold, fontSize: 12.5, color: colors.brand },
  learnedBtn: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingVertical: 9, paddingHorizontal: 6 },
  learnedBtnText: { fontFamily: fonts.headingSemiBold, fontSize: 12.5, color: '#059669' },

  centerLoading: { paddingVertical: 60, alignItems: 'center' },
  emptyCard: { alignItems: 'center', gap: 8, paddingVertical: 36, paddingHorizontal: spacing.lg },
  emptyImage: { width: 140, height: 140 },
  emptyTitle: { fontFamily: fonts.headingBold, fontSize: 17, color: colors.textHeading, textAlign: 'center' },
  emptyText: { fontFamily: fonts.bodyRegular, fontSize: 13.5, lineHeight: 20, color: colors.textMuted, textAlign: 'center' },
  emptyBtn: { flexDirection: 'row', alignItems: 'center', gap: 7, marginTop: 8, paddingHorizontal: 20, paddingVertical: 12, borderRadius: radii.pill, backgroundColor: colors.brand },
  emptyBtnText: { fontFamily: fonts.headingSemiBold, fontSize: 13.5, color: '#FFFFFF' },

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
  undoAction: { fontFamily: fonts.headingBold, fontSize: 13.5, color: '#A5B4FC' },

  backdrop: { flex: 1, backgroundColor: 'rgba(15,23,42,0.5)', justifyContent: 'center', padding: spacing.md },
  modalCard: { padding: 18, borderRadius: radii.lg, backgroundColor: '#FFFFFF', gap: 14 },
  modalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  modalTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  modalTitle: { fontFamily: fonts.headingBold, fontSize: 15, color: colors.textHeading },
  modalPrompt: { fontFamily: fonts.headingSemiBold, fontSize: 14.5, color: colors.textBody },
  choice: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 14, borderRadius: radii.md, borderWidth: 1.5, borderColor: '#E2E8F0', backgroundColor: '#FFFFFF' },
  choiceRight: { borderColor: '#34D399', backgroundColor: '#ECFDF5' },
  choiceWrong: { borderColor: '#FB7185', backgroundColor: '#FFF1F2' },
  choiceText: { flex: 1, fontFamily: fonts.bodyMedium, fontSize: 15, lineHeight: 21, color: colors.textHeading },
  feedback: { padding: 12, borderRadius: radii.sm, gap: 4 },
  feedbackRight: { backgroundColor: '#ECFDF5' },
  feedbackWrong: { backgroundColor: '#FFF1F2' },
  feedbackTitle: { fontFamily: fonts.headingBold, fontSize: 14 },
  feedbackText: { fontFamily: fonts.bodyRegular, fontSize: 13, lineHeight: 19, color: colors.textBody },
  primaryBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7, paddingVertical: 13, borderRadius: radii.pill, backgroundColor: colors.brand },
  primaryBtnText: { fontFamily: fonts.headingSemiBold, fontSize: 14, color: '#FFFFFF' },
  secondaryBtn: { alignItems: 'center', paddingVertical: 12, borderRadius: radii.pill, backgroundColor: '#F1F5F9' },
  secondaryBtnText: { fontFamily: fonts.headingSemiBold, fontSize: 14, color: colors.textBody },
  resultTitle: { fontFamily: fonts.headingBold, fontSize: 26, color: colors.textHeading, textAlign: 'center', marginTop: 4 },
  resultSub: { fontFamily: fonts.bodyRegular, fontSize: 13.5, color: colors.textMuted, textAlign: 'center' },
});
