import React from 'react';
import { PhoneCall, ShieldAlert, Sparkles, Activity, Radio } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { PWAInstallButton } from './PWAInstallButton';

interface HeaderProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenEmergencyCall: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLanguage,
  onLanguageChange,
  onOpenEmergencyCall
}) => {
  const t = TRANSLATIONS[currentLanguage];

  const languages: { code: Language; label: string; script: string }[] = [
    { code: 'en', label: 'EN', script: 'EN' },
    { code: 'hi', label: 'हिन्दी', script: 'HI' },
    { code: 'ta', label: 'தமிழ்', script: 'TA' },
    { code: 'te', label: 'తెలుగు', script: 'TE' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#06090F]/80 backdrop-blur-xl border-b border-white/[0.08] px-4 sm:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Left: Futuristic Brand Identity */}
        <div className="flex items-center gap-3.5">
          <div className="relative flex items-center justify-center">
            {/* Glowing Logo Aura */}
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <Sparkles className="w-4 h-4 text-white animate-pulse" />
            </div>
            <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#06090F] animate-pulse" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-1.5">
                NIVA
              </h1>
              <span className="text-[10px] font-mono font-bold tracking-widest px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
                PRO 2.5
              </span>
            </div>
            <p className="text-[10px] tracking-[0.16em] uppercase font-semibold text-slate-400 hidden sm:block">
              AI Campus Health & Emergency Co-Pilot
            </p>
          </div>
        </div>

        {/* Center: Live Campus Grid Telemetry (Desktop) */}
        <div className="hidden lg:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[11px] font-mono font-semibold text-emerald-400 tracking-wider uppercase">
            Campus Health Grid Live
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-[10px] font-mono text-slate-400">
            24/7 AI Triage
          </span>
        </div>

        {/* Right Controls: Languages, PWA, Emergency SOS */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          
          {/* Language Selector Glass Pill */}
          <div className="flex items-center p-1 rounded-lg bg-white/[0.04] border border-white/[0.08] backdrop-blur-md text-[11px]">
            {languages.map((lang) => (
              <button
                key={lang.code}
                id={`lang-btn-${lang.code}`}
                onClick={() => onLanguageChange(lang.code)}
                className={`px-2 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                  currentLanguage === lang.code
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-xs'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>

          {/* PWA Install Button */}
          <PWAInstallButton currentLanguage={currentLanguage} />

          {/* High-Impact Emergency SOS Button */}
          <button
            onClick={onOpenEmergencyCall}
            id="header-emergency-sos-btn"
            className="relative group overflow-hidden flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-red-600/30 hover:shadow-red-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer animate-emergency-beacon"
          >
            <PhoneCall className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white animate-pulse" />
            <span className="hidden sm:inline">CAMPUS EMERGENCY</span>
            <span className="sm:hidden">SOS</span>
          </button>

        </div>

      </div>
    </header>
  );
};
