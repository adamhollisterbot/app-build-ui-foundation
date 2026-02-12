import React, { createContext, useContext, useMemo } from 'react';
import { useColorScheme as useDeviceColorScheme } from 'react-native';
import { defaultTheme, createTheme } from '../themes/index.js';

/**
 * @typedef {Object} UIFoundationContextValue
 * @property {import('../themes/utils.js').Theme} theme - Current theme object
 * @property {(scheme: import('../themes/utils.js').ColorScheme) => void} setColorScheme - Function to change color scheme
 */

/** @type {React.Context<UIFoundationContextValue | null>} */
const UIFoundationContext = createContext(null);

/**
 * @typedef {Object} UIFoundationProviderProps
 * @property {React.ReactNode} children
 * @property {import('../themes/utils.js').ThemeOverride} [themeOverride] - Custom theme tokens to merge with defaults
 * @property {import('../themes/utils.js').ColorScheme} [colorScheme='system'] - Initial color scheme preference
 * @property {(scheme: import('../themes/utils.js').ColorScheme) => void} [onColorSchemeChange] - Callback when color scheme changes
 */

/**
 * UI Foundation Provider
 * @param {UIFoundationProviderProps} props
 */
export function UIFoundationProvider({
  children,
  themeOverride,
  colorScheme = 'system',
  onColorSchemeChange,
}) {
  const [scheme, setScheme] = React.useState(colorScheme);
  const deviceScheme = useDeviceColorScheme();

  // Resolve actual mode from scheme preference
  const mode = useMemo(() => {
    if (scheme === 'system') {
      return deviceScheme === 'dark' ? 'dark' : 'light';
    }
    return scheme;
  }, [scheme, deviceScheme]);

  // Build theme with overrides
  const theme = useMemo(() => {
    return createTheme(defaultTheme, themeOverride, mode);
  }, [themeOverride, mode]);

  // Scheme setter
  const setColorScheme = React.useCallback(
    (newScheme) => {
      setScheme(newScheme);
      onColorSchemeChange?.(newScheme);
    },
    [onColorSchemeChange]
  );

  const value = useMemo(
    () => ({
      theme,
      setColorScheme,
    }),
    [theme, setColorScheme]
  );

  return <UIFoundationContext.Provider value={value}>{children}</UIFoundationContext.Provider>;
}

export function useUIFoundation() {
  const context = useContext(UIFoundationContext);
  if (!context) {
    throw new Error('useUIFoundation must be used within UIFoundationProvider');
  }
  return context;
}

/**
 * Get current theme
 * @returns {import('../themes/utils.js').Theme}
 */
export function useTheme() {
  return useUIFoundation().theme;
}
