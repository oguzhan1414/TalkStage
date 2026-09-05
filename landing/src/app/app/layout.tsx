'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import {
  Headphones,
  Flame,
  Zap,
  LogOut,
  Menu,
  X,
  BookOpen,
  Mic,
  Archive,
  Layers,
  Award,
  AlertCircle,
  User,
  type LucideIcon,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import {
  getStudyStats,
  getSavedVocabCards,
  syncCloudVocabCards,
  type UserStudyStats,
} from '@/lib/storage';

type TopTabItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

const TOP_NAV_TABS: TopTabItem[] = [
  { href: '/app', label: 'Öğren', icon: BookOpen },
  { href: '/app/scenarios', label: 'Konuş', icon: Mic },
  { href: '/app/vocab', label: 'Tekrar', icon: Archive },
  { href: '/app/podcasts', label: 'Dinle', icon: Headphones },
  { href: '/app/library', label: 'Kütüphane', icon: Layers },
  { href: '/app/grammar', label: 'Gramer', icon: Award },
  { href: '/app/mistakes', label: 'Hatalarım', icon: AlertCircle },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, profile, loading, signOut } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [stats, setStats] = useState<UserStudyStats>({
    xp: 0,
    streakDays: 0,
    minutesToday: 0,
    dailyGoalMin: 25,
    completedScenarios: [],
    completedLessons: [],
    lastStudyDate: '',
  });

  const refreshData = () => {
    setStats(getStudyStats());
  };

  useEffect(() => {
    refreshData();
    syncCloudVocabCards();

    window.addEventListener('talkstage_stats_updated', refreshData);
    window.addEventListener('talkstage_vocab_updated', refreshData);
    window.addEventListener('talkstage_profile_updated', refreshData);
    return () => {
      window.removeEventListener('talkstage_stats_updated', refreshData);
      window.removeEventListener('talkstage_vocab_updated', refreshData);
      window.removeEventListener('talkstage_profile_updated', refreshData);
    };
  }, [user]);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center space-y-4">
        <div className="relative w-14 h-14 animate-pulse">
          <Image src="/images/64_companion_yanki_transparent.png" alt="" fill sizes="56px" className="object-contain" />
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
          <span className="w-3.5 h-3.5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <span>TalkStage Masaüstü Stüdyosu Yükleniyor...</span>
        </div>
      </div>
    );
  }

  const userCefrLevel = profile?.targetLevel || 'A1';
  const displayName = profile?.fullName || user.email?.split('@')[0] || 'Öğrenci';
  const userXp = profile?.xp || stats.xp || 205;
  const streak = profile?.streakDays || stats.streakDays || 1;
  const initialLetter = (displayName[0] || 'U').toUpperCase();

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans antialiased flex flex-col">
      {/* 1. CLEAN SLEEK TOP HEADER (BUSUU STYLE WITHOUT NOISY BADGES) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-15 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <Link href="/app" className="flex items-center gap-2.5 group shrink-0">
              <div className="relative w-8 h-8 shrink-0 group-hover:scale-105 transition-transform">
                <Image
                  src="/images/64_companion_yanki_transparent.png"
                  alt="TalkStage"
                  fill
                  sizes="32px"
                  className="object-contain"
                />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-slate-900">
                  TalkStage
                </span>
                <span className="text-[10px] font-mono font-bold bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded border border-indigo-200">
                  Studio
                </span>
              </div>
            </Link>
          </div>

          {/* Center Navigation Tabs (Clean & Uncluttered) */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-1.5">
            {TOP_NAV_TABS.map((tab) => {
              const isActive =
                pathname === tab.href ||
                (tab.href !== '/app' && pathname.startsWith(tab.href));
              const Icon = tab.icon;

              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Header: Streak, XP, Level, Single Avatar */}
          <div className="flex items-center gap-2">
            {/* Streak */}
            <div
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold font-mono shadow-xs"
              title="Günlük Seri (Streak)"
            >
              <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{streak}</span>
            </div>

            {/* XP */}
            <div
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold font-mono shadow-xs"
              title="Kazanılan Toplam XP"
            >
              <Zap className="w-3.5 h-3.5 fill-indigo-500 text-indigo-500" />
              <span>{userXp} XP</span>
            </div>

            {/* Level Badge */}
            <div
              className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold font-mono shadow-xs"
              title={`Mevcut Hedef Seviye: ${userCefrLevel}`}
            >
              <span>🎯 {userCefrLevel}</span>
            </div>

            {/* User Profile Single Clean Pill Button */}
            <Link
              href="/app/profile"
              className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full border border-slate-200 bg-white hover:border-indigo-300 transition-colors shadow-xs"
              title="Profilim & Ayarlar"
            >
              <span className="text-xs font-bold text-slate-800 hidden xl:inline max-w-[90px] truncate">
                {displayName}
              </span>
              <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-[11px] shadow-xs shrink-0">
                {initialLetter}
              </div>
            </Link>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="p-1.5 rounded-xl text-slate-600 hover:bg-slate-100 md:hidden"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white p-4 space-y-2 animate-in slide-in-from-top-2">
            <div className="grid grid-cols-2 gap-2">
              {TOP_NAV_TABS.map((tab) => {
                const isActive = pathname === tab.href;
                const Icon = tab.icon;

                return (
                  <Link
                    key={tab.href}
                    href={tab.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
              <Link
                href="/app/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-700 hover:text-indigo-600 flex items-center gap-1.5"
              >
                <User className="w-4 h-4" />
                <span>Profil & Ayarlar</span>
              </Link>
              <button
                onClick={() => signOut()}
                className="text-red-600 hover:underline flex items-center gap-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Çıkış Yap</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* 2. MAIN WORKSPACE CONTAINER */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {children}
      </main>
    </div>
  );
}
