import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Shield, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

interface HeroBootProps {
  onComplete: () => void;
}

export const HeroBoot: React.FC<HeroBootProps> = ({ onComplete }) => {
  const [bootStep, setBootStep] = useState<number>(0);
  const [isSkipped, setIsSkipped] = useState<boolean>(false);

  const steps = [
    { text: 'Initializing developer profile & systems core...', delay: 250 },
    { text: 'Loading Java Concurrency & OOP primitives... OK', delay: 250 },
    { text: 'Loading Data Structures & Invariant Reasoning... OK', delay: 250 },
    { text: 'Loading Grounded Gemini AI Engine... OK', delay: 250 },
    { text: 'Mounting Flagship Projects & System Telemetry... OK', delay: 250 }
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (bootStep < steps.length) {
      timer = setTimeout(() => {
        setBootStep(prev => prev + 1);
      }, steps[bootStep].delay);
    } else {
      timer = setTimeout(() => {
        onComplete();
      }, 500);
    }
    return () => clearTimeout(timer);
  }, [bootStep]);

  const handleSkip = () => {
    setIsSkipped(true);
    onComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#060911] text-slate-100 p-4 font-mono select-none"
    >
      <div className="w-full max-w-xl bg-[#0b1120] border border-cyan-900/60 rounded-lg shadow-2xl p-6 relative overflow-hidden">
        {/* Top Window Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
            <span className="text-xs text-slate-400 font-semibold ml-2">GOPI_OS_BOOTLOADER // v2.6.4</span>
          </div>
          <button
            onClick={handleSkip}
            className="text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40"
          >
            Skip [Esc]
          </button>
        </div>

        {/* Console Output */}
        <div className="space-y-2 text-xs text-slate-300 min-h-[140px]">
          <div className="text-cyan-400 font-bold tracking-wider mb-2 flex items-center gap-2">
            <Terminal className="w-4 h-4" />
            <span>GOPI OS — SYSTEM STATUS: ONLINE</span>
          </div>

          {steps.slice(0, bootStep).map((s, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <span className="text-cyan-500 font-bold">&gt;</span>
              <span className={idx === steps.length - 1 ? 'text-emerald-400 font-semibold' : 'text-slate-300'}>
                {s.text}
              </span>
            </motion.div>
          ))}

          {bootStep < steps.length && (
            <div className="flex items-center space-x-2 text-cyan-400">
              <span className="text-cyan-500 font-bold">&gt;</span>
              <span className="animate-pulse">Loading system module...</span>
            </div>
          )}
        </div>

        {/* Bottom Banner */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-[11px] text-slate-400 tracking-widest font-bold flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            BUILD. SOLVE. CREATE.
          </div>

          <button
            onClick={handleSkip}
            className="w-full sm:w-auto px-4 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs rounded transition-all flex items-center justify-center gap-1.5 shadow-md shadow-cyan-900/40"
          >
            <span>ENTER PORTFOLIO</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
