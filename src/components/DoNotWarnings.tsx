import React from 'react';
import { Ban, AlertOctagon, X } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface DoNotWarningsProps {
  rules: string[];
  currentLanguage: Language;
}

export const DoNotWarnings: React.FC<DoNotWarningsProps> = ({
  rules,
  currentLanguage
}) => {
  const t = TRANSLATIONS[currentLanguage];

  if (!rules || rules.length === 0) return null;

  return (
    <section 
      aria-labelledby="do-not-heading"
      className="bg-white border-2 border-[#D92D20] rounded-xl p-6 sm:p-7 shadow-xs"
    >
      <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#E5E2DD]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#D92D20]"></span>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#D92D20]">
              CRITICAL SAFETY RESTRICTIONS
            </span>
          </div>
          <h2 id="do-not-heading" className="text-xl sm:text-2xl font-black text-[#1A1A1A] uppercase tracking-tight">
            {t.doNotTitle}
          </h2>
          <p className="text-xs text-[#666] font-medium mt-0.5">
            {t.doNotSubtitle}
          </p>
        </div>

        <span className="text-[10px] font-mono font-bold bg-[#FFF4F2] text-[#D92D20] border border-[#FECDCA] px-2.5 py-1 rounded uppercase tracking-wider shrink-0">
          CONTRAINDICATIONS
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
        {rules.map((rule, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 p-3.5 rounded-lg bg-[#FDFCFB] border border-[#E5E2DD] text-[#1A1A1A] text-[13px] font-semibold leading-snug"
          >
            <div className="w-5 h-5 rounded bg-[#FFF4F2] text-[#D92D20] border border-[#FECDCA] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
              <X className="w-3.5 h-3.5 stroke-[3]" />
            </div>
            <span>{rule}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
