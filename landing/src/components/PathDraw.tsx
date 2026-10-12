'use client';

import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

import { gsap } from '@/components/motion/gsapClient';
import { useT } from '@/i18n/client';

const NODES = [
  { x: 40, y: 150, done: true },
  { x: 150, y: 70, done: true },
  { x: 270, y: 140, done: true },
  { x: 385, y: 60, done: false },
  { x: 500, y: 130, done: false },
  { x: 610, y: 55, done: false },
];
const D = 'M40 150 C 90 150, 100 70, 150 70 S 230 140, 270 140 S 345 60, 385 60 S 460 130, 500 130 S 570 55, 610 55';

/** A winding road that draws itself as it scrolls into view; the day nodes light up one by one. */
export default function PathDraw() {
  const t = useT();
  const root = useRef<HTMLDivElement>(null);
  const path = useRef<SVGPathElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      const p = path.current;
      if (!el || !p) return;
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
        gsap.set('.pd-node', { scale: 0, transformOrigin: '50% 50%' });
        gsap.set('.pd-label', { opacity: 0, y: 6 });
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 80%', end: 'top 25%', scrub: 0.8 } });
        tl.to(p, { strokeDashoffset: 0, ease: 'none', duration: 1 }, 0);
        NODES.forEach((_, i) => {
          const at = (i / (NODES.length - 1)) * 0.9;
          tl.to(`.pd-node-${i}`, { scale: 1, duration: 0.12, ease: 'back.out(2)' }, at);
          tl.to(`.pd-label-${i}`, { opacity: 1, y: 0, duration: 0.12 }, at + 0.03);
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <div ref={root} className="mt-2 w-full">
      <svg viewBox="0 0 650 200" role="img" aria-label={t('Gün gün yolun')} className="h-auto w-full overflow-visible">
        <path d={D} fill="none" stroke="rgba(79,70,229,0.14)" strokeWidth="10" strokeLinecap="round" />
        <path ref={path} d={D} fill="none" stroke="url(#pd-grad)" strokeWidth="10" strokeLinecap="round" />
        <defs>
          <linearGradient id="pd-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#4f46e5" />
            <stop offset="0.6" stopColor="#7c5cff" />
            <stop offset="1" stopColor="#0ea5e9" />
          </linearGradient>
        </defs>
        {NODES.map((n, i) => (
          <g key={i}>
            <g className={`pd-node pd-node-${i}`}>
              <circle cx={n.x} cy={n.y} r="22" fill="#fff" stroke={n.done ? '#10b981' : '#4f46e5'} strokeWidth="4" />
              <text x={n.x} y={n.y + 5} textAnchor="middle" fontSize="15" fontWeight="800" fill={n.done ? '#10b981' : '#4f46e5'}>
                {n.done ? '✓' : i + 1}
              </text>
            </g>
            <text className={`pd-label pd-label-${i}`} x={n.x} y={n.y + 46} textAnchor="middle" fontSize="12" fontWeight="700" fill="#6b6889">
              {t('GÜN')} {i + 1}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
