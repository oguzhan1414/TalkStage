"use client";

import { AppleMark, PlayMark } from "@/components/StoreMarks";
import { androidStoreUrl, iosStoreUrl } from "@/lib/links";
import { trackEvent } from "@/lib/analytics";
import { useT } from "@/i18n/client";

/** The two store buttons. `tone="cloth"` sits on the indigo cover, `tone="page"` on paper. */
export default function StoreButtons({ tone, location }: { tone: "cloth" | "page"; location: string }) {
  const t = useT();
  const base =
    "press inline-flex min-w-[11.5rem] items-center gap-3 rounded-2xl px-5 py-3 focus-visible:outline-offset-4";
  const look =
    tone === "cloth"
      ? "bg-page text-cloth-deep shadow-[0_14px_24px_-14px_rgba(0,0,0,0.6)] hover:bg-white"
      : "bg-cloth text-white shadow-[0_14px_24px_-14px_rgba(24,20,77,0.7)] hover:bg-cloth-deep";
  const sub = tone === "cloth" ? "text-cloth/60" : "text-on-cloth/70";
  const stores = [
    { href: iosStoreUrl, mark: <AppleMark />, name: t("App Store"), store: "ios" },
    { href: androidStoreUrl, mark: <PlayMark />, name: t("Google Play"), store: "android" },
  ];
  return (
    <div className="flex flex-wrap gap-3">
      {stores.map((s) => (
        <a key={s.store} href={s.href} onClick={() => trackEvent("cta_clicked", { location, store: s.store })} className={`${base} ${look}`}>
          {s.mark}
          <span className="text-left leading-tight">
            <span className={`block text-[0.66rem] font-semibold ${sub}`}>{t("İndir")}</span>
            <span className="block text-[1rem] font-bold">{s.name}</span>
          </span>
        </a>
      ))}
    </div>
  );
}
