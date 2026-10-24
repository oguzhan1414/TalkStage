import AsyncStorage from '@react-native-async-storage/async-storage';

const PREFIX = 'spekvia.wordRoom.mastered.';
const LAST_KEY = 'spekvia.wordRoom.last';

/** The room the learner opened last, for the "continue" card on the room list. */
export async function loadLastRoom(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(LAST_KEY);
  } catch {
    return null;
  }
}

export async function saveLastRoom(roomId: string): Promise<void> {
  try {
    await AsyncStorage.setItem(LAST_KEY, roomId);
  } catch {
    // best effort
  }
}

/** Words of a room the learner got right in a game (found on the first try and answered in the second round). */
export async function loadMastered(roomId: string): Promise<Set<string>> {
  try {
    const raw = await AsyncStorage.getItem(PREFIX + roomId);
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
}

export async function addMastered(roomId: string, ids: string[]): Promise<Set<string>> {
  const current = await loadMastered(roomId);
  ids.forEach((id) => current.add(id));
  try {
    await AsyncStorage.setItem(PREFIX + roomId, JSON.stringify([...current]));
  } catch {
    // best effort: progress is a nicety, the game works without it
  }
  return current;
}
