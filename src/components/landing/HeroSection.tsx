import React, { useState } from 'react';
import { Sparkles, ArrowRight, UploadCloud, FileText, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { EvidenceCanvas } from '../canvas/EvidenceCanvas';
import { AiViQoLogo } from '../common/AiViQoLogo';
import { DocumentItem } from '../../types';

interface HeroSectionProps {
  currentDocument: DocumentItem;
  onOpenUpload: () => void;
  onUpdateField: (fieldKey: string, newValue: string, reason?: string) => void;
  onApproveDocument: (docId: string) => void;
  onExportJSON: (doc: DocumentItem) => void;
  onExportCSV: (doc: DocumentItem) => void;
  onSelectSample: (docId: string) => void;
  sampleDocuments: DocumentItem[];
  onNavigateTab: (tab: any) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentDocument,
  onOpenUpload,
  onUpdateField,
  onApproveDocument,
  onExportJSON,
  onExportCSV,
  onSelectSample,
  sampleDocuments,
  onNavigateTab,
}) => {
  const [inputVal, setInputVal] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenUpload();
  };

  return (
    <section className="pt-10 pb-20 relative overflow-hidden text-center">
      
      {/* Background Starry Depth & Luminous Electric Sapphire Ambient Field */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Animated ambient mesh orbs */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-gradient-to-b from-[#0066FF]/25 via-[#00D2FF]/15 to-transparent rounded-full blur-[140px] animate-pulse-glow" />
        <div className="absolute top-1/4 left-1/6 w-[450px] h-[450px] bg-[#0066FF]/15 rounded-full blur-[110px]" />
        <div className="absolute top-1/4 right-1/6 w-[450px] h-[450px] bg-[#00D2FF]/15 rounded-full blur-[110px]" />

        {/* Dynamic Subtle Grid Background */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `linear-gradient(#00D2FF 1px, transparent 1px), linear-gradient(90deg, #00D2FF 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />

        {/* Particle Stars */}
        <div
          className="absolute inset-0 opacity-45"
          style={{
            backgroundImage: `radial-gradient(1px 1px at 25px 35px, #ffffff, rgba(0,0,0,0)),
                              radial-gradient(1.5px 1.5px at 160px 85px, #00D2FF, rgba(0,0,0,0)),
                              radial-gradient(1px 1px at 340px 190px, #0066FF, rgba(0,0,0,0)),
                              radial-gradient(1.5px 1.5px at 580px 95px, #ffffff, rgba(0,0,0,0)),
                              radial-gradient(1.2px 1.2px at 820px 220px, #00D2FF, rgba(0,0,0,0)),
                              radial-gradient(2px 2px at 1040px 130px, #ffffff, rgba(0,0,0,0)),
                              radial-gradient(1px 1px at 1260px 75px, #0066FF, rgba(0,0,0,0))`,
            backgroundSize: '1280px 280px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Feature Pill: — [ AiViQo v4.2 ] Autonomous Document Intelligence — */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-3 mb-6"
        >
          <div className="w-8 sm:w-16 h-[1px] bg-gradient-to-r from-transparent to-[#00D2FF]/40" />
          <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0D1424]/90 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/40">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-gradient-to-r from-[#0066FF] to-[#00D2FF] text-white">
              AiViQo Engine
            </span>
            <span className="text-xs font-semibold text-slate-300">
              Calibrated OCR & Schema-Driven Extraction
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <div className="w-8 sm:w-16 h-[1px] bg-gradient-to-l from-transparent to-[#00D2FF]/40" />
        </motion.div>

        {/* Display Headline with Floating Overlaid Glass Badges */}
        <div className="max-w-4xl mx-auto mb-7 relative">
          
          {/* Floating Frosted Glass Card Left: Multi-Engine OCR */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden md:flex items-center gap-2.5 absolute -top-4 -left-6 lg:-left-16 z-20 transform -rotate-6 animate-float-slow"
          >
            <div className="p-3.5 pr-5 rounded-2xl bg-[#0D1424]/85 backdrop-blur-2xl border border-white/15 shadow-2xl shadow-[#0066FF]/25 flex items-center gap-3 text-left">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0066FF] to-[#00D2FF] flex items-center justify-center text-white shadow-md shadow-[#0066FF]/40">
                <Sparkles className="w-4 h-4 fill-current" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 leading-tight font-mono">Hybrid OCR Engine</p>
                <p className="text-xs font-bold text-white leading-tight">99.8% Token Precision</p>
              </div>
            </div>
          </motion.div>

          {/* Floating Frosted Glass Card Right: Zero Hallucination */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hidden md:flex items-center gap-2.5 absolute top-10 -right-6 lg:-right-16 z-20 transform rotate-6 animate-float-reverse"
          >
            <div className="p-3.5 pr-5 rounded-2xl bg-[#0D1424]/85 backdrop-blur-2xl border border-white/15 shadow-2xl shadow-[#00D2FF]/20 flex items-center gap-3 text-left">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#00D2FF] to-[#10B981] flex items-center justify-center text-slate-950 shadow-md shadow-emerald-500/20">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 leading-tight font-mono">Evidence Bound</p>
                <p className="text-xs font-bold text-white leading-tight">Zero Hallucinations</p>
              </div>
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[1.08] mb-5"
          >
            Your Gateway to <br />
            <span className="bg-gradient-to-r from-white via-[#C8E5FF] to-[#00D2FF] bg-clip-text text-transparent">
              Document Intelligence
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            Integrate enterprise-grade document extraction, cross-field validation, and human-verified evidence directly into financial and operational workflows.
          </motion.p>
        </div>

        {/* Input / Action Capsule: Modern Glassmorphic Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-xl mx-auto mb-6"
        >
          <form
            onSubmit={handleSubmit}
            className="p-1.5 rounded-full bg-[#0D1424]/85 backdrop-blur-2xl border border-white/15 shadow-2xl shadow-[#0066FF]/20 flex items-center justify-between gap-3 group focus-within:border-[#00D2FF] transition-all"
          >
            <div className="flex items-center gap-3 pl-4 flex-1">
              <FileText className="w-4 h-4 text-slate-400 group-focus-within:text-[#00D2FF] transition-colors shrink-0" />
              <input
                type="text"
                placeholder="Upload PDF, TIFF, or inspect sample documents..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                className="w-full bg-transparent text-xs text-white placeholder-slate-400 focus:outline-none font-sans"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#00D2FF] to-[#0066FF] hover:brightness-110 active:scale-95 text-slate-950 font-bold text-xs shadow-md shadow-[#0066FF]/30 transition-all flex items-center gap-2 cursor-pointer shrink-0"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
            </button>
          </form>

          {/* Quick Filter Sample Chips */}
          <div className="flex items-center justify-center gap-2 mt-3 flex-wrap text-[11px] text-slate-400">
            <span className="font-mono text-[10px] text-slate-500 uppercase">Live Samples:</span>
            {sampleDocuments.slice(0, 3).map((s) => (
              <button
                key={s.id}
                onClick={() => onSelectSample(s.id)}
                className={`px-3 py-1 rounded-full border transition-all cursor-pointer ${
                  currentDocument.id === s.id
                    ? 'bg-[#00D2FF]/20 text-[#00D2FF] border-[#00D2FF]/50 font-semibold'
                    : 'bg-white/[0.04] text-slate-400 border-white/[0.08] hover:text-white hover:border-white/20'
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* The Signature 3-Column Centerpiece Workspace */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full relative z-20 mt-8"
        >
          <EvidenceCanvas
            document={currentDocument}
            onUpdateField={onUpdateField}
            onApproveDocument={onApproveDocument}
            onExportJSON={onExportJSON}
            onExportCSV={onExportCSV}
            onSelectSample={onSelectSample}
            sampleDocuments={sampleDocuments}
            onNavigateTab={onNavigateTab}
          />
        </motion.div>

      </div>
    </section>
  );
};
