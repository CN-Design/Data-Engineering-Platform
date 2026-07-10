import React, { useState, useEffect } from 'react';

// ============================================================
// Visualization registry
// JSON references a visualization by `visualId`; the interactive
// component lives here in code and receives `config` as props.
// To add a visualization: build a component and register it in
// FRONTEND_VISUALIZATIONS below.
// ============================================================

export interface VisualizationProps {
  config?: Record<string, unknown>;
}

const card: React.CSSProperties = {
  border: '1px solid var(--border-glass)',
  borderRadius: '10px',
  padding: '16px',
  background: 'var(--bg-inner)',
};

const btn: React.CSSProperties = {
  padding: '6px 14px',
  borderRadius: '8px',
  border: '1px solid var(--border-glass)',
  background: 'var(--bg-secondary)',
  color: 'var(--text-primary)',
  fontWeight: 600,
  fontSize: '13px',
  cursor: 'pointer',
};

// ---------- React Component Tree ----------
const ComponentTreeViz: React.FC<VisualizationProps> = () => {
  const [selected, setSelected] = useState<string>('App');
  const tree: Record<string, string[]> = {
    App: ['Header', 'Main', 'Footer'],
    Header: ['Nav', 'Logo'],
    Main: ['Sidebar', 'Content'],
    Content: ['PostList'],
    PostList: ['Post'],
    Footer: [],
    Nav: [],
    Logo: [],
    Sidebar: [],
    Post: [],
  };
  // Compute the subtree that re-renders when `selected` updates state.
  const descendants = (node: string, acc = new Set<string>()): Set<string> => {
    acc.add(node);
    (tree[node] || []).forEach(c => descendants(c, acc));
    return acc;
  };
  const rerendering = descendants(selected);

  const Node: React.FC<{ name: string; depth: number }> = ({ name, depth }) => (
    <div style={{ marginLeft: depth * 18 }}>
      <button
        onClick={() => setSelected(name)}
        style={{
          ...btn,
          padding: '4px 10px',
          margin: '3px 0',
          background: name === selected ? 'rgba(59,130,246,0.2)' : rerendering.has(name) ? 'rgba(168,85,247,0.15)' : 'var(--bg-secondary)',
          borderColor: name === selected ? '#3b82f6' : 'var(--border-glass)',
        }}
      >
        &lt;{name} /&gt;
      </button>
      {(tree[name] || []).map(c => <Node key={c} name={c} depth={depth + 1} />)}
    </div>
  );

  return (
    <div style={card}>
      <p style={{ marginTop: 0, color: 'var(--text-secondary)', fontSize: '13.5px' }}>
        Click a component to set its state. Highlighted (purple) components re-render by default — a parent's re-render cascades to all its children unless they're memoized.
      </p>
      <Node name="App" depth={0} />
      <p style={{ marginBottom: 0, fontSize: '12.5px', color: 'var(--text-muted)' }}>
        State updated in <strong style={{ color: '#3b82f6' }}>&lt;{selected} /&gt;</strong> → {rerendering.size} component(s) re-render.
      </p>
    </div>
  );
};

// ---------- React Render Cycle ----------
const RenderCycleViz: React.FC<VisualizationProps> = () => {
  const phases = [
    { name: 'Trigger', detail: 'A state/prop change (or initial mount) schedules a render.' },
    { name: 'Render Phase', detail: 'React calls your components to compute the new Virtual DOM. Must be pure — no side effects.' },
    { name: 'Reconciliation', detail: 'React diffs the new tree against the previous one to find the minimal set of changes.' },
    { name: 'Commit Phase', detail: 'React applies the changes to the real DOM. Refs are set; layout effects run.' },
    { name: 'Browser Paint', detail: 'The browser paints the updated UI. Passive effects (useEffect) run after paint.' },
  ];
  const [step, setStep] = useState(0);
  return (
    <div style={card}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
        {phases.map((p, i) => (
          <span key={p.name} style={{
            padding: '5px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 600,
            background: i === step ? '#3b82f6' : i < step ? 'rgba(59,130,246,0.15)' : 'var(--bg-secondary)',
            color: i === step ? '#fff' : 'var(--text-muted)',
            border: '1px solid var(--border-glass)',
          }}>{i + 1}. {p.name}</span>
        ))}
      </div>
      <div style={{ minHeight: '48px', color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6 }}>
        <strong style={{ color: 'var(--text-primary)' }}>{phases[step].name}: </strong>{phases[step].detail}
      </div>
      <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
        <button style={btn} onClick={() => setStep(s => Math.max(0, s - 1))}>Prev</button>
        <button style={btn} onClick={() => setStep(s => Math.min(phases.length - 1, s + 1))}>Next</button>
        <button style={{ ...btn, marginLeft: 'auto' }} onClick={() => setStep(0)}>Reset</button>
      </div>
    </div>
  );
};

// ---------- React State Flow (live counter) ----------
const StateFlowViz: React.FC<VisualizationProps> = () => {
  const [count, setCount] = useState(0);
  const [renders, setRenders] = useState(0);
  // Note: in a real component renders would increment on every render; here we
  // simulate the relationship explicitly for teaching clarity.
  const bump = (n: number) => { setCount(c => c + n); setRenders(r => r + 1); };
  return (
    <div style={card}>
      <p style={{ marginTop: 0, color: 'var(--text-secondary)', fontSize: '13.5px' }}>
        Each call to the state setter schedules a re-render with the new value. Watch the render count track state updates.
      </p>
      <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ fontSize: '36px', fontWeight: 800, color: '#3b82f6' }}>{count}</div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={btn} onClick={() => bump(1)}>setState(+1)</button>
          <button style={btn} onClick={() => bump(-1)}>setState(-1)</button>
          <button style={btn} onClick={() => { setCount(0); setRenders(r => r + 1); }}>reset</button>
        </div>
        <div style={{ marginLeft: 'auto', fontSize: '13px', color: 'var(--text-muted)' }}>
          re-renders: <strong style={{ color: '#a855f7' }}>{renders}</strong>
        </div>
      </div>
    </div>
  );
};

// ---------- Generic, config-driven stepper ----------
// Any topic can drive this via config.steps (array of { name, detail }).
// This lets every lesson include a Visual Explorer without a bespoke component.
const ConceptStepsViz: React.FC<VisualizationProps> = ({ config }) => {
  const steps = (config?.steps as Array<{ name: string; detail: string }>) || [];
  const intro = config?.intro as string | undefined;
  const [step, setStep] = useState(0);
  if (steps.length === 0) {
    return <div style={{ ...card, color: 'var(--text-muted)', fontSize: '13px' }}>No steps provided.</div>;
  }
  const safe = Math.min(step, steps.length - 1);
  return (
    <div style={card}>
      {intro && <p style={{ marginTop: 0, color: 'var(--text-secondary)', fontSize: '13.5px' }}>{intro}</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
        {steps.map((p, i) => (
          <span key={i} style={{
            padding: '5px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 600,
            background: i === safe ? '#3b82f6' : i < safe ? 'rgba(59,130,246,0.15)' : 'var(--bg-secondary)',
            color: i === safe ? '#fff' : 'var(--text-muted)', border: '1px solid var(--border-glass)',
          }}>{i + 1}. {p.name}</span>
        ))}
      </div>
      <div style={{ minHeight: '48px', color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6 }}>
        <strong style={{ color: 'var(--text-primary)' }}>{steps[safe].name}: </strong>{steps[safe].detail}
      </div>
      <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
        <button style={btn} onClick={() => setStep(s => Math.max(0, s - 1))}>Prev</button>
        <button style={btn} onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))}>Next</button>
        <button style={{ ...btn, marginLeft: 'auto' }} onClick={() => setStep(0)}>Reset</button>
      </div>
    </div>
  );
};

