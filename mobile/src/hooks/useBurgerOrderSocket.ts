import {
  createAudioPlayer,
  requestRecordingPermissionsAsync,
  setAudioModeAsync,
  type AudioPlayer,
} from 'expo-audio';
import { useCallback, useEffect, useRef, useState } from 'react';

import { useAuth } from '../context/AuthContext';
import { arrayBufferToBase64 } from '../lib/base64';
import { useVoiceStream } from './useVoiceStream';
import type { BurgerCoachTip, BurgerOrderState, CompletedReceiptData } from '../types/burger';

export type ConnectionStatus = 'connecting' | 'open' | 'closed';

export type TurnPhase =
  | 'ai_speaking'
  | 'thinking_time'
  | 'recording'
  | 'finalizing'
  | 'reviewing'
  | 'ai_thinking'
  | 'error';

function buildWsUrl(): string | null {
  const apiBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL;
  if (!apiBaseUrl) return null;
  const wsBase = apiBaseUrl.replace(/^http/, 'ws');
  return `${wsBase}/ws/burger-order`;
}

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

const INITIAL_ORDER_STATE: BurgerOrderState = {
  items: [],
  drinks: [],
  sides: [],
  dining_option: null,
  payment_status: 'pending',
  total_usd: 0.0,
  stage: 'ordering',
};

