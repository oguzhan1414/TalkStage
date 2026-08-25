import { badgeImages } from '../assets/images';

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
};

export const BADGES: Badge[] = [
  {
    id: 'first_mic',
    title: 'İlk Sahne',
    criteriaText: 'İlk konuşma senaryosunu bitir',
    image: badgeImages.firstMic,
  },
  {
    id: 'standup_hero',
    title: 'Standup Hero',
    criteriaText: '5 Tech senaryosu tamamla',
    image: badgeImages.standupHero,
  },
  {
    id: 'visa_approved',
    title: 'Visa Approved',
    criteriaText: 'Vize senaryosundan 90+ al',
    image: badgeImages.visaApproved,
  },
  {
    id: '7day_flame',
    title: '7-Day Flame',
    criteriaText: '7 gün aralıksız pratik yap',
    image: badgeImages.sevenDayFlame,
  },
  {
    id: '30day_master',
    title: '30-Day Master',
    criteriaText: '30 gün streak yap',
    image: badgeImages.thirtyDayMaster,
  },
  {
    id: 'zero_freeze',
    title: 'Zero Freeze',
    criteriaText: '3 dakika duraksamadan konuş',
    image: badgeImages.zeroFreeze,
  },
  {
    id: 'vocab_hunter',
    title: 'Vocab Hunter',
    criteriaText: '100 kelimeyi tamamla',
    image: badgeImages.vocabHunter,
  },
  {
    id: 'negotiator',
    title: 'Negotiator',
    criteriaText: 'B2B satış senaryosunu kazan',
    image: badgeImages.negotiator,
  },
  {
    id: 'pronunciation_prodigy',
    title: 'Pronunciation Prodigy',
    criteriaText: '%95+ telaffuz skoru al',
    image: badgeImages.pronunciationProdigy,
  },
  {
    id: 'early_bird',
    title: 'Early Bird',
    criteriaText: 'Sabah 09:00’dan önce pratik yap',
    image: badgeImages.earlyBird,
  },
];
