import React from 'react';
import { 
  Terminal, 
  Cpu, 
  Layers, 
  Target, 
  Lightbulb, 
  BookOpen, 
  GraduationCap, 
  ShieldCheck 
} from 'lucide-react';
import { profileData } from '../../data/profile';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
      <div className="space-y-4 mb-10">
        <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400">
          <Terminal className="w-3.5 h-3.5" />
          <span className="uppercase tracking-wider">Module 01 // System Architecture & Engineering Identity</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-100 tracking-tight">
          How I Build & Engineer Software
        </h2>
        <p className="text-slate-400 text-sm max-w-3xl leading-relaxed">
          I approach software engineering with an infrastructure-first mindset: optimizing for deterministic invariants, memory boundaries, clean API contracts, and verifiable factuality over superficial visual gimmicks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1: Core Philosophy */}
        <div className="p-6 rounded-lg bg-[#0b1120] border border-slate-800 hover:border-cyan-900/60 transition-all space-y-3">
          <div className="w-9 h-9 rounded bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400">
            <Lightbulb className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-100 font-display">
            Engineering Philosophy
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            {profileData.aboutPhilosophy}
          </p>
          <div className="pt-2 flex items-center gap-1.5 text-[11px] font-mono text-cyan-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Mechanical Sympathy & Rigor</span>
          </div>
        </div>

        {/* Card 2: Current Technical Focus */}
        <div className="p-6 rounded-lg bg-[#0b1120] border border-slate-800 hover:border-cyan-900/60 transition-all space-y-3">
          <div className="w-9 h-9 rounded bg-teal-950/80 border border-teal-800/60 flex items-center justify-center text-teal-400">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-100 font-display">
            Active Focus Areas
          </h3>
          <ul className="space-y-2 text-xs text-slate-300">
            {profileData.currentFocus.map((focus, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <span className="text-teal-400 font-mono font-bold">&bull;</span>
                <span>{focus}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Card 3: Academic Background & Foundation */}
        <div className="p-6 rounded-lg bg-[#0b1120] border border-slate-800 hover:border-cyan-900/60 transition-all space-y-3">
          <div className="w-9 h-9 rounded bg-blue-950/80 border border-blue-800/60 flex items-center justify-center text-blue-400">
            <GraduationCap className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-100 font-display">
            Academic Bedrock
          </h3>
          <div className="space-y-1 text-xs">
            <div className="font-semibold text-slate-200">{profileData.university}</div>
            <div className="text-slate-400 font-mono">Major: Computer Science & Engineering</div>
            <div className="text-slate-400 pt-2 leading-relaxed">
              Rigorous coursework in Data Structures & Algorithms, Operating Systems, Database Management Systems, Computer Networks, and Theory of Computation.
            </div>
          </div>
        </div>
      </div>

      {/* Systems Architecture Stack Strip */}
      <div className="mt-8 p-4 rounded-lg bg-[#080d18] border border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs">
        <div className="flex items-center space-x-3 text-slate-300">
          <Cpu className="w-4 h-4 text-cyan-400" />
          <span className="font-semibold text-slate-200">System Design Pillars:</span>
          <span className="text-slate-400">Deterministic Invariants</span>
          <span className="text-slate-600">/</span>
          <span className="text-slate-400">Zero-Leaking State</span>
          <span className="text-slate-600">/</span>
          <span className="text-slate-400">Strict Factual Guardrails</span>
        </div>
        <div className="text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded border border-cyan-800/40">
          SYSTEM HEALTH: 100% OPERATIONAL
        </div>
      </div>
    </section>
  );
};
