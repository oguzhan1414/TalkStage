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
  Roadmap: undefined;
  Scenarios: undefined;
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
  // (`talkstage://scenario/:slug` only ever carries the slug) — the screen
  // resolves them itself via `GET /scenarios/{slug}` when missing.
  LiveConversationRoom: { scenarioSlug: string; scenarioId?: string; scenarioTitle?: string };
  Scorecard: { session: SessionOut; scenarioTitle: string; wordsAddedCount: number };
  ReadingList: undefined;
  ReadingPassage: { slug: string };
  Calendar: undefined;
  Paywall: undefined;
  Badges: undefined;
  StudyPath: undefined;
  // Full teaching content for one A1_G0X grammar topic (table, dialogue,
  // mistakes, examples) — see `data/grammarLessons.ts`. Free for the topic's
  // `isFree` lesson, Pro-gated for the rest (screen checks `isProUser()`
  // itself, no need to pass a flag here).
  GrammarLesson: { code: string };
  MistakesNotebook: undefined;
  VocabLibrary: undefined;
  PodcastList: undefined;
  PodcastPlayer: { episodeId: string };
  // Always resolves today's deterministically-picked task by id (see
  // `data/dailyTasks.ts`) — the screen looks up the full template itself.
  DailyTaskDetail: { taskId: string };
  // `focusTopic` is set when opened from the Seviye Yol Haritası (a grammar
  // topic or the level's boss challenge) so the opening message can steer the
  // conversation toward practicing that specific structure. `dailyTask` is
  // set when opened from the Study Path's "bugünün görevi" — richer than
  // `focusTopic` (role/scenario/goals), and its first user message logs
  // `POST /progress/log-practice` (see TextChatScreen). Both are omitted for
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

export type ScorecardScreenProps = NativeStackScreenProps<RootStackParamList, 'Scorecard'>;

export type ReadingListScreenProps = NativeStackScreenProps<RootStackParamList, 'ReadingList'>;

export type ReadingPassageScreenProps = NativeStackScreenProps<RootStackParamList, 'ReadingPassage'>;

export type CalendarScreenProps = NativeStackScreenProps<RootStackParamList, 'Calendar'>;

export type PaywallScreenProps = NativeStackScreenProps<RootStackParamList, 'Paywall'>;

export type BadgesScreenProps = NativeStackScreenProps<RootStackParamList, 'Badges'>;

export type MistakesNotebookScreenProps = NativeStackScreenProps<RootStackParamList, 'MistakesNotebook'>;

export type VocabLibraryScreenProps = NativeStackScreenProps<RootStackParamList, 'VocabLibrary'>;

export type TextChatScreenProps = NativeStackScreenProps<RootStackParamList, 'TextChat'>;

export type StudyPathScreenProps = NativeStackScreenProps<RootStackParamList, 'StudyPath'>;

export type GrammarLessonScreenProps = NativeStackScreenProps<RootStackParamList, 'GrammarLesson'>;

export type DailyTaskDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'DailyTaskDetail'>;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

