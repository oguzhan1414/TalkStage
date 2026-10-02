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
  surfacePorcelain: '#FAFBFD',
  brand: '#4F46E5', // Royal Indigo
  accent: '#0EA5E9', // Electric Cyan
  success: '#10B981', // Fresh Emerald
  warning: '#F59E0B', // Amber
  error: '#F43F5E', // Coral Sunset
  textHeading: '#0F172A',
  textBody: '#475569',
  // Darkened from the design doc's #94A3B8 (2.56:1 on white — fails WCAG AA
  // for normal text, which this is used for via typography.caption) to a
  // value in the same blue-gray family that clears 4.5:1.
  textMuted: '#687689',
  border: 'rgba(226, 232, 240, 0.8)',
  borderLight: '#F1F5F9',
} as const;

export const cefrAura: Record<string, string> = {
  A1: '#10B981', // Fresh Emerald
  A2: '#0EA5E9', // Electric Sky
  B1: '#6366F1', // Royal Indigo
  B2: '#8B5CF6', // Vivid Purple
  C1: '#F59E0B', // Sunset Amber
  C2: '#EC4899', // Diamond Rose
};

export const cefrThemes: Record<
  string,
  { title: string; subtitle: string; icon: string; islandName: string; accentColor: string }
> = {
  A1: {
    title: 'Kahve Limanı',
    subtitle: 'Temel Günlük Diyaloglar & Tanışma',
    icon: '☕',
    islandName: 'Başlangıç Takımadası',
    accentColor: '#10B981',
  },
  A2: {
    title: 'Seyahat Koyu',
    subtitle: 'Havalimanı, Otel & Şehir İçi Ulaşım',
    icon: '✈️',
    islandName: 'Keşif Körfezi',
    accentColor: '#0EA5E9',
  },
  B1: {
    title: 'Kariyer Platosu',
    subtitle: 'İş Mülakatları, Vize & Profesyonel Sohbet',
    icon: '💼',
    islandName: 'İş Dünyası Vadisi',
    accentColor: '#6366F1',
  },
  B2: {
    title: 'Liderlik Zirvesi',
    subtitle: 'Mimari Kararlar, B2B Sunum & Spontane Tartışma',
    icon: '🚀',
    islandName: 'Global Zirve',
    accentColor: '#8B5CF6',
  },
  C1: {
    title: 'Ustalık Kalesi',
    subtitle: 'Soyut Fikirler, Hızlı Müzakere & Kriz Yönetimi',
    icon: '🏛️',
    islandName: 'Akıcı Diplomasi Arenası',
    accentColor: '#F59E0B',
  },
  C2: {
    title: 'Elmas Taç',
    subtitle: 'Ana Dil Yetkinliğinde Edebi & Teknik İfade',
    icon: '👑',
    islandName: 'Kusursuz Dil Sarayı',
    accentColor: '#EC4899',
  },
};

export const gradients = {
  airyIndigo: ['#4F46E5', '#0EA5E9'] as const,
  successMint: ['#10B981', '#34D399'] as const,
  warmAmber: ['#F59E0B', '#F97316'] as const,
  royalViolet: ['#8B5CF6', '#6366F1'] as const,
};

export const glass = {
  background: 'rgba(255, 255, 255, 0.85)',
  border: 'rgba(226, 232, 240, 0.8)',
  blur: 20,
};

export const shadow = {
  card: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 3,
  },
  porcelain: {
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
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
  xl: 32,
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
