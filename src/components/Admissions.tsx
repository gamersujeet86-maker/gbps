/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Calendar, BookOpen, CheckCircle, ChevronDown, Plus, ClipboardList, Trash2, ShieldAlert } from 'lucide-react';
import { SchoolInquiry } from '../types';

export default function Admissions() {
  const [studentName, setStudentName] = useState('');
  const [className, setClassName] = useState('');
  const [parentName, setParentName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successInquiry, setSuccessInquiry] = useState<SchoolInquiry | null>(null);
  const [savedInquiries, setSavedInquiries] = useState<SchoolInquiry[]>([]);

  // Load existing inquiries from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('gbps_inquiries');
    if (stored) {
      try {
        setSavedInquiries(JSON.parse(stored));
      } catch (err) {
        console.error("Failed to parse saved inquiries", err);
      }
    }
  }, []);

  const classOptions = [
    'Nursery', 'LKG', 'UKG',
    'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
    'Class 6', 'Class 7', 'Class 8'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !className || !parentName || !phone || !email) {
      alert('Please fill out all required fields.');
      return;
    }

    setIsSubmitting(true);

    // Simulate network delay for premium feel
    setTimeout(() => {
      const trackingId = `GB-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const newInquiry: SchoolInquiry = {
        id: trackingId,
        studentName,
        className,
        parentName,
        phone,
        email,
        message,
        submittedAt: new Date().toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        status: 'Pending Review'
      };

      const updated = [newInquiry, ...savedInquiries];
      localStorage.setItem('gbps_inquiries', JSON.stringify(updated));
      setSavedInquiries(updated);
      setSuccessInquiry(newInquiry);
      setIsSubmitting(false);

      // Reset form fields
      setStudentName('');
      setClassName('');
      setParentName('');
      setPhone('');
      setEmail('');
      setMessage('');
    }, 1500);
  };

  const handleDeleteInquiry = (id: string) => {
    const updated = savedInquiries.filter(item => item.id !== id);
    localStorage.setItem('gbps_inquiries', JSON.stringify(updated));
    setSavedInquiries(updated);
  };

  const processSteps = [
    {
      step: '01',
      title: 'Online Inquiry Form',
      description: 'Fill out our online school inquiry form. Specify child details, contact information, and special academic preferences.'
    },
    {
      step: '02',
      title: 'Campus Visit & Review',
      description: 'Visit Pandit Chowk campus for a friendly parent interview, physical smart classroom tour, and child-interaction assessment.'
    },
    {
      step: '03',
      title: 'Secure Seat & Enrollment',
      description: 'Submit past marksheets (if applicable), proof of age, and finalize fee details. Secure textbooks and official school uniforms.'
    }
  ];

  return (
    <section id="admissions" className="py-16 md:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest bg-amber-100 px-3 py-1.5 rounded-full">
            Intake Guide
          </span>
          <h3 className="text-3xl md:text-4xl font-display font-extrabold text-slate-900 tracking-tight mt-4">
            Admissions Process 2026-27
          </h3>
          <p className="text-slate-500 text-sm md:text-base mt-2">
            Admission forms are now accepted for <strong>Nursery to Class 8</strong>. We ensure a transparent, merit-based, and supportive registration workflow.
          </p>
        </div>

        {/* 3 Step Visual Path */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {processSteps.map((p, idx) => (
            <div key={idx} className="relative bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
              <div className="absolute top-4 right-4 text-4xl font-black font-mono text-amber-500/20">
                {p.step}
              </div>
              <span className="text-xs font-black text-amber-600 tracking-wider font-mono">Step {p.step}</span>
              <h4 className="text-lg font-bold font-display text-slate-900 mt-2">{p.title}</h4>
              <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>

        {/* Form and Saved Inquiries Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          
          {/* Form Block */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-xl font-bold font-display text-slate-900">Online Inquiry Form</h4>
                  <p className="text-xs text-slate-500 mt-1">Please enter precise data. Our coordinator will schedule a follow-up.</p>
                </div>
                <div className="bg-amber-500 text-slate-950 text-[10px] font-black uppercase px-2.5 py-1 rounded-full animate-pulse">
                  Session 2026-27
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Student Name */}
                <div className="space-y-1.5">
                  <label htmlFor="studentName" className="text-xs font-bold text-slate-700">Student Full Name *</label>
                  <input
                    id="studentName"
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="e.g. Aarav Sharma"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {/* Class to Enroll */}
                <div className="space-y-1.5">
                  <label htmlFor="classSelect" className="text-xs font-bold text-slate-700">Class for Admission *</label>
                  <div className="relative">
                    <select
                      id="classSelect"
                      required
                      value={className}
                      onChange={(e) => setClassName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Select Class</option>
                      {classOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Parent Name */}
              <div className="space-y-1.5">
                <label htmlFor="parentName" className="text-xs font-bold text-slate-700">Parent / Guardian Full Name *</label>
                <input
                  id="parentName"
                  type="text"
                  required
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  placeholder="e.g. Ramesh Sharma"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone */}
                <div className="space-y-1.5">
                  <label htmlFor="phone" className="text-xs font-bold text-slate-700">Mobile Phone Number *</label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    title="10-digit mobile number required"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 9876543210"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-bold text-slate-700">Email Address *</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. parent@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label htmlFor="message" className="text-xs font-bold text-slate-700">Additional Inquiry / Remarks (Optional)</label>
                <textarea
                  id="message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="State past academic highlights, special skills, or health details..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                />
              </div>

              {/* Submit Action */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Processing Secure Form...</span>
                  </>
                ) : (
                  <span>Submit Secure Admission Inquiry</span>
                )}
              </button>
            </form>
          </div>

          {/* Right Side Info & Submitted Inquiries Ledger */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Warning Stamp */}
            <div className="bg-amber-50 rounded-2xl border border-amber-200 p-5 space-y-2">
              <div className="flex gap-2 items-center text-amber-800">
                <Sparkles className="w-5 h-5 shrink-0" />
                <h5 className="text-sm font-bold">Limited Intake Seats Available!</h5>
              </div>
              <p className="text-xs text-amber-700 leading-relaxed">
                For the academic year 2026-27, we enforce a strict <strong>25 seats limit per grade level</strong> to maintain quality individual student support. Enroll early to secure your seat.
              </p>
            </div>

            {/* Saved Local Inquiries List */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 space-y-4 shadow-xl">
              <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <ClipboardList className="w-5 h-5 text-amber-500" />
                  <h4 className="text-sm font-bold">My Submitted Inquiries</h4>
                </div>
                <span className="text-xs bg-slate-800 text-slate-300 font-mono px-2 py-0.5 rounded-md">
                  {savedInquiries.length} Saved
                </span>
              </div>

              {savedInquiries.length === 0 ? (
                <div className="text-center py-8 text-slate-500 text-xs">
                  <p>No past inquiries submitted on this device yet.</p>
                  <p className="mt-1">Fill out the left form to test interactive local storage!</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[280px] overflow-y-auto pr-1">
                  {savedInquiries.map((item) => (
                    <div key={item.id} className="p-3 bg-slate-800/60 rounded-xl border border-slate-800 space-y-2 relative group">
                      <button
                        onClick={() => handleDeleteInquiry(item.id)}
                        className="absolute top-3 right-3 p-1 rounded hover:bg-red-500/10 text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Delete Inquiry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <div className="flex justify-between items-start pr-6">
                        <div>
                          <span className="text-[10px] font-mono text-amber-500 font-bold">{item.id}</span>
                          <h5 className="text-xs font-bold text-white mt-0.5">{item.studentName}</h5>
                        </div>
                        <span className="text-[9px] bg-slate-700 text-slate-300 px-2 py-0.5 rounded font-mono font-semibold">
                          {item.className}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-slate-800 text-[10px] text-slate-400">
                        <span>Submitted {item.submittedAt.split(' at ')[0]}</span>
                        <span className="flex items-center gap-1 font-semibold text-emerald-400">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                          {item.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>
      </div>

      {/* Success / Celebratory Modal for Form Submission */}
      <AnimatePresence>
        {successInquiry && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-6 border border-slate-200 overflow-hidden relative"
            >
              {/* Confetti element simulated */}
              <div className="absolute -top-12 -left-12 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl"></div>

              <div className="text-center space-y-4 relative">
                {/* Success Check Badge */}
                <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center border-2 border-emerald-500 shadow-md">
                  <CheckCircle className="w-10 h-10 text-emerald-600 animate-pulse" />
                </div>

                <div>
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block font-mono">
                    Form Uploaded Successfully
                  </span>
                  <h4 className="text-2xl font-display font-extrabold text-slate-900 mt-1">
                    Inquiry Received!
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">Your secure application is now locked into local device memories.</p>
                </div>

                {/* Receipt Details Box */}
                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 text-left space-y-2.5">
                  <div className="flex justify-between text-xs pb-2 border-b border-slate-200 font-mono font-bold">
                    <span className="text-slate-500">Tracking Reference:</span>
                    <span className="text-amber-600 font-black">{successInquiry.id}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-y-2 text-xs">
                    <span className="text-slate-500">Student Name:</span>
                    <span className="text-slate-900 font-bold text-right">{successInquiry.studentName}</span>
                    
                    <span className="text-slate-500">Target Grade:</span>
                    <span className="text-slate-900 font-bold text-right">{successInquiry.className}</span>

                    <span className="text-slate-500">Parent Contact:</span>
                    <span className="text-slate-900 font-bold font-mono text-right">{successInquiry.phone}</span>

                    <span className="text-slate-500">Timestamp:</span>
                    <span className="text-slate-900 text-right">{successInquiry.submittedAt}</span>
                  </div>
                </div>

                {/* Steps Forward guidance */}
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-left text-xs text-amber-900">
                  <h5 className="font-bold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 shrink-0 text-amber-600" />
                    What happens next?
                  </h5>
                  <p className="mt-1 leading-relaxed">
                    1. Print/Write down this Reference ID (<strong>{successInquiry.id}</strong>). <br />
                    2. Visit our Pandit Chowk campus (Samaypur, Ballabhgarh) during public hours. <br />
                    3. Quote this Reference ID to our admissions counter for direct document check!
                  </p>
                </div>

                {/* Dismiss Button */}
                <button
                  onClick={() => setSuccessInquiry(null)}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-bold shadow-md transition-colors cursor-pointer"
                >
                  Return to Website
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
