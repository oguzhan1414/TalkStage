import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Hakkımızda — TalkStage Hikayesi ve Felsefesi",
  description:
    "Gramer bulmacalarından gerçek sahneye: TalkStage'in hikayesi, konuşma kilitlenmesini çözme metodolojisi ve arkasındaki ekip vizyonu.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-36 pb-24 sm:pt-44 sm:pb-32 bg-white">
        <div className="mx-auto max-w-4xl px-6">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-xs font-mono text-muted">
            <Link href="/" className="hover:text-indigo transition-colors">
              Ana Sayfa
            </Link>
            <span>/</span>
            <span className="text-heading font-semibold">Hakkımızda</span>
          </div>

          {/* Page Heading */}
          <span className="font-mono text-[0.78rem] font-bold uppercase tracking-[0.14em] text-indigo">
            Biz Kimiz & Neden Buradayız?
          </span>
          <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-heading sm:text-5xl">
            İngilizceyi &quot;Bilen&quot; Ama &quot;Konuşamayan&quot; Milyonlar İçin Sahneyi Kurduk
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-body sm:text-xl">
            Yıllarca gramer kurallarını ezberledik, kelime eşleştirme oyunlarında 500 günlük seriler yaptık. Ama bir yabancıyla karşılaştığımızda ya da kritik bir iş mülakatına girdiğimizde boğazımız düğümlendi.
          </p>

          {/* Image 1: Main Breakthrough Visual (38_about_breakthrough_stage.png) */}
          <div className="my-12 relative overflow-hidden rounded-[28px] border border-line bg-porcelain p-2 shadow-[var(--shadow-lifted)] sm:p-4">
            <Image
              src="/images/38_about_breakthrough_stage.png"
              alt="TalkStage Felsefesi: Pasif Ezber Duvarını Kırıp Canlı Sahneye Adım Atmak"
              width={1440}
              height={810}
              priority
              className="h-auto w-full rounded-[22px] object-cover"
            />
            <div className="mt-3 flex items-center justify-between px-2 text-xs text-muted">
              <span>Ezber Duvarından Küresel Sahneye Geçiş</span>
              <span className="font-mono text-indigo font-semibold">Speak Active • Think Fast</span>
            </div>
          </div>

          {/* Story Sections with Embedded Visuals */}
          <div className="space-y-12 text-body text-[1.05rem] leading-[1.75]">
            {/* Section 1: The Problem */}
            <section>
              <h2 className="font-display text-2xl font-bold text-heading">
                1. Sessiz Kilitlenme (Silent Freeze) Nedir?
              </h2>
              <p className="mt-3">
                Türkiye&apos;de İngilizce öğrenenlerin en büyük sorunu bilgi eksikliği değil; <strong>nörolojik konuşma refleksinin gelişmemiş olmasıdır</strong>. Geleneksel dil uygulamaları kullanıcıya çoktan seçmeli sorular çözdürerek sahte bir başarı hissi verir. Ancak gerçek hayatta karşınıza bir FAANG mülakatçısı veya vize memuru oturduğunda, beyniniz Türkçe cümleyi İngilizceye çevirmeye çalışırken kilitlenir.
              </p>

              {/* Image 2: Problem Contrast Visual (04_problem_comparison.jpg) */}
              <div className="my-8 overflow-hidden rounded-2xl border border-line bg-porcelain p-2 shadow-sm">
                <Image
                  src="/images/04_problem_comparison.jpg"
                  alt="Geleneksel Bulmaca Tuzağı vs TalkStage Sahne Simülasyonu"
                  width={1200}
                  height={675}
                  className="h-auto w-full rounded-xl object-cover"
                />
                <p className="mt-2 text-center text-xs text-muted">
                  Geleneksel Pasif Bulmaca Yaklaşımı vs TalkStage Gerçek Zamanlı Sahne Simülasyonu
                </p>
              </div>
            </section>

            {/* Section 2: How It Works */}
            <section className="rounded-3xl border border-indigo/15 bg-linear-to-br from-indigo/5 via-cyan/5 to-white p-8 sm:p-10">
              <h2 className="font-display text-2xl font-bold text-indigo">
                2. TalkStage Nasıl Fark Yaratıyor?
              </h2>
              <p className="mt-3">
                TalkStage&apos;i geliştirirken tek bir ana prensibe odaklandık: <strong>Kullanıcıyı ilk günden itibaren güvenli ve yargılanma korkusu olmayan bir sahneye çıkarmak.</strong>
              </p>

              {/* Image 3: Onboarding Student Persona (12_onboarding_character.png) */}
              <div className="my-8 flex flex-col items-center gap-6 rounded-2xl border border-line/80 bg-white/90 p-6 sm:flex-row">
                <div className="relative h-48 w-40 shrink-0 overflow-hidden rounded-xl bg-porcelain">
                  <Image
                    src="/images/12_onboarding_character.png"
                    alt="TalkStage Güvenli Öğrenme Alanı Karakteri"
                    fill
                    sizes="160px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-heading">
                    Yargılanma Korkusu Olmayan &quot;Safe-Space&quot;
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">
                    Hata yapmaktan korkmadan, kendi hızınızda konuşabileceğiniz yapay zekâ simülatörü. Takıldığınız anda Türkçe konuşarak ipucu alabilir, aynı sahneyi dilediğiniz kadar tekrarlayabilirsiniz.
                  </p>
                </div>
              </div>

              <ul className="mt-4 space-y-3 font-medium text-heading">
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald text-xs text-white">✓</span>
                  <span><strong>Ultra Düşük Gecikmeli Voice AI:</strong> 1.2 saniyeden kısa sürede sesli cevap veren doğal konuşma deneyimi.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald text-xs text-white">✓</span>
                  <span><strong>Türkçe Karşılaştırmalı Hata Teşhisi:</strong> Hatanızı cümlenizi bölmeden Türkçe anlatan akıllı ipucu kartları.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald text-xs text-white">✓</span>
                  <span><strong>Hedefe Özel Sahneler:</strong> Genel sohbet yerine doğrudan yazılımcı standup&apos;ı, FAANG mülakatı veya vize görüşmesi.</span>
                </li>
              </ul>
            </section>

            {/* Section 3: Vision & Success */}
            <section>
              <h2 className="font-display text-2xl font-bold text-heading">
                3. Hedefimiz: Özgüvenle Sahneye Çıkan 1 Milyon Profesyonel
              </h2>
              <p className="mt-3">
                Hedefimiz; Türkiye&apos;den ve dünyadan milyonlarca yazılımcının, öğrencinin ve profesyonelin yurt dışı kariyerlerinde, vize mülakatlarında ve iş görüşmelerinde kendilerini ana dilleri gibi özgüvenle ifade edebilmelerini sağlamaktır.
              </p>

              {/* Image 4: Celebration & Scorecard (29_ui_scorecard_celebration.png) */}
              <div className="my-8 overflow-hidden rounded-2xl border border-line bg-porcelain p-2 shadow-sm">
                <Image
                  src="/images/29_ui_scorecard_celebration.png"
                  alt="TalkStage 360 Karne ve Başarı Kutlaması"
                  width={1200}
                  height={675}
                  className="h-auto w-full rounded-xl object-cover"
                />
                <p className="mt-2 text-center text-xs text-muted">
                  Her Oturum Sonu Detaylı 360° Akıcılık ve Telaffuz Karnesi
                </p>
              </div>
            </section>
          </div>

          {/* CTA Box */}
          <div className="mt-16 rounded-[28px] border border-line bg-porcelain p-8 text-center sm:p-12">
            <h3 className="font-display text-2xl font-bold text-heading sm:text-3xl">
              Sen de Sahneye Çıkmaya Hazır mısın?
            </h3>
            <p className="mx-auto mt-3 max-w-md text-body">
              İlk senaryo pratiğin tamamen ücretsiz. Kredi kartı gerekmez.
            </p>
            <div className="mt-6 flex justify-center">
              <Link
                href="/#indir"
                className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-indigo to-cyan px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5"
              >
                <span>Hemen Ücretsiz Başla</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
