import React, { useState, forwardRef } from 'react';
import {
  View,
  TextInput as RNTextInput,
  Text,
  StyleSheet,
  type TextInputProps as RNTextInputProps,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../../providers';

export interface TextInputProps extends Omit<RNTextInputProps, 'style'> {
  /** Input label */
  label?: string;
  /** Helper text below input */
  helperText?: string;
  /** Error message (shows error state) */
  error?: string;
  /** Left icon/element */
  leftElement?: React.ReactNode;
  /** Right icon/element */
  rightElement?: React.ReactNode;
  /** Container style */
  style?: ViewStyle;
  /** Disabled state */
  disabled?: boolean;
  /** Required indicator */
  required?: boolean;
}

export const TextInput = forwardRef<RNTextInput, TextInputProps>(function TextInput(
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

  // Handle focus state
  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  // Border color
  const borderColor = hasError
    ? theme.colors.semantic.error.main
    : isFocused
      ? theme.colors.semantic.primary.main
      : theme.colors.border.default;

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

      {/* Input container */}
      <View
        style={[
          styles.container,
          {
            backgroundColor: disabled
              ? theme.colors.background.tertiary
              : theme.colors.surface.primary,
            borderColor,
            borderRadius: theme.radius.md,
          },
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
    marginBottom: 6,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
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
    marginTop: 4,
  },
});
