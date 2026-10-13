import React, { useState } from 'react';
import { Cpu, FileCheck2, ShieldAlert, Copy, Database, Layers, CheckCircle2, Sparkles, ArrowRight, Activity, Crosshair } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const BentoFeatures: React.FC = () => {
  const [activeOcrEngine, setActiveOcrEngine] = useState('OCRmyPDF v15.4');
  const [resolvedVariance, setResolvedVariance] = useState(false);
  const [activeSchema, setActiveSchema] = useState('Invoice v2.4');

  const engineStats: Record<string, { speed: string; acc: string; latency: string }> = {
    'Native PDF': { speed: '0.04s', acc: '100% (Vector Text)', latency: '12ms' },
    'OCRmyPDF v15.4': { speed: '0.82s', acc: '99.8% (Token Geometry)', latency: '82ms' },
    'Tesseract 5.3': { speed: '1.14s', acc: '99.2% (Raster Deskewed)', latency: '114ms' },
  };

  return (
    <section id="features" className="py-20 md:py-28 bg-[#06080F] text-slate-100 border-t border-white/[0.08] relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-[#0066FF]/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-[#00D2FF] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF] animate-pulse" />
              <span>CORE INTELLIGENCE CAPABILITIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.12]">
              Everything your document <br className="hidden sm:inline" />
              pipeline delivers, <br className="hidden sm:inline" />
              all in one place
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Replace fragile regex scripts and unverified AI hallucinations with schema-constrained extraction, tamper-evident coordinate binding, and calibrated confidence scoring.
            </p>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Card 1: Multi-Engine OCR & Text Geometry (6 cols) */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="md:col-span-6 bg-[#0B101F]/85 backdrop-blur-2xl rounded-3xl p-7 border border-white/[0.08] hover:border-[#00D2FF]/40 shadow-xl shadow-black/40 flex flex-col justify-between group transition-all"
          >
            {/* Visual interactive preview */}
            <div className="bg-[#060912] rounded-2xl p-5 mb-6 border border-white/[0.08] min-h-[220px] flex flex-col justify-between relative overflow-hidden">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-white/[0.08] pb-2.5">
                <span className="flex items-center gap-1.5 text-white font-semibold">
                  <Activity className="w-3.5 h-3.5 text-[#00D2FF]" />
                  OCR Engine Benchmark
                </span>
                <span className="text-[#00D2FF] font-bold">Dual Hybrid Mode</span>
              </div>

              {/* Engine Switcher Buttons */}
              <div className="grid grid-cols-3 gap-2 my-3 text-xs">
                {['Native PDF', 'OCRmyPDF v15.4', 'Tesseract 5.3'].map((engine) => (
                  <button
                    key={engine}
                    onClick={() => setActiveOcrEngine(engine)}
                    className={`py-2 px-2.5 rounded-xl border text-center transition-all cursor-pointer font-mono text-[11px] ${
                      activeOcrEngine === engine
                        ? 'bg-gradient-to-r from-[#0066FF] to-[#00D2FF] text-slate-950 font-bold border-transparent shadow-lg shadow-[#0066FF]/30'
                        : 'bg-white/[0.04] text-slate-400 border-white/[0.08] hover:text-white hover:border-white/20'
                    }`}
                  >
                    {engine}
                  </button>
                ))}
              </div>

              {/* Dynamic Engine Benchmark Output */}
              <div className="text-[11px] font-mono bg-white/[0.03] p-3 rounded-xl border border-white/[0.08] flex items-center justify-between">
                <div>
                  <span className="text-slate-400 block text-[10px]">Processing Speed:</span>
                  <span className="text-white font-bold">{engineStats[activeOcrEngine].speed}</span>
                </div>
                <div className="text-center">
                  <span className="text-slate-400 block text-[10px]">Token Precision:</span>
                  <span className="text-emerald-400 font-bold">{engineStats[activeOcrEngine].acc}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block text-[10px]">Engine Latency:</span>
                  <span className="text-[#00D2FF] font-bold">{engineStats[activeOcrEngine].latency}</span>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-bold text-white">Multi-Engine OCR & Geometry</h3>
                <span className="text-[10px] font-mono font-bold bg-[#00D2FF]/15 text-[#00D2FF] border border-[#00D2FF]/30 px-2.5 py-0.5 rounded-full">
                  Hybrid Cluster
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Extract digital text without rasterization loss, auto-deskew scanned pages, and preserve exact word token coordinates down to the sub-millimeter.
              </p>
            </div>
          </motion.div>

          {/* Card 2: Evidence Canvas & Traceability (6 cols) */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="md:col-span-6 bg-[#0B101F]/85 backdrop-blur-2xl rounded-3xl p-7 border border-white/[0.08] hover:border-[#00D2FF]/40 shadow-xl shadow-black/40 flex flex-col justify-between group transition-all"
          >
            {/* Visual interactive preview */}
            <div className="bg-[#060912] rounded-2xl p-5 mb-6 border border-white/[0.08] min-h-[220px] flex items-center justify-center relative overflow-hidden">
              <div className="w-full max-w-sm bg-[#0E1528] p-4 rounded-xl border border-white/10 space-y-3 shadow-lg">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 flex items-center gap-1.5 font-medium">
                    <Crosshair className="w-3.5 h-3.5 text-[#00D2FF]" />
                    Target Field: <strong className="text-white">total_amount</strong>
                  </span>
                  <span className="text-emerald-400 font-mono font-bold">100% Calibrated</span>
                </div>

                <div className="p-3 bg-[#080C18] rounded-xl border border-[#00D2FF]/50 flex items-center justify-between font-mono text-xs shadow-[0_0_15px_rgba(0,210,255,0.15)]">
                  <span className="text-white font-black text-sm">$4,620.00</span>
                  <span className="text-[#00D2FF] text-[10px] bg-[#00D2FF]/10 px-2 py-0.5 rounded-md border border-[#00D2FF]/30">
                    BBox [x:58%, y:80%, w:18%, h:4%]
                  </span>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-1">
                  <span>Anchor: Source Page 1</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Coordinate Bound
                  </span>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-bold text-white">Evidence Canvas & Traceability</h3>
                <span className="text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                  Zero Hallucination
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Every extracted number, date, or identifier binds directly to visual source geometry on the original page. Never trust black-box LLM output again.
              </p>
            </div>
          </motion.div>

          {/* Card 3: Discrepancy Engine (4 cols) */}
          <motion.div
            whileHover={{ y: -4 }}
            className="md:col-span-4 bg-[#0B101F]/85 backdrop-blur-2xl rounded-3xl p-6 border border-white/[0.08] hover:border-amber-400/40 shadow-xl shadow-black/40 flex flex-col justify-between transition-all"
          >
            <div className="bg-[#060912] rounded-2xl p-4 mb-5 border border-white/[0.08] min-h-[170px] flex flex-col justify-center space-y-2.5 text-xs">
              <div className={`p-3 rounded-xl border transition-all ${
                resolvedVariance
                  ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                  : 'bg-rose-500/15 border-rose-500/30 text-rose-300'
              }`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold">Arithmetic Line Check</span>
                  <span className="font-mono text-[10px]">{resolvedVariance ? 'RESOLVED' : 'FLAGGED'}</span>
                </div>
                <p className="text-[11px] font-mono">
                  {resolvedVariance
                    ? 'Subtotal ($4,200) + Tax ($420) == $4,620.00'
                    : 'Subtotal ($4,200) + Tax ($420) != $4,720 (+$100)'}
                </p>
              </div>

              <button
                onClick={() => setResolvedVariance(!resolvedVariance)}
                className="w-full py-1.5 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 text-[10px] font-mono text-center border border-white/10 transition-colors cursor-pointer"
              >
                {resolvedVariance ? 'Reset Variance Test' : 'Test Auto-Reconciliation'}
              </button>
            </div>

            <div>
              <h3 className="text-base font-bold text-white mb-1.5 flex items-center gap-2">
                Discrepancy Detection
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Deterministic cross-field arithmetic checks, line-item multiplication rules, and vendor database reconciliation.
              </p>
            </div>
          </motion.div>

          {/* Card 4: Multi-Signal Duplicates (4 cols) */}
          <motion.div
            whileHover={{ y: -4 }}
            className="md:col-span-4 bg-[#0B101F]/85 backdrop-blur-2xl rounded-3xl p-6 border border-white/[0.08] hover:border-indigo-400/40 shadow-xl shadow-black/40 flex flex-col justify-between transition-all"
          >
            <div className="bg-[#060912] rounded-2xl p-4 mb-5 border border-white/[0.08] min-h-[170px] flex flex-col justify-center space-y-2 text-xs font-mono">
              <div className="p-3 bg-indigo-500/15 border border-indigo-500/30 rounded-xl text-indigo-300">
                <span className="font-bold block mb-1">SHA-256 Fingerprint Match</span>
                <span className="text-[10px] text-slate-300 block truncate">e3b0c44298fc1c149afbf4c89...</span>
                <span className="text-[10px] text-emerald-400 font-bold mt-1 block">99.4% Perceptual Cosine Sim</span>
              </div>
              <div className="p-2 bg-white/[0.03] rounded-lg text-[10px] text-slate-400 text-center">
                Prevents duplicate payout batches
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold text-white mb-1.5 flex items-center gap-2">
                Duplicate Defense
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Detect identical binary files and visually manipulated re-submitted invoices with perceptual hashing.
              </p>
            </div>
          </motion.div>

          {/* Card 5: Schema Automation (4 cols) */}
          <motion.div
            whileHover={{ y: -4 }}
            className="md:col-span-4 bg-[#0B101F]/85 backdrop-blur-2xl rounded-3xl p-6 border border-white/[0.08] hover:border-[#00D2FF]/40 shadow-xl shadow-black/40 flex flex-col justify-between transition-all"
          >
            <div className="bg-[#060912] rounded-2xl p-4 mb-5 border border-white/[0.08] min-h-[170px] flex flex-col justify-between space-y-2 text-xs">
              <div className="flex items-center gap-1.5 flex-wrap">
                {['Invoice v2.4', 'Bill of Lading', 'Form W-9'].map((schema) => (
                  <button
                    key={schema}
                    onClick={() => setActiveSchema(schema)}
                    className={`px-2 py-1 rounded-lg text-[10px] font-mono cursor-pointer transition-all ${
                      activeSchema === schema
                        ? 'bg-[#00D2FF]/20 text-[#00D2FF] border border-[#00D2FF]/40 font-bold'
                        : 'bg-white/[0.04] text-slate-400 border border-white/10'
                    }`}
                  >
                    {schema}
                  </button>
                ))}
              </div>

              <div className="p-2.5 bg-[#00D2FF]/10 border border-[#00D2FF]/25 rounded-xl font-mono text-[10px] text-slate-300">
                <span className="text-[#00D2FF] font-bold block">{activeSchema} Loaded</span>
                <span>12 strictly typed properties · Coerced to ISO-8601</span>
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold text-white mb-1.5 flex items-center gap-2">
                Schema Automation
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF]" />
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Enforce strict data types, required fields, and review confidence thresholds tailored to each document class.
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
