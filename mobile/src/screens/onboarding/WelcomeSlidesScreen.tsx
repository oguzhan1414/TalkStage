import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { Button } from '../../components/Button';
import { colors, spacing, typography } from '../../theme/tokens';
import type { OnboardingStackScreenProps } from '../../navigation/types';

const SLIDES = [
  {
    emoji: '🎭',
    title: 'Konuşamadığın İngilizce geride kaldı.',
    subtitle: 'Sahneye çık.',
  },
  {
    emoji: '🗣️',
    title: 'Gramer ezberlemeyi bırak.',
    subtitle: 'Gerçek sahnede, gerçek karşılıklarla konuş.',
  },
  {
    emoji: '⚡',
    title: 'Hatanı anında gör.',
    subtitle: 'Türkçe anlık geri bildirimle özgüven kazan.',
  },
];

export function WelcomeSlidesScreen({ navigation }: OnboardingStackScreenProps<'Welcome'>) {
  const [index, setIndex] = useState(0);
  const isLast = index === SLIDES.length - 1;
  const slide = SLIDES[index];

  const handleNext = () => {
    if (isLast) {
      navigation.navigate('Interests');
    } else {
      setIndex((i) => i + 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.skipRow}>
        <Button label="Atla" variant="ghost" onPress={() => navigation.navigate('Interests')} />
      </View>

      <View style={styles.content}>
        <Text style={styles.emoji}>{slide.emoji}</Text>
        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.subtitle}>{slide.subtitle}</Text>
      </View>

      <View style={styles.dots}>
        {SLIDES.map((s, i) => (
          <View key={s.title} style={[styles.dot, i === index && styles.dotActive]} />
        ))}
      </View>

      <Button label={isLast ? 'Başlayalım' : 'İleri'} onPress={handleNext} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
    justifyContent: 'space-between',
  },
  skipRow: {
    alignItems: 'flex-end',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  emoji: {
    fontSize: 64,
    marginBottom: spacing.md,
  },
  title: {
    ...typography.h1,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.body,
    textAlign: 'center',
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.xs,
    marginBottom: spacing.lg,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
  },
  dotActive: {
    backgroundColor: colors.brand,
    width: 20,
  },
});
