import { useFocusEffect } from '@react-navigation/native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Image, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { mivoWaveImage } from '../../assets/images';
import { mivoVideos } from '../../assets/videos';
import { Button } from '../../components/Button';
import { LanguagePickerModal } from '../../components/LanguagePickerModal';
import { colors, fonts, radii, spacing } from '../../theme/tokens';
import type { OnboardingStackScreenProps } from '../../navigation/types';
import { useTrackScreenView } from '../../lib/analytics';
import { getLocale, LOCALE_META, t } from '../../i18n';

/** The waving-Mivo clip is 9:16 on a perfectly flat background of this colour, so the screen simply uses the
 * same colour: the video then melts into the page and works on any phone shape. */
const VIDEO_BG = '#D9E2F9';
const VIDEO_ASPECT = 9 / 16;
/** Where Mivo actually stands inside the clip (fraction of its height), used to keep him between the title and the button. */
const MIVO_TOP = 0.22;
const MIVO_BOTTOM = 0.88;
const FOOTER_H = 96;

/** First screen: brand on top, Mivo introduces itself and waves (video loop; static image until the first frame). */
export function WelcomeScreen({ navigation }: OnboardingStackScreenProps<'Welcome'>) {
  useTrackScreenView('onboarding_step_viewed', { step: 'welcome' });
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [headerBottom, setHeaderBottom] = useState(210);
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const player = useVideoPlayer(mivoVideos.wave, (p) => {
    p.loop = true;
    p.muted = true;
    p.play();
  });

  // Only play while the screen is visible (it stays mounted underneath the next steps).
  useFocusEffect(
    useCallback(() => {
      try {
        player.play();
      } catch {
        setVideoFailed(true);
      }
      return () => {
        try {
          player.pause();
        } catch {
          // player already released
        }
      };
    }, [player])
  );

  // Fade the video in once its first frame is on screen (the static Mivo is shown until then, or forever on error).
  const videoOpacity = useRef(new Animated.Value(0)).current;
  const showVideo = () => Animated.timing(videoOpacity, { toValue: 1, duration: 250, useNativeDriver: true }).start();
  useEffect(() => {
    const sub = player.addListener('statusChange', ({ status }) => {
      if (status === 'error') setVideoFailed(true);
    });
    return () => sub.remove();
  }, [player]);

  // Size/position the clip so Mivo (22%–88% of its height) fits between the header and the footer.
  const footerTop = height - FOOTER_H - insets.bottom;
  const room = Math.max(120, footerTop - headerBottom - 8);
  const videoH = Math.min((width / VIDEO_ASPECT) * 1, room / (MIVO_BOTTOM - MIVO_TOP));
  const videoW = videoH * VIDEO_ASPECT;
  const mivoH = videoH * (MIVO_BOTTOM - MIVO_TOP);
  const videoTop = headerBottom + (room - mivoH) / 2 - MIVO_TOP * videoH;

  return (
    <View style={styles.container}>
      {/* Mivo: video loop on top of the static fallback */}
      <View pointerEvents="none" style={[styles.stage, { width: videoW, height: videoH, top: videoTop, left: (width - videoW) / 2 }]}>
        <Image
          source={mivoWaveImage}
          style={{ position: 'absolute', alignSelf: 'center', top: MIVO_TOP * videoH, height: mivoH, width: mivoH * (750 / 900) }}
          resizeMode="contain"
        />
        {!videoFailed ? (
          <Animated.View style={[StyleSheet.absoluteFill, { opacity: videoOpacity }]}>
            <VideoView
              player={player}
              style={StyleSheet.absoluteFill}
              contentFit="contain"
              nativeControls={false}
              onFirstFrameRender={showVideo}
            />
          </Animated.View>
        ) : null}
      </View>

      <View
        style={[styles.header, { paddingTop: insets.top + spacing.sm }]}
        onLayout={(e) => setHeaderBottom(e.nativeEvent.layout.y + e.nativeEvent.layout.height)}
      >
        <Pressable
          onPress={() => setLanguageModalVisible(true)}
          style={styles.languageChip}
          accessibilityRole="button"
          accessibilityLabel={t("Dil Seç")}
        >
          <Text style={styles.languageChipText}>
            {LOCALE_META[getLocale()].flag} {LOCALE_META[getLocale()].nativeName}
          </Text>
        </Pressable>
        <LanguagePickerModal visible={languageModalVisible} onClose={() => setLanguageModalVisible(false)} />

        <Text style={styles.brand}>Spekvia</Text>
        <Text style={styles.hello}>{t("Selam, ben Mivo! 👋")}</Text>
        <Text style={styles.subtitle}>{t("İngilizce konuşmanı birlikte geliştireceğiz.")}</Text>
      </View>

      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, spacing.md) }]}>
        <Button label={t("Başlayalım ➔")} variant="chunky" onPress={() => navigation.navigate('Name')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: VIDEO_BG },
  stage: { position: 'absolute' },
  header: { paddingHorizontal: spacing.lg, alignItems: 'center', paddingBottom: spacing.sm },
  languageChip: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radii.pill,
  },
  languageChipText: { fontFamily: fonts.headingSemiBold, fontSize: 12, color: colors.textHeading },
  brand: { fontFamily: fonts.headingBold, fontSize: 42, letterSpacing: -1, color: colors.brand, marginTop: spacing.sm },
  hello: { fontFamily: fonts.headingBold, fontSize: 25, color: colors.textHeading, marginTop: 4, textAlign: 'center' },
  subtitle: {
    fontFamily: fonts.bodyMedium,
    fontSize: 15,
    lineHeight: 21,
    color: colors.textBody,
    textAlign: 'center',
    marginTop: 6,
    maxWidth: 300,
  },
  footer: { position: 'absolute', left: 0, right: 0, bottom: 0, paddingHorizontal: spacing.lg, paddingTop: spacing.sm },
});
