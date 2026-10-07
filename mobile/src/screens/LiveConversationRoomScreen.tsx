import { VoiceRoomBanner, VoiceRoomControls, VoiceRoomThread, voiceRoomStyles, type DisplayBubble } from '../components/VoiceRoomUI';
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
import { MivoAvatar } from '../components/MivoAvatar';
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
import { MivoLoader } from '../components/MivoLoader';
import { t, nativeFlag } from '../i18n';

const ADVANCED_PATTERNS = [
  { regex: /\b(in my opinion|from my perspective|in my experience)\b/i, label: t("STAR İfade Metodu ✨"), color: '#10B981' },
  { regex: /\b(furthermore|moreover|in addition|subsequently)\b/i, label: t("C1 İleri Seviye Bağlaç 🚀"), color: '#6366F1' },
  { regex: /\b(however|nevertheless|on the other hand|in retrospect)\b/i, label: t("B2 Profesyonel Karşıtlık 🎯"), color: '#8B5CF6' },
  { regex: /\b(specifically|for instance|to illustrate|for example)\b/i, label: t("Somutlaştırma Başarısı 💡"), color: '#F59E0B' },
  { regex: /\b(as a result|consequently|therefore|thus)\b/i, label: t("Sonuç Çıkarımı +5XP ⚡"), color: '#EC4899' },
];

// Below this, Deepgram likely misheard rather than just transcribed
// imperfectly — the review card frames it as "I couldn't quite catch that"
// instead of "here's what I heard", though sending anyway is always allowed.
const LOW_CONFIDENCE_THRESHOLD = 0.55;

const CLOSE_REASON_MESSAGES: Record<string, string> = {
  quota_exceeded: t("Bugünkü ücretsiz sahne hakkın doldu. Pro’ya geçerek sınırsız pratik yapabilirsin."),
  time_limit_reached: t("5 dakikalık ücretsiz süre doldu."),
  missing_api_base_url: t("Backend adresi yapılandırılmamış (EXPO_PUBLIC_API_BASE_URL)."),
  connection_error: t("Sesli odaya bağlanılamadı. İnternet bağlantını kontrol et."),
};

