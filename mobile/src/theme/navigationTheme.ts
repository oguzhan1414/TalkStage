import { DefaultTheme, type Theme } from '@react-navigation/native';

import { colors, fonts } from './tokens';

/** React Navigation theme wired to Spekiva's light design tokens. App is light-mode only for now. */
export const talkStageNavigationTheme: Theme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.brand,
    background: colors.background,
    card: colors.surface,
    text: colors.textHeading,
    border: colors.border,
    notification: colors.error,
  },
  fonts: {
    regular: { fontFamily: fonts.bodyRegular, fontWeight: '400' },
    medium: { fontFamily: fonts.bodyMedium, fontWeight: '500' },
    bold: { fontFamily: fonts.headingBold, fontWeight: '700' },
    heavy: { fontFamily: fonts.headingBold, fontWeight: '700' },
  },
};
