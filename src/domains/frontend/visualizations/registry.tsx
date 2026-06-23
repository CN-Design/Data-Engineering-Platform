import React, { useState } from 'react';

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
const EventLoopViz: React.FC<VisualizationProps> = () => {
  // A guided walk through console.log + setTimeout + Promise.then ordering.
  const steps = [
    { desc: 'Script starts. console.log("A") runs synchronously.', stack: ['log("A")'], micro: [] as string[], macro: [] as string[], out: ['A'] },
    { desc: 'setTimeout(cb, 0) schedules its callback as a macrotask.', stack: ['setTimeout'], micro: [], macro: ['timeout cb'], out: ['A'] },
    { desc: 'Promise.resolve().then(cb) schedules its callback as a microtask.', stack: ['Promise.then'], micro: ['promise cb'], macro: ['timeout cb'], out: ['A'] },
    { desc: 'console.log("B") runs synchronously. Stack is now empty.', stack: ['log("B")'], micro: ['promise cb'], macro: ['timeout cb'], out: ['A', 'B'] },
    { desc: 'Stack empty → drain ALL microtasks first. Promise callback runs.', stack: ['promise cb'], micro: [], macro: ['timeout cb'], out: ['A', 'B', 'promise'] },
    { desc: 'Microtasks empty → run one macrotask. Timeout callback runs.', stack: ['timeout cb'], micro: [], macro: [], out: ['A', 'B', 'promise', 'timeout'] },
  ];
  const [i, setI] = useState(0);
  const s = steps[i];
  const Col: React.FC<{ title: string; items: string[]; color: string }> = ({ title, items, color }) => (
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color, marginBottom: 6 }}>{title}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minHeight: 80 }}>
        {items.length === 0 ? <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>empty</span> :
          items.map((it, k) => <span key={k} style={{ fontSize: 12.5, padding: '5px 8px', borderRadius: 6, background: 'var(--bg-secondary)', border: '1px solid var(--border-glass)' }}>{it}</span>)}
      </div>
    </div>
  );
  return (
    <div style={card}>
      <p style={{ marginTop: 0, color: 'var(--text-secondary)', fontSize: 13.5 }}>{s.desc}</p>
      <div style={{ display: 'flex', gap: 12, marginBottom: 10 }}>
        <Col title="Call Stack" items={s.stack} color="#3b82f6" />
        <Col title="Microtasks" items={s.micro} color="#a855f7" />
        <Col title="Macrotasks" items={s.macro} color="#f59e0b" />
      </div>
      <div style={{ fontSize: 12.5, color: 'var(--text-muted)', marginBottom: 8 }}>Console: <strong style={{ color: '#10b981' }}>{s.out.join(' · ') || '—'}</strong></div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button style={btn} onClick={() => setI(n => Math.max(0, n - 1))}>Prev</button>
        <button style={btn} onClick={() => setI(n => Math.min(steps.length - 1, n + 1))}>Next</button>
        <button style={{ ...btn, marginLeft: 'auto' }} onClick={() => setI(0)}>Reset</button>
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
const ReconciliationViz: React.FC<VisualizationProps> = () => {
  const [added, setAdded] = useState(false);
  const items = added ? ['A', 'B', 'C', 'D'] : ['A', 'B', 'C'];
  return (
    <div style={card}>
      <p style={{ marginTop: 0, color: 'var(--text-secondary)', fontSize: 13.5 }}>React diffs the new tree against the old one and only touches what changed. With stable keys, A/B/C are reused and only the new node is created.</p>
      <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
        {items.map((it) => {
          const isNew = added && it === 'D';
          return <div key={it} style={{ width: 44, height: 44, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#fff', background: isNew ? '#10b981' : '#3b82f6', boxShadow: isNew ? '0 0 0 3px rgba(16,185,129,0.3)' : 'none' }}>{it}<span style={{ fontSize: 9, position: 'relative', top: 10, marginLeft: 2 }}>{isNew ? 'new' : 'reused'}</span></div>;
        })}
      </div>
      <button style={btn} onClick={() => setAdded(a => !a)}>{added ? 'Remove item' : 'Add item (re-render)'}</button>
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
  'concept-steps': ConceptStepsViz,
};
