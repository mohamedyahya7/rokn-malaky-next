'use client';

import React from 'react';

interface SectionDividerProps {
  className?: string;
}

const SectionDivider: React.FC<SectionDividerProps> = ({ className = '' }) => {
  return (
    <div className={`relative w-full flex justify-center items-center py-8 -my-16 z-10 pointer-events-none ${className}`}>
      <div className="flex justify-center items-center gap-40 md:gap-80">
        <div 
          className="w-6 h-16 animate-bounce-slow hidden md:block rotate-90 opacity-80 shadow-lg pointer-events-auto"
          style={{ 
            backgroundColor: 'var(--primary)',
            transform: 'rotate(45deg)',
            animationDelay: '0s'
          }}
        ></div>
        <div 
          className="w-10 h-16  rotate-45 shadow-xl pointer-events-auto"
          style={{ 
            backgroundColor: 'var(--primary)',
       
            animationDelay: '0.5s'
          }}
        ></div>
        <div 
          className="w-16 h-16 rounded-full animate-bounce-slow opacity-90 shadow-lg pointer-events-auto"
          style={{ 
            backgroundColor: 'var(--primary)',
            transform: 'rotate(45deg)',
            animationDelay: '1s'
          }}
        ></div>
      </div>
    </div>
  );
};

export default SectionDivider;
