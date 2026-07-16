/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Mail, Clock, ShieldAlert, ChevronDown, Compass, Bus, Info, CheckCircle } from 'lucide-react';
import { FAQItem } from '../types';

export default function Contact() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [transportMode, setTransportMode] = useState<'bus' | 'car' | 'walk'>('car');

  const faqs: FAQItem[] = [
    {
      category: 'Admissions',
      question: 'What is the age criteria for Nursery admission?',
      answer: 'Children must be at least 3 years old as of March 31 of the academic session year they are registering for.'
    },
    {
      category: 'Admissions',
      question: 'What documents are required during physical registration?',
      answer: 'Required documents are: (1) Copy of Child’s Birth Certificate, (2) Aadhaar Cards of child & parents, (3) 4 passport size photos of child, (4) Past class reports (if applying for Class 1 to 8), and (5) Transfer Certificate from the previous school.'
    },
    {
      category: 'Academics',
      question: 'Are smart classroom sessions included in the standard school fees?',
      answer: 'Yes! Our digital Smart Classrooms are a core structural feature of the Gyan Bharti learning infrastructure. Interactive projection and visual syllabus lessons are fully integrated for all classes without separate charges.'
    },
    {
      category: 'Facilities',
      question: 'Is transport available for Samaypur and nearby colonies?',
      answer: 'Yes, we operate supervised transport buses across Samaypur, Ballabhgarh, Rajeev Colony, and neighboring blocks. All buses have experienced drivers and companion guards.'
    },
    {
      category: 'General',
      question: 'What are the school operational hours?',
      answer: 'Our general timing is: (1) Nursery to UKG: 08:30 AM to 12:30 PM, (2) Class 1 to 8: 08:00 AM to 02:00 PM (Monday through Saturday, closed on 2nd Saturdays).'
    }
  ];

  const travelEstimates = {
    car: { samaypur: '3 mins', ballabhgarhMetro: '12 mins', sector2: '8 mins' },
    bus: { samaypur: '5 mins', ballabhgarhMetro: '15 mins', sector2: '10 mins' },
    walk: { samaypur: '8 mins', ballabhgarhMetro: '45 mins', sector2: '28 mins' }
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-slate-50 relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest bg-amber-100 px-3 py-1.5 rounded-full">
            Connect With Us
          </span>
          <h3 className="text-3xl md:text-4xl font-display font-extrabold text-slate-900 tracking-tight mt-4">
            Contact & Location Details
          </h3>
          <p className="text-slate-500 text-sm md:text-base mt-2">
            Visit our friendly school campus in Samaypur, Ballabhgarh, or reach out to our administration desk directly via call or email.
          </p>
        </div>

        {/* Contact info grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* Left Block - Cards */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              
              {/* Address Card */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 flex gap-4 items-start shadow-sm">
                <div className="p-3 bg-amber-100 text-amber-700 rounded-xl shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">Campus Address</h4>
                  <p className="text-sm font-bold text-slate-900 mt-1">Near Pandit Chowk,</p>
                  <p className="text-xs text-slate-600">Rajeev Colony, Samaypur,</p>
                  <p className="text-xs text-slate-600">Ballabhgarh, Pin - 121004</p>
                </div>
              </div>

              {/* Call Card */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 flex gap-4 items-start shadow-sm">
                <div className="p-3 bg-amber-100 text-amber-700 rounded-xl shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">Phone Lines</h4>
                  <div className="mt-1 space-y-0.5">
                    <a href="tel:8447061133" className="block text-sm font-bold text-slate-900 hover:text-amber-600 transition-colors font-mono">
                      8447061133
                    </a>
                    <a href="tel:9711771815" className="block text-sm font-bold text-slate-900 hover:text-amber-600 transition-colors font-mono">
                      9711771815
                    </a>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">Timing: 08:00 AM - 03:00 PM</p>
                </div>
              </div>

              {/* Email Card */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 flex gap-4 items-start shadow-sm">
                <div className="p-3 bg-amber-100 text-amber-700 rounded-xl shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">Official Email</h4>
                  <a href="mailto:edu.gyanbharti23@gmail.com" className="block text-sm font-bold text-slate-900 hover:text-amber-600 transition-colors font-mono mt-1 break-all">
                    edu.gyanbharti23@gmail.com
                  </a>
                  <p className="text-[10px] text-slate-400 mt-1">Submit attachments and transfer files here</p>
                </div>
              </div>

            </div>

            {/* School Office Hours */}
            <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 space-y-3 shadow">
              <div className="flex gap-2 items-center text-amber-500">
                <Clock className="w-4 h-4" />
                <h5 className="text-xs font-bold uppercase tracking-widest">Office Timings</h5>
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between border-b border-slate-800 pb-1">
                  <span className="text-slate-400">Monday - Friday:</span>
                  <span className="font-bold text-slate-200">08:00 AM - 02:00 PM</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1">
                  <span className="text-slate-400">Saturdays (except 2nd):</span>
                  <span className="font-bold text-slate-200">08:00 AM - 01:00 PM</span>
                </div>
                <div className="flex justify-between text-amber-400 font-bold">
                  <span>Sundays:</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Block - Simulated Map & Directions Router Widget */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 shadow-xl flex flex-col justify-between overflow-hidden relative">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl"></div>

            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Compass className="w-5 h-5 text-amber-600" />
                  <h4 className="text-sm font-bold text-slate-900">Interactive Location Router</h4>
                </div>
                <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  Near Pandit Chowk
                </span>
              </div>

              {/* Vector Mock Map */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl h-52 relative overflow-hidden flex items-center justify-center">
                
                {/* Styled Roads representation */}
                <div className="absolute inset-0 opacity-15">
                  <div className="absolute w-full h-1 bg-slate-900 top-1/4"></div>
                  <div className="absolute w-full h-1 bg-slate-900 top-3/4"></div>
                  <div className="absolute h-full w-1 bg-slate-900 left-1/3"></div>
                  <div className="absolute h-full w-1 bg-slate-900 left-2/3"></div>
                  <div className="absolute w-full h-1 bg-slate-900 top-1/2 rotate-12"></div>
                </div>

                {/* Landmarks dots */}
                <div className="absolute top-1/4 left-1/4 flex flex-col items-center">
                  <span className="w-2.5 h-2.5 bg-slate-400 rounded-full"></span>
                  <span className="text-[9px] text-slate-400 font-bold mt-1 font-mono">Ballabhgarh Metro</span>
                </div>

                <div className="absolute bottom-1/4 left-2/3 flex flex-col items-center">
                  <span className="w-2.5 h-2.5 bg-slate-400 rounded-full"></span>
                  <span className="text-[9px] text-slate-400 font-bold mt-1 font-mono">Sector-2 Market</span>
                </div>

                {/* Pandit Chowk Landmark */}
                <div className="absolute top-1/2 left-1/3 -translate-x-1/2 flex flex-col items-center">
                  <span className="w-3.5 h-3.5 bg-amber-500 rounded-full border-2 border-white shadow-md"></span>
                  <span className="text-[9px] text-amber-700 font-extrabold mt-1 font-mono bg-amber-100 px-1.5 py-0.5 rounded border border-amber-300">
                    Pandit Chowk
                  </span>
                </div>

                {/* THE SCHOOL BADGE PIN - HIGHLIGHTED */}
                <div className="absolute top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                  <motion.div 
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                    className="relative flex items-center justify-center w-10 h-10 rounded-full bg-slate-900 text-amber-500 border-2 border-amber-500 shadow-xl"
                  >
                    <MapPin className="w-5 h-5 fill-amber-500 text-slate-950" />
                  </motion.div>
                  <span className="text-[10px] font-black text-slate-900 bg-white px-2 py-0.5 rounded shadow border border-slate-200 mt-1 uppercase tracking-tight">
                    Gyan Bharti School
                  </span>
                </div>

                {/* Grid dots watermark */}
                <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
              </div>

              {/* Transit Estimator Selector */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-bold">Transit Calculator:</span>
                  <div className="flex gap-1">
                    <button 
                      onClick={() => setTransportMode('car')}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${transportMode === 'car' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                    >
                      Private Car
                    </button>
                    <button 
                      onClick={() => setTransportMode('bus')}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${transportMode === 'bus' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                    >
                      School Bus
                    </button>
                    <button 
                      onClick={() => setTransportMode('walk')}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${transportMode === 'walk' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                    >
                      Walking
                    </button>
                  </div>
                </div>

                {/* Travel Estimates Ledger */}
                <div className="grid grid-cols-3 gap-3 bg-slate-50 border border-slate-200 rounded-xl p-3 text-center">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-bold">From Samaypur</span>
                    <span className="text-xs font-extrabold text-slate-800 font-mono mt-0.5 block">{travelEstimates[transportMode].samaypur}</span>
                  </div>
                  <div className="border-x border-slate-200">
                    <span className="text-[10px] text-slate-400 block font-bold">From Sect-2 Market</span>
                    <span className="text-xs font-extrabold text-slate-800 font-mono mt-0.5 block">{travelEstimates[transportMode].sector2}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-bold">From Metro Station</span>
                    <span className="text-xs font-extrabold text-slate-800 font-mono mt-0.5 block">{travelEstimates[transportMode].ballabhgarhMetro}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500 flex gap-2 items-start">
              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p>
                <strong>Landmark Guide:</strong> Turn inside the lane right adjacent to Pandit Chowk, cross the water post, and Gyan Bharti Public School is visible straight ahead in the first corner.
              </p>
            </div>

          </div>

        </div>

        {/* FAQs Section */}
        <div className="mt-20 max-w-4xl mx-auto space-y-6">
          <div className="text-center">
            <h4 className="text-xl md:text-2xl font-display font-extrabold text-slate-900">
              Frequently Asked Questions (FAQ)
            </h4>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">General solutions for admissions and facilities inquiries</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full text-left p-5 flex justify-between items-center gap-4 hover:bg-slate-50 transition-colors focus:outline-none"
                  >
                    <div className="flex gap-3 items-center">
                      <span className="text-[9px] font-bold uppercase font-mono bg-amber-100 text-amber-800 px-2 py-0.5 rounded shrink-0">
                        {faq.category}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-slate-800">{faq.question}</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-amber-600' : ''}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="overflow-hidden bg-slate-50 border-t border-slate-150"
                      >
                        <div className="p-5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
