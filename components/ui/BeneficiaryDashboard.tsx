'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, Calculator, MapPin, Download, RefreshCw, CheckCircle2, AlertCircle, Building2, User, Phone } from 'lucide-react';
import { UserProfile, MatchedScheme, matchSchemesForProfile } from '@/lib/matchingEngine';
import Avatar from './Avatar';
import TiltCard from './TiltCard';

interface BeneficiaryDashboardProps {
  profile: UserProfile;
  onEditProfile: () => void;
}

export default function BeneficiaryDashboard({ profile, onEditProfile }: BeneficiaryDashboardProps) {
  const matchedSchemes = matchSchemesForProfile(profile);
  const [selectedScheme, setSelectedScheme] = useState<MatchedScheme>(matchedSchemes[0]);
  const [downloading, setDownloading] = useState(false);

  const handleDownloadDossier = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      alert(`Standardized Application Readiness Dossier for ${profile.name} generated successfully! Ready for submission to ${selectedScheme.scaPartner.agencyName}.`);
    }, 1200);
  };

  return (
    <section className="py-12 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Top Banner & Beneficiary Profile Card */}
      <div className="rounded-3xl bg-slate-900/90 border border-[#FFB800]/40 p-6 sm:p-8 backdrop-blur-2xl shadow-[0_0_40px_rgba(255,184,0,0.2)]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <Avatar name={profile.name} size="xl" />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-black font-heading text-white">{profile.name}</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-[#FFB800]/20 text-[#FFB800] border border-[#FFB800]/40 text-xs font-mono font-bold">
                  {profile.caste} CATEGORY
                </span>
              </div>
              <p className="text-xs text-slate-300 font-mono mt-1">
                📍 {profile.district}, {profile.state} • 📱 +91 {profile.phone}
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-slate-400 font-mono">
                <span>Income: <strong className="text-emerald-400">₹{profile.lpaIncome} LPA</strong></span>
                <span>•</span>
                <span>Status: <strong className="text-amber-300">{profile.entrepreneurStatus}</strong></span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onEditProfile}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 border border-slate-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4 text-[#FFB800]" /> Update Profile Intake
            </button>
            <button
              onClick={handleDownloadDossier}
              disabled={downloading}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FFB800] to-amber-500 text-black font-extrabold text-xs flex items-center gap-2 shadow-lg hover:scale-105 transition-transform cursor-pointer"
            >
              <Download className="w-4 h-4" /> {downloading ? 'Exporting Dossier...' : 'Export Readiness Dossier'}
            </button>
          </div>
        </div>
      </div>

      {/* Recommended Schemes Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-mono font-bold text-[#00E5CC] uppercase tracking-wider">
              AI MATCHED SCHEMES FOR YOUR PROFILE
            </span>
            <h3 className="text-2xl font-bold font-heading text-white mt-1">
              Top Govt Welfare & Loan Recommendations
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Sorted by Match Precision Score %
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Schemes List */}
          <div className="lg:col-span-7 space-y-4">
            {matchedSchemes.map((scheme) => {
              const isSelected = selectedScheme.id === scheme.id;
              const isHighMatch = scheme.matchScore >= 80;

              return (
                <div
                  key={scheme.id}
                  onClick={() => setSelectedScheme(scheme)}
                  className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 border-[#FFB800] shadow-[0_0_30px_rgba(255,184,0,0.3)] scale-[1.01]'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-[#00E5CC] border border-teal-500/30">
                          {scheme.code}
                        </span>
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                          isHighMatch ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        }`}>
                          {scheme.eligibilityStatus.toUpperCase()}
                        </span>
                      </div>
                      <h4 className="text-base font-bold font-heading text-white">{scheme.title}</h4>
                      <p className="text-xs font-mono text-slate-400 mt-0.5">{scheme.ministry}</p>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <div className="text-2xl font-black font-heading text-[#FFB800]">
                        {scheme.matchScore}%
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">Match Score</span>
                    </div>
                  </div>

                  {/* Financial Quick Metrics */}
                  <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-800 text-center">
                    <div className="p-2 rounded-xl bg-slate-950">
                      <span className="text-[10px] font-mono text-slate-500 block">MAX LOAN</span>
                      <span className="text-xs font-bold text-white font-mono">₹{(scheme.maxLoanAmount / 100000).toFixed(1)} Lakhs</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-950">
                      <span className="text-[10px] font-mono text-slate-500 block">SUBSIDY</span>
                      <span className="text-xs font-bold text-[#00E5CC] font-mono">{scheme.subsidyPct}% Capital</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-950">
                      <span className="text-[10px] font-mono text-slate-500 block">EST. MONTHLY EMI</span>
                      <span className="text-xs font-bold text-amber-300 font-mono">₹{scheme.calculatedEmi}/mo</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Selected Scheme Inspector & SCA Partner Routing */}
          <div className="lg:col-span-5 space-y-6">
            <TiltCard glowColor="gold" className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#FFB800] uppercase">SELECTED SCHEME TELEMETRY</span>
                  <h4 className="text-lg font-bold font-heading text-white mt-0.5">{selectedScheme.title}</h4>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#FFB800]/20 text-[#FFB800] flex items-center justify-center font-bold">
                  <ShieldCheck className="w-6 h-6" />
                </div>
              </div>

              {/* Eligibility Gap Analysis */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> AI Compatibility Breakdown
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedScheme.eligibilityReason}
                </p>
                {selectedScheme.missingRequirements.length > 0 && (
                  <div className="pt-2 border-t border-slate-900 text-xs text-amber-300 space-y-1">
                    <strong className="block text-[10px] font-mono uppercase text-amber-400">Actionable Gap Requirements:</strong>
                    {selectedScheme.missingRequirements.map((req, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-[11px]">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* District SCA Nodal Routing */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-[#00E5CC]/30 space-y-3">
                <span className="text-xs font-bold text-[#00E5CC] font-mono uppercase flex items-center gap-1.5">
                  <Building2 className="w-4 h-4" /> DIRECT SCA CHANNEL PARTNER ROUTING
                </span>
                <div className="space-y-1.5 text-xs text-slate-300">
                  <p className="font-semibold text-white">{selectedScheme.scaPartner.agencyName}</p>
                  <p className="text-slate-400 text-[11px]">👤 Nodal Contact: {selectedScheme.scaPartner.nodalOfficer}</p>
                  <p className="text-slate-400 text-[11px]">📍 Address: {selectedScheme.scaPartner.address}</p>
                  <p className="text-[#00E5CC] font-mono font-semibold pt-1">📞 Phone: {selectedScheme.scaPartner.contactPhone}</p>
                </div>
              </div>
            </TiltCard>
          </div>

        </div>
      </div>

    </section>
  );
}
