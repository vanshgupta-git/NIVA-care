import React from 'react';
import { Sparkles, Activity } from 'lucide-react';

interface AIOrbProps {
  isAnalyzing?: boolean;
  size?: 'sm' | 'md' | 'lg';
  statusText?: string;
}

export const AIOrb: React.FC<AIOrbProps> = ({
  isAnalyzing = false,
  size = 'md',
  statusText
}) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24 sm:w-28 sm:h-28'
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* Outer Radiating Energy Rings */}
      <div 
        className={`absolute rounded-full transition-all duration-700 ${
          isAnalyzing 
            ? 'w-32 h-32 sm:w-40 sm:h-40 bg-cyan-500/25 blur-xl animate-ping' 
            : 'w-24 h-24 sm:w-32 sm:h-32 bg-cyan-500/10 blur-lg animate-pulse'
        }`}
        style={{ animationDuration: isAnalyzing ? '1.5s' : '4s' }}
      />

      {/* Secondary Glow Layer */}
      <div 
        className={`absolute rounded-full transition-all duration-500 ${
          isAnalyzing 
            ? 'w-24 h-24 sm:w-32 sm:h-32 bg-blue-500/30 blur-md' 
            : 'w-20 h-20 sm:w-24 sm:h-24 bg-indigo-500/20 blur-md'
        }`}
      />

      {/* Main Core Orb */}
      <div 
        className={`relative ${sizeClasses[size]} rounded-full flex items-center justify-center transition-all duration-500 border shadow-2xl ${
          isAnalyzing
            ? 'bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-500 border-cyan-300 shadow-cyan-500/50 animate-spin'
            : 'bg-gradient-to-tr from-cyan-950 via-slate-900 to-cyan-900/80 border-cyan-500/40 shadow-cyan-500/20 animate-orb-breathe'
        }`}
        style={{ animationDuration: isAnalyzing ? '3s' : '8s' }}
      >
        {/* Core Center Pulse */}
        <div className="w-1/2 h-1/2 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-300 blur-2xs opacity-90 animate-pulse" />
        
        {/* Holographic Sparkle / Icon */}
        <div className="absolute inset-0 flex items-center justify-center text-cyan-200">
          {isAnalyzing ? (
            <Activity className="w-6 h-6 animate-pulse text-white" />
          ) : (
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 opacity-90 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
          )}
        </div>
      </div>

      {/* Optional Status Pill */}
      {statusText && (
        <span className="absolute -bottom-6 whitespace-nowrap text-[10px] font-mono font-bold tracking-widest text-cyan-400 uppercase bg-cyan-950/80 border border-cyan-500/30 px-2 py-0.5 rounded-full backdrop-blur-xs">
          {statusText}
        </span>
      )}
    </div>
  );
};
