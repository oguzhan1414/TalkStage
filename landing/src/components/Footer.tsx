"use client";

import Link from "@/i18n/Link";
import Logo from "./Logo";
import MivoGreeter from "./MivoGreeter";
import { AppleMark, PlayMark } from "./StoreMarks";
import { androidStoreUrl, iosStoreUrl } from "@/lib/links";
import { useLocale, useT } from "@/i18n/client";
import { TR_ONLY_ROUTES } from "@/i18n/config";
import { localizePath } from "@/i18n/paths";
import LanguageSwitcher from "./LanguageSwitcher";
import { tr } from "@/i18n/shared";
import { isAnalyticsConfigured } from "@/lib/analytics";
import { openConsentPreferences } from "@/lib/consent";

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
      { label: tr("Hesap ve veri silme"), href: "/delete-account" },
    ],
  },
];

const STORE_BTN =
  "group inline-flex items-center gap-2.5 rounded-2xl bg-ink px-4 py-2.5 text-white shadow-[0_14px_28px_-14px_rgba(21,18,58,0.7)] transition-all hover:-translate-y-0.5 hover:bg-stage-deep";

export default function Footer() {
  const t = useT();
  const locale = useLocale();
  const trOnly = (href: string) => locale !== "tr" && TR_ONLY_ROUTES.some((k) => href === `/${k}` || href.startsWith(`/${k}/`));

  return (
    <footer className="relative bg-linear-to-b from-white via-paper to-paper-deep px-4 pb-0 pt-28 sm:px-6">
      {/* soft light fields (clipped by their own wrapper so Mivo can overhang the footer edge) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-10 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.16),transparent_65%)] blur-3xl" />
        <div className="absolute -right-24 bottom-10 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(14,165,233,0.14),transparent_65%)] blur-3xl" />
        <div className="absolute -bottom-20 left-1/3 h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgba(239,93,168,0.10),transparent_65%)] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Mivo waves from the top edge of the card */}
        <MivoGreeter className="absolute -top-[7.2rem] right-6 z-20 sm:-top-[8.6rem] sm:right-14" />

        <div className="relative overflow-hidden rounded-[2.5rem] border border-white bg-white/75 p-7 shadow-lifted backdrop-blur-xl sm:p-12">
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-purple-pop/50 to-transparent" />

          <div className="grid gap-12 lg:grid-cols-[1.1fr_1.5fr] lg:gap-20">
            {/* Brand */}
            <div className="max-w-sm">
              <Link href="/" className="group inline-block" aria-label={t("Spekvia ana sayfa")}>
                <Logo />
              </Link>
              <p className="mt-5 text-[0.98rem] leading-relaxed text-body">{t("İngilizceyi gerçek hayat sahnelerinde sesli prova et. Mivo karşında, düzeltme anında.")}</p>
              <p className="mt-3 max-w-xs text-[0.78rem] leading-relaxed text-muted">{t("Spekvia, yapay zekâ destekli bir İngilizce konuşma koçu uygulamasıdır. Google ile giriş yalnızca hesabını doğrulamak için kullanılır; Google API'leri yapay zekâ ile oluşturulan rızasız cinsel içerikli görüntüler (NCII) için asla kullanılmaz.")}</p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a href={iosStoreUrl} className={STORE_BTN}>
                  <AppleMark />
                  <span className="text-left leading-tight">
                    <span className="block text-[0.58rem] uppercase tracking-wider text-white/60">{t("İndir")}</span>
                    <span className="block text-[0.86rem] font-bold">{t("App Store")}</span>
                  </span>
                </a>
                <a href={androidStoreUrl} className={STORE_BTN}>
                  <PlayMark />
                  <span className="text-left leading-tight">
                    <span className="block text-[0.58rem] uppercase tracking-wider text-white/60">{t("İndir")}</span>
                    <span className="block text-[0.86rem] font-bold">{t("Google Play")}</span>
                  </span>
                </a>
              </div>

              <a href="mailto:support@spekvia.com" className="mt-7 inline-flex items-center gap-2 text-[0.92rem] font-medium text-stage transition-colors hover:text-stage-deep">
                <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="2.5" />
                  <path d="m4 7 8 6 8-6" />
                </svg>
                support@spekvia.com
              </a>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
              {COLUMNS.map((col) => (
                <nav key={col.title} aria-label={t(col.title)}>
                  <h4 className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted">{t(col.title)}</h4>
                  <ul className="mt-5 space-y-3.5">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        {trOnly(link.href) ? (
                          // Pages written only in Turkish (the blog): other languages link straight to the Turkish page, marked "TR".
                          <a
                            href={localizePath(link.href, "tr")}
                            hrefLang="tr"
                            className="group relative inline-flex items-center gap-2 text-[0.95rem] font-medium text-heading transition-colors hover:text-stage"
                          >
                            {t(link.label)}
                            <span className="rounded-md bg-stage/10 px-1.5 py-0.5 font-mono text-[0.58rem] font-bold text-stage">TR</span>
                          </a>
                        ) : (
                          <Link href={link.href} className="group relative inline-block text-[0.95rem] font-medium text-heading transition-colors hover:text-stage">
                            {t(link.label)}
                            <span aria-hidden className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-linear-to-r from-stage to-spot transition-transform duration-300 group-hover:scale-x-100" />
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="relative z-10 mt-12 flex flex-col items-start justify-between gap-5 border-t border-line pt-6 text-[0.82rem] text-muted sm:flex-row sm:items-center">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <p>{t("© {{year}} Spekvia. Tüm hakları saklıdır.", { year: new Date().getFullYear() })}</p>
              {isAnalyticsConfigured && (
                <button type="button" onClick={openConsentPreferences} className="underline underline-offset-4 transition-colors hover:text-stage">
                  {t("Çerez tercihleri")}
                </button>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-full border border-line bg-paper px-4 py-2">
                <LanguageSwitcher variant="links" />
              </div>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                aria-label={t("Yukarı çık")}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-stage to-purple-pop text-white shadow-[0_10px_20px_-8px_rgba(79,70,229,0.8)] transition-all hover:-translate-y-0.5"
              >
                <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 19V5M5 12l7-7 7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Oversized wordmark: its bottom is cropped on purpose, fading into the footer edge */}
        <div
          aria-hidden
          className="pointer-events-none relative mt-8 h-[0.7em] select-none overflow-hidden text-center font-display text-[24vw] font-extrabold leading-none tracking-[-0.05em] text-transparent sm:text-[19vw] lg:text-[15rem]"
          style={{
            backgroundImage: "linear-gradient(180deg, rgba(79,70,229,0.22) 0%, rgba(124,92,255,0.12) 45%, transparent 95%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          Spekvia
        </div>
      </div>
    </footer>
  );
}
