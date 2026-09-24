'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UserCheck, ShieldCheck, ArrowRight, CheckCircle2, Sparkles, Sliders } from 'lucide-react';
import { UserProfile } from '@/lib/matchingEngine';

interface ProfileIntakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitProfile: (profile: UserProfile) => void;
  initialData?: Partial<UserProfile>;
}

export default function ProfileIntakeModal({
  isOpen,
  onClose,
  onSubmitProfile,
  initialData,
}: ProfileIntakeModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState<UserProfile>({
    name: initialData?.name || 'Sriram Suresh',
    phone: initialData?.phone || '8056992589',
    age: initialData?.age || 26,
    dob: initialData?.dob || '2000-05-15',
    caste: initialData?.caste || 'SC',
    entrepreneurStatus: initialData?.entrepreneurStatus || 'Aspiring / New Micro-Unit',
    gender: initialData?.gender || 'Male',
    lpaIncome: initialData?.lpaIncome || 2.5,
    state: initialData?.state || 'Tamil Nadu',
    district: initialData?.district || 'Chennai',
    tradeType: initialData?.tradeType || 'Food Processing & Agri Micro-Unit',
  });

  const calculateAgeFromDOB = (dobString: string): number => {
    if (!dobString) return 26;
    const dob = new Date(dobString);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return Math.max(0, age);
  };

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitProfile(formData);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[95] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl rounded-3xl bg-[#0F172A] border border-[#FFB800]/50 p-6 sm:p-10 shadow-[0_0_60px_rgba(255,184,0,0.3)] text-white my-8 overflow-hidden"
        >
          {/* Top Neon Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FFB800] via-[#00E5CC] to-[#FFB800]" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFB800]/10 border border-[#FFB800]/30 text-[#FFB800] text-xs font-mono mb-2">
              <Sparkles className="w-4 h-4" /> BENEFICIARY PROFILE INTAKE
            </div>
            <h3 className="text-2xl sm:text-3xl font-black font-heading bg-gradient-to-r from-white via-amber-100 to-[#FFB800] bg-clip-text text-transparent">
              Personalized AI Scheme Matcher
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Enter your details to generate custom NSFDC, Stand-Up India & MUDRA eligibility scoring.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 ? (
              <div className="space-y-4">
                <div className="text-xs font-mono text-[#00E5CC] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4" /> PART 1: PERSONAL & SOCIAL DEMOGRAPHICS
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sriram Suresh"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-white focus:border-[#FFB800] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number (+91)</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="8056992589"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-white focus:border-[#00E5CC] outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Age (Years)</label>
                    <input
                      type="number"
                      required
                      min={18}
                      max={75}
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-white focus:border-[#FFB800] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Date of Birth</label>
                    <input
                      type="date"
                      required
                      value={formData.dob}
                      onChange={(e) => {
                        const newDob = e.target.value;
                        const computedAge = calculateAgeFromDOB(newDob);
                        setFormData({ ...formData, dob: newDob, age: computedAge });
                      }}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-white focus:border-[#00E5CC] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Gender</label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-white focus:border-[#FFB800] outline-none"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Transgender">Transgender</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Social / Caste Category</label>
                  <select
                    value={formData.caste}
                    onChange={(e) => setFormData({ ...formData, caste: e.target.value as any })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-white focus:border-[#FFB800] outline-none font-bold text-[#FFB800]"
                  >
                    <option value="SC">Scheduled Caste (SC) - NSFDC Priority</option>
                    <option value="ST">Scheduled Tribe (ST)</option>
                    <option value="OBC">Other Backward Class (OBC)</option>
                    <option value="EWS">Economically Weaker Section (EWS)</option>
                    <option value="Differently Abled">Differently Abled (PwD)</option>
                    <option value="General">General Category</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#FFB800] to-amber-500 text-black font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  Next: Financial & Location Parameters <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-xs font-mono text-[#FFB800] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Sliders className="w-4 h-4" /> PART 2: FINANCIAL & ENTERPRISE PARAMETERS
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Entrepreneur Status</label>
                  <select
                    value={formData.entrepreneurStatus}
                    onChange={(e) => setFormData({ ...formData, entrepreneurStatus: e.target.value as any })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-white focus:border-[#00E5CC] outline-none"
                  >
                    <option value="Aspiring / New Micro-Unit">Aspiring / New Micro-Unit Setup</option>
                    <option value="Existing Micro-Entrepreneur">Existing Micro-Entrepreneur (Expansion)</option>
                    <option value="Self-Help Group (SHG) Member">Self-Help Group (SHG) Member</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Average Income (LPA in ₹ Lakhs): <span className="text-[#00E5CC] font-mono">₹{formData.lpaIncome} LPA</span>
                    </label>
                    <input
                      type="range"
                      min={0.5}
                      max={15.0}
                      step={0.5}
                      value={formData.lpaIncome}
                      onChange={(e) => setFormData({ ...formData, lpaIncome: Number(e.target.value) })}
                      className="w-full accent-[#00E5CC] cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Trade Category</label>
                    <input
                      type="text"
                      required
                      value={formData.tradeType}
                      onChange={(e) => setFormData({ ...formData, tradeType: e.target.value })}
                      placeholder="e.g. Food Processing, Handicraft, Retail"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-white focus:border-[#FFB800] outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">State</label>
                    <input
                      type="text"
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      placeholder="Tamil Nadu"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-white focus:border-[#00E5CC] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">District</label>
                    <input
                      type="text"
                      required
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      placeholder="Chennai"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-white focus:border-[#FFB800] outline-none"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-1/3 py-3.5 rounded-2xl bg-slate-800 text-slate-300 font-semibold text-xs hover:bg-slate-700"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 py-3.5 rounded-2xl bg-gradient-to-r from-[#00E5CC] to-teal-500 text-black font-extrabold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_25px_rgba(0,229,204,0.4)]"
                  >
                    Generate AI Recommendations <CheckCircle2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
