import React, { useCallback } from 'react';
import {
  Pressable,
  Text,
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../../../providers/index.jsx';
import { useReducedMotion } from '../../../hooks/index.js';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

/**
 * @typedef {'filled' | 'outlined' | 'ghost' | 'soft'} ButtonVariant
 * @typedef {'sm' | 'md' | 'lg'} ButtonSize
 * @typedef {'primary' | 'secondary' | 'success' | 'error' | 'warning'} ButtonColor
 */

/**
 * @typedef {Object} ButtonProps
 * @property {React.ReactNode} children - Button label
 * @property {ButtonVariant} [variant='filled'] - Visual variant
 * @property {ButtonSize} [size='md'] - Size preset
 * @property {ButtonColor} [color='primary'] - Color scheme
 * @property {boolean} [loading=false] - Show loading spinner
 * @property {boolean} [disabled=false] - Disable interactions
 * @property {boolean} [fullWidth=false] - Full width
 * @property {React.ReactNode} [leftIcon] - Left icon component
 * @property {React.ReactNode} [rightIcon] - Right icon component
 * @property {Object} [style] - Custom styles
 * @property {Object} [textStyle] - Custom text styles
 * @property {boolean} [haptics=true] - Enable haptic feedback
 * @property {Function} [onPress] - Press handler
 * @property {Function} [onPressIn] - Press in handler
 */

/**
 * Polished button component with haptic feedback, animations, and tactile depth
 * Features:
 * - Subtle 3D border gradient (top lighter, bottom darker)
 * - Layered shadows for physical presence
 * - Smooth press animations
 * @param {ButtonProps} props
 */
export function Button({
  children,
  variant = 'filled',
  size = 'md',
  color = 'primary',
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  style,
  textStyle,
  haptics = true,
  onPress,
  onPressIn,
  ...pressableProps
}) {
  const theme = useTheme();
  const reducedMotion = useReducedMotion();
  const scale = useSharedValue(1);

  // Get color values from theme
  const colorValues = theme.colors.semantic[color];
  const isDark = theme.mode === 'dark';

  // Handle press animations
  const handlePressIn = useCallback(
    (event) => {
      if (!reducedMotion) {
        scale.value = withSpring(0.97, theme.motion.spring.snappy);
      }
      if (haptics && !disabled) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
      onPressIn?.(event);
    },
    [reducedMotion, scale, haptics, disabled, onPressIn, theme.motion.spring.snappy]
  );

  const handlePressOut = useCallback(() => {
    if (!reducedMotion) {
      scale.value = withSpring(1, theme.motion.spring.snappy);
    }
  }, [reducedMotion, scale, theme.motion.spring.snappy]);

  // Animated styles
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  // Size styles
  const sizeStyles = getSizeStyles(size, theme);

  // Variant styles with tactile depth
  const variantStyles = getVariantStyles(variant, colorValues, disabled, theme, isDark);

  const isDisabled = disabled || loading;

  return (
    <AnimatedPressable
      {...pressableProps}
      disabled={isDisabled}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        styles.base,
        sizeStyles.container,
        variantStyles.container,
        variantStyles.shadow,
        fullWidth && styles.fullWidth,
        animatedStyle,
        style,
      ]}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
    >
      {/* Top highlight edge for dimensional effect - simulates light hitting top edge */}
      {(variant === 'filled' || variant === 'soft') && !isDisabled && (
        <View 
          style={[
            styles.topHighlight, 
            { 
              backgroundColor: variantStyles.topHighlightColor,
              borderTopLeftRadius: sizeStyles.container.borderRadius,
              borderTopRightRadius: sizeStyles.container.borderRadius,
            }
          ]} 
        />
      )}
      
      {loading ? (
        <ActivityIndicator size="small" color={variantStyles.textColor} />
      ) : (
        <View style={styles.content}>
          {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
          <Text
            style={[
              styles.text,
              sizeStyles.text,
              { color: variantStyles.textColor },
              textStyle,
            ]}
          >
            {children}
          </Text>
          {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
        </View>
      )}
      
      {/* Bottom shadow edge for dimensional effect - simulates shadow at bottom */}
      {(variant === 'filled' || variant === 'soft') && !isDisabled && (
        <View 
          style={[
            styles.bottomShadow, 
            { 
              backgroundColor: variantStyles.bottomShadowColor,
              borderBottomLeftRadius: sizeStyles.container.borderRadius,
              borderBottomRightRadius: sizeStyles.container.borderRadius,
            }
          ]} 
        />
      )}
    </AnimatedPressable>
  );
}

// Style helpers
function getSizeStyles(size, theme) {
  const sizes = {
    sm: {
      container: {
        paddingVertical: theme.spacing.xs + 2, // Extra padding for highlight/shadow edges
        paddingHorizontal: theme.spacing.sm,
        minHeight: 34,
        borderRadius: theme.radius.sm,
        gap: theme.spacing.xs,
      },
      text: {
        fontSize: theme.typography.fontSize.sm,
        fontWeight: theme.typography.fontWeight.medium,
      },
    },
    md: {
      container: {
        paddingVertical: theme.spacing.sm + 2, // Extra padding for highlight/shadow edges
        paddingHorizontal: theme.spacing.lg,
        minHeight: 46, // Slightly taller to accommodate edges
        borderRadius: theme.radius.md,
        gap: theme.spacing.sm,
      },
      text: {
        fontSize: theme.typography.fontSize.md,
        fontWeight: theme.typography.fontWeight.semibold,
      },
    },
    lg: {
      container: {
        paddingVertical: theme.spacing.md + 2, // Extra padding for highlight/shadow edges
        paddingHorizontal: theme.spacing.xl,
        minHeight: 54,
        borderRadius: theme.radius.lg,
        gap: theme.spacing.sm,
      },
      text: {
        fontSize: theme.typography.fontSize.lg,
        fontWeight: theme.typography.fontWeight.semibold,
      },
    },
  };
  return sizes[size];
}

function getVariantStyles(variant, colorValues, disabled, theme, isDark) {
  const opacity = disabled ? 0.5 : 1;
  
  // Get tactile tokens if available
  const tactile = isDark ? theme.tactile?.dark?.button : theme.tactile?.light?.button;
  
  // Tactile border/highlight colors for dimensional effect
  // Top edge catches light (lighter), bottom edge in shadow (darker)
  const topHighlightColor = tactile?.borderTop || (isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.35)');
  const bottomShadowColor = tactile?.borderBottom || (isDark ? 'rgba(0, 0, 0, 0.35)' : 'rgba(0, 0, 0, 0.12)');
  
  // Side border colors for smooth gradient effect
  const sideHighlightColor = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(255, 255, 255, 0.2)';
  const sideShadowColor = isDark ? 'rgba(0, 0, 0, 0.15)' : 'rgba(0, 0, 0, 0.06)';

  // Shadow for depth - more pronounced in dark mode
  const filledShadow = isDark
    ? {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 4,
      }
    : {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
        elevation: 3,
      };

  // Soft shadow - lighter
  const softShadow = isDark
    ? {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 2,
      }
    : {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 2,
        elevation: 1,
      };

  const variants = {
    filled: {
      container: {
        backgroundColor: colorValues.main,
        opacity,
        overflow: 'hidden',
        position: 'relative',
        // Multi-directional border for 3D effect
        borderWidth: 1,
        borderTopColor: topHighlightColor,
        borderLeftColor: sideHighlightColor,
        borderRightColor: sideShadowColor,
        borderBottomColor: bottomShadowColor,
      },
      shadow: disabled ? {} : filledShadow,
      textColor: colorValues.contrast,
      topHighlightColor: 'rgba(255, 255, 255, 0.15)',
      bottomShadowColor: 'rgba(0, 0, 0, 0.15)',
    },
    outlined: {
      container: {
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        borderColor: colorValues.main,
        opacity,
        // Subtle dimensional border variation
        borderTopColor: isDark ? colorValues.light : colorValues.main,
        borderBottomColor: isDark ? colorValues.dark : colorValues.main,
        borderLeftColor: colorValues.main,
        borderRightColor: colorValues.main,
      },
      shadow: {},
      textColor: colorValues.main,
      topHighlightColor: 'transparent',
      bottomShadowColor: 'transparent',
    },
    ghost: {
      container: {
        backgroundColor: 'transparent',
        opacity,
        borderWidth: 0,
      },
      shadow: {},
      textColor: colorValues.main,
      topHighlightColor: 'transparent',
      bottomShadowColor: 'transparent',
    },
    soft: {
      container: {
        backgroundColor: isDark 
          ? colorValues.main + '25' // 15% opacity in dark
          : colorValues.light + '20', // 12% opacity in light
        opacity,
        overflow: 'hidden',
        position: 'relative',
        // Subtle border for definition
        borderWidth: 1,
        borderTopColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.6)',
        borderLeftColor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(255, 255, 255, 0.3)',
        borderRightColor: isDark ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.03)',
        borderBottomColor: isDark ? 'rgba(0, 0, 0, 0.15)' : 'rgba(0, 0, 0, 0.05)',
      },
      shadow: disabled ? {} : softShadow,
      textColor: colorValues.main,
      topHighlightColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.4)',
      bottomShadowColor: isDark ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.03)',
    },
  };

  return variants[variant];
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  fullWidth: {
    width: '100%',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
  iconLeft: {
    marginRight: 6,
  },
  iconRight: {
    marginLeft: 6,
  },
  // Tactile highlight edge overlays - these add the subtle 3D effect
  topHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
  },
  bottomShadow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
  },
});
