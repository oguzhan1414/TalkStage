import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { calibrationImages, cefrLevelImages } from '../../assets/images';
import { Button } from '../../components/Button';
import { MicPermissionPrompt } from '../../components/MicPermissionPrompt';
import { Waveform } from '../../components/Waveform';
import { useOnboarding } from '../../context/OnboardingContext';
import { useVoiceRecorder } from '../../hooks/useVoiceRecorder';
import { api, ApiError } from '../../lib/api';
import { colors, radii, shadow, spacing, typography } from '../../theme/tokens';
import type { CalibrationResult } from '../../types/api';
import type { OnboardingStackScreenProps } from '../../navigation/types';

const QUESTIONS = [
  'Introduce yourself: your name, job, and why you’re learning English.',
  'Tell me about an interesting thing that happened to you last week.',
  'What’s a goal you want to achieve in the next few years, and why?',
];

export function CalibrationScreen({ route }: OnboardingStackScreenProps<'Calibration'>) {
  const { interests } = route.params;
  const { completeOnboarding } = useOnboarding();
  const { isRecording, meteringDb, permissionDenied, start, stop } = useVoiceRecorder();

  const [questionIndex, setQuestionIndex] = useState(0);
  const [answerUris, setAnswerUris] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CalibrationResult | null>(null);

  const isLastQuestion = questionIndex === QUESTIONS.length - 1;

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

  const submit = async (uris: string[]) => {
    setSubmitting(true);
    setError(null);
    try {
      const form = new FormData();
      uris.forEach((uri, index) => {
        form.append(
          'answers',
          // React Native's fetch accepts this file-descriptor object shape for multipart bodies.
          { uri, name: `answer-${index}.m4a`, type: 'audio/m4a' } as unknown as Blob,
        );
      });
      const calibration = await api.postForm<CalibrationResult>('/onboarding/calibrate', form);
      setResult(calibration);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Kalibrasyon şu an tamamlanamadı.');
    } finally {
      setSubmitting(false);
    }
  };

  const finish = () => completeOnboarding(interests);

  if (result) {
    const levelImage = cefrLevelImages[result.cefr_level];
    return (
      <SafeAreaView style={styles.container}>
        <View style={[styles.resultCard, shadow.card]}>
          {levelImage ? (
            <Image source={levelImage} style={styles.resultLevelImage} resizeMode="contain" />
          ) : null}
          <Text style={styles.resultLevel}>{result.cefr_level}</Text>
          <Text style={styles.resultSummary}>{result.summary_tr}</Text>
        </View>
        <Button label="Devam Et" onPress={finish} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sesli Seviye Kalibrasyonu</Text>
        <Text style={styles.subtitle}>
          Soru {questionIndex + 1} / {QUESTIONS.length} — İngilizce cevapla, mikrofona konuş.
        </Text>
      </View>

      {permissionDenied ? (
        <MicPermissionPrompt onRequestPermission={start} />
      ) : isRecording ? (
        <Waveform meteringDb={meteringDb} active={isRecording} />
      ) : (
        <Image source={calibrationImages.micOrb} style={styles.micImage} resizeMode="contain" />
      )}

      <View style={[styles.questionCard, shadow.card]}>
        <Text style={styles.questionText}>{QUESTIONS[questionIndex]}</Text>
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Button
        label={submitting ? 'Değerlendiriliyor…' : isRecording ? 'Kaydı Bitir' : 'Kayda Başla'}
        onPress={handleToggleRecording}
        loading={submitting}
        disabled={submitting || permissionDenied}
        icon={<Ionicons name={isRecording ? 'stop-circle' : 'mic'} size={20} color="#FFFFFF" />}
      />

      <Button label="Şimdilik Atla" variant="ghost" onPress={finish} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
    justifyContent: 'center',
    gap: spacing.lg,
  },
  header: {
    gap: spacing.xs,
  },
  title: { ...typography.h1 },
  subtitle: { ...typography.body },
  micImage: {
    width: 140,
    height: 140,
    alignSelf: 'center',
  },
  questionCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.lg,
  },
  questionText: {
    ...typography.h3,
  },
  error: {
    ...typography.caption,
    color: colors.error,
  },
  resultCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.xl,
    alignItems: 'center',
    gap: spacing.sm,
  },
  resultLevelImage: {
    width: 120,
    height: 120,
  },
  resultLevel: {
    ...typography.h1,
    color: colors.brand,
  },
  resultSummary: {
    ...typography.body,
    textAlign: 'center',
  },
});
