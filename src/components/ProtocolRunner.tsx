import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  Volume2, 
  VolumeX, 
  Check, 
  Clock, 
  Activity,
  Sparkles,
  Radio
} from 'lucide-react';
import { ProtocolStep, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { useSpeech } from '../hooks/useSpeech';

interface ProtocolRunnerProps {
  steps: ProtocolStep[];
  currentLanguage: Language;
}

export const ProtocolRunner: React.FC<ProtocolRunnerProps> = ({
  steps,
  currentLanguage
}) => {
  const t = TRANSLATIONS[currentLanguage];
  const { speak, stop, isSpeaking, isSupported } = useSpeech();

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const activeStep = steps[currentStepIndex] || steps[0];

  // Timer states
  const totalSeconds = activeStep.duration_seconds || 60;
  const [secondsRemaining, setSecondsRemaining] = useState(totalSeconds);
  const [isRunning, setIsRunning] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync timer when step changes
  useEffect(() => {
    setSecondsRemaining(activeStep.duration_seconds || 60);
    setIsRunning(true);
    stop();
  }, [currentStepIndex, activeStep, stop]);

  // Countdown loop
  useEffect(() => {
    if (isRunning && secondsRemaining > 0) {
      timerRef.current = setTimeout(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);
    } else if (secondsRemaining === 0) {
      setIsRunning(false);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isRunning, secondsRemaining]);

  const toggleTimer = () => {
    setIsRunning((prev) => !prev);
  };

  const resetTimer = () => {
    setSecondsRemaining(activeStep.duration_seconds || 60);
    setIsRunning(true);
  };

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleVoiceToggle = () => {
    if (isSpeaking) {
      stop();
    } else {
      const textToSpeak = `${activeStep.title}. ${activeStep.action_detail}`;
      speak(textToSpeak, currentLanguage);
    }
  };

  // Format seconds to mm:ss or ss
  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    if (mins > 0) {
      return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    return `00:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Progress percentage for SVG circle
  const progressPercent = totalSeconds > 0 
    ? ((totalSeconds - secondsRemaining) / totalSeconds) * 100 
    : 100;
  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  // Step overall progress percent
  const overallStepPercent = ((currentStepIndex + 1) / steps.length) * 100;

  return (
    <section 
      aria-labelledby="protocol-runner-heading"
      className="glass-panel rounded-3xl flex flex-col relative overflow-hidden shadow-2xl border border-white/10"
    >
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="p-6 sm:p-10 flex flex-col items-center text-center relative z-10">
        
        {/* Top Header Row */}
        <div className="w-full flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-bold rounded-xl">
              STEP {String(currentStepIndex + 1).padStart(2, '0')}
            </span>
            <span className="text-xs text-slate-400 font-mono font-bold uppercase tracking-widest">
              OF {String(steps.length).padStart(2, '0')}
            </span>
          </div>

          {isSupported && (
            <button
              onClick={handleVoiceToggle}
              id="voice-narration-btn"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                isSpeaking 
                  ? 'bg-red-500/20 border-red-500/40 text-red-400 animate-pulse' 
                  : 'bg-white/[0.04] border-white/10 text-slate-300 hover:text-white hover:bg-white/[0.08]'
              }`}
            >
              {isSpeaking ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-red-400" />
                  <span>VOICE: SPEAKING...</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>VOICE GUIDANCE</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Circular Countdown Timer */}
        <div className="mb-8 relative">
          <div className="w-52 h-52 sm:w-56 sm:h-56 relative flex items-center justify-center">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 160 160">
              {/* Background track circle */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke="rgba(255, 255, 255, 0.06)"
                strokeWidth="8"
                fill="transparent"
              />
              {/* Animated Progress Circle with Glow */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke={secondsRemaining === 0 ? '#10B981' : isRunning ? '#06B6D4' : '#F59E0B'}
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-linear drop-shadow-[0_0_12px_rgba(6,182,212,0.6)]"
              />
            </svg>

            {/* Timer Center Display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              {secondsRemaining === 0 ? (
                <div className="flex flex-col items-center text-emerald-400">
                  <Check className="w-10 h-10 stroke-[3] animate-bounce" />
                  <span className="text-[10px] uppercase font-mono font-bold tracking-widest mt-1">STEP COMPLETE</span>
                </div>
              ) : (
                <>
                  <span className="text-4xl sm:text-5xl font-black tracking-tighter text-white font-mono drop-shadow-md">
                    {formatTime(secondsRemaining)}
                  </span>
                  <span className="text-[10px] uppercase font-mono font-bold text-cyan-400 tracking-widest mt-1">
                    TARGET TIMELINE
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Quick Timer Reset Button */}
          <div className="flex justify-center mt-2">
            <button
              onClick={resetTimer}
              id="timer-reset-btn"
              className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-400 hover:text-cyan-300 uppercase tracking-wider transition cursor-pointer bg-white/[0.03] px-3 py-1 rounded-full border border-white/[0.06]"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Timer</span>
            </button>
          </div>
        </div>

        {/* Action Title & Detail */}
        <h2 id="protocol-runner-heading" className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight mb-4 uppercase text-white">
          {activeStep.title}
        </h2>

        <div className="max-w-xl mx-auto mb-8 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
          <p className="text-base sm:text-lg font-medium text-slate-200 leading-relaxed">
            {activeStep.action_detail}
          </p>
        </div>

        {/* Action Buttons: Pause & Next */}
        <div className="w-full flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto">
          <button
            onClick={toggleTimer}
            id="timer-toggle-btn"
            className="flex-1 py-4 rounded-xl border border-white/15 bg-white/[0.05] hover:bg-white/[0.1] text-white font-bold uppercase tracking-widest text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4" />
                <span>{t.pause}</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current text-cyan-400" />
                <span>{t.resume}</span>
              </>
            )}
          </button>

          <button
            onClick={handleNext}
            disabled={currentStepIndex === steps.length - 1}
            id="next-step-btn"
            className={`flex-1 py-4 rounded-xl font-bold uppercase tracking-widest text-xs sm:text-sm shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95 ${
              currentStepIndex === steps.length - 1
                ? 'bg-emerald-600 text-white cursor-default shadow-emerald-600/30'
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-[1.02]'
            }`}
          >
            <span>{currentStepIndex === steps.length - 1 ? 'Protocol Complete' : t.nextStep}</span>
            {currentStepIndex < steps.length - 1 && <ChevronRight className="w-4 h-4" />}
          </button>
        </div>

        {/* Sequence Steps Bar */}
        <div className="w-full mt-10 pt-6 border-t border-white/[0.08]">
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest font-bold text-slate-400 mb-3">
            <span>Protocol Sequence Flow</span>
            <div className="flex items-center gap-2">
              {currentStepIndex > 0 && (
                <button
                  onClick={handlePrev}
                  className="text-xs font-bold text-cyan-400 hover:underline cursor-pointer flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>{t.prevStep}</span>
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
            {steps.map((step, idx) => {
              const isCurrent = idx === currentStepIndex;
              const isPast = idx < currentStepIndex;

              return (
                <button
                  key={idx}
                  onClick={() => setCurrentStepIndex(idx)}
                  className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isCurrent
                      ? 'border-cyan-400 bg-cyan-950/80 text-white shadow-lg shadow-cyan-500/20'
                      : isPast
                      ? 'border-emerald-500/30 bg-emerald-950/40 text-emerald-300'
                      : 'border-white/5 bg-white/[0.02] text-slate-400 hover:bg-white/[0.06] hover:text-white'
                  }`}
                >
                  <p className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                    isCurrent ? 'text-cyan-300' : isPast ? 'text-emerald-400' : 'text-slate-500'
                  }`}>
                    {isCurrent ? 'ACTIVE STEP' : isPast ? 'COMPLETED' : `STEP 0${idx + 1}`}
                  </p>
                  <p className="text-xs font-bold truncate mt-1">
                    {step.title}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

      </div>
      
      {/* Bottom Glowing Cyan Progress Bar */}
      <div 
        className="absolute bottom-0 left-0 h-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 shadow-[0_0_12px_rgba(6,182,212,0.8)] transition-all duration-500" 
        style={{ width: `${overallStepPercent}%` }}
      />
    </section>
  );
};
