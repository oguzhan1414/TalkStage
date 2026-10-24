import { useEffect, useMemo, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { PathWord } from '../../data/path';
import { gloss } from '../../data/path';
import { haptics } from '../../lib/haptics';
import { colors, fonts } from '../../theme/tokens';

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
 * green and fades, a wrong one flashes red. `onDone(mistakes)` fires when every pair is matched.
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

  const cell = (side: 'L' | 'R', en: string) => {
    const done = matched.has(en);
    const picked = side === 'L' ? pickL === en : pickR === en;
    const isWrong = wrong.includes(`${side}:${en}`);
    return (
      <Pressable
        key={`${side}-${en}`}
        disabled={done || wrong.length > 0}
        onPress={() => (side === 'L' ? setPickL(en) : setPickR(en))}
        style={[styles.cell, picked && styles.cellPicked, isWrong && styles.cellWrong, done && styles.cellDone]}
        accessibilityRole="button"
      >
        <Text style={[styles.cellText, side === 'L' && styles.cellEn, done && styles.cellTextDone]} numberOfLines={2}>
          {side === 'L' ? en : meaning(en)}
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.cols}>
      <View style={styles.col}>{left.map((en) => cell('L', en))}</View>
      <View style={styles.col}>{right.map((en) => cell('R', en))}</View>
    </View>
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
