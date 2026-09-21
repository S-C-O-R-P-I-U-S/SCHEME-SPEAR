'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoading(false), 400);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 120);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0A0E1A] text-white"
        >
          {/* Animated 3D Ring Glow */}
          <div className="relative flex items-center justify-center mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
              className="w-28 h-28 rounded-full border-2 border-dashed border-[#FFB800] shadow-[0_0_30px_rgba(255,184,0,0.4)]"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
              className="absolute w-36 h-36 rounded-full border border-teal-400/40 border-dotted"
            />
            <div className="absolute w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#FFB800] to-[#00E5CC] p-0.5 flex items-center justify-center shadow-[0_0_25px_rgba(0,229,204,0.6)]">
              <div className="w-full h-full bg-[#0A0E1A] rounded-[14px] flex items-center justify-center">
                <Zap className="w-8 h-8 text-[#FFB800] animate-pulse" />
              </div>
            </div>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#FFB800] via-white to-[#00E5CC]"
          >
            SCHEME SPEAR
          </motion.h2>

          <p className="text-xs uppercase tracking-[0.3em] text-slate-400 mt-2 font-mono">
            TEAM SCORPIUS • SIH 2026
          </p>

          {/* Progress Bar & Percentage */}
          <div className="w-64 mt-8">
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
              <motion.div
                className="h-full bg-gradient-to-r from-[#FFB800] to-[#00E5CC] rounded-full shadow-[0_0_12px_#00E5CC]"
                style={{ width: `${Math.min(100, progress)}%` }}
              />
            </div>
            <div className="flex justify-between items-center mt-3 text-xs font-mono text-slate-400">
              <span>INITIALIZING WEBGL 3D</span>
              <span className="text-[#FFB800] font-bold">{Math.min(100, progress)}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
