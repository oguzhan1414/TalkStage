import { useEffect, useRef } from 'react';
import { Animated, Easing, Image, StyleSheet, Text, View } from 'react-native';

import { castOf, initialsOf } from '../../assets/cast';
import { fonts } from '../../theme/tokens';

/**
 * The speaker of a story line as a round face in their colour (assets/cast.ts). While the line is read aloud the
 * face switches to its talking expression and bobs gently; speakers outside the cast get their initial.
 */
export function SpeakerAvatar({ speaker, size = 36, talking = false }: { speaker: string; size?: number; talking?: boolean }) {
  const member = castOf(speaker);
  const bob = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (!talking) {
      bob.stopAnimation();
      bob.setValue(0);
      return;
    }
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(bob, { toValue: 1, duration: 220, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
        Animated.timing(bob, { toValue: 0, duration: 220, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [talking, bob]);

  const source = talking && member.talk ? member.talk : member.face;
  return (
    <Animated.View
      style={[
        styles.ring,
        { width: size, height: size, borderRadius: size / 2, borderColor: member.color, backgroundColor: `${member.color}22` },
        { transform: [{ scale: bob.interpolate({ inputRange: [0, 1], outputRange: [1, 1.08] }) }] },
      ]}
    >
      {source ? (
        <Image source={source} style={{ width: size - 4, height: size - 4, borderRadius: (size - 4) / 2 }} resizeMode="cover" />
      ) : (
        <View style={[styles.initials, { width: size - 4, height: size - 4, borderRadius: (size - 4) / 2, backgroundColor: member.color }]}>
          <Text style={[styles.initialsText, { fontSize: size * 0.42 }]}>{initialsOf(speaker)}</Text>
        </View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  ring: { borderWidth: 2, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  initials: { alignItems: 'center', justifyContent: 'center' },
  initialsText: { fontFamily: fonts.headingBold, color: '#FFFFFF' },
});
