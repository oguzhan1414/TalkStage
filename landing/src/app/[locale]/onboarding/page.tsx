'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from '@/i18n/Link';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  CheckCircle2,
  Lock,
  Mail,
  User,
  ShieldCheck,
  Flame,
  Award,
  Zap,
  RotateCcw,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import AuthShell from '@/components/AuthShell';
import { useT } from "@/i18n/client";
import { tr } from "@/i18n/shared";
import { rich } from "@/i18n/rich";

const ARTS = [
  '/hero/hero-portal.webp',
  '/hero/hero-stage.webp',
  '/hero/hero-stage.webp',
  '/hero/hero-sky.webp',
  '/hero/hero-sky.webp',
  '/hero/hero-listen.webp',
  '/hero/hero-listen.webp',
  '/hero/mivo-memory.webp',
];

const QUOTES = [
  tr("Birkaç kısa soruyla sana uygun bir yol çizelim."),
  tr("Önce seni tanıyayım. Sana nasıl hitap edeyim?"),
  tr("Ne için İngilizce konuşmak istiyorsun? Sahneleri ona göre seçerim."),
  tr("Seviyeni birlikte bulalım. Doğru basamaktan başlamak her şeyi kolaylaştırır."),
  tr("Hedefini bilirsem sana doğru sahneleri gösterebilirim."),
  tr("Günde ne kadar zaman ayırabileceğini söyle, planı ona göre kurayım."),
  tr("Neredeyse bitti. Hesabını oluşturunca yolculuğun başlıyor."),
  tr("Hazırsın. İlk sahneye geçelim!"),
];

// Personas matching mobile
const PERSONAS = [
  {
    id: 'student',
    category: tr("Eğitim & Gençlik"),
    title: tr("Lise & Üniversite Öğrencisi"),
    sub: tr("Sınavlar, hazırlık sınıfı, Erasmus & akıcılık"),
    icon: '🎓',
    badge: tr("Akademik"),
  },
  {
    id: 'corporate',
    category: tr("Kariyer & İş"),
    title: tr("Çalışan & Kurumsal Profesyonel"),
    sub: tr("Toplantılar, e-postalar, sunumlar & mülakatlar"),
    icon: '💼',
    badge: tr("İş Hayatı"),
  },
  {
    id: 'tech',
    category: tr("Teknoloji & Yazılım"),
    title: tr("Yazılımcı & Mühendis"),
    sub: tr("Daily standuplar, global ekipler & teknik İngilizce"),
    icon: '👨‍💻',
    badge: tr("Teknoloji"),
  },
  {
    id: 'traveler',
    category: tr("Dünya & Seyahat"),
    title: tr("Gezgin & Seyahat Sever"),
    sub: tr("Yurt dışı gezileri, havalimanı, otel & yön sorma"),
    icon: '✈️',
    badge: tr("Seyahat"),
  },
  {
    id: 'adult_hobby',
    category: tr("Kişisel Gelişim & Hobi"),
    title: tr("Yetişkin & Hobi Sever"),
    sub: tr("Dizi/film anlama, beyin jimnastiği & kendi hızında"),
    icon: '🌱',
    badge: tr("Kişisel Gelişim"),
  },
];

// Goals matching mobile
const GOALS = [
  {
    id: 'confidence',
    icon: '⚡',
    title: tr("Konuşurken Tutukluğu & Çekinmeyi Yenmek"),
    desc: tr("Kelimeler aklımda ama ağzımdan çıkmıyor diyenler için."),
    badge: tr("Özgüven"),
  },
  {
    id: 'interview',
    icon: '🎯',
    title: tr("İş Mülakatları & Global Kariyer"),
    desc: tr("FAANG, uluslararası şirketler ve terfi görüşmeleri."),
    badge: tr("Kariyer"),
  },
  {
    id: 'exams',
    icon: '📝',
    title: tr("IELTS / TOEFL / Hazırlık Atlama"),
    desc: tr("Akademik konuşma ve yüksek skor hedefi."),
    badge: tr("Sınav"),
  },
  {
    id: 'travel',
    icon: '🌍',
    title: tr("Yurt Dışı Seyahatlerinde Rahat İletişim"),
    desc: tr("Havalimanı, otel, restoranda sipariş ve sohbet."),
    badge: tr("Seyahat"),
  },
  {
    id: 'daily',
    icon: '☕',
    title: tr("7/24 Sabırlı ve Hata Yargılamayan Partner"),
    desc: tr("İstediğin an yargılanmadan saatlerce pratik yap."),
    badge: tr("Günlük Pratik"),
  },
];

