import { Image, StyleSheet, Text, View } from 'react-native';

import { stateImages } from '../assets/images';
import { xpLevelInfo } from '../constants/xp';
import { colors, fonts } from '../theme/tokens';
import { t } from '../i18n';

/** "Mivo ile dostluk" — level + progress bar derived from total XP (see `constants/xp.ts`). No server state. */
export function XpLevelCard({ xp }: { xp: number | null | undefined }) {
  const info = xpLevelInfo(xp);

  return (
    <View style={styles.card}>
      <Image source={stateImages.xpBolt} style={styles.icon} resizeMode="contain" />
      <View style={styles.textCol}>
        <Text style={styles.kicker}>{t("Mivo ile dostluk")}</Text>
        <Text style={styles.title}>
          {t("Seviye {{level}}", { level: info.level })} · {info.name}
        </Text>
        <View style={styles.track} accessibilityRole="progressbar">
          <View style={[styles.fill, { width: `${Math.round(info.progress * 100)}%` }]} />
        </View>
        <Text style={styles.caption}>
          {info.nextAt ? `${info.xp} / ${info.nextAt} ${t("XP")}` : t("En üst seviyedesin! 🎉")}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#DDD6FE',
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 14,
    marginBottom: 16,
  },
  icon: { width: 44, height: 44 },
  textCol: { flex: 1, gap: 4 },
  kicker: {
    fontFamily: fonts.mono,
    fontSize: 10,
    color: colors.brand,
    letterSpacing: 0.4,
  },
  title: {
    fontFamily: fonts.headingBold,
    fontSize: 15,
    color: colors.textHeading,
  },
  track: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EEF2FF',
    overflow: 'hidden',
    marginTop: 2,
  },
  fill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: colors.brand,
  },
  caption: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: colors.textMuted,
  },
});
