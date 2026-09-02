import React, { useEffect, useState } from 'react';
import { WifiOff, Radio } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface OfflineIndicatorProps {
  currentLanguage: Language;
}

export const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({ currentLanguage }) => {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const t = TRANSLATIONS[currentLanguage];

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-50 flex items-center gap-3 rounded-2xl bg-amber-950/90 px-4 py-3.5 text-xs font-semibold text-amber-200 shadow-2xl border border-amber-500/40 backdrop-blur-xl animate-fade-in"
    >
      <div className="flex h-2.5 w-2.5 relative shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
      </div>
      <WifiOff className="w-4 h-4 text-amber-400 shrink-0" />
      <span className="leading-snug">{t.offlineNotice}</span>
    </div>
  );
};
