/**
 * react-native-keyboard-controller, loaded defensively: it moves content in step with the keyboard (no jump on
 * Android, where React Native only hears about the keyboard once it is fully open). If the native module is missing
 * in the running binary, `kc` is null and callers fall back to React Native's own KeyboardAvoidingView.
 */
type KC = typeof import('react-native-keyboard-controller');

let mod: KC | null = null;
try {
  mod = require('react-native-keyboard-controller') as KC;
} catch {
  mod = null;
}

export const kc = mod;
