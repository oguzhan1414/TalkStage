import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { stateImages } from '../assets/images';
import { BouncyPressable } from '../components/BouncyPressable';
import { useMivoTransition } from '../components/MivoTransitionOverlay';
import { Toast } from '../components/Toast';
import { api } from '../lib/api';
import type { MistakesNotebookScreenProps } from '../navigation/types';
import { colors, fonts, radii, shadow, spacing } from '../theme/tokens';
import type { GrammarMistakeOut } from '../types/api';
import { MivoLoader } from '../components/MivoLoader';
import { t } from '../i18n';

type SourceFilter = 'ALL' | 'mini_quiz' | 'text_chat' | 'voice_session' | 'sentence_order';

function sourceLabel(source: string | null | undefined): string {
  if (source === 'mini_quiz') return '✍️ Mini Quiz';
  if (source === 'text_chat') return t("💬 AI Sohbet");
  // Free-chat voice room (`/ws/free-chat`) shares the same live-voice label
  // as scenario rooms — both are spoken practice, just topic-less vs. not.
  if (source === 'voice_session' || source === 'voice_free_chat') return t("🎙️ Canlı Konuşma");
  if (source === 'sentence_order') return t("📖 Cümle Sıralama");
  return t("📝 Alıştırma");
}

function isGrammarLessonCode(code: string): boolean {
  return /^[ABC][12]_G\d+$/i.test(code);
}

