import { Ionicons } from '@expo/vector-icons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { AiOrb } from '../components/AiOrb';
import { Button } from '../components/Button';
import { MicPermissionPrompt } from '../components/MicPermissionPrompt';
import { TappableWords } from '../components/TappableWords';
import { Toast } from '../components/Toast';
import { Waveform } from '../components/Waveform';
import { useConversationSocket, type OrbState } from '../hooks/useConversationSocket';
import { api, ApiError } from '../lib/api';
import { colors, fonts, radii, shadow, spacing, typography } from '../theme/tokens';
import type { ScenarioOut, SessionEndRequest, SessionOut, VocabCardCreate } from '../types/api';
import type { WsCorrectionData } from '../types/ws';
import type { LiveConversationRoomScreenProps } from '../navigation/types';

const CLOSE_REASON_MESSAGES: Record<string, string> = {
  quota_exceeded: 'Bugünkü ücretsiz sahne hakkın doldu. Pro’ya geçerek sınırsız pratik yapabilirsin.',
  time_limit_reached: '5 dakikalık ücretsiz süre doldu.',
  missing_api_base_url: 'Backend adresi yapılandırılmamış (EXPO_PUBLIC_API_BASE_URL).',
};

const ORB_STATE_LABEL: Record<OrbState, string> = {
  idle: '',
  listening: 'Dinliyor…',
  thinking: 'Düşünüyor…',
  speaking: 'Konuşuyor…',
};

function formatTimer(seconds: number): string {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export function LiveConversationRoomScreen({ navigation, route }: LiveConversationRoomScreenProps) {
  const { scenarioSlug, scenarioId: paramScenarioId, scenarioTitle: paramScenarioTitle } = route.params;

  // Deep links (`talkstage://scenario/:slug`) only carry the slug — resolve
  // the rest from the backend when arriving that way (normal in-app
  // navigation already passes id/title, so this query is skipped then).
  const { data: resolvedScenario } = useQuery({
    queryKey: ['scenarios', scenarioSlug],
    queryFn: () => api.get<ScenarioOut>(`/scenarios/${scenarioSlug}`),
    enabled: !paramScenarioId || !paramScenarioTitle,
  });
  const scenarioId = paramScenarioId ?? resolvedScenario?.id;
  const scenarioTitle = paramScenarioTitle ?? resolvedScenario?.title ?? '';

  const {
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
  } = useConversationSocket(scenarioSlug);
  const queryClient = useQueryClient();

  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const [wordsAddedCount, setWordsAddedCount] = useState(0);
  const [savingSession, setSavingSession] = useState(false);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (status !== 'open') return;
    const interval = setInterval(() => setElapsedSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, [status]);

  useEffect(() => () => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
  }, []);

  const showToast = (message: string) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToast(message);
    toastTimeoutRef.current = setTimeout(() => setToast(null), 1600);
  };

  const handleSaveWord = async (word: string, sentence: string) => {
    try {
      const payload: VocabCardCreate = {
        term: word,
        source_scenario_id: scenarioId,
        example_sentence: sentence,
        source_label: scenarioTitle,
      };
      await api.post('/vocab-cards', payload);
      // Görev 12-13's vocab queue should use this same key so it picks up new words automatically.
      queryClient.invalidateQueries({ queryKey: ['vocab-cards'] });
      setWordsAddedCount((c) => c + 1);
      showToast(`“${word}” kelime defterine eklendi`);
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : 'Kelime kaydedilemedi');
    }
  };

  /** Ends the session (if there was one worth recording) and shows the scorecard. */
  const finishSession = async () => {
    if (turns.length === 0 || !startedAt || !scenarioId) {
      navigation.goBack();
      return;
    }
    setSavingSession(true);
    try {
      const payload: SessionEndRequest = {
        scenario_id: scenarioId,
        started_at: startedAt,
        ended_at: new Date().toISOString(),
        transcript: turns,
        corrections_count: correctionsCount,
        fluency_scores: fluencyScores,
      };
      const result = await api.post<SessionOut>('/sessions/end', payload);
      navigation.replace('Scorecard', { session: result, scenarioTitle, wordsAddedCount });
    } catch {
      navigation.goBack();
    } finally {
      setSavingSession(false);
    }
  };

  const handleExit = () => {
    endSession();
    finishSession();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={handleExit} hitSlop={12}>
          <Ionicons name="close" size={24} color={colors.textHeading} />
        </Pressable>
        <Text style={styles.headerTitle} numberOfLines={1} ellipsizeMode="tail">
          {scenarioTitle}
        </Text>
        <Text style={styles.headerTimer}>⏱️ {formatTimer(elapsedSeconds)}</Text>
      </View>

      {permissionDenied ? (
        <View style={styles.centerBlock}>
          <MicPermissionPrompt onRequestPermission={() => navigation.goBack()} buttonLabel="Geri Dön" />
        </View>
      ) : status === 'connecting' ? (
        <View style={styles.centerBlock}>
          <ActivityIndicator color={colors.brand} size="large" />
          <Text style={styles.statusText}>Sahneye bağlanılıyor…</Text>
        </View>
      ) : status === 'closed' ? (
        <View style={styles.centerBlock}>
          <Text style={styles.statusText}>
            {(closeInfo && CLOSE_REASON_MESSAGES[closeInfo.reason]) ?? 'Bağlantı kapandı.'}
          </Text>
          {savingSession ? (
            <ActivityIndicator color={colors.brand} />
          ) : closeInfo?.reason === 'quota_exceeded' ? (
            <>
              <Button
                label="Pro’ya Geç"
                onPress={() => navigation.navigate('Paywall')}
                style={styles.upsellButton}
              />
              <Pressable onPress={finishSession}>
                <Text style={styles.backLink}>{turns.length > 0 ? 'Karneni Gör' : 'Sahnelere dön'}</Text>
              </Pressable>
            </>
          ) : (
            <Pressable onPress={finishSession}>
              <Text style={styles.backLink}>{turns.length > 0 ? 'Karneni Gör' : 'Sahnelere dön'}</Text>
            </Pressable>
          )}
        </View>
      ) : (
        <View style={styles.body}>
          <View style={styles.orbArea}>
            <AiOrb state={orbState} />
            <Text style={styles.orbStateLabel}>{ORB_STATE_LABEL[orbState]}</Text>
            {aiReplyText ? (
              <TappableWords
                text={`“${aiReplyText}”`}
                onWordPress={(word) => handleSaveWord(word, aiReplyText)}
                textStyle={styles.aiReplyText}
              />
            ) : null}
          </View>

          {correction?.has_error ? <CorrectionCard correction={correction} /> : null}

          <View style={styles.footer}>
            <Text style={styles.footerLabel}>SÖYLEDİĞİN (bilmediğin kelimeye dokun)</Text>
            {interimText ? (
              <TappableWords
                text={interimText}
                onWordPress={(word) => handleSaveWord(word, interimText)}
                textStyle={styles.userTranscript}
              />
            ) : (
              <Text style={styles.userTranscript}>…</Text>
            )}
            <Waveform meteringDb={micLevelDb} active={status === 'open'} />
          </View>
        </View>
      )}

      {toast ? <Toast message={toast} /> : null}
    </SafeAreaView>
  );
}

