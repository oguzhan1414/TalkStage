import type { ScenePlayPayload } from '../lib/sceneTwists';
import { createAudioPlayer, requestRecordingPermissionsAsync, type AudioPlayer } from 'expo-audio';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AppState, Platform } from 'react-native';

import { useAuth } from '../context/AuthContext';
import { arrayBufferToBase64 } from '../lib/base64';
import { useVoiceStream } from './useVoiceStream';
import type {
  ConversationTurn,
  WsCorrectionData,
  WsServerMessage,
  WsWordMetric,
  WsTurnMetrics,
} from '../types/ws';
import { t } from '../i18n';

// Server error frames carry Turkish text; map the known codes to the app language instead.
const WS_ERROR_TEXT: Record<string, string> = {
  transcription_failed: t("Ses çözümlenemedi. Tekrar söyleyebilir veya yazabilirsin."),
  voice_reply_failed: t("Yanıt hazırlanamadı. Tekrar deneyebilir veya yazabilirsin."),
  invalid_request: t("İstek sınırı aşıldı. Odayı yeniden açabilirsin."),
};

export type ConnectionStatus = 'connecting' | 'open' | 'closed';

export type OrbState = 'idle' | 'listening' | 'thinking' | 'speaking';

/**
 * Push-to-talk turn state machine (replaces automatic silence-based turn
 * detection). Mic is only ever actually forwarded to the server during
 * 'recording' — every other phase is mic-off.
 *   ai_speaking  — Mivo's reply audio is playing.
 *   thinking_time — mic off, waiting for the user to tap "Konuşmaya Başla".
 *   recording    — mic on, user is speaking, waiting for "Konuşmayı Bitir".
 *   reviewing    — mic off, showing the transcript confirmation card.
 *   ai_thinking  — mic off, confirm_turn sent, waiting for the first reply.
 *   error        — mic off, last turn failed; retry or fall back to text.
 */
export type TurnPhase =
  | 'ai_speaking'
  | 'thinking_time'
  | 'recording'
  | 'reviewing'
  | 'ai_thinking'
  | 'error';

export type CloseInfo = {
  code: number;
  reason: string;
};

const VOICE_PRIVACY_ACK_KEY = '@talkstage:voice_privacy_ack_v1';

// Above this, Deepgram almost certainly heard correctly — skip the manual
// review card and send straight away. Below it, show the review card (the
// lower LOW_CONFIDENCE_THRESHOLD in LiveConversationRoomScreen.tsx further
// distinguishes "probably fine, just glance" from "I likely misheard you").
const AUTO_CONFIRM_CONFIDENCE_THRESHOLD = 0.8;

// How long to wait for a transcript.final after end_turn before giving up —
// covers press-and-hold's accidental near-zero-length recordings, where
// Deepgram has nothing to Finalize into a result.
const REVIEW_TIMEOUT_MS = 6000;

function buildWsUrl(scenarioSlug?: string, scenePlay?: boolean): string | null {
  const apiBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL;
  if (!apiBaseUrl) return null;
  if (!__DEV__ && !apiBaseUrl.startsWith('https://')) return null;
  const wsBase = apiBaseUrl.replace(/\/$/, '').replace(/^http/, 'ws');
  if (scenePlay) return `${wsBase}/ws/scene-play`;
  return scenarioSlug ? `${wsBase}/ws/session/${encodeURIComponent(scenarioSlug)}` : `${wsBase}/ws/free-chat`;
}

/** RMS-based dBFS approximation from a raw int16 PCM buffer — drives the live waveform. */
function levelFromPcm16(buffer: ArrayBuffer): number {
  const samples = new Int16Array(buffer);
  if (samples.length === 0) return -160;
  let sumSquares = 0;
  for (let i = 0; i < samples.length; i++) {
    const normalized = samples[i] / 32768;
    sumSquares += normalized * normalized;
  }
  const rms = Math.sqrt(sumSquares / samples.length);
  return rms <= 0 ? -160 : 20 * Math.log10(rms);
}

/**
 * Owns the live conversation WebSocket: connects, streams mic audio up,
 * parses server events down, and plays each `reply.sentence`'s TTS audio
 * (the binary frame that immediately follows it) in order.
 */
