import type { Theme, ThemeMode } from '../types';
import { spacing } from '../../tokens/spacing';
import { typography, textStyles } from '../../tokens/typography';
import { elevation } from '../../tokens/elevation';
import { radius } from '../../tokens/radius';
import { motion } from '../../tokens/motion';
import { defaultLightTheme } from './light';
import { defaultDarkTheme } from './dark';

export function createDefaultTheme(mode: ThemeMode = 'light'): Theme {
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
  };
}

export const defaultTheme = createDefaultTheme('light');
