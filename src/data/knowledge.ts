import { profileData } from './profile';
import { skillsData } from './skills';
import { projectsData } from './projects';
import { thinkingData } from './thinking';
import { timelineData } from './timeline';

export function getVerifiedKnowledgeJson(): string {
  return JSON.stringify(
    {
      profile: {
        name: profileData.name,
        role: profileData.role,
        subRole: profileData.subRole,
        university: profileData.university,
        degree: profileData.degree,
        location: profileData.location,
        status: profileData.status,
        email: profileData.email,
        github: profileData.github,
        linkedin: profileData.linkedin,
        bio: profileData.shortBio,
        philosophy: profileData.aboutPhilosophy,
        currentFocus: profileData.currentFocus,
        interests: profileData.interests,
        stats: profileData.stats
      },
      skills: skillsData.map(s => ({
        id: s.id,
        name: s.name,
        category: s.category,
        level: s.level,
        proficiency: s.proficiency,
        summary: s.summary,
        concepts: s.coreConcepts,
        relatedTechnologies: s.relatedTechnologies,
        usedInProjects: s.usedInProjects
      })),
      projects: projectsData.map(p => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        category: p.category,
        tagline: p.tagline,
        metrics: p.metrics,
        problem: p.problem,
        goal: p.goal,
        solution: p.solution,
        techStack: p.techStack,
        challenges: p.challenges,
        results: p.results,
        lessons: p.lessons,
        hasInteractiveDemo: p.hasInteractiveDemo
      })),
      problemSolving: thinkingData.map(t => ({
        id: t.id,
        title: t.title,
        category: t.category,
        complexity: t.complexity,
        keyObservation: t.keyObservation,
        engineeringTakeaways: t.engineeringTakeaways
      })),
      timeline: timelineData.map(m => ({
        year: m.year,
        title: m.title,
        roleOrContext: m.roleOrContext,
        summary: m.summary,
        highlights: m.highlights,
        technologies: m.technologies
      }))
    },
    null,
    2
  );
}
