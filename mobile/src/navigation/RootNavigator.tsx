import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from '../context/AuthContext';
import { useOnboarding } from '../context/OnboardingContext';
import { useDeepLinking } from '../hooks/useDeepLinking';
import { BadgesScreen } from '../screens/BadgesScreen';
import { BurgerOrderLiveScreen } from '../screens/BurgerOrderLiveScreen';
import { GrammarLessonScreen } from '../screens/GrammarLessonScreen';
import { LiveConversationRoomScreen } from '../screens/LiveConversationRoomScreen';
import { MistakesNotebookScreen } from '../screens/MistakesNotebookScreen';
import { PaywallScreen } from '../screens/PaywallScreen';
import { ProfileLoadErrorScreen } from '../screens/ProfileLoadErrorScreen';
import { PodcastListScreen } from '../screens/PodcastListScreen';
import { PodcastPlayerScreen } from '../screens/PodcastPlayerScreen';
import { ReadingListScreen } from '../screens/ReadingListScreen';
import { ReadingPassageScreen } from '../screens/ReadingPassageScreen';
import { ScorecardScreen } from '../screens/ScorecardScreen';
import { TextChatScreen } from '../screens/TextChatScreen';
import { VocabLibraryScreen } from '../screens/VocabLibraryScreen';
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
            component={LiveConversationRoomScreen}
            options={{ presentation: 'fullScreenModal', animation: 'slide_from_bottom' }}
          />
          <Stack.Screen
            name="BurgerOrderLive"
            component={BurgerOrderLiveScreen}
            options={{ presentation: 'fullScreenModal', animation: 'slide_from_bottom' }}
          />
          <Stack.Screen name="Scorecard" component={ScorecardScreen} />
          <Stack.Screen name="PodcastList" component={PodcastListScreen} />
          <Stack.Screen name="PodcastPlayer" component={PodcastPlayerScreen} />
          <Stack.Screen name="ReadingList" component={ReadingListScreen} />
          <Stack.Screen name="ReadingPassage" component={ReadingPassageScreen} />
          <Stack.Screen name="Badges" component={BadgesScreen} />
          <Stack.Screen name="GrammarLesson" component={GrammarLessonScreen} />
          <Stack.Screen name="MistakesNotebook" component={MistakesNotebookScreen} />
          <Stack.Screen name="VocabLibrary" component={VocabLibraryScreen} />
          <Stack.Screen
            name="TextChat"
            component={TextChatScreen}
            options={{ presentation: 'fullScreenModal', animation: 'slide_from_bottom' }}
          />
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
