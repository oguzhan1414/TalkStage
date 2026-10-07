import { Image, Linking, StyleSheet, Text, View } from 'react-native';

import { calibrationImages } from '../assets/images';
import { colors, radii, spacing, typography } from '../theme/tokens';
import { Button } from './Button';
import { t } from '../i18n';

type Props = {
  onRequestPermission?: () => void;
  buttonLabel?: string;
};

/** Shown wherever `useVoiceRecorder`/`useConversationSocket`'s mic access was denied. */
export function MicPermissionPrompt({
  onRequestPermission = () => {
    void Linking.openSettings();
  },
  buttonLabel = 'Ayarlara Git',
}: Props) {
  return (
    <View style={styles.container}>
      <Image source={calibrationImages.micPermission} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>{t("Mikrofon izni gerekiyor")}</Text>
      <Text style={styles.body}>{t("Konuşma pratiği yapabilmen için mikrofon iznini cihaz ayarlarından açmalısın.")}</Text>
      <Button label={buttonLabel} onPress={onRequestPermission} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: radii.lg,
    padding: spacing.lg,
  },
  image: {
    width: 100,
    height: 100,
  },
  title: {
    ...typography.h3,
  },
  body: {
    ...typography.body,
    textAlign: 'center',
  },
});
