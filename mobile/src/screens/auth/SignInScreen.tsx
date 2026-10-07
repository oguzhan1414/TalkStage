import { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { appLogoIcon, authWelcomeHeroBg } from '../../assets/images';
import { AuthMivoHero } from '../../components/AuthMivoHero';
import { AppleSignInButton } from '../../components/AppleSignInButton';
import { BouncyPressable } from '../../components/BouncyPressable';
import { GoogleSignInButton } from '../../components/GoogleSignInButton';
import { supabase } from '../../lib/supabase';
import type { AuthStackScreenProps } from '../../navigation/types';
import { colors, fonts, radii, shadow } from '../../theme/tokens';
import { t } from '../../i18n';

export function SignInScreen({ navigation }: AuthStackScreenProps<'SignIn'>) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    if (!email.trim() || !password) return;
    setError(null);
    setLoading(true);
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (signInError) {
        setError(
          signInError.message.includes('Invalid login credentials')
            ? t("E-posta veya şifre hatalı. Lütfen kontrol edin.")
            : signInError.message
        );
      }
    } catch {
      setError(t("Giriş yapılamadı. İnternet bağlantını kontrol edip tekrar dene."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.root}>
      {/* 1. Full-Height 3D Mivo Mascot Hero Backdrop */}
      <ImageBackground
        source={authWelcomeHeroBg}
        style={styles.heroBackground}
        resizeMode="cover"
      >
        <AuthMivoHero />
        <SafeAreaView style={styles.safeArea}>
          <KeyboardAvoidingView
            style={styles.keyboardView}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          >
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              bounces={false}
            >
              {/* 2. Clean Top Brand Logo */}
              <View style={styles.topSection}>
                <View style={[styles.brandCapsule, shadow.card]}>
                  <Image source={appLogoIcon} style={styles.brandLogoImg} resizeMode="contain" />
                  <Text style={styles.brandName}>{t("TalkStage")}</Text>
                </View>
              </View>

              {/* 3. Spacious Gap so Mivo is 100% Unobstructed in Middle Viewport */}
              <View style={styles.heroSpacer} />

              {/* 4. Sleek Bottom Porcelain Sheet Form */}
              <View style={[styles.bottomSheet, shadow.porcelain]}>
                <View style={styles.sheetHeader}>
                  <Text style={styles.sheetTitle}>{t("Sahneye Giriş Yap")}</Text>
                  <Text style={styles.sheetSub}>{t("Kaldığın yerden akıcı pratiğe devam et")}</Text>
                </View>

                {/* Email Input */}
                <View style={styles.inputGroup}>
                  <View style={styles.inputWrapper}>
                    <Ionicons name="mail-outline" size={19} color="#64748B" style={styles.inputIcon} />
                    <TextInput
                      style={styles.textInput}
                      placeholder={t("E-posta adresin")}
                      placeholderTextColor="#94A3B8"
                      autoCapitalize="none"
                      keyboardType="email-address"
                      autoComplete="email"
                      autoCorrect={false}
                      value={email}
                      onChangeText={(t) => {
                        setEmail(t);
                        if (error) setError(null);
                      }}
                    />
                  </View>
                </View>

                {/* Password Input */}
                <View style={styles.inputGroup}>
                  <View style={styles.inputWrapper}>
                    <Ionicons name="lock-closed-outline" size={19} color="#64748B" style={styles.inputIcon} />
                    <TextInput
                      style={[styles.textInput, { paddingRight: 38 }]}
                      placeholder={t("Şifren")}
                      placeholderTextColor="#94A3B8"
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                      autoComplete="password"
                      value={password}
                      onChangeText={(t) => {
                        setPassword(t);
                        if (error) setError(null);
                      }}
                    />
                    <BouncyPressable
                      onPress={() => setShowPassword(!showPassword)}
                      style={styles.eyeToggleBtn}
                      hapticType="light"
                      scaleTo={0.92}
                    >
                      <Ionicons
                        name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                        size={19}
                        color="#64748B"
                      />
                    </BouncyPressable>
                  </View>
                </View>

                {/* Error Banner */}
                {error && (
                  <View style={styles.errorBox}>
                    <Ionicons name="alert-circle" size={16} color="#EF4444" />
                    <Text style={styles.errorText}>{error}</Text>
                  </View>
                )}

                {/* Primary Action Button */}
                <BouncyPressable
                  onPress={handleSignIn}
                  disabled={loading || !email.trim() || !password}
                  style={[
                    styles.primaryLoginBtn,
                    (!email.trim() || !password) && styles.primaryBtnDisabled,
                    shadow.card,
                  ]}
                  hapticType="medium"
                  scaleTo={0.97}
                >
                  {loading ? (
                    <ActivityIndicator color="#FFFFFF" size="small" />
                  ) : (
                    <>
                      <Text style={styles.primaryLoginBtnText}>{t("Sahneye Giriş Yap")}</Text>
                      <Ionicons name="arrow-forward" size={17} color="#FFFFFF" style={{ marginLeft: 6 }} />
                    </>
                  )}
                </BouncyPressable>

                {/* Social Login Options */}
                <View style={styles.socialRow}>
                  <AppleSignInButton onError={setError} />
                  <GoogleSignInButton onError={setError} />
                </View>

                {/* Bottom Switcher */}
                <BouncyPressable
                  onPress={() => navigation.navigate('SignUp')}
                  style={styles.switchRow}
                  hapticType="light"
                  scaleTo={0.96}
                >
                  <Text style={styles.switchTextNormal}>{t("Hesabın yok mu?")}{" "}</Text>
                  <Text style={styles.switchTextBold}>{t("Hemen Kayıt Ol ➔")}</Text>
                </BouncyPressable>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F7EDE2',
  },
  heroBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },

  /* 2. Top Header Section */
  topSection: {
    paddingHorizontal: 20,
    paddingTop: 12,
    alignItems: 'center',
  },
  brandCapsule: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: radii.pill,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.9)',
  },
  brandLogoImg: {
    width: 22,
    height: 22,
    borderRadius: 6,
    marginRight: 8,
  },
  brandName: {
    fontFamily: fonts.headingBold,
    fontSize: 14,
    color: '#0F172A',
    letterSpacing: 0.5,
  },

  /* Spacer so Mivo is fully visible */
  heroSpacer: {
    height: 180,
  },

  /* 4. Sleek Bottom Porcelain Sheet */
  bottomSheet: {
    backgroundColor: 'rgba(255, 255, 255, 0.97)',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 26,
    borderWidth: 1.5,
    borderBottomWidth: 0,
    borderColor: '#FFFFFF',
  },
  sheetHeader: {
    marginBottom: 14,
  },
  sheetTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 20,
    color: '#0F172A',
  },
  sheetSub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12.5,
    color: '#64748B',
    marginTop: 2,
  },

  /* Form Fields */
  inputGroup: {
    marginBottom: 10,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 46,
  },
  inputIcon: {
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    fontFamily: fonts.bodyRegular,
    fontSize: 13.5,
    color: '#0F172A',
    height: '100%',
  },
  eyeToggleBtn: {
    padding: 4,
  },

  /* Error Box */
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 10,
    gap: 6,
  },
  errorText: {
    flex: 1,
    fontFamily: fonts.bodyRegular,
    fontSize: 11.5,
    color: '#DC2626',
  },

  /* Primary Button */
  primaryLoginBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.brand,
    height: 48,
    borderRadius: 14,
    marginTop: 4,
  },
  primaryBtnDisabled: {
    opacity: 0.5,
  },
  primaryLoginBtnText: {
    fontFamily: fonts.headingBold,
    fontSize: 14.5,
    color: '#FFFFFF',
  },

  /* Social */
  socialRow: {
    marginTop: 10,
    gap: 8,
  },

  /* Switch Row */
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 14,
    paddingVertical: 4,
  },
  switchTextNormal: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12.5,
    color: '#64748B',
  },
  switchTextBold: {
    fontFamily: fonts.headingBold,
    fontSize: 12.5,
    color: colors.brand,
  },
});
