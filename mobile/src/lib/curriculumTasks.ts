import type { CurriculumTopic } from '@talkstage/shared-data/curriculumData';
import { voiceSceneForTopic } from '@talkstage/shared-data/voiceScenes';
import { t } from '../i18n';
import { effectivePlan, hasSkill, type LearningPlan } from './learningPlan';

export type CurriculumTaskType = 'listening' | 'lesson' | 'vocab' | 'reading' | 'review' | 'scene' | 'writing';

export type CurriculumTask = {
  id: string;
  topic: CurriculumTopic;
  type: CurriculumTaskType;
  title: string;
  subtitle: string;
  done: boolean;
  /** Okuma görevinde hedef hikaye (Ana Sayfa doğrudan bu hikayeyi açar). */
  readingSlug?: string;
  /** Konu tekrarı görevinde, Mivo ile konuşulacak konu(lar). */
  reviewTopics?: CurriculumTopic[];
  /** Sesli sahne görevi: açılacak sahnenin id'si (Sahneler sekmesinde `openSceneId`). */
  sceneId?: string;
  /** "Gerçek mesaj yaz" görevi: yazma görevinin id'si. */
  writingTaskId?: string;
};

/** Minimal shape needed from a real reading passage — callers pass their
 * already-fetched `ReadingPassageOut[]` for the level (`/reading`, filtered
 * to `cefr_level` and sorted by `sort_order`, same ordering ReadingListScreen
 * already relies on for its own lock sequence). */
export type ReadingPassageSignal = { slug: string; title: string };

export type CurriculumTaskSignals = {
  /** Artık görevleri etkilemiyor (kelimeler Bugün'deki günlük kelime kartında); eski çağıranlar uyumlu kalsın diye duruyor. */
  savedWordsLower?: Set<string>;
  lessonQuizDoneCodes: Set<string>;
  /** `topic_chat_completed_<id>` bayrakları; konu tekrarının id'si `<topicCode>_review`. */
  chatCompletedTopicCodes: Set<string>;
  /** Artık görevleri etkilemiyor (podcast yolda değil, Özellikler'de); eski çağıranlar uyumlu kalsın diye duruyor. */
  completedPodcastEpisodeIds?: Set<string>;
  readingPassagesForLevel: ReadingPassageSignal[];
  completedReadingSlugs: Set<string>;
  /** Kişisel plan (null = plan seçilmemiş, bugünkü "Dengeli" yol). */
  plan?: LearningPlan | null;
  /** Bu seviyenin hazır sesli sahneleri, sırayla (konulara birer birer dağıtılır). */
  scenesForLevel?: { id: string; title: string }[];
  /** Canlı Mivo sahnesi oynanmış sahneler (en az 2 yıldız). */
  playedSceneIds?: Set<string>;
  /** Bu seviyenin "Gerçek mesaj yaz" görevleri; her konunun kendi görevleri (slot sırasıyla). */
  writingTasksForLevel?: { id: string; title: string; topicCode: string }[];
  completedWritingIds?: Set<string>;
};

