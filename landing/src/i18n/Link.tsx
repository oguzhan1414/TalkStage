"use client";

import { forwardRef, type ComponentProps } from "react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useLocale } from "./client";
import { localizePath } from "./paths";

type LinkProps = Omit<ComponentProps<typeof NextLink>, "href"> & { href: string };

/**
 * Drop-in for next/link. `href` is the language-neutral internal path
 * (`/contact`, `/#pricing`, `/blog/slug`); it is turned into the public URL for the
 * current language (`/iletisim`, `/en/contact`, `/de/kontakt`, …).
 */
const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link({ href, ...props }, ref) {
  const locale = useLocale();
  return <NextLink ref={ref} href={localizePath(href, locale)} {...props} />;
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
