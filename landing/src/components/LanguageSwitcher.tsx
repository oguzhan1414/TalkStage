"use client";

import { useEffect, useRef, useState } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, writeLocaleCookie } from "@/i18n/client";
import { LOCALES, LOCALE_META, TR_ONLY_ROUTES, type Locale } from "@/i18n/config";
import { parsePath, switchLocalePath } from "@/i18n/paths";

/** Where the language `to` should land: the same page, or home when the page is Turkish-only. */
function targetFor(pathname: string, to: Locale): string {
  const { key } = parsePath(pathname);
  if (key && to !== "tr" && TR_ONLY_ROUTES.includes(key)) return switchLocalePath("/", to);
  return switchLocalePath(pathname, to);
}

/**
 * `variant="menu"`  – compact dropdown for the navbar.
 * `variant="links"` – plain list of language links for the footer (also good for crawlers).
 */
export default function LanguageSwitcher({ variant = "menu" }: { variant?: "menu" | "links" }) {
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !box.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);

  if (variant === "links") {
    return (
      <ul className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[0.88rem] font-semibold">
        {LOCALES.map((l) => (
          <li key={l}>
            <NextLink
              href={targetFor(pathname, l)}
              hrefLang={l}
              prefetch={false}
              lang={l}
              onClick={() => writeLocaleCookie(l)}
              aria-current={l === locale ? "true" : undefined}
              className={l === locale ? "font-extrabold text-sun" : "text-white/60 transition-colors hover:text-white"}
            >
              {LOCALE_META[l].label}
            </NextLink>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div ref={box} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={LOCALE_META[locale].label}
        className="btn-pop h-11 gap-1.5 bg-white px-3 text-[0.85rem] text-ink sm:px-3.5"
      >
        <span aria-hidden>{LOCALE_META[locale].flag}</span>
        <span className="hidden uppercase sm:inline">{locale}</span>
        <svg aria-hidden viewBox="0 0 20 20" className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} fill="currentColor">
          <path d="M5.5 7.5 10 12l4.5-4.5-1-1L10 10 6.5 6.5z" />
        </svg>
      </button>
      {open && (
        <ul
          role="listbox"
          className="stk-sm absolute right-0 top-full z-50 mt-3 min-w-40 overflow-hidden rounded-2xl bg-white p-1.5"
        >
          {LOCALES.map((l) => (
            <li key={l} role="option" aria-selected={l === locale}>
              <NextLink
                href={targetFor(pathname, l)}
                hrefLang={l}
              prefetch={false}
                lang={l}
                onClick={() => {
                  writeLocaleCookie(l);
                  setOpen(false);
                }}
                className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-[0.85rem] transition-colors hover:bg-paper-deep ${
                  l === locale ? "font-bold text-heading" : "font-medium text-body"
                }`}
              >
                <span aria-hidden>{LOCALE_META[l].flag}</span>
                {LOCALE_META[l].label}
              </NextLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
