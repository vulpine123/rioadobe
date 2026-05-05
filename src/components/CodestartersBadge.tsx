import React from 'react';

export const CodestartersBadge: React.FC = () => {
  return (
    <div className="fixed bottom-14 right-4 z-[9999] flex items-center gap-2 bg-black/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-full border border-white/10 shadow-lg transition-transform hover:scale-105 cursor-default group">
      <span className="text-[10px] font-medium tracking-wider uppercase opacity-70 group-hover:opacity-100 transition-opacity">Made by</span>
      <span className="text-xs font-bold tracking-tight bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent">Codestarters</span>
    </div>
  );
};
