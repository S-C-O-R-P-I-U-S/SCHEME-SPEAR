'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HeartHandshake, TrendingUp, Zap, Globe, Expand, Languages, MapPin } from 'lucide-react';
import { SITE_DATA, ImpactPillar } from '@/lib/constants';
import TiltCard from '../ui/TiltCard';

const impactIconMap: Record<string, React.ElementType> = {
  HeartHandshake,
  TrendingUp,
  Zap,
  Globe,
};

export default function ImpactSection() {
  return (
    <section id="impact" className="py-24 relative z-10 bg-slate-950/40 border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-4 py-1.5 rounded-full bg-[#00E5CC]/10 border border-[#00E5CC]/30 text-[#00E5CC] text-xs font-mono font-bold uppercase tracking-widest">
            TRANSFORMATIVE OUTCOMES
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-white mt-4">
            National <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5CC] via-white to-[#FFB800]">Impact & Scalability</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Designed for systemic change across the social and economic landscape of India.
          </p>
        </div>

        {/* 4 Animated Pillar Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {SITE_DATA.impactPillars.map((pillar: ImpactPillar, idx: number) => {
            const Icon = impactIconMap[pillar.icon] || HeartHandshake;

            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <TiltCard glowColor={idx % 2 === 0 ? 'gold' : 'teal'} className="h-full flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-4 text-[#FFB800]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="text-3xl font-black font-heading text-white mb-1">
                      {pillar.metric}
                    </div>
                    <span className="text-xs font-mono font-bold text-[#00E5CC] block mb-3">
                      {pillar.metricLabel}
                    </span>
                    <h3 className="text-base font-bold text-white mb-2">{pillar.title}</h3>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

        {/* Scalability Section */}
        <div className="rounded-3xl bg-slate-900/80 border border-slate-700 p-8 sm:p-10 backdrop-blur-xl">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3 className="text-2xl font-bold font-heading text-white flex items-center justify-center gap-2">
              <Expand className="w-6 h-6 text-[#FFB800]" /> 3-Tiered Scalability Blueprint
            </h3>
            <p className="text-xs text-slate-400 mt-1">Expanding across all 28 States & 8 Union Territories</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-[#FFB800] font-bold text-sm font-heading">
                <Zap className="w-4 h-4" /> Technical Scalability
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Cloud-native microservices architecture capable of handling 50,000+ concurrent scheme evaluation queries per second using asynchronous FastAPI workers.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-[#00E5CC] font-bold text-sm font-heading">
                <MapPin className="w-4 h-4" /> Geographical Reach
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Mapped database of 102 NSFDC State Channelizing Agencies, District Nodal Offices, and Regional Rural Bank branches down to block/tehsil levels.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-sm font-heading">
                <Languages className="w-4 h-4" /> Multi-Lingual Expansion
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Support for 12 major Indian languages (Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada, etc.) with localized voice speech recognition.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
