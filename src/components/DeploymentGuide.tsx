/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Github, ArrowRight, ExternalLink, CheckCircle, Copy, Check, Terminal, Globe, Award } from 'lucide-react';

interface DeploymentGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DeploymentGuide({ isOpen, onClose }: DeploymentGuideProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([false, false, false, false]);

  const steps = [
    {
      title: 'Initialize & Push to GitHub',
      icon: <Github className="w-5 h-5 text-indigo-500" />,
      description: 'Create a repository on GitHub and upload your code.',
      instructions: [
        'Go to github.com and sign in (or sign up for a free account).',
        'Click the "+" icon in the upper-right corner and select "New repository".',
        'Name your repository (e.g., "gyan-bharti-school-website") and select "Public" or "Private".',
        'Do NOT initialize with a README, .gitignore, or license (these already exist in your workspace).',
        'Open your command line terminal in your project directory and run the following commands:'
      ],
      commands: [
        'git init',
        'git add .',
        'git commit -m "feat: initial release of Gyan Bharti Public School website"',
        'git branch -M main',
        'git remote add origin https://github.com/YOUR_USERNAME/gyan-bharti-school-website.git',
        'git push -u origin main'
      ]
    },
    {
      title: 'Sign In to Vercel',
      icon: <Globe className="w-5 h-5 text-teal-500" />,
      description: 'Connect your GitHub account to Vercel for continuous deployment.',
      instructions: [
        'Visit vercel.com and click "Sign Up" or "Log In".',
        'Select "Continue with GitHub" to instantly link your accounts.',
        'Authorize Vercel to access your GitHub repositories.',
        'You will be redirected to your Vercel Dashboard.'
      ],
      commands: []
    },
    {
      title: 'Import Repository',
      icon: <Terminal className="w-5 h-5 text-amber-500" />,
      description: 'Select your school website repository from your GitHub list.',
      instructions: [
        'From your Vercel Dashboard, click the "Add New..." button and select "Project".',
        'In the "Import Git Repository" section, locate your "gyan-bharti-school-website" repository.',
        'Click the "Import" button next to it.'
      ],
      commands: []
    },
    {
      title: 'Configure & Deploy',
      icon: <Award className="w-5 h-5 text-rose-500" />,
      description: 'Double check build settings and kick off your live deployment.',
      instructions: [
        'Vercel will automatically detect that this is a Vite + React project.',
        'Leave the default Framework Preset as "Vite".',
        'The default "Build Command" (npm run build) and "Output Directory" (dist) are pre-configured correctly.',
        'If you have environment variables (like API keys, though this static app does not strictly require them to serve), you can add them under the "Environment Variables" toggle.',
        'Click the "Deploy" button and wait about 30 seconds for the progress logs to complete!',
        'Congratulations! Your website is live with a free, SSL-secured .vercel.app domain!'
      ],
      commands: []
    }
  ];

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const toggleStepCompleted = (index: number) => {
    const updated = [...completedSteps];
    updated[index] = !updated[index];
    setCompletedSteps(updated);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden border border-slate-200"
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 flex justify-between items-center relative">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg shadow-md">
              <BookOpen className="w-6 h-6 text-slate-900" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-display">Vercel Deployment Guide</h2>
              <p className="text-xs text-slate-400">Step-by-step instructions to host your website for free</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content Container */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar Steps */}
          <div className="w-1/3 border-r border-slate-200 bg-slate-50 p-4 hidden md:block overflow-y-auto">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">Milestones</h3>
            <div className="space-y-2">
              {steps.map((step, idx) => {
                const isActive = activeStep === idx;
                const isCompleted = completedSteps[idx];
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className={`w-full text-left p-3 rounded-xl transition-all flex items-center gap-3 border ${
                      isActive 
                        ? 'bg-amber-500/10 border-amber-500/30 text-slate-900' 
                        : 'border-transparent text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg ${isActive ? 'bg-amber-500 text-slate-900' : 'bg-slate-200 text-slate-500'}`}>
                      {step.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-semibold text-amber-600">Step {idx + 1}</span>
                        {isCompleted && <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />}
                      </div>
                      <p className="text-sm font-medium truncate">{step.title}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 p-4 bg-slate-100 rounded-xl border border-slate-200">
              <div className="flex gap-2 items-start text-xs text-slate-600">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <p>
                  <strong>Why Vercel?</strong> Vercel provides lightning-fast edge hosting with direct git-integrated push-to-deploy, free SSL certificates, and custom domain linking.
                </p>
              </div>
            </div>
          </div>

          {/* Active Step Details */}
          <div className="flex-1 p-6 overflow-y-auto">
            {/* Mobile navigation indicator */}
            <div className="md:hidden mb-4 flex items-center justify-between bg-amber-50 p-3 rounded-xl border border-amber-200 text-sm">
              <span className="font-bold text-amber-800">Step {activeStep + 1} of {steps.length}:</span>
              <span className="text-slate-800 font-medium">{steps[activeStep].title}</span>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">Active Step</span>
                <h3 className="text-2xl font-bold font-display text-slate-900 flex items-center gap-2">
                  {steps[activeStep].title}
                </h3>
                <p className="text-slate-600 text-sm mt-1">{steps[activeStep].description}</p>
              </div>

              {/* Checkbox for completion */}
              <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-100 transition-all select-none">
                <input
                  type="checkbox"
                  checked={completedSteps[activeStep]}
                  onChange={() => toggleStepCompleted(activeStep)}
                  className="w-5 h-5 rounded text-amber-500 border-slate-300 focus:ring-amber-500 cursor-pointer"
                />
                <span className="text-sm font-medium text-slate-700">Mark this milestone as completed</span>
              </label>

              {/* Instructions */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Instructions</h4>
                <ul className="space-y-2">
                  {steps[activeStep].instructions.map((inst, idx) => (
                    <li key={idx} className="flex gap-2.5 text-sm text-slate-600 items-start">
                      <span className="flex items-center justify-center bg-slate-100 text-slate-700 font-mono text-xs w-5 h-5 rounded-full shrink-0 mt-0.5 border border-slate-200">
                        {idx + 1}
                      </span>
                      <span>{inst}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Commands Section */}
              {steps[activeStep].commands.length > 0 && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Terminal Commands</h4>
                    <span className="text-xs text-slate-400">Copy & run in your workspace root</span>
                  </div>
                  <div className="bg-slate-900 rounded-xl p-4 font-mono text-xs text-slate-300 space-y-2 relative border border-slate-800 shadow-inner">
                    {steps[activeStep].commands.map((cmd, idx) => (
                      <div key={idx} className="flex justify-between items-center py-1 border-b border-slate-800/50 last:border-0 hover:bg-slate-800/30 px-1 rounded transition-colors group">
                        <span className="text-emerald-400 select-all flex-1 pr-4">
                          <span className="text-slate-500 mr-2">$</span>
                          {cmd}
                        </span>
                        <button
                          onClick={() => handleCopy(cmd, idx)}
                          className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                          title="Copy command"
                        >
                          {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer controls */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-between items-center">
          <button
            onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
            disabled={activeStep === 0}
            className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-100 transition-colors text-sm font-medium disabled:opacity-50 disabled:pointer-events-none"
          >
            Previous Step
          </button>

          <div className="flex gap-2">
            {activeStep < steps.length - 1 ? (
              <button
                onClick={() => {
                  toggleStepCompleted(activeStep);
                  setActiveStep(prev => prev + 1);
                }}
                className="px-5 py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all text-sm font-medium flex items-center gap-2 shadow"
              >
                Next Step <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="px-5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all text-sm font-bold flex items-center gap-2 shadow"
              >
                Got It, Thanks! <CheckCircle className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
