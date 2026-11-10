import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { Modal, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { t } from '../i18n';
import { colors, fonts } from '../theme/tokens';
import { Button } from './Button';
import { KeyboardSafe } from './KeyboardSafe';

const MAX_TAGS = 20;

/**
 * Bottom sheet for a word's tags: tap the tags you already use to switch them on or off, type a new one.
 * Used from the saved-word menu; the same chips are inline in the add-word form.
 */
export function TagSheet({
  visible,
  term,
  initial,
  allTags,
  saving,
  error,
  onSave,
  onClose,
}: {
  visible: boolean;
  term: string;
  initial: string[];
  allTags: string[];
  saving?: boolean;
  /** Shown inside the sheet (a toast would sit behind it). */
  error?: string | null;
  onSave: (tags: string[]) => void;
  onClose: () => void;
}) {
  const [tags, setTags] = useState<string[]>(initial);
  const [draft, setDraft] = useState('');

  useEffect(() => {
    if (visible) {
      setTags(initial);
      setDraft('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const has = (tag: string) => tags.some((x) => x.toLowerCase() === tag.toLowerCase());
  const toggle = (tag: string) => setTags((cur) => (has(tag) ? cur.filter((x) => x.toLowerCase() !== tag.toLowerCase()) : [...cur, tag]));
  const add = () => {
    const clean = draft.trim().slice(0, 40);
    if (clean && !has(clean) && tags.length < MAX_TAGS) setTags((cur) => [...cur, clean]);
    setDraft('');
  };
  const choices = [...allTags.filter((x) => !tags.some((y) => y.toLowerCase() === x.toLowerCase())), ...tags];

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <KeyboardSafe style={{ width: '100%' }}>
          <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
            <View style={styles.handle} />
            <Text style={styles.title}>{t("Etiketler")}</Text>
            <Text style={styles.sub}>{t("“{{term}}” hangi gruplarda dursun?", { term })}</Text>

            {choices.length > 0 ? (
              <View style={styles.chips}>
                {choices.map((tag) => {
                  const on = has(tag);
                  return (
                    <Pressable
                      key={tag}
                      onPress={() => toggle(tag)}
                      style={[styles.chip, on && styles.chipOn]}
                      accessibilityRole="button"
                      accessibilityState={{ selected: on }}
                    >
                      {on ? <Ionicons name="checkmark" size={14} color="#FFFFFF" /> : null}
                      <Text style={[styles.chipText, on && { color: '#FFFFFF' }]}>{tag}</Text>
                    </Pressable>
                  );
                })}
              </View>
            ) : (
              <Text style={styles.hint}>{t("Henüz etiketin yok. İlkini aşağıya yaz: Seyahat, İş, Mutfak…")}</Text>
            )}

            <View style={styles.newRow}>
              <TextInput
                value={draft}
                onChangeText={setDraft}
                onSubmitEditing={add}
                placeholder={t("Yeni etiket")}
                placeholderTextColor={colors.textMuted}
                style={styles.input}
                maxLength={40}
                returnKeyType="done"
              />
              <Pressable onPress={add} disabled={!draft.trim()} style={[styles.addBtn, !draft.trim() && { opacity: 0.4 }]} accessibilityRole="button" accessibilityLabel={t("Ekle")}>
                <Ionicons name="add" size={22} color="#FFFFFF" />
              </Pressable>
            </View>

            {error ? (
              <View style={styles.error}>
                <Ionicons name="alert-circle" size={18} color="#E11D48" />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            <Button label={t("Kaydet")} loading={saving} onPress={() => onSave(tags)} />
          </Pressable>
        </KeyboardSafe>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(15,23,42,0.45)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: '#FFFFFF', borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 20, paddingBottom: 34, gap: 14 },
  handle: { alignSelf: 'center', width: 44, height: 5, borderRadius: 3, backgroundColor: '#E2E8F0' },
  title: { fontFamily: fonts.headingBold, fontSize: 20, color: colors.textHeading },
  sub: { fontFamily: fonts.bodyRegular, fontSize: 13.5, color: colors.textMuted, marginTop: -8 },
  hint: { fontFamily: fonts.bodyRegular, fontSize: 13.5, lineHeight: 19, color: colors.textMuted },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#F5F3FF',
    borderWidth: 1.5,
    borderColor: '#E0E7FF',
  },
  chipOn: { backgroundColor: colors.brand, borderColor: colors.brand },
  chipText: { fontFamily: fonts.headingSemiBold, fontSize: 13.5, color: colors.brand },
  newRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  input: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontFamily: fonts.bodyMedium,
    fontSize: 15,
    color: colors.textHeading,
  },
  error: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#FFF1F2', borderRadius: 14, padding: 12 },
  errorText: { flex: 1, fontFamily: fonts.bodyMedium, fontSize: 13, lineHeight: 18, color: '#9F1239' },
  addBtn: { width: 44, height: 44, borderRadius: 14, backgroundColor: colors.brand, alignItems: 'center', justifyContent: 'center' },
});
