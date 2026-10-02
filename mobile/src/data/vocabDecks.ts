import AsyncStorage from '@react-native-async-storage/async-storage';
import { DEFAULT_VOCAB_DECKS, type VocabDeck, type VocabDeckWord } from '@talkstage/shared-data/vocabDecks';

export type { VocabDeck, VocabDeckWord };
export { DEFAULT_VOCAB_DECKS };

const CUSTOM_DECKS_STORAGE_KEY = '@talkstage_custom_vocab_decks';
const DEFAULT_DECKS_USER_WORDS_KEY = '@talkstage_default_deck_user_words';
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

export async function getStoredDefaultDeckUserWords(): Promise<Record<string, VocabDeckWord[]>> {
  try {
    const json = await AsyncStorage.getItem(DEFAULT_DECKS_USER_WORDS_KEY);
    if (!json) return {};
    return JSON.parse(json);
  } catch {
    return {};
  }
}

export async function loadAllDecks(): Promise<VocabDeck[]> {
  try {
    const customDecks = await getStoredCustomDecks();
    const defaultUserWords = await getStoredDefaultDeckUserWords();

    const mergedDefaultDecks = DEFAULT_VOCAB_DECKS.map((d) => {
      const extraWords = defaultUserWords[d.id] || [];
      return {
        ...d,
        words: [...d.words, ...extraWords.filter((ew) => !d.words.some((w) => w.id === ew.id))],
      };
    });

    return [...mergedDefaultDecks, ...customDecks];
  } catch {
    return DEFAULT_VOCAB_DECKS;
  }
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
    const isCustom = customDecks.some((d) => d.id === deckId);

    if (isCustom) {
      const updatedCustom = customDecks.map((d) => {
        if (d.id === deckId) {
          const filtered = d.words.filter((w) => w.id !== word.id && w.term.toLowerCase() !== word.term.toLowerCase());
          return { ...d, words: [word, ...filtered] };
        }
        return d;
      });
      await AsyncStorage.setItem(CUSTOM_DECKS_STORAGE_KEY, JSON.stringify(updatedCustom));
    } else {
      // Default deck (e.g. deck_a1_core, deck_colors_shapes)
      const defaultUserWords = await getStoredDefaultDeckUserWords();
      const currentList = defaultUserWords[deckId] || [];
      const filtered = currentList.filter((w) => w.id !== word.id && w.term.toLowerCase() !== word.term.toLowerCase());
      defaultUserWords[deckId] = [word, ...filtered];
      await AsyncStorage.setItem(DEFAULT_DECKS_USER_WORDS_KEY, JSON.stringify(defaultUserWords));
    }
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
