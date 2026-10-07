import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { BouncyPressable } from '../components/BouncyPressable';
import { CreateDeckModal } from '../components/CreateDeckModal';
import { DeckStudyModal } from '../components/DeckStudyModal';
import { Toast } from '../components/Toast';
import {
  deleteCustomDeck,
  getDeckMasteredWordIds,
  loadAllDecks,
  type VocabDeck,
  type VocabDeckWord,
} from '../data/vocabDecks';
import { api, ApiError } from '../lib/api';
import type { VocabDecksScreenProps } from '../navigation/types';
import { colors, fonts, radii, shadow, spacing } from '../theme/tokens';
import type { VocabCardCreate, VocabCardOut } from '../types/api';
import { t } from '../i18n';

// Klasör sayısına makul bir tavan — sınırsız klasör açılabilmesi ızgarayı
// hızla anlamsız bir yığına çeviriyordu.
const MAX_CUSTOM_DECKS = 12;

/**
 * "Kelime Klasörlerim" — kullanıcının kendi oluşturduğu kelime klasörleri.
 * Eskiden Kelimeler sekmesinin içindeki 3 sekmeden biriydi; Kelimeler sekmesi
 * sadece kişisel (Akıllı Pratik + Sözlüğüm) kalsın diye Özellikler'e taşındı.
 * Klasör pratiği SM-2'den bağımsız; bir kelimeyi gerçek Sandığa taşımak için
 * `DeckStudyModal`'daki "Sandığa Ekle" butonu kullanılıyor.
 */
