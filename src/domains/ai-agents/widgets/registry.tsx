import React, { useEffect, useRef, useState } from 'react';

// ============================================================
// AI-Agents interactive widget registry.
// Every widget is driven by CANNED/MOCK data from the topic JSON `config`,
// so the agent mechanics animate and respond fully client-side — no API
// keys, no backend, works offline. Theme-aware; honors reduced-motion.
// ============================================================

export interface AgentWidgetProps { config?: Record<string, unknown>; }

const ACC = 'var(--ai-accent, #8b5cf6)';
const card: React.CSSProperties = { border: '1px solid var(--border-glass)', borderRadius: 12, padding: 16, background: 'var(--bg-inner)' };
const btn: React.CSSProperties = { display: 'inline-flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontFamily: 'inherit', padding: '7px 14px', borderRadius: 8, border: '1px solid var(--border-glass)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontWeight: 600, fontSize: 13 };
const primaryBtn: React.CSSProperties = { ...btn, background: ACC, color: '#fff', border: '1px solid transparent' };
const label: React.CSSProperties = { fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.5, color: 'var(--text-muted)' };

// ---------- Agent Loop Simulator ----------
interface LoopStep { thought: string; tool: string; args: string; observation: string; }
const AgentLoopSimulator: React.FC<AgentWidgetProps> = ({ config }) => {
  const goal = (config?.goal as string) || 'Answer the user’s question using tools.';
  const steps = (config?.steps as LoopStep[]) || [];
  const final = (config?.final as string) || 'Done.';
  const [shown, setShown] = useState(0); // number of revealed steps
  const [auto, setAuto] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const doneAll = shown >= steps.length;

  useEffect(() => {
    if (!auto) return;
    if (doneAll) { setAuto(false); return; }
    timer.current = setTimeout(() => setShown(s => Math.min(steps.length, s + 1)), 1100);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [auto, shown, doneAll, steps.length]);

  return (
    <div style={card}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={label}>Agent loop</span>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>reason → act → observe</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={btn} onClick={() => { setAuto(false); setShown(s => Math.min(steps.length, s + 1)); }} disabled={doneAll}>Step ▸</button>
          <button style={primaryBtn} onClick={() => setAuto(a => !a)} disabled={doneAll}>{auto ? 'Pause' : 'Auto-play'}</button>
          <button style={btn} onClick={() => { setAuto(false); setShown(0); }}>Reset ↺</button>
        </div>
      </div>

      <div style={{ padding: '10px 12px', borderRadius: 8, background: 'var(--bg-secondary)', border: `1px solid ${ACC}`, marginBottom: 12 }}>
        <span style={label}>Goal</span>
        <div style={{ fontSize: 13.5, color: 'var(--text-primary)', marginTop: 2 }}>{goal}</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {steps.slice(0, shown).map((s, i) => (
          <div key={i} style={{ animation: 'ai-rise .35s ease both', border: '1px solid var(--border-glass)', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: 'var(--bg-secondary)' }}>
              <span style={{ width: 22, height: 22, borderRadius: 999, background: ACC, color: '#fff', fontSize: 12, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</span>
              <span style={{ fontSize: 12.5, color: 'var(--text-secondary)' }}>💭 {s.thought}</span>
            </div>
            <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 12.5, color: ACC }}>▸ call {s.tool}({s.args})</div>
              <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 12.5, color: '#10b981' }}>← {s.observation}</div>
            </div>
          </div>
        ))}
        {doneAll && steps.length > 0 && (
          <div style={{ animation: 'ai-rise .35s ease both', padding: '12px', borderRadius: 10, background: 'rgba(16,185,129,0.1)', border: '1px solid #10b981' }}>
            <span style={label}>Final answer</span>
            <div style={{ fontSize: 13.5, color: 'var(--text-primary)', marginTop: 2 }}>{final}</div>
          </div>
        )}
        {shown === 0 && <div style={{ fontSize: 13, color: 'var(--text-muted)', textAlign: 'center', padding: 16 }}>Press <strong>Step</strong> or <strong>Auto-play</strong> to watch the agent reason, call a tool, read the result, and loop until it can answer.</div>}
      </div>
    </div>
  );
};

