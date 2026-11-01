import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';

import { t } from '../i18n';

/**
 * The level the path home shows. For now the learner picks it in the profile (AccountSettings); how A1 moves on
 * to A2 by itself is still to be designed.
 */
const KEY = 'spekvia.path.level';

export async function loadPathLevel(): Promise<string> {
  try {
    return (await AsyncStorage.getItem(KEY)) ?? 'A1';
  } catch {
    return 'A1';
  }
}

export async function savePathLevel(id: string): Promise<void> {
  try {
    await AsyncStorage.setItem(KEY, id);
  } catch {
    // keeps working for this session
  }
}

/** The chosen level; read again whenever the screen comes into focus (after a change in the profile). */
export function usePathLevel(): [string, (id: string) => void] {
  const [id, setId] = useState('A1');
  useFocusEffect(
    useCallback(() => {
      let alive = true;
      loadPathLevel().then((v) => alive && setId(v));
      return () => {
        alive = false;
      };
    }, [])
  );
  const choose = useCallback((next: string) => {
    setId(next);
    void savePathLevel(next);
  }, []);
  return [id, choose];
}

/** The friendly name of a level, shown next to its code. */
export function pathLevelName(id: string): string {
  const names: Record<string, string> = {
    A1: t("Başlangıç"),
    A2: t("Temel"),
    B1: t("Orta"),
    B2: t("Orta üstü"),
    C1: t("İleri"),
    C2: t("Uzman"),
  };
  return names[id] ?? id;
}
