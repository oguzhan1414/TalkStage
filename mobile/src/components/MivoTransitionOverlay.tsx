import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Easing, Modal, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, fonts } from '../theme/tokens';
import { MivoLoader } from './MivoLoader';
import { t } from '../i18n';

type TransitionContextType = {
  transitionTo: (callback: () => void, message?: string) => void;
  finishTransition: () => void;
};

const TransitionContext = createContext<TransitionContextType>({
  transitionTo: (callback) => callback(),
  finishTransition: () => undefined,
});

export const useMivoTransition = () => useContext(TransitionContext);

type ProviderProps = { children: React.ReactNode };

/**
 * Mivo is a fallback, not a toll: we navigate at once and the overlay only appears when the destination is still
 * not ready after SHOW_DELAY_MS. A fast screen never shows it; a slow one gets a moving Mivo instead of a frozen UI.
 */
const SHOW_DELAY_MS = 350;
/** Once shown, stay at least this long so it does not flash. */
const MIN_VISIBLE_MS = 600;
/** Safety net for a destination that never reports ready. */
const MAX_PENDING_MS = 6000;

/** Full-screen transition: navigates immediately, covers the screen only while the destination is genuinely loading. */
export function MivoTransitionProvider({ children }: ProviderProps) {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState(t("Hazırlanıyor…"));
  const fade = useRef(new Animated.Value(0)).current;
  /** A transition is in progress (destination has not reported ready yet), shown or not. */
  const pendingRef = useRef(false);
  const visibleRef = useRef(false);
  const shownAtRef = useRef(0);
  const showTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const safetyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Belirsiz (indeterminate) ilerleme çubuğunun kayan ışığı.
  const slide = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (!visible) return;
    slide.setValue(0);
    const loop = Animated.loop(
      Animated.timing(slide, { toValue: 1, duration: 1100, easing: Easing.inOut(Easing.quad), useNativeDriver: true })
    );
    loop.start();
    return () => loop.stop();
  }, [visible, slide]);

  const clearTimers = useCallback(() => {
    if (showTimerRef.current) clearTimeout(showTimerRef.current);
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
    showTimerRef.current = null;
    closeTimerRef.current = null;
    safetyTimerRef.current = null;
  }, []);

  const closeTransition = useCallback(() => {
    pendingRef.current = false;
    if (showTimerRef.current) clearTimeout(showTimerRef.current);
    showTimerRef.current = null;
    if (!visibleRef.current) {
      clearTimers();
      return;
    }
    Animated.timing(fade, { toValue: 0, duration: 200, useNativeDriver: true }).start(() => {
      visibleRef.current = false;
      setVisible(false);
      clearTimers();
    });
  }, [clearTimers, fade]);

  const finishTransition = useCallback(() => {
    if (!pendingRef.current) return;
    if (!visibleRef.current) {
      // Ready before the overlay ever appeared: nothing to hide, the user saw no delay at all.
      closeTransition();
      return;
    }
    const remaining = Math.max(0, MIN_VISIBLE_MS - (Date.now() - shownAtRef.current));
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(closeTransition, remaining);
  }, [closeTransition]);

  const transitionTo = useCallback(
    (callback: () => void, customMessage?: string) => {
      if (pendingRef.current) return;
      clearTimers();
      pendingRef.current = true;
      setMessage(customMessage ?? t("Hazırlanıyor…"));

      showTimerRef.current = setTimeout(() => {
        if (!pendingRef.current) return;
        visibleRef.current = true;
        shownAtRef.current = Date.now();
        fade.setValue(0);
        setVisible(true);
        Animated.timing(fade, { toValue: 1, duration: 180, useNativeDriver: true }).start();
      }, SHOW_DELAY_MS);
      safetyTimerRef.current = setTimeout(closeTransition, MAX_PENDING_MS);

      try {
        callback();
      } catch (error) {
        console.warn('[MivoTransition] Navigation failed:', error);
        closeTransition();
      }
    },
    [clearTimers, closeTransition, fade]
  );

  useEffect(() => clearTimers, [clearTimers]);

  const contextValue = useMemo(
    () => ({ transitionTo, finishTransition }),
    [finishTransition, transitionTo]
  );

  return (
    <TransitionContext.Provider value={contextValue}>
      {children}
      <Modal visible={visible} transparent={false} animationType="none" onRequestClose={finishTransition}>
        <Animated.View style={[styles.page, { opacity: fade }]}>
          <LinearGradient colors={['#F8FAFF', '#E8E8EC', '#EEF2FF']} style={StyleSheet.absoluteFill} />
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.brandRow}>
              <View style={styles.brandDot} />
              <Text style={styles.brandText}>{t("MIVO")}</Text>
            </View>

            <View style={styles.videoStage}>
              <MivoLoader size={230} />
            </View>

            <View style={styles.copyBlock}>
              <Text style={styles.message}>{message}</Text>
              <Text style={styles.subMessage}>{t("Yeni sahne hazırlanırken Mivo sana eşlik ediyor.")}</Text>
              <View style={styles.progressTrack}>
                <Animated.View
                  style={[
                    styles.progressFill,
                    {
                      transform: [
                        { translateX: slide.interpolate({ inputRange: [0, 1], outputRange: [-70, 168] }) },
                      ],
                    },
                  ]}
                />
              </View>
            </View>
          </SafeAreaView>
        </Animated.View>
      </Modal>
    </TransitionContext.Provider>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#E8E8EC' },
  safeArea: { flex: 1, paddingHorizontal: 24, paddingTop: 12, paddingBottom: 28 },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 36,
  },
  brandDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.brand },
  brandText: {
    fontFamily: fonts.mono,
    fontSize: 12,
    letterSpacing: 2.4,
    color: colors.brand,
    fontWeight: '700',
  },
  videoStage: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  copyBlock: { alignItems: 'center', paddingTop: 12 },
  message: {
    fontFamily: fonts.headingBold,
    fontSize: 20,
    lineHeight: 27,
    color: colors.textHeading,
    textAlign: 'center',
  },
  subMessage: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12.5,
    lineHeight: 18,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 6,
  },
  progressTrack: {
    width: 168,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(99, 102, 241, 0.14)',
    overflow: 'hidden',
    marginTop: 18,
  },
  progressFill: {
    width: 70,
    height: '100%',
    borderRadius: 2,
    backgroundColor: colors.brand,
  },
});
