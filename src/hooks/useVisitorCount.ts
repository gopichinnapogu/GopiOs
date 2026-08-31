import { useState, useEffect } from 'react';

const STORAGE_KEY = 'gopios_unique_visitor_id';

interface VisitorData {
  count: number | null;
  isNewVisitor: boolean;
  loading: boolean;
}

// Memory cache to prevent duplicate fetch calls in same render cycle
let globalVisitorState: VisitorData = {
  count: null,
  isNewVisitor: false,
  loading: true
};

const listeners = new Set<(state: VisitorData) => void>();

function notifyListeners() {
  listeners.forEach((listener) => listener(globalVisitorState));
}

export function useVisitorCount() {
  const [state, setState] = useState<VisitorData>(globalVisitorState);

  useEffect(() => {
    listeners.add(setState);

    // If already loaded, return current state
    if (globalVisitorState.count !== null) {
      setState(globalVisitorState);
      return () => {
        listeners.delete(setState);
      };
    }

    const trackVisitor = async () => {
      try {
        let visitorId = localStorage.getItem(STORAGE_KEY);
        if (!visitorId) {
          visitorId = `vis_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
          localStorage.setItem(STORAGE_KEY, visitorId);
        }

        const res = await fetch('/api/visitors/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ visitorId })
        });

        if (res.ok) {
          const data = await res.json();
          globalVisitorState = {
            count: data.count,
            isNewVisitor: data.isNew || false,
            loading: false
          };
          notifyListeners();
        } else {
          throw new Error('Failed to track visitor');
        }
      } catch (err) {
        console.warn('[Visitor Tracker] Fallback to count estimation', err);
        globalVisitorState = {
          count: 0,
          isNewVisitor: false,
          loading: false
        };
        notifyListeners();
      }
    };

    trackVisitor();

    return () => {
      listeners.delete(setState);
    };
  }, []);

  return state;
}
