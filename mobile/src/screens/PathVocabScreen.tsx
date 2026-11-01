import { useQueryClient } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Easing, Image, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { mivoHomeImages, partBadgeImages } from '../assets/images';
import { wordImage } from '../assets/wordImages';
import { useMivoTransition } from '../components/MivoTransitionOverlay';
import { FadeIn, PageIn, PopIn, useLoop } from '../components/path/anim';
import { Confetti } from '../components/path/Confetti';
import { EXIT_SPACE, ExitButton } from '../components/path/ExitButton';
import { Segment } from '../components/path/PartTrack';
import { WordMatch } from '../components/path/WordMatch';
import { ACTIVITY_XP } from '../constants/xp';
import { findStep, gloss, loc, type PathWord } from '../data/path';
import { t } from '../i18n';
import { haptics } from '../lib/haptics';
import { postQueued } from '../lib/outbox';
import { stepArt } from '../lib/pathArt';
import { recordStep } from '../lib/pathProgress';
import { playSfx, preloadSfx } from '../lib/sfx';
import type { PathVocabScreenProps } from '../navigation/types';
import { colors, fonts, spacing } from '../theme/tokens';
import { CountUp, LearnStep, NextButton, PickStep, StepHead } from './PathLessonScreen';

const ROUND = 5;
const FLOOR = '#FBF7F1';

type Phase = 'learn' | 'pick' | 'match';

/**
 * A vocabulary section of the path (numbers, colours, family, a unit review), dressed like a lesson: a cover with the
 * unit's word picture and the rounds as stops, then the words in rounds of five (meet them one at a time, "what is
 * this?" for each picture, match them with their meanings), and the medallion finish of the lesson.
 */
export function PathVocabScreen({ navigation, route }: PathVocabScreenProps) {
  const found = findStep(route.params.stepId);
  const { finishTransition } = useMivoTransition();
  useEffect(() => {
    finishTransition();
  }, [finishTransition]);
  if (!found || found.step.kind !== 'vocab') return null;
  return <VocabSet stepId={found.step.id} title={loc(found.step.title)} words={found.step.words} art={stepArt(found)} onExit={() => navigation.goBack()} />;
}

function VocabSet({ stepId, title, words, art, onExit }: { stepId: string; title: string; words: PathWord[]; art?: number; onExit: () => void }) {
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
  const [phase, setPhase] = useState<Phase | 'cover' | 'roundDone' | 'done'>('cover');
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
  const roundFill = inRound >= 0 ? (inRound + sub) / phases.length : phase === 'cover' ? 0 : 1;
  const roundWords = rounds[round];
  const playing = phase !== 'cover' && phase !== 'done';

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {playing ? (
        <View style={styles.header}>
          {/* one segment per round, as the lesson's strip has one per part */}
          <Image source={partBadgeImages.gold[Math.min(round, 2)]} style={styles.trackBadge} resizeMode="contain" />
          <View style={styles.track}>
            {rounds.map((_, i) => (
              <Segment key={i} fill={i < round ? 1 : i === round ? roundFill : 0} />
            ))}
          </View>
          <Text style={styles.roundTag}>{t("Tur {{n}}/{{m}}", { n: round + 1, m: rounds.length })}</Text>
        </View>
      ) : null}
      <ScrollView
        ref={scrollRef}
        style={{ flex: 1 }}
        contentContainerStyle={[styles.body, { paddingBottom: Math.max(insets.bottom, 16) + EXIT_SPACE }, !playing && { paddingTop: 0 }]}
        showsVerticalScrollIndicator={false}
      >
        <PageIn key={`${phase}-${round}`} style={styles.page}>
          {phase === 'cover' ? (
            <Cover title={title} words={words} rounds={rounds} art={art} onStart={() => setPhase('learn')} />
          ) : phase === 'learn' ? (
            <LearnStep key={`l${round}`} words={roundWords} report={report} onDone={next} />
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
                <WordFan words={roundWords} size={92} />
              </PopIn>
              <FadeIn delay={160} style={{ alignItems: 'center' }}>
                <Text style={styles.kicker}>{t("Tur {{n}} bitti", { n: round + 1 })}</Text>
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
            <Finish title={title} count={words.length} art={art} stars={stars} right={right.current} total={total.current} onExit={onExit} />
          )}
        </PageIn>
      </ScrollView>
      <ExitButton onExit={onExit} confirm={phase !== 'done' && phase !== 'cover'} />
    </SafeAreaView>
  );
}

