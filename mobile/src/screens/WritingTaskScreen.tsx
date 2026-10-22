import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '../components/Button';
import { useMivoTransition } from '../components/MivoTransitionOverlay';
import { findWritingChat } from '../data/writingChats';
import { findWritingTask, toneLabel, WRITING_DONE_PREFIX } from '../data/writingTasks';
import { t } from '../i18n';
import { useAnalytics, useTrackScreenView } from '../lib/analytics';
import { api, ApiError } from '../lib/api';
import { setLearningFlag } from '../lib/learningFlags';
import { localWritingProblem } from '../lib/writingGuard';
import { countWords, toneVerdictLabel, type WritingFeedback } from '../lib/writingTypes';
import { stageOfLevel, stageTitle, STAGE_COLOR } from '../lib/stages';
import type { WritingTaskScreenProps } from '../navigation/types';
import { WritingChatScreen } from './WritingChatScreen';
import { colors, fonts, radii, shadow, spacing } from '../theme/tokens';

/** Single-text writing task: one real-life text, checked by Mivo for English and tone (POST /writing/check). */
function WritingFormScreen({ navigation, route }: WritingTaskScreenProps) {
  useTrackScreenView('writing_task_viewed', { task_id: route.params.taskId });
  const analytics = useAnalytics();
  const task = useMemo(() => findWritingTask(route.params.taskId), [route.params.taskId]);
  const [text, setText] = useState('');
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<WritingFeedback | null>(null);
  // Beginners see the hints open; higher levels start with them folded.
  const [hintsOpen, setHintsOpen] = useState(() => (task ? task.level === 'A1' || task.level === 'A2' : false));
  const [exampleOpen, setExampleOpen] = useState(false);

  if (!task) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.missing}>{t("Bu yazma görevi bulunamadı.")}</Text>
        <Button label={t("Geri dön")} onPress={() => navigation.goBack()} />
      </SafeAreaView>
    );
  }

  const words = countWords(text);
  const tooShort = words < task.minWords;
  const tooLong = words > task.maxWords;
  const stage = stageOfLevel(task.level);
  const accent = STAGE_COLOR[stage];
  const progress = Math.min(1, words / task.maxWords);
  const minMark = task.minWords / task.maxWords;
  const barColor = tooLong ? '#D97706' : tooShort ? accent : colors.success;
  const addToText = (piece: string) => setText((cur) => (cur.trim() ? `${cur.trimEnd()} ${piece}` : piece));

  const submit = async () => {
    if (tooShort || checking) return;
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
    setChecking(true);
    setError(null);
    try {
      const result = await api.post<WritingFeedback>('/writing/check', {
        task_id: task.id,
        text: text.trim(),
        situation_en: task.situationEn,
        recipient_en: task.recipientEn,
        tone: task.tone,
        points: task.points,
        level: task.level,
      });
      setFeedback(result);
      // The task only counts as done for a genuine attempt that covers most of its points.
      if (result.passed) void setLearningFlag(`${WRITING_DONE_PREFIX}${task.id}`);
      analytics.track('writing_checked', {
        task_id: task.id,
        level: task.level,
        tone_verdict: result.tone_verdict,
        passed: result.passed,
        corrections: result.corrections.length,
        words,
      });
    } catch (err) {
      setError(
        err instanceof ApiError && err.status !== 502
          ? err.message
          : t("Mivo şu an metnine bakamadı. Birazdan tekrar dene.")
      );
    } finally {
      setChecking(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={20} color={colors.textHeading} />
        </Pressable>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {t("Gerçek mesaj yaz")}
        </Text>
        <View style={styles.backBtn} />
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <View style={[styles.card, shadow.card, { borderColor: accent + '55' }]}>
            <View style={styles.tagRow}>
              <View style={[styles.stageTag, { backgroundColor: accent + '1A' }]}>
                <Text style={[styles.stageTagText, { color: accent }]}>
                  {stageTitle(stage)} · {task.level}
                </Text>
              </View>
              {task.review ? (
                <View style={styles.reviewTag}>
                  <Ionicons name="ribbon-outline" size={12} color="#B45309" />
                  <Text style={styles.reviewTagText}>{t("Aşama özeti")}</Text>
                </View>
              ) : null}
            </View>
            <Text style={styles.title}>{task.title}</Text>
            <Text style={styles.situation}>{task.situation}</Text>

            <View style={styles.briefRow}>
              <View style={styles.briefTile}>
                <Ionicons name="person-outline" size={14} color={accent} />
                <Text style={styles.briefLabel}>{t("Kime")}</Text>
                <Text style={styles.briefValue} numberOfLines={2}>
                  {task.recipient}
                </Text>
              </View>
              <View style={styles.briefTile}>
                <Ionicons name="chatbubble-ellipses-outline" size={14} color={accent} />
                <Text style={styles.briefLabel}>{t("Ton")}</Text>
                <Text style={styles.briefValue}>{toneLabel(task.tone)}</Text>
              </View>
              <View style={styles.briefTile}>
                <Ionicons name="create-outline" size={14} color={accent} />
                <Text style={styles.briefLabel}>{t("Uzunluk")}</Text>
                <Text style={styles.briefValue}>{t("{{min}}-{{max}} kelime", { min: task.minWords, max: task.maxWords })}</Text>
              </View>
            </View>

            <Text style={styles.pointsLabel}>{t("Metninde şunlar olsun:")}</Text>
            {task.points.map((p, i) => {
              const covered = feedback?.points_covered[i];
              return (
                <View key={p} style={styles.pointRow}>
                  <Ionicons
                    name={covered === undefined ? 'ellipse-outline' : covered ? 'checkmark-circle' : 'close-circle'}
                    size={16}
                    color={covered === undefined ? colors.textMuted : covered ? colors.success : colors.error}
                  />
                  <Text style={styles.pointText}>{p}</Text>
                </View>
              );
            })}
          </View>

          {!feedback ? (
            <View style={[styles.hintsCard, shadow.card]}>
              <Pressable onPress={() => setHintsOpen((v) => !v)} style={styles.hintsHeader} accessibilityRole="button">
                <Ionicons name="bulb-outline" size={18} color="#B45309" />
                <Text style={styles.hintsTitle}>{t("İpuçları")}</Text>
                <Ionicons name={hintsOpen ? 'chevron-up' : 'chevron-down'} size={18} color={colors.textMuted} />
              </Pressable>
              {hintsOpen ? (
                <View style={styles.hintsBody}>
                  <Text style={styles.tipText}>{task.tip}</Text>

                  {task.words.length > 0 ? (
                    <>
                      <Text style={styles.startersLabel}>{t("Kelime çantası (dokun, metne eklensin):")}</Text>
                      <View style={styles.starters}>
                        {task.words.map((w) => (
                          <Pressable
                            key={w}
                            onPress={() => addToText(w)}
                            style={({ pressed }) => [styles.wordChip, pressed && { opacity: 0.6 }]}
                          >
                            <Text style={styles.wordText}>{w}</Text>
                          </Pressable>
                        ))}
                      </View>
                    </>
                  ) : null}

                  {task.starters.length > 0 ? (
                    <>
                      <Text style={styles.startersLabel}>{t("Başlamak için dokun:")}</Text>
                      <View style={styles.starters}>
                        {task.starters.map((st) => (
                          <Pressable
                            key={st}
                            onPress={() => addToText(st)}
                            style={({ pressed }) => [styles.starterChip, pressed && { opacity: 0.6 }]}
                          >
                            <Text style={styles.starterText}>{st}</Text>
                          </Pressable>
                        ))}
                      </View>
                    </>
                  ) : null}

                  <Pressable onPress={() => setExampleOpen((v) => !v)} style={styles.exampleToggle} accessibilityRole="button">
                    <Ionicons name={exampleOpen ? 'eye-off-outline' : 'eye-outline'} size={16} color={colors.brand} />
                    <Text style={styles.exampleToggleText}>
                      {exampleOpen ? t("Örnek metni gizle") : t("Örnek metni göster")}
                    </Text>
                  </Pressable>
                  {exampleOpen ? (
                    <View style={styles.exampleBox}>
                      <Text style={styles.exampleText}>{task.example}</Text>
                      <Text style={styles.exampleNote}>{t("Ezberleme; kendi cümlelerinle yaz.")}</Text>
                    </View>
                  ) : null}
                </View>
              ) : null}
            </View>
          ) : null}

          <TextInput
            style={styles.input}
            multiline
            value={text}
            onChangeText={(v) => {
              setText(v);
              if (feedback) setFeedback(null);
            }}
            placeholder={t("Mesajını İngilizce yaz…")}
            placeholderTextColor={colors.textMuted}
            textAlignVertical="top"
            autoCorrect={false}
            maxLength={1500}
          />
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progress * 100}%`, backgroundColor: barColor }]} />
            <View style={[styles.progressMark, { left: `${minMark * 100}%` }]} />
          </View>
          <Text style={[styles.counter, (tooShort || tooLong) && text.length > 0 && styles.counterWarn]}>
            {t("{{n}} kelime", { n: words })}
            {tooShort && text.length > 0 ? ` · ${t("biraz daha yaz")}` : ''}
            {tooLong ? ` · ${t("biraz kısalt")}` : ''}
          </Text>

          {error ? <Text style={styles.error}>{error}</Text> : null}

          {!feedback ? (
            <Button
              label={checking ? t("Mivo okuyor…") : t("Mivo'ya gönder")}
              variant="chunky"
              disabled={tooShort || checking}
              onPress={submit}
            />
          ) : (
            <View style={styles.feedbackWrap}>
              <View style={[styles.card, shadow.card]}>
                <Text style={styles.feedbackOverall}>{feedback.overall}</Text>
                {feedback.well_done.map((w) => (
                  <View key={w} style={styles.pointRow}>
                    <Ionicons name="sparkles" size={14} color={colors.brand} />
                    <Text style={styles.pointText}>{w}</Text>
                  </View>
                ))}
              </View>

              <View style={[styles.card, shadow.card]}>
                <View style={styles.toneRow}>
                  <Ionicons
                    name={feedback.tone_verdict === 'fits' ? 'happy-outline' : 'alert-circle-outline'}
                    size={18}
                    color={feedback.tone_verdict === 'fits' ? colors.success : '#D97706'}
                  />
                  <Text style={styles.toneTitle}>{toneVerdictLabel(feedback.tone_verdict)}</Text>
                </View>
                <Text style={styles.pointText}>{feedback.tone_note}</Text>
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
                <>
                  <Button label={t("Bitti ✓")} variant="chunky" onPress={() => navigation.goBack()} />
                  <Button label={t("Düzenleyip tekrar gönder")} variant="ghost" onPress={() => setFeedback(null)} />
                </>
              ) : (
                <>
                  <View style={styles.notDone}>
                    <Ionicons name="alert-circle-outline" size={18} color="#B45309" />
                    <Text style={styles.notDoneText}>
                      {t("Henüz tamamlanmadı. Görev, maddelerin çoğunu karşılayan gerçek bir denemeyle biter. Metnini düzeltip tekrar gönder.")}
                    </Text>
                  </View>
                  <Button label={t("Düzenleyip tekrar gönder")} variant="chunky" onPress={() => setFeedback(null)} />
                </>
              )}
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.backgroundSecondary },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  backBtn: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontFamily: fonts.headingBold, fontSize: 16, color: colors.textHeading },
  scroll: { padding: spacing.lg, gap: spacing.md, paddingBottom: 48 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.lg,
    borderWidth: 1.5,
    borderColor: '#E0E7FF',
    padding: spacing.md,
    gap: 6,
  },
  tagRow: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  stageTag: { borderRadius: radii.pill, paddingHorizontal: 10, paddingVertical: 4 },
  stageTagText: { fontFamily: fonts.headingBold, fontSize: 11, letterSpacing: 0.4 },
  reviewTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FEF3C7',
    borderRadius: radii.pill,
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  reviewTagText: { fontFamily: fonts.headingBold, fontSize: 11, color: '#B45309' },
  briefRow: { flexDirection: 'row', gap: 8, marginTop: 6 },
  briefTile: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: radii.md,
    padding: 9,
    gap: 2,
  },
  briefLabel: { fontFamily: fonts.mono, fontSize: 9.5, color: colors.textMuted, textTransform: 'uppercase' },
  briefValue: { fontFamily: fonts.headingSemiBold, fontSize: 12, color: colors.textHeading, lineHeight: 16 },
  hintsCard: {
    backgroundColor: '#FFFBEB',
    borderRadius: radii.lg,
    borderWidth: 1.5,
    borderColor: '#FDE68A',
    overflow: 'hidden',
  },
  hintsHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: spacing.md },
  hintsTitle: { flex: 1, fontFamily: fonts.headingBold, fontSize: 14, color: '#92400E' },
  hintsBody: { paddingHorizontal: spacing.md, paddingBottom: spacing.md, gap: 8 },
  tipText: { fontFamily: fonts.bodyRegular, fontSize: 13, color: '#78350F', lineHeight: 19 },
  wordChip: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FCD34D',
    borderRadius: radii.pill,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  wordText: { fontFamily: fonts.bodyRegular, fontSize: 12.5, color: '#92400E' },
  exampleToggle: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 4 },
  exampleToggleText: { fontFamily: fonts.headingSemiBold, fontSize: 13, color: colors.brand },
  exampleBox: { backgroundColor: '#FFFFFF', borderRadius: radii.md, padding: spacing.md, gap: 6 },
  exampleText: { fontFamily: fonts.bodyRegular, fontSize: 14, color: colors.textHeading, lineHeight: 21 },
  exampleNote: { fontFamily: fonts.bodyRegular, fontSize: 11.5, color: colors.textMuted },
  progressTrack: { height: 6, borderRadius: 3, backgroundColor: '#E2E8F0', overflow: 'hidden' },
  progressFill: { height: 6, borderRadius: 3 },
  progressMark: { position: 'absolute', top: 0, bottom: 0, width: 2, backgroundColor: '#64748B' },
  title: { fontFamily: fonts.headingBold, fontSize: 17, color: colors.textHeading },
  situation: { fontFamily: fonts.bodyRegular, fontSize: 13, color: colors.textBody, lineHeight: 19 },
  pointsLabel: { fontFamily: fonts.headingSemiBold, fontSize: 12, color: colors.textHeading, marginTop: 4 },
  pointRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 6 },
  pointText: { flex: 1, fontFamily: fonts.bodyRegular, fontSize: 12.5, color: colors.textBody, lineHeight: 18 },
  range: { fontFamily: fonts.bodyRegular, fontSize: 11, color: colors.textMuted, marginTop: 2 },
  startersWrap: { gap: 6 },
  startersLabel: { fontFamily: fonts.headingSemiBold, fontSize: 12, color: colors.textHeading },
  starters: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  starterChip: {
    backgroundColor: '#F0FDFA',
    borderWidth: 1,
    borderColor: '#99F6E4',
    borderRadius: radii.pill,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  starterText: { fontFamily: fonts.bodyRegular, fontSize: 12.5, color: '#0F766E' },
  input: {
    minHeight: 160,
    backgroundColor: '#FFFFFF',
    borderRadius: radii.lg,
    borderWidth: 1.5,
    borderColor: colors.border,
    padding: spacing.md,
    fontFamily: fonts.bodyRegular,
    fontSize: 15,
    color: colors.textHeading,
    lineHeight: 21,
  },
  counter: { fontFamily: fonts.bodyRegular, fontSize: 11.5, color: colors.textMuted, marginTop: -6 },
  counterWarn: { color: '#D97706' },
  error: { fontFamily: fonts.bodyRegular, fontSize: 12, color: colors.error },
  feedbackWrap: { gap: spacing.md },
  feedbackOverall: { fontFamily: fonts.headingSemiBold, fontSize: 14, color: colors.textHeading, lineHeight: 20 },
  toneRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  toneTitle: { fontFamily: fonts.headingSemiBold, fontSize: 13.5, color: colors.textHeading },
  sectionTitle: { fontFamily: fonts.headingBold, fontSize: 14, color: colors.textHeading },
  correction: { paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: '#F1F5F9', gap: 2 },
  wrong: { fontFamily: fonts.bodyRegular, fontSize: 13, color: colors.error, textDecorationLine: 'line-through' },
  corrected: { fontFamily: fonts.headingSemiBold, fontSize: 13.5, color: colors.success },
  explanation: { fontFamily: fonts.bodyRegular, fontSize: 12, color: colors.textMuted, lineHeight: 17 },
  notebookNote: { fontFamily: fonts.bodyRegular, fontSize: 11, color: colors.textMuted, marginTop: 4 },
  improved: { fontFamily: fonts.bodyRegular, fontSize: 14, color: colors.textHeading, lineHeight: 21 },
  notDone: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: '#FFFBEB',
    borderWidth: 1.5,
    borderColor: '#FDE68A',
    borderRadius: radii.lg,
    padding: spacing.md,
  },
  notDoneText: { flex: 1, fontFamily: fonts.headingSemiBold, fontSize: 13, lineHeight: 19, color: '#92400E' },
  missing: { fontFamily: fonts.bodyRegular, fontSize: 14, color: colors.textBody, margin: spacing.lg },
});

/** Başlangıç görevleri sohbet olarak ilerler (karşı tarafın soruları sabit); diğerleri tek metin yazar. */
export function WritingTaskScreen(props: WritingTaskScreenProps) {
  // Both writing screens show local content at once: release the Mivo transition on mount (the chat screen
  // missing this kept the transition on screen until its safety timeout).
  const { finishTransition } = useMivoTransition();
  useEffect(() => {
    finishTransition();
  }, [finishTransition]);
  const task = findWritingTask(props.route.params.taskId);
  const chat = task ? findWritingChat(task.id) : undefined;
  if (task && chat) return <WritingChatScreen navigation={props.navigation} task={task} chat={chat} />;
  return <WritingFormScreen {...props} />;
}
