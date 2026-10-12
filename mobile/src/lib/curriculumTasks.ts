import type { CurriculumTopic } from '@talkstage/shared-data/curriculumData';
import { findGrammarLesson } from '@talkstage/shared-data/grammarLessons';
import { PODCAST_EPISODES, type PodcastEpisode } from '../data/podcastData';
import { t } from '../i18n';

export type CurriculumTaskType = 'listening' | 'lesson' | 'vocab' | 'reading' | 'review';

export type CurriculumTask = {
  id: string;
  topic: CurriculumTopic;
  type: CurriculumTaskType;
  title: string;
  subtitle: string;
  done: boolean;
  /** Konu bloğu içindeki gün (1 = öğren, ortadakiler = oku/dinle, son = pekiştir). */
  day: number;
  /** Bu konunun bloğu kaç gün sürüyor. */
  daysInTopic: number;
  podcastEpisode?: PodcastEpisode;
  /** Okuma görevinde hedef hikaye (Ana Sayfa doğrudan bu hikayeyi açar). */
  readingSlug?: string;
  /** Konu tekrarı görevinde, Mivo ile konuşulacak konu(lar). */
  reviewTopics?: CurriculumTopic[];
};

/** Minimal shape needed from a real reading passage — callers pass their
 * already-fetched `ReadingPassageOut[]` for the level (`/reading`, filtered
 * to `cefr_level` and sorted by `sort_order`, same ordering ReadingListScreen
 * already relies on for its own lock sequence). */
export type ReadingPassageSignal = { slug: string; title: string };

export type CurriculumTaskSignals = {
  /** Artık görevleri etkilemiyor (kelime ekleme ayrı bir görev değil); eski çağıranlar uyumlu kalsın diye duruyor. */
  savedWordsLower?: Set<string>;
  lessonQuizDoneCodes: Set<string>;
  /** `topic_chat_completed_<id>` bayrakları; konu tekrarının id'si `<topicCode>_review`. */
  chatCompletedTopicCodes: Set<string>;
  completedPodcastEpisodeIds: Set<string>;
  readingPassagesForLevel: ReadingPassageSignal[];
  completedReadingSlugs: Set<string>;
};

const allEpisodes = PODCAST_EPISODES;
const podcastById = new Map(allEpisodes.map((ep) => [ep.id, ep]));

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

/** One podcast per topic where possible: the lesson's own related episode first, then any unused episode of the level. */
function assignPodcasts(topics: CurriculumTopic[], level: string): (PodcastEpisode | undefined)[] {
  const prefix = `podcast_${level.toLowerCase()}_`;
  const levelEpisodes = allEpisodes.filter((ep) => ep.id.startsWith(prefix));
  const used = new Set<string>();
  const result: (PodcastEpisode | undefined)[] = topics.map((topic) => {
    const relatedId = findGrammarLesson(topic.code)?.relatedPodcastId;
    const ep = relatedId ? podcastById.get(relatedId) : undefined;
    if (ep && ep.id.startsWith(prefix) && !used.has(ep.id)) {
      used.add(ep.id);
      return ep;
    }
    return undefined;
  });
  return result.map((ep) => {
    if (ep) return ep;
    const free = levelEpisodes.find((e) => !used.has(e.id));
    if (free) used.add(free.id);
    return free;
  });
}

/**
 * Turns a level into a day-by-day path. Every topic is a block of days:
 *  - Day 1 (learn):       grammar lesson + mini test, then that day's reading
 *  - Middle days (explore): the next reading(s), the first one together with the topic's podcast (bonus)
 *  - Last day (consolidate): the last reading when the topic has 3 or more, then "Mivo ile Konu Tekrarı"
 *                            (a short recap of Day 1's rule, then the student builds sentences)
 * Target words are NOT a task: they are shown in the topic info card, with an optional "add to my chest" button.
 * All of a level's readings are spread over its topics (see `readingSizes`), so nothing is left unused.
 * Steps unlock in order (`isTaskLocked`); the podcast is bonus.
 */