// ---------- Tokenizer / Context-window meter ----------
interface Seg { label: string; tokens: number; color: string; }
const est = (t: string) => Math.max(0, Math.ceil(t.trim().length / 4)); // rough tokens ≈ chars/4
const TokenMeter: React.FC<AgentWidgetProps> = ({ config }) => {
  const windowTokens = (config?.windowTokens as number) || 8000;
  const segs = (config?.segments as Seg[]) || [
    { label: 'System prompt', tokens: 400, color: '#6366f1' },
    { label: 'Tool schemas', tokens: 600, color: '#0ea5e9' },
    { label: 'History', tokens: 1500, color: '#14b8a6' },
  ];
  const [txt, setTxt] = useState('');
  const userTokens = est(txt);
  const fixed = segs.reduce((a, s) => a + s.tokens, 0);
  const total = fixed + userTokens;
  const over = total > windowTokens;
  const pct = (n: number) => `${Math.min(100, (n / windowTokens) * 100)}%`;

  return (
    <div style={card}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, flexWrap: 'wrap', gap: 8 }}>
        <span style={label}>Context window · {windowTokens.toLocaleString()} tokens</span>
        <span style={{ fontSize: 12.5, fontWeight: 700, color: over ? '#ef4444' : 'var(--text-secondary)' }}>{total.toLocaleString()} / {windowTokens.toLocaleString()} used</span>
      </div>
      <div style={{ display: 'flex', height: 26, borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border-glass)', background: 'var(--bg-secondary)' }}>
        {segs.map((s, i) => <div key={i} title={`${s.label}: ${s.tokens}`} style={{ width: pct(s.tokens), background: s.color, transition: 'width .3s ease' }} />)}
        <div title={`Your text: ${userTokens}`} style={{ width: pct(userTokens), background: over ? '#ef4444' : ACC, transition: 'width .3s ease' }} />
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 8 }}>
        {[...segs, { label: 'Your text', tokens: userTokens, color: over ? '#ef4444' : '#8b5cf6' }].map((s, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-secondary)' }}>
            <span style={{ width: 10, height: 10, borderRadius: 2, background: s.color }} /> {s.label} ({s.tokens})
          </span>
        ))}
      </div>
      <textarea
        value={txt}
        onChange={e => setTxt(e.target.value)}
        placeholder="Type or paste text to see how many tokens it costs and how it fills the window…"
        rows={3}
        style={{ width: '100%', marginTop: 12, boxSizing: 'border-box', resize: 'vertical', background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-glass)', borderRadius: 8, padding: 10, fontSize: 13, fontFamily: 'inherit' }}
      />
      {over
        ? <div style={{ marginTop: 8, fontSize: 12.5, color: '#ef4444', fontWeight: 600 }}>⚠ Context overflow — the model would truncate or evict the oldest history to fit. This is why memory & summarization matter.</div>
        : <div style={{ marginTop: 8, fontSize: 12, color: 'var(--text-muted)' }}>Rough estimate (≈ 4 chars/token). Everything shares one budget — prompt, tools, history, and the answer.</div>}
    </div>
  );
};

