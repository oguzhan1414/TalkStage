import Ionicons from '@expo/vector-icons/Ionicons';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { stateImages } from '../assets/images';
import { useMivoTransition } from '../components/MivoTransitionOverlay';
import { FadeIn, PageIn, PopIn } from '../components/path/anim';
import { Confetti } from '../components/path/Confetti';
import { WordMatch } from '../components/path/WordMatch';
import { ACTIVITY_XP } from '../constants/xp';
import { findStep, gloss, loc, type PathWord } from '../data/path';
import { t } from '../i18n';
import { haptics } from '../lib/haptics';
import { postQueued } from '../lib/outbox';
import { recordStep } from '../lib/pathProgress';
import { playSfx, preloadSfx } from '../lib/sfx';
import type { PathVocabScreenProps } from '../navigation/types';
import { colors, fonts, spacing } from '../theme/tokens';
import { Bar, LearnStep, NextButton, PickStep, StepHead } from './PathLessonScreen';

const ROUND = 5;

type Phase = 'learn' | 'pick' | 'match';

/**
 * A vocabulary section of the path (numbers, colours, family, a unit review), played like the words part of a
 * lesson: the words come in rounds of five; each round meets the words one at a time (picture, voice, meaning),
 * then asks "what is this?" for each picture, then matches the round's words with their meanings.
 */
export function PathVocabScreen({ navigation, route }: PathVocabScreenProps) {
  const found = findStep(route.params.stepId);
  const { finishTransition } = useMivoTransition();
  useEffect(() => {
    finishTransition();
  }, [finishTransition]);
  if (!found || found.step.kind !== 'vocab') return null;
  return <VocabSet stepId={found.step.id} title={loc(found.step.title)} words={found.step.words} onExit={() => navigation.goBack()} />;
}