// ---------- JS Event Loop ----------
interface ELStep {
  line: number | null;
  desc: string;
  stack: string[];   // bottom -> top
  webapis: string[];
  micro: string[];
  macro: string[];
  out: string[];
}
const EventLoopViz: React.FC<VisualizationProps> = () => {
  // Step-through of the canonical ordering puzzle, synced to source lines.
  const CODE = [
    "console.log('A');",
    "setTimeout(() => console.log('timeout'), 0);",
    "Promise.resolve().then(() => console.log('promise'));",
    "console.log('B');",
  ];
  const steps: ELStep[] = [
    { line: 1, desc: 'main() begins executing on the call stack.', stack: ['main()'], webapis: [], micro: [], macro: [], out: [] },
    { line: 1, desc: 'console.log("A") is pushed onto the stack and runs.', stack: ['main()', 'console.log("A")'], webapis: [], micro: [], macro: [], out: [] },
    { line: 1, desc: '"A" is printed; the log frame pops off.', stack: ['main()'], webapis: [], micro: [], macro: [], out: ['A'] },
    { line: 2, desc: 'setTimeout hands its callback to the Web API timer (it is NOT queued yet).', stack: ['main()', 'setTimeout(…, 0)'], webapis: ['Timer 0ms → timeout cb'], micro: [], macro: [], out: ['A'] },
    { line: 2, desc: 'setTimeout returns and pops. The timer counts down in the background.', stack: ['main()'], webapis: ['Timer → timeout cb'], micro: [], macro: [], out: ['A'] },
    { line: 2, desc: 'The 0ms timer elapses → its callback moves to the Task (macrotask) queue.', stack: ['main()'], webapis: [], micro: [], macro: ['timeout cb'], out: ['A'] },
    { line: 3, desc: 'Promise.resolve().then(…) registers a callback.', stack: ['main()', 'Promise.then(…)'], webapis: [], micro: [], macro: ['timeout cb'], out: ['A'] },
    { line: 3, desc: 'then() returns; the promise callback goes to the Microtask queue.', stack: ['main()'], webapis: [], micro: ['promise cb'], macro: ['timeout cb'], out: ['A'] },
    { line: 4, desc: 'console.log("B") is pushed and runs.', stack: ['main()', 'console.log("B")'], webapis: [], micro: ['promise cb'], macro: ['timeout cb'], out: ['A'] },
    { line: 4, desc: '"B" is printed; the log frame pops.', stack: ['main()'], webapis: [], micro: ['promise cb'], macro: ['timeout cb'], out: ['A', 'B'] },
    { line: null, desc: 'main() finishes — the call stack is now EMPTY. The event loop can run queues.', stack: [], webapis: [], micro: ['promise cb'], macro: ['timeout cb'], out: ['A', 'B'] },
    { line: null, desc: 'Stack empty → drain ALL microtasks first. The promise callback runs.', stack: ['promise cb'], webapis: [], micro: [], macro: ['timeout cb'], out: ['A', 'B'] },
    { line: null, desc: '"promise" is printed; the microtask queue is now empty.', stack: [], webapis: [], micro: [], macro: ['timeout cb'], out: ['A', 'B', 'promise'] },
    { line: null, desc: 'Only now does the loop take ONE macrotask. The timeout callback runs.', stack: ['timeout cb'], webapis: [], micro: [], macro: [], out: ['A', 'B', 'promise'] },
    { line: null, desc: 'Final order: A · B · promise · timeout. Microtasks always beat macrotasks.', stack: [], webapis: [], micro: [], macro: [], out: ['A', 'B', 'promise', 'timeout'] },
  ];

  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  const s = steps[i];
  const atEnd = i >= steps.length - 1;

  useEffect(() => {
    if (!playing) return;
    if (atEnd) { setPlaying(false); return; }
    const t = setTimeout(() => setI(n => Math.min(steps.length - 1, n + 1)), 1150);
    return () => clearTimeout(t);
  }, [playing, i, atEnd, steps.length]);

  const Lane: React.FC<{ title: string; items: string[]; color: string; note: string; reverse?: boolean }> = ({ title, items, color, note, reverse }) => {
    const shown = reverse ? [...items].reverse() : items;
    return (
      <div style={{ flex: 1, minWidth: 116 }}>
        <div style={{ fontSize: 10.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.4px', color, marginBottom: 2 }}>{title}</div>
        <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 6 }}>{note}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minHeight: 92, padding: 6, borderRadius: 8, background: 'var(--bg-secondary)', border: `1px solid ${color}33` }}>
          {shown.length === 0 ? <span style={{ fontSize: 11.5, color: 'var(--text-muted)', margin: 'auto' }}>empty</span> :
            shown.map((it, k) => <span key={k} style={{ fontSize: 12, padding: '5px 8px', borderRadius: 6, background: 'var(--bg-inner)', border: `1px solid ${color}55`, color: 'var(--text-primary)' }}>{it}</span>)}
        </div>
      </div>
    );
  };

  return (
    <div style={card}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
        <div>
          <div style={{ fontSize: 10.5, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 6 }}>Source</div>
          <pre style={{ margin: 0, padding: 10, borderRadius: 8, background: 'var(--bg-code, #0d1117)', fontSize: 12.5, lineHeight: 1.6, fontFamily: 'ui-monospace, monospace', overflowX: 'auto' }}>
            {CODE.map((ln, k) => (
              <div key={k} style={{ display: 'flex', gap: 10, padding: '1px 6px', borderRadius: 4, background: s.line === k + 1 ? 'rgba(59,130,246,0.28)' : 'transparent' }}>
                <span style={{ color: 'var(--text-muted, #6b7280)', userSelect: 'none' }}>{k + 1}</span>
                <span style={{ color: 'var(--text-code, #e2e8f0)' }}>{ln}</span>
              </div>
            ))}
          </pre>
          <div style={{ marginTop: 8, fontSize: 11, color: 'var(--text-muted)' }}>Console output</div>
          <div style={{ marginTop: 4, padding: '8px 10px', borderRadius: 8, minHeight: 34, background: 'var(--bg-inner)', border: '1px solid var(--border-glass)', fontFamily: 'ui-monospace, monospace', fontSize: 12.5, color: '#10b981' }}>
            {s.out.length ? s.out.map((o, k) => <span key={k}>{o}{k < s.out.length - 1 ? <br /> : null}</span>) : <span style={{ color: 'var(--text-muted)' }}>—</span>}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Lane title="Call Stack" items={s.stack} color="#3b82f6" note="LIFO · top runs" reverse />
          <div style={{ display: 'flex', gap: 8 }}>
            <Lane title="Web APIs" items={s.webapis} color="#06b6d4" note="timers, fetch" />
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
        <Lane title="Microtask Queue" items={s.micro} color="#a855f7" note="Promises · drained fully first" />
        <Lane title="Task Queue (macro)" items={s.macro} color="#f59e0b" note="setTimeout · one per loop turn" />
      </div>

      <p style={{ margin: '0 0 10px 0', color: 'var(--text-secondary)', fontSize: 13.5, minHeight: 36 }}>
        <strong style={{ color: 'var(--text-primary)' }}>Step {i + 1}/{steps.length}: </strong>{s.desc}
      </p>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <button style={{ ...btn, opacity: i === 0 ? 0.5 : 1 }} disabled={i === 0} onClick={() => { setPlaying(false); setI(n => Math.max(0, n - 1)); }}>Prev</button>
        <button style={{ ...btn, background: '#3b82f6', color: '#fff', borderColor: '#3b82f6' }} onClick={() => { if (atEnd) { setI(0); setPlaying(true); } else setPlaying(p => !p); }}>
          {playing ? 'Pause' : atEnd ? 'Replay' : 'Play'}
        </button>
        <button style={{ ...btn, opacity: atEnd ? 0.5 : 1 }} disabled={atEnd} onClick={() => { setPlaying(false); setI(n => Math.min(steps.length - 1, n + 1)); }}>Next</button>
        <button style={{ ...btn, marginLeft: 'auto' }} onClick={() => { setPlaying(false); setI(0); }}>Reset</button>
      </div>
    </div>
  );
};

// ---------- DOM Tree ----------
const DomTreeViz: React.FC<VisualizationProps> = () => {
  const tree = (
    <ul style={{ listStyle: 'none', margin: 0, paddingLeft: 0, fontFamily: 'ui-monospace, monospace', fontSize: 13 }}>
      <Li n="html">
        <Li n="head"><Li n="title" leaf /></Li>
        <Li n="body">
          <Li n="header"><Li n="h1" leaf /></Li>
          <Li n="main"><Li n="p" leaf /><Li n="button" leaf /></Li>
        </Li>
      </Li>
    </ul>
  );
  return (
    <div style={card}>
      <p style={{ marginTop: 0, color: 'var(--text-secondary)', fontSize: 13.5 }}>The browser parses your HTML into a tree of nodes — the DOM. Each tag becomes an element node; nesting becomes parent/child relationships React's Virtual DOM mirrors.</p>
      {tree}
    </div>
  );
};
const Li: React.FC<{ n: string; leaf?: boolean; children?: React.ReactNode }> = ({ n, leaf, children }) => (
  <li style={{ marginLeft: 16, padding: '2px 0' }}>
    <span style={{ padding: '2px 7px', borderRadius: 5, background: leaf ? 'var(--bg-secondary)' : 'rgba(59,130,246,0.12)', border: '1px solid var(--border-glass)', color: leaf ? 'var(--text-secondary)' : '#3b82f6' }}>&lt;{n}&gt;</span>
    {children}
  </li>
);

