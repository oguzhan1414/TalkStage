import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useIsOffline } from '../lib/network';
import { fonts, spacing } from '../theme/tokens';
import { t } from '../i18n';

/** Thin strip at the very top while the phone has no internet. It never blocks touches. */
export function OfflineBanner() {
  const offline = useIsOffline();
  const insets = useSafeAreaInsets();
  if (!offline) return null;

  return (
    <View pointerEvents="none" style={[styles.wrap, { paddingTop: insets.top + 4 }]} accessibilityLiveRegion="polite">
      <Ionicons name="cloud-offline-outline" size={14} color="#FFFFFF" />
      <Text style={styles.text}>{t("İnternet bağlantısı yok — bağlanınca devam eder")}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingBottom: 6,
    paddingHorizontal: spacing.md,
    backgroundColor: 'rgba(15,23,42,0.92)',
  },
  text: { fontFamily: fonts.headingSemiBold, fontSize: 12, color: '#FFFFFF' },
});
