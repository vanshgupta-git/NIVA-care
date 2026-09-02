import React, { useState } from 'react';
import { MessageSquare, Copy, Check, ExternalLink, X, AlertTriangle } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-indigo-700">
                CAMPUS BROADCAST
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 uppercase tracking-tight">
                {t.whatsappModalTitle}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {t.whatsappModalDesc}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Payload Area */}
        <div className="mt-4">
          <div className="rounded-2xl bg-slate-50 text-slate-800 p-4 font-mono text-xs sm:text-sm whitespace-pre-wrap leading-relaxed border border-slate-200 select-all max-h-56 overflow-y-auto">
            {message}
          </div>
        </div>

        {/* Warning Badge */}
        <div className="mt-3.5 flex items-center gap-2.5 text-xs text-amber-900 bg-amber-50 p-3 rounded-2xl border border-amber-200">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Broadcasts to Hostel Warden, Security Control Room & Campus Quick Response Team.</span>
        </div>

        {/* Actions */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={handleCopy}
            id="copy-sos-btn"
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 py-3.5 px-4 text-xs font-bold uppercase tracking-wider text-slate-700 transition active:scale-98 cursor-pointer shadow-2xs"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">{t.copied}</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-500" />
                <span>{t.copyMessageBtn}</span>
              </>
            )}
          </button>

          <button
            onClick={handleOpenWhatsApp}
            id="open-whatsapp-btn"
            className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 py-3.5 px-4 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-emerald-600/20 transition active:scale-98 cursor-pointer"
          >
            <ExternalLink className="w-4 h-4 text-white" />
            <span>{t.sendWhatsAppBtn}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
