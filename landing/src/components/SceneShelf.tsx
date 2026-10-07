import Image from 'next/image';
import { Star } from 'lucide-react';
import Reveal from './Reveal';
import TwistDemo from './TwistDemo';

const SCENES = [
  { slug: 'hotel-checkin', title: 'Otelde check-in', level: 'A1', min: 6 },
  { slug: 'restaurant-dinner', title: 'İtalyan restoranında akşam yemeği', level: 'A2', min: 7 },
  { slug: 'taxi-ride', title: 'Londra’da taksi yolculuğu', level: 'A2', min: 7 },
  { slug: 'doctor-visit', title: 'Doktor muayenesi', level: 'A2', min: 8 },
  { slug: 'istanbul-tour', title: 'İstanbul şehir turu', level: 'A2', min: 10 },
  { slug: 'job-interview', title: 'İş mülakatı', level: 'B1', min: 8 },
  { slug: 'flea-market', title: 'Bitpazarında pazarlık', level: 'B1', min: 6 },
  { slug: 'airport-travel', title: 'Havalimanında check-in', level: 'A1', min: 6 },
];

const STARS = [
  { n: 1, title: 'Videoyu bitir', text: 'Sahnenin kısa videosunu izle, cümleleri sesli tekrar et.' },
  { n: 2, title: 'Mivo ile canlı oyna', text: 'Karakteri Mivo oynar. En az dört cümle konuş.' },
  { n: 3, title: 'Temiz tamamla', text: 'Sahnenin hedeflerini en fazla iki düzeltmeyle bitir.' },
];

export default function SceneShelf() {
  return (
    <section id="sahneler" className="scroll-mt-24 bg-white px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-3xl">
          <p className="font-mono text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-stage">Sahneler</p>
          <h2 className="mt-4 text-balance font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.03em] text-heading sm:text-6xl">
            Aynı sahne, her seferinde farklı bir sürpriz.
          </h2>
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-body">
            Önce kısa bir videoyla sahneyi tanırsın, sonra Mivo karakteri canlı oynar. Tekrar oynadığında karşına başka bir
            durum çıkar: karışıklık, bitmiş ürün, aceleci bir görevli. Ezber çalışmaz, o yüzden gerçekten konuşmayı öğrenirsin.
          </p>
        </Reveal>

        <div className="mt-14 grid items-start gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          <Reveal>
            <TwistDemo />
          </Reveal>

          <Reveal delay={120}>
            <h3 className="font-display text-2xl font-bold tracking-tight text-heading">Her sahnede üç yıldız var</h3>
            <ol className="mt-6 space-y-5">
              {STARS.map((s) => (
                <li key={s.n} className="flex gap-4">
                  <span aria-label={`${s.n} yıldız`} className="mt-1 flex w-[3.4rem] shrink-0 gap-0.5">
                    {[1, 2, 3].map((i) => (
                      <Star
                        key={i}
                        aria-hidden
                        className={`h-4 w-4 ${i <= s.n ? 'fill-slate-yellow text-slate-yellow' : 'text-line'}`}
                      />
                    ))}
                  </span>
                  <div>
                    <p className="font-semibold text-heading">{s.title}</p>
                    <p className="mt-0.5 text-[0.95rem] leading-relaxed text-body">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-8 rounded-2xl border border-line bg-paper px-5 py-4 text-[0.92rem] leading-relaxed text-body">
              Seviyene uygun sahneler açık gelir, bir üst seviye “zor” etiketiyle denenebilir. Daha ilerisi, önceki seviyeyi
              bitirince açılır.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-16">
          <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {SCENES.map((scene) => (
              <li key={scene.slug} className="group">
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-paper-deep">
                  <Image
                    src={`/scenes/${scene.slug}.webp`}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 50vw, 280px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-2.5 top-2.5 rounded-full bg-slate-yellow px-2 py-0.5 font-mono text-[0.65rem] font-bold text-ink">
                    {scene.level}
                  </span>
                  <span className="absolute bottom-2.5 right-2.5 rounded-full bg-ink/70 px-2 py-0.5 font-mono text-[0.65rem] text-white backdrop-blur">
                    {scene.min} dk
                  </span>
                </div>
                <p className="mt-2.5 text-[0.92rem] font-semibold leading-snug text-heading">{scene.title}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted">Toplam 21 sahne, A1’den B2’ye.</p>
        </Reveal>
      </div>
    </section>
  );
}
