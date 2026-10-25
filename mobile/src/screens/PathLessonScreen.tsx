import Ionicons from '@expo/vector-icons/Ionicons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { File } from 'expo-file-system';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Animated, Easing, Image, Keyboard, Pressable, ScrollView, StyleSheet, Text, TextInput, useWindowDimensions, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { mivoHomeImages, mivoVoiceImages, stateImages } from '../assets/images';
import { wordImage } from '../assets/wordImages';
import { useMivoTransition } from '../components/MivoTransitionOverlay';
import { FadeIn, PopIn, useLoop, usePop, useShake } from '../components/path/anim';
import { BoldText } from '../components/path/BoldText';
import { WordMatch } from '../components/path/WordMatch';
import { TapSentenceOrder } from '../components/reading/TapSentenceOrder';
import { ACTIVITY_XP } from '../constants/xp';
import { findStep, gloss, loc, type Loc, type PathEpisode, type PathPractice, type PathQuestion, type PathSentence, type PathTable, type PathWord } from '../data/path';
import { bare, buildDrills, mivoSentence, sameSentence } from '../data/path/drills';
import { useVoiceRecorder } from '../hooks/useVoiceRecorder';
import { t } from '../i18n';
import { api, ApiError } from '../lib/api';
import { haptics } from '../lib/haptics';
import { postQueued } from '../lib/outbox';
import { stepArt } from '../lib/pathArt';
import { usePathVoice } from '../lib/pathVoice';
import { loadPathProgress, recordPart, starsOf } from '../lib/pathProgress';
import type { PathLessonScreenProps } from '../navigation/types';
import { colors, fonts, shadow, spacing } from '../theme/tokens';
import type { TranscribeResponse, VocabCardOut } from '../types/api';

/**
 * A reading lesson of the new path, in three parts with one star each (like chapters you can stop between):
 *   ⭐1 Words: pick the picture, match, type the word on a keyboard with only its letters, save them for review.
 *   ⭐2 Grammar: Mivo's note, the pattern table with a gap, sentence building with the new words.
 *   ⭐3 Practice: Maya's episode in short pieces between listening, translation and matching drills, then
 *      Mivo's say-it-with-me (each word, then the sentence).
 * The cover shows the episode picture; between parts a short screen cheers the learner on. Two parts open the next
 * lesson; finishing a part records its star.
 */
type Phase = 'pick' | 'match' | 'type' | 'save' | 'tip' | 'table' | 'practice' | 'drills' | 'mivo';
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
  return [words, grammar, ['drills', 'mivo']];
}

const PART_NAMES = () => [t("Kelimeler"), t("Dil bilgisi"), t("Pratik")];

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
        ) : screen === 'drills' ? (
          <DrillsStep episode={episode} art={art} tally={tally} report={report} onAnswered={toEnd} onDone={next} />
        ) : screen === 'mivo' ? (
          <MivoSayStep sentence={mivoSentence(episode)} report={report} onNext={next} />
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

      <FadeIn delay={200} style={styles.chipRow}>
        <View style={styles.chip}>
          <Ionicons name="sparkles" size={14} color={colors.brand} />
          <Text style={styles.chipText} numberOfLines={1}>
            {loc(episode.grammar)}
          </Text>
        </View>
        <View style={styles.chip}>
          <Ionicons name="time-outline" size={14} color={colors.textBody} />
          <Text style={[styles.chipText, { color: colors.textBody }]}>{t("~{{n}} dk", { n: episode.minutes })}</Text>
        </View>
        <View style={styles.chip}>
          <Ionicons name="text" size={14} color={colors.textBody} />
          <Text style={[styles.chipText, { color: colors.textBody }]}>{t("{{n}} yeni kelime", { n: episode.words.length })}</Text>
        </View>
      </FadeIn>

      <FadeIn delay={320}>
        <NextButton label={allDone ? t("Baştan başla") : partsDone > 0 ? t("Devam et") : t("Başla")} onPress={() => onStart(allDone ? 0 : nextPart)} />
      </FadeIn>
    </>
  );
}

/* ---------------- ⭐1 Words ---------------- */

