// Görev 10 (Smart Deep-Link Router) henüz tamamlanmadı: mobil taraf gerçek
// `app://scenario/:id` şemasını ve store başvurusu bitince gerçek App Store /
// Play Store URL'lerini netleştirecek. Bu değerler netleşince .env içine
// NEXT_PUBLIC_IOS_STORE_URL / NEXT_PUBLIC_ANDROID_STORE_URL olarak eklenmeli.
export const iosStoreUrl = process.env.NEXT_PUBLIC_IOS_STORE_URL ?? "#";
export const androidStoreUrl = process.env.NEXT_PUBLIC_ANDROID_STORE_URL ?? "#";
export const appScheme = process.env.NEXT_PUBLIC_APP_SCHEME ?? "spekiva://";
