'use client';

import { use, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Send,
  Volume2,
  Sparkles,
  CheckCircle2,
  Circle,
  ArrowLeft,
  RotateCcw,
  Award,
  Plus,
} from 'lucide-react';
import { SCENARIOS, type ScenarioEntry } from '@talkstage/shared-data/scenariosData';
import { speakEnglish } from '@/lib/audio';
import { saveVocabCard } from '@/lib/storage';
import { api, ApiError } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import type { ChatCorrection, ChatMessageResponse, ChatTurn } from '@/types/api';
import { InteractiveVideoScenario } from '@/components/InteractiveVideoScenario';

type ChatMessage = {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
  correction?: ChatCorrection;
};

/** Sent as `role_context` on every turn (backend is stateless — nothing
 * persists server-side) so the model actually stays in character and — since
 * a role_context is present — the backend's real turn-cap completion logic
 * (text_chat.py) kicks in instead of never firing. Same mechanism mobile's
 * Study Path missions use. */
function buildRoleContext(scenario: ScenarioEntry): string {
  const goals = scenario.objectives.map((o) => o.text).join('; ');
  return `You are playing "${scenario.aiName}" (${scenario.aiRole}). Situation: ${scenario.situation} Naturally guide the user toward these goals during the chat: ${goals}.`;
}

