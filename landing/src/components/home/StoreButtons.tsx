"use client";

import { AppleMark, PlayMark } from "@/components/StoreMarks";
import { androidStoreUrl, iosStoreUrl } from "@/lib/links";
import { trackEvent } from "@/lib/analytics";
import { useT } from "@/i18n/client";

/**
 * The two store buttons as sinking pills. `on="dark"` is for ink and violet grounds, where the dark pill would vanish.
 */
export default function StoreButtons({
  location,
  on = "light",
  size = "lg",
  className = "",
}: {
  location: string;
  on?: "light" | "dark";
  size?: "md" | "lg";
  className?: string;
}) {
  const t = useT();
  const pad = size === "lg" ? "min-h-[3.6rem] px-6 py-2.5" : "min-h-[3.1rem] px-5 py-2";
  const first = on === "dark" ? "bg-sun text-ink" : "bg-ink text-white";
  const second = "bg-white text-ink";
  const stores = [
    { href: androidStoreUrl, mark: <PlayMark />, name: t("Google Play"), store: "android", look: first },
    { href: iosStoreUrl, mark: <AppleMark />, name: t("App Store"), store: "ios", look: second },
  ];
  return (
    <div className={`flex flex-wrap gap-x-4 gap-y-5 ${className}`}>
      {stores.map((s) => {
        const content = <>
          {s.mark}
          <span className="min-w-0 text-left leading-tight">
            <span className="block text-[0.66rem] font-bold uppercase tracking-[0.08em] opacity-70">{s.href ? t("İndir") : t("Yakında")}</span>
            <span lang="en" className="block text-[1.05rem] font-extrabold">{s.name}</span>
          </span>
        </>;

        return s.href ? (
          <a
            key={s.store}
            href={s.href}
            onClick={() => trackEvent("cta_clicked", { location, store: s.store })}
            className={`btn-pop ${pad} ${s.look}`}
          >
            {content}
          </a>
        ) : (
          <span key={s.store} aria-disabled="true" className={`inline-flex items-center justify-center gap-2.5 rounded-full border-[2.5px] border-ink/40 ${pad} ${s.look} opacity-65`}>
            {content}
          </span>
        );
      })}
    </div>
  );
}
