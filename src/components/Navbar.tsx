/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, GraduationCap, Phone, Info, Award, Calendar, BookOpen, LogIn, LogOut, UserCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import SchoolLogo from './SchoolLogo';
import { useApp } from '../context/AppContext';

interface NavbarProps {
  onOpenAuth: (mode: 'login' | 'signup') => void;
}

export default function Navbar({ onOpenAuth }: NavbarProps) {
  const { currentUser, logout } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Determine active section on scroll
      const sections = ['home', 'why-choose-us', 'academics', 'admissions', 'submitted-forms', 'contact'];
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
    { label: 'Forms Ledger', href: '#submitted-forms', id: 'submitted-forms' },
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
            {/* Real SVG Logo based on physical emblem */}
            <SchoolLogo className="w-12 h-12 shrink-0 group-hover:scale-105 transition-transform drop-shadow" />
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
            {currentUser ? (
              <div className="flex items-center gap-3">
                <div className="flex flex-col text-right">
                  <span className="text-xs font-extrabold text-slate-950 flex items-center gap-1.5 justify-end">
                    <span className={`w-1.5 h-1.5 rounded-full ${currentUser.role === 'admin' ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
                    {currentUser.name}
                  </span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-0.5">
                    {currentUser.role === 'admin' ? 'Staff Admin' : 'Parent Account'}
                  </span>
                </div>
                <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 overflow-hidden shrink-0 shadow-sm">
                  {currentUser.avatar ? (
                    <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
                  ) : (
                    <UserCheck className="w-4 h-4 m-2.5 text-slate-500" />
                  )}
                </div>
                <button
                  onClick={logout}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                  title="Sign Out Session"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => onOpenAuth('login')}
                className="text-xs font-black uppercase tracking-widest text-slate-700 hover:text-slate-900 px-4 py-2 border border-slate-200 hover:border-slate-300 rounded-xl transition-all cursor-pointer"
              >
                Sign In
              </button>
            )}

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
                {currentUser ? (
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                        {currentUser.avatar ? (
                          <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
                        ) : (
                          <UserCheck className="w-4 h-4 m-2.5 text-slate-500" />
                        )}
                      </div>
                      <div className="text-left">
                        <span className="text-xs font-black text-slate-900 block">{currentUser.name}</span>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none block mt-0.5">
                          {currentUser.role === 'admin' ? 'Staff Administrator' : 'Parent Account'}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        logout();
                      }}
                      className="w-full py-2.5 bg-red-50 hover:bg-red-100 border border-red-200/60 text-red-600 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out Session</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenAuth('login');
                    }}
                    className="w-full text-center py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <LogIn className="w-4 h-4 text-slate-600" />
                    <span>Log In / Sign Up</span>
                  </button>
                )}

                <a 
                  href="#admissions"
                  onClick={(e) => handleLinkClick(e, '#admissions')}
                  className="w-full text-center py-3 bg-slate-900 text-white rounded-xl text-base font-bold shadow-md"
                >
                  Apply Online
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
