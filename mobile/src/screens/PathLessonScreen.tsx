import Ionicons from '@expo/vector-icons/Ionicons';
import { useQueryClient } from '@tanstack/react-query';
import { File } from 'expo-file-system';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Animated, Easing, Image, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { mivoHomeImages, mivoVoiceImages, stateImages } from '../assets/images';
import { useMivoTransition } from '../components/MivoTransitionOverlay';
import { FadeIn, PopIn, useLoop, usePop, useShake } from '../components/path/anim';
import { BoldText } from '../components/path/BoldText';
import { WordMatch } from '../components/path/WordMatch';
import { TapSentenceOrder } from '../components/reading/TapSentenceOrder';
import { ACTIVITY_XP } from '../constants/xp';
import { findStep, gloss, loc, type PathEpisode, type PathPractice, type PathWord } from '../data/path';
import { usePronunciation } from '../hooks/usePronunciation';
import { useVoiceRecorder } from '../hooks/useVoiceRecorder';
import { t } from '../i18n';
import { api, ApiError } from '../lib/api';
import { haptics } from '../lib/haptics';
import { postQueued } from '../lib/outbox';
import { stepArt } from '../lib/pathArt';
import { recordStep } from '../lib/pathProgress';
import type { PathLessonScreenProps } from '../navigation/types';
import { colors, fonts, shadow, spacing } from '../theme/tokens';
import type { TranscribeResponse } from '../types/api';

type Phase = 'cover' | 'words' | 'match' | 'read' | 'quiz' | 'tip' | 'practice' | 'say' | 'done';
const SEGMENTS: Phase[][] = [['words', 'match'], ['read'], ['quiz'], ['tip'], ['practice'], ['say']];

/** Words of a sentence, lower-cased, without punctuation (for the read-aloud check). */
const tokens = (s: string) =>
  s
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/[^a-z0-9' ]+/g, ' ')
    .split(/\s+/)
    .filter(Boolean);

/**
 * A reading lesson of the new path: a cover with the episode's picture, new words, the story episode, three
 * comprehension questions, Mivo's grammar note, practice built from the episode's sentences and reading two
 * sentences aloud. 5–10 minutes.
 */
export function PathLessonScreen({ navigation, route }: PathLessonScreenProps) {
  const found = findStep(route.params.stepId);
  const { finishTransition } = useMivoTransition();
  useEffect(() => {
    finishTransition();
  }, [finishTransition]);

  if (!found || found.step.kind !== 'reading') {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.note}>{t("Bu ders bulunamadı.")}</Text>
      </SafeAreaView>
    );
  }
  return <Lesson stepId={found.step.id} episode={found.step.episode} art={stepArt(found)} onExit={() => navigation.goBack()} />;
}

function Lesson({ stepId, episode, art, onExit }: { stepId: string; episode: PathEpisode; art?: number; onExit: () => void }) {
  const insets = useSafeAreaInsets();
  const hasGloss = episode.words.some((w) => gloss(w.native));
  const [phase, setPhase] = useState<Phase>('cover');
  const score = useRef({ right: 0, total: 0 });
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  }, [phase]);

  const tally = (firstTry: boolean) => {
    score.current.total += 1;
    if (firstTry) score.current.right += 1;
  };
  /** New content was added at the bottom (a sentence, the answer panel): bring it into view. */
  const toEnd = () => setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 120);

  const segIdx = SEGMENTS.findIndex((s) => s.includes(phase));

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <Pressable onPress={onExit} hitSlop={12} style={styles.close} accessibilityRole="button" accessibilityLabel={t("Kapat")}>
          <Ionicons name="close" size={24} color={colors.textHeading} />
        </Pressable>
        <View style={styles.segments}>
          {SEGMENTS.map((_, i) => (
            <Segment key={i} state={phase === 'done' || (segIdx >= 0 && i < segIdx) ? 'done' : i === segIdx ? 'now' : 'todo'} />
          ))}
        </View>
      </View>

      <ScrollView
        ref={scrollRef}
        style={{ flex: 1 }}
        contentContainerStyle={[styles.body, { paddingBottom: Math.max(insets.bottom, 16) + 24 }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {phase === 'cover' ? (
          <CoverStep episode={episode} art={art} onStart={() => setPhase('words')} />
        ) : phase === 'words' ? (
          <WordsStep episode={episode} onNext={() => setPhase(hasGloss ? 'match' : 'read')} />
        ) : phase === 'match' ? (
          <>
            <FadeIn>
              <StepHead icon="git-compare" title={t("Eşleştir")} sub={t("Kelimeyi anlamıyla eşleştir.")} />
            </FadeIn>
            <WordMatch
              words={episode.words}
              onDone={(mistakes) => {
                tally(mistakes === 0);
                setPhase('read');
              }}
            />
          </>
        ) : phase === 'read' ? (
          <ReadStep episode={episode} onGrow={toEnd} onNext={() => setPhase('quiz')} />
        ) : phase === 'quiz' ? (
          <QuizStep episode={episode} tally={tally} onAnswered={toEnd} onNext={() => setPhase('tip')} />
        ) : phase === 'tip' ? (
          <TipStep episode={episode} onNext={() => setPhase('practice')} />
        ) : phase === 'practice' ? (
          <PracticeStep items={episode.practice} tally={tally} onAnswered={toEnd} onNext={() => setPhase('say')} />
        ) : phase === 'say' ? (
          <SayStep sentences={episode.say} onNext={() => setPhase('done')} />
        ) : (
          <DoneStep stepId={stepId} episode={episode} right={score.current.right} total={score.current.total} onExit={onExit} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

/** One piece of the progress bar; it fills smoothly when its part starts or ends. */
function Segment({ state }: { state: 'todo' | 'now' | 'done' }) {
  const v = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(v, { toValue: state === 'todo' ? 0 : 1, duration: 450, easing: Easing.out(Easing.cubic), useNativeDriver: false }).start();
  }, [state, v]);
  return (
    <View style={styles.segment}>
      <Animated.View
        style={[
          styles.segmentFill,
          { backgroundColor: state === 'done' ? '#22C55E' : colors.brand, width: v.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }) },
        ]}
      />
    </View>
  );
}

