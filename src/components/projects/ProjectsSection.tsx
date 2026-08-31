import React, { useState } from 'react';
import { 
  Layers, 
  Terminal, 
  ArrowRight, 
  ExternalLink, 
  Play, 
  Cpu, 
  Sparkles, 
  Network,
  CheckCircle2,
  FileCode2
} from 'lucide-react';
import { projectsData } from '../../data/projects';
import { ProjectItem } from '../../types';
import { ProjectDetailModal } from './ProjectDetailModal';

interface ProjectsSectionProps {
  onLaunchDemo?: (demoType: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onLaunchDemo }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  const categories = ['All', 'Flagship', 'Distributed Systems', 'AI & Machine Learning', 'System & Architecture'];

  const filteredProjects = projectsData.filter(p => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'Flagship') return p.featured;
    return p.category === selectedCategory;
  });

  return (
    <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
      <div className="space-y-4 mb-10">
        <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400">
          <Terminal className="w-3.5 h-3.5" />
          <span className="uppercase tracking-wider">Module 03 // Production Systems & Engineering Case Studies</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-100 tracking-tight">
              Featured Software Projects
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl pt-1">
              Engineered with mechanical sympathy, deterministic invariants, and production-ready safety guardrails. Click any case study to inspect technical trade-offs and architecture diagrams.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-700/60 font-semibold shadow-sm'
                    : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            id={`project-card-${project.id}`}
            className="rounded-xl bg-[#0b1120] border border-slate-800 hover:border-cyan-800/60 transition-all flex flex-col justify-between group overflow-hidden shadow-lg hover:shadow-cyan-950/30"
          >
            {/* Card Header & Badge */}
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800/60">
                  {project.badge}
                </span>
                {project.hasInteractiveDemo && (
                  <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-800/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    SIMULATOR READY
                  </span>
                )}
              </div>

              {/* Title & Tagline */}
              <div>
                <h3 className="text-xl font-bold font-display text-slate-100 group-hover:text-cyan-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 mt-1.5 leading-relaxed font-sans">
                  {project.tagline}
                </p>
              </div>

              {/* Metric Chips */}
              <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-xs">
                {project.metrics.slice(0, 2).map((m, idx) => (
                  <div key={idx} className="p-2 rounded bg-[#080d19] border border-slate-800/80">
                    <div className="text-slate-400 text-[10px] uppercase">{m.label}</div>
                    <div className="text-cyan-400 font-bold">{m.value}</div>
                  </div>
                ))}
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.techStack.slice(0, 4).map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-slate-800/70 text-slate-300 text-[11px] font-mono border border-slate-700/60"
                  >
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 4 && (
                  <span className="px-1.5 py-0.5 rounded bg-slate-800/40 text-slate-400 text-[10px] font-mono">
                    +{project.techStack.length - 4}
                  </span>
                )}
              </div>
            </div>

            {/* Card Action Buttons */}
            <div className="p-4 bg-[#070b14] border-t border-slate-800/80 flex items-center justify-between gap-2">
              <button
                onClick={() => setActiveModalProject(project)}
                className="flex-1 py-2 px-3 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 border border-slate-700"
              >
                <span>Inspect Case Study</span>
                <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
              </button>

              {project.hasInteractiveDemo && (
                <button
                  onClick={() => {
                    if (onLaunchDemo && project.demoType) {
                      onLaunchDemo(project.demoType);
                    }
                    const el = document.getElementById('demo');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="py-2 px-3 rounded bg-cyan-950/80 hover:bg-cyan-900/80 text-cyan-300 text-xs font-semibold border border-cyan-800/60 transition-colors flex items-center gap-1.5"
                  title="Launch Interactive Simulator"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span className="hidden sm:inline">Demo</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Case Study Detail Modal */}
      {activeModalProject && (
        <ProjectDetailModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
          onLaunchDemo={onLaunchDemo}
        />
      )}
    </section>
  );
};
