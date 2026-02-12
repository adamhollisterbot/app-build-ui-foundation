/**
 * Border radius tokens
 * @type {Readonly<{none: 0, xs: 2, sm: 4, md: 8, lg: 12, xl: 16, '2xl': 24, full: 9999}>}
 */
export const radius = Object.freeze({
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
});

/**
 * @typedef {keyof typeof radius} RadiusToken
 */
