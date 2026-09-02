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
  CheckCircle2
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
      className="bg-white border border-slate-200/80 rounded-3xl flex flex-col relative overflow-hidden shadow-sm"
    >
      <div className="p-6 sm:p-10 flex flex-col items-center text-center relative z-10">
        
        {/* Top Header Row */}
        <div className="w-full flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-mono font-bold rounded-xl">
              STEP {String(currentStepIndex + 1).padStart(2, '0')}
            </span>
            <span className="text-xs text-slate-400 font-mono font-bold uppercase tracking-wider">
              OF {String(steps.length).padStart(2, '0')}
            </span>
          </div>

          {isSupported && (
            <button
              onClick={handleVoiceToggle}
              id="voice-narration-btn"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                isSpeaking 
                  ? 'bg-rose-50 border-rose-200 text-rose-700 animate-pulse' 
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>{isSpeaking ? 'Voice: Speaking...' : 'Voice Guidance'}</span>
            </button>
          )}
        </div>

        {/* Circular Countdown Timer */}
        <div className="mb-6 relative">
          <div className="w-48 h-48 sm:w-52 sm:h-52 relative flex items-center justify-center">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 160 160">
              {/* Background track circle */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke="#F1F5F9"
                strokeWidth="8"
                fill="transparent"
              />
              {/* Animated Progress Circle */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke={secondsRemaining === 0 ? '#10B981' : isRunning ? '#4F46E5' : '#D97706'}
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-linear"
              />
            </svg>

            {/* Timer Center Display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              {secondsRemaining === 0 ? (
                <div className="flex flex-col items-center text-emerald-600">
                  <Check className="w-9 h-9 stroke-[3]" />
                  <span className="text-[10px] uppercase font-mono font-bold tracking-wider mt-1">STEP COMPLETE</span>
                </div>
              ) : (
                <>
                  <span className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 font-mono">
                    {formatTime(secondsRemaining)}
                  </span>
                  <span className="text-[10px] uppercase font-mono font-bold text-slate-400 tracking-wider mt-0.5">
                    Target Duration
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Quick Timer Reset Button */}
          <div className="flex justify-center mt-1">
            <button
              onClick={resetTimer}
              id="timer-reset-btn"
              className="flex items-center gap-1.5 text-xs font-mono font-semibold text-slate-400 hover:text-slate-700 uppercase tracking-wider transition cursor-pointer bg-slate-50 px-3 py-1 rounded-full border border-slate-200"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Timer</span>
            </button>
          </div>
        </div>

        {/* Action Title & Detail */}
        <h2 id="protocol-runner-heading" className="text-2xl sm:text-3xl font-black tracking-tight leading-tight mb-3 uppercase text-slate-900">
          {activeStep.title}
        </h2>

        <div className="max-w-xl mx-auto mb-8 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
          <p className="text-base sm:text-lg font-medium text-slate-700 leading-relaxed">
            {activeStep.action_detail}
          </p>
        </div>

        {/* Action Buttons: Pause & Next */}
        <div className="w-full flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <button
            onClick={toggleTimer}
            id="timer-toggle-btn"
            className="flex-1 py-3.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 font-bold uppercase tracking-wider text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-98 shadow-xs"
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4" />
                <span>{t.pause}</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current text-indigo-600" />
                <span>{t.resume}</span>
              </>
            )}
          </button>

          <button
            onClick={handleNext}
            disabled={currentStepIndex === steps.length - 1}
            id="next-step-btn"
            className={`flex-1 py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-98 ${
              currentStepIndex === steps.length - 1
                ? 'bg-emerald-600 text-white cursor-default shadow-emerald-600/20'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20'
            }`}
          >
            <span>{currentStepIndex === steps.length - 1 ? 'Protocol Complete' : t.nextStep}</span>
            {currentStepIndex < steps.length - 1 && <ChevronRight className="w-4 h-4" />}
          </button>
        </div>

        {/* Sequence Steps Bar */}
        <div className="w-full mt-10 pt-6 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider font-bold text-slate-500 mb-3">
            <span>Protocol Sequence Flow</span>
            <div className="flex items-center gap-2">
              {currentStepIndex > 0 && (
                <button
                  onClick={handlePrev}
                  className="text-xs font-bold text-indigo-600 hover:underline cursor-pointer flex items-center gap-1"
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
                  className={`text-left p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    isCurrent
                      ? 'border-indigo-600 bg-indigo-50/70 text-slate-900 shadow-xs'
                      : isPast
                      ? 'border-emerald-200 bg-emerald-50/50 text-emerald-900'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <p className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                    isCurrent ? 'text-indigo-700' : isPast ? 'text-emerald-700' : 'text-slate-400'
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
      
      {/* Bottom Progress Line */}
      <div 
        className="h-1 bg-indigo-600 transition-all duration-500" 
        style={{ width: `${overallStepPercent}%` }}
      />
    </section>
  );
};
