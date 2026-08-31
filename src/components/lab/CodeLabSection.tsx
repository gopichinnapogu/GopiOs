import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  RotateCcw, 
  Terminal, 
  Code2, 
  Copy, 
  Check, 
  Sparkles, 
  Cpu, 
  CheckCircle2, 
  AlertCircle,
  FileCode2,
  Download,
  Trash2,
  Sliders,
  ChevronDown,
  Layers,
  ArrowRight,
  Clock,
  HardDrive,
  Keyboard,
  ExternalLink,
  ShieldCheck,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { executeCodeInLab } from '../../utils/compilerRunner';

export type SupportedLanguage = 'java' | 'c' | 'cpp' | 'python' | 'javascript';

interface TemplateOption {
  id: string;
  label: string;
  description: string;
  codeMap: Record<SupportedLanguage, string>;
  defaultStdin?: string;
}

interface LanguageConfig {
  id: SupportedLanguage;
  name: string;
  extension: string;
  compiler: string;
  version: string;
  color: string;
  badge: string;
}

const LANGUAGE_CONFIGS: Record<SupportedLanguage, LanguageConfig> = {
  java: {
    id: 'java',
    name: 'Java',
    extension: 'Main.java',
    compiler: 'javac / OpenJDK 17.0.20',
    version: 'JDK 17 LTS',
    color: 'text-orange-400',
    badge: 'bg-orange-500/10 text-orange-400 border-orange-500/30'
  },
  c: {
    id: 'c',
    name: 'C',
    extension: 'main.c',
    compiler: 'gcc 12.3.0 (C17 Standard)',
    version: 'GCC C17',
    color: 'text-blue-400',
    badge: 'bg-blue-500/10 text-blue-400 border-blue-500/30'
  },
  cpp: {
    id: 'cpp',
    name: 'C++',
    extension: 'main.cpp',
    compiler: 'g++ 12.3.0 (C++20 Standard)',
    version: 'G++ C++20',
    color: 'text-indigo-400',
    badge: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30'
  },
  python: {
    id: 'python',
    name: 'Python',
    extension: 'main.py',
    compiler: 'Python 3.10.12 (CPython)',
    version: 'Python 3.10',
    color: 'text-emerald-400',
    badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
  },
  javascript: {
    id: 'javascript',
    name: 'JavaScript',
    extension: 'main.js',
    compiler: 'Node.js v22.23 (V8 Engine)',
    version: 'Node.js v22',
    color: 'text-amber-400',
    badge: 'bg-amber-500/10 text-amber-400 border-amber-500/30'
  }
};

const HELLO_WORLD_TEMPLATES: Record<SupportedLanguage, string> = {
  java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
  c: `#include <stdio.h>

int main(void) {
    printf("Hello, World!\\n");
    return 0;
}`,
  cpp: `#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}`,
  python: `print("Hello, World!")`,
  javascript: `console.log("Hello, World!");`
};

