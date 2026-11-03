import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useQuery } from '@tanstack/react-query';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, useWindowDimensions, View } from 'react-native';

import { resolveScenarioCoverSource } from '../assets/images';

import { LinearGradient } from 'expo-linear-gradient';
import { MivoStage } from '../components/MivoStage';
import { useMivoTransition } from '../components/MivoTransitionOverlay';
import { trackEvent } from '../lib/analytics';
import { isProUser } from '../lib/revenuecat';
import { Toast } from '../components/Toast';
import { SCENARIOS, type ScenarioEntry } from '@talkstage/shared-data/scenariosData';
import { InteractiveVideoScenarioModal } from '../components/InteractiveVideoScenarioModal';
import { CEFR_LEVELS } from '../constants/cefr';
import { SceneHero } from '../components/scenes/SceneHero';
import { ScenePoster } from '../components/scenes/ScenePoster';
import { api } from '../lib/api';
import { haptics } from '../lib/haptics';
import { pullLearningFlags, setLearningFlag } from '../lib/learningFlags';
import {
  SCENE_FLAG_PREFIX,
  SCENE_STAR2_PREFIX,
  SCENE_STAR3_PREFIX,
  levelToFinishFor,
  loadSceneStars,
  pickSceneOfTheDay,
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
  const openMivoChat = () => {
    trackEvent('mivo_chat_opened', { with_story: false, from: 'konus' });
    transitionTo(() => navigation.navigate('FreeChatRoom'), t("Mivo ile Sohbet Başlıyor…"));
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

  const nextScene = useMemo(
    () => pickSceneOfTheDay(readyVideoScenarios, userLevel, sceneStars),
    [readyVideoScenarios, userLevel, sceneStars]
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
  const posterWidth = Math.round(Math.min(190, screenWidth * 0.42));

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
            {/* Mivo, as in the voice rooms: the heart of this tab (the only way into free chat now) */}
            <Pressable onPress={openMivoChat} style={({ pressed }) => [styles.mivoCard, pressed && { opacity: 0.95 }]} accessibilityRole="button" accessibilityLabel={t("Mivo ile serbest sohbet")}>
              <MivoStage state="idle" height={Math.round(Math.min(((screenWidth - 32) * 9) / 16, 200))}>
                <View style={styles.mivoLive}>
                  <View style={styles.mivoLiveDot} />
                  <Text style={styles.mivoLiveText}>{t("Mivo hazır")}</Text>
                </View>
                <View style={[styles.mivoPlan, isPro && styles.mivoPlanPro]}>
                  <Text style={[styles.mivoPlanText, isPro && { color: '#92400E' }]}>{isPro ? t("👑 Sınırsız") : t("1 deneme hakkı")}</Text>
                </View>
              </MivoStage>
              {/* The body: one deep indigo-violet panel, white type, a white pill to start */}
              <LinearGradient colors={['#4338CA', '#6D28D9']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.mivoCardBody}>
                <View style={styles.mivoGlow} pointerEvents="none" />
                <Text style={styles.mivoKicker}>{t("SERBEST SOHBET")}</Text>
                <Text style={styles.mivoCardTitle}>{t("Mivo ile istediğin konuda konuş")}</Text>
                <Text style={styles.mivoCardSub}>{t("Sorular sorar, seni dinler, hatalarını nazikçe düzeltir.")}</Text>
                <View style={styles.mivoStart}>
                  <LinearGradient colors={['#6366F1', '#8B5CF6']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.mivoStartMic}>
                    <Ionicons name="mic" size={18} color="#FFFFFF" />
                  </LinearGradient>
                  <Text style={styles.mivoStartText}>{t("Konuşmaya başla")}</Text>
                  <Ionicons name="arrow-forward" size={18} color="#4338CA" style={{ marginLeft: 'auto', marginRight: 6 }} />
                </View>
              </LinearGradient>
            </Pressable>

            {/* Scenes: the head with the stars collected so far */}
            <View style={styles.scenesHeadRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.scenesHead}>{t("Sahneler")}</Text>
                <Text style={styles.scenesSub}>{t("Kısa video sahneler: izle, sıra sende olunca konuş.")}</Text>
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

        {/* Senin için sıradaki: büyük afiş */}
        {nextScene && !videoSearchLower ? (
          <SceneHero
            cover={resolveScenarioCoverSource(nextScene)}
            eyebrow={starsOf(nextScene.id) > 0 ? t("TEKRAR İZLE") : t("SENİN İÇİN SIRADAKİ")}
            title={nextScene.titleTr}
            character={nextScene.aiName}
            role={nextScene.aiRole}
            minutes={nextScene.durationMin}
            level={nextScene.level}
            levelColor={STAGE_COLOR[stageOfLevel(nextScene.level)]}
            stars={starsOf(nextScene.id)}
            onPress={() => openVideoScene(nextScene)}
          />
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
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.posterRow}
                  decelerationRate="fast"
                >
                  {sec.scenes.map((sc) => {
                    const stars = starsOf(sc.id);
                    return (
                      <ScenePoster
                        key={sc.id}
                        width={posterWidth}
                        cover={resolveScenarioCoverSource(sc)}
                        title={sc.titleTr}
                        character={sc.aiName}
                        minutes={sc.durationMin}
                        stars={stars}
                        levelColor={STAGE_COLOR[sec.id]}
                        level={sc.level}
                        access={sceneAccess(sc.level, userLevel)}
                        unlockLabel={t("{{stage}} aşamasında açılır", { stage: unlockStage(sc.level) })}
                        onPress={() => openVideoScene(sc)}
                      />
                    );
                  })}
                </ScrollView>
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
          if (stars >= 2) setLearningFlag(`${SCENE_STAR2_PREFIX}${id}`);
          if (stars >= 3) setLearningFlag(`${SCENE_STAR3_PREFIX}${id}`);
          setSceneStars((prev) => ({ ...prev, [id]: Math.max(prev[id] ?? 0, stars) as 1 | 2 | 3 }));
        }}
        onNextScene={nextAfterSelected ? () => setSelectedVideoScenario(nextAfterSelected) : undefined}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  streakChip: { flexDirection: 'row', alignItems: 'center', gap: 4, height: 36, paddingHorizontal: 10, borderRadius: 18, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E8F0' },
  streakChipText: { fontFamily: fonts.headingBold, fontSize: 15, color: colors.textHeading },
  proPill: { height: 36, paddingHorizontal: 11, borderRadius: 18, justifyContent: 'center', backgroundColor: '#FDE68A', borderWidth: 1.5, borderColor: '#F59E0B' },
  proPillOn: { backgroundColor: '#FFF7D6' },
  proPillText: { fontFamily: fonts.headingBold, fontSize: 12.5, color: '#92400E', letterSpacing: 0.4 },
  mivoCard: { borderRadius: 28, overflow: 'hidden', backgroundColor: '#4338CA', marginBottom: 22, ...shadow.md },
  mivoLive: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: radii.pill,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  mivoLiveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.success },
  mivoLiveText: { fontFamily: fonts.headingBold, fontSize: 11.5, color: colors.textHeading },
  mivoPlan: { position: 'absolute', top: 12, right: 12, backgroundColor: 'rgba(255,255,255,0.92)', borderRadius: radii.pill, paddingHorizontal: 10, paddingVertical: 5 },
  mivoPlanPro: { backgroundColor: '#FDE68A' },
  mivoPlanText: { fontFamily: fonts.headingBold, fontSize: 11.5, color: colors.brand },
  mivoCardBody: { paddingHorizontal: 18, paddingTop: 16, paddingBottom: 18, gap: 6, overflow: 'hidden' },
  mivoGlow: { position: 'absolute', width: 220, height: 220, borderRadius: 110, right: -70, top: -110, backgroundColor: 'rgba(255,255,255,0.10)' },
  mivoKicker: { fontFamily: fonts.headingBold, fontSize: 11, letterSpacing: 1.4, color: 'rgba(224,231,255,0.85)' },
  mivoCardTitle: { fontFamily: fonts.headingBold, fontSize: 21, lineHeight: 27, color: '#FFFFFF' },
  mivoCardSub: { fontFamily: fonts.bodyMedium, fontSize: 13.5, lineHeight: 19, color: 'rgba(238,242,255,0.88)' },
  mivoStart: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
    padding: 6,
    borderRadius: radii.pill,
    backgroundColor: '#FFFFFF',
    shadowColor: '#1E1B4B',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  mivoStartMic: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  mivoStartText: { fontFamily: fonts.headingBold, fontSize: 15.5, color: '#1E1B4B', letterSpacing: 0.2 },
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
  posterRow: { gap: 12, paddingRight: spacing.md, paddingBottom: 6 },
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