// ---------- Sampling playground ----------
const SamplingPlayground: React.FC<AgentWidgetProps> = ({ config }) => {
  const prompt = (config?.prompt as string) || 'The weather today is';
  const cands = (config?.tokens as Array<{ t: string; logit: number }>) || [
    { t: ' sunny', logit: 3.2 }, { t: ' cloudy', logit: 2.6 }, { t: ' rainy', logit: 2.1 }, { t: ' cold', logit: 1.2 }, { t: ' great', logit: 0.6 },
  ];
  const [temp, setTemp] = useState(0.7);
  const t = Math.max(0.01, temp);
  const exps = cands.map(c => Math.exp(c.logit / t));
  const sum = exps.reduce((a, b) => a + b, 0);
  const probs = cands.map((c, i) => ({ ...c, p: exps[i] / sum })).sort((a, b) => b.p - a.p);
  return (
    <div style={card}>
      <div style={label}>Sampling — how temperature reshapes the next-token distribution</div>
      <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 13, color: 'var(--text-secondary)', margin: '8px 0' }}>{prompt}<span style={{ color: ACC }}>▮</span></div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {probs.map((c, i) => (
          <div key={c.t} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 70, fontFamily: 'ui-monospace, monospace', fontSize: 12.5, color: i === 0 ? ACC : 'var(--text-primary)' }}>{c.t.trim()}</span>
            <div style={{ flex: 1, height: 16, background: 'var(--bg-secondary)', borderRadius: 4, overflow: 'hidden' }}><div style={{ width: `${c.p * 100}%`, height: '100%', background: i === 0 ? ACC : 'var(--border-glass)', transition: 'width .2s ease' }} /></div>
            <span style={{ width: 44, textAlign: 'right', fontSize: 12, color: 'var(--text-muted)' }}>{(c.p * 100).toFixed(1)}%</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 14 }}>
        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>temperature</span>
        <input type="range" aria-label="Sampling temperature" min={0} max={1.5} step={0.05} value={temp} onChange={e => setTemp(parseFloat(e.target.value))} style={{ flex: 1, accentColor: '#8b5cf6' }} />
        <span style={{ width: 34, fontFamily: 'ui-monospace, monospace', fontSize: 13, color: ACC }}>{temp.toFixed(2)}</span>
      </div>
      <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 8 }}>{temp < 0.1 ? 'Near-0 = greedy: it almost always picks the top token (best for tool-calling & structured output).' : temp > 1 ? 'High temp flattens the distribution — more variety, less reliability.' : 'Moderate temp keeps the top token likely but allows some variety.'}</div>
    </div>
  );
};

// ---------- Tool-call inspector ----------
const ToolInspector: React.FC<AgentWidgetProps> = ({ config }) => {
  const cases = (config?.cases as Array<{ query: string; tool: string; args: string; valid: boolean; note: string }>) || [
    { query: 'What’s the weather in Tokyo?', tool: 'get_weather', args: '{ "city": "Tokyo" }', valid: true, note: 'Args match the schema (city: string).' },
    { query: 'Email the report to sam@acme.com', tool: 'send_email', args: '{ "to": "sam@acme.com", "subject": "Report" }', valid: true, note: 'Required fields present.' },
    { query: 'Book a flight for tomorrow', tool: 'search_flights', args: '{ "date": "tomorrow" }', valid: false, note: 'date must be ISO (YYYY-MM-DD) — schema validation fails, so your code should ask the model to retry.' },
  ];
  const [i, setI] = useState(0);
  const c = cases[i];
  return (
    <div style={card}>
      <div style={label}>Tool-call inspector — what the model emits, and whether it validates</div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', margin: '10px 0' }}>
        {cases.map((_c, idx) => <button key={idx} style={idx === i ? primaryBtn : btn} onClick={() => setI(idx)}>Request {idx + 1}</button>)}
      </div>
      <div style={{ padding: '10px 12px', borderRadius: 8, background: 'var(--bg-secondary)', marginBottom: 10 }}><span style={label}>User</span><div style={{ fontSize: 13.5, color: 'var(--text-primary)' }}>{c.query}</div></div>
      <div style={{ padding: 12, borderRadius: 8, border: `1px solid ${c.valid ? '#10b981' : '#ef4444'}`, background: 'var(--bg-secondary)' }}>
        <span style={label}>Model emits a tool call</span>
        <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 12.5, color: ACC, marginTop: 4 }}>{c.tool}(</div>
        <pre style={{ margin: '2px 0', fontFamily: 'ui-monospace, monospace', fontSize: 12.5, color: 'var(--text-primary)', whiteSpace: 'pre-wrap' }}>{c.args}</pre>
        <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 12.5, color: ACC }}>)</div>
        <div style={{ marginTop: 8, fontSize: 12.5, color: c.valid ? '#10b981' : '#ef4444', fontWeight: 600 }}>{c.valid ? '✓ schema valid — dispatch it' : '✗ schema invalid'} — {c.note}</div>
      </div>
    </div>
  );
};

