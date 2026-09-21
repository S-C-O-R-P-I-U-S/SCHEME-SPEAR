'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Phone, Mail, ArrowRight, CheckCircle2, Lock } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  auth: ReturnType<typeof useAuth>;
}

export default function AuthModal({ isOpen, onClose, auth }: AuthModalProps) {
  const [tab, setTab] = useState<'google' | 'phone'>('google');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    setLoading(true);
    await auth.loginWithGoogle();
    setLoading(false);
    onClose();
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length >= 10) {
      setOtpSent(true);
    }
  };

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) val = val.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    // Auto focus next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await auth.loginWithPhone(phoneNumber, otp.join(''));
    setLoading(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-md rounded-3xl bg-[#0F172A] border border-[#FFB800]/40 p-8 shadow-[0_0_50px_rgba(255,184,0,0.25)] text-white overflow-hidden"
        >
          {/* Top Neon Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FFB800] via-teal-400 to-[#FFB800]" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFB800]/10 border border-[#FFB800]/30 text-[#FFB800] text-xs font-mono mb-3">
              <ShieldCheck className="w-4 h-4" /> SECURE AUTHENTICATION
            </div>
            <h3 className="text-2xl font-bold font-heading bg-gradient-to-r from-white via-amber-100 to-[#FFB800] bg-clip-text text-transparent">
              Access SCHEME SPEAR
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Personalized AI Scheme Matching & Application Tracking
            </p>
          </div>

          {/* Tabs */}
          <div className="flex p-1 bg-slate-900/90 rounded-2xl border border-slate-800 mb-6">
            <button
              onClick={() => { setTab('google'); setOtpSent(false); }}
              className={`flex-1 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                tab === 'google'
                  ? 'bg-gradient-to-r from-[#FFB800] to-amber-500 text-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Mail className="w-4 h-4" /> Google OAuth
            </button>
            <button
              onClick={() => { setTab('phone'); setOtpSent(false); }}
              className={`flex-1 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                tab === 'phone'
                  ? 'bg-gradient-to-r from-[#00E5CC] to-teal-500 text-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Phone className="w-4 h-4" /> Phone OTP (+91)
            </button>
          </div>

          {/* Tab Content */}
          {tab === 'google' ? (
            <div className="space-y-4">
              <p className="text-xs text-slate-300 text-center leading-relaxed">
                Sign in seamlessly using your Google account to sync saved schemes, financial calculators, and application dossiers across devices.
              </p>
              <button
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full py-4 px-6 rounded-2xl bg-white text-slate-900 font-bold flex items-center justify-center gap-3 shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:bg-slate-100 active:scale-[0.98] transition-all cursor-pointer"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.29v3.15C3.26 21.3 7.31 24 12 24z" />
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.29C.47 8.2.0 10.04.0 12s.47 3.8 1.29 5.42l3.99-3.15z" />
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.58l3.99 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
                </svg>
                {loading ? 'Connecting Google...' : 'Continue with Google'}
              </button>
            </div>
          ) : (
            <div>
              {!otpSent ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      Mobile Number
                    </label>
                    <div className="flex items-center rounded-2xl bg-slate-900 border border-slate-700 focus-within:border-[#00E5CC] px-4 py-3">
                      <span className="text-[#00E5CC] font-bold font-mono mr-3">+91</span>
                      <input
                        type="tel"
                        maxLength={10}
                        placeholder="98765 43210"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                        className="bg-transparent text-white font-mono placeholder:text-slate-600 outline-none w-full text-base tracking-wider"
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={phoneNumber.length < 10}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#00E5CC] to-teal-500 text-black font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,229,204,0.4)] disabled:opacity-50 cursor-pointer"
                  >
                    Send OTP Verification <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div className="text-center">
                    <p className="text-xs text-slate-300 mb-3">
                      Enter 6-digit OTP sent to <span className="text-[#00E5CC] font-mono">+91 {phoneNumber}</span>
                    </p>
                    <div className="flex justify-center gap-2 my-4">
                      {otp.map((digit, i) => (
                        <input
                          key={i}
                          id={`otp-input-${i}`}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(i, e.target.value)}
                          className="w-11 h-12 rounded-xl bg-slate-900 border border-slate-700 text-center text-xl font-bold font-mono text-[#00E5CC] focus:border-[#00E5CC] outline-none"
                        />
                      ))}
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={loading || otp.join('').length < 6}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#FFB800] to-amber-500 text-black font-bold flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,184,0,0.4)] disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? 'Verifying...' : 'Verify OTP & Login'} <CheckCircle2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setOtpSent(false)}
                    className="w-full text-center text-xs text-slate-400 hover:text-white"
                  >
                    Change phone number
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Footer Note */}
          <div className="mt-6 pt-4 border-t border-slate-800 text-center text-[10px] text-slate-500 flex items-center justify-center gap-1.5">
            <Lock className="w-3 h-3 text-emerald-400" /> Encrypted & Compliant with Govt Data Security Norms
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
