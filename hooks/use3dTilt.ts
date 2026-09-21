'use client';

import { useState, useRef, MouseEvent, TouchEvent } from 'react';

interface TiltState {
  rotateX: number;
  rotateY: number;
  glareX: number;
  glareY: number;
  scale: number;
}

export function use3dTilt(maxTilt = 15, scaleHover = 1.04) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<TiltState>({
    rotateX: 0,
    rotateY: 0,
    glareX: 50,
    glareY: 50,
    scale: 1,
  });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width;
    const yPct = mouseY / height;
    
    const rotateY = (xPct - 0.5) * maxTilt * 2;
    const rotateX = (0.5 - yPct) * maxTilt * 2;
    
    setTilt({
      rotateX,
      rotateY,
      glareX: xPct * 100,
      glareY: yPct * 100,
      scale: scaleHover,
    });
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!ref.current || !e.touches[0]) return;
    const rect = ref.current.getBoundingClientRect();
    const touch = e.touches[0];
    const mouseX = touch.clientX - rect.left;
    const mouseY = touch.clientY - rect.top;
    
    const xPct = Math.max(0, Math.min(1, mouseX / rect.width));
    const yPct = Math.max(0, Math.min(1, mouseY / rect.height));
    
    setTilt({
      rotateX: (0.5 - yPct) * maxTilt * 1.5,
      rotateY: (xPct - 0.5) * maxTilt * 1.5,
      glareX: xPct * 100,
      glareY: yPct * 100,
      scale: scaleHover,
    });
  };

  const handleMouseLeave = () => {
    setTilt({
      rotateX: 0,
      rotateY: 0,
      glareX: 50,
      glareY: 50,
      scale: 1,
    });
  };

  const tiltStyle = {
    transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(${tilt.scale}, ${tilt.scale}, ${tilt.scale})`,
    transition: 'transform 0.15s ease-out, box-shadow 0.15s ease-out',
    transformStyle: 'preserve-3d' as const,
  };

  const glareStyle = {
    background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 75%)`,
    opacity: tilt.scale > 1 ? 1 : 0,
    transition: 'opacity 0.2s ease',
  };

  return { ref, tiltStyle, glareStyle, handleMouseMove, handleTouchMove, handleMouseLeave, isHovered: tilt.scale > 1 };
}
