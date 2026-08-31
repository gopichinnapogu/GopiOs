import { SkillItem } from '../types';

export const skillsData: SkillItem[] = [
  // Languages
  {
    id: 'java',
    name: 'Java (Core & OOP)',
    category: 'languages',
    level: 'Expert',
    proficiency: 92,
    iconName: 'Coffee',
    summary: 'Strong grasp of JVM internals, memory management, multi-threading, concurrency primitives, and design patterns.',
    coreConcepts: ['Object-Oriented Design', 'Generics & Collections Framework', 'JVM Garbage Collection', 'ExecutorService & Concurrency', 'Custom ClassLoaders'],
    relatedTechnologies: ['Spring Boot', 'JUnit', 'Maven', 'Gradle'],
    usedInProjects: ['distributed-orchestrator', 'algo-trade-sandbox'],
    codeEvidence: `// Concurrent Safe Task Queue Implementation
public class SafeTaskDispatcher<T> {
    private final BlockingQueue<T> queue = new LinkedBlockingQueue<>(1024);
    private final ExecutorService workers = Executors.newFixedThreadPool(Runtime.getRuntime().availableProcessors());
    
    public void submit(T task) throws InterruptedException {
        queue.put(task);
    }
}`
  },
  {
    id: 'typescript',
    name: 'TypeScript & JavaScript',
    category: 'languages',
    level: 'Expert',
    proficiency: 95,
    iconName: 'Code2',
    summary: 'Type-level programming, strict AST analysis, asynchronous event loops, and full-stack isomorphic TypeScript architectures.',
    coreConcepts: ['Discriminated Unions', 'Conditional & Mapped Types', 'Event Loop & Microtasks', 'Generics Inference', 'Zod Runtime Validation'],
    relatedTechnologies: ['Node.js', 'React', 'Next.js', 'Express', 'Vite'],
    usedInProjects: ['gopios-core', 'grounded-rag-engine', 'log-stream-analyzer'],
    codeEvidence: `// Type-safe Result Pattern with Exhaustive Matching
export type Result<T, E = Error> = 
  | { ok: true; value: T } 
  | { ok: false; error: E };

export function isOk<T, E>(res: Result<T, E>): res is { ok: true; value: T } {
  return res.ok;
}`
  },
  {
    id: 'python',
    name: 'Python',
    category: 'languages',
    level: 'Advanced',
    proficiency: 88,
    iconName: 'TerminalSquare',
    summary: 'Data structures, algorithm implementations, asynchronous programming with asyncio, and AI/ML model integration pipelines.',
    coreConcepts: ['Asyncio & Coroutines', 'Generators & Iterators', 'Metaclasses & Decorators', 'NumPy Vectorization', 'FastAPI Architecture'],
    relatedTechnologies: ['FastAPI', 'PyTorch', 'NumPy', 'Pandas', 'LangChain'],
    usedInProjects: ['grounded-rag-engine', 'algo-trade-sandbox'],
    codeEvidence: `async def fetch_vector_embeddings(chunks: list[str]) -> list[list[float]]:
    async with aiohttp.ClientSession() as session:
        tasks = [generate_embedding(session, chunk) for chunk in chunks]
        return await asyncio.gather(*tasks)`
  },
  {
    id: 'sql',
    name: 'SQL & Relational Modeling',
    category: 'languages',
    level: 'Advanced',
    proficiency: 85,
    iconName: 'Database',
    summary: 'Schema normalization (3NF), B-Tree index optimization, transaction isolation levels (ACID), and complex analytical CTE queries.',
    coreConcepts: ['Query Execution Plans & EXPLAIN ANALYZE', 'B-Tree & GiST Indexing', 'Transactions & WAL', 'Window Functions & CTEs', 'Optimistic Locking'],
    relatedTechnologies: ['PostgreSQL', 'MySQL', 'Prisma', 'Drizzle ORM'],
    usedInProjects: ['distributed-orchestrator', 'log-stream-analyzer'],
    codeEvidence: `WITH RankedEvents AS (
  SELECT event_id, user_id, timestamp,
         ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY timestamp DESC) as rnk
  FROM audit_logs
  WHERE created_at >= NOW() - INTERVAL '24 hours'
)
SELECT * FROM RankedEvents WHERE rnk <= 5;`
  },
  {
    id: 'cpp',
    name: 'C++ / System Fundamentals',
    category: 'languages',
    level: 'Intermediate',
    proficiency: 78,
    iconName: 'Cpu',
    summary: 'Pointer arithmetic, manual memory allocation, RAII principles, STL algorithmic complexity, and cache locality optimization.',
    coreConcepts: ['Pointers & References', 'RAII & Smart Pointers', 'STL Containers & Iterators', 'Memory Alignment & Cache Misses', 'Bitwise Manipulation'],
    relatedTechnologies: ['GDB', 'Valgrind', 'CMake'],
    usedInProjects: ['algo-trade-sandbox'],
    codeEvidence: `template<typename T>
class RingBuffer {
    std::vector<T> buffer;
    size_t head = 0, tail = 0, capacity;
public:
    RingBuffer(size_t cap) : capacity(cap), buffer(cap) {}
};`
  },

  // Systems & Backend
  {
    id: 'nodejs-express',
    name: 'Node.js & Express Backends',
    category: 'systems',
    level: 'Expert',
    proficiency: 94,
    iconName: 'Server',
    summary: 'High-throughput REST APIs, middleware pipelines, streaming responses, rate limiting, and process clustering.',
    coreConcepts: ['Non-blocking I/O', 'Stream Pipelines & Backpressure', 'Custom Middleware Architecture', 'Graceful Shutdown & SIGTERM', 'Error Propagation'],
    relatedTechnologies: ['Express', 'Fastify', 'ws', 'Helmet', 'Cors'],
    usedInProjects: ['gopios-core', 'grounded-rag-engine', 'distributed-orchestrator'],
    codeEvidence: `// Resilient Express middleware with circuit-breaker protection
export const circuitBreaker = (threshold: number) => {
  let failures = 0;
  let lastFailure = 0;
  return (req, res, next) => {
    if (failures >= threshold && Date.now() - lastFailure < 30000) {
      return res.status(503).json({ error: 'Circuit Open - degraded state' });
    }
    next();
  };
};`
  },
  {
    id: 'system-design',
    name: 'Distributed Systems & Architecture',
    category: 'systems',
    level: 'Advanced',
    proficiency: 86,
    iconName: 'Network',
    summary: 'Designing for high availability, eventual consistency, partitioned workloads, idempotent API endpoints, and caching topologies.',
    coreConcepts: ['CAP Theorem Tradeoffs', 'Idempotency Keys & Deduplication', 'Horizontal Partitioning & Sharding', 'Message Queues (Pub/Sub)', 'Rate Limiting Algorithms (Token Bucket)'],
    relatedTechnologies: ['Redis', 'RabbitMQ', 'Kafka', 'Nginx', 'Docker'],
    usedInProjects: ['distributed-orchestrator', 'log-stream-analyzer'],
    codeEvidence: `// Distributed Idempotency Guard
async function executeWithIdempotency(key: string, fn: () => Promise<any>) {
  const locked = await redis.setnx(\`lock:\${key}\`, '1');
  if (!locked) return { status: 'DUPLICATE_IN_FLIGHT' };
  try {
    return await fn();
  } finally {
    await redis.del(\`lock:\${key}\`);
  }
}`
  },

  // AI & Data
  {
    id: 'gemini-grounding',
    name: 'Gemini API & LLM Grounding',
    category: 'ai-data',
    level: 'Expert',
    proficiency: 92,
    iconName: 'Sparkles',
    summary: 'Building deterministic, factual AI agents with strict context injection, output schema validation, and prompt injection defense.',
    coreConcepts: ['Retrieval Augmented Generation (RAG)', 'Context Compression & Ranking', 'System Prompt Hardening', 'Tool Calling & Constrained Actions', 'Anti-Hallucination Guardrails'],
    relatedTechnologies: ['@google/genai', 'Gemini 2.5/3.0', 'Embeddings', 'Vector Search'],
    usedInProjects: ['gopios-core', 'grounded-rag-engine'],
    codeEvidence: `// Strict Guarded Context Injection
const context = retrieveVerifiedKnowledge(userQuery);
const response = await ai.models.generateContent({
  model: 'gemini-2.5-flash',
  contents: [
    { role: 'user', parts: [{ text: \`CONTEXT: \${JSON.stringify(context)}\\nQUERY: \${sanitizedQuery}\` }] }
  ]
});`
  },
  {
    id: 'dsa',
    name: 'Algorithms & Data Structures',
    category: 'ai-data',
    level: 'Expert',
    proficiency: 93,
    iconName: 'Binary',
    summary: 'Deep problem-solving foundation covering Dynamic Programming, Graph Traversals (Dijkstra, BFS/DFS), Segment Trees, and Invariant proofs.',
    coreConcepts: ['Two-Pointer & Sliding Window Invariants', 'Topological Sort & Disjoint Set Union', 'Dynamic Programming State Reduction', 'Trie & Binary Indexed Trees', 'Asymptotic Big-O Analysis'],
    relatedTechnologies: ['LeetCode', 'Codeforces', 'GeeksforGeeks'],
    usedInProjects: ['algo-trade-sandbox', 'log-stream-analyzer'],
    codeEvidence: `// Sliding Window Maximum - O(N) using Monotonic Deque
function maxSlidingWindow(nums: number[], k: number): number[] {
  const deque: number[] = [];
  const result: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    while (deque.length && deque[0] <= i - k) deque.shift();
    while (deque.length && nums[deque[deque.length - 1]] < nums[i]) deque.pop();
    deque.push(i);
    if (i >= k - 1) result.push(nums[deque[0]]);
  }
  return result;
}`
  },

  // Tools & DevOps
  {
    id: 'devops-tools',
    name: 'Git, Docker & CI/CD',
    category: 'tools-devops',
    level: 'Advanced',
    proficiency: 87,
    iconName: 'Boxes',
    summary: 'Containerized reproducible environments, multistage Docker builds, GitHub Actions pipelines, and structured Git flow.',
    coreConcepts: ['Multistage Container Builds', 'Git Interactive Rebase & Bisect', 'GitHub Actions CI Pipelines', 'Environment Variable Security', 'Semantic Versioning'],
    relatedTechnologies: ['Docker', 'Git', 'GitHub Actions', 'Linux Bash', 'Vite'],
    usedInProjects: ['gopios-core', 'distributed-orchestrator', 'log-stream-analyzer'],
    codeEvidence: `# Multi-stage lightweight production container
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
CMD ["node", "dist/server.cjs"]`
  }
];