// CEFR Levels matching mobile
const LEVELS = [
  {
    code: 'A1',
    title: tr("Sıfırdan Başlıyorum"),
    desc: tr("Temel kelimeleri biliyorum ama cümle kuramıyorum."),
  },
  {
    code: 'A2',
    title: tr("Temel Cümleler"),
    desc: tr("Kısa ve basit diyaloglara girebiliyorum."),
  },
  {
    code: 'B1',
    title: tr("Orta Düzey (Intermediate)"),
    desc: tr("Çoğu konuyu anlıyorum, takılmadan konuşmak istiyorum."),
  },
  {
    code: 'B2',
    title: tr("İleri Orta (Upper-Intermediate)"),
    desc: tr("İş ve günlük hayatta akıcıyım, nüansları geliştireceğim."),
  },
  {
    code: 'C1',
    title: tr("İleri Düzey (Advanced)"),
    desc: tr("Profesyonel düzeyde doğallık ve derin kelime haznesi."),
  },
];

// Daily commitments
const DAILY_GOALS = [
  { minutes: 10, title: tr("Rahat & Tempolu"), desc: tr("Günde 10 dakika mikro pratik"), badge: tr("Hafif") },
  { minutes: 15, title: tr("Düzenli & Odaklı"), desc: tr("Günde 15 dakika konuşma seansı"), badge: tr("Önerilen") },
  { minutes: 25, title: tr("Masaüstü Derin Seans"), desc: tr("Günde 25 dakika stüdyo çalışması"), badge: tr("Süper İlerleme") },
];

