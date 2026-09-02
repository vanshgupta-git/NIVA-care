import React from 'react';
import { Phone, MessageSquare, ShieldAlert, HeartPulse, Siren, ArrowUpRight } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface EmergencyDispatchPanelProps {
  currentLanguage: Language;
  onOpenWhatsAppModal: () => void;
}

export const EmergencyDispatchPanel: React.FC<EmergencyDispatchPanelProps> = ({
  currentLanguage,
  onOpenWhatsAppModal
}) => {
  const t = TRANSLATIONS[currentLanguage];

  return (
    <section 
      aria-labelledby="emergency-dispatch-heading"
      className="bg-white border border-[#E5E2DD] rounded-xl p-6 sm:p-8 shadow-sm"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#E5E2DD]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#D92D20] animate-pulse"></span>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#D92D20]">
              CAMPUS ESCALATION GRID
            </span>
          </div>
          <h2 id="emergency-dispatch-heading" className="text-xl sm:text-2xl font-black tracking-tight text-[#1A1A1A] uppercase">
            {t.needHumanHelp}
          </h2>
        </div>
        <span className="text-[10px] font-mono text-[#666] bg-[#F5F2ED] px-2.5 py-1 rounded border border-[#E5E2DD] self-start sm:self-auto font-bold uppercase tracking-wider">
          24/7 LIVE RESPONSE
        </span>
      </div>

      {/* Grid of Emergency Options */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        
        {/* Campus Dispensary */}
        <a
          href="tel:01126591111"
          id="call-dispensary-btn"
          className="flex flex-col justify-between p-4 rounded-lg bg-[#FDFCFB] border border-[#E5E2DD] hover:border-[#1A1A1A] hover:bg-[#F9F8F6] transition-all group cursor-pointer"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#F0F9F4] text-[#027A48] border border-[#D1FADF] uppercase tracking-wider">
                MEDICAL
              </span>
              <div className="p-1.5 rounded bg-white border border-[#E5E2DD] text-[#027A48] group-hover:scale-105 transition-transform">
                <HeartPulse className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-sm font-bold text-[#1A1A1A] leading-tight">
              {t.callDispensary}
            </h3>
            <p className="text-xs text-[#666] mt-1 line-clamp-2">
              {t.dispensaryDesc}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-[#E5E2DD] flex items-center justify-between text-xs font-mono text-[#027A48] font-bold">
            <span>011-2659-1111</span>
            <Phone className="w-3.5 h-3.5" />
          </div>
        </a>

        {/* Campus Security */}
        <a
          href="tel:01126591000"
          id="call-security-btn"
          className="flex flex-col justify-between p-4 rounded-lg bg-[#FDFCFB] border border-[#E5E2DD] hover:border-[#1A1A1A] hover:bg-[#F9F8F6] transition-all group cursor-pointer"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#F0F4FE] text-[#175CD3] border border-[#C7D7FE] uppercase tracking-wider">
                SECURITY
              </span>
              <div className="p-1.5 rounded bg-white border border-[#E5E2DD] text-[#175CD3] group-hover:scale-105 transition-transform">
                <ShieldAlert className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-sm font-bold text-[#1A1A1A] leading-tight">
              {t.callSecurity}
            </h3>
            <p className="text-xs text-[#666] mt-1 line-clamp-2">
              {t.securityDesc}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-[#E5E2DD] flex items-center justify-between text-xs font-mono text-[#175CD3] font-bold">
            <span>011-2659-1000</span>
            <Phone className="w-3.5 h-3.5" />
          </div>
        </a>

        {/* 112 National Ambulance */}
        <a
          href="tel:112"
          id="call-112-btn"
          className="flex flex-col justify-between p-4 rounded-lg bg-[#FDFCFB] border border-[#E5E2DD] hover:border-[#D92D20] hover:bg-[#F9F8F6] transition-all group cursor-pointer"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#FFF4F2] text-[#D92D20] border border-[#FECDCA] uppercase tracking-wider">
                NATIONAL SOS
              </span>
              <div className="p-1.5 rounded bg-white border border-[#E5E2DD] text-[#D92D20] group-hover:scale-105 transition-transform">
                <Siren className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-sm font-bold text-[#1A1A1A] leading-tight">
              {t.call112}
            </h3>
            <p className="text-xs text-[#666] mt-1 line-clamp-2">
              {t.nationalDesc}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-[#E5E2DD] flex items-center justify-between text-xs font-mono text-[#D92D20] font-bold">
            <span>DIAL 112</span>
            <Phone className="w-3.5 h-3.5" />
          </div>
        </a>

        {/* Send Campus SOS / WhatsApp */}
        <button
          type="button"
          onClick={onOpenWhatsAppModal}
          id="open-sos-modal-btn"
          className="flex flex-col justify-between p-4 rounded-lg bg-[#1A1A1A] text-white border border-[#1A1A1A] hover:bg-[#333] transition-all text-left group active:scale-98 cursor-pointer shadow-md"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white/20 text-white border border-white/30 uppercase tracking-wider">
                WHATSAPP SOS
              </span>
              <div className="p-1.5 rounded bg-white/10 text-[#F2994A] group-hover:scale-105 transition-transform">
                <MessageSquare className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-sm font-bold text-white leading-tight">
              {t.sendCampusSos}
            </h3>
            <p className="text-xs text-white/70 mt-1 line-clamp-2">
              {t.whatsappSecurity}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs font-bold text-[#F2994A] uppercase tracking-wider">
            <span>DISPATCH SOS</span>
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </button>

      </div>
    </section>
  );
};