const TEMPLATES: TemplateOption[] = [
  {
    id: 'hello_world',
    label: '1. Hello World (Default)',
    description: 'Standard Hello World starter program.',
    defaultStdin: '',
    codeMap: HELLO_WORLD_TEMPLATES
  },
  {
    id: 'starter',
    label: '2. Systems & Concurrency Sandbox',
    description: 'High-performance priority task queue and ring buffer telemetry simulation.',
    defaultStdin: 'NET_PACKET_01\nCACHE_BURST_02\nAUTH_STREAM_03',
    codeMap: {
      java: `// Realtime Java 17 Online Sandbox // GOPI OS
import java.util.*;

public class Main {
    public static void main(String[] args) {
        System.out.println("=== GOPI OS // Realtime Java 17 Engine ===");
        
        // Priority Queue Task Scheduler
        PriorityQueue<Task> taskQueue = new PriorityQueue<>(
            Comparator.comparingInt(Task::getPriority).reversed()
        );
        
        taskQueue.add(new Task("Zero-Allocation Ring Buffer", 10));
        taskQueue.add(new Task("Telemetry Ingestion Stream", 9));
        taskQueue.add(new Task("Token Bucket Synchronizer", 8));
        taskQueue.add(new Task("Garbage Collection Audit", 4));
        
        System.out.println("Dispatched " + taskQueue.size() + " prioritized tasks in O(log N)...");
        
        while (!taskQueue.isEmpty()) {
            Task current = taskQueue.poll();
            System.out.println(String.format(" [EXECUTE] Priority %2d -> %s", current.priority, current.name));
        }
        
        System.out.println("All system tasks executed with exit code 0.");
    }
    
    static class Task {
        String name;
        int priority;
        Task(String name, int priority) {
            this.name = name;
            this.priority = priority;
        }
        int getPriority() { return priority; }
    }
}`,
      c: `/* Realtime C17 Online Sandbox // GOPI OS */
#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <string.h>

#define BUFFER_SIZE 4

typedef struct {
    uint32_t id;
    char payload[32];
} EventRecord;

int main(void) {
    printf("=== GOPI OS // Realtime C17 Memory Allocator ===\\n");
    
    // Allocate contiguous heap memory
    EventRecord* buffer = (EventRecord*)malloc(sizeof(EventRecord) * BUFFER_SIZE);
    if (buffer == NULL) {
        fprintf(stderr, "Heap allocation failed!\\n");
        return 1;
    }
    
    const char* events[BUFFER_SIZE] = {
        "ZERO_COPY_BUFFER",
        "CACHE_LINE_HIT",
        "TELEMETRY_SYNC",
        "MUTEX_RELEASE"
    };
    
    for (int i = 0; i < BUFFER_SIZE; i++) {
        buffer[i].id = 1000 + i;
        strncpy(buffer[i].payload, events[i], sizeof(buffer[i].payload) - 1);
        printf(" [MEM_BLOCK] Addr: %p | ID: %u | Event: %s\\n", 
               (void*)&buffer[i], buffer[i].id, buffer[i].payload);
    }
    
    printf("Contiguous memory cleaned up. Exiting status 0.\\n");
    free(buffer);
    return 0;
}`,
      cpp: `// Realtime C++20 Online Sandbox // GOPI OS
#include <iostream>
#include <vector>
#include <deque>
#include <string>

// Monotonic Deque Sliding Window Extrema - O(N) Time
std::vector<int> maxSlidingWindow(const std::vector<int>& nums, int k) {
    std::deque<int> dq;
    std::vector<int> results;
    
    for (int i = 0; i < (int)nums.size(); ++i) {
        if (!dq.empty() && dq.front() <= i - k) {
            dq.pop_front();
        }
        while (!dq.empty() && nums[dq.back()] <= nums[i]) {
            dq.pop_back();
        }
        dq.push_back(i);
        if (i >= k - 1) {
            results.push_back(nums[dq.front()]);
        }
    }
    return results;
}

int main() {
    std::cout << "=== GOPI OS // Realtime C++20 Sliding Window Queue ===\\n";
    std::vector<int> stream = {1, 3, -1, -3, 5, 3, 6, 7};
    int k = 3;
    
    std::cout << "Stream Values: [1, 3, -1, -3, 5, 3, 6, 7] | Window k = " << k << "\\n";
    auto maxWindow = maxSlidingWindow(stream, k);
    
    std::cout << "Computed Window Maxima: [ ";
    for (int val : maxWindow) {
        std::cout << val << " ";
    }
    std::cout << "]\\nAmortized Complexity: O(N) Time | O(K) Auxiliary Space\\n";
    return 0;
}`,
      python: `# Realtime Python 3 Online Sandbox // GOPI OS
import time
import math

class TokenBucket:
    def __init__(self, capacity: int, refill_rate: float):
        self.capacity = capacity
        self.refill_rate = refill_rate # tokens per sec
        self.tokens = capacity
        self.last_refill = time.time()
        
    def allow(self, cost: int = 1) -> bool:
        now = time.time()
        elapsed = now - self.last_refill
        self.tokens = min(self.capacity, self.tokens + elapsed * self.refill_rate)
        self.last_refill = now
        
        if self.tokens >= cost:
            self.tokens -= cost
            return True
        return False

bucket = TokenBucket(capacity=5, refill_rate=2.0)
print("=== GOPI OS // Realtime Python Token Bucket Sandbox ===")
print(f"Capacity: {bucket.capacity} | Refill: {bucket.refill_rate} tokens/sec")

endpoints = ["/api/v1/telemetry", "/api/v1/auth", "/api/v1/query", "/api/v1/logs", "/api/v1/health", "/api/v1/stream"]
for ep in endpoints:
    status = "200 OK" if bucket.allow(1) else "429 TOO MANY REQUESTS"
    print(f" [HTTP_PROXY] {ep:<18} -> {status} (Tokens left: {math.floor(bucket.tokens)})")

print("Rate limiter simulation complete.")`,
      javascript: `// Realtime Node.js V8 Online Sandbox // GOPI OS
console.log("=== GOPI OS // Realtime JavaScript V8 Sandbox ===");

class VectorIndex {
    constructor() {
        this.records = new Map();
    }
    
    insert(id, vector, metadata) {
        this.records.set(id, { vector, metadata });
    }
    
    cosineSimilarity(vecA, vecB) {
        let dot = 0, normA = 0, normB = 0;
        for (let i = 0; i < vecA.length; i++) {
            dot += vecA[i] * vecB[i];
            normA += vecA[i] ** 2;
            normB += vecB[i] ** 2;
        }
        return dot / (Math.sqrt(normA) * Math.sqrt(normB));
    }
    
    search(queryVector, topK = 2) {
        const scores = [];
        for (const [id, record] of this.records.entries()) {
            const similarity = this.cosineSimilarity(queryVector, record.vector);
            scores.push({ id, similarity: Number(similarity.toFixed(4)), metadata: record.metadata });
        }
        return scores.sort((a, b) => b.similarity - a.similarity).slice(0, topK);
    }
}

const index = new VectorIndex();
index.insert("doc_1", [0.92, 0.12, 0.35], { title: "Distributed Task Orchestration" });
index.insert("doc_2", [0.15, 0.88, 0.22], { title: "Frontend Layout Engines" });
index.insert("doc_3", [0.89, 0.18, 0.41], { title: "Zero-Copy Ring Buffer Stream" });

const query = [0.90, 0.15, 0.38];
console.log("Searching nearest semantic vectors for query [0.90, 0.15, 0.38]...");
const results = index.search(query, 2);

results.forEach((r, idx) => {
    console.log(\` #\${idx + 1} Match: [\${r.id}] Similarity: \${r.similarity} -> "\${r.metadata.title}"\`);
});

console.log("Vector retrieval completed in <1.5ms.");`
    }
  },
  {
    id: 'stdin_interactive',
    label: '3. Interactive STDIN Input Test',
    description: 'Reads custom input from the STDIN stream using Scanner, cin, scanf, input().',
    defaultStdin: '15 25\nGOPI_OS_DEV_2026',
    codeMap: {
      java: `// Interactive STDIN with Scanner in Java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("=== Java STDIN Scanner Demo ===");
        
        if (sc.hasNextInt()) {
            int a = sc.nextInt();
            int b = sc.nextInt();
            System.out.println("Read integers from STDIN: a = " + a + ", b = " + b);
            System.out.println("Calculated Sum: " + (a + b));
            System.out.println("Calculated Product: " + (a * b));
        }
        
        if (sc.hasNext()) {
            String token = sc.next();
            System.out.println("Read payload string: " + token);
        }
        
        System.out.println("Program finished reading STDIN successfully.");
    }
}`,
      c: `/* Interactive STDIN with scanf in C */
#include <stdio.h>

int main(void) {
    int a = 0, b = 0;
    char token[64] = {0};
    
    printf("=== C STDIN scanf Demo ===\\n");
    if (scanf("%d %d", &a, &b) == 2) {
        printf("Read integers: a = %d, b = %d\\n", a, b);
        printf("Sum = %d | Product = %d\\n", a + b, a * b);
    }
    
    if (scanf("%63s", token) == 1) {
        printf("Read string token: %s\\n", token);
    }
    
    printf("C execution finished.\\n");
    return 0;
}`,
      cpp: `// Interactive STDIN with std::cin in C++
#include <iostream>
#include <string>

int main() {
    std::cout << "=== C++ STDIN std::cin Demo ===\\n";
    int a = 0, b = 0;
    std::string token;
    
    if (std::cin >> a >> b) {
        std::cout << "Read a = " << a << ", b = " << b << "\\n";
        std::cout << "Sum: " << (a + b) << " | Difference: " << (a - b) << "\\n";
    }
    
    if (std::cin >> token) {
        std::cout << "Read token string: " << token << "\\n";
    }
    
    std::cout << "Completed successfully.\\n";
    return 0;
}`,
      python: `# Interactive STDIN with sys.stdin in Python
import sys

print("=== Python STDIN Reader Demo ===")
lines = sys.stdin.read().strip().split()
if len(lines) >= 2:
    try:
        a = int(lines[0])
        b = int(lines[1])
        print(f"Read values: a = {a}, b = {b}")
        print(f"Sum = {a + b} | Multiply = {a * b} | Power = {a ** (min(b, 5))}")
    except ValueError:
        print(f"Read tokens: {lines}")

if len(lines) >= 3:
    print(f"Additional token: {lines[2]}")

print("Python STDIN execution complete.")`,
      javascript: `// Interactive STDIN with fs.readFileSync in Node.js
const fs = require('fs');

console.log("=== Node.js STDIN Reader Demo ===");
try {
    const input = fs.readFileSync(0, 'utf-8').trim();
    const tokens = input.split(/\\s+/);
    
    if (tokens.length >= 2) {
        const a = Number(tokens[0]);
        const b = Number(tokens[1]);
        console.log(\`Parsed: a = \${a}, b = \${b}\`);
        console.log(\`Sum: \${a + b} | Product: \${a * b}\`);
    }
    if (tokens.length >= 3) {
        console.log(\`Token string: "\${tokens[2]}"\`);
    }
} catch (e) {
    console.log("No STDIN input provided, reading completed.");
}`
    }
  },
  {
    id: 'two_sum',
    label: '4. Two Sum & Hash Map Lookup (O(N))',
    description: 'Classic LeetCode #1 algorithm with hash map lookup in optimal time.',
    defaultStdin: '2 7 11 15\n9',
    codeMap: {
      java: `// Two Sum in Java using HashMap - O(N) Time
import java.util.*;

public class Main {
    public static int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[] {};
    }

    public static void main(String[] args) {
        int[] nums = { 2, 7, 11, 15 };
        int target = 9;
        
        System.out.println("=== Two Sum Algorithm in Java ===");
        System.out.println("Array: " + Arrays.toString(nums) + " | Target: " + target);
        
        int[] result = twoSum(nums, target);
        if (result.length == 2) {
            System.out.println("Found Indices: [" + result[0] + ", " + result[1] + "]");
            System.out.println("Verification: " + nums[result[0]] + " + " + nums[result[1]] + " = " + target);
        } else {
            System.out.println("No solution found.");
        }
    }
}`,
      c: `/* Two Sum in C using Linear Complement Search */
#include <stdio.h>

int main(void) {
    int nums[] = { 2, 7, 11, 15 };
    int n = 4;
    int target = 9;
    
    printf("=== Two Sum in C (C17) ===\\n");
    printf("Array: [2, 7, 11, 15] | Target: %d\\n", target);
    
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            if (nums[i] + nums[j] == target) {
                printf("Found Indices: [%d, %d]\\n", i, j);
                printf("Values: %d + %d = %d\\n", nums[i], nums[j], target);
                return 0;
            }
        }
    }
    printf("No matching pair found.\\n");
    return 0;
}`,
      cpp: `// Two Sum in C++ using std::unordered_map - O(N) Time
#include <iostream>
#include <vector>
#include <unordered_map>

std::vector<int> twoSum(const std::vector<int>& nums, int target) {
    std::unordered_map<int, int> numMap;
    for (int i = 0; i < (int)nums.size(); ++i) {
        int complement = target - nums[i];
        if (numMap.find(complement) != numMap.end()) {
            return { numMap[complement], i };
        }
        numMap[nums[i]] = i;
    }
    return {};
}

int main() {
    std::cout << "=== Two Sum in C++ (C++20) ===\\n";
    std::vector<int> nums = { 2, 7, 11, 15 };
    int target = 9;
    
    auto indices = twoSum(nums, target);
    if (!indices.empty()) {
        std::cout << "Indices: [" << indices[0] << ", " << indices[1] << "]\\n";
        std::cout << "Values: " << nums[indices[0]] << " + " << nums[indices[1]] << " = " << target << "\\n";
    }
    return 0;
}`,
      python: `# Two Sum in Python using Dictionary - O(N) Time
def two_sum(nums, target):
    lookup = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in lookup:
            return [lookup[complement], i]
        lookup[num] = i
    return []

nums = [2, 7, 11, 15]
target = 9

print("=== Two Sum in Python ===")
print(f"Input: {nums}, Target: {target}")
res = two_sum(nums, target)
print(f"Result Indices: {res}")
if res:
    print(f"Values: {nums[res[0]]} + {nums[res[1]]} == {target}")`,
      javascript: `// Two Sum in JavaScript using Map - O(N) Time
function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}

const nums = [2, 7, 11, 15];
const target = 9;

console.log("=== Two Sum in JavaScript ===");
console.log("Array:", nums, "Target:", target);
const indices = twoSum(nums, target);
console.log("Result Indices:", indices);
console.log(\`Verification: \${nums[indices[0]]} + \${nums[indices[1]]} = \${target}\`);`
    }
  }
];

