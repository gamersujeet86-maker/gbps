/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhyChooseUs from './components/WhyChooseUs';
import Academics from './components/Academics';
import Admissions from './components/Admissions';
import FormExplorer from './components/FormExplorer';
import ReviewsSection from './components/ReviewsSection';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import { useApp } from './context/AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, X, Phone, GraduationCap } from 'lucide-react';
import { SchoolInquiry } from './types';

export default function App() {
  const { savedInquiries, setSavedInquiries } = useApp();
  const [showFloatBanner, setShowFloatBanner] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');

  useEffect(() => {
    if (savedInquiries && savedInquiries.length > 0) {
      // Show banner after 3 seconds
      const timer = setTimeout(() => {
        setShowFloatBanner(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [savedInquiries]);

  const handleDeleteInquiry = (id: string) => {
    const updated = savedInquiries.filter(item => item.id !== id);
    localStorage.setItem('gbps_inquiries', JSON.stringify(updated));
    setSavedInquiries(updated);
  };

  const handleAddDemoInquiries = () => {
    const demos: SchoolInquiry[] = [
      {
        id: 'GB-2026-8041',
        studentName: 'Aarav Sharma',
        className: 'Nursery',
        parentName: 'Ramesh Sharma',
        phone: '9876543210',
        email: 'ramesh.sharma@gmail.com',
        message: 'Aarav is very active, loves sketching, and has completed preparatory play-school program with distinction.',
        submittedAt: '12 July 2026 at 10:14 AM',
        status: 'Pending Review'
      },
      {
        id: 'GB-2026-3021',
        studentName: 'Sneha Verma',
        className: 'Class 3',
        parentName: 'Anil Verma',
        phone: '9911223344',
        email: 'anil.verma@yahoo.com',
        message: 'Sneha is transferring from an out-of-station ICSE board school. She is highly proficient in english public reading.',
        submittedAt: '14 July 2026 at 02:45 PM',
        status: 'Pending Review'
      },
      {
        id: 'GB-2026-5912',
        studentName: 'Kabir Malik',
        className: 'Class 6',
        parentName: 'Sanjay Malik',
        phone: '9811556677',
        email: 'sanjay.malik@outlook.com',
        message: 'We are seeking scholarship pathways based on athletic performance. Kabir holds multiple local under-11 badminton medals.',
        submittedAt: '15 July 2026 at 09:30 AM',
        status: 'Pending Review'
      },
      {
        id: 'GB-2026-1184',
        studentName: 'Diya Joshi',
        className: 'Class 1',
        parentName: 'Prakash Joshi',
        phone: '9711559900',
        email: 'prakash.joshi@gmail.com',
        message: 'Seeking a caring ecosystem emphasizing character values and sports activities. No past medical issues.',
        submittedAt: '16 July 2026 at 11:20 AM',
        status: 'Pending Review'
      }
    ];
    localStorage.setItem('gbps_inquiries', JSON.stringify(demos));
    setSavedInquiries(demos);
  };

  const handleScrollToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 relative selection:bg-amber-500/30 selection:text-slate-900">
      
      {/* Navbar Brand Header */}
      <Navbar onOpenAuth={(mode) => { setAuthModalMode(mode); setIsAuthModalOpen(true); }} />

      {/* Main Container */}
      <main className="flex-1">
        {/* Hero Banner Section */}
        <Hero onScrollToSection={handleScrollToSection} />

        {/* Why Choose Us Core Pillars */}
        <WhyChooseUs />

        {/* Academics Division Section (Nursery to Class 8) */}
        <Academics />

        {/* Admission Inquiry & Workflow Hub */}
        <Admissions savedInquiries={savedInquiries} setSavedInquiries={setSavedInquiries} />

        {/* Real-time interactive Forms Ledger Section */}
        <FormExplorer 
          savedInquiries={savedInquiries} 
          onDeleteInquiry={handleDeleteInquiry} 
          onAddDemoInquiries={handleAddDemoInquiries} 
        />

        {/* Community Testimonials & Live Interactive Reviews Section */}
        <ReviewsSection 
          onOpenAuth={(mode) => {
            setAuthModalMode(mode);
            setIsAuthModalOpen(true);
          }} 
        />

        {/* Contact info card & router FAQs */}
        <Contact />
      </main>

      {/* Footer Branding Navigation */}
      <Footer />

      {/* Account Login & Registration Dialog */}
      <AnimatePresence>
        {isAuthModalOpen && (
          <AuthModal 
            isOpen={isAuthModalOpen} 
            onClose={() => setIsAuthModalOpen(false)} 
            initialMode={authModalMode} 
          />
        )}
      </AnimatePresence>

      {/* Floating Stored Inquiries Prompt */}
      <AnimatePresence>
        {showFloatBanner && savedInquiries.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-30 max-w-sm w-full bg-slate-900 text-white rounded-2xl shadow-2xl p-4 border border-slate-800"
          >
            <div className="flex gap-3 items-start relative">
              {/* Close Button */}
              <button
                onClick={() => setShowFloatBanner(false)}
                className="absolute top-0 right-0 p-1 rounded-full text-slate-500 hover:text-white transition-colors"
                aria-label="Dismiss banner"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="p-2 bg-amber-500/10 text-amber-500 rounded-xl shrink-0">
                <GraduationCap className="w-5 h-5 text-amber-500" />
              </div>
              
              <div className="space-y-1.5 pr-4">
                <h5 className="text-xs font-black text-amber-500 uppercase tracking-widest">Inquiry Tracking Active</h5>
                <p className="text-xs text-slate-300">
                  You have active admission inquiries saved on this device. Quote these IDs on visiting the campus.
                </p>
                <button
                  onClick={() => {
                    handleScrollToSection('submitted-forms');
                    setShowFloatBanner(false);
                  }}
                  className="text-xs font-bold text-amber-500 hover:text-amber-400 flex items-center gap-1 mt-1 cursor-pointer focus:outline-none"
                >
                  <span>View Saved Inquiries</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
