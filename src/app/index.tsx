import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import FormElementsExplorer from '@/components/FormElementsExplorer';
import StudentRegistrationForm from '@/components/StudentRegistrationForm';
import TextInputExplorer from '@/components/TextInputExplorer';

type ActiveTab = 'registration' | 'inputs' | 'elements';

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('registration');

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Navigation Switcher between all tasks */}
      <View style={styles.tabBar}>
        <Pressable
          style={[styles.tabButton, activeTab === 'registration' && styles.tabButtonActive]}
          onPress={() => setActiveTab('registration')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'registration' && styles.tabTextActive,
            ]}>
            Registration Form
          </Text>
        </Pressable>

        <Pressable
          style={[styles.tabButton, activeTab === 'inputs' && styles.tabButtonActive]}
          onPress={() => setActiveTab('inputs')}>
          <Text
            style={[styles.tabText, activeTab === 'inputs' && styles.tabTextActive]}>
            Text Inputs
          </Text>
        </Pressable>

        <Pressable
          style={[styles.tabButton, activeTab === 'elements' && styles.tabButtonActive]}
          onPress={() => setActiveTab('elements')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'elements' && styles.tabTextActive,
            ]}>
            Form Elements
          </Text>
        </Pressable>
      </View>

      {/* Screen Content */}
      <View style={styles.content}>
        {activeTab === 'registration' && <StudentRegistrationForm />}
        {activeTab === 'inputs' && <TextInputExplorer />}
        {activeTab === 'elements' && <FormElementsExplorer />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#e2e8f0',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 10,
    padding: 3,
    gap: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 9,
  },
  tabButtonActive: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748b',
    textAlign: 'center',
  },
  tabTextActive: {
    color: '#2563eb',
  },
  content: {
    flex: 1,
  },
});

