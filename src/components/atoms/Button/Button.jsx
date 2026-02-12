import React, { useCallback } from 'react';
import {
  Pressable,
  Text,
  ActivityIndicator,
  StyleSheet,
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
 * Polished button component with haptic feedback and animations
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

  // Variant styles
  const variantStyles = getVariantStyles(variant, colorValues, disabled, theme);

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
        fullWidth && styles.fullWidth,
        animatedStyle,
        style,
      ]}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
    >
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

function getVariantStyles(
  variant,
  colorValues,
  disabled,
  theme
) {
  const opacity = disabled ? 0.5 : 1;

  const variants = {
    filled: {
      container: {
        backgroundColor: colorValues.main,
        opacity,
      },
      textColor: colorValues.contrast,
    },
    outlined: {
      container: {
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        borderColor: colorValues.main,
        opacity,
      },
      textColor: colorValues.main,
    },
    ghost: {
      container: {
        backgroundColor: 'transparent',
        opacity,
      },
      textColor: colorValues.main,
    },
    soft: {
      container: {
        backgroundColor: colorValues.light + '20', // 12% opacity
        opacity,
      },
      textColor: colorValues.main,
    },
  };

  return variants[variant];
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  text: {
    textAlign: 'center',
  },
});