export default function OnboardingPage() {
  const t = useT();
  const router = useRouter();
  const { signUp, signInWithGoogle } = useAuth();

  const [step, setStep] = useState(1);
  const [userName, setUserName] = useState('');
  const [selectedPersona, setSelectedPersona] = useState('tech');
  const [selectedGoal, setSelectedGoal] = useState('confidence');
  const [selectedLevel, setSelectedLevel] = useState('B2');
  const [selectedDailyMin, setSelectedDailyMin] = useState(25);

  // Auth fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [needsEmailConfirmation, setNeedsEmailConfirmation] = useState(false);

  const totalSteps = 8;
  const progressPercent = Math.round((step / totalSteps) * 100);

  const currentPersonaObj = PERSONAS.find((p) => p.id === selectedPersona) || PERSONAS[0];
  const currentGoalObj = GOALS.find((g) => g.id === selectedGoal) || GOALS[0];
  const currentLevelObj = LEVELS.find((l) => l.code === selectedLevel) || LEVELS[3];

  const handleNext = () => {
    if (step === 2 && !userName.trim()) {
      setError(t("Lütfen isminizi girin."));
      return;
    }
    setError(null);
    setStep((prev) => Math.min(totalSteps, prev + 1));
  };

  const handleBack = () => {
    setError(null);
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError(t("Lütfen e-posta ve şifrenizi girin."));
      return;
    }
    if (password.length < 6) {
      setError(t("Şifreniz en az 6 karakter olmalıdır."));
      return;
    }

    setLoading(true);
    setError(null);

    const res = await signUp(email, password, userName || t("Öğrenci"), selectedLevel, {
      persona_id: selectedPersona,
      learning_goal: selectedGoal,
      daily_target_minutes: selectedDailyMin,
    });

    setLoading(false);
    if (res.error) {
      setError(res.error);
    } else {
      setNeedsEmailConfirmation(Boolean(res.needsEmailConfirmation));
      setStep(8); // Go to final ready pass
    }
  };

  const handleStartStudy = () => {
    router.push('/app');
  };

  return (
    <AuthShell
      art={ARTS[Math.min(step, ARTS.length) - 1]}
      mivoLabel={t("Mivo")}
      quote={t(QUOTES[Math.min(step, QUOTES.length) - 1])}
      footer={t("© 2026 Spekvia. Web ve Mobil Tek Hesap Sistemi.")}
      header={
        <>
          {step > 1 && step < 8 && (
            <div className="flex-1 max-w-xs space-y-1">
              <div className="flex items-center justify-between text-[11px] font-mono font-bold text-muted">
                <span>{t("Adım {{step}} / {{totalSteps}}", { step, totalSteps })}</span>
                <span className="text-stage">%{progressPercent}</span>
              </div>
              <div className="w-full bg-line h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-linear-to-r from-stage to-purple-pop h-full rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}
          <Link
            href="/login"
            className="text-sm font-semibold text-stage transition-colors hover:text-stage-deep"
        >{t("Giriş Yap")}</Link>
        </>
      }
    >
      {/* Main Step Body */}
      <main className="w-full">
        {/* ======================================================== */}
        {/* STEP 1: WELCOME SCREEN                                   */}
        {/* ======================================================== */}
        {step === 1 && (
          <div className="rounded-[2rem] bg-paper p-6 sm:p-9 text-center space-y-6">
            <div className="relative w-24 h-24 mx-auto">
              <Image
                src="/mivo/chat-invite.webp"
                alt="Mivo"
                fill
                sizes="96px"
                className="object-contain drop-shadow-[0_20px_30px_rgba(79,70,229,0.3)]"
              />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-stage/25 text-xs font-semibold text-stage-deep">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t("Spekvia Konuşma Simülatörü")}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-heading tracking-tight">{t("İngilizceyi sahnede konuşarak öğren")}</h1>
              <p className="text-xs sm:text-sm text-body max-w-md mx-auto leading-relaxed">{t("“Anlıyorum ama konuşamıyorum” diyenler için. Mivo karşında olur, takıldığın cümleyi anında kendi dilinde düzeltir.")}</p>
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={handleNext}
                className="w-full py-3.5 rounded-full bg-linear-to-r from-stage to-purple-pop hover:brightness-110 text-white font-bold text-sm shadow-[0_18px_36px_-16px_rgba(79,70,229,0.75)] transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
              >
                <span>{t("Kişisel Planımı Oluştur")}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-muted">{t("Zaten hesabın var mı?")}{" "}<Link href="/login" className="text-stage font-bold hover:underline">{t("Giriş Yap")}</Link>
              </p>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* STEP 2: NAME INPUT                                       */}
        {/* ======================================================== */}
        {step === 2 && (
          <div className="rounded-[2rem] bg-paper p-6 sm:p-9 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-stage uppercase">{t("Adım 2 • Tanışma")}</span>
              <h2 className="text-2xl font-extrabold text-heading tracking-tight">{t("Sana nasıl hitap edelim? 👋")}</h2>
              <p className="text-xs text-body">{t("Konuşma seanslarında ve mülakat simülasyonlarında yapay zeka seni bu isimle karşılayacak.")}</p>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs font-semibold">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="onboarding-name" className="block text-xs font-bold text-heading mb-1">{t("Adınız & Soyadınız")}</label>
              <div className="relative">
                <User className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="onboarding-name"
                  type="text"
                  autoFocus
                  placeholder={t("Örn: Ahmet Yılmaz")}
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border border-line text-sm bg-white focus:border-stage focus:ring-3 focus:ring-stage/15 outline-none transition-all text-heading font-semibold"
                />
              </div>
            </div>

            {userName.trim() && (
              <div className="p-3.5 rounded-2xl bg-white border border-line text-xs text-heading flex items-center gap-2.5">
                <span className="text-xl">☕</span>
                <span>{rich(t("Harika, tanıştığımıza memnun oldum <b>{{name}}</b>! Hadi senin için en uygun senaryoları belirleyelim.", { name: userName }), { b: (c) => <strong>{c}</strong> })}</span>
              </div>
            )}

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleBack}
                className="px-4 py-3 rounded-2xl border border-line text-body hover:bg-paper text-xs font-bold transition-all"
              >{t("Geri")}</button>
              <button
                onClick={handleNext}
                className="flex-1 py-3 rounded-full bg-linear-to-r from-stage to-purple-pop hover:brightness-110 text-white font-bold text-xs shadow-[0_18px_36px_-16px_rgba(79,70,229,0.75)] transition-all flex items-center justify-center gap-2"
              >
                <span>{t("Devam Et")}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* STEP 3: PERSONA SELECTION                                */}
        {/* ======================================================== */}
        {step === 3 && (
          <div className="rounded-[2rem] bg-paper p-6 sm:p-9 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-stage uppercase">{t("Adım 3 • Rol & Alan")}</span>
              <h2 className="text-2xl font-extrabold text-heading tracking-tight">{t("Hangi alanda İngilizceye odaklanıyorsun?")}</h2>
              <p className="text-xs text-body">{t("Sana özel mesleki ve günlük konuşma kalıplarını buna göre özelleştireceğiz.")}</p>
            </div>

            <div className="space-y-3">
              {PERSONAS.map((p) => {
                const isSelected = selectedPersona === p.id;
                return (
                  <div
                    key={p.id}
                    onClick={() => setSelectedPersona(p.id)}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-white border-stage ring-3 ring-stage/15 shadow-layered'
                        : 'bg-white hover:bg-white border-transparent shadow-layered'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-2xl bg-white border border-line flex items-center justify-center text-2xl shrink-0 shadow-xs">
                        {p.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-heading text-sm">{t(p.title)}</h3>
                          <span className="text-[10px] font-mono font-bold bg-line text-body px-1.5 py-0.5 rounded">
                            {t(p.badge)}
                          </span>
                        </div>
                        <p className="text-xs text-body mt-0.5">{t(p.sub)}</p>
                      </div>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'border-stage bg-stage text-white'
                          : 'border-line'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3" />}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleBack}
                className="px-4 py-3 rounded-2xl border border-line text-body hover:bg-paper text-xs font-bold transition-all"
              >{t("Geri")}</button>
              <button
                onClick={handleNext}
                className="flex-1 py-3 rounded-full bg-linear-to-r from-stage to-purple-pop hover:brightness-110 text-white font-bold text-xs shadow-[0_18px_36px_-16px_rgba(79,70,229,0.75)] transition-all flex items-center justify-center gap-2"
              >
                <span>{t("Devam Et")}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* STEP 4: GOAL SELECTION                                   */}
        {/* ======================================================== */}
        {step === 4 && (
          <div className="rounded-[2rem] bg-paper p-6 sm:p-9 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-stage uppercase">{t("Adım 4 • Ana Hedef")}</span>
              <h2 className="text-2xl font-extrabold text-heading tracking-tight">{t("En büyük konuşma hedefin nedir?")}</h2>
              <p className="text-xs text-body">{t("Günün ilk senaryosunu ve konuşma önceliklerini buna göre seçeceğiz.")}</p>
            </div>

            <div className="space-y-3">
              {GOALS.map((g) => {
                const isSelected = selectedGoal === g.id;
                return (
                  <div
                    key={g.id}
                    onClick={() => setSelectedGoal(g.id)}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-white border-stage ring-3 ring-stage/15 shadow-layered'
                        : 'bg-white hover:bg-white border-transparent shadow-layered'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-2xl bg-white border border-line flex items-center justify-center text-xl shrink-0 shadow-xs">
                        {g.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-heading text-sm">{t(g.title)}</h3>
                        <p className="text-xs text-body mt-0.5">{t(g.desc)}</p>
                      </div>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'border-stage bg-stage text-white'
                          : 'border-line'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3" />}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleBack}
                className="px-4 py-3 rounded-2xl border border-line text-body hover:bg-paper text-xs font-bold transition-all"
              >{t("Geri")}</button>
              <button
                onClick={handleNext}
                className="flex-1 py-3 rounded-full bg-linear-to-r from-stage to-purple-pop hover:brightness-110 text-white font-bold text-xs shadow-[0_18px_36px_-16px_rgba(79,70,229,0.75)] transition-all flex items-center justify-center gap-2"
              >
                <span>{t("Devam Et")}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* STEP 5: LEVEL SELECTION                                  */}
        {/* ======================================================== */}
        {step === 5 && (
          <div className="rounded-[2rem] bg-paper p-6 sm:p-9 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-stage uppercase">{t("Adım 5 • CEFR Seviyesi")}</span>
              <h2 className="text-2xl font-extrabold text-heading tracking-tight">{t("Mevcut İngilizce seviyen nedir?")}</h2>
              <p className="text-xs text-body">{t("Yapay zekanın konuşma hızını ve kelime zenginliğini bu seviyeye kalibre edeceğiz.")}</p>
            </div>

            <div className="space-y-2.5">
              {LEVELS.map((lvl) => {
                const isSelected = selectedLevel === lvl.code;
                return (
                  <div
                    key={lvl.code}
                    onClick={() => setSelectedLevel(lvl.code)}
                    className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-white border-stage ring-3 ring-stage/15 shadow-layered'
                        : 'bg-white hover:bg-white border-transparent shadow-layered'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-xl bg-heading text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
                        {lvl.code}
                      </span>
                      <div>
                        <div className="font-bold text-heading text-xs">{t(lvl.title)}</div>
                        <div className="text-[11px] text-body">{t(lvl.desc)}</div>
                      </div>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'border-stage bg-stage text-white'
                          : 'border-line'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3" />}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleBack}
                className="px-4 py-3 rounded-2xl border border-line text-body hover:bg-paper text-xs font-bold transition-all"
              >{t("Geri")}</button>
              <button
                onClick={handleNext}
                className="flex-1 py-3 rounded-full bg-linear-to-r from-stage to-purple-pop hover:brightness-110 text-white font-bold text-xs shadow-[0_18px_36px_-16px_rgba(79,70,229,0.75)] transition-all flex items-center justify-center gap-2"
              >
                <span>{t("Devam Et")}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* STEP 6: DAILY COMMITMENT                                 */}
        {/* ======================================================== */}
        {step === 6 && (
          <div className="rounded-[2rem] bg-paper p-6 sm:p-9 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-stage uppercase">{t("Adım 6 • Günlük Hedef")}</span>
              <h2 className="text-2xl font-extrabold text-heading tracking-tight">{t("Günde kaç dakika pratik yapabilirsin?")}</h2>
              <p className="text-xs text-body">{t("Serini (Streak) korumak için günlük hedef süreni belirle.")}</p>
            </div>

            <div className="space-y-3">
              {DAILY_GOALS.map((d) => {
                const isSelected = selectedDailyMin === d.minutes;
                return (
                  <div
                    key={d.minutes}
                    onClick={() => setSelectedDailyMin(d.minutes)}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-white border-stage ring-3 ring-stage/15 shadow-layered'
                        : 'bg-white hover:bg-white border-transparent shadow-layered'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 font-mono font-bold text-xs shrink-0">{t("{{minutes}} dk", { minutes: d.minutes })}</div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-heading text-sm">{t(d.title)}</h3>
                          <span className="text-[10px] font-mono font-bold bg-line text-body px-1.5 py-0.5 rounded">
                            {t(d.badge)}
                          </span>
                        </div>
                        <p className="text-xs text-body mt-0.5">{t(d.desc)}</p>
                      </div>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'border-stage bg-stage text-white'
                          : 'border-line'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3" />}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleBack}
                className="px-4 py-3 rounded-2xl border border-line text-body hover:bg-paper text-xs font-bold transition-all"
              >{t("Geri")}</button>
              <button
                onClick={handleNext}
                className="flex-1 py-3 rounded-full bg-linear-to-r from-stage to-purple-pop hover:brightness-110 text-white font-bold text-xs shadow-[0_18px_36px_-16px_rgba(79,70,229,0.75)] transition-all flex items-center justify-center gap-2"
              >
                <span>{t("Hesabımı Oluştur")}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* STEP 7: ACCOUNT CREATION / AUTH                          */}
        {/* ======================================================== */}
        {step === 7 && (
          <div className="rounded-[2rem] bg-paper p-6 sm:p-9 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-stage uppercase">{t("Adım 7 • Kayıt & Doğrulama")}</span>
              <h2 className="text-2xl font-extrabold text-heading tracking-tight">
                {userName ? t("{{userName}}, Planını Kaydedelim 🔐", { userName }) : t("Hesabınızı Oluşturun 🔐")}
              </h2>
              <p className="text-xs text-body">{t("Aynı e-posta ve şifre ile hem web stüdyosunda hem de mobil uygulamada oturum açacaksınız.")}</p>
            </div>

            {error && (
              <div className="p-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <span>⚠️ {error}</span>
              </div>
            )}

            <form className="space-y-4" onSubmit={handleCreateAccount}>
              <div>
                <label htmlFor="onboarding-signup-email" className="block text-xs font-bold text-heading mb-1">{t("E-posta Adresi")}</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="onboarding-signup-email"
                    type="email"
                    required
                    placeholder={t("ornek@email.com")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-line text-xs bg-white focus:border-stage outline-none transition-all text-heading"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="onboarding-signup-password" className="block text-xs font-bold text-heading mb-1">{t("Şifre")}</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="onboarding-signup-password"
                    type="password"
                    required
                    placeholder={t("En az 6 karakter")}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-line text-xs bg-white focus:border-stage outline-none transition-all text-heading"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-full bg-linear-to-r from-stage to-purple-pop hover:brightness-110 disabled:opacity-50 text-white font-bold text-xs shadow-[0_18px_36px_-16px_rgba(79,70,229,0.75)] transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
              >
                <span>{loading ? t("Hesap Kaydediliyor...") : t("Hesabımı Oluştur & Devam Et")}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-line/80" />
              </div>
              <div className="relative flex justify-center text-[11px]">
                <span className="bg-white px-2 text-muted font-medium">{t("veya tek tıkla")}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={signInWithGoogle}
              className="w-full py-2.5 rounded-xl bg-white border border-line hover:bg-paper text-heading font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-xs"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>{t("Google ile Kayıt Ol")}</span>
            </button>
          </div>
        )}

        {/* ======================================================== */}
        {/* STEP 8: READY BOARDING PASS (START STUDY)               */}
        {/* ======================================================== */}
        {step === 8 && needsEmailConfirmation && (
          <div className="rounded-[2rem] bg-paper p-6 sm:p-9 text-center space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-paper text-stage border border-stage/25 flex items-center justify-center text-3xl mx-auto shadow-md">
              <Mail className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-mono font-bold bg-paper-deep text-stage-deep px-3 py-1 rounded-full border border-stage/25">{t("E-POSTANI ONAYLA")}</span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-heading tracking-tight mt-2">{t("Neredeyse hazır,")}{" "}{userName || t("Öğrenci")}! 📬
              </h1>
              <p className="text-xs text-body max-w-sm mx-auto">
                <strong className="text-heading">{email}</strong>{" "}{t("adresine bir onay bağlantısı gönderdik. Planın kaydedildi — bağlantıya tıklayıp giriş yaptığın an stüdyon hazır olacak.")}</p>
            </div>

            <Link
              href="/login"
              className="w-full inline-flex py-4 rounded-full bg-linear-to-r from-stage to-purple-pop hover:brightness-110 text-white font-black text-sm shadow-[0_18px_36px_-16px_rgba(79,70,229,0.75)] transition-all items-center justify-center gap-2 transform hover:-translate-y-0.5"
            >
              <span>{t("Onayladım, Giriş Yapayım")}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {step === 8 && !needsEmailConfirmation && (
          <div className="rounded-[2rem] bg-paper p-6 sm:p-9 text-center space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center text-3xl mx-auto shadow-md">
              🎉
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-mono font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200">{t("✓ PLANIN VE HESABIN HAZIRLANDI")}</span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-heading tracking-tight mt-2">{t("Sahne Senin,")}{" "}{userName || t("Öğrenci")}! 🚀
              </h1>
              <p className="text-xs text-body max-w-sm mx-auto">{t("{{title}} hedefin için {{code}} seviyesinde masaüstü çalışma stüdyon aktif edildi.", { title: t(currentPersonaObj.title), code: currentLevelObj.code })}</p>
            </div>

            {/* Boarding Pass Summary Card */}
            <div className="bg-white border border-line rounded-2xl p-4 text-left space-y-2.5 text-xs">
              <div className="flex items-center justify-between border-b border-line/60 pb-2">
                <span className="text-body">{t("Kullanıcı:")}</span>
                <span className="font-bold text-heading">{userName || t("Öğrenci")} ({email})</span>
              </div>
              <div className="flex items-center justify-between border-b border-line/60 pb-2">
                <span className="text-body">{t("Başlangıç Seviyesi:")}</span>
                <span className="font-bold text-stage">{currentLevelObj.code} • {t(currentLevelObj.title)}</span>
              </div>
              <div className="flex items-center justify-between border-b border-line/60 pb-2">
                <span className="text-body">{t("Öncelikli Odak:")}</span>
                <span className="font-bold text-heading">{t(currentGoalObj.title)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-body">{t("Günlük Hedef:")}</span>
                <span className="font-bold text-emerald-600">{t("{{selectedDailyMin}} Dakika / Gün", { selectedDailyMin })}</span>
              </div>
            </div>

            <button
              onClick={handleStartStudy}
              className="w-full py-4 rounded-full bg-linear-to-r from-stage to-purple-pop hover:brightness-110 text-white font-black text-sm shadow-[0_18px_36px_-16px_rgba(79,70,229,0.75)] transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
            >
              <span>{t("Masaüstü Çalışma Stüdyosuna Gir")}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </main>
    </AuthShell>
  );
}
