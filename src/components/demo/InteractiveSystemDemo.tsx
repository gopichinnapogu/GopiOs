import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Cpu, 
  Activity, 
  HardDrive, 
  ShieldCheck, 
  Play, 
  Pause, 
  RotateCcw, 
  Zap, 
  CheckCircle2, 
  AlertCircle,
  Server
} from 'lucide-react';
import { SimulatedProcess } from '../../types';

export const InteractiveSystemDemo: React.FC = () => {
  // Telemetry Simulation State
  const [cpuUsage, setCpuUsage] = useState<number>(18);
  const [ramUsageMb, setRamUsageMb] = useState<number>(142);
  const [networkSpeedKb, setNetworkSpeedKb] = useState<number>(340);
  const [uptimeSeconds, setUptimeSeconds] = useState<number>(4120);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [activeBenchmark, setActiveBenchmark] = useState<boolean>(false);

  // Processes
  const [processes, setProcesses] = useState<SimulatedProcess[]>([
    { pid: 101, name: 'gopios_kernel_core', cpu: 4.2, ram: '24 MB', status: 'running' },
    { pid: 102, name: 'grounded_rag_retriever', cpu: 6.8, ram: '48 MB', status: 'running' },
    { pid: 103, name: 'token_bucket_ratelimiter', cpu: 1.5, ram: '12 MB', status: 'running' },
    { pid: 104, name: 'log_ring_buffer_stream', cpu: 3.1, ram: '32 MB', status: 'running' },
    { pid: 105, name: 'telemetry_heartbeat_daemon', cpu: 2.4, ram: '16 MB', status: 'running' }
  ]);

  // Terminal logs
  const [logs, setLogs] = useState<string[]>([
    '[KERNEL] System initialized in 0.84s',
    '[RAG] Vector index loaded (5 categories, 0 hallucination drift)',
    '[DISPATCHER] Worker pool online with 4 worker threads',
    '[SECURITY] Strict CSP and Token Bucket Guard active'
  ]);
  const [commandInput, setCommandInput] = useState<string>('');

  // Simulated Telemetry Tick Loop
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setUptimeSeconds(prev => prev + 1);
      
      if (!activeBenchmark) {
        // Natural small fluctuations
        setCpuUsage(prev => Math.min(85, Math.max(12, Math.round(prev + (Math.random() * 8 - 4)))));
        setRamUsageMb(prev => Math.min(300, Math.max(130, Math.round(prev + (Math.random() * 4 - 2)))));
        setNetworkSpeedKb(prev => Math.min(950, Math.max(120, Math.round(prev + (Math.random() * 40 - 20)))));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, activeBenchmark]);

  // Run Benchmark Action
  const handleRunBenchmark = () => {
    setActiveBenchmark(true);
    setLogs(prev => [
      ...prev,
      '>> [LOAD TEST] Simulating 1,000 parallel async tasks...',
      '>> [LOAD TEST] Testing token bucket refill & queue backpressure...'
    ]);
    setCpuUsage(78);
    setRamUsageMb(240);
    setNetworkSpeedKb(820);

    setTimeout(() => {
      setLogs(prev => [
        ...prev,
        '>> [RESULT] 1,000 tasks processed in 218ms (4,587 req/sec)',
        '>> [RESULT] 0 dropped jobs | P99 Latency: 12.4ms | Zero state leaks'
      ]);
      setActiveBenchmark(false);
      setCpuUsage(22);
      setRamUsageMb(150);
      setNetworkSpeedKb(350);
    }, 2000);
  };

  // Run Security Audit Action
  const handleRunSecurityAudit = () => {
    setLogs(prev => [
      ...prev,
      '>> [AUDIT] Running security & anti-injection validation scan...',
      '>> [AUDIT] Injected Knowledge Schema: Strict 100% verified JSON',
      '>> [AUDIT] Refusal threshold on unknown facts: ACTIVE (strict)',
      '>> [AUDIT] Token bucket rate limiter: HEALTHY (0 bypasses detected)'
    ]);
  };

  // Run Memory Garbage Collection Action
  const handleRunOptimize = () => {
    setRamUsageMb(128);
    setCpuUsage(14);
    setLogs(prev => [
      ...prev,
      '>> [MEMORY] Garbage collection invoked: freed 28MB simulated telemetry cache',
      '>> [MEMORY] Ring buffers consolidated | CPU utilization nominal'
    ]);
  };

  // Command submission handler
  const handleExecuteCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = (commandInput || '').trim().toLowerCase();
    setCommandInput('');

    if (!cmd) return;

    setLogs(prev => [...prev, `$ ${cmd}`]);

    switch (cmd) {
      case 'help':
        setLogs(prev => [
          ...prev,
          'Available diagnostic commands:',
          '  bench          - Simulate high-throughput load benchmark',
          '  audit-security - Inspect prompt safety & token bucket guard',
          '  optimize       - Invoke memory garbage collection & flush buffers',
          '  sysinfo        - Display current architecture & memory status',
          '  clear          - Clear console log history'
        ]);
        break;
      case 'bench':
        handleRunBenchmark();
        break;
      case 'audit-security':
        handleRunSecurityAudit();
        break;
      case 'optimize':
        handleRunOptimize();
        break;
      case 'sysinfo':
        setLogs(prev => [
          ...prev,
          `GOPI OS Telemetry: Uptime: ${uptimeSeconds}s | CPU: ${cpuUsage}% | RAM: ${ramUsageMb}MB | Kernel: Node.js 22 + TypeScript`
        ]);
        break;
      case 'clear':
        setLogs([]);
        break;
      default:
        setLogs(prev => [
          ...prev,
          `Unknown command: "${cmd}". Type "help" for a list of safe diagnostic commands.`
        ]);
    }
  };

  // Format uptime
  const formatUptime = (sec: number) => {
    const hrs = Math.floor(sec / 3600);
    const mins = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${hrs}h ${mins}m ${s}s`;
  };

  return (
    <section id="demo" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
      <div className="space-y-4 mb-8">
        <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400">
          <Terminal className="w-3.5 h-3.5" />
          <span className="uppercase tracking-wider">Module 04 // Interactive Systems Simulator</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-100 tracking-tight">
              Simulated Kernel & Process Telemetry
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl pt-1">
              Interact directly with the simulated GOPI OS runtime. Test async load spikes, trigger memory optimizations, and audit factual AI safety in a strictly sandboxed client environment.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono border border-slate-700 flex items-center gap-1.5 transition-colors"
            >
              {isPaused ? <Play className="w-3.5 h-3.5 text-emerald-400 fill-current" /> : <Pause className="w-3.5 h-3.5 text-amber-400" />}
              <span>{isPaused ? 'Resume Telemetry' : 'Pause Loop'}</span>
            </button>
            <button
              onClick={handleRunOptimize}
              className="px-3 py-1.5 rounded bg-cyan-950/80 hover:bg-cyan-900/80 text-cyan-300 text-xs font-mono border border-cyan-800/60 flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Optimize</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Simulator Card */}
      <div className="rounded-xl bg-[#0a101d] border border-cyan-900/60 shadow-2xl overflow-hidden">
        {/* Top OS Simulator Telemetry Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-slate-800 bg-[#060a12] p-4 gap-4">
          {/* Metric 1: CPU Load */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                <span>CPU Load</span>
              </span>
              <span className="text-cyan-400 font-bold">{cpuUsage}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 rounded-full ${
                  cpuUsage > 70 ? 'bg-amber-400' : 'bg-cyan-500'
                }`} 
                style={{ width: `${cpuUsage}%` }}
              />
            </div>
          </div>

          {/* Metric 2: RAM Consumption */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <HardDrive className="w-3.5 h-3.5 text-emerald-400" />
                <span>RAM Usage</span>
              </span>
              <span className="text-emerald-400 font-bold">{ramUsageMb} MB</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 transition-all duration-500 rounded-full" 
                style={{ width: `${(ramUsageMb / 400) * 100}%` }}
              />
            </div>
          </div>

          {/* Metric 3: Network Throughput */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-blue-400" />
                <span>Network I/O</span>
              </span>
              <span className="text-blue-400 font-bold">{networkSpeedKb} KB/s</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 transition-all duration-500 rounded-full" 
                style={{ width: `${(networkSpeedKb / 1000) * 100}%` }}
              />
            </div>
          </div>

          {/* Metric 4: Uptime Counter */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Kernel Uptime</span>
              </span>
              <span className="text-amber-400 font-bold">{formatUptime(uptimeSeconds)}</span>
            </div>
            <div className="text-[10px] text-slate-500 font-mono text-right">Deterministic Loop</div>
          </div>
        </div>

        {/* Middle Section: Process Table & Diagnostic Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-b border-slate-800">
          {/* Process List (7 Cols) */}
          <div className="lg:col-span-7 p-5 border-b lg:border-b-0 lg:border-r border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Server className="w-4 h-4 text-cyan-400" />
                Active Micro-Worker Processes
              </h4>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                {processes.length} Processes Active
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs text-slate-300">
                <thead>
                  <tr className="border-b border-slate-800/80 text-[10px] text-slate-500 uppercase">
                    <th className="pb-2">PID</th>
                    <th className="pb-2">Process Name</th>
                    <th className="pb-2">CPU</th>
                    <th className="pb-2">RAM</th>
                    <th className="pb-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40">
                  {processes.map((p) => (
                    <tr key={p.pid} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-2 text-slate-500">{p.pid}</td>
                      <td className="py-2 text-cyan-300 font-semibold">{p.name}</td>
                      <td className="py-2 text-slate-300">{p.cpu}%</td>
                      <td className="py-2 text-slate-400">{p.ram}</td>
                      <td className="py-2">
                        <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-800/40">
                          <span className="w-1 h-1 rounded-full bg-emerald-400"></span>
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Simulation Triggers (5 Cols) */}
          <div className="lg:col-span-5 p-5 bg-[#080d17] space-y-4">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-300">
              Interactive Test Suites
            </h4>

            <div className="space-y-2.5">
              <button
                id="demo-btn-bench"
                onClick={handleRunBenchmark}
                disabled={activeBenchmark}
                className="w-full p-3 rounded-lg bg-[#0d1627] hover:bg-[#121f38] border border-cyan-800/50 text-left transition-all group disabled:opacity-50"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-cyan-400" />
                    Simulate 1,000 Async Tasks
                  </span>
                  <span className="text-[10px] font-mono text-cyan-500 group-hover:text-cyan-300">
                    {activeBenchmark ? 'RUNNING...' : 'TRIGGER'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Tests thread pool queueing, token refills, and latency percentiles.
                </p>
              </button>

              <button
                id="demo-btn-audit"
                onClick={handleRunSecurityAudit}
                className="w-full p-3 rounded-lg bg-[#0d1627] hover:bg-[#121f38] border border-emerald-800/50 text-left transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-emerald-300 flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Audit Factual AI Grounding
                  </span>
                  <span className="text-[10px] font-mono text-emerald-500 group-hover:text-emerald-300">
                    INSPECT
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Verifies that LLM knowledge context contains zero fabricated claims.
                </p>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Console Log Stream */}
        <div className="p-4 bg-[#05080e] font-mono text-xs">
          <div className="flex items-center justify-between text-[11px] text-slate-500 border-b border-slate-800/80 pb-2 mb-3">
            <span>KERNEL DIAGNOSTIC STREAM</span>
            <span className="text-cyan-400">STATUS: HEALTHY</span>
          </div>

          <div className="h-32 overflow-y-auto space-y-1 text-slate-300 text-[11px] mb-3">
            {logs.map((log, idx) => (
              <div
                key={idx}
                className={
                  log.startsWith('>>')
                    ? 'text-cyan-300 font-semibold'
                    : log.startsWith('$')
                    ? 'text-amber-300'
                    : 'text-slate-400'
                }
              >
                {log}
              </div>
            ))}
          </div>

          {/* Interactive Command Prompt */}
          <form onSubmit={handleExecuteCommand} className="flex items-center gap-2 pt-2 border-t border-slate-800/60">
            <span className="text-cyan-400 font-bold">kernel&gt;</span>
            <input
              type="text"
              value={commandInput}
              onChange={(e) => setCommandInput(e.target.value)}
              placeholder="Type bench, audit-security, optimize, sysinfo, clear..."
              className="flex-1 bg-transparent text-slate-200 placeholder-slate-600 focus:outline-none text-xs font-mono"
            />
            <button
              type="submit"
              className="px-3 py-1 rounded bg-cyan-900/60 hover:bg-cyan-800 text-cyan-200 text-[11px] border border-cyan-700/50"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
