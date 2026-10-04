import Image from "next/image";
import Reveal from "./Reveal";

const testimonials = [
  {
    name: "Emre K.",
    role: "Senior Frontend Developer",
    location: "Amsterdam (Teklif Aldı) 🎉",
    badge: "💻 Tech Standup",
    avatar: "/images/58_avatar_male_developer.png",
    quote:
      "2 hafta boyunca her gün 15 dk Tech Standup simülasyonu yaptım, Amsterdam'dan teklif aldım!",
    cardColor: "bg-card-blue",
    borderColor: "border-blue-200/60",
  },
  {
    name: "Zeynep D.",
    role: "Engineering Tech Lead",
    location: "Londra (Remote) 🇬🇧",
    badge: "👩‍💼 Global Mülakat",
    avatar: "/images/59_avatar_female_tech_lead.png",
    quote:
      "TalkStage ile 1 ayda toplantı akıcılığım ve özgüvenim ikiye katlandı. Harika!",
    cardColor: "bg-card-pink",
    borderColor: "border-pink-200/60",
  },
  {
    name: "Selin A.",
    role: "Yüksek Lisans Öğrencisi",
    location: "Münih Teknik Üniv. 🇩🇪",
    badge: "✈️ Vize Mülakatı",
    avatar: "/images/60_avatar_male_traveler.png",
    quote:
      "Vize görüşmesi için 'Consulate Stage' senaryosunu 20 kere çalıştım. Gerçek sorular birebir aynıydı!",
    cardColor: "bg-card-purple",
    borderColor: "border-purple-200/60",
  },
  {
    name: "Merve Y.",
    role: "Lead UI/UX Designer",
    location: "Stockholm (Kabul Aldı) 🇸🇪",
    badge: "🎨 Design Critique",
    avatar: "/images/61_avatar_female_designer.png",
    quote:
      "Tasarım kararlarımı yabancı paydaşlara savunurken Türkçe ipucu kartları çok yardımcı oldu!",
    cardColor: "bg-card-orange",
    borderColor: "border-orange-200/60",
  },
  {
    name: "Arda S.",
    role: "Cloud & AI Engineer",
    location: "Berlin (Relocation) 🇩🇪",
    badge: "🔬 System Design",
    avatar: "/images/62_avatar_male_engineer.png",
    quote:
      "Her gün 5 dakikalık gerçek sahnelerle konuşma bariyerimi tamamen yıktım! 💪",
    cardColor: "bg-card-lime",
    borderColor: "border-lime-200/60",
  },
  {
    name: "Deniz T.",
    role: "Global Startup Founder",
    location: "San Francisco 🇺🇸",
    badge: "📈 B2B Pitch",
    avatar: "/images/63_avatar_female_entrepreneur.png",
    quote:
      "Objection handling sahneleri pitch sunumlarımı kusursuzlaştırdı. Yatırımcılar etkilendi!",
    cardColor: "bg-card-mint",
    borderColor: "border-emerald-200/60",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-bg-sky px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-xl text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-blue-200/60 text-sm font-bold text-heading shadow-xs mb-4">
            <span>⭐</span>
            <span>Kullanıcı Başarı Hikayeleri</span>
          </div>

          <h2 className="mt-2 text-balance font-display text-3xl font-extrabold tracking-tight text-heading sm:text-4xl">
            Sahneye çıkanlar <span className="text-highlight">kilitlenmeyi aşıyor</span> 🎭
          </h2>
          <p className="mt-4 text-balance leading-relaxed text-body">
            12.000+ profesyonel TalkStage ile hedefine ulaştı!
          </p>
        </Reveal>

        {/* Colorful Review Cards */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 80}>
              <figure className={`flex h-full flex-col justify-between rounded-[28px] ${t.cardColor} border ${t.borderColor} p-7 shadow-lg transition-all duration-300 hover:-translate-y-2 card-playful`}>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-white/80 px-3 py-1.5 font-mono text-[0.75rem] font-bold text-heading shadow-xs">
                      {t.badge}
                    </span>
                    <span className="text-amber-400 text-sm" aria-label="5 üzerinden 5 yıldız">★★★★★</span>
                  </div>

                  <span aria-hidden className="mt-4 block font-serif text-5xl italic leading-none text-pink-pop/30">
                    &ldquo;
                  </span>
                  <blockquote className="-mt-4 text-[0.925rem] leading-relaxed text-heading font-medium">
                    {t.quote}
                  </blockquote>
                </div>

                <figcaption className="mt-6 pt-4 border-t border-white/60">
                  <div className="flex items-center gap-3.5">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-white shadow-sm">
                      <Image
                        src={t.avatar}
                        alt={t.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <span className="block text-sm font-bold text-heading">{t.name}</span>
                      <span className="block text-[0.75rem] text-muted">{t.role}</span>
                      <span className="mt-0.5 inline-block text-[0.7rem] font-semibold text-emerald">
                        ✓ {t.location}
                      </span>
                    </div>
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
