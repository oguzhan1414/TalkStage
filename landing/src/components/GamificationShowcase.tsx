import Image from "next/image";
import Reveal from "./Reveal";

const badges = [
  {
    image: "/images/14_badge_first_mic.png",
    name: "First Mic",
    title: "İlk Sahne",
    desc: "İlk sesli konuşma senaryosunu tamamla",
  },
  {
    image: "/images/16_badge_visa_approved.png",
    name: "Visa Approved",
    title: "Vize Onaylandı",
    desc: "Konsolosluk senaryosunda 90+ puan al",
  },
  {
    image: "/images/17_badge_7day_flame.png",
    name: "7-Day Flame",
    title: "Ateş Serisi",
    desc: "7 gün aralıksız her gün sahneye çık",
  },
  {
    image: "/images/18_badge_30day_master.png",
    name: "30-Day Master",
    title: "30 Günlük Usta",
    desc: "30 gün streak yap ve kupayı kaldır",
  },
  {
    image: "/images/19_badge_zero_freeze.png",
    name: "Zero Freeze",
    title: "Korkusuz",
    desc: "3 dakika hiç duraksamadan konuş",
  },
  {
    image: "/images/20_badge_vocab_hunter.png",
    name: "Vocab Hunter",
    title: "Kelime Avcısı",
    desc: "100 kelimeyi hafıza destesinde tamamla",
  },
];

export default function GamificationShowcase() {
  return (
    <section className="overflow-hidden px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="font-mono text-[0.78rem] font-medium uppercase tracking-[0.14em] text-emerald">
            Oyunlaştırma & Motivasyon
          </span>
          <h2 className="mt-4 text-balance font-display text-3xl font-extrabold tracking-tight text-heading sm:text-4xl">
            Pratik yaptıkça 3D başarı rozetleri kazan
          </h2>
          <p className="mt-4 text-balance leading-relaxed text-body">
            İngilizce öğrenmeyi sıkıcı bir ödevden çıkarıp her gün tamamlamak isteyeceğin keyifli bir oyun serisine dönüştürdük.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {badges.map((badge, i) => (
            <Reveal key={badge.name} delay={i * 60}>
              <div className="group flex h-full flex-col items-center rounded-[22px] border border-line bg-white p-4 text-center shadow-[var(--shadow-layered)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[var(--shadow-lifted)]">
                <div className="relative aspect-square w-24 overflow-hidden rounded-2xl sm:w-28">
                  <Image
                    src={badge.image}
                    alt={badge.title}
                    fill
                    sizes="(max-width: 640px) 96px, 112px"
                    className="object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h3 className="mt-3 font-display text-sm font-bold text-heading">
                  {badge.title}
                </h3>
                <p className="mt-1 text-[0.75rem] leading-snug text-muted">
                  {badge.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
