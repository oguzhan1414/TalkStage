import { avatarImages, cefrLevelImages } from '../assets/images';
import { t } from '../i18n';

/**
 * Content for the new 8-step onboarding flow (V2.0), ported from the
 * interactive design spec at `landing/src/app/onboarding/page.tsx` — see
 * that file for the original prototype and the per-step UX rationale.
 */

export type PersonaOption = {
  id: string;
  category: string;
  title: string;
  sub: string;
  icon: string;
  badge: string;
  color: string;
  avatarSource: ReturnType<typeof require>;
};

export const PERSONA_OPTIONS: PersonaOption[] = [
  {
    id: 'student',
    category: t("Eğitim & Gençlik"),
    title: t("Lise & Üniversite Öğrencisi"),
    sub: t("Okul sınavları, hazırlık sınıfı, Erasmus & akıcılık"),
    icon: '🎓',
    badge: t("Akademik & Sınav"),
    color: '#0EA5E9',
    avatarSource: avatarImages.studentYouth,
  },
  {
    id: 'corporate',
    category: t("Kariyer & İş"),
    title: t("Çalışan & Kurumsal Profesyonel"),
    sub: t("İş toplantıları, e-postalar, sunumlar & mülakatlar"),
    icon: '💼',
    badge: t("İş Hayatı"),
    color: '#4F46E5',
    avatarSource: avatarImages.proDeveloper,
  },
  {
    id: 'tech',
    category: t("Teknoloji & Yazılım"),
    title: t("Yazılımcı, Tasarımcı & Mühendis"),
    sub: t("Daily standuplar, global ekipler & teknik İngilizce"),
    icon: '👨‍💻',
    badge: t("Teknik İngilizce"),
    color: '#8B5CF6',
    avatarSource: avatarImages.maleDev,
  },
  {
    id: 'traveler',
    category: t("Dünya & Seyahat"),
    title: t("Gezgin & Seyahat Sever"),
    sub: t("Yurt dışı tatilleri, havalimanı, otel & yön sorma"),
    icon: '✈️',
    badge: t("Seyahat & Gezi"),
    color: '#10B981',
    avatarSource: avatarImages.travelerExplorer,
  },
  {
    id: 'adult_hobby',
    category: t("Kişisel Gelişim & Hobi"),
    title: t("Her Yaştan Yetişkin & Hobi Sever"),
    sub: t("Kendi hızımda öğrenme, dizi/film anlama & beyin jimnastiği"),
    icon: '🌱',
    badge: t("Stressiz Pratik"),
    color: '#F59E0B',
    avatarSource: avatarImages.matureSenior,
  },
  {
    id: 'service',
    category: 'Hizmet & Ticaret',
    title: t("Ticaret, Turizm, Sağlık & Serbest"),
    sub: t("Yabancı müşteriler, hasta/turist iletişimi & günlük diyalog"),
    icon: '🌐',
    badge: t("Müşteri & İletişim"),
    color: '#EC4899',
    // Still no dedicated matching photo generated for this persona (same gap
    // as the landing prototype, which also still points this at the
    // entrepreneur avatar) — swap in a real "service professional" image here
    // once one exists.
    avatarSource: avatarImages.femaleEntrepreneur,
  },
];

export type GoalOption = {
  id: string;
  icon: string;
  title: string;
  desc: string;
  badge: string;
  color: string;
  // Chunky 3D icon replacing the plain emoji on the card — optional because
  // the art is still being generated; cards fall back to `icon` (the emoji)
  // until this is filled in (see `GoalScreen.tsx`).
  iconImage?: ReturnType<typeof require>;
};

export const GOAL_OPTIONS: GoalOption[] = [
  {
    id: 'freeze_barrier',
    icon: '😶‍🌫️',
    iconImage: require('../../assets/images/onboarding/goal_freeze_barrier.png'),
    title: t("Kafamda Kuruyorum Ama Ağzımdan Çıkmıyor"),
    desc: t("Konuşurken oluşan heyecan ve tutukluğu yenmek, donmadan konuşmak."),
    badge: t("En Sık Yaşanan"),
    color: '#EF4444',
  },
  {
    id: 'exams_school',
    icon: '📚',
    iconImage: require('../../assets/images/onboarding/goal_exams_school.png'),
    title: t("Okul, Hazırlık veya Speaking Sınavları"),
    desc: t("Hazırlık atlama, lise/üniversite sınavları, TOEFL, IELTS veya YDS Speaking."),
    badge: t("Sınav Başarısı"),
    color: '#0EA5E9',
  },
  {
    id: 'work_career',
    icon: '💼',
    iconImage: require('../../assets/images/onboarding/goal_work_career.png'),
    title: t("İş Hayatı, Toplantılar & Mülakatlar"),
    desc: t("Yabancı yöneticilerle toplantı, iş mülakatları ve sunumlarda özgüven kazanmak."),
    badge: t("Kariyer Odağı"),
    color: '#4F46E5',
  },
  {
    id: 'travel_life',
    icon: '✈️',
    iconImage: require('../../assets/images/onboarding/goal_travel_life.png'),
    title: t("Yurt Dışı Gezileri & Günlük Hayat"),
    desc: t("Restoranda sipariş verme, otelde check-in, kaybolduğunda yön sorma ve sosyalleşme."),
    badge: t("Özgür Gezgin"),
    color: '#10B981',
  },
  {
    id: 'no_partner',
    icon: '🗣️',
    iconImage: require('../../assets/images/onboarding/goal_no_partner.png'),
    title: t("Gramer Biliyorum Ama Pratik Yapacak Kimsem Yok"),
    desc: t("Beni asla yargılamayan, sıfır stresle 7/24 sabırla dinleyen bir partnerle konuşmak."),
    badge: t("Sınırsız Pratik"),
    color: '#8B5CF6',
  },
];

