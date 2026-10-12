"use client";

import { useEffect, useState } from "react";
import Link from "@/i18n/Link";
import { useT } from "@/i18n/client";
import { disableAnalytics, isAnalyticsConfigured } from "@/lib/analytics";
import { CONSENT_OPEN_EVENT, getConsent, setConsent, type ConsentChoice } from "@/lib/consent";

/**
 * Cookie banner. Shown only when analytics is configured at all (otherwise the site stores nothing optional).
 * "Accept" and "Reject" have equal weight on purpose. The footer's "Çerez tercihleri" link re-opens it.
 */
export default function CookieConsent() {
  const t = useT();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isAnalyticsConfigured) return;
    if (getConsent() === null) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(CONSENT_OPEN_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, reopen);
  }, []);

  if (!open) return null;

  const choose = (choice: ConsentChoice) => {
    setConsent(choice);
    if (choice === "denied") disableAnalytics();
    setOpen(false);
  };

  const buttonBase =
    "flex-1 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stage";

  return (
    <div
      role="dialog"
      aria-label={t("Çerez tercihleri")}
      className="fixed inset-x-3 bottom-3 z-[70] rounded-2xl border border-line bg-white p-5 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.35)] sm:left-6 sm:right-auto sm:max-w-md"
    >
      <p className="font-display text-base font-bold text-heading">{t("Çerez tercihleri")}</p>
      <p className="mt-2 text-sm leading-relaxed text-body">
        {t("Siteyi geliştirmek için isteğe bağlı analitik çerezleri kullanmak istiyoruz. Dil ve oturum gibi gerekli çerezler her zaman çalışır.")}{" "}
        <Link href="/privacy" className="font-semibold text-indigo underline underline-offset-4 hover:text-stage">
          {t("Gizlilik Politikası")}
        </Link>
      </p>
      <div className="mt-4 flex gap-3">
        <button type="button" onClick={() => choose("denied")} className={`${buttonBase} border border-line bg-white text-heading hover:bg-porcelain`}>
          {t("Reddet")}
        </button>
        <button type="button" onClick={() => choose("granted")} className={`${buttonBase} bg-stage text-white hover:bg-indigo`}>
          {t("Kabul et")}
        </button>
      </div>
    </div>
  );
}
