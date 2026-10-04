import AsyncStorage from '@react-native-async-storage/async-storage';
import type { VocabDeck, VocabDeckWord } from '@talkstage/shared-data/vocabDecks';

export type { VocabDeck, VocabDeckWord };

const CUSTOM_DECKS_STORAGE_KEY = '@talkstage_custom_vocab_decks';
const DECK_PROGRESS_STORAGE_KEY = '@talkstage_vocab_deck_progress';

export async function getStoredCustomDecks(): Promise<VocabDeck[]> {
  try {
    const json = await AsyncStorage.getItem(CUSTOM_DECKS_STORAGE_KEY);
    if (!json) return [];
    return JSON.parse(json);
  } catch {
    return [];
  }
}

// "Hazır Temalar" (pre-made decks) were removed from the Klasörler tab —
// they overlapped with the Kelime Kütüphanesi and curriculum vocab pools,
// and weren't wired into SM-2 (see 2026-10 simplification note). Every deck
// a user can see or add words to is now one of their own custom folders, so
// this just loads those — no more default/custom merge bookkeeping.
export async function loadAllDecks(): Promise<VocabDeck[]> {
  return getStoredCustomDecks();
}

export async function saveCustomDeck(newDeck: VocabDeck): Promise<VocabDeck[]> {
  try {
    const existing = await getStoredCustomDecks();
    const updated = [newDeck, ...existing.filter((d) => d.id !== newDeck.id)];
    await AsyncStorage.setItem(CUSTOM_DECKS_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

export async function deleteCustomDeck(deckId: string): Promise<VocabDeck[]> {
  try {
    const existing = await getStoredCustomDecks();
    const updated = existing.filter((d) => d.id !== deckId);
    await AsyncStorage.setItem(CUSTOM_DECKS_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

export async function addWordToAnyDeck(deckId: string, word: VocabDeckWord): Promise<void> {
  try {
    const customDecks = await getStoredCustomDecks();
    const updated = customDecks.map((d) => {
      if (d.id !== deckId) return d;
      const filtered = d.words.filter(
        (w) => w.id !== word.id && w.term.toLowerCase() !== word.term.toLowerCase()
      );
      return { ...d, words: [word, ...filtered] };
    });
    await AsyncStorage.setItem(CUSTOM_DECKS_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('Failed to add word to deck:', err);
  }
}

export async function getDeckMasteredWordIds(deckId: string): Promise<string[]> {
  try {
    const json = await AsyncStorage.getItem(`${DECK_PROGRESS_STORAGE_KEY}_${deckId}`);
    if (!json) return [];
    return JSON.parse(json);
  } catch {
    return [];
  }
}

export async function markWordAsMasteredInDeck(deckId: string, wordId: string): Promise<string[]> {
  try {
    const current = await getDeckMasteredWordIds(deckId);
    if (current.includes(wordId)) return current;
    const updated = [...current, wordId];
    await AsyncStorage.setItem(`${DECK_PROGRESS_STORAGE_KEY}_${deckId}`, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}
