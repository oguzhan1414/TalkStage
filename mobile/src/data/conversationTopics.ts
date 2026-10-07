import { t } from '../i18n';
export type ConversationTopicLevelGroup = 'beginner' | 'intermediate' | 'advanced';

export type ConversationTopic = {
  id: string;
  /** Short Turkish label shown as the chat header subtitle. */
  titleTr: string;
  openingEn: string;
  openingTr: string;
  /** Sent to the backend as `topic_context` — a soft anchor, not a strict mission. */
  topicContext: string;
  levelGroup: ConversationTopicLevelGroup;
  /** Persona ids this topic is especially relevant to (see constants/onboarding.ts).
   * Omitted = universal, fits everyone. */
  personas?: string[];
};

/**
 * "Günlük Sohbet" (free chat) used to open with one fixed generic greeting
 * and never suggest what to talk about next — a real "blank page" problem
 * for learners (see mobile/CLAUDE.md). `pickDailyTopic` below picks one of
 * these deterministically per user per day (same pattern backend's
 * `GET /scenarios/recommended` already uses), so the user always has a
 * concrete question to answer instead of facing silence.
 */
export const CONVERSATION_TOPICS: ConversationTopic[] = [
  // ---- Real-Life Practical Scenarios (High Impact WOW) ----
  {
    id: 'cafe_ordering',
    titleTr: t("☕ Kafede Kahve Siparişi"),
    openingEn: 'Welcome in! What can I get started for you today?',
    openingTr: t("Kafede barista ile özel kahve ve tatlı siparişi verme"),
    topicContext: 'Ordering coffee and snacks at a local cafe (size, milk type, takeout)',
    levelGroup: 'beginner',
  },
  {
    id: 'asking_directions',
    titleTr: t("🗺️ Sokakta Adres Sorma"),
    openingEn: 'Excuse me, are you looking for somewhere around here?',
    openingTr: t("Sokakta kaybolduğunda metro veya cadde tarifi isteme"),
    topicContext: 'Asking for directions in a foreign city (metro station, streets, turns)',
    levelGroup: 'beginner',
  },
  {
    id: 'airport_checkin',
    titleTr: t("✈️ Havalimanında Check-in"),
    openingEn: 'Good morning! Where are you flying to today?',
    openingTr: t("Havalimanında uçuş kapısı, pasaport ve bagaj teslimi"),
    topicContext: 'Checking in at the airport counter, flight gate, luggage',
    levelGroup: 'beginner',
  },
  {
    id: 'hotel_stay',
    titleTr: t("🏨 Otelde Check-in & Oda"),
    openingEn: 'Welcome to our hotel! Do you have a reservation with us?',
    openingTr: t("Otel resepsiyonunda giriş yapma ve oda tercihi"),
    topicContext: 'Hotel front desk check-in, room key, breakfast time, wifi',
    levelGroup: 'beginner',
  },
  {
    id: 'restaurant_dinner',
    titleTr: t("🍕 Restoranda Yemek Siparişi"),
    openingEn: 'Good evening! A table for one, or are you joining someone?',
    openingTr: t("Restoranda masa seçme ve menüden yemek siparişi"),
    topicContext: 'Dining at a restaurant, ordering food, asking for the bill',
    levelGroup: 'beginner',
  },
  {
    id: 'shopping_clothes',
    titleTr: t("🛍️ Mağazada Alışveriş"),
    openingEn: 'Hi! Can I help you find a size or something specific?',
    openingTr: t("Giyim mağazasında beden, renk ve indirim sorma"),
    topicContext: 'Shopping for clothes, asking for size, fitting room, price',
    levelGroup: 'beginner',
  },
  {
    id: 'taxi_ride',
    titleTr: t("🚕 Takside Yol Tarifi"),
    openingEn: 'Hop in! Where are you heading to today?',
    openingTr: t("Taksi şoförüne gideceğin yeri ve aceleyi anlatma"),
    topicContext: 'Riding a taxi, giving destination address, payment',
    levelGroup: 'beginner',
  },
  {
    id: 'job_interview_intro',
    titleTr: t("💼 Mülakatta Kendini Tanıtma"),
    openingEn: 'Welcome! Could you briefly introduce yourself and your background?',
    openingTr: t("İş görüşmesinde kendini ve hedeflerini anlatma"),
    topicContext: 'Job interview introduction, background, experience and skills',
    levelGroup: 'beginner',
  },

  // ---- Beginner (A1/A2), universal ----
  {
    id: 'weekend_plans',
    titleTr: t("Bugünün Konusu: Hafta Sonu Planların"),
    openingEn: "Hi! What are you doing this weekend?",
    openingTr: t("Merhaba! Bu hafta sonu ne yapıyorsun?"),
    topicContext: 'Weekend plans and free time activities',
    levelGroup: 'beginner',
  },
  {
    id: 'favorite_food',
    titleTr: t("Bugünün Konusu: Sevdiğin Yemekler"),
    openingEn: "Hello! What's your favorite food?",
    openingTr: t("Merhaba! En sevdiğin yemek nedir?"),
    topicContext: 'Favorite foods and what you like to eat',
    levelGroup: 'beginner',
  },
  {
    id: 'daily_routine',
    titleTr: t("Bugünün Konusu: Günlük Rutinin"),
    openingEn: 'Hi! What time do you usually wake up?',
    openingTr: t("Merhaba! Genelde kaçta uyanırsın?"),
    topicContext: 'Daily routine and what a normal day looks like',
    levelGroup: 'beginner',
  },
  {
    id: 'family_intro',
    titleTr: t("Bugünün Konusu: Ailen"),
    openingEn: 'Hello! Can you tell me about your family?',
    openingTr: t("Merhaba! Bana ailenden bahseder misin?"),
    topicContext: 'Family members and what they do',
    levelGroup: 'beginner',
  },
  {
    id: 'weather_today',
    titleTr: t("Bugünün Konusu: Hava Durumu"),
    openingEn: "Hi! How's the weather where you are today?",
    openingTr: t("Merhaba! Bulunduğun yerde hava nasıl bugün?"),
    topicContext: "Today's weather and seasons you like",
    levelGroup: 'beginner',
  },
  {
    id: 'hobbies',
    titleTr: t("Bugünün Konusu: Hobilerin"),
    openingEn: 'Hello! What do you like to do in your free time?',
    openingTr: t("Merhaba! Boş zamanlarında ne yapmayı seversin?"),
    topicContext: 'Hobbies and things you enjoy doing',
    levelGroup: 'beginner',
  },
  {
    id: 'favorite_movie_show',
    titleTr: t("Bugünün Konusu: Sevdiğin Film/Dizi"),
    openingEn: "Hi! What's a movie or show you really like?",
    openingTr: t("Merhaba! Gerçekten sevdiğin bir film ya da dizi var mı?"),
    topicContext: 'Favorite movies or TV shows',
    levelGroup: 'beginner',
  },
  {
    id: 'pets_animals',
    titleTr: t("Bugünün Konusu: Evcil Hayvanlar"),
    openingEn: 'Hello! Do you have any pets, or do you like animals?',
    openingTr: t("Merhaba! Evcil hayvanın var mı, ya da hayvanları sever misin?"),
    topicContext: 'Pets or animals you like',
    levelGroup: 'beginner',
  },
  {
    id: 'hometown',
    titleTr: t("Bugünün Konusu: Memleketin"),
    openingEn: "Hi! What's your hometown like?",
    openingTr: t("Merhaba! Memleketin nasıl bir yer?"),
    topicContext: "Your hometown or city and what it's like",
    levelGroup: 'beginner',
  },
  {
    id: 'shopping',
    titleTr: t("Bugünün Konusu: Alışveriş"),
    openingEn: 'Hello! Do you like shopping? What do you usually buy?',
    openingTr: t("Merhaba! Alışverişi sever misin? Genelde ne alırsın?"),
    topicContext: 'Shopping and things you like to buy',
    levelGroup: 'beginner',
  },

  // ---- Intermediate (B1/B2), universal ----
  {
    id: 'travel_experience',
    titleTr: t("Bugünün Konusu: Unutulmaz Bir Seyahat"),
    openingEn: "Hi! Tell me about a trip you'll never forget.",
    openingTr: t("Merhaba! Bana hiç unutamayacağın bir seyahatinden bahset."),
    topicContext: 'A memorable travel experience or trip',
    levelGroup: 'intermediate',
  },
  {
    id: 'learning_english_journey',
    titleTr: t("Bugünün Konusu: İngilizce Öğrenme Yolculuğun"),
    openingEn: "Hello! What's the hardest part of learning English for you?",
    openingTr: t("Merhaba! Senin için İngilizce öğrenmenin en zor kısmı ne?"),
    topicContext: 'Your English learning journey and challenges',
    levelGroup: 'intermediate',
  },
  {
    id: 'technology_daily_life',
    titleTr: t("Bugünün Konusu: Teknoloji ve Günlük Hayat"),
    openingEn: 'Hi! How has technology changed your daily life?',
    openingTr: t("Merhaba! Teknoloji günlük hayatını nasıl değiştirdi?"),
    topicContext: 'How technology affects daily life',
    levelGroup: 'intermediate',
  },
  {
    id: 'books_reading',
    titleTr: t("Bugünün Konusu: Kitaplar"),
    openingEn: "Hello! What's a book you've read recently, or want to read?",
    openingTr: t("Merhaba! Yakın zamanda okuduğun ya da okumak istediğin bir kitap var mı?"),
    topicContext: "Books you've read or want to read",
    levelGroup: 'intermediate',
  },
  {
    id: 'social_media_opinion',
    titleTr: t("Bugünün Konusu: Sosyal Medya"),
    openingEn: 'Hi! Do you think social media does more good or more harm?',
    openingTr: t("Merhaba! Sosyal medya sence daha çok fayda mı zarar mı veriyor?"),
    topicContext: 'Opinions about social media',
    levelGroup: 'intermediate',
  },
  {
    id: 'healthy_lifestyle',
    titleTr: t("Bugünün Konusu: Sağlıklı Yaşam"),
    openingEn: 'Hello! Do you do anything to stay healthy, like exercise?',
    openingTr: t("Merhaba! Sağlıklı kalmak için spor gibi bir şeyler yapıyor musun?"),
    topicContext: 'Health, exercise, and lifestyle habits',
    levelGroup: 'intermediate',
  },
  {
    id: 'music_taste',
    titleTr: t("Bugünün Konusu: Müzik Zevkin"),
    openingEn: "Hi! What kind of music do you listen to?",
    openingTr: t("Merhaba! Nasıl müzikler dinlersin?"),
    topicContext: 'Music taste and favorite artists',
    levelGroup: 'intermediate',
  },
  {
    id: 'future_plans',
    titleTr: t("Bugünün Konusu: Gelecek Planların"),
    openingEn: 'Hello! Where do you see yourself in a few years?',
    openingTr: t("Merhaba! Birkaç yıl sonra kendini nerede görüyorsun?"),
    topicContext: 'Future plans and goals for the next few years',
    levelGroup: 'intermediate',
  },
  {
    id: 'environment_topic',
    titleTr: t("Bugünün Konusu: Çevre"),
    openingEn: 'Hi! Do you do anything in daily life to help the environment?',
    openingTr: t("Merhaba! Günlük hayatında çevreye yardımcı olmak için bir şey yapıyor musun?"),
    topicContext: 'Environmental issues and sustainability',
    levelGroup: 'intermediate',
  },
  {
    id: 'friendship',
    titleTr: t("Bugünün Konusu: Arkadaşlık"),
    openingEn: 'Hello! What do you think makes a good friend?',
    openingTr: t("Merhaba! Sence iyi bir arkadaşı iyi yapan nedir?"),
    topicContext: 'Friendship and what makes a good friend',
    levelGroup: 'intermediate',
  },

  // ---- Advanced (C1/C2), universal ----
  {
    id: 'work_life_balance',
    titleTr: t("Bugünün Konusu: İş-Yaşam Dengesi"),
    openingEn: "Hi! How do you feel about work-life balance in today's world?",
    openingTr: t("Merhaba! Günümüzde iş-yaşam dengesi hakkında ne düşünüyorsun?"),
    topicContext: 'Work-life balance in modern society',
    levelGroup: 'advanced',
  },
  {
    id: 'ai_impact_society',
    titleTr: t("Bugünün Konusu: Yapay Zeka"),
    openingEn: 'Hello! How do you think AI will change society in the next decade?',
    openingTr: t("Merhaba! Yapay zekanın önümüzdeki 10 yılda toplumu nasıl değiştireceğini düşünüyorsun?"),
    topicContext: 'The impact of artificial intelligence on society',
    levelGroup: 'advanced',
  },
  {
    id: 'cultural_differences',
    titleTr: t("Bugünün Konusu: Kültürel Farklılıklar"),
    openingEn: "Hi! What's something about Turkish culture you think foreigners find surprising?",
    openingTr: t("Merhaba! Türk kültüründe yabancıların şaşırtıcı bulduğunu düşündüğün bir şey var mı?"),
    topicContext: 'Cultural differences between Turkey and other countries',
    levelGroup: 'advanced',
  },
  {
    id: 'career_ambitions',
    titleTr: t("Bugünün Konusu: Kariyer Hedeflerin"),
    openingEn: "Hello! What's a professional goal you're really working toward?",
    openingTr: t("Merhaba! Gerçekten üzerinde çalıştığın bir kariyer hedefin var mı?"),
    topicContext: 'Career ambitions and professional growth',
    levelGroup: 'advanced',
  },
  {
    id: 'current_events_opinion',
    titleTr: t("Bugünün Konusu: Güncel Bir Konu"),
    openingEn: "Hi! Is there any recent news that caught your attention?",
    openingTr: t("Merhaba! Dikkatini çeken yakın zamanlı bir haber var mı?"),
    topicContext: 'An opinion on a recent news topic or current event',
    levelGroup: 'advanced',
  },

  // ---- Persona-tagged ----
  {
    id: 'tech_daily_standup',
    titleTr: t("Bugünün Konusu: Yazılımcı Günlüğün"),
    openingEn: "Hi! What's a technical problem you worked on recently?",
    openingTr: t("Merhaba! Yakın zamanda üzerinde çalıştığın teknik bir problem var mı?"),
    topicContext: 'A typical day working as a developer or engineer, describing a technical task',
    levelGroup: 'intermediate',
    personas: ['tech'],
  },
  {
    id: 'job_interview_prep',
    titleTr: t("Bugünün Konusu: Mülakat Hazırlığı"),
    openingEn: "Hello! If you were in a job interview right now, what's one strength you'd mention?",
    openingTr: t("Merhaba! Şu an bir iş mülakatında olsan, bahsedeceğin bir güçlü yanın ne olurdu?"),
    topicContext: 'Preparing for a job interview, discussing strengths and experience',
    levelGroup: 'intermediate',
    personas: ['corporate'],
  },
  {
    id: 'business_meeting_smalltalk',
    titleTr: t("Bugünün Konusu: İş Toplantısı Sohbeti"),
    openingEn: "Hi! Imagine we're waiting for a business meeting to start — how's your week going?",
    openingTr: t("Merhaba! Bir iş toplantısının başlamasını beklediğimizi düşün — haftan nasıl geçiyor?"),
    topicContext: 'Small talk before a business meeting with international colleagues',
    levelGroup: 'advanced',
    personas: ['corporate'],
  },
  {
    id: 'travel_bucket_list',
    titleTr: t("Bugünün Konusu: Hayalindeki Rota"),
    openingEn: "Hello! What's a country you'd love to visit someday?",
    openingTr: t("Merhaba! Bir gün gitmeyi çok isteyeceğin bir ülke var mı?"),
    topicContext: 'Dream travel destinations and a travel bucket list',
    levelGroup: 'beginner',
    personas: ['traveler'],
  },
  {
    id: 'airport_hotel_smalltalk',
    titleTr: t("Bugünün Konusu: Havalimanında Sohbet"),
    openingEn: "Hi! Imagine we just met at the airport — where are you flying to?",
    openingTr: t("Merhaba! Havalimanında yeni tanıştığımızı düşün — nereye uçuyorsun?"),
    topicContext: 'Small talk while checking into a hotel or waiting at the airport',
    levelGroup: 'beginner',
    personas: ['traveler'],
  },
  {
    id: 'study_exam_stress',
    titleTr: t("Bugünün Konusu: Okul ve Sınavlar"),
    openingEn: 'Hello! How do you usually prepare for an exam?',
    openingTr: t("Merhaba! Bir sınava genelde nasıl hazırlanırsın?"),
    topicContext: 'School, exams, and study habits',
    levelGroup: 'beginner',
    personas: ['student'],
  },
  {
    id: 'university_life',
    titleTr: t("Bugünün Konusu: Üniversite Hayatı"),
    openingEn: "Hi! What's your favorite thing about university life so far?",
    openingTr: t("Merhaba! Üniversite hayatında şu ana kadar en sevdiğin şey ne?"),
    topicContext: 'University life, courses, and campus activities',
    levelGroup: 'intermediate',
    personas: ['student'],
  },
  {
    id: 'retirement_hobby',
    titleTr: t("Bugünün Konusu: Yeni Bir Hobi"),
    openingEn: "Hello! Have you picked up any new hobby recently? Tell me about it.",
    openingTr: t("Merhaba! Yakın zamanda yeni bir hobi edindin mi? Anlat bana."),
    topicContext: 'A hobby you picked up later in life and why you enjoy it',
    levelGroup: 'intermediate',
    personas: ['adult_hobby'],
  },
  {
    id: 'service_industry_customer',
    titleTr: t("Bugünün Konusu: Müşteri Deneyimi"),
    openingEn: 'Hi! Tell me about a memorable interaction with a customer or client.',
    openingTr: t("Merhaba! Bir müşteriyle yaşadığın akılda kalıcı bir deneyimden bahset."),
    topicContext: 'A memorable interaction with a customer or client in your business',
    levelGroup: 'intermediate',
    personas: ['service'],
  },
];

