import Image from 'next/image';
import Reveal from './Reveal';
import a1Level from '../assets/levels/a1-rounded.png';
import a2Level from '../assets/levels/a2-rounded.png';
import b1Level from '../assets/levels/b1-rounded.png';
import b2Level from '../assets/levels/b2-rounded.png';
import c1Level from '../assets/levels/c1-rounded.png';
import c2Level from '../assets/levels/c2-rounded.png';

// Static imports give each image a content-hashed URL when the artwork changes.
const LEVELS = [
  { code: 'A1', image: a1Level },
  { code: 'A2', image: a2Level },
  { code: 'B1', image: b1Level },
  { code: 'B2', image: b2Level },
  { code: 'C1', image: c1Level },
  { code: 'C2', image: c2Level },
] as const;

type Tile = { icon: string; title: string; text: string; className?: string };

const TILES: Tile[] = [
  {
    icon: 'reading',
    title: 'Okuma',
    text: 'A1–A2 hikâyelerinde dinle, boşluğu doldur, kelimeyi harf harf yaz, cümleyi sıraya diz; sonunda sahnedeki cümleyi sesli söyle.',
  },
  {
    icon: 'podcasts',
    title: 'Podcast',
    text: '40 bölüm, iki dilli transkript. Bir cümleye dokununca ses oraya atlar; bölümü bitirince mini test gelir.',
  },
  {
    icon: 'words',
    title: 'Kelimeler',
    text: '900 çekirdek kelime, aralıklı tekrarla (SM-2) tam unutmak üzereyken karşına çıkar.',
  },
  {
    icon: 'mistakes',
    title: 'Hata defterim',
    text: 'Konuşmalarda düzeltilen cümleler defterine düşer; geri dönüp çalışırsın.',
  },
  {
    icon: 'pronunciation',
    title: 'Telaffuz',
    text: 'Türkçe konuşanların zorlandığı kelimeleri tek tek dinle ve tekrar et.',
  },
];

export default function DailyPath() {
  return (
    <section id="yol" className="scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-3xl">
          <p className="font-mono text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-stage">Günlük yol</p>
          <h2 className="mt-4 text-balance font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.03em] text-heading sm:text-6xl">
            Her gün tek bir sonraki adım.
          </h2>
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-body">
            Ne çalışacağını seçmek için vakit harcama. Bugün sekmesi sıradaki işi gösterir; sahne, okuma ve kelimeler
            birbirini destekler.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {/* Lead tile */}
          <Reveal className="lg:col-span-3 lg:row-span-2">
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[28px] bg-stage p-7 text-white sm:p-9">
              <div aria-hidden className="slate-stripes absolute inset-x-0 top-0 h-3" />
              <div className="mt-3">
                <Image src="/icons/today.webp" alt="" width={256} height={256} className="h-20 w-20" />
                <h3 className="mt-5 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">Bugün</h3>
                <p className="mt-3 max-w-md text-[1.02rem] leading-relaxed text-white/80">
                  Seviyene göre sıralanmış bir yol: konu anlatımı, kelimeler, podcast, okuma ve en sonda konuşma. Günlük
                  hedefin ve serin burada görünür.
                </p>
              </div>
              <ol className="mt-8 flex flex-wrap gap-2 font-mono text-[0.7rem] font-semibold uppercase tracking-wider">
                {['Ders', 'Kelime', 'Podcast', 'Okuma', 'Konuşma'].map((step, i) => (
                  <li key={step} className="flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-slate-yellow text-[0.6rem] text-ink">{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          {TILES.map((tile, i) => (
            <Reveal key={tile.icon} delay={i * 70} className={i < 2 ? 'lg:col-span-3' : 'lg:col-span-2'}>
              <div className="flex h-full items-start gap-4 rounded-[28px] border border-line bg-white p-5 transition-shadow hover:shadow-layered sm:p-6">
                <Image src={`/icons/${tile.icon}.webp`} alt="" width={96} height={96} className="h-16 w-16 shrink-0 object-contain" />
                <div>
                  <h3 className="font-display text-xl font-bold tracking-tight text-heading">{tile.title}</h3>
                  <p className="mt-1.5 text-[0.93rem] leading-relaxed text-body">{tile.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Levels */}
        <Reveal className="mt-20">
          <div className="grid items-center gap-8 rounded-[28px] border border-line bg-white p-6 sm:p-9 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <h3 className="font-display text-2xl font-extrabold tracking-tight text-heading sm:text-3xl">Doğru yerden başla</h3>
              <p className="mt-3 text-[0.97rem] leading-relaxed text-body">
                Kısa bir seviye belirleme seni A1’den C2’ye uzanan yolda doğru basamağa koyar. İçerik ve kilitler buna göre
                şekillenir; hazır olduğunda üst seviyeye geçersin.
              </p>
            </div>
            <ul className="grid grid-cols-6 gap-2 sm:gap-4">
              {LEVELS.map((lv) => (
                <li key={lv.code} className="flex justify-center">
                  <Image src={lv.image} alt={lv.code} width={120} height={120} sizes="84px" className="h-auto w-full max-w-[84px]" />
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
