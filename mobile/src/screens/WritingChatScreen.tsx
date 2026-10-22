import Ionicons from '@expo/vector-icons/Ionicons';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Image, KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { mivoImages } from '../assets/images';
import { Button } from '../components/Button';
import { TypewriterText, TypingDots } from '../components/chat/ChatTyping';
import type { WritingTask } from '../data/writingTasks';
import type { WritingChat } from '../data/writingChats';
import { t } from '../i18n';
import { useAnalytics } from '../lib/analytics';
import { api, ApiError } from '../lib/api';
import { setLearningFlag } from '../lib/learningFlags';
import { stageOfLevel, STAGE_COLOR } from '../lib/stages';
import { countWords, toneVerdictLabel, type WritingFeedback } from '../lib/writingTypes';
import { localWritingProblem } from '../lib/writingGuard';
import { WRITING_DONE_PREFIX } from '../data/writingTasks';
import type { WritingTaskScreenProps } from '../navigation/types';
import { colors, fonts, radii, shadow, spacing } from '../theme/tokens';

/** `animate`: the other person's message is typed out letter by letter when it arrives. */
type Msg = { id: number; from: 'them' | 'me'; text: string; animate?: boolean };
type Phase = 'chat' | 'checking' | 'error' | 'done';

const TYPING_MS = 900;

type Props = {
  navigation: WritingTaskScreenProps['navigation'];
  task: WritingTask;
  chat: WritingChat;
};

/**
 * Başlangıç yazma görevi sohbet olarak: karşı taraf görevin her maddesini sırayla sorar, kullanıcı İngilizce cevap
 * yazar, son cevaptan sonra tüm cevaplar tek seferde Mivo'ya gider (POST /writing/check). Karşı tarafın cümleleri sabit.
 */
