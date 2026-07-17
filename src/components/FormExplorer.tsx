/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ClipboardList, User, Phone, Mail, Clock, Calendar, 
  Search, Trash2, ShieldAlert, Sparkles, X, ChevronRight, 
  ArrowRight, CheckCircle, Database, HelpCircle, Eye, SlidersHorizontal
} from 'lucide-react';
import { SchoolInquiry } from '../types';
import { useApp } from '../context/AppContext';

interface FormExplorerProps {
  savedInquiries: SchoolInquiry[];
  onDeleteInquiry: (id: string) => void;
  onAddDemoInquiries: () => void;
}

export default function FormExplorer({ savedInquiries, onDeleteInquiry, onAddDemoInquiries }: FormExplorerProps) {
  const { currentUser, updateInquiryStatus } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClassFilter, setSelectedClassFilter] = useState('All');
  const [selectedInquiry, setSelectedInquiry] = useState<SchoolInquiry | null>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  
  const scrollerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll animation logic for horizontal marquee
  useEffect(() => {
    let animationFrameId: number;
    const scroller = scrollerRef.current;
    if (!scroller || !isAutoScrolling || savedInquiries.length < 3) return;

    let scrollAmount = 0;
    const speed = 0.5; // pixels per frame

    const scroll = () => {
      if (!scroller) return;
      scrollAmount += speed;
      
      // Reset scroll when reaching the duplicate set or end
      if (scrollAmount >= scroller.scrollHeight - scroller.clientHeight) {
        scrollAmount = 0;
      }
      scroller.scrollTop = scrollAmount;
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isAutoScrolling, savedInquiries]);

  // Unique classes for filtering
  const classesList = ['All', ...Array.from(new Set(savedInquiries.map(item => item.className)))];

  // Filter inquiries
  const filteredInquiries = savedInquiries.filter(item => {
    const matchesSearch = 
      item.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone.includes(searchTerm) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesClass = selectedClassFilter === 'All' || item.className === selectedClassFilter;
    return matchesSearch && matchesClass;
  });

  return (
    <section id="submitted-forms" className="py-16 md:py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Absolute backgrounds for premium look */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-black text-amber-500 uppercase tracking-widest bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-full">
            Real-time Ledger
          </span>
          <h3 className="text-3xl md:text-4xl font-display font-extrabold text-white tracking-tight mt-4">
            Submitted Admission Forms
          </h3>
          <p className="text-slate-400 text-sm md:text-base mt-2">
            Explore and review all admission request forms currently registered in the device's local memory. Click on any record to inspect fully.
          </p>
        </div>

        {savedInquiries.length === 0 ? (
          /* Empty State view with demo button */
          <div className="max-w-xl mx-auto bg-slate-800/50 border border-slate-800 rounded-3xl p-8 text-center space-y-6 shadow-xl">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto border border-slate-700">
              <Database className="w-8 h-8 text-slate-500 animate-pulse" />
            </div>
            <div className="space-y-2">
              <h4 className="text-lg font-bold text-white">No Forms Submitted Yet</h4>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
                No local admission applications have been logged. You can fill out the interactive intake form above, or instantly inject professional demo data below to test our dynamic real-time scrolling ledger!
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={onAddDemoInquiries}
                className="w-full sm:w-auto px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>Load Demo Admission Records</span>
              </button>
              <a
                href="#admissions"
                className="w-full sm:w-auto px-6 py-3 bg-slate-800 hover:bg-slate-750 text-slate-300 rounded-xl text-xs font-bold border border-slate-700 flex items-center justify-center gap-2 hover:-translate-y-0.5 transition-all"
              >
                <span>Fill Out Form Above</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </a>
            </div>
          </div>
        ) : (
          /* Active Ledger Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left side: scrolling live feed & information overview */}
            <div className="lg:col-span-4 flex flex-col justify-between bg-slate-950/60 border border-slate-800/80 rounded-3xl p-6 shadow-2xl relative min-h-[450px]">
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <h4 className="text-sm font-black uppercase tracking-wider text-slate-200">Live Scroller Feed</h4>
                  </div>
                  <button 
                    onClick={() => setIsAutoScrolling(!isAutoScrolling)}
                    className={`text-[10px] font-bold px-2 py-0.5 rounded transition-all cursor-pointer ${
                      isAutoScrolling ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    {isAutoScrolling ? '⏸ Pause Scrolling' : '▶ Play AutoScroll'}
                  </button>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  Hover or select cards to pause the automated vertical reel. Clicking opens detailed school application parameters instantly.
                </p>

                {/* Auto-scrolling Vertical Reel Container */}
                <div 
                  ref={scrollerRef}
                  onMouseEnter={() => setIsAutoScrolling(false)}
                  onMouseLeave={() => setIsAutoScrolling(true)}
                  className="space-y-3 max-h-[280px] overflow-y-hidden pr-1 relative mask-image-vertical"
                >
                  {/* Map twice to create seamless loop if enough inquiries */}
                  {[...filteredInquiries, ...filteredInquiries].map((item, index) => (
                    <div 
                      key={`${item.id}-${index}`}
                      onClick={() => setSelectedInquiry(item)}
                      className="p-3 bg-slate-900/80 hover:bg-slate-800/60 rounded-xl border border-slate-800/80 hover:border-amber-500/30 transition-all cursor-pointer flex items-center justify-between gap-3 group"
                    >
                      <div className="space-y-1 truncate">
                        <span className="text-[9px] font-mono font-bold text-amber-500">{item.id}</span>
                        <h5 className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors truncate">{item.studentName}</h5>
                        <p className="text-[10px] text-slate-400 truncate">Parent: {item.parentName}</p>
                      </div>
                      <div className="flex flex-col items-end shrink-0 gap-1.5">
                        <span className="text-[9px] bg-slate-800 text-slate-300 font-bold px-1.5 py-0.5 rounded uppercase">
                          {item.className}
                        </span>
                        <span className="text-[8px] font-mono text-slate-500">
                          {item.submittedAt.split(' at ')[0]}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats overview at bottom */}
              <div className="pt-4 border-t border-slate-800 mt-6 grid grid-cols-2 gap-4 text-center">
                <div className="bg-slate-900/40 rounded-xl p-2.5 border border-slate-800/50">
                  <span className="text-xl font-extrabold text-amber-500 font-mono">{savedInquiries.length}</span>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-0.5">Total Forms</p>
                </div>
                <div className="bg-slate-900/40 rounded-xl p-2.5 border border-slate-800/50">
                  <span className="text-xl font-extrabold text-emerald-400 font-mono">
                    {savedInquiries.filter(i => i.status === 'Pending Review').length}
                  </span>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-0.5">Pending</p>
                </div>
              </div>

            </div>

            {/* Right side: Detailed Filters + Interactive Form Card Grid */}
            <div className="lg:col-span-8 flex flex-col space-y-6">
              
              {/* Filter and Search controls */}
              <div className="bg-slate-950/40 border border-slate-800/80 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Search Bar */}
                <div className="relative w-full md:w-72">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search name, phone, email, reference ID..."
                    className="w-full pl-10 pr-4 py-2 bg-slate-900/80 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500 placeholder-slate-500"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                </div>

                {/* Filter and reset */}
                <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                  <SlidersHorizontal className="w-4 h-4 text-slate-400 shrink-0" />
                  <div className="flex flex-wrap gap-1.5">
                    {classesList.slice(0, 5).map((cl) => (
                      <button
                        key={cl}
                        onClick={() => setSelectedClassFilter(cl)}
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                          selectedClassFilter === cl 
                            ? 'bg-amber-500 border-amber-500 text-slate-950' 
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                        }`}
                      >
                        {cl}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dynamic scroll grid with staggered animations */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[380px] overflow-y-auto pr-1">
                {filteredInquiries.length === 0 ? (
                  <div className="col-span-full py-16 text-center text-slate-500 bg-slate-950/20 rounded-2xl border border-dashed border-slate-800 space-y-2">
                    <p className="text-sm">No records match your filters.</p>
                    <button 
                      onClick={() => { setSearchTerm(''); setSelectedClassFilter('All'); }}
                      className="text-xs text-amber-500 font-bold hover:underline"
                    >
                      Clear Filters
                    </button>
                  </div>
                ) : (
                  filteredInquiries.map((item) => (
                    <motion.div
                      key={item.id}
                      onClick={() => setSelectedInquiry(item)}
                      whileHover={{ y: -3, scale: 1.01 }}
                      className="bg-slate-950/50 hover:bg-slate-900/80 border border-slate-800 hover:border-amber-500/20 rounded-2xl p-4 cursor-pointer relative group transition-colors flex flex-col justify-between h-40 shadow-md"
                    >
                      {/* Delete button option */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm(`Are you sure you want to delete the inquiry for ${item.studentName}?`)) {
                            onDeleteInquiry(item.id);
                          }
                        }}
                        className="absolute top-3.5 right-3.5 p-1 rounded hover:bg-red-500/10 text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Delete Inquiry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      {/* Top Header details */}
                      <div className="space-y-1">
                        <div className="flex justify-between items-start pr-6">
                          <span className="text-[10px] font-mono font-bold text-amber-500">{item.id}</span>
                          <span className="text-[9px] bg-slate-800 text-slate-300 font-bold px-2 py-0.5 rounded">
                            {item.className}
                          </span>
                        </div>
                        <h4 className="text-sm font-extrabold text-white truncate pr-4 group-hover:text-amber-400 transition-colors mt-1">
                          {item.studentName}
                        </h4>
                        <p className="text-[11px] text-slate-400 truncate">Parent: {item.parentName}</p>
                      </div>

                      {/* Footer Details */}
                      <div className="flex justify-between items-center pt-2.5 border-t border-slate-900 text-[10px] text-slate-500 mt-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-500" />
                          <span>{item.submittedAt.split(' at ')[0]}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-amber-500 font-bold">
                          <span>Inspect Form</span>
                          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

            </div>

          </div>
        )}

      </div>

      {/* Floating Detailed Form Modal View when a form card is clicked */}
      <AnimatePresence>
        {selectedInquiry && (() => {
          // Find the reactive inquiry in savedInquiries so status changes update live!
          const activeInquiry = savedInquiries.find(item => item.id === selectedInquiry.id) || selectedInquiry;
          
          return (
            <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="bg-slate-950 text-white rounded-3xl border border-slate-800 shadow-2xl w-full max-w-xl p-6 sm:p-8 overflow-y-auto max-h-[90vh] relative"
              >
                {/* Background gradient flares */}
                <div className="absolute -top-24 -left-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

                {/* Close Button */}
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all cursor-pointer"
                  aria-label="Close detailed view"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="space-y-6">
                  {/* Header Profile Info */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-500 rounded-2xl flex items-center justify-center text-slate-950 shrink-0 shadow-lg">
                      <User className="w-6 h-6 text-slate-950" />
                    </div>
                    <div>
                      <span className="text-xs font-mono font-bold text-amber-500 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded">
                        Reference ID: {activeInquiry.id}
                      </span>
                      <h4 className="text-xl font-display font-extrabold text-white mt-1.5">
                        {activeInquiry.studentName}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">Applied Class: <strong className="text-amber-400">{activeInquiry.className}</strong></p>
                    </div>
                  </div>

                  {/* Grid Form Field Parameters */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-900">
                    {/* Parent Full Name */}
                    <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5 space-y-1">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Parent / Guardian Name</span>
                      <div className="flex items-center gap-2 text-slate-200 text-xs font-semibold">
                        <User className="w-3.5 h-3.5 text-amber-500" />
                        <span>{activeInquiry.parentName}</span>
                      </div>
                    </div>

                    {/* Target Admission Class */}
                    <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5 space-y-1">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Class Level</span>
                      <div className="flex items-center gap-2 text-slate-200 text-xs font-semibold">
                        <ClipboardList className="w-3.5 h-3.5 text-amber-500" />
                        <span>{activeInquiry.className} Grade Standard</span>
                      </div>
                    </div>

                    {/* Contact Number */}
                    <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5 space-y-1">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Parent Contact Phone</span>
                      <a 
                        href={`tel:${activeInquiry.phone}`}
                        className="flex items-center gap-2 text-amber-400 hover:text-amber-300 text-xs font-semibold font-mono"
                      >
                        <Phone className="w-3.5 h-3.5 text-amber-500" />
                        <span>{activeInquiry.phone}</span>
                      </a>
                    </div>

                    {/* Email Gmail Address */}
                    <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5 space-y-1">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Email Address / Gmail</span>
                      <a 
                        href={`mailto:${activeInquiry.email}`}
                        className="flex items-center gap-2 text-amber-400 hover:text-amber-300 text-xs font-semibold truncate"
                      >
                        <Mail className="w-3.5 h-3.5 text-amber-500" />
                        <span className="truncate">{activeInquiry.email}</span>
                      </a>
                    </div>
                  </div>

                  {/* Additional Inquiry message */}
                  <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Additional Inquiry Remarks & Messages</span>
                    <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/40 p-3 rounded-lg border border-slate-800/50">
                      {activeInquiry.message || "No custom remarks specified by parent."}
                    </p>
                  </div>

                  {/* Submission State Footer details */}
                  <div className="bg-amber-500/5 border border-amber-500/10 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                    <div className="flex items-center gap-2 text-left w-full sm:w-auto">
                      <Clock className="w-4 h-4 text-amber-500" />
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Form Transmit Date</p>
                        <p className="font-mono text-slate-200">{activeInquiry.submittedAt}</p>
                      </div>
                    </div>
                    
                    {/* Reactive Status Badge with tailored colors */}
                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-bold ${
                      activeInquiry.status === 'Approved' 
                        ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                        : activeInquiry.status === 'Declined'
                        ? 'text-rose-400 bg-rose-500/10 border-rose-500/20'
                        : activeInquiry.status === 'Contacted'
                        ? 'text-blue-400 bg-blue-500/10 border-blue-500/20'
                        : 'text-amber-400 bg-amber-500/10 border-amber-500/20'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        activeInquiry.status === 'Approved' ? 'bg-emerald-400' : 'bg-amber-400'
                      }`}></span>
                      <span>{activeInquiry.status}</span>
                    </div>
                  </div>

                  {/* STAFF EXCLUSIVE DECISION BAR */}
                  {currentUser?.role === 'admin' ? (
                    <div className="bg-slate-900 border border-amber-500/20 rounded-2xl p-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] bg-amber-500 text-slate-950 font-black px-2 py-0.5 rounded tracking-widest uppercase">
                          Staff Controls
                        </span>
                        <h5 className="text-xs font-black uppercase text-slate-300 tracking-wider">
                          Admissions Decision Board
                        </h5>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        Approve or Decline this inquiry. This will instantly log a simulated parent status update notification email.
                      </p>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                        <button
                          onClick={() => updateInquiryStatus(activeInquiry.id, 'Approved')}
                          className="py-2 px-3 bg-emerald-650 hover:bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-wider transition-colors cursor-pointer text-center"
                        >
                          Approve Seating
                        </button>
                        <button
                          onClick={() => updateInquiryStatus(activeInquiry.id, 'Declined')}
                          className="py-2 px-3 bg-rose-650 hover:bg-rose-600 text-white rounded-xl text-[10px] font-black uppercase tracking-wider transition-colors cursor-pointer text-center"
                        >
                          Decline Seating
                        </button>
                        <button
                          onClick={() => updateInquiryStatus(activeInquiry.id, 'Contacted')}
                          className="py-2 px-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[10px] font-black uppercase tracking-wider transition-colors cursor-pointer text-center"
                        >
                          Mark Contacted
                        </button>
                        <button
                          onClick={() => updateInquiryStatus(activeInquiry.id, 'Pending Review')}
                          className="py-2 px-3 bg-slate-800 hover:bg-slate-750 text-slate-300 rounded-xl text-[10px] font-black uppercase tracking-wider transition-colors cursor-pointer text-center"
                        >
                          Reset Pending
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-3.5 text-center text-[11px] text-slate-500 leading-relaxed">
                      💡 <strong>Staff Portal Reminder:</strong> Only logged-in administrative members can change the status of form inquiries.
                    </div>
                  )}

                  {/* SIMULATED EMAIL LOGS DRAWER */}
                  {activeInquiry.emailLogs && activeInquiry.emailLogs.length > 0 && (
                    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 space-y-3 text-left">
                      <div className="flex items-center gap-1.5 text-amber-500">
                        <Mail className="w-3.5 h-3.5" />
                        <h5 className="text-xs font-black uppercase tracking-wider">Simulated Parent Email Logs ({activeInquiry.emailLogs.length})</h5>
                      </div>
                      
                      <div className="space-y-3.5 max-h-[160px] overflow-y-auto pr-1">
                        {activeInquiry.emailLogs.map((log, index) => (
                          <div key={index} className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 space-y-2">
                            <div className="flex justify-between items-start gap-4 text-[10px]">
                              <span className={`font-black px-2 py-0.5 rounded tracking-wider uppercase ${
                                log.type === 'Approved' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                              }`}>
                                {log.type} Notice Dispatched
                              </span>
                              <span className="text-slate-500 font-mono">{log.sentAt}</span>
                            </div>
                            <div className="text-[11px] font-bold text-slate-200">
                              Subject: <span className="text-amber-400">{log.subject}</span>
                            </div>
                            <pre className="text-[10px] text-slate-400 whitespace-pre-wrap font-sans leading-relaxed border-t border-slate-900 pt-2">
                              {log.body}
                            </pre>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Print/Download helper action */}
                  <button
                    onClick={() => window.print()}
                    className="w-full py-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
                  >
                    <span>Print Application Record</span>
                  </button>
                </div>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>

    </section>
  );
}
