import React from 'react';
import { AlertTriangle, CheckCircle2, ShieldAlert, ArrowRight, Check } from 'lucide-react';
import { DiscrepancyItem } from '../../types';

interface DiscrepancyPanelProps {
  discrepancies: DiscrepancyItem[];
  onResolve: (discrepancyId: string) => void;
  onSelectDocument: (docId: string) => void;
}

export const DiscrepancyPanel: React.FC<DiscrepancyPanelProps> = ({
  discrepancies,
  onResolve,
  onSelectDocument,
}) => {
  return (
    <div className="bg-[#0f1422] rounded-3xl border border-slate-800 p-6 space-y-5">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Discrepancy & Conflict Detection</h3>
            <p className="text-xs text-slate-400">Deterministic cross-field arithmetic & vendor registry validation</p>
          </div>
        </div>

        <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30">
          {discrepancies.filter((d) => !d.resolved).length} Open Discrepancies
        </span>
      </div>

      <div className="space-y-3">
        {discrepancies.map((disc) => (
          <div
            key={disc.id}
            className={`p-4 rounded-2xl border transition-all text-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
              disc.resolved
                ? 'bg-slate-900/40 border-slate-800 text-slate-400 opacity-70'
                : 'bg-rose-950/20 border-rose-500/40 text-slate-200'
            }`}
          >
            <div className="space-y-1 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                  disc.severity === 'Critical' ? 'bg-rose-500/30 text-rose-300' : 'bg-amber-500/30 text-amber-300'
                }`}>
                  {disc.severity} Severity
                </span>
                <span className="font-bold text-white text-xs">{disc.ruleName}</span>
                <span className="text-slate-500 font-mono">· {disc.detectedAt}</span>
              </div>

              <p className="text-slate-300 text-xs leading-relaxed">{disc.explanation}</p>

              {disc.suggestedFix && !disc.resolved && (
                <p className="text-[#00d2ff] font-mono text-[11px] pt-1">
                  💡 Suggested Remediation: {disc.suggestedFix}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => onSelectDocument(disc.documentId)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                Inspect in Canvas
              </button>

              {!disc.resolved && (
                <button
                  onClick={() => onResolve(disc.id)}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Mark Resolved</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
