"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const faqs = [
  {
    q: "TalkStage gerçekten konuşma becerimi geliştirebilir mi?",
    a: "Evet. TalkStage pasif öğrenme yerine konuşmayı çalıştırır: 5–10 dakikalık sesli sahnelerde cümle kurar, anında düzeltme alırsın.",
  },
  {
    q: "Ücretsiz deneme için kredi kartı gerekiyor mu?",
    a: "Hayır. Günde 1 sesli sahne, kelime kartları ve okuma hikâyeleri ücretsizdir; kart bilgisi girmeden başlayabilirsin.",
  },
  {
    q: "Hangi cihazlarda kullanabilirim?",
    a: "iOS ve Android için mobil uygulama ile web stüdyosu var.",
  },
  {
    q: "Aboneliğimi istediğim zaman iptal edebilir miyim?",
    a: "Evet. App Store veya Google Play hesabınız üzerinden tek bir dokunuşla taahhütsüz ve anında iptal edebilirsiniz.",
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Genel Soru / Destek",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `${formData.message}\n\n— ${formData.name} (${formData.email})`;
    window.location.href = `mailto:destek@talkstage.app?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-36 pb-24 sm:pt-44 sm:pb-32 bg-white">
        <div className="mx-auto max-w-5xl px-6">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-xs font-mono text-muted">
            <Link href="/" className="hover:text-indigo transition-colors">
              Ana Sayfa
            </Link>
            <span>/</span>
            <span className="text-heading font-semibold">İletişim & Destek</span>
          </div>

          <div className="mb-12 flex items-center gap-5 rounded-[28px] border border-line bg-white p-5 shadow-layered sm:p-7">
            <Image src="/mivo/lesson-guide.webp" alt="" width={750} height={900} className="h-24 w-auto shrink-0 sm:h-32" priority />
            <div>
              <p className="font-display text-xl font-extrabold tracking-tight text-heading sm:text-2xl">Bir sorunun mu var?</p>
              <p className="mt-1 text-sm leading-relaxed text-body sm:text-base">
                Teknik destek, öneri ya da şirket lisansı için bize yaz; mesajına e-postayla dönelim.
              </p>
            </div>
          </div>

          <div className="grid gap-12 lg:grid-cols-12">
            {/* Left Column: Info & Support Details */}
            <div className="lg:col-span-5">
              <span className="font-mono text-[0.78rem] font-bold uppercase tracking-[0.14em] text-indigo">
                Bize Ulaşın
              </span>
              <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-heading sm:text-4xl">
                Sorularınız mı var?
              </h1>
              <p className="mt-4 text-base leading-relaxed text-body">
                Senaryo önerileri, kurumsal eğitim paketleri veya teknik destek için bize her zaman yazabilirsiniz.
              </p>

              <div className="mt-8 space-y-4">
                <div className="rounded-2xl border border-line bg-porcelain p-5">
                  <span className="block text-xs font-mono font-bold uppercase tracking-wider text-muted">
                    Destek & Genel İletişim
                  </span>
                  <a
                    href="mailto:destek@talkstage.app"
                    className="mt-1 block font-display text-lg font-bold text-indigo hover:underline"
                  >
                    destek@talkstage.app
                  </a>
                  <span className="mt-1 block text-xs text-muted">
                    Kullanıcı desteği ve senaryo geri bildirimleri
                  </span>
                </div>

                <div className="rounded-2xl border border-line bg-porcelain p-5">
                  <span className="block text-xs font-mono font-bold uppercase tracking-wider text-muted">
                    Kurumsal & B2B Satış
                  </span>
                  <a
                    href="mailto:b2b@talkstage.app"
                    className="mt-1 block font-display text-lg font-bold text-heading hover:underline"
                  >
                    b2b@talkstage.app
                  </a>
                  <span className="mt-1 block text-xs text-muted">
                    Yazılım ekipleri ve şirket toplu lisansları için
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Contact Form */}
            <div className="lg:col-span-7">
              <div className="glass-card rounded-[28px] border border-line bg-white p-8 shadow-[var(--shadow-layered)] sm:p-10">
                {submitted ? (
                  <div className="py-12 text-center">
                    <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald/15 text-2xl font-bold text-emerald">
                      ✓
                    </span>
                    <h3 className="mt-6 font-display text-2xl font-bold text-heading">
                      E-posta uygulaman açıldı
                    </h3>
                    <p className="mx-auto mt-2 max-w-sm text-sm text-body">
                      Mesajı e-posta uygulamandan göndermeyi unutma. Açılmadıysa doğrudan <strong>destek@talkstage.app</strong> adresine yazabilirsin.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-6 rounded-full border border-line px-6 py-2 text-sm font-semibold text-heading hover:bg-slate-50"
                    >
                      Yeni mesaj yaz
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-bold uppercase tracking-wider text-heading">
                        Adınız Soyadınız
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        placeholder="Örn: Ahmet Yılmaz"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="mt-2 w-full rounded-xl border border-line bg-porcelain/60 px-4 py-3 text-sm text-heading placeholder:text-muted focus:border-indigo focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo/20"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-bold uppercase tracking-wider text-heading">
                        E-posta Adresiniz
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        placeholder="ahmet@sirketiniz.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="mt-2 w-full rounded-xl border border-line bg-porcelain/60 px-4 py-3 text-sm text-heading placeholder:text-muted focus:border-indigo focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo/20"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-subject" className="block text-xs font-bold uppercase tracking-wider text-heading">
                        Konu
                      </label>
                      <select
                        id="contact-subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="mt-2 w-full rounded-xl border border-line bg-porcelain/60 px-4 py-3 text-sm text-heading focus:border-indigo focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo/20"
                      >
                        <option>Genel Soru / Destek</option>
                        <option>Yeni Senaryo Önerisi</option>
                        <option>Abonelik / Ödeme Konusu</option>
                        <option>Kurumsal / B2B Görüşmesi</option>
                        <option>Hata Bildirimi</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="contact-message" className="block text-xs font-bold uppercase tracking-wider text-heading">
                        Mesajınız
                      </label>
                      <textarea
                        id="contact-message"
                        required
                        rows={4}
                        placeholder="Mesajınızı veya merak ettiğiniz konuyu yazın..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="mt-2 w-full rounded-xl border border-line bg-porcelain/60 px-4 py-3 text-sm text-heading placeholder:text-muted focus:border-indigo focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo/20"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full rounded-xl bg-linear-to-r from-indigo to-cyan py-3.5 text-base font-semibold text-white shadow-md transition-transform hover:-translate-y-0.5"
                    >
                      Mesajı Gönder
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Quick FAQ Section */}
          <div className="mt-24 border-t border-line/80 pt-16">
            <div className="text-center">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-indigo">
                Hızlı Yanıtlar
              </span>
              <h2 className="mt-2 font-display text-2xl font-bold text-heading sm:text-3xl">
                Sıkça Sorulan Sorular
              </h2>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {faqs.map((faq) => (
                <div
                  key={faq.q}
                  className="rounded-2xl border border-line bg-porcelain/60 p-6"
                >
                  <h3 className="font-display text-base font-bold text-heading">
                    {faq.q}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
