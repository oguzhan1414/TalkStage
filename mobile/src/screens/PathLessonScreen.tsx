import Ionicons from '@expo/vector-icons/Ionicons';
import { useQueryClient } from '@tanstack/react-query';
import { File } from 'expo-file-system';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { mivoVoiceImages, stateImages } from '../assets/images';
import { useMivoTransition } from '../components/MivoTransitionOverlay';
import { BoldText } from '../components/path/BoldText';
import { WordMatch } from '../components/path/WordMatch';
import { TapSentenceOrder } from '../components/reading/TapSentenceOrder';
import { ACTIVITY_XP } from '../constants/xp';
import { findStep, gloss, loc, type PathEpisode, type PathPractice } from '../data/path';
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

type Phase = 'words' | 'match' | 'read' | 'quiz' | 'tip' | 'practice' | 'say' | 'done';
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
 * A reading lesson of the new path: new words, the story episode, three comprehension questions, Mivo's grammar
 * note, practice built from the episode's sentences and reading two sentences aloud. 5–10 minutes.
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
  const [phase, setPhase] = useState<Phase>('words');
  const score = useRef({ right: 0, total: 0 });
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  }, [phase]);

  const tally = (firstTry: boolean) => {
    score.current.total += 1;
    if (firstTry) score.current.right += 1;
  };

  const segIdx = SEGMENTS.findIndex((s) => s.includes(phase));

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <Pressable onPress={onExit} hitSlop={12} style={styles.close} accessibilityRole="button" accessibilityLabel={t("Kapat")}>
          <Ionicons name="close" size={24} color={colors.textHeading} />
        </Pressable>
        <View style={styles.segments}>
          {SEGMENTS.map((_, i) => (
            <View key={i} style={[styles.segment, (phase === 'done' || i < segIdx) && styles.segmentDone, i === segIdx && styles.segmentNow]} />
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
        {phase === 'words' ? (
          <WordsStep episode={episode} art={art} onNext={() => setPhase(hasGloss ? 'match' : 'read')} />
        ) : phase === 'match' ? (
          <>
            <StepHead icon="git-compare" title={t("Eşleştir")} sub={t("Kelimeyi anlamıyla eşleştir.")} />
            <WordMatch
              words={episode.words}
              onDone={(mistakes) => {
                tally(mistakes === 0);
                setPhase('read');
              }}
            />
          </>
        ) : phase === 'read' ? (
          <ReadStep episode={episode} onNext={() => setPhase('quiz')} />
        ) : phase === 'quiz' ? (
          <QuizStep episode={episode} tally={tally} onNext={() => setPhase('tip')} />
        ) : phase === 'tip' ? (
          <TipStep episode={episode} onNext={() => setPhase('practice')} />
        ) : phase === 'practice' ? (
          <PracticeStep items={episode.practice} tally={tally} onNext={() => setPhase('say')} />
        ) : phase === 'say' ? (
          <SayStep sentences={episode.say} onNext={() => setPhase('done')} />
        ) : (
          <DoneStep stepId={stepId} episode={episode} right={score.current.right} total={score.current.total} onExit={onExit} />
        )}
      </ScrollView>
    </SafeAreaView>
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

function NextButton({ label, onPress, disabled }: { label: string; onPress: () => void; disabled?: boolean }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [styles.next, disabled && styles.nextOff, pressed && { transform: [{ translateY: 2 }] }]}
      accessibilityRole="button"
    >
      <Text style={styles.nextText}>{label}</Text>
    </Pressable>
  );
}

/* ---------------- 1. Words ---------------- */

function WordsStep({ episode, art, onNext }: { episode: PathEpisode; art?: number; onNext: () => void }) {
  const { pronounce } = usePronunciation();
  const [heard, setHeard] = useState<Set<string>>(new Set());
  return (
    <>
      {art ? <Image source={art} style={styles.introArt} resizeMode="cover" /> : null}
      <View style={styles.intro}>
        <Text style={styles.introKicker}>{t("Bölüm {{n}}", { n: episode.number })}</Text>
        <Text style={styles.introTitle}>{loc(episode.title)}</Text>
      </View>
      <StepHead icon="sparkles" title={t("Yeni kelimeler")} sub={t("Her kelimeye dokun, dinle. Bölümde hepsiyle karşılaşacaksın.")} />
      <View style={styles.wordGrid}>
        {episode.words.map((w) => (
          <Pressable
            key={w.en}
            onPress={() => {
              pronounce(w.en).catch(() => {});
              setHeard((h) => new Set(h).add(w.en));
            }}
            style={({ pressed }) => [styles.wordCard, heard.has(w.en) && styles.wordCardHeard, pressed && { transform: [{ scale: 0.97 }] }]}
            accessibilityRole="button"
          >
            <Ionicons name="volume-high" size={18} color={heard.has(w.en) ? '#16A34A' : colors.brand} />
            <Text style={styles.wordEn}>{w.en}</Text>
            {gloss(w.native) ? <Text style={styles.wordNative}>{gloss(w.native)}</Text> : null}
          </Pressable>
        ))}
      </View>
      <NextButton label={t("Devam")} onPress={onNext} />
    </>
  );
}

/* ---------------- 2. Reading ---------------- */

function ReadStep({ episode, onNext }: { episode: PathEpisode; onNext: () => void }) {
  const { pronounce } = usePronunciation();
  const [shown, setShown] = useState(1);
  const [translated, setTranslated] = useState<Set<number>>(new Set());
  const [wordTip, setWordTip] = useState<string | null>(null);
  const newWords = useMemo(() => new Map(episode.words.map((w) => [w.en.toLowerCase(), gloss(w.native)])), [episode.words]);

  useEffect(() => {
    const s = episode.sentences[shown - 1];
    if (s) pronounce(s.en, { rate: 0.9 }).catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shown]);

  const all = shown >= episode.sentences.length;

  return (
    <>
      <StepHead icon="book" title={loc(episode.title)} sub={t("Cümleye dokunursan çevirisini görürsün, altı çizili kelimeye dokunursan anlamını.")} />
      <View style={[styles.storyCard, shadow.card]}>
        {episode.sentences.slice(0, shown).map((s, i) => {
          const parts = s.en.split(/(\s+)/);
          return (
            <Pressable
              key={i}
              onPress={() => setTranslated((tr) => (tr.has(i) ? new Set([...tr].filter((x) => x !== i)) : new Set(tr).add(i)))}
              style={styles.sentence}
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
          );
        })}
      </View>
      {wordTip ? (
        <Pressable onPress={() => setWordTip(null)} style={styles.wordTip}>
          <Text style={styles.wordTipText}>{wordTip}</Text>
        </Pressable>
      ) : null}
      {all ? (
        <NextButton label={t("Bitirdim")} onPress={onNext} />
      ) : (
        <NextButton label={t("Devam ({{n}}/{{total}})", { n: shown, total: episode.sentences.length })} onPress={() => setShown((n) => n + 1)} />
      )}
    </>
  );
}

/* ---------------- 3. Comprehension ---------------- */

function QuizStep({ episode, tally, onNext }: { episode: PathEpisode; tally: (ok: boolean) => void; onNext: () => void }) {
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
      <StepHead icon="help-circle" title={t("Anladın mı?")} sub={t("Soru {{n}}/{{total}}", { n: idx + 1, total: episode.questions.length })} />
      <View style={[styles.qCard, shadow.card]}>
        <Text style={styles.qText}>{q.q}</Text>
        {gloss(q.native) ? <Text style={styles.qNative}>{gloss(q.native)}</Text> : null}
      </View>
      <View style={styles.options}>
        {q.options.map((o, i) => {
          const isAnswer = picked !== null && i === q.answer;
          const isWrong = picked === i && i !== q.answer;
          return (
            <Pressable key={o} onPress={() => choose(i)} style={[styles.option, isAnswer && styles.optionOk, isWrong && styles.optionBad]} accessibilityRole="button">
              <Text style={[styles.optionText, (isAnswer || isWrong) && { color: '#FFFFFF' }]}>{o}</Text>
            </Pressable>
          );
        })}
      </View>
      {picked !== null ? <NextButton label={t("Devam")} onPress={next} /> : null}
    </>
  );
}

