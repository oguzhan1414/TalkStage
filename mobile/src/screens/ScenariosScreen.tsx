import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { resolveScenarioCategoryFallback } from '../assets/images';
import { Toast } from '../components/Toast';
import { SCENARIOS, type ScenarioEntry } from '@talkstage/shared-data/scenariosData';
import { InteractiveVideoScenarioModal } from '../components/InteractiveVideoScenarioModal';
import { CEFR_LEVELS } from '../constants/cefr';
import { SCENARIO_CATEGORIES, type ScenarioCategory } from '../constants/categories';
import { api } from '../lib/api';
import { haptics } from '../lib/haptics';
import { resolveMediaUrl } from '../lib/media';
import type { MainTabScreenProps } from '../navigation/types';
import { colors, fonts, radii, shadow, spacing } from '../theme/tokens';
import type { ProfileOut, ScenarioOut, SessionOut } from '../types/api';

export function ScenariosScreen({ navigation }: MainTabScreenProps<'Scenarios'>) {
  // "3D Sahne" only ever shows the ~11 video-ready scenarios (filtered from
  // the static shared-data set below) — the real backend catalog (`GET
  // /scenarios`, ~19 scenes) has no browsing UI at all since this screen was
  // redesigned around video. `catalogMode` restores that access as a second
  // mode on the same screen instead of a new nav route.
  const [catalogMode, setCatalogMode] = useState<'video' | 'all'>('video');
  const [videoCharacterFilter, setVideoCharacterFilter] = useState<string>('all');
  const [videoLevelFilter, setVideoLevelFilter] = useState<string>('all');
  const [videoSearch, setVideoSearch] = useState<string>('');
  const [selectedVideoScenario, setSelectedVideoScenario] = useState<ScenarioEntry | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [catalogSearch, setCatalogSearch] = useState('');
  const [catalogCategory, setCatalogCategory] = useState<ScenarioCategory | 'all'>('all');
  const [catalogLevel, setCatalogLevel] = useState<string>('all');
  const [catalogCoverErrorIds, setCatalogCoverErrorIds] = useState<Set<string>>(new Set());
  // Per-card real load-failure tracking — the cover `source` used to be
  // decided purely by whether `coverImage` was a non-empty string, so a real
  // network/server failure at runtime (not just a missing field) rendered a
  // permanently broken image instead of falling back to a category photo.
  const [coverLoadErrorIds, setCoverLoadErrorIds] = useState<Set<string>>(new Set());

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1600);
  };

  const { data: profile } = useQuery({
    queryKey: ['me'],
    queryFn: () => api.get<ProfileOut>('/me'),
  });

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
    if (catalogCategory !== 'all' && sc.category !== catalogCategory) return false;
    if (catalogLevel !== 'all' && sc.cefr_level !== catalogLevel) return false;
    if (!catalogSearchLower) return true;
    return (
      sc.title.toLowerCase().includes(catalogSearchLower) ||
      (sc.description ?? '').toLowerCase().includes(catalogSearchLower)
    );
  });

  // 3D Pixar video scenarios (only those with videoReady: true and actual videoSteps)
  const readyVideoScenarios = SCENARIOS.filter(
    (s) => s.videoSteps && s.videoSteps.length > 0 && s.videoReady
  );

  const videoSearchLower = videoSearch.trim().toLowerCase();
  const filteredVideoScenarios = readyVideoScenarios.filter((sc) => {
    if (videoCharacterFilter !== 'all' && sc.aiName !== videoCharacterFilter) return false;
    if (videoLevelFilter !== 'all' && sc.level !== videoLevelFilter) return false;
    if (!videoSearchLower) return true;
    return (
      sc.title.toLowerCase().includes(videoSearchLower) ||
      sc.titleTr.toLowerCase().includes(videoSearchLower) ||
      sc.description.toLowerCase().includes(videoSearchLower) ||
      sc.aiName.toLowerCase().includes(videoSearchLower)
    );
  });

  const videoCharacterList = [
    { id: 'all', name: 'Tümü', emoji: '✨', role: 'Tüm Karakterler', count: readyVideoScenarios.length },
    { id: 'Yankı', name: 'Yankı', emoji: '☕', role: 'Konuşma Partnerin', count: readyVideoScenarios.filter((s) => s.aiName === 'Yankı').length },
    { id: 'Oliver', name: 'Oliver', emoji: '🛎️', role: 'Otel Resepsiyonisti', count: readyVideoScenarios.filter((s) => s.aiName === 'Oliver').length },
    { id: 'Sam', name: 'Sam', emoji: '🚕', role: 'Londra Taksi Şoförü', count: readyVideoScenarios.filter((s) => s.aiName === 'Sam').length },
    { id: 'Marco', name: 'Marco', emoji: '🍝', role: 'İtalyan Şef & Garson', count: readyVideoScenarios.filter((s) => s.aiName === 'Marco').length },
    { id: 'Dr. Emma', name: 'Dr. Emma', emoji: '🩺', role: 'Aile Hekimi & Doktor', count: readyVideoScenarios.filter((s) => s.aiName === 'Dr. Emma').length },
    { id: 'Sarah', name: 'Sarah', emoji: '💼', role: 'İK Yöneticisi & Mülakatçı', count: readyVideoScenarios.filter((s) => s.aiName === 'Sarah').length },
    { id: 'Coach Leo', name: 'Leo', emoji: '🏋️‍♂️', role: 'Fitness Antrenörü', count: readyVideoScenarios.filter((s) => s.aiName === 'Coach Leo').length },
    { id: 'Mia', name: 'Mia', emoji: '🛍️', role: 'Moda Danışmanı & Butik', count: readyVideoScenarios.filter((s) => s.aiName === 'Mia').length },
    { id: 'Ela', name: 'Ela', emoji: '🕌', role: 'İstanbul Rehberi', count: readyVideoScenarios.filter((s) => s.aiName === 'Ela').length },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <View style={styles.headerTopRow}>
          <View style={styles.headerTitleCol}>
            <View style={styles.headerBadgeRow}>
              <View style={styles.livePulseDot} />
              <Text style={styles.headerBadgeText}>SERBEST PRATİK & 3D SAHNELER</Text>
            </View>
            <Text style={styles.title}>Pratik Merkezi 🎯</Text>
            <Text style={styles.subtitle}>
              Özgürce konuş, 3D sahnelerde rol yap ve kendini geliştir
            </Text>
          </View>
          <View style={styles.headerStatsCol}>
            <View style={styles.headerStatPill}>
              <Ionicons name="sparkles" size={12} color="#F59E0B" />
              <Text style={styles.headerStatText}>{readyVideoScenarios.length} Canlı Sahne</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Quick Sandbox Navigation Row */}
      <View style={{ paddingHorizontal: 16, marginBottom: 10, marginTop: 4 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
          <Pressable
            onPress={() => {
              haptics.impact();
              (navigation as any).navigate('BurgerOrderLive');
            }}
            style={{
              backgroundColor: '#FFF7ED',
              borderRadius: 12,
              paddingHorizontal: 12,
              paddingVertical: 7,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              borderWidth: 1,
              borderColor: '#FED7AA',
            }}
          >
            <Text style={{ fontSize: 13 }}>🍔</Text>
            <Text style={{ fontSize: 12, fontFamily: fonts.headingBold, color: '#C2410C' }}>
              Maya's Burgers
            </Text>
          </Pressable>

          <Pressable
            onPress={() => {
              haptics.impact();
              (navigation as any).navigate('TextChat', {
                focusTopic: { title: 'Maya ile Serbest Sohbet' },
              });
            }}
            style={{
              backgroundColor: '#EEF2FF',
              borderRadius: 12,
              paddingHorizontal: 12,
              paddingVertical: 7,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              borderWidth: 1,
              borderColor: '#C7D2FE',
            }}
          >
            <Ionicons name="chatbubbles-outline" size={14} color="#4F46E5" />
            <Text style={{ fontSize: 12, fontFamily: fonts.headingBold, color: '#4338CA' }}>
              Serbest Sohbet
            </Text>
          </Pressable>

          <Pressable
            onPress={() => {
              haptics.impact();
              (navigation as any).navigate('PodcastList');
            }}
            style={{
              backgroundColor: '#FDF4FF',
              borderRadius: 12,
              paddingHorizontal: 12,
              paddingVertical: 7,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              borderWidth: 1,
              borderColor: '#F5D0FE',
            }}
          >
            <Ionicons name="mic-outline" size={14} color="#A21CAF" />
            <Text style={{ fontSize: 12, fontFamily: fonts.headingBold, color: '#86198F' }}>
              Podcastler
            </Text>
          </Pressable>

          <Pressable
            onPress={() => {
              haptics.impact();
              (navigation as any).navigate('ReadingList');
            }}
            style={{
              backgroundColor: '#F0FDF4',
              borderRadius: 12,
              paddingHorizontal: 12,
              paddingVertical: 7,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              borderWidth: 1,
              borderColor: '#BBF7D0',
            }}
          >
            <Ionicons name="book-outline" size={14} color="#15803D" />
            <Text style={{ fontSize: 12, fontFamily: fonts.headingBold, color: '#166534' }}>
              Okuma Parçaları
            </Text>
          </Pressable>
        </ScrollView>
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
          <Text style={[styles.modeToggleText, catalogMode === 'video' && styles.modeToggleTextActive]}>
            🎬 3D Sahneler
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            haptics.selection();
            setCatalogMode('all');
          }}
          style={[styles.modeToggleBtn, catalogMode === 'all' && styles.modeToggleBtnActive]}
        >
          <Text style={[styles.modeToggleText, catalogMode === 'all' && styles.modeToggleTextActive]}>
            📋 Tüm Sahneler
          </Text>
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
              placeholder="Sahne ara (başlık veya açıklama)"
              placeholderTextColor={colors.textMuted}
              style={styles.videoSearchInput}
            />
            {catalogSearch.length > 0 && (
              <Pressable onPress={() => setCatalogSearch('')} hitSlop={8}>
                <Ionicons name="close-circle" size={16} color={colors.textMuted} />
              </Pressable>
            )}
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.catalogChipScroll}
          >
            {(
              [{ id: 'all' as const, label: 'Tümü' }, ...SCENARIO_CATEGORIES] as {
                id: ScenarioCategory | 'all';
                label: string;
              }[]
            ).map((cat) => {
              const isActive = catalogCategory === cat.id;
              const count =
                cat.id === 'all'
                  ? (allScenarios ?? []).length
                  : (allScenarios ?? []).filter((s) => s.category === cat.id).length;
              return (
                <Pressable
                  key={cat.id}
                  onPress={() => {
                    haptics.selection();
                    setCatalogCategory(cat.id);
                  }}
                  style={[styles.catalogChip, isActive && styles.catalogChipActive]}
                >
                  <Text style={[styles.catalogChipText, isActive && styles.catalogChipTextActive]}>
                    {cat.label} ({count})
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

          <View style={styles.videoLevelFilterRow}>
            {(['all', ...CEFR_LEVELS] as const).map((lvl) => {
              const isActive = catalogLevel === lvl;
              return (
                <Pressable
                  key={lvl}
                  onPress={() => {
                    haptics.selection();
                    setCatalogLevel(lvl);
                  }}
                  style={[styles.videoLevelBtn, isActive && styles.videoLevelBtnActive]}
                >
                  <Text style={[styles.videoLevelText, isActive && styles.videoLevelTextActive]}>
                    {lvl === 'all' ? '✨ Tüm Seviyeler' : lvl}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {filteredCatalogScenarios.length === 0 ? (
            <View style={styles.cinemaEmptyState}>
              <Ionicons name="albums-outline" size={40} color={colors.textMuted} />
              <Text style={styles.cinemaEmptyTitle}>
                {(allScenarios ?? []).length === 0 ? 'Henüz sahne yok' : 'Aramanıza uygun sahne bulunamadı'}
              </Text>
            </View>
          ) : (
            <View style={styles.catalogCardsList}>
              {filteredCatalogScenarios.map((sc) => {
                const tried = triedScenarioIds.has(sc.id);
                const coverFailed = catalogCoverErrorIds.has(sc.id);
                return (
                  <Pressable
                    key={sc.id}
                    onPress={() => {
                      haptics.success();
                      navigation.navigate('LiveConversationRoom', {
                        scenarioId: sc.id,
                        scenarioSlug: sc.slug,
                        scenarioTitle: sc.title,
                      });
                    }}
                    style={[styles.catalogCard, shadow.card]}
                  >
                    <Image
                      source={
                        sc.cover_image_url && !coverFailed
                          ? { uri: sc.cover_image_url }
                          : resolveScenarioCategoryFallback(sc.category)
                      }
                      onError={() => setCatalogCoverErrorIds((prev) => new Set(prev).add(sc.id))}
                      style={styles.catalogCardCover}
                      resizeMode="cover"
                    />
                    <View style={styles.catalogCardBody}>
                      <View style={styles.catalogCardTopRow}>
                        <Text style={styles.catalogCardTitle} numberOfLines={1}>
                          {sc.title}
                        </Text>
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
                          <Ionicons name="time-outline" size={11} color={colors.textMuted} /> {sc.estimated_minutes} dk
                        </Text>
                        {tried ? (
                          <View style={styles.catalogTriedBadge}>
                            <Ionicons name="checkmark-circle" size={11} color="#10B981" />
                            <Text style={styles.catalogTriedText}>Daha önce denedin</Text>
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
        {/* 1. SEARCH BAR FOR 3D SCENES */}
        <View style={styles.videoSearchBox}>
          <Ionicons name="search" size={16} color={colors.textMuted} />
          <TextInput
            value={videoSearch}
            onChangeText={setVideoSearch}
            placeholder="3D sahne veya karakter ara (otel, taksi, kahve...)"
            placeholderTextColor={colors.textMuted}
            style={styles.videoSearchInput}
          />
          {videoSearch.length > 0 && (
            <Pressable onPress={() => setVideoSearch('')} hitSlop={8}>
              <Ionicons name="close-circle" size={16} color={colors.textMuted} />
            </Pressable>
          )}
        </View>

        {/* 2. CHARACTER AVATAR FILTER ROW */}
        <View style={styles.characterSectionHeaderRow}>
          <View style={styles.characterSectionHeaderLeft}>
            <Text style={styles.characterSectionTitle}>👥 Karakter Seçimi</Text>
            <Text style={styles.characterSectionHint}>Filtrelemek istediğin karaktere dokun</Text>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.characterFilterScroll}
        >
          {videoCharacterList.map((char) => {
            const isActive = videoCharacterFilter === char.id;
            return (
              <Pressable
                key={char.id}
                onPress={() => {
                  haptics.selection();
                  setVideoCharacterFilter(char.id);
                }}
                style={[
                  styles.characterFilterChip,
                  isActive && styles.characterFilterChipActive,
                  shadow.card,
                ]}
              >
                <View style={[styles.characterEmojiBox, isActive && styles.characterEmojiBoxActive]}>
                  <Text style={styles.characterEmojiText}>{char.emoji}</Text>
                </View>
                <View style={styles.characterTextCol}>
                  <View style={styles.characterNameRow}>
                    <Text style={[styles.characterNameText, isActive && styles.characterNameTextActive]}>
                      {char.name}
                    </Text>
                    <View style={[styles.characterCountBadge, isActive && styles.characterCountBadgeActive]}>
                      <Text style={[styles.characterCountText, isActive && styles.characterCountTextActive]}>
                        {char.count}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.characterRoleSubtext} numberOfLines={1}>
                    {char.role}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* 3. LEVEL QUICK FILTER PILLS */}
        <View style={styles.videoLevelFilterRow}>
          {(['all', 'A1', 'A2', 'B1'] as const).map((lvl) => {
            const isActive = videoLevelFilter === lvl;
            return (
              <Pressable
                key={lvl}
                onPress={() => {
                  haptics.selection();
                  setVideoLevelFilter(lvl);
                }}
                style={[
                  styles.videoLevelBtn,
                  isActive && styles.videoLevelBtnActive,
                ]}
              >
                <Text
                  style={[
                    styles.videoLevelText,
                    isActive && styles.videoLevelTextActive,
                  ]}
                >
                  {lvl === 'all' ? '✨ Tüm Seviyeler' : `${lvl} Seviyesi`}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* 4. 3D CINEMA CARDS LIST */}
        {filteredVideoScenarios.length === 0 ? (
          <View style={styles.cinemaEmptyState}>
            <Ionicons name="film-outline" size={40} color={colors.textMuted} />
            <Text style={styles.cinemaEmptyTitle}>Aramanıza uygun 3D sahne bulunamadı</Text>
            <Text style={styles.cinemaEmptyDesc}>
              Filtreleri sıfırlayarak tüm 3D video senaryolarını görüntüleyebilirsiniz.
            </Text>
            <Pressable
              onPress={() => {
                setVideoCharacterFilter('all');
                setVideoLevelFilter('all');
                setVideoSearch('');
              }}
              style={styles.cinemaResetBtn}
            >
              <Text style={styles.cinemaResetBtnText}>Filtreleri Sıfırla</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.cinemaCardsList}>
            {filteredVideoScenarios.map((sc) => {
              const coverUrl = sc.coverImage ? resolveMediaUrl(sc.coverImage) : null;
              const coverFailed = coverLoadErrorIds.has(sc.id);
              const stepCount = sc.videoSteps?.length ?? 6;

              return (
                <Pressable
                  key={sc.id}
                  onPress={() => {
                    haptics.success();
                    setSelectedVideoScenario(sc);
                  }}
                  style={[styles.cinemaCard, shadow.card]}
                >
                  {/* Media Cover Box */}
                  <View style={styles.cinemaCoverBox}>
                    <Image
                      source={
                        coverUrl && !coverFailed
                          ? { uri: coverUrl }
                          : resolveScenarioCategoryFallback(sc.category)
                      }
                      onError={() =>
                        setCoverLoadErrorIds((prev) => new Set(prev).add(sc.id))
                      }
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
                        <View style={styles.cinemaLevelBadge}>
                          <Text style={styles.cinemaLevelText}>{sc.level}</Text>
                        </View>
                        <View style={styles.cinemaDurationBadge}>
                          <Ionicons name="time-outline" size={11} color="#E2E8F0" />
                          <Text style={styles.cinemaDurationText}>{sc.durationMin} dk</Text>
                        </View>
                      </View>
                    </View>

                    {/* Centered Glowing Play Button */}
                    <View style={styles.cinemaPlayCenter}>
                      <View style={styles.cinemaPlayCircleGlow}>
                        <View style={styles.cinemaPlayCircle}>
                          <Ionicons name="play" size={24} color="#FFFFFF" style={{ marginLeft: 3 }} />
                        </View>
                      </View>
                    </View>

                    {/* Bottom Features Strip */}
                    <View style={styles.cinemaCoverBottomStrip}>
                      <View style={styles.cinemaStepPill}>
                        <Ionicons name="checkmark-circle" size={13} color="#10B981" />
                        <Text style={styles.cinemaStepPillText}>
                          {stepCount} Adımlı 3D Pixar Diyaloğu
                        </Text>
                      </View>
                      <View style={styles.cinemaXpMiniTag}>
                        <Text style={styles.cinemaXpMiniText}>+{stepCount * 10} XP</Text>
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
                      <View style={styles.cinemaLaunchButton}>
                        <Ionicons name="play-circle" size={18} color="#FFFFFF" />
                        <Text style={styles.cinemaLaunchButtonText}>
                          Canlı Sahneyi Oyna (+{stepCount * 10} XP)
                        </Text>
                        <Ionicons name="arrow-forward" size={15} color="#FFFFFF" />
                      </View>
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
          showToast(`🏆 Harika! 3D senaryoyu tamamladın (+${earnedXp} XP)`);
          setSelectedVideoScenario(null);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    gap: 6,
    marginBottom: spacing.md,
  },
  videoLevelBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radii.pill,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
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
