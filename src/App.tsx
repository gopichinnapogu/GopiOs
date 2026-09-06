import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/hero/HeroSection';
import { AboutSection } from './components/about/AboutSection';
import { ProjectsSection } from './components/projects/ProjectsSection';
import { SkillsSection } from './components/skills/SkillsSection';
import { TimelineSection } from './components/timeline/TimelineSection';
import { CodeLabSection } from './components/lab/CodeLabSection';
import { ContactSection } from './components/contact/ContactSection';
import { AIAssistantDrawer } from './components/ai/AIAssistantDrawer';
import { CommandPalette } from './components/ui/CommandPalette';
import { ResumeModal } from './components/ui/ResumeModal';
import { ProjectDetailModal } from './components/projects/ProjectDetailModal';
import { NavSection, AIAction } from './types';
import { projectsData } from './data/projects';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<NavSection>('home');
  const [aiDrawerOpen, setAiDrawerOpen] = useState<boolean>(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false);
  const [resumeModalOpen, setResumeModalOpen] = useState<boolean>(false);
  const [selectedCaseStudySlug, setSelectedCaseStudySlug] = useState<string | null>(null);

  // Global Keyboard shortcuts (⌘K or Ctrl+K for search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Update active section on scroll
  useEffect(() => {
    const sectionIds: NavSection[] = ['home', 'about', 'projects', 'skills', 'timeline', 'lab', 'contact'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const sectionId of sectionIds) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (section: NavSection) => {
    setActiveSection(section);
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExecuteAIAction = (action: AIAction) => {
    if (action.type === 'VIEW_PROJECT' && action.payload) {
      setSelectedCaseStudySlug(action.payload);
      handleNavigate('projects');
    } else if (action.type === 'VIEW_RESUME') {
      setResumeModalOpen(true);
    } else if (action.type === 'VIEW_SKILLS') {
      handleNavigate('skills');
    } else if (action.type === 'VIEW_CONTACT') {
      handleNavigate('contact');
    }
  };

  const selectedCaseStudyProject = selectedCaseStudySlug
    ? projectsData.find((p) => p.slug === selectedCaseStudySlug) || null
    : null;

  return (
    <div className="min-h-screen bg-white text-[#151515] font-sans selection:bg-[#E8A0B8]/30 selection:text-[#C96F91]">
      {/* Top Navbar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenAI={() => setAiDrawerOpen(true)}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
      />

      {/* Main Content Layout */}
      <main className="relative">
        <HeroSection
          onNavigate={handleNavigate}
          onOpenAI={() => setAiDrawerOpen(true)}
          onOpenResume={() => setResumeModalOpen(true)}
        />

        <AboutSection />

        <ProjectsSection
          onLaunchDemo={(demoType) => {
            const el = document.getElementById('lab');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        <SkillsSection />

        <TimelineSection />

        <CodeLabSection />

        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenRecruiter={() => {}}
        onOpenResume={() => setResumeModalOpen(true)}
        onOpenAI={() => setAiDrawerOpen(true)}
      />

      {/* Grounded AI Assistant Drawer */}
      <AIAssistantDrawer
        isOpen={aiDrawerOpen}
        onClose={() => setAiDrawerOpen(false)}
        onExecuteAction={handleExecuteAIAction}
      />

      {/* Command Palette (⌘K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onNavigate={handleNavigate}
        onOpenRecruiter={() => {}}
        onOpenAI={() => setAiDrawerOpen(true)}
        onOpenResume={() => setResumeModalOpen(true)}
        onSelectProject={(slug) => setSelectedCaseStudySlug(slug)}
      />

      {/* Resume Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />

      {/* Project Detail Modal */}
      {selectedCaseStudyProject && (
        <ProjectDetailModal
          project={selectedCaseStudyProject}
          onClose={() => setSelectedCaseStudySlug(null)}
          onLaunchDemo={() => {
            setSelectedCaseStudySlug(null);
            const el = document.getElementById('lab');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      )}
    </div>
  );
};

export default App;
