import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  Send, 
  ArrowRight, 
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
      content: "Hello! I am Gopi's AI Assistant. I can share details about Gopi's software projects, technical skills in React, Java, and Python, academic background at KL University, and experience. What would you like to know?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputQuery, setInputQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const suggestedQueries = [
    "Tell me about Gopi's featured projects",
    "What are Gopi's core technical skills?",
    "Tell me about Gopi's education & background",
    "How can I contact Gopi for an opportunity?"
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
      const res = await fetch('/api/ai-query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: text,
          conversationHistory: messages.slice(-4)
        })
      });

      if (!res.ok || !res.headers.get('content-type')?.includes('application/json')) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        content: data.answer || "Gopi is an aspiring Software Engineer skilled in Full-Stack Web Development, Java, and Python.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        action: data.action
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      // Graceful offline fallback
      let fallbackContent = "Gopi Chinnapogu is a Computer Science undergraduate at KL University (2022-2026). He specializes in Full-Stack Development with React, Node.js, Java, and Python, having built projects like TaskFlow, WeatherWise, and an interactive algorithmic playground.";
      let fallbackAction: AIAction | undefined = undefined;

      const lower = text.toLowerCase();
      if (lower.includes('project') || lower.includes('taskflow') || lower.includes('weather')) {
        fallbackAction = { type: 'VIEW_PROJECT', label: 'Explore Projects' };
      } else if (lower.includes('contact') || lower.includes('hire') || lower.includes('email')) {
        fallbackAction = { type: 'VIEW_CONTACT', label: 'Go to Contact' };
      } else if (lower.includes('skill') || lower.includes('stack')) {
        fallbackAction = { type: 'VIEW_SKILLS', label: 'View Skills' };
      }

      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        content: fallbackContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        action: fallbackAction
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white border-l border-[#E6E6E8] h-full shadow-[0_0_50px_rgba(0,0,0,0.15)] flex flex-col justify-between"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#E6E6E8] flex items-center justify-between bg-[#F8F7F8]">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-[#FCE7F0] flex items-center justify-center text-[#C96F91]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#151515]">
                AI Assistant
              </h3>
              <p className="text-[11px] text-[#686873]">
                Ask anything about Gopi's work & skills
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-[#686873] hover:text-[#151515] hover:bg-[#EEF0F3] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages */}
        <div ref={scrollRef} className="p-4 flex-1 overflow-y-auto space-y-4 text-xs">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3.5 space-y-2 text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#C96F91] text-white font-medium rounded-br-none shadow-xs'
                    : 'bg-[#F8F7F8] border border-[#E6E6E8] text-[#151515] rounded-bl-none'
                }`}
              >
                <div>{msg.content}</div>

                {msg.action && (
                  <div className="pt-2 border-t border-[#E6E6E8]/70 mt-2">
                    <button
                      onClick={() => {
                        onExecuteAction(msg.action!);
                        onClose();
                      }}
                      className="px-3 py-1.5 rounded-xl bg-[#C96F91] text-white font-semibold text-xs flex items-center gap-1.5 shadow-2xs hover:bg-[#B85B80] transition-colors"
                    >
                      <span>{msg.action.label}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
              <span className="text-[10px] text-[#686873] mt-1 px-1">
                {msg.timestamp}
              </span>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center space-x-2 text-[#C96F91] text-xs p-3 rounded-2xl bg-[#FCE7F0] border border-[#E8A0B8]/40">
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>Thinking...</span>
            </div>
          )}
        </div>

        {/* Suggested Queries */}
        <div className="px-4 py-2 bg-[#F8F7F8] border-t border-[#E6E6E8]">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#686873] mb-1.5">
            Quick Questions:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {suggestedQueries.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className="px-2.5 py-1 rounded-lg bg-white hover:bg-[#FCE7F0] hover:text-[#C96F91] text-[#151515] text-[11px] border border-[#E6E6E8] transition-colors text-left"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 bg-white border-t border-[#E6E6E8] flex items-center gap-2"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask anything about Gopi..."
            className="flex-1 px-3.5 py-2.5 bg-[#F8F7F8] border border-[#E6E6E8] text-[#151515] placeholder-[#686873] rounded-xl focus:border-[#C96F91] focus:bg-white focus:outline-hidden text-xs transition-colors"
          />
          <button
            type="submit"
            disabled={isLoading || !inputQuery.trim()}
            className="p-2.5 bg-[#C96F91] hover:bg-[#B85B80] text-white rounded-xl transition-colors disabled:opacity-50 cursor-pointer shadow-2xs"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
