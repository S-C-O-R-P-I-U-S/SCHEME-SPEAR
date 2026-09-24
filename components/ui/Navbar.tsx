'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, LogIn, Menu, X, LogOut, Sliders } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import Avatar from './Avatar';

const navLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'My Profile', href: '#profile-dashboard-section' },
  { name: '3,500+ Schemes', href: '#scheme-search-section' },
  { name: 'Features', href: '#features' },
  { name: 'How It Works', href: '#how-it-works' },
  { name: 'Architecture', href: '#architecture' },
  { name: 'Feasibility', href: '#feasibility' },
  { name: 'Impact', href: '#impact' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar({ auth }: { auth: ReturnType<typeof useAuth> }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0A0E1A]/85 backdrop-blur-xl border-b border-amber-500/20 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FFB800] to-[#00E5CC] p-0.5 shadow-[0_0_20px_rgba(255,184,0,0.5)] group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#0A0E1A] rounded-[10px] flex items-center justify-center">
              <Zap className="w-5 h-5 text-[#FFB800] group-hover:rotate-12 transition-transform" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold font-heading text-lg tracking-tight bg-gradient-to-r from-white via-amber-200 to-[#FFB800] bg-clip-text text-transparent">
                SCHEME SPEAR
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#FFB800]/20 text-[#FFB800] border border-[#FFB800]/40">
                3,500+ INDEX
              </span>
            </div>
            <p className="text-[10px] font-mono text-slate-400 tracking-wider">BY TEAM SCORPIUS</p>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden xl:flex items-center gap-1 px-4 py-1.5 rounded-full bg-slate-900/60 backdrop-blur-md border border-slate-800">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-[#FFB800] hover:bg-slate-800/80 rounded-full transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right CTA / Auth & Profile Button */}
        <div className="flex items-center gap-3">
          {auth.user ? (
            <div className="flex items-center gap-2.5 bg-slate-900/90 border border-slate-700/80 pl-2 pr-3 py-1.5 rounded-2xl shadow-lg">
              <Avatar name={auth.user.name} size="sm" />
              <span className="text-xs font-semibold text-white max-w-[110px] truncate">
                {auth.user.name}
              </span>
              <button
                onClick={auth.openIntakeModal}
                title="Edit Beneficiary Profile Intake"
                className="p-1 rounded-lg text-slate-400 hover:text-[#00E5CC] hover:bg-slate-800 transition-colors"
              >
                <Sliders className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={auth.logout}
                title="Logout"
                className="p-1 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={auth.openAuthModal}
              className="relative group px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#FFB800] to-amber-500 text-black font-bold text-xs flex items-center gap-2 shadow-[0_0_20px_rgba(255,184,0,0.35)] hover:shadow-[0_0_30px_rgba(255,184,0,0.6)] hover:scale-105 transition-all cursor-pointer"
            >
              <LogIn className="w-4 h-4" /> Login
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-[#0A0E1A]/95 backdrop-blur-2xl border-b border-slate-800 overflow-hidden"
          >
            <div className="px-6 py-6 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-300 hover:text-[#FFB800] hover:bg-slate-900"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
