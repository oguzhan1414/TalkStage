import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useRef } from 'react';
import { Animated, Easing, Image, StyleSheet, Text, View } from 'react-native';

import { partBadgeImages } from '../../assets/images';
import { fonts } from '../../theme/tokens';

/**
 * The lesson's one progress strip, shown from the first part to the last: three segments (words, grammar, practice),
 * the badge of the part being played in front, and a small flame counter once the learner has 3 right answers in a
 * row. At a milestone (5, 8, every 5) the strip shines once; a wrong answer quietly puts the flame out.
 */
export function PartTrack({ part, value, partsDone, run, shineKey }: { part: number; value: number; partsDone: number; run: number; shineKey: number }) {
  const shine = useRef(new Animated.Value(0)).current;
  const pop = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    if (!shineKey) return;
    shine.setValue(0);
    Animated.sequence([
      Animated.timing(shine, { toValue: 1, duration: 260, useNativeDriver: true }),
      Animated.timing(shine, { toValue: 0, duration: 700, easing: Easing.out(Easing.quad), useNativeDriver: true }),
    ]).start();
  }, [shineKey, shine]);
  useEffect(() => {
    if (run < 3) return;
    pop.setValue(0.6);
    Animated.spring(pop, { toValue: 1, friction: 4, tension: 160, useNativeDriver: true }).start();
  }, [run, pop]);

  return (
    <View style={styles.row}>
      <Image source={partBadgeImages.gold[part]} style={styles.badge} resizeMode="contain" />
      <View style={styles.track}>
        {[0, 1, 2].map((i) => (
          <Segment key={i} fill={i < part ? 1 : i === part ? value : i < partsDone ? 1 : 0} />
        ))}
        <Animated.View pointerEvents="none" style={[styles.shine, { opacity: shine }]} />
      </View>
      {run >= 3 ? (
        <Animated.View style={[styles.flame, { transform: [{ scale: pop }] }]}>
          <Ionicons name="flame" size={15} color="#F97316" />
          <Text style={styles.flameText}>{run}</Text>
        </Animated.View>
      ) : null}
    </View>
  );
}

export function Segment({ fill }: { fill: number }) {
  const v = useRef(new Animated.Value(fill)).current;
  useEffect(() => {
    Animated.timing(v, { toValue: Math.max(0, Math.min(1, fill)), duration: 420, easing: Easing.out(Easing.cubic), useNativeDriver: false }).start();
  }, [fill, v]);
  return (
    <View style={styles.segment}>
      <Animated.View style={[styles.segmentFill, { width: v.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }) }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 },
  badge: { width: 26, height: 26 },
  track: { flex: 1, flexDirection: 'row', gap: 5 },
  segment: { flex: 1, height: 10, borderRadius: 5, backgroundColor: '#ECE5D8', overflow: 'hidden' },
  segmentFill: { height: '100%', borderRadius: 5, backgroundColor: '#F5B82E' },
  shine: { position: 'absolute', left: -4, right: -4, top: -5, bottom: -5, borderRadius: 10, backgroundColor: 'rgba(253,230,138,0.75)' },
  flame: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    paddingHorizontal: 8,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#FFF7ED',
    borderWidth: 1,
    borderColor: '#FED7AA',
  },
  flameText: { fontFamily: fonts.headingBold, fontSize: 13.5, color: '#C2410C' },
});
