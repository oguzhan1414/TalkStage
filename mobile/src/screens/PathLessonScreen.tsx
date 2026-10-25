import Ionicons from '@expo/vector-icons/Ionicons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { File } from 'expo-file-system';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Animated, Easing, Image, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { mivoHomeImages, mivoVoiceImages, stateImages } from '../assets/images';
import { wordImage } from '../assets/wordImages';
import { useMivoTransition } from '../components/MivoTransitionOverlay';
import { FadeIn, PopIn, useLoop, usePop, useShake } from '../components/path/anim';
import { BoldText } from '../components/path/BoldText';
import { WordMatch } from '../components/path/WordMatch';
import { TapSentenceOrder } from '../components/reading/TapSentenceOrder';
import { ACTIVITY_XP } from '../constants/xp';
import { findStep, gloss, loc, type PathEpisode, type PathPractice, type PathTable, type PathWord } from '../data/path';
import { usePronunciation } from '../hooks/usePronunciation';
import { useVoiceRecorder } from '../hooks/useVoiceRecorder';
import { t } from '../i18n';
import { api, ApiError } from '../lib/api';
import { haptics } from '../lib/haptics';
import { postQueued } from '../lib/outbox';
import { stepArt } from '../lib/pathArt';
import { loadPathProgress, recordPart, starsOf } from '../lib/pathProgress';
import type { PathLessonScreenProps } from '../navigation/types';
import { colors, fonts, shadow, spacing } from '../theme/tokens';
import type { TranscribeResponse, VocabCardOut } from '../types/api';

/**
 * A reading lesson of the new path, in three parts with one star each (like chapters you can stop between):
 *   ⭐1 Words: pick the picture, match, type the word on a keyboard with only its letters, save them for review.
 *   ⭐2 Grammar: Mivo's note, the pattern table with a gap, sentence building with the new words.
 *   ⭐3 Story: Maya's episode, comprehension questions, saying a sentence aloud.
 * The cover shows the episode picture and the three parts; finishing a part records its star.
 */
type Phase = 'pick' | 'match' | 'type' | 'save' | 'tip' | 'table' | 'practice' | 'read' | 'quiz' | 'say';
type Screen = 'cover' | 'partDone' | 'done' | Phase;

