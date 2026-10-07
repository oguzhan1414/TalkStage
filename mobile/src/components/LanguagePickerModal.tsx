import { Ionicons } from '@expo/vector-icons';
import { reloadAppAsync } from 'expo';
import { useState } from 'react';
import { ActivityIndicator, DevSettings, Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { getLocale, LOCALE_META, LOCALES, persistLocale, t, type Locale } from '../i18n';
import { api } from '../lib/api';
import { colors, fonts, radii, spacing } from '../theme/tokens';

type Props = {
  visible: boolean;
  onClose: () => void;
};

/**
 * Uygulama dili seçici. Çeviriler modül yüklenirken (import anında) uygulandığı
 * için seçim kaydedildikten sonra uygulama kendini yeniden yükler.
 */
export function LanguagePickerModal({ visible, onClose }: Props) {
  const current = getLocale();
  const [switching, setSwitching] = useState<Locale | null>(null);

  const choose = async (locale: Locale) => {
    if (locale === current || switching) {
      onClose();
      return;
    }
    setSwitching(locale);
    try {
      await persistLocale(locale);
      // Best-effort: the backend uses profiles.native_language for AI explanations.
      // Never block the switch on the network.
      await Promise.race([
        api.patch('/me', { native_language: locale }).catch(() => undefined),
        new Promise((resolve) => setTimeout(resolve, 2500)),
      ]);
    } catch {
      setSwitching(null);
      return;
    }
    // Yeniden yükleme sessizce hiçbir şey yapmazsa (ör. bazı Expo Go/dev ortamları)
    // spinner sonsuza dek dönmesin: önce DevSettings'e, sonra hata durumuna düş.
    try {
      await reloadAppAsync();
    } catch {
      DevSettings.reload();
    }
    setTimeout(() => {
      try {
        DevSettings.reload();
      } catch {
        // yoksay
      }
      setSwitching(null);
    }, 2500);
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
          <View style={styles.handle} />
          <Text style={styles.title}>{t("Dil Seç")}</Text>
          <Text style={styles.sub}>{t("Arayüz ve açıklamalar seçtiğin dilde gösterilir.")}</Text>

          {LOCALES.map((locale) => {
            const meta = LOCALE_META[locale];
            const selected = locale === current;
            return (
              <Pressable
                key={locale}
                onPress={() => choose(locale)}
                style={[styles.row, selected && styles.rowSelected]}
                accessibilityRole="button"
                accessibilityState={{ selected }}
              >
                <Text style={styles.flag}>{meta.flag}</Text>
                <Text style={[styles.name, selected && styles.nameSelected]}>{meta.nativeName}</Text>
                {switching === locale ? (
                  <ActivityIndicator color={colors.brand} />
                ) : selected ? (
                  <Ionicons name="checkmark-circle" size={22} color={colors.brand} />
                ) : null}
              </Pressable>
            );
          })}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(15, 23, 42, 0.55)', justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: spacing.md,
    paddingBottom: 36,
    gap: 8,
  },
  handle: { width: 40, height: 4, borderRadius: 2, backgroundColor: '#CBD5E1', alignSelf: 'center', marginBottom: 6 },
  title: { fontFamily: fonts.headingBold, fontSize: 18, color: colors.textHeading },
  sub: { fontFamily: fonts.bodyRegular, fontSize: 12, color: colors.textMuted, marginBottom: 6 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 13,
    paddingHorizontal: 14,
    borderRadius: radii.md,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
  },
  rowSelected: { borderColor: colors.brand, backgroundColor: '#EEF2FF' },
  flag: { fontSize: 22 },
  name: { flex: 1, fontFamily: fonts.headingSemiBold, fontSize: 15, color: colors.textHeading },
  nameSelected: { color: colors.brand },
});
