import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts as usePlusJakartaSans, PlusJakartaSans_600SemiBold, PlusJakartaSans_700Bold } from '@expo-google-fonts/plus-jakarta-sans';
import { useFonts as useInter, Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import { useFonts as useJetBrainsMono, JetBrainsMono_400Regular } from '@expo-google-fonts/jetbrains-mono';

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

SplashScreen.preventAutoHideAsync().catch(() => {
  // Ignore — already hidden (e.g. fast refresh) or unsupported on this platform.
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 4xx (e.g. GET /scenarios/recommended's 404 on an empty catalog) won't
      // succeed on retry — only retry on network errors / 5xx, and just once.
      retry: (failureCount, error) =>
        !(error instanceof ApiError && error.status < 500) && failureCount < 1,
    },
  },
});

export default function App() {
  const [jakartaLoaded] = usePlusJakartaSans({ PlusJakartaSans_600SemiBold, PlusJakartaSans_700Bold });
  const [interLoaded] = useInter({ Inter_400Regular, Inter_500Medium });
  const [monoLoaded] = useJetBrainsMono({ JetBrainsMono_400Regular });

  const fontsLoaded = jakartaLoaded && interLoaded && monoLoaded;

  useEffect(() => {
    if (fontsLoaded) {
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
          <QueryClientProvider client={queryClient}>
            <AnalyticsProvider>
              <AuthProvider>
                <OnboardingProvider>
                  <MivoTransitionProvider>
                    <NavigationContainer ref={navigationRef} theme={talkStageNavigationTheme}>
                      <RootNavigator />
                    </NavigationContainer>
                  </MivoTransitionProvider>
                </OnboardingProvider>
              </AuthProvider>
            </AnalyticsProvider>
          </QueryClientProvider>
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