// ---------- RAG retrieval explorer ----------
const RagExplorer: React.FC<AgentWidgetProps> = ({ config }) => {
  const queries = (config?.queries as Array<{ q: string; chunks: Array<{ text: string; score: number }>; answer: string }>) || [
    { q: 'What is the refund window?', chunks: [
      { text: 'Refunds are accepted within 30 days of purchase with a receipt.', score: 0.91 },
      { text: 'Items must be unused and in original packaging.', score: 0.62 },
      { text: 'Our stores are open 9am–9pm on weekdays.', score: 0.12 },
    ], answer: 'You can request a refund within 30 days of purchase, with a receipt [1].' },
    { q: 'What are the store hours?', chunks: [
      { text: 'Our stores are open 9am–9pm on weekdays.', score: 0.88 },
      { text: 'Refunds are accepted within 30 days of purchase with a receipt.', score: 0.18 },
      { text: 'Items must be unused and in original packaging.', score: 0.09 },
    ], answer: 'Stores are open 9am–9pm on weekdays [1].' },
  ];
  const topK = (config?.topK as number) || 2;
  const [i, setI] = useState(0);
  const q = queries[i];
  const ranked = [...q.chunks].sort((a, b) => b.score - a.score);
  return (
    <div style={card}>
      <div style={label}>RAG explorer — retrieve, rank, then ground the answer</div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', margin: '10px 0' }}>
        {queries.map((x, idx) => <button key={idx} style={idx === i ? primaryBtn : btn} onClick={() => setI(idx)}>{x.q}</button>)}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {ranked.map((ch, idx) => {
          const inCtx = idx < topK;
          return (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 8, border: `1px solid ${inCtx ? ACC : 'var(--border-glass)'}`, background: inCtx ? 'rgba(139,92,246,0.08)' : 'var(--bg-secondary)', opacity: inCtx ? 1 : 0.6 }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: inCtx ? ACC : 'var(--text-muted)' }}>{inCtx ? `[${idx + 1}]` : '—'}</span>
              <span style={{ flex: 1, fontSize: 12.5, color: 'var(--text-primary)' }}>{ch.text}</span>
              <span style={{ width: 60, textAlign: 'right', fontSize: 12, fontFamily: 'ui-monospace, monospace', color: inCtx ? ACC : 'var(--text-muted)' }}>{ch.score.toFixed(2)}</span>
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: 10, padding: 12, borderRadius: 8, background: 'rgba(16,185,129,0.1)', border: '1px solid #10b981' }}><span style={label}>Grounded answer (top-{topK} only)</span><div style={{ fontSize: 13.5, color: 'var(--text-primary)', marginTop: 2 }}>{q.answer}</div></div>
      <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 8 }}>Only the top-{topK} chunks enter the prompt — low-scoring text is dropped so the model grounds on the right sources and can cite them.</div>
    </div>
  );
};

// ---------- Embedding map ----------
const EmbeddingMap: React.FC<AgentWidgetProps> = ({ config }) => {
  const pts = (config?.points as Array<{ label: string; x: number; y: number }>) || [
    { label: 'dog', x: 0.2, y: 0.25 }, { label: 'puppy', x: 0.27, y: 0.32 }, { label: 'cat', x: 0.3, y: 0.2 },
    { label: 'car', x: 0.75, y: 0.7 }, { label: 'truck', x: 0.82, y: 0.66 }, { label: 'engine', x: 0.7, y: 0.8 },
    { label: 'bank', x: 0.5, y: 0.5 },
  ];
  const [sel, setSel] = useState(0);
  const s = pts[sel];
  const dist = (a: typeof s, b: typeof s) => Math.hypot(a.x - b.x, a.y - b.y);
  const nearest = pts.map((p, i) => ({ i, d: dist(s, p) })).filter(x => x.i !== sel).sort((a, b) => a.d - b.d)[0]?.i;
  return (
    <div style={card}>
      <div style={label}>Embedding space — nearby vectors mean similar meaning</div>
      <svg viewBox="0 0 100 60" style={{ width: '100%', height: 200, marginTop: 8, borderRadius: 8, background: 'var(--bg-secondary)' }}>
        {sel != null && nearest != null && <line x1={s.x * 100} y1={s.y * 60} x2={pts[nearest].x * 100} y2={pts[nearest].y * 60} stroke={ACC} strokeWidth={0.5} strokeDasharray="2 1" />}
        {pts.map((p, i) => (
          <g key={i} onClick={() => setSel(i)} style={{ cursor: 'pointer' }}>
            <circle cx={p.x * 100} cy={p.y * 60} r={i === sel ? 2.6 : 1.8} fill={i === sel ? ACC : i === nearest ? '#10b981' : 'var(--text-muted)'} />
            <text x={p.x * 100 + 2.5} y={p.y * 60 + 1.5} fontSize={3.2} fill="var(--text-primary)">{p.label}</text>
          </g>
        ))}
      </svg>
      <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginTop: 8 }}>Selected <strong style={{ color: ACC }}>{s.label}</strong> — nearest neighbour is <strong style={{ color: '#10b981' }}>{nearest != null ? pts[nearest].label : ''}</strong>. Click any point. Similar concepts cluster; unrelated ones sit far apart — that distance is what retrieval uses.</div>
    </div>
  );
};

