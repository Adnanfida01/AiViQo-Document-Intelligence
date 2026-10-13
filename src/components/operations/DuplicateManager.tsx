import React from 'react';
import { Copy, Check, X, ShieldAlert, Sparkles, FileText } from 'lucide-react';
import { DuplicateCandidate } from '../../types';

interface DuplicateManagerProps {
  candidates: DuplicateCandidate[];
  onDecide: (candidateId: string, decision: 'confirmed' | 'dismissed') => void;
}

export const DuplicateManager: React.FC<DuplicateManagerProps> = ({ candidates, onDecide }) => {
  return (
    <div className="bg-[#0f1422] rounded-3xl border border-slate-800 p-6 space-y-5">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <Copy className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Multi-Signal Duplicate Detection</h3>
            <p className="text-xs text-slate-400">Binary SHA-256 fingerprinting & perceptual layout similarity</p>
          </div>
        </div>

        <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
          {candidates.filter((c) => c.status === 'pending').length} Candidates
        </span>
      </div>

      <div className="space-y-4">
        {candidates.map((cand) => (
          <div
            key={cand.id}
            className={`p-4 rounded-2xl border transition-all text-xs space-y-3 ${
              cand.status !== 'pending' ? 'bg-slate-900/40 border-slate-800 opacity-60' : 'bg-[#121829] border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white">{cand.similarityScore}% Similarity Match</span>
                <span className="text-slate-500 font-mono">· {cand.detectedAt}</span>
              </div>

              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase ${
                cand.status === 'pending'
                  ? 'bg-amber-500/20 text-amber-400'
                  : cand.status === 'confirmed'
                  ? 'bg-rose-500/20 text-rose-400'
                  : 'bg-emerald-500/20 text-emerald-400'
              }`}>
                {cand.status}
              </span>
            </div>

            <p className="text-slate-300 text-xs">{cand.matchReason}</p>

            {/* Comparison Cards */}
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase block mb-1">Original Document (A)</span>
                <p className="text-white font-bold truncate">{cand.documentAName}</p>
                <p className="text-[10px] text-slate-400">Status: Approved in Ledger</p>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase block mb-1">Candidate Duplicate (B)</span>
                <p className="text-[#00d2ff] font-bold truncate">{cand.documentBName}</p>
                <p className="text-[10px] text-slate-400">Status: Awaiting Verification</p>
              </div>
            </div>

            {cand.status === 'pending' && (
              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  onClick={() => onDecide(cand.id, 'dismissed')}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Dismiss (Legitimate New File)
                </button>
                <button
                  onClick={() => onDecide(cand.id, 'confirmed')}
                  className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Confirm Duplicate</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
