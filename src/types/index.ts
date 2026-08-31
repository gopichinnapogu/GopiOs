export type NavSection =
  | 'home'
  | 'about'
  | 'skills'
  | 'projects'
  | 'demo'
  | 'lab'
  | 'thinking'
  | 'timeline'
  | 'github'
  | 'contact'
  | 'recruiter';

export interface UserProfile {
  name: string;
  handle: string;
  role: string;
  subRole: string;
  university: string;
  degree: string;
  location: string;
  status: string;
  statusColor: 'green' | 'blue' | 'purple' | 'amber';
  email: string;
  github: string;
  linkedin: string;
  twitter?: string;
  shortBio: string;
  aboutPhilosophy: string;
  currentFocus: string[];
  interests: string[];
  stats: {
    projectsShipped: number;
    dsaProblemsSolved: number;
    githubContributions: number;
    coreStackYears: number;
    uptimePercentage: string;
  };
}

export type SkillCategory = 'languages' | 'systems' | 'ai-data' | 'tools-devops';

export interface SkillItem {
  id: string;
  name: string;
  category: SkillCategory;
  level: 'Expert' | 'Advanced' | 'Intermediate' | 'Exploring';
  proficiency: number;
  iconName: string;
  summary: string;
  coreConcepts: string[];
  relatedTechnologies: string[];
  usedInProjects: string[];
  codeEvidence?: string;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  badge: string;
  tagline: string;
  category: 'System & Architecture' | 'AI & Machine Learning' | 'Distributed Systems' | 'Full-Stack Product';
  featured: boolean;
  metrics: { label: string; value: string }[];
  problem: string;
  goal: string;
  solution: string;
  architectureDescription: string;
  architectureDiagram?: string[];
  techStack: string[];
  challenges: string[];
  tradeoffs: string[];
  results: string[];
  lessons: string[];
  hasInteractiveDemo: boolean;
  demoType?: 'system-companion' | 'rag-explorer' | 'rate-limiter' | 'log-stream';
  liveUrl?: string;
  githubUrl?: string;
}

export interface ProblemThinkingItem {
  id: string;
  title: string;
  category: 'Algorithms & DSA' | 'Distributed Systems' | 'AI Safety & Grounding' | 'Concurrency & Architecture';
  complexity: {
    time: string;
    space: string;
  };
  problemStatement: string;
  constraints: string[];
  keyObservation: string;
  approachSteps: {
    step: number;
    title: string;
    description: string;
  }[];
  alternativesConsidered: {
    approach: string;
    drawback: string;
  }[];
  codeSnippet: string;
  codeLanguage: string;
  engineeringTakeaways: string;
}

export interface TimelineMilestone {
  id: string;
  year: string;
  period: string;
  title: string;
  roleOrContext: string;
  category: 'milestone' | 'education' | 'project' | 'skill' | 'research';
  summary: string;
  highlights: string[];
  technologies: string[];
}

export interface ContactPayload {
  name: string;
  email: string;
  reason: 'Job Opportunity' | 'Collaboration' | 'Project Discussion' | 'General Message';
  message: string;
}

export type SafeActionType =
  | 'VIEW_PROJECT'
  | 'VIEW_SKILLS'
  | 'VIEW_TIMELINE'
  | 'VIEW_THINKING'
  | 'VIEW_RESUME'
  | 'VIEW_CONTACT'
  | 'VIEW_GITHUB'
  | 'VIEW_RECRUITER';

export interface AIAction {
  type: SafeActionType;
  entityId?: string;
  payload?: string;
  label: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  sources?: string[];
  action?: AIAction;
  isStreaming?: boolean;
}

export interface GitHubRepoData {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
  topics: string[];
}

export interface SimulatedProcess {
  pid: number;
  name: string;
  cpu: number;
  ram: string;
  status: 'running' | 'idle' | 'sleeping';
}
