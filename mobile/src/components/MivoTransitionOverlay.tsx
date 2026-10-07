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

const MIN_VISIBLE_MS = 1450;
const MAX_VISIBLE_MS = 8000;
const NAVIGATE_AFTER_MS = 320;

/** Full-screen transition that stays visible until the destination reports ready. */
export function MivoTransitionProvider({ children }: ProviderProps) {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState(t("Hazırlanıyor…"));
  const fade = useRef(new Animated.Value(0)).current;
  const visibleRef = useRef(false);
  const startedAtRef = useRef(0);
  const navigateTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
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
    if (navigateTimerRef.current) clearTimeout(navigateTimerRef.current);
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
    navigateTimerRef.current = null;
    closeTimerRef.current = null;
    safetyTimerRef.current = null;
  }, []);

  const closeTransition = useCallback(() => {
    if (!visibleRef.current) return;
    Animated.timing(fade, {
      toValue: 0,
      duration: 260,
      useNativeDriver: true,
    }).start(() => {
      visibleRef.current = false;
      setVisible(false);
      clearTimers();
    });
  }, [clearTimers, fade]);

  const finishTransition = useCallback(() => {
    if (!visibleRef.current) return;
    const elapsed = Date.now() - startedAtRef.current;
    const remaining = Math.max(0, MIN_VISIBLE_MS - elapsed);
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(closeTransition, remaining);
  }, [closeTransition]);

  const transitionTo = useCallback(
    (callback: () => void, customMessage?: string) => {
      if (visibleRef.current) return;
      clearTimers();
      visibleRef.current = true;
      startedAtRef.current = Date.now();
      setMessage(customMessage ?? t("Hazırlanıyor…"));
      setVisible(true);
      fade.setValue(0);

      Animated.timing(fade, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }).start();

      navigateTimerRef.current = setTimeout(() => {
        try {
          callback();
        } catch (error) {
          console.warn('[MivoTransition] Navigation failed:', error);
          finishTransition();
        }
      }, NAVIGATE_AFTER_MS);

      safetyTimerRef.current = setTimeout(closeTransition, MAX_VISIBLE_MS);
    },
    [clearTimers, closeTransition, fade, finishTransition]
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
