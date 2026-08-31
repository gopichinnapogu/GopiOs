import React, { useState, useEffect } from 'react';
import { 
  GitBranch, 
  Terminal, 
  Star, 
  GitFork, 
  ExternalLink, 
  RefreshCw, 
  CheckCircle2, 
  Code2 
} from 'lucide-react';
import { GitHubRepoData } from '../../types';

export const GitHubSection: React.FC = () => {
  const [repos, setRepos] = useState<GitHubRepoData[]>([]);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [dataSource, setDataSource] = useState<string>('cache');

  const fetchGitHub = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/github');
      if (res.ok) {
        const json = await res.json();
        setRepos(json.data.repos || []);
        setUserData(json.data.user || null);
        setDataSource(json.source || 'cache');
      }
    } catch (err) {
      console.warn('Failed to fetch GitHub data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGitHub();
  }, []);

  return (
    <section id="github" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
      <div className="space-y-4 mb-8">
        <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400">
          <Terminal className="w-3.5 h-3.5" />
          <span className="uppercase tracking-wider">Module 07 // Live GitHub Activity & Repositories</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-100 tracking-tight">
              Open Source & Public Repositories
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl pt-1">
              Live server-side synchronization with the GitHub API. Cached with in-memory TTL to withstand API rate limiting and network outages.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
              Source: <strong className="text-cyan-400 uppercase">{dataSource}</strong>
            </span>
            <button
              onClick={fetchGitHub}
              disabled={loading}
              className="p-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs border border-slate-700 transition-colors cursor-pointer"
              title="Refresh GitHub Feed"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-cyan-400' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* GitHub Repository Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {repos.map((repo, idx) => (
          <div
            key={idx}
            className="p-5 rounded-xl bg-[#0b1120] border border-slate-800 hover:border-cyan-800/60 transition-all flex flex-col justify-between group space-y-4 shadow-lg hover:shadow-cyan-950/20"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-cyan-400 font-semibold flex items-center gap-1.5">
                  <GitBranch className="w-3.5 h-3.5" />
                  <span>{repo.name}</span>
                </span>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-500 hover:text-slate-200 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {repo.description || 'Open-source software repository by Gopi Chinnapogu.'}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
              <div className="flex items-center space-x-1 text-slate-300">
                <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>{repo.language || 'TypeScript'}</span>
              </div>

              <div className="flex items-center space-x-3 text-slate-400">
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-amber-400" />
                  <span>{repo.stargazers_count}</span>
                </span>
                <span className="flex items-center gap-1">
                  <GitFork className="w-3 h-3 text-slate-400" />
                  <span>{repo.forks_count}</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <a
          href="https://github.com/gopichinnapogu"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center space-x-2 px-5 py-2 rounded-md bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-mono border border-slate-800 transition-colors"
        >
          <GitBranch className="w-4 h-4 text-cyan-400" />
          <span>Explore All Repositories on GitHub &rarr;</span>
        </a>
      </div>
    </section>
  );
};
