import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { stateImages } from '../assets/images';
import { Toast } from '../components/Toast';
import { api } from '../lib/api';
import type { MistakesNotebookScreenProps } from '../navigation/types';
import { colors, fonts, radii, spacing } from '../theme/tokens';
import type { GrammarMistakeOut } from '../types/api';

type SourceFilter = 'ALL' | 'mini_quiz' | 'text_chat' | 'voice_session' | 'sentence_order';

function sourceLabel(source: string | null | undefined): string {
  if (source === 'mini_quiz') return '✍️ Mini Quiz';
  if (source === 'text_chat') return '💬 AI Sohbet';
  if (source === 'voice_session') return '🎙️ Canlı Konuşma';
  if (source === 'sentence_order') return '📖 Cümle Sıralama';
  return '📝 Alıştırma';
}

function isGrammarLessonCode(code: string): boolean {
  return /^[ABC][12]_G\d+$/i.test(code);
}

export function MistakesNotebookScreen({ navigation }: MistakesNotebookScreenProps) {
  const queryClient = useQueryClient();
  const [selectedFilter, setSelectedFilter] = useState<SourceFilter>('ALL');
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  const { data: mistakes, isLoading } = useQuery({
    queryKey: ['grammar-mistakes'],
    queryFn: () => api.get<GrammarMistakeOut[]>('/progress/mistakes'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/progress/mistakes/${id}`),
    onSuccess: (_, id) => {
      queryClient.setQueryData<GrammarMistakeOut[]>(['grammar-mistakes'], (prev) =>
        (prev ?? []).filter((m) => m.id !== id)
      );
      showToast('🎉 Harika! Kuralı pekiştirdin ve defterden temizlendi.');
    },
  });

  const allMistakes = mistakes ?? [];

  // Filtered mistakes by source tab
  const filteredMistakes = useMemo(() => {
    if (selectedFilter === 'ALL') return allMistakes;
    return allMistakes.filter((m) => m.source === selectedFilter);
  }, [allMistakes, selectedFilter]);

  // Frequency count of grammar lesson mistakes for the top focus carousel
  const topicSummary = useMemo(() => {
    const counts = new Map<string, number>();
    for (const m of allMistakes) {
      if (m.topic_code && isGrammarLessonCode(m.topic_code)) {
        counts.set(m.topic_code, (counts.get(m.topic_code) ?? 0) + 1);
      }
    }
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6);
  }, [allMistakes]);

  const quizCount = allMistakes.filter((m) => m.source === 'mini_quiz').length;
  const chatCount = allMistakes.filter((m) => m.source === 'text_chat').length;
  const voiceCount = allMistakes.filter((m) => m.source === 'voice_session').length;
  const readingCount = allMistakes.filter((m) => m.source === 'sentence_order').length;

  return (
    <SafeAreaView style={styles.container}>
      {/* Top App Bar */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={20} color={colors.textHeading} />
        </Pressable>
        <View style={styles.headerTitleCol}>
          <Text style={styles.headerTitle}>Hata Defterim</Text>
          <Text style={styles.headerSub}>Kişisel Zayıf Noktalar & Düzeltmeler</Text>
        </View>
        <View style={styles.countBadge}>
          <Text style={styles.countBadgeText}>{allMistakes.length} Kayıt</Text>
        </View>
      </View>

      <FlatList
        data={filteredMistakes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            {/* 1. Hero 3D Bento Vault Card (Porcelain Luxury) */}
            <View style={styles.heroBentoCard}>
              <View style={styles.heroLeftCol}>
                <View style={styles.heroBadgeRow}>
                  <Ionicons name="shield-checkmark" size={12} color={colors.brand} />
                  <Text style={styles.heroBadgeText}>ÖZEL GELİŞİM KASASI</Text>
                </View>
                <Text style={styles.heroTitle}>Zayıf Noktalarını Güce Dönüştür</Text>
                <Text style={styles.heroDesc}>
                  Yapay zeka sohbetleri, testler ve okuma alıştırmalarındaki yanlışların burada
                  toplanır. Kuralı kavradığında tek tıkla temizle!
                </Text>

                {/* 3-Pill Micro Stats */}
                <View style={styles.microStatsRow}>
                  <View style={styles.microStatPill}>
                    <Text style={styles.microStatVal}>{allMistakes.length}</Text>
                    <Text style={styles.microStatLbl}>Bekleyen</Text>
                  </View>
                  <View style={styles.microStatPill}>
                    <Text style={styles.microStatVal}>{topicSummary.length}</Text>
                    <Text style={styles.microStatLbl}>Kural Konusu</Text>
                  </View>
                  <View style={styles.microStatPillEmerald}>
                    <Text style={styles.microStatValEmerald}>%100</Text>
                    <Text style={styles.microStatLblEmerald}>Özel Analiz</Text>
                  </View>
                </View>
              </View>

              <View style={styles.heroRightIconWrapper}>
                <Image
                  source={stateImages.mistakesNotebook}
                  style={styles.hero3dImage}
                  resizeMode="cover"
                />
              </View>
            </View>

            {/* 2. Topic Focus Carousel (En Çok Hata Yaptığın Konular) */}
            {topicSummary.length > 0 ? (
              <View style={styles.summarySection}>
                <View style={styles.sectionHeaderRow}>
                  <Text style={styles.summaryTitle}>🎯 En Çok Tekrarlanan Konular</Text>
                  <Text style={styles.summarySub}>Dersi çalış ve pekiştir</Text>
                </View>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.summaryScroll}
                >
                  {topicSummary.map(([code, count]) => (
                    <Pressable
                      key={code}
                      onPress={() => navigation.navigate('GrammarLesson', { code })}
                      style={styles.summaryChip}
                    >
                      <View style={styles.summaryIconBox}>
                        <Ionicons name="book" size={13} color={colors.brand} />
                      </View>
                      <View>
                        <Text style={styles.summaryChipCode}>{code}</Text>
                        <Text style={styles.summaryChipAction}>Dersi Çalış ➔</Text>
                      </View>
                      <View style={styles.summaryChipCountPill}>
                        <Text style={styles.summaryChipCountText}>{count}x</Text>
                      </View>
                    </Pressable>
                  ))}
                </ScrollView>
              </View>
            ) : null}

            {/* 3. Source Filter Tabs (Segmented Bar) */}
            <View style={styles.filterSection}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.filterTabsRow}
              >
                <Pressable
                  onPress={() => setSelectedFilter('ALL')}
                  style={[styles.filterTab, selectedFilter === 'ALL' && styles.filterTabActive]}
                >
                  <Text
                    style={[
                      styles.filterTabText,
                      selectedFilter === 'ALL' && styles.filterTabTextActive,
                    ]}
                  >
                    🌐 Tümü ({allMistakes.length})
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() => setSelectedFilter('mini_quiz')}
                  style={[
                    styles.filterTab,
                    selectedFilter === 'mini_quiz' && styles.filterTabActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.filterTabText,
                      selectedFilter === 'mini_quiz' && styles.filterTabTextActive,
                    ]}
                  >
                    ✍️ Mini Quiz ({quizCount})
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() => setSelectedFilter('text_chat')}
                  style={[
                    styles.filterTab,
                    selectedFilter === 'text_chat' && styles.filterTabActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.filterTabText,
                      selectedFilter === 'text_chat' && styles.filterTabTextActive,
                    ]}
                  >
                    💬 AI Sohbet ({chatCount})
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() => setSelectedFilter('voice_session')}
                  style={[
                    styles.filterTab,
                    selectedFilter === 'voice_session' && styles.filterTabActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.filterTabText,
                      selectedFilter === 'voice_session' && styles.filterTabTextActive,
                    ]}
                  >
                    🎙️ Canlı Konuşma ({voiceCount})
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() => setSelectedFilter('sentence_order')}
                  style={[
                    styles.filterTab,
                    selectedFilter === 'sentence_order' && styles.filterTabActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.filterTabText,
                      selectedFilter === 'sentence_order' && styles.filterTabTextActive,
                    ]}
                  >
                    📖 Okuma ({readingCount})
                  </Text>
                </Pressable>
              </ScrollView>
            </View>
          </View>
        }
        ListEmptyComponent={
          isLoading ? (
            <View style={styles.centerLoading}>
              <ActivityIndicator size="large" color={colors.brand} />
            </View>
          ) : (
            <View style={styles.emptyCard}>
              <View style={styles.emptyImageWrapper}>
                <Image
                  source={stateImages.mistakesNotebook}
                  style={styles.empty3dImage}
                  resizeMode="cover"
                />
                <View style={styles.emptyCheckBadge}>
                  <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                </View>
              </View>
              <Text style={styles.emptyTitle}>Tertemiz Bir Sayfa! 🎯</Text>
              <Text style={styles.emptyText}>
                {selectedFilter === 'ALL'
                  ? 'Henüz kayıtlı bir hatan bulunmuyor. Yapay zeka sohbetlerinde, testlerde ve okuma alıştırmalarında pratik yaptıkça takıldığın noktalar burada birikecek.'
                  : 'Bu kategoride kayıtlı bir hatan bulunmuyor. Harika gidiyorsun!'}
              </Text>
            </View>
          )
        }
        renderItem={({ item, index }) => (
          <View style={styles.mistakeCard}>
            {/* Top Meta Header */}
            <View style={styles.cardTopRow}>
              <View style={styles.cardIndexBadge}>
                <Text style={styles.cardIndexText}>#{index + 1}</Text>
              </View>

              <View style={styles.sourceBadge}>
                <Text style={styles.sourceBadgeText}>{sourceLabel(item.source)}</Text>
              </View>

              {item.topic_code && isGrammarLessonCode(item.topic_code) ? (
                <Pressable
                  onPress={() => navigation.navigate('GrammarLesson', { code: item.topic_code! })}
                  style={styles.topicPill}
                >
                  <Ionicons name="sparkles" size={11} color={colors.brand} />
                  <Text style={styles.topicPillText}>{item.topic_code} Konusu ➔</Text>
                </Pressable>
              ) : item.topic_code ? (
                <View style={styles.topicPillStatic}>
                  <Text style={styles.topicPillStaticText}>{item.topic_code}</Text>
                </View>
              ) : null}

              <Pressable
                onPress={() => deleteMutation.mutate(item.id)}
                hitSlop={8}
                style={styles.deleteBtn}
              >
                <Ionicons name="checkmark-circle" size={16} color={colors.success} />
                <Text style={styles.deleteBtnText}>Öğrendim</Text>
              </Pressable>
            </View>

            {/* Wrong sentence diff box */}
            <View style={styles.wrongBox}>
              <View style={styles.boxHeaderRow}>
                <View style={styles.boxTagRed}>
                  <Ionicons name="close-circle" size={12} color="#DC2626" />
                  <Text style={styles.boxTagRedText}>HATALI İFADE</Text>
                </View>
              </View>
              <Text style={styles.wrongText}>{item.wrong_text}</Text>
            </View>

            {/* Corrected sentence diff box */}
            <View style={styles.rightBox}>
              <View style={styles.boxHeaderRow}>
                <View style={styles.boxTagGreen}>
                  <Ionicons name="checkmark-circle" size={12} color="#059669" />
                  <Text style={styles.boxTagGreenText}>DOĞRU KULLANIM</Text>
                </View>
              </View>
              <Text style={styles.rightText}>{item.corrected_text}</Text>
            </View>

            {/* Turkish explanation & tip card */}
            {item.explanation_tr ? (
              <View style={styles.explBox}>
                <View style={styles.explHeaderRow}>
                  <Ionicons name="bulb" size={13} color="#D97706" />
                  <Text style={styles.explLabel}>KURAL & DÜZELTME NOTU:</Text>
                </View>
                <Text style={styles.explText}>{item.explanation_tr}</Text>
              </View>
            ) : null}

            {/* Quick action footer if grammar lesson is available */}
            {item.topic_code && isGrammarLessonCode(item.topic_code) ? (
              <Pressable
                onPress={() => navigation.navigate('GrammarLesson', { code: item.topic_code! })}
                style={styles.cardFooterAction}
              >
                <Text style={styles.cardFooterActionText}>
                  📖 Bu kuralın detaylı dersini ve tablosunu incele ➔
                </Text>
              </Pressable>
            ) : null}
          </View>
        )}
      />

      {toast ? <Toast message={toast} /> : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC', // Porcelain Base
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: radii.pill,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleCol: {
    flex: 1,
    marginLeft: 12,
  },
  headerTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 17,
    color: colors.textHeading,
  },
  headerSub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 1,
  },
  countBadge: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  countBadgeText: {
    fontFamily: fonts.mono,
    fontSize: 11,
    fontWeight: 'bold',
    color: colors.brand,
  },
  headerContainer: {
    paddingBottom: spacing.xs,
  },
  listContent: {
    padding: spacing.md,
    gap: 14,
    paddingBottom: 60,
  },

  /* 1. Hero 3D Bento Vault Card (Porcelain Luxury) */
  heroBentoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
    borderWidth: 1.5,
    borderColor: '#E0E7FF',
    shadowColor: colors.brand,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 14,
    elevation: 2,
  },
  heroLeftCol: {
    flex: 1,
    paddingRight: 10,
  },
  heroBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.pill,
    alignSelf: 'flex-start',
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  heroBadgeText: {
    fontFamily: fonts.mono,
    fontSize: 9,
    fontWeight: 'bold',
    color: colors.brand,
    letterSpacing: 0.4,
  },
  heroTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 15.5,
    color: colors.textHeading,
    lineHeight: 20,
  },
  heroDesc: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textBody,
    marginTop: 4,
    lineHeight: 16,
  },
  microStatsRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 10,
  },
  microStatPill: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  microStatVal: {
    fontFamily: fonts.mono,
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.textHeading,
  },
  microStatLbl: {
    fontFamily: fonts.bodyRegular,
    fontSize: 8.5,
    color: colors.textMuted,
  },
  microStatPillEmerald: {
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
    borderRadius: 8,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  microStatValEmerald: {
    fontFamily: fonts.mono,
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.success,
  },
  microStatLblEmerald: {
    fontFamily: fonts.bodyRegular,
    fontSize: 8.5,
    color: colors.success,
  },
  heroRightIconWrapper: {
    width: 76,
    height: 76,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: colors.brand,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 3,
  },
  hero3dImage: {
    width: '100%',
    height: '100%',
  },

  /* 2. Topic Focus Carousel */
  summarySection: {
    marginBottom: spacing.md,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingHorizontal: 2,
  },
  summaryTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 13,
    color: colors.textHeading,
  },
  summarySub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10.5,
    color: colors.brand,
  },
  summaryScroll: {
    gap: 8,
    paddingVertical: 2,
  },
  summaryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: radii.lg,
    borderWidth: 1.5,
    borderColor: '#E0E7FF',
    shadowColor: colors.brand,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  summaryIconBox: {
    width: 26,
    height: 26,
    borderRadius: 8,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryChipCode: {
    fontFamily: fonts.mono,
    fontSize: 11,
    fontWeight: 'bold',
    color: '#4338CA',
  },
  summaryChipAction: {
    fontFamily: fonts.bodyRegular,
    fontSize: 9.5,
    color: '#6366F1',
    marginTop: 1,
  },
  summaryChipCountPill: {
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: '#FECACA',
    marginLeft: 4,
  },
  summaryChipCountText: {
    fontFamily: fonts.mono,
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#DC2626',
  },

  /* 3. Source Filter Tabs */
  filterSection: {
    marginBottom: spacing.xs,
  },
  filterTabsRow: {
    gap: 8,
    paddingVertical: 2,
  },
  filterTab: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  filterTabActive: {
    backgroundColor: colors.brand,
    borderColor: '#4338CA',
  },
  filterTabText: {
    fontFamily: fonts.headingBold,
    fontSize: 11,
    color: colors.textMuted,
  },
  filterTabTextActive: {
    color: '#FFFFFF',
  },

  /* Center Loading */
  centerLoading: {
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* Empty State */
  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#E0E7FF',
    marginTop: spacing.md,
    shadowColor: colors.brand,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  emptyImageWrapper: {
    position: 'relative',
    width: 88,
    height: 88,
    marginBottom: 16,
  },
  empty3dImage: {
    width: 88,
    height: 88,
    borderRadius: 22,
  },
  emptyCheckBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  emptyTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 18,
    color: colors.textHeading,
    marginBottom: 6,
    textAlign: 'center',
  },
  emptyText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12.5,
    color: colors.textBody,
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 8,
  },

  /* Mistake Card */
  mistakeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 15,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    gap: 10,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
    rowGap: 6,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  cardIndexBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
  },
  cardIndexText: {
    fontFamily: fonts.mono,
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.textMuted,
  },
  sourceBadge: {
    backgroundColor: '#F5F3FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#EDE9FE',
  },
  sourceBadgeText: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 10.5,
    color: '#6D28D9',
  },
  topicPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  topicPillText: {
    fontFamily: fonts.mono,
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.brand,
  },
  topicPillStatic: {
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  topicPillStaticText: {
    fontFamily: fonts.mono,
    fontSize: 10,
    color: colors.textMuted,
  },
  deleteBtn: {
    marginLeft: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  deleteBtnText: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 11,
    color: colors.success,
  },

  /* Diff Boxes */
  wrongBox: {
    backgroundColor: '#FEF2F2',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  boxHeaderRow: {
    marginBottom: 4,
  },
  boxTagRed: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
  },
  boxTagRedText: {
    fontFamily: fonts.mono,
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#DC2626',
    letterSpacing: 0.4,
  },
  wrongText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 13,
    color: '#991B1B',
    lineHeight: 18,
  },

  rightBox: {
    backgroundColor: '#ECFDF5',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  boxTagGreen: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
  },
  boxTagGreenText: {
    fontFamily: fonts.mono,
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#059669',
    letterSpacing: 0.4,
  },
  rightText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 13,
    color: '#065F46',
    lineHeight: 18,
  },

  /* Explanation */
  explBox: {
    backgroundColor: '#FFFBEB',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  explHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  explLabel: {
    fontFamily: fonts.mono,
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#B45309',
    letterSpacing: 0.3,
  },
  explText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: '#78350F',
    lineHeight: 17,
  },

  /* Card Footer Action */
  cardFooterAction: {
    paddingTop: 4,
    alignItems: 'flex-start',
  },
  cardFooterActionText: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 11,
    color: colors.brand,
  },
});
