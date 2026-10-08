// Multi-tier Code Execution Runner for GOPI OS CodeLab
// Supports local backend sandbox, Judge0 CE cloud execution API (optimized for static hosts like Netlify), and in-browser JS evaluation.

export type CodeLanguage = 'c' | 'cpp' | 'java' | 'python' | 'javascript';
export type ExecutionStatus = 'SUCCESS' | 'COMPILATION_ERROR' | 'RUNTIME_ERROR' | 'TIME_LIMIT_EXCEEDED' | 'IDLE';

export interface CodeExecutionResult {
  status: ExecutionStatus;
  stdout: string;
  stderr: string;
  executionTimeMs: number;
  memoryUsageMb: number;
  exitCode: number;
  engine: 'Node Sandbox' | 'Cloud Compiler (Judge0 CE)' | 'Browser JS Engine';
}

const JUDGE0_LANGUAGE_IDS: Record<CodeLanguage, number> = {
  c: 50,         // C (GCC 9.2.0)
  cpp: 54,       // C++ (GCC 9.2.0)
  java: 62,      // Java (OpenJDK 13.0.1)
  python: 71,    // Python (3.8.1)
  javascript: 63 // JavaScript (Node.js 12.14.0)
};

// Safe UTF-8 to Base64 encoder for browser & node environments
function encodeBase64(str: string): string {
  try {
    if (typeof Buffer !== 'undefined') {
      return Buffer.from(str, 'utf-8').toString('base64');
    }
    return btoa(unescape(encodeURIComponent(str)));
  } catch {
    return btoa(str);
  }
}

// Safe Base64 to UTF-8 decoder for browser & node environments
function decodeBase64(str: string | null | undefined): string {
  if (!str) return '';
  try {
    if (typeof Buffer !== 'undefined') {
      return Buffer.from(str, 'base64').toString('utf-8');
    }
    return decodeURIComponent(escape(atob(str)));
  } catch {
    try {
      return atob(str);
    } catch {
      return str;
    }
  }
}

// In-browser JavaScript runtime evaluator (instant client-side fallback)
function executeJavaScriptLocally(code: string, stdin?: string): CodeExecutionResult {
  const startTime = performance.now();
  const logs: string[] = [];
  const errors: string[] = [];

  const originalConsoleLog = console.log;
  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;

  try {
    console.log = (...args: any[]) => {
      logs.push(args.map(a => (typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a))).join(' '));
    };
    console.error = (...args: any[]) => {
      errors.push(args.map(a => (typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a))).join(' '));
    };
    console.warn = (...args: any[]) => {
      logs.push('[WARN] ' + args.map(a => (typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a))).join(' '));
    };

    // Provide mock prompt/stdin if needed
    const stdinLines = (stdin || '').split('\n');
    let stdinIndex = 0;
    const promptFn = () => stdinLines[stdinIndex++] || '';

    // Execute within wrapped function scope
    const runner = new Function('prompt', 'input', code);
    runner(promptFn, promptFn);

    const execTime = Math.max(1, Math.round(performance.now() - startTime));
    return {
      status: 'SUCCESS',
      stdout: logs.join('\n'),
      stderr: errors.join('\n'),
      executionTimeMs: execTime,
      memoryUsageMb: 1.2,
      exitCode: 0,
      engine: 'Browser JS Engine'
    };
  } catch (err: any) {
    const execTime = Math.max(1, Math.round(performance.now() - startTime));
    return {
      status: 'RUNTIME_ERROR',
      stdout: logs.join('\n'),
      stderr: `${err?.name || 'Error'}: ${err?.message || String(err)}`,
      executionTimeMs: execTime,
      memoryUsageMb: 1.2,
      exitCode: 1,
      engine: 'Browser JS Engine'
    };
  } finally {
    console.log = originalConsoleLog;
    console.error = originalConsoleError;
    console.warn = originalConsoleWarn;
  }
}

