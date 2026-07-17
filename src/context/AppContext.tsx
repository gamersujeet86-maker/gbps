/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SchoolInquiry, User, Review } from '../types';

interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  savedInquiries: SchoolInquiry[];
  setSavedInquiries: React.Dispatch<React.SetStateAction<SchoolInquiry[]>>;
  reviews: Review[];
  setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
  login: (email: string, password: string) => { success: boolean; error?: string };
  signup: (name: string, email: string) => { success: boolean; error?: string };
  loginWithGoogle: () => void;
  logout: () => void;
  addReview: (rating: number, comment: string) => { success: boolean; error?: string };
  updateInquiryStatus: (id: string, status: 'Pending Review' | 'Contacted' | 'Approved' | 'Declined') => void;
  addDemoReviews: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [savedInquiries, setSavedInquiries] = useState<SchoolInquiry[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  // Load state on mount
  useEffect(() => {
    // 1. Auth State
    const storedUser = localStorage.getItem('gbps_user');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('gbps_user');
      }
    }

    // 2. Inquiries
    const storedInquiries = localStorage.getItem('gbps_inquiries');
    if (storedInquiries) {
      try {
        setSavedInquiries(JSON.parse(storedInquiries));
      } catch (e) {}
    }

    // 3. Reviews
    const storedReviews = localStorage.getItem('gbps_reviews');
    if (storedReviews) {
      try {
        setReviews(JSON.parse(storedReviews));
      } catch (e) {}
    } else {
      // Default initial reviews for gorgeous social proof
      const defaultReviews: Review[] = [
        {
          id: 'rev-1',
          userName: 'Dr. Amit Bansal',
          userEmail: 'amit.bansal@gmail.com',
          rating: 5,
          comment: 'Outstanding educational standards! The balance between rigorous curriculum pillars and character values has made a visible difference in my daughter\'s communication skills.',
          createdAt: '10 July 2026'
        },
        {
          id: 'rev-2',
          userName: 'Meenakshi Yadav',
          userEmail: 'meenakshi.y@outlook.com',
          rating: 5,
          comment: 'Very polite and helpful staff. The admissions flow was incredibly organized, and the school campus environment is exceptionally positive and clean.',
          createdAt: '14 July 2026'
        }
      ];
      setReviews(defaultReviews);
      localStorage.setItem('gbps_reviews', JSON.stringify(defaultReviews));
    }
  }, []);

  // Standard Login (Admin or User)
  const login = (email: string, password: string) => {
    const cleanEmail = email.toLowerCase().trim();
    if (cleanEmail === 'admin@gmail.com' && password === 'admin123') {
      const adminUser: User = {
        email: 'admin@gmail.com',
        name: 'Staff Administrator',
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100'
      };
      setCurrentUser(adminUser);
      localStorage.setItem('gbps_user', JSON.stringify(adminUser));
      return { success: true };
    }

    // Simple user sign in
    if (cleanEmail && password.length >= 6) {
      // Auto-extract name from email for mock user
      const nameParts = cleanEmail.split('@')[0];
      const capitalizedName = nameParts.charAt(0).toUpperCase() + nameParts.slice(1);
      const regularUser: User = {
        email: cleanEmail,
        name: capitalizedName,
        role: 'user',
        avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${cleanEmail}`
      };
      setCurrentUser(regularUser);
      localStorage.setItem('gbps_user', JSON.stringify(regularUser));
      return { success: true };
    }

    return { 
      success: false, 
      error: 'Invalid password. Please enter a password of at least 6 characters.' 
    };
  };

  // User Sign Up
  const signup = (name: string, email: string) => {
    const cleanEmail = email.toLowerCase().trim();
    if (!name.trim() || !cleanEmail) {
      return { success: false, error: 'Please fill in all details.' };
    }
    const newUser: User = {
      email: cleanEmail,
      name: name.trim(),
      role: 'user',
      avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${cleanEmail}`
    };
    setCurrentUser(newUser);
    localStorage.setItem('gbps_user', JSON.stringify(newUser));
    return { success: true };
  };

  // Mock Google Sign In
  const loginWithGoogle = () => {
    const googleUser: User = {
      email: 'user.google@gmail.com',
      name: 'Google Learner Account',
      role: 'user',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100'
    };
    setCurrentUser(googleUser);
    localStorage.setItem('gbps_user', JSON.stringify(googleUser));
  };

  // Sign out
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('gbps_user');
  };

  // Write review
  const addReview = (rating: number, comment: string) => {
    if (!currentUser) {
      return { success: false, error: 'You must be signed in to submit a review!' };
    }
    if (rating < 1 || rating > 5 || !comment.trim()) {
      return { success: false, error: 'Please select a rating and enter your experience.' };
    }

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      userName: currentUser.name,
      userEmail: currentUser.email,
      userAvatar: currentUser.avatar,
      rating,
      comment: comment.trim(),
      createdAt: new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem('gbps_reviews', JSON.stringify(updated));
    return { success: true };
  };

  // Admin: Update Inquiry status and log simulated email dispatch
  const updateInquiryStatus = (id: string, status: 'Pending Review' | 'Contacted' | 'Approved' | 'Declined') => {
    const updated = savedInquiries.map(item => {
      if (item.id === id) {
        // Prepare new email log
        const emailLogs = item.emailLogs || [];
        
        let emailSubject = '';
        let emailBody = '';
        const nowStr = new Date().toLocaleString('en-GB', { 
          day: 'numeric', 
          month: 'long', 
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        });

        if (status === 'Approved') {
          emailSubject = `Congratulations! Admission Status Approved - Gyan Bharti Public School`;
          emailBody = `Dear Parent/Guardian ${item.parentName},\n\nWe are delighted to inform you that your admission application for student "${item.studentName}" to standard "${item.className}" has been APPROVED.\n\nOur administrative staff will connect with you via your registered telephone number (+91 ${item.phone}) within 24 hours to schedule the official orientation and verification of documents.\n\nWarm regards,\nGyan Bharti Admissions Board\nBallabhgarh, Haryana`;
        } else if (status === 'Declined') {
          emailSubject = `Admission Decision Notice - Gyan Bharti Public School`;
          emailBody = `Dear Parent/Guardian ${item.parentName},\n\nThank you for your interest in Gyan Bharti Public School. After a careful assessment of current standard class capacity and matching criteria, we regret to inform you that we are unable to approve admission for student "${item.studentName}" for standard "${item.className}" at this time.\n\nWe have registered your details on our waitlist. Should seating capacity open up, our support desk will contact you instantly.\n\nWarm regards,\nGyan Bharti Admissions Board\nBallabhgarh, Haryana`;
        }

        const newLogs = [...emailLogs];
        if (status === 'Approved' || status === 'Declined') {
          newLogs.push({
            subject: emailSubject,
            sentAt: nowStr,
            type: status,
            body: emailBody
          });
        }

        return {
          ...item,
          status,
          emailLogs: newLogs
        };
      }
      return item;
    });

    setSavedInquiries(updated);
    localStorage.setItem('gbps_inquiries', JSON.stringify(updated));
  };

  const addDemoReviews = () => {
    const demos: Review[] = [
      {
        id: 'rev-d1',
        userName: 'Siddharth Saxena',
        userEmail: 'siddharth@gmail.com',
        rating: 5,
        comment: 'Gyan Bharti Public School stands out for its wonderful teaching ethics. The emphasis on both public speaking and environmental clubs builds excellent real-world confidence.',
        createdAt: '15 July 2026'
      },
      {
        id: 'rev-d2',
        userName: 'Kavita Chawla',
        userEmail: 'kavita.chawla@yahoo.com',
        rating: 4,
        comment: 'Great infrastructure and very secure campus. Faculty members are extremely cooperative and provide customized attention to primary grade students.',
        createdAt: '16 July 2026'
      }
    ];
    const updated = [...reviews, ...demos];
    setReviews(updated);
    localStorage.setItem('gbps_reviews', JSON.stringify(updated));
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      setCurrentUser,
      savedInquiries,
      setSavedInquiries,
      reviews,
      setReviews,
      login,
      signup,
      loginWithGoogle,
      logout,
      addReview,
      updateInquiryStatus,
      addDemoReviews
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
