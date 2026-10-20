import React from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'outline';

interface FormButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  style?: ViewStyle;
}

/**
 * FormButton: A reusable, styled button utilizing React Native's Pressable.
 * Supports primary, secondary, outline, and danger variations.
 */
export default function FormButton({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  style,
}: FormButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.baseButton,
        styles[variant],
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button">
      <Text
        style={[
          styles.baseText,
          styles[`${variant}Text` as keyof typeof styles],
          disabled && styles.disabledText,
        ]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  baseButton: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  baseText: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.1,
  },
  primary: {
    backgroundColor: '#2563eb',
  },
  primaryText: {
    color: '#ffffff',
  },
  secondary: {
    backgroundColor: '#f1f5f9',
    borderWidth: 1,
    borderColor: '#cbd5e1',
  },
  secondaryText: {
    color: '#334155',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#2563eb',
  },
  outlineText: {
    color: '#2563eb',
  },
  danger: {
    backgroundColor: '#fee2e2',
    borderWidth: 1,
    borderColor: '#fca5a5',
  },
  dangerText: {
    color: '#dc2626',
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
  disabled: {
    backgroundColor: '#e2e8f0',
    borderColor: '#cbd5e1',
    opacity: 0.6,
  },
  disabledText: {
    color: '#94a3b8',
  },
});
