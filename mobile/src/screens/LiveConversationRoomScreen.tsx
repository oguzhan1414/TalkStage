import { Ionicons } from '@expo/vector-icons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AiOrb } from '../components/AiOrb';
import { Button } from '../components/Button';
import { MicPermissionPrompt } from '../components/MicPermissionPrompt';
import { TappableWords } from '../components/TappableWords';
import { Toast } from '../components/Toast';
import { Waveform } from '../components/Waveform';
import { useConversationSocket, type OrbState } from '../hooks/useConversationSocket';
import { api, ApiError } from '../lib/api';
import { haptics } from '../lib/haptics';
import { colors, fonts, radii, shadow, spacing, typography } from '../theme/tokens';
import type { ScenarioOut, SessionEndRequest, SessionOut, VocabCardCreate } from '../types/api';
import type { WsCorrectionData, WsWordMetric } from '../types/ws';
import type { LiveConversationRoomScreenProps } from '../navigation/types';
import { useAnalytics, useTrackScreenView } from '../lib/analytics';

const ADVANCED_PATTERNS = [
  { regex: /\b(in my opinion|from my perspective|in my experience)\b/i, label: 'STAR İfade Metodu ✨', color: '#10B981' },
  { regex: /\b(furthermore|moreover|in addition|subsequently)\b/i, label: 'C1 İleri Seviye Bağlaç 🚀', color: '#6366F1' },
  { regex: /\b(however|nevertheless|on the other hand|in retrospect)\b/i, label: 'B2 Profesyonel Karşıtlık 🎯', color: '#8B5CF6' },
  { regex: /\b(specifically|for instance|to illustrate|for example)\b/i, label: 'Somutlaştırma Başarısı 💡', color: '#F59E0B' },
  { regex: /\b(as a result|consequently|therefore|thus)\b/i, label: 'Sonuç Çıkarımı +5XP ⚡', color: '#EC4899' },
];

const CLOSE_REASON_MESSAGES: Record<string, string> = {
  quota_exceeded: 'Bugünkü ücretsiz sahne hakkın doldu. Pro’ya geçerek sınırsız pratik yapabilirsin.',
  time_limit_reached: '5 dakikalık ücretsiz süre doldu.',
  missing_api_base_url: 'Backend adresi yapılandırılmamış (EXPO_PUBLIC_API_BASE_URL).',
};

const ORB_STATE_CONFIG: Record<OrbState, { label: string; color: string; icon: keyof typeof Ionicons.glyphMap }> = {
  idle: { label: 'Hazır', color: colors.textMuted, icon: 'radio-outline' },
  listening: { label: 'SIRA SENDE • Dinliyor…', color: '#10B981', icon: 'mic' },
  thinking: { label: 'Düşünüyor…', color: '#F59E0B', icon: 'hourglass-outline' },
  speaking: { label: 'Yankı Konuşuyor…', color: '#6366F1', icon: 'volume-high' },
};

