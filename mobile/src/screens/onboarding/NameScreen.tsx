import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';

import { yankiMagicImage } from '../../assets/images';
import { Button } from '../../components/Button';
import { OnboardingProgressHeader } from '../../components/OnboardingProgressHeader';
import { useOnboarding } from '../../context/OnboardingContext';
import { colors, fonts, radii, spacing } from '../../theme/tokens';
import type { OnboardingStackScreenProps } from '../../navigation/types';
import { useTrackScreenView } from '../../lib/analytics';

export function NameScreen({ navigation }: OnboardingStackScreenProps<'Name'>) {
  useTrackScreenView('onboarding_step_viewed', { step: 'name' });
  const { draft, updateDraft } = useOnboarding();
  const trimmedName = draft.displayName.trim();

  return (
    <SafeAreaView style={styles.container}>
      <OnboardingProgressHeader step={1} onBack={() => navigation.goBack()} />

      <View style={styles.content}>
        {/* Yankı Friendly Speech Box - Crisp White Card with Soft Indigo Accent */}
        <View style={styles.speechBox}>
          <Image source={yankiMagicImage} style={styles.speechAvatar} resizeMode="contain" />
          <View style={styles.speechTextCol}>
            <Text style={styles.speechLabel}>Yankı • Kişisel Konuşma Koçun</Text>
            <Text style={styles.speechText}>
              &ldquo;Selam! Ben Yankı. Birlikte hiç çekinmeden, en baştan başlayarak konuşacağız. Sana
              nasıl hitap edeyim?&rdquo;
            </Text>
          </View>
        </View>

        {/* Input Card */}
        <View style={styles.inputCard}>
          <Text style={styles.label}>Adın veya Sana Hitap Şeklimiz</Text>
          <TextInput
            value={draft.displayName}
            onChangeText={(text) => updateDraft({ displayName: text })}
            placeholder="Örn: Ahmet, Zeynep, Can..."
            placeholderTextColor={colors.textMuted}
            style={styles.input}
            autoFocus
            maxLength={40}
          />
          <Text style={styles.hint}>
            Yapay zeka sesli sohbetlerde sana bu isimle samimi bir şekilde hitap edecek.
          </Text>
        </View>

        {trimmedName ? (
          <View style={styles.successBox}>
            <Text style={styles.successEmoji}>🎉</Text>
            <Text style={styles.successText}>
              Harika, {trimmedName}! Şimdi sana en uygun pratik ortamını seçelim.
            </Text>
          </View>
        ) : null}
      </View>

      <View style={styles.footer}>
        <Button
          label="Devam Et ➔"
          onPress={() => navigation.navigate('Persona')}
          disabled={!trimmedName}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary, // #F8FAFC (Porcelain Base)
  },
  content: {
    flex: 1,
    padding: spacing.lg,
    gap: spacing.md,
  },
  speechBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E0E7FF', // Soft Royal Indigo border
    borderRadius: radii.xl,
    padding: spacing.md,
    shadowColor: colors.brand,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 14,
    elevation: 2,
  },
  speechAvatar: {
    width: 48,
    height: 48,
  },
  speechTextCol: {
    flex: 1,
  },
  speechLabel: {
    fontFamily: fonts.headingBold,
    fontSize: 10.5,
    color: colors.brand,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  speechText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12.5,
    color: colors.textHeading,
    marginTop: 3,
    lineHeight: 18,
  },
  inputCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1,
  },
  label: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 11.5,
    color: colors.textHeading,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
    marginBottom: spacing.xs,
  },
  input: {
    borderWidth: 2,
    borderColor: colors.brand,
    borderRadius: radii.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    fontFamily: fonts.headingBold,
    fontSize: 16,
    color: colors.textHeading,
    backgroundColor: '#F8FAFC',
  },
  hint: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11.5,
    color: colors.textMuted,
    marginTop: spacing.xs + 2,
    lineHeight: 16,
  },
  successBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
    borderRadius: radii.lg,
    padding: spacing.md,
  },
  successEmoji: {
    fontSize: 18,
  },
  successText: {
    flex: 1,
    fontFamily: fonts.headingSemiBold,
    fontSize: 12.5,
    color: colors.success,
    lineHeight: 17,
  },
  footer: {
    padding: spacing.lg,
    paddingTop: spacing.sm,
  },
});
