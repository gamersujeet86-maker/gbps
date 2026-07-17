/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, User, Sparkles, ArrowRight, ShieldCheck, Chrome } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
}

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) {
  const { login, signup, loginWithGoogle } = useApp();
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (mode === 'signup') {
      if (!name.trim()) {
        setErrorMsg('Please enter your name.');
        return;
      }
      if (!email.trim() || !password) {
        setErrorMsg('Please fill in email and password.');
        return;
      }
      if (password.length < 6) {
        setErrorMsg('Password must be at least 6 characters long.');
        return;
      }

      const res = signup(name, email);
      if (res.success) {
        setSuccessMsg('Account created successfully! Enjoy full reviewer privileges.');
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        setErrorMsg(res.error || 'Failed to create account.');
      }
    } else {
      if (!email.trim() || !password) {
        setErrorMsg('Please enter email and password.');
        return;
      }

      const res = login(email, password);
      if (res.success) {
        const isAdmin = email.toLowerCase().trim() === 'admin@gmail.com';
        setSuccessMsg(isAdmin ? 'Staff Administrator privileges unlocked!' : 'Logged in successfully!');
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        setErrorMsg(res.error || 'Failed to sign in.');
      }
    }
  };

  const handleGoogleSignIn = () => {
    loginWithGoogle();
    setSuccessMsg('Signed in with Google standard access!');
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-white rounded-3xl overflow-hidden shadow-2xl w-full max-w-md border border-slate-200 relative text-slate-950"
      >
        {/* Subtle Decorative Accents */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>

        {/* Modal Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-50 border border-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer z-10"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-1">
            <span className="text-[10px] font-black tracking-widest text-amber-600 uppercase bg-amber-500/10 px-2.5 py-1 rounded-full inline-block">
              User Portal
            </span>
            <h4 className="text-2xl font-display font-black text-slate-900 mt-2">
              {mode === 'login' ? 'Sign In to Gyan Bharti' : 'Create an Account'}
            </h4>
            <p className="text-xs text-slate-500">
              {mode === 'login' 
                ? 'Sign in to write rating reviews and view admission histories' 
                : 'Sign up for a free reviewer profile to post ratings live'}
            </p>
          </div>

          {/* Error & Success Messages */}
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-medium">
              ⚠️ {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-700 font-semibold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Your Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter full name"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@gmail.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Password</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <span>{mode === 'login' ? 'Sign In Now' : 'Create Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Google Sign In Integration */}
          <div className="relative flex items-center justify-center my-2">
            <div className="absolute inset-0 border-t border-slate-200"></div>
            <span className="relative px-3 bg-white text-[10px] uppercase font-black tracking-widest text-slate-400">Or Continue With</span>
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="w-full py-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <Chrome className="w-4 h-4 text-red-500" />
            <span>Sign In with Google Identity</span>
          </button>

          {/* Toggle mode */}
          <div className="text-center pt-2">
            <button
              onClick={() => {
                setMode(mode === 'login' ? 'signup' : 'login');
                setErrorMsg('');
                setSuccessMsg('');
              }}
              className="text-xs text-slate-500 hover:text-amber-600 transition-colors font-medium underline"
            >
              {mode === 'login' 
                ? "Don't have an account? Sign up here" 
                : "Already registered? Log in to your profile"}
            </button>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
