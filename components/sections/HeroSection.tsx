'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, ChevronDown, Rocket } from 'lucide-react';
import FloatingScorpion3D from '../canvas/FloatingScorpion3D';
import MagneticButton from '../ui/MagneticButton';
import Typewriter from '../ui/Typewriter';
import Counter from '../ui/Counter';

export default function HeroSection({ onOpenAuth }: { onOpenAuth: () => void }) {
  return (
    <section id="hero" className="relative min-h-screen pt-32 pb-20 flex flex-col justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFB800]/15 border border-[#FFB800]/40 text-[#FFB800] text-xs font-bold font-mono tracking-wider shadow-[0_0_15px_rgba(255,184,0,0.3)]">
                <Sparkles className="w-3.5 h-3.5" /> SMART INDIA HACKATHON 2026
              </span>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00E5CC]/15 border border-[#00E5CC]/40 text-[#00E5CC] text-xs font-bold font-mono tracking-wider shadow-[0_0_15px_rgba(0,229,204,0.3)]">
                <ShieldCheck className="w-3.5 h-3.5" /> PROBLEM STATEMENT PS26092
              </span>
            </div>

            {/* Giant 3D Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-heading tracking-tight leading-[1.08] text-white">
              Find the <span className="bg-gradient-to-r from-[#FFB800] via-amber-200 to-[#FFD700] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(255,184,0,0.4)]">right support.</span>
              <br />
              Take the <span className="bg-gradient-to-r from-[#00E5CC] via-teal-200 to-[#80FFF3] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(0,229,204,0.4)]">right step.</span>
            </h1>

            {/* Subtitle with Typewriter */}
            <div className="text-lg sm:text-xl text-slate-300 font-light leading-relaxed max-w-2xl">
              AI-Driven Scheme Matching & Financial Inclusion for Marginalized Entrepreneurs across India.{' '}
              <br />
              <span className="text-sm font-semibold text-slate-400">Features: </span>
              <Typewriter
                words={[
                  'Hyper-Personalized Eligibility Scoring',
                  'Smart Loan & Interest EMI Simulator',
                  'Direct NSFDC Channel Partner Routing',
                  'Multi-lingual Voice & Document AI',
                ]}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <MagneticButton variant="gold" onClick={onOpenAuth}>
                Get Matched <Rocket className="w-4 h-4 ml-1 animate-bounce" />
              </MagneticButton>
              <a href="#features">
                <MagneticButton variant="glass">
                  Explore Schemes <ArrowRight className="w-4 h-4 ml-1" />
                </MagneticButton>
              </a>
            </div>

            {/* Live Stats Preview Bar */}
            <div className="pt-8 border-t border-slate-800/80 grid grid-cols-3 gap-4 max-w-xl">
              <div className="p-3 rounded-2xl bg-slate-900/60 backdrop-blur-md border border-slate-800">
                <div className="text-2xl font-black text-[#FFB800]">
                  <Counter end={500} suffix="+" />
                </div>
                <div className="text-[11px] font-mono text-slate-400">Govt Schemes Mapped</div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-900/60 backdrop-blur-md border border-slate-800">
                <div className="text-2xl font-black text-[#00E5CC]">
                  <Counter end={102} suffix=" SCAs" />
                </div>
                <div className="text-[11px] font-mono text-slate-400">NSFDC State Partners</div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-900/60 backdrop-blur-md border border-slate-800">
                <div className="text-2xl font-black text-amber-300">
                  <Counter end={99.4} suffix="%" decimals={1} />
                </div>
                <div className="text-[11px] font-mono text-slate-400">Scoring Accuracy</div>
              </div>
            </div>

          </motion.div>

          {/* Right 3D Emblem Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="lg:col-span-5 relative"
          >
            <div className="relative">
              {/* Background Glow Ring */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#FFB800]/20 to-[#00E5CC]/20 rounded-full blur-3xl pointer-events-none" />
              <FloatingScorpion3D />
              
              {/* Floating Badge */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 px-5 py-2 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-[#FFB800]/40 shadow-[0_0_25px_rgba(255,184,0,0.3)] text-center">
                <p className="text-xs font-bold text-white font-mono">⚡ TEAM SCORPIUS MASCOT</p>
                <p className="text-[10px] text-amber-400">Autonomous Financial Guardian</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1 opacity-70 hover:opacity-100 transition-opacity">
        <span className="text-[10px] font-mono text-slate-400 tracking-widest uppercase">SCROLL TO DISCOVER</span>
        <ChevronDown className="w-4 h-4 text-[#FFB800] animate-bounce" />
      </div>
    </section>
  );
}
