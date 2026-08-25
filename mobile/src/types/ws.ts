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

export type WsServerMessage =
  | { type: 'transcript.interim'; text: string }
  | { type: 'transcript.final'; text: string }
  | { type: 'correction'; data: WsCorrectionData }
  | { type: 'fluency_score'; value: number }
  | { type: 'reply.sentence'; text: string }
  | { type: 'turn.complete'; user_text: string; assistant_text: string }
  | { type: 'session.time_limit_reached' }
  | { type: 'error'; message: string };

export type WsClientMessage = { type: 'end_session' };
