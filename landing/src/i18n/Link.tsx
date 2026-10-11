"use client";

import { forwardRef, type ComponentProps } from "react";
import NextLink from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "./client";
import { localizePath } from "./paths";

type LinkProps = Omit<ComponentProps<typeof NextLink>, "href"> & { href: string };

/**
 * Drop-in for next/link. `href` is the language-neutral internal path
 * (`/contact`, `/#pricing`, `/blog/slug`); it is turned into the public URL for the
 * current language (`/iletisim`, `/en/contact`, `/de/kontakt`, …).
 */
const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link({ href, onClick, ...props }, ref) {
  const locale = useLocale();
  const pathname = usePathname();
  const target = localizePath(href, locale);

  return (
    <NextLink
      ref={ref}
      href={target}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        // Same-page section link: scroll smoothly and keep the address bar clean (no #fragment).
        const at = target.indexOf("#");
        if (at < 0) return;
        const path = target.slice(0, at) || "/";
        const trim = (p: string) => (p.length > 1 && p.endsWith("/") ? p.slice(0, -1) : p);
        if (trim(path) !== trim(pathname)) return;
        const el = document.getElementById(target.slice(at + 1));
        if (!el) return;
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState(null, "", path);
      }}
      {...props}
    />
  );
});

export default Link;

/** next/navigation's router with the same path localization. */
export function useLocalizedRouter() {
  const router = useRouter();
  const locale = useLocale();
  return {
    push: (href: string) => router.push(localizePath(href, locale)),
    replace: (href: string) => router.replace(localizePath(href, locale)),
  };
}
