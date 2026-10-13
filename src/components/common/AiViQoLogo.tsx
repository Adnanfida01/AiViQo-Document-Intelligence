import React from 'react';
import { motion } from 'motion/react';

interface AiViQoLogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
  subtitle?: string;
  isAnimated?: boolean;
}

export const AiViQoLogo: React.FC<AiViQoLogoProps> = ({
  size = 38,
  className = '',
  showText = false,
  subtitle = 'DOCUMENT INTELLIGENCE',
  isAnimated = true,
}) => {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* AiViQo Brand Logo Emblem with Ambient Glow & Animated Specular */}
      <motion.div
        whileHover={isAnimated ? { scale: 1.05, rotate: 2 } : undefined}
        whileTap={isAnimated ? { scale: 0.96 } : undefined}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="relative rounded-2xl p-[1.5px] bg-gradient-to-br from-[#00D2FF] via-[#0066FF] to-[#1E3A8A] shadow-lg shadow-[#0066FF]/35 group cursor-pointer"
        style={{ width: size, height: size }}
      >
        {/* Ambient Pulsing Aura */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#00D2FF]/40 to-[#0066FF]/20 blur-md opacity-75 group-hover:opacity-100 transition-opacity" />

        {/* Inner Emblem Surface */}
        <div className="relative w-full h-full rounded-[14px] bg-[#0A1224] overflow-hidden flex items-center justify-center border border-white/20">
          
          {/* Subtle Dynamic Mesh Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0066FF]/80 via-[#0047BA] to-[#02102B]" />

          {/* Shimmer Angle Sweep */}
          <div className="absolute -inset-full bg-gradient-to-tr from-transparent via-white/20 to-transparent rotate-45 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

          {/* Precision AiViQo Wing Mark SVG */}
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full p-1.5 relative z-10 drop-shadow-md"
          >
            {/* Soft Shadow Filter */}
            <defs>
              <filter id="glowMark" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#000" floodOpacity="0.45" />
              </filter>
            </defs>

            {/* Crescent Arc on Upper Left (Crest) */}
            <path
              d="M26 58C22 52 21 44 23 37C26 26 36 17 48 16C60 15 70 21 75 31C78 37 78 44 74 50C71 54 66 57 60 56C55 55 53 49 55 44C57 40 59 36 57 32C54 27 47 25 42 26C36 27 31 32 30 38C29 44 32 50 36 54C40 57 41 63 37 67C33 70 28 66 26 58Z"
              fill="white"
              filter="url(#glowMark)"
            />

            {/* Upper Diagonal Wing Swoosh */}
            <path
              d="M87 28C79 38 68 49 57 59C45 70 33 80 20 88C32 83 44 75 56 66C68 56 80 44 87 28Z"
              fill="white"
              filter="url(#glowMark)"
            />

            {/* Lower Diagonal Wing Swoosh */}
            <path
              d="M89 52C82 61 72 70 61 79C50 87 39 94 28 99C38 95 49 89 59 81C70 72 81 63 89 52Z"
              fill="#E0F7FF"
              filter="url(#glowMark)"
            />

            {/* Cyan Energy Spark in Core */}
            <circle cx="58" cy="46" r="3" fill="#00D2FF" className="animate-pulse" />
          </svg>
        </div>
      </motion.div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold tracking-tight text-white leading-tight font-sans flex items-center">
              AiViQo
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF] ml-1 shadow-[0_0_8px_#00D2FF] animate-pulse" />
            </span>
            <span className="text-[11px] font-medium px-1.5 py-0.5 rounded-md bg-white/[0.08] text-slate-300 border border-white/10">
              v4.2
            </span>
          </div>
          <span className="text-xs text-[#00D2FF] font-medium tracking-normal mt-0.5">
            {subtitle}
          </span>
        </div>
      )}
    </div>
  );
};
