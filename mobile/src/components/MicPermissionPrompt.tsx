import { Image, StyleSheet, Text, View } from 'react-native';

import { calibrationImages } from '../assets/images';
import { colors, radii, spacing, typography } from '../theme/tokens';
import { Button } from './Button';

type Props = {
  onRequestPermission: () => void;
  buttonLabel?: string;
};

/** Shown wherever `useVoiceRecorder`/`useConversationSocket`'s mic access was denied. */
export function MicPermissionPrompt({ onRequestPermission, buttonLabel = 'İzin Ver' }: Props) {
  return (
    <View style={styles.container}>
      <Image source={calibrationImages.micPermission} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>Mikrofon izni gerekiyor</Text>
      <Text style={styles.body}>Konuşma pratiği yapabilmen için mikrofona erişim izni vermen gerekiyor.</Text>
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
