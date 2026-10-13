import Image from 'next/image';

import { allShots, SHOT_RATIO, type Shot } from '@/data/appShots';
import { getLocale, getT } from '@/i18n/server';

/** A slow ribbon of every store visual right under the hero: shows how much is inside the app at a glance. */
export default function ShotMarquee() {
  const t = getT();
  const shots = allShots(getLocale());
  const card = (shot: Shot, i: number, copy: boolean) => (
    <li
      key={`${copy ? 'b' : 'a'}-${i}`}
      aria-hidden={copy || undefined}
      className="w-[10.5rem] shrink-0 overflow-hidden rounded-[1.4rem] bg-white shadow-[0_24px_44px_-22px_rgba(54,45,148,0.45)] ring-1 ring-line sm:w-[12.5rem]"
    >
      <Image
        src={shot.src}
        alt={copy ? '' : shot.alt}
        width={SHOT_RATIO.width}
        height={SHOT_RATIO.height}
        sizes="200px"
        className="h-auto w-full"
      />
    </li>
  );
  return (
    <section aria-label={t("Uygulamanın içinden")} className="relative overflow-hidden bg-white pb-20 pt-4 sm:pb-24">
      <p className="mb-8 text-center font-mono text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-stage">{t("Uygulamanın içinden")}</p>
      <div className="[mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
        <ul className="flex w-max animate-marquee gap-5 px-2.5 py-4 hover:[animation-play-state:paused] motion-reduce:animate-none">
          {shots.map((s, i) => card(s, i, false))}
          {shots.map((s, i) => card(s, i, true))}
        </ul>
      </div>
    </section>
  );
}
