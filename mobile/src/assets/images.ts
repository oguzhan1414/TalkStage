/**
 * Central registry for static image assets in TalkStage Mobile.
 * Metro requires string-literal `require()` calls (no dynamic paths).
 */
import type { ScenarioCategory } from '../constants/categories';

export const companionImage = require('../../assets/images/companion/yanki.png');
export const onboardingHero = require('../../assets/images/companion/yanki.png');
/** Yankı with a wand + sparkles — used by the onboarding "AI Plan Hazırlığı" (Magic Moment) screen. */
export const yankiMagicImage = require('../../assets/images/companion/yanki_magic.png');
export const aiOrb = require('../../assets/images/ai-orb.jpg');
export const learningPathLandscape = require('../../assets/images/learning_path_landscape.jpg');
export const levelsRoadmapIslandBg = require('../../assets/images/levels_roadmap_island_bg.jpg');
export const verticalIslandPathBg = require('../../assets/images/vertical_island_path_bg.jpg');
export const studyStudioLounge = require('../../assets/images/study_studio_lounge.jpg');
export const podcastStudioWallpaper = require('../../assets/images/podcast_studio_wallpaper.jpg');
export const podcastHubIcon = require('../../assets/images/podcast_hub_3d_icon.jpg');

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

/** 3D Frosted Glass Bottom Navigation Icons (42 - 46) */
export const navIcons = {
  home: require('../../assets/images/nav/home.png'),
  decks: require('../../assets/images/nav/decks.png'),
  voice: require('../../assets/images/nav/voice.png'),
  trophy: require('../../assets/images/nav/trophy.png'),
  profile: require('../../assets/images/nav/profile.png'),
};

/** Bento Scenario Categories (05 - 10) */
export const scenarioCategoryImages: Record<ScenarioCategory, ReturnType<typeof require>> = {
  tech: require('../../assets/images/scenarios/tech.jpg'),
  career: require('../../assets/images/scenarios/career.jpg'),
  visa: require('../../assets/images/scenarios/visa.jpg'),
  b2b: require('../../assets/images/scenarios/b2b.jpg'),
  travel: require('../../assets/images/scenarios/travel.jpg'),
  daily: require('../../assets/images/scenarios/daily.jpg'),
};

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
};

/** 3D Module Feature Cards (24 - 27) */
export const homeImages = {
  vocabDeck: require('../../assets/images/cards/vocab_deck.png'),
  readingModule: require('../../assets/images/cards/reading_module.png'),
  levelAssessment: require('../../assets/images/cards/level_assessment.png'),
  streakCalendar: require('../../assets/images/cards/streak_calendar.png'),
};

export const vocabImages = {
  emptyChest: require('../../assets/images/states/empty_chest.png'),
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
export const readingSceneImages: Record<string, ReturnType<typeof require>> = {
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
export const yankiAuthWelcomeHero = require('../../assets/images/yanki_auth_welcome_hero.jpg');
export const appLogoIcon = require('../../assets/icon.png');
