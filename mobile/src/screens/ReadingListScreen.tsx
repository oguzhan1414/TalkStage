import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useQuery } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { companionImage, minimalFeatureIcons, readingCoverImages, readingSceneImages } from '../assets/images';
import { BouncyPressable } from '../components/BouncyPressable';
import { useMivoTransition } from '../components/MivoTransitionOverlay';
import { ScreenHeader } from '../components/ScreenHeader';
import { Toast } from '../components/Toast';
import { CEFR_LEVELS } from '../constants/cefr';
import { api } from '../lib/api';
import { STAGE_COLOR, STAGE_IDS, STAGE_LEVELS, stageOfLevel, stageTitle, type StageId } from '../lib/stages';
import type { ReadingListScreenProps } from '../navigation/types';
import { colors, fonts, radii, shadow, spacing } from '../theme/tokens';
import type { ProfileOut, ReadingPassageOut } from '../types/api';
import { MivoLoader } from '../components/MivoLoader';
import { t } from '../i18n';

// 'open': kullanıcının seviyesinin altındaki, henüz bitmemiş (serbest) hikaye.
type PassageStatus = 'completed' | 'current' | 'open' | 'locked';

export function ReadingListScreen({ navigation }: ReadingListScreenProps) {
  const { finishTransition } = useMivoTransition();
  const [toast, setToast] = useState<string | null>(null);
  const [selectedStage, setSelectedStage] = useState<StageId>('baslangic');
  const levelPickedRef = useRef(false);

  const { data: profile } = useQuery({
    queryKey: ['me'],
    queryFn: () => api.get<ProfileOut>('/me'),
  });
  const userLevel = (profile?.cefr_level ?? 'A1').toUpperCase();
  const userLevelIdx = Math.max(0, CEFR_LEVELS.indexOf(userLevel));
  const userStage = stageOfLevel(userLevel);
  const userStageIdx = STAGE_IDS.indexOf(userStage);

  // Liste, kullanıcının kendi aşamasında açılsın.
  useEffect(() => {
    if (profile && !levelPickedRef.current) {
      levelPickedRef.current = true;
      setSelectedStage(userStage);
    }
  }, [profile, userStage]);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['reading'],
    queryFn: () => api.get<ReadingPassageOut[]>('/reading'),
  });

  const { data: completedSlugs } = useQuery({
    queryKey: ['reading', 'completed'],
    queryFn: () => api.get<string[]>('/reading/completed-slugs'),
  });

  useEffect(() => {
    if (!isLoading) finishTransition();
  }, [finishTransition, isLoading]);

  const passages = data ?? [];
  const completedSet = useMemo(() => new Set(completedSlugs ?? []), [completedSlugs]);

  // Kilit kuralı seviyeye göre:
  //  - kullanıcının seviyesinin ALTI: hepsi serbest (tamamlanmışsa ✓),
  //  - kullanıcının KENDİ seviyesi: sırayla (bir önceki bitmeden sıradaki açılmaz),
  //  - kullanıcının seviyesinin ÜSTÜ: kilitli (seviye atlayınca açılır).
  const statusBySlug = useMemo(() => {
    const result = new Map<string, PassageStatus>();
    const levelOf = (p: ReadingPassageOut) => Math.max(0, CEFR_LEVELS.indexOf((p.cefr_level ?? 'A1').toUpperCase()));
    const ownLevel = passages.filter((p) => levelOf(p) === userLevelIdx);
    const firstOwnIncomplete = ownLevel.findIndex((p) => !completedSet.has(p.slug));
    for (const p of passages) {
      const lvl = levelOf(p);
      if (completedSet.has(p.slug)) result.set(p.slug, 'completed');
      else if (lvl < userLevelIdx) result.set(p.slug, 'open');
      else if (lvl > userLevelIdx) result.set(p.slug, 'locked');
      else {
        const pos = ownLevel.findIndex((q) => q.slug === p.slug);
        result.set(p.slug, pos === firstOwnIncomplete ? 'current' : 'locked');
      }
    }
    return result;
  }, [passages, completedSet, userLevelIdx]);

  const statusOf = (slug: string): PassageStatus => statusBySlug.get(slug) ?? 'locked';

  const currentPassage = passages.find((p) => statusBySlug.get(p.slug) === 'current');

  const visiblePassages = useMemo(() => {
    const idx = (p: ReadingPassageOut) => Math.max(0, CEFR_LEVELS.indexOf((p.cefr_level ?? 'A1').toUpperCase()));
    return passages.filter((item) => stageOfLevel(item.cefr_level) === selectedStage).sort((a, b) => idx(a) - idx(b));
  }, [passages, selectedStage]);

  const levelPassages = visiblePassages;
  const levelTotal = levelPassages.length;
  const levelDone = levelPassages.filter((p) => completedSet.has(p.slug)).length;

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  /** Hikayenin kapak görseli: önce kendi kapağı, yoksa ilk sahnenin görseli, en son Mivo. */
  const coverOf = (item: ReadingPassageOut) =>
    readingCoverImages[item.slug] ??
    readingSceneImages[`${item.slug}_1`] ??
    (item.theme ? readingCoverImages[item.theme] : undefined) ??
    readingSceneImages[item.scenes[0]?.image_key] ??
    companionImage;

  const heroShown = currentPassage && stageOfLevel(currentPassage.cefr_level) === selectedStage;

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title={t("Hikayeler")}
        subtitle={t("Dinle, oku, cümleleri tamamla")}
        icon={minimalFeatureIcons.reading}
        onBack={() => navigation.goBack()}
      />

      {/* Aşama sekmeleri: kullanıcının aşamasının üstündekilerde küçük kilit */}
      <View style={styles.stageTabsRow}>
        {STAGE_IDS.map((id, i) => {
          const isSelected = selectedStage === id;
          const above = i > userStageIdx;
          return (
            <Pressable
              key={id}
              onPress={() => setSelectedStage(id)}
              style={[styles.stageTab, isSelected && { backgroundColor: STAGE_COLOR[id], borderColor: STAGE_COLOR[id] }]}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
            >
              {above ? <Ionicons name="lock-closed" size={12} color={isSelected ? '#FFFFFF' : '#94A3B8'} /> : null}
              <Text style={[styles.stageTabText, isSelected && styles.stageTabTextActive]}>{stageTitle(id)}</Text>
            </Pressable>
          );
        })}
      </View>

      {isLoading ? (
        <MivoLoader size={100} label={t("Hikayeler yükleniyor…")} style={styles.stateBlock} />
      ) : isError ? (
        <View style={styles.stateBlock}>
          <Text style={styles.stateText}>{t("Okuma parçaları yüklenemedi.")}</Text>
          <Pressable onPress={() => refetch()}>
            <Text style={styles.retryText}>{t("Tekrar dene")}</Text>
          </Pressable>
        </View>
      ) : !passages.length ? (
        <View style={styles.stateBlock}>
          <Text style={styles.stateText}>{t("Henüz okuma parçası eklenmedi.")}</Text>
        </View>
      ) : (
        <FlatList
          data={visiblePassages}
          keyExtractor={(item) => item.slug}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.listHeader}>
              {levelTotal > 0 ? (
                <View style={styles.progressCard}>
                  <View style={styles.progressTextRow}>
                    <Text style={styles.progressTitle}>{t("{{stage}} ilerlemen", { stage: stageTitle(selectedStage) })}</Text>
                    <Text style={styles.progressCount}>{t("{{done}}/{{total}} hikaye", { done: levelDone, total: levelTotal })}</Text>
                  </View>
                  <View style={styles.progressTrack}>
                    <View style={[styles.progressFill, { width: `${Math.max(3, Math.round((levelDone / levelTotal) * 100))}%` }]} />
                  </View>
                </View>
              ) : null}

              {heroShown && currentPassage ? (
                <BouncyPressable
                  onPress={() => navigation.navigate('ReadingPassage', { slug: currentPassage.slug })}
                  style={[styles.hero, shadow.card]}
                  hapticType="medium"
                  scaleTo={0.97}
                >
                  <Image source={coverOf(currentPassage)} style={styles.heroImage} resizeMode={coverOf(currentPassage) === companionImage ? 'contain' : 'cover'} />
                  <LinearGradient
                    colors={['rgba(15,23,42,0.05)', 'rgba(15,23,42,0.35)', 'rgba(15,23,42,0.92)']}
                    locations={[0, 0.45, 1]}
                    style={StyleSheet.absoluteFill}
                    pointerEvents="none"
                  />
                  <View style={styles.heroTop}>
                    <View style={styles.heroEyebrow}>
                      <Text style={styles.heroEyebrowText}>{t("🎯 SIRADAKİ HİKAYEN")}</Text>
                    </View>
                    <View style={styles.heroXp}>
                      <Ionicons name="flash" size={12} color="#FBBF24" />
                      <Text style={styles.heroXpText}>{t("Gerçek XP kazandırır ⚡")}</Text>
                    </View>
                  </View>
                  <View style={styles.heroBottom}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.heroTitle} numberOfLines={2}>
                        {currentPassage.title}
                      </Text>
                      <Text style={styles.heroMeta}>
                        {t("{{count}} sahne", { count: currentPassage.scenes.length })} · {t("{{count}} dk", { count: currentPassage.estimated_minutes })}
                      </Text>
                    </View>
                    <View style={styles.heroCta}>
                      <Ionicons name="play" size={15} color="#FFFFFF" style={{ marginLeft: 1 }} />
                      <Text style={styles.heroCtaText}>{t("Hemen Başla")}</Text>
                    </View>
                  </View>
                </BouncyPressable>
              ) : null}
            </View>
          }
          renderItem={({ item }) => {
            const status = statusOf(item.slug);
            const isLocked = status === 'locked';
            // Aşama içindeki kademe (1 = daha kolay, 2 = biraz daha zor): CEFR yerine küçük noktalar.
            const step = Math.max(0, STAGE_LEVELS[stageOfLevel(item.cefr_level)].indexOf((item.cefr_level ?? 'A1').toUpperCase())) + 1;
            const cover = coverOf(item);
            const wordCount = item.body_text.split(/\s+/).filter(Boolean).length;
            const pill =
              status === 'completed'
                ? { label: t("Tamamlandı"), bg: '#D1FAE5', fg: '#047857' }
                : status === 'current'
                  ? { label: t("Sıradaki"), bg: '#E0E7FF', fg: '#4338CA' }
                  : status === 'open'
                    ? { label: t("Açık"), bg: '#E0F2FE', fg: '#0369A1' }
                    : { label: t("Kilitli"), bg: '#F1F5F9', fg: '#64748B' };

            return (
              <BouncyPressable
                style={[styles.card, shadow.card, status === 'current' && styles.cardCurrent, isLocked && styles.cardLocked]}
                hapticType={isLocked ? 'warning' : 'medium'}
                scaleTo={0.97}
                onPress={() => {
                  if (isLocked) {
                    const itemStage = stageOfLevel(item.cefr_level);
                    showToast(
                      STAGE_IDS.indexOf(itemStage) > userStageIdx
                        ? t("Bu hikaye {{stage}} aşamasında. Önce {{current}} hikayelerini tamamla 🔒", {
                            stage: stageTitle(itemStage),
                            current: stageTitle(userStage),
                          })
                        : t("Önce bir önceki hikayeyi tamamla 🔒")
                    );
                    return;
                  }
                  navigation.navigate('ReadingPassage', { slug: item.slug });
                }}
              >
                <View style={styles.coverWrap}>
                  <Image source={cover} style={[styles.coverImage, isLocked && { opacity: 0.45 }]} resizeMode={cover === companionImage ? 'contain' : 'cover'} />
                  <View style={styles.stepBadge}>
                    {[1, 2].map((n) => (
                      <View key={n} style={[styles.stepDot, n <= step && styles.stepDotOn]} />
                    ))}
                  </View>
                  {isLocked ? (
                    <View style={styles.lockOverlay} pointerEvents="none">
                      <View style={styles.lockCircle}>
                        <Ionicons name="lock-closed" size={16} color="#FFFFFF" />
                      </View>
                    </View>
                  ) : null}
                </View>

                <View style={styles.cardBody}>
                  <Text style={[styles.cardTitle, isLocked && styles.cardTitleLocked]} numberOfLines={2}>
                    {item.title}
                  </Text>
                  <View style={styles.metaRow}>
                    <View style={styles.metaItem}>
                      <Ionicons name="time-outline" size={13} color={colors.textMuted} />
                      <Text style={styles.metaText}>{t("{{count}} dk", { count: item.estimated_minutes })}</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Ionicons name="film-outline" size={13} color={colors.textMuted} />
                      <Text style={styles.metaText}>{t("{{count}} sahne", { count: item.scenes.length })}</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Ionicons name="document-text-outline" size={13} color={colors.textMuted} />
                      <Text style={styles.metaText}>{t("{{count}} kelime", { count: wordCount })}</Text>
                    </View>
                  </View>
                  <View style={styles.footerRow}>
                    <View style={[styles.statusPill, { backgroundColor: pill.bg }]}>
                      {status === 'completed' ? <Ionicons name="checkmark" size={12} color={pill.fg} /> : null}
                      <Text style={[styles.statusPillText, { color: pill.fg }]}>{pill.label}</Text>
                    </View>
                    {!isLocked ? (
                      <View style={styles.playCircle}>
                        <Ionicons name="play" size={13} color="#FFFFFF" style={{ marginLeft: 1 }} />
                      </View>
                    ) : null}
                  </View>
                </View>
              </BouncyPressable>
            );
          }}
          ListEmptyComponent={
            <View style={styles.emptyLevelBlock}>
              <Image source={minimalFeatureIcons.reading} style={styles.emptyArt} resizeMode="contain" />
              <Text style={styles.emptyLevelTitle}>{t("{{stage}} aşaması hikayeleri", { stage: stageTitle(selectedStage) })}</Text>
              <Text style={styles.emptyLevelSub}>{t("Bu seviye için yeni hikayeler ve ses sahneleri çok yakında eklenecek!")}</Text>
            </View>
          }
        />
      )}

      {toast ? <Toast message={toast} /> : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },

  stageTabsRow: { flexDirection: 'row', gap: 8, paddingHorizontal: spacing.md, paddingBottom: 8 },
  stageTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingVertical: 11,
    borderRadius: radii.pill,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E2E8F0',
  },
  stageTabText: { fontFamily: fonts.headingBold, fontSize: 14, color: colors.textBody },
  stageTabTextActive: { color: '#FFFFFF' },

  list: { paddingHorizontal: spacing.md, paddingBottom: 60, paddingTop: 4 },
  listHeader: { gap: 14, marginBottom: 14 },

  progressCard: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 14, borderWidth: 1, borderColor: '#F1F5F9', gap: 9 },
  progressTextRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  progressTitle: { fontFamily: fonts.headingBold, fontSize: 14, color: colors.textHeading },
  progressCount: { fontFamily: fonts.headingSemiBold, fontSize: 12.5, color: colors.textMuted },
  progressTrack: { height: 10, borderRadius: 5, backgroundColor: '#E2E8F0', overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 5, backgroundColor: '#10B981' },

  hero: { height: 218, borderRadius: 28, overflow: 'hidden', backgroundColor: '#1E293B' },
  heroImage: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' },
  heroTop: { position: 'absolute', top: 14, left: 14, right: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  heroEyebrow: { backgroundColor: 'rgba(79,70,229,0.94)', borderRadius: radii.pill, paddingHorizontal: 11, paddingVertical: 5 },
  heroEyebrowText: { fontFamily: fonts.headingBold, fontSize: 10.5, letterSpacing: 0.6, color: '#FFFFFF' },
  heroXp: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(15,23,42,0.6)', borderRadius: radii.pill, paddingHorizontal: 10, paddingVertical: 5 },
  heroXpText: { fontFamily: fonts.headingSemiBold, fontSize: 10.5, color: '#FDE68A' },
  heroBottom: { position: 'absolute', left: 16, right: 16, bottom: 16, flexDirection: 'row', alignItems: 'flex-end', gap: 10 },
  heroTitle: { fontFamily: fonts.headingBold, fontSize: 22, lineHeight: 27, color: '#FFFFFF' },
  heroMeta: { fontFamily: fonts.bodyRegular, fontSize: 12.5, color: 'rgba(255,255,255,0.85)', marginTop: 3 },
  heroCta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.brand,
    borderRadius: radii.pill,
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderBottomWidth: 3,
    borderBottomColor: '#3730A3',
  },
  heroCtaText: { fontFamily: fonts.headingBold, fontSize: 13, color: '#FFFFFF', letterSpacing: 0.3 },

  card: {
    flexDirection: 'row',
    gap: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  cardCurrent: { borderColor: '#C7D2FE', borderWidth: 2 },
  cardLocked: { backgroundColor: '#F8FAFC' },
  coverWrap: { width: 108, height: 108, borderRadius: 18, overflow: 'hidden', backgroundColor: '#E2E8F0' },
  coverImage: { width: '100%', height: '100%' },
  stepBadge: { position: 'absolute', left: 8, top: 8, flexDirection: 'row', gap: 3, backgroundColor: 'rgba(15,23,42,0.62)', borderRadius: 10, paddingHorizontal: 7, paddingVertical: 5 },
  stepDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.35)' },
  stepDotOn: { backgroundColor: '#FFFFFF' },
  lockOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' },
  lockCircle: { width: 38, height: 38, borderRadius: 19, backgroundColor: 'rgba(15,23,42,0.72)', alignItems: 'center', justifyContent: 'center' },
  cardBody: { flex: 1, justifyContent: 'space-between' },
  cardTitle: { fontFamily: fonts.headingBold, fontSize: 16, lineHeight: 21, color: colors.textHeading },
  cardTitleLocked: { color: colors.textMuted },
  metaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 4 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  metaText: { fontFamily: fonts.bodyMedium, fontSize: 11.5, color: colors.textMuted },
  footerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 },
  statusPill: { flexDirection: 'row', alignItems: 'center', gap: 4, borderRadius: radii.pill, paddingHorizontal: 10, paddingVertical: 4 },
  statusPillText: { fontFamily: fonts.headingBold, fontSize: 11.5 },
  playCircle: { width: 32, height: 32, borderRadius: 16, backgroundColor: colors.brand, alignItems: 'center', justifyContent: 'center' },

  stateBlock: { alignItems: 'center', paddingVertical: 48, gap: 10 },
  stateText: { fontFamily: fonts.bodyMedium, fontSize: 14, color: colors.textBody },
  retryText: { fontFamily: fonts.headingBold, fontSize: 14, color: colors.brand },
  emptyLevelBlock: { alignItems: 'center', paddingVertical: 36, paddingHorizontal: 20, gap: 8 },
  emptyArt: { width: 120, height: 120 },
  emptyLevelTitle: { fontFamily: fonts.headingBold, fontSize: 17, color: colors.textHeading, textAlign: 'center' },
  emptyLevelSub: { fontFamily: fonts.bodyRegular, fontSize: 13, lineHeight: 19, color: colors.textMuted, textAlign: 'center' },
});
