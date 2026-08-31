import React, { useState } from 'react';
import { 
  Code2, 
  Search, 
  Terminal, 
  Layers, 
  CheckCircle2, 
  Cpu, 
  Database, 
  Sparkles, 
  Boxes, 
  Server,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { skillsData } from '../../data/skills';
import { SkillCategory, SkillItem } from '../../types';

interface SkillsSectionProps {
  onSelectProject?: (slug: string) => void;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSkillId, setActiveSkillId] = useState<string>(skillsData[0].id);

  const categories: { id: SkillCategory | 'all'; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'All Technologies', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'languages', label: 'Languages', icon: <Code2 className="w-3.5 h-3.5" /> },
    { id: 'systems', label: 'Systems & Backend', icon: <Server className="w-3.5 h-3.5" /> },
    { id: 'ai-data', label: 'AI & Algorithms', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'tools-devops', label: 'Tools & DevOps', icon: <Boxes className="w-3.5 h-3.5" /> }
  ];

  const filteredSkills = skillsData.filter(skill => {
    const matchesCategory = selectedCategory === 'all' || skill.category === selectedCategory;
    const q = (searchQuery || '').toLowerCase().trim();
    const matchesSearch = 
      !q ||
      (skill.name?.toLowerCase() || '').includes(q) ||
      (skill.summary?.toLowerCase() || '').includes(q) ||
      (skill.coreConcepts || []).some(c => (c?.toLowerCase() || '').includes(q));
    return matchesCategory && matchesSearch;
  });

  const activeSkill = skillsData.find(s => s.id === activeSkillId) || filteredSkills[0] || skillsData[0];

  return (
    <section id="skills" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
      <div className="space-y-4 mb-8">
        <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400">
          <Terminal className="w-3.5 h-3.5" />
          <span className="uppercase tracking-wider">Module 02 // Interactive Skills & Systems Matrix</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-100 tracking-tight">
              Technical Stack & Deep Proof
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl pt-1">
              Select any technology to inspect core architectural concepts, related libraries, real project integrations, and verified code implementations.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter skills & concepts..."
              className="w-full pl-9 pr-3 py-1.5 bg-[#0b1120] border border-slate-800 focus:border-cyan-500 rounded-md text-xs text-slate-200 placeholder-slate-500 focus:outline-none font-mono"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 pt-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-700/60 font-semibold shadow-sm'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 border border-slate-800'
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Skills Explorer Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Skill Selector List */}
        <div className="lg:col-span-5 space-y-2">
          {filteredSkills.map(skill => {
            const isSelected = skill.id === activeSkill.id;
            return (
              <button
                key={skill.id}
                id={`skill-item-${skill.id}`}
                onClick={() => setActiveSkillId(skill.id)}
                className={`w-full p-3.5 rounded-lg border text-left transition-all flex items-center justify-between group ${
                  isSelected
                    ? 'bg-cyan-950/30 border-cyan-600/70 shadow-md shadow-cyan-950/40'
                    : 'bg-[#0b1120] border-slate-800/80 hover:border-slate-700 hover:bg-[#0f172a]'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded flex items-center justify-center font-mono font-bold text-xs ${
                    isSelected ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {skill.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className={`text-sm font-semibold ${isSelected ? 'text-cyan-300' : 'text-slate-200'}`}>
                      {skill.name}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      Level: <span className="text-slate-300 font-medium">{skill.level}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                    {skill.category}
                  </span>
                  <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-cyan-400 translate-x-1' : 'text-slate-600 group-hover:text-slate-400'}`} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Active Skill Deep-Dive Inspector */}
        <div className="lg:col-span-7">
          <div className="p-6 rounded-lg bg-[#0b1120] border border-cyan-900/60 shadow-xl space-y-6">
            {/* Inspector Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
              <div>
                <div className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                  SKILL INSPECTOR // {activeSkill.category.toUpperCase()}
                </div>
                <h3 className="text-2xl font-bold font-display text-slate-100">
                  {activeSkill.name}
                </h3>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-cyan-950 border border-cyan-800 text-cyan-300">
                  {activeSkill.level} Tier
                </span>
              </div>
            </div>

            {/* Summary */}
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {activeSkill.summary}
            </div>

            {/* Core Concepts */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
                Core Architectural Concepts
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeSkill.coreConcepts.map((concept, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded bg-[#070e1b] border border-slate-800 text-slate-200 text-xs font-mono flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                    <span>{concept}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Related Tech */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
                Related Frameworks & Libraries
              </h4>
              <div className="flex flex-wrap gap-1.5 font-mono text-xs text-slate-400">
                {activeSkill.relatedTechnologies.map((tech, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/60">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Code Evidence Snippet */}
            {activeSkill.codeEvidence && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>VERIFIED CODE IMPLEMENTATION</span>
                  <span className="text-[10px] text-cyan-400">READ-ONLY</span>
                </div>
                <div className="p-3.5 rounded-md bg-[#05080f] border border-slate-800 font-mono text-[11px] text-cyan-200 overflow-x-auto leading-relaxed">
                  <pre>{activeSkill.codeEvidence}</pre>
                </div>
              </div>
            )}

            {/* Projects Utilizing It */}
            {activeSkill.usedInProjects.length > 0 && (
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="font-mono text-slate-400">Implemented In Projects:</span>
                <div className="flex gap-2">
                  {activeSkill.usedInProjects.map((pSlug, idx) => (
                    <a
                      key={idx}
                      href={`#projects`}
                      onClick={() => onSelectProject && onSelectProject(pSlug)}
                      className="px-2.5 py-1 rounded bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-300 font-mono border border-cyan-800/60 flex items-center gap-1 transition-colors"
                    >
                      <span>{pSlug}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
