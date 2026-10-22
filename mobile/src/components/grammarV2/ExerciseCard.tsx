import Ionicons from '@expo/vector-icons/Ionicons';
import { File } from 'expo-file-system';
import { useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import type { GrammarV2Exercise } from '@talkstage/shared-data/grammarV2';

import { useVoiceRecorder } from '../../hooks/useVoiceRecorder';
import { t } from '../../i18n';
import { api, ApiError } from '../../lib/api';
import { colors, fonts, radii } from '../../theme/tokens';
import type { TranscribeResponse } from '../../types/api';
import { MicPermissionPrompt } from '../MicPermissionPrompt';
import { Waveform } from '../Waveform';
import { fillVars, type LessonVars } from './MiniMarkdown';

/** How one exercise ended: right (first or second try), revealed after two tries, or skipped (spoken only). */
export type ExerciseOutcome = { result: 'correct' | 'revealed' | 'skipped'; firstTry: boolean; answer: string };

type CheckResult = { correct: boolean; feedback: string; corrected: string };

type Props = {
  index: number;
  total: number;
  exercise: GrammarV2Exercise;
  lesson: { code: string; title: string; target: string };
  vars: LessonVars;
  onDone: (outcome: ExerciseOutcome) => void;
};

/** Case, punctuation and apostrophe-insensitive comparison for typed answers. */
export function normalizeAnswer(s: string): string {
  return s
    .toLowerCase()
    .replace(/[’`]/g, "'")
    .replace(/["“”]/g, '')
    .replace(/[.!?,;:]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function seededShuffle<T>(items: T[], seed: string): T[] {
  let h = 0;
  for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) | 0;
  const out = [...items];
  for (let i = out.length - 1; i > 0; i -= 1) {
    h = (h * 1103515245 + 12345) | 0;
    const j = Math.abs(h) % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  // Never show the words already in the right order.
  if (out.join(' ') === items.join(' ') && out.length > 1) [out[0], out[1]] = [out[1], out[0]];
  return out;
}

/**
 * One exercise of a new-curriculum grammar lesson. Two tries: a wrong first answer gets a hint and another go,
 * a second wrong answer shows the right answer and its reason. Multiple choice, word order and exact text
 * matches are checked on the device; anything else (a correct answer phrased differently, open questions,
 * speech) is judged by Mivo (`POST /grammar/check`).
 */
export function ExerciseCard({ index, total, exercise, lesson, vars, onDone }: Props) {
  const [tries, setTries] = useState(0);
  const [status, setStatus] = useState<'answering' | 'correct' | 'revealed' | 'skipped'>('answering');
  const [hint, setHint] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);
  const [text, setText] = useState('');
  const [picked, setPicked] = useState<number[]>([]);
  const [chosen, setChosen] = useState<string | null>(null);
  const [heard, setHeard] = useState<string | null>(null);
  const [coachNote, setCoachNote] = useState<string | null>(null);
  const recorder = useVoiceRecorder();

  const prompt = fillVars(exercise.prompt, vars);
  const shuffled = useMemo(
    () => (exercise.kind === 'order' ? seededShuffle(exercise.words, `${lesson.code}-${index}`) : []),
    [exercise, lesson.code, index]
  );
  const done = status !== 'answering';

  const finish = (result: 'correct' | 'revealed' | 'skipped', answer: string, firstTry: boolean) => {
    setStatus(result);
    onDone({ result, firstTry, answer });
  };

  const fail = (answer: string, hintText: string) => {
    const next = tries + 1;
    setTries(next);
    if (next >= 2) {
      finish('revealed', answer, false);
    } else {
      setHint(hintText);
    }
  };

  const askMivo = async (answer: string, mode: 'text' | 'spoken', expected: string): Promise<CheckResult | null> => {
    try {
      return await api.post<CheckResult>('/grammar/check', {
        lesson_code: lesson.code,
        lesson_title: lesson.title,
        target: lesson.target || lesson.title,
        task: `${exercise.label}: ${prompt}`.slice(0, 600),
        expected: expected.slice(0, 600),
        answer: answer.slice(0, 600),
        mode,
      });
    } catch {
      return null;
    }
  };

  const defaultHint = t("Olmadı, bir kez daha dene. İpucu: {{target}}", { target: lesson.target || lesson.title });

  const checkChoice = (option: string) => {
    if (done || exercise.kind !== 'choice') return;
    setChosen(option);
    if (exercise.correct.includes(option)) finish('correct', option, tries === 0);
    else fail(option, defaultHint);
  };

  const checkOrder = () => {
    if (exercise.kind !== 'order') return;
    const answer = picked.map((i) => shuffled[i]).join(' ');
    if (normalizeAnswer(answer) === normalizeAnswer(exercise.answer)) {
      finish('correct', answer, tries === 0);
    } else {
      setPicked([]);
      fail(answer, defaultHint);
    }
  };

  const checkText = async () => {
    if (exercise.kind !== 'text' || !text.trim() || checking) return;
    const answer = text.trim();
    if (exercise.answers.some((a) => normalizeAnswer(fillVars(a, vars)) === normalizeAnswer(answer))) {
      finish('correct', answer, tries === 0);
      return;
    }
    setChecking(true);
    const result = await askMivo(answer, 'text', exercise.answers.join(' / '));
    setChecking(false);
    if (result?.correct) {
      setCoachNote(result.feedback);
      finish('correct', answer, tries === 0);
    } else {
      fail(answer, result?.feedback || defaultHint);
    }
  };

  const toggleRecording = async () => {
    if (exercise.kind !== 'spoken' || checking) return;
    if (!recorder.isRecording) {
      setHeard(null);
      await recorder.start();
      return;
    }
    const uri = await recorder.stop();
    if (!uri) return;
    setChecking(true);
    try {
      const form = new FormData();
      form.append('audio', new File(uri));
      const { transcript } = await api.postForm<TranscribeResponse>('/chat/transcribe', form);
      const said = transcript.trim();
      setHeard(said);
      if (!said) {
        setHint(t("Seni duyamadım. Biraz daha yüksek sesle tekrar dene."));
        return;
      }
      const result = await askMivo(said, 'spoken', exercise.example);
      if (result?.correct) {
        setCoachNote(result.feedback);
        finish('correct', said, tries === 0);
      } else {
        fail(said, result?.feedback || defaultHint);
      }
    } catch (err) {
      setHint(err instanceof ApiError ? err.message : t("Ses kontrol edilemedi. Tekrar dene."));
    } finally {
      setChecking(false);
    }
  };

  const rightAnswer =
    exercise.kind === 'choice'
      ? exercise.correct.join(' / ')
      : exercise.kind === 'order'
      ? exercise.answer
      : exercise.kind === 'text'
      ? exercise.answers.join(' / ')
      : exercise.example;

  return (
    <View style={[styles.card, done && (status === 'correct' ? styles.cardCorrect : styles.cardRevealed)]}>
      <View style={styles.headRow}>
        <Text style={styles.counter}>
          {index + 1}/{total}
        </Text>
        <Text style={styles.label}>{exercise.label}</Text>
      </View>
      <Text style={styles.prompt}>{prompt}</Text>

      {exercise.kind === 'choice' ? (
        <View style={styles.options}>
          {exercise.options.map((o) => {
            const isRight = done && exercise.correct.includes(o);
            const isWrongPick = chosen === o && !exercise.correct.includes(o);
            return (
              <Pressable
                key={o}
                onPress={() => checkChoice(o)}
                disabled={done}
                style={[styles.option, isRight && styles.optionRight, isWrongPick && styles.optionWrong]}
              >
                <Text style={[styles.optionText, isRight && styles.optionTextRight]}>{o}</Text>
              </Pressable>
            );
          })}
        </View>
      ) : null}

      {exercise.kind === 'order' ? (
        <View style={{ gap: 10 }}>
          <View style={styles.answerLine}>
            {picked.length === 0 ? <Text style={styles.placeholder}>{t("Kelimelere sırayla dokun")}</Text> : null}
            {picked.map((wi, pos) => (
              <Pressable
                key={`${wi}-${pos}`}
                disabled={done}
                onPress={() => setPicked((p) => p.filter((_, k) => k !== pos))}
                style={[styles.chip, styles.chipPicked]}
              >
                <Text style={styles.chipText}>{shuffled[wi]}</Text>
              </Pressable>
            ))}
          </View>
          {!done ? (
            <View style={styles.chips}>
              {shuffled.map((w, wi) =>
                picked.includes(wi) ? null : (
                  <Pressable key={wi} onPress={() => setPicked((p) => [...p, wi])} style={styles.chip}>
                    <Text style={styles.chipText}>{w}</Text>
                  </Pressable>
                )
              )}
            </View>
          ) : null}
          {!done && picked.length === shuffled.length ? (
            <Pressable onPress={checkOrder} style={styles.checkBtn}>
              <Text style={styles.checkText}>{t("Kontrol et")}</Text>
            </Pressable>
          ) : null}
        </View>
      ) : null}

      {exercise.kind === 'text' && !done ? (
        <View style={{ gap: 10 }}>
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder={t("Cevabını yaz…")}
            placeholderTextColor={colors.textMuted}
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            multiline
            maxLength={600}
          />
          <Pressable onPress={checkText} disabled={!text.trim() || checking} style={[styles.checkBtn, !text.trim() && styles.checkBtnOff]}>
            {checking ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.checkText}>{t("Kontrol et")}</Text>}
          </Pressable>
        </View>
      ) : null}

      {exercise.kind === 'spoken' && !done ? (
        recorder.permissionDenied ? (
          <MicPermissionPrompt />
        ) : (
          <View style={styles.spokenWrap}>
            <Pressable onPress={toggleRecording} disabled={checking} style={[styles.micBtn, recorder.isRecording && styles.micBtnOn]}>
              {checking ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Ionicons name={recorder.isRecording ? 'stop' : 'mic'} size={26} color="#FFFFFF" />
              )}
            </Pressable>
            {recorder.isRecording ? <Waveform meteringDb={recorder.meteringDb} active /> : null}
            <Text style={styles.micHint}>
              {recorder.isRecording ? t("Bitince durdur") : t("Dokun ve İngilizce söyle")}
            </Text>
            <Pressable onPress={() => finish('skipped', '', false)} hitSlop={8}>
              <Text style={styles.skip}>{t("Şimdi konuşamıyorum, geç")}</Text>
            </Pressable>
          </View>
        )
      ) : null}

      {heard ? <Text style={styles.heard}>{t("Duyduğum: “{{text}}”", { text: heard })}</Text> : null}

      {!done && hint ? (
        <View style={styles.hintBox}>
          <Ionicons name="bulb-outline" size={15} color="#B45309" />
          <Text style={styles.hintText}>{hint}</Text>
        </View>
      ) : null}

      {status === 'correct' ? (
        <View style={styles.resultBox}>
          <Text style={styles.resultTitle}>{tries === 0 ? t("Doğru!") : t("Doğru, ikinci denemede!")}</Text>
          {coachNote ? <Text style={styles.resultText}>{coachNote}</Text> : null}
          {exercise.explain ? <Text style={styles.resultText}>{fillVars(exercise.explain, vars)}</Text> : null}
        </View>
      ) : null}
      {status === 'revealed' ? (
        <View style={[styles.resultBox, styles.resultBoxRevealed]}>
          <Text style={styles.resultTitle}>
            {exercise.kind === 'spoken' ? t("Örnek cevap") : t("Doğru cevap")}: {fillVars(rightAnswer, vars)}
          </Text>
          {exercise.explain ? <Text style={styles.resultText}>{fillVars(exercise.explain, vars)}</Text> : null}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.lg,
    borderWidth: 1.5,
    borderColor: '#E0E7FF',
    padding: 16,
    gap: 12,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 1,
  },
  cardCorrect: { borderColor: '#A7F3D0' },
  cardRevealed: { borderColor: '#FDE68A' },
  headRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  counter: { fontFamily: fonts.mono, fontSize: 10.5, fontWeight: 'bold', color: colors.textMuted },
  label: {
    fontFamily: fonts.headingBold,
    fontSize: 11.5,
    color: colors.brand,
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    overflow: 'hidden',
  },
  prompt: { fontFamily: fonts.bodyMedium, fontSize: 15, lineHeight: 22, color: colors.textHeading },
  options: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  option: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: radii.pill,
    borderWidth: 1.5,
    borderColor: '#C7D2FE',
    backgroundColor: '#F8FAFF',
  },
  optionRight: { borderColor: colors.success, backgroundColor: '#ECFDF5' },
  optionWrong: { borderColor: colors.error, backgroundColor: '#FFF1F2' },
  optionText: { fontFamily: fonts.headingSemiBold, fontSize: 14, color: colors.textHeading },
  optionTextRight: { color: '#047857' },
  answerLine: {
    minHeight: 46,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    alignItems: 'center',
    padding: 8,
    borderRadius: 12,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#C7D2FE',
  },
  placeholder: { fontFamily: fonts.bodyRegular, fontSize: 12.5, color: colors.textMuted },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  chipPicked: { backgroundColor: '#EEF2FF', borderColor: '#C7D2FE' },
  chipText: { fontFamily: fonts.bodyMedium, fontSize: 14, color: colors.textHeading },
  input: {
    minHeight: 48,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.border,
    padding: 12,
    fontFamily: fonts.bodyRegular,
    fontSize: 15,
    color: colors.textHeading,
  },
  checkBtn: {
    alignSelf: 'flex-start',
    backgroundColor: colors.brand,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: radii.pill,
    minWidth: 120,
    alignItems: 'center',
  },
  checkBtnOff: { opacity: 0.45 },
  checkText: { fontFamily: fonts.headingBold, fontSize: 13.5, color: '#FFFFFF' },
  spokenWrap: { alignItems: 'center', gap: 8, paddingVertical: 4 },
  micBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
  },
  micBtnOn: { backgroundColor: colors.error },
  micHint: { fontFamily: fonts.bodyRegular, fontSize: 12, color: colors.textMuted },
  skip: { fontFamily: fonts.bodyMedium, fontSize: 12, color: colors.textMuted, textDecorationLine: 'underline' },
  heard: { fontFamily: fonts.bodyRegular, fontSize: 12.5, fontStyle: 'italic', color: colors.textBody },
  hintBox: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'flex-start',
    backgroundColor: '#FFFBEB',
    borderRadius: 10,
    padding: 10,
  },
  hintText: { flex: 1, fontFamily: fonts.bodyRegular, fontSize: 12.5, lineHeight: 18, color: '#78350F' },
  resultBox: { backgroundColor: '#ECFDF5', borderRadius: 10, padding: 10, gap: 4 },
  resultBoxRevealed: { backgroundColor: '#FFFBEB' },
  resultTitle: { fontFamily: fonts.headingBold, fontSize: 13, color: colors.textHeading },
  resultText: { fontFamily: fonts.bodyRegular, fontSize: 12.5, lineHeight: 18, color: colors.textBody },
});
