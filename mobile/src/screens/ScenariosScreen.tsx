import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { resolveScenarioCoverSource } from '../assets/images';
import { AppHeader } from '../components/AppHeader';
import { Toast } from '../components/Toast';
import { SCENARIOS, type ScenarioEntry } from '@talkstage/shared-data/scenariosData';
import { InteractiveVideoScenarioModal } from '../components/InteractiveVideoScenarioModal';
import { CEFR_LEVELS } from '../constants/cefr';
import { api } from '../lib/api';
import { haptics } from '../lib/haptics';
import { pullLearningFlags, setLearningFlag } from '../lib/learningFlags';
import { buildScenePayload, pickTwist } from '../lib/sceneTwists';
import {
  SCENE_FLAG_PREFIX,
  levelToFinishFor,
  loadSceneStars,
  pickSceneOfTheDay,
  type SceneStars,
  sceneAccess,
} from '../lib/sceneProgress';
import type { MainTabScreenProps } from '../navigation/types';
import { colors, fonts, radii, shadow, spacing } from '../theme/tokens';
import type { ProfileOut, ScenarioOut, SessionOut } from '../types/api';
import { t } from '../i18n';

export function ScenariosScreen({ navigation, route }: MainTabScreenProps<'Scenarios'>) {
  // "3D Sahne" only ever shows the ~11 video-ready scenarios (filtered from
  // the static shared-data set below) — the real backend catalog (`GET
  // /scenarios`, ~19 scenes) has no browsing UI at all since this screen was
  // redesigned around video. `catalogMode` restores that access as a second
  // mode on the same screen instead of a new nav route.
  const [catalogMode, setCatalogMode] = useState<'video' | 'all'>('video');
  const [videoLevelFilter, setVideoLevelFilter] = useState<string>('all');
  const [videoSearch, setVideoSearch] = useState<string>('');
  const [selectedVideoScenario, setSelectedVideoScenario] = useState<ScenarioEntry | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [catalogSearch, setCatalogSearch] = useState('');
  const [catalogLevel, setCatalogLevel] = useState<string>('all');
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
      showToast(t("🔒 {{lvl}} seviyesini bitirince açılır", { lvl: levelToFinishFor(sc.level) }));
      return;
    }
    haptics.success();
    setSelectedVideoScenario(sc);
  };

  // Live variation: Mivo plays the scene's character with a fresh "twist" each
  // time (video = intro, live = the replayable core; stars reward repeating).
  const startLive = async (sc: ScenarioEntry) => {
    if (sceneAccess(sc.level, userLevel) === 'locked') {
      haptics.selection();
      showToast(t("🔒 {{lvl}} seviyesini bitirince açılır", { lvl: levelToFinishFor(sc.level) }));
      return;
    }
    haptics.success();
    const twist = await pickTwist(sc);
    setSelectedVideoScenario(null);
    navigation.navigate('FreeChatRoom', {
      scene: buildScenePayload(sc, twist),
      twistTitle: twist.title,
      twistEmoji: twist.emoji,
      twistHint: twist.hint,
    });
  };

  // Home's "Günün Sahnesi" card deep-links here with the scene to start.
  const openSceneId = route.params?.openSceneId;
  useEffect(() => {
    if (!openSceneId) return;
    const sc = readyVideoScenarios.find((s) => s.id === openSceneId);
    navigation.setParams({ openSceneId: undefined });
    if (sc && sceneAccess(sc.level, userLevel) !== 'locked') {
      setCatalogMode('video');
      // Zaten oynanmış sahne: doğrudan canlı versiyona (yıldız toplamak için); değilse önce video.
      loadSceneStars([sc.id]).then((st) => {
        if ((st[sc.id] ?? 0) > 0) void startLive(sc);
        else setSelectedVideoScenario(sc);
      });
    }
  }, [openSceneId, readyVideoScenarios, userLevel, navigation]);

  const { data: allScenarios } = useQuery({
    queryKey: ['scenarios'],
    queryFn: () => api.get<ScenarioOut[]>('/scenarios'),
    enabled: catalogMode === 'all',
  });

  const { data: pastSessions } = useQuery({
    queryKey: ['sessions'],
    queryFn: () => api.get<SessionOut[]>('/sessions'),
    enabled: catalogMode === 'all',
  });
  const triedScenarioIds = new Set((pastSessions ?? []).map((s) => s.scenario_id));

  const catalogSearchLower = catalogSearch.trim().toLowerCase();
  const filteredCatalogScenarios = (allScenarios ?? []).filter((sc) => {
    if (catalogLevel !== 'all' && sc.cefr_level !== catalogLevel) return false;
    if (!catalogSearchLower) return true;
    return (
      sc.title.toLowerCase().includes(catalogSearchLower) ||
      (sc.description ?? '').toLowerCase().includes(catalogSearchLower)
    );
  });

  const videoSearchLower = videoSearch.trim().toLowerCase();
  const filteredVideoScenarios = readyVideoScenarios.filter((sc) => {
    if (videoLevelFilter !== 'all' && sc.level !== videoLevelFilter) return false;
    if (!videoSearchLower) return true;
    return (
      sc.title.toLowerCase().includes(videoSearchLower) ||
      sc.titleTr.toLowerCase().includes(videoSearchLower) ||
      sc.description.toLowerCase().includes(videoSearchLower) ||
      sc.aiName.toLowerCase().includes(videoSearchLower)
    );
  });

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />

      {/* Top Header — deliberately minimal (AppHeader above already carries
          identity/streak/XP; this just names the screen). */}
      <View style={styles.header}>
        <Text style={styles.title}>{t("Sahneler")}</Text>
        <Text style={styles.subtitle}>{t("Gerçek hayat senaryolarında pratik yap")}</Text>
      </View>

      {/* Mode toggle — "3D Sahne" (video-ready subset) vs "Tüm Sahneler"
          (the full real backend catalog, otherwise unreachable anywhere). */}
      <View style={styles.modeToggleRow}>
        <Pressable
          onPress={() => {
            haptics.selection();
            setCatalogMode('video');
          }}
          style={[styles.modeToggleBtn, catalogMode === 'video' && styles.modeToggleBtnActive]}
        >
          <Text style={[styles.modeToggleText, catalogMode === 'video' && styles.modeToggleTextActive]}>{t("Video senaryoları")}</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            haptics.selection();
            setCatalogMode('all');
          }}
          style={[styles.modeToggleBtn, catalogMode === 'all' && styles.modeToggleBtnActive]}
        >
          <Text style={[styles.modeToggleText, catalogMode === 'all' && styles.modeToggleTextActive]}>{t("Tüm senaryolar")}</Text>
        </Pressable>
      </View>

      {catalogMode === 'all' ? (
        <ScrollView
          contentContainerStyle={styles.cinemaScrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.videoSearchBox}>
            <Ionicons name="search" size={16} color={colors.textMuted} />
            <TextInput
              value={catalogSearch}
              onChangeText={setCatalogSearch}
              placeholder={t("Sahne ara (başlık veya açıklama)")}
              placeholderTextColor={colors.textMuted}
              style={styles.videoSearchInput}
            />
            {catalogSearch.length > 0 && (
              <Pressable onPress={() => setCatalogSearch('')} hitSlop={8}>
                <Ionicons name="close-circle" size={16} color={colors.textMuted} />
              </Pressable>
            )}
          </View>

          <View style={styles.videoLevelFilterRow}>
            {(['all', ...CEFR_LEVELS] as const).map((lvl) => {
              const isActive = catalogLevel === lvl;
              const isAll = lvl === 'all';
              return (
                <Pressable
                  key={lvl}
                  onPress={() => {
                    haptics.selection();
                    setCatalogLevel(lvl);
                  }}
                  style={[
                    styles.videoLevelBtn,
                    isAll && styles.videoLevelBtnAll,
                    isActive && styles.videoLevelBtnActive,
                  ]}
                  accessibilityRole="button"
                  accessibilityLabel={isAll ? t("Tüm seviyeler") : t("{{lvl}} seviyesi", { lvl })}
                >
                  {isAll ? (
                    <Ionicons
                      name="apps-outline"
                      size={15}
                      color={isActive ? '#FFFFFF' : colors.textMuted}
                    />
                  ) : (
                    <Text style={[styles.videoLevelText, isActive && styles.videoLevelTextActive]}>
                      {lvl}
                    </Text>
                  )}
                </Pressable>
              );
            })}
          </View>

          {filteredCatalogScenarios.length === 0 ? (
            <View style={styles.cinemaEmptyState}>
              <Ionicons name="albums-outline" size={40} color={colors.textMuted} />
              <Text style={styles.cinemaEmptyTitle}>
                {(allScenarios ?? []).length === 0 ? t("Henüz sahne yok") : t("Aramanıza uygun sahne bulunamadı")}
              </Text>
            </View>
          ) : (
            <View style={styles.catalogCardsList}>
              {filteredCatalogScenarios.map((sc) => {
                const tried = triedScenarioIds.has(sc.id);
                const access = sceneAccess(sc.cefr_level, userLevel);
                return (
                  <Pressable
                    key={sc.id}
                    onPress={() => {
                      if (access === 'locked') {
                        haptics.selection();
                        showToast(t("🔒 {{lvl}} seviyesini bitirince açılır", { lvl: levelToFinishFor(sc.cefr_level) }));
                        return;
                      }
                      haptics.success();
                      navigation.navigate('LiveConversationRoom', {
                        scenarioId: sc.id,
                        scenarioSlug: sc.slug,
                        scenarioTitle: sc.title,
                      });
                    }}
                    style={[styles.catalogCard, shadow.card, access === 'locked' && styles.lockedCard]}
                  >
                    <Image
                      source={resolveScenarioCoverSource(sc)}
                      style={styles.catalogCardCover}
                      resizeMode="cover"
                    />
                    <View style={styles.catalogCardBody}>
                      <View style={styles.catalogCardTopRow}>
                        <Text style={styles.catalogCardTitle} numberOfLines={1}>
                          {sc.title}
                        </Text>
                        {access === 'locked' ? (
                          <Ionicons name="lock-closed" size={14} color="#94A3B8" />
                        ) : null}
                        {access === 'hard' ? (
                          <View style={styles.hardBadge}>
                            <Text style={styles.hardBadgeText}>{t("zor")}</Text>
                          </View>
                        ) : null}
                        {sc.cefr_level ? (
                          <View style={styles.catalogLevelBadge}>
                            <Text style={styles.catalogLevelBadgeText}>{sc.cefr_level}</Text>
                          </View>
                        ) : null}
                      </View>
                      {sc.description ? (
                        <Text style={styles.catalogCardDesc} numberOfLines={2}>
                          {sc.description}
                        </Text>
                      ) : null}
                      <View style={styles.catalogCardFooterRow}>
                        <Text style={styles.catalogCardDuration}>
                          <Ionicons name="time-outline" size={11} color={colors.textMuted} />{" "}{t("{{estimated_minutes}} dk", { estimated_minutes: sc.estimated_minutes })}</Text>
                        {tried ? (
                          <View style={styles.catalogTriedBadge}>
                            <Ionicons name="checkmark-circle" size={11} color="#10B981" />
                            <Text style={styles.catalogTriedText}>{t("Daha önce denedin")}</Text>
                          </View>
                        ) : null}
                      </View>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          )}
        </ScrollView>
      ) : (
      <ScrollView
        contentContainerStyle={styles.cinemaScrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 0. SENİN İÇİN SIRADAKİ — bir sonraki sahne tek dokunuşla */}
        {nextScene && !videoSearchLower && videoLevelFilter === 'all' ? (
          <Pressable
            onPress={() => (starsOf(nextScene.id) > 0 ? startLive(nextScene) : openVideoScene(nextScene))}
            style={[styles.nextUpCard, shadow.card]}
            accessibilityRole="button"
          >
            <Image
              source={resolveScenarioCoverSource(nextScene)}
              style={styles.nextUpCover}
              resizeMode="cover"
            />
            <View style={styles.nextUpBody}>
              <Text style={styles.nextUpEyebrow}>
                {starsOf(nextScene.id) > 0 ? t("YILDIZ TOPLAMAYA DEVAM") : t("SENİN İÇİN SIRADAKİ")}
              </Text>
              <Text style={styles.nextUpTitle} numberOfLines={1}>
                {nextScene.titleTr}
              </Text>
              <Text style={styles.nextUpMeta} numberOfLines={1}>
                {nextScene.level} · {nextScene.aiName} · {t("{{durationMin}} dk", { durationMin: nextScene.durationMin })}
                {starsOf(nextScene.id) > 0 ? `  ${'⭐'.repeat(starsOf(nextScene.id))}` : ''}
              </Text>
            </View>
            <View style={styles.nextUpPlay}>
              <Ionicons name="play" size={18} color="#FFFFFF" style={{ marginLeft: 2 }} />
            </View>
          </Pressable>
        ) : null}

        {/* 1. SEARCH BAR FOR 3D SCENES */}
        <View style={styles.videoSearchBox}>
          <Ionicons name="search" size={16} color={colors.textMuted} />
          <TextInput
            value={videoSearch}
            onChangeText={setVideoSearch}
            placeholder={t("Senaryo veya karakter ara (otel, taksi, kahve...)")}
            placeholderTextColor={colors.textMuted}
            style={styles.videoSearchInput}
          />
          {videoSearch.length > 0 && (
            <Pressable onPress={() => setVideoSearch('')} hitSlop={8}>
              <Ionicons name="close-circle" size={16} color={colors.textMuted} />
            </Pressable>
          )}
        </View>

        {/* LEVEL QUICK FILTER PILLS — the only filter here now; character
            chips were removed to keep this screen from feeling cluttered. */}
        <View style={styles.videoLevelFilterRow}>
          {(['all', ...CEFR_LEVELS] as const).map((lvl) => {
            const isActive = videoLevelFilter === lvl;
            const isAll = lvl === 'all';
            return (
              <Pressable
                key={lvl}
                onPress={() => {
                  haptics.selection();
                  setVideoLevelFilter(lvl);
                }}
                style={[
                  styles.videoLevelBtn,
                  isAll && styles.videoLevelBtnAll,
                  isActive && styles.videoLevelBtnActive,
                ]}
                accessibilityRole="button"
                accessibilityLabel={isAll ? t("Tüm seviyeler") : t("{{lvl}} seviyesi", { lvl })}
              >
                {isAll ? (
                  <Ionicons
                    name="apps-outline"
                    size={15}
                    color={isActive ? '#FFFFFF' : colors.textMuted}
                  />
                ) : (
                  <Text
                    style={[
                      styles.videoLevelText,
                      isActive && styles.videoLevelTextActive,
                    ]}
                  >
                    {lvl}
                  </Text>
                )}
              </Pressable>
            );
          })}
        </View>

        {/* 4. 3D CINEMA CARDS LIST */}
        {filteredVideoScenarios.length === 0 ? (
          <View style={styles.cinemaEmptyState}>
            <Ionicons name="film-outline" size={40} color={colors.textMuted} />
            <Text style={styles.cinemaEmptyTitle}>{t("Aramanıza uygun senaryo bulunamadı")}</Text>
            <Text style={styles.cinemaEmptyDesc}>{t("Filtreleri sıfırlayarak tüm video senaryolarını görüntüleyebilirsiniz.")}</Text>
            <Pressable
              onPress={() => {
                setVideoLevelFilter('all');
                setVideoSearch('');
              }}
              style={styles.cinemaResetBtn}
            >
              <Text style={styles.cinemaResetBtnText}>{t("Filtreleri Sıfırla")}</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.cinemaCardsList}>
            {filteredVideoScenarios.map((sc) => {
              const stepCount = sc.videoSteps?.length ?? 6;
              const access = sceneAccess(sc.level, userLevel);
              const stars = starsOf(sc.id);
              const done = stars > 0;

              return (
                <Pressable
                  key={sc.id}
                  onPress={() => (done ? startLive(sc) : openVideoScene(sc))}
                  style={[styles.cinemaCard, shadow.card, access === 'locked' && styles.lockedCard]}
                >
                  {/* Media Cover Box */}
                  <View style={styles.cinemaCoverBox}>
                    <Image
                      source={resolveScenarioCoverSource(sc)}
                      style={styles.cinemaCoverImage}
                      resizeMode="cover"
                    />
                    <View style={styles.cinemaCoverDarkGradient} />

                    {/* Floating Badges */}
                    <View style={styles.cinemaTopBadgesRow}>
                      <View style={styles.cinemaCharacterBadge}>
                        <Text style={styles.cinemaCharEmoji}>{sc.emoji}</Text>
                        <Text style={styles.cinemaCharName}>{sc.aiName}</Text>
                        <Text style={styles.cinemaCharRole}>• {sc.aiRole}</Text>
                      </View>

                      <View style={styles.cinemaRightBadges}>
                        {access === 'hard' ? (
                          <View style={styles.hardBadge}>
                            <Text style={styles.hardBadgeText}>{t("zor")}</Text>
                          </View>
                        ) : null}
                        <View style={styles.cinemaLevelBadge}>
                          <Text style={styles.cinemaLevelText}>{sc.level}</Text>
                        </View>
                        <View style={styles.cinemaDurationBadge}>
                          <Ionicons name="time-outline" size={11} color="#E2E8F0" />
                          <Text style={styles.cinemaDurationText}>{t("{{durationMin}} dk", { durationMin: sc.durationMin })}</Text>
                        </View>
                      </View>
                    </View>

                    {/* Centered Glowing Play Button (lock overlay for sahneler 2+ seviye üstte) */}
                    <View style={styles.cinemaPlayCenter}>
                      {access === 'locked' ? (
                        <View style={styles.lockOverlay}>
                          <Ionicons name="lock-closed" size={26} color="#FFFFFF" />
                          <Text style={styles.lockOverlayText}>
                            {t("{{lvl}} bitince açılır", { lvl: levelToFinishFor(sc.level) })}
                          </Text>
                        </View>
                      ) : (
                        <View style={styles.cinemaPlayCircleGlow}>
                          <View style={styles.cinemaPlayCircle}>
                            <Ionicons name="play" size={24} color="#FFFFFF" style={{ marginLeft: 3 }} />
                          </View>
                        </View>
                      )}
                    </View>
                    {done ? (
                      <View style={styles.starsBadge}>
                        <Text style={styles.starsBadgeText}>
                          {'⭐'.repeat(stars)}{'☆'.repeat(3 - stars)}
                        </Text>
                      </View>
                    ) : null}

                    {/* Bottom Features Strip */}
                    <View style={styles.cinemaCoverBottomStrip}>
                      <View style={styles.cinemaStepPill}>
                        <Ionicons name="checkmark-circle" size={13} color="#10B981" />
                        <Text style={styles.cinemaStepPillText}>{t("{{stepCount}} adımlı interaktif diyalog", { stepCount })}</Text>
                      </View>
                      <View style={styles.cinemaXpMiniTag}>
                        <Text style={styles.cinemaXpMiniText}>+{stepCount * 10}{" "}{t("XP")}</Text>
                      </View>
                    </View>
                  </View>

                  {/* Card Body */}
                  <View style={styles.cinemaCardBody}>
                    <View style={styles.cinemaTitleRow}>
                      <Text style={styles.cinemaCardTitleTr} numberOfLines={1}>
                        {sc.titleTr}
                      </Text>
                      <Text style={styles.cinemaCardTitleEn} numberOfLines={1}>
                        {sc.title}
                      </Text>
                    </View>

                    <Text style={styles.cinemaCardDesc} numberOfLines={2}>
                      {sc.description}
                    </Text>

                    {/* Target Vocab / Phrases preview */}
                    {sc.suggestedVocab && sc.suggestedVocab.length > 0 && (
                      <View style={styles.cinemaVocabRow}>
                        {sc.suggestedVocab.slice(0, 3).map((v) => (
                          <View key={v.term} style={styles.cinemaVocabChip}>
                            <Text style={styles.cinemaVocabChipText}>
                              + {v.term} ({v.tr})
                            </Text>
                          </View>
                        ))}
                      </View>
                    )}

                    {/* Launch Action Button */}
                    <View style={styles.cinemaCardFooter}>
                      {done ? (
                        <View style={styles.liveRow}>
                          <View style={[styles.cinemaLaunchButton, { flex: 1 }]}>
                            <Text style={styles.cinemaLaunchButtonText}>
                              {stars >= 3 ? t("🎭 Yeni sürprizle oyna") : t("🎭 Mivo ile canlı oyna")}
                            </Text>
                            <Ionicons name="arrow-forward" size={15} color="#FFFFFF" />
                          </View>
                          <Pressable
                            onPress={() => openVideoScene(sc)}
                            style={styles.watchAgainBtn}
                            hitSlop={6}
                            accessibilityRole="button"
                            accessibilityLabel={t("Videoyu tekrar izle")}
                          >
                            <Ionicons name="play" size={16} color={colors.brand} />
                          </Pressable>
                        </View>
                      ) : (
                        <View style={styles.cinemaLaunchButton}>
                          <Ionicons name="play-circle" size={18} color="#FFFFFF" />
                          <Text style={styles.cinemaLaunchButtonText}>
                            {t("Canlı Sahneyi Oyna (+{{xp}} XP)", { xp: stepCount * 10 })}
                          </Text>
                          <Ionicons name="arrow-forward" size={15} color="#FFFFFF" />
                        </View>
                      )}
                    </View>
                  </View>
                </Pressable>
              );
            })}
          </View>
        )}
      </ScrollView>
      )}

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
          // Modal stays open on its "completed" screen: "Şimdi sen oyna" continues into the live scene.
        }}
        onPlayLive={selectedVideoScenario ? () => startLive(selectedVideoScenario) : undefined}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  /* Senin için sıradaki */
  nextUpCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: radii.lg,
    borderWidth: 1.5,
    borderColor: '#C7D2FE',
    padding: 10,
    marginBottom: spacing.md,
  },
  nextUpCover: { width: 64, height: 64, borderRadius: 14 },
  nextUpBody: { flex: 1 },
  nextUpEyebrow: {
    fontFamily: fonts.headingBold,
    fontSize: 10,
    letterSpacing: 0.6,
    color: colors.brand,
    marginBottom: 2,
  },
  nextUpTitle: { fontFamily: fonts.headingBold, fontSize: 16, color: colors.textHeading },
  nextUpMeta: { fontFamily: fonts.bodyRegular, fontSize: 11.5, color: colors.textMuted, marginTop: 2 },
  nextUpPlay: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* Yumuşak seviye kilidi / tamamlandı / zor */
  lockedCard: { opacity: 0.6 },
  lockOverlay: {
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(15, 23, 42, 0.72)',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  lockOverlayText: { fontFamily: fonts.headingSemiBold, fontSize: 12, color: '#FFFFFF' },
  starsBadge: {
    position: 'absolute',
    top: 46,
    right: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    borderRadius: radii.pill,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  starsBadgeText: { fontSize: 12, letterSpacing: 1 },
  liveRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  watchAgainBtn: {
    width: 44,
    height: 44,
    borderRadius: radii.lg,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hardBadge: {
    backgroundColor: '#FEF3C7',
    borderRadius: radii.pill,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  hardBadgeText: { fontFamily: fonts.headingBold, fontSize: 10, color: '#B45309' },

  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xs,
    paddingBottom: spacing.sm,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(226, 232, 240, 0.8)',
  },
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitleCol: {
    flex: 1,
  },
  headerBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  livePulseDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#10B981',
  },
  headerBadgeText: {
    fontFamily: fonts.headingBold,
    fontSize: 10,
    color: '#059669',
    letterSpacing: 0.5,
  },
  title: {
    fontFamily: fonts.headingBold,
    fontSize: 20,
    color: colors.textHeading,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 1,
  },
  headerStatsCol: {
    alignItems: 'flex-end',
  },
  headerStatPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FEF3C7',
    borderWidth: 1,
    borderColor: '#FDE68A',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.pill,
  },
  headerStatText: {
    fontFamily: fonts.headingBold,
    fontSize: 10.5,
    color: '#B45309',
  },

  /* 3D Video Cinema Studio Content */
  cinemaScrollContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: 110,
  },

  /* Search Box */
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

  /* Character Filter Section */
  characterSectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  characterSectionHeaderLeft: {
    gap: 1,
  },
  characterSectionTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 13,
    color: colors.textHeading,
  },
  characterSectionHint: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10.5,
    color: colors.textMuted,
  },
  characterFilterScroll: {
    gap: 8,
    paddingBottom: spacing.sm,
  },
  characterFilterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: radii.lg,
    paddingHorizontal: 10,
    paddingVertical: 7,
    gap: 8,
    minWidth: 110,
  },
  characterFilterChipActive: {
    borderColor: colors.brand,
    backgroundColor: '#EEF2FF',
  },
  characterEmojiBox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  characterEmojiBoxActive: {
    backgroundColor: '#E0E7FF',
  },
  characterEmojiText: {
    fontSize: 14,
  },
  characterTextCol: {
    flex: 1,
  },
  characterNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  characterNameText: {
    fontFamily: fonts.headingBold,
    fontSize: 12,
    color: colors.textHeading,
  },
  characterNameTextActive: {
    color: colors.brand,
  },
  characterCountBadge: {
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: radii.pill,
  },
  characterCountBadgeActive: {
    backgroundColor: colors.brand,
  },
  characterCountText: {
    fontFamily: fonts.headingBold,
    fontSize: 9,
    color: '#64748B',
  },
  characterCountTextActive: {
    color: '#FFFFFF',
  },
  characterRoleSubtext: {
    fontFamily: fonts.bodyRegular,
    fontSize: 9.5,
    color: colors.textMuted,
    marginTop: 1,
  },

  /* Level Quick Filter */
  videoLevelFilterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: spacing.md,
  },
  videoLevelBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radii.pill,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    minWidth: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoLevelBtnAll: {
    paddingHorizontal: 8,
  },
  videoLevelBtnActive: {
    backgroundColor: colors.brand,
    borderColor: colors.brand,
  },
  videoLevelText: {
    fontFamily: fonts.headingBold,
    fontSize: 11,
    color: colors.textMuted,
  },
  videoLevelTextActive: {
    color: '#FFFFFF',
  },

  /* Empty State */
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
  cinemaEmptyDesc: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11.5,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: 14,
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

  /* Cinema Cards List */
  cinemaCardsList: {
    gap: 16,
  },
  cinemaCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.xl,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: 'rgba(226, 232, 240, 0.9)',
  },
  cinemaCoverBox: {
    height: 185,
    width: '100%',
    position: 'relative',
    backgroundColor: '#0F172A',
  },
  cinemaCoverImage: {
    width: '100%',
    height: '100%',
  },
  cinemaCoverDarkGradient: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
  },
  cinemaTopBadgesRow: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cinemaCharacterBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: radii.pill,
  },
  cinemaCharEmoji: {
    fontSize: 12,
  },
  cinemaCharName: {
    fontFamily: fonts.headingBold,
    fontSize: 11,
    color: '#FFFFFF',
  },
  cinemaCharRole: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10,
    color: '#CBD5E1',
  },
  cinemaRightBadges: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  cinemaLevelBadge: {
    backgroundColor: colors.brand,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.pill,
  },
  cinemaLevelText: {
    fontFamily: fonts.mono,
    fontSize: 10.5,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  cinemaDurationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: radii.pill,
  },
  cinemaDurationText: {
    fontFamily: fonts.headingBold,
    fontSize: 10,
    color: '#E2E8F0',
  },
  cinemaPlayCenter: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cinemaPlayCircleGlow: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: 'rgba(79, 70, 229, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cinemaPlayCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.brand,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 6,
  },
  cinemaCoverBottomStrip: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cinemaStepPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.4)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.pill,
  },
  cinemaStepPillText: {
    fontFamily: fonts.headingBold,
    fontSize: 10,
    color: '#E2E8F0',
  },
  cinemaXpMiniTag: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: radii.pill,
  },
  cinemaXpMiniText: {
    fontFamily: fonts.headingBold,
    fontSize: 10,
    color: '#B45309',
  },

  /* Cinema Card Body */
  cinemaCardBody: {
    padding: spacing.md,
  },
  cinemaTitleRow: {
    marginBottom: 4,
  },
  cinemaCardTitleTr: {
    fontFamily: fonts.headingBold,
    fontSize: 15.5,
    color: colors.textHeading,
    letterSpacing: -0.2,
  },
  cinemaCardTitleEn: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11.5,
    color: colors.textMuted,
    marginTop: 1,
  },
  cinemaCardDesc: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: '#475569',
    lineHeight: 16.5,
    marginBottom: 10,
  },
  cinemaVocabRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    marginBottom: 12,
  },
  cinemaVocabChip: {
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: radii.sm,
  },
  cinemaVocabChipText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10.5,
    color: '#334155',
  },
  cinemaCardFooter: {
    marginTop: 2,
  },
  cinemaLaunchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.brand,
    paddingVertical: 11,
    borderRadius: radii.lg,
    gap: 6,
    borderBottomWidth: 3,
    borderBottomColor: '#3730A3',
  },
  cinemaLaunchButtonText: {
    fontFamily: fonts.headingBold,
    fontSize: 12.5,
    color: '#FFFFFF',
  },
  modeToggleRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xs,
    backgroundColor: '#FFFFFF',
  },
  modeToggleBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 9,
    borderRadius: radii.pill,
    backgroundColor: '#F1F5F9',
  },
  modeToggleBtnActive: {
    backgroundColor: colors.brand,
  },
  modeToggleText: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 12.5,
    color: colors.textMuted,
  },
  modeToggleTextActive: {
    color: '#FFFFFF',
  },
  catalogChipScroll: {
    gap: 8,
    paddingBottom: 2,
  },
  catalogChip: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: radii.pill,
  },
  catalogChipActive: {
    backgroundColor: colors.brand,
    borderColor: colors.brand,
  },
  catalogChipText: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 11.5,
    color: colors.textBody,
  },
  catalogChipTextActive: {
    color: '#FFFFFF',
  },
  catalogCardsList: {
    gap: spacing.sm,
  },
  catalogCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: radii.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  catalogCardCover: {
    width: 88,
    height: '100%',
    minHeight: 96,
  },
  catalogCardBody: {
    flex: 1,
    padding: spacing.sm,
    gap: 4,
  },
  catalogCardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 6,
  },
  catalogCardTitle: {
    flex: 1,
    fontFamily: fonts.headingBold,
    fontSize: 13.5,
    color: colors.textHeading,
  },
  catalogLevelBadge: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: radii.sm,
  },
  catalogLevelBadgeText: {
    fontFamily: fonts.mono,
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.brand,
  },
  catalogCardDesc: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11.5,
    color: colors.textMuted,
    lineHeight: 16,
  },
  catalogCardFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  catalogCardDuration: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10.5,
    color: colors.textMuted,
  },
  catalogTriedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  catalogTriedText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 10,
    color: '#047857',
  },
});
