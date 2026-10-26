import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { mivoVoiceImages } from '../../assets/images';
import { t } from '../../i18n';
import { haptics } from '../../lib/haptics';
import { colors, fonts } from '../../theme/tokens';
import { PopIn } from './anim';

/** Room the floating exit button takes at the bottom of a lesson page (add it to the scroll padding). */
export const EXIT_SPACE = 92;

/**
 * The big round "leave" button at the bottom left of a lesson. While a part is in progress (`confirm`), it asks
 * first, because the part's answers are not saved until the part is finished.
 */
export function ExitButton({ onExit, confirm }: { onExit: () => void; confirm: boolean }) {
  const insets = useSafeAreaInsets();
  const [asking, setAsking] = useState(false);
  return (
    <>
      <Pressable
        onPress={() => {
          haptics.light();
          if (confirm) setAsking(true);
          else onExit();
        }}
        hitSlop={8}
        style={({ pressed }) => [styles.btn, { bottom: Math.max(insets.bottom, 12) + 14 }, pressed && { transform: [{ scale: 0.94 }] }]}
        accessibilityRole="button"
        accessibilityLabel={t("Dersten çık")}
      >
        <Ionicons name="exit-outline" size={28} color={colors.textHeading} style={{ transform: [{ scaleX: -1 }] }} />
      </Pressable>

      <Modal visible={asking} transparent animationType="fade" onRequestClose={() => setAsking(false)}>
        <Pressable style={styles.overlay} onPress={() => setAsking(false)}>
          <PopIn style={styles.card}>
            <Pressable onPress={(e) => e.stopPropagation()} style={{ alignItems: 'center', alignSelf: 'stretch' }}>
              <Image source={mivoVoiceImages.wait} style={styles.mivo} resizeMode="contain" />
              <Text style={styles.title}>{t("Gidiyor musun?")}</Text>
              <Text style={styles.text}>{t("Bu bölümü bitirmeden çıkarsan buradaki cevapların kaydedilmez. Kazandığın yıldızlar cebinde kalır.")}</Text>
              <Pressable onPress={() => setAsking(false)} style={styles.stay} accessibilityRole="button">
                <Text style={styles.stayText}>{t("Devam edeyim")}</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setAsking(false);
                  onExit();
                }}
                hitSlop={8}
                style={styles.leave}
                accessibilityRole="button"
              >
                <Text style={styles.leaveText}>{t("Çık")}</Text>
              </Pressable>
            </Pressable>
          </PopIn>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  btn: {
    position: 'absolute',
    left: 18,
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderBottomWidth: 5,
    borderColor: '#E6EAF2',
  },
  overlay: { flex: 1, backgroundColor: 'rgba(15,23,42,0.5)', alignItems: 'center', justifyContent: 'center', padding: 24 },
  card: { width: '100%', maxWidth: 360, backgroundColor: '#FFFFFF', borderRadius: 28, padding: 22, alignItems: 'center' },
  mivo: { width: 96, height: 96, marginTop: -4 },
  title: { fontFamily: fonts.headingBold, fontSize: 22, color: colors.textHeading, marginTop: 6 },
  text: { fontFamily: fonts.bodyMedium, fontSize: 14.5, lineHeight: 21, color: colors.textBody, textAlign: 'center', marginTop: 6 },
  stay: {
    alignSelf: 'stretch',
    backgroundColor: colors.brand,
    borderRadius: 18,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 18,
    borderBottomWidth: 4,
    borderBottomColor: '#3730A3',
  },
  stayText: { fontFamily: fonts.headingBold, fontSize: 16, color: '#FFFFFF' },
  leave: { paddingVertical: 12, marginTop: 4 },
  leaveText: { fontFamily: fonts.headingBold, fontSize: 15, color: colors.error },
});
