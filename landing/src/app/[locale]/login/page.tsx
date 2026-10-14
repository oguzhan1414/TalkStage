'use client';

import { useState } from 'react';
import Link from '@/i18n/Link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Lock, Mail, AlertCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import AuthShell from '@/components/AuthShell';
import { useT } from "@/i18n/client";

const FIELD =
  'w-full rounded-2xl border border-transparent bg-paper py-3.5 pl-11 pr-4 text-sm text-heading placeholder:text-muted outline-none transition-all focus:border-stage focus:bg-white focus:ring-3 focus:ring-stage/15';

export default function LoginPage() {
  const t = useT();
  const router = useRouter();
  const { signIn, signInWithGoogle } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError(t("Lütfen e-posta ve şifreni gir."));
      return;
    }

    setLoading(true);
    setError(null);

    const res = await signIn(email, password);
    setLoading(false);

    if (res.error) {
      setError(res.error);
    } else {
      router.push('/app');
    }
  };

  return (
    <AuthShell
      art="/hero/hero-portal.webp"
      mivoLabel={t("Mivo")}
      quote={t("Tekrar hoş geldin! Kaldığımız yerden devam edelim.")}
      header={
        <Link href="/onboarding" className="text-sm font-semibold text-stage transition-colors hover:text-stage-deep">
          {t("Ücretsiz dene")}
        </Link>
      }
    >
      <h1 className="font-display text-4xl font-extrabold leading-[1] tracking-[-0.035em] text-heading sm:text-5xl">{t("Tekrar hoş geldin")}</h1>
      <p className="mt-3 max-w-md text-[0.97rem] leading-relaxed text-body">{t("Web ve mobil oturumun tek hesapta birleşir; kelimelerin ve sahnelerin anında senkronize olur.")}</p>

      <div className="mt-8 rounded-[2rem] bg-white p-1">
        {error && (
          <div className="mb-4 flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="login-email" className="mb-1.5 block text-[0.8rem] font-bold text-heading">{t("E-posta adresin")}</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                id="login-email"
                type="email"
                required
                placeholder={t("ornek@email.com")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={FIELD}
              />
            </div>
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label htmlFor="login-password" className="block text-[0.8rem] font-bold text-heading">{t("Şifre")}</label>
              <span className="cursor-pointer text-xs font-medium text-stage hover:text-stage-deep">{t("Şifremi unuttum")}</span>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                id="login-password"
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={FIELD}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-stage to-purple-pop py-4 text-sm font-bold text-white shadow-[0_18px_36px_-16px_rgba(79,70,229,0.75)] transition-all hover:-translate-y-0.5 disabled:opacity-50"
          >
            <span>{loading ? t("Giriş yapılıyor...") : t("Giriş yap")}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-line" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-white px-3 font-medium text-muted">{t("veya tek tıkla")}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={signInWithGoogle}
          className="flex w-full items-center justify-center gap-2.5 rounded-full border border-line bg-white py-3.5 text-sm font-semibold text-heading transition-all hover:bg-paper"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden>
            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" />
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z" />
            <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
          </svg>
          <span>{t("Google ile giriş yap")}</span>
        </button>

        <p className="mt-6 rounded-2xl bg-paper px-4 py-3.5 text-center text-sm text-body">
          {t("Henüz hesabın yok mu?")}{' '}
          <Link href="/onboarding" className="font-bold text-stage underline underline-offset-4 hover:text-stage-deep">{t("Hemen kayıt ol ve planını oluştur")}</Link>
        </p>
      </div>
    </AuthShell>
  );
}
