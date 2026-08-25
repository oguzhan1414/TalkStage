import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { navIcons } from '../assets/images';
import { HomeScreen } from '../screens/HomeScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { ScenariosScreen } from '../screens/ScenariosScreen';
import { VocabScreen } from '../screens/VocabScreen';
import { colors, fonts, shadow } from '../theme/tokens';
import type { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

const TAB_CONFIG: Record<
  keyof MainTabParamList,
  { label: string; icon: ReturnType<typeof require> }
> = {
  Home: { label: 'Sahne', icon: navIcons.home },
  Scenarios: { label: 'Seviyeler', icon: navIcons.trophy },
  Vocab: { label: 'Kelimeler', icon: navIcons.decks },
  Profile: { label: 'Profil', icon: navIcons.profile },
};

/**
 * Custom Floating Island Capsule Bottom Navigation Bar (Apple Pro / Glassmorphic)
 * Inspired by Reference Image 1 & 4.
 */
export function MainTabNavigator() {
  const insets = useSafeAreaInsets();
  const bottomMargin = Math.max(insets.bottom, 16);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: bottomMargin,
          left: 18,
          right: 18,
          height: 68,
          backgroundColor: 'rgba(255, 255, 255, 0.94)',
          borderRadius: 34,
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.9)',
          paddingBottom: 0,
          paddingHorizontal: 8,
          ...shadow.card,
          shadowOpacity: 0.14,
          shadowRadius: 25,
          elevation: 12,
        },
      }}
      tabBar={({ state, descriptors, navigation }) => (
        <View style={[styles.floatingBar, { bottom: bottomMargin }]}>
          {state.routes.map((route, index) => {
            const isFocused = state.index === index;
            const config = TAB_CONFIG[route.name as keyof MainTabParamList];

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            return (
              <Pressable
                key={route.key}
                onPress={onPress}
                style={[styles.tabItem, isFocused && styles.tabItemActive]}
              >
                <View style={[styles.iconContainer, isFocused && styles.iconContainerActive]}>
                  <Image
                    source={config.icon}
                    style={[styles.iconImage, !isFocused && styles.iconImageInactive]}
                    resizeMode="contain"
                  />
                </View>
                <Text
                  style={[
                    styles.tabLabel,
                    isFocused ? styles.tabLabelActive : styles.tabLabelInactive,
                  ]}
                  numberOfLines={1}
                >
                  {config.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      )}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Scenarios" component={ScenariosScreen} />
      <Tab.Screen name="Vocab" component={VocabScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  floatingBar: {
    position: 'absolute',
    left: 18,
    right: 18,
    height: 70,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 35,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.95)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.15,
        shadowRadius: 24,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    borderRadius: 24,
  },
  tabItemActive: {},
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.9)',
  },
  iconContainerActive: {
    backgroundColor: 'rgba(79, 70, 229, 0.12)',
    borderWidth: 1.5,
    borderColor: colors.brand,
    transform: [{ scale: 1.06 }],
  },
  iconImage: {
    width: 30,
    height: 30,
  },
  iconImageInactive: {
    opacity: 0.8,
  },
  tabLabel: {
    fontSize: 10,
    fontFamily: fonts.bodyMedium,
    marginTop: 2,
  },
  tabLabelActive: {
    color: colors.brand,
    fontFamily: fonts.headingBold,
  },
  tabLabelInactive: {
    color: colors.textMuted,
  },
});
