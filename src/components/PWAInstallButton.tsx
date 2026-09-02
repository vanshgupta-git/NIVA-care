import React, { useState } from 'react';
import { Download, Share, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface PWAInstallButtonProps {
  currentLanguage: Language;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ currentLanguage }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const t = TRANSLATIONS[currentLanguage];

  if (isInstalled) {
    return null;
  }

  return (
    <>
      {isInstallable && (
        <button
          onClick={install}
          id="pwa-install-btn"
          className="flex items-center gap-1.5 rounded-md border border-[#E5E2DD] bg-white px-2.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#1A1A1A] hover:bg-[#F9F8F6] transition active:scale-95 cursor-pointer shadow-2xs"
        >
          <Download className="w-3.5 h-3.5 text-[#1A1A1A]" />
          <span>{t.installApp}</span>
        </button>
      )}

      {isIOS && !isInstallable && (
        <button
          onClick={() => setShowIOSGuide(true)}
          id="pwa-ios-guide-btn"
          className="flex items-center gap-1.5 rounded-md border border-[#E5E2DD] bg-white px-2.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#1A1A1A] hover:bg-[#F9F8F6] transition active:scale-95 cursor-pointer shadow-2xs"
        >
          <Download className="w-3.5 h-3.5 text-[#1A1A1A]" />
          <span>{t.installIOS}</span>
        </button>
      )}

      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-2xl border border-[#E5E2DD]">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E2DD]">
              <h3 className="text-base font-black text-[#1A1A1A] uppercase tracking-tight">
                Install NIVA on iOS
              </h3>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="text-[#888] hover:text-[#1A1A1A] p-1 rounded cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mt-4 space-y-3 text-sm text-[#444]">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-[#FDFCFB] border border-[#E5E2DD]">
                <div className="p-2 rounded bg-white border border-[#E5E2DD] text-[#175CD3]">
                  <Share className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-[#1A1A1A]">1. Tap Share</p>
                  <p className="text-xs text-[#666]">In Safari's bottom toolbar, tap the share icon.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-[#FDFCFB] border border-[#E5E2DD]">
                <div className="p-2 rounded bg-white border border-[#E5E2DD] text-[#1A1A1A]">
                  <Download className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-[#1A1A1A]">2. Add to Home Screen</p>
                  <p className="text-xs text-[#666]">Scroll down and select "Add to Home Screen".</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowIOSGuide(false)}
              className="mt-5 w-full rounded bg-[#1A1A1A] py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#333] transition cursor-pointer"
            >
              {t.close}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
