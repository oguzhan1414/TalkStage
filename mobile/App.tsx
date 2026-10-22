import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as Sentry from '@sentry/react-native';
import * as SplashScreen from 'expo-splash-screen';
// Fonts come from their per-weight entry points: the package index would put every weight (and italic) in the APK.
import { useFonts } from 'expo-font';
import { PlusJakartaSans_600SemiBold } from '@expo-google-fonts/plus-jakarta-sans/600SemiBold';
import { PlusJakartaSans_700Bold } from '@expo-google-fonts/plus-jakarta-sans/700Bold';
import { Inter_400Regular } from '@expo-google-fonts/inter/400Regular';
import { Inter_500Medium } from '@expo-google-fonts/inter/500Medium';
import { JetBrainsMono_400Regular } from '@expo-google-fonts/jetbrains-mono/400Regular';

import { colors } from './src/theme/tokens';
import { talkStageNavigationTheme } from './src/theme/navigationTheme';
import { RootNavigator } from './src/navigation/RootNavigator';
import { AuthProvider } from './src/context/AuthContext';
import { OnboardingProvider } from './src/context/OnboardingContext';
import { ConfigMissingScreen } from './src/screens/ConfigMissingScreen';
import { ApiError } from './src/lib/api';
import { isSupabaseConfigured } from './src/lib/supabase';
import { navigationRef } from './src/navigation/navigationRef';
import { AnalyticsProvider } from './src/lib/analytics';
import { MivoTransitionProvider } from './src/components/MivoTransitionOverlay';
import { BadgeCelebration } from './src/components/BadgeCelebration';
import { OfflineBanner } from './src/components/OfflineBanner';
import { AppErrorBoundary } from './src/components/AppErrorBoundary';
import { startNetworkSync } from './src/lib/network';

// Crash and error reports from real devices. Off until EXPO_PUBLIC_SENTRY_DSN is set; no personal data is attached.
const sentryDsn = process.env.EXPO_PUBLIC_SENTRY_DSN;
if (sentryDsn) {
  Sentry.init({
    dsn: sentryDsn,
    // EXPO_PUBLIC_SENTRY_ENVIRONMENT (e.g. "preview" on EAS) keeps test builds apart from store builds in Sentry.
    environment: process.env.EXPO_PUBLIC_SENTRY_ENVIRONMENT || (__DEV__ ? 'development' : 'production'),
    sendDefaultPii: false,
    // App start and screen timings. EXPO_PUBLIC_SENTRY_TRACES_RATE=1 during the closed test (few users, every start
    // counts); the store build stays at 5% to keep the free quota.
    tracesSampleRate: Number(process.env.EXPO_PUBLIC_SENTRY_TRACES_RATE ?? '') || 0.05,
    enableAutoSessionTracking: true,
  });
}

// Online/focus signals for React Query + re-sending parked writes (see src/lib/network.ts).
startNetworkSync();

SplashScreen.preventAutoHideAsync().catch(() => {
  // Ignore — already hidden (e.g. fast refresh) or unsupported on this platform.
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Keep unused answers for a day so the on-device snapshot (src/lib/queryPersist.ts) stays complete.
      gcTime: 24 * 60 * 60 * 1000,
      // 4xx (e.g. GET /scenarios/recommended's 404 on an empty catalog) won't
      // succeed on retry — only retry on network errors (status 0) / 5xx, and just once.
      retry: (failureCount, error) =>
        !(error instanceof ApiError && error.status >= 400 && error.status < 500) && failureCount < 1,
    },
  },
});

function App() {
  const [fontsLoaded] = useFonts({
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    Inter_400Regular,
    Inter_500Medium,
    JetBrainsMono_400Regular,
  });

  // With a working config the splash stays up until RootNavigator knows which screen to show
  // (no blank frame between the splash and the first screen). Only the config-missing screen hides it here.
  useEffect(() => {
    if (fontsLoaded && !isSupabaseConfigured) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  if (!isSupabaseConfigured) {
    return <ConfigMissingScreen />;
  }

  return (
    <GestureHandlerRootView style={styles.flex}>
      <SafeAreaProvider>
        <View style={styles.flex}>
          <AppErrorBoundary>
          <QueryClientProvider client={queryClient}>
            <AnalyticsProvider>
              <AuthProvider>
                <OnboardingProvider>
                  <MivoTransitionProvider>
                    <NavigationContainer ref={navigationRef} theme={talkStageNavigationTheme}>
                      <RootNavigator />
                    </NavigationContainer>
                    <BadgeCelebration />
                    <OfflineBanner />
                  </MivoTransitionProvider>
                </OnboardingProvider>
              </AuthProvider>
            </AnalyticsProvider>
          </QueryClientProvider>
          </AppErrorBoundary>
          <StatusBar style="dark" />
        </View>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

// Wrapping adds native crash capture and touch breadcrumbs (the render safety net is AppErrorBoundary); a pass-through while Sentry is off.
export default sentryDsn ? Sentry.wrap(App) : App;