const shuffle = <T,>(list: T[]): T[] => {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

/** Words of a sentence, lower-cased, without punctuation (for the read-aloud check). */
const tokens = (s: string) =>
  s
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/[^a-z0-9' ]+/g, ' ')
    .split(/\s+/)
    .filter(Boolean);

/** The phases of each part for this episode (steps without content are left out). */
function partPhases(e: PathEpisode): Phase[][] {
  const glossed = e.words.some((w) => gloss(w.native));
  const pickable = e.words.some((w) => wordImage(w.en)) || glossed;
  const words: Phase[] = [...(pickable ? (['pick'] as Phase[]) : []), ...(glossed ? (['match'] as Phase[]) : []), 'type', 'save'];
  const grammar: Phase[] = ['tip', ...(e.table ? (['table'] as Phase[]) : []), 'practice'];
  return [words, grammar, ['read', 'quiz', 'say']];
}

const PART_NAMES = () => [t("Kelimeler"), t("Dil bilgisi"), t("Hikâye")];

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
  const phases = useMemo(() => partPhases(episode), [episode]);
  const [screen, setScreen] = useState<Screen>('cover');
  const [part, setPart] = useState(0); // 0-based part being played
  const [partsDone, setPartsDone] = useState(0);
  const [sub, setSub] = useState(0);
  const score = useRef({ right: 0, total: 0 });
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    loadPathProgress().then((p) => setPartsDone(Math.min(3, starsOf(p, stepId))));
  }, [stepId]);

  useEffect(() => {
    setSub(0);
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  }, [screen]);

  const tally = (firstTry: boolean) => {
    score.current.total += 1;
    if (firstTry) score.current.right += 1;
  };
  const report = (i: number, n: number) => setSub(n ? i / n : 0);
  /** New content was added at the bottom (a sentence, the answer panel): bring it into view. */
  const toEnd = () => setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 120);

  const startPart = (p: number) => {
    setPart(p);
    setScreen(phases[p][0]);
  };
  const next = () => {
    const list = phases[part];
    const i = list.indexOf(screen as Phase);
    if (i >= 0 && i + 1 < list.length) setScreen(list[i + 1]);
    else {
      setPartsDone((d) => Math.max(d, part + 1));
      setScreen(part === 2 ? 'done' : 'partDone');
    }
  };

  const inPart = phases[part].indexOf(screen as Phase);
  const barValue = inPart >= 0 ? (inPart + sub) / phases[part].length : 0;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <Pressable onPress={onExit} hitSlop={12} style={styles.close} accessibilityRole="button" accessibilityLabel={t("Kapat")}>
          <Ionicons name="close" size={24} color={colors.textHeading} />
        </Pressable>
        {inPart >= 0 ? (
          <>
            <Bar value={barValue} />
            <View style={styles.partTag}>
              <Ionicons name="star" size={14} color="#F59E0B" />
              <Text style={styles.partTagText}>{part + 1}/3</Text>
            </View>
          </>
        ) : (
          <View style={{ flex: 1 }} />
        )}
      </View>

      <ScrollView
        ref={scrollRef}
        style={{ flex: 1 }}
        contentContainerStyle={[styles.body, { paddingBottom: Math.max(insets.bottom, 16) + 24 }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {screen === 'cover' ? (
          <CoverStep episode={episode} art={art} partsDone={partsDone} onStart={startPart} />
        ) : screen === 'pick' ? (
          <PickStep words={episode.words} tally={tally} report={report} onAnswered={toEnd} onDone={next} />
        ) : screen === 'match' ? (
          <>
            <FadeIn>
              <StepHead icon="git-compare" title={t("Eşleştir")} sub={t("Kelimeyi anlamıyla eşleştir.")} />
            </FadeIn>
            <WordMatch
              words={episode.words}
              onDone={(mistakes) => {
                tally(mistakes === 0);
                next();
              }}
            />
          </>
        ) : screen === 'type' ? (
          <TypeStep words={episode.words} tally={tally} report={report} onDone={next} />
        ) : screen === 'save' ? (
          <SaveStep episode={episode} onDone={next} />
        ) : screen === 'tip' ? (
          <TipStep episode={episode} onNext={next} />
        ) : screen === 'table' && episode.table ? (
          <TableStep table={episode.table} tally={tally} onAnswered={toEnd} onDone={next} />
        ) : screen === 'practice' ? (
          <PracticeStep episode={episode} tally={tally} report={report} onAnswered={toEnd} onNext={next} />
        ) : screen === 'read' ? (
          <ReadStep episode={episode} report={report} onGrow={toEnd} onNext={next} />
        ) : screen === 'quiz' ? (
          <QuizStep episode={episode} tally={tally} report={report} onAnswered={toEnd} onNext={next} />
        ) : screen === 'say' ? (
          <SayStep sentences={episode.say} report={report} onNext={next} />
        ) : screen === 'partDone' ? (
          <PartDone stepId={stepId} part={part + 1} onNext={() => startPart(part + 1)} onExit={onExit} />
        ) : (
          <DoneStep stepId={stepId} episode={episode} right={score.current.right} total={score.current.total} onExit={onExit} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------------- Shared pieces ---------------- */

/** The progress bar of the part being played; it slides to its new value. */
function Bar({ value }: { value: number }) {
  const v = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(v, { toValue: Math.max(0.04, Math.min(1, value)), duration: 420, easing: Easing.out(Easing.cubic), useNativeDriver: false }).start();
  }, [value, v]);
  return (
    <View style={styles.bar}>
      <Animated.View style={[styles.barFill, { width: v.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }) }]} />
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

/** The panel that slides in after an answer: right / not quite, a line under it, and the way on. */
function Feedback({ ok, sub, label, onNext }: { ok: boolean; sub?: string; label: string; onNext: () => void }) {
  const praise = useMemo(() => [t("Doğru!"), t("Harika!"), t("Süper!")][Math.floor(Math.random() * 3)], []);
  return (
    <FadeIn from={24} style={[styles.feedback, ok ? styles.feedbackOk : styles.feedbackBad]}>
      <View style={styles.feedbackRow}>
        <PopIn style={[styles.feedbackIcon, { backgroundColor: ok ? colors.success : colors.error }]}>
          <Ionicons name={ok ? 'checkmark' : 'close'} size={22} color="#FFFFFF" />
        </PopIn>
        <View style={{ flex: 1 }}>
          <Text style={[styles.feedbackTitle, { color: ok ? '#047857' : '#BE123C' }]}>{ok ? praise : t("Tam değil")}</Text>
          {sub ? <Text style={styles.feedbackSub}>{sub}</Text> : null}
        </View>
      </View>
      <NextButton label={label} onPress={onNext} tone={ok ? 'ok' : 'bad'} />
    </FadeIn>
  );
}

/** "word = meaning", or just the word for English speakers. */
const wordLine = (w: PathWord) => (gloss(w.native) ? `${w.en} = ${gloss(w.native)}` : w.en);

/* ---------------- Cover ---------------- */

function CoverStep({ episode, art, partsDone, onStart }: { episode: PathEpisode; art?: number; partsDone: number; onStart: (part: number) => void }) {
  const { width, height } = useWindowDimensions();
  const size = Math.round(Math.min(width - spacing.md * 2, height * 0.34));
  const zoom = useLoop(true, 9000, true);
  const scale = zoom.interpolate({ inputRange: [0, 1], outputRange: [1, 1.07] });
  const names = PART_NAMES();
  const subs = [t("{{n}} yeni kelime", { n: episode.words.length }), loc(episode.grammar), t("Okuma ve konuşma")];
  const icons: React.ComponentProps<typeof Ionicons>['name'][] = ['text', 'construct', 'book'];
  const nextPart = Math.min(partsDone, 2);
  const allDone = partsDone >= 3;

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

      <FadeIn delay={120}>
        <Text style={styles.coverTitle}>{loc(episode.title)}</Text>
        {episode.recap ? (
          <Text style={styles.coverRecap} numberOfLines={2}>
            {loc(episode.recap)}
          </Text>
        ) : null}
      </FadeIn>

      <View style={styles.parts}>
        {names.map((name, i) => {
          const done = i < partsDone;
          const isNext = !allDone && i === nextPart;
          const locked = !done && !isNext && !allDone;
          return (
            <FadeIn key={name} delay={200 + i * 80}>
              <Pressable
                onPress={() => onStart(i)}
                disabled={locked}
                style={({ pressed }) => [styles.partRow, isNext && styles.partRowNext, locked && { opacity: 0.55 }, pressed && { transform: [{ scale: 0.98 }] }]}
                accessibilityRole="button"
              >
                <View style={[styles.partIcon, done && styles.partIconDone, isNext && styles.partIconNext]}>
                  <Ionicons name={done ? 'star' : locked ? 'lock-closed' : icons[i]} size={18} color={done ? '#F59E0B' : isNext ? '#FFFFFF' : '#94A3B8'} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.partName}>{t("{{n}}. yıldız · {{name}}", { n: i + 1, name })}</Text>
                  <Text style={styles.partSub} numberOfLines={1}>
                    {subs[i]}
                  </Text>
                </View>
                {done ? <Ionicons name="checkmark-circle" size={22} color="#22C55E" /> : !locked ? <Ionicons name="chevron-forward" size={20} color={colors.brand} /> : null}
              </Pressable>
            </FadeIn>
          );
        })}
      </View>

      <FadeIn delay={460}>
        <NextButton label={allDone ? t("Baştan başla") : partsDone > 0 ? t("Devam et") : t("Başla")} onPress={() => onStart(allDone ? 0 : nextPart)} />
      </FadeIn>
    </>
  );
}

