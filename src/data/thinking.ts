import { ProblemThinkingItem } from '../types';

export const thinkingData: ProblemThinkingItem[] = [
  {
    id: 'rate-limiter-token-bucket',
    title: 'Distributed Token Bucket Rate Limiter with Clock Drift Resilience',
    category: 'Concurrency & Architecture',
    complexity: {
      time: 'O(1) per request',
      space: 'O(U) where U is active users'
    },
    problemStatement: 'Design an API rate limiter capable of protecting critical endpoints against thundering herd floods while maintaining accurate refill rates across distributed server instances without distributed clock synchronization errors.',
    constraints: [
      'Sub-millisecond decision latency (< 2ms)',
      'No multi-roundtrip network locks on Redis / data store',
      'Gracefully handle microsecond clock discrepancies across worker nodes',
      'Support burst capacity with smooth continuous refill'
    ],
    keyObservation: 'Instead of periodically running a background timer to refill tokens (which wastes CPU and creates locking storms), calculate token replenishment lazily upon arrival based on delta time: tokens = min(capacity, current_tokens + (now - last_refill) * refill_rate).',
    approachSteps: [
      {
        step: 1,
        title: 'Define Mathematical Invariant',
        description: 'Express token availability as a purely deterministic function of elapsed milliseconds since last state write.'
      },
      {
        step: 2,
        title: 'Atomic Single-Script Execution',
        description: 'Encapsulate the state read, delta computation, token subtraction, and TTL update into a single atomic Lua script on Redis.'
      },
      {
        step: 3,
        title: 'Safe Local Fallback',
        description: 'If the distributed cache connection drops, degrade to a process-local token bucket to ensure API availability remains uninterrupted.'
      }
    ],
    alternativesConsidered: [
      {
        approach: 'Fixed Window Counter',
        drawback: 'Vulnerable to 2x burst spikes across window boundaries (e.g. 100 requests at 00:59 and 100 at 01:00).'
      },
      {
        approach: 'Sliding Window Log',
        drawback: 'High memory consumption storing individual timestamps for every request under high traffic.'
      }
    ],
    codeSnippet: `// Atomic Token Bucket Calculation in TypeScript / Lua concept
export function consumeToken(
  bucket: { tokens: number; lastRefill: number; capacity: number; refillRatePerMs: number },
  now = Date.now()
): boolean {
  const elapsedMs = Math.max(0, now - bucket.lastRefill);
  const replenished = Math.min(bucket.capacity, bucket.tokens + elapsedMs * bucket.refillRatePerMs);
  
  if (replenished >= 1) {
    bucket.tokens = replenished - 1;
    bucket.lastRefill = now;
    return true; // Request Allowed
  }
  return false; // Throttled (429)
}`,
    codeLanguage: 'typescript',
    engineeringTakeaways: 'Lazy mathematical evaluation eliminates background maintenance cron jobs and keeps state updates strictly O(1) and atomic.'
  },
  {
    id: 'sliding-window-monotonic-deque',
    title: 'Sliding Window Extrema with Monotonic Deque Invariants',
    category: 'Algorithms & DSA',
    complexity: {
      time: 'O(N) Amortized (each index pushed & popped at most once)',
      space: 'O(K) where K is window length'
    },
    problemStatement: 'Given a continuous high-throughput stream of numerical telemetry values (e.g., CPU latency samples) of length N and a moving window of size K, compute the exact maximum value for every sliding window position in strict linear time.',
    constraints: [
      'N up to 10^7 elements, K up to 10^5',
      'Cannot allocate O(N*K) memory',
      'Must maintain real-time online processing capability'
    ],
    keyObservation: 'If element at index J is greater than or equal to element at index I (where J > I), element I can NEVER be the maximum in any subsequent window because J is larger and survives longer in time.',
    approachSteps: [
      {
        step: 1,
        title: 'Maintain Monotonically Decreasing Deque',
        description: 'Store candidate indices in a double-ended queue where array values strictly decrease from front to back.'
      },
      {
        step: 2,
        title: 'Evict Expired Indices',
        description: 'Before inserting index i, drop front indices that fall outside the window (index <= i - k).'
      },
      {
        step: 3,
        title: 'Prune Dominated Candidates',
        description: 'Pop back indices from deque while array[back] <= array[i] because newly arrived element dominates them.'
      },
      {
        step: 4,
        title: 'Record Window Maximum',
        description: 'The front of the deque is guaranteed to be the current window maximum in O(1) time.'
      }
    ],
    alternativesConsidered: [
      {
        approach: 'Max Heap / PriorityQueue',
        drawback: 'O(N log K) time with slow lazy deletions and heap reallocation overhead.'
      },
      {
        approach: 'Segment Tree Range Query',
        drawback: 'O(N log N) building and O(log K) per query with high constant memory factor.'
      }
    ],
    codeSnippet: `function slidingWindowMax(nums: number[], k: number): number[] {
  const deque: number[] = []; // stores indices
  const maxes: number[] = [];
  
  for (let i = 0; i < nums.length; i++) {
    // 1. Evict elements outside current window
    if (deque.length > 0 && deque[0] <= i - k) {
      deque.shift();
    }
    // 2. Maintain monotonic decreasing invariant
    while (deque.length > 0 && nums[deque[deque.length - 1]] <= nums[i]) {
      deque.pop();
    }
    deque.push(i);
    // 3. Collect maximum once first window is formed
    if (i >= k - 1) {
      maxes.push(nums[deque[0]]);
    }
  }
  return maxes;
}`,
    codeLanguage: 'typescript',
    engineeringTakeaways: 'Monotonic data structures exploit dominance relationships to discard irrelevant historical state permanently, transforming polynomial algorithms into amortized linear time.'
  },
  {
    id: 'grounded-ai-verification',
    title: 'Grounded LLM Retrieval & Anti-Hallucination Pipeline',
    category: 'AI Safety & Grounding',
    complexity: {
      time: 'O(E + M) where E is embedding lookup and M is model inference',
      space: 'O(C) bounded context window'
    },
    problemStatement: 'LLMs naturally generate plausible-sounding falsehoods when asked about credentials or system internals. Build a zero-trust grounding architecture that forces deterministic factual compliance without breaking natural conversation flow.',
    constraints: [
      'Untrusted user prompt injection protection',
      'Deterministic fallback on missing evidence',
      'Never invent unverified companies, dates, or achievements',
      'Zero execution authority given to generative model'
    ],
    keyObservation: 'Treat user prompts strictly as untrusted parameters, and treat retrieved context not as free-form instructions, but as a bounded, read-only data catalog with explicit refusal mandates.',
    approachSteps: [
      {
        step: 1,
        title: 'Input Sanitization & Intent Extraction',
        description: 'Strip delimiter control characters, evaluate token length bounds, and classify question intent.'
      },
      {
        step: 2,
        title: 'Ranked Knowledge Excerpt Assembly',
        description: 'Fetch only the exact JSON entities relevant to the topic (projects, skills, or timeline).'
      },
      {
        step: 3,
        title: 'Constrained Action Allowlist',
        description: 'The model can only suggest action enum tags (e.g. VIEW_PROJECT, VIEW_RESUME) which the client router maps safely.'
      },
      {
        step: 4,
        title: 'Post-Generation Factual Audit',
        description: 'Validate that generated mentions match entity keys present in the injected knowledge payload.'
      }
    ],
    alternativesConsidered: [
      {
        approach: 'Unconstrained Free Generation',
        drawback: 'Model frequently invents impressive but fake credentials and is vulnerable to prompt injection.'
      },
      {
        approach: 'Static Keyword Lookup Table',
        drawback: 'Lacks semantic understanding of natural phrasing, synonyms, and conversational context.'
      }
    ],
    codeSnippet: `// Server-side Guarded Prompt Builder
export function buildGroundedPrompt(userQuery: string, verifiedKnowledge: string): string {
  return \`You are the verified portfolio assistant for Gopi Chinnapogu.
CRITICAL SAFETY & GROUNDING RULES:
1. ONLY answer using the VERIFIED DATA below.
2. If the answer is not explicitly present in the data, state: "I don't have verified information about that in Gopi's portfolio."
3. NEVER fabricate projects, companies, GPA, or achievements.
4. If an action is helpful, provide one of: VIEW_PROJECT, VIEW_SKILLS, VIEW_RESUME, VIEW_CONTACT.

VERIFIED PORTFOLIO DATA:
\${verifiedKnowledge}

USER QUESTION:
\${userQuery}\`;
}`,
    codeLanguage: 'typescript',
    engineeringTakeaways: 'Deterministic LLM systems require defense-in-depth: input sanitization, minimal injected context, strict negative constraints, and output structural validation.'
  }
];