export function VocabDecksScreen({ navigation }: VocabDecksScreenProps) {
  const queryClient = useQueryClient();

  const { data: allCards } = useQuery({
    queryKey: ['vocab-cards', 'all'],
    queryFn: () => api.get<VocabCardOut[]>('/vocab-cards?all=true'),
  });
  const savedTermsLower = useMemo(
    () => new Set((allCards ?? []).map((c) => c.term.trim().toLowerCase())),
    [allCards]
  );

  const [customDecks, setCustomDecks] = useState<VocabDeck[]>([]);
  const [deckMasteryMap, setDeckMasteryMap] = useState<Record<string, number>>({});
  const [selectedStudyDeck, setSelectedStudyDeck] = useState<VocabDeck | null>(null);
  const [createDeckVisible, setCreateDeckVisible] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  const loadDecksAndMastery = useCallback(async () => {
    const decks = await loadAllDecks();
    setCustomDecks(decks);
    const map: Record<string, number> = {};
    for (const d of decks) {
      const masteredIds = await getDeckMasteredWordIds(d.id);
      map[d.id] = masteredIds.length;
    }
    setDeckMasteryMap(map);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadDecksAndMastery();
    }, [loadDecksAndMastery])
  );

  const isCapReached = customDecks.length >= MAX_CUSTOM_DECKS;

  const handleOpenCreateDeck = () => {
    if (isCapReached) {
      showToast(t("En fazla {{MAX_CUSTOM_DECKS}} klasör oluşturabilirsin — önce birini silip yer aç 📁", { MAX_CUSTOM_DECKS }));
      return;
    }
    setCreateDeckVisible(true);
  };

  const handleDeleteDeck = (deckId: string) => {
    Alert.alert(t("Klasörü Sil"), t("Bu klasörü silmek istediğine emin misin?"), [
      { text: t("İptal"), style: 'cancel' },
      {
        text: t("Sil"),
        style: 'destructive',
        onPress: async () => {
          const updated = await deleteCustomDeck(deckId);
          setCustomDecks(updated);
          showToast(t("Klasör silindi 🗑️"));
        },
      },
    ]);
  };

  // Klasördeki bir kelimeyi gerçek SM-2 kuyruğuna (Sandık) taşır.
  const handleAddDeckWordToChest = async (word: VocabDeckWord): Promise<boolean> => {
    try {
      const payload: VocabCardCreate = {
        term: word.term,
        translation: word.translation,
        example_sentence: word.exampleEn || undefined,
        part_of_speech: word.pos,
        cefr_level: word.level,
        source_label: t("Klasör Pratiği 📁"),
      };
      await api.post<VocabCardOut>('/vocab-cards', payload);
      await queryClient.invalidateQueries({ queryKey: ['vocab-cards'] });
      await queryClient.invalidateQueries({ queryKey: ['vocab-cards', 'all'] });
      showToast(t("\"{{term}}\" Sandığına eklendi! 📦✨", { term: word.term }));
      return true;
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : t("Kelime eklenemedi."));
      return false;
    }
  };

  const renderDeckCard = (deck: VocabDeck) => {
    const total = deck.words.length;
    const mastered = deckMasteryMap[deck.id] || 0;
    const percent = total > 0 ? Math.min(100, Math.round((mastered / total) * 100)) : 0;

    return (
      <View key={deck.id} style={[styles.deckCard, shadow.card, { borderColor: deck.color }]}>
        <View style={styles.deckCardTop}>
          <View style={[styles.deckEmojiBadge, { backgroundColor: `${deck.color}18` }]}>
            <Text style={styles.deckEmoji}>{deck.emoji}</Text>
          </View>
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.deckTitle} numberOfLines={1}>{deck.title}</Text>
            <Text style={styles.deckSub} numberOfLines={1}>{deck.subtitle}</Text>
          </View>
          <View style={[styles.deckLevelPill, { backgroundColor: deck.color }]}>
            <Text style={styles.deckLevelPillText}>{deck.level}</Text>
          </View>
          {deck.isCustom && (
            <BouncyPressable
              onPress={() => handleDeleteDeck(deck.id)}
              style={styles.deckDeleteBtn}
              hapticType="warning"
              scaleTo={0.88}
            >
              <Ionicons name="trash-outline" size={15} color="#EF4444" />
            </BouncyPressable>
          )}
        </View>

        <View style={styles.deckProgressArea}>
          <View style={styles.deckProgressLabelRow}>
            <Text style={styles.deckWordCount}>{t("{{total}} Kelime", { total })}</Text>
            <Text style={styles.deckPercent}>{t("{{mastered}}/{{total}} Öğrenildi • %{{percent}}", { mastered, total, percent })}</Text>
          </View>
          <View style={styles.deckBarTrack}>
            <View
              style={[styles.deckBarFill, { width: `${Math.max(6, percent)}%`, backgroundColor: deck.color }]}
            />
          </View>
        </View>

        <BouncyPressable
          onPress={() => setSelectedStudyDeck(deck)}
          style={[styles.deckStartBtn, { backgroundColor: deck.color }, shadow.card]}
          hapticType="medium"
          scaleTo={0.96}
        >
          <Text style={styles.deckStartBtnText}>{t("Pratiğe Başla ➔")}</Text>
        </BouncyPressable>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={20} color={colors.textHeading} />
        </Pressable>
        <View style={styles.headerTitleCol}>
          <Text style={styles.headerTitle}>{t("Kelime Klasörlerim")}</Text>
          <Text style={styles.headerSub}>{t("{{length}}/{{MAX_CUSTOM_DECKS}} klasör · Kendi başlıklarınla grupla", { length: customDecks.length, MAX_CUSTOM_DECKS })}</Text>
        </View>
        <BouncyPressable
          onPress={handleOpenCreateDeck}
          style={[styles.createBtn, shadow.card, isCapReached && styles.createBtnDisabled]}
          hapticType="medium"
          scaleTo={0.94}
        >
          <Ionicons name="add" size={15} color="#FFFFFF" style={{ marginRight: 4 }} />
          <Text style={styles.createBtnText}>{t("Yeni Klasör")}</Text>
        </BouncyPressable>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {customDecks.length > 0 ? (
          <View style={styles.decksGrid}>{customDecks.map(renderDeckCard)}</View>
        ) : (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyEmoji}>📁</Text>
            <Text style={styles.emptyText}>{t("Henüz klasörün yok. Ör. \"Mülakat Terimlerim\" gibi kendi temanı oluşturup istediğin kelimeleri içine topla.")}</Text>
          </View>
        )}
      </ScrollView>

      <DeckStudyModal
        visible={!!selectedStudyDeck}
        deck={selectedStudyDeck}
        onClose={() => {
          setSelectedStudyDeck(null);
          loadDecksAndMastery();
        }}
        onDeckCompleted={() => {
          loadDecksAndMastery();
          showToast(t("🎉 Klasör tamamlandı!"));
        }}
        savedTermsLower={savedTermsLower}
        onAddToChest={handleAddDeckWordToChest}
      />

      <CreateDeckModal
        visible={createDeckVisible}
        onClose={() => setCreateDeckVisible(false)}
        onDeckCreated={(d) => {
          loadDecksAndMastery();
          showToast(t("\"{{title}}\" klasörü oluşturuldu! 📁", { title: d.title }));
        }}
      />

      {toast && <Toast message={toast} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: radii.pill,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleCol: { flex: 1, marginLeft: 12, marginRight: 8 },
  headerTitle: { fontFamily: fonts.headingBold, fontSize: 16.5, color: colors.textHeading },
  headerSub: { fontFamily: fonts.bodyRegular, fontSize: 11, color: colors.textMuted, marginTop: 1 },
  createBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.brand,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radii.pill,
  },
  createBtnDisabled: { backgroundColor: '#CBD5E1' },
  createBtnText: { fontFamily: fonts.headingSemiBold, fontSize: 11, color: '#FFFFFF' },
  content: { padding: spacing.md, paddingBottom: 60 },
  decksGrid: { gap: 12 },
  emptyBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
    padding: 24,
    alignItems: 'center',
  },
  emptyEmoji: { fontSize: 36, marginBottom: 8 },
  emptyText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12.5,
    color: '#64748B',
    lineHeight: 18,
    textAlign: 'center',
  },
  deckCard: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 16, borderWidth: 1.5 },
  deckCardTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  deckEmojiBadge: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  deckEmoji: { fontSize: 24 },
  deckTitle: { fontFamily: fonts.headingBold, fontSize: 15, color: '#0F172A' },
  deckSub: { fontFamily: fonts.bodyRegular, fontSize: 11.5, color: '#64748B', marginTop: 2 },
  deckLevelPill: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  deckLevelPillText: { fontFamily: fonts.mono, fontSize: 10, fontWeight: 'bold', color: '#FFFFFF' },
  deckDeleteBtn: { padding: 6, marginLeft: 6 },
  deckProgressArea: { marginVertical: 12 },
  deckProgressLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  deckWordCount: { fontFamily: fonts.headingSemiBold, fontSize: 11, color: '#475569' },
  deckPercent: { fontFamily: fonts.mono, fontSize: 10.5, color: '#64748B' },
  deckBarTrack: { height: 6, backgroundColor: '#F1F5F9', borderRadius: 3, overflow: 'hidden' },
  deckBarFill: { height: '100%', borderRadius: 3 },
  deckStartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 12,
  },
  deckStartBtnText: { fontFamily: fonts.headingBold, fontSize: 13, color: '#FFFFFF' },
});
