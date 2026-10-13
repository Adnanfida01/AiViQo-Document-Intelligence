import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Sparkles } from 'lucide-react';

export const SocialProof: React.FC = () => {
  const partners = [
    { name: 'BeReal.', subtitle: 'Media Verification' },
    { name: 'SOUNDCLOUD', subtitle: 'Royalties & Rights' },
    { name: 'flickr', subtitle: 'Metadata Ingestion', specialColor: true },
    { name: 'Pinterest', subtitle: 'Visual Cataloguing' },
    { name: 'STRIPE', subtitle: 'Invoice Settlement' },
    { name: 'SNOWFLAKE', subtitle: 'Warehouse Direct' },
  ];

  return (
    <section className="py-14 border-y border-white/[0.06] bg-[#070A12]/80 relative overflow-hidden">
      
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[150px] bg-[#0066FF]/10 blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          
          {/* Label */}
          <div className="max-w-xs shrink-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF] animate-pulse" />
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#00D2FF] uppercase">
                ENTERPRISE GRADE
              </span>
            </div>
            <p className="text-sm font-semibold text-slate-200 leading-snug">
              Trusted by high-throughput teams processing millions of operational documents.
            </p>
          </div>

          {/* Partner Badges */}
          <div className="flex items-center flex-wrap gap-4 sm:gap-6">
            
            {/* BeReal */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-white/20 transition-all flex items-center gap-2"
            >
              <span className="text-base font-black tracking-tight text-white font-sans">BeReal.</span>
            </motion.div>

            {/* SOUNDCLOUD */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-[#FF5500]/50 transition-all flex items-center gap-2 group"
            >
              <svg className="w-4 h-4 text-white group-hover:text-[#FF5500] fill-current transition-colors" viewBox="0 0 24 24">
                <path d="M11.56 8.87V17h-1.25V9.45a3.84 3.84 0 0 1 1.25-.58zm-2.5 1.54V17H7.81v-5.91c.45-.27.87-.49 1.25-.68zm-2.5 1.48V17H5.31v-4.14c.4.1.82.16 1.25.25zm-2.5.42V17H2.81v-2.85c.4.04.81.1 1.25.16zM1.56 15.3V17H.31v-1.1c.4.02.82.04 1.25.06v-.66zm11.25-7.9c.77-.18 1.56-.27 2.38-.27 4.14 0 7.5 3.36 7.5 7.5s-3.36 7.5-7.5 7.5h-9.38V8.14a4.99 4.99 0 0 1 7-1.16v.42z" />
              </svg>
              <span className="text-xs font-black tracking-widest text-slate-200 uppercase group-hover:text-white transition-colors">
                SOUNDCLOUD
              </span>
            </motion.div>

            {/* flickr */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-white/20 transition-all flex items-center gap-1.5"
            >
              <span className="text-base font-bold text-white tracking-tight">flick</span>
              <span className="text-base font-bold text-[#FF0084]">r</span>
              <div className="flex items-center gap-0.5 ml-0.5">
                <span className="w-2 h-2 rounded-full bg-[#0063DC]" />
                <span className="w-2 h-2 rounded-full bg-[#FF0084]" />
              </div>
            </motion.div>

            {/* Pinterest */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-[#E60023]/50 transition-all flex items-center gap-2 group"
            >
              <div className="w-4 h-4 rounded-full bg-[#E60023] text-white flex items-center justify-center text-[10px] font-serif italic font-bold">
                P
              </div>
              <span className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">
                Pinterest
              </span>
            </motion.div>

            {/* Stripe */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-[#635BFF]/50 transition-all flex items-center gap-1.5 group"
            >
              <span className="text-sm font-black text-slate-200 group-hover:text-white transition-colors tracking-wide">
                stripe
              </span>
            </motion.div>

            {/* SOC-2 Badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>SOC-2 Type II Certified</span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
