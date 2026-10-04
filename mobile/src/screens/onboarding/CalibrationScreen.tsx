import { Ionicons } from '@expo/vector-icons';
import { File } from 'expo-file-system';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, StyleSheet, Text, View } from 'react-native';

import { cefrLevelImages } from '../../assets/images';
import { AiOrb } from '../../components/AiOrb';
import { Button } from '../../components/Button';
import { MicPermissionPrompt } from '../../components/MicPermissionPrompt';
import { OnboardingProgressHeader } from '../../components/OnboardingProgressHeader';
import { Waveform } from '../../components/Waveform';
import { CALIBRATION_QUESTIONS, ONBOARDING_LEVEL_OPTIONS } from '../../constants/onboarding';
import { useOnboarding } from '../../context/OnboardingContext';
import { useVoiceRecorder } from '../../hooks/useVoiceRecorder';
import { useAnalytics, useTrackScreenView } from '../../lib/analytics';
import { api, ApiError } from '../../lib/api';
import { colors, fonts, radii, shadow, spacing } from '../../theme/tokens';
import type { OnboardingStackScreenProps } from '../../navigation/types';
import type { CalibrationResult } from '../../types/api';

/**
 * The revived voice demo (`POST /onboarding/calibrate` — still fully working,
 * see `backend/CLAUDE.md` Ek 23) — 2 short, A1-achievable questions instead
 * of the old deleted screen's 3 heavier ones. Reuses `AiOrb`/`Waveform`
 * (already proven in the Live Conversation Room) instead of new art. Any
 * failure here (denied permission that slipped through, STT/LLM keys still
 * unconfigured, network) gracefully drops to the `Level` self-select
 * fallback — onboarding must never get stuck on this step.
 */
