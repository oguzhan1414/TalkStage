import { createAudioPlayer, requestRecordingPermissionsAsync, type AudioPlayer } from 'expo-audio';
import { useCallback, useEffect, useRef, useState } from 'react';

import { useAuth } from '../context/AuthContext';
import { arrayBufferToBase64 } from '../lib/base64';
import { useVoiceStream } from './useVoiceStream';
import type { TranscriptTurn } from '../types/api';
import type { WsCorrectionData, WsServerMessage } from '../types/ws';

export type ConnectionStatus = 'connecting' | 'open' | 'closed';

export type OrbState = 'idle' | 'listening' | 'thinking' | 'speaking';

export type CloseInfo = {
  code: number;
  reason: string;
};

function buildWsUrl(scenarioSlug: string, accessToken: string): string | null {
  const apiBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL;
  if (!apiBaseUrl) return null;
  const wsBase = apiBaseUrl.replace(/^http/, 'ws');
  return `${wsBase}/ws/session/${encodeURIComponent(scenarioSlug)}?token=${encodeURIComponent(accessToken)}`;
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
export function useConversationSocket(scenarioSlug: string) {
  const { session } = useAuth();
  const accessToken = session?.access_token;

  const [status, setStatus] = useState<ConnectionStatus>('connecting');
  const [closeInfo, setCloseInfo] = useState<CloseInfo | null>(null);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [interimText, setInterimText] = useState('');
  const [aiReplyText, setAiReplyText] = useState('');
  const [correction, setCorrection] = useState<WsCorrectionData | null>(null);
  const [turns, setTurns] = useState<TranscriptTurn[]>([]);
  const [micLevelDb, setMicLevelDb] = useState(-160);
  const [waitingForReply, setWaitingForReply] = useState(false);
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [startedAt, setStartedAt] = useState<string | null>(null);
  const [correctionsCount, setCorrectionsCount] = useState(0);
  const [fluencyScores, setFluencyScores] = useState<number[]>([]);

  const wsRef = useRef<WebSocket | null>(null);
  const audioQueueRef = useRef<string[]>([]);
  const currentPlayerRef = useRef<AudioPlayer | null>(null);

  const playNextInQueue = useCallback(() => {
    const nextUri = audioQueueRef.current.shift();
    if (!nextUri) {
      setIsAiSpeaking(false);
      currentPlayerRef.current = null;
      return;
    }
    setIsAiSpeaking(true);
    const player = createAudioPlayer({ uri: nextUri });
    currentPlayerRef.current = player;
    const subscription = player.addListener('playbackStatusUpdate', (playerStatus) => {
      if (playerStatus.didJustFinish) {
        subscription.remove();
        player.remove();
        playNextInQueue();
      }
    });
    player.play();
  }, []);

  const enqueueAudio = useCallback(
    (buffer: ArrayBuffer) => {
      audioQueueRef.current.push(`data:audio/wav;base64,${arrayBufferToBase64(buffer)}`);
      if (!currentPlayerRef.current) {
        playNextInQueue();
      }
    },
    [playNextInQueue],
  );

  const handleBuffer = useCallback((buffer: { data: ArrayBuffer }) => {
    setMicLevelDb(levelFromPcm16(buffer.data));
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(buffer.data);
    }
  }, []);

  const { stream } = useVoiceStream(handleBuffer);

  useEffect(() => {
    if (!accessToken) return;
    const wsUrl = buildWsUrl(scenarioSlug, accessToken);
    if (!wsUrl) {
      setStatus('closed');
      setCloseInfo({ code: 0, reason: 'missing_api_base_url' });
      return;
    }

    let cancelled = false;
    let socket: WebSocket | null = null;

    async function connect() {
      const { granted } = await requestRecordingPermissionsAsync();
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
        setStatus('open');
        setStartedAt(new Date().toISOString());
        // `stream` is null on web — expo-audio's useAudioStream is a no-op stub there.
        stream?.start()?.catch(() => {});
      };

      socket.onmessage = (event) => {
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
          case 'transcript.interim':
            setInterimText(message.text);
            break;
          case 'transcript.final':
            setInterimText(message.text);
            setWaitingForReply(true);
            break;
          case 'correction':
            setCorrection(message.data);
            if (message.data.has_error) setCorrectionsCount((c) => c + 1);
            break;
          case 'reply.sentence':
            setWaitingForReply(false);
            setAiReplyText((prev) => (prev ? `${prev} ${message.text}` : message.text));
            break;
          case 'turn.complete':
            setTurns((prev) => [
              ...prev,
              { role: 'user', text: message.user_text },
              { role: 'assistant', text: message.assistant_text },
            ]);
            setInterimText('');
            setAiReplyText('');
            setCorrection(null);
            setWaitingForReply(false);
            break;
          case 'session.time_limit_reached':
            setCloseInfo({ code: 0, reason: 'time_limit_reached' });
            break;
          case 'error':
            setWaitingForReply(false);
            setCloseInfo({ code: 0, reason: message.message });
            break;
          case 'fluency_score':
            // Not shown live — accumulated here so /sessions/end (Görev 11) can average them server-side.
            setFluencyScores((prev) => [...prev, message.value]);
            break;
        }
      };

      socket.onclose = (event) => {
        if (cancelled) return;
        setStatus('closed');
        setCloseInfo((prev) => prev ?? { code: event.code, reason: event.reason });
        stream?.stop();
      };

      socket.onerror = () => {
        if (cancelled) return;
        setStatus('closed');
      };
    }

    connect();

    return () => {
      cancelled = true;
      socket?.close();
      stream?.stop();
      currentPlayerRef.current?.remove();
      currentPlayerRef.current = null;
      audioQueueRef.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scenarioSlug, accessToken]);

  const endSession = useCallback(() => {
    const socket = wsRef.current;
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: 'end_session' }));
    }
    socket?.close();
  }, []);

  const orbState: OrbState =
    status !== 'open' ? 'idle' : isAiSpeaking ? 'speaking' : waitingForReply ? 'thinking' : 'listening';

  return {
    status,
    closeInfo,
    permissionDenied,
    interimText,
    aiReplyText,
    correction,
    turns,
    micLevelDb,
    orbState,
    endSession,
    startedAt,
    correctionsCount,
    fluencyScores,
  };
}
