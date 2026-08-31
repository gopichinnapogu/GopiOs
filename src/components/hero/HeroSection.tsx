import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Terminal, 
  ArrowRight, 
  Sparkles, 
  Briefcase, 
  Cpu, 
  CheckCircle2, 
  Code2, 
  Layers, 
  Download,
  Copy,
  Check
} from 'lucide-react';
import { profileData } from '../../data/profile';
import { NavSection } from '../../types';

interface HeroSectionProps {
  onNavigate: (section: NavSection) => void;
  onOpenRecruiter: () => void;
  onOpenAI: () => void;
  onOpenResume: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate,
  onOpenRecruiter,
  onOpenAI,
  onOpenResume
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [cliInput, setCliInput] = useState('');
  const [cliOutput, setCliOutput] = useState<string>('Type "help" or "skills" to execute system commands.');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCliSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = (cliInput || '').trim().toLowerCase();
    setCliInput('');

    switch (cmd) {
      case 'help':
        setCliOutput('Available commands: skills, projects, dsa, contact, recruiter, ai, clear');
        break;
      case 'skills':
        setCliOutput('Primary Stack: Java 21, TypeScript, Python, SQL, Express, Gemini RAG, Docker');
        break;
      case 'projects':
        setCliOutput('Flagship: 1. GOPI OS Core  2. Distributed Orchestrator  3. Grounded RAG  4. Log Stream');
        break;
      case 'dsa':
        setCliOutput('DSA Focus: 450+ solved. Specialized in Monotonic Queues, DP Invariants, and Graph Algorithms.');
        break;
      case 'recruiter':
        onOpenRecruiter();
        setCliOutput('Switching to Recruiter 45-second high impact overview...');
        break;
      case 'ai':
        onOpenAI();
        setCliOutput('Opening Grounded AI Assistant Drawer...');
        break;
      case 'contact':
        onNavigate('contact');
        setCliOutput(`Contact Gopi directly at: ${profileData.email}`);
        break;
      case 'clear':
        setCliOutput('');
        break;
      default:
        setCliOutput(`Command not recognized: "${cmd}". Type "help" for available commands.`);
    }
  };

  return (
    <section id="home" className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-radial-glow pointer-events-none -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Hero Narrative */}
        <div className="lg:col-span-7 space-y-6">
          {/* Status Badge */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-slate-300">Software Engineer & Systems Builder</span>
            <span className="text-slate-600">•</span>
            <span className="text-cyan-400 font-semibold">{profileData.location.split('(')[0].trim()}</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-slate-100 leading-[1.1]">
              Architecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500">Resilient Systems</span> & Grounded AI.
            </h1>
            <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed max-w-2xl pt-2">
              Hi, I'm <strong className="text-slate-100 font-semibold">Gopi Chinnapogu</strong>. I build high-throughput backend services, distributed task dispatchers, and zero-hallucination factual AI engines with strict type safety and mechanical sympathy.
            </p>
          </div>

          {/* Quick Technical Badges */}
          <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs">
            {['Java 21 & Concurrency', 'TypeScript / Node.js', 'Distributed Systems', 'Grounded RAG (Gemini)', 'SQL & Invariant DSA'].map((badge, idx) => (
              <span 
                key={idx} 
                className="px-2.5 py-1 rounded bg-slate-800/80 text-slate-300 border border-slate-700/60"
              >
                {badge}
              </span>
            ))}
          </div>

          {/* Key Metric Telemetry */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 rounded-lg bg-[#0b1222]/80 border border-slate-800/80">
              <div className="text-2xl font-bold font-mono text-cyan-400">450+</div>
              <div className="text-xs text-slate-400 font-sans">DSA Solved</div>
            </div>
            <div className="p-3 rounded-lg bg-[#0b1222]/80 border border-slate-800/80">
              <div className="text-2xl font-bold font-mono text-emerald-400">8+</div>
              <div className="text-xs text-slate-400 font-sans">Shipped Projects</div>
            </div>
            <div className="p-3 rounded-lg bg-[#0b1222]/80 border border-slate-800/80">
              <div className="text-2xl font-bold font-mono text-blue-400">&lt; 14ms</div>
              <div className="text-xs text-slate-400 font-sans">P99 System Latency</div>
            </div>
            <div className="p-3 rounded-lg bg-[#0b1222]/80 border border-slate-800/80">
              <div className="text-2xl font-bold font-mono text-amber-400">99.9%</div>
              <div className="text-xs text-slate-400 font-sans">Factual Precision</div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-4">
            <button
              id="hero-btn-projects"
              onClick={() => onNavigate('projects')}
              className="px-5 py-2.5 rounded-md bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/20"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="hero-btn-recruiter"
              onClick={onOpenRecruiter}
              className="px-4 py-2.5 rounded-md bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-medium text-xs sm:text-sm border border-amber-500/40 transition-colors flex items-center gap-2"
            >
              <Briefcase className="w-4 h-4 text-amber-400" />
              <span>Recruiter 45s View</span>
            </button>

            <button
              id="hero-btn-ai"
              onClick={onOpenAI}
              className="px-4 py-2.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs sm:text-sm border border-slate-700 transition-colors flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Ask AI Companion</span>
            </button>

            <button
              id="hero-btn-copy-email"
              onClick={handleCopyEmail}
              className="px-3 py-2.5 rounded-md bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs font-mono border border-slate-800 transition-colors flex items-center gap-1.5"
              title="Copy Email Address"
            >
              {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedEmail ? 'Copied!' : 'Copy Email'}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Interactive Mini CLI Terminal */}
        <div className="lg:col-span-5">
          <div className="rounded-lg bg-[#0b1120] border border-cyan-900/60 shadow-xl overflow-hidden font-mono text-xs">
            {/* Terminal Header */}
            <div className="px-4 py-2.5 bg-[#070b14] border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
                <span className="text-[11px] text-slate-400 ml-2 font-semibold">gopi@kernel:~$</span>
              </div>
              <span className="text-[10px] text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                LIVE TERMINAL
              </span>
            </div>

            {/* Terminal Content Body */}
            <div className="p-4 space-y-3 min-h-[220px] max-h-[300px] overflow-y-auto">
              <div className="text-slate-400">
                <span className="text-cyan-400 font-bold">&gt;</span> Gopi Chinnapogu (CSE B.Tech)
              </div>
              <div className="text-slate-400">
                <span className="text-cyan-400 font-bold">&gt;</span> Status: Ready for high-impact software engineering roles
              </div>
              <div className="text-slate-400">
                <span className="text-cyan-400 font-bold">&gt;</span> Architecture: Zero-overhead deterministic design
              </div>

              {cliOutput && (
                <div className="p-2.5 rounded bg-[#070d1a] border border-cyan-900/40 text-cyan-300 whitespace-pre-wrap leading-relaxed">
                  {cliOutput}
                </div>
              )}
            </div>

            {/* Quick Interactive Command Bar */}
            <form onSubmit={handleCliSubmit} className="p-3 bg-[#070b14] border-t border-slate-800 flex items-center gap-2">
              <span className="text-cyan-400 font-bold">$</span>
              <input
                type="text"
                value={cliInput}
                onChange={(e) => setCliInput(e.target.value)}
                placeholder="Try: skills, projects, dsa, recruiter..."
                className="flex-1 bg-transparent text-slate-200 placeholder-slate-600 focus:outline-none text-xs font-mono"
              />
              <button
                type="submit"
                className="px-2.5 py-1 bg-cyan-900/60 hover:bg-cyan-800 text-cyan-200 text-[11px] rounded border border-cyan-700/50"
              >
                Execute
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
