import React from 'react';
import { PhoneCall } from 'lucide-react';
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
    <header className="sticky top-0 z-40 bg-[#FDFCFB]/95 backdrop-blur-sm border-b border-[#E5E2DD] px-4 sm:px-8 py-4 sm:py-5 transition-colors">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        
        {/* Brand */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tighter leading-none text-[#1A1A1A]">
                NIVA
              </h1>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#F5F2ED] text-[#666] border border-[#E5E2DD]">
                V2.4
              </span>
            </div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#666] mt-1">
              AI CAMPUS SAFETY CO-PILOT
            </p>
          </div>

          {/* Mobile Emergency Quick Call */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenEmergencyCall}
              id="mobile-emergency-btn"
              className="bg-[#D92D20] text-white px-4 py-2 rounded-sm font-bold text-xs tracking-wide uppercase shadow-md shadow-red-900/10 hover:bg-[#B42318] transition-colors cursor-pointer"
            >
              SOS
            </button>
          </div>
        </div>

        {/* Right Section: Status Grid, Language Selector, Emergency CTA */}
        <div className="flex flex-col items-start md:items-end gap-3">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            
            {/* Campus Grid Status */}
            <div className="flex items-center gap-2 bg-[#F0F9F4] px-3 py-1.5 rounded-full border border-[#D1FADF]">
              <span className="w-2 h-2 rounded-full bg-[#12B76A] animate-pulse"></span>
              <span className="text-[11px] font-bold text-[#027A48] uppercase tracking-wider">
                IIT / Campus Health Grid Online
              </span>
            </div>

            {/* Language Switcher - Editorial underline style */}
            <div className="flex items-center gap-3 text-[12px] font-medium text-[#888]">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  id={`lang-btn-${lang.code}`}
                  onClick={() => onLanguageChange(lang.code)}
                  className={`pb-0.5 transition-colors cursor-pointer ${
                    currentLanguage === lang.code
                      ? 'text-[#1A1A1A] font-bold border-b-2 border-[#1A1A1A]'
                      : 'text-[#888] hover:text-[#1A1A1A]'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            {/* PWA Install */}
            <PWAInstallButton currentLanguage={currentLanguage} />
          </div>

          {/* Campus Emergency Button */}
          <button
            onClick={onOpenEmergencyCall}
            id="desktop-emergency-btn"
            className="hidden md:flex items-center gap-2 bg-[#D92D20] text-white px-6 py-2.5 rounded-sm font-bold text-sm tracking-wide uppercase shadow-lg shadow-red-900/10 hover:bg-[#B42318] transition-colors cursor-pointer active:scale-98"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Campus Emergency</span>
          </button>
        </div>

      </div>
    </header>
  );
};
