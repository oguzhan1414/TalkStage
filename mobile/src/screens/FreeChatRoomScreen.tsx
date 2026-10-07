import { VoiceRoomBanner, VoiceRoomControls, VoiceRoomThread, voiceRoomStyles, type DisplayBubble } from '../components/VoiceRoomUI';
import { Ionicons } from '@expo/vector-icons';
import { useQueryClient } from '@tanstack/react-query';
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
import { useMivoTransition } from '../components/MivoTransitionOverlay';
import { MicPermissionPrompt } from '../components/MicPermissionPrompt';
import { VoicePrivacyPrompt } from '../components/VoicePrivacyPrompt';
import { TappableWords } from '../components/TappableWords';
import { Toast } from '../components/Toast';
import { Waveform } from '../components/Waveform';
import { useFreeChatSocket, type TurnPhase } from '../hooks/useFreeChatSocket';
import { api, ApiError } from '../lib/api';
import { haptics } from '../lib/haptics';
import { setLearningFlag } from '../lib/learningFlags';
import { SCENE_STAR2_PREFIX, SCENE_STAR3_PREFIX } from '../lib/sceneProgress';
import { colors, fonts, radii, spacing } from '../theme/tokens';
import type { VocabCardCreate } from '../types/api';
import type { WsCorrectionData, WsWordMetric } from '../types/ws';
import type { FreeChatRoomScreenProps } from '../navigation/types';
import { useTrackScreenView } from '../lib/analytics';
import { usePronunciation } from '../hooks/usePronunciation';
import { MivoLoader } from '../components/MivoLoader';
import { t } from '../i18n';

const AI_NAME = 'Mivo';
const AI_ROLE = t("Serbest Sohbet Koçun");

// Below this, Deepgram likely misheard rather than just transcribed
// imperfectly — mirrors LiveConversationRoomScreen's identical threshold.
const LOW_CONFIDENCE_THRESHOLD = 0.55;

const CLOSE_REASON_MESSAGES: Record<string, string> = {
  missing_api_base_url: t("Backend adresi yapılandırılmamış (EXPO_PUBLIC_API_BASE_URL)."),
  connection_error: t("Sesli odaya bağlanılamadı. İnternet bağlantını kontrol et."),
  auth_required: t("Oturum doğrulanamadı. Lütfen yeniden giriş yap."),
  auth_invalid: t("Oturumunun süresi dolmuş. Lütfen yeniden giriş yap."),
  voice_reply_failed: t("AI yanıtı oluşturulamadı. Birkaç saniye sonra tekrar konuşabilirsin."),
  session_error: t("Canlı konuşma bağlantısında beklenmeyen bir hata oluştu."),
  microphone_start_failed: t("Mikrofon başlatılamadı. Uygulama izinlerini kontrol et."),
};

