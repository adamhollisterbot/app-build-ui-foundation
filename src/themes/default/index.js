import { spacing } from '../../tokens/spacing.js';
import { typography, textStyles } from '../../tokens/typography.js';
import { elevation } from '../../tokens/elevation.js';
import { radius } from '../../tokens/radius.js';
import { motion } from '../../tokens/motion.js';
import { lightTactile, darkTactile, tactileShadows } from '../../tokens/tactile.js';
import { defaultLightTheme } from './light.js';
import { defaultDarkTheme } from './dark.js';

/**
 * Create default theme with tactile depth tokens
 * @param {import('../utils').ThemeMode} [mode='light']
 * @returns {import('../utils').Theme}
 */
export function createDefaultTheme(mode = 'light') {
  return {
    name: 'default',
    colorScheme: 'system',
    mode,
    colors: mode === 'dark' ? defaultDarkTheme : defaultLightTheme,
    spacing,
    typography,
    textStyles,
    elevation,
    radius,
    motion,
    // Tactile depth tokens for polished, native feel
    tactile: {
      light: lightTactile,
      dark: darkTactile,
      shadows: tactileShadows,
    },
  };
}

export const defaultTheme = createDefaultTheme('light');
