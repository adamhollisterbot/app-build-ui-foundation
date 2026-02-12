/**
 * Border radius tokens
 */

export const radius = {
  /** 0px - Sharp corners */
  none: 0,
  /** 2px - Subtle rounding */
  xs: 2,
  /** 4px - Light rounding */
  sm: 4,
  /** 8px - Default rounding */
  md: 8,
  /** 12px - Medium rounding */
  lg: 12,
  /** 16px - Large rounding */
  xl: 16,
  /** 24px - Extra large */
  '2xl': 24,
  /** Full circle/pill */
  full: 9999,
} as const;

export type RadiusToken = keyof typeof radius;
