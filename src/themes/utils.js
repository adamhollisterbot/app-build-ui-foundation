/**
 * @typedef {'light' | 'dark' | 'system'} ColorScheme
 * @typedef {'light' | 'dark'} ThemeMode
 * 
 * @typedef {Object} ColorSwatch
 * @property {string} main
 * @property {string} light
 * @property {string} dark
 * @property {string} contrast
 * 
 * @typedef {Object} StatusColorSwatch
 * @property {string} main
 * @property {string} light
 * @property {string} dark
 * @property {string} contrast
 * @property {string} background
 * 
 * @typedef {Object} SemanticColors
 * @property {ColorSwatch} primary
 * @property {ColorSwatch} secondary
 * @property {StatusColorSwatch} success
 * @property {StatusColorSwatch} warning
 * @property {StatusColorSwatch} error
 * @property {StatusColorSwatch} info
 * 
 * @typedef {Object} SurfaceColors
 * @property {Object} background
 * @property {string} background.primary
 * @property {string} background.secondary
 * @property {string} background.tertiary
 * @property {Object} surface
 * @property {string} surface.primary
 * @property {string} surface.secondary
 * @property {string} surface.elevated
 * @property {Object} text
 * @property {string} text.primary
 * @property {string} text.secondary
 * @property {string} text.tertiary
 * @property {string} text.inverse
 * @property {Object} border
 * @property {string} border.default
 * @property {string} border.subtle
 * @property {string} border.strong
 * @property {string} overlay
 * 
 * @typedef {Object} Theme
 * @property {string} name - Theme identifier
 * @property {ColorScheme} colorScheme - Color scheme preference
 * @property {ThemeMode} mode - Resolved mode
 * @property {SurfaceColors & {semantic: SemanticColors}} colors - Color tokens
 * @property {Object} spacing - Spacing scale
 * @property {Object} typography - Typography tokens
 * @property {Object} textStyles - Text presets
 * @property {Object} elevation - Elevation/shadow tokens
 * @property {Object} radius - Border radius tokens
 * @property {Object} motion - Animation tokens
 * 
 * @typedef {Partial<Omit<Theme, 'name' | 'colorScheme' | 'mode'>>} ThemeOverride
 */

import { createDefaultTheme } from './default/index.js';

/**
 * Merge theme override with base theme
 * @param {Theme} baseTheme
 * @param {ThemeOverride} [override]
 * @param {ThemeMode} [mode='light']
 * @returns {Theme}
 */
export function createTheme(
  baseTheme,
  override,
  mode = 'light'
) {
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
