import Image from 'next/image';
import type { ReactNode } from 'react';

import Link from '@/i18n/Link';

const TINTS = {
  lilac: 'from-[#e6e0ff] via-[#efeaff] to-[#dff0ff]',
  mint: 'from-[#d6f4e4] via-[#e8f9f0] to-[#e3f3ff]',
  peach: 'from-[#ffe6cf] via-[#fff1e3] to-[#ffe4ef]',
  pink: 'from-[#ffdfe9] via-[#fff0f5] to-[#e9e4ff]',
  sky: 'from-[#d8ecff] via-[#eaf5ff] to-[#e9e4ff]',
  sun: 'from-[#ffefc2] via-[#fff7e0] to-[#ffe6cf]',
} as const;

export type HeroTint = keyof typeof TINTS;
export type HeroArt = 'cheer' | 'point' | 'mic' | 'cards' | 'notebook' | 'headphones' | 'passport';

export type Crumb = { label: string; href?: string };

/**
 * Shared banner for the inner pages: breadcrumb, eyebrow, big title and a Mivo pose standing on the card edge.
 * Takes already translated strings so server and client pages can both use it.
 */
export default function PageHero({
  crumbs,
  eyebrow,
  title,
  intro,
  art,
  tint = 'lilac',
  children,
}: {
  crumbs: Crumb[];
  eyebrow: string;
  title: string;
  intro?: string;
  art: HeroArt;
  tint?: HeroTint;
  children?: ReactNode;
}) {
  return (
    <section className="px-4 pt-24 sm:px-6 sm:pt-28">
      <div className={`relative mx-auto max-w-[88rem] overflow-hidden rounded-[2.25rem] bg-linear-to-br ${TINTS[tint]} sm:rounded-[3rem]`}>
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full bg-white/60 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-purple-pop/15 blur-3xl" />

        <div className="relative grid items-end lg:grid-cols-[1.4fr_0.6fr]">
          <div className="px-7 pb-8 pt-10 sm:px-12 sm:pt-14 lg:px-16 lg:pb-16 lg:pt-16">
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 font-mono text-xs text-heading/55">
              {crumbs.map((c, i) => (
                <span key={`${c.label}-${i}`} className="flex items-center gap-2">
                  {i > 0 ? <span aria-hidden>/</span> : null}
                  {c.href ? (
                    <Link href={c.href} className="transition-colors hover:text-stage">{c.label}</Link>
                  ) : (
                    <span className="font-semibold text-heading">{c.label}</span>
                  )}
                </span>
              ))}
            </nav>
            <p className="mt-6 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-stage">{eyebrow}</p>
            <h1 className="mt-3 max-w-3xl text-balance font-display text-4xl font-extrabold leading-[1] tracking-[-0.035em] text-heading sm:text-5xl lg:text-6xl">{title}</h1>
            {intro ? <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-heading/70">{intro}</p> : null}
            {children ? <div className="mt-7">{children}</div> : null}
          </div>

          <div aria-hidden className="relative mx-auto h-[14rem] w-[11.2rem] self-end sm:h-[19rem] sm:w-[15.2rem] lg:mr-10 lg:h-[26rem] lg:w-[20.8rem]">
            <Image
              src={`/mivo/stops/mivo_stop_${art}.webp`}
              alt=""
              fill
              sizes="(max-width: 1024px) 240px, 340px"
              className="object-contain object-bottom drop-shadow-[0_24px_28px_rgba(21,18,58,0.25)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
