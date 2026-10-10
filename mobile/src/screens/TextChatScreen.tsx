import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { File } from 'expo-file-system';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { mivoImages } from '../assets/images';
import { TappableWords } from '../components/TappableWords';
import { Waveform } from '../components/Waveform';
import { Toast } from '../components/Toast';
import { useMivoTransition } from '../components/MivoTransitionOverlay';
import { useAuth } from '../context/AuthContext';
import { pickDailyTopics, type ConversationTopic } from '../data/conversationTopics';
import { usePronunciation } from '../hooks/usePronunciation';
import { useVoiceRecorder } from '../hooks/useVoiceRecorder';
import { api, ApiError } from '../lib/api';
import { setLearningFlag } from '../lib/learningFlags';
import { useTrackScreenView } from '../lib/analytics';
import { colors, fonts, radii, spacing } from '../theme/tokens';
import type {
  ChatCorrection,
  ChatMemory,
  ChatMessageResponse,
  ChatTurn,
  ProfileOut,
  TranscribeResponse,
  VocabCardCreate,
} from '../types/api';
import type { TextChatScreenProps } from '../navigation/types';
import { getLocale, LOCALE_META, t, nativeFlag } from '../i18n';

type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  trHint?: string;
  correction?: ChatCorrection;
  // "No audio detected" turns — shown in the thread but never sent to the
  // backend (excluded from `history`), just a visual retry prompt.
  isError?: boolean;
};

const MAX_RECORDING_MS = 25_000;

let idCounter = 0;
const nextId = () => `msg_${idCounter++}`;

const DEFAULT_OPENING_MESSAGE: ChatMessage = {
  id: 'opening',
  role: 'assistant',
  text: t("Merhaba! Ben Mivo, senin İngilizce koçunum 👋 Bugün hangi konu hakkında konuşmak veya pratik yapmak istersin? Mesela kafede kahve siparişi verme ya da sokakta adres sorma gibi harika konular var! Aşağıdan birini seçebilir veya aklından geçeni söyleyebilirsin, hemen başlayalım!"),
  trHint: t("Hi! I'm Mivo, your English coach 👋 What would you like to practice today?"),
};

/** `titleTr` is formatted as "Bugünün Konusu: X" for the chat header's
 * subtitle — strips that prefix down to a short noun phrase usable inline
 * in a suggestion list (e.g. "Hafta Sonu Planların"). */
function topicSuggestionLabel(topic: ConversationTopic): string {
  return topic.titleTr.replace(/^Bugünün Konusu:\s*/, '');
}

/** Turkish Teacher Mode's opener — warmly welcomes the student in Turkish,
 * gives rotating real-life scenario choices (coffee ordering, asking directions,
 * hotel, airport, etc.) that excite the learner. */
function buildFreeChatOpeningMessage(topics: ConversationTopic[]): ChatMessage {
  const labels = topics.map(topicSuggestionLabel);
  const listTr =
    labels.length > 1
      ? `${labels.slice(0, -1).join(', ')} veya ${labels[labels.length - 1]}`
      : (labels[0] ?? t("Kafede sipariş verme"));
  return {
    id: 'opening',
    role: 'assistant',
    text: t("Merhaba! Ben Mivo, senin İngilizce koçunum 👋 Bugün hangi konu hakkında konuşmak veya pratik yapmak istersin? Mesela {{listTr}} gibi harika konular hazırladım! Aşağıdan birini seçebilir veya aklından geçeni söyleyebilirsin, hemen başlayalım!", { listTr }),
    trHint: t("Hi! I'm Mivo, your English coach 👋 What would you like to practice today?"),
  };
}

/** Returning free-chat user: welcome back and offer to pick up the last topic. */
function buildReturningOpeningMessage(name: string | null | undefined, lastTopic: string): ChatMessage {
  const first = (name ?? '').trim().split(' ')[0];
  return {
    id: 'opening',
    role: 'assistant',
    text: first
      ? t("Tekrar hoş geldin, {{name}}! Geçen sefer {{topic}} hakkında konuşmuştuk. İstersen oradan devam edelim, istersen yeni bir konu seç — ya da ben seçeyim mi?", { name: first, topic: lastTopic })
      : t("Tekrar hoş geldin! Geçen sefer {{topic}} hakkında konuşmuştuk. İstersen oradan devam edelim, istersen yeni bir konu seç — ya da ben seçeyim mi?", { topic: lastTopic }),
    trHint: t("Welcome back! Shall we continue where we left off, or try something new?"),
  };
}

function buildDailyTaskOpeningMessage(dailyTask: {
  openingEn: string;
  openingTr: string;
}): ChatMessage {
  return { id: 'opening', role: 'assistant', text: dailyTask.openingEn, trHint: dailyTask.openingTr };
}

/** Sent as `role_context` on every turn (stateless backend, nothing persists)
 * so Groq's system prompt actually adopts the character instead of just
 * showing a roleplay-flavored opening line the model has no obligation to
 * honor once the conversation moves on. */
function buildRoleContext(dailyTask: {
  roleName: string;
  roleBio: string;
  scenario: string;
  goals: string[];
}): string {
  return `You are playing "${dailyTask.roleName}" — ${dailyTask.roleBio} Scenario: ${dailyTask.scenario} Naturally guide the user toward these goals during the chat: ${dailyTask.goals.join('; ')}.`;
}

