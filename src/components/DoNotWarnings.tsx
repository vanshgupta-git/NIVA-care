import React from 'react';
import { AlertOctagon, X, ShieldAlert } from 'lucide-react';
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
      className="glass-panel-red rounded-3xl p-6 sm:p-7 shadow-2xl relative overflow-hidden"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-red-500/20">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold text-red-400">
              CRITICAL SAFETY CONTRAINDICATIONS
            </span>
          </div>
          <h2 id="do-not-heading" className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
            {t.doNotTitle}
          </h2>
          <p className="text-xs text-red-200/80 font-medium mt-0.5">
            {t.doNotSubtitle}
          </p>
        </div>

        <span className="text-[10px] font-mono font-bold bg-red-950 text-red-300 border border-red-800 px-3 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto">
          PROHIBITED ACTIONS
        </span>
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
        {rules.map((rule, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 p-4 rounded-2xl bg-black/40 border border-red-500/25 text-red-100 text-sm font-semibold leading-relaxed shadow-inner"
          >
            <div className="w-6 h-6 rounded-xl bg-red-600/30 text-red-400 border border-red-500/50 flex items-center justify-center shrink-0 mt-0.5 font-bold">
              <X className="w-4 h-4 stroke-[3]" />
            </div>
            <span className="pt-0.5">{rule}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
