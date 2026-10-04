import Image from "next/image";
import PhoneFrame from "./PhoneFrame";
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
    <section className="overflow-hidden px-6 py-24 sm:py-32 bg-card-orange">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-orange-200/60 text-sm font-bold text-heading shadow-xs mb-4">
            <span>🏆</span>
            <span>Oyunlaştırma & Motivasyon</span>
          </div>
          <h2 className="mt-2 text-balance font-display text-3xl font-extrabold tracking-tight text-heading sm:text-4xl">
            Pratik yaptıkça <span className="text-highlight">3D rozetler</span> kazan! 🎮
          </h2>
          <p className="mt-4 text-balance leading-relaxed text-body">
            İngilizce öğrenmeyi her gün tamamlamak isteyeceğin keyifli bir oyuna dönüştürdük! 🚀
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {badges.map((badge, i) => (
            <Reveal key={badge.name} delay={i * 60}>
              <div className="group flex h-full flex-col items-center rounded-[24px] border border-orange-200/40 bg-white p-4 text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl card-playful">
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

        {/* Real screenshot: the actual mobile Rozetlerim achievement wall */}
        <Reveal delay={200} className="mt-14 flex flex-col items-center justify-center gap-6 sm:flex-row">
          <PhoneFrame
            src="/images/app-screens/badges.png"
            alt="TalkStage mobil uygulama Rozetlerim başarı duvarı ekranı"
            width={170}
            rotate="-rotate-2"
          />
          <p className="max-w-xs text-center text-sm leading-relaxed text-body sm:text-left">
            Cebindeki rozet duvarın tam olarak bu — her biri kilitli başlar, gerçek bir pratikle açılır.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
