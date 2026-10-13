import React, { useState } from 'react';
import { Cpu, Bot, UserCheck, ShieldAlert, FileSpreadsheet, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface BuiltInFeaturesDockProps {
  onNavigateTab: (tab: any) => void;
}

export const BuiltInFeaturesDock: React.FC<BuiltInFeaturesDockProps> = ({ onNavigateTab }) => {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  const features = [
    {
      id: 'ocr',
      title: 'Multi-Engine OCR',
      desc: 'OCRmyPDF + Tesseract 5.3 + Native PDF vector geometry.',
      icon: Cpu,
      tab: 'canvas',
      gradient: 'from-[#0066FF] to-[#00D2FF]',
    },
    {
      id: 'ai-schema',
      title: 'Schema Parsing',
      desc: 'Strict type validation & auto-normalization.',
      icon: Bot,
      tab: 'canvas',
      gradient: 'from-[#00D2FF] to-[#00F0FF]',
    },
    {
      id: 'review',
      title: 'Human Review',
      desc: 'Evidence Canvas with single-click audit signing.',
      icon: UserCheck,
      tab: 'canvas',
      gradient: 'from-[#10B981] to-[#34D399]',
    },
    {
      id: 'discrepancy',
      title: 'Discrepancy Engine',
      desc: 'Deterministic math cross-checks & fraud rules.',
      icon: ShieldAlert,
      tab: 'discrepancies',
      gradient: 'from-[#F59E0B] to-[#EF4444]',
    },
    {
      id: 'export',
      title: 'Export & Webhooks',
      desc: 'Direct dispatch into SAP, NetSuite, & REST endpoints.',
      icon: FileSpreadsheet,
      tab: 'audit',
      gradient: 'from-[#6366F1] to-[#8B5CF6]',
    },
  ];

  return (
    <section id="more-features" className="py-20 md:py-24 bg-[#06080F] border-t border-white/[0.08] text-center relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-[#0066FF]/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-[#00D2FF] mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#00D2FF]" />
          <span>EXPANDABLE ARCHITECTURE</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
          More built-in <span className="font-serif-italic font-normal text-[#00D2FF]">engines</span>
        </h2>
        <p className="text-sm text-slate-300 max-w-lg mx-auto mb-14">
          Integrated modules working in lockstep to guarantee enterprise data integrity across all document touchpoints.
        </p>

        {/* 5 Icons Dock with Motion */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 max-w-5xl mx-auto">
          {features.map((feat) => {
            const Icon = feat.icon;
            const isHovered = activeFeature === feat.id;

            return (
              <motion.button
                key={feat.id}
                whileHover={{ scale: 1.08, y: -4 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigateTab(feat.tab)}
                onMouseEnter={() => setActiveFeature(feat.id)}
                onMouseLeave={() => setActiveFeature(null)}
                className="flex flex-col items-center gap-3 group cursor-pointer transition-transform p-3 rounded-2xl"
              >
                <div
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr ${feat.gradient} p-[1.5px] shadow-xl shadow-black/50 transition-all duration-300 ${
                    isHovered ? 'ring-2 ring-[#00D2FF] shadow-[0_0_20px_rgba(0,210,255,0.4)]' : ''
                  }`}
                >
                  <div className="w-full h-full rounded-[14px] bg-[#0B101F]/90 backdrop-blur-xl flex items-center justify-center text-white group-hover:bg-transparent group-hover:text-slate-950 transition-colors">
                    <Icon className="w-7 h-7 sm:w-8 sm:h-8 transition-transform group-hover:scale-110" />
                  </div>
                </div>

                <div className="text-center">
                  <span className="text-xs sm:text-sm font-bold text-slate-300 group-hover:text-white transition-colors block">
                    {feat.title}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono hidden sm:block max-w-[120px] mt-0.5 leading-tight">
                    {feat.desc}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
