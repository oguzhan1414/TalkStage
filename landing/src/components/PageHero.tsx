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

const POSTER_TINTS = {
  lilac: 'bg-lilac', mint: 'bg-mint', peach: 'bg-flame',
  pink: 'bg-bubble', sky: 'bg-sky', sun: 'bg-sun',
} as const;

export type HeroTint = keyof typeof TINTS;
export type HeroArt = 'cheer' | 'point' | 'mic' | 'cards' | 'notebook' | 'headphones' | 'passport';

const HERO_ART: Record<HeroArt, string> = {
  cheer: '/assets/mivo/success.webp',
  point: '/assets/mivo/guide.webp',
  mic: '/assets/mivo/speaking.webp',
  cards: '/assets/mivo/guide.webp',
  notebook: '/assets/mivo/thinking.webp',
  headphones: '/assets/mivo/listening.webp',
  passport: '/assets/mivo/wave.webp',
};

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
  variant = 'quiet',
  children,
}: {
  crumbs: Crumb[];
  eyebrow: string;
  title: string;
  intro?: string;
  art: HeroArt;
  tint?: HeroTint;
  variant?: 'quiet' | 'poster';
  children?: ReactNode;
}) {
  const poster = variant === 'poster';
  return (
    <section className={poster ? `relative overflow-hidden border-b-[2.5px] border-ink px-5 pt-28 text-ink sm:px-10 sm:pt-32 ${POSTER_TINTS[tint]}` : "px-4 pt-24 sm:px-6 sm:pt-28"}>
      <div className={poster ? "relative mx-auto max-w-[80rem]" : `relative mx-auto max-w-[88rem] overflow-hidden rounded-[2.25rem] bg-linear-to-br ${TINTS[tint]} sm:rounded-[3rem]`}>
        {!poster && <>
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full bg-white/60 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-purple-pop/15 blur-3xl" />
        </>}

        <div className="relative grid items-end lg:grid-cols-[1.4fr_0.6fr]">
          <div className={poster ? "min-w-0 pb-10 pt-3 sm:pb-14 lg:py-12" : "px-7 pb-8 pt-10 sm:px-12 sm:pt-14 lg:px-16 lg:pb-16 lg:pt-16"}>
            <nav aria-label="Breadcrumb" className={poster ? "flex flex-wrap items-center gap-2 text-xs font-semibold text-ink/70" : "flex flex-wrap items-center gap-2 font-mono text-xs text-heading/55"}>
              {crumbs.map((c, i) => (
                <span key={`${c.label}-${i}`} className="flex items-center gap-2">
                  {i > 0 ? <span aria-hidden>/</span> : null}
                  {c.href ? (
                    <Link href={c.href} className="transition-colors hover:text-stage">{c.label}</Link>
                  ) : (
                    <span aria-current="page" className="font-semibold text-heading">{c.label}</span>
                  )}
                </span>
              ))}
            </nav>
            <p className={poster ? "hand mt-8 inline-block -rotate-2 text-[1.7rem] text-ink sm:text-[2.15rem]" : "mt-6 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-stage"}>{eyebrow}</p>
            <h1 className={poster ? "poster mt-4 max-w-[18ch] break-words text-[clamp(2.35rem,5.4vw,5.9rem)] text-ink" : "mt-3 max-w-3xl text-balance font-display text-4xl font-extrabold leading-[1] tracking-[-0.035em] text-heading sm:text-5xl lg:text-6xl"}>{title}</h1>
            {intro ? <p className={poster ? "mt-6 max-w-[42rem] text-pretty text-[1.05rem] font-medium leading-relaxed text-ink/80 sm:text-lg" : "mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-heading/70"}>{intro}</p> : null}
            {children ? <div className="mt-7">{children}</div> : null}
          </div>

          <div aria-hidden className={poster ? "relative mx-auto -mt-2 h-[12rem] w-[9rem] self-end sm:h-[17rem] sm:w-[12rem] lg:mt-0 lg:h-[28rem] lg:w-[20rem]" : "relative mx-auto h-[14rem] w-[11.2rem] self-end sm:h-[19rem] sm:w-[15.2rem] lg:mr-10 lg:h-[26rem] lg:w-[20.8rem]"}>
            <Image
              src={HERO_ART[art]}
              alt=""
              fill
              sizes="(max-width: 1024px) 240px, 340px"
              className={poster ? "object-contain object-bottom drop-shadow-[5px_5px_0_rgba(27,22,71,0.8)]" : "object-contain object-bottom drop-shadow-[0_24px_28px_rgba(21,18,58,0.25)]"}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
