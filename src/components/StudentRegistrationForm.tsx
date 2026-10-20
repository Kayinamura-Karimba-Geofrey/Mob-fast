import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
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

import FormButton from './FormButton';
import FormInput from './FormInput';
import FormSection from './FormSection';

// Constant Options for Dropdowns and Selectables
const COURSE_OPTIONS = [
  'Software Engineering',
  'Computer Science',
  'Information Technology',
  'Data Science & Artificial Intelligence',
  'Cybersecurity',
  'Mobile Application Development',
];

const GENDER_OPTIONS = ['Male', 'Female', 'Non-Binary', 'Prefer not to say'];

const AVAILABLE_SKILLS = [
  'JavaScript',
  'TypeScript',
  'Python',
  'React Native',
  'UI/UX Design',
  'Node.js',
];

// Initial form state definition
const INITIAL_FORM_STATE = {
  fullName: '',
  email: '',
  password: '',
  age: '',
  phoneNumber: '',
  gender: 'Male',
  dateOfBirth: new Date(2003, 0, 1),
  course: 'Software Engineering',
  skills: ['JavaScript'] as string[],
  biography: '',
  receiveNotifications: true,
  acceptedTerms: false,
};

export default function StudentRegistrationForm() {
  // State for each form element
  const [fullName, setFullName] = useState(INITIAL_FORM_STATE.fullName);
  const [email, setEmail] = useState(INITIAL_FORM_STATE.email);
  const [password, setPassword] = useState(INITIAL_FORM_STATE.password);
  const [showPassword, setShowPassword] = useState(false);
  const [age, setAge] = useState(INITIAL_FORM_STATE.age);
  const [phoneNumber, setPhoneNumber] = useState(INITIAL_FORM_STATE.phoneNumber);
  const [gender, setGender] = useState(INITIAL_FORM_STATE.gender);
  const [dateOfBirth, setDateOfBirth] = useState<Date>(INITIAL_FORM_STATE.dateOfBirth);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [course, setCourse] = useState(INITIAL_FORM_STATE.course);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [skills, setSkills] = useState<string[]>(INITIAL_FORM_STATE.skills);
  const [biography, setBiography] = useState(INITIAL_FORM_STATE.biography);
  const [receiveNotifications, setReceiveNotifications] = useState(
    INITIAL_FORM_STATE.receiveNotifications
  );
  const [acceptedTerms, setAcceptedTerms] = useState(INITIAL_FORM_STATE.acceptedTerms);

  // Validation errors state
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Submission success state and submitted JSON object
  const [submittedData, setSubmittedData] = useState<Record<string, unknown> | null>(null);

  // Helper to format date to YYYY-MM-DD
  const formatDate = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  // Toggle skills in array
  const handleToggleSkill = (skill: string) => {
    if (skills.includes(skill)) {
      setSkills(skills.filter((s) => s !== skill));
    } else {
      setSkills([...skills, skill]);
    }
  };

  // Date picker trigger handler supporting Web and Native
  const handleDatePickerPress = () => {
    if (Platform.OS === 'web') {
      if (typeof window !== 'undefined' && window.prompt) {
        const input = window.prompt(
          'Enter Date of Birth (YYYY-MM-DD):',
          formatDate(dateOfBirth)
        );
        if (input && /^\d{4}-\d{2}-\d{2}$/.test(input)) {
          const [y, m, d] = input.split('-').map(Number);
          setDateOfBirth(new Date(y, m - 1, d));
        }
      }
    } else {
      setShowDatePicker(true);
    }
  };

  // Date picker handler
  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (event.type === 'set' && selectedDate) {
      setDateOfBirth(selectedDate);
    }
  };

  // Form Validation Logic
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // 1. Full name validation
    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required.';
    } else if (fullName.trim().length < 3) {
      newErrors.fullName = 'Name must be at least 3 characters.';
    }

    // 2. Email format validation with regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = 'Please enter a valid email (e.g. name@domain.com).';
    }

    // 3. Password validation
    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
    }

    // 4. Age validation
    const parsedAge = parseInt(age, 10);
    if (!age.trim()) {
      newErrors.age = 'Age is required.';
    } else if (isNaN(parsedAge) || parsedAge < 16 || parsedAge > 100) {
      newErrors.age = 'Age must be a valid number between 16 and 100.';
    }

    // 5. Phone number validation
    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required.';
    } else if (phoneNumber.trim().length < 7) {
      newErrors.phoneNumber = 'Phone number must be at least 7 digits.';
    }

    // 6. Skills validation
    if (skills.length === 0) {
      newErrors.skills = 'Please select at least one skill.';
    }

    // 7. Terms & Conditions acceptance
    if (!acceptedTerms) {
      newErrors.acceptedTerms = 'You must accept the terms and conditions to register.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form Submission Handler
  const handleSubmit = () => {
    const isValid = validateForm();

    if (!isValid) {
      Alert.alert(
        'Validation Error',
        'Please correct the highlighted fields before submitting.',
        [{ text: 'OK' }]
      );
      return;
    }

    // 1. Assemble complete submission object
    const formData = {
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      password: password, // Captured in form state
      age: parseInt(age, 10),
      phoneNumber: phoneNumber.trim(),
      gender: gender,
      dateOfBirth: formatDate(dateOfBirth),
      course: course,
      skills: skills,
      biography: biography.trim(),
      receiveNotifications: receiveNotifications,
      acceptedTerms: acceptedTerms,
      submittedAt: new Date().toISOString(),
    };

    // 2. Format as JSON string with 2 spaces indent
    const formattedJson = JSON.stringify(formData, null, 2);

    // 3. Output to terminal / browser console as required
    console.log('====================================');
    console.log('STUDENT REGISTRATION SUBMITTED:');
    console.log(formattedJson);
    console.log('====================================');

    // 4. Save to state to trigger UI confirmation display
    setSubmittedData(formData);
  };

  // Form Reset Handler
  const handleReset = () => {
    setFullName(INITIAL_FORM_STATE.fullName);
    setEmail(INITIAL_FORM_STATE.email);
    setPassword(INITIAL_FORM_STATE.password);
    setShowPassword(false);
    setAge(INITIAL_FORM_STATE.age);
    setPhoneNumber(INITIAL_FORM_STATE.phoneNumber);
    setGender(INITIAL_FORM_STATE.gender);
    setDateOfBirth(INITIAL_FORM_STATE.dateOfBirth);
    setShowDatePicker(false);
    setCourse(INITIAL_FORM_STATE.course);
    setSkills(INITIAL_FORM_STATE.skills);
    setBiography(INITIAL_FORM_STATE.biography);
    setReceiveNotifications(INITIAL_FORM_STATE.receiveNotifications);
    setAcceptedTerms(INITIAL_FORM_STATE.acceptedTerms);
    setErrors({});
    setSubmittedData(null);

    Alert.alert('Form Reset', 'All inputs have been cleared and restored to defaults.', [
      { text: 'OK' },
    ]);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled">
        
        {/* Form Title Banner */}
        <View style={styles.banner}>
          <Text style={styles.bannerBadge}>EXPO & REACT NATIVE</Text>
          <Text style={styles.bannerTitle}>Student Registration Form</Text>
          <Text style={styles.bannerSubtitle}>
            Complete your enrollment profile below. Submitting will validate all fields and output the serialized JSON payload.
          </Text>
        </View>

        {/* SECTION 1: Personal Information */}
        <FormSection
          title="1. Personal Information"
          description="Basic biographical details required for student identification.">
          
          {/* 1. Full Name */}
          <FormInput
            label="Full Name"
            required
            placeholder="e.g. Alex Johnson"
            value={fullName}
            onChangeText={(text) => {
              setFullName(text);
              if (errors.fullName) setErrors({ ...errors, fullName: '' });
            }}
            autoCapitalize="words"
            error={errors.fullName}
          />

          {/* 2. Email Address */}
          <FormInput
            label="Email Address"
            required
            placeholder="e.g. alex@example.com"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (errors.email) setErrors({ ...errors, email: '' });
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="email"
            error={errors.email}
          />

          {/* 3. Password Input */}
          <FormInput
            label="Account Password"
            required
            placeholder="Enter secure password (min 6 chars)"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (errors.password) setErrors({ ...errors, password: '' });
            }}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            autoCorrect={false}
            error={errors.password}
            rightElement={
              <Pressable
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}>
                <Text style={styles.eyeButtonText}>
                  {showPassword ? 'Hide' : 'Show'}
                </Text>
              </Pressable>
            }
          />

          {/* 4. Age Input */}
          <FormInput
            label="Age"
            required
            placeholder="e.g. 20"
            value={age}
            onChangeText={(text) => {
              const digitsOnly = text.replace(/[^0-9]/g, '');
              setAge(digitsOnly);
              if (errors.age) setErrors({ ...errors, age: '' });
            }}
            keyboardType="number-pad"
            maxLength={3}
            error={errors.age}
          />

          {/* 5. Phone Number Input */}
          <FormInput
            label="Phone Number"
            required
            placeholder="e.g. 0780000000"
            value={phoneNumber}
            onChangeText={(text) => {
              setPhoneNumber(text);
              if (errors.phoneNumber) setErrors({ ...errors, phoneNumber: '' });
            }}
            keyboardType="phone-pad"
            autoComplete="tel"
            error={errors.phoneNumber}
          />

          {/* 6. Gender Selection */}
          <View>
            <View style={styles.labelRow}>
              <Text style={styles.label}>Gender</Text>
              <Text style={styles.requiredStar}>* Required</Text>
            </View>
            <View style={styles.genderGrid}>
              {GENDER_OPTIONS.map((opt) => {
                const isSelected = gender === opt;
                return (
                  <Pressable
                    key={opt}
                    style={[styles.genderCard, isSelected && styles.genderCardSelected]}
                    onPress={() => setGender(opt)}>
                    <View
                      style={[
                        styles.radioIndicator,
                        isSelected && styles.radioIndicatorSelected,
                      ]}>
                      {isSelected && <View style={styles.radioDot} />}
                    </View>
                    <Text
                      style={[
                        styles.genderText,
                        isSelected && styles.genderTextSelected,
                      ]}>
                      {opt}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* 7. Date of Birth Picker */}
          <View>
            <View style={styles.labelRow}>
              <Text style={styles.label}>Date of Birth</Text>
              <Text style={styles.requiredStar}>* Required</Text>
            </View>
            <Pressable
              style={styles.datePickerTrigger}
              onPress={handleDatePickerPress}>
              <Text style={styles.datePickerValue}>
                📅  {formatDate(dateOfBirth)}
              </Text>
              <Text style={styles.datePickerAction}>Tap to change</Text>
            </Pressable>

            {showDatePicker && Platform.OS !== 'web' && (
              <DateTimePicker
                value={dateOfBirth}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                maximumDate={new Date()}
                onChange={handleDateChange}
              />
            )}
          </View>
        </FormSection>

        {/* SECTION 2: Academic Program & Profile */}
        <FormSection
          title="2. Academic & Skills Profile"
          description="Select your target course and current technical proficiencies.">
          
          {/* 8. Course Dropdown Control */}
          <View>
            <View style={styles.labelRow}>
              <Text style={styles.label}>Course of Interest</Text>
              <Text style={styles.requiredStar}>* Required</Text>
            </View>
            <Pressable
              style={styles.dropdownTrigger}
              onPress={() => setIsCourseModalOpen(true)}>
              <Text style={styles.dropdownValue}>{course}</Text>
              <Text style={styles.dropdownArrow}>▼</Text>
            </Pressable>

            {/* Modal for Course Selection */}
            <Modal
              visible={isCourseModalOpen}
              transparent={true}
              animationType="fade"
              onRequestClose={() => setIsCourseModalOpen(false)}>
              <Pressable
                style={styles.modalBackdrop}
                onPress={() => setIsCourseModalOpen(false)}>
                <View style={styles.modalCard}>
                  <Text style={styles.modalHeader}>Select Course of Interest</Text>
                  {COURSE_OPTIONS.map((item) => {
                    const isSelected = course === item;
                    return (
                      <Pressable
                        key={item}
                        style={[
                          styles.modalOption,
                          isSelected && styles.modalOptionSelected,
                        ]}
                        onPress={() => {
                          setCourse(item);
                          setIsCourseModalOpen(false);
                        }}>
                        <Text
                          style={[
                            styles.modalOptionText,
                            isSelected && styles.modalOptionTextSelected,
                          ]}>
                          {item}
                        </Text>
                        {isSelected && <Text style={styles.modalCheck}>✓</Text>}
                      </Pressable>
                    );
                  })}
                </View>
              </Pressable>
            </Modal>
          </View>

          {/* 9. Skills Multi-Select Checkboxes */}
          <View>
            <View style={styles.labelRow}>
              <Text style={styles.label}>Technical Skills</Text>
              <Text style={styles.requiredStar}>* Pick at least 1</Text>
            </View>
            <View style={styles.skillsGrid}>
              {AVAILABLE_SKILLS.map((skill) => {
                const isChecked = skills.includes(skill);
                return (
                  <Pressable
                    key={skill}
                    style={[styles.skillChip, isChecked && styles.skillChipActive]}
                    onPress={() => handleToggleSkill(skill)}>
                    <Checkbox
                      style={styles.chipCheckbox}
                      value={isChecked}
                      onValueChange={() => handleToggleSkill(skill)}
                      color={isChecked ? '#2563eb' : undefined}
                    />
                    <Text
                      style={[
                        styles.skillChipLabel,
                        isChecked && styles.skillChipLabelActive,
                      ]}>
                      {skill}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
            {errors.skills ? (
              <Text style={styles.errorText}>⚠️ {errors.skills}</Text>
            ) : null}
          </View>

          {/* 10. Biography Multiline Text Input */}
          <FormInput
            label="Student Biography"
            placeholder="Tell us about your background, projects, or learning goals..."
            value={biography}
            onChangeText={setBiography}
            multiline={true}
            numberOfLines={4}
            helperText="Optional. Max 300 characters."
            maxLength={300}
          />
        </FormSection>

        {/* SECTION 3: Preferences & Consents */}
        <FormSection
          title="3. Preferences & Consents"
          description="Communication preferences and regulatory compliance.">
          
          {/* 11. Receive Notifications Switch */}
          <View style={styles.preferenceRow}>
            <View style={{ flex: 1, paddingRight: 12 }}>
              <Text style={styles.preferenceTitle}>Receive Notifications</Text>
              <Text style={styles.preferenceDescription}>
                Receive SMS and email reminders for deadlines and campus announcements.
              </Text>
            </View>
            <Switch
              value={receiveNotifications}
              onValueChange={setReceiveNotifications}
              trackColor={{ false: '#cbd5e1', true: '#93c5fd' }}
              thumbColor={receiveNotifications ? '#2563eb' : '#f8fafc'}
            />
          </View>

          {/* 12. Terms & Conditions Checkbox */}
          <View style={styles.termsWrapper}>
            <Pressable
              style={styles.termsRow}
              onPress={() => {
                setAcceptedTerms(!acceptedTerms);
                if (errors.acceptedTerms) {
                  setErrors({ ...errors, acceptedTerms: '' });
                }
              }}>
              <Checkbox
                style={styles.termsCheckbox}
                value={acceptedTerms}
                onValueChange={(val) => {
                  setAcceptedTerms(val);
                  if (errors.acceptedTerms) {
                    setErrors({ ...errors, acceptedTerms: '' });
                  }
                }}
                color={acceptedTerms ? '#2563eb' : undefined}
              />
              <Text style={styles.termsLabel}>
                I accept the <Text style={styles.linkText}>Terms and Conditions</Text> and confirm that the submitted information is accurate.
              </Text>
            </Pressable>
            {errors.acceptedTerms ? (
              <Text style={styles.errorText}>⚠️ {errors.acceptedTerms}</Text>
            ) : null}
          </View>
        </FormSection>

        {/* SECTION 4: Action Buttons (Submit & Reset) */}
        <View style={styles.actionsContainer}>
          {/* 13. Submit Button */}
          <FormButton
            title="Submit Registration"
            variant="primary"
            onPress={handleSubmit}
          />

          {/* 14. Reset Button */}
          <FormButton
            title="Reset Form"
            variant="secondary"
            onPress={handleReset}
          />
        </View>

        {/* SUCCESS MODAL: Shows formatted JSON output on screen */}
        {submittedData ? (
          <Modal
            visible={Boolean(submittedData)}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setSubmittedData(null)}>
            <View style={styles.successBackdrop}>
              <View style={styles.successCard}>
                <View style={styles.successBadge}>
                  <Text style={styles.successIcon}>✓</Text>
                </View>
                <Text style={styles.successTitle}>Registration Successful!</Text>
                <Text style={styles.successSubtitle}>
                  The data below has been serialized to JSON and logged to the console via console.log().
                </Text>

                <ScrollView style={styles.jsonBox}>
                  <Text style={styles.jsonCode}>
                    {JSON.stringify(submittedData, null, 2)}
                  </Text>
                </ScrollView>

                <FormButton
                  title="Close & Continue"
                  variant="primary"
                  onPress={() => setSubmittedData(null)}
                />
              </View>
            </View>
          </Modal>
        ) : null}

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 60,
  },
  banner: {
    marginBottom: 20,
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  bannerBadge: {
    fontSize: 11,
    fontWeight: '800',
    color: '#38bdf8',
    letterSpacing: 1.2,
    marginBottom: 6,
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: -0.3,
  },
  bannerSubtitle: {
    fontSize: 13,
    color: '#94a3b8',
    marginTop: 6,
    lineHeight: 19,
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
  requiredStar: {
    fontSize: 11,
    fontWeight: '700',
    color: '#ef4444',
  },
  eyeButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  eyeButtonText: {
    fontSize: 13,
    color: '#2563eb',
    fontWeight: '600',
  },
  genderGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  genderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    flexBasis: '48%',
    flexGrow: 1,
  },
  genderCardSelected: {
    borderColor: '#2563eb',
    backgroundColor: '#eff6ff',
  },
  radioIndicator: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#94a3b8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioIndicatorSelected: {
    borderColor: '#2563eb',
  },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2563eb',
  },
  genderText: {
    fontSize: 13,
    color: '#334155',
  },
  genderTextSelected: {
    color: '#1d4ed8',
    fontWeight: '600',
  },
  datePickerTrigger: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderWidth: 1.2,
    borderColor: '#cbd5e1',
    borderRadius: 9,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  datePickerValue: {
    fontSize: 15,
    color: '#0f172a',
    fontWeight: '500',
  },
  datePickerAction: {
    fontSize: 13,
    color: '#2563eb',
    fontWeight: '600',
  },
  dropdownTrigger: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderWidth: 1.2,
    borderColor: '#cbd5e1',
    borderRadius: 9,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  dropdownValue: {
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
    backgroundColor: 'rgba(15, 23, 42, 0.55)',
    justifyContent: 'center',
    padding: 20,
  },
  modalCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 18,
    maxHeight: '80%',
  },
  modalHeader: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 14,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  modalOptionSelected: {
    backgroundColor: '#eff6ff',
  },
  modalOptionText: {
    fontSize: 14,
    color: '#334155',
  },
  modalOptionTextSelected: {
    color: '#2563eb',
    fontWeight: '600',
  },
  modalCheck: {
    fontSize: 16,
    color: '#2563eb',
    fontWeight: '700',
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#f1f5f9',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 20,
    paddingVertical: 7,
    paddingHorizontal: 12,
  },
  skillChipActive: {
    backgroundColor: '#eff6ff',
    borderColor: '#2563eb',
  },
  chipCheckbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
  },
  skillChipLabel: {
    fontSize: 13,
    color: '#475569',
  },
  skillChipLabelActive: {
    color: '#1d4ed8',
    fontWeight: '600',
  },
  preferenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  preferenceTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
  },
  preferenceDescription: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
    lineHeight: 16,
  },
  termsWrapper: {
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingTop: 12,
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  termsCheckbox: {
    borderRadius: 4,
    marginTop: 2,
  },
  termsLabel: {
    flex: 1,
    fontSize: 13,
    color: '#475569',
    lineHeight: 18,
  },
  linkText: {
    color: '#2563eb',
    fontWeight: '600',
  },
  actionsContainer: {
    gap: 12,
    marginTop: 8,
  },
  errorText: {
    fontSize: 12,
    color: '#dc2626',
    marginTop: 4,
    fontWeight: '500',
  },
  successBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    justifyContent: 'center',
    padding: 20,
  },
  successCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 22,
    maxHeight: '85%',
  },
  successBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#dcfce7',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 12,
  },
  successIcon: {
    fontSize: 24,
    color: '#16a34a',
    fontWeight: '800',
  },
  successTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0f172a',
    textAlign: 'center',
    marginBottom: 6,
  },
  successSubtitle: {
    fontSize: 13,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 16,
  },
  jsonBox: {
    backgroundColor: '#0f172a',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    maxHeight: 240,
  },
  jsonCode: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    color: '#38bdf8',
    fontSize: 12,
    lineHeight: 18,
  },
});
