import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useRef } from 'react';
import { Animated, Image, Pressable, StyleSheet, Text, View } from 'react-native';

import type { WordRoom } from '../../data/wordRooms';
import { colors, fonts } from '../../theme/tokens';

export type Region = { x0: number; y0: number; x1: number; y1: number };
export const FULL_REGION: Region = { x0: 0, y0: 0, x1: 100, y1: 100 };

export type RoomMarker =
  /** A tappable pin on an object (explore). `done`: already looked at; `active`: the one on the word card. */
  | { kind: 'dot'; id: string; x: number; y: number; done?: boolean; active?: boolean }
  /** A pulsing ring around the object the question is about. */
  | { kind: 'ring'; id: string; x: number; y: number; r: number }
  /** A word label over an object (answer feedback). */
  | { kind: 'tag'; id: string; x: number; y: number; text: string; tone: 'ok' | 'bad' | 'info' };

type Props = {
  room: WordRoom;
  width: number;
  region?: Region;
  markers: RoomMarker[];
  /** A tap on the photo itself, in photo percent; `pxPerPct` converts percent of the width to screen pixels. */
  onPressImage?: (x: number, y: number, pxPerPct: number) => void;
  onPressMarker?: (id: string) => void;
};

/** Height / width of a region of the room photo. */
export function regionAspect(room: WordRoom, region: Region = FULL_REGION): number {
  return (room.aspect * (region.y1 - region.y0)) / (region.x1 - region.x0);
}

function PulseRing({ size, left, top }: { size: number; left: number; top: number }) {
  const pulse = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 700, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);
  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.ring,
        { width: size, height: size, borderRadius: size / 2, left: left - size / 2, top: top - size / 2 },
        { transform: [{ scale: pulse.interpolate({ inputRange: [0, 1], outputRange: [0.9, 1.12] }) }] },
      ]}
    />
  );
}

/**
 * The room photo, or a cropped region of it, with pins, rings and labels on top. All positions are photo
 * percentages, so the same data works for the whole room and for a crop around one object.
 */
export function RoomImage({ room, width, region = FULL_REGION, markers, onPressImage, onPressMarker }: Props) {
  const full = (width * 100) / (region.x1 - region.x0);
  const fullH = full * room.aspect;
  const offsetX = (-full * region.x0) / 100;
  const offsetY = (-fullH * region.y0) / 100;
  const height = (fullH * (region.y1 - region.y0)) / 100;
  const pos = (x: number, y: number) => ({ left: (full * x) / 100 + offsetX, top: (fullH * y) / 100 + offsetY });

  return (
    <View style={[styles.frame, { width, height }]}>
      <Image
        source={room.image}
        style={{ position: 'absolute', width: full, height: fullH, left: offsetX, top: offsetY }}
        resizeMode="cover"
      />
      <Pressable
        style={StyleSheet.absoluteFill}
        onPress={(e) => {
          if (!onPressImage) return;
          const { locationX, locationY } = e.nativeEvent;
          onPressImage(((locationX - offsetX) / full) * 100, ((locationY - offsetY) / fullH) * 100, full / 100);
        }}
        accessibilityRole={onPressImage ? 'imagebutton' : undefined}
      />
      {/* Each marker is positioned on its own (no zero-size anchor): Android only delivers touches inside a parent's bounds. */}
      {markers.map((m) => {
        const p = pos(m.x, m.y);
        if (m.kind === 'ring') {
          const size = Math.max(40, ((m.r * full) / 100) * 2.4);
          return <PulseRing key={`ring-${m.id}`} size={size} left={p.left} top={p.top} />;
        }
        if (m.kind === 'tag') {
          // Kept inside the photo: near an edge the label slides in and leans to that side instead of being cut off.
          const centered = p.left - TAG_BOX / 2;
          const left = Math.max(4, Math.min(width - TAG_BOX - 4, centered));
          const align = left > centered ? 'flex-start' : left < centered ? 'flex-end' : 'center';
          return (
            <View
              key={`tag-${m.id}`}
              pointerEvents="none"
              style={[styles.tagBox, { left, top: Math.max(4, p.top - 48), alignItems: align }]}
            >
              <View style={[styles.tag, m.tone === 'ok' ? styles.tagOk : m.tone === 'bad' ? styles.tagBad : styles.tagInfo]}>
                <Text style={styles.tagText} numberOfLines={1}>{m.text}</Text>
              </View>
            </View>
          );
        }
        const size = m.active ? DOT_ACTIVE : DOT;
        return (
          <Pressable
            key={`dot-${m.id}`}
            onPress={() => onPressMarker?.(m.id)}
            hitSlop={8}
            style={({ pressed }) => [
              styles.dot,
              { width: size, height: size, borderRadius: size / 2, left: p.left - size / 2, top: p.top - size / 2 },
              m.done && styles.dotDone,
              m.active && styles.dotActive,
              pressed && { transform: [{ scale: 0.9 }] },
            ]}
            accessibilityRole="button"
          >
            {m.done && !m.active ? <Ionicons name="checkmark" size={14} color="#FFFFFF" /> : <View style={[styles.dotCore, m.active && styles.dotCoreActive]} />}
          </Pressable>
        );
      })}
    </View>
  );
}

const DOT = 26;
const DOT_ACTIVE = 32;
const TAG_BOX = 200;

const styles = StyleSheet.create({
  frame: { overflow: 'hidden', borderRadius: 20, backgroundColor: '#E2E8F0' },
  dot: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderWidth: 2,
    borderColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  dotCore: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.brand },
  dotDone: { backgroundColor: '#10B981', borderColor: '#FFFFFF' },
  dotActive: { backgroundColor: colors.brand, borderColor: '#FFFFFF', borderWidth: 3 },
  dotCoreActive: { backgroundColor: '#FFFFFF' },
  ring: { position: 'absolute', borderWidth: 3, borderColor: '#FBBF24', backgroundColor: 'rgba(251,191,36,0.15)' },
  tagBox: { position: 'absolute', width: TAG_BOX },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    maxWidth: TAG_BOX,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  tagOk: { backgroundColor: '#10B981' },
  tagBad: { backgroundColor: '#EF4444' },
  tagInfo: { backgroundColor: 'rgba(15,23,42,0.85)' },
  tagText: { fontFamily: fonts.headingBold, fontSize: 13, color: '#FFFFFF' },
});
