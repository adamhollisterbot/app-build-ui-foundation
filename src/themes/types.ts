import type { spacing } from '../tokens/spacing';
import type { elevation } from '../tokens/elevation';
import type { motion } from '../tokens/motion';
import type { typography, textStyles } from '../tokens/typography';
import type { radius } from '../tokens/radius';

/** Theme color scheme */
export type ColorScheme = 'light' | 'dark' | 'system';

/** Theme mode resolved from scheme */
export type ThemeMode = 'light' | 'dark';

/** Surface/background colors */
export interface SurfaceColors {
  background: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  surface: {
    primary: string;
    secondary: string;
    elevated: string;
  };
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    inverse: string;
  };
  border: {
    default: string;
    subtle: string;
    strong: string;
  };
  overlay: string;
}

/** Semantic/brand colors */
export interface SemanticColors {
  primary: ColorSwatch;
  secondary: ColorSwatch;
  success: StatusColorSwatch;
  warning: StatusColorSwatch;
  error: StatusColorSwatch;
  info: StatusColorSwatch;
}

export interface ColorSwatch {
  main: string;
  light: string;
  dark: string;
  contrast: string;
}

export interface StatusColorSwatch extends ColorSwatch {
  background: string;
}

/** Complete theme definition */
export interface Theme {
  /** Theme identifier */
  name: string;

  /** Color scheme preference */
  colorScheme: ColorScheme;

  /** Resolved mode */
  mode: ThemeMode;

  /** Color tokens */
  colors: SurfaceColors & {
    semantic: SemanticColors;
  };

  /** Spacing scale */
  spacing: typeof spacing;

  /** Typography tokens */
  typography: typeof typography;

  /** Text presets */
  textStyles: typeof textStyles;

  /** Elevation/shadow tokens */
  elevation: typeof elevation;

  /** Border radius tokens */
  radius: typeof radius;

  /** Animation tokens */
  motion: typeof motion;
}

/** Theme override - partial theme for customization */
export type ThemeOverride = DeepPartial<Omit<Theme, 'name' | 'colorScheme' | 'mode'>>;

/** Deep partial utility type */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
