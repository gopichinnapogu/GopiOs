import React from 'react';
import { 
  ArrowRight, 
  Download, 
  ChevronDown,
  Sparkles,
  Heart
} from 'lucide-react';
import { profileData } from '../../data/profile';
import { NavSection } from '../../types';

interface HeroSectionProps {
  onNavigate: (section: NavSection) => void;
  onOpenRecruiter?: () => void;
  onOpenAI: () => void;
  onOpenResume: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate,
  onOpenResume
}) => {
  return (
    <section id="home" className="relative pt-6 sm:pt-12 pb-20 sm:pb-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto overflow-hidden">
      {/* Background Soft Rose Glows */}
      <div className="absolute top-1/4 right-10 w-96 h-96 rounded-full bg-[#E8A0B8]/15 blur-3xl pointer-events-none -z-10" />
      <div className="absolute -top-10 left-10 w-80 h-80 rounded-full bg-[#F8F7F8] blur-2xl pointer-events-none -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Headline & Bio */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#FCE7F0] border border-[#E8A0B8]/40 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#C96F91] animate-pulse" />
            <span className="text-xs font-semibold text-[#C96F91] tracking-wide">
              Hi, I'm Gopi
            </span>
            <span className="text-[#E8A0B8]">•</span>
            <span className="text-xs font-medium text-[#686873]">
              CS Undergrad @ RVR & JC • Full-Stack Developer
            </span>
          </div>

          {/* Main Display Headline */}
          <div className="space-y-1">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#151515] leading-[1.12]">
              Building <br className="hidden sm:inline" />
              Ideas Into <br />
              <span className="text-[#C96F91]">Real Products</span>
            </h1>
          </div>

          {/* Supporting Bio Text */}
          <p className="text-base sm:text-lg text-[#686873] max-w-xl leading-relaxed font-normal">
            A passionate developer who loves creating clean, scalable and user-friendly digital experiences. Specializing in full-stack web applications, modern APIs, and reliable software systems.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-1">
            <button
              onClick={() => onNavigate('projects')}
              className="flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-[#C96F91] hover:bg-[#B85B80] active:scale-98 text-white text-sm sm:text-base font-semibold shadow-[0_4px_16px_rgba(201,111,145,0.35)] transition-all group"
            >
              <span>View My Work</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onOpenResume}
              className="flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-[#F8F7F8] hover:bg-[#EEF0F3] active:scale-98 text-[#151515] text-sm sm:text-base font-semibold border border-[#E6E6E8] shadow-2xs transition-all"
            >
              <Download className="w-4 h-4 text-[#686873]" />
              <span>Download Resume</span>
            </button>
          </div>

          {/* Statistics Metric Row */}
          <div className="pt-6 border-t border-[#E6E6E8] flex items-center space-x-8 sm:space-x-12">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#151515] tracking-tight">
                5+
              </div>
              <div className="text-xs sm:text-sm font-medium text-[#686873] mt-0.5">
                Projects
              </div>
            </div>

            <div className="h-8 w-px bg-[#E6E6E8]" />

            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#151515] tracking-tight">
                1+
              </div>
              <div className="text-xs sm:text-sm font-medium text-[#686873] mt-0.5">
                Years Experience
              </div>
            </div>

            <div className="h-8 w-px bg-[#E6E6E8]" />

            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#151515] tracking-tight">
                100%
              </div>
              <div className="text-xs sm:text-sm font-medium text-[#686873] mt-0.5">
                Dedication
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Portrait Composition with Glass Cards */}
        <div className="lg:col-span-5 flex justify-center relative">
          <div className="relative w-full max-w-[360px] sm:max-w-[400px]">
            {/* Soft Circular Rose Halo Aura Behind Portrait */}
            <div className="absolute inset-0 -m-6 rounded-full bg-gradient-to-tr from-[#E8A0B8]/40 via-[#FCE7F0]/60 to-transparent blur-2xl -z-10" />

            {/* Hand-written Top Accent Flourish */}
            <div className="absolute -top-8 -right-4 hidden sm:flex items-center space-x-1.5 text-[#C96F91] font-handwriting text-2xl tracking-wide rotate-6 pointer-events-none select-none">
              <span>Ideas to Impact</span>
              <Sparkles className="w-4 h-4" />
            </div>

            {/* Main Portrait Frame */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#FCE7F0]/40 to-[#F8F7F8] border border-white shadow-[0_20px_50px_rgba(0,0,0,0.06)] aspect-[4/5]">
              <img
                src="/gopi_portrait.jpg"
                alt={profileData.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-[center_20%] transform hover:scale-102 transition-transform duration-500"
              />

              {/* Bottom Subtle Glass Card */}
              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 px-4 py-2.5 rounded-2xl bg-white/80 backdrop-blur-md border border-white/90 shadow-[0_8px_24px_rgba(0,0,0,0.08)] flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-[#C96F91] animate-ping" />
                <span className="font-handwriting text-lg text-[#151515] font-bold">
                  Keep Building
                </span>
                <Heart className="w-3.5 h-3.5 text-[#C96F91] fill-[#C96F91]" />
              </div>
            </div>

            {/* Left Micro Floating Glass Card */}
            <div className="absolute -bottom-4 -left-4 sm:-bottom-5 sm:-left-6 px-4 py-2.5 rounded-2xl bg-white/85 backdrop-blur-md border border-[#E6E6E8] shadow-[0_10px_28px_rgba(0,0,0,0.06)]">
              <div className="text-[10px] uppercase font-semibold tracking-wider text-[#686873]">
                Current Focus
              </div>
              <div className="text-xs font-bold text-[#151515] mt-0.5 flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Full-Stack & Systems</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Down Prompt */}
      <div className="mt-14 sm:mt-20 flex flex-col items-center justify-center text-center">
        <button
          onClick={() => onNavigate('about')}
          className="group flex flex-col items-center space-y-1.5 text-[#686873] hover:text-[#C96F91] transition-colors"
          aria-label="Scroll to About section"
        >
          <span className="text-xs font-medium tracking-wider uppercase">Scroll Down</span>
          <div className="w-7 h-11 rounded-full border-2 border-[#D5D7DD] group-hover:border-[#C96F91] flex items-start justify-center p-1.5 transition-colors">
            <div className="w-1.5 h-2.5 rounded-full bg-[#686873] group-hover:bg-[#C96F91] animate-bounce transition-colors" />
          </div>
        </button>
      </div>
    </section>
  );
};
