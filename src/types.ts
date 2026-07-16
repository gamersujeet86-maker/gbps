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
  status: 'Pending Review' | 'Contacted' | 'Approved';
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
