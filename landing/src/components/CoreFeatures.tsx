import Image from "next/image";
import Reveal from "./Reveal";

const features = [
  {
    image: "/images/24_card_vocab_deck.png",
    tag: "Hafıza & Kelime",
    title: "Spaced Repetition (SM-2) Destesi",
    description:
      "Senaryolarda takıldığın kelimeler tek tıkla destene eklenir. Bilimsel SM-2 tekrar algoritması, kelimeyi unutmaya en yakın olduğun anda önüne getirir.",
  },
  {
    image: "/images/25_card_reading_module.png",
    tag: "Okuma & Dinleme",
    title: "Tematik Reading & Dinleme",
    description:
      "Vizeye veya mülakata hazırlanıyorsan, sadece o senaryoya paralel okuma parçaları açılır. Bilmediğin kelimeye dokunup sesini dinleyebilir ve kaydedebilirsin.",
  },
  {
    image: "/images/26_card_level_assessment.png",
    tag: "Seviye Kalibrasyonu",
    title: "2 Dakikalık Akıcılık Pusulası",
    description:
      "Test çözmek yok. Mikrofona 3 cümle söylersin, yapay zekâ gerçek konuşma akıcılığını, telaffuzunu ve kelime dağarcığını saniyeler içinde kalibre eder.",
  },
  {
    image: "/images/30_card_error_diagnostic.png",
    tag: "Akıllı Teşhis",
    title: "Türk Kullanıcılara Özel Hata Kalıpları",
    description:
      "Türkçe düşünürken yapılan 100'den fazla klasik hatayı ('am agree', 'work here since 3 years') anında yakalar ve Türkçenin mantığıyla kıyaslayarak öğretir.",
  },
];

export default function CoreFeatures() {
  return (
    <section id="metodoloji" className="scroll-mt-24 bg-porcelain px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="font-mono text-[0.78rem] font-medium uppercase tracking-[0.14em] text-indigo">
            Öğrenme Metodolojisi
          </span>
          <h2 className="mt-4 text-balance font-display text-3xl font-extrabold tracking-tight text-heading sm:text-4xl">
            Kelime + Okuma + Canlı Konuşma Üçgeni
          </h2>
          <p className="mt-4 text-balance leading-relaxed text-body">
            Sadece konuşmak yetmez; yeni kelimeler öğrenmeli, okumalı ve öğrendiğin her şeyi hemen o günün senaryosunda sesli olarak sahneye dökmelisin.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {features.map((item, i) => (
            <Reveal key={item.title} delay={i * 80}>
              <div className="flex h-full flex-col overflow-hidden rounded-[26px] border border-line/80 bg-white p-7 shadow-[var(--shadow-layered)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lifted)] sm:p-8">
                {/* 3D Visual Asset Container */}
                <div className="relative mb-6 aspect-[4/3] w-full overflow-hidden rounded-2xl bg-porcelain">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-contain p-2 transition-transform duration-500 hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col">
                  <span className="font-mono text-[0.72rem] font-bold uppercase tracking-wider text-indigo">
                    {item.tag}
                  </span>
                  <h3 className="mt-2 font-display text-xl font-bold text-heading">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-[0.95rem] leading-relaxed text-body">
                    {item.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
