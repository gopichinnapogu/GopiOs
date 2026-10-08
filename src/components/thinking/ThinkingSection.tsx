import React, { useState } from 'react';
import { 
  Terminal, 
  Cpu, 
  Lightbulb, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Clock, 
  HardDrive,
  Copy,
  Check
} from 'lucide-react';
import { thinkingData } from '../../data/thinking';
import { ProblemThinkingItem } from '../../types';

export const ThinkingSection: React.FC = () => {
  const [activeProblemId, setActiveProblemId] = useState<string>(thinkingData[0].id);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const activeProblem: ProblemThinkingItem =
    thinkingData.find((p) => p.id === activeProblemId) || thinkingData[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeProblem.codeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="thinking" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
      <div className="space-y-4 mb-8">
        <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400">
          <Terminal className="w-3.5 h-3.5" />
          <span className="uppercase tracking-wider">Module 05 // Engineering Thought Process & Invariants</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-100 tracking-tight">
          How I Think & Solve Problems
        </h2>
        <p className="text-slate-400 text-sm max-w-3xl leading-relaxed">
          True engineering capability is evidenced by how constraints are formulated, which mathematical invariants are identified, and why specific trade-offs are chosen over naive approaches.
        </p>

        {/* Problem Selection Navigation Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          {thinkingData.map((problem) => {
            const isSelected = problem.id === activeProblem.id;
            return (
              <button
                key={problem.id}
                id={`thinking-tab-${problem.id}`}
                onClick={() => setActiveProblemId(problem.id)}
                className={`p-3.5 rounded-lg border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-cyan-950/40 border-cyan-500/70 shadow-md shadow-cyan-950/40'
                    : 'bg-[#0b1120] border-slate-800/80 hover:border-slate-700 hover:bg-[#0f172a]'
                }`}
              >
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                    {problem.category}
                  </span>
                  <h3 className={`text-xs sm:text-sm font-bold font-display mt-1 ${
                    isSelected ? 'text-slate-100' : 'text-slate-300'
                  }`}>
                    {problem.title}
                  </h3>
                </div>
                <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-slate-400 border-t border-slate-800/60 pt-2">
                  <span>Time: {problem.complexity.time.split(' ')[0]}</span>
                  <span className={isSelected ? 'text-cyan-400 font-semibold' : 'text-slate-500'}>
                    Inspect &rarr;
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Deep-Dive Problem Card */}
      <div className="rounded-xl bg-[#0b1120] border border-cyan-900/60 shadow-2xl p-6 sm:p-8 space-y-6">
        {/* Header & Problem Statement */}
        <div className="space-y-3 pb-4 border-b border-slate-800">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
              {activeProblem.category}
            </span>
            <div className="flex items-center space-x-3 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>Time: <strong className="text-slate-200">{activeProblem.complexity.time}</strong></span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <HardDrive className="w-3.5 h-3.5 text-emerald-400" />
                <span>Space: <strong className="text-slate-200">{activeProblem.complexity.space}</strong></span>
              </span>
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-100">
            {activeProblem.title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            {activeProblem.problemStatement}
          </p>
        </div>

        {/* Constraints & Key Invariant Observation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Constraints */}
          <div className="p-4 rounded-lg bg-[#070c18] border border-slate-800 space-y-2">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
              Rigid Engineering Constraints
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {activeProblem.constraints.map((c, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-amber-400 font-bold">&bull;</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Observation */}
          <div className="p-4 rounded-lg bg-[#070c18] border border-cyan-900/40 space-y-2">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-cyan-400" />
              Core Invariant Observation
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              {activeProblem.keyObservation}
            </p>
          </div>
        </div>

        {/* Step-by-Step Approach Flow */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
            Step-by-Step Solution Pipeline
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {activeProblem.approachSteps.map((step) => (
              <div
                key={step.step}
                className="p-3.5 rounded-lg bg-[#070e1b] border border-slate-800/80 space-y-1.5"
              >
                <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs font-bold">
                  <span className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-700 flex items-center justify-center text-[10px]">
                    {step.step}
                  </span>
                  <span>{step.title}</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Code Implementation */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>DETERMINISTIC IMPLEMENTATION // {activeProblem.codeLanguage.toUpperCase()}</span>
            </span>
            <button
              onClick={handleCopyCode}
              className="flex items-center space-x-1 text-cyan-400 hover:text-cyan-300 text-[11px] bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40 cursor-pointer"
            >
              {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
            </button>
          </div>

          <div className="p-4 rounded-lg bg-[#05080e] border border-slate-800 font-mono text-xs text-cyan-200 overflow-x-auto leading-relaxed">
            <pre>{activeProblem.codeSnippet}</pre>
          </div>
        </div>

        {/* Alternatives Rejected & Engineering Takeaways */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-slate-800">
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
              Why Alternative Approaches Were Rejected
            </h4>
            <div className="space-y-2">
              {activeProblem.alternativesConsidered.map((alt, idx) => (
                <div key={idx} className="p-2.5 rounded bg-[#070b14] border border-slate-800 text-xs space-y-0.5">
                  <div className="font-semibold text-slate-200 font-mono flex items-center gap-1 text-[11px]">
                    <AlertTriangle className="w-3 h-3 text-amber-400" />
                    <span>{alt.approach}</span>
                  </div>
                  <div className="text-slate-400 text-[11px]">{alt.drawback}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Engineering Takeaway
            </h4>
            <div className="p-4 rounded-lg bg-[#07131e] border border-cyan-950 text-xs text-slate-200 leading-relaxed font-sans">
              {activeProblem.engineeringTakeaways}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
