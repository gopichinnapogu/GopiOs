import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  ArrowRight, 
  Sparkles,
  Search,
  Code2
} from 'lucide-react';
import { NavSection } from '../../types';

interface NavbarProps {
  activeSection: NavSection;
  onNavigate: (section: NavSection) => void;
  recruiterMode?: boolean;
  onToggleRecruiter?: () => void;
  onOpenAI: () => void;
  onOpenCommandPalette: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenAI,
  onOpenCommandPalette
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: NavSection; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'timeline', label: 'Experience' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleLinkClick = (id: NavSection) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full pt-3 pb-2 px-4 sm:px-6 pointer-events-none">
      <div className="max-w-6xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Logo */}
        <button
          onClick={() => handleLinkClick('home')}
          className="group flex items-center space-x-1.5 text-left py-2 px-3 rounded-xl bg-white/70 hover:bg-white/90 backdrop-blur-md border border-[#E6E6E8] shadow-sm transition-all"
        >
          <span className="font-extrabold text-lg sm:text-xl tracking-tight text-[#151515] group-hover:text-[#C96F91] transition-colors">
            GOPI
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#C96F91]"></span>
        </button>

        {/* Center Desktop Navigation Pill */}
        <nav className="hidden md:flex items-center space-x-1 px-3 py-1.5 rounded-full bg-white/75 backdrop-blur-md border border-[#E6E6E8] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  isActive
                    ? 'text-[#C96F91] font-semibold bg-[#FCE7F0]/60 shadow-xs'
                    : 'text-[#686873] hover:text-[#151515] hover:bg-[#F8F7F8]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-0.5 rounded-full bg-[#C96F91]" />
                )}
              </button>
            );
          })}

          {/* Quick CodeLab Shortcut */}
          <button
            onClick={() => handleLinkClick('lab')}
            title="Open Interactive Compiler Lab"
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeSection === 'lab'
                ? 'text-[#C96F91] bg-[#FCE7F0]/60 font-semibold'
                : 'text-[#686873] hover:text-[#151515] hover:bg-[#F8F7F8]'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Lab</span>
          </button>
        </nav>

        {/* Right CTA and Utility Actions */}
        <div className="flex items-center space-x-2">
          {/* AI Companion / Search Button */}
          <button
            onClick={onOpenCommandPalette}
            title="Search & Quick Actions (⌘K)"
            className="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl bg-white/80 hover:bg-white backdrop-blur-md border border-[#E6E6E8] text-[#686873] hover:text-[#151515] shadow-xs transition-all"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* AI Assistant Button */}
          <button
            onClick={onOpenAI}
            title="Grounded AI Assistant"
            className="hidden sm:flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-white/80 hover:bg-white backdrop-blur-md border border-[#E6E6E8] text-[#686873] hover:text-[#C96F91] text-xs font-medium shadow-xs transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C96F91]" />
            <span>Ask AI</span>
          </button>

          {/* Primary CTA Button: "Let’s Talk →" */}
          <button
            onClick={() => handleLinkClick('contact')}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-[#C96F91] hover:bg-[#B85B80] active:scale-98 text-white text-sm font-medium shadow-[0_4px_14px_rgba(201,111,145,0.3)] transition-all"
          >
            <span>Let’s Talk</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-white/80 backdrop-blur-md border border-[#E6E6E8] text-[#151515] shadow-xs"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 max-w-sm mx-auto p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-[#E6E6E8] shadow-[0_12px_36px_rgba(0,0,0,0.08)] pointer-events-auto animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeSection === item.id
                    ? 'text-[#C96F91] font-semibold bg-[#FCE7F0]/70'
                    : 'text-[#686873] hover:text-[#151515] hover:bg-[#F8F7F8]'
                }`}
              >
                {item.label}
              </button>
            ))}

            <button
              onClick={() => handleLinkClick('lab')}
              className={`w-full flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeSection === 'lab'
                  ? 'text-[#C96F91] font-semibold bg-[#FCE7F0]/70'
                  : 'text-[#686873] hover:text-[#151515] hover:bg-[#F8F7F8]'
              }`}
            >
              <Code2 className="w-4 h-4 text-[#C96F91]" />
              <span>Interactive CodeLab</span>
            </button>
          </div>

          <div className="mt-4 pt-4 border-t border-[#E6E6E8] space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAI();
              }}
              className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-[#F8F7F8] hover:bg-[#EEF0F3] text-[#151515] text-sm font-medium border border-[#E6E6E8]"
            >
              <Sparkles className="w-4 h-4 text-[#C96F91]" />
              <span>Ask AI About Gopi</span>
            </button>

            <button
              onClick={() => handleLinkClick('contact')}
              className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-[#C96F91] text-white text-sm font-medium shadow-sm"
            >
              <span>Let’s Talk</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
