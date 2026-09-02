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
  Sparkles
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
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  // Step overall progress percent
  const overallStepPercent = ((currentStepIndex + 1) / steps.length) * 100;

  return (
    <section 
      aria-labelledby="protocol-runner-heading"
      className="bg-white border border-[#E5E2DD] rounded-xl flex flex-col relative overflow-hidden shadow-sm"
    >
      <div className="p-6 sm:p-10 flex flex-col items-center text-center">
        
        {/* Top Header Row */}
        <div className="w-full flex justify-between items-center mb-8 sm:mb-12">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-[#1A1A1A] text-white text-[10px] font-bold rounded">
              STEP {String(currentStepIndex + 1).padStart(2, '0')}
            </span>
            <span className="text-[10px] text-[#999] font-bold uppercase tracking-widest">
              of {String(steps.length).padStart(2, '0')}
            </span>
          </div>

          {isSupported && (
            <button
              onClick={handleVoiceToggle}
              id="voice-narration-btn"
              className={`text-[10px] font-bold uppercase border-b pb-0.5 transition-colors cursor-pointer ${
                isSpeaking 
                  ? 'text-[#D92D20] border-[#D92D20] animate-pulse' 
                  : 'text-[#1A1A1A] border-[#1A1A1A] hover:text-[#666]'
              }`}
            >
              Voice Guidance: {isSpeaking ? 'SPEAKING...' : 'ON'}
            </button>
          )}
        </div>

        {/* Circular Countdown Timer */}
        <div className="mb-8 relative">
          <div className="w-48 h-48 sm:w-52 sm:h-52 relative flex items-center justify-center">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 160 160">
              {/* Background circle */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke="#F5F2ED"
                strokeWidth="10"
                fill="transparent"
              />
              {/* Animated Progress Circle */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke={secondsRemaining === 0 ? '#12B76A' : '#F2994A'}
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-linear"
              />
            </svg>

            {/* Timer Center Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              {secondsRemaining === 0 ? (
                <div className="flex flex-col items-center text-[#12B76A]">
                  <Check className="w-9 h-9 stroke-[3]" />
                  <span className="text-[10px] uppercase font-bold tracking-widest mt-1">COMPLETED</span>
                </div>
              ) : (
                <>
                  <span className="text-4xl sm:text-5xl font-black tracking-tighter text-[#1A1A1A]">
                    {formatTime(secondsRemaining)}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-[#888] tracking-widest mt-0.5">
                    {t.remaining}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Quick Timer Reset / Action */}
          <div className="flex justify-center gap-2 mt-2">
            <button
              onClick={resetTimer}
              id="timer-reset-btn"
              className="text-[10px] font-mono font-bold text-[#888] hover:text-[#1A1A1A] uppercase tracking-wider underline cursor-pointer"
            >
              Reset 60s
            </button>
          </div>
        </div>

        {/* Action Title & Detail */}
        <h2 id="protocol-runner-heading" className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-none mb-4 uppercase text-[#1A1A1A]">
          {activeStep.title}
        </h2>

        <p className="text-base sm:text-lg font-medium text-[#444] max-w-lg mb-8 leading-relaxed">
          {activeStep.action_detail}
        </p>

        {/* Action Buttons: Pause & Next */}
        <div className="w-full flex flex-col sm:flex-row gap-3 sm:gap-4 mt-auto max-w-md mx-auto">
          <button
            onClick={toggleTimer}
            id="timer-toggle-btn"
            className="flex-1 py-3.5 sm:py-4 border-2 border-[#1A1A1A] text-[#1A1A1A] font-bold uppercase tracking-widest text-xs sm:text-sm hover:bg-[#F9F8F6] transition-colors rounded cursor-pointer flex items-center justify-center gap-2"
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4" />
                <span>{t.pause}</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>{t.resume}</span>
              </>
            )}
          </button>

          <button
            onClick={handleNext}
            disabled={currentStepIndex === steps.length - 1}
            id="next-step-btn"
            className={`flex-1 py-3.5 sm:py-4 font-bold uppercase tracking-widest text-xs sm:text-sm shadow-xl transition-colors rounded cursor-pointer flex items-center justify-center gap-2 ${
              currentStepIndex === steps.length - 1
                ? 'bg-[#12B76A] text-white cursor-default'
                : 'bg-[#1A1A1A] text-white hover:bg-[#333]'
            }`}
          >
            <span>{currentStepIndex === steps.length - 1 ? 'Protocol Complete' : t.nextStep}</span>
            {currentStepIndex < steps.length - 1 && <ChevronRight className="w-4 h-4" />}
          </button>
        </div>

        {/* Sequence Steps Bar */}
        <div className="w-full mt-10 pt-6 border-t border-[#E5E2DD]">
          <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.15em] font-bold text-[#888] mb-3">
            <span>Protocol Sequence</span>
            <div className="flex items-center gap-2">
              {currentStepIndex > 0 && (
                <button
                  onClick={handlePrev}
                  className="text-[10px] font-bold text-[#1A1A1A] underline cursor-pointer"
                >
                  ← {t.prevStep}
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
            {steps.map((step, idx) => {
              const isCurrent = idx === currentStepIndex;
              const isPast = idx < currentStepIndex;

              return (
                <button
                  key={idx}
                  onClick={() => setCurrentStepIndex(idx)}
                  className={`text-left p-3 rounded border transition-all cursor-pointer ${
                    isCurrent
                      ? 'border-[#1A1A1A] border-2 bg-[#1A1A1A] text-white shadow-md'
                      : isPast
                      ? 'border-[#D1FADF] bg-[#F0F9F4] text-[#027A48]'
                      : 'border-[#E5E2DD] bg-white text-[#1A1A1A] hover:bg-[#F9F8F6]'
                  }`}
                >
                  <p className={`text-[10px] font-bold uppercase tracking-wider ${
                    isCurrent ? 'opacity-70' : isPast ? 'text-[#027A48]' : 'text-[#999]'
                  }`}>
                    {isCurrent ? 'Current Protocol' : `STEP 0${idx + 1}`}
                  </p>
                  <p className="text-[12px] font-bold truncate mt-0.5">
                    {step.title}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

      </div>
      
      {/* Bottom Amber Progress Bar */}
      <div 
        className="absolute bottom-0 left-0 h-1.5 bg-[#F2994A] transition-all duration-500" 
        style={{ width: `${overallStepPercent}%` }}
      />
    </section>
  );
};
