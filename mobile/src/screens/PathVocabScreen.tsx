import Ionicons from '@expo/vector-icons/Ionicons';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { stateImages } from '../assets/images';
import { useMivoTransition } from '../components/MivoTransitionOverlay';
import { WordMatch } from '../components/path/WordMatch';
import { ACTIVITY_XP } from '../constants/xp';
import { findStep, gloss, loc, type PathWord } from '../data/path';
import { usePronunciation } from '../hooks/usePronunciation';
import { t } from '../i18n';
import { haptics } from '../lib/haptics';
import { postQueued } from '../lib/outbox';
import { recordStep } from '../lib/pathProgress';
import type { PathVocabScreenProps } from '../navigation/types';
import { colors, fonts, spacing } from '../theme/tokens';

const ROUND = 4;

/** A vocabulary section of the path: listen to every word, then match them in rounds of four. */
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
  const { pronounce } = usePronunciation();
  const canMatch = words.some((w) => gloss(w.native));
  const rounds = useMemo(() => {
    const out: PathWord[][] = [];
    for (let i = 0; i < words.length; i += ROUND) out.push(words.slice(i, i + ROUND));
    return out;
  }, [words]);
  const [phase, setPhase] = useState<'learn' | 'match' | 'done'>('learn');
  const [round, setRound] = useState(0);
  const [heard, setHeard] = useState<Set<string>>(new Set());
  const mistakes = useRef(0);
  const saved = useRef(false);

  const stars = mistakes.current === 0 ? 3 : mistakes.current <= 3 ? 2 : 1;

  useEffect(() => {
    if (phase !== 'done' || saved.current) return;
    saved.current = true;
    haptics.success();
    void recordStep(stepId, stars);
    postQueued('/progress/log-practice')
      .then(() => queryClient.invalidateQueries({ queryKey: ['me'] }))
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <Pressable onPress={onExit} hitSlop={12} style={styles.close} accessibilityRole="button" accessibilityLabel={t("Kapat")}>
          <Ionicons name="close" size={24} color={colors.textHeading} />
        </Pressable>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      </View>
      <ScrollView contentContainerStyle={[styles.body, { paddingBottom: Math.max(insets.bottom, 16) + 24 }]} showsVerticalScrollIndicator={false}>
        {phase === 'learn' ? (
          <>
            <Text style={styles.sub}>{t("Her kelimeye dokun ve dinle. Sonra eşleştirme oyunu başlayacak.")}</Text>
            <View style={styles.grid}>
              {words.map((w) => (
                <Pressable
                  key={w.en}
                  onPress={() => {
                    pronounce(w.en).catch(() => {});
                    setHeard((h) => new Set(h).add(w.en));
                  }}
                  style={({ pressed }) => [styles.card, heard.has(w.en) && styles.cardHeard, pressed && { transform: [{ scale: 0.97 }] }]}
                  accessibilityRole="button"
                >
                  <Ionicons name="volume-high" size={16} color={heard.has(w.en) ? '#16A34A' : colors.brand} />
                  <Text style={styles.en}>{w.en}</Text>
                  {gloss(w.native) ? <Text style={styles.native}>{gloss(w.native)}</Text> : null}
                </Pressable>
              ))}
            </View>
            <Pressable onPress={() => setPhase(canMatch ? 'match' : 'done')} style={styles.next} accessibilityRole="button">
              <Text style={styles.nextText}>{canMatch ? t("Oyuna başla") : t("Bitir")}</Text>
            </Pressable>
          </>
        ) : phase === 'match' ? (
          <>
            <Text style={styles.sub}>{t("Eşleştir · {{n}}/{{total}}", { n: round + 1, total: rounds.length })}</Text>
            <WordMatch
              key={round}
              words={rounds[round]}
              onDone={(m) => {
                mistakes.current += m;
                if (round + 1 >= rounds.length) setPhase('done');
                else setRound(round + 1);
              }}
            />
          </>
        ) : (
          <View style={styles.done}>
            <Image source={stateImages.goalCelebration} style={styles.doneImg} resizeMode="contain" />
            <Text style={styles.doneTitle}>{t("{{n}} kelime cebinde!", { n: words.length })}</Text>
            <View style={styles.stars}>
              {[1, 2, 3].map((n) => (
                <Ionicons key={n} name={n <= stars ? 'star' : 'star-outline'} size={44} color="#F59E0B" />
              ))}
            </View>
            <Text style={styles.sub}>{t("+{{xp}} XP", { xp: ACTIVITY_XP })}</Text>
            <Pressable onPress={onExit} style={[styles.next, { alignSelf: 'stretch' }]} accessibilityRole="button">
              <Text style={styles.nextText}>{t("Yola dön")}</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: spacing.md, paddingTop: 6, paddingBottom: 10 },
  close: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  title: { flex: 1, fontFamily: fonts.headingBold, fontSize: 19, color: colors.textHeading },
  body: { paddingHorizontal: spacing.md, gap: 16 },
  sub: { fontFamily: fonts.bodyMedium, fontSize: 14, lineHeight: 20, color: colors.textBody },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  card: {
    width: '48%',
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    gap: 3,
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: '#E0E7FF',
  },
  cardHeard: { borderColor: '#BBF7D0' },
  en: { fontFamily: fonts.headingBold, fontSize: 17, color: colors.textHeading },
  native: { fontFamily: fonts.bodyRegular, fontSize: 13, color: colors.textMuted },
  next: { backgroundColor: colors.brand, borderRadius: 18, paddingVertical: 16, alignItems: 'center', borderBottomWidth: 4, borderBottomColor: '#3730A3' },
  nextText: { fontFamily: fonts.headingBold, fontSize: 17, color: '#FFFFFF' },
  done: { alignItems: 'center', gap: 12, paddingTop: 30 },
  doneImg: { width: 160, height: 160 },
  doneTitle: { fontFamily: fonts.headingBold, fontSize: 24, color: colors.textHeading, textAlign: 'center' },
  stars: { flexDirection: 'row', gap: 8 },
});
