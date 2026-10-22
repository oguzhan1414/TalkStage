import Ionicons from '@expo/vector-icons/Ionicons';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, Easing, FlatList, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { mivoVoiceImages } from '../assets/images';
import { TappableWords } from './TappableWords';
import { Waveform } from './Waveform';
import { useConversationSocket, type TurnPhase } from '../hooks/useConversationSocket';
import { colors, fonts, radii, spacing } from '../theme/tokens';
import type { WsCorrectionData, WsWordMetric } from '../types/ws';
import { MivoLoader } from './MivoLoader';
import { ReportAiContentModal } from './ReportAiContentModal';
import { haptics } from '../lib/haptics';
import { t } from '../i18n';
const LOW_CONFIDENCE_THRESHOLD = 0.55;

export type DisplayBubble =
  | { key: string; kind: 'user'; text: string; words?: WsWordMetric[]; correction?: WsCorrectionData | null }
  | { key: string; kind: 'assistant'; text: string };


const MIC_SIZE = 84;
const HALO = 118;
/** Silence before the hint card opens by itself: the learner gets a real chance to answer alone first. */
const HINT_AUTO_OPEN_MS = 10000;

/**
 * The big talk button. Idle: indigo with a slow breathing halo. Recording: red, with a halo that grows with the
 * voice level so the learner can SEE that the phone hears them, and a "stop" icon. Pressing sinks the button
 * (and vibrates) so a tap is felt.
 */
