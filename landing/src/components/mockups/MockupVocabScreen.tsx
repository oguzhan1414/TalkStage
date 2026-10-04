"use client";

import { Volume2, Plus, Sparkles, BookOpen, Mic } from "lucide-react";

export default function MockupVocabScreen() {
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

      {/* 2. Header & Action Button */}
      <div className="flex items-center justify-between px-3.5 py-1.5">
        <div>
          <h3 className="text-[13px] font-black text-slate-900 leading-tight">Kelime Sandığı</h3>
          <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">SM-2 Aralıklı Tekrar</span>
        </div>
        <button className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white px-2 py-1 rounded-full text-[9px] font-bold shadow-xs transition-colors">
          <Plus className="w-2.5 h-2.5" />
          <span>Kelime Ekle</span>
        </button>
      </div>

      {/* 3. Sub-Tabs */}
      <div className="px-3.5 py-1">
        <div className="flex bg-slate-200/70 p-0.5 rounded-lg text-[9px] font-bold">
          <button className="flex-1 py-1 rounded-md bg-white text-indigo-700 shadow-2xs text-center font-extrabold flex items-center justify-center gap-1">
            <Sparkles className="w-2.5 h-2.5 text-indigo-600" />
            <span>Akıllı Pratik (4)</span>
          </button>
          <button className="flex-1 py-1 text-slate-500 text-center font-medium">
            <span>Tüm Kelimelerim (450)</span>
          </button>
        </div>
      </div>

      {/* 4. Progress Bar */}
      <div className="px-3.5 py-1">
        <div className="flex items-center justify-between text-[8px] font-bold text-slate-500 mb-1">
          <span>Kişisel Kelime Sandığı</span>
          <span className="text-indigo-600 font-extrabold">4 / 10 Kelime</span>
        </div>
        <div className="w-full h-1 bg-slate-200/80 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full w-[40%]" />
        </div>
      </div>

      {/* 5. Main 3D Flashcard */}
      <div className="flex-1 px-3 py-1.5 flex flex-col justify-between overflow-hidden">
        <div className="relative rounded-2xl bg-white border border-slate-200/90 p-3.5 shadow-md shadow-indigo-500/10 flex flex-col justify-between flex-1">
          {/* Top Pill & Audio Button */}
          <div className="flex items-center justify-between">
            <span className="bg-purple-50 border border-purple-200 text-purple-700 text-[8px] font-extrabold px-2 py-0.5 rounded-full">
              B2 • İş &amp; Standup
            </span>
            <button className="flex items-center gap-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full text-[8.5px] font-bold transition-colors">
              <Volume2 className="w-3 h-3 text-indigo-600 animate-pulse" />
              <span>Dinle</span>
            </button>
          </div>

          {/* Target Word */}
          <div className="my-auto text-center py-2">
            <h2 className="text-2xl font-black tracking-tight text-slate-900 leading-tight">
              negotiate
            </h2>
            <div className="mt-0.5 text-[9px] font-mono text-slate-400">
              /nəˈɡoʊ.ʃi.eɪt/ • <span className="italic font-sans text-indigo-600 font-semibold">fiil</span>
            </div>

            {/* Turkish Hint Badge */}
            <div className="mt-2 inline-flex items-center gap-1 bg-blue-50 border border-blue-200/70 text-blue-700 text-[9.5px] font-bold px-2.5 py-0.5 rounded-lg">
              <span>🤝</span>
              <span>müzakere etmek, anlaşmak</span>
            </div>

            {/* Contextual Sentence */}
            <div className="mt-2.5 bg-slate-50 border border-slate-100 rounded-xl p-2 text-left">
              <p className="text-[9px] text-slate-700 font-semibold leading-relaxed">
                “We need to <span className="text-indigo-600 font-black underline decoration-indigo-300">negotiate</span> the project deadline before Monday.”
              </p>
              <p className="mt-0.5 text-[8px] text-slate-400">
                Pazartesiden önce proje teslim tarihini müzakere etmeliyiz.
              </p>
            </div>
          </div>

          {/* Card Footer: Memory retention bar */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[8px]">
            <span className="text-slate-400">🧠 Hafıza Gücü:</span>
            <span className="font-extrabold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded-md">
              %85 (3 gün sonra)
            </span>
          </div>
        </div>

        {/* Swipe Prompt */}
        <div className="text-center py-1 text-[8px] font-semibold text-slate-400">
          👈 Sola: Tekrar • Sağa: Kolay 👉
        </div>

        {/* 6. Duolingo Style 3D Gamified Feedback Buttons */}
        <div className="grid grid-cols-2 gap-1.5 pb-0.5">
          {/* İyi (3 gün) */}
          <button className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-gradient-to-b from-indigo-50 to-indigo-100/60 border-2 border-indigo-200/90 text-indigo-700 shadow-xs hover:border-indigo-400 transition-all active:translate-y-0.5">
            <div className="flex items-center gap-1 text-[10px] font-black">
              <span>👍</span>
              <span>İyi</span>
            </div>
            <span className="text-[7.5px] text-indigo-500 font-semibold">3 gün sonra</span>
          </button>

          {/* Kolay (7+ gün) */}
          <button className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-gradient-to-b from-emerald-50 to-emerald-100/60 border-2 border-emerald-300 text-emerald-700 shadow-xs hover:border-emerald-500 transition-all active:translate-y-0.5">
            <div className="flex items-center gap-1 text-[10px] font-black">
              <span>⚡</span>
              <span>Kolay</span>
            </div>
            <span className="text-[7.5px] text-emerald-600 font-semibold">7+ gün sonra</span>
          </button>
        </div>
      </div>

      {/* 7. Crisp Bottom Navigation Dock */}
      <div className="bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-4 py-1.5 flex items-center justify-between text-slate-400">
        <div className="flex flex-col items-center hover:text-slate-600">
          <div className="w-6 h-6 flex items-center justify-center">
            <Mic className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <span className="text-[7.5px] font-semibold mt-0.5">Sahne</span>
        </div>

        <div className="flex flex-col items-center hover:text-slate-600">
          <div className="w-6 h-6 flex items-center justify-center">
            <span className="text-xs">🗺️</span>
          </div>
          <span className="text-[7.5px] font-semibold mt-0.5">Seviyeler</span>
        </div>

        <div className="flex flex-col items-center text-indigo-600">
          <div className="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center">
            <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
          </div>
          <span className="text-[7.5px] font-black mt-0.5">Kelimeler</span>
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
