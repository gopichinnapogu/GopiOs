import React from 'react';
import { 
  GitBranch, 
  Mail, 
  Globe, 
  ShieldCheck, 
  Terminal, 
  ArrowUp,
  Cpu,
  Sparkles,
  Users
} from 'lucide-react';
import { profileData } from '../../data/profile';
import { useVisitorCount } from '../../hooks/useVisitorCount';

interface FooterProps {
  onOpenRecruiter: () => void;
  onOpenResume: () => void;
  onOpenAI: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenRecruiter,
  onOpenResume,
  onOpenAI
}) => {
  const { count: visitorCount, isNewVisitor } = useVisitorCount();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800/80 bg-[#060a12] text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Col 1: System Info & Identity */}
        <div className="md:col-span-5 space-y-3">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded bg-cyan-600 flex items-center justify-center text-slate-950 font-bold font-mono text-xs">
              G
            </div>
            <span className="font-bold text-slate-100 text-sm font-display">
              GOPI OS // ARCHITECTURE PLATFORM
            </span>
          </div>
          <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
            Designed as a high-density, interactive developer operating system demonstrating backend engineering rigor, deterministic algorithmic invariants, and grounded factual AI integration.
          </p>
          <div className="flex items-center space-x-2 text-[11px] font-mono text-cyan-400 pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Zero Hallucination Grounding Protocol Active</span>
          </div>

          <div className="pt-2">
            <div className="inline-flex items-center space-x-2.5 px-3 py-1.5 rounded-lg bg-[#080d1a] border border-slate-800 text-xs font-mono">
              <div className="flex items-center space-x-1.5 text-cyan-400">
                <Users className="w-3.5 h-3.5" />
                <span className="text-slate-400">Unique Visitors:</span>
              </div>
              <span className="font-bold text-slate-100 text-sm">
                {visitorCount !== null ? visitorCount.toLocaleString() : 'Loading...'}
              </span>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                Deduped Live
              </span>
            </div>
          </div>
        </div>

        {/* Col 2: Quick System Navigation */}
        <div className="md:col-span-3 space-y-2">
          <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-200">
            Quick Modules
          </h4>
          <ul className="space-y-1.5 text-xs font-mono">
            <li>
              <a href="#about" className="hover:text-cyan-400 transition-colors">01 // Engineering Identity</a>
            </li>
            <li>
              <a href="#skills" className="hover:text-cyan-400 transition-colors">02 // Skills & Concepts</a>
            </li>
            <li>
              <a href="#projects" className="hover:text-cyan-400 transition-colors">03 // Production Systems</a>
            </li>
            <li>
              <a href="#demo" className="hover:text-cyan-400 transition-colors">04 // Simulator & Benchmarks</a>
            </li>
            <li>
              <a href="#lab" className="hover:text-cyan-400 transition-colors">04.5 // CodeLab (Interactive Labs)</a>
            </li>
            <li>
              <a href="#thinking" className="hover:text-cyan-400 transition-colors">05 // How I Think (DSA)</a>
            </li>
            <li>
              <a href="#timeline" className="hover:text-cyan-400 transition-colors">06 // Trajectory</a>
            </li>
          </ul>
        </div>

        {/* Col 3: Evaluator Actions & Socials */}
        <div className="md:col-span-4 space-y-3">
          <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-200">
            Evaluator Controls
          </h4>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={onOpenRecruiter}
              className="px-3 py-1.5 rounded bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs font-medium border border-amber-500/40 transition-colors"
            >
              Recruiter Mode
            </button>
            <button
              onClick={onOpenResume}
              className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
            >
              Inspect Resume
            </button>
            <button
              onClick={onOpenAI}
              className="px-3 py-1.5 rounded bg-cyan-950 hover:bg-cyan-900 text-cyan-300 text-xs font-medium border border-cyan-800 transition-colors flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>Ask AI Companion</span>
            </button>
          </div>

          <div className="flex items-center space-x-3 pt-2">
            <a
              href={profileData.github}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded bg-[#090e1a] hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 transition-colors"
              title="GitHub Profile"
            >
              <GitBranch className="w-4 h-4" />
            </a>
            <a
              href={profileData.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded bg-[#090e1a] hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 transition-colors"
              title="LinkedIn Profile"
            >
              <Globe className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${profileData.email}`}
              className="p-2 rounded bg-[#090e1a] hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 transition-colors"
              title="Send Direct Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Telemetry Bar */}
      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-400 gap-2">
        <div>
          &copy; {new Date().getFullYear()} Gopi Chinnapogu &bull; Built with TypeScript, React & Google Gemini API
        </div>

        <button
          onClick={scrollToTop}
          className="flex items-center space-x-1 hover:text-cyan-400 transition-colors cursor-pointer"
        >
          <span>Scroll to top</span>
          <ArrowUp className="w-3 h-3" />
        </button>
      </div>
    </footer>
  );
};
