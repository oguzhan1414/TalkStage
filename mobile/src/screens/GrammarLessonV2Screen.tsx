import Ionicons from '@expo/vector-icons/Ionicons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { findGrammarV2Lesson, type GrammarV2Lesson } from '@talkstage/shared-data/grammarV2';
import { voiceSceneForTopic } from '@talkstage/shared-data/voiceScenes';

import { mivoHomeImages, mivoImages } from '../assets/images';
import { ExerciseCard, type ExerciseOutcome } from '../components/grammarV2/ExerciseCard';
import { useMivoTransition } from '../components/MivoTransitionOverlay';
import { fillVars, Inline, MiniMarkdown, type LessonVars } from '../components/grammarV2/MiniMarkdown';
import { Button } from '../components/Button';
import { Toast } from '../components/Toast';
import { usePronunciation } from '../hooks/usePronunciation';
import { getLocale, t } from '../i18n';
import { useAnalytics, useTrackScreenView } from '../lib/analytics';
import { api } from '../lib/api';
import { isLessonFree } from '../lib/lessonAccess';
import { setLearningFlag } from '../lib/learningFlags';
import { isProUser } from '../lib/revenuecat';
import { postQueued } from '../lib/outbox';
import { voiceSceneRoomParams } from '../lib/voiceSceneLaunch';
import type { GrammarLessonScreenProps } from '../navigation/types';
import { cefrAura, colors, fonts, radii, shadow, spacing } from '../theme/tokens';
import type { GrammarMistakeCreate, ProfileOut } from '../types/api';

/** City and country in the lesson examples follow the app language (no onboarding question): a learner who
 * picked Turkish gets İstanbul / Turkey, German gets Berlin / Germany, and so on. Country names stay English
 * because they sit inside English sentences ("I'm from Turkey"). */
const LOCALE_PLACES: Record<string, { city: string; country: string }> = {
  tr: { city: 'Istanbul', country: 'Turkey' },
  de: { city: 'Berlin', country: 'Germany' },
  es: { city: 'Madrid', country: 'Spain' },
  pt: { city: 'São Paulo', country: 'Brazil' },
  en: { city: 'London', country: 'the UK' },
};
const DEFAULT_NAME = 'Alex';

type SectionKey = 'rule' | 'dialogue' | 'practice' | 'mivo' | 'scene';

// ---------- içerik ayrıştırıcıları (md biçimi: docs/gramer-icerikleri.md) ----------

/** A rule's first line holding formulas ("`Özne + am/is/are + …`", maybe with short labels between them)
 * becomes the formula box; the tables and notes after it stay Markdown. */
function splitRule(rule: string): { formula: string | null; rest: string } {
  const [first, ...rest] = rule.split('\n');
  if (/`[^`]+`/.test(first) && !first.startsWith('|') && !first.startsWith('**')) {
    return { formula: first, rest: rest.join('\n').trim() };
  }
  return { formula: null, rest: rule };
}

/** Formula line: code parts bright, the short labels between them dimmed. */
function FormulaLine({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`)/g).filter((p) => p.trim());
  return (
    <View style={styles.formula}>
      {parts.map((p, i) =>
        p.startsWith('`') ? (
          <Text key={i} style={styles.formulaText}>
            {p.slice(1, -1)}
          </Text>
        ) : (
          <Text key={i} style={styles.formulaLabel}>
            {p.replace(/^[\s·]+|[\s·]+$/g, '')}
          </Text>
        )
      )}
    </View>
  );
}

type UsageItem = { title: string; examples: string[] };
/** "- **Başlık:** örnek 1 · örnek 2" maddeleri → kartlar. Bu kalıba uymayan satırlar `rest`te kalır. */
function parseUsage(usage: string): { items: UsageItem[]; rest: string } {
  const items: UsageItem[] = [];
  const rest: string[] = [];
  for (const line of usage.split('\n')) {
    const m = line.match(/^- \*\*(.+?):\*\*\s*(.+)$/);
    if (m) items.push({ title: m[1], examples: m[2].split(/\s+·\s+/).map((e) => e.trim()).filter(Boolean) });
    else rest.push(line);
  }
  return { items, rest: rest.join('\n').trim() };
}

// ---------- küçük yapı taşları ----------

function Section({
  icon,
  title,
  accent = colors.brand,
  tint = '#EEF2FF',
  children,
  onLayout,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  accent?: string;
  tint?: string;
  children: ReactNode;
  onLayout?: (y: number) => void;
}) {
  return (
    <View style={[styles.section, shadow.card]} onLayout={onLayout ? (e) => onLayout(e.nativeEvent.layout.y) : undefined}>
      <View style={styles.sectionHead}>
        <View style={[styles.sectionIcon, { backgroundColor: tint }]}>
          <Ionicons name={icon} size={16} color={accent} />
        </View>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      {children}
    </View>
  );
}

