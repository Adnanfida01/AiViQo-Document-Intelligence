import React from 'react';
import { FileCheck, Clock, ShieldAlert, Cpu, Award } from 'lucide-react';
import { motion } from 'motion/react';

export const KPIStrip: React.FC = () => {
  const metrics = [
    {
      label: 'Pages Processed',
      val: '11M+',
      sub: 'Verified across enterprise files',
      icon: FileCheck,
      color: '#00D2FF',
      glow: 'rgba(0, 210, 255, 0.2)',
    },
    {
      label: 'Documents Automated',
      val: '31K+',
      sub: 'Zero manual re-entry',
      icon: Cpu,
      color: '#0066FF',
      glow: 'rgba(0, 102, 255, 0.2)',
    },
    {
      label: 'Document Schemas',
      val: '480+',
      sub: 'Custom & universal formats',
      icon: Clock,
      color: '#38BDF8',
      glow: 'rgba(56, 189, 248, 0.2)',
    },
    {
      label: 'Pipeline TAT',
      val: '<2.4s',
      sub: 'Ingest-to-schema extraction',
      icon: ShieldAlert,
      color: '#F59E0B',
      glow: 'rgba(245, 158, 11, 0.2)',
    },
    {
      label: 'Ground-Truth Accuracy',
      val: '99.8%',
      sub: 'Audited against visual evidence',
      icon: Award,
      color: '#10B981',
      glow: 'rgba(16, 185, 129, 0.2)',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {metrics.map((m, idx) => {
          const Icon = m.icon;

          return (
            <motion.div
              key={m.label}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className={`bg-[#0B101F]/80 backdrop-blur-xl p-4 sm:p-5 rounded-2xl border border-white/[0.08] shadow-lg shadow-black/30 hover:border-white/20 transition-all group ${
                idx === 4 ? 'col-span-2 sm:col-span-1' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 tracking-wider uppercase">
                  {m.label}
                </span>
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${m.color}15`, color: m.color }}
                >
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div
                className="text-2xl sm:text-3xl font-black font-mono font-mono-numbers tracking-tight"
                style={{ color: m.color }}
              >
                {m.val}
              </div>

              <p className="mt-1 text-[10px] sm:text-[11px] text-slate-400 leading-tight">
                {m.sub}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
