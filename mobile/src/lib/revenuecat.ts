import { Platform } from 'react-native';
import Purchases from 'react-native-purchases';

const IOS_API_KEY = process.env.EXPO_PUBLIC_REVENUECAT_IOS_API_KEY;
const ANDROID_API_KEY = process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_API_KEY;

export const PRO_ENTITLEMENT_ID = 'pro';

export const isRevenueCatConfigured = Boolean(Platform.OS === 'ios' ? IOS_API_KEY : ANDROID_API_KEY);

/**
 * `appUserID` is set to the Supabase auth user id on purpose — backend's
 * RevenueCat webhook matches purchases back to `subscriptions` rows by this
 * id (see `backend/CLAUDE.md`'s API contract note on Görev 19). Without it,
 * the webhook can't tell which Spekiva account a purchase belongs to.
 */
export function configureRevenueCat(supabaseUserId: string) {
  const apiKey = Platform.OS === 'ios' ? IOS_API_KEY : ANDROID_API_KEY;
  if (!apiKey) return;
  Purchases.configure({ apiKey, appUserID: supabaseUserId });
}

export async function isProUser(): Promise<boolean> {
  if (!isRevenueCatConfigured) return false;
  try {
    const customerInfo = await Purchases.getCustomerInfo();
    return Boolean(customerInfo.entitlements.active[PRO_ENTITLEMENT_ID]);
  } catch {
    return false;
  }
}
