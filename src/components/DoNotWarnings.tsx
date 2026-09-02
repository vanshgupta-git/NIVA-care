import React from 'react';
import { X, AlertOctagon } from 'lucide-react';
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
      className="bg-rose-50/60 border border-rose-200/80 rounded-3xl p-6 sm:p-7 shadow-xs"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-rose-200/60">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="w-2 h-2 rounded-full bg-rose-600"></span>
            <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-rose-800">
              Critical Safety Contraindications
            </span>
          </div>
          <h2 id="do-not-heading" className="text-xl font-bold text-slate-900 uppercase tracking-tight">
            {t.doNotTitle}
          </h2>
          <p className="text-xs text-rose-900/80 font-medium">
            {t.doNotSubtitle}
          </p>
        </div>

        <span className="text-[10px] font-mono font-bold bg-rose-100 text-rose-800 border border-rose-300 px-3 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto">
          PROHIBITED ACTIONS
        </span>
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
        {rules.map((rule, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-rose-100 text-slate-800 text-sm font-semibold leading-relaxed shadow-2xs"
          >
            <div className="w-6 h-6 rounded-xl bg-rose-100 text-rose-700 border border-rose-200 flex items-center justify-center shrink-0 mt-0.5 font-bold">
              <X className="w-4 h-4 stroke-[3]" />
            </div>
            <span className="pt-0.5">{rule}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
