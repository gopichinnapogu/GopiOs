import React, { useState } from 'react';
import { 
  Code2, 
  Database, 
  Server, 
  Boxes, 
  CheckCircle2, 
  Sparkles,
  Puzzle,
  MessageSquare,
  Users2,
  Clock
} from 'lucide-react';

interface TechSkill {
  name: string;
  category: string;
  iconBg: string;
  iconColor: string;
  abbr: string;
}

export const SkillsSection: React.FC = () => {
  const technicalSkills: TechSkill[] = [
    { name: 'HTML5', category: 'Frontend', iconBg: '#FFF0EB', iconColor: '#E44D26', abbr: 'HTML' },
    { name: 'CSS3', category: 'Styling', iconBg: '#EBF4FF', iconColor: '#264DE4', abbr: 'CSS' },
    { name: 'JavaScript', category: 'Language', iconBg: '#FEF9E7', iconColor: '#F7DF1E', abbr: 'JS' },
    { name: 'React', category: 'Frontend', iconBg: '#EDF9FD', iconColor: '#61DAFB', abbr: 'React' },
    { name: 'Node.js', category: 'Backend', iconBg: '#EEF8EC', iconColor: '#339933', abbr: 'Node' },
    { name: 'MongoDB', category: 'Database', iconBg: '#EDF7EE', iconColor: '#47A248', abbr: 'Mongo' },
    { name: 'Git', category: 'DevOps', iconBg: '#FDF0EC', iconColor: '#F05032', abbr: 'Git' },
    { name: 'Python', category: 'Language', iconBg: '#EDF4FA', iconColor: '#3776AB', abbr: 'Py' },
    { name: 'Java', category: 'Core & OOP', iconBg: '#FDF1F0', iconColor: '#ED8B00', abbr: 'Java' },
    { name: 'TypeScript', category: 'Language', iconBg: '#EAF3FA', iconColor: '#3178C6', abbr: 'TS' },
    { name: 'SQL', category: 'Database', iconBg: '#F2EFF9', iconColor: '#00758F', abbr: 'SQL' },
    { name: 'Docker', category: 'DevOps', iconBg: '#E9F5FD', iconColor: '#2496ED', abbr: 'Docker' }
  ];

  const softSkills = [
    {
      title: 'Problem Solving',
      description: 'Analyzing algorithmic bottlenecks and breaking down complex issues into clear, manageable steps.',
      icon: <Puzzle className="w-5 h-5 text-[#C96F91]" />
    },
    {
      title: 'Communication',
      description: 'Articulating technical trade-offs, architecture decisions, and ideas clearly to both engineers and stakeholders.',
      icon: <MessageSquare className="w-5 h-5 text-[#C96F91]" />
    },
    {
      title: 'Team Collaboration',
      description: 'Thriving in agile cross-functional environments, active code reviews, and pair programming sessions.',
      icon: <Users2 className="w-5 h-5 text-[#C96F91]" />
    },
    {
      title: 'Time Management',
      description: 'Prioritizing sprint goals, managing deadlines effectively, and maintaining reliable engineering velocity.',
      icon: <Clock className="w-5 h-5 text-[#C96F91]" />
    }
  ];

  return (
    <section id="skills" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-[#E6E6E8]/70">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#FCE7F0] border border-[#E8A0B8]/40 shadow-2xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#C96F91]">
            My Skills
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#151515] tracking-tight">
          Tools I Work With
        </h2>

        <p className="text-base text-[#686873] leading-relaxed">
          A combination of technical skills and soft skills that help me build better products and collaborate effectively.
        </p>
      </div>

      {/* Part 1: Technical Skills Grid */}
      <div className="space-y-6 mb-14">
        <div className="flex items-center space-x-2">
          <Code2 className="w-4 h-4 text-[#C96F91]" />
          <h3 className="text-lg sm:text-xl font-bold text-[#151515]">
            Technical Skills
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {technicalSkills.map((tech) => (
            <div
              key={tech.name}
              className="p-4 rounded-2xl bg-white border border-[#E6E6E8] hover:border-[#E8A0B8]/60 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_20px_rgba(201,111,145,0.08)] flex flex-col items-center text-center transition-all card-hover-effect group"
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm tracking-tight mb-2.5 transition-transform group-hover:scale-105 shadow-2xs"
                style={{ backgroundColor: tech.iconBg, color: tech.iconColor }}
              >
                {tech.abbr}
              </div>
              <span className="text-sm font-bold text-[#151515]">
                {tech.name}
              </span>
              <span className="text-[11px] font-medium text-[#686873] mt-0.5">
                {tech.category}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Part 2: Other Skills (Soft & Professional) */}
      <div className="space-y-6 mb-14">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-[#C96F91]" />
          <h3 className="text-lg sm:text-xl font-bold text-[#151515]">
            Other Skills
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {softSkills.map((skill, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-[#E6E6E8] hover:border-[#E8A0B8]/60 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_20px_rgba(201,111,145,0.08)] transition-all card-hover-effect"
            >
              <div className="w-10 h-10 rounded-xl bg-[#FCE7F0] flex items-center justify-center mb-3">
                {skill.icon}
              </div>
              <h4 className="text-base font-bold text-[#151515] mb-1.5">
                {skill.title}
              </h4>
              <p className="text-xs sm:text-sm text-[#686873] leading-relaxed">
                {skill.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Quote Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#FCE7F0]/60 via-[#F8F7F8] to-[#FCE7F0]/40 border border-[#E6E6E8] text-center shadow-xs">
        <p className="font-handwriting text-2xl sm:text-3xl font-bold text-[#C96F91]">
          “ Better Tools • Bigger Possibilities ”
        </p>
        <p className="text-xs sm:text-sm font-medium text-[#686873] mt-1">
          Always evolving my workflow to build cleaner, more scalable applications.
        </p>
      </div>
    </section>
  );
};
