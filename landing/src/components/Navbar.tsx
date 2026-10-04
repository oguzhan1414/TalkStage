'use client';

import Link from 'next/link';
import Logo from './Logo';
import { trackEvent } from '@/lib/analytics';

const NAV_LINKS = [
  { href: '/app', label: '💻 Web Stüdyosu', highlight: true },
  { href: '/#features', label: '5 Süper Güç' },
  { href: '/#curriculum', label: 'Müfredat' },
  { href: '/app/library', label: '900 Kelime' },
  { href: '/sss', label: 'SSS' },
];

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <div className="bg-white/90 backdrop-blur-xl border border-slate-200/60 mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 py-2.5 shadow-[0_8px_28px_rgba(0,0,0,0.06)] sm:px-5 transition-all duration-300">
        <Link href="/" className="shrink-0 transition-transform hover:scale-105">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-3.5 py-2 text-xs font-semibold transition-all ${
                link.highlight
                  ? 'bg-card-orange text-orange-700 font-bold hover:bg-orange-100'
                  : 'text-body hover:bg-slate-100 hover:text-heading'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/giris"
            className="text-xs font-bold text-body hover:text-heading px-3 py-2 rounded-full hover:bg-slate-100 transition-all"
          >
            Giriş Yap
          </Link>
          <Link
            href="/onboarding"
            onClick={() => trackEvent('cta_clicked', { location: 'navbar' })}
            className="inline-flex items-center gap-1.5 rounded-full bg-heading px-5 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            <span>Ücretsiz Başla</span>
            <span>🚀</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