/* ---------------- 4. Mivo's note (grammar tip) ---------------- */

function TipStep({ episode, onNext }: { episode: PathEpisode; onNext: () => void }) {
  const tip = episode.tip;
  return (
    <>
      <View style={styles.mivoRow}>
        <Image source={mivoVoiceImages.note} style={styles.mivoImg} resizeMode="contain" />
        <View style={[styles.bubble, shadow.card]}>
          <Text style={styles.bubbleKicker}>{t("Mivo'nun notu")}</Text>
          <Text style={styles.bubbleTitle}>{loc(tip.title)}</Text>
        </View>
      </View>
      <View style={[styles.tipCard, shadow.card]}>
        <Text style={styles.tipLabel}>{t("Bölümden")}</Text>
        <BoldText text={tip.highlight} style={styles.tipHighlight} boldStyle={styles.tipMark} />
        <BoldText text={loc(tip.rule)} style={styles.tipRule} boldStyle={{ color: colors.brand }} />
        <View style={styles.examples}>
          {tip.examples.map((ex) => (
            <View key={ex.en} style={styles.example}>
              <Text style={styles.exampleEn}>{ex.en}</Text>
              {gloss(ex.native) ? <Text style={styles.exampleNative}>{gloss(ex.native)}</Text> : null}
            </View>
          ))}
        </View>
        {tip.mistake ? (
          <View style={styles.mistake}>
            <Text style={styles.mistakeLine}>
              <Text style={styles.mistakeWrong}>✗ {tip.mistake.wrong}</Text>
              {'   '}
              <Text style={styles.mistakeRight}>✓ {tip.mistake.right}</Text>
            </Text>
            <BoldText text={loc(tip.mistake.why)} style={styles.mistakeWhy} />
          </View>
        ) : null}
      </View>
      <NextButton label={t("Anladım")} onPress={onNext} />
    </>
  );
}

