/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, GraduationCap, Phone, Info, Award, Calendar, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onOpenDeploymentGuide: () => void;
}

export default function Navbar({ onOpenDeploymentGuide }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Determine active section on scroll
      const sections = ['home', 'why-choose-us', 'academics', 'admissions', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'Why Choose Us', href: '#why-choose-us', id: 'why-choose-us' },
    { label: 'Academics', href: '#academics', id: 'academics' },
    { label: 'Admissions', href: '#admissions', id: 'admissions' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offsetTop = (target as HTMLElement).offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Top Banner Contact Strip */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 md:px-8 flex justify-between items-center border-b border-slate-800">
        <div className="flex items-center gap-4 flex-wrap">
          <a href="tel:8447061133" className="flex items-center gap-1.5 hover:text-amber-500 transition-colors">
            <Phone className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-mono">8447061133, 9711771815</span>
          </a>
          <span className="text-slate-700 hidden sm:inline">|</span>
          <span className="hidden sm:inline">Ballabhgarh, Haryana</span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={onOpenDeploymentGuide}
            className="flex items-center gap-1 text-amber-500 hover:text-amber-400 font-semibold transition-colors focus:outline-none"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Deployment Guide</span>
          </button>
          <span className="text-slate-700">|</span>
          <span className="text-amber-500 font-bold uppercase tracking-wider text-[10px] bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
            Admissions Open 2026-27
          </span>
        </div>
      </div>

      {/* Sticky Header */}
      <header 
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-slate-200' 
            : 'bg-white py-4 border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo Brand */}
          <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="flex items-center gap-3 group">
            {/* Mock Circular Logo representing the school badge */}
            <div className="relative w-12 h-12 rounded-full border-2 border-amber-500 bg-slate-900 flex items-center justify-center shadow-md overflow-hidden shrink-0 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6 text-amber-500" />
              <div className="absolute inset-0 border border-white/10 rounded-full"></div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-slate-900 font-display font-extrabold text-base md:text-lg tracking-tight leading-none group-hover:text-amber-600 transition-colors">
                GYAN BHARTI
              </h1>
              <span className="text-xs font-semibold text-slate-500 tracking-wide uppercase leading-tight">
                PUBLIC SCHOOL
              </span>
              <span className="text-[9px] text-amber-600 font-bold tracking-wider leading-none">
                VIDYA VINIYOGAT VIKASAH
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`text-sm font-medium transition-colors relative py-2 ${
                  activeSection === link.id 
                    ? 'text-amber-600 font-semibold' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.div 
                    layoutId="activeNavIndicator" 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Action CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <a 
              href="#admissions"
              onClick={(e) => handleLinkClick(e, '#admissions')}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all border border-slate-800 hover:-translate-y-0.5"
            >
              Apply Online
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-200 shadow-xl overflow-hidden fixed top-[108px] left-0 right-0 z-30"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    activeSection === link.id 
                      ? 'bg-amber-50 text-amber-700 font-bold' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 border-t border-slate-100 px-4 flex flex-col gap-3">
                <a 
                  href="#admissions"
                  onClick={(e) => handleLinkClick(e, '#admissions')}
                  className="w-full text-center py-3 bg-slate-900 text-white rounded-xl text-base font-bold shadow-md"
                >
                  Apply Online
                </a>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenDeploymentGuide();
                  }}
                  className="w-full text-center py-2.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-4 h-4 text-amber-600" />
                  <span>Deployment Guide</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
