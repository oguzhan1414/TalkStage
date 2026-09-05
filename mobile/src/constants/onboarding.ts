import { avatarImages, cefrLevelImages } from '../assets/images';

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
    category: 'Eğitim & Gençlik',
    title: 'Lise & Üniversite Öğrencisi',
    sub: 'Okul sınavları, hazırlık sınıfı, Erasmus & akıcılık',
    icon: '🎓',
    badge: 'Akademik & Sınav',
    color: '#0EA5E9',
    avatarSource: avatarImages.studentYouth,
  },
  {
    id: 'corporate',
    category: 'Kariyer & İş',
    title: 'Çalışan & Kurumsal Profesyonel',
    sub: 'İş toplantıları, e-postalar, sunumlar & mülakatlar',
    icon: '💼',
    badge: 'İş Hayatı',
    color: '#4F46E5',
    avatarSource: avatarImages.proDeveloper,
  },
  {
    id: 'tech',
    category: 'Teknoloji & Yazılım',
    title: 'Yazılımcı, Tasarımcı & Mühendis',
    sub: 'Daily standuplar, global ekipler & teknik İngilizce',
    icon: '👨‍💻',
    badge: 'Teknik İngilizce',
    color: '#8B5CF6',
    avatarSource: avatarImages.maleDev,
  },
  {
    id: 'traveler',
    category: 'Dünya & Seyahat',
    title: 'Gezgin & Seyahat Sever',
    sub: 'Yurt dışı tatilleri, havalimanı, otel & yön sorma',
    icon: '✈️',
    badge: 'Seyahat & Gezi',
    color: '#10B981',
    avatarSource: avatarImages.travelerExplorer,
  },
  {
    id: 'adult_hobby',
    category: 'Kişisel Gelişim & Hobi',
    title: 'Her Yaştan Yetişkin & Hobi Sever',
    sub: 'Kendi hızımda öğrenme, dizi/film anlama & beyin jimnastiği',
    icon: '🌱',
    badge: 'Stressiz Pratik',
    color: '#F59E0B',
    avatarSource: avatarImages.matureSenior,
  },
  {
    id: 'service',
    category: 'Hizmet & Ticaret',
    title: 'Ticaret, Turizm, Sağlık & Serbest',
    sub: 'Yabancı müşteriler, hasta/turist iletişimi & günlük diyalog',
    icon: '🌐',
    badge: 'Müşteri & İletişim',
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
};

export const GOAL_OPTIONS: GoalOption[] = [
  {
    id: 'freeze_barrier',
    icon: '😶‍🌫️',
    title: 'Kafamda Kuruyorum Ama Ağzımdan Çıkmıyor',
    desc: 'Konuşurken oluşan heyecan ve tutukluğu yenmek, donmadan konuşmak.',
    badge: 'En Sık Yaşanan',
    color: '#EF4444',
  },
  {
    id: 'exams_school',
    icon: '📚',
    title: 'Okul, Hazırlık veya Speaking Sınavları',
    desc: 'Hazırlık atlama, lise/üniversite sınavları, TOEFL, IELTS veya YDS Speaking.',
    badge: 'Sınav Başarısı',
    color: '#0EA5E9',
  },
  {
    id: 'work_career',
    icon: '💼',
    title: 'İş Hayatı, Toplantılar & Mülakatlar',
    desc: 'Yabancı yöneticilerle toplantı, iş mülakatları ve sunumlarda özgüven kazanmak.',
    badge: 'Kariyer Odağı',
    color: '#4F46E5',
  },
  {
    id: 'travel_life',
    icon: '✈️',
    title: 'Yurt Dışı Gezileri & Günlük Hayat',
    desc: 'Restoranda sipariş verme, otelde check-in, kaybolduğunda yön sorma ve sosyalleşme.',
    badge: 'Özgür Gezgin',
    color: '#10B981',
  },
  {
    id: 'no_partner',
    icon: '🗣️',
    title: 'Gramer Biliyorum Ama Pratik Yapacak Kimsem Yok',
    desc: 'Beni asla yargılamayan, sıfır stresle 7/24 sabırla dinleyen bir partnerle konuşmak.',
    badge: 'Sınırsız Pratik',
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
    title: 'Sıfırdan / Başlangıç',
    enTitle: 'Beginner',
    desc: 'Temel kelimeleri biliyorum veya sıfırdan en baştan başlamak istiyorum.',
    realLife: 'Merhaba, adın ne, neredensin, teşekkürler gibi temel ifadeler.',
    color: '#10B981',
    image: cefrLevelImages.A1,
  },
  {
    code: 'A2',
    title: 'Temel Seviye',
    enTitle: 'Elementary',
    desc: 'Basit cümleler kurabiliyorum, kendimi ve günlük rutinlerimi anlatabiliyorum.',
    realLife: 'Kahve siparişi, hava durumu, market alışverişi ve basit yol tarifi.',
    color: '#0EA5E9',
    image: cefrLevelImages.A2,
  },
  {
    code: 'B1',
    title: 'Orta Düzey',
    enTitle: 'Intermediate',
    desc: 'Çoğu konuşmayı anlıyorum ama akıcı konuşurken kelime arayıp tıkanıyorum.',
    realLife: 'İş toplantıları, okul projeleri, fikir belirtme ve deneyim aktarımı.',
    color: '#6366F1',
    image: cefrLevelImages.B1,
  },
  {
    code: 'B2',
    title: 'İyi Düzey',
    enTitle: 'Upper-Intermediate',
    desc: 'Rahat konuşuyorum, daha zengin deyimler ve akıcı tartışmalar istiyorum.',
    realLife: 'Detaylı mülakatlar, teknik sunumlar, tartışmalar ve hızlı sohbetler.',
    color: '#8B5CF6',
    image: cefrLevelImages.B2,
  },
  {
    code: 'C1',
    title: 'İleri Düzey',
    enTitle: 'Advanced',
    desc: 'Karmaşık konularda akıcıyım, profesyonel nüanslar ve derinlik hedefliyorum.',
    realLife: 'Strateji yönetimi, uluslararası müzakere ve akademik sunumlar.',
    color: '#EC4899',
    image: cefrLevelImages.C1,
  },
  {
    code: 'C2',
    title: 'Ustalık',
    enTitle: 'Mastery',
    desc: 'Anadili düzeyinde spontane akıcılık, derin kültürel deyimler ve mizah.',
    realLife: 'Her ortamda anında, zahmetsiz ve kusursuz İngilizce.',
    color: '#F59E0B',
    image: cefrLevelImages.C2,
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
};

export const DAILY_GOAL_OPTIONS: DailyGoalOption[] = [
  {
    id: 'casual',
    minutes: 5,
    title: 'Rahat & Hafif',
    desc: 'Günde 1 kahve molasında stressiz pratik (Yoğun günler için ideal)',
    flameEmoji: '☕',
    badge: 'Kolay Alışkanlık',
    color: '#10B981',
  },
  {
    id: 'regular',
    minutes: 10,
    title: 'Düzenli & Dengeli',
    desc: '1 Canlı AI Konuşması + 1 Podcast Dinleme (En çok tercih edilen)',
    flameEmoji: '🔥',
    badge: 'Önerilen 🌟',
    color: '#4F46E5',
  },
  {
    id: 'intense',
    minutes: 20,
    title: 'Hızlı & Hedef Odaklı',
    desc: 'Yakında sınavı, seyahati veya iş mülakatı olanlar için maksimum ilerleme',
    flameEmoji: '🚀',
    badge: 'Hızlı Sonuç',
    color: '#EA580C',
  },
];
