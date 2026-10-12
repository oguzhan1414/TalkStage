import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from '../context/AuthContext';
import { useOnboarding } from '../context/OnboardingContext';
import { useDeepLinking } from '../hooks/useDeepLinking';
import { PaywallScreen } from '../screens/PaywallScreen';
import { ProfileLoadErrorScreen } from '../screens/ProfileLoadErrorScreen';
import { AuthNavigator } from './AuthNavigator';
import { MainTabNavigator } from './MainTabNavigator';
import { OnboardingNavigator } from './OnboardingNavigator';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

/** Switches between Auth, Onboarding, and Main tabs based on session + onboarding state. */
export function RootNavigator() {
  const { session, initializing } = useAuth();
  const {
    completed: onboardingComplete,
    loading: onboardingLoading,
    loadError: onboardingLoadError,
    retryLoading: onboardingRetrying,
    retryProfile,
  } = useOnboarding();

  useDeepLinking(Boolean(session) && onboardingComplete);

  if (initializing || (session && onboardingLoading)) {
    return null;
  }

  if (session && onboardingLoadError) {
    return <ProfileLoadErrorScreen retrying={onboardingRetrying} onRetry={retryProfile} />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!session ? (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      ) : !onboardingComplete ? (
        <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
      ) : (
        <>
          <Stack.Screen name="Main" component={MainTabNavigator} />
          <Stack.Screen
            name="LiveConversationRoom"
            getComponent={() => require('../screens/LiveConversationRoomScreen').LiveConversationRoomScreen}
            options={{ presentation: 'fullScreenModal', animation: 'slide_from_bottom' }}
          />
          <Stack.Screen
            name="FreeChatRoom"
            getComponent={() => require('../screens/FreeChatRoomScreen').FreeChatRoomScreen}
            options={{ presentation: 'fullScreenModal', animation: 'slide_from_bottom' }}
          />
          {/* Secondary screens are required lazily (`getComponent`): their modules — and big data files like the vocab library
              or grammar lessons — are only evaluated when first opened, which keeps app start fast. */}
          <Stack.Screen name="Scorecard" getComponent={() => require('../screens/ScorecardScreen').ScorecardScreen} />
          <Stack.Screen name="PodcastList" getComponent={() => require('../screens/PodcastListScreen').PodcastListScreen} />
          <Stack.Screen name="PodcastPlayer" getComponent={() => require('../screens/PodcastPlayerScreen').PodcastPlayerScreen} />
          <Stack.Screen name="ReadingList" getComponent={() => require('../screens/ReadingListScreen').ReadingListScreen} />
          <Stack.Screen name="ReadingPassage" getComponent={() => require('../screens/ReadingPassageScreen').ReadingPassageScreen} />
          <Stack.Screen name="Badges" getComponent={() => require('../screens/BadgesScreen').BadgesScreen} />
          <Stack.Screen name="AccountSettings" getComponent={() => require('../screens/AccountSettingsScreen').AccountSettingsScreen} />
          <Stack.Screen name="GrammarLesson" getComponent={() => require('../screens/GrammarLessonScreen').GrammarLessonScreen} />
          <Stack.Screen name="MistakesNotebook" getComponent={() => require('../screens/MistakesNotebookScreen').MistakesNotebookScreen} />
          <Stack.Screen name="MivoMemory" getComponent={() => require('../screens/MivoMemoryScreen').MivoMemoryScreen} />
          <Stack.Screen name="VocabLibrary" getComponent={() => require('../screens/VocabLibraryScreen').VocabLibraryScreen} />
          <Stack.Screen name="VocabDecks" getComponent={() => require('../screens/VocabDecksScreen').VocabDecksScreen} />
          <Stack.Screen name="MispronouncedWords" getComponent={() => require('../screens/MispronouncedWordsScreen').MispronouncedWordsScreen} />
          <Stack.Screen
            name="Paywall"
            component={PaywallScreen}
            options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
