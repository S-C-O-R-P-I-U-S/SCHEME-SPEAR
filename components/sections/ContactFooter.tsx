'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Zap, CheckCircle, Github, Linkedin, Twitter } from 'lucide-react';
import { SITE_DATA } from '@/lib/constants';
import MagneticButton from '../ui/MagneticButton';

export default function ContactFooter() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <footer id="contact" className="relative z-10 pt-24 pb-12 bg-slate-950 border-t border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Contact Header & Interactive Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          
          {/* Left Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FFB800] to-[#00E5CC] p-0.5 shadow-lg">
                <div className="w-full h-full bg-[#0A0E1A] rounded-[10px] flex items-center justify-center">
                  <Zap className="w-5 h-5 text-[#FFB800]" />
                </div>
              </div>
              <span className="font-extrabold font-heading text-xl bg-gradient-to-r from-white to-[#FFB800] bg-clip-text text-transparent">
                SCHEME SPEAR
              </span>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed">
              {SITE_DATA.contact.org} Empowering marginalized micro-entrepreneurs across India with AI-driven scheme matching and financial clarity.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-300">
                <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-[#FFB800]">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-500 block">SUPPORT EMAIL</span>
                  <a href={`mailto:${SITE_DATA.contact.email}`} className="hover:text-[#FFB800] font-semibold transition-colors">
                    {SITE_DATA.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-300">
                <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-[#00E5CC]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-500 block">HELPLINE / PHONE</span>
                  <a href={`tel:${SITE_DATA.contact.phone.replace(/\s+/g, '')}`} className="hover:text-[#00E5CC] font-semibold transition-colors">
                    {SITE_DATA.contact.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-300">
                <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-500 block">HACKATHON HEADQUARTERS</span>
                  <span className="font-semibold text-slate-200">Smart India Hackathon 2026 • SCORPIUS Node</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-4">
              <a href="#" className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-[#FFB800] flex items-center justify-center text-slate-400 hover:text-[#FFB800] transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-[#00E5CC] flex items-center justify-center text-slate-400 hover:text-[#00E5CC] transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-400 flex items-center justify-center text-slate-400 hover:text-amber-400 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Interactive Message Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-8 backdrop-blur-xl shadow-2xl">
              <h3 className="text-xl font-bold font-heading text-white mb-2">
                Connect with Team SCORPIUS
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Have questions regarding scheme integrations, channel partner onboarding, or trial demos?
              </p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2"
                >
                  <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="text-base font-bold text-emerald-300">Message Received!</h4>
                  <p className="text-xs text-slate-300">
                    Thank you for reaching out. Team SCORPIUS will get back to you shortly.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Sriram Suresh"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white placeholder:text-slate-600 focus:border-[#FFB800] outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="sriramsuresh.tech@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white placeholder:text-slate-600 focus:border-[#00E5CC] outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Message / Inquiry</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Write your inquiry regarding PS26092..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-600 focus:border-[#FFB800] outline-none transition-colors"
                    />
                  </div>

                  <MagneticButton variant="gold" className="w-full">
                    Send Message <Send className="w-4 h-4 ml-1" />
                  </MagneticButton>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono gap-4">
          <div>
            © 2026 <strong className="text-white">SCORPIUS</strong>. Smart India Hackathon 2026 Project (PS26092).
          </div>
          <div className="flex items-center gap-6">
            <a href="#hero" className="hover:text-[#FFB800] transition-colors">Back to Top ↑</a>
            <a href="#" className="hover:text-[#00E5CC] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-amber-400 transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
