import type { SceneHints, ScenePlayPayload } from '../lib/sceneTwists';
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

/** Onboarding: Welcome, then one chat with Mivo. Answers live in `useOnboarding()`'s `draft`, not in params. */
export type OnboardingStackParamList = {
  Welcome: undefined;
  /** The whole onboarding as one chat with Mivo (screens/onboarding/OnboardingChatScreen.tsx). */
  Chat: undefined;
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
  FreeChatRoom:
    | {
        scene?: ScenePlayPayload;
        twistTitle?: string;
        twistEmoji?: string;
        twistHint?: string;
        // Sesli sahne ipucu (Başlangıç): hedefler + anahtar ifadeler; yoksa ipucu düğmesi görünmez.
        sceneHints?: SceneHints;
        // Set when opened from a grammar lesson / Bugün's chapter path (topic practice) or the chapter check
        // (title only). The room then steers the talk to that structure; `topicCode` ("A1_G01") attributes
        // corrections and the "practice done" flag to the topic.
        focusTopic?: { title: string; formula?: string; targetWords?: string[]; topicCode?: string };
        // "Mivo ile Tekrar" node (every few topics on Bugün): the last topics to recall in conversation.
        reviewId?: string;
        reviewTopics?: { code?: string; title: string; formula?: string; targetWords?: string[] }[];
      }
    | undefined;
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
  /** "Gerçek mesaj yaz" görevi (data/writingTasks.ts). */
  WritingTask: { taskId: string };
  MivoMemory: undefined;
  VocabLibrary: undefined;
  VocabDecks: undefined;
  MispronouncedWords: undefined;
  PodcastList: undefined;
  PodcastPlayer: { episodeId: string };
  /** "Kelime Odaları" (data/wordRooms.ts). */
  WordRooms: undefined;
  /** `pathStepId`: opened as a word section of the learning path (marks that step done at the end). */
  WordRoom: { roomId: string; pathStepId?: string };
  /** New learning path (docs/yeni-ogrenme-yolu.md): a reading lesson and a vocabulary section. */
  PathLesson: { stepId: string };
  PathVocab: { stepId: string };
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

export type WordRoomsScreenProps = NativeStackScreenProps<RootStackParamList, 'WordRooms'>;
export type WordRoomScreenProps = NativeStackScreenProps<RootStackParamList, 'WordRoom'>;
export type PathLessonScreenProps = NativeStackScreenProps<RootStackParamList, 'PathLesson'>;
export type PathVocabScreenProps = NativeStackScreenProps<RootStackParamList, 'PathVocab'>;


export type GrammarLessonScreenProps = NativeStackScreenProps<RootStackParamList, 'GrammarLesson'>;

export type WritingTaskScreenProps = NativeStackScreenProps<RootStackParamList, 'WritingTask'>;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

