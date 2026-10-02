import { DEFAULT_VOCAB_DECKS, type VocabDeck, type VocabDeckWord } from '@talkstage/shared-data/vocabDecks';

export type { VocabDeck, VocabDeckWord };
export { DEFAULT_VOCAB_DECKS };

const CUSTOM_DECKS_KEY = 'talkstage_web_custom_vocab_decks';
const CARD_DECK_MAP_KEY = 'talkstage_web_card_deck_map';
const DECK_MASTERY_KEY = 'talkstage_web_deck_mastery_map';

export function getStoredCustomDecks(): VocabDeck[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CUSTOM_DECKS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveCustomDeck(newDeck: VocabDeck): VocabDeck[] {
  if (typeof window === 'undefined') return [];
  try {
    const existing = getStoredCustomDecks();
    const updated = [newDeck, ...existing.filter((d) => d.id !== newDeck.id)];
    localStorage.setItem(CUSTOM_DECKS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('talkstage_decks_updated'));
    return updated;
  } catch {
    return [];
  }
}

export function deleteCustomDeck(deckId: string): VocabDeck[] {
  if (typeof window === 'undefined') return [];
  try {
    const existing = getStoredCustomDecks();
    const updated = existing.filter((d) => d.id !== deckId);
    localStorage.setItem(CUSTOM_DECKS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('talkstage_decks_updated'));
    return updated;
  } catch {
    return [];
  }
}

export function loadAllDecks(): VocabDeck[] {
  const custom = getStoredCustomDecks();
  return [...DEFAULT_VOCAB_DECKS, ...custom];
}

export function getCardDeckMap(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(CARD_DECK_MAP_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export function setCardDeck(cardId: string, deckId: string | null): void {
  if (typeof window === 'undefined') return;
  try {
    const map = getCardDeckMap();
    if (deckId) {
      map[cardId] = deckId;
    } else {
      delete map[cardId];
    }
    localStorage.setItem(CARD_DECK_MAP_KEY, JSON.stringify(map));
    window.dispatchEvent(new Event('talkstage_decks_updated'));
  } catch (err) {
    console.warn('Failed to set card deck:', err);
  }
}

export function getDeckMasteredWordIds(deckId: string): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(`${DECK_MASTERY_KEY}_${deckId}`);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function markWordAsMasteredInDeck(deckId: string, wordId: string): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const current = getDeckMasteredWordIds(deckId);
    if (current.includes(wordId)) return current;
    const updated = [...current, wordId];
    localStorage.setItem(`${DECK_MASTERY_KEY}_${deckId}`, JSON.stringify(updated));
    window.dispatchEvent(new Event('talkstage_decks_updated'));
    return updated;
  } catch {
    return [];
  }
}
