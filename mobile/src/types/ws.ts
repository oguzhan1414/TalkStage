/**
 * Mirrors the protocol documented at the top of
 * `backend/app/api/routes/ws_session.py`. Keep in sync manually.
 */

export type WsCorrectionData = {
  has_error: boolean;
  user_said: string;
  corrected: string;
  explanation_tr: string;
};

export type WsWordMetric = {
  word: string;
  punctuated_word?: string;
  confidence: number;
  start: number;
  end: number;
};

export type WsTurnMetrics = {
  wpm: number;
  filler_count: number;
  avg_confidence: number;
  duration_sec: number;
};

export type WsServerMessage =
  | { type: 'transcript.interim'; text: string; words?: WsWordMetric[] }
  | { type: 'transcript.final'; text: string; words?: WsWordMetric[]; metrics?: WsTurnMetrics }
  | { type: 'correction'; data: WsCorrectionData }
  | { type: 'fluency_score'; value: number }
  | { type: 'reply.sentence'; text: string }
  | { type: 'turn.complete'; user_text: string; assistant_text: string }
  | { type: 'scene.complete'; summary_tr: string | null }
  | { type: 'session.time_limit_reached' }
  | { type: 'error'; message: string };

export type WsClientMessage = { type: 'end_session' };
