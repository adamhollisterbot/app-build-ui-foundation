/**
 * Color tokens - Neutral baseline designed for theming
 */

// Core palette (neutral grays)
export const palette = {
  // Grayscale
  gray: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
    950: '#121212',
  },
  // Dark mode - add much darker shades for genuine dark mode
  darkMode: {
    background: '#0A0A0A', // Deep black for primary background
    surface: '#1A1A1A', // Slightly elevated from background
    surfaceAlt: '#262626', // Alternative surface (cards, panels)
    surfaceElevated: '#333333', // Most elevated surfaces (modals, floating elements)
    border: '#404040', // Borders in dark mode
    borderSubtle: '#2A2A2A', // Subtle borders
  },
  // Pure black and white
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
};

// Semantic colors (these get themed)
export const semanticColors = {
  // Primary action color (themed) - slightly desaturated for softer look
  primary: {
    main: '#4285F4', // Softer, more approachable blue
    light: '#5A95F5',
    dark: '#3367D6',
    contrast: '#FFFFFF',
  },
  // Secondary/accent color (themed)
  secondary: {
    main: '#7C3AED', // Violet 600
    light: '#8B5CF6', // Violet 500
    dark: '#6D28D9', // Violet 700
    contrast: '#FFFFFF',
  },
  // Status colors
  success: {
    main: '#16A34A', // Green 600
    light: '#22C55E', // Green 500
    dark: '#15803D', // Green 700
    contrast: '#FFFFFF',
    background: '#F0FDF4', // Green 50
  },
  warning: {
    main: '#CA8A04', // Yellow 600
    light: '#EAB308', // Yellow 500
    dark: '#A16207', // Yellow 700
    contrast: '#FFFFFF',
    background: '#FEFCE8', // Yellow 50
  },
  error: {
    main: '#DC2626', // Red 600
    light: '#EF4444', // Red 500
    dark: '#B91C1C', // Red 700
    contrast: '#FFFFFF',
    background: '#FEF2F2', // Red 50
  },
  info: {
    main: '#0891B2', // Cyan 600
    light: '#06B6D4', // Cyan 500
    dark: '#0E7490', // Cyan 700
    contrast: '#FFFFFF',
    background: '#ECFEFF', // Cyan 50
  },
};

// Light mode surface colors
export const lightColors = {
  background: {
    primary: '#FFFFFF',
    secondary: palette.gray[50],
    tertiary: palette.gray[100],
  },
  surface: {
    primary: '#FFFFFF',
    secondary: palette.gray[50],
    elevated: '#FFFFFF',
  },
  text: {
    primary: palette.gray[900],
    secondary: palette.gray[600],
    tertiary: palette.gray[400],
    inverse: '#FFFFFF',
  },
  border: {
    default: palette.gray[200],
    subtle: palette.gray[100],
    strong: palette.gray[300],
  },
  overlay: 'rgba(0, 0, 0, 0.5)',
};

// Dark mode surface colors - GENUINELY DARK
export const darkColors = {
  background: {
    primary: palette.darkMode.background, // #0A0A0A - Deep black
    secondary: palette.darkMode.surface, // #1A1A1A - Slightly elevated
    tertiary: palette.darkMode.surfaceAlt, // #262626 - More elevated
  },
  surface: {
    primary: palette.darkMode.surface, // #1A1A1A - Main surfaces
    secondary: palette.darkMode.surfaceAlt, // #262626 - Alternative surfaces (cards)
    elevated: palette.darkMode.surfaceElevated, // #333333 - Modals, floating elements
  },
  text: {
    primary: '#FFFFFF', // Pure white for maximum contrast on dark backgrounds
    secondary: '#D4D4D8', // Light gray for secondary text (high contrast)
    tertiary: '#A1A1A6', // Medium gray for tertiary (still readable)
    inverse: palette.darkMode.background, // #0A0A0A
  },
  border: {
    default: palette.darkMode.border, // #404040 - Visible borders
    subtle: palette.darkMode.borderSubtle, // #2A2A2A - Subtle dividers
    strong: '#505050', // Strong borders for emphasis
  },
  overlay: 'rgba(0, 0, 0, 0.85)', // Darker overlay for depth
};
