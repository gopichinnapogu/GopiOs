import React from 'react';
import { 
  X, 
  Layers, 
  ExternalLink, 
  GitBranch, 
  Play, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight,
  Cpu
} from 'lucide-react';
import { ProjectItem } from '../../types';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onLaunchDemo?: (demoType: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onLaunchDemo
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#090e1a] border border-cyan-900/80 rounded-xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#060a13] border-b border-slate-800 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center space-x-3">
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-cyan-950 text-cyan-300 border border-cyan-800">
              {project.category}
            </span>
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">
              CASE STUDY // {project.slug}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-slate-400 hover:text-slate-100 hover:bg-slate-800/80 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-8 text-slate-300 text-xs sm:text-sm">
          {/* Title & Tagline */}
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-100">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base text-cyan-300/90 leading-relaxed font-sans">
              {project.tagline}
            </p>
          </div>

          {/* Key Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-[#0c1424] border border-slate-800">
                <div className="text-lg font-bold font-mono text-cyan-400">{m.value}</div>
                <div className="text-[11px] text-slate-400 font-sans">{m.label}</div>
              </div>
            ))}
          </div>

          {/* Problem & Goal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-lg bg-[#0b1220] border border-slate-800 space-y-2">
              <h4 className="font-mono font-semibold text-slate-200 uppercase tracking-wider text-xs flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                The Problem
              </h4>
              <p className="text-slate-300 text-xs leading-relaxed">{project.problem}</p>
            </div>

            <div className="p-4 rounded-lg bg-[#0b1220] border border-slate-800 space-y-2">
              <h4 className="font-mono font-semibold text-slate-200 uppercase tracking-wider text-xs flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Engineering Goal
              </h4>
              <p className="text-slate-300 text-xs leading-relaxed">{project.goal}</p>
            </div>
          </div>

          {/* Architecture Section */}
          <div className="space-y-3">
            <h4 className="font-mono font-semibold text-slate-200 uppercase tracking-wider text-xs flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-cyan-400" />
              Architecture & System Flow
            </h4>
            <p className="text-slate-300 leading-relaxed">{project.architectureDescription}</p>

            {project.architectureDiagram && (
              <div className="p-4 rounded-lg bg-[#05080f] border border-slate-800 font-mono text-[11px] text-cyan-300 space-y-1">
                {project.architectureDiagram.map((line, idx) => (
                  <div key={idx} className="whitespace-pre">{line}</div>
                ))}
              </div>
            )}
          </div>

          {/* Tech Stack */}
          <div className="space-y-2">
            <h4 className="font-mono font-semibold text-slate-400 uppercase tracking-wider text-xs">
              Tech Stack & Tooling
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded bg-slate-800/80 text-slate-200 font-mono text-xs border border-slate-700">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Challenges & Trade-offs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="font-mono font-semibold text-slate-400 uppercase tracking-wider text-xs">
                Key Technical Challenges
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {project.challenges.map((c, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-amber-400 font-bold">&bull;</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-mono font-semibold text-slate-400 uppercase tracking-wider text-xs">
                Architectural Trade-offs
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {project.tradeoffs.map((t, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-cyan-400 font-bold">&bull;</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Results & Lessons */}
          <div className="p-4 rounded-lg bg-[#070e1b] border border-cyan-950 space-y-3">
            <h4 className="font-mono font-semibold text-emerald-400 uppercase tracking-wider text-xs flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Verified Results & Engineering Lessons
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <div className="font-semibold text-slate-200">Production Results:</div>
                <ul className="space-y-1 text-slate-300">
                  {project.results.map((r, idx) => (
                    <li key={idx}>- {r}</li>
                  ))}
                </ul>
              </div>
              <div className="space-y-1">
                <div className="font-semibold text-slate-200">Lessons Learned:</div>
                <ul className="space-y-1 text-slate-300">
                  {project.lessons.map((l, idx) => (
                    <li key={idx}>- {l}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 bg-[#060a13] border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 sticky bottom-0 z-10">
          <div className="flex items-center space-x-3">
            {project.hasInteractiveDemo && (
              <button
                onClick={() => {
                  onClose();
                  if (onLaunchDemo && project.demoType) {
                    onLaunchDemo(project.demoType);
                  }
                  const el = document.getElementById('demo');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Launch Interactive Demo</span>
              </button>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs rounded border border-slate-700 transition-colors flex items-center gap-2"
              >
                <GitBranch className="w-3.5 h-3.5 text-cyan-400" />
                <span>GitHub Repository</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs rounded border border-slate-800 cursor-pointer"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