function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function levelGroupFor(cefrLevel?: string | null): ConversationTopicLevelGroup {
  if (cefrLevel === 'B1' || cefrLevel === 'B2') return 'intermediate';
  if (cefrLevel === 'C1' || cefrLevel === 'C2') return 'advanced';
  return 'beginner';
}

/**
 * Deterministic per-user-per-day pick (same "no server call needed, same
 * result all day, rotates daily" pattern backend's `GET /scenarios/recommended`
 * uses) — filtered to the user's level, biased toward their persona's topics
 * when any exist for that level. `rerollSeed` lets "Başka Konu" cycle to a
 * different pick without waiting for tomorrow.
 */
export function pickDailyTopic(
  userId: string,
  cefrLevel: string | null | undefined,
  personaId: string | null | undefined,
  rerollSeed = 0
): ConversationTopic {
  const group = levelGroupFor(cefrLevel);
  const levelPool = CONVERSATION_TOPICS.filter((t) => t.levelGroup === group);
  const personaPool = personaId ? levelPool.filter((t) => t.personas?.includes(personaId)) : [];

  const today = new Date().toISOString().slice(0, 10);
  const hash = hashString(`${userId}_${today}_${rerollSeed}`);

  const pool = personaPool.length > 0 && hash % 2 === 0 ? personaPool : levelPool;
  return pool[hash % pool.length];
}