/** Look at the picture and pick its word out of two (the meaning is shown when a word has no picture). */
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
  const { say: pronounce } = usePathVoice();
  const { width, height } = useWindowDimensions();
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const w = words[idx];
  const img = wordImage(w.en);
  const options = useMemo(() => {
    const others = words.filter((o) => o.en !== w.en);
    const other = others[Math.floor(Math.random() * others.length)];
    return shuffle(other ? [w.en, other.en] : [w.en]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);
  const size = Math.round(Math.min(width - spacing.md * 2, height * 0.36, 320));

  useEffect(() => {
    report(idx, words.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  const choose = (o: string) => {
    if (picked) return;
    setPicked(o);
    const ok = o === w.en;
    tally(ok);
    if (ok) haptics.success();
    else haptics.warning();
    // The word is heard after the answer, so the sound never gives it away.
    pronounce(w.en).catch(() => {});
    onAnswered();
  };
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
        <StepHead icon="images" title={t("Bu ne?")} sub={t("Resme bak ve doğru kelimeyi seç.")} />
      </FadeIn>
      <FadeIn key={`p${idx}`} delay={40} style={[styles.pickPic, { width: size, height: size }]}>
        {img ? (
          <Image source={img} style={{ width: size, height: size, borderRadius: 28 }} resizeMode="cover" />
        ) : (
          <Text style={styles.pickMeaning}>{gloss(w.native)}</Text>
        )}
      </FadeIn>
      <View style={styles.options}>
        {options.map((o, i) => (
          <Choice
            key={`${idx}-${o}`}
            label={o}
            index={i}
            state={!picked ? 'idle' : o === w.en ? 'ok' : o === picked ? 'bad' : 'dim'}
            onPress={() => choose(o)}
          />
        ))}
      </View>
      {picked ? <Feedback key={`f${idx}`} ok={picked === w.en} sub={wordLine(w)} label={t("Devam")} onNext={next} /> : null}
    </>
  );
}

const KEY_ROWS = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];

/** Type the word: the keyboard only opens the word's letters; a wrong letter shakes, "Yardım" adds the next one. */
function TypeStep({ words, tally, report, onDone }: { words: PathWord[]; tally: (ok: boolean) => void; report: (i: number, n: number) => void; onDone: () => void }) {
  const { say: pronounce } = usePathVoice();
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
  const { say: pronounce } = usePathVoice();
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

/* ---------------- ⭐3 Practice ---------------- */

function DrillsStep({
  episode,
  art,
  tally,
  report,
  onAnswered,
  onDone,
}: {
  episode: PathEpisode;
  art?: number;
  tally: (ok: boolean) => void;
  report: (i: number, n: number) => void;
  onAnswered: () => void;
  onDone: () => void;
}) {
  const drills = useMemo(() => buildDrills(episode), [episode]);
  const [idx, setIdx] = useState(0);
  const d = drills[idx];

  useEffect(() => {
    report(idx, drills.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  const next = () => {
    if (idx + 1 >= drills.length) onDone();
    else setIdx(idx + 1);
  };
  if (!d) return null;
  const common = { tally, onAnswered, onNext: next };
  return d.kind === 'read' ? (
    <ReadItem key={`d${idx}`} {...common} lines={d.lines} question={d.question} art={d.showArt ? art : undefined} words={episode.words} />
  ) : d.kind === 'dictation' ? (
    <DictationItem key={`d${idx}`} {...common} sentence={d.sentence} hide={d.hide} />
  ) : d.kind === 'listenOrder' ? (
    <ListenOrderItem key={`d${idx}`} {...common} sentence={d.sentence} native={d.native} />
  ) : d.kind === 'translate' ? (
    <TranslateItem key={`d${idx}`} {...common} sentence={d.sentence} native={d.native} />
  ) : (
    <PairsItem key={`d${idx}`} {...common} pairs={d.pairs} />
  );
}

type ItemProps = { tally: (ok: boolean) => void; onAnswered: () => void; onNext: () => void };

const WAVE = [10, 18, 26, 14, 30, 22, 12, 28, 34, 20, 14, 24, 32, 18, 10, 26, 30, 16, 22, 12, 28, 20, 14, 24];

/** Big play card for listening drills. It plays once by itself; tap again for a slower take. */
function AudioCard({ text }: { text: string }) {
  const { say: pronounce } = usePathVoice();
  const slow = useRef(false);
  const pulse = useLoop(true, 900, true);
  useEffect(() => {
    pronounce(text, { rate: 0.9 }).catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);
  return (
    <FadeIn delay={40}>
      <Pressable
        onPress={() => {
          slow.current = !slow.current;
          pronounce(text, { rate: slow.current ? 0.6 : 0.9 }).catch(() => {});
        }}
        style={[styles.audioCard, shadow.card]}
        accessibilityRole="button"
        accessibilityLabel={t("Dinle")}
      >
        <Animated.View style={[styles.audioIcon, { transform: [{ scale: pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.08] }) }] }]}>
          <Ionicons name="volume-high" size={28} color="#FFFFFF" />
        </Animated.View>
        <View style={styles.wave}>
          {WAVE.map((h, i) => (
            <View key={i} style={[styles.waveBar, { height: h }]} />
          ))}
        </View>
      </Pressable>
      <Text style={styles.audioHint}>{t("Tekrar dinlemek için dokun, ikinci dokunuş yavaş çalar.")}</Text>
    </FadeIn>
  );
}

/** A piece of Maya's story with a question about it. */
function ReadItem({ lines, question, art, words, tally, onAnswered, onNext }: ItemProps & { lines: PathSentence[]; question: PathQuestion; art?: number; words: PathWord[] }) {
  const { sayAll } = usePathVoice();
  const [open, setOpen] = useState<Set<number>>(new Set());
  const [picked, setPicked] = useState<number | null>(null);
  const lessonWords = useMemo(() => new Set(words.map((w) => w.en.toLowerCase())), [words]);
  return (
    <>
      <FadeIn>
        <StepHead icon="book" title={t("Oku ve yanıtla")} sub={t("Maya'nın hikâyesinden bir parça. Cümleye dokunursan Türkçesini görürsün.")} />
      </FadeIn>
      {art ? (
        <FadeIn delay={40} style={styles.readArtWrap}>
          <Image source={art} style={styles.readArt} resizeMode="cover" />
        </FadeIn>
      ) : null}
      <FadeIn delay={80} style={[styles.storyCard, shadow.card]}>
        <Pressable onPress={() => sayAll(lines.map((l) => l.en)).catch(() => {})} style={styles.readPlay} accessibilityRole="button" accessibilityLabel={t("Dinle")}>
          <Ionicons name="volume-high" size={18} color={colors.brand} />
          <Text style={styles.readPlayText}>{t("Dinle")}</Text>
        </Pressable>
        {lines.map((l, i) => (
          <Pressable
            key={i}
            onPress={() => setOpen((s) => (s.has(i) ? new Set([...s].filter((x) => x !== i)) : new Set(s).add(i)))}
            style={styles.readLine}
            accessibilityRole="button"
          >
            {l.speaker ? <Text style={styles.speaker}>{l.speaker}</Text> : null}
            <Text style={styles.sentenceText}>
              {l.en.split(/(\s+)/).map((part, k) =>
                lessonWords.has(bare(part)) ? (
                  <Text key={k} style={styles.newWord}>
                    {part}
                  </Text>
                ) : (
                  part
                )
              )}
            </Text>
            {open.has(i) && gloss(l.native) ? <Text style={styles.sentenceNative}>{gloss(l.native)}</Text> : null}
          </Pressable>
        ))}
      </FadeIn>
      <FadeIn delay={140} style={[styles.qCard, shadow.card]}>
        <Text style={styles.qText}>{question.q}</Text>
        {gloss(question.native) ? <Text style={styles.qNative}>{gloss(question.native)}</Text> : null}
      </FadeIn>
      <View style={styles.options}>
        {question.options.map((o, i) => (
          <Choice
            key={o}
            label={o}
            index={i + 2}
            state={picked === null ? 'idle' : i === question.answer ? 'ok' : i === picked ? 'bad' : 'dim'}
            onPress={() => {
              if (picked !== null) return;
              setPicked(i);
              const ok = i === question.answer;
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
          ok={picked === question.answer}
          sub={picked === question.answer ? undefined : t("Doğru cevap: {{a}}", { a: question.options[question.answer] })}
          label={t("Devam")}
          onNext={onNext}
        />
      ) : null}
    </>
  );
}

/** Listen and type the missing word. */
function DictationItem({ sentence, hide, tally, onAnswered, onNext }: ItemProps & { sentence: string; hide: number }) {
  const words = sentence.split(' ');
  const target = words[hide];
  const [value, setValue] = useState('');
  const [ok, setOk] = useState<boolean | null>(null);
  const check = () => {
    const right = bare(value) === bare(target);
    setOk(right);
    tally(right);
    if (right) haptics.success();
    else haptics.warning();
    Keyboard.dismiss();
    onAnswered();
  };
  return (
    <>
      <FadeIn>
        <StepHead icon="ear" title={t("Ne duydun?")} sub={t("Dinle ve eksik kelimeyi yaz.")} />
      </FadeIn>
      <AudioCard text={sentence} />
      <FadeIn delay={100} style={[styles.dictCard, shadow.card]}>
        {words.map((w, i) =>
          i !== hide ? (
            <Text key={i} style={styles.dictWord}>
              {w}
            </Text>
          ) : ok === null ? (
            <TextInput
              key={i}
              value={value}
              onChangeText={setValue}
              autoCapitalize="none"
              autoCorrect={false}
              spellCheck={false}
              onSubmitEditing={() => value.trim() && check()}
              style={[styles.dictInput, { minWidth: Math.max(70, bare(target).length * 16) }]}
              placeholder="…"
              placeholderTextColor="#94A3B8"
            />
          ) : (
            <Text key={i} style={[styles.dictWord, styles.dictAnswer, { color: ok ? '#16A34A' : colors.error }]}>
              {target}
            </Text>
          )
        )}
      </FadeIn>
      {ok === null ? (
        <NextButton label={t("Kontrol et")} onPress={check} disabled={!value.trim()} />
      ) : (
        <Feedback ok={ok} sub={ok ? sentence : t("Doğru cevap: {{a}}", { a: bare(target) })} label={t("Devam")} onNext={onNext} />
      )}
    </>
  );
}

/** Listen and put the words in order. */
function ListenOrderItem({ sentence, native, tally, onAnswered, onNext }: ItemProps & { sentence: string; native: Loc }) {
  const [done, setDone] = useState(false);
  const wrong = useRef(false);
  return (
    <>
      <FadeIn>
        <StepHead icon="ear" title={t("Ne duydun?")} sub={t("Dinle ve kelimeleri duyduğun sırayla diz.")} />
      </FadeIn>
      <AudioCard text={sentence} />
      <TapSentenceOrder
        sentence={sentence}
        translation={gloss(native) || sentence}
        resetKey={sentence}
        onWrongAttempt={() => {
          wrong.current = true;
        }}
        onSolved={(hints) => {
          tally(!wrong.current && hints === 0);
          setDone(true);
          onAnswered();
        }}
        onWordPress={() => {}}
      />
      {done ? <Feedback ok sub={sentence} label={t("Devam")} onNext={onNext} /> : null}
    </>
  );
}

/** Write the Turkish sentence in English. */
function TranslateItem({ sentence, native, tally, onAnswered, onNext }: ItemProps & { sentence: string; native: Loc }) {
  const { say: pronounce } = usePathVoice();
  const [value, setValue] = useState('');
  const [ok, setOk] = useState<boolean | null>(null);
  const check = () => {
    const right = sameSentence(value, sentence);
    setOk(right);
    tally(right);
    if (right) haptics.success();
    else haptics.warning();
    Keyboard.dismiss();
    pronounce(sentence).catch(() => {});
    onAnswered();
  };
  return (
    <>
      <FadeIn>
        <StepHead icon="language" title={t("Çevir")} sub={t("Bu cümleyi İngilizce yaz.")} />
      </FadeIn>
      <FadeIn delay={40} style={[styles.qCard, shadow.card]}>
        <Text style={styles.qText}>{gloss(native)}</Text>
      </FadeIn>
      <FadeIn delay={90}>
        <TextInput
          value={value}
          onChangeText={setValue}
          editable={ok === null}
          multiline
          autoCapitalize="sentences"
          autoCorrect={false}
          spellCheck={false}
          placeholder={t("İngilizcesini yaz…")}
          placeholderTextColor="#94A3B8"
          style={[styles.translateInput, ok !== null && { borderColor: ok ? '#86EFAC' : '#FDA4AF' }]}
        />
      </FadeIn>
      {ok === null ? (
        <NextButton label={t("Kontrol et")} onPress={check} disabled={!value.trim()} />
      ) : (
        <Feedback ok={ok} sub={ok ? sentence : t("Doğru cevap: {{a}}", { a: sentence })} label={t("Devam")} onNext={onNext} />
      )}
    </>
  );
}

/** Match three English sentences with their meanings. */
function PairsItem({ pairs, tally, onNext }: ItemProps & { pairs: PathWord[] }) {
  return (
    <>
      <FadeIn>
        <StepHead icon="git-compare" title={t("Eşleştir")} sub={t("Her cümleyi anlamıyla eşleştir.")} />
      </FadeIn>
      <WordMatch
        words={pairs}
        onDone={(mistakes) => {
          tally(mistakes === 0);
          onNext();
        }}
      />
    </>
  );
}

/**
 * Mivo's say-it-with-me: Mivo says each word of a short sentence and the learner repeats it, then the whole
 * sentence ("I · like · coffee → I like coffee").
 */
function MivoSayStep({ sentence, report, onNext }: { sentence: string; report: (i: number, n: number) => void; onNext: () => void }) {
  const { say: pronounce } = usePathVoice();
  const recorder = useVoiceRecorder();
  const items = useMemo(() => [...sentence.split(' ').map((w) => w.replace(/[^A-Za-z']/g, '')).filter(Boolean), sentence], [sentence]);
  const [idx, setIdx] = useState(0);
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const ring = useLoop(recorder.isRecording, 1200);
  const item = items[idx];
  const whole = idx === items.length - 1;

  useEffect(() => {
    report(idx, items.length);
    setResult(null);
    setError(null);
    const id = setTimeout(() => pronounce(item, { rate: whole ? 0.8 : 0.7 }).catch(() => {}), 350);
    return () => clearTimeout(id);
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
      const want = tokens(item);
      const hits = want.filter((w) => said.has(w)).length;
      const ok = whole ? hits / Math.max(1, want.length) >= 0.7 : hits > 0;
      setResult(ok);
      if (ok) haptics.success();
      else haptics.warning();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : t("Ses kontrol edilemedi. Tekrar dene."));
    } finally {
      setChecking(false);
    }
  };
  const next = () => (idx + 1 >= items.length ? onNext() : setIdx(idx + 1));

  return (
    <>
      <FadeIn style={styles.mivoRow}>
        <Image source={mivoVoiceImages.speak} style={styles.mivoImg} resizeMode="contain" />
        <View style={[styles.bubble, shadow.card]}>
          <Text style={styles.bubbleKicker}>{t("Mivo'ya söyle")}</Text>
          <Text style={styles.bubbleTitle}>{whole ? t("Şimdi hepsini birden söyle!") : t("Benden sonra tekrar et.")}</Text>
        </View>
      </FadeIn>
      <View style={styles.sayDots}>
        {items.map((_, i) => (
          <View key={i} style={[styles.sayDot, i < idx && styles.sayDotDone, i === idx && styles.sayDotNow]} />
        ))}
      </View>
      <FadeIn key={`m${idx}`} from={10} style={[styles.sayCard, shadow.card]}>
        <Text style={[styles.sayText, !whole && styles.sayWordBig, result === true && styles.sayHit, result === false && styles.sayMiss]}>{item}</Text>
        <Pressable onPress={() => pronounce(item, { rate: 0.7 }).catch(() => {})} style={styles.listen} accessibilityRole="button">
          <Ionicons name="volume-high" size={18} color={colors.brand} />
          <Text style={styles.listenText}>{t("Dinle")}</Text>
        </Pressable>
      </FadeIn>
      <View style={{ alignItems: 'center', gap: 12 }}>
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
        <Text style={[styles.note, result === true && styles.noteOk, result === false && styles.noteBad]}>
          {recorder.permissionDenied
            ? t("Mikrofon izni kapalı. Ayarlardan açabilir ya da bu adımı geçebilirsin.")
            : recorder.isRecording
              ? t("Dinliyorum… bitince tekrar bas.")
              : result === true
                ? t("Harika! 🎉")
                : result === false
                  ? t("Tam duyamadım. Bir daha dene ya da devam et.")
                  : (error ?? t("Mikrofona bas ve söyle."))}
        </Text>
      </View>
      {result !== null || error || recorder.permissionDenied ? (
        <NextButton label={whole ? t("Dersi bitir") : t("Sıradaki")} onPress={next} tone={result ? 'ok' : 'brand'} />
      ) : (
        <Pressable onPress={onNext} hitSlop={8} accessibilityRole="button">
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
            ? t("Kelimeler cebinde! Sırada dil bilgisi var ama korkma: 2 dakikalık kısa bir görev. Az önce öğrendiğin kelimelerle cümle kuracaksın.")
            : t("Süpersin! Bir sonraki ders açıldı. Şimdi pratik zamanı: Maya'nın hikâyesinden parçalar, dinleme ve sonunda Mivo'yla konuşma.")}
        </Text>
      </FadeIn>
      <FadeIn delay={700} style={{ alignSelf: 'stretch', gap: 12 }}>
        <NextButton label={part === 1 ? t("Hadi, yapalım!") : t("Pratiğe geç")} onPress={onNext} />
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
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 8 },
  chip: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: '#FFFFFF', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 7, borderWidth: 1, borderColor: '#E2E8F0', maxWidth: '100%' },
  chipText: { fontFamily: fonts.headingBold, fontSize: 12.5, color: colors.brand, flexShrink: 1 },

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

  pickPic: {
    alignSelf: 'center',
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderBottomWidth: 5,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  pickMeaning: { fontFamily: fonts.headingBold, fontSize: 26, color: colors.textHeading, textAlign: 'center', padding: 16 },

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
  audioCard: { flexDirection: 'row', alignItems: 'center', gap: 16, backgroundColor: '#FFFFFF', borderRadius: 22, padding: 20, borderWidth: 1, borderColor: '#EEF2FF' },
  audioIcon: { width: 58, height: 58, borderRadius: 29, backgroundColor: colors.brand, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 4, borderBottomColor: '#3730A3' },
  wave: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 40 },
  waveBar: { width: 3, borderRadius: 2, backgroundColor: '#C7D2FE' },
  audioHint: { fontFamily: fonts.bodyRegular, fontSize: 12, color: colors.textMuted, textAlign: 'center', marginTop: 6 },
  readArtWrap: { borderRadius: 22, overflow: 'hidden' },
  readArt: { width: '100%', aspectRatio: 1.7, borderRadius: 22 },
  readPlay: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#EEF2FF', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 6, marginBottom: 4 },
  readPlayText: { fontFamily: fonts.headingBold, fontSize: 13, color: colors.brand },
  readLine: { paddingVertical: 6 },
  dictCard: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 8, backgroundColor: '#FFFFFF', borderRadius: 22, padding: 18, borderWidth: 1, borderColor: '#EEF2FF' },
  dictWord: { fontFamily: fonts.bodyMedium, fontSize: 20, color: colors.textHeading },
  dictAnswer: { fontFamily: fonts.headingBold, textDecorationLine: 'underline' },
  dictInput: { fontFamily: fonts.headingBold, fontSize: 20, color: colors.brand, borderBottomWidth: 2, borderBottomColor: colors.brand, paddingVertical: 2, paddingHorizontal: 4 },
  translateInput: {
    minHeight: 120,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    padding: 16,
    fontFamily: fonts.bodyMedium,
    fontSize: 18,
    color: colors.textHeading,
    textAlignVertical: 'top',
  },
  sayDots: { flexDirection: 'row', justifyContent: 'center', gap: 6 },
  sayDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#E2E8F0' },
  sayDotDone: { backgroundColor: '#22C55E' },
  sayDotNow: { backgroundColor: colors.brand, transform: [{ scale: 1.3 }] },
  sayWordBig: { fontSize: 38, lineHeight: 46 },
});

