'use client';

import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import Link from '@/i18n/Link';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';
import { trackEvent } from '@/lib/analytics';
import { useLocale, useT } from "@/i18n/client";
import { anchorId } from "@/i18n/paths";
import { tr } from "@/i18n/shared";
import type { AnchorKey } from "@/i18n/config";

const NAV_LINKS: { key: AnchorKey; href: string; label: string }[] = [
  { key: 'scenes', href: '/#scenes', label: tr("Sahneler") },
  { key: 'mivo', href: '/#mivo', label: tr("Mivo") },
  { key: 'path', href: '/#path', label: tr("Günlük yol") },
  { key: 'pricing', href: '/#pricing', label: tr("Fiyat") },
  { key: 'faq', href: '/faq', label: tr("SSS") },
];

/**
 * Floating pill. It tightens and gains a shadow once the page scrolls, slides away while you read downward and
 * returns the moment you scroll up, and lights the link of the section you are in. Phones get a menu sheet.
 */
export default function Navbar() {
  const t = useT();
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<AnchorKey | null>(null);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (y < 120) setHidden(false);
      else if (Math.abs(y - last) > 8) setHidden(y > last);
      last = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const els = NAV_LINKS.filter((l) => l.href.startsWith('/#'))
      .map((l) => ({ key: l.key, el: document.getElementById(anchorId(l.key, locale)) }))
      .filter((x): x is { key: AnchorKey; el: HTMLElement } => !!x.el);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const hit = els.find((x) => x.el === e.target);
          if (!hit) return;
          if (e.isIntersecting) setActive(hit.key);
          else setActive((cur) => (cur === hit.key ? null : cur));
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    els.forEach((x) => io.observe(x.el));
    return () => io.disconnect();
  }, [locale]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const show = !hidden || open;

  return (
    <header className={`fixed inset-x-0 top-0 z-50 px-3 pt-3 transition-transform duration-300 sm:px-5 ${show ? 'translate-y-0' : '-translate-y-[120%]'}`}>
      <div
        className={`relative mx-auto flex max-w-6xl items-center justify-between rounded-full border bg-white/85 px-4 backdrop-blur-xl transition-all duration-300 sm:px-5 ${
          scrolled ? 'border-line py-2 shadow-lifted' : 'border-white/70 py-2.5 shadow-layered'
        }`}
      >
        <Link href="/" className="group shrink-0" aria-label={t("Spekvia ana sayfa")}>
          <Logo />
        </Link>

        <nav aria-label={t("Ana menü")} className="hidden items-center gap-0.5 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              aria-current={active === link.key ? 'location' : undefined}
              className={`rounded-full px-3.5 py-2 text-[0.82rem] font-semibold transition-all duration-300 ${
                active === link.key ? 'bg-stage/10 text-stage' : 'text-body hover:bg-paper-deep hover:text-heading'
              }`}
            >
              {t(link.label)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <LanguageSwitcher />
          <Link
            href="/login"
            className="hidden rounded-full px-3 py-2 text-[0.82rem] font-semibold text-body transition-colors hover:bg-paper-deep hover:text-heading sm:inline-flex"
          >{t("Giriş yap")}</Link>
          <Link
            href="/onboarding"
            onClick={() => trackEvent('cta_clicked', { location: 'navbar' })}
            className="inline-flex items-center rounded-full bg-linear-to-r from-stage to-purple-pop px-4 py-2.5 text-[0.82rem] font-bold text-white shadow-[0_10px_22px_-8px_rgba(79,70,229,0.75)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_26px_-8px_rgba(79,70,229,0.85)] sm:px-5"
          >{t("Ücretsiz dene")}</Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t("Menüyü kapat") : t("Menüyü aç")}
            className="flex h-10 w-10 items-center justify-center rounded-full text-heading transition-colors hover:bg-paper-deep md:hidden"
          >
            {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </div>

      {/* phone menu */}
      <div
        id="mobile-menu"
        className={`mx-auto mt-2 max-w-6xl origin-top overflow-hidden rounded-[2rem] border border-white bg-white/95 shadow-lifted backdrop-blur-xl transition-all duration-300 md:hidden ${
          open ? 'max-h-[28rem] opacity-100' : 'pointer-events-none max-h-0 border-transparent opacity-0'
        }`}
      >
        <nav aria-label={t("Ana menü")} className="flex flex-col p-3">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`rounded-2xl px-4 py-3.5 font-display text-xl font-bold tracking-tight transition-colors ${
                active === link.key ? 'bg-stage/10 text-stage' : 'text-heading hover:bg-paper-deep'
              }`}
            >
              {t(link.label)}
            </Link>
          ))}
          <Link href="/login" onClick={() => setOpen(false)} className="mt-1 rounded-2xl px-4 py-3.5 text-base font-semibold text-body hover:bg-paper-deep">
            {t("Giriş yap")}
          </Link>
        </nav>
      </div>
    </header>
  );
}
