import { Ionicons } from '@expo/vector-icons';
import { memo, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, FlatList, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { mivoImages } from '../assets/images';
import { TappableWords } from './TappableWords';
import { Waveform } from './Waveform';
import { useConversationSocket, type TurnPhase } from '../hooks/useConversationSocket';
import { colors, fonts, radii, spacing } from '../theme/tokens';
import type { WsCorrectionData, WsWordMetric } from '../types/ws';
import { MivoLoader } from './MivoLoader';
import { getLocale, t, nativeFlag } from '../i18n';
const LOW_CONFIDENCE_THRESHOLD = 0.55;

export type DisplayBubble =
  | { key: string; kind: 'user'; text: string; words?: WsWordMetric[]; correction?: WsCorrectionData | null }
  | { key: string; kind: 'assistant'; text: string };


export function VoiceRoomControls({ voice, aiName, pronounce }: {
  voice: ReturnType<typeof useConversationSocket>;
  aiName: string;
  pronounce: (text: string) => unknown;
}) {
  const { turnPhase, coachTipTr, hasReplayableAudio, replayAiAudio, suggestedReplies,
    micLevelDb, startTurn, stopTurn, pendingTranscript, pendingWords, pendingConfidence,
    confirmTranscript, redoTurn, stopAiAudio, retryLastTurn } = voice;
  const [editedTranscript, setEditedTranscript] = useState('');
  const [isEditingTranscript, setIsEditingTranscript] = useState(false);
  const [draft, setDraft] = useState('');
  const [showHint, setShowHint] = useState(true);
  const [hintIndex, setHintIndex] = useState(0);
  const [showKeyboard, setShowKeyboard] = useState(false);
  useEffect(() => setHintIndex(0), [suggestedReplies]);
  useEffect(() => {
    setEditedTranscript(pendingTranscript ?? '');
    setIsEditingTranscript(false);
  }, [pendingTranscript]);
  return <View style={{ gap: 10 }}>
            {(turnPhase === 'thinking_time' || turnPhase === 'recording') && (
              <View style={styles.turnControlBlock}>
                {turnPhase === 'thinking_time' && coachTipTr ? (
                  <View style={styles.coachTipCard}>
                    <Text style={styles.coachTipIcon}>🧑‍🏫</Text>
                    <View style={styles.coachTipTextCol}>
                      <Text style={styles.coachTipLabel}>{t("KOÇ İPUCU")}</Text>
                      <Text style={styles.coachTipText}>{coachTipTr}</Text>
                    </View>
                  </View>
                ) : null}

                {turnPhase === 'thinking_time' && hasReplayableAudio ? (
                  <Pressable
                    onPress={replayAiAudio}
                    style={styles.replayBtn}
                    accessibilityRole="button"
                    accessibilityLabel={t("{{aiName}} ne dedi, tekrar dinle", { aiName })}
                  >
                    <Ionicons name="play-circle-outline" size={15} color={colors.brand} />
                    <Text style={styles.replayBtnText}>{t("{{aiName}} ne dedi? Tekrar Dinle", { aiName })}</Text>
                  </Pressable>
                ) : null}

                {turnPhase === 'thinking_time' && showHint && suggestedReplies.length > 0 && (
                  <View style={styles.suggestionCard}>
                    <View style={styles.suggestionCardHeader}>
                      <Ionicons name="sparkles" size={13} color="#D97706" />
                      <Text style={styles.suggestionCardHeaderText}>{t("Söylemeyi dene")}</Text>
                      {suggestedReplies.length > 1 ? (
                        <Pressable onPress={() => setHintIndex((i) => (i + 1) % suggestedReplies.length)} hitSlop={8}>
                          <Text style={styles.suggestionCardCycle}>{t("→ başka örnek")}</Text>
                        </Pressable>
                      ) : null}
                    </View>
                    <Text style={styles.suggestionCardSentence}>{suggestedReplies[hintIndex % suggestedReplies.length]}</Text>
                    <Pressable
                      onPress={() => pronounce(suggestedReplies[hintIndex % suggestedReplies.length])}
                      style={styles.suggestionCardListen}
                      accessibilityRole="button"
                      accessibilityLabel={t("Öneriyi dinle: {{reply}}", { reply: suggestedReplies[hintIndex % suggestedReplies.length] })}
                    >
                      <Ionicons name="volume-medium-outline" size={14} color={colors.brand} />
                      <Text style={styles.suggestionCardListenText}>{t("Dinle")}</Text>
                    </Pressable>
                  </View>
                )}

                {turnPhase === 'recording' && (
                  <View style={styles.waveformContainer}>
                    <Waveform meteringDb={micLevelDb} active={true} />
                  </View>
                )}

                {turnPhase === 'thinking_time' && getLocale() !== 'en' && (
                  <View style={styles.suggestionsRow}>
                    {['en', getLocale()].map((language) => (
                      <Pressable key={language} onPress={() => voice.setInputLanguage(language)}
                        accessibilityRole="button" accessibilityState={{ selected: voice.inputLanguage === language }}
                        style={[styles.suggestionChip, voice.inputLanguage === language && { borderColor: colors.brand, backgroundColor: '#EEF2FF' }]}>
                        <Text style={styles.suggestionChipText}>{language === 'en' ? t("İngilizce pratik") : t("Türkçe sor")}</Text>
                      </Pressable>
                    ))}
                  </View>
                )}
                <View style={styles.dockRow}>
                  <Pressable
                    onPress={() => setShowHint((v) => !v)}
                    disabled={suggestedReplies.length === 0}
                    hitSlop={10}
                    style={styles.dockSideBtn}
                    accessibilityRole="button"
                    accessibilityLabel={t("Söylemeyi dene")}
                  >
                    <Ionicons
                      name={showHint ? 'bulb' : 'bulb-outline'}
                      size={20}
                      color={suggestedReplies.length === 0 ? '#CBD5E1' : '#D97706'}
                    />
                  </Pressable>
                  <Pressable
                    onPress={turnPhase === 'recording' ? stopTurn : startTurn}
                    style={[styles.dockMic, turnPhase === 'recording' && styles.dockMicActive]}
                    accessibilityRole="button"
                    accessibilityLabel={turnPhase === 'recording' ? t("Kaydı bitir ve gönder") : t("Konuşmak için mikrofona dokun")}
                  >
                    <Ionicons name={turnPhase === 'recording' ? 'stop' : 'mic'} size={28} color="#FFFFFF" />
                  </Pressable>
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
                <Text style={styles.dockHint}>
                  {turnPhase === 'recording'
                    ? t("Dinliyorum… bitirince tekrar dokun")
                    : voice.inputLanguage !== 'en'
                      ? t("Konuşmak için dokun · Türkçe sor")
                      : t("Konuşmak için mikrofona dokun")}
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

export function VoiceRoomBanner({ phase, aiName, aiRole }: { phase: TurnPhase; aiName: string; aiRole: string }) {
  const recording = phase === 'recording';
  const labels: Record<TurnPhase, string> = {
    thinking_time: t("Sıra sende"), recording: t("Seni dinliyorum"), reviewing: t("Söylediklerini kontrol et"),
    ai_thinking: t("Yanıt hazırlanıyor"), ai_speaking: t("{{aiName}} konuşuyor", { aiName }), error: t("Yeniden deneyelim"),
  };
  const pose = recording ? 'listening' : phase === 'ai_speaking' ? 'speaking' : phase === 'ai_thinking' ? 'thinking' : 'idle';
  return <View style={[styles.turnBanner, { borderColor: recording ? '#A7F3D0' : '#E0E7FF', backgroundColor: '#FFFFFF' }]}>
    <Image source={mivoImages[pose]} style={{ width: 56, height: 56 }} resizeMode="contain" />
    <View style={styles.turnBannerTextCol}>
      <Text style={[styles.turnBannerLabel, { color: colors.textHeading }]} accessibilityLiveRegion="polite">{labels[phase]}</Text>
      <Text style={styles.turnBannerSub}>{recording ? t("Bitirmek için mikrofona tekrar dokun") : t("{{aiRole}} · Mikrofon kapalı", { aiRole })}</Text>
    </View>
    <Ionicons name={recording ? 'mic' : 'mic-off-outline'} size={18} color={recording ? '#059669' : colors.textMuted} />
  </View>;
}

export function VoiceRoomThread({ bubbles, aiName, onWordPress, onListen }: {
  bubbles: DisplayBubble[]; aiName: string; onWordPress: (word: string, sentence: string) => void;
  onListen?: (text: string) => void;
}) {
  const list = useRef<FlatList<DisplayBubble>>(null);
  const atBottom = useRef(true);
  return <FlatList ref={list} data={bubbles} keyExtractor={(item) => item.key}
    style={styles.chatScrollView} contentContainerStyle={styles.chatScrollContent}
    initialNumToRender={12} windowSize={5} keyboardShouldPersistTaps="handled"
    onScroll={(event) => {
      const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
      atBottom.current = contentSize.height - contentOffset.y - layoutMeasurement.height < 100;
    }} scrollEventThrottle={100}
    onContentSizeChange={() => { if (atBottom.current) list.current?.scrollToEnd({ animated: false }); }}
    renderItem={({ item }) => <MemoChatBubble bubble={item} aiName={aiName} onWordPress={onWordPress} onListen={onListen} />}
    ListEmptyComponent={<Text style={styles.chatEmptyPlaceholder}>{t("Konuşmaya hazırsın. Mikrofona dokun veya mesaj yaz.")}</Text>}
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
          <TappableWords
            text={bubble.text}
            onWordPress={(w) => onWordPress(w, bubble.text)}
            textStyle={styles.bubbleTextAssistant}
          />
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
        </View>
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
          <Ionicons name="sparkles" size={12} color="#6366F1" />
          <View style={styles.inlineCorrectionTextCol}>
            <Text style={styles.inlineCorrectionMain}>{bubble.correction.corrected}</Text>
            <Text style={styles.inlineCorrectionExplain}>{nativeFlag()} {bubble.correction.explanation_tr}</Text>
          </View>
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
  dockMic: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.brand,
    borderBottomWidth: 4,
    borderBottomColor: '#3730A3',
  },
  dockMicActive: { backgroundColor: colors.error, borderBottomColor: '#9F1239' },
  dockHint: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11.5,
    color: colors.textMuted,
    textAlign: 'center',
  },
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
    gap: spacing.sm,
    margin: spacing.md,
    marginBottom: 0,
    padding: 10,
    borderRadius: radii.xl,
    borderWidth: 1.5,
  },
  turnBannerTextCol: {
    flex: 1,
  },
  turnBannerLabel: {
    fontFamily: fonts.headingBold,
    fontSize: 13.5,
  },
  turnBannerSub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 1,
  },
  chatScrollView: {
    flex: 1,
  },
  chatScrollContent: {
    padding: spacing.md,
    gap: spacing.sm,
    paddingBottom: 24,
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
    maxWidth: '86%',
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
    borderRadius: radii.lg,
    paddingHorizontal: 12,
    paddingVertical: 9,
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
    lineHeight: 23,
  },
  bubbleTextAssistant: {
    fontFamily: fonts.bodyMedium,
    fontSize: 15,
    color: colors.textHeading,
    lineHeight: 23,
  },
  inlineCorrection: {
    flexDirection: 'row',
    gap: 6,
    backgroundColor: '#F5F3FF',
    borderRadius: radii.md,
    padding: 8,
    maxWidth: '100%',
  },
  inlineCorrectionTextCol: {
    flex: 1,
    gap: 2,
  },
  inlineCorrectionMain: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 12,
    color: colors.textHeading,
  },
  inlineCorrectionExplain: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: '#475569',
    lineHeight: 14,
  },
  turnControlBlock: {
    gap: 10,
  },
  replayBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    alignSelf: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radii.pill,
    backgroundColor: '#EEF2FF',
  },
  replayBtnText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 13,
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
    gap: 6,
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
    padding: spacing.md,
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
