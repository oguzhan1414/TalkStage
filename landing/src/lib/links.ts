// Empty values and the former placeholder mean the store is not available yet.
const storeUrl = (value: string | undefined) => {
  const url = value?.trim();
  return url && url !== "#" ? url : null;
};

export const iosStoreUrl = storeUrl(process.env.NEXT_PUBLIC_IOS_STORE_URL);
export const androidStoreUrl = storeUrl(process.env.NEXT_PUBLIC_ANDROID_STORE_URL)
  ?? "https://play.google.com/store/apps/details?id=com.spekvia.app";
export const appScheme = process.env.NEXT_PUBLIC_APP_SCHEME ?? "spekvia://";