export function WritingChatScreen({ navigation, task, chat }: Props) {
  const analytics = useAnalytics();
  const accent = STAGE_COLOR[stageOfLevel(task.level)];
  const total = task.points.length;

  const [messages, setMessages] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(true);
  const [step, setStep] = useState(0);
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>('chat');
  const [feedback, setFeedback] = useState<WritingFeedback | null>(null);
  const [hintsOpen, setHintsOpen] = useState(false);
  const [revealingId, setRevealingId] = useState<number | null>(null);
  const afterRevealRef = useRef<(() => void) | null>(null);

  const scrollRef = useRef<ScrollView>(null);
  const idRef = useRef(0);
  const repliesRef = useRef<string[]>([]);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const later = useCallback((fn: () => void, ms: number) => {
    timersRef.current.push(setTimeout(fn, ms));
  }, []);
  useEffect(
    () => () => {
      timersRef.current.forEach(clearTimeout);
    },
    []
  );

  const addMessage = useCallback((from: Msg['from'], text: string, animate = false) => {
    idRef.current += 1;
    const id = idRef.current;
    setMessages((prev) => [...prev, { id, from, text, animate }]);
    return id;
  }, []);

  /** Karşı taraf önce "yazıyor" noktalarını gösterir, sonra mesajı harf harf yazılıyormuş gibi gelir. */
  const theySay = useCallback(
    (text: string, then?: () => void) => {
      setTyping(true);
      later(() => {
        setTyping(false);
        afterRevealRef.current = then ?? null;
        setRevealingId(addMessage('them', text, true));
      }, TYPING_MS);
    },
    [addMessage, later]
  );

  const onRevealDone = useCallback(() => {
    setRevealingId(null);
    const next = afterRevealRef.current;
    afterRevealRef.current = null;
    next?.();
  }, []);

  const scrollToEnd = useCallback(() => scrollRef.current?.scrollToEnd({ animated: false }), []);

  useEffect(() => {
    theySay(chat.lines[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages, typing, phase, feedback]);

  const runCheck = useCallback(
    async (replies: string[]) => {
      setPhase('checking');
      setError(null);
      try {
        const result = await api.post<WritingFeedback>('/writing/check', {
          task_id: task.id,
          text: replies.join('\n'),
          situation_en: `${task.situationEn} The learner wrote chat replies, one per line, answering these questions in order: ${chat.lines.join(' | ')}`,
          recipient_en: task.recipientEn,
          tone: task.tone,
          points: task.points,
          level: task.level,
        });
        setFeedback(result);
        setPhase('done');
        // The task only counts as done for a genuine attempt that covers most of its points.
        if (result.passed) void setLearningFlag(`${WRITING_DONE_PREFIX}${task.id}`);
        analytics.track('writing_checked', {
          task_id: task.id,
          level: task.level,
          mode: 'chat',
          tone_verdict: result.tone_verdict,
          passed: result.passed,
          corrections: result.corrections.length,
          words: replies.reduce((sum, r) => sum + countWords(r), 0),
        });
      } catch (err) {
        setError(err instanceof ApiError && err.status !== 502 ? err.message : t("Mivo şu an cevaplarına bakamadı. Birazdan tekrar dene."));
        setPhase('error');
      }
    },
    [analytics, chat.lines, task]
  );

  const send = () => {
    const text = input.trim();
    if (!text || typing || revealingId !== null || phase !== 'chat') return;
    if (countWords(text) < 2) {
      setError(t("Bir cümle yaz, tek kelime yetmez."));
      return;
    }
    // Obvious non-attempts never reach the server.
    const problem = localWritingProblem(text, task.example);
    if (problem === 'gibberish') {
      setError(t("Bu bir İngilizce metne benzemiyor. Gerçek cümlelerle yazmayı dene."));
      return;
    }
    if (problem === 'copy') {
      setError(t("Örnek metne çok benziyor. Kendi cümlelerinle yaz."));
      return;
    }
    setError(null);
    addMessage('me', text);
    setInput('');
    repliesRef.current = [...repliesRef.current, text];
    const next = step + 1;
    setStep(next);
    if (next < total) {
      theySay(chat.lines[next]);
    } else {
      // Last answer: the other person says goodbye, then Mivo reads everything (no extra button to press).
      theySay(chat.closing, () => later(() => void runCheck(repliesRef.current), 500));
    }
  };

  const restart = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    repliesRef.current = [];
    idRef.current = 0;
    afterRevealRef.current = null;
    setRevealingId(null);
    setMessages([]);
    setStep(0);
    setInput('');
    setError(null);
    setFeedback(null);
    setPhase('chat');
    theySay(chat.lines[0]);
  };

  const addToInput = (piece: string) => {
    setInput((cur) => (cur.trim() ? `${cur.trimEnd()} ${piece}` : piece));
    setHintsOpen(false);
  };

  const inChat = phase === 'chat';
  const currentGoal = task.points[Math.min(step, total - 1)];
  const busy = typing || revealingId !== null;
  const canSend = input.trim().length > 0 && !busy && inChat;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12} style={styles.backBtn} accessibilityRole="button" accessibilityLabel={t("Geri")}>
          <Ionicons name="chevron-back" size={22} color={colors.textHeading} />
        </Pressable>
        <View style={[styles.avatar, { backgroundColor: accent }]}>
          <Text style={styles.avatarText}>{chat.name.replace(/^(Mr\.|Mrs\.|Ms\.)\s*/, '').charAt(0)}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerName} numberOfLines={1}>
            {chat.name}
          </Text>
          <Text style={styles.headerSub} numberOfLines={1}>
            {task.recipient}
          </Text>
        </View>
        <View style={styles.dots}>
          {task.points.map((_, i) => (
            <View key={i} style={[styles.dot, i < step && { backgroundColor: colors.success }, i === step && inChat && { backgroundColor: accent }]} />
          ))}
        </View>
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView ref={scrollRef} contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <View style={styles.intro}>
            <Text style={styles.introTitle}>{task.title}</Text>
            <Text style={styles.introText}>{task.situation}</Text>
          </View>

          {messages.map((m) => (
            <View key={m.id} style={[styles.row, m.from === 'me' && styles.rowMe]}>
              <View style={[styles.bubble, m.from === 'me' ? [styles.bubbleMe, { backgroundColor: accent }] : styles.bubbleThem]}>
                {m.animate && m.id === revealingId ? (
                  <TypewriterText text={m.text} style={styles.bubbleText} onDone={onRevealDone} onGrow={scrollToEnd} />
                ) : (
                  <Text style={[styles.bubbleText, m.from === 'me' && styles.bubbleTextMe]}>{m.text}</Text>
                )}
              </View>
            </View>
          ))}

          {typing ? (
            <View style={styles.row}>
              <View style={[styles.bubble, styles.bubbleThem, styles.typingBubble]} accessibilityLabel={t("yazıyor…")}>
                <TypingDots color={accent} />
              </View>
            </View>
          ) : null}

          {phase === 'checking' ? (
            <View style={styles.mivoRow}>
              <Image source={mivoImages.thinking} style={styles.mivoImg} resizeMode="contain" />
              <ActivityIndicator color={colors.brand} />
              <Text style={styles.mivoText}>{t("Mivo okuyor…")}</Text>
            </View>
          ) : null}

          {phase === 'error' ? (
            <View style={styles.errorBox}>
              <Ionicons name="alert-circle-outline" size={18} color="#B45309" />
              <Text style={styles.errorBoxText}>{error}</Text>
              <Button label={t("Tekrar dene")} variant="chunky" onPress={() => void runCheck(repliesRef.current)} />
            </View>
          ) : null}

          {phase === 'done' && feedback ? (
            <View style={styles.feedbackWrap}>
              <View style={[styles.card, shadow.card]}>
                <Text style={styles.feedbackOverall}>{feedback.overall}</Text>
                {feedback.well_done.map((w) => (
                  <View key={w} style={styles.line}>
                    <Ionicons name="sparkles" size={14} color={colors.brand} />
                    <Text style={styles.lineText}>{w}</Text>
                  </View>
                ))}
              </View>

              <View style={[styles.card, shadow.card]}>
                {task.points.map((p, i) => {
                  const covered = feedback.points_covered[i];
                  return (
                    <View key={p} style={styles.line}>
                      <Ionicons name={covered ? 'checkmark-circle' : 'close-circle'} size={17} color={covered ? colors.success : colors.error} />
                      <Text style={styles.lineText}>{p}</Text>
                    </View>
                  );
                })}
              </View>

              <View style={[styles.card, shadow.card]}>
                <View style={styles.line}>
                  <Ionicons
                    name={feedback.tone_verdict === 'fits' ? 'happy-outline' : 'alert-circle-outline'}
                    size={18}
                    color={feedback.tone_verdict === 'fits' ? colors.success : '#D97706'}
                  />
                  <Text style={styles.toneTitle}>{toneVerdictLabel(feedback.tone_verdict)}</Text>
                </View>
                <Text style={styles.lineText}>{feedback.tone_note}</Text>
              </View>

              {feedback.corrections.length > 0 ? (
                <View style={[styles.card, shadow.card]}>
                  <Text style={styles.sectionTitle}>{t("Düzeltmeler")}</Text>
                  {feedback.corrections.map((c, i) => (
                    <View key={`${c.wrong}-${i}`} style={styles.correction}>
                      <Text style={styles.wrong}>{c.wrong}</Text>
                      <Text style={styles.corrected}>{c.corrected}</Text>
                      <Text style={styles.explanation}>{c.explanation}</Text>
                    </View>
                  ))}
                  <Text style={styles.notebookNote}>{t("Bu düzeltmeler Hatalarım Defteri'ne kaydedildi.")}</Text>
                </View>
              ) : null}

              <View style={[styles.card, shadow.card]}>
                <Text style={styles.sectionTitle}>{t("Mivo'nun doğal hali")}</Text>
                <Text style={styles.improved}>{feedback.improved_version}</Text>
              </View>

              {feedback.passed ? (
                <Button label={t("Bitti ✓")} variant="chunky" onPress={() => navigation.goBack()} />
              ) : (
                <>
                  <View style={styles.notDone}>
                    <Ionicons name="alert-circle-outline" size={18} color="#B45309" />
                    <Text style={styles.notDoneText}>
                      {t("Henüz tamamlanmadı. Görev, maddelerin çoğunu karşılayan gerçek cevaplarla biter. Baştan deneyebilirsin.")}
                    </Text>
                  </View>
                  <Button label={t("Baştan dene")} variant="chunky" onPress={restart} />
                </>
              )}
            </View>
          ) : null}
        </ScrollView>

        {inChat ? (
          <View style={styles.composer}>
            <View style={styles.goalRow}>
              <View style={[styles.goalPill, { backgroundColor: accent + '1A' }]}>
                <Text style={[styles.goalText, { color: accent }]} numberOfLines={2}>
                  {t("Şimdi: {{goal}}", { goal: currentGoal })}
                </Text>
              </View>
              <Pressable onPress={() => setHintsOpen(true)} style={styles.hintBtn} accessibilityRole="button" accessibilityLabel={t("İpucu")}>
                <Ionicons name="bulb" size={17} color="#B45309" />
                <Text style={styles.hintBtnText}>{t("İpucu")}</Text>
              </Pressable>
            </View>
            {error ? <Text style={styles.inputError}>{error}</Text> : null}
            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                value={input}
                onChangeText={(v) => {
                  setInput(v);
                  if (error) setError(null);
                }}
                placeholder={t("Cevabını İngilizce yaz…")}
                placeholderTextColor={colors.textMuted}
                multiline
                autoCorrect={false}
                maxLength={300}
                editable={!busy}
              />
              <Pressable onPress={send} disabled={!canSend} style={[styles.sendBtn, { backgroundColor: canSend ? accent : '#CBD5E1' }]} accessibilityRole="button" accessibilityLabel={t("Gönder")}>
                <Ionicons name="arrow-up" size={22} color="#FFFFFF" />
              </Pressable>
            </View>
          </View>
        ) : null}
      </KeyboardAvoidingView>

      <Modal visible={hintsOpen} transparent animationType="slide" onRequestClose={() => setHintsOpen(false)}>
        <Pressable style={styles.sheetBackdrop} onPress={() => setHintsOpen(false)}>
          <Pressable style={styles.sheet} onPress={() => {}}>
            <View style={styles.sheetGrab} />
            <Text style={styles.sheetTitle}>{t("İpucu")}</Text>
            <Text style={styles.tip}>{task.tip}</Text>
            {task.words.length > 0 ? (
              <>
                <Text style={styles.sheetLabel}>{t("Kelime çantası (dokun, metne eklensin):")}</Text>
                <View style={styles.chips}>
                  {task.words.map((w) => (
                    <Pressable key={w} onPress={() => addToInput(w)} style={styles.wordChip}>
                      <Text style={styles.wordChipText}>{w}</Text>
                    </Pressable>
                  ))}
                </View>
              </>
            ) : null}
            {task.starters.length > 0 ? (
              <>
                <Text style={styles.sheetLabel}>{t("Başlamak için dokun:")}</Text>
                <View style={styles.chips}>
                  {task.starters.map((st) => (
                    <Pressable key={st} onPress={() => addToInput(st)} style={styles.starterChip}>
                      <Text style={styles.starterChipText}>{st}</Text>
                    </Pressable>
                  ))}
                </View>
              </>
            ) : null}
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F1F5F9' },
  header: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: spacing.md, paddingVertical: 8, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  backBtn: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#F1F5F9', alignItems: 'center', justifyContent: 'center' },
  avatar: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontFamily: fonts.headingBold, fontSize: 17, color: '#FFFFFF' },
  headerName: { fontFamily: fonts.headingBold, fontSize: 15, color: colors.textHeading },
  headerSub: { fontFamily: fonts.bodyRegular, fontSize: 11.5, color: colors.textMuted },
  dots: { flexDirection: 'row', gap: 5 },
  dot: { width: 9, height: 9, borderRadius: 5, backgroundColor: '#CBD5E1' },

  scroll: { padding: spacing.md, paddingBottom: 24, gap: 10 },
  intro: { backgroundColor: '#FFFFFF', borderRadius: 18, padding: 14, gap: 4, marginBottom: 4 },
  introTitle: { fontFamily: fonts.headingBold, fontSize: 15, color: colors.textHeading },
  introText: { fontFamily: fonts.bodyRegular, fontSize: 13, lineHeight: 19, color: colors.textBody },

  row: { flexDirection: 'row' },
  rowMe: { justifyContent: 'flex-end' },
  bubble: { maxWidth: '82%', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 10 },
  bubbleThem: { backgroundColor: '#FFFFFF', borderBottomLeftRadius: 6, borderWidth: 1, borderColor: '#E2E8F0' },
  bubbleMe: { borderBottomRightRadius: 6 },
  bubbleText: { fontFamily: fonts.bodyMedium, fontSize: 15.5, lineHeight: 22, color: colors.textHeading },
  bubbleTextMe: { color: '#FFFFFF' },
  typingBubble: { paddingVertical: 14, paddingHorizontal: 16 },
  dotsRow: { flexDirection: 'row', alignItems: 'center', gap: 5, height: 10 },
  typingDot: { width: 8, height: 8, borderRadius: 4 },

  mivoRow: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#FFFFFF', borderRadius: 18, padding: 12, alignSelf: 'center', marginTop: 6 },
  mivoImg: { width: 40, height: 40 },
  mivoText: { fontFamily: fonts.headingSemiBold, fontSize: 13.5, color: colors.textBody },
  errorBox: { backgroundColor: '#FFFBEB', borderRadius: 18, borderWidth: 1.5, borderColor: '#FDE68A', padding: 14, gap: 10 },
  errorBoxText: { fontFamily: fonts.bodyMedium, fontSize: 13.5, lineHeight: 20, color: '#92400E' },

  composer: { backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#E2E8F0', paddingHorizontal: spacing.md, paddingTop: 10, paddingBottom: 10, gap: 8 },
  goalRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  goalPill: { flex: 1, borderRadius: 14, paddingHorizontal: 12, paddingVertical: 8 },
  goalText: { fontFamily: fonts.headingSemiBold, fontSize: 12.5, lineHeight: 17 },
  hintBtn: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: '#FFFBEB', borderWidth: 1.5, borderColor: '#FDE68A', borderRadius: radii.pill, paddingHorizontal: 12, paddingVertical: 9 },
  hintBtnText: { fontFamily: fonts.headingBold, fontSize: 12.5, color: '#B45309' },
  inputError: { fontFamily: fonts.bodyMedium, fontSize: 12.5, color: colors.error },
  inputRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 8 },
  input: { flex: 1, maxHeight: 110, backgroundColor: '#F8FAFC', borderWidth: 2, borderColor: '#E2E8F0', borderRadius: 22, paddingHorizontal: 16, paddingTop: 11, paddingBottom: 11, fontFamily: fonts.bodyRegular, fontSize: 15.5, color: colors.textHeading },
  sendBtn: { width: 46, height: 46, borderRadius: 23, alignItems: 'center', justifyContent: 'center' },

  feedbackWrap: { gap: 12, marginTop: 8 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 14, gap: 8, borderWidth: 1, borderColor: '#F1F5F9' },
  feedbackOverall: { fontFamily: fonts.headingSemiBold, fontSize: 15, lineHeight: 22, color: colors.textHeading },
  line: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  lineText: { flex: 1, fontFamily: fonts.bodyRegular, fontSize: 14, lineHeight: 20, color: colors.textBody },
  toneTitle: { fontFamily: fonts.headingBold, fontSize: 14, color: colors.textHeading },
  sectionTitle: { fontFamily: fonts.headingBold, fontSize: 14.5, color: colors.textHeading },
  correction: { gap: 2, paddingVertical: 4 },
  wrong: { fontFamily: fonts.bodyMedium, fontSize: 14, color: '#BE123C', textDecorationLine: 'line-through' },
  corrected: { fontFamily: fonts.headingBold, fontSize: 14.5, color: '#047857' },
  explanation: { fontFamily: fonts.bodyRegular, fontSize: 12.5, lineHeight: 18, color: colors.textMuted },
  notebookNote: { fontFamily: fonts.bodyRegular, fontSize: 12, color: colors.textMuted, marginTop: 4 },
  improved: { fontFamily: fonts.bodyMedium, fontSize: 15, lineHeight: 22, color: colors.textHeading },
  notDone: { flexDirection: 'row', gap: 8, backgroundColor: '#FFFBEB', borderRadius: 14, padding: 12 },
  notDoneText: { flex: 1, fontFamily: fonts.bodyMedium, fontSize: 13, lineHeight: 19, color: '#92400E' },

  sheetBackdrop: { flex: 1, backgroundColor: 'rgba(15,23,42,0.5)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: '#FFFFFF', borderTopLeftRadius: 26, borderTopRightRadius: 26, padding: spacing.lg, paddingBottom: spacing.xl, gap: 10 },
  sheetGrab: { alignSelf: 'center', width: 42, height: 5, borderRadius: 3, backgroundColor: '#E2E8F0', marginBottom: 4 },
  sheetTitle: { fontFamily: fonts.headingBold, fontSize: 18, color: colors.textHeading },
  tip: { fontFamily: fonts.bodyMedium, fontSize: 14, lineHeight: 21, color: '#92400E', backgroundColor: '#FFFBEB', borderRadius: 14, padding: 12 },
  sheetLabel: { fontFamily: fonts.headingSemiBold, fontSize: 12.5, color: colors.textMuted, marginTop: 4 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  wordChip: { backgroundColor: '#EEF2FF', borderRadius: radii.pill, paddingHorizontal: 13, paddingVertical: 8 },
  wordChipText: { fontFamily: fonts.headingSemiBold, fontSize: 13.5, color: colors.brand },
  starterChip: { backgroundColor: '#ECFDF5', borderRadius: radii.pill, paddingHorizontal: 13, paddingVertical: 8 },
  starterChipText: { fontFamily: fonts.headingSemiBold, fontSize: 13.5, color: '#047857' },
});
