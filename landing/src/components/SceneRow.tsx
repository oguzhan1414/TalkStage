'use client';

import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import { useRef } from 'react';

import { gsap } from '@/components/motion/gsapClient';
import { useT } from '@/i18n/client';

export type SceneCard = { slug: string; title: string; level: string; min: number };

/**
 * The scene cards drift sideways as the page scrolls (scrubbed, no pin) and lift slightly on hover.
 * Without motion (or on touch, where the row is a normal swipeable strip) they simply sit in a scrollable row.
 */
export default function SceneRow({ scenes }: { scenes: SceneCard[] }) {
  const t = useT();
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      const w = wrap.current;
      const tr = track.current;
      if (!w || !tr) return;
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const distance = () => Math.max(0, tr.scrollWidth - w.clientWidth);
        gsap.fromTo(
          tr,
          { x: 0 },
          {
            x: () => -distance(),
            ease: 'none',
            scrollTrigger: { trigger: w, start: 'top 85%', end: 'bottom 15%', scrub: 0.8, invalidateOnRefresh: true },
          }
        );
      });
      return () => mm.revert();
    },
    { scope: wrap }
  );

  return (
    <div ref={wrap} className="no-scrollbar -mx-5 overflow-x-auto px-5 sm:-mx-8 sm:px-8 md:overflow-x-clip">
      <ul ref={track} className="flex w-max gap-4 pb-6 pt-2">
        {scenes.map((scene) => (
          <li key={scene.slug} className="group w-[15.5rem] shrink-0 sm:w-[17rem]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem] bg-paper-deep shadow-layered transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-lifted">
              <Image
                src={`/scenes/${scene.slug}.webp`}
                alt=""
                fill
                sizes="272px"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
              />
              <div aria-hidden className="absolute inset-0 bg-linear-to-t from-ink/80 via-ink/10 to-transparent" />
              <span className="absolute left-3 top-3 rounded-full bg-white/85 px-2.5 py-1 font-mono text-[0.65rem] font-bold text-stage backdrop-blur">{scene.level}</span>
              <span className="absolute right-3 top-3 rounded-full bg-ink/55 px-2.5 py-1 font-mono text-[0.65rem] text-white backdrop-blur">{t('{{min}} dk', { min: scene.min })}</span>
              <p className="absolute inset-x-4 bottom-4 font-display text-lg font-bold leading-tight text-white">{t(scene.title)}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
