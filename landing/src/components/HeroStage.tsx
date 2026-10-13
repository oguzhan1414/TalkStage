'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { TAKES } from '@/data/heroTakes';
import { useT } from '@/i18n/client';

const SCENE_MS = 8600;

const pop = (delay: number) => ({ animation: `stage-in 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}s both` });

/**
 * The hero's right side: Mivo's own artwork bleeding off the edge of the page. Mivo plays the person on the
 * other side of the conversation, the learner slips, Mivo fixes it; then the next scene takes over.
 */
export default function HeroStage() {
  const t = useT();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setI((n) => (n + 1) % TAKES.length), SCENE_MS);
    return () => clearInterval(id);
  }, []);

  const take = TAKES[i];

  return (
    <div className="relative lg:absolute lg:inset-y-0 lg:right-0 lg:w-[52%]">
      <div className="relative h-[27rem] overflow-hidden rounded-b-[2.5rem] shadow-lifted sm:h-[34rem] lg:h-full lg:rounded-b-none lg:rounded-bl-[5.5rem] lg:shadow-none">
        {TAKES.map((tk, idx) => (
          <Image
            key={tk.image}
            src={tk.image}
            alt=""
            fill
            priority={idx === 0}
            sizes="(max-width: 1024px) 100vw, 52vw"
            style={{ objectPosition: tk.objectPosition }}
            className={`object-cover transition-opacity duration-1000 ${idx === i ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}

        <div className="absolute left-5 top-24 flex items-center gap-2 sm:left-8 lg:left-10 lg:top-28">
          <span className="rounded-full bg-white/90 px-3 py-1.5 text-[0.78rem] font-bold text-heading shadow-layered backdrop-blur">{t(take.scene)}</span>
          <span className="rounded-full bg-stage px-2.5 py-1.5 font-mono text-[0.68rem] font-bold text-white">{take.level}</span>
        </div>

        <div aria-hidden className="absolute right-5 top-24 flex items-center gap-1.5 sm:right-8 lg:right-10 lg:top-28">
          {TAKES.map((tk, idx) => (
            <span key={tk.image} className={`h-1.5 rounded-full bg-white shadow-layered transition-all duration-500 ${idx === i ? 'w-7' : 'w-1.5 opacity-70'}`} />
          ))}
        </div>

        <div key={`line-${i}`} className="absolute bottom-24 left-5 max-w-[17rem] sm:left-8 lg:bottom-auto lg:left-10 lg:top-[40%] lg:max-w-[19rem]" style={pop(0.5)}>
          <div className="rounded-3xl rounded-bl-md bg-white p-4 shadow-lifted">
            <p className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-wider text-muted">
              <span className="font-bold text-stage">{t('Mivo')}</span>
              {t(take.role)}
            </p>
            <p className="mt-1.5 text-[0.98rem] font-semibold leading-snug text-heading">{take.line}</p>
          </div>
        </div>
      </div>

      <div className="relative z-10 -mt-20 px-5 sm:px-8 lg:absolute lg:-left-10 lg:bottom-12 lg:mt-0 lg:w-[25rem] lg:px-0">
        <div key={`you-${i}`} style={pop(2.2)}>
          <div className="rounded-3xl bg-linear-to-br from-stage to-purple-pop p-4 text-white shadow-[0_30px_60px_-20px_rgba(79,70,229,0.7)] sm:p-5">
            <p className="text-[1.02rem] font-medium leading-snug">
              {take.said.map((seg, k) =>
                seg.bad ? (
                  <span key={k}>
                    <span className="text-white/60 line-through decoration-2">{seg.text}</span>{' '}
                    <span className="inline-block rounded-md bg-white px-1.5 py-0.5 font-bold text-stage" style={pop(3.4)}>
                      {seg.fix}
                    </span>
                  </span>
                ) : (
                  <span key={k}>{seg.text}</span>
                )
              )}
            </p>
          </div>
          <div className="mt-2.5 flex items-start gap-3 rounded-3xl border border-line bg-white p-4 shadow-layered" style={pop(4.1)}>
            <Image src="/mivo/idle.webp" alt="" width={36} height={44} className="mt-0.5 h-10 w-auto shrink-0" />
            <p className="text-[0.86rem] leading-snug text-body">
              <span className="mr-1.5 font-bold text-stage">{t('Mivo')}</span>
              {t(take.note)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
