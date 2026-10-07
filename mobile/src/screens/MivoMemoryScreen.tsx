import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { mivoImages } from '../assets/images';
import { MivoLoader } from '../components/MivoLoader';
import { Toast } from '../components/Toast';
import { t } from '../i18n';
import { api } from '../lib/api';
import type { MivoMemoryScreenProps } from '../navigation/types';
import { colors, fonts, radii, spacing } from '../theme/tokens';
import type { ChatMemory } from '../types/api';

/** "Mivo'nun Hatırladıkları" — serbest sohbetlerden çıkarılan özet, konular ve kişisel
 * detaylar. Kullanıcı yanlış maddeyi çıkarabilir veya hepsini silebilir. */
export function MivoMemoryScreen({ navigation }: MivoMemoryScreenProps) {
  const queryClient = useQueryClient();
  const [toast, setToast] = useState<string | null>(null);

  const { data: memory, isLoading } = useQuery({
    queryKey: ['chat-memory'],
    queryFn: () => api.get<ChatMemory>('/memory'),
  });

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 1600);
  };

  const factsMutation = useMutation({
    mutationFn: (facts: string[]) => api.patch<ChatMemory>('/memory/facts', { facts }),
    onSuccess: (updated) => queryClient.setQueryData(['chat-memory'], updated),
    onError: () => showToast(t("İşlem başarısız oldu")),
  });

  const clearMutation = useMutation({
    mutationFn: () => api.delete('/memory'),
    onSuccess: () => {
      queryClient.setQueryData(['chat-memory'], {
        summary: '',
        topics: [],
        facts: [],
        session_count: 0,
        last_session_at: null,
      } satisfies ChatMemory);
      showToast(t("Mivo her şeyi unuttu"));
    },
    onError: () => showToast(t("İşlem başarısız oldu")),
  });

  const confirmClear = () => {
    Alert.alert(
      t("Hepsini unut?"),
      t("Mivo bu sohbetlerden öğrendiği her şeyi unutacak. Bu geri alınamaz."),
      [
        { text: t("Vazgeç"), style: 'cancel' },
        { text: t("Unut"), style: 'destructive', onPress: () => clearMutation.mutate() },
      ]
    );
  };

  const hasMemory = Boolean(memory && (memory.summary || memory.topics.length || memory.facts.length));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
          <Ionicons name="chevron-back" size={24} color={colors.textHeading} />
        </Pressable>
        <Text style={styles.title}>{t("Mivo'nun Hatırladıkları")}</Text>
        <View style={{ width: 24 }} />
      </View>

      {isLoading ? (
        <View style={styles.center}>
          <MivoLoader />
        </View>
      ) : !hasMemory ? (
        <View style={styles.center}>
          <Image source={mivoImages.idle} style={styles.emptyImage} resizeMode="contain" />
          <Text style={styles.emptyTitle}>{t("Henüz bir şey hatırlamıyorum")}</Text>
          <Text style={styles.emptyText}>
            {t("Mivo ile serbest sohbet ettikçe konuştuklarımızı burada göreceksin.")}
          </Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.content}>
          {memory!.summary ? (
            <View style={styles.card}>
              <Text style={styles.cardLabel}>{t("Genel olarak")}</Text>
              <Text style={styles.summary}>{memory!.summary}</Text>
            </View>
          ) : null}

          {memory!.topics.length > 0 ? (
            <View style={styles.card}>
              <Text style={styles.cardLabel}>{t("Konuştuğumuz konular")}</Text>
              <View style={styles.chipRow}>
                {memory!.topics.map((topic, i) => (
                  <View key={`${topic.topic}-${i}`} style={styles.chip}>
                    <Text style={styles.chipText}>{topic.topic}</Text>
                  </View>
                ))}
              </View>
            </View>
          ) : null}

          {memory!.facts.length > 0 ? (
            <View style={styles.card}>
              <Text style={styles.cardLabel}>{t("Senin hakkında bildiklerim")}</Text>
              {memory!.facts.map((fact, i) => (
                <View key={`${fact}-${i}`} style={styles.factRow}>
                  <Text style={styles.factText}>{fact}</Text>
                  <Pressable
                    hitSlop={10}
                    onPress={() => factsMutation.mutate(memory!.facts.filter((_, idx) => idx !== i))}
                    accessibilityLabel={t("Bu bilgiyi sil")}
                  >
                    <Ionicons name="close-circle-outline" size={20} color={colors.textMuted} />
                  </Pressable>
                </View>
              ))}
              <Text style={styles.note}>{t("Yanlış bir şey varsa silebilirsin.")}</Text>
            </View>
          ) : null}

          <Pressable onPress={confirmClear} style={styles.clearBtn} disabled={clearMutation.isPending}>
            <Ionicons name="trash-outline" size={16} color={colors.error} />
            <Text style={styles.clearText}>{t("Hepsini unut")}</Text>
          </Pressable>
        </ScrollView>
      )}
      {toast ? <Toast message={toast} /> : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  title: { fontFamily: fonts.headingBold, fontSize: 18, color: colors.textHeading },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.lg, gap: 8 },
  emptyImage: { width: 120, height: 120 },
  emptyTitle: { fontFamily: fonts.headingBold, fontSize: 17, color: colors.textHeading },
  emptyText: { fontFamily: fonts.bodyRegular, fontSize: 14, color: colors.textBody, textAlign: 'center' },
  content: { padding: spacing.md, gap: spacing.md, paddingBottom: 40 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: spacing.md,
    gap: 8,
  },
  cardLabel: { fontFamily: fonts.headingSemiBold, fontSize: 13, color: colors.brand },
  summary: { fontFamily: fonts.bodyRegular, fontSize: 15, lineHeight: 15 * 1.55, color: colors.textBody },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { backgroundColor: '#EEF2FF', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 6 },
  chipText: { fontFamily: fonts.bodyMedium, fontSize: 13, color: colors.brand },
  factRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  factText: { flex: 1, fontFamily: fonts.bodyRegular, fontSize: 14, color: colors.textBody },
  note: { fontFamily: fonts.bodyRegular, fontSize: 12, color: colors.textMuted },
  clearBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
  },
  clearText: { fontFamily: fonts.bodyMedium, fontSize: 14, color: colors.error },
});
