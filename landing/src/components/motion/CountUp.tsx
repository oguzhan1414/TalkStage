'use client';

import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

import { gsap } from './gsapClient';

/** Counts from 0 to `value` once when it scrolls into view. Shows the final number when motion is reduced. */
export default function CountUp({ value, suffix = '', className = '' }: { value: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const state = { n: 0 };
        el.textContent = `0${suffix}`;
        gsap.to(state, {
          n: value,
          duration: 1.6,
          ease: 'power2.out',
          snap: { n: 1 },
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          onUpdate: () => {
            el.textContent = `${state.n}${suffix}`;
          },
        });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
}
