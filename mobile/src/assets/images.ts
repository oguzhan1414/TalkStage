/**
 * Central registry for static image assets in TalkStage Mobile.
 * Metro requires string-literal `require()` calls (no dynamic paths).
 */
import type { ScenarioCategory } from '../constants/categories';

/** Mivo — the app's language-explorer companion and AI conversation guide. */
export const mivoImages = {
  idle: require('../../assets/images/companion/mivo/mivo_idle.png'),
  listening: require('../../assets/images/companion/mivo/mivo_listening.png'),
  thinking: require('../../assets/images/companion/mivo/mivo_thinking.png'),
  speaking: require('../../assets/images/companion/mivo/mivo_speaking.png'),
  loading: require('../../assets/images/companion/mivo/mivo_loading_flip.png'),
  success: require('../../assets/images/companion/mivo/mivo_success.png'),
} as const;

/** Context-specific Mivo artwork for the Home experience. */
export const mivoHomeImages = {
  lessonGuide: require('../../assets/images/companion/mivo/mivo_lesson_guide.png'),
  chatInvite: require('../../assets/images/companion/mivo/mivo_chat_invite.png'),
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
export const yankiListeningImage = mivoImages.listening;
export const yankiCelebrateImage = mivoImages.success;

/** TalkStage premium module icons — mature satin-metal/frosted-glass family. */
export const premiumModuleIcons = {
  mistakeAnalysis: require('../../assets/images/premium/mistake-analysis.png'),
  wordSets: require('../../assets/images/premium/word-sets.png'),
  achievements: require('../../assets/images/premium/achievements.png'),
  freePractice: require('../../assets/images/premium/free-practice.png'),
};

/** Light premium icon family for the Özellikler tab feature cards. */
export const premiumFeatureIcons = {
  mistakesNotebook: require('../../assets/images/premium/mistakes-premium.png'),
  vocabLibrary: require('../../assets/images/premium/vocab-library-premium.png'),
  vocabFolders: require('../../assets/images/premium/vocab-folders-premium.png'),
  badges: require('../../assets/images/premium/badges-premium.png'),
  podcasts: require('../../assets/images/premium/podcasts-premium.png'),
  pronunciation: require('../../assets/images/premium/pronunciation-premium.png'),
} as const;

/** Minimal, colorful feature-card icon family aligned with the main tab icons. */
export const minimalFeatureIcons = {
  mistakesNotebook: require('../../assets/images/premium/mistakes-minimal.png'),
  mivoMemory: require('../../assets/images/premium/mivo-memory-minimal.png'),
  vocabLibrary: require('../../assets/images/premium/vocab-library-minimal.png'),
  vocabFolders: require('../../assets/images/premium/vocab-folders-minimal.png'),
  reading: require('../../assets/images/premium/reading-minimal.png'),
  podcasts: require('../../assets/images/premium/podcasts-minimal.png'),
  pronunciation: require('../../assets/images/premium/pronunciation-minimal.png'),
} as const;

export const podcastStudioWallpaper = require('../../assets/images/podcast_studio_wallpaper.jpg');

export const podcastCovers = {
  a1Cafe: require('../../assets/images/podcast_cover_a1_cafe.jpg'),
  a1Routines: require('../../assets/images/podcast_cover_a1_routines.jpg'),
  a1City: require('../../assets/images/podcast_cover_a1_city.jpg'),
  a1Bistro: require('../../assets/images/podcast_cover_a1_bistro.jpg'),
  a1Picnic: require('../../assets/images/podcast_cover_a1_picnic.jpg'),
  a2Airport: require('../../assets/images/podcast_cover_a2_airport.jpg'),
  a2Hotel: require('../../assets/images/podcast_cover_a2_hotel.jpg'),
  a2Shopping: require('../../assets/images/podcast_cover_a2_shopping.jpg'),
  a2Doctor: require('../../assets/images/podcast_cover_a2_home.jpg'),
  a2Cinema: require('../../assets/images/podcast_cover_b1_interview.jpg'),
  b1Interview: require('../../assets/images/podcast_cover_b1_interview.jpg'),
  b1Apartment: require('../../assets/images/podcast_cover_a2_hotel.jpg'),
  b1Luggage: require('../../assets/images/podcast_cover_a2_airport.jpg'),
  b1AI: require('../../assets/images/podcast_cover_b2_tech.jpg'),
  b1Green: require('../../assets/images/podcast_cover_a1_picnic.jpg'),
  cafeA1: require('../../assets/images/podcast_cover_a1_cafe.jpg'),
  homeA2: require('../../assets/images/podcast_cover_a2_home.jpg'),
  interviewB1: require('../../assets/images/podcast_cover_b1_interview.jpg'),
  techB2: require('../../assets/images/podcast_cover_b2_tech.jpg'),
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
  b2b: require('../../assets/images/premium/scenarios/b2b-editorial.jpg'),
  travel: require('../../assets/images/premium/scenarios/travel-editorial.jpg'),
  daily: require('../../assets/images/premium/scenarios/daily-editorial.jpg'),
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
  'fastfood-burger': require('../../assets/images/scenarios/fastfood-burger.jpg'),
  'supermarket-checkout': require('../../assets/images/scenarios/supermarket-checkout.jpg'),
  'street-directions': require('../../assets/images/scenarios/street-directions.jpg'),
  'train-ticket': require('../../assets/images/scenarios/train-ticket.jpg'),
  'cafe-meetup': require('../../assets/images/scenarios/cafe-meetup.jpg'),
  'airport-travel': require('../../assets/images/scenarios/airport-travel.jpg'),
  'hotel-checkin': require('../../assets/images/scenarios/hotel-checkin.jpg'),
  'neighbor-meetup': require('../../assets/images/scenarios/neighbor-meetup.jpg'),
  // A2 & B1 Scenarios
  'flea-market': require('../../assets/images/scenarios/flea-market.jpg'),
  'local-sim-card': require('../../assets/images/scenarios/local-sim-card.jpg'),
  'rooftop-social': require('../../assets/images/scenarios/rooftop-social.jpg'),
  'apartment-viewing': require('../../assets/images/scenarios/apartment-viewing.jpg'),
  'colleague-break': require('../../assets/images/scenarios/colleague-break.jpg'),
  'car-rental': require('../../assets/images/scenarios/car-rental.jpg'),
  'clothing-boutique': require('../../assets/images/scenarios/clothing-boutique.jpg'),
  'doctor-visit': require('../../assets/images/scenarios/doctor-visit.jpg'),
  'fitness-gym': require('../../assets/images/scenarios/fitness-gym.jpg'),
  'istanbul-tour': require('../../assets/images/scenarios/istanbul-tour.jpg'),
  'restaurant-dinner': require('../../assets/images/scenarios/restaurant-dinner.jpg'),
  'taxi-ride': require('../../assets/images/scenarios/taxi-ride.jpg'),
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

/** 3D Glass CEFR Progression Shields (47 - 52) */
export const cefrLevelImages: Record<string, ReturnType<typeof require>> = {
  A1: require('../../assets/images/levels/a1.png'),
  A2: require('../../assets/images/levels/a2.png'),
  B1: require('../../assets/images/levels/b1.png'),
  B2: require('../../assets/images/levels/b2.png'),
  C1: require('../../assets/images/levels/c1.png'),
  C2: require('../../assets/images/levels/c2.png'),
};

/** 3D User Personas / Avatars (58 - 63) */
export const avatarImages = {
  maleDev: require('../../assets/images/avatars/male_dev.png'),
  femaleLead: require('../../assets/images/avatars/female_lead.png'),
  maleTraveler: require('../../assets/images/avatars/male_traveler.png'),
  femaleDesigner: require('../../assets/images/avatars/female_designer.png'),
  maleEngineer: require('../../assets/images/avatars/male_engineer.png'),
  femaleEntrepreneur: require('../../assets/images/avatars/female_entrepreneur.png'),
  // Dedicated onboarding persona portraits (2026-08-26) — replace the emoji-badge
  // fallback the onboarding Persona screen used for personas that had no genuinely
  // matching photo among the 6 career avatars above.
  studentYouth: require('../../assets/images/avatars/student_youth.jpg'),
  travelerExplorer: require('../../assets/images/avatars/traveler_explorer.jpg'),
  matureSenior: require('../../assets/images/avatars/mature_senior.jpg'),
  proDeveloper: require('../../assets/images/avatars/pro_developer.jpg'),
};

/** 3D App States & Micro-Delights (53 - 57) */
export const stateImages = {
  micPermission: require('../../assets/images/states/mic_permission.png'),
  goalCelebration: require('../../assets/images/states/goal_celebration.png'),
  emptyChest: require('../../assets/images/states/empty_chest.png'),
  reconnecting: require('../../assets/images/states/reconnecting.png'),
  vipPass: require('../../assets/images/states/vip_pass.png'),
  trashDelete: require('../../assets/images/states/trash_delete.png'),
  editPencil: require('../../assets/images/states/edit_pencil.png'),
  gemDiamond: require('../../assets/images/states/gem_diamond.png'),
  xpBolt: require('../../assets/images/states/xp_bolt.png'),
  mistakesNotebook: require('../../assets/images/states/mistakes_notebook.jpg'),
  streakFlame3d: require('../../assets/images/states/streak_flame_3d.png'),
};

export const calibrationImages = {
  micOrb: require('../../assets/images/nav/voice.png'),
  micPermission: require('../../assets/images/states/mic_permission.png'),
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
  celebration: require('../../assets/images/states/goal_celebration.png'),
  avatar_dev: require('../../assets/images/avatars/male_dev.png'),
  avatar_lead: require('../../assets/images/avatars/female_lead.png'),
  avatar_traveler: require('../../assets/images/avatars/male_traveler.png'),
  avatar_designer: require('../../assets/images/avatars/female_designer.png'),
  avatar_engineer: require('../../assets/images/avatars/male_engineer.png'),
  avatar_entrepreneur: require('../../assets/images/avatars/female_entrepreneur.png'),
};

/**
 * Hikaye kapak görselleri. Anahtar: hikayenin `slug`'ı (öncelikli) veya `theme` etiketi
 * (aile, yemek, seyahat…). Yeni görsel eklenince buraya bir satır ekle; kayıt yoksa
 * ilk sahnenin görseli kullanılır.
 */
export const readingCoverImages: Record<string, ReturnType<typeof require>> = {};

/** 3D Gamification Badges (14 - 23) */
export const badgeImages = {
  firstMic: require('../../assets/images/badges/first-mic.png'),
  standupHero: require('../../assets/images/badges/standup-hero.png'),
  visaApproved: require('../../assets/images/badges/visa-approved.png'),
  sevenDayFlame: require('../../assets/images/badges/7day-flame.png'),
  thirtyDayMaster: require('../../assets/images/badges/30day-master.png'),
  zeroFreeze: require('../../assets/images/badges/zero-freeze.png'),
  vocabHunter: require('../../assets/images/badges/vocab-hunter.png'),
  negotiator: require('../../assets/images/badges/negotiator.png'),
  pronunciationProdigy: require('../../assets/images/badges/pronunciation-prodigy.png'),
  earlyBird: require('../../assets/images/badges/early-bird.png'),
};

/** Auth & Welcome 3D Hero Artwork */
export const authWelcomeHeroBg = require('../../assets/images/auth_welcome_hero_bg.jpg');
export const appLogoIcon = require('../../assets/icon.png');
