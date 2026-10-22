import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { OnboardingChatScreen } from '../screens/onboarding/OnboardingChatScreen';
import { WelcomeScreen } from '../screens/onboarding/WelcomeScreen';
import type { OnboardingStackParamList } from './types';

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

/** Welcome (Mivo waves, language) then one chat with Mivo that ends in the first lesson. */
export function OnboardingNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Chat" component={OnboardingChatScreen} options={{ animation: 'slide_from_right' }} />
    </Stack.Navigator>
  );
}
