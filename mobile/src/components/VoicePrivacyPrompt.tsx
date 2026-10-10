import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Button } from './Button';
import { colors, fonts, radii, spacing } from '../theme/tokens';
import { t } from '../i18n';

const PRIVACY_URL = process.env.EXPO_PUBLIC_PRIVACY_URL || 'https://spekvia.com/gizlilik';

export function VoicePrivacyPrompt({ onContinue }: { onContinue: () => void }) {
  return (
    <View style={styles.card}>
      <View style={styles.iconCircle}>
        <Ionicons name="mic-outline" size={34} color={colors.brand} />
      </View>
      <Text style={styles.title}>{t("Sesin nasıl işleniyor?")}</Text>
      <Text style={styles.body}>{t("Mikrofon yalnızca canlı konuşma sırasında kullanılır. Ses akışı konuşmayı yazıya çevirmek ve geri bildirim üretmek için hizmet sağlayıcılarımıza güvenli bağlantıyla iletilir. Ham ses Spekvia öğrenme geçmişinde saklanmaz; konuşma metni ve performans sonuçları hesabına kaydedilebilir.")}</Text>
      <Button label={t("Anladım, Devam Et")} onPress={onContinue} style={styles.button} />
      <Pressable
        onPress={() => {
          void Linking.openURL(PRIVACY_URL);
        }}
        accessibilityRole="link"
        accessibilityLabel={t("Gizlilik politikasını aç")}
      >
        <Text style={styles.link}>{t("Gizlilik politikasını incele")}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    maxWidth: 420,
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
  },
  iconCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEF2FF',
    marginBottom: spacing.md,
  },
  title: {
    fontFamily: fonts.headingBold,
    fontSize: 20,
    color: colors.textHeading,
    textAlign: 'center',
  },
  body: {
    fontFamily: fonts.bodyRegular,
    fontSize: 13,
    lineHeight: 20,
    color: colors.textBody,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  button: {
    width: '100%',
    marginTop: spacing.lg,
  },
  link: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    color: colors.brand,
    marginTop: spacing.md,
  },
});
