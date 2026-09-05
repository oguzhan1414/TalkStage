import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { cefrLevelImages, companionImage, readingSceneImages } from '../assets/images';
import { BouncyPressable } from '../components/BouncyPressable';
import { Toast } from '../components/Toast';
import { CEFR_LEVELS } from '../constants/cefr';
import { api } from '../lib/api';
import type { ReadingListScreenProps } from '../navigation/types';
import { colors, fonts, radii, shadow, spacing } from '../theme/tokens';
import type { ReadingPassageOut } from '../types/api';

type PassageStatus = 'completed' | 'current' | 'locked';

export function ReadingListScreen({ navigation }: ReadingListScreenProps) {
  const [toast, setToast] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string>('A1');

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['reading'],
    queryFn: () => api.get<ReadingPassageOut[]>('/reading'),
  });

  const { data: completedSlugs } = useQuery({
    queryKey: ['reading', 'completed'],
    queryFn: () => api.get<string[]>('/reading/completed-slugs'),
  });

  const passages = data ?? [];
  const completedSet = useMemo(() => new Set(completedSlugs ?? []), [completedSlugs]);

  const firstIncompleteIdx = passages.findIndex((p) => !completedSet.has(p.slug));

  const statusOf = (idx: number): PassageStatus => {
    if (firstIncompleteIdx === -1) return 'completed';
    if (idx < firstIncompleteIdx) return 'completed';
    if (idx === firstIncompleteIdx) return 'current';
    return 'locked';
  };

  const currentPassage = firstIncompleteIdx !== -1 ? passages[firstIncompleteIdx] : passages[0];

  const visiblePassages = useMemo(() => {
    return passages
      .map((item, idx) => ({ item, idx }))
      .filter(({ item }) => (item.cefr_level ?? 'A1').toUpperCase() === selectedLevel);
  }, [passages, selectedLevel]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={colors.textHeading} />
        </Pressable>
        <View style={styles.headerCenter}>
          <Text style={styles.title}>Smart Reading & Dinleme</Text>
          <Text style={styles.subTitle}>Adım Adım Kilit Açan Hikaye & Ses Sahnesi</Text>
        </View>
      </View>

      {/* CEFR Level Selector Tabs (A1 - C2) */}
      <View style={styles.levelTabsWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.levelTabsRow}
        >
          {CEFR_LEVELS.map((lvl) => {
            const count = passages.filter((p) => (p.cefr_level ?? 'A1').toUpperCase() === lvl).length;
            const isSelected = selectedLevel === lvl;
            return (
              <Pressable
                key={lvl}
                onPress={() => setSelectedLevel(lvl)}
                style={[styles.levelTab, isSelected && styles.levelTabActive]}
              >
                <Text style={[styles.levelTabText, isSelected && styles.levelTabTextActive]}>
                  {lvl} {count > 0 ? `(${count})` : ''}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {isLoading ? (
        <ActivityIndicator style={styles.stateBlock} color={colors.brand} />
      ) : isError ? (
        <View style={styles.stateBlock}>
          <Text style={styles.stateText}>Okuma parçaları yüklenemedi.</Text>
          <Pressable onPress={() => refetch()}>
            <Text style={styles.retryText}>Tekrar dene</Text>
          </Pressable>
        </View>
      ) : !passages.length ? (
        <View style={styles.stateBlock}>
          <Text style={styles.stateText}>Henüz okuma parçası eklenmedi.</Text>
        </View>
      ) : (
        <FlatList
          data={visiblePassages}
          keyExtractor={({ item }) => item.slug}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            currentPassage && (currentPassage.cefr_level ?? 'A1').toUpperCase() === selectedLevel ? (
              <View style={[styles.heroCard, shadow.card]}>
                <View style={styles.heroBadgeRow}>
                  <View style={styles.heroCurrentBadge}>
                    <Text style={styles.heroCurrentBadgeText}>🎯 SIRADAKİ HİKAYEN</Text>
                  </View>
                  <Text style={styles.heroRewardText}>+30 XP ⚡ • +10 💎</Text>
                </View>

                <View style={styles.heroContentRow}>
                  <Image
                    source={
                      readingSceneImages[currentPassage.scenes[0]?.image_key] ?? companionImage
                    }
                    style={styles.heroThumbnail}
                    resizeMode="cover"
                  />
                  <View style={styles.heroTextCol}>
                    <Text style={styles.heroTitle}>{currentPassage.title}</Text>
                    <Text style={styles.heroSub}>
                      {currentPassage.scenes.length} Sahne • ⏱️ {currentPassage.estimated_minutes} Dk Dinleme & Sıralama
                    </Text>
                    <Pressable
                      style={styles.heroStartButton}
                      onPress={() =>
                        navigation.navigate('ReadingPassage', { slug: currentPassage.slug })
                      }
                    >
                      <Ionicons name="play" size={16} color="#FFFFFF" />
                      <Text style={styles.heroStartButtonText}>Hemen Başla</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            ) : null
          }
          renderItem={({ item: { item, idx: index } }) => {
            const status = statusOf(index);
            const isLocked = status === 'locked';
            const levelKey = (item.cefr_level ?? 'A1') as keyof typeof cefrLevelImages;
            const shieldIcon = cefrLevelImages[levelKey] ?? cefrLevelImages.A1;
            const storyImg = readingSceneImages[item.scenes[0]?.image_key] ?? companionImage;

            return (
              <BouncyPressable
                style={[
                  styles.card,
                  shadow.card,
                  status === 'current' && styles.cardCurrent,
                  isLocked && styles.cardLocked,
                ]}
                hapticType={isLocked ? 'warning' : 'medium'}
                scaleTo={0.97}
                onPress={() => {
                  if (isLocked) {
                    showToast('Önce bir önceki hikayeyi tamamla 🔒');
                    return;
                  }
                  navigation.navigate('ReadingPassage', { slug: item.slug });
                }}
              >
                {/* 3D Cover Thumbnail */}
                <View style={styles.thumbnailWrap}>
                  <Image
                    source={storyImg}
                    style={[styles.storyThumbnail, isLocked && styles.storyThumbnailLocked]}
                    resizeMode="cover"
                  />
                  {status === 'completed' ? (
                    <View style={styles.completedBadge}>
                      <Ionicons name="checkmark" size={12} color="#FFFFFF" />
                    </View>
                  ) : isLocked ? (
                    <View style={styles.lockOverlay}>
                      <Ionicons name="lock-closed" size={18} color="#FFFFFF" />
                    </View>
                  ) : null}
                </View>

                {/* Card Content */}
                <View style={styles.cardBody}>
                  <View style={styles.metaRow}>
                    <View style={styles.levelBadge}>
                      <Image source={shieldIcon} style={styles.shieldMini} resizeMode="contain" />
                      <Text style={styles.levelText}>{item.cefr_level ?? 'A1'}</Text>
                    </View>
                    <Text style={styles.metaTag}>⏱️ {item.estimated_minutes} Dk</Text>
                    <Text style={styles.metaTag}>🎬 {item.scenes.length} Sahne</Text>
                  </View>

                  <Text style={[styles.cardTitle, isLocked && styles.cardTitleLocked]}>
                    {item.title}
                  </Text>

                  <View style={styles.cardFooterRow}>
                    <Text
                      style={[
                        styles.statusLabel,
                        status === 'completed' && styles.statusCompleted,
                        status === 'current' && styles.statusCurrent,
                      ]}
                    >
                      {status === 'completed'
                        ? '✓ Tamamlandı'
                        : status === 'current'
                          ? '🎯 Sıradaki Görev'
                          : '🔒 Kilitli'}
                    </Text>

                    {!isLocked && (
                      <View style={styles.playIconButton}>
                        <Ionicons name="play" size={14} color={colors.brand} />
                      </View>
                    )}
                  </View>
                </View>
              </BouncyPressable>
            );
          }}
          ListEmptyComponent={
            <View style={styles.emptyLevelBlock}>
              <Ionicons name="book-outline" size={38} color={colors.textMuted} />
              <Text style={styles.emptyLevelTitle}>{selectedLevel} Seviyesi Hikayeleri</Text>
              <Text style={styles.emptyLevelSub}>
                Bu seviye için yeni hikayeler ve ses sahneleri çok yakında eklenecek!
              </Text>
            </View>
          }
        />
      )}

      {toast ? <Toast message={toast} /> : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(226, 232, 240, 0.8)',
  },
  backButton: {
    padding: 4,
  },
  headerCenter: {
    marginLeft: 10,
    flex: 1,
  },
  title: {
    fontFamily: fonts.headingBold,
    fontSize: 18,
    color: colors.textHeading,
  },
  subTitle: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 1,
  },

  /* Level Tabs */
  levelTabsWrapper: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(226, 232, 240, 0.8)',
  },
  levelTabsRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
  },
  levelTab: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: radii.pill,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.8)',
  },
  levelTabActive: {
    backgroundColor: colors.brand,
    borderColor: colors.brand,
  },
  levelTabText: {
    fontFamily: fonts.headingBold,
    fontSize: 12,
    color: colors.textMuted,
  },
  levelTabTextActive: {
    color: '#FFFFFF',
  },

  stateBlock: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    padding: spacing.xl,
  },
  stateText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 13,
    color: colors.textMuted,
    textAlign: 'center',
  },
  retryText: {
    fontFamily: fonts.headingBold,
    fontSize: 13,
    color: colors.brand,
    marginTop: 8,
  },
  list: {
    padding: spacing.md,
    gap: 12,
    paddingBottom: 40,
  },

  /* Hero Featured Card */
  heroCard: {
    backgroundColor: '#0F172A',
    borderRadius: radii.lg,
    padding: spacing.md,
    marginBottom: spacing.xs,
  },
  heroBadgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  heroCurrentBadge: {
    backgroundColor: colors.brand,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.pill,
  },
  heroCurrentBadgeText: {
    fontFamily: fonts.mono,
    fontSize: 9,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  heroRewardText: {
    fontFamily: fonts.mono,
    fontSize: 10,
    fontWeight: 'bold',
    color: '#F59E0B',
  },
  heroContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroThumbnail: {
    width: 80,
    height: 80,
    borderRadius: radii.md,
    marginRight: 12,
  },
  heroTextCol: {
    flex: 1,
  },
  heroTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 15,
    color: '#FFFFFF',
    marginBottom: 2,
  },
  heroSub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: '#94A3B8',
    marginBottom: 8,
  },
  heroStartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.brand,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radii.pill,
    alignSelf: 'flex-start',
    gap: 4,
  },
  heroStartButtonText: {
    fontFamily: fonts.headingBold,
    fontSize: 12,
    color: '#FFFFFF',
  },

  /* Normal Cards */
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.lg,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.8)',
  },
  cardCurrent: {
    borderColor: colors.brand,
    borderWidth: 1.5,
  },
  cardLocked: {
    opacity: 0.65,
  },
  thumbnailWrap: {
    position: 'relative',
    marginRight: 12,
  },
  storyThumbnail: {
    width: 72,
    height: 72,
    borderRadius: radii.md,
    backgroundColor: '#F1F5F9',
  },
  storyThumbnailLocked: {
    opacity: 0.5,
  },
  completedBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  lockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: radii.md,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBody: {
    flex: 1,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
    flexWrap: 'wrap',
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(79, 70, 229, 0.08)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    gap: 3,
  },
  shieldMini: {
    width: 13,
    height: 13,
  },
  levelText: {
    fontFamily: fonts.mono,
    fontSize: 9,
    fontWeight: 'bold',
    color: colors.brand,
  },
  metaTag: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10,
    color: colors.textMuted,
  },
  cardTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 14,
    color: colors.textHeading,
    marginBottom: 4,
    lineHeight: 18,
  },
  cardTitleLocked: {
    color: colors.textMuted,
  },
  cardFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusLabel: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10,
    color: colors.textMuted,
  },
  statusCompleted: {
    color: colors.success,
    fontWeight: 'bold',
  },
  statusCurrent: {
    color: colors.brand,
    fontWeight: 'bold',
  },
  playIconButton: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'rgba(79, 70, 229, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* Empty Level Block */
  emptyLevelBlock: {
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  emptyLevelTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 16,
    color: colors.textHeading,
    marginTop: 6,
  },
  emptyLevelSub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 16,
    maxWidth: 260,
  },
});
