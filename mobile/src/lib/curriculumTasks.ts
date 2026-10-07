import type { CurriculumTopic } from '@talkstage/shared-data/curriculumData';
import { findGrammarLesson } from '@talkstage/shared-data/grammarLessons';
import { PODCAST_EPISODES, type PodcastEpisode } from '../data/podcastData';
import { t } from '../i18n';

export type CurriculumTaskType = 'lesson' | 'vocab' | 'listening' | 'reading' | 'practice';

export type CurriculumTask = {
  id: string;
  topic: CurriculumTopic;
  type: CurriculumTaskType;
  title: string;
  subtitle: string;
  done: boolean;
  podcastEpisode?: PodcastEpisode;
  /** Okuma görevinde hedef hikaye (Ana Sayfa doğrudan bu hikayeyi açar). */
  readingSlug?: string;
};

/** Minimal shape needed from a real reading passage — callers pass their
 * already-fetched `ReadingPassageOut[]` for the level (`/reading`, filtered
 * to `cefr_level` and sorted by `sort_order`, same ordering ReadingListScreen
 * already relies on for its own lock sequence). */
export type ReadingPassageSignal = { slug: string; title: string };

export type CurriculumTaskSignals = {
  savedWordsLower: Set<string>;
  lessonQuizDoneCodes: Set<string>;
  chatCompletedTopicCodes: Set<string>;
  completedPodcastEpisodeIds: Set<string>;
  readingPassagesForLevel: ReadingPassageSignal[];
  completedReadingSlugs: Set<string>;
};

const podcastById = new Map(PODCAST_EPISODES.map((ep) => [ep.id, ep]));

/**
 * Flattens a level's topics into the ordered, task-granular queue that
 * HomeScreen (Bugün) renders from — both its next-task banner and its full,
 * browsable chapter path below use this one calculation so the two can never
 * disagree about what's done/next/locked (the app's repeat lesson, see
 * `computeFullCompletion` in curriculumData.ts for the topic-level precedent
 * this extends). Per topic, in order: lesson -> vocab -> listening (only if
 * the topic's grammar lesson has a real `relatedPodcastId`) -> reading (only
 * if a real passage exists at this topic's position in the level — see
 * below) -> practice (only for `moduleType === 'speaking'` topics; reading's
 * practice need is now covered by the universal reading task above, and
 * vocab-type topics have no separate practice step — the vocab task already
 * *is* the practice for those).
 *
 * Reading, like listening, only ever gets a task when real content actually
 * backs it — there's no curated 1:1 topic<->passage link the way
 * `relatedPodcastId` links topics to podcasts, so this positionally matches
 * the Nth topic overall in the level to the Nth real passage at that level
 * (`readingPassagesForLevel[N-1]`). A level with fewer passages than topics
 * (e.g. B1 currently has 10 topics but only 2 seeded passages) simply stops
 * emitting reading tasks past the last real passage — never a fake/
 * impossible-to-complete node.
 */
export function buildTaskQueueForLevel(
  topics: CurriculumTopic[],
  signals: CurriculumTaskSignals
): CurriculumTask[] {
  const queue: CurriculumTask[] = [];

  topics.forEach((topic, topicIdx) => {
    const lessonDone = signals.lessonQuizDoneCodes.has(topic.code);
    queue.push({
      id: `${topic.code}_lesson`,
      topic,
      type: 'lesson',
      title: t("Konu Anlatımı & Mini Test"),
      subtitle: t("Kuralı incele ve testi başarıyla çöz"),
      done: lessonDone,
    });

    const vocabDone = topic.targetWords.every((w) => signals.savedWordsLower.has(w.trim().toLowerCase()));
    queue.push({
      id: `${topic.code}_vocab`,
      topic,
      type: 'vocab',
      title: t("Hedef Kelimeler ({{length}})", { length: topic.targetWords.length }),
      subtitle: topic.targetWords.join(', '),
      done: vocabDone,
    });

    const relatedPodcastId = findGrammarLesson(topic.code)?.relatedPodcastId;
    const episode = relatedPodcastId ? podcastById.get(relatedPodcastId) : undefined;
    if (episode) {
      queue.push({
        id: `${topic.code}_listening`,
        topic,
        type: 'listening',
        title: episode.title,
        subtitle: episode.subtitle,
        done: signals.completedPodcastEpisodeIds.has(episode.id),
        podcastEpisode: episode,
      });
    }

    const passage = signals.readingPassagesForLevel[topicIdx];
    if (passage) {
      queue.push({
        id: `${topic.code}_reading`,
        topic,
        type: 'reading',
        title: passage.title,
        subtitle: t("Smart Reading — hikaye & ses sahnesi"),
        done: signals.completedReadingSlugs.has(passage.slug),
        readingSlug: passage.slug,
      });
    }

    if (topic.moduleType === 'speaking') {
      queue.push({
        id: `${topic.code}_practice`,
        topic,
        type: 'practice',
        title: t("Mivo ile Canlı Pratik"),
        subtitle: t("Bu kuralı Mivo ile konuşarak pekiştir"),
        done: signals.chatCompletedTopicCodes.has(topic.code),
      });
    }
  });

  return queue;
}

/** Topic-level lock: tasks within the SAME topic are always free to do in
 * any order (listen first, then vocab, then the lesson — user's choice),
 * but a topic as a WHOLE stays locked until the immediately preceding
 * topic is fully done (`isTopicFullyDone`). `isReviewLevel` (the user's
 * real placement is above this level) bypasses the gate entirely, same as
 * before — review levels are optional, not a fresh unlock-by-mastery
 * ladder. */
export function isTopicLocked(
  queue: CurriculumTask[],
  topics: CurriculumTopic[],
  topicCode: string,
  isReviewLevel: boolean
): boolean {
  if (isReviewLevel) return false;
  const idx = topics.findIndex((t) => t.code === topicCode);
  if (idx <= 0) return false;
  return !isTopicFullyDone(queue, topics[idx - 1].code);
}

export function isTopicFullyDone(queue: CurriculumTask[], topicCode: string): boolean {
  const tasks = queue.filter((t) => t.topic.code === topicCode);
  return tasks.length > 0 && tasks.every((t) => t.done);
}
