import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Terminal, Eye, RotateCcw, Play, Copy, Check, Loader2 } from 'lucide-react';
import type { AgentCode } from '../../../core/types/aiagents';
import { runPythonChallenge, OFFLINE_UNSUPPORTED, type PyRunResult } from '../../../core/lib/pythonRunner';

// Re-exported for existing importers; source of truth is pythonRunner.
export { OFFLINE_UNSUPPORTED };
const NETWORK_IMPORT = OFFLINE_UNSUPPORTED;

// A Python (or shell/json) code block. Agent code needs an API key + network,
// so this is a display + (optional) edit surface with Reveal + copy; you run
// it locally with your own key. Monaco language follows the block.
export const PyCodeBlock: React.FC<{ block: AgentCode; theme?: 'dark' | 'light'; title?: string; testCases?: Array<{ input: string; expected: string }>; onSolved?: () => void }> = ({ block, theme = 'dark', title, testCases, onSolved }) => {
  const editable = !!block.editable;
  const [code, setCode] = useState(block.code);
  const [revealed, setRevealed] = useState(false);
  const [showOut, setShowOut] = useState(false);
  const [copied, setCopied] = useState(false);
  const [running, setRunning] = useState(false);
  const [runResult, setRunResult] = useState<PyRunResult | null>(null);
  const monacoLang = block.language === 'python' ? 'python' : block.language === 'json' ? 'json' : block.language === 'bash' ? 'shell' : 'plaintext';
  const tag = title || (block.language === 'python' ? 'python' : block.language === 'bash' ? 'shell' : block.language);
  const canRun = block.language === 'python' && !NETWORK_IMPORT.test(code);

  const copy = async () => { try { await navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch { /* ignore */ } };
  const run = async () => {
    setRunning(true); setRunResult(null);
    try {
      const r = await runPythonChallenge(code, testCases || []);
      setRunResult(r);
      if (r.allPassed && onSolved) onSolved();
    } catch (e) {
      setRunResult({ ok: false, stdout: '', stderr: '', error: e instanceof Error ? e.message : 'Python runtime unavailable.', tests: [], allPassed: false });
    } finally { setRunning(false); }
  };

  if (!editable) {
    return (
      <div>
        <div className="be-code">
          <div className="be-code-bar">
            <span className="be-code-tag"><Terminal size={13} /> {tag}</span>
            <div style={{ display: 'flex', gap: 6 }}>
              {block.expectedOutput && <button className="be-btn" onClick={() => setShowOut(s => !s)}><Play size={12} /> {showOut ? 'Hide output' : 'Output'}</button>}
              <button className="be-btn" onClick={copy}>{copied ? <Check size={12} /> : <Copy size={12} />} {copied ? 'Copied' : 'Copy'}</button>
            </div>
          </div>
          <pre><code>{block.code}</code></pre>
        </div>
        {block.caption && <p className="be-code-cap">{block.caption}</p>}
        {block.expectedOutput && showOut && (
          <div className="be-output"><div className="be-output-label">Output (illustrative)</div><pre>{block.expectedOutput}</pre></div>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="be-editor-wrap">
        <div className="be-editor-head">
          <span className="be-code-tag"><Terminal size={13} /> {title || 'Python — edit me'}</span>
          <div className="be-code-actions">
            {canRun && (
              <button className="be-btn" onClick={run} disabled={running} style={{ background: 'linear-gradient(135deg,#8b5cf6,#6366f1)', color: '#fff', border: 'none', fontWeight: 700, opacity: running ? 0.6 : 1 }}>
                {running ? <><Loader2 size={12} className="spin" /> Running…</> : <><Play size={12} /> Run</>}
              </button>
            )}
            <button className="be-btn" onClick={copy}>{copied ? <Check size={12} /> : <Copy size={12} />} {copied ? 'Copied' : 'Copy'}</button>
            <button className="be-btn" onClick={() => { setCode(block.code); setRevealed(false); setRunResult(null); }}><RotateCcw size={12} /> Reset</button>
            {block.solution && (
              <button className="be-btn" onClick={() => { setCode(block.solution as string); setRevealed(true); }}><Eye size={12} /> {revealed ? 'Solution shown' : 'Reveal solution'}</button>
            )}
          </div>
        </div>
        <Editor
          height="280px"
          theme={theme === 'dark' ? 'vs-dark' : 'light'}
          language={monacoLang}
          value={code}
          onChange={(v) => setCode(v || '')}
          options={{ minimap: { enabled: false }, fontSize: 13, lineNumbers: 'on', scrollBeyondLastLine: false, tabSize: 4 }}
        />
      </div>
      <p className="be-run-note"><Terminal size={12} /> {canRun
        ? <>Pure-Python — <strong>Run</strong> executes it in-browser. Anything needing an API key or network you'll run locally with your provider key set.</>
        : <>Agents need an API key &amp; network — copy this and run it locally (e.g. <code>python main.py</code>) with your provider key set.</>}</p>
      {runResult && (
        <div className="be-output" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {runResult.error ? (
            <><div className="be-output-label" style={{ color: '#ef4444' }}>Error</div><pre style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{runResult.error}</pre></>
          ) : runResult.tests.length > 0 ? (
            <>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontWeight: 800, fontSize: 13, color: runResult.allPassed ? '#10b981' : '#ef4444' }}>
                {runResult.allPassed ? <Check size={16} /> : <RotateCcw size={16} />}
                {runResult.tests.filter((t) => t.passed).length}/{runResult.tests.length} tests passed{runResult.allPassed ? ' — solved!' : ''}
              </div>
              {runResult.tests.map((t) => (
                <pre key={t.index} style={{ whiteSpace: 'pre-wrap', margin: 0, borderLeft: `3px solid ${t.passed ? '#10b981' : '#ef4444'}`, paddingLeft: 8 }}>
                  {`${t.passed ? '✓' : '✗'} ${t.input}${t.passed ? '' : `\n   expected: ${t.expected}\n   got:      ${t.actual}`}`}
                </pre>
              ))}
              {runResult.stdout.trim() && <><div className="be-output-label">stdout</div><pre style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{runResult.stdout}</pre></>}
            </>
          ) : (
            <>
              <div className="be-output-label">{runResult.stdout.trim() ? 'Output' : 'Ran successfully (no output)'}</div>
              {runResult.stdout.trim() && <pre style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{runResult.stdout}</pre>}
              {runResult.stderr.trim() && <pre style={{ whiteSpace: 'pre-wrap', margin: 0, color: '#f59e0b' }}>{runResult.stderr}</pre>}
            </>
          )}
        </div>
      )}
      {block.expectedOutput && (
        <div className="be-output"><div className="be-output-label">Expected output (illustrative)</div><pre>{block.expectedOutput}</pre></div>
      )}
    </div>
  );
};
