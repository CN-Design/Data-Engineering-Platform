import React, { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import type { Category, CodingChallenge } from '../../../core/types/types';
import { Loader2, ArrowLeft, Eye, RotateCcw, Lightbulb, Terminal, Trophy, Search } from 'lucide-react';

interface Props { tech: Category; theme?: 'dark' | 'light'; }

const challengeCache: Record<string, CodingChallenge[]> = {};

export const BackendPracticeTab: React.FC<Props> = ({ tech, theme = 'dark' }) => {
  const [challenges, setChallenges] = useState<CodingChallenge[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<CodingChallenge | null>(null);
  const [code, setCode] = useState('');
  const [pane, setPane] = useState<'problem' | 'solution' | 'discussion'>('problem');
  const [hints, setHints] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [search, setSearch] = useState('');
  const [diff, setDiff] = useState('all');
  const [solved, setSolved] = useState<Record<string, boolean>>(() => {
    try { return JSON.parse(localStorage.getItem('go_solved') || '{}'); } catch { return {}; }
  });

  useEffect(() => {
    if (tech in challengeCache) { setChallenges(challengeCache[tech]); setLoading(false); return; }
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(`/content/backend/${tech}/challenges.json`);
        const data = res.ok ? ((await res.json()) as CodingChallenge[]) : [];
        challengeCache[tech] = data;
        if (!cancelled) setChallenges(data);
      } catch {
        if (!cancelled) setChallenges([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [tech]);

  const open = (c: CodingChallenge) => { setSelected(c); setCode(c.initialCode); setPane('problem'); setHints(0); setRevealed(false); };
  const markSolved = (id: string) => { const next = { ...solved, [id]: true }; setSolved(next); try { localStorage.setItem('go_solved', JSON.stringify(next)); } catch { /* ignore */ } };

  if (loading) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '60px', color: 'var(--text-secondary)' }}><Loader2 size={18} className="spin" /> Loading challenges...</div>;
  if (!challenges || challenges.length === 0) return <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>Coding challenges are coming soon.</div>;

  if (!selected) {
    const filtered = challenges.filter(c =>
      (diff === 'all' || c.difficulty === diff) &&
      (c.title.toLowerCase().includes(search.toLowerCase()) || c.question.toLowerCase().includes(search.toLowerCase()))
    );
    const totalSolved = Object.keys(solved).filter(id => challenges.some(c => c.id === id)).length;
    return (
      <div className="be-root" style={{ gap: '16px' }}>
        <div className="be-header" style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 className="be-title" style={{ fontSize: '22px' }}>Go Coding Practice</h1>
            <p className="be-summary" style={{ marginTop: '6px' }}>Editable problems with revealable, line-by-line solutions. Verify locally with <code>go test ./...</code>.</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}><Trophy size={20} color="#00ADD8" /> <strong>{totalSolved}</strong>/{challenges.length}</div>
        </div>
        <div className="be-panel" style={{ padding: '14px', display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: 1, minWidth: '200px', position: 'relative', display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-inner)', border: '1px solid var(--border-glass)', borderRadius: '8px', padding: '8px 12px' }}>
            <Search size={15} color="var(--text-muted)" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search problems..." style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-primary)', fontSize: '13px' }} />
          </div>
          <select value={diff} onChange={e => setDiff(e.target.value)} style={{ background: 'var(--bg-inner)', border: '1px solid var(--border-glass)', color: 'var(--text-primary)', padding: '9px 12px', borderRadius: '8px' }}>
            <option value="all">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {filtered.map(c => (
            <button key={c.id} className="be-sub" onClick={() => open(c)} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', cursor: 'pointer', textAlign: 'left' }}>
              <span style={{ color: solved[c.id] ? '#10b981' : 'var(--text-muted)', fontWeight: 800 }}>{solved[c.id] ? '✓' : '○'}</span>
              <span style={{ flex: 1, fontWeight: 600, color: 'var(--text-primary)' }}>{c.title}</span>
              <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'capitalize', color: c.difficulty === 'hard' ? '#ef4444' : c.difficulty === 'medium' ? '#f59e0b' : '#10b981' }}>{c.difficulty}</span>
            </button>
          ))}
          {filtered.length === 0 && <div style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>No problems match your filters.</div>}
        </div>
      </div>
    );
  }

  const c = selected;
  return (
    <div className="be-root" style={{ gap: '14px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button className="be-btn" onClick={() => setSelected(null)}><ArrowLeft size={14} /> Back</button>
        <strong style={{ color: 'var(--text-primary)' }}>{c.title}</strong>
        <span style={{ marginLeft: 'auto', fontSize: '11px', fontWeight: 700, textTransform: 'capitalize', color: c.difficulty === 'hard' ? '#ef4444' : c.difficulty === 'medium' ? '#f59e0b' : '#10b981' }}>{c.difficulty}</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '14px', alignItems: 'start' }}>
        {/* Left: problem / solution / discussion */}
        <div className="be-panel">
          <nav className="be-nav" style={{ borderRadius: 0, border: 'none', borderBottom: '1px solid var(--border-glass)' }}>
            {(['problem', 'solution', 'discussion'] as const).map(p => (
              <button key={p} className={`be-nav-btn${pane === p ? ' active' : ''}`} onClick={() => setPane(p)} style={{ textTransform: 'capitalize' }}>{p}</button>
            ))}
          </nav>
          <div className="be-panel-body">
            {pane === 'problem' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>{c.question}</p>
                <div><div className="be-output-label" style={{ color: 'var(--be-accent)' }}>Example Input</div><div className="be-code" style={{ marginTop: '4px' }}><pre>{c.exampleInput}</pre></div></div>
                <div><div className="be-output-label" style={{ color: '#10b981' }}>Example Output</div><div className="be-code" style={{ marginTop: '4px' }}><pre>{c.exampleOutput}</pre></div></div>
                <div><strong style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Constraints</strong><p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '4px 0 0' }}>{c.constraints}</p></div>
                {c.hints?.length > 0 && (
                  <div>
                    {hints < c.hints.length && <button className="be-btn" onClick={() => setHints(h => h + 1)}><Lightbulb size={13} /> Hint ({hints + 1}/{c.hints.length})</button>}
                    <ul style={{ margin: '10px 0 0', paddingLeft: '18px', color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.6 }}>{c.hints.slice(0, hints).map((h, i) => <li key={i}>{h}</li>)}</ul>
                  </div>
                )}
                {c.testCases && c.testCases.length > 0 && (
                  <div>
                    <strong style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Test Cases</strong>
                    <div style={{ marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {c.testCases.map((t, i) => <div key={i} className="be-code" style={{ margin: 0 }}><pre>{`in:  ${t.input}\nout: ${t.expected}`}</pre></div>)}
                    </div>
                  </div>
                )}
              </div>
            )}
            {pane === 'solution' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div><strong style={{ color: '#10b981', fontSize: '13px' }}>Optimized Approach</strong><p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '4px 0 0' }}>{c.optimized}</p></div>
                <div><strong style={{ color: '#f59e0b', fontSize: '13px' }}>Brute Force</strong><p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '4px 0 0' }}>{c.bruteForce}</p></div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div><strong style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Time</strong><div className="be-code" style={{ margin: '4px 0 0' }}><pre>{c.complexity.time}</pre></div></div>
                  <div><strong style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Space</strong><div className="be-code" style={{ margin: '4px 0 0' }}><pre>{c.complexity.space}</pre></div></div>
                </div>
                <div><strong style={{ fontSize: '12px', color: 'var(--be-accent)' }}>Reference Solution (commented)</strong><div className="be-code" style={{ margin: '4px 0 0' }}><pre><code>{c.solutionCode}</code></pre></div></div>
              </div>
            )}
            {pane === 'discussion' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div><strong style={{ fontSize: '13px' }}>Why Interviewers Ask This</strong><p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '4px 0 0' }}>{c.discussion.whyAsked}</p></div>
                <div><strong style={{ fontSize: '13px', color: '#ef4444' }}>Common Mistakes</strong><p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '4px 0 0' }}>{c.discussion.mistakes}</p></div>
                <div><strong style={{ fontSize: '13px', color: '#00ADD8' }}>Follow-Ups</strong><ul style={{ paddingLeft: '18px', margin: '4px 0 0', fontSize: '13px', color: 'var(--text-secondary)' }}>{c.discussion.followUps.map((f, i) => <li key={i}>{f}</li>)}</ul></div>
              </div>
            )}
          </div>
        </div>
        {/* Right: editor */}
        <div className="be-editor-wrap">
          <div className="be-editor-head">
            <span className="be-code-tag"><Terminal size={13} /> solution.go</span>
            <div className="be-code-actions">
              <button className="be-btn" onClick={() => { setCode(c.initialCode); setRevealed(false); }}><RotateCcw size={12} /> Reset</button>
              <button className="be-btn" onClick={() => { setCode(c.solutionCode); setRevealed(true); markSolved(c.id); }}><Eye size={12} /> {revealed ? 'Solution shown' : 'Reveal'}</button>
            </div>
          </div>
          <Editor height="420px" theme={theme === 'dark' ? 'vs-dark' : 'light'} language="go" value={code} onChange={v => setCode(v || '')} options={{ minimap: { enabled: false }, fontSize: 13, lineNumbers: 'on', scrollBeyondLastLine: false, tabSize: 4 }} />
          <div style={{ padding: '10px 12px', background: 'var(--bg-inner)', borderTop: '1px solid var(--border-glass)' }}>
            <span className="be-run-note"><Terminal size={12} /> Go runs locally. Write your solution, reveal to compare, then verify with <code>go test ./...</code>.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
