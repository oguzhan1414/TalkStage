import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CalibrationScreen } from '../screens/onboarding/CalibrationScreen';
import { InterestSelectionScreen } from '../screens/onboarding/InterestSelectionScreen';
import { WelcomeSlidesScreen } from '../screens/onboarding/WelcomeSlidesScreen';
import type { OnboardingStackParamList } from './types';

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

export function OnboardingNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeSlidesScreen} />
      <Stack.Screen name="Interests" component={InterestSelectionScreen} />
      <Stack.Screen name="Calibration" component={CalibrationScreen} />
    </Stack.Navigator>
  );
}
