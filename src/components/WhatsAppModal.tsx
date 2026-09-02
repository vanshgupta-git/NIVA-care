import React, { useState } from 'react';
import { MessageSquare, Copy, Check, ExternalLink, X, AlertTriangle, Radio } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  currentLanguage: Language;
}

export const WhatsAppModal: React.FC<WhatsAppModalProps> = ({
  isOpen,
  onClose,
  message,
  currentLanguage
}) => {
  const t = TRANSLATIONS[currentLanguage];
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error('Failed to copy message:', e);
    }
  };

  const handleOpenWhatsApp = () => {
    const encoded = encodeURIComponent(message);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-lg rounded-3xl bg-[#0D121F] p-6 sm:p-7 shadow-2xl border border-cyan-500/30 relative overflow-hidden">
        
        {/* Ambient Top Cyan Glow */}
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-cyan-500/15 rounded-full blur-[70px] pointer-events-none" />

        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-white/[0.08] relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold text-cyan-400">
                CAMPUS BROADCAST SYSTEM
              </span>
              <h3 className="text-base sm:text-lg font-black text-white uppercase tracking-tight">
                {t.whatsappModalTitle}
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                {t.whatsappModalDesc}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-full hover:bg-white/[0.06] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formatted Message Payload Preview */}
        <div className="mt-5 relative z-10">
          <div className="rounded-2xl bg-black/50 text-slate-100 p-4 font-mono text-xs sm:text-sm whitespace-pre-wrap leading-relaxed border border-white/10 shadow-inner max-h-60 overflow-y-auto select-all">
            {message}
          </div>
        </div>

        {/* Dispatch Warning Tag */}
        <div className="mt-3.5 flex items-center gap-2.5 text-xs text-amber-300/90 bg-amber-950/40 p-3 rounded-2xl border border-amber-500/25 relative z-10">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Broadcasts to Hostel Warden, Security Control Room & Campus Quick Response Team.</span>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 relative z-10">
          <button
            onClick={handleCopy}
            id="copy-sos-btn"
            className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.05] hover:bg-white/[0.1] py-3.5 px-4 text-xs font-bold uppercase tracking-wider text-white transition active:scale-95 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">{t.copied}</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-400" />
                <span>{t.copyMessageBtn}</span>
              </>
            )}
          </button>

          <button
            onClick={handleOpenWhatsApp}
            id="open-whatsapp-btn"
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 py-3.5 px-4 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-emerald-600/30 transition active:scale-95 cursor-pointer"
          >
            <ExternalLink className="w-4 h-4 text-emerald-200" />
            <span>{t.sendWhatsAppBtn}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