function StepHead({ icon, title, sub }: { icon: React.ComponentProps<typeof Ionicons>['name']; title: string; sub?: string }) {
  return (
    <View style={styles.stepHead}>
      <View style={styles.stepIcon}>
        <Ionicons name={icon} size={18} color={colors.brand} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.stepTitle}>{title}</Text>
        {sub ? <Text style={styles.stepSub}>{sub}</Text> : null}
      </View>
    </View>
  );
}

function NextButton({ label, onPress, disabled, tone = 'brand' }: { label: string; onPress: () => void; disabled?: boolean; tone?: 'brand' | 'ok' | 'bad' }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.next,
        tone === 'ok' && styles.nextOk,
        tone === 'bad' && styles.nextBad,
        disabled && styles.nextOff,
        pressed && { transform: [{ translateY: 2 }], borderBottomWidth: 2 },
      ]}
      accessibilityRole="button"
    >
      <Text style={styles.nextText}>{label}</Text>
    </Pressable>
  );
}

/** One answer button: it springs when it is the right one and shakes when it was a wrong pick. */
function Choice({
  label,
  state,
  index,
  pill,
  onPress,
}: {
  label: string;
  state: 'idle' | 'ok' | 'bad' | 'dim';
  index: number;
  pill?: boolean;
  onPress: () => void;
}) {
  const shake = useShake();
  const pop = usePop();
  useEffect(() => {
    if (state === 'ok') pop.pop();
    if (state === 'bad') shake.shake();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);
  const marked = state === 'ok' || state === 'bad';
  return (
    <FadeIn delay={80 + index * 60}>
      <Animated.View style={shake.style}>
        <Animated.View style={pop.style}>
          <Pressable
            onPress={onPress}
            style={[pill ? styles.pill : styles.option, state === 'ok' && styles.optionOk, state === 'bad' && styles.optionBad, state === 'dim' && styles.optionDim]}
            accessibilityRole="button"
          >
            <Text style={[pill ? styles.pillText : styles.optionText, marked && { color: '#FFFFFF' }]}>{label}</Text>
            {marked && !pill ? <Ionicons name={state === 'ok' ? 'checkmark-circle' : 'close-circle'} size={22} color="#FFFFFF" /> : null}
          </Pressable>
        </Animated.View>
      </Animated.View>
    </FadeIn>
  );
}

/** The panel that slides in after an answer: right / not quite, the right answer, and the way on. */
function Feedback({ ok, answer, label, onNext }: { ok: boolean; answer?: string; label: string; onNext: () => void }) {
  const praise = useMemo(() => [t("Doğru!"), t("Harika!"), t("Süper!")][Math.floor(Math.random() * 3)], []);
  return (
    <FadeIn from={24} style={[styles.feedback, ok ? styles.feedbackOk : styles.feedbackBad]}>
      <View style={styles.feedbackRow}>
        <PopIn style={[styles.feedbackIcon, { backgroundColor: ok ? colors.success : colors.error }]}>
          <Ionicons name={ok ? 'checkmark' : 'close'} size={22} color="#FFFFFF" />
        </PopIn>
        <View style={{ flex: 1 }}>
          <Text style={[styles.feedbackTitle, { color: ok ? '#047857' : '#BE123C' }]}>{ok ? praise : t("Tam değil")}</Text>
          {!ok && answer ? <Text style={styles.feedbackSub}>{t("Doğru cevap: {{a}}", { a: answer })}</Text> : null}
        </View>
      </View>
      <NextButton label={label} onPress={onNext} tone={ok ? 'ok' : 'bad'} />
    </FadeIn>
  );
}

/* ---------------- 0. Cover ---------------- */

function CoverStep({ episode, art, onStart }: { episode: PathEpisode; art?: number; onStart: () => void }) {
  const { width, height } = useWindowDimensions();
  const size = Math.round(Math.min(width - spacing.md * 2, height * 0.44));
  const zoom = useLoop(true, 9000, true);
  const scale = zoom.interpolate({ inputRange: [0, 1], outputRange: [1, 1.07] });
  return (
    <>
      <FadeIn from={20} duration={500} style={[styles.coverShadow, { width: size, height: size, borderRadius: 28 }]}>
        {/* The shadow sits on the outer view; this inner one has none, so Android clips the picture to the corners. */}
        <View style={[styles.coverClip, { borderRadius: 28 }]}>
          {art ? (
            <Animated.Image source={art} style={{ width: size, height: size, borderRadius: 28, transform: [{ scale }] }} resizeMode="cover" />
          ) : (
            <LinearGradient colors={['#6366F1', '#8B5CF6']} style={[StyleSheet.absoluteFill, styles.coverFallback]}>
              <Image source={mivoHomeImages.lessonGuide} style={{ width: size * 0.7, height: size * 0.7 }} resizeMode="contain" />
            </LinearGradient>
          )}
          <View style={styles.coverBadge}>
            <Text style={styles.coverBadgeText}>{t("Bölüm {{n}}", { n: episode.number })}</Text>
          </View>
        </View>
      </FadeIn>

      <FadeIn delay={140}>
        <Text style={styles.coverTitle}>{loc(episode.title)}</Text>
      </FadeIn>

      <FadeIn delay={220} style={styles.coverChips}>
        <View style={styles.coverChip}>
          <Ionicons name="sparkles" size={14} color={colors.brand} />
          <Text style={styles.coverChipText} numberOfLines={1}>
            {loc(episode.grammar)}
          </Text>
        </View>
        <View style={styles.coverChip}>
          <Ionicons name="time-outline" size={14} color={colors.textBody} />
          <Text style={[styles.coverChipText, { color: colors.textBody }]}>{t("~{{n}} dk", { n: episode.minutes })}</Text>
        </View>
        <View style={styles.coverChip}>
          <Ionicons name="text" size={14} color={colors.textBody} />
          <Text style={[styles.coverChipText, { color: colors.textBody }]}>{t("{{n}} yeni kelime", { n: episode.words.length })}</Text>
        </View>
      </FadeIn>

      {episode.recap ? (
        <FadeIn delay={300} style={styles.recap}>
          <Image source={mivoHomeImages.fab} style={styles.recapFace} />
          <View style={{ flex: 1 }}>
            <Text style={styles.recapLabel}>{t("Önceki bölümde")}</Text>
            <Text style={styles.recapText}>{loc(episode.recap)}</Text>
          </View>
        </FadeIn>
      ) : null}

      <FadeIn delay={380}>
        <NextButton label={t("Başla")} onPress={onStart} />
      </FadeIn>
    </>
  );
}

/* ---------------- 1. Words ---------------- */

function WordsStep({ episode, onNext }: { episode: PathEpisode; onNext: () => void }) {
  const { pronounce } = usePronunciation();
  const [heard, setHeard] = useState<Set<string>>(new Set());
  return (
    <>
      <FadeIn>
        <StepHead icon="sparkles" title={t("Yeni kelimeler")} sub={t("Her kelimeye dokun, dinle. Bölümde hepsiyle karşılaşacaksın.")} />
      </FadeIn>
      <View style={styles.wordGrid}>
        {episode.words.map((w, i) => (
          <WordCard
            key={w.en}
            word={w}
            index={i}
            heard={heard.has(w.en)}
            onPress={() => {
              pronounce(w.en).catch(() => {});
              setHeard((h) => new Set(h).add(w.en));
            }}
          />
        ))}
      </View>
      <FadeIn delay={120 + episode.words.length * 70}>
        <NextButton label={t("Devam")} onPress={onNext} />
      </FadeIn>
    </>
  );
}

function WordCard({ word, index, heard, onPress }: { word: PathWord; index: number; heard: boolean; onPress: () => void }) {
  const pop = usePop(1.05);
  const pulse = useLoop(!heard, 1100, true);
  return (
    <FadeIn delay={80 + index * 70} style={styles.wordCell}>
      <Animated.View style={pop.style}>
        <Pressable
          onPress={() => {
            pop.pop();
            haptics.selection();
            onPress();
          }}
          style={[styles.wordCard, heard && styles.wordCardHeard]}
          accessibilityRole="button"
        >
          <View style={styles.wordTop}>
            <Animated.View
              style={[
                styles.wordSpeaker,
                heard && styles.wordSpeakerHeard,
                !heard && { transform: [{ scale: pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.12] }) }] },
              ]}
            >
              <Ionicons name="volume-high" size={16} color={heard ? '#16A34A' : colors.brand} />
            </Animated.View>
            {heard ? <Ionicons name="checkmark-circle" size={18} color="#22C55E" /> : null}
          </View>
          <Text style={styles.wordEn}>{word.en}</Text>
          {gloss(word.native) ? <Text style={styles.wordNative}>{gloss(word.native)}</Text> : null}
        </Pressable>
      </Animated.View>
    </FadeIn>
  );
}

