/**
 * Typography tokens
 */

export const typography = {
  fontFamily: {
    /** System fonts - platform native */
    sans: {
      ios: 'System',
      android: 'Roboto',
      web: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    /** Monospace for code */
    mono: {
      ios: 'Menlo',
      android: 'monospace',
      web: '"SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
    },
  },
  fontSize: {
    /** 11px - Tiny labels */
    xs: 11,
    /** 13px - Caption text */
    sm: 13,
    /** 15px - Body text (default) */
    md: 15,
    /** 17px - Emphasized body */
    lg: 17,
    /** 20px - Section headers */
    xl: 20,
    /** 24px - Page titles */
    '2xl': 24,
    /** 32px - Hero text */
    '3xl': 32,
    /** 40px - Display */
    '4xl': 40,
  },
  fontWeight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
  },
} as const;

// Preset text styles
export const textStyles = {
  // Display (heroes, splash screens)
  displayLarge: {
    fontSize: typography.fontSize['4xl'],
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.lineHeight.tight,
    letterSpacing: typography.letterSpacing.tight,
  },
  displayMedium: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.lineHeight.tight,
  },

  // Headlines (page titles, section headers)
  headlineLarge: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.lineHeight.tight,
  },
  headlineMedium: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.lineHeight.tight,
  },
  headlineSmall: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.lineHeight.normal,
  },

  // Body (main content)
  bodyLarge: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.regular,
    lineHeight: typography.lineHeight.normal,
  },
  bodyMedium: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.regular,
    lineHeight: typography.lineHeight.normal,
  },
  bodySmall: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.regular,
    lineHeight: typography.lineHeight.normal,
  },

  // Labels (buttons, chips)
  labelLarge: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.lineHeight.tight,
  },
  labelMedium: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.lineHeight.tight,
  },
  labelSmall: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.lineHeight.tight,
    letterSpacing: typography.letterSpacing.wide,
  },

  // Caption (metadata, timestamps)
  caption: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.regular,
    lineHeight: typography.lineHeight.normal,
  },
} as const;
