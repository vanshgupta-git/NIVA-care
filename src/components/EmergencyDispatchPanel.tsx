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
      className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="w-2 h-2 rounded-full bg-rose-600"></span>
            <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-rose-700">
              Campus Escalation Grid
            </span>
          </div>
          <h2 id="emergency-dispatch-heading" className="text-xl font-bold tracking-tight text-slate-900 uppercase">
            {t.needHumanHelp}
          </h2>
        </div>
        <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 self-start sm:self-auto font-bold uppercase tracking-wider">
          24/7 Live Emergency Response
        </span>
      </div>

      {/* Grid of Emergency Escalation Cards */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Campus Dispensary */}
        <a
          href="tel:01126591111"
          id="call-dispensary-btn"
          className="niva-card-hover flex flex-col justify-between p-5 group cursor-pointer"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase tracking-wider">
                DISPENSARY
              </span>
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 group-hover:scale-105 transition-transform">
                <HeartPulse className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-tight">
              {t.callDispensary}
            </h3>
            <p className="text-xs text-slate-500 mt-1 line-clamp-2">
              {t.dispensaryDesc}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-emerald-700 font-bold">
            <span>011-2659-1111</span>
            <Phone className="w-3.5 h-3.5" />
          </div>
        </a>

        {/* Campus Security */}
        <a
          href="tel:01126591000"
          id="call-security-btn"
          className="niva-card-hover flex flex-col justify-between p-5 group cursor-pointer"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wider">
                SECURITY
              </span>
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 group-hover:scale-105 transition-transform">
                <ShieldAlert className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-tight">
              {t.callSecurity}
            </h3>
            <p className="text-xs text-slate-500 mt-1 line-clamp-2">
              {t.securityDesc}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-blue-700 font-bold">
            <span>011-2659-1000</span>
            <Phone className="w-3.5 h-3.5" />
          </div>
        </a>

        {/* 112 National Ambulance */}
        <a
          href="tel:112"
          id="call-112-btn"
          className="niva-card-hover flex flex-col justify-between p-5 group cursor-pointer border-rose-200 hover:border-rose-400"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 uppercase tracking-wider">
                NATIONAL SOS
              </span>
              <div className="p-2 rounded-xl bg-rose-50 text-rose-600 border border-rose-100 group-hover:scale-105 transition-transform">
                <Siren className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-sm font-bold text-slate-900 group-hover:text-rose-700 transition-colors leading-tight">
              {t.call112}
            </h3>
            <p className="text-xs text-slate-500 mt-1 line-clamp-2">
              {t.nationalDesc}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-rose-700 font-bold">
            <span>DIAL 112</span>
            <Phone className="w-3.5 h-3.5" />
          </div>
        </a>

        {/* Send Campus SOS / WhatsApp */}
        <button
          type="button"
          onClick={onOpenWhatsAppModal}
          id="open-sos-modal-btn"
          className="niva-card-hover flex flex-col justify-between p-5 text-left group active:scale-98 cursor-pointer border-indigo-200 hover:border-indigo-400 shadow-xs"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase tracking-wider">
                BROADCAST
              </span>
              <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 group-hover:scale-105 transition-transform">
                <MessageSquare className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">
              {t.sendCampusSos}
            </h3>
            <p className="text-xs text-slate-500 mt-1 line-clamp-2">
              {t.whatsappSecurity}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600 uppercase tracking-wider">
            <span>DISPATCH SOS</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </button>

      </div>
    </section>
  );
};