/** Sent as `role_context` for a real grammar-topic practice chat (Seviye Yol
 * Haritası → "💬 Sohbette Pratik Yap"), reusing the exact same backend
 * mechanism as Study Path missions (see `text_chat.py`'s turn-cap logic) —
 * this is what makes `is_completed` a real, deterministic signal instead of
 * never firing. Deliberately `undefined` when there's no `formula` (the
 * level's free-form boss challenge), which stays an untracked, unlimited
 * evaluation chat rather than a topic to "complete".
 *
 * For true beginners (A1/A2) this also asks for an explicit teacher-style
 * flow instead of dropping someone who's never seen the structure before
 * into an open "tell me something" and leaving them to freeze up (2026-10
 * feedback: a blank prompt is just as intimidating as an English-only one —
 * give a concrete, varying micro-prompt every turn instead, but don't let
 * the whole practice resolve in a single exchange). Also bans the kind of
 * software/tech jargon the curriculum's own written examples lean on too
 * heavily (PostgreSQL, APIs, deployments, …) from the model's OWN live
 * prompts — this is separate from (and doesn't fix) that written content,
 * just keeps the live conversation itself universally approachable. Free
 * chat (`topic_context`, no `role_context` at all) is deliberately left
 * alone — that one's supposed to feel like an open conversation. */
function buildFocusRoleContext(
  focusTopic: { title: string; formula?: string },
  isBeginner: boolean
): string | undefined {
  if (!focusTopic.formula) return undefined;
  const base = `Help the user practice the grammar structure "${focusTopic.title}" (formula: ${focusTopic.formula}). Guide them to build 2-3 correct example sentences using this structure over the course of the chat, gently correcting mistakes. Keep it encouraging and conversational, not a rigid quiz. Use only everyday, universally familiar topics (food, weather, family, cities, animals, prices, hobbies, daily routines) — never software/technical jargon (no databases, APIs, programming languages, servers, deployments, etc.), since not every learner has a tech background.`;
  if (!isBeginner) return base;
  const lang = LOCALE_META[getLocale()].englishName;
  return `${base} TEACHER MODE: this is a true beginner who may not know what's expected — don't assume an English-only exchange makes sense to them yet, and never just say "tell me something" or ask a bare open question — that's as paralyzing as a wall of English for someone who doesn't know what to say. Instead, each turn give a CONCRETE, specific micro-prompt: name a simple everyday scenario or 1-2 concrete things (e.g. "compare two dishes: pizza and pasta" instead of "tell me something"), explained in ${lang} first, then your English example. Vary the scenario every turn so it doesn't feel like refilling the same blank — this should still take the full conversation to practice properly, not resolve in one exchange. When you correct a mistake, explain why in ${lang} too, not just the corrected English — be a patient teacher sitting next to them, not a native speaker expecting fluent replies back.`;
}

/** Builds a topic-specific opening line so the conversation naturally steers
 * toward practicing that grammar structure (Groq sees this as the first
 * `history` turn on every later request, so it keeps following the thread).
 * For beginners this leads with Turkish instead of a wall of English as the
 * very first thing the user sees in the chat — see `buildFocusRoleContext`'s
 * doc comment for why. */
function buildFocusOpeningMessage(
  focusTopic: { title: string; formula?: string; targetWords?: string[] },
  isBeginner: boolean
): ChatMessage {
  if (focusTopic.formula) {
    const wordsHint = focusTopic.targetWords?.length
      ? ` Try to use a word like "${focusTopic.targetWords[0]}" if you can.`
      : '';
    if (isBeginner) {
      // A bare "tell me something" is just as paralyzing for a beginner as
      // an English-only prompt — give a concrete starting point instead of
      // an empty page. targetWords (when present) at least grounds it in
      // something specific; the LLM takes over with topic-aware concrete
      // prompts from the next turn on (see buildFocusRoleContext).
      const starterHint = focusTopic.targetWords?.length
        ? t(" Örneğin şu kelimelerden birini kullanarak bir cümle kurmayı dene: \"{{p0}}\".", { p0: focusTopic.targetWords.slice(0, 2).join('", "') })
        : '';
      return {
        id: 'opening',
        role: 'assistant',
        text: t("Merhaba! Bugün \"{{title}}\" konusunu birlikte pekiştireceğiz ({{formula}}).{{starterHint}} Hatalarını nazikçe düzelteceğim, hazır olduğunda başlayalım.\n\nHi! Ready? Let's build a sentence together.", { title: focusTopic.title, formula: focusTopic.formula, starterHint }),
      };
    }
    return {
      id: 'opening',
      role: 'assistant',
      text: t("Hi! Let's practice \"{{title}}\" ({{formula}}) today. Tell me something using this structure — I'll help if you get stuck.{{wordsHint}}", { title: focusTopic.title, formula: focusTopic.formula, wordsHint }),
      trHint: t("Merhaba! Bugün \"{{title}}\" konusunu pratik yapalım. Bu yapıyı kullanarak bana bir şey anlat — takılırsan yardım ederim.", { title: focusTopic.title }),
    };
  }
  // No formula means this is a level-up boss challenge, not a single grammar
  // point — invite a free-form conversation instead of naming a "structure".
  return {
    id: 'opening',
    role: 'assistant',
    text: t("Hi! This is your \"{{title}}\". Let's have a natural conversation so I can see how well you express yourself in English — go ahead and tell me anything.", { title: focusTopic.title }),
    trHint: t("Merhaba! Bu senin \"{{title}}\" değerlendirmen. Kendini İngilizce nasıl ifade ettiğini görmek için doğal bir sohbet edelim — bana istediğin bir şeyi anlat.", { title: focusTopic.title }),
  };
}

/**
 * Low-pressure conversation practice (as opposed to the scenario-driven,
 * push-to-talk LiveConversationRoom) — now voice-first: tap the mic, speak
 * a turn at your own pace, release to transcribe (`POST /chat/transcribe`)
 * and send, with the keyboard kept as an explicit fallback toggle for anyone
 * who'd rather type. Stateless on the backend: this screen keeps the whole
 * conversation in local state and resends it each turn (`POST /chat/message`),
 * so closing the screen loses the conversation — intentional for a v1,
 * matches how little else in this app persists in-progress state either.
 */
