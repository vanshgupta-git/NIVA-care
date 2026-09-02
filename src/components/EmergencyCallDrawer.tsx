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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md rounded-3xl bg-[#0D121F] p-6 sm:p-7 shadow-2xl border border-red-500/30 relative overflow-hidden">
        
        {/* Ambient Top Red Glow */}
        <div className="absolute -top-16 -left-16 w-48 h-48 bg-red-600/20 rounded-full blur-[60px] pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-red-600/25 border border-red-500/40 text-red-400">
              <AlertOctagon className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold text-red-400">
                CAMPUS SPEED-DIAL
              </span>
              <h3 className="text-base sm:text-lg font-black text-white uppercase tracking-tight">
                {t.campusEmergencyBtn}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-full hover:bg-white/[0.06] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Emergency Contacts List */}
        <div className="mt-5 space-y-3 relative z-10">
          
          {/* Dispensary */}
          <a
            href="tel:01126591111"
            className="flex items-center justify-between p-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                <HeartPulse className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-white group-hover:text-emerald-300">
                  {t.callDispensary}
                </p>
                <p className="text-xs text-slate-400">
                  {t.dispensaryDesc}
                </p>
              </div>
            </div>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold font-mono shadow-md">
              <Phone className="w-3 h-3" />
              <span>CALL</span>
            </span>
          </a>

          {/* Security */}
          <a
            href="tel:01126591000"
            className="flex items-center justify-between p-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] hover:bg-blue-500/10 hover:border-blue-500/30 transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-blue-500/15 text-blue-400 border border-blue-500/30">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-white group-hover:text-blue-300">
                  {t.callSecurity}
                </p>
                <p className="text-xs text-slate-400">
                  {t.securityDesc}
                </p>
              </div>
            </div>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold font-mono shadow-md">
              <Phone className="w-3 h-3" />
              <span>CALL</span>
            </span>
          </a>

          {/* 112 */}
          <a
            href="tel:112"
            className="flex items-center justify-between p-4 rounded-2xl border border-red-500/30 bg-red-950/30 hover:bg-red-900/40 transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-red-600/25 text-red-400 border border-red-500/40">
                <Siren className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-white group-hover:text-red-200">
                  {t.call112}
                </p>
                <p className="text-xs text-slate-400">
                  {t.nationalDesc}
                </p>
              </div>
            </div>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold font-mono shadow-lg shadow-red-600/30">
              <Phone className="w-3 h-3" />
              <span>DIAL 112</span>
            </span>
          </a>

        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full rounded-2xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-white transition cursor-pointer relative z-10"
        >
          {t.close}
        </button>

      </div>
    </div>
  );
};