/** The new-curriculum grammar lesson: what you will learn and the rule first, then example, practice and use. */
export function GrammarLessonV2Screen({ route, navigation }: GrammarLessonScreenProps) {
  const lesson = findGrammarV2Lesson(route.params.code) as GrammarV2Lesson;
  const { finishTransition } = useMivoTransition();
  // Local content: ready on the first frame, so the Mivo transition never has to cover this screen.
  useEffect(() => {
    finishTransition();
  }, [finishTransition]);
  useTrackScreenView('grammar_lesson_viewed', { code: lesson.code, version: 2 });
  const analytics = useAnalytics();
  const queryClient = useQueryClient();
  const { pronounce, isPlaying, stop } = usePronunciation();
  const { data: profile } = useQuery({ queryKey: ['me'], queryFn: () => api.get<ProfileOut>('/me') });
  const { data: isPro, isLoading: proLoading } = useQuery({ queryKey: ['isProUser'], queryFn: isProUser, staleTime: 60_000 });
  const locked = !isLessonFree(lesson.code) && !proLoading && !isPro;

  const locale = getLocale();
  const vars: LessonVars = useMemo(
    () => ({
      ...(LOCALE_PLACES[locale] ?? LOCALE_PLACES.en),
      name: profile?.display_name?.trim().split(/\s+/)[0] || DEFAULT_NAME,
    }),
    [profile?.display_name, locale]
  );
  const [playing, setPlaying] = useState<string | null>(null);
  const [outcomes, setOutcomes] = useState<ExerciseOutcome[]>([]);
  const [finished, setFinished] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const scrollRef = useRef<ScrollView>(null);
  const positions = useRef<Partial<Record<SectionKey, number>>>({});

  const aura = cefrAura[lesson.level] ?? colors.brand;
  const scene = voiceSceneForTopic(lesson.code);
  const nativeNote = lesson.native[locale as 'tr'];
  const exercises = lesson.exercises;
  const rule = useMemo(() => splitRule(lesson.rule), [lesson.rule]);
  const usage = useMemo(() => parseUsage(lesson.usage), [lesson.usage]);
  // General mistakes for everyone; language-specific ones only for speakers of that language.
  const mistakeItems = lesson.mistakes.items.filter((m) => m.langs.length === 0 || m.langs.includes(locale as 'tr'));
  const hasSpoken = exercises.some((e) => e.kind === 'spoken');
  const minutes = Math.max(5, Math.round(4 + exercises.length * 1.2));

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2600);
  };

  const say = (key: string, text: string) => {
    if (playing === key && isPlaying) {
      stop();
      setPlaying(null);
      return;
    }
    setPlaying(key);
    void pronounce(fillVars(text, vars).replace(/\*\*/g, '').replace(/[*`]/g, ''));
  };

  const jump = (key: SectionKey) => {
    const y = positions.current[key];
    if (y !== undefined) scrollRef.current?.scrollTo({ y: Math.max(0, y - 12), animated: true });
  };
  const at = (key: SectionKey) => (y: number) => {
    positions.current[key] = y;
  };

  const completeLesson = (all: ExerciseOutcome[]) => {
    setFinished(true);
    setLearningFlag(`lesson_quiz_done_${lesson.code}`);
    const firstTry = all.filter((o) => o.result === 'correct' && o.firstTry).length;
    analytics.track('grammar_lesson_completed', { code: lesson.code, version: 2, first_try: firstTry, total: all.length });
    postQueued('/progress/log-practice')
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ['me'] });
        queryClient.invalidateQueries({ queryKey: ['progress'] });
      })
      .catch(() => {});
  };

  const onExerciseDone = (i: number, outcome: ExerciseOutcome) => {
    const ex = exercises[i];
    if (outcome.result === 'revealed' && ex.kind !== 'spoken' && outcome.answer) {
      const right =
        ex.kind === 'choice' ? ex.correct.join(' / ') : ex.kind === 'order' ? ex.answer : ex.kind === 'text' ? ex.answers.join(' / ') : '';
      api
        .post('/progress/mistakes', {
          topic_code: lesson.code,
          wrong_text: `${fillVars(ex.prompt, vars)} → ${outcome.answer}`.slice(0, 500),
          corrected_text: fillVars(right, vars) || fillVars(ex.prompt, vars),
          explanation_tr: fillVars(ex.explain, vars) || null,
          source: 'mini_quiz',
        } satisfies GrammarMistakeCreate)
        .then(() => queryClient.invalidateQueries({ queryKey: ['grammar-mistakes'] }))
        .catch(() => {});
    }
    setOutcomes((prev) => {
      const next = [...prev];
      next[i] = outcome;
      return next;
    });
  };

  useEffect(() => {
    if (!finished && exercises.length > 0 && outcomes.filter(Boolean).length === exercises.length) completeLesson(outcomes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [outcomes]);

  const openMivo = () => {
    navigation.navigate('FreeChatRoom', {
      focusTopic: { title: lesson.title, formula: lesson.target || undefined, topicCode: lesson.code },
    });
  };
  const openScene = () => {
    if (scene) void voiceSceneRoomParams(scene).then((params) => navigation.navigate('FreeChatRoom', params));
  };
  const finishUnit = () => {
    setLearningFlag(`lesson_quiz_done_${lesson.code}`);
    setFinished(true);
    showToast(t("Ünite tamamlandı ✓"));
  };

  const answeredCount = outcomes.filter(Boolean).length;
  const firstTryCount = outcomes.filter((o) => o?.result === 'correct' && o.firstTry).length;
  const visibleExercises = Math.min(exercises.length, answeredCount + 1);

  const steps: { key: SectionKey; label: string; icon: keyof typeof Ionicons.glyphMap; done?: boolean }[] = [
    { key: 'rule', label: t("Kural"), icon: 'construct-outline' },
    { key: 'dialogue', label: t("Örnek"), icon: 'chatbubbles-outline' },
    { key: 'practice', label: t("Alıştırma"), icon: 'create-outline', done: finished },
    { key: 'mivo', label: 'Mivo', icon: 'sparkles-outline' },
    { key: 'scene', label: t("Sahne"), icon: 'mic-outline' },
  ];

  if (locked) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.lockedHead}>
          <Pressable onPress={() => navigation.goBack()} hitSlop={12} accessibilityRole="button">
            <Ionicons name="arrow-back" size={22} color={colors.textHeading} />
          </Pressable>
        </View>
        <View style={[styles.lockedCard, shadow.card]}>
          <Image source={mivoImages.thinking} style={styles.lockedMivo} resizeMode="contain" />
          <Text style={styles.lockedTitle}>{lesson.title}</Text>
          <Text style={styles.lockedHeading}>{t("Bu ders Pro'da açılıyor")}</Text>
          <Text style={styles.lockedBody}>
            {t("Kural, örnek diyalog, sık yapılan hatalar ve alıştırmalar Spekvia Pro ile açılır. Her seviyenin ilk dersi ücretsiz, A1'de ilk iki ders.")}
          </Text>
          <Button label={t("Pro'ya Geç ➔")} variant="chunky" onPress={() => navigation.navigate('Paywall')} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView ref={scrollRef} contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        {/* ---------- Başlık ---------- */}
        <LinearGradient colors={[aura, '#4F46E5']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.hero}>
          <View style={styles.heroTop}>
            <Pressable onPress={() => navigation.goBack()} hitSlop={12} style={styles.heroBack}>
              <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
            </Pressable>
            <View style={styles.heroPill}>
              <Text style={styles.heroPillText}>
                {lesson.level} · {lesson.kind === 'unit' ? t("Uygulama ünitesi") : t("Konu {{no}}", { no: lesson.no })}
              </Text>
            </View>
          </View>
          <View style={styles.heroBody}>
            <View style={{ flex: 1, gap: 6 }}>
              <Text style={styles.heroTitle}>{lesson.title}</Text>
              {lesson.target ? <Text style={styles.heroTarget}>{lesson.target}</Text> : null}
            </View>
            <Image source={mivoHomeImages.lessonGuide} style={styles.heroMivo} resizeMode="contain" />
          </View>
          {lesson.kind === 'lesson' ? (
            <View style={styles.heroMeta}>
              <View style={styles.metaItem}>
                <Ionicons name="time-outline" size={13} color="#E0E7FF" />
                <Text style={styles.metaText}>{t("~{{n}} dk", { n: minutes })}</Text>
              </View>
              <View style={styles.metaItem}>
                <Ionicons name="create-outline" size={13} color="#E0E7FF" />
                <Text style={styles.metaText}>{t("{{n}} alıştırma", { n: exercises.length })}</Text>
              </View>
              {hasSpoken ? (
                <View style={styles.metaItem}>
                  <Ionicons name="mic-outline" size={13} color="#E0E7FF" />
                  <Text style={styles.metaText}>{t("sesli soru")}</Text>
                </View>
              ) : null}
            </View>
          ) : null}
        </LinearGradient>

        {/* ---------- Bu derste öğreneceklerin ---------- */}
        <View style={[styles.learnCard, shadow.card]}>
          <Text style={styles.learnTitle}>{t("Bu derste öğreneceklerin")}</Text>
          {lesson.learn.map((item, i) => (
            <View key={i} style={styles.learnRow}>
              <View style={[styles.learnNo, { backgroundColor: aura }]}>
                <Text style={styles.learnNoText}>{i + 1}</Text>
              </View>
              <Inline text={fillVars(item, vars)} style={styles.learnText} />
            </View>
          ))}
          <View style={styles.goalBox}>
            <Ionicons name="flag" size={14} color="#047857" />
            <Text style={styles.goalText}>
              <Text style={styles.goalLead}>{t("Dersin sonunda: ")}</Text>
              {fillVars(lesson.goal, vars)}
            </Text>
          </View>
          {lesson.intro ? (
            <View style={styles.introBox}>
              <Ionicons name="help-circle" size={15} color={colors.brand} />
              <Inline text={fillVars(lesson.intro, vars)} style={styles.introText} />
            </View>
          ) : null}
        </View>

        {lesson.kind === 'lesson' ? (
          <View style={styles.steps}>
            {steps.map((s, i) => (
              <Pressable key={s.key} onPress={() => jump(s.key)} style={styles.step}>
                <View style={[styles.stepDot, s.done && styles.stepDotDone]}>
                  <Ionicons name={s.done ? 'checkmark' : s.icon} size={13} color={s.done ? '#FFFFFF' : colors.brand} />
                </View>
                <Text style={styles.stepText}>{s.label}</Text>
                {i < steps.length - 1 ? <View style={styles.stepLine} /> : null}
              </Pressable>
            ))}
          </View>
        ) : null}

        {lesson.kind === 'unit' ? (
          <>
            {lesson.body ? (
              <Section icon="document-text-outline" title={t("Görev")}>
                <MiniMarkdown text={lesson.body} vars={vars} />
              </Section>
            ) : null}
            <Pressable onPress={openMivo} style={styles.bigBtn}>
              <Ionicons name="chatbubbles" size={18} color="#FFFFFF" />
              <Text style={styles.bigBtnText}>{t("Mivo ile uygula")}</Text>
            </Pressable>
            {!finished ? (
              <Pressable onPress={finishUnit} style={styles.ghostBtn}>
                <Text style={styles.ghostBtnText}>{t("Üniteyi tamamladım")}</Text>
              </Pressable>
            ) : null}
          </>
        ) : (
          <>
            {/* ---------- Ana kural ---------- */}
            <Section icon="construct-outline" title={t("Ana kural")} onLayout={at('rule')}>
              {rule.formula ? <FormulaLine text={rule.formula} /> : null}
              {rule.rest ? <MiniMarkdown text={rule.rest} vars={vars} /> : null}
            </Section>

            {/* ---------- Diyalog ---------- */}
            {lesson.dialogue.lines.length > 0 ? (
              <Section
                icon="chatbubbles-outline"
                title={t("Örnek diyalog: {{title}}", { title: lesson.dialogue.title })}
                accent="#0EA5E9"
                tint="#E0F2FE"
                onLayout={at('dialogue')}
              >
                <View style={{ gap: 10 }}>
                  {lesson.dialogue.lines.map((line, i) => {
                    const mine = line.speaker === 'user';
                    const key = `d${i}`;
                    const active = playing === key && isPlaying;
                    return (
                      <View key={key} style={[styles.dRow, mine && styles.dRowMine]}>
                        {!mine ? (
                          line.speaker === 'Mivo' ? (
                            <Image source={mivoImages.idle} style={styles.avatarImg} />
                          ) : (
                            <View style={[styles.avatar, { backgroundColor: '#FCE7F3' }]}>
                              <Text style={[styles.avatarText, { color: '#BE185D' }]}>{line.speaker[0]}</Text>
                            </View>
                          )
                        ) : null}
                        <Pressable
                          onPress={() => say(key, line.text)}
                          style={[styles.bubble, mine ? styles.bubbleMine : styles.bubbleOther, active && styles.bubbleActive]}
                        >
                          <Text style={[styles.bubbleName, mine && { color: '#C7D2FE' }]}>{mine ? vars.name : line.speaker}</Text>
                          <DialogueText text={line.text} vars={vars} mine={mine} />
                          <Ionicons
                            name={active ? 'pause' : 'volume-medium'}
                            size={13}
                            color={mine ? '#C7D2FE' : '#0EA5E9'}
                            style={{ alignSelf: 'flex-end' }}
                          />
                        </Pressable>
                        {mine ? (
                          <View style={[styles.avatar, { backgroundColor: colors.brand }]}>
                            <Text style={[styles.avatarText, { color: '#FFFFFF' }]}>{vars.name[0]?.toUpperCase()}</Text>
                          </View>
                        ) : null}
                      </View>
                    );
                  })}
                </View>
                {lesson.notice ? (
                  <View style={styles.noticeBox}>
                    <View style={styles.noticeHead}>
                      <Ionicons name="eye" size={14} color="#7C3AED" />
                      <Text style={styles.noticeTitle}>{t("Fark et")}</Text>
                    </View>
                    <MiniMarkdown text={lesson.notice} vars={vars} />
                  </View>
                ) : null}
              </Section>
            ) : null}

            {/* ---------- Ne zaman kullanılır ---------- */}
            {lesson.usage ? (
              <Section icon="bulb-outline" title={t("Ne zaman kullanılır?")} accent="#D97706" tint="#FEF3C7">
                {usage.items.map((u, i) => (
                  <View key={i} style={styles.useCard}>
                    <Text style={styles.useTitle}>{fillVars(u.title, vars)}</Text>
                    {u.examples.map((ex, j) => {
                      const key = `u${i}-${j}`;
                      return (
                        <Pressable key={key} onPress={() => say(key, ex)} style={styles.useRow}>
                          <Ionicons name={playing === key && isPlaying ? 'pause-circle' : 'play-circle'} size={18} color="#D97706" />
                          <Inline text={fillVars(ex, vars)} style={styles.useText} />
                        </Pressable>
                      );
                    })}
                  </View>
                ))}
                {usage.rest ? <MiniMarkdown text={usage.rest} vars={vars} /> : null}
              </Section>
            ) : null}

            {/* ---------- Ana dilinle fark ---------- */}
            {nativeNote ? (
              <View style={[styles.nativeCard, shadow.card]}>
                <View style={styles.nativeHead}>
                  <Ionicons name="language" size={16} color="#B45309" />
                  <Text style={styles.nativeTitle}>{t("Ana dilinle fark")}</Text>
                </View>
                <MiniMarkdown text={nativeNote} vars={vars} />
              </View>
            ) : null}

            {/* ---------- Sık hatalar ---------- */}
            {mistakeItems.length > 0 || lesson.mistakes.rest ? (
              <Section icon="warning-outline" title={t("Sık yapılan hatalar")} accent={colors.error} tint="#FFE4E6">
                {mistakeItems.map((m, i) => (
                  <View key={i} style={styles.mCard}>
                    <View style={styles.mLine}>
                      <Ionicons name="close-circle" size={16} color={colors.error} />
                      <Inline text={fillVars(m.wrong, vars)} style={styles.mWrong} />
                    </View>
                    <View style={styles.mLine}>
                      <Ionicons name="checkmark-circle" size={16} color={colors.success} />
                      <Inline text={fillVars(m.right, vars)} style={styles.mRight} />
                    </View>
                    {m.why ? (
                      <Text style={styles.mNote}>
                        <Text style={styles.mNoteLead}>{t("Neden karışır? ")}</Text>
                        {fillVars(m.why, vars)}
                      </Text>
                    ) : null}
                    {m.remember ? (
                      <View style={styles.mRemember}>
                        <Ionicons name="bookmark" size={12} color={colors.brand} />
                        <Text style={styles.mRememberText}>{fillVars(m.remember, vars)}</Text>
                      </View>
                    ) : null}
                  </View>
                ))}
                {lesson.mistakes.rest ? <MiniMarkdown text={lesson.mistakes.rest} vars={vars} /> : null}
              </Section>
            ) : null}

            {/* ---------- Alıştırma ---------- */}
            {exercises.length > 0 ? (
              <View style={{ gap: spacing.sm }} onLayout={(e) => at('practice')(e.nativeEvent.layout.y)}>
                <View style={styles.practiceHead}>
                  <View style={[styles.sectionIcon, { backgroundColor: '#EEF2FF' }]}>
                    <Ionicons name="create-outline" size={16} color={colors.brand} />
                  </View>
                  <Text style={styles.sectionTitle}>{t("Alıştırma")}</Text>
                  <Text style={styles.practiceCount}>
                    {answeredCount}/{exercises.length}
                  </Text>
                </View>
                <View style={styles.progressTrack}>
                  <View style={[styles.progressFill, { width: `${(answeredCount / exercises.length) * 100}%`, backgroundColor: aura }]} />
                </View>
                {exercises.slice(0, visibleExercises).map((ex, i) => (
                  <ExerciseCard
                    key={`${lesson.code}-${i}`}
                    index={i}
                    total={exercises.length}
                    exercise={ex}
                    lesson={{ code: lesson.code, title: lesson.title, target: lesson.target }}
                    vars={vars}
                    onDone={(o) => onExerciseDone(i, o)}
                  />
                ))}
              </View>
            ) : null}

            {finished ? (
              <View style={[styles.doneCard, shadow.card]}>
                <Image source={mivoImages.success} style={styles.doneMivo} resizeMode="contain" />
                <View style={{ flex: 1, gap: 4 }}>
                  <Text style={styles.doneTitle}>{t("Dersi bitirdin!")}</Text>
                  <Text style={styles.doneText}>
                    {t("{{n}}/{{total}} soruyu ilk denemede bildin.", { n: firstTryCount, total: exercises.length })}
                  </Text>
                  <Text style={styles.doneText}>{t("Şimdi Mivo ile konuşarak kullan.")}</Text>
                </View>
              </View>
            ) : null}

            {/* ---------- Mivo ---------- */}
            {lesson.mivo ? (
              <View style={[styles.mivoCard, shadow.card]} onLayout={(e) => at('mivo')(e.nativeEvent.layout.y)}>
                <View style={styles.mivoTop}>
                  <Image source={mivoHomeImages.chatInvite} style={styles.mivoImg} resizeMode="contain" />
                  <View style={{ flex: 1, gap: 4 }}>
                    <Text style={styles.mivoTitle}>{t("Mivo ile 2 dakika")}</Text>
                    <MiniMarkdown text={lesson.mivo} vars={vars} />
                  </View>
                </View>
                <Pressable onPress={openMivo} style={styles.bigBtn}>
                  <Ionicons name="mic" size={18} color="#FFFFFF" />
                  <Text style={styles.bigBtnText}>{t("Mivo ile konuş")}</Text>
                </Pressable>
              </View>
            ) : null}

            {/* ---------- Sesli sahne ---------- */}
            <View onLayout={(e) => at('scene')(e.nativeEvent.layout.y)}>
              {scene ? (
                <Pressable onPress={openScene} style={[styles.sceneCard, shadow.card]}>
                  <LinearGradient colors={['#4F46E5', '#7C3AED']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.sceneImg}>
                    <Text style={styles.sceneEmoji}>{scene.emoji}</Text>
                    <View style={styles.sceneShade}>
                      <Text style={styles.sceneKicker}>{t("SESLİ SAHNE")}</Text>
                      <Text style={styles.sceneTitle}>{scene.titleTr}</Text>
                      <Text style={styles.sceneText}>
                        {scene.aiName} · {scene.aiRole}
                      </Text>
                      <View style={styles.sceneBtn}>
                        <Ionicons name="mic" size={14} color={colors.brand} />
                        <Text style={styles.sceneBtnText}>{t("Sahneyi aç")}</Text>
                      </View>
                    </View>
                  </LinearGradient>
                </Pressable>
              ) : (
                <View style={[styles.sceneEmpty, shadow.card]}>
                  <Ionicons name="mic-outline" size={18} color={colors.textMuted} />
                  <Text style={styles.sceneEmptyText}>
                    {t("Bu konunun sesli sahnesi hazırlanıyor. Şimdilik Mivo ile konuşarak pratik yapabilirsin.")}
                  </Text>
                </View>
              )}
            </View>
          </>
        )}
      </ScrollView>
      {toast ? <Toast message={toast} /> : null}
    </SafeAreaView>
  );
}

/** A dialogue line: the target structure in bold, readable on both bubble colours. */
function DialogueText({ text, vars, mine }: { text: string; vars: LessonVars; mine: boolean }) {
  const parts = fillVars(text, vars).split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return (
    <Text style={[styles.bubbleText, mine && { color: '#FFFFFF' }]}>
      {parts.map((p, i) =>
        p.startsWith('**') ? (
          <Text key={i} style={[styles.bubbleBold, mine && styles.bubbleBoldMine]}>
            {p.slice(2, -2)}
          </Text>
        ) : (
          p
        )
      )}
    </Text>
  );
}

const styles = StyleSheet.create({
  lockedHead: { paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  lockedCard: {
    margin: spacing.lg,
    padding: spacing.lg,
    backgroundColor: '#FFFFFF',
    borderRadius: radii.xl,
    borderWidth: 1.5,
    borderColor: '#C7D2FE',
    alignItems: 'center',
    gap: 10,
  },
  lockedMivo: { width: 110, height: 110 },
  lockedTitle: { fontFamily: fonts.headingBold, fontSize: 20, color: colors.textHeading, textAlign: 'center' },
  lockedHeading: { fontFamily: fonts.headingSemiBold, fontSize: 14, color: colors.brand },
  lockedBody: { fontFamily: fonts.bodyRegular, fontSize: 13.5, lineHeight: 20, color: colors.textBody, textAlign: 'center', marginBottom: 6 },
  container: { flex: 1, backgroundColor: colors.backgroundSecondary },
  scroll: { padding: spacing.md, gap: spacing.md, paddingBottom: 64 },

  hero: { borderRadius: 24, padding: spacing.md, gap: 10 },
  heroTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  heroBack: { width: 34, height: 34, borderRadius: 17, backgroundColor: 'rgba(255,255,255,0.18)', alignItems: 'center', justifyContent: 'center' },
  heroPill: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: radii.pill },
  heroPillText: { fontFamily: fonts.mono, fontSize: 10.5, fontWeight: 'bold', color: '#FFFFFF', letterSpacing: 0.4 },
  heroBody: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  heroTitle: { fontFamily: fonts.headingBold, fontSize: 26, lineHeight: 31, color: '#FFFFFF' },
  heroTarget: { fontFamily: fonts.bodyMedium, fontSize: 13, lineHeight: 18, color: '#E0E7FF' },
  heroMivo: { width: 86, height: 96 },
  heroMeta: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontFamily: fonts.bodyMedium, fontSize: 12, color: '#E0E7FF' },

  learnCard: { backgroundColor: '#FFFFFF', borderRadius: radii.lg, padding: spacing.md, gap: 10, borderWidth: 1, borderColor: '#EEF2FF' },
  learnTitle: { fontFamily: fonts.headingBold, fontSize: 16, color: colors.textHeading },
  learnRow: { flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  learnNo: { width: 22, height: 22, borderRadius: 11, alignItems: 'center', justifyContent: 'center', marginTop: 1 },
  learnNoText: { fontFamily: fonts.headingBold, fontSize: 11.5, color: '#FFFFFF' },
  learnText: { flex: 1, fontFamily: fonts.bodyRegular, fontSize: 13.5, lineHeight: 20, color: colors.textBody },
  goalBox: { flexDirection: 'row', gap: 6, alignItems: 'flex-start', backgroundColor: '#ECFDF5', borderRadius: 12, padding: 10, marginTop: 2 },
  goalText: { flex: 1, fontFamily: fonts.bodyRegular, fontSize: 13, lineHeight: 19, color: '#065F46' },
  goalLead: { fontFamily: fonts.headingBold },
  introBox: { flexDirection: 'row', gap: 6, alignItems: 'flex-start', backgroundColor: '#F5F7FF', borderRadius: 12, padding: 10 },
  introText: { flex: 1, fontFamily: fonts.bodyMedium, fontSize: 12.5, lineHeight: 18, color: '#3730A3', fontStyle: 'italic' },

  steps: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 4 },
  step: { flex: 1, alignItems: 'center', gap: 4 },
  stepDot: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#FFFFFF', borderWidth: 1.5, borderColor: '#C7D2FE', alignItems: 'center', justifyContent: 'center', zIndex: 1 },
  stepDotDone: { backgroundColor: colors.success, borderColor: colors.success },
  stepText: { fontFamily: fonts.headingSemiBold, fontSize: 10.5, color: colors.textBody },
  stepLine: { position: 'absolute', top: 15, left: '62%', right: '-38%', height: 1.5, backgroundColor: '#E0E7FF' },

  section: { backgroundColor: '#FFFFFF', borderRadius: radii.lg, padding: spacing.md, gap: 12, borderWidth: 1, borderColor: '#EEF2FF' },
  sectionHead: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  sectionIcon: { width: 30, height: 30, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  sectionTitle: { flex: 1, fontFamily: fonts.headingBold, fontSize: 15.5, color: colors.textHeading },

  formula: { backgroundColor: '#1E1B4B', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, gap: 6 },
  formulaLabel: { fontFamily: fonts.bodyMedium, fontSize: 11.5, color: '#A5B4FC' },
  formulaText: { fontFamily: fonts.mono, fontSize: 13.5, lineHeight: 20, color: '#C7D2FE', fontWeight: 'bold' },

  dRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 8 },
  dRowMine: { justifyContent: 'flex-end' },
  avatarImg: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#EEF2FF' },
  avatar: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontFamily: fonts.headingBold, fontSize: 13 },
  bubble: { maxWidth: '76%', borderRadius: 18, paddingHorizontal: 12, paddingVertical: 8, gap: 2 },
  bubbleOther: { backgroundColor: '#F1F5F9', borderBottomLeftRadius: 4 },
  bubbleMine: { backgroundColor: colors.brand, borderBottomRightRadius: 4 },
  bubbleActive: { borderWidth: 2, borderColor: colors.success },
  bubbleName: { fontFamily: fonts.headingBold, fontSize: 10.5, color: '#0EA5E9' },
  bubbleText: { fontFamily: fonts.bodyMedium, fontSize: 14.5, lineHeight: 21, color: colors.textHeading },
  bubbleBold: { fontFamily: fonts.headingBold, color: '#4338CA', backgroundColor: '#E0E7FF' },
  bubbleBoldMine: { color: '#FDE68A', backgroundColor: 'rgba(255,255,255,0.12)' },
  noticeBox: { backgroundColor: '#F5F3FF', borderRadius: 12, padding: 12, gap: 6, borderLeftWidth: 3, borderLeftColor: '#7C3AED' },
  noticeHead: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  noticeTitle: { fontFamily: fonts.headingBold, fontSize: 13, color: '#5B21B6' },

  useCard: { backgroundColor: '#FFFBEB', borderRadius: 12, padding: 12, gap: 8 },
  useTitle: { fontFamily: fonts.headingBold, fontSize: 13.5, color: '#92400E' },
  useRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  useText: { flex: 1, fontFamily: fonts.bodyMedium, fontSize: 14, lineHeight: 20, color: colors.textHeading },

  nativeCard: { backgroundColor: '#FFF7ED', borderRadius: radii.lg, padding: spacing.md, gap: 8, borderWidth: 1, borderColor: '#FED7AA' },
  nativeHead: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  nativeTitle: { fontFamily: fonts.headingBold, fontSize: 14, color: '#9A3412' },

  mCard: { borderRadius: 12, padding: 12, gap: 6, backgroundColor: '#FAFAFB', borderWidth: 1, borderColor: '#F1F5F9' },
  mLine: { flexDirection: 'row', gap: 6, alignItems: 'flex-start' },
  mWrong: { flex: 1, fontFamily: fonts.bodyMedium, fontSize: 14, color: '#BE123C', textDecorationLine: 'line-through' },
  mRight: { flex: 1, fontFamily: fonts.headingSemiBold, fontSize: 14, color: '#047857' },
  mNote: { fontFamily: fonts.bodyRegular, fontSize: 12.5, lineHeight: 18, color: colors.textBody },
  mNoteLead: { fontFamily: fonts.headingBold, color: colors.textHeading },
  mRemember: { flexDirection: 'row', gap: 6, alignItems: 'flex-start', backgroundColor: '#EEF2FF', borderRadius: 8, padding: 8 },
  mRememberText: { flex: 1, fontFamily: fonts.bodyMedium, fontSize: 12.5, lineHeight: 18, color: '#3730A3' },

  practiceHead: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  practiceCount: { fontFamily: fonts.mono, fontSize: 11.5, fontWeight: 'bold', color: colors.textMuted },
  progressTrack: { height: 6, borderRadius: 3, backgroundColor: '#E2E8F0', overflow: 'hidden' },
  progressFill: { height: 6, borderRadius: 3 },

  doneCard: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#ECFDF5', borderRadius: radii.lg, padding: spacing.md, borderWidth: 1.5, borderColor: '#A7F3D0' },
  doneMivo: { width: 64, height: 72 },
  doneTitle: { fontFamily: fonts.headingBold, fontSize: 17, color: '#065F46' },
  doneText: { fontFamily: fonts.bodyRegular, fontSize: 13, lineHeight: 18, color: '#047857' },

  mivoCard: { backgroundColor: '#F5F7FF', borderRadius: radii.lg, padding: spacing.md, gap: 12, borderWidth: 1, borderColor: '#E0E7FF' },
  mivoTop: { flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  mivoImg: { width: 70, height: 80 },
  mivoTitle: { fontFamily: fonts.headingBold, fontSize: 15.5, color: colors.textHeading },

  bigBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.brand,
    paddingVertical: 13,
    borderRadius: 16,
    borderBottomWidth: 3,
    borderBottomColor: '#4338CA',
  },
  bigBtnText: { fontFamily: fonts.headingBold, fontSize: 14.5, color: '#FFFFFF' },
  ghostBtn: { alignSelf: 'center', paddingHorizontal: 18, paddingVertical: 10, borderRadius: radii.pill, borderWidth: 1.5, borderColor: colors.brand },
  ghostBtnText: { fontFamily: fonts.headingBold, fontSize: 13, color: colors.brand },

  sceneCard: { borderRadius: radii.lg },
  sceneImg: { height: 170, borderRadius: radii.lg, overflow: 'hidden', padding: spacing.md },
  sceneShade: { flex: 1, justifyContent: 'flex-end', gap: 4 },
  sceneEmoji: { position: 'absolute', top: 14, right: 18, fontSize: 64, opacity: 0.9 },
  sceneKicker: { fontFamily: fonts.mono, fontSize: 10, fontWeight: 'bold', color: '#A5B4FC', letterSpacing: 0.8 },
  sceneTitle: { fontFamily: fonts.headingBold, fontSize: 18, color: '#FFFFFF' },
  sceneText: { fontFamily: fonts.bodyRegular, fontSize: 12.5, color: '#E2E8F0' },
  sceneBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    marginTop: 6,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radii.pill,
  },
  sceneBtnText: { fontFamily: fonts.headingBold, fontSize: 13, color: colors.brand },
  sceneEmpty: { flexDirection: 'row', gap: 8, alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: radii.lg, padding: spacing.md },
  sceneEmptyText: { flex: 1, fontFamily: fonts.bodyRegular, fontSize: 13, lineHeight: 19, color: colors.textBody },
});
