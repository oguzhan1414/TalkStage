import Image from "next/image";
import Reveal from "./Reveal";

const testimonials = [
  {
    name: "Emre K.",
    role: "Senior Frontend Developer",
    location: "Amsterdam (Teklif Aldı)",
    badge: "💻 Tech Standup",
    avatar: "/images/58_avatar_male_developer.png",
    quote:
      "Yurtdışı teknik mülakatlarında kilitleniyordum. 2 hafta boyunca her gün 15 dk Tech Standup ve FAANG Interview simülasyonu yaptım, Amsterdam'dan teklif aldım.",
  },
  {
    name: "Zeynep D.",
    role: "Engineering Tech Lead",
    location: "Londra (Remote)",
    badge: "👩‍💼 Global Mülakat",
    avatar: "/images/59_avatar_female_tech_lead.png",
    quote:
      "Global ekibimle İngilizce sprint toplantılarını yönetirken takılıyordum. TalkStage ile 1 ayda toplantı akıcılığım ve özgüvenim ikiye katlandı.",
  },
  {
    name: "Selin A.",
    role: "Yüksek Lisans Öğrencisi",
    location: "Münih Teknik Üniv.",
    badge: "✈️ Vize Mülakatı",
    avatar: "/images/60_avatar_male_traveler.png",
    quote:
      "Almanya vize görüşmesi için 'Consulate Stage' senaryosunu 20 kere çalıştım. Gerçek görüşmede sorulan tüm sorular uygulamadakinin birebir aynısıydı.",
  },
  {
    name: "Merve Y.",
    role: "Lead UI/UX Designer",
    location: "Stockholm (Kabul Aldı)",
    badge: "🎨 Design Critique",
    avatar: "/images/61_avatar_female_designer.png",
    quote:
      "Tasarım kararlarımı yabancı paydaşlara savunurken anlık Türkçe teşhis kartları inanılmaz yardımcı oldu. Artık donmadan fikirlerimi savunabiliyorum.",
  },
  {
    name: "Arda S.",
    role: "Cloud & AI Engineer",
    location: "Berlin (Relocation)",
    badge: "🔬 System Design",
    avatar: "/images/62_avatar_male_engineer.png",
    quote:
      "Teknik terimleri biliyordum ama bağlaçlarda tıkanıyordum. Her gün 5 dakikalık gerçek sahnelerle konuşma bariyerimi tamamen yıktım.",
  },
  {
    name: "Deniz T.",
    role: "Global Startup Founder",
    location: "San Francisco",
    badge: "📈 B2B Pitch",
    avatar: "/images/63_avatar_female_entrepreneur.png",
    quote:
      "Yabancı yatırımcı ve müşterilere fiyat ve ROI anlatırken takılıyordum. Objection handling sahneleri pitch sunumlarımı kusursuzlaştırdı.",
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
            Yazılımcılardan vizeye başvuran öğrencilere; gerçek hayatta konuşarak hedefine ulaşan 12.000+ profesyonel.
          </p>
        </Reveal>

        {/* 6 User Review Cards with 3D Persona Avatars */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 80}>
              <figure className="flex h-full flex-col justify-between rounded-[24px] border border-line bg-white p-7 shadow-[var(--shadow-layered)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(67,56,202,0.12)] hover:border-gold/40">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-porcelain px-3 py-1 font-mono text-[0.7rem] font-semibold text-indigo">
                      {t.badge}
                    </span>
                    <span className="text-gold text-xs">★★★★★</span>
                  </div>

                  <span aria-hidden className="mt-3 block font-serif text-4xl italic leading-none text-gold/40">
                    &ldquo;
                  </span>
                  <blockquote className="-mt-3 text-[0.925rem] leading-relaxed text-heading font-medium">
                    {t.quote}
                  </blockquote>
                </div>

                <figcaption className="mt-6 pt-4 border-t border-line/60">
                  <div className="flex items-center gap-3.5">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-gold/25">
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
                      <span className="mt-0.5 inline-block text-[0.68rem] font-semibold text-emerald">
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
