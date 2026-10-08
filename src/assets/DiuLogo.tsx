import React from 'react';

interface DiuLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  monochrome?: boolean;
}

/**
 * Official DIU Crest Shield Emblem SVG
 */
export const DiuShieldEmblem: React.FC<{ className?: string; size?: number | string }> = ({
  className = '',
  size = 72
}) => {
  return (
    <svg
      viewBox="0 0 120 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: size, height: 'auto' }}
      className={`shrink-0 select-none ${className}`}
      aria-label="Daffodil International University Crest"
    >
      {/* Outer Green Laurel Wreath / Ribbon */}
      <path
        d="M20 70 C 14 85, 20 105, 38 120 C 48 128, 55 132, 60 134 C 65 132, 72 128, 82 120 C 100 105, 106 85, 100 70 C 96 85, 88 100, 75 110 C 68 116, 62 118, 60 119 C 58 118, 52 116, 45 110 C 32 100, 24 85, 20 70 Z"
        fill="#22c55e"
      />
      <path
        d="M22 72 C 16 88, 22 106, 40 120 C 35 110, 28 95, 26 80 Z"
        fill="#15803d"
      />
      <path
        d="M98 72 C 104 88, 98 106, 80 120 C 85 110, 92 95, 94 80 Z"
        fill="#15803d"
      />

      {/* Main Shield Outline & Background */}
      <path
        d="M26 28 C 45 28, 55 24, 60 20 C 65 24, 75 28, 94 28 C 96 68, 90 98, 60 118 C 30 98, 24 68, 26 28 Z"
        fill="#ffffff"
        stroke="#1e3a8a"
        strokeWidth="3"
      />

      {/* Top Navy Header Band in Shield */}
      <path
        d="M27 29 C 45 29, 55 25, 60 21 C 65 25, 75 29, 93 29 C 94 44, 93 54, 91 58 L 29 58 C 27 54, 26 44, 27 29 Z"
        fill="#1e3a8a"
      />

      {/* Tiny Star on top */}
      <polygon
        points="60,25 61,28 64,28 61.5,30 62.5,33 60,31 57.5,33 58.5,30 56,28 59,28"
        fill="#ffffff"
      />

      {/* "Daffodil International University" text in top arch */}
      <text
        x="60"
        y="42"
        textAnchor="middle"
        fill="#ffffff"
        fontSize="5"
        fontWeight="bold"
        fontFamily="sans-serif"
        letterSpacing="0.2"
      >
        Daffodil International University
      </text>

      {/* Inner Central Globe / Orbit Field */}
      <circle cx="60" cy="74" r="22" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
      {/* Globe Lat/Long lines */}
      <ellipse cx="60" cy="74" rx="22" ry="9" stroke="#38bdf8" strokeWidth="1" fill="none" />
      <ellipse cx="60" cy="74" rx="11" ry="22" stroke="#38bdf8" strokeWidth="1" fill="none" />
      <line x1="60" y1="52" x2="60" y2="96" stroke="#38bdf8" strokeWidth="1" />
      <line x1="38" y1="74" x2="82" y2="74" stroke="#38bdf8" strokeWidth="1" />

      {/* Outer Orbit Rings around globe */}
      <ellipse
        cx="60"
        cy="74"
        rx="27"
        ry="7"
        stroke="#38bdf8"
        strokeWidth="1.2"
        fill="none"
        transform="rotate(-25 60 74)"
      />
      <ellipse
        cx="60"
        cy="74"
        rx="27"
        ry="7"
        stroke="#38bdf8"
        strokeWidth="1.2"
        fill="none"
        transform="rotate(25 60 74)"
      />

      {/* Open Book in the center of the globe */}
      <path
        d="M48 70 C 54 67, 58 68, 60 72 C 62 68, 66 67, 72 70 L 72 78 C 66 75, 62 76, 60 80 C 58 76, 54 75, 48 78 Z"
        fill="#ffffff"
        stroke="#1e3a8a"
        strokeWidth="1.2"
      />
      <line x1="60" y1="72" x2="60" y2="80" stroke="#1e3a8a" strokeWidth="1.2" />

      {/* Lower Navy Blue Band for "D I U" */}
      <path
        d="M31 92 C 42 102, 54 107, 60 109 C 66 107, 78 102, 89 92 L 85 84 C 76 92, 66 96, 60 97 C 54 96, 44 92, 35 84 Z"
        fill="#1e3a8a"
      />
      <text
        x="60"
        y="99"
        textAnchor="middle"
        fill="#ffffff"
        fontSize="10"
        fontWeight="900"
        fontFamily="sans-serif"
        letterSpacing="3"
      >
        DIU
      </text>

      {/* Red Rosette / Dot at the bottom apex */}
      <circle cx="60" cy="126" r="4.5" fill="#ef4444" stroke="#ffffff" strokeWidth="1" />
    </svg>
  );
};

/**
 * Full Official DIU Logo Lockup (Matching Uploaded Sample Covers)
 * Emblem on the left + "Daffodil International University" brand text on right
 */
export const DiuLogo: React.FC<DiuLogoProps> = ({
  className = '',
  size = 'md',
  monochrome = false
}) => {
  const emblemSize = {
    sm: 52,
    md: 76,
    lg: 88,
    xl: 98
  }[size];

  return (
    <div className={`flex items-center gap-3.5 select-none ${className}`}>
      {/* DIU Shield Crest Emblem */}
      <DiuShieldEmblem size={emblemSize} />

      {/* Typography Lockup */}
      <div className="flex flex-col text-left leading-none">
        {/* "Daffodil" in bold italic blue */}
        <span
          className="text-3xl sm:text-4xl font-extrabold italic tracking-tight"
          style={{
            color: monochrome ? '#1e293b' : '#084282',
            fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          }}
        >
          Daffodil
        </span>

        {/* "International" in dark cursive script font across baseline */}
        <span
          className="text-lg sm:text-xl font-normal italic -mt-2.5 ml-2.5 select-none tracking-normal"
          style={{
            color: monochrome ? '#475569' : '#334155',
            fontFamily: "'Brush Script MT', 'Dancing Script', 'Caveat', 'Segoe Script', cursive, serif"
          }}
        >
          International
        </span>

        {/* "University" in green bold sans font */}
        <span
          className="text-2xl sm:text-3xl font-extrabold tracking-tight -mt-1.5"
          style={{
            color: monochrome ? '#334155' : '#16a34a',
            fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          }}
        >
          University
        </span>
      </div>
    </div>
  );
};

/**
 * Large Central DIU Shield Watermark for Document Background
 */
export const DiuWatermark: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`absolute inset-0 flex items-center justify-center pointer-events-none z-0 select-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div className="opacity-[0.11] transform scale-[2.7] sm:scale-[3.2] transition-transform">
        <DiuShieldEmblem size={130} />
      </div>
    </div>
  );
};