// Judge0 CE Cloud Runner (Real-time compilation for C, C++, Java, Python, JavaScript)
async function executeWithJudge0(
  language: CodeLanguage,
  code: string,
  stdin: string
): Promise<CodeExecutionResult> {
  const languageId = JUDGE0_LANGUAGE_IDS[language];
  const startTime = performance.now();

  const payload: Record<string, any> = {
    source_code: encodeBase64(code),
    language_id: languageId
  };

  if (stdin && stdin.trim().length > 0) {
    payload.stdin = encodeBase64(stdin);
  }

  // Use base64_encoded=true to guarantee full UTF-8 and special compiler characters preservation
  const response = await fetch('https://ce.judge0.com/submissions?base64_encoded=true&wait=true', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    let errText = '';
    try {
      const errJson = await response.json();
      errText = errJson.error || errJson.message || `HTTP ${response.status}`;
    } catch {
      errText = `HTTP ${response.status} ${response.statusText}`;
    }
    throw new Error(`Cloud compiler service returned ${errText}`);
  }

  const data = await response.json();
  const execTime = data.time ? Math.round(parseFloat(data.time) * 1000) : Math.round(performance.now() - startTime);
  const memoryMb = data.memory ? parseFloat((data.memory / 1024).toFixed(2)) : 2.4;

  const rawStdout = decodeBase64(data.stdout);
  const rawStderr = decodeBase64(data.stderr);
  const compileOutput = decodeBase64(data.compile_output);
  const statusMessage = decodeBase64(data.message);

  let status: ExecutionStatus = 'SUCCESS';
  let stderr = '';
  const stdout = rawStdout;

  // Status mapping from Judge0 status codes:
  // 3: Accepted (Success)
  // 4: Wrong Answer (used in competitive testing, treat as success output)
  // 5: Time Limit Exceeded
  // 6: Compilation Error
  // 7..12: Runtime Errors (SIGSEGV, SIGXFSZ, SIGFPE, SIGABRT, NZEC, etc.)
  const statusId = data.status?.id;

  if (statusId === 3 || statusId === 4) {
    status = 'SUCCESS';
    stderr = rawStderr;
  } else if (statusId === 6) {
    status = 'COMPILATION_ERROR';
    stderr = compileOutput || rawStderr || 'Compilation failed. Check syntax and declarations.';
  } else if (statusId === 5) {
    status = 'TIME_LIMIT_EXCEEDED';
    stderr = 'Execution timed out (Time Limit Exceeded: 5.0s). Check for infinite loops or blocking operations.';
  } else if (statusId && statusId >= 7 && statusId <= 12) {
    status = 'RUNTIME_ERROR';
    stderr = rawStderr || statusMessage || data.status?.description || `Runtime Error (Exit Code ${data.exit_code || 1})`;
  } else {
    // Other errors
    status = 'RUNTIME_ERROR';
    stderr = rawStderr || compileOutput || statusMessage || data.status?.description || 'Execution failed.';
  }

  return {
    status,
    stdout,
    stderr,
    executionTimeMs: Math.max(1, execTime),
    memoryUsageMb: memoryMb,
    exitCode: status === 'SUCCESS' ? 0 : (data.exit_code || 1),
    engine: 'Cloud Compiler (Judge0 CE)'
  };
}

export async function executeCodeInLab(
  language: CodeLanguage,
  code: string,
  stdin: string
): Promise<CodeExecutionResult> {
  // Check if we are running in a static web hosting environment (such as Netlify, Vercel, or GitHub Pages)
  // On static hosts, /api routes return the index.html page or 404. Direct execution via Cloud Compiler is fastest and 100% reliable.
  const isBrowser = typeof window !== 'undefined';
  const hostname = isBrowser ? window.location.hostname : '';
  const isStaticHost = isBrowser && (
    hostname.endsWith('netlify.app') ||
    hostname.endsWith('vercel.app') ||
    hostname.endsWith('github.io') ||
    hostname.includes('pages.dev')
  );

  // If on static host, go straight to Judge0 Cloud Compiler (or Browser JS for JavaScript)
  if (!isStaticHost) {
    // Attempt local backend server if available
    try {
      const res = await fetch('/api/compiler/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          language,
          code,
          stdin
        })
      });

      const contentType = res.headers.get('content-type') || '';
      // Ensure backend actually returned JSON (not an HTML 404 / SPA redirect fallback)
      if (res.ok && contentType.includes('application/json')) {
        const data = await res.json();
        
        // If the backend failed because a compiler binary is missing (e.g. "spawn javac ENOENT" or "spawn gcc ENOENT"),
        // do not present this system environment flaw to the user. Transparently failover to Judge0 Cloud Compiler!
        const isMissingBinaryError = 
          data.stderr && (
            data.stderr.includes('ENOENT') || 
            data.stderr.includes('spawn ') || 
            data.stderr.includes('not found') ||
            data.stderr.includes('Compiler failed to launch')
          );

        if (!isMissingBinaryError) {
          return {
            status: data.status || 'SUCCESS',
            stdout: data.stdout || '',
            stderr: data.stderr || '',
            executionTimeMs: data.executionTimeMs || 10,
            memoryUsageMb: data.memoryUsageMb || 1.0,
            exitCode: data.exitCode ?? 0,
            engine: 'Node Sandbox'
          };
        }
        console.warn('[Compiler Runner] Local backend lacks required compiler binary, seamlessly routing to Cloud Compiler...');
      }
    } catch (backendErr) {
      // Backend unavailable, network offline, or SPA fallback. Fall through to Cloud execution.
    }
  }

  // Tier 2: Real-time Cloud Compiler (Judge0 CE)
  try {
    return await executeWithJudge0(language, code, stdin);
  } catch (judge0Err: any) {
    console.warn('[Compiler Runner] Judge0 cloud execution notice:', judge0Err);

    // Tier 3: Browser fallback for JavaScript
    if (language === 'javascript') {
      return executeJavaScriptLocally(code, stdin);
    }

    throw new Error(
      `Remote compiler currently unavailable (${judge0Err?.message || 'Network error'}). Please check your internet connection and try again.`
    );
  }
}

