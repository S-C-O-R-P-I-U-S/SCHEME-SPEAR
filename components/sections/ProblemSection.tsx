'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Clock, Layers, UserX, ShieldAlert } from 'lucide-react';
import { SITE_DATA } from '@/lib/constants';
import Counter from '../ui/Counter';
import TiltCard from '../ui/TiltCard';

export default function ProblemSection() {
  return (
    <section id="problem" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono font-bold uppercase tracking-widest flex items-center justify-center gap-2 w-max mx-auto">
            <AlertTriangle className="w-3.5 h-3.5" /> THE SYSTEMIC CHALLENGE (PS26092)
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-white mt-4">
            Why Marginalized Entrepreneurs <span className="text-rose-400">Miss Out</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Despite billions allocated in concessional finance, central & state welfare schemes suffer from critical implementation bottlenecks.
          </p>
        </div>

        {/* Animated Numbers Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {SITE_DATA.stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <TiltCard glowColor={idx % 2 === 0 ? 'gold' : 'teal'} className="text-center h-full">
                <div className="text-4xl sm:text-5xl font-black font-heading text-transparent bg-clip-text bg-gradient-to-r from-[#FFB800] via-white to-[#00E5CC] mb-2">
                  <Counter end={stat.value} suffix={stat.suffix} decimals={stat.value % 1 !== 0 ? 1 : 0} />
                </div>
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#FFB800] mb-2">
                  {stat.label}
                </div>
                <p className="text-slate-400 text-xs leading-relaxed">
                  {stat.description}
                </p>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Pain Points Detailed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TiltCard glowColor="purple" className="space-y-4">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white font-heading">Multi-Portal Fragmentation</h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Schemes are scattered across 40+ central & state portals (NSFDC, Stand-Up India, Mudra, PMEGP), making discovery impossible for rural entrepreneurs.
            </p>
          </TiltCard>

          <TiltCard glowColor="purple" className="space-y-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <UserX className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white font-heading">Middlemen Exploitation</h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Uncertified agents & CAs charge exorbitant fees (10-20% commission) just to fill out application forms for illiterate beneficiaries.
            </p>
          </TiltCard>

          <TiltCard glowColor="purple" className="space-y-4">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white font-heading">Disbursement Delays</h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Incomplete document dossiers lead to 6-9 month bank rejections, discouraging micro-unit expansion and perpetuating debt cycles.
            </p>
          </TiltCard>
        </div>

      </div>
    </section>
  );
}
