import React from 'react';
import { 
  Puzzle, 
  Sparkles, 
  Users2, 
  Target,
  GraduationCap,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { profileData } from '../../data/profile';

export const AboutSection: React.FC = () => {
  const strengths = [
    {
      title: 'Problem Solver',
      description: 'I enjoy turning complex engineering challenges and algorithmic edge cases into elegant, simple solutions.',
      icon: <Puzzle className="w-5 h-5 text-[#C96F91]" />
    },
    {
      title: 'Quick Learner',
      description: 'Always excited to explore emerging frameworks, master new paradigms, and adapt to modern production stacks.',
      icon: <Sparkles className="w-5 h-5 text-[#C96F91]" />
    },
    {
      title: 'Team Player',
      description: 'I believe the most impactful products are built together through clear communication, empathy, and collaborative code reviews.',
      icon: <Users2 className="w-5 h-5 text-[#C96F91]" />
    },
    {
      title: 'Focused on Impact',
      description: 'I aim to create meaningful, reliable, and user-friendly digital experiences that solve genuine human problems.',
      icon: <Target className="w-5 h-5 text-[#C96F91]" />
    }
  ];

  return (
    <section id="about" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-[#E6E6E8]/70">
      {/* Category Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-14 sm:mb-16">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#FCE7F0] border border-[#E8A0B8]/40 shadow-2xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#C96F91]">
            About Me
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#151515] tracking-tight">
          Curious Mind Driven by <span className="text-[#C96F91]">Purpose</span>
        </h2>

        <p className="text-base text-[#686873] leading-relaxed">
          Get to know my journey, core values, and the design philosophy that guides every line of code I write.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
        {/* Left Column: Narrative & 4 Strengths */}
        <div className="lg:col-span-7 space-y-8 text-left">
          {/* Personal Bio Narrative */}
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-[#151515]">
              Hello! I'm Gopi Chinnapogu
            </h3>
            <p className="text-base text-[#686873] leading-relaxed">
              I'm a Computer Science student and aspiring software developer currently pursuing my B.Tech degree at RVR & JC College of Engineering. I love exploring new technologies, solving real-world problems, and building products that make a difference.
            </p>
            <p className="text-base text-[#686873] leading-relaxed">
              My journey in tech began with intense curiosity—wanting to know how systems coordinate logic, data, and memory under the hood. Over time, that curiosity evolved into a passion for engineering full-stack web applications, scalable backends, and responsive user interfaces that are both high-performing and delightful to use.
            </p>
          </div>

          {/* 4 Strengths 2x2 Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {strengths.map((item, index) => (
              <div
                key={index}
                className="p-5 rounded-2xl bg-white border border-[#E6E6E8] hover:border-[#E8A0B8]/60 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_-6px_rgba(201,111,145,0.08)] transition-all card-hover-effect"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FCE7F0] flex items-center justify-center mb-3">
                  {item.icon}
                </div>
                <h4 className="text-base font-bold text-[#151515] mb-1.5">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-[#686873] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Quick Academic & Location Tagline */}
          <div className="p-4 rounded-xl bg-[#F8F7F8] border border-[#E6E6E8] flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-[#686873]">
            <div className="flex items-center space-x-2">
              <GraduationCap className="w-4 h-4 text-[#C96F91]" />
              <span className="font-semibold text-[#151515]">{profileData.degree}</span>
              <span>•</span>
              <span>{profileData.university}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <MapPin className="w-4 h-4 text-[#C96F91]" />
              <span>{profileData.location.split('(')[0].trim()}</span>
            </div>
          </div>
        </div>

        {/* Right Column: High-End Portrait Photo with Floating Glass Quote */}
        <div className="lg:col-span-5 flex justify-center relative">
          <div className="relative w-full max-w-[360px] sm:max-w-[400px]">
            {/* Background Soft Aura */}
            <div className="absolute inset-0 -m-6 rounded-3xl bg-gradient-to-br from-[#FCE7F0] via-[#E8A0B8]/20 to-transparent blur-xl -z-10" />

            {/* Portrait Frame */}
            <div className="rounded-3xl overflow-hidden bg-white border border-[#E6E6E8] shadow-[0_16px_40px_rgba(0,0,0,0.06)] aspect-[4/5] relative">
              <img
                src="/gopi_portrait.jpg"
                alt="Gopi Chinnapogu"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-[center_20%]"
              />

              {/* Floating Glass Quote Card */}
              <div className="absolute -bottom-5 left-4 right-4 p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-white shadow-[0_12px_32px_rgba(0,0,0,0.08)]">
                <p className="text-sm font-medium text-[#151515] italic leading-relaxed">
                  “ A curious mind builds a brighter tomorrow. ”
                </p>
                <div className="mt-2.5 flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#686873]">
                    Personal Motto
                  </span>
                  <span className="font-handwriting text-2xl font-bold text-[#C96F91]">
                    Gopi
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
