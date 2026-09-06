import React from 'react';
import { 
  GraduationCap, 
  Briefcase, 
  Award, 
  Calendar,
  Sparkles,
  CheckCircle2,
  Heart
} from 'lucide-react';
import { timelineData } from '../../data/timeline';

export const TimelineSection: React.FC = () => {
  const getBadgeColor = (badge?: string) => {
    switch (badge?.toLowerCase()) {
      case 'education':
        return 'bg-[#FCE7F0] text-[#C96F91] border-[#E8A0B8]/40';
      case 'internship':
        return 'bg-[#FCE7F0] text-[#C96F91] border-[#E8A0B8]/40';
      case 'certification':
        return 'bg-[#FCE7F0] text-[#C96F91] border-[#E8A0B8]/40';
      default:
        return 'bg-[#F8F7F8] text-[#151515] border-[#E6E6E8]';
    }
  };

  const getIcon = (category: string) => {
    switch (category) {
      case 'education':
        return <GraduationCap className="w-4 h-4 text-[#C96F91]" />;
      case 'internship':
      case 'experience':
        return <Briefcase className="w-4 h-4 text-[#C96F91]" />;
      case 'certification':
        return <Award className="w-4 h-4 text-[#C96F91]" />;
      default:
        return <Sparkles className="w-4 h-4 text-[#C96F91]" />;
    }
  };

  return (
    <section id="timeline" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-[#E6E6E8]/70">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-14 sm:mb-16">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#FCE7F0] border border-[#E8A0B8]/40 shadow-2xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#C96F91]">
            My Journey
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#151515] tracking-tight">
          Learning. Building. Growing.
        </h2>

        <p className="text-base text-[#686873] leading-relaxed">
          Every step has been a learning experience. Here’s a quick look at my academic background and professional journey.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Vertical Timeline */}
        <div className="lg:col-span-7 space-y-8 relative pl-6 sm:pl-8">
          {/* Vertical Connecting Line */}
          <div className="absolute left-[11px] sm:left-[15px] top-4 bottom-6 w-0.5 bg-[#E6E6E8]" />

          {timelineData.map((milestone) => (
            <div key={milestone.id} className="relative group">
              {/* Timeline Marker Dot */}
              <div className="absolute -left-[24px] sm:-left-[28px] top-1.5 w-6 h-6 rounded-full bg-white border-2 border-[#C96F91] flex items-center justify-center shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#C96F91] group-hover:scale-125 transition-transform" />
              </div>

              {/* Timeline Card Content */}
              <div className="p-6 rounded-2xl bg-white border border-[#E6E6E8] hover:border-[#E8A0B8]/60 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(201,111,145,0.08)] transition-all card-hover-effect space-y-3 text-left">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-[#151515] tracking-wide">
                      {milestone.year}
                    </span>
                    <span className="text-[#D5D7DD]">•</span>
                    <span className="text-xs font-semibold text-[#686873]">
                      {milestone.institution || milestone.roleOrContext}
                    </span>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${getBadgeColor(milestone.badge)}`}>
                    {milestone.badge || milestone.category}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="p-1.5 rounded-lg bg-[#FCE7F0]/60 shrink-0">
                    {getIcon(milestone.category)}
                  </div>
                  <h3 className="text-lg font-bold text-[#151515]">
                    {milestone.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-[#686873] leading-relaxed">
                  {milestone.summary}
                </p>

                {milestone.highlights && milestone.highlights.length > 0 && (
                  <div className="pt-2 border-t border-[#F8F7F8] space-y-1.5">
                    {milestone.highlights.map((h, i) => (
                      <div key={i} className="flex items-start space-x-2 text-xs text-[#151515]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C96F91] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Right: Glass Card Quote & Highlights */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          {/* Glass Quote Card from Reference */}
          <div className="p-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-white shadow-[0_16px_40px_rgba(0,0,0,0.06)] space-y-6 text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#FCE7F0] flex items-center justify-center mx-auto text-[#C96F91]">
              <Sparkles className="w-6 h-6" />
            </div>

            <blockquote className="text-lg sm:text-xl font-bold text-[#151515] italic leading-relaxed">
              “ A journey of small steps leads to big destinations. ”
            </blockquote>

            <div className="space-y-1">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#686873]">
                Keep Learning • Keep Building
              </div>
              <div className="font-handwriting text-3xl font-bold text-[#C96F91]">
                Gopi
              </div>
            </div>
          </div>

          {/* Quick Stats / Summary Pill Card */}
          <div className="p-6 rounded-3xl bg-[#F8F7F8] border border-[#E6E6E8] space-y-4">
            <h4 className="text-sm font-bold text-[#151515] uppercase tracking-wider">
              Educational Focus
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm text-[#686873]">
              <div className="flex items-center justify-between">
                <span>Degree</span>
                <span className="font-semibold text-[#151515]">B.Tech in CS</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Institution</span>
                <span className="font-semibold text-[#151515]">RVR & JC College of Engineering</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Status</span>
                <span className="font-semibold text-emerald-600">Currently Pursuing</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Academic Record</span>
                <span className="font-semibold text-[#C96F91]">~8.5 CGPA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
