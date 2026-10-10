'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
import Logo from '@/components/Logo';

// Personas matching mobile
const PERSONAS = [
  {
    id: 'student',
    category: 'Eğitim & Gençlik',
    title: 'Lise & Üniversite Öğrencisi',
    sub: 'Sınavlar, hazırlık sınıfı, Erasmus & akıcılık',
    icon: '🎓',
    badge: 'Akademik',
  },
  {
    id: 'corporate',
    category: 'Kariyer & İş',
    title: 'Çalışan & Kurumsal Profesyonel',
    sub: 'Toplantılar, e-postalar, sunumlar & mülakatlar',
    icon: '💼',
    badge: 'İş Hayatı',
  },
  {
    id: 'tech',
    category: 'Teknoloji & Yazılım',
    title: 'Yazılımcı & Mühendis',
    sub: 'Daily standuplar, global ekipler & teknik İngilizce',
    icon: '👨‍💻',
    badge: 'Teknoloji',
  },
  {
    id: 'traveler',
    category: 'Dünya & Seyahat',
    title: 'Gezgin & Seyahat Sever',
    sub: 'Yurt dışı gezileri, havalimanı, otel & yön sorma',
    icon: '✈️',
    badge: 'Seyahat',
  },
  {
    id: 'adult_hobby',
    category: 'Kişisel Gelişim & Hobi',
    title: 'Yetişkin & Hobi Sever',
    sub: 'Dizi/film anlama, beyin jimnastiği & kendi hızında',
    icon: '🌱',
    badge: 'Kişisel Gelişim',
  },
];

// Goals matching mobile
const GOALS = [
  {
    id: 'confidence',
    icon: '⚡',
    title: 'Konuşurken Tutukluğu & Çekinmeyi Yenmek',
    desc: 'Kelimeler aklımda ama ağzımdan çıkmıyor diyenler için.',
    badge: 'Özgüven',
  },
  {
    id: 'interview',
    icon: '🎯',
    title: 'İş Mülakatları & Global Kariyer',
    desc: 'FAANG, uluslararası şirketler ve terfi görüşmeleri.',
    badge: 'Kariyer',
  },
  {
    id: 'exams',
    icon: '📝',
    title: 'IELTS / TOEFL / Hazırlık Atlama',
    desc: 'Akademik konuşma ve yüksek skor hedefi.',
    badge: 'Sınav',
  },
  {
    id: 'travel',
    icon: '🌍',
    title: 'Yurt Dışı Seyahatlerinde Rahat İletişim',
    desc: 'Havalimanı, otel, restoranda sipariş ve sohbet.',
    badge: 'Seyahat',
  },
  {
    id: 'daily',
    icon: '☕',
    title: '7/24 Sabırlı ve Hata Yargılamayan Partner',
    desc: 'İstediğin an yargılanmadan saatlerce pratik yap.',
    badge: 'Günlük Pratik',
  },
];

// CEFR Levels matching mobile
const LEVELS = [
  {
    code: 'A1',
    title: 'Sıfırdan Başlıyorum',
    desc: 'Temel kelimeleri biliyorum ama cümle kuramıyorum.',
  },
  {
    code: 'A2',
    title: 'Temel Cümleler',
    desc: 'Kısa ve basit diyaloglara girebiliyorum.',
  },
  {
    code: 'B1',
    title: 'Orta Düzey (Intermediate)',
    desc: 'Çoğu konuyu anlıyorum, takılmadan konuşmak istiyorum.',
  },
  {
    code: 'B2',
    title: 'İleri Orta (Upper-Intermediate)',
    desc: 'İş ve günlük hayatta akıcıyım, nüansları geliştireceğim.',
  },
  {
    code: 'C1',
    title: 'İleri Düzey (Advanced)',
    desc: 'Profesyonel düzeyde doğallık ve derin kelime haznesi.',
  },
];

// Daily commitments
const DAILY_GOALS = [
  { minutes: 10, title: 'Rahat & Tempolu', desc: 'Günde 10 dakika mikro pratik', badge: 'Hafif' },
  { minutes: 15, title: 'Düzenli & Odaklı', desc: 'Günde 15 dakika konuşma seansı', badge: 'Önerilen' },
  { minutes: 25, title: 'Masaüstü Derin Seans', desc: 'Günde 25 dakika stüdyo çalışması', badge: 'Süper İlerleme' },
];

