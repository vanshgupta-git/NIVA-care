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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 sm:p-7 shadow-2xl border border-[#E5E2DD]">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#E5E2DD]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-md bg-[#1A1A1A] text-[#F2994A]">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#D92D20]">
                EMERGENCY BROADCAST
              </span>
              <h3 className="text-base sm:text-lg font-black text-[#1A1A1A] uppercase tracking-tight">
                {t.whatsappModalTitle}
              </h3>
              <p className="text-xs text-[#666] font-medium">
                {t.whatsappModalDesc}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-[#888] hover:text-[#1A1A1A] p-1.5 rounded hover:bg-[#F9F8F6] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formatted Message Area */}
        <div className="mt-4">
          <div className="rounded-md bg-[#1A1A1A] text-[#FDFCFB] p-4 font-mono text-xs sm:text-sm whitespace-pre-wrap leading-relaxed border border-[#333] shadow-inner max-h-60 overflow-y-auto select-all">
            {message}
          </div>
        </div>

        {/* Warning Note */}
        <div className="mt-3 flex items-center gap-2 text-[11px] text-[#666] bg-[#F5F2ED] p-2.5 rounded-md border border-[#E5E2DD]">
          <AlertTriangle className="w-4 h-4 text-[#F2994A] shrink-0" />
          <span>Broadcasts to Hostel Warden, Security Control Room & Campus Quick Response Team.</span>
        </div>

        {/* Actions */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <button
            onClick={handleCopy}
            id="copy-sos-btn"
            className="flex items-center justify-center gap-2 rounded border border-[#1A1A1A] bg-white py-3 px-4 text-xs font-bold uppercase tracking-wider text-[#1A1A1A] hover:bg-[#F9F8F6] transition cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[#027A48]" />
                <span className="text-[#027A48]">{t.copied}</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#666]" />
                <span>{t.copyMessageBtn}</span>
              </>
            )}
          </button>

          <button
            onClick={handleOpenWhatsApp}
            id="open-whatsapp-btn"
            className="flex items-center justify-center gap-2 rounded bg-[#1A1A1A] hover:bg-[#333] py-3 px-4 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition cursor-pointer"
          >
            <ExternalLink className="w-4 h-4 text-[#F2994A]" />
            <span>{t.sendWhatsAppBtn}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
