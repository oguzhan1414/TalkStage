'use client';

import { useState, useEffect } from 'react';
import {
  User,
  Settings,
  Flame,
  Zap,
  BookMarked,
  Check,
  Save,
  LogOut,
  Sparkles,
  Award,
  Smartphone,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { getSavedVocabCards } from '@/lib/storage';

const CEFR_LEVELS = [
  { code: 'A1', title: 'Başlangıç', desc: 'Temel hayatta kalma ve tanışma' },
  { code: 'A2', title: 'Temel (Elementary)', desc: 'Günlük rutinler, seyahat ve alışveriş' },
  { code: 'B1', title: 'Orta (Intermediate)', desc: 'İş toplantıları ve mülakatlar' },
  { code: 'B2', title: 'İleri Orta (Upper-Int)', desc: 'Akıcı tartışma ve teknik sunumlar' },
  { code: 'C1', title: 'İleri (Advanced)', desc: 'Liderlik ve profesyonel akıcılık' },
  { code: 'C2', title: 'Ustalık (Mastery)', desc: 'Anadili akıcılığı ve derin nüanslar' },
];

const DAILY_GOALS = [
  { min: 10, label: '10 Dakika / Gün (Rahat)' },
  { min: 15, label: '15 Dakika / Gün (Düzenli)' },
  { min: 25, label: '25 Dakika / Gün (Masaüstü Derin Seans)' },
];

export default function ProfileSettingsPage() {
  const { user, profile, updateProfile, signOut } = useAuth();

  const [name, setName] = useState(profile?.fullName || '');
  const [level, setLevel] = useState(profile?.targetLevel || 'A1');
  const [dailyGoal, setDailyGoal] = useState(profile?.dailyGoalMin || 25);
  const [savedCount, setSavedCount] = useState(0);
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (profile) {
      setName(profile.fullName || '');
      setLevel(profile.targetLevel || 'A1');
      setDailyGoal(profile.dailyGoalMin || 25);
    }
    setSavedCount(getSavedVocabCards().length);
  }, [profile]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    await updateProfile({
      fullName: name.trim(),
      targetLevel: level,
      dailyGoalMin: dailyGoal,
    });

    setSaving(false);
    setToastMessage('✓ Profil ayarlarınız ve CEFR seviyeniz güncellendi (Mobille eşitlendi)');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const displayName = profile?.fullName || user?.email?.split('@')[0] || 'Öğrenci';
  const initials = displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-950 text-white border border-slate-700 px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-300">
          <div className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
            ✓
          </div>
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Profil & Öğrenme Ayarları ⚙️
          </h1>
          <span className="text-xs font-mono font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-200/60">
            Mobil & Web Ortak Hesap
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Burada yapacağınız tüm seviye ve profil değişiklikleri mobil uygulamanızla anında eşitlenir.
        </p>
      </div>

      {/* 1. Account Summary Card */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-500 flex items-center justify-center text-white font-extrabold text-2xl shadow-md shadow-indigo-600/20">
            {initials}
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <h2 className="text-xl font-bold text-slate-900 leading-tight">{displayName}</h2>
            <div className="text-xs text-slate-500 font-mono">{user?.email}</div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200/60">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>{level} Seviyesi Aktif</span>
            </div>
          </div>
        </div>

        {/* Stats Pills */}
        <div className="flex items-center gap-3">
          <div className="bg-slate-50 border border-slate-200/80 px-4 py-2 rounded-2xl text-center">
            <div className="text-xs text-slate-400 font-semibold">Günlük Seri</div>
            <div className="text-sm font-bold text-amber-600 flex items-center justify-center gap-1">
              <Flame className="w-4 h-4 fill-current" />
              <span>{profile?.streakDays || 4} Gün</span>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 px-4 py-2 rounded-2xl text-center">
            <div className="text-xs text-slate-400 font-semibold">Toplam XP</div>
            <div className="text-sm font-bold text-indigo-600 flex items-center justify-center gap-1">
              <Zap className="w-4 h-4 fill-current" />
              <span>{profile?.xp || 340} XP</span>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 px-4 py-2 rounded-2xl text-center">
            <div className="text-xs text-slate-400 font-semibold">Sandık</div>
            <div className="text-sm font-bold text-slate-800 flex items-center justify-center gap-1">
              <BookMarked className="w-4 h-4 text-slate-500" />
              <span>{savedCount} Kelime</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Profile Settings Form */}
      <form onSubmit={handleSave} className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
        <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-3">
          Öğrenme Tercihlerini Düzenle
        </h3>

        {/* Display Name Input */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Adınız & Soyadınız (Görünür İsim)
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50/50 focus:bg-white focus:border-indigo-500 outline-none text-slate-900 font-semibold transition-all"
          />
          <p className="text-[11px] text-slate-400 mt-1">
            Yapay zeka konuşma senaryolarında ve mülakatlarda size bu isimle hitap eder.
          </p>
        </div>

        {/* CEFR Level Selection Grid */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Aktif CEFR İngilizce Seviyeniz
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {CEFR_LEVELS.map((lvl) => {
              const isSelected = level === lvl.code;
              return (
                <div
                  key={lvl.code}
                  onClick={() => setLevel(lvl.code)}
                  className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-indigo-50 border-indigo-600 shadow-xs'
                      : 'bg-slate-50/60 hover:bg-slate-50 border-slate-200/70'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
                      {lvl.code}
                    </span>
                    <div>
                      <div className="font-bold text-slate-900 text-xs">{lvl.title}</div>
                      <div className="text-[10px] text-slate-400 leading-tight">{lvl.desc}</div>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 text-xs">
                      ✓
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Daily Time Goal */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Günlük Çalışma Hedefiniz
          </label>
          <select
            value={dailyGoal}
            onChange={(e) => setDailyGoal(Number(e.target.value))}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50/50 focus:bg-white focus:border-indigo-500 outline-none text-slate-900 font-semibold"
          >
            {DAILY_GOALS.map((d) => (
              <option key={d.min} value={d.min}>
                {d.label}
              </option>
            ))}
          </select>
        </div>

        {/* Save Button */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
            <Smartphone className="w-4 h-4" />
            <span>Mobil Cihazınızla Otomatik Eşitlenir</span>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-indigo-600/25 transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}</span>
          </button>
        </div>
      </form>

      {/* Sign Out Card */}
      <div className="bg-red-50/50 border border-red-200/60 rounded-3xl p-6 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-red-950 text-sm">Oturumu Kapat</h3>
          <p className="text-xs text-red-700 mt-0.5">
            Bu cihazdaki Spekiva oturumunuz sonlandırılır.
          </p>
        </div>

        <button
          onClick={signOut}
          className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Çıkış Yap</span>
        </button>
      </div>
    </div>
  );
}
