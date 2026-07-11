// Shared in-browser Python runner (Pyodide).
// Reused across domains so any Python challenge can execute + auto-grade
// entirely client-side — no server, no API keys. Pyodide is loaded once
// from the <script> tag in index.html and cached as a singleton promise.

declare global {
  interface Window {
    // Matches the ambient declaration in PracticeTab.tsx (script-injected global).
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    loadPyodide: any;
  }
}

interface PyodideInstance {
  runPython: (code: string) => unknown;
}

export interface PyTestCase {
  input: string; // a Python expression, e.g. estimate_tokens("hi")
  expected: string; // the expected str() form, e.g. "1"
}

export interface PyTestResult {
  index: number;
  input: string;
  expected: string;
  actual: string;
  passed: boolean;
}

export interface PyRunResult {
  ok: boolean; // true if user code executed without a top-level exception
  stdout: string;
  stderr: string;
  error?: string; // top-level execution error message, if any
  tests: PyTestResult[];
  allPassed: boolean; // true only when there are tests and every one passed
}

// Libraries that need network/keys or aren't in Pyodide's stdlib — code using
// them can't run in-browser, so callers should fall back to "run locally".
export const OFFLINE_UNSUPPORTED = /\b(?:import|from)\s+(?:openai|anthropic|requests|httpx|urllib|aiohttp|socket|langchain|langgraph|llama_index|pydantic|pyspark|delta|pandas|numpy|scipy|sklearn|matplotlib|torch|tensorflow|boto3|confluent_kafka|kafka|great_expectations|pendulum|airflow|dagster|prefect)/;

let pyodidePromise: Promise<PyodideInstance> | null = null;

// Lazily load Pyodide exactly once. Subsequent callers share the same instance.
export function getPyodide(): Promise<PyodideInstance> {
  if (pyodidePromise) return pyodidePromise;
  pyodidePromise = (async () => {
    // The <script src="…/pyodide.js"> may still be loading on first paint;
    // give it a brief window to attach window.loadPyodide before giving up.
    for (let i = 0; i < 40 && !window.loadPyodide; i++) {
      await new Promise((r) => setTimeout(r, 100));
    }
    if (!window.loadPyodide) {
      throw new Error('Python runtime failed to load (Pyodide unavailable).');
    }
    return window.loadPyodide() as Promise<PyodideInstance>;
  })();
  // Don't cache a rejected promise — allow a later retry to reload.
  pyodidePromise.catch(() => { pyodidePromise = null; });
  return pyodidePromise;
}

function safeGet(py: PyodideInstance, expr: string): string {
  try {
    const v = py.runPython(expr);
    return v == null ? '' : String(v);
  } catch {
    return '';
  }
}

// Run user Python code, then grade each test case by evaluating its input
// expression and comparing the str() representation to `expected`.
export async function runPythonChallenge(
  code: string,
  testCases: PyTestCase[] = [],
): Promise<PyRunResult> {
  const py = await getPyodide();

  // Fresh stdout/stderr buffers for this run, plus a case evaluator that
  // supports multi-statement inputs like "s = C(); s.push('a'); s.text()"
  // (exec every statement, str() the final expression).
  py.runPython(
    'import sys, io, ast\n' +
    'sys.stdout = io.StringIO()\n' +
    'sys.stderr = io.StringIO()\n' +
    'def __run_case(__src):\n' +
    '    __tree = ast.parse(__src.strip(), mode="exec")\n' +
    '    if __tree.body and isinstance(__tree.body[-1], ast.Expr):\n' +
    '        __last = ast.Expression(__tree.body.pop().value)\n' +
    '        exec(compile(__tree, "<case>", "exec"), globals())\n' +
    '        return str(eval(compile(__last, "<case>", "eval"), globals()))\n' +
    '    exec(compile(__tree, "<case>", "exec"), globals())\n' +
    '    return ""\n',
  );

  const tests: PyTestResult[] = [];

  try {
    py.runPython(code);
  } catch (e) {
    return {
      ok: false,
      stdout: safeGet(py, 'sys.stdout.getvalue()'),
      stderr: safeGet(py, 'sys.stderr.getvalue()'),
      error: e instanceof Error ? e.message : String(e),
      tests,
      allPassed: false,
    };
  }

  for (let i = 0; i < testCases.length; i++) {
    const tc = testCases[i];
    // Pass the input as a JSON string literal (valid Python source) so
    // quotes/newlines survive, then evaluate it via __run_case.
    const lit = JSON.stringify(tc.input);
    py.runPython(
      `try:\n    __result = __run_case(${lit})\nexcept Exception as __e:\n    __result = "Error: " + str(__e)`,
    );
    const actual = safeGet(py, '__result');
    const expected = String(tc.expected);
    tests.push({ index: i, input: tc.input, expected, actual, passed: actual === expected });
  }

  return {
    ok: true,
    stdout: safeGet(py, 'sys.stdout.getvalue()'),
    stderr: safeGet(py, 'sys.stderr.getvalue()'),
    tests,
    allPassed: testCases.length > 0 && tests.every((t) => t.passed),
  };
}