/** Same deterministic per-user-per-day pick as `pickDailyTopic`, but returns
 * `count` distinct topics — powers the free-chat opener's "bugün ne
 * konuşmak istersin, birkaç fikir" suggestion list (Turkish Tutor Mode)
 * instead of diving straight into a single pre-picked question. */
export function pickDailyTopics(
  userId: string,
  cefrLevel: string | null | undefined,
  personaId: string | null | undefined,
  rerollSeed = 0,
  count = 3
): ConversationTopic[] {
  const group = levelGroupFor(cefrLevel);
  const levelPool = CONVERSATION_TOPICS.filter((t) => t.levelGroup === group);
  const personaPool = personaId ? levelPool.filter((t) => t.personas?.includes(personaId)) : [];
  const pool = personaPool.length >= count ? personaPool : levelPool;

  const today = new Date().toISOString().slice(0, 10);
  const picked: ConversationTopic[] = [];
  const usedIdx = new Set<number>();
  let attempt = 0;
  while (picked.length < Math.min(count, pool.length) && attempt < count * 10) {
    const hash = hashString(`${userId}_${today}_${rerollSeed}_${attempt}`);
    const idx = hash % pool.length;
    if (!usedIdx.has(idx)) {
      usedIdx.add(idx);
      picked.push(pool[idx]);
    }
    attempt++;
  }
  return picked;
}
