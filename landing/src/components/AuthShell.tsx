import Image from 'next/image';
import type { ReactNode } from 'react';

import Link from '@/i18n/Link';
import Logo from './Logo';

/**
 * Split screen for sign-in and sign-up: Mivo's artwork and a short line from Mivo on the left (large screens),
 * the form on the right. `art` is a path under /public.
 */
export default function AuthShell({
  art,
  artAlt = '',
  quote,
  mivoLabel,
  header,
  footer,
  children,
}: {
  art: string;
  artAlt?: string;
  quote: string;
  mivoLabel: string;
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white lg:grid lg:grid-cols-[1.02fr_0.98fr]">
      <aside className="relative hidden overflow-hidden rounded-r-[4rem] bg-paper lg:block">
        <Image key={art} src={art} alt={artAlt} fill priority sizes="52vw" className="object-cover object-[62%_40%]" />
        <div aria-hidden className="absolute inset-0 bg-linear-to-t from-white/55 via-transparent to-white/15" />

        <Link href="/" className="absolute left-10 top-8 rounded-full bg-white/90 px-5 py-2.5 shadow-layered backdrop-blur transition-transform hover:scale-105">
          <Logo />
        </Link>

        <div className="absolute inset-x-10 bottom-12 max-w-md">
          <div className="rounded-3xl rounded-bl-md bg-white p-5 shadow-lifted">
            <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-wider text-stage">{mivoLabel}</p>
            <p className="mt-1.5 font-display text-xl font-bold leading-snug tracking-tight text-heading">{quote}</p>
          </div>
        </div>
      </aside>

      <div className="flex min-h-screen flex-col px-5 py-6 sm:px-10">
        <div className="mx-auto flex w-full max-w-xl items-center justify-between gap-4 pb-4">
          <Link href="/" className="shrink-0 transition-transform hover:scale-105 lg:invisible">
            <Logo />
          </Link>
          {header}
        </div>

        {/* phones: the artwork becomes a banner above the form */}
        <div className="relative mx-auto h-36 w-full max-w-xl overflow-hidden rounded-[2rem] lg:hidden">
          <Image key={art} src={art} alt={artAlt} fill sizes="100vw" className="object-cover object-[62%_38%]" />
        </div>

        <div className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center py-6">{children}</div>

        {footer ? <div className="mx-auto w-full max-w-xl pt-4 text-center text-xs text-muted">{footer}</div> : null}
      </div>
    </div>
  );
}
