'use client';

import React from 'react';

interface AvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export default function Avatar({ name, size = 'md', className = '' }: AvatarProps) {
  const getInitials = (n: string) => {
    if (!n) return 'SC';
    const parts = n.trim().split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return n.slice(0, 2).toUpperCase();
  };

  const dimensions = {
    sm: 'w-7 h-7 text-[10px]',
    md: 'w-9 h-9 text-xs',
    lg: 'w-12 h-12 text-sm',
    xl: 'w-16 h-16 text-lg',
  };

  return (
    <div className={`relative inline-flex items-center justify-center rounded-full bg-gradient-to-tr from-[#FFB800] via-amber-300 to-[#00E5CC] p-0.5 shadow-[0_0_15px_rgba(255,184,0,0.4)] ${dimensions[size]} ${className}`}>
      <div className="w-full h-full bg-[#0A0E1A] rounded-full flex items-center justify-center font-black font-heading text-transparent bg-clip-text bg-gradient-to-r from-[#FFB800] to-[#00E5CC]">
        {getInitials(name)}
      </div>
    </div>
  );
}
