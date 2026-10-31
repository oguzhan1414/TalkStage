import Ionicons from '@expo/vector-icons/Ionicons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { minimalFeatureIcons } from '../assets/images';
import { MivoLoader } from '../components/MivoLoader';
import { ScreenHeader } from '../components/ScreenHeader';
import { Toast } from '../components/Toast';
import { t } from '../i18n';
import { api, ApiError } from '../lib/api';
import { levelGroups, levelLabel, migrateLocalFolders, tagGroups, type VocabFocus } from '../lib/vocabGroups';
import type { VocabDecksScreenProps } from '../navigation/types';
import { colors, fonts, spacing } from '../theme/tokens';
import type { VocabCardOut, VocabCardUpdate } from '../types/api';

/**
 * "Gruplarım": the word bank grouped by level (automatic; lesson words carry their path level) and by the learner's
 * own tags. Every group opens in the Vocab tab, either as a list or as a practice with the same SM-2 review.
 * Tags are set on a word from Sandığım (tap a word → Etiketle) or in the add-word form.
 * (Route name stays 'VocabDecks': the old phone-only folders lived here and move into tags once.)
 */
export function VocabDecksScreen({ navigation }: VocabDecksScreenProps) {
  const queryClient = useQueryClient();
  const { data: cards, isLoading } = useQuery({
    queryKey: ['vocab-cards', 'all'],
    queryFn: () => api.get<VocabCardOut[]>('/vocab-cards?all=true'),
  });
  const [toast, setToastText] = useState<string | null>(null);
  const setToast = (msg: string) => {
    setToastText(msg);
    setTimeout(() => setToastText(null), 2200);
  };

  useEffect(() => {
    migrateLocalFolders().then((changed) => {
      if (changed) queryClient.invalidateQueries({ queryKey: ['vocab-cards'] });
    });
  }, [queryClient]);

  const levels = useMemo(() => levelGroups(cards ?? []), [cards]);
  const tags = useMemo(() => tagGroups(cards ?? []), [cards]);

  const open = (focus: VocabFocus, how: 'practice' | 'browse') =>
    navigation.navigate('Main', { screen: 'Vocab', params: how === 'practice' ? { practice: focus } : { browse: focus } });

  const removeTag = (tag: string) => {
    Alert.alert(t("“{{tag}}” etiketi kaldırılsın mı?", { tag }), t("Kelimeler sandığında kalır, sadece bu etiket silinir."), [
      { text: t("Vazgeç"), style: 'cancel' },
      {
        text: t("Kaldır"),
        style: 'destructive',
        onPress: async () => {
          try {
            const tagged = (cards ?? []).filter((c) => (c.tags ?? []).some((x) => x.toLowerCase() === tag.toLowerCase()));
            await Promise.all(
              tagged.map((c) =>
                api.patch(`/vocab-cards/${c.id}`, { tags: (c.tags ?? []).filter((x) => x.toLowerCase() !== tag.toLowerCase()) } satisfies VocabCardUpdate)
              )
            );
            await queryClient.invalidateQueries({ queryKey: ['vocab-cards'] });
            setToast(t("“{{tag}}” etiketi kaldırıldı", { tag }));
          } catch (err) {
            setToast(err instanceof ApiError ? err.message : t("Etiket kaldırılamadı."));
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title={t("Gruplarım")}
        subtitle={t("{{count}} kelime", { count: cards?.length ?? 0 })}
        icon={minimalFeatureIcons.vocabFolders}
        onBack={() => navigation.goBack()}
      />

      {isLoading && !cards ? (
        <MivoLoader size={90} label={t("Kelimelerin yükleniyor…")} style={{ marginTop: 40 }} />
      ) : (
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <Text style={styles.section}>{t("Seviyeye göre")}</Text>
          {levels.length === 0 ? (
            <Text style={styles.empty}>{t("Henüz kelimen yok. Derslerde ve kütüphanede eklediğin kelimeler burada seviyelerine göre toplanır.")}</Text>
          ) : (
            <View style={styles.levelGrid}>
              {levels.map(({ level, count }) => (
                <View key={level} style={styles.levelCard}>
                  <Pressable onPress={() => open({ kind: 'level', value: level }, 'browse')} style={styles.levelTop} accessibilityRole="button">
                    <Text style={styles.levelCode}>{levelLabel(level)}</Text>
                    <Text style={styles.levelCount}>{t("{{count}} kelime", { count })}</Text>
                  </Pressable>
                  <Pressable onPress={() => open({ kind: 'level', value: level }, 'practice')} style={styles.levelPlay} accessibilityRole="button" accessibilityLabel={t("Çalış")}>
                    <Ionicons name="play" size={14} color="#FFFFFF" />
                    <Text style={styles.levelPlayText}>{t("Çalış")}</Text>
                  </Pressable>
                </View>
              ))}
            </View>
          )}

          <Text style={styles.section}>{t("Etiketlerim")}</Text>
          {tags.length === 0 ? (
            <View style={styles.hintCard}>
              <Ionicons name="pricetags-outline" size={22} color={colors.brand} />
              <Text style={styles.hintText}>
                {t("Kelimelerini kendi gruplarına ayır: Sandığım'da bir kelimeye dokun ve Etiketle'yi seç. Seyahat, İş, Mutfak… ne istersen.")}
              </Text>
            </View>
          ) : (
            <View style={styles.card}>
              {tags.map(({ tag, count }, i) => (
                <View key={tag}>
                  {i > 0 ? <View style={styles.divider} /> : null}
                  <View style={styles.tagRow}>
                    <Pressable onPress={() => open({ kind: 'tag', value: tag }, 'browse')} style={styles.tagMain} accessibilityRole="button">
                      <View style={styles.tagIcon}>
                        <Ionicons name="pricetag" size={16} color={colors.brand} />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.tagName} numberOfLines={1}>
                          {tag}
                        </Text>
                        <Text style={styles.tagCount}>{t("{{count}} kelime", { count })}</Text>
                      </View>
                    </Pressable>
                    <Pressable onPress={() => open({ kind: 'tag', value: tag }, 'practice')} style={styles.tagPlay} accessibilityRole="button">
                      <Ionicons name="play" size={13} color="#FFFFFF" />
                      <Text style={styles.levelPlayText}>{t("Çalış")}</Text>
                    </Pressable>
                    <Pressable onPress={() => removeTag(tag)} hitSlop={10} style={styles.tagMore} accessibilityRole="button" accessibilityLabel={t("Etiketi kaldır")}>
                      <Ionicons name="trash-outline" size={18} color={colors.textMuted} />
                    </Pressable>
                  </View>
                </View>
              ))}
            </View>
          )}
          <Text style={styles.footnote}>{t("Bir grubu çalışınca kelimeler günlük tekrardaki gibi ilerler; ayrı bir ilerleme yok.")}</Text>
        </ScrollView>
      )}
      {toast ? <Toast message={toast} /> : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  scroll: { paddingHorizontal: spacing.md, paddingBottom: 40, gap: 12 },
  section: { fontFamily: fonts.headingBold, fontSize: 13, letterSpacing: 0.8, color: colors.textMuted, textTransform: 'uppercase', marginTop: 8, marginLeft: 4 },
  empty: { fontFamily: fonts.bodyRegular, fontSize: 13.5, lineHeight: 19, color: colors.textMuted, paddingHorizontal: 4 },
  levelGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  levelCard: { width: '31.5%', backgroundColor: '#FFFFFF', borderRadius: 18, padding: 10, gap: 8, borderWidth: 1, borderColor: '#EEF2FF' },
  levelTop: { gap: 1 },
  levelCode: { fontFamily: fonts.headingBold, fontSize: 20, color: colors.textHeading },
  levelCount: { fontFamily: fonts.bodyMedium, fontSize: 12, color: colors.textMuted },
  levelPlay: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, backgroundColor: colors.brand, borderRadius: 999, paddingVertical: 6 },
  levelPlayText: { fontFamily: fonts.headingBold, fontSize: 12.5, color: '#FFFFFF' },
  hintCard: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, backgroundColor: '#EEF2FF', borderRadius: 18, padding: 14 },
  hintText: { flex: 1, fontFamily: fonts.bodyRegular, fontSize: 13.5, lineHeight: 19, color: colors.textBody },
  card: { backgroundColor: '#FFFFFF', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 6 },
  divider: { height: 1, backgroundColor: '#F1F5F9', marginLeft: 44 },
  tagRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 10 },
  tagMain: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 },
  tagIcon: { width: 34, height: 34, borderRadius: 12, backgroundColor: '#EEF2FF', alignItems: 'center', justifyContent: 'center' },
  tagName: { fontFamily: fonts.headingSemiBold, fontSize: 15.5, color: colors.textHeading },
  tagCount: { fontFamily: fonts.bodyRegular, fontSize: 12.5, color: colors.textMuted },
  tagPlay: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: colors.brand, borderRadius: 999, paddingVertical: 6, paddingHorizontal: 12 },
  tagMore: { padding: 4 },
  footnote: { fontFamily: fonts.bodyRegular, fontSize: 12, lineHeight: 17, color: colors.textMuted, textAlign: 'center', marginTop: 8 },
});