// ---------- LangGraph state-graph walker ----------
const GraphWalker: React.FC<AgentWidgetProps> = ({ config }) => {
  const nodes = (config?.nodes as Array<{ id: string; label: string; x: number; y: number }>) || [
    { id: 'start', label: 'START', x: 8, y: 30 }, { id: 'agent', label: 'agent', x: 34, y: 30 },
    { id: 'tools', label: 'tools', x: 60, y: 12 }, { id: 'end', label: 'END', x: 86, y: 30 },
  ];
  const edges = (config?.edges as Array<[string, string]>) || [['start', 'agent'], ['agent', 'tools'], ['tools', 'agent'], ['agent', 'end']];
  const path = (config?.path as string[]) || ['start', 'agent', 'tools', 'agent', 'end'];
  const [step, setStep] = useState(0);
  const activeId = path[step];
  const byId = Object.fromEntries(nodes.map(n => [n.id, n]));
  return (
    <div style={card}>
      <div style={label}>LangGraph — state flows through nodes; conditional edges loop back to the agent</div>
      <svg viewBox="0 0 100 45" style={{ width: '100%', height: 200, marginTop: 8, borderRadius: 8, background: 'var(--bg-secondary)' }}>
        {edges.map(([a, b], i) => { const na = byId[a], nb = byId[b]; if (!na || !nb) return null;
          const traversed = path.slice(0, step + 1).some((p, k) => p === a && path[k + 1] === b);
          return <line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} stroke={traversed ? ACC : 'var(--border-glass)'} strokeWidth={traversed ? 1 : 0.5} markerEnd="url(#ah)" />; })}
        <defs><marker id="ah" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto"><path d="M0,0 L4,2 L0,4 z" fill="var(--text-muted)" /></marker></defs>
        {nodes.map(n => (
          <g key={n.id}>
            <rect x={n.x - 7} y={n.y - 4} width={14} height={8} rx={2} fill={n.id === activeId ? ACC : 'var(--bg-inner)'} stroke={n.id === activeId ? ACC : 'var(--border-glass)'} strokeWidth={0.5} />
            <text x={n.x} y={n.y + 1.3} fontSize={3.4} textAnchor="middle" fill={n.id === activeId ? '#fff' : 'var(--text-primary)'}>{n.label}</text>
          </g>
        ))}
      </svg>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}>
        <button style={btn} onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}>◂ Back</button>
        <button style={primaryBtn} onClick={() => setStep(s => Math.min(path.length - 1, s + 1))} disabled={step >= path.length - 1}>Step ▸</button>
        <button style={btn} onClick={() => setStep(0)}>Reset ↺</button>
        <span style={{ fontSize: 12.5, color: 'var(--text-muted)', marginLeft: 'auto' }}>node {step + 1}/{path.length}: <strong style={{ color: ACC }}>{byId[activeId]?.label}</strong></span>
      </div>
    </div>
  );
};

// ---------- Generic fallback ----------
const GenericNote: React.FC<AgentWidgetProps> = ({ config }) => (
  <div style={card}><div style={{ fontSize: 13.5, color: 'var(--text-secondary)' }}>{(config?.note as string) || 'Interactive widget.'}</div></div>
);

export const AGENT_WIDGETS: Record<string, React.FC<AgentWidgetProps>> = {
  'agent-loop': AgentLoopSimulator,
  'token-meter': TokenMeter,
  'sampling': SamplingPlayground,
  'tool-inspector': ToolInspector,
  'rag-explorer': RagExplorer,
  'embedding-map': EmbeddingMap,
  'graph-walker': GraphWalker,
  'note': GenericNote,
};
