'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ExternalLink, Quote, Award } from 'lucide-react';
import { SITE_DATA, CitationItem } from '@/lib/constants';
import TiltCard from '../ui/TiltCard';

export default function ResearchSection() {
  return (
    <section id="research" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-4 py-1.5 rounded-full bg-[#FFB800]/10 border border-[#FFB800]/30 text-[#FFB800] text-xs font-mono font-bold uppercase tracking-widest flex items-center justify-center gap-2 w-max mx-auto">
            <BookOpen className="w-3.5 h-3.5" /> ACADEMIC & GOVERNMENT GROUNDING
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-white mt-4">
            Research & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB800] via-white to-[#00E5CC]">Official References</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Grounded in official policy frameworks from NSFDC, NITI Aayog, and Ministry of Social Justice & Empowerment.
          </p>
        </div>

        {/* Citation Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SITE_DATA.researchCitations.map((cite: CitationItem, idx: number) => (
            <motion.div
              key={cite.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <TiltCard glowColor={idx % 2 === 0 ? 'gold' : 'teal'} className="h-full flex flex-col justify-between">
                <div className="space-y-4">
                  {/* Badge */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-md bg-slate-800 text-[#FFB800] border border-amber-500/30">
                      REF NO. 0{idx + 1} • {cite.year}
                    </span>
                    <Quote className="w-6 h-6 text-slate-700" />
                  </div>

                  {/* Title & Source */}
                  <div>
                    <h3 className="text-base font-bold text-white font-heading leading-tight mb-1">
                      {cite.title}
                    </h3>
                    <p className="text-xs font-mono text-[#00E5CC]">{cite.source}</p>
                  </div>

                  {/* Quote Box */}
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 italic text-xs text-slate-300 leading-relaxed relative">
                    &ldquo;{cite.quote}&rdquo;
                  </div>

                  {/* Relevance */}
                  <div className="text-xs text-slate-400">
                    <strong className="text-white">Relevance: </strong>
                    {cite.relevance}
                  </div>
                </div>

                {/* Link Footer */}
                <div className="pt-4 border-t border-slate-800/80 mt-6 flex items-center justify-between text-xs font-mono text-[#FFB800]">
                  <span>{cite.linkText}</span>
                  <ExternalLink className="w-4 h-4" />
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* SIH Hackathon Badge Footer */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-slate-900/90 border border-slate-700 text-xs text-slate-300">
            <Award className="w-5 h-5 text-[#FFB800]" />
            <span>Verified Submission for <strong className="text-white">Smart India Hackathon 2026 (PS26092)</strong></span>
          </div>
        </div>

      </div>
    </section>
  );
}
