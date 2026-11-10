import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useQuery } from '@tanstack/react-query';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, useWindowDimensions, View } from 'react-native';

import { resolveSceneTileSource } from '../assets/images';

import { MIVO_STAGE_BG } from '../assets/videos';
import { MivoStage } from '../components/MivoStage';
import { useMivoTransition } from '../components/MivoTransitionOverlay';
import { trackEvent } from '../lib/analytics';
import { isProUser } from '../lib/revenuecat';
import { Toast } from '../components/Toast';
import { SCENARIOS, type ScenarioEntry } from '@talkstage/shared-data/scenariosData';
import { InteractiveVideoScenarioModal } from '../components/InteractiveVideoScenarioModal';
import { CEFR_LEVELS } from '../constants/cefr';
import { SceneTile } from '../components/scenes/SceneTile';
import { api } from '../lib/api';
import { haptics } from '../lib/haptics';
import { logLearningEvent } from '../lib/learningEvents';
import { pullLearningFlags, setLearningFlag } from '../lib/learningFlags';
import {
  SCENE_FLAG_PREFIX,
  SCENE_STAR2_PREFIX,
  SCENE_STAR3_PREFIX,
  levelToFinishFor,
  loadSceneStars,
  type SceneStars,
  sceneAccess,
} from '../lib/sceneProgress';
import type { MainTabScreenProps } from '../navigation/types';
import { colors, fonts, radii, shadow, spacing } from '../theme/tokens';
import type { ProfileOut } from '../types/api';
import { t } from '../i18n';
import { STAGE_COLOR, STAGE_IDS, stageOfLevel, stageTitle } from '../lib/stages';

/** Stage the learner has to progress in before a locked scene opens (shown instead of a CEFR level). */
const unlockStage = (sceneLevel: string | null | undefined) => stageTitle(stageOfLevel(levelToFinishFor(sceneLevel)));