function formatTimer(seconds: number): string {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export function LiveConversationRoomScreen({ navigation, route }: LiveConversationRoomScreenProps) {
  const { scenarioSlug, scenarioId: paramScenarioId, scenarioTitle: paramScenarioTitle } = route.params;
  useTrackScreenView('scenario_started', { scenario_slug: scenarioSlug });
  const { track } = useAnalytics();

  // Always fetched (not just when nav params are missing) — the mission card
  // and guide sections below need the real per-scenario ai_name/ai_role/
  // situation/key_phrases/suggested_vocab, which only exist on the full
  // ScenarioOut, not the trimmed {id, slug, title} the catalog list passes
  // as nav params. This REPLACES the old local `scenariosData.ts` matching
  // (`SCENARIOS.find(...) ?? SCENARIOS[0]`) — that list only ever had 5
  // hand-authored ids that never matched any real backend scenario slug, so
  // it silently showed the wrong scene's content every time (see backend
  // CLAUDE.md Ek 31/33). Scenarios without this content yet (e.g. the old
  // Deepgram test scene) fall back to generic values instead of wrong ones.
  const { data: resolvedScenario } = useQuery({
    queryKey: ['scenarios', scenarioSlug],
    queryFn: () => api.get<ScenarioOut>(`/scenarios/${scenarioSlug}`),
  });

  const scenarioId = paramScenarioId ?? resolvedScenario?.id;
  const scenarioTitle = paramScenarioTitle ?? resolvedScenario?.title ?? '';
  const aiName = resolvedScenario?.ai_name ?? 'Yankı';
  const aiRole = resolvedScenario?.ai_role ?? 'Sohbet Partneri';
  const situation = resolvedScenario?.situation ?? resolvedScenario?.description ?? '';
  const keyPhrases = resolvedScenario?.key_phrases ?? [];
  const suggestedVocab = resolvedScenario?.suggested_vocab ?? [];

  const {
    status,
    closeInfo,
    permissionDenied,
    interimText,
    interimWords,
    latestMetrics,
    totalFillersCount,
    wpmHistory,
    sceneCompleteSummary,
    aiReplyText,
    correction,
    turns,
    micLevelDb,
    orbState,
    endSession,
    startedAt,
    correctionsCount,
    fluencyScores,
  } = useConversationSocket(scenarioSlug);

  const queryClient = useQueryClient();
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const [wordsAddedCount, setWordsAddedCount] = useState(0);
  const [savingSession, setSavingSession] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
  const [completionBannerDismissed, setCompletionBannerDismissed] = useState(false);
  const [activeAccolade, setActiveAccolade] = useState<{ label: string; color: string } | null>(null);
  const accoladeAnim = useRef(new Animated.Value(0)).current;
  // Tracked via refs, not the `activeAccolade` state, so this effect never
  // needs `activeAccolade` in its dependency array (reading state there
  // without listing it is a stale-closure bug) and so a second match arriving
  // before the first's animation finishes stops the in-flight one instead of
  // stacking two competing Animated sequences on the same shared value.
  const lastAccoladeLabelRef = useRef<string | null>(null);
  const accoladeAnimationRef = useRef<Animated.CompositeAnimation | null>(null);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Live Advanced Pattern / Accolade Detection
  useEffect(() => {
    if (!interimText) return;
    const matched = ADVANCED_PATTERNS.find((p) => p.regex.test(interimText));
    if (!matched || lastAccoladeLabelRef.current === matched.label) return;

    lastAccoladeLabelRef.current = matched.label;
    setActiveAccolade(matched);
    haptics.success();

    accoladeAnimationRef.current?.stop();
    accoladeAnim.setValue(0);
    const sequence = Animated.sequence([
      Animated.spring(accoladeAnim, { toValue: 1, useNativeDriver: true, tension: 70 }),
      Animated.delay(2400),
      Animated.timing(accoladeAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
    ]);
    accoladeAnimationRef.current = sequence;
    sequence.start(() => {
      lastAccoladeLabelRef.current = null;
      setActiveAccolade(null);
    });
  }, [interimText]);

  useEffect(() => {
    if (status !== 'open') return;
    const interval = setInterval(() => setElapsedSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, [status]);

  useEffect(() => () => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
  }, []);

  const showToast = (message: string) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToast(message);
    toastTimeoutRef.current = setTimeout(() => setToast(null), 1600);
  };

  const handleSaveWord = async (word: string, sentence: string) => {
    try {
      const payload: VocabCardCreate = {
        term: word,
        source_scenario_id: scenarioId,
        example_sentence: sentence,
        source_label: scenarioTitle,
      };
      await api.post('/vocab-cards', payload);
      queryClient.invalidateQueries({ queryKey: ['vocab-cards'] });
      setWordsAddedCount((c) => c + 1);
      showToast(`“${word}” kelime defterine eklendi`);
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : 'Kelime kaydedilemedi');
    }
  };

  const finishSession = async () => {
    if (turns.length === 0 || !startedAt || !scenarioId) {
      navigation.goBack();
      return;
    }
    setSavingSession(true);
    try {
      const payload: SessionEndRequest = {
        scenario_id: scenarioId,
        started_at: startedAt,
        ended_at: new Date().toISOString(),
        transcript: turns,
        corrections_count: correctionsCount,
        fluency_scores: fluencyScores,
      };
      const result = await api.post<SessionOut>('/sessions/end', payload);
      track('scenario_session_ended', {
        scenario_slug: scenarioSlug,
        duration_seconds: result.duration_seconds,
        fluency_score: result.fluency_score,
      });
      navigation.replace('Scorecard', { session: result, scenarioTitle, wordsAddedCount });
    } catch {
      navigation.goBack();
    } finally {
      setSavingSession(false);
    }
  };

  const handleExit = () => {
    endSession();
    finishSession();
  };

  const currentWpm = latestMetrics?.wpm ?? (wpmHistory.length > 0 ? wpmHistory[wpmHistory.length - 1] : 0);
  const currentConfidence = latestMetrics?.avg_confidence ?? 0.95;
  const currentOrbConfig = ORB_STATE_CONFIG[orbState];

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <Pressable
          onPress={handleExit}
          hitSlop={12}
          style={styles.headerIconButton}
          accessibilityRole="button"
          accessibilityLabel="Sahneden çık"
        >
          <Ionicons name="close" size={22} color={colors.textHeading} />
        </Pressable>

        <View style={styles.headerTitleCol}>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {scenarioTitle}
          </Text>
          <View style={styles.headerSubRow}>
            <View style={styles.liveIndicatorDot} />
            <Text style={styles.headerTimer}>⏱️ {formatTimer(elapsedSeconds)}</Text>
          </View>
        </View>

        {turns.length > 0 ? (
          <Pressable onPress={handleExit} style={styles.finishHeaderBtn} hitSlop={8}>
            <Text style={styles.finishHeaderBtnText}>Bitir ➔</Text>
          </Pressable>
        ) : (
          <View style={styles.headerRightSpacer} />
        )}
      </View>

      {permissionDenied ? (
        <View style={styles.centerBlock}>
          <MicPermissionPrompt onRequestPermission={() => navigation.goBack()} buttonLabel="Geri Dön" />
        </View>
      ) : status === 'connecting' ? (
        <View style={styles.centerBlock}>
          <ActivityIndicator color={colors.brand} size="large" />
          <Text style={styles.statusText}>Sesli odaya bağlanılıyor (Deepgram Canlı)…</Text>
        </View>
      ) : status === 'closed' ? (
        <View style={styles.centerBlock}>
          <Text style={styles.statusText}>
            {(closeInfo && CLOSE_REASON_MESSAGES[closeInfo.reason]) ?? 'Bağlantı tamamlandı.'}
          </Text>
          {savingSession ? (
            <ActivityIndicator color={colors.brand} />
          ) : closeInfo?.reason === 'quota_exceeded' ? (
            <>
              <Button
                label="Pro’ya Geç"
                onPress={() => navigation.navigate('Paywall')}
                style={styles.upsellButton}
              />
              <Pressable onPress={finishSession}>
                <Text style={styles.backLink}>{turns.length > 0 ? 'Karneni Gör' : 'Sahnelere dön'}</Text>
              </Pressable>
            </>
          ) : (
            <Pressable onPress={finishSession}>
              <Text style={styles.backLink}>{turns.length > 0 ? 'Karneni Gör' : 'Sahnelere dön'}</Text>
            </Pressable>
          )}
        </View>
      ) : (
        <View style={styles.mainLayout}>
          {/* Scrollable Conversation & Guidance Stage */}
          <ScrollView
            style={styles.stageScrollView}
            contentContainerStyle={styles.stageScrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Soft "you can wrap up now" nudge — the model judged the
                scenario's objectives meaningfully covered (backend Ek 32).
                Never forces the conversation to end. */}
            {sceneCompleteSummary && !completionBannerDismissed && (
              <View style={styles.completionBanner}>
                <View style={styles.completionBannerTextCol}>
                  <Text style={styles.completionBannerTitle}>🎉 Hedeflere Ulaştın!</Text>
                  <Text style={styles.completionBannerText}>{sceneCompleteSummary}</Text>
                </View>
                <View style={styles.completionBannerActions}>
                  <Pressable onPress={handleExit} style={styles.completionBannerCta}>
                    <Text style={styles.completionBannerCtaText}>Karneni Gör</Text>
                  </Pressable>
                  <Pressable onPress={() => setCompletionBannerDismissed(true)} hitSlop={8}>
                    <Text style={styles.completionBannerDismiss}>Devam Et</Text>
                  </Pressable>
                </View>
              </View>
            )}

            {/* Scenario Mission Summary Card */}
            <View style={styles.missionCard}>
              <View style={styles.missionHeaderRow}>
                <Text style={styles.missionTag}>🎯 GÖREV & DURUM</Text>
                <Text style={styles.partnerTag}>🤖 {aiName} ({aiRole})</Text>
              </View>
              <Text style={styles.missionText}>{situation}</Text>
            </View>

            {/* AI Speech Area & Animated Orb */}
            <View style={styles.aiBubbleContainer}>
              <View style={styles.aiOrbWrapper}>
                <AiOrb state={orbState} />
              </View>

              <View style={styles.aiSpeechCard}>
                <View style={styles.aiSpeechHeader}>
                  <Text style={styles.aiSpeakerName}>{aiName}</Text>
                  <View
                    style={[
                      styles.aiStatusBadge,
                      { backgroundColor: `${currentOrbConfig.color}18` },
                    ]}
                  >
                    <Ionicons name={currentOrbConfig.icon} size={11} color={currentOrbConfig.color} />
                    <Text style={[styles.aiStatusBadgeText, { color: currentOrbConfig.color }]}>
                      {currentOrbConfig.label}
                    </Text>
                  </View>
                </View>

                {aiReplyText ? (
                  <TappableWords
                    text={`“${aiReplyText}”`}
                    onWordPress={(word) => handleSaveWord(word, aiReplyText)}
                    textStyle={styles.aiReplyText}
                  />
                ) : (
                  <Text style={styles.aiReplyPlaceholder}>
                    Yankı seni dinliyor. İlk cümleni söyleyebilirsin…
                  </Text>
                )}
              </View>
            </View>

            {/* Live Grammar Diagnosis Card */}
            {correction?.has_error ? <CorrectionCard correction={correction} /> : null}

            {/* Always-Visible Suggested Starter Phrases */}
            {keyPhrases.length > 0 && (
              <View style={styles.promptsSection}>
                <View style={styles.promptsHeaderRow}>
                  <Text style={styles.promptsSectionTitle}>💬 ŞİMDİ NE SÖYLEYEBİLİRSİN?</Text>
                  <Text style={styles.promptsHint}>Aşağıdaki kalıplardan birini doğrudan oku</Text>
                </View>

                <View style={styles.promptsList}>
                  {keyPhrases.map((phrase, idx) => {
                    const isSelected = selectedPrompt === phrase.en;
                    return (
                      <Pressable
                        key={idx}
                        onPress={() => setSelectedPrompt(isSelected ? null : phrase.en)}
                        style={[styles.promptCard, isSelected && styles.promptCardSelected]}
                      >
                        <View style={styles.promptTopRow}>
                          <Text style={styles.promptEnText}>&ldquo;{phrase.en}&rdquo;</Text>
                          <Ionicons
                            name="volume-medium-outline"
                            size={16}
                            color={isSelected ? colors.brand : colors.textMuted}
                          />
                        </View>
                        <Text style={styles.promptTrText}>🇹🇷 {phrase.tr}</Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            )}

            {/* Target Vocabulary Chips */}
            {suggestedVocab.length > 0 && (
              <View style={styles.vocabSection}>
                <Text style={styles.vocabSectionTitle}>📌 KULLANABİLECEĞİN KELİMELER:</Text>
                <View style={styles.vocabRow}>
                  {suggestedVocab.map((v, i) => (
                    <Pressable
                      key={i}
                      onPress={() => handleSaveWord(v.term, v.tr)}
                      style={styles.vocabChip}
                    >
                      <Text style={styles.vocabChipText}>+ {v.term}</Text>
                      <Text style={styles.vocabChipSubText}>({v.tr})</Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            )}
          </ScrollView>

          {/* Pinned Bottom Audio Controller */}
          <View style={styles.bottomDock}>
            {/* Floating Accolade Spark Banner */}
            {activeAccolade && (
              <Animated.View
                style={[
                  styles.floatingAccoladePill,
                  {
                    backgroundColor: `${activeAccolade.color}15`,
                    borderColor: activeAccolade.color,
                    opacity: accoladeAnim,
                    transform: [
                      {
                        translateY: accoladeAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [6, 0],
                        }),
                      },
                      {
                        scale: accoladeAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.92, 1],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <Text style={[styles.floatingAccoladeText, { color: activeAccolade.color }]}>
                  {activeAccolade.label}
                </Text>
              </Animated.View>
            )}

            {/* Live Deepgram Telemetry HUD */}
            <View style={styles.dockTelemetryRow}>
              <View style={styles.dockBadge}>
                <Ionicons name="speedometer-outline" size={12} color={colors.brand} />
                <Text style={styles.dockBadgeText}>
                  {currentWpm > 0 ? `${currentWpm} WPM` : '135 WPM'}
                </Text>
              </View>

              <View style={styles.dockBadge}>
                <Ionicons name="sparkles" size={11} color={colors.success} />
                <Text style={styles.dockBadgeText}>
                  %{Math.round(currentConfidence * 100)} Telaffuz
                </Text>
              </View>

              <View style={styles.dockBadge}>
                <Ionicons name="chatbubbles-outline" size={12} color="#EA580C" />
                <Text style={styles.dockBadgeText}>
                  {totalFillersCount === 0 ? '0 Umm ✨' : `${totalFillersCount} Dolgu`}
                </Text>
              </View>
            </View>

            {/* User Live Speech Box */}
            <View style={styles.speechStreamBox}>
              <View style={styles.streamLabelRow}>
                <View style={styles.micPulseDot} />
                <Text style={styles.streamLabel}>SÖYLEDİĞİN (CANLI DEEPGRAM AKIŞI)</Text>
              </View>

              {interimWords.length > 0 ? (
                <ConfidenceWords
                  words={interimWords}
                  onWordPress={(word) => handleSaveWord(word, interimText)}
                />
              ) : interimText ? (
                <TappableWords
                  text={interimText}
                  onWordPress={(word) => handleSaveWord(word, interimText)}
                  textStyle={styles.userTranscript}
                />
              ) : (
                <Text style={styles.userTranscriptPlaceholder}>
                  Mikrofona doğrudan İngilizce konuşmaya başla…
                </Text>
              )}
            </View>

            {/* Live Audio Waveform Meter */}
            <View style={styles.waveformContainer}>
              <Waveform meteringDb={micLevelDb} active={status === 'open'} />
            </View>
          </View>
        </View>
      )}

      {toast ? <Toast message={toast} /> : null}
    </SafeAreaView>
  );
}

/** Renders words with real-time confidence coloring from Deepgram. */
function ConfidenceWords({
  words,
  onWordPress,
}: {
  words: WsWordMetric[];
  onWordPress: (word: string) => void;
}) {
  return (
    <View style={styles.wordsContainer}>
      {words.map((item, idx) => {
        const conf = item.confidence;
        return (
          <Pressable key={idx} onPress={() => onWordPress(item.word)} hitSlop={4}>
            <Text
              style={[
                styles.wordText,
                conf < 0.75 ? styles.wordLow : conf < 0.90 ? styles.wordMedium : styles.wordHigh,
              ]}
            >
              {item.punctuated_word ?? item.word}{' '}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function CorrectionCard({ correction }: { correction: WsCorrectionData }) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    anim.setValue(0);
    Animated.timing(anim, { toValue: 1, duration: 280, useNativeDriver: true }).start();
  }, [anim, correction]);

  return (
    <Animated.View
      style={[
        styles.correctionCard,
        shadow.card,
        {
          opacity: anim,
          transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [12, 0] }) }],
        },
      ]}
    >
      <View style={styles.correctionHeaderRow}>
        <Ionicons name="sparkles" size={14} color="#6366F1" />
        <Text style={styles.correctionLabel}>Canlı Gramer İpucu</Text>
      </View>
      <Text style={styles.correctionText}>{correction.corrected}</Text>
      <Text style={styles.correctionExplanation}>🇹🇷 {correction.explanation_tr}</Text>
    </Animated.View>
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
  headerIconButton: {
    width: 36,
    height: 36,
    borderRadius: radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F5F9',
  },
  headerTitleCol: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
  },
  headerTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 13,
    color: colors.textHeading,
  },
  headerSubRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  liveIndicatorDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
  headerTimer: {
    fontFamily: fonts.mono,
    fontSize: 10,
    color: colors.textMuted,
  },
  finishHeaderBtn: {
    backgroundColor: colors.brand,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radii.pill,
  },
  finishHeaderBtnText: {
    fontFamily: fonts.headingBold,
    fontSize: 11,
    color: '#FFFFFF',
  },
  headerRightSpacer: {
    width: 36,
  },
  centerBlock: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    gap: spacing.md,
  },
  statusText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 13,
    color: colors.textBody,
    textAlign: 'center',
  },
  backLink: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 13,
    color: colors.brand,
  },
  upsellButton: {
    marginBottom: spacing.md,
    minWidth: 200,
  },
  mainLayout: {
    flex: 1,
  },
  stageScrollView: {
    flex: 1,
  },
  stageScrollContent: {
    padding: spacing.md,
    gap: spacing.md,
    paddingBottom: 24,
  },
  completionBanner: {
    backgroundColor: '#ECFDF5',
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    padding: spacing.md,
    gap: 8,
  },
  completionBannerTextCol: {
    gap: 2,
  },
  completionBannerTitle: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 13,
    color: '#047857',
  },
  completionBannerText: {
    ...typography.caption,
    color: '#065F46',
    lineHeight: 16,
  },
  completionBannerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  completionBannerCta: {
    backgroundColor: '#059669',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: radii.pill,
  },
  completionBannerCtaText: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 12,
    color: '#FFFFFF',
  },
  completionBannerDismiss: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    color: '#047857',
  },
  missionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.lg,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 4,
  },
  missionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  missionTag: {
    fontFamily: fonts.mono,
    fontSize: 9,
    fontWeight: 'bold',
    color: colors.brand,
    letterSpacing: 0.5,
  },
  partnerTag: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 10,
    color: colors.textMuted,
  },
  missionText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textHeading,
    lineHeight: 16,
  },
  aiBubbleContainer: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  aiOrbWrapper: {
    marginVertical: 4,
  },
  aiSpeechCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: radii.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 8,
  },
  aiSpeechHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  aiSpeakerName: {
    fontFamily: fonts.headingBold,
    fontSize: 12,
    color: colors.textHeading,
  },
  aiStatusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.pill,
  },
  aiStatusBadgeText: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 10,
  },
  aiReplyText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 15,
    color: colors.textHeading,
    lineHeight: 22,
  },
  aiReplyPlaceholder: {
    fontFamily: fonts.bodyRegular,
    fontSize: 13,
    color: colors.textMuted,
    fontStyle: 'italic',
    lineHeight: 18,
  },
  correctionCard: {
    backgroundColor: '#EEF2FF',
    borderRadius: radii.lg,
    padding: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#6366F1',
    gap: 4,
  },
  correctionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  correctionLabel: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 10,
    color: '#4F46E5',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  correctionText: {
    fontFamily: fonts.headingBold,
    fontSize: 13,
    color: colors.textHeading,
  },
  correctionExplanation: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: '#475569',
    lineHeight: 15,
  },
  promptsSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 8,
  },
  promptsHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 4,
  },
  promptsSectionTitle: {
    fontFamily: fonts.mono,
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.brand,
    letterSpacing: 0.5,
  },
  promptsHint: {
    fontFamily: fonts.bodyRegular,
    fontSize: 9,
    color: colors.textMuted,
  },
  promptsList: {
    gap: 6,
  },
  promptCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: radii.md,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 2,
  },
  promptCardSelected: {
    backgroundColor: '#EEF2FF',
    borderColor: '#C7D2FE',
  },
  promptTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  promptEnText: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 12,
    color: colors.textHeading,
    flex: 1,
    marginRight: 6,
  },
  promptTrText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10,
    color: colors.textMuted,
  },
  vocabSection: {
    gap: 6,
  },
  vocabSectionTitle: {
    fontFamily: fonts.mono,
    fontSize: 9,
    fontWeight: 'bold',
    color: colors.textMuted,
    letterSpacing: 0.5,
  },
  vocabRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  vocabChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  vocabChipText: {
    fontFamily: fonts.mono,
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.textHeading,
  },
  vocabChipSubText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 9,
    color: colors.textMuted,
  },
  bottomDock: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: radii.xl,
    borderTopRightRadius: radii.xl,
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    gap: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 6,
  },
  floatingAccoladePill: {
    alignSelf: 'center',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: radii.pill,
    borderWidth: 1.5,
    marginBottom: 4,
  },
  floatingAccoladeText: {
    fontFamily: fonts.headingBold,
    fontSize: 11,
  },
  dockTelemetryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  dockBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  dockBadgeText: {
    fontFamily: fonts.mono,
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.textHeading,
  },
  speechStreamBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: radii.lg,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    minHeight: 52,
    justifyContent: 'center',
  },
  streamLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  micPulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#EF4444',
  },
  streamLabel: {
    fontFamily: fonts.mono,
    fontSize: 9,
    fontWeight: 'bold',
    color: colors.textMuted,
    letterSpacing: 0.5,
  },
  wordsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  wordText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 14,
    lineHeight: 20,
  },
  wordHigh: {
    color: colors.textHeading,
  },
  wordMedium: {
    color: '#D97706',
  },
  wordLow: {
    color: '#EF4444',
    textDecorationLine: 'underline',
  },
  userTranscript: {
    fontFamily: fonts.bodyRegular,
    fontSize: 13,
    color: colors.textHeading,
  },
  userTranscriptPlaceholder: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: colors.textMuted,
    fontStyle: 'italic',
  },
  waveformContainer: {
    marginTop: 2,
  },
});
