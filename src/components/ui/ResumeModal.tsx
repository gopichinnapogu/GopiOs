import React from 'react';
import { 
  X, 
  Printer, 
  Mail, 
  MapPin, 
  GitBranch, 
  CheckCircle2,
  GraduationCap
} from 'lucide-react';
import { profileData } from '../../data/profile';
import { projectsData } from '../../data/projects';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md overflow-y-auto print:p-0 print:bg-white print:static">
      <div className="relative w-full max-w-3xl bg-white border border-[#E6E6E8] rounded-3xl shadow-[0_24px_64px_rgba(0,0,0,0.12)] overflow-hidden my-8 max-h-[90vh] flex flex-col print:max-h-none print:border-none print:shadow-none print:bg-white print:text-black">
        {/* Header Bar */}
        <div className="px-6 py-4 bg-[#F8F7F8] border-b border-[#E6E6E8] flex items-center justify-between sticky top-0 z-10 print:hidden">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#C96F91]" />
            <span className="text-xs font-semibold text-[#151515]">
              Resume // Gopi Chinnapogu
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-[#C96F91] hover:bg-[#B85B80] text-white font-semibold text-xs flex items-center gap-1.5 transition-all shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[#686873] hover:text-[#151515] hover:bg-[#EEF0F3] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Resume Content Body */}
        <div className="p-8 sm:p-10 overflow-y-auto space-y-6 text-[#151515] text-xs sm:text-sm print:p-0">
          {/* Header */}
          <div className="border-b border-[#E6E6E8] pb-6 space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#151515] tracking-tight">
              {profileData.name}
            </h1>
            <p className="text-sm font-semibold text-[#C96F91]">
              Computer Science Undergraduate & Aspiring Software Developer
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#686873] pt-1">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-[#C96F91]" />
                {profileData.email}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#C96F91]" />
                {profileData.location.split('(')[0].trim()}
              </span>
              <span className="flex items-center gap-1">
                <GitBranch className="w-3.5 h-3.5 text-[#C96F91]" />
                github.com/gopichinnapogu
              </span>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#C96F91]">
              Education
            </h2>
            <div className="p-4 rounded-xl bg-[#F8F7F8] border border-[#E6E6E8] flex justify-between items-start">
              <div>
                <h3 className="font-bold text-sm text-[#151515]">
                  {profileData.degree}
                </h3>
                <p className="text-xs text-[#686873]">
                  {profileData.university}
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold text-[#C96F91]">
                  2022 – 2026
                </span>
                <p className="text-[11px] text-[#686873]">CGPA: ~8.5</p>
              </div>
            </div>
          </div>

          {/* Technical Stack */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#C96F91]">
              Technical Skills
            </h2>
            <div className="p-4 rounded-xl bg-[#F8F7F8] border border-[#E6E6E8] space-y-2 text-xs">
              <div>
                <strong className="text-[#151515]">Languages:</strong>{' '}
                <span className="text-[#686873]">Java, Python, JavaScript, TypeScript, C/C++, SQL, HTML5, CSS3</span>
              </div>
              <div>
                <strong className="text-[#151515]">Frameworks & Libraries:</strong>{' '}
                <span className="text-[#686873]">React, Node.js, Express, Tailwind CSS, Vite</span>
              </div>
              <div>
                <strong className="text-[#151515]">Databases & Tools:</strong>{' '}
                <span className="text-[#686873]">MongoDB, PostgreSQL, Git, GitHub, Docker, Linux</span>
              </div>
            </div>
          </div>

          {/* Featured Projects */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#C96F91]">
              Featured Projects
            </h2>
            <div className="space-y-3">
              {projectsData.slice(0, 3).map((p) => (
                <div key={p.id} className="p-4 rounded-xl bg-white border border-[#E6E6E8] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm text-[#151515]">{p.title}</h3>
                    <span className="text-[11px] px-2 py-0.5 rounded-md bg-[#FCE7F0] text-[#C96F91] font-semibold">
                      {p.badge}
                    </span>
                  </div>
                  <p className="text-xs text-[#686873]">{p.tagline}</p>
                  <div className="text-[11px] text-[#151515] font-mono pt-1">
                    Tech: {p.techStack.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