export function ScenariosScreen({ navigation, route }: MainTabScreenProps<'Scenarios'>) {
  // Sahneler yalnızca video senaryolarını gösterir; sunucudaki eski "tüm senaryolar" kataloğu bu ekrandan kaldırıldı
  // (sahnelere Bugün yolundan gidiliyor).
  const [searchOpen, setSearchOpen] = useState(false);
  const { width: screenWidth } = useWindowDimensions();
  const [videoSearch, setVideoSearch] = useState<string>('');
  const [selectedVideoScenario, setSelectedVideoScenario] = useState<ScenarioEntry | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  // Per-card real load-failure tracking — the cover `source` used to be
  // decided purely by whether `coverImage` was a non-empty string, so a real
  // network/server failure at runtime (not just a missing field) rendered a
  // permanently broken image instead of falling back to a category photo.

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1600);
  };

  const { data: profile } = useQuery({
    queryKey: ['me'],
    queryFn: () => api.get<ProfileOut>('/me'),
  });

  const { data: isPro } = useQuery({ queryKey: ['isProUser'], queryFn: isProUser, staleTime: 60_000 });
  const { transitionTo } = useMivoTransition();
  // What the free plan still allows (the room enforces the same rules); refreshed each time the tab is shown.
  const { data: access, refetch: refetchAccess } = useQuery({
    queryKey: ['voiceAccess'],
    queryFn: () => api.get<{ pro: boolean; quota: boolean; free_chat: boolean; scene: boolean }>('/voice/access'),
    staleTime: 30_000,
  });
  useFocusEffect(
    useCallback(() => {
      void refetchAccess();
    }, [refetchAccess])
  );
  /** The one free Mivo chat is used up: the card offers Pro instead of opening a room that would close at once. */
  const chatTrialUsed = !isPro && access?.free_chat === false;
  const openMivoChat = () => {
    if (chatTrialUsed) {
      trackEvent('paywall_opened', { source: 'konus_chat_trial_used' });
      navigation.navigate('Paywall');
      return;
    }
    // First the learner picks what to talk about ('Ne konuşalım?'), then the room opens on it.
    navigation.navigate('FreeChatSetup');
  };
  const userLevel = (profile?.cefr_level ?? 'A1').toUpperCase();
  const [sceneStars, setSceneStars] = useState<SceneStars>({});
  const starsOf = (id: string) => sceneStars[id] ?? 0;

  // 3D Pixar video scenarios (only those with videoReady: true and actual videoSteps)
  const readyVideoScenarios = useMemo(
    () => SCENARIOS.filter((s) => s.videoSteps && s.videoSteps.length > 0 && s.videoReady),
    []
  );

  // Tamamlanan sahneler (modal `scene_completed_<id>` bayrağını yazar; cihazlar arası senkron)
  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      pullLearningFlags().finally(() => {
        loadSceneStars(readyVideoScenarios.map((s) => s.id)).then((stars) => {
          if (!cancelled) setSceneStars(stars);
        });
      });
      return () => {
        cancelled = true;
      };
    }, [readyVideoScenarios])
  );

  // The result screen's "next scene": the next playable scene in the list, preferring one not played yet.
  const nextAfterSelected = useMemo(() => {
    if (!selectedVideoScenario) return null;
    const i = readyVideoScenarios.findIndex((s) => s.id === selectedVideoScenario.id);
    const after = [...readyVideoScenarios.slice(i + 1), ...readyVideoScenarios.slice(0, Math.max(0, i))].filter(
      (s) => sceneAccess(s.level, userLevel) !== 'locked'
    );
    return after.find((s) => starsOf(s.id) === 0) ?? after[0] ?? null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedVideoScenario, readyVideoScenarios, userLevel, sceneStars]);

  // Soft level lock: tapping a scene two+ levels above the user's level only
  // explains how to unlock it; one level above stays playable ("zor" label).
  const openVideoScene = (sc: ScenarioEntry) => {
    if (sceneAccess(sc.level, userLevel) === 'locked') {
      haptics.selection();
      showToast(t("🔒 {{stage}} aşamasında ilerleyince açılır", { stage: unlockStage(sc.level) }));
      return;
    }
    haptics.success();
    setSelectedVideoScenario(sc);
  };

  // Home's "Günün Sahnesi" card deep-links here with the scene to start.
  const openSceneId = route.params?.openSceneId;
  useEffect(() => {
    if (!openSceneId) return;
    const sc = readyVideoScenarios.find((s) => s.id === openSceneId);
    navigation.setParams({ openSceneId: undefined });
    if (sc && sceneAccess(sc.level, userLevel) !== 'locked') setSelectedVideoScenario(sc);
  }, [openSceneId, readyVideoScenarios, userLevel, navigation]);

  const videoSearchLower = videoSearch.trim().toLowerCase();
  const filteredVideoScenarios = readyVideoScenarios.filter((sc) => {
    if (!videoSearchLower) return true;
    return (
      sc.title.toLowerCase().includes(videoSearchLower) ||
      sc.titleTr.toLowerCase().includes(videoSearchLower) ||
      sc.description.toLowerCase().includes(videoSearchLower) ||
      sc.aiName.toLowerCase().includes(videoSearchLower)
    );
  });

  const watchedCount = readyVideoScenarios.filter((sc) => starsOf(sc.id) > 0).length;
  const totalStars = readyVideoScenarios.reduce((sum, sc) => sum + starsOf(sc.id), 0);
  const stageSections = STAGE_IDS.map((id) => ({
    id,
    scenes: filteredVideoScenarios
      .filter((sc) => stageOfLevel(sc.level) === id)
      .sort((a, b) => CEFR_LEVELS.indexOf(a.level) - CEFR_LEVELS.indexOf(b.level)),
  })).filter((sec) => sec.scenes.length > 0);
  // Three tiles to a row; each stage shows two rows until "see all" is tapped (a search shows everything).
  const tileWidth = Math.floor((screenWidth - spacing.md * 2 - TILE_GAP * 2) / 3);
  const [openStages, setOpenStages] = useState<Record<string, boolean>>({});

  return (
    <SafeAreaView style={styles.container}>
      {/* Header: the tab's name, streak, Pro, search (no greeting or avatar: Profile lives in the tab bar) */}
      <View style={styles.header}>
        <Text style={[styles.title, { flex: 1 }]}>{t("Konuş")}</Text>
        <View style={styles.streakChip}>
          <Ionicons name="flame" size={16} color="#F97316" />
          <Text style={styles.streakChipText}>{profile?.streak_count ?? 0}</Text>
        </View>
        <Pressable
          onPress={() => {
            if (isPro) return;
            trackEvent('paywall_opened', { source: 'konus_pro_pill' });
            navigation.navigate('Paywall');
          }}
          style={[styles.proPill, isPro && styles.proPillOn]}
          accessibilityRole="button"
          accessibilityLabel={t("Spekvia Pro")}
        >
          <Text style={styles.proPillText}>👑 PRO</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            haptics.selection();
            setSearchOpen((v) => !v);
          }}
          style={styles.searchBtn}
          accessibilityRole="button"
          accessibilityLabel={t("Ara")}
          hitSlop={6}
        >
          <Ionicons name={searchOpen ? 'close' : 'search'} size={19} color={colors.textHeading} />
        </Pressable>
      </View>

      {searchOpen ? (
        <View style={[styles.videoSearchBox, styles.searchBoxTop]}>
          <Ionicons name="search" size={16} color={colors.textMuted} />
          <TextInput
            autoFocus
            value={videoSearch}
            onChangeText={setVideoSearch}
            placeholder={t("Senaryo veya karakter ara (otel, taksi, kahve...)")}
            placeholderTextColor={colors.textMuted}
            style={styles.videoSearchInput}
          />
        </View>
      ) : null}

      <ScrollView contentContainerStyle={styles.cinemaScrollContent} showsVerticalScrollIndicator={false}>
        {!videoSearchLower ? (
          <>
            {/* Mivo: one compact row — his live tile, what it is, the mic */}
            <Pressable onPress={openMivoChat} style={({ pressed }) => [styles.mivoCard, pressed && { transform: [{ scale: 0.98 }] }]} accessibilityRole="button" accessibilityLabel={t("Mivo ile serbest sohbet")}>
              <View style={styles.mivoTile}>
                <MivoStage state="idle" height={MIVO_TILE} fit="cover" zoom={1.35} />
              </View>
              <View style={{ flex: 1, minWidth: 0, gap: 3 }}>
                <View style={styles.mivoLive}>
                  <View style={styles.mivoLiveDot} />
                  <Text style={styles.mivoLiveText}>{t("Mivo hazır")}</Text>
                </View>
                <Text style={styles.mivoCardTitle} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.8} maxFontSizeMultiplier={1.2}>
                  {t("Serbest Sohbet")}
                </Text>
                <Text style={styles.mivoCardSub} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.8} maxFontSizeMultiplier={1.2}>
                  {t("Mivo ile istediğin konuda konuş")}
                </Text>
                {/* Its own row: the plan on the left, the big mic on the right */}
                <View style={styles.mivoMicRow}>
                  <View style={[styles.mivoPlan, (isPro || chatTrialUsed) && styles.mivoPlanPro]}>
                    <Text style={[styles.mivoPlanText, (isPro || chatTrialUsed) && { color: '#92400E' }]} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.75}>
                      {isPro ? t("👑 Sınırsız") : chatTrialUsed ? t("👑 Pro ile sınırsız") : t("1 deneme hakkı")}
                    </Text>
                  </View>
                  <View style={[styles.mivoMic, chatTrialUsed && styles.mivoMicPro]}>
                    <Ionicons name={chatTrialUsed ? 'lock-closed' : 'mic'} size={chatTrialUsed ? 24 : 30} color="#FFFFFF" />
                  </View>
                </View>
              </View>
            </Pressable>

            {/* Scenes: the head with the stars collected so far */}
            <View style={styles.scenesHeadRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.scenesHead}>{t("Sahneler")}</Text>
                <Text style={styles.scenesSub}>{t("Hazır rol oyunları: izle, sıra sende olunca konuş.")}</Text>
              </View>
              <View style={styles.starsChip}>
                <Ionicons name="star" size={15} color="#F59E0B" />
                <Text style={styles.starsChipText}>
                  {totalStars}/{readyVideoScenarios.length * 3}
                </Text>
              </View>
            </View>
          </>
        ) : null}


        {stageSections.length === 0 ? (
          <View style={styles.cinemaEmptyState}>
            <Ionicons name="film-outline" size={40} color={colors.textMuted} />
            <Text style={styles.cinemaEmptyTitle}>{t("Aramanıza uygun senaryo bulunamadı")}</Text>
            <Pressable onPress={() => setVideoSearch('')} style={styles.cinemaResetBtn}>
              <Text style={styles.cinemaResetBtnText}>{t("Filtreleri Sıfırla")}</Text>
            </Pressable>
          </View>
        ) : (
          stageSections.map((sec) => {
            const played = sec.scenes.filter((sc) => starsOf(sc.id) > 0).length;
            return (
              <View key={sec.id} style={styles.section}>
                <View style={styles.sectionHead}>
                  <View style={[styles.sectionDot, { backgroundColor: STAGE_COLOR[sec.id] }]} />
                  <Text style={styles.sectionTitle}>{stageTitle(sec.id)}</Text>
                  <View style={{ flex: 1 }} />
                  <View style={[styles.sectionCountPill, { backgroundColor: `${STAGE_COLOR[sec.id]}1A` }]}>
                    <Text style={[styles.sectionCount, { color: STAGE_COLOR[sec.id] }]}>
                      {t("{{played}}/{{total}} oynandı", { played, total: sec.scenes.length })}
                    </Text>
                  </View>
                </View>
                <View style={styles.grid}>
                  {(openStages[sec.id] || videoSearchLower ? sec.scenes : sec.scenes.slice(0, GRID_PREVIEW)).map((sc) => (
                    <SceneTile
                      key={sc.id}
                      width={tileWidth}
                      cover={resolveSceneTileSource(sc)}
                      title={sc.titleTr}
                      level={sc.level}
                      levelColor={STAGE_COLOR[sec.id]}
                      stars={starsOf(sc.id)}
                      access={sceneAccess(sc.level, userLevel)}
                      onPress={() => openVideoScene(sc)}
                    />
                  ))}
                </View>
                {!videoSearchLower && sec.scenes.length > GRID_PREVIEW ? (
                  <Pressable
                    onPress={() => {
                      haptics.selection();
                      setOpenStages((o) => ({ ...o, [sec.id]: !o[sec.id] }));
                    }}
                    style={({ pressed }) => [styles.moreBtn, pressed && { opacity: 0.7 }]}
                    accessibilityRole="button"
                  >
                    <Text style={styles.moreBtnText}>
                      {openStages[sec.id] ? t("Daha az göster") : t("Tümünü gör ({{n}})", { n: sec.scenes.length })}
                    </Text>
                    <Ionicons name={openStages[sec.id] ? 'chevron-up' : 'chevron-down'} size={15} color={colors.brand} />
                  </Pressable>
                ) : null}
              </View>
            );
          })
        )}
      </ScrollView>

      {toast ? <Toast message={toast} /> : null}

      {/* 3D Interactive Video Scenario Modal */}
      <InteractiveVideoScenarioModal
        visible={!!selectedVideoScenario}
        scenario={selectedVideoScenario}
        onClose={() => setSelectedVideoScenario(null)}
        onComplete={(_earnedXp, stars) => {
          if (!selectedVideoScenario) return;
          const id = selectedVideoScenario.id;
          // Best result is kept: 1 = finished, 2 and 3 from how cleanly the lines were said.
          setLearningFlag(`${SCENE_FLAG_PREFIX}${id}`);
          logLearningEvent('scene', id);
          if (stars >= 2) setLearningFlag(`${SCENE_STAR2_PREFIX}${id}`);
          if (stars >= 3) setLearningFlag(`${SCENE_STAR3_PREFIX}${id}`);
          setSceneStars((prev) => ({ ...prev, [id]: Math.max(prev[id] ?? 0, stars) as 1 | 2 | 3 }));
        }}
        onNextScene={nextAfterSelected ? () => setSelectedVideoScenario(nextAfterSelected) : undefined}
      />
    </SafeAreaView>
  );
}

