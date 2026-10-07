import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef } from 'react';
import { Alert } from 'react-native';

import { t } from '../i18n';

type ConfirmCopy = { title: string; message: string; confirmLabel: string };

/** Native "are you sure?" dialog used by the voice rooms. */
export function confirmLeave(copy: ConfirmCopy, onConfirm: () => void) {
  Alert.alert(copy.title, copy.message, [
    { text: t("Devam et"), style: 'cancel' },
    { text: copy.confirmLabel, style: 'destructive', onPress: onConfirm },
  ]);
}

/**
 * Intercepts every way of leaving a screen that isn't the screen's own exit flow
 * (Android back button, iOS swipe-back, header back) and asks first.
 * `shouldBlock` decides whether there is anything to lose; `onBlocked` is what to run
 * when the user confirms (it must perform the real exit itself — e.g. end the session
 * and navigate — and mark the exit as in progress so this listener lets it through).
 */
export function useConfirmBack(shouldBlock: () => boolean, onBlocked: () => void, copy: ConfirmCopy) {
  const navigation = useNavigation();
  const latest = useRef({ shouldBlock, onBlocked, copy });
  latest.current = { shouldBlock, onBlocked, copy };

  useEffect(() => {
    return navigation.addListener('beforeRemove', (event) => {
      if (!latest.current.shouldBlock()) return;
      event.preventDefault();
      confirmLeave(latest.current.copy, latest.current.onBlocked);
    });
  }, [navigation]);
}
