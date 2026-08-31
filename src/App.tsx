import React, { useState, useEffect } from 'react';
import { HeroBoot } from './components/hero/HeroBoot';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/hero/HeroSection';
import { AboutSection } from './components/about/AboutSection';
import { SkillsSection } from './components/skills/SkillsSection';
import { ProjectsSection } from './components/projects/ProjectsSection';
import { InteractiveSystemDemo } from './components/demo/InteractiveSystemDemo';
import { ThinkingSection } from './components/thinking/ThinkingSection';
import { TimelineSection } from './components/timeline/TimelineSection';
import { GitHubSection } from './components/github/GitHubSection';
import { ContactSection } from './components/contact/ContactSection';
import { CodeLabSection } from './components/lab/CodeLabSection';
import { RecruiterModeView } from './components/recruiter/RecruiterModeView';
import { AIAssistantDrawer } from './components/ai/AIAssistantDrawer';
import { CommandPalette } from './components/ui/CommandPalette';
import { ResumeModal } from './components/ui/ResumeModal';
import { NavSection, AIAction } from './types';
import { projectsData } from './data/projects';
import { ProjectDetailModal } from './components/projects/ProjectDetailModal';

export const App: React.FC = () => {
  const [bootComplete, setBootComplete] = useState<boolean>(() => {
    return sessionStorage.getItem('gopios_boot_passed') === 'true';
  });
  const [recruiterMode, setRecruiterMode] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<NavSection>('home');
  const [aiDrawerOpen, setAiDrawerOpen] = useState<boolean>(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false);
  const [resumeModalOpen, setResumeModalOpen] = useState<boolean>(false);
  const [selectedCaseStudySlug, setSelectedCaseStudySlug] = useState<string | null>(null);

  // Global Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ⌘K or Ctrl+K for Command Palette
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
      // 'r' key for Recruiter Mode (if not focused on inputs)
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName?.toLowerCase();
      const isInput = tag === 'input' || tag === 'textarea' || target?.isContentEditable;
      if (e.key?.toLowerCase() === 'r' && !e.metaKey && !e.ctrlKey && !isInput) {
        // Toggle recruiter mode
        // setRecruiterMode(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleBootComplete = () => {
    sessionStorage.setItem('gopios_boot_passed', 'true');
    setBootComplete(true);
  };

  const handleNavigate = (section: NavSection) => {
    setActiveSection(section);
    if (recruiterMode) {
      setRecruiterMode(false);
    }
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExecuteAIAction = (action: AIAction) => {
    if (action.type === 'VIEW_PROJECT' && action.payload) {
      setSelectedCaseStudySlug(action.payload);
      handleNavigate('projects');
    } else if (action.type === 'VIEW_RECRUITER') {
      setRecruiterMode(true);
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
    <div className="min-h-screen bg-[#070b14] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Boot Screen Sequence */}
      {!bootComplete && <HeroBoot onComplete={handleBootComplete} />}

      {/* Main Top Navigation */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        recruiterMode={recruiterMode}
        onToggleRecruiter={() => setRecruiterMode((prev) => !prev)}
        onOpenAI={() => setAiDrawerOpen(true)}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
      />

      {/* Main Content Area */}
      <main className="relative">
        {recruiterMode ? (
          /* Recruiter 45-Second View */
          <RecruiterModeView
            onOpenResume={() => setResumeModalOpen(true)}
            onExitRecruiterMode={() => setRecruiterMode(false)}
            onSelectProject={(slug) => setSelectedCaseStudySlug(slug)}
          />
        ) : (
          /* Standard Complete Deep-Engineering OS View */
          <div className="space-y-4">
            <HeroSection
              onNavigate={handleNavigate}
              onOpenRecruiter={() => setRecruiterMode(true)}
              onOpenAI={() => setAiDrawerOpen(true)}
              onOpenResume={() => setResumeModalOpen(true)}
            />

            <AboutSection />

            <SkillsSection
              onSelectProject={(slug) => {
                setSelectedCaseStudySlug(slug);
                handleNavigate('projects');
              }}
            />

            <ProjectsSection
              onLaunchDemo={(demoType) => {
                const el = document.getElementById('demo');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            <InteractiveSystemDemo />

            <CodeLabSection />

            <ThinkingSection />

            <TimelineSection />

            <GitHubSection />

            <ContactSection />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenRecruiter={() => setRecruiterMode(true)}
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
        onOpenRecruiter={() => setRecruiterMode(true)}
        onOpenAI={() => setAiDrawerOpen(true)}
        onOpenResume={() => setResumeModalOpen(true)}
        onSelectProject={(slug) => setSelectedCaseStudySlug(slug)}
      />

      {/* Resume Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />

      {/* Direct Case Study Trigger Modal (if chosen from AI/Recruiter) */}
      {selectedCaseStudyProject && (
        <ProjectDetailModal
          project={selectedCaseStudyProject}
          onClose={() => setSelectedCaseStudySlug(null)}
          onLaunchDemo={() => {
            setSelectedCaseStudySlug(null);
            const el = document.getElementById('demo');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      )}
    </div>
  );
};

export default App;
