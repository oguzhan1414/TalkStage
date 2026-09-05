import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { saveCustomDeck, type VocabDeck } from '../data/vocabDecks';
import { colors, fonts, radii, shadow } from '../theme/tokens';
import { BouncyPressable } from './BouncyPressable';

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

  const handleCreate = async () => {
    if (!title.trim()) {
      setError('Lütfen klasör adını girin');
      return;
    }

    const newDeck: VocabDeck = {
      id: `deck_custom_${Date.now()}`,
      title: title.trim(),
      subtitle: subtitle.trim() || 'Özel oluşturulmuş kelime destesi',
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
          <Text style={styles.headerTitle}>➕ Yeni Klasör / Deste Oluştur</Text>
          <BouncyPressable onPress={onClose} style={styles.closeBtn} hapticType="light" scaleTo={0.9}>
            <Ionicons name="close" size={22} color="#64748B" />
          </BouncyPressable>
        </View>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {/* Preview Card */}
          <View style={[styles.previewCard, shadow.card, { borderColor: selectedColor }]}>
            <Text style={styles.previewEmoji}>{selectedEmoji}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.previewTitle}>{title.trim() || 'Klasör Adı...'}</Text>
              <Text style={styles.previewSub}>{subtitle.trim() || 'Özel açıklama...'}</Text>
            </View>
            <View style={[styles.previewLevelBadge, { backgroundColor: selectedColor }]}>
              <Text style={styles.previewLevelText}>{selectedLevel}</Text>
            </View>
          </View>

          {/* Form */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Klasör Adı *</Text>
            <TextInput
              style={styles.input}
              placeholder="Örn: Mülakat Terimlerim, Renkler & Sayılar"
              placeholderTextColor="#94A3B8"
              value={title}
              onChangeText={(t) => {
                setTitle(t);
                if (error) setError(null);
              }}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Kısa Açıklama (İsteğe Bağlı)</Text>
            <TextInput
              style={styles.input}
              placeholder="Örn: Haftalık çalışma hedefim"
              placeholderTextColor="#94A3B8"
              value={subtitle}
              onChangeText={setSubtitle}
            />
          </View>

          {/* Emoji Selection */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>İkon / Emoji Seç</Text>
            <View style={styles.chipsRow}>
              {EMOJI_OPTIONS.map((em) => (
                <BouncyPressable
                  key={em}
                  onPress={() => setSelectedEmoji(em)}
                  style={[styles.emojiChip, selectedEmoji === em && styles.emojiChipSelected]}
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
            <Text style={styles.label}>Tema Rengi</Text>
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
            <Text style={styles.label}>Hedef Seviye</Text>
            <View style={styles.chipsRow}>
              {LEVEL_OPTIONS.map((lvl) => (
                <BouncyPressable
                  key={lvl}
                  onPress={() => setSelectedLevel(lvl)}
                  style={[styles.levelChip, selectedLevel === lvl && styles.levelChipSelected]}
                  hapticType="light"
                  scaleTo={0.92}
                >
                  <Text style={[styles.levelChipText, selectedLevel === lvl && styles.levelChipTextSelected]}>
                    {lvl}
                  </Text>
                </BouncyPressable>
              ))}
            </View>
          </View>

          {error && <Text style={styles.errorText}>{error}</Text>}

          <BouncyPressable onPress={handleCreate} style={[styles.submitBtn, shadow.card]} hapticType="success" scaleTo={0.96}>
            <Ionicons name="folder-outline" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
            <Text style={styles.submitBtnText}>Klasörü Oluştur</Text>
          </BouncyPressable>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 16,
    color: '#0F172A',
  },
  closeBtn: {
    padding: 6,
    borderRadius: radii.pill,
    backgroundColor: '#F1F5F9',
  },
  content: {
    padding: 20,
  },
  previewCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1.5,
    marginBottom: 20,
    gap: 12,
  },
  previewEmoji: {
    fontSize: 32,
  },
  previewTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 15,
    color: '#0F172A',
  },
  previewSub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  previewLevelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radii.pill,
  },
  previewLevelText: {
    fontFamily: fonts.mono,
    fontSize: 11,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 12.5,
    color: '#334155',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1.2,
    borderColor: '#CBD5E1',
    paddingHorizontal: 14,
    height: 46,
    fontFamily: fonts.bodyRegular,
    fontSize: 13.5,
    color: '#0F172A',
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  emojiChip: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emojiChipSelected: {
    borderColor: colors.brand,
    backgroundColor: '#EEF2FF',
  },
  emojiChipText: {
    fontSize: 22,
  },
  colorChip: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorChipSelected: {
    borderWidth: 3,
    borderColor: '#0F172A',
  },
  levelChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
  },
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
  errorText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: '#EF4444',
    marginBottom: 12,
  },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.brand,
    paddingVertical: 14,
    borderRadius: 14,
    marginTop: 8,
  },
  submitBtnText: {
    fontFamily: fonts.headingBold,
    fontSize: 14.5,
    color: '#FFFFFF',
  },
});
