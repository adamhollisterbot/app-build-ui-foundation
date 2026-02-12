import React, { useCallback, type ReactNode } from 'react';
import {
  Pressable,
  Text,
  ActivityIndicator,
  StyleSheet,
  type PressableProps,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../../../providers';
import { useReducedMotion } from '../../../hooks';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export type ButtonVariant = 'filled' | 'outlined' | 'ghost' | 'soft';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonColor = 'primary' | 'secondary' | 'success' | 'error' | 'warning';

export interface ButtonProps extends Omit<PressableProps, 'style'> {
  /** Button label */
  children: ReactNode;
  /** Visual variant */
  variant?: ButtonVariant;
  /** Size preset */
  size?: ButtonSize;
  /** Color scheme */
  color?: ButtonColor;
  /** Show loading spinner */
  loading?: boolean;
  /** Disable interactions */
  disabled?: boolean;
  /** Full width */
  fullWidth?: boolean;
  /** Left icon component */
  leftIcon?: ReactNode;
  /** Right icon component */
  rightIcon?: ReactNode;
  /** Custom styles */
  style?: ViewStyle;
  /** Custom text styles */
  textStyle?: TextStyle;
  /** Enable haptic feedback */
  haptics?: boolean;
}

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
}: ButtonProps) {
  const theme = useTheme();
  const reducedMotion = useReducedMotion();
  const scale = useSharedValue(1);

  // Get color values from theme
  const colorValues = theme.colors.semantic[color];

  // Handle press animations
  const handlePressIn = useCallback(
    (event: any) => {
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
function getSizeStyles(size: ButtonSize, theme: any) {
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
  variant: ButtonVariant,
  colorValues: any,
  disabled: boolean,
  theme: any
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