/* ---------------- ⭐1 Words ---------------- */

/** Hear the word, pick its picture out of two (or its meaning when the word has no picture). */
function PickStep({
  words,
  tally,
  report,
  onAnswered,
  onDone,
}: {
  words: PathWord[];
  tally: (ok: boolean) => void;
  report: (i: number, n: number) => void;
  onAnswered: () => void;
  onDone: () => void;
}) {
  const { pronounce } = usePronunciation();
  const { width } = useWindowDimensions();
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const w = words[idx];
  const options = useMemo(() => {
    const others = words.filter((o) => o.en !== w.en && (wordImage(w.en) ? wordImage(o.en) : gloss(o.native)));
    const other = others[Math.floor(Math.random() * others.length)] ?? words[(idx + 1) % words.length];
    return shuffle([w, other]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);
  const card = Math.floor((width - spacing.md * 2 - 12) / 2);

  useEffect(() => {
    report(idx, words.length);
    pronounce(w.en).catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  const next = () => {
    if (idx + 1 >= words.length) onDone();
    else {
      setIdx(idx + 1);
      setPicked(null);
    }
  };

  return (
    <>
      <FadeIn>
        <StepHead icon="images" title={t("Resmi bul")} sub={t("Kelimeyi dinle ve doğru resmi seç.")} />
      </FadeIn>
      <FadeIn key={`w${idx}`} delay={40} style={styles.pickWordRow}>
        <Pressable onPress={() => pronounce(w.en).catch(() => {})} style={styles.pickSpeaker} accessibilityRole="button" accessibilityLabel={t("Dinle")}>
          <Ionicons name="volume-high" size={22} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.pickWord}>{w.en}</Text>
      </FadeIn>
      <View style={styles.pickCards}>
        {options.map((o, i) => (
          <PickCard
            key={`${idx}-${o.en}`}
            word={o}
            size={card}
            index={i}
            state={picked === null ? 'idle' : o.en === w.en ? 'ok' : i === picked ? 'bad' : 'dim'}
            onPress={() => {
              if (picked !== null) return;
              setPicked(i);
              const ok = o.en === w.en;
              tally(ok);
              if (ok) haptics.success();
              else haptics.warning();
              onAnswered();
            }}
          />
        ))}
      </View>
      {picked !== null ? (
        <Feedback key={`f${idx}`} ok={options[picked].en === w.en} sub={wordLine(w)} label={t("Devam")} onNext={next} />
      ) : null}
    </>
  );
}

function PickCard({ word, size, index, state, onPress }: { word: PathWord; size: number; index: number; state: 'idle' | 'ok' | 'bad' | 'dim'; onPress: () => void }) {
  const shake = useShake();
  const pop = usePop(1.06);
  useEffect(() => {
    if (state === 'ok') pop.pop();
    if (state === 'bad') shake.shake();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);
  const img = wordImage(word.en);
  return (
    <FadeIn delay={100 + index * 80}>
      <Animated.View style={[shake.style]}>
        <Animated.View style={pop.style}>
          <Pressable
            onPress={onPress}
            style={[styles.pickCard, { width: size, height: size }, state === 'ok' && styles.pickCardOk, state === 'bad' && styles.pickCardBad, state === 'dim' && styles.optionDim]}
            accessibilityRole="button"
          >
            {img ? (
              <Image source={img} style={{ width: size * 0.58, height: size * 0.58 }} resizeMode="contain" />
            ) : (
              <Text style={styles.pickMeaning}>{gloss(word.native)}</Text>
            )}
            {state === 'ok' || state === 'bad' ? (
              <View style={[styles.pickMark, { backgroundColor: state === 'ok' ? colors.success : colors.error }]}>
                <Ionicons name={state === 'ok' ? 'checkmark' : 'close'} size={16} color="#FFFFFF" />
              </View>
            ) : null}
          </Pressable>
        </Animated.View>
      </Animated.View>
    </FadeIn>
  );
}

const KEY_ROWS = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];

/** Type the word: the keyboard only opens the word's letters; a wrong letter shakes, "Yardım" adds the next one. */
function TypeStep({ words, tally, report, onDone }: { words: PathWord[]; tally: (ok: boolean) => void; report: (i: number, n: number) => void; onDone: () => void }) {
  const { pronounce } = usePronunciation();
  const { width } = useWindowDimensions();
  const items = words.slice(0, 5);
  const [idx, setIdx] = useState(0);
  const [pos, setPos] = useState(0);
  const slip = useRef(false);
  const shake = useShake();
  const w = items[idx];
  const target = w.en.toLowerCase();
  // Letters to type; spaces, apostrophes and hyphens fill themselves.
  const isLetter = (c: string) => /[a-z]/.test(c);
  const skipFixed = (p: number) => {
    let q = p;
    while (q < target.length && !isLetter(target[q])) q += 1;
    return q;
  };
  const at = skipFixed(pos);
  const solved = at >= target.length;
  const open = useMemo(() => new Set(target.split('').filter(isLetter)), [target]);
  const keyW = Math.floor((width - 16 - 9 * 5) / 10);

  useEffect(() => {
    report(idx, items.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  useEffect(() => {
    if (!solved) return;
    tally(!slip.current);
    haptics.success();
    pronounce(w.en).catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [solved]);

  const press = (k: string) => {
    if (solved) return;
    if (k === target[at]) {
      haptics.selection();
      setPos(skipFixed(at + 1));
    } else {
      slip.current = true;
      haptics.warning();
      shake.shake();
    }
  };
  const help = () => {
    if (solved) return;
    slip.current = true;
    setPos(skipFixed(at + 1));
  };
  const next = () => {
    if (idx + 1 >= items.length) onDone();
    else {
      // Reset in the same render as the word change, so the new word never looks solved for a frame.
      slip.current = false;
      setPos(0);
      setIdx(idx + 1);
    }
  };

  const meaning = gloss(w.native);
  const img = wordImage(w.en);

  return (
    <>
      <FadeIn>
        <StepHead icon="create" title={t("Kelimeyi yaz")} sub={t("Sadece kelimenin harfleri açık. Sırayla dokun.")} />
      </FadeIn>
      <FadeIn key={`t${idx}`} delay={40} style={styles.typePrompt}>
        {img ? <Image source={img} style={styles.typeImg} resizeMode="contain" /> : null}
        <Text style={styles.typeMeaning}>{meaning || w.en}</Text>
      </FadeIn>

      <Animated.View style={[styles.slots, shake.style]}>
        {target.split('').map((c, i) =>
          isLetter(c) ? (
            <View key={i} style={[styles.slot, i < at && styles.slotFilled, solved && styles.slotSolved]}>
              <Text style={[styles.slotText, solved && { color: '#15803D' }]}>{i < at ? w.en[i] : ''}</Text>
            </View>
          ) : (
            <View key={i} style={styles.slotGap}>
              <Text style={styles.slotText}>{c.trim()}</Text>
            </View>
          )
        )}
      </Animated.View>

      {solved ? (
        <Feedback key={`f${idx}`} ok={!slip.current} sub={wordLine(w)} label={t("Devam")} onNext={next} />
      ) : (
        <>
          <Pressable onPress={help} style={styles.helpBtn} accessibilityRole="button">
            <Ionicons name="bulb-outline" size={16} color={colors.brand} />
            <Text style={styles.helpText}>{t("Yardım")}</Text>
          </Pressable>
          <View style={styles.keyboard}>
            {KEY_ROWS.map((row) => (
              <View key={row} style={styles.keyRow}>
                {row.split('').map((k) => {
                  const on = open.has(k);
                  return (
                    <Pressable
                      key={k}
                      disabled={!on}
                      onPress={() => press(k)}
                      style={({ pressed }) => [styles.key, { width: keyW }, on ? styles.keyOn : styles.keyOff, pressed && on && { transform: [{ translateY: 2 }] }]}
                    >
                      <Text style={[styles.keyText, !on && { color: '#CBD5E1' }]}>{k}</Text>
                    </Pressable>
                  );
                })}
              </View>
            ))}
          </View>
        </>
      )}
    </>
  );
}

/** Offer the episode's words for the review deck: all ticked, untick what you know. */
function SaveStep({ episode, onDone }: { episode: PathEpisode; onDone: () => void }) {
  const queryClient = useQueryClient();
  const { data: cards } = useQuery({ queryKey: ['vocab-cards', 'all'], queryFn: () => api.get<VocabCardOut[]>('/vocab-cards?all=true') });
  const owned = useMemo(() => new Set((cards ?? []).map((c) => c.term.trim().toLowerCase())), [cards]);
  const [off, setOff] = useState<Set<string>>(new Set());
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chosen = episode.words.filter((w) => !owned.has(w.en.toLowerCase()) && !off.has(w.en));

  const save = async () => {
    if (chosen.length === 0) return onDone();
    setSaving(true);
    setError(null);
    try {
      await Promise.all(
        chosen.map((w) =>
          api.post('/vocab-cards', {
            term: w.en,
            translation: gloss(w.native) || null,
            example_sentence: episode.sentences.find((s) => s.en.toLowerCase().includes(w.en.toLowerCase()))?.en,
            source_label: t("Hikâye · Bölüm {{n}}", { n: episode.number }),
          })
        )
      );
      queryClient.invalidateQueries({ queryKey: ['vocab-cards'] });
      haptics.success();
      onDone();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : t("Kelimeler eklenirken hata oluştu."));
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <FadeIn>
        <StepHead icon="bookmark" title={t("Tekrar için kaydet")} sub={t("Bu kelimeler tekrar listene eklensin mi? Bildiklerinin işaretini kaldır.")} />
      </FadeIn>
      <View style={{ gap: 10 }}>
        {episode.words.map((w, i) => {
          const have = owned.has(w.en.toLowerCase());
          const on = !have && !off.has(w.en);
          const img = wordImage(w.en);
          return (
            <FadeIn key={w.en} delay={60 + i * 60}>
              <Pressable
                disabled={have}
                onPress={() => setOff((s) => (s.has(w.en) ? new Set([...s].filter((x) => x !== w.en)) : new Set(s).add(w.en)))}
                style={[styles.saveRow, on && styles.saveRowOn]}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: on }}
              >
                <View style={[styles.check, on && styles.checkOn]}>{on ? <Ionicons name="checkmark" size={16} color="#FFFFFF" /> : null}</View>
                {img ? <Image source={img} style={styles.saveImg} resizeMode="contain" /> : null}
                <View style={{ flex: 1 }}>
                  <Text style={styles.saveEn}>{w.en}</Text>
                  {gloss(w.native) ? <Text style={styles.saveNative}>{gloss(w.native)}</Text> : null}
                </View>
                {have ? <Text style={styles.saveHave}>{t("Listende var")}</Text> : null}
              </Pressable>
            </FadeIn>
          );
        })}
      </View>
      {error ? <Text style={[styles.note, { color: colors.error }]}>{error}</Text> : null}
      <FadeIn delay={120 + episode.words.length * 60}>
        <NextButton
          label={chosen.length ? t("{{n}} kelime ekle", { n: chosen.length }) : t("Devam")}
          onPress={save}
          disabled={saving}
        />
      </FadeIn>
      {chosen.length ? (
        <Pressable onPress={onDone} hitSlop={8} accessibilityRole="button">
          <Text style={styles.skip}>{t("Şimdi değil")}</Text>
        </Pressable>
      ) : null}
    </>
  );
}

/* ---------------- ⭐2 Grammar ---------------- */

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

const COL_COLORS = ['#4F46E5', '#16A34A', colors.textHeading];

/** The pattern table: example rows column by column, then a row with a gap to fill. */
function TableStep({ table, tally, onAnswered, onDone }: { table: PathTable; tally: (ok: boolean) => void; onAnswered: () => void; onDone: () => void }) {
  const { pronounce } = usePronunciation();
  const [picked, setPicked] = useState<string | null>(null);
  const options = useMemo(() => shuffle(table.ask.options), [table]);
  const answer = table.ask.cells[table.ask.col];
  const ok = picked === answer;
  const pop = usePop(1.15);
  const shake = useShake();
  const align = (c: number, n: number) => (c === 0 ? 'left' : c === n - 1 ? 'right' : 'center') as 'left' | 'center' | 'right';
  const n = table.ask.cells.length;

  const choose = (o: string) => {
    if (picked) return;
    setPicked(o);
    const right = o === answer;
    tally(right);
    if (right) {
      haptics.success();
      pop.pop();
    } else {
      haptics.warning();
      shake.shake();
    }
    pronounce(table.ask.cells.join(' ')).catch(() => {});
    onAnswered();
  };

  return (
    <>
      <FadeIn>
        <StepHead icon="grid" title={t("Kalıbı tamamla")} sub={t("Satırlara bak, boşluğa hangisi gelir?")} />
      </FadeIn>
      <FadeIn delay={60} style={[styles.tableCard, shadow.card]}>
        {table.rows.map((row, r) => (
          <FadeIn key={r} delay={120 + r * 70} style={styles.tableRow}>
            {row.map((cell, c) => (
              <Text key={c} style={[styles.tableCell, { color: COL_COLORS[Math.min(c, 2)], textAlign: align(c, n) }]}>
                {cell}
              </Text>
            ))}
          </FadeIn>
        ))}
        <FadeIn delay={120 + table.rows.length * 70} style={[styles.tableRow, { borderBottomWidth: 0 }]}>
          {table.ask.cells.map((cell, c) =>
            c === table.ask.col ? (
              <View key={c} style={{ flex: 1, alignItems: c === 0 ? 'flex-start' : c === n - 1 ? 'flex-end' : 'center' }}>
                <Animated.View style={[picked ? (ok ? pop.style : shake.style) : null]}>
                  {picked ? (
                    <Text style={[styles.tableCell, styles.tableAnswer, { color: ok ? '#16A34A' : colors.error, flex: 0 }]}>{answer}</Text>
                  ) : (
                    <View style={styles.tableGap}>
                      <Text style={styles.tableGapText}>…</Text>
                    </View>
                  )}
                </Animated.View>
              </View>
            ) : (
              <Text key={c} style={[styles.tableCell, styles.tableAsk, { color: COL_COLORS[Math.min(c, 2)], textAlign: align(c, n) }]}>
                {cell}
              </Text>
            )
          )}
        </FadeIn>
      </FadeIn>
      {gloss(table.ask.native) ? (
        <FadeIn delay={200 + table.rows.length * 70}>
          <Text style={styles.tableNative}>{gloss(table.ask.native)}</Text>
        </FadeIn>
      ) : null}
      <View style={styles.optionsRow}>
        {options.map((o, i) => (
          <Choice key={o} pill label={o} index={i + table.rows.length} state={!picked ? 'idle' : o === answer ? 'ok' : o === picked ? 'bad' : 'dim'} onPress={() => choose(o)} />
        ))}
      </View>
      {picked ? <Feedback ok={ok} sub={table.ask.cells.join(' ')} label={t("Devam")} onNext={onDone} /> : null}
    </>
  );
}

function PracticeStep({
  episode,
  tally,
  report,
  onAnswered,
  onNext,
}: {
  episode: PathEpisode;
  tally: (ok: boolean) => void;
  report: (i: number, n: number) => void;
  onAnswered: () => void;
  onNext: () => void;
}) {
  const items: PathPractice[] = episode.practice;
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [orderDone, setOrderDone] = useState(false);
  const wrongOnce = useRef(false);
  const item = items[idx];
  const last = idx + 1 >= items.length;

  useEffect(() => {
    report(idx, items.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

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
        <StepHead icon="barbell" title={t("Cümle kur")} sub={t("Alıştırma {{n}}/{{total}}", { n: idx + 1, total: items.length })} />
      </FadeIn>
      {/* Mivo's rule stays in view while building sentences. */}
      <FadeIn delay={30} style={styles.ruleCard}>
        <Image source={mivoHomeImages.fab} style={styles.ruleFace} />
        <BoldText text={loc(episode.tip.rule)} style={styles.ruleText} boldStyle={{ color: colors.brand }} />
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
            <Feedback
              key={`f${idx}`}
              ok={picked === item.answer}
              sub={picked === item.answer ? undefined : t("Doğru cevap: {{a}}", { a: item.options[item.answer] })}
              label={last ? t("Devam") : t("Sıradaki")}
              onNext={next}
            />
          ) : null}
        </>
      ) : (
        <>
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
          {orderDone ? <Feedback key={`f${idx}`} ok sub={item.sentence} label={last ? t("Devam") : t("Sıradaki")} onNext={next} /> : null}
        </>
      )}
    </>
  );
}

/* ---------------- ⭐3 Story ---------------- */

function ReadStep({ episode, report, onGrow, onNext }: { episode: PathEpisode; report: (i: number, n: number) => void; onGrow: () => void; onNext: () => void }) {
  const { pronounce } = usePronunciation();
  const [shown, setShown] = useState(1);
  const [translated, setTranslated] = useState<Set<number>>(new Set());
  const [wordTip, setWordTip] = useState<string | null>(null);
  const newWords = useMemo(() => new Map(episode.words.map((w) => [w.en.toLowerCase(), gloss(w.native)])), [episode.words]);

  useEffect(() => {
    const s = episode.sentences[shown - 1];
    if (s) pronounce(s.en, { rate: 0.9 }).catch(() => {});
    report(shown - 1, episode.sentences.length);
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

function QuizStep({
  episode,
  tally,
  report,
  onAnswered,
  onNext,
}: {
  episode: PathEpisode;
  tally: (ok: boolean) => void;
  report: (i: number, n: number) => void;
  onAnswered: () => void;
  onNext: () => void;
}) {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const q = episode.questions[idx];

  useEffect(() => {
    report(idx, episode.questions.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

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
          sub={picked === q.answer ? undefined : t("Doğru cevap: {{a}}", { a: q.options[q.answer] })}
          label={idx + 1 >= episode.questions.length ? t("Devam") : t("Sıradaki soru")}
          onNext={next}
        />
      ) : null}
    </>
  );
}

function SayStep({ sentences, report, onNext }: { sentences: string[]; report: (i: number, n: number) => void; onNext: () => void }) {
  const { pronounce } = usePronunciation();
  const recorder = useVoiceRecorder();
  const [idx, setIdx] = useState(0);
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<{ heard: string; hits: Set<number>; ok: boolean } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const sentence = sentences[idx];
  const words = sentence.split(/\s+/);
  const ring = useLoop(recorder.isRecording, 1200);

  useEffect(() => {
    report(idx, sentences.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

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
        {sentences.length > 1 ? <Text style={styles.sayCount}>{t("Cümle {{n}}/{{total}}", { n: idx + 1, total: sentences.length })}</Text> : null}
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
          <NextButton label={idx + 1 >= sentences.length ? t("Dersi bitir") : t("Sıradaki cümle")} onPress={next} tone={result?.ok ? 'ok' : 'brand'} />
        </FadeIn>
      ) : (
        <Pressable onPress={next} hitSlop={8} accessibilityRole="button">
          <Text style={styles.skip}>{t("Şu an konuşamıyorum, geç")}</Text>
        </Pressable>
      )}
    </>
  );
}

/* ---------------- Between parts / results ---------------- */

/** A part is finished: its star pops, the next part is one tap away (or come back later). */
function PartDone({ stepId, part, onNext, onExit }: { stepId: string; part: number; onNext: () => void; onExit: () => void }) {
  const names = PART_NAMES();
  useEffect(() => {
    void recordPart(stepId, part);
    haptics.success();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View style={styles.done}>
      <View style={styles.doneStars}>
        {[1, 2, 3].map((n) =>
          n === part ? (
            <PopIn key={n} delay={150} style={{ marginTop: -14 }}>
              <Ionicons name="star" size={72} color="#F59E0B" />
            </PopIn>
          ) : (
            <Ionicons key={n} name="star" size={46} color={n < part ? '#F59E0B' : '#E2E8F0'} />
          )
        )}
      </View>
      <FadeIn delay={350}>
        <Text style={styles.doneTitle}>{t("{{n}}. yıldız tamam!", { n: part })}</Text>
        <Text style={styles.doneSub}>{t("{{name}} bitti. Sırada: {{next}}", { name: names[part - 1], next: names[part] })}</Text>
      </FadeIn>
      <FadeIn delay={550} style={styles.partNextCard}>
        <Image source={part === 1 ? mivoVoiceImages.note : mivoVoiceImages.speak} style={styles.partNextMivo} resizeMode="contain" />
        <Text style={styles.partNextText}>
          {part === 1
            ? t("Şimdi bu kelimelerle cümle kuracağız. Kısa bir kural, sonra pratik!")
            : t("Sırada Maya'nın hikâyesi var. Yeni kelimeleri ve kalıbı orada göreceksin.")}
        </Text>
      </FadeIn>
      <FadeIn delay={700} style={{ alignSelf: 'stretch', gap: 12 }}>
        <NextButton label={t("Devam: {{name}}", { name: names[part] })} onPress={onNext} />
        <Pressable onPress={onExit} hitSlop={8} accessibilityRole="button">
          <Text style={styles.skip}>{t("Sonra devam ederim")}</Text>
        </Pressable>
      </FadeIn>
    </View>
  );
}

function DoneStep({ stepId, episode, right, total, onExit }: { stepId: string; episode: PathEpisode; right: number; total: number; onExit: () => void }) {
  const queryClient = useQueryClient();
  const saved = useRef(false);
  const glow = useLoop(true, 2400, true);
  useEffect(() => {
    if (saved.current) return;
    saved.current = true;
    haptics.success();
    void recordPart(stepId, 3);
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
          <PopIn key={n} delay={500 + n * 260} onShow={() => haptics.selection()} style={n === 2 ? { marginTop: -14 } : undefined}>
            <Ionicons name="star" size={n === 2 ? 58 : 46} color="#F59E0B" />
          </PopIn>
        ))}
      </View>
      <FadeIn delay={1400}>
        <View style={styles.doneStats}>
          {total > 0 ? (
            <View style={styles.doneStat}>
              <Text style={styles.doneStatNum}>
                {right}/{total}
              </Text>
              <Text style={styles.doneStatLabel}>{t("İlk denemede doğru")}</Text>
            </View>
          ) : null}
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
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: spacing.md, paddingTop: 6, paddingBottom: 10, minHeight: 52 },
  close: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  bar: { flex: 1, height: 12, borderRadius: 6, backgroundColor: '#E2E8F0', overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: 6, backgroundColor: '#FBBF24' },
  partTag: { flexDirection: 'row', alignItems: 'center', gap: 3, backgroundColor: '#FFFBEB', borderRadius: 999, paddingHorizontal: 9, paddingVertical: 5, borderWidth: 1, borderColor: '#FDE68A' },
  partTagText: { fontFamily: fonts.headingBold, fontSize: 12.5, color: '#B45309' },

  body: { paddingHorizontal: spacing.md, paddingTop: 6, gap: 16 },
  note: { fontFamily: fonts.bodyMedium, fontSize: 13.5, lineHeight: 19, color: colors.textMuted, textAlign: 'center' },
  noteOk: { color: '#15803D', fontFamily: fonts.headingBold },
  noteBad: { color: '#B45309' },
  skip: { fontFamily: fonts.bodyMedium, fontSize: 14, color: colors.textMuted, textAlign: 'center', textDecorationLine: 'underline' },

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
  coverTitle: { fontFamily: fonts.headingBold, fontSize: 26, lineHeight: 32, color: colors.textHeading, textAlign: 'center' },
  coverRecap: { fontFamily: fonts.bodyMedium, fontSize: 13.5, lineHeight: 19, color: colors.textMuted, textAlign: 'center', marginTop: 4 },
  parts: { gap: 8 },
  partRow: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#FFFFFF', borderRadius: 18, padding: 12, borderWidth: 2, borderColor: '#E2E8F0' },
  partRowNext: { borderColor: '#C7D2FE', backgroundColor: '#F5F7FF' },
  partIcon: { width: 38, height: 38, borderRadius: 19, backgroundColor: '#F1F5F9', alignItems: 'center', justifyContent: 'center' },
  partIconDone: { backgroundColor: '#FEF3C7' },
  partIconNext: { backgroundColor: colors.brand },
  partName: { fontFamily: fonts.headingBold, fontSize: 15.5, color: colors.textHeading },
  partSub: { fontFamily: fonts.bodyRegular, fontSize: 13, color: colors.textMuted, marginTop: 1 },

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
  feedbackSub: { fontFamily: fonts.bodyMedium, fontSize: 15, color: colors.textBody, marginTop: 1 },

  pickWordRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 14, paddingVertical: 10 },
  pickSpeaker: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.brand, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 3, borderBottomColor: '#3730A3' },
  pickWord: { fontFamily: fonts.headingBold, fontSize: 34, color: colors.textHeading },
  pickCards: { flexDirection: 'row', gap: 12 },
  pickCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 2,
    borderBottomWidth: 5,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  pickCardOk: { borderColor: '#22C55E', backgroundColor: '#F0FDF4' },
  pickCardBad: { borderColor: colors.error, backgroundColor: '#FFF1F2' },
  pickMeaning: { fontFamily: fonts.headingBold, fontSize: 20, color: colors.textHeading, textAlign: 'center' },
  pickMark: { position: 'absolute', top: 10, right: 10, width: 26, height: 26, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },

  typePrompt: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12, paddingVertical: 6 },
  typeImg: { width: 64, height: 64 },
  typeMeaning: { fontFamily: fonts.headingBold, fontSize: 26, color: colors.textHeading },
  slots: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 6, paddingVertical: 10 },
  slot: { width: 34, height: 44, borderRadius: 10, borderBottomWidth: 3, borderBottomColor: '#CBD5E1', backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' },
  slotFilled: { borderBottomColor: colors.brand },
  slotSolved: { borderBottomColor: '#22C55E', backgroundColor: '#F0FDF4' },
  slotGap: { width: 14, height: 44, alignItems: 'center', justifyContent: 'center' },
  slotText: { fontFamily: fonts.headingBold, fontSize: 24, color: colors.textHeading },
  helpBtn: { alignSelf: 'center', flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#EEF2FF', borderRadius: 999, paddingHorizontal: 18, paddingVertical: 10 },
  helpText: { fontFamily: fonts.headingBold, fontSize: 14.5, color: colors.brand },
  keyboard: { gap: 8, marginHorizontal: -spacing.md + 8 },
  keyRow: { flexDirection: 'row', justifyContent: 'center', gap: 5 },
  key: { height: 48, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  keyOn: { backgroundColor: '#FFFFFF', borderWidth: 2, borderBottomWidth: 4, borderColor: '#C7D2FE' },
  keyOff: { backgroundColor: '#F1F5F9' },
  keyText: { fontFamily: fonts.headingBold, fontSize: 19, color: colors.textHeading },

  saveRow: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#FFFFFF', borderRadius: 18, padding: 12, borderWidth: 2, borderColor: '#E2E8F0' },
  saveRowOn: { borderColor: '#C7D2FE', backgroundColor: '#F5F7FF' },
  check: { width: 26, height: 26, borderRadius: 8, borderWidth: 2, borderColor: '#CBD5E1', alignItems: 'center', justifyContent: 'center' },
  checkOn: { backgroundColor: colors.brand, borderColor: colors.brand },
  saveImg: { width: 38, height: 38 },
  saveEn: { fontFamily: fonts.headingBold, fontSize: 17, color: colors.textHeading },
  saveNative: { fontFamily: fonts.bodyRegular, fontSize: 13.5, color: colors.textMuted },
  saveHave: { fontFamily: fonts.bodyMedium, fontSize: 12, color: colors.textMuted },

  mivoRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 8 },
  mivoImg: { width: 90, height: 90 },
  bubble: { flex: 1, backgroundColor: '#FFFFFF', borderRadius: 20, borderBottomLeftRadius: 4, padding: 14, borderWidth: 1, borderColor: '#EEF2FF' },
  bubbleKicker: { fontFamily: fonts.headingBold, fontSize: 11.5, letterSpacing: 0.5, color: colors.brand, textTransform: 'uppercase' },
  bubbleTitle: { fontFamily: fonts.headingBold, fontSize: 17, lineHeight: 23, color: colors.textHeading, marginTop: 2 },
  tipCard: { backgroundColor: '#FFFFFF', borderRadius: 22, padding: 18, gap: 12, borderWidth: 1, borderColor: '#EEF2FF' },
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

  tableCard: { backgroundColor: '#FFFFFF', borderRadius: 22, paddingHorizontal: 18, paddingVertical: 6, borderWidth: 2, borderColor: '#E2E8F0' },
  tableRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  tableCell: { flex: 1, fontFamily: fonts.bodyMedium, fontSize: 18 },
  tableAsk: { fontFamily: fonts.headingBold },
  tableAnswer: { fontFamily: fonts.headingBold, fontSize: 19 },
  tableGap: { minWidth: 64, height: 34, borderRadius: 10, backgroundColor: colors.brand, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 14 },
  tableGapText: { fontFamily: fonts.headingBold, fontSize: 18, color: '#FFFFFF', marginTop: -6 },
  tableNative: { fontFamily: fonts.bodyMedium, fontSize: 14, color: colors.textMuted, textAlign: 'center' },

  ruleCard: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, backgroundColor: '#FFFFFF', borderRadius: 18, padding: 12, borderWidth: 2, borderColor: '#EEF2FF' },
  ruleFace: { width: 34, height: 34, borderRadius: 17 },
  ruleText: { flex: 1, fontFamily: fonts.bodyRegular, fontSize: 14, lineHeight: 20, color: colors.textBody },

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
  pill: { minWidth: 100, alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 16, paddingVertical: 14, paddingHorizontal: 20, borderWidth: 2, borderBottomWidth: 4, borderColor: '#E2E8F0' },
  pillText: { fontFamily: fonts.headingBold, fontSize: 18, color: colors.textHeading },

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

  done: { alignItems: 'center', gap: 14, paddingTop: 20 },
  doneHero: { width: 220, height: 200, alignItems: 'center', justifyContent: 'center' },
  doneGlow: { position: 'absolute', width: 200, height: 200, borderRadius: 100, backgroundColor: '#FEF3C7' },
  doneImg: { width: 170, height: 170 },
  doneTitle: { fontFamily: fonts.headingBold, fontSize: 28, color: colors.textHeading, textAlign: 'center' },
  doneSub: { fontFamily: fonts.bodyMedium, fontSize: 14.5, color: colors.textMuted, textAlign: 'center', marginTop: 4 },
  doneStars: { flexDirection: 'row', alignItems: 'center', gap: 10, height: 90 },
  doneStats: { flexDirection: 'row', gap: 10 },
  doneStat: { minWidth: 120, alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 18, paddingVertical: 12, paddingHorizontal: 16, borderWidth: 2, borderColor: '#E2E8F0' },
  doneStatNum: { fontFamily: fonts.headingBold, fontSize: 22, color: colors.textHeading },
  doneStatLabel: { fontFamily: fonts.bodyMedium, fontSize: 12.5, color: colors.textMuted, marginTop: 2 },
  partNextCard: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#FFFFFF', borderRadius: 20, padding: 14, borderWidth: 2, borderColor: '#EEF2FF', alignSelf: 'stretch' },
  partNextMivo: { width: 64, height: 64 },
  partNextText: { flex: 1, fontFamily: fonts.bodyMedium, fontSize: 14, lineHeight: 20, color: colors.textBody },
});
