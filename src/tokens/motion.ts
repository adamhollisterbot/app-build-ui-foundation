/**
 * Motion/animation tokens
 */

export const motion = {
  duration: {
    /** 100ms - Micro-interactions (button press) */
    instant: 100,
    /** 150ms - Quick feedback (toggle) */
    fast: 150,
    /** 250ms - Default transitions */
    normal: 250,
    /** 350ms - Emphasized animations */
    slow: 350,
    /** 500ms - Page transitions */
    slower: 500,
  },
  easing: {
    /** Standard easing for most animations */
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    /** Enter animations - decelerate */
    enter: 'cubic-bezier(0, 0, 0.2, 1)',
    /** Exit animations - accelerate */
    exit: 'cubic-bezier(0.4, 0, 1, 1)',
    /** Bounce effect for emphasis */
    bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    /** Linear for progress indicators */
    linear: 'linear',
  },
  spring: {
    /** Snappy spring for buttons */
    snappy: { damping: 20, stiffness: 300 },
    /** Gentle spring for modals */
    gentle: { damping: 15, stiffness: 150 },
    /** Bouncy spring for fun interactions */
    bouncy: { damping: 10, stiffness: 200 },
  },
} as const;
