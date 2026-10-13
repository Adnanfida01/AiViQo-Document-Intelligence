import React, { useState } from 'react';
import { UploadCloud, Layers, Cpu, ShieldCheck, UserCheck, Send, CheckCircle2, ArrowRight, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const PipelineTimeline: React.FC = () => {
  const [activeStage, setActiveStage] = useState(2); // Extract selected by default

  const stages = [
    {
      num: '01',
      title: 'Ingest',
      icon: UploadCloud,
      tag: 'Multi-Channel',
      description: 'Receive documents via API, webhooks, or drag-and-drop. Validates MIME headers and calculates SHA-256 file fingerprint.',
      telemetry: { latency: '18ms', throughput: '450 docs/sec', validation: 'MIME 100% Valid' },
    },
    {
      num: '02',
      title: 'Classify',
      icon: Layers,
      tag: 'Auto-Routing',
      description: 'Identifies document type (Invoice, PO, Receipt, Contract, Bank Statement) and loads the matching versioned schema.',
      telemetry: { latency: '34ms', throughput: '99.4% Accuracy', validation: 'Schema Bound: INV-v2' },
    },
    {
      num: '03',
      title: 'Extract',
      icon: Cpu,
      tag: 'Multi-Engine OCR',
      description: 'Runs OCRmyPDF + Tesseract 5.3 + Native text parser to capture word tokens with normalized page coordinates.',
      telemetry: { latency: '820ms', throughput: '420 Tokens/sec', validation: 'BBox Coordinates Stored' },
    },
    {
      num: '04',
      title: 'Validate',
      icon: ShieldCheck,
      tag: 'Deterministic',
      description: 'Executes cross-field arithmetic checks (Subtotal + Tax == Total), date logic, and vendor master database reconciliation.',
      telemetry: { latency: '42ms', throughput: '14 Rules Run', validation: '1 Variance Detected' },
    },
    {
      num: '05',
      title: 'Review',
      icon: UserCheck,
      tag: 'Human-in-the-Loop',
      description: 'Routes low-confidence values or arithmetic discrepancies to the Evidence Canvas. Reviewers verify with full audit logs.',
      telemetry: { latency: 'Manual Queue', throughput: '99.9% Ground Truth', validation: 'Alex Rivera (Reviewer)' },
    },
    {
      num: '06',
      title: 'Deliver',
      icon: Send,
      tag: 'ERP & Webhooks',
      description: 'Publishes verified, tamper-evident structured data directly into accounting ledgers, ERP, or webhook subscribers.',
      telemetry: { latency: '65ms', throughput: 'Webhook 200 OK', validation: 'JSON Schema Exported' },
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#06080F] border-t border-white/[0.08] text-[#F3F5FA] relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[350px] bg-[#0066FF]/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-[#00D2FF] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF] animate-pulse" />
            <span>END-TO-END AUTONOMOUS PIPELINE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            From Raw PDF to <br />
            <span className="bg-gradient-to-r from-white via-[#C8E5FF] to-[#00D2FF] bg-clip-text text-transparent">
              Reconciled Financial Ledger
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            6 deterministic pipeline stages ensure zero hallucinations, sub-second latency, and continuous tamper-evident traceability.
          </p>
        </div>

        {/* 6-Stage Timeline Stepper Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-10">
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            const isSelected = activeStage === idx;

            return (
              <motion.button
                key={stage.num}
                whileHover={{ y: -4 }}
                onClick={() => setActiveStage(idx)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[160px] relative overflow-hidden ${
                  isSelected
                    ? 'bg-[#0E1528] border-[#00D2FF] shadow-lg shadow-[#0066FF]/30 ring-1 ring-[#00D2FF]/50'
                    : 'bg-[#0B101F]/80 border-white/[0.08] hover:border-white/20 hover:bg-[#0E1528]/60'
                }`}
              >
                {/* Active Indicator Top Bar */}
                {isSelected && (
                  <motion.div
                    layoutId="active-stage-indicator"
                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0066FF] to-[#00D2FF]"
                  />
                )}

                <div className="flex items-center justify-between w-full mb-3">
                  <span className="font-mono text-xs font-bold text-slate-400">{stage.num}</span>
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                    isSelected ? 'bg-gradient-to-tr from-[#0066FF] to-[#00D2FF] text-slate-950 font-bold shadow-md shadow-[#0066FF]/40' : 'bg-white/[0.04] text-slate-400'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-white text-sm tracking-tight">{stage.title}</h3>
                  <span className="text-[10px] font-mono text-[#00D2FF] block mt-0.5">{stage.tag}</span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Active Stage Detailed Live Inspector Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStage}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="p-6 sm:p-8 rounded-3xl bg-[#0B101F]/90 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/50 grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
          >
            <div className="md:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#0066FF] to-[#00D2FF] text-slate-950 text-xs font-black font-mono">
                  STAGE {stages[activeStage].num}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {stages[activeStage].title}: {stages[activeStage].tag}
                </h3>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {stages[activeStage].description}
              </p>

              <div className="flex items-center gap-4 text-xs font-mono text-slate-400 pt-2 flex-wrap">
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  Deterministic Execution
                </span>
                <span>·</span>
                <span className="text-slate-300">Target Schema: Apex ERP v2.4</span>
              </div>
            </div>

            {/* Live Telemetry Display */}
            <div className="md:col-span-5 bg-[#060912] rounded-2xl p-5 border border-white/[0.08] font-mono text-xs space-y-3">
              <div className="flex items-center justify-between text-slate-400 border-b border-white/[0.08] pb-2">
                <span className="flex items-center gap-1.5 text-white">
                  <Terminal className="w-3.5 h-3.5 text-[#00D2FF]" />
                  Telemetry Metrics
                </span>
                <span className="text-emerald-400 text-[10px] font-bold">200 OK</span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Step Latency:</span>
                  <span className="text-white font-bold">{stages[activeStage].telemetry.latency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Throughput Metric:</span>
                  <span className="text-[#00D2FF] font-bold">{stages[activeStage].telemetry.throughput}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Validation Status:</span>
                  <span className="text-emerald-400 font-bold">{stages[activeStage].telemetry.validation}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
