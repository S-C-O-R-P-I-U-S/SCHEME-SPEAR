'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Zap, ShieldCheck, Mail, Phone, ArrowLeft, ArrowRight, CheckCircle2, Lock } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function AuthPage() {
  const auth = useAuth();
  const [tab, setTab] = useState<'google' | 'phone'>('google');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    await auth.loginWithGoogle();
    setLoading(false);
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

    if (val && index < 5) {
      document.getElementById(`dedicated-otp-${index + 1}`)?.focus();
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await auth.loginWithPhone(phoneNumber, otp.join(''));
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-white flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#FFB800]/15 to-[#00E5CC]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Back to Home Button */}
      <Link
        href="/"
        className="absolute top-6 left-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to SCHEME SPEAR
      </Link>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-lg rounded-3xl bg-[#0F172A]/90 border border-[#FFB800]/40 p-8 sm:p-10 backdrop-blur-2xl shadow-[0_0_60px_rgba(255,184,0,0.25)] text-white"
      >
        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FFB800] via-teal-400 to-[#FFB800] rounded-t-3xl" />

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#FFB800] to-[#00E5CC] p-0.5 shadow-[0_0_25px_rgba(255,184,0,0.5)]">
            <div className="w-full h-full bg-[#0A0E1A] rounded-[14px] flex items-center justify-center">
              <Zap className="w-7 h-7 text-[#FFB800]" />
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFB800]/10 border border-[#FFB800]/30 text-[#FFB800] text-xs font-mono mb-2">
            <ShieldCheck className="w-4 h-4" /> OFFICIAL PORTAL AUTH
          </span>
          <h1 className="text-3xl font-extrabold font-heading text-white">
            SCHEME SPEAR Login
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Team SCORPIUS • Smart India Hackathon 2026 (PS26092)
          </p>
        </div>

        {/* Logged in state display */}
        {auth.user ? (
          <div className="text-center space-y-4 p-6 rounded-2xl bg-slate-900 border border-slate-800">
            <img
              src={auth.user.avatar}
              alt={auth.user.name}
              className="w-16 h-16 rounded-full border-2 border-[#FFB800] mx-auto shadow-md"
            />
            <div>
              <h3 className="text-lg font-bold text-white">{auth.user.name}</h3>
              <p className="text-xs text-slate-400 font-mono">
                {auth.user.email || auth.user.phone}
              </p>
            </div>
            <div className="pt-2 flex items-center justify-center gap-3">
              <Link
                href="/"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FFB800] to-amber-500 text-black font-bold text-xs"
              >
                Go to Dashboard
              </Link>
              <button
                onClick={auth.logout}
                className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs hover:bg-slate-700"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Login Tabs */}
            <div className="flex p-1 bg-slate-900/90 rounded-2xl border border-slate-800 mb-6">
              <button
                onClick={() => { setTab('google'); setOtpSent(false); }}
                className={`flex-1 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  tab === 'google'
                    ? 'bg-gradient-to-r from-[#FFB800] to-amber-500 text-black shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Mail className="w-4 h-4" /> Google OAuth
              </button>
              <button
                onClick={() => { setTab('phone'); setOtpSent(false); }}
                className={`flex-1 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  tab === 'phone'
                    ? 'bg-gradient-to-r from-[#00E5CC] to-teal-500 text-black shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Phone className="w-4 h-4" /> Phone OTP (+91)
              </button>
            </div>

            {/* Tab Forms */}
            {tab === 'google' ? (
              <div className="space-y-4">
                <button
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="w-full py-4 px-6 rounded-2xl bg-white text-slate-900 font-bold flex items-center justify-center gap-3 shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:bg-slate-100 transition-all cursor-pointer"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.29v3.15C3.26 21.3 7.31 24 12 24z" />
                    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.29C.47 8.2.0 10.04.0 12s.47 3.8 1.29 5.42l3.99-3.15z" />
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.58l3.99 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
                  </svg>
                  {loading ? 'Authenticating...' : 'Sign In with Google'}
                </button>
              </div>
            ) : (
              <div>
                {!otpSent ? (
                  <form onSubmit={handleSendOtp} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-2">
                        Mobile Number (+91 India)
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
                      Request OTP Code <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-4">
                    <div className="text-center">
                      <p className="text-xs text-slate-300 mb-3">
                        Enter 6-digit OTP code sent to <span className="text-[#00E5CC] font-mono">+91 {phoneNumber}</span>
                      </p>
                      <div className="flex justify-center gap-2 my-4">
                        {otp.map((digit, i) => (
                          <input
                            key={i}
                            id={`dedicated-otp-${i}`}
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
                      {loading ? 'Verifying...' : 'Submit & Authorize'} <CheckCircle2 className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            )}
          </>
        )}

        <div className="mt-8 pt-4 border-t border-slate-800 text-center text-[10px] text-slate-500 flex items-center justify-center gap-1.5">
          <Lock className="w-3 h-3 text-emerald-400" /> Powered by SCORPIUS Security Architecture
        </div>
      </motion.div>
    </div>
  );
}
