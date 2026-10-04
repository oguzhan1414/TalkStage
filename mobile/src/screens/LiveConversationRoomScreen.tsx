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
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AiOrb } from '../components/AiOrb';
import { Button } from '../components/Button';
import { MicPermissionPrompt } from '../components/MicPermissionPrompt';
import { VoicePrivacyPrompt } from '../components/VoicePrivacyPrompt';
import { TappableWords } from '../components/TappableWords';
import { Toast } from '../components/Toast';
import { Waveform } from '../components/Waveform';
import { useConversationSocket, type TurnPhase } from '../hooks/useConversationSocket';
import { api, ApiError } from '../lib/api';
import { haptics } from '../lib/haptics';
import { colors, fonts, radii, spacing, typography } from '../theme/tokens';
import type { ScenarioOut, SessionEndRequest, SessionOut, VocabCardCreate } from '../types/api';
import type { WsCorrectionData, WsWordMetric } from '../types/ws';
import type { LiveConversationRoomScreenProps } from '../navigation/types';
import { useAnalytics, useTrackScreenView } from '../lib/analytics';
import { usePronunciation } from '../hooks/usePronunciation';

const ADVANCED_PATTERNS = [
  { regex: /\b(in my opinion|from my perspective|in my experience)\b/i, label: 'STAR İfade Metodu ✨', color: '#10B981' },
  { regex: /\b(furthermore|moreover|in addition|subsequently)\b/i, label: 'C1 İleri Seviye Bağlaç 🚀', color: '#6366F1' },
  { regex: /\b(however|nevertheless|on the other hand|in retrospect)\b/i, label: 'B2 Profesyonel Karşıtlık 🎯', color: '#8B5CF6' },
  { regex: /\b(specifically|for instance|to illustrate|for example)\b/i, label: 'Somutlaştırma Başarısı 💡', color: '#F59E0B' },
  { regex: /\b(as a result|consequently|therefore|thus)\b/i, label: 'Sonuç Çıkarımı +5XP ⚡', color: '#EC4899' },
];

// Below this, Deepgram likely misheard rather than just transcribed
// imperfectly — the review card frames it as "I couldn't quite catch that"
// instead of "here's what I heard", though sending anyway is always allowed.
const LOW_CONFIDENCE_THRESHOLD = 0.55;

const CLOSE_REASON_MESSAGES: Record<string, string> = {
  quota_exceeded: 'Bugünkü ücretsiz sahne hakkın doldu. Pro’ya geçerek sınırsız pratik yapabilirsin.',
  time_limit_reached: '5 dakikalık ücretsiz süre doldu.',
  missing_api_base_url: 'Backend adresi yapılandırılmamış (EXPO_PUBLIC_API_BASE_URL).',
  connection_error: 'Sesli odaya bağlanılamadı. İnternet bağlantını kontrol et.',
};

Object.assign(CLOSE_REASON_MESSAGES, {
  auth_required: 'Oturum doğrulanamadı. Lütfen yeniden giriş yap.',
  auth_invalid: 'Oturumunun süresi dolmuş. Lütfen yeniden giriş yap.',
  scenario_not_found: 'Bu konuşma sahnesi artık bulunamıyor.',
  voice_reply_failed: 'AI yanıtı oluşturulamadı. Birkaç saniye sonra tekrar konuşabilirsin.',
  session_error: 'Canlı konuşma bağlantısında beklenmeyen bir hata oluştu.',
  microphone_start_failed: 'Mikrofon başlatılamadı. Uygulama izinlerini kontrol et.',
});

