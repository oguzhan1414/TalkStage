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
  | {
      type: 'reply.sentence';
      text: string;
      speaker?: 'teacher' | 'character';
      language?: 'tr' | 'en';
    }
  | {
      type: 'turn.complete';
      user_text: string;
      assistant_text: string;
      suggested_replies?: string[];
      // Proactive, A1/A2-only Turkish coaching hint pointing at the next
      // concrete thing to try saying — unlike `correction`, this isn't
      // reactive to a mistake. Null/absent at B1 and above by design.
      coach_tip_tr?: string | null;
    }
  | { type: 'scene.complete'; summary_tr: string | null }
  | { type: 'session.ready'; teacher_mode?: boolean; cefr_level?: string | null }
  | { type: 'session.time_limit_reached' }
  | { type: 'error'; code: string; message: string; retryable: boolean };

export type WsClientMessage =
  | { type: 'auth'; access_token: string }
  | { type: 'end_session' }
  // Push-to-talk: sent when the user taps "Konuşmayı Bitir" — forces
  // Deepgram to finalize the current utterance immediately instead of
  // waiting on silence-based endpointing.
  | { type: 'end_turn' }
  // Sent only after the user reviews (and optionally edits) the transcript
  // confirmation card — this is what actually triggers the AI turn now,
  // not the raw speech_final transcript event.
  | { type: 'confirm_turn'; text: string };

/** UI-only turn shape used by `useConversationSocket`'s `turns` + the chat
 * bubble transcript — a user turn carries whatever `correction` arrived for
 * it, so the bubble it belongs to can show it inline. Distinct from
 * `TranscriptTurn` (types/api.ts), which is the plain `{role, text}` wire
 * shape `POST /sessions/end` expects — map down to that before sending. */
export type ConversationTurn = {
  role: 'user' | 'assistant';
  text: string;
  correction?: WsCorrectionData | null;
};
