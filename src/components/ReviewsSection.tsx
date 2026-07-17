/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, MessageSquare, Plus, CheckCircle, ShieldAlert, Sparkles, User, LogIn } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ReviewsSectionProps {
  onOpenAuth: (mode: 'login' | 'signup') => void;
}

export default function ReviewsSection({ onOpenAuth }: ReviewsSectionProps) {
  const { currentUser, reviews, addReview, addDemoReviews } = useApp();
  
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Calculate statistics
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1) 
    : '0.0';

  const countByStars = (stars: number) => {
    return reviews.filter(r => r.rating === stars).length;
  };

  const getPercentage = (stars: number) => {
    if (totalReviews === 0) return 0;
    return (countByStars(stars) / totalReviews) * 100;
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!comment.trim()) {
      setErrorMsg('Please write your review feedback first!');
      return;
    }

    const res = addReview(rating, comment);
    if (res.success) {
      setSuccessMsg('Thank you! Your feedback has been logged onto our live reviews feed.');
      setComment('');
      setRating(5);
      setTimeout(() => setSuccessMsg(''), 4000);
    } else {
      setErrorMsg(res.error || 'Failed to submit review.');
    }
  };

  return (
    <section id="reviews" className="py-16 md:py-24 bg-white relative overflow-hidden text-slate-900">
      {/* Background blobs */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-full">
            Community Voices
          </span>
          <h3 className="text-3xl md:text-4xl font-display font-extrabold text-slate-900 tracking-tight mt-4">
            Parent & Guardian Testimonials
          </h3>
          <p className="text-slate-500 text-sm md:text-base mt-2">
            Read transparent ratings and reviews shared by our student community. Log in to your personal profile to leave your own experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Block: Rating Stats and Form */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Stats Summary Card */}
            <div className="p-6 bg-slate-50 border border-slate-100 rounded-3xl shadow-sm space-y-4">
              <h4 className="text-sm font-black uppercase text-slate-500 tracking-wider">Overall Rating Summary</h4>
              <div className="flex items-center gap-6">
                <div>
                  <span className="text-5xl font-extrabold text-slate-900 tracking-tight font-display">{averageRating}</span>
                  <span className="text-sm text-slate-400 block mt-0.5">out of 5 stars</span>
                </div>
                <div className="flex-1 space-y-1.5">
                  {[5, 4, 3, 2, 1].map((stars) => (
                    <div key={stars} className="flex items-center gap-2 text-xs">
                      <span className="w-3 font-bold text-slate-600">{stars}</span>
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />
                      <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-amber-500 transition-all duration-500" 
                          style={{ width: `${getPercentage(stars)}%` }}
                        ></div>
                      </div>
                      <span className="w-7 text-right text-slate-400 font-medium font-mono">{countByStars(stars)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-[11px] text-slate-400 text-center pt-2 border-t border-slate-200">
                Verified logs loaded from local persistence layer.
              </div>
            </div>

            {/* Interactive Write a Review Panel (Auth-gated) */}
            <div className="p-6 bg-white border border-slate-200 rounded-3xl shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h4 className="text-sm font-black uppercase text-slate-800 tracking-wider flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-amber-500" />
                  <span>Share Your Experience</span>
                </h4>
                {currentUser && (
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                    Signed In
                  </span>
                )}
              </div>

              {currentUser ? (
                /* Authenticated Review Form */
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  {errorMsg && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-medium">
                      ⚠️ {errorMsg}
                    </div>
                  )}
                  {successMsg && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-700 font-semibold flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      <span>{successMsg}</span>
                    </div>
                  )}

                  {/* Star Rating Selector */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Select Rating Stars</label>
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((starIdx) => {
                        const isFilled = hoveredRating !== null ? starIdx <= hoveredRating : starIdx <= rating;
                        return (
                          <button
                            key={starIdx}
                            type="button"
                            onMouseEnter={() => setHoveredRating(starIdx)}
                            onMouseLeave={() => setHoveredRating(null)}
                            onClick={() => setRating(starIdx)}
                            className="p-1 hover:scale-110 transition-transform cursor-pointer"
                          >
                            <Star 
                              className={`w-7 h-7 transition-colors ${
                                isFilled ? 'text-amber-500 fill-amber-500' : 'text-slate-200'
                              }`} 
                            />
                          </button>
                        );
                      })}
                      <span className="text-xs font-bold text-slate-500 ml-2">
                        {rating === 5 ? 'Excellent' : rating === 4 ? 'Very Good' : rating === 3 ? 'Good' : rating === 2 ? 'Fair' : 'Needs Improvement'}
                      </span>
                    </div>
                  </div>

                  {/* Comment Input */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Review Comments</label>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Share your thoughts about Gyan Bharti Public School (academics, teachers, activities, campus life)..."
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 min-h-[90px] resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-850 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm hover:-translate-y-0.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Submit Review</span>
                  </button>
                </form>
              ) : (
                /* Unauthenticated Sign-In Gate Callout */
                <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-5 text-center space-y-4">
                  <div className="w-10 h-10 bg-amber-500/10 text-amber-600 rounded-full flex items-center justify-center mx-auto border border-amber-500/20">
                    <Star className="w-5 h-5 text-amber-500" />
                  </div>
                  <div className="space-y-1">
                    <h5 className="text-xs font-black text-slate-800 uppercase tracking-wider">Authentication Required</h5>
                    <p className="text-[11px] text-slate-400 leading-relaxed max-w-xs mx-auto">
                      Only registered students, parents or guardians can leave a public review. Registration is free and takes 5 seconds!
                    </p>
                  </div>
                  <button
                    onClick={() => onOpenAuth('signup')}
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-amber-500 rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                  >
                    <LogIn className="w-3.5 h-3.5 text-amber-500" />
                    <span>Register / Log In</span>
                  </button>
                </div>
              )}

            </div>

          </div>

          {/* Right Block: Live Scroll Feed of testimonials */}
          <div className="lg:col-span-7 space-y-4">
            
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold uppercase tracking-wider">
                <span>Latest Reviews</span>
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              </div>
              <button 
                onClick={addDemoReviews}
                className="text-[10px] text-amber-600 hover:text-amber-700 font-bold flex items-center gap-1 bg-amber-500/5 hover:bg-amber-500/10 border border-amber-500/10 hover:border-amber-500/20 px-2.5 py-1 rounded transition-colors cursor-pointer"
              >
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>Inject Demo Reviews</span>
              </button>
            </div>

            {reviews.length === 0 ? (
              <div className="p-12 text-center text-slate-400 border border-dashed border-slate-200 rounded-3xl">
                No custom reviews logged. Try injecting demo reviews or sign in to submit yours!
              </div>
            ) : (
              <div className="space-y-4 max-h-[460px] overflow-y-auto pr-1">
                {reviews.map((rev) => (
                  <motion.div
                    key={rev.id}
                    layoutId={rev.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-5 bg-white border border-slate-150 rounded-2xl shadow-sm space-y-3 hover:border-slate-300 transition-colors"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 text-slate-600 overflow-hidden shrink-0">
                          {rev.userAvatar ? (
                            <img src={rev.userAvatar} alt={rev.userName} className="w-full h-full object-cover" />
                          ) : (
                            <User className="w-4 h-4 text-slate-400" />
                          )}
                        </div>
                        <div>
                          <h5 className="text-xs font-bold text-slate-900 leading-none">{rev.userName}</h5>
                          <span className="text-[10px] text-slate-400 font-mono mt-1 block">{rev.userEmail}</span>
                        </div>
                      </div>
                      <span className="text-[9px] font-mono text-slate-400 font-medium">{rev.createdAt}</span>
                    </div>

                    {/* Star count */}
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star 
                          key={idx} 
                          className={`w-3.5 h-3.5 ${
                            idx < rev.rating ? 'text-amber-500 fill-amber-500' : 'text-slate-200'
                          }`} 
                        />
                      ))}
                    </div>

                    {/* Comment */}
                    <p className="text-xs text-slate-600 leading-relaxed font-sans italic">
                      "{rev.comment}"
                    </p>
                  </motion.div>
                ))}
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
