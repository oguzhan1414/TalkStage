import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Kullanım Şartları — TalkStage",
  description: "TalkStage mobil ve web platformlarının kullanım koşulları, abonelik ve iptal şartları.",
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-36 pb-24 sm:pt-44 sm:pb-32 bg-white">
        <div className="mx-auto max-w-3xl px-6">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-xs font-mono text-muted">
            <Link href="/" className="hover:text-indigo transition-colors">
              Ana Sayfa
            </Link>
            <span>/</span>
            <span className="text-heading font-semibold">Kullanım Şartları</span>
          </div>

          <span className="font-mono text-xs font-bold uppercase tracking-wider text-indigo">
            Hukuki Koşullar
          </span>
          <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-heading sm:text-4xl">
            TalkStage Kullanım Şartları & Sözleşmesi
          </h1>
          <p className="mt-2 text-xs text-muted">
            Son Güncelleme: {new Date().toLocaleDateString("tr-TR", { year: "numeric", month: "long", day: "numeric" })}
          </p>

          <div className="mt-10 space-y-8 text-body text-[0.95rem] leading-[1.75]">
            <section>
              <h2 className="font-display text-xl font-bold text-heading">1. Şartların Kabulü</h2>
              <p className="mt-2">
                TalkStage uygulamasını indirerek, hesap oluşturarak veya web sitemizi ziyaret ederek bu Kullanım Şartları&apos;nı kabul etmiş sayılırsınız. Şartları kabul etmiyorsanız lütfen uygulamayı kullanmayınız.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-heading">2. Hizmet Kapsamı & Abonelik Modeli</h2>
              <p className="mt-2">
                TalkStage, freemium iş modeliyle çalışır:
              </p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li><strong>Ücretsiz Katman (Free Stage):</strong> Günde 1 adet sesli senaryo (maksimum 5 dakika) ve sınırsız kelime kartı/okuma hakkı sunar.</li>
                <li><strong>Stage Pass Pro Aboneliği:</strong> Aylık veya yıllık faturalandırma ile sınırsız sesli senaryo pratiği ve gelişmiş fonetik analizlere erişim sağlar.</li>
              </ul>
            </section>

            <section className="rounded-2xl border border-indigo/15 bg-porcelain p-6">
              <h2 className="font-display text-xl font-bold text-indigo">
                3. Abonelik İptali ve İadeler
              </h2>
              <p className="mt-2 text-heading">
                Abonelikleriniz, Apple App Store veya Google Play Store üzerinden otomatik olarak yenilenir.
              </p>
              <ul className="mt-2 list-disc pl-5 space-y-1 text-sm text-body">
                <li>Yenileme tarihinden en az 24 saat önce mağaza hesap ayarlarınızdan iptal edebilirsiniz.</li>
                <li>İptal durumunda mevcut döneminizin sonuna kadar Pro ayrıcalıklarından yararlanmaya devam edersiniz.</li>
                <li>Geri ödeme talepleri ilgili mağazanın (Apple / Google) standart iade politikalarına tabidir.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-heading">4. Uygun Kullanım Kuralları</h2>
              <p className="mt-2">
                Kullanıcılar; yapay zekâ sesli simülasyon sistemini suistimal edecek saldırgan, yasa dışı veya nefret söylemi içeren ifadeler kullanmamayı taahhüt eder. Sistem güvenliğini tehdit eden bot veya tersine mühendislik girişimleri hesabın derhal feshedilmesine yol açar.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-heading">5. Fikri Mülkiyet</h2>
              <p className="mt-2">
                TalkStage adı, logosu, 3D görsel varlıkları, senaryo veritabanı ve ses motoru mimarisi TalkStage Inc.&apos;in tescilli fikri mülkiyetidir ve izinsiz çoğaltılamaz.
              </p>
            </section>

            <section className="border-t border-line pt-6">
              <h2 className="font-display text-lg font-bold text-heading">Sorularınız İçin</h2>
              <p className="mt-1">
                Kullanım koşullarıyla ilgili detaylı bilgi için: <strong>destek@talkstage.app</strong>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
