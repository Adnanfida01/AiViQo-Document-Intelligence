import React from 'react';
import { Cpu, RefreshCw, CheckCircle2, Clock, Play } from 'lucide-react';
import { ProcessingJob } from '../../types';

interface ProcessingQueueViewProps {
  jobs: ProcessingJob[];
  onTriggerNewJob: () => void;
}

export const ProcessingQueueView: React.FC<ProcessingQueueViewProps> = ({ jobs, onTriggerNewJob }) => {
  return (
    <div className="bg-[#0f1422] rounded-3xl border border-slate-800 p-6 space-y-5">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Active Document Processing Queue</h3>
            <p className="text-xs text-slate-400">Asynchronous BullMQ worker pool running OCR & schema extraction</p>
          </div>
        </div>

        <button
          onClick={onTriggerNewJob}
          className="px-3.5 py-1.5 bg-[#00d2ff] hover:bg-[#20d9ff] text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <Play className="w-3.5 h-3.5" />
          <span>Simulate Pipeline Job</span>
        </button>
      </div>

      <div className="space-y-3">
        {jobs.map((job) => (
          <div key={job.id} className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2.5 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-white block">{job.documentName}</span>
                <span className="text-[11px] text-slate-400 font-mono">Job ID: {job.id} · Engine: {job.engine}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[#00d2ff] font-mono font-bold flex items-center gap-1">
                  <RefreshCw className="w-3 h-3 animate-spin" />
                  {job.progressPercent}%
                </span>
                <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full">
                  {job.stageName}
                </span>
              </div>
            </div>

            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#00d2ff] to-[#356dff] transition-all duration-300"
                style={{ width: `${job.progressPercent}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
