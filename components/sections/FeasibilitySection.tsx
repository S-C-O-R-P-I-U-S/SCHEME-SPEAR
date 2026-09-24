'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, CircleDollarSign, Users, Settings, CheckCircle, AlertTriangle, ShieldCheck } from 'lucide-react';
import { SITE_DATA, FeasibilityTab } from '@/lib/constants';
import TiltCard from '../ui/TiltCard';

const tabIconMap: Record<string, React.ElementType> = {
  Cpu,
  CircleDollarSign,
  Users,
  Settings,
};

export default function FeasibilitySection() {
  const [activeTab, setActiveTab] = useState<string>(SITE_DATA.feasibility[0]?.id || 'scalability');

  return (
    <section id="feasibility" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-4 py-1.5 rounded-full bg-[#FFB800]/10 border border-[#FFB800]/30 text-[#FFB800] text-xs font-mono font-bold uppercase tracking-widest">
            VIABILITY & RISK ANALYSIS
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-white mt-4">
            Comprehensive <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB800] via-white to-[#00E5CC]">Feasibility Study</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Extensive validation across Technical, Financial, Market, and Operational dimensions.
          </p>
        </div>

        {/* 4 Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {SITE_DATA.feasibility.map((tab: FeasibilityTab) => {
            const Icon = tabIconMap[tab.icon] || Cpu;
            const isActive = tab.id === activeTab;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2.5 transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#FFB800] to-amber-500 text-black shadow-[0_0_25px_rgba(255,184,0,0.4)] scale-105'
                    : 'bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                }`}
              >
                <Icon className="w-4 h-4" /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        {(() => {
          const current = SITE_DATA.feasibility.find((f) => f.id === activeTab) || SITE_DATA.feasibility[0];

          return (
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {/* Executive Summary Card */}
              <div className="p-8 rounded-3xl bg-slate-900/80 border border-[#00E5CC]/30 backdrop-blur-xl shadow-[0_0_30px_rgba(0,229,204,0.15)]">
                <h3 className="text-xl font-bold text-[#00E5CC] font-heading mb-2 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5" /> Executive Domain Assessment
                </h3>
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                  {current.summary}
                </p>
              </div>

              {/* Highlights & Risk/Mitigation Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Key Highlights */}
                <TiltCard glowColor="teal" className="space-y-4">
                  <h4 className="text-lg font-bold text-white font-heading flex items-center gap-2 border-b border-slate-800 pb-3">
                    <CheckCircle className="w-5 h-5 text-[#00E5CC]" /> Strategic Advantages
                  </h4>
                  <ul className="space-y-3">
                    {current.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00E5CC] mt-2 flex-shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </TiltCard>

                {/* Risk & Mitigation Cards */}
                <TiltCard glowColor="gold" className="space-y-4">
                  <h4 className="text-lg font-bold text-white font-heading flex items-center gap-2 border-b border-slate-800 pb-3">
                    <AlertTriangle className="w-5 h-5 text-[#FFB800]" /> Risk Mitigation Framework
                  </h4>
                  <div className="space-y-4">
                    {current.risks.map((r, i) => (
                      <div key={i} className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                        <p className="text-xs font-semibold text-rose-300 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-rose-400" /> Risk: {r.risk}
                        </p>
                        <p className="text-xs text-emerald-300 leading-relaxed pl-3 border-l-2 border-emerald-500">
                          Mitigation: {r.mitigation}
                        </p>
                      </div>
                    ))}
                  </div>
                </TiltCard>

              </div>
            </motion.div>
          );
        })()}

      </div>
    </section>
  );
}