/* ---------------- 2. Reading ---------------- */

function ReadStep({ episode, onGrow, onNext }: { episode: PathEpisode; onGrow: () => void; onNext: () => void }) {
  const { pronounce } = usePronunciation();
  const [shown, setShown] = useState(1);
  const [translated, setTranslated] = useState<Set<number>>(new Set());
  const [wordTip, setWordTip] = useState<string | null>(null);
  const newWords = useMemo(() => new Map(episode.words.map((w) => [w.en.toLowerCase(), gloss(w.native)])), [episode.words]);

  useEffect(() => {
    const s = episode.sentences[shown - 1];
    if (s) pronounce(s.en, { rate: 0.9 }).catch(() => {});
    if (shown > 1) onGrow();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shown]);

  const all = shown >= episode.sentences.length;

  return (
    <>
      <FadeIn>
        <StepHead icon="book" title={loc(episode.title)} sub={t("Cümleye dokunursan çevirisini görürsün, altı çizili kelimeye dokunursan anlamını.")} />
      </FadeIn>
      <FadeIn delay={80} style={[styles.storyCard, shadow.card]}>
        {episode.sentences.slice(0, shown).map((s, i) => {
          const parts = s.en.split(/(\s+)/);
          const last = i === shown - 1;
          return (
            <FadeIn key={i} from={10} duration={320}>
              <Pressable
                onPress={() => setTranslated((tr) => (tr.has(i) ? new Set([...tr].filter((x) => x !== i)) : new Set(tr).add(i)))}
                style={[styles.sentence, last && !all && styles.sentenceNow]}
                accessibilityRole="button"
              >
                {s.speaker ? <Text style={styles.speaker}>{s.speaker}</Text> : null}
                <Text style={styles.sentenceText}>
                  {parts.map((part, k) => {
                    const key = part.toLowerCase().replace(/[^a-z']/g, '');
                    if (newWords.has(key)) {
                      return (
                        <Text key={k} style={styles.newWord} onPress={() => setWordTip(`${key} = ${newWords.get(key) || key}`)}>
                          {part}
                        </Text>
                      );
                    }
                    return part;
                  })}
                </Text>
                {translated.has(i) && gloss(s.native) ? <Text style={styles.sentenceNative}>{gloss(s.native)}</Text> : null}
                <Pressable onPress={() => pronounce(s.en, { rate: 0.9 }).catch(() => {})} hitSlop={8} style={styles.replay} accessibilityLabel={t("Dinle")}>
                  <Ionicons name="volume-medium" size={18} color={colors.textMuted} />
                </Pressable>
              </Pressable>
            </FadeIn>
          );
        })}
      </FadeIn>
      {wordTip ? (
        <FadeIn key={wordTip} from={8} duration={220} style={{ alignSelf: 'center' }}>
          <Pressable onPress={() => setWordTip(null)} style={styles.wordTip}>
            <Text style={styles.wordTipText}>{wordTip}</Text>
          </Pressable>
        </FadeIn>
      ) : null}
      {all ? (
        <FadeIn>
          <NextButton label={t("Bitirdim")} onPress={onNext} />
        </FadeIn>
      ) : (
        <NextButton label={t("Devam ({{n}}/{{total}})", { n: shown, total: episode.sentences.length })} onPress={() => setShown((n) => n + 1)} />
      )}
    </>
  );
}

/* ---------------- 3. Comprehension ---------------- */

function QuizStep({ episode, tally, onAnswered, onNext }: { episode: PathEpisode; tally: (ok: boolean) => void; onAnswered: () => void; onNext: () => void }) {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const q = episode.questions[idx];
  const choose = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    const ok = i === q.answer;
    tally(ok);
    if (ok) haptics.success();
    else haptics.warning();
    onAnswered();
  };
  const next = () => {
    if (idx + 1 >= episode.questions.length) onNext();
    else {
      setIdx(idx + 1);
      setPicked(null);
    }
  };
  return (
    <>
      <FadeIn>
        <StepHead icon="help-circle" title={t("Anladın mı?")} sub={t("Soru {{n}}/{{total}}", { n: idx + 1, total: episode.questions.length })} />
      </FadeIn>
      <FadeIn key={`q${idx}`} delay={40} style={[styles.qCard, shadow.card]}>
        <Text style={styles.qText}>{q.q}</Text>
        {gloss(q.native) ? <Text style={styles.qNative}>{gloss(q.native)}</Text> : null}
      </FadeIn>
      <View style={styles.options}>
        {q.options.map((o, i) => (
          <Choice
            key={`${idx}-${o}`}
            label={o}
            index={i}
            state={picked === null ? 'idle' : i === q.answer ? 'ok' : i === picked ? 'bad' : 'dim'}
            onPress={() => choose(i)}
          />
        ))}
      </View>
      {picked !== null ? (
        <Feedback
          key={`f${idx}`}
          ok={picked === q.answer}
          answer={q.options[q.answer]}
          label={idx + 1 >= episode.questions.length ? t("Devam") : t("Sıradaki soru")}
          onNext={next}
        />
      ) : null}
    </>
  );
}

/* ---------------- 4. Mivo's note (grammar tip) ---------------- */

function TipStep({ episode, onNext }: { episode: PathEpisode; onNext: () => void }) {
  const tip = episode.tip;
  const bob = useLoop(true, 1400, true);
  return (
    <>
      <FadeIn style={styles.mivoRow}>
        <Animated.Image
          source={mivoVoiceImages.note}
          style={[styles.mivoImg, { transform: [{ translateY: bob.interpolate({ inputRange: [0, 1], outputRange: [0, -5] }) }] }]}
          resizeMode="contain"
        />
        <View style={[styles.bubble, shadow.card]}>
          <Text style={styles.bubbleKicker}>{t("Mivo'nun notu")}</Text>
          <Text style={styles.bubbleTitle}>{loc(tip.title)}</Text>
        </View>
      </FadeIn>
      <FadeIn delay={150} style={[styles.tipCard, shadow.card]}>
        <Text style={styles.tipLabel}>{t("Bölümden")}</Text>
        <BoldText text={tip.highlight} style={styles.tipHighlight} boldStyle={styles.tipMark} />
        <BoldText text={loc(tip.rule)} style={styles.tipRule} boldStyle={{ color: colors.brand }} />
        <View style={styles.examples}>
          {tip.examples.map((ex, i) => (
            <FadeIn key={ex.en} delay={280 + i * 90} style={styles.example}>
              <Text style={styles.exampleEn}>{ex.en}</Text>
              {gloss(ex.native) ? <Text style={styles.exampleNative}>{gloss(ex.native)}</Text> : null}
            </FadeIn>
          ))}
        </View>
        {tip.mistake ? (
          <FadeIn delay={300 + tip.examples.length * 90} style={styles.mistake}>
            <View style={styles.mistakeRow}>
              <View style={[styles.mistakeTag, { backgroundColor: '#FEE2E2' }]}>
                <Ionicons name="close" size={14} color="#DC2626" />
              </View>
              <Text style={[styles.mistakeLine, styles.mistakeWrong]}>{tip.mistake.wrong}</Text>
            </View>
            <View style={styles.mistakeRow}>
              <View style={[styles.mistakeTag, { backgroundColor: '#DCFCE7' }]}>
                <Ionicons name="checkmark" size={14} color="#16A34A" />
              </View>
              <Text style={[styles.mistakeLine, styles.mistakeRight]}>{tip.mistake.right}</Text>
            </View>
            <BoldText text={loc(tip.mistake.why)} style={styles.mistakeWhy} />
          </FadeIn>
        ) : null}
      </FadeIn>
      <FadeIn delay={420 + tip.examples.length * 90}>
        <NextButton label={t("Anladım")} onPress={onNext} />
      </FadeIn>
    </>
  );
}

/* ---------------- 5. Practice ---------------- */

function PracticeStep({
  items,
  tally,
  onAnswered,
  onNext,
}: {
  items: PathPractice[];
  tally: (ok: boolean) => void;
  onAnswered: () => void;
  onNext: () => void;
}) {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [orderDone, setOrderDone] = useState(false);
  const wrongOnce = useRef(false);
  const item = items[idx];
  const last = idx + 1 >= items.length;

  const next = () => {
    if (last) onNext();
    else {
      setIdx(idx + 1);
      setPicked(null);
      setOrderDone(false);
      wrongOnce.current = false;
    }
  };

  return (
    <>
      <FadeIn>
        <StepHead icon="barbell" title={t("Pekiştir")} sub={t("Alıştırma {{n}}/{{total}}", { n: idx + 1, total: items.length })} />
      </FadeIn>
      {item.kind === 'choose' ? (
        <>
          <FadeIn key={`p${idx}`} delay={40} style={[styles.qCard, shadow.card]}>
            <Text style={styles.qText}>
              {picked !== null ? (
                <>
                  {item.prompt.split('___')[0]}
                  <Text style={{ color: picked === item.answer ? '#16A34A' : colors.brand, textDecorationLine: 'underline' }}>{item.options[item.answer]}</Text>
                  {item.prompt.split('___').slice(1).join('___')}
                </>
              ) : (
                item.prompt
              )}
            </Text>
            {gloss(item.native) ? <Text style={styles.qNative}>{gloss(item.native)}</Text> : null}
          </FadeIn>
          <View style={styles.optionsRow}>
            {item.options.map((o, i) => (
              <Choice
                key={`${idx}-${o}`}
                pill
                label={o}
                index={i}
                state={picked === null ? 'idle' : i === item.answer ? 'ok' : i === picked ? 'bad' : 'dim'}
                onPress={() => {
                  if (picked !== null) return;
                  setPicked(i);
                  const ok = i === item.answer;
                  tally(ok);
                  if (ok) haptics.success();
                  else haptics.warning();
                  onAnswered();
                }}
              />
            ))}
          </View>
          {picked !== null ? (
            <Feedback key={`f${idx}`} ok={picked === item.answer} answer={item.options[item.answer]} label={last ? t("Devam") : t("Sıradaki")} onNext={next} />
          ) : null}
        </>
      ) : (
        <>
          <FadeIn key={`o${idx}`} delay={40}>
            <Text style={styles.orderHint}>{t("Kelimeleri doğru sıraya koy.")}</Text>
          </FadeIn>
          <TapSentenceOrder
            sentence={item.sentence}
            translation={gloss(item.native) || item.sentence}
            resetKey={`${idx}`}
            onWrongAttempt={() => {
              wrongOnce.current = true;
            }}
            onSolved={(hints) => {
              tally(!wrongOnce.current && hints === 0);
              setOrderDone(true);
              onAnswered();
            }}
            onWordPress={() => {}}
          />
          {orderDone ? <Feedback key={`f${idx}`} ok label={last ? t("Devam") : t("Sıradaki")} onNext={next} /> : null}
        </>
      )}
    </>
  );
}

/* ---------------- 6. Say it ---------------- */

function SayStep({ sentences, onNext }: { sentences: string[]; onNext: () => void }) {
  const { pronounce } = usePronunciation();
  const recorder = useVoiceRecorder();
  const [idx, setIdx] = useState(0);
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<{ heard: string; hits: Set<number>; ok: boolean } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const sentence = sentences[idx];
  const words = sentence.split(/\s+/);
  const ring = useLoop(recorder.isRecording, 1200);

  const toggle = async () => {
    if (checking) return;
    if (!recorder.isRecording) {
      setResult(null);
      setError(null);
      haptics.light();
      await recorder.start();
      return;
    }
    const uri = await recorder.stop();
    if (!uri) return;
    setChecking(true);
    try {
      const form = new FormData();
      form.append('audio', new File(uri) as unknown as Blob);
      const { transcript } = await api.postForm<TranscribeResponse>('/chat/transcribe', form);
      const said = new Set(tokens(transcript));
      const hits = new Set<number>();
      words.forEach((w, i) => {
        const tk = tokens(w)[0];
        if (tk && said.has(tk)) hits.add(i);
      });
      const ok = hits.size / Math.max(1, words.length) >= 0.7;
      setResult({ heard: transcript.trim(), hits, ok });
      if (ok) haptics.success();
      else haptics.warning();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : t("Ses kontrol edilemedi. Tekrar dene."));
    } finally {
      setChecking(false);
    }
  };

  const next = () => {
    if (idx + 1 >= sentences.length) onNext();
    else {
      setIdx(idx + 1);
      setResult(null);
      setError(null);
    }
  };

  return (
    <>
      <FadeIn>
        <StepHead icon="mic" title={t("Sesli söyle")} sub={t("Cümleyi dinle, sonra mikrofona basıp sen söyle.")} />
      </FadeIn>
      <FadeIn key={`s${idx}`} delay={60} style={[styles.sayCard, shadow.card]}>
        <Text style={styles.sayCount}>{t("Cümle {{n}}/{{total}}", { n: idx + 1, total: sentences.length })}</Text>
        <Text style={styles.sayText}>
          {words.map((w, i) => (
            <Text key={i} style={result ? (result.hits.has(i) ? styles.sayHit : styles.sayMiss) : undefined}>
              {w}
              {i < words.length - 1 ? ' ' : ''}
            </Text>
          ))}
        </Text>
        <Pressable onPress={() => pronounce(sentence, { rate: 0.85 }).catch(() => {})} style={styles.listen} accessibilityRole="button">
          <Ionicons name="volume-high" size={18} color={colors.brand} />
          <Text style={styles.listenText}>{t("Dinle")}</Text>
        </Pressable>
      </FadeIn>

      <View style={{ alignItems: 'center', gap: 12, paddingTop: 6 }}>
        <View style={styles.micWrap}>
          {recorder.isRecording
            ? [0, 0.5].map((offset) => {
                const v = Animated.modulo(Animated.add(ring, offset), 1);
                return (
                  <Animated.View
                    key={offset}
                    pointerEvents="none"
                    style={[
                      styles.micRing,
                      {
                        opacity: v.interpolate({ inputRange: [0, 1], outputRange: [0.4, 0] }),
                        transform: [{ scale: v.interpolate({ inputRange: [0, 1], outputRange: [1, 1.8] }) }],
                      },
                    ]}
                  />
                );
              })
            : null}
          <Pressable
            onPress={toggle}
            disabled={checking || recorder.permissionDenied}
            style={({ pressed }) => [styles.mic, recorder.isRecording && styles.micRec, pressed && { transform: [{ scale: 0.95 }] }]}
            accessibilityRole="button"
            accessibilityLabel={recorder.isRecording ? t("Durdur") : t("Söyle")}
          >
            {checking ? <ActivityIndicator color="#FFFFFF" /> : <Ionicons name={recorder.isRecording ? 'stop' : 'mic'} size={34} color="#FFFFFF" />}
          </Pressable>
        </View>
        <FadeIn key={`${recorder.isRecording}-${!!result}-${!!error}`} from={6} duration={240}>
          <Text style={[styles.note, result && (result.ok ? styles.noteOk : styles.noteBad)]}>
            {recorder.permissionDenied
              ? t("Mikrofon izni kapalı. Ayarlardan açabilir ya da bu adımı geçebilirsin.")
              : recorder.isRecording
                ? t("Dinliyorum… bitince tekrar bas.")
                : result
                  ? result.ok
                    ? t("Harika, çok iyi anlaşılıyor! 🎉")
                    : t("Kırmızı kelimeleri tam duyamadım. Bir daha dene ya da devam et.")
                  : (error ?? t("Hazır olunca mikrofona bas."))}
          </Text>
        </FadeIn>
      </View>

      {result || error || recorder.permissionDenied ? (
        <FadeIn>
          <NextButton
            label={idx + 1 >= sentences.length ? t("Dersi bitir") : t("Sıradaki cümle")}
            onPress={next}
            tone={result?.ok ? 'ok' : 'brand'}
          />
        </FadeIn>
      ) : (
        <Pressable onPress={next} hitSlop={8} accessibilityRole="button">
          <Text style={styles.skip}>{t("Şu an konuşamıyorum, geç")}</Text>
        </Pressable>
      )}
    </>
  );
}

