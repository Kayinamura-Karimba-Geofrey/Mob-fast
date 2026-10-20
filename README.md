# Student Registration Form - React Native & Expo

An interactive, responsive mobile and web form application built with **React Native**, **Expo**, and **TypeScript**. This project demonstrates comprehensive form handling, various text input types, selectable controls, modular component architecture, real-time input validation, and serialized JSON output.

---

## 📋 Features

### Form Fields (14 Components):
1. **Full Name** — Single-line text input with word capitalization (`autoCapitalize="words"`).
2. **Email Address** — Email input with `@` keyboard optimization and regex validation.
3. **Password** — Secure masked input (`secureTextEntry`) with an interactive Show/Hide toggle.
4. **Age** — Numeric keypad input (`keyboardType="number-pad"`) with digit sanitization.
5. **Phone Number** — Telephone dial-pad input (`keyboardType="phone-pad"`).
6. **Gender** — Single-choice selection with custom radio button indicators.
7. **Date of Birth** — Native modal calendar picker (`@react-native-community/datetimepicker`).
8. **Course of Interest** — Modal-based dropdown selector.
9. **Technical Skills** — Multi-select checkbox badges (`expo-checkbox`).
10. **Student Biography** — Multiline text area (`multiline={true}`, `numberOfLines={4}`).
11. **Receive Notifications** — Smooth binary toggle (`<Switch>`).
12. **Terms and Conditions** — Mandatory agreement checkbox.
13. **Submit Button** — Validates form data, generates JSON payload, prints to console, and shows modal summary.
14. **Reset Button** — Clears all inputs and restores initial state.

---

## 📁 Project Structure

```text
mob-fast/
├── assets/                          # Static assets and icons
├── src/
│   ├── app/
│   │   ├── _layout.tsx              # Expo Router root layout and theme provider
│   │   ├── index.tsx                # Main screen with task navigation switcher
│   │   └── explore.tsx              # Secondary tab screen
│   ├── components/
│   │   ├── FormButton.tsx           # Reusable styled button with variants
│   │   ├── FormInput.tsx            # Reusable text input with labels & error display
│   │   ├── FormSection.tsx          # Card container grouping related fields
│   │   ├── FormElementsExplorer.tsx # Interactive showcase of selectable controls (Task 3)
│   │   ├── TextInputExplorer.tsx    # Interactive showcase of all text input types (Task 2)
│   │   └── StudentRegistrationForm.tsx # Complete 14-element registration form (Task 4)
│   ├── constants/                   # Colors and theme spacing constants
│   └── hooks/                       # Custom hooks
├── app.json                         # Expo app configuration
├── package.json                     # Dependencies and scripts
└── tsconfig.json                    # TypeScript configuration
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18.x, v20.x, or v24.x)
- **npm** (v10+ or v11+)
- **Expo Go** app installed on your physical mobile device (Android or iOS) OR a web browser

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npx expo start
```

### 3. Run on Your Target Platform
- **Physical Device (Expo Go):** Scan the QR code displayed in your terminal using the Expo Go app (on Android) or Camera app (on iOS).
- **Web Browser:** Press <kbd>w</kbd> in the terminal or run `npm run web`.
- **Android Emulator:** Press <kbd>a</kbd> in the terminal (requires Android Studio).

---

## 📤 Expected JSON Console Output

Upon successful submission, the form serializes all inputs and outputs formatted JSON to the terminal/browser console using `JSON.stringify(formData, null, 2)`:

```json
{
  "fullName": "Alex Johnson",
  "email": "alex@example.com",
  "password": "SecretPassword123",
  "age": 20,
  "phoneNumber": "0780000000",
  "gender": "Male",
  "dateOfBirth": "2003-01-01",
  "course": "Software Engineering",
  "skills": [
    "JavaScript",
    "TypeScript",
    "React Native"
  ],
  "biography": "Aspiring mobile engineer passionate about cross-platform development.",
  "receiveNotifications": true,
  "acceptedTerms": true,
  "submittedAt": "2026-10-20T13:15:00.000Z"
}
```

---

## 🧪 Form Validation Rules

| Field | Rule | Error Message |
| :--- | :--- | :--- |
| **Full Name** | Required, minimum 3 characters | `Name must be at least 3 characters.` |
| **Email** | Required, valid RFC regex pattern | `Please enter a valid email (e.g. name@domain.com).` |
| **Password** | Required, minimum 6 characters | `Password must be at least 6 characters long.` |
| **Age** | Required integer between 16 and 100 | `Age must be a valid number between 16 and 100.` |
| **Phone Number** | Required, minimum 7 digits | `Phone number must be at least 7 digits.` |
| **Skills** | At least 1 skill must be selected | `Please select at least one skill.` |
| **Terms & Conditions** | Must be checked (`true`) | `You must accept the terms and conditions to register.` |

---

## 🛠️ Common Errors & Troubleshooting

1. **Network Timeout / Expo Go Won't Connect:**
   - *Fix:* Ensure phone and PC are on the same Wi-Fi. If using public or university Wi-Fi, run:
     ```bash
     npx expo start --tunnel
     ```

2. **Metro Cache Issues:**
   - *Fix:* Clear the Metro bundler cache by starting with `-c`:
     ```bash
     npx expo start -c
     ```

3. **Android Multiline Input Text Centered:**
   - *Fix:* In React Native, always set `textAlignVertical: 'top'` on multiline inputs to ensure text starts at the top-left on Android.

---

## 📚 Key React Native Concepts Demonstrated
- **Controlled Components:** Managing text and selection state synchronously with React's `useState`.
- **Keyboard Optimization:** Utilizing `keyboardType`, `returnKeyType`, and `KeyboardAvoidingView`.
- **Custom Design System:** Reusable components (`FormInput`, `FormButton`, `FormSection`) styled with `StyleSheet.create`.
- **Community Packages:** Seamless integration of `expo-checkbox` and `@react-native-community/datetimepicker`.
