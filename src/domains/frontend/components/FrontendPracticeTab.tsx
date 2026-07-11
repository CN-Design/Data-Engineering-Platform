import React, { useEffect, useMemo, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import type { Category, CodingChallenge } from '../../../core/types/types';
import { LiveSandbox } from '../../../core/components/LiveSandbox';
import { FRONTEND_VALIDATIONS } from '../validations';
import { ArrowLeft, Check, X, Lightbulb } from 'lucide-react';
import { LoadingBlock } from '../../../core/components/LoadingBlock';
import { ErrorState } from '../../../core/components/ErrorState';
import { celebrate } from '../../../core/lib/celebrate';

interface FrontendPracticeTabProps {
  tech: Category;
  theme: 'light' | 'dark';
}

const DIFF_COLOR: Record<string, string> = { easy: '#10b981', medium: '#f59e0b', hard: '#ef4444', beginner: '#10b981', intermediate: '#f59e0b', advanced: '#ef4444' };

export const FrontendPracticeTab: React.FC<FrontendPracticeTabProps> = ({ tech, theme }) => {
  const [challenges, setChallenges] = useState<CodingChallenge[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const celebratedRef = useRef<Set<string>>(new Set());
  const [selected, setSelected] = useState<CodingChallenge | null>(null);
  const [code, setCode] = useState('');
  const [files, setFiles] = useState<Record<string, string> | null>(null);
  const [activeFile, setActiveFile] = useState('');
  const [runSignal, setRunSignal] = useState(0);
  const [withTests, setWithTests] = useState(false);
  const [result, setResult] = useState<{ passed: boolean; message: string } | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [revealedHints, setRevealedHints] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true); setError(false);
      try {
        const res = await fetch(`/content/frontend/${tech}/practice.json`);
        const data = res.ok ? ((await res.json()) as CodingChallenge[]) : [];
        if (!cancelled) setChallenges(Array.isArray(data) ? data : []);
      } catch {
        if (!cancelled) { setChallenges([]); setError(true); } // network failure — recoverable
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [tech, reloadKey]);

  const open = (c: CodingChallenge) => {
    setSelected(c);
    if (c.files && Object.keys(c.files).length) {
      setFiles({ ...c.files });
      const keys = Object.keys(c.files);
      setActiveFile(keys.includes('styles.css') ? 'styles.css' : keys[0]);
      setCode('');
    } else {
      setFiles(null);
      setCode(c.initialCode || '');
    }
    setResult(null);
    setShowSolution(false);
    setRevealedHints(0);
    setWithTests(false);
  };

  const mode = selected?.previewMode || (selected?.type === 'react' ? 'react' : 'web');
  const language = mode === 'react' ? 'javascript' : selected?.type === 'css' ? 'css' : selected?.type === 'html' ? 'html' : selected?.type === 'typescript' ? 'typescript' : 'javascript';
  const testCode = selected?.validationId ? FRONTEND_VALIDATIONS[selected.validationId] : undefined;

  const sandboxCode = useMemo(() => code, [code]);

  if (loading) {
    return <LoadingBlock label="Loading challenges…" />;
  }

  if (error) {
    return <ErrorState onRetry={() => setReloadKey(k => k + 1)} />;
  }

  if (!selected) {
    if (challenges.length === 0) {
      return <div style={{ textAlign: 'center', padding: '50px', color: 'var(--text-secondary)' }}>Practice challenges for this technology are coming soon.</div>;
    }
    return (
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '4px' }}>
          {challenges.map(c => (
            <div key={c.id} onClick={() => open(c)} className="glass-panel" style={{ padding: '14px 16px', borderRadius: '10px', border: '1px solid var(--border-glass)', background: 'var(--bg-secondary)', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{c.title}</div>
                <div style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>{c.type}</div>
              </div>
              <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#fff', background: DIFF_COLOR[c.difficulty] || '#3b82f6', padding: '3px 9px', borderRadius: '6px' }}>{c.difficulty}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      <button onClick={() => setSelected(null)} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '8px', border: '1px solid var(--border-glass)', background: 'var(--bg-inner)', color: 'var(--text-primary)', cursor: 'pointer', marginBottom: '14px' }}>
        <ArrowLeft size={16} /> Back to challenges
      </button>

      <h2 style={{ fontSize: '19px', fontWeight: 700, margin: '0 0 6px 0' }}>{selected.title}</h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{selected.question}</p>
      {selected.constraints && <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>{selected.constraints}</p>}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '12px', alignItems: 'start' }} className="playground-grid">
        <div style={{ border: '1px solid var(--border-glass)', borderRadius: '10px', overflow: 'hidden' }}>
          {files && (
            <div style={{ display: 'flex', borderBottom: '1px solid var(--border-glass)', background: 'var(--bg-inner)' }}>
              {Object.keys(files).map(f => (
                <button key={f} onClick={() => setActiveFile(f)} style={{ padding: '6px 12px', border: 'none', cursor: 'pointer', fontSize: '12px', fontFamily: 'ui-monospace, monospace', fontWeight: activeFile === f ? 700 : 500, background: activeFile === f ? 'var(--bg-secondary)' : 'transparent', color: activeFile === f ? 'var(--text-primary)' : 'var(--text-muted)' }}>{f}</button>
              ))}
            </div>
          )}
          <Editor
            height="360px"
            theme={theme === 'dark' ? 'vs-dark' : 'light'}
            language={files ? (activeFile.endsWith('.css') ? 'css' : activeFile.endsWith('.html') ? 'html' : 'javascript') : language}
            value={files ? (files[activeFile] ?? '') : code}
            onChange={(v) => { if (files) setFiles(prev => ({ ...(prev as Record<string, string>), [activeFile]: v ?? '' })); else setCode(v ?? ''); }}
            options={{ minimap: { enabled: false }, fontSize: 13, scrollBeyondLastLine: false }}
          />
        </div>
        <div>
          <LiveSandbox
            mode={mode as 'web' | 'react'}
            code={files ? undefined : sandboxCode}
            files={files ?? undefined}
            language={mode === 'react' ? 'jsx' : (selected.type === 'typescript' ? 'typescript' : selected.type === 'css' ? 'css' : selected.type === 'html' ? 'html' : undefined)}
            testCode={withTests ? testCode : undefined}
            onResult={(r) => { setResult(r); if (r.passed && selected && !celebratedRef.current.has(selected.id)) { celebratedRef.current.add(selected.id); celebrate({ title: 'Challenge solved!', subtitle: selected.title, kind: 'challenge', xp: 15 }); } }}
            runSignal={runSignal}
            height={300}
          />
          <div style={{ display: 'flex', gap: '8px', marginTop: '10px', flexWrap: 'wrap' }}>
            <button onClick={() => { setWithTests(false); setResult(null); setRunSignal(s => s + 1); }} style={btn('#10b981')}>Run</button>
            {testCode && (
              <button onClick={() => { setWithTests(true); setResult(null); setRunSignal(s => s + 1); }} style={btn('#3b82f6')}>
                <Check size={14} /> Run Tests
              </button>
            )}
            {selected.hints?.length > 0 && revealedHints < selected.hints.length && (
              <button onClick={() => setRevealedHints(n => n + 1)} style={btn('#f59e0b')}><Lightbulb size={14} /> Hint</button>
            )}
            <button onClick={() => setShowSolution(s => !s)} style={btn('var(--text-muted)')}>{showSolution ? 'Hide' : 'Solution'}</button>
          </div>

          {result && (
            <div style={{ marginTop: '10px', padding: '10px 12px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', background: result.passed ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.1)', color: result.passed ? '#10b981' : '#ef4444', fontSize: '13.5px', fontWeight: 600 }}>
              {result.passed ? <Check size={16} /> : <X size={16} />} {result.message}
            </div>
          )}

          {revealedHints > 0 && (
            <ul style={{ margin: '10px 0 0 0', paddingLeft: '18px', color: 'var(--text-secondary)', fontSize: '13.5px', lineHeight: 1.6 }}>
              {selected.hints.slice(0, revealedHints).map((h, i) => <li key={i}>{h}</li>)}
            </ul>
          )}
          {showSolution && (
            <pre style={{ marginTop: '10px', padding: '12px', borderRadius: '8px', background: 'var(--bg-code, #0d1117)', overflowX: 'auto', fontSize: '12.5px', color: 'var(--text-code, #e2e8f0)', fontFamily: 'ui-monospace, monospace' }}><code>{selected.solutionCode}</code></pre>
          )}
        </div>
      </div>
    </div>
  );
};

const btn = (color: string): React.CSSProperties => ({ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '7px 14px', borderRadius: '8px', border: '1px solid var(--border-glass)', background: 'var(--bg-inner)', color, fontWeight: 600, fontSize: '13px', cursor: 'pointer' });
