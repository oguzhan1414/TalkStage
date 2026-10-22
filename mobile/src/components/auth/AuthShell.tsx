import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState, type ReactNode } from 'react';
import { Image, Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { mivoVoiceImages, spekviaWordmark } from '../../assets/images';
import { fonts, radii } from '../../theme/tokens';
import { getLocale, LOCALE_META, t } from '../../i18n';
import { LanguagePickerModal } from '../LanguagePickerModal';

type Props = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

/** True while the soft keyboard is up (the header then drops Mivo so the form has the whole screen). */
function useKeyboardVisible(): boolean {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const show = Keyboard.addListener(Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow', () => setVisible(true));
    const hide = Keyboard.addListener(Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide', () => setVisible(false));
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);
  return visible;
}

/**
 * Shared frame of the sign-in and sign-up screens: a clean light page, a small Mivo with the brand name,
 * a centred title and the form. Few elements and plenty of room; the keyboard hides Mivo, not the form.
 */
export function AuthShell({ title, subtitle, children }: Props) {
  const insets = useSafeAreaInsets();
  const keyboard = useKeyboardVisible();
  const [langOpen, setLangOpen] = useState(false);
  const meta = LOCALE_META[getLocale()];

  return (
    <View style={styles.root}>
      <LinearGradient colors={['#EEF2FF', '#FFFFFF']} style={styles.glow} pointerEvents="none" />
      <SafeAreaView style={styles.flex} edges={['top']}>
        <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView
            contentContainerStyle={[styles.scroll, { paddingBottom: 28 + insets.bottom }]}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.top}>
              <Pressable
                onPress={() => setLangOpen(true)}
                style={styles.lang}
                accessibilityRole="button"
                accessibilityLabel={t("Dil Seç")}
                hitSlop={8}
              >
                <Text style={styles.langText}>{meta.flag} {getLocale().toUpperCase()}</Text>
              </Pressable>
            </View>

            <View style={styles.header}>
              {!keyboard ? (
                <View style={styles.mivoCircle}>
                  <Image source={mivoVoiceImages.wait} style={styles.mivo} resizeMode="contain" />
                </View>
              ) : null}
              <Image source={spekviaWordmark} style={styles.wordmark} resizeMode="contain" accessibilityLabel="Spekvia" />
              <Text style={styles.title} maxFontSizeMultiplier={1.2}>{title}</Text>
              {subtitle ? <Text style={styles.subtitle} maxFontSizeMultiplier={1.2}>{subtitle}</Text> : null}
            </View>

            <View style={styles.body}>{children}</View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
      <LanguagePickerModal visible={langOpen} onClose={() => setLangOpen(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#FFFFFF' },
  glow: { position: 'absolute', top: 0, left: 0, right: 0, height: 320 },
  flex: { flex: 1 },
  scroll: { flexGrow: 1, paddingHorizontal: 24 },
  top: { alignItems: 'flex-end', paddingTop: 8 },
  lang: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: radii.pill,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  langText: { fontFamily: fonts.headingSemiBold, fontSize: 12, color: '#0F172A' },
  header: { alignItems: 'center', paddingTop: 8, paddingBottom: 22 },
  mivoCircle: {
    width: 104,
    height: 104,
    borderRadius: 52,
    backgroundColor: '#E0E7FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    overflow: 'hidden',
  },
  mivo: { width: 100, height: 100 },
  wordmark: { width: 150, height: 41, marginTop: 2 },
  title: { fontFamily: fonts.headingBold, fontSize: 28, letterSpacing: -0.4, color: '#0F172A', marginTop: 12, textAlign: 'center' },
  subtitle: { fontFamily: fonts.bodyRegular, fontSize: 15, lineHeight: 21, color: '#64748B', marginTop: 6, textAlign: 'center', maxWidth: 320 },
  body: { gap: 14 },
});
