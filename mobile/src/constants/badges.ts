import { badgeImages } from '../assets/images';
import { t } from '../i18n';

/** Must match `BADGE_DEFS` in backend/app/services/badges.py (the server evaluates and awards badges). */
export type BadgeId =
  | 'first_mic'
  | 'zero_freeze'
  | 'vocab_hunter'
  | 'pronunciation_prodigy'
  | 'visa_approved'
  | 'negotiator'
  | 'standup_hero'
  | '7day_flame'
  | '30day_master'
  | '100day_legend'
  | 'early_bird'
  | 'night_owl'
  | 'star_collector'
  | 'perfect_take'
  | 'mivo_friend'
  | 'bookworm'
  | 'podcast_fan'
  | 'lesson_graduate'
  | 'full_day'
  | 'level_a1'
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
  { id: 'zero_freeze', title: t("Buzları Kır"), criteriaText: t("İlk canlı Mivo sahneni oyna"), image: badgeImages.zeroFreeze, icon: 'timer-outline' },
  { id: 'star_collector', title: t("Yıldız Koleksiyoncusu"), criteriaText: t("Toplam 15 yıldız topla"), image: badgeImages.starCollector, icon: 'star-outline' },
  { id: 'perfect_take', title: t("Kusursuz Take"), criteriaText: t("Bir sahnede 3 yıldız al"), image: badgeImages.perfectTake, icon: 'film-outline' },
  { id: 'visa_approved', title: t("Gezgin"), criteriaText: t("3 seyahat sahnesini bitir"), image: badgeImages.visaApproved, icon: 'airplane-outline' },
  { id: 'negotiator', title: t("Pazarlıkçı"), criteriaText: t("Bitpazarı sahnesini canlı oyna"), image: badgeImages.negotiator, icon: 'briefcase-outline' },
  { id: 'standup_hero', title: t("Kariyer Sahnesi"), criteriaText: t("İş mülakatı ve ofis sahnesini bitir"), image: badgeImages.standupHero, icon: 'people-outline' },
  { id: 'mivo_friend', title: t("Mivo Dostu"), criteriaText: t("Mivo ile 5 serbest sohbet yap"), image: badgeImages.mivoFriend, icon: 'chatbubbles-outline' },
  { id: 'vocab_hunter', title: t("Kelime Avcısı"), criteriaText: t("100 kelime kaydet"), image: badgeImages.vocabHunter, icon: 'book-outline' },
  { id: 'pronunciation_prodigy', title: t("Telaffuz Ustası"), criteriaText: t("20 kelimenin telaffuzunu çalış"), image: badgeImages.pronunciationProdigy, icon: 'volume-high-outline' },
  { id: 'bookworm', title: t("Kitap Kurdu"), criteriaText: t("5 okuma hikâyesi bitir"), image: badgeImages.bookworm, icon: 'library-outline' },
  { id: 'podcast_fan', title: t("Podcast Hayranı"), criteriaText: t("10 podcast bölümünü bitir"), image: badgeImages.podcastFan, icon: 'headset-outline' },
  { id: 'lesson_graduate', title: t("Gramer Öğrencisi"), criteriaText: t("10 konu testini tamamla"), image: badgeImages.lessonGraduate, icon: 'school-outline' },
  { id: 'full_day', title: t("Tam Gün"), criteriaText: t("Aynı gün bir sahne, bir kelime ve bir ders/podcast/okuma yap"), image: badgeImages.fullDay, icon: 'sunny-outline' },
  { id: '7day_flame', title: t("7 Gün Alevi"), criteriaText: t("7 gün aralıksız pratik yap"), image: badgeImages.sevenDayFlame, icon: 'flame-outline' },
  { id: '30day_master', title: t("30 Gün Ustası"), criteriaText: t("30 gün aralıksız pratik yap"), image: badgeImages.thirtyDayMaster, icon: 'calendar-outline' },
  { id: '100day_legend', title: t("100 Gün Efsanesi"), criteriaText: t("100 gün aralıksız pratik yap"), image: badgeImages.hundredDayLegend, icon: 'trophy-outline' },
  { id: 'early_bird', title: t("Erken Kuş"), criteriaText: t("Sabah 09:00’dan önce pratik yap"), image: badgeImages.earlyBird, icon: 'sunny-outline' },
  { id: 'night_owl', title: t("Gece Kuşu"), criteriaText: t("Akşam 21:00’dan sonra pratik yap"), image: badgeImages.nightOwl, icon: 'moon-outline' },
  { id: 'level_a1', title: t("A1 Seviyesi"), criteriaText: t("A1 seviyesine ulaş"), image: badgeImages.levelA1, icon: 'ribbon-outline' },
  { id: 'level_a2', title: t("A2 Seviyesi"), criteriaText: t("A2 seviyesine ulaş"), image: badgeImages.levelA2, icon: 'ribbon-outline' },
  { id: 'level_b1', title: t("B1 Seviyesi"), criteriaText: t("B1 seviyesine ulaş"), image: badgeImages.levelB1, icon: 'ribbon-outline' },
  { id: 'level_b2', title: t("B2 Seviyesi"), criteriaText: t("B2 seviyesine ulaş"), image: badgeImages.levelB2, icon: 'ribbon-outline' },
  { id: 'level_c1', title: t("C1 Seviyesi"), criteriaText: t("C1 seviyesine ulaş"), image: badgeImages.levelC1, icon: 'ribbon-outline' },
  { id: 'level_c2', title: t("C2 Seviyesi"), criteriaText: t("C2 seviyesine ulaş"), image: badgeImages.levelC2, icon: 'ribbon-outline' },
];

export const BADGE_BY_ID: Record<string, Badge> = Object.fromEntries(BADGES.map((b) => [b.id, b]));
