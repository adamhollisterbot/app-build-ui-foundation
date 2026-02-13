import React, { useState, forwardRef } from 'react';
import {
  View,
  TextInput as RNTextInput,
  Text,
  StyleSheet,
} from 'react-native';
import { useTheme } from '../../../providers/index.jsx';

/**
 * @typedef {Object} TextInputProps
 * @property {string} [label] - Input label
 * @property {string} [helperText] - Helper text below input
 * @property {string} [error] - Error message (shows error state)
 * @property {React.ReactNode} [leftElement] - Left icon/element
 * @property {React.ReactNode} [rightElement] - Right icon/element
 * @property {Object} [style] - Container style
 * @property {boolean} [disabled=false] - Disabled state
 * @property {boolean} [required=false] - Required indicator
 * @property {Function} [onFocus] - Focus handler
 * @property {Function} [onBlur] - Blur handler
 */

/**
 * Full-featured text input with labels, errors, and tactile depth
 * @type {React.ForwardRefExoticComponent<TextInputProps & React.RefAttributes<import('react-native').TextInput>>}
 */
export const TextInput = forwardRef(function TextInput(
  {
    label,
    helperText,
    error,
    leftElement,
    rightElement,
    style,
    disabled = false,
    required = false,
    onFocus,
    onBlur,
    ...inputProps
  },
  ref
) {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const hasError = Boolean(error);
  const isDark = theme.mode === 'dark';

  // Handle focus state
  const handleFocus = (e) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  // Get tactile tokens for current mode
  const tactile = isDark ? theme.tactile?.dark?.input : theme.tactile?.light?.input;
  const shadows = theme.tactile?.shadows;

  // Border color based on state
  const borderColor = hasError
    ? theme.colors.semantic.error.main
    : isFocused
      ? theme.colors.semantic.primary.main
      : theme.colors.border.default;

  // Tactile border colors - inputs are "recessed" so top is darker
  const borderTopColor = hasError
    ? theme.colors.semantic.error.dark
    : isFocused
      ? theme.colors.semantic.primary.main
      : tactile?.borderTop || (isDark ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.1)');
  
  const borderBottomColor = hasError
    ? theme.colors.semantic.error.light
    : isFocused
      ? theme.colors.semantic.primary.main
      : tactile?.borderBottom || (isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.8)');

  // Side borders for smooth gradient effect
  const borderSideColor = hasError
    ? theme.colors.semantic.error.main
    : isFocused
      ? theme.colors.semantic.primary.main
      : theme.colors.border.default;

  // Focus glow shadow
  const focusShadow = isFocused
    ? isDark
      ? shadows?.inputFocusDark
      : shadows?.inputFocusLight
    : null;

  // Inset shadow effect (simulated with inner view)
  const insetShadow = !isFocused && !disabled
    ? shadows?.inputInset
    : null;

  return (
    <View style={[styles.wrapper, style]}>
      {/* Label */}
      {label && (
        <Text
          style={[
            styles.label,
            {
              color: hasError ? theme.colors.semantic.error.main : theme.colors.text.primary,
              ...theme.textStyles.labelMedium,
            },
          ]}
        >
          {label}
          {required && (
            <Text style={{ color: theme.colors.semantic.error.main }}> *</Text>
          )}
        </Text>
      )}

      {/* Input container with tactile depth */}
      <View
        style={[
          styles.container,
          {
            backgroundColor: disabled
              ? theme.colors.background.tertiary
              : theme.colors.surface.primary,
            borderRadius: theme.radius.md,
            // Clean solid border
            borderWidth: 1,
            borderTopColor,
            borderBottomColor,
            borderLeftColor: borderSideColor,
            borderRightColor: borderSideColor,
          },
          // Focus glow effect
          focusShadow,
          // Inset shadow for depth
          insetShadow,
        ]}
      >
        {leftElement && <View style={styles.leftElement}>{leftElement}</View>}

        <RNTextInput
          ref={ref}
          {...inputProps}
          editable={!disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholderTextColor={theme.colors.text.tertiary}
          style={[
            styles.input,
            {
              color: theme.colors.text.primary,
              ...theme.textStyles.bodyMedium,
            },
          ]}
        />

        {rightElement && <View style={styles.rightElement}>{rightElement}</View>}
      </View>

      {/* Helper/Error text */}
      {(helperText || error) && (
        <Text
          style={[
            styles.helperText,
            {
              color: hasError
                ? theme.colors.semantic.error.main
                : theme.colors.text.secondary,
              ...theme.textStyles.caption,
            },
          ]}
        >
          {error || helperText}
        </Text>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  label: {
    marginBottom: 8,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 48,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
  },
  leftElement: {
    marginRight: 8,
  },
  rightElement: {
    marginLeft: 8,
  },
  helperText: {
    marginTop: 6,
  },
});
