import React from 'react';

export const AmbientBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Crisp Light Dot Grid */}
      <div className="absolute inset-0 bg-light-grid opacity-30" />

      {/* Soft warm light gradient spots */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-indigo-100/40 blur-[100px]" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-sky-100/30 blur-[120px]" />
      <div className="absolute bottom-10 left-1/3 w-80 h-80 rounded-full bg-rose-50/40 blur-[100px]" />
    </div>
  );
};
