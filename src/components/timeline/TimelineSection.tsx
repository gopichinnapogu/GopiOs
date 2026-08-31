import React, { useState } from 'react';
import { 
  Terminal, 
  CheckCircle2, 
  Calendar, 
  BookOpen, 
  Layers, 
  Award, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { timelineData } from '../../data/timeline';
import { TimelineMilestone } from '../../types';

export const TimelineSection: React.FC = () => {
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string>(timelineData[0].id);

  const activeMilestone: TimelineMilestone =
    timelineData.find((m) => m.id === selectedMilestoneId) || timelineData[0];

  return (
    <section id="timeline" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
      <div className="space-y-4 mb-10">
        <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400">
          <Terminal className="w-3.5 h-3.5" />
          <span className="uppercase tracking-wider">Module 06 // Engineering Trajectory & Timeline</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-100 tracking-tight">
          Developer Evolution & Milestones
        </h2>
        <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
          A chronologically verifiable progression from fundamentals in memory & OOP to distributed backends and zero-hallucination applied AI systems.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Timeline Year Rails */}
        <div className="lg:col-span-5 space-y-3 relative">
          <div className="absolute left-6 top-3 bottom-3 w-0.5 bg-slate-800 -z-10 hidden sm:block" />

          {timelineData.map((milestone) => {
            const isSelected = milestone.id === activeMilestone.id;
            return (
              <button
                key={milestone.id}
                id={`timeline-card-${milestone.id}`}
                onClick={() => setSelectedMilestoneId(milestone.id)}
                className={`w-full p-4 rounded-lg border text-left transition-all relative flex items-center justify-between group ${
                  isSelected
                    ? 'bg-cyan-950/40 border-cyan-500/70 shadow-md shadow-cyan-950/40'
                    : 'bg-[#0b1120] border-slate-800/80 hover:border-slate-700 hover:bg-[#0f172a]'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-xs ${
                    isSelected
                      ? 'bg-cyan-500 text-slate-950 ring-4 ring-cyan-950'
                      : 'bg-slate-800 text-slate-300'
                  }`}>
                    {milestone.year}
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider">
                      {milestone.period}
                    </div>
                    <div className={`text-sm font-semibold mt-0.5 ${
                      isSelected ? 'text-slate-100' : 'text-slate-300'
                    }`}>
                      {milestone.title}
                    </div>
                  </div>
                </div>

                <ArrowRight className={`w-4 h-4 transition-transform ${
                  isSelected ? 'text-cyan-400 translate-x-1' : 'text-slate-600 group-hover:text-slate-400'
                }`} />
              </button>
            );
          })}
        </div>

        {/* Right Column: Active Milestone Inspector */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-xl bg-[#0b1120] border border-cyan-900/60 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                  YEAR {activeMilestone.year} // {activeMilestone.period}
                </span>
                <h3 className="text-2xl font-bold font-display text-slate-100 mt-1">
                  {activeMilestone.title}
                </h3>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
                {activeMilestone.roleOrContext}
              </span>
            </div>

            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              {activeMilestone.summary}
            </div>

            {/* Key Accomplishments & Highlights */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
                Key Accomplishments & Concrete Proof
              </h4>
              <ul className="space-y-2">
                {activeMilestone.highlights.map((h, idx) => (
                  <li key={idx} className="flex items-start space-x-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Core Tech Stack Adopted in this phase */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
                Core Stack Focus
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeMilestone.technologies.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded bg-slate-850 bg-[#070e1b] text-cyan-300 text-xs font-mono border border-slate-800"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
