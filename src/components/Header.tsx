import React from 'react';
import { PhoneCall, Sparkles, Activity, ShieldCheck, Download } from 'lucide-react';
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
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3.5 transition-all shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-sky-600 flex items-center justify-center shadow-md shadow-indigo-500/20 text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white animate-pulse" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                NIVA
              </span>
              <span className="text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                CAMPUS AI
              </span>
            </div>
            <p className="text-[10px] tracking-wider uppercase font-semibold text-slate-500 hidden sm:block">
              AI Campus Health & Emergency Co-Pilot
            </p>
          </div>
        </div>

        {/* Center: Live Campus Health Telemetry (Desktop) */}
        <div className="hidden lg:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[11px] font-mono font-semibold text-emerald-800 tracking-wider uppercase">
            Campus Health Grid Active
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-[10px] font-mono text-slate-600">
            24/7 Rapid Triage
          </span>
        </div>

        {/* Right Controls: Languages, PWA, Emergency SOS */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* Language Selector */}
          <div className="flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200/80 text-[11px]">
            {languages.map((lang) => (
              <button
                key={lang.code}
                id={`lang-btn-${lang.code}`}
                onClick={() => onLanguageChange(lang.code)}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                  currentLanguage === lang.code
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200/60 font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>

          {/* PWA Install Button */}
          <PWAInstallButton currentLanguage={currentLanguage} />

          {/* Emergency SOS Button */}
          <button
            onClick={onOpenEmergencyCall}
            id="header-emergency-sos-btn"
            className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-rose-600/20 hover:shadow-rose-600/30 transition-all cursor-pointer active:scale-98"
          >
            <PhoneCall className="w-3.5 h-3.5 text-white" />
            <span className="hidden sm:inline">CAMPUS SOS</span>
            <span className="sm:hidden">SOS</span>
          </button>

        </div>

      </div>
    </header>
  );
};
