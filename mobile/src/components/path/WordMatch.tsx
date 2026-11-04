import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Easing, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import type { PathWord } from '../../data/path';
import { gloss } from '../../data/path';
import { haptics } from '../../lib/haptics';
import { usePathVoice } from '../../lib/pathVoice';
import { playSfx } from '../../lib/sfx';
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

/** A second order where no item stays in its row, so a pair never sits side by side from the start. */
function shuffleApart(base: string[]): string[] {
  if (base.length < 2) return [...base];
  for (let tries = 0; tries < 40; tries++) {
    const next = shuffle(base);
    if (next.every((v, i) => v !== base[i])) return next;
  }
  return [...base.slice(1), base[0]];
}

/** A waveform that looks different for every word but stays the same for that word. */
function waveOf(text: string): number[] {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619) >>> 0;
  return Array.from({ length: 11 }, (_, i) => {
    h = Math.imul(h ^ (i + 1), 2654435761) >>> 0;
    const base = Math.sin((i / 10) * Math.PI) * 0.6 + 0.25;
    return Math.max(0.18, Math.min(1, base + ((h % 100) / 100 - 0.5) * 0.5));
  });
}

/**
 * Two columns to match: English words (or, with `audio`, their sound) on the left and their meanings on the right.
 * Tap one on each side. A right pair flashes green, springs and fades with a pop; a wrong one shakes red with a soft
 * bump. The cards grow with the screen so the game fills it. `onDone(mistakes)` fires when every pair is matched.
 */
export function WordMatch({ words, onDone, audio }: { words: PathWord[]; onDone: (mistakes: number) => void; audio?: boolean }) {
  const { height } = useWindowDimensions();
  const { say } = usePathVoice();
  const left = useMemo(() => shuffle(words.map((w) => w.en)), [words]);
  const right = useMemo(() => shuffleApart(left), [left]);
  const [pickL, setPickL] = useState<string | null>(null);
  const [pickR, setPickR] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrong, setWrong] = useState<string[]>([]);
  const mistakes = useRef(0);
  const meaning = (en: string) => gloss(words.find((w) => w.en === en)?.native) || en;
  const cellH = Math.round(Math.max(60, Math.min(88, (height * 0.56) / Math.max(words.length, 1) - 14)));

  useEffect(() => {
    if (!pickL || !pickR) return;
    if (pickL === pickR) {
      haptics.selection();
      const next = new Set(matched).add(pickL);
      setMatched(next);
      setPickL(null);
      setPickR(null);
      if (next.size === words.length) {
        setTimeout(() => playSfx('correct'), 180);
        setTimeout(() => onDone(mistakes.current), 650);
      } else playSfx('match');
    } else {
      haptics.warning();
      playSfx('wrong');
      mistakes.current += 1;
      setWrong([`L:${pickL}`, `R:${pickR}`]);
      const id = setTimeout(() => {
        setWrong([]);
        setPickL(null);
        setPickR(null);
      }, 650);
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
              wave={side === 'L' && audio ? waveOf(en) : undefined}
              height={cellH}
              index={i + (side === 'R' ? 1 : 0)}
              done={matched.has(en)}
              picked={side === 'L' ? pickL === en : pickR === en}
              wrong={wrong.includes(`${side}:${en}`)}
              locked={wrong.length > 0}
              onPress={() => {
                if (side === 'L') {
                  if (audio) say(en).catch(() => {});
                  setPickL(en);
                } else setPickR(en);
              }}
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
  wave,
  height,
  index,
  done,
  picked,
  wrong,
  locked,
  onPress,
}: {
  label: string;
  english: boolean;
  wave?: number[];
  height: number;
  index: number;
  done: boolean;
  picked: boolean;
  wrong: boolean;
  locked: boolean;
  onPress: () => void;
}) {
  const shake = useShake();
  const pop = usePop(1.08);
  // 0 → plain, 1 → green flash; after the flash the card settles to a faded green.
  const glow = useRef(new Animated.Value(0)).current;
  const fade = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    if (wrong) shake.shake();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wrong]);
  useEffect(() => {
    if (!done) return;
    pop.pop();
    Animated.sequence([
      Animated.timing(glow, { toValue: 1, duration: 140, useNativeDriver: false }),
      Animated.delay(260),
      Animated.parallel([
        Animated.timing(glow, { toValue: 0.35, duration: 380, easing: Easing.out(Easing.quad), useNativeDriver: false }),
        Animated.timing(fade, { toValue: 0.45, duration: 380, easing: Easing.out(Easing.quad), useNativeDriver: false }),
      ]),
    ]).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  const doneStyle = {
    backgroundColor: glow.interpolate({ inputRange: [0, 1], outputRange: ['#FFFFFF', '#DCFCE7'] }),
    borderColor: glow.interpolate({ inputRange: [0, 1], outputRange: ['#E6EAF2', '#4ADE80'] }),
    opacity: fade,
  };
  const tint = wrong ? colors.error : picked ? colors.brand : '#3B82F6';

  return (
    <FadeIn delay={60 + index * 60}>
      <Animated.View style={shake.style}>
        <Animated.View style={pop.style}>
          <Pressable disabled={done || locked} onPress={onPress} accessibilityRole="button" accessibilityLabel={wave ? undefined : label}>
            <Animated.View
              style={[
                styles.cell,
                { height },
                picked && styles.cellPicked,
                wrong && styles.cellWrong,
                done && doneStyle,
              ]}
            >
              {wave && done ? (
                <View style={styles.audioRow}>
                  <Ionicons name="volume-high" size={22} color="#16A34A" />
                  <Text style={[styles.cellText, styles.cellEn, styles.cellTextDone]} numberOfLines={1} adjustsFontSizeToFit>
                    {label}
                  </Text>
                </View>
              ) : wave ? (
                <View style={styles.audioRow}>
                  <Ionicons name="volume-high" size={26} color={done ? '#16A34A' : tint} />
                  <View style={styles.wave}>
                    {wave.map((v, i) => (
                      <View key={i} style={[styles.waveBar, { height: 6 + v * 30, backgroundColor: done ? '#4ADE80' : tint }]} />
                    ))}
                  </View>
                </View>
              ) : (
                <Text style={[styles.cellText, english && styles.cellEn, done && styles.cellTextDone]} numberOfLines={label.trim().includes(' ') ? 2 : 1} adjustsFontSizeToFit minimumFontScale={0.5}>
                  {label}
                </Text>
              )}
            </Animated.View>
          </Pressable>
        </Animated.View>
      </Animated.View>
    </FadeIn>
  );
}

const styles = StyleSheet.create({
  cols: { flexDirection: 'row', gap: 14, paddingTop: 8 },
  col: { flex: 1, gap: 14 },
  // Plain white, tactile cards (a thicker bottom edge instead of a shadow, which looked grey on Android).
  cell: {
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderBottomWidth: 5,
    borderColor: '#E6EAF2',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  cellPicked: { borderColor: '#60A5FA', borderBottomColor: '#3B82F6', backgroundColor: '#EFF6FF' },
  cellWrong: { borderColor: '#FB7185', borderBottomColor: colors.error, backgroundColor: '#FFF1F2' },
  cellText: { fontFamily: fonts.bodyMedium, fontSize: 18, color: colors.textHeading, textAlign: 'center' },
  cellEn: { fontFamily: fonts.headingBold },
  cellTextDone: { color: '#15803D' },
  audioRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  wave: { flexDirection: 'row', alignItems: 'center', gap: 3, height: 40 },
  waveBar: { width: 4, borderRadius: 2 },
});
