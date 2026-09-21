'use client';

import React, { useRef, useState, MouseEvent } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'gold' | 'teal' | 'glass';
}

export default function MagneticButton({
  children,
  onClick,
  className = '',
  variant = 'gold',
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = (e.clientX - centerX) * 0.35;
    const distanceY = (e.clientY - centerY) * 0.35;
    setPosition({ x: distanceX, y: distanceY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles = "relative inline-flex items-center justify-center font-bold px-7 py-3.5 rounded-2xl transition-all duration-300 shadow-lg cursor-pointer overflow-hidden";
  
  const variantStyles = {
    gold: "bg-gradient-to-r from-[#FFB800] to-[#FFA000] text-black shadow-[0_0_25px_rgba(255,184,0,0.4)] hover:shadow-[0_0_40px_rgba(255,184,0,0.7)] border border-amber-300/40",
    teal: "bg-gradient-to-r from-[#00E5CC] to-[#00BFA5] text-black shadow-[0_0_25px_rgba(0,229,204,0.4)] hover:shadow-[0_0_40px_rgba(0,229,204,0.7)] border border-teal-200/40",
    glass: "bg-slate-900/70 text-white backdrop-blur-xl border border-slate-700/60 hover:border-[#FFB800]/60 shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(255,184,0,0.25)]",
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 350, damping: 20, mass: 0.5 }}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {/* Shine overlay */}
      <span className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.button>
  );
}