/** The opening: the unit's word picture full width (as a lesson's episode cover), the title and the rounds as stops. */
function Cover({ title, words, rounds, art, onStart }: { title: string; words: PathWord[]; rounds: PathWord[][]; art?: number; onStart: () => void }) {
  const { width, height } = useWindowDimensions();
  const heroH = Math.round(Math.min(height * 0.42, width * 0.98));
  const open = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(open, { toValue: 1, duration: 620, easing: Easing.out(Easing.cubic), useNativeDriver: false }).start();
  }, [open]);
  const drift = useLoop(true, 12000, true);
  const minutes = Math.max(2, Math.round(words.length * 0.45));

  return (
    <>
      <View style={[styles.hero, { height: heroH }]}>
        <Animated.View
          style={[
            styles.heroClip,
            {
              borderRadius: open.interpolate({ inputRange: [0, 1], outputRange: [heroH / 2, 0] }),
              transform: [{ scale: open.interpolate({ inputRange: [0, 1], outputRange: [0.6, 1] }) }],
            },
          ]}
        >
          {art ? (
            <Animated.Image
              source={art}
              style={{ width, height: heroH, transform: [{ scale: drift.interpolate({ inputRange: [0, 1], outputRange: [1.02, 1.08] }) }] }}
              resizeMode="cover"
            />
          ) : (
            <LinearGradient colors={['#FDE68A', '#FBCFE8']} style={[StyleSheet.absoluteFill, styles.heroFallback]}>
              <WordFan words={words} size={Math.round(heroH * 0.34)} />
            </LinearGradient>
          )}
        </Animated.View>
        <LinearGradient colors={['rgba(251,247,241,0)', FLOOR]} style={[styles.heroFade, { height: heroH * 0.32 }]} />
      </View>

      <FadeIn delay={260} style={styles.coverText}>
        <Text style={styles.kicker}>{t("Kelime durağı")}</Text>
        <Text style={styles.coverTitle}>{title}</Text>
        <Text style={styles.coverLine}>{t("{{n}} kelime · ~{{m}} dk", { n: words.length, m: minutes })}</Text>
      </FadeIn>

      {/* each round as a stop, with the picture of its first word */}
      <FadeIn delay={420}>
        <View style={styles.stops}>
          {rounds.length > 1 ? <View style={styles.stopsLine} /> : null}
          {rounds.map((r, i) => {
            const pic = r.map((w) => wordImage(w.en)).find(Boolean);
            return (
              <View key={i} style={styles.stop}>
                <View style={[styles.stopBadge, i === 0 && styles.stopBadgeNow]}>
                  {pic ? <Image source={pic} style={styles.stopImg} resizeMode="cover" /> : <Text style={styles.stopNum}>{i + 1}</Text>}
                </View>
                <Text style={[styles.stopName, i === 0 && { color: colors.textHeading }]}>{t("Tur {{n}}", { n: i + 1 })}</Text>
                <Text style={styles.stopMin}>{t("{{n}} kelime", { n: r.length })}</Text>
              </View>
            );
          })}
        </View>
      </FadeIn>

      <FadeIn delay={560}>
        <NextButton label={t("Hadi başlayalım!")} onPress={onStart} />
      </FadeIn>
    </>
  );
}

/** A small fan of word pictures (the round's words, or the set's when there is no unit picture). */
function WordFan({ words, size }: { words: PathWord[]; size: number }) {
  const pics = words
    .map((w) => wordImage(w.en))
    .filter((p): p is number => p != null)
    .slice(0, 3);
  if (pics.length === 0) return <Image source={mivoHomeImages.lessonGuide} style={{ width: size * 1.6, height: size * 1.6 }} resizeMode="contain" />;
  const tilt = pics.length === 1 ? [0] : pics.length === 2 ? [-8, 8] : [-12, 0, 12];
  return (
    <View style={[styles.fan, { height: size * 1.25 }]}>
      {pics.map((p, i) => (
        <View
          key={i}
          style={[
            styles.fanCard,
            {
              width: size,
              height: size,
              borderRadius: size * 0.24,
              marginHorizontal: -size * 0.12,
              zIndex: i === 1 ? 2 : 1,
              transform: [{ rotate: `${tilt[i]}deg` }, { translateY: Math.abs(tilt[i]) * 0.6 }],
            },
          ]}
        >
          <Image source={p} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
        </View>
      ))}
    </View>
  );
}

