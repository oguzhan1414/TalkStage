import Ionicons from '@expo/vector-icons/Ionicons';
import type { ReactNode } from 'react';
import { Image, type ImageSourcePropType, Pressable, StyleSheet, Text, View } from 'react-native';

import { t } from '../i18n';
import { colors, fonts, spacing } from '../theme/tokens';

type Props = {
  title: string;
  subtitle?: string;
  /** Başlığın yanında duran 3D ikon (Kütüphane, Klasörler, Sandık). */
  icon: ImageSourcePropType;
  onBack: () => void;
  right?: ReactNode;
};

/** Kelime ekranlarının ortak başlığı: geri düğmesi, 3D ikon, başlık ve alt başlık, sağda isteğe bağlı eylem. */
export function ScreenHeader({ title, subtitle, icon, onBack, right }: Props) {
  return (
    <View style={styles.row}>
      <Pressable onPress={onBack} hitSlop={12} style={styles.back} accessibilityRole="button" accessibilityLabel={t("Geri")}>
        <Ionicons name="chevron-back" size={22} color={colors.textHeading} />
      </Pressable>
      <Image source={icon} style={styles.icon} resizeMode="contain" />
      <View style={styles.texts}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        {subtitle ? (
          <Text style={styles.sub} numberOfLines={1}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {right}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: spacing.md, paddingTop: 8, paddingBottom: 10 },
  back: { width: 38, height: 38, borderRadius: 19, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#E2E8F0' },
  icon: { width: 46, height: 46 },
  texts: { flex: 1 },
  title: { fontFamily: fonts.headingBold, fontSize: 21, lineHeight: 26, color: colors.textHeading },
  sub: { fontFamily: fonts.bodyRegular, fontSize: 12.5, color: colors.textMuted, marginTop: 1 },
});

