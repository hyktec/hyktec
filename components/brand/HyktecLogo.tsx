import React from 'react';

interface HyktecLogoProps {
  theme?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
}

export const HyktecLogo: React.FC<HyktecLogoProps> = ({
  theme = 'dark',
  size = 'md',
  showTagline = false,
  className = '',
}) => {
  const sizeClasses = {
    sm: { text: 'text-lg', icon: 'w-6 h-6', tagline: 'text-[9px]' },
    md: { text: 'text-2xl', icon: 'w-8 h-8', tagline: 'text-[10px]' },
    lg: { text: 'text-3xl', icon: 'w-10 h-10', tagline: 'text-[11px]' },
    xl: { text: 'text-4xl', icon: 'w-12 h-12', tagline: 'text-xs' },
  }[size];

  const textColor = theme === 'dark' ? 'text-white' : 'text-navy-900';

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Precision Hyktec SVG Emblem */}
      <div className={`relative ${sizeClasses.icon} flex items-center justify-center`}>
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <linearGradient id="hyktecGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0A1128" />
              <stop offset="50%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#FF2E63" />
            </linearGradient>
            <linearGradient id="pinkRedGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF2E63" />
              <stop offset="100%" stopColor="#E63946" />
            </linearGradient>
          </defs>

          {/* Futuristic Hexagonal Tech Frame */}
          <path
            d="M20 2L36 11V29L20 38L4 29V11L20 2Z"
            fill="url(#hyktecGradient)"
            stroke={theme === 'dark' ? '#FF2E63' : '#0A1128'}
            strokeWidth="1.5"
          />

          {/* Dynamic Stylized 'H' Tech Core */}
          <path d="M12 12V28M28 12V28" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
          <path d="M12 20H28" stroke="url(#pinkRedGlow)" strokeWidth="3.5" strokeLinecap="round" />

          {/* Accent Tech Dots */}
          <circle cx="20" cy="12" r="2" fill="#FF2E63" />
          <circle cx="20" cy="28" r="2" fill="#FF2E63" />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <div className="flex items-center font-extrabold tracking-wider leading-none">
          <span className={`${sizeClasses.text} ${textColor}`}>HYK</span>
          <span className={`${sizeClasses.text} text-hyktec-pink`}>TEC</span>
        </div>

        {showTagline && (
          <span className={`${sizeClasses.tagline} font-medium tracking-widest uppercase mt-0.5 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Digital Tech & Growth
          </span>
        )}
      </div>
    </div>
  );
};
