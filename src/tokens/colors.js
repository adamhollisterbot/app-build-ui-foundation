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

// Dark mode surface colors
export const darkColors = {
  background: {
    primary: palette.gray[950],
    secondary: palette.gray[900],
    tertiary: palette.gray[800],
  },
  surface: {
    primary: palette.gray[900],
    secondary: palette.gray[800],
    elevated: palette.gray[800],
  },
  text: {
    primary: palette.gray[50],
    secondary: palette.gray[400],
    tertiary: palette.gray[500],
    inverse: palette.gray[900],
  },
  border: {
    default: palette.gray[700],
    subtle: palette.gray[800],
    strong: palette.gray[600],
  },
  overlay: 'rgba(0, 0, 0, 0.7)',
};
