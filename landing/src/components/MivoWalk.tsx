'use client';

import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import { useRef, useState } from 'react';

import { gsap } from '@/components/motion/gsapClient';
import { useT } from '@/i18n/client';
import { tr } from '@/i18n/shared';

const WALK_FRAMES = [1, 2, 3, 4, 5, 6].map((n) => `/mivo/walk/mivo_walk_${n}.webp`);

type Stop = 'point' | 'passport' | 'mic' | 'cards' | 'notebook' | 'headphones' | 'cheer';

const SCENES: { slug: string; title: string; level: string; stop: Stop }[] = [
  { slug: 'airport-travel', title: tr("Havalimanında check-in"), level: 'A1', stop: 'passport' },
  { slug: 'hotel-checkin', title: tr("Otelde check-in"), level: 'A1', stop: 'point' },
  { slug: 'restaurant-dinner', title: tr("İtalyan restoranında akşam yemeği"), level: 'A2', stop: 'cards' },
  { slug: 'taxi-ride', title: tr("Londra’da taksi yolculuğu"), level: 'A2', stop: 'mic' },
  { slug: 'doctor-visit', title: tr("Doktor muayenesi"), level: 'A2', stop: 'notebook' },
  { slug: 'istanbul-tour', title: tr("İstanbul şehir turu"), level: 'A2', stop: 'headphones' },
  { slug: 'job-interview', title: tr("İş mülakatı"), level: 'B1', stop: 'mic' },
  { slug: 'flea-market', title: tr("Bitpazarında pazarlık"), level: 'B1', stop: 'cards' },
  { slug: 'fitness-gym', title: tr("Spor salonunda antrenman"), level: 'A2', stop: 'cheer' },
];

const STOPS: Stop[] = ['point', 'passport', 'mic', 'cards', 'notebook', 'headphones', 'cheer'];
const stopSrc = (s: Stop) => `/mivo/stops/mivo_stop_${s}.webp`;

const STAND = 0.42; // share of each scene's scroll spent standing; the rest is walking to the next one
const smoother = (x: number) => x * x * x * (x * (x * 6 - 15) + 10);

/**
 * Mivo walks from scene to scene as you scroll. The page pins; the scene windows slide past while Mivo
 * cycles through the walk frames, then stops and strikes a pose in each scene. Without motion (or
 * reduced motion) the scenes are a plain swipeable row and Mivo stands still.
 */
