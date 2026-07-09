import React, { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import type { CodingChallenge } from '../../../core/types/types';
import { Loader2, ArrowLeft, Eye, RotateCcw, Lightbulb, Terminal, Trophy, Search, Copy, Check } from 'lucide-react';
import '../../backend-engineering/backend.css';
import './aiagents.css';

interface Props { theme?: 'dark' | 'light'; }
let cache: CodingChallenge[] | null = null;

export const AiAgentPracticeTab: React.FC<Props> = ({ theme = 'dark' }) => {
  const [challenges, setChallenges] = useState<CodingChallenge[] | null>(cache);
  const [loading, setLoading] = useState(!cache);
  const [selected, setSelected] = useState<CodingChallenge | null>(null);
  const [code, setCode] = useState('');
  const [pane, setPane] = useState<'problem' | 'solution' | 'discussion'>('problem');
  const [hints, setHints] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [search, setSearch] = useState('');
  const [diff, setDiff] = useState('all');
  const [solved, setSolved] = useState<Record<string, boolean>>(() => { try { return JSON.parse(localStorage.getItem('ai_solved') || '{}'); } catch { return {}; } });

  useEffect(() => {
    if (cache) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      try { const res = await fetch('/content/ai-agents/challenges.json'); const data = res.ok ? (await res.json()) as CodingChallenge[] : []; cache = data; if (!cancelled) setChallenges(data); }
      catch { if (!cancelled) setChallenges([]); }
      finally { if (!cancelled) setLoading(false); }
    })();
    return () => { cancelled = true; };
  }, []);

  const open = (c: CodingChallenge) => { setSelected(c); setCode(c.initialCode); setPane('problem'); setHints(0); setRevealed(false); setCopied(false); };
  const markSolved = (id: string) => { const n = { ...solved, [id]: true }; setSolved(n); try { localStorage.setItem('ai_solved', JSON.stringify(n)); } catch { /* ignore */ } };
  const copy = async () => { try { await navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch { /* ignore */ } };

  if (loading) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: 60, color: 'var(--text-secondary)' }}><Loader2 size={18} className="spin" /> Loading challenges...</div>;
  if (!challenges || challenges.length === 0) return <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-secondary)' }}>Coding challenges are coming soon.</div>;

  if (!selected) {
    const filtered = challenges.filter(c => (diff === 'all' || c.difficulty === diff) && (c.title.toLowerCase().includes(search.toLowerCase()) || c.question.toLowerCase().includes(search.toLowerCase())));
    const totalSolved = Object.keys(solved).filter(id => challenges.some(c => c.id === id)).length;
    return (
      <div className="be-root ai-root" style={{ gap: 16 }}>
        <div className="be-header" style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <div><h1 className="be-title" style={{ fontSize: 22 }}>AI Agent Coding Practice</h1><p className="be-summary" style={{ marginTop: 6 }}>Pure-Python challenges behind agent mechanics — editable, with revealable solutions. Run locally with <code>python</code>.</p></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-secondary)' }}><Trophy size={20} color="#8b5cf6" /> <strong>{totalSolved}</strong>/{challenges.length}</div>
        </div>
        <div className="be-panel" style={{ padding: 14, display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: 1, minWidth: 200, display: 'flex', alignItems: 'center', gap: 8, background: 'var(--bg-inner)', border: '1px solid var(--border-glass)', borderRadius: 8, padding: '8px 12px' }}>
            <Search size={15} color="var(--text-muted)" /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search problems..." style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-primary)', fontSize: 13 }} />
          </div>
          <select value={diff} onChange={e => setDiff(e.target.value)} style={{ background: 'var(--bg-inner)', border: '1px solid var(--border-glass)', color: 'var(--text-primary)', padding: '9px 12px', borderRadius: 8 }}>
            <option value="all">All Difficulties</option><option value="easy">Easy</option><option value="medium">Medium</option><option value="hard">Hard</option>
          </select>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {filtered.map(c => (
            <button key={c.id} className="be-sub" onClick={() => open(c)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', cursor: 'pointer', textAlign: 'left' }}>
              <span style={{ color: solved[c.id] ? '#10b981' : 'var(--text-muted)', fontWeight: 800 }}>{solved[c.id] ? '✓' : '○'}</span>
              <span style={{ flex: 1, fontWeight: 600, color: 'var(--text-primary)' }}>{c.title}</span>
              <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'capitalize', color: c.difficulty === 'hard' ? '#ef4444' : c.difficulty === 'medium' ? '#f59e0b' : '#10b981' }}>{c.difficulty}</span>
            </button>
          ))}
          {filtered.length === 0 && <div style={{ textAlign: 'center', padding: 30, color: 'var(--text-muted)' }}>No problems match your filters.</div>}
        </div>
      </div>
    );
  }

  const c = selected;
  return (
    <div className="be-root ai-root" style={{ gap: 14 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button className="be-btn" onClick={() => setSelected(null)}><ArrowLeft size={14} /> Back</button>
        <strong style={{ color: 'var(--text-primary)' }}>{c.title}</strong>
        <span style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, textTransform: 'capitalize', color: c.difficulty === 'hard' ? '#ef4444' : c.difficulty === 'medium' ? '#f59e0b' : '#10b981' }}>{c.difficulty}</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 14, alignItems: 'start' }}>
        <div className="be-panel">
          <nav className="be-nav" style={{ borderRadius: 0, border: 'none', borderBottom: '1px solid var(--border-glass)' }}>
            {(['problem', 'solution', 'discussion'] as const).map(p => <button key={p} className={`be-nav-btn${pane === p ? ' active' : ''}`} onClick={() => setPane(p)} style={{ textTransform: 'capitalize' }}>{p}</button>)}
          </nav>
          <div className="be-panel-body">
            {pane === 'problem' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>{c.question}</p>
                {c.exampleInput && <div><div className="be-output-label" style={{ color: 'var(--be-accent)' }}>Example Input</div><div className="be-code" style={{ marginTop: 4 }}><pre>{c.exampleInput}</pre></div></div>}
                {c.exampleOutput && <div><div className="be-output-label" style={{ color: '#10b981' }}>Example Output</div><div className="be-code" style={{ marginTop: 4 }}><pre>{c.exampleOutput}</pre></div></div>}
                {c.constraints && <div><strong style={{ fontSize: 12, color: 'var(--text-muted)' }}>Constraints</strong><p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: '4px 0 0' }}>{c.constraints}</p></div>}
                {c.hints?.length > 0 && (<div>{hints < c.hints.length && <button className="be-btn" onClick={() => setHints(h => h + 1)}><Lightbulb size={13} /> Hint ({hints + 1}/{c.hints.length})</button>}<ul style={{ margin: '10px 0 0', paddingLeft: 18, color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.6 }}>{c.hints.slice(0, hints).map((h, i) => <li key={i}>{h}</li>)}</ul></div>)}
                {c.testCases && c.testCases.length > 0 && (<div><strong style={{ fontSize: 12, color: 'var(--text-muted)' }}>Test Cases</strong><div style={{ marginTop: 4, display: 'flex', flexDirection: 'column', gap: 6 }}>{c.testCases.map((t, i) => <div key={i} className="be-code" style={{ margin: 0 }}><pre>{`in:  ${t.input}\nout: ${t.expected}`}</pre></div>)}</div></div>)}
              </div>
            )}
            {pane === 'solution' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {c.optimized && <div><strong style={{ color: '#10b981', fontSize: 13 }}>Optimized Approach</strong><p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: '4px 0 0' }}>{c.optimized}</p></div>}
                {c.bruteForce && <div><strong style={{ color: '#f59e0b', fontSize: 13 }}>Brute Force</strong><p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: '4px 0 0' }}>{c.bruteForce}</p></div>}
                {c.complexity && <div style={{ display: 'flex', gap: 12 }}><div><strong style={{ fontSize: 12, color: 'var(--text-muted)' }}>Time</strong><div className="be-code" style={{ margin: '4px 0 0' }}><pre>{c.complexity.time}</pre></div></div><div><strong style={{ fontSize: 12, color: 'var(--text-muted)' }}>Space</strong><div className="be-code" style={{ margin: '4px 0 0' }}><pre>{c.complexity.space}</pre></div></div></div>}
                <div><strong style={{ fontSize: 12, color: 'var(--be-accent)' }}>Reference Solution</strong><div className="be-code" style={{ margin: '4px 0 0' }}><pre><code>{c.solutionCode}</code></pre></div></div>
              </div>
            )}
            {pane === 'discussion' && (c.discussion ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {c.discussion.whyAsked && <div><strong style={{ fontSize: 13 }}>Why This Matters</strong><p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: '4px 0 0' }}>{c.discussion.whyAsked}</p></div>}
                {c.discussion.mistakes && <div><strong style={{ fontSize: 13, color: '#ef4444' }}>Common Mistakes</strong><p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: '4px 0 0' }}>{c.discussion.mistakes}</p></div>}
                {c.discussion.followUps?.length > 0 && <div><strong style={{ fontSize: 13, color: '#8b5cf6' }}>Follow-Ups</strong><ul style={{ paddingLeft: 18, margin: '4px 0 0', fontSize: 13, color: 'var(--text-secondary)' }}>{c.discussion.followUps.map((f, i) => <li key={i}>{f}</li>)}</ul></div>}
              </div>
            ) : <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0 }}>Discussion notes coming soon.</p>)}
          </div>
        </div>
        <div className="be-editor-wrap">
          <div className="be-editor-head">
            <span className="be-code-tag"><Terminal size={13} /> solution.py</span>
            <div className="be-code-actions">
              <button className="be-btn" onClick={copy}>{copied ? <Check size={12} /> : <Copy size={12} />} {copied ? 'Copied' : 'Copy'}</button>
              <button className="be-btn" onClick={() => { setCode(c.initialCode); setRevealed(false); }}><RotateCcw size={12} /> Reset</button>
              <button className="be-btn" onClick={() => { setCode(c.solutionCode); setRevealed(true); markSolved(c.id); }}><Eye size={12} /> {revealed ? 'Solution shown' : 'Reveal'}</button>
            </div>
          </div>
          <Editor height="420px" theme={theme === 'dark' ? 'vs-dark' : 'light'} language="python" value={code} onChange={v => setCode(v || '')} options={{ minimap: { enabled: false }, fontSize: 13, lineNumbers: 'on', scrollBeyondLastLine: false, tabSize: 4 }} />
          <div style={{ padding: '10px 12px', background: 'var(--bg-inner)', borderTop: '1px solid var(--border-glass)' }}>
            <span className="be-run-note"><Terminal size={12} /> These are pure-Python (stdlib) — write your solution, reveal to compare, then run locally with <code>python solution.py</code>.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
