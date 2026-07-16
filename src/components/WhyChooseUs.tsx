/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Monitor, Heart, ShieldAlert, Trophy, Shield, HelpCircle, ChevronRight, Check } from 'lucide-react';

interface ValueCard {
  id: string;
  title: string;
  icon: React.ReactNode;
  summary: string;
  details: string[];
  color: string;
  badge: string;
}

export default function WhyChooseUs() {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const pillars: ValueCard[] = [
    {
      id: 'faculty',
      title: 'Experienced & Caring Faculty',
      icon: <Users className="w-8 h-8" />,
      summary: 'Compassionate, highly-trained educators dedicated to building confidence and academic excellence.',
      details: [
        'Over 10+ years of average teaching experience per faculty member.',
        'Regular teacher training workshops focusing on modern child psychology.',
        'Extremely low teacher-to-student ratios to ensure direct personalized supervision.',
        'Individual counseling sessions to support student emotional wellness.'
      ],
      color: 'from-blue-500 to-indigo-600',
      badge: 'Expert Team'
    },
    {
      id: 'smart-classrooms',
      title: 'Smart Classrooms',
      icon: <Monitor className="w-8 h-8" />,
      summary: 'Equipped with digital interactive projection screens, computers, and visual aids for interactive learning.',
      details: [
        'Multimedia lessons incorporating 3D models and conceptual animations.',
        'Digital boards allowing students to solve complex problems in real-time.',
        'Tech-assisted learning kits for science and mathematics experiments.',
        'Audio-visual setups for virtual tours and interactive educational games.'
      ],
      color: 'from-amber-500 to-orange-600',
      badge: 'Modern Tech'
    },
    {
      id: 'holistic',
      title: 'Focus on Holistic Development',
      icon: <Heart className="w-8 h-8" />,
      summary: 'Nurturing academic, artistic, athletic, and moral traits to raise well-rounded citizens.',
      details: [
        'Character education integrating life values like empathy, discipline, and grit.',
        'Public speaking classes, poetry recitations, and debate clubs.',
        'Critical thinking workshops replacing passive memorization with question-first methodologies.',
        'Social responsibilities and community clean-up participation.'
      ],
      color: 'from-purple-500 to-pink-600',
      badge: 'All-Round Growth'
    },
    {
      id: 'safety',
      title: 'Safe & Secure Campus',
      icon: <Shield className="w-8 h-8" />,
      summary: 'Comprehensive security guards, constant perimeter CCTV monitoring, and child protection protocols.',
      details: [
        '24/7 guarded main entrances with rigid guest verification checks.',
        'Comprehensive CCTV camera network across corridors, playgrounds, and gates.',
        'Mandatory fire safety equipment, first-aid stations, and clean drinking water filtration systems.',
        'Strict anti-bullying and anti-harassment code of conduct strictly monitored.'
      ],
      color: 'from-emerald-500 to-teal-600',
      badge: 'Zero-Risk Zone'
    },
    {
      id: 'activities',
      title: 'Co-curricular Activities',
      icon: <Trophy className="w-8 h-8" />,
      summary: 'Exciting programs in music, fine arts, sports, science fairs, and stage performances.',
      details: [
        'Regular inter-house sports competitions including athletics, badminton, and chess.',
        'Annual cultural programs showcasing drama, classical/modern dance, and vocal choirs.',
        'In-house science, art, and craft exhibitions promoting student creations.',
        'Creative hobby clubs including pottery, origami, and environmental science.'
      ],
      color: 'from-rose-500 to-red-600',
      badge: 'Unlock Talents'
    }
  ];

  return (
    <section id="why-choose-us" className="py-16 md:py-24 bg-white relative">
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-slate-50 to-white"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest bg-amber-100 px-3 py-1.5 rounded-full">
            Our Pillars
          </span>
          <h3 className="text-3xl md:text-4xl font-display font-extrabold text-slate-900 tracking-tight mt-4">
            Why Choose Gyan Bharti Public School?
          </h3>
          <p className="text-slate-500 text-sm md:text-base mt-2">
            We deliver the ideal balance of interactive digital capabilities and disciplined character development to establish a solid life foundation.
          </p>
        </div>

        {/* 5-Column / Custom Grid for Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.id}
              onClick={() => setSelectedCard(selectedCard === pillar.id ? null : pillar.id)}
              className={`cursor-pointer rounded-2xl border transition-all duration-300 p-5 flex flex-col justify-between group ${
                selectedCard === pillar.id 
                  ? 'bg-slate-900 border-slate-900 text-white shadow-2xl scale-[1.02] lg:col-span-2' 
                  : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-white hover:border-amber-500 hover:shadow-lg'
              }`}
              layout
            >
              <div className="space-y-4">
                {/* Badge & Step indicator */}
                <div className="flex justify-between items-center">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                    selectedCard === pillar.id ? 'bg-amber-500 text-slate-950' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {pillar.badge}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-400">0{idx + 1}</span>
                </div>

                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center shadow-inner ${
                  selectedCard === pillar.id 
                    ? 'bg-gradient-to-br from-amber-400 to-amber-500 text-slate-900' 
                    : `bg-gradient-to-br ${pillar.color} text-white`
                }`}>
                  {pillar.icon}
                </div>

                {/* Title */}
                <h4 className="text-lg font-bold font-display leading-tight group-hover:text-amber-600 transition-colors">
                  {pillar.title}
                </h4>

                {/* Summary Description */}
                <p className={`text-xs leading-relaxed ${
                  selectedCard === pillar.id ? 'text-slate-300' : 'text-slate-500'
                }`}>
                  {pillar.summary}
                </p>
              </div>

              {/* Action indicators */}
              <div className="pt-4 border-t border-slate-200/10 mt-4 flex items-center justify-between text-xs font-bold">
                <span className={selectedCard === pillar.id ? 'text-amber-400' : 'text-slate-400 group-hover:text-amber-600'}>
                  {selectedCard === pillar.id ? 'Click to minimize' : 'Read details'}
                </span>
                <ChevronRight className={`w-4 h-4 transition-transform ${
                  selectedCard === pillar.id ? 'rotate-90 text-amber-400' : 'text-slate-400 group-hover:text-amber-600'
                }`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Selected Card Deep Dive Section */}
        <AnimatePresence mode="wait">
          {selectedCard && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="mt-8 p-6 md:p-8 bg-slate-900 text-white rounded-3xl border border-slate-800 shadow-xl"
            >
              {(() => {
                const activePillar = pillars.find(p => p.id === selectedCard);
                if (!activePillar) return null;
                return (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    <div className="md:col-span-4 space-y-3">
                      <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">Pillar Focus</span>
                      <h4 className="text-2xl font-display font-extrabold text-white">{activePillar.title}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{activePillar.summary}</p>
                    </div>
                    <div className="md:col-span-8">
                      <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Core Commitments & Quality Standards</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {activePillar.details.map((detail, index) => (
                          <div key={index} className="flex gap-2.5 bg-slate-800/40 p-3 rounded-xl border border-slate-800/80 items-start">
                            <div className="p-1 bg-amber-500/10 text-amber-500 rounded-md shrink-0 mt-0.5">
                              <Check className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-xs text-slate-300 leading-relaxed">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Extra Info Banner */}
        <div className="mt-12 bg-gradient-to-r from-amber-500/10 to-amber-600/5 rounded-2xl border border-amber-500/20 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex gap-3 items-center">
            <div className="p-2.5 bg-amber-500/20 text-amber-700 rounded-xl hidden sm:block shrink-0">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Dedicated to Excellence</h4>
              <p className="text-xs text-slate-500 mt-0.5">Our holistic educational standard empowers young minds to think independently and lead responsibly.</p>
            </div>
          </div>
          <a
            href="#admissions"
            className="w-full md:w-auto text-center px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs shadow transition-colors"
          >
            Schedule a School Visit
          </a>
        </div>

      </div>
    </section>
  );
}
