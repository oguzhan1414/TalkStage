/**
 * Central registry for static image assets in Spekvia Mobile.
 * Metro requires string-literal `require()` calls (no dynamic paths).
 */
import type { ScenarioCategory } from '../constants/categories';

/** Mivo — the app's language-explorer companion and AI conversation guide. */
export const mivoImages = {
  idle: require('../../assets/images/companion/mivo/mivo_idle.webp'),
  listening: require('../../assets/images/companion/mivo/mivo_listening.webp'),
  thinking: require('../../assets/images/companion/mivo/mivo_thinking.webp'),
  speaking: require('../../assets/images/companion/mivo/mivo_speaking.webp'),
  loading: require('../../assets/images/companion/mivo/mivo_loading_flip.webp'),
  success: require('../../assets/images/companion/mivo/mivo_success.webp'),
} as const;

/** Round-friendly Mivo busts for the voice rooms (status strip, hint card, correction card). */
export const mivoVoiceImages = {
  wait: require('../../assets/images/companion/mivo/mivo_voice_wait.webp'),
  listen: require('../../assets/images/companion/mivo/mivo_voice_listen.webp'),
  think: require('../../assets/images/companion/mivo/mivo_voice_think.webp'),
  speak: require('../../assets/images/companion/mivo/mivo_voice_speak.webp'),
  note: require('../../assets/images/companion/mivo/mivo_voice_note.webp'),
} as const;

/** Context-specific Mivo artwork for the Home experience. */
export const mivoHomeImages = {
  lessonGuide: require('../../assets/images/companion/mivo/mivo_lesson_guide.webp'),
  chatInvite: require('../../assets/images/companion/mivo/mivo_chat_invite.webp'),
  /** Portrait for Home's round chat button: big face, wave, heart bubble (readable at ~60 px). */
  fab: require('../../assets/images/companion/mivo/mivo_fab.webp'),
} as const;

/** Calm, rounded 3D icons for the Today learning roadmap. */
export const roadmapTaskImages = {
  lesson: require('../../assets/images/roadmap/grammar-soft.png'),
  vocab: require('../../assets/images/roadmap/vocabulary-soft.png'),
  listening: require('../../assets/images/roadmap/listening-soft.png'),
  reading: require('../../assets/images/roadmap/reading-soft.webp'),
  review: require('../../assets/images/roadmap/speaking-soft.png'),
  scene: require('../../assets/images/roadmap/speaking-soft.png'),
  writing: require('../../assets/images/states/edit-pencil-minimal.webp'),
} as const;

/**
 * Eski "Yankı" (fincan karakteri) görsellerinin yerine Mivo pozları. Eski dışa aktarım adları, onları
 * kullanan ekranlar değişmesin diye korunuyor; hepsi artık Mivo görsellerine işaret ediyor.
 */
export const companionImage = mivoImages.idle;
/** Büyülü/konuşma pozu (eski `yankiMagicImage`). */
export const yankiMagicImage = mivoImages.speaking;
/** Konuşma animasyonunda "ağız kapalı" yedeği: konuşan poz ile dinlenme pozu dönüşümlü gösterilir. */
export const yankiMagicMouthClosedImage = mivoImages.idle;
export const yankiGreetingImage = mivoHomeImages.chatInvite;

/** Full-screen Pro offer poster (941x1672, Turkish text + price baked in -> only shown for the Turkish UI).
 * `mivo_final_days_999` and `mivo_special_offer_999` also exist in assets/images/paywall but claim urgency / a
 * personal discount: use them only for real campaigns. */

/** Waving Mivo for the Welcome screen (transparent WebP). */
export const mivoWaveImage = require('../../assets/images/companion/mivo/mivo_wave.webp');
export const yankiListeningImage = mivoImages.listening;
export const yankiCelebrateImage = mivoImages.success;

/** Başarılar ekranı başlığı (renkli ikon ailesi). */
export const premiumModuleIcons = {
  achievements: require('../../assets/images/premium/achievements-minimal.webp'),
};

/** Minimal, colorful feature-card icon family aligned with the main tab icons. */
export const minimalFeatureIcons = {
  mistakesNotebook: require('../../assets/images/premium/mistakes-minimal.webp'),
  mivoMemory: require('../../assets/images/premium/mivo-memory-minimal.webp'),
  vocabLibrary: require('../../assets/images/premium/vocab-library-minimal.webp'),
  vocabFolders: require('../../assets/images/premium/vocab-folders-minimal.webp'),
  reading: require('../../assets/images/premium/reading-minimal.webp'),
  podcasts: require('../../assets/images/premium/podcasts-minimal.webp'),
  pronunciation: require('../../assets/images/premium/pronunciation-minimal.webp'),
  badges: require('../../assets/images/premium/badges-minimal.webp'),
} as const;

