import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

/**
 * FormSection: Groups related form fields into a visually distinct card
 * with a title and optional descriptive subtitle.
 */
export default function FormSection({ title, description, children }: FormSectionProps) {
  return (
    <View style={styles.sectionCard}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {description ? <Text style={styles.description}>{description}</Text> : null}
      </View>
      <View style={styles.body}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    marginBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    paddingBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    letterSpacing: -0.2,
  },
  description: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 2,
    lineHeight: 18,
  },
  body: {
    gap: 14,
  },
});
