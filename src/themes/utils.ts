import type { Theme, ThemeOverride, ThemeMode } from './types';
import { createDefaultTheme } from './default';

/**
 * Merge theme override with base theme
 */
export function createTheme(
  baseTheme: Theme,
  override?: ThemeOverride,
  mode: ThemeMode = 'light'
): Theme {
  if (!override) {
    return { ...baseTheme, mode };
  }

  return {
    ...baseTheme,
    mode,
    colors: override.colors
      ? {
          ...baseTheme.colors,
          ...override.colors,
          semantic: override.colors.semantic
            ? {
                ...baseTheme.colors.semantic,
                ...override.colors.semantic,
              }
            : baseTheme.colors.semantic,
        }
      : baseTheme.colors,
    spacing: override.spacing ? { ...baseTheme.spacing, ...override.spacing } : baseTheme.spacing,
    typography: override.typography
      ? { ...baseTheme.typography, ...override.typography }
      : baseTheme.typography,
    textStyles: override.textStyles
      ? { ...baseTheme.textStyles, ...override.textStyles }
      : baseTheme.textStyles,
    elevation: override.elevation
      ? { ...baseTheme.elevation, ...override.elevation }
      : baseTheme.elevation,
    radius: override.radius ? { ...baseTheme.radius, ...override.radius } : baseTheme.radius,
    motion: override.motion ? { ...baseTheme.motion, ...override.motion } : baseTheme.motion,
  };
}

export { createDefaultTheme };
