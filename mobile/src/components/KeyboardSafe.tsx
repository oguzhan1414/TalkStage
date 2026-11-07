import type { ReactNode } from 'react';
import { KeyboardAvoidingView, type StyleProp, type ViewStyle } from 'react-native';

/**
 * Keeps inputs and the buttons under them above the on-screen keyboard.
 * On Android the app draws edge to edge (Expo SDK 57), so the window no longer shrinks when the keyboard opens:
 * the padding has to be added here on both platforms, not only on iOS.
 */
export function KeyboardSafe({ children, style, offset = 0 }: { children: ReactNode; style?: StyleProp<ViewStyle>; offset?: number }) {
  return (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={offset} style={style}>
      {children}
    </KeyboardAvoidingView>
  );
}