export const podcastStudioWallpaper = require('../../assets/images/podcast_studio_wallpaper.webp');

export const podcastCovers = {
  a1Cafe: require('../../assets/images/podcast_cover_a1_cafe.webp'),
  a1Routines: require('../../assets/images/podcast_cover_a1_routines.webp'),
  a1City: require('../../assets/images/podcast_cover_a1_city.webp'),
  a1Bistro: require('../../assets/images/podcast_cover_a1_bistro.webp'),
  a1Picnic: require('../../assets/images/podcast_cover_a1_picnic.webp'),
  a2Airport: require('../../assets/images/podcast_cover_a2_airport.webp'),
  a2Hotel: require('../../assets/images/podcast_cover_a2_hotel.webp'),
  a2Shopping: require('../../assets/images/podcast_cover_a2_shopping.webp'),
  a2Doctor: require('../../assets/images/podcast_cover_a2_home.webp'),
  a2Cinema: require('../../assets/images/podcast_cover_b1_interview.webp'),
  b1Interview: require('../../assets/images/podcast_cover_b1_interview.webp'),
  b1Apartment: require('../../assets/images/podcast_cover_a2_hotel.webp'),
  b1Luggage: require('../../assets/images/podcast_cover_a2_airport.webp'),
  b1AI: require('../../assets/images/podcast_cover_b2_tech.webp'),
  b1Green: require('../../assets/images/podcast_cover_a1_picnic.webp'),
  cafeA1: require('../../assets/images/podcast_cover_a1_cafe.webp'),
  homeA2: require('../../assets/images/podcast_cover_a2_home.webp'),
  interviewB1: require('../../assets/images/podcast_cover_b1_interview.webp'),
  techB2: require('../../assets/images/podcast_cover_b2_tech.webp'),
};

/** Chunky 3D Bottom Navigation Icons */
export const navIcons = {
  today: require('../../assets/images/nav/today.png'),
  scenes: require('../../assets/images/nav/scenes.png'),
  words: require('../../assets/images/nav/words.png'),
  features: require('../../assets/images/nav/features.png'),
};

/** Bento Scenario Categories (05 - 10) */
export const scenarioCategoryImages: Record<ScenarioCategory, ReturnType<typeof require>> = {
  tech: require('../../assets/images/premium/scenarios/tech-editorial.jpg'),
  career: require('../../assets/images/premium/scenarios/career-editorial.jpg'),
  visa: require('../../assets/images/premium/scenarios/visa-editorial.jpg'),
  b2b: require('../../assets/images/premium/scenarios/b2b-editorial.webp'),
  travel: require('../../assets/images/premium/scenarios/travel-editorial.webp'),
  daily: require('../../assets/images/premium/scenarios/daily-editorial.webp'),
};

/**
 * Resolves a 3D video scenario's cover-photo fallback (used when there's no
 * cover URL yet, or the real one fails to load at runtime). The video
 * scenarios' own category label set (`@talkstage/shared-data/scenariosData`'s
 * `ScenarioEntry.category`: business/interview/daily/travel/tech) doesn't
 * fully match this file's photo-library category set (b2b/career/visa/tech/
 * travel/daily) — 'business' and 'interview' need remapping. This was
 * previously copy-pasted (with the interview→career step missing) into the
 * Sinema Stüdyosu card, the Ana Ekran spotlight card, and the video modal
 * separately; now there's one place to get it right.
 */
export function resolveScenarioCategoryFallback(category: string): ReturnType<typeof require> {
  const mapped = category === 'business' ? 'b2b' : category === 'interview' ? 'career' : category;
  return scenarioCategoryImages[mapped as ScenarioCategory] ?? companionImage;
}

