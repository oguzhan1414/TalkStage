import { forwardRef, type ReactNode } from 'react';
import { KeyboardAvoidingView, ScrollView, type ScrollViewProps, type StyleProp, type ViewStyle } from 'react-native';

import { kc } from '../lib/keyboard';

/**
 * Keeps inputs and the buttons under them above the on-screen keyboard, moving in step with it.
 * Android draws edge to edge (Expo SDK 57), so the window no longer shrinks for the keyboard: the room has to be
 * made here on both platforms. keyboard-controller animates it frame by frame; React Native's own view (the
 * fallback) only learns about the keyboard once it is fully open on Android, so content would jump.
 */
export function KeyboardSafe({ children, style, offset = 0 }: { children: ReactNode; style?: StyleProp<ViewStyle>; offset?: number }) {
  if (kc) {
    return (
      <kc.KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={offset} style={style}>
        {children}
      </kc.KeyboardAvoidingView>
    );
  }
  return (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={offset} style={style}>
      {children}
    </KeyboardAvoidingView>
  );
}

/**
 * A ScrollView that, when a text field inside it is focused, glides it (and `bottomOffset` px below it, e.g. the
 * check button) above the keyboard. Falls back to a plain ScrollView inside KeyboardSafe.
 */
export const KeyboardScroll = forwardRef<ScrollView, ScrollViewProps & { bottomOffset?: number }>(function KeyboardScroll(
  { bottomOffset = 24, style, ...props },
  ref
) {
  if (kc) {
    return <kc.KeyboardAwareScrollView ref={ref as never} bottomOffset={bottomOffset} style={style} {...props} />;
  }
  return (
    <KeyboardSafe style={style}>
      <ScrollView ref={ref} style={{ flex: 1 }} {...props} />
    </KeyboardSafe>
  );
});
