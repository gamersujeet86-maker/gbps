/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Award, CheckCircle, Flame, Star, Sparkles, Smile, ShieldCheck, Cpu } from 'lucide-react';
import { AcademicGrade } from '../types';

export default function Academics() {
  const [activeTier, setActiveTier] = useState<number>(0);

  const tiers: AcademicGrade[] = [
    {
      level: 'Early Years Foundation',
      classes: 'Nursery, LKG, UKG',
      description: 'A cheerful, activity-driven environment centered on discovery, play-based learning, sensory milestones, and building baseline motor & vocal communication skills.',
      subjects: ['Vocal Phonics & Language', 'Fun with Numbers', 'Creative Arts & Craft', 'Music & Rhythmic Dance', 'Sensory Play & Fine Motor Skills'],
      features: [
        'Interactive game-based digital smart classes.',
        'Theme-based monthly curiosity projects.',
        'Extensive range of safe puzzle toys and activity kits.',
        'Regular voice/coordination milestones reporting.'
      ]
    },
    {
      level: 'Primary School Division',
      classes: 'Class 1 to Class 5',
      description: 'Strengthening the structural foundation in analytical mathematics, sciences, read-write proficiency, and cooperative collaborative values.',
      subjects: ['English & Hindi Literacy', 'Mathematics & Logic', 'Environmental Studies (EVS)', 'Computer Literacy & Coding Basics', 'Moral Science & Civics'],
      features: [
        'Regular reading clubs and interactive spell-bees.',
        'Practical mathematics workshops with tangible tools.',
        'General Knowledge and world awareness sessions.',
        'Primary inter-house sporting events and physical training.'
      ]
    },
    {
      level: 'Middle School Excellence',
      classes: 'Class 6 to Class 8',
      description: 'Fostering deep critical thinking, scientific exploration, structured writing, advanced computer programming fundamentals, and peer leadership values.',
      subjects: ['Science (Physics, Chemistry, Biology)', 'Advanced Mathematics & Algebra', 'Social Sciences (History, Geography, Civics)', 'English Literature & Hindi Grammar', 'Sanskrit & ICT (Computer Labs)'],
      features: [
        'Equipped laboratory demonstrations for physics, chemistry, and biology.',
        'Debates, youth parliaments, and public speaking assemblies.',
        'Introduction to block-based/basic text-based programming.',
        'Leadership roles in Student Council and House systems.'
      ]
    }
  ];

  return (
    <section id="academics" className="py-16 md:py-24 bg-slate-50 relative border-b border-slate-200">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest bg-amber-100 px-3 py-1.5 rounded-full">
            Academics
          </span>
          <h3 className="text-3xl md:text-4xl font-display font-extrabold text-slate-900 tracking-tight mt-4">
            Intellectual Pathways from Nursery to Class 8
          </h3>
          <p className="text-slate-500 text-sm md:text-base mt-2">
            Our curriculum is thoughtfully mapped to balance rigorous textbook understanding with real-world smart technology applications.
          </p>
        </div>

        {/* Division Selector Toggles */}
        <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 max-w-4xl mx-auto mb-12">
          {tiers.map((tier, idx) => {
            const isActive = activeTier === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveTier(idx)}
                className={`flex-1 p-4 rounded-2xl text-center border font-display transition-all duration-300 focus:outline-none ${
                  isActive 
                    ? 'bg-slate-900 border-slate-900 text-white shadow-lg scale-[1.01]' 
                    : 'bg-white border-slate-200 text-slate-700 hover:border-amber-500 hover:bg-slate-50'
                }`}
              >
                <span className="text-[10px] font-bold uppercase text-amber-500 block mb-0.5 tracking-wider">
                  Division {idx + 1}
                </span>
                <span className="text-base font-bold block">{tier.level}</span>
                <span className={`text-xs mt-1 block font-mono ${isActive ? 'text-amber-400' : 'text-slate-400'}`}>
                  {tier.classes}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Division Board */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTier}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.25 }}
            className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 max-w-6xl mx-auto"
          >
            {/* Left Wing - Philosophy & Details */}
            <div className="p-8 lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-bold text-amber-600 tracking-wider font-mono">
                  Curriculum Overview • {tiers[activeTier].classes}
                </span>
                <h4 className="text-2xl md:text-3xl font-display font-extrabold text-slate-900 mt-1">
                  {tiers[activeTier].level}
                </h4>
              </div>

              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                {tiers[activeTier].description}
              </p>

              {/* Core Features list */}
              <div className="space-y-3">
                <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Division Features</h5>
                <div className="space-y-2.5">
                  {tiers[activeTier].features.map((feature, idx) => (
                    <div key={idx} className="flex gap-3 items-start">
                      <div className="p-1 bg-amber-100 text-amber-700 rounded-full shrink-0 mt-0.5">
                        <CheckCircle className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs sm:text-sm text-slate-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Wing - Subjects List */}
            <div className="bg-slate-900 text-white p-8 lg:col-span-5 flex flex-col justify-between relative overflow-hidden">
              {/* background highlights */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl"></div>

              <div className="space-y-6 relative">
                <div>
                  <h5 className="text-xs font-bold text-amber-500 uppercase tracking-widest">Curriculum Pillars</h5>
                  <h4 className="text-lg font-bold font-display text-white mt-1">Primary Subjects Taught</h4>
                </div>

                <div className="space-y-2">
                  {tiers[activeTier].subjects.map((sub, idx) => (
                    <div key={idx} className="flex items-center gap-3 py-2 border-b border-slate-800 last:border-0 hover:bg-slate-800/30 px-2 rounded-lg transition-all">
                      <span className="text-xs font-mono text-amber-500 font-bold w-5">0{idx + 1}</span>
                      <span className="text-sm font-semibold text-slate-200">{sub}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Admission prompt overlay inside academics */}
              <div className="mt-8 pt-6 border-t border-slate-800 flex justify-between items-center relative">
                <div>
                  <span className="text-[10px] text-amber-400 font-black uppercase tracking-wider block">Intake Capacity</span>
                  <span className="text-xs text-slate-400">Strictly 25 seats per section</span>
                </div>
                <a
                  href="#admissions"
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-extrabold shadow-md transition-all"
                >
                  Apply Online
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
