import React from 'react';
import { UploadCloud, Layers, Cpu, ShieldAlert, Clock, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { AiViQoLogo } from '../common/AiViQoLogo';

interface HeaderProps {
  onOpenUpload: () => void;
  onNavigateTab: (tab: 'canvas' | 'queue' | 'discrepancies' | 'duplicates' | 'audit') => void;
  activeTab: string;
}

interface NavItem {
  key: 'canvas' | 'queue' | 'discrepancies' | 'audit';
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  alert?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onOpenUpload, onNavigateTab, activeTab }) => {
  const navItems: NavItem[] = [
    { key: 'canvas', label: 'Evidence Canvas', icon: Layers },
    { key: 'queue', label: 'Processing Queue', icon: Cpu, badge: 'Live' },
    { key: 'discrepancies', label: 'Discrepancies', icon: ShieldAlert, alert: true },
    { key: 'audit', label: 'Audit Trail', icon: Clock },
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full bg-[#06080F]/85 backdrop-blur-2xl border-b border-white/[0.08] py-3.5 px-4 sm:px-8 sticky top-0 z-50 text-[#F3F5FA]"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand: AiViQo with Animated Logo & Live Status */}
        <div className="flex items-center gap-4">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group cursor-pointer"
          >
            <AiViQoLogo size={36} showText={true} subtitle="Document Intelligence" />
          </a>

          {/* Engine Cluster Health Badge */}
          <div className="hidden lg:flex items-center gap-2 pl-4 border-l border-white/10 text-xs text-slate-400 font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-slate-300">Cluster 01</span>
            <span className="text-slate-500">•</span>
            <span className="text-emerald-400 font-medium">99.8% Ground Truth</span>
          </div>
        </div>

        {/* Center Nav Links with Animated Active Indicator */}
        <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-4 py-1.5 rounded-full text-sm font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            Overview
          </button>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.key;

            return (
              <button
                key={item.key}
                onClick={() => onNavigateTab(item.key)}
                className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                  isActive ? 'text-white font-semibold' : 'text-slate-400 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="header-active-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[#0066FF] to-[#00D2FF]/80 shadow-[0_0_15px_rgba(0,102,255,0.4)]"
                    transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-[#00D2FF]/20 text-[#00D2FF] border border-[#00D2FF]/30">
                      {item.badge}
                    </span>
                  )}
                  {item.alert && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  )}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Right CTA Button: Modern Glowing Action Pill */}
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenUpload}
            className="relative group px-5 py-2 rounded-full bg-gradient-to-r from-[#00D2FF] to-[#0066FF] text-slate-950 text-sm font-semibold shadow-md shadow-[#0066FF]/25 hover:shadow-lg hover:shadow-[#0066FF]/40 transition-all cursor-pointer overflow-hidden flex items-center gap-2"
          >
            {/* Shimmer line */}
            <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
            
            <UploadCloud className="w-4 h-4 text-slate-950 group-hover:-translate-y-0.5 transition-transform" />
            <span>Ingest Document</span>
            <Sparkles className="w-3.5 h-3.5 text-slate-900" />
          </motion.button>
        </div>

      </div>
    </motion.header>
  );
};
