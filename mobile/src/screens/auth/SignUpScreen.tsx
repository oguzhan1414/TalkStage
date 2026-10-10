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
import { BouncyPressable } from '../../components/BouncyPressable';
import { supabase } from '../../lib/supabase';
import type { AuthStackScreenProps } from '../../navigation/types';
import { colors, fonts, radii, shadow } from '../../theme/tokens';
import { t } from '../../i18n';

export function SignUpScreen({ navigation }: AuthStackScreenProps<'SignUp'>) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmationSent, setConfirmationSent] = useState(false);

  const handleSignUp = async () => {
    if (!email.trim() || password.length < 6) return;
    setError(null);
    setLoading(true);
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }
      // No session yet + no error means Supabase is waiting on email confirmation.
      if (!data.session) {
        setConfirmationSent(true);
      }
    } catch {
      setError(t("Hesap oluşturulamadı. İnternet bağlantını kontrol edip tekrar dene."));
    } finally {
      setLoading(false);
    }
  };

  /* Confirmation Sent Screen */
  if (confirmationSent) {
    return (
      <View style={styles.root}>
        <ImageBackground
          source={authWelcomeHeroBg}
          style={styles.heroBackground}
          resizeMode="cover"
        >
          <AuthMivoHero />
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.confirmationContainer}>
              <View style={[styles.confirmCard, shadow.porcelain]}>
                <View style={styles.confirmIconCircle}>
                  <Ionicons name="mail-unread" size={34} color={colors.brand} />
                </View>
                <Text style={styles.confirmTitle}>{t("E-Postanı Kontrol Et ✉️")}</Text>
                <Text style={styles.confirmDesc}>
                  {t("{{email}} adresine bir onay bağlantısı gönderdik. Bağlantıya tıklayarak Mivo ile sahneye adım atabilirsin.", { email })}
                </Text>

                <BouncyPressable
                  onPress={() => navigation.navigate('SignIn')}
                  style={[styles.primaryLoginBtn, shadow.card]}
                  hapticType="medium"
                  scaleTo={0.97}
                >
                  <Ionicons name="arrow-back" size={17} color="#FFFFFF" style={{ marginRight: 6 }} />
                  <Text style={styles.primaryLoginBtnText}>{t("Giriş Ekranına Dön")}</Text>
                </BouncyPressable>
              </View>
            </View>
          </SafeAreaView>
        </ImageBackground>
      </View>
    );
  }

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
                  <Text style={styles.brandName}>{t("Spekiva")}</Text>
                </View>
              </View>

              {/* 3. Spacious Gap so Mivo is 100% Unobstructed in Middle Viewport */}
              <View style={styles.heroSpacer} />

              {/* 4. Sleek Bottom Porcelain Sheet Form */}
              <View style={[styles.bottomSheet, shadow.porcelain]}>
                <View style={styles.sheetHeader}>
                  <Text style={styles.sheetTitle}>{t("Sahneni Oluştur")}</Text>
                  <Text style={styles.sheetSub}>{t("Birkaç saniyede ücretsiz hesabını aç")}</Text>
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
                      placeholder={t("Şifren (en az 6 karakter)")}
                      placeholderTextColor="#94A3B8"
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                      autoComplete="new-password"
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

                {/* Feature Highlight Mini Chips */}
                <View style={styles.featureChipsRow}>
                  <View style={styles.featureChip}>
                    <Text style={styles.featureChipText}>{t("🛡️ Gizli & Güvenli")}</Text>
                  </View>
                  <View style={styles.featureChip}>
                    <Text style={styles.featureChipText}>{t("⚡ Anında Başla")}</Text>
                  </View>
                  <View style={styles.featureChip}>
                    <Text style={styles.featureChipText}>{t("🎁 Ücretsiz Seviye")}</Text>
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
                  onPress={handleSignUp}
                  disabled={loading || !email.trim() || password.length < 6}
                  style={[
                    styles.primaryLoginBtn,
                    (!email.trim() || password.length < 6) && styles.primaryBtnDisabled,
                    shadow.card,
                  ]}
                  hapticType="medium"
                  scaleTo={0.97}
                >
                  {loading ? (
                    <ActivityIndicator color="#FFFFFF" size="small" />
                  ) : (
                    <>
                      <Text style={styles.primaryLoginBtnText}>{t("Hesabımı Oluştur")}</Text>
                      <Ionicons name="arrow-forward" size={17} color="#FFFFFF" style={{ marginLeft: 6 }} />
                    </>
                  )}
                </BouncyPressable>

                {/* Bottom Switcher */}
                <BouncyPressable
                  onPress={() => navigation.navigate('SignIn')}
                  style={styles.switchRow}
                  hapticType="light"
                  scaleTo={0.96}
                >
                  <Text style={styles.switchTextNormal}>{t("Zaten bir hesabın var mı?")}{" "}</Text>
                  <Text style={styles.switchTextBold}>{t("Giriş Yap ➔")}</Text>
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

  /* Feature Chips */
  featureChipsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    marginTop: 2,
  },
  featureChip: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  featureChipText: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 10,
    color: '#475569',
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

  /* Confirmation */
  confirmationContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  confirmCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.96)',
    borderRadius: 28,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  confirmIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  confirmTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 19,
    color: '#0F172A',
    marginBottom: 6,
  },
  confirmDesc: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12.5,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 18,
  },
});
