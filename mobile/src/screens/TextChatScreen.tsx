import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { yankiMagicImage } from '../assets/images';
import { TappableWords } from '../components/TappableWords';
import { Toast } from '../components/Toast';
import { useAuth } from '../context/AuthContext';
import { pickDailyTopic } from '../data/conversationTopics';
import { api, ApiError } from '../lib/api';
import { setLearningFlag } from '../lib/learningFlags';
import { useTrackScreenView } from '../lib/analytics';
import { colors, fonts, radii, spacing } from '../theme/tokens';
import type {
  ChatCorrection,
  ChatMessageResponse,
  ChatTurn,
  ProfileOut,
  VocabCardCreate,
} from '../types/api';
import type { TextChatScreenProps } from '../navigation/types';

type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  trHint?: string;
  correction?: ChatCorrection;
};

let idCounter = 0;
const nextId = () => `msg_${idCounter++}`;

const DEFAULT_OPENING_MESSAGE: ChatMessage = {
  id: 'opening',
  role: 'assistant',
  text: "Hello! I'm Yankı. How was your day today?",
  trHint: 'Merhaba! Ben Yankı. Bugün günün nasıldı?',
};

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
  return `${base} TEACHER MODE: this is a true beginner who may not know what's expected — don't assume an English-only exchange makes sense to them yet, and never just say "tell me something" or ask a bare open question — that's as paralyzing as a wall of English for someone who doesn't know what to say. Instead, each turn give a CONCRETE, specific micro-prompt: name a simple everyday scenario or 1-2 concrete things (e.g. "iki yemeği karşılaştır: pizza ve makarna" instead of "bana bir şey anlat"), explained in Turkish first, then your English example. Vary the scenario every turn so it doesn't feel like refilling the same blank — this should still take the full conversation to practice properly, not resolve in one exchange. When you correct a mistake, explain why in Turkish too, not just the corrected English — be a patient teacher sitting next to them, not a native speaker expecting fluent replies back.`;
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
        ? ` Örneğin şu kelimelerden birini kullanarak bir cümle kurmayı dene: "${focusTopic.targetWords.slice(0, 2).join('", "')}".`
        : '';
      return {
        id: 'opening',
        role: 'assistant',
        text: `Merhaba! Bugün "${focusTopic.title}" konusunu birlikte pekiştireceğiz (${focusTopic.formula}).${starterHint} Hatalarını nazikçe düzelteceğim, hazır olduğunda başlayalım.\n\nHi! Ready? Let's build a sentence together.`,
      };
    }
    return {
      id: 'opening',
      role: 'assistant',
      text: `Hi! Let's practice "${focusTopic.title}" (${focusTopic.formula}) today. Tell me something using this structure — I'll help if you get stuck.${wordsHint}`,
      trHint: `Merhaba! Bugün "${focusTopic.title}" konusunu pratik yapalım. Bu yapıyı kullanarak bana bir şey anlat — takılırsan yardım ederim.`,
    };
  }
  // No formula means this is a level-up boss challenge, not a single grammar
  // point — invite a free-form conversation instead of naming a "structure".
  return {
    id: 'opening',
    role: 'assistant',
    text: `Hi! This is your "${focusTopic.title}". Let's have a natural conversation so I can see how well you express yourself in English — go ahead and tell me anything.`,
    trHint: `Merhaba! Bu senin "${focusTopic.title}" değerlendirmen. Kendini İngilizce nasıl ifade ettiğini görmek için doğal bir sohbet edelim — bana istediğin bir şeyi anlat.`,
  };
}

/**
 * Lightweight, low-pressure text-chat practice mode (as opposed to the
 * voice-based LiveConversationRoom) — aimed at lower-level learners who may
 * not be ready for live voice yet. Stateless on the backend: this screen
 * keeps the whole conversation in local state and resends it each turn
 * (`POST /chat/message`), so closing the screen loses the conversation —
 * intentional for a v1, matches how little else in this app persists
 * in-progress state either.
 */
