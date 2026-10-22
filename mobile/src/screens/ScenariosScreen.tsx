import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useQuery } from '@tanstack/react-query';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, useWindowDimensions, View } from 'react-native';

import { resolveScenarioCoverSource } from '../assets/images';
import { AppHeader } from '../components/AppHeader';
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
  levelToFinishFor,
  loadSceneStars,
  pickSceneOfTheDay,
  type SceneStars,
  sceneAccess,
} from '../lib/sceneProgress';
import type { MainTabScreenProps } from '../navigation/types';
import { colors, fonts, radii, spacing } from '../theme/tokens';
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
  const stageSections = STAGE_IDS.map((id) => ({
    id,
    scenes: filteredVideoScenarios
      .filter((sc) => stageOfLevel(sc.level) === id)
      .sort((a, b) => CEFR_LEVELS.indexOf(a.level) - CEFR_LEVELS.indexOf(b.level)),
  })).filter((sec) => sec.scenes.length > 0);
  const posterWidth = Math.round(Math.min(190, screenWidth * 0.42));

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />

      {/* Başlık: ad, izlenen sahne sayısı ve arama */}
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{t("Sahneler")}</Text>
          <Text style={styles.subtitle}>{t("Gerçek hayat senaryolarında pratik yap")}</Text>
        </View>
        {readyVideoScenarios.length > 0 ? (
          <View style={styles.starsChip}>
            <Ionicons name="checkmark-circle" size={15} color={colors.success} />
            <Text style={styles.starsChipText}>
              {watchedCount}/{readyVideoScenarios.length}
            </Text>
          </View>
        ) : null}
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
        {/* Senin için sıradaki: büyük afiş */}
        {nextScene && !videoSearchLower ? (
          <SceneHero
            cover={resolveScenarioCoverSource(nextScene)}
            eyebrow={starsOf(nextScene.id) > 0 ? t("TEKRAR İZLE") : t("SENİN İÇİN SIRADAKİ")}
            title={nextScene.titleTr}
            character={nextScene.aiName}
            role={nextScene.aiRole}
            minutes={nextScene.durationMin}
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
                  <Text style={[styles.sectionTitle, { color: STAGE_COLOR[sec.id] }]}>{stageTitle(sec.id)}</Text>
                  <View style={{ flex: 1 }} />
                  <Text style={styles.sectionCount}>
                    {t("{{played}}/{{total}} sahne izlendi", { played, total: sec.scenes.length })}
                  </Text>
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
                        watched={stars > 0}
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
        onComplete={(earnedXp) => {
          if (selectedVideoScenario) {
            const id = selectedVideoScenario.id;
            setLearningFlag(`${SCENE_FLAG_PREFIX}${id}`);
            setSceneStars((prev) => ({ ...prev, [id]: Math.max(prev[id] ?? 0, 1) as 1 | 2 | 3 }));
          }
          showToast(t("🏆 Harika! 3D senaryoyu tamamladın (+{{earnedXp}} XP)", { earnedXp }));
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  sectionCount: { fontFamily: fonts.headingSemiBold, fontSize: 11.5, color: colors.textMuted },
  sectionHead: { flexDirection: 'row', alignItems: 'baseline', gap: 8, marginBottom: 10 },
  sectionTitle: { fontFamily: fonts.headingBold, fontSize: 20 },
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
