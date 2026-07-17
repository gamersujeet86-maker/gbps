/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface SchoolLogoProps {
  className?: string;
}

export default function SchoolLogo({ className = 'w-16 h-16' }: SchoolLogoProps) {
  return (
    <svg 
      viewBox="0 0 200 200" 
      className={`${className} select-none`}
      aria-label="Gyan Bharti Public School Logo"
    >
      {/* Outer subtle drop shadow/glow for premium feel */}
      <defs>
        <filter id="logo-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.1" />
        </filter>
        {/* Curved path for arched text "GYAN BHARTI PUBLIC SCHOOL" */}
        {/* Moving clockwise along the top arc */}
        <path 
          id="text-path-top" 
          d="M 24,105 A 76,76 0 1,1 176,105" 
          fill="none" 
        />
      </defs>

      {/* Main Base Circle background */}
      <circle cx="100" cy="100" r="94" fill="#ffffff" stroke="#1e3a8a" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="89" fill="none" stroke="#eab308" strokeWidth="1" />

      {/* Inner Emblem Boundary */}
      <circle cx="100" cy="100" r="60" fill="none" stroke="#1e3a8a" strokeWidth="2.5" />

      {/* Arched Header Text */}
      <text 
        fill="#dc2626" 
        fontWeight="900" 
        fontFamily="'Inter', 'Space Grotesk', sans-serif" 
        fontSize="12.5" 
        letterSpacing="0.8"
      >
        <textPath href="#text-path-top" startOffset="50%" textAnchor="middle">
          GYAN BHARTI PUBLIC SCHOOL
        </textPath>
      </text>

      {/* Center Emblem: Stylized Learner wearing graduation cap */}
      <g id="center-student-emblem">
        {/* Left Swooping Arm / Wing (Gold) */}
        <path 
          d="M 97,146 C 76,144 64,128 64,110 C 64,98 71,94 71,94 C 71,94 69,101 73,110 C 78,119 88,131 97,134 Z" 
          fill="#eab308" 
        />
        
        {/* Right Swooping Arm / Wing (Navy Blue) */}
        <path 
          d="M 103,146 C 124,144 136,128 136,110 C 136,98 129,94 129,94 C 129,94 131,101 127,110 C 122,119 112,131 103,134 Z" 
          fill="#1e3a8a" 
        />

        {/* Core Body Stem Connecting Wings */}
        <path 
          d="M 97,146 L 103,146 L 101,114 L 99,114 Z" 
          fill="#1e3a8a" 
        />

        {/* Head (Dark Blue Circle) */}
        <circle cx="100" cy="94" r="9" fill="#1e3a8a" />

        {/* Graduation Cap / Mortarboard */}
        {/* Cap Diamond top */}
        <polygon points="100,75 118,81 100,87 82,81" fill="#1e3a8a" />
        {/* Cap base band under the diamond */}
        <path d="M 92,82 L 108,82 L 105,86 L 95,86 Z" fill="#1e3a8a" />
        {/* Tassel on the left side */}
        <path d="M 88,81.5 L 85,87 L 86,88" stroke="#eab308" strokeWidth="1" fill="none" />
        <circle cx="86" cy="88" r="1.2" fill="#eab308" />
      </g>

      {/* Bottom Horizontal Motto Text */}
      <text 
        x="100" 
        y="172" 
        fill="#dc2626" 
        fontWeight="900" 
        fontFamily="'Inter', 'Space Grotesk', sans-serif" 
        fontSize="10" 
        textAnchor="middle" 
        letterSpacing="0.4"
      >
        VIDYA VINIYOGAT VIKASAH
      </text>
    </svg>
  );
}