export function TextChatScreen({ navigation, route }: TextChatScreenProps) {
  const { finishTransition } = useMivoTransition();
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const focusTopic = route.params?.focusTopic;
  const dailyTask = route.params?.dailyTask;
  const isFreeChat = !dailyTask && !focusTopic;
  // `topicCode` is "{LEVEL}_G0X" (e.g. "A2_G01") for every real grammar
  // topic — derives the actual level instead of a stale hardcoded one.
  // Boss challenges pass no topicCode at all, hence the fallback.
  const focusTopicLevel = focusTopic?.topicCode?.split('_')[0];
  const isFocusTopicBeginner = focusTopicLevel === 'A1' || focusTopicLevel === 'A2';
  useTrackScreenView('text_chat_started', {
    mode: dailyTask ? 'daily_task' : focusTopic ? 'focus_topic' : 'free',
  });

  // Free chat used to always open with one fixed generic greeting and never
  // suggest what to talk about — a real "blank page" problem. A deterministic
  // per-user-per-day topic (same pattern GET /scenarios/recommended already
  // uses) gives the user something concrete to respond to instead.
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['me'],
    queryFn: () => api.get<ProfileOut>('/me'),
    enabled: isFreeChat,
  });
  const { data: memory, isLoading: memoryLoading } = useQuery({
    queryKey: ['chat-memory'],
    queryFn: () => api.get<ChatMemory>('/memory'),
    enabled: isFreeChat,
    // Hafıza okunamazsa (ör. migration yok) sohbet yine de normal açılsın.
    retry: false,
  });
  // A topic title written in another language ("Restoranda Sipariş Verme" in an English greeting) is
  // never shown: the backend translates the memory to the user's language, and until that has happened
  // (or if it failed) the generic opening is used instead.
  const lastTopic = memory?.lang === getLocale() ? memory?.topics?.[0]?.topic : undefined;
  const [rerollSeed, setRerollSeed] = useState(0);
  const todaysTopics = useMemo(() => {
    // Wait for the real level/persona before picking — otherwise this would
    // briefly pick a "beginner, no persona" set and then swap the moment the
    // profile loads, flashing the opening question right after open.
    if (!isFreeChat || !session?.user?.id || profileLoading || memoryLoading) return [];
    return pickDailyTopics(session.user.id, profile?.cefr_level, profile?.persona_id, rerollSeed, 3);
  }, [isFreeChat, session?.user?.id, profileLoading, memoryLoading, profile?.cefr_level, profile?.persona_id, rerollSeed]);
  // Sent as `topic_context` (one concrete anchor the backend's Turkish Tutor
  // Mode can offer among the others) and used for the header subtitle — the
  // full `todaysTopics` list is what actually renders in the opener text.
  const todaysTopic = todaysTopics[0];

  useEffect(() => {
    if (!isFreeChat || !(profileLoading || memoryLoading)) finishTransition();
  }, [finishTransition, isFreeChat, profileLoading, memoryLoading]);

  const [messages, setMessages] = useState<ChatMessage[]>([
    dailyTask
      ? buildDailyTaskOpeningMessage(dailyTask)
      : focusTopic
        ? buildFocusOpeningMessage(focusTopic, isFocusTopicBeginner)
        : DEFAULT_OPENING_MESSAGE,
  ]);
  const [inputText, setInputText] = useState('');
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [completionSummary, setCompletionSummary] = useState<string | null>(null);
  const [progressSaved, setProgressSaved] = useState(false);
  const [suggestedReplies, setSuggestedReplies] = useState<string[]>([]);
  const [suggestedRepliesTr, setSuggestedRepliesTr] = useState<string[]>([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [hintCardVisible, setHintCardVisible] = useState(true);
  const [inputMode, setInputMode] = useState<'voice' | 'keyboard'>('voice');
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [revealedTranslationIds, setRevealedTranslationIds] = useState<Set<string>>(new Set());
  const practiceLoggedRef = useRef(false);
  const scrollRef = useRef<ScrollView>(null);
  const maxDurationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { pronounce, stop: stopPronounce, toggle: toggleSpeech, isPlaying: isTtsPlaying } = usePronunciation();
  const { isRecording, meteringDb, permissionDenied, start: startRecording, stop: stopRecording } = useVoiceRecorder();
  const hasAutoPlayedRef = useRef(false);

  // Free chats feed Mivo's memory: when the screen is left (any way — back
  // button, swipe, hardware back) send the conversation once, fire-and-forget.
  // The backend skips conversations with fewer than 2 user turns.
  const messagesRef = useRef<ChatMessage[]>([]);
  messagesRef.current = messages;
  const memorySentRef = useRef(false);
  useEffect(() => {
    if (!isFreeChat) return;
    return navigation.addListener('beforeRemove', () => {
      if (memorySentRef.current) return;
      const turns = messagesRef.current
        .filter((m) => !m.isError && m.id !== 'opening')
        .map((m) => ({ role: m.role, content: m.text }));
      if (turns.filter((t) => t.role === 'user').length < 2) return;
      memorySentRef.current = true;
      api
        .post('/memory/update', { history: turns.slice(-40) })
        .then(() => queryClient.invalidateQueries({ queryKey: ['chat-memory'] }))
        .catch(() => undefined);
    });
  }, [isFreeChat, navigation, queryClient]);

  useEffect(() => {
    return () => {
      stopPronounce();
      if (maxDurationTimerRef.current) clearTimeout(maxDurationTimerRef.current);
    };
  }, [stopPronounce]);

  // Swaps the generic opener for the real "ne konuşmak istersin" suggestion
  // list once it's known (profile query resolves), and again whenever
  // "Başka Konu" rerolls it.
  useEffect(() => {
    if (todaysTopics.length > 0) {
      setMessages((current) => {
        if (current.some((message) => message.role === 'user')) return current;
        return [
          lastTopic
            ? buildReturningOpeningMessage(profile?.display_name, lastTopic)
            : buildFreeChatOpeningMessage(todaysTopics),
        ];
      });
    }
  }, [todaysTopics, lastTopic, profile?.display_name]);

  // Autoplay Mivo's opening greeting in Cartesia voice when the screen opens (same as live rooms!)
  useEffect(() => {
    // If free chat, wait until topics are populated so we play the real finalized opener
    if (isFreeChat && todaysTopics.length === 0) return;
    if (hasAutoPlayedRef.current) return;

    const openingMsg = messages.find((m) => m.id === 'opening');
    if (!openingMsg?.text) return;

    hasAutoPlayedRef.current = true;
    const timer = setTimeout(() => {
      pronounce(openingMsg.text);
    }, 500);

    return () => clearTimeout(timer);
  }, [messages, isFreeChat, todaysTopics.length, pronounce]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1600);
  };

  const scrollToEnd = () => {
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 50);
  };

  const handleTopicSelect = (topic: ConversationTopic) => {
    stopPronounce();
    const label = topic.titleTr.replace(/^Bugünün Konusu:\s*/, '');
    handleSend(t("{{label}} hakkında pratik yapmak istiyorum.", { label }));
  };

  const handleSend = async (overrideText?: string) => {
    stopPronounce();
    const text = (overrideText ?? inputText).trim();
    if (!text || sending || isCompleted) return;

    // The generic default opener is just a canned greeting Groq never
    // generated, so it's excluded from context. The focus-topic/daily-task/
    // daily-topic openers are different — they're the only place the grammar
    // target or opening question is stated, so they must stay in history.
    // Error ("no audio detected") turns never made it to the backend, so
    // they're excluded too.
    const history: ChatTurn[] = messages
      .filter((m) => !m.isError)
      .filter((m) => m.id !== 'opening' || Boolean(focusTopic) || Boolean(dailyTask) || Boolean(todaysTopic))
      .map((m) => ({ role: m.role, content: m.text }));

    const userMsg: ChatMessage = { id: nextId(), role: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setSending(true);
    setSuggestedReplies([]);
    setSuggestedRepliesTr([]);
    setSuggestionIndex(0);
    scrollToEnd();

    const focusRoleContext = focusTopic
      ? buildFocusRoleContext(focusTopic, isFocusTopicBeginner)
      : undefined;
    // A Study Path daily task or a real grammar-topic practice chat (one with
    // a formula, i.e. not the free-form boss challenge) counts as "real
    // practice today" — the free Günlük Sohbet entry and the boss challenge
    // evaluation chat stay low-stakes/untracked.
    try {
      const response = await api.post<ChatMessageResponse>('/chat/message', {
        history,
        message: text,
        role_context: dailyTask ? buildRoleContext(dailyTask) : focusRoleContext,
        topic_code: dailyTask?.topicCode ?? focusTopic?.topicCode,
        topic_context: todaysTopic?.topicContext,
      } satisfies {
        history: ChatTurn[];
        message: string;
        role_context?: string;
        topic_code?: string;
        topic_context?: string;
      });

      setMessages((prev) => [
        ...prev.map((m) => (m.id === userMsg.id ? { ...m, correction: response.correction } : m)),
        {
          id: nextId(),
          role: 'assistant',
          text: response.reply_en,
          trHint: response.reply_tr_hint,
        },
      ]);
      setSuggestedReplies(response.suggested_replies ?? []);
      setSuggestedRepliesTr(response.suggested_replies_tr ?? []);

      if (response.is_completed) {
        if ((dailyTask || focusRoleContext) && !practiceLoggedRef.current) {
          practiceLoggedRef.current = true;
          api
            .post('/progress/log-practice')
            .then(() => {
              setProgressSaved(true);
              queryClient.invalidateQueries({ queryKey: ['me'] });
              queryClient.invalidateQueries({ queryKey: ['progress'] });
            })
            .catch(() => {
              practiceLoggedRef.current = false;
              showToast(t("Görev tamamlandı ancak ilerleme kaydedilemedi."));
            });
        }
        setIsCompleted(true);
        setCompletionSummary(response.completion_summary_tr ?? t("Tebrikler! Bu sohbet görevini başarıyla tamamladın."));
        // Durable "this is done" records for other screens to read back
        // (local-only, like onboarding's completion flag elsewhere in this
        // app — the real XP/streak reward already happened via log-practice
        // above, this is just UI bookkeeping for which nodes show as
        // unlocked/checked next time the relevant map is opened).
        if (dailyTask) {
          setLearningFlag(`mission_completed_${dailyTask.id}`);
          if (dailyTask.topicCode) {
            setLearningFlag(`topic_chat_completed_${dailyTask.topicCode}`);
          }
        }
        if (focusRoleContext && focusTopic?.topicCode) {
          setLearningFlag(`topic_chat_completed_${focusTopic.topicCode}`);
        }
      }
    } catch (err) {
      setMessages((prev) => prev.filter((message) => message.id !== userMsg.id));
      setInputText(text);
      showToast(
        err instanceof ApiError
          ? err.message
          : t("Mesaj gönderilemedi, internet bağlantını kontrol et")
      );
    } finally {
      setSending(false);
      scrollToEnd();
    }
  };

  /** Stops the current recording (whether triggered by a tap or the max-
   * duration safety timer), transcribes it via `POST /chat/transcribe`, and
   * either sends the result through the normal `handleSend` flow or shows a
   * "no audio detected" turn with a retry affordance. Deliberately doesn't
   * branch on `isRecording` itself (that's `handleMicPress`'s job) so it's
   * safe to call directly from a timer closure without worrying about stale
   * state. */
  const finishRecording = async () => {
    if (maxDurationTimerRef.current) {
      clearTimeout(maxDurationTimerRef.current);
      maxDurationTimerRef.current = null;
    }
    const uri = await stopRecording();
    if (!uri) return;

    setIsTranscribing(true);
    try {
      const form = new FormData();
      form.append('audio', new File(uri));
      const { transcript } = await api.postForm<TranscribeResponse>('/chat/transcribe', form);
      if (!transcript.trim()) {
        setMessages((prev) => [
          ...prev,
          { id: nextId(), role: 'user', text: t("Ses algılanamadı"), isError: true },
        ]);
        scrollToEnd();
      } else {
        await handleSend(transcript);
      }
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : t("Ses yazıya çevrilemedi"));
    } finally {
      setIsTranscribing(false);
    }
  };

  const handleMicPress = async () => {
    if (sending || isCompleted || isTranscribing) return;
    if (isRecording) {
      await finishRecording();
      return;
    }
    const started = await startRecording();
    if (started) {
      maxDurationTimerRef.current = setTimeout(() => {
        finishRecording();
      }, MAX_RECORDING_MS);
    } else if (permissionDenied) {
      showToast(t("Mikrofon izni reddedildi — ayarlardan açabilirsin."));
    }
  };

  const handleWordTap = async (word: string, sentence: string) => {
    try {
      const payload: VocabCardCreate = {
        term: word,
        example_sentence: sentence,
        source_label: dailyTask ? t("{{title}} (Görev)", { title: dailyTask.title }) : t("Günlük Sohbet (Yazarak)"),
      };
      await api.post('/vocab-cards', payload);
      queryClient.invalidateQueries({ queryKey: ['vocab-cards'] });
      showToast(t("\"{{word}}\" kelime sandığına eklendi 📚", { word }));
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : t("Kelime kaydedilemedi"));
    }
  };

  // Error ("no audio detected") turns are visual-only, never actually sent —
  // they must not count as a real user turn (would wrongly advance the
  // 3-step daily-task tracker or disable "Başka Konu" before any real reply).
  const userTurnsCount = messages.filter((m) => m.role === 'user' && !m.isError).length;
  const chatReady = !isFreeChat || !profileLoading;
  const currentStep = Math.min(3, userTurnsCount + 1);
  // "Başka Konu" only makes sense before the user has actually replied —
  // rerolling mid-conversation would erase a real exchange.
  const canRerollTopic = isFreeChat && userTurnsCount === 0;

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Navigation Header */}
      <View style={styles.header}>
        <Pressable onPress={() => { stopPronounce(); navigation.goBack(); }} hitSlop={12}>
          <Ionicons name="chevron-back" size={24} color={colors.textHeading} />
        </Pressable>
        <View style={styles.headerCenter}>
          <Image
            source={isTtsPlaying ? mivoImages.speaking : mivoImages.idle}
            style={styles.headerAvatar}
            resizeMode="contain"
          />
          <View style={styles.headerTextCol}>
            <Text style={styles.headerTitle} numberOfLines={1}>
              {dailyTask ? dailyTask.roleName : focusTopic ? focusTopic.title : t("Mivo · İngilizce Koçu 🎓")}
            </Text>
            <Text style={styles.headerSub} numberOfLines={1}>
              {isTtsPlaying
                ? t("🎙️ Mivo konuşuyor…")
                : dailyTask
                  ? dailyTask.title
                  : focusTopic
                    ? focusTopicLevel ? t("{{level}} İnteraktif Pratik ✍️", { level: focusTopicLevel }) : t("İnteraktif Pratik ✍️")
                    : (todaysTopic?.titleTr ?? t("Serbest Pratik"))}
            </Text>
          </View>
        </View>
        {canRerollTopic ? (
          <Pressable
            onPress={() => {
              stopPronounce();
              hasAutoPlayedRef.current = false;
              setRerollSeed((s) => s + 1);
            }}
            hitSlop={12}
          >
            <Ionicons name="refresh" size={20} color={colors.textMuted} />
          </Pressable>
        ) : (
          <View style={styles.headerSpacer} />
        )}
      </View>

      {/* 3-Step Micro Mission Progress Tracker — explicitly labeled as this
          one task's own steps (not a persistent path/map) so it doesn't
          read as a second "Öğrenme Yolu" competing with the Harita tab. */}
      {dailyTask && (
        <View style={styles.stepProgressContainer}>
          <Text style={styles.stepProgressEyebrow}>{t("BU GÖREVİN ADIMLARI")}</Text>
          <View style={styles.stepProgressBarsRow}>
            <View style={[styles.stepBar, currentStep >= 1 && styles.stepBarActive, currentStep > 1 && styles.stepBarDone]} />
            <View style={[styles.stepBar, currentStep >= 2 && styles.stepBarActive, currentStep > 2 && styles.stepBarDone]} />
            <View style={[styles.stepBar, isCompleted && styles.stepBarDone]} />
          </View>
          <View style={styles.stepProgressLabelsRow}>
            <Text style={styles.stepProgressText}>
              {isCompleted
                ? t("✓ Görev Tamamlandı!")
                : t("🎯 Adım {{currentStep}}/3: {{stepLabel}}", {
                    currentStep,
                    stepLabel:
                      currentStep === 1
                        ? t("Selamlaş & Kendini Tanıt")
                        : currentStep === 2
                          ? t("Cevap Ver & Soruyu Yanıtla")
                          : t("Vedalaş & Görevi Bitir"),
                  })}
            </Text>
          </View>
        </View>
      )}

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={styles.messagesContent}
          onContentSizeChange={scrollToEnd}
        >
          {messages.map((msg) => {
            if (msg.isError) {
              // Not something the user said — a neutral system notice with a retry.
              return (
                <View key={msg.id} style={styles.noticeRow}>
                  <Pressable onPress={handleMicPress} hitSlop={10} style={styles.noticePill}>
                    <Ionicons name="mic-off-outline" size={14} color={colors.textMuted} />
                    <Text style={styles.noticeText}>{msg.text}</Text>
                    <Ionicons name="refresh" size={14} color={colors.brand} />
                  </Pressable>
                </View>
              );
            }

            const translationRevealed = revealedTranslationIds.has(msg.id);

            return (
              <View
                key={msg.id}
                style={[styles.messageRow, msg.role === 'user' && styles.messageRowUser]}
              >
                {msg.role === 'assistant' ? (
                  <Image
                    source={isTtsPlaying ? mivoImages.speaking : mivoImages.idle}
                    style={styles.bubbleAvatar}
                    resizeMode="contain"
                  />
                ) : null}

                <View style={styles.bubbleCol}>
                  <View
                    style={[
                      styles.bubble,
                      msg.role === 'user' ? styles.bubbleUser : styles.bubbleAssistant,
                    ]}
                  >
                    {msg.role === 'assistant' ? (
                      <TappableWords
                        text={msg.text}
                        onWordPress={(word) => handleWordTap(word, msg.text)}
                        textStyle={styles.bubbleTextAssistant}
                      />
                    ) : (
                      <Text style={styles.bubbleTextUser}>{msg.text}</Text>
                    )}

                    {msg.role === 'assistant' ? (
                      <View style={styles.bubbleIconsRow}>
                        <Pressable
                          onPress={() => toggleSpeech(msg.text)}
                          hitSlop={8}
                          style={styles.bubbleIconBtn}
                        >
                          <Ionicons
                            name={isTtsPlaying ? 'volume-high' : 'volume-medium-outline'}
                            size={16}
                            color={isTtsPlaying ? colors.brand : colors.textMuted}
                          />
                        </Pressable>
                        {msg.trHint ? (
                          <Pressable
                            onPress={() =>
                              setRevealedTranslationIds((prev) => {
                                const next = new Set(prev);
                                if (next.has(msg.id)) next.delete(msg.id);
                                else next.add(msg.id);
                                return next;
                              })
                            }
                            hitSlop={8}
                            style={styles.bubbleIconBtn}
                          >
                            <Ionicons name="language-outline" size={14} color={colors.textMuted} />
                          </Pressable>
                        ) : null}
                      </View>
                    ) : null}
                  </View>

                  {/* Interactive Quick Topic Option Chips directly under Mivo's opening greeting */}
                  {msg.id === 'opening' && isFreeChat && userTurnsCount === 0 && todaysTopics.length > 0 && (
                    <View style={styles.topicOptionsWrapper}>
                      <View style={styles.topicOptionsHeaderRow}>
                        <Ionicons name="sparkles" size={13} color="#D97706" />
                        <Text style={styles.topicOptionsTitle}>{t("Hızlıca bir konu seçip başlayalım 👇")}</Text>
                      </View>
                      <View style={styles.topicChipsList}>
                        {lastTopic ? (
                          <Pressable
                            style={({ pressed }) => [styles.topicOptionCard, pressed && styles.topicOptionCardPressed]}
                            onPress={() => {
                              stopPronounce();
                              handleSend(t("{{topic}} konusuna devam edelim.", { topic: lastTopic }));
                            }}
                          >
                            <Text style={styles.topicOptionCardText}>{t("↩️ Geçen konuya devam: {{topic}}", { topic: lastTopic })}</Text>
                            <View style={styles.topicOptionCardArrow}>
                              <Ionicons name="arrow-forward" size={13} color={colors.brand} />
                            </View>
                          </Pressable>
                        ) : null}
                        {todaysTopics.map((topic) => {
                          const label = topic.titleTr.replace(/^Bugünün Konusu:\s*/, '');
                          return (
                            <Pressable
                              key={topic.id}
                              style={({ pressed }) => [
                                styles.topicOptionCard,
                                pressed && styles.topicOptionCardPressed,
                              ]}
                              onPress={() => handleTopicSelect(topic)}
                            >
                              <Text style={styles.topicOptionCardText}>{label}</Text>
                              <View style={styles.topicOptionCardArrow}>
                                <Ionicons name="arrow-forward" size={13} color={colors.brand} />
                              </View>
                            </Pressable>
                          );
                        })}
                      </View>
                    </View>
                  )}

                  {msg.trHint && translationRevealed ? (
                    <Text style={styles.trHintText}>{nativeFlag()} {msg.trHint}</Text>
                  ) : null}

                  {msg.correction?.has_error ? (
                    <View style={styles.correctionCard}>
                      <Text style={styles.correctionLabel}>{t("💡 Şöyle demek daha doğru:")}</Text>
                      <Text style={styles.correctionText}>{msg.correction.corrected}</Text>
                      {msg.correction.explanation_tr ? (
                        <Text style={styles.correctionExplanation}>
                          {msg.correction.explanation_tr}
                        </Text>
                      ) : null}
                    </View>
                  ) : null}
                </View>
              </View>
            );
          })}

          {sending ? (
            <View style={styles.messageRow}>
              <Image source={mivoImages.idle} style={styles.bubbleAvatar} resizeMode="contain" />
              <View style={[styles.bubble, styles.bubbleAssistant, styles.typingBubble]}>
                <Text style={styles.typingText}>{t("Mivo düşünüyor…")}</Text>
              </View>
            </View>
          ) : null}
        </ScrollView>

        {isCompleted ? (
          <View style={styles.completionBanner}>
            <View style={styles.completionHeaderRow}>
              <Text style={styles.completionTitle}>{t("🎉 Görev Tamamlandı!")}</Text>
              {dailyTask && progressSaved ? (
                <Text style={styles.completionBadge}>{t("Gerçek XP kazandın ⚡")}</Text>
              ) : null}
            </View>
            <Text style={styles.completionSub}>{completionSummary}</Text>
            <Pressable onPress={() => navigation.goBack()} style={styles.completionBtn}>
              <Text style={styles.completionBtnText}>{t("Haritaya Dön & Sonraki Görevi Aç ➔")}</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.inputContainer}>
            {/* "Söylemeyi dene" — the top suggested reply (fresh every turn
                from the AI's own last question, see backend's
                `suggested_replies`/`suggested_replies_tr`) as a concrete,
                translated example to say out loud — not auto-filled into the
                input anymore, since input is voice-first now. */}
            {hintCardVisible && suggestedReplies.length > 0 ? (
              <View style={styles.suggestionCard}>
                <View style={styles.suggestionCardHeaderRow}>
                  <Ionicons name="sparkles" size={13} color="#D97706" />
                  <Text style={styles.suggestionCardHeaderText}>{t("Söylemeyi dene")}</Text>
                  {suggestedReplies.length > 1 ? (
                    <Pressable
                      onPress={() => setSuggestionIndex((i) => (i + 1) % suggestedReplies.length)}
                      hitSlop={8}
                    >
                      <Text style={styles.suggestionCardCycleText}>{t("→ başka örnek")}</Text>
                    </Pressable>
                  ) : null}
                </View>
                <Text style={styles.suggestionCardSentence}>{suggestedReplies[suggestionIndex]}</Text>
                {suggestedRepliesTr[suggestionIndex] ? (
                  <Text style={styles.suggestionCardTranslation}>
                    {suggestedRepliesTr[suggestionIndex]}
                  </Text>
                ) : null}
                <Pressable
                  onPress={() => toggleSpeech(suggestedReplies[suggestionIndex])}
                  style={styles.suggestionCardListenBtn}
                >
                  <Ionicons
                    name={isTtsPlaying ? 'volume-high' : 'headset-outline'}
                    size={13}
                    color={colors.brand}
                  />
                  <Text style={styles.suggestionCardListenText}>{t("Dinle")}</Text>
                </Pressable>
              </View>
            ) : null}

            {inputMode === 'voice' && isRecording ? (
              <View style={styles.voiceWave}>
                <Waveform meteringDb={meteringDb} active />
              </View>
            ) : null}

            {inputMode === 'voice' ? (
              <View style={styles.voiceBar}>
                <Pressable
                  onPress={() => setHintCardVisible((v) => !v)}
                  hitSlop={10}
                  style={styles.voiceBarSideBtn}
                  disabled={suggestedReplies.length === 0}
                >
                  <Ionicons
                    name={hintCardVisible ? 'bulb' : 'bulb-outline'}
                    size={20}
                    color={suggestedReplies.length === 0 ? '#CBD5E1' : '#D97706'}
                  />
                </Pressable>

                <Pressable
                  onPress={handleMicPress}
                  disabled={!chatReady || sending || isCompleted}
                  style={[
                    styles.micButton,
                    isRecording && styles.micButtonRecording,
                    (!chatReady || sending || isTranscribing) && styles.micButtonDisabled,
                  ]}
                >
                  {isTranscribing ? (
                    <Ionicons name="hourglass-outline" size={26} color="#FFFFFF" />
                  ) : (
                    <Ionicons name={isRecording ? 'stop' : 'mic'} size={28} color="#FFFFFF" />
                  )}
                </Pressable>

                <Pressable
                  onPress={() => setInputMode('keyboard')}
                  hitSlop={10}
                  style={styles.voiceBarSideBtn}
                >
                  <Ionicons name="keypad-outline" size={20} color={colors.textMuted} />
                </Pressable>
              </View>
            ) : null}
            {inputMode === 'voice' ? (
              <Text style={styles.voiceBarHint}>
                {isTranscribing
                  ? t("Yazıya çeviriyorum…")
                  : isRecording
                    ? t("Dinliyorum… bitirince tekrar dokun")
                    : t("Konuşmak için mikrofona dokun")}
              </Text>
            ) : (
              <View style={styles.inputRow}>
                <Pressable
                  onPress={() => setInputMode('voice')}
                  hitSlop={10}
                  style={styles.keyboardModeMicBtn}
                >
                  <Ionicons name="mic-outline" size={18} color={colors.brand} />
                </Pressable>
                <TextInput
                  style={styles.textInput}
                  placeholder={t("İngilizce yaz...")}
                  placeholderTextColor={colors.textMuted}
                  value={inputText}
                  onChangeText={setInputText}
                  onSubmitEditing={() => handleSend()}
                  multiline
                  editable={chatReady && !sending}
                />
                <Pressable
                  onPress={() => handleSend()}
                  disabled={!chatReady || !inputText.trim() || sending}
                  style={[
                    styles.sendButton,
                    (!chatReady || !inputText.trim() || sending) && styles.sendButtonDisabled,
                  ]}
                >
                  <Ionicons name="send" size={18} color="#FFFFFF" />
                </Pressable>
              </View>
            )}

            {isRecording ? (
              <Text style={styles.voiceBarHint}>{t("🔴 Dinliyorum… bitirince tekrar dokun")}</Text>
            ) : isTranscribing ? (
              <Text style={styles.voiceBarHint}>{t("Sesin yazıya çevriliyor…")}</Text>
            ) : permissionDenied ? (
              <Text style={styles.voiceBarHint}>{t("Mikrofon izni reddedildi — ayarlardan açabilirsin.")}</Text>
            ) : null}
          </View>
        )}
      </KeyboardAvoidingView>

      {toast ? <Toast message={toast} /> : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
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
    borderBottomColor: 'rgba(226, 232, 240, 0.8)',
  },
  headerCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  headerAvatar: {
    width: 32,
    height: 32,
  },
  headerTextCol: {
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 14,
    color: colors.textHeading,
  },
  headerSub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10,
    color: colors.textMuted,
  },
  headerSpacer: {
    width: 24,
  },

  messagesContent: {
    padding: spacing.md,
    gap: spacing.md,
    paddingBottom: spacing.lg,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    maxWidth: '90%',
  },
  messageRowUser: {
    alignSelf: 'flex-end',
    flexDirection: 'row-reverse',
  },
  bubbleAvatar: {
    width: 28,
    height: 28,
  },
  bubbleCol: {
    flexShrink: 1,
    gap: 4,
  },
  bubble: {
    borderRadius: radii.lg,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  bubbleAssistant: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.9)',
    borderBottomLeftRadius: 4,
  },
  bubbleUser: {
    backgroundColor: colors.brand,
    borderBottomRightRadius: 4,
  },
  bubbleTextAssistant: {
    fontFamily: fonts.bodyRegular,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textHeading,
  },
  bubbleTextUser: {
    fontFamily: fonts.bodyRegular,
    fontSize: 14,
    lineHeight: 20,
    color: '#FFFFFF',
  },
  bubbleIconsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 6,
  },
  bubbleIconBtn: {
    opacity: 0.8,
  },
  bubbleError: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderBottomRightRadius: 4,
  },
  bubbleTextError: {
    fontFamily: fonts.bodyMedium,
    fontSize: 13,
    color: '#B91C1C',
  },
  errorRetryBtn: {
    width: 30,
    height: 30,
    borderRadius: radii.pill,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  trHintText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
    fontStyle: 'italic',
  },
  typingBubble: {
    justifyContent: 'center',
  },
  typingText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: colors.textMuted,
    fontStyle: 'italic',
  },

  /* Interactive Topic Selection Chips under Mivo's Opening */
  topicOptionsWrapper: {
    marginTop: 10,
    gap: 8,
  },
  topicOptionsHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginLeft: 2,
  },
  topicOptionsTitle: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 12,
    color: '#D97706',
  },
  topicChipsList: {
    gap: 7,
  },
  topicOptionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 11,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.22)',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  topicOptionCardPressed: {
    backgroundColor: '#EEF2FF',
    transform: [{ scale: 0.98 }],
  },
  topicOptionCardText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 13,
    color: colors.textHeading,
    flex: 1,
  },
  topicOptionCardArrow: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  correctionCard: {
    backgroundColor: 'rgba(16, 185, 129, 0.06)',
    borderRadius: radii.md,
    borderLeftWidth: 3,
    borderLeftColor: colors.success,
    padding: 10,
    gap: 2,
  },
  correctionLabel: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 11,
    color: colors.success,
  },
  correctionText: {
    fontFamily: fonts.headingBold,
    fontSize: 13,
    color: colors.textHeading,
  },
  correctionExplanation: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textBody,
  },

  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: 'rgba(226, 232, 240, 0.8)',
  },
  textInput: {
    flex: 1,
    maxHeight: 100,
    backgroundColor: '#F1F5F9',
    borderRadius: radii.lg,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontFamily: fonts.bodyRegular,
    fontSize: 14,
    color: colors.textHeading,
  },
  sendButton: {
    width: 42,
    height: 42,
    borderRadius: radii.pill,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.4,
  },

  completionBanner: {
    backgroundColor: '#0F172A',
    padding: spacing.md,
    borderTopLeftRadius: radii.lg,
    borderTopRightRadius: radii.lg,
    gap: 8,
  },
  completionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  completionTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 16,
    color: '#FBBF24',
  },
  completionBadge: {
    fontFamily: fonts.mono,
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: 'bold',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.pill,
  },
  completionSub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: '#E2E8F0',
    lineHeight: 16,
  },
  completionBtn: {
    backgroundColor: colors.brand,
    paddingVertical: 12,
    borderRadius: radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  completionBtnText: {
    fontFamily: fonts.headingBold,
    fontSize: 13,
    color: '#FFFFFF',
  },

  /* Step Progress Tracker */
  stepProgressContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(226, 232, 240, 0.8)',
    gap: 6,
  },
  stepProgressEyebrow: {
    fontFamily: fonts.mono,
    fontSize: 9,
    fontWeight: 'bold',
    color: colors.textMuted,
    letterSpacing: 0.5,
  },
  stepProgressBarsRow: {
    flexDirection: 'row',
    gap: 6,
  },
  stepBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E2E8F0',
  },
  stepBarActive: {
    backgroundColor: colors.brand,
  },
  stepBarDone: {
    backgroundColor: '#10B981',
  },
  stepProgressLabelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepProgressText: {
    fontFamily: fonts.headingBold,
    fontSize: 11,
    color: colors.brand,
  },

  /* Input & Suggestions */
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: 'rgba(226, 232, 240, 0.8)',
    paddingBottom: 6,
  },

  /* "Söylemeyi dene" coaching card */
  suggestionCard: {
    margin: spacing.md,
    marginBottom: 4,
    padding: 12,
    borderRadius: radii.md,
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#FDE68A',
    gap: 4,
  },
  suggestionCardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  suggestionCardHeaderText: {
    flex: 1,
    fontFamily: fonts.headingSemiBold,
    fontSize: 11.5,
    color: '#92400E',
  },
  suggestionCardCycleText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 10.5,
    color: '#D97706',
  },
  suggestionCardSentence: {
    fontFamily: fonts.headingBold,
    fontSize: 14,
    color: colors.textHeading,
  },
  suggestionCardTranslation: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11.5,
    color: colors.textMuted,
  },
  suggestionCardListenBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  suggestionCardListenText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 11,
    color: colors.brand,
  },

  /* Voice bar (default input mode) */
  voiceBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 36,
    paddingVertical: 10,
  },
  voiceBarSideBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  micButton: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 4,
    borderBottomColor: '#3730A3',
  },
  micButtonRecording: {
    backgroundColor: colors.error,
    borderBottomColor: '#9F1239',
  },
  noticeRow: { alignItems: 'center', marginVertical: 6 },
  noticePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: '#F1F5F9',
  },
  noticeText: { fontFamily: fonts.bodyMedium, fontSize: 12, color: colors.textMuted },
  voiceWave: { height: 34, justifyContent: 'center', alignItems: 'center' },
  micButtonDisabled: {
    opacity: 0.5,
  },
  voiceBarHint: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
    textAlign: 'center',
    paddingBottom: 4,
  },
  keyboardModeMicBtn: {
    width: 36,
    height: 36,
    borderRadius: radii.pill,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
