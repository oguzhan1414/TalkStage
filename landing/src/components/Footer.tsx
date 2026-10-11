"use client";

import Link from "@/i18n/Link";
import Logo from "./Logo";
import { useLocale, useT } from "@/i18n/client";
import { TR_ONLY_ROUTES } from "@/i18n/config";
import LanguageSwitcher from "./LanguageSwitcher";
import { tr } from "@/i18n/shared";

const COLUMNS = [
  {
    title: tr("Ürün"),
    links: [
      { label: tr("Sahneler"), href: "/#scenes" },
      { label: tr("Mivo"), href: "/#mivo" },
      { label: tr("Günlük yol"), href: "/#path" },
      { label: tr("Fiyat"), href: "/#pricing" },
      { label: tr("Uygulamayı indir"), href: "/#download" },
    ],
  },
  {
    title: "Spekvia",
    links: [
      { label: tr("Hakkımızda"), href: "/about" },
      { label: tr("Blog"), href: "/blog" },
      { label: tr("Sıkça sorulan sorular"), href: "/faq" },
      { label: tr("İletişim"), href: "/contact" },
    ],
  },
  {
    title: tr("Yasal"),
    links: [
      { label: tr("Gizlilik politikası"), href: "/privacy" },
      { label: tr("Kullanım şartları"), href: "/terms" },
    ],
  },
];

export default function Footer() {
  const t = useT();
  const locale = useLocale();
  const trOnly = (href: string) => locale !== "tr" && TR_ONLY_ROUTES.some((k) => href === `/${k}` || href.startsWith(`/${k}/`));
  return (
    <footer className="relative overflow-hidden bg-ink px-5 pb-10 pt-16 text-white sm:px-8">
      <div aria-hidden className="slate-stripes absolute inset-x-0 top-0 h-2" />
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          <div className="max-w-sm">
            <Link href="/" className="group inline-block" aria-label={t("Spekvia ana sayfa")}>
              <Logo tone="light" />
            </Link>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-white/65">{t("İngilizceyi gerçek hayat sahnelerinde sesli prova et. Mivo karşında, düzeltme anında.")}</p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 sm:gap-16">
            {COLUMNS.map((col) => (
              <nav key={col.title} aria-label={t(col.title)}>
                <h4 className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-white/45">{t(col.title)}</h4>
                <ul className="mt-4 space-y-3">
                  {col.links.filter((link) => !trOnly(link.href)).map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-[0.92rem] text-white/80 transition-colors hover:text-slate-yellow">
                        {t(link.label)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-[0.82rem] text-white/50 sm:flex-row sm:items-center">
          <p>{t("© {{year}} Spekvia. Tüm hakları saklıdır.", { year: new Date().getFullYear() })}</p>
          <LanguageSwitcher variant="links" />
        </div>
      </div>
    </footer>
  );
}
