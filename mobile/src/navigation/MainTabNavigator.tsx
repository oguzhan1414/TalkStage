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
import { t } from '../i18n';

const Tab = createBottomTabNavigator<MainTabParamList>();

const TAB_CONFIG: Record<
  keyof MainTabParamList,
  { label: string; image: ReturnType<typeof require> }
> = {
  Home: { label: t("Bugün"), image: navIcons.today },
  Scenarios: { label: t("Sahneler"), image: navIcons.scenes },
  Vocab: { label: t("Kelimeler"), image: navIcons.words },
  Profile: { label: t("Özellikler"), image: navIcons.features },
};

/**
 * Calm, tool-like navigation with one chunky 3D icon family across all tabs.
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
          left: 14,
          right: 14,
          height: 68,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: 34,
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.9)',
          paddingBottom: 0,
          paddingHorizontal: 4,
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
                accessibilityRole="tab"
                accessibilityState={{ selected: isFocused }}
                accessibilityLabel={config.label}
                style={[styles.tabItem, isFocused && styles.tabItemActive]}
              >
                <View style={[styles.iconContainer, isFocused && styles.iconContainerActive]}>
                  <Image
                    source={config.image}
                    style={[styles.tabIcon, !isFocused && styles.tabIconInactive]}
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
    left: 12,
    right: 12,
    height: 64,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 4,
    ...Platform.select({
      ios: {
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.1,
        shadowRadius: 18,
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
    paddingVertical: 7,
    borderRadius: 14,
  },
  tabItemActive: {},
  iconContainer: {
    width: 34,
    height: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  iconContainerActive: {
    backgroundColor: '#EEF2FF',
    borderColor: '#C7D2FE',
  },
  tabIcon: {
    width: 28,
    height: 28,
  },
  tabIconInactive: {
    opacity: 0.36,
  },
  tabLabel: {
    fontSize: 10,
    fontFamily: fonts.bodyMedium,
    marginTop: 1.5,
  },
  tabLabelActive: {
    color: colors.brand,
    fontFamily: fonts.headingBold,
  },
  tabLabelInactive: {
    color: colors.textMuted,
  },
});
