import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  Send, 
  ShieldCheck, 
  ArrowRight, 
  Terminal, 
  RotateCcw,
  ExternalLink,
  Bot,
  User
} from 'lucide-react';
import { ChatMessage, AIAction } from '../../types';

interface AIAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onExecuteAction: (action: AIAction) => void;
}

export const AIAssistantDrawer: React.FC<AIAssistantDrawerProps> = ({
  isOpen,
  onClose,
  onExecuteAction
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      content: "Hello! I am the **GOPI OS Grounded Assistant**. I provide factual, verified information about Gopi's software projects, skills, algorithmic problem-solving approach, and engineering background. How can I help you evaluate Gopi today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sources: ['Gopi OS Verified Knowledge Base']
    }
  ]);
  const [inputQuery, setInputQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const suggestedQueries = [
    "What are Gopi's top flagship projects?",
    "Why should our team interview Gopi?",
    "How does Gopi approach DSA & system design?",
    "Show me Gopi's skills in Java and AI"
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (queryText?: string) => {
    const text = queryText || inputQuery;
    if (!text || text.trim().length === 0 || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: text })
      });

      if (res.ok) {
        const data = await res.json();
        const assistantMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          content: data.content,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          sources: data.sources || ['Verified Grounding Base'],
          action: data.action
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } else {
        const errData = await res.json().catch(() => ({}));
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: 'assistant',
            content: errData.error || "I'm currently unable to retrieve verified data for that query.",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          content: "Network connection error. Please ensure local server is running.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-lg bg-[#090e1a] border-l border-cyan-900/80 shadow-2xl h-full flex flex-col justify-between">
        {/* Drawer Header */}
        <div className="p-4 bg-[#060a13] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-slate-950">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-100 font-display flex items-center gap-1.5">
                GOPI OS AI COMPANION
                <span className="text-[9px] font-mono px-1.5 py-0.2 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded">
                  GROUNDED
                </span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono">
                Zero-Hallucination Verified Agent
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages Body */}
        <div ref={scrollRef} className="p-4 flex-1 overflow-y-auto space-y-4 text-xs font-sans">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[85%] rounded-lg p-3.5 space-y-2 ${
                  msg.sender === 'user'
                    ? 'bg-cyan-600 text-slate-950 font-medium'
                    : 'bg-[#0f172a] border border-slate-800 text-slate-200'
                }`}
              >
                <div className="leading-relaxed whitespace-pre-wrap">
                  {msg.content}
                </div>

                {/* Safe Navigation Action Button */}
                {msg.action && (
                  <div className="pt-2 border-t border-slate-700/60 mt-2">
                    <button
                      onClick={() => {
                        onExecuteAction(msg.action!);
                        onClose();
                      }}
                      className="px-3 py-1.5 rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-[11px] font-mono flex items-center gap-1.5 transition-colors shadow-sm"
                    >
                      <span>{msg.action.label}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                )}

                {/* Verification Source Badge */}
                {msg.sources && msg.sources.length > 0 && (
                  <div className="flex items-center gap-1 text-[10px] font-mono text-cyan-400 pt-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>Source: {msg.sources.join(', ')}</span>
                  </div>
                )}
              </div>
              <span className="text-[10px] font-mono text-slate-500 mt-1 px-1">
                {msg.timestamp}
              </span>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs p-3 rounded bg-[#0f172a] border border-slate-800">
              <span className="animate-spin text-sm">✦</span>
              <span>Retrieving verified context & validating facts...</span>
            </div>
          )}
        </div>

        {/* Suggested Queries Pill Strip */}
        <div className="px-4 py-2 bg-[#060a12] border-t border-slate-800/80">
          <div className="text-[10px] font-mono text-slate-400 mb-1.5 uppercase">
            Suggested Verification Prompts:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {suggestedQueries.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className="px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-[10px] font-mono border border-slate-700 transition-colors text-left"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 bg-[#060a13] border-t border-slate-800 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask anything about Gopi's technical background..."
            className="flex-1 px-3 py-2 bg-[#0b1222] border border-slate-800 text-slate-200 placeholder-slate-500 rounded-md focus:border-cyan-500 focus:outline-none text-xs font-sans"
          />
          <button
            type="submit"
            disabled={isLoading || !inputQuery.trim()}
            className="p-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-md transition-colors disabled:opacity-50 cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
