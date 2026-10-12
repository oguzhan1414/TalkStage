'use client';

import { useGSAP } from '@gsap/react';
import { useRef, type ReactNode } from 'react';

import { gsap } from './gsapClient';

/**
 * Moves its content a little against the scroll direction (parallax). `speed` is the share of the section height
 * it travels (0.1 = subtle). Disabled for people who asked the OS for reduced motion.
 */
export default function ParallaxLayer({
  children,
  speed = 0.12,
  className = '',
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          el,
          { yPercent: speed * 60 },
          {
            yPercent: -speed * 60,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
          }
        );
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className} style={{ willChange: 'transform' }}>
      {children}
    </div>
  );
}