function VocabSet({ stepId, title, words, onExit }: { stepId: string; title: string; words: PathWord[]; onExit: () => void }) {
  const insets = useSafeAreaInsets();
  const queryClient = useQueryClient();
  const scrollRef = useRef<ScrollView>(null);
  const canMatch = words.some((w) => gloss(w.native));
  const phases: Phase[] = canMatch ? ['learn', 'pick', 'match'] : ['learn', 'pick'];
  const rounds = useMemo(() => {
    const out: PathWord[][] = [];
    for (let i = 0; i < words.length; i += ROUND) out.push(words.slice(i, i + ROUND));
    // A last round of one or two words joins the round before it.
    if (out.length > 1 && out[out.length - 1].length < 3) out[out.length - 2].push(...(out.pop() as PathWord[]));
    return out;
  }, [words]);
  const [round, setRound] = useState(0);
  const [phase, setPhase] = useState<Phase | 'roundDone' | 'done'>('learn');
  const [sub, setSub] = useState(0);
  const right = useRef(0);
  const total = useRef(0);
  const saved = useRef(false);

  const score = total.current ? right.current / total.current : 1;
  const stars = score >= 0.9 ? 3 : score >= 0.6 ? 2 : 1;

  useEffect(() => {
    preloadSfx();
  }, []);

  useEffect(() => {
    setSub(0);
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  }, [phase, round]);

  useEffect(() => {
    if (phase !== 'done' || saved.current) return;
    saved.current = true;
    haptics.success();
    playSfx('complete');
    void recordStep(stepId, stars);
    postQueued('/progress/log-practice')
      .then(() => queryClient.invalidateQueries({ queryKey: ['me'] }))
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const tally = (ok: boolean) => {
    total.current += 1;
    if (ok) right.current += 1;
  };
  const report = (i: number, n: number) => setSub(n ? i / n : 0);
  const toEnd = () => setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 120);
  const next = () => {
    const i = phases.indexOf(phase as Phase);
    if (i >= 0 && i + 1 < phases.length) setPhase(phases[i + 1]);
    else if (round + 1 < rounds.length) setPhase('roundDone');
    else setPhase('done');
  };

  const inRound = phases.indexOf(phase as Phase);
  const progress = phase === 'done' ? 1 : (round + (inRound >= 0 ? (inRound + sub) / phases.length : 1)) / rounds.length;
  const roundWords = rounds[round];

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <Pressable onPress={onExit} hitSlop={12} style={styles.close} accessibilityRole="button" accessibilityLabel={t("Kapat")}>
          <Ionicons name="close" size={24} color={colors.textHeading} />
        </Pressable>
        <Bar value={progress} />
        <View style={styles.roundTag}>
          <Text style={styles.roundTagText}>{`${Math.min(round + 1, rounds.length)}/${rounds.length}`}</Text>
        </View>
      </View>
      <ScrollView
        ref={scrollRef}
        style={{ flex: 1 }}
        contentContainerStyle={[styles.body, { paddingBottom: Math.max(insets.bottom, 16) + 24 }]}
        showsVerticalScrollIndicator={false}
      >
        <PageIn key={`${phase}-${round}`} style={styles.page}>
          {phase === 'learn' ? (
            <>
              {round === 0 ? (
                <FadeIn>
                  <Text style={styles.kicker}>{title}</Text>
                </FadeIn>
              ) : null}
              <LearnStep key={`l${round}`} words={roundWords} report={report} onDone={next} />
            </>
          ) : phase === 'pick' ? (
            <PickStep key={`p${round}`} words={roundWords} tally={tally} report={report} onAnswered={toEnd} onDone={next} />
          ) : phase === 'match' ? (
            <>
              <FadeIn>
                {round % 2 === 1 ? (
                  <StepHead icon="ear" title={t("Dinle ve eşleştir")} sub={t("Sese dokun, dinle ve anlamını bul.")} />
                ) : (
                  <StepHead icon="git-compare" title={t("Eşleştir")} sub={t("Kelimeyi anlamıyla eşleştir.")} />
                )}
              </FadeIn>
              <WordMatch
                key={`m${round}`}
                audio={round % 2 === 1}
                words={roundWords}
                onDone={(mistakes) => {
                  tally(mistakes === 0);
                  next();
                }}
              />
            </>
          ) : phase === 'roundDone' ? (
            <View style={styles.done}>
              <Confetti count={18} />
              <PopIn delay={80}>
                <Image source={stateImages.goalCelebration} style={styles.roundImg} resizeMode="contain" />
              </PopIn>
              <FadeIn delay={160}>
                <Text style={styles.doneTitle}>{t("{{n}} kelime daha cebinde!", { n: roundWords.length })}</Text>
                <Text style={styles.doneSub}>{t("Çok iyi gidiyorsun. Sıradaki {{n}} kelimeyle devam edelim mi?", { n: rounds[round + 1].length })}</Text>
              </FadeIn>
              <FadeIn delay={260} style={{ alignSelf: 'stretch' }}>
                <NextButton
                  label={t("Devam edelim")}
                  onPress={() => {
                    setRound(round + 1);
                    setPhase('learn');
                  }}
                />
              </FadeIn>
            </View>
          ) : (
            <View style={styles.done}>
              <Confetti />
              <Image source={stateImages.goalCelebration} style={styles.doneImg} resizeMode="contain" />
              <Text style={styles.doneTitle}>{t("{{n}} kelime cebinde!", { n: words.length })}</Text>
              <View style={styles.stars}>
                {[1, 2, 3].map((n) => (
                  <PopIn key={n} delay={150 + n * 120} onShow={() => n <= stars && playSfx('star')}>
                    <Ionicons name={n <= stars ? 'star' : 'star-outline'} size={44} color="#F59E0B" />
                  </PopIn>
                ))}
              </View>
              <Text style={styles.doneSub}>{t("+{{xp}} XP", { xp: ACTIVITY_XP })}</Text>
              <View style={{ alignSelf: 'stretch' }}>
                <NextButton label={t("Yola dön")} onPress={onExit} />
              </View>
            </View>
          )}
        </PageIn>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: spacing.md, paddingTop: 6, paddingBottom: 10 },
  close: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  roundTag: { backgroundColor: '#EEF2FF', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4 },
  roundTagText: { fontFamily: fonts.headingBold, fontSize: 13, color: colors.brand },
  page: { gap: 16 },
  body: { paddingHorizontal: spacing.md, gap: 16, paddingTop: 4 },
  kicker: { fontFamily: fonts.headingBold, fontSize: 13, color: colors.brand, letterSpacing: 0.6, textTransform: 'uppercase', textAlign: 'center' },
  done: { alignItems: 'center', gap: 14, paddingTop: 30 },
  roundImg: { width: 140, height: 140 },
  doneImg: { width: 160, height: 160 },
  doneTitle: { fontFamily: fonts.headingBold, fontSize: 24, color: colors.textHeading, textAlign: 'center' },
  doneSub: { fontFamily: fonts.bodyMedium, fontSize: 15, lineHeight: 21, color: colors.textBody, textAlign: 'center', marginTop: 6 },
  stars: { flexDirection: 'row', gap: 8 },
});