export type OnboardingLevelOption = {
  code: string;
  title: string;
  enTitle: string;
  desc: string;
  realLife: string;
  color: string;
  image: ReturnType<typeof require>;
};

export const ONBOARDING_LEVEL_OPTIONS: OnboardingLevelOption[] = [
  {
    code: 'A1',
    title: t("Sıfırdan / Başlangıç"),
    enTitle: t("Beginner"),
    desc: t("Temel kelimeleri biliyorum veya sıfırdan en baştan başlamak istiyorum."),
    realLife: t("Merhaba, adın ne, neredensin, teşekkürler gibi temel ifadeler."),
    color: '#10B981',
    image: cefrLevelImages.A1,
  },
  {
    code: 'A2',
    title: t("Temel Seviye"),
    enTitle: t("Elementary"),
    desc: t("Basit cümleler kurabiliyorum, kendimi ve günlük rutinlerimi anlatabiliyorum."),
    realLife: t("Kahve siparişi, hava durumu, market alışverişi ve basit yol tarifi."),
    color: '#0EA5E9',
    image: cefrLevelImages.A2,
  },
  {
    code: 'B1',
    title: t("Orta Düzey"),
    enTitle: t("Intermediate"),
    desc: t("Çoğu konuşmayı anlıyorum ama akıcı konuşurken kelime arayıp tıkanıyorum."),
    realLife: t("İş toplantıları, okul projeleri, fikir belirtme ve deneyim aktarımı."),
    color: '#6366F1',
    image: cefrLevelImages.B1,
  },
  {
    code: 'B2',
    title: t("İyi Düzey"),
    enTitle: t("Upper-Intermediate"),
    desc: t("Rahat konuşuyorum, daha zengin deyimler ve akıcı tartışmalar istiyorum."),
    realLife: t("Detaylı mülakatlar, teknik sunumlar, tartışmalar ve hızlı sohbetler."),
    color: '#8B5CF6',
    image: cefrLevelImages.B2,
  },
  {
    code: 'C1',
    title: t("İleri Düzey"),
    enTitle: t("Advanced"),
    desc: t("Karmaşık konularda akıcıyım, profesyonel nüanslar ve derinlik hedefliyorum."),
    realLife: t("Strateji yönetimi, uluslararası müzakere ve akademik sunumlar."),
    color: '#EC4899',
    image: cefrLevelImages.C1,
  },
  {
    code: 'C2',
    title: t("Ustalık"),
    enTitle: t("Mastery"),
    desc: t("Anadili düzeyinde spontane akıcılık, derin kültürel deyimler ve mizah."),
    realLife: t("Her ortamda anında, zahmetsiz ve kusursuz İngilizce."),
    color: '#F59E0B',
    image: cefrLevelImages.C2,
  },
];

export type CalibrationQuestion = {
  en: string;
  hintTr: string;
};

/**
 * The voice mini-demo on `CalibrationScreen` — deliberately short (2, not the
 * old deleted screen's 3) and A1-achievable (unlike the old "tell me about
 * something interesting that happened last week" / "a goal for the next few
 * years", which assumed real fluency). Answers are recorded and sent to the
 * still-working `POST /onboarding/calibrate` (see `backend/CLAUDE.md` Ek 23).
 */
export const CALIBRATION_QUESTIONS: CalibrationQuestion[] = [
  {
    en: 'Hi! Tell me your name and where you’re from.',
    hintTr: t("İpucu: \"My name is ... I’m from ...\""),
  },
  {
    en: 'What do you usually do on weekends?',
    hintTr: t("İpucu: \"I usually ...\""),
  },
];

export type DailyGoalOption = {
  id: string;
  minutes: number;
  title: string;
  desc: string;
  flameEmoji: string;
  badge: string;
  color: string;
  // Same optional-icon pattern as `GoalOption.iconImage` — see there.
  iconImage?: ReturnType<typeof require>;
};

export const DAILY_GOAL_OPTIONS: DailyGoalOption[] = [
  {
    id: 'casual',
    minutes: 5,
    title: t("Rahat & Hafif"),
    desc: t("Günde 1 kahve molasında stressiz pratik (Yoğun günler için ideal)"),
    flameEmoji: '☕',
    iconImage: require('../../assets/images/onboarding/pace_casual.png'),
    badge: t("Kolay Alışkanlık"),
    color: '#10B981',
  },
  {
    id: 'regular',
    minutes: 10,
    title: t("Düzenli & Dengeli"),
    desc: t("1 Canlı AI Konuşması + 1 Podcast Dinleme (En çok tercih edilen)"),
    flameEmoji: '🔥',
    iconImage: require('../../assets/images/onboarding/pace_regular.png'),
    badge: t("Önerilen 🌟"),
    color: '#4F46E5',
  },
  {
    id: 'intense',
    minutes: 20,
    title: t("Hızlı & Hedef Odaklı"),
    desc: t("Yakında sınavı, seyahati veya iş mülakatı olanlar için maksimum ilerleme"),
    flameEmoji: '🚀',
    iconImage: require('../../assets/images/onboarding/pace_intense.png'),
    badge: t("Hızlı Sonuç"),
    color: '#EA580C',
  },
];