export function TextChatScreen({ navigation, route }: TextChatScreenProps) {
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
  const [rerollSeed, setRerollSeed] = useState(0);
  const todaysTopic = useMemo(() => {
    // Wait for the real level/persona before picking — otherwise this would
    // briefly pick a "beginner, no persona" topic and then swap to a
    // different one the moment the profile loads, flashing the opening
    // question right after the user opens the screen.
    if (!isFreeChat || !session?.user?.id || profileLoading) return null;
    return pickDailyTopic(session.user.id, profile?.cefr_level, profile?.persona_id, rerollSeed);
  }, [isFreeChat, session?.user?.id, profileLoading, profile?.cefr_level, profile?.persona_id, rerollSeed]);

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
  const practiceLoggedRef = useRef(false);
  const scrollRef = useRef<ScrollView>(null);

  // Swaps the generic opener for the real topic's question once it's known
  // (profile query resolves), and again whenever "Başka Konu" rerolls it.
  useEffect(() => {
    if (todaysTopic) {
      setMessages((current) => {
        if (current.some((message) => message.role === 'user')) return current;
        return [{ id: 'opening', role: 'assistant', text: todaysTopic.openingEn, trHint: todaysTopic.openingTr }];
      });
    }
  }, [todaysTopic]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1600);
  };

  const scrollToEnd = () => {
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 50);
  };

  const handleSend = async () => {
    const text = inputText.trim();
    if (!text || sending || isCompleted) return;

    // The generic default opener is just a canned greeting Groq never
    // generated, so it's excluded from context. The focus-topic/daily-task/
    // daily-topic openers are different — they're the only place the grammar
    // target or opening question is stated, so they must stay in history.
    const history: ChatTurn[] = messages
      .filter((m) => m.id !== 'opening' || Boolean(focusTopic) || Boolean(dailyTask) || Boolean(todaysTopic))
      .map((m) => ({ role: m.role, content: m.text }));

    const userMsg: ChatMessage = { id: nextId(), role: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setSending(true);
    setSuggestedReplies([]);
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
              showToast('Görev tamamlandı ancak ilerleme kaydedilemedi.');
            });
        }
        setIsCompleted(true);
        setCompletionSummary(response.completion_summary_tr ?? 'Tebrikler! Bu sohbet görevini başarıyla tamamladın.');
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
          : 'Mesaj gönderilemedi, internet bağlantını kontrol et'
      );
    } finally {
      setSending(false);
      scrollToEnd();
    }
  };

  const handleWordTap = async (word: string, sentence: string) => {
    try {
      const payload: VocabCardCreate = {
        term: word,
        example_sentence: sentence,
        source_label: dailyTask ? `${dailyTask.title} (Görev)` : 'Günlük Sohbet (Yazarak)',
      };
      await api.post('/vocab-cards', payload);
      queryClient.invalidateQueries({ queryKey: ['vocab-cards'] });
      showToast(`"${word}" kelime sandığına eklendi 📚`);
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : 'Kelime kaydedilemedi');
    }
  };

  const userTurnsCount = messages.filter((m) => m.role === 'user').length;
  const chatReady = !isFreeChat || !profileLoading;
  const currentStep = Math.min(3, userTurnsCount + 1);
  // "Başka Konu" only makes sense before the user has actually replied —
  // rerolling mid-conversation would erase a real exchange.
  const canRerollTopic = isFreeChat && userTurnsCount === 0;

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Navigation Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
          <Ionicons name="chevron-back" size={24} color={colors.textHeading} />
        </Pressable>
        <View style={styles.headerCenter}>
          <Image source={yankiMagicImage} style={styles.headerAvatar} resizeMode="contain" />
          <View style={styles.headerTextCol}>
            <Text style={styles.headerTitle} numberOfLines={1}>
              {dailyTask ? dailyTask.roleName : focusTopic ? focusTopic.title : 'Yankı ile Günlük Sohbet'}
            </Text>
            <Text style={styles.headerSub} numberOfLines={1}>
              {dailyTask
                ? dailyTask.title
                : focusTopic
                  ? `${focusTopicLevel ? `${focusTopicLevel} ` : ''}İnteraktif Yazma Görevi ✍️`
                  : (todaysTopic?.titleTr ?? 'Serbest Sohbet')}
            </Text>
          </View>
        </View>
        {canRerollTopic ? (
          <Pressable onPress={() => setRerollSeed((s) => s + 1)} hitSlop={12}>
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
          <Text style={styles.stepProgressEyebrow}>BU GÖREVİN ADIMLARI</Text>
          <View style={styles.stepProgressBarsRow}>
            <View style={[styles.stepBar, currentStep >= 1 && styles.stepBarActive, currentStep > 1 && styles.stepBarDone]} />
            <View style={[styles.stepBar, currentStep >= 2 && styles.stepBarActive, currentStep > 2 && styles.stepBarDone]} />
            <View style={[styles.stepBar, isCompleted && styles.stepBarDone]} />
          </View>
          <View style={styles.stepProgressLabelsRow}>
            <Text style={styles.stepProgressText}>
              {isCompleted
                ? '✓ Görev Tamamlandı!'
                : `🎯 Adım ${currentStep}/3: ${
                    currentStep === 1
                      ? 'Selamlaş & Kendini Tanıt'
                      : currentStep === 2
                        ? 'Cevap Ver & Soruyu Yanıtla'
                        : 'Vedalaş & Görevi Bitir'
                  }`}
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
          {messages.map((msg) => (
            <View
              key={msg.id}
              style={[styles.messageRow, msg.role === 'user' && styles.messageRowUser]}
            >
              {msg.role === 'assistant' ? (
                <Image source={yankiMagicImage} style={styles.bubbleAvatar} resizeMode="contain" />
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
                </View>

                {msg.trHint ? <Text style={styles.trHintText}>🇹🇷 {msg.trHint}</Text> : null}

                {msg.correction?.has_error ? (
                  <View style={styles.correctionCard}>
                    <Text style={styles.correctionLabel}>💡 Şöyle demek daha doğru:</Text>
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
          ))}

          {sending ? (
            <View style={styles.messageRow}>
              <Image source={yankiMagicImage} style={styles.bubbleAvatar} resizeMode="contain" />
              <View style={[styles.bubble, styles.bubbleAssistant, styles.typingBubble]}>
                <Text style={styles.typingText}>Yankı yazıyor…</Text>
              </View>
            </View>
          ) : null}
        </ScrollView>

        {isCompleted ? (
          <View style={styles.completionBanner}>
            <View style={styles.completionHeaderRow}>
              <Text style={styles.completionTitle}>🎉 Görev Tamamlandı!</Text>
              {dailyTask && progressSaved ? (
                <Text style={styles.completionBadge}>Gerçek XP kazandın ⚡</Text>
              ) : null}
            </View>
            <Text style={styles.completionSub}>{completionSummary}</Text>
            <Pressable onPress={() => navigation.goBack()} style={styles.completionBtn}>
              <Text style={styles.completionBtnText}>Haritaya Dön & Sonraki Görevi Aç ➔</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.inputContainer}>
            {/* Suggested replies — fresh every turn from the AI's own last
                question (see backend's `suggested_replies`), not a fixed
                generic list, so there's always a concrete answer to tap. */}
            {suggestedReplies.length > 0 ? (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.suggestionsRow}
              >
                {suggestedReplies.map((chip, idx) => (
                  <Pressable
                    key={idx}
                    onPress={() => setInputText(chip)}
                    style={styles.suggestionChip}
                  >
                    <Text style={styles.suggestionChipText}>💡 {chip}</Text>
                  </Pressable>
                ))}
              </ScrollView>
            ) : null}

            <View style={styles.inputRow}>
              <TextInput
                style={styles.textInput}
                placeholder="İngilizce yaz..."
                placeholderTextColor={colors.textMuted}
                value={inputText}
                onChangeText={setInputText}
                onSubmitEditing={handleSend}
                multiline
                editable={chatReady && !sending}
              />
              <Pressable
                onPress={handleSend}
                disabled={!chatReady || !inputText.trim() || sending}
                style={[
                  styles.sendButton,
                  (!chatReady || !inputText.trim() || sending) && styles.sendButtonDisabled,
                ]}
              >
                <Ionicons name="send" size={18} color="#FFFFFF" />
              </Pressable>
            </View>
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
  },
  suggestionsRow: {
    paddingHorizontal: spacing.md,
    paddingTop: 8,
    paddingBottom: 4,
    gap: 6,
  },
  suggestionChip: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.9)',
  },
  suggestionChipText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textHeading,
  },
});
