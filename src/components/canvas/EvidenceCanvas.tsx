import React, { useState } from 'react';
import {
  ZoomIn,
  ZoomOut,
  RotateCw,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Edit3,
  Check,
  Download,
  ShieldCheck,
  Layers,
  Sparkles,
  Search,
  Star,
  Bookmark,
  MoreHorizontal,
  Bell,
  Trash2,
  ArrowLeft,
  ChevronRight,
  ExternalLink,
  Cpu,
  ShieldAlert,
  Copy,
  Clock,
  Send,
  Crosshair,
  Maximize2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DocumentItem, ExtractedField } from '../../types';
import { AiViQoLogo } from '../common/AiViQoLogo';

interface EvidenceCanvasProps {
  document: DocumentItem;
  onUpdateField: (fieldKey: string, newValue: string, reason?: string) => void;
  onApproveDocument: (documentId: string) => void;
  onExportJSON: (document: DocumentItem) => void;
  onExportCSV: (document: DocumentItem) => void;
  onSelectSample?: (docId: string) => void;
  sampleDocuments?: DocumentItem[];
  onNavigateTab?: (tab: any) => void;
}

export const EvidenceCanvas: React.FC<EvidenceCanvasProps> = ({
  document: doc,
  onUpdateField,
  onApproveDocument,
  onExportJSON,
  onExportCSV,
  onSelectSample,
  sampleDocuments = [],
  onNavigateTab,
}) => {
  const [selectedFieldKey, setSelectedFieldKey] = useState<string>('total_amount');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [rotation, setRotation] = useState<number>(0);
  const [editingFieldKey, setEditingFieldKey] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const [editReason, setEditReason] = useState<string>('');
  const [approvedToast, setApprovedToast] = useState(false);
  const [isStarred, setIsStarred] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(true);
  const [highlightCoords, setHighlightCoords] = useState<{ x: number; y: number } | null>(null);

  const selectedField = doc.fields.find((f) => f.key === selectedFieldKey) || doc.fields[0];

  const handleStartEdit = (field: ExtractedField) => {
    setEditingFieldKey(field.key);
    setEditValue(field.rawValue);
    setEditReason('');
  };

  const handleSaveEdit = (fieldKey: string) => {
    onUpdateField(fieldKey, editValue, editReason || 'Reviewer verified correction via Evidence Canvas');
    setEditingFieldKey(null);
  };

  const handleApprove = () => {
    onApproveDocument(doc.id);
    setApprovedToast(true);
    setTimeout(() => setApprovedToast(false), 3000);
  };

  return (
    <div className="w-full bg-[#0A0E1A]/95 backdrop-blur-3xl text-[#F3F5FA] rounded-3xl border border-white/10 shadow-2xl shadow-[#0066FF]/15 overflow-hidden flex flex-col relative">
      
      {/* Toast Notification on Approval */}
      <AnimatePresence>
        {approvedToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-4 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-emerald-500 text-slate-950 font-bold text-xs shadow-xl shadow-emerald-500/30 flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Document {doc.name} verified and dispatched to ERP ledger!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3-Column Glassmorphic Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[740px]">
        
        {/* =========================================
            COLUMN 1: Left Navigation Rail (3 cols)
           ========================================= */}
        <div className="lg:col-span-3 bg-[#080B14]/90 border-r border-white/[0.08] p-5 flex flex-col justify-between">
          <div className="space-y-6">
            
            {/* Top Workspace Header with AiViQo Logo */}
            <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.08]">
              <div className="flex items-center gap-2.5">
                <AiViQoLogo size={32} showText={false} />
                <div>
                  <h4 className="font-bold text-white text-sm tracking-tight flex items-center gap-1.5">
                    AiViQo Canvas
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF] animate-pulse" />
                  </h4>
                  <p className="text-[10px] text-slate-400 font-mono">Cluster 01 · Production</p>
                </div>
              </div>
              <button
                onClick={() => onNavigateTab?.('canvas')}
                className="text-slate-400 hover:text-white transition-colors"
                title="Evidence Canvas"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Nav Menu Items */}
            <div className="space-y-1.5 text-xs">
              <span className="text-[10px] font-mono uppercase text-slate-400 px-3 block mb-1">Navigation</span>
              
              <button
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-gradient-to-r from-[#0066FF]/25 to-[#00D2FF]/15 border border-[#0066FF]/40 text-white font-semibold transition-all"
              >
                <FileText className="w-4 h-4 text-[#00D2FF]" />
                <span>Active Evidence Canvas</span>
              </button>

              <button
                onClick={() => onNavigateTab?.('queue')}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.04] transition-all cursor-pointer"
              >
                <Cpu className="w-4 h-4 text-[#00D2FF]" />
                <span>Processing Queue</span>
              </button>

              <button
                onClick={() => onNavigateTab?.('discrepancies')}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.04] transition-all cursor-pointer"
              >
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                <span>Discrepancy Engine</span>
              </button>

              <button
                onClick={() => onNavigateTab?.('duplicates')}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.04] transition-all cursor-pointer"
              >
                <Copy className="w-4 h-4 text-indigo-400" />
                <span>Duplicate Defense</span>
              </button>

              <button
                onClick={() => onNavigateTab?.('audit')}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.04] transition-all cursor-pointer"
              >
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>Audit Trail</span>
              </button>
            </div>

            {/* Queue Counters */}
            <div className="space-y-1.5 text-xs pt-3 border-t border-white/[0.06]">
              <span className="text-[10px] font-mono uppercase text-slate-400 px-3 block mb-1">Queue Status</span>
              
              <div className="flex items-center justify-between px-3 py-1.5 rounded-lg text-slate-300">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>Pending Review</span>
                </span>
                <span className="font-mono font-bold text-amber-400">38</span>
              </div>

              <div className="flex items-center justify-between px-3 py-1.5 rounded-lg text-slate-300">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-400" />
                  <span>Discrepancies Flagged</span>
                </span>
                <span className="font-mono font-bold text-rose-400">{doc.discrepancyCount || 9}</span>
              </div>

              <div className="flex items-center justify-between px-3 py-1.5 rounded-lg text-slate-300">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Verified & Exported</span>
                </span>
                <span className="font-mono font-bold text-emerald-400">14,280</span>
              </div>
            </div>

          </div>

          {/* Bottom Engine badge */}
          <div className="p-3 bg-[#0D1424] rounded-xl border border-white/[0.08] text-[11px] text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D2FF] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00D2FF]" />
              </span>
              <span>Hybrid OCR Engine</span>
            </span>
            <span className="text-white font-mono font-bold">Active</span>
          </div>
        </div>

        {/* =========================================
            COLUMN 2: Center Workspace (6 cols)
           ========================================= */}
        <div className="lg:col-span-6 bg-[#06080F] p-5 flex flex-col justify-between border-r border-white/[0.08] relative">
          
          <div className="space-y-4">
            
            {/* Center Header: Document title + Actions */}
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div>
                <h3 className="font-bold text-white text-base tracking-tight">{doc.name}</h3>
                <p className="text-[10px] text-slate-400 font-mono">
                  SHA-256: {doc.hash.substring(0, 18)}... · Page 1 of {doc.pageCount}
                </p>
              </div>

              <div className="flex items-center gap-2 text-slate-400">
                <button
                  onClick={() => setIsStarred(!isStarred)}
                  className={`p-1.5 rounded-lg hover:bg-white/[0.06] transition-colors ${
                    isStarred ? 'text-amber-400' : 'text-slate-400'
                  }`}
                  title="Favorite Document"
                >
                  <Star className="w-4 h-4 fill-current" />
                </button>
                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`p-1.5 rounded-lg hover:bg-white/[0.06] transition-colors ${
                    isBookmarked ? 'text-[#00D2FF]' : 'text-slate-400'
                  }`}
                  title="Bookmark"
                >
                  <Bookmark className="w-4 h-4 fill-current" />
                </button>
                <button className="p-1.5 rounded-lg hover:bg-white/[0.06] transition-colors text-slate-400">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Document Canvas Container with Interactive Bounding Boxes */}
            <div className="flex items-center justify-center p-3 bg-[#0A0D18] rounded-2xl border border-white/[0.08] relative overflow-hidden shadow-inner">
              
              {/* Document Page Canvas */}
              <div
                className="relative bg-white text-slate-900 rounded-xl shadow-2xl transition-transform duration-200 select-none border border-slate-300 overflow-hidden"
                style={{
                  width: `${Math.round(440 * (zoomLevel / 100))}px`,
                  height: `${Math.round(560 * (zoomLevel / 100))}px`,
                  transform: `rotate(${rotation}deg)`,
                }}
              >
                {/* Animated Laser OCR Scan Line with Trailing Cyan Gradient */}
                <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00D2FF] to-transparent shadow-[0_0_12px_#00D2FF] pointer-events-none z-40 animate-scan-line" />

                {/* Page Content */}
                <div className="absolute inset-0 p-7 flex flex-col justify-between text-[11px] leading-tight font-sans">
                  
                  {/* Invoice Header */}
                  <div className="flex justify-between items-start border-b border-slate-200 pb-3">
                    <div>
                      <h2 className="text-sm font-black text-slate-900">APEX CLOUD SOLUTIONS INC.</h2>
                      <p className="text-slate-500 text-[9px]">Tax ID: US-94-2819024</p>
                      <p className="text-slate-500 text-[9px]">100 Innovation Way, Suite 400, San Francisco, CA</p>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-black text-[#0066FF]">INVOICE</span>
                      <p className="text-slate-800 font-bold font-mono text-[10px]">Invoice #: INV-2026-8819</p>
                      <p className="text-slate-500 text-[9px] font-mono">Date: 10/12/2026</p>
                    </div>
                  </div>

                  {/* Bill To */}
                  <div className="py-1">
                    <span className="text-[9px] font-bold uppercase text-slate-400 block">Bill To:</span>
                    <p className="font-bold text-slate-900 text-xs">OmniCorp Global Dynamics Ltd.</p>
                    <p className="text-slate-500 text-[9px]">Accounts Payable Dept · AP-8842</p>
                  </div>

                  {/* Table Line Items */}
                  <div className="border-t border-b border-slate-200 py-2.5 my-1 flex-1">
                    <div className="flex justify-between font-bold text-slate-700 text-[9px] border-b border-slate-100 pb-1">
                      <span>Description</span>
                      <span>Amount</span>
                    </div>
                    <div className="flex justify-between py-1 text-slate-800">
                      <span>Dedicated GPU Cluster (H100 Node 01)</span>
                      <span className="font-mono font-bold">$2,800.00</span>
                    </div>
                    <div className="flex justify-between py-1 text-slate-800">
                      <span>High-Throughput Vector Storage (4TB)</span>
                      <span className="font-mono font-bold">$1,400.00</span>
                    </div>
                  </div>

                  {/* Financial Summary */}
                  <div className="space-y-1 pt-1 text-right">
                    <div className="flex justify-between text-slate-600">
                      <span className="font-medium">Subtotal:</span>
                      <span className="font-mono font-bold text-slate-900">$4,200.00</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span className="font-medium">Tax (10% VAT):</span>
                      <span className="font-mono font-bold text-slate-900">$420.00</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-300 pt-1 text-xs font-black text-slate-900">
                      <span>Total Amount:</span>
                      <span className="font-mono text-[#0066FF]">
                        {doc.fields.find((f) => f.key === 'total_amount')?.rawValue || '$4,720.00'}
                      </span>
                    </div>
                  </div>

                  {/* Footer notes */}
                  <div className="pt-2 border-t border-slate-100 text-[8px] text-slate-400 flex justify-between">
                    <span>Terms: Net 30 Days (Due Nov 11, 2026)</span>
                    <span>Thank you for your business.</span>
                  </div>

                </div>

                {/* OVERLAID DYNAMIC EVIDENCE BOUNDING BOXES */}
                {doc.fields.map((field) => {
                  const isSelected = selectedFieldKey === field.key;
                  const hasWarning = field.warnings && field.warnings.length > 0;

                  return field.evidence.map((ev, idx) => (
                    <motion.div
                      key={`${field.key}-${idx}`}
                      onClick={() => {
                        setSelectedFieldKey(field.key);
                        setHighlightCoords({ x: ev.bbox.x, y: ev.bbox.y });
                      }}
                      title={`${field.label}: ${field.rawValue} (${field.confidence}% confidence)`}
                      className={`absolute rounded transition-all cursor-pointer ${
                        isSelected
                          ? 'ring-2 ring-[#00D2FF] bg-[#0066FF]/35 shadow-[0_0_15px_rgba(0,210,255,0.5)] z-30'
                          : hasWarning
                          ? 'border-2 border-dashed border-rose-500 bg-rose-500/20 hover:bg-rose-500/30 z-20'
                          : 'border border-[#00D2FF]/70 bg-[#00D2FF]/10 hover:bg-[#00D2FF]/30 z-10'
                      }`}
                      style={{
                        left: `${ev.bbox.x}%`,
                        top: `${ev.bbox.y}%`,
                        width: `${ev.bbox.width}%`,
                        height: `${ev.bbox.height}%`,
                      }}
                    >
                      {/* Bounding box label tag */}
                      {isSelected && (
                        <span className="absolute -top-5 left-0 text-[8px] font-mono font-bold bg-[#0066FF] text-white px-1.5 py-0.5 rounded shadow-md whitespace-nowrap animate-in fade-in zoom-in-95 duration-150">
                          {field.label} ({field.confidence}%)
                        </span>
                      )}
                    </motion.div>
                  ));
                })}

              </div>

            </div>

            {/* Document Controls Row */}
            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setZoomLevel((z) => Math.max(70, z - 15))}
                  className="p-1 rounded-lg bg-[#0E1322] hover:bg-[#161E34] text-white transition-colors"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="font-mono text-[11px] w-10 text-center text-white">{zoomLevel}%</span>
                <button
                  onClick={() => setZoomLevel((z) => Math.min(150, z + 15))}
                  className="p-1 rounded-lg bg-[#0E1322] hover:bg-[#161E34] text-white transition-colors"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setRotation((r) => (r + 90) % 360)}
                  className="p-1 rounded-lg bg-[#0E1322] hover:bg-[#161E34] text-white ml-1 transition-colors"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                </button>
              </div>

              <span className="text-[11px] font-mono text-[#00D2FF] flex items-center gap-1.5">
                <Crosshair className="w-3.5 h-3.5" />
                <span>Multi-Engine Coordinate Geometry Bound</span>
              </span>
            </div>

            {/* Operational Dialogue / Rule Evaluation card */}
            <div className="p-3.5 rounded-2xl bg-[#0D1424] border border-white/[0.08] space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                  Deterministic Rule Evaluation:
                </span>
                <span className="font-mono text-[10px] text-[#00D2FF]">Rule #DISC-101</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Subtotal ($4,200.00) + Tax ($420.00) = $4,620.00. Extracted total reads{' '}
                <strong className="text-rose-400 font-mono">
                  {doc.fields.find((f) => f.key === 'total_amount')?.rawValue || '$4,720.00'}
                </strong>{' '}
                {doc.fields.find((f) => f.key === 'total_amount')?.rawValue === '$4,620.00' ? (
                  <span className="text-emerald-400 font-semibold">(Resolved & Verified!)</span>
                ) : (
                  <span className="text-rose-400">(+$100.00 variance flagged)</span>
                )}
              </p>

              <div className="pt-1 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const f = doc.fields.find((field) => field.key === 'total_amount');
                      if (f) handleStartEdit(f);
                    }}
                    className="px-3 py-1 bg-gradient-to-r from-[#0066FF] to-[#00D2FF] hover:brightness-110 text-slate-950 font-bold rounded-lg text-[10px] flex items-center gap-1 cursor-pointer transition-all"
                  >
                    <Edit3 className="w-3 h-3 text-slate-950" />
                    <span>Correct to $4,620.00</span>
                  </button>
                  <span className="text-[10px] text-slate-400 font-mono">Evidence on Page 1</span>
                </div>

                <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Autofix Available
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* =========================================
            COLUMN 3: Right Inspector & History (3 cols)
           ========================================= */}
        <div className="lg:col-span-3 bg-[#080B14]/90 p-5 flex flex-col justify-between">
          
          <div className="space-y-5">
            
            {/* Top Bar: Notification Bell + Avatar with online dot + Blue Pill Button */}
            <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.08]">
              <div className="flex items-center gap-2.5">
                <div className="relative p-1.5 rounded-lg bg-white/[0.04] text-slate-400">
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#00D2FF]" />
                </div>

                <div className="relative">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#0066FF] to-[#00D2FF] flex items-center justify-center font-bold text-slate-950 text-[10px]">
                    AR
                  </div>
                  <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-1 ring-[#080B14]" />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleApprove}
                className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#00D2FF] to-[#0066FF] text-slate-950 font-bold text-xs shadow-md shadow-[#0066FF]/30 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-slate-950" />
                <span>Approve & Export</span>
              </motion.button>
            </div>

            {/* Verification History Header */}
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-white">Extraction History 65/250</span>
              <Trash2 className="w-3.5 h-3.5 text-slate-400 hover:text-white cursor-pointer" />
            </div>

            {/* Stacked Verification Cards */}
            <div className="space-y-2.5 text-xs">
              
              {/* Card 1: Line Item Check */}
              <div className="p-3 rounded-2xl bg-[#0D1424] border border-white/[0.06] space-y-1.5 hover:border-white/10 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-[11px]">Arithmetic Line Check</span>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">Verified</span>
                </div>
                <p className="text-[10px] text-slate-400">Reconciled Subtotal + Tax = Total Due</p>
                <div className="pt-1 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>Confidence: 99.8%</span>
                  <span className="text-[#00D2FF]">Just Now</span>
                </div>
              </div>

              {/* Card 2: Supplier Master */}
              <div className="p-3 rounded-2xl bg-[#0D1424] border border-white/[0.06] space-y-1.5 hover:border-white/10 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-[11px]">Supplier Master Check</span>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">Matched</span>
                </div>
                <p className="text-[10px] text-slate-400">Apex Cloud Solutions · Tax US-94-2819024</p>
                <div className="pt-1 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>ERP Registry</span>
                  <span className="text-[#00D2FF]">Yesterday</span>
                </div>
              </div>

              {/* Card 3: PO Cross-Check */}
              <div className="p-3 rounded-2xl bg-[#0D1424] border border-white/[0.06] space-y-1.5 hover:border-white/10 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-[11px]">Purchase Order Link</span>
                  <span className="text-[10px] font-mono text-blue-400 font-bold">PO-4491</span>
                </div>
                <p className="text-[10px] text-slate-400">Bound to authorized procurement line</p>
                <div className="pt-1 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>Match: 100%</span>
                  <span className="text-[#00D2FF]">Oct 11</span>
                </div>
              </div>

            </div>

            {/* Quick Sample Document Switcher */}
            {sampleDocuments.length > 0 && (
              <div className="pt-3 border-t border-white/[0.06] space-y-2">
                <span className="text-[10px] font-mono uppercase text-slate-400 block">Switch Document:</span>
                <div className="space-y-1">
                  {sampleDocuments.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => onSelectSample?.(s.id)}
                      className={`w-full text-left p-2 rounded-xl text-[11px] font-mono truncate transition-all cursor-pointer ${
                        doc.id === s.id
                          ? 'bg-[#0066FF]/25 text-[#00D2FF] font-bold border border-[#0066FF]/40'
                          : 'text-slate-400 hover:bg-white/[0.04] hover:text-white'
                      }`}
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Bottom Export Trigger */}
          <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
            <button
              onClick={() => onExportJSON(doc)}
              className="text-[#00D2FF] font-semibold hover:underline cursor-pointer"
            >
              Export JSON
            </button>
            <button
              onClick={() => onExportCSV(doc)}
              className="text-[#0066FF] font-semibold hover:underline cursor-pointer"
            >
              Export CSV
            </button>
          </div>

        </div>

      </div>

      {/* Field Edit Modal / Inline Drawer */}
      <AnimatePresence>
        {editingFieldKey && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              className="bg-[#0D1424] border border-white/20 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-[#00D2FF]" />
                  <h4 className="font-bold text-white text-sm">Human Verification & Correction</h4>
                </div>
                <button
                  onClick={() => setEditingFieldKey(null)}
                  className="text-slate-400 hover:text-white text-xs font-mono"
                >
                  Cancel
                </button>
              </div>

              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1">Field Label</label>
                <p className="text-white font-bold text-sm">{selectedField.label}</p>
              </div>

              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1">Corrected Value</label>
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="w-full bg-[#06080F] border border-white/15 rounded-xl px-3.5 py-2.5 text-white font-mono text-sm focus:outline-none focus:border-[#00D2FF]"
                  autoFocus
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1">Audit Reason / Justification</label>
                <input
                  type="text"
                  value={editReason}
                  onChange={(e) => setEditReason(e.target.value)}
                  placeholder="e.g. Corrected arithmetic sum based on line items"
                  className="w-full bg-[#06080F] border border-white/15 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-[#00D2FF]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setEditingFieldKey(null)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white text-xs transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleSaveEdit(editingFieldKey)}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#00D2FF] to-[#0066FF] text-slate-950 font-bold text-xs shadow-lg shadow-[#0066FF]/30 hover:brightness-110 active:scale-95 transition-all"
                >
                  Save & Re-verify
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
