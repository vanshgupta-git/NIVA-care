import React from 'react';

export const AmbientBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Background Cyber Tech Grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-60" />

      {/* Floating Glowing Gradient Orbs */}
      <div 
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-cyan-500/10 blur-[120px] animate-pulse"
        style={{ animationDuration: '7s' }}
      />
      <div 
        className="absolute top-1/4 -right-32 w-[30rem] h-[30rem] rounded-full bg-blue-600/10 blur-[140px] animate-pulse"
        style={{ animationDuration: '9s', animationDelay: '2s' }}
      />
      <div 
        className="absolute bottom-10 left-1/3 w-[26rem] h-[26rem] rounded-full bg-indigo-500/8 blur-[130px] animate-pulse"
        style={{ animationDuration: '11s', animationDelay: '4s' }}
      />
      <div 
        className="absolute top-2/3 -left-20 w-80 h-80 rounded-full bg-red-600/6 blur-[120px] animate-pulse"
        style={{ animationDuration: '8s', animationDelay: '1s' }}
      />

      {/* Subtle Radial Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(6,9,15,0.75)_100%)]" />
    </div>
  );
};
