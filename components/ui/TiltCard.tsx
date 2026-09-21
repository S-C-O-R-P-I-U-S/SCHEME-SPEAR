'use client';

import React from 'react';
import { use3dTilt } from '@/hooks/use3dTilt';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'gold' | 'teal' | 'purple';
  maxTilt?: number;
}

export default function TiltCard({
  children,
  className = '',
  glowColor = 'gold',
  maxTilt = 12,
}: TiltCardProps) {
  const { ref, tiltStyle, glareStyle, handleMouseMove, handleTouchMove, handleMouseLeave, isHovered } = use3dTilt(maxTilt);

  const glowBorders = {
    gold: 'border-[#FFB800]/30 hover:border-[#FFB800] hover:shadow-[0_15px_40px_rgba(255,184,0,0.3)]',
    teal: 'border-[#00E5CC]/30 hover:border-[#00E5CC] hover:shadow-[0_15px_40px_rgba(0,229,204,0.3)]',
    purple: 'border-purple-500/30 hover:border-purple-400 hover:shadow-[0_15px_40px_rgba(168,85,247,0.3)]',
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseLeave={handleMouseLeave}
      style={tiltStyle}
      className={`relative rounded-3xl bg-slate-900/60 backdrop-blur-xl border p-6 transition-all duration-300 overflow-hidden ${glowBorders[glowColor]} ${className}`}
    >
      {/* Glare Shine Layer */}
      <div className="absolute inset-0 pointer-events-none rounded-3xl" style={glareStyle} />
      
      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Subtle corner neon accent */}
      <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${glowColor === 'gold' ? 'from-[#FFB800]/15' : 'from-[#00E5CC]/15'} to-transparent rounded-tr-3xl pointer-events-none opacity-60`} />
    </div>
  );
}