export function CalibrationScreen({ navigation }: OnboardingStackScreenProps<'Calibration'>) {
  useTrackScreenView('onboarding_step_viewed', { step: 'calibration' });
  const { updateDraft } = useOnboarding();
  const analytics = useAnalytics();
  const { isRecording, meteringDb, permissionDenied, start, stop } = useVoiceRecorder();

  const [questionIndex, setQuestionIndex] = useState(0);
  const [answerUris, setAnswerUris] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CalibrationResult | null>(null);

  const isLastQuestion = questionIndex === CALIBRATION_QUESTIONS.length - 1;
  const orbState = submitting ? 'thinking' : isRecording ? 'listening' : 'idle';

  const submit = async (uris: string[]) => {
    setSubmitting(true);
    setError(null);
    try {
      // Expo SDK 57 replaced the global `fetch` with `expo/fetch`, whose
      // multipart encoder only accepts string/Blob parts (or anything
      // exposing `bytes()`) — the classic RN `{uri, name, type}` file shape
      // throws "Unsupported FormDataPart implementation". `expo-file-system`'s
      // `File` wraps a local uri and implements Blob, so it works directly.
      const form = new FormData();
      uris.forEach((uri) => {
        form.append('answers', new File(uri));
      });
      const calibration = await api.postForm<CalibrationResult>('/onboarding/calibrate', form);
      setResult(calibration);
      analytics.track('onboarding_calibration_result', {
        outcome: 'assessed',
        cefr_level: calibration.cefr_level,
      });
    } catch (err) {
      // The friendly fallback message below hid the real cause (network error,
      // bad file URI, etc.) from the dev console — log it so a real failure
      // is diagnosable from the Metro terminal instead of a dead end.
      console.error('CalibrationScreen submit failed:', err);
      analytics.track('onboarding_calibration_result', { outcome: 'failed' });
      setError(err instanceof ApiError ? err.message : 'Kalibrasyon şu an tamamlanamadı.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleRecording = async () => {
    if (isRecording) {
      const uri = await stop();
      if (uri) {
        const next = [...answerUris, uri];
        setAnswerUris(next);
        if (isLastQuestion) {
          await submit(next);
        } else {
          setQuestionIndex((i) => i + 1);
        }
      }
    } else {
      await start();
    }
  };

  const handleUseResult = () => {
    if (result) updateDraft({ cefrLevel: result.cefr_level, cefrSource: 'calibrated' });
    navigation.navigate('DailyTime');
  };

  const handleFallback = () => {
    analytics.track('onboarding_calibration_result', { outcome: 'skipped' });
    navigation.navigate('Level');
  };

  if (result) {
    const levelObj = ONBOARDING_LEVEL_OPTIONS.find((l) => l.code === result.cefr_level);
    return (
      <SafeAreaView style={styles.container}>
        <OnboardingProgressHeader step={5} onBack={() => navigation.goBack()} />
        <View style={styles.content}>
          <Image
            source={cefrLevelImages[result.cefr_level]}
            style={styles.resultLevelImage}
            resizeMode="contain"
          />
          <Text style={styles.resultLevel}>
            {result.cefr_level} • {levelObj?.title ?? levelObj?.enTitle}
          </Text>
          <Text style={styles.resultSummary}>{result.summary_tr}</Text>

          {result.reasons.length > 0 ? (
            <View style={[styles.reasonsCard, shadow.card]}>
              <Text style={styles.reasonsTitle}>Neden Bu Seviye?</Text>
              {result.reasons.map((reason, i) => (
                <View key={i} style={styles.reasonRow}>
                  <Text style={styles.reasonBullet}>•</Text>
                  <Text style={styles.reasonText}>{reason}</Text>
                </View>
              ))}
            </View>
          ) : null}
        </View>
        <View style={styles.footer}>
          <Button label="Harika, Devam Et ➔" variant="chunky" onPress={handleUseResult} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <OnboardingProgressHeader step={5} onBack={() => navigation.goBack()} />

      <View style={styles.content}>
        <Text style={styles.title}>Hadi Tanışalım 👋</Text>
        <Text style={styles.subtitle}>
          İngilizce cevapla, elinden geldiğince — mükemmel olması hiç gerekmiyor.
        </Text>

        {permissionDenied ? (
          <MicPermissionPrompt onRequestPermission={start} />
        ) : (
          <>
            <View style={styles.orbWrap}>
              <AiOrb state={orbState} />
            </View>

            {isRecording ? <Waveform meteringDb={meteringDb} active={isRecording} /> : null}

            <View style={[styles.questionCard, shadow.card]}>
              <Text style={styles.questionMeta}>
                SORU {questionIndex + 1}/{CALIBRATION_QUESTIONS.length}
              </Text>
              <Text style={styles.questionText}>{CALIBRATION_QUESTIONS[questionIndex].en}</Text>
              <Text style={styles.questionHint}>{CALIBRATION_QUESTIONS[questionIndex].hintTr}</Text>
            </View>

            {error ? <Text style={styles.error}>{error}</Text> : null}
          </>
        )}
      </View>

      <View style={styles.footer}>
        {error ? (
          <Button label="Seviyemi Seç" variant="chunky" onPress={handleFallback} />
        ) : !permissionDenied ? (
          <Button
            label={
              submitting
                ? 'Değerlendiriliyor…'
                : isRecording
                  ? 'Kaydı Bitir'
                  : questionIndex === 0
                    ? 'Kayda Başla'
                    : 'Sıradaki Soruyu Kaydet'
            }
            variant="chunky"
            onPress={handleToggleRecording}
            loading={submitting}
            icon={<Ionicons name={isRecording ? 'stop-circle' : 'mic'} size={20} color="#FFFFFF" />}
          />
        ) : null}
        <Button
          label="Bunun yerine seviyemi kendim seçeceğim"
          variant="ghost"
          onPress={handleFallback}
          disabled={submitting}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    gap: spacing.sm,
  },
  title: {
    fontFamily: fonts.headingBold,
    fontSize: 19,
    color: colors.textHeading,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12.5,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 18,
    maxWidth: 280,
    marginBottom: spacing.sm,
  },
  orbWrap: {
    marginVertical: spacing.sm,
  },
  questionCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: radii.lg,
    padding: spacing.lg,
    marginTop: spacing.sm,
    gap: 6,
  },
  questionMeta: {
    fontFamily: fonts.mono,
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.textMuted,
  },
  questionText: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 16,
    color: colors.textHeading,
    lineHeight: 22,
  },
  questionHint: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11.5,
    color: colors.textMuted,
    fontStyle: 'italic',
  },
  error: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: colors.error,
    textAlign: 'center',
  },
  footer: {
    padding: spacing.lg,
    paddingTop: spacing.sm,
    gap: spacing.sm,
  },
  resultLevelImage: {
    width: 120,
    height: 120,
  },
  resultLevel: {
    fontFamily: fonts.headingBold,
    fontSize: 20,
    color: colors.brand,
    marginTop: spacing.sm,
  },
  resultSummary: {
    fontFamily: fonts.bodyRegular,
    fontSize: 13,
    color: colors.textBody,
    textAlign: 'center',
    marginTop: spacing.xs,
    lineHeight: 19,
    maxWidth: 300,
  },
  reasonsCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: radii.lg,
    padding: spacing.md,
    marginTop: spacing.lg,
    gap: 8,
  },
  reasonsTitle: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 13,
    color: colors.textHeading,
    marginBottom: 2,
  },
  reasonRow: {
    flexDirection: 'row',
    gap: 8,
  },
  reasonBullet: {
    fontFamily: fonts.bodyRegular,
    fontSize: 13,
    color: colors.brand,
  },
  reasonText: {
    flex: 1,
    fontFamily: fonts.bodyRegular,
    fontSize: 12.5,
    color: colors.textBody,
    lineHeight: 18,
  },
});
