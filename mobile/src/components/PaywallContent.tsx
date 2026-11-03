import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { Alert, Image, Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import Purchases, { PACKAGE_TYPE, type PurchasesPackage } from 'react-native-purchases';

import { mivoHomeImages } from '../assets/images';
import { privacyUrl, termsUrl } from '../constants/legalLinks';
import { useRestorePurchases } from '../hooks/useRestorePurchases';
import { isRevenueCatConfigured } from '../lib/revenuecat';
import { trackEvent } from '../lib/analytics';
import { colors, fonts, radii, shadow, spacing, typography } from '../theme/tokens';
import { Button } from './Button';
import { t } from '../i18n';

// Only what Pro really unlocks (backend/app/services/voice_access.py, entitlements.py): never list features that are
// free for everyone or not built — store policies treat that as a misleading claim.
const PRO_FEATURES = [
  t("Mivo ile sınırsız serbest sohbet (ücretsizde 1 deneme)"),
  t("Her gün istediğin kadar sesli sahne (ücretsizde günde 1)"),
  t("Canlı konuşma odası"),
  t("30 dakikaya kadar uzun sesli oturumlar (ücretsizde 5 dakika)"),
];

type Plan = {
  key: 'monthly' | 'annual';
  label: string;
  price: string;
  period: string;
  badge?: string;
};

// Prices come from the store (localised, in the learner's currency); these are shown only until it answers.
export const STATIC_PLANS: Plan[] = [
  { key: 'monthly', label: t("Aylık"), price: '…', period: t("/ ay") },
  { key: 'annual', label: t("Yıllık"), price: '…', period: t("/ yıl") },
];

type PaywallContentProps = {
  onPurchased: () => void;
  eyebrow?: boolean;
};

/** Store packages + purchase flow, shared by the plain paywall list and the onboarding poster paywall. */
export function usePaywall(onPurchased: () => void) {
  const [packages, setPackages] = useState<PurchasesPackage[]>([]);
  const [selected, setSelected] = useState<Plan['key']>('annual');
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    trackEvent('paywall_viewed');
  }, []);

  useEffect(() => {
    if (!isRevenueCatConfigured) return;
    Purchases.getOfferings()
      .then((offerings) => setPackages(offerings.current?.availablePackages ?? []))
      .catch(() => {});
  }, []);

  const packageFor = (plan: Plan['key']) =>
    packages.find((p) => p.packageType === (plan === 'monthly' ? PACKAGE_TYPE.MONTHLY : PACKAGE_TYPE.ANNUAL));

  const handlePurchase = async () => {
    const pkg = packageFor(selected);
    if (!pkg) {
      Alert.alert(t("Yakında"), t("Pro üyelik mağaza başvurusu tamamlanınca burada aktif olacak."));
      return;
    }
    setPurchasing(true);
    const props = { plan: selected, price: pkg.product.price, currency: pkg.product.currencyCode };
    trackEvent('purchase_started', props);
    try {
      await Purchases.purchasePackage(pkg);
      trackEvent('purchase_completed', props);
      Alert.alert(t("Teşekkürler!"), t("Pro üyeliğin aktif."));
      onPurchased();
    } catch (err) {
      const cancelled = (err as { userCancelled?: boolean } | null)?.userCancelled;
      trackEvent(cancelled ? 'purchase_cancelled' : 'purchase_failed', props);
      if (!cancelled) Alert.alert(t("Satın alma tamamlanamadı"), String(err));
    } finally {
      setPurchasing(false);
    }
  };

  /** "%50 Tasarruf" on the annual plan, worked out from the store's real prices (none until both are known). */
  const annualSaving = (() => {
    const monthly = packageFor('monthly')?.product.price;
    const annual = packageFor('annual')?.product.price;
    if (!monthly || !annual) return undefined;
    const pct = Math.round((1 - annual / (monthly * 12)) * 100);
    return pct >= 5 ? t("%{{n}} Tasarruf", { n: pct }) : undefined;
  })();

  /** Days of the store's free trial on a plan (Play offer with a free phase), if there is one. */
  const trialDays = (plan: Plan['key']) => {
    const iso = packageFor(plan)?.product.defaultOption?.freePhase?.billingPeriod?.iso8601;
    const m = iso ? /^P(\d+)([DW])$/.exec(iso) : null;
    return m ? Number(m[1]) * (m[2] === 'W' ? 7 : 1) : 0;
  };

  return { selected, setSelected, purchasing, packageFor, handlePurchase, annualSaving, trialDays };
}