export default function ScenarioStudioPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const scenario = SCENARIOS.find((s) => s.id === id) ?? SCENARIOS[0];
  const { refreshProfile } = useAuth();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [completedObjectives, setCompletedObjectives] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const practiceLoggedRef = useRef(false);

  // Initialize with AI starter message
  useEffect(() => {
    setMessages([
      {
        id: 'msg_0',
        sender: 'ai',
        text: scenario.starterAiMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setCompletedObjectives([]);
    setIsCompleted(false);
    practiceLoggedRef.current = false;
  }, [scenario]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAiThinking]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isAiThinking || isCompleted) return;

    const history: ChatTurn[] = messages.map((m) => ({
      role: m.sender === 'ai' ? 'assistant' : 'user',
      content: m.text,
    }));

    const userMsg: ChatMessage = {
      id: `msg_user_${Date.now()}`,
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsAiThinking(true);

    // Soft, approximate progress hint (not an AI-graded claim) — advances one
    // step per turn so the checklist doesn't sit static all conversation.
    if (completedObjectives.length < scenario.objectives.length) {
      setCompletedObjectives((prev) => [...prev, scenario.objectives[prev.length].id]);
    }

    // Real "practiced today" signal (+8 XP, streak update) — once per scenario
    // session, same as mobile's Study Path missions.
    if (!practiceLoggedRef.current) {
      practiceLoggedRef.current = true;
      api
        .post('/progress/log-practice')
        .then(() => refreshProfile())
        .catch(() => {});
    }

    try {
      const response = await api.post<ChatMessageResponse>('/chat/message', {
        history,
        message: text,
        role_context: buildRoleContext(scenario),
      });

      setMessages((prev) => [
        ...prev.map((m) => (m.id === userMsg.id ? { ...m, correction: response.correction } : m)),
        {
          id: `msg_ai_${Date.now()}`,
          sender: 'ai',
          text: response.reply_en,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      speakEnglish(response.reply_en);

      if (response.is_completed) {
        setIsCompleted(true);
        setToastMessage(
          response.completion_summary_tr ?? '🎉 Tebrikler! Senaryoyu başarıyla tamamladın.'
        );
        setTimeout(() => setToastMessage(null), 4000);
      }
    } catch (err) {
      setToastMessage(
        err instanceof ApiError ? err.message : 'Mesaj gönderilemedi, internet bağlantını kontrol et.'
      );
      setTimeout(() => setToastMessage(null), 2500);
    } finally {
      setIsAiThinking(false);
    }
  };

  const handleSaveVocab = async (term: string, tr: string) => {
    try {
      await saveVocabCard({
        term,
        translation: tr,
        sourceLabel: scenario.title,
      });
      setToastMessage(`“${term}” Sandığına eklendi 📚`);
    } catch (err) {
      setToastMessage(err instanceof ApiError ? err.message : 'Kelime eklenemedi');
    }
    setTimeout(() => setToastMessage(null), 2500);
  };

  const lastUserCorrection = [...messages].reverse().find((m) => m.sender === 'user')?.correction;

  return (
    <div className="space-y-4">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-950 text-white border border-slate-700 px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-300">
          <div className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
            ✓
          </div>
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Top Header / Breadcrumb Bar */}
      <div className="flex items-center justify-between pb-2">
        <Link
          href="/app/scenarios"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Tüm Senaryolara Dön</span>
        </Link>

        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md border border-indigo-100">
            {scenario.level}
          </span>
          <span className="text-xs font-medium text-slate-400">• {scenario.durationMin} dk</span>
        </div>
      </div>

      {/* 3D Video Scenario Callout Banner */}
      {scenario.videoSteps && scenario.videoSteps.length > 0 && (
        <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 border border-indigo-500/30 rounded-2xl p-4 text-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-xl shrink-0">
              🎬
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs text-amber-300">3D Pixar Animasyon Modu Aktif</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-200 font-semibold">Yeni</span>
              </div>
              <p className="text-[11px] text-slate-300 mt-0.5">
                Mivo ile kafede yüz yüze buluş, 6 adımlı animasyonlu sahnede mikrofonunla doğrudan konuş.
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowVideoModal(true)}
            className="shrink-0 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-bold text-xs shadow-md transition-all inline-flex items-center gap-1.5 cursor-pointer"
          >
            <span>3D Sahneyi Başlat</span>
            <Sparkles className="w-3.5 h-3.5 text-slate-900" />
          </button>
        </div>
      )}

      {/* DUAL-PANEL LAYOUT (Left: Interactive Chat, Right: Live AI Coaching Radar) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start h-[calc(100vh-12rem)]">
        {/* ======================================================== */}
        {/* LEFT PANEL: Chat & Voice Interface (7 Cols)              */}
        {/* ======================================================== */}
        <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-3xl flex flex-col h-full shadow-xs overflow-hidden">
          {/* Studio Header */}
          <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-xl shadow-xs">
                {scenario.emoji}
              </div>
              <div>
                <h2 className="font-bold text-slate-900 text-sm leading-tight">{scenario.title}</h2>
                <p className="text-[11px] text-slate-500">
                  AI Partner: <strong>{scenario.aiName}</strong> ({scenario.aiRole})
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setMessages([
                  {
                    id: 'msg_0',
                    sender: 'ai',
                    text: scenario.starterAiMessage,
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  },
                ]);
                setCompletedObjectives([]);
                setIsCompleted(false);
              }}
              title="Yeniden Başlat"
              className="w-8 h-8 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-500 flex items-center justify-center transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {messages.map((msg) => {
              const isAi = msg.sender === 'ai';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 items-start ${isAi ? 'justify-start' : 'justify-end'}`}
                >
                  {isAi && (
                    <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-sm font-bold shrink-0 shadow-xs">
                      ☕
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] rounded-2xl p-3.5 text-xs leading-relaxed space-y-1.5 ${
                      isAi
                        ? 'bg-slate-100/90 text-slate-900 border border-slate-200/60 rounded-tl-sm'
                        : 'bg-indigo-600 text-white shadow-md shadow-indigo-600/15 rounded-tr-sm'
                    }`}
                  >
                    <p className="font-medium text-sm">{msg.text}</p>

                    <div className="flex items-center justify-between pt-1 text-[10px] opacity-75">
                      <span>{msg.time}</span>
                      {isAi && (
                        <button
                          onClick={() => speakEnglish(msg.text)}
                          className="hover:opacity-100 flex items-center gap-1 font-semibold text-indigo-700"
                        >
                          <Volume2 className="w-3 h-3" />
                          <span>Dinle</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {isAiThinking && (
              <div className="flex gap-3 items-center text-xs text-slate-400 italic">
                <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold animate-pulse">
                  AI
                </div>
                <span>{scenario.aiName} düşünüyor ve yanıt hazırlıyor...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Starter Key Phrases Suggestions */}
          <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center gap-2 overflow-x-auto">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase shrink-0">
              💡 İlham Al:
            </span>
            {scenario.keyPhrases.map((phrase, idx) => (
              <button
                key={idx}
                onClick={() => setInputText(phrase.en)}
                className="text-[11px] font-medium bg-white hover:bg-indigo-50 hover:text-indigo-600 border border-slate-200/80 px-2.5 py-1 rounded-lg text-slate-600 whitespace-nowrap transition-all shrink-0"
              >
                &ldquo;{phrase.en}&rdquo;
              </button>
            ))}
          </div>

          {/* Chat Input Bar */}
          <div className="p-3 bg-white border-t border-slate-200/80 flex items-center gap-2">
            <input
              type="text"
              placeholder={
                isCompleted
                  ? 'Bu senaryo tamamlandı — Tüm Senaryolara Dön'
                  : 'İngilizce yanıtınızı yazın (Enter ile gönder)...'
              }
              value={inputText}
              disabled={isCompleted}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-xs text-slate-900 outline-none transition-all disabled:opacity-60"
            />

            <button
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim() || isAiThinking || isCompleted}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Gönder</span>
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* RIGHT PANEL: Live AI Coaching & Radar (5 Cols)           */}
        {/* ======================================================== */}
        <div className="lg:col-span-5 space-y-4 h-full overflow-y-auto">
          {/* 1. Goals & Objectives Progress Card */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <h3 className="font-bold text-slate-900 text-sm">Senaryo Hedefleri</h3>
              </div>
              <span className="font-mono text-xs font-bold text-indigo-600">
                {completedObjectives.length} / {scenario.objectives.length}
              </span>
            </div>

            <div className="space-y-2.5">
              {scenario.objectives.map((obj) => {
                const isDone = completedObjectives.includes(obj.id);
                return (
                  <div
                    key={obj.id}
                    className={`p-3 rounded-2xl border text-xs transition-all space-y-1 ${
                      isDone
                        ? 'bg-emerald-50/70 border-emerald-200/80 text-emerald-900'
                        : 'bg-slate-50 border-slate-200/60 text-slate-700'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <div className="font-semibold">{obj.text}</div>
                        <div className="text-[11px] text-slate-400 font-normal">{obj.textTr}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. Live AI Coaching & Feedback Radar */}
          <div className="bg-gradient-to-br from-indigo-50/70 via-white to-cyan-50/40 border border-indigo-100 rounded-3xl p-5 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                <h3 className="font-bold text-slate-900 text-sm">Canlı AI Koçluk Analizi</h3>
              </div>
              {lastUserCorrection && (
                <span
                  className={`font-mono font-bold text-xs px-2 py-0.5 rounded-md ${
                    lastUserCorrection.has_error
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {lastUserCorrection.has_error ? 'Küçük Bir Düzeltme' : 'Hatasız ✓'}
                </span>
              )}
            </div>

            {lastUserCorrection ? (
              <div className="space-y-3 text-xs">
                {lastUserCorrection.has_error ? (
                  <div className="bg-white rounded-2xl p-3.5 border border-indigo-100 shadow-xs space-y-1">
                    <div className="text-[10px] font-mono font-bold text-indigo-600 uppercase">
                      ✨ Doğrusu:
                    </div>
                    <div className="text-xs text-slate-800 font-medium leading-relaxed">
                      {lastUserCorrection.corrected}
                    </div>
                    {lastUserCorrection.explanation_tr && (
                      <div className="text-[11px] text-slate-500 pt-1">
                        {lastUserCorrection.explanation_tr}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl p-3.5 border border-emerald-100 shadow-xs text-xs text-emerald-800 font-medium">
                    Bu cümlede gramer hatası yok, harika gidiyorsun! 🎉
                  </div>
                )}
              </div>
            ) : (
              <div className="p-4 bg-white/80 rounded-2xl border border-indigo-100/60 text-xs text-slate-500 text-center italic">
                İlk cümlenizi gönderdiğinizde yapay zeka cümlenizi analiz ederek burada anlık düzeltmeler sunacaktır.
              </div>
            )}
          </div>

          {/* 3. Key Vocabulary Quick-Save to Chest */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-xs space-y-3">
            <h3 className="font-bold text-slate-900 text-sm">Önerilen Çekirdek Kelimeler</h3>
            <div className="space-y-2">
              {scenario.suggestedVocab.map((v) => (
                <div
                  key={v.term}
                  className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200/60 text-xs"
                >
                  <div>
                    <span className="font-bold text-slate-900">{v.term}</span>{' '}
                    <span className="text-slate-400 text-[11px]">({v.tr})</span>
                  </div>
                  <button
                    onClick={() => handleSaveVocab(v.term, v.tr)}
                    className="p-1.5 rounded-lg bg-white hover:bg-indigo-50 text-indigo-600 border border-slate-200 transition-colors"
                    title="Sandığa Ekle"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Completion status — automatic, driven by the AI's own turn-cap
              signal (response.is_completed), not a self-declared button. */}
          <div
            className={`w-full py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 shadow-md ${
              isCompleted
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-100 text-slate-500 border border-slate-200/80 shadow-none'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>
              {isCompleted
                ? 'Senaryo Tamamlandı ✓'
                : 'Konuşma seviyene göre otomatik tamamlanacak'}
            </span>
          </div>
        </div>
      </div>

      {/* 3D Interactive Video Modal */}
      {showVideoModal && (
        <InteractiveVideoScenario
          scenario={scenario}
          onClose={() => setShowVideoModal(false)}
          onComplete={(xp) => {
            setToastMessage(`Tebrikler! 3D senaryoyu başarıyla tamamladın (+${xp} XP) 🎉`);
            setShowVideoModal(false);
          }}
        />
      )}
    </div>
  );
}