export function useConversationSocket(scenarioSlug?: string, scene?: ScenePlayPayload) {
  const sceneRef = useRef(scene);
  sceneRef.current = scene;
  const { session } = useAuth();
  const accessToken = session?.access_token;
  const tokenRef = useRef(accessToken);
  tokenRef.current = accessToken;
  const userId = session?.user.id;

  const [status, setStatus] = useState<ConnectionStatus>('connecting');
  const [closeInfo, setCloseInfo] = useState<CloseInfo | null>(null);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [interimText, setInterimText] = useState('');
  const [interimWords, setInterimWords] = useState<WsWordMetric[]>([]);
  const [latestMetrics, setLatestMetrics] = useState<WsTurnMetrics | null>(null);
  const [aiReplyText, setAiReplyText] = useState('');
  const [correction, setCorrection] = useState<WsCorrectionData | null>(null);
  const [turns, setTurns] = useState<ConversationTurn[]>([]);
  const [micLevelDb, setMicLevelDb] = useState(-160);
  const [waitingForReply, setWaitingForReply] = useState(false);
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [isAiReplyStreaming, setIsAiReplyStreaming] = useState(false);
  const [startedAt, setStartedAt] = useState<string | null>(null);
  const [correctionsCount, setCorrectionsCount] = useState(0);
  const [fluencyScores, setFluencyScores] = useState<number[]>([]);
  const [totalFillersCount, setTotalFillersCount] = useState(0);
  const [wpmHistory, setWpmHistory] = useState<number[]>([]);
  // Per-turn avg_confidence, parallel to wpmHistory — feeds the Scorecard's
  // real "pronunciation" radar axis (was fabricated from fluency before).
  const [confidenceHistory, setConfidenceHistory] = useState<number[]>([]);
  const [sceneCompleteSummary, setSceneCompleteSummary] = useState<string | null>(null);
  const [liveError, setLiveError] = useState<string | null>(null);
  const [connectionAttempt, setConnectionAttempt] = useState(0);
  const [voicePrivacyAcknowledged, setVoicePrivacyAcknowledged] = useState<boolean | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);
  const [pendingTranscript, setPendingTranscript] = useState<string | null>(null);
  const [pendingWords, setPendingWords] = useState<WsWordMetric[]>([]);
  const [pendingConfidence, setPendingConfidence] = useState<number | null>(null);
  const [suggestedReplies, setSuggestedReplies] = useState<string[]>([]);
  const [coachTipTr, setCoachTipTr] = useState<string | null>(null);

  const [inputLanguage, setInputLanguage] = useState<string>('en');
  const inputLanguageRef = useRef(inputLanguage);
  inputLanguageRef.current = inputLanguage;
  const [audioNotice, setAudioNotice] = useState<string | null>(null);
  const awaitingTranscriptRef = useRef(false);
  const mutedReplyRef = useRef(false);
  // True once the room is closed/unmounted: nothing may start playing after that,
  // even if a late audio frame or a half-loaded player resolves afterwards.
  const disposedRef = useRef(false);
  // Every Mivo-audio player that exists right now. `stopAiAudio` and the unmount
  // cleanup stop ALL of them (not just the "current" one), so no orphan can keep talking.
  const livePlayersRef = useRef<Set<AudioPlayer>>(new Set());
  const recordingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const connectionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const replyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastMeterAtRef = useRef(0);
  const wsRef = useRef<WebSocket | null>(null);
  const audioQueueRef = useRef<string[]>([]);
  const currentPlayerRef = useRef<AudioPlayer | null>(null);
  const turnProcessingRef = useRef(false);
  const aiAudioPlayingRef = useRef(false);
  const endRequestedRef = useRef(false);
  // Push-to-talk: mic buffers are only forwarded to the socket while this is
  // true — flipped on by startTurn(), off by stopTurn(). Separate from
  // `isRecording` state (same value) because handleBuffer reads this on
  // every single PCM buffer and can't afford a stale-closure risk or a
  // state-read; the state copy exists purely so the UI can react/render.
  const isRecordingActiveRef = useRef(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Press-and-hold can produce a near-zero-length recording (an accidental
  // tap, or a release that races the start) — Deepgram then has nothing to
  // Finalize into a transcript.final, which would otherwise leave the
  // review card's loading spinner stuck forever. This bounds that wait.
  const reviewTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const recordStartTimeRef = useRef(0);
  const micLevelRef = useRef(-160);
  const micLevelFrameRef = useRef<number | null>(null);
  // `onmessage` is assigned once per connection, so reading React state
  // (`correction`) inside it would be a stale closure — this ref is what
  // `turn.complete` actually snapshots into the new turn.
  const lastCorrectionRef = useRef<WsCorrectionData | null>(null);
  // Separate from `currentPlayerRef`'s own cleanup inside playNextInQueue's
  // closure — stopAiAudio() needs to reach the *current* listener from
  // outside that closure to remove it before an abrupt stop.
  const currentSubscriptionRef = useRef<{ remove: () => void } | null>(null);
  // Every URI from the reply currently playing (or just finished) — NOT
  // mutated by playback (unlike audioQueueRef, which drains via .shift()),
  // so "Tekrar Dinle" can replay the same reply. Cleared when the next
  // confirm_turn fires, since a new reply is about to replace it.
  const lastReplyAudioUrisRef = useRef<string[]>([]);
  const [hasReplayableAudio, setHasReplayableAudio] = useState(false);

  const killPlayer = useCallback((player: AudioPlayer | null | undefined) => {
    if (!player) return;
    livePlayersRef.current.delete(player);
    // pause() first: remove() alone can leave a player that is still loading its data URI
    // free to start talking a moment later.
    try {
      player.pause();
    } catch {
      // already released
    }
    try {
      player.remove();
    } catch {
      // already released
    }
  }, []);

  const killAllPlayers = useCallback(() => {
    for (const player of Array.from(livePlayersRef.current)) killPlayer(player);
    livePlayersRef.current.clear();
  }, [killPlayer]);

  const playNextInQueue = useCallback(() => {
    if (disposedRef.current || endRequestedRef.current) {
      audioQueueRef.current = [];
      aiAudioPlayingRef.current = false;
      currentPlayerRef.current = null;
      currentSubscriptionRef.current = null;
      return;
    }
    const nextUri = audioQueueRef.current.shift();
    if (!nextUri) {
      setIsAiSpeaking(false);
      aiAudioPlayingRef.current = false;
      currentPlayerRef.current = null;
      currentSubscriptionRef.current = null;
      return;
    }
    setIsAiSpeaking(true);
    aiAudioPlayingRef.current = true;
    const player = createAudioPlayer({ uri: nextUri });
    livePlayersRef.current.add(player);
    currentPlayerRef.current = player;
    const subscription = player.addListener('playbackStatusUpdate', (playerStatus) => {
      if (playerStatus.didJustFinish) {
        subscription.remove();
        killPlayer(player);
        playNextInQueue();
      }
    });
    currentSubscriptionRef.current = subscription;
    player.play();
  }, [killPlayer]);

  const enqueueAudio = useCallback(
    (buffer: ArrayBuffer) => {
      const uri = `data:audio/wav;base64,${arrayBufferToBase64(buffer)}`;
      if (disposedRef.current || endRequestedRef.current) return;
      lastReplyAudioUrisRef.current.push(uri);
      if (mutedReplyRef.current) return;
      audioQueueRef.current.push(uri);
      setHasReplayableAudio(true);
      if (!currentPlayerRef.current) {
        playNextInQueue();
      }
    },
    [playNextInQueue],
  );

  // "Sesi Durdur" — cuts Mivo's reply short, mid-sentence if needed.
  const stopAiAudio = useCallback(() => {
    mutedReplyRef.current = true;
    currentSubscriptionRef.current?.remove();
    currentSubscriptionRef.current = null;
    killPlayer(currentPlayerRef.current);
    killAllPlayers();
    currentPlayerRef.current = null;
    audioQueueRef.current = [];
    aiAudioPlayingRef.current = false;
    setIsAiSpeaking(false);
  }, [killPlayer, killAllPlayers]);

  // "Tekrar Dinle" — replays the reply that just finished, while the user
  // is still deciding what to say next (thinking_time/recording/reviewing).
  const replayAiAudio = useCallback(() => {
    if (isRecordingActiveRef.current || turnProcessingRef.current || lastReplyAudioUrisRef.current.length === 0 || currentPlayerRef.current) return;
    mutedReplyRef.current = false;
    audioQueueRef.current = [...lastReplyAudioUrisRef.current];
    playNextInQueue();
  }, [playNextInQueue]);

  const handleBuffer = useCallback((buffer: { data: ArrayBuffer }) => {
    // Raw PCM buffers can arrive in tight synchronous bursts (observed on
    // real devices — see backend/mobile session notes on "Maximum update
    // depth exceeded" here). Calling setMicLevelDb on every single buffer
    // let a burst of back-to-back synchronous calls cascade past React's
    // update-depth safety limit. The waveform only needs ~60fps of visual
    // updates anyway, so the latest level is stashed in a ref immediately
    // (cheap, no re-render) and flushed to React state at most once per
    // animation frame — this structurally caps setState frequency
    // regardless of how bursty the native buffer delivery actually is.
    micLevelRef.current = levelFromPcm16(buffer.data);
    if (micLevelFrameRef.current == null && Date.now() - lastMeterAtRef.current > 80) {
      lastMeterAtRef.current = Date.now();
      micLevelFrameRef.current = requestAnimationFrame(() => {
        micLevelFrameRef.current = null;
        setMicLevelDb(micLevelRef.current);
      });
    }
    // Push-to-talk: only ever forward audio while the user has explicitly
    // started a turn. The other guards are defense-in-depth (the UI
    // shouldn't let startTurn() fire during these phases anyway) so Mivo's
    // own playback can never be mistaken for a second user turn.
    if (
      isRecordingActiveRef.current &&
      !turnProcessingRef.current &&
      !aiAudioPlayingRef.current &&
      !endRequestedRef.current &&
      wsRef.current?.readyState === WebSocket.OPEN
    ) {
      if (wsRef.current.bufferedAmount > 256000) {
        isRecordingActiveRef.current = false;
        wsRef.current.close(1000, 'slow_connection');
        return;
      }
      wsRef.current.send(buffer.data);
    }
  }, []);

  const { stream } = useVoiceStream(handleBuffer);

  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(VOICE_PRIVACY_ACK_KEY)
      .then((value) => {
        if (active) setVoicePrivacyAcknowledged(value === 'true');
      })
      .catch(() => {
        if (active) setVoicePrivacyAcknowledged(false);
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (voicePrivacyAcknowledged !== true) return;
    if (!tokenRef.current) {
      setStatus('closed');
      setCloseInfo({ code: 1008, reason: 'auth_required' });
      return;
    }
    const wsUrl = buildWsUrl(scenarioSlug, !!sceneRef.current);
    if (!wsUrl) {
      setStatus('closed');
      setCloseInfo({ code: 0, reason: 'missing_api_base_url' });
      return;
    }

    let cancelled = false;
    let socket: WebSocket | null = null;
    disposedRef.current = false;

    setStatus('connecting');
    setCloseInfo(null);
    setLiveError(null);
    setPermissionDenied(false);
    endRequestedRef.current = false;
    mutedReplyRef.current = false;
    awaitingTranscriptRef.current = false;
    setAiReplyText('');
    setTurns([]);
    setIsAiSpeaking(false);
    setIsAiReplyStreaming(false);
    setWaitingForReply(false);
    setIsReviewing(false);
    setIsRecording(false);
    setAudioNotice(null);
    lastReplyAudioUrisRef.current = [];
    setHasReplayableAudio(false);

    async function connect() {
      const granted = Platform.OS === 'web' ? true : (await requestRecordingPermissionsAsync()).granted;
      if (cancelled) return;
      if (!granted) {
        setPermissionDenied(true);
        setStatus('closed');
        return;
      }

      socket = new WebSocket(wsUrl!);
      socket.binaryType = 'arraybuffer';
      wsRef.current = socket;

      socket.onopen = () => {
        if (cancelled) return;
        socket?.send(
          JSON.stringify({
            type: 'auth',
            access_token: tokenRef.current,
            ...(sceneRef.current ? { scene: sceneRef.current } : {}),
          })
        );
        // `stream` is null on web — expo-audio's useAudioStream is a no-op stub there.
      };

      connectionTimerRef.current = setTimeout(() => socket?.close(1000, 'connection_timeout'), 25000);
      socket.onmessage = (event) => {
        if (cancelled || endRequestedRef.current) return;
        if (typeof event.data !== 'string') {
          enqueueAudio(event.data as ArrayBuffer);
          return;
        }
        let message: WsServerMessage;
        try {
          message = JSON.parse(event.data);
        } catch {
          return;
        }
        switch (message.type) {
          case 'session.ready':
            if (connectionTimerRef.current) clearTimeout(connectionTimerRef.current);
            setAiReplyText((opening) => {
              if (opening) setTurns([{ role: 'assistant', text: opening }]);
              return '';
            });
            setLiveError(null);
            setStatus('open');
            setStartedAt(new Date().toISOString());
            // The opening sentence is sent before session.ready and has no
            // turn.complete event of its own. Audio playback (if available)
            // continues to keep the speaking phase active independently.
            setIsAiReplyStreaming(false);
            break;
          case 'transcript.interim':
            if (!isRecordingActiveRef.current && !awaitingTranscriptRef.current) break;
            setInterimText(message.text);
            if (message.words) setInterimWords(message.words);
            break;
          case 'transcript.final': {
            if (!awaitingTranscriptRef.current) break;
            awaitingTranscriptRef.current = false;
            if (reviewTimeoutRef.current) {
              clearTimeout(reviewTimeoutRef.current);
              reviewTimeoutRef.current = null;
            }
            if (!message.text.trim()) {
              setIsReviewing(false);
              setLiveError(t("Ses algılanmadı. Tekrar söyleyebilir veya yazabilirsin."));
              break;
            }
            setLiveError(null);
            setInterimText(message.text);
            if (message.words) setInterimWords(message.words);
            if (message.metrics) {
              setLatestMetrics(message.metrics);
              if (message.metrics.filler_count > 0) {
                setTotalFillersCount((c) => c + message.metrics!.filler_count);
              }
              if (message.metrics.wpm > 0) {
                setWpmHistory((h) => [...h, message.metrics!.wpm]);
              }
              if (message.metrics.avg_confidence > 0) {
                setConfidenceHistory((h) => [...h, message.metrics!.avg_confidence]);
              }
            }
            // Smart auto-confirm: a mandatory review card on every single
            // turn was the #1 complaint testing this against a fast-paced
            // scenario (ordering food) — three taps (Başla/Bitir/Gönder)
            // per turn felt heavy for short, clearly-heard exchanges. When
            // Deepgram is confident it heard correctly, skip straight to
            // confirmTranscript() — same effect as the user reviewing and
            // tapping Gönder themselves, just without the extra tap+read.
            // Low confidence still gets the full review card, which is
            // exactly the case that safety net was built for in the first
            // place (see the plan's original "düşük güven" design).
            const avgConf = message.metrics?.avg_confidence ?? null;
            if (avgConf != null && avgConf >= AUTO_CONFIRM_CONFIDENCE_THRESHOLD) {
              confirmTranscript(message.text);
              break;
            }
            // Does NOT trigger the AI turn anymore — just fills the
            // transcript confirmation card. confirmTranscript() is what
            // actually sends confirm_turn.
            setPendingTranscript(message.text);
            setPendingWords(message.words ?? []);
            setPendingConfidence(avgConf);
            setIsReviewing(true);
            break;
          }
          case 'correction':
            setCorrection(message.data);
            lastCorrectionRef.current = message.data;
            if (message.data.has_error) setCorrectionsCount((c) => c + 1);
            break;
          case 'reply.sentence':
            // Deliberately NOT clearing waitingForReply here — see the
            // real bug this caused below. Sentence TEXT arrives before its
            // TTS audio does (synthesis takes a beat), so clearing it here
            // let turnPhase fall through to 'thinking_time' (mic-ready) for
            // that gap, since isAiSpeaking only flips true once audio
            // actually starts PLAYING. A user who tapped "Konuşmaya Başla"
            // during that window started streaming mic audio while Mivo's
            // reply was literally about to start/was playing over the
            // speaker — the mic picked up her own voice, which Deepgram
            // then transcribed as the user's turn. waitingForReply now
            // stays true for the whole confirm_turn → turn.complete span
            // (ai_thinking, minus whatever's genuinely ai_speaking), with
            // no gap in between.
            setIsAiReplyStreaming(true);
            setAiReplyText((prev) => (prev ? `${prev} ${message.text}` : message.text));
            break;
          case 'audio.unavailable':
            setAudioNotice(t("Ses çalınamadı; yanıtı okuyarak devam edebilirsin."));
            break;
          case 'turn.complete':
            if (replyTimerRef.current) clearTimeout(replyTimerRef.current);
            turnProcessingRef.current = false;
            setTurns((prev) => [
              ...prev,
              { role: 'user', text: message.user_text, correction: lastCorrectionRef.current },
              { role: 'assistant', text: message.assistant_text },
            ]);
            lastCorrectionRef.current = null;
            setInterimText('');
            setInterimWords([]);
            setAiReplyText('');
            setCorrection(null);
            setWaitingForReply(false);
            setIsAiReplyStreaming(false);
            setSuggestedReplies(message.suggested_replies ?? []);
            setCoachTipTr(message.coach_tip_tr ?? null);
            break;
          case 'scene.complete':
            // Soft nudge, not a forced end — the model judged the scenario's
            // objectives meaningfully covered (see backend Ek 32). The user
            // can keep talking; this just makes "you can wrap up now" visible.
            setSceneCompleteSummary(
              message.summary_tr ?? t("Sahnenin hedeflerini tamamladın gibi görünüyor!")
            );
            break;
          case 'session.time_limit_reached':
            setCloseInfo({ code: 0, reason: 'time_limit_reached' });
            break;
          case 'error':
            if (replyTimerRef.current) clearTimeout(replyTimerRef.current);
            if (reviewTimeoutRef.current) clearTimeout(reviewTimeoutRef.current);
            awaitingTranscriptRef.current = false;
            isRecordingActiveRef.current = false;
            setIsRecording(false);
            stream?.stop();
            stopAiAudio();
            turnProcessingRef.current = false;
            setWaitingForReply(false);
            setIsAiReplyStreaming(false);
            setIsReviewing(false);
            if (!message.retryable) {
              socket?.close();
              setCloseInfo({ code: 0, reason: message.code });
            }
            setLiveError(WS_ERROR_TEXT[message.code] ?? message.message);
            break;
          case 'fluency_score':
            // Not shown live — accumulated here so /sessions/end (Görev 11) can average them server-side.
            setFluencyScores((prev) => [...prev, message.value]);
            break;
        }
      };

      socket.onclose = (event) => {
        if (cancelled) return;
        if (wsRef.current === socket) wsRef.current = null;
        turnProcessingRef.current = false;
        setStatus('closed');
        isRecordingActiveRef.current = false;
        awaitingTranscriptRef.current = false;
        setIsRecording(false);
        setIsReviewing(false);
        setWaitingForReply(false);
        setIsAiReplyStreaming(false);
        stopAiAudio();
        setCloseInfo((prev) => prev ?? { code: event.code, reason: event.reason });
        stream?.stop();
      };

      socket.onerror = () => {
        if (cancelled) return;
        setStatus('closed');
        setCloseInfo((prev) => prev ?? { code: 0, reason: 'connection_error' });
      };
    }

    connect().catch(() => {
      if (cancelled) return;
      setStatus('closed');
      setCloseInfo({ code: 0, reason: 'connection_error' });
      socket?.close();
    });

    return () => {
      cancelled = true;
      for (const timer of [recordingTimerRef, connectionTimerRef, replyTimerRef]) {
        if (timer.current) clearTimeout(timer.current);
        timer.current = null;
      }
      isRecordingActiveRef.current = false;
      if (wsRef.current === socket) wsRef.current = null;
      socket?.close();
      // Deliberately NOT calling stream?.stop() here: `useVoiceStream`
      // (expo-audio's useAudioStream) already auto-releases the native
      // AudioStream shared object on unmount via useReleasingSharedObject.
      // Calling .stop() here too raced against that automatic release and
      // crashed on Android ("shared object was already released"). The
      // still-mounted "connection dropped" case is covered by onclose's
      // stopStream() call above.
      disposedRef.current = true;
      currentSubscriptionRef.current?.remove();
      currentSubscriptionRef.current = null;
      killPlayer(currentPlayerRef.current);
      killAllPlayers();
      currentPlayerRef.current = null;
      audioQueueRef.current = [];
      aiAudioPlayingRef.current = false;
      turnProcessingRef.current = false;
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
      if (reviewTimeoutRef.current) {
        clearTimeout(reviewTimeoutRef.current);
        reviewTimeoutRef.current = null;
      }
      if (micLevelFrameRef.current != null) {
        cancelAnimationFrame(micLevelFrameRef.current);
        micLevelFrameRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scenarioSlug, userId, connectionAttempt, voicePrivacyAcknowledged]);

  const acknowledgeVoicePrivacy = useCallback(() => {
    void AsyncStorage.setItem(VOICE_PRIVACY_ACK_KEY, 'true');
    setVoicePrivacyAcknowledged(true);
  }, []);

  const reconnect = useCallback(() => {
    if (turns.some((turn) => turn.role === 'user')) return;
    setConnectionAttempt((attempt) => attempt + 1);
  }, [turns.length]);

  // Remembers the last text actually sent as confirm_turn, so a
  // "voice_reply_failed" error can offer "Tekrar Dene" (resend the exact
  // same text) without forcing the user to redo the whole recording.
  const lastConfirmedTextRef = useRef<string | null>(null);

  const startTurn = useCallback(() => {
    if (status !== 'open' || endRequestedRef.current || turnProcessingRef.current) return;
    if (Platform.OS === 'web') {
      setLiveError(t("Bu tarayıcıda canlı mikrofon desteklenmiyor. Mesaj yazarak devam edebilirsin."));
      return;
    }
    if (
      isRecordingActiveRef.current ||
      isReviewing ||
      waitingForReply ||
      isAiSpeaking ||
      isAiReplyStreaming
    ) return;
    setLiveError(null);
    setInterimText('');
    setInterimWords([]);
    setPendingTranscript(null);
    setPendingWords([]);
    setPendingConfidence(null);
    awaitingTranscriptRef.current = false;
    wsRef.current?.send(JSON.stringify({ type: 'start_turn', language: inputLanguageRef.current }));
    recordStartTimeRef.current = Date.now();
    isRecordingActiveRef.current = true;
    setIsRecording(true);
    // The native microphone is started only while the button is held. The
    // previous implementation started it at session.ready and merely
    // discarded buffers outside recording, which left the OS microphone
    // active while the tutor was speaking.
    recordingTimerRef.current = setTimeout(() => stopTurn(), 59000);
    stream?.start()?.then(() => {
      // A quick release can happen while native start() is still pending.
      if (!isRecordingActiveRef.current) stream?.stop();
    }).catch(() => {
      isRecordingActiveRef.current = false;
      setIsRecording(false);
      setLiveError(t("Mikrofon başlatılamadı. Uygulama izinlerini kontrol et."));
    });
  }, [status, isReviewing, waitingForReply, isAiSpeaking, isAiReplyStreaming, stream]);

  const stopTurn = useCallback(() => {
    if (!isRecordingActiveRef.current) return;
    isRecordingActiveRef.current = false;
    setIsRecording(false);
    stream?.stop();
    // Press-and-hold means an accidental brief tap is a real possibility —
    // silently return to thinking_time instead of bothering the backend
    // and flashing a "couldn't hear you" error for a non-attempt.
    if (recordingTimerRef.current) clearTimeout(recordingTimerRef.current);
    awaitingTranscriptRef.current = true;
    setIsReviewing(true);
    const socket = wsRef.current;
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: 'end_turn' }));
    }
    if (reviewTimeoutRef.current) clearTimeout(reviewTimeoutRef.current);
    reviewTimeoutRef.current = setTimeout(() => {
      reviewTimeoutRef.current = null;
      awaitingTranscriptRef.current = false;
      setIsReviewing(false);
      setPendingTranscript(null);
      setPendingWords([]);
      setPendingConfidence(null);
      setLiveError(t("Seni duyamadım, tekrar dener misin?"));
    }, REVIEW_TIMEOUT_MS);
  }, [stream]);

  // Discards the pending transcript and goes back to recording — "Tekrar
  // Söyle". Purely client-side: the backend already reset its own
  // per-utterance buffers right after sending transcript.final, so there's
  // nothing to tell it to forget. Also doubles as the error phase's "Tekrar
  // Söyle" escape hatch, so it clears liveError too — otherwise turnPhase
  // would stay stuck on 'error' (that check takes priority) even after the
  // user picked a recovery action.
  const redoTurn = useCallback(() => {
    awaitingTranscriptRef.current = false;
    if (reviewTimeoutRef.current) clearTimeout(reviewTimeoutRef.current);
    setIsReviewing(false);
    setPendingTranscript(null);
    setPendingWords([]);
    setPendingConfidence(null);
    setInterimText('');
    setInterimWords([]);
    setLiveError(null);
  }, []);

  const confirmTranscript = useCallback(
    (text: string) => {
      const confirmedText = text.trim();
      if (!confirmedText || confirmedText.length > 2000 || turnProcessingRef.current || isRecordingActiveRef.current || endRequestedRef.current) return;
      const socket = wsRef.current;
      if (socket?.readyState !== WebSocket.OPEN) return;
      if (reviewTimeoutRef.current) clearTimeout(reviewTimeoutRef.current);
      awaitingTranscriptRef.current = false;
      stopAiAudio();
      mutedReplyRef.current = false;
      setAiReplyText('');
      setInterimText(confirmedText);
      setInterimWords([]);
      setAudioNotice(null);
      lastConfirmedTextRef.current = confirmedText;
      setLiveError(null);
      setIsReviewing(false);
      setPendingTranscript(null);
      setPendingWords([]);
      setPendingConfidence(null);
      turnProcessingRef.current = true;
      setWaitingForReply(true);
      // A new reply is about to be generated — the just-finished one is no
      // longer "the last thing Mivo said", so stop offering to replay it.
      lastReplyAudioUrisRef.current = [];
      setHasReplayableAudio(false);
      socket.send(JSON.stringify({ type: 'confirm_turn', text: confirmedText }));
      replyTimerRef.current = setTimeout(() => socket.close(1000, 'reply_timeout'), 45000);
    },
    []
  );

  const retryLastTurn = useCallback(() => {
    if (lastConfirmedTextRef.current) {
      confirmTranscript(lastConfirmedTextRef.current);
    } else {
      redoTurn();
    }
  }, [confirmTranscript, redoTurn]);

  const endSession = useCallback(() => {
    if (endRequestedRef.current) return;
    endRequestedRef.current = true;
    isRecordingActiveRef.current = false;
    awaitingTranscriptRef.current = false;
    stream?.stop();
    stopAiAudio();
    setIsRecording(false);
    turnProcessingRef.current = true;
    const socket = wsRef.current;
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: 'end_session' }));
      // Let the control frame leave the native socket before initiating the
      // close handshake. Closing immediately can discard the queued frame on
      // slower mobile networks.
      closeTimerRef.current = setTimeout(() => {
        socket.close(1000, 'user_ended_session');
        closeTimerRef.current = null;
      }, 300);
      return;
    }
    socket?.close();
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (state) => {
      if (state !== 'active' && wsRef.current?.readyState === WebSocket.OPEN) {
        endSession();
      }
    });
    return () => subscription.remove();
  }, [endSession]);

  const orbState: OrbState =
    status !== 'open'
      ? 'idle'
      : isAiSpeaking || isAiReplyStreaming
      ? 'speaking'
      : waitingForReply
      ? 'thinking'
      : isRecording
      ? 'listening'
      : 'idle';

  const turnPhase: TurnPhase =
    status === 'open' && liveError
      ? 'error'
      : isAiSpeaking || isAiReplyStreaming
      ? 'ai_speaking'
      : waitingForReply
      ? 'ai_thinking'
      : isReviewing
      ? 'reviewing'
      : isRecording
      ? 'recording'
      : 'thinking_time';

  return {
    status,
    inputLanguage,
    setInputLanguage,
    audioNotice,
    closeInfo,
    permissionDenied,
    voicePrivacyLoading: voicePrivacyAcknowledged === null,
    needsVoicePrivacyAcknowledgement: voicePrivacyAcknowledged === false,
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
  };
}
