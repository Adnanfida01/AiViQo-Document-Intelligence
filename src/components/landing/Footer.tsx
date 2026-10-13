import React from 'react';
import { ShieldCheck, Heart } from 'lucide-react';
import { AiViQoLogo } from '../common/AiViQoLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#04060B] border-t border-white/[0.08] py-12 text-slate-400 text-xs relative overflow-hidden">
      
      {/* Subtle bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[100px] bg-[#0066FF]/10 blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <AiViQoLogo size={32} showText={true} subtitle="DOCUMENT INTELLIGENCE PLATFORM" />
          </div>

          <div className="flex items-center flex-wrap gap-6 text-slate-300 font-medium text-xs">
            <a href="#canvas-section" className="hover:text-[#00D2FF] transition-colors">
              Evidence Canvas
            </a>
            <a href="#features" className="hover:text-[#00D2FF] transition-colors">
              Multi-Engine OCR
            </a>
            <a href="#workflow-showcase" className="hover:text-[#00D2FF] transition-colors">
              Discrepancy Engine
            </a>
            <span className="text-slate-500">·</span>
            <span className="flex items-center gap-1.5 text-emerald-400 font-mono">
              <ShieldCheck className="w-3.5 h-3.5" />
              SOC-2 Type II Certified
            </span>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>© 2026 AiViQo Technologies Inc. All rights reserved. Zero-hallucination document intelligence.</p>
          <div className="flex items-center gap-4 text-emerald-400 font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Cluster 01 Active (0.012s Latency · 100% Geometry Bound)</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
