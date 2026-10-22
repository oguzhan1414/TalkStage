/**
 * Hangi gramer dersleri ücretsiz: eski müfredattaki kural aynen yeni konulara taşındı. Her CEFR seviyesinin ilk dersi
 * ücretsiz, A1'de ilk iki ders. Diğer dersler Spekvia Pro ister (bkz. PaywallContent: "Tüm gramer derslerinin kilidi açık").
 * Sesli sahne kotası ayrı ve sunucu tarafında (backend entitlements.py).
 */
const FREE_LESSON_CODES = new Set(['A1_N01', 'A1_N02', 'A2_N14', 'B1_N24', 'B2_N35', 'C1_N43', 'C2_N47']);

/** Yerel test için: mobile/.env içinde EXPO_PUBLIC_TEST_UNLOCK_LESSONS=1 ise tüm dersler ve yoldaki tüm görevler açık (yayın derlemesinde yok). */
export const TEST_UNLOCK = process.env.EXPO_PUBLIC_TEST_UNLOCK_LESSONS === '1';

export function isLessonFree(code: string): boolean {
  return TEST_UNLOCK || FREE_LESSON_CODES.has(code);
}
