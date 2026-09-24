'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout, Code2, Palette, Server, BrainCircuit, Database, Layers, Map, FileCode, Cpu, RotateCw } from 'lucide-react';
import { SITE_DATA, TechItem } from '@/lib/constants';

const techIconMap: Record<string, React.ElementType> = {
  Layout,
  Code2,
  Palette,
  Server,
  BrainCircuit,
  Database,
  Layers,
  Map,
  FileCode,
  Cpu,
};

export default function TechStackSection() {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const toggleFlip = (name: string) => {
    setFlippedCards((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <section id="tech-stack" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-4 py-1.5 rounded-full bg-[#FFB800]/10 border border-[#FFB800]/30 text-[#FFB800] text-xs font-mono font-bold uppercase tracking-widest">
            ENTERPRISE ARCHITECTURE
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-white mt-4">
            3D Interactive <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB800] via-white to-[#00E5CC]">Tech Stack Matrix</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Click or hover any 3D tile to flip and inspect its architectural role in SCHEME SPEAR.
          </p>
        </div>

        {/* 3D Flip Tiles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {SITE_DATA.techStack.map((tech: TechItem, idx: number) => {
            const IconComponent = techIconMap[tech.icon] || Cpu;
            const techName = tech.name || tech.title;
            const isFlipped = !!flippedCards[techName];

            return (
              <div
                key={techName}
                onClick={() => toggleFlip(techName)}
                className="h-56 cursor-pointer group perspective-1000"
              >
                <motion.div
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full h-full rounded-3xl preserve-3d"
                >
                  {/* FRONT SIDE */}
                  <div className="absolute inset-0 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-slate-700/80 p-6 flex flex-col justify-between items-center text-center backface-hidden shadow-lg group-hover:border-[#FFB800] transition-colors">
                    <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center p-2 shadow-inner">
                      <IconComponent className="w-8 h-8" style={{ color: tech.color || '#FFB800' }} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white font-heading">{techName}</h3>
                      <span className="text-[10px] font-mono text-[#00E5CC] uppercase tracking-wider block mt-1">
                        {tech.category} • {tech.role || tech.tech}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400">
                      <RotateCw className="w-3 h-3 text-[#FFB800]" /> Click to Flip 3D
                    </div>
                  </div>

                  {/* BACK SIDE */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#0F172A] to-slate-950 border border-[#FFB800]/50 p-6 flex flex-col justify-between items-center text-center rotate-y-180 backface-hidden shadow-[0_0_25px_rgba(255,184,0,0.25)]">
                    <span className="text-[10px] font-mono text-[#FFB800] uppercase tracking-wider">
                      ARCHITECTURAL ROLE
                    </span>
                    <p className="text-xs text-slate-200 leading-relaxed font-sans">
                      {tech.desc || tech.details}
                    </p>
                    <span className="px-2.5 py-1 rounded-full bg-[#00E5CC]/20 text-[#00E5CC] text-[10px] font-mono font-bold">
                      VERIFIED STACK
                    </span>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
