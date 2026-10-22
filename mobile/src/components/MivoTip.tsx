import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Image, Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { mivoVoiceImages } from '../assets/images';
import { t } from '../i18n';
import { haptics } from '../lib/haptics';
import { isTipSeen, markTipSeen, type TipKey } from '../lib/tips';
import { colors, fonts } from '../theme/tokens';

type Props = {
  tipKey: TipKey;
  text: string;
  /** Show only when the moment is right (e.g. after the first lesson). The tip still appears once at most. */
  enabled?: boolean;
  /** Which side the little tail points to, and where along that side it sits. */
  tail?: 'up' | 'down' | 'none';
  tailAlign?: 'left' | 'center' | 'right';
  style?: StyleProp<ViewStyle>;
  onDismiss?: () => void;
};

/**
 * A one-time hint from Mivo, in Mivo's own voice: his portrait, one short sentence and "Anladım". It shows the first
 * time a feature becomes useful and never again on this device. Used sparingly (one per screen).
 */
export function MivoTip({ tipKey, text, enabled = true, tail = 'none', tailAlign = 'left', style, onDismiss }: Props) {
  const [visible, setVisible] = useState(false);
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    void isTipSeen(tipKey).then((seen) => {
      if (cancelled || seen) return;
      setVisible(true);
      Animated.spring(anim, { toValue: 1, friction: 7, tension: 70, useNativeDriver: true }).start();
    });
    return () => {
      cancelled = true;
    };
  }, [enabled, tipKey, anim]);

  if (!visible) return null;

  const dismiss = () => {
    haptics.light();
    void markTipSeen(tipKey);
    Animated.timing(anim, { toValue: 0, duration: 180, easing: Easing.in(Easing.quad), useNativeDriver: true }).start(() => {
      setVisible(false);
      onDismiss?.();
    });
  };

  const tailPos = tailAlign === 'right' ? { right: 26 } : tailAlign === 'center' ? { left: '50%' as const, marginLeft: -7 } : { left: 30 };

  return (
    <Animated.View
      style={[
        styles.wrap,
        style,
        {
          opacity: anim,
          transform: [
            { translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [tail === 'up' ? -8 : 8, 0] }) },
            { scale: anim.interpolate({ inputRange: [0, 1], outputRange: [0.96, 1] }) },
          ],
        },
      ]}
      accessibilityLiveRegion="polite"
    >
      {tail === 'up' ? <View style={[styles.tail, styles.tailUp, tailPos]} /> : null}
      <View style={styles.card}>
        <View style={styles.avatar}>
          <Image source={mivoVoiceImages.speak} style={styles.avatarImg} resizeMode="contain" />
        </View>
        <View style={styles.body}>
          <Text style={styles.name}>Mivo</Text>
          <Text style={styles.text} maxFontSizeMultiplier={1.2}>{text}</Text>
          <Pressable onPress={dismiss} style={({ pressed }) => [styles.ok, pressed && { opacity: 0.85 }]} hitSlop={8} accessibilityRole="button">
            <Text style={styles.okText}>{t("Anladım")}</Text>
          </Pressable>
        </View>
      </View>
      {tail === 'down' ? <View style={[styles.tail, styles.tailDown, tailPos]} /> : null}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    shadowColor: colors.brand,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 10,
  },
  card: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#E0E7FF',
    padding: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarImg: { width: 46, height: 46 },
  body: { flex: 1, gap: 4 },
  name: { fontFamily: fonts.headingBold, fontSize: 11.5, letterSpacing: 1, color: colors.brand, textTransform: 'uppercase' },
  text: { fontFamily: fonts.bodyMedium, fontSize: 14.5, lineHeight: 20, color: colors.textHeading },
  ok: {
    alignSelf: 'flex-end',
    marginTop: 4,
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: colors.brand,
  },
  okText: { fontFamily: fonts.headingBold, fontSize: 13, color: '#FFFFFF' },
  tail: {
    position: 'absolute',
    width: 14,
    height: 14,
    backgroundColor: '#FFFFFF',
    borderColor: '#E0E7FF',
    transform: [{ rotate: '45deg' }],
    zIndex: 1,
  },
  tailDown: { bottom: -6, borderRightWidth: 1, borderBottomWidth: 1 },
  tailUp: { top: -6, borderLeftWidth: 1, borderTopWidth: 1 },
});