// ---------- CSS Box Model ----------
const BoxModelViz: React.FC<VisualizationProps> = () => {
  const [margin, setMargin] = useState(16);
  const [border, setBorder] = useState(4);
  const [padding, setPadding] = useState(16);
  const Slider: React.FC<{ label: string; v: number; set: (n: number) => void; color: string }> = ({ label, v, set, color }) => (
    <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5 }}>
      <span style={{ width: 64, color }}>{label}</span>
      <input type="range" min={0} max={40} value={v} onChange={e => set(Number(e.target.value))} />
      <span style={{ width: 28, textAlign: 'right' }}>{v}</span>
    </label>
  );
  return (
    <div style={card}>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Slider label="margin" v={margin} set={setMargin} color="#f59e0b" />
          <Slider label="border" v={border} set={setBorder} color="#a855f7" />
          <Slider label="padding" v={padding} set={setPadding} color="#10b981" />
        </div>
        <div style={{ flex: 1, minWidth: 200, display: 'flex', justifyContent: 'center' }}>
          <div style={{ background: 'rgba(245,158,11,0.18)', padding: margin }}>
            <div style={{ background: 'rgba(168,85,247,0.25)', padding: border }}>
              <div style={{ background: 'rgba(16,185,129,0.2)', padding: padding }}>
                <div style={{ background: '#3b82f6', color: '#fff', padding: '10px 16px', borderRadius: 4, fontSize: 12.5, textAlign: 'center' }}>content</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ---------- CSS Flexbox Playground ----------
const FlexboxViz: React.FC<VisualizationProps> = () => {
  const justifyOpts = ['flex-start', 'center', 'flex-end', 'space-between', 'space-around'];
  const alignOpts = ['flex-start', 'center', 'flex-end', 'stretch'];
  const [justify, setJustify] = useState('flex-start');
  const [align, setAlign] = useState('center');
  const Group: React.FC<{ label: string; opts: string[]; v: string; set: (s: string) => void }> = ({ label, opts, v, set }) => (
    <div style={{ marginBottom: 8 }}>
      <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 4 }}>{label}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
        {opts.map(o => <button key={o} style={{ ...btn, padding: '4px 8px', fontSize: 11.5, background: v === o ? 'rgba(59,130,246,0.2)' : 'var(--bg-secondary)' }} onClick={() => set(o)}>{o}</button>)}
      </div>
    </div>
  );
  return (
    <div style={card}>
      <Group label="justify-content" opts={justifyOpts} v={justify} set={setJustify} />
      <Group label="align-items" opts={alignOpts} v={align} set={setAlign} />
      <div style={{ display: 'flex', justifyContent: justify, alignItems: align, gap: 8, height: 120, padding: 10, marginTop: 8, borderRadius: 8, background: 'var(--bg-secondary)', border: '1px dashed var(--border-glass)' }}>
        {[1, 2, 3].map(n => <div key={n} style={{ width: 48, height: n === 2 ? 56 : 40, borderRadius: 6, background: '#3b82f6', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>{n}</div>)}
      </div>
    </div>
  );
};

// ---------- React Effect Lifecycle ----------
const EffectLifecycleViz: React.FC<VisualizationProps> = () => {
  const steps = [
    { name: 'Mount', detail: 'Component renders for the first time; the browser paints; THEN the effect runs.' },
    { name: 'Dependency changes', detail: 'A value in the dependency array changed on re-render.' },
    { name: 'Cleanup (old)', detail: 'React runs the previous effect\'s cleanup function before re-running the effect.' },
    { name: 'Effect re-runs', detail: 'The effect runs again with the new values.' },
    { name: 'Unmount', detail: 'Component is removed; the final cleanup runs to release subscriptions/timers.' },
  ];
  const [i, setI] = useState(0);
  return (
    <div style={card}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
        {steps.map((p, k) => (
          <span key={k} style={{ padding: '5px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600, background: k === i ? '#3b82f6' : k < i ? 'rgba(59,130,246,0.15)' : 'var(--bg-secondary)', color: k === i ? '#fff' : 'var(--text-muted)', border: '1px solid var(--border-glass)' }}>{p.name}</span>
        ))}
      </div>
      <div style={{ minHeight: 46, color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6 }}>
        <strong style={{ color: 'var(--text-primary)' }}>{steps[i].name}: </strong>{steps[i].detail}
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <button style={btn} onClick={() => setI(n => Math.max(0, n - 1))}>Prev</button>
        <button style={btn} onClick={() => setI(n => Math.min(steps.length - 1, n + 1))}>Next</button>
        <button style={{ ...btn, marginLeft: 'auto' }} onClick={() => setI(0)}>Reset</button>
      </div>
    </div>
  );
};

// ---------- React Reconciliation (diff) ----------
interface RItem { id: number; label: string; }
const RECON_START: RItem[] = [{ id: 1, label: 'A' }, { id: 2, label: 'B' }, { id: 3, label: 'C' }];
const RECON_NEW = ['Z', 'Y', 'X', 'W'];
const ReconciliationViz: React.FC<VisualizationProps> = () => {
  const [mode, setMode] = useState<'index' | 'id'>('index');
  const [prev, setPrev] = useState<RItem[]>(RECON_START);
  const [cur, setCur] = useState<RItem[]>(RECON_START);
  const [nid, setNid] = useState(100);

  const op = (next: RItem[]) => { setPrev(cur); setCur(next); };
  const prepend = () => { op([{ id: nid, label: RECON_NEW[(nid - 100) % RECON_NEW.length] }, ...cur]); setNid(n => n + 1); };
  const reverse = () => op([...cur].reverse());
  const reset = () => { setPrev(RECON_START); setCur(RECON_START); setNid(100); };

  const ann = cur.map((item, i) => {
    if (mode === 'index') {
      const old = prev[i];
      if (!old) return { kind: 'create', text: 'create new DOM node' };
      if (old.label === item.label) return { kind: 'reuse', text: `reuse node #${i} (unchanged)` };
      return { kind: 'mutate', text: `reuse node #${i}: rewrite text ${old.label} → ${item.label}` };
    }
    const oldIndex = prev.findIndex(p => p.id === item.id);
    if (oldIndex === -1) return { kind: 'create', text: 'create new DOM node' };
    return oldIndex !== i ? { kind: 'move', text: `reuse node & move (was #${oldIndex})` } : { kind: 'reuse', text: `reuse node #${oldIndex} (unchanged)` };
  });
  const creates = ann.filter(a => a.kind === 'create').length;
  const mutates = ann.filter(a => a.kind === 'mutate').length;
  const moves = ann.filter(a => a.kind === 'move').length;
  const KIND_COLOR: Record<string, string> = { reuse: '#3b82f6', mutate: '#f59e0b', move: '#f59e0b', create: '#10b981' };

  return (
    <div style={card}>
      <p style={{ marginTop: 0, color: 'var(--text-secondary)', fontSize: 13.5 }}>
        React pairs old and new children <strong>by key</strong>, then reuses / moves / creates DOM to match. The key strategy changes everything when items are inserted or reordered.
      </p>

      <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 12, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>key =</span>
        {(['index', 'id'] as const).map(m => (
          <button key={m} style={{ ...btn, fontFamily: 'ui-monospace, monospace', ...(mode === m ? { background: '#3b82f6', color: '#fff', borderColor: '#3b82f6' } : {}) }} onClick={() => setMode(m)}>{m === 'index' ? 'index' : 'item.id (stable)'}</button>
        ))}
        <span style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
          <button style={btn} onClick={prepend}>Prepend item</button>
          <button style={btn} onClick={reverse}>Reverse</button>
          <button style={btn} onClick={reset}>Reset</button>
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        {cur.map((item, i) => {
          const a = ann[i];
          const c = KIND_COLOR[a.kind];
          return (
            <div key={mode === 'index' ? i : item.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 10px', borderRadius: 8, background: 'var(--bg-inner)', border: `1px solid ${c}55` }}>
              <div style={{ width: 34, height: 34, borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#fff', background: c }}>{item.label}</div>
              <code style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>key={mode === 'index' ? i : item.id}</code>
              <span style={{ marginLeft: 'auto', fontSize: 12, color: c, fontWeight: 600 }}>{a.text}</span>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 12, padding: '10px 12px', borderRadius: 8, background: 'var(--bg-inner)', border: '1px solid var(--border-glass)', fontSize: 12.5, color: 'var(--text-secondary)' }}>
        Work this render: {mode === 'index'
          ? `${mutates} text rewrite(s), ${creates} new node(s).`
          : `${moves} move(s), ${creates} new node(s), 0 text rewrites.`}
      </div>

      {mode === 'index' && mutates > 0 && (
        <div style={{ marginTop: 8, padding: '10px 12px', borderRadius: 8, background: 'rgba(239,68,68,0.1)', border: '1px solid #ef444455', fontSize: 12.5, color: '#ef4444', fontWeight: 600 }}>
          ⚠ Index keys: React reused each position's DOM for a different item. Any per-row state (input text, focus, checkbox) stays with the position, not the item — the classic index-key bug. Switch to <code>item.id</code>.
        </div>
      )}
    </div>
  );
};

// ---------- CSS Grid playground ----------
const GRID_COLORS = ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#14b8a6', '#a855f7'];
const GridViz: React.FC<VisualizationProps> = () => {
  const [cols, setCols] = useState(3);
  const [gap, setGap] = useState(10);
  const [count, setCount] = useState(6);
  const [preset, setPreset] = useState<'equal' | 'ratio' | 'autofit'>('equal');
  const [spanFirst, setSpanFirst] = useState(false);

  const template =
    preset === 'equal' ? `repeat(${cols}, 1fr)` :
    preset === 'ratio' ? ['2fr', ...Array(Math.max(0, cols - 1)).fill('1fr')].join(' ') :
    'repeat(auto-fit, minmax(80px, 1fr))';

  const css = `display: grid;\ngrid-template-columns: ${template};\ngap: ${gap}px;` + (spanFirst ? `\n\n.item:first-child {\n  grid-column: span 2;\n}` : '');

  const label: React.CSSProperties = { fontSize: 11.5, fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 };
  const row: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' };

  return (
    <div style={card}>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 12 }}>
        <div>
          <span style={label}>Columns preset</span>
          <select value={preset} onChange={e => setPreset(e.target.value as any)} style={{ ...btn, padding: '6px 10px' }}>
            <option value="equal">repeat(N, 1fr) — equal</option>
            <option value="ratio">2fr 1fr … — first wide</option>
            <option value="autofit">auto-fit minmax — responsive</option>
          </select>
        </div>
        <div style={{ opacity: preset === 'autofit' ? 0.4 : 1 }}>
          <span style={label}>Columns: {cols}</span>
          <input type="range" min={1} max={6} value={cols} disabled={preset === 'autofit'} onChange={e => setCols(+e.target.value)} />
        </div>
        <div>
          <span style={label}>Gap: {gap}px</span>
          <input type="range" min={0} max={28} value={gap} onChange={e => setGap(+e.target.value)} />
        </div>
        <div>
          <span style={label}>Items: {count}</span>
          <input type="range" min={1} max={9} value={count} onChange={e => setCount(+e.target.value)} />
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <label style={{ ...row, cursor: 'pointer', fontSize: 12.5, color: 'var(--text-secondary)' }}>
            <input type="checkbox" checked={spanFirst} onChange={e => setSpanFirst(e.target.checked)} />
            Item 1 spans 2 columns
          </label>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: template, gap: `${gap}px`, padding: 10, borderRadius: 10, background: 'var(--bg-secondary)', border: '1px solid var(--border-glass)', marginBottom: 12 }}>
        {Array.from({ length: count }).map((_, k) => (
          <div key={k} style={{ background: GRID_COLORS[k % GRID_COLORS.length], color: '#fff', padding: '16px 8px', borderRadius: 6, textAlign: 'center', fontWeight: 700, fontSize: 14, gridColumn: spanFirst && k === 0 ? 'span 2' : undefined }}>{k + 1}</div>
        ))}
      </div>

      <pre style={{ margin: 0, padding: 12, borderRadius: 8, background: 'var(--bg-code, #0d1117)', color: 'var(--text-code, #e2e8f0)', fontSize: 12.5, lineHeight: 1.5, fontFamily: 'ui-monospace, monospace', overflowX: 'auto' }}><code>{css}</code></pre>
    </div>
  );
};

// ---------- CSS Specificity calculator ----------
interface Spec { a: number; b: number; c: number; }
const computeSpecificity = (selector: string): Spec => {
  let a = 0, b = 0, c = 0;
  let s = ` ${selector} `;
  s = s.replace(/::[\w-]+/g, () => { c++; return ' '; });           // pseudo-elements
  s = s.replace(/#[\w-]+/g, () => { a++; return ' '; });            // IDs
  s = s.replace(/\.[\w-]+/g, () => { b++; return ' '; });           // classes
  s = s.replace(/\[[^\]]*\]/g, () => { b++; return ' '; });         // attributes
  s = s.replace(/:[\w-]+(\([^)]*\))?/g, () => { b++; return ' '; }); // pseudo-classes
  s.split(/[\s>+~,]+/).filter(Boolean).forEach(tok => {
    if (/^[a-zA-Z][\w-]*$/.test(tok)) c++;                          // element / type selectors
  });
  return { a, b, c };
};
const cmpSpec = (x: Spec, y: Spec): number =>
  x.a !== y.a ? x.a - y.a : x.b !== y.b ? x.b - y.b : x.c - y.c;

const SpecBadges: React.FC<{ s: Spec }> = ({ s }) => {
  const cell = (n: number, color: string, title: string) => (
    <div style={{ textAlign: 'center' }}>
      <div style={{ width: 34, height: 34, borderRadius: 8, background: `${color}22`, border: `1px solid ${color}`, color, fontWeight: 800, fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{n}</div>
      <div style={{ fontSize: 9.5, color: 'var(--text-muted)', marginTop: 3 }}>{title}</div>
    </div>
  );
  return (
    <div style={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>
      {cell(s.a, '#ef4444', 'IDs')}
      {cell(s.b, '#f59e0b', 'class/attr/pseudo')}
      {cell(s.c, '#3b82f6', 'elem/pseudo-el')}
      <div style={{ marginLeft: 4, alignSelf: 'center', fontFamily: 'ui-monospace, monospace', fontWeight: 700, color: 'var(--text-primary)' }}>= {s.a},{s.b},{s.c}</div>
    </div>
  );
};

const PRESETS = ['#nav ul li.active a:hover', '.btn.primary', 'header nav a', 'ul li::before', 'a', '*'];
const SpecificityViz: React.FC<VisualizationProps> = () => {
  const [selA, setSelA] = useState('#nav ul li.active a:hover');
  const [selB, setSelB] = useState('.sidebar .link.active');
  const specA = computeSpecificity(selA);
  const specB = computeSpecificity(selB);
  const cmp = cmpSpec(specA, specB);
  const verdict = cmp === 0 ? 'Tie — the one that appears later in the CSS wins (source order).' :
    cmp > 0 ? 'Selector A wins — it applies.' : 'Selector B wins — it applies.';

  const input: React.CSSProperties = { flex: 1, minWidth: 180, padding: '8px 10px', borderRadius: 8, border: '1px solid var(--border-glass)', background: 'var(--bg-inner)', color: 'var(--text-primary)', fontFamily: 'ui-monospace, monospace', fontSize: 13 };

  return (
    <div style={card}>
      <p style={{ marginTop: 0, color: 'var(--text-secondary)', fontSize: 13.5 }}>
        Specificity is compared left-to-right as <strong>(IDs, classes/attributes/pseudo-classes, elements/pseudo-elements)</strong>. A single ID beats any number of classes.
      </p>

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
        {PRESETS.map(p => (
          <button key={p} style={{ ...btn, fontSize: 11.5, fontFamily: 'ui-monospace, monospace' }} onClick={() => setSelA(p)}>{p}</button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 6 }}>SELECTOR A</div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <input style={input} value={selA} onChange={e => setSelA(e.target.value)} spellCheck={false} />
            <SpecBadges s={specA} />
          </div>
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 6 }}>SELECTOR B</div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <input style={input} value={selB} onChange={e => setSelB(e.target.value)} spellCheck={false} />
            <SpecBadges s={specB} />
          </div>
        </div>
      </div>

      <div style={{ marginTop: 14, padding: '10px 12px', borderRadius: 8, background: cmp === 0 ? 'rgba(245,158,11,0.12)' : 'rgba(16,185,129,0.12)', border: `1px solid ${cmp === 0 ? '#f59e0b' : '#10b981'}55`, color: cmp === 0 ? '#f59e0b' : '#10b981', fontWeight: 600, fontSize: 13.5 }}>
        {verdict}
      </div>
      <p style={{ margin: '10px 0 0', fontSize: 11.5, color: 'var(--text-muted)' }}>
        Inline <code>style=""</code> outranks all selectors; <code>!important</code> overrides specificity entirely. (Args inside <code>:not()</code>/<code>:is()</code> are simplified here.)
      </p>
    </div>
  );
};

// ---------- Closures / scope chain ----------
const CLOSURE_CODE = `function makeCounter() {
  let count = 0;              // lives in makeCounter's scope
  return function increment() {
    count += 1;              // closes over 'count'
    return count;
  };
}
const counterA = makeCounter(); // closure #1
const counterB = makeCounter(); // closure #2 (independent)`;

const ClosureViz: React.FC<VisualizationProps> = () => {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [log, setLog] = useState<string[]>([]);
  const [active, setActive] = useState<'A' | 'B' | null>(null);

  const call = (name: 'A' | 'B', val: number, set: (n: number) => void) => {
    const next = val + 1;
    set(next);
    setActive(name);
    setLog(l => [`counter${name}(): scope chain → 'count' found in closure ${name} → ${next}`, ...l].slice(0, 5));
  };

  const ClosureBox: React.FC<{ name: 'A' | 'B'; count: number; onCall: () => void }> = ({ name, count, onCall }) => (
    <div style={{ flex: 1, minWidth: 150, padding: 12, borderRadius: 10, background: 'var(--bg-inner)', border: `1px solid ${active === name ? '#10b981' : 'var(--border-glass)'}`, transition: 'border-color .2s' }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 6 }}>CLOSURE {name} — retained makeCounter() scope</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <code style={{ fontSize: 13, background: 'var(--bg-secondary)', padding: '4px 8px', borderRadius: 6, color: 'var(--text-primary)' }}>count: <strong style={{ color: '#10b981' }}>{count}</strong></code>
        <button style={{ ...btn, marginLeft: 'auto' }} onClick={onCall}>counter{name}()</button>
      </div>
    </div>
  );

  return (
    <div style={card}>
      <pre style={{ margin: '0 0 12px 0', padding: 12, borderRadius: 8, background: 'var(--bg-code, #0d1117)', color: 'var(--text-code, #e2e8f0)', fontSize: 12.5, lineHeight: 1.5, fontFamily: 'ui-monospace, monospace', overflowX: 'auto' }}><code>{CLOSURE_CODE}</code></pre>

      <div style={{ padding: 10, borderRadius: 10, border: '1px dashed var(--border-glass)', marginBottom: 12 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 8 }}>GLOBAL SCOPE — holds counterA, counterB (each references its own closure)</div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <ClosureBox name="A" count={a} onCall={() => call('A', a, setA)} />
          <ClosureBox name="B" count={b} onCall={() => call('B', b, setB)} />
        </div>
      </div>

      <p style={{ margin: '0 0 10px', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
        Each call to <code>makeCounter()</code> creates a <strong>new</strong> scope with its own <code>count</code>. The returned function keeps a <strong>live reference</strong> to that scope — that retained scope is the closure. Notice A and B never affect each other.
      </p>

      <div style={{ minHeight: 70, padding: 10, borderRadius: 8, background: 'var(--bg-inner)', border: '1px solid var(--border-glass)', fontFamily: 'ui-monospace, monospace', fontSize: 12, color: 'var(--text-secondary)' }}>
        {log.length === 0 ? <span style={{ color: 'var(--text-muted)' }}>Click counterA() / counterB() to run…</span> :
          log.map((l, k) => <div key={k} style={{ opacity: k === 0 ? 1 : 0.55 }}>{l}</div>)}
      </div>
      <div style={{ marginTop: 10 }}>
        <button style={btn} onClick={() => { setA(0); setB(0); setLog([]); setActive(null); }}>Reset</button>
      </div>
    </div>
  );
};

// ---------- Prototype chain ----------
const PROTO_LEVELS = [
  { label: 'dog', sub: 'the instance', props: ['name'] },
  { label: 'Dog.prototype', sub: '↑ __proto__', props: ['bark'] },
  { label: 'Animal.prototype', sub: '↑ __proto__', props: ['eat'] },
  { label: 'Object.prototype', sub: '↑ __proto__', props: ['toString', 'hasOwnProperty'] },
  { label: 'null', sub: 'end of chain', props: [] as string[] },
];
const PROTO_PROPS = ['name', 'bark', 'eat', 'toString', 'fly'];
const ProtoChainViz: React.FC<VisualizationProps> = () => {
  const [prop, setProp] = useState<string | null>(null);
  const foundLevel = prop == null ? -1 : (() => {
    const idx = PROTO_LEVELS.findIndex(l => l.props.includes(prop));
    return idx === -1 ? PROTO_LEVELS.length - 1 : idx; // reach null when not found
  })();
  const found = prop != null && PROTO_LEVELS[foundLevel]?.props.includes(prop);

  return (
    <div style={card}>
      <p style={{ marginTop: 0, color: 'var(--text-secondary)', fontSize: 13.5 }}>
        Reading a property walks <strong>up</strong> the prototype chain: own properties first, then each <code>__proto__</code> link, stopping at the first match — or <code>null</code>, which yields <code>undefined</code>.
      </p>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
        <span style={{ fontSize: 12, color: 'var(--text-muted)', alignSelf: 'center', marginRight: 4 }}>Look up:</span>
        {PROTO_PROPS.map(p => (
          <button key={p} style={{ ...btn, fontFamily: 'ui-monospace, monospace', ...(prop === p ? { background: '#3b82f6', color: '#fff', borderColor: '#3b82f6' } : {}) }} onClick={() => setProp(p)}>dog.{p}</button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {PROTO_LEVELS.map((lvl, k) => {
          const isNull = lvl.label === 'null';
          const checked = prop != null && k <= foundLevel;
          const isFound = prop != null && k === foundLevel && found;
          const reachedNull = prop != null && k === foundLevel && !found && isNull;
          const border = isFound ? '#10b981' : reachedNull ? '#ef4444' : checked ? '#f59e0b' : 'var(--border-glass)';
          return (
            <div key={k} style={{ padding: '10px 12px', borderRadius: 8, background: 'var(--bg-inner)', border: `1px solid ${border}`, opacity: prop != null && k > foundLevel ? 0.45 : 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <code style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 13.5 }}>{lvl.label}</code>
                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{lvl.sub}</span>
                <span style={{ marginLeft: 'auto', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {lvl.props.map(pr => (
                    <code key={pr} style={{ fontSize: 12, padding: '2px 7px', borderRadius: 5, background: prop === pr && isFound ? 'rgba(16,185,129,0.2)' : 'var(--bg-secondary)', border: `1px solid ${prop === pr && isFound ? '#10b981' : 'var(--border-glass)'}`, color: prop === pr && isFound ? '#10b981' : 'var(--text-secondary)' }}>{pr}</code>
                  ))}
                  {isNull && <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>(no properties)</span>}
                </span>
                {checked && !isFound && !reachedNull && <span style={{ fontSize: 11, color: '#f59e0b', whiteSpace: 'nowrap' }}>checked — not here</span>}
                {isFound && <span style={{ fontSize: 11, fontWeight: 700, color: '#10b981', whiteSpace: 'nowrap' }}>FOUND</span>}
                {reachedNull && <span style={{ fontSize: 11, fontWeight: 700, color: '#ef4444', whiteSpace: 'nowrap' }}>reached null</span>}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 12, padding: '10px 12px', borderRadius: 8, background: prop == null ? 'var(--bg-inner)' : found ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.1)', border: `1px solid ${prop == null ? 'var(--border-glass)' : found ? '#10b98155' : '#ef444455'}`, fontFamily: 'ui-monospace, monospace', fontSize: 13, color: prop == null ? 'var(--text-muted)' : found ? '#10b981' : '#ef4444' }}>
        {prop == null ? 'Pick a property to trace the lookup…' :
          found ? `dog.${prop} → found on ${PROTO_LEVELS[foundLevel].label}` :
          `dog.${prop} → not found anywhere → undefined`}
      </div>
    </div>
  );
};

// ---------- Next.js caching (the four caches) ----------
type CacheKey = 'router' | 'fullroute' | 'data';
const NEXT_CACHES: { key: CacheKey; name: string; where: string; desc: string; color: string }[] = [
  { key: 'router', name: 'Router Cache', where: 'Client', desc: 'RSC payloads for visited routes (in the browser)', color: '#06b6d4' },
  { key: 'fullroute', name: 'Full Route Cache', where: 'Server', desc: 'Rendered RSC + HTML for static routes', color: '#8b5cf6' },
  { key: 'data', name: 'Data Cache', where: 'Server', desc: 'fetch() results, persisted across requests', color: '#f59e0b' },
];
const NextCacheViz: React.FC<VisualizationProps> = () => {
  const [fresh, setFresh] = useState<Record<CacheKey, boolean>>({ router: false, fullroute: false, data: false });
  const [probe, setProbe] = useState<{ disp: Record<CacheKey, 'hit' | 'miss' | 'skip'>; origin: 'fetch' | 'skip' } | null>(null);

  const navigate = () => {
    const disp = {} as Record<CacheKey, 'hit' | 'miss' | 'skip'>;
    let stopped = false;
    for (const c of NEXT_CACHES) {
      if (stopped) { disp[c.key] = 'skip'; continue; }
      if (fresh[c.key]) { disp[c.key] = 'hit'; stopped = true; }
      else disp[c.key] = 'miss';
    }
    const origin: 'fetch' | 'skip' = stopped ? 'skip' : 'fetch';
    if (!stopped) setFresh({ router: true, fullroute: true, data: true }); // origin miss repopulates all
    setProbe({ disp, origin });
  };

  const event = (patch: Partial<Record<CacheKey, boolean>>) => { setFresh(f => ({ ...f, ...patch })); setProbe(null); };
  const reset = () => { setFresh({ router: false, fullroute: false, data: false }); setProbe(null); };

  const Pill: React.FC<{ ok: boolean }> = ({ ok }) => (
    <span style={{ fontSize: 10.5, fontWeight: 700, padding: '2px 7px', borderRadius: 5, background: ok ? 'rgba(16,185,129,0.15)' : 'rgba(148,163,184,0.15)', color: ok ? '#10b981' : 'var(--text-muted)' }}>{ok ? 'FRESH' : 'stale / empty'}</span>
  );
  const resultBadge = (r?: 'hit' | 'miss' | 'skip') => r === 'hit'
    ? <span style={{ fontSize: 10.5, fontWeight: 800, color: '#10b981' }}>HIT → served here</span>
    : r === 'miss' ? <span style={{ fontSize: 10.5, fontWeight: 700, color: '#ef4444' }}>MISS ↓</span>
    : r === 'skip' ? <span style={{ fontSize: 10.5, color: 'var(--text-muted)' }}>not reached</span> : null;

  return (
    <div style={card}>
      <p style={{ marginTop: 0, color: 'var(--text-secondary)', fontSize: 13.5 }}>
        A request checks caches top-down and stops at the first <strong>FRESH</strong> one. A <strong>Router Cache</strong> hit is served entirely on the client — the server is never contacted.
      </p>
      <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginBottom: 12, padding: '6px 10px', borderRadius: 6, background: 'var(--bg-inner)', border: '1px solid var(--border-glass)' }}>
        Within one render, identical <code>fetch()</code> calls are first deduped by <strong>Request Memoization</strong> before reaching the Data Cache.
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {NEXT_CACHES.map((c, i) => (
          <React.Fragment key={c.key}>
            <div style={{ padding: '10px 12px', borderRadius: 8, background: 'var(--bg-inner)', border: `1px solid ${probe?.disp[c.key] === 'hit' ? '#10b981' : c.color + '44'}`, opacity: probe?.disp[c.key] === 'skip' ? 0.45 : 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: c.color }} />
                <strong style={{ fontSize: 13.5, color: 'var(--text-primary)' }}>{c.name}</strong>
                <span style={{ fontSize: 10.5, color: 'var(--text-muted)', border: '1px solid var(--border-glass)', borderRadius: 5, padding: '1px 6px' }}>{c.where}</span>
                <Pill ok={fresh[c.key]} />
                <span style={{ marginLeft: 'auto' }}>{resultBadge(probe?.disp[c.key])}</span>
              </div>
              <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginTop: 4 }}>{c.desc}</div>
            </div>
            {i < NEXT_CACHES.length && <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: 12, lineHeight: 1 }}>↓</div>}
          </React.Fragment>
        ))}
        <div style={{ padding: '10px 12px', borderRadius: 8, background: probe?.origin === 'fetch' ? 'rgba(16,185,129,0.12)' : 'var(--bg-inner)', border: `1px solid ${probe?.origin === 'fetch' ? '#10b981' : 'var(--border-glass)'}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 8, height: 8, borderRadius: 2, background: '#10b981' }} />
            <strong style={{ fontSize: 13.5, color: 'var(--text-primary)' }}>Origin (DB / API)</strong>
            <span style={{ marginLeft: 'auto', fontSize: 10.5, fontWeight: 700, color: probe?.origin === 'fetch' ? '#10b981' : 'var(--text-muted)' }}>{probe?.origin === 'fetch' ? 'FETCHED → repopulates all caches' : 'source of truth'}</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 14 }}>
        <button style={{ ...btn, background: '#3b82f6', color: '#fff', borderColor: '#3b82f6' }} onClick={navigate}>Navigate to /products</button>
        <button style={btn} onClick={() => event({ data: false, fullroute: false })}>revalidate (time elapsed)</button>
        <button style={btn} onClick={() => event({ router: false, fullroute: false, data: false })}>revalidatePath('/products')</button>
        <button style={btn} onClick={() => event({ router: false })}>router.refresh()</button>
        <button style={{ ...btn, marginLeft: 'auto' }} onClick={reset}>Reset (cold)</button>
      </div>
      <p style={{ margin: '10px 0 0', fontSize: 11, color: 'var(--text-muted)' }}>Simplified model for teaching the cache order &amp; invalidation triggers; real Next.js behavior has more nuance per route config.</p>
    </div>
  );
};

// ---------- RSC: Server / Client component boundary ----------
interface RscNode { id: string; needs: 'state' | 'async' | null; children: RscNode[]; }
const RSC_TREE: RscNode = {
  id: 'RootLayout', needs: null, children: [
    { id: 'Page', needs: null, children: [
      { id: 'ProductList', needs: 'async', children: [
        { id: 'ProductCard', needs: null, children: [
          { id: 'AddToCartButton', needs: 'state', children: [] },
        ] },
      ] },
      { id: 'Sidebar', needs: null, children: [
        { id: 'ThemeToggle', needs: 'state', children: [] },
      ] },
    ] },
  ],
};
const RSC_NEEDS: Record<string, 'state' | 'async' | null> = {};
(function flatten(n: RscNode) { RSC_NEEDS[n.id] = n.needs; n.children.forEach(flatten); })(RSC_TREE);
const rscValidity = (id: string, isClient: boolean): { ok: boolean; msg: string } => {
  const needs = RSC_NEEDS[id];
  if (needs === 'state' && !isClient) return { ok: false, msg: 'Uses useState / onClick → must be a Client Component ("use client").' };
  if (needs === 'async' && isClient) return { ok: false, msg: 'Fetches data on the server (async) → cannot be a Client Component.' };
  return { ok: true, msg: needs === 'state' ? 'Interactive — correctly a Client Component.' : needs === 'async' ? 'Async data fetching — correctly a Server Component.' : 'Static — fine as either, Server by default.' };
};

const RscBoundaryViz: React.FC<VisualizationProps> = () => {
  const [clientSet, setClientSet] = useState<Record<string, boolean>>({ AddToCartButton: true, ThemeToggle: true });
  const [sel, setSel] = useState<string>('AddToCartButton');
  const toggle = (id: string) => setClientSet(s => ({ ...s, [id]: !s[id] }));

  const rows: React.ReactNode[] = [];
  const walk = (node: RscNode, inheritedClient: boolean, depth: number) => {
    const declared = !!clientSet[node.id];
    const isClient = inheritedClient || declared;
    const isBoundary = declared && !inheritedClient;
    const v = rscValidity(node.id, isClient);
    const color = isClient ? '#06b6d4' : '#8b5cf6';
    rows.push(
      <div key={node.id} onClick={() => setSel(node.id)} style={{ marginLeft: depth * 18, display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px', borderRadius: 8, cursor: 'pointer', border: `1px solid ${sel === node.id ? color : 'var(--border-glass)'}`, background: sel === node.id ? `${color}14` : 'var(--bg-inner)', marginBottom: 4 }}>
        <span style={{ width: 8, height: 8, borderRadius: 2, background: color }} />
        <code style={{ fontSize: 13, color: 'var(--text-primary)' }}>&lt;{node.id}/&gt;</code>
        <span style={{ fontSize: 10, fontWeight: 700, color, textTransform: 'uppercase' }}>{isClient ? 'client' : 'server'}</span>
        {isBoundary && <span style={{ fontSize: 10, fontFamily: 'ui-monospace, monospace', color: '#06b6d4', border: '1px solid #06b6d455', borderRadius: 5, padding: '1px 6px' }}>'use client'</span>}
        {!v.ok && <span style={{ fontSize: 11, color: '#ef4444', marginLeft: 'auto' }}>⚠ invalid</span>}
        {RSC_NEEDS[node.id] && v.ok && <span style={{ fontSize: 10.5, color: 'var(--text-muted)', marginLeft: 'auto' }}>{RSC_NEEDS[node.id] === 'state' ? 'needs interactivity' : 'needs server data'}</span>}
        <button style={{ ...btn, padding: '3px 8px', fontSize: 11 }} onClick={(e) => { e.stopPropagation(); toggle(node.id); }} disabled={inheritedClient} title={inheritedClient ? 'Already client (inherited from an ancestor boundary)' : ''}>
          {declared ? 'remove "use client"' : 'add "use client"'}
        </button>
      </div>
    );
    node.children.forEach(c => walk(c, isClient, depth + 1));
  };
  walk(RSC_TREE, false, 0);

  const selClient = (() => { // recompute effective for selected
    let res = false;
    const find = (n: RscNode, inherited: boolean): void => {
      const isC = inherited || !!clientSet[n.id];
      if (n.id === sel) res = isC;
      n.children.forEach(c => find(c, isC));
    };
    find(RSC_TREE, false);
    return res;
  })();
  const v = rscValidity(sel, selClient);

  const cap = (label: string, allowed: boolean) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: allowed ? 'var(--text-secondary)' : 'var(--text-muted)' }}>
      <span style={{ color: allowed ? '#10b981' : '#ef4444', fontWeight: 700 }}>{allowed ? '✓' : '✗'}</span>{label}
    </div>
  );

  return (
    <div style={card}>
      <p style={{ marginTop: 0, color: 'var(--text-secondary)', fontSize: 13.5 }}>
        Everything is a <strong style={{ color: '#8b5cf6' }}>Server Component</strong> by default. Adding <code>'use client'</code> marks a boundary — that component <em>and its whole subtree</em> become <strong style={{ color: '#06b6d4' }}>Client Components</strong>.
      </p>

      <div style={{ marginBottom: 12 }}>{rows}</div>

      <div style={{ padding: 12, borderRadius: 10, background: 'var(--bg-inner)', border: '1px solid var(--border-glass)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <code style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text-primary)' }}>&lt;{sel}/&gt;</code>
          <span style={{ fontSize: 10.5, fontWeight: 700, textTransform: 'uppercase', color: selClient ? '#06b6d4' : '#8b5cf6' }}>{selClient ? 'Client' : 'Server'} Component</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 8 }}>
          {cap('async / await, fetch a DB directly', !selClient)}
          {cap('useState / useEffect', selClient)}
          {cap('keep secrets / server env', !selClient)}
          {cap('onClick & event handlers', selClient)}
          {cap('render on the server only', !selClient)}
          {cap('browser APIs (window, localStorage)', selClient)}
        </div>
        <div style={{ padding: '8px 10px', borderRadius: 6, fontSize: 12.5, fontWeight: 600, background: v.ok ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.1)', color: v.ok ? '#10b981' : '#ef4444' }}>
          {v.ok ? '✓ ' : '⚠ '}{v.msg}
        </div>
      </div>
      <p style={{ margin: '10px 0 0', fontSize: 11, color: 'var(--text-muted)' }}>Props crossing the server→client boundary must be serializable (no functions/classes). A Server Component can render a Client Component, but not vice-versa (except via <code>children</code>).</p>
    </div>
  );
};

// ---------- TypeScript utility-types explorer ----------
interface TsField { name: string; type: string; optional: boolean; readonly: boolean; }
const TS_BASE: TsField[] = [
  { name: 'id', type: 'number', optional: false, readonly: false },
  { name: 'name', type: 'string', optional: false, readonly: false },
  { name: 'email', type: 'string', optional: true, readonly: false },
  { name: 'role', type: "'admin' | 'user'", optional: false, readonly: false },
];
type TsUtil = 'Partial' | 'Required' | 'Readonly' | 'Pick' | 'Omit';
const TS_UTILS: { id: TsUtil; desc: string }[] = [
  { id: 'Partial', desc: 'Makes every property optional (adds ?).' },
  { id: 'Required', desc: 'Makes every property required (removes ?).' },
  { id: 'Readonly', desc: 'Makes every property readonly.' },
  { id: 'Pick', desc: 'Keeps only the selected keys.' },
  { id: 'Omit', desc: 'Removes the selected keys.' },
];
const TsUtilityViz: React.FC<VisualizationProps> = () => {
  const [util, setUtil] = useState<TsUtil>('Partial');
  const [keys, setKeys] = useState<string[]>(['id', 'name']);
  const needsKeys = util === 'Pick' || util === 'Omit';

  let fields = TS_BASE.map(f => ({ ...f }));
  if (util === 'Partial') fields.forEach(f => (f.optional = true));
  if (util === 'Required') fields.forEach(f => (f.optional = false));
  if (util === 'Readonly') fields.forEach(f => (f.readonly = true));
  if (util === 'Pick') fields = fields.filter(f => keys.includes(f.name));
  if (util === 'Omit') fields = fields.filter(f => !keys.includes(f.name));

  const head = needsKeys ? `${util}<User, ${keys.map(k => `'${k}'`).join(' | ') || 'never'}>` : `${util}<User>`;
  const body = fields.length
    ? fields.map(f => `  ${f.readonly ? 'readonly ' : ''}${f.name}${f.optional ? '?' : ''}: ${f.type};`).join('\n')
    : '  // (no properties)';
  const result = `type Result = ${head};\n\n// resolves to:\n{\n${body}\n}`;

  const toggleKey = (k: string) => setKeys(ks => ks.includes(k) ? ks.filter(x => x !== k) : [...ks, k]);

  return (
    <div style={card}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div>
          <div style={{ fontSize: 10.5, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 6 }}>Base type</div>
          <pre style={{ margin: 0, padding: 12, borderRadius: 8, background: 'var(--bg-code, #0d1117)', color: 'var(--text-code, #e2e8f0)', fontSize: 12.5, lineHeight: 1.5, fontFamily: 'ui-monospace, monospace', overflowX: 'auto' }}><code>{`interface User {\n  id: number;\n  name: string;\n  email?: string;\n  role: 'admin' | 'user';\n}`}</code></pre>
        </div>
        <div>
          <div style={{ fontSize: 10.5, fontWeight: 700, textTransform: 'uppercase', color: '#3178c6', marginBottom: 6 }}>Result</div>
          <pre style={{ margin: 0, padding: 12, borderRadius: 8, background: 'var(--bg-code, #0d1117)', color: 'var(--text-code, #e2e8f0)', fontSize: 12.5, lineHeight: 1.5, fontFamily: 'ui-monospace, monospace', overflowX: 'auto' }}><code>{result}</code></pre>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 12 }}>
        {TS_UTILS.map(u => (
          <button key={u.id} style={{ ...btn, fontFamily: 'ui-monospace, monospace', ...(util === u.id ? { background: '#3178c6', color: '#fff', borderColor: '#3178c6' } : {}) }} onClick={() => setUtil(u.id)}>{u.id}&lt;T&gt;</button>
        ))}
      </div>

      {needsKeys && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 10, alignItems: 'center' }}>
          <span style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>Keys:</span>
          {TS_BASE.map(f => (
            <label key={f.name} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12.5, color: 'var(--text-secondary)', cursor: 'pointer', fontFamily: 'ui-monospace, monospace' }}>
              <input type="checkbox" checked={keys.includes(f.name)} onChange={() => toggleKey(f.name)} />{f.name}
            </label>
          ))}
        </div>
      )}

      <div style={{ marginTop: 12, padding: '10px 12px', borderRadius: 8, background: 'rgba(49,120,198,0.1)', border: '1px solid rgba(49,120,198,0.33)', fontSize: 13, color: '#3178c6', fontWeight: 600 }}>
        <code>{util}&lt;T&gt;</code> — {TS_UTILS.find(u => u.id === util)?.desc}
      </div>
    </div>
  );
};

// ---------- Critical Rendering Path ----------
const CRP_STAGES = [
  { name: 'DOM', title: 'HTML → DOM', color: '#e34f26', desc: 'The parser turns HTML bytes → tokens → nodes → the DOM tree, top to bottom.' },
  { name: 'CSSOM', title: 'CSS → CSSOM', color: '#1572b6', desc: 'Stylesheets are parsed into the CSSOM. CSS is render-blocking — the browser will not paint until the CSSOM is ready.' },
  { name: 'Render Tree', title: 'DOM + CSSOM → Render Tree', color: '#8b5cf6', desc: 'Visible nodes are merged with their computed styles. display:none nodes are excluded (visibility:hidden is kept).' },
  { name: 'Layout', title: 'Layout (reflow)', color: '#f59e0b', desc: 'The exact size and position of every box is computed — the geometry pass, also called reflow.' },
  { name: 'Paint', title: 'Paint', color: '#10b981', desc: 'Each box is rasterized into pixels: text, colors, borders, shadows, images.' },
  { name: 'Composite', title: 'Composite', color: '#06b6d4', desc: 'Painted layers are combined (often on the GPU) and drawn to the screen.' },
];
const CrpViz: React.FC<VisualizationProps> = () => {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [blocking, setBlocking] = useState(false);
  const atEnd = i >= CRP_STAGES.length - 1;
  const s = CRP_STAGES[i];

  useEffect(() => {
    if (!playing) return;
    if (atEnd) { setPlaying(false); return; }
    const t = setTimeout(() => setI(n => Math.min(CRP_STAGES.length - 1, n + 1)), 1150);
    return () => clearTimeout(t);
  }, [playing, i, atEnd]);

  return (
    <div style={card}>
      <p style={{ marginTop: 0, color: 'var(--text-secondary)', fontSize: 13.5 }}>
        The browser turns HTML & CSS into pixels through a fixed pipeline. Anything that blocks an early stage delays first paint.
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap', marginBottom: 12 }}>
        {CRP_STAGES.map((st, k) => (
          <React.Fragment key={st.name}>
            <button onClick={() => { setPlaying(false); setI(k); }} style={{ padding: '6px 10px', borderRadius: 8, border: `1px solid ${k === i ? st.color : 'var(--border-glass)'}`, background: k === i ? st.color : k < i ? `${st.color}22` : 'var(--bg-inner)', color: k === i ? '#fff' : 'var(--text-secondary)', fontSize: 12, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>{st.name}</button>
            {k < CRP_STAGES.length - 1 && <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>→</span>}
          </React.Fragment>
        ))}
      </div>

      <div style={{ padding: 14, borderRadius: 10, background: 'var(--bg-inner)', border: `1px solid ${s.color}55`, marginBottom: 12, minHeight: 84 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <span style={{ width: 9, height: 9, borderRadius: 2, background: s.color }} />
          <strong style={{ fontSize: 14.5, color: 'var(--text-primary)' }}>Stage {i + 1}: {s.title}</strong>
        </div>
        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 13.5, lineHeight: 1.6 }}>{s.desc}</p>
        {blocking && i === 0 && <p style={{ margin: '8px 0 0', color: '#ef4444', fontSize: 12.5, fontWeight: 600 }}>⚠ A synchronous &lt;script&gt; in &lt;head&gt; pauses DOM construction — it must download and execute before parsing resumes. Use defer or async to avoid this.</p>}
        {blocking && i === 1 && <p style={{ margin: '8px 0 0', color: '#ef4444', fontSize: 12.5, fontWeight: 600 }}>⚠ That script also waits for the CSSOM if a stylesheet precedes it — CSS can block JS too.</p>}
      </div>

      <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12.5, color: 'var(--text-secondary)', cursor: 'pointer', marginBottom: 12 }}>
        <input type="checkbox" checked={blocking} onChange={e => setBlocking(e.target.checked)} />
        Show render-blocking &lt;script&gt; effect
      </label>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <button style={{ ...btn, opacity: i === 0 ? 0.5 : 1 }} disabled={i === 0} onClick={() => { setPlaying(false); setI(n => Math.max(0, n - 1)); }}>Prev</button>
        <button style={{ ...btn, background: '#3b82f6', color: '#fff', borderColor: '#3b82f6' }} onClick={() => { if (atEnd) { setI(0); setPlaying(true); } else setPlaying(p => !p); }}>{playing ? 'Pause' : atEnd ? 'Replay' : 'Play'}</button>
        <button style={{ ...btn, opacity: atEnd ? 0.5 : 1 }} disabled={atEnd} onClick={() => { setPlaying(false); setI(n => Math.min(CRP_STAGES.length - 1, n + 1)); }}>Next</button>
        <button style={{ ...btn, marginLeft: 'auto' }} onClick={() => { setPlaying(false); setI(0); }}>Reset</button>
      </div>
    </div>
  );
};

// ---------- Predict the output (quiz) ----------
interface PredictQ { code: string; options: string[]; answer: string; explanation: string; }
const PredictOutputViz: React.FC<VisualizationProps> = ({ config }) => {
  const qs = ((config?.questions as PredictQ[]) || []);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<Record<number, string>>({});
  if (qs.length === 0) return null;
  const q = qs[idx];
  const sel = picked[idx];
  const answered = sel != null;
  const score = qs.reduce((n, qq, i) => n + (picked[i] === qq.answer ? 1 : 0), 0);
  const heading = (config?.heading as string) || 'Predict the output';

  const choose = (opt: string) => { if (!answered) setPicked(p => ({ ...p, [idx]: opt })); };

  return (
    <div style={card}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <strong style={{ fontSize: 13, color: 'var(--text-primary)' }}>{heading}</strong>
        <span style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>Question {idx + 1} / {qs.length}</span>
        <span style={{ marginLeft: 'auto', fontSize: 11.5, color: 'var(--text-muted)' }}>Score: {score}/{qs.length}</span>
      </div>

      <pre style={{ margin: '0 0 12px 0', padding: 12, borderRadius: 8, background: 'var(--bg-code, #0d1117)', color: 'var(--text-code, #e2e8f0)', fontSize: 12.5, lineHeight: 1.5, fontFamily: 'ui-monospace, monospace', overflowX: 'auto' }}><code>{q.code}</code></pre>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {q.options.map((opt, k) => {
          const isAnswer = opt === q.answer;
          const isPicked = sel === opt;
          const bg = !answered ? 'var(--bg-inner)' : isAnswer ? 'rgba(16,185,129,0.14)' : isPicked ? 'rgba(239,68,68,0.12)' : 'var(--bg-inner)';
          const bc = !answered ? 'var(--border-glass)' : isAnswer ? '#10b981' : isPicked ? '#ef4444' : 'var(--border-glass)';
          return (
            <button key={k} onClick={() => choose(opt)} disabled={answered} style={{ textAlign: 'left', padding: '9px 12px', borderRadius: 8, border: `1px solid ${bc}`, background: bg, color: 'var(--text-primary)', fontFamily: 'ui-monospace, monospace', fontSize: 13, cursor: answered ? 'default' : 'pointer' }}>
              {answered && isAnswer ? '✓ ' : answered && isPicked ? '✗ ' : ''}{opt}
            </button>
          );
        })}
      </div>

      {answered && (
        <div style={{ marginTop: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: sel === q.answer ? '#10b981' : '#ef4444', marginBottom: 4 }}>
            {sel === q.answer ? 'Correct' : 'Not quite'}
          </div>
          <p style={{ margin: 0, fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{q.explanation}</p>
          {idx < qs.length - 1 && (
            <button style={{ ...btn, marginTop: 12, background: '#3b82f6', color: '#fff', borderColor: '#3b82f6' }} onClick={() => setIdx(i => i + 1)}>Next question →</button>
          )}
          {idx === qs.length - 1 && (
            <button style={{ ...btn, marginTop: 12 }} onClick={() => { setIdx(0); setPicked({}); }}>Restart</button>
          )}
        </div>
      )}
    </div>
  );
};

// ---------- Flashcards (spaced recall) ----------
interface Flashcard { front: string; back: string; }
const FlashcardsViz: React.FC<VisualizationProps> = ({ config }) => {
  const cards = (config?.cards as Flashcard[]) || [];
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  if (cards.length === 0) return null;
  const c = cards[i];
  const go = (d: number) => { setFlipped(false); setI(x => Math.max(0, Math.min(cards.length - 1, x + d))); };
  return (
    <div style={card}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <strong style={{ fontSize: 13, color: 'var(--text-primary)' }}>Flashcards</strong>
        <span style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>Card {i + 1} / {cards.length}</span>
        <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--text-muted)' }}>click card to flip</span>
      </div>
      <button
        onClick={() => setFlipped(f => !f)}
        style={{ width: '100%', minHeight: 130, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 8, padding: '20px 18px', borderRadius: 12, cursor: 'pointer', textAlign: 'center', border: `1px solid ${flipped ? '#10b981' : 'var(--border-glass)'}`, background: flipped ? 'rgba(16,185,129,0.08)' : 'var(--bg-secondary)', color: 'var(--text-primary)', fontFamily: 'inherit' }}
      >
        <span style={{ fontSize: 10.5, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.6px', color: flipped ? '#10b981' : 'var(--text-muted)' }}>{flipped ? 'Answer' : 'Question'}</span>
        <span style={{ fontSize: 15, lineHeight: 1.55 }}>{flipped ? c.back : c.front}</span>
      </button>
      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <button style={{ ...btn, opacity: i === 0 ? 0.5 : 1 }} disabled={i === 0} onClick={() => go(-1)}>Prev</button>
        <button style={{ ...btn, background: '#3b82f6', color: '#fff', borderColor: '#3b82f6' }} onClick={() => setFlipped(f => !f)}>{flipped ? 'Show question' : 'Reveal answer'}</button>
        <button style={{ ...btn, marginLeft: 'auto', opacity: i === cards.length - 1 ? 0.5 : 1 }} disabled={i === cards.length - 1} onClick={() => go(1)}>Next</button>
      </div>
    </div>
  );
};

export const FRONTEND_VISUALIZATIONS: Record<string, React.FC<VisualizationProps>> = {
  'react-component-tree': ComponentTreeViz,
  'react-render-cycle': RenderCycleViz,
  'react-state-flow': StateFlowViz,
  'react-effect-lifecycle': EffectLifecycleViz,
  'react-reconciliation': ReconciliationViz,
  'js-event-loop': EventLoopViz,
  'dom-tree': DomTreeViz,
  'css-box-model': BoxModelViz,
  'css-flexbox-playground': FlexboxViz,
  'css-grid': GridViz,
  'css-specificity': SpecificityViz,
  'js-closures': ClosureViz,
  'js-prototypes': ProtoChainViz,
  'nextjs-caching': NextCacheViz,
  'rsc-boundary': RscBoundaryViz,
  'ts-utility-types': TsUtilityViz,
  'critical-rendering-path': CrpViz,
  'predict-output': PredictOutputViz,
  'flashcards': FlashcardsViz,
  'concept-steps': ConceptStepsViz,
};
