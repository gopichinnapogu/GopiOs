import React from 'react';
import { 
  ArrowUp, 
  Mail, 
  MapPin, 
  Heart,
  ExternalLink,
  Code2,
  Sparkles
} from 'lucide-react';
import { profileData } from '../../data/profile';
import { NavSection } from '../../types';

interface FooterProps {
  onNavigate?: (section: NavSection) => void;
  onOpenRecruiter: () => void;
  onOpenResume: () => void;
  onOpenAI: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenResume,
  onOpenAI
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks: { label: string; section: NavSection }[] = [
    { label: 'Home', section: 'home' },
    { label: 'About', section: 'about' },
    { label: 'Projects', section: 'projects' },
    { label: 'Skills', section: 'skills' },
    { label: 'Experience', section: 'timeline' },
    { label: 'Contact', section: 'contact' },
    { label: 'CodeLab', section: 'lab' }
  ];

  return (
    <footer className="border-t border-[#E6E6E8] bg-[#F8F7F8] text-[#686873] py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#E6E6E8]">
          {/* Col 1: Brand & Purpose */}
          <div className="md:col-span-5 space-y-4 text-left">
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-2xl tracking-tight text-[#151515]">
                GOPI
              </span>
              <span className="w-2 h-2 rounded-full bg-[#C96F91]" />
            </div>

            <p className="text-sm text-[#686873] max-w-sm leading-relaxed">
              Building a better tomorrow with code, creativity and purpose. Aspiring software engineer crafting scalable, user-centric digital experiences.
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <a
                href={profileData.github}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-xl bg-white border border-[#E6E6E8] text-xs font-semibold text-[#151515] hover:text-[#C96F91] hover:border-[#E8A0B8]/60 transition-colors"
              >
                GitHub
              </a>
              <a
                href={profileData.linkedin}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-xl bg-white border border-[#E6E6E8] text-xs font-semibold text-[#151515] hover:text-[#C96F91] hover:border-[#E8A0B8]/60 transition-colors"
              >
                LinkedIn
              </a>
              <button
                onClick={onOpenResume}
                className="px-3 py-1.5 rounded-xl bg-white border border-[#E6E6E8] text-xs font-semibold text-[#151515] hover:text-[#C96F91] hover:border-[#E8A0B8]/60 transition-colors"
              >
                Resume
              </button>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-4 space-y-3 text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#151515]">
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => onNavigate?.(link.section)}
                  className="text-left py-1 text-[#686873] hover:text-[#C96F91] transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Col 3: Let's Connect */}
          <div className="md:col-span-3 space-y-3 text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#151515]">
              Let's Connect
            </h4>
            <div className="space-y-2 text-sm text-[#686873]">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#C96F91] shrink-0" />
                <a
                  href={`mailto:${profileData.email}`}
                  className="hover:text-[#151515] transition-colors truncate"
                >
                  {profileData.email}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-[#C96F91] shrink-0" />
                <span>{profileData.location.split('(')[0].trim()}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenAI}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#FCE7F0] border border-[#E8A0B8]/40 text-xs font-semibold text-[#C96F91] hover:bg-[#fbd6e3] transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ask AI About Gopi</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#686873]">
          <div className="flex items-center space-x-1">
            <span>© 2025-{new Date().getFullYear()} Gopi Chinnapogu. All rights reserved. Made with</span>
            <Heart className="w-3.5 h-3.5 text-[#C96F91] fill-[#C96F91]" />
            <span>and coffee.</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#E6E6E8] hover:border-[#C96F91] text-[#151515] font-medium transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
