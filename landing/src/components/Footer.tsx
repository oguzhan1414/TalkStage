"use client";

import Link from "@/i18n/Link";
import Image from "next/image";
import StoreButtons from "./home/StoreButtons";
import SocialLinks from "./SocialLinks";
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
      { label: tr("Nasıl çalışır"), href: "/#path" },
      { label: tr("Mivo"), href: "/#mivo" },
      { label: tr("Seviyeler"), href: "/#levels" },
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
];

const LEGAL_LINKS = [
  { label: tr("Gizlilik politikası"), href: "/privacy" },
  { label: tr("Kullanım şartları"), href: "/terms" },
  { label: tr("Hesap ve veri silme"), href: "/delete-account" },
];

const LINK = "inline-flex min-h-8 items-center gap-2 text-[0.95rem] font-semibold text-ink/75 underline-offset-4 transition-colors hover:text-violet hover:underline";

/** An open cream panel on a violet ground, followed by the social links. */
export default function Footer() {
  const t = useT();
  const locale = useLocale();
  const trOnly = (href: string) => locale !== "tr" && TR_ONLY_ROUTES.some((k) => href === `/${k}` || href.startsWith(`/${k}/`));

  return (
    <footer className="bg-violet px-4 pb-6 pt-5 text-ink sm:px-6 sm:pb-8 lg:px-8">
      <div className="mx-auto max-w-[96rem]">
        <div className="rounded-[1.75rem] bg-cream px-6 py-9 sm:rounded-[2rem] sm:px-10 sm:py-12 lg:px-12 lg:py-14">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr_0.95fr] lg:gap-10 xl:gap-16">
            {/* Brand */}
            <div className="flex max-w-md flex-col items-start">
              <Link href="/" className="group block w-full max-w-[22rem]" aria-label={t("Spekvia ana sayfa")}>
                <Image src="/assets/brand/wordmark.webp" alt="Spekvia" width={520} height={144} sizes="(max-width: 640px) 80vw, 352px" className="h-auto w-full" />
              </Link>
              <p className="mt-5 max-w-[28ch] text-[1.05rem] font-medium leading-relaxed text-ink/75">{t("Her gün kısa bir hikâye bölümü, ünite sonunda Mivo ile sesli bir sahne.")}</p>
              <a href="mailto:support@spekvia.com" className={`${LINK} mt-8 break-all lg:mt-auto lg:pt-10`}>
                <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="2.5" />
                  <path d="m4 7 8 6 8-6" />
                </svg>
                support@spekvia.com
              </a>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-8">
              {COLUMNS.map((col) => (
                <nav key={col.title} aria-label={t(col.title)}>
                  <h2 lang={col.title === "Spekvia" ? "en" : undefined} className="poster text-[1.25rem] text-ink">{t(col.title)}</h2>
                  <ul className="mt-4 space-y-1.5">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        {trOnly(link.href) ? (
                          // Pages written only in Turkish: other languages link straight to the Turkish page, marked "TR".
                          <a href={localizePath(link.href, "tr")} hrefLang="tr" className={LINK}>
                            {t(link.label)}
                            <span className="rounded-md bg-ink/10 px-1.5 py-0.5 text-[0.62rem] font-bold">TR</span>
                          </a>
                        ) : (
                          <Link href={link.href} className={LINK}>
                            {t(link.label)}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>

            <div className="relative overflow-hidden rounded-[1.5rem] bg-mint p-6 sm:p-7 lg:p-6 xl:p-7">
              <h2 className="poster max-w-[9ch] text-[2.2rem] leading-none sm:text-[2.5rem]">{t("İlk bölüm cebinde.")}</h2>
              <p className="mt-3 max-w-[22ch] text-sm font-semibold leading-relaxed text-ink/75">{t("Ücretsiz başla. Kredi kartı gerekmez.")}</p>
              <StoreButtons location="footer" size="md" className="relative z-10 mt-6 flex-col items-start gap-y-3 [--pop-shadow:#FFF7E6] [&>a]:min-w-[10.5rem] [&>span]:min-w-[10.5rem]" />
            </div>
          </div>

          <nav aria-label={t("Yasal")} className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-ink/15 pt-5 lg:mt-12">
            {LEGAL_LINKS.map((link) => <Link key={link.href} href={link.href} className={`${LINK} text-[0.8rem]`}>{t(link.label)}</Link>)}
          </nav>
          <p className="mt-4 max-w-4xl text-[0.72rem] leading-relaxed text-ink/60">
            {t("Spekvia, yapay zekâ destekli bir İngilizce konuşma koçu uygulamasıdır. Google ile giriş yalnızca hesabını doğrulamak için kullanılır; Google API'leri yapay zekâ ile oluşturulan rızasız cinsel içerikli görüntüler (NCII) için asla kullanılmaz.")}
          </p>
        </div>

        <div className="grid items-center gap-6 px-2 py-8 lg:px-4 lg:py-9 xl:grid-cols-[0.8fr_1.7fr] xl:gap-12">
          <p className="hand max-w-[20ch] -rotate-2 text-[1.9rem] leading-tight text-cream sm:text-[2.2rem]">{t("Hikâye burada da devam ediyor.")}</p>
          <SocialLinks />
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-start justify-between gap-5 border-t border-cream/25 px-2 pt-5 text-[0.8rem] text-cream/85 sm:flex-row sm:items-center lg:px-4">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <p>{t("© {{year}} Spekvia. Tüm hakları saklıdır.", { year: new Date().getFullYear() })}</p>
            {isAnalyticsConfigured && (
              <button type="button" onClick={openConsentPreferences} className="underline underline-offset-4 transition-colors hover:text-white">
                {t("Çerez tercihleri")}
              </button>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <LanguageSwitcher variant="links" />
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label={t("Yukarı çık")}
              className="btn-pop h-11 w-11 bg-sun text-ink [--pop-shadow:#1B1647]"
            >
              <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