function CorrectionCard({ correction }: { correction: WsCorrectionData }) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    anim.setValue(0);
    Animated.timing(anim, { toValue: 1, duration: 280, useNativeDriver: true }).start();
  }, [anim, correction]);

  return (
    <Animated.View
      style={[
        styles.correctionCard,
        shadow.card,
        {
          opacity: anim,
          transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [12, 0] }) }],
        },
      ]}
    >
      <Text style={styles.correctionLabel}>💡 Doğrusu:</Text>
      <Text style={styles.correctionText}>{correction.corrected}</Text>
      <Text style={styles.correctionExplanation}>{correction.explanation_tr}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  headerTitle: {
    ...typography.bodyMedium,
    fontFamily: fonts.headingSemiBold,
    flex: 1,
    textAlign: 'center',
  },
  headerTimer: {
    ...typography.caption,
    fontFamily: fonts.mono,
  },
  centerBlock: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    gap: spacing.md,
  },
  statusText: {
    ...typography.body,
    textAlign: 'center',
  },
  backLink: {
    ...typography.bodyMedium,
    color: colors.brand,
  },
  upsellButton: {
    marginBottom: spacing.md,
    minWidth: 200,
  },
  body: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'space-between',
  },
  orbArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  orbStateLabel: {
    ...typography.caption,
    fontFamily: fonts.bodyMedium,
    color: colors.textMuted,
  },
  aiReplyText: {
    ...typography.h3,
    textAlign: 'center',
    paddingHorizontal: spacing.lg,
    marginTop: spacing.sm,
  },
  correctionCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.md,
    gap: 2,
    marginBottom: spacing.md,
  },
  correctionLabel: {
    ...typography.caption,
    fontFamily: fonts.headingSemiBold,
    color: colors.success,
  },
  correctionText: {
    ...typography.bodyMedium,
  },
  correctionExplanation: {
    ...typography.caption,
  },
  footer: {
    gap: spacing.xs,
  },
  footerLabel: {
    ...typography.caption,
    fontFamily: fonts.headingSemiBold,
    letterSpacing: 0.5,
  },
  userTranscript: {
    ...typography.body,
    minHeight: 40,
  },
});
