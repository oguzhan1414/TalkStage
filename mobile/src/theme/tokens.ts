/**
 * TalkStage design tokens — Light Edition.
 * Source: `../../CLAUDE.md` (Design Tokens) / repo-root
 * "TalkStage - Uctan Uca Grafik Tasarim..." doc, Bölüm 1.1-1.2.
 * Keep in sync with `landing/tailwind` tokens — same brand, same values.
 */

export const colors = {
  background: '#FFFFFF', // Pure White
  backgroundSecondary: '#F8FAFC', // Porcelain Base
  surface: '#FFFFFF', // Surface Card
  brand: '#4F46E5', // Royal Indigo
  accent: '#0EA5E9', // Electric Cyan
  success: '#10B981', // Fresh Emerald
  error: '#F43F5E', // Coral Sunset
  textHeading: '#0F172A',
  textBody: '#475569',
  textMuted: '#94A3B8',
  border: 'rgba(226, 232, 240, 0.8)',
} as const;

export const gradients = {
  airyIndigo: ['#4F46E5', '#0EA5E9'] as const,
  successMint: ['#10B981', '#34D399'] as const,
};

export const glass = {
  background: 'rgba(255, 255, 255, 0.85)',
  border: 'rgba(226, 232, 240, 0.8)',
  blur: 20,
};

export const shadow = {
  card: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 4,
  },
  glow: {
    shadowColor: '#0EA5E9',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 30,
    elevation: 8,
  },
} as const;

export const radii = {
  sm: 12,
  md: 16,
  lg: 24,
  pill: 9999,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

/** Font family names as registered via `useFonts` in App.tsx. */
export const fonts = {
  headingBold: 'PlusJakartaSans_700Bold',
  headingSemiBold: 'PlusJakartaSans_600SemiBold',
  bodyRegular: 'Inter_400Regular',
  bodyMedium: 'Inter_500Medium',
  mono: 'JetBrainsMono_400Regular',
} as const;

export const typography = {
  h1: { fontFamily: fonts.headingBold, fontSize: 32, letterSpacing: -0.025 * 32, color: colors.textHeading },
  h2: { fontFamily: fonts.headingBold, fontSize: 24, letterSpacing: -0.025 * 24, color: colors.textHeading },
  h3: { fontFamily: fonts.headingSemiBold, fontSize: 18, letterSpacing: -0.025 * 18, color: colors.textHeading },
  body: { fontFamily: fonts.bodyRegular, fontSize: 15, lineHeight: 15 * 1.65, color: colors.textBody },
  bodyMedium: { fontFamily: fonts.bodyMedium, fontSize: 15, lineHeight: 15 * 1.65, color: colors.textBody },
  caption: { fontFamily: fonts.bodyRegular, fontSize: 13, lineHeight: 13 * 1.65, color: colors.textMuted },
  mono: { fontFamily: fonts.mono, fontSize: 14, color: colors.textHeading },
} as const;
