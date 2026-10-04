import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CalibrationScreen } from '../screens/onboarding/CalibrationScreen';
import { DailyTimeScreen } from '../screens/onboarding/DailyTimeScreen';
import { GoalScreen } from '../screens/onboarding/GoalScreen';
import { LevelScreen } from '../screens/onboarding/LevelScreen';
import { MicPermissionScreen } from '../screens/onboarding/MicPermissionScreen';
import { NameScreen } from '../screens/onboarding/NameScreen';
import { PersonaScreen } from '../screens/onboarding/PersonaScreen';
import { PreparingScreen } from '../screens/onboarding/PreparingScreen';
import { ReadyScreen } from '../screens/onboarding/ReadyScreen';
import { WelcomeScreen } from '../screens/onboarding/WelcomeScreen';
import type { OnboardingStackParamList } from './types';

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

export function OnboardingNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Name" component={NameScreen} />
      <Stack.Screen name="Persona" component={PersonaScreen} />
      <Stack.Screen name="Goal" component={GoalScreen} />
      <Stack.Screen name="MicPermission" component={MicPermissionScreen} />
      <Stack.Screen name="Calibration" component={CalibrationScreen} />
      <Stack.Screen name="Level" component={LevelScreen} />
      <Stack.Screen name="DailyTime" component={DailyTimeScreen} />
      <Stack.Screen name="Preparing" component={PreparingScreen} />
      <Stack.Screen name="Ready" component={ReadyScreen} />
    </Stack.Navigator>
  );
}
