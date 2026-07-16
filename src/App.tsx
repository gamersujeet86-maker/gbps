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
import Contact from './components/Contact';
import Footer from './components/Footer';
import DeploymentGuide from './components/DeploymentGuide';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, X, Phone, GraduationCap } from 'lucide-react';

export default function App() {
  const [isDeploymentGuideOpen, setIsDeploymentGuideOpen] = useState(false);
  const [showFloatBanner, setShowFloatBanner] = useState(false);
  const [hasStoredInquiries, setHasStoredInquiries] = useState(false);

  useEffect(() => {
    // Check if user has stored inquiries to show a gentle reminder banner
    const stored = localStorage.getItem('gbps_inquiries');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.length > 0) {
          setHasStoredInquiries(true);
          // Show banner after 3 seconds
          const timer = setTimeout(() => {
            setShowFloatBanner(true);
          }, 3000);
          return () => clearTimeout(timer);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

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
      <Navbar onOpenDeploymentGuide={() => setIsDeploymentGuideOpen(true)} />

      {/* Main Container */}
      <main className="flex-1">
        {/* Hero Banner Section */}
        <Hero onScrollToSection={handleScrollToSection} />

        {/* Why Choose Us Core Pillars */}
        <WhyChooseUs />

        {/* Academics Division Section (Nursery to Class 8) */}
        <Academics />

        {/* Admission Inquiry & Workflow Hub */}
        <Admissions />

        {/* Contact info card & router FAQs */}
        <Contact />
      </main>

      {/* Footer Branding Navigation */}
      <Footer onOpenDeploymentGuide={() => setIsDeploymentGuideOpen(true)} />

      {/* Interactive Floating Deployment Tutorial Modal */}
      <AnimatePresence>
        {isDeploymentGuideOpen && (
          <DeploymentGuide 
            isOpen={isDeploymentGuideOpen} 
            onClose={() => setIsDeploymentGuideOpen(false)} 
          />
        )}
      </AnimatePresence>

      {/* Floating Stored Inquiries Prompt */}
      <AnimatePresence>
        {showFloatBanner && hasStoredInquiries && (
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
                    handleScrollToSection('admissions');
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
