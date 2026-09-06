import React from 'react';
import { 
  X, 
  ExternalLink, 
  GitBranch, 
  Play, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Layers
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white border border-[#E6E6E8] rounded-3xl shadow-[0_24px_64px_rgba(0,0,0,0.14)] overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#F8F7F8] border-b border-[#E6E6E8] flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center space-x-2.5">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#FCE7F0] text-[#C96F91]">
              {project.badge || project.category}
            </span>
            <span className="text-xs text-[#686873] font-medium hidden sm:inline">
              Project Details
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#686873] hover:text-[#151515] hover:bg-[#EEF0F3] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-[#151515] text-sm leading-relaxed">
          {/* Cover image if available */}
          {project.imageUrl && (
            <div className="w-full h-56 sm:h-72 rounded-2xl overflow-hidden border border-[#E6E6E8] bg-[#F8F7F8]">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Title & Tagline */}
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#151515] tracking-tight">
              {project.title}
            </h2>
            <p className="text-base text-[#686873]">
              {project.tagline}
            </p>
          </div>

          {/* Metrics Row */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-[#F8F7F8] border border-[#E6E6E8]">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="text-left">
                  <div className="text-xs font-medium text-[#686873]">{m.label}</div>
                  <div className="text-base font-bold text-[#C96F91] mt-0.5">{m.value}</div>
                </div>
              ))}
            </div>
          )}

          {/* Problem & Goal */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-[#E6E6E8] space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#686873]">
                Problem
              </span>
              <p className="text-xs sm:text-sm text-[#151515] leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#E6E6E8] space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C96F91]">
                Solution & Goal
              </span>
              <p className="text-xs sm:text-sm text-[#151515] leading-relaxed">
                {project.solution || project.goal}
              </p>
            </div>
          </div>

          {/* Tech Stack Pills */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#686873]">
              Technologies Used
            </span>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-lg bg-[#F8F7F8] text-[#151515] border border-[#E6E6E8] text-xs font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Key Results / Takeaways */}
          {project.results && project.results.length > 0 && (
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#686873]">
                Key Results & Impact
              </span>
              <div className="space-y-2">
                {project.results.map((res, idx) => (
                  <div key={idx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-[#151515]">
                    <CheckCircle2 className="w-4 h-4 text-[#C96F91] shrink-0 mt-0.5" />
                    <span>{res}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 bg-[#F8F7F8] border-t border-[#E6E6E8] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-white hover:bg-[#EEF0F3] border border-[#E6E6E8] text-xs sm:text-sm font-semibold text-[#151515] transition-all"
              >
                <GitBranch className="w-4 h-4" />
                <span>GitHub Source</span>
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-white hover:bg-[#EEF0F3] border border-[#E6E6E8] text-xs sm:text-sm font-semibold text-[#151515] transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Preview</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#C96F91] hover:bg-[#B85B80] text-white text-xs sm:text-sm font-semibold transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
