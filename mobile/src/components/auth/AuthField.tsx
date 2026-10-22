import Ionicons from '@expo/vector-icons/Ionicons';
import { useState, type ComponentProps } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { colors, fonts } from '../../theme/tokens';

type Props = {
  icon: ComponentProps<typeof Ionicons>['name'];
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  /** Password field: adds the show/hide eye. */
  secure?: boolean;
  autoComplete?: ComponentProps<typeof TextInput>['autoComplete'];
  keyboardType?: ComponentProps<typeof TextInput>['keyboardType'];
  returnKeyType?: ComponentProps<typeof TextInput>['returnKeyType'];
  onSubmitEditing?: () => void;
  accessibilityLabel?: string;
};

/** One input of the sign-in / sign-up forms: icon, roomy 52 px field, brand-coloured border while focused. */
export function AuthField({ icon, value, onChangeText, placeholder, secure, autoComplete, keyboardType, returnKeyType, onSubmitEditing, accessibilityLabel }: Props) {
  const [focused, setFocused] = useState(false);
  const [shown, setShown] = useState(false);
  return (
    <View style={[styles.wrap, focused && styles.wrapFocused]}>
      <Ionicons name={icon} size={20} color={focused ? colors.brand : '#64748B'} style={styles.icon} />
      <TextInput
        style={[styles.input, secure && { paddingRight: 44 }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#94A3B8"
        secureTextEntry={secure && !shown}
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete={autoComplete}
        keyboardType={keyboardType}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        accessibilityLabel={accessibilityLabel ?? placeholder}
        maxFontSizeMultiplier={1.2}
      />
      {secure ? (
        <Pressable onPress={() => setShown((v) => !v)} hitSlop={10} style={styles.eye} accessibilityRole="button">
          <Ionicons name={shown ? 'eye-off-outline' : 'eye-outline'} size={20} color="#64748B" />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 26,
    paddingHorizontal: 18,
    height: 52,
  },
  wrapFocused: { borderColor: colors.brand, backgroundColor: '#FFFFFF' },
  icon: { marginRight: 10 },
  input: { flex: 1, height: '100%', fontFamily: fonts.bodyMedium, fontSize: 15, color: '#0F172A' },
  eye: { position: 'absolute', right: 18, height: '100%', justifyContent: 'center' },
});
