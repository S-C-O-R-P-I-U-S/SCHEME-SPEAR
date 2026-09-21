'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, MessageSquare, Sliders, Search, CheckSquare, Calculator, MapPin, LayoutDashboard, ArrowRight } from 'lucide-react';
import { SITE_DATA, ArchitectureNode } from '@/lib/constants';

const archIconMap: Record<string, React.ElementType> = {
  User,
  MessageSquare,
  Sliders,
  Search,
  CheckSquare,
  Calculator,
  MapPin,
  LayoutDashboard,
};

export default function ArchitectureSection() {
  const [selectedNode, setSelectedNode] = useState<number>(1);

  return (
    <section id="architecture" className="py-24 relative z-10 bg-slate-950/60 border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-4 py-1.5 rounded-full bg-[#00E5CC]/10 border border-[#00E5CC]/30 text-[#00E5CC] text-xs font-mono font-bold uppercase tracking-widest">
            LIVE DATA PIPELINE
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-white mt-4">
            System <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5CC] via-white to-[#FFB800]">Data-Flow Architecture</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            End-to-end telemetry demonstrating query ingestion, vector extraction, rule validation, and partner routing.
          </p>
        </div>

        {/* Animated Data-Flow Pipeline Map */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-12">
          {SITE_DATA.architecture.map((node: ArchitectureNode, idx: number) => {
            const Icon = archIconMap[node.icon] || User;
            const isSelected = selectedNode === node.id;

            return (
              <button
                key={node.id}
                onClick={() => setSelectedNode(node.id)}
                className={`relative p-3.5 rounded-2xl border text-center transition-all duration-300 flex flex-col items-center justify-between h-36 cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 border-[#FFB800] shadow-[0_0_25px_rgba(255,184,0,0.4)] scale-105 z-10'
                    : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 opacity-80 hover:opacity-100'
                }`}
              >
                {/* Step Index Badge */}
                <span className="text-[10px] font-mono font-bold text-[#FFB800]">
                  0{node.id}
                </span>

                {/* Node Icon */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  isSelected ? 'bg-[#FFB800] text-black shadow-md' : 'bg-slate-800 text-[#00E5CC]'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>

                {/* Node Label */}
                <span className="text-[11px] font-bold text-white leading-tight line-clamp-2">
                  {node.title}
                </span>

                {/* Arrow Connector Indicator */}
                {idx < SITE_DATA.architecture.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 text-slate-600 w-4 h-4 z-20" />
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Node Inspector Panel */}
        {(() => {
          const activeNode = SITE_DATA.architecture.find((n) => n.id === selectedNode)!;
          const ActiveIcon = archIconMap[activeNode.icon] || User;

          return (
            <motion.div
              key={activeNode.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto rounded-3xl bg-slate-900/90 border border-amber-500/30 p-8 backdrop-blur-2xl shadow-[0_0_35px_rgba(255,184,0,0.2)] flex flex-col md:flex-row items-center gap-6"
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#FFB800] to-[#00E5CC] p-1 flex-shrink-0 shadow-lg">
                <div className="w-full h-full bg-[#0A0E1A] rounded-[14px] flex items-center justify-center">
                  <ActiveIcon className="w-10 h-10 text-[#FFB800]" />
                </div>
              </div>
              <div className="space-y-2 text-left w-full">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#00E5CC] uppercase">
                    STAGE 0{activeNode.id} • {activeNode.type.toUpperCase()} NODE
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-[10px] font-mono text-slate-300">
                    LATENCY: &lt;12ms
                  </span>
                </div>
                <h3 className="text-2xl font-bold font-heading text-white">{activeNode.title}</h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{activeNode.desc}</p>
                <div className="pt-2 flex items-center gap-2 font-mono text-[11px] text-amber-300">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  Pipelined into Next Node in Real-time Stream
                </div>
              </div>
            </motion.div>
          );
        })()}

      </div>
    </section>
  );
}
