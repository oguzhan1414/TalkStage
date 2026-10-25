import { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';

import type { PathWord } from '../../data/path';
import { gloss } from '../../data/path';
import { haptics } from '../../lib/haptics';
import { colors, fonts } from '../../theme/tokens';
import { FadeIn, usePop, useShake } from './anim';

function shuffle<T>(list: T[]): T[] {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Two columns: English words on the left, their meanings on the right. Tap one on each side; a right pair turns
 * springs, turns green and fades; a wrong one shakes red. `onDone(mistakes)` fires when every pair is matched.
 */
export function WordMatch({ words, onDone }: { words: PathWord[]; onDone: (mistakes: number) => void }) {
  const left = useMemo(() => shuffle(words.map((w) => w.en)), [words]);
  const right = useMemo(() => shuffle(words.map((w) => w.en)), [words]);
  const [pickL, setPickL] = useState<string | null>(null);
  const [pickR, setPickR] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrong, setWrong] = useState<string[]>([]);
  const mistakes = useRef(0);
  const meaning = (en: string) => gloss(words.find((w) => w.en === en)?.native);

  useEffect(() => {
    if (!pickL || !pickR) return;
    if (pickL === pickR) {
      haptics.selection();
      const next = new Set(matched).add(pickL);
      setMatched(next);
      setPickL(null);
      setPickR(null);
      if (next.size === words.length) setTimeout(() => onDone(mistakes.current), 350);
    } else {
      haptics.warning();
      mistakes.current += 1;
      setWrong([`L:${pickL}`, `R:${pickR}`]);
      const id = setTimeout(() => {
        setWrong([]);
        setPickL(null);
        setPickR(null);
      }, 600);
      return () => clearTimeout(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pickL, pickR]);

  return (
    <View style={styles.cols}>
      {(['L', 'R'] as const).map((side) => (
        <View key={side} style={styles.col}>
          {(side === 'L' ? left : right).map((en, i) => (
            <Cell
              key={`${side}-${en}`}
              label={side === 'L' ? en : meaning(en)}
              english={side === 'L'}
              index={i + (side === 'R' ? 1 : 0)}
              done={matched.has(en)}
              picked={side === 'L' ? pickL === en : pickR === en}
              wrong={wrong.includes(`${side}:${en}`)}
              locked={wrong.length > 0}
              onPress={() => (side === 'L' ? setPickL(en) : setPickR(en))}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

function Cell({
  label,
  english,
  index,
  done,
  picked,
  wrong,
  locked,
  onPress,
}: {
  label: string;
  english: boolean;
  index: number;
  done: boolean;
  picked: boolean;
  wrong: boolean;
  locked: boolean;
  onPress: () => void;
}) {
  const shake = useShake();
  const pop = usePop(1.07);
  useEffect(() => {
    if (wrong) shake.shake();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wrong]);
  useEffect(() => {
    if (done) pop.pop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);
  return (
    <FadeIn delay={60 + index * 60}>
      <Animated.View style={shake.style}>
        <Animated.View style={pop.style}>
          <Pressable
            disabled={done || locked}
            onPress={onPress}
            style={[styles.cell, picked && styles.cellPicked, wrong && styles.cellWrong, done && styles.cellDone]}
            accessibilityRole="button"
          >
            <Text style={[styles.cellText, english && styles.cellEn, done && styles.cellTextDone]} numberOfLines={2}>
              {label}
            </Text>
          </Pressable>
        </Animated.View>
      </Animated.View>
    </FadeIn>
  );
}

const styles = StyleSheet.create({
  cols: { flexDirection: 'row', gap: 10 },
  col: { flex: 1, gap: 10 },
  cell: {
    minHeight: 56,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  cellPicked: { borderColor: colors.brand, backgroundColor: '#EEF2FF' },
  cellWrong: { borderColor: colors.error, backgroundColor: '#FFF1F2' },
  cellDone: { borderColor: '#BBF7D0', backgroundColor: '#F0FDF4', opacity: 0.55 },
  cellText: { fontFamily: fonts.bodyMedium, fontSize: 15, color: colors.textHeading, textAlign: 'center' },
  cellEn: { fontFamily: fonts.headingBold },
  cellTextDone: { color: '#15803D' },
});
