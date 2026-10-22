import Ionicons from '@expo/vector-icons/Ionicons';
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { mivoVoiceImages } from '../assets/images';
import { t } from '../i18n';
import { colors, fonts, radii, spacing } from '../theme/tokens';
import { Button } from './Button';

export type SessionEndReason = 'goodbye' | 'user' | 'time' | 'idle';

export type SessionNote = { wrong: string; corrected: string; explanation?: string | null };

type Props = {
  visible: boolean;
  reason: SessionEndReason;
  seconds: number;
  /** Sentences the learner said (user turns). */
  sentences: number;
  notes: SessionNote[];
  onClose: () => void;
  onOpenMistakes?: () => void;
  /** Idle close: carry on in a fresh room. */
  onReconnect?: () => void;
};

function clock(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

/** The end of a voice room: why it ended, how much the learner spoke, and Mivo's notes from this conversation. */
export function VoiceSessionSummary({ visible, reason, seconds, sentences, notes, onClose, onOpenMistakes, onReconnect }: Props) {
  const title =
    reason === 'goodbye'
      ? t("Güzel sohbetti! 👋")
      : reason === 'time'
        ? t("Bu sohbetin süresi doldu")
        : reason === 'idle'
          ? t("Uzun süre sessiz kaldın")
          : t("Sohbet bitti");
  const sub =
    reason === 'idle'
      ? t("Oda kendini kapattı. Kaldığın yerden yeni bir sohbetle devam edebilirsin.")
      : notes.length > 0
        ? t("Mivo'nun notları Hatalarım Defteri'ne kaydedildi.")
        : sentences > 0
          ? t("Bu sohbette Mivo'nun not alacağı bir hata yoktu. Harika!")
          : t("Bir dahaki sefere birkaç cümle konuşalım.");
  const shown = notes.slice(0, 3);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
            <Image source={reason === 'goodbye' ? mivoVoiceImages.wait : mivoVoiceImages.think} style={styles.mascot} resizeMode="contain" />
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.sub}>{sub}</Text>

            <View style={styles.stats}>
              <View style={styles.stat}>
                <Text style={styles.statValue}>{clock(seconds)}</Text>
                <Text style={styles.statLabel}>{t("süre")}</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statValue}>{sentences}</Text>
                <Text style={styles.statLabel}>{t("cümle konuştun")}</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statValue}>{notes.length}</Text>
                <Text style={styles.statLabel}>{t("Mivo'nun notu")}</Text>
              </View>
            </View>

            {shown.length > 0 ? (
              <View style={styles.notes}>
                {shown.map((note, i) => (
                  <View key={i} style={styles.note}>
                    <View style={styles.noteRow}>
                      <Ionicons name="close-circle" size={15} color="#E11D48" />
                      <Text style={styles.noteWrong} numberOfLines={2}>{note.wrong}</Text>
                    </View>
                    <View style={styles.noteRow}>
                      <Ionicons name="checkmark-circle" size={15} color="#059669" />
                      <Text style={styles.noteRight} numberOfLines={2}>{note.corrected}</Text>
                    </View>
                    {note.explanation ? <Text style={styles.noteWhy} numberOfLines={3}>{note.explanation}</Text> : null}
                  </View>
                ))}
                {notes.length > shown.length ? (
                  <Text style={styles.more}>{t("+{{n}} not daha", { n: notes.length - shown.length })}</Text>
                ) : null}
              </View>
            ) : null}

            {onReconnect ? (
              <Button label={t("Yeni sohbet başlat")} variant="chunky" onPress={onReconnect} style={styles.cta} />
            ) : null}
            {notes.length > 0 && onOpenMistakes ? (
              <Pressable onPress={onOpenMistakes} style={styles.link} accessibilityRole="button">
                <Ionicons name="bookmark-outline" size={16} color={colors.brand} />
                <Text style={styles.linkText}>{t("Hatalarım Defteri'ni aç")}</Text>
              </Pressable>
            ) : null}
            {onReconnect ? (
              <Pressable onPress={onClose} style={styles.link} accessibilityRole="button">
                <Text style={styles.linkText}>{t("Kapat")}</Text>
              </Pressable>
            ) : (
              <Button label={t("Tamam")} variant="chunky" onPress={onClose} style={styles.cta} />
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(15,23,42,0.6)', justifyContent: 'center', paddingHorizontal: spacing.md },
  card: { backgroundColor: '#FFFFFF', borderRadius: radii.lg, maxHeight: '90%', overflow: 'hidden' },
  scroll: { padding: 20, alignItems: 'stretch' },
  mascot: { width: 108, height: 108, alignSelf: 'center' },
  title: { fontFamily: fonts.headingBold, fontSize: 21, color: colors.textHeading, textAlign: 'center', marginTop: 6 },
  sub: { fontFamily: fonts.bodyRegular, fontSize: 13.5, lineHeight: 19, color: colors.textMuted, textAlign: 'center', marginTop: 4 },
  stats: { flexDirection: 'row', gap: 8, marginTop: 16 },
  stat: { flex: 1, alignItems: 'center', backgroundColor: '#F8FAFC', borderRadius: 14, paddingVertical: 10 },
  statValue: { fontFamily: fonts.headingBold, fontSize: 19, color: colors.textHeading },
  statLabel: { fontFamily: fonts.bodyRegular, fontSize: 11.5, color: colors.textMuted, marginTop: 2, textAlign: 'center' },
  notes: { gap: 8, marginTop: 14 },
  note: { gap: 4, backgroundColor: '#F5F3FF', borderWidth: 1, borderColor: '#DDD6FE', borderRadius: 14, padding: 10 },
  noteRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 6 },
  noteWrong: { flex: 1, fontFamily: fonts.bodyRegular, fontSize: 13, color: '#9F1239', textDecorationLine: 'line-through' },
  noteRight: { flex: 1, fontFamily: fonts.headingSemiBold, fontSize: 14, color: colors.textHeading },
  noteWhy: { fontFamily: fonts.bodyRegular, fontSize: 12.5, lineHeight: 17, color: '#475569', marginLeft: 21 },
  more: { fontFamily: fonts.bodyMedium, fontSize: 12.5, color: colors.textMuted, textAlign: 'center' },
  cta: { marginTop: 16 },
  link: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 10 },
  linkText: { fontFamily: fonts.headingSemiBold, fontSize: 14, color: colors.brand },
});