/** Dedicated custom cover images for 3D Video Scenarios */
export const scenarioCustomCovers: Record<string, ReturnType<typeof require>> = {
  // A1 Scenarios
  'fastfood-burger': require('../../assets/images/scenarios/fastfood-burger.webp'),
  'supermarket-checkout': require('../../assets/images/scenarios/supermarket-checkout.webp'),
  'street-directions': require('../../assets/images/scenarios/street-directions.webp'),
  'train-ticket': require('../../assets/images/scenarios/train-ticket.webp'),
  'cafe-meetup': require('../../assets/images/scenarios/cafe-meetup.webp'),
  'airport-travel': require('../../assets/images/scenarios/airport-travel.webp'),
  'hotel-checkin': require('../../assets/images/scenarios/hotel-checkin.jpg'),
  'neighbor-meetup': require('../../assets/images/scenarios/neighbor-meetup.jpg'),
  // A2 & B1 Scenarios
  'flea-market': require('../../assets/images/scenarios/flea-market.webp'),
  'local-sim-card': require('../../assets/images/scenarios/local-sim-card.webp'),
  'rooftop-social': require('../../assets/images/scenarios/rooftop-social.webp'),
  'apartment-viewing': require('../../assets/images/scenarios/apartment-viewing.webp'),
  'colleague-break': require('../../assets/images/scenarios/colleague-break.webp'),
  'car-rental': require('../../assets/images/scenarios/car-rental.webp'),
  'clothing-boutique': require('../../assets/images/scenarios/clothing-boutique.jpg'),
  'doctor-visit': require('../../assets/images/scenarios/doctor-visit.jpg'),
  'fitness-gym': require('../../assets/images/scenarios/fitness-gym.jpg'),
  'istanbul-tour': require('../../assets/images/scenarios/istanbul-tour.webp'),
  'restaurant-dinner': require('../../assets/images/scenarios/restaurant-dinner.jpg'),
  'taxi-ride': require('../../assets/images/scenarios/taxi-ride.webp'),
  'job-interview': require('../../assets/images/scenarios/job-interview.jpg'),
};

/**
 * Resolves the primary visual cover for a scenario:
 * Prefers the dedicated 3D/Pixel Art cover image, with fallback to category art.
 */
export function resolveScenarioCoverSource(scenario: { id: string; category: string; coverImage?: string }): any {
  if (scenarioCustomCovers[scenario.id]) {
    return scenarioCustomCovers[scenario.id];
  }
  return resolveScenarioCategoryFallback(scenario.category);
}

/** Minimal rounded CEFR badges. Distinct paths avoid cached legacy shields. */
export const cefrLevelImages: Record<string, ReturnType<typeof require>> = {
  A1: require('../../assets/images/levels/a1-rounded.png'),
  A2: require('../../assets/images/levels/a2-rounded.png'),
  B1: require('../../assets/images/levels/b1-rounded.png'),
  B2: require('../../assets/images/levels/b2-rounded.png'),
  C1: require('../../assets/images/levels/c1-rounded.png'),
  C2: require('../../assets/images/levels/c2-rounded.webp'),
};

/** 3D User Personas / Avatars (58 - 63) */
export const avatarImages = {
  maleDev: require('../../assets/images/avatars/male_dev.webp'),
  femaleLead: require('../../assets/images/avatars/female_lead.webp'),
  maleTraveler: require('../../assets/images/avatars/male_traveler.webp'),
  femaleDesigner: require('../../assets/images/avatars/female_designer.webp'),
  maleEngineer: require('../../assets/images/avatars/male_engineer.webp'),
  femaleEntrepreneur: require('../../assets/images/avatars/female_entrepreneur.webp'),
  // Dedicated onboarding persona portraits (2026-08-26) — replace the emoji-badge
  // fallback the onboarding Persona screen used for personas that had no genuinely
  // matching photo among the 6 career avatars above.
  studentYouth: require('../../assets/images/avatars/student_youth.webp'),
  travelerExplorer: require('../../assets/images/avatars/traveler_explorer.webp'),
  matureSenior: require('../../assets/images/avatars/mature_senior.webp'),
  proDeveloper: require('../../assets/images/avatars/pro_developer.webp'),
};

/** 3D App States & Micro-Delights (53 - 57) */
export const stateImages = {
  micPermission: require('../../assets/images/states/mic-permission-minimal.webp'),
  goalCelebration: require('../../assets/images/states/goal-celebration-minimal.webp'),
  emptyChest: require('../../assets/images/states/empty-chest-minimal.webp'),
  vipPass: require('../../assets/images/states/vip-pass-minimal.webp'),
  trashDelete: require('../../assets/images/states/trash-minimal.webp'),
  editPencil: require('../../assets/images/states/edit-pencil-minimal.webp'),
  xpBolt: require('../../assets/images/states/xp-bolt-minimal.webp'),
  mistakesNotebook: require('../../assets/images/premium/mistakes-minimal.webp'), // was a dark JPG with baked English text
};

