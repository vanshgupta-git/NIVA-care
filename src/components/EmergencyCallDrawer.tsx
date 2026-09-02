import React from 'react';
import { Phone, HeartPulse, ShieldAlert, Siren, X, AlertOctagon } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface EmergencyCallDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: Language;
}

export const EmergencyCallDrawer: React.FC<EmergencyCallDrawerProps> = ({
  isOpen,
  onClose,
  currentLanguage
}) => {
  const t = TRANSLATIONS[currentLanguage];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600">
              <AlertOctagon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-rose-700">
                CAMPUS SPEED-DIAL
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 uppercase tracking-tight">
                {t.campusEmergencyBtn}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contacts */}
        <div className="mt-5 space-y-3">
          
          {/* Dispensary */}
          <a
            href="tel:01126591111"
            className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-emerald-50 hover:border-emerald-200 transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-white text-emerald-600 border border-slate-200 shadow-2xs">
                <HeartPulse className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 group-hover:text-emerald-800">
                  {t.callDispensary}
                </p>
                <p className="text-xs text-slate-500">
                  {t.dispensaryDesc}
                </p>
              </div>
            </div>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold font-mono shadow-xs">
              <Phone className="w-3 h-3" />
              <span>CALL</span>
            </span>
          </a>

          {/* Security */}
          <a
            href="tel:01126591000"
            className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-blue-50 hover:border-blue-200 transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-white text-blue-600 border border-slate-200 shadow-2xs">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 group-hover:text-blue-800">
                  {t.callSecurity}
                </p>
                <p className="text-xs text-slate-500">
                  {t.securityDesc}
                </p>
              </div>
            </div>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-bold font-mono shadow-xs">
              <Phone className="w-3 h-3" />
              <span>CALL</span>
            </span>
          </a>

          {/* 112 */}
          <a
            href="tel:112"
            className="flex items-center justify-between p-4 rounded-2xl border border-rose-200 bg-rose-50 hover:bg-rose-100/70 transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-rose-600 text-white shadow-xs">
                <Siren className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 group-hover:text-rose-900">
                  {t.call112}
                </p>
                <p className="text-xs text-rose-700">
                  {t.nationalDesc}
                </p>
              </div>
            </div>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600 text-white text-xs font-bold font-mono shadow-xs">
              <Phone className="w-3 h-3" />
              <span>DIAL 112</span>
            </span>
          </a>

        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full rounded-2xl bg-slate-100 hover:bg-slate-200 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-700 transition cursor-pointer"
        >
          {t.close}
        </button>

      </div>
    </div>
  );
};
