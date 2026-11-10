'use client';

import { Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import Link from '@/i18n/Link';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';
import StoreButtons from './home/StoreButtons';
import { trackEvent } from '@/lib/analytics';
import { useLocale, useT } from "@/i18n/client";
import { anchorId } from "@/i18n/paths";
import { tr } from "@/i18n/shared";
import type { AnchorKey } from "@/i18n/config";

const NAV_LINKS: { key: AnchorKey; href: string; label: string }[] = [
  { key: 'path', href: '/#path', label: tr("Nasıl çalışır") },
  { key: 'mivo', href: '/#mivo', label: tr("Mivo") },
  { key: 'levels', href: '/#levels', label: tr("Seviyeler") },
  { key: 'pricing', href: '/#pricing', label: tr("Fiyat") },
  { key: 'faq', href: '/faq', label: tr("SSS") },
];

/**
 * Floating pills, no bar: every piece carries its own ground, so the menu sits on any section colour.
 * It slides away while the page scrolls down and comes back on the first scroll up.
 */
export default function Navbar() {
  const t = useT();
  const locale = useLocale();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<AnchorKey | null>(null);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      if (y < 120) setHidden(false);
      else if (delta > 6) setHidden(true);
      else if (delta < -6) setHidden(false);
      lastY.current = y;
    };
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
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 px-3 pt-3 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] sm:px-6 sm:pt-4 ${
          hidden && !open ? '-translate-y-[130%]' : ''
        }`}
      >
        <div className="mx-auto flex max-w-[92rem] items-center justify-between gap-2">
          <Link href="/" onClick={() => setOpen(false)} className="btn-pop group h-11 shrink-0 bg-white px-4 sm:h-12 sm:px-5" aria-label={t("Spekvia ana sayfa")}>
            <Logo className="[&_img]:h-6 sm:[&_img]:h-7" />
          </Link>

          <nav aria-label={t("Ana menü")} className="stk-sm hidden items-center gap-0.5 rounded-full bg-white p-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                aria-current={active === link.key ? 'location' : undefined}
                className={`rounded-full px-4 py-2 text-[0.92rem] font-bold transition-colors duration-200 ${
                  active === link.key ? 'bg-ink text-white' : 'text-ink hover:bg-sun'
                }`}
              >
                {t(link.label)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <Link
              href="/#download"
              onClick={() => {
                setOpen(false);
                trackEvent('cta_clicked', { location: 'navbar' });
              }}
              className="btn-pop hidden h-11 bg-violet px-5 text-[0.92rem] text-white min-[430px]:inline-flex sm:h-12 sm:px-6"
            >{t("Uygulamayı indir")}</Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t("Menüyü kapat") : t("Menüyü aç")}
              className={`btn-pop h-11 w-11 text-ink lg:hidden ${open ? 'bg-sun' : 'bg-white'}`}
            >
              {open ? <X className="h-5 w-5" strokeWidth={3} aria-hidden /> : <Menu className="h-5 w-5" strokeWidth={3} aria-hidden />}
            </button>
          </div>
        </div>
      </header>

      {/* phone menu: a full violet sheet with the links in poster type */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={`fixed inset-0 z-40 flex flex-col overflow-y-auto bg-violet px-6 pb-10 pt-28 transition-[clip-path,visibility] duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] lg:hidden ${
          open ? 'visible [clip-path:circle(150%_at_100%_0)]' : 'invisible [clip-path:circle(0%_at_100%_0)]'
        }`}
      >
        <nav aria-label={t("Ana menü")} className="flex flex-col gap-1">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.key}
              href={link.href}
              tabIndex={open ? undefined : -1}
              onClick={() => setOpen(false)}
              className={`poster w-fit py-1.5 text-[2.7rem] transition-[opacity,translate] duration-500 ${i % 2 ? 'text-white' : 'text-sun'} ${open ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
              style={{ transitionDelay: open ? `${120 + i * 60}ms` : '0ms' }}
            >
              {t(link.label)}
            </Link>
          ))}
        </nav>
        <div className="mt-auto pt-10">
          <p className="hand -rotate-2 text-[1.7rem] text-sun">{t("hadi, sıra sende")}</p>
          <div onClick={() => setOpen(false)}>
            <StoreButtons location="menu" on="dark" size="md" className="mt-4" />
          </div>
        </div>
      </div>
    </>
  );
}
