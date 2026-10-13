import React, { useState } from 'react';
import { FileText, Download, Search, ShieldCheck } from 'lucide-react';
import { AuditLogItem } from '../../types';

interface AuditTrailViewProps {
  logs: AuditLogItem[];
  onExportCSV: () => void;
}

export const AuditTrailView: React.FC<AuditTrailViewProps> = ({ logs, onExportCSV }) => {
  const [filter, setFilter] = useState('');

  const filteredLogs = logs.filter(
    (l) =>
      l.action.toLowerCase().includes(filter.toLowerCase()) ||
      l.actor.toLowerCase().includes(filter.toLowerCase()) ||
      l.documentName.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="bg-[#0f1422] rounded-3xl border border-slate-800 p-6 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Immutable Audit Trail</h3>
            <p className="text-xs text-slate-400">Append-only compliance ledger recording every reviewer change</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search audit trail..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="text-xs bg-slate-900 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-white focus:outline-none focus:ring-1 focus:ring-[#00d2ff]"
            />
          </div>

          <button
            onClick={onExportCSV}
            className="px-3.5 py-1.5 bg-[#00d2ff] hover:bg-[#20d9ff] text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-800">
            <tr>
              <th className="p-3">Action</th>
              <th className="p-3">Document</th>
              <th className="p-3">Actor / Engine</th>
              <th className="p-3">Change Details</th>
              <th className="p-3">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            {filteredLogs.map((log) => (
              <tr key={log.id} className="hover:bg-slate-900/40">
                <td className="p-3 font-bold text-[#00d2ff]">{log.action}</td>
                <td className="p-3 text-white truncate max-w-[200px]">{log.documentName}</td>
                <td className="p-3 text-slate-400">{log.actor}</td>
                <td className="p-3 text-slate-300">
                  {log.previousValue && log.newValue ? (
                    <span>
                      <span className="line-through text-slate-500 mr-1.5">{log.previousValue}</span>
                      <span className="text-emerald-400 font-bold">→ {log.newValue}</span>
                    </span>
                  ) : (
                    log.reason || 'Operational transition'
                  )}
                </td>
                <td className="p-3 text-slate-500 text-[11px]">{log.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