function MicButton({ recording, levelDb, onPress, accessibilityLabel }: {
  recording: boolean;
  levelDb: number;
  onPress: () => void;
  accessibilityLabel: string;
}) {
  const breathe = useRef(new Animated.Value(0)).current;
  const level = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(breathe, { toValue: 1, duration: 1300, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
        Animated.timing(breathe, { toValue: 0, duration: 1300, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [breathe]);

  useEffect(() => {
    const target = recording ? Math.max(0, Math.min(1, (levelDb + 55) / 45)) : 0;
    Animated.timing(level, { toValue: target, duration: 90, useNativeDriver: true }).start();
  }, [levelDb, recording, level]);

  const tint = recording ? colors.error : colors.brand;
  return (
    <View style={styles.micWrap}>
      <Animated.View
        pointerEvents="none"
        style={[
          styles.micHalo,
          { backgroundColor: tint },
          {
            opacity: recording
              ? level.interpolate({ inputRange: [0, 1], outputRange: [0.14, 0.34] })
              : breathe.interpolate({ inputRange: [0, 1], outputRange: [0.16, 0] }),
            transform: [
              {
                scale: recording
                  ? level.interpolate({ inputRange: [0, 1], outputRange: [0.78, 1] })
                  : breathe.interpolate({ inputRange: [0, 1], outputRange: [0.78, 1] }),
              },
            ],
          },
        ]}
      />
      <Pressable
        onPress={() => {
          haptics.medium();
          onPress();
        }}
        style={({ pressed }) => [
          styles.dockMic,
          recording && styles.dockMicActive,
          pressed && styles.dockMicPressed,
        ]}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
      >
        <Ionicons name={recording ? 'stop' : 'mic'} size={40} color="#FFFFFF" />
      </Pressable>
    </View>
  );
}

export function VoiceRoomControls({ voice, aiName }: {
  voice: ReturnType<typeof useConversationSocket>;
  aiName: string;
  /** Kept for the callers; the hint card (with its listen button) now lives in the chat thread. */
  pronounce?: (text: string) => unknown;
}) {
  const { turnPhase, coachTipTr, suggestedReplies,
    hintVisible, setHintVisible,
    micLevelDb, startTurn, stopTurn, pendingTranscript, pendingWords, pendingConfidence,
    confirmTranscript, redoTurn, stopAiAudio, retryLastTurn } = voice;
  const [editedTranscript, setEditedTranscript] = useState('');
  const [isEditingTranscript, setIsEditingTranscript] = useState(false);
  const [draft, setDraft] = useState('');
  const [showKeyboard, setShowKeyboard] = useState(false);
  useEffect(() => {
    setEditedTranscript(pendingTranscript ?? '');
    setIsEditingTranscript(false);
  }, [pendingTranscript]);
  const hasHint = suggestedReplies.length > 0 || !!coachTipTr;
  // Teacher first, answer key later: the hint opens by itself only after a stretch of silence.
  useEffect(() => {
    if (turnPhase !== 'thinking_time' || !hasHint || hintVisible) return;
    const timer = setTimeout(() => setHintVisible(true), HINT_AUTO_OPEN_MS);
    return () => clearTimeout(timer);
  }, [turnPhase, hasHint, hintVisible, setHintVisible]);
  return <View style={{ gap: 10 }}>
            {(turnPhase === 'thinking_time' || turnPhase === 'recording') && (
              <View style={styles.turnControlBlock}>
                {turnPhase === 'recording' && (
                  <View style={styles.waveformContainer}>
                    <Waveform meteringDb={micLevelDb} active={true} />
                  </View>
                )}

                <View style={styles.dockRow}>
                  <Pressable
                    onPress={() => {
                      haptics.light();
                      setHintVisible((v) => !v);
                    }}
                    disabled={!hasHint}
                    hitSlop={10}
                    style={[styles.dockSideBtn, hasHint && styles.dockHintBtn, hintVisible && styles.dockHintBtnOn]}
                    accessibilityRole="button"
                    accessibilityLabel={t("İpucu")}
                  >
                    <Ionicons name={hintVisible ? 'bulb' : 'bulb-outline'} size={21} color={hasHint ? '#D97706' : '#CBD5E1'} />
                    {hasHint && !hintVisible ? <View style={styles.dockHintDot} /> : null}
                  </Pressable>
                  <MicButton
                    recording={turnPhase === 'recording'}
                    levelDb={micLevelDb}
                    onPress={turnPhase === 'recording' ? stopTurn : startTurn}
                    accessibilityLabel={turnPhase === 'recording' ? t("Kaydı bitir ve gönder") : t("Konuşmak için mikrofona dokun")}
                  />
                  <Pressable
                    onPress={() => setShowKeyboard((v) => !v)}
                    hitSlop={10}
                    style={styles.dockSideBtn}
                    accessibilityRole="button"
                    accessibilityLabel={t("Mesaj yaz")}
                  >
                    <Ionicons name="keypad-outline" size={20} color={showKeyboard ? colors.brand : colors.textMuted} />
                  </Pressable>
                </View>
                <Text style={[styles.dockHint, turnPhase === 'recording' && styles.dockHintRecording]} maxFontSizeMultiplier={1.1}>
                  {turnPhase === 'recording' ? t("Dinliyorum… bitirince tekrar dokun") : t("Dokun ve konuş")}
                </Text>
              </View>
            )}

            {turnPhase === 'reviewing' && (
              <TranscriptReviewCard
                pendingTranscript={pendingTranscript}
                pendingWords={pendingWords}
                pendingConfidence={pendingConfidence}
                editedTranscript={editedTranscript}
                isEditing={isEditingTranscript}
                onChangeText={setEditedTranscript}
                onStartEditing={() => setIsEditingTranscript(true)}
                onConfirm={() => confirmTranscript(editedTranscript)}
                onRedo={redoTurn}
              />
            )}

            {turnPhase === 'ai_thinking' && (
              <View style={styles.aiThinkingRow}>
                <MivoLoader size={34} />
                <Text style={styles.aiThinkingText}>{t("{{aiName}} cevabını hazırlıyor…", { aiName })}</Text>
              </View>
            )}

            {turnPhase === 'ai_speaking' && (
              <View style={styles.aiSpeakingRow}>
                <Pressable
                  onPress={stopAiAudio}
                  style={styles.aiAudioControlBtn}
                  accessibilityRole="button"
                  accessibilityLabel={t("Sesi durdur")}
                >
                  <Ionicons name="stop-circle-outline" size={18} color={colors.textHeading} />
                  <Text style={styles.aiAudioControlText}>{t("Sesi Durdur")}</Text>
                </Pressable>
                <Text style={styles.aiSpeakingHint}>{t("{{aiName}} konuşuyor — mikrofon kapalı", { aiName })}</Text>
              </View>
            )}

            {turnPhase === 'error' && (
              <View style={styles.turnErrorBlock}>
                <View style={styles.turnErrorActions}>
                  <Pressable onPress={retryLastTurn} style={styles.turnErrorRetryBtn}>
                    <Text style={styles.turnErrorRetryText}>{t("Tekrar Dene")}</Text>
                  </Pressable>
                  <Pressable onPress={redoTurn} hitSlop={8}>
                    <Text style={styles.turnErrorFallbackText}>{t("Tekrar Söyle")}</Text>
                  </Pressable>
                </View>
              </View>
            )}
    {voice.audioNotice && <Text style={styles.aiSpeakingHint}>{voice.audioNotice}</Text>}
    {((turnPhase === 'thinking_time' && showKeyboard) || turnPhase === 'error') && (
      <View style={styles.reviewActionsRow}>
        <TextInput value={draft} onChangeText={setDraft} maxLength={2000}
          placeholder={t("İstersen Türkçe veya İngilizce yaz…")} accessibilityLabel={t("Mivo'ya mesaj")}
          style={[styles.reviewTextInput, { flex: 1 }]} multiline />
        <Pressable disabled={!draft.trim()} accessibilityRole="button" accessibilityLabel={t("Mesajı gönder")}
          style={[styles.reviewSecondaryBtn, { minHeight: 44 }]}
          onPress={() => { confirmTranscript(draft); setDraft(''); }}>
          <Ionicons name="send" size={20} color={draft.trim() ? colors.brand : colors.textMuted} />
        </Pressable>
      </View>
    )}
  </View>;
}

export function VoiceRoomBanner({ phase, aiName, aiRole, onReplay, timeWarning }: {
  phase: TurnPhase;
  aiName: string;
  aiRole: string;
  /** "Listen again" for Mivo's last reply; shown while it is the learner's turn. */
  onReplay?: () => void;
  /** Seconds left before the session limit (server warning); shows a small strip under the banner. */
  timeWarning?: number | null;
}) {
  const recording = phase === 'recording';
  const labels: Record<TurnPhase, string> = {
    thinking_time: t("Sıra sende"), recording: t("Seni dinliyorum"), reviewing: t("Söylediklerini kontrol et"),
    ai_thinking: t("Yanıt hazırlanıyor"), ai_speaking: t("{{aiName}} konuşuyor", { aiName }), error: t("Yeniden deneyelim"),
  };
  const pose = recording ? 'listen' : phase === 'ai_speaking' ? 'speak' : phase === 'ai_thinking' ? 'think' : 'wait';
  return <>
  <View style={[styles.turnBanner, recording && styles.turnBannerRecording]}>
    <Image source={mivoVoiceImages[pose]} style={styles.turnBannerAvatar} resizeMode="contain" />
    <View style={styles.turnBannerTextCol}>
      <Text style={styles.turnBannerLabel} numberOfLines={1} maxFontSizeMultiplier={1.15} accessibilityLiveRegion="polite">{labels[phase]}</Text>
      <Text style={styles.turnBannerSub} numberOfLines={1} maxFontSizeMultiplier={1.1}>{recording ? t("Bitirmek için mikrofona tekrar dokun") : aiRole}</Text>
    </View>
    {phase === 'thinking_time' && onReplay ? (
      <Pressable
        onPress={onReplay}
        hitSlop={8}
        style={styles.replayBtn}
        accessibilityRole="button"
        accessibilityLabel={t("{{aiName}} ne dedi, tekrar dinle", { aiName })}
      >
        <Ionicons name="play-circle" size={16} color={colors.brand} />
        <Text style={styles.replayBtnText} maxFontSizeMultiplier={1.1}>{t("Tekrar dinle")}</Text>
      </Pressable>
    ) : (
      <View style={[styles.turnBannerMic, recording && styles.turnBannerMicOn]}>
        <Ionicons name={recording ? 'mic' : 'mic-off-outline'} size={15} color={recording ? '#059669' : colors.textMuted} />
      </View>
    )}
  </View>
  {timeWarning ? (
    <View style={styles.timeStrip} accessibilityLiveRegion="polite">
      <Ionicons name="hourglass-outline" size={14} color="#B45309" />
      <Text style={styles.timeStripText}>{t("Son 1 dakika: cümleni tamamla.")}</Text>
    </View>
  ) : null}
  </>;
}

/**
 * The hint as a chat message from Mivo (avatar + "Söylemeyi dene" card): the suggested sentence with its translation
 * and a listen button, plus the A1/A2 coach tip. It sits at the end of the thread only while it is the student's turn
 * and stays visible while they speak; it disappears once they have said something (the turn moves on to review/sending).
 */
function MivoHintMessage({ voice, pronounce, onShown }: {
  voice: ReturnType<typeof useConversationSocket>;
  pronounce?: (text: string) => unknown;
  /** Called when the card lays out (appears or changes size) so the thread can scroll it into view. */
  onShown?: () => void;
}) {
  const { turnPhase, hintVisible, suggestedReplies, suggestedRepliesTr, coachTipTr } = voice;
  const [index, setIndex] = useState(0);
  useEffect(() => setIndex(0), [suggestedReplies]);
  // Stays while the student thinks AND while they speak; it goes away once they have said something (review / sent).
  if ((turnPhase !== 'thinking_time' && turnPhase !== 'recording') || !hintVisible) return null;
  const hasReplies = suggestedReplies.length > 0;
  if (!hasReplies && !coachTipTr) return null;
  const i = hasReplies ? index % suggestedReplies.length : 0;
  const sentence = hasReplies ? suggestedReplies[i] : null;
  const translation = hasReplies ? suggestedRepliesTr[i] : null;
  return (
    <View style={styles.hintRow} onLayout={onShown}>
      <Image source={mivoVoiceImages.wait} style={styles.hintAvatar} resizeMode="contain" />
      <View style={[styles.suggestionCard, styles.hintCard]}>
        <View style={styles.suggestionCardHeader}>
          <Ionicons name="sparkles" size={13} color="#D97706" />
          <Text style={styles.suggestionCardHeaderText}>{t("Söylemeyi dene")}</Text>
          {suggestedReplies.length > 1 ? (
            <Pressable onPress={() => setIndex((n) => (n + 1) % suggestedReplies.length)} hitSlop={8}>
              <Text style={styles.suggestionCardCycle}>{t("→ başka örnek")}</Text>
            </Pressable>
          ) : null}
        </View>
        {coachTipTr ? <Text style={styles.hintTip}>{coachTipTr}</Text> : null}
        {sentence ? <Text style={styles.suggestionCardSentence}>{sentence}</Text> : null}
        {translation ? <Text style={styles.hintTranslation}>{translation}</Text> : null}
        {sentence && pronounce ? (
          <Pressable
            onPress={() => pronounce(sentence)}
            style={styles.suggestionCardListen}
            accessibilityRole="button"
            accessibilityLabel={t("Öneriyi dinle: {{reply}}", { reply: sentence })}
          >
            <Ionicons name="volume-medium-outline" size={14} color={colors.brand} />
            <Text style={styles.suggestionCardListenText}>{t("Dinle")}</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

export function VoiceRoomThread({ bubbles, aiName, onWordPress, onListen, voice, pronounce }: {
  bubbles: DisplayBubble[]; aiName: string; onWordPress: (word: string, sentence: string) => void;
  onListen?: (text: string) => void;
  /** Pass the voice session to show Mivo's hint card at the end of the thread. */
  voice?: ReturnType<typeof useConversationSocket>;
  pronounce?: (text: string) => unknown;
}) {
  const list = useRef<FlatList<DisplayBubble>>(null);
  // Follow the conversation until the learner scrolls away by hand; any new message starts following again.
  const follow = useRef(true);
  const viewportH = useRef(0);
  const heights = useRef(new Map<string, number>());
  const bubblesRef = useRef(bubbles);
  bubblesRef.current = bubbles;
  const count = bubbles.length;
  useEffect(() => {
    follow.current = true;
  }, [count]);

  /** Shows the newest message: a long Mivo reply is pinned at its first line (read top-down), anything else scrolls to the end. */
  const reveal = useCallback((animated: boolean) => {
    const all = bubblesRef.current;
    const last = all.length - 1;
    if (last < 0) return;
    const height = heights.current.get(all[last].key) ?? 0;
    if (all[last].kind === 'assistant' && viewportH.current > 0 && height > viewportH.current - 24) {
      list.current?.scrollToIndex({ index: last, viewPosition: 0, viewOffset: 8, animated });
    } else {
      list.current?.scrollToEnd({ animated });
    }
  }, []);

  return <FlatList ref={list} data={bubbles} keyExtractor={(item) => item.key}
    style={styles.chatScrollView} contentContainerStyle={styles.chatScrollContent}
    initialNumToRender={12} windowSize={5} keyboardShouldPersistTaps="handled"
    onScrollBeginDrag={() => { follow.current = false; }}
    onScrollEndDrag={(event) => {
      const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
      follow.current = contentSize.height - contentOffset.y - layoutMeasurement.height < 60;
    }}
    onContentSizeChange={() => { if (follow.current) reveal(false); }}
    onScrollToIndexFailed={() => list.current?.scrollToEnd({ animated: false })}
    renderItem={({ item }) => (
      <View onLayout={(e) => {
        heights.current.set(item.key, e.nativeEvent.layout.height);
        if (follow.current && item.key === bubblesRef.current[bubblesRef.current.length - 1]?.key) reveal(false);
      }}>
        <MemoChatBubble bubble={item} aiName={aiName} onWordPress={onWordPress} onListen={onListen} />
      </View>
    )}
    ListEmptyComponent={<Text style={styles.chatEmptyPlaceholder}>{t("Konuşmaya hazırsın. Mikrofona dokun veya mesaj yaz.")}</Text>}
    onLayout={(e) => {
      viewportH.current = e.nativeEvent.layout.height;
      if (follow.current) reveal(false);
    }}
    ListFooterComponent={voice ? <MivoHintMessage voice={voice} pronounce={pronounce} onShown={() => list.current?.scrollToEnd({ animated: true })} /> : null}
  />;
}

/** Renders words with real-time confidence coloring from Deepgram. */
function ConfidenceWords({
  words,
  onWordPress,
}: {
  words: WsWordMetric[];
  onWordPress: (word: string) => void;
}) {
  return (
    <View style={styles.wordsContainer}>
      {words.map((item, idx) => {
        const conf = item.confidence;
        return (
          <Pressable key={idx} onPress={() => onWordPress(item.word)} hitSlop={4}>
            <Text
              style={[
                styles.wordText,
                conf < 0.75 ? styles.wordLow : conf < 0.90 ? styles.wordMedium : styles.wordHigh,
              ]}
            >
              {item.punctuated_word ?? item.word}{' '}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function TranscriptReviewCard({
  pendingTranscript,
  pendingWords,
  pendingConfidence,
  editedTranscript,
  isEditing,
  onChangeText,
  onStartEditing,
  onConfirm,
  onRedo,
}: {
  pendingTranscript: string | null;
  pendingWords: WsWordMetric[];
  pendingConfidence: number | null;
  editedTranscript: string;
  isEditing: boolean;
  onChangeText: (text: string) => void;
  onStartEditing: () => void;
  onConfirm: () => void;
  onRedo: () => void;
}) {
  if (pendingTranscript == null) {
    return (
      <View style={styles.reviewCard}>
        <MivoLoader size={34} />
        <Text style={styles.reviewLoadingText}>{t("Transkript hazırlanıyor…")}</Text>
      </View>
    );
  }

  const isLowConfidence = pendingConfidence != null && pendingConfidence < LOW_CONFIDENCE_THRESHOLD;

  return (
    <View style={styles.reviewCard}>
      <Text style={styles.reviewCardTitle}>
        {isLowConfidence ? t("Seni tam anlayamadım 🤔") : t("Seni şöyle duydum:")}
      </Text>

      {isEditing ? (
        <TextInput
          value={editedTranscript}
          onChangeText={onChangeText}
          style={styles.reviewTextInput}
          multiline
          maxLength={2000}
          autoFocus
          placeholder={t("Söylediğini buraya yaz…")}
          placeholderTextColor={colors.textMuted}
        />
      ) : (
        <View style={styles.reviewStaticTextWrap}>
          {pendingWords.length > 0 ? (
            <ConfidenceWords words={pendingWords} onWordPress={() => {}} />
          ) : (
            <Text style={styles.reviewPlainText}>{editedTranscript}</Text>
          )}
        </View>
      )}

      <View style={styles.reviewActionsRow}>
        <Pressable onPress={onRedo} style={styles.reviewSecondaryBtn} accessibilityRole="button">
          <Ionicons name="refresh" size={14} color={colors.textBody} />
          <Text style={styles.reviewSecondaryBtnText}>{t("Tekrar Söyle")}</Text>
        </Pressable>
        {!isEditing && (
          <Pressable onPress={onStartEditing} style={styles.reviewSecondaryBtn} accessibilityRole="button">
            <Ionicons name="create-outline" size={14} color={colors.textBody} />
            <Text style={styles.reviewSecondaryBtnText}>{t("Metni Düzelt")}</Text>
          </Pressable>
        )}
        <Pressable
          onPress={onConfirm}
          style={[styles.reviewConfirmBtn, !editedTranscript.trim() && styles.reviewConfirmBtnDisabled]}
          disabled={!editedTranscript.trim()}
          accessibilityRole="button"
        >
          <Ionicons name="send" size={14} color="#FFFFFF" />
          <Text style={styles.reviewConfirmBtnText}>{isLowConfidence ? t("Yine de Gönder") : t("Gönder")}</Text>
        </Pressable>
      </View>
    </View>
  );
}

type TextPart = { quote: boolean; text: string };

/** Splits Mivo's message into narration and the English lines she quotes ("..." or “...”). */
function splitQuotes(text: string): TextPart[] {
  const parts: TextPart[] = [];
  const re = /["“]([^"“”]{2,}?)["”]/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push({ quote: false, text: text.slice(last, m.index) });
    parts.push({ quote: true, text: m[1].trim() });
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push({ quote: false, text: text.slice(last) });
  return parts
    .map((p) => ({ ...p, text: p.text.trim() }))
    .filter((p) => p.text && (p.quote || /[\p{L}\p{N}]/u.test(p.text)));
}

/**
 * Mivo's turn. When she narrates and quotes the other person ("Film seven biri sana şöyle diyor: "I love movies!""),
 * the quoted English line becomes its own card with a listen button, and the narration stays plain text.
 */
function AssistantText({ text, onWordPress, onListen }: {
  text: string;
  onWordPress: (word: string, sentence: string) => void;
  onListen?: (text: string) => void;
}) {
  const parts = splitQuotes(text);
  const quoteIdx = parts.flatMap((p, i) => (p.quote ? [i] : []));
  if (quoteIdx.length === 0) {
    return <TappableWords text={text} onWordPress={(w) => onWordPress(w, text)} textStyle={styles.bubbleTextAssistant} />;
  }
  // The card goes to the line the learner has to answer or say: the last quoted question, else the last quote.
  const cardAt = [...quoteIdx].reverse().find((i) => parts[i].text.includes('?')) ?? quoteIdx[quoteIdx.length - 1];
  const card = parts[cardAt];
  const paragraph = (list: TextPart[], key: string) =>
    list.length ? (
      <Text key={key} style={styles.bubbleTextAssistant} maxFontSizeMultiplier={1.2}>
        {list.map((p, i) => (
          <Text key={i} style={p.quote ? styles.inlineQuote : undefined}>
            {p.quote ? `“${p.text}”` : p.text}
            {i < list.length - 1 ? ' ' : ''}
          </Text>
        ))}
      </Text>
    ) : null;
  return (
    <View style={styles.assistantParts}>
      {paragraph(parts.slice(0, cardAt), 'before')}
      <View style={styles.quoteCard}>
        <View style={styles.quoteBody}>
          <TappableWords text={card.text} onWordPress={(w) => onWordPress(w, card.text)} textStyle={styles.quoteText} />
        </View>
        {onListen ? (
          <Pressable
            onPress={() => onListen(card.text)}
            hitSlop={8}
            style={styles.quoteListen}
            accessibilityRole="button"
            accessibilityLabel={t("Dinle")}
          >
            <Ionicons name="volume-medium" size={16} color={colors.brand} />
          </Pressable>
        ) : null}
      </View>
      {paragraph(parts.slice(cardAt + 1), 'after')}
    </View>
  );
}

function ChatBubble({
  bubble,
  aiName,
  onWordPress,
  onListen,
}: {
  bubble: DisplayBubble;
  aiName: string;
  onWordPress: (word: string, sentence: string) => void;
  onListen?: (text: string) => void;
}) {
  const anim = useRef(new Animated.Value(0)).current;
  const [reportOpen, setReportOpen] = useState(false);

  useEffect(() => {
    Animated.timing(anim, { toValue: 1, duration: 220, useNativeDriver: true }).start();
  }, [anim]);

  const animatedStyle = {
    opacity: anim,
    transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [8, 0] }) }],
  };

  if (bubble.kind === 'assistant') {
    return (
      <Animated.View style={[styles.bubbleWrap, styles.bubbleWrapAssistant, animatedStyle]}>
        <Text style={styles.bubbleSenderLabel}>{aiName}</Text>
        <View style={[styles.bubble, styles.bubbleAssistant]}>
          <AssistantText text={bubble.text} onWordPress={onWordPress} onListen={onListen} />
          <View style={styles.bubbleActionsRow}>
            {onListen ? (
              <Pressable
                onPress={() => onListen(bubble.text)}
                hitSlop={8}
                style={styles.bubbleListenBtn}
                accessibilityRole="button"
                accessibilityLabel={t("Dinle")}
              >
                <Ionicons name="volume-high-outline" size={16} color={colors.textMuted} />
              </Pressable>
            ) : null}
            <Pressable
              onPress={() => setReportOpen(true)}
              hitSlop={8}
              style={styles.bubbleListenBtn}
              accessibilityRole="button"
              accessibilityLabel={t("Yanıtı bildir")}
            >
              <Ionicons name="flag-outline" size={15} color={colors.textMuted} />
            </Pressable>
          </View>
        </View>
        <ReportAiContentModal visible={reportOpen} text={bubble.text} onClose={() => setReportOpen(false)} />
      </Animated.View>
    );
  }

  return (
    <Animated.View style={[styles.bubbleWrap, styles.bubbleWrapUser, animatedStyle]}>
      <View style={[styles.bubble, styles.bubbleUser]}>
        {bubble.words && bubble.words.length > 0 ? (
          <ConfidenceWords words={bubble.words} onWordPress={(w) => onWordPress(w, bubble.text)} />
        ) : (
          <TappableWords
            text={bubble.text}
            onWordPress={(w) => onWordPress(w, bubble.text)}
            textStyle={styles.bubbleTextUser}
          />
        )}
      </View>
      {bubble.correction?.has_error ? (
        <View style={styles.inlineCorrection}>
          <View style={styles.inlineCorrectionHead}>
            <Image source={mivoVoiceImages.note} style={styles.inlineCorrectionAvatar} resizeMode="contain" />
            <Text style={styles.inlineCorrectionLabel}>{t("Mivo'nun notu")}</Text>
            {onListen && bubble.correction.corrected ? (
              <Pressable
                onPress={() => onListen(bubble.correction?.corrected ?? '')}
                hitSlop={8}
                accessibilityRole="button"
                accessibilityLabel={t("Dinle")}
              >
                <Ionicons name="volume-medium" size={16} color="#6366F1" />
              </Pressable>
            ) : null}
          </View>
          <Text style={styles.inlineCorrectionMain}>{bubble.correction.corrected}</Text>
          {bubble.correction.explanation_tr ? (
            <Text style={styles.inlineCorrectionExplain}>{bubble.correction.explanation_tr}</Text>
          ) : null}
        </View>
      ) : null}
    </Animated.View>
  );
}


const MemoChatBubble = memo(ChatBubble);
export const voiceRoomStyles = StyleSheet.create({
  dockRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
  },
  dockSideBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
  },
  micWrap: { width: HALO, height: MIC_SIZE + 24, alignItems: 'center', justifyContent: 'center' },
  micHalo: { position: 'absolute', width: HALO, height: HALO, borderRadius: HALO / 2 },
  dockMic: {
    width: MIC_SIZE,
    height: MIC_SIZE,
    borderRadius: MIC_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.brand,
    borderBottomWidth: 6,
    borderBottomColor: '#3730A3',
    shadowColor: colors.brand,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },
  dockMicActive: { backgroundColor: colors.error, borderBottomColor: '#9F1239', shadowColor: colors.error },
  dockMicPressed: { transform: [{ translateY: 4 }, { scale: 0.96 }], borderBottomWidth: 2 },
  dockHintBtn: { backgroundColor: '#FFFBEB', borderWidth: 1, borderColor: '#FDE68A' },
  dockHintBtnOn: { backgroundColor: '#FEF3C7', borderColor: '#F59E0B' },
  dockHintDot: { position: 'absolute', top: 9, right: 10, width: 8, height: 8, borderRadius: 4, backgroundColor: '#F59E0B', borderWidth: 1.5, borderColor: '#FFFFFF' },
  dockHint: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12.5,
    color: colors.textMuted,
    textAlign: 'center',
  },
  dockHintRecording: { fontFamily: fonts.headingBold, color: colors.error },
  bubbleActionsRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  bubbleListenBtn: { alignSelf: 'flex-start', marginTop: 6, padding: 2 },
  suggestionCard: {
    backgroundColor: '#FFFBEB',
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#FCD34D',
    borderRadius: radii.lg,
    padding: 12,
    gap: 6,
  },
  suggestionCardHeader: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  hintRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 8, marginTop: 6 },
  hintAvatar: { width: 46, height: 46 },
  hintCard: { flex: 1 },
  hintTip: { fontFamily: fonts.bodyRegular, fontSize: 13, color: '#78350F', lineHeight: 18 },
  hintTranslation: { fontFamily: fonts.bodyRegular, fontSize: 13, color: colors.textMuted },
  suggestionCardHeaderText: { flex: 1, fontFamily: fonts.headingSemiBold, fontSize: 12, color: '#B45309' },
  suggestionCardCycle: { fontFamily: fonts.bodyMedium, fontSize: 11.5, color: colors.brand },
  suggestionCardSentence: { fontFamily: fonts.headingBold, fontSize: 17, color: colors.textHeading },
  suggestionCardListen: { flexDirection: 'row', alignItems: 'center', gap: 4, alignSelf: 'flex-start' },
  suggestionCardListenText: { fontFamily: fonts.bodyMedium, fontSize: 12, color: colors.brand },
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
    borderBottomColor: '#E2E8F0',
  },
  headerIconButton: {
    width: 36,
    height: 36,
    borderRadius: radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F5F9',
  },
  headerTitleCol: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
  },
  headerTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 13,
    color: colors.textHeading,
  },
  headerSubRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  liveIndicatorDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
  headerTimer: {
    fontFamily: fonts.mono,
    fontSize: 10,
    color: colors.textMuted,
  },
  finishHeaderBtn: {
    backgroundColor: colors.brand,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radii.pill,
  },
  finishHeaderBtnText: {
    fontFamily: fonts.headingBold,
    fontSize: 11,
    color: '#FFFFFF',
  },
  headerRightSpacer: {
    width: 36,
  },
  centerBlock: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    gap: spacing.md,
  },
  statusText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 13,
    color: colors.textBody,
    textAlign: 'center',
  },
  liveErrorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginHorizontal: spacing.md,
    marginTop: spacing.sm,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: '#FECACA',
    backgroundColor: '#FEF2F2',
  },
  liveErrorBannerText: {
    flex: 1,
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    lineHeight: 17,
    color: colors.error,
  },
  backLink: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 13,
    color: colors.brand,
  },
  mainLayout: {
    flex: 1,
  },
  turnBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginHorizontal: spacing.md,
    marginTop: 8,
    paddingVertical: 6,
    paddingLeft: 8,
    paddingRight: 12,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },
  turnBannerRecording: { borderColor: '#A7F3D0', backgroundColor: '#F0FDF9' },
  turnBannerAvatar: { width: 48, height: 48 },
  turnBannerTextCol: {
    flex: 1,
  },
  turnBannerLabel: {
    fontFamily: fonts.headingBold,
    fontSize: 14,
    color: colors.textHeading,
  },
  turnBannerSub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11.5,
    color: colors.textMuted,
    marginTop: 1,
  },
  turnBannerMic: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F5F9',
  },
  turnBannerMicOn: { backgroundColor: '#D1FAE5' },
  timeStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginHorizontal: spacing.md,
    marginTop: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radii.pill,
    backgroundColor: '#FEF3C7',
  },
  timeStripText: { flex: 1, fontFamily: fonts.bodyMedium, fontSize: 12, color: '#92400E' },
  chatScrollView: {
    flex: 1,
  },
  chatScrollContent: {
    paddingHorizontal: 12,
    paddingTop: 12,
    gap: 10,
    paddingBottom: 20,
  },
  chatEmptyPlaceholder: {
    fontFamily: fonts.bodyRegular,
    fontSize: 13,
    color: colors.textMuted,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: spacing.xl,
  },
  bubbleWrap: {
    maxWidth: '94%',
    gap: 4,
  },
  bubbleWrapUser: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  bubbleWrapAssistant: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  bubbleSenderLabel: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 12,
    color: colors.textMuted,
    marginLeft: 4,
  },
  bubble: {
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  bubbleUser: {
    backgroundColor: '#EEF2FF',
    borderBottomRightRadius: 4,
  },
  bubbleAssistant: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderBottomLeftRadius: 4,
  },
  bubbleTextUser: {
    fontFamily: fonts.bodyMedium,
    fontSize: 15,
    color: colors.textHeading,
    lineHeight: 21,
  },
  bubbleTextAssistant: {
    fontFamily: fonts.bodyRegular,
    fontSize: 15,
    color: colors.textHeading,
    lineHeight: 21,
  },
  assistantParts: { gap: 8, alignSelf: 'stretch' },
  quoteCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#EEF2FF',
    borderLeftWidth: 3,
    borderLeftColor: colors.brand,
    borderRadius: 12,
    paddingVertical: 8,
    paddingLeft: 12,
    paddingRight: 8,
  },
  quoteBody: { flex: 1 },
  inlineQuote: { fontFamily: fonts.headingSemiBold, color: '#4338CA' },
  quoteText: { fontFamily: fonts.headingSemiBold, fontSize: 15.5, lineHeight: 22, color: '#312E81' },
  quoteListen: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  inlineCorrection: {
    alignSelf: 'stretch',
    gap: 4,
    backgroundColor: '#F5F3FF',
    borderWidth: 1,
    borderColor: '#DDD6FE',
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  inlineCorrectionHead: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  inlineCorrectionAvatar: { width: 30, height: 30 },
  inlineCorrectionLabel: { flex: 1, fontFamily: fonts.headingBold, fontSize: 11.5, letterSpacing: 0.3, color: '#6D28D9' },
  inlineCorrectionMain: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 14,
    lineHeight: 19,
    color: colors.textHeading,
  },
  inlineCorrectionExplain: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12.5,
    color: '#475569',
    lineHeight: 18,
  },
  turnControlBlock: {
    gap: 8,
  },
  replayBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: radii.pill,
    backgroundColor: '#EEF2FF',
  },
  replayBtnText: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 12.5,
    color: colors.brand,
  },

  coachTipCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: '#FFF7ED',
    borderWidth: 1.5,
    borderColor: '#FB923C',
    borderRadius: radii.lg,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  coachTipIcon: {
    fontSize: 20,
  },
  coachTipTextCol: {
    flex: 1,
    gap: 2,
  },
  coachTipLabel: {
    fontFamily: fonts.mono,
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#C2410C',
    letterSpacing: 0.5,
  },
  coachTipText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 13,
    lineHeight: 18,
    color: '#9A3412',
  },
  suggestionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 8,
    justifyContent: 'center',
  },
  suggestionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: radii.pill,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  suggestionChipText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    color: colors.textHeading,
  },
  holdTurnBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.brand,
    minHeight: 54,
    paddingVertical: 15,
    borderRadius: radii.pill,
  },
  holdTurnBtnActive: {
    backgroundColor: colors.brand,
  },
  holdTurnBtnText: {
    fontFamily: fonts.headingBold,
    fontSize: 15,
    color: '#FFFFFF',
  },
  reviewCard: {
    gap: 10,
  },
  reviewLoadingText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12.5,
    color: colors.textMuted,
    textAlign: 'center',
  },
  reviewCardTitle: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 12.5,
    color: colors.textHeading,
  },
  reviewStaticTextWrap: {
    backgroundColor: '#F8FAFC',
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 10,
  },
  reviewPlainText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 14,
    lineHeight: 23,
    color: colors.textHeading,
  },
  reviewTextInput: {
    backgroundColor: '#F8FAFC',
    borderRadius: radii.lg,
    borderWidth: 1.5,
    borderColor: colors.brand,
    padding: 10,
    fontFamily: fonts.bodyMedium,
    fontSize: 14,
    lineHeight: 23,
    color: colors.textHeading,
    minHeight: 44,
    maxHeight: 110,
  },
  reviewActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  reviewSecondaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 9,
    borderRadius: radii.pill,
    backgroundColor: '#F1F5F9',
  },
  reviewSecondaryBtnText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    color: colors.textBody,
  },
  reviewConfirmBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: radii.pill,
    backgroundColor: colors.brand,
  },
  reviewConfirmBtnDisabled: {
    opacity: 0.5,
  },
  reviewConfirmBtnText: {
    fontFamily: fonts.headingBold,
    fontSize: 13,
    color: '#FFFFFF',
  },
  aiThinkingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 10,
  },
  aiThinkingText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12.5,
    color: colors.textMuted,
  },
  aiSpeakingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 6,
  },
  aiAudioControlBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radii.pill,
    backgroundColor: '#F1F5F9',
  },
  aiAudioControlText: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 12,
    color: colors.textHeading,
  },
  aiSpeakingHint: {
    fontFamily: fonts.bodyRegular,
    fontSize: 13,
    color: colors.textMuted,
  },
  turnErrorBlock: {
    gap: 10,
  },
  turnErrorActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  turnErrorRetryBtn: {
    backgroundColor: colors.brand,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: radii.pill,
  },
  turnErrorRetryText: {
    fontFamily: fonts.headingBold,
    fontSize: 13,
    color: '#FFFFFF',
  },
  turnErrorFallbackText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12.5,
    color: colors.textBody,
  },
  bottomDock: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: radii.xl,
    borderTopRightRadius: radii.xl,
    paddingHorizontal: spacing.md,
    paddingTop: 12,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    gap: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 6,
  },
  wordsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  wordText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 14,
    lineHeight: 23,
  },
  wordHigh: {
    color: colors.textHeading,
  },
  wordMedium: {
    color: '#D97706',
  },
  wordLow: {
    color: '#EF4444',
    textDecorationLine: 'underline',
  },
  waveformContainer: {
    marginTop: 2,
  },
});

const styles = voiceRoomStyles;
