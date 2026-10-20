import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function TextInputExplorer() {
  // State variables for each specific input type
  const [standardText, setStandardText] = useState('');
  const [emailText, setEmailText] = useState('');
  const [passwordText, setPasswordText] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [ageText, setAgeText] = useState('');
  const [decimalText, setDecimalText] = useState('');
  const [phoneText, setPhoneText] = useState('');
  const [searchText, setSearchText] = useState('');
  const [urlText, setUrlText] = useState('');
  const [multilineText, setMultilineText] = useState('');

  // Handler for numeric-only input to filter non-digit characters
  const handleAgeChange = (input: string) => {
    // Only allow whole positive numbers (0-9)
    const sanitized = input.replace(/[^0-9]/g, '');
    setAgeText(sanitized);
  };

  // Handler for decimal input (allowing numbers and a single decimal point)
  const handleDecimalChange = (input: string) => {
    const sanitized = input.replace(/[^0-9.]/g, '');
    // Ensure only one decimal dot
    const parts = sanitized.split('.');
    if (parts.length > 2) {
      setDecimalText(parts[0] + '.' + parts.slice(1).join(''));
    } else {
      setDecimalText(sanitized);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.keyboardContainer}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled">
        
        {/* Screen Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>React Native Text Inputs</Text>
          <Text style={styles.headerSubtitle}>
            Interactive demonstration of all standard text input types, keyboard configurations, and state handling.
          </Text>
        </View>

        {/* 1. Standard Single-Line Text Input */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>1. Standard Text Input</Text>
          <Text style={styles.cardDescription}>
            Used for general text like full names, usernames, and addresses. Default keyboard layout.
          </Text>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Alex Johnson"
            placeholderTextColor="#94a3b8"
            value={standardText}
            onChangeText={setStandardText}
            autoCapitalize="words"
            autoCorrect={false}
            returnKeyType="next"
          />
          <Text style={styles.liveValue}>State value: &quot;{standardText}&quot;</Text>
        </View>

        {/* 2. Email Input */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>2. Email Input</Text>
          <Text style={styles.cardDescription}>
            Displays the &apos;@&apos; and domain shortcuts on the mobile keyboard. Disables auto-capitalization.
          </Text>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. student@university.edu"
            placeholderTextColor="#94a3b8"
            value={emailText}
            onChangeText={setEmailText}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="email"
            textContentType="emailAddress"
            returnKeyType="next"
          />
          <Text style={styles.liveValue}>State value: &quot;{emailText}&quot;</Text>
        </View>

        {/* 3. Password Input */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>3. Password / Secure Text Input</Text>
          <Text style={styles.cardDescription}>
            Masks characters with dots/bullets using &apos;secureTextEntry&apos;. Includes a show/hide toggle.
          </Text>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordWrapper}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Enter secure password"
              placeholderTextColor="#94a3b8"
              value={passwordText}
              onChangeText={setPasswordText}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="password"
            />
            <Pressable
              onPress={() => setShowPassword(!showPassword)}
              style={styles.toggleButton}>
              <Text style={styles.toggleButtonText}>
                {showPassword ? 'Hide' : 'Show'}
              </Text>
            </Pressable>
          </View>
          <Text style={styles.liveValue}>
            State length: {passwordText.length} characters (Protected)
          </Text>
        </View>

        {/* 4. Numeric Input (Integers) */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>4. Numeric Input (Integers)</Text>
          <Text style={styles.cardDescription}>
            Brings up the number pad. Sanitizes input with regex to ensure only digits are stored.
          </Text>
          <Text style={styles.label}>Age</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 21"
            placeholderTextColor="#94a3b8"
            value={ageText}
            onChangeText={handleAgeChange}
            keyboardType="number-pad"
            maxLength={3}
          />
          <Text style={styles.liveValue}>State value: &quot;{ageText}&quot;</Text>
        </View>

        {/* 5. Decimal / Currency Input */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>5. Decimal / Numeric Pad</Text>
          <Text style={styles.cardDescription}>
            Brings up a keypad with digits and a decimal point. Ideal for prices, GPA, and weights.
          </Text>
          <Text style={styles.label}>Grade Point Average (GPA) / Fee</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 3.85"
            placeholderTextColor="#94a3b8"
            value={decimalText}
            onChangeText={handleDecimalChange}
            keyboardType="decimal-pad"
            maxLength={5}
          />
          <Text style={styles.liveValue}>State value: &quot;{decimalText}&quot;</Text>
        </View>

        {/* 6. Phone Number Input */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>6. Phone Number Input</Text>
          <Text style={styles.cardDescription}>
            Shows a dial-pad keyboard layout with numbers and symbol keys (+, #, *).
          </Text>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. +1 555-019-2834"
            placeholderTextColor="#94a3b8"
            value={phoneText}
            onChangeText={setPhoneText}
            keyboardType="phone-pad"
            autoComplete="tel"
            textContentType="telephoneNumber"
          />
          <Text style={styles.liveValue}>State value: &quot;{phoneText}&quot;</Text>
        </View>

        {/* 7. Search Input */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>7. Search Input</Text>
          <Text style={styles.cardDescription}>
            Configures the keyboard action button to display a &apos;Search&apos; magnifying glass icon.
          </Text>
          <Text style={styles.label}>Search Query</Text>
          <TextInput
            style={styles.input}
            placeholder="Search courses, professors..."
            placeholderTextColor="#94a3b8"
            value={searchText}
            onChangeText={setSearchText}
            returnKeyType="search"
            clearButtonMode="while-editing"
            onSubmitEditing={() => alert(`Searching for: ${searchText}`)}
          />
          <Text style={styles.liveValue}>State value: &quot;{searchText}&quot;</Text>
        </View>

        {/* 8. URL / Web Address Input */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>8. URL / Web Address Input</Text>
          <Text style={styles.cardDescription}>
            Brings up a keyboard with &apos;.&apos;, &apos;/&apos;, and &apos;.com&apos; keys for typing web addresses.
          </Text>
          <Text style={styles.label}>Portfolio or LinkedIn URL</Text>
          <TextInput
            style={styles.input}
            placeholder="https://github.com/username"
            placeholderTextColor="#94a3b8"
            value={urlText}
            onChangeText={setUrlText}
            keyboardType="url"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Text style={styles.liveValue}>State value: &quot;{urlText}&quot;</Text>
        </View>

        {/* 9. Multiline Text Input (Text Area) */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>9. Multiline Text Input (Textarea)</Text>
          <Text style={styles.cardDescription}>
            Allows multiple lines of text with vertical scrolling. &apos;textAlignVertical: top&apos; is required for Android.
          </Text>
          <Text style={styles.label}>Student Biography / Statement</Text>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            placeholder="Write a brief introduction about your academic goals..."
            placeholderTextColor="#94a3b8"
            value={multilineText}
            onChangeText={setMultilineText}
            multiline={true}
            numberOfLines={4}
            textAlignVertical="top"
          />
          <Text style={styles.liveValue}>
            Characters entered: {multilineText.length}
          </Text>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 60,
  },
  headerContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
    textAlign: 'center',
    marginBottom: 6,
  },
  headerSubtitle: {
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
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 13,
    color: '#64748b',
    marginBottom: 12,
    lineHeight: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: '#0f172a',
  },
  multilineInput: {
    height: 100,
    paddingTop: 10,
  },
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: '#0f172a',
  },
  toggleButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  toggleButtonText: {
    color: '#2563eb',
    fontSize: 14,
    fontWeight: '600',
  },
  liveValue: {
    marginTop: 8,
    fontSize: 12,
    color: '#059669',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
});
