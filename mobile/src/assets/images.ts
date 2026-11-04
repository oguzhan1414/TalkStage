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
  loading: require('../../assets/images/companion/mivo/mivo_loading.webp'),
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
  /** Mivo with the golden mic and crown: the Spekvia Pro picture (paywall, Play subscription icon). */
  pro: require('../../assets/images/companion/mivo/mivo_pro.webp'),
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



/** Chunky 3D Bottom Navigation Icons */
export const navIcons = {
  today: require('../../assets/images/nav/today.png'),
  scenes: require('../../assets/images/nav/scenes.png'),
  words: require('../../assets/images/nav/words.png'),
  features: require('../../assets/images/nav/features.png'),
  profile: require('../../assets/images/nav/profile.png'),
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

/** Profile avatars: flat 2D portraits in the cast style, each on its own soft ground colour (see constants/avatars.ts). */
export const avatarImages = {
  campusGirl: require('../../assets/images/avatars/campus_girl.webp'),
  campusBoy: require('../../assets/images/avatars/campus_boy.webp'),
  teen: require('../../assets/images/avatars/teen.webp'),
  officeWoman: require('../../assets/images/avatars/office_woman.webp'),
  officeMan: require('../../assets/images/avatars/office_man.webp'),
  coder: require('../../assets/images/avatars/coder.webp'),
  creative: require('../../assets/images/avatars/creative.webp'),
  traveler: require('../../assets/images/avatars/traveler.webp'),
  sporty: require('../../assets/images/avatars/sporty.webp'),
  chef: require('../../assets/images/avatars/chef.webp'),
  parent: require('../../assets/images/avatars/parent.webp'),
  senior: require('../../assets/images/avatars/senior.webp'),
};

/** Onboarding art (flat 2D, transparent): what the learner struggles with, the three stages, the tour. */
export const onboardingArt = {
  struggleFreeze: require('../../assets/images/onboarding/struggle_freeze.webp'),
  struggleGrammar: require('../../assets/images/onboarding/struggle_grammar.webp'),
  struggleVocab: require('../../assets/images/onboarding/struggle_vocab.webp'),
  struggleListening: require('../../assets/images/onboarding/struggle_listening.webp'),
  levelStart: require('../../assets/images/onboarding/level_start.webp'),
  levelMid: require('../../assets/images/onboarding/level_mid.webp'),
  levelAdv: require('../../assets/images/onboarding/level_adv.webp'),
  tourStories: require('../../assets/images/onboarding/tour_stories.webp'),
  tourScenes: require('../../assets/images/onboarding/tour_scenes.webp'),
  tourReview: require('../../assets/images/onboarding/tour_review.webp'),
} as const;

/** Profile list icons and the Pro card art (flat 2D, transparent). */
export const profileArt = {
  badges: require('../../assets/images/profile/badges.webp'),
  mistakes: require('../../assets/images/profile/mistakes.webp'),
  memory: require('../../assets/images/profile/memory.webp'),
  pro: require('../../assets/images/profile/pro.webp'),
} as const;

/** 3D App States & Micro-Delights (53 - 57) */
/** The three part badges of a lesson (words, grammar, practice): gold when earned, grey before. */
export const partBadgeImages = {
  gold: [
    require('../../assets/images/badges_path/badge_words_gold.webp'),
    require('../../assets/images/badges_path/badge_grammar_gold.webp'),
    require('../../assets/images/badges_path/badge_practice_gold.webp'),
  ],
  grey: [
    require('../../assets/images/badges_path/badge_words_grey.webp'),
    require('../../assets/images/badges_path/badge_grammar_grey.webp'),
    require('../../assets/images/badges_path/badge_practice_grey.webp'),
  ],
} as const;

export const stateImages = {
  micPermission: require('../../assets/images/states/mic-permission-minimal.webp'),
  goalCelebration: require('../../assets/images/states/goal-celebration-minimal.webp'),
  trashDelete: require('../../assets/images/states/trash-minimal.webp'),
  editPencil: require('../../assets/images/states/edit-pencil-minimal.webp'),
  xpBolt: require('../../assets/images/states/xp-bolt-minimal.webp'),
  mistakesNotebook: require('../../assets/images/profile/mistakes.webp'),
};

export const calibrationImages = {
  micOrb: require('../../assets/images/nav/voice.webp'),
  micPermission: require('../../assets/images/states/mic-permission-minimal.webp'),
};

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

/** Kelimeler (word bank) art: flat 2D on transparent ground, cream/ink palette with the word-type colours. */
export const vocabArt = {
  deckDone: require('../../assets/images/vocab/mivo_deck_done.webp'),
  emptyChest: require('../../assets/images/vocab/mivo_empty_chest.webp'),
  listening: require('../../assets/images/vocab/mivo_listening.webp'),
  coverNouns: require('../../assets/images/vocab/cover_nouns.webp'),
  coverVerbs: require('../../assets/images/vocab/cover_verbs.webp'),
  coverAdjectives: require('../../assets/images/vocab/cover_adjectives.webp'),
  iconLibrary: require('../../assets/images/vocab/icon_library.webp'),
  iconGroups: require('../../assets/images/vocab/icon_groups.webp'),
  iconRooms: require('../../assets/images/vocab/icon_rooms.webp'),
  iconPronunciation: require('../../assets/images/vocab/icon_pronunciation.webp'),
} as const;
