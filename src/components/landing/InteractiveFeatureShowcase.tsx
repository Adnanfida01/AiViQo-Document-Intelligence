import React, { useState } from 'react';
import { FileText, ShieldAlert, Copy, Database, ArrowRight, CheckCircle2, Clock, Eye, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DocumentItem, DiscrepancyItem } from '../../types';

interface InteractiveFeatureShowcaseProps {
  documents: DocumentItem[];
  discrepancies: DiscrepancyItem[];
  onSelectDocument: (docId: string) => void;
  onNavigateTab: (tab: any) => void;
}

export const InteractiveFeatureShowcase: React.FC<InteractiveFeatureShowcaseProps> = ({
  documents,
  discrepancies,
  onSelectDocument,
  onNavigateTab,
}) => {
  const [activeTab, setActiveTab] = useState<'review' | 'discrepancies' | 'duplicates' | 'schemas'>('review');

  const tabs = [
    {
      key: 'review' as const,
      title: 'Human Review Queue',
      desc: 'Route uncertain extractions and threshold breaches to authorized reviewers. Inspect source evidence coordinates and approve with single-click signoff.',
      count: `${documents.length} Docs`,
    },
    {
      key: 'discrepancies' as const,
      title: 'Discrepancy Diagnostics',
      desc: 'Catch math mismatches, missing required tax certificates, and conflicting payment terms before posting to ERP ledgers.',
      count: `${discrepancies.length} Flags`,
    },
    {
      key: 'duplicates' as const,
      title: 'Duplicate Prevention',
      desc: 'Prevent double payments by combining cryptographic SHA-256 fingerprinting with perceptual visual similarity indexes.',
      count: '99.4% Match',
    },
    {
      key: 'schemas' as const,
      title: 'Schema Definitions',
      desc: 'Configure custom document types with strict data typing, confidence review thresholds, and required field validation.',
      count: '480+ Schemas',
    },
  ];

  return (
    <section id="workflow-showcase" className="py-20 md:py-28 bg-[#06080F] border-t border-white/[0.08] text-[#F3F5FA] relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 w-[700px] h-[350px] bg-[#00D2FF]/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-[#00D2FF] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF] animate-pulse" />
            <span>OPERATIONAL WORKFLOW CONTROLS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Explore operational <br />
            pipeline controls
          </h2>
        </div>

        {/* 2-Column Split: Tabs on Left / Interactive Board on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Switcher */}
          <div className="lg:col-span-5 space-y-3">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key;

              return (
                <motion.div
                  key={tab.key}
                  whileHover={{ x: 4 }}
                  onClick={() => setActiveTab(tab.key)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all border relative overflow-hidden ${
                    isActive
                      ? 'bg-[#0E1528] border-[#00D2FF] shadow-lg shadow-[#0066FF]/20'
                      : 'bg-[#0B101F]/70 border-white/[0.08] hover:border-white/20'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-showcase-tab"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#0066FF] to-[#00D2FF]"
                    />
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-[#00D2FF] shadow-[0_0_8px_#00D2FF]' : 'bg-slate-600'}`} />
                      <h3 className="text-sm font-bold text-white">{tab.title}</h3>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white/[0.06] text-slate-300">
                      {tab.count}
                    </span>
                  </div>

                  {isActive && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-2.5 pl-4 text-xs text-slate-300 leading-relaxed"
                    >
                      {tab.desc}
                    </motion.p>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Right Board Preview */}
          <div className="lg:col-span-7 bg-[#0B101F]/90 backdrop-blur-2xl rounded-3xl border border-white/10 p-6 shadow-2xl relative min-h-[360px]">
            
            <AnimatePresence mode="wait">
              {activeTab === 'review' && (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#00D2FF]" />
                      Active Review Queue ({documents.length} Documents)
                    </h4>
                    <span className="text-[11px] font-mono text-[#00D2FF] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live Feed
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {documents.map((doc) => (
                      <motion.div
                        key={doc.id}
                        whileHover={{ scale: 1.01 }}
                        onClick={() => onSelectDocument(doc.id)}
                        className="p-3.5 bg-[#060912]/90 hover:bg-[#0E1528] rounded-2xl border border-white/[0.08] hover:border-[#00D2FF]/40 flex items-center justify-between transition-all cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-white/[0.04] text-[#00D2FF] flex items-center justify-center font-mono text-xs">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white group-hover:text-[#00D2FF] transition-colors">
                              {doc.name}
                            </p>
                            <p className="text-[10px] text-slate-400 font-mono">
                              {doc.type.toUpperCase()} · {doc.size} · SHA-256: {doc.hash.slice(0, 8)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                            doc.status === 'approved'
                              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                              : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                          }`}>
                            {doc.status.replace('_', ' ').toUpperCase()}
                          </span>
                          <Eye className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'discrepancies' && (
                <motion.div
                  key="discrepancies"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-rose-400" />
                      Active Discrepancy Diagnostics
                    </h4>
                    <span className="text-rose-400 font-mono text-xs font-bold">2 Flags</span>
                  </div>

                  <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-rose-300">Line Item Arithmetic Mismatch</span>
                      <span className="text-[10px] font-mono text-rose-400 font-bold">HIGH SEVERITY</span>
                    </div>
                    <p className="text-slate-300 text-[11px] font-mono">
                      INV-2026-8819: Subtotal $4,200.00 + Tax $420.00 != Extracted Total $4,720.00 (+$100.00 variance)
                    </p>
                    <div className="pt-2 flex items-center justify-between">
                      <button
                        onClick={() => onNavigateTab('discrepancies')}
                        className="px-3 py-1 rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 font-bold text-[10px] transition-colors"
                      >
                        Inspect in Discrepancy Hub
                      </button>
                      <span className="text-slate-400 text-[10px] font-mono">Auto-reconciliation ready</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'duplicates' && (
                <motion.div
                  key="duplicates"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Copy className="w-4 h-4 text-amber-400" />
                      Duplicate Candidate Prevention
                    </h4>
                    <span className="text-amber-400 font-mono text-xs font-bold">99.4% Binary Match</span>
                  </div>

                  <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-xs space-y-2">
                    <p className="text-slate-300 text-xs">
                      Exact hash collision detected between <strong>APEX_INVOICE_OCTOBER_SCAN.pdf</strong> and <strong>INV-2026-8819-APEX.pdf</strong>.
                    </p>
                    <div className="pt-1 flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span>Action Recommended: Reject duplicate claim</span>
                      <button
                        onClick={() => onNavigateTab('duplicates')}
                        className="text-amber-400 font-bold hover:underline"
                      >
                        Open Duplicate Manager →
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'schemas' && (
                <motion.div
                  key="schemas"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Database className="w-4 h-4 text-[#00D2FF]" />
                      Schema Definitions
                    </h4>
                    <span className="text-[#00D2FF] font-mono text-xs font-bold">JSON-Schema v7</span>
                  </div>

                  <div className="p-4 bg-[#060912] rounded-2xl border border-white/[0.08] font-mono text-[11px] space-y-2">
                    <div className="text-slate-400">// Apex Commercial Invoice Schema v2.4</div>
                    <div className="text-[#00D2FF]">
                      &#123; <br />
                      &nbsp;&nbsp;&quot;type&quot;: &quot;invoice&quot;,<br />
                      &nbsp;&nbsp;&quot;strictArithmetic&quot;: true,<br />
                      &nbsp;&nbsp;&quot;minConfidenceThreshold&quot;: 0.95,<br />
                      &nbsp;&nbsp;&quot;evidenceBBoxRequired&quot;: true<br />
                      &#125;
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
};