export function MistakesNotebookScreen({ navigation }: MistakesNotebookScreenProps) {
  const { finishTransition } = useMivoTransition();
  const queryClient = useQueryClient();
  const [selectedFilter, setSelectedFilter] = useState<SourceFilter>('ALL');
  const [toast, setToast] = useState<string | null>(null);

  // Active recall practice quiz modal state
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const [activeQuizItem, setActiveQuizItem] = useState<GrammarMistakeOut | null>(null);
  const [quizSelectedChoice, setQuizSelectedChoice] = useState<'wrong' | 'right' | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<'correct' | 'wrong' | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2400);
  };

  const { data: mistakes, isLoading } = useQuery({
    queryKey: ['grammar-mistakes'],
    queryFn: () => api.get<GrammarMistakeOut[]>('/progress/mistakes'),
  });

  useEffect(() => {
    if (!isLoading) finishTransition();
  }, [finishTransition, isLoading]);

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/progress/mistakes/${id}`),
    onSuccess: (_, id) => {
      queryClient.setQueryData<GrammarMistakeOut[]>(['grammar-mistakes'], (prev) =>
        (prev ?? []).filter((m) => m.id !== id)
      );
      showToast(t("🎉 Harika! Kuralı pekiştirdin ve defterden temizlendi."));
      if (activeQuizItem?.id === id) {
        setQuizModalOpen(false);
        setActiveQuizItem(null);
      }
    },
  });

  const allMistakes = mistakes ?? [];

  // Filtered mistakes by source tab
  const filteredMistakes = useMemo(() => {
    if (selectedFilter === 'ALL') return allMistakes;
    if (selectedFilter === 'voice_session') {
      return allMistakes.filter((m) => m.source === 'voice_session' || m.source === 'voice_free_chat');
    }
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
  const voiceCount = allMistakes.filter(
    (m) => m.source === 'voice_session' || m.source === 'voice_free_chat'
  ).length;
  const readingCount = allMistakes.filter((m) => m.source === 'sentence_order').length;

  // Start single quiz for a mistake
  const startQuizForMistake = (item: GrammarMistakeOut) => {
    setActiveQuizItem(item);
    setQuizSelectedChoice(null);
    setQuizFeedback(null);
    setQuizModalOpen(true);
  };

  // Start general session quiz with first available mistake
  const startGeneralQuiz = () => {
    if (allMistakes.length === 0) return;
    const randomItem = allMistakes[Math.floor(Math.random() * allMistakes.length)];
    startQuizForMistake(randomItem);
  };

  // Randomize choice order for quiz
  const isCorrectChoiceFirst = useMemo(() => {
    if (!activeQuizItem) return true;
    return activeQuizItem.id.charCodeAt(0) % 2 === 0;
  }, [activeQuizItem]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Top App Bar */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={20} color={colors.textHeading} />
        </Pressable>
        <View style={styles.headerTitleCol}>
          <Text style={styles.headerTitle}>{t("Hata Defterim")}</Text>
          <Text style={styles.headerSub}>{t("Kişisel Zayıf Noktalar & Düzeltmeler")}</Text>
        </View>
        <View style={styles.countBadge}>
          <Text style={styles.countBadgeText}>{t("{{length}} Kayıt", { length: allMistakes.length })}</Text>
        </View>
      </View>

      <FlatList
        data={filteredMistakes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            {/* 1. Hero 3D Bento Vault Card */}
            <View style={[styles.heroBentoCard, shadow.card]}>
              <View style={styles.heroLeftCol}>
                <View style={styles.heroBadgeRow}>
                  <Ionicons name="shield-checkmark" size={12} color={colors.brand} />
                  <Text style={styles.heroBadgeText}>{t("ÖZEL GELİŞİM KASASI")}</Text>
                </View>
                <Text style={styles.heroTitle}>{t("Zayıf Noktalarını Kalıcı Reflekse Dönüştür")}</Text>
                <Text style={styles.heroDesc}>{t("Konuşmalarda ve sınavlarda yaptığın hatalar burada toplanır. Kendini sına, kuralı kavra ve defterden temizle!")}</Text>

                {/* 3-Pill Micro Stats */}
                <View style={styles.microStatsRow}>
                  <View style={styles.microStatPill}>
                    <Text style={styles.microStatVal}>{allMistakes.length}</Text>
                    <Text style={styles.microStatLbl}>{t("Bekleyen")}</Text>
                  </View>
                  <View style={styles.microStatPill}>
                    <Text style={styles.microStatVal}>{topicSummary.length}</Text>
                    <Text style={styles.microStatLbl}>{t("Kural Konusu")}</Text>
                  </View>
                  <View style={styles.microStatPillEmerald}>
                    <Text style={styles.microStatValEmerald}>%100</Text>
                    <Text style={styles.microStatLblEmerald}>{t("Özel Analiz")}</Text>
                  </View>
                </View>

                {/* Quick Quiz Action CTA */}
                {allMistakes.length > 0 && (
                  <BouncyPressable
                    onPress={startGeneralQuiz}
                    style={styles.quickQuizBtn}
                    hapticType="medium"
                    scaleTo={0.96}
                  >
                    <Ionicons name="flash" size={15} color="#FFFFFF" />
                    <Text style={styles.quickQuizBtnText}>{t("Hızlı Pekiştirme Sınavı Başlat")}</Text>
                    <Ionicons name="arrow-forward" size={13} color="#FFFFFF" />
                  </BouncyPressable>
                )}
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
                  <Text style={styles.summaryTitle}>{t("🎯 En Çok Tekrarlanan Kurallar")}</Text>
                  <Text style={styles.summarySub}>{t("Dersi incele ve pekiştir")}</Text>
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
                        <Text style={styles.summaryChipAction}>{t("Dersi Çalış ➔")}</Text>
                      </View>
                      <View style={styles.summaryChipCountPill}>
                        <Text style={styles.summaryChipCountText}>{t("{{count}}x", { count })}</Text>
                      </View>
                    </Pressable>
                  ))}
                </ScrollView>
              </View>
            ) : null}

            {/* 3. Source Filter Tabs */}
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
                  >{t("🌐 Tümü ({{length}})", { length: allMistakes.length })}</Text>
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
                  >{t("✍️ Mini Quiz ({{quizCount}})", { quizCount })}</Text>
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
                  >{t("💬 AI Sohbet ({{chatCount}})", { chatCount })}</Text>
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
                  >{t("🎙️ Canlı Konuşma ({{voiceCount}})", { voiceCount })}</Text>
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
                  >{t("📖 Okuma ({{readingCount}})", { readingCount })}</Text>
                </Pressable>
              </ScrollView>
            </View>
          </View>
        }
        ListEmptyComponent={
          isLoading ? (
            <View style={styles.centerLoading}>
              <MivoLoader size={100} label={t("Hata defterin açılıyor…")} />
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
              <Text style={styles.emptyTitle}>{t("Tertemiz Bir Sayfa! 🎯")}</Text>
              <Text style={styles.emptyText}>
                {selectedFilter === 'ALL'
                  ? t("Henüz kayıtlı bir hatan bulunmuyor. Yapay zeka sohbetlerinde ve testlerde pratik yaptıkça takıldığın noktalar burada toplanacak.")
                  : t("Bu kategoride kayıtlı bir hatan bulunmuyor. Harika gidiyorsun!")}
              </Text>

              <BouncyPressable
                onPress={() => navigation.navigate('Main', { screen: 'Scenarios' })}
                style={styles.emptyActionBtn}
                hapticType="light"
                scaleTo={0.96}
              >
                <Ionicons name="mic" size={15} color="#FFFFFF" />
                <Text style={styles.emptyActionBtnText}>{t("Yeni Bir Sahneye Başla ➔")}</Text>
              </BouncyPressable>
            </View>
          )
        }
        renderItem={({ item, index }) => (
          <View style={[styles.mistakeCard, shadow.card]}>
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
                  <Text style={styles.topicPillText}>{item.topic_code} ➔</Text>
                </Pressable>
              ) : null}

              <Pressable
                onPress={() => deleteMutation.mutate(item.id)}
                hitSlop={8}
                style={styles.deleteBtn}
              >
                <Ionicons name="checkmark-circle" size={15} color={colors.success} />
                <Text style={styles.deleteBtnText}>{t("Öğrendim")}</Text>
              </Pressable>
            </View>

            {/* Wrong sentence box */}
            <View style={styles.wrongBox}>
              <View style={styles.boxTagRed}>
                <Ionicons name="close-circle" size={12} color="#DC2626" />
                <Text style={styles.boxTagRedText}>{t("HATALI İFADE")}</Text>
              </View>
              <Text style={styles.wrongText}>{item.wrong_text}</Text>
            </View>

            {/* Corrected sentence box */}
            <View style={styles.rightBox}>
              <View style={styles.boxTagGreen}>
                <Ionicons name="checkmark-circle" size={12} color="#059669" />
                <Text style={styles.boxTagGreenText}>{t("DOĞRU KULLANIM")}</Text>
              </View>
              <Text style={styles.rightText}>{item.corrected_text}</Text>
            </View>

            {/* Turkish explanation note */}
            {item.explanation_tr ? (
              <View style={styles.explBox}>
                <View style={styles.explHeaderRow}>
                  <Ionicons name="bulb" size={13} color="#D97706" />
                  <Text style={styles.explLabel}>{t("KURAL VE AÇIKLAMA:")}</Text>
                </View>
                <Text style={styles.explText}>{item.explanation_tr}</Text>
              </View>
            ) : null}

            {/* Action Bar: Kendini Sına & Dersi Aç */}
            <View style={styles.cardActionsRow}>
              <Pressable
                onPress={() => startQuizForMistake(item)}
                style={styles.testSelfBtn}
              >
                <Ionicons name="flash-outline" size={13} color={colors.brand} />
                <Text style={styles.testSelfBtnText}>{t("Kendini Sına 🎯")}</Text>
              </Pressable>

              {item.topic_code && isGrammarLessonCode(item.topic_code) && (
                <Pressable
                  onPress={() => navigation.navigate('GrammarLesson', { code: item.topic_code! })}
                  style={styles.readLessonBtn}
                >
                  <Text style={styles.readLessonBtnText}>{t("Kural Dersini İncele ➔")}</Text>
                </Pressable>
              )}
            </View>
          </View>
        )}
      />

      {/* ============================================================ */}
      {/* ACTIVE RECALL QUIZ MODAL (KENDİNİ SINA & PEKİŞTİR)            */}
      {/* ============================================================ */}
      {activeQuizItem && (
        <Modal
          visible={quizModalOpen}
          transparent
          animationType="fade"
          onRequestClose={() => setQuizModalOpen(false)}
        >
          <View style={styles.modalBackdrop}>
            <View style={[styles.modalCard, shadow.card]}>
              <View style={styles.modalHeader}>
                <View style={styles.modalHeaderTitleRow}>
                  <Ionicons name="flash" size={16} color={colors.brand} />
                  <Text style={styles.modalTitle}>{t("Hata Pekiştirme Sınavı")}</Text>
                </View>
                <Pressable onPress={() => setQuizModalOpen(false)} hitSlop={10}>
                  <Ionicons name="close" size={20} color={colors.textMuted} />
                </Pressable>
              </View>

              <Text style={styles.modalPrompt}>{t("Aşağıdaki seçeneklerden hangisi dilbilgisi kurallarına uygundur?")}</Text>

              {/* Option Choices */}
              <View style={styles.modalChoicesCol}>
                {isCorrectChoiceFirst ? (
                  <>
                    <Pressable
                      onPress={() => {
                        setQuizSelectedChoice('right');
                        setQuizFeedback('correct');
                      }}
                      style={[
                        styles.modalChoiceBtn,
                        quizSelectedChoice === 'right' && styles.modalChoiceBtnCorrect,
                      ]}
                    >
                      <Text style={styles.modalChoiceText}>{activeQuizItem.corrected_text}</Text>
                      {quizSelectedChoice === 'right' && (
                        <Ionicons name="checkmark-circle" size={18} color="#059669" />
                      )}
                    </Pressable>

                    <Pressable
                      onPress={() => {
                        setQuizSelectedChoice('wrong');
                        setQuizFeedback('wrong');
                      }}
                      style={[
                        styles.modalChoiceBtn,
                        quizSelectedChoice === 'wrong' && styles.modalChoiceBtnWrong,
                      ]}
                    >
                      <Text style={styles.modalChoiceText}>{activeQuizItem.wrong_text}</Text>
                      {quizSelectedChoice === 'wrong' && (
                        <Ionicons name="close-circle" size={18} color="#DC2626" />
                      )}
                    </Pressable>
                  </>
                ) : (
                  <>
                    <Pressable
                      onPress={() => {
                        setQuizSelectedChoice('wrong');
                        setQuizFeedback('wrong');
                      }}
                      style={[
                        styles.modalChoiceBtn,
                        quizSelectedChoice === 'wrong' && styles.modalChoiceBtnWrong,
                      ]}
                    >
                      <Text style={styles.modalChoiceText}>{activeQuizItem.wrong_text}</Text>
                      {quizSelectedChoice === 'wrong' && (
                        <Ionicons name="close-circle" size={18} color="#DC2626" />
                      )}
                    </Pressable>

                    <Pressable
                      onPress={() => {
                        setQuizSelectedChoice('right');
                        setQuizFeedback('correct');
                      }}
                      style={[
                        styles.modalChoiceBtn,
                        quizSelectedChoice === 'right' && styles.modalChoiceBtnCorrect,
                      ]}
                    >
                      <Text style={styles.modalChoiceText}>{activeQuizItem.corrected_text}</Text>
                      {quizSelectedChoice === 'right' && (
                        <Ionicons name="checkmark-circle" size={18} color="#059669" />
                      )}
                    </Pressable>
                  </>
                )}
              </View>

              {/* Feedback Alert */}
              {quizFeedback === 'correct' && (
                <View style={styles.feedbackSuccessBox}>
                  <Text style={styles.feedbackSuccessTitle}>{t("🎉 Mükemmel! Doğru Cevap.")}</Text>
                  <Text style={styles.feedbackSuccessSub}>{activeQuizItem.explanation_tr}</Text>
                </View>
              )}

              {quizFeedback === 'wrong' && (
                <View style={styles.feedbackErrorBox}>
                  <Text style={styles.feedbackErrorTitle}>{t("❌ Yanlış Seçenek")}</Text>
                  <Text style={styles.feedbackErrorSub}>{activeQuizItem.explanation_tr}</Text>
                </View>
              )}

              {/* Modal Bottom Buttons */}
              <View style={styles.modalBottomRow}>
                {quizFeedback === 'correct' ? (
                  <BouncyPressable
                    onPress={() => deleteMutation.mutate(activeQuizItem.id)}
                    style={styles.modalMasteredBtn}
                    hapticType="medium"
                    scaleTo={0.96}
                  >
                    <Ionicons name="checkmark-circle" size={16} color="#FFFFFF" />
                    <Text style={styles.modalMasteredBtnText}>{t("Pekiştirdim, Defterden Temizle")}</Text>
                  </BouncyPressable>
                ) : (
                  <Pressable
                    onPress={() => setQuizModalOpen(false)}
                    style={styles.modalCloseBtn}
                  >
                    <Text style={styles.modalCloseBtnText}>{t("Kapat")}</Text>
                  </Pressable>
                )}
              </View>
            </View>
          </View>
        </Modal>
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
    fontSize: 16,
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

  /* 1. Hero Card */
  heroBentoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    marginBottom: spacing.md,
  },
  heroLeftCol: {
    flex: 1,
    paddingRight: 10,
  },
  heroBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(79, 70, 229, 0.08)',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.pill,
    marginBottom: 6,
    gap: 4,
  },
  heroBadgeText: {
    fontFamily: fonts.mono,
    fontSize: 9.5,
    fontWeight: 'bold',
    color: colors.brand,
  },
  heroTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 15,
    color: colors.textHeading,
    lineHeight: 20,
    marginBottom: 4,
  },
  heroDesc: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
    lineHeight: 15,
    marginBottom: 10,
  },
  microStatsRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 10,
  },
  microStatPill: {
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
  },
  microStatVal: {
    fontFamily: fonts.headingBold,
    fontSize: 12,
    color: colors.textHeading,
  },
  microStatLbl: {
    fontFamily: fonts.mono,
    fontSize: 8.5,
    color: colors.textMuted,
    marginTop: 1,
  },
  microStatPillEmerald: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    alignItems: 'center',
  },
  microStatValEmerald: {
    fontFamily: fonts.headingBold,
    fontSize: 12,
    color: '#047857',
  },
  microStatLblEmerald: {
    fontFamily: fonts.mono,
    fontSize: 8.5,
    color: '#059669',
    marginTop: 1,
  },
  quickQuizBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.brand,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radii.sm,
    gap: 6,
    alignSelf: 'flex-start',
  },
  quickQuizBtnText: {
    fontFamily: fonts.headingBold,
    fontSize: 11.5,
    color: '#FFFFFF',
  },
  heroRightIconWrapper: {
    width: 80,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hero3dImage: {
    width: 75,
    height: 85,
    borderRadius: 14,
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
  },
  summaryTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 13,
    color: colors.textHeading,
  },
  summarySub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
  },
  summaryScroll: {
    gap: 8,
    paddingVertical: 2,
  },
  summaryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 8,
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
    fontFamily: fonts.headingBold,
    fontSize: 11.5,
    color: colors.textHeading,
  },
  summaryChipAction: {
    fontFamily: fonts.mono,
    fontSize: 9.5,
    color: colors.brand,
    fontWeight: 'bold',
  },
  summaryChipCountPill: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radii.pill,
  },
  summaryChipCountText: {
    fontFamily: fonts.mono,
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.textMuted,
  },

  /* 3. Filter Section */
  filterSection: {
    marginBottom: spacing.xs,
  },
  filterTabsRow: {
    gap: 6,
    paddingVertical: 2,
  },
  filterTab: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radii.pill,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  filterTabActive: {
    backgroundColor: colors.brand,
    borderColor: colors.brand,
  },
  filterTabText: {
    fontFamily: fonts.headingBold,
    fontSize: 11,
    color: colors.textMuted,
  },
  filterTabTextActive: {
    color: '#FFFFFF',
  },

  /* 4. Mistake Cards */
  mistakeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 10,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 6,
  },
  cardIndexBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  cardIndexText: {
    fontFamily: fonts.mono,
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.textMuted,
  },
  sourceBadge: {
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  sourceBadgeText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10.5,
    color: colors.textHeading,
  },
  topicPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.pill,
    gap: 3,
  },
  topicPillText: {
    fontFamily: fonts.mono,
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.brand,
  },
  deleteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radii.pill,
    gap: 3,
    marginLeft: 'auto',
  },
  deleteBtnText: {
    fontFamily: fonts.headingBold,
    fontSize: 10.5,
    color: '#047857',
  },
  wrongBox: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FEE2E2',
    borderRadius: 14,
    padding: 10,
    gap: 4,
  },
  boxTagRed: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  boxTagRedText: {
    fontFamily: fonts.mono,
    fontSize: 9,
    fontWeight: 'bold',
    color: '#DC2626',
  },
  wrongText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 13,
    color: '#991B1B',
    lineHeight: 18,
    textDecorationLine: 'line-through',
  },
  rightBox: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#DCFCE7',
    borderRadius: 14,
    padding: 10,
    gap: 4,
  },
  boxTagGreen: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  boxTagGreenText: {
    fontFamily: fonts.mono,
    fontSize: 9,
    fontWeight: 'bold',
    color: '#059669',
  },
  rightText: {
    fontFamily: fonts.headingBold,
    fontSize: 13,
    color: '#065F46',
    lineHeight: 18,
  },
  explBox: {
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FEF3C7',
    borderRadius: 14,
    padding: 10,
    gap: 3,
  },
  explHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  explLabel: {
    fontFamily: fonts.mono,
    fontSize: 9,
    fontWeight: 'bold',
    color: '#D97706',
  },
  explText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11.5,
    color: '#92400E',
    lineHeight: 16,
  },
  cardActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  testSelfBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radii.sm,
    gap: 4,
  },
  testSelfBtnText: {
    fontFamily: fonts.headingBold,
    fontSize: 11,
    color: colors.brand,
  },
  readLessonBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  readLessonBtnText: {
    fontFamily: fonts.headingBold,
    fontSize: 11,
    color: colors.textMuted,
  },

  /* 5. Empty State */
  centerLoading: {
    paddingVertical: 50,
    alignItems: 'center',
  },
  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginTop: 20,
    gap: 10,
  },
  emptyImageWrapper: {
    position: 'relative',
    width: 80,
    height: 80,
    marginBottom: 4,
  },
  empty3dImage: {
    width: 80,
    height: 80,
    borderRadius: 20,
  },
  emptyCheckBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  emptyTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 16,
    color: colors.textHeading,
  },
  emptyText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 17,
  },
  emptyActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.brand,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: radii.sm,
    gap: 6,
    marginTop: 6,
  },
  emptyActionBtnText: {
    fontFamily: fonts.headingBold,
    fontSize: 12,
    color: '#FFFFFF',
  },

  /* 6. Active Recall Modal */
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.md,
  },
  modalCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    gap: 14,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  modalHeaderTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  modalTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 15,
    color: colors.textHeading,
  },
  modalPrompt: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12.5,
    color: colors.textMuted,
    lineHeight: 17,
  },
  modalChoicesCol: {
    gap: 10,
  },
  modalChoiceBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    padding: 14,
  },
  modalChoiceBtnCorrect: {
    backgroundColor: '#ECFDF5',
    borderColor: '#10B981',
  },
  modalChoiceBtnWrong: {
    backgroundColor: '#FEF2F2',
    borderColor: '#EF4444',
  },
  modalChoiceText: {
    fontFamily: fonts.headingBold,
    fontSize: 13,
    color: colors.textHeading,
    flex: 1,
  },
  feedbackSuccessBox: {
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
    borderRadius: 14,
    padding: 12,
    gap: 4,
  },
  feedbackSuccessTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 12.5,
    color: '#047857',
  },
  feedbackSuccessSub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: '#065F46',
    lineHeight: 15,
  },
  feedbackErrorBox: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 14,
    padding: 12,
    gap: 4,
  },
  feedbackErrorTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 12.5,
    color: '#B91C1C',
  },
  feedbackErrorSub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: '#991B1B',
    lineHeight: 15,
  },
  modalBottomRow: {
    paddingTop: 8,
  },
  modalMasteredBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.success,
    paddingVertical: 12,
    borderRadius: radii.sm,
    gap: 6,
  },
  modalMasteredBtnText: {
    fontFamily: fonts.headingBold,
    fontSize: 13,
    color: '#FFFFFF',
  },
  modalCloseBtn: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  modalCloseBtnText: {
    fontFamily: fonts.headingBold,
    fontSize: 12,
    color: colors.textMuted,
  },
});
