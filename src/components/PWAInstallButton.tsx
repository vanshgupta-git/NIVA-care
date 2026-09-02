import React, { useState } from 'react';
import { Download, Share, X, Smartphone } from 'lucide-react';
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
          className="flex items-center gap-1.5 rounded-lg border border-cyan-500/30 bg-cyan-950/40 px-3 py-1.5 text-xs font-bold font-mono uppercase tracking-wider text-cyan-300 hover:bg-cyan-500/20 transition active:scale-95 cursor-pointer shadow-xs"
        >
          <Download className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline">{t.installApp}</span>
          <span className="sm:hidden">APP</span>
        </button>
      )}

      {isIOS && !isInstallable && (
        <button
          onClick={() => setShowIOSGuide(true)}
          id="pwa-ios-guide-btn"
          className="flex items-center gap-1.5 rounded-lg border border-cyan-500/30 bg-cyan-950/40 px-3 py-1.5 text-xs font-bold font-mono uppercase tracking-wider text-cyan-300 hover:bg-cyan-500/20 transition active:scale-95 cursor-pointer shadow-xs"
        >
          <Download className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline">{t.installIOS}</span>
          <span className="sm:hidden">iOS</span>
        </button>
      )}

      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-sm rounded-3xl bg-[#0D121F] p-6 shadow-2xl border border-white/10">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-black text-white uppercase tracking-wider">
                  Install NIVA on iOS
                </h3>
              </div>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="text-slate-400 hover:text-white p-1 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mt-4 space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                <div className="p-2 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-400 shrink-0">
                  <Share className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-white">1. Tap Safari Share</p>
                  <p className="text-slate-400 mt-0.5">In Safari's bottom toolbar, tap the share icon.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                <div className="p-2 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 shrink-0">
                  <Download className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-white">2. Add to Home Screen</p>
                  <p className="text-slate-400 mt-0.5">Scroll down and select "Add to Home Screen".</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowIOSGuide(false)}
              className="mt-5 w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 text-xs font-bold uppercase tracking-wider text-white hover:from-cyan-400 hover:to-blue-500 transition cursor-pointer"
            >
              {t.close}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
