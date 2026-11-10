import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { CAST, CAST_LINEUP } from '../../assets/cast';
import { flatSteps, loc, type PathLevel } from '../../data/path';
import { t } from '../../i18n';
import { colors, fonts } from '../../theme/tokens';
import { SpeakerAvatar } from './SpeakerAvatar';

/** The cast members who speak in this level's story, most lines first. */
function castOfLevel(level: PathLevel): string[] {
  const count: Record<string, number> = {};
  for (const f of flatSteps(level)) {
    if (f.step.kind !== 'reading') continue;
    for (const s of f.step.episode.sentences) if (s.speaker && CAST[s.speaker]) count[s.speaker] = (count[s.speaker] ?? 0) + 1;
  }
  return Object.keys(count).sort((a, b) => count[b] - count[a]);
}

/**
 * "Your new friends": shown once when a level's story starts (and from the story title on Bugün). The cast lineup,
 * the story's title and blurb, and the cast members of this level with one line each.
 */
export function StoryIntroSheet({ level, visible, onClose, onStart }: { level: PathLevel; visible: boolean; onClose: () => void; onStart?: () => void }) {
  const people = castOfLevel(level);
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        {/* The dimmed area closes the sheet; it sits behind the sheet so it never takes the sheet's scroll gestures. */}
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} accessibilityRole="button" accessibilityLabel={t("Kapat")} />
        <View style={styles.sheet}>
          <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false} contentContainerStyle={styles.body}>
            <View style={styles.lineupWrap}>
              <Image source={CAST_LINEUP} style={styles.lineup} resizeMode="contain" />
            </View>
            <Text style={styles.kicker}>{t("{{level}} hikâyesi", { level: level.id })}</Text>
            <Text style={styles.title}>{loc(level.story.title)}</Text>
            <Text style={styles.blurb}>{loc(level.story.blurb)}</Text>
            {people.length ? <Text style={styles.section}>{t("Hikâyedeki arkadaşların")}</Text> : null}
            {people.map((name) => (
              <View key={name} style={styles.person}>
                <SpeakerAvatar speaker={name} size={46} />
                <View style={{ flex: 1 }}>
                  <Text style={[styles.personName, { color: CAST[name].color }]}>{name}</Text>
                  <Text style={styles.personBio}>{CAST[name].bio?.()}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
          <Pressable
            onPress={() => {
              onClose();
              onStart?.();
            }}
            style={styles.btn}
            accessibilityRole="button"
          >
            <Text style={styles.btnText}>{onStart ? t("Hikâyeye başla") : t("Devam et")}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(15,23,42,0.5)', justifyContent: 'flex-end' },
  sheet: { maxHeight: '88%', backgroundColor: '#FBF7F1', borderTopLeftRadius: 28, borderTopRightRadius: 28, paddingBottom: 28, overflow: 'hidden' },
  scroll: { flexShrink: 1 },
  body: { paddingHorizontal: 20, paddingBottom: 12, gap: 6 },
  // The whole cast, never cropped, at a size that leaves room for the story and the names below.
  lineupWrap: { alignItems: 'center', marginTop: 8, backgroundColor: '#FFFFFF', borderRadius: 20, paddingVertical: 6 },
  lineup: { width: '100%', height: 190 },
  kicker: { fontFamily: fonts.headingBold, fontSize: 12.5, letterSpacing: 1.2, color: colors.brand, textTransform: 'uppercase', marginTop: 8 },
  title: { fontFamily: fonts.headingBold, fontSize: 24, color: colors.textHeading },
  blurb: { fontFamily: fonts.bodyMedium, fontSize: 14.5, lineHeight: 21, color: colors.textBody },
  section: { fontFamily: fonts.headingBold, fontSize: 15, color: colors.textHeading, marginTop: 14, marginBottom: 4 },
  person: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 6 },
  personName: { fontFamily: fonts.headingBold, fontSize: 15.5 },
  personBio: { fontFamily: fonts.bodyRegular, fontSize: 13.5, lineHeight: 18, color: colors.textBody },
  btn: { marginHorizontal: 20, marginTop: 8, backgroundColor: colors.brand, borderRadius: 16, paddingVertical: 15, alignItems: 'center' },
  btnText: { fontFamily: fonts.headingBold, fontSize: 16, color: '#FFFFFF' },
});
