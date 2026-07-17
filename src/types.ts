/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SchoolInquiry {
  id: string;
  studentName: string;
  className: string;
  parentName: string;
  phone: string;
  email: string;
  message?: string;
  submittedAt: string;
  status: 'Pending Review' | 'Contacted' | 'Approved' | 'Declined';
  emailLogs?: Array<{
    subject: string;
    sentAt: string;
    type: 'Approved' | 'Declined';
    body: string;
  }>;
}

export interface User {
  email: string;
  name: string;
  role: 'user' | 'admin';
  avatar?: string;
}

export interface Review {
  id: string;
  userName: string;
  userEmail: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'Admissions' | 'Academics' | 'Facilities' | 'General';
}

export interface AcademicGrade {
  level: string;
  classes: string;
  description: string;
  subjects: string[];
  features: string[];
}
