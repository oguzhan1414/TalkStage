import { PODCAST_EPISODES } from '../data/podcastData';
import { t } from '../i18n';
import { stageOfLevel, stageTitle, type StageId } from './stages';

type EpisodeLike = { id: string; level: string };

export function episodeStage(ep: EpisodeLike): StageId {
  return stageOfLevel(ep.level);
}

// Bölüm numarası aşama içinde sürekli sayılır (A1'in 10 bölümünden sonra A2 11'den devam eder).
const NUMBER_BY_ID = (() => {
  const counters: Partial<Record<StageId, number>> = {};
  const map = new Map<string, number>();
  for (const ep of PODCAST_EPISODES) {
    const stage = stageOfLevel(ep.level);
    counters[stage] = (counters[stage] ?? 0) + 1;
    map.set(ep.id, counters[stage]!);
  }
  return map;
})();

export function episodeNumber(ep: EpisodeLike): number {
  return NUMBER_BY_ID.get(ep.id) ?? 0;
}

/** Aşama + bölüm: "Başlangıç · Bölüm 3". CEFR etiketi yerine, uygulamanın geri kalanıyla aynı dil. */
export function episodeLabel(ep: EpisodeLike): string {
  return `${stageTitle(episodeStage(ep))} · ${t("Bölüm {{n}}", { n: episodeNumber(ep) })}`;
}