/* ---------------- 5. Practice ---------------- */

function PracticeStep({ items, tally, onNext }: { items: PathPractice[]; tally: (ok: boolean) => void; onNext: () => void }) {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [orderDone, setOrderDone] = useState(false);
  const wrongOnce = useRef(false);
  const item = items[idx];

  const next = () => {
    if (idx + 1 >= items.length) onNext();
    else {
      setIdx(idx + 1);
      setPicked(null);
      setOrderDone(false);
      wrongOnce.current = false;
    }
  };

  return (
    <>
      <StepHead icon="barbell" title={t("Pekiştir")} sub={t("Alıştırma {{n}}/{{total}}", { n: idx + 1, total: items.length })} />
      {item.kind === 'choose' ? (
        <>
          <View style={[styles.qCard, shadow.card]}>
            <Text style={styles.qText}>{picked !== null ? item.prompt.replace('___', item.options[item.answer]) : item.prompt}</Text>
            {gloss(item.native) ? <Text style={styles.qNative}>{gloss(item.native)}</Text> : null}
          </View>
          <View style={styles.optionsRow}>
            {item.options.map((o, i) => {
              const isAnswer = picked !== null && i === item.answer;
              const isWrong = picked === i && i !== item.answer;
              return (
                <Pressable
                  key={o}
                  onPress={() => {
                    if (picked !== null) return;
                    setPicked(i);
                    const ok = i === item.answer;
                    tally(ok);
                    if (ok) haptics.success();
                    else haptics.warning();
                  }}
                  style={[styles.pill, isAnswer && styles.optionOk, isWrong && styles.optionBad]}
                  accessibilityRole="button"
                >
                  <Text style={[styles.pillText, (isAnswer || isWrong) && { color: '#FFFFFF' }]}>{o}</Text>
                </Pressable>
              );
            })}
          </View>
          {picked !== null ? <NextButton label={t("Devam")} onPress={next} /> : null}
        </>
      ) : (
        <>
          <Text style={styles.orderHint}>{t("Kelimeleri doğru sıraya koy.")}</Text>
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
            }}
            onWordPress={() => {}}
          />
          {orderDone ? <NextButton label={t("Devam")} onPress={next} /> : null}
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

  const toggle = async () => {
    if (checking) return;
    if (!recorder.isRecording) {
      setResult(null);
      setError(null);
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
      <StepHead icon="mic" title={t("Sesli söyle")} sub={t("Cümleyi dinle, sonra mikrofona basıp sen söyle.")} />
      <View style={[styles.sayCard, shadow.card]}>
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
      </View>

      <View style={{ alignItems: 'center', gap: 10 }}>
        <Pressable
          onPress={toggle}
          disabled={checking || recorder.permissionDenied}
          style={[styles.mic, recorder.isRecording && styles.micRec]}
          accessibilityRole="button"
          accessibilityLabel={recorder.isRecording ? t("Durdur") : t("Söyle")}
        >
          {checking ? <ActivityIndicator color="#FFFFFF" /> : <Ionicons name={recorder.isRecording ? 'stop' : 'mic'} size={34} color="#FFFFFF" />}
        </Pressable>
        <Text style={styles.note}>
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
      </View>

      {result || error || recorder.permissionDenied ? (
        <NextButton label={idx + 1 >= sentences.length ? t("Dersi bitir") : t("Sıradaki cümle")} onPress={next} />
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
      <Image source={stateImages.goalCelebration} style={styles.doneImg} resizeMode="contain" />
      <Text style={styles.doneTitle}>{t("Bölüm {{n}} bitti!", { n: episode.number })}</Text>
      <View style={styles.doneStars}>
        {[1, 2, 3].map((n) => (
          <Ionicons key={n} name={n <= stars ? 'star' : 'star-outline'} size={44} color="#F59E0B" />
        ))}
      </View>
      <Text style={styles.doneSub}>{t("{{right}}/{{total}} ilk denemede doğru · +{{xp}} XP", { right, total, xp: ACTIVITY_XP })}</Text>
      <NextButton label={t("Yola dön")} onPress={onExit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: spacing.md, paddingTop: 6, paddingBottom: 10 },
  close: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  segments: { flex: 1, flexDirection: 'row', gap: 5 },
  segment: { flex: 1, height: 8, borderRadius: 4, backgroundColor: '#E2E8F0' },
  segmentDone: { backgroundColor: '#22C55E' },
  segmentNow: { backgroundColor: colors.brand },

  body: { paddingHorizontal: spacing.md, paddingTop: 6, gap: 16 },
  note: { fontFamily: fonts.bodyMedium, fontSize: 13.5, lineHeight: 19, color: colors.textMuted, textAlign: 'center' },

  intro: { gap: 2 },
  introArt: { width: '100%', aspectRatio: 1.6, borderRadius: 22 },
  introKicker: { fontFamily: fonts.headingBold, fontSize: 12, letterSpacing: 0.6, color: colors.brand, textTransform: 'uppercase' },
  introTitle: { fontFamily: fonts.headingBold, fontSize: 26, lineHeight: 32, color: colors.textHeading },

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
  nextOff: { opacity: 0.5 },
  nextText: { fontFamily: fonts.headingBold, fontSize: 17, color: '#FFFFFF' },

  wordGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  wordCard: {
    width: '48%',
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    gap: 4,
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: '#E0E7FF',
  },
  wordCardHeard: { borderColor: '#BBF7D0' },
  wordEn: { fontFamily: fonts.headingBold, fontSize: 18, color: colors.textHeading },
  wordNative: { fontFamily: fonts.bodyRegular, fontSize: 13.5, color: colors.textMuted },

  storyCard: { backgroundColor: '#FFFFFF', borderRadius: 22, padding: 16, gap: 4, borderWidth: 1, borderColor: '#EEF2FF' },
  sentence: { paddingVertical: 8, paddingRight: 30, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  speaker: { fontFamily: fonts.headingBold, fontSize: 11.5, color: colors.brand, textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 2 },
  sentenceText: { fontFamily: fonts.bodyMedium, fontSize: 17, lineHeight: 26, color: colors.textHeading },
  newWord: { color: colors.brand, textDecorationLine: 'underline', fontFamily: fonts.headingBold },
  sentenceNative: { fontFamily: fonts.bodyRegular, fontSize: 14, lineHeight: 20, color: colors.textMuted, marginTop: 4 },
  replay: { position: 'absolute', right: 0, top: 10 },
  wordTip: { alignSelf: 'center', backgroundColor: colors.textHeading, borderRadius: 999, paddingHorizontal: 16, paddingVertical: 8 },
  wordTipText: { fontFamily: fonts.headingBold, fontSize: 14, color: '#FFFFFF' },

  qCard: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 18, gap: 6, borderWidth: 1, borderColor: '#EEF2FF' },
  qText: { fontFamily: fonts.headingBold, fontSize: 20, lineHeight: 27, color: colors.textHeading },
  qNative: { fontFamily: fonts.bodyRegular, fontSize: 14, color: colors.textMuted },
  options: { gap: 10 },
  option: { backgroundColor: '#FFFFFF', borderRadius: 16, paddingVertical: 15, paddingHorizontal: 16, borderWidth: 2, borderBottomWidth: 4, borderColor: '#E2E8F0' },
  optionOk: { backgroundColor: colors.success, borderColor: '#047857' },
  optionBad: { backgroundColor: colors.error, borderColor: '#9F1239' },
  optionText: { fontFamily: fonts.headingSemiBold, fontSize: 16, color: colors.textHeading },
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
  mistake: { backgroundColor: '#FFF7ED', borderRadius: 14, padding: 12, gap: 6 },
  mistakeLine: { fontFamily: fonts.headingBold, fontSize: 15 },
  mistakeWrong: { color: '#DC2626', textDecorationLine: 'line-through' },
  mistakeRight: { color: '#16A34A' },
  mistakeWhy: { fontFamily: fonts.bodyRegular, fontSize: 13.5, lineHeight: 19, color: '#9A3412' },

  sayCard: { backgroundColor: '#FFFFFF', borderRadius: 22, padding: 20, gap: 14, alignItems: 'center', borderWidth: 1, borderColor: '#EEF2FF' },
  sayText: { fontFamily: fonts.headingBold, fontSize: 22, lineHeight: 30, color: colors.textHeading, textAlign: 'center' },
  sayHit: { color: '#16A34A' },
  sayMiss: { color: '#DC2626' },
  listen: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#EEF2FF', borderRadius: 999, paddingHorizontal: 16, paddingVertical: 8 },
  listenText: { fontFamily: fonts.headingBold, fontSize: 14, color: colors.brand },
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

  done: { alignItems: 'center', gap: 12, paddingTop: 30 },
  doneImg: { width: 160, height: 160 },
  doneTitle: { fontFamily: fonts.headingBold, fontSize: 26, color: colors.textHeading, textAlign: 'center' },
  doneStars: { flexDirection: 'row', gap: 8 },
  doneSub: { fontFamily: fonts.bodyMedium, fontSize: 14, color: colors.textMuted, textAlign: 'center', marginBottom: 10 },
});
