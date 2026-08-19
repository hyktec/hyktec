import React from 'react';
import { HyktecLogo } from '../brand/HyktecLogo';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-navy-950 text-white">
      <div className="relative flex flex-col items-center space-y-4">
        {/* Glow backdrop */}
        <div className="absolute -inset-4 bg-hyktec-pink/20 blur-xl rounded-full animate-pulse" />

        <HyktecLogo theme="dark" size="xl" showTagline={true} />

        {/* Minimal progress line */}
        <div className="w-48 h-1 bg-slate-800 rounded-full overflow-hidden mt-6 relative">
          <div className="h-full bg-gradient-to-r from-hyktec-pink to-hyktec-red w-full animate-pulse" />
        </div>
      </div>
    </div>
  );
};
