import Ionicons from '@expo/vector-icons/Ionicons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { vocabArt } from '../assets/images';
import { VP } from '../theme/vocabPalette';

/** Group colours, in turn: the word-type colours (mint, coral, sun, sky). */
const GROUP_TINTS = [
  { color: VP.mintDeep, soft: VP.mintSoft, bar: VP.mint },
  { color: VP.coralDeep, soft: VP.coralSoft, bar: VP.coral },
  { color: VP.sunDeep, soft: VP.sunSoft, bar: VP.sun },
  { color: VP.skyDeep, soft: VP.skySoft, bar: VP.sky },
];
import { MivoLoader } from '../components/MivoLoader';
import { ScreenHeader } from '../components/ScreenHeader';
import { Toast } from '../components/Toast';
import { t } from '../i18n';
import { api, ApiError } from '../lib/api';
import { pathLevelName } from '../lib/pathLevel';
import { inFocus, levelGroups, migrateLocalFolders, NO_LEVEL, tagGroups, type VocabFocus } from '../lib/vocabGroups';
import type { VocabDecksScreenProps } from '../navigation/types';
import { colors, fonts, spacing } from '../theme/tokens';
import type { VocabCardOut, VocabCardUpdate } from '../types/api';

/** The warm floor shared with the home, the lessons and the profile. */
const FLOOR = '#FBF7F1';

/** Share of a group's words that are settled for good (SM-2 interval of a month or more). */
const solidShare = (cards: VocabCardOut[]) => (cards.length ? cards.filter((c) => c.sm2_interval_days >= 30).length / cards.length : 0);