export function buildTaskQueueForLevel(
  topics: CurriculumTopic[],
  signals: CurriculumTaskSignals,
  levelCode?: string
): CurriculumTask[] {
  const queue: CurriculumTask[] = [];
  const level = levelCode ?? topics[0]?.code.split('_')[0] ?? 'A1';
  const readings = signals.readingPassagesForLevel;
  const sizes = readingSizes(readings.length, Math.max(1, topics.length));
  const podcasts = assignPodcasts(topics, level);
  let readingCursor = 0;

  topics.forEach((topic, topicIdx) => {
    const own = readings.slice(readingCursor, readingCursor + sizes[topicIdx]);
    readingCursor += sizes[topicIdx];

    const first = own[0];
    const hasThree = own.length >= 3;
    const middle = hasThree ? own.slice(1, own.length - 1) : own.slice(1);
    const closing = hasThree ? own[own.length - 1] : undefined;
    const perDay = middle.length > 3 ? 2 : 1;
    const middleDays: (typeof own)[] = [];
    for (let i = 0; i < middle.length; i += perDay) middleDays.push(middle.slice(i, i + perDay));
    const episode = podcasts[topicIdx];
    if (episode && middleDays.length === 0) middleDays.push([]);

    const daysInTopic = 2 + middleDays.length;
    let readingNo = 0;
    const readingTask = (passage: ReadingPassageSignal, day: number): CurriculumTask => ({
      id: `${topic.code}_reading_${++readingNo}`,
      topic,
      type: 'reading',
      title: passage.title,
      subtitle: t("Smart Reading — hikaye & ses sahnesi"),
      done: signals.completedReadingSlugs.has(passage.slug),
      day,
      daysInTopic,
      readingSlug: passage.slug,
    });

    // Day 1 — learn
    queue.push({
      id: `${topic.code}_lesson`,
      topic,
      type: 'lesson',
      title: shortTopicTitle(topic),
      subtitle: t("Kuralı incele ve testi başarıyla çöz"),
      done: signals.lessonQuizDoneCodes.has(topic.code),
      day: 1,
      daysInTopic,
    });
    if (first) queue.push(readingTask(first, 1));

    // Middle days — read (+ listen)
    middleDays.forEach((dayReadings, i) => {
      const day = 2 + i;
      dayReadings.forEach((p) => queue.push(readingTask(p, day)));
      if (i === 0 && episode) {
        queue.push({
          id: `${topic.code}_listening`,
          topic,
          type: 'listening',
          title: episode.title,
          subtitle: episode.subtitle,
          done: signals.completedPodcastEpisodeIds.has(episode.id),
          day,
          daysInTopic,
          podcastEpisode: episode,
        });
      }
    });

    // Last day — consolidate (reading first, then the Mivo conversation as the finale)
    if (closing) queue.push(readingTask(closing, daysInTopic));
    const reviewId = reviewIdForTopic(topic.code);
    queue.push({
      id: reviewId,
      topic,
      type: 'review',
      title: t("Tekrar: {{topic}}", { topic: shortTopicTitle(topic) }),
      subtitle: t("Kuralı birlikte hatırla, sonra kendi cümlelerini kur"),
      done: signals.chatCompletedTopicCodes.has(reviewId),
      day: daysInTopic,
      daysInTopic,
      reviewTopics: [topic],
    });
  });

  return queue;
}

/** Core tasks (konu anlatımı + mini test, okuma, Mivo konu tekrarı) drive progression.
 * Only the podcast is "bonus": it never holds the next day, topic or level back. */
export function isCoreTask(task: CurriculumTask): boolean {
  return task.type !== 'listening';
}

/** What the Bugün banner suggests next: the first unfinished core task, in path order. */
export function nextSuggestedTask(queue: CurriculumTask[]): CurriculumTask | undefined {
  return queue.find((t) => !t.done && isCoreTask(t));
}

/** One numbered day of the level path: all tasks of one day of one topic block. */
export type CurriculumDay = {
  key: string;
  /** 1-based and continuous over the whole level ("Gün 1" … "Gün 36"). */
  no: number;
  topic: CurriculumTopic;
  tasks: CurriculumTask[];
  /** All core tasks of the day are done (the bonus podcast does not count). */
  done: boolean;
};

/** Groups the flat queue into numbered days, keeping queue order. */
export function groupTasksIntoDays(queue: CurriculumTask[]): CurriculumDay[] {
  const days: CurriculumDay[] = [];
  let last: CurriculumDay | undefined;
  for (const task of queue) {
    const key = `${task.topic.code}_d${task.day}`;
    if (!last || last.key !== key) {
      last = { key, no: days.length + 1, topic: task.topic, tasks: [], done: false };
      days.push(last);
    }
    last.tasks.push(task);
  }
  for (const day of days) {
    const core = day.tasks.filter(isCoreTask);
    day.done = (core.length > 0 ? core : day.tasks).every((t) => t.done);
  }
  return days;
}

/** What a day contains, in words ("Konu anlatımı · Okuma"). */
export function daySummary(day: CurriculumDay): string {
  const readings = day.tasks.filter((tk) => tk.type === 'reading').length;
  const parts: string[] = [];
  if (day.tasks.some((tk) => tk.type === 'lesson')) parts.push(t("Konu anlatımı"));
  if (readings > 0) parts.push(readings > 1 ? t("{{n}} okuma", { n: readings }) : t("Okuma"));
  if (day.tasks.some((tk) => tk.type === 'listening')) parts.push(t("Podcast"));
  if (day.tasks.some((tk) => tk.type === 'review')) parts.push(t("Mivo sohbeti"));
  return parts.join(' · ');
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
 * walked in order. The podcast is bonus: it never blocks the steps after it.
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
