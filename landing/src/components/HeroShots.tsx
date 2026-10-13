import Image from 'next/image';

import { pickShot, SHOT_RATIO, type ShotSlot } from '@/data/appShots';
import { getLocale } from '@/i18n/server';

const CARD =
  'overflow-hidden rounded-[1.4rem] bg-white shadow-[0_40px_70px_-28px_rgba(54,45,148,0.5),0_18px_30px_-18px_rgba(21,18,58,0.35)] ring-1 ring-white/80 sm:rounded-[1.9rem]';

/** Three real store visuals fanned out: the hero shows the app itself, not a drawing of it. */
export default function HeroShots() {
  const locale = getLocale();
  const cards: { slot: ShotSlot; box: string; rotate: string; delay: string; priority?: boolean; sizes: string }[] = [
    { slot: 'today', box: 'left-0 top-[14%] z-10 w-[43%]', rotate: '-rotate-[7deg]', delay: '-3s', sizes: '(max-width: 640px) 40vw, 220px' },
    { slot: 'listen', box: 'right-0 top-[19%] z-10 w-[43%]', rotate: 'rotate-[7deg]', delay: '-5s', sizes: '(max-width: 640px) 40vw, 220px' },
    { slot: 'scenes', box: 'left-1/2 top-0 z-20 w-[56%] -translate-x-1/2', rotate: '', delay: '0s', priority: true, sizes: '(max-width: 640px) 52vw, 300px' },
  ];
  return (
    <div className="relative mx-auto w-full max-w-[34rem]">
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[88%] w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.28),rgba(14,165,233,0.10)_55%,transparent_70%)] blur-2xl"
      />
      <div className="relative aspect-[1/1.12] w-full">
        {cards.map((c) => {
          const shot = pickShot(locale, [c.slot]);
          return (
            <div key={c.slot} className={`absolute ${c.box}`}>
              <div className={c.rotate}>
                <div className="animate-float" style={{ animationDelay: c.delay }}>
                  <div className={CARD}>
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      width={SHOT_RATIO.width}
                      height={SHOT_RATIO.height}
                      sizes={c.sizes}
                      priority={c.priority}
                      className="h-auto w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
