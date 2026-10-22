import { t } from '../i18n';

/** Turns Supabase's English auth messages into short, localized ones. Unknown messages are returned unchanged. */
export function friendlyAuthError(message: string): string {
  const m = message.toLowerCase();
  if (m.includes('invalid login credentials')) return t("E-posta veya şifre hatalı. Lütfen kontrol edin.");
  if (m.includes('already registered') || m.includes('already been registered')) {
    return t("Bu e-posta ile zaten bir hesap var. Giriş yapmayı dene.");
  }
  if (m.includes('email not confirmed')) return t("E-postanı henüz onaylamadın. Gelen kutundaki bağlantıya dokun.");
  if (m.includes('password should be at least') || m.includes('weak password')) return t("Şifre en az 6 karakter olmalı.");
  if (m.includes('invalid format') || m.includes('unable to validate email')) return t("Geçerli bir e-posta adresi gir.");
  if (m.includes('rate limit') || m.includes('too many')) return t("Çok fazla deneme yaptın. Birkaç dakika sonra tekrar dene.");
  if (m.includes('network') || m.includes('failed to fetch')) return t("İnternet bağlantını kontrol edip tekrar dene.");
  return message;
}

export function looksLikeEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}
