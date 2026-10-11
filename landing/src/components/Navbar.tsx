'use client';

import Link from '@/i18n/Link';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';
import { trackEvent } from '@/lib/analytics';
import { useT } from "@/i18n/client";
import { tr } from "@/i18n/shared";

const NAV_LINKS = [
  { href: '/#scenes', label: tr("Sahneler") },
  { href: '/#mivo', label: tr("Mivo") },
  { href: '/#path', label: tr("Günlük yol") },
  { href: '/#pricing', label: tr("Fiyat") },
  { href: '/faq', label: tr("SSS") },
];

export default function Navbar() {
  const t = useT();
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-line bg-white/85 px-4 py-2.5 shadow-layered backdrop-blur-xl sm:px-5">
        <Link href="/" className="group shrink-0" aria-label={t("Spekvia ana sayfa")}>
          <Logo />
        </Link>

        <nav aria-label={t("Ana menü")} className="hidden items-center gap-0.5 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-2 text-[0.82rem] font-semibold text-body transition-colors hover:bg-paper-deep hover:text-heading"
            >
              {t(link.label)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <LanguageSwitcher />
          <Link
            href="/login"
            className="rounded-full px-3 py-2 text-[0.82rem] font-semibold text-body transition-colors hover:bg-paper-deep hover:text-heading"
          >{t("Giriş yap")}</Link>
          <Link
            href="/onboarding"
            onClick={() => trackEvent('cta_clicked', { location: 'navbar' })}
            className="inline-flex items-center rounded-full bg-stage px-4 py-2.5 text-[0.82rem] font-bold text-white shadow-[0_8px_20px_-8px_rgba(79,70,229,0.7)] transition-all hover:-translate-y-0.5 hover:bg-stage-deep sm:px-5"
          >{t("Ücretsiz dene")}</Link>
        </div>
      </div>
    </header>
  );
}
