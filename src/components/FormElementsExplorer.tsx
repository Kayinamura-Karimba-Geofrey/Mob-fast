import React, { useState } from 'react';
import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import Checkbox from 'expo-checkbox';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

// Course selection data
const COURSE_OPTIONS = [
  'Software Engineering',
  'Computer Science',
  'Information Technology',
  'Data Science & AI',
  'Cybersecurity',
];

// Available skills
const AVAILABLE_SKILLS = [
  'JavaScript',
  'TypeScript',
  'React Native',
  'Python',
  'UI/UX Design',
];

export default function FormElementsExplorer() {
  // 1. Switch State (Boolean)
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  // 2. Checkbox State (Single Boolean - Terms)
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // 3. Multi-Select Checkboxes State (Array of Strings - Skills)
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['JavaScript']);

  // 4. Radio-Button Alternative State (Single Choice String - Gender)
  const [selectedGender, setSelectedGender] = useState<string>('Female');

  // 5. Dropdown Selection State (Single Choice - Course)
  const [selectedCourse, setSelectedCourse] = useState<string>('Software Engineering');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // 6. Date Picker State (Date Object - Date of Birth)
  const [birthDate, setBirthDate] = useState<Date>(new Date(2004, 4, 15));
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Toggle skill selection in the array
  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  // Date picker trigger handler supporting Web and Native
  const handleDatePickerPress = () => {
    if (Platform.OS === 'web') {
      if (typeof window !== 'undefined' && window.prompt) {
        const input = window.prompt(
          'Enter Date of Birth (YYYY-MM-DD):',
          formatDate(birthDate)
        );
        if (input && /^\d{4}-\d{2}-\d{2}$/.test(input)) {
          const [y, m, d] = input.split('-').map(Number);
          setBirthDate(new Date(y, m - 1, d));
        }
      }
    } else {
      setShowDatePicker(true);
    }
  };

  // Date picker change handler
  const onDateChange = (event: DateTimePickerEvent, selected?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (event.type === 'set' && selected) {
      setBirthDate(selected);
    }
  };

  // Format date helper: YYYY-MM-DD
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled">
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>React Native Form Elements</Text>
        <Text style={styles.subtitle}>
          Interactive demonstration of labels, buttons, switches, checkboxes, radio groups, dropdowns, and date pickers.
        </Text>
      </View>

      {/* 1. Labels and Text */}
      <View style={styles.card}>
        <Text style={styles.cardHeader}>1. Labels and Text (Built-in: &lt;Text&gt;)</Text>
        <Text style={styles.cardDescription}>
          The foundation of form accessibility. Used for headings, field labels, descriptions, and error alerts.
        </Text>
        <View style={styles.labelRow}>
          <Text style={styles.fieldLabel}>Student Email</Text>
          <Text style={styles.requiredBadge}>* Required</Text>
        </View>
        <Text style={styles.helperText}>
          Use institutional email addresses ending in .edu or .ac
        </Text>
      </View>

      {/* 2. Buttons: Built-in vs Custom Pressable */}
      <View style={styles.card}>
        <Text style={styles.cardHeader}>2. Buttons (Built-in &lt;Button&gt; vs Custom &lt;Pressable&gt;)</Text>
        <Text style={styles.cardDescription}>
          &lt;Pressable&gt; is the modern standard for customized, styled buttons with states (hover, pressed).
        </Text>
        
        <Pressable
          style={({ pressed }) => [
            styles.customPrimaryBtn,
            pressed && styles.btnPressed,
          ]}
          onPress={() => alert('Primary Action Pressed!')}>
          <Text style={styles.customBtnText}>Custom Primary Button</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.customOutlineBtn,
            pressed && styles.btnPressed,
          ]}
          onPress={() => alert('Outline Button Pressed!')}>
          <Text style={styles.customOutlineBtnText}>Secondary / Outline Button</Text>
        </Pressable>
      </View>

      {/* 3. Switch (Toggle) */}
      <View style={styles.card}>
        <Text style={styles.cardHeader}>3. Switch / Toggle (Built-in: &lt;Switch&gt;)</Text>
        <Text style={styles.cardDescription}>
          Provides an animated on/off toggle for binary preferences like push notifications or dark mode.
        </Text>
        
        <View style={styles.switchRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.fieldLabel}>Receive Notifications</Text>
            <Text style={styles.helperText}>Get email alerts for class schedules</Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: '#cbd5e1', true: '#93c5fd' }}
            thumbColor={notificationsEnabled ? '#2563eb' : '#f8fafc'}
          />
        </View>
        <Text style={styles.stateDisplay}>
          State: notificationsEnabled = {String(notificationsEnabled)}
        </Text>
      </View>

      {/* 4. Single Checkbox (Terms & Conditions) */}
      <View style={styles.card}>
        <Text style={styles.cardHeader}>4. Checkbox (Package: expo-checkbox)</Text>
        <Text style={styles.cardDescription}>
          A standalone selectable box for accepting terms, agreeing to policies, or confirming statements.
        </Text>

        <Pressable
          style={styles.checkboxRow}
          onPress={() => setAgreedToTerms(!agreedToTerms)}>
          <Checkbox
            style={styles.checkbox}
            value={agreedToTerms}
            onValueChange={setAgreedToTerms}
            color={agreedToTerms ? '#2563eb' : undefined}
          />
          <Text style={styles.checkboxLabel}>
            I accept the academic code of conduct and regulations.
          </Text>
        </Pressable>
        <Text style={styles.stateDisplay}>
          State: agreedToTerms = {String(agreedToTerms)}
        </Text>
      </View>

      {/* 5. Radio-Button Alternative (Single-Choice Gender) */}
      <View style={styles.card}>
        <Text style={styles.cardHeader}>5. Radio-Button Alternative (Single Choice)</Text>
        <Text style={styles.cardDescription}>
          Implemented with &lt;Pressable&gt; and inner circular indicators. Allows exactly one selection.
        </Text>
        <Text style={styles.fieldLabel}>Gender</Text>
        
        <View style={styles.radioGroup}>
          {['Female', 'Male', 'Non-Binary', 'Prefer not to say'].map((option) => {
            const isSelected = selectedGender === option;
            return (
              <Pressable
                key={option}
                style={[styles.radioItem, isSelected && styles.radioItemSelected]}
                onPress={() => setSelectedGender(option)}>
                <View style={[styles.radioCircle, isSelected && styles.radioCircleActive]}>
                  {isSelected && <View style={styles.radioDot} />}
                </View>
                <Text style={[styles.radioText, isSelected && styles.radioTextActive]}>
                  {option}
                </Text>
              </Pressable>
            );
          })}
        </View>
        <Text style={styles.stateDisplay}>
          State: selectedGender = &quot;{selectedGender}&quot;
        </Text>
      </View>

      {/* 6. Multi-Select Checkboxes (Skills) */}
      <View style={styles.card}>
        <Text style={styles.cardHeader}>6. Multi-Select Checkbox Group (Skills)</Text>
        <Text style={styles.cardDescription}>
          Manages an array of values in state. Selecting adds an item; deselecting filters it out.
        </Text>
        <Text style={styles.fieldLabel}>Select Applicable Skills</Text>

        <View style={styles.chipGrid}>
          {AVAILABLE_SKILLS.map((skill) => {
            const isChecked = selectedSkills.includes(skill);
            return (
              <Pressable
                key={skill}
                style={[styles.skillChip, isChecked && styles.skillChipActive]}
                onPress={() => toggleSkill(skill)}>
                <Checkbox
                  style={styles.smallCheckbox}
                  value={isChecked}
                  onValueChange={() => toggleSkill(skill)}
                  color={isChecked ? '#2563eb' : undefined}
                />
                <Text style={[styles.skillChipText, isChecked && styles.skillChipTextActive]}>
                  {skill}
                </Text>
              </Pressable>
            );
          })}
        </View>
        <Text style={styles.stateDisplay}>
          State: selectedSkills = {JSON.stringify(selectedSkills)}
        </Text>
      </View>

      {/* 7. Dropdown / Selection Control */}
      <View style={styles.card}>
        <Text style={styles.cardHeader}>7. Dropdown Selection Modal</Text>
        <Text style={styles.cardDescription}>
          A reliable, cross-platform dropdown menu implemented using a trigger &lt;Pressable&gt; and &lt;Modal&gt;.
        </Text>
        <Text style={styles.fieldLabel}>Course of Interest</Text>

        <Pressable
          style={styles.dropdownTrigger}
          onPress={() => setIsDropdownOpen(true)}>
          <Text style={styles.dropdownTriggerText}>{selectedCourse}</Text>
          <Text style={styles.dropdownArrow}>▼</Text>
        </Pressable>

        <Text style={styles.stateDisplay}>
          State: selectedCourse = &quot;{selectedCourse}&quot;
        </Text>

        {/* Dropdown Modal */}
        <Modal
          visible={isDropdownOpen}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setIsDropdownOpen(false)}>
          <Pressable
            style={styles.modalBackdrop}
            onPress={() => setIsDropdownOpen(false)}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select a Course</Text>
              {COURSE_OPTIONS.map((course) => (
                <Pressable
                  key={course}
                  style={[
                    styles.modalOption,
                    selectedCourse === course && styles.modalOptionActive,
                  ]}
                  onPress={() => {
                    setSelectedCourse(course);
                    setIsDropdownOpen(false);
                  }}>
                  <Text
                    style={[
                      styles.modalOptionText,
                      selectedCourse === course && styles.modalOptionTextActive,
                    ]}>
                    {course}
                  </Text>
                  {selectedCourse === course && (
                    <Text style={styles.modalCheckmark}>✓</Text>
                  )}
                </Pressable>
              ))}
            </View>
          </Pressable>
        </Modal>
      </View>

      {/* 8. Date Picker */}
      <View style={styles.card}>
        <Text style={styles.cardHeader}>8. Date Picker (Package: datetimepicker)</Text>
        <Text style={styles.cardDescription}>
          Captures Date objects. Shows a native dialog on Android/iOS and provides formatted text display.
        </Text>
        <Text style={styles.fieldLabel}>Date of Birth</Text>

        <Pressable
          style={styles.datePickerTrigger}
          onPress={handleDatePickerPress}>
          <Text style={styles.datePickerText}>📅  {formatDate(birthDate)}</Text>
          <Text style={styles.datePickerAction}>Change</Text>
        </Pressable>

        {showDatePicker && Platform.OS !== 'web' && (
          <DateTimePicker
            value={birthDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            maximumDate={new Date()}
            onChange={onDateChange}
          />
        )}

        <Text style={styles.stateDisplay}>
          State: birthDate = {birthDate.toISOString().split('T')[0]} (Date Object)
        </Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 20,
    paddingBottom: 60,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 360,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 13,
    color: '#64748b',
    marginBottom: 14,
    lineHeight: 18,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
  },
  requiredBadge: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ef4444',
  },
  helperText: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 2,
  },
  customPrimaryBtn: {
    backgroundColor: '#2563eb',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginBottom: 10,
  },
  customBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  customOutlineBtn: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#2563eb',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  customOutlineBtnText: {
    color: '#2563eb',
    fontSize: 15,
    fontWeight: '600',
  },
  btnPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.99 }],
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 4,
  },
  checkbox: {
    borderRadius: 4,
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 14,
    color: '#334155',
    lineHeight: 20,
  },
  radioGroup: {
    gap: 10,
    marginTop: 8,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#f8fafc',
  },
  radioItemSelected: {
    borderColor: '#2563eb',
    backgroundColor: '#eff6ff',
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#94a3b8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleActive: {
    borderColor: '#2563eb',
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2563eb',
  },
  radioText: {
    fontSize: 14,
    color: '#334155',
  },
  radioTextActive: {
    color: '#1d4ed8',
    fontWeight: '600',
  },
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  skillChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    borderWidth: 1,
    borderColor: '#cbd5e1',
  },
  skillChipActive: {
    backgroundColor: '#eff6ff',
    borderColor: '#2563eb',
  },
  smallCheckbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
  },
  skillChipText: {
    fontSize: 13,
    color: '#475569',
  },
  skillChipTextActive: {
    color: '#1d4ed8',
    fontWeight: '600',
  },
  dropdownTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginTop: 6,
  },
  dropdownTriggerText: {
    fontSize: 15,
    color: '#0f172a',
    fontWeight: '500',
  },
  dropdownArrow: {
    fontSize: 12,
    color: '#64748b',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 12,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  modalOptionActive: {
    backgroundColor: '#eff6ff',
  },
  modalOptionText: {
    fontSize: 15,
    color: '#334155',
  },
  modalOptionTextActive: {
    color: '#2563eb',
    fontWeight: '600',
  },
  modalCheckmark: {
    fontSize: 16,
    color: '#2563eb',
    fontWeight: '700',
  },
  datePickerTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginTop: 6,
  },
  datePickerText: {
    fontSize: 15,
    color: '#0f172a',
    fontWeight: '500',
  },
  datePickerAction: {
    fontSize: 13,
    color: '#2563eb',
    fontWeight: '600',
  },
  stateDisplay: {
    marginTop: 10,
    fontSize: 12,
    color: '#059669',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
});