/** Topic title without the Turkish name in parentheses: "Present Simple Tense (Geniş Zaman)" -> "Present Simple Tense". */
export function shortTopicTitle(topic: CurriculumTopic): string {
  return topic.title.replace(/\s*\(.*$/, '');
}

/** Id of a topic's "Mivo ile Konu Tekrarı" task (also its `topic_chat_completed_*` flag). */
export function reviewIdForTopic(topicCode: string): string {
  return `${topicCode}_review`;
}

/** Review ids of every topic of a level — used to load their completion flags. */
export function reviewIdsForTopics(topics: CurriculumTopic[]): string[] {
  return topics.map((tp) => reviewIdForTopic(tp.code));
}

/** Splits `count` readings over `topics` topics as evenly as possible; the first topics get the extra ones
 * (in A1 these are exactly the topics next to the tiny 1-minute mini lessons). */
function readingSizes(count: number, topics: number): number[] {
  const base = Math.floor(count / topics);
  const extra = count % topics;
  return Array.from({ length: topics }, (_, i) => base + (i < extra ? 1 : 0));
}

/**
 * Turns a level into a path of topics, each a short ordered list of steps (no days):
 *  - grammar lesson + mini test, then the topic's readings, the voice scene, "Mivo ile Konu Tekrarı", and
 *    the "Gerçek mesaj yaz" task (the written twin of the voice scene).
 * Target words are NOT a task: they are shown in the topic info card, with an optional "add to my chest" button.
 * All of a level's readings are spread over its topics (see `readingSizes`), so nothing is left unused.
 * Steps unlock in order (`isTaskLocked`). Every step on the path is required: nothing optional sits on it
 * (podcasts live in Özellikler for whoever wants them).
 */
/** Rough minutes per task (shown on a topic's step list). */
export const TASK_MINUTES: Record<CurriculumTaskType, number> = {
  lesson: 8,
  reading: 5,
  scene: 6,
  writing: 7,
  review: 5,
  listening: 0, // not on the path any more
  vocab: 1,
};

export function buildTaskQueueForLevel(
  topics: CurriculumTopic[],
  signals: CurriculumTaskSignals,
  _levelCode?: string
): CurriculumTask[] {
  const plan = effectivePlan(signals.plan);
  const fullGrammar = plan.grammar_mode === 'full';
  const wantsReading = hasSkill(plan, 'reading');
  const wantsSpeaking = hasSkill(plan, 'speaking');
  const wantsWriting = hasSkill(plan, 'writing');
  // Speaking focus: one story per topic is enough next to the scene; the rest stay in the reading library.
  const readingsPerTopic = plan.preset === 'speaking' ? 1 : Infinity;
  const writings = signals.writingTasksForLevel ?? [];

  const queue: CurriculumTask[] = [];
  const readings = wantsReading ? signals.readingPassagesForLevel : [];
  const sizes = readingSizes(readings.length, Math.max(1, topics.length));
  let readingCursor = 0;

  topics.forEach((topic, topicIdx) => {
    const own = readings.slice(readingCursor, readingCursor + sizes[topicIdx]).slice(0, readingsPerTopic);
    readingCursor += sizes[topicIdx];

    let readingNo = 0;
    const readingTask = (passage: ReadingPassageSignal): CurriculumTask => ({
      id: `${topic.code}_reading_${++readingNo}`,
      topic,
      type: 'reading',
      title: passage.title,
      subtitle: t("Hikaye — dinle ve cümleleri tamamla"),
      done: signals.completedReadingSlugs.has(passage.slug),
      readingSlug: passage.slug,
    });
    const lesson: CurriculumTask | undefined = fullGrammar
      ? {
          id: `${topic.code}_lesson`,
          topic,
          type: 'lesson',
          title: shortTopicTitle(topic),
          subtitle: t("Kuralı incele ve testi başarıyla çöz"),
          done: signals.lessonQuizDoneCodes.has(topic.code),
        }
      : undefined;
    // Every topic has its own voice scene (independent of the video scenes).
    const voiceScene = voiceSceneForTopic(topic.code);
    const sceneEntry = wantsSpeaking && voiceScene ? { id: voiceScene.id, title: voiceScene.titleTr } : undefined;
    const scene: CurriculumTask | undefined = sceneEntry
      ? {
          id: `${topic.code}_scene`,
          topic,
          type: 'scene',
          title: sceneEntry.title,
          subtitle: t("Sesli sahne — canlı konuşma provası"),
          done: signals.playedSceneIds?.has(sceneEntry.id) ?? false,
          sceneId: sceneEntry.id,
        }
      : undefined;
    // The Mivo topic review closes the grammar path; without it, it stands in for speaking practice
    // when this level has no scene left for the topic (C1/C2, or more topics than scenes).
    const reviewId = reviewIdForTopic(topic.code);
    const review: CurriculumTask | undefined =
      fullGrammar || (wantsSpeaking && !sceneEntry)
        ? {
            id: reviewId,
            topic,
            type: 'review',
            title: fullGrammar
              ? t("Tekrar: {{topic}}", { topic: shortTopicTitle(topic) })
              : t("Mivo ile sohbet: {{topic}}", { topic: shortTopicTitle(topic) }),
            subtitle: t("Kuralı birlikte hatırla, sonra kendi cümlelerini kur"),
            done: signals.chatCompletedTopicCodes.has(reviewId),
            reviewTopics: [topic],
          }
        : undefined;

    const readingTasks = own.map(readingTask);
    // Order of the core steps: grammar first on the grammar path; otherwise the scene opens the topic.
    const ordered: (CurriculumTask | undefined)[] = fullGrammar
      ? [lesson, readingTasks[0], readingTasks[1], scene, ...readingTasks.slice(2), review]
      : [scene, ...readingTasks, review];
    const core = ordered.filter((tk): tk is CurriculumTask => Boolean(tk));

    // Writing closes the topic: the topic's own tasks (the real-message twin of its voice scene, plus the
    // stage review on the last topic of a stage) in order.
    const templates = wantsWriting ? writings.filter((w) => w.topicCode === topic.code) : [];
    templates.forEach((entry, i) => {
      core.push({
        id: `${topic.code}_writing_${i + 1}`,
        topic,
        type: 'writing',
        title: entry.title,
        subtitle: t("Gerçek mesaj yaz — Mivo dilini ve tonunu değerlendirir"),
        done: signals.completedWritingIds?.has(entry.id) ?? false,
        writingTaskId: entry.id,
      });
    });

    queue.push(...core);
  });

  return queue;
}

/** Every step on the path counts toward progression (the path holds no optional steps). Kept as a function so
 * old callers keep working. */
export function isCoreTask(task: CurriculumTask): boolean {
  return task.type !== 'listening';
}

/** What the Bugün banner suggests next: the first unfinished core task, in path order. */
export function nextSuggestedTask(queue: CurriculumTask[]): CurriculumTask | undefined {
  return queue.find((t) => !t.done && isCoreTask(t));
}

/** A topic counts as done for progression once its core tasks are done. */
export function isTopicCoreDone(queue: CurriculumTask[], topicCode: string): boolean {
  const core = queue.filter((t) => t.topic.code === topicCode && isCoreTask(t));
  return core.length > 0 && core.every((t) => t.done);
}

/** Level-level counterpart: every topic's core tasks are done. */
export function isLevelCoreDone(queue: CurriculumTask[]): boolean {
  const core = queue.filter(isCoreTask);
  return core.length > 0 && core.every((t) => t.done);
}

/** Step lock: a step opens once every CORE step before it (also across topics) is done, so the path is
 * walked in order.
 * `isReviewLevel` (the user's real placement is above this level) bypasses the gate entirely — review
 * levels are optional, not a fresh unlock-by-mastery ladder. */
export function isTaskLocked(queue: CurriculumTask[], task: CurriculumTask, isReviewLevel: boolean): boolean {
  if (isReviewLevel) return false;
  const idx = queue.indexOf(task);
  if (idx <= 0) return false;
  return queue.slice(0, idx).some((q) => isCoreTask(q) && !q.done);
}

export function isTopicFullyDone(queue: CurriculumTask[], topicCode: string): boolean {
  const tasks = queue.filter((t) => t.topic.code === topicCode);
  return tasks.length > 0 && tasks.every((t) => t.done);
}
