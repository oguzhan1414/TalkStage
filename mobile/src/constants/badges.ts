import { badgeImages } from '../assets/images';
import { t } from '../i18n';

/** Mirrors the 10-badge spec in the design doc, Bölüm 3.5 ("10 Adet 3D Başarı Rozeti"). */
export type BadgeId =
  | 'first_mic'
  | 'standup_hero'
  | 'visa_approved'
  | '7day_flame'
  | '30day_master'
  | 'zero_freeze'
  | 'vocab_hunter'
  | 'negotiator'
  | 'pronunciation_prodigy'
  | 'early_bird';

export type Badge = {
  id: BadgeId;
  title: string;
  /** Earn condition, shown as-is on locked badges. */
  criteriaText: string;
  image: ReturnType<typeof require>;
  icon: string;
};

export const BADGES: Badge[] = [
  {
    id: 'first_mic',
    title: t("İlk Sahne"),
    criteriaText: t("İlk konuşma senaryosunu bitir"),
    image: badgeImages.firstMic,
    icon: 'mic-outline',
  },
  {
    id: 'standup_hero',
    title: t("Standup Hero"),
    criteriaText: t("5 Tech senaryosu tamamla"),
    image: badgeImages.standupHero,
    icon: 'people-outline',
  },
  {
    id: 'visa_approved',
    title: t("Visa Approved"),
    criteriaText: t("Vize senaryosundan 90+ al"),
    image: badgeImages.visaApproved,
    icon: 'airplane-outline',
  },
  {
    id: '7day_flame',
    title: t("7-Day Flame"),
    criteriaText: t("7 gün aralıksız pratik yap"),
    image: badgeImages.sevenDayFlame,
    icon: 'flame-outline',
  },
  {
    id: '30day_master',
    title: t("30-Day Master"),
    criteriaText: t("30 gün streak yap"),
    image: badgeImages.thirtyDayMaster,
    icon: 'calendar-outline',
  },
  {
    id: 'zero_freeze',
    title: t("Zero Freeze"),
    criteriaText: t("3 dakika duraksamadan konuş"),
    image: badgeImages.zeroFreeze,
    icon: 'timer-outline',
  },
  {
    id: 'vocab_hunter',
    title: t("Vocab Hunter"),
    criteriaText: t("100 kelimeyi tamamla"),
    image: badgeImages.vocabHunter,
    icon: 'book-outline',
  },
  {
    id: 'negotiator',
    title: t("Negotiator"),
    criteriaText: t("B2B satış senaryosunu kazan"),
    image: badgeImages.negotiator,
    icon: 'briefcase-outline',
  },
  {
    id: 'pronunciation_prodigy',
    title: t("Pronunciation Prodigy"),
    criteriaText: t("%95+ telaffuz skoru al"),
    image: badgeImages.pronunciationProdigy,
    icon: 'volume-high-outline',
  },
  {
    id: 'early_bird',
    title: t("Early Bird"),
    criteriaText: t("Sabah 09:00’dan önce pratik yap"),
    image: badgeImages.earlyBird,
    icon: 'sunny-outline',
  },
];
