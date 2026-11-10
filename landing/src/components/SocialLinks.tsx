"use client";

import type { ReactNode } from "react";
import { useT } from "@/i18n/client";

const SOCIALS = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/spekvia.app/",
    icon: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></>,
  },
  {
    name: "X",
    href: "https://x.com/Spekvia",
    icon: <path d="m4 3 12.5 18H21L8.5 3H4Zm0 18L20 3" />,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@spekvia",
    icon: <><path d="M21 7.5a3 3 0 0 0-2.1-2.1C17.4 5 12 5 12 5s-5.4 0-6.9.4A3 3 0 0 0 3 7.5 25 25 0 0 0 2.5 12a25 25 0 0 0 .5 4.5 3 3 0 0 0 2.1 2.1C6.6 19 12 19 12 19s5.4 0 6.9-.4a3 3 0 0 0 2.1-2.1 25 25 0 0 0 .5-4.5 25 25 0 0 0-.5-4.5Z" /><path d="m10 9 5 3-5 3V9Z" fill="currentColor" stroke="none" /></>,
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@spekvia",
    icon: <path d="M14 3h3a5 5 0 0 0 5 5v3a8 8 0 0 1-5-1.7V16a6 6 0 1 1-6-6v3a3 3 0 1 0 3 3V3Z" />,
  },
] satisfies { name: string; href: string; icon: ReactNode }[];

export default function SocialLinks() {
  const t = useT();
  return (
    <nav aria-label={t("Sosyal medya")} className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {SOCIALS.map((social) => (
        <a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex min-h-14 items-center gap-3 rounded-2xl border-2 border-cream/30 px-4 py-3 text-cream transition-colors hover:border-cream hover:bg-cream hover:text-violet sm:min-h-16"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0">
            {social.icon}
          </svg>
          <span lang="en" className="text-sm font-bold xl:text-base">{social.name}</span>
          <span aria-hidden="true" className="ml-auto text-lg transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
        </a>
      ))}
    </nav>
  );
}