export default function MivoWalk() {
  const t = useT();
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const ground = useRef<HTMLDivElement>(null);
  const clouds = useRef<HTMLDivElement>(null);
  const walkImgs = useRef<(HTMLImageElement | null)[]>([]);
  const stopImgs = useRef<(HTMLImageElement | null)[]>([]);
  const mivo = useRef<HTMLDivElement>(null);
  const [scene, setScene] = useState(0);
  const [standing, setStanding] = useState(true);

  useGSAP(
    () => {
      const el = root.current;
      const tk = track.current;
      if (!el || !tk) return;
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const proxy = { p: 0 };
        let lastScene = -1;
        let lastStanding: boolean | null = null;
        let lastFrame = -2;
        let lastStop = '';

        const cards = Array.from(tk.children) as HTMLElement[];
        const geom = () => {
          const first = cards[0];
          const second = cards[1];
          const step = second.offsetLeft - first.offsetLeft;
          const vw = el.clientWidth;
          const target = vw < 640 ? vw * 0.66 : vw * 0.6;
          return { step, offset: target - first.offsetWidth / 2 - first.offsetLeft };
        };

        const setPose = (frame: number, stop: string) => {
          if (frame !== lastFrame || stop !== lastStop) {
            walkImgs.current.forEach((img, i) => img && (img.style.opacity = !stop && i === frame ? '1' : '0'));
            stopImgs.current.forEach((img, i) => img && (img.style.opacity = stop && STOPS[i] === stop ? '1' : '0'));
            lastFrame = frame;
            lastStop = stop;
          }
        };

        const render = () => {
          const n = SCENES.length;
          const u = proxy.p * (n - 1);
          const k = Math.min(Math.floor(u), n - 1);
          const f = k === n - 1 ? 0 : u - k;
          const walking = f > STAND;
          const w = walking ? (f - STAND) / (1 - STAND) : 0;
          const pos = k + (walking ? smoother(w) : 0);
          const { step, offset } = geom();

          gsap.set(tk, { x: offset - pos * step });
          if (ground.current) ground.current.style.backgroundPositionX = `${-pos * step}px`;
          if (clouds.current) clouds.current.style.transform = `translateX(${-pos * step * 0.25}px)`;

          if (walking) {
            const frame = Math.floor(w * 14) % WALK_FRAMES.length;
            setPose(frame, '');
            if (mivo.current) mivo.current.style.transform = `translateX(-50%) translateY(${-Math.abs(Math.sin(w * 14 * Math.PI)) * 7}px)`;
          } else {
            setPose(0, SCENES[k].stop);
            if (mivo.current) mivo.current.style.transform = 'translateX(-50%)';
          }

          const active = walking && w > 0.5 ? k + 1 : k;
          if (active !== lastScene) {
            lastScene = active;
            setScene(active);
          }
          if (!walking !== lastStanding) {
            lastStanding = !walking;
            setStanding(!walking);
          }
        };

        gsap.to(proxy, {
          p: 1,
          ease: 'none',
          onUpdate: render,
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: () => `+=${SCENES.length * 52}%`,
            pin: true,
            scrub: 0.5,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        render();
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  const current = SCENES[scene];

  return (
    <section
      ref={root}
      aria-labelledby="walk-title"
      className="relative h-[100svh] min-h-[38rem] overflow-hidden bg-linear-to-b from-white via-paper to-[#e9e4ff] motion-reduce:h-auto motion-reduce:min-h-0 motion-reduce:overflow-visible motion-reduce:py-24"
    >
      <div ref={clouds} aria-hidden className="pointer-events-none absolute inset-0 motion-reduce:hidden">
        <div className="absolute left-[8%] top-[18%] h-64 w-[26rem] rounded-full bg-white/70 blur-2xl" />
        <div className="absolute left-[70%] top-[10%] h-52 w-[22rem] rounded-full bg-purple-pop/15 blur-3xl" />
        <div className="absolute left-[120%] top-[22%] h-64 w-[26rem] rounded-full bg-white/70 blur-2xl" />
        <div className="absolute left-[170%] top-[12%] h-52 w-[22rem] rounded-full bg-spot/15 blur-3xl" />
      </div>

      <div className="relative z-10 px-5 pt-24 sm:px-8 sm:pt-28 motion-reduce:pt-0">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-stage">{t("Sahneler")}</p>
          <h2 id="walk-title" className="mt-3 max-w-2xl text-balance font-display text-4xl font-extrabold leading-[0.98] tracking-[-0.035em] text-heading sm:text-6xl">{t("Mivo seni sahneden sahneye götürür.")}</h2>
        </div>
      </div>

      {/* scene windows slide past; with reduced motion they are a normal swipeable row */}
      <ul
        ref={track}
        className="absolute left-0 top-[34%] z-10 flex w-max gap-10 will-change-transform motion-reduce:static motion-reduce:mt-12 motion-reduce:w-full motion-reduce:snap-x motion-reduce:overflow-x-auto motion-reduce:px-5 motion-reduce:pb-6"
      >
        {SCENES.map((s) => (
          <li key={s.slug} className="w-[min(72vw,38rem)] shrink-0 motion-reduce:snap-center">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[1.75rem] bg-paper-deep shadow-lifted ring-1 ring-white/80 sm:rounded-[2.25rem]">
              <Image src={`/scenes/${s.slug}.webp`} alt="" fill sizes="(max-width: 640px) 72vw, 608px" className="object-cover" />
              <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 font-mono text-[0.65rem] font-bold text-stage backdrop-blur motion-safe:hidden">{s.level}</span>
              <p className="absolute inset-x-4 bottom-3 font-display text-base font-bold leading-tight text-white drop-shadow motion-safe:hidden">{t(s.title)}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* the road */}
      <div
        ref={ground}
        aria-hidden
        className="absolute inset-x-0 bottom-[17svh] z-10 h-1.5 bg-[repeating-linear-gradient(90deg,rgba(79,70,229,0.35)_0,rgba(79,70,229,0.35)_22px,transparent_22px,transparent_44px)] [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)] motion-reduce:hidden"
      />

      {/* Mivo */}
      <div
        ref={mivo}
        aria-hidden
        className="pointer-events-none absolute bottom-[calc(17svh-1.2rem)] left-[28vw] z-20 aspect-[4/5] h-[46svh] max-h-[27rem] -translate-x-1/2 sm:left-[24vw] motion-reduce:hidden"
      >
        {WALK_FRAMES.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={src} ref={(n) => { walkImgs.current[i] = n; }} src={src} alt="" width={640} height={800} className="absolute inset-0 h-full w-full object-contain" style={{ opacity: 0 }} />
        ))}
        {STOPS.map((s, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={s} ref={(n) => { stopImgs.current[i] = n; }} src={stopSrc(s)} alt="" width={640} height={800} className="absolute inset-0 h-full w-full object-contain" style={{ opacity: i === 0 ? 1 : 0 }} />
        ))}
      </div>

      {/* what Mivo says at each stop */}
      <div
        aria-live="polite"
        className={`pointer-events-none absolute bottom-[50svh] left-[calc(28vw+9svh)] z-30 max-w-[calc(100vw-28vw-9svh-1rem)] transition-all duration-500 sm:bottom-[44svh] sm:left-[calc(24vw+17svh)] sm:max-w-[19rem] motion-reduce:hidden ${
          standing ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
        }`}
      >
        <div className="rounded-3xl rounded-bl-md bg-white p-4 shadow-lifted">
          <p className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-wider text-muted">
            <span className="font-bold text-stage">{t('Mivo')}</span>
            <span className="rounded-full bg-stage px-2 py-0.5 text-[0.6rem] font-bold text-white">{current.level}</span>
          </p>
          <p className="mt-1 font-display text-lg font-bold leading-tight text-heading">{t(current.title)}</p>
        </div>
      </div>

      <div aria-hidden className="absolute inset-x-0 bottom-[6svh] z-20 flex justify-center gap-1.5 motion-reduce:hidden">
        {SCENES.map((s, i) => (
          <span key={s.slug} className={`h-1.5 rounded-full transition-all duration-300 ${i === scene ? 'w-7 bg-stage' : 'w-1.5 bg-stage/30'}`} />
        ))}
      </div>
    </section>
  );
}