/** The lesson's finish: the unit picture as a medallion, the earned badges landing under it, then the numbers. */
function Finish({ title, count, art, stars, right, total, onExit }: { title: string; count: number; art?: number; stars: number; right: number; total: number; onExit: () => void }) {
  return (
    <View style={styles.done}>
      <Confetti />
      <PopIn>
        <View style={styles.doneMedal}>
          <Image source={art ?? mivoHomeImages.lessonGuide} style={styles.doneMedalImg} resizeMode={art ? 'cover' : 'contain'} />
        </View>
      </PopIn>
      <FadeIn delay={250} style={{ alignItems: 'center' }}>
        <Text style={styles.kicker}>{title}</Text>
        <Text style={styles.doneTitle}>{t("{{n}} kelime cebinde!", { n: count })}</Text>
      </FadeIn>
      <View style={styles.doneStars}>
        {[1, 2, 3].map((n) => (
          <PopIn
            key={n}
            delay={500 + n * 260}
            onShow={() => {
              if (n > stars) return;
              haptics.selection();
              playSfx('star');
            }}
            style={n === 2 ? { marginTop: -10 } : undefined}
          >
            <Image source={(n <= stars ? partBadgeImages.gold : partBadgeImages.grey)[n - 1]} style={n === 2 ? styles.badgeMid : styles.badgeSmall} resizeMode="contain" />
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
            <CountUp to={ACTIVITY_XP} delay={1500} style={[styles.doneStatNum, { color: '#B45309' }]} />
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
  container: { flex: 1, backgroundColor: FLOOR },
  header: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: spacing.md, paddingTop: 8, paddingBottom: 10, minHeight: 50 },
  trackBadge: { width: 26, height: 26 },
  track: { flex: 1, flexDirection: 'row', gap: 5 },
  roundTag: { fontFamily: fonts.headingBold, fontSize: 12.5, color: '#B45309' },
  page: { gap: 16 },
  body: { paddingHorizontal: spacing.md, gap: 16, paddingTop: 6 },
  kicker: { fontFamily: fonts.headingBold, fontSize: 12.5, letterSpacing: 1.2, color: colors.brand, textTransform: 'uppercase', textAlign: 'center' },

  hero: { marginHorizontal: -spacing.md, overflow: 'hidden', alignItems: 'center', justifyContent: 'center' },
  heroClip: { width: '100%', height: '100%', overflow: 'hidden' },
  heroFade: { position: 'absolute', left: 0, right: 0, bottom: 0 },
  heroFallback: { alignItems: 'center', justifyContent: 'center' },
  coverText: { alignItems: 'center', marginTop: -28 },
  coverTitle: { fontFamily: fonts.headingBold, fontSize: 30, lineHeight: 36, color: colors.textHeading, textAlign: 'center', marginTop: 4 },
  coverLine: { fontFamily: fonts.bodyMedium, fontSize: 15, lineHeight: 21, color: colors.textMuted, textAlign: 'center', marginTop: 4 },
  stops: { flexDirection: 'row', justifyContent: 'center', paddingHorizontal: 8 },
  stopsLine: { position: 'absolute', top: 29, left: '18%', right: '18%', height: 3, borderRadius: 2, backgroundColor: '#ECE5D8' },
  stop: { flex: 1, maxWidth: 120, alignItems: 'center', gap: 2 },
  stopBadge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    borderWidth: 3,
    borderColor: '#ECE5D8',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stopBadgeNow: { borderColor: '#F5B82E' },
  stopImg: { width: '100%', height: '100%' },
  stopNum: { fontFamily: fonts.headingBold, fontSize: 20, color: colors.textMuted },
  stopName: { fontFamily: fonts.headingBold, fontSize: 13.5, color: colors.textMuted, marginTop: 4 },
  stopMin: { fontFamily: fonts.bodyMedium, fontSize: 12, color: colors.textMuted },

  fan: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  fanCard: { overflow: 'hidden', backgroundColor: '#FFFFFF', borderWidth: 3, borderColor: '#FFFFFF', shadowColor: '#0F172A', shadowOpacity: 0.14, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 4 },

  done: { alignItems: 'center', gap: 14, paddingTop: 20 },
  doneMedal: { width: 172, height: 172, borderRadius: 86, padding: 8, backgroundColor: '#FDE68A' },
  doneMedalImg: { width: 156, height: 156, borderRadius: 78, borderWidth: 3, borderColor: '#FFFFFF' },
  doneTitle: { fontFamily: fonts.headingBold, fontSize: 26, color: colors.textHeading, textAlign: 'center', marginTop: 4 },
  doneSub: { fontFamily: fonts.bodyMedium, fontSize: 15, lineHeight: 21, color: colors.textBody, textAlign: 'center', marginTop: 6 },
  doneStars: { flexDirection: 'row', alignItems: 'center', gap: 12, height: 110 },
  badgeSmall: { width: 66, height: 66 },
  badgeMid: { width: 84, height: 84 },
  doneStats: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 10 },
  doneStat: { minWidth: 100, alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 18, paddingVertical: 12, paddingHorizontal: 16, borderWidth: 2, borderColor: '#E2E8F0' },
  doneStatNum: { fontFamily: fonts.headingBold, fontSize: 22, color: colors.textHeading },
  doneStatLabel: { fontFamily: fonts.bodyMedium, fontSize: 12.5, color: colors.textMuted, marginTop: 2 },
});
