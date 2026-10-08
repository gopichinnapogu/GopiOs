import React from 'react';
import { 
  Briefcase, 
  FileText, 
  Mail, 
  GitBranch, 
  Globe, 
  CheckCircle2, 
  Download, 
  ExternalLink, 
  Cpu, 
  Layers, 
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { profileData } from '../../data/profile';
import { projectsData } from '../../data/projects';
import { skillsData } from '../../data/skills';

interface RecruiterModeViewProps {
  onOpenResume: () => void;
  onExitRecruiterMode: () => void;
  onSelectProject: (slug: string) => void;
}

export const RecruiterModeView: React.FC<RecruiterModeViewProps> = ({
  onOpenResume,
  onExitRecruiterMode,
  onSelectProject
}) => {
  const flagshipProjects = projectsData.filter((p) => p.featured).slice(0, 3);
  const primarySkills = skillsData.slice(0, 8);

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8 animate-fadeIn">
      {/* Recruiter Header Banner */}
      <div className="p-6 rounded-xl bg-[#091122] border border-amber-500/50 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-mono font-bold tracking-wider uppercase">
            <Briefcase className="w-4 h-4" />
            <span>Recruiter Evaluation Mode // 45-Second High-Density Overview</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-slate-100">
            {profileData.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 font-sans">
            {profileData.role} &bull; {profileData.degree} &bull; Open for Software Engineering Roles
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onOpenResume}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded transition-colors flex items-center gap-2 shadow-md shadow-amber-500/20 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Inspect Resume</span>
          </button>

          <a
            href={`mailto:${profileData.email}?subject=Software Engineering Opportunity - Interview Request`}
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs rounded transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email Directly</span>
          </a>

          <button
            onClick={onExitRecruiterMode}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded border border-slate-700 transition-colors cursor-pointer"
          >
            Exit Recruiter Mode
          </button>
        </div>
      </div>

      {/* 30-Second Fast Highlights Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-lg bg-[#0b1222] border border-slate-800">
          <div className="text-xs font-mono text-slate-400 uppercase">Algorithmic Proof</div>
          <div className="text-2xl font-bold font-mono text-cyan-400 mt-1">450+ Solved</div>
          <div className="text-[11px] text-slate-400 mt-0.5">LeetCode DSA Invariants</div>
        </div>

        <div className="p-4 rounded-lg bg-[#0b1222] border border-slate-800">
          <div className="text-xs font-mono text-slate-400 uppercase">Primary Stack</div>
          <div className="text-xl font-bold font-mono text-emerald-400 mt-1">Java & TypeScript</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Systems & APIs</div>
        </div>

        <div className="p-4 rounded-lg bg-[#0b1222] border border-slate-800">
          <div className="text-xs font-mono text-slate-400 uppercase">Architecture</div>
          <div className="text-xl font-bold font-mono text-blue-400 mt-1">Distributed Queues</div>
          <div className="text-[11px] text-slate-400 mt-0.5">4.5k jobs/sec DLQ engine</div>
        </div>

        <div className="p-4 rounded-lg bg-[#0b1222] border border-slate-800">
          <div className="text-xs font-mono text-slate-400 uppercase">Applied AI</div>
          <div className="text-xl font-bold font-mono text-amber-400 mt-1">Grounded RAG</div>
          <div className="text-[11px] text-slate-400 mt-0.5">0% Hallucination Target</div>
        </div>
      </div>

      {/* Flagship Projects Summary */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold font-display text-slate-100 flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          Top 3 Flagship Engineering Case Studies
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {flagshipProjects.map((p) => (
            <div
              key={p.id}
              className="p-5 rounded-lg bg-[#0b1120] border border-slate-800 hover:border-cyan-800 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                    {p.category}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {p.metrics[0].label}: <strong className="text-slate-200">{p.metrics[0].value}</strong>
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-100 font-display">
                  {p.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {p.tagline}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex gap-1 font-mono text-[10px] text-slate-400">
                  {p.techStack.slice(0, 3).join(' • ')}
                </div>
                <button
                  onClick={() => onSelectProject(p.slug)}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <span>Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Core Verified Skills Checklist */}
      <div className="p-6 rounded-xl bg-[#0b1120] border border-slate-800 space-y-4">
        <h2 className="text-lg font-bold font-display text-slate-100 flex items-center gap-2">
          <Cpu className="w-4 h-4 text-emerald-400" />
          Verified Technical Competency Matrix
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {primarySkills.map((s) => (
            <div key={s.id} className="p-3 rounded bg-[#070e1b] border border-slate-800/80 space-y-1">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-200">
                <span>{s.name.split('(')[0].trim()}</span>
                <span className="text-[10px] font-mono text-cyan-400">{s.level}</span>
              </div>
              <p className="text-[11px] text-slate-400 line-clamp-2">
                {s.coreConcepts.slice(0, 2).join(', ')}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Recruiter Action Bar */}
      <div className="p-6 rounded-xl bg-gradient-to-r from-cyan-950/40 via-[#0b1220] to-blue-950/40 border border-cyan-900/60 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-100 font-display">
            Ready to schedule a technical discussion?
          </h3>
          <p className="text-xs text-slate-400 pt-0.5">
            Direct email response guaranteed within 24 hours.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <a
            href={`mailto:${profileData.email}`}
            className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded transition-colors flex items-center gap-2 shadow-md shadow-cyan-900/30 cursor-pointer"
          >
            <Mail className="w-4 h-4" />
            <span>Send Email ({profileData.email})</span>
          </a>
        </div>
      </div>
    </div>
  );
};
