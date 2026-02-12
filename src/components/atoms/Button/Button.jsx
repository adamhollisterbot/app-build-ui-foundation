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
 * Buttons are "raised" surfaces - top catches light, bottom is in shadow
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
      {/* Top highlight edge for dimensional effect - only on raised buttons */}
      {(variant === 'filled' || variant === 'soft') && !isDisabled && (
        <View 
          style={[
            styles.topHighlight, 
            { 
              backgroundColor: variantStyles.topEdgeColor,
              borderTopLeftRadius: sizeStyles.container.borderRadius,
              borderTopRightRadius: sizeStyles.container.borderRadius,
            }
          ]} 
        />
      )}
      
      {loading ? (
        <ActivityIndicator size="small" color={variantStyles.textColor} />
      ) : (
        <>
          {leftIcon && <>{leftIcon}</>}
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
          {rightIcon && <>{rightIcon}</>}
        </>
      )}
      
      {/* Bottom shadow edge for dimensional effect */}
      {(variant === 'filled' || variant === 'soft') && !isDisabled && (
        <View 
          style={[
            styles.bottomShadow, 
            { 
              backgroundColor: variantStyles.bottomEdgeColor,
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
        paddingVertical: theme.spacing.xs,
        paddingHorizontal: theme.spacing.sm,
        minHeight: 32,
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
        paddingVertical: theme.spacing.sm,
        paddingHorizontal: theme.spacing.lg,
        minHeight: 44, // iOS minimum
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
        paddingVertical: theme.spacing.md,
        paddingHorizontal: theme.spacing.xl,
        minHeight: 52,
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
  
  // Get tactile tokens
  const tactile = isDark ? theme.tactile?.dark?.button : theme.tactile?.light?.button;
  
  // Tactile edge colors for dimensional "raised surface" effect
  // Top edge catches light (lighter), bottom is in shadow (darker)
  const topEdgeLight = tactile?.borderTop || 'rgba(255, 255, 255, 0.35)';
  const bottomEdgeLight = tactile?.borderBottom || 'rgba(0, 0, 0, 0.2)';
  const topEdgeDark = tactile?.borderTop || 'rgba(255, 255, 255, 0.18)';
  const bottomEdgeDark = tactile?.borderBottom || 'rgba(0, 0, 0, 0.45)';

  // Shadow for depth - more pronounced in dark mode
  const buttonShadow = isDark
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
        shadowRadius: 4,
        elevation: 3,
      };

  const variants = {
    filled: {
      container: {
        backgroundColor: colorValues.main,
        opacity,
        overflow: 'hidden',
        // Dimensional border - top lighter, bottom darker, sides gradient
        borderWidth: 1,
        borderTopColor: isDark ? topEdgeDark : topEdgeLight,
        borderLeftColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.12)',
        borderRightColor: isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.08)',
        borderBottomColor: isDark ? bottomEdgeDark : bottomEdgeLight,
      },
      shadow: disabled ? {} : buttonShadow,
      textColor: colorValues.contrast,
      topEdgeColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.25)',
      bottomEdgeColor: isDark ? 'rgba(0, 0, 0, 0.25)' : 'rgba(0, 0, 0, 0.12)',
    },
    outlined: {
      container: {
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        opacity,
        // Subtle dimensional border for outlined
        borderTopColor: isDark ? colorValues.light : colorValues.main,
        borderBottomColor: isDark ? colorValues.dark : colorValues.dark,
        borderLeftColor: colorValues.main,
        borderRightColor: colorValues.main,
      },
      shadow: {},
      textColor: colorValues.main,
      topEdgeColor: 'transparent',
      bottomEdgeColor: 'transparent',
    },
    ghost: {
      container: {
        backgroundColor: 'transparent',
        opacity,
        // No border for ghost
        borderWidth: 0,
      },
      shadow: {},
      textColor: colorValues.main,
      topEdgeColor: 'transparent',
      bottomEdgeColor: 'transparent',
    },
    soft: {
      container: {
        backgroundColor: isDark 
          ? colorValues.main + '25' // 15% opacity in dark mode
          : colorValues.light + '30', // 19% opacity in light
        opacity,
        overflow: 'hidden',
        // Subtle dimensional border
        borderWidth: 1,
        borderTopColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.6)',
        borderBottomColor: isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.08)',
        borderLeftColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
        borderRightColor: isDark ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.03)',
      },
      shadow: {},
      textColor: colorValues.main,
      topEdgeColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(255, 255, 255, 0.4)',
      bottomEdgeColor: isDark ? 'rgba(0, 0, 0, 0.15)' : 'rgba(0, 0, 0, 0.06)',
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
  text: {
    textAlign: 'center',
  },
  // Tactile highlight edge overlays for dimensional depth
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
