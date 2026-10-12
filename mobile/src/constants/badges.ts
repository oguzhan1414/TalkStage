import { badgeImages } from '../assets/images';
import { t } from '../i18n';

/** Must match `BADGE_DEFS` in backend/app/services/badges.py (the server evaluates and awards badges). */
export type BadgeId =
  | 'first_mic'
  | 'vocab_hunter'
  | 'pronunciation_prodigy'
  | '7day_flame'
  | '30day_master'
  | '100day_legend'
  | 'perfect_take'
  | 'mivo_friend'
  | 'bookworm'
  | 'podcast_fan'
  | 'lesson_graduate'
  | 'level_a2'
  | 'level_b1'
  | 'level_b2'
  | 'level_c1'
  | 'level_c2';

export type Badge = {
  id: BadgeId;
  title: string;
  /** Earn condition, shown as-is on locked badges. */
  criteriaText: string;
  image: ReturnType<typeof require>;
  icon: string;
};

export const BADGES: Badge[] = [
  { id: 'first_mic', title: t("İlk Sahne"), criteriaText: t("İlk sahneni bitir"), image: badgeImages.firstMic, icon: 'mic-outline' },
  { id: 'perfect_take', title: t("Kusursuz Take"), criteriaText: t("Bir sahnede 3 yıldız al"), image: badgeImages.perfectTake, icon: 'film-outline' },
  { id: 'mivo_friend', title: t("Mivo Dostu"), criteriaText: t("Mivo ile 5 serbest sohbet yap"), image: badgeImages.mivoFriend, icon: 'chatbubbles-outline' },
  { id: 'vocab_hunter', title: t("Kelime Avcısı"), criteriaText: t("100 kelime kaydet"), image: badgeImages.vocabHunter, icon: 'book-outline' },
  { id: 'pronunciation_prodigy', title: t("Telaffuz Ustası"), criteriaText: t("20 kelimenin telaffuzunu çalış"), image: badgeImages.pronunciationProdigy, icon: 'volume-high-outline' },
  { id: 'bookworm', title: t("Kitap Kurdu"), criteriaText: t("5 okuma hikâyesi bitir"), image: badgeImages.bookworm, icon: 'library-outline' },
  { id: 'podcast_fan', title: t("Podcast Hayranı"), criteriaText: t("10 podcast bölümünü bitir"), image: badgeImages.podcastFan, icon: 'headset-outline' },
  { id: 'lesson_graduate', title: t("Gramer Öğrencisi"), criteriaText: t("10 konu testini tamamla"), image: badgeImages.lessonGraduate, icon: 'school-outline' },
  { id: '7day_flame', title: t("7 Gün Alevi"), criteriaText: t("7 gün aralıksız pratik yap"), image: badgeImages.sevenDayFlame, icon: 'flame-outline' },
  { id: '30day_master', title: t("30 Gün Ustası"), criteriaText: t("30 gün aralıksız pratik yap"), image: badgeImages.thirtyDayMaster, icon: 'calendar-outline' },
  { id: '100day_legend', title: t("100 Gün Efsanesi"), criteriaText: t("100 gün aralıksız pratik yap"), image: badgeImages.hundredDayLegend, icon: 'trophy-outline' },
  { id: 'level_a2', title: t("A2 Seviyesi"), criteriaText: t("A2 seviyesine ulaş"), image: badgeImages.levelA2, icon: 'ribbon-outline' },
  { id: 'level_b1', title: t("B1 Seviyesi"), criteriaText: t("B1 seviyesine ulaş"), image: badgeImages.levelB1, icon: 'ribbon-outline' },
  { id: 'level_b2', title: t("B2 Seviyesi"), criteriaText: t("B2 seviyesine ulaş"), image: badgeImages.levelB2, icon: 'ribbon-outline' },
  { id: 'level_c1', title: t("C1 Seviyesi"), criteriaText: t("C1 seviyesine ulaş"), image: badgeImages.levelC1, icon: 'ribbon-outline' },
  { id: 'level_c2', title: t("C2 Seviyesi"), criteriaText: t("C2 seviyesine ulaş"), image: badgeImages.levelC2, icon: 'ribbon-outline' },
];

export const BADGE_BY_ID: Record<string, Badge> = Object.fromEntries(BADGES.map((b) => [b.id, b]));
