'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserCheck, Search, ShieldCheck, BadgeIndianRupee, Building2, Send, ArrowRight } from 'lucide-react';
import { SITE_DATA, StepItem } from '@/lib/constants';

const stepIconMap: Record<string, React.ElementType> = {
  UserCheck,
  Search,
  ShieldCheck,
  BadgeIndianRupee,
  Building2,
  Send,
};

export default function HowItWorksSection({ onOpenAuth }: { onOpenAuth: () => void }) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="how-it-works" className="py-24 relative z-10 bg-slate-950/40 border-y border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-4 py-1.5 rounded-full bg-[#00E5CC]/10 border border-[#00E5CC]/30 text-[#00E5CC] text-xs font-mono font-bold uppercase tracking-widest">
            BENEFICIARY WORKFLOW
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-white mt-4">
            How <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5CC] via-white to-[#FFB800]">SCHEME SPEAR</span> Works
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            From initial query to verified application submission in 6 simple guided steps.
          </p>
        </div>

        {/* Interactive 6-Step Horizontal Progress Bar */}
        <div className="hidden lg:grid grid-cols-6 gap-2 mb-12 relative">
          {SITE_DATA.howItWorks.map((st: StepItem, idx: number) => {
            const Icon = stepIconMap[st.icon] || Search;
            const isActive = idx === activeStep;
            const isCompleted = idx < activeStep;

            return (
              <button
                key={st.step}
                onClick={() => setActiveStep(idx)}
                className={`relative p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 border-[#FFB800] shadow-[0_0_20px_rgba(255,184,0,0.3)]'
                    : isCompleted
                    ? 'bg-slate-900/60 border-teal-500/40'
                    : 'bg-slate-900/30 border-slate-800 opacity-60 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-[#FFB800]">
                    STEP 0{st.step}
                  </span>
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#FFB800]' : 'text-slate-400'}`} />
                </div>
                <h4 className="text-xs font-bold text-white truncate">{st.title}</h4>
              </button>
            );
          })}
        </div>

        {/* Detailed Step Active Card Showcase */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-slate-900/70 border border-slate-700/60 p-8 sm:p-10 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
          {(() => {
            const current = SITE_DATA.howItWorks[activeStep];
            const IconComponent = stepIconMap[current.icon] || Search;

            return (
              <motion.div
                key={current.step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
              >
                <div className="md:col-span-4 flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-[#FFB800] to-[#00E5CC] p-1 shadow-[0_0_35px_rgba(255,184,0,0.4)] mb-4">
                    <div className="w-full h-full bg-[#0A0E1A] rounded-[22px] flex items-center justify-center">
                      <IconComponent className="w-12 h-12 text-[#FFB800]" />
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#FFB800]/20 text-[#FFB800] border border-[#FFB800]/40">
                    STAGE {current.step} OF 6
                  </span>
                </div>

                <div className="md:col-span-8 space-y-4 text-left">
                  <div>
                    <span className="text-xs font-mono text-[#00E5CC] uppercase tracking-wider">
                      {current.subtitle}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold font-heading text-white mt-1">
                      {current.title}
                    </h3>
                  </div>

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    {current.description}
                  </p>

                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    <button
                      onClick={() => setActiveStep((prev) => (prev + 1) % SITE_DATA.howItWorks.length)}
                      className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      Next Step <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={onOpenAuth}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FFB800] to-amber-500 text-black font-bold text-xs flex items-center gap-2 shadow-md hover:scale-105 transition-transform cursor-pointer"
                    >
                      Try Step {current.step} Live 🚀
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })()}
        </div>

      </div>
    </section>
  );
}
