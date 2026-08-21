import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { colors, fonts } from '../theme/tokens';
import { HomeScreen } from '../screens/HomeScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { ScenariosScreen } from '../screens/ScenariosScreen';
import { VocabScreen } from '../screens/VocabScreen';
import type { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

const TAB_ICONS: Record<keyof MainTabParamList, { active: keyof typeof Ionicons.glyphMap; inactive: keyof typeof Ionicons.glyphMap }> = {
  Home: { active: 'home', inactive: 'home-outline' },
  Scenarios: { active: 'albums', inactive: 'albums-outline' },
  Vocab: { active: 'library', inactive: 'library-outline' },
  Profile: { active: 'person-circle', inactive: 'person-circle-outline' },
};

const TAB_LABELS: Record<keyof MainTabParamList, string> = {
  Home: 'Ana Sayfa',
  Scenarios: 'Sahneler',
  Vocab: 'Kartlar',
  Profile: 'Profil',
};

/** Bottom tab bar per design doc Bölüm 3.2: Ana Sayfa / Sahneler / Kartlar / Profil. */
export function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.brand,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
        tabBarLabelStyle: {
          fontFamily: fonts.bodyMedium,
          fontSize: 11,
        },
        tabBarIcon: ({ focused, color, size }) => {
          const icon = TAB_ICONS[route.name as keyof MainTabParamList];
          return <Ionicons name={focused ? icon.active : icon.inactive} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: TAB_LABELS.Home }} />
      <Tab.Screen name="Scenarios" component={ScenariosScreen} options={{ title: TAB_LABELS.Scenarios }} />
      <Tab.Screen name="Vocab" component={VocabScreen} options={{ title: TAB_LABELS.Vocab }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: TAB_LABELS.Profile }} />
    </Tab.Navigator>
  );
}
