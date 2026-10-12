import type { ReactNode } from 'react';

/** A modern phone: thin dark bezel, rounded screen, speaker pill. Pure CSS so it stays sharp and light. */
export default function PhoneFrame({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`relative aspect-[9/18.6] w-[16.5rem] rounded-[2.6rem] bg-[#0f0c2e] p-[0.55rem] shadow-[0_60px_110px_-30px_rgba(54,45,148,0.55),0_30px_50px_-30px_rgba(21,18,58,0.6)] ring-1 ring-white/10 sm:w-[18.5rem] ${className}`}
    >
      <div aria-hidden className="absolute left-1/2 top-[0.95rem] z-20 h-[1.1rem] w-[4.2rem] -translate-x-1/2 rounded-full bg-[#0f0c2e]" />
      <div className="relative h-full w-full overflow-hidden rounded-[2.1rem] bg-white">{children}</div>
      {/* glass reflection */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[2.6rem] bg-linear-to-br from-white/15 via-transparent to-transparent"
      />
    </div>
  );
}
