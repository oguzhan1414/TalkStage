import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Alert } from 'react-native';
import Purchases from 'react-native-purchases';

import { t } from '../i18n';
import { api } from '../lib/api';
import { isRevenueCatConfigured, PRO_ENTITLEMENT_ID } from '../lib/revenuecat';

/**
 * "Satın alımları geri yükle": asks the store for this store account's purchases (new phone, reinstall, another
 * Spekvia account on the same Google/Apple account), then makes the server re-read the Pro state from RevenueCat so
 * the voice rooms see it too. Required by both stores for subscription apps.
 */
export function useRestorePurchases(onRestored?: () => void) {
  const queryClient = useQueryClient();
  const [restoring, setRestoring] = useState(false);

  const restore = async () => {
    if (restoring) return;
    if (!isRevenueCatConfigured) {
      Alert.alert(t("Yakında"), t("Pro üyelik mağaza başvurusu tamamlanınca burada aktif olacak."));
      return;
    }
    setRestoring(true);
    try {
      const info = await Purchases.restorePurchases();
      const active = Boolean(info.entitlements.active[PRO_ENTITLEMENT_ID]);
      // The server's own copy (voice-room quota) follows; a failure here is fixed by the next webhook.
      await api.post('/subscriptions/sync').catch(() => undefined);
      await queryClient.invalidateQueries({ queryKey: ['isProUser'] });
      await queryClient.invalidateQueries({ queryKey: ['me'] });
      if (active) {
        Alert.alert(t("Geri yüklendi 🎉"), t("Pro üyeliğin bu hesapta tekrar aktif."));
        onRestored?.();
      } else {
        Alert.alert(t("Satın alım bulunamadı"), t("Bu mağaza hesabında aktif bir Pro üyelik yok. Satın alırken kullandığın Google/Apple hesabıyla giriş yaptığından emin ol."));
      }
    } catch {
      Alert.alert(t("Geri yüklenemedi"), t("Bağlantını kontrol edip tekrar dene."));
    } finally {
      setRestoring(false);
    }
  };

  return { restore, restoring };
}
