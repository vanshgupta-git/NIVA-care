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
      className="glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/10"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold text-red-400">
              CAMPUS ESCALATION NETWORK
            </span>
          </div>
          <h2 id="emergency-dispatch-heading" className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase">
            {t.needHumanHelp}
          </h2>
        </div>
        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/30 self-start sm:self-auto font-bold uppercase tracking-wider">
          24/7 ACTIVE RESPONSE
        </span>
      </div>

      {/* Grid of Emergency Escalation Cards */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Campus Dispensary */}
        <a
          href="tel:01126591111"
          id="call-dispensary-btn"
          className="glass-card-interactive flex flex-col justify-between p-5 rounded-2xl group cursor-pointer"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
                MEDICAL
              </span>
              <div className="p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 group-hover:scale-110 transition-transform">
                <HeartPulse className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors leading-tight">
              {t.callDispensary}
            </h3>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2">
              {t.dispensaryDesc}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-emerald-400 font-bold">
            <span>011-2659-1111</span>
            <Phone className="w-3.5 h-3.5" />
          </div>
        </a>

        {/* Campus Security */}
        <a
          href="tel:01126591000"
          id="call-security-btn"
          className="glass-card-interactive flex flex-col justify-between p-5 rounded-2xl group cursor-pointer"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-500/30 uppercase tracking-wider">
                SECURITY
              </span>
              <div className="p-2 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-400 group-hover:scale-110 transition-transform">
                <ShieldAlert className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors leading-tight">
              {t.callSecurity}
            </h3>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2">
              {t.securityDesc}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-blue-400 font-bold">
            <span>011-2659-1000</span>
            <Phone className="w-3.5 h-3.5" />
          </div>
        </a>

        {/* 112 National Ambulance */}
        <a
          href="tel:112"
          id="call-112-btn"
          className="glass-card-interactive flex flex-col justify-between p-5 rounded-2xl group cursor-pointer border-red-500/20 hover:border-red-500/40"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-red-950 text-red-300 border border-red-500/30 uppercase tracking-wider">
                NATIONAL SOS
              </span>
              <div className="p-2 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 group-hover:scale-110 transition-transform">
                <Siren className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-red-300 transition-colors leading-tight">
              {t.call112}
            </h3>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2">
              {t.nationalDesc}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-red-400 font-bold">
            <span>DIAL 112</span>
            <Phone className="w-3.5 h-3.5" />
          </div>
        </a>

        {/* Send Campus SOS / WhatsApp */}
        <button
          type="button"
          onClick={onOpenWhatsAppModal}
          id="open-sos-modal-btn"
          className="glass-card-interactive flex flex-col justify-between p-5 rounded-2xl text-left group active:scale-95 cursor-pointer border-cyan-500/30 hover:border-cyan-500/60 shadow-lg shadow-cyan-500/10"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40 uppercase tracking-wider">
                BROADCAST
              </span>
              <div className="p-2 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors leading-tight">
              {t.sendCampusSos}
            </h3>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2">
              {t.whatsappSecurity}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs font-bold text-cyan-400 uppercase tracking-wider">
            <span>DISPATCH SOS</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </button>

      </div>
    </section>
  );
};
