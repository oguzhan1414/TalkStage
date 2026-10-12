import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import Purchases, { PACKAGE_TYPE, type PurchasesPackage } from 'react-native-purchases';

import { isRevenueCatConfigured } from '../lib/revenuecat';
import { colors, fonts, radii, shadow, spacing, typography } from '../theme/tokens';
import { Button } from './Button';
import { t } from '../i18n';

const PRO_FEATURES = [
  t("Sınırsız canlı sesli konuşma pratiği"),
  t("Tüm niş sahneler (Mülakat, Vize, B2B)"),
  t("Anlık Türkçe açıklamalı gramer & fonetik koçu"),
  t("Detaylı telaffuz ve hece analizi raporları"),
  t("Kişiselleştirilmiş SM-2 kelime tekrar motoru"),
];

type Plan = {
  key: 'monthly' | 'annual';
  label: string;
  price: string;
  period: string;
  badge?: string;
};

export const STATIC_PLANS: Plan[] = [
  { key: 'monthly', label: t("Aylık"), price: '199 TL', period: '/ ay' },
  { key: 'annual', label: t("Yıllık"), price: '999 TL', period: t("/ yıl"), badge: t("%58 Tasarruf") },
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
    try {
      await Purchases.purchasePackage(pkg);
      Alert.alert(t("Teşekkürler!"), t("Pro üyeliğin aktif."));
      onPurchased();
    } catch (err) {
      const cancelled = (err as { userCancelled?: boolean } | null)?.userCancelled;
      if (!cancelled) Alert.alert(t("Satın alma tamamlanamadı"), String(err));
    } finally {
      setPurchasing(false);
    }
  };

  return { selected, setSelected, purchasing, packageFor, handlePurchase };
}

export function PaywallContent({ onPurchased, eyebrow = true }: PaywallContentProps) {
  const { selected, setSelected, purchasing, packageFor, handlePurchase } = usePaywall(onPurchased);

  return (
    <View style={styles.root}>
      {eyebrow ? <Text style={styles.eyebrow}>{t("SPEKVIA PRO")}</Text> : null}
      <Text style={styles.title}>{t("Sınırsız pratik yap, hızla ilerle")}</Text>

      <View style={styles.featureList}>
        {PRO_FEATURES.map((feature) => (
          <View key={feature} style={styles.featureRow}>
            <Ionicons name="checkmark-circle" size={18} color={colors.success} />
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>

      <View style={styles.planRow}>
        {STATIC_PLANS.map((plan) => {
          const isSelected = selected === plan.key;
          return (
            <Pressable
              key={plan.key}
              onPress={() => setSelected(plan.key)}
              style={[styles.planCard, shadow.card, isSelected && styles.planCardSelected]}
            >
              {plan.badge ? (
                <View style={styles.planBadge}>
                  <Text style={styles.planBadgeText}>{plan.badge}</Text>
                </View>
              ) : null}
              <Text style={styles.planLabel}>{plan.label}</Text>
              <Text style={styles.planPrice}>{packageFor(plan.key)?.product.priceString ?? plan.price}</Text>
              <Text style={styles.planPeriod}>{plan.period}</Text>
            </Pressable>
          );
        })}
      </View>

      <Button
        label={purchasing ? t("İşleniyor…") : t("Pro’ya Geç")}
        onPress={handlePurchase}
        loading={purchasing}
        style={styles.ctaButton}
      />
      <Text style={styles.disclaimer}>{t("İstediğin zaman tek tıkla iptal et.")}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { width: '100%', alignItems: 'center' },
  eyebrow: { ...typography.caption, fontFamily: fonts.headingSemiBold, color: colors.brand, letterSpacing: 1 },
  title: { ...typography.h1, textAlign: 'center' },
  featureList: { width: '100%', gap: spacing.sm, marginTop: spacing.sm },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
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
});
