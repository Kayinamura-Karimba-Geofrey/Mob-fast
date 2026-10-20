import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';

interface FormInputProps extends TextInputProps {
  label: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  containerStyle?: ViewStyle;
  rightElement?: React.ReactNode;
}

/**
 * FormInput: A standardized, reusable text input component featuring
 * labels, required indicators, inline error messaging, and custom action slots.
 */
export default function FormInput({
  label,
  required = false,
  error,
  helperText,
  containerStyle,
  rightElement,
  style,
  multiline,
  ...restProps
}: FormInputProps) {
  const hasError = Boolean(error);

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Label and Required Indicator */}
      <View style={styles.labelRow}>
        <Text style={styles.label}>{label}</Text>
        {required && <Text style={styles.requiredBadge}>* Required</Text>}
      </View>

      {/* Input Box and Optional Right Element (e.g. Show/Hide Password) */}
      <View
        style={[
          styles.inputWrapper,
          hasError && styles.inputWrapperError,
          multiline && styles.inputWrapperMultiline,
        ]}>
        <TextInput
          style={[
            styles.input,
            multiline && styles.inputMultiline,
            style,
          ]}
          placeholderTextColor="#94a3b8"
          multiline={multiline}
          textAlignVertical={multiline ? 'top' : 'center'}
          {...restProps}
        />
        {rightElement ? <View style={styles.rightElement}>{rightElement}</View> : null}
      </View>

      {/* Inline Validation Error Message */}
      {hasError ? (
        <Text style={styles.errorText}>⚠️ {error}</Text>
      ) : helperText ? (
        <Text style={styles.helperText}>{helperText}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 4,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
  },
  requiredBadge: {
    fontSize: 11,
    fontWeight: '700',
    color: '#ef4444',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderWidth: 1.2,
    borderColor: '#cbd5e1',
    borderRadius: 9,
    overflow: 'hidden',
  },
  inputWrapperError: {
    borderColor: '#ef4444',
    backgroundColor: '#fff5f5',
  },
  inputWrapperMultiline: {
    alignItems: 'flex-start',
  },
  input: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 15,
    color: '#0f172a',
  },
  inputMultiline: {
    height: 90,
    paddingTop: 10,
  },
  rightElement: {
    paddingRight: 10,
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 12,
    color: '#dc2626',
    marginTop: 4,
    fontWeight: '500',
  },
  helperText: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
  },
});