export default function OnboardingPage() {
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
      setError('Lütfen isminizi girin.');
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
      setError('Lütfen e-posta ve şifrenizi girin.');
      return;
    }
    if (password.length < 6) {
      setError('Şifreniz en az 6 karakter olmalıdır.');
      return;
    }

    setLoading(true);
    setError(null);

    const res = await signUp(email, password, userName || 'Öğrenci', selectedLevel, {
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
    <div className="min-h-screen relative overflow-hidden bg-[#F8FAFC] flex flex-col justify-between py-6 px-4 sm:px-6 font-sans">
      {/* Ambient glow — same treatment as the homepage hero, toned down */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[640px] h-[640px] rounded-full bg-linear-to-br from-indigo-200/35 via-cyan-200/25 to-transparent blur-3xl" />
      </div>

      {/* Top Bar: Logo & Step Progress Indicator */}
      <header className="max-w-2xl w-full mx-auto flex items-center justify-between gap-4 pb-4">
        <Link href="/" className="shrink-0 transition-transform hover:scale-105">
          <Logo />
        </Link>

        {step > 1 && step < 8 && (
          <div className="flex-1 max-w-xs space-y-1">
            <div className="flex items-center justify-between text-[11px] font-mono font-bold text-slate-400">
              <span>Adım {step} / {totalSteps}</span>
              <span className="text-indigo-600">%{progressPercent}</span>
            </div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-500 to-cyan-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        <Link
          href="/giris"
          className="text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
        >
          Giriş Yap
        </Link>
      </header>

      {/* Main Step Body */}
      <main className="max-w-xl w-full mx-auto my-auto py-4">
        {/* ======================================================== */}
        {/* STEP 1: WELCOME SCREEN                                   */}
        {/* ======================================================== */}
        {step === 1 && (
          <div className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-xl shadow-slate-200/40 text-center space-y-6">
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
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/60 text-xs font-semibold text-indigo-700">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Spekvia Konuşma Simülatörü</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Gramer Ezberlemeyi Bırak, Gerçek Sahnede Konuş 🚀
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                &ldquo;İngilizceyi anlıyorum ama konuşamıyorum&rdquo; diyenler için tasarlandı. Sabırlı yapay zeka koçun Mivo ile takıldığın anda Türkçe ipucu al, özgüvenle konuş.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={handleNext}
                className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
              >
                <span>Kişisel Planımı Oluştur</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-slate-400">
                Zaten hesabın var mı?{' '}
                <Link href="/giris" className="text-indigo-600 font-bold hover:underline">
                  Giriş Yap
                </Link>
              </p>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* STEP 2: NAME INPUT                                       */}
        {/* ======================================================== */}
        {step === 2 && (
          <div className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-xl shadow-slate-200/40 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-indigo-600 uppercase">
                Adım 2 • Tanışma
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Sana nasıl hitap edelim? 👋
              </h2>
              <p className="text-xs text-slate-500">
                Konuşma seanslarında ve mülakat simülasyonlarında yapay zeka seni bu isimle karşılayacak.
              </p>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs font-semibold">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="onboarding-name" className="block text-xs font-bold text-slate-700 mb-1">Adınız & Soyadınız</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="onboarding-name"
                  type="text"
                  autoFocus
                  placeholder="Örn: Ahmet Yılmaz"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 text-sm bg-slate-50/50 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-slate-900 font-semibold"
                />
              </div>
            </div>

            {userName.trim() && (
              <div className="p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-xs text-slate-700 flex items-center gap-2.5">
                <span className="text-xl">☕</span>
                <span>
                  Harika, tanıştığımıza memnun oldum <strong>{userName}</strong>! Hadi senin için en uygun senaryoları belirleyelim.
                </span>
              </div>
            )}

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleBack}
                className="px-4 py-3 rounded-2xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold transition-all"
              >
                Geri
              </button>
              <button
                onClick={handleNext}
                className="flex-1 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/25 transition-all flex items-center justify-center gap-2"
              >
                <span>Devam Et</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* STEP 3: PERSONA SELECTION                                */}
        {/* ======================================================== */}
        {step === 3 && (
          <div className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-xl shadow-slate-200/40 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-indigo-600 uppercase">
                Adım 3 • Rol & Alan
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Hangi alanda İngilizceye odaklanıyorsun?
              </h2>
              <p className="text-xs text-slate-500">
                Sana özel mesleki ve günlük konuşma kalıplarını buna göre özelleştireceğiz.
              </p>
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
                        ? 'bg-indigo-50/60 border-indigo-600 shadow-sm'
                        : 'bg-slate-50/50 hover:bg-slate-50 border-slate-200/80'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-2xl shrink-0 shadow-xs">
                        {p.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-slate-900 text-sm">{p.title}</h3>
                          <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                            {p.badge}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">{p.sub}</p>
                      </div>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-600 text-white'
                          : 'border-slate-300'
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
                className="px-4 py-3 rounded-2xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold transition-all"
              >
                Geri
              </button>
              <button
                onClick={handleNext}
                className="flex-1 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/25 transition-all flex items-center justify-center gap-2"
              >
                <span>Devam Et</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* STEP 4: GOAL SELECTION                                   */}
        {/* ======================================================== */}
        {step === 4 && (
          <div className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-xl shadow-slate-200/40 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-indigo-600 uppercase">
                Adım 4 • Ana Hedef
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                En büyük konuşma hedefin nedir?
              </h2>
              <p className="text-xs text-slate-500">
                Günün ilk senaryosunu ve konuşma önceliklerini buna göre seçeceğiz.
              </p>
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
                        ? 'bg-indigo-50/60 border-indigo-600 shadow-sm'
                        : 'bg-slate-50/50 hover:bg-slate-50 border-slate-200/80'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-xl shrink-0 shadow-xs">
                        {g.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm">{g.title}</h3>
                        <p className="text-xs text-slate-500 mt-0.5">{g.desc}</p>
                      </div>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-600 text-white'
                          : 'border-slate-300'
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
                className="px-4 py-3 rounded-2xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold transition-all"
              >
                Geri
              </button>
              <button
                onClick={handleNext}
                className="flex-1 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/25 transition-all flex items-center justify-center gap-2"
              >
                <span>Devam Et</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* STEP 5: LEVEL SELECTION                                  */}
        {/* ======================================================== */}
        {step === 5 && (
          <div className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-xl shadow-slate-200/40 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-indigo-600 uppercase">
                Adım 5 • CEFR Seviyesi
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Mevcut İngilizce seviyen nedir?
              </h2>
              <p className="text-xs text-slate-500">
                Yapay zekanın konuşma hızını ve kelime zenginliğini bu seviyeye kalibre edeceğiz.
              </p>
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
                        ? 'bg-indigo-50/60 border-indigo-600 shadow-sm'
                        : 'bg-slate-50/50 hover:bg-slate-50 border-slate-200/80'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-xl bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
                        {lvl.code}
                      </span>
                      <div>
                        <div className="font-bold text-slate-900 text-xs">{lvl.title}</div>
                        <div className="text-[11px] text-slate-500">{lvl.desc}</div>
                      </div>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-600 text-white'
                          : 'border-slate-300'
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
                className="px-4 py-3 rounded-2xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold transition-all"
              >
                Geri
              </button>
              <button
                onClick={handleNext}
                className="flex-1 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/25 transition-all flex items-center justify-center gap-2"
              >
                <span>Devam Et</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* STEP 6: DAILY COMMITMENT                                 */}
        {/* ======================================================== */}
        {step === 6 && (
          <div className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-xl shadow-slate-200/40 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-indigo-600 uppercase">
                Adım 6 • Günlük Hedef
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Günde kaç dakika pratik yapabilirsin?
              </h2>
              <p className="text-xs text-slate-500">
                Serini (Streak) korumak için günlük hedef süreni belirle.
              </p>
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
                        ? 'bg-indigo-50/60 border-indigo-600 shadow-sm'
                        : 'bg-slate-50/50 hover:bg-slate-50 border-slate-200/80'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 font-mono font-bold text-xs shrink-0">
                        {d.minutes} dk
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-slate-900 text-sm">{d.title}</h3>
                          <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                            {d.badge}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">{d.desc}</p>
                      </div>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-600 text-white'
                          : 'border-slate-300'
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
                className="px-4 py-3 rounded-2xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold transition-all"
              >
                Geri
              </button>
              <button
                onClick={handleNext}
                className="flex-1 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/25 transition-all flex items-center justify-center gap-2"
              >
                <span>Hesabımı Oluştur</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* STEP 7: ACCOUNT CREATION / AUTH                          */}
        {/* ======================================================== */}
        {step === 7 && (
          <div className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-xl shadow-slate-200/40 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-indigo-600 uppercase">
                Adım 7 • Kayıt & Doğrulama
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                {userName ? `${userName}, Planını Kaydedelim 🔐` : 'Hesabınızı Oluşturun 🔐'}
              </h2>
              <p className="text-xs text-slate-500">
                Aynı e-posta ve şifre ile hem web stüdyosunda hem de mobil uygulamada oturum açacaksınız.
              </p>
            </div>

            {error && (
              <div className="p-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <span>⚠️ {error}</span>
              </div>
            )}

            <form className="space-y-4" onSubmit={handleCreateAccount}>
              <div>
                <label htmlFor="onboarding-signup-email" className="block text-xs font-bold text-slate-700 mb-1">
                  E-posta Adresi
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="onboarding-signup-email"
                    type="email"
                    required
                    placeholder="ornek@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50/50 focus:bg-white focus:border-indigo-500 outline-none transition-all text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="onboarding-signup-password" className="block text-xs font-bold text-slate-700 mb-1">Şifre</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="onboarding-signup-password"
                    type="password"
                    required
                    placeholder="En az 6 karakter"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50/50 focus:bg-white focus:border-indigo-500 outline-none transition-all text-slate-900"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
              >
                <span>{loading ? 'Hesap Kaydediliyor...' : 'Hesabımı Oluştur & Devam Et'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200/80" />
              </div>
              <div className="relative flex justify-center text-[11px]">
                <span className="bg-white px-2 text-slate-400 font-medium">veya tek tıkla</span>
              </div>
            </div>

            <button
              type="button"
              onClick={signInWithGoogle}
              className="w-full py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-xs"
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
              <span>Google ile Kayıt Ol</span>
            </button>
          </div>
        )}

        {/* ======================================================== */}
        {/* STEP 8: READY BOARDING PASS (START STUDY)               */}
        {/* ======================================================== */}
        {step === 8 && needsEmailConfirmation && (
          <div className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-2xl shadow-indigo-950/10 text-center space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-indigo-50 text-indigo-600 border border-indigo-200 flex items-center justify-center text-3xl mx-auto shadow-md">
              <Mail className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-mono font-bold bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full border border-indigo-200">
                E-POSTANI ONAYLA
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
                Neredeyse hazır, {userName || 'Öğrenci'}! 📬
              </h1>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                <strong className="text-slate-700">{email}</strong> adresine bir onay bağlantısı gönderdik.
                Planın kaydedildi — bağlantıya tıklayıp giriş yaptığın an stüdyon hazır olacak.
              </p>
            </div>

            <Link
              href="/giris"
              className="w-full inline-flex py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm shadow-xl shadow-indigo-600/30 transition-all items-center justify-center gap-2 transform hover:-translate-y-0.5"
            >
              <span>Onayladım, Giriş Yapayım</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {step === 8 && !needsEmailConfirmation && (
          <div className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-2xl shadow-indigo-950/10 text-center space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center text-3xl mx-auto shadow-md">
              🎉
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-mono font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200">
                ✓ PLANIN VE HESABIN HAZIRLANDI
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
                Sahne Senin, {userName || 'Öğrenci'}! 🚀
              </h1>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {currentPersonaObj.title} hedefin için {currentLevelObj.code} seviyesinde masaüstü çalışma stüdyon aktif edildi.
              </p>
            </div>

            {/* Boarding Pass Summary Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left space-y-2.5 text-xs">
              <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                <span className="text-slate-500">Kullanıcı:</span>
                <span className="font-bold text-slate-900">{userName || 'Öğrenci'} ({email})</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                <span className="text-slate-500">Başlangıç Seviyesi:</span>
                <span className="font-bold text-indigo-600">{currentLevelObj.code} • {currentLevelObj.title}</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                <span className="text-slate-500">Öncelikli Odak:</span>
                <span className="font-bold text-slate-800">{currentGoalObj.title}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Günlük Hedef:</span>
                <span className="font-bold text-emerald-600">{selectedDailyMin} Dakika / Gün</span>
              </div>
            </div>

            <button
              onClick={handleStartStudy}
              className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
            >
              <span>Masaüstü Çalışma Stüdyosuna Gir</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-slate-400 py-2">
        <span>© 2026 Spekvia. Web ve Mobil Tek Hesap Sistemi.</span>
      </footer>
    </div>
  );
}
