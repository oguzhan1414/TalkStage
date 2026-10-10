import type { ScenePlayPayload } from '../lib/sceneTwists';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { SessionOut } from '../types/api';

export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

export type AuthStackScreenProps<T extends keyof AuthStackParamList> = NativeStackScreenProps<
  AuthStackParamList,
  T
>;

/**
 * New 8-step onboarding flow (V2.0, ported from the design spec at
 * `landing/src/app/onboarding/page.tsx`). No route params — every screen
 * reads/writes the in-progress answers via `useOnboarding()`'s `draft`
 * instead of threading ever-growing params through 8 screens.
 */
export type OnboardingStackParamList = {
  Welcome: undefined;
  Name: undefined;
  Persona: undefined;
  Goal: undefined;
  // Voice mini-demo beat (revived `/onboarding/calibrate`, see `backend/CLAUDE.md`
  // Ek 23/Ek 1) — `MicPermission` explains + requests mic access, `Calibration`
  // records 2 short answers and estimates CEFR level. `Level` is no longer on
  // the main path; it's the fallback both of these can drop into (denied
  // permission, skipped, or a calibration API failure).
  MicPermission: undefined;
  Calibration: undefined;
  Level: undefined;
  DailyTime: undefined;
  Preparing: undefined;
  Ready: undefined;
};

export type OnboardingStackScreenProps<T extends keyof OnboardingStackParamList> = NativeStackScreenProps<
  OnboardingStackParamList,
  T
>;

export type MainTabParamList = {
  Home: undefined;
  Scenarios: { openSceneId?: string } | undefined;
  Vocab: undefined;
  Profile: undefined;
};

/**
 * Root stack: `Auth` while there's no session, then `Onboarding` until the
 * user has picked interests, then `Main` (tab navigator) with
 * `LiveConversationRoom` and `Scorecard` as sibling screens pushed on top of it.
 */
export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Onboarding: NavigatorScreenParams<OnboardingStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
  // `scenarioId`/`scenarioTitle` are omitted when arriving via deep link
  // (`spekvia://scenario/:slug` only ever carries the slug) — the screen
  // resolves them itself via `GET /scenarios/{slug}` when missing.
  LiveConversationRoom: { scenarioSlug: string; scenarioId?: string; scenarioTitle?: string };
  // Topic-less live voice room (+ optional `scene`: live variation of a video scene via `WS /ws/scene-play`) — Home's FAB and Profile's "Serbest Yazma"
  // card. Backed by `WS /ws/free-chat` (no `scenarios` row, see
  // `backend/app/api/routes/freechat_session.py`), so unlike
  // `LiveConversationRoom` it takes no params at all.
  FreeChatRoom: { scene?: ScenePlayPayload; twistTitle?: string; twistEmoji?: string; twistHint?: string } | undefined;
  Scorecard: { session: SessionOut; scenarioTitle: string; wordsAddedCount: number };
  ReadingList: undefined;
  ReadingPassage: { slug: string };
  Paywall: undefined;
  Badges: undefined;
  // Account/settings screen reached by tapping the avatar in the shared
  // `AppHeader` (top of every main tab) — distinct from the `Profile` TAB,
  // which now shows the "Özellikler" feature list instead of account info.
  AccountSettings: undefined;
  // Full teaching content for one A1_G0X grammar topic (table, dialogue,
  // mistakes, examples) — see `data/grammarLessons.ts`. Free for the topic's
  // `isFree` lesson, Pro-gated for the rest (screen checks `isProUser()`
  // itself, no need to pass a flag here).
  GrammarLesson: { code: string };
  MistakesNotebook: undefined;
  MivoMemory: undefined;
  VocabLibrary: undefined;
  VocabDecks: undefined;
  MispronouncedWords: undefined;
  PodcastList: undefined;
  PodcastPlayer: { episodeId: string };
  // `focusTopic` is set when opened from Bugün's "Öğrenme Yolun" chapter path
  // (a grammar topic or the level's boss challenge) so the opening message can steer the
  // conversation toward practicing that specific structure. `dailyTask` is a
  // richer role/scenario/goals variant (its first user message logs
  // `POST /progress/log-practice`, see TextChatScreen) — its only producer
  // (the now-removed Çalışma Takvimi screen) is gone, so no caller passes it
  // today, but TextChatScreen's handling is left in place since it's harmless
  // and a future entry point could resurrect it cheaply. Both are omitted for
  // the regular Home entry point, which just opens a free daily-chat session.
  TextChat:
    | {
        // `topicCode` (e.g. "A1_G01") attributes any correction the model
        // finds during this chat to a specific grammar topic when logged to
        // `grammar_mistakes` server-side — omitted when the chat isn't tied
        // to a specific curriculum topic (e.g. boss challenges, free chat).
        focusTopic?: { title: string; formula?: string; targetWords?: string[]; topicCode?: string };
        dailyTask?: {
          id: string;
          title: string;
          roleName: string;
          roleBio: string;
          scenario: string;
          goals: string[];
          openingEn: string;
          openingTr: string;
          topicCode?: string;
        };
      }
    | undefined;
};

/** Tab screens compose with the root stack's props so they can navigate to `LiveConversationRoom`. */
export type MainTabScreenProps<T extends keyof MainTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, T>,
  NativeStackScreenProps<RootStackParamList>
>;

export type LiveConversationRoomScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'LiveConversationRoom'
>;

export type FreeChatRoomScreenProps = NativeStackScreenProps<RootStackParamList, 'FreeChatRoom'>;

export type ScorecardScreenProps = NativeStackScreenProps<RootStackParamList, 'Scorecard'>;

export type ReadingListScreenProps = NativeStackScreenProps<RootStackParamList, 'ReadingList'>;

export type ReadingPassageScreenProps = NativeStackScreenProps<RootStackParamList, 'ReadingPassage'>;

export type PaywallScreenProps = NativeStackScreenProps<RootStackParamList, 'Paywall'>;

export type BadgesScreenProps = NativeStackScreenProps<RootStackParamList, 'Badges'>;

export type AccountSettingsScreenProps = NativeStackScreenProps<RootStackParamList, 'AccountSettings'>;

export type MivoMemoryScreenProps = NativeStackScreenProps<RootStackParamList, 'MivoMemory'>;
export type MistakesNotebookScreenProps = NativeStackScreenProps<RootStackParamList, 'MistakesNotebook'>;

export type VocabDecksScreenProps = NativeStackScreenProps<RootStackParamList, 'VocabDecks'>;
export type VocabLibraryScreenProps = NativeStackScreenProps<RootStackParamList, 'VocabLibrary'>;

export type MispronouncedWordsScreenProps = NativeStackScreenProps<RootStackParamList, 'MispronouncedWords'>;

export type TextChatScreenProps = NativeStackScreenProps<RootStackParamList, 'TextChat'>;

export type GrammarLessonScreenProps = NativeStackScreenProps<RootStackParamList, 'GrammarLesson'>;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

