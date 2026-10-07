import Link from "next/link";
import Reveal from "./Reveal";

const FAQS = [
  {
    q: "Yanlış cümle kurarsam ne olur?",
    a: "Mivo konuşmanı bölmeden doğru hâlini gösterir ve nedenini kendi dilinde kısaca açıklar. Düzeltilen cümleler hata defterine düşer, istediğinde dönüp çalışırsın.",
  },
  {
    q: "Başlangıç seviyesindeysem konuşabilir miyim?",
    a: "Evet. A1 ve A2 sahnelerinde Mivo seni kendi dilinde yönlendirir, ne söyleyeceğini gösterir ve cümleyi söylemene yardım eder. Sahneler seviyene göre açılır; bir üst seviye “zor” etiketiyle denenebilir.",
  },
  {
    q: "Mikrofon izni vermek zorunda mıyım?",
    a: "Sesli sahneler için mikrofon gerekir; izni ilk kurulumda atlayıp sonra verebilirsin. Mikrofonu açmadan önce Mivo ile yazarak da sohbet edebilirsin.",
  },
  {
    q: "Hangi dillerde kullanabilirim?",
    a: "Arayüz ve açıklamalar Türkçe, İngilizce, İspanyolca, Brezilya Portekizcesi ve Almanca olarak kullanılabilir. Çalıştığın dil her zaman İngilizce. Çevirilerin bir kısmı yapay zekâyla üretildi, hatalı bir şey görürsen bize yaz.",
  },
  {
    q: "Ücretsiz mi?",
    a: "Evet, ücretsiz başlayabilirsin: günde 1 sesli sahne (5 dakikaya kadar), kelime kartları, okuma hikâyeleri ve anlık düzeltme. Sınırsız sesli pratik için Pro var.",
  },
  {
    q: "Sesim ve konuşmalarım ne oluyor?",
    a: "Konuştuğun cümleler metne çevrilip Mivo’ya iletilir; ilk sesli odada gizlilik onayı istenir. Mivo’nun sohbetlerden sakladığı kısa notları uygulamadan görebilir, düzeltebilir veya silebilirsin. Ayrıntılar Gizlilik Politikası’nda.",
  },
];

export default function HomeFaq() {
  return (
    <section id="sss" className="scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <p className="font-mono text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-stage">SSS</p>
          <h2 className="mt-4 text-balance font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.03em] text-heading sm:text-5xl">
            Başlamadan önce akla gelenler
          </h2>
          <Link
            href="/sss"
            className="mt-6 inline-flex items-center gap-2 text-[0.95rem] font-semibold text-stage underline-offset-4 hover:underline"
          >
            Tüm soruları gör →
          </Link>
        </Reveal>

        <Reveal delay={100}>
          <div className="divide-y divide-line rounded-[28px] border border-line bg-white">
            {FAQS.map((item, i) => (
              <details key={item.q} className="group px-6 py-1" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left font-display text-[1.05rem] font-bold text-heading [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span
                    aria-hidden
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-paper-deep text-lg text-stage transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="pb-5 text-[0.95rem] leading-relaxed text-body">{item.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
