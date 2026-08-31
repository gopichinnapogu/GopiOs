import React, { useState, useEffect } from 'react';
import { 
  Search, 
  X, 
  Terminal, 
  Layers, 
  Code2, 
  FileText, 
  Mail, 
  Briefcase, 
  Sparkles, 
  ArrowRight,
  Cpu,
  FlaskConical
} from 'lucide-react';
import { NavSection } from '../../types';
import { projectsData } from '../../data/projects';
import { skillsData } from '../../data/skills';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (section: NavSection) => void;
  onOpenRecruiter: () => void;
  onOpenAI: () => void;
  onOpenResume: () => void;
  onSelectProject: (slug: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenRecruiter,
  onOpenAI,
  onOpenResume,
  onSelectProject
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // toggle handled by parent
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = (query || '').toLowerCase().trim();

  const filteredProjects = projectsData.filter(p => 
    (p.title?.toLowerCase() || '').includes(q) ||
    (p.techStack || []).some(t => (t?.toLowerCase() || '').includes(q))
  );

  const filteredSkills = skillsData.filter(s =>
    (s.name?.toLowerCase() || '').includes(q) ||
    (s.category?.toLowerCase() || '').includes(q)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 bg-black/70 backdrop-blur-xs">
      <div className="w-full max-w-2xl bg-[#090e1a] border border-cyan-900/80 rounded-xl shadow-2xl overflow-hidden font-sans">
        {/* Search Input */}
        <div className="p-4 bg-[#060a13] border-b border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-cyan-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, skills, thinking cases, or type a command..."
            className="flex-1 bg-transparent text-slate-100 placeholder-slate-500 text-sm focus:outline-none font-mono"
          />
          <kbd className="px-2 py-0.5 text-[10px] font-mono bg-slate-800 text-slate-400 rounded border border-slate-700">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="p-3 max-h-96 overflow-y-auto space-y-4 text-xs">
          {/* Quick Actions */}
          <div className="space-y-1">
            <div className="text-[10px] font-mono uppercase text-slate-500 px-2 font-semibold">
              Quick Actions
            </div>
            <button
              onClick={() => {
                onOpenRecruiter();
                onClose();
              }}
              className="w-full p-2.5 rounded-lg hover:bg-slate-800 text-slate-200 flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Briefcase className="w-4 h-4 text-amber-400" />
                <span className="font-semibold">Switch to Recruiter 45-Second View</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">&crarr;</span>
            </button>

            <button
              onClick={() => {
                onOpenAI();
                onClose();
              }}
              className="w-full p-2.5 rounded-lg hover:bg-slate-800 text-slate-200 flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span className="font-semibold">Open Grounded AI Assistant</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">&crarr;</span>
            </button>

            <button
              onClick={() => {
                onOpenResume();
                onClose();
              }}
              className="w-full p-2.5 rounded-lg hover:bg-slate-800 text-slate-200 flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold">View & Download Verified Resume</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">&crarr;</span>
            </button>
          </div>

          {/* Navigation Sections */}
          <div className="space-y-1">
            <div className="text-[10px] font-mono uppercase text-slate-500 px-2 font-semibold">
              Sections
            </div>
            {[
              { id: 'home', label: 'Home System Telemetry', icon: <Terminal className="w-3.5 h-3.5 text-cyan-400" /> },
              { id: 'projects', label: 'Projects & Case Studies', icon: <Layers className="w-3.5 h-3.5 text-cyan-400" /> },
              { id: 'skills', label: 'Skills & Concepts Matrix', icon: <Code2 className="w-3.5 h-3.5 text-cyan-400" /> },
              { id: 'demo', label: 'Interactive OS Simulator', icon: <Cpu className="w-3.5 h-3.5 text-cyan-400" /> },
              { id: 'lab', label: 'CodeLab (Interactive Playground)', icon: <FlaskConical className="w-3.5 h-3.5 text-cyan-400" /> },
              { id: 'thinking', label: 'How I Think (DSA Invariants)', icon: <Cpu className="w-3.5 h-3.5 text-cyan-400" /> },
              { id: 'contact', label: 'Contact Gateway', icon: <Mail className="w-3.5 h-3.5 text-cyan-400" /> }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id as NavSection);
                  onClose();
                  const el = document.getElementById(item.id);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full p-2 rounded hover:bg-slate-800/80 text-slate-300 flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">Go</span>
              </button>
            ))}
          </div>

          {/* Projects */}
          {filteredProjects.length > 0 && (
            <div className="space-y-1">
              <div className="text-[10px] font-mono uppercase text-slate-500 px-2 font-semibold">
                Projects
              </div>
              {filteredProjects.map(p => (
                <button
                  key={p.id}
                  onClick={() => {
                    onSelectProject(p.slug);
                    onClose();
                  }}
                  className="w-full p-2 rounded hover:bg-slate-800/80 text-slate-300 flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{p.title}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">{p.category}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