type DisplayBubble =
  | { key: string; kind: 'user'; text: string; words?: WsWordMetric[]; correction?: WsCorrectionData | null }
  | { key: string; kind: 'assistant'; text: string };

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
  const beginnerTeacherMode = ['A1', 'A2'].includes((resolvedScenario?.cefr_level ?? '').toUpperCase());
  const aiName = beginnerTeacherMode ? 'Maya' : resolvedScenario?.ai_name ?? 'Yankı';
  const aiRole = beginnerTeacherMode
    ? 'Türkçe İngilizce Öğretmeni'
    : resolvedScenario?.ai_role ?? 'Sohbet Partneri';
  const situation = resolvedScenario?.situation ?? resolvedScenario?.description ?? '';
  const keyPhrases = resolvedScenario?.key_phrases ?? [];
  const suggestedVocab = resolvedScenario?.suggested_vocab ?? [];

  const {
    status,
    closeInfo,
    permissionDenied,
    voicePrivacyLoading,
    needsVoicePrivacyAcknowledgement,
    acknowledgeVoicePrivacy,
    interimText,
    interimWords,
    latestMetrics,
    totalFillersCount,
    wpmHistory,
    confidenceHistory,
    sceneCompleteSummary,
    liveError,
    aiReplyText,
    correction,
    turns,
    turnPhase,
    startTurn,
    stopTurn,
    redoTurn,
    confirmTranscript,
    retryLastTurn,
    pendingTranscript,
    pendingWords,
    pendingConfidence,
    suggestedReplies,
    coachTipTr,
    stopAiAudio,
    replayAiAudio,
    hasReplayableAudio,
    micLevelDb,
    orbState,
    endSession,
    reconnect,
    startedAt,
    correctionsCount,
    fluencyScores,
  } = useConversationSocket(scenarioSlug);

  const queryClient = useQueryClient();
  const { pronounce } = usePronunciation();
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const [wordsAddedCount, setWordsAddedCount] = useState(0);
  const [savingSession, setSavingSession] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
  const [completionBannerDismissed, setCompletionBannerDismissed] = useState(false);
  const [tipsExpanded, setTipsExpanded] = useState(false);
  const [editedTranscript, setEditedTranscript] = useState('');
  const [isEditingTranscript, setIsEditingTranscript] = useState(false);
  const chatScrollRef = useRef<ScrollView>(null);
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
  const savingSessionRef = useRef(false);
  const lastTrackedCloseReasonRef = useRef<string | null>(null);

  useEffect(() => {
    if (permissionDenied) {
      track('voice_permission_denied', { scenario_slug: scenarioSlug });
    }
  }, [permissionDenied, scenarioSlug, track]);

  useEffect(() => {
    const reason = closeInfo?.reason;
    if (!reason || reason === lastTrackedCloseReasonRef.current || reason === 'user_ended_session') return;
    lastTrackedCloseReasonRef.current = reason;
    track('voice_connection_closed', {
      scenario_slug: scenarioSlug,
      reason,
      close_code: closeInfo.code,
    });
  }, [closeInfo, scenarioSlug, track]);

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

  // Freshly resets the review card's local edit buffer every time a new
  // transcript comes in for confirmation (not on every render).
  useEffect(() => {
    if (pendingTranscript != null) {
      setEditedTranscript(pendingTranscript);
      setIsEditingTranscript(false);
    }
  }, [pendingTranscript]);

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
    if (savingSessionRef.current) return;
    if (turns.length === 0 || !startedAt || !scenarioId) {
      navigation.goBack();
      return;
    }
    savingSessionRef.current = true;
    setSavingSession(true);
    setSaveError(null);
    try {
      const payload: SessionEndRequest = {
        scenario_id: scenarioId,
        started_at: startedAt,
        ended_at: new Date().toISOString(),
        // `turns` carries a UI-only `correction` field (see types/ws.ts) —
        // strip it back down to the plain {role, text} shape the backend expects.
        transcript: turns.map(({ role, text }) => ({ role, text })),
        corrections_count: correctionsCount,
        fluency_scores: fluencyScores,
        wpm_values: wpmHistory,
        confidence_values: confidenceHistory,
      };
      const result = await api.post<SessionOut>('/sessions/end', payload);
      track('scenario_session_ended', {
        scenario_slug: scenarioSlug,
        duration_seconds: result.duration_seconds,
        fluency_score: result.fluency_score,
      });
      navigation.replace('Scorecard', { session: result, scenarioTitle, wordsAddedCount });
    } catch {
      setSaveError('Oturum kaydedilemedi. Bağlantını kontrol edip tekrar dene.');
    } finally {
      savingSessionRef.current = false;
      setSavingSession(false);
    }
  };

  const handleExit = () => {
    endSession();
    void finishSession();
  };

  const currentWpm = latestMetrics?.wpm ?? (wpmHistory.length > 0 ? wpmHistory[wpmHistory.length - 1] : 0);
  const currentConfidence = latestMetrics?.avg_confidence ?? null;

  // Turn banner now tracks the full 6-phase push-to-talk machine (not just
  // the coarser `orbState` AiOrb animation) — most importantly, it turns
  // green the instant it's genuinely the user's turn, with an explicit
  // "no rush" message instead of implying any time pressure.
  const TURN_PHASE_BANNER: Record<TurnPhase, { label: string; sub: string; color: string }> = {
    ai_speaking: { label: `${aiName} Konuşuyor… Mikrofon Kapalı`, sub: `${aiName} • ${aiRole}`, color: '#6366F1' },
    ai_thinking: { label: `${aiName} Düşünüyor… Mikrofon Kapalı`, sub: `${aiName} • ${aiRole}`, color: '#F59E0B' },
    thinking_time: { label: 'SIRA SENDE', sub: 'Düşünmek için acele etme 🙂', color: '#10B981' },
    recording: { label: 'Konuşuyorsun…', sub: 'Bitirince "Konuşmayı Bitir"e dokun', color: '#10B981' },
    reviewing: { label: 'Transkripti Kontrol Et', sub: 'Göndermeden önce gözden geçir', color: '#6366F1' },
    error: { label: 'Bir Sorun Oluştu', sub: 'Tekrar dene ya da yazarak devam et', color: colors.error },
  };
  const turnBannerConfig = TURN_PHASE_BANNER[turnPhase];

  // Completed turns + whichever turn is currently in progress, merged into
  // one ordered list so the transcript renders as a real chat thread instead
  // of two separate "latest AI text" / "latest your text" boxes.
  const displayBubbles: DisplayBubble[] = [
    ...turns.map((t, i) =>
      t.role === 'user'
        ? { key: `t-${i}`, kind: 'user' as const, text: t.text, correction: t.correction }
        : { key: `t-${i}`, kind: 'assistant' as const, text: t.text }
    ),
    ...(interimText
      ? [{ key: 'live-user', kind: 'user' as const, text: interimText, words: interimWords, correction }]
      : []),
    ...(aiReplyText ? [{ key: 'live-assistant', kind: 'assistant' as const, text: aiReplyText }] : []),
  ];

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

      {voicePrivacyLoading ? (
        <View style={styles.centerBlock}>
          <ActivityIndicator color={colors.brand} size="large" />
        </View>
      ) : needsVoicePrivacyAcknowledgement ? (
        <View style={styles.centerBlock}>
          <VoicePrivacyPrompt onContinue={acknowledgeVoicePrivacy} />
        </View>
      ) : permissionDenied ? (
        <View style={styles.centerBlock}>
          <MicPermissionPrompt />
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
          {saveError ? <Text style={styles.saveErrorText}>{saveError}</Text> : null}
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
          ) : turns.length === 0 && closeInfo?.reason !== 'time_limit_reached' ? (
            <>
              <Button label="Tekrar Bağlan" onPress={reconnect} style={styles.upsellButton} />
              <Pressable onPress={finishSession}>
                <Text style={styles.backLink}>Sahnelere dön</Text>
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
          {/* Turn-state banner — always visible, impossible to miss. The mic
              genuinely isn't transmitted outside "listening" (see
              useConversationSocket's handleBuffer), this just finally says so. */}
          <View
            style={[
              styles.turnBanner,
              { backgroundColor: `${turnBannerConfig.color}14`, borderColor: `${turnBannerConfig.color}40` },
            ]}
          >
            <AiOrb state={orbState} size={56} />
            <View style={styles.turnBannerTextCol}>
              <Text style={[styles.turnBannerLabel, { color: turnBannerConfig.color }]}>
                {turnBannerConfig.label}
              </Text>
              <Text style={styles.turnBannerSub} numberOfLines={1}>
                {turnBannerConfig.sub}
              </Text>
            </View>
          </View>

          {/* Soft "you can wrap up now" nudge — the model judged the
              scenario's objectives meaningfully covered (backend Ek 32).
              Never forces the conversation to end. */}
          {liveError ? (
            <View style={styles.liveErrorBanner}>
              <Ionicons name="alert-circle-outline" size={17} color={colors.error} />
              <Text style={styles.liveErrorBannerText}>{liveError}</Text>
            </View>
          ) : null}

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

          {/* Chat Transcript — real chat-bubble thread instead of two
              separate "latest AI text" / "latest your text" boxes, so the
              conversation reads like a messaging app. */}
          <ScrollView
            ref={chatScrollRef}
            style={styles.chatScrollView}
            contentContainerStyle={styles.chatScrollContent}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() => chatScrollRef.current?.scrollToEnd({ animated: true })}
          >
            {displayBubbles.length === 0 ? (
              <Text style={styles.chatEmptyPlaceholder}>
                {aiName} seni dinliyor. İlk cümleni söyleyebilirsin…
              </Text>
            ) : (
              displayBubbles.map((bubble) => (
                <ChatBubble key={bubble.key} bubble={bubble} aiName={aiName} onWordPress={handleSaveWord} />
              ))
            )}
          </ScrollView>

          {/* Collapsible secondary info — situation, starter phrases, target
              vocab, live telemetry. All real and useful, but shown on demand
              instead of competing with the conversation for attention. */}
          {(situation || keyPhrases.length > 0 || suggestedVocab.length > 0) && (
            <View style={styles.tipsWrap}>
              <Pressable onPress={() => setTipsExpanded((v) => !v)} style={styles.tipsToggle}>
                <Text style={styles.tipsToggleText}>💡 İpuçları ve Kelimeler</Text>
                <Ionicons
                  name={tipsExpanded ? 'chevron-up' : 'chevron-down'}
                  size={16}
                  color={colors.textMuted}
                />
              </Pressable>

              {tipsExpanded && (
                <ScrollView style={styles.tipsPanel} nestedScrollEnabled showsVerticalScrollIndicator={false}>
                  {situation ? (
                    <View style={styles.missionCard}>
                      <Text style={styles.missionTag}>🎯 GÖREV & DURUM</Text>
                      <Text style={styles.missionText}>{situation}</Text>
                    </View>
                  ) : null}

                  <View style={styles.dockTelemetryRow}>
                    <View style={styles.dockBadge}>
                      <Ionicons name="speedometer-outline" size={12} color={colors.brand} />
                      <Text style={styles.dockBadgeText}>
                        {currentWpm > 0 ? `${currentWpm} WPM` : '— WPM'}
                      </Text>
                    </View>
                    <View style={styles.dockBadge}>
                      <Ionicons name="sparkles" size={11} color={colors.success} />
                      <Text style={styles.dockBadgeText}>
                        {currentConfidence == null
                          ? '— Telaffuz'
                          : `%${Math.round(currentConfidence * 100)} Telaffuz`}
                      </Text>
                    </View>
                    <View style={styles.dockBadge}>
                      <Ionicons name="chatbubbles-outline" size={12} color="#EA580C" />
                      <Text style={styles.dockBadgeText}>
                        {totalFillersCount === 0 ? '0 Umm ✨' : `${totalFillersCount} Dolgu`}
                      </Text>
                    </View>
                  </View>

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
              )}
            </View>
          )}

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

            {/* Push-to-talk control — one persistent hold-to-talk button
                spanning both 'thinking_time' and 'recording', so the touch
                that starts it (onPressIn) and the one that ends it
                (onPressOut) land on the SAME component instance instead of
                racing a remount between two separate buttons. Mic is only
                ever actually on while held (turnPhase === 'recording'). */}
            {(turnPhase === 'thinking_time' || turnPhase === 'recording') && (
              <View style={styles.turnControlBlock}>
                {turnPhase === 'thinking_time' && coachTipTr ? (
                  <View style={styles.coachTipCard}>
                    <Text style={styles.coachTipIcon}>🧑‍🏫</Text>
                    <View style={styles.coachTipTextCol}>
                      <Text style={styles.coachTipLabel}>KOÇ İPUCU</Text>
                      <Text style={styles.coachTipText}>{coachTipTr}</Text>
                    </View>
                  </View>
                ) : null}

                {turnPhase === 'thinking_time' && hasReplayableAudio ? (
                  <Pressable
                    onPress={replayAiAudio}
                    style={styles.replayBtn}
                    accessibilityRole="button"
                    accessibilityLabel={`${aiName} ne dedi, tekrar dinle`}
                  >
                    <Ionicons name="play-circle-outline" size={15} color={colors.brand} />
                    <Text style={styles.replayBtnText}>{aiName} ne dedi? Tekrar Dinle</Text>
                  </Pressable>
                ) : null}

                {turnPhase === 'thinking_time' && suggestedReplies.length > 0 && (
                  <View style={styles.suggestionsRow}>
                    {suggestedReplies.map((reply, idx) => (
                      <Pressable
                        key={idx}
                        onPress={() => pronounce(reply)}
                        style={styles.suggestionChip}
                        accessibilityRole="button"
                        accessibilityLabel={`Öneriyi dinle: ${reply}`}
                      >
                        <Ionicons name="volume-medium-outline" size={12} color={colors.brand} />
                        <Text style={styles.suggestionChipText}>{reply}</Text>
                      </Pressable>
                    ))}
                  </View>
                )}

                {turnPhase === 'recording' && (
                  <View style={styles.waveformContainer}>
                    <Waveform meteringDb={micLevelDb} active={true} />
                  </View>
                )}

                <Pressable
                  onPressIn={startTurn}
                  onPressOut={stopTurn}
                  style={[styles.holdTurnBtn, turnPhase === 'recording' && styles.holdTurnBtnActive]}
                  accessibilityRole="button"
                  accessibilityLabel={
                    turnPhase === 'recording' ? 'Kayıt ediyor, bırakınca gönderilecek' : 'Basılı tut ve konuş'
                  }
                >
                  <Ionicons name={turnPhase === 'recording' ? 'radio' : 'mic'} size={19} color="#FFFFFF" />
                  <Text style={styles.holdTurnBtnText}>
                    {turnPhase === 'recording' ? 'Bırakınca Gönderilir…' : 'Basılı Tut ve Konuş'}
                  </Text>
                </Pressable>
              </View>
            )}

            {turnPhase === 'reviewing' && (
              <TranscriptReviewCard
                pendingTranscript={pendingTranscript}
                pendingWords={pendingWords}
                pendingConfidence={pendingConfidence}
                editedTranscript={editedTranscript}
                isEditing={isEditingTranscript}
                onChangeText={setEditedTranscript}
                onStartEditing={() => setIsEditingTranscript(true)}
                onConfirm={() => confirmTranscript(editedTranscript)}
                onRedo={redoTurn}
              />
            )}

            {turnPhase === 'ai_thinking' && (
              <View style={styles.aiThinkingRow}>
                <ActivityIndicator color={colors.brand} size="small" />
                <Text style={styles.aiThinkingText}>{aiName} cevabını hazırlıyor…</Text>
              </View>
            )}

            {turnPhase === 'ai_speaking' && (
              <View style={styles.aiSpeakingRow}>
                <Pressable
                  onPress={stopAiAudio}
                  style={styles.aiAudioControlBtn}
                  accessibilityRole="button"
                  accessibilityLabel="Sesi durdur"
                >
                  <Ionicons name="stop-circle-outline" size={18} color={colors.textHeading} />
                  <Text style={styles.aiAudioControlText}>Sesi Durdur</Text>
                </Pressable>
                <Text style={styles.aiSpeakingHint}>{aiName} konuşuyor — mikrofon kapalı</Text>
              </View>
            )}

            {turnPhase === 'error' && (
              // The message itself is already shown by the liveErrorBanner
              // above — this block is just the actionable "now what" step,
              // mic off until the user picks one.
              <View style={styles.turnErrorBlock}>
                <View style={styles.turnErrorActions}>
                  <Pressable onPress={retryLastTurn} style={styles.turnErrorRetryBtn}>
                    <Text style={styles.turnErrorRetryText}>Tekrar Dene</Text>
                  </Pressable>
                  <Pressable onPress={redoTurn} hitSlop={8}>
                    <Text style={styles.turnErrorFallbackText}>Tekrar Söyle</Text>
                  </Pressable>
                </View>
              </View>
            )}
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

/** The "reviewing" phase's confirmation card — nothing reaches the AI until
 * the user explicitly taps Gönder here. Low-confidence transcripts get a
 * softer framing ("I couldn't quite catch that") instead of implying
 * certainty, but sending anyway is always available either way. */
function TranscriptReviewCard({
  pendingTranscript,
  pendingWords,
  pendingConfidence,
  editedTranscript,
  isEditing,
  onChangeText,
  onStartEditing,
  onConfirm,
  onRedo,
}: {
  pendingTranscript: string | null;
  pendingWords: WsWordMetric[];
  pendingConfidence: number | null;
  editedTranscript: string;
  isEditing: boolean;
  onChangeText: (text: string) => void;
  onStartEditing: () => void;
  onConfirm: () => void;
  onRedo: () => void;
}) {
  if (pendingTranscript == null) {
    return (
      <View style={styles.reviewCard}>
        <ActivityIndicator color={colors.brand} size="small" />
        <Text style={styles.reviewLoadingText}>Transkript hazırlanıyor…</Text>
      </View>
    );
  }

  const isLowConfidence = pendingConfidence != null && pendingConfidence < LOW_CONFIDENCE_THRESHOLD;

  return (
    <View style={styles.reviewCard}>
      <Text style={styles.reviewCardTitle}>
        {isLowConfidence ? 'Seni tam anlayamadım 🤔' : 'Seni şöyle duydum:'}
      </Text>

      {isEditing ? (
        <TextInput
          value={editedTranscript}
          onChangeText={onChangeText}
          style={styles.reviewTextInput}
          multiline
          autoFocus
          placeholder="Söylediğini buraya yaz…"
          placeholderTextColor={colors.textMuted}
        />
      ) : (
        <View style={styles.reviewStaticTextWrap}>
          {pendingWords.length > 0 ? (
            <ConfidenceWords words={pendingWords} onWordPress={() => {}} />
          ) : (
            <Text style={styles.reviewPlainText}>{editedTranscript}</Text>
          )}
        </View>
      )}

      <View style={styles.reviewActionsRow}>
        <Pressable onPress={onRedo} style={styles.reviewSecondaryBtn} accessibilityRole="button">
          <Ionicons name="refresh" size={14} color={colors.textBody} />
          <Text style={styles.reviewSecondaryBtnText}>Tekrar Söyle</Text>
        </Pressable>
        {!isEditing && (
          <Pressable onPress={onStartEditing} style={styles.reviewSecondaryBtn} accessibilityRole="button">
            <Ionicons name="create-outline" size={14} color={colors.textBody} />
            <Text style={styles.reviewSecondaryBtnText}>Metni Düzelt</Text>
          </Pressable>
        )}
        <Pressable
          onPress={onConfirm}
          style={[styles.reviewConfirmBtn, !editedTranscript.trim() && styles.reviewConfirmBtnDisabled]}
          disabled={!editedTranscript.trim()}
          accessibilityRole="button"
        >
          <Ionicons name="send" size={14} color="#FFFFFF" />
          <Text style={styles.reviewConfirmBtnText}>{isLowConfidence ? 'Yine de Gönder' : 'Gönder'}</Text>
        </Pressable>
      </View>
    </View>
  );
}

/** One chat-thread bubble — user turns carry their correction (if any)
 * inline, right under the bubble it applies to, instead of a separate
 * floating card elsewhere on the page. */
function ChatBubble({
  bubble,
  aiName,
  onWordPress,
}: {
  bubble: DisplayBubble;
  aiName: string;
  onWordPress: (word: string, sentence: string) => void;
}) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(anim, { toValue: 1, duration: 220, useNativeDriver: true }).start();
    // Re-running this for every text update (as the live bubble streams in)
    // is fine — the same instance just keeps animating toward 1, no restart.
  }, [anim]);

  const animatedStyle = {
    opacity: anim,
    transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [8, 0] }) }],
  };

  if (bubble.kind === 'assistant') {
    return (
      <Animated.View style={[styles.bubbleWrap, styles.bubbleWrapAssistant, animatedStyle]}>
        <Text style={styles.bubbleSenderLabel}>{aiName}</Text>
        <View style={[styles.bubble, styles.bubbleAssistant]}>
          <TappableWords
            text={bubble.text}
            onWordPress={(w) => onWordPress(w, bubble.text)}
            textStyle={styles.bubbleTextAssistant}
          />
        </View>
      </Animated.View>
    );
  }

  return (
    <Animated.View style={[styles.bubbleWrap, styles.bubbleWrapUser, animatedStyle]}>
      <View style={[styles.bubble, styles.bubbleUser]}>
        {bubble.words && bubble.words.length > 0 ? (
          <ConfidenceWords words={bubble.words} onWordPress={(w) => onWordPress(w, bubble.text)} />
        ) : (
          <TappableWords
            text={bubble.text}
            onWordPress={(w) => onWordPress(w, bubble.text)}
            textStyle={styles.bubbleTextUser}
          />
        )}
      </View>
      {bubble.correction?.has_error ? (
        <View style={styles.inlineCorrection}>
          <Ionicons name="sparkles" size={12} color="#6366F1" />
          <View style={styles.inlineCorrectionTextCol}>
            <Text style={styles.inlineCorrectionMain}>{bubble.correction.corrected}</Text>
            <Text style={styles.inlineCorrectionExplain}>🇹🇷 {bubble.correction.explanation_tr}</Text>
          </View>
        </View>
      ) : null}
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
  liveErrorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginHorizontal: spacing.md,
    marginTop: spacing.sm,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: '#FECACA',
    backgroundColor: '#FEF2F2',
  },
  liveErrorBannerText: {
    flex: 1,
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    lineHeight: 17,
    color: colors.error,
  },
  saveErrorText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    lineHeight: 18,
    color: colors.error,
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
  turnBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    margin: spacing.md,
    marginBottom: 0,
    padding: 10,
    borderRadius: radii.xl,
    borderWidth: 1.5,
  },
  turnBannerTextCol: {
    flex: 1,
  },
  turnBannerLabel: {
    fontFamily: fonts.headingBold,
    fontSize: 13.5,
  },
  turnBannerSub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 1,
  },
  chatScrollView: {
    flex: 1,
  },
  chatScrollContent: {
    padding: spacing.md,
    gap: spacing.sm,
    paddingBottom: 24,
  },
  chatEmptyPlaceholder: {
    fontFamily: fonts.bodyRegular,
    fontSize: 13,
    color: colors.textMuted,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: spacing.xl,
  },
  bubbleWrap: {
    maxWidth: '86%',
    gap: 4,
  },
  bubbleWrapUser: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  bubbleWrapAssistant: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  bubbleSenderLabel: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 10.5,
    color: colors.textMuted,
    marginLeft: 4,
  },
  bubble: {
    borderRadius: radii.lg,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  bubbleUser: {
    backgroundColor: '#EEF2FF',
    borderBottomRightRadius: 4,
  },
  bubbleAssistant: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderBottomLeftRadius: 4,
  },
  bubbleTextUser: {
    fontFamily: fonts.bodyMedium,
    fontSize: 14.5,
    color: colors.textHeading,
    lineHeight: 20,
  },
  bubbleTextAssistant: {
    fontFamily: fonts.bodyMedium,
    fontSize: 14.5,
    color: colors.textHeading,
    lineHeight: 20,
  },
  inlineCorrection: {
    flexDirection: 'row',
    gap: 6,
    backgroundColor: '#F5F3FF',
    borderRadius: radii.md,
    padding: 8,
    maxWidth: '100%',
  },
  inlineCorrectionTextCol: {
    flex: 1,
    gap: 2,
  },
  inlineCorrectionMain: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 12,
    color: colors.textHeading,
  },
  inlineCorrectionExplain: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10.5,
    color: '#475569',
    lineHeight: 14,
  },
  tipsWrap: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.sm,
    backgroundColor: '#FFFFFF',
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
  },
  tipsToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  tipsToggleText: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 12.5,
    color: colors.textHeading,
  },
  tipsPanel: {
    maxHeight: 240,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    padding: spacing.md,
    gap: spacing.md,
  },
  turnControlBlock: {
    gap: 10,
  },
  replayBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    alignSelf: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radii.pill,
    backgroundColor: '#EEF2FF',
  },
  replayBtnText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 11.5,
    color: colors.brand,
  },
  coachTipCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: '#FFF7ED',
    borderWidth: 1.5,
    borderColor: '#FB923C',
    borderRadius: radii.lg,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  coachTipIcon: {
    fontSize: 20,
  },
  coachTipTextCol: {
    flex: 1,
    gap: 2,
  },
  coachTipLabel: {
    fontFamily: fonts.mono,
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#C2410C',
    letterSpacing: 0.5,
  },
  coachTipText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 13,
    lineHeight: 18,
    color: '#9A3412',
  },
  suggestionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    justifyContent: 'center',
  },
  suggestionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: radii.pill,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  suggestionChipText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    color: colors.textHeading,
  },
  holdTurnBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#10B981',
    paddingVertical: 15,
    borderRadius: radii.pill,
  },
  holdTurnBtnActive: {
    backgroundColor: colors.brand,
  },
  holdTurnBtnText: {
    fontFamily: fonts.headingBold,
    fontSize: 14.5,
    color: '#FFFFFF',
  },
  reviewCard: {
    gap: 10,
  },
  reviewLoadingText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12.5,
    color: colors.textMuted,
    textAlign: 'center',
  },
  reviewCardTitle: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 12.5,
    color: colors.textHeading,
  },
  reviewStaticTextWrap: {
    backgroundColor: '#F8FAFC',
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 10,
  },
  reviewPlainText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textHeading,
  },
  reviewTextInput: {
    backgroundColor: '#F8FAFC',
    borderRadius: radii.lg,
    borderWidth: 1.5,
    borderColor: colors.brand,
    padding: 10,
    fontFamily: fonts.bodyMedium,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textHeading,
    minHeight: 44,
    maxHeight: 110,
  },
  reviewActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  reviewSecondaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 9,
    borderRadius: radii.pill,
    backgroundColor: '#F1F5F9',
  },
  reviewSecondaryBtnText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    color: colors.textBody,
  },
  reviewConfirmBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: radii.pill,
    backgroundColor: colors.brand,
  },
  reviewConfirmBtnDisabled: {
    opacity: 0.5,
  },
  reviewConfirmBtnText: {
    fontFamily: fonts.headingBold,
    fontSize: 13,
    color: '#FFFFFF',
  },
  aiThinkingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 10,
  },
  aiThinkingText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12.5,
    color: colors.textMuted,
  },
  aiSpeakingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 6,
  },
  aiAudioControlBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radii.pill,
    backgroundColor: '#F1F5F9',
  },
  aiAudioControlText: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 12,
    color: colors.textHeading,
  },
  aiSpeakingHint: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11.5,
    color: colors.textMuted,
  },
  turnErrorBlock: {
    gap: 10,
  },
  turnErrorActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  turnErrorRetryBtn: {
    backgroundColor: colors.brand,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: radii.pill,
  },
  turnErrorRetryText: {
    fontFamily: fonts.headingBold,
    fontSize: 13,
    color: '#FFFFFF',
  },
  turnErrorFallbackText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12.5,
    color: colors.textBody,
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
  missionTag: {
    fontFamily: fonts.mono,
    fontSize: 9,
    fontWeight: 'bold',
    color: colors.brand,
    letterSpacing: 0.5,
  },
  missionText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textHeading,
    lineHeight: 16,
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
  waveformContainer: {
    marginTop: 2,
  },
});
