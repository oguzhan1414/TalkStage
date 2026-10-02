'use client';

import Link from 'next/link';
import Logo from './Logo';
import { trackEvent } from '@/lib/analytics';

const NAV_LINKS = [
  { href: '/app', label: '💻 Web Stüdyosu', highlight: true },
  { href: '/#features', label: '5 Süper Güç' },
  { href: '/#curriculum', label: 'CEFR Müfredat (46 Konu)' },
  { href: '/app/library', label: '900 Kelime' },
  { href: '/sss', label: 'SSS' },
];

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <div className="bg-white/85 backdrop-blur-md border border-line mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 py-2.5 shadow-lg shadow-ink/5 sm:px-5">
        <Link href="/" className="shrink-0 transition-transform hover:scale-105">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                link.highlight
                  ? 'bg-gold/12 text-indigo-dark font-bold border border-gold/35 hover:bg-gold/20'
                  : 'text-body hover:bg-porcelain hover:text-heading'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/giris"
            className="text-xs font-bold text-body hover:text-heading px-2 py-1 transition-colors"
          >
            Giriş Yap
          </Link>
          <Link
            href="/onboarding"
            onClick={() => trackEvent('cta_clicked', { location: 'navbar' })}
            className="inline-flex items-center gap-1.5 rounded-full bg-linear-to-r from-indigo to-indigo-dark px-5 py-2 text-xs font-bold text-white shadow-[0_10px_24px_-8px_rgba(227,167,63,0.5)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_28px_-6px_rgba(227,167,63,0.6)]"
          >
            <span>Ücretsiz Başla</span>
            <span>🚀</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
