import React from 'react';
import { 
  X, 
  Download, 
  Printer, 
  ExternalLink, 
  Mail, 
  Phone, 
  MapPin, 
  GitBranch, 
  Globe,
  CheckCircle2
} from 'lucide-react';
import { profileData } from '../../data/profile';
import { projectsData } from '../../data/projects';
import { skillsData } from '../../data/skills';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto print:p-0 print:bg-white print:static">
      <div className="relative w-full max-w-4xl bg-[#090e1a] border border-cyan-900/80 rounded-xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col print:max-h-none print:border-none print:shadow-none print:bg-white print:text-black">
        {/* Header Bar */}
        <div className="px-6 py-4 bg-[#060a13] border-b border-slate-800 flex items-center justify-between sticky top-0 z-10 print:hidden">
          <div className="flex items-center space-x-3">
            <span className="text-xs font-mono font-semibold text-cyan-400">
              DOCUMENT // VERIFIED_RESUME.PDF
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-md text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Resume Content Body */}
        <div className="p-8 sm:p-12 overflow-y-auto space-y-6 text-slate-200 text-xs font-sans print:p-0 print:text-black">
          {/* Header */}
          <div className="border-b border-slate-700 pb-4 space-y-2 print:border-black">
            <h1 className="text-3xl font-extrabold text-slate-100 font-display tracking-tight print:text-black">
              {profileData.name}
            </h1>
            <p className="text-sm font-semibold text-cyan-400 font-mono print:text-gray-800">
              {profileData.role} &bull; {profileData.degree}
            </p>
            <div className="flex flex-wrap gap-4 text-xs text-slate-400 font-mono pt-1 print:text-gray-600">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-cyan-400 print:text-black" />
                <span>{profileData.email}</span>
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 print:text-black" />
                <span>{profileData.location}</span>
              </span>
              <span className="flex items-center gap-1">
                <GitBranch className="w-3.5 h-3.5 text-cyan-400 print:text-black" />
                <span>github.com/gopichinnapogu</span>
              </span>
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-cyan-400 print:text-black" />
                <span>linkedin.com/in/gopichinnapogu</span>
              </span>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 border-b border-slate-800 pb-1 print:text-black print:border-black">
              Education
            </h2>
            <div className="flex justify-between items-start">
              <div>
                <div className="font-bold text-slate-100 print:text-black text-sm">{profileData.university}</div>
                <div className="text-slate-300 print:text-gray-700">{profileData.degree}</div>
              </div>
              <div className="text-right font-mono text-slate-400 print:text-gray-600">
                <div>2022 – 2026</div>
                <div>Hyderabad, India</div>
              </div>
            </div>
          </div>

          {/* Technical Skills Matrix */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 border-b border-slate-800 pb-1 print:text-black print:border-black">
              Technical Skills
            </h2>
            <div className="space-y-1.5 text-xs">
              <div>
                <strong className="text-slate-100 print:text-black font-semibold">Languages: </strong>
                <span className="text-slate-300 print:text-gray-700">Java (21, Concurrency, JVM), TypeScript / JavaScript (ESNext), Python 3, C++, SQL (PostgreSQL)</span>
              </div>
              <div>
                <strong className="text-slate-100 print:text-black font-semibold">Backend & Systems: </strong>
                <span className="text-slate-300 print:text-gray-700">Express, Node.js, REST APIs, Microservices, Token Bucket Rate Limiting, Connection Pools, WebSockets</span>
              </div>
              <div>
                <strong className="text-slate-100 print:text-black font-semibold">Applied AI & Machine Learning: </strong>
                <span className="text-slate-300 print:text-gray-700">Google Gemini API, Grounded RAG Architectures, Vector Search, Strict Anti-Hallucination Guardrails</span>
              </div>
              <div>
                <strong className="text-slate-100 print:text-black font-semibold">Tools & Infrastructure: </strong>
                <span className="text-slate-300 print:text-gray-700">Git, Docker, Linux / Bash, Postman, Vite, Tailwind CSS, Turborepo</span>
              </div>
            </div>
          </div>

          {/* Featured Projects */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 border-b border-slate-800 pb-1 print:text-black print:border-black">
              Featured Software Engineering Projects
            </h2>

            {projectsData.slice(0, 3).map((p) => (
              <div key={p.id} className="space-y-1">
                <div className="flex justify-between items-baseline">
                  <div className="font-bold text-slate-100 print:text-black text-sm">
                    {p.title} <span className="font-normal text-xs text-slate-400 print:text-gray-600">| {p.techStack.slice(0, 4).join(', ')}</span>
                  </div>
                  <span className="font-mono text-slate-400 text-[11px] print:text-gray-600">
                    {p.metrics[0].label}: {p.metrics[0].value}
                  </span>
                </div>
                <p className="text-slate-300 print:text-gray-700 leading-relaxed text-xs">
                  {p.goal}
                </p>
                <ul className="list-disc list-inside space-y-0.5 text-slate-400 print:text-gray-600 text-[11px]">
                  {p.results.map((r, idx) => (
                    <li key={idx}>{r}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Problem Solving & DSA */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 border-b border-slate-800 pb-1 print:text-black print:border-black">
              Competitive Problem Solving & Algorithmic Rigor
            </h2>
            <div className="text-xs text-slate-300 print:text-gray-700 space-y-1">
              <div>
                <strong>450+ Data Structures & Algorithms Solved: </strong>
                <span>Consistently practicing invariants across Monotonic Queues, Segment Trees, Dynamic Programming with bitmasks, and Graph Traversals (Dijkstra, BFS/DFS, Tarjan's SCC).</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
