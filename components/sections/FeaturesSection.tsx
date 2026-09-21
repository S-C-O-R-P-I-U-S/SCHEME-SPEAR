'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SITE_DATA } from '@/lib/constants';
import TiltCard from '../ui/TiltCard';

const featureIcons: Record<string, string> = {
  Sparkles: '✨',
  Calculator: '🧮',
  CheckCircle2: '🛡️',
  TrendingUp: '📈',
  FileCheck: '📄',
  MapPin: '📍',
  Compass: '🧭',
};

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-4 py-1.5 rounded-full bg-[#FFB800]/10 border border-[#FFB800]/30 text-[#FFB800] text-xs font-mono font-bold uppercase tracking-widest">
            REVOLUTIONARY CAPABILITIES
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-white mt-4">
            Engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB800] to-[#00E5CC]">Maximum Impact</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
            7 integrated modules removing systemic barriers for marginalized micro-entrepreneurs across India.
          </p>
        </div>

        {/* 7 Glassmorphic 3D Tilt Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SITE_DATA.features.map((feat, idx) => {
            const isGold = idx % 2 === 0;
            const emojiIcon = featureIcons[feat.iconName] || '⚡';

            return (
              <motion.div
                key={feat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={idx === 6 ? 'md:col-span-2 lg:col-span-3 max-w-2xl mx-auto w-full' : ''}
              >
                <TiltCard glowColor={isGold ? 'gold' : 'teal'} className="h-full flex flex-col justify-between">
                  <div>
                    {/* Header Badge */}
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center p-0.5 shadow-lg ${
                        isGold ? 'bg-gradient-to-tr from-[#FFB800] to-amber-200' : 'bg-gradient-to-tr from-[#00E5CC] to-teal-200'
                      }`}>
                        <div className="w-full h-full bg-[#0A0E1A] rounded-[14px] flex items-center justify-center text-xl font-bold">
                          {emojiIcon}
                        </div>
                      </div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                        {feat.tag}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-xl font-bold font-heading text-white mb-2">
                      {feat.title}
                    </h3>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                      {feat.description}
                    </p>
                  </div>

                  {/* Feature Highlight Chip */}
                  <div className="pt-4 border-t border-slate-800/80 flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${isGold ? 'bg-[#FFB800] shadow-[0_0_8px_#FFB800]' : 'bg-[#00E5CC] shadow-[0_0_8px_#00E5CC]'}`} />
                    <span className="text-xs font-mono font-semibold text-slate-300">
                      {feat.highlight}
                    </span>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
