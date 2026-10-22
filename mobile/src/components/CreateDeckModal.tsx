import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { minimalFeatureIcons } from '../assets/images';
import { saveCustomDeck, type VocabDeck } from '../data/vocabDecks';
import { colors, fonts, radii, shadow } from '../theme/tokens';
import { BouncyPressable } from './BouncyPressable';
import { t } from '../i18n';

const EMOJI_OPTIONS = ['📁', '💼', '🚀', '🎨', '🍕', '✈️', '💡', '⭐', '🎯', '🔥', '💻', '☕'];
const COLOR_OPTIONS = ['#4F46E5', '#10B981', '#F59E0B', '#EC4899', '#06B6D4', '#8B5CF6', '#EF4444', '#14B8A6'];
const LEVEL_OPTIONS = ['A1', 'A2', 'B1', 'B2', 'Genel'];

type Props = {
  visible: boolean;
  onClose: () => void;
  onDeckCreated: (newDeck: VocabDeck) => void;
};

export function CreateDeckModal({ visible, onClose, onDeckCreated }: Props) {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('📁');
  const [selectedColor, setSelectedColor] = useState('#4F46E5');
  const [selectedLevel, setSelectedLevel] = useState('A1');
  const [error, setError] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);

  const handleCreate = async () => {
    if (!title.trim()) {
      setError(t("Lütfen klasör adını girin"));
      return;
    }

    const newDeck: VocabDeck = {
      id: `deck_custom_${Date.now()}`,
      title: title.trim(),
      subtitle: subtitle.trim() || t("Özel oluşturulmuş kelime destesi"),
      emoji: selectedEmoji,
      color: selectedColor,
      level: selectedLevel,
      isCustom: true,
      words: [],
      createdAt: new Date().toISOString(),
    };

    await saveCustomDeck(newDeck);
    onDeckCreated(newDeck);
    setTitle('');
    setSubtitle('');
    setError(null);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="formSheet" onRequestClose={onClose}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Image source={minimalFeatureIcons.vocabFolders} style={styles.headerIcon} resizeMode="contain" />
          <View style={{ flex: 1 }}>
            <Text style={styles.headerTitle}>{t("Yeni Klasör")}</Text>
            <Text style={styles.headerSub}>{t("Kendi listeni kur")}</Text>
          </View>
          <BouncyPressable onPress={onClose} style={styles.closeBtn} hapticType="light" scaleTo={0.9}>
            <Ionicons name="close" size={20} color="#64748B" />
          </BouncyPressable>
        </View>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {/* Preview Card */}
          <View style={[styles.previewCard, shadow.card, { borderBottomColor: selectedColor }]}>
            <View style={[styles.previewEmojiBadge, { backgroundColor: `${selectedColor}20` }]}>
              <Text style={styles.previewEmoji}>{selectedEmoji}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.previewTitle} numberOfLines={1}>{title.trim() || t("Klasör Adı...")}</Text>
              <Text style={styles.previewSub} numberOfLines={1}>{subtitle.trim() || t("Özel açıklama...")}</Text>
            </View>
            <View style={[styles.previewLevelBadge, { backgroundColor: selectedColor }]}>
              <Text style={styles.previewLevelText}>{selectedLevel}</Text>
            </View>
          </View>

          {/* Form */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>{t("Klasör Adı *")}</Text>
            <TextInput
              style={[styles.input, focused === 'title' && { borderColor: selectedColor, backgroundColor: '#FFFFFF' }]}
              onFocus={() => setFocused('title')}
              onBlur={() => setFocused(null)}
              placeholder={t("Örn: Mülakat Terimlerim, Renkler & Sayılar")}
              placeholderTextColor="#94A3B8"
              value={title}
              onChangeText={(t) => {
                setTitle(t);
                if (error) setError(null);
              }}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>{t("Kısa Açıklama (İsteğe Bağlı)")}</Text>
            <TextInput
              style={[styles.input, focused === 'sub' && { borderColor: selectedColor, backgroundColor: '#FFFFFF' }]}
              onFocus={() => setFocused('sub')}
              onBlur={() => setFocused(null)}
              placeholder={t("Örn: Haftalık çalışma hedefim")}
              placeholderTextColor="#94A3B8"
              value={subtitle}
              onChangeText={setSubtitle}
            />
          </View>

          {/* Emoji Selection */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>{t("İkon / Emoji Seç")}</Text>
            <View style={styles.chipsRow}>
              {EMOJI_OPTIONS.map((em) => (
                <BouncyPressable
                  key={em}
                  onPress={() => setSelectedEmoji(em)}
                  style={[styles.emojiChip, selectedEmoji === em && { borderColor: selectedColor, backgroundColor: `${selectedColor}18` }]}
                  hapticType="light"
                  scaleTo={0.9}
                >
                  <Text style={styles.emojiChipText}>{em}</Text>
                </BouncyPressable>
              ))}
            </View>
          </View>

          {/* Color Selection */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>{t("Tema Rengi")}</Text>
            <View style={styles.chipsRow}>
              {COLOR_OPTIONS.map((c) => (
                <BouncyPressable
                  key={c}
                  onPress={() => setSelectedColor(c)}
                  style={[styles.colorChip, { backgroundColor: c }, selectedColor === c && styles.colorChipSelected]}
                  hapticType="light"
                  scaleTo={0.9}
                >
                  {selectedColor === c && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
                </BouncyPressable>
              ))}
            </View>
          </View>

          {/* Level Selection */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>{t("Hedef Seviye")}</Text>
            <View style={styles.chipsRow}>
              {LEVEL_OPTIONS.map((lvl) => (
                <BouncyPressable
                  key={lvl}
                  onPress={() => setSelectedLevel(lvl)}
                  style={[styles.levelChip, selectedLevel === lvl && { backgroundColor: selectedColor, borderColor: selectedColor }]}
                  hapticType="light"
                  scaleTo={0.92}
                >
                  <Text style={[styles.levelChipText, selectedLevel === lvl && styles.levelChipTextSelected]}>
                    {lvl === 'Genel' ? t("Genel") : lvl}
                  </Text>
                </BouncyPressable>
              ))}
            </View>
          </View>

          {error ? (
            <View style={styles.errorBox}>
              <Ionicons name="alert-circle" size={16} color="#EF4444" />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          <BouncyPressable onPress={handleCreate} style={[styles.submitBtn, { backgroundColor: selectedColor }]} hapticType="success" scaleTo={0.96}>
            <Ionicons name="folder-open" size={19} color="#FFFFFF" style={{ marginRight: 8 }} />
            <Text style={styles.submitBtnText}>{t("Klasörü Oluştur")}</Text>
          </BouncyPressable>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  errorBox: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#FEF2F2', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 9, marginBottom: 12 },
  previewEmojiBadge: { width: 54, height: 54, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  headerSub: { fontFamily: fonts.bodyRegular, fontSize: 12.5, color: '#64748B', marginTop: 1 },
  headerIcon: { width: 48, height: 48 },
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#EEF2F7' },
  headerTitle: { fontFamily: fonts.headingBold, fontSize: 19, color: '#0F172A' },
  closeBtn: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#F1F5F9', alignItems: 'center', justifyContent: 'center' },
  content: {
    padding: 20,
  },
  previewCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 26, padding: 16, borderWidth: 1, borderColor: '#F1F5F9', borderBottomWidth: 5, marginBottom: 22, gap: 12 },
  previewEmoji: { fontSize: 28 },
  previewTitle: { fontFamily: fonts.headingBold, fontSize: 16.5, color: '#0F172A' },
  previewSub: { fontFamily: fonts.bodyRegular, fontSize: 12.5, color: '#64748B', marginTop: 2 },
  previewLevelBadge: { paddingHorizontal: 9, paddingVertical: 4, borderRadius: 9 },
  previewLevelText: {
    fontFamily: fonts.mono,
    fontSize: 11,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  formGroup: {
    marginBottom: 16,
  },
  label: { fontFamily: fonts.headingBold, fontSize: 12.5, color: '#334155', marginBottom: 7 },
  input: { backgroundColor: '#F8FAFC', borderRadius: 16, borderWidth: 2, borderColor: '#E2E8F0', paddingHorizontal: 14, height: 50, fontFamily: fonts.bodyRegular, fontSize: 14.5, color: '#0F172A' },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  emojiChip: { width: 48, height: 48, borderRadius: 16, backgroundColor: '#FFFFFF', borderWidth: 2, borderColor: '#E2E8F0', alignItems: 'center', justifyContent: 'center' },
  emojiChipSelected: {
    borderColor: colors.brand,
    backgroundColor: '#EEF2FF',
  },
  emojiChipText: {
    fontSize: 22,
  },
  colorChip: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: 'transparent' },
  colorChipSelected: { borderColor: '#FFFFFF', shadowColor: '#0F172A', shadowOpacity: 0.35, shadowRadius: 4, shadowOffset: { width: 0, height: 1 }, elevation: 4 },
  levelChip: { paddingHorizontal: 16, paddingVertical: 9, borderRadius: radii.pill, backgroundColor: '#FFFFFF', borderWidth: 2, borderColor: '#E2E8F0' },
  levelChipSelected: {
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
  },
  levelChipText: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 12,
    color: '#475569',
  },
  levelChipTextSelected: {
    color: '#FFFFFF',
  },
  errorText: { flex: 1, fontFamily: fonts.bodyMedium, fontSize: 12.5, color: '#DC2626' },
  submitBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 15, borderRadius: radii.pill, marginTop: 8, borderBottomWidth: 4, borderBottomColor: 'rgba(0,0,0,0.25)' },
  submitBtnText: { fontFamily: fonts.headingBold, fontSize: 15, color: '#FFFFFF', letterSpacing: 0.3 },
});