interface ExecutionHistoryItem {
  id: string;
  language: SupportedLanguage;
  status: 'SUCCESS' | 'RUNTIME_ERROR' | 'COMPILATION_ERROR' | 'TIME_LIMIT_EXCEEDED';
  executionTimeMs: number;
  memoryUsageMb: number;
  exitCode: number;
  stdout: string;
  stderr: string;
  timestamp: string;
}

export const CodeLabSection: React.FC = () => {
  const [selectedLang, setSelectedLang] = useState<SupportedLanguage>('java');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('hello_world');
  
  // Custom code storage for all 5 languages
  const [codeMap, setCodeMap] = useState<Record<SupportedLanguage, string>>({
    java: TEMPLATES[0].codeMap.java,
    c: TEMPLATES[0].codeMap.c,
    cpp: TEMPLATES[0].codeMap.cpp,
    python: TEMPLATES[0].codeMap.python,
    javascript: TEMPLATES[0].codeMap.javascript
  });

  const [stdinInput, setStdinInput] = useState<string>(TEMPLATES[0].defaultStdin || '');
  const [showStdin, setShowStdin] = useState<boolean>(true);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [runStage, setRunStage] = useState<string>('Ready');
  
  // Terminal and result states
  const [stdout, setStdout] = useState<string>('Click "Run Code" or press (Cmd/Ctrl + Enter) to compile and execute.');
  const [stderr, setStderr] = useState<string>('');
  const [lastStatus, setLastStatus] = useState<'IDLE' | 'SUCCESS' | 'RUNTIME_ERROR' | 'COMPILATION_ERROR' | 'TIME_LIMIT_EXCEEDED'>('IDLE');
  const [execTime, setExecTime] = useState<number | null>(null);
  const [memoryUsage, setMemoryUsage] = useState<number | null>(null);
  const [exitCode, setExitCode] = useState<number | null>(null);
  const [activeEngine, setActiveEngine] = useState<string | null>(null);
  const [history, setHistory] = useState<ExecutionHistoryItem[]>([]);
  
  // UI states
  const [copied, setCopied] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('sm');
  const [activeTab, setActiveTab] = useState<'output' | 'history' | 'specs'>('output');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const currentConfig = LANGUAGE_CONFIGS[selectedLang];
  const currentCode = codeMap[selectedLang];

  // Handle template selection
  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplateId(templateId);
    const tmpl = TEMPLATES.find(t => t.id === templateId);
    if (tmpl) {
      setCodeMap(prev => ({
        ...prev,
        [selectedLang]: tmpl.codeMap[selectedLang]
      }));
      if (tmpl.defaultStdin !== undefined) {
        setStdinInput(tmpl.defaultStdin);
      }
    }
  };

  const handleLanguageChange = (lang: SupportedLanguage) => {
    setSelectedLang(lang);
    const tmpl = TEMPLATES.find(t => t.id === selectedTemplateId) || TEMPLATES[0];
    // If current code is unmodified, update with selected template snippet
    if (!codeMap[lang]) {
      setCodeMap(prev => ({
        ...prev,
        [lang]: tmpl.codeMap[lang]
      }));
    }
  };

  const handleCodeChange = (newCode: string) => {
    setCodeMap(prev => ({
      ...prev,
      [selectedLang]: newCode
    }));
  };

  const handleResetCode = () => {
    // Resetting code gives the clean Hello World template by default or the currently active selected template
    const tmpl = TEMPLATES.find(t => t.id === selectedTemplateId) || TEMPLATES[0];
    setCodeMap(prev => ({
      ...prev,
      [selectedLang]: tmpl.codeMap[selectedLang]
    }));
    setStdout('Editor restored to starter Hello World template. Ready to execute.');
    setStderr('');
    setLastStatus('IDLE');
    setExecTime(null);
    setMemoryUsage(null);
    setExitCode(null);
  };

  // Real-time compilation and execution with multi-tier failover (Node backend -> Judge0 CE -> Browser JS)
  const handleRunCode = async () => {
    if (isRunning) return;

    setIsRunning(true);
    setRunStage(selectedLang === 'c' || selectedLang === 'cpp' || selectedLang === 'java' ? 'Compiling binary...' : 'Starting runtime...');
    setLastStatus('IDLE');
    setStderr('');
    setActiveTab('output');

    try {
      const result = await executeCodeInLab(selectedLang, currentCode, stdinInput);

      setStdout(result.stdout || (result.status === 'SUCCESS' ? '(Process finished with exit code 0, no stdout output)' : ''));
      setStderr(result.stderr || '');
      setLastStatus(result.status);
      setExecTime(result.executionTimeMs);
      setMemoryUsage(result.memoryUsageMb);
      setExitCode(result.exitCode);
      setActiveEngine(result.engine);

      // Add to execution history
      const historyEntry: ExecutionHistoryItem = {
        id: `run_${Date.now()}`,
        language: selectedLang,
        status: result.status,
        executionTimeMs: result.executionTimeMs,
        memoryUsageMb: result.memoryUsageMb,
        exitCode: result.exitCode,
        stdout: result.stdout,
        stderr: result.stderr,
        timestamp: new Date().toLocaleTimeString()
      };

      setHistory(prev => [historyEntry, ...prev.slice(0, 7)]);
    } catch (err: any) {
      console.error('[Compiler Frontend Error]', err);
      setLastStatus('RUNTIME_ERROR');
      setStderr(err?.message || 'Failed to connect to execution sandbox.');
      setStdout('');
      setExitCode(1);
    } finally {
      setIsRunning(false);
      setRunStage('Ready');
    }
  };

  // Handle Tab key indentation in textarea
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Run shortcut: Cmd + Enter or Ctrl + Enter
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      handleRunCode();
      return;
    }

    // Tab key inserts 4 spaces instead of defocusing
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const spaces = '    ';

      const updatedCode = currentCode.substring(0, start) + spaces + currentCode.substring(end);
      handleCodeChange(updatedCode);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = () => {
    const blob = new Blob([currentCode], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = currentConfig.extension;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleClearOutput = () => {
    setStdout('Output console cleared.');
    setStderr('');
    setLastStatus('IDLE');
    setExecTime(null);
    setMemoryUsage(null);
    setExitCode(null);
  };

  const lineCount = currentCode.split('\n').length;
  const charCount = currentCode.length;

  return (
    <section 
      id="lab" 
      className={`py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-all ${
        isFullscreen ? 'fixed inset-0 z-50 bg-[#040711] overflow-y-auto p-4 sm:p-6' : ''
      }`}
    >
      {/* Header & Title */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400">
            <Code2 className="w-4 h-4" />
            <span className="uppercase tracking-wider">Module 04.5 // Realtime Multi-Language Online Compiler</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs font-mono transition-colors flex items-center gap-1 cursor-pointer"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Workspace"}
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isFullscreen ? "Exit Fullscreen" : "Fullscreen"}</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-100 tracking-tight flex items-center gap-3">
              <span>Realtime Online IDE & Compiler</span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono font-normal">
                LIVE SANDBOX
              </span>
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl pt-1 leading-relaxed">
              Write, compile, and execute code in <strong className="text-slate-200">Java, C, C++, Python, and JavaScript</strong> with real-time STDIN stream input, execution telemetry, and compiler diagnostics.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-900/90 rounded-lg border border-slate-800 text-xs font-mono text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Isolated Subprocess Runtime</span>
            </div>
          </div>
        </div>
      </div>

      {/* Compiler Controls & Template Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 mb-4 bg-[#080d1a] border border-slate-800 p-3 rounded-xl">
        {/* Language Tabs */}
        <div className="lg:col-span-8 flex flex-wrap items-center gap-1.5">
          {(['java', 'c', 'cpp', 'python', 'javascript'] as SupportedLanguage[]).map((lang) => {
            const config = LANGUAGE_CONFIGS[lang];
            const isSelected = selectedLang === lang;
            return (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-900/30'
                    : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <FileCode2 className={`w-3.5 h-3.5 ${isSelected ? 'text-slate-950' : config.color}`} />
                <span>{config.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded ${
                  isSelected ? 'bg-cyan-950/40 text-slate-950 font-mono' : 'bg-slate-800 text-slate-400'
                }`}>
                  .{config.extension.split('.')[1]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Algorithm Template Dropdown */}
        <div className="lg:col-span-4 flex items-center justify-end space-x-2">
          <div className="relative w-full sm:w-auto flex-1 flex items-center">
            <select
              value={selectedTemplateId}
              onChange={(e) => handleTemplateChange(e.target.value)}
              className="w-full bg-[#050914] border border-slate-800 text-slate-200 text-xs font-mono px-3 py-2 rounded-lg focus:outline-none focus:border-cyan-500 cursor-pointer"
            >
              {TEMPLATES.map(t => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Editor & Execution Split Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Code Editor & STDIN */}
        <div className="lg:col-span-7 flex flex-col bg-[#070b14] border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
          {/* Editor Header Bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#090f1d] border-b border-slate-800 text-xs font-mono text-slate-300">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
              <span className="text-slate-400 ml-2">editor //</span>
              <span className="text-cyan-400 font-bold">{currentConfig.extension}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded border hidden sm:inline ${currentConfig.badge}`}>
                {currentConfig.version}
              </span>
            </div>

            <div className="flex items-center space-x-1.5">
              {/* Font size toggle */}
              <div className="flex items-center bg-slate-900 rounded border border-slate-800 text-[10px]">
                <button
                  onClick={() => setFontSize('sm')}
                  className={`px-1.5 py-0.5 ${fontSize === 'sm' ? 'text-cyan-400 font-bold' : 'text-slate-500'}`}
                  title="Small Font (12px)"
                >
                  A-
                </button>
                <button
                  onClick={() => setFontSize('base')}
                  className={`px-1.5 py-0.5 ${fontSize === 'base' ? 'text-cyan-400 font-bold' : 'text-slate-500'}`}
                  title="Regular Font (13px)"
                >
                  A
                </button>
                <button
                  onClick={() => setFontSize('lg')}
                  className={`px-1.5 py-0.5 ${fontSize === 'lg' ? 'text-cyan-400 font-bold' : 'text-slate-500'}`}
                  title="Large Font (14px)"
                >
                  A+
                </button>
              </div>

              <button
                onClick={handleCopyCode}
                className="px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-[11px] transition-colors flex items-center gap-1 cursor-pointer border border-slate-700/60"
                title="Copy code to clipboard"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                onClick={handleDownloadFile}
                className="px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-[11px] transition-colors flex items-center gap-1 cursor-pointer border border-slate-700/60"
                title="Download Source Code File"
              >
                <Download className="w-3 h-3 text-cyan-400" />
                <span className="hidden sm:inline">Save</span>
              </button>

              <button
                onClick={handleResetCode}
                className="px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-[11px] transition-colors flex items-center gap-1 cursor-pointer border border-slate-700/60"
                title="Reset to starter snippet"
              >
                <RotateCcw className="w-3 h-3 text-amber-400" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            </div>
          </div>

          {/* Main Code Textarea with Line Numbers */}
          <div className="relative flex-1 flex bg-[#050811] min-h-[380px] max-h-[460px] overflow-hidden border-b border-slate-800/80">
            {/* Line Numbers Gutter */}
            <div className="w-11 py-3 bg-[#04060d] text-slate-600 font-mono text-xs select-none text-right pr-2.5 border-r border-slate-800/80 leading-5">
              {Array.from({ length: Math.max(lineCount, 16) }).map((_, i) => (
                <div key={i} className="hover:text-slate-400 transition-colors">{i + 1}</div>
              ))}
            </div>

            {/* Code Input */}
            <textarea
              ref={textareaRef}
              value={currentCode}
              onChange={(e) => handleCodeChange(e.target.value)}
              onKeyDown={handleKeyDown}
              className={`flex-1 p-3 bg-transparent text-slate-100 font-mono leading-5 resize-none focus:outline-none focus:ring-0 selection:bg-cyan-900/50 overflow-y-auto whitespace-pre tab-4 ${
                fontSize === 'sm' ? 'text-xs' : fontSize === 'base' ? 'text-[13px]' : 'text-sm'
              }`}
              spellCheck={false}
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              placeholder="// Write your code here..."
            />
          </div>

          {/* Custom Input (STDIN) Panel */}
          <div className="bg-[#070c18] border-b border-slate-800">
            <div className="flex items-center justify-between px-3.5 py-1.5 bg-[#090f1f] text-[11px] font-mono text-slate-400">
              <button
                onClick={() => setShowStdin(!showStdin)}
                className="flex items-center space-x-1.5 text-slate-300 hover:text-cyan-300 transition-colors cursor-pointer"
              >
                <Sliders className="w-3 h-3 text-cyan-400" />
                <span className="font-semibold">Standard Input (STDIN Stream)</span>
                <span className="text-[10px] text-slate-500">
                  {showStdin ? '(Click to collapse)' : '(Click to expand)'}
                </span>
              </button>

              <div className="flex items-center space-x-2 text-[10px] text-slate-500">
                <span>Scanner / cin / scanf / input()</span>
              </div>
            </div>

            {showStdin && (
              <div className="p-3 bg-[#060a14]">
                <textarea
                  value={stdinInput}
                  onChange={(e) => setStdinInput(e.target.value)}
                  placeholder="Enter custom input values to feed into STDIN (e.g. numbers, strings, or test cases)..."
                  className="w-full h-16 p-2 bg-[#04060d] border border-slate-800 rounded-lg text-slate-200 font-mono text-xs focus:outline-none focus:border-cyan-500/60 resize-none"
                  spellCheck={false}
                />
              </div>
            )}
          </div>

          {/* Action Footer Bar */}
          <div className="flex items-center justify-between p-3 bg-[#090f1d]">
            <div className="text-[11px] font-mono text-slate-400 flex items-center gap-2">
              <span className="text-slate-500">Lines:</span>
              <strong className="text-slate-300">{lineCount}</strong>
              <span className="text-slate-600">|</span>
              <span className="text-slate-500">Chars:</span>
              <strong className="text-slate-300">{charCount}</strong>
              <span className="text-slate-600 hidden sm:inline">|</span>
              <span className="text-slate-500 hidden sm:inline">Shortcut:</span>
              <span className="text-cyan-400 hidden sm:inline">⌘/Ctrl + Enter</span>
            </div>

            <button
              onClick={handleRunCode}
              disabled={isRunning}
              className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-slate-950 font-bold text-xs font-mono rounded-lg transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-cyan-900/30 disabled:opacity-50"
            >
              {isRunning ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                  <span>{runStage}</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Run {currentConfig.name} Code</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Execution Output Terminal & Telemetry */}
        <div className="lg:col-span-5 flex flex-col bg-[#070b14] border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
          {/* Terminal Tabs Bar */}
          <div className="flex items-center justify-between px-3 py-2 bg-[#090f1d] border-b border-slate-800 text-xs font-mono">
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setActiveTab('output')}
                className={`px-3 py-1 rounded-md text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'output'
                    ? 'bg-slate-800 text-cyan-400 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Output (STDOUT)</span>
              </button>

              <button
                onClick={() => setActiveTab('history')}
                className={`px-3 py-1 rounded-md text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'history'
                    ? 'bg-slate-800 text-cyan-400 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Runs ({history.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('specs')}
                className={`px-3 py-1 rounded-md text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'specs'
                    ? 'bg-slate-800 text-cyan-400 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>Runtime Specs</span>
              </button>
            </div>

            <button
              onClick={handleClearOutput}
              className="p-1 rounded text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
              title="Clear terminal output"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Execution Status Banner */}
          <div className="px-4 py-2 bg-[#050811] border-b border-slate-800/80 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center space-x-2">
              <span className="text-slate-400">Status:</span>
              {lastStatus === 'IDLE' && (
                <span className="text-slate-500">Ready to execute</span>
              )}
              {lastStatus === 'SUCCESS' && (
                <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  SUCCESS (Exit 0)
                </span>
              )}
              {lastStatus === 'COMPILATION_ERROR' && (
                <span className="flex items-center gap-1 text-rose-400 font-semibold">
                  <AlertCircle className="w-3.5 h-3.5" />
                  COMPILATION ERROR
                </span>
              )}
              {lastStatus === 'RUNTIME_ERROR' && (
                <span className="flex items-center gap-1 text-amber-400 font-semibold">
                  <AlertCircle className="w-3.5 h-3.5" />
                  RUNTIME ERROR (Exit {exitCode ?? 1})
                </span>
              )}
              {lastStatus === 'TIME_LIMIT_EXCEEDED' && (
                <span className="flex items-center gap-1 text-orange-400 font-semibold">
                  <AlertCircle className="w-3.5 h-3.5" />
                  TIME LIMIT EXCEEDED (5000ms)
                </span>
              )}
            </div>

            {execTime !== null && (
              <div className="flex items-center space-x-2 text-[11px]">
                {activeEngine && (
                  <span className="text-[10px] text-slate-400 bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded hidden sm:inline">
                    {activeEngine}
                  </span>
                )}
                <span className="text-cyan-400 font-bold">
                  {execTime} ms
                </span>
                {memoryUsage !== null && (
                  <span className="text-slate-500 hidden md:inline">
                    {memoryUsage} MB
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Output Content Area */}
          {activeTab === 'output' && (
            <div className="flex-1 p-4 bg-[#04060d] text-xs font-mono overflow-y-auto min-h-[300px] max-h-[390px] space-y-3">
              {/* Command Invocation Header */}
              <div className="text-[11px] text-slate-500 pb-2 border-b border-slate-900 flex items-center justify-between">
                <div className="flex items-center gap-1.5 truncate">
                  <span className="text-cyan-400 font-bold">$</span>
                  <span className="text-slate-400 truncate">
                    {selectedLang === 'python' && `python3 -u ${currentConfig.extension}`}
                    {selectedLang === 'javascript' && `node ${currentConfig.extension}`}
                    {selectedLang === 'java' && `javac Main.java && java Main`}
                    {selectedLang === 'c' && `gcc -O2 main.c -o main && ./main`}
                    {selectedLang === 'cpp' && `g++ -O2 -std=c++20 main.cpp -o main && ./main`}
                  </span>
                </div>
                <span className="text-[10px] text-slate-600">STDOUT / STDERR</span>
              </div>

              {/* Standard Output (STDOUT) */}
              {stdout && (
                <div className="space-y-1">
                  <pre className="text-emerald-300 whitespace-pre-wrap leading-relaxed selection:bg-emerald-900/40">
                    {stdout}
                  </pre>
                </div>
              )}

              {/* Standard Error (STDERR) / Compilation Diagnostics */}
              {stderr && (
                <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-900/50 space-y-1">
                  <div className="flex items-center gap-1.5 text-rose-400 font-semibold text-[11px]">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Compiler Diagnostics / Error Trace:</span>
                  </div>
                  <pre className="text-rose-300 text-xs whitespace-pre-wrap leading-relaxed overflow-x-auto selection:bg-rose-900/40">
                    {stderr}
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <div className="flex-1 p-3 bg-[#04060d] text-xs font-mono overflow-y-auto min-h-[300px] max-h-[390px] space-y-2">
              {history.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                  <Clock className="w-8 h-8 mx-auto mb-2 text-slate-600" />
                  <p>No previous execution runs yet.</p>
                  <p className="text-[11px] pt-1 text-slate-600">Execute code to record runtime latency logs.</p>
                </div>
              ) : (
                history.map((item, idx) => (
                  <div 
                    key={item.id}
                    className="p-2.5 rounded-lg bg-[#070b16] border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center space-x-2.5">
                      <span className={`w-2 h-2 rounded-full ${
                        item.status === 'SUCCESS' ? 'bg-emerald-400' : 'bg-rose-400'
                      }`}></span>
                      <div>
                        <div className="font-semibold text-slate-200 uppercase">
                          {item.language} // Run #{history.length - idx}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {item.timestamp} • Exit {item.exitCode}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-cyan-400 font-bold">{item.executionTimeMs} ms</span>
                      <div className="text-[10px] text-slate-500">{item.memoryUsageMb} MB</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Specs Tab */}
          {activeTab === 'specs' && (
            <div className="flex-1 p-4 bg-[#04060d] text-xs font-mono overflow-y-auto min-h-[300px] max-h-[390px] space-y-3">
              <div className="p-3 rounded-lg bg-[#070b16] border border-slate-800 space-y-2">
                <div className="text-slate-300 font-semibold flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  <span>Configured Runtime Environments</span>
                </div>
                <div className="space-y-1.5 text-[11px] text-slate-400">
                  <div className="flex justify-between border-b border-slate-800/60 pb-1">
                    <span>Java Engine:</span>
                    <strong className="text-slate-200">OpenJDK 17 LTS (javac 17)</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-800/60 pb-1">
                    <span>C Compiler:</span>
                    <strong className="text-slate-200">GCC 12.3 (C17 Standard)</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-800/60 pb-1">
                    <span>C++ Compiler:</span>
                    <strong className="text-slate-200">G++ 12.3 (C++20 Standard)</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-800/60 pb-1">
                    <span>Python Runtime:</span>
                    <strong className="text-slate-200">CPython 3.10.12 (-u unbuffered)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>JavaScript Engine:</span>
                    <strong className="text-slate-200">Node.js v22.23 (V8 Engine)</strong>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400">
                <div className="p-2.5 rounded bg-[#070b16] border border-slate-800">
                  <div className="text-slate-500 text-[10px]">TIME LIMIT CEILING</div>
                  <div className="text-slate-200 font-bold">5,000 ms per run</div>
                </div>
                <div className="p-2.5 rounded bg-[#070b16] border border-slate-800">
                  <div className="text-slate-500 text-[10px]">MEMORY CEILING</div>
                  <div className="text-slate-200 font-bold">128 MB Sandbox</div>
                </div>
              </div>
            </div>
          )}

          {/* Quick Sandbox Specs Footer */}
          <div className="p-3 bg-[#090f1d] border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-slate-300">Sandbox:</span>
              <span className="text-cyan-400">{currentConfig.compiler}</span>
            </div>

            <span className="text-slate-500 hidden sm:inline">Isolated Container Process</span>
          </div>
        </div>
      </div>
    </section>
  );
};
