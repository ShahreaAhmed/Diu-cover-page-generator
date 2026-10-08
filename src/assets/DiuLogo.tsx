import React from 'react';

interface DiuLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  monochrome?: boolean;
  variant?: 'full' | 'emblem_only' | 'stacked';
}

export const DiuLogo: React.FC<DiuLogoProps> = ({
  className = '',
  size = 'md',
  monochrome = false,
  variant = 'full'
}) => {
  const navyColor = monochrome ? '#1e293b' : '#0a3663';
  const greenColor = monochrome ? '#334155' : '#00843d';
  const goldColor = monochrome ? '#475569' : '#d97706';

  const sizeClasses = {
    sm: 'h-10',
    md: 'h-16',
    lg: 'h-20',
    xl: 'h-24'
  }[size];

  if (variant === 'emblem_only') {
    return (
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${sizeClasses} w-auto ${className}`}
        aria-label="DIU Emblem"
      >
        {/* Outer Circular Shield Trim */}
        <circle cx="50" cy="50" r="46" stroke={navyColor} strokeWidth="3" />
        <circle cx="50" cy="50" r="42" stroke={goldColor} strokeWidth="1" strokeDasharray="2 2" />

        {/* Open Book Foundation */}
        <path
          d="M20 68 C 32 64, 45 66, 50 72 C 55 66, 68 64, 80 68 L 80 75 C 68 71, 55 73, 50 78 C 45 73, 32 71, 20 75 Z"
          fill={navyColor}
        />
        <path
          d="M20 63 C 32 59, 45 61, 50 67 C 55 61, 68 59, 80 63 L 80 65 C 68 61, 55 63, 50 69 C 45 63, 32 61, 20 65 Z"
          fill={goldColor}
        />

        {/* Rising Petals / Sprout Wings (Daffodil Blossom & Torch of Knowledge) */}
        {/* Left Outer Wing */}
        <path
          d="M50 62 C 40 54, 30 46, 28 32 C 34 33, 44 42, 50 56 Z"
          fill={navyColor}
        />
        {/* Left Inner Wing */}
        <path
          d="M50 58 C 42 46, 38 34, 38 22 C 45 25, 48 38, 50 52 Z"
          fill={greenColor}
        />
        {/* Center Flame / Sprout */}
        <path
          d="M50 16 C 53 28, 54 40, 50 56 C 46 40, 47 28, 50 16 Z"
          fill={goldColor}
        />
        {/* Right Inner Wing */}
        <path
          d="M50 58 C 58 46, 62 34, 62 22 C 55 25, 52 38, 50 52 Z"
          fill={greenColor}
        />
        {/* Right Outer Wing */}
        <path
          d="M50 62 C 60 54, 70 46, 72 32 C 66 33, 56 42, 50 56 Z"
          fill={navyColor}
        />

        {/* Star in Center */}
        <polygon
          points="50,26 51.5,30 55.5,30 52.2,32.5 53.5,36.5 50,34 46.5,36.5 47.8,32.5 44.5,30 48.5,30"
          fill={goldColor}
        />
      </svg>
    );
  }

  return (
    <div className={`flex items-center gap-3.5 select-none ${className}`}>
      {/* DIU Emblem SVG */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${sizeClasses} w-auto shrink-0`}
        aria-hidden="true"
      >
        <circle cx="50" cy="50" r="47" stroke={navyColor} strokeWidth="3" />
        <circle cx="50" cy="50" r="43" stroke={goldColor} strokeWidth="1.2" strokeDasharray="3 2" />

        {/* Open Book Foundation */}
        <path
          d="M20 68 C 32 64, 45 66, 50 72 C 55 66, 68 64, 80 68 L 80 75 C 68 71, 55 73, 50 78 C 45 73, 32 71, 20 75 Z"
          fill={navyColor}
        />
        <path
          d="M20 63 C 32 59, 45 61, 50 67 C 55 61, 68 59, 80 63 L 80 65 C 68 61, 55 63, 50 69 C 45 63, 32 61, 20 65 Z"
          fill={goldColor}
        />

        {/* Blossom Petals */}
        <path
          d="M50 62 C 40 54, 30 46, 28 32 C 34 33, 44 42, 50 56 Z"
          fill={navyColor}
        />
        <path
          d="M50 58 C 42 46, 38 34, 38 22 C 45 25, 48 38, 50 52 Z"
          fill={greenColor}
        />
        <path
          d="M50 16 C 53 28, 54 40, 50 56 C 46 40, 47 28, 50 16 Z"
          fill={goldColor}
        />
        <path
          d="M50 58 C 58 46, 62 34, 62 22 C 55 25, 52 38, 50 52 Z"
          fill={greenColor}
        />
        <path
          d="M50 62 C 60 54, 70 46, 72 32 C 66 33, 56 42, 50 56 Z"
          fill={navyColor}
        />

        <polygon
          points="50,26 51.5,30 55.5,30 52.2,32.5 53.5,36.5 50,34 46.5,36.5 47.8,32.5 44.5,30 48.5,30"
          fill={goldColor}
        />
      </svg>

      {/* Typography */}
      <div className="flex flex-col text-left leading-tight">
        <span
          style={{ color: navyColor, fontFamily: "'Lora', 'Merriweather', 'Georgia', serif" }}
          className="text-base sm:text-lg font-bold tracking-tight uppercase"
        >
          Daffodil International University
        </span>
        <span
          style={{ color: greenColor }}
          className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase mt-0.5"
        >
          Permanent Campus, Dhaka, Bangladesh
        </span>
        <span
          style={{ color: goldColor }}
          className="text-[9px] tracking-widest uppercase font-medium mt-0.5 opacity-90"
        >
          Education • Empowerment • Excellence
        </span>
      </div>
    </div>
  );
};