/**
 * "Gruplarım": the word bank grouped by level (automatic; lesson words carry their path level) and by the learner's
 * own tags. Each row shows how much of the group is already settled; tapping opens its words, "Çalış" practises it
 * with the same SM-2 review. Tags are set on a word from the list (tap a word → Etiketle) or in the add-word form.
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

  const all = cards ?? [];
  const levels = useMemo(() => levelGroups(all), [all]);
  const tags = useMemo(() => tagGroups(all), [all]);

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
            const tagged = all.filter((c) => inFocus(c, { kind: 'tag', value: tag }));
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
        subtitle={t("{{count}} kelime", { count: all.length })}
        icon={vocabArt.iconGroups}
        onBack={() => navigation.goBack()}
      />

      {isLoading && !cards ? (
        <MivoLoader size={90} label={t("Kelimelerin yükleniyor…")} style={{ marginTop: 40 }} />
      ) : (
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <Text style={styles.section}>{t("Seviyeye göre")}</Text>
          {levels.length === 0 ? (
            <View style={styles.hintCard}>
              <Ionicons name="layers-outline" size={22} color={VP.ink} />
              <Text style={styles.hintText}>{t("Henüz kelimen yok. Derslerde ve kütüphanede eklediğin kelimeler burada seviyelerine göre toplanır.")}</Text>
            </View>
          ) : (
            <View style={styles.card}>
              {levels.map(({ level, count }, i) => {
                const focus: VocabFocus = { kind: 'level', value: level };
                const tint = GROUP_TINTS[i % GROUP_TINTS.length];
                return (
                  <GroupRow
                    key={level}
                    first={i === 0}
                    badge={
                      <View style={[styles.levelBadge, { backgroundColor: tint.soft }]}>
                        <Text style={[styles.levelBadgeText, { color: tint.color }]} numberOfLines={1} adjustsFontSizeToFit>
                          {level === NO_LEVEL ? '•' : level}
                        </Text>
                      </View>
                    }
                    title={level === NO_LEVEL ? t("Diğer") : pathLevelName(level)}
                    count={count}
                    solid={solidShare(all.filter((c) => inFocus(c, focus)))}
                    color={tint.bar}
                    onOpen={() => open(focus, 'browse')}
                    onPractice={() => open(focus, 'practice')}
                  />
                );
              })}
            </View>
          )}

          <Text style={styles.section}>{t("Etiketlerim")}</Text>
          {tags.length === 0 ? (
            <View style={styles.hintCard}>
              <Ionicons name="pricetags-outline" size={22} color={VP.ink} />
              <Text style={styles.hintText}>
                {t("Kelimelerini kendi gruplarına ayır: Sandığım'da bir kelimeye dokun ve Etiketle'yi seç. Seyahat, İş, Mutfak… ne istersen.")}
              </Text>
            </View>
          ) : (
            <View style={styles.card}>
              {tags.map(({ tag, count }, i) => {
                const focus: VocabFocus = { kind: 'tag', value: tag };
                const tint = GROUP_TINTS[(i + 1) % GROUP_TINTS.length];
                return (
                  <GroupRow
                    key={tag}
                    first={i === 0}
                    badge={
                      <View style={[styles.tagBadge, { backgroundColor: tint.soft }]}>
                        <Ionicons name="pricetag" size={17} color={tint.color} />
                      </View>
                    }
                    title={tag}
                    count={count}
                    solid={solidShare(all.filter((c) => inFocus(c, focus)))}
                    color={tint.bar}
                    onOpen={() => open(focus, 'browse')}
                    onPractice={() => open(focus, 'practice')}
                    onRemove={() => removeTag(tag)}
                  />
                );
              })}
            </View>
          )}
          <Text style={styles.footnote}>{t("Bir grubu çalışınca kelimeler günlük tekrardaki gibi ilerler; ayrı bir ilerleme yok.")}</Text>
        </ScrollView>
      )}
      {toast ? <Toast message={toast} /> : null}
    </SafeAreaView>
  );
}

/** One group: badge, name, word count with a thin "settled" bar, then Çalış (and remove, for tags). */
function GroupRow({
  first,
  badge,
  title,
  count,
  solid,
  color,
  onOpen,
  onPractice,
  onRemove,
}: {
  first: boolean;
  badge: React.ReactNode;
  title: string;
  count: number;
  solid: number;
  color: string;
  onOpen: () => void;
  onPractice: () => void;
  onRemove?: () => void;
}) {
  return (
    <View>
      {first ? null : <View style={styles.divider} />}
      <View style={styles.row}>
        <Pressable onPress={onOpen} style={({ pressed }) => [styles.rowMain, pressed && { opacity: 0.7 }]} accessibilityRole="button">
          {badge}
          <View style={{ flex: 1 }}>
            <Text style={styles.rowTitle} numberOfLines={1}>
              {title}
            </Text>
            <View style={styles.rowMeta}>
              <Text style={styles.rowCount}>{t("{{count}} kelime", { count })}</Text>
              <View style={styles.rowTrack}>
                <View style={[styles.rowFill, { width: `${Math.max(4, solid * 100)}%`, backgroundColor: color }]} />
              </View>
            </View>
          </View>
        </Pressable>
        <Pressable onPress={onPractice} style={({ pressed }) => [styles.play, pressed && { opacity: 0.8 }]} accessibilityRole="button">
          <Ionicons name="play" size={13} color="#FFFFFF" />
          <Text style={styles.playText}>{t("Çalış")}</Text>
        </Pressable>
        {onRemove ? (
          <Pressable onPress={onRemove} hitSlop={10} style={styles.remove} accessibilityRole="button" accessibilityLabel={t("Etiketi kaldır")}>
            <Ionicons name="trash-outline" size={18} color={colors.textMuted} />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: FLOOR },
  scroll: { paddingHorizontal: spacing.md, paddingBottom: 40, gap: 10 },
  section: { fontFamily: fonts.headingBold, fontSize: 13, letterSpacing: 0.8, color: colors.textMuted, textTransform: 'uppercase', marginTop: 10, marginLeft: 4 },
  hintCard: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, backgroundColor: VP.card, borderRadius: 20, padding: 16, borderWidth: 1, borderColor: VP.line },
  hintText: { flex: 1, fontFamily: fonts.bodyRegular, fontSize: 13.5, lineHeight: 19, color: colors.textBody },
  card: { backgroundColor: VP.card, borderRadius: 22, paddingHorizontal: 14, paddingVertical: 4, borderWidth: 1, borderColor: VP.line },
  divider: { height: 1, backgroundColor: '#F1EDE6', marginLeft: 56 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 12 },
  rowMain: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 12 },
  levelBadge: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4 },
  levelBadgeText: { fontFamily: fonts.headingBold, fontSize: 15 },
  tagBadge: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  rowTitle: { fontFamily: fonts.headingSemiBold, fontSize: 15.5, color: VP.ink },
  rowMeta: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 },
  rowCount: { fontFamily: fonts.bodyRegular, fontSize: 12.5, color: colors.textMuted },
  rowTrack: { flex: 1, maxWidth: 90, height: 5, borderRadius: 3, backgroundColor: '#F1EDE6', overflow: 'hidden' },
  rowFill: { height: '100%', borderRadius: 3 },
  play: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: VP.ink, borderRadius: 999, paddingVertical: 7, paddingHorizontal: 13 },
  playText: { fontFamily: fonts.headingBold, fontSize: 12.5, color: '#FFFFFF' },
  remove: { padding: 2 },
  footnote: { fontFamily: fonts.bodyRegular, fontSize: 12, lineHeight: 17, color: colors.textMuted, textAlign: 'center', marginTop: 8, paddingHorizontal: 12 },
});
