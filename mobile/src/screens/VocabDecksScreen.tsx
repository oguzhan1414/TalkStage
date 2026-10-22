import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';
import { Image, Alert, ScrollView, StyleSheet, Text, View } from 'react-native';

import { BouncyPressable } from '../components/BouncyPressable';
import { CreateDeckModal } from '../components/CreateDeckModal';
import { DeckStudyModal } from '../components/DeckStudyModal';
import { Toast } from '../components/Toast';
import { minimalFeatureIcons } from '../assets/images';
import { ScreenHeader } from '../components/ScreenHeader';
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
      <View key={deck.id} style={[styles.deckCard, shadow.card, { borderBottomColor: deck.color }]}>
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
          style={[styles.deckStartBtn, { backgroundColor: deck.color }]}
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
      <ScreenHeader
        title={t("Klasörler")}
        subtitle={t("{{length}}/{{MAX_CUSTOM_DECKS}} klasör · Kendi başlıklarınla grupla", { length: customDecks.length, MAX_CUSTOM_DECKS })}
        icon={minimalFeatureIcons.vocabFolders}
        onBack={() => navigation.goBack()}
        right={
          <BouncyPressable
            onPress={handleOpenCreateDeck}
            style={[styles.createBtn, isCapReached && styles.createBtnDisabled]}
            hapticType="medium"
            scaleTo={0.94}
          >
            <Ionicons name="add" size={16} color="#FFFFFF" />
            <Text style={styles.createBtnText}>{t("Yeni Klasör")}</Text>
          </BouncyPressable>
        }
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {customDecks.length > 0 ? (
          <View style={styles.decksGrid}>{customDecks.map(renderDeckCard)}</View>
        ) : (
          <View style={styles.emptyBox}>
            <Image source={minimalFeatureIcons.vocabFolders} style={styles.emptyArt} resizeMode="contain" />
            <Text style={styles.emptyTitle}>{t("Henüz klasörün yok")}</Text>
            <Text style={styles.emptyText}>{t("Ör. \"Mülakat Terimlerim\" gibi kendi temanı oluşturup istediğin kelimeleri içine topla.")}</Text>
            <BouncyPressable onPress={handleOpenCreateDeck} style={[styles.emptyCta, isCapReached && styles.createBtnDisabled]} hapticType="medium" scaleTo={0.95}>
              <Ionicons name="add" size={18} color="#FFFFFF" />
              <Text style={styles.emptyCtaText}>{t("Yeni Klasör")}</Text>
            </BouncyPressable>
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
  emptyCtaText: { fontFamily: fonts.headingBold, fontSize: 14.5, color: '#FFFFFF' },
  emptyCta: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: colors.brand, borderRadius: radii.pill, paddingVertical: 13, paddingHorizontal: 26, marginTop: 8, borderBottomWidth: 4, borderBottomColor: '#3730A3' },
  emptyTitle: { fontFamily: fonts.headingBold, fontSize: 19, color: colors.textHeading },
  emptyArt: { width: 150, height: 150, marginBottom: 4 },
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  createBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: colors.brand, paddingLeft: 10, paddingRight: 14, paddingVertical: 9, borderRadius: radii.pill, borderBottomWidth: 3, borderBottomColor: '#3730A3' },
  createBtnDisabled: { backgroundColor: '#CBD5E1' },
  createBtnText: { fontFamily: fonts.headingBold, fontSize: 12.5, color: '#FFFFFF' },
  content: { paddingHorizontal: spacing.md, paddingTop: 4, paddingBottom: 60 },
  decksGrid: { gap: 14 },
  emptyBox: { backgroundColor: '#FFFFFF', borderRadius: 28, borderWidth: 1, borderColor: '#EEF2FF', paddingVertical: 28, paddingHorizontal: 22, alignItems: 'center', gap: 8, marginTop: 6 },
  emptyText: { fontFamily: fonts.bodyRegular, fontSize: 13.5, color: '#64748B', lineHeight: 20, textAlign: 'center' },
  deckCard: { backgroundColor: '#FFFFFF', borderRadius: 26, padding: 18, borderWidth: 1, borderColor: '#F1F5F9', borderBottomWidth: 5 },
  deckCardTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  deckEmojiBadge: { width: 54, height: 54, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  deckEmoji: { fontSize: 28 },
  deckTitle: { fontFamily: fonts.headingBold, fontSize: 16.5, color: '#0F172A' },
  deckSub: { fontFamily: fonts.bodyRegular, fontSize: 12.5, color: '#64748B', marginTop: 2 },
  deckLevelPill: { paddingHorizontal: 9, paddingVertical: 4, borderRadius: 9 },
  deckLevelPillText: { fontFamily: fonts.mono, fontSize: 10, fontWeight: 'bold', color: '#FFFFFF' },
  deckDeleteBtn: { padding: 6, marginLeft: 6 },
  deckProgressArea: { marginTop: 14, marginBottom: 14 },
  deckProgressLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  deckWordCount: { fontFamily: fonts.headingSemiBold, fontSize: 12, color: '#475569' },
  deckPercent: { fontFamily: fonts.mono, fontSize: 10.5, color: '#64748B' },
  deckBarTrack: { height: 9, backgroundColor: '#F1F5F9', borderRadius: 5, overflow: 'hidden' },
  deckBarFill: { height: '100%', borderRadius: 5 },
  deckStartBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 13, borderRadius: radii.pill },
  deckStartBtnText: { fontFamily: fonts.headingBold, fontSize: 14, color: '#FFFFFF', letterSpacing: 0.3 },
});
