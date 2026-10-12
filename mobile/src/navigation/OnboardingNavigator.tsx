import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { DailyTimeScreen } from '../screens/onboarding/DailyTimeScreen';
import { GoalScreen } from '../screens/onboarding/GoalScreen';
import { LevelScreen } from '../screens/onboarding/LevelScreen';
import { NameScreen } from '../screens/onboarding/NameScreen';
import { MicrophoneScreen } from '../screens/onboarding/MicrophoneScreen';
import { PremiumScreen } from '../screens/onboarding/PremiumScreen';
import { PreparingScreen } from '../screens/onboarding/PreparingScreen';
import { ReminderScreen } from '../screens/onboarding/ReminderScreen';
import { ReadyScreen } from '../screens/onboarding/ReadyScreen';
import { WelcomeScreen } from '../screens/onboarding/WelcomeScreen';
import type { OnboardingStackParamList } from './types';

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

export function OnboardingNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Name" component={NameScreen} />
      <Stack.Screen name="Goal" component={GoalScreen} />
      <Stack.Screen name="Level" component={LevelScreen} />
      <Stack.Screen name="DailyTime" component={DailyTimeScreen} />
      <Stack.Screen name="Reminder" component={ReminderScreen} />
      <Stack.Screen name="Premium" component={PremiumScreen} />
      <Stack.Screen name="Microphone" component={MicrophoneScreen} />
      <Stack.Screen name="Preparing" component={PreparingScreen} />
      <Stack.Screen name="Ready" component={ReadyScreen} />
    </Stack.Navigator>
  );
}
