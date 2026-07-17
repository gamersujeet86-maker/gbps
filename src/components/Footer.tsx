/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Phone, Mail, MapPin, ExternalLink, HelpCircle, Heart } from 'lucide-react';
import SchoolLogo from './SchoolLogo';

export default function Footer() {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* Upper footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        
        {/* Brand Column */}
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center gap-3">
            <SchoolLogo className="w-12 h-12 shrink-0 drop-shadow" />
            <div>
              <h4 className="text-white font-display font-black tracking-tight text-base">GYAN BHARTI</h4>
              <p className="text-[10px] font-bold text-amber-500 uppercase tracking-widest leading-none mt-0.5">PUBLIC SCHOOL</p>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
            We deliver disciplined, secure, and modern interactive primary schooling to children, raising well-rounded citizens for tomorrow’s challenges.
          </p>
          <div className="pt-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500 block">Sanskrit Motto</span>
            <span className="text-xs text-slate-300 font-serif italic mt-0.5 block">"Vidya Viniyogat Vikasah"</span>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="md:col-span-3 space-y-4">
          <h5 className="text-xs font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">Quick Navigation</h5>
          <ul className="space-y-2 text-xs">
            <li>
              <a href="#home" onClick={(e) => handleScrollTo(e, 'home')} className="hover:text-amber-500 transition-colors">
                Home Entryway
              </a>
            </li>
            <li>
              <a href="#why-choose-us" onClick={(e) => handleScrollTo(e, 'why-choose-us')} className="hover:text-amber-500 transition-colors">
                Why Choose Us Info
              </a>
            </li>
            <li>
              <a href="#academics" onClick={(e) => handleScrollTo(e, 'academics')} className="hover:text-amber-500 transition-colors">
                Academics & Curriculums
              </a>
            </li>
            <li>
              <a href="#admissions" onClick={(e) => handleScrollTo(e, 'admissions')} className="hover:text-amber-500 transition-colors">
                Online Admissions Inquiry
              </a>
            </li>
            <li>
              <a href="#contact" onClick={(e) => handleScrollTo(e, 'contact')} className="hover:text-amber-500 transition-colors">
                Contact & Directions Guide
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Strip Column */}
        <div className="md:col-span-5 space-y-4">
          <h5 className="text-xs font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">Credentials & Location</h5>
          <ul className="space-y-3 text-xs text-slate-400">
            <li className="flex gap-2.5 items-start">
              <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>Near Pandit Chowk, Rajeev Colony, Samaypur, Ballabhgarh, 121004</span>
            </li>
            <li className="flex gap-2.5 items-center">
              <Phone className="w-4 h-4 text-amber-500 shrink-0" />
              <span className="font-mono text-slate-300">8447061133, 9711771815</span>
            </li>
            <li className="flex gap-2.5 items-center">
              <Mail className="w-4 h-4 text-amber-500 shrink-0" />
              <a href="mailto:edu.gyanbharti23@gmail.com" className="hover:text-amber-500 transition-colors font-mono text-slate-300 break-all">
                edu.gyanbharti23@gmail.com
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Lower footer band */}
      <div className="bg-slate-950 py-6 px-4 md:px-8 border-t border-slate-900/60 text-center md:text-left">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xs text-slate-500">
            <span>© 2026 Gyan Bharti Public School. All Rights Reserved.</span>
            <span className="mx-2 text-slate-800">|</span>
            <span>Ballabhgarh, Haryana, India.</span>
          </div>

          <div className="flex gap-4 items-center flex-wrap justify-center">
            <span className="text-[10px] text-slate-600 flex items-center gap-1">
              Shaping Minds with <Heart className="w-3 h-3 text-amber-600 fill-amber-600" /> & Excellence
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
