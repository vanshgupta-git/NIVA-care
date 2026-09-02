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
          className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-700 hover:bg-slate-50 transition active:scale-98 cursor-pointer shadow-2xs"
        >
          <Download className="w-3.5 h-3.5 text-indigo-600" />
          <span className="hidden sm:inline">{t.installApp}</span>
          <span className="sm:hidden">APP</span>
        </button>
      )}

      {isIOS && !isInstallable && (
        <button
          onClick={() => setShowIOSGuide(true)}
          id="pwa-ios-guide-btn"
          className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-700 hover:bg-slate-50 transition active:scale-98 cursor-pointer shadow-2xs"
        >
          <Download className="w-3.5 h-3.5 text-indigo-600" />
          <span className="hidden sm:inline">{t.installIOS}</span>
          <span className="sm:hidden">iOS</span>
        </button>
      )}

      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Install NIVA on iOS
                </h3>
              </div>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mt-4 space-y-3 text-xs text-slate-600">
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="p-2 rounded-xl bg-white border border-slate-200 text-blue-600 shrink-0">
                  <Share className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">1. Tap Safari Share</p>
                  <p className="text-slate-500 mt-0.5">In Safari's bottom toolbar, tap the share icon.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="p-2 rounded-xl bg-white border border-slate-200 text-indigo-600 shrink-0">
                  <Download className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">2. Add to Home Screen</p>
                  <p className="text-slate-500 mt-0.5">Scroll down and select "Add to Home Screen".</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowIOSGuide(false)}
              className="mt-5 w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 py-3 text-xs font-bold uppercase tracking-wider text-white transition cursor-pointer"
            >
              {t.close}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
