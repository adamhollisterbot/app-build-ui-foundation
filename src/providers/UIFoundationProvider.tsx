import React, { createContext, useContext, useMemo, type ReactNode } from 'react';
import { useColorScheme as useDeviceColorScheme } from 'react-native';
import { defaultTheme, createTheme } from '../themes';
import type { Theme, ThemeOverride, ColorScheme } from '../themes/types';

interface UIFoundationContextValue {
  theme: Theme;
  setColorScheme: (scheme: ColorScheme) => void;
}

const UIFoundationContext = createContext<UIFoundationContextValue | null>(null);

export interface UIFoundationProviderProps {
  children: ReactNode;
  /** Custom theme tokens to merge with defaults */
  themeOverride?: ThemeOverride;
  /** Initial color scheme preference */
  colorScheme?: ColorScheme;
  /** Callback when color scheme changes */
  onColorSchemeChange?: (scheme: ColorScheme) => void;
}

export function UIFoundationProvider({
  children,
  themeOverride,
  colorScheme = 'system',
  onColorSchemeChange,
}: UIFoundationProviderProps) {
  const [scheme, setScheme] = React.useState<ColorScheme>(colorScheme);
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
    (newScheme: ColorScheme) => {
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

export function useTheme(): Theme {
  return useUIFoundation().theme;
}
