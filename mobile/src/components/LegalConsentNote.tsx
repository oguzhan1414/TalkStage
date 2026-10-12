import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';

import { privacyUrl, termsUrl } from '../constants/legalLinks';
import { colors, fonts } from '../theme/tokens';
import { t } from '../i18n';

/**
 * "By continuing you accept the Terms and Privacy Policy" under the sign-up / sign-in actions (every path that can
 * create an account). Three short pieces instead of one sentence with embedded links, so it translates cleanly
 * into languages with a different word order.
 */
export function LegalConsentNote() {
  return (
    <View style={styles.wrap}>
      <Text style={styles.text}>{t("Devam ederek şunları kabul etmiş olursun:")}</Text>
      <View style={styles.row}>
        <Pressable onPress={() => void Linking.openURL(termsUrl())} hitSlop={8} accessibilityRole="link">
          <Text style={styles.link}>{t("Kullanım Şartları")}</Text>
        </Pressable>
        <Text style={styles.text}>·</Text>
        <Pressable onPress={() => void Linking.openURL(privacyUrl())} hitSlop={8} accessibilityRole="link">
          <Text style={styles.link}>{t("Gizlilik Politikası")}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', gap: 4, marginTop: 12 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  text: { fontFamily: fonts.bodyRegular, fontSize: 12, color: colors.textMuted, textAlign: 'center' },
  link: { fontFamily: fonts.bodyRegular, fontSize: 12, color: colors.brand, textDecorationLine: 'underline' },
});
