/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, ArrowRight, ShieldCheck, Cpu, Calendar, Star, Sparkles } from 'lucide-react';

interface HeroProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function Hero({ onScrollToSection }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  return (
    <section id="home" className="relative bg-gradient-to-b from-amber-500/10 via-white to-slate-50 py-12 md:py-20 lg:py-24 overflow-hidden border-b border-slate-200">
      {/* Decorative vector background assets */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content */}
          <motion.div 
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Admissions Badge */}
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-100 text-amber-800 rounded-full text-xs font-bold border border-amber-300 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin" />
              <span>Session 2026-27 Admissions Open</span>
            </motion.div>

            {/* Main Title */}
            <motion.h2 
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-slate-900 tracking-tight leading-tight"
            >
              Shaping Minds... <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-700">
                Building Futures...
              </span>
            </motion.h2>

            {/* School Motto Strip */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center justify-center lg:justify-start gap-3 text-slate-500 text-xs sm:text-sm font-semibold tracking-wider uppercase bg-slate-100 py-2 px-4 rounded-xl border border-slate-200 w-fit mx-auto lg:mx-0"
            >
              <span>Discipline</span>
              <span className="text-amber-500 font-bold">•</span>
              <span>Education</span>
              <span className="text-amber-500 font-bold">•</span>
              <span>Excellence</span>
            </motion.div>

            {/* Paragraph Description */}
            <motion.p 
              variants={itemVariants}
              className="text-slate-600 text-base md:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Welcome to <strong>Gyan Bharti Public School</strong>, where we foster a supportive, smart, and safe environment for critical thinking and moral excellence. Now enrolling students from <strong>Nursery to Class 8</strong>.
            </motion.p>

            {/* Key Quick Bullet Points from Poster */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2"
            >
              <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm">
                <GraduationCap className="w-5 h-5 text-amber-600 shrink-0" />
                <span className="text-xs font-bold text-slate-700">Nursery to Class 8</span>
              </div>
              <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm">
                <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
                <span className="text-xs font-bold text-slate-700">Safe & Secure</span>
              </div>
              <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm col-span-2 sm:col-span-1">
                <Cpu className="w-5 h-5 text-amber-600 shrink-0" />
                <span className="text-xs font-bold text-slate-700">Smart Classrooms</span>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4"
            >
              <button 
                onClick={() => onScrollToSection('admissions')}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
              >
                Enroll Today <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>
              <button 
                onClick={() => onScrollToSection('why-choose-us')}
                className="w-full sm:w-auto px-8 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-bold rounded-xl border border-slate-200 shadow-sm hover:shadow transition-all flex items-center justify-center gap-1"
              >
                Why Choose Us
              </button>
            </motion.div>
          </motion.div>

          {/* Graphical Banner Block */}
          <motion.div 
            className="lg:col-span-5 relative flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', duration: 0.8 }}
          >
            {/* The main visual box representing the poster mockup elements */}
            <div className="relative w-full max-w-md bg-slate-900 text-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-slate-800 overflow-hidden">
              
              {/* Graphic background highlights */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl"></div>

              {/* Poster Stamp / Badge */}
              <div className="absolute top-4 right-4 bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md z-10 animate-bounce">
                Limited Seats!
              </div>

              {/* Poster Title Accent */}
              <div className="border-b border-slate-800 pb-4 mb-6">
                <div className="flex items-center gap-2 text-amber-500 mb-1">
                  <Star className="w-4 h-4 fill-amber-500" />
                  <span className="text-xs font-bold tracking-widest uppercase">Gyan Bharti Advantage</span>
                </div>
                <h3 className="text-2xl font-display font-extrabold tracking-tight">
                  Admissions Open 2026-27
                </h3>
                <p className="text-xs text-slate-400 mt-1">Nursery to Class 8 • Ballabhgarh</p>
              </div>

              {/* Bullet details in layout style */}
              <div className="space-y-4">
                <div className="flex gap-3 items-start bg-slate-800/40 p-3 rounded-xl border border-slate-800">
                  <div className="p-2 bg-amber-500/10 text-amber-500 rounded-lg shrink-0">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Interactive Curriculum</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Focusing on critical thinking, conceptual clarity, and self-discipline.</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start bg-slate-800/40 p-3 rounded-xl border border-slate-800">
                  <div className="p-2 bg-amber-500/10 text-amber-500 rounded-lg shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Flexible Intake</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Quick diagnostic reviews and responsive class onboarding for kids.</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start bg-slate-800/40 p-3 rounded-xl border border-slate-800">
                  <div className="p-2 bg-amber-500/10 text-amber-500 rounded-lg shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Safe & Smart Infrastructure</h4>
                    <p className="text-xs text-slate-400 mt-0.5">CCTV monitored corridors with technology-aided multi-sensory classrooms.</p>
                  </div>
                </div>
              </div>

              {/* Custom Poster Quote */}
              <div className="mt-6 pt-4 border-t border-slate-800 text-center">
                <span className="text-[11px] font-mono text-amber-500 block italic">
                  "Enroll Today for a Bright Tomorrow!"
                </span>
              </div>
            </div>

            {/* Extra overlapping mini card */}
            <div className="absolute -bottom-4 -right-4 bg-white text-slate-900 px-4 py-3 rounded-2xl shadow-xl border border-slate-200 flex items-center gap-3 hidden sm:flex max-w-[200px]">
              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping"></div>
              <div>
                <p className="text-xs font-black text-slate-950">Inquiries Received</p>
                <p className="text-[10px] text-slate-500">Reviews in Progress</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
