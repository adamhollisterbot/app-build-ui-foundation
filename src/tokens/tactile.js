/**
 * Tactile tokens - Subtle 3D depth and dimensionality
 * These create a polished, native-feeling UI with physical presence
 */

// Border gradient values for dimensional edges
export const borderGradient = Object.freeze({
  // Highlight (top/left edges catch light)
  highlightLight: 'rgba(255, 255, 255, 0.4)',
  highlightDark: 'rgba(255, 255, 255, 0.15)',
  // Shadow (bottom/right edges in shadow)
  shadowLight: 'rgba(0, 0, 0, 0.12)',
  shadowDark: 'rgba(0, 0, 0, 0.25)',
});

// Light theme tactile effects
export const lightTactile = Object.freeze({
  // Button depth effects
  button: {
    // Top highlight for filled buttons
    borderTop: 'rgba(255, 255, 255, 0.3)',
    // Bottom shadow for filled buttons
    borderBottom: 'rgba(0, 0, 0, 0.15)',
    // Subtle inner glow on press
    innerHighlight: 'rgba(255, 255, 255, 0.2)',
    // Background gradient top (lighter)
    gradientTop: 'rgba(255, 255, 255, 0.1)',
    // Background gradient bottom (darker)
    gradientBottom: 'rgba(0, 0, 0, 0.05)',
  },
  // Input depth effects
  input: {
    // Inset shadow for unfocused state
    insetShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.06)',
    // Top border (darker, like recessed)
    borderTop: 'rgba(0, 0, 0, 0.12)',
    // Bottom border (lighter)
    borderBottom: 'rgba(255, 255, 255, 0.8)',
    // Focus glow
    focusGlow: '0 0 0 3px rgba(37, 99, 235, 0.15)',
    // Background subtle gradient
    bgGradient: 'linear-gradient(180deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0) 100%)',
  },
  // Card depth effects
  card: {
    // Raised surface shadow
    shadow: '0 1px 3px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.05)',
    // Border highlight top
    borderTop: 'rgba(255, 255, 255, 0.8)',
    // Border shadow bottom
    borderBottom: 'rgba(0, 0, 0, 0.08)',
    // Hover lift shadow
    hoverShadow: '0 2px 8px rgba(0, 0, 0, 0.1), 0 8px 24px rgba(0, 0, 0, 0.08)',
    // Background tint behind shadows for depth effect
    shadowBackground: 'rgba(0, 0, 0, 0.02)',
  },
});

// Dark theme tactile effects
export const darkTactile = Object.freeze({
  // Button depth effects
  button: {
    // Top highlight for filled buttons (subtle light edge)
    borderTop: 'rgba(255, 255, 255, 0.15)',
    // Bottom shadow for filled buttons
    borderBottom: 'rgba(0, 0, 0, 0.4)',
    // Inner glow on press
    innerHighlight: 'rgba(255, 255, 255, 0.1)',
    // Background gradient top
    gradientTop: 'rgba(255, 255, 255, 0.08)',
    // Background gradient bottom
    gradientBottom: 'rgba(0, 0, 0, 0.15)',
  },
  // Input depth effects
  input: {
    // Inset shadow (more pronounced in dark mode)
    insetShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.3)',
    // Top border (darker, like recessed)
    borderTop: 'rgba(0, 0, 0, 0.4)',
    // Bottom border (lighter edge)
    borderBottom: 'rgba(255, 255, 255, 0.08)',
    // Focus glow (brighter in dark mode)
    focusGlow: '0 0 0 3px rgba(59, 130, 246, 0.35)',
    // Background subtle gradient
    bgGradient: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 100%)',
  },
  // Card depth effects
  card: {
    // Raised surface with glow effect
    shadow: '0 1px 3px rgba(0, 0, 0, 0.3), 0 4px 12px rgba(0, 0, 0, 0.25)',
    // Border highlight top (subtle light edge)
    borderTop: 'rgba(255, 255, 255, 0.08)',
    // Border shadow bottom
    borderBottom: 'rgba(0, 0, 0, 0.3)',
    // Hover lift shadow
    hoverShadow: '0 2px 8px rgba(0, 0, 0, 0.35), 0 8px 24px rgba(0, 0, 0, 0.3)',
    // Background tint behind shadows for depth effect
    shadowBackground: 'rgba(0, 0, 0, 0.15)',
  },
});

// React Native specific shadow presets
export const tactileShadows = Object.freeze({
  // Button pressed shadow (subtle)
  buttonPressed: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 1,
    elevation: 1,
  },
  // Button normal shadow
  buttonNormal: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
    elevation: 2,
  },
  // Input inset effect (simulated)
  inputInset: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 0, // No Android elevation for inset
  },
  // Input focus glow
  inputFocusLight: {
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 0,
  },
  inputFocusDark: {
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 0,
  },
  // Card shadows
  cardLight: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cardDark: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
  },
});
