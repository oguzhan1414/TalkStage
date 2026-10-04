import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BouncyPressable } from '../components/BouncyPressable';
import { colors, fonts, radii, spacing } from '../theme/tokens';

type Props = {
  retrying: boolean;
  onRetry: () => void;
};

export function ProfileLoadErrorScreen({ retrying, onRetry }: Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Ionicons name="cloud-offline-outline" size={38} color={colors.brand} />
        </View>
        <Text style={styles.title}>Profilin yüklenemedi</Text>
        <Text style={styles.description}>
          Bağlantını kontrol edip tekrar dene. Öğrenme ilerlemen güvende.
        </Text>
        <BouncyPressable
          onPress={onRetry}
          disabled={retrying}
          style={styles.button}
          hapticType="medium"
          scaleTo={0.97}
          accessibilityRole="button"
          accessibilityLabel="Profili yeniden yükle"
        >
          {retrying ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <>
              <Ionicons name="refresh" size={18} color="#FFFFFF" />
              <Text style={styles.buttonText}>Tekrar Dene</Text>
            </>
          )}
        </BouncyPressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEF2FF',
    marginBottom: spacing.lg,
  },
  title: {
    fontFamily: fonts.headingBold,
    fontSize: 24,
    color: colors.textHeading,
    textAlign: 'center',
  },
  description: {
    fontFamily: fonts.bodyRegular,
    fontSize: 15,
    lineHeight: 23,
    color: colors.textBody,
    textAlign: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  button: {
    minWidth: 180,
    height: 50,
    borderRadius: radii.md,
    backgroundColor: colors.brand,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  buttonText: {
    fontFamily: fonts.headingBold,
    fontSize: 15,
    color: '#FFFFFF',
  },
});
