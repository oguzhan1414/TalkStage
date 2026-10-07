'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  Mic,
  MicOff,
  RotateCcw,
  CheckCircle2,
  X,
  Sparkles,
  ArrowRight,
  Eye,
  EyeOff,
  Play,
  Pause,
  Award,
} from 'lucide-react';
import type { ScenarioEntry, ScenarioVideoStep } from '@talkstage/shared-data/scenariosData';
import { speakEnglish } from '@/lib/audio';

type Props = {
  scenario: ScenarioEntry;
  onClose: () => void;
  onComplete?: (earnedXp: number) => void;
};

type InteractionPhase = 'playing' | 'waiting_user' | 'evaluating' | 'success' | 'completed';

export function InteractiveVideoScenario({ scenario, onClose, onComplete }: Props) {
  const steps: ScenarioVideoStep[] = scenario.videoSteps || [];
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [phase, setPhase] = useState<InteractionPhase>('playing');
  const [showTranslation, setShowTranslation] = useState(false);
  const [userTranscript, setUserTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [feedbackError, setFeedbackError] = useState<string | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [earnedTotalXp, setEarnedTotalXp] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const recognitionRef = useRef<any>(null);

  const currentStep = steps[currentStepIndex];
  const videoSrc = scenario.videoPath && currentStep
    ? `/api/videos/${scenario.videoPath}/${currentStep.videoFile}`
    : '';

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((res: any) => res[0].transcript)
            .join('');
          setUserTranscript(transcript);

          if (event.results[0].isFinal) {
            handleEvaluateSpeech(transcript);
          }
        };

        recognition.onerror = (err: any) => {
          console.warn('Speech recognition error:', err);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
      }
    };
  }, [currentStepIndex]);

  // Handle video ended -> automatically switch to waiting_user phase & start mic
  const handleVideoEnded = () => {
    setIsVideoPlaying(false);
    setPhase('waiting_user');
    setUserTranscript('');
    setFeedbackError(null);
    startMicListening();
  };

  const startMicListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        // already started
      }
    }
  };

  const stopMicListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
        setIsListening(false);
      } catch {}
    }
  };

  // Evaluate user speech
  const handleEvaluateSpeech = (text: string) => {
    if (!currentStep) return;
    const cleanSpoken = text.toLowerCase().trim();
    const keywords = currentStep.keywords || [];

    // Check if at least 1 or 2 keywords matched, or speech is reasonably long
    const matchedCount = keywords.filter((kw) => cleanSpoken.includes(kw.toLowerCase())).length;
    const isPassing = matchedCount >= 1 || cleanSpoken.split(' ').length >= 3;

    if (isPassing) {
      stopMicListening();
      setPhase('success');
      setEarnedTotalXp((prev) => prev + 10);

      // Advance to next step after brief celebration
      setTimeout(() => {
        if (currentStepIndex < steps.length - 1) {
          setCurrentStepIndex((prev) => prev + 1);
          setPhase('playing');
          setUserTranscript('');
          setFeedbackError(null);
          setShowTranslation(false);
          setIsVideoPlaying(true);
        } else {
          setPhase('completed');
          if (onComplete) onComplete(earnedTotalXp + 10);
        }
      }, 1600);
    } else {
      setFeedbackError('Tam anlaşılamadı. İpucunu okuyarak tekrar deneyebilirsin.');
    }
  };

  // Manual pass (for users without a mic or in noisy environments)
  const handleManualPass = () => {
    stopMicListening();
    setPhase('success');
    setEarnedTotalXp((prev) => prev + 10);

    setTimeout(() => {
      if (currentStepIndex < steps.length - 1) {
        setCurrentStepIndex((prev) => prev + 1);
        setPhase('playing');
        setUserTranscript('');
        setFeedbackError(null);
        setShowTranslation(false);
        setIsVideoPlaying(true);
      } else {
        setPhase('completed');
        if (onComplete) onComplete(earnedTotalXp + 10);
      }
    }, 1200);
  };

  // Replay current clip
  const handleReplayVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsVideoPlaying(true);
      setPhase('playing');
    }
  };

  if (!currentStep) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
      <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl relative">
        {/* 1. Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800/80 bg-slate-900/90 shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">{scenario.icon || '☕'}</span>
            <div>
              <h3 className="font-bold text-sm text-slate-100">{scenario.titleTr}</h3>
              <p className="text-[11px] text-slate-400">
                {currentStep.title} • Adım {currentStepIndex + 1} / {steps.length}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>+{earnedTotalXp} XP</span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 2. Step Progress Bar */}
        <div className="w-full bg-slate-800/80 h-1.5 flex shrink-0">
          {steps.map((s, idx) => (
            <div
              key={s.step}
              className={`flex-1 transition-all duration-300 ${
                idx < currentStepIndex
                  ? 'bg-emerald-500'
                  : idx === currentStepIndex
                    ? 'bg-indigo-500'
                    : 'bg-transparent'
              }`}
            />
          ))}
        </div>

        {/* 3. Main Stage Area: Video + Overlay */}
        <div className="flex-1 relative flex flex-col justify-center items-center bg-black overflow-hidden min-h-[340px]">
          {phase !== 'completed' ? (
            <>
              {/* HTML5 Video Element */}
              <video
                ref={videoRef}
                key={videoSrc}
                src={videoSrc}
                autoPlay
                playsInline
                onEnded={handleVideoEnded}
                onPlay={() => setIsVideoPlaying(true)}
                onPause={() => setIsVideoPlaying(false)}
                className="w-full h-full object-contain max-h-[52vh]"
              />

              {/* Subtitle Card (Bottom overlay on video) */}
              <div className="absolute bottom-4 left-4 right-4 max-w-2xl mx-auto bg-slate-900/85 backdrop-blur-md border border-slate-700/80 rounded-2xl p-4 shadow-xl text-center space-y-2 pointer-events-auto">
                <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800 pb-1.5">
                  <span className="font-bold text-indigo-400 flex items-center gap-1.5">
                    <span>Mivo</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 font-mono">
                      AI Konuşmacı
                    </span>
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => speakEnglish(currentStep.aiSpeech)}
                      className="hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                      title="Yeniden Seslendir"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Dinle</span>
                    </button>

                    <button
                      onClick={() => setShowTranslation((prev) => !prev)}
                      className="hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      {showTranslation ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      <span>{showTranslation ? 'Gizle' : 'Türkçe'}</span>
                    </button>

                    <button
                      onClick={handleReplayVideo}
                      className="hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                      title="Videoyu Baştan Oynat"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-sm sm:text-base font-semibold text-white tracking-wide leading-relaxed">
                  &ldquo;{currentStep.aiSpeech}&rdquo;
                </p>

                {showTranslation && (
                  <p className="text-xs text-amber-300/90 italic animate-in fade-in">
                    🇹🇷 {currentStep.aiSpeechTr}
                  </p>
                )}
              </div>
            </>
          ) : (
            /* Completed Celebration Screen */
            <div className="p-8 text-center space-y-5 max-w-md mx-auto animate-in zoom-in-95">
              <div className="w-20 h-20 rounded-3xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto text-4xl shadow-lg shadow-amber-500/10">
                🏆
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black text-white">Kafe Tanışması Tamamlandı!</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Mivo ile kafede buluştun, siparişini verdin ve 6 adımlı konuşma pratiğini başarıyla bitirdin. Harika bir akıcılık gösterdin!
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 p-4 bg-slate-800/60 rounded-2xl border border-slate-700/60">
                <div>
                  <div className="text-xl font-black text-emerald-400">+{earnedTotalXp} XP</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Kazanılan Tecrübe</div>
                </div>
                <div>
                  <div className="text-xl font-black text-indigo-400">6 / 6</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Diyalog Başarısı</div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setCurrentStepIndex(0);
                    setPhase('playing');
                    setEarnedTotalXp(0);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Tekrar Oyna</span>
                </button>

                <button
                  onClick={onClose}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
                >
                  <span>Senaryolara Dön</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 4. Interactive Bottom Panel (When waiting for user to speak) */}
        {phase !== 'completed' && (
          <div className="p-4 sm:p-5 bg-slate-900 border-t border-slate-800 shrink-0 space-y-3">
            {phase === 'waiting_user' ? (
              <div className="space-y-3 animate-in fade-in">
                {/* Target Prompt Box */}
                <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[11px] font-bold text-indigo-400 uppercase tracking-wider">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Sıra Sende • Mikrofonu Kullan</span>
                    </div>
                    <p className="text-xs text-slate-200 font-semibold">
                      💡 {currentStep.userHint}
                    </p>
                    <p className="text-xs text-indigo-200 italic font-mono">
                      &ldquo;{currentStep.expectedUserResponse}&rdquo;
                    </p>
                  </div>

                  <button
                    onClick={() => speakEnglish(currentStep.expectedUserResponse)}
                    className="self-start sm:self-center px-3 py-1.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer shrink-0 transition-colors"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Örnek Telaffuz</span>
                  </button>
                </div>

                {/* Microphone Bar & Voice Input Area */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1 flex items-center gap-3 bg-slate-950/80 border border-slate-800 rounded-2xl px-4 py-2.5">
                    <button
                      onClick={isListening ? stopMicListening : startMicListening}
                      className={`p-3 rounded-xl transition-all cursor-pointer ${
                        isListening
                          ? 'bg-red-500 text-white animate-pulse shadow-lg shadow-red-500/30'
                          : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                      }`}
                    >
                      {isListening ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                    </button>

                    <div className="flex-1">
                      <div className="text-[11px] text-slate-400 font-medium">
                        {isListening ? 'Seni dinliyorum, konuş...' : 'Mikrofona bas ve konuş'}
                      </div>
                      <div className="text-xs font-semibold text-slate-100 truncate max-w-md">
                        {userTranscript || '...'}
                      </div>
                    </div>
                  </div>

                  {/* Fallback button if mic isn't working */}
                  <button
                    onClick={handleManualPass}
                    className="px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer transition-colors shrink-0"
                    title="Mikrofon çalışmıyorsa veya geçmek istiyorsan tıkla"
                  >
                    <span>Doğru Söyledim</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </button>
                </div>

                {feedbackError && (
                  <p className="text-xs text-amber-400 text-center animate-in fade-in">
                    ⚠️ {feedbackError}
                  </p>
                )}
              </div>
            ) : phase === 'success' ? (
              <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-2xl p-4 text-center space-y-1 animate-in zoom-in-95">
                <div className="text-base font-black text-emerald-400 flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>Harika! Cevabın Onaylandı ✨ (+10 XP)</span>
                </div>
                <p className="text-xs text-emerald-200/80">
                  Sonraki sahneye geçiliyor...
                </p>
              </div>
            ) : (
              /* Phase is playing */
              <div className="flex items-center justify-between text-xs text-slate-400 px-2 py-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
                  <span>Mivo konuşuyor, videoyu dikkatle dinle...</span>
                </div>

                <button
                  onClick={handleVideoEnded}
                  className="text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer underline text-[11px]"
                >
                  Konuşma Adımına Geç ➔
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
