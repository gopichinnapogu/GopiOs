import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Briefcase, 
  Sparkles, 
  Search, 
  FileText, 
  Menu, 
  X, 
  Cpu, 
  CheckCircle2, 
  GitBranch,
  Mail,
  Layers,
  Code2,
  FlaskConical,
  Users
} from 'lucide-react';
import { NavSection } from '../../types';
import { useVisitorCount } from '../../hooks/useVisitorCount';

interface NavbarProps {
  activeSection: NavSection;
  onNavigate: (section: NavSection) => void;
  recruiterMode: boolean;
  onToggleRecruiter: () => void;
  onOpenAI: () => void;
  onOpenCommandPalette: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  recruiterMode,
  onToggleRecruiter,
  onOpenAI,
  onOpenCommandPalette
}) => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { count: visitorCount } = useVisitorCount();

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setCurrentTime(d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems: { id: NavSection; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Terminal className="w-3.5 h-3.5" /> },
    { id: 'about', label: 'About', icon: <Cpu className="w-3.5 h-3.5" /> },
    { id: 'skills', label: 'Skills', icon: <Code2 className="w-3.5 h-3.5" /> },
    { id: 'projects', label: 'Projects', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'demo', label: 'Simulator', icon: <Terminal className="w-3.5 h-3.5" /> },
    { id: 'lab', label: 'CodeLab', icon: <FlaskConical className="w-3.5 h-3.5" /> },
    { id: 'thinking', label: 'How I Think', icon: <Cpu className="w-3.5 h-3.5" /> },
    { id: 'timeline', label: 'Timeline', icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
    { id: 'github', label: 'GitHub', icon: <GitBranch className="w-3.5 h-3.5" /> },
    { id: 'contact', label: 'Contact', icon: <Mail className="w-3.5 h-3.5" /> }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#090d16]/90 backdrop-blur-md">
      {/* Top Telemetry / Status Bar */}
      <div className="px-4 py-1.5 bg-[#05080f]/80 border-b border-slate-800/40 text-[11px] font-mono text-slate-400 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-slate-200 font-semibold tracking-wider">GOPI OS v2.6</span>
          </div>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="text-slate-400 hidden sm:inline">KERNEL: DETERMINISTIC</span>
          <span className="text-slate-600 hidden md:inline">|</span>
          <span className="text-slate-400 hidden md:inline">LATENCY: &lt; 14ms</span>
          <span className="text-slate-600 hidden lg:inline">|</span>
          <div 
            className="flex items-center space-x-1 px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/40 text-cyan-300 font-mono text-[10px]"
            title="Unique Visitors: Deduplicated per new user device/session"
          >
            <Users className="w-3 h-3 text-cyan-400" />
            <span className="text-slate-400">UNIQUE USERS:</span>
            <span className="font-bold text-cyan-300">
              {visitorCount !== null ? visitorCount.toLocaleString() : '...'}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="text-cyan-400 font-mono font-medium hidden sm:block">
            UTC {currentTime || '00:00:00'}
          </div>

          <button
            id="nav-recruiter-toggle"
            onClick={onToggleRecruiter}
            className={`flex items-center space-x-1.5 px-2.5 py-0.5 rounded text-xs font-sans font-medium transition-all ${
              recruiterMode
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-sm shadow-amber-500/10'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-slate-100 border border-slate-700/60'
            }`}
            title="Toggle Recruiter Evaluation Mode"
          >
            <Briefcase className="w-3 h-3 text-amber-400" />
            <span>{recruiterMode ? 'Standard View' : 'Recruiter Mode'}</span>
          </button>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center space-x-2 text-left group cursor-pointer"
        >
          <div className="w-8 h-8 rounded bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-slate-950 font-bold font-mono text-sm shadow-md shadow-cyan-900/30 group-hover:scale-105 transition-transform">
            G
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-slate-100 font-display group-hover:text-cyan-400 transition-colors">
              Gopi Chinnapogu
            </span>
            <span className="text-[10px] font-mono text-cyan-400/80 -mt-1">
              Software Systems Engineer
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id && !recruiterMode;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-700/60 font-semibold shadow-xs'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Command Palette, AI Companion, Mobile Hamburger */}
        <div className="flex items-center space-x-2">
          {/* ⌘K Command Palette Button */}
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center space-x-2 px-2.5 py-1.5 rounded-md bg-slate-900/90 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 text-xs font-mono transition-colors"
            title="Open Command Palette (⌘K)"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden md:inline">Command</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.2 text-[10px] bg-slate-800 border border-slate-700 rounded text-slate-400 font-mono">
              ⌘K
            </kbd>
          </button>

          {/* AI Companion Trigger */}
          <button
            id="nav-ai-button"
            onClick={onOpenAI}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-md bg-gradient-to-r from-cyan-950 to-blue-950 hover:from-cyan-900 hover:to-blue-900 text-cyan-300 border border-cyan-800/80 text-xs font-medium transition-all shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Ask AI</span>
          </button>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-800 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-[#070b14]/95 px-4 py-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-xs font-medium ${
                activeSection === item.id
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                  : 'text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
