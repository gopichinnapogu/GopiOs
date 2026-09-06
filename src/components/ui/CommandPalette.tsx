import React, { useState, useEffect } from 'react';
import { 
  Search, 
  X, 
  Layers, 
  Code2, 
  FileText, 
  Mail, 
  Sparkles, 
  ArrowRight
} from 'lucide-react';
import { NavSection } from '../../types';
import { projectsData } from '../../data/projects';

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
  onOpenAI,
  onOpenResume,
  onSelectProject
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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
    (p.tagline?.toLowerCase() || '').includes(q)
  );

  const quickNav = [
    { label: 'Home', section: 'home' as NavSection },
    { label: 'About', section: 'about' as NavSection },
    { label: 'Projects', section: 'projects' as NavSection },
    { label: 'Skills', section: 'skills' as NavSection },
    { label: 'Experience & Education', section: 'timeline' as NavSection },
    { label: 'Interactive CodeLab', section: 'lab' as NavSection },
    { label: 'Contact', section: 'contact' as NavSection }
  ].filter(item => !q || item.label.toLowerCase().includes(q));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl bg-white border border-[#E6E6E8] rounded-3xl shadow-[0_24px_64px_rgba(0,0,0,0.12)] overflow-hidden">
        {/* Search Header */}
        <div className="px-5 py-4 border-b border-[#E6E6E8] flex items-center space-x-3 bg-[#F8F7F8]">
          <Search className="w-5 h-5 text-[#686873]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, project, or section to navigate..."
            className="w-full bg-transparent text-sm text-[#151515] placeholder-[#686873] focus:outline-hidden"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#686873] hover:text-[#151515] hover:bg-[#EEF0F3]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-3 max-h-80 overflow-y-auto space-y-4">
          {/* Quick Actions */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#686873] px-3">
              Quick Actions
            </span>
            <div className="grid grid-cols-2 gap-1.5 pt-1">
              <button
                onClick={() => {
                  onClose();
                  onOpenResume();
                }}
                className="flex items-center space-x-2 px-3 py-2 rounded-xl hover:bg-[#F8F7F8] text-xs font-medium text-[#151515] text-left transition-colors"
              >
                <FileText className="w-4 h-4 text-[#C96F91]" />
                <span>View Resume</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onOpenAI();
                }}
                className="flex items-center space-x-2 px-3 py-2 rounded-xl hover:bg-[#F8F7F8] text-xs font-medium text-[#151515] text-left transition-colors"
              >
                <Sparkles className="w-4 h-4 text-[#C96F91]" />
                <span>Ask AI About Gopi</span>
              </button>
            </div>
          </div>

          {/* Quick Navigation */}
          {quickNav.length > 0 && (
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#686873] px-3">
                Navigation
              </span>
              <div className="space-y-0.5 pt-1">
                {quickNav.map((item) => (
                  <button
                    key={item.section}
                    onClick={() => {
                      onClose();
                      onNavigate(item.section);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-[#F8F7F8] text-xs font-medium text-[#151515] text-left transition-colors"
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#686873]" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {filteredProjects.length > 0 && (
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#686873] px-3">
                Projects
              </span>
              <div className="space-y-0.5 pt-1">
                {filteredProjects.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      onClose();
                      onSelectProject(p.slug);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-[#F8F7F8] text-xs text-[#151515] text-left transition-colors"
                  >
                    <div>
                      <div className="font-semibold">{p.title}</div>
                      <div className="text-[11px] text-[#686873] line-clamp-1">{p.tagline}</div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#FCE7F0] text-[#C96F91] font-semibold shrink-0 ml-2">
                      {p.badge}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
