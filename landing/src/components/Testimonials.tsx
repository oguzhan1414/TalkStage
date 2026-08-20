import Image from "next/image";
import Reveal from "./Reveal";

const testimonials = [
  {
    name: "Emre K.",
    role: "Senior Frontend Developer",
    location: "Amsterdam (Teklif Aldı)",
    badge: "💻 Tech Standup",
    quote:
      "Yurtdışı teknik mülakatlarında kilitleniyordum. 2 hafta boyunca her gün 15 dk Tech Standup ve FAANG Interview simülasyonu yaptım, Amsterdam'dan teklif aldım.",
  },
  {
    name: "Selin A.",
    role: "Yüksek Lisans Öğrencisi",
    location: "Münih Teknik Üniv.",
    badge: "✈️ Vize Mülakatı",
    quote:
      "Almanya vize görüşmesi için 'Consulate Stage' senaryosunu 20 kere çalıştım. Gerçek görüşmede sorulan tüm sorular uygulamadakinin birebir aynısıydı.",
  },
  {
    name: "Burak T.",
    role: "B2B Satış Yöneticisi",
    location: "Global SaaS",
    badge: "📈 B2B Pitch",
    quote:
      "Yabancı müşteriye telefonda fiyat ve ROI anlatırken takılıyordum. Objection handling sahneleri özgüvenimi ve akıcılığımı tamamen yerine getirdi.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-porcelain px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-xl text-center">
          <span className="font-mono text-[0.78rem] font-medium uppercase tracking-[0.14em] text-indigo">
            Kullanıcı Başarı Hikayeleri
          </span>
          <h2 className="mt-4 text-balance font-display text-3xl font-extrabold tracking-tight text-heading sm:text-4xl">
            Sahneye çıkanlar kilitlenmeyi aşıyor
          </h2>
          <p className="mt-4 text-balance leading-relaxed text-body">
            Yazılımcılardan vizeye başvuran öğrencilere; gerçek hayatta konuşarak hedefine ulaşan profesyoneller.
          </p>
        </Reveal>

        {/* Big 3D Trio Banner */}
        <Reveal delay={100} className="mt-12">
          <div className="relative mx-auto aspect-[16/7] w-full max-w-3xl overflow-hidden rounded-[26px] border border-line bg-white shadow-[var(--shadow-layered)]">
            <Image
              src="/images/33_avatars_user_trio.png"
              alt="TalkStage Başarılı Kullanıcıları: Yazılımcı, Öğrenci ve Satış Yöneticisi"
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
        </Reveal>

        {/* 3 User Review Cards */}
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <figure className="flex h-full flex-col justify-between rounded-[24px] border border-line bg-white p-7 shadow-[var(--shadow-layered)]">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-porcelain px-3 py-1 font-mono text-[0.7rem] font-semibold text-indigo">
                      {t.badge}
                    </span>
                    <span className="text-amber-500 text-xs">★★★★★</span>
                  </div>

                  <blockquote className="mt-4 text-[0.95rem] leading-relaxed text-heading font-medium">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                </div>

                <figcaption className="mt-6 pt-4 border-t border-line/60">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="block text-sm font-bold text-heading">{t.name}</span>
                      <span className="block text-[0.8rem] text-muted">{t.role}</span>
                    </div>
                    <span className="rounded-md bg-emerald/10 px-2 py-0.5 text-[0.68rem] font-semibold text-emerald">
                      ✓ {t.location}
                    </span>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
