import AsyncStorage from '@react-native-async-storage/async-storage';

import { getStoredCustomDecks } from '../data/vocabDecks';
import { t } from '../i18n';
import type { VocabCardCreate, VocabCardOut } from '../types/api';
import { api } from './api';

/**
 * One word bank, grouped two ways: by level (automatic, from the card's CEFR level; lesson words carry their path
 * level) and by the learner's own tags ("Travel", "Work"). Both open the same SM-2 review, filtered.
 * Replaces the old phone-only folders (data/vocabDecks), which were not part of the review at all.
 */

export const GROUP_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const;

/** A group the Vocab tab can open: browse its words or practise them. */
export type VocabFocus = { kind: 'tag' | 'level'; value: string };

/** Key used for cards without a level. */
export const NO_LEVEL = 'other';

export function cardLevel(card: VocabCardOut): string {
  const level = (card.cefr_level ?? '').trim().toUpperCase();
  return (GROUP_LEVELS as readonly string[]).includes(level) ? level : NO_LEVEL;
}

export function inFocus(card: VocabCardOut, focus: VocabFocus): boolean {
  if (focus.kind === 'level') return cardLevel(card) === focus.value;
  return (card.tags ?? []).some((tag) => tag.toLowerCase() === focus.value.toLowerCase());
}

/** Word count per level, only the levels that have words, in path order ("other" last). */
export function levelGroups(cards: VocabCardOut[]): { level: string; count: number }[] {
  const counts = new Map<string, number>();
  cards.forEach((c) => counts.set(cardLevel(c), (counts.get(cardLevel(c)) ?? 0) + 1));
  return [...GROUP_LEVELS, NO_LEVEL].filter((l) => counts.get(l)).map((level) => ({ level, count: counts.get(level) ?? 0 }));
}

/** Every tag with its word count, most used first. */
export function tagGroups(cards: VocabCardOut[]): { tag: string; count: number }[] {
  const counts = new Map<string, { tag: string; count: number }>();
  cards.forEach((c) =>
    (c.tags ?? []).forEach((tag) => {
      const key = tag.toLowerCase();
      const hit = counts.get(key);
      if (hit) hit.count += 1;
      else counts.set(key, { tag, count: 1 });
    })
  );
  return [...counts.values()].sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export function levelLabel(level: string): string {
  return level === NO_LEVEL ? t("Seviyesiz") : level;
}

const MIGRATED_KEY = 'spekvia.vocab.folders_to_tags.v1';

/**
 * One time: the words of the old phone-only folders go into the word bank, tagged with the folder's name. Runs again
 * on the next launch if anything fails (an older server that does not keep tags counts as a failure), so no word is
 * lost. Returns true when cards were changed.
 */
export async function migrateLocalFolders(): Promise<boolean> {
  try {
    if (await AsyncStorage.getItem(MIGRATED_KEY)) return false;
    const decks = await getStoredCustomDecks();
    let changed = false;
    for (const deck of decks) {
      const tag = deck.title.trim();
      for (const word of deck.words) {
        const created = await api.post<VocabCardOut>('/vocab-cards', {
          term: word.term,
          translation: word.translation || undefined,
          example_sentence: word.exampleEn || undefined,
          part_of_speech: word.pos,
          cefr_level: word.level,
          source_label: t("Klasörden"),
          tags: tag ? [tag] : [],
        } satisfies VocabCardCreate);
        if (tag && !(created.tags ?? []).some((x) => x.toLowerCase() === tag.toLowerCase())) return changed;
        changed = true;
      }
    }
    await AsyncStorage.setItem(MIGRATED_KEY, '1');
    return changed;
  } catch {
    return false;
  }
}