export function PaywallContent({ onPurchased, eyebrow = true }: PaywallContentProps) {
  const { selected, setSelected, purchasing, packageFor, handlePurchase, annualSaving, trialDays } = usePaywall(onPurchased);
  const trial = trialDays(selected);
  const { restore, restoring } = useRestorePurchases(onPurchased);

  return (
    <View style={styles.root}>
      <Image source={mivoHomeImages.pro} style={styles.hero} resizeMode="cover" />
      {eyebrow ? <Text style={styles.eyebrow}>{t("SPEKVIA PRO")}</Text> : null}
      <Text style={styles.title}>{t("Sınırsız pratik yap, hızla ilerle")}</Text>

      <View style={styles.featureList}>
        {PRO_FEATURES.map((feature) => (
          <View key={feature} style={styles.featureRow}>
            <Ionicons name="checkmark-circle" size={18} color={colors.success} />
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
        <Text style={styles.fairUse}>{t("Sesli konuşmada günlük adil kullanım sınırı uygulanır.")}</Text>
      </View>

      <View style={styles.planRow}>
        {STATIC_PLANS.map((plan) => {
          const isSelected = selected === plan.key;
          const badge = plan.key === 'annual' ? annualSaving : plan.badge;
          return (
            <Pressable
              key={plan.key}
              onPress={() => setSelected(plan.key)}
              style={[styles.planCard, shadow.card, isSelected && styles.planCardSelected]}
            >
              {badge ? (
                <View style={styles.planBadge}>
                  <Text style={styles.planBadgeText}>{badge}</Text>
                </View>
              ) : null}
              <Text style={styles.planLabel}>{plan.label}</Text>
              {trialDays(plan.key) > 0 ? <Text style={styles.planTrial}>{t("{{n}} gün ücretsiz", { n: trialDays(plan.key) })}</Text> : null}
              <Text style={styles.planPrice}>{packageFor(plan.key)?.product.priceString ?? plan.price}</Text>
              <Text style={styles.planPeriod}>{plan.period}</Text>
            </Pressable>
          );
        })}
      </View>

      <Button
        label={purchasing ? t("İşleniyor…") : trial > 0 ? t("{{n}} gün ücretsiz dene", { n: trial }) : t("Pro’ya Geç")}
        onPress={handlePurchase}
        loading={purchasing}
        style={styles.ctaButton}
      />
      <Text style={styles.disclaimer}>
        {trial > 0 ? t("Deneme bitmeden iptal edersen ücret alınmaz. ") : ''}
        {t("İstediğin zaman tek tıkla iptal et.")}
      </Text>
      <View style={styles.legalRow}>
        <Pressable onPress={() => void Linking.openURL(termsUrl())} hitSlop={8}>
          <Text style={styles.legalLink}>{t("Kullanım Şartları")}</Text>
        </Pressable>
        <Text style={styles.legalLink}>·</Text>
        <Pressable onPress={() => void Linking.openURL(privacyUrl())} hitSlop={8}>
          <Text style={styles.legalLink}>{t("Gizlilik Politikası")}</Text>
        </Pressable>
      </View>
      <Pressable onPress={() => void restore()} disabled={restoring} hitSlop={8} style={styles.restoreBtn} accessibilityRole="button">
        <Text style={styles.restoreText}>{restoring ? t("Kontrol ediliyor…") : t("Satın alımları geri yükle")}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { width: '100%', alignItems: 'center' },
  hero: { width: 132, height: 132, borderRadius: 34, marginBottom: spacing.sm },
  planTrial: { fontFamily: fonts.headingBold, fontSize: 12, color: '#15803D', marginTop: 2 },
  eyebrow: { ...typography.caption, fontFamily: fonts.headingSemiBold, color: colors.brand, letterSpacing: 1 },
  title: { ...typography.h1, textAlign: 'center' },
  featureList: { width: '100%', gap: spacing.sm, marginTop: spacing.sm },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  fairUse: { fontFamily: fonts.bodyRegular, fontSize: 11.5, color: colors.textMuted, marginTop: 2 },
  featureText: { ...typography.body, flex: 1 },
  planRow: { flexDirection: 'row', gap: spacing.sm, width: '100%', marginTop: spacing.lg },
  planCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 2,
    borderColor: 'transparent',
    padding: spacing.md,
    alignItems: 'center',
    gap: 2,
  },
  planCardSelected: { borderColor: colors.brand },
  planBadge: {
    backgroundColor: colors.success,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    marginBottom: spacing.xs,
  },
  planBadgeText: { ...typography.caption, color: '#FFFFFF', fontFamily: fonts.headingSemiBold, fontSize: 11 },
  planLabel: { ...typography.bodyMedium },
  planPrice: { ...typography.h2 },
  planPeriod: { ...typography.caption },
  ctaButton: { width: '100%', marginTop: spacing.lg },
  disclaimer: { ...typography.caption, textAlign: 'center' },
  legalRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: spacing.sm },
  legalLink: { ...typography.caption, textDecorationLine: 'underline' },
  restoreBtn: { marginTop: spacing.sm, paddingVertical: 6 },
  restoreText: { fontFamily: fonts.headingSemiBold, fontSize: 13.5, color: colors.brand },
});