export const calibrationImages = {
  micOrb: require('../../assets/images/nav/voice.webp'),
  micPermission: require('../../assets/images/states/mic-permission-minimal.webp'),
};

/**
 * Reading passage scene images — backend content (`reading_passages.scenes[].image_key`)
 * only ever sends one of these string keys, never a require() path (content is
 * data, not code). Reuses the existing category/avatar/state art instead of
 * generating bespoke per-story illustrations.
 */
import { readingA1Images, readingA2Images } from './readingImages';
export { readingA1Images, readingA2Images };

export const readingSceneImages: Record<string, ReturnType<typeof require>> = {
  ...readingA1Images,
  ...readingA2Images,
  daily: scenarioCategoryImages.daily,
  travel: scenarioCategoryImages.travel,
  visa: scenarioCategoryImages.visa,
  tech: scenarioCategoryImages.tech,
  career: scenarioCategoryImages.career,
  b2b: scenarioCategoryImages.b2b,
  companion: companionImage,
  celebration: require('../../assets/images/states/goal-celebration-minimal.webp'),
  avatar_dev: require('../../assets/images/avatars/male_dev.webp'),
  avatar_lead: require('../../assets/images/avatars/female_lead.webp'),
  avatar_traveler: require('../../assets/images/avatars/male_traveler.webp'),
  avatar_designer: require('../../assets/images/avatars/female_designer.webp'),
  avatar_engineer: require('../../assets/images/avatars/male_engineer.webp'),
  avatar_entrepreneur: require('../../assets/images/avatars/female_entrepreneur.webp'),
};

/**
 * Hikaye kapak görselleri. Anahtar: hikayenin `slug`'ı (öncelikli) veya `theme` etiketi
 * (aile, yemek, seyahat…). Yeni görsel eklenince buraya bir satır ekle; kayıt yoksa
 * ilk sahnenin görseli kullanılır.
 */
export const readingCoverImages: Record<string, ReturnType<typeof require>> = {};

/** Minimal rounded achievement badges and their matching CEFR level set. */
export const badgeImages = {
  firstMic: require('../../assets/images/badges/first-mic.webp'),
  zeroFreeze: require('../../assets/images/badges/zero-freeze.webp'),
  starCollector: require('../../assets/images/badges/star-collector.webp'),
  perfectTake: require('../../assets/images/badges/flawless-take.webp'),
  visaApproved: require('../../assets/images/badges/visa-approved.webp'),
  negotiator: require('../../assets/images/badges/negotiator.webp'),
  standupHero: require('../../assets/images/badges/standup-hero.webp'),
  mivoFriend: require('../../assets/images/badges/mivo-friend.webp'),
  vocabHunter: require('../../assets/images/badges/vocab-hunter.webp'),
  pronunciationProdigy: require('../../assets/images/badges/pronunciation-prodigy.webp'),
  bookworm: require('../../assets/images/badges/bookworm.webp'),
  podcastFan: require('../../assets/images/badges/podcast-fan.webp'),
  lessonGraduate: require('../../assets/images/badges/grammar-scholar.webp'),
  fullDay: require('../../assets/images/badges/full-day.webp'),
  sevenDayFlame: require('../../assets/images/badges/7day-flame.webp'),
  thirtyDayMaster: require('../../assets/images/badges/30day-master.webp'),
  hundredDayLegend: require('../../assets/images/badges/100day-legend.webp'),
  earlyBird: require('../../assets/images/badges/early-bird.webp'),
  nightOwl: require('../../assets/images/badges/night-owl.webp'),
  levelA1: require('../../assets/images/badges/level-a1.webp'),
  levelA2: require('../../assets/images/badges/level-a2.webp'),
  levelB1: require('../../assets/images/badges/level-b1.webp'),
  levelB2: require('../../assets/images/badges/level-b2.webp'),
  levelC1: require('../../assets/images/badges/level-c1.webp'),
  levelC2: require('../../assets/images/badges/level-c2.webp'),
} as const;

/** Auth & Welcome 3D Hero Artwork */
/** Horizontal "spekvia" logo (purple lettering with the gold spark), cropped tight; aspect ratio 3.62:1. */
export const spekviaWordmark = require('../../assets/images/brand/spekvia_wordmark.webp');
