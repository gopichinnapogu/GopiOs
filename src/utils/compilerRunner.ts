// Multi-tier Code Execution Runner for GOPI OS CodeLab
// Supports local backend sandbox, Judge0 CE cloud execution API (for static hosts like Netlify), and in-browser JS evaluation.

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
  python: 71,    // Python (3.8.1)
  c: 50,         // C (GCC 9.2.0)
  cpp: 54,       // C++ (GCC 9.2.0)
  java: 62,      // Java (OpenJDK 13.0.1)
  javascript: 63 // JavaScript (Node.js 12.14.0)
};

// In-browser JavaScript runtime evaluator (fallback)
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

// Judge0 CE Cloud Runner (Tier 2)
async function executeWithJudge0(
  language: CodeLanguage,
  code: string,
  stdin: string
): Promise<CodeExecutionResult> {
  const languageId = JUDGE0_LANGUAGE_IDS[language];
  const startTime = performance.now();

  const response = await fetch('https://ce.judge0.com/submissions?base64_encoded=false&wait=true', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      source_code: code,
      language_id: languageId,
      stdin: stdin || undefined
    })
  });

  if (!response.ok) {
    throw new Error(`Cloud compiler service returned status ${response.status}`);
  }

  const data = await response.json();
  const execTime = data.time ? Math.round(parseFloat(data.time) * 1000) : Math.round(performance.now() - startTime);
  const memoryMb = data.memory ? parseFloat((data.memory / 1024).toFixed(2)) : 1.5;

  let status: ExecutionStatus = 'SUCCESS';
  let stderr = (data.stderr || data.compile_output || '').trim();
  let stdout = (data.stdout || '').trim();

  // Status mapping from Judge0 status codes
  // 3: Accepted, 4: Wrong Answer, 5: Time Limit Exceeded, 6: Compilation Error, 7-12: Runtime Errors
  const statusId = data.status?.id;
  if (statusId === 3) {
    status = 'SUCCESS';
  } else if (statusId === 6) {
    status = 'COMPILATION_ERROR';
    if (!stderr && data.compile_output) {
      stderr = data.compile_output;
    }
  } else if (statusId === 5) {
    status = 'TIME_LIMIT_EXCEEDED';
    stderr = stderr || 'Execution timed out (5.0s limit exceeded).';
  } else {
    status = 'RUNTIME_ERROR';
    stderr = stderr || data.status?.description || 'Runtime error encountered.';
  }

  return {
    status,
    stdout,
    stderr,
    executionTimeMs: execTime,
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
  // Tier 1: Try local backend server if available
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

    if (res.ok) {
      const data = await res.json();
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
  } catch (backendErr) {
    // Backend unavailable or 404, fall through to Tier 2
  }

  // Tier 2: Cloud Compiler Execution (Judge0 CE)
  try {
    return await executeWithJudge0(language, code, stdin);
  } catch (judge0Err: any) {
    console.warn('[Compiler Runner] Judge0 API failed, attempting tier-3 fallback:', judge0Err);

    // Tier 3: Browser fallback for JavaScript
    if (language === 'javascript') {
      return executeJavaScriptLocally(code, stdin);
    }

    throw new Error(
      `Execution failed: ${judge0Err?.message || 'Remote compiler unavailable'}. Please verify network connection.`
    );
  }
}
