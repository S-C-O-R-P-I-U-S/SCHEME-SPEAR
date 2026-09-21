'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CursorTrail() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);

  useEffect(() => {
    let counter = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      setMousePosition({ x, y });
      
      counter++;
      if (counter % 3 === 0) {
        setTrail((prev) => [
          ...prev.slice(-12),
          { x, y, id: Date.now() + Math.random() },
        ]);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block">
      {/* Primary Glowing Cursor Dot */}
      <motion.div
        className="fixed top-0 left-0 w-5 h-5 rounded-full bg-gradient-to-r from-[#FFB800] to-[#00E5CC] shadow-[0_0_20px_#00E5CC] border border-white/60"
        animate={{
          x: mousePosition.x - 10,
          y: mousePosition.y - 10,
        }}
        transition={{ type: 'spring', stiffness: 800, damping: 35, mass: 0.1 }}
      />

      {/* Tail Particles */}
      {trail.map((pt, i) => (
        <motion.div
          key={pt.id}
          initial={{ opacity: 0.8, scale: 1 }}
          animate={{ opacity: 0, scale: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-[#FFB800] shadow-[0_0_10px_#FFB800]"
          style={{
            transform: `translate3d(${pt.x - 5}px, ${pt.y - 5}px, 0)`,
          }}
        />
      ))}
    </div>
  );
}
