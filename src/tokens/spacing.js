/**
 * Spacing tokens based on 4px base unit
 * @type {Readonly<{none: 0, '2xs': 2, xs: 4, sm: 8, md: 12, lg: 16, xl: 24, '2xl': 32, '3xl': 48, '4xl': 64, '5xl': 96}>}
 */
export const spacing = Object.freeze({
  /** 0px */
  none: 0,
  /** 2px - Hairline spacing */
  '2xs': 2,
  /** 4px - Tight spacing */
  xs: 4,
  /** 8px - Compact spacing */
  sm: 8,
  /** 12px - Small spacing */
  md: 12,
  /** 16px - Default spacing */
  lg: 16,
  /** 24px - Comfortable spacing */
  xl: 24,
  /** 32px - Loose spacing */
  '2xl': 32,
  /** 48px - Section spacing */
  '3xl': 48,
  /** 64px - Large section spacing */
  '4xl': 64,
  /** 96px - Hero spacing */
  '5xl': 96,
});

/**
 * @typedef {keyof typeof spacing} SpacingToken
 */
