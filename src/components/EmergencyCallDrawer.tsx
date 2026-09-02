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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl border border-[#E5E2DD]">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E5E2DD]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded bg-[#D92D20] text-white">
              <AlertOctagon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#D92D20]">
                CAMPUS SPEED-DIAL
              </span>
              <h3 className="text-base sm:text-lg font-black text-[#1A1A1A] uppercase tracking-tight">
                {t.campusEmergencyBtn}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-[#888] hover:text-[#1A1A1A] p-1.5 rounded hover:bg-[#F9F8F6] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contacts */}
        <div className="mt-4 space-y-3">
          
          {/* Dispensary */}
          <a
            href="tel:01126591111"
            className="flex items-center justify-between p-3.5 rounded-lg border border-[#E5E2DD] bg-[#FDFCFB] hover:bg-[#F9F8F6] hover:border-[#1A1A1A] transition group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-[#F0F9F4] text-[#027A48] border border-[#D1FADF]">
                <HeartPulse className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-[#1A1A1A]">
                  {t.callDispensary}
                </p>
                <p className="text-[11px] text-[#666]">
                  {t.dispensaryDesc}
                </p>
              </div>
            </div>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#1A1A1A] text-white text-xs font-bold font-mono">
              <Phone className="w-3 h-3 text-[#F2994A]" />
              <span>CALL</span>
            </span>
          </a>

          {/* Security */}
          <a
            href="tel:01126591000"
            className="flex items-center justify-between p-3.5 rounded-lg border border-[#E5E2DD] bg-[#FDFCFB] hover:bg-[#F9F8F6] hover:border-[#1A1A1A] transition group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-[#F0F4FE] text-[#175CD3] border border-[#C7D7FE]">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-[#1A1A1A]">
                  {t.callSecurity}
                </p>
                <p className="text-[11px] text-[#666]">
                  {t.securityDesc}
                </p>
              </div>
            </div>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#1A1A1A] text-white text-xs font-bold font-mono">
              <Phone className="w-3 h-3 text-[#F2994A]" />
              <span>CALL</span>
            </span>
          </a>

          {/* 112 */}
          <a
            href="tel:112"
            className="flex items-center justify-between p-3.5 rounded-lg border border-[#E5E2DD] bg-[#FDFCFB] hover:bg-[#F9F8F6] hover:border-[#D92D20] transition group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-[#FFF4F2] text-[#D92D20] border border-[#FECDCA]">
                <Siren className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-[#1A1A1A]">
                  {t.call112}
                </p>
                <p className="text-[11px] text-[#666]">
                  {t.nationalDesc}
                </p>
              </div>
            </div>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#D92D20] text-white text-xs font-bold font-mono">
              <Phone className="w-3 h-3" />
              <span>DIAL 112</span>
            </span>
          </a>

        </div>

        <button
          onClick={onClose}
          className="mt-5 w-full rounded bg-[#1A1A1A] py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#333] transition cursor-pointer"
        >
          {t.close}
        </button>

      </div>
    </div>
  );
};
