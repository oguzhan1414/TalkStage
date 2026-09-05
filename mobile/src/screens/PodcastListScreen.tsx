import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { companionImage, podcastStudioWallpaper } from '../assets/images';
import { BouncyPressable } from '../components/BouncyPressable';
import { PODCAST_EPISODES, type PodcastEpisode } from '../data/podcastData';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { colors, fonts, radii, shadow, spacing } from '../theme/tokens';

type Props = NativeStackScreenProps<RootStackParamList, 'PodcastList'>;

const LEVEL_FILTERS: Array<'ALL' | 'A1' | 'A2' | 'B1' | 'B2'> = ['ALL', 'A1', 'A2', 'B1', 'B2'];

export function PodcastListScreen({ navigation }: Props) {
  const [selectedLevel, setSelectedLevel] = useState<'ALL' | 'A1' | 'A2' | 'B1' | 'B2'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEpisodes = useMemo(() => {
    let list = PODCAST_EPISODES;
    if (selectedLevel !== 'ALL') {
      list = list.filter((ep) => ep.level === selectedLevel);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter(
        (ep) =>
          ep.title.toLowerCase().includes(q) ||
          ep.description.toLowerCase().includes(q) ||
          ep.subtitle.toLowerCase().includes(q) ||
          ep.topicsCovered.some((t) => t.toLowerCase().includes(q)) ||
          ep.keyVocab.some(
            (v) =>
              v.term.toLowerCase().includes(q) ||
              v.meaningTr.toLowerCase().includes(q)
          ) ||
          ep.level.toLowerCase().includes(q)
      );
    }
    return list;
  }, [selectedLevel, searchQuery]);

  const featuredEpisode = PODCAST_EPISODES[0]; // A1 Cafe episode

  return (
    <View style={styles.container}>
      <ImageBackground source={podcastStudioWallpaper} style={styles.backgroundImage} resizeMode="cover">
        <View style={styles.backdropOverlay} />

        <SafeAreaView style={styles.safeArea}>
          {/* Header */}
          <View style={styles.topHeader}>
            <Pressable
              onPress={() => navigation.goBack()}
              hitSlop={12}
              style={[styles.circularBackBtn, shadow.card]}
            >
              <Ionicons name="chevron-back" size={20} color="#FFFFFF" />
            </Pressable>

            <View style={styles.headerTitleCol}>
              <Text style={styles.headerTitle}>TalkStage Podcasts</Text>
              <Text style={styles.headerSub}>Doğal Hızda Dinle • A1-B2 Masterclass</Text>
            </View>

            <View style={styles.headerRightBadge}>
              <Text style={styles.headerRightEmoji}>🎧</Text>
              <Text style={styles.headerRightText}>{PODCAST_EPISODES.length} Bölüm</Text>
            </View>
          </View>

          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            {/* 1. Search Bar */}
            <View style={[styles.searchBarWrapper, shadow.card]}>
              <Ionicons name="search" size={18} color="#94A3B8" style={{ marginRight: 8 }} />
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Bölüm veya konu ara (örn: cafe, hotel, interview)..."
                placeholderTextColor="#94A3B8"
                style={styles.searchInput}
                autoCorrect={false}
                clearButtonMode="while-editing"
              />
              {searchQuery.length > 0 && (
                <Pressable onPress={() => setSearchQuery('')} hitSlop={8}>
                  <Ionicons name="close-circle" size={18} color="#94A3B8" />
                </Pressable>
              )}
            </View>

            {/* 2. Hero Featured Podcast Banner (Only when not actively searching) */}
            {!searchQuery ? (
              <Pressable
                onPress={() => navigation.navigate('PodcastPlayer', { episodeId: featuredEpisode.id })}
                style={[styles.featuredCard, shadow.card]}
              >
                <Image source={featuredEpisode.coverImage} style={styles.featuredCover} resizeMode="cover" />
                <View style={styles.featuredOverlay}>
                  <View style={styles.featuredTopRow}>
                    <View style={styles.featuredTag}>
                      <Text style={styles.featuredTagText}>⭐ ÖNE ÇIKAN DERS</Text>
                    </View>
                    <View style={styles.levelBadgeMini}>
                      <Text style={styles.levelBadgeMiniText}>{featuredEpisode.levelLabel}</Text>
                    </View>
                  </View>

                  <View style={styles.featuredBodyCol}>
                    <Text style={styles.featuredTitle} numberOfLines={1}>
                      {featuredEpisode.title}
                    </Text>
                    <Text style={styles.featuredSub} numberOfLines={2}>
                      {featuredEpisode.description}
                    </Text>
                  </View>

                  <View style={styles.featuredFooterRow}>
                    <View style={styles.speakerRowMini}>
                      {featuredEpisode.speakers.map((s, idx) => (
                        <Image
                          key={idx}
                          source={s.avatar}
                          style={[styles.speakerAvatarMini, idx > 0 && { marginLeft: -6 }]}
                        />
                      ))}
                      <Text style={styles.speakerNamesText} numberOfLines={1}>
                        {featuredEpisode.speakers.filter(s => !s.name.includes('Sunucu')).map((s) => s.name).join(' & ')}
                      </Text>
                    </View>

                    <View style={styles.playBtnMini}>
                      <Ionicons name="play" size={13} color="#FFFFFF" />
                      <Text style={styles.playBtnMiniText}>Dinle ({featuredEpisode.durationLabel})</Text>
                    </View>
                  </View>
                </View>
              </Pressable>
            ) : null}

            {/* 3. CEFR Level Filter Pills */}
            <View style={styles.filterSection}>
              <Text style={styles.sectionHeading}>Seviyeye Göre Filtrele:</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterPillsRow}>
                {LEVEL_FILTERS.map((lvl) => {
                  const isActive = selectedLevel === lvl;
                  const count = lvl === 'ALL' ? PODCAST_EPISODES.length : PODCAST_EPISODES.filter(ep => ep.level === lvl).length;
                  const label =
                    lvl === 'ALL'
                      ? `🌐 Tümü (${count})`
                      : lvl === 'A1'
                      ? `🌱 A1 Başlangıç (${count})`
                      : lvl === 'A2'
                      ? `🧭 A2 Temel (${count})`
                      : lvl === 'B1'
                      ? `🎙️ B1 Orta (${count})`
                      : `🚀 B2 İleri (${count})`;

                  return (
                    <BouncyPressable
                      key={lvl}
                      onPress={() => setSelectedLevel(lvl)}
                      style={[styles.filterPill, isActive && styles.filterPillActive]}
                      hapticType="light"
                      scaleTo={0.95}
                    >
                      <Text style={[styles.filterPillText, isActive && styles.filterPillTextActive]}>
                        {label}
                      </Text>
                    </BouncyPressable>
                  );
                })}
              </ScrollView>
            </View>

            {/* 3. Episodes List */}
            <View style={styles.episodesList}>
              {filteredEpisodes.map((ep, idx) => {
                const dialogueSpeakers = ep.speakers.filter(s => !s.name.includes('Sunucu'));

                return (
                  <BouncyPressable
                    key={ep.id}
                    onPress={() => navigation.navigate('PodcastPlayer', { episodeId: ep.id })}
                    style={[styles.episodeCard, shadow.card]}
                    hapticType="medium"
                    scaleTo={0.97}
                  >
                    <View style={styles.episodeTopRow}>
                      <Image source={ep.coverImage} style={styles.episodeThumb} resizeMode="cover" />

                      <View style={styles.episodeMetaCol}>
                        <View style={styles.episodeLevelRow}>
                          <View style={styles.levelCapsule}>
                            <Text style={styles.levelCapsuleText}>{ep.level}</Text>
                          </View>
                          <Text style={styles.durationText}>⏱️ {ep.durationLabel}</Text>
                        </View>

                        <Text style={styles.episodeTitle} numberOfLines={1}>
                          {ep.title}
                        </Text>
                        <Text style={styles.episodeSub} numberOfLines={2}>
                          {ep.description}
                        </Text>
                      </View>
                    </View>

                    {/* Speakers & Action Row */}
                    <View style={styles.episodeBottomRow}>
                      <View style={styles.speakersListRow}>
                        <View style={styles.avatarStack}>
                          {ep.speakers.map((s, sIdx) => (
                            <Image
                              key={sIdx}
                              source={s.avatar}
                              style={[styles.stackedAvatar, sIdx > 0 && { marginLeft: -6 }]}
                            />
                          ))}
                        </View>
                        <Text style={styles.stackedNamesText} numberOfLines={1}>
                          {dialogueSpeakers.map((s) => s.name).join(' & ')}
                        </Text>
                      </View>

                      <View style={styles.listenBtn}>
                        <Ionicons name="headset" size={13} color="#FFFFFF" />
                        <Text style={styles.listenBtnText}>Ders ➔</Text>
                      </View>
                    </View>
                  </BouncyPressable>
                );
              })}
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  backdropOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.82)',
  },
  safeArea: {
    flex: 1,
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xs,
    paddingBottom: spacing.xs,
  },
  circularBackBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleCol: {
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 16,
    color: '#FFFFFF',
  },
  headerSub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 1,
  },
  headerRightBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: radii.pill,
    gap: 4,
  },
  headerRightEmoji: {
    fontSize: 12,
  },
  headerRightText: {
    fontFamily: fonts.headingBold,
    fontSize: 11,
    color: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xs,
    paddingBottom: 80,
  },

  /* Search Bar */
  searchBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    borderRadius: radii.md,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  searchInput: {
    flex: 1,
    fontFamily: fonts.bodyRegular,
    fontSize: 13,
    color: '#FFFFFF',
    padding: 0,
  },

  /* Featured Hero Card */
  featuredCard: {
    minHeight: 215,
    borderRadius: 22,
    overflow: 'hidden',
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.18)',
    position: 'relative',
  },
  featuredCover: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  featuredOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.78)',
    padding: 14,
    justifyContent: 'space-between',
  },
  featuredTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  featuredTag: {
    backgroundColor: 'rgba(245, 158, 11, 0.3)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: '#F59E0B',
  },
  featuredTagText: {
    fontFamily: fonts.mono,
    fontSize: 9,
    fontWeight: 'bold',
    color: '#FBBF24',
  },
  levelBadgeMini: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: '#10B981',
  },
  levelBadgeMiniText: {
    fontFamily: fonts.mono,
    fontSize: 9,
    fontWeight: 'bold',
    color: '#10B981',
  },
  featuredBodyCol: {
    marginVertical: 4,
  },
  featuredTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 17,
    color: '#FFFFFF',
  },
  featuredSub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: '#CBD5E1',
    lineHeight: 15,
    marginTop: 2,
  },
  featuredFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  speakerRowMini: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    minWidth: 0,
  },
  speakerAvatarMini: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  speakerNamesText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10.5,
    color: '#E2E8F0',
    marginLeft: 6,
    flexShrink: 1,
  },
  playBtnMini: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.brand,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radii.pill,
    gap: 4,
    flexShrink: 0,
  },
  playBtnMiniText: {
    fontFamily: fonts.headingBold,
    fontSize: 10.5,
    color: '#FFFFFF',
  },

  /* Filters */
  filterSection: {
    marginBottom: spacing.md,
  },
  sectionHeading: {
    fontFamily: fonts.headingBold,
    fontSize: 12,
    color: '#CBD5E1',
    marginBottom: 8,
  },
  filterPillsRow: {
    gap: 8,
  },
  filterPill: {
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  filterPillActive: {
    backgroundColor: colors.brand,
    borderColor: colors.brand,
  },
  filterPillText: {
    fontFamily: fonts.headingBold,
    fontSize: 11,
    color: '#94A3B8',
  },
  filterPillTextActive: {
    color: '#FFFFFF',
  },

  /* Episodes List */
  episodesList: {
    gap: 12,
  },
  episodeCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.96)',
    borderRadius: 20,
    padding: spacing.md,
  },
  episodeTopRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 10,
  },
  episodeThumb: {
    width: 68,
    height: 68,
    borderRadius: 16,
  },
  episodeMetaCol: {
    flex: 1,
    minWidth: 0,
    justifyContent: 'center',
  },
  episodeLevelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 3,
  },
  levelCapsule: {
    backgroundColor: 'rgba(79, 70, 229, 0.1)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radii.pill,
  },
  levelCapsuleText: {
    fontFamily: fonts.mono,
    fontSize: 9,
    fontWeight: 'bold',
    color: colors.brand,
  },
  durationText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10,
    color: colors.textMuted,
  },
  episodeTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 14,
    color: colors.textHeading,
  },
  episodeSub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
    lineHeight: 15,
  },
  episodeBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(226, 232, 240, 0.8)',
    paddingTop: 8,
    gap: 8,
  },
  speakersListRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    minWidth: 0,
    gap: 6,
  },
  avatarStack: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stackedAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  stackedNamesText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10.5,
    color: colors.textHeading,
    flexShrink: 1,
  },
  listenBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.brand,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radii.pill,
    gap: 3,
    flexShrink: 0,
  },
  listenBtnText: {
    fontFamily: fonts.headingBold,
    fontSize: 10.5,
    color: '#FFFFFF',
  },
});
