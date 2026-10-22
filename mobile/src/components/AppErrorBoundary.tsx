import * as Sentry from '@sentry/react-native';
import { reloadAppAsync } from 'expo';
import { Component, type ErrorInfo, type ReactNode } from 'react';
import { DevSettings, Image, StyleSheet, Text, View } from 'react-native';

import { mivoVoiceImages } from '../assets/images';
import { t } from '../i18n';
import { colors, fonts, spacing } from '../theme/tokens';
import { Button } from './Button';

type State = { failed: boolean };

/**
 * Last safety net: when a screen throws while rendering, the app shows Mivo and a "restart" button instead of a white
 * screen or a closed app, and the error goes to Sentry with the component stack.
 */
export class AppErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    Sentry.captureException(error, { extra: { componentStack: info.componentStack } });
  }

  private restart = async () => {
    try {
      await reloadAppAsync();
    } catch {
      try {
        DevSettings.reload();
      } catch {
        this.setState({ failed: false });
      }
    }
  };

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <View style={styles.root}>
        <View style={styles.circle}>
          <Image source={mivoVoiceImages.think} style={styles.mivo} resizeMode="contain" />
        </View>
        <Text style={styles.title}>{t("Bir şeyler ters gitti")}</Text>
        <Text style={styles.body}>
          {t("Mivo bu hatayı not aldı ve ekibe iletti. Uygulamayı yeniden başlatınca kaldığın yerden devam edersin.")}
        </Text>
        <Button label={t("Yeniden başlat")} variant="chunky" onPress={() => void this.restart()} style={styles.button} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.lg, backgroundColor: '#FFFFFF' },
  circle: {
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  mivo: { width: 122, height: 122 },
  title: { fontFamily: fonts.headingBold, fontSize: 22, color: colors.textHeading, marginTop: 18, textAlign: 'center' },
  body: { fontFamily: fonts.bodyRegular, fontSize: 15, lineHeight: 22, color: colors.textMuted, marginTop: 8, textAlign: 'center', maxWidth: 320 },
  button: { marginTop: 24, alignSelf: 'stretch' },
});
