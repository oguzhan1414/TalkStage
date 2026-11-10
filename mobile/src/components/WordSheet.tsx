import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { getLocale, t } from '../i18n';
import { api } from '../lib/api';
import { colors, fonts, radii } from '../theme/tokens';

type Props = {
  /** The tapped word and the sentence it came from; null = closed. */
  target: { word: string; sentence: string } | null;
  onClose: () => void;
  onListen: (word: string) => void;
  /** Puts the word in the chest (with its meaning, when we have it). */
  onSave: (word: string, sentence: string, meaning: string | null) => void;
};

/**
 * A tapped word in a voice room: the word, its meaning in that sentence (in the learner's language), a listen button
 * and "Sandığa ekle". Nothing is saved until the learner chooses to.
 */
export function WordSheet({ target, onClose, onListen, onSave }: Props) {
  const insets = useSafeAreaInsets();
  const [meaning, setMeaning] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const locale = getLocale();
  const wantMeaning = locale !== 'en';

  useEffect(() => {
    setMeaning(null);
    if (!target || !wantMeaning) return;
    let alive = true;
    setLoading(true);
    api
      .post<{ meaning: string }>('/translate/word', { word: target.word, sentence: target.sentence, target: locale })
      .then((r) => alive && setMeaning(r.meaning))
      .catch(() => alive && setMeaning(null))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [target, wantMeaning, locale]);

  return (
    <Modal visible={target != null} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={[styles.sheet, { paddingBottom: insets.bottom + 16 }]} onPress={(e) => e.stopPropagation()}>
          <View style={styles.handle} />
          {target ? (
            <>
              <View style={styles.wordRow}>
                <Text style={styles.word}>{target.word}</Text>
                <Pressable onPress={() => onListen(target.word)} hitSlop={8} style={styles.listen} accessibilityRole="button" accessibilityLabel={t("Dinle")}>
                  <Ionicons name="volume-high" size={20} color={colors.brand} />
                </Pressable>
              </View>
              {wantMeaning ? (
                loading ? (
                  <ActivityIndicator color={colors.brand} style={{ alignSelf: 'flex-start', marginVertical: 4 }} />
                ) : (
                  <Text style={styles.meaning}>{meaning ?? t("Anlamı şu an getirilemedi")}</Text>
                )
              ) : null}
              {target.sentence && target.sentence !== target.word ? (
                <Text style={styles.sentence} numberOfLines={3}>
                  “{target.sentence}”
                </Text>
              ) : null}
              <Pressable
                onPress={() => {
                  onSave(target.word, target.sentence, meaning);
                  onClose();
                }}
                style={({ pressed }) => [styles.save, pressed && { opacity: 0.85 }]}
                accessibilityRole="button"
              >
                <Ionicons name="add-circle" size={19} color="#FFFFFF" />
                <Text style={styles.saveText}>{t("Sandığa ekle")}</Text>
              </Pressable>
            </>
          ) : null}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(15,23,42,0.45)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: '#FFFFFF', borderTopLeftRadius: 26, borderTopRightRadius: 26, paddingHorizontal: 20, paddingTop: 10, gap: 10 },
  handle: { alignSelf: 'center', width: 40, height: 4, borderRadius: 2, backgroundColor: '#E2E8F0', marginBottom: 6 },
  wordRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  word: { flex: 1, fontFamily: fonts.headingBold, fontSize: 28, color: colors.textHeading },
  listen: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#EEF2FF', alignItems: 'center', justifyContent: 'center' },
  meaning: { fontFamily: fonts.headingSemiBold, fontSize: 18, color: colors.brand },
  sentence: { fontFamily: fonts.bodyMedium, fontSize: 14, lineHeight: 20, color: colors.textMuted, fontStyle: 'italic' },
  save: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 6, paddingVertical: 14, borderRadius: radii.pill, backgroundColor: colors.brand },
  saveText: { fontFamily: fonts.headingBold, fontSize: 15, color: '#FFFFFF' },
});
