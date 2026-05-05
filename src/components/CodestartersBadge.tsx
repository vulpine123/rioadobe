import React from 'react';

/**
 * "Made by Codestarters" badge.
 * Positioned just to the LEFT of the Lovable "Edit with Lovable" badge
 * which is pinned at bottom-4 right-4 by @lovable.dev/vite-tanstack-config.
 */
export const CodestartersBadge: React.FC = () => {
  return (
    <div
      className="fixed bottom-4 right-[170px] z-[9998] flex items-center gap-2 bg-black/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-full border border-white/10 shadow-lg transition-all hover:scale-105 hover:bg-black/90 cursor-default group"
      title="Made by Codestarters"
    >
      <span className="text-[10px] font-medium tracking-wider uppercase opacity-70 group-hover:opacity-100 transition-opacity">Made by</span>
      <span className="text-xs font-bold tracking-tight bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent">Codestarters</span>
    </div>
  );
};