Object.assign(CLOSE_REASON_MESSAGES, {
  auth_required: t("Oturum doğrulanamadı. Lütfen yeniden giriş yap."),
  auth_invalid: t("Oturumunun süresi dolmuş. Lütfen yeniden giriş yap."),
  scenario_not_found: t("Bu konuşma sahnesi artık bulunamıyor."),
  voice_reply_failed: t("AI yanıtı oluşturulamadı. Birkaç saniye sonra tekrar konuşabilirsin."),
  session_error: t("Canlı konuşma bağlantısında beklenmeyen bir hata oluştu."),
  microphone_start_failed: t("Mikrofon başlatılamadı. Uygulama izinlerini kontrol et."),
});

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
  const aiName = beginnerTeacherMode ? 'Mivo' : resolvedScenario?.ai_name ?? 'Mivo';
  const aiRole = beginnerTeacherMode
    ? t("Türkçe İngilizce Öğretmeni")
    : resolvedScenario?.ai_role ?? t("Sohbet Partneri");
  const situation = resolvedScenario?.situation ?? resolvedScenario?.description ?? '';
  const keyPhrases = resolvedScenario?.key_phrases ?? [];
  const suggestedVocab = resolvedScenario?.suggested_vocab ?? [];

  const voice = useConversationSocket(scenarioSlug);
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
  } = voice;

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
      showToast(t("“{{word}}” kelime defterine eklendi", { word }));
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : t("Kelime kaydedilemedi"));
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
      setSaveError(t("Oturum kaydedilemedi. Bağlantını kontrol edip tekrar dene."));
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
    ai_speaking: { label: t("{{aiName}} Konuşuyor… Mikrofon Kapalı", { aiName }), sub: `${aiName} • ${aiRole}`, color: '#6366F1' },
    ai_thinking: { label: t("{{aiName}} Düşünüyor… Mikrofon Kapalı", { aiName }), sub: `${aiName} • ${aiRole}`, color: '#F59E0B' },
    thinking_time: { label: t("SIRA SENDE"), sub: t("Düşünmek için acele etme 🙂"), color: '#10B981' },
    recording: { label: t("Konuşuyorsun…"), sub: t("Bitirince \"Konuşmayı Bitir\"e dokun"), color: '#10B981' },
    reviewing: { label: t("Transkripti Kontrol Et"), sub: t("Göndermeden önce gözden geçir"), color: '#6366F1' },
    error: { label: t("Bir Sorun Oluştu"), sub: t("Tekrar dene ya da yazarak devam et"), color: colors.error },
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
          accessibilityLabel={t("Sahneden çık")}
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
            <Text style={styles.finishHeaderBtnText}>{t("Bitir ➔")}</Text>
          </Pressable>
        ) : (
          <View style={styles.headerRightSpacer} />
        )}
      </View>

      {voicePrivacyLoading ? (
        <View style={styles.centerBlock}>
          <MivoLoader size={130} />
          <Text style={[styles.statusText, { marginTop: 14 }]}>{t("Gizlilik tercihleri yükleniyor…")}</Text>
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
          <MivoLoader size={150} />
          <Text style={[styles.statusText, { marginTop: 16, fontFamily: fonts.headingBold, color: colors.textHeading, fontSize: 16 }]}>{t("Sesli odaya bağlanılıyor…")}</Text>
          <Text style={{ fontFamily: fonts.bodyRegular, fontSize: 12, color: colors.textMuted, marginTop: 4, textAlign: 'center' }}>{t("Mivo konuşma sahnesini hazırlıyor 🎙️")}</Text>
        </View>
      ) : status === 'closed' ? (
        <View style={styles.centerBlock}>
          <Text style={styles.statusText}>
            {(closeInfo && CLOSE_REASON_MESSAGES[closeInfo.reason]) ?? t("Bağlantı tamamlandı.")}
          </Text>
          {saveError ? <Text style={styles.saveErrorText}>{saveError}</Text> : null}
          {savingSession ? (
            <MivoLoader size={64} label={t("Karnen hazırlanıyor…")} />
          ) : closeInfo?.reason === 'quota_exceeded' ? (
            <>
              <Button
                label={t("Pro’ya Geç")}
                onPress={() => navigation.navigate('Paywall')}
                style={styles.upsellButton}
              />
              <Pressable onPress={finishSession}>
                <Text style={styles.backLink}>{turns.length > 0 ? t("Karneni Gör") : t("Sahnelere dön")}</Text>
              </Pressable>
            </>
          ) : turns.length === 0 && closeInfo?.reason !== 'time_limit_reached' ? (
            <>
              <Button label={t("Tekrar Bağlan")} onPress={reconnect} style={styles.upsellButton} />
              <Pressable onPress={finishSession}>
                <Text style={styles.backLink}>{t("Sahnelere dön")}</Text>
              </Pressable>
            </>
          ) : (
            <Pressable onPress={finishSession}>
              <Text style={styles.backLink}>{turns.length > 0 ? t("Karneni Gör") : t("Sahnelere dön")}</Text>
            </Pressable>
          )}
        </View>
      ) : (
        <View style={styles.mainLayout}>
          {/* Turn-state banner — always visible, impossible to miss. The mic
              genuinely isn't transmitted outside "listening" (see
              useConversationSocket's handleBuffer), this just finally says so. */}
          <VoiceRoomBanner phase={turnPhase} aiName={aiName} aiRole={aiRole} />

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
                <Text style={styles.completionBannerTitle}>{t("🎉 Hedeflere Ulaştın!")}</Text>
                <Text style={styles.completionBannerText}>{sceneCompleteSummary}</Text>
              </View>
              <View style={styles.completionBannerActions}>
                <Pressable onPress={handleExit} style={styles.completionBannerCta}>
                  <Text style={styles.completionBannerCtaText}>{t("Karneni Gör")}</Text>
                </Pressable>
                <Pressable onPress={() => setCompletionBannerDismissed(true)} hitSlop={8}>
                  <Text style={styles.completionBannerDismiss}>{t("Devam Et")}</Text>
                </Pressable>
              </View>
            </View>
          )}

          {/* Chat Transcript — real chat-bubble thread instead of two
              separate "latest AI text" / "latest your text" boxes, so the
              conversation reads like a messaging app. */}
          <VoiceRoomThread bubbles={displayBubbles} aiName={aiName} onWordPress={handleSaveWord} />

          {/* Collapsible secondary info — situation, starter phrases, target
              vocab, live telemetry. All real and useful, but shown on demand
              instead of competing with the conversation for attention. */}
          {(situation || keyPhrases.length > 0 || suggestedVocab.length > 0) && (
            <View style={styles.tipsWrap}>
              <Pressable onPress={() => setTipsExpanded((v) => !v)} style={styles.tipsToggle}>
                <Text style={styles.tipsToggleText}>{t("💡 İpuçları ve Kelimeler")}</Text>
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
                      <Text style={styles.missionTag}>{t("🎯 GÖREV & DURUM")}</Text>
                      <Text style={styles.missionText}>{situation}</Text>
                    </View>
                  ) : null}

                  <View style={styles.dockTelemetryRow}>
                    <View style={styles.dockBadge}>
                      <Ionicons name="speedometer-outline" size={12} color={colors.brand} />
                      <Text style={styles.dockBadgeText}>
                        {currentWpm > 0 ? t("{{currentWpm}} WPM", { currentWpm }) : t("— WPM")}
                      </Text>
                    </View>
                    <View style={styles.dockBadge}>
                      <Ionicons name="sparkles" size={11} color={colors.success} />
                      <Text style={styles.dockBadgeText}>
                        {currentConfidence == null
                          ? t("— Telaffuz")
                          : t("%{{p0}} Tan?ma g?veni", { p0: Math.round(currentConfidence * 100) })}
                      </Text>
                    </View>
                    <View style={styles.dockBadge}>
                      <Ionicons name="chatbubbles-outline" size={12} color="#EA580C" />
                      <Text style={styles.dockBadgeText}>
                        {totalFillersCount === 0 ? t("0 Umm ✨") : t("{{totalFillersCount}} Dolgu", { totalFillersCount })}
                      </Text>
                    </View>
                  </View>

                  {keyPhrases.length > 0 && (
                    <View style={styles.promptsSection}>
                      <View style={styles.promptsHeaderRow}>
                        <Text style={styles.promptsSectionTitle}>{t("💬 ŞİMDİ NE SÖYLEYEBİLİRSİN?")}</Text>
                        <Text style={styles.promptsHint}>{t("Aşağıdaki kalıplardan birini doğrudan oku")}</Text>
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
                              <Text style={styles.promptTrText}>{nativeFlag()} {phrase.tr}</Text>
                            </Pressable>
                          );
                        })}
                      </View>
                    </View>
                  )}

                  {suggestedVocab.length > 0 && (
                    <View style={styles.vocabSection}>
                      <Text style={styles.vocabSectionTitle}>{t("📌 KULLANABİLECEĞİN KELİMELER:")}</Text>
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
            <VoiceRoomControls voice={voice} aiName={aiName} pronounce={pronounce} />
          </View>
        </View>
      )}

      {toast ? <Toast message={toast} /> : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  saveErrorText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    lineHeight: 18,
    color: colors.error,
    textAlign: 'center',
  },
  upsellButton: {
    marginBottom: spacing.md,
    minWidth: 200,
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
  ...voiceRoomStyles,
});