function formatTimer(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

/**
 * Topic-less free-chat voice room — same core turn-loop UI as
 * `LiveConversationRoomScreen`, minus everything tied to a `scenarios` row
 * (ai_name/ai_role badges, the objectives "İpuçları" card, `scene.complete`
 * banner, Scorecard/`POST /sessions/end`). There's no scenario to attribute
 * a session to, so exiting just ends the socket and goes back — grammar
 * mistakes are still logged server-side (`source: "voice_free_chat"`), the
 * "systematic tracking" half of this feature doesn't depend on a scorecard.
 */
export function FreeChatRoomScreen({ navigation, route }: FreeChatRoomScreenProps) {
  const scene = route.params?.scene;
  const twistTitle = route.params?.twistTitle;
  const twistEmoji = route.params?.twistEmoji;
  const twistHint = route.params?.twistHint;
  useTrackScreenView(scene ? 'scene_play_started' : 'free_chat_started', scene ? { scene_id: scene.id } : {});
  const aiName = scene?.ai_name || AI_NAME;
  const aiRole = scene?.ai_role || AI_ROLE;
  const { finishTransition } = useMivoTransition();

  const voice = useFreeChatSocket(scene);
  const {
    status,
    closeInfo,
    permissionDenied,
    voicePrivacyLoading,
    needsVoicePrivacyAcknowledgement,
    acknowledgeVoicePrivacy,
    interimText,
    interimWords,
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
    sceneCompleteSummary,
    correctionsCount,
  } = voice;

  const queryClient = useQueryClient();
  const { pronounce } = usePronunciation();
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const [editedTranscript, setEditedTranscript] = useState('');
  const [isEditingTranscript, setIsEditingTranscript] = useState(false);
  const chatScrollRef = useRef<ScrollView>(null);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const exitingRef = useRef(false);

  useEffect(() => {
    if (!voicePrivacyLoading && status !== 'connecting') finishTransition();
  }, [finishTransition, status, voicePrivacyLoading]);

  useEffect(() => {
    if (status !== 'open') return;
    const interval = setInterval(() => setElapsedSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, [status]);

  useEffect(() => () => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
  }, []);

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
        example_sentence: sentence,
        source_label: 'Serbest Sohbet (Sesli)',
      };
      await api.post('/vocab-cards', payload);
      queryClient.invalidateQueries({ queryKey: ['vocab-cards'] });
      showToast(t("\"{{word}}\" kelime defterine eklendi", { word }));
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : t("Kelime kaydedilemedi"));
    }
  };

  // Sahne modu: oturum bitince yıldız hesapla (2★ = en az 4 cümle söyledi ya da hedefler tamamlandı,
  // 3★ = hedefler tamamlandı ve en fazla 2 düzeltme aldı). Yıldız bayrakları `/learning-flags` ile senkron.
  const [resultStars, setResultStars] = useState<0 | 2 | 3 | null>(null);

  const handleExit = () => {
    if (exitingRef.current) return;
    exitingRef.current = true;
    endSession();
    if (scene) {
      const userTurns = turns.filter((turn) => turn.role === 'user').length;
      const completed = sceneCompleteSummary != null;
      const earned = completed && correctionsCount <= 2 ? 3 : completed || userTurns >= 4 ? 2 : 0;
      if (earned >= 2) {
        setLearningFlag(`${SCENE_STAR2_PREFIX}${scene.id}`);
        if (earned === 3) setLearningFlag(`${SCENE_STAR3_PREFIX}${scene.id}`);
        api.post('/progress/log-practice').catch(() => {});
        haptics.success();
        setResultStars(earned);
        return;
      }
    }
    navigation.goBack();
  };

  // Turn banner — identical phase breakdown to LiveConversationRoomScreen,
  // just with a fixed "Mivo" persona instead of a per-scenario ai_name/ai_role.
  const TURN_PHASE_BANNER: Record<TurnPhase, { label: string; sub: string; color: string }> = {
    ai_speaking: { label: t("{{AI_NAME}} Konuşuyor… Mikrofon Kapalı", { AI_NAME: aiName }), sub: `${aiName} • ${aiRole}`, color: '#6366F1' },
    ai_thinking: { label: t("{{AI_NAME}} Düşünüyor… Mikrofon Kapalı", { AI_NAME: aiName }), sub: `${aiName} • ${aiRole}`, color: '#F59E0B' },
    thinking_time: { label: t("SIRA SENDE"), sub: t("Düşünmek için acele etme 🙂"), color: '#10B981' },
    recording: { label: t("Konuşuyorsun…"), sub: t("Bitirince \"Konuşmayı Bitir\"e dokun"), color: '#10B981' },
    reviewing: { label: t("Transkripti Kontrol Et"), sub: t("Göndermeden önce gözden geçir"), color: '#6366F1' },
    error: { label: t("Bir Sorun Oluştu"), sub: t("Tekrar dene ya da çıkıp tekrar gir"), color: colors.error },
  };
  const turnBannerConfig = TURN_PHASE_BANNER[turnPhase];

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
      <View style={styles.header}>
        <Pressable
          onPress={handleExit}
          hitSlop={12}
          style={styles.headerIconButton}
          accessibilityRole="button"
          accessibilityLabel={t("Sohbetten çık")}
        >
          <Ionicons name="close" size={22} color={colors.textHeading} />
        </Pressable>

        <View style={styles.headerTitleCol}>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {scene ? scene.title : t("{{AI_NAME}} ile Serbest Sohbet", { AI_NAME: aiName })}
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
          <Text style={{ fontFamily: fonts.bodyRegular, fontSize: 12, color: colors.textMuted, marginTop: 4, textAlign: 'center' }}>{t("{{AI_NAME}} seninle konuşmaya hazırlanıyor 🎙️", { AI_NAME: aiName })}</Text>
        </View>
      ) : status === 'closed' ? (
        <View style={styles.centerBlock}>
          <Text style={styles.statusText}>
            {(closeInfo && CLOSE_REASON_MESSAGES[closeInfo.reason]) ?? t("Bağlantı tamamlandı.")}
          </Text>
          {turns.length === 0 ? (
            <Pressable onPress={reconnect}>
              <Text style={styles.backLink}>{t("Tekrar Bağlan")}</Text>
            </Pressable>
          ) : null}
          <Pressable onPress={() => navigation.goBack()}>
            <Text style={styles.backLink}>{t("Geri Dön")}</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.mainLayout}>
          <VoiceRoomBanner phase={turnPhase} aiName={aiName} aiRole={aiRole} />

          {scene && twistTitle ? (
            <View style={styles.twistStrip}>
              <Text style={styles.twistEmoji}>{twistEmoji ?? '🎬'}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.twistTitle}>{t("Bu sefer: {{twist}}", { twist: twistTitle })}</Text>
                {twistHint ? <Text style={styles.twistHint}>{twistHint}</Text> : null}
              </View>
            </View>
          ) : null}

          {scene && sceneCompleteSummary ? (
            <Pressable onPress={handleExit} style={styles.sceneDoneStrip}>
              <Ionicons name="checkmark-circle" size={18} color="#059669" />
              <Text style={styles.sceneDoneText} numberOfLines={2}>
                {t("Hedefleri tamamladın! Bitirmek için dokun ➔")}
              </Text>
            </Pressable>
          ) : null}

          {liveError ? (
            <View style={styles.liveErrorBanner}>
              <Ionicons name="alert-circle-outline" size={17} color={colors.error} />
              <Text style={styles.liveErrorBannerText}>{liveError}</Text>
            </View>
          ) : null}

          <VoiceRoomThread bubbles={displayBubbles} aiName={aiName} onWordPress={handleSaveWord} onListen={pronounce} />

          <View style={styles.bottomDock}>
            <VoiceRoomControls voice={voice} aiName={aiName} pronounce={pronounce} />
          </View>
        </View>
      )}

      {toast ? <Toast message={toast} /> : null}

      {resultStars ? (
        <View style={styles.resultOverlay}>
          <View style={styles.resultCard}>
            <MivoAvatar state="success" size={96} showGlow={false} />
            <Text style={styles.resultStarsRow}>{'⭐'.repeat(resultStars)}{'☆'.repeat(3 - resultStars)}</Text>
            <Text style={styles.resultTitle}>
              {resultStars === 3 ? t("Mükemmel sahne!") : t("Sahneyi canlı oynadın!")}
            </Text>
            <Text style={styles.resultSub}>
              {resultStars === 3
                ? t("Hedeflerin hepsini az hatayla tamamladın. Bir dahaki sefere farklı bir komplikasyon seni bekliyor.")
                : t("3. yıldız için hedefleri tamamla ve en fazla 2 düzeltme al. Yeniden oynarsan farklı bir komplikasyon çıkar.")}
            </Text>
            <Pressable onPress={() => navigation.goBack()} style={styles.resultBtn}>
              <Text style={styles.resultBtnText}>{t("Tamam")}</Text>
            </Pressable>
          </View>
        </View>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  twistStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginHorizontal: spacing.md,
    marginBottom: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radii.lg,
    backgroundColor: '#FEF3C7',
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  twistEmoji: { fontSize: 20 },
  twistTitle: { fontFamily: fonts.headingBold, fontSize: 12.5, color: '#92400E' },
  twistHint: { fontFamily: fonts.bodyRegular, fontSize: 11.5, color: '#B45309', marginTop: 1 },
  sceneDoneStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginHorizontal: spacing.md,
    marginBottom: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radii.lg,
    backgroundColor: '#D1FAE5',
  },
  sceneDoneText: { flex: 1, fontFamily: fonts.headingSemiBold, fontSize: 12.5, color: '#065F46' },
  resultOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  resultCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: spacing.lg,
    alignItems: 'center',
    gap: 8,
  },
  resultStarsRow: { fontSize: 30, letterSpacing: 4 },
  resultTitle: { fontFamily: fonts.headingBold, fontSize: 20, color: colors.textHeading, textAlign: 'center' },
  resultSub: { fontFamily: fonts.bodyRegular, fontSize: 13, color: colors.textMuted, textAlign: 'center', lineHeight: 19 },
  resultBtn: {
    marginTop: 10,
    backgroundColor: colors.brand,
    borderRadius: 999,
    paddingHorizontal: 40,
    paddingVertical: 13,
  },
  resultBtnText: { fontFamily: fonts.headingBold, fontSize: 15, color: '#FFFFFF' },
  ...voiceRoomStyles,
});