export function useBurgerOrderSocket() {
  const { session } = useAuth();
  const accessToken = session?.access_token;

  const [status, setStatus] = useState<ConnectionStatus>('connecting');
  const [closeInfo, setCloseInfo] = useState<{ code: number; reason: string } | null>(null);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [interimText, setInterimText] = useState('');
  const [pendingTranscript, setPendingTranscript] = useState<string | null>(null);
  const [aiSpeechText, setAiSpeechText] = useState('');
  const [aiSpeechSpeaker, setAiSpeechSpeaker] = useState<'maya' | 'coach'>('maya');
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [orderState, setOrderState] = useState<BurgerOrderState>(INITIAL_ORDER_STATE);
  const [coachTip, setCoachTip] = useState<BurgerCoachTip | null>(null);
  const [completedReceipt, setCompletedReceipt] = useState<CompletedReceiptData | null>(null);
  const [suggestedReplies, setSuggestedReplies] = useState<string[]>([
    "I'd like a Double Cheeseburger menu, please.",
    "Can I get a Classic Cheeseburger?",
    "What kind of burgers do you have?",
  ]);
  const [micLevelDb, setMicLevelDb] = useState(-160);
  const [isRecording, setIsRecording] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);
  const [turnPhase, setTurnPhase] = useState<TurnPhase>('ai_speaking');
  const [liveError, setLiveError] = useState<string | null>(null);
  const [transcriptConfidence, setTranscriptConfidence] = useState<number | null>(null);

  const wsRef = useRef<WebSocket | null>(null);
  const audioQueueRef = useRef<{ uri: string; speaker: 'maya' | 'coach'; text: string }[]>([]);
  const currentPlayerRef = useRef<AudioPlayer | null>(null);
  const currentSubscriptionRef = useRef<any>(null);
  const isRecordingActiveRef = useRef(false);
  const micLevelRef = useRef(-160);
  const micLevelFrameRef = useRef<number | null>(null);
  const streamRef = useRef<any>(null);
  const finalizeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const playNextInQueue = useCallback(() => {
    const nextItem = audioQueueRef.current.shift();
    if (!nextItem) {
      setIsAiSpeaking(false);
      currentPlayerRef.current = null;
      currentSubscriptionRef.current = null;
      setTurnPhase((prev) => (prev === 'ai_speaking' ? 'thinking_time' : prev));
      return;
    }
    setIsAiSpeaking(true);
    setTurnPhase('ai_speaking');
    setAiSpeechText(nextItem.text);
    setAiSpeechSpeaker(nextItem.speaker);

    const player = createAudioPlayer({ uri: nextItem.uri });
    currentPlayerRef.current = player;
    const subscription = player.addListener('playbackStatusUpdate', (playerStatus) => {
      if (playerStatus.didJustFinish) {
        subscription.remove();
        player.remove();
        playNextInQueue();
      }
    });
    currentSubscriptionRef.current = subscription;
    player.play();
  }, []);

  const enqueueAudio = useCallback(
    (buffer: ArrayBuffer, speaker: 'maya' | 'coach', text: string) => {
      const uri = `data:audio/wav;base64,${arrayBufferToBase64(buffer)}`;
      audioQueueRef.current.push({ uri, speaker, text });
      if (!currentPlayerRef.current) {
        playNextInQueue();
      }
    },
    [playNextInQueue],
  );

  const enqueueAudioRef = useRef(enqueueAudio);
  enqueueAudioRef.current = enqueueAudio;

  const stopAiAudio = useCallback(() => {
    currentSubscriptionRef.current?.remove();
    currentSubscriptionRef.current = null;
    currentPlayerRef.current?.remove();
    currentPlayerRef.current = null;
    audioQueueRef.current = [];
    setIsAiSpeaking(false);
    setTurnPhase('thinking_time');
  }, []);

  const handleBuffer = useCallback((buffer: { data: ArrayBuffer }) => {
    micLevelRef.current = levelFromPcm16(buffer.data);
    if (micLevelFrameRef.current == null) {
      micLevelFrameRef.current = requestAnimationFrame(() => {
        micLevelFrameRef.current = null;
        setMicLevelDb(micLevelRef.current);
      });
    }
    if (isRecordingActiveRef.current && wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(buffer.data);
    }
  }, []);

  const { stream } = useVoiceStream(handleBuffer);
  streamRef.current = stream;

  // Connect to WebSocket & request mic permission
  useEffect(() => {
    let unmounted = false;
    const url = buildWsUrl();
    if (!url) {
      setLiveError('EXPO_PUBLIC_API_BASE_URL yapılandırılmamış.');
      setStatus('closed');
      return;
    }
    if (!accessToken) {
      setLiveError('Oturum bulunamadı. Lütfen yeniden giriş yap.');
      setStatus('closed');
      return;
    }

    async function connect() {
      const { granted } = await requestRecordingPermissionsAsync();
      if (unmounted) return;
      if (!granted) {
        setPermissionDenied(true);
        setStatus('closed');
        return;
      }

      try {
        await setAudioModeAsync({ allowsRecording: true, playsInSilentMode: true });
      } catch {
        // best effort
      }

      const ws = new WebSocket(url!);
      ws.binaryType = 'arraybuffer';
      wsRef.current = ws;

      ws.onopen = () => {
        if (unmounted) return;
        ws.send(JSON.stringify({ type: 'auth', access_token: accessToken }));
      };

      let latestSentenceMeta: { speaker: 'maya' | 'coach'; text: string } = {
        speaker: 'maya',
        text: '',
      };

      ws.onmessage = (event) => {
        if (unmounted) return;

        if (typeof event.data === 'string') {
          try {
            const msg = JSON.parse(event.data);
            switch (msg.type) {
              case 'session.ready':
                setStatus('open');
                // Started once, here — NOT per-turn (see startTurn/stopTurn
                // below). Restarting the native mic stream on every single
                // turn gave it a brief warm-up window each time, clipping
                // the first words of what the user said right after
                // pressing the talk button. Keeping it running continuously
                // and only gating what's actually SENT (isRecordingActiveRef
                // in handleBuffer) avoids that entirely — same fix already
                // applied to the generic useConversationSocket.ts.
                streamRef.current?.start()?.catch(() => {
                  setLiveError('Mikrofon başlatılamadı. Uygulama izinlerini kontrol et.');
                });
                break;
              case 'reply.sentence':
                latestSentenceMeta = {
                  speaker: msg.speaker || (msg.is_coach ? 'coach' : 'maya'),
                  text: msg.text || '',
                };
                break;
              case 'order.update':
                if (msg.order_state) {
                  setOrderState(msg.order_state);
                }
                break;
              case 'coach.tip':
                if (msg.data) {
                  setCoachTip(msg.data);
                }
                break;
              case 'order.completed':
                setCompletedReceipt({
                  receipt: msg.receipt || orderState,
                  summary_tr: msg.summary_tr,
                  order_number: msg.order_number || 42,
                  fluency_score: msg.fluency_score || 90,
                });
                break;
              case 'transcript.interim':
                setInterimText(msg.text || '');
                break;
              case 'transcript.final':
                if (finalizeTimerRef.current) clearTimeout(finalizeTimerRef.current);
                setInterimText(msg.text || '');
                setPendingTranscript(msg.text || '');
                setTranscriptConfidence(typeof msg.avg_confidence === 'number' ? msg.avg_confidence : null);
                setIsReviewing(true);
                setTurnPhase('reviewing');
                break;
              case 'turn.processing':
                setTurnPhase('ai_thinking');
                break;
              case 'session.reset':
                setTurnPhase('thinking_time');
                break;
              case 'turn.complete':
                setInterimText('');
                setPendingTranscript(null);
                setIsReviewing(false);
                if (msg.suggested_replies && msg.suggested_replies.length > 0) {
                  setSuggestedReplies(msg.suggested_replies);
                }
                break;
              case 'error':
                setLiveError(msg.message || 'Bir hata oluştu.');
                setTurnPhase('error');
                break;
            }
          } catch {
            // ignore
          }
        } else if (event.data instanceof ArrayBuffer) {
          // Binary audio frame from Cartesia
          enqueueAudioRef.current?.(event.data, latestSentenceMeta.speaker, latestSentenceMeta.text);
        } else if (event.data instanceof Blob) {
          // Web blob conversion
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.result instanceof ArrayBuffer) {
              enqueueAudioRef.current?.(reader.result, latestSentenceMeta.speaker, latestSentenceMeta.text);
            }
          };
          reader.readAsArrayBuffer(event.data);
        }
      };

      ws.onclose = (event) => {
        if (unmounted) return;
        setStatus('closed');
        setCloseInfo({ code: event.code, reason: event.reason });
      };

      ws.onerror = () => {
        if (unmounted) return;
        setLiveError('Sunucu bağlantısı koptu.');
      };
    }

    connect();

    return () => {
      unmounted = true;
      wsRef.current?.close();
      if (finalizeTimerRef.current) clearTimeout(finalizeTimerRef.current);
      stopAiAudio();
    };
  }, [accessToken, stopAiAudio]);

  // Turn management (push to talk)
  const startTurn = useCallback(async () => {
    if (status !== 'open' || isAiSpeaking || turnPhase === 'ai_thinking' || turnPhase === 'finalizing') return;
    try {
      await setAudioModeAsync({ allowsRecording: true, playsInSilentMode: true });
    } catch {
      // ignore
    }
    // Mic stream itself is NOT started/stopped here anymore — it's been
    // running continuously since session.ready. Only the gate
    // (isRecordingActiveRef, read in handleBuffer) toggles per turn.
    setInterimText('');
    setPendingTranscript(null);
    setTranscriptConfidence(null);
    setIsRecording(true);
    setIsReviewing(false);
    setTurnPhase('recording');
    isRecordingActiveRef.current = true;
  }, [isAiSpeaking, status, turnPhase]);

  const stopTurn = useCallback(() => {
    if (!isRecordingActiveRef.current) return;
    isRecordingActiveRef.current = false;
    setIsRecording(false);
    setTurnPhase('finalizing');
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'end_turn' }));
    }
    finalizeTimerRef.current = setTimeout(() => {
      if (!interimText.trim()) {
        setLiveError('Ses algılanamadı. Lütfen tekrar dene.');
        setTurnPhase('thinking_time');
        return;
      }
      setPendingTranscript(interimText);
      setIsReviewing(true);
      setTurnPhase('reviewing');
    }, 2200);
  }, [interimText]);

  const confirmTurn = useCallback((confirmedText: string) => {
    const trimmed = confirmedText.trim();
    if (!trimmed) return;
    setIsReviewing(false);
    setTurnPhase('ai_thinking');
    setAudioModeAsync({ allowsRecording: false, playsInSilentMode: true }).catch(() => {});
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'confirm_turn', text: trimmed }));
    }
  }, []);

  const cancelReview = useCallback(() => {
    setIsReviewing(false);
    setPendingTranscript(null);
    setInterimText('');
    setTranscriptConfidence(null);
    setTurnPhase('thinking_time');
  }, []);

  const resetOrder = useCallback(() => {
    setOrderState(INITIAL_ORDER_STATE);
    setCompletedReceipt(null);
    setCoachTip(null);
    setPendingTranscript(null);
    setInterimText('');
    setTranscriptConfidence(null);
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'reset_order' }));
    }
  }, []);

  return {
    status,
    closeInfo,
    liveError,
    permissionDenied,
    turnPhase,
    isAiSpeaking,
    isRecording,
    isReviewing,
    micLevelDb,
    interimText,
    pendingTranscript,
    transcriptConfidence,
    aiSpeechText,
    aiSpeechSpeaker,
    orderState,
    coachTip,
    completedReceipt,
    suggestedReplies,
    startTurn,
    stopTurn,
    confirmTurn,
    cancelReview,
    stopAiAudio,
    resetOrder,
  };
}
