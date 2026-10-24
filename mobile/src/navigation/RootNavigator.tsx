import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { useAuth } from '../context/AuthContext';
import { useOnboarding } from '../context/OnboardingContext';
import { useDeepLinking } from '../hooks/useDeepLinking';
import { PaywallScreen } from '../screens/PaywallScreen';
import { ProfileLoadErrorScreen } from '../screens/ProfileLoadErrorScreen';
import { AuthNavigator } from './AuthNavigator';
import { MainTabNavigator } from './MainTabNavigator';
import { OnboardingNavigator } from './OnboardingNavigator';
import { colors } from '../theme/tokens';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const SPLASH_MAX_MS = 4000;

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

  const ready = !initializing && !(session && onboardingLoading);

  // The native splash covers the wait. It goes away as soon as the first screen is known, or after
  // SPLASH_MAX_MS on a slow network, where the spinner below takes over instead of a frozen logo.
  useEffect(() => {
    if (ready) {
      SplashScreen.hideAsync().catch(() => {});
      return;
    }
    const timer = setTimeout(() => SplashScreen.hideAsync().catch(() => {}), SPLASH_MAX_MS);
    return () => clearTimeout(timer);
  }, [ready]);

  if (!ready) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.brand} />
      </View>
    );
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
          <Stack.Screen name="GrammarLesson" getComponent={() => require('../screens/GrammarLessonV2Screen').GrammarLessonV2Screen} />
          <Stack.Screen name="MistakesNotebook" getComponent={() => require('../screens/MistakesNotebookScreen').MistakesNotebookScreen} />
          <Stack.Screen name="WritingTask" getComponent={() => require('../screens/WritingTaskScreen').WritingTaskScreen} />
          <Stack.Screen name="MivoMemory" getComponent={() => require('../screens/MivoMemoryScreen').MivoMemoryScreen} />
          <Stack.Screen name="VocabLibrary" getComponent={() => require('../screens/VocabLibraryScreen').VocabLibraryScreen} />
          <Stack.Screen name="VocabDecks" getComponent={() => require('../screens/VocabDecksScreen').VocabDecksScreen} />
          <Stack.Screen name="MispronouncedWords" getComponent={() => require('../screens/MispronouncedWordsScreen').MispronouncedWordsScreen} />
          <Stack.Screen name="WordRooms" getComponent={() => require('../screens/WordRoomsScreen').WordRoomsScreen} />
          <Stack.Screen name="WordRoom" getComponent={() => require('../screens/WordRoomScreen').WordRoomScreen} />
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

const styles = StyleSheet.create({
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background },
});