/* ---------------- Results ---------------- */

function DoneStep({ stepId, episode, right, total, onExit }: { stepId: string; episode: PathEpisode; right: number; total: number; onExit: () => void }) {
  const queryClient = useQueryClient();
  const ratio = total ? right / total : 1;
  const stars = ratio >= 0.9 ? 3 : ratio >= 0.6 ? 2 : 1;
  const saved = useRef(false);
  const glow = useLoop(true, 2400, true);
  useEffect(() => {
    if (saved.current) return;
    saved.current = true;
    haptics.success();
    void recordStep(stepId, stars);
    postQueued('/progress/log-practice')
      .then(() => queryClient.invalidateQueries({ queryKey: ['me'] }))
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.done}>
      <View style={styles.doneHero}>
        <Animated.View
          style={[
            styles.doneGlow,
            {
              opacity: glow.interpolate({ inputRange: [0, 1], outputRange: [0.45, 0.85] }),
              transform: [{ scale: glow.interpolate({ inputRange: [0, 1], outputRange: [0.92, 1.06] }) }],
            },
          ]}
        />
        <PopIn>
          <Image source={stateImages.goalCelebration} style={styles.doneImg} resizeMode="contain" />
        </PopIn>
      </View>
      <FadeIn delay={250}>
        <Text style={styles.doneTitle}>{t("Bölüm {{n}} bitti!", { n: episode.number })}</Text>
      </FadeIn>
      <View style={styles.doneStars}>
        {[1, 2, 3].map((n) => (
          <PopIn key={n} delay={500 + n * 260} onShow={n <= stars ? () => haptics.selection() : undefined} style={n === 2 ? { marginTop: -14 } : undefined}>
            <Ionicons name="star" size={n === 2 ? 58 : 46} color={n <= stars ? '#F59E0B' : '#E2E8F0'} />
          </PopIn>
        ))}
      </View>
      <FadeIn delay={1400}>
        <View style={styles.doneStats}>
          <View style={styles.doneStat}>
            <Text style={styles.doneStatNum}>
              {right}/{total}
            </Text>
            <Text style={styles.doneStatLabel}>{t("İlk denemede doğru")}</Text>
          </View>
          <View style={[styles.doneStat, { backgroundColor: '#FFFBEB', borderColor: '#FDE68A' }]}>
            <Text style={[styles.doneStatNum, { color: '#B45309' }]}>+{ACTIVITY_XP}</Text>
            <Text style={styles.doneStatLabel}>{t("XP")}</Text>
          </View>
        </View>
      </FadeIn>
      <FadeIn delay={1600} style={{ alignSelf: 'stretch' }}>
        <NextButton label={t("Yola dön")} onPress={onExit} />
      </FadeIn>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: spacing.md, paddingTop: 6, paddingBottom: 10 },
  close: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  segments: { flex: 1, flexDirection: 'row', gap: 5 },
  segment: { flex: 1, height: 8, borderRadius: 4, backgroundColor: '#E2E8F0', overflow: 'hidden' },
  segmentFill: { height: '100%', borderRadius: 4 },

  body: { paddingHorizontal: spacing.md, paddingTop: 6, gap: 16 },
  note: { fontFamily: fonts.bodyMedium, fontSize: 13.5, lineHeight: 19, color: colors.textMuted, textAlign: 'center' },
  noteOk: { color: '#15803D', fontFamily: fonts.headingBold },
  noteBad: { color: '#B45309' },

  coverShadow: {
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    shadowColor: '#1E1B4B',
    shadowOpacity: 0.22,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
  coverClip: { flex: 1, overflow: 'hidden' },
  coverFallback: { alignItems: 'center', justifyContent: 'flex-end' },
  coverBadge: { position: 'absolute', top: 14, left: 14, backgroundColor: 'rgba(255,255,255,0.92)', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 6 },
  coverBadgeText: { fontFamily: fonts.headingBold, fontSize: 12.5, color: colors.brand, letterSpacing: 0.3 },
  coverTitle: { fontFamily: fonts.headingBold, fontSize: 28, lineHeight: 34, color: colors.textHeading, textAlign: 'center', marginTop: 4 },
  coverChips: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 8 },
  coverChip: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: '#FFFFFF', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 7, borderWidth: 1, borderColor: '#E2E8F0', maxWidth: '100%' },
  coverChipText: { fontFamily: fonts.headingBold, fontSize: 12.5, color: colors.brand, flexShrink: 1 },
  recap: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#EEF2FF', borderRadius: 18, padding: 12 },
  recapFace: { width: 42, height: 42, borderRadius: 21, borderWidth: 2, borderColor: '#FFFFFF' },
  recapLabel: { fontFamily: fonts.headingBold, fontSize: 11, letterSpacing: 0.5, color: colors.brand, textTransform: 'uppercase' },
  recapText: { fontFamily: fonts.bodyMedium, fontSize: 13.5, lineHeight: 19, color: colors.textBody, marginTop: 1 },

  stepHead: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  stepIcon: { width: 36, height: 36, borderRadius: 12, backgroundColor: '#EEF2FF', alignItems: 'center', justifyContent: 'center' },
  stepTitle: { fontFamily: fonts.headingBold, fontSize: 18, color: colors.textHeading },
  stepSub: { fontFamily: fonts.bodyRegular, fontSize: 13, lineHeight: 18, color: colors.textMuted, marginTop: 1 },

  next: {
    backgroundColor: colors.brand,
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 4,
    borderBottomColor: '#3730A3',
    marginTop: 4,
  },
  nextOk: { backgroundColor: '#16A34A', borderBottomColor: '#15803D' },
  nextBad: { backgroundColor: '#E11D48', borderBottomColor: '#9F1239' },
  nextOff: { opacity: 0.5 },
  nextText: { fontFamily: fonts.headingBold, fontSize: 17, color: '#FFFFFF' },

  feedback: { borderRadius: 22, padding: 14, gap: 10, borderWidth: 2 },
  feedbackOk: { backgroundColor: '#ECFDF5', borderColor: '#A7F3D0' },
  feedbackBad: { backgroundColor: '#FFF1F2', borderColor: '#FECDD3' },
  feedbackRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  feedbackIcon: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center' },
  feedbackTitle: { fontFamily: fonts.headingBold, fontSize: 18 },
  feedbackSub: { fontFamily: fonts.bodyMedium, fontSize: 14, color: colors.textBody, marginTop: 1 },

  wordGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  wordCell: { width: '48%', flexGrow: 1 },
  wordCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    gap: 4,
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: '#E0E7FF',
  },
  wordCardHeard: { borderColor: '#BBF7D0', backgroundColor: '#F7FEF9' },
  wordTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 },
  wordSpeaker: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#EEF2FF', alignItems: 'center', justifyContent: 'center' },
  wordSpeakerHeard: { backgroundColor: '#DCFCE7' },
  wordEn: { fontFamily: fonts.headingBold, fontSize: 18, color: colors.textHeading },
  wordNative: { fontFamily: fonts.bodyRegular, fontSize: 13.5, color: colors.textMuted },

  storyCard: { backgroundColor: '#FFFFFF', borderRadius: 22, padding: 16, gap: 4, borderWidth: 1, borderColor: '#EEF2FF' },
  sentence: { paddingVertical: 8, paddingRight: 30, paddingLeft: 10, borderBottomWidth: 1, borderBottomColor: '#F1F5F9', borderLeftWidth: 3, borderLeftColor: 'transparent' },
  sentenceNow: { borderLeftColor: colors.brand, backgroundColor: '#F8FAFF' },
  speaker: { fontFamily: fonts.headingBold, fontSize: 11.5, color: colors.brand, textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 2 },
  sentenceText: { fontFamily: fonts.bodyMedium, fontSize: 17, lineHeight: 26, color: colors.textHeading },
  newWord: { color: colors.brand, textDecorationLine: 'underline', fontFamily: fonts.headingBold },
  sentenceNative: { fontFamily: fonts.bodyRegular, fontSize: 14, lineHeight: 20, color: colors.textMuted, marginTop: 4 },
  replay: { position: 'absolute', right: 0, top: 10 },
  wordTip: { backgroundColor: colors.textHeading, borderRadius: 999, paddingHorizontal: 16, paddingVertical: 8 },
  wordTipText: { fontFamily: fonts.headingBold, fontSize: 14, color: '#FFFFFF' },

  qCard: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 18, gap: 6, borderWidth: 1, borderColor: '#EEF2FF' },
  qText: { fontFamily: fonts.headingBold, fontSize: 20, lineHeight: 27, color: colors.textHeading },
  qNative: { fontFamily: fonts.bodyRegular, fontSize: 14, color: colors.textMuted },
  options: { gap: 10 },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: '#E2E8F0',
  },
  optionOk: { backgroundColor: colors.success, borderColor: '#047857' },
  optionBad: { backgroundColor: colors.error, borderColor: '#9F1239' },
  optionDim: { opacity: 0.45 },
  optionText: { flex: 1, fontFamily: fonts.headingSemiBold, fontSize: 16, color: colors.textHeading },
  optionsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'center' },
  pill: { minWidth: 90, alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 16, paddingVertical: 14, paddingHorizontal: 18, borderWidth: 2, borderBottomWidth: 4, borderColor: '#E2E8F0' },
  pillText: { fontFamily: fonts.headingBold, fontSize: 17, color: colors.textHeading },
  orderHint: { fontFamily: fonts.bodyMedium, fontSize: 14, color: colors.textBody },

  mivoRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 8 },
  mivoImg: { width: 90, height: 90 },
  bubble: { flex: 1, backgroundColor: '#FFFFFF', borderRadius: 20, borderBottomLeftRadius: 4, padding: 14, borderWidth: 1, borderColor: '#EEF2FF' },
  bubbleKicker: { fontFamily: fonts.headingBold, fontSize: 11.5, letterSpacing: 0.5, color: colors.brand, textTransform: 'uppercase' },
  bubbleTitle: { fontFamily: fonts.headingBold, fontSize: 17, lineHeight: 23, color: colors.textHeading, marginTop: 2 },
  tipCard: { backgroundColor: '#FFFFFF', borderRadius: 22, padding: 18, gap: 12, borderWidth: 1, borderColor: '#EEF2FF' },
  tipLabel: { fontFamily: fonts.headingBold, fontSize: 11.5, letterSpacing: 0.5, color: colors.textMuted, textTransform: 'uppercase' },
  tipHighlight: { fontFamily: fonts.bodyMedium, fontSize: 18, lineHeight: 26, color: colors.textHeading, backgroundColor: '#F8FAFC', borderRadius: 12, padding: 12 },
  tipMark: { color: colors.brand, backgroundColor: '#E0E7FF' },
  tipRule: { fontFamily: fonts.bodyRegular, fontSize: 15, lineHeight: 22, color: colors.textBody },
  examples: { gap: 8 },
  example: { borderLeftWidth: 3, borderLeftColor: '#C7D2FE', paddingLeft: 10 },
  exampleEn: { fontFamily: fonts.headingSemiBold, fontSize: 15, color: colors.textHeading },
  exampleNative: { fontFamily: fonts.bodyRegular, fontSize: 13, color: colors.textMuted },
  mistake: { backgroundColor: '#FFF7ED', borderRadius: 14, padding: 12, gap: 8 },
  mistakeRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  mistakeTag: { width: 22, height: 22, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  mistakeLine: { flex: 1, fontFamily: fonts.headingBold, fontSize: 15 },
  mistakeWrong: { color: '#DC2626', textDecorationLine: 'line-through' },
  mistakeRight: { color: '#16A34A' },
  mistakeWhy: { fontFamily: fonts.bodyRegular, fontSize: 13.5, lineHeight: 19, color: '#9A3412' },

  sayCard: { backgroundColor: '#FFFFFF', borderRadius: 22, padding: 20, gap: 14, alignItems: 'center', borderWidth: 1, borderColor: '#EEF2FF' },
  sayCount: { fontFamily: fonts.headingBold, fontSize: 11.5, letterSpacing: 0.5, color: colors.textMuted, textTransform: 'uppercase' },
  sayText: { fontFamily: fonts.headingBold, fontSize: 22, lineHeight: 30, color: colors.textHeading, textAlign: 'center' },
  sayHit: { color: '#16A34A' },
  sayMiss: { color: '#DC2626' },
  listen: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#EEF2FF', borderRadius: 999, paddingHorizontal: 16, paddingVertical: 8 },
  listenText: { fontFamily: fonts.headingBold, fontSize: 14, color: colors.brand },
  micWrap: { width: 130, height: 130, alignItems: 'center', justifyContent: 'center' },
  micRing: { position: 'absolute', width: 84, height: 84, borderRadius: 42, backgroundColor: colors.error },
  mic: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 6,
    borderBottomColor: '#3730A3',
  },
  micRec: { backgroundColor: colors.error, borderBottomColor: '#9F1239' },
  skip: { fontFamily: fonts.bodyMedium, fontSize: 14, color: colors.textMuted, textAlign: 'center', textDecorationLine: 'underline' },

  done: { alignItems: 'center', gap: 14, paddingTop: 20 },
  doneHero: { width: 220, height: 200, alignItems: 'center', justifyContent: 'center' },
  doneGlow: { position: 'absolute', width: 200, height: 200, borderRadius: 100, backgroundColor: '#FEF3C7' },
  doneImg: { width: 170, height: 170 },
  doneTitle: { fontFamily: fonts.headingBold, fontSize: 28, color: colors.textHeading, textAlign: 'center' },
  doneStars: { flexDirection: 'row', alignItems: 'center', gap: 10, height: 70 },
  doneStats: { flexDirection: 'row', gap: 10 },
  doneStat: { minWidth: 120, alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 18, paddingVertical: 12, paddingHorizontal: 16, borderWidth: 2, borderColor: '#E2E8F0' },
  doneStatNum: { fontFamily: fonts.headingBold, fontSize: 22, color: colors.textHeading },
  doneStatLabel: { fontFamily: fonts.bodyMedium, fontSize: 12.5, color: colors.textMuted, marginTop: 2 },
});
