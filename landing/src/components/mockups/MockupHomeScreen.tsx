"use client";

import Image from "next/image";
import { Mic, MessageSquare, Flame, Sparkles, Check, ChevronRight } from "lucide-react";

export default function MockupHomeScreen() {
  return (
    <div className="relative flex flex-col h-full w-full bg-[#FAFBFD] text-slate-800 select-none overflow-hidden font-sans">
      {/* 1. Fake iOS Status Bar */}
      <div className="flex items-center justify-between px-4 pt-2.5 pb-1 text-[11px] font-semibold text-slate-700">
        <span>09:41</span>
        <div className="flex items-center gap-1.5 text-[10px]">
          <span className="font-bold">5G</span>
          <div className="w-4 h-2 border border-slate-700 rounded-xs p-0.5 flex items-center">
            <div className="w-full h-full bg-slate-700 rounded-2xs" />
          </div>
        </div>
      </div>

      {/* 2. User Header & Gamification Bar */}
      <div className="flex items-center justify-between px-3.5 py-1.5">
        <div className="flex items-center gap-2">
          <div className="relative w-8 h-8 rounded-full border-2 border-indigo-500 overflow-hidden bg-indigo-50">
            <Image
              src="/images/59_avatar_female_tech_lead.png"
              alt="Deniz"
              fill
              sizes="32px"
              className="object-cover"
            />
            <span className="absolute -bottom-0.5 -right-0.5 bg-indigo-600 text-white text-[8px] font-black px-1 rounded-full border border-white">
              B1
            </span>
          </div>
          <div>
            <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400 uppercase tracking-wider">
              <span>GÜNAYDIN</span>
              <span>☀️</span>
            </div>
            <div className="text-[12px] font-black text-slate-900 leading-tight">Deniz</div>
          </div>
        </div>

        {/* Gamification Pills */}
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-1 bg-amber-50 border border-amber-200/80 px-1.5 py-0.5 rounded-full shadow-2xs">
            <Flame className="w-3 h-3 text-amber-500 fill-amber-500" />
            <span className="text-[10px] font-extrabold text-amber-700">12</span>
          </div>
          <div className="flex items-center gap-1 bg-blue-50 border border-blue-200/80 px-1.5 py-0.5 rounded-full shadow-2xs">
            <Sparkles className="w-3 h-3 text-blue-500 fill-blue-500" />
            <span className="text-[10px] font-extrabold text-blue-700">593</span>
          </div>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 px-3 py-1.5 space-y-2.5 overflow-hidden flex flex-col justify-between">
        {/* 3. Hero Action Card: Yankı Canlı AI */}
        <div className="relative rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-3 text-white shadow-md shadow-purple-500/15 overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-white/10 blur-xl pointer-events-none" />

          {/* Badge & Live Audio Wave */}
          <div className="flex items-center justify-between mb-1.5">
            <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full text-[9px] font-bold text-white/95">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Yankı Canlı • &lt;1.2s Ses AI</span>
            </div>
            {/* Live Audio Visualizer Bars */}
            <div className="flex items-center gap-0.5 h-3">
              <span className="w-0.5 h-2 bg-emerald-300 rounded-full animate-pulse" />
              <span className="w-0.5 h-3.5 bg-emerald-300 rounded-full animate-pulse delay-75" />
              <span className="w-0.5 h-1.5 bg-emerald-300 rounded-full animate-pulse delay-150" />
              <span className="w-0.5 h-3 bg-emerald-300 rounded-full animate-pulse delay-100" />
            </div>
          </div>

          <div className="flex items-center justify-between gap-1">
            <div className="flex-1 pr-1">
              <h4 className="text-[11px] font-extrabold leading-snug tracking-tight text-white">
                “Sabah kahvesiyle 5 dk Standup provası yapalım mı?”
              </h4>
              <p className="mt-1 text-[8.5px] leading-tight text-purple-100/90 font-medium">
                Takıldığın an alttan Türkçe fısıldarım, donmadan akıcı konuşursun.
              </p>
            </div>

            {/* Coffee Mascot */}
            <div className="relative w-12 h-12 shrink-0 drop-shadow-md">
              <Image
                src="/images/64_companion_yanki_coffee_cup.png"
                alt="Yankı"
                fill
                sizes="48px"
                className="object-contain"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-2.5 flex items-center gap-1.5">
            <button className="flex-1 flex items-center justify-center gap-1 bg-white text-indigo-700 py-1.5 px-2 rounded-xl text-[10px] font-black shadow-xs hover:bg-slate-50 transition-colors">
              <Mic className="w-3 h-3 text-pink-500 fill-pink-500/20" />
              <span>Hemen Canlı Konuş</span>
              <ChevronRight className="w-2.5 h-2.5 text-indigo-400" />
            </button>
            <button className="flex items-center justify-center gap-1 bg-white/15 hover:bg-white/20 text-white py-1.5 px-2 rounded-xl text-[9px] font-bold backdrop-blur-xs transition-colors">
              <MessageSquare className="w-2.5 h-2.5" />
              <span>Yazılı Chat</span>
            </button>
          </div>
        </div>

        {/* 4. Daily Speaking Target (Study Path) */}
        <div className="rounded-xl bg-white border border-slate-200/80 p-2 shadow-2xs">
          <div className="flex items-center justify-between text-[9px] font-bold mb-1">
            <div className="flex items-center gap-1 text-slate-700">
              <span className="text-amber-500">🔥</span>
              <span className="uppercase tracking-wider">Günlük Konuşma Rotası</span>
            </div>
            <span className="text-pink-600 font-extrabold">%80</span>
          </div>
          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-amber-400 via-pink-500 to-indigo-600 rounded-full w-[80%]" />
          </div>
          <div className="mt-1 flex items-center justify-between text-[8px] text-slate-400 font-medium">
            <span>12 / 15 Dk Tamamlandı</span>
            <span className="text-indigo-600 font-bold hover:underline">Rotaya Git →</span>
          </div>
        </div>

        {/* 5. CEFR Level Journey Cards */}
        <div className="rounded-xl bg-white border border-slate-200/80 p-2 shadow-2xs">
          <div className="flex items-center justify-between text-[9px] font-bold mb-1.5">
            <span className="text-slate-800">SEVİYE YOLCULUĞU</span>
            <span className="text-indigo-600 font-bold text-[8.5px]">A1 → C2 İlerle →</span>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            {/* A1 Card */}
            <div className="rounded-lg bg-emerald-50/60 border border-emerald-200/60 p-1.5 text-center flex flex-col items-center">
              <div className="flex items-center justify-between w-full text-[8px] font-extrabold text-emerald-700">
                <span>A1</span>
                <Check className="w-2.5 h-2.5 text-emerald-600" />
              </div>
              <div className="w-6 h-6 relative my-0.5">
                <Image
                  src="/images/47_level_a1_sprout_starter.png"
                  alt="A1"
                  fill
                  sizes="24px"
                  className="object-contain"
                />
              </div>
              <span className="text-[8px] font-bold text-slate-700 leading-none">Başlangıç</span>
              <span className="text-[6.5px] text-emerald-600 font-medium">Tamamlandı</span>
            </div>

            {/* A2 Card */}
            <div className="rounded-lg bg-cyan-50/60 border border-cyan-200/60 p-1.5 text-center flex flex-col items-center">
              <div className="flex items-center justify-between w-full text-[8px] font-extrabold text-cyan-700">
                <span>A2</span>
                <Check className="w-2.5 h-2.5 text-cyan-600" />
              </div>
              <div className="w-6 h-6 relative my-0.5">
                <Image
                  src="/images/48_level_a2_cyan_shield.png"
                  alt="A2"
                  fill
                  sizes="24px"
                  className="object-contain"
                />
              </div>
              <span className="text-[8px] font-bold text-slate-700 leading-none">Temel Pratik</span>
              <span className="text-[6.5px] text-cyan-600 font-medium">Tamamlandı</span>
            </div>

            {/* B1 Card (Current active) */}
            <div className="rounded-lg bg-indigo-50 border-2 border-indigo-500 p-1.5 text-center flex flex-col items-center relative shadow-xs">
              <div className="flex items-center justify-between w-full text-[8px] font-extrabold text-indigo-700">
                <span>B1</span>
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-ping" />
              </div>
              <div className="w-6 h-6 relative my-0.5">
                <Image
                  src="/images/49_level_b1_indigo_shield.png"
                  alt="B1"
                  fill
                  sizes="24px"
                  className="object-contain"
                />
              </div>
              <span className="text-[8px] font-extrabold text-indigo-900 leading-none">İş &amp; Standup</span>
              <span className="text-[6.5px] text-indigo-600 font-bold">Şu Anki Seviye</span>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Crisp Floating Bottom Navigation Dock */}
      <div className="bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-4 py-1.5 flex items-center justify-between text-slate-400">
        <div className="flex flex-col items-center text-indigo-600">
          <div className="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center">
            <Mic className="w-3.5 h-3.5 text-indigo-600" />
          </div>
          <span className="text-[7.5px] font-black mt-0.5">Sahne</span>
        </div>

        <div className="flex flex-col items-center hover:text-slate-600">
          <div className="w-6 h-6 flex items-center justify-center">
            <span className="text-xs">🗺️</span>
          </div>
          <span className="text-[7.5px] font-semibold mt-0.5">Seviyeler</span>
        </div>

        <div className="flex flex-col items-center hover:text-slate-600">
          <div className="w-6 h-6 flex items-center justify-center">
            <span className="text-xs">📚</span>
          </div>
          <span className="text-[7.5px] font-semibold mt-0.5">Kelimeler</span>
        </div>

        <div className="flex flex-col items-center hover:text-slate-600">
          <div className="w-6 h-6 flex items-center justify-center">
            <span className="text-xs">👤</span>
          </div>
          <span className="text-[7.5px] font-semibold mt-0.5">Profil</span>
        </div>
      </div>
    </div>
  );
}
