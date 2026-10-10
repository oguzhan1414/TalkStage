import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AppState, Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { BADGE_BY_ID } from '../constants/badges';
import { haptics } from '../lib/haptics';
import { markBadgesSeen, onBadgeStates, requestBadgeSync } from '../lib/badges';
import { colors, fonts, radii } from '../theme/tokens';
import type { BadgeState } from '../types/api';
import { t } from '../i18n';
import { useAuth } from '../context/AuthContext';

/**
 * Mounted once under the providers. Keeps the ['badges'] query fresh from every sync, re-checks badges when
 * the app comes back to the foreground, and celebrates newly earned badges (one card at a time).
 */
export function BadgeCelebration() {
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const [queue, setQueue] = useState<string[]>([]);
  const shownRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    return onBadgeStates((states: BadgeState[]) => {
      queryClient.setQueryData(['badges'], states);
      const fresh = states.filter((s) => s.earned && s.unseen && !shownRef.current.has(s.id)).map((s) => s.id);
      if (fresh.length === 0) return;
      fresh.forEach((id) => shownRef.current.add(id));
      setQueue((prev) => [...prev, ...fresh]);
    });
  }, [queryClient]);

  useEffect(() => {
    if (!session) return;
    requestBadgeSync();
    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'active') requestBadgeSync();
    });
    return () => sub.remove();
  }, [session]);

  const current = queue[0] ? BADGE_BY_ID[queue[0]] : null;

  useEffect(() => {
    if (current) haptics.success();
  }, [current]);

  const dismiss = useCallback(() => {
    setQueue((prev) => {
      const [first, ...rest] = prev;
      if (first) markBadgesSeen([first]);
      return rest;
    });
  }, []);

  if (!current) return null;
  return (
    <Modal transparent animationType="fade" visible onRequestClose={dismiss}>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.eyebrow}>{t("YENİ ROZET")}</Text>
          <Image source={current.image} style={styles.image} resizeMode="contain" />
          <Text style={styles.title}>{current.title}</Text>
          <Text style={styles.criteria}>{current.criteriaText}</Text>
          {queue.length > 1 ? <Text style={styles.more}>{t("+{{count}} rozet daha", { count: queue.length - 1 })}</Text> : null}
          <Pressable onPress={dismiss} style={styles.button} accessibilityRole="button">
            <Text style={styles.buttonText}>{t("Harika!")}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(15, 23, 42, 0.72)', alignItems: 'center', justifyContent: 'center', padding: 24 },
  card: { width: '100%', maxWidth: 360, backgroundColor: '#FFFFFF', borderRadius: 28, padding: 24, alignItems: 'center', gap: 6 },
  eyebrow: { fontFamily: fonts.headingBold, fontSize: 11, letterSpacing: 1.4, color: colors.brand },
  image: { width: 200, height: 200, marginVertical: 4 },
  title: { fontFamily: fonts.headingBold, fontSize: 22, color: colors.textHeading, textAlign: 'center' },
  criteria: { fontFamily: fonts.bodyRegular, fontSize: 14, color: colors.textMuted, textAlign: 'center', lineHeight: 20 },
  more: { fontFamily: fonts.bodyMedium, fontSize: 12, color: colors.textMuted, marginTop: 4 },
  button: { marginTop: 14, backgroundColor: colors.brand, borderRadius: radii.pill, paddingHorizontal: 40, paddingVertical: 13 },
  buttonText: { fontFamily: fonts.headingBold, fontSize: 15, color: '#FFFFFF' },
});