/** Mivo's live tile on the free-chat card. */
const MIVO_TILE = 112;
/** The scene grid: gap between tiles and how many show before "see all" (two rows). */
const TILE_GAP = 10;
const GRID_PREVIEW = 6;

const styles = StyleSheet.create({
  streakChip: { flexDirection: 'row', alignItems: 'center', gap: 4, height: 36, paddingHorizontal: 10, borderRadius: 18, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E8F0' },
  streakChipText: { fontFamily: fonts.headingBold, fontSize: 15, color: colors.textHeading },
  proPill: { height: 36, paddingHorizontal: 11, borderRadius: 18, justifyContent: 'center', backgroundColor: '#FDE68A', borderWidth: 1.5, borderColor: '#F59E0B' },
  proPillOn: { backgroundColor: '#FFF7D6' },
  proPillText: { fontFamily: fonts.headingBold, fontSize: 12.5, color: '#92400E', letterSpacing: 0.4 },
  mivoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 12,
    paddingRight: 14,
    marginBottom: 24,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E7FF',
    ...shadow.sm,
  },
  mivoMicRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginTop: 6 },
  mivoPlan: { borderRadius: radii.pill, paddingHorizontal: 10, paddingVertical: 5, backgroundColor: '#EEF2FF', flexShrink: 1, minWidth: 0 },
  mivoPlanPro: { backgroundColor: '#FEF3C7' },
  mivoPlanText: { fontFamily: fonts.headingBold, fontSize: 12, color: colors.brand },
  mivoTile: { width: MIVO_TILE, height: MIVO_TILE, borderRadius: 20, overflow: 'hidden', backgroundColor: MIVO_STAGE_BG },
  mivoLive: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  mivoLiveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.success },
  mivoLiveText: { fontFamily: fonts.headingBold, fontSize: 12.5, letterSpacing: 0.3, color: '#059669' },
  mivoCardTitle: { fontFamily: fonts.headingBold, fontSize: 20, lineHeight: 25, color: colors.textHeading },
  mivoCardSub: { fontFamily: fonts.bodyMedium, fontSize: 14.5, lineHeight: 20, color: colors.textBody },
  mivoMicPro: { backgroundColor: '#E09A1F', shadowColor: '#B7791F' },
  mivoMic: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.brand,
    shadowOpacity: 0.35,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  scenesHeadRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  scenesHead: { fontFamily: fonts.headingBold, fontSize: 22, color: colors.textHeading },
  scenesSub: { fontFamily: fonts.bodyMedium, fontSize: 12.5, color: colors.textMuted, marginTop: 1 },
  sectionDot: { width: 10, height: 10, borderRadius: 5, alignSelf: 'center' },
  sectionCountPill: { borderRadius: radii.pill, paddingHorizontal: 9, paddingVertical: 3 },
  cinemaEmptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cinemaEmptyTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 14,
    color: colors.textHeading,
    marginTop: 12,
    marginBottom: 4,
  },
  cinemaResetBtn: {
    backgroundColor: colors.brand,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radii.pill,
  },
  cinemaResetBtnText: {
    fontFamily: fonts.headingBold,
    fontSize: 11.5,
    color: '#FFFFFF',
  },
  cinemaScrollContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: 110,
  },
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xs,
    paddingBottom: spacing.sm,
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: TILE_GAP },
  moreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    alignSelf: 'center',
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: radii.pill,
    backgroundColor: '#EEF2FF',
  },
  moreBtnText: { fontFamily: fonts.headingBold, fontSize: 13, color: colors.brand },
  searchBoxTop: { marginHorizontal: spacing.md, marginBottom: spacing.sm },
  searchBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: { marginBottom: spacing.lg },
  sectionCount: { fontFamily: fonts.headingBold, fontSize: 11.5 },
  sectionHead: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  sectionTitle: { fontFamily: fonts.headingBold, fontSize: 18, color: colors.textHeading },
  starsChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFFBEB',
    borderWidth: 1.5,
    borderColor: '#FDE68A',
    borderRadius: radii.pill,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  starsChipText: { fontFamily: fonts.headingBold, fontSize: 13, color: '#92400E' },
  subtitle: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 1,
  },
  title: {
    fontFamily: fonts.headingBold,
    fontSize: 20,
    color: colors.textHeading,
    letterSpacing: -0.3,
  },
  videoSearchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: radii.lg,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
    marginBottom: spacing.md,
  },
  videoSearchInput: {
    flex: 1,
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: colors.textHeading,
    padding: 0,
  },
});
