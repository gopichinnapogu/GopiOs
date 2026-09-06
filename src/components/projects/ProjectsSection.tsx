import React, { useState } from 'react';
import { 
  ArrowRight, 
  ExternalLink, 
  Search,
  GitBranch,
  Sparkles
} from 'lucide-react';
import { projectsData } from '../../data/projects';
import { ProjectItem } from '../../types';
import { ProjectDetailModal } from './ProjectDetailModal';

interface ProjectsSectionProps {
  onLaunchDemo?: (demoType: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onLaunchDemo }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  const filterTabs = ['All', 'Web Apps', 'UI/UX', 'Other'];

  const filteredProjects = projectsData.filter((project) => {
    // Category filtering
    let matchesCategory = true;
    if (selectedFilter === 'Web Apps') {
      matchesCategory = project.category === 'Web Apps' || project.category === 'Full-Stack Product';
    } else if (selectedFilter === 'UI/UX') {
      matchesCategory = project.category === 'UI/UX';
    } else if (selectedFilter === 'Other') {
      matchesCategory = project.category === 'Distributed Systems' || project.category === 'AI & Machine Learning' || project.category === 'System & Architecture' || project.category === 'Other';
    }

    // Search query filtering
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch = query === '' || 
      project.title.toLowerCase().includes(query) ||
      project.tagline.toLowerCase().includes(query) ||
      project.techStack.some(t => t.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-[#E6E6E8]/70">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#FCE7F0] border border-[#E8A0B8]/40 shadow-2xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#C96F91]">
            My Projects
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#151515] tracking-tight">
          Things I’ve Built
        </h2>

        <p className="text-base text-[#686873] leading-relaxed">
          Here are some of the projects I’ve worked on. Each project represents a problem, a learning experience, and a step forward in my journey.
        </p>
      </div>

      {/* Filter Tabs & Search Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedFilter(tab)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                selectedFilter === tab
                  ? 'bg-[#C96F91] text-white shadow-sm'
                  : 'bg-[#F8F7F8] text-[#686873] hover:text-[#151515] hover:bg-[#EEF0F3] border border-[#E6E6E8]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#686873]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-[#E6E6E8] text-xs sm:text-sm text-[#151515] placeholder-[#686873] focus:outline-hidden focus:border-[#C96F91] transition-all shadow-2xs"
          />
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-16 p-8 rounded-3xl bg-[#F8F7F8] border border-[#E6E6E8]">
          <p className="text-[#686873] text-sm">
            No projects matched your search "{searchQuery}". Try selecting another category or clearing your query.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-3xl bg-white border border-[#E6E6E8] hover:border-[#E8A0B8]/60 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_-6px_rgba(201,111,145,0.12)] transition-all flex flex-col justify-between overflow-hidden card-hover-effect group"
            >
              <div>
                {/* Visual Image Banner */}
                <div className="relative w-full h-48 bg-[#F8F7F8] border-b border-[#E6E6E8] overflow-hidden">
                  <img
                    src={project.imageUrl || '/project_taskflow.jpg'}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-white/90 backdrop-blur-md text-[#151515] border border-white/80 shadow-2xs">
                      {project.badge || project.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-[#151515] group-hover:text-[#C96F91] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#686873] leading-relaxed line-clamp-2">
                    {project.tagline}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg bg-[#F8F7F8] border border-[#E6E6E8] text-[11px] font-medium text-[#151515]"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="px-2 py-1 rounded-lg bg-[#F8F7F8] text-[11px] font-medium text-[#686873]">
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-6 pb-6 pt-2 border-t border-[#E6E6E8]/60 flex items-center justify-between">
                <button
                  onClick={() => setActiveModalProject(project)}
                  className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-semibold text-[#C96F91] hover:text-[#B85B80] transition-colors cursor-pointer"
                >
                  <span>View Project</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center space-x-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      title="GitHub Repository"
                      className="p-1.5 rounded-lg text-[#686873] hover:text-[#151515] hover:bg-[#F8F7F8] transition-colors"
                    >
                      <GitBranch className="w-4 h-4" />
                    </a>
                  )}

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      title="Live Demo"
                      className="p-1.5 rounded-lg text-[#686873] hover:text-[#151515] hover:bg-[#F8F7F8] transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Project Detail Modal */}
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
